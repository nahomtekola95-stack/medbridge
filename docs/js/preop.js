/* preop.js — preoperative assessment.

   Tick what the patient has and what they take; get back what to ask, what to
   examine and test, what to optimise before an elective operation, and — the
   part that does the damage when it is wrong — which medicines to continue,
   hold or stop, and when.

   The scope came from an unattributed student exam-preparation file, which is
   NOT cited and was corrected where it was out of date (bridging anticoagulation
   in atrial fibrillation, after the BRIDGE trial). The rules are written as
   current standard practice and carry no page citations. DRAFT.

   Pure logic lives on window.Preop.calc so the tests can reach it. */
(function () {
  "use strict";

  /* Medicines in the order they should be read: the rules that cause a stroke,
     a bleed or a crisis when they are wrong come first. */
  const RULE_ORDER = ["stop-and-bridge", "stop", "adjust", "hold-morning", "continue"];
  const RULE_LABEL = {
    "stop-and-bridge": "Stop, and bridge",
    "stop": "Stop before surgery",
    "adjust": "Adjust the dose",
    "hold-morning": "Hold the morning dose",
    "continue": "Continue, including on the day"
  };

  const uniq = (arr) => [...new Set(arr)];
  const byId = (list, id) => (list || []).find(x => x.id === id);

  /* Compile a plan from the ticked conditions and medicines. */
  function compile(data, { conditions = [], medications = [], elective = true } = {}) {
    const D = data || {};
    const conds = conditions.map(id => byId(D.conditions, id)).filter(Boolean);
    const meds = medications.map(id => byId(D.medications, id)).filter(Boolean);
    const pick = (k) => uniq(conds.flatMap(c => c[k] || []));

    const invIds = uniq(conds.flatMap(c => c.investigate || []));
    const investigations = invIds.map(id => byId(D.investigations, id)).filter(Boolean);

    const medsByRule = RULE_ORDER
      .map(rule => ({ rule, label: RULE_LABEL[rule], items: meds.filter(m => m.rule === rule) }))
      .filter(g => g.items.length);

    return {
      elective,
      conditions: conds,
      ask: pick("ask"),
      examine: pick("examine"),
      investigations,
      optimise: elective ? pick("optimise") : [],
      dayOfSurgery: pick("dayOfSurgery"),
      postponeIf: elective ? uniq([...pick("postponeIf")]) : [],
      medsByRule,
      highRiskMeds: meds.filter(m => m.rule === "stop" || m.rule === "stop-and-bridge").length,
      postpone: elective ? (D.postpone || []) : [],
      nbm: D.nbm || []
    };
  }

  const calc = { compile, RULE_ORDER, RULE_LABEL };
  window.Preop = { calc };

  /* =========================================================
     View
     ========================================================= */
  window.PreopView = function (ctx) {
    const { $, esc, ic, shareButton } = ctx;
    const GROUPS = { cardiovascular: "Heart and circulation", respiratory: "Lungs", endocrine: "Diabetes and endocrine",
      renal: "Kidney", liver: "Liver", haematological: "Blood and clotting", neurological: "Brain and mind",
      airway: "Airway", general: "General" };
    const S = { conditions: new Set(), medications: new Set(), elective: true };

    function view(main) {
      const D = window.PREOP;
      if (!D || !(D.conditions || []).length) { main.innerHTML = `<p class="empty">Preoperative data is not loaded in this build.</p>`; return; }

      const draw = () => {
        const p = compile(D, { conditions: [...S.conditions], medications: [...S.medications], elective: S.elective });
        const groups = Object.entries(GROUPS).map(([g, label]) => [g, label, D.conditions.filter(c => c.group === g)]).filter(([, , a]) => a.length);
        main.innerHTML = `
          <div class="resus-head"><div><h1 style="margin:0">${ic("clipboard")} Preoperative assessment</h1>
            <p class="text-2" style="margin:.2rem 0 0">Tick what the patient has and what they take. The medicines are where the harm is, so they come first.</p></div></div>

          <div class="row" style="margin:0 0 .8rem">
            <div class="seg" role="group" aria-label="Urgency">
              <button type="button" data-urg="1" class="${S.elective ? "active" : ""}">Elective</button>
              <button type="button" data-urg="0" class="${!S.elective ? "active" : ""}">Emergency</button></div></div>

          <div class="card"><h3 style="margin-top:0">${ic("user")} What the patient has</h3>
            ${groups.map(([g, label, arr]) => `<h4 class="po-group">${esc(label)}</h4>
              <div class="po-chips">${arr.map(c => `<button type="button" class="po-chip ${S.conditions.has(c.id) ? "on" : ""}" data-cond="${esc(c.id)}">${esc(c.label)}</button>`).join("")}</div>`).join("")}
          </div>

          <div class="card"><h3 style="margin-top:0">${ic("pill")} What the patient takes</h3>
            <div class="po-chips">${D.medications.map(m => `<button type="button" class="po-chip ${S.medications.has(m.id) ? "on" : ""}" data-med="${esc(m.id)}">${esc(m.label)}</button>`).join("")}</div>
          </div>

          ${result(p)}

          <p class="small muted">Written as current standard practice and corrected where older teaching is out of date. These rules carry no page citations and are not verified — confirm every medicine decision with the anaesthetist before acting on it.</p>`;
      };

      function result(p) {
        const nothing = !p.conditions.length && !p.medsByRule.length;
        const share = `Preop plan (${p.elective ? "elective" : "emergency"})\n` +
          (p.conditions.length ? `Conditions: ${p.conditions.map(c => c.label).join(", ")}\n` : "") +
          p.medsByRule.map(g => `${g.label}: ${g.items.map(m => `${m.label}${m.timing ? ` (${m.timing})` : ""}`).join("; ")}`).join("\n") +
          (p.investigations.length ? `\nInvestigations: ${p.investigations.map(i => i.test).join(", ")}` : "") +
          `\nDraft — confirm with the anaesthetist.`;
        const list = (title, icon, arr) => arr.length ? `<div class="card"><h3 style="margin-top:0">${ic(icon)} ${title}</h3><ul class="small">${arr.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : "";
        return `
          ${p.medsByRule.length ? `<div class="card"><div class="row" style="justify-content:space-between;align-items:baseline">
              <h3 style="margin:0">${ic("pill")} Medicines</h3>
              ${p.highRiskMeds ? `<span class="chip bad">${p.highRiskMeds} to stop</span>` : ""}</div>
            ${p.medsByRule.map(g => `<h4 class="po-group">${esc(g.label)}</h4>
              ${g.items.map(m => `<div class="callout ${g.rule.startsWith("stop") ? "danger" : g.rule === "continue" ? "ok-callout" : "warn"}">${ic(g.rule.startsWith("stop") ? "alert" : g.rule === "continue" ? "check" : "info")}<div>
                <strong>${m.drugId && (window.DRUG_DB || []).some(d => d.id === m.drugId) ? `<a href="#/drug/${esc(m.drugId)}">${esc(m.label)}</a>` : esc(m.label)}</strong>${m.timing ? ` — ${esc(m.timing)}` : ""}
                ${m.note ? `<p class="small" style="margin:.25rem 0 0">${esc(m.note)}</p>` : ""}
                ${m.ifStoppedWrongly ? `<p class="small muted" style="margin:.2rem 0 0"><b>If stopped wrongly:</b> ${esc(m.ifStoppedWrongly)}</p>` : ""}
                ${m.ifContinuedWrongly ? `<p class="small muted" style="margin:.2rem 0 0"><b>If continued wrongly:</b> ${esc(m.ifContinuedWrongly)}</p>` : ""}
              </div></div>`).join("")}`).join("")}
          </div>` : ""}

          ${p.postponeIf.length ? `<div class="card"><h3 style="margin-top:0">${ic("alert")} Postpone this elective operation if</h3>
            ${p.postponeIf.map(x => `<div class="callout danger">${ic("alert")}<div>${esc(x)}</div></div>`).join("")}</div>` : ""}

          ${list("Ask", "chat", p.ask)}
          ${list("Examine", "user", p.examine)}
          ${p.investigations.length ? `<div class="card"><h3 style="margin-top:0">${ic("search")} Investigations</h3>
            <div class="tablewrap"><table class="plain"><tbody>
              ${p.investigations.map(i => `<tr><td><b>${esc(i.test)}</b><div class="small muted">${esc(i.why || "")}</div></td>
                <td class="small">${i.ifUnavailable ? `<b>If you cannot:</b> ${esc(i.ifUnavailable)}` : ""}</td></tr>`).join("")}
            </tbody></table></div></div>` : ""}
          ${list("Optimise before an elective operation", "sliders", p.optimise)}
          ${list("On the day", "calendar", p.dayOfSurgery)}

          ${!p.elective ? `<div class="callout warn">${ic("alert")}<div><strong>Emergency.</strong> Nothing here is a reason to delay an operation that is saving a life. Use it to make the operation safer, not to postpone it.</div></div>` : ""}

          ${p.postpone.length && nothing ? `<div class="card"><h3 style="margin-top:0">${ic("alert")} Findings that postpone an elective operation</h3>
            <div class="tablewrap"><table class="plain"><tbody>
              ${p.postpone.map(x => `<tr><td><b>${esc(x.finding)}</b></td><td class="small">${esc(x.why || "")}</td><td class="small muted">${esc(x.action || "")}</td></tr>`).join("")}
            </tbody></table></div></div>` : ""}

          ${p.nbm.length ? `<div class="card"><h3 style="margin-top:0">${ic("clock")} Fasting</h3>
            <div class="tablewrap"><table class="plain"><tbody>
              ${p.nbm.map(n => `<tr><td><b>${esc(n.what)}</b></td><td style="white-space:nowrap">${esc(String(n.hours))} h</td><td class="small muted">${esc(n.note || "")}</td></tr>`).join("")}
            </tbody></table></div></div>` : ""}

          ${!nothing ? `<div class="row">${shareButton(share, "Share the plan")}</div>` : ""}`;
      }

      main.onclick = (e) => {
        const c = e.target.closest("[data-cond]"); if (c) { const id = c.dataset.cond; S.conditions.has(id) ? S.conditions.delete(id) : S.conditions.add(id); return draw(); }
        const m = e.target.closest("[data-med]"); if (m) { const id = m.dataset.med; S.medications.has(id) ? S.medications.delete(id) : S.medications.add(id); return draw(); }
        const u = e.target.closest("[data-urg]"); if (u) { S.elective = u.dataset.urg === "1"; return draw(); }
      };
      draw();
    }
    return { view };
  };
})();
