/* Run: node tests/features.test.js — dose maths for the emergency card and schedules. */
const mem = {};
global.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
global.window = { addEventListener() {} };
global.document = { addEventListener() {}, querySelectorAll: () => [] };
global.setInterval = () => 0;
for (const f of ["calc", "drugs-data", "conditions", "resus", "regimens", "compat", "substitutes", "features"]) require(`../js/${f}.js`);
Object.assign(global, window);
const FX = window.Features({ $: () => null, esc: s => String(s), ic: () => "", toast() {}, render() {}, ROLES: {} });
const { computeDose, buildDoses, fuzzyMatch, schedState } = FX._test;
let pass = 0, fail = 0;
const eq = (name, got, want, tol = 1e-6) => { const ok = typeof want === "number" ? Math.abs(got - want) <= tol : got === want; ok ? pass++ : fail++; if (!ok) console.log(`FAIL ${name}: got ${got}, want ${want}`); };
const row = (name, use) => RESUS.find(r => r.name === name && r.use.startsWith(use));

// --- emergency card ---
let r = computeDose(row("Adrenaline", "Cardiac arrest"), 10); eq("adrenaline arrest 10 kg dose", r.dose, 0.1); eq("adrenaline arrest 10 kg volume (1:10000)", r.volumeMl, 1);
r = computeDose(row("Adrenaline", "Cardiac arrest"), 120); eq("adrenaline arrest capped 1 mg", r.dose, 1);
r = computeDose(row("Adrenaline", "Anaphylaxis"), 20); eq("adrenaline IM 20 kg", r.dose, 0.2); eq("adrenaline IM 20 kg vol (1:1000)", r.volumeMl, 0.2);
r = computeDose(row("Adrenaline", "Anaphylaxis"), 70); eq("adrenaline IM capped 0.5", r.dose, 0.5);
r = computeDose(row("Atropine", "Bradycardia"), 3); eq("atropine 3 kg raised to 0.1 mg", r.dose, 0.1); eq("atropine raised flag", r.raised, true);
r = computeDose(row("Atropine", "Bradycardia"), 40); eq("atropine capped 0.5", r.dose, 0.5);
r = computeDose(row("Amiodarone", "VF"), 70); eq("amiodarone capped 300", r.dose, 300); eq("amiodarone 300 mg = 6 mL", r.volumeMl, 6);
r = computeDose(row("Naloxone", "Opioid"), 25); eq("naloxone capped 2 mg", r.dose, 2); eq("naloxone 5 mL", r.volumeMl, 5);
r = computeDose(row("Artesunate", "Severe"), 15); eq("artesunate 15 kg uses 3 mg/kg", r.dose, 45);
r = computeDose(row("Artesunate", "Severe"), 25); eq("artesunate 25 kg uses 2.4 mg/kg", r.dose, 60);
r = computeDose(row("Magnesium sulfate", "Life-threatening"), 20); eq("Mg asthma 20 kg 1000 mg", r.dose, 1000); eq("Mg asthma 2 mL of 50%", r.volumeMl, 2);
r = computeDose(row("Calcium gluconate 10 %", "Hyperkal"), 50); eq("calcium capped 20 mL", r.dose, 20);
r = computeDose(row("Midazolam", "Convulsion"), 12); eq("midazolam 12 kg 2.4 mg", r.dose, 2.4); eq("midazolam 0.48 mL", r.volumeMl, 0.48);
r = computeDose(row("Phenobarbital", "Seizure"), 3); eq("phenobarbital neonate 60 mg", r.dose, 60); eq("phenobarbital 0.3 mL", r.volumeMl, 0.3);
r = computeDose(row("Paracetamol", "Pain"), 80); eq("paracetamol capped 1 g", r.dose, 1000);
// every row computes for a spread of weights
for (const w of [0.8, 3, 10, 25, 70]) for (const x of RESUS) {
  if (x.drug && !DRUG_DB.find(d => d.id === x.drug)) { fail++; console.log("FAIL unknown drug", x.drug); }
  if (x.type === "dose") { const res = computeDose(x, w); if (!res || !isFinite(res.dose) || res.dose <= 0) { fail++; console.log("FAIL no dose", x.name, w); } else pass++; }
}

