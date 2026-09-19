/* ============================================================
   MedBridge bedside features:
   - patient mode (weight-personalised doses on drug and case pages)
   - emergency drug card by weight
   - drip guide (metronome + tap-to-measure)
   - dose schedules with due reminders
   - favourites, recently viewed, typo-tolerant search
   - out-of-stock alternatives
   - never-mix reference
   Registered by app.js, which passes shared helpers as `ctx`.
   ============================================================ */
window.Features = function (ctx) {
  const { $, esc, ic, toast, render, ROLES } = ctx;
  const fmt = (n, d = 2) => (n == null || !isFinite(n)) ? "—" : (+Calc.round(n, d)).toLocaleString();
  const drugById = (id) => DRUG_DB.find(d => d.id === id);
  const store = {
    get(k, def) { try { const v = localStorage.getItem("mb:" + k); return v == null ? def : JSON.parse(v); } catch { return def; } },
    set(k, v) { try { localStorage.setItem("mb:" + k, JSON.stringify(v)); } catch {} }
  };

  /* =========================================================
     Patient
     ========================================================= */
  const patient = {
    get weight() { const w = parseFloat(store.get("weight", "")); return w > 0 && w < 250 ? w : null; },
    set weight(v) { store.set("weight", v == null ? "" : String(v)); },
    get estimated() { return !!store.get("weightEstimated", false); },
    set estimated(v) { store.set("weightEstimated", !!v); },
    get ageYears() { const a = store.get("ageYears", null); return a == null || a === "" ? null : +a; },
    set ageYears(v) { store.set("ageYears", v); },
    /* newborns: completed weeks of gestation at birth and postnatal age in days */
    get gaWeeks() { const v = store.get("gaWeeks", null); return v == null || v === "" ? null : +v; },
    set gaWeeks(v) { store.set("gaWeeks", v); },
    get pnaDays() { const v = store.get("pnaDays", null); return v == null || v === "" ? null : +v; },
    set pnaDays(v) { store.set("pnaDays", v); },
    get isNewborn() { return this.pnaDays != null && this.pnaDays <= 28; },
    get sex() { return store.get("sex", ""); },
    set sex(v) { store.set("sex", v || ""); },
    /* kidney function saved from the calculator: { value, method, at } */
    get crcl() { const c = store.get("crcl", null); return c && c.value > 0 ? c : null; },
    set crcl(v) { store.set("crcl", v); },
    clear() { this.weight = null; this.estimated = false; this.ageYears = null; this.gaWeeks = null; this.pnaDays = null; this.sex = ""; this.crcl = null; }
  };

  function patientChipHtml() {
    const w = patient.weight;
    return w ? `${ic(patient.isNewborn ? "baby" : "user")}<span><b>${fmt(w, 1)} kg</b>${patient.estimated ? " est." : ""}${patient.isNewborn ? ` · ${patient.pnaDays} d` : ""}</span>` : `${ic("user")}<span>Set weight</span>`;
  }
  function syncPatientChip() {
    const el = $("#patient-chip"); if (!el) return;
    el.innerHTML = patientChipHtml();
    el.classList.toggle("on", !!patient.weight);
    el.title = patient.weight ? "Patient weight — doses on every page are calculated for this weight" : "Set a patient weight to see personalised doses";
  }
  function openPatientDialog() {
    const dlg = $("#patient-dialog");
    const w = patient.weight, a = patient.ageYears;
    dlg.innerHTML = `
      <form method="dialog" class="pd">
        <h3 style="margin:0 0 .3rem">${ic("user")} Patient</h3>
        <p class="small muted" style="margin:0 0 .8rem">Doses on drug pages, cases, the emergency card and schedules use this weight. Stored only on this device. Clear it when you move to the next patient.</p>
        <div class="inline">
          <div class="field"><label for="pd-w">Weight (kg)</label><input id="pd-w" type="number" inputmode="decimal" min="0.3" max="250" step="0.1" value="${w ?? ""}" placeholder="e.g. 12.5"></div>
          <div class="field"><label for="pd-a">Age (years, optional)</label><input id="pd-a" type="number" inputmode="decimal" min="0" max="120" step="0.1" value="${a ?? ""}" placeholder="for estimates"></div>
        </div>
        <button type="button" class="btn ghost sm" id="pd-est">${ic("calc")}Estimate weight from age</button>
        <details class="pd-more" ${patient.isNewborn || patient.sex || patient.crcl ? "open" : ""}><summary class="small">Newborn age, sex and kidney function</summary>
          <div class="inline">
            <div class="field"><label for="pd-ga">Gestation at birth (weeks)</label><input id="pd-ga" type="number" inputmode="numeric" min="22" max="44" step="1" value="${patient.gaWeeks ?? ""}" placeholder="newborns only"></div>
            <div class="field"><label for="pd-pna">Age in days (0–28)</label><input id="pd-pna" type="number" inputmode="numeric" min="0" max="28" step="1" value="${patient.pnaDays ?? ""}" placeholder="newborns only"></div>
          </div>
          <div class="inline">
            <div class="field"><label for="pd-sex">Sex</label><select id="pd-sex"><option value="">Not set</option><option value="female" ${patient.sex === "female" ? "selected" : ""}>Female</option><option value="male" ${patient.sex === "male" ? "selected" : ""}>Male</option></select></div>
            <div class="field"><label>Kidney function</label><div class="small" style="padding-top:.55rem">${patient.crcl ? `${fmt(patient.crcl.value, 0)} mL/min <a href="#/calc?tab=kidney">Change</a>` : `<a href="#/calc?tab=kidney">Calculate creatinine clearance</a>`}</div></div>
          </div>
          <p class="small muted" style="margin:.2rem 0 0">For a newborn, doses and dosing intervals follow gestation and age in days.</p>
        </details>
        <p id="pd-note" class="small muted" style="margin:.5rem 0 0"></p>
        <div class="row" style="margin-top:1rem;justify-content:flex-end">
          <button type="button" class="btn ghost sm" id="pd-clear">Clear patient</button>
          <button type="button" class="btn ghost sm" id="pd-cancel">Cancel</button>
          <button type="button" class="btn sm" id="pd-save">${ic("check")}Use this weight</button>
        </div>
      </form>`;
    let estimated = patient.estimated;
    $("#pd-w", dlg).addEventListener("input", () => { estimated = false; $("#pd-note", dlg).textContent = ""; });
    $("#pd-est", dlg).addEventListener("click", () => {
      const age = parseFloat($("#pd-a", dlg).value);
      if (!(age >= 0)) { $("#pd-note", dlg).textContent = "Enter an age first."; return; }
      const r = age < 1 ? Calc.estimateWeight({ months: Math.round(age * 12) }) : Calc.estimateWeight({ years: Math.floor(age), formula: store.get("custom", {}).weightFormula || "apls" });
      if (!r || !r.kg) { $("#pd-note", dlg).textContent = r ? r.formula : "No estimate for this age — weigh the patient."; return; }
      $("#pd-w", dlg).value = Calc.round(r.kg, 1); estimated = true;
      $("#pd-note", dlg).textContent = `Estimated with ${r.formula}. Weigh the patient whenever a scale exists.`;
    });
    $("#pd-save", dlg).addEventListener("click", () => {
      const nw = parseFloat($("#pd-w", dlg).value), na = $("#pd-a", dlg).value;
      if (!(nw > 0 && nw < 250)) { $("#pd-note", dlg).textContent = "Enter a weight between 0.3 and 250 kg."; return; }
      const ga = $("#pd-ga", dlg).value, pna = $("#pd-pna", dlg).value;
      if (pna !== "" && !(+pna >= 0 && +pna <= 28)) { $("#pd-note", dlg).textContent = "Age in days must be 0 to 28 for newborn dosing."; return; }
      if (ga !== "" && !(+ga >= 22 && +ga <= 44)) { $("#pd-note", dlg).textContent = "Gestation must be 22 to 44 weeks."; return; }
      if (pna !== "" && ga === "") { $("#pd-note", dlg).textContent = "Enter the gestation at birth as well."; return; }
      patient.weight = nw; patient.estimated = estimated; patient.ageYears = pna !== "" ? 0 : (na === "" ? null : +na);
      patient.gaWeeks = ga === "" ? null : +ga; patient.pnaDays = pna === "" ? null : +pna; patient.sex = $("#pd-sex", dlg).value;
      dlg.close(); syncPatientChip(); render(); toast(`Doses now shown for ${fmt(nw, 1)} kg.`);
    });
    $("#pd-clear", dlg).addEventListener("click", () => { patient.clear(); dlg.close(); syncPatientChip(); render(); toast("Patient cleared."); });
    $("#pd-cancel", dlg).addEventListener("click", () => dlg.close());
    dlg.showModal();
    setTimeout(() => $("#pd-w", dlg).focus(), 30);
  }

  /* High-alert medicines (ISMP / WHO Medication Without Harm): an independent second check before giving. */
  const HIGH_ALERT = ["insulin-soluble", "potassium-chloride", "magnesium-sulfate", "heparin", "adrenaline", "noradrenaline", "dopamine", "amiodarone", "digoxin", "morphine", "midazolam", "lorazepam", "ketamine", "oxytocin", "hypertonic-saline", "quinine", "phenytoin", "aminophylline"];

  /* ---------- generic dose computation ---------- */
  function computeDose(spec, weight) {
    const bands = spec.bands ? spec.bands.map(b => ({ under: b.under, dosePerKg: b.perKg ?? b.dosePerKg })) : null;
    return Calc.weightDose({ dosePerKg: spec.perKg ?? spec.dosePerKg, weightKg: weight, maxDose: spec.max ?? spec.maxDose, minDose: spec.min ?? spec.minDose, conc: spec.conc, bands });
  }
  const unitOf = (spec) => spec.unit || spec.doseUnit || "";
  const doseLine = (r, spec) => {
    const u = unitOf(spec);
    let s = `${fmt(r.dose, r.dose < 1 ? 3 : 2)} ${u}`;
    if (r.volumeMl != null && u !== "mL") s += r.volumeMl < 0.05 ? ` = ${fmt(r.volumeMl, 4)} mL, too small to draw up accurately: dilute first` : ` = ${fmt(r.volumeMl, r.volumeMl < 1 ? 2 : 1)} mL`;
    return s;
  };
  const flags = (r, spec) => [
    r.capped ? `<span class="chip warn">capped at max ${fmt(spec.max ?? spec.maxDose)} ${esc(unitOf(spec))}</span>` : "",
    r.raised ? `<span class="chip warn">raised to minimum ${fmt(spec.min ?? spec.minDose)} ${esc(unitOf(spec))}</span>` : "",
    r.band ? `<span class="chip">${fmt(r.perKg)} ${esc(unitOf(spec))}/kg under ${r.band.under} kg</span>` : ""
  ].join("");

  /* ---------- patient dose card on drug pages ---------- */
  function patientDoseCard(d) {
    if (!d.calc) return "";
    const w = patient.weight;
    if (!w) return `<div class="card pdose empty-pdose"><div class="row" style="justify-content:space-between;gap:.6rem">
        <div><h4 style="margin:0">${ic("user")} Dose for your patient</h4><p class="small muted" style="margin:.2rem 0 0">Set a weight and this card shows the dose and volume to draw up.</p></div>
        <button type="button" class="btn sm" data-open-patient>${ic("user")}Set weight</button></div></div>`;
    const c = d.calc;
    let body = "";
    if (c.type === "weight") {
      const r = computeDose(c, w);
      body = r ? `<div class="pd-big">${doseLine(r, c)}</div>
        <div class="pd-sub">${esc(c.label)}${c.conc && unitOf(c) !== "mL" ? ` · stock ${fmt(c.conc)} ${esc(c.concUnit)}` : ""}</div>
        <div class="row" style="margin-top:.35rem">${flags(r, c)}</div>` : "";
    } else if (c.type === "infusion") {
      const df = c.dropFactor || 60;
      const r = Calc.infusionRate({ amount: c.amount, amountUnit: c.amountUnit, volumeMl: c.volumeMl, weightKg: w, dose: c.defaultDose, doseUnit: c.doseUnit, dropFactor: df });
      body = r && !r.error ? `<div class="pd-big">${fmt(r.gttPerMin, 0)} drops/min <span class="pd-unit">= ${fmt(r.mlPerHr, 1)} mL/h</span></div>
        <div class="pd-sub">${esc(c.amount + " " + c.amountUnit)} in ${c.volumeMl} mL at ${c.defaultDose} ${esc(c.doseUnit)}, ${df} drops/mL set. Usual range ${c.range[0]}–${c.range[1]} ${esc(c.doseUnit)}.</div>
        ${r.gttPerMin < 4 ? `<div class="callout warn" style="margin:.5rem 0 0">${ic("alert")}<div><strong>Too slow to control by gravity.</strong> Below 4 drops/min the rate cannot be held steady. Use a more dilute bag for this child — the paediatric “rule of 6” on this drug page — so the drip runs at a countable rate.</div></div>` : ""}
        ${r.gttPerMin > 150 ? `<div class="callout warn" style="margin:.5rem 0 0">${ic("alert")}<div><strong>Too fast to count.</strong> Use a more concentrated bag or a microdrip set.</div></div>` : ""}
        <div class="row" style="margin-top:.5rem"><a class="btn sm" href="#/drip?rate=${Math.round(r.gttPerMin)}&df=${df}">${ic("drop")}Drip guide at ${fmt(r.gttPerMin, 0)}/min</a><a class="btn ghost sm" href="#/calc?drug=${d.id}">Change dose</a></div>` : "";
    } else if (c.type === "planC") {
      const under = patient.ageYears != null && patient.ageYears < 1;
      const r = Calc.planC(w, under, 20);
      body = r ? `<div class="pd-big">${fmt(r.total, 0)} mL total <span class="pd-unit">Plan C, ${under ? "under 12 months" : "12 months or older"}</span></div>
        <div class="pd-sub">Phase 1: ${fmt(r.phase1.volume, 0)} mL over ${r.phase1.minutes} min · Phase 2: ${fmt(r.phase2.volume, 0)} mL over ${r.phase2.minutes} min. Not for severe malnutrition.</div>
        <div class="row" style="margin-top:.5rem"><a class="btn ghost sm" href="#/calc?tab=planc">Full Plan C with drop rates</a></div>` : "";
    }
    return `<div class="card pdose">
      <div class="row" style="justify-content:space-between"><h4 style="margin:0">${ic("user")} For ${fmt(w, 1)} kg${patient.estimated ? " (estimated)" : ""}</h4><button type="button" class="linkbtn" data-open-patient>${ic("edit")}Change</button></div>
      ${body}
      <p class="small muted" style="margin:.5rem 0 0">Check the calculation and the ampoule strength before giving. Draft content.</p></div>`;
  }

  /* ---------- patient dose inline on case pages ---------- */
  function caseDoseInline(drugId) {
    const w = patient.weight; if (!w) return "";
    const d = drugById(drugId); if (!d || !d.calc || d.calc.type !== "weight") return "";
    const r = computeDose(d.calc, w); if (!r) return "";
    return `<span class="cd-dose">${ic("user")} ${fmt(w, 1)} kg: ${doseLine(r, d.calc)}${r.capped ? " (max)" : ""}${r.raised ? " (min)" : ""}</span>`;
  }

  /* =========================================================
     Favourites & recent
     ========================================================= */
  const favs = {
    list() { return store.get("favs", []); },
    has(key) { return this.list().includes(key); },
    toggle(key) { const l = this.list(); const i = l.indexOf(key); if (i >= 0) l.splice(i, 1); else l.unshift(key); store.set("favs", l.slice(0, 40)); return i < 0; }
  };
  const recent = {
    list() { return store.get("recent", []); },
    push(key) { const l = this.list().filter(k => k !== key); l.unshift(key); store.set("recent", l.slice(0, 8)); }
  };
  const keyInfo = (key) => {
    const [kind, id] = key.split(":");
    if (kind === "drug") { const d = drugById(id); return d && { href: `#/drug/${id}`, name: d.name.split(" (")[0], kind: "Drug" }; }
    if (kind === "case") { const c = CONDITIONS.find(x => x.id === id); return c && { href: `#/case/${id}`, name: c.name, kind: "Case" }; }
    return null;
  };
  function starButton(key) {
    const on = favs.has(key);
    return `<button type="button" class="btn ghost sm star ${on ? "on" : ""}" data-star="${esc(key)}" aria-pressed="${on}" title="${on ? "Remove from favourites" : "Add to favourites"}">${ic("star")}${on ? "Saved" : "Save"}</button>`;
  }
  function bindStars(root) {
    root.addEventListener("click", e => {
      const b = e.target.closest("[data-star]"); if (!b) return;
      const on = favs.toggle(b.dataset.star);
      b.classList.toggle("on", on); b.setAttribute("aria-pressed", on);
      b.innerHTML = `${ic("star")}${on ? "Saved" : "Save"}`;
      toast(on ? "Added to favourites." : "Removed from favourites.");
    });
  }
  function shortcutsHtml() {
    const f = favs.list().map(keyInfo).filter(Boolean);
    const r = recent.list().filter(k => !favs.has(k)).map(keyInfo).filter(Boolean);
    if (!f.length && !r.length) return "";
    const chips = (arr) => arr.map(x => `<a class="sc-chip" href="${x.href}"><span class="sc-kind">${x.kind}</span>${esc(x.name)}</a>`).join("");
    return `<div class="shortcuts">
      ${f.length ? `<div class="sc-row"><span class="sc-label">${ic("star")} Favourites</span><div class="sc-chips">${chips(f)}</div></div>` : ""}
      ${r.length ? `<div class="sc-row"><span class="sc-label">${ic("clock")} Recent</span><div class="sc-chips">${chips(r)}</div></div>` : ""}
    </div>`;
  }

  /* =========================================================
     Search (typo tolerant)
     ========================================================= */
  function dist(a, b, maxD) {
    if (Math.abs(a.length - b.length) > maxD) return maxD + 1;
    const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let cur = [i], best = i;
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        best = Math.min(best, cur[j]);
      }
      if (best > maxD) return maxD + 1;
      prev.splice(0, prev.length, ...cur);
    }
    return prev[b.length];
  }
  const words = (s) => String(s).toLowerCase().split(/[^a-z0-9%]+/).filter(w => w.length > 2);
  /** true if every query word matches a word in the text exactly, as a prefix, or within a small edit distance */
  function fuzzyMatch(text, query) {
    const hay = String(text).toLowerCase();
    const q = query.trim().toLowerCase();
    if (!q) return true;
    if (hay.includes(q)) return true;
    const tw = words(hay);
    return words(q).every(qw => tw.some(w => w.startsWith(qw) || (qw.length >= 5 && dist(qw, w.slice(0, qw.length + 1), qw.length >= 8 ? 2 : 1) <= (qw.length >= 8 ? 2 : 1))));
  }
  const caseText = (c) => [c.name, ...(c.aka || []), c.summary, ...c.drugs.map(d => drugById(d.id)?.name || "")].join(" ");

  /* =========================================================
     Out-of-stock alternatives
     ========================================================= */
  function alternativesHtml(d) {
    const subs = (window.SUBSTITUTES || {})[d.id];
    if (!subs || !subs.length) return "";
    return `<details class="card alt-card"><summary><h4 style="margin:0;display:inline-flex;gap:.35rem;align-items:center">${ic("swap")} Out of stock? What to use instead</h4></summary>
      ${subs.map(x => {
        if (x.none) return `<div class="alt-row"><div class="small muted">${esc(x.use)}</div><div class="alt-item"><strong class="bad-text">No drug substitute.</strong> ${esc(x.note)}</div></div>`;
        const ad = drugById(x.with);
        return `<div class="alt-row"><div class="small muted">For ${esc(x.use)}</div><div class="alt-item"><a href="#/drug/${x.with}"><strong>${esc(ad ? ad.name : x.with)}</strong></a> — ${esc(x.note)}</div></div>`;
      }).join("")}
      <p class="small muted" style="margin:.4rem 0 0">A substitute is only valid for the use shown. Open its page for doses and cautions. Draft.</p></details>`;
  }

  /* =========================================================
     Emergency card
     ========================================================= */
  function viewResus(main, r) {
    const w0 = parseFloat(r.q.w) || patient.weight || "";
    main.innerHTML = `
      <div class="resus-head emergency">
        <div><h1 style="margin:0">${ic("zap")} Emergency drug card</h1>
          <p class="text-2" style="margin:.2rem 0 0">Every resuscitation dose and volume for one weight. Draft — check against your protocol.</p></div>
        <button type="button" class="btn ghost sm" id="rs-print">${ic("print")}Print</button>
      </div>
      <div class="card resus-input">
        <div class="inline">
          <div class="field"><label for="rs-w">Weight (kg)</label><input id="rs-w" type="number" inputmode="decimal" min="0.3" max="250" step="0.1" value="${w0}"></div>
          <div class="field"><label for="rs-a">Age in years (optional)</label><input id="rs-a" type="number" inputmode="decimal" min="0" max="18" step="0.5" value="${patient.ageYears ?? ""}"></div>
        </div>
        <div class="row"><button type="button" class="btn ghost sm" id="rs-est">${ic("calc")}Estimate weight from age</button><button type="button" class="btn ghost sm" id="rs-use">${ic("user")}Use as patient weight</button></div>
        <p id="rs-note" class="small muted" style="margin:.5rem 0 0"></p>
      </div>
      <div id="rs-out"></div>`;
    const out = $("#rs-out");
    const draw = () => {
      const w = parseFloat($("#rs-w").value), age = parseFloat($("#rs-a").value);
      if (!(w > 0 && w < 250)) { out.innerHTML = `<p class="empty">Enter a weight to build the card.</p>`; return; }
      const adult = w >= 40;
      const extras = [];
      if (age >= 1 && age <= 10) extras.push(`<div class="rs-extra"><b>Endotracheal tube</b> uncuffed ${fmt(age / 4 + 4, 1)} mm · cuffed ${fmt(age / 4 + 3.5, 1)} mm · oral length ≈ ${fmt(age / 2 + 12, 0)} cm <span class="muted small">(APLS age formulas)</span></div>`);
      const groups = Object.entries(RESUS_GROUPS).map(([g, gl]) => {
        const rows = RESUS.filter(x => x.group === g).map(x => {
          let dose = "", vol = "";
          if (x.type === "dose") {
            const res = computeDose(x, w);
            if (x.upper) {
              const hi = computeDose({ ...x, perKg: x.upper }, w);
              dose = `${fmt(res.dose)}–${fmt(hi.dose)} ${x.unit}`; vol = x.conc ? `${fmt(res.volumeMl, 2)}–${fmt(hi.volumeMl, 2)} mL` : "";
            } else {
              dose = `${fmt(res.dose, res.dose < 1 ? 3 : 2)} ${x.unit}`;
              vol = x.conc && x.unit !== "mL" ? `${fmt(res.volumeMl, res.volumeMl < 1 ? 2 : 1)} mL` : (x.unit === "mL" ? `${fmt(res.dose, 1)} mL` : "");
              if (res.capped) dose += ` <span class="chip warn">max</span>`;
              if (res.raised) dose += ` <span class="chip warn">min</span>`;
              if (res.band) dose += ` <span class="chip">${fmt(res.perKg)} ${x.unit}/kg</span>`;
            }
          } else if (x.type === "volume") {
            dose = x.upper ? `${fmt(x.perKg * w, 0)}–${fmt(x.upper * w, 0)} mL` : `${fmt(x.perKg * w, 0)} mL`;
            vol = esc(x.fluid);
          } else if (x.type === "energy") {
            const first = x.upper ? `${fmt(x.perKg * w, 0)}–${fmt(x.upper * w, 0)} J` : `${fmt(x.perKg * w, 0)} J`;
            dose = `${first}, then ${fmt(x.then * w, 0)} J`; vol = x.maxPerKg ? `max ${fmt(x.maxPerKg * w, 0)} J ${esc(x.adultCap || "")}` : "";
          } else if (x.type === "band") {
            const b = x.bands.find(b => w < b.under); dose = esc(b.text);
          } else if (x.type === "maint") {
            const perHr = w <= 10 ? 4 * w : w <= 20 ? 40 + 2 * (w - 10) : 60 + (w - 20);
            dose = `${fmt(perHr, 0)} mL/h`; vol = `${fmt(perHr * 24, 0)} mL/day`;
          }
          const name = x.drug ? `<a href="#/drug/${x.drug}">${esc(x.name)}</a>` : esc(x.name);
          return `<tr><td class="rs-drug">${name}<div class="small muted">${esc(x.use)}</div></td>
            <td class="rs-dose"><b>${dose}</b>${vol ? `<div class="rs-vol">${vol}</div>` : ""}</td>
            <td class="small">${esc(x.route)}${x.concLabel ? `<div class="muted">${esc(x.concLabel)}</div>` : ""}${x.prep ? `<div class="muted">${esc(x.prep)}</div>` : ""}</td>
            <td class="small">${[x.repeat, x.note].filter(Boolean).map(esc).join("<br>")}<div class="muted rs-ref">${esc(x.ref)}</div></td></tr>`;
        }).join("");
        return `<div class="card rs-group"><h3>${esc(gl)}</h3><div class="tablewrap"><table class="rs-table"><thead><tr><th>Drug</th><th>Dose · volume</th><th>Route · strength</th><th>Repeat · notes</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
      }).join("");
      out.innerHTML = `
        <div class="rs-banner"><span class="rs-w">${fmt(w, 1)} kg</span>${age >= 0 ? `<span>${fmt(age, 1)} years</span>` : ""}<span class="small">Generated ${new Date().toLocaleString()}${window.EthCal && EthCal.enabled() ? " · " + EthCal.format(new Date(), window.I18N?.lang) : ""}</span></div>
        ${adult ? `<div class="callout warn">${ic("alert")}<div><strong>Adult-sized patient.</strong> Doses shown are capped at the listed maxima; check adult doses on each drug page, which can differ from per-kg calculation.</div></div>` : ""}
        ${extras.join("")}${groups}
        <p class="small muted">Draft emergency card. Every dose must be checked against the drug page and the national protocol before use. Weigh the patient whenever possible.</p>`;
    };
    $("#rs-w").addEventListener("input", draw); $("#rs-a").addEventListener("input", draw);
    $("#rs-est").addEventListener("click", () => {
      const age = parseFloat($("#rs-a").value);
      if (!(age >= 0)) { $("#rs-note").textContent = "Enter an age first."; return; }
      const e = age < 1 ? Calc.estimateWeight({ months: Math.round(age * 12) }) : Calc.estimateWeight({ years: Math.floor(age) });
      if (!e || !e.kg) { $("#rs-note").textContent = "No estimate for this age — weigh the patient."; return; }
      $("#rs-w").value = Calc.round(e.kg, 1); $("#rs-note").textContent = `Estimated with ${e.formula}. Weigh whenever possible.`; draw();
    });
    $("#rs-use").addEventListener("click", () => {
      const w = parseFloat($("#rs-w").value); if (!(w > 0)) return;
      patient.weight = w; const a = $("#rs-a").value; patient.ageYears = a === "" ? null : +a; syncPatientChip(); toast(`Patient weight set to ${fmt(w, 1)} kg.`);
    });
    $("#rs-print").addEventListener("click", () => window.print());
    draw();
  }

  /* =========================================================
     Drip guide
     ========================================================= */
  let dripStop = null;
  function stopDrip() { if (dripStop) { dripStop(); dripStop = null; } }
  function viewDrip(main, r) {
    stopDrip();
    const df0 = +r.q.df || store.get("dropFactor", 20);
    main.innerHTML = `
      <h1>${ic("drop")} Drip guide</h1>
      <p class="text-2" style="max-width:62ch">Set the target rate, then match the drops in the chamber to the pulse and the sound. Use tap-to-measure to check the actual rate.</p>
      <div class="drip-grid">
        <div class="card">
          <div class="inline">
            <div class="field"><label for="dg-rate">Target drops per minute</label><input id="dg-rate" type="number" inputmode="numeric" min="1" max="200" value="${+r.q.rate || ""}" placeholder="e.g. 42"></div>
            <div class="field"><label for="dg-df">Drop factor</label><select id="dg-df">${[10, 15, 20, 60].map(f => `<option value="${f}" ${f == df0 ? "selected" : ""}>${f} drops/mL${f === 60 ? " (microdrip)" : ""}</option>`).join("")}</select></div>
          </div>
          <details class="small"><summary>Work out the rate from volume and time</summary>
            <div class="inline" style="margin-top:.5rem"><div class="field"><label for="dg-vol">Volume (mL)</label><input id="dg-vol" type="number" inputmode="decimal" min="0"></div><div class="field"><label for="dg-min">Over (minutes)</label><input id="dg-min" type="number" inputmode="decimal" min="0"></div></div>
          </details>
          <p id="dg-info" class="small text-2" style="margin:.6rem 0 0"></p>
          <div class="drip-stage">
            <div class="chamber"><div class="drop" id="dg-drop"></div><div class="pool"></div></div>
            <div class="drip-readout"><div class="big" id="dg-big">—</div><div class="small muted" id="dg-sub">Set a rate</div></div>
          </div>
          <div class="row">
            <button type="button" class="btn" id="dg-start">${ic("play")}Start</button>
            <label class="toggle-inline"><input type="checkbox" id="dg-sound" ${store.get("dripSound", true) ? "checked" : ""}> Sound</label>
            <label class="toggle-inline"><input type="checkbox" id="dg-vib"> Vibrate</label>
          </div>
        </div>
        <div class="card">
          <h3>Check the actual rate</h3>
          <p class="small text-2">Tap the button each time a drop falls. After 6 drops it shows the real rate and how to adjust the clamp.</p>
          <button type="button" class="tapper" id="dg-tap">Tap each drop</button>
          <div id="dg-tapout" class="tapout"></div>
          <button type="button" class="btn ghost sm" id="dg-tapreset">Reset</button>
          <h4>No screen? Count for 15 seconds</h4>
          <div class="row"><button type="button" class="btn ghost sm" id="dg-15">${ic("clock")}Start 15-second count</button><span id="dg-15out" class="small"></span></div>
          <div class="inline" id="dg-15in" hidden style="margin-top:.5rem"><div class="field"><label for="dg-15n">Drops counted</label><input id="dg-15n" type="number" inputmode="numeric" min="0"></div><div class="field"><label>&nbsp;</label><span id="dg-15res" class="small"></span></div></div>
        </div>
      </div>`;
    let running = false, timer = null, next = 0, audio = null;
    const rate = () => { const v = parseFloat($("#dg-rate").value); return v > 0 && v <= 200 ? v : null; };
    const info = () => {
      const rt = rate(), df = +$("#dg-df").value;
      $("#dg-big").textContent = rt ? `${fmt(rt, 0)}/min` : "—";
      $("#dg-sub").textContent = rt ? `1 drop every ${fmt(60 / rt, 1)} s · ${fmt(rt / 4, 1)} per 15 s` : "Set a rate";
      $("#dg-info").textContent = rt ? `= ${fmt(rt * 60 / df, 0)} mL/h with a ${df} drops/mL set.${rt > 150 ? " Above 150/min cannot be counted reliably — use a time-taped bag." : ""}${rt < 4 ? " Below 4/min is hard to control by gravity." : ""}` : "";
    };
    const click = () => {
      if ($("#dg-sound").checked) {
        try {
          audio ||= new (window.AudioContext || window.webkitAudioContext)();
          const o = audio.createOscillator(), g = audio.createGain();
          o.frequency.value = 1100; g.gain.setValueAtTime(0.25, audio.currentTime); g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.07);
          o.connect(g).connect(audio.destination); o.start(); o.stop(audio.currentTime + 0.08);
        } catch {}
      }
      if ($("#dg-vib").checked && navigator.vibrate) navigator.vibrate(30);
      const d = $("#dg-drop"); if (d) { d.classList.remove("fall"); void d.offsetWidth; d.classList.add("fall"); }
    };
    const tick = () => {
      if (!running) return;
      const rt = rate(); if (!rt) { stop(); return; }
      click();
      const interval = 60000 / rt; next += interval;
      const delay = Math.max(10, next - performance.now());
      timer = setTimeout(tick, delay);
    };
    const start = () => { if (!rate()) { toast("Set a target rate first.", true); return; } running = true; next = performance.now(); tick(); $("#dg-start").innerHTML = `${ic("pause")}Stop`; };
    const stop = () => { running = false; clearTimeout(timer); const b = $("#dg-start"); if (b) b.innerHTML = `${ic("play")}Start`; };
    dripStop = stop;
    $("#dg-start").addEventListener("click", () => running ? stop() : start());
    $("#dg-rate").addEventListener("input", () => { info(); if (running) { next = performance.now(); } });
    $("#dg-df").addEventListener("change", () => { store.set("dropFactor", +$("#dg-df").value); info(); calcFromVol(); });
    $("#dg-sound").addEventListener("change", e => store.set("dripSound", e.target.checked));
    const calcFromVol = () => {
      const v = parseFloat($("#dg-vol").value), m = parseFloat($("#dg-min").value), df = +$("#dg-df").value;
      const res = Calc.dripRate(v, m, df); if (res) { $("#dg-rate").value = Math.round(res.gttPerMin); info(); }
    };
    $("#dg-vol").addEventListener("input", calcFromVol); $("#dg-min").addEventListener("input", calcFromVol);
    /* tap-to-measure */
    let taps = [];
    const tapOut = () => {
      if (taps.length < 2) { $("#dg-tapout").innerHTML = taps.length ? `<span class="muted">1 drop recorded — keep tapping</span>` : ""; return; }
      const iv = taps.slice(1).map((t, i) => t - taps[i]).sort((a, b) => a - b);
      const med = iv[Math.floor(iv.length / 2)];
      const measured = 60000 / med, target = rate();
      let verdict = `<span class="muted">${taps.length} drops — ${taps.length < 6 ? "a few more for accuracy" : "measured"}</span>`;
      if (target && taps.length >= 6) {
        const diff = (measured - target) / target * 100;
        verdict = Math.abs(diff) <= 10 ? `<span class="ok-text">${ic("check")} On target (${diff >= 0 ? "+" : ""}${fmt(diff, 0)} %)</span>`
          : diff > 0 ? `<span class="bad-text">${ic("alert")} ${fmt(diff, 0)} % too fast — close the roller clamp slightly</span>`
          : `<span class="warn-text">${ic("alert")} ${fmt(-diff, 0)} % too slow — open the roller clamp slightly</span>`;
      }
      $("#dg-tapout").innerHTML = `<div class="big">${fmt(measured, 0)}/min</div>${verdict}`;
    };
    $("#dg-tap").addEventListener("pointerdown", e => {
      e.preventDefault();
      const now = performance.now();
      if (taps.length && now - taps[taps.length - 1] > 20000) taps = [];
      taps.push(now); if (taps.length > 16) taps.shift(); tapOut();
      const b = $("#dg-tap"); b.classList.remove("hit"); void b.offsetWidth; b.classList.add("hit");
    });
    $("#dg-tapreset").addEventListener("click", () => { taps = []; tapOut(); });
    /* 15-second count */
    let t15 = null;
    $("#dg-15").addEventListener("click", () => {
      clearInterval(t15); let left = 15; $("#dg-15in").hidden = true; $("#dg-15out").textContent = "Count now… 15";
      click();
      t15 = setInterval(() => {
        if (!$("#dg-15out")) { clearInterval(t15); return; }
        left--; $("#dg-15out").textContent = left > 0 ? `Count now… ${left}` : "Stop. How many drops?";
        if (left <= 0) { clearInterval(t15); click(); $("#dg-15in").hidden = false; $("#dg-15n").focus(); }
      }, 1000);
    });
    $("#dg-15n").addEventListener("input", e => {
      const n = parseFloat(e.target.value), target = rate(); if (!(n >= 0)) { $("#dg-15res").textContent = ""; return; }
      const per = n * 4; let s = `= ${fmt(per, 0)} drops/min`;
      if (target) { const diff = (per - target) / target * 100; s += Math.abs(diff) <= 10 ? " — on target" : diff > 0 ? ` — ${fmt(diff, 0)} % fast` : ` — ${fmt(-diff, 0)} % slow`; }
      $("#dg-15res").textContent = s;
    });
    info();
  }

  /* =========================================================
     Dose schedules
     ========================================================= */
  const scheds = {
    list() { return store.get("schedules", []); },
    save(l) { store.set("schedules", l); updateDueBadge(); },
  };
  const regById = (id) => REGIMENS.find(x => x.id === id);
  function buildDoses(reg, weight, hoursExtra = 0) {
    const out = [];
    for (const d of reg.doses || []) out.push({ at: d.at, label: d.label, spec: d.perKgOverride ? { ...reg.dose, perKg: d.perKgOverride, max: d.maxOverride ?? reg.dose?.max } : reg.dose, text: d.text || reg.fixedText, note: d.note });
    if (reg.every) {
      const from = reg.from ?? (reg.doses?.length ? reg.every : 0);
      for (let h = from; h <= reg.until + hoursExtra; h += reg.every) out.push({ at: h, label: reg.repeatLabel, spec: reg.dose, text: reg.repeatText || reg.fixedText, note: reg.repeatNote });
    }
    if (reg.extra) for (let h = 0; h <= reg.extra.until + hoursExtra; h += reg.extra.every) out.push({ at: h, label: reg.extra.label, spec: reg.extra.dose });
    return out.sort((a, b) => a.at - b.at || a.label.localeCompare(b.label)).map((d, i) => {
      let amount = d.text || "";
      if (d.spec && weight) { const r = computeDose(d.spec, weight); if (r) amount = doseLine(r, d.spec) + (r.capped ? " (max)" : ""); }
      return { idx: i, at: d.at, label: d.label, amount, note: d.note || "" };
    });
  }
  const L = (s) => window.I18N ? I18N.t(s) : s;
  const timeStr = (ms) => new Date(ms).toLocaleTimeString([], window.I18N ? I18N.timeOpts() : { hour: "2-digit", minute: "2-digit" });
  const dayStr = (ms) => { const d = new Date(ms), t = new Date(); const diff = Math.round((new Date(d.toDateString()) - new Date(t.toDateString())) / 864e5); return diff === 0 ? "Today" : diff === 1 ? "Tomorrow" : diff === -1 ? "Yesterday" : (window.EthCal && EthCal.enabled() ? EthCal.format(d, window.I18N?.lang) : d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" })); };
  const untilStr = (ms) => { const m = Math.round((ms - Date.now()) / 60000); if (Math.abs(m) < 1) return "now"; const a = Math.abs(m), s = a >= 60 ? `${Math.floor(a / 60)} h ${a % 60} min` : `${a} min`; return m > 0 ? `in ${s}` : `${s} overdue`; };
  function schedState(s) {
    const reg = regById(s.regimen); if (!reg) return null;
    // A late dose pushes the rest of its series back by the same delay, so the
    // interval after it is never shorter than prescribed. Early or withheld doses do not pull later ones forward.
    const shift = {};
    const doses = buildDoses(reg, s.weight, s.extraHours || 0).map(d => {
      const series = reg.extra && d.label === reg.extra.label ? "extra" : "main";
      const scheduled = s.start + d.at * 3600e3;
      const rec = s.log?.[d.idx + "@" + d.at];
      const due = scheduled + (shift[series] || 0);
      if (rec && rec.status === "given") shift[series] = Math.max(shift[series] || 0, rec.at - scheduled);
      return { ...d, scheduled, due, rec, shifted: due !== scheduled };
    });
    const pending = doses.filter(d => !d.rec);
    const next = pending[0] || null;
    return { reg, doses, next, overdue: pending.filter(d => d.due < Date.now() - 5 * 60e3).length, dueSoon: pending.filter(d => d.due <= Date.now() + 15 * 60e3).length };
  }
  function updateDueBadge() {
    const n = scheds.list().reduce((acc, s) => { const st = schedState(s); return acc + (st ? st.dueSoon : 0); }, 0);
    document.querySelectorAll("[data-due-badge]").forEach(b => { b.textContent = n; b.hidden = n === 0; });
  }
  let lastAlert = store.get("lastAlert", {});
  function checkDue() {
    updateDueBadge();
    for (const s of scheds.list()) {
      const st = schedState(s); if (!st || !st.next) continue;
      const key = s.id + ":" + st.next.idx + "@" + st.next.at;
      if (st.next.due <= Date.now() && !lastAlert[key]) {
        lastAlert[key] = Date.now(); store.set("lastAlert", lastAlert);
        const msg = `${st.reg.name.split(" — ")[0]} due for ${s.label || "patient"}: ${st.next.amount || st.next.label}`;
        toast(msg);
        try { if (store.get("notify", false) && "Notification" in window && Notification.permission === "granted") new Notification("MedBridge — dose due", { body: msg, tag: key }); } catch {}
      }
    }
  }
  setInterval(checkDue, 30000);

  function viewSchedules(main, r) {
    const pre = r.q.regimen || "";
    const bedId = r.q.bed || "", preLabel = r.q.label || "", preW = parseFloat(r.q.w) || null;
    const draw = () => {
      const list = scheds.list();
      main.innerHTML = `
        <h1>${ic("clock")} Dose schedules</h1>
        <p class="text-2" style="max-width:64ch">Start a schedule when you give the first dose. It lists every due time, the dose for the patient's weight, and the checks to do before each dose. Reminders work while MedBridge is open on this device.</p>
        <div class="card">
          <h3>Start a schedule</h3>
          <div class="field"><label for="sc-reg">Regimen</label><select id="sc-reg">${REGIMENS.map(g => `<option value="${g.id}" ${g.id === pre ? "selected" : ""}>${esc(g.name)}</option>`).join("")}</select></div>
          <p id="sc-use" class="small muted" style="margin:-.3rem 0 .6rem"></p>
          <div class="inline">
            <div class="field"><label for="sc-label">Bed or initials (not full name)</label><input id="sc-label" maxlength="24" placeholder="e.g. Bed 4, A.K." value="${esc(preLabel)}"></div>
            <div class="field" id="sc-wf"><label for="sc-w">Weight (kg)</label><input id="sc-w" type="number" inputmode="decimal" min="0.3" max="250" step="0.1" value="${preW ?? patient.weight ?? ""}"></div>
          </div>
          ${bedId ? `<p class="small muted" style="margin:-.3rem 0 .6rem">${ic("ward")} Linked to the ward board: the schedule will show on this bed.</p>` : ""}
          <div class="field"><label for="sc-start">First dose given at</label><input id="sc-start" type="datetime-local"></div>
          <div class="row"><button type="button" class="btn" id="sc-go">${ic("play")}Start schedule</button>
            <label class="toggle-inline"><input type="checkbox" id="sc-notify" ${store.get("notify", false) ? "checked" : ""}> System notifications</label></div>
        </div>
        ${list.length ? "" : `<p class="empty">No active schedules.</p>`}
        <div id="sc-list">${list.map(schedCard).join("")}</div>`;
      const now = new Date(); now.setSeconds(0, 0);
      $("#sc-start").value = new Date(now - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
      const syncReg = () => { const g = regById($("#sc-reg").value); $("#sc-use").textContent = `${g.use}. ${g.extendable || ""}`; $("#sc-wf").hidden = !g.weightBased; };
      $("#sc-reg").addEventListener("change", syncReg); syncReg();
      $("#sc-notify").addEventListener("change", async e => {
        if (e.target.checked && "Notification" in window) {
          const p = await Notification.requestPermission().catch(() => "denied");
          if (p !== "granted") { e.target.checked = false; toast("Notifications were not allowed on this device.", true); return; }
        }
        store.set("notify", e.target.checked);
      });
      $("#sc-go").addEventListener("click", () => {
        const g = regById($("#sc-reg").value), w = parseFloat($("#sc-w").value);
        if (g.weightBased && !(w > 0 && w < 250)) { toast("Enter the patient's weight.", true); return; }
        const start = new Date($("#sc-start").value).getTime();
        if (!isFinite(start)) { toast("Choose the time of the first dose.", true); return; }
        const s = { id: Math.random().toString(36).slice(2, 10), regimen: g.id, label: $("#sc-label").value.trim(), weight: g.weightBased ? w : null, start, log: {}, extraHours: 0, created: Date.now(), ...(bedId ? { bed: bedId } : {}) };
        // the form records when the FIRST dose was given, so every dose due at that moment counts as given
        for (const d of buildDoses(g, s.weight).filter(d => d.at === 0)) s.log[d.idx + "@" + d.at] = { status: "given", at: start };
        const l = scheds.list(); l.unshift(s); scheds.save(l); toast("Schedule started."); draw();
      });
      bindList();
    };
    const schedCard = (s) => {
      const st = schedState(s); if (!st) return "";
      const n = st.next;
      const status = !n ? "done" : n.due < Date.now() - 5 * 60e3 ? "overdue" : n.due <= Date.now() + 15 * 60e3 ? "due" : "ok";
      return `<div class="card sched ${status}" data-sid="${s.id}">
        <div class="sched-head">
          <div><h3 style="margin:0">${esc(st.reg.name)}</h3>
            <div class="small muted">${s.label ? esc(s.label) + " · " : ""}${s.weight ? fmt(s.weight, 1) + " kg · " : ""}started ${dayStr(s.start)} ${timeStr(s.start)}</div></div>
          <div class="sched-next">${n ? `<span class="sched-when">${untilStr(n.due)}</span><span class="small">${n.label} at ${timeStr(n.due)}</span>` : `<span class="sched-when">Complete</span>`}</div>
        </div>
        ${n ? `<div class="sched-now"><b>${esc(n.label)}${n.amount ? ": " + esc(n.amount) : ""}</b>${n.note ? ` <span class="muted">${esc(n.note)}</span>` : ""}
          <div class="checks">${st.reg.checks.map((c, i) => `<label><input type="checkbox" data-check="${i}"> ${esc(c)}</label>`).join("")}</div>
          ${HIGH_ALERT.includes(st.reg.drug) ? `<div class="field dc-field"><label for="dc-${s.id}">${ic("users")} High-alert medicine: second checker's initials</label><input id="dc-${s.id}" data-checker maxlength="12" placeholder="e.g. M.T." autocomplete="off"></div>` : ""}
          <div class="row"><button type="button" class="btn sm" data-give="${n.idx}@${n.at}">${ic("check")}Given now</button><button type="button" class="btn ghost sm" data-withhold="${n.idx}@${n.at}">Withheld</button></div>
          <p class="small muted" style="margin:.4rem 0 0">${esc(st.reg.ifFail)}</p></div>` : ""}
        <details><summary class="small">All doses (${st.doses.length})</summary>
          <table class="plain small sched-table"><tr><th>Due</th><th>Dose</th><th>Record</th></tr>
          ${st.doses.map(d => `<tr class="${d.rec ? (d.rec.status === "withheld" ? "withheld" : "given") : d.due < Date.now() - 5 * 60e3 ? "late" : ""}"><td>${dayStr(d.due)} ${timeStr(d.due)}${d.shifted && !d.rec ? ` <span class="muted" title="Moved later because an earlier dose was given late">(moved)</span>` : ""}</td><td>${esc(d.label)}${d.amount ? ": " + esc(d.amount) : ""}</td><td>${d.rec ? `${d.rec.status === "withheld" ? "Withheld" : "Given"} ${timeStr(d.rec.at)}${d.rec.checkedBy ? ` · checked ${esc(d.rec.checkedBy)}` : ""}${d.rec.reason ? " — " + esc(d.rec.reason) : ""}` : "—"}</td></tr>`).join("")}</table>
        </details>
        <div class="row" style="margin-top:.6rem">
          ${st.reg.every ? `<button type="button" class="btn ghost sm" data-extend>+ ${st.reg.every >= 4 ? 24 : 6} h</button>` : ""}
          <a class="btn ghost sm" href="#/drug/${st.reg.drug}">Drug page</a>
          <button type="button" class="btn ghost sm" data-print-sched>${ic("print")}Print chart</button>
          ${n ? `<button type="button" class="btn ghost sm" data-share-text="${esc(`MedBridge schedule: ${st.reg.name}${s.label ? " (" + s.label + ")" : ""}\nNext: ${n.label}${n.amount ? " " + n.amount : ""} at ${timeStr(n.due)}\nChecks: ${st.reg.checks.join("; ")}\nDraft reference, verify against protocol.`)}">${ic("share")}Share</button>` : ""}
          <button type="button" class="btn ghost sm" data-end>End schedule</button>
        </div>
        <p class="small muted" style="margin:.4rem 0 0">${esc(st.reg.ref)}</p>
      </div>`;
    };
    const bindList = () => {
      const listEl = $("#sc-list"); if (!listEl) return;
      listEl.addEventListener("click", e => {
        const card = e.target.closest("[data-sid]"); if (!card) return;
        const l = scheds.list(), s = l.find(x => x.id === card.dataset.sid); if (!s) return;
        const give = e.target.closest("[data-give]"), wh = e.target.closest("[data-withhold]");
        if (give) {
          const st = schedState(s);
          const unticked = [...card.querySelectorAll("[data-check]")].filter(c => !c.checked).length;
          if (unticked && !confirm(L(`${unticked} pre-dose check${unticked === 1 ? " is" : "s are"} not ticked. Record the dose as given anyway?`))) return;
          const checkerEl = card.querySelector("[data-checker]"), checker = checkerEl ? checkerEl.value.trim() : "";
          if (checkerEl && !checker && !confirm(L("This is a high-alert medicine and no second checker is recorded. Record the dose as given anyway?"))) { checkerEl.focus(); return; }
          s.log[give.dataset.give] = { status: "given", at: Date.now(), ...(checker ? { checkedBy: checker.slice(0, 12) } : {}) };
          scheds.save(l); toast(`Recorded: ${st.next.label} given.`); draw();
        }
        if (wh) {
          const reason = prompt(L("Why was this dose withheld? (e.g. reflexes absent, RR 12)")); if (reason === null) return;
          s.log[wh.dataset.withhold] = { status: "withheld", at: Date.now(), reason: reason.slice(0, 120) };
          scheds.save(l); toast("Recorded as withheld."); draw();
        }
        if (e.target.closest("[data-extend]")) { const reg = regById(s.regimen); s.extraHours = (s.extraHours || 0) + (reg.every >= 4 ? 24 : 6); scheds.save(l); draw(); }
        if (e.target.closest("[data-end]") && confirm(L("End this schedule and remove it from this device?"))) { scheds.save(l.filter(x => x.id !== s.id)); draw(); }
        if (e.target.closest("[data-print-sched]")) { document.body.classList.add("print-sched"); card.classList.add("print-me"); window.print(); card.classList.remove("print-me"); document.body.classList.remove("print-sched"); }
      });
    };
    draw();
    const live = setInterval(() => { if (!location.hash.startsWith("#/schedules")) { clearInterval(live); return; } document.querySelectorAll(".sched").forEach(card => { const s = scheds.list().find(x => x.id === card.dataset.sid); const st = s && schedState(s); if (st && st.next) { const w = card.querySelector(".sched-when"); if (w) w.textContent = untilStr(st.next.due); } }); }, 30000);
  }

  /* =========================================================
     Never mix
     ========================================================= */
  function viewCompat(main) {
    const names = [...DRUG_DB].sort((a, b) => a.name.localeCompare(b.name));
    const label = (id) => id === "*" ? "any other drug or fluid" : (drugById(id)?.name.split(" (")[0] || id);
    const ruleHtml = (c) => `<div class="card compat ${c.severity}">
      <div class="row" style="justify-content:space-between"><h3 style="margin:0">${c.a.map(label).join(" / ")} <span class="muted">+</span> ${c.b.map(label).join(" / ")}</h3><span class="chip ${c.severity === "never" ? "bad" : "warn"}">${c.severity === "never" ? "Never mix" : "Caution"}</span></div>
      <p style="margin:.5rem 0 .3rem">${esc(c.what)}</p><p style="margin:0"><strong>Do:</strong> ${esc(c.do)}</p><p class="small muted" style="margin:.4rem 0 0">${esc(c.ref)}</p></div>`;
    main.innerHTML = `
      <h1>${ic("swap")} Never mix</h1>
      <p class="text-2" style="max-width:64ch">Line, syringe and fluid combinations that cause precipitation, inactivation or harm. <strong>If two drugs are not listed here, that does not mean they are compatible</strong> — when in doubt, use separate lines and flush with saline between drugs.</p>
      <div class="card">
        <h3>Check two drugs</h3>
        <div class="inline">
          <div class="field"><label for="cp-a">Drug or fluid 1</label><select id="cp-a"><option value="">Choose…</option>${names.map(d => `<option value="${d.id}">${esc(d.name)}</option>`).join("")}</select></div>
          <div class="field"><label for="cp-b">Drug or fluid 2</label><select id="cp-b"><option value="">Choose…</option>${names.map(d => `<option value="${d.id}">${esc(d.name)}</option>`).join("")}</select></div>
        </div>
        <div id="cp-out"></div>
      </div>
      <h2>All entries</h2>
      ${COMPAT.filter(c => c.severity === "never").map(ruleHtml).join("")}
      ${COMPAT.filter(c => c.severity !== "never").map(ruleHtml).join("")}
      <p class="small muted">Draft reference. Check your local IV compatibility guide or pharmacist.</p>`;
    const check = () => {
      const a = $("#cp-a").value, b = $("#cp-b").value, out = $("#cp-out");
      if (!a || !b) { out.innerHTML = ""; return; }
      const hit = COMPAT.filter(c => (c.a.includes(a) && (c.b.includes(b) || c.b.includes("*"))) || (c.a.includes(b) && (c.b.includes(a) || c.b.includes("*"))));
      out.innerHTML = hit.length ? hit.map(ruleHtml).join("")
        : `<div class="callout info">${ic("info")}<div>No incompatibility recorded here for this pair. <strong>That is not proof they are compatible.</strong> Use separate lines or flush with 0.9 % saline between them.</div></div>`;
    };
    $("#cp-a").addEventListener("change", check); $("#cp-b").addEventListener("change", check);
  }

  /* =========================================================
     Tools hub
     ========================================================= */
  function viewTools(main) {
    const due = scheds.list().reduce((n, s) => n + (schedState(s)?.dueSoon || 0), 0);
    const T = [
      ["#/ward", "ward", "Ward board", "Every bed on one screen with acuity, doses due and tasks, and an I-PASS shift handover.", ""],
      ["#/optics", "eye", "Optics and refraction", "Transpose a prescription, work out the reading add, convert visual acuity and size a magnifier.", ""],
      ["#/growth", "baby", "Child growth", "WHO z-scores and centiles for weight, height, MUAC and head circumference, with growth charts.", ""],
      ["#/pregnancy", "calendar", "Pregnancy dating wheel", "Due date and gestational age in Ethiopian and Gregorian dates, milestones, ANC contacts and fetal weight.", ""],
      ["#/pph", "drop", "PPH first response", "Measured blood loss, the six-part bundle on a 15-minute clock, and the tranexamic acid window.", "emergency"],
      ["#/resus", "zap", "Emergency drug card", "Every resuscitation dose and volume for one weight. Printable.", "emergency"],
      ["#/drip", "drop", "Drip guide", "Metronome at the target drop rate, plus tap-to-measure the real rate.", ""],
      ["#/schedules", "clock", "Dose schedules", `Clock times, pre-dose checks and reminders for repeat regimens.${due ? ` <b class="bad-text">${due} due</b>` : ""}`, ""],
      ["#/compat", "swap", "Never mix", "Drugs and fluids that must not share a line or syringe.", ""],
      ["#/calc", "calc", "Calculators", "Drip rate, dose to drops, mg/kg, dilution, Plan C, child weight, units.", ""],
      ["#/techniques", "tool", "No-pump techniques", "Burettes, time-taping, countable concentrations, peripheral pressors.", ""],
      ["#/calc?tab=ciwa", "clipboard", "Alcohol withdrawal score", "CIWA-Ar scoring with the action for each score and a record of scores over time.", ""],
      ["#/community", "chat", "Network", "Practice notes and stock-outs reported by colleagues across Ethiopia.", ""],
      ["#/interactions", "shield", "Drug interactions", "Check a patient's medicines against each other for harmful combinations.", ""],
      ["#/newborn", "baby", "Newborn doses", "Doses and intervals for one baby by weight, gestation and age in days.", ""],
      ["#/calc?tab=fluids", "drop", "Fluids and blood", "Maintenance, newborn fluids, burns, transfusion volume and oxygen cylinder time.", ""],
      ["#/calc?tab=kidney", "calc", "Kidney function", "Creatinine clearance, then dose changes for each drug.", ""],
      ["#/charts", "print", "Wall charts", "Printable drip-rate tables, case protocols and ward drug cards.", ""],
      ["#/quiz", "help", "Practice quiz", "Dose maths, first-line drugs, never-mix and substitutes, with explanations.", ""],
      ["#/review", "check", "Clinical sign-off", "For verified reviewers: check each drug entry and sign it off.", ""]
    ];
    main.innerHTML = `<h1>Tools</h1>
      <div class="tools-grid">${T.map(([h, i, t, d, cls]) => `<a class="card tool ${cls}" href="${h}"><span class="tool-ic">${ic(i)}</span><div><h3 style="margin:0 0 .2rem">${t}</h3><p class="small text-2" style="margin:0">${d}</p></div></a>`).join("")}</div>
      <div class="card" id="install-card" hidden><h3>${ic("pill")} Install MedBridge</h3><p class="small text-2">Add it to your home screen: it opens like an app and works offline on the ward.</p><button type="button" class="btn sm" id="install-btn">Install</button></div>`;
    if (deferredInstall) { $("#install-card").hidden = false; $("#install-btn").addEventListener("click", async () => { deferredInstall.prompt(); await deferredInstall.userChoice.catch(() => {}); deferredInstall = null; $("#install-card").hidden = true; }); }
  }

  let deferredInstall = null;
  window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredInstall = e; });
  window.addEventListener("hashchange", () => { if (!location.hash.startsWith("#/drip")) stopDrip(); });

  /* ---------- global wiring ---------- */
  document.addEventListener("click", e => { if (e.target.closest("[data-open-patient]")) { e.preventDefault(); openPatientDialog(); } });

  return {
    patient, syncPatientChip, openPatientDialog, patientDoseCard, caseDoseInline,
    HIGH_ALERT, computeDose, doseLine, unitOf, scheds, schedState, regById, timeStr, untilStr, dayStr,
    favs, recent, starButton, bindStars, shortcutsHtml, fuzzyMatch, caseText,
    alternativesHtml, updateDueBadge, checkDue,
    views: { resus: viewResus, drip: viewDrip, schedules: viewSchedules, compat: viewCompat, tools: viewTools },
    regimensForDrug: (id) => REGIMENS.filter(g => g.drug === id || (g.extra && g.id === "ampi-genta" && id === "gentamicin")),
    regimensForCase: (id) => REGIMENS.filter(g => g.case === id),
    _test: { computeDose, buildDoses, fuzzyMatch, schedState }
  };
};
