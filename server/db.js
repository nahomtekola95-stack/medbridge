/* MedBridge — SQLite schema and helpers (node:sqlite, zero dependencies). */
const { DatabaseSync } = require("node:sqlite");
const crypto = require("node:crypto");
const path = require("node:path");
const fs = require("node:fs");

const DIR = process.env.MB_DATA || path.join(__dirname, "data");
fs.mkdirSync(DIR, { recursive: true });
const db = new DatabaseSync(path.join(DIR, "medbridge.db"));

db.exec(`
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  pass TEXT NOT NULL,                 -- scrypt: salt:hash
  full_name TEXT NOT NULL,
  profession TEXT NOT NULL,           -- physician | nurse | midwife | pharmacist | anaesthetist | HO | other
  city TEXT NOT NULL,
  region TEXT NOT NULL DEFAULT '',
  facility TEXT NOT NULL,
  facility_level TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'user',  -- user | admin
  verified INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active', -- active | suspended
  created_at TEXT NOT NULL,
  last_login TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

-- Practice reports from users. Never authoritative; always attributed.
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  drug_id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published', -- published | hidden | flagged
  admin_note TEXT NOT NULL DEFAULT '',
  promoted_to TEXT,                   -- official_methods.id if adopted
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

-- Authoritative local methods. ADMIN ONLY.
CREATE TABLE IF NOT EXISTS official_methods (
  id TEXT PRIMARY KEY,
  drug_id TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'suggested', -- main | suggested
  title TEXT NOT NULL,
  best_for TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL,                 -- steps, one per line
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
`);

const now = () => new Date().toISOString();
const uid = (n = 16) => crypto.randomBytes(n).toString("base64url");

/* ---------- passwords ---------- */
function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(pw, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}
function verifyPassword(pw, stored) {
  const [salt, hash] = String(stored).split(":");
  if (!salt || !hash) return false;
  const test = crypto.scryptSync(pw, salt, 64);
  const known = Buffer.from(hash, "hex");
  return test.length === known.length && crypto.timingSafeEqual(test, known);
}

/* ---------- audit ---------- */
function audit(actorId, action, target = "", detail = "") {
  db.prepare("INSERT INTO audit (id, actor_id, action, target, detail, created_at) VALUES (?,?,?,?,?,?)")
    .run(uid(8), actorId, action, target, detail, now());
}

/* ---------- sessions ---------- */
const SESSION_DAYS = 30;
function createSession(userId) {
  const token = uid(32);
  const exp = new Date(Date.now() + SESSION_DAYS * 864e5).toISOString();
  db.prepare("INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?,?,?,?)").run(token, userId, now(), exp);
  return { token, expires: exp };
}
function userForToken(token) {
  if (!token) return null;
  const row = db.prepare(`SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
    WHERE s.token = ? AND s.expires_at > ?`).get(token, now());
  if (!row || row.status !== "active") return null;
  return row;
}
function destroySession(token) { if (token) db.prepare("DELETE FROM sessions WHERE token = ?").run(token); }
function pruneSessions() { db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(now()); }

/* ---------- rate limiting ---------- */
function tooManyAttempts(key, max = 8, windowMin = 15) {
  const row = db.prepare("SELECT * FROM login_attempts WHERE key = ?").get(key);
  const cutoff = Date.now() - windowMin * 60000;
  if (!row || new Date(row.first_at).getTime() < cutoff) {
    db.prepare("INSERT INTO login_attempts (key, count, first_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=1, first_at=excluded.first_at").run(key, now());
    return false;
  }
  db.prepare("UPDATE login_attempts SET count = count + 1 WHERE key = ?").run(key);
  return row.count + 1 > max;
}
function clearAttempts(key) { db.prepare("DELETE FROM login_attempts WHERE key = ?").run(key); }

/* ---------- public shapes ---------- */
const publicUser = (u) => u && ({
  id: u.id, email: u.email, name: u.full_name, profession: u.profession, city: u.city, region: u.region,
  facility: u.facility, facilityLevel: u.facility_level, role: u.role, verified: !!u.verified, createdAt: u.created_at
});
const authorOf = (u) => ({ name: u.full_name, profession: u.profession, city: u.city, facility: u.facility, verified: !!u.verified, role: u.role });

/* ---------- first-run admin ---------- */
function ensureAdmin() {
  const n = db.prepare("SELECT COUNT(*) AS c FROM users WHERE role = 'admin'").get().c;
  if (n > 0) return null;
  const email = process.env.MB_ADMIN_EMAIL || "admin@medbridge.local";
  const pw = process.env.MB_ADMIN_PASSWORD || crypto.randomBytes(9).toString("base64url");
  const id = uid(8);
  db.prepare(`INSERT INTO users (id, email, pass, full_name, profession, city, region, facility, facility_level, role, verified, status, created_at)
    VALUES (?,?,?,?,?,?,?,?,?,'admin',1,'active',?)`)
    .run(id, email.toLowerCase(), hashPassword(pw), "MedBridge Administrator", "physician", "Addis Ababa", "Addis Ababa", "MedBridge", "general", now());
  audit(id, "bootstrap_admin", id, email);
  return { email, password: pw };
}

module.exports = { db, now, uid, hashPassword, verifyPassword, audit, createSession, userForToken, destroySession, pruneSessions, tooManyAttempts, clearAttempts, publicUser, authorOf, ensureAdmin };
