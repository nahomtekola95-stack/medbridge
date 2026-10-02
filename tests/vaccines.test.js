/* Run: node tests/vaccines.test.js — catch-up immunisation.
   Reference values are Table 5 (pdf p. 15) of the Ethiopian Ministry of Health
   routine immunization catch-up vaccination guidelines (May 2022): minimum age
   for dose 1, minimum interval between doses, and the upper age limit for
   catch-up, plus the routine schedule and job aid on pp. 14 and 31. */
global.window = {};
require("../js/vaccines.js");
const V = window.Vaccines.calc;
let pass = 0, fail = 0;
const eq = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  if (!ok) console.log(`FAIL ${name}: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
};
const M = 30.4375, mo = (n) => Math.round(n * M), wk = (n) => n * 7;
const st = (ageDays, given = {}, since = {}) =>
  Object.fromEntries(V.plan({ ageDays, given, since }).rows.map(r => [r.id, r.status]));

/* --- the schedule itself matches Table 5 --- */
const T5 = [
  ["bcg",   1, 0,       null,  12],
  ["opv",   3, wk(6),   wk(4), 59],
  ["rota",  2, wk(6),   wk(4), 24],
  ["pcv",   3, wk(6),   wk(4), 24],
  ["penta", 3, wk(6),   wk(4), 24],
  ["ipv",   2, wk(14),  wk(4), 24],
  ["mcv",   2, mo(9),   wk(4), 59]
];
for (const [id, doses, minAge, interval, maxMonths] of T5) {
  const a = V.byId(id);
  eq(`${id} total doses`, a.doses, doses);
  eq(`${id} minimum age for dose 1`, a.minAgeDays, minAge);
  eq(`${id} minimum interval`, a.intervalDays, interval);
  eq(`${id} upper age limit in months`, a.maxMonths, maxMonths);
}
/* the three antigens the guideline excludes from catch-up, and the birth doses */
/* Hep B birth dose: the routine schedule allows 14 days for a home delivery,
   the catch-up table excludes it entirely — both readings are carried */
eq("Hep B birth dose window runs to 14 days for a home birth", V.byId("hepb0").maxDays, 14);
eq("and it is offered only on condition of a home birth", /born at home/.test(V.byId("hepb0").conditional), true);
eq("and the contradiction between the two tables is recorded", /catch-up table/.test(V.byId("hepb0").note), true);
eq("OPV 0 is limited to 14 days", V.byId("opv0").maxDays, 14);
eq("no HPV or Td in the catch-up set", V.ANTIGENS.some(a => /hpv|^td$/i.test(a.id)), false);

/* --- upper age limits: "up to N months" means before the next birthday --- */
eq("BCG still possible at 11 months", st(mo(11)).bcg, "give");
eq("BCG too old at 13 months", st(mo(13)).bcg, "too-old");
eq("Penta still possible at 23 months", st(mo(23)).penta, "give");
eq("Penta too old at 25 months", st(mo(25)).penta, "too-old");
eq("measles still possible at 4 years", st(mo(48)).mcv, "give");
eq("measles too old at 5 years", st(mo(61)).mcv, "too-old");
eq("OPV still possible at 4 years", st(mo(48)).opv, "give");
eq("rotavirus too old at 25 months", st(mo(25)).rota, "too-old");
eq("Hep B birth dose still possible on day 13 after a home birth", st(13).hepb0, "give");
eq("Hep B birth dose gone by day 20", st(20).hepb0, "too-old");
eq("Hep B birth dose gone at 2 months", st(mo(2)).hepb0, "too-old");
eq("OPV 0 past 14 days is too old", st(30).opv0, "too-old");
eq("OPV 0 on day 10 can still be given", st(10).opv0, "give");

/* --- minimum ages --- */
eq("nothing but birth doses at 2 weeks", st(14).penta, "later");
eq("Penta starts at 6 weeks", st(wk(6)).penta, "give");
eq("Penta not yet at 5 weeks", st(wk(5)).penta, "later");
eq("IPV not before 14 weeks", st(wk(13)).ipv, "later");
eq("IPV from 14 weeks", st(wk(14)).ipv, "give");
eq("measles not before 9 months", st(mo(8)).mcv, "later");
eq("measles from 9 months", st(mo(9)).mcv, "give");

/* --- an interrupted series is continued, never restarted --- */
const late = V.plan({ ageDays: mo(14), given: { bcg: 1, opv0: 1, opv: 2, penta: 2, pcv: 2, rota: 2 } });
const give = Object.fromEntries(late.giveNow.map(r => [r.id, r.dose]));
eq("the 14-month child gets Penta 3, not Penta 1", give.penta, 3);
eq("and PCV 3", give.pcv, 3);
eq("and OPV 3", give.opv, 3);
eq("and a first IPV", give.ipv, 1);
eq("and a first measles", give.mcv, 1);
eq("rotavirus is already complete", late.rows.find(r => r.id === "rota").status, "complete");
eq("five vaccines in one visit", late.giveNow.length, 5);
eq("four of them are injections", late.injections, 4);
eq("one is oral", late.oral, 1);

/* --- the minimum interval is enforced against the last dose actually given --- */
eq("Penta 3 held back when Penta 2 was 10 days ago",
  V.plan({ ageDays: mo(14), given: { penta: 2 }, since: { penta: 10 } }).rows.find(r => r.id === "penta").status, "later");
eq("and the reason given is the interval, not the age",
  V.plan({ ageDays: mo(14), given: { penta: 2 }, since: { penta: 10 } }).rows.find(r => r.id === "penta").reason, "interval");
eq("Penta 3 allowed when Penta 2 was 28 days ago",
  V.plan({ ageDays: mo(14), given: { penta: 2 }, since: { penta: 28 } }).rows.find(r => r.id === "penta").status, "give");
eq("an unknown last-dose date is flagged rather than assumed safe",
  V.plan({ ageDays: mo(14), given: { penta: 2 } }).rows.find(r => r.id === "penta").unknownInterval, true);
eq("a first dose carries no interval caveat",
  V.plan({ ageDays: mo(14), given: {} }).rows.find(r => r.id === "penta").unknownInterval, false);

/* --- OPV 1 follows a birth dose by 6 weeks, not 4 --- */
eq("OPV 1 not due at 4 weeks after a birth dose", st(wk(4), { opv0: 1 }).opv, "later");
eq("OPV 1 due at 6 weeks after a birth dose", st(wk(6), { opv0: 1 }).opv, "give");

/* --- the return visit accounts for what was just given --- */
const nv = V.plan({ ageDays: mo(14), given: { bcg: 1, opv0: 1, opv: 2, penta: 2, pcv: 2, rota: 2 } });
eq("after today, IPV 2 and measles 2 are still owed", nv.later.map(r => r.id).sort(), ["ipv", "mcv"]);
eq("and they are owed in 4 weeks", nv.nextVisitDays, 28);
const done = V.plan({ ageDays: mo(30), given: { bcg: 1, opv0: 1, opv: 3, penta: 3, pcv: 3, rota: 2, ipv: 2, mcv: 2 } });
eq("a fully vaccinated child needs no return visit", done.nextVisitDays, null);
eq("and has nothing to give", done.giveNow.length, 0);

/* --- a child who has had nothing --- */
const zero = V.plan({ ageDays: mo(10), given: {} });
/* every antigen whose minimum age has passed and whose limit has not is due at
   this one visit — including IPV, whose minimum age of 14 weeks is long past */
eq("zero-dose 10-month-old starts every antigen still open to them",
  zero.giveNow.map(r => r.id).sort(), ["bcg", "ipv", "mcv", "opv", "pcv", "penta", "rota"]);
eq("that is seven vaccines at one visit", zero.giveNow.length, 7);
eq("five of them are injections", zero.injections, 5);
eq("the Hep B birth dose is not offered at 10 months", zero.giveNow.some(r => r.id === "hepb0"), false);
eq("the OPV birth dose is not offered at 10 months", zero.giveNow.some(r => r.id === "opv0"), false);

/* --- completeness --- */
eq("every antigen has a route", V.ANTIGENS.every(a => a.route), true);
eq("every antigen has a schedule note", V.ANTIGENS.every(a => a.when), true);
eq("every antigen explains what happens past its limit",
  V.ANTIGENS.every(a => a.noCatchUp || a.maxMonths != null), true);
eq("the IPV dose-count discrepancy is recorded in the entry", /routine schedule/.test(V.byId("ipv").note), true);

/* --- cross-check the calculator against the independently-read lookup table ---
   js/vaccines.js and js/vaccines-data.js were read from the same two tables by
   different passes. Where they describe the same antigen they must agree; if
   one of them misread the guideline, this is where it shows up. */
require("../js/vaccines-data.js");
const SCHED = window.VACCINE_SCHEDULE;
/* Some cells state more than one duration — OPV's interval is 6 weeks after the
   birth dose and 4 weeks after that; measles names both the 15-month target and
   the 4-week minimum. So collect every duration in the cell and require the
   calculator's value to be one of them, rather than the first one written. */
const durations = (s) => [...String(s || "").matchAll(/(\d+(?:\.\d+)?)\s*(week|month|year|day)/gi)]
  .map(m => { const n = +m[1], u = m[2].toLowerCase();
    return u === "week" ? n * 7 : u === "month" ? Math.round(n * M) : u === "year" ? Math.round(n * 365.25) : n; });
const num = (s) => { const d = durations(s); return d.length ? d[0] : null; };
const MAP = { bcg: "bcg", opv: "opv", penta: "penta", pcv: "pcv", rota: "rota", ipv: "ipv", mcv: "mcv" };
for (const [mine, theirs] of Object.entries(MAP)) {
  const a = V.byId(mine), b = SCHED.antigens.find(x => x.id === theirs);
  eq(`lookup has ${theirs}`, !!b, true);
  if (!b) continue;
  eq(`${mine}: catch-up dose count agrees`, a.doses, b.catchup.doses - (mine === "opv" ? 1 : 0));
  const mi = durations(b.catchup.minInterval);
  if (mi.length) eq(`${mine}: minimum interval is one of those the lookup states`, mi.includes(a.intervalDays), true);
  const ua = num(b.catchup.upperAgeLimit);
  if (ua != null && a.maxMonths != null) eq(`${mine}: upper age limit agrees`, Math.round(a.maxMonths * M), ua);
}
eq("the lookup also carries the antigens outside catch-up",
  SCHED.antigens.filter(x => !x.catchup.eligible).map(x => x.id).sort(), ["hepb-birth", "hpv", "td"]);
eq("the never-restart rule is recorded", SCHED._rules.some(r => /restart/i.test(r.rule || JSON.stringify(r))), true);
eq("the lookup is marked draft", SCHED._review.status, "draft");

console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
