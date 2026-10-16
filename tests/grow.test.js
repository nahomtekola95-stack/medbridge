/* Run: node tests/grow.test.js — the opportunities board (js/careers.js) and
   "My learning" (js/learning.js). Deadlines must count whole days and drop
   closed posts; links must be http(s) only; the case of the day must never
   offer a wrong option that is actually in the case, and must be the same for
   everyone on the same day. */
global.window = {};
for (const f of ["drugs-data", "conditions", "careers-data", "careers", "learning"]) require(`../js/${f}.js`);
const K = window.Careers.calc, L = window.Learning.calc;
let pass = 0, fail = 0;
const eq = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  if (!ok) console.log(`FAIL ${name}: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
};

/* --- deadlines ---------------------------------------------------------- */
const today = new Date(2026, 9, 16);   // 16 Oct 2026, local
eq("deadline today is 0 days", K.daysLeft("2026-10-16", today), 0);
eq("deadline tomorrow is 1 day", K.daysLeft("2026-10-17", today), 1);
eq("deadline yesterday is -1", K.daysLeft("2026-10-15", today), -1);
eq("across a month end", K.daysLeft("2026-11-01", today), 16);
eq("no deadline is null", K.daysLeft(null, today), null);
eq("a malformed deadline is null", K.daysLeft("next week", today), null);
eq("label: today", K.deadlineLabel(0).text, "Closes today");
eq("label: within a week is a warning", K.deadlineLabel(5).cls, "warn");
eq("label: closed", K.deadlineLabel(-2).text, "Closed");
eq("label: open-ended", K.deadlineLabel(null).text, "Open — no deadline given");

/* --- filtering and order ------------------------------------------------ */
const O = (id, extra) => ({ id, kind: "job", title: "t " + id, org: "o", body: "b", status: "published", cadres: [], publishedAt: "2026-10-01", ...extra });
const list = [O("late", { deadline: "2026-12-01" }), O("open", { deadline: null }), O("soon", { deadline: "2026-10-20" }),
  O("gone", { deadline: "2026-10-01" }), O("schol", { kind: "scholarship", deadline: "2026-11-01" }),
  O("nurse", { cadres: ["nurse"], deadline: "2026-10-25" })];
eq("soonest deadline first, open-ended last, closed dropped", K.filterOpps(list, { today }).map(o => o.id), ["soon", "nurse", "schol", "late", "open"]);
eq("filter by kind", K.filterOpps(list, { kind: "scholarship", today }).map(o => o.id), ["schol"]);
eq("a cadre filter keeps posts open to everyone", K.filterOpps(list, { cadre: "physician", today }).map(o => o.id), ["soon", "schol", "late", "open"]);
eq("a cadre filter keeps posts for that cadre", K.filterOpps(list, { cadre: "nurse", today }).some(o => o.id === "nurse"), true);
eq("search needs every word", K.filterOpps([O("a", { title: "Emergency GP Adama" })], { q: "gp adama", today }).length, 1);
eq("search: missing word drops it", K.filterOpps([O("a", { title: "Emergency GP Adama" })], { q: "gp hawassa", today }).length, 0);
eq("new since last visit", K.newSince([O("x", { publishedAt: "2026-10-10" }), O("y", { publishedAt: "2026-10-02" })], "2026-10-05"), 1);
eq("everything is new on a first visit", K.newSince([O("x"), O("y")], ""), 2);
eq("only http(s) links are used", [K.safeUrl("https://a.org"), K.safeUrl("http://a.org"), K.safeUrl("javascript:alert(1)"), K.safeUrl("")], ["https://a.org", "http://a.org", "", ""]);

/* --- the directory of official sites ------------------------------------ */
const C = window.CAREERS;
const links = C.DIRECTORY.flatMap(g => g.items);
eq("directory has entries", links.length > 10, true);
eq("every directory link is https", links.every(x => /^https:\/\//.test(x.url)), true);
eq("every directory entry says what it is for", links.every(x => x.name && x.for), true);
eq("no duplicate directory links", new Set(links.map(x => x.url)).size, links.length);
eq("every kind has a label and icon", Object.values(C.KINDS).every(k => k.label && k.one && k.icon), true);

/* --- case of the day ------------------------------------------------------ */
const CASES = window.CONDITIONS, DRUGS = window.DRUG_DB;
let bad = 0, two = 0, n = 0;
for (let d = 0; d < 120; d++) {
  const dt = new Date(2026, 0, 1 + d), key = L.dayKey(dt), t = L.daily(CASES, DRUGS, key);
  if (!t) { bad++; continue; } n++;
  const c = CASES.find(x => x.id === t.caseId), inCase = new Set(c.drugs.map(x => x.id));
  const q1 = t.qs[0];
  if (c.drugs.find(x => x.id === q1.answer)?.role !== "first") bad++;
  if (q1.options.length !== 4 || !q1.options.some(o => o.id === q1.answer)) bad++;
  if (q1.options.some(o => o.id !== q1.answer && inCase.has(o.id))) bad++;               // a wrong option must not be in the case
  if (new Set(q1.options.map(o => o.id)).size !== q1.options.length) bad++;
  if (t.qs[1]) { two++; const q2 = t.qs[1];
    if (c.drugs.find(x => x.id === q2.answer)?.role !== "avoid") bad++;
    if (q2.options.some(o => o.id !== q2.answer && c.drugs.find(x => x.id === o.id)?.role === "avoid")) bad++; }
  if (JSON.stringify(L.daily(CASES, DRUGS, key)) !== JSON.stringify(t)) bad++;          // same for everyone that day
}
eq("120 days of daily cases are all sound", bad, 0);
eq("a case is chosen every day", n, 120);
eq("some days have the 'avoid' question too", two > 10, true);
eq("the case changes from day to day", L.daily(CASES, DRUGS, "2026-03-01").caseId !== L.daily(CASES, DRUGS, "2026-03-02").caseId, true);

/* --- streak and hours ------------------------------------------------------ */
eq("streak counts back from today", L.streak(["2026-10-14", "2026-10-15", "2026-10-16"], "2026-10-16"), 3);
eq("today not done yet keeps yesterday's streak", L.streak(["2026-10-14", "2026-10-15"], "2026-10-16"), 2);
eq("a gap breaks the streak", L.streak(["2026-10-12", "2026-10-15", "2026-10-16"], "2026-10-16"), 2);
eq("no days, no streak", L.streak([], "2026-10-16"), 0);
eq("training hours in the last year", L.hours([{ date: "2026-09-01", hours: 16 }, { date: "2026-01-10", hours: 4.5 }, { date: "2025-01-01", hours: 40 }], 365, "2026-10-16"), 20.5);

console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
