/* Amharic interface checks: node tests/i18n.test.js */
const fs = require("fs"), path = require("path");
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("FAIL:", m); } };
global.window = {}; global.localStorage = { getItem: () => JSON.stringify("am"), setItem() {} };
global.document = { documentElement: { dataset: {} }, addEventListener() {} };
global.location = {}; global.MutationObserver = class {};
require("../js/i18n.js");
const I = window.I18N, t = I.t, ETH = /[ሀ-፿]/;

ok(I.lang === "am", "language read from storage");
for (const [k, v] of Object.entries(I._dict)) {
  ok(typeof v === "string" && v.trim(), `empty translation: ${k}`);
  ok(ETH.test(v) || /^[A-Z]{2,4}$/.test(v), `translation has no Ethiopic script: ${k}`);
}
/* interface strings that must be translated wherever they appear in the source */
const src = ["js/app.js", "js/features.js", "js/community.js"].map(f => fs.readFileSync(path.join(__dirname, "..", f), "utf8")).join("\n");
["Give it safely, with what you have.", "By ward", "By case", "By drug class", "Emergency drug card", "Drip guide",
 "Dose schedules", "Never mix", "Out of stock? What to use instead", "Draft — not clinically verified", "Set weight",
 "Sign in or join", "Create account", "Admin console", "Appearance", "Language"].forEach(s => {
  ok(src.includes(s), `source no longer contains "${s}" — update the dictionary`);
  ok(ETH.test(t(s)), `not translated: ${s}`);
});
/* patterns keep every number unchanged */
const cases = {
  "12 of 50 drugs": ["12", "50"], "Doses for 12.5 kg": ["12.5"], "in 3 h 20 min": ["3", "20"], "45 min overdue": ["45"],
  "2 pre-dose checks are not ticked. Record the dose as given anyway?": ["2"], "90 mL over 60 min": ["90", "60"],
  "30 drops/min (8/15 s)": ["30", "8/15"], "Enter a weight between 0.5 and 250 kg.": ["0.5", "250"]
};
for (const [s, nums] of Object.entries(cases)) {
  const out = t(s);
  ok(ETH.test(out), `pattern did not translate: ${s}`);
  nums.forEach(n => ok(out.includes(n), `number ${n} lost in: ${s} -> ${out}`));
}
/* clinical text and unknown text pass through untouched */
["Magnesium sulfate", "4 g IV over 5–20 min (as 20 % solution).", "For PPH prevention and treatment", "Calcium gluconate 10 %: 1 g (10 mL) IV over 10 min."]
  .forEach(s => ok(t(s) === s, `clinical text was altered: ${s} -> ${t(s)}`));
/* whitespace around a translated node is preserved */
ok(t("  By ward ") === "  በክፍል ", "surrounding whitespace preserved");
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
