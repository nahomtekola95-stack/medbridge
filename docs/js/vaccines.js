/* vaccines.js — routine immunisation catch-up.

   A child turns up at 14 months having had two Penta and nothing since. What
   do you give today, what can still be caught up, and when do they come back?
   That arithmetic is done from memory at every health post in the country, and
   it is where doses get missed: a series is restarted that should have been
   continued, or a vaccine is given after its upper age limit and counted.

   Rules and limits are the Ethiopian Federal Ministry of Health "Routine
   immunization catch-up vaccination guidelines" (May 2022), Table 5 (p. 15) for
   minimum ages, minimum intervals and upper age limits, the routine schedule
   (p. 14) for doses, routes and sites, and the national job aid (p. 31).

   Three rules carry most of the weight:
     - An interrupted series is NEVER restarted. Give only the doses still owed.
     - Respect the minimum age for the dose and the minimum interval since the
       last one. A dose given too early is invalid and has to be repeated.
     - Several injections at one visit are safe, and better than another trip
       the family may not make.

   Pure logic lives on window.Vaccines.calc so the tests can reach it. DRAFT. */
(function () {
  "use strict";

  const DAY = 86400000;
  const WEEK = 7, MONTH = 30.4375;          // days
  const months = (d) => d / MONTH;

  /* The national schedule. `max` is the upper age limit for catch-up, expressed
     as the guideline expresses it: "up to 1 year", "up to 24 months", "up to 59
     months" — i.e. before the 1st, 2nd and 5th birthday. */
  const ANTIGENS = [
    /* The guideline is not consistent with itself here. The routine schedule
       (Table 4) allows the birth dose within 24 hours, and up to 14 days for a
       baby born at home; the catch-up table (Table 5) excludes the birth dose
       from catch-up altogether. Both are carried, because in a country where
       many births are at home the 14-day allowance is the one that decides
       whether a baby gets covered at all. */
    { id: "hepb0", name: "Hep B birth dose", doses: 1, minAgeDays: 0, intervalDays: null,
      maxMonths: null, maxDays: 14, route: "IM, left anterolateral thigh", catchUp: true,
      when: "Within 24 hours of birth; up to 14 days if the baby was born at home",
      conditional: "Give only if the baby was born at home. After a facility birth the dose belongs in the first 24 hours and is not given late.",
      note: "The routine schedule allows up to 14 days for a home delivery; the catch-up table excludes the birth dose from catch-up entirely. Confirm which your programme follows.",
      noCatchUp: "Past 14 days the birth dose is not given, and the catch-up table does not allow it at any age. Hepatitis B is still covered by the three Penta doses." },
    { id: "bcg", name: "BCG", doses: 1, minAgeDays: 0, intervalDays: null,
      maxMonths: 12, route: "Intradermal, right deltoid", catchUp: true,
      when: "At birth or as soon as possible after" },
    { id: "opv0", name: "OPV 0 (birth dose)", doses: 1, minAgeDays: 0, intervalDays: null,
      maxDays: 14, route: "Oral", catchUp: true,
      when: "As soon as possible after birth, up to 14 days",
      noCatchUp: "Past 14 days the birth dose is not given. Start the primary series at OPV 1 instead — the child still receives three OPV doses." },
    { id: "opv", name: "OPV (polio, oral)", doses: 3, minAgeDays: 6 * WEEK, intervalDays: 4 * WEEK,
      maxMonths: 59, route: "Oral", catchUp: true, series: true,
      when: "6, 10 and 14 weeks",
      note: "If the birth dose was given, OPV 1 must follow it by at least 6 weeks; later doses are 4 weeks apart." },
    { id: "penta", name: "Penta (DPT–HepB–Hib)", doses: 3, minAgeDays: 6 * WEEK, intervalDays: 4 * WEEK,
      maxMonths: 24, route: "IM, left anterolateral thigh", catchUp: true, series: true,
      when: "6, 10 and 14 weeks" },
    { id: "pcv", name: "PCV", doses: 3, minAgeDays: 6 * WEEK, intervalDays: 4 * WEEK,
      maxMonths: 24, route: "IM, right anterolateral thigh", catchUp: true, series: true,
      when: "6, 10 and 14 weeks" },
    { id: "rota", name: "Rotavirus", doses: 2, minAgeDays: 6 * WEEK, intervalDays: 4 * WEEK,
      maxMonths: 24, route: "Oral", catchUp: true, series: true,
      when: "6 and 10 weeks" },
    { id: "ipv", name: "IPV (injectable polio)", doses: 2, minAgeDays: 14 * WEEK, intervalDays: 4 * WEEK,
      maxMonths: 24, route: "IM, right thigh, 2.5 cm below the PCV site", catchUp: true, series: true,
      when: "From 14 weeks",
      note: "The catch-up table gives 2 doses; the routine schedule on the facing page gives 1 dose at 14 weeks. Follow whichever your national EPI register currently uses and confirm locally." },
    { id: "mcv", name: "Measles (MCV)", doses: 2, minAgeDays: Math.round(9 * MONTH), intervalDays: 4 * WEEK,
      maxMonths: 59, route: "Subcutaneous, right deltoid", catchUp: true, series: true,
      when: "9 and 15 months",
      note: "The second dose is due at 15 months; if the first was late, the second may follow 4 weeks after it." }
  ];
  const byId = (id) => ANTIGENS.find(a => a.id === id);

  /* Upper age limit in days. */
  function limitDays(a) {
    if (a.maxDays != null) return a.maxDays;
    if (a.maxMonths != null) return Math.round((a.maxMonths + 1) * MONTH); // "up to 59 months" = before the 5th birthday
    return Infinity;
  }

  /* Earliest age at which dose number n may be given, ignoring the last-dose
     date (that is applied separately). */
  function earliestAge(a, n) {
    if (n <= 1) return a.minAgeDays;
    const gap = a.id === "opv" ? a.intervalDays : a.intervalDays;
    return a.minAgeDays + (n - 1) * gap;
  }

  /* Plan one antigen for one child.
       ageDays       — age today
       had           — doses already received
       sinceLastDays — days since the most recent dose, or null if unknown
       hadBirthDose  — for OPV only: whether OPV 0 was given  */
  function planOne(a, { ageDays, had = 0, sinceLastDays = null, hadBirthDose = false } = {}) {
    const out = { id: a.id, name: a.name, had, of: a.doses, route: a.route, when: a.when,
                  note: a.note || "", conditional: a.conditional || "" };
    if (had >= a.doses) return { ...out, status: "complete", text: "Series complete." };
    if (!a.catchUp) return { ...out, status: "not-eligible", text: a.noCatchUp };

    const lim = limitDays(a);
    if (ageDays >= lim) {
      return { ...out, status: "too-old",
        text: a.noCatchUp || `Past the upper age limit (${a.maxDays != null ? a.maxDays + " days" : a.maxMonths + " months"}). Do not give it now; record the child as unable to complete this antigen.` };
    }

    const next = had + 1;
    /* minimum age for this dose */
    let dueAtAge = earliestAge(a, next);
    /* OPV 1 must follow a birth dose by 6 weeks rather than 4 */
    if (a.id === "opv" && next === 1 && hadBirthDose) dueAtAge = Math.max(dueAtAge, 6 * WEEK);

    const waitForAge = Math.max(0, dueAtAge - ageDays);
    /* minimum interval since the dose actually given */
    const waitForInterval = (had > 0 && sinceLastDays != null && a.intervalDays != null)
      ? Math.max(0, a.intervalDays - sinceLastDays) : 0;
    const wait = Math.max(waitForAge, waitForInterval);

    if (wait <= 0) {
      return { ...out, status: "give", dose: next,
        text: `Give dose ${next} of ${a.doses} today.`,
        unknownInterval: had > 0 && sinceLastDays == null };
    }
    return { ...out, status: "later", dose: next, inDays: wait,
      text: `Dose ${next} of ${a.doses} is not due yet — ${wait} more day${wait === 1 ? "" : "s"}.`,
      reason: waitForInterval > waitForAge ? "interval" : "age" };
  }

  /* Plan the whole child. `given` maps antigen id to doses received; `since`
     maps antigen id to days since its most recent dose. */
  function plan({ ageDays, given = {}, since = {} } = {}) {
    const hadBirthDose = (given.opv0 || 0) > 0;
    const rows = ANTIGENS.map(a => planOne(a, {
      ageDays, had: given[a.id] || 0, sinceLastDays: since[a.id] ?? null, hadBirthDose
    }));
    const giveNow = rows.filter(r => r.status === "give");

    /* What is still owed AFTER today's doses go in — this is the answer the
       carer actually leaves with, so it has to account for what was just
       given, not only for what the card showed on arrival. */
    const after = { ...given }, afterSince = { ...since };
    for (const r of giveNow) { after[r.id] = (after[r.id] || 0) + 1; afterSince[r.id] = 0; }
    const owed = ANTIGENS.map(a => planOne(a, {
      ageDays, had: after[a.id] || 0, sinceLastDays: afterSince[a.id] ?? null,
      hadBirthDose: (after.opv0 || 0) > 0
    })).filter(r => r.status === "later" || r.status === "give");
    const nextVisitDays = owed.reduce((m, r) => {
      const d = r.status === "give" ? 0 : r.inDays;
      return m == null ? d : Math.min(m, d);
    }, null);

    return {
      ageDays, rows, giveNow,
      injections: giveNow.filter(r => /IM|Intradermal|Subcutaneous/.test(r.route)).length,
      oral: giveNow.filter(r => r.route === "Oral").length,
      later: owed,
      missed: rows.filter(r => r.status === "too-old" || r.status === "not-eligible"),
      complete: rows.filter(r => r.status === "complete"),
      nextVisitDays
    };
  }

  const calc = { ANTIGENS, byId, plan, planOne, limitDays, earliestAge, months, MONTH, WEEK };
  window.Vaccines = { calc };

  /* =========================================================
     View
     ========================================================= */
  window.VaccinesView = function (ctx) {
    const { $, esc, ic, toast, render, shareButton } = ctx;
    const isoToday = () => { const d = new Date(); return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
    const ageText = (d) => d < 31 ? `${d} days` : d < 365 ? `${Math.floor(d / MONTH)} months` : `${Math.floor(d / 365.25)} y ${Math.round((d % 365.25) / MONTH)} m`;
    const STATE = { ageDays: null, given: {}, since: {} };

    function view(main) {
      const draw = () => {
        const p = STATE.ageDays == null ? null : plan(STATE);
        main.innerHTML = `
          <div class="resus-head"><div><h1 style="margin:0">${ic("baby")} Catch-up vaccination</h1>
            <p class="text-2" style="margin:.2rem 0 0">What to give this child today, what can still be caught up, and when to bring them back. Never restart a series — give only the doses still owed.</p></div>
            <div class="row"><a class="btn ghost sm" href="#/case/catch-up-vaccination">${ic("book")}Full case</a></div></div>

          <div class="card">
            <h3 style="margin-top:0">${ic("edit")} The child</h3>
            <div class="inline3">
              <div class="field"><label for="v-dob">Date of birth</label><input id="v-dob" type="date" max="${isoToday()}"></div>
              <div class="field"><label for="v-age">or age in months</label><input id="v-age" type="number" inputmode="decimal" min="0" max="60" step="0.5" placeholder="e.g. 14"></div>
              <div class="field" style="justify-content:flex-end"><div class="row"><span class="chip ${STATE.ageDays == null ? "" : "ok"}">${STATE.ageDays == null ? "Age not set" : esc(ageText(STATE.ageDays))}</span></div></div>
            </div>
            <p class="small muted" style="margin:.2rem 0 0">Read the doses already given from the vaccination card. If there is no card and the carer is unsure, count it as not given — a repeated dose is safer than a missed one.</p>
          </div>

          <div class="card">
            <h3 style="margin-top:0">${ic("check")} Doses already given</h3>
            <div class="vx-grid">
              ${ANTIGENS.map(a => `<div class="vx-row">
                <div><b>${esc(a.name)}</b><div class="small muted">${esc(a.when)}</div></div>
                <div class="row" style="gap:.3rem;flex-wrap:nowrap">
                  ${Array.from({ length: a.doses + 1 }, (_, n) => `<button type="button" class="vx-dot ${(STATE.given[a.id] || 0) === n ? "on" : ""}" data-ag="${a.id}" data-n="${n}">${n}</button>`).join("")}
                </div></div>`).join("")}
            </div>
            <p class="small muted" style="margin:.6rem 0 0">Tap the number of doses already received for each antigen.</p>
          </div>

          ${p ? result(p) : `<p class="empty">Enter the child's age to build the plan.</p>`}

          <p class="small muted">Ethiopian Ministry of Health, Routine immunization catch-up vaccination guidelines (May 2022) — Table 5 for minimum ages, intervals and upper age limits, and the national job aid. Draft tool: confirm against the current national schedule before use.</p>`;
        bind();
      };

      function result(p) {
        const share = `Catch-up vaccination — child ${ageText(p.ageDays)}\n` +
          (p.giveNow.length ? `GIVE TODAY: ${p.giveNow.map(r => `${r.name} dose ${r.dose}`).join(", ")}` : "Nothing due today") +
          (p.later.length ? `\nReturn in ${p.nextVisitDays} days for: ${p.later.map(r => `${r.name} dose ${r.dose}`).join(", ")}` : "") +
          (p.missed.length ? `\nPast the age limit: ${p.missed.map(r => r.name).join(", ")}` : "") +
          `\nDraft tool — confirm against the national schedule.`;
        return `
          <div class="card">
            <div class="row" style="justify-content:space-between;align-items:baseline">
              <h3 style="margin:0">${ic("zap")} Give today</h3>
              ${p.giveNow.length ? `<span class="chip ok">${p.injections} injection${p.injections === 1 ? "" : "s"}${p.oral ? ` · ${p.oral} oral` : ""}</span>` : ""}
            </div>
            ${p.giveNow.length ? `<ul class="pph-bundle" style="margin-top:.6rem">
              ${p.giveNow.map(r => `<li class="done"><button type="button" class="pph-tick" aria-hidden="true" tabindex="-1">${ic("check")}</button>
                <div><b>${esc(r.name)} — dose ${r.dose} of ${r.of}</b>
                  <p class="small" style="margin:.15rem 0 0">${esc(r.route)}</p>
                  ${r.conditional ? `<p class="small" style="margin:.15rem 0 0"><b>${esc(r.conditional)}</b></p>` : ""}
                  ${r.unknownInterval ? `<p class="small muted" style="margin:.15rem 0 0">Check the card: this is only correct if the last dose was at least 4 weeks ago.</p>` : ""}
                  ${r.note ? `<p class="small muted" style="margin:.15rem 0 0">${esc(r.note)}</p>` : ""}</div></li>`).join("")}
            </ul>
            ${p.injections > 1 ? `<div class="callout info" style="margin-top:.6rem">${ic("info")}<div>Giving ${p.injections} injections at one visit is safe and is what the national job aid asks for — it protects the child sooner and saves a journey the family may not make. Use a different site for each, and record every dose.</div></div>` : ""}`
            : `<p class="empty">Nothing is due today.</p>`}
          </div>

          ${p.later.length ? `<div class="card"><h3 style="margin-top:0">${ic("clock")} Bring the child back</h3>
            <div class="callout ok-callout">${ic("calendar")}<div><strong>Next visit in ${p.nextVisitDays} day${p.nextVisitDays === 1 ? "" : "s"}.</strong> Write the date on the card and tell the carer.</div></div>
            <div class="tablewrap"><table class="plain"><tbody>
              ${p.later.map(r => `<tr><td><b>${esc(r.name)}</b> dose ${r.dose} of ${r.of}</td><td>in ${r.inDays} days</td><td class="small muted">${r.reason === "interval" ? "minimum interval since the last dose" : "minimum age for this dose"}</td></tr>`).join("")}
            </tbody></table></div></div>` : ""}

          ${p.missed.length ? `<div class="card"><h3 style="margin-top:0">${ic("alert")} Past the age limit</h3>
            ${p.missed.map(r => `<div class="callout warn">${ic("alert")}<div><strong>${esc(r.name)}.</strong> ${esc(r.text)}</div></div>`).join("")}</div>` : ""}

          ${p.complete.length ? `<p class="small muted">Complete: ${p.complete.map(r => esc(r.name)).join(", ")}.</p>` : ""}
          <div class="row">${shareButton(share, "Share the plan")}</div>`;
      }

      const bind = () => {
        main.onclick = (e) => {
          const d = e.target.closest("[data-ag]");
          if (d) { STATE.given[d.dataset.ag] = +d.dataset.n; draw(); }
        };
        main.oninput = (e) => {
          if (e.target.id === "v-dob" && e.target.value) {
            const dob = new Date(e.target.value + "T00:00:00");
            const days = Math.floor((Date.now() - dob.getTime()) / DAY);
            if (days >= 0 && days < 365.25 * 20) { STATE.ageDays = days; draw(); }
          }
          if (e.target.id === "v-age" && e.target.value !== "") {
            const m = +e.target.value;
            if (m >= 0 && m <= 60) { STATE.ageDays = Math.round(m * MONTH); draw(); }
          }
        };
      };
      draw();
    }
    return { view };
  };
})();
