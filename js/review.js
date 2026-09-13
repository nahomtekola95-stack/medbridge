/* ============================================================
   MedBridge clinical sign-off and stock-out reports.
   - Verified reviewers (role "reviewer") and administrators sign off each
     drug entry against a checklist. A sign-off is tied to a fingerprint of
     the entry's content, so any later edit shows "changed since sign-off".
   - Signed-in members report a drug out of stock, low or back in stock at
     their facility; colleagues see the latest report per facility.
   Registered by app.js as RV.
   ============================================================ */
window.Review = function (ctx) {
  const { $, esc, ic, toast, render } = ctx;
  const drugById = (id) => DRUG_DB.find(d => d.id === id);
  const fmtDate = (s) => { const d = new Date(s); if (isNaN(d)) return ""; const g = d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }); return window.EthCal && EthCal.enabled() ? `${EthCal.format(d, window.I18N?.lang)} (${g})` : g; };
  const L = (s) => window.I18N ? I18N.t(s) : s;

  /* ---------- content fingerprint ---------- */
  const stable = (v) => Array.isArray(v) ? `[${v.map(stable).join(",")}]`
    : v && typeof v === "object" ? `{${Object.keys(v).sort().map(k => JSON.stringify(k) + ":" + stable(v[k])).join(",")}}` : JSON.stringify(v ?? null);
  const fnv = (str, seed) => { let h = seed >>> 0; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h.toString(16).padStart(8, "0"); };
  function contentHash(d) {
    const { review, ...rest } = d;
    const s = stable({ drug: rest, safety: (window.SAFETY || {})[d.id] || null, neonatal: (window.NEONATAL || {})[d.id] || null });
    return fnv(s, 2166136261) + fnv(s, 3735928559);
  }

  /* ---------- status ---------- */
  let reviews = API.cachedReviews();
  const latest = (id) => reviews.find(r => r.drug === id) || null;
  function statusFor(d) {
    const r = latest(d.id);
    if (!r) return { state: d.review?.status === "reviewed" ? "legacy" : "none", review: null };
    if (r.decision === "changes") return { state: "changes", review: r };
    return { state: r.hash === contentHash(d) ? "approved" : "stale", review: r };
  }
  function statusChip(d) {
    const st = statusFor(d), r = st.review;
    if (st.state === "approved") return `<span class="chip ok" title="${esc(r.reviewer.profession)}, ${esc(r.reviewer.facility)}">${ic("check")}Signed off by ${esc(r.reviewer.name)} · ${fmtDate(r.createdAt)}</span>`;
    if (st.state === "stale") return `<span class="chip warn">${ic("alert")}Changed since sign-off on ${fmtDate(r.createdAt)}</span>`;
    if (st.state === "changes") return `<span class="chip bad">${ic("flag")}Reviewer asked for changes</span>`;
    if (st.state === "legacy") return `<span class="chip ok">${ic("check")}Reviewed ${esc(d.review.date || "")}</span>`;
    return `<span class="chip warn">${ic("alert")}Draft — not clinically verified</span>`;
  }
  async function load() {
    const before = JSON.stringify(reviews);
    reviews = await API.reviews();
    if (JSON.stringify(reviews) !== before) {
      const v = (location.hash.match(/^#\/(\w+)/) || [])[1];
      if (v === "drug" || v === "review") render();
    }
  }

  const CHECKS = [
    ["doses", "Doses, units and maximums match the cited sources"],
    ["methods", "No-pump methods are safe and workable as written"],
    ["paediatric", "Paediatric and newborn doses checked"],
    ["safety", "Cautions, pregnancy, kidney and liver advice, interactions and antidote checked"],
    ["national", "Consistent with Ethiopian national guidelines and the EFDA formulary"]
  ];
  const canSign = () => API.user && ["admin", "reviewer"].includes(API.user.role) && API.user.verified;

  function historyRows(list) {
    return list.length ? `<ul class="rv-hist">${list.map(r => `<li><span class="chip ${r.decision === "approved" ? "ok" : "bad"}">${r.decision === "approved" ? "Signed off" : "Changes requested"}</span>
      <b>${esc(r.reviewer.name)}</b> <span class="small muted">${esc(r.reviewer.profession)}${r.reviewer.facility ? " · " + esc(r.reviewer.facility) : ""} · ${fmtDate(r.createdAt)} · version ${esc(r.hash.slice(0, 8))}</span>
      ${r.note ? `<div class="small note-body">${esc(r.note)}</div>` : ""}</li>`).join("")}</ul>` : `<p class="small muted">No sign-off recorded yet.</p>`;
  }
  async function historyInto(host, d) {
    if (API.state.serverless) { host.innerHTML = ""; return; }
    host.innerHTML = `<p class="small muted">Loading sign-off history…</p>`;
    try { host.innerHTML = `<h4>Sign-off history</h4>${historyRows(await API.reviewHistory(d.id))}<p class="small"><a href="#/review?drug=${d.id}">Open in clinical sign-off</a></p>`; }
    catch { host.innerHTML = `<p class="small muted">Sign-off history needs a connection.</p>`; }
  }

  function viewReview(main, route) {
    const filter = route.q.f || "all";
    const q = (route.q.q || "").toLowerCase();
    const rows = [...DRUG_DB].sort((a, b) => a.name.localeCompare(b.name)).map(d => ({ d, st: statusFor(d) }));
    const count = (s) => rows.filter(x => x.st.state === s).length;
    const shown = rows.filter(x => (filter === "all" || x.st.state === filter || (filter === "none" && x.st.state === "legacy")) && (!q || x.d.name.toLowerCase().includes(q)));
    const sel = route.q.drug ? drugById(route.q.drug) : null;
    main.innerHTML = `
      <h1>${ic("check")} Clinical sign-off</h1>
      <p class="text-2" style="max-width:66ch">Every entry stays a draft until a verified pharmacist or physician checks it and signs it off here. A sign-off is tied to the exact content: if the entry changes later, it shows as changed and needs checking again.</p>
      ${API.state.serverless ? `<div class="callout info">${ic("info")}<div>Sign-off needs the full MedBridge app with accounts. This copy shows the content only.</div></div>`
        : !API.user ? `<div class="callout info">${ic("user")}<div><a href="#/account">Sign in</a> with a reviewer account to sign off entries. Anyone can see the status below.</div></div>`
        : !canSign() ? `<div class="callout warn">${ic("shield")}<div>Your account can view sign-off status but cannot sign off. An administrator can make a verified pharmacist or physician a reviewer.</div></div>` : ""}
      <div class="stat-row rv-stats">
        <a class="card stat" href="#/review?f=approved"><b>${count("approved")}</b><span>signed off</span></a>
        <a class="card stat" href="#/review?f=stale"><b>${count("stale")}</b><span>changed since sign-off</span></a>
        <a class="card stat" href="#/review?f=changes"><b>${count("changes")}</b><span>changes requested</span></a>
        <a class="card stat" href="#/review?f=none"><b>${count("none") + count("legacy")}</b><span>not yet reviewed</span></a>
      </div>
      <div class="detail rv-detail">
        <aside class="card rv-list">
          <input id="rv-q" type="search" placeholder="Filter…" aria-label="Filter drugs" value="${esc(route.q.q || "")}">
          <div class="seg rv-f" role="group" aria-label="Status filter">${[["all", "All"], ["none", "Not reviewed"], ["stale", "Changed"], ["changes", "Changes"], ["approved", "Signed off"]].map(([k, v]) => `<a href="#/review?f=${k}" class="${k === filter ? "active" : ""}">${v}</a>`).join("")}</div>
          <ul>${shown.map(({ d, st }) => `<li><a href="#/review?f=${filter}&drug=${d.id}" class="${sel?.id === d.id ? "active" : ""}"><span>${esc(d.name)}</span><i class="dot ${st.state}"></i></a></li>`).join("") || `<li class="small muted">Nothing here.</li>`}</ul>
        </aside>
        <div id="rv-pane">${sel ? "" : `<p class="empty">Choose a drug to review.</p>`}</div>
      </div>`;
    $("#rv-q").addEventListener("change", e => { location.hash = `#/review?f=${filter}&q=${encodeURIComponent(e.target.value)}`; });
    if (!sel) return;
    const st = statusFor(sel), hash = contentHash(sel);
    const pane = $("#rv-pane");
    pane.innerHTML = `<div class="card">
      <div class="row" style="justify-content:space-between"><h2 style="margin:0">${esc(sel.name)}</h2>${statusChip(sel)}</div>
      <p class="small muted" style="margin:.3rem 0 .8rem">Content version ${hash.slice(0, 8)} · ${sel.improvised.length} no-pump methods · ${(sel.textbook || []).length} textbook references · <a href="#/drug/${sel.id}" target="_blank" rel="noopener">Open the full entry</a></p>
      ${canSign() ? `
        <h4>Checklist</h4>
        <div class="checks rv-checks">${CHECKS.map(([k, t]) => `<label><input type="checkbox" data-ck="${k}"> ${esc(t)}</label>`).join("")}</div>
        <div class="field"><label for="rv-note">Note for the record (required when asking for changes)</label><textarea id="rv-note" rows="3" maxlength="4000" placeholder="What you checked, what needs correcting, which source you used"></textarea></div>
        <div class="row"><button type="button" class="btn" id="rv-ok">${ic("check")}Sign off this version</button><button type="button" class="btn ghost" id="rv-ch">${ic("flag")}Request changes</button></div>
        <p class="small muted" style="margin:.5rem 0 0">Signed as ${esc(API.user.name)}, ${esc(API.user.profession)}, ${esc(API.user.facility)}. Your name is shown on the drug page.</p>` : ""}
      <div id="rv-hist" style="margin-top:1rem"></div></div>`;
    historyInto($("#rv-hist"), sel);
    const submit = async (decision) => {
      const checklist = [...pane.querySelectorAll("[data-ck]:checked")].map(x => x.dataset.ck);
      const note = $("#rv-note").value.trim();
      if (decision === "approved" && checklist.length < CHECKS.length) return toast("Tick every checklist item before signing off.", true);
      if (decision === "changes" && note.length < 10) return toast("Describe the changes needed.", true);
      try { await API.signOff({ drug: sel.id, hash, decision, checklist, note }); toast(decision === "approved" ? "Signed off." : "Change request recorded."); await load(); render(); }
      catch (e) { toast(e.message, true); }
    };
    const ok = $("#rv-ok"), ch = $("#rv-ch");
    if (ok) ok.addEventListener("click", () => submit("approved"));
    if (ch) ch.addEventListener("click", () => submit("changes"));
  }

  /* ---------- stock reports ---------- */
  const STOCK = { out: { cls: "bad", label: "Out of stock" }, low: { cls: "warn", label: "Running low" }, available: { cls: "ok", label: "In stock" } };
  async function stockSection(host, d) {
    if (!host || API.state.serverless) return;
    host.innerHTML = `<div class="card"><p class="small muted">Loading stock reports…</p></div>`;
    const data = await API.stock(d.id);
    const me = API.user, reports = data.reports || [];
    const outs = reports.filter(r => r.status !== "available");
    host.innerHTML = `<div class="card stock">
      <div class="row" style="justify-content:space-between"><h3 style="margin:0">${ic("box")} Stock across Ethiopia</h3><span class="small muted">last ${data.days || 30} days</span></div>
      ${data.offline ? `<p class="small muted">${ic("info")} Offline. Stock reports appear when you reconnect.</p>` : ""}
      ${data.cached ? `<p class="small muted">${ic("info")} Offline. Showing reports saved on this device.</p>` : ""}
      ${reports.length ? `<ul class="stock-list">${reports.map(r => `<li><span class="chip ${STOCK[r.status].cls}">${STOCK[r.status].label}</span>
          <b>${esc(r.facility)}</b>, ${esc(r.city)} <span class="small muted">· ${fmtDate(r.createdAt)} · ${esc(r.author.name)}</span>
          ${r.note ? `<div class="small note-body">${esc(r.note)}</div>` : ""}
          ${r.own || API.isAdmin ? `<button type="button" class="linkbtn danger" data-stock-rm="${r.id}">${ic("trash")}Remove</button>` : ""}</li>`).join("")}</ul>`
        : !data.offline ? `<p class="small muted">No stock problems reported for this drug.</p>` : ""}
      ${outs.length && window.SUBSTITUTES?.[d.id] ? `<p class="small">${ic("swap")} Short where you are? See "Out of stock? What to use instead" above.</p>` : ""}
      ${data.offline ? "" : me ? `<div class="stock-form">
          <div class="field"><label for="st-note">Report for ${esc(me.facility)}, ${esc(me.city)} (optional note)</label><input id="st-note" maxlength="120" placeholder="e.g. only 5 ampoules left, expected next week"></div>
          <div class="row"><button type="button" class="btn ghost sm" data-stock="out">${ic("x")}Out of stock here</button><button type="button" class="btn ghost sm" data-stock="low">${ic("alert")}Running low</button><button type="button" class="btn ghost sm" data-stock="available">${ic("check")}Back in stock</button></div></div>`
        : `<p class="small"><a href="#/account">Sign in</a> to report stock at your facility.</p>`}
    </div>`;
    host.onclick = async (e) => {
      const b = e.target.closest("[data-stock]"), rm = e.target.closest("[data-stock-rm]");
      try {
        if (b) { await API.reportStock(d.id, b.dataset.stock, $("#st-note", host)?.value || ""); toast("Stock report saved."); stockSection(host, d); }
        if (rm) { await API.removeStock(rm.dataset.stockRm); toast("Removed."); stockSection(host, d); }
      } catch (err) { toast(err.message, true); }
    };
  }
  async function stockPanel(host) {
    if (!host) return;
    const data = await API.stock();
    const outs = (data.reports || []).filter(r => r.status !== "available");
    const byDrug = {};
    outs.forEach(r => (byDrug[r.drug] ||= []).push(r));
    const list = Object.entries(byDrug).sort((a, b) => b[1].length - a[1].length);
    host.innerHTML = `<h2 style="margin-top:1.2rem">${ic("box")} Stock-outs reported</h2>
      <p class="small muted" style="margin-top:-.3rem">Latest report per facility, last ${data.days || 30} days. Report from any drug page.</p>
      ${list.length ? `<div class="card"><ul class="stock-list">${list.map(([id, rs]) => `<li><a href="#/drug/${esc(id)}"><b>${esc(drugById(id)?.name || id)}</b></a>
        <div class="small">${rs.map(r => `<span class="chip ${STOCK[r.status].cls}">${STOCK[r.status].label}</span> ${esc(r.facility)}, ${esc(r.city)} <span class="muted">${fmtDate(r.createdAt)}</span>`).join("<br>")}</div></li>`).join("")}</ul></div>`
        : `<p class="small muted">${data.offline ? "Offline." : "No stock-outs reported in the last 30 days."}</p>`}`;
  }

  return { contentHash, statusFor, statusChip, load, historyInto, stockSection, stockPanel, views: { review: viewReview }, CHECKS };
};
