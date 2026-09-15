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

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json", ".md": "text/plain; charset=utf-8" };

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
const auth = (req) => D.userForToken(cookies(req).mb_session);   // async
const requireCsrf = (req) => req.headers["x-mb-app"] === "1";

/* ---------- API ---------- */
async function api(req, res, pathname, query) {
  const method = req.method;
  const me = await auth(req);
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
    if (await D.get("SELECT 1 FROM users WHERE email = ?", email)) return bad(res, 409, "An account with that email already exists.");
    if (await D.tooManyAttempts("reg:" + ip, 10, 60)) return bad(res, 429, "Too many sign-ups from this device. Try again later.");
    const id = D.uid(8);
    await D.run(`INSERT INTO users (id, email, pass, full_name, profession, city, region, facility, facility_level, role, verified, status, created_at)
      VALUES (?,?,?,?,?,?,?,?,?, 'user', 0, 'active', ?)`, id, email, D.hashPassword(pw), name, profession, city, region, facility, level, D.now());
    await D.audit(id, "register", id, `${city} · ${facility}`);
    const s = await D.createSession(id);
    const u = await D.get("SELECT * FROM users WHERE id = ?", id);
    return json(res, 201, { user: D.publicUser(u) }, { "Set-Cookie": setCookie("mb_session", s.token, 30 * 86400) });
  }

  if (pathname === "/api/auth/login" && method === "POST") {
    const email = clean(body.email, MAX.email).toLowerCase();
    const pw = String(body.password || "");
    if (await D.tooManyAttempts("login:" + ip + ":" + email)) return bad(res, 429, "Too many attempts. Wait 15 minutes and try again.");
    const u = await D.get("SELECT * FROM users WHERE email = ?", email);
    if (!u || !D.verifyPassword(pw, u.pass)) return bad(res, 401, "Email or password is incorrect.");
    if (u.status !== "active") return bad(res, 403, "This account has been suspended. Contact the administrator.");
    await D.clearAttempts("login:" + ip + ":" + email);
    await D.run("UPDATE users SET last_login = ? WHERE id = ?", D.now(), u.id);
    const s = await D.createSession(u.id);
    return json(res, 200, { user: D.publicUser(u) }, { "Set-Cookie": setCookie("mb_session", s.token, 30 * 86400) });
  }

  if (pathname === "/api/auth/logout" && method === "POST") {
    await D.destroySession(cookies(req).mb_session);
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
    await D.run("UPDATE users SET full_name=?, profession=?, city=?, region=?, facility=?, facility_level=? WHERE id=?", f.full_name, f.profession, f.city, f.region, f.facility, f.facility_level, me.id);
    if (body.newPassword) {
      if (!D.verifyPassword(String(body.currentPassword || ""), me.pass)) return bad(res, 401, "Current password is incorrect.");
      if (String(body.newPassword).length < 8) return bad(res, 400, "New password must be at least 8 characters.");
      await D.run("UPDATE users SET pass = ? WHERE id = ?", D.hashPassword(String(body.newPassword)), me.id);
    }
    return json(res, 200, { user: D.publicUser(await D.get("SELECT * FROM users WHERE id = ?", me.id)) });
  }

  /* --- official (admin-authored) local methods --- */
  if (pathname === "/api/methods" && method === "GET") {
    const drug = clean(query.drug, 60);
    const rows = drug
      ? await D.all("SELECT * FROM official_methods WHERE drug_id = ? AND published = 1 ORDER BY kind = 'main' DESC, updated_at DESC", drug)
      : await D.all("SELECT * FROM official_methods WHERE published = 1 ORDER BY updated_at DESC");
    return json(res, 200, { methods: rows.map(shapeMethod) });
  }

  /* --- practice comments --- */
  if (pathname === "/api/comments" && method === "GET") {
    const drug = clean(query.drug, 60);
    if (!drug) return bad(res, 400, "drug is required.");
    const rows = await D.all(`SELECT c.*, u.full_name, u.profession, u.city, u.facility, u.verified, u.role,
        (SELECT COUNT(*) FROM agrees a WHERE a.comment_id = c.id) AS agrees,
        (SELECT COUNT(*) FROM agrees a WHERE a.comment_id = c.id AND a.user_id = ?) AS mine
      FROM comments c JOIN users u ON u.id = c.user_id
      WHERE c.drug_id = ? AND c.status = 'published'
      ORDER BY agrees DESC, c.created_at DESC`, me ? me.id : "", drug);
    return json(res, 200, { comments: rows.map(r => shapeComment(r, me)) });
  }

  if (pathname === "/api/comments" && method === "POST") {
    if (!me) return bad(res, 401, "Sign in to add a practice note.");
    const drug = clean(body.drug, 60);
    const text = cleanMultiline(body.body, MAX.text);
    if (!drug) return bad(res, 400, "drug is required.");
    if (text.length < 10) return bad(res, 400, "Write at least a sentence describing how you administer it.");
    if (await D.tooManyAttempts("post:" + me.id, 20, 60)) return bad(res, 429, "You have posted a lot recently. Try again later.");
    const id = D.uid(10);
    await D.run("INSERT INTO comments (id, drug_id, user_id, body, created_at, updated_at) VALUES (?,?,?,?,?,?)", id, drug, me.id, text, D.now(), D.now());
    await D.audit(me.id, "comment_create", id, drug);
    const row = await D.get(`SELECT c.*, u.full_name, u.profession, u.city, u.facility, u.verified, u.role, 0 AS agrees, 0 AS mine
      FROM comments c JOIN users u ON u.id = c.user_id WHERE c.id = ?`, id);
    return json(res, 201, { comment: shapeComment(row, me) });
  }

  const cm = pathname.match(/^\/api\/comments\/([A-Za-z0-9_-]{4,24})(\/agree|\/report)?$/);
  if (cm) {
    const [, cid, sub] = cm;
    const c = await D.get("SELECT * FROM comments WHERE id = ?", cid);
    if (!c) return bad(res, 404, "Not found.");
    if (!me) return bad(res, 401, "Sign in first.");
    if (sub === "/agree" && method === "POST") {
      const has = await D.get("SELECT 1 FROM agrees WHERE comment_id = ? AND user_id = ?", cid, me.id);
      if (has) await D.run("DELETE FROM agrees WHERE comment_id = ? AND user_id = ?", cid, me.id);
      else await D.run("INSERT INTO agrees (comment_id, user_id, created_at) VALUES (?,?,?)", cid, me.id, D.now());
      const n = (await D.get("SELECT COUNT(*) AS c FROM agrees WHERE comment_id = ?", cid)).c;
      return json(res, 200, { agrees: n, mine: !has });
    }
    if (sub === "/report" && method === "POST") {
      await D.run("INSERT INTO reports (id, comment_id, user_id, reason, created_at) VALUES (?,?,?,?,?)", D.uid(8), cid, me.id, clean(body.reason, MAX.short) || "unsafe or incorrect", D.now());
      await D.run("UPDATE comments SET status = 'flagged' WHERE id = ? AND status = 'published'", cid);
      await D.audit(me.id, "comment_report", cid, "");
      return json(res, 200, { ok: true });
    }
    const owner = c.user_id === me.id, admin = me.role === "admin";
    if (method === "PATCH") {
      if (!owner && !admin) return bad(res, 403, "Not allowed.");
      const text = cleanMultiline(body.body, MAX.text);
      if (text.length < 10) return bad(res, 400, "Note is too short.");
      await D.run("UPDATE comments SET body = ?, updated_at = ? WHERE id = ?", text, D.now(), cid);
      await D.audit(me.id, "comment_edit", cid, "");
      return json(res, 200, { ok: true });
    }
    if (method === "DELETE") {
      if (!owner && !admin) return bad(res, 403, "Not allowed.");
      await D.run("DELETE FROM comments WHERE id = ?", cid);
      await D.audit(me.id, "comment_delete", cid, owner ? "own" : "admin");
      return json(res, 200, { ok: true });
    }
  }

  /* --- clinical sign-off (reviewers and admins) --- */
  if (pathname === "/api/reviews" && method === "GET") {
    const drug = clean(query.drug, 60);
    if (drug) {
      const rows = await D.all("SELECT * FROM reviews WHERE drug_id = ? ORDER BY created_at DESC LIMIT 50", drug);
      return json(res, 200, { reviews: rows.map(shapeReview) });
    }
    const rows = await D.all(`SELECT r.* FROM reviews r JOIN (SELECT drug_id, MAX(created_at) AS m FROM reviews GROUP BY drug_id) x
      ON x.drug_id = r.drug_id AND x.m = r.created_at`);
    return json(res, 200, { reviews: rows.map(shapeReview) });
  }
  if (pathname === "/api/reviews" && method === "POST") {
    if (!me) return bad(res, 401, "Sign in first.");
    if (!["admin", "reviewer"].includes(me.role) || !Number(me.verified)) return bad(res, 403, "Only verified clinical reviewers can sign off drug entries.");
    const drug = clean(body.drug, 60), hash = clean(body.hash, 64);
    const decision = body.decision === "approved" ? "approved" : body.decision === "changes" ? "changes" : null;
    const checklist = Array.isArray(body.checklist) ? body.checklist.map(x => clean(x, 40)).filter(Boolean) : [];
    const note = cleanMultiline(body.note, MAX.text);
    if (!drug || !/^[a-z0-9]{4,64}$/.test(hash) || !decision) return bad(res, 400, "Drug, content version and decision are required.");
    if (decision === "approved" && REVIEW_CHECKS.some(k => !checklist.includes(k))) return bad(res, 400, "Tick every checklist item before approving.");
    if (decision === "changes" && note.length < 10) return bad(res, 400, "Describe the changes needed.");
    const id = D.uid(10);
    await D.run(`INSERT INTO reviews (id, drug_id, decision, content_hash, checklist, note, reviewer_id, reviewer_name, reviewer_profession, reviewer_facility, created_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`, id, drug, decision, hash, checklist.join(","), note, me.id, me.full_name, me.profession, me.facility, D.now());
    await D.audit(me.id, "review_" + decision, id, drug);
    return json(res, 201, { review: shapeReview(await D.get("SELECT * FROM reviews WHERE id = ?", id)) });
  }

  /* --- stock-out reports --- */
  if (pathname === "/api/stock" && method === "GET") {
    const since = new Date(Date.now() - STOCK_DAYS * 864e5).toISOString();
    const drug = clean(query.drug, 60);
    const rows = drug
      ? await D.all(`SELECT s.*, u.full_name, u.profession, u.verified, u.role FROM stock_reports s JOIN users u ON u.id = s.user_id
          WHERE s.drug_id = ? AND s.hidden = 0 AND s.created_at > ? ORDER BY s.created_at DESC LIMIT 60`, drug, since)
      : await D.all(`SELECT s.*, u.full_name, u.profession, u.verified, u.role FROM stock_reports s JOIN users u ON u.id = s.user_id
          WHERE s.hidden = 0 AND s.created_at > ? ORDER BY s.created_at DESC LIMIT 200`, since);
    // keep only the latest report per facility and drug, so a later "back in stock" replaces an earlier "out"
    const seen = new Set(), latest = [];
    for (const r of rows) { const k = r.drug_id + "|" + r.facility.toLowerCase() + "|" + r.city; if (!seen.has(k)) { seen.add(k); latest.push(r); } }
    return json(res, 200, { days: STOCK_DAYS, reports: latest.map(r => shapeStock(r, me)) });
  }
  if (pathname === "/api/stock" && method === "POST") {
    if (!me) return bad(res, 401, "Sign in to report stock.");
    const drug = clean(body.drug, 60), status = ["out", "low", "available"].includes(body.status) ? body.status : null;
    if (!drug || !status) return bad(res, 400, "Drug and stock status are required.");
    if (await D.tooManyAttempts("stock:" + me.id, 30, 60)) return bad(res, 429, "You have posted a lot recently. Try again later.");
    const id = D.uid(10);
    await D.run("INSERT INTO stock_reports (id, drug_id, user_id, status, city, facility, note, created_at) VALUES (?,?,?,?,?,?,?,?)",
      id, drug, me.id, status, me.city, me.facility, clean(body.note, MAX.short), D.now());
    await D.audit(me.id, "stock_" + status, id, drug);
    return json(res, 201, { ok: true, id });
  }
  const sm = pathname.match(/^\/api\/stock\/([A-Za-z0-9_-]{4,24})$/);
  if (sm && method === "DELETE") {
    if (!me) return bad(res, 401, "Sign in first.");
    const r = await D.get("SELECT * FROM stock_reports WHERE id = ?", sm[1]);
    if (!r) return bad(res, 404, "Not found.");
    if (r.user_id !== me.id && me.role !== "admin") return bad(res, 403, "Not allowed.");
    await D.run("UPDATE stock_reports SET hidden = 1 WHERE id = ?", sm[1]);
    await D.audit(me.id, "stock_remove", sm[1], r.drug_id);
    return json(res, 200, { ok: true });
  }

  /* --- feed: recent notes across all drugs --- */
  if (pathname === "/api/feed" && method === "GET") {
    const rows = await D.all(`SELECT c.*, u.full_name, u.profession, u.city, u.facility, u.verified, u.role,
        (SELECT COUNT(*) FROM agrees a WHERE a.comment_id = c.id) AS agrees, 0 AS mine
      FROM comments c JOIN users u ON u.id = c.user_id
      WHERE c.status = 'published' ORDER BY c.created_at DESC LIMIT 40`);
    const cities = await D.all(`SELECT u.city AS city, COUNT(DISTINCT u.id) AS users, COUNT(c.id) AS notes
      FROM users u LEFT JOIN comments c ON c.user_id = u.id AND c.status='published'
      GROUP BY u.city ORDER BY notes DESC, users DESC LIMIT 30`);
    const totals = {
      users: (await D.get("SELECT COUNT(*) AS c FROM users")).c,
      notes: (await D.get("SELECT COUNT(*) AS c FROM comments WHERE status='published'")).c,
      methods: (await D.get("SELECT COUNT(*) AS c FROM official_methods WHERE published=1")).c
    };
    return json(res, 200, { feed: rows.map(r => shapeComment(r, me)), cities, totals });
  }

  /* --- admin --- */
  if (pathname.startsWith("/api/admin/")) {
    if (!me || me.role !== "admin") return bad(res, 403, "Administrator only.");

    if (pathname === "/api/admin/overview" && method === "GET") {
      return json(res, 200, {
        users: (await D.all("SELECT * FROM users ORDER BY created_at DESC LIMIT 200")).map(D.publicUser),
        flagged: (await D.all(`SELECT c.*, u.full_name, u.profession, u.city, u.facility, u.verified, u.role, 0 AS agrees, 0 AS mine,
            (SELECT GROUP_CONCAT(reason, ' | ') FROM reports r WHERE r.comment_id = c.id) AS reasons
          FROM comments c JOIN users u ON u.id = c.user_id WHERE c.status IN ('flagged','hidden') ORDER BY c.updated_at DESC`)).map(r => ({ ...shapeComment(r, me), reasons: r.reasons || "", status: r.status })),
        methods: (await D.all("SELECT * FROM official_methods ORDER BY drug_id, kind = 'main' DESC")).map(shapeMethod),
        audit: await D.all(`SELECT a.*, u.full_name FROM audit a LEFT JOIN users u ON u.id = a.actor_id ORDER BY a.created_at DESC LIMIT 60`)
      });
    }

    const um = pathname.match(/^\/api\/admin\/users\/([A-Za-z0-9_-]{4,24})$/);
    if (um && method === "PATCH") {
      const id = um[1];
      const t = await D.get("SELECT * FROM users WHERE id = ?", id);
      if (!t) return bad(res, 404, "No such user.");
      if (id === me.id && ((body.role && body.role !== "admin") || body.status === "suspended")) return bad(res, 400, "You cannot remove your own administrator access.");
      const verified = body.verified == null ? t.verified : (body.verified ? 1 : 0);
      const role = ["admin", "reviewer", "user"].includes(body.role) ? body.role : t.role;
      const status = body.status === "suspended" || body.status === "active" ? body.status : t.status;
      await D.run("UPDATE users SET verified = ?, role = ?, status = ? WHERE id = ?", verified, role, status, id);
      if (status === "suspended") await D.run("DELETE FROM sessions WHERE user_id = ?", id);
      await D.audit(me.id, "user_update", id, `verified=${verified} role=${role} status=${status}`);
      return json(res, 200, { user: D.publicUser(await D.get("SELECT * FROM users WHERE id = ?", id)) });
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
          await D.run(`INSERT INTO official_methods (id, drug_id, kind, title, best_for, body, monitor, cautions, source, published, author_id, from_comment, created_at, updated_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, nid, f.drug_id, f.kind, f.title, f.best_for, f.body, f.monitor, f.cautions, f.source, f.published, me.id, clean(body.fromComment, 24) || null, D.now(), D.now());
          if (body.fromComment) await D.run("UPDATE comments SET promoted_to = ? WHERE id = ?", nid, clean(body.fromComment, 24));
          await D.audit(me.id, "method_create", nid, f.drug_id);
          return json(res, 201, { method: shapeMethod(await D.get("SELECT * FROM official_methods WHERE id = ?", nid)) });
        }
        if (!id) return bad(res, 400, "Missing id.");
        await D.run(`UPDATE official_methods SET drug_id=?, kind=?, title=?, best_for=?, body=?, monitor=?, cautions=?, source=?, published=?, updated_at=? WHERE id=?`, f.drug_id, f.kind, f.title, f.best_for, f.body, f.monitor, f.cautions, f.source, f.published, D.now(), id);
        await D.audit(me.id, "method_update", id, f.drug_id);
        return json(res, 200, { method: shapeMethod(await D.get("SELECT * FROM official_methods WHERE id = ?", id)) });
      }
      if (method === "DELETE" && id) {
        await D.run("DELETE FROM official_methods WHERE id = ?", id);
        await D.audit(me.id, "method_delete", id, "");
        return json(res, 200, { ok: true });
      }
    }

    const cmA = pathname.match(/^\/api\/admin\/comments\/([A-Za-z0-9_-]{4,24})$/);
    if (cmA && method === "PATCH") {
      const st = ["published", "hidden", "flagged"].includes(body.status) ? body.status : null;
      if (!st) return bad(res, 400, "Bad status.");
      await D.run("UPDATE comments SET status = ?, admin_note = ?, updated_at = ? WHERE id = ?", st, clean(body.adminNote, MAX.short), D.now(), cmA[1]);
      if (st === "published") await D.run("DELETE FROM reports WHERE comment_id = ?", cmA[1]);
      await D.audit(me.id, "comment_moderate", cmA[1], st);
      return json(res, 200, { ok: true });
    }
  }

  return bad(res, 404, "No such endpoint.");
}

const REVIEW_CHECKS = ["doses", "methods", "paediatric", "safety", "national"];
const STOCK_DAYS = 30;
const shapeReview = (r) => ({ id: r.id, drug: r.drug_id, decision: r.decision, hash: r.content_hash, checklist: r.checklist ? r.checklist.split(",") : [], note: r.note,
  reviewer: { name: r.reviewer_name, profession: r.reviewer_profession, facility: r.reviewer_facility }, createdAt: r.created_at });
const shapeStock = (r, me) => ({ id: r.id, drug: r.drug_id, status: r.status, city: r.city, facility: r.facility, note: r.note, createdAt: r.created_at,
  own: !!(me && me.id === r.user_id), author: { name: r.full_name, profession: r.profession, verified: !!Number(r.verified) } });
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

/* ---------- request handler (shared by the standalone server and Vercel) ---------- */
let bootOnce = null;
function boot() {
  return bootOnce ||= (async () => {
    await D.init();
    const created = await D.ensureAdmin();
    await D.pruneSessions();
    return created;
  })();
}

async function handle(req, res) {
  try {
    await boot();
    const u = new URL(req.url, "http://localhost");
    const pathname = u.pathname;
    const query = Object.fromEntries(u.searchParams);
    if (pathname.startsWith("/api/")) return await api(req, res, pathname, query);
    return serveStatic(req, res, pathname);
  } catch (e) {
    console.error(e);
    if (!res.headersSent) bad(res, 500, "Server error.");
  }
}
module.exports = handle;

/* ---------- standalone server (not used on Vercel) ---------- */
if (require.main === module) {
  if (PROD) {
    const pw = process.env.MB_ADMIN_PASSWORD;
    if (!pw || pw.length < 12 || /changeme/i.test(pw)) {
      console.error("\nRefusing to start: in production you must set MB_ADMIN_PASSWORD to a strong value (12+ characters, not 'ChangeMe...').\nSet MB_ADMIN_EMAIL too. Existing admin accounts keep their own password; this only seeds the first one.\n");
      process.exit(1);
    }
  }
  setInterval(() => D.pruneSessions().catch(() => {}), 6 * 3600e3).unref();
  http.createServer(handle).listen(PORT, HOST, async () => {
    console.log(`MedBridge running at http://${HOST}:${PORT}`);
    if (PROD) console.log(`  production mode: secure cookies, HSTS and CSP enabled`);
    const created = await boot();
    if (created) console.log(`\n  FIRST-RUN ADMIN ACCOUNT\n  email:    ${created.email}\n  password: ${created.password}\n  Sign in and change this password immediately.\n`);
  });
}
