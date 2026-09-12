/* MedBridge API client — accounts, practice notes, admin methods.
   Fails soft: when offline or the server is absent, the reference content still works. */
(function () {
  const state = { user: null, online: true, meta: null, ready: false };
  const listeners = new Set();
  const emit = () => listeners.forEach(f => { try { f(state); } catch {} });

  async function call(path, { method = "GET", body } = {}) {
    const res = await fetch("/api" + path, {
      method,
      headers: { "Content-Type": "application/json", "X-MB-App": "1" },
      credentials: "same-origin",
      body: body ? JSON.stringify(body) : undefined
    });
    let data = {};
    try { data = await res.json(); } catch {}
    if (!res.ok) throw Object.assign(new Error(data.error || `Request failed (${res.status})`), { status: res.status });
    return data;
  }

  const cacheKey = (d) => "mb:cache:" + d;
  const cacheGet = (d) => { try { return JSON.parse(localStorage.getItem(cacheKey(d)) || "null"); } catch { return null; } };
  const cacheSet = (d, v) => { try { localStorage.setItem(cacheKey(d), JSON.stringify({ ...v, at: Date.now() })); } catch {} };

  const API = {
    state, onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    get user() { return state.user; },
    get isAdmin() { return state.user?.role === "admin"; },

    async init() {
      if (window.MB_NO_SERVER) { state.online = false; state.ready = true; state.serverless = true; emit(); return state; }
      try {
        const [me, meta] = await Promise.all([call("/me"), call("/meta")]);
        state.user = me.user || null; state.meta = meta; state.online = true;
      } catch { state.online = false; }
      state.ready = true; emit();
      return state;
    },
    async register(f) { const r = await call("/auth/register", { method: "POST", body: f }); state.user = r.user; emit(); return r.user; },
    async login(email, password) { const r = await call("/auth/login", { method: "POST", body: { email, password } }); state.user = r.user; emit(); return r.user; },
    async logout() { try { await call("/auth/logout", { method: "POST" }); } catch {} state.user = null; emit(); },
    async updateMe(f) { const r = await call("/me", { method: "PATCH", body: f }); state.user = r.user; emit(); return r.user; },

    /** Drug page payload: admin-authored methods + user practice notes. Cached for offline reading. */
    async drugExtras(drug) {
      try {
        const [m, c] = await Promise.all([call("/methods?drug=" + encodeURIComponent(drug)), call("/comments?drug=" + encodeURIComponent(drug))]);
        const payload = { methods: m.methods, comments: c.comments };
        cacheSet(drug, payload); state.online = true;
        return { ...payload, cached: false };
      } catch {
        state.online = false;
        const c = cacheGet(drug);
        return c ? { methods: c.methods || [], comments: c.comments || [], cached: true, at: c.at } : { methods: [], comments: [], offline: true };
      }
    },
    postComment(drug, body) { return call("/comments", { method: "POST", body: { drug, body } }); },
    editComment(id, body) { return call("/comments/" + id, { method: "PATCH", body: { body } }); },
    deleteComment(id) { return call("/comments/" + id, { method: "DELETE" }); },
    agree(id) { return call("/comments/" + id + "/agree", { method: "POST" }); },
    report(id, reason) { return call("/comments/" + id + "/report", { method: "POST", body: { reason } }); },
    feed() { return call("/feed"); },

    adminOverview() { return call("/admin/overview"); },
    adminSaveMethod(f, id) { return call("/admin/methods" + (id ? "/" + id : ""), { method: id ? "PATCH" : "POST", body: f }); },
    adminDeleteMethod(id) { return call("/admin/methods/" + id, { method: "DELETE" }); },
    adminModerate(id, status, adminNote) { return call("/admin/comments/" + id, { method: "PATCH", body: { status, adminNote } }); },
    adminUser(id, patch) { return call("/admin/users/" + id, { method: "PATCH", body: patch }); }
  };
  window.API = API;
})();
