/* procedures.js — bedside surgical procedures.

   Chest drain, catheters, tracheostomy, stomas: the procedures a health officer
   does alone at night in a district hospital. Each guide carries the technique,
   the sizes, the aftercare and the complications — and, the part that matters
   here, what to do when a piece of the kit is missing and where there is no
   safe substitute at all.

   Provenance: the scope came from a student exam-preparation file, which is NOT
   an authority and is not cited anywhere. Equipment lists are tied to the Asella
   OR materials file where it supports them; the technique is written as standard
   practice and carries no page citations, because none could be verified.
   Everything here is DRAFT and unreviewed.

   Registered by app.js as PR. */
(function () {
  "use strict";
  window.ProceduresView = function (ctx) {
    const { $, esc, ic, FX, shareButton, textbookHtml } = ctx;
    const ALL = () => window.PROCEDURES || [];
    const drugById = (id) => (window.DRUG_DB || []).find(d => d.id === id);
    const URG = { emergency: ["bad", "Emergency"], elective: ["", "Elective"], both: ["warn", "Elective or emergency"] };

    function list(main) {
      main.innerHTML = `
        <div class="resus-head"><div><h1 style="margin:0">${ic("tool")} Bedside procedures</h1>
          <p class="text-2" style="margin:.2rem 0 0">Technique, sizes, aftercare and complications — and what to do when the kit is incomplete.</p></div></div>
        <div class="tools-grid">
          ${ALL().map(p => { const [cls, label] = URG[p.urgency] || ["", p.urgency];
            return `<a class="card tool" href="#/procedure/${esc(p.id)}"><span class="tool-ic">${ic("tool")}</span>
              <div><h3 style="margin:0 0 .2rem">${esc(p.name)}</h3>
                <p class="small text-2" style="margin:0">${esc((p.summary || "").split(". ")[0])}.</p>
                <p class="small" style="margin:.3rem 0 0"><span class="chip ${cls}">${esc(label)}</span> <span class="chip">${p.steps.length} steps</span> <span class="chip">${p.missing.length} substitutions</span></p></div></a>`; }).join("")}
        </div>
        <div class="callout info">${ic("info")}<div><strong>These guides carry no page citations.</strong> The technique is written as standard practice and has not been verified against a named textbook — only the equipment lists are tied to a source. Treat every step as draft and confirm it against your own surgical department before you rely on it.</div></div>`;
    }

    function one(main, p) {
      const [cls, label] = URG[p.urgency] || ["", p.urgency];
      const share = `${p.name}\n${p.summary}\n\nSteps:\n${p.steps.map(s => `${s.n}. ${s.title}`).join("\n")}\n\nDraft reference — confirm against your surgical department.`;
      const sec = (title, icon, body) => body ? `<div class="card"><h3 style="margin-top:0">${ic(icon)} ${title}</h3>${body}</div>` : "";
      const ul = (arr) => arr && arr.length ? `<ul class="small">${arr.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : "";

      main.innerHTML = `
        <div class="resus-head"><div>
          <a class="linkbtn" href="#/procedures">${ic("left")}All procedures</a>
          <h1 style="margin:.2rem 0 0">${esc(p.name)}</h1>
          ${(p.aka || []).length ? `<div class="cls">${(p.aka || []).map(esc).join(" · ")}</div>` : ""}
          <p class="text-2" style="margin:.3rem 0 0">${esc(p.summary)}</p>
          <div class="row tags" style="margin-top:.4rem"><span class="chip ${cls}">${esc(label)}</span>
            ${p.anaesthesia ? `<span class="chip">${ic("drop")}${esc(p.anaesthesia)}</span>` : ""}
            <span class="chip warn">${ic("alert")}Draft — not clinically verified</span></div></div>
          <div class="row">${shareButton(share, "Share")}<button type="button" class="btn ghost sm" id="pr-print">${ic("print")}Print</button></div></div>

        ${(p.caseIds || []).length || (p.packIds || []).length ? `<div class="row case-tools">
          ${(p.caseIds || []).map(id => { const c = (window.CONDITIONS || []).find(x => x.id === id);
            return c ? `<a class="btn ghost sm" href="#/case/${esc(id)}">${ic("book")}${esc(c.name)}</a>` : ""; }).join("")}
          ${(p.packIds || []).map(id => { const t = (window.THEATRE_PACKS || []).find(x => x.id === id);
            return t ? `<a class="btn ghost sm" href="#/theatre/${esc(id)}">${ic("tool")}Theatre pack</a>` : ""; }).join("")}
        </div>` : ""}

        ${(p.redflags || []).length ? `<div class="card"><h3 style="margin-top:0">${ic("alert")} Stop and think</h3>
          ${p.redflags.map(r => `<div class="callout danger">${ic("alert")}<div>${esc(r)}</div></div>`).join("")}</div>` : ""}

        ${sec("Indications", "check", ul(p.indications))}
        ${(p.contraindications || []).length ? `<div class="card"><h3 style="margin-top:0">${ic("x")} Contraindications</h3>
          <div class="tablewrap"><table class="plain"><tbody>
            ${p.contraindications.map(c => `<tr><td><b>${esc(c.item)}</b></td>
              <td style="white-space:nowrap"><span class="chip ${c.absolute ? "bad" : "warn"}">${c.absolute ? "Absolute" : "Relative"}</span></td>
              <td class="small muted">${esc(c.note || "")}</td></tr>`).join("")}
          </tbody></table></div></div>` : ""}

        ${(p.sizes || []).length ? `<div class="card"><h3 style="margin-top:0">${ic("calc")} Sizes</h3>
          <div class="tablewrap"><table class="plain"><tr><th>Who</th><th>Size</th><th></th></tr>
            ${p.sizes.map(s => `<tr><td><b>${esc(s.who)}</b></td><td>${esc(s.size)}</td><td class="small muted">${esc(s.note || "")}</td></tr>`).join("")}
          </table></div></div>` : ""}

        ${(p.equipment || []).length ? `<div class="card"><h3 style="margin-top:0">${ic("box")} Equipment</h3>
          <div class="tablewrap"><table class="plain"><tbody>
            ${p.equipment.map(e => `<tr>
              <td>${e.drugId && drugById(e.drugId) ? `<a href="#/drug/${esc(e.drugId)}">${esc(e.item)}</a>` : esc(e.item)}</td>
              <td style="white-space:nowrap">${esc(e.qty || "")}</td>
              <td class="small muted">${esc(e.note || "")}</td></tr>`).join("")}
          </tbody></table></div></div>` : ""}

        ${p.landmarks ? `<div class="callout info">${ic("info")}<div><strong>Landmarks.</strong> ${esc(p.landmarks)}</div></div>` : ""}

        <div class="card"><h3 style="margin-top:0">${ic("play")} How to do it</h3>
          <ol class="proc-steps">${p.steps.map(s => `<li><b>${esc(s.title)}</b><p class="small" style="margin:.15rem 0 0">${esc(s.text)}</p></li>`).join("")}</ol></div>

        <div class="card"><h3 style="margin-top:0">${ic("alert")} If it is missing</h3>
          <p class="small text-2" style="margin:-.3rem 0 .7rem">What to do when the kit is incomplete — and where there is no safe substitute at all.</p>
          ${p.missing.map(m => { const none = /^(none|no safe)/i.test((m.substitute || "").trim());
            return `<div class="callout ${none ? "danger" : "info"}">${ic(none ? "alert" : "swap")}<div>
              <strong>${esc(m.item)}</strong> — ${none ? `<b>${esc(m.substitute)}</b>` : esc(m.substitute)}
              ${m.note ? `<p class="small" style="margin:.25rem 0 0">${esc(m.note)}</p>` : ""}</div></div>`; }).join("")}
        </div>

        ${sec("Aftercare", "clipboard", ul(p.aftercare))}
        ${(p.troubleshooting || []).length ? `<div class="card"><h3 style="margin-top:0">${ic("help")} If it is not working</h3>
          <div class="tablewrap"><table class="plain"><tbody>
            ${p.troubleshooting.map(t => `<tr><td><b>${esc(t.problem)}</b></td><td>${esc(t.action)}</td></tr>`).join("")}
          </tbody></table></div></div>` : ""}
        ${p.removal ? `<div class="card"><h3 style="margin-top:0">${ic("x")} Taking it out</h3>
          <h4 style="margin:.2rem 0 .3rem">When</h4>${ul(p.removal.when)}
          <h4 style="margin:.6rem 0 .3rem">How</h4>${ul(p.removal.how)}</div>` : ""}

        <div class="card"><h3 style="margin-top:0">${ic("shield")} Complications</h3>
          ${["immediate", "early", "late"].map(k => (p.complications[k] || []).length
            ? `<h4 style="margin:.4rem 0 .3rem;text-transform:capitalize">${k}</h4>${ul(p.complications[k])}` : "").join("")}</div>

        ${(p.textbook || []).length && textbookHtml ? `<h2>Where the equipment list comes from</h2>${textbookHtml(p.textbook, "procedure")}` : ""}
        <div class="card"><h3>${ic("book")} Sources</h3>
          <ul class="small">${(p.sources || []).map(s => `<li>${esc(s.name)}</li>`).join("")}</ul>
          <p class="small muted" style="margin:.5rem 0 0">The technique described here is not tied to a specific page in any of these — it is written as standard practice and is unverified. Check it against your surgical department's own protocol.</p></div>`;
      const pr = $("#pr-print"); if (pr) pr.onclick = () => window.print();
    }

    function view(main, route) {
      const p = route.id ? ALL().find(x => x.id === route.id) : null;
      if (route.id && !p) { main.innerHTML = `<p class="empty">No procedure with that name. <a href="#/procedures">See all procedures</a>.</p>`; return; }
      p ? one(main, p) : list(main);
    }
    return { view };
  };
})();
