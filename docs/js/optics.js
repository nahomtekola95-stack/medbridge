/* optics.js — refraction and low-vision toolkit.

   Everything here is optics, not prescribing: the numbers are exact once the
   measurements are right, which makes these calculations safe to do on a phone
   at an outreach clinic where there is no trial-lens set and no computer.

   Sources: AAO Basic and Clinical Science Course, Section 3: Clinical Optics
   (2019–2020) for transposition, spherical equivalent, lens effectivity at the
   corneal plane, the Prentice rule, the acuity conversion table and the
   Kestenbaum rule; WHO ICD-11 for the vision impairment categories.

   Pure calculations live on window.Optics.calc so the tests can reach them. */
(function () {
  "use strict";

  /* =========================================================
     Spherocylinder
     ========================================================= */
  const norm = (ax) => { let a = ax % 180; if (a <= 0) a += 180; return a; };

  /* Plus cylinder ↔ minus cylinder. BCSC: new sphere = old sphere + cylinder,
     cylinder keeps its value with the opposite sign, axis turns 90°. */
  function transpose(rx) {
    return { sph: rx.sph + rx.cyl, cyl: -rx.cyl, axis: norm(rx.axis + 90) };
  }
  const toMinusCyl = (rx) => rx.cyl <= 0 ? { ...rx, axis: norm(rx.axis) } : transpose(rx);
  const toPlusCyl = (rx) => rx.cyl >= 0 ? { ...rx, axis: norm(rx.axis) } : transpose(rx);

  /* The two principal meridians. A cylinder acts 90° from its axis. */
  function meridians(rx) {
    const a = norm(rx.axis);
    return [{ deg: a, power: rx.sph }, { deg: norm(a + 90), power: rx.sph + rx.cyl }];
  }
  /* Power along any meridian: F(θ) = sphere + cylinder · sin²(θ − axis) */
  function powerAt(rx, deg) {
    const t = (deg - rx.axis) * Math.PI / 180;
    return rx.sph + rx.cyl * Math.sin(t) * Math.sin(t);
  }
  /* Spherical equivalent: the "average" power of a toric lens = sphere + cyl/2 */
  const se = (rx) => rx.sph + rx.cyl / 2;

  /* Lens effectivity. Moving a lens d metres closer to the eye changes its
     effective power: F' = F / (1 − dF). BCSC worked example: +4.00 D at a
     13.75 mm vertex distance needs +4.23 D at the cornea. Negligible under 3 D. */
  function effective(F, dMetres) {
    const den = 1 - dMetres * F;
    return den === 0 ? Infinity : F / den;
  }
  /* Spectacle prescription → the power at the corneal (contact lens) plane. */
  function atCornea(rx, vertexMm = 12) {
    const d = vertexMm / 1000;
    const m = meridians(rx).map(x => ({ ...x, power: effective(x.power, d) }));
    const sph = m[0].power, cyl = m[1].power - m[0].power;
    return { sph, cyl, axis: norm(rx.axis), meridians: m, shift: Math.max(...m.map((x, i) => Math.abs(x.power - meridians(rx)[i].power))) };
  }
  /* And back again: a contact lens power written at the spectacle plane. */
  function atSpectacle(rx, vertexMm = 12) {
    const d = -vertexMm / 1000;
    const m = meridians(rx).map(x => ({ ...x, power: effective(x.power, d) }));
    return { sph: m[0].power, cyl: m[1].power - m[0].power, axis: norm(rx.axis), meridians: m };
  }
  /* Round to the nearest quarter dioptre — the step a trial set and a lens
     factory actually work in. */
  const quarter = (n) => Math.round(n * 4) / 4;
  const fmtRx = (rx, d = 2) => `${rx.sph >= 0 ? "+" : "−"}${Math.abs(rx.sph).toFixed(d)}` +
    (Math.abs(rx.cyl) < 0.005 ? " DS" : ` ${rx.cyl >= 0 ? "+" : "−"}${Math.abs(rx.cyl).toFixed(d)} × ${String(Math.round(norm(rx.axis))).padStart(3, "0")}`);

  /* =========================================================
     Accommodation and the reading add
     ========================================================= */
  /* Hofstetter's estimates of the amplitude of accommodation by age. BCSC
     teaches measuring the amplitude; these are the usual estimates to fall
     back on when there is no near card or RAF rule. */
  const hofstetter = (age) => ({
    max: 25 - 0.4 * age,
    average: 18.5 - 0.3 * age,
    min: Math.max(0, 15 - 0.25 * age)
  });
  const amplitudeFromNearPoint = (cm) => cm > 0 ? 100 / cm : null;

  /* BCSC: work out the accommodation the near task needs, let the patient use
     half of the measured amplitude and hold half in reserve, and the shortfall
     is the add. */
  function nearAdd({ workingCm = 40, amplitude = null, age = null, reserve = 0.5 }) {
    const amp = amplitude != null ? amplitude : (age != null ? hofstetter(age).min : null);
    if (amp == null || !(workingCm > 0)) return null;
    const required = 100 / workingCm;
    const usable = amp * (1 - reserve);
    const add = Math.max(0, required - usable);
    return {
      required, amplitude: amp, usable, add, addRounded: quarter(add),
      estimated: amplitude == null,
      range: rangeOfAccommodation(add, amp)
    };
  }
  /* The near and far point through a given add, with the whole amplitude in
     play — the range the patient can actually hold print in. */
  function rangeOfAccommodation(add, amp) {
    if (!(add > 0)) return null;
    const far = 100 / add;
    const near = 100 / (add + amp);
    return { farCm: far, nearCm: near };
  }
  /* =========================================================
     Prism — the Prentice rule
     ========================================================= */
  /* Δ = hD: each centimetre off the optical centre induces one prism dioptre
     per dioptre of lens power. */
  const prentice = (hCm, D) => hCm * D;
  /* Vertical imbalance in downgaze for anisometropia. BCSC: reading gaze is
     usually 8–10 mm below the distance optical centre. */
  function verticalImbalance(rightD, leftD, dropMm = 10) {
    const h = dropMm / 10;
    const r = prentice(h, rightD), l = prentice(h, leftD);
    const diff = Math.abs(r - l);
    return {
      right: r, left: l, diff,
      significant: diff >= 1.5,
      base: rightD > leftD ? "the stronger plus (or weaker minus) lens carries more base-down effect in downgaze" : ""
    };
  }
  /* Decentration needed to build a wanted prism into a lens. */
  const decentration = (prismD, lensD) => lensD === 0 ? null : (prismD / Math.abs(lensD)) * 10; // mm
  /* Prism dioptres ↔ degrees of deviation. */
  const prismToDeg = (p) => Math.atan(p / 100) * 180 / Math.PI;
  const degToPrism = (deg) => Math.tan(deg * Math.PI / 180) * 100;

  /* =========================================================
     Visual acuity
     ========================================================= */
  /* Everything is held as the minimum angle of resolution (MAR) in minutes of
     arc; logMAR is its base-10 logarithm (BCSC Table 3-2). */
  const LOW = [ // acuities below the chart, in the order they are tested
    { key: "cf", label: "Counting fingers", logMAR: 2.0 },
    { key: "hm", label: "Hand movements", logMAR: 2.3 },
    { key: "lp", label: "Light perception", logMAR: 2.7 },
    { key: "nlp", label: "No light perception", logMAR: 3.0 }
  ];
  function parseVA(text) {
    if (text == null) return null;
    const s = String(text).trim().toLowerCase().replace(/\s+/g, " ");
    if (!s) return null;
    const low = LOW.find(l => l.key === s.replace(/[^a-z]/g, "") ||
      (l.key === "cf" && /count|finger/.test(s)) || (l.key === "hm" && /hand|movement/.test(s)) ||
      (l.key === "lp" && /^(light|lp|pl)/.test(s) && !/no/.test(s)) || (l.key === "nlp" && /^(no|nlp|nplp)/.test(s)));
    if (low) return { ...fromLogMAR(low.logMAR), low: low.label, key: low.key };
    let m = s.match(/^logmar\s*(-?[\d.]+)$/) || s.match(/^(-?0?\.\d+)\s*logmar$/);
    if (m) return fromLogMAR(+m[1]);
    m = s.match(/^(\d+(?:\.\d+)?)\s*[/:]\s*(\d+(?:\.\d+)?)$/);
    if (m) {
      const num = +m[1], den = +m[2];
      if (!(num > 0) || !(den > 0)) return null;
      /* Keep the fraction as it was written. An acuity measured by walking the
         patient forward is recorded as 3/60 or 2/60, and re-printing that as
         6/120 would look like a different test. */
      return { ...fromMAR(den / num), entered: `${trim(num)}/${trim(den)}` };
    }
    m = s.match(/^(-?\d*\.?\d+)$/);
    if (m) {
      const v = +m[1];
      if (v > 0 && v <= 2.5) return fromMAR(1 / v);   // decimal notation
      if (v <= 0) return fromLogMAR(v);               // logMAR 0 or better
      return fromLogMAR(v);                           // logMAR worse than 1.0 e.g. 1.3
    }
    return null;
  }
  function fromMAR(mar) {
    return { mar, logMAR: Math.log10(mar), decimal: 1 / mar, snellen6: `6/${trim(6 * mar)}`, snellen20: `20/${trim(20 * mar)}`, snellen4: `4/${trim(4 * mar)}` };
  }
  const fromLogMAR = (lm) => ({ ...fromMAR(Math.pow(10, lm)), logMAR: lm });
  const trim = (n) => { const r = Math.round(n * 10) / 10; return Number.isInteger(r) ? String(r) : r.toFixed(1); };

  /* WHO / ICD-11 categories of distance vision impairment, on PRESENTING
     acuity (with whatever glasses the patient walked in wearing). */
  /* The cut-offs are the acuities themselves, so they are held as exact logMAR
     values (6/12 is log10 2, 3/60 is log10 20) — rounding them to 0.30 and 1.30
     would push the boundary acuity itself into the next category down. */
  const L = (num, den) => Math.log10(den / num);
  const WHO_VISION = [
    { level: "ok", label: "No or mild vision impairment", criterion: "6/12 or better", to: L(6, 12) },
    { level: "mild", label: "Mild vision impairment", criterion: "worse than 6/12 to 6/18", to: L(6, 18) },
    { level: "moderate", label: "Moderate vision impairment", criterion: "worse than 6/18 to 6/60", to: L(6, 60) },
    { level: "severe", label: "Severe vision impairment", criterion: "worse than 6/60 to 3/60", to: L(3, 60) },
    { level: "blind", label: "Blindness", criterion: "worse than 3/60", to: Infinity }
  ];
  function whoCategory(va) {
    const lm = typeof va === "number" ? va : va && va.logMAR;
    if (lm == null || !isFinite(lm)) return null;
    const eps = 1e-9;
    return WHO_VISION.find(c => lm <= c.to + eps) || WHO_VISION[WHO_VISION.length - 1];
  }

  /* =========================================================
     Low vision
     ========================================================= */
  /* Kestenbaum: the add needed to read 1 M print is the inverse of the Snellen
     fraction — 6/60 (20/200) needs about +10 D. A starting point only. */
  function kestenbaum(va) {
    const v = typeof va === "number" ? { decimal: va, mar: 1 / va } : va;
    if (!v || !(v.decimal > 0)) return null;
    const add = 1 / v.decimal;
    return { add, addRounded: quarter(add), workingCm: 100 / add };
  }
  /* How much magnification is needed to get from what the patient sees now to
     the acuity the task needs. */
  function magnification(now, target) {
    const a = typeof now === "number" ? now : now && now.mar;
    const b = typeof target === "number" ? target : target && target.mar;
    if (!(a > 0) || !(b > 0)) return null;
    return { times: a / b, dioptres: (a / b) * 4 };   // X at 25 cm reference
  }

  const calc = {
    transpose, toMinusCyl, toPlusCyl, meridians, powerAt, se, effective, atCornea, atSpectacle,
    quarter, fmtRx, norm, hofstetter, amplitudeFromNearPoint, nearAdd, rangeOfAccommodation,
    prentice, verticalImbalance, decentration, prismToDeg, degToPrism,
    parseVA, fromMAR, fromLogMAR, whoCategory, WHO_VISION, LOW, kestenbaum, magnification
  };
  window.Optics = { calc };

  /* =========================================================
     View
     ========================================================= */
  window.OpticsView = function (ctx) {
    const { $, esc, ic, render, FX, shareButton } = ctx;
    const d2 = (n) => (n >= 0 ? "+" : "−") + Math.abs(n).toFixed(2);
    const num = (id) => { const el = $("#" + id); if (!el || el.value === "") return null; const v = +el.value; return isFinite(v) ? v : null; };
    const val = (id) => $("#" + id)?.value.trim() || "";

    /* A power cross: the two principal meridians drawn the way they are taught. */
    function powerCross(rx) {
      const m = meridians(rx);
      const S = 132, c = S / 2, r = 44;
      const arm = (deg, power, cls) => {
        const t = (180 - deg) * Math.PI / 180;               // optics axes run anticlockwise
        const x = Math.cos(t) * r, y = Math.sin(t) * r * -1;
        const lx = c + Math.cos(t) * (r + 16), ly = c - Math.sin(t) * (r + 16);
        return `<line class="pc-arm" x1="${(c - x).toFixed(1)}" y1="${(c - y).toFixed(1)}" x2="${(c + x).toFixed(1)}" y2="${(c + y).toFixed(1)}"/>
          <text class="pc-lbl ${cls}" x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" text-anchor="middle">${d2(power)}</text>`;
      };
      return `<svg class="power-cross" viewBox="0 0 ${S} ${S}" role="img" aria-label="Power cross">
        ${arm(m[0].deg, m[0].power, "")}${arm(m[1].deg, m[1].power, "")}
        <circle class="pc-dot" cx="${c}" cy="${c}" r="3"/></svg>`;
    }

    const rxFields = (p, label, sph = "", cyl = "", ax = "") => `
      <div class="inline3">
        <div class="field"><label for="${p}-sph">${label} sphere (D)</label><input id="${p}-sph" type="number" inputmode="decimal" step="0.25" value="${sph}" placeholder="e.g. -2.50"></div>
        <div class="field"><label for="${p}-cyl">Cylinder (D)</label><input id="${p}-cyl" type="number" inputmode="decimal" step="0.25" value="${cyl}" placeholder="e.g. -1.00"></div>
        <div class="field"><label for="${p}-ax">Axis (°)</label><input id="${p}-ax" type="number" inputmode="numeric" min="0" max="180" step="1" value="${ax}" placeholder="e.g. 180"></div>
      </div>`;

    /* ---------- tab: refraction ---------- */
    function tabRefraction() {
      return `<div class="card">
        <h3>${ic("eye")} Prescription: transpose, average and move to the cornea</h3>
        <p class="small text-2" style="margin:-.2rem 0 .8rem">Enter the spectacle prescription for one eye. Leave the cylinder empty for a sphere.</p>
        ${rxFields("rx", "Spectacle")}
        <div class="inline3">
          <div class="field"><label for="rx-vx">Vertex distance (mm)</label><input id="rx-vx" type="number" inputmode="decimal" step="0.5" min="0" max="25" value="12"></div>
          <div class="field" style="justify-content:flex-end"><button type="button" class="btn" id="rx-go">${ic("calc")}Work it out</button></div>
          <div class="field"></div>
        </div>
        <div id="rx-out"></div></div>
        <div class="card"><h3>${ic("info")} How this is worked out</h3>
        <ul class="small">
          <li><b>Transposition:</b> new sphere = sphere + cylinder, the cylinder keeps its size with the opposite sign, and the axis turns 90°. The two forms are the same lens.</li>
          <li><b>Spherical equivalent:</b> sphere + half the cylinder. Use it when you only have spherical lenses in the box, and for a first pair of ready-made glasses.</li>
          <li><b>At the cornea:</b> F′ = F ÷ (1 − dF), where d is the vertex distance in metres. Below about 3 D the change is too small to matter; above it, a high myope needs a weaker contact lens and a high hyperope a stronger one.</li>
        </ul></div>`;
    }
    function runRefraction() {
      const sph = num("rx-sph") ?? 0, cyl = num("rx-cyl") ?? 0, axis = num("rx-ax") ?? 180, vx = num("rx-vx") ?? 12;
      if (num("rx-sph") == null && num("rx-cyl") == null) { $("#rx-out").innerHTML = `<p class="empty">Enter a sphere or a cylinder.</p>`; return; }
      const rx = { sph, cyl, axis };
      const plus = toPlusCyl(rx), minus = toMinusCyl(rx), m = meridians(rx);
      const cl = atCornea(rx, vx);
      const eq = se(rx);
      const big = Math.abs(sph) >= 3 || Math.abs(sph + cyl) >= 3;
      const share = `Refraction — ${fmtRx(minus)} (minus cyl) = ${fmtRx(plus)} (plus cyl)\nSpherical equivalent ${d2(eq)} D\nMeridians: ${d2(m[0].power)} @ ${Math.round(m[0].deg)}°, ${d2(m[1].power)} @ ${Math.round(m[1].deg)}°\nAt the cornea (${vx} mm): ${fmtRx({ sph: quarter(cl.sph), cyl: quarter(cl.cyl), axis: cl.axis })}`;
      $("#rx-out").innerHTML = `
        <div class="row" style="align-items:flex-start;gap:1rem;flex-wrap:wrap;margin-top:.4rem">
          <div style="flex:1 1 320px">
            <div class="tablewrap"><table class="plain"><tbody>
              <tr><td>Minus cylinder form</td><td><b>${esc(fmtRx(minus))}</b></td></tr>
              <tr><td>Plus cylinder form</td><td><b>${esc(fmtRx(plus))}</b></td></tr>
              <tr><td>Spherical equivalent</td><td><b>${d2(eq)} D</b> <span class="small muted">(${d2(quarter(eq))} D in quarter steps)</span></td></tr>
              <tr><td>Power along ${Math.round(m[0].deg)}°</td><td>${d2(m[0].power)} D</td></tr>
              <tr><td>Power along ${Math.round(m[1].deg)}°</td><td>${d2(m[1].power)} D</td></tr>
            </tbody></table></div>
          </div>
          <div style="flex:0 0 auto;text-align:center">${powerCross(rx)}<p class="small muted" style="margin:0">Power cross</p></div>
        </div>
        <div class="callout ${big ? "warn" : "info"}">${ic(big ? "alert" : "info")}<div>
          <strong>At the corneal plane (${vx} mm vertex): ${esc(fmtRx({ sph: quarter(cl.sph), cyl: quarter(cl.cyl), axis: cl.axis }))}.</strong>
          ${big ? `That is ${cl.shift.toFixed(2)} D away from the spectacle power — enough to matter for a contact lens or for a trial frame held far from the eye.`
            : "Under about 3 D the vertex distance makes no useful difference; the spectacle and contact lens powers are the same."}</div></div>
        <div class="row" style="margin-top:.6rem">${shareButton(share, "Share")}</div>`;
    }

    /* ---------- tab: reading glasses ---------- */
    function tabReading() {
      return `<div class="card">
        <h3>${ic("book")} Reading add</h3>
        <p class="small text-2" style="margin:-.2rem 0 .8rem">Measure the amplitude if you can: hold small print and bring it in until it blurs, with the distance glasses on. Otherwise give the age and the tool estimates it.</p>
        <div class="inline3">
          <div class="field"><label for="ad-np">Near point (cm, print blurs)</label><input id="ad-np" type="number" inputmode="decimal" min="3" max="200" step="1" placeholder="e.g. 50"></div>
          <div class="field"><label for="ad-age">or age (years)</label><input id="ad-age" type="number" inputmode="numeric" min="30" max="95" step="1" placeholder="e.g. 52"></div>
          <div class="field"><label for="ad-wd">Working distance (cm)</label><input id="ad-wd" type="number" inputmode="decimal" min="10" max="100" step="1" value="40"></div>
        </div>
        <div class="row"><button type="button" class="btn" id="ad-go">${ic("calc")}Work out the add</button></div>
        <div id="ad-out"></div></div>
        <div class="card"><h3>${ic("info")} How this is worked out</h3>
        <ul class="small">
          <li>Reading at 40 cm needs 2.50 D of accommodation (100 ÷ 40).</li>
          <li>Let the patient use only <b>half</b> the measured amplitude and keep half in reserve, so the print stays clear when they move the page.</li>
          <li>The add is what is left over: required − half the amplitude, rounded to a quarter dioptre.</li>
          <li>Check the range afterwards. If the near point is too close for the work, take 0.25 D off the add at a time.</li>
          <li>Binocular amplitude is 0.50–1.00 D more than one eye alone; using the binocular figure guards against too strong an add.</li>
        </ul></div>`;
    }
    function runReading() {
      const np = num("ad-np"), age = num("ad-age"), wd = num("ad-wd") ?? 40;
      const amp = np ? amplitudeFromNearPoint(np) : null;
      if (amp == null && age == null) { $("#ad-out").innerHTML = `<p class="empty">Enter the near point or the age.</p>`; return; }
      const r = nearAdd({ workingCm: wd, amplitude: amp, age });
      if (!r) { $("#ad-out").innerHTML = `<p class="empty">Check the numbers.</p>`; return; }
      const h = age != null ? hofstetter(age) : null;
      const share = `Reading add — working distance ${wd} cm\nAmplitude ${r.amplitude.toFixed(2)} D${r.estimated ? " (estimated from age)" : " (measured)"}\nAdd ${d2(r.addRounded)} D${r.range ? `, clear from ${Math.round(r.range.nearCm)} to ${Math.round(r.range.farCm)} cm` : ""}`;
      $("#ad-out").innerHTML = `
        <div class="callout ${r.addRounded > 0 ? "ok-callout" : "info"}">${ic(r.addRounded > 0 ? "check" : "info")}<div>
          <strong>${r.addRounded > 0 ? `Start with ${d2(r.addRounded)} D` : "No add needed yet"}</strong>
          ${r.addRounded > 0 ? `over the distance correction, in both eyes.` : `— there is enough accommodation for ${wd} cm.`}</div></div>
        <div class="tablewrap"><table class="plain"><tbody>
          <tr><td>Accommodation needed at ${wd} cm</td><td><b>${r.required.toFixed(2)} D</b></td></tr>
          <tr><td>Amplitude of accommodation</td><td><b>${r.amplitude.toFixed(2)} D</b> <span class="small muted">${r.estimated ? "estimated from age (Hofstetter minimum)" : `measured, near point ${np} cm`}</span></td></tr>
          <tr><td>Half kept in reserve, so usable</td><td>${r.usable.toFixed(2)} D</td></tr>
          <tr><td>Add</td><td><b>${d2(r.addRounded)} D</b> <span class="small muted">(exactly ${r.add.toFixed(2)} D)</span></td></tr>
          ${r.range ? `<tr><td>Clear range through that add</td><td>${Math.round(r.range.nearCm)} cm to ${Math.round(r.range.farCm)} cm</td></tr>` : ""}
        </tbody></table></div>
        ${h ? `<p class="small muted">At ${age} years the amplitude is usually ${h.min.toFixed(1)}–${h.max.toFixed(1)} D (average ${h.average.toFixed(1)} D). Measuring beats estimating.</p>` : ""}
        <div class="callout info">${ic("info")}<div>Try the add in a trial frame or with ready-made readers before dispensing, and check the patient can hold the page where they want it. A high myope in spectacles may need a weak add or none at all.</div></div>
        <div class="row" style="margin-top:.6rem">${shareButton(share, "Share")}</div>`;
    }

    /* ---------- tab: visual acuity ---------- */
    function tabAcuity() {
      return `<div class="card">
        <h3>${ic("eye")} Visual acuity</h3>
        <p class="small text-2" style="margin:-.2rem 0 .8rem">Type it any way you have it: 6/18, 20/70, 0.3, logMAR 0.5, or CF, HM, LP, NLP.</p>
        <div class="inline3">
          <div class="field"><label for="va-r">Right eye</label><input id="va-r" placeholder="e.g. 6/18" autocapitalize="off"></div>
          <div class="field"><label for="va-l">Left eye</label><input id="va-l" placeholder="e.g. 6/60" autocapitalize="off"></div>
          <div class="field" style="justify-content:flex-end"><button type="button" class="btn" id="va-go">${ic("calc")}Convert</button></div>
        </div>
        <div id="va-out"></div></div>
        <div class="card"><h3>${ic("clipboard")} Measuring acuity without a lane</h3>
        <ul class="small">
          <li>Snellen or tumbling E chart at <b>6 m</b>, one eye at a time, the other covered with a card and not a hand. Test with the glasses the patient walked in wearing — that is the <em>presenting</em> acuity WHO categories use — then again with their best correction.</li>
          <li>No 6 m of room? Hang the chart at 3 m and read it in a mirror at 3 m, or use a 3 m chart and record it as such.</li>
          <li>If the top line is missed at 6 m, walk the patient forward and record the distance: reading the 60 line at 3 m is 3/60.</li>
          <li>Then counting fingers, hand movements, light perception and its direction, and finally no light perception.</li>
          <li><b>Pinhole:</b> a card with a 1–1.5 mm hole. If vision improves through it, the problem is largely refractive and glasses will help. If it does not improve, look for cataract, corneal, retinal or optic nerve disease and refer.</li>
        </ul></div>`;
    }
    function vaRow(label, txt) {
      const v = parseVA(txt);
      if (!v) return `<tr><td>${esc(label)}</td><td colspan="5" class="small muted">not recognised</td></tr>`;
      const cat = whoCategory(v);
      const lv = cat.level === "ok" ? "ok" : cat.level === "mild" ? "" : cat.level === "moderate" ? "warn" : "bad";
      /* Show it as it was recorded, with the 6 m equivalent underneath when the
         two differ (3/60, 4 m charts, decimals and logMAR entries). */
      const asRec = v.low || v.entered || v.snellen6;
      const alt = !v.low && asRec !== v.snellen6 ? `<br><span class="small muted">= ${esc(v.snellen6)}</span>` : "";
      return `<tr><td>${esc(label)}</td><td><b>${esc(asRec)}</b>${alt}</td><td>${esc(v.low ? "—" : v.snellen20)}</td><td>${v.low ? "—" : v.decimal.toFixed(2)}</td><td>${v.logMAR.toFixed(2)}</td><td><span class="chip ${lv}">${esc(cat.label)}</span></td></tr>`;
    }
    function runAcuity() {
      const r = val("va-r"), l = val("va-l");
      if (!r && !l) { $("#va-out").innerHTML = `<p class="empty">Enter an acuity.</p>`; return; }
      const worst = [parseVA(r), parseVA(l)].filter(Boolean).sort((a, b) => a.logMAR - b.logMAR)[0];
      const cat = worst ? whoCategory(worst) : null;
      const share = `Visual acuity — right ${r || "—"}, left ${l || "—"}\nBetter eye: ${cat ? cat.label : "—"} (WHO, presenting vision)`;
      $("#va-out").innerHTML = `
        <div class="tablewrap"><table class="plain"><tr><th></th><th>Metric</th><th>Feet</th><th>Decimal</th><th>logMAR</th><th>WHO category</th></tr>
          ${r ? vaRow("Right", r) : ""}${l ? vaRow("Left", l) : ""}</table></div>
        ${cat ? `<div class="callout ${cat.level === "ok" ? "ok-callout" : cat.level === "blind" || cat.level === "severe" ? "danger" : "warn"}">${ic(cat.level === "ok" ? "check" : "alert")}<div>
          <strong>Better eye: ${esc(cat.label)}.</strong> WHO categories use the <em>presenting</em> acuity — ${esc(cat.criterion)}.
          ${cat.level === "blind" || cat.level === "severe" ? " Refer for an eye examination: most severe vision loss here is cataract, glaucoma, trachoma or uncorrected refractive error, and much of it is treatable." : cat.level === "moderate" || cat.level === "mild" ? " Check the pinhole and refract before calling it disease." : ""}</div></div>` : ""}
        <p class="small muted">Conversion table: AAO BCSC Section 3, Table 3-2. Categories: WHO ICD-11 (distance vision impairment), which also counts a visual field under 10° as blindness whatever the acuity.</p>
        <div class="row" style="margin-top:.6rem">${shareButton(share, "Share")}</div>`;
    }

    /* ---------- tab: prism ---------- */
    function tabPrism() {
      return `<div class="card">
        <h3>${ic("swap")} Induced prism (Prentice rule)</h3>
        <p class="small text-2" style="margin:-.2rem 0 .8rem">Every lens acts as a prism away from its optical centre: Δ = h × D, with h in centimetres.</p>
        <div class="inline3">
          <div class="field"><label for="pr-h">Distance off centre (mm)</label><input id="pr-h" type="number" inputmode="decimal" step="1" min="0" max="40" value="10"></div>
          <div class="field"><label for="pr-d">Lens power (D)</label><input id="pr-d" type="number" inputmode="decimal" step="0.25" placeholder="e.g. -4.00"></div>
          <div class="field" style="justify-content:flex-end"><button type="button" class="btn" id="pr-go">${ic("calc")}Calculate</button></div>
        </div>
        <div id="pr-out"></div>
        <div class="hairline"></div>
        <h3 style="margin-top:0">${ic("users")} Anisometropia in downgaze</h3>
        <p class="small text-2" style="margin:-.2rem 0 .8rem">Vertical imbalance when the patient reads through a point below the optical centres — the usual cause of "my new glasses give me double vision when I read".</p>
        <div class="inline3">
          <div class="field"><label for="an-r">Right lens, vertical power (D)</label><input id="an-r" type="number" inputmode="decimal" step="0.25" placeholder="e.g. -1.00"></div>
          <div class="field"><label for="an-l">Left lens, vertical power (D)</label><input id="an-l" type="number" inputmode="decimal" step="0.25" placeholder="e.g. -4.00"></div>
          <div class="field"><label for="an-h">Reading gaze below centre (mm)</label><input id="an-h" type="number" inputmode="decimal" step="1" min="0" max="20" value="10"></div>
        </div>
        <div class="row"><button type="button" class="btn" id="an-go">${ic("calc")}Check the imbalance</button></div>
        <div id="an-out"></div></div>`;
    }
    function runPrism() {
      const h = num("pr-h"), D = num("pr-d");
      if (h == null || D == null) { $("#pr-out").innerHTML = `<p class="empty">Enter both numbers.</p>`; return; }
      const p = prentice(h / 10, D);
      $("#pr-out").innerHTML = `<div class="callout info">${ic("info")}<div><strong>${Math.abs(p).toFixed(2)} Δ</strong> of prism (≈ ${prismToDeg(Math.abs(p)).toFixed(1)}° of deviation).
        The base points ${D > 0 ? "<b>towards</b> the optical centre, because a plus lens is thickest in the middle" : "<b>away from</b> the optical centre, because a minus lens is thinnest in the middle"}.
        ${Math.abs(D) > 0 ? `To build ${Math.abs(p).toFixed(2)} Δ deliberately into this lens, decentre it ${Math.abs(decentration(Math.abs(p), D)).toFixed(1)} mm.` : ""}</div></div>`;
    }
    function runAniso() {
      const r = num("an-r"), l = num("an-l"), h = num("an-h") ?? 10;
      if (r == null || l == null) { $("#an-out").innerHTML = `<p class="empty">Enter both lens powers.</p>`; return; }
      const v = verticalImbalance(r, l, h);
      $("#an-out").innerHTML = `<div class="callout ${v.significant ? "warn" : "ok-callout"}">${ic(v.significant ? "alert" : "check")}<div>
        <strong>${v.diff.toFixed(2)} Δ of vertical imbalance at ${h} mm below the centres.</strong>
        ${v.significant ? "Over about 1.5 Δ most patients notice it: the print doubles or swims when they read. Options are single-vision reading glasses, contact lenses, a lowered or different segment, or slab-off prism — discuss with the optical workshop." : "Below the level most patients notice. No special lens design needed."}</div></div>
        <p class="small muted">Right lens ${Math.abs(prentice(h / 10, r)).toFixed(2)} Δ, left lens ${Math.abs(prentice(h / 10, l)).toFixed(2)} Δ. Use the vertical meridian power of each lens, not the sphere.</p>`;
    }

    /* ---------- tab: low vision ---------- */
    function tabLow() {
      return `<div class="card">
        <h3>${ic("search")} Low vision: how much magnification</h3>
        <p class="small text-2" style="margin:-.2rem 0 .8rem">For a patient whose vision cannot be improved further with glasses or surgery.</p>
        <div class="inline3">
          <div class="field"><label for="lv-va">Best corrected acuity</label><input id="lv-va" placeholder="e.g. 6/60" autocapitalize="off"></div>
          <div class="field"><label for="lv-t">Acuity the task needs</label><input id="lv-t" value="6/12" autocapitalize="off"></div>
          <div class="field" style="justify-content:flex-end"><button type="button" class="btn" id="lv-go">${ic("calc")}Calculate</button></div>
        </div>
        <div id="lv-out"></div></div>
        <div class="card"><h3>${ic("info")} What to do with the number</h3>
        <ul class="small">
          <li>The Kestenbaum add is a <b>starting point</b>, not a prescription. Reading fluency also depends on scotomas, contrast and lighting, and many patients need more than the calculation says.</li>
          <li>A strong add means a short working distance: +10 D means holding print about 10 cm from the eye. Warn the patient, and give good light.</li>
          <li>High reading adds are usually given as single-vision reading glasses for one eye at a time, because the eyes cannot converge that close.</li>
          <li>Before reaching for magnifiers: make the print bigger, get more light on the page, and increase contrast. These cost nothing.</li>
          <li>Ready-made high-plus readers and a hand magnifier cover most needs where no low-vision service exists.</li>
        </ul></div>`;
    }
    function runLow() {
      const now = parseVA(val("lv-va")), target = parseVA(val("lv-t") || "6/12");
      if (!now) { $("#lv-out").innerHTML = `<p class="empty">Enter the acuity, for example 6/60.</p>`; return; }
      if (now.low) { $("#lv-out").innerHTML = `<div class="callout warn">${ic("alert")}<div>With ${esc(now.low.toLowerCase())} vision, magnification will not help much. Refer for a low-vision assessment and focus on orientation, lighting, contrast and non-visual aids.</div></div>`; return; }
      const k = kestenbaum(now), m = target ? magnification(now, target) : null;
      const share = `Low vision — acuity ${val("lv-va")}\nKestenbaum starting add ${d2(k.addRounded)} D (working distance about ${Math.round(k.workingCm)} cm)${m ? `\nMagnification needed for ${val("lv-t")}: ${m.times.toFixed(1)}×` : ""}`;
      $("#lv-out").innerHTML = `
        <div class="tablewrap"><table class="plain"><tbody>
          <tr><td>Acuity entered</td><td><b>${esc(now.snellen6)}</b> (${now.snellen20}, logMAR ${now.logMAR.toFixed(2)})</td></tr>
          <tr><td>Kestenbaum starting add</td><td><b>${d2(k.addRounded)} D</b></td></tr>
          <tr><td>Working distance at that add</td><td>about ${Math.round(k.workingCm)} cm</td></tr>
          ${m ? `<tr><td>Magnification to reach ${esc(target.snellen6)}</td><td><b>${m.times.toFixed(1)}×</b></td></tr>` : ""}
        </tbody></table></div>
        <div class="callout info">${ic("info")}<div>Kestenbaum rule: the add to read 1 M print is the inverse of the Snellen fraction, so ${esc(now.snellen20)} suggests about ${d2(k.addRounded)} D. Many patients read fluently only with a stronger add than this.</div></div>
        <div class="row" style="margin-top:.6rem">${shareButton(share, "Share")}</div>`;
    }

    const TABS = [["refraction", "Prescription"], ["reading", "Reading add"], ["acuity", "Visual acuity"], ["prism", "Prism"], ["lowvision", "Low vision"]];

    function view(main, route) {
      let active = TABS.some(t => t[0] === route.q.tab) ? route.q.tab : "refraction";
      const draw = () => {
        main.innerHTML = `
          <div class="resus-head"><div><h1 style="margin:0">${ic("eye")} Optics and refraction</h1>
            <p class="text-2" style="margin:.2rem 0 0">Prescription maths, the reading add, acuity conversion and low-vision magnification — for outreach clinics with a trial set and no computer.</p></div>
            <div class="row"><a class="btn ghost sm" href="#/drugs?mode=case&group=eye">${ic("book")}Eye conditions</a></div></div>
          <div class="tabs" role="tablist">${TABS.map(([k, v]) => `<button type="button" role="tab" class="tab ${k === active ? "active" : ""}" data-tab="${k}">${v}</button>`).join("")}</div>
          ${active === "refraction" ? tabRefraction() : active === "reading" ? tabReading() : active === "acuity" ? tabAcuity() : active === "prism" ? tabPrism() : tabLow()}
          <p class="small muted">Optics from the AAO Basic and Clinical Science Course, Section 3: Clinical Optics (2019–2020); vision categories from WHO ICD-11. These are calculations, not a prescription: check the result in a trial frame before dispensing.</p>`;
        main.querySelector(".tabs").onclick = (e) => { const t = e.target.closest("[data-tab]"); if (t) { active = t.dataset.tab; draw(); } };
        const run = { refraction: runRefraction, reading: runReading, acuity: runAcuity, prism: runPrism, lowvision: runLow }[active];
        const goId = { refraction: "rx-go", reading: "ad-go", acuity: "va-go", prism: "pr-go", lowvision: "lv-go" }[active];
        const go = $("#" + goId); if (go) go.onclick = run;
        if (active === "prism") { const a = $("#an-go"); if (a) a.onclick = runAniso; }
        main.querySelectorAll("input").forEach(el => el.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); run(); } }));
      };
      draw();
    }
    return { view };
  };
})();
