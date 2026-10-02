/* theatre.js — theatre packs: what to have ready for an operation, and what to
   do when it is not there.

   The lists are from a real Ethiopian teaching hospital's OR materials file.
   The "if it is missing" column is this app's own work and is the reason the
   page exists: a stock list you cannot act on is just a list.

   Registered by app.js as TH. DRAFT until reviewed. */
(function () {
  "use strict";
  window.TheatreView = function (ctx) {
    const { $, esc, ic, render, FX, shareButton, textbookHtml } = ctx;
    const PACKS = () => window.THEATRE_PACKS || [];
    const drugById = (id) => (window.DRUG_DB || []).find(d => d.id === id);
    const URG = { emergency: ["bad", "Emergency"], elective: ["", "Elective"], both: ["warn", "Elective or emergency"] };

    function list(main) {
      main.innerHTML = `
        <div class="resus-head"><div><h1 style="margin:0">${ic("tool")} Theatre packs</h1>
          <p class="text-2" style="margin:.2rem 0 0">What to have ready before you start, and what to do when something on the list is not there.</p></div></div>
        <div class="tools-grid">
          ${PACKS().map(p => { const [cls, label] = URG[p.urgency] || ["", p.urgency];
            const items = p.sections.reduce((n, s) => n + s.items.length, 0);
            return `<a class="card tool" href="#/theatre/${esc(p.id)}"><span class="tool-ic">${ic("tool")}</span>
              <div><h3 style="margin:0 0 .2rem">${esc(p.name)}</h3>
                <p class="small text-2" style="margin:0">${items} items · ${p.missing.length} substitutions · <span class="chip ${cls}">${esc(label)}</span></p></div></a>`; }).join("")}
        </div>
        <p class="small muted">Lists from the OR materials file of Asella Referral and Teaching Hospital (2025) — institutional practice, not a clinical guideline. Substitutions and pre-incision checks are this app's own. Draft: confirm against your own theatre's protocol.</p>`;
    }

    function one(main, pack) {
      const share = `Theatre pack — ${pack.name} (${pack.anaesthesia})\n` +
        pack.sections.map(s => `${s.title}: ${s.items.map(i => i.item + (i.qty ? ` ${i.qty}` : "")).join(", ")}`).join("\n") +
        `\nDraft reference — confirm against your theatre's protocol.`;
      const [cls, label] = URG[pack.urgency] || ["", pack.urgency];
      main.innerHTML = `
        <div class="resus-head"><div>
          <a class="linkbtn" href="#/theatre">${ic("left")}All packs</a>
          <h1 style="margin:.2rem 0 0">${esc(pack.name)}</h1>
          <div class="row tags" style="margin-top:.4rem"><span class="chip ${cls}">${esc(label)}</span>
            <span class="chip">${ic("drop")}${esc(pack.anaesthesia)}</span>
            <span class="chip warn">${ic("alert")}Draft — not clinically verified</span></div>
          ${(pack.aka || []).length ? `<div class="cls">${(pack.aka || []).map(esc).join(" · ")}</div>` : ""}</div>
          <div class="row">${shareButton(share, "Share")}<button type="button" class="btn ghost sm" id="th-print">${ic("print")}Print</button></div></div>

        ${(pack.caseIds || []).length ? `<div class="row case-tools">${pack.caseIds.map(id => {
          const c = (window.CONDITIONS || []).find(x => x.id === id);
          return c ? `<a class="btn ghost sm" href="#/case/${esc(id)}">${ic("book")}${esc(c.name)}</a>` : ""; }).join("")}</div>` : ""}

        ${pack.sections.map(s => `<div class="card"><h3 style="margin-top:0">${ic("check")} ${esc(s.title)}</h3>
          <div class="tablewrap"><table class="plain"><tbody>
            ${s.items.map(i => `<tr>
              <td>${i.drugId && drugById(i.drugId) ? `<a href="#/drug/${esc(i.drugId)}">${esc(i.item)}</a>` : esc(i.item)}</td>
              <td style="white-space:nowrap">${esc(i.qty || "")}</td>
              <td class="small muted">${esc(i.note || "")}</td></tr>`).join("")}
          </tbody></table></div></div>`).join("")}

        <div class="card"><h3 style="margin-top:0">${ic("alert")} If it is missing</h3>
          <p class="small text-2" style="margin:-.3rem 0 .7rem">Not from the hospital's list — this is the part that decides whether you can safely go ahead.</p>
          ${pack.missing.map(m => { const none = /^none\.?$/i.test((m.substitute || "").trim());
            return `<div class="callout ${none ? "danger" : "info"}">${ic(none ? "alert" : "swap")}<div>
              <strong>${esc(m.item)}</strong> — ${none ? "<b>no safe substitute.</b>" : esc(m.substitute)}
              ${m.note ? `<p class="small" style="margin:.25rem 0 0">${esc(m.note)}</p>` : ""}</div></div>`; }).join("")}
        </div>

        <div class="card"><h3 style="margin-top:0">${ic("clipboard")} Before the incision</h3>
          <ul class="small">${pack.checks.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>

        ${(pack.textbook || []).length && textbookHtml ? `<h2>Where this list comes from</h2>${textbookHtml(pack.textbook, "theatre pack")}` : ""}
        ${(pack.sources || []).length ? `<div class="card"><h3>${ic("book")} Sources</h3><ul class="small">${pack.sources.map(s => `<li>${esc(s.name)}</li>`).join("")}</ul></div>` : ""}`;
      const pr = $("#th-print"); if (pr) pr.onclick = () => window.print();
    }

    function view(main, route) {
      const pack = route.id ? PACKS().find(p => p.id === route.id) : null;
      if (route.id && !pack) { main.innerHTML = `<p class="empty">No theatre pack with that name. <a href="#/theatre">See all packs</a>.</p>`; return; }
      pack ? one(main, pack) : list(main);
    }
    return { view };
  };
})();
