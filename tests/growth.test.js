/* Run: node tests/growth.test.js — WHO growth standards: LMS tables, z-scores, classification.
   Fixture: 590 published WHO cut-off values (SD-3, SD-2, median, SD+2, SD+3) taken from the
   official WHO expanded z-score tables; each must come back as exactly that z-score. */
global.window = {};
require("../js/growth-data.js");
require("../js/growth.js");
const G = window.Growth.calc;
const fixture = require("./growth-fixture.json");
let pass = 0, fail = 0;
const eq = (name, got, want, tol = 1e-6) => { const ok = typeof want === "number" ? Math.abs(got - want) <= tol : got === want; ok ? pass++ : fail++; if (!ok) console.log(`FAIL ${name}: got ${got}, want ${want}`); };

// --- WHO published cut-offs round-trip to the right z-score ---
let worst = 0, worstCase = null;
for (const c of fixture) {
  const p = G.lms(c.ind, c.sex, c.t);
  if (!p) { fail++; console.log("FAIL no LMS for", c.ind, c.sex, c.t); continue; }
  const z = G.zscore(c.value, p, G.IND[c.ind].adjust);
  const err = Math.abs(z - c.z);
  // WHO prints these cut-offs rounded (MUAC to 0.1 cm, others to 0.001), so allow the rounding step
  const decimals = (String(c.value).split(".")[1] || "").length;
  const step = Math.pow(10, -decimals) / 2;
  const tol = Math.abs(G.zscore(c.value + step, p, G.IND[c.ind].adjust) - z) + 0.02;
  if (err > worst) { worst = err; worstCase = c; }
  if (err <= tol) pass++; else { fail++; console.log("FAIL", c.ind, c.sex, "t", c.t, "value", c.value, "want z", c.z, "got", z.toFixed(3), "tol", tol.toFixed(3)); }
}
console.log(`WHO cut-off checks: ${fixture.length} cases, worst error ${worst.toFixed(4)} z (${worstCase && worstCase.ind})`);

// --- the worked examples in WHO 2007, "Computation of centiles and z-scores" (pdf pp. 211–212) ---
const p1 = { L: -0.0643, M: 15.1536, S: 0.07746 };
eq("book child 1: MUAC 20.3 cm at 24 months", G.zscore(20.3, p1, true), 3.80, 0.01);
const p2 = { L: -0.2730, M: 16.0124, S: 0.08166 };
eq("book child 2: MUAC 11.5 cm at 44 months", G.zscore(11.5, p2, true), -4.11, 0.01);
const p3 = { L: -0.1132, M: 15.3808, S: 0.07794 };
eq("book child 3: MUAC 17.4 cm at 28 months", G.zscore(17.4, p3, true), 1.57, 0.01);
eq("no correction inside ±3 SD", G.zscore(17.4, p3, true), G.rawZ(17.4, p3.L, p3.M, p3.S), 1e-9);
eq("correction changes the value outside ±3 SD", Math.abs(G.zscore(20.3, p1, false) - G.zscore(20.3, p1, true)) > 0.05, true);

// --- the book's table values for those children ---
const muac24 = G.lms("acfa", "male", 24);
eq("MUAC boys 24 months L", muac24.L, -0.0643, 1e-4);
eq("MUAC boys 24 months M", muac24.M, 15.1536, 1e-3);
eq("MUAC boys 24 months S", muac24.S, 0.07746, 1e-5);

// --- known WHO values ---
eq("newborn boy median weight", G.lms("wfa", "male", 0).M, 3.3464, 1e-3);
eq("newborn girl median weight", G.lms("wfa", "female", 0).M, 3.2322, 1e-3);
eq("newborn boy median length", G.lms("lhfa", "male", 0).M, 49.8842, 1e-3);
eq("median is z 0", G.zscore(G.lms("wfa", "male", 365).M, G.lms("wfa", "male", 365), true), 0, 1e-9);
eq("centile of z 0", G.centile(0), 50, 0.01);
eq("centile of z -2", G.centile(-2), 2.275, 0.02);
eq("centile of z 1.645", G.centile(1.645), 95, 0.1);
eq("out-of-range age returns null", G.lms("wfa", "male", 3000), null);
eq("length below 45 cm returns null", G.lms("wfl", "male", 40), null);

// --- length/height switch at 24 months (WHO: standing height is 0.7 cm less than lying length) ---
eq("length to height step at 2 years", G.lms("lhfa", "male", 730).M - G.lms("lhfa", "male", 731).M, 0.7, 0.05);

// --- classification ---
const sam = G.assess({ sex: "male", ageDays: 365, weight: 6.0, height: 75, muac: 11.0 });
eq("SAM flagged by weight-for-length", sam.flags.some(f => f.level === "sam" && /weight-for-height/i.test(f.title)), true);
eq("SAM flagged by MUAC", sam.flags.some(f => /MUAC 11.0 cm: severe/.test(f.title)), true);
eq("weight-for-length used under 2 years", !!sam.wfl && !sam.wfh, true);
const mam = G.assess({ sex: "female", ageDays: 900, weight: 10.6, height: 88, muac: 12.0 });
eq("weight-for-height used from 2 years", !!mam.wfh && !mam.wfl, true);
eq("MAM flagged", mam.flags.some(f => f.level === "mam"), true);
const oed = G.assess({ sex: "male", ageDays: 400, weight: 12, height: 78, oedema: true });
eq("oedema is always SAM", oed.flags[0].level, "sam");
const well = G.assess({ sex: "female", ageDays: 400, weight: 9.6, height: 76, muac: 14.5, hc: 46 });
eq("healthy child has no flag", well.flags[0].level, "ok");
eq("healthy weight-for-age within 1 SD", Math.abs(well.wfa.z) < 1, true);
const teen = G.assess({ sex: "male", ageDays: Math.round(14 * 365.25), weight: 30, height: 160 });
eq("teenager uses the 5–19 reference", !!teen.bfa5 && !!teen.hfa5, true);
eq("teen BMI", teen.bmi, 30 / (1.6 * 1.6), 1e-6);
eq("thinness flagged", teen.flags.some(f => /thinness/i.test(f.title)), true);
eq("BSA (Mosteller)", G.bsa(30, 160), Math.sqrt(30 * 160 / 3600), 1e-9);
eq("stunting flagged", G.assess({ sex: "female", ageDays: 730, weight: 9, height: 76 }).flags.some(f => /stunting/i.test(f.title)), true);

// every indicator covers its full published range
for (const [id, cfg] of Object.entries(G.IND)) {
  for (const sex of ["male", "female"]) {
    const lo = cfg.min ?? 0, hi = cfg.max;
    for (const t of [lo, (lo + hi) / 2, hi]) {
      const p = G.lms(cfg.key, sex, t);
      if (p && p.M > 0 && isFinite(p.L) && p.S > 0) pass++; else { fail++; console.log("FAIL range", id, sex, t); }
    }
  }
}
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
