/* Data integrity check. Run before any deploy. */
global.window = {};
require("../js/books.js");
require("../js/drugs-data.js");
require("../js/conditions.js");
require("../js/profiles.js");
const { DRUG_DB, CATEGORIES, EQUIPMENT, WARDS, CONDITIONS, CASE_GROUPS, PROFILES } = window;
const ids = new Set(DRUG_DB.map(d => d.id));
const errs = [];
const dup = DRUG_DB.map(d => d.id).filter((x, i, a) => a.indexOf(x) !== i);
if (dup.length) errs.push("duplicate drug ids: " + dup.join(", "));
for (const d of DRUG_DB) {
  if (!CATEGORIES[d.cat]) errs.push(`${d.id}: unknown category ${d.cat}`);
  if (!d.wards || !d.wards.length) errs.push(`${d.id}: no wards`);
  (d.wards || []).forEach(w => { if (!WARDS[w]) errs.push(`${d.id}: unknown ward ${w}`); });
  if (!d.improvised || !d.improvised.length) errs.push(`${d.id}: no improvised methods`);
  (d.improvised || []).forEach(m => (m.requires || []).forEach(r => { if (!EQUIPMENT[r]) errs.push(`${d.id}: unknown equipment ${r}`); }));
  if (!d.sources || !d.sources.length) errs.push(`${d.id}: no sources`);
}
const { BOOKS } = window;
for (const d of DRUG_DB) (d.textbook || []).forEach(t => { if (!BOOKS[t.book]) errs.push(`${d.id}: textbook ref with unknown book ${t.book}`); });
for (const c of CONDITIONS) {
  (c.textbook || []).forEach(t => { if (!BOOKS[t.book]) errs.push(`case ${c.id}: textbook ref with unknown book ${t.book}`); });
  if (!CASE_GROUPS[c.group]) errs.push(`case ${c.id}: unknown group ${c.group}`);
  c.drugs.forEach(d => { if (!ids.has(d.id)) errs.push(`case ${c.id}: unknown drug ${d.id}`); });
}
for (const p of PROFILES) Object.keys(p.drugNotes).forEach(k => { if (!ids.has(k)) errs.push(`profile ${p.id}: unknown drug ${k}`); });
/* safety, newborn dosing, interactions, substitutes and mixing rules */
for (const f of ["safety", "neonatal", "interactions", "compat", "substitutes"]) require(`../js/${f}.js`);
const { SAFETY, NEONATAL, INTERACTIONS, COMPAT, SUBSTITUTES } = window;
const LV = { pregnancy: ["safe", "caution", "avoid"], breastfeeding: ["safe", "caution", "avoid"], renal: ["none", "adjust", "avoid"], hepatic: ["none", "adjust", "avoid"] };
for (const d of DRUG_DB) if (!SAFETY[d.id]) errs.push(`${d.id}: no safety entry (safety.js)`);
for (const [id, e] of Object.entries(SAFETY)) {
  if (!ids.has(id)) errs.push(`safety: unknown drug ${id}`);
  for (const [k, levels] of Object.entries(LV)) if (!e[k] || !levels.includes(e[k].level) || !e[k].text) errs.push(`safety ${id}: bad ${k}`);
  let prev = Infinity;
  (e.renal?.bands || []).forEach(b => { if (!(b.below > 0) || b.below >= prev || !b.text) errs.push(`safety ${id}: renal bands must have text and strictly decreasing numeric below`); prev = b.below; });
  (e.refs || []).forEach(r => { if (!BOOKS[r.book]) errs.push(`safety ${id}: unknown book ${r.book}`); });
}
for (const [id, e] of Object.entries(NEONATAL)) {
  if (!ids.has(id)) errs.push(`neonatal: unknown drug ${id}`);
  if (!e.unit || !Array.isArray(e.rules) || !e.rules.length) errs.push(`neonatal ${id}: needs unit and rules`);
  (e.rules || []).forEach((r, i) => { if (!(r.perKg > 0) && !(r.fixed > 0)) errs.push(`neonatal ${id} rule ${i}: needs perKg or fixed`); });
  // some rule must match every newborn from 22 to 44 weeks, day 0 to 28, 0.4 to 6 kg
  const ok = (v, lo, hi) => (lo == null || v >= lo) && (hi == null || v <= hi);
  outer: for (let ga = 22; ga <= 44; ga++) for (let pna = 0; pna <= 28; pna++) for (const wt of [0.4, 0.8, 1.2, 1.5, 1.99, 2, 2.5, 3.5, 5, 6]) {
    const pma = ga + pna / 7;
    if (!e.rules.some(r => ok(ga, r.gaMin, r.gaMax) && ok(pma, r.pmaMin, r.pmaMax) && ok(pna, r.pnaMin, r.pnaMax) && ok(wt, r.wtMin, r.wtMax))) { errs.push(`neonatal ${id}: no rule for GA ${ga}, day ${pna}, ${wt} kg`); break outer; }
  }
}
/* Every drug pair must be covered by at most ONE rule. The checker matches a
   pair in either direction, so two rules that both name the pair (usually a
   broad "drug + QT-prolonging drugs" list overlapping a specific rule) show the
   reader the same warning twice, in two different wordings. Narrow one rule's
   list instead — keep whichever wording is actually useful for that pair. */
const seenPair = {};
INTERACTIONS.forEach((r, i) => {
  [...r.a, ...r.b].forEach(x => { if (!ids.has(x)) errs.push(`interaction ${i}: unknown drug ${x}`); });
  if (!["major", "moderate"].includes(r.severity) || !r.effect || !r.action) errs.push(`interaction ${i}: needs severity, effect and action`);
  for (const a of r.a) for (const b of r.b) {
    if (a === b) { errs.push(`interaction ${i}: ${a} paired with itself`); continue; }
    const key = [a, b].sort().join(" + ");
    if (seenPair[key] !== undefined) errs.push(`interaction ${i}: ${key} is already covered by rule ${seenPair[key]} — the reader would get two warnings for one pair`);
    else seenPair[key] = i;
  }
});
COMPAT.forEach((c, i) => [...c.a, ...c.b].forEach(x => { if (x !== "*" && !ids.has(x)) errs.push(`compat ${i}: unknown drug ${x}`); }));
Object.entries(SUBSTITUTES).forEach(([k, v]) => { if (!ids.has(k)) errs.push(`substitutes: unknown drug ${k}`); v.forEach(x => { if (x.with && !ids.has(x.with)) errs.push(`substitutes ${k}: unknown drug ${x.with}`); }); });
console.log(`${Object.keys(SAFETY).length} safety entries · ${Object.keys(NEONATAL).length} newborn dosing tables · ${INTERACTIONS.length} interactions`);

const drafts = DRUG_DB.filter(d => d.review.status !== "reviewed").length;
console.log(`${DRUG_DB.length} drugs · ${CONDITIONS.length} cases · ${Object.keys(WARDS).length} wards · ${PROFILES.length} profiles`);
console.log(`${drafts} of ${DRUG_DB.length} drug entries are DRAFT (not clinically verified)`);
if (errs.length) { console.error("\nFAILED:\n" + errs.map(e => "  - " + e).join("\n")); process.exit(1); }
console.log("Data check passed.");
