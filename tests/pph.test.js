/* Run: node tests/pph.test.js — PPH diagnosis thresholds, bundle timing and the
   tranexamic acid window. Reference values are the WHO recommendations:
   diagnosis at >=300 mL with abnormal haemodynamic signs or >=500 mL whichever
   comes first; bundle started within 15 minutes; TXA within 3 hours of BIRTH,
   second dose after 30 minutes, up to 24 hours. */
global.window = {};
require("../js/pph.js");
const P = window.PPH.calc;
let pass = 0, fail = 0;
const eq = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  if (!ok) console.log(`FAIL ${name}: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
};
const MIN = 60000, HOUR = 3600000;

/* --- diagnosis ------------------------------------------------------- */
eq("500 mL is PPH on its own", P.diagnose({ lossMl: 500 }).pph, true);
eq("501 mL is PPH", P.diagnose({ lossMl: 501 }).pph, true);
eq("499 mL with no signs is not yet PPH", P.diagnose({ lossMl: 499 }).pph, false);
eq("499 mL with no signs is a watch", P.diagnose({ lossMl: 499 }).watch, true);
eq("300 mL with a warning sign is PPH", P.diagnose({ lossMl: 300, signs: true }).pph, true);
eq("299 mL with a warning sign is not yet PPH", P.diagnose({ lossMl: 299, signs: true }).pph, false);
eq("299 mL with a warning sign is a watch", P.diagnose({ lossMl: 299, signs: true }).watch, true);
eq("300 mL with no signs is not PPH", P.diagnose({ lossMl: 300 }).pph, false);
eq("a sign alone is not PPH", P.diagnose({ lossMl: 0, signs: true }).pph, false);
eq("nothing at all is not PPH", P.diagnose({ lossMl: 0 }).pph, false);
eq("nothing at all is not even a watch", P.diagnose({ lossMl: 0 }).watch, false);
eq("no arguments is safe", P.diagnose().pph, false);
eq("500 mL reason names the volume", /500/.test(P.diagnose({ lossMl: 600 }).reason), true);
eq("300 mL reason names the observations", /observations/.test(P.diagnose({ lossMl: 350, signs: true }).reason), true);
/* whichever comes first: 500 mL wins even when signs are present */
eq("500 mL with signs reports the 500 threshold", P.diagnose({ lossMl: 500, signs: true }).at, 500);
eq("350 mL with signs reports the 300 threshold", P.diagnose({ lossMl: 350, signs: true }).at, 300);

/* --- the bundle ------------------------------------------------------ */
eq("six bundle elements", P.BUNDLE.length, 6);
eq("the bundle is massage, oxytocic, TXA, fluids, examination, escalation",
  P.BUNDLE.map(b => b.key), ["massage", "oxytocic", "txa", "fluids", "examine", "escalate"]);
const t0 = Date.now();
eq("nothing done yet", P.bundleStatus({}, t0, t0).done, 0);
eq("not complete", P.bundleStatus({}, t0, t0).complete, false);
eq("all six done is complete", P.bundleStatus(
  Object.fromEntries(P.BUNDLE.map(b => [b.key, t0])), t0, t0).complete, true);
eq("part done counts", P.bundleStatus({ massage: t0, txa: t0 }, t0, t0).done, 2);
eq("missing lists what is left", P.bundleStatus({ massage: t0 }, t0, t0).missing.length, 5);
eq("inside 15 minutes is on target", P.bundleStatus({ massage: t0 }, t0, t0 + 14 * MIN).withinTarget, true);
eq("at exactly 15 minutes is still on target", P.bundleStatus({ massage: t0 }, t0, t0 + 15 * MIN).withinTarget, true);
eq("past 15 minutes is not", P.bundleStatus({ massage: t0 }, t0, t0 + 16 * MIN).withinTarget, false);
eq("past 15 minutes with work left is overdue", P.bundleStatus({ massage: t0 }, t0, t0 + 16 * MIN).overdue, true);
eq("past 15 minutes but finished is not overdue", P.bundleStatus(
  Object.fromEntries(P.BUNDLE.map(b => [b.key, t0])), t0, t0 + 40 * MIN).overdue, false);
eq("elapsed minutes", P.bundleStatus({}, t0, t0 + 7 * MIN).elapsedMin, 7);
eq("no diagnosis time, no overdue", P.bundleStatus({}, null, t0).overdue, false);

/* --- tranexamic acid: 3 hours from BIRTH ----------------------------- */
eq("no birth time, no window", P.txaWindow(null), null);
const birth = t0;
eq("deadline is 3 hours after birth", P.txaWindow(birth, birth).deadline, birth + 3 * HOUR);
eq("at birth there are 180 minutes", P.txaWindow(birth, birth).leftMin, 180);
eq("not expired at birth", P.txaWindow(birth, birth).expired, false);
eq("not expired at 2h59", P.txaWindow(birth, birth + 3 * HOUR - MIN).expired, false);
eq("expired at exactly 3 hours", P.txaWindow(birth, birth + 3 * HOUR).expired, true);
eq("expired after 3 hours", P.txaWindow(birth, birth + 4 * HOUR).expired, true);
eq("urgent inside the last 30 minutes", P.txaWindow(birth, birth + 2.75 * HOUR).urgent, true);
eq("not urgent with an hour to go", P.txaWindow(birth, birth + 2 * HOUR).urgent, false);
eq("expired is not also urgent", P.txaWindow(birth, birth + 5 * HOUR).urgent, false);
/* the window runs from birth, not from the diagnosis — a PPH called two hours
   after birth leaves one hour, not three */
eq("window is measured from birth, not from the diagnosis", P.txaWindow(birth, birth + 2 * HOUR).leftMin, 60);

/* --- second dose ----------------------------------------------------- */
eq("no first dose, no second", P.secondDose(null), null);
const first = t0;
eq("due 30 minutes after the first", P.secondDose(first, first).due, first + 30 * MIN);
eq("not due immediately", P.secondDose(first, first).dueNow, false);
eq("due at 30 minutes", P.secondDose(first, first + 30 * MIN).dueNow, true);
eq("still due at 12 hours", P.secondDose(first, first + 12 * HOUR).dueNow, true);
eq("due at exactly 24 hours", P.secondDose(first, first + 24 * HOUR).dueNow, true);
eq("past 24 hours it has lapsed", P.secondDose(first, first + 25 * HOUR).lapsed, true);
eq("past 24 hours it is no longer due", P.secondDose(first, first + 25 * HOUR).dueNow, false);
eq("minutes until due", P.secondDose(first, first + 10 * MIN).inMin, 20);

/* --- content --------------------------------------------------------- */
eq("five warning signs", P.SIGNS.length, 5);
eq("every sign has a key and a label", P.SIGNS.every(s => s.key && s.label), true);
eq("escalation covers theatre and referral",
  ["theatre", "refer"].every(k => P.ESCALATION.some(e => e.key === k)), true);
eq("every bundle step explains itself", P.BUNDLE.every(b => b.title && b.detail && b.how), true);
eq("every escalation step explains itself", P.ESCALATION.every(e => e.title && e.detail), true);
/* the drugs named on the bundle must be real entries */
global.window.DRUG_DB = undefined;
require("../js/drugs-data.js");
const ids = new Set(window.DRUG_DB.map(d => d.id));
for (const b of P.BUNDLE) for (const id of (b.drugs || [])) eq(`bundle drug ${id} exists`, ids.has(id), true);

console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
