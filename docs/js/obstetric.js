/* ============================================================
   MedBridge pregnancy dating wheel.
   - EDD and gestational age from LNMP, ultrasound, IVF embryo transfer
     or conception date, entered in the Gregorian or Ethiopian calendar
   - ultrasound redating check (ACOG Committee Opinion 700, 2017)
   - milestone dates and the WHO 2016 eight-contact ANC schedule
   - estimated fetal weight (Hadlock 1985) with centile (Hadlock 1991),
     and amniotic fluid index
   Pure calculations are exposed on window.Obstetric.calc for tests.
   DRAFT until reviewed.
   ============================================================ */
(function () {
  const DAY = 864e5;
  const midnight = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
  const addDays = (d, n) => { const x = midnight(d); x.setDate(x.getDate() + n); return x; };
  const daysBetween = (a, b) => Math.round((midnight(b) - midnight(a)) / DAY);

  /* ---------- dating ---------- */
  /** Returns the "LMP-equivalent" date: the day gestation counts from. */
  function lmpEquivalent({ method, date, cycle = 28, gaWeeks = 0, gaDays = 0, embryoDay = 5 }) {
    if (!(date instanceof Date) || isNaN(date)) return null;
    if (method === "lnmp") return addDays(date, Math.max(-7, Math.min(21, (cycle || 28) - 28)));   // Naegele with cycle adjustment
    if (method === "us") return addDays(date, -(gaWeeks * 7 + gaDays));
    if (method === "ivf") return addDays(date, -(embryoDay === 3 ? 17 : 19));                     // EDD = transfer + 263 (day 3) or 261 (day 5)
    if (method === "conception") return addDays(date, -14);                                        // EDD = conception + 266
    return null;
  }
  const ga = (lmp, on = new Date()) => { const d = daysBetween(lmp, on); return { days: d, weeks: Math.floor(d / 7), rem: ((d % 7) + 7) % 7 }; };
  const edd = (lmp) => addDays(lmp, 280);
  const trimester = (days) => days < 14 * 7 ? 1 : days < 28 * 7 ? 2 : 3;

  /** ACOG CO 700: redate to ultrasound when the difference exceeds the threshold for the ultrasound GA. */
  function redate({ lmpDate, usDate, usWeeks, usDays }) {
    const usGA = usWeeks * 7 + usDays;
    const lmpGA = daysBetween(lmpDate, usDate);
    const diff = Math.abs(usGA - lmpGA);
    const band = usGA <= 8 * 7 + 6 ? { limit: 5, label: "up to 8w6d" }
      : usGA <= 13 * 7 + 6 ? { limit: 7, label: "9w0d to 13w6d" }
      : usGA <= 15 * 7 + 6 ? { limit: 7, label: "14w0d to 15w6d" }
      : usGA <= 21 * 7 + 6 ? { limit: 10, label: "16w0d to 21w6d" }
      : usGA <= 27 * 7 + 6 ? { limit: 14, label: "22w0d to 27w6d" }
      : { limit: 21, label: "28w0d and later" };
    return { diff, limit: band.limit, band: band.label, useUltrasound: diff > band.limit, late: usGA >= 22 * 7 };
  }

  /* ---------- milestones (weeks+days from LMP-equivalent) ---------- */
  const MILESTONES = [
    { key: "dating", from: [8, 0], to: [13, 6], label: "Dating ultrasound (most accurate)", note: "Crown–rump length before 14 weeks gives the most reliable dates." },
    { key: "nt", from: [11, 0], to: [13, 6], label: "Nuchal translucency (NT) ultrasound" },
    { key: "fhr", from: [11, 0], to: [12, 0], label: "First fetal heart tone by hand-held Doppler" },
    { key: "aspirin", from: [12, 0], label: "Start low-dose aspirin if at high risk of pre-eclampsia", note: "Ideally before 16 weeks; continue to about 36 weeks. Confirm the national protocol." },
    { key: "cervix", from: [16, 0], to: [24, 0], label: "Cervical length (if risk factors for preterm birth)" },
    { key: "anatomy", from: [18, 0], to: [22, 0], label: "Routine anatomy scan (best time)" },
    { key: "ogtt", from: [24, 0], to: [28, 0], label: "2-hour OGTT (risk factors for gestational diabetes)" },
    { key: "steroids", from: [24, 0], to: [34, 0], label: "Antenatal corticosteroid window if preterm birth is expected", link: "#/case/preterm-labour" },
    { key: "antiD", from: [28, 0], label: "Anti-D prophylaxis (RhD-negative, unsensitised)" },
    { key: "viable", from: [28, 0], label: "Gestational age of viability (Ethiopian definition)" },
    { key: "mgNeuro", from: [24, 0], to: [32, 0], label: "Magnesium sulfate for fetal neuroprotection if birth is imminent before 32 weeks", link: "#/drug/magnesium-sulfate" },
    { key: "surveillance", from: [32, 0], label: "Antepartum fetal surveillance for high-risk pregnancies", note: "Often started from 32 weeks, earlier with severe conditions." },
    { key: "term", from: [37, 0], label: "Term" },
    { key: "cs", from: [39, 0], label: "Elective caesarean for a singleton may be scheduled" },
    { key: "iol", from: [41, 0], label: "Offer induction of labour (WHO)" },
    { key: "postterm", from: [42, 0], label: "Post-term pregnancy" }
  ];
  /** WHO 2016 antenatal care model: 8 contacts, plus a review at 41 weeks if undelivered. */
  const ANC = [12, 20, 26, 30, 34, 36, 38, 40, 41];

  /* ---------- fetal growth ---------- */
  /** Hadlock 1985 (HC, AC, FL in cm): log10 EFW = 1.326 − 0.00326·AC·FL + 0.0107·HC + 0.0438·AC + 0.158·FL */
  const efwHadlock = ({ hc, ac, fl }) => (hc > 0 && ac > 0 && fl > 0) ? Math.pow(10, 1.326 - 0.00326 * ac * fl + 0.0107 * hc + 0.0438 * ac + 0.158 * fl) : null;
  /** Hadlock 1991 in-utero weight standard: ln(mean) = 0.578 + 0.332·GA − 0.00354·GA²; SD = 12.7 % of the mean. */
  const efwMean = (gaWeeks) => Math.exp(0.578 + 0.332 * gaWeeks - 0.00354 * gaWeeks * gaWeeks);
  const normCdf = (z) => { const t = 1 / (1 + 0.2316419 * Math.abs(z)); const d = 0.3989423 * Math.exp(-z * z / 2); const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; };
  function efwCentile(efw, gaWeeks) {
    if (!(efw > 0) || !(gaWeeks >= 10 && gaWeeks <= 42)) return null;
    const mean = efwMean(gaWeeks), z = (efw - mean) / (0.127 * mean);
    return { mean, centile: Math.max(0.1, Math.min(99.9, normCdf(z) * 100)), p10: mean * (1 - 1.2816 * 0.127), p90: mean * (1 + 1.2816 * 0.127) };
  }
  function afi(q) {
    const vals = q.map(Number); if (vals.some(v => !(v >= 0))) return null;
    const total = vals.reduce((a, b) => a + b, 0);
    return { total, label: total <= 5 ? "Oligohydramnios" : total >= 24 ? "Polyhydramnios" : total < 8 ? "Low-normal" : "Normal" };
  }

  const calc = { lmpEquivalent, ga, edd, trimester, redate, efwHadlock, efwMean, efwCentile, afi, addDays, daysBetween, MILESTONES, ANC };

  /* =========================================================
     View
     ========================================================= */
  window.Obstetric = function (ctx) {
    const { $, esc, ic, toast, FX } = ctx;
    const store = {
      get(k, def) { try { const v = localStorage.getItem("mb:" + k); return v == null ? def : JSON.parse(v); } catch { return def; } },
      set(k, v) { try { localStorage.setItem("mb:" + k, JSON.stringify(v)); } catch {} }
    };
    const lang = () => window.I18N?.lang;
    const eth = (d) => window.EthCal ? EthCal.format(d, lang()) : "";
    const greg = (d) => d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    const both = (d) => `<span class="dual"><b>${esc(eth(d))}</b><span>${esc(greg(d))}</span></span>`;
    const wd = (w, d) => `${w}w${d ? " " + d + "d" : ""}`;
    const MONTHS = () => (lang() === "am" ? EthCal.MONTHS_AM : EthCal.MONTHS_EN);

    function dateField(id, cal, value) {
      const d = value ? new Date(value) : null;
      if (cal === "eth") {
        const e = d ? EthCal.fromDate(d) : { day: 0, month: 0, year: "" };
        return `<div class="eth-date" id="${id}">
          <select data-part="d" aria-label="Day"><option value="">Day</option>${Array.from({ length: 30 }, (_, i) => `<option value="${i + 1}" ${i + 1 === e.day ? "selected" : ""}>${i + 1}</option>`).join("")}</select>
          <select data-part="m" aria-label="Month"><option value="">Month</option>${MONTHS().map((m, i) => `<option value="${i + 1}" ${i + 1 === e.month ? "selected" : ""}>${esc(m)}</option>`).join("")}</select>
          <input data-part="y" type="number" inputmode="numeric" min="1990" max="2100" value="${e.year}" placeholder="Year" aria-label="Year">
        </div>`;
      }
      const iso = d ? new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10) : "";
      return `<input id="${id}" type="date" value="${iso}" max="2100-12-31">`;
    }
    function readDate(root, id, cal) {
      if (cal === "eth") {
        const el = $("#" + id, root); if (!el) return null;
        const y = +el.querySelector('[data-part="y"]').value, m = +el.querySelector('[data-part="m"]').value;
        let d = +el.querySelector('[data-part="d"]').value;
        if (!(y > 1900) || !(m >= 1) || !(d >= 1)) return null;
        d = Math.min(d, EthCal.monthDays(y, m));
        return EthCal.toDate(y, m, d);
      }
      const v = $("#" + id, root)?.value; if (!v) return null;
      const [y, m, d] = v.split("-").map(Number); return new Date(y, m - 1, d);
    }

    function wheelSvg(gaDays, lmp) {
      const R = 108, C = 130, total = 42 * 7;
      const pt = (days, r = R) => { const a = (days / total) * 2 * Math.PI - Math.PI / 2; return [C + r * Math.cos(a), C + r * Math.sin(a)]; };
      const arc = (from, to, r, cls) => { const [x1, y1] = pt(from, r), [x2, y2] = pt(to, r); const large = (to - from) / total > .5 ? 1 : 0; return `<path class="${cls}" d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}"/>`; };
      const cur = Math.max(0, Math.min(total, gaDays));
      const ticks = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40].map(w => { const [x, y] = pt(w * 7, R + 22); const [a, b] = pt(w * 7, R - 12), [c2, d2] = pt(w * 7, R + 12); return `<line class="tick" x1="${a.toFixed(1)}" y1="${b.toFixed(1)}" x2="${c2.toFixed(1)}" y2="${d2.toFixed(1)}"/><text class="tick-l" x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}">${w}</text>`; }).join("");
      const dots = MILESTONES.filter(m => ["nt", "anatomy", "ogtt", "antiD", "term", "iol"].includes(m.key)).map(m => { const [x, y] = pt(m.from[0] * 7 + m.from[1]); return `<circle class="mdot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"><title>${esc(m.label)}</title></circle>`; }).join("");
      const [mx, my] = pt(cur);
      const g = ga(lmp);
      return `<svg class="wheel" viewBox="0 0 260 260" role="img" aria-label="Pregnancy wheel at ${g.weeks} weeks ${g.rem} days">
        <circle class="track" cx="${C}" cy="${C}" r="${R}"/>
        ${arc(0, 14 * 7, R, "t1")}${arc(14 * 7, 28 * 7, R, "t2")}${arc(28 * 7, total, R, "t3")}
        ${gaDays > 0 ? arc(0, Math.min(cur, total - .01), R - 18, "progress") : ""}
        ${ticks}${dots}
        ${gaDays >= 0 ? `<circle class="marker-halo" cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="13"/>
        <circle class="marker" cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="7"/>` : ""}
        <text class="w-big" x="${C}" y="${C - 2}">${gaDays < 0 || g.days < 0 ? "—" : g.weeks + "+" + g.rem}</text>
        <text class="w-small" x="${C}" y="${C + 20}">weeks + days</text>
      </svg>`;
    }

    function view(main, route) {
      const saved = store.get("preg", { method: "lnmp", cal: lang() === "am" ? "eth" : "greg", cycle: 28, gaW: 12, gaD: 0, embryo: 5 });
      let st = { ...saved };
      if (!st.v2) { delete st.date; delete st.rdLmp; delete st.rdUs; st.v2 = true; }
      const draw = () => {
        store.set("preg", st);
        main.innerHTML = `
          <div class="resus-head"><div><h1 style="margin:0">${ic("calendar")} Pregnancy dating wheel</h1>
            <p class="text-2" style="margin:.2rem 0 0">Due date, gestational age, milestones and antenatal contacts, in Ethiopian and Gregorian dates.</p></div>
            <button type="button" class="btn ghost sm" id="pg-print">${ic("print")}Print</button></div>
          <div class="preg-grid">
            <div class="card preg-input">
              <div class="seg preg-method" id="pg-method" role="group" aria-label="Date from">
                ${[["lnmp", "LNMP"], ["us", "Ultrasound"], ["ivf", "IVF transfer"], ["conception", "Conception"]].map(([k, v]) => `<button type="button" data-m="${k}" class="${st.method === k ? "active" : ""}">${v}</button>`).join("")}
              </div>
              <div class="seg cal-seg" id="pg-cal" role="group" aria-label="Calendar" style="margin-top:.6rem">
                <button type="button" data-c="greg" class="${st.cal === "greg" ? "active" : ""}">Gregorian</button>
                <button type="button" data-c="eth" class="${st.cal === "eth" ? "active" : ""}">Ethiopian</button>
              </div>
              <div class="field" style="margin-top:.8rem"><label for="pg-date">${{ lnmp: "First day of last normal menstrual period", us: "Date of the ultrasound", ivf: "Date of embryo transfer", conception: "Date of conception or insemination" }[st.method]}</label>${dateField("pg-date", st.cal, st.date)}</div>
              ${st.method === "lnmp" ? `<div class="field"><label for="pg-cycle">Usual cycle length (days)</label><input id="pg-cycle" type="number" inputmode="numeric" min="21" max="49" value="${st.cycle || 28}"></div>` : ""}
              ${st.method === "us" ? `<div class="inline"><div class="field"><label for="pg-gw">Gestational age on scan: weeks</label><input id="pg-gw" type="number" inputmode="numeric" min="4" max="42" value="${st.gaW}"></div><div class="field"><label for="pg-gd">days</label><input id="pg-gd" type="number" inputmode="numeric" min="0" max="6" value="${st.gaD}"></div></div>` : ""}
              ${st.method === "ivf" ? `<div class="field"><label for="pg-emb">Embryo age at transfer</label><select id="pg-emb"><option value="5" ${st.embryo == 5 ? "selected" : ""}>Day 5 (blastocyst)</option><option value="3" ${st.embryo == 3 ? "selected" : ""}>Day 3</option></select></div>` : ""}
              <div class="row" style="justify-content:space-between;margin-top:.2rem"><div id="pg-greg-hint" class="small muted"></div><button type="button" class="btn sm" id="pg-go">${ic("calc")}Calculate</button></div>
            </div>
            <div class="card preg-wheel" id="pg-wheel"></div>
          </div>
          <div id="pg-out"></div>
          <details class="card" id="pg-redate" ${st.method === "us" ? "open" : ""}><summary><h3 style="display:inline">${ic("swap")} Compare LNMP with ultrasound</h3></summary>
            <p class="small muted">When both are known, ACOG Committee Opinion 700 says which dates to use. Enter the LNMP and the ultrasound findings.</p>
            <div class="inline3">
              <div class="field"><label for="rd-lmp">LNMP</label>${dateField("rd-lmp", st.cal, st.rdLmp)}</div>
              <div class="field"><label for="rd-us">Ultrasound date</label>${dateField("rd-us", st.cal, st.rdUs)}</div>
              <div class="field"><label>GA on scan (w + d)</label><div class="row" style="gap:.4rem"><input id="rd-gw" type="number" inputmode="numeric" min="4" max="42" value="${st.rdW ?? st.gaW}" style="width:5rem"><input id="rd-gd" type="number" inputmode="numeric" min="0" max="6" value="${st.rdD ?? st.gaD}" style="width:4.5rem"></div></div>
            </div>
            <div id="rd-out"></div>
          </details>
          <div class="preg-grid">
            <div class="card"><h3>${ic("calc")} Estimated fetal weight</h3>
              <p class="small muted">Hadlock formula from head circumference, abdominal circumference and femur length, with the centile for gestational age (Hadlock 1991). Or enter the EFW from the scan report.</p>
              <div class="inline3">
                <div class="field"><label for="fb-hc">HC (mm)</label><input id="fb-hc" type="number" inputmode="decimal" min="0"></div>
                <div class="field"><label for="fb-ac">AC (mm)</label><input id="fb-ac" type="number" inputmode="decimal" min="0"></div>
                <div class="field"><label for="fb-fl">FL (mm)</label><input id="fb-fl" type="number" inputmode="decimal" min="0"></div>
              </div>
              <div class="inline"><div class="field"><label for="fb-efw">or EFW from report (g)</label><input id="fb-efw" type="number" inputmode="decimal" min="0"></div>
              <div class="field"><label for="fb-ga">Gestational age (weeks, filled from the dates)</label><input id="fb-ga" type="number" inputmode="decimal" min="10" max="42" step="0.1"></div></div>
              <div id="fb-out"></div>
            </div>
            <div class="card"><h3>${ic("drop")} Amniotic fluid index</h3>
              <p class="small muted">Deepest vertical pocket in each of the four quadrants, in cm.</p>
              <div class="inline">${[1, 2, 3, 4].map(i => `<div class="field"><label for="af-${i}">Quadrant ${i} (cm)</label><input id="af-${i}" type="number" inputmode="decimal" min="0" step="0.1"></div>`).join("")}</div>
              <div id="af-out"></div>
            </div>
          </div>
          <p class="small muted">Draft reference. Dating: ACOG Committee Opinion 700 (2017); ANC contacts: WHO recommendations on antenatal care (2016); fetal weight: Hadlock 1985 and 1991. Confirm against the Ethiopian national ANC and obstetric protocols.</p>`;
        bind();
        compute();
      };
      const compute = () => {
        const date = readDate(main, "pg-date", st.cal);
        st.date = date ? date.getTime() : null;
        if (st.method === "lnmp") st.cycle = +($("#pg-cycle")?.value || 28);
        if (st.method === "us") { st.gaW = +($("#pg-gw")?.value || 0); st.gaD = Math.min(6, +($("#pg-gd")?.value || 0)); }
        if (st.method === "ivf") st.embryo = +($("#pg-emb")?.value || 5);
        store.set("preg", st);
        $("#pg-greg-hint").textContent = date ? (st.cal === "eth" ? `Gregorian: ${greg(date)}` : `Ethiopian: ${eth(date)}`) : "";
        const lmp = date && lmpEquivalent({ method: st.method, date, cycle: st.cycle, gaWeeks: st.gaW, gaDays: st.gaD, embryoDay: st.embryo });
        if (!lmp) {
          $("#pg-out").innerHTML = `<div class="card preg-empty">${ic("calendar")}<div><strong>${{ lnmp: "Enter the first day of the last normal menstrual period.", us: "Enter the ultrasound date and the gestational age measured on that scan.", ivf: "Enter the date of the embryo transfer.", conception: "Enter the date of conception." }[st.method]}</strong><p class="small muted" style="margin:.2rem 0 0">Gestational age, the due date, milestones and ANC contacts appear here as soon as the date is complete. On some phones, tap Calculate after choosing the date.</p></div></div>`;
          $("#pg-wheel").innerHTML = wheelSvg(-1, new Date()) + `<div class="wheel-legend"><span class="t1">1st trimester</span><span class="t2">2nd</span><span class="t3">3rd</span></div>`;
          fetal(null); return;
        }
        const g = ga(lmp), due = edd(lmp), today = midnight(new Date());
        const warn = g.days < 0 ? `<div class="callout warn">${ic("alert")}<div>That date is in the future. Check the date and calendar.</div></div>` : g.days > 44 * 7 ? `<div class="callout warn">${ic("alert")}<div>More than 44 weeks: check the date and calendar.</div></div>` : "";
        $("#pg-wheel").innerHTML = wheelSvg(g.days, lmp) + `<div class="wheel-legend"><span class="t1">1st trimester</span><span class="t2">2nd</span><span class="t3">3rd</span></div>`;
        const status = (from, to) => { const a = addDays(lmp, from), b = to ? addDays(lmp, to) : a; return today > b ? "past" : today >= a ? "now" : "next"; };
        const rows = MILESTONES.map(m => {
          const fd = m.from[0] * 7 + m.from[1], td = m.to ? m.to[0] * 7 + m.to[1] : null;
          const s = status(fd, td);
          return `<tr class="ms-${s}"><td><span class="ms-dot"></span>${m.link ? `<a href="${m.link}">${esc(m.label)}</a>` : esc(m.label)}${m.note ? `<div class="small muted">${esc(m.note)}</div>` : ""}</td>
            <td>${both(addDays(lmp, fd))}${td != null ? `<span class="dual-to">to</span>${both(addDays(lmp, td))}` : ""}<div class="small muted">${wd(...m.from)}${m.to ? " – " + wd(...m.to) : ""}</div></td></tr>`;
        }).join("");
        const nextIdx = ANC.findIndex(w => addDays(lmp, w * 7) >= today);
        const anc = ANC.map((w, i) => { const dt = addDays(lmp, w * 7); const cls = i === nextIdx ? "ms-now" : dt < today ? "ms-past" : "ms-next"; return `<tr class="${cls}"><td><span class="ms-dot"></span>${i < 8 ? `Contact ${i + 1}` : "Review if undelivered"}${i === nextIdx ? ` <span class="chip primary">Next</span>` : ""}</td><td>${both(dt)}<div class="small muted">${w} weeks</div></td></tr>`; }).join("");
        const shareText = `MedBridge pregnancy dates\nGA today: ${g.weeks} weeks + ${g.rem} days (trimester ${trimester(g.days)})\nEDD: ${eth(due)} (${greg(due)})\nDated by: ${{ lnmp: "LNMP", us: "ultrasound", ivf: "IVF transfer", conception: "conception" }[st.method]}\nNext ANC contact: ${nextIdx >= 0 ? eth(addDays(lmp, ANC[nextIdx] * 7)) : "none"}\nDraft reference, confirm against the national ANC protocol.`;
        $("#pg-out").innerHTML = `${warn}
          <div class="preg-summary">
            <div class="card ps-card ps-ga"><span class="ps-l">Gestational age today</span><span class="ps-v">${g.days < 0 ? "—" : `${g.weeks}<small>w</small> ${g.rem}<small>d</small>`}</span><span class="ps-s">Trimester ${trimester(Math.max(0, g.days))}</span></div>
            <div class="card ps-card ps-edd"><span class="ps-l">Estimated due date</span><span class="ps-v ps-date">${esc(eth(due))}</span><span class="ps-s">${esc(greg(due))} · ${daysBetween(today, due) >= 0 ? `in ${daysBetween(today, due)} days` : `${-daysBetween(today, due)} days past`}</span></div>
            <div class="card ps-card"><span class="ps-l">Dates counted from</span><span class="ps-v ps-date">${esc(eth(lmp))}</span><span class="ps-s">${esc(greg(lmp))} · LMP-equivalent</span></div>
          </div>
          <div class="row" style="margin:-.3rem 0 1rem">${ctx.shareButton ? ctx.shareButton(shareText, "Share dates") : ""}${bedPicker()}</div>
          <div class="preg-grid">
            <div class="card"><h3>${ic("clipboard")} Milestone dates</h3><div class="tablewrap"><table class="plain ms-table" data-no-i18n lang="en"><tbody>${rows}</tbody></table></div></div>
            <div class="card"><h3>${ic("calendar")} Antenatal care contacts</h3><p class="small muted" style="margin-top:-.3rem">WHO 2016 eight-contact model for mothers classified for basic care.</p><div class="tablewrap"><table class="plain ms-table"><tbody>${anc}</tbody></table></div></div>
          </div>`;
        redateOut(); fetal(g);
        const tb = $("#pg-tobed");
        if (tb) tb.onclick = () => { const id = $("#pg-bed").value; if (!id) { toast("Choose a bed.", true); return; } if (window.WD_SETLMP && WD_SETLMP(id, lmp.getTime())) toast("Pregnancy dates saved to the bed. Gestational age now updates on the ward board."); };
      };
      function bedPicker() {
        const beds = window.WD_BOARD ? window.WD_BOARD().beds : [];
        return beds.length ? `<span class="row" style="gap:.4rem"><select id="pg-bed" aria-label="Ward bed" style="min-height:40px;border-radius:11px;border:1px solid var(--border-strong);background:var(--surface);padding:.3rem .6rem"><option value="">Send to ward bed…</option>${beds.map(b => `<option value="${esc(b.id)}">Bed ${esc(b.bed)} ${esc(b.initials || "")}</option>`).join("")}</select><button type="button" class="btn ghost sm" id="pg-tobed">${ic("ward")}Save to bed</button></span>` : `<a class="btn ghost sm" href="#/ward">${ic("ward")}Ward board</a>`;
      }
      const redateOut = () => {
        const l = readDate(main, "rd-lmp", st.cal), u = readDate(main, "rd-us", st.cal);
        const w = +$("#rd-gw").value, d = Math.min(6, +$("#rd-gd").value || 0);
        st.rdLmp = l?.getTime(); st.rdUs = u?.getTime(); st.rdW = w; st.rdD = d; store.set("preg", st);
        const out = $("#rd-out");
        if (!l || !u || !(w > 3)) { out.innerHTML = ""; return; }
        const r = redate({ lmpDate: l, usDate: u, usWeeks: w, usDays: d });
        out.innerHTML = `<div class="callout ${r.useUltrasound ? "warn" : "ok-callout"}">${ic(r.useUltrasound ? "alert" : "check")}<div>
          <strong>${r.useUltrasound ? "Use the ultrasound dates." : "Keep the LNMP dates."}</strong> On the scan date the LNMP gives ${Math.floor(daysBetween(l, u) / 7)}w ${((daysBetween(l, u) % 7) + 7) % 7}d and the ultrasound ${w}w ${d}d. The difference is ${r.diff} day${r.diff === 1 ? "" : "s"}; for an ultrasound at ${r.band} the limit is ${r.limit} days.
          ${r.late && r.useUltrasound ? " Redating after 22 weeks is less reliable: consider fetal growth restriction and arrange follow-up growth scans." : ""}</div></div>`;
      };
      const fetal = (g) => {
        const num = (id) => parseFloat($("#" + id)?.value);
        const gaIn = $("#fb-ga");
        if (gaIn && (gaIn.value === "" || gaIn.dataset.auto === "1")) { if (g && g.days > 0) { gaIn.value = (g.days / 7).toFixed(1); gaIn.dataset.auto = "1"; } else if (gaIn.dataset.auto === "1") { gaIn.value = ""; } }
        const gaW = num("fb-ga");
        const hc = num("fb-hc"), ac = num("fb-ac"), fl = num("fb-fl");
        const efw = num("fb-efw") || efwHadlock({ hc: hc / 10, ac: ac / 10, fl: fl / 10 });
        const out = $("#fb-out");
        if (!(efw > 0)) { out.innerHTML = ""; }
        else {
          const c = efwCentile(efw, gaW);
          out.innerHTML = `<div class="result"><div class="big">${Math.round(efw).toLocaleString()} g</div>
            ${c ? `<div class="sub"><b>${c.centile < 1 ? "<1" : c.centile > 99 ? ">99" : Math.round(c.centile)}th centile</b> at ${gaW.toFixed(1)} weeks · 10th–90th: ${Math.round(c.p10).toLocaleString()}–${Math.round(c.p90).toLocaleString()} g</div>
            <div class="sub">${c.centile < 10 ? `<span class="bad-text"><b>Small for gestational age.</b> Check dates, look for pre-eclampsia and growth restriction, and plan surveillance.</span>` : c.centile > 90 ? `<span class="warn-text"><b>Large for gestational age.</b> Screen for diabetes and polyhydramnios; plan delivery.</span>` : "Within the normal range."}</div>` : `<div class="sub">Enter a gestational age of 10–42 weeks for the centile.</div>`}</div>`;
        }
        const q = [1, 2, 3, 4].map(i => $("#af-" + i)?.value);
        const a = q.every(v => v !== "") ? afi(q) : null;
        $("#af-out").innerHTML = a ? `<div class="result"><div class="big">${a.total.toFixed(1)} cm</div><div class="sub"><b>${a.label}.</b> ${a.total <= 5 ? "AFI 5 cm or less: assess fetal wellbeing, membranes and growth." : a.total >= 24 ? "AFI 24 cm or more: screen for diabetes and fetal anomalies." : "Normal range is about 5–24 cm."}</div></div>` : "";
      };
      const bind = () => {
        $("#pg-method").addEventListener("click", e => { const b = e.target.closest("[data-m]"); if (b) { compute(); st.method = b.dataset.m; draw(); } });
        $("#pg-cal").addEventListener("click", e => { const b = e.target.closest("[data-c]"); if (b && b.dataset.c !== st.cal) { compute(); st.cal = b.dataset.c; draw(); } });
        for (const ev of ["input", "change", "blur", "keyup"]) main.querySelector(".preg-input").addEventListener(ev, compute, true);
        $("#pg-go").addEventListener("click", () => { compute(); const out = $("#pg-out"); if (out && st.date) out.scrollIntoView({ behavior: "smooth", block: "start" }); });
        for (const ev of ["input", "change", "blur"]) $("#pg-redate").addEventListener(ev, redateOut, true);
        main.oninput = e => { if (e.target.id === "fb-ga") e.target.dataset.auto = "0"; if (e.target.closest("#fb-out, #af-out") || /^(fb|af)-/.test(e.target.id)) { const d = st.date && lmpEquivalent({ method: st.method, date: new Date(st.date), cycle: st.cycle, gaWeeks: st.gaW, gaDays: st.gaD, embryoDay: st.embryo }); fetal(d ? ga(d) : null); } };
        $("#pg-print").addEventListener("click", () => window.print());
      };
      draw();
    }
    return { view, calc };
  };
  window.Obstetric.calc = calc;
})();
