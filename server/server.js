/* MedBridge server: static PWA + JSON API for accounts, practice comments and admin methods.
   Zero dependencies (node:http + node:sqlite). Node 22+. */
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const D = require("./db.js");

const ROOT = path.join(__dirname, "..");
const PORT = +(process.env.PORT || 3700);
const HOST = process.env.HOST || (process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1");
const PROD = process.env.NODE_ENV === "production";

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json", ".md": "text/plain; charset=utf-8" };

const PROFESSIONS = ["physician", "general practitioner", "resident", "health officer", "nurse", "midwife", "pharmacist", "anaesthetist", "emergency surgical officer", "paramedic", "student", "other"];
const LEVELS = ["health post", "health centre", "primary hospital", "general hospital", "specialised/referral hospital", "private clinic", "other"];
const MAX = { name: 80, email: 120, text: 4000, short: 120, pw: 200 };

/* ---------- helpers ---------- */
const json = (res, code, body, headers = {}) => {
  const s = JSON.stringify(body);
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...headers });
  res.end(s);
};
const bad = (res, code, error) => json(res, code, { error });
const cookies = (req) => Object.fromEntries((req.headers.cookie || "").split(";").map(c => c.trim().split("=")).filter(p => p[0]).map(p => [p[0], decodeURIComponent(p.slice(1).join("="))]));
const setCookie = (name, val, maxAgeSec) => `${name}=${encodeURIComponent(val)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAgeSec}${PROD ? "; Secure" : ""}`;
const clean = (v, max) => String(v ?? "").trim().replace(/\s+/g, " ").slice(0, max);
const cleanMultiline = (v, max) => String(v ?? "").replace(/\r\n/g, "\n").replace(/[^\S\n]+/g, " ").trim().slice(0, max);
const isEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

function readBody(req, limit = 64 * 1024) {
  return new Promise((resolve, reject) => {
    let n = 0; const chunks = [];
    req.on("data", c => { n += c.length; if (n > limit) { reject(new Error("too large")); req.destroy(); } else chunks.push(c); });
    req.on("end", () => { try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {}); } catch { reject(new Error("bad json")); } });
    req.on("error", reject);
  });
}
const auth = (req) => D.userForToken(cookies(req).mb_session);
const requireCsrf = (req) => req.headers["x-mb-app"] === "1";

