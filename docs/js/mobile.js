/* mobile.js — getting around the app on a phone, one-handed, on a busy ward.

   On a 375 px screen the app was hard to move around: search lived only on the
   home page, long pages had no way to jump, and a drug or case had to be found
   by scrolling. This module adds, on every page:
   - the finder: one search box (top bar, or "/") over drugs, cases, disease
     situations and tools, with recent and saved items when it is empty;
   - a sticky "jump to" bar on long pages that mark sections with data-sec;
   - a back-to-top button once the page is scrolled far;
   - a text-size setting (normal / large / extra large) for small screens and
     tired eyes.
   Pure ranking logic is on window.MobileNav.calc so the tests can reach it.

   Registered by app.js as MB. */
(function () {
  "use strict";

  /* --- ranking ---------------------------------------------------------
     Everything is matched against lower-case text. A hit at the start of the
     name beats a hit at the start of a word, which beats a hit anywhere, which
     beats a hit only in the other searchable text (aka, class, tags). */
  const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[–—]/g, "-");
  function score(item, q) {
    const name = norm(item.name), more = norm(item.more), words = q.split(/\s+/).filter(Boolean);
    if (!words.length) return 0;
    let total = 0;
    for (const w of words) {
      let s = 0;
      if (name.startsWith(w)) s = 100;
      else if (new RegExp(`(^|[^a-z0-9])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(name)) s = 70;
      else if (name.includes(w)) s = 45;
      else if (new RegExp(`(^|[^a-z0-9])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(more)) s = 30;
      else if (more.includes(w)) s = 15;
      if (!s) return 0;           // every word must match somewhere
      total += s;
    }
    return total + (item.boost || 0) - name.length / 100;   // shorter names win ties
  }
  /** Ranked results, grouped by kind, at most `per` per group. A typo-tolerant
      matcher (the app's fuzzyMatch) is the fallback when nothing matches exactly. */
  function search(index, query, { per = 6, fuzzy = null } = {}) {
    const q = norm(query).trim();
    if (!q) return [];
    let hits = index.map(it => ({ it, s: score(it, q) })).filter(x => x.s > 0);
    if (!hits.length && fuzzy) hits = index.filter(it => fuzzy(norm(it.name + " " + it.more), q))
      .map(it => ({ it, s: (fuzzy(norm(it.name), q) ? 2 : 1) + (it.boost || 0) / 10 }));   // a near-miss on the name beats one in the small print
    hits.sort((a, b) => b.s - a.s);
    /* groups in the order of their best hit, so the closest match is always on top */
    const groups = new Map(), best = new Map();
    for (const { it, s } of hits) {
      const g = groups.get(it.kind) || []; if (g.length < per) g.push(it); groups.set(it.kind, g);
      if (!best.has(it.kind)) best.set(it.kind, s);
    }
    const ORDER = ["Situation", "Case", "Drug", "Tool"];
    return [...groups.entries()].sort((a, b) => (best.get(b[0]) - best.get(a[0])) || (ORDER.indexOf(a[0]) - ORDER.indexOf(b[0]))).map(([kind, items]) => ({ kind, items }));
  }
  /** One searchable list of everything a health worker might look for. */
  function buildIndex({ drugs = [], cases = [], endemic = [], tools = [] }) {
    const out = [];
    for (const d of drugs) out.push({ kind: "Drug", name: d.name, sub: d.cls, href: `#/drug/${d.id}`, more: [...(d.aka || []), ...(d.tags || []), d.cls].join(" ") });
    for (const c of cases) out.push({ kind: "Case", name: c.name, sub: (c.summary || "").split(". ")[0], href: `#/case/${c.id}`, more: (c.aka || []).join(" "), boost: 3 });
    for (const d of endemic) for (const s of d.scenarios || [])
      out.push({ kind: "Situation", name: `${d.name}: ${s.title}`, sub: s.who, href: `#/disease/${d.id}?s=${s.id}`, more: `${d.name} ${s.group} ${s.who}`, boost: 2 });
    for (const t of tools) out.push({ kind: "Tool", name: t.title, sub: t.desc.replace(/<[^>]+>/g, ""), href: t.href, more: `${t.section} ${t.desc}` });
    return out;
  }

  window.MobileNav = { calc: { norm, score, search, buildIndex } };

  window.MobileNav.create = function (ctx) {
    const { $, esc, ic, FX } = ctx;
    const store = { get(k, d) { try { const v = localStorage.getItem("mb:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
                    set(k, v) { try { localStorage.setItem("mb:" + k, JSON.stringify(v)); } catch {} } };

    /* ---------- text size ---------- */
    const SIZES = { normal: "Normal", large: "Large", xlarge: "Extra large" };
    function applyTextSize(v = store.get("textsize", "normal")) {
      document.documentElement.dataset.textsize = SIZES[v] ? v : "normal";
    }
    function setTextSize(v) { store.set("textsize", v); applyTextSize(v); }
    const textSize = () => store.get("textsize", "normal");

    /* ---------- the finder ---------- */
    let index = null;
    const getIndex = () => index ||= buildIndex({
      drugs: window.DRUG_DB, cases: window.CONDITIONS, endemic: window.ENDEMIC,
      tools: (FX.toolList ? FX.toolList() : []).map(([section, href, , title, desc]) => ({ section, href, title, desc }))
    });
    const KIND_IC = { Situation: "globe", Case: "clipboard", Drug: "pill", Tool: "tool" };
    let sheet = null, lastFocus = null;

    function rowHtml(it) {
      return `<a class="qf-row" href="${esc(it.href)}"><span class="qf-ic">${ic(KIND_IC[it.kind] || "right")}</span>
        <span class="qf-text"><b>${esc(it.name)}</b>${it.sub ? `<span>${esc(it.sub)}</span>` : ""}</span>${ic("right")}</a>`;
    }
    function emptyHtml() {
      const keys = [...(FX.favs?.list() || []), ...(FX.recent?.list() || []).filter(k => !(FX.favs?.list() || []).includes(k))];
      const items = keys.map(k => FX.keyInfo?.(k)).filter(Boolean).slice(0, 10);
      const quick = [["#/resus", "zap", "Emergency card"], ["#/endemic", "globe", "Endemic diseases"], ["#/calc", "calc", "Calculators"], ["#/drip", "drop", "Drip guide"], ["#/newborn", "baby", "Newborn doses"], ["#/interactions", "shield", "Interactions"]];
      return `<div class="qf-quick">${quick.map(([h, i, t]) => `<a href="${h}">${ic(i)}<span>${t}</span></a>`).join("")}</div>
        ${items.length ? `<div class="qf-group">${ic("clock")} Saved and recent</div>${items.map(x => `<a class="qf-row" href="${esc(x.href)}"><span class="qf-ic">${ic(x.kind === "Case" ? "clipboard" : "pill")}</span><span class="qf-text"><b>${esc(x.name)}</b><span>${esc(x.kind)}</span></span>${ic("right")}</a>`).join("")}` : ""}
        <p class="small muted qf-hint">Type a drug, a brand, a disease or a situation — for example “vivax pregnant”, “mag sulf”, “PEP”.</p>`;
    }
    function draw(q) {
      const res = search(getIndex(), q, { per: 6, fuzzy: FX.fuzzyMatch });
      const body = sheet.querySelector(".qf-body");
      body.innerHTML = !q.trim() ? emptyHtml()
        : res.length ? res.map(g => `<div class="qf-group">${ic(KIND_IC[g.kind])} ${esc(g.kind === "Situation" ? "Disease situations" : g.kind + "s")}</div>${g.items.map(rowHtml).join("")}`).join("")
        : `<p class="empty">Nothing found for “${esc(q)}”. Try fewer letters, or another name for it.</p>`;
      window.I18N?.afterRender?.("find");
    }
    function openFinder(prefill = "") {
      if (!sheet) {
        sheet = document.createElement("div");
        sheet.className = "qf"; sheet.setAttribute("role", "dialog"); sheet.setAttribute("aria-modal", "true"); sheet.setAttribute("aria-label", "Find");
        sheet.innerHTML = `<div class="qf-panel">
          <div class="qf-bar">${ic("search")}<input type="search" id="qf-q" placeholder="Find a drug, case, disease or tool…" autocomplete="off" enterkeyhint="go" aria-label="Find">
            <button type="button" class="qf-close" aria-label="Close">${ic("x")}</button></div>
          <div class="qf-body"></div>
          <div class="qf-foot"><span class="small text-2">Text size</span><div class="seg qf-size" role="group" aria-label="Text size">${Object.entries(SIZES).map(([k, v]) => `<button type="button" data-size="${k}">${k === "normal" ? "A" : k === "large" ? "A+" : "A++"}<span class="sr-only"> ${v}</span></button>`).join("")}</div></div></div>`;
        document.body.appendChild(sheet);
        const input = sheet.querySelector("#qf-q");
        input.addEventListener("input", () => draw(input.value));
        input.addEventListener("keydown", e => { if (e.key === "Enter") { const a = sheet.querySelector(".qf-row"); if (a) { e.preventDefault(); go(a.getAttribute("href")); } } });
        sheet.addEventListener("click", e => {
          if (e.target === sheet || e.target.closest(".qf-close")) return closeFinder();
          const b = e.target.closest("[data-size]"); if (b) { setTextSize(b.dataset.size); markSize(); return; }
          const a = e.target.closest("a[href^='#']"); if (a) { e.preventDefault(); go(a.getAttribute("href")); }
        });
      }
      lastFocus = document.activeElement;
      sheet.hidden = false; document.documentElement.classList.add("qf-open");
      const input = sheet.querySelector("#qf-q"); input.value = prefill; draw(prefill); markSize();
      setTimeout(() => input.focus(), 30);
      history.pushState({ qf: 1 }, "");
    }
    /* leave the finder for a page: the finder's own history entry is REPLACED by
       the page, so Back returns to where the finder was opened */
    function go(href) {
      const hadEntry = !!history.state?.qf;
      sheet.hidden = true; document.documentElement.classList.remove("qf-open");
      if (hadEntry) location.replace(href); else location.hash = href;
    }
    function markSize() { sheet?.querySelectorAll("[data-size]").forEach(b => b.classList.toggle("active", b.dataset.size === textSize())); }
    function closeFinder(fromPop) {
      if (!sheet || sheet.hidden) return;
      sheet.hidden = true; document.documentElement.classList.remove("qf-open");
      if (!fromPop && history.state?.qf) history.back();
      lastFocus?.focus?.();
    }
    window.addEventListener("popstate", () => closeFinder(true));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") return closeFinder();
      const tag = (e.target.tagName || "").toLowerCase();
      if (e.key === "/" && !/input|textarea|select/.test(tag) && !e.target.isContentEditable && location.hash.replace(/^#\/?/, "").split(/[/?]/)[0] !== "drugs" && location.hash !== "") { e.preventDefault(); openFinder(); }
    });
    document.addEventListener("click", e => { const b = e.target.closest("[data-find]"); if (b) { e.preventDefault(); openFinder(b.dataset.find || ""); } });

    /* ---------- jump bar and back-to-top ---------- */
    const toTop = document.createElement("button");
    toTop.type = "button"; toTop.className = "to-top"; toTop.hidden = true; toTop.setAttribute("aria-label", "Back to top");
    toTop.innerHTML = ic("left");
    toTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.appendChild(toTop);
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => { ticking = false; toTop.hidden = window.scrollY < window.innerHeight * 1.5; markJump(); });
    }, { passive: true });

    let secs = [];
    function markJump() {
      const bar = document.querySelector(".jumpbar"); if (!bar || !secs.length) return;
      const y = window.scrollY + 140; let cur = secs[0];
      for (const s of secs) if (s.el.getBoundingClientRect().top + window.scrollY <= y) cur = s;
      bar.querySelectorAll("a").forEach(a => a.classList.toggle("active", a.dataset.to === cur.id));
    }
    /** After every page render: build the jump bar from [data-sec] headings. */
    function afterRender(main) {
      secs = [...main.querySelectorAll("[data-sec]")].filter(el => el.offsetParent !== null || el.tagName === "DETAILS")
        .map((el, i) => { if (!el.id) el.id = "sec-" + i; return { el, id: el.id, label: el.dataset.sec }; });
      main.querySelector(".jumpbar")?.remove();
      if (secs.length >= 3) {
        const bar = document.createElement("nav");
        bar.className = "jumpbar"; bar.setAttribute("aria-label", "Jump to section");
        bar.innerHTML = secs.map(s => `<a href="#" data-to="${s.id}">${esc(s.label)}</a>`).join("");
        bar.onclick = (e) => { const a = e.target.closest("[data-to]"); if (!a) return; e.preventDefault();
          const el = document.getElementById(a.dataset.to); if (el?.tagName === "DETAILS") el.open = true;
          el?.scrollIntoView({ behavior: "smooth", block: "start" }); };
        let anchor = secs[0].el;                       // sit at page level, never inside a grid
        while (anchor.parentElement && anchor.parentElement !== main) anchor = anchor.parentElement;
        anchor.before(bar);
      }
      toTop.hidden = true;
    }

    applyTextSize();
    return { openFinder, closeFinder, afterRender, setTextSize, textSize, SIZES };
  };
})();
