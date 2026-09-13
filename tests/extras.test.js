/* Run: node tests/extras.test.js — fluids, kidney, newborn dosing, Ethiopian calendar, quiz and sign-off fingerprint. */
const mem = {};
global.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
global.window = { addEventListener() {} };
global.document = { addEventListener() {}, querySelectorAll: () => [] };
global.location = { hash: "", origin: "", pathname: "/" };
global.setInterval = () => 0;
for (const f of ["books", "calc", "drugs-data", "conditions", "resus", "regimens", "compat", "substitutes", "ethcal", "safety", "neonatal", "interactions", "features", "extras"]) require(`../js/${f}.js`);
Object.assign(global, window);
global.API = { cachedReviews: () => [], state: {} };
require("../js/review.js");
const ctx = { $: () => null, esc: s => String(s), ic: () => "", toast() {}, render() {}, ROLES: { first: { label: "", cls: "" } }, textbookHtml: () => "" };
const FX = window.Features(ctx);
const EX = window.Extras({ ...ctx, FX });
const RV = window.Review(ctx);
let pass = 0, fail = 0;
const eq = (name, got, want, tol = 1e-6) => { const ok = typeof want === "number" ? Math.abs(got - want) <= tol : got === want; ok ? pass++ : fail++; if (!ok) console.log(`FAIL ${name}: got ${got}, want ${want}`); };
const C = window.Calc;

// --- maintenance (Nelson Tables 74.2–74.3) ---
eq("maint 8 kg", C.maintenance(8).perHour, 32); eq("maint 8 kg/day", C.maintenance(8).perDay, 800);
eq("maint 15 kg", C.maintenance(15).perHour, 50); eq("maint 15 kg/day", C.maintenance(15).perDay, 1250);
eq("maint 30 kg", C.maintenance(30).perHour, 70); eq("maint 30 kg/day", C.maintenance(30).perDay, 1700);
eq("maint 70 kg capped", C.maintenance(70).perHour, 100); eq("maint cap flag", C.maintenance(70).capped, true); eq("maint 70 kg/day capped", C.maintenance(70).perDay, 2400);
eq("maint fever 39 adds 12 %", C.maintenance(10, 39).perHour, 44.8);
eq("maint invalid", C.maintenance(0), null);
// --- newborn fluids ---
eq("nb day1", C.neonatalFluid(3, 1).perKgDay, 60); eq("nb day2", C.neonatalFluid(3, 2).perKgDay, 90); eq("nb day3", C.neonatalFluid(3, 3).perKgDay, 120); eq("nb day5", C.neonatalFluid(3, 5).perKgDay, 150);
eq("nb 2.5 kg day 4 mL/h", C.neonatalFluid(2.5, 4).perHour, 15.625);
// --- burns ---
let b = C.burns({ weightKg: 70, tbsa: 40, mlPerKgPct: 2, hoursSinceBurn: 0 });
eq("burns total", b.total, 5600); eq("burns first 8 h", b.first8, 2800); eq("burns first rate", b.rateFirst, 350); eq("burns next rate", b.rateNext, 175);
b = C.burns({ weightKg: 20, tbsa: 30, mlPerKgPct: 3, hoursSinceBurn: 2 });
eq("burns late start rate over remaining 6 h", b.rateFirst, 150);
eq("burns tbsa over 100 clamps", C.burns({ weightKg: 10, tbsa: 150, mlPerKgPct: 2 }).total, 2000);
// --- transfusion ---
eq("packed 10 kg Hb 4→6", C.transfusion({ weightKg: 10, currentHb: 4, targetHb: 6, product: "packed" }).volume, 100);
let t = C.transfusion({ weightKg: 10, currentHb: 4, targetHb: 8, product: "packed" }); eq("packed capped 10 mL/kg", t.volume, 100); eq("packed cap flag", t.capped, true);
eq("whole 10 kg Hb 5→7", C.transfusion({ weightKg: 10, currentHb: 5, targetHb: 7, product: "whole" }).volume, 200);
eq("target below current", C.transfusion({ weightKg: 10, currentHb: 8, targetHb: 7 }), null);
// --- kidney ---
eq("CG female 60 y 60 kg 120 µmol", C.crcl({ ageYears: 60, weightKg: 60, sex: "female", creatUmol: 120 }).value, (80 * 60 * 0.85) / (72 * 120 / 88.4));
eq("CG male", C.crcl({ ageYears: 40, weightKg: 70, sex: "male", creatUmol: 88.4 }).value, 100 * 70 / 72);
eq("Schwartz child", C.crcl({ ageYears: 6, creatUmol: 44.2, heightCm: 110 }).value, 0.413 * 110 / 0.5);
eq("child without height errors", !!C.crcl({ ageYears: 6, creatUmol: 44.2 }).error, true);
// --- oxygen ---
const o = C.cylinderMinutes({ fullLitres: 680, pressure: 137, fullPressure: 137, flow: 2 }); eq("full 680 L at 2 L/min", o.minutes, 340); eq("with reserve", o.safeMinutes, 272);
eq("gauge above full is clamped", C.cylinderMinutes({ fullLitres: 680, pressure: 200, fullPressure: 137, flow: 2 }).minutes, 340);

