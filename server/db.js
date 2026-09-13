/* MedBridge data layer — libSQL (SQLite).
   Local dev uses a file; production uses Turso over the network, which is the
   same SQLite engine, so every statement below is unchanged from the original
   on-disk version. All helpers are async. */
const { createClient } = require("@libsql/client");
const crypto = require("node:crypto");
const path = require("node:path");
const fs = require("node:fs");

function makeClient() {
  const url = process.env.TURSO_DATABASE_URL;
  if (url) return createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
  // serverless filesystems are read-only apart from /tmp, and ephemeral either way
  const dir = process.env.MB_DATA || (process.env.VERCEL ? "/tmp/medbridge" : path.join(__dirname, "data"));
  if (process.env.VERCEL) console.warn("TURSO_DATABASE_URL is not set — using a temporary database that will not persist.");
  fs.mkdirSync(dir, { recursive: true });
  return createClient({ url: "file:" + path.join(dir, "medbridge.db") });
}
const client = makeClient();
const REMOTE = !!process.env.TURSO_DATABASE_URL;

/* thin helpers so call sites stay close to the original prepare().get/all/run */
const get = async (sql, ...args) => (await client.execute({ sql, args })).rows[0] ?? null;
const all = async (sql, ...args) => (await client.execute({ sql, args })).rows;
const run = async (sql, ...args) => client.execute({ sql, args });

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  pass TEXT NOT NULL,
  full_name TEXT NOT NULL,
  profession TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT NOT NULL DEFAULT '',
  facility TEXT NOT NULL,
  facility_level TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'user',
  verified INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL,
  last_login TEXT
);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  drug_id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published',
  admin_note TEXT NOT NULL DEFAULT '',
  promoted_to TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_comments_drug ON comments(drug_id, status);
CREATE TABLE IF NOT EXISTS agrees (
  comment_id TEXT NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  PRIMARY KEY (comment_id, user_id)
);
CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  comment_id TEXT NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS official_methods (
  id TEXT PRIMARY KEY,
  drug_id TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'suggested',
  title TEXT NOT NULL,
  best_for TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL,
  monitor TEXT NOT NULL DEFAULT '',
  cautions TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT '',
  published INTEGER NOT NULL DEFAULT 1,
  author_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  from_comment TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_methods_drug ON official_methods(drug_id, published);
CREATE TABLE IF NOT EXISTS audit (
  id TEXT PRIMARY KEY,
  actor_id TEXT,
  action TEXT NOT NULL,
  target TEXT NOT NULL DEFAULT '',
  detail TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS login_attempts (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  first_at TEXT NOT NULL
);
`;

let ready = null;
function init() {
  return ready ||= (async () => {
    if (!REMOTE) { try { await client.execute("PRAGMA journal_mode = WAL"); } catch {} }
    try { await client.execute("PRAGMA foreign_keys = ON"); } catch {}
    await client.executeMultiple(SCHEMA);
    return true;
  })();
}

const now = () => new Date().toISOString();
const uid = (n = 16) => crypto.randomBytes(n).toString("base64url");

/* ---------- passwords ---------- */
function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString("hex");
  return `${salt}:${crypto.scryptSync(pw, salt, 64).toString("hex")}`;
}
function verifyPassword(pw, stored) {
  const [salt, hash] = String(stored).split(":");
  if (!salt || !hash) return false;
  const test = crypto.scryptSync(pw, salt, 64);
  const known = Buffer.from(hash, "hex");
  return test.length === known.length && crypto.timingSafeEqual(test, known);
}

/* ---------- audit ---------- */
const audit = (actorId, action, target = "", detail = "") =>
  run("INSERT INTO audit (id, actor_id, action, target, detail, created_at) VALUES (?,?,?,?,?,?)",
      uid(8), actorId, action, target, detail, now());

/* ---------- sessions ---------- */
const SESSION_DAYS = 30;
async function createSession(userId) {
  const token = uid(32);
  const exp = new Date(Date.now() + SESSION_DAYS * 864e5).toISOString();
  await run("INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?,?,?,?)", token, userId, now(), exp);
  return { token, expires: exp };
}
async function userForToken(token) {
  if (!token) return null;
  const row = await get(`SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
    WHERE s.token = ? AND s.expires_at > ?`, token, now());
  return row && row.status === "active" ? row : null;
}
const destroySession = (token) => token ? run("DELETE FROM sessions WHERE token = ?", token) : Promise.resolve();
const pruneSessions = () => run("DELETE FROM sessions WHERE expires_at <= ?", now());

/* ---------- rate limiting ---------- */
async function tooManyAttempts(key, max = 8, windowMin = 15) {
  const row = await get("SELECT * FROM login_attempts WHERE key = ?", key);
  const cutoff = Date.now() - windowMin * 60000;
  if (!row || new Date(row.first_at).getTime() < cutoff) {
    await run("INSERT INTO login_attempts (key, count, first_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=1, first_at=excluded.first_at", key, now());
    return false;
  }
  await run("UPDATE login_attempts SET count = count + 1 WHERE key = ?", key);
  return Number(row.count) + 1 > max;
}
const clearAttempts = (key) => run("DELETE FROM login_attempts WHERE key = ?", key);

/* ---------- public shapes ---------- */
const publicUser = (u) => u && ({
  id: u.id, email: u.email, name: u.full_name, profession: u.profession, city: u.city, region: u.region,
  facility: u.facility, facilityLevel: u.facility_level, role: u.role, verified: !!Number(u.verified), createdAt: u.created_at
});

/* ---------- first-run admin ---------- */
async function ensureAdmin() {
  const n = Number((await get("SELECT COUNT(*) AS c FROM users WHERE role = 'admin'")).c);
  if (n > 0) return null;
  const email = process.env.MB_ADMIN_EMAIL || "admin@medbridge.local";
  const pw = process.env.MB_ADMIN_PASSWORD || crypto.randomBytes(9).toString("base64url");
  const id = uid(8);
  await run(`INSERT INTO users (id, email, pass, full_name, profession, city, region, facility, facility_level, role, verified, status, created_at)
    VALUES (?,?,?,?,?,?,?,?,?,'admin',1,'active',?)`,
    id, email.toLowerCase(), hashPassword(pw), "MedBridge Administrator", "physician", "Addis Ababa", "Addis Ababa", "MedBridge", "general", now());
  await audit(id, "bootstrap_admin", id, email);
  return { email, password: pw };
}

module.exports = { client, get, all, run, init, now, uid, hashPassword, verifyPassword, audit,
  createSession, userForToken, destroySession, pruneSessions, tooManyAttempts, clearAttempts, publicUser, ensureAdmin };
