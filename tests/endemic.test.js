/* Run: node tests/endemic.test.js — the endemic disease pathways (#/disease/<id>).
   Checks the weight-band lookup, and that every pathway is internally sound:
   every drug, case and dosing table it points to exists, weight bands never
   overlap, every situation cites at least one source, and every book key is a
   real reference. A wrong band edge here would hand a doctor the wrong tablet
   count, so the band rules are tested exactly. */
global.window = {};
for (const f of ["books", "drugs-data", "conditions", "endemic-data", "endemic"]) require(`../js/${f}.js`);
const { bandFor, noBandReason, bandLabel, perKg, scenarioById, groupsOf } = window.Endemic.calc;
const ENDEMIC = window.ENDEMIC, DRUGS = new Set(window.DRUG_DB.map(d => d.id)), CASES = new Set(window.CONDITIONS.map(c => c.id));
let pass = 0, fail = 0;
const eq = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  if (!ok) console.log(`FAIL ${name}: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
};

/* --- band lookup ------------------------------------------------------ */
const T = { bands: [{ from: 5, to: 15, value: "1" }, { from: 15, to: 25, value: "2" }, { from: 25, to: null, value: "3" }] };
eq("lower edge is inside the band", bandFor(T, 5)?.value, "1");
eq("just under the upper edge stays in the band", bandFor(T, 14.9)?.value, "1");
eq("the upper edge belongs to the next band", bandFor(T, 15)?.value, "2");
eq("open-ended top band", bandFor(T, 120)?.value, "3");
eq("below the lowest band gives nothing", bandFor(T, 4.9), null);
eq("no weight gives nothing", bandFor(T, null), null);
eq("zero weight gives nothing", bandFor(T, 0), null);
eq("below the lowest band says so", /Below 5 kg/.test(noBandReason(T, 3)), true);
const G = { bands: [{ from: 5, to: 10, value: "a" }, { from: 12, to: null, value: "b" }] };
eq("a gap in a table is reported, not filled", bandFor(G, 11), null);
eq("a gap is explained", /not covered/.test(noBandReason(G, 11)), true);
eq("band label, closed", bandLabel({ from: 5, to: 15 }), "5 to under 15 kg");
eq("band label, open", bandLabel({ from: 35, to: null }), "35 kg and over");
eq("band label, no lower limit", bandLabel({ from: 1, to: 5 }), "under 5 kg");

eq("per-kg dose worked out", perKg("2 mg/kg = 0.2 mL/kg", 1.6), "3.2 mg = 0.32 mL for 1.6 kg");
eq("per-kg needs a weight", perKg("2 mg/kg", null), "");
eq("a fixed dose is not per-kg", perKg("70 mg", 23), "");

/* --- every pathway ---------------------------------------------------- */
eq("there are pathways", ENDEMIC.length > 0, true);
const ids = ENDEMIC.map(d => d.id);
eq("pathway ids are unique", new Set(ids).size, ids.length);
for (const d of ENDEMIC) {
  const P = `[${d.id}]`;
  eq(`${P} has a name, summary and sources`, !!(d.name && d.summary && (d.sources || []).length), true);
  eq(`${P} has situations`, (d.scenarios || []).length > 0, true);
  const sids = d.scenarios.map(s => s.id);
  eq(`${P} situation ids are unique`, new Set(sids).size, sids.length);
  eq(`${P} groups cover every situation`, groupsOf(d).reduce((n, g) => n + g.items.length, 0), sids.length);
  const tables = new Map((d.dosing || []).map(t => [t.id, t]));
  eq(`${P} dosing table ids are unique`, tables.size, (d.dosing || []).length);
  for (const id of d.drugs || []) eq(`${P} listed drug ${id} exists`, DRUGS.has(id), true);
  for (const id of d.cases || []) eq(`${P} listed case ${id} exists`, CASES.has(id), true);

  for (const t of d.dosing || []) {
    const Q = `${P} table ${t.id}`;
    eq(`${Q} has bands`, (t.bands || []).length > 0, true);
    if (t.drug) eq(`${Q} drug ${t.drug} exists`, DRUGS.has(t.drug), true);
    const b = [...t.bands].sort((x, y) => x.from - y.from);
    eq(`${Q} bands are listed in weight order`, b.map(x => x.from), t.bands.map(x => x.from));
    for (let i = 0; i < b.length; i++) {
      eq(`${Q} band ${i} has a value`, typeof b[i].value === "string" && b[i].value.length > 0, true);
      eq(`${Q} band ${i} is not inverted`, b[i].to == null || b[i].to > b[i].from, true);
      if (i < b.length - 1) {
        eq(`${Q} band ${i} is closed (only the last may be open)`, b[i].to != null, true);
        eq(`${Q} band ${i} does not overlap the next`, b[i].to <= b[i + 1].from, true);
      }
    }
    for (const x of b) { // each band's own lower edge resolves to itself
      eq(`${Q} ${x.from} kg resolves to its own band`, bandFor(t, x.from), x);
    }
  }

  for (const s of d.scenarios) {
    const Q = `${P} ${s.id}`;
    eq(`${Q} has a group, title and who`, !!(s.group && s.title && s.who), true);
    eq(`${Q} title is short enough to tap`, s.title.length <= 48, true);
    eq(`${Q} says what to give`, (s.give || []).length > 0, true);
    eq(`${Q} cites a source`, (s.refs || []).length > 0, true);
    for (const r of s.refs || []) eq(`${Q} ref book ${r.book} is a known reference`, !!window.BOOKS[r.book], true);
    if (s.caseId) eq(`${Q} case ${s.caseId} exists`, CASES.has(s.caseId), true);
    for (const g of s.give || []) {
      eq(`${Q} give item has a label`, !!(g.label || (g.drug && DRUGS.has(g.drug))), true);
      if (g.drug) eq(`${Q} drug ${g.drug} exists`, DRUGS.has(g.drug), true);
      if (g.dosing) eq(`${Q} dosing table ${g.dosing} exists`, tables.has(g.dosing), true);
    }
    eq(`${Q} is found by id`, scenarioById(d, s.id), s);
  }
}

console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