/* ---------- API ---------- */
async function api(req, res, pathname, query) {
  const method = req.method;
  const me = auth(req);
  const mutating = method !== "GET" && method !== "HEAD";
  if (mutating && !requireCsrf(req)) return bad(res, 403, "Missing app header.");
  const body = mutating ? await readBody(req).catch(() => null) : {};
  if (mutating && body === null) return bad(res, 400, "Bad request body.");
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();

  /* --- meta --- */
  if (pathname === "/api/healthz" && method === "GET")
    return json(res, 200, { ok: true, drugs: true, uptime: Math.round(process.uptime()) });

  if (pathname === "/api/meta" && method === "GET")
    return json(res, 200, { professions: PROFESSIONS, levels: LEVELS, signupOpen: true });

  /* --- auth --- */
  if (pathname === "/api/auth/register" && method === "POST") {
    const email = clean(body.email, MAX.email).toLowerCase();
    const pw = String(body.password || "");
    const name = clean(body.name, MAX.name);
    const profession = clean(body.profession, MAX.short);
    const city = clean(body.city, MAX.short);
    const region = clean(body.region, MAX.short);
    const facility = clean(body.facility, MAX.short);
    const level = clean(body.facilityLevel, MAX.short);
    if (!isEmail(email)) return bad(res, 400, "Enter a valid email address.");
    if (pw.length < 8 || pw.length > MAX.pw) return bad(res, 400, "Password must be at least 8 characters.");
    if (name.length < 2) return bad(res, 400, "Enter your full name.");
    if (!PROFESSIONS.includes(profession)) return bad(res, 400, "Choose your profession.");
    if (!city) return bad(res, 400, "Choose the city or town where you work.");
    if (!facility) return bad(res, 400, "Enter your hospital or health facility.");
    if (D.db.prepare("SELECT 1 FROM users WHERE email = ?").get(email)) return bad(res, 409, "An account with that email already exists.");
    if (D.tooManyAttempts("reg:" + ip, 10, 60)) return bad(res, 429, "Too many sign-ups from this device. Try again later.");
    const id = D.uid(8);
    D.db.prepare(`INSERT INTO users (id, email, pass, full_name, profession, city, region, facility, facility_level, role, verified, status, created_at)
      VALUES (?,?,?,?,?,?,?,?,?, 'user', 0, 'active', ?)`)
      .run(id, email, D.hashPassword(pw), name, profession, city, region, facility, level, D.now());
    D.audit(id, "register", id, `${city} · ${facility}`);
    const s = D.createSession(id);
    const u = D.db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    return json(res, 201, { user: D.publicUser(u) }, { "Set-Cookie": setCookie("mb_session", s.token, 30 * 86400) });
  }

  if (pathname === "/api/auth/login" && method === "POST") {
    const email = clean(body.email, MAX.email).toLowerCase();
    const pw = String(body.password || "");
    if (D.tooManyAttempts("login:" + ip + ":" + email)) return bad(res, 429, "Too many attempts. Wait 15 minutes and try again.");
    const u = D.db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!u || !D.verifyPassword(pw, u.pass)) return bad(res, 401, "Email or password is incorrect.");
    if (u.status !== "active") return bad(res, 403, "This account has been suspended. Contact the administrator.");
    D.clearAttempts("login:" + ip + ":" + email);
    D.db.prepare("UPDATE users SET last_login = ? WHERE id = ?").run(D.now(), u.id);
    const s = D.createSession(u.id);
    return json(res, 200, { user: D.publicUser(u) }, { "Set-Cookie": setCookie("mb_session", s.token, 30 * 86400) });
  }

  if (pathname === "/api/auth/logout" && method === "POST") {
    D.destroySession(cookies(req).mb_session);
    return json(res, 200, { ok: true }, { "Set-Cookie": setCookie("mb_session", "", 0) });
  }

  if (pathname === "/api/me" && method === "GET") return json(res, 200, { user: D.publicUser(me) });

  if (pathname === "/api/me" && method === "PATCH") {
    if (!me) return bad(res, 401, "Sign in first.");
    const f = {
      full_name: clean(body.name, MAX.name) || me.full_name,
      profession: PROFESSIONS.includes(clean(body.profession, MAX.short)) ? clean(body.profession, MAX.short) : me.profession,
      city: clean(body.city, MAX.short) || me.city,
      region: clean(body.region, MAX.short) || me.region,
      facility: clean(body.facility, MAX.short) || me.facility,
      facility_level: clean(body.facilityLevel, MAX.short) || me.facility_level
    };
    D.db.prepare("UPDATE users SET full_name=?, profession=?, city=?, region=?, facility=?, facility_level=? WHERE id=?")
      .run(f.full_name, f.profession, f.city, f.region, f.facility, f.facility_level, me.id);
    if (body.newPassword) {
      if (!D.verifyPassword(String(body.currentPassword || ""), me.pass)) return bad(res, 401, "Current password is incorrect.");
      if (String(body.newPassword).length < 8) return bad(res, 400, "New password must be at least 8 characters.");
      D.db.prepare("UPDATE users SET pass = ? WHERE id = ?").run(D.hashPassword(String(body.newPassword)), me.id);
    }
    return json(res, 200, { user: D.publicUser(D.db.prepare("SELECT * FROM users WHERE id = ?").get(me.id)) });
  }

  /* --- official (admin-authored) local methods --- */
  if (pathname === "/api/methods" && method === "GET") {
    const drug = clean(query.drug, 60);
    const rows = drug
      ? D.db.prepare("SELECT * FROM official_methods WHERE drug_id = ? AND published = 1 ORDER BY kind = 'main' DESC, updated_at DESC").all(drug)
      : D.db.prepare("SELECT * FROM official_methods WHERE published = 1 ORDER BY updated_at DESC").all();
    return json(res, 200, { methods: rows.map(shapeMethod) });
  }

  /* --- practice comments --- */
  if (pathname === "/api/comments" && method === "GET") {
    const drug = clean(query.drug, 60);
    if (!drug) return bad(res, 400, "drug is required.");
    const rows = D.db.prepare(`SELECT c.*, u.full_name, u.profession, u.city, u.facility, u.verified, u.role,
        (SELECT COUNT(*) FROM agrees a WHERE a.comment_id = c.id) AS agrees,
        (SELECT COUNT(*) FROM agrees a WHERE a.comment_id = c.id AND a.user_id = ?) AS mine
      FROM comments c JOIN users u ON u.id = c.user_id
      WHERE c.drug_id = ? AND c.status = 'published'
      ORDER BY agrees DESC, c.created_at DESC`).all(me ? me.id : "", drug);
    return json(res, 200, { comments: rows.map(r => shapeComment(r, me)) });
  }

  if (pathname === "/api/comments" && method === "POST") {
    if (!me) return bad(res, 401, "Sign in to add a practice note.");
    const drug = clean(body.drug, 60);
    const text = cleanMultiline(body.body, MAX.text);
    if (!drug) return bad(res, 400, "drug is required.");
    if (text.length < 10) return bad(res, 400, "Write at least a sentence describing how you administer it.");
    if (D.tooManyAttempts("post:" + me.id, 20, 60)) return bad(res, 429, "You have posted a lot recently. Try again later.");
    const id = D.uid(10);
    D.db.prepare("INSERT INTO comments (id, drug_id, user_id, body, created_at, updated_at) VALUES (?,?,?,?,?,?)")
      .run(id, drug, me.id, text, D.now(), D.now());
    D.audit(me.id, "comment_create", id, drug);
    const row = D.db.prepare(`SELECT c.*, u.full_name, u.profession, u.city, u.facility, u.verified, u.role, 0 AS agrees, 0 AS mine
      FROM comments c JOIN users u ON u.id = c.user_id WHERE c.id = ?`).get(id);
    return json(res, 201, { comment: shapeComment(row, me) });
  }

  const cm = pathname.match(/^\/api\/comments\/([A-Za-z0-9_-]{4,24})(\/agree|\/report)?$/);
  if (cm) {
    const [, cid, sub] = cm;
    const c = D.db.prepare("SELECT * FROM comments WHERE id = ?").get(cid);
    if (!c) return bad(res, 404, "Not found.");
    if (!me) return bad(res, 401, "Sign in first.");
    if (sub === "/agree" && method === "POST") {
      const has = D.db.prepare("SELECT 1 FROM agrees WHERE comment_id = ? AND user_id = ?").get(cid, me.id);
      if (has) D.db.prepare("DELETE FROM agrees WHERE comment_id = ? AND user_id = ?").run(cid, me.id);
      else D.db.prepare("INSERT INTO agrees (comment_id, user_id, created_at) VALUES (?,?,?)").run(cid, me.id, D.now());
      const n = D.db.prepare("SELECT COUNT(*) AS c FROM agrees WHERE comment_id = ?").get(cid).c;
      return json(res, 200, { agrees: n, mine: !has });
    }
    if (sub === "/report" && method === "POST") {
      D.db.prepare("INSERT INTO reports (id, comment_id, user_id, reason, created_at) VALUES (?,?,?,?,?)")
        .run(D.uid(8), cid, me.id, clean(body.reason, MAX.short) || "unsafe or incorrect", D.now());
      D.db.prepare("UPDATE comments SET status = 'flagged' WHERE id = ? AND status = 'published'").run(cid);
      D.audit(me.id, "comment_report", cid, "");
      return json(res, 200, { ok: true });
    }
    const owner = c.user_id === me.id, admin = me.role === "admin";
    if (method === "PATCH") {
      if (!owner && !admin) return bad(res, 403, "Not allowed.");
      const text = cleanMultiline(body.body, MAX.text);
      if (text.length < 10) return bad(res, 400, "Note is too short.");
      D.db.prepare("UPDATE comments SET body = ?, updated_at = ? WHERE id = ?").run(text, D.now(), cid);
      D.audit(me.id, "comment_edit", cid, "");
      return json(res, 200, { ok: true });
    }
    if (method === "DELETE") {
      if (!owner && !admin) return bad(res, 403, "Not allowed.");
      D.db.prepare("DELETE FROM comments WHERE id = ?").run(cid);
      D.audit(me.id, "comment_delete", cid, owner ? "own" : "admin");
      return json(res, 200, { ok: true });
    }
  }

  /* --- feed: recent notes across all drugs --- */
  if (pathname === "/api/feed" && method === "GET") {
    const rows = D.db.prepare(`SELECT c.*, u.full_name, u.profession, u.city, u.facility, u.verified, u.role,
        (SELECT COUNT(*) FROM agrees a WHERE a.comment_id = c.id) AS agrees, 0 AS mine
      FROM comments c JOIN users u ON u.id = c.user_id
      WHERE c.status = 'published' ORDER BY c.created_at DESC LIMIT 40`).all();
    const cities = D.db.prepare(`SELECT u.city AS city, COUNT(DISTINCT u.id) AS users, COUNT(c.id) AS notes
      FROM users u LEFT JOIN comments c ON c.user_id = u.id AND c.status='published'
      GROUP BY u.city ORDER BY notes DESC, users DESC LIMIT 30`).all();
    const totals = {
      users: D.db.prepare("SELECT COUNT(*) AS c FROM users").get().c,
      notes: D.db.prepare("SELECT COUNT(*) AS c FROM comments WHERE status='published'").get().c,
      methods: D.db.prepare("SELECT COUNT(*) AS c FROM official_methods WHERE published=1").get().c
    };
    return json(res, 200, { feed: rows.map(r => shapeComment(r, me)), cities, totals });
  }

  /* --- admin --- */
  if (pathname.startsWith("/api/admin/")) {
    if (!me || me.role !== "admin") return bad(res, 403, "Administrator only.");

    if (pathname === "/api/admin/overview" && method === "GET") {
      return json(res, 200, {
        users: D.db.prepare("SELECT * FROM users ORDER BY created_at DESC LIMIT 200").all().map(D.publicUser),
        flagged: D.db.prepare(`SELECT c.*, u.full_name, u.profession, u.city, u.facility, u.verified, u.role, 0 AS agrees, 0 AS mine,
            (SELECT GROUP_CONCAT(reason, ' | ') FROM reports r WHERE r.comment_id = c.id) AS reasons
          FROM comments c JOIN users u ON u.id = c.user_id WHERE c.status IN ('flagged','hidden') ORDER BY c.updated_at DESC`).all().map(r => ({ ...shapeComment(r, me), reasons: r.reasons || "", status: r.status })),
        methods: D.db.prepare("SELECT * FROM official_methods ORDER BY drug_id, kind = 'main' DESC").all().map(shapeMethod),
        audit: D.db.prepare(`SELECT a.*, u.full_name FROM audit a LEFT JOIN users u ON u.id = a.actor_id ORDER BY a.created_at DESC LIMIT 60`).all()
      });
    }

    const um = pathname.match(/^\/api\/admin\/users\/([A-Za-z0-9_-]{4,24})$/);
    if (um && method === "PATCH") {
      const id = um[1];
      const t = D.db.prepare("SELECT * FROM users WHERE id = ?").get(id);
      if (!t) return bad(res, 404, "No such user.");
      if (id === me.id && (body.role === "user" || body.status === "suspended")) return bad(res, 400, "You cannot remove your own administrator access.");
      const verified = body.verified == null ? t.verified : (body.verified ? 1 : 0);
      const role = body.role === "admin" || body.role === "user" ? body.role : t.role;
      const status = body.status === "suspended" || body.status === "active" ? body.status : t.status;
      D.db.prepare("UPDATE users SET verified = ?, role = ?, status = ? WHERE id = ?").run(verified, role, status, id);
      if (status === "suspended") D.db.prepare("DELETE FROM sessions WHERE user_id = ?").run(id);
      D.audit(me.id, "user_update", id, `verified=${verified} role=${role} status=${status}`);
      return json(res, 200, { user: D.publicUser(D.db.prepare("SELECT * FROM users WHERE id = ?").get(id)) });
    }

    const mm = pathname.match(/^\/api\/admin\/methods(?:\/([A-Za-z0-9_-]{4,24}))?$/);
    if (mm) {
      const id = mm[1];
      if (method === "POST" || method === "PATCH") {
        const f = {
          drug_id: clean(body.drug, 60), kind: body.kind === "main" ? "main" : "suggested",
          title: clean(body.title, MAX.short), best_for: clean(body.bestFor, MAX.short),
          body: cleanMultiline(body.body, MAX.text), monitor: cleanMultiline(body.monitor, MAX.text),
          cautions: cleanMultiline(body.cautions, MAX.text), source: clean(body.source, MAX.short),
          published: body.published === false ? 0 : 1
        };
        if (!f.drug_id || !f.title || f.body.length < 10) return bad(res, 400, "Drug, title and steps are required.");
        if (method === "POST") {
          const nid = D.uid(10);
          D.db.prepare(`INSERT INTO official_methods (id, drug_id, kind, title, best_for, body, monitor, cautions, source, published, author_id, from_comment, created_at, updated_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
            .run(nid, f.drug_id, f.kind, f.title, f.best_for, f.body, f.monitor, f.cautions, f.source, f.published, me.id, clean(body.fromComment, 24) || null, D.now(), D.now());
          if (body.fromComment) D.db.prepare("UPDATE comments SET promoted_to = ? WHERE id = ?").run(nid, clean(body.fromComment, 24));
          D.audit(me.id, "method_create", nid, f.drug_id);
          return json(res, 201, { method: shapeMethod(D.db.prepare("SELECT * FROM official_methods WHERE id = ?").get(nid)) });
        }
        if (!id) return bad(res, 400, "Missing id.");
        D.db.prepare(`UPDATE official_methods SET drug_id=?, kind=?, title=?, best_for=?, body=?, monitor=?, cautions=?, source=?, published=?, updated_at=? WHERE id=?`)
          .run(f.drug_id, f.kind, f.title, f.best_for, f.body, f.monitor, f.cautions, f.source, f.published, D.now(), id);
        D.audit(me.id, "method_update", id, f.drug_id);
        return json(res, 200, { method: shapeMethod(D.db.prepare("SELECT * FROM official_methods WHERE id = ?").get(id)) });
      }
      if (method === "DELETE" && id) {
        D.db.prepare("DELETE FROM official_methods WHERE id = ?").run(id);
        D.audit(me.id, "method_delete", id, "");
        return json(res, 200, { ok: true });
      }
    }

    const cmA = pathname.match(/^\/api\/admin\/comments\/([A-Za-z0-9_-]{4,24})$/);
    if (cmA && method === "PATCH") {
      const st = ["published", "hidden", "flagged"].includes(body.status) ? body.status : null;
      if (!st) return bad(res, 400, "Bad status.");
      D.db.prepare("UPDATE comments SET status = ?, admin_note = ?, updated_at = ? WHERE id = ?")
        .run(st, clean(body.adminNote, MAX.short), D.now(), cmA[1]);
      if (st === "published") D.db.prepare("DELETE FROM reports WHERE comment_id = ?").run(cmA[1]);
      D.audit(me.id, "comment_moderate", cmA[1], st);
      return json(res, 200, { ok: true });
    }
  }

  return bad(res, 404, "No such endpoint.");
}

const shapeMethod = (m) => ({ id: m.id, drug: m.drug_id, kind: m.kind, title: m.title, bestFor: m.best_for, steps: m.body.split("\n").filter(Boolean), monitor: m.monitor.split("\n").filter(Boolean), cautions: m.cautions.split("\n").filter(Boolean), source: m.source, published: !!m.published, updatedAt: m.updated_at, fromComment: m.from_comment });
const shapeComment = (r, me) => ({
  id: r.id, drug: r.drug_id, body: r.body, createdAt: r.created_at, updatedAt: r.updated_at,
  agrees: r.agrees || 0, mine: !!r.mine, own: !!(me && me.id === r.user_id), promoted: !!r.promoted_to,
  author: { name: r.full_name, profession: r.profession, city: r.city, facility: r.facility, verified: !!r.verified, admin: r.role === "admin" }
});

/* ---------- static ---------- */
function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel === "/" || rel === "") rel = "/index.html";
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT) || /\/(server|data)(\/|$)/.test(rel)) return bad(res, 403, "Forbidden.");
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) {
      if (path.extname(rel)) { res.writeHead(404); return res.end("Not found"); }
      return sendFile(res, path.join(ROOT, "index.html"));
    }
    sendFile(res, file, st);
  });
}
function sendFile(res, file, st) {
  const ext = path.extname(file).toLowerCase();
  const headers = {
    "Content-Type": MIME[ext] || "application/octet-stream",
    "Cache-Control": PROD && ext !== ".html" ? "public, max-age=300" : "no-cache",
    "X-Content-Type-Options": "nosniff", "X-Frame-Options": "SAMEORIGIN", "Referrer-Policy": "same-origin",
    "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'self'",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
  };
  if (PROD) headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains";
  if (st) headers["Content-Length"] = st.size;
  res.writeHead(200, headers);
  fs.createReadStream(file).pipe(res);
}

/* ---------- boot ---------- */
const server = http.createServer((req, res) => {
  const u = new URL(req.url, "http://localhost");
  const pathname = u.pathname;
  const query = Object.fromEntries(u.searchParams);
  if (pathname.startsWith("/api/")) {
    api(req, res, pathname, query).catch(e => { console.error(e); if (!res.headersSent) bad(res, 500, "Server error."); });
    return;
  }
  serveStatic(req, res, pathname);
});

if (PROD) {
  const pw = process.env.MB_ADMIN_PASSWORD;
  if (!pw || pw.length < 12 || /changeme/i.test(pw)) {
    console.error("\nRefusing to start: in production you must set MB_ADMIN_PASSWORD to a strong value (12+ characters, not 'ChangeMe...').\nSet MB_ADMIN_EMAIL too. Existing admin accounts keep their own password; this only seeds the first one.\n");
    process.exit(1);
  }
}
const created = D.ensureAdmin();
D.pruneSessions();
setInterval(D.pruneSessions, 6 * 3600e3).unref();
server.listen(PORT, HOST, () => {
  console.log(`MedBridge running at http://${HOST}:${PORT}`);
  if (PROD) console.log(`  production mode: secure cookies, HSTS and CSP enabled`);
  if (created) console.log(`\n  FIRST-RUN ADMIN ACCOUNT\n  email:    ${created.email}\n  password: ${created.password}\n  Sign in and change this password immediately.\n`);
});
