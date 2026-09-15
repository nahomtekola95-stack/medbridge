/* Run: node tests/obstetric.test.js — pregnancy dating, redating, fetal weight and ward board dose links. */
const mem = {};
global.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
global.window = { addEventListener() {} };
global.document = { addEventListener() {}, querySelectorAll: () => [] };
global.setInterval = () => 0;
for (const f of ["calc", "drugs-data", "conditions", "resus", "regimens", "compat", "substitutes", "ethcal", "features", "obstetric", "ward"]) require(`../js/${f}.js`);
Object.assign(global, window);
let pass = 0, fail = 0;
const eq = (name, got, want, tol = 1e-6) => { const ok = typeof want === "number" ? Math.abs(got - want) <= tol : got === want; ok ? pass++ : fail++; if (!ok) console.log(`FAIL ${name}: got ${got}, want ${want}`); };
const C = window.Obstetric.calc, E = window.EthCal;
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// the user's sample: LNMP Tir 5, 2018 E.C. = 13 Jan 2026 → EDD Tikimt 10, 2019 = 20 Oct 2026; 35+0 weeks on Meskerem 5, 2019
const lnmp = E.toDate(2018, 5, 5);
eq("Tir 5 2018 = 13 Jan 2026", iso(lnmp), "2026-01-13");
const lmp = C.lmpEquivalent({ method: "lnmp", date: lnmp });
eq("EDD Gregorian", iso(C.edd(lmp)), "2026-10-20");
const eddEt = E.fromDate(C.edd(lmp)); eq("EDD Ethiopian", `${eddEt.year}-${eddEt.month}-${eddEt.day}`, "2019-2-10");
const g = C.ga(lmp, E.toDate(2019, 1, 5)); eq("GA on Meskerem 5 2019 weeks", g.weeks, 35); eq("GA days", g.rem, 0);
// sample milestone dates
const mdate = (w, d = 0) => { const x = E.fromDate(C.addDays(lmp, w * 7 + d)); return `${x.year}-${x.month}-${x.day}`; };
eq("NT start 11w0d = Megabit 22 2018", mdate(11), "2018-7-22");
eq("NT end 13w6d = Miyazya 12 2018", mdate(13, 6), "2018-8-12");
eq("aspirin 12w = Megabit 29 2018", mdate(12), "2018-7-29");
eq("anatomy 18w = Ginbot 11 2018", mdate(18), "2018-9-11");
eq("OGTT 24w = Sene 23 2018", mdate(24), "2018-10-23");
eq("anti-D 28w = Hamle 21 2018", mdate(28), "2018-11-21");
eq("ANC 34w = Pagume 3 2018", mdate(34), "2018-13-3");
eq("elective CS 39w = Tikimt 3 2019", mdate(39), "2019-2-3");
eq("post-term 42w = Tikimt 24 2019", mdate(42), "2019-2-24");
eq("ANC contacts", C.ANC.join(","), "12,20,26,30,34,36,38,40,41");

// other dating methods
const d0 = new Date(2026, 2, 1);
eq("cycle 35 adds 7 days", C.daysBetween(C.lmpEquivalent({ method: "lnmp", date: d0 }), C.lmpEquivalent({ method: "lnmp", date: d0, cycle: 35 })), 7);
eq("ultrasound 10w3d", C.daysBetween(C.lmpEquivalent({ method: "us", date: d0, gaWeeks: 10, gaDays: 3 }), d0), 73);
eq("IVF day 5: EDD = transfer + 261", C.daysBetween(d0, C.edd(C.lmpEquivalent({ method: "ivf", date: d0, embryoDay: 5 }))), 261);
eq("IVF day 3: EDD = transfer + 263", C.daysBetween(d0, C.edd(C.lmpEquivalent({ method: "ivf", date: d0, embryoDay: 3 }))), 263);
eq("conception: EDD = + 266", C.daysBetween(d0, C.edd(C.lmpEquivalent({ method: "conception", date: d0 }))), 266);
eq("trimester boundaries", [C.trimester(13 * 7 + 6), C.trimester(14 * 7), C.trimester(27 * 7 + 6), C.trimester(28 * 7)].join(), "1,2,2,3");

