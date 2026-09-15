/* MedBridge — app shell: hash router, views, equipment-aware rendering. */
(function () {
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ic = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const fmt = (n, d = 1) => (n == null || !isFinite(n)) ? "—" : Calc.round(n, d).toLocaleString();
  const DROP_FACTORS = [10, 15, 20, 60];
  let toastTimer;
  function toast(msg, isError) {
    const t = $("#toast"); if (!t) return;
    t.textContent = msg; t.className = "toast" + (isError ? " error" : ""); t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 3600);
  }
  const catStyle = (cat) => `style="--cat: var(--c-${cat})"`;
  const QUICK = [["Anaphylaxis", "anaphylaxis"], ["Cardiac arrest", "cardiac arrest"], ["Shock", "shock"], ["Status epilepticus", "status epilepticus"], ["Eclampsia", "eclampsia"], ["PPH", "PPH"], ["DKA", "DKA"], ["Hypoglycaemia", "hypoglycaemia"], ["Severe malaria", "severe malaria"], ["Dehydration", "dehydration"], ["Hyperkalaemia", "hyperkalaemia"], ["Asthma", "asthma"], ["Preterm labour", "preterm labour"], ["Tetanus", "tetanus"], ["Poisoning", "poisoning"], ["Meningitis", "meningitis"], ["Transfusion", "transfusion"], ["Local anaesthesia", "local anaesthesia"], ["Agitation", "agitation"], ["Alcohol withdrawal", "alcohol withdrawal"], ["Suicide risk", "suicide"], ["Psychosis", "psychosis"]];

  /* ---------- persistent settings ---------- */
  const store = {
    get(k, def) { try { const v = localStorage.getItem("mb:" + k); return v == null ? def : JSON.parse(v); } catch { return def; } },
    set(k, v) { try { localStorage.setItem("mb:" + k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem("mb:" + k); } catch {} }
  };
  const settings = {
    get equipment() { return store.get("equipment", null); },
    set equipment(v) { store.set("equipment", v); },
    get dropFactor() { return store.get("dropFactor", 20); },
    set dropFactor(v) { store.set("dropFactor", v); },
    get weight() { return store.get("weight", ""); },
    set weight(v) { store.set("weight", v); },
    get profile() { return store.get("profile", "generic"); },
    set profile(v) { store.set("profile", v); },
    get tier() { return store.get("tier", null); },
    set tier(v) { store.set("tier", v); },
    get custom() { return store.get("custom", { name: "", drugNotes: {}, procedures: [] }); },
    set custom(v) { store.set("custom", v); },
    get ward() { return store.get("ward", ""); },
    set ward(v) { v ? store.set("ward", v) : store.del("ward"); },
    get filterMode() { return store.get("filterMode", "ward"); },
    set filterMode(v) { store.set("filterMode", v); }
  };
  /* ---------- setting profile (country / facility) ---------- */
  const prof = () => PROFILES.find(p => p.id === settings.profile) || PROFILES[0];
  const profTier = () => prof().tiers.find(t => t.id === settings.tier) || null;
  const profCalc = () => { const c = settings.custom; return { ...prof().calc, ...(c.dropFactor ? { dropFactor: +c.dropFactor } : {}), ...(c.glucoseUnit ? { glucoseUnit: c.glucoseUnit } : {}), ...(c.weightFormula ? { weightFormula: c.weightFormula } : {}) }; };
  const profLabel = () => (settings.custom.name ? settings.custom.name + " · " : "") + prof().name + (profTier() ? " · " + profTier().name : "");
  const profNotes = (id) => { const base = prof().drugNotes[id] || null; const custom = settings.custom.drugNotes?.[id] || ""; return (base || custom) ? { ...(base || { stock: [], protocol: [], technique: [] }), custom } : null; };
  const profProcedures = () => [...prof().procedures, ...(settings.custom.procedures || []).map(x => ({ ...x, custom: true }))];
  function applyTier(tierId) {
    settings.tier = tierId || null;
    const t = profTier();
    if (t) settings.equipment = Object.fromEntries(Object.keys(EQUIPMENT).map(k => [k, !!t.equipment[k]]));
  }
  function applyProfile(id) { settings.profile = id; settings.tier = null; settings.dropFactor = prof().calc.dropFactor; }
  const have = (eq) => { const e = settings.equipment; return e == null ? true : !!e[eq]; };
  const configured = () => settings.equipment != null;

  /* ---------- router ---------- */
  function parseHash() {
    const h = location.hash.replace(/^#\/?/, "");
    const [path, qs] = h.split("?");
    const parts = path.split("/").filter(Boolean);
    return { view: parts[0] || "drugs", id: parts[1], q: Object.fromEntries(new URLSearchParams(qs || "")) };
  }
  let CV = null, FX = null, EX = null, RV = null;
  const routes = { drugs: viewDrugs, drug: viewDrug, calc: viewCalc, techniques: viewTechniques, local: viewLocal, setup: viewSetup, about: viewAbout,
    case: viewCase, account: (m, r) => CV.account(m, r), community: (m, r) => CV.community(m, r), admin: (m, r) => CV.admin(m, r),
    resus: (m, r) => FX.views.resus(m, r), drip: (m, r) => FX.views.drip(m, r), schedules: (m, r) => FX.views.schedules(m, r),
    compat: (m, r) => FX.views.compat(m, r), tools: (m, r) => FX.views.tools(m, r),
    newborn: (m, r) => EX.views.newborn(m, r), interactions: (m, r) => EX.views.interactions(m, r), charts: (m, r) => EX.views.charts(m, r),
    quiz: (m, r) => EX.views.quiz(m, r), review: (m, r) => RV.views.review(m, r) };
  const NAV_OF = { drug: "drugs", case: "drugs", calc: "tools", techniques: "tools", drip: "tools", schedules: "tools", compat: "tools", newborn: "tools", interactions: "tools", charts: "tools", quiz: "tools", review: "tools" };
  function render() {
    const r = parseHash();
    const main = $("#app");
    main.innerHTML = "";
    (routes[r.view] || viewDrugs)(main, r);
    window.I18N?.afterRender(r.view);
    document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav === (NAV_OF[r.view] || r.view)));
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", render);
  document.addEventListener("click", e => { const b = e.target.closest(".lang-seg [data-lang]"); if (b && window.I18N && b.dataset.lang !== I18N.lang) I18N.setLang(b.dataset.lang); });

  /* ---------- shared pieces ---------- */
  const reviewChip = (d) => d.review.status === "reviewed"
    ? `<span class="chip ok">${ic("check")}Reviewed ${esc(d.review.date || "")}</span>`
    : `<span class="chip warn">${ic("alert")}Draft — not clinically verified</span>`;
  const eqChips = (list) => (!list || !list.length)
    ? `<span class="chip ok">${ic("check")}No special equipment</span>`
    : list.map(k => have(k) ? `<span class="chip">${ic("check")}${esc(EQUIPMENT[k]?.label || k)}</span>` : `<span class="chip bad">${ic("x")}${esc(EQUIPMENT[k]?.label || k)}</span>`).join("");
  const listHtml = (arr, tag = "ul") => arr && arr.length ? `<${tag}>${arr.map(s => `<li>${esc(s)}</li>`).join("")}</${tag}>` : "";
  const searchText = (d) => [d.name, ...(d.aka || []), ...(d.tags || []), d.cls, CATEGORIES[d.cat], ...(d.indications || [])].join(" ").toLowerCase();
  const sortedDrugs = () => [...DRUG_DB].sort((a, b) => a.name.localeCompare(b.name));

  /* ---------- textbook references (drugs and cases) ---------- */
  function textbookHtml(refs, kind) {
    if (!refs || !refs.length) return `<div class="card"><p class="muted" style="margin:0">No textbook references recorded for this ${kind} yet.</p></div>`;
    const order = Object.keys(BOOKS);
    const groups = order.map(k => [k, refs.filter(r => (r.book || "note") === k)]).filter(([, a]) => a.length);
    return `<div class="callout info">${ic("book")}<div><strong>What the textbooks say.</strong> Doses and statements are paraphrased with chapter and page. The no-pump methods come from WHO and MSF field guidance; where a textbook is silent on low-resource practice, or differs from it, an editorial note says so.</div></div>` +
      groups.map(([k, arr]) => {
        const b = BOOKS[k];
        return `<div class="card book-refs"><h4 style="margin-top:0">${ic("book")} ${esc(b.title)}${b.edition ? ` <span class="muted">· ${esc(b.edition)}${b.year ? " " + b.year : ""}</span>` : ""}</h4>
          <ul>${arr.map(t => `<li>${esc(t.text)}${t.ref && k !== "note" ? ` <span class="muted small">— ${esc(t.ref)}</span>` : ""}</li>`).join("")}</ul></div>`;
      }).join("");
  }

  /* ---------- Drugs list ---------- */
  let listState = null;
  const initListState = () => (listState ||= { q: "", cat: "", ward: settings.ward, group: "", mode: settings.filterMode });
  function viewDrugs(main) {
    initListState();
    main.innerHTML = `
      <section class="hero">
        <h1>Give it safely, with what you have.</h1>
        <p>Hospital medicines with no-pump alternatives, doses by weight and drip-rate maths — offline.</p>
        <div class="searchbar">${ic("search")}<input id="q" type="search" placeholder="Search a drug, a brand or a case…" value="${esc(listState.q)}" autocomplete="off" aria-label="Search drugs"><kbd>/</kbd></div>
        <div class="hero-chips"><a class="setting-chip" href="#/local">${ic("globe")}<span>Setting: ${esc(profLabel())}</span>${ic("right")}</a><div class="seg lang-seg hero-lang" id="hero-lang" role="group" aria-label="Language" data-no-i18n><button type="button" data-lang="en" class="${window.I18N?.lang === "am" ? "" : "active"}" lang="en">English</button><button type="button" data-lang="am" class="${window.I18N?.lang === "am" ? "active" : ""}" lang="am">አማርኛ</button></div></div>
        <div class="quick-label">Emergencies</div>
        <div class="quick" id="quick">${QUICK.map(([l, q]) => `<button type="button" data-q="${esc(q)}">${ic("zap")}${esc(l)}</button>`).join("")}</div>
      </section>
      ${FX.shortcutsHtml()}
      <div class="filterbar">
        <div class="seg" id="mode" role="group" aria-label="Group drugs by">
          <button type="button" data-mode="ward" class="${listState.mode === "ward" ? "active" : ""}">${ic("ward")}By ward</button>
          <button type="button" data-mode="case" class="${listState.mode === "case" ? "active" : ""}">${ic("clipboard")}By case</button>
          <button type="button" data-mode="cat" class="${listState.mode === "cat" ? "active" : ""}">${ic("pill")}By drug class</button>
        </div>
      </div>
      <div class="cats" id="cats"></div>
      <div class="section-label"><span id="count"></span><span id="wardnote" class="note"></span></div>
      <div id="also-cases"></div>
      <ul class="drug-list" id="list"></ul>`;
    const list = $("#list"), q = $("#q");
    const drawChips = () => {
      const m = listState.mode;
      const sel = m === "ward" ? listState.ward : m === "case" ? listState.group : listState.cat;
      const entries = m === "ward"
        ? Object.entries(WARDS).map(([k, v]) => [k, v.label, DRUG_DB.filter(d => d.wards.includes(k)).length])
        : m === "case"
        ? Object.entries(CASE_GROUPS).map(([k, v]) => [k, v, CONDITIONS.filter(c => c.group === k).length])
        : Object.entries(CATEGORIES).map(([k, v]) => [k, v, DRUG_DB.filter(d => d.cat === k).length]);
      $("#cats").innerHTML = `<button type="button" class="${sel === "" ? "active" : ""}" data-key="">${m === "case" ? "All cases" : "All drugs"}</button>` +
        entries.map(([k, label, n]) => `<button type="button" class="${sel === k ? "active" : ""}" data-key="${k}" ${m === "cat" ? catStyle(k) : ""}>${m === "cat" ? `<span class="dot"></span>` : ""}${esc(label)} <b>${n}</b></button>`).join("");
    };
    const draw = () => {
      const needle = listState.q.trim().toLowerCase();
      if (listState.mode === "case") return drawCases(needle);
      const byWard = listState.mode === "ward";
      const items = sortedDrugs().filter(d =>
        (byWard ? (!listState.ward || d.wards.includes(listState.ward)) : (!listState.cat || d.cat === listState.cat)) &&
        (!needle || FX.fuzzyMatch(searchText(d), needle)));
      const sel = byWard ? listState.ward : listState.cat;
      const selLabel = sel ? (byWard ? WARDS[sel].label : CATEGORIES[sel]) : "";
      $("#count").textContent = sel ? `${selLabel} · ${items.length} drug${items.length === 1 ? "" : "s"}` : `${items.length} of ${DRUG_DB.length} drugs`;
      $("#wardnote").textContent = byWard && sel ? WARDS[sel].note : "";
      list.innerHTML = items.length ? items.map(d => `
        <li><a class="drug-item" href="#/drug/${d.id}" ${catStyle(d.cat)}>
          <div class="top"><span class="name">${esc(d.name)}</span>${ic("right")}</div>
          <div class="meta"><span>${esc(d.cls)}</span><span class="count">${d.improvised.length} no-pump method${d.improvised.length === 1 ? "" : "s"}</span></div>
        </a></li>`).join("") : `<li class="empty">No match. Try a condition (e.g. “seizure”) or a brand name.</li>`;
      const cs = needle ? CONDITIONS.filter(c => FX.fuzzyMatch(c.name + " " + (c.aka || []).join(" "), needle)).slice(0, 6) : [];
      $("#also-cases").innerHTML = cs.length ? `<div class="also"><span class="small muted">${ic("clipboard")} Matching cases</span>${cs.map(c => `<a class="sc-chip" href="#/case/${c.id}">${esc(c.name)}</a>`).join("")}</div>` : "";
    };
    q.addEventListener("input", () => { listState.q = q.value; draw(); });
    const drawCases = (needle) => {
      const items = CONDITIONS
        .filter(c => (!listState.group || c.group === listState.group) &&
          (!needle || FX.fuzzyMatch(FX.caseText(c), needle)))
        .sort((a, b) => a.name.localeCompare(b.name));
      $("#count").textContent = listState.group ? `${CASE_GROUPS[listState.group]} · ${items.length} case${items.length === 1 ? "" : "s"}` : `${items.length} of ${CONDITIONS.length} clinical cases`;
      $("#wardnote").textContent = "Each case lists the drugs actually reached for, and what each one is for.";
      $("#also-cases").innerHTML = "";
      list.innerHTML = items.length ? items.map(c => {
        const first = c.drugs.filter(d => d.role === "first").slice(0, 4);
        return `<li><a class="drug-item case-item" href="#/case/${c.id}">
          <div class="top"><span class="name">${esc(c.name)}</span>${ic("right")}</div>
          <div class="case-sum">${esc(c.summary.split(". ")[0])}.</div>
          <div class="meta">${first.map(d => `<span class="chip">${esc(DRUG_DB.find(x => x.id === d.id)?.name.split(" (")[0] || d.id)}</span>`).join("")}${c.drugs.length > first.length ? `<span class="count">+${c.drugs.length - first.length} more</span>` : ""}</div>
        </a></li>`;
      }).join("") : `<li class="empty">No case matches. Try a drug name, or a symptom such as “bleeding”.</li>`;
    };
    $("#quick").addEventListener("click", e => { const b = e.target.closest("[data-q]"); if (!b) return; listState.q = b.dataset.q; listState.cat = ""; listState.ward = ""; listState.group = ""; q.value = b.dataset.q; drawChips(); draw(); });
    $("#cats").addEventListener("click", e => {
      const b = e.target.closest("[data-key]"); if (!b) return;
      const k = b.dataset.key;
      if (listState.mode === "ward") { listState.ward = k; settings.ward = k; }
      else if (listState.mode === "case") listState.group = k;
      else listState.cat = k;
      document.querySelectorAll("#cats button").forEach(c => c.classList.toggle("active", c === b));
      draw();
    });
    $("#mode").addEventListener("click", e => {
      const b = e.target.closest("[data-mode]"); if (!b) return;
      listState.mode = b.dataset.mode; settings.filterMode = listState.mode;
      $("#wardnote").textContent = "";
      document.querySelectorAll("#mode button").forEach(x => x.classList.toggle("active", x === b));
      drawChips(); draw();
    });
    drawChips(); draw();
  }

  /* ---------- Drug detail ---------- */
  function viewDrug(main, r) {
    const d = DRUG_DB.find(x => x.id === r.id);
    if (!d) { main.innerHTML = `<p class="empty">Drug not found.</p>`; return; }
    const tabs = [["improvised", "No pump / improvised"], ["standard", "Standard"], ["safety", "Safety & paediatrics"], ["textbook", "Textbooks"], ["sources", "Sources"]];
    const active = r.q.tab || "improvised";
    const glanceDoses = d.standard.items.slice(0, 3);
    FX.recent.push("drug:" + d.id);
    const regs = FX.regimensForDrug(d.id);
    main.innerHTML = `
      <div class="detail">
        <aside class="index" aria-label="Drug index">
          <h4>All drugs</h4>
          <input id="idx-q" type="search" placeholder="Filter…" aria-label="Filter drug index">
          <div id="idx-list">${sortedDrugs().map(x => `<a href="#/drug/${x.id}" class="${x.id === d.id ? "active" : ""}">${esc(x.name)}</a>`).join("")}</div>
        </aside>
        <div>
          <a class="back" href="#/drugs">${ic("left")}All drugs</a>
          <div class="head">
            <h1>${esc(d.name)}</h1>
            <div class="cls">${esc(d.cls)}${d.aka?.length ? " · " + esc(d.aka.join(", ")) : ""}</div>
            <div class="row tags">${RV.statusChip(d)}${EX.safetyChips(d)}<span class="chip cat" ${catStyle(d.cat)}>${esc(CATEGORIES[d.cat])}</span>${(d.wards || []).map(w => `<a class="chip ward" href="#/drugs" data-goward="${w}">${ic("ward")}${esc(WARDS[w].label)}</a>`).join("")}<span style="margin-left:auto" class="row">${FX.starButton("drug:" + d.id)}<button type="button" class="btn ghost sm" id="print">${ic("print")}Print</button></span></div>
          </div>
          ${EX.neonatalCard(d)}
          ${FX.patientDoseCard(d)}
          ${EX.doseActions(d)}
          ${regs.length ? `<div class="row sched-links">${regs.map(g => `<a class="btn ghost sm" href="#/schedules?regimen=${g.id}">${ic("clock")}Start schedule: ${esc(g.name.split(" — ")[0])}</a>`).join("")}</div>` : ""}
          <div class="glance">
            <div class="card"><h4>Key doses</h4><ul>${glanceDoses.map(i => `<li><strong>${esc(i.label)}:</strong> ${esc(i.text)}</li>`).join("")}</ul></div>
            ${d.antidote ? `<div class="card antidote"><h4>${ic("shield")} Antidote / reversal</h4><p style="margin:0">${esc(d.antidote)}</p></div>` : `<div class="card"><h4>Presentation</h4><ul>${d.presentation.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div>`}
          </div>
          <div class="tabs" role="tablist">${tabs.map(([k, v]) => `<button type="button" role="tab" class="tab ${k === active ? "active" : ""}" data-tab="${k}">${v}</button>`).join("")}</div>
          <div id="tabpane"></div>
        </div>
      </div>`;
    const pane = $("#tabpane");
    const draw = (tab) => {
      if (tab === "improvised") {
        const sorted = d.improvised.map((m, i) => ({ m, i, ok: (m.requires || []).every(have) })).sort((a, b) => (b.ok - a.ok) || (a.i - b.i));
        const ln = profNotes(d.id);
        pane.innerHTML = `
          ${ln ? `<div class="card local"><h4 style="margin-top:0">${ic("globe")} Local practice — ${esc(prof().name)}</h4>
            ${ln.stock?.length ? `<h4>Stocked as</h4>${listHtml(ln.stock)}` : ""}
            ${ln.protocol?.length ? `<h4>National protocol</h4>${listHtml(ln.protocol)}` : ""}
            ${ln.technique?.length ? `<h4>Local technique</h4>${listHtml(ln.technique)}` : ""}
            ${ln.custom ? `<h4>My facility</h4><p style="white-space:pre-wrap;margin:0">${esc(ln.custom)}</p>` : ""}
            <p class="small muted" style="margin:.6rem 0 0">Draft — verify against the national STG. <a href="#/local">Edit local notes</a></p></div>` : ""}
          <p class="small muted">${configured() ? `Methods needing equipment you have not marked available are dimmed and shown last. <a href="#/setup">Change setup</a>` : `<a href="#/setup">Tell the app what equipment you have</a> and it will order these methods for your setting.`}</p>
          ${sorted.map(({ m, i, ok }) => `
          <div class="card method ${ok ? "" : "unavailable"}">
            <div class="mtitle"><span class="num">${i + 1}</span><div><h3 style="margin:0">${esc(m.title)}</h3><div class="best">${esc(m.best_for || "")}</div></div></div>
            <div class="row needs">${eqChips(m.requires)}</div>
            <h4>Steps</h4>${listHtml(m.steps, "ol")}
            ${m.monitor?.length ? `<h4>Monitor</h4>${listHtml(m.monitor)}` : ""}
            ${m.cautions?.length ? `<h4>Cautions</h4>${listHtml(m.cautions)}` : ""}
          </div>`).join("")}
          ${(() => { const cs = CONDITIONS.filter(c => c.drugs.some(x => x.id === d.id)); return cs.length ? `<div class="card"><h4 style="margin-top:0">${ic("clipboard")} Used in these cases</h4><div class="row">${cs.map(c => { const role = c.drugs.find(x => x.id === d.id).role; return `<a class="chip case ${ROLES[role].cls}" href="#/case/${c.id}">${esc(c.name)} <b>${esc(ROLES[role].label)}</b></a>`; }).join("")}</div></div>` : ""; })()}
          ${FX.alternativesHtml(d)}
          <div id="stock-host"></div>
          ${d.calc ? `<a class="btn" href="#/calc?drug=${d.id}">${ic("calc")}Open calculator for ${esc(d.name)}</a>` : ""}
          <div id="community-host" style="margin-top:1.25rem"></div>`;
        CV.drugSection($("#community-host"), d);
        RV.stockSection($("#stock-host"), d);
      } else if (tab === "standard") {
        pane.innerHTML = `<div class="card"><p class="text-2">${esc(d.standard.summary)}</p><dl class="kv">${d.standard.items.map(i => `<dt>${esc(i.label)}</dt><dd>${esc(i.text)}</dd>`).join("")}</dl></div>
          <div class="card"><h3>Presentation</h3>${listHtml(d.presentation)}<h3 style="margin-top:.8rem">Indications</h3>${listHtml(d.indications)}</div>`;
      } else if (tab === "safety") {
        pane.innerHTML = `
          ${d.antidote ? `<div class="callout danger">${ic("shield")}<div><strong>Antidote / reversal.</strong> ${esc(d.antidote)}</div></div>` : ""}
          <div class="card"><h3>Cautions</h3>${listHtml(d.cautions) || "<p class='muted'>—</p>"}</div>
          ${d.paediatric?.length ? `<div class="card"><h3>${ic("baby")} Paediatric notes</h3>${listHtml(d.paediatric)}</div>` : ""}
          ${EX.safetyCards(d)}
          ${EX.interactionsHtml(d)}`;
      } else if (tab === "textbook") {
        pane.innerHTML = textbookHtml(d.textbook, "drug");
      } else {
        pane.innerHTML = `<div class="card"><h3>Sources</h3><ul>${d.sources.map(s => `<li>${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>` : esc(s.name)}</li>`).join("")}</ul>
          <h3 style="margin-top:.8rem">Review status</h3><p>${RV.statusChip(d)}</p>
          <p class="small muted">Each entry must be checked by a pharmacist or physician against these sources and the national formulary before clinical use.</p>
          <div id="rv-history"></div></div>`;
        RV.historyInto($("#rv-history"), d);
      }
      document.querySelectorAll(".tab").forEach(t => { const on = t.dataset.tab === tab; t.classList.toggle("active", on); t.setAttribute("aria-selected", on); });
    };
    main.querySelector(".tabs").addEventListener("click", e => { const t = e.target.closest("[data-tab]"); if (t) draw(t.dataset.tab); });
    $("#print").addEventListener("click", () => window.print());
    FX.bindStars(main);
    main.addEventListener("click", e => { const w = e.target.closest("[data-goward]"); if (!w) return; initListState(); listState.mode = "ward"; listState.ward = w.dataset.goward; listState.q = ""; settings.ward = w.dataset.goward; settings.filterMode = "ward"; });
    $("#idx-q").addEventListener("input", e => { const n = e.target.value.toLowerCase(); document.querySelectorAll("#idx-list a").forEach(a => a.hidden = !a.textContent.toLowerCase().includes(n)); });
    draw(active);
  }

  /* ---------- Clinical case ---------- */
  const ROLES = {
    first:       { label: "First line",  cls: "r-first",  note: "Give this" },
    adjunct:     { label: "Adjunct",     cls: "r-adj",    note: "Add when indicated" },
    alternative: { label: "Alternative", cls: "r-alt",    note: "If the first line is unavailable" },
    supportive:  { label: "Supportive",  cls: "r-sup",    note: "Supportive care" },
    avoid:       { label: "Avoid",       cls: "r-avoid",  note: "Do not use here" }
  };
  function viewCase(main, r) {
    const c = CONDITIONS.find(x => x.id === r.id);
    if (!c) { main.innerHTML = `<p class="empty">Case not found.</p>`; return; }
    const order = ["first", "adjunct", "alternative", "supportive", "avoid"];
    const grouped = order.map(role => [role, c.drugs.filter(d => d.role === role)]).filter(([, arr]) => arr.length);
    FX.recent.push("case:" + c.id);
    const regs = FX.regimensForCase(c.id);
    main.innerHTML = `
      <a class="back" href="#/drugs">${ic("left")}All cases</a>
      <div class="head">
        <h1>${esc(c.name)}</h1>
        <div class="cls">${(c.aka || []).map(esc).join(" · ")}</div>
        <div class="row tags"><span class="chip primary">${esc(CASE_GROUPS[c.group])}</span><span class="chip warn">${ic("alert")}Draft — not clinically verified</span><span style="margin-left:auto" class="row">${FX.starButton("case:" + c.id)}<button type="button" class="btn ghost sm" id="print">${ic("print")}Print</button></span></div>
      </div>
      <div class="row case-tools">
        <button type="button" class="btn ghost sm" data-open-patient>${ic("user")}${FX.patient.weight ? `Doses for ${Calc.round(FX.patient.weight, 1)} kg` : "Set weight for doses"}</button>
        <a class="btn ghost sm" href="#/resus${FX.patient.weight ? "?w=" + FX.patient.weight : ""}">${ic("zap")}Emergency card</a>
        ${regs.map(g => `<a class="btn ghost sm" href="#/schedules?regimen=${g.id}">${ic("clock")}Schedule: ${esc(g.name.split(" — ")[0])}</a>`).join("")}
        ${EX.shareButton(`MedBridge: ${c.name}\n${c.steps?.length ? "Steps: " + c.steps.slice(0, 4).map((x, i) => `${i + 1}. ${x}`).join(" ") + "\n" : ""}First line: ${c.drugs.filter(x => x.role === "first").map(x => `${(DRUG_DB.find(y => y.id === x.id)?.name || x.id).split(" (")[0]}${x.note ? " (" + x.note + ")" : ""}`).join("; ")}${FX.patient.weight ? `\nWeight ${Calc.round(FX.patient.weight, 1)} kg` : ""}\nDraft reference. Confirm against the national protocol.`)}
      </div>
      <p class="text-2" style="max-width:70ch;font-size:1.02rem">${esc(c.summary)}</p>
      <div class="glance">
        ${c.redflags?.length ? `<div class="card antidote"><h4>${ic("alert")} Red flags</h4><ul>${c.redflags.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}
        ${c.steps?.length ? `<div class="card"><h4>What to do, in order</h4><ol style="padding-left:1.1rem;margin:0;font-size:.93rem">${c.steps.map(x => `<li>${esc(x)}</li>`).join("")}</ol></div>` : ""}
      </div>
      <h2>Drugs for this case</h2>
      ${grouped.map(([role, arr]) => `
        <div class="role-block ${ROLES[role].cls}">
          <h4>${ROLES[role].label} <span class="muted">— ${esc(ROLES[role].note)}</span></h4>
          <ul class="case-drugs">${arr.map(d => {
            const drug = DRUG_DB.find(x => x.id === d.id);
            return `<li><a href="#/drug/${d.id}" class="cd">
              <span class="cd-name">${esc(drug ? drug.name : d.id)}${ic("right")}</span>
              <span class="cd-note">${esc(d.note || "")}</span>
              ${role !== "avoid" ? FX.caseDoseInline(d.id) : ""}
              ${drug ? `<span class="cd-meta">${esc(drug.cls)} · ${drug.improvised.length} no-pump method${drug.improvised.length === 1 ? "" : "s"}</span>` : ""}
            </a></li>`;
          }).join("")}</ul>
        </div>`).join("")}
      ${c.textbook?.length ? `<h2>What the textbooks say</h2>${textbookHtml(c.textbook, "case")}` : ""}
      <div class="card"><h4 style="margin-top:0">Sources</h4><ul class="small">${(c.sources || []).map(x => `<li>${esc(x.name)}</li>`).join("")}</ul>
      <p class="small muted">Draft. This bundle lists which drugs are used and why; each drug page carries the doses, the no-pump methods and its own sources. Verify against your national protocol before use.</p></div>`;
    $("#print").addEventListener("click", () => window.print());
    FX.bindStars(main);
  }

  /* ---------- Calculators ---------- */
  function viewCalc(main, r) {
    const tabs = [["drip", "Drip rate"], ["infusion", "Dose → drops"], ["weight", "mg/kg"], ["dilution", "Dilution"], ["planc", "Plan C fluids"], ["pedwt", "Child weight"], ["fluids", "Fluids & blood"], ["kidney", "Kidney"], ["ciwa", "Alcohol withdrawal"], ["units", "Units"]];
    const presetDrug = DRUG_DB.find(d => d.id === r.q.drug);
    let active = r.q.tab || (presetDrug ? ({ infusion: "infusion", weight: "weight", planC: "planc" }[presetDrug.calc?.type] || "drip") : "drip");
    main.innerHTML = `
      <h1>Calculators</h1>
      <p class="small muted">Defaults for <a href="#/local">${esc(profLabel())}</a>: ${profCalc().dropFactor} drops/mL sets · glucose in ${esc(profCalc().glucoseUnit)} · weight estimate ${profCalc().weightFormula === "age4x2" ? "(age + 4) × 2" : "APLS"}.</p>
      <div class="tabs" role="tablist">${tabs.map(([k, v]) => `<button type="button" role="tab" class="tab ${k === active ? "active" : ""}" data-tab="${k}">${v}</button>`).join("")}</div>
      <div class="calc-grid"><div id="calcpane"></div>
        <aside><div class="card"><h4 style="margin-top:0">Remember</h4>
          <ul class="small" style="margin:0"><li>Drop factor is printed on the giving-set packet: 10, 15 or 20 drops/mL for standard sets, 60 drops/mL for paediatric microdrip sets.</li><li>With a 60 drops/mL set, drops per minute = mL per hour.</li><li>Count drops for 15 s and multiply by 4. Recount after 15 min and after any movement.</li><li>Aim for 5–60 drops/min; change the dilution rather than fighting an uncountable rate.</li></ul></div></aside>
      </div>`;
    let pane = $("#calcpane");
    const dfSelect = (id, val) => `<div class="field"><label for="${id}">Drop factor (drops/mL)</label><select id="${id}">${DROP_FACTORS.map(f => `<option value="${f}" ${f == val ? "selected" : ""}>${f}${f === 60 ? " (microdrip)" : ""}</option>`).join("")}</select></div>`;
    const wField = (id) => `<div class="field"><label for="${id}">Weight (kg)</label><input id="${id}" type="number" inputmode="decimal" min="0" step="0.1" value="${esc(settings.weight)}"></div>`;
    const bindWeight = (el) => el.addEventListener("input", () => { settings.weight = el.value; FX.syncPatientChip(); });
    const warn = (t) => `<div class="warn">${ic("alert")}<span>${t}</span></div>`;

    const views = {
      fluids() { EX.calcFluids(pane, settings.dropFactor); },
      ciwa() { EX.calcCiwa(pane); },
      kidney() { EX.calcKidney(pane); },
      drip() {
        pane.innerHTML = `<div class="card">
          <div class="inline"><div class="field"><label for="v">Volume (mL)</label><input id="v" type="number" inputmode="decimal" min="0" value="500"></div>
          <div class="field"><label for="t">Time (minutes)</label><input id="t" type="number" inputmode="decimal" min="0" value="240"></div></div>
          ${dfSelect("df", settings.dropFactor)}<div id="out"></div></div>
          <div class="card"><h3>Reverse: drops/min → mL/h</h3>
          <div class="inline"><div class="field"><label for="g">Drops per minute</label><input id="g" type="number" inputmode="decimal" min="0"></div>${dfSelect("df2", settings.dropFactor)}</div><div id="out2"></div></div>`;
        const calc = () => {
          const res = Calc.dripRate(+$("#v").value, +$("#t").value, +$("#df").value);
          $("#out").innerHTML = res ? `<div class="result"><div class="big">${fmt(res.gttPerMin, 0)} drops/min</div>
            <div class="sub">${fmt(res.gttPer15s, 0)} drops per 15 s · 1 drop every ${fmt(res.secPerDrop, 1)} s · ${fmt(res.mlPerHr, 0)} mL/h</div>
            ${res.countable ? "" : warn("Over 150 drops/min cannot be counted reliably — run near free flow and check the bag level against a time-tape every 10–15 min.")}</div>` : "";
          const r2 = Calc.rateFromDrops(+$("#g").value, +$("#df2").value);
          $("#out2").innerHTML = r2 ? `<div class="result"><div class="big">${fmt(r2.mlPerHr, 0)} mL/h</div><div class="sub">${fmt(r2.mlPerHr * 24, 0)} mL per 24 h</div></div>` : "";
        };
        pane.addEventListener("input", calc); calc();
      },
      infusion() {
        const presets = DRUG_DB.filter(d => d.calc?.type === "infusion");
        const p = presetDrug?.calc?.type === "infusion" ? presetDrug : null;
        const c = p?.calc || { amount: 4, amountUnit: "mg", volumeMl: 250, doseUnit: "mcg/kg/min", defaultDose: 0.1, dropFactor: 60 };
        pane.innerHTML = `<div class="card">
          <div class="field"><label for="preset">Preset</label><select id="preset"><option value="">Custom</option>${presets.map(d => `<option value="${d.id}" ${p?.id === d.id ? "selected" : ""}>${esc(d.name)} — ${d.calc.amount} ${d.calc.amountUnit} in ${d.calc.volumeMl} mL</option>`).join("")}</select></div>
          <div class="inline"><div class="field"><label for="amt">Drug amount in bag</label><input id="amt" type="number" inputmode="decimal" min="0" value="${c.amount}"></div>
          <div class="field"><label for="amtu">Unit</label><select id="amtu">${["mg", "mcg", "g", "units"].map(u => `<option ${u === c.amountUnit ? "selected" : ""}>${u}</option>`).join("")}</select></div></div>
          <div class="inline"><div class="field"><label for="vol">Bag volume (mL)</label><input id="vol" type="number" inputmode="decimal" min="0" value="${c.volumeMl}"></div>${wField("wt")}</div>
          <div class="inline"><div class="field"><label for="dose">Desired dose</label><input id="dose" type="number" inputmode="decimal" min="0" step="any" value="${c.defaultDose ?? ""}"></div>
          <div class="field"><label for="doseu">Dose unit</label><select id="doseu">${["mcg/kg/min", "mcg/min", "mg/kg/h", "mg/h", "mg/kg/min", "units/kg/h", "units/h"].map(u => `<option ${u === c.doseUnit ? "selected" : ""}>${u}</option>`).join("")}</select></div></div>
          ${dfSelect("df", c.dropFactor || settings.dropFactor)}
          ${p?.calc?.range ? `<p class="small muted">Usual range for ${esc(p.name)}: ${p.calc.range[0]}–${p.calc.range[1]} ${p.calc.doseUnit}.</p>` : ""}
          <div id="out"></div></div>`;
        bindWeight($("#wt"));
        $("#preset").addEventListener("change", e => { location.hash = `#/calc?tab=infusion&drug=${e.target.value}`; });
        const calc = () => {
          const args = { amount: +$("#amt").value, amountUnit: $("#amtu").value, volumeMl: +$("#vol").value, weightKg: +$("#wt").value, dose: +$("#dose").value, doseUnit: $("#doseu").value, dropFactor: +$("#df").value };
          const res = Calc.infusionRate(args);
          if (!res) { $("#out").innerHTML = `<p class="small muted">Enter all values${args.doseUnit.includes("/kg") ? " including weight" : ""}.</p>`; return; }
          if (res.error) { $("#out").innerHTML = `<div class="callout danger">${ic("alert")}<span>${esc(res.error)}</span></div>`; return; }
          const rows = p?.calc?.range ? [p.calc.range[0], (p.calc.range[0] + p.calc.range[1]) / 2, p.calc.range[1]].map(dd => { const rr = Calc.infusionRate({ ...args, dose: dd }); return `<tr><td>${dd} ${esc(args.doseUnit)}</td><td>${fmt(rr.mlPerHr, 1)} mL/h</td><td>${fmt(rr.gttPerMin, 0)} drops/min</td></tr>`; }).join("") : "";
          $("#out").innerHTML = `<div class="result">
            <div class="big">${fmt(res.gttPerMin, 0)} drops/min</div>
            <div class="sub">= ${fmt(res.mlPerHr, 1)} mL/h · ${fmt(res.gttPer15s, 0)} drops per 15 s (${args.dropFactor} drops/mL set)</div>
            <div class="sub">Concentration ${fmt(res.concPerMl, 3)} ${esc(res.concUnit)}${res.concMcgPerMl != null ? ` (${fmt(res.concMcgPerMl, 1)} mcg/mL)` : ""} · delivers ${fmt(res.perHour, 2)} ${esc(res.perHourUnit)} · ${fmt(res.mlPerDay, 0)} mL/day</div>
            ${res.gttPerMin < 4 ? warn("Fewer than 4 drops/min is hard to control by gravity — use a more dilute preparation or a microdrip set.") : ""}
            ${res.gttPerMin > 150 ? warn("Not countable — use a more concentrated preparation or a microdrip set.") : ""}
            ${rows ? `<table><tr><th>Dose</th><th>Rate</th><th>Drops</th></tr>${rows}</table>` : ""}</div>`;
        };
        pane.addEventListener("input", calc); calc();
      },
      weight() {
        const presets = DRUG_DB.filter(d => d.calc?.type === "weight");
        const p = presetDrug?.calc?.type === "weight" ? presetDrug : null;
        const c = p?.calc || { dosePerKg: "", doseUnit: "mg", conc: "", maxDose: "" };
        pane.innerHTML = `<div class="card">
          <div class="field"><label for="preset">Preset</label><select id="preset"><option value="">Custom</option>${presets.map(d => `<option value="${d.id}" ${p?.id === d.id ? "selected" : ""}>${esc(d.name)} — ${esc(d.calc.label)}</option>`).join("")}</select></div>
          <div class="inline"><div class="field"><label for="dpk">Dose per kg</label><input id="dpk" type="number" inputmode="decimal" min="0" step="any" value="${c.dosePerKg}"></div>
          <div class="field"><label for="du">Unit</label><select id="du">${["mg", "mcg", "units", "mL", "mmol"].map(u => `<option ${u === c.doseUnit ? "selected" : ""}>${u}</option>`).join("")}</select></div></div>
          <div class="inline">${wField("wt")}<div class="field"><label for="max">Max dose (optional)</label><input id="max" type="number" inputmode="decimal" min="0" step="any" value="${c.maxDose ?? ""}"></div></div>
          <div class="field"><label for="conc">Concentration available (per mL)</label><input id="conc" type="number" inputmode="decimal" min="0" step="any" value="${c.conc ?? ""}" placeholder="e.g. 50 for 50 mg/mL"></div>
          <div id="out"></div></div>`;
        bindWeight($("#wt"));
        $("#preset").addEventListener("change", e => { location.hash = `#/calc?tab=weight&drug=${e.target.value}`; });
        const calc = () => {
          const res = Calc.weightDose({ dosePerKg: +$("#dpk").value, weightKg: +$("#wt").value, maxDose: +$("#max").value, conc: +$("#conc").value });
          const u = $("#du").value;
          $("#out").innerHTML = res ? `<div class="result"><div class="big">${fmt(res.dose, 2)} ${esc(u)}${res.capped ? " (capped)" : ""}</div>
            ${res.volumeMl != null && u !== "mL" ? `<div class="sub">= ${fmt(res.volumeMl, 2)} mL of ${$("#conc").value} ${esc(u)}/mL</div>` : ""}</div>` : "";
        };
        pane.addEventListener("input", calc); calc();
      },
      dilution() {
        const presets = [["10 % dextrose from 50 %", 50, 10, 50], ["5 % dextrose from 50 %", 50, 5, 500], ["Magnesium sulfate 20 % from 50 %", 50, 20, 20], ["Adrenaline 1:10 000 from 1:1000 (mg/mL)", 1, 0.1, 10], ["Adrenaline 1:100 000 'push-dose' from 1:10 000", 0.1, 0.01, 10], ["Quinine 60 mg/mL from 300 mg/mL", 300, 60, 5], ["Gentamicin 10 mg/mL from 40 mg/mL", 40, 10, 4], ["Morphine 1 mg/mL from 10 mg/mL", 10, 1, 10]];
        pane.innerHTML = `<div class="card">
          <div class="field"><label for="preset">Preset</label><select id="preset"><option value="">Custom</option>${presets.map((p, i) => `<option value="${i}">${esc(p[0])}</option>`).join("")}</select></div>
          <div class="inline"><div class="field"><label for="c1">Stock concentration</label><input id="c1" type="number" inputmode="decimal" min="0" step="any"></div>
          <div class="field"><label for="c2">Target concentration</label><input id="c2" type="number" inputmode="decimal" min="0" step="any"></div></div>
          <div class="field"><label for="vf">Final volume wanted (mL)</label><input id="vf" type="number" inputmode="decimal" min="0" step="any"></div>
          <p class="small muted">Use the same unit for both concentrations (%, mg/mL, mcg/mL…).</p><div id="out"></div></div>`;
        const calc = () => {
          const res = Calc.dilution({ stockConc: +$("#c1").value, targetConc: +$("#c2").value, finalVolumeMl: +$("#vf").value });
          $("#out").innerHTML = !res ? "" : res.error ? `<div class="callout danger">${ic("alert")}<span>${esc(res.error)}</span></div>` :
            `<div class="result"><div class="big">${fmt(res.stockVolumeMl, 2)} mL stock + ${fmt(res.diluentMl, 2)} mL diluent</div><div class="sub">= ${$("#vf").value} mL at ${$("#c2").value} (1 part in ${fmt(res.ratio, 1)}). Mix well and label with drug, concentration, date and time.</div></div>`;
        };
        $("#preset").addEventListener("change", e => { const p = presets[e.target.value]; if (p) { $("#c1").value = p[1]; $("#c2").value = p[2]; $("#vf").value = p[3]; } calc(); });
        pane.addEventListener("input", calc);
      },
      planc() {
        pane.innerHTML = `<div class="card"><p class="small muted">WHO Plan C for severe dehydration. Tick SAM for the malnutrition regimen instead.</p>
          <div class="inline">${wField("wt")}<div class="field"><label for="age">Age</label><select id="age"><option value="1">Under 12 months</option><option value="0">12 months or older</option></select></div></div>
          ${dfSelect("df", settings.dropFactor)}
          <label class="toggle"><span><strong>Severe acute malnutrition (SAM)</strong><br><span class="small muted">MUAC < 11.5 cm, WHZ < −3 or oedema — Plan C rates are dangerous</span></span><span class="switch"><input type="checkbox" id="sam"><span></span></span></label>
          <div id="out"></div></div>`;
        bindWeight($("#wt"));
        const calc = () => {
          if ($("#sam").checked) {
            const r = Calc.samPlan(+$("#wt").value, +$("#df").value);
            $("#out").innerHTML = r ? `<div class="result"><div class="big">ReSoMal ${fmt(r.resomalEvery30min, 0)} mL</div>
              <div class="sub">every 30 min for the first 2 h (oral/NG), then ${fmt(r.resomalPerHourLow, 0)}–${fmt(r.resomalPerHourHigh, 0)} mL/h for up to 10 h, alternating with F-75. Stop if pulse/RR rise or oedema increases.</div>
              <div class="sub"><strong>Only if shocked</strong> (cold hands + CRT > 3 s + weak fast pulse, lethargic): IV ${fmt(r.shock.volume, 0)} mL of RL + D5 (or half-strength Darrow's + D5) over 60 min = ${fmt(r.shock.mlPerHr, 0)} mL/h = ${fmt(r.shock.gttPerMin, 0)} drops/min (${fmt(r.shock.gttPer15s, 0)}/15 s). Repeat once if improving; otherwise transfuse 10 mL/kg over 3 h.</div>
              <div class="sub">On admission: 50 mL of 10 % glucose or sugar water orally/NG; keep warm; routine antibiotics.</div></div>` : "";
            return;
          }
          const res = Calc.planC(+$("#wt").value, $("#age").value === "1", +$("#df").value);
          if (!res) { $("#out").innerHTML = ""; return; }
          const row = (label, p) => `<tr><td>${label}</td><td>${fmt(p.volume, 0)} mL over ${p.minutes} min</td><td>${fmt(p.mlPerHr, 0)} mL/h</td><td>${p.countable ? fmt(p.gttPerMin, 0) + " drops/min (" + fmt(p.gttPer15s, 0) + "/15 s)" : "free flow — check bag every 10 min"}</td></tr>`;
          $("#out").innerHTML = `<div class="result"><div class="big">${fmt(res.total, 0)} mL total</div>
            <table><tr><th>Phase</th><th>Volume</th><th>Rate</th><th>Drops</th></tr>${row("1 · 30 mL/kg", res.phase1)}${row("2 · 70 mL/kg", res.phase2)}</table>
            <div class="sub">Reassess every 15–30 min. Repeat phase 1 if the radial pulse is still weak. ORS ${fmt(res.orsPerHour, 0)} mL/h as soon as able to drink. No IV: NG ORS ${fmt(res.ngOrsPerHour, 0)} mL/h for 6 h.</div></div>`;
        };
        pane.addEventListener("input", calc); calc();
      },
      pedwt() {
        const wf = profCalc().weightFormula;
        pane.innerHTML = `<div class="card"><p class="small muted">Age-based estimates — use a measured weight whenever a scale exists.</p>
          <div class="inline"><div class="field"><label for="yrs">Age (years)</label><input id="yrs" type="number" inputmode="decimal" min="0" step="1"></div>
          <div class="field"><label for="mos">or age (months, if under 1 y)</label><input id="mos" type="number" inputmode="decimal" min="0" max="11" step="1"></div></div>
          <div class="field"><label for="wf">Formula</label><select id="wf"><option value="apls" ${wf === "apls" ? "selected" : ""}>APLS: 1–5 y (2×age)+8; 6–12 y (3×age)+7</option><option value="age4x2" ${wf === "age4x2" ? "selected" : ""}>WHO/local: (age + 4) × 2 for 1–10 y</option></select></div>
          <div id="out"></div></div>`;
        const calc = () => {
          const mos = $("#mos").value === "" ? null : +$("#mos").value;
          const res = Calc.estimateWeight({ years: +$("#yrs").value, months: mos, formula: $("#wf").value });
          $("#out").innerHTML = res ? `<div class="result"><div class="big">${res.kg != null ? "≈ " + fmt(res.kg, 1) + " kg" : "—"}</div><div class="sub">${esc(res.formula)}</div>${res.kg ? `<div class="sub"><button type="button" class="btn sm" id="usewt">Use this weight in calculators</button></div>` : ""}</div>` : "";
          const b = $("#usewt"); if (b) b.addEventListener("click", () => { settings.weight = String(Calc.round(res.kg, 1)); b.textContent = "Saved"; });
        };
        pane.addEventListener("input", calc);
      },
      units() {
        const gu = profCalc().glucoseUnit;
        pane.innerHTML = `<div class="card"><h3>Glucose</h3><p class="small muted">Your setting reports glucose in <strong>${esc(gu)}</strong>. mmol/L × 18 = mg/dL.</p>
          <div class="inline"><div class="field"><label for="mmol">mmol/L</label><input id="mmol" type="number" inputmode="decimal" step="any"></div><div class="field"><label for="mgdl">mg/dL</label><input id="mgdl" type="number" inputmode="decimal" step="any"></div></div>
          <table class="plain"><tr><th>Threshold</th><th>mmol/L</th><th>mg/dL</th></tr><tr><td>Hypoglycaemia (child/adult)</td><td>&lt; 2.5 / &lt; 3.9</td><td>&lt; 45 / &lt; 70</td></tr><tr><td>Add dextrose in DKA</td><td>&lt; 14</td><td>&lt; 250</td></tr><tr><td>DKA target fall per hour</td><td>3–4</td><td>50–70</td></tr></table></div>
          <div class="card"><h3>Other conversions</h3>
          <div class="inline"><div class="field"><label for="pct">Solution %</label><input id="pct" type="number" inputmode="decimal" step="any" placeholder="e.g. 10"></div><div class="field"><label for="mgml">= mg/mL</label><input id="mgml" type="number" inputmode="decimal" step="any"></div></div>
          <div class="inline"><div class="field"><label for="mg">mg</label><input id="mg" type="number" inputmode="decimal" step="any"></div><div class="field"><label for="mcg">mcg (µg)</label><input id="mcg" type="number" inputmode="decimal" step="any"></div></div>
          <p class="small muted">Potassium: 1 mEq = 1 mmol. 1 g KCl ≈ 13.4 mmol. 1 g calcium gluconate = 2.2 mmol Ca; 1 g calcium chloride = 6.8 mmol Ca. Ratio strengths: 1:1000 = 1 mg/mL; 1:10 000 = 0.1 mg/mL.</p></div>`;
        const pair = (a, b, f, g) => { $("#" + a).addEventListener("input", e => { $("#" + b).value = e.target.value === "" ? "" : Calc.round(f(+e.target.value), 2); }); $("#" + b).addEventListener("input", e => { $("#" + a).value = e.target.value === "" ? "" : Calc.round(g(+e.target.value), 2); }); };
        pair("mmol", "mgdl", Calc.glucose.toMgdl, Calc.glucose.toMmol);
        pair("pct", "mgml", x => x * 10, x => x / 10);
        pair("mg", "mcg", x => x * 1000, x => x / 1000);
      }
    };
    const draw = (tab) => { const fresh = pane.cloneNode(false); pane.replaceWith(fresh); pane = fresh; views[tab](); document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tab)); };
    main.querySelector(".tabs").addEventListener("click", e => { const t = e.target.closest("[data-tab]"); if (t) { active = t.dataset.tab; draw(active); } });
    draw(active);
  }

  /* ---------- Techniques ---------- */
  function viewTechniques(main) {
    const T = [
      ["Know your giving set", `The drop factor is printed on the packet. Standard adult sets: 10, 15 or 20 drops/mL. Paediatric “microdrip” sets: 60 drops/mL — with these, <strong>drops per minute = mL per hour</strong>. Formula: <code>drops/min = volume (mL) × drop factor ÷ minutes</code>. Count for 15 seconds and multiply by 4.`],
      ["Burette = your safety pump", `A burette holds 100–150 mL between the bag and the drip chamber. Fill it with only one hour's volume of a dangerous drug (vasopressors, magnesium, potassium, insulin, heparin). If the clamp slips, the patient receives at most one hour's dose.`],
      ["Time-tape the bag", `Stick tape down the side of the bag and mark the fluid level expected at each hour. Anyone can see whether the drip is ahead or behind and adjust the clamp.`],
      ["Choose a countable concentration", `Aim for 5–60 drops/min. Below 4 the rate is unstable; above 150 it cannot be counted. Change the dilution, not the rate. The <a href="#/calc?tab=infusion">Dose → drops calculator</a> warns you when a rate is impractical.`],
      ["Replace the infusion with intermittent dosing", `Many infusions have validated intermittent alternatives: magnesium sulfate IM every 4 h, insulin IM hourly, aminophylline every 6 h, enoxaparin instead of a heparin drip, labetalol boluses, quinine over 4 h by drops. See each drug's “No pump / improvised” tab.`],
      ["Use another route", `IM, SC, rectal (diazepam, artesunate), buccal/intranasal (midazolam), sublingual (sugar, misoprostol), NG (ORS, glucose) and intraosseous (fluids, any IV drug) avoid the need for rate-controlled IV access.`],
      ["Dilution arithmetic", `<code>C1 × V1 = C2 × V2</code>. To make 20 mL of 20 % from 50 %: 20 × 20 ÷ 50 = 8 mL stock + 12 mL diluent. The <a href="#/calc?tab=dilution">Dilution calculator</a> holds the common recipes.`],
      ["Vasoactive drugs peripherally", `Large proximal vein (antecubital or above), 18–20 G, confirmed free-flowing. Dedicated line: never flush, never piggy-back, never disconnect. Check the site every hour; keep an extravasation plan. Manual BP every 5 min during titration.`],
      ["Label everything", `Drug, amount, total volume, concentration per mL, date, time, initials. Non-standard concentrations (rule of 6) are single-patient only.`],
      ["Weigh, or estimate", `Use a scale. If none: (age + 4) × 2 kg for 1–5 y, or the <a href="#/calc?tab=pedwt">APLS formulae</a>. Record the weight used on the chart.`]
    ];
    main.innerHTML = `<h1>Running drugs without a pump</h1><p class="text-2" style="max-width:60ch">Ten habits that make gravity infusions and alternative routes safe. Each drug page applies them to a specific medicine.</p>
      <div class="tech" data-no-i18n lang="en">${T.map(([h, b]) => `<div class="card"><div><h3>${h}</h3><p style="margin:0">${b}</p></div></div>`).join("")}</div>`;
  }

  /* ---------- Local setting (country / facility profile) ---------- */
  function viewLocal(main) {
    const P = prof(), T = profTier(), C = settings.custom, cc = profCalc();
    const notesCount = Object.keys(P.drugNotes).length + Object.keys(C.drugNotes || {}).filter(k => !P.drugNotes[k]).length;
    const noteDrugs = sortedDrugs().filter(d => profNotes(d.id));
    main.innerHTML = `
      <h1>Local setting</h1>
      <p class="text-2" style="max-width:62ch">Choose the country profile and your facility level. The app then applies local equipment, stocked strengths, national-protocol notes on each drug, local procedures, and calculator defaults. Everything can be edited for your own facility and shared as a file.</p>
      <div class="card">
        <div class="inline">
          <div class="field"><label for="prof">Country / profile</label><select id="prof">${PROFILES.map(p => `<option value="${p.id}" ${p.id === P.id ? "selected" : ""}>${esc(p.name)}</option>`).join("")}</select></div>
          <div class="field"><label for="tier">Facility level</label><select id="tier"><option value="">— choose (sets equipment) —</option>${P.tiers.map(t => `<option value="${t.id}" ${T?.id === t.id ? "selected" : ""}>${esc(t.name)}</option>`).join("")}</select></div>
        </div>
        <p class="small text-2">${esc(P.summary)}</p>
        <div class="row"><span class="chip warn">${ic("alert")}Draft — verify against national STG</span>${T ? `<span class="chip ok">${ic("check")}Equipment set for ${esc(T.name)}</span>` : `<span class="chip">${ic("info")}No level chosen — all methods shown</span>`}</div>
      </div>
      <div class="glance">
        <div class="card"><h4>Calculator defaults</h4><ul><li>Giving set: <strong>${cc.dropFactor} drops/mL</strong></li><li>Glucose unit: <strong>${esc(cc.glucoseUnit)}</strong></li><li>Weight estimate: <strong>${cc.weightFormula === "age4x2" ? "(age + 4) × 2" : "APLS"}</strong></li><li>SAM adjustments: <strong>${cc.sam ? "on" : "off"}</strong> (Plan C calculator)</li></ul></div>
        <div class="card"><h4>Coverage</h4><ul><li>${profProcedures().length} local procedures</li><li>${notesCount} drugs with local notes</li><li>${P.tiers.length} facility levels</li></ul><p class="small muted" style="margin:.5rem 0 0">Sources: ${P.sources.map(x => esc(x.name)).join("; ")}</p></div>
      </div>
      <h2>Local procedures and techniques</h2>
      <div class="tech proc">${profProcedures().map((x, i) => `<div class="card"><div><h3>${esc(x.title)}${x.custom ? ` <span class="chip primary">my facility</span>` : ""}</h3><div class="small muted" style="margin-bottom:.4rem">${esc(x.level || "")}</div><p style="margin:0">${esc(x.text)}</p>${x.custom ? `<button type="button" class="btn ghost sm" data-delproc="${i - P.procedures.length}" style="margin-top:.6rem">Remove</button>` : ""}</div></div>`).join("")}</div>
      <h2 style="margin-top:1.25rem">Drugs with local notes</h2>
      <ul class="drug-list">${noteDrugs.map(d => `<li><a class="drug-item" href="#/drug/${d.id}" ${catStyle(d.cat)}><div class="top"><span class="name">${esc(d.name)}</span>${ic("right")}</div><div class="meta"><span>${[profNotes(d.id).stock?.length && "stock", profNotes(d.id).protocol?.length && "protocol", profNotes(d.id).technique?.length && "technique", profNotes(d.id).custom && "my facility"].filter(Boolean).join(" · ")}</span></div></a></li>`).join("") || `<li class="empty">No drug notes in this profile yet — add yours below.</li>`}</ul>
      <h2 style="margin-top:1.25rem">Customise for my facility</h2>
      <div class="card">
        <div class="field"><label for="c-name">Facility name</label><input id="c-name" value="${esc(C.name || "")}" placeholder="e.g. Debre Berhan Referral Hospital"></div>
        <div class="inline">
          <div class="field"><label for="c-df">Our usual giving set</label><select id="c-df"><option value="">Profile default (${P.calc.dropFactor})</option>${DROP_FACTORS.map(f => `<option value="${f}" ${C.dropFactor == f ? "selected" : ""}>${f} drops/mL</option>`).join("")}</select></div>
          <div class="field"><label for="c-gu">Glucose unit</label><select id="c-gu"><option value="">Profile default (${esc(P.calc.glucoseUnit)})</option>${["mmol/L", "mg/dL"].map(u => `<option ${C.glucoseUnit === u ? "selected" : ""}>${u}</option>`).join("")}</select></div>
        </div>
        <div class="field"><label for="c-wf">Weight-estimate formula</label><select id="c-wf"><option value="">Profile default</option><option value="apls" ${C.weightFormula === "apls" ? "selected" : ""}>APLS</option><option value="age4x2" ${C.weightFormula === "age4x2" ? "selected" : ""}>(age + 4) × 2</option></select></div>
      </div>
      <div class="card"><h3>Add a local procedure</h3>
        <div class="inline"><div class="field"><label for="p-title">Title</label><input id="p-title" placeholder="e.g. Oxygen splitter for two cots"></div><div class="field"><label for="p-level">Facility level</label><input id="p-level" placeholder="e.g. Primary hospital"></div></div>
        <div class="field"><label for="p-text">Description</label><textarea id="p-text" rows="3" placeholder="What you do, step by step"></textarea></div>
        <button type="button" class="btn sm" id="p-add">${ic("check")}Add procedure</button></div>
      <div class="card"><h3>Add a local note to a drug</h3>
        <div class="field"><label for="n-drug">Drug</label><select id="n-drug">${sortedDrugs().map(d => `<option value="${d.id}">${esc(d.name)}</option>`).join("")}</select></div>
        <div class="field"><label for="n-text">Note (stocked strength, protocol, how you give it here)</label><textarea id="n-text" rows="3"></textarea></div>
        <button type="button" class="btn sm" id="n-save">${ic("check")}Save note</button>
        ${Object.keys(C.drugNotes || {}).length ? `<h4>My notes</h4><ul>${Object.entries(C.drugNotes).map(([k, v]) => `<li><a href="#/drug/${k}">${esc(DRUG_DB.find(d => d.id === k)?.name || k)}</a>: ${esc(v).slice(0, 120)}${v.length > 120 ? "…" : ""} <button type="button" class="btn ghost sm" data-delnote="${k}">Remove</button></li>`).join("")}</ul>` : ""}</div>
      <div class="card"><h3>Share or restore my facility profile</h3>
        <p class="small muted">Export copies your customisations (name, defaults, procedures, notes) as text you can send to another phone or facility; import pastes them back.</p>
        <div class="row"><button type="button" class="btn ghost sm" id="exp">Export</button><button type="button" class="btn ghost sm" id="imp">Import</button><button type="button" class="btn ghost sm" id="clr">Clear my customisations</button></div>
        <div class="field" style="margin-top:.6rem"><label for="io">Profile text (JSON)</label><textarea id="io" rows="4"></textarea></div></div>`;
    $("#prof").addEventListener("change", e => { applyProfile(e.target.value); render(); });
    $("#tier").addEventListener("change", e => { applyTier(e.target.value); render(); });
    const saveC = (patch) => { settings.custom = { ...settings.custom, ...patch }; };
    $("#c-name").addEventListener("input", e => saveC({ name: e.target.value }));
    $("#c-df").addEventListener("change", e => { saveC({ dropFactor: e.target.value }); settings.dropFactor = +(e.target.value || P.calc.dropFactor); });
    $("#c-gu").addEventListener("change", e => saveC({ glucoseUnit: e.target.value }));
    $("#c-wf").addEventListener("change", e => saveC({ weightFormula: e.target.value }));
    $("#p-add").addEventListener("click", () => { const t = $("#p-title").value.trim(), x = $("#p-text").value.trim(); if (!t || !x) return; saveC({ procedures: [...(settings.custom.procedures || []), { title: t, level: $("#p-level").value.trim(), text: x }] }); render(); });
    $("#n-save").addEventListener("click", () => { const id = $("#n-drug").value, x = $("#n-text").value.trim(); if (!x) return; saveC({ drugNotes: { ...(settings.custom.drugNotes || {}), [id]: x } }); render(); });
    main.addEventListener("click", e => {
      const dp = e.target.closest("[data-delproc]"); if (dp) { const arr = [...(settings.custom.procedures || [])]; arr.splice(+dp.dataset.delproc, 1); saveC({ procedures: arr }); render(); }
      const dn = e.target.closest("[data-delnote]"); if (dn) { const n = { ...(settings.custom.drugNotes || {}) }; delete n[dn.dataset.delnote]; saveC({ drugNotes: n }); render(); }
    });
    $("#exp").addEventListener("click", () => { $("#io").value = JSON.stringify({ profile: settings.profile, tier: settings.tier, custom: settings.custom }, null, 2); $("#io").select(); });
    $("#imp").addEventListener("click", () => { try { const o = JSON.parse($("#io").value); if (o.profile && PROFILES.some(p => p.id === o.profile)) applyProfile(o.profile); if (o.tier) applyTier(o.tier); if (o.custom) settings.custom = { name: "", drugNotes: {}, procedures: [], ...o.custom }; render(); } catch { alert("Could not read that profile text."); } });
    $("#clr").addEventListener("click", () => { if (confirm("Remove all your customisations?")) { store.del("custom"); render(); } });
  }

  /* ---------- Setup ---------- */
  function viewSetup(main) {
    const eq = settings.equipment || Object.fromEntries(Object.keys(EQUIPMENT).map(k => [k, true]));
    const groups = {};
    Object.entries(EQUIPMENT).forEach(([k, v]) => (groups[v.group] ||= []).push([k, v.label]));
    main.innerHTML = `
      <h1>My setup</h1>
      <div class="callout info">${ic("globe")}<div><strong>Setting: ${esc(profLabel())}.</strong> Choosing a facility level on the <a href="#/local">Local setting</a> page fills these switches automatically; adjust them here afterwards.</div></div>
      <div class="card"><h4 style="margin-top:0">My ward</h4>
        <p class="small muted" style="margin-top:-.2rem">The drug list opens filtered to this ward. Everything stays reachable — switch to “All drugs” or “By drug class” at any time.</p>
        <div class="field"><label for="myward">Where I work</label><select id="myward"><option value="">No ward — show all drugs</option>${Object.entries(WARDS).map(([k, v]) => `<option value="${k}" ${settings.ward === k ? "selected" : ""}>${esc(v.label)} (${DRUG_DB.filter(d => d.wards.includes(k)).length} drugs)</option>`).join("")}</select></div>
        ${settings.ward ? `<p class="small muted">${esc(WARDS[settings.ward].note)}</p>` : ""}</div>
      <p class="text-2" style="max-width:60ch">Tick what your facility actually has. Methods that need something you lack are dimmed and sorted last on every drug page — nothing is hidden. Saved on this device only.</p>
      ${Object.entries(groups).map(([g, items]) => `<div class="card"><h4 style="margin-top:0">${esc(g)}</h4>${items.map(([k, label]) => `
        <label class="toggle"><span>${esc(label)}</span><span class="switch"><input type="checkbox" data-eq="${k}" ${eq[k] ? "checked" : ""}><span></span></span></label>`).join("")}</div>`).join("")}
      <div class="card"><h4 style="margin-top:0">Appearance</h4>
        <div class="seg" id="seg-theme" role="group" aria-label="Colour theme">
          <button type="button" data-theme="" class="${theme.get() ? "" : "active"}">${ic("monitor")}Follow system</button>
          <button type="button" data-theme="light" class="${theme.get() === "light" ? "active" : ""}">${ic("sun")}Light</button>
          <button type="button" data-theme="dark" class="${theme.get() === "dark" ? "active" : ""}">${ic("moon")}Dark</button>
        </div></div>
      <div class="card"><h4 style="margin-top:0">Language</h4>
        <p class="small muted" style="margin-top:-.2rem">Interface language. Doses and clinical content always stay in English.</p>
        <label class="toggle" style="margin-top:.6rem"><span>${ic("calendar")} Show Ethiopian calendar dates<br><span class="small muted">On schedules, charts, sign-offs and printouts, next to the international date.</span></span><span class="switch"><input type="checkbox" id="ethcal" ${window.EthCal && EthCal.enabled() ? "checked" : ""}><span></span></span></label>
        <p class="small muted" style="margin:.2rem 0 0">Today: ${window.EthCal ? EthCal.format(new Date(), window.I18N?.lang) : ""}</p>
        <div class="seg lang-seg" id="seg-lang" role="group" aria-label="Language" data-no-i18n><button type="button" data-lang="en" class="${window.I18N?.lang === "am" ? "" : "active"}" lang="en">English</button><button type="button" data-lang="am" class="${window.I18N?.lang === "am" ? "active" : ""}" lang="am">አማርኛ</button></div></div>
      <div class="card"><h4 style="margin-top:0">Defaults</h4>
        <div class="field"><label for="df">Default drop factor of your usual giving set</label><select id="df">${DROP_FACTORS.map(f => `<option value="${f}" ${f == settings.dropFactor ? "selected" : ""}>${f} drops/mL</option>`).join("")}</select></div>
        <button type="button" class="btn ghost sm" id="reset">Reset setup (show everything)</button></div>
      <div class="card"><h4 style="margin-top:0">About this build</h4>
        <p class="small">${DRUG_DB.length} drugs · ${DRUG_DB.reduce((n, d) => n + d.improvised.length, 0)} improvised methods · ${DRUG_DB.filter(d => d.review.status === "reviewed").length} reviewed, ${DRUG_DB.filter(d => d.review.status !== "reviewed").length} draft.</p>
        <p class="small">Developed and put together by <strong><span class="credit-name" data-no-i18n lang="en">Dr Bruktayt Engida</span></strong>.</p>
        <p class="small muted">Works offline once loaded. On Android/Chrome use “Add to Home screen” to install. <a href="#/about">About & disclaimer</a></p></div>`;
    main.addEventListener("change", e => {
      const t = e.target;
      if (t.dataset.eq) { const cur = settings.equipment || { ...eq }; cur[t.dataset.eq] = t.checked; settings.equipment = cur; }
      if (t.id === "df") settings.dropFactor = +t.value;
      if (t.id === "ethcal") store.set("ethCal", t.checked);
      if (t.id === "myward") { settings.ward = t.value; settings.filterMode = "ward"; if (listState) { listState.ward = t.value; listState.mode = "ward"; } render(); }
    });
    $("#reset").addEventListener("click", () => { store.del("equipment"); render(); });
    $("#seg-theme").addEventListener("click", e => { const b = e.target.closest("[data-theme]"); if (!b) return; theme.set(b.dataset.theme || null); document.querySelectorAll("#seg-theme button").forEach(x => x.classList.toggle("active", x === b)); });
  }

  /* ---------- About ---------- */
  function viewAbout(main) {
    main.innerHTML = `<h1>About</h1>
      <div class="card credit-card"><h4 style="margin-top:0">Author</h4><p style="margin:0">Developed and put together by <strong><span class="" data-no-i18n lang="en">Dr Bruktayt Engida</span></strong>.</p></div>
      <div class="callout warn">${ic("alert")}<div><strong>Draft content.</strong> Every drug entry in this build is marked “draft” and has not yet been verified by a pharmacist or physician. It must not be used for patient care until the review workflow in the README is completed.</div></div>
      <div class="card"><h3>Purpose</h3><p>A reference for trained health workers on how hospital-level medicines can be given safely when infusion pumps, syringe drivers, monitors or specific formulations are not available — using validated intermittent regimens, alternative routes, dilutions and gravity drip technique.</p>
        <h3>What it is not</h3><p>It does not replace national treatment guidelines, the prescriber's judgement, or a pharmacist. Doses are for adults unless stated; paediatric doses must be checked against the WHO Pocket Book, Nelson Textbook of Pediatrics or the national formulary.</p>
        <h3>Sources</h3><p>WHO (Pocket Book of Hospital Care for Children 2013; Managing Complications in Pregnancy and Childbirth 2017; Guidelines for malaria 2023), MSF Clinical Guidelines and Essential Drugs, and seven textbooks: Harrison's Principles of Internal Medicine 22nd ed. (2025), Williams Obstetrics 25th ed. (2018), Gabbe's Obstetrics 9th ed. (2025), Schwartz's Principles of Surgery 11th ed. (2019) Nelson Textbook of Pediatrics 22nd ed. (2024), Kaplan & Sadock's Synopsis of Psychiatry 12th ed. (2022) and DSM-5-TR Clinical Cases (2023), plus WHO mhGAP Intervention Guide 2.0 for mental health and the primary trials cited on each page.</p>
        <h3>Privacy</h3><p>No account, no network calls, no analytics. Settings and the last weight you entered are stored only in this browser.</p></div>`;
  }

  /* ---------- theme ---------- */
  const theme = {
    get() { return store.get("theme", null); },
    apply(v) {
      if (v === "light" || v === "dark") document.documentElement.setAttribute("data-theme", v); else document.documentElement.removeAttribute("data-theme");
      const l = $("#theme-label"); if (l) l.textContent = v === "light" ? "Light" : v === "dark" ? "Dark" : "Auto";
      const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = getComputedStyle(document.body).getPropertyValue("--surface").trim() || "#0f7c8c";
    },
    set(v) { if (v) store.set("theme", v); else store.del("theme"); theme.apply(v); }
  };
  const currentIsDark = () => document.documentElement.getAttribute("data-theme") === "dark" || (!document.documentElement.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);

  /* ---------- boot ---------- */
  function boot() {
    theme.apply(theme.get());
    $("#theme").addEventListener("click", () => theme.set(currentIsDark() ? "light" : "dark"));
    const b = $("#banner");
    try { if (sessionStorage.getItem("mb:banner") === "1") b.hidden = true; } catch {}
    $("#banner-close").addEventListener("click", () => { b.hidden = true; try { sessionStorage.setItem("mb:banner", "1"); } catch {} });
    const st = $("#status"), stt = $("#status-text");
    const upd = () => { stt.textContent = navigator.onLine ? "Online" : "Offline · cached"; st.classList.toggle("off", !navigator.onLine); };
    window.addEventListener("online", upd); window.addEventListener("offline", upd); upd();
    document.addEventListener("keydown", e => { if (e.key === "/" && !/input|select|textarea/i.test(document.activeElement?.tagName || "")) { const q = $("#q"); if (q) { e.preventDefault(); q.focus(); } else location.hash = "#/drugs"; } });
    CV = window.Community({ $, esc, ic, listHtml, sortedDrugs, catStyle, render, toast, stockPanel: (h) => RV && RV.stockPanel(h) });
    FX = window.Features({ $, esc, ic, toast, render, ROLES });
    EX = window.Extras({ $, esc, ic, toast, render, ROLES, FX, textbookHtml });
    RV = window.Review({ $, esc, ic, toast, render });
    FX.syncPatientChip(); FX.updateDueBadge(); FX.checkDue();
    $("#patient-chip")?.addEventListener("click", () => FX.openPatientDialog());
    const syncAccount = () => {
      const u = API.user, lbl = $("#acct-label"), nav = $("#nav-admin");
      if (API.state.serverless) {
        document.querySelectorAll('[data-nav="community"], [data-nav="account"], #acct').forEach(el => el.hidden = true);
        document.documentElement.dataset.noServer = "1";
      }
      if (lbl) lbl.textContent = u ? (u.name.replace(/^(dr|prof|sr|mr|mrs|ms)\.?\s+/i, "").split(" ")[0] || "Account") : "Sign in";
      if (nav) nav.hidden = !(u && u.role === "admin");
    };
    API.onChange(syncAccount);
    API.init().then(() => { syncAccount(); if (["account", "community", "admin", "review"].includes(parseHash().view)) render(); RV.load(); });
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      const hadController = !!navigator.serviceWorker.controller;
      let reloaded = false;
      // a new version took over: reload once so nobody reads an outdated dose
      navigator.serviceWorker.addEventListener("controllerchange", () => { if (hadController && !reloaded) { reloaded = true; location.reload(); } });
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
    render();
  }
  document.addEventListener("DOMContentLoaded", boot);
})();
