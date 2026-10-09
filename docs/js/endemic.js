/* endemic.js — disease pathways for the endemic diseases (malaria, HIV, kala-azar).

   A physician with a febrile patient does not think "which drug page?" but
   "this is vivax in a pregnant woman — what do I give?". So each disease has one
   page: pick the situation, type the weight, and the regimen appears with the
   tablet count for that weight, the drugs linked to their pages and the full
   case one tap away. The hub (#/endemic) lists the diseases and the other
   endemic conditions the app already covers.

   Data: window.ENDEMIC (js/endemic-data.js). Ethiopian national guidance comes
   first; where WHO differs the scenario says so. Pure logic is on
   window.Endemic.calc so the tests can reach it. DRAFT.

   Registered by app.js as EN. */
(function () {
  "use strict";

  /* --- pure logic ----------------------------------------------------- */
  /** The band for a weight: from is inclusive, to is exclusive (null = no upper limit). */
  function bandFor(table, w) {
    if (!table || !(w > 0)) return null;
    return (table.bands || []).find(b => w >= b.from && (b.to == null || w < b.to)) || null;
  }
  /** Why no band matched: below the lowest band, or a gap in the table. */
  function noBandReason(table, w) {
    const bands = table.bands || [];
    if (!bands.length || !(w > 0)) return "";
    const lo = Math.min(...bands.map(b => b.from));
    if (w < lo) return `Below ${lo} kg, the lowest weight in this table: senior decision.`;
    return "This weight is not covered by the table: check the source.";
  }
  /** A per-kg band value ("2 mg/kg = 0.2 mL/kg") worked out for this weight; "" if there is none. */
  function perKg(value, w) {
    if (!(w > 0)) return "";
    const parts = [...String(value).matchAll(/(\d+(?:\.\d+)?)\s*(mg|mL)\/kg\b/g)];
    if (!parts.length) return "";
    const r = (x) => +(x).toPrecision(3);
    return parts.map(m => `${r(+m[1] * w)} ${m[2]}`).join(" = ") + ` for ${r(w)} kg`;
  }
  const bandLabel = (b) => b.to == null ? `${b.from} kg and over` : b.from <= 1 ? `under ${b.to} kg` : `${b.from} to under ${b.to} kg`;
  const scenarioById = (d, id) => (d.scenarios || []).find(s => s.id === id) || null;
  const groupsOf = (d) => {
    const out = [];
    for (const s of d.scenarios || []) { let g = out.find(x => x.name === s.group); if (!g) out.push(g = { name: s.group, items: [] }); g.items.push(s); }
    return out;
  };

  window.Endemic = { calc: { bandFor, noBandReason, bandLabel, perKg, scenarioById, groupsOf } };

  window.EndemicView = function (ctx) {
    const { $, esc, ic, FX, shareButton, textbookHtml } = ctx;
    const ALL = () => window.ENDEMIC || [];
    const drugById = (id) => (window.DRUG_DB || []).find(d => d.id === id);
    const caseById = (id) => (window.CONDITIONS || []).find(c => c.id === id);
    const fmtW = (w) => (Math.round(w * 10) / 10).toString();

    /* other endemic conditions the app covers, shown on the hub */
    const ALSO = ["tuberculosis", "meningitis", "severe-dehydration", "malnutrition", "measles", "tetanus", "snakebite", "trachoma", "xerophthalmia", "ophthalmia-neonatorum", "puerperal-sepsis", "neonatal-sepsis"];

    function hub(main) {
      const also = ALSO.map(caseById).filter(Boolean);
      main.innerHTML = `
        <div class="resus-head"><div><h1 style="margin:0">${ic("globe")} Endemic diseases</h1>
          <p class="text-2" style="margin:.2rem 0 0">Pick the disease, then the situation in front of you. Each pathway gives the regimen for the patient's weight, following the Ethiopian national guideline first and showing where WHO differs.</p></div></div>
        <div class="tools-grid">
          ${ALL().map(d => `<a class="card tool endemic-card" href="#/disease/${esc(d.id)}"><span class="tool-ic">${ic(d.icon || "shield")}</span>
            <div><h3 style="margin:0 0 .2rem">${esc(d.name)}</h3>
              <p class="small text-2" style="margin:0">${esc(d.short || "")}</p>
              <p class="small" style="margin:.35rem 0 0"><span class="chip primary">${d.scenarios.length} situations</span> <span class="chip">${(d.drugs || []).length} drugs</span> <span class="chip">${(d.cases || []).length} cases</span></p></div></a>`).join("")}
        </div>
        ${also.length ? `<h2>Other endemic conditions</h2>
          <div class="also-grid">${also.map(c => `<a class="card also-link" href="#/case/${esc(c.id)}"><b>${esc(c.name)}</b><span class="small text-2">${esc((c.summary || "").split(". ")[0])}.</span></a>`).join("")}</div>` : ""}
        <div class="callout info">${ic("info")}<div><strong>Draft.</strong> Regimens follow the national guidelines named on each page. Check the current national guideline and your facility's stock before treating.</div></div>`;
    }

    function doseLine(t, w) {
      if (!t) return "";
      if (!(w > 0)) return `<span class="small muted">Enter a weight to see the dose.</span>`;
      const b = bandFor(t, w);
      return b
        ? `<div class="en-dose"><b>${esc(b.value)}</b> <span>${esc(t.per || "")}</span>${perKg(b.value, w) ? `<span class="en-perkg">= ${esc(perKg(b.value, w))}</span>` : ""}<span class="small text-2">${esc(fmtW(w))} kg · band ${esc(bandLabel(b))}</span></div>`
        : `<div class="callout warn">${ic("alert")}<div>${esc(noBandReason(t, w))}</div></div>`;
    }

    function bandTable(t, w) {
      const cur = bandFor(t, w);
      return `<details class="en-bands"><summary class="small">${ic("grid")}Full table: ${esc(t.label)}</summary>
        <div class="tablewrap"><table class="plain"><tr><th>Weight</th><th>${esc(t.per || "Dose")}</th></tr>
          ${t.bands.map(b => `<tr class="${b === cur ? "en-cur" : ""}"><td>${esc(bandLabel(b))}</td><td><b>${esc(b.value)}</b></td></tr>`).join("")}
        </table></div>
        ${t.schedule ? `<p class="small" style="margin:.4rem 0 0"><b>When:</b> ${esc(t.schedule)}</p>` : ""}
        ${t.note ? `<p class="small muted" style="margin:.25rem 0 0">${esc(t.note)}</p>` : ""}
        ${t.ref ? `<p class="small muted" style="margin:.25rem 0 0">Source: ${esc(t.ref.ref)}</p>` : ""}</details>`;
    }

    function scenarioHtml(d, s, w) {
      const tables = Object.fromEntries((d.dosing || []).map(t => [t.id, t]));
      const ul = (arr, cls) => arr && arr.length ? `<ul class="small ${cls || ""}">${arr.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "";
      const c = s.caseId ? caseById(s.caseId) : null;
      return `<div class="card en-scen" id="en-scen">
        <div class="en-scen-head"><div><span class="small text-2">${esc(s.group)}</span><h2 style="margin:.1rem 0 .2rem">${esc(s.title)}</h2>
          <p class="small" style="margin:0">${ic("user")} ${esc(s.who)}</p></div>
          ${c ? `<a class="btn ghost sm" href="#/case/${esc(c.id)}">${ic("book")}Full case</a>` : ""}</div>
        <h3 class="en-h">${ic("pill")} Give</h3>
        <ol class="en-give">${(s.give || []).map(g => {
          const dr = g.drug ? drugById(g.drug) : null, t = g.dosing ? tables[g.dosing] : null;
          return `<li><div class="en-give-name">${dr ? `<a href="#/drug/${esc(dr.id)}">${esc(g.label || dr.name)}</a>` : `<b>${esc(g.label || "")}</b>`}</div>
            <div class="small">${esc(g.dose || "")}</div>
            ${t ? doseLine(t, w) + bandTable(t, w) : ""}</li>`; }).join("")}</ol>
        ${(s.avoid || []).length ? `<h3 class="en-h">${ic("x")} Do not</h3>${s.avoid.map(a => `<div class="callout danger">${ic("alert")}<div>${esc(a)}</div></div>`).join("")}` : ""}
        ${(s.also || []).length ? `<h3 class="en-h">${ic("check")} Also</h3>${ul(s.also)}` : ""}
        ${(s.followup || []).length ? `<h3 class="en-h">${ic("clock")} Follow-up</h3>${ul(s.followup)}` : ""}
        ${(s.refs || []).length ? `<details class="en-src"><summary class="small">${ic("book")}Where this comes from (${s.refs.length})</summary>
          <ul class="small">${s.refs.map(r => `<li>${esc(r.text)} <span class="muted">— ${esc(r.ref)}</span></li>`).join("")}</ul></details>` : ""}
      </div>`;
    }

    function one(main, d, route) {
      const sid = route.q.s && scenarioById(d, route.q.s) ? route.q.s : null;
      let w = parseFloat(route.q.w) || FX.patient.weight || null;
      const groups = groupsOf(d);
      main.innerHTML = `
        <div class="resus-head"><div>
          <a class="linkbtn" href="#/endemic">${ic("left")}Endemic diseases</a>
          <h1 style="margin:.2rem 0 0">${ic(d.icon || "shield")} ${esc(d.name)}</h1>
          <p class="text-2 en-summary" style="margin:.3rem 0 0;max-width:70ch">${esc(d.summary || "")}</p>
          <button type="button" class="linkbtn en-more" id="en-more">More</button>
          <div class="row tags" style="margin-top:.4rem">${(d.basis || []).map(b => `<span class="chip primary">${ic("book")}${esc(b)}</span>`).join("")}
            <span class="chip warn">${ic("alert")}Draft — not clinically verified</span></div></div>
          <div class="row"><span id="en-share"></span><button type="button" class="btn ghost sm" id="en-print">${ic("print")}Print</button></div></div>

        <div class="card en-weight"><label for="en-w"><b>Weight</b> <span class="muted">(kg)</span></label>
          <div class="row" style="align-items:center;gap:.5rem"><input id="en-w" type="number" inputmode="decimal" min="1" max="200" step="0.1" placeholder="kg" value="${w ? esc(fmtW(w)) : ""}" style="max-width:8rem"><span class="small text-2">kg — tablet counts below update for this weight${FX.patient.weight ? "" : " (also sets the patient weight for other pages)"}.</span></div></div>

        ${(d.firstLook || []).length ? `<div class="callout danger">${ic("alert")}<div><strong>First, look for danger.</strong><ul class="small" style="margin:.3rem 0 0">${d.firstLook.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div>` : ""}

        <h2 style="margin-bottom:.4rem">What is the situation?</h2>
        <div class="en-picker">${groups.map(g => `<div class="en-group"><div class="en-group-name">${esc(g.name)}</div>
          <div class="en-chips">${g.items.map(s => `<a class="en-chip ${s.id === sid ? "active" : ""}" href="#/disease/${esc(d.id)}?s=${esc(s.id)}${w ? "&w=" + esc(fmtW(w)) : ""}" data-s="${esc(s.id)}">${esc(s.title)}</a>`).join("")}</div></div>`).join("")}</div>

        <div id="en-body">${sid ? scenarioHtml(d, scenarioById(d, sid), w) : `<p class="empty small">Tap the situation above to see what to give.</p>`}</div>

        ${(d.drugs || []).length ? `<h2>Drugs in this pathway</h2><div class="row tags">${d.drugs.map(drugById).filter(Boolean).map(x => `<a class="chip" href="#/drug/${esc(x.id)}">${ic("pill")}${esc(x.name)}</a>`).join("")}</div>` : ""}
        ${(d.cases || []).length ? `<h2>Full cases</h2><div class="row tags">${d.cases.map(caseById).filter(Boolean).map(x => `<a class="chip" href="#/case/${esc(x.id)}">${ic("clipboard")}${esc(x.name)}</a>`).join("")}</div>` : ""}
        <div class="card"><h3>${ic("book")} Sources</h3><ul class="small">${(d.sources || []).map(s => `<li>${esc(s.name)}</li>`).join("")}</ul></div>`;

      const share = () => { const s = sid && scenarioById(d, sid); return `MedBridge — ${d.name}${s ? `: ${s.title}\n${s.who}\nGive: ${(s.give || []).map(g => `${g.label}${g.dose ? " — " + g.dose : ""}`).join("; ")}` : ""}${w ? `\nWeight ${fmtW(w)} kg` : ""}\nDraft reference — confirm with the national guideline.`; };
      $("#en-share").innerHTML = shareButton(share(), "Share");
      $("#en-print").onclick = () => window.print();
      $("#en-more").onclick = (e) => { const p = main.querySelector(".en-summary"); const open = p.classList.toggle("open"); e.target.textContent = open ? "Less" : "More"; };
      const input = $("#en-w");
      input.oninput = () => {
        const v = parseFloat(input.value); w = v > 0 && v < 250 ? v : null;
        if (w) { FX.patient.weight = w; FX.syncPatientChip?.(); }
        if (sid) $("#en-body").innerHTML = scenarioHtml(d, scenarioById(d, sid), w);
        main.querySelectorAll(".en-chip").forEach(a => { a.href = `#/disease/${d.id}?s=${a.dataset.s}${w ? "&w=" + fmtW(w) : ""}`; });
      };
      if (sid && route.q.s) setTimeout(() => $("#en-scen")?.scrollIntoView({ block: "start", behavior: "smooth" }), 30);
    }

    function view(main, route) {
      if (route.view === "endemic" || !route.id) return hub(main);
      const d = ALL().find(x => x.id === route.id);
      if (!d) { main.innerHTML = `<p class="empty">No pathway with that name. <a href="#/endemic">See the endemic diseases</a>.</p>`; return; }
      one(main, d, route);
    }

    /** pathway links for a case or drug page */
    function linksFor(kind, id) {
      return ALL().filter(d => ((kind === "case" ? d.cases : d.drugs) || []).includes(id))
        .map(d => `<a class="btn ghost sm" href="#/disease/${esc(d.id)}">${ic(d.icon || "shield")}${esc(d.name)} pathway</a>`).join("");
    }
    return { view, linksFor };
  };
})();
