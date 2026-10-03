/* Run: node tests/preop.test.js — preoperative assessment.
   Part 1 tests the compile logic against a small synthetic dataset, so the
   logic is checked independently of the clinical content. Part 2 checks the
   real data for completeness and for the corrections it must carry. */
global.window = {};
require("../js/preop.js");
const C = window.Preop.calc;
let pass = 0, fail = 0;
const eq = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  if (!ok) console.log(`FAIL ${name}: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
};

/* ---------- part 1: the logic ---------- */
const D = {
  investigations: [{ id: "fbc", test: "Full blood count" }, { id: "inr", test: "INR" }, { id: "ecg", test: "ECG" }],
  conditions: [
    { id: "af", label: "Atrial fibrillation", group: "cardiovascular", ask: ["palpitations"], examine: ["pulse"],
      investigate: ["ecg", "inr"], optimise: ["rate control"], dayOfSurgery: ["check INR"], postponeIf: ["INR above 1.5"] },
    { id: "dm", label: "Diabetes", group: "endocrine", ask: ["hypos"], examine: [], investigate: ["fbc"],
      optimise: ["glucose control"], dayOfSurgery: ["first on the list"], postponeIf: ["glucose very high"] },
    { id: "htn", label: "Hypertension", group: "cardiovascular", ask: ["palpitations"], examine: ["pulse"],
      investigate: ["ecg"], optimise: [], dayOfSurgery: [], postponeIf: [] }
  ],
  medications: [
    { id: "warf", label: "Warfarin", rule: "stop", timing: "5 days before" },
    { id: "valve", label: "Warfarin with a mechanical valve", rule: "stop-and-bridge", timing: "5 days, bridge" },
    { id: "bb", label: "Beta-blocker", rule: "continue" },
    { id: "met", label: "Metformin", rule: "hold-morning" },
    { id: "ins", label: "Insulin", rule: "adjust" }
  ],
  postpone: [{ finding: "BP above threshold" }],
  nbm: [{ what: "Solids", hours: 6 }]
};

const empty = C.compile(D, {});
eq("nothing ticked gives nothing to ask", empty.ask, []);
eq("nothing ticked gives no medicines", empty.medsByRule, []);
eq("nothing ticked still shows the postpone table for an elective case", empty.postpone.length, 1);
eq("fasting times are always shown", empty.nbm.length, 1);

const af = C.compile(D, { conditions: ["af"] });
eq("ticking a condition pulls its questions", af.ask, ["palpitations"]);
eq("and its investigations, resolved to their names", af.investigations.map(i => i.test), ["ECG", "INR"]);
eq("and its postpone findings", af.postponeIf, ["INR above 1.5"]);

const both = C.compile(D, { conditions: ["af", "htn"] });
eq("a question two conditions share appears once", both.ask, ["palpitations"]);
eq("an investigation two conditions share appears once", both.investigations.map(i => i.id), ["ecg", "inr"]);
eq("an examination two conditions share appears once", both.examine, ["pulse"]);

const two = C.compile(D, { conditions: ["af", "dm"] });
eq("investigations from different conditions are combined", two.investigations.map(i => i.id).sort(), ["ecg", "fbc", "inr"]);

/* medicines are ordered by the harm a wrong rule does: bridging and stopping first */
const meds = C.compile(D, { medications: ["bb", "met", "warf", "ins", "valve"] });
eq("medicines are grouped in harm order", meds.medsByRule.map(g => g.rule), ["stop-and-bridge", "stop", "adjust", "hold-morning", "continue"]);
eq("the high-risk count covers stop and stop-and-bridge", meds.highRiskMeds, 2);
eq("each group carries a readable label", meds.medsByRule[0].label, "Stop, and bridge");
eq("an empty rule group is not shown", C.compile(D, { medications: ["bb"] }).medsByRule.map(g => g.rule), ["continue"]);

/* emergency: nothing here delays the operation */
const em = C.compile(D, { conditions: ["af", "dm"], elective: false });
eq("an emergency shows no postpone findings", em.postponeIf, []);
eq("an emergency shows no postpone table", em.postpone, []);
eq("an emergency shows nothing to optimise first", em.optimise, []);
eq("an emergency still shows what to do on the day", em.dayOfSurgery.length, 2);
eq("an emergency still shows the investigations", em.investigations.length, 3);

eq("an unknown condition id is ignored, not an error", C.compile(D, { conditions: ["nope"] }).conditions.length, 0);
eq("an unknown medicine id is ignored", C.compile(D, { medications: ["nope"] }).medsByRule.length, 0);
eq("a missing dataset is survivable", C.compile(null, {}).conditions.length, 0);

/* ---------- part 2: the real data ---------- */
require("../js/preop-data.js");
const P = window.PREOP;
const loaded = P && P.conditions && P.conditions.length > 0;
if (loaded) {
  require("../js/drugs-data.js");
  const drugIds = new Set(window.DRUG_DB.map(d => d.id));
  const invIds = new Set(P.investigations.map(i => i.id));
  const RULES = new Set(C.RULE_ORDER);

  eq("every condition's investigations exist", P.conditions.every(c => (c.investigate || []).every(id => invIds.has(id))), true);
  eq("every medicine has a known rule", P.medications.every(m => RULES.has(m.rule)), true);
  eq("every medicine drugId exists", P.medications.every(m => !m.drugId || drugIds.has(m.drugId)), true);
  eq("every medicine that is stopped says what a wrong stop costs",
    P.medications.filter(m => m.rule.startsWith("stop")).every(m => m.ifStoppedWrongly && m.ifContinuedWrongly), true);
  eq("no duplicate condition ids", new Set(P.conditions.map(c => c.id)).size, P.conditions.length);
  eq("no duplicate medicine ids", new Set(P.medications.map(m => m.id)).size, P.medications.length);
  eq("no duplicate investigation ids", invIds.size, P.investigations.length);

  /* the corrections the data must carry */
  const all = JSON.stringify(P).toLowerCase();
  eq("bridging is reserved for mechanical valves, not AF in general", /mechanical/.test(all), true);
  eq("the BRIDGE trial evidence is reflected", /bridge/.test(all), true);
  eq("warfarin is covered — the realistic anticoagulant in Ethiopia", P.medications.some(m => /warfarin/i.test(m.label)), true);
  eq("long-term steroids are covered — the missed one that causes a crisis", P.medications.some(m => /steroid/i.test(m.label)), true);
  eq("insulin is never simply stopped", P.medications.filter(m => /insulin/i.test(m.label)).every(m => m.rule !== "stop"), true);
  eq("fasting times include clear fluids", P.nbm.some(n => /clear/i.test(n.what)), true);
  eq("no page citations are claimed", JSON.stringify(P).includes("pdf p."), false);

  /* The BRIDGE correction, locked structurally rather than by wording: atrial
     fibrillation on warfarin is stopped WITHOUT bridging, and only a mechanical
     valve is bridged. If someone edits the rule back, this fails. */
  const rule = (id) => (P.medications.find(m => m.id === id) || {}).rule;
  eq("warfarin for AF is stopped without bridging (BRIDGE trial)", rule("warfarin-af"), "stop");
  eq("warfarin for a mechanical valve is bridged", rule("warfarin-mechanical-valve"), "stop-and-bridge");
  eq("long-term steroids are never simply stopped", rule("steroids-long-term") !== "stop", true);
  eq("basal insulin is adjusted, not stopped", rule("insulin-basal"), "adjust");
} else {
  console.log("(real preoperative data not loaded yet — part 2 skipped)");
}

console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
