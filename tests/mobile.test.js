/* Run: node tests/mobile.test.js — the finder (js/mobile.js) that replaces
   scrolling on a phone. A health worker types a few letters and must land on
   the right drug, case or disease situation first: these checks lock the
   ranking rules and run real searches against the app's own data. */
global.window = {};
for (const f of ["drugs-data", "conditions", "endemic-data", "mobile"]) require(`../js/${f}.js`);
const { norm, score, search, buildIndex } = window.MobileNav.calc;
let pass = 0, fail = 0;
const eq = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  if (!ok) console.log(`FAIL ${name}: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
};

/* --- the ranking rules ---------------------------------------------- */
const it = (name, more = "") => ({ kind: "Drug", name, more });
eq("accents and dashes are normalised", norm("Artemether–Lumefantrine"), "artemether-lumefantrine");
eq("start of the name beats start of a word", score(it("Oxytocin"), "oxy") > score(it("Carbetocin oxytocin analogue"), "oxy"), true);
eq("start of a word beats inside a word", score(it("Magnesium sulfate"), "sulf") > score(it("Cotrimoxazole sulfamethoxazole x"), "amethox"), true);
eq("the name beats the small print", score(it("Heparin"), "hep") > score(it("Protamine", "heparin reversal"), "hep"), true);
eq("every word must match", score(it("Magnesium sulfate"), "mag potassium"), 0);
eq("two words both match", score(it("Magnesium sulfate"), "mag sulf") > 0, true);
eq("no match scores zero", score(it("Oxytocin"), "warfarin"), 0);
eq("an empty query finds nothing", search([it("Oxytocin")], "   "), []);

/* --- real searches against the app's data ----------------------------- */
const index = buildIndex({ drugs: window.DRUG_DB, cases: window.CONDITIONS, endemic: window.ENDEMIC,
  tools: [{ section: "Emergency", href: "#/resus", title: "Emergency drug card", desc: "Every resuscitation dose" }] });
const top = (q) => { const r = search(index, q); return r.length ? r[0].items[0].href : null; };
eq("every drug is in the index", index.filter(x => x.kind === "Drug").length, window.DRUG_DB.length);
eq("every case is in the index", index.filter(x => x.kind === "Case").length, window.CONDITIONS.length);
eq("every disease situation is in the index", index.filter(x => x.kind === "Situation").length, window.ENDEMIC.reduce((n, d) => n + d.scenarios.length, 0));
eq("'mag sulf' finds magnesium sulfate", top("mag sulf"), "#/drug/magnesium-sulfate");
eq("'oxytocin' finds oxytocin first", top("oxytocin"), "#/drug/oxytocin");
eq("'eclampsia' finds the case first", top("eclampsia"), "#/case/eclampsia");
eq("'vivax pregnant' finds the malaria situation", top("vivax pregnant"), "#/disease/malaria?s=pregnant-pv");
eq("'severe malaria' finds the case or its situation", /severe-malaria|s=severe/.test(top("severe malaria") || ""), true);
eq("'resus' finds the emergency card tool", search(index, "resus").some(g => g.items.some(x => x.href === "#/resus")), true);
eq("at most 6 results per group", search(index, "a").every(g => g.items.length <= 6), true);
eq("results are grouped by kind", search(index, "malaria").map(g => g.kind).sort().join(), [...new Set(search(index, "malaria").map(g => g.kind))].sort().join());
/* typo tolerance comes from the app's fuzzy matcher; a stand-in here */
const fuzzy = (text, q) => text.includes(q.slice(0, 5));
eq("a typo falls back to the fuzzy matcher", search(index, "diazepan", { fuzzy })[0]?.items[0]?.name, "Diazepam");

console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
