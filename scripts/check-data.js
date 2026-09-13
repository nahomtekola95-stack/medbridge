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
const drafts = DRUG_DB.filter(d => d.review.status !== "reviewed").length;
console.log(`${DRUG_DB.length} drugs · ${CONDITIONS.length} cases · ${Object.keys(WARDS).length} wards · ${PROFILES.length} profiles`);
console.log(`${drafts} of ${DRUG_DB.length} drug entries are DRAFT (not clinically verified)`);
if (errs.length) { console.error("\nFAILED:\n" + errs.map(e => "  - " + e).join("\n")); process.exit(1); }
console.log("Data check passed.");