// --- schedules ---
const reg = id => REGIMENS.find(g => g.id === id);
let d = buildDoses(reg("mgso4-pritchard"), null);
eq("MgSO4: loading + 6 maintenance doses over 24 h", d.length, 7); eq("MgSO4 first at 0 h", d[0].at, 0); eq("MgSO4 second at 4 h", d[1].at, 4); eq("MgSO4 last at 24 h", d[6].at, 24);
d = buildDoses(reg("mgso4-pritchard"), null, 24); eq("MgSO4 extended 24 h adds 6 doses", d.length, 13);
d = buildDoses(reg("quinine"), 60);
eq("quinine loading 1200 mg (20 mg/kg capped)", d[0].amount.startsWith("1,200 mg"), true);
eq("quinine maintenance at 8 h", d[1].at, 8); eq("quinine maintenance 600 mg", d[1].amount.startsWith("600 mg"), true);
d = buildDoses(reg("insulin-im-dka"), 40); eq("insulin hourly from 0 h", d[0].at, 0); eq("insulin 4 units", d[0].amount.startsWith("4 units"), true); eq("insulin 13 doses over 12 h", d.length, 13);
d = buildDoses(reg("artesunate"), 15); eq("artesunate schedule band 45 mg", d[0].amount.startsWith("45 mg"), true); eq("artesunate doses at 0/12/24/48/72", d.map(x => x.at).join(","), "0,12,24,48,72");
d = buildDoses(reg("antenatal-dexamethasone"), null); eq("dexamethasone 4 doses 12-hourly", d.map(x => x.at).join(","), "0,12,24,36");
d = buildDoses(reg("ampi-genta"), 10); eq("ampi-genta gentamicin at 0,24,48", d.filter(x => x.label === "Gentamicin").map(x => x.at).join(","), "0,24,48"); eq("ampicillin q6h 9 doses in 48 h", d.filter(x => x.label === "Ampicillin").length, 9);
for (const g of REGIMENS) { if (!DRUG_DB.find(x => x.id === g.drug)) { fail++; console.log("FAIL regimen drug", g.id); } if (g.case && !CONDITIONS.find(c => c.id === g.case)) { fail++; console.log("FAIL regimen case", g.id); } }
for (const c of COMPAT) for (const id of [...c.a, ...c.b]) if (id !== "*" && !DRUG_DB.find(x => x.id === id)) { fail++; console.log("FAIL compat id", id); }

// --- late doses shift the series ---
{
  const H = 3600e3, start = Date.UTC(2026, 0, 1, 8);
  const sch = { regimen: "mgso4-pritchard", weight: null, start, extraHours: 0, log: { "0@0": { status: "given", at: start }, "1@4": { status: "given", at: start + 5 * H } } };
  const st = schedState(sch);
  eq("MgSO4 dose given 1 h late: next due 9 h (not 8 h)", (st.next.due - start) / H, 9);
  eq("next dose flagged as moved", st.next.shifted, true);
  const early = { ...sch, log: { "0@0": { status: "given", at: start }, "1@4": { status: "given", at: start + 3.5 * H } } };
  eq("early dose does not pull the next one forward", (schedState(early).next.due - start) / H, 8);
  const wh = { ...sch, log: { "0@0": { status: "given", at: start }, "1@4": { status: "withheld", at: start + 6 * H, reason: "reflexes absent" } } };
  eq("withheld dose does not shift the next", (schedState(wh).next.due - start) / H, 8);
  const ag = { regimen: "ampi-genta", weight: 10, start, extraHours: 0, log: {} };
  const d0 = buildDoses(REGIMENS.find(g => g.id === "ampi-genta"), 10);
  const amp6 = d0.find(x => x.label === "Ampicillin" && x.at === 6); ag.log[amp6.idx + "@6"] = { status: "given", at: start + 8 * H };
  const st2 = schedState(ag);
  eq("ampicillin late shifts ampicillin series", (st2.doses.find(x => x.label === "Ampicillin" && x.at === 12).due - start) / H, 14);
  eq("...but not the gentamicin series", (st2.doses.find(x => x.label === "Gentamicin" && x.at === 24).due - start) / H, 24);
}

// --- substitutes reference real drugs, never themselves ---
for (const [id, list] of Object.entries(SUBSTITUTES)) {
  if (!DRUG_DB.find(x => x.id === id)) { fail++; console.log("FAIL substitute key", id); }
  for (const x of list) {
    if (!x.use || !x.note) { fail++; console.log("FAIL substitute missing use/note", id); }
    if (!x.none && (!DRUG_DB.find(d => d.id === x.with) || x.with === id)) { fail++; console.log("FAIL substitute target", id, x.with); } else pass++;
  }
}
eq("oxytocin is never offered nifedipine", SUBSTITUTES["oxytocin"].some(x => x.with === "nifedipine"), false);
eq("cloxacillin is never offered ampicillin", SUBSTITUTES["cloxacillin"].some(x => x.with === "ampicillin"), false);

// --- search ---
eq("exact substring", fuzzyMatch("Magnesium sulfate eclampsia", "eclamp"), true);
eq("typo: magnesum", fuzzyMatch("Magnesium sulfate", "magnesum"), true);
eq("typo: adrenalin", fuzzyMatch("Adrenaline epinephrine", "adrenalin"), true);
eq("typo: ceftriaxon", fuzzyMatch("Ceftriaxone", "ceftriaxon"), true);
eq("typo: preeclampsia", fuzzyMatch("Severe pre-eclampsia hypertension", "preclampsia"), true);
eq("no false match: insulin vs heparin", fuzzyMatch("Heparin enoxaparin", "insulin"), false);
eq("no false match: short word", fuzzyMatch("Oxytocin", "xyz"), false);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
