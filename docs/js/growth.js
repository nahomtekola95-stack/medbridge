/* ============================================================
   MedBridge child growth: anthropometry and growth charts.
   Z-scores and centiles from the WHO Child Growth Standards (0–5 years)
   and the WHO Growth reference 5–19 years, using the official LMS tables
   in growth-data.js.
   Method: WHO Child Growth Standards — head circumference-for-age,
   arm circumference-for-age, triceps skinfold-for-age and subscapular
   skinfold-for-age: methods and development (WHO 2007), "Computation of
   centiles and z-scores": the LMS z-score, and beyond ±3 SD the fixed-SD
   correction using the distance between the 2 and 3 SD cut-offs.
   Pure calculations live on window.Growth.calc for tests. DRAFT until reviewed.
   ============================================================ */
(function () {
  const parsed = {};
  function table(key) {
    if (parsed[key]) return parsed[key];
    const raw = (window.WHO_LMS || {})[key];
    if (!raw) return null;
    return (parsed[key] = raw.split(";").map(r => r.split(",").map(Number)));
  }
  /** L, M and S at t, linearly interpolated between table rows. */
  function lms(indicator, sex, t) {
    const tbl = table(indicator + "_" + (sex === "female" ? "g" : "b"));
    if (!tbl || !(t >= 0)) return null;
    if (t < tbl[0][0] || t > tbl[tbl.length - 1][0]) return null;
    let lo = 0, hi = tbl.length - 1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (tbl[mid][0] <= t) lo = mid; else hi = mid; }
    const [t0, L0, M0, S0] = tbl[lo], [t1, L1, M1, S1] = tbl[hi];
    const f = t1 === t0 ? 0 : (t - t0) / (t1 - t0);
    return { L: L0 + f * (L1 - L0), M: M0 + f * (M1 - M0), S: S0 + f * (S1 - S0) };
  }
  const value = (L, M, S, z) => Math.abs(L) > 1e-9 ? M * Math.pow(1 + L * S * z, 1 / L) : M * Math.exp(S * z);
  const rawZ = (v, L, M, S) => Math.abs(L) > 1e-9 ? (Math.pow(v / M, L) - 1) / (L * S) : Math.log(v / M) / S;
  /** WHO z-score: the LMS value inside ±3 SD, the fixed-SD extension outside it. */
  function zscore(v, { L, M, S }, adjust = true) {
    const z = rawZ(v, L, M, S);
    if (!adjust || Math.abs(z) <= 3 || !isFinite(z)) return z;
    if (z > 3) { const sd3 = value(L, M, S, 3), sd23 = sd3 - value(L, M, S, 2); return 3 + (v - sd3) / sd23; }
    const sd3n = value(L, M, S, -3), sd23n = value(L, M, S, -2) - sd3n;
    return -3 + (v - sd3n) / sd23n;
  }
  const erf = (x) => { const s = x < 0 ? -1 : 1; x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x); return s * y; };
  const centile = (z) => 100 * 0.5 * (1 + erf(z / Math.SQRT2));

  /* which table, over what range, and whether the ±3 SD correction applies */
  const IND = {
    wfa:  { key: "wfa",  unit: "kg", label: "Weight-for-age", axis: "day", max: 1856, adjust: true },
    lhfa: { key: "lhfa", unit: "cm", label: "Length/height-for-age", axis: "day", max: 1856, adjust: false },
    hcfa: { key: "hcfa", unit: "cm", label: "Head circumference-for-age", axis: "day", max: 1856, adjust: false },
    wfl:  { key: "wfl",  unit: "kg", label: "Weight-for-length", axis: "cm", min: 45, max: 110, adjust: true },
    wfh:  { key: "wfh",  unit: "kg", label: "Weight-for-height", axis: "cm", min: 65, max: 120, adjust: true },
    acfa: { key: "acfa", unit: "cm", label: "MUAC-for-age", axis: "month", min: 3, max: 60, adjust: true },
    wfa5: { key: "wfa5", unit: "kg", label: "Weight-for-age (5–10 y)", axis: "month", min: 61, max: 120, adjust: false },
    hfa5: { key: "hfa5", unit: "cm", label: "Height-for-age (5–19 y)", axis: "month", min: 61, max: 228, adjust: false },
    bfa5: { key: "bfa5", unit: "kg/m²", label: "BMI-for-age (5–19 y)", axis: "month", min: 61, max: 228, adjust: false }
  };
  const bmi = (kg, cm) => (kg > 0 && cm > 0) ? kg / Math.pow(cm / 100, 2) : null;
  /** Mosteller body surface area. */
  const bsa = (kg, cm) => (kg > 0 && cm > 0) ? Math.sqrt(kg * cm / 3600) : null;

  /** One measurement set → every indicator that applies at that age. */
  function assess({ sex, ageDays, weight, height, lying, muac, hc, oedema }) {
    const out = {};
    const add = (id, v, t) => { const p = lms(IND[id].key, sex, t); if (!p || !(v > 0)) return; const z = zscore(v, p, IND[id].adjust); out[id] = { z, centile: centile(z), median: p.M, value: v, ...IND[id] }; };
    const months = ageDays / 30.4375;
    if (ageDays != null && ageDays >= 0) {
      if (ageDays <= 1856) { add("wfa", weight, ageDays); add("lhfa", height, ageDays); add("hcfa", hc, ageDays); }
      else { add("wfa5", weight, months); add("hfa5", height, months); const b = bmi(weight, height); if (b) add("bfa5", b, months); }
      if (months >= 3 && months <= 60) add("acfa", muac, months);
    }
    // weight-for-length under 2 years (lying), weight-for-height from 2 years (standing)
    if (height > 0 && weight > 0) {
      const useLength = lying != null ? lying : (ageDays != null && ageDays < 731);
      if (useLength && height >= 45 && height <= 110) add("wfl", weight, Math.round(height * 2) / 2);
      else if (!useLength && height >= 65 && height <= 120) add("wfh", weight, Math.round(height * 2) / 2);
    }
    out.bmi = bmi(weight, height);
    out.bsa = bsa(weight, height);
    out.flags = classify(out, { muac, ageDays, oedema });
    return out;
  }

  /** WHO classifications used in Ethiopian practice (SAM/MAM, stunting, underweight, overweight). */
  function classify(a, { muac, ageDays, oedema }) {
    const f = [];
    const wh = a.wfl || a.wfh;
    const months = ageDays != null ? ageDays / 30.4375 : null;
    if (oedema) f.push({ level: "sam", title: "Bilateral pitting oedema: severe acute malnutrition", action: "Treat as SAM whatever the measurements show. Admit for inpatient care, check glucose, keep warm, give routine antibiotics and start F-75.", link: "#/case/malnutrition" });
    if (wh) {
      if (wh.z < -3) f.push({ level: "sam", title: "Severe acute malnutrition (weight-for-height below −3 SD)", action: "Admit for inpatient care with F-75, routine antibiotics, glucose and warmth. Plan C fluid rates are dangerous: use ReSoMal unless shocked.", link: "#/calc?tab=planc" });
      else if (wh.z < -2) f.push({ level: "mam", title: "Moderate acute malnutrition (weight-for-height −3 to −2 SD)", action: "Supplementary feeding, treat infection, review in 1–2 weeks.", link: "#/case/malnutrition" });
      else if (wh.z > 3) f.push({ level: "warn", title: "Obesity (weight-for-height above +3 SD)", action: "Check feeding and refer for assessment." });
      else if (wh.z > 2) f.push({ level: "warn", title: "Overweight (weight-for-height above +2 SD)", action: "Counsel on feeding; recheck growth." });
    }
    if (muac > 0 && months >= 6 && months <= 59) {
      if (muac < 11.5) f.push({ level: "sam", title: `MUAC ${muac.toFixed(1)} cm: severe acute malnutrition`, action: "Admit or start outpatient therapeutic care per the national protocol; appetite test with RUTF.", link: "#/case/malnutrition" });
      else if (muac < 12.5) f.push({ level: "mam", title: `MUAC ${muac.toFixed(1)} cm: moderate acute malnutrition`, action: "Supplementary feeding and review.", link: "#/case/malnutrition" });
    }
    const ha = a.lhfa || a.hfa5;
    if (ha) {
      if (ha.z < -3) f.push({ level: "sam", title: "Severe stunting (length/height-for-age below −3 SD)", action: "Long-standing undernutrition: nutrition counselling, look for chronic illness, HIV and TB." });
      else if (ha.z < -2) f.push({ level: "mam", title: "Stunting (length/height-for-age below −2 SD)", action: "Nutrition counselling and follow-up; check for repeated infections." });
    }
    const wa = a.wfa || a.wfa5;
    if (wa) {
      if (wa.z < -3) f.push({ level: "sam", title: "Severely underweight (weight-for-age below −3 SD)", action: "Assess for acute malnutrition and illness." });
      else if (wa.z < -2) f.push({ level: "mam", title: "Underweight (weight-for-age below −2 SD)", action: "Assess feeding and illness; plot growth over time." });
    }
    if (a.bfa5) {
      if (a.bfa5.z < -3) f.push({ level: "sam", title: "Severe thinness (BMI-for-age below −3 SD)", action: "Assess for illness and food insecurity; refer." });
      else if (a.bfa5.z < -2) f.push({ level: "mam", title: "Thinness (BMI-for-age below −2 SD)", action: "Nutrition assessment and follow-up." });
      else if (a.bfa5.z > 2) f.push({ level: "warn", title: "Obesity (BMI-for-age above +2 SD)", action: "Lifestyle counselling; screen for diabetes and hypertension." });
      else if (a.bfa5.z > 1) f.push({ level: "warn", title: "Overweight (BMI-for-age above +1 SD)", action: "Lifestyle counselling." });
    }
    if (a.hcfa) {
      if (a.hcfa.z < -2) f.push({ level: "warn", title: "Small head circumference (below −2 SD)", action: "Measure again, plot over time and assess development." });
      else if (a.hcfa.z > 2) f.push({ level: "warn", title: "Large head circumference (above +2 SD)", action: "Check for raised pressure and hydrocephalus; measure again and plot." });
    }
    if (!f.length) f.push({ level: "ok", title: "No growth flag from these measurements", action: "Plot every visit: the trend matters more than one point." });
    return f;
  }
  const calc = { lms, zscore, rawZ, value, centile, assess, classify, bmi, bsa, IND };
  window.Growth = { calc };

  /* =========================================================
     View
     ========================================================= */
  window.GrowthView = function (ctx) {
    const { $, esc, ic, toast, render, FX, shareButton } = ctx;
    const store = {
      get(k, def) { try { const v = localStorage.getItem("mb:" + k); return v == null ? def : JSON.parse(v); } catch { return def; } },
      set(k, v) { try { localStorage.setItem("mb:" + k, JSON.stringify(v)); } catch {} }
    };
    const fmt = (n, d = 1) => (n == null || !isFinite(n)) ? "—" : (+Calc.round(n, d)).toLocaleString();
    const zTxt = (z) => (z > 0 ? "+" : "") + z.toFixed(2);
    const LEVEL = { sam: "bad", mam: "warn", warn: "warn", ok: "ok" };
    const dayMs = 864e5;
    const ageFrom = (birth, on) => Math.round((new Date(on).setHours(0, 0, 0, 0) - new Date(birth).setHours(0, 0, 0, 0)) / dayMs);
    const ageText = (days) => days == null ? "" : days < 31 ? `${days} days` : days < 731 ? `${Math.floor(days / 30.4375)} months` : `${Math.floor(days / 365.25)} y ${Math.round((days % 365.25) / 30.4375)} m`;
    const isoToday = () => { const d = new Date(); return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
    const kids = () => store.get("growthKids", []);
    const saveKids = (l) => store.set("growthKids", l);

    function chart(ind, sex, visits, birth) {
      const cfg = IND[ind]; if (!cfg) return "";
      const W = 680, H = 420, padL = 46, padR = 16, padT = 14, padB = 40;
      const tbl = table(cfg.key + "_" + (sex === "female" ? "g" : "b")); if (!tbl) return "";
      const t0 = cfg.min ?? tbl[0][0], t1 = cfg.max ?? tbl[tbl.length - 1][0];
      const pts = [];
      for (const v of visits) {
        const t = cfg.axis === "day" ? v.ageDays : cfg.axis === "month" ? v.ageDays / 30.4375 : (ind === "wfl" || ind === "wfh" ? v.height : null);
        const val = cfg.unit === "kg" && ind !== "bfa5" ? v.weight : ind === "bfa5" ? bmi(v.weight, v.height) : ind === "acfa" ? v.muac : ind === "hcfa" ? v.hc : v.height;
        if (t >= t0 && t <= t1 && val > 0) pts.push({ t, val, at: v.at });
      }
      const zs = [-3, -2, 0, 2, 3];
      const curves = zs.map(z => { const arr = []; const step = (t1 - t0) / 120; for (let t = t0; t <= t1 + 1e-9; t += step) { const p = lms(cfg.key, sex, t); if (p) arr.push([t, value(p.L, p.M, p.S, z)]); } return { z, arr }; });
      const all = curves.flatMap(c => c.arr.map(p => p[1])).concat(pts.map(p => p.val));
      const yMin = Math.min(...all) * 0.96, yMax = Math.max(...all) * 1.02;
      const X = (t) => padL + (t - t0) / (t1 - t0) * (W - padL - padR);
      const Y = (v) => H - padB - (v - yMin) / (yMax - yMin) * (H - padT - padB);
      const path = (arr) => arr.map((p, i) => `${i ? "L" : "M"}${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join(" ");
      const xTicks = [];
      const tickStep = cfg.axis === "day" ? 182.625 : cfg.axis === "month" ? (t1 - t0 > 60 ? 24 : 12) : 10;
      for (let t = t0; t <= t1 + 1e-9; t += tickStep) xTicks.push(t);
      const xLabel = (t) => cfg.axis === "day" ? `${Math.round(t / 30.4375)}m` : cfg.axis === "month" ? (t >= 61 ? `${Math.round(t / 12)}y` : `${Math.round(t)}m`) : `${Math.round(t)}`;
      const yTicks = 6, yStep = (yMax - yMin) / yTicks;
      return `<svg class="growth-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(cfg.label)} chart">
        ${Array.from({ length: yTicks + 1 }, (_, i) => { const v = yMin + i * yStep; return `<line class="grid" x1="${padL}" y1="${Y(v).toFixed(1)}" x2="${W - padR}" y2="${Y(v).toFixed(1)}"/><text class="ax" x="${padL - 6}" y="${(Y(v) + 4).toFixed(1)}" text-anchor="end">${fmt(v, v < 25 ? 1 : 0)}</text>`; }).join("")}
        ${xTicks.map(t => `<line class="grid" x1="${X(t).toFixed(1)}" y1="${padT}" x2="${X(t).toFixed(1)}" y2="${H - padB}"/><text class="ax" x="${X(t).toFixed(1)}" y="${H - padB + 16}" text-anchor="middle">${xLabel(t)}</text>`).join("")}
        ${curves.map(c => `<path class="z z${String(c.z).replace("-", "m")}" d="${path(c.arr)}"/>`).join("")}
        ${curves.map(c => `<text class="zl" x="${W - padR - 2}" y="${(Y(c.arr[c.arr.length - 1][1]) + 3).toFixed(1)}" text-anchor="end">${c.z > 0 ? "+" : ""}${c.z}</text>`).join("")}
        ${pts.length > 1 ? `<path class="kid" d="${path(pts.map(p => [p.t, p.val]))}"/>` : ""}
        ${pts.map(p => `<circle class="kidpt" cx="${X(p.t).toFixed(1)}" cy="${Y(p.val).toFixed(1)}" r="5"><title>${esc(fmt(p.val, 1) + " " + cfg.unit)}</title></circle>`).join("")}
        <text class="ax-t" x="${padL}" y="${H - 4}">${cfg.axis === "cm" ? "Length / height (cm)" : "Age"}</text>
        <text class="ax-t" x="${padL}" y="${padT - 2}">${esc(cfg.label)} (${esc(cfg.unit)})</text>
      </svg>`;
    }

    function view(main, route) {
      const st = store.get("growthState", { sex: "female", chart: "wfl" });
      const list = kids();
      const kid = list.find(k => k.id === route.q.kid) || null;
      const draw = () => {
        const visits = kid ? [...(kid.visits || [])].sort((a, b) => a.at - b.at) : [];
        const last = visits[visits.length - 1];
        const a = last ? assess({ sex: kid.sex, ageDays: last.ageDays, weight: last.weight, height: last.height, lying: last.lying, muac: last.muac, hc: last.hc, oedema: last.oedema }) : null;
        main.innerHTML = `
          <div class="resus-head"><div><h1 style="margin:0">${ic("baby")} Child growth</h1>
            <p class="text-2" style="margin:.2rem 0 0">Z-scores and centiles against the WHO standards, with growth charts you can plot visit by visit.</p></div>
            <div class="row">${kid ? `<button type="button" class="btn ghost sm" id="g-print">${ic("print")}Print</button>` : ""}<a class="btn ghost sm" href="#/growth">${ic("users")}All children</a></div></div>
          ${kid ? "" : `<div class="card"><h3>${ic("edit")} Measure a child</h3>
            <div class="inline3">
              <div class="field"><label for="g-ini">Initials (not full name)</label><input id="g-ini" maxlength="8" placeholder="e.g. S.T."></div>
              <div class="field"><label for="g-sex">Sex</label><select id="g-sex"><option value="female" ${st.sex === "female" ? "selected" : ""}>Female</option><option value="male" ${st.sex === "male" ? "selected" : ""}>Male</option></select></div>
              <div class="field"><label for="g-dob">Date of birth</label><input id="g-dob" type="date" max="${isoToday()}"></div>
            </div>
            <p class="small muted" style="margin:-.3rem 0 .6rem">No date of birth? Enter the age in months instead.</p>
            <div class="inline3">
              <div class="field"><label for="g-agem">or age (months)</label><input id="g-agem" type="number" inputmode="decimal" min="0" max="228" step="0.5"></div>
              <div class="field"><label for="g-date">Date measured</label><input id="g-date" type="date" value="${isoToday()}" max="${isoToday()}"></div>
              <div class="field"><label for="g-lying">Length or height</label><select id="g-lying"><option value="auto">By age (lying under 2 y)</option><option value="lying">Lying (length)</option><option value="standing">Standing (height)</option></select></div>
            </div>
            <div class="inline3">
              <div class="field"><label for="g-w">Weight (kg)</label><input id="g-w" type="number" inputmode="decimal" min="0.5" max="150" step="0.01"></div>
              <div class="field"><label for="g-h">Length / height (cm)</label><input id="g-h" type="number" inputmode="decimal" min="40" max="200" step="0.1"></div>
              <div class="field"><label for="g-muac">MUAC (cm)</label><input id="g-muac" type="number" inputmode="decimal" min="5" max="30" step="0.1"></div>
            </div>
            <div class="inline3">
              <div class="field"><label for="g-hc">Head circumference (cm)</label><input id="g-hc" type="number" inputmode="decimal" min="20" max="65" step="0.1"></div>
              <div class="field" style="justify-content:flex-end"><label class="toggle-inline"><input type="checkbox" id="g-oed"> Bilateral pitting oedema</label></div>
              <div class="field" style="justify-content:flex-end"><button type="button" class="btn" id="g-go">${ic("calc")}Assess growth</button></div>
            </div>
            <div id="g-out"></div></div>`}
          ${kid ? kidPanel(kid, visits, a) : ""}
          ${!kid && list.length ? `<div class="card"><h3>${ic("users")} Children on this device</h3><ul class="stock-list">${list.map(k => { const v = (k.visits || [])[k.visits.length - 1]; return `<li><a href="#/growth?kid=${k.id}"><b>${esc(k.initials || "Child")}</b></a> · ${k.sex === "female" ? "girl" : "boy"}${v ? ` · ${esc(ageText(v.ageDays))} · ${fmt(v.weight, 1)} kg` : ""} · ${(k.visits || []).length} visit${(k.visits || []).length === 1 ? "" : "s"} <button type="button" class="linkbtn danger" data-del="${k.id}">${ic("trash")}Remove</button></li>`; }).join("")}</ul>
            <p class="small muted" style="margin:.5rem 0 0">Stored only on this device, with initials. Remove a child when the record is no longer needed.</p></div>` : ""}
          <p class="small muted">WHO Child Growth Standards (0–5 years, 2006) and WHO Growth reference 5–19 years (2007). Z-score method: WHO 2007, Computation of centiles and z-scores. Draft tool: confirm against the national growth monitoring protocol.</p>`;
        bind();
      };

      function kidPanel(kid, visits, a) {
        const last = visits[visits.length - 1];
        const rows = Object.keys(IND).filter(k => a && a[k]).map(k => { const r = a[k]; const lv = r.z < -3 || r.z > 3 ? "bad" : r.z < -2 || r.z > 2 ? "warn" : "ok"; return `<tr><td>${esc(r.label)}</td><td><b>${fmt(r.value, 1)} ${esc(r.unit)}</b></td><td><span class="chip ${lv}">${zTxt(r.z)} SD</span></td><td>${r.centile < 1 ? "<1" : r.centile > 99 ? ">99" : Math.round(r.centile)}th</td><td class="small muted">median ${fmt(r.median, 1)}</td></tr>`; }).join("");
        const share = a ? `WHO growth check — ${kid.initials || "child"} (${kid.sex === "female" ? "girl" : "boy"}, ${ageText(last.ageDays)})\n${Object.keys(IND).filter(k => a[k]).map(k => `${a[k].label}: ${fmt(a[k].value, 1)} ${a[k].unit} = ${zTxt(a[k].z)} SD`).join("\n")}\n${a.flags.map(f => f.title).join("; ")}\nDraft reference, confirm against the national protocol.` : "";
        return `<div class="growth-grid"><div class="card">
            <div class="row" style="justify-content:space-between"><h3 style="margin:0">${esc(kid.initials || "Child")} · ${kid.sex === "female" ? "girl" : "boy"}${last ? ` · ${esc(ageText(last.ageDays))}` : ""}</h3>
            <div class="row">${share ? shareButton(share, "Share") : ""}<a class="btn ghost sm" href="#/growth?kid=${kid.id}&add=1" id="g-addvisit">${ic("edit")}Add visit</a></div></div>
            ${a ? `<div class="tablewrap"><table class="plain growth-table"><tbody>${rows}</tbody></table></div>
              ${a.bmi ? `<p class="small muted">BMI ${fmt(a.bmi, 1)} kg/m² · body surface area ${fmt(a.bsa, 2)} m²</p>` : ""}
              ${a.flags.map(f => `<div class="callout ${f.level === "sam" ? "danger" : f.level === "ok" ? "ok-callout" : "warn"}">${ic(f.level === "ok" ? "check" : "alert")}<div><strong>${esc(f.title)}</strong> ${esc(f.action)} ${f.link ? `<a href="${f.link}">Open</a>` : ""}</div></div>`).join("")}` : `<p class="empty">No measurements yet.</p>`}
          </div>
          <div class="card">
            <div class="row" style="justify-content:space-between"><h3 style="margin:0">${ic("calc")} Growth chart</h3>
              <select id="g-chart" aria-label="Chart" style="min-height:40px;border-radius:11px;border:1px solid var(--border-strong);background:var(--surface);padding:.3rem .6rem">${Object.entries(IND).map(([k, v]) => `<option value="${k}" ${st.chart === k ? "selected" : ""}>${esc(v.label)}</option>`).join("")}</select></div>
            <div id="g-chartbox">${chart(st.chart, kid.sex, visits, kid.dob)}</div>
            <p class="small muted">Lines are the WHO −3, −2, 0, +2 and +3 SD curves. Dots are this child's visits.</p>
          </div></div>
          ${visits.length ? `<div class="card"><h3>Visits</h3><div class="tablewrap"><table class="plain"><tr><th>Date</th><th>Age</th><th>Weight</th><th>Length/height</th><th>MUAC</th><th>HC</th><th></th></tr>
            ${visits.map(v => `<tr><td>${new Date(v.at).toLocaleDateString()}</td><td>${esc(ageText(v.ageDays))}</td><td>${fmt(v.weight, 2)}</td><td>${fmt(v.height, 1)}</td><td>${fmt(v.muac, 1)}</td><td>${fmt(v.hc, 1)}</td><td><button type="button" class="linkbtn danger" data-delvisit="${v.at}">${ic("x")}</button></td></tr>`).join("")}</table></div></div>` : ""}`;
      }

      const readForm = () => {
        const num = (id) => { const v = $("#" + id)?.value; return v === "" || v == null ? null : +v; };
        const dob = $("#g-dob")?.value, when = $("#g-date")?.value || isoToday();
        const at = new Date(when + "T00:00:00").getTime();
        let ageDays = null;
        if (dob) ageDays = ageFrom(new Date(dob + "T00:00:00"), at);
        else if (num("g-agem") != null) ageDays = Math.round(num("g-agem") * 30.4375);
        const lyingSel = $("#g-lying")?.value;
        return { ini: $("#g-ini")?.value.trim() || "", sex: $("#g-sex")?.value || "female", dob: dob ? new Date(dob + "T00:00:00").getTime() : null, at, ageDays,
          weight: num("g-w"), height: num("g-h"), muac: num("g-muac"), hc: num("g-hc"), oedema: !!$("#g-oed")?.checked,
          lying: lyingSel === "lying" ? true : lyingSel === "standing" ? false : null };
      };
      const bind = () => {
        const go = $("#g-go");
        if (go) go.onclick = () => {
          const f = readForm();
          if (f.ageDays == null || f.ageDays < 0) return toast("Enter the date of birth or the age in months.", true);
          if (f.ageDays > 228 * 30.4375) return toast("These standards cover birth to 19 years.", true);
          if (!(f.weight > 0) && !(f.height > 0) && !(f.muac > 0) && !(f.hc > 0)) return toast("Enter at least one measurement.", true);
          if (f.ini.split(/\s+/).some(p => p.replace(/[^A-Za-zሀ-፿]/g, "").length > 3)) return toast("Use initials only, not a full name.", true);
          const l = kids();
          const k = { id: Math.random().toString(36).slice(2, 10), initials: f.ini, sex: f.sex, dob: f.dob, visits: [] };
          k.visits.push({ at: f.at, ageDays: f.ageDays, weight: f.weight, height: f.height, muac: f.muac, hc: f.hc, oedema: f.oedema, lying: f.lying });
          l.unshift(k); saveKids(l.slice(0, 60)); store.set("growthState", { ...st, sex: f.sex });
          location.hash = `#/growth?kid=${k.id}`;
        };
        const sel = $("#g-chart");
        if (sel) sel.onchange = () => { store.set("growthState", { ...st, chart: sel.value }); st.chart = sel.value; $("#g-chartbox").innerHTML = chart(st.chart, kid.sex, [...(kid.visits || [])].sort((a, b) => a.at - b.at), kid.dob); };
        const pr = $("#g-print"); if (pr) pr.onclick = () => window.print();
        main.onclick = (e) => {
          const d = e.target.closest("[data-del]");
          if (d && confirm((window.I18N ? I18N.t : (s => s))("Remove this child's growth record from this device?"))) { saveKids(kids().filter(k => k.id !== d.dataset.del)); render(); }
          const dv = e.target.closest("[data-delvisit]");
          if (dv) { const l = kids(); const k = l.find(x => x.id === kid.id); k.visits = k.visits.filter(v => String(v.at) !== dv.dataset.delvisit); saveKids(l); render(); }
          const av = e.target.closest("#g-addvisit");
          if (av) { e.preventDefault(); addVisit(kid); }
        };
      };
      function addVisit(kid) {
        const dlg = document.createElement("dialog"); dlg.className = "dialog"; document.body.appendChild(dlg);
        dlg.innerHTML = `<form method="dialog" class="pd">
          <h3 style="margin:0 0 .6rem">${ic("edit")} New visit — ${esc(kid.initials || "child")}</h3>
          <div class="inline"><div class="field"><label for="v-date">Date measured</label><input id="v-date" type="date" value="${isoToday()}" max="${isoToday()}"></div>
          ${kid.dob ? "" : `<div class="field"><label for="v-age">Age (months)</label><input id="v-age" type="number" inputmode="decimal" min="0" max="228" step="0.5"></div>`}</div>
          <div class="inline"><div class="field"><label for="v-w">Weight (kg)</label><input id="v-w" type="number" inputmode="decimal" step="0.01"></div>
          <div class="field"><label for="v-h">Length / height (cm)</label><input id="v-h" type="number" inputmode="decimal" step="0.1"></div></div>
          <div class="inline"><div class="field"><label for="v-muac">MUAC (cm)</label><input id="v-muac" type="number" inputmode="decimal" step="0.1"></div>
          <div class="field"><label for="v-hc">Head circumference (cm)</label><input id="v-hc" type="number" inputmode="decimal" step="0.1"></div></div>
          <label class="toggle-inline"><input type="checkbox" id="v-oed"> Bilateral pitting oedema</label>
          <div class="row" style="margin-top:1rem;justify-content:flex-end"><button type="button" class="btn ghost sm" id="v-cancel">Cancel</button><button type="button" class="btn sm" id="v-save">${ic("check")}Add visit</button></div></form>`;
        $("#v-cancel", dlg).onclick = () => { dlg.close(); dlg.remove(); };
        $("#v-save", dlg).onclick = () => {
          const num = (id) => { const v = $("#" + id, dlg).value; return v === "" ? null : +v; };
          const at = new Date($("#v-date", dlg).value + "T00:00:00").getTime();
          const ageDays = kid.dob ? ageFrom(new Date(kid.dob), at) : (num("v-age") != null ? Math.round(num("v-age") * 30.4375) : null);
          if (ageDays == null || ageDays < 0) { toast("Enter the age in months.", true); return; }
          const l = kids(); const k = l.find(x => x.id === kid.id);
          k.visits.push({ at, ageDays, weight: num("v-w"), height: num("v-h"), muac: num("v-muac"), hc: num("v-hc"), oedema: !!$("#v-oed", dlg).checked, lying: null });
          saveKids(l); dlg.close(); dlg.remove(); toast("Visit added."); render();
        };
        dlg.showModal();
      }
      draw();
      if (route.q.add && kid) addVisit(kid);
    }
    return { view };
  };
})();