// --- Ethiopian calendar ---
const E = window.EthCal, et = (y, m, d) => { const e = E.jdnToEthiopian(E.gregorianToJdn(y, m, d)); return `${e.year}-${e.month}-${e.day}`; };
eq("Enkutatash 2023 (after leap year)", et(2023, 9, 12), "2016-1-1"); eq("Pagume 6", et(2023, 9, 11), "2015-13-6");
eq("Enkutatash 2024", et(2024, 9, 11), "2017-1-1"); eq("Genna 2026", et(2026, 1, 7), "2018-4-29"); eq("Enkutatash 2027", et(2027, 9, 12), "2020-1-1");
for (const [y, m, d] of [[2000, 2, 29], [2026, 9, 13], [2031, 12, 31]]) { const j = E.gregorianToJdn(y, m, d), e = E.jdnToEthiopian(j); eq(`round trip ${y}-${m}-${d}`, E.ethiopianToJdn(e.year, e.month, e.day), j); }
eq("Amharic format", E.format(new Date(2026, 8, 13), "am"), "መስከረም 3፣ 2019 ዓ.ም.");

// --- newborn dosing ---
const { neoRule, neoDose, renalBand, GEN } = EX._test;
const G = NEONATAL.gentamicin;
eq("genta day 2, 1.5 kg → 3 mg/kg", neoRule(G, 32, 2, 1.5).perKg, 3);
eq("genta day 2, 3 kg → 5 mg/kg", neoRule(G, 39, 2, 3).perKg, 5);
eq("genta day 14 → 7.5 mg/kg", neoRule(G, 39, 14, 3.4).perKg, 7.5);
eq("genta 3 kg dose", neoDose(G, neoRule(G, 39, 2, 3), 3).dose, 15);
eq("genta 3 kg volume at 10 mg/mL", neoDose(G, neoRule(G, 39, 2, 3), 3).volume, 1.5);
eq("ampicillin week 1 every 12 h", neoRule(NEONATAL.ampicillin, 38, 3, 3).every, 12);
eq("ampicillin week 3 every 8 h", neoRule(NEONATAL.ampicillin, 38, 20, 3).every, 8);
eq("vitamin K under 1.5 kg 0.5 mg", neoDose(NEONATAL["vitamin-k"], neoRule(NEONATAL["vitamin-k"], 29, 0, 1.2), 1.2).dose, 0.5);
eq("vitamin K 3 kg 1 mg", neoDose(NEONATAL["vitamin-k"], neoRule(NEONATAL["vitamin-k"], 39, 0, 3), 3).dose, 1);
for (const [id, e] of Object.entries(NEONATAL)) for (const ga of [24, 30, 34, 37, 41]) for (const pna of [0, 6, 7, 8, 21, 28]) for (const w of [0.6, 1.4, 2.2, 3.5]) {
  const r = neoRule(e, ga, pna, w); const d = r && neoDose(e, r, w);
  if (!r || !(d.dose > 0) || !isFinite(d.dose)) { fail++; console.log(`FAIL newborn ${id} GA ${ga} day ${pna} ${w} kg`); } else pass++;
}
// --- kidney bands ---
const GR = SAFETY.gentamicin.renal;
eq("genta CrCl 70 no band", renalBand(GR, 70), null);
eq("genta CrCl 50 → under-60 band", renalBand(GR, 50).below, 60);
eq("genta CrCl 30 → under-40 band", renalBand(GR, 30).below, 40);
eq("genta CrCl 10 → most severe band", renalBand(GR, 10).below, 20);

// --- quiz: every generated question has 4 distinct options including the answer ---
let qn = 0;
for (const topic of Object.keys(GEN)) for (const g of GEN[topic]) for (let i = 0; i < 150; i++) {
  const q = g(); if (!q) continue; qn++;
  const okQ = q.options.length === 4 && new Set(q.options).size === 4 && q.options.includes(q.answer) && q.q && q.why !== undefined;
  if (!okQ) { fail++; console.log("FAIL quiz", topic, JSON.stringify(q)); break; } else pass++;
}
eq("quiz generated questions", qn > 500, true);
// never-mix questions never use blood or catch-all drugs as the correct answer or a distractor
for (let i = 0; i < 300; i++) { const q = GEN.safety[0](); if (q && q.options.some(o => /Blood transfusion|Diazepam|Insulin|Phenobarbital|Metronidazole|antivenom/i.test(o))) { fail++; console.log("FAIL ambiguous never-mix", JSON.stringify(q)); break; } }
pass++;

// --- high-alert expected dose ---
FX.patient.weight = 12;
eq("insulin expected 1.2 units at 12 kg", EX._test.expectedDose(DRUG_DB.find(d => d.id === "insulin-soluble")).value, 1.2);
eq("high-alert list contains insulin", FX.HIGH_ALERT.includes("insulin-soluble"), true);
FX.patient.weight = 2.4;
eq("tiny insulin volume says dilute", /dilute first/.test(FX.doseLine(FX.computeDose(DRUG_DB.find(d => d.id === "insulin-soluble").calc, 2.4), DRUG_DB.find(d => d.id === "insulin-soluble").calc)), true);

// --- sign-off fingerprint ---
const ox = DRUG_DB.find(d => d.id === "oxytocin");
const h1 = RV.contentHash(ox);
eq("hash is stable", RV.contentHash(JSON.parse(JSON.stringify(ox))), h1);
eq("hash ignores review field", RV.contentHash({ ...ox, review: { status: "reviewed", by: "x" } }), h1);
eq("hash changes when a dose changes", RV.contentHash({ ...ox, presentation: [...ox.presentation, "x"] }) !== h1, true);
eq("hash format", /^[0-9a-f]{16}$/.test(h1), true);
eq("unique hashes across drugs", new Set(DRUG_DB.map(RV.contentHash)).size, DRUG_DB.length);

console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