// ACOG CO 700 redating thresholds
const scan = new Date(2026, 4, 1);
const r = (usW, usD, lmpGaDays) => C.redate({ lmpDate: C.addDays(scan, -lmpGaDays), usDate: scan, usWeeks: usW, usDays: usD });
eq("8w: 5 days keeps LNMP", r(8, 0, 61).useUltrasound, false);
eq("8w: 6 days redates", r(8, 0, 62).useUltrasound, true);
eq("12w: 7 days keeps", r(12, 0, 91).useUltrasound, false);
eq("12w: 8 days redates", r(12, 0, 92).useUltrasound, true);
eq("18w: 10 days keeps", r(18, 0, 136).useUltrasound, false);
eq("18w: 11 days redates", r(18, 0, 137).useUltrasound, true);
eq("24w: limit 14", r(24, 0, 168 + 15).limit, 14);
eq("30w: 21 days keeps", r(30, 0, 210 + 21).useUltrasound, false);
eq("30w: 22 days redates and flags late", r(30, 0, 210 + 22).late, true);

// Hadlock
eq("Hadlock 1991 mean 40 w ≈ 3619 g", Math.round(C.efwMean(40)), 3620, 3);
eq("Hadlock 1991 mean 28 w ≈ 1210 g", Math.round(C.efwMean(28)), 1210, 3);
eq("Hadlock 1991 mean 20 w ≈ 331 g", Math.round(C.efwMean(20)), 331, 3);
eq("mean weight is the 50th centile", Math.round(C.efwCentile(C.efwMean(32), 32).centile), 50);
eq("10th centile at the p10 weight", Math.round(C.efwCentile(C.efwCentile(1, 32).p10, 32).centile), 10);
const efw = C.efwHadlock({ hc: 29.5, ac: 28.5, fl: 6.3 });   // typical ~32–33 weeks
eq("Hadlock 1985 EFW plausible at 32–33 weeks", efw > 1700 && efw < 2400, true);
eq("EFW needs all three", C.efwHadlock({ hc: 29, ac: 0, fl: 6 }), null);
eq("AFI oligohydramnios", C.afi([1, 1, 1.5, 1]).label, "Oligohydramnios");
eq("AFI normal", C.afi([4, 3, 3.5, 3]).label, "Normal");
eq("AFI polyhydramnios", C.afi([7, 6, 6, 6]).label, "Polyhydramnios");

// Ethiopian month lengths and every milestone from any date is a real calendar date
for (let y = 2015; y <= 2021; y++) { eq(`Pagume ${y}`, E.monthDays(y, 13), y % 4 === 3 ? 6 : 5); for (let m = 1; m <= 13; m++) for (const d of [1, E.monthDays(y, m)]) { const back = E.fromDate(E.toDate(y, m, d)); if (back.year !== y || back.month !== m || back.day !== d) { fail++; console.log("FAIL roundtrip", y, m, d); } else pass++; } }

// ward board: a schedule started for a bed shows as that bed's next dose
const ctx = { $: () => null, esc: String, ic: () => "", toast() {}, render() {}, ROLES: {} };
const FX = window.Features(ctx);
const WD = window.Ward({ ...ctx, FX, shareButton: () => "" });
const now = Date.now();
FX.scheds.save([{ id: "s1", regimen: "mgso4-pritchard", label: "Bed 4 A.K.", weight: null, start: now - 3.5 * 3600e3, log: { "0@0": { status: "given", at: now - 3.5 * 3600e3 } }, extraHours: 0, created: now, bed: "b1" }]);
const st = WD._test.doseStatus({ id: "b1" });
eq("bed has its schedule", st.list.length, 1);
eq("next dose is maintenance", /Maintenance/.test(st.next.label), true);
eq("next due within 1 h", st.next.due - now < 3600e3 && st.next.due - now > 0, true);
eq("other bed has none", WD._test.doseStatus({ id: "b2" }).list.length, 0);

console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
