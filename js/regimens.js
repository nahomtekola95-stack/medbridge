/* ============================================================
   MedBridge dose schedules — repeat-dose regimens with clock times,
   per-dose checks and due reminders. DRAFT until reviewed.

   times: hours after the first dose. `every` + `until` generate the rest.
   dose:  { perKg, unit, max, conc } for weight-based doses, or `text` for fixed.
   ============================================================ */
window.REGIMENS = [
  {
    id: "mgso4-pritchard", drug: "magnesium-sulfate", case: "eclampsia",
    name: "Magnesium sulfate — Pritchard IM regimen",
    use: "Severe pre-eclampsia or eclampsia",
    weightBased: false,
    doses: [
      { at: 0, label: "Loading", text: "4 g of 20 % IV over 5–20 min (8 mL of 50 % + 12 mL water), then 10 g of 50 % IM — 5 g (10 mL) deep IM in each buttock" }
    ],
    every: 4, until: 24, repeatLabel: "Maintenance", repeatText: "5 g of 50 % (10 mL) deep IM, alternate buttocks",
    extendable: "Continue until 24 h after delivery or the last fit, whichever is later — extend the schedule if needed",
    checks: [
      "Respiratory rate 16/min or more",
      "Patellar (knee) reflexes present",
      "Urine output at least 30 mL/h (100 mL in the last 4 h)"
    ],
    ifFail: "If any check fails, withhold this dose and reassess. Respiratory depression: calcium gluconate 10 % 10 mL IV over 10 min.",
    ref: "WHO Managing Complications in Pregnancy and Childbirth 2017; Williams Obstetrics 25th ed., ch. 40"
  },
  {
    id: "insulin-im-dka", drug: "insulin-soluble", case: "dka",
    name: "Soluble insulin IM hourly — DKA without a pump",
    use: "Diabetic ketoacidosis",
    weightBased: true,
    doses: [], every: 1, until: 12, repeatLabel: "Hourly IM",
    dose: { perKg: 0.1, unit: "units", conc: 100, concLabel: "100 units/mL — use a U-100 insulin syringe" },
    extendable: "Continue hourly until acidosis resolves and the patient is eating — extend as needed",
    checks: [
      "Capillary glucose checked this hour",
      "Potassium 3.3 mmol/L or more (hold insulin if lower)",
      "Potassium 10–20 mmol/L running in the fluids if K 3.3–5.0 and passing urine",
      "Switched to dextrose-containing fluid once glucose below 14 mmol/L (250 mg/dL)"
    ],
    ifFail: "If glucose is not falling after 2 doses, recheck hydration and double the hourly dose. Watch children for headache, falling pulse, rising BP (cerebral oedema).",
    ref: "ISPAD 2022; Kitabchi et al. Diabetes Care 2009; Harrison 22nd ed., ch. 404"
  },
  {
    id: "artesunate", drug: "artesunate", case: "severe-malaria",
    name: "Artesunate — severe malaria",
    use: "Severe malaria, all ages",
    weightBased: true,
    doses: [{ at: 0, label: "Dose 1" }, { at: 12, label: "Dose 2" }, { at: 24, label: "Dose 3" }, { at: 48, label: "Daily" }, { at: 72, label: "Daily" }],
    dose: { perKg: 2.4, bands: [{ under: 20, perKg: 3 }], unit: "mg", conc: 10, concLabel: "10 mg/mL IV (20 mg/mL IM)" },
    extendable: "Continue daily until the patient can swallow, then give a full 3-day ACT course",
    checks: ["Glucose checked (hypoglycaemia is common)", "Level of consciousness and convulsions reviewed", "Able to take oral treatment yet? If so, switch to ACT"],
    ifFail: "Check haemoglobin at day 7 and 14 for delayed haemolysis.",
    ref: "WHO Guidelines for malaria 2023; Nelson 22nd ed., p. 2136"
  },
  {
    id: "quinine", drug: "quinine", case: "severe-malaria",
    name: "Quinine infusion — severe malaria",
    use: "Severe malaria when artesunate is unavailable",
    weightBased: true,
    doses: [{ at: 0, label: "Loading", perKgOverride: 20, maxOverride: 1200, note: "in 10 mL/kg dextrose over 4 h" }],
    every: 8, from: 8, until: 56, repeatLabel: "Maintenance", repeatNote: "in 10 mL/kg dextrose over 4 h",
    dose: { perKg: 10, unit: "mg", max: 600, conc: 300, concLabel: "300 mg/mL — never as a bolus" },
    extendable: "Switch to oral quinine or an ACT when able. After 48 h on IV, or with renal failure, reduce each maintenance dose by one-third to one-half",
    checks: ["Glucose checked in the last 4 h", "Drip running over 4 h, not faster", "Pulse regular"],
    ifFail: "Never give quinine as an IV bolus.",
    ref: "WHO Guidelines for malaria 2023; Harrison 22nd ed., p. 1815"
  },
  {
    id: "antenatal-dexamethasone", drug: "dexamethasone", case: "preterm-labour",
    name: "Dexamethasone — antenatal corticosteroids",
    use: "Preterm birth expected, 24–34 weeks, WHO criteria met",
    weightBased: false,
    doses: [{ at: 0, label: "Dose 1" }, { at: 12, label: "Dose 2" }, { at: 24, label: "Dose 3" }, { at: 36, label: "Dose 4" }],
    fixedText: "6 mg (1.5 mL of 4 mg/mL) IM",
    checks: ["Gestation reliably 24–34 weeks", "No signs of maternal infection", "Newborn care available here or at the referral facility"],
    ifFail: "If any WHO criterion is not met, do not give — refer instead (Althabe 2015).",
    ref: "WHO 2015/2022; Williams Obstetrics 25th ed., ch. 42"
  },
  {
    id: "ampi-genta", drug: "ampicillin", case: "neonatal-sepsis",
    name: "Ampicillin + gentamicin — child sepsis",
    use: "Sepsis or very severe pneumonia in a child over 1 week old",
    weightBased: true,
    doses: [], every: 6, until: 48, repeatLabel: "Ampicillin",
    dose: { perKg: 50, unit: "mg", max: 2000, conc: 50, concLabel: "50 mg/mL working dilution" },
    extra: { every: 24, until: 48, label: "Gentamicin", dose: { perKg: 7.5, unit: "mg", conc: 40, concLabel: "40 mg/mL" } },
    extendable: "Usually 7–10 days in total — extend the schedule",
    checks: ["Temperature, feeding and breathing reviewed", "Urine output adequate (gentamicin)", "Injection site / cannula checked"],
    ifFail: "Neonates in the first week use different intervals — see the drug pages.",
    ref: "WHO Pocket Book of Hospital Care for Children 2013"
  },
  {
    id: "aminophylline", drug: "aminophylline", case: "severe-asthma",
    name: "Aminophylline 6-hourly — no pump",
    use: "Life-threatening asthma not responding to first-line treatment",
    weightBased: true,
    doses: [{ at: 0, label: "Loading", note: "over 20–60 min; omit if theophylline taken in last 24 h" }],
    every: 6, from: 6, until: 30, repeatLabel: "Maintenance", repeatNote: "over 20–30 min",
    dose: { perKg: 5, unit: "mg", max: 500, conc: 25, concLabel: "25 mg/mL" },
    checks: ["Pulse below 140 (adult) or 180 (child)", "No vomiting, tremor or arrhythmia"],
    ifFail: "If toxicity signs appear, stop and reassess — seizures can be the first sign.",
    ref: "WHO Pocket Book 2013"
  },
  {
    id: "paracetamol-regular", drug: "paracetamol", case: null,
    name: "Paracetamol — regular 6-hourly",
    use: "Background analgesia or fever",
    weightBased: true,
    doses: [], every: 6, until: 24, repeatLabel: "Dose",
    dose: { perKg: 15, unit: "mg", max: 1000, conc: 24, concLabel: "120 mg/5 mL syrup (24 mg/mL)" },
    checks: ["No other paracetamol-containing medicine given", "Daily total within the maximum"],
    ifFail: "Max 75 mg/kg/day in children (60 under 2 years); adults 4 g, 2 g in cirrhosis or heavy alcohol use.",
    ref: "Nelson 22nd ed., Table 93.6, p. 681; Harrison 22nd ed."
  },
  {
    id: "thiamine-wernicke",
    drug: "thiamine",
    name: "Thiamine — high-dose IV for suspected Wernicke encephalopathy",
    use: "Suspected or established Wernicke encephalopathy (alcohol dependence, malnutrition, hyperemesis, prolonged vomiting)",
    weightBased: false,
    doses: [],
    every: 8,
    until: 64,
    repeatLabel: "High-dose IV",
    repeatText: "Thiamine 500 mg (Pabrinex 2 pairs, or 5 mL of 100 mg/mL) in 50–100 mL 0.9 % saline IV over 30 min",
    extendable: "Three times daily for 2–3 days (this schedule covers 3 days). If eye signs, gait or confusion improve, continue 250 mg IV or IM once daily for 3–5 days, then oral thiamine 100 mg three times daily. Doses vary between guidelines — confirm with local protocol",
    checks: [
      "Thiamine started before or with any glucose infusion or feed",
      "Eye movements, gait and orientation assessed and recorded",
      "Infusion running over 30 minutes, adrenaline available (rare anaphylaxis)",
      "Magnesium given or checked (low magnesium blocks the response)"
    ],
    ifFail: "If there is no improvement after 3 days of high-dose treatment, reconsider the diagnosis (hypoglycaemia, head injury, hepatic encephalopathy, meningitis, delirium tremens, pellagra) and seek senior review; do not stop thiamine while the patient is still drinking or malnourished. If IV access is lost, give the dose IM (split between sites, about 5 mL maximum per site in adults). Stop the infusion and treat as anaphylaxis if wheeze, rash, swelling or collapse occur.",
    ref: "Royal College of Physicians / Thomson AD et al. 2002; BNF (Pabrinex); EFNS 2010; Kaplan & Sadock 12th ed. 2022, ch. 4.2, pdf p. 915"
  },
  {
    id: "diazepam-alcohol-withdrawal",
    drug: "diazepam",
    case: "alcohol-withdrawal",
    name: "Diazepam oral loading — alcohol withdrawal (symptom-triggered)",
    use: "Inpatient alcohol withdrawal in an adult who can swallow and communicate (not delirium tremens needing IV treatment)",
    weightBased: false,
    doses: [
      {
        at: 0,
        label: "Dose 1",
        text: "Diazepam 10–20 mg orally",
        note: "Give thiamine first or at the same time"
      }
    ],
    every: 2,
    from: 2,
    until: 12,
    repeatLabel: "Review, dose if still in withdrawal",
    repeatText: "Diazepam 10–20 mg orally ONLY if withdrawal signs persist (CIWA-Ar 10 or more) and the patient is not drowsy; otherwise record as withheld",
    extendable: "mhGAP allows repeating every 2 h until withdrawal signs are gone or the patient is lightly sedated. Once settled, add up the first 24 h total and give it in divided doses, reducing by about 20% a day over 4–7 days (Kaplan). Extend only with senior review",
    checks: [
      "CIWA-Ar score done now (dose only if 10 or more, or clear tremor, sweating and agitation if the patient cannot be scored)",
      "Patient awake or easily roused by voice — not drowsy (omit the dose if sleepy)",
      "Respiratory rate 12/min or more and oxygen saturation 92% or more if measurable",
      "No new confusion, seizure, jaundice or head injury since the last review (these need medical review, not just another dose)",
      "Thiamine has been given"
    ],
    ifFail: "Drowsy, respiratory rate under 12 or low saturation: withhold, lie on side, support the airway; flumazenil is not in this app. If withdrawal is still severe after about 60 mg in total, or confusion, hallucinations or seizures develop: urgent medical review for delirium tremens, infection, hypoglycaemia, head injury or Wernicke encephalopathy. In liver failure, older age or lung disease use lorazepam instead. Never give diazepam IM.",
    ref: "WHO mhGAP Intervention Guide 2.0 (2016), Table 1 medication chart: diazepam 10–20 mg every 2 h for observable alcohol withdrawal until features resolve or the person is lightly sedated (lower doses, up to 10 mg four times daily, as outpatient); Kaplan & Sadock's Synopsis 12th ed. 2022, ch. 4.2, pdf pp. 908–909 (titrate from a high dose, omit doses if sleepy, taper ~20%/day, no IM diazepam)"
  },

  /* ---- visceral leishmaniasis ---- */
  {
    id: "lamb-milt-vl-hiv",
    drug: "liposomal-amphotericin-b",
    case: "visceral-leishmaniasis-hiv",
    name: "Liposomal amphotericin B — VL–HIV combination (East Africa)",
    use: "VL in an HIV co-infected patient, with oral miltefosine 100 mg/day for 28 days",
    weightBased: true,
    doses: [
      {
        at: 0,
        label: "Day 1",
        note: "Give a 1 mg test dose by infusion first, then the full dose over 2 h"
      },
      { at: 48, label: "Day 3", note: "Over 2 h" },
      { at: 96, label: "Day 5", note: "Over 2 h" },
      { at: 144, label: "Day 7", note: "Over 2 h" },
      { at: 192, label: "Day 9", note: "Over 2 h" },
      {
        at: 240,
        label: "Day 11",
        note: "Last infusion — cumulative 30 mg/kg. Miltefosine continues to day 28"
      }
    ],
    dose: {
      perKg: 5,
      unit: "mg",
      conc: 4,
      concLabel: "4 mg/mL after reconstituting each 50 mg vial with 12 mL water for injection — then dilute in 5 % DEXTROSE only, never saline"
    },
    extendable: "If the day-29 test of cure is positive in a patient who is otherwise well, WHO suggests one further cycle of the same regimen — extend the schedule rather than starting a new drug.",
    checks: [
      "Diluted in 5 % dextrose only — no saline anywhere in this line",
      "Infusion set to run over 2 h, drop rate counted",
      "Creatinine and potassium checked in the last 7 days (or urine output and clinical check if no laboratory)",
      "Potassium replacement given",
      "Miltefosine taken today, with food (28-day course)",
      "For a woman of childbearing potential: pregnancy test done and contraception plan agreed before miltefosine"
    ],
    ifFail: "Stop the infusion permanently for anaphylaxis. For rigors, fever or hypotension, slow the drip and keep the line open with dextrose — later doses are usually easier. If creatinine rises, halve the dose for a few days rather than abandoning the course.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.2 First choice of treatment, pdf p. 35"
  },
  {
    id: "lamb-mono-vl-hiv",
    drug: "liposomal-amphotericin-b",
    case: "visceral-leishmaniasis-hiv",
    name: "Liposomal amphotericin B alone — VL–HIV (East Africa)",
    use: "VL–HIV when miltefosine is unavailable or contraindicated (pregnancy, no assured contraception)",
    weightBased: true,
    doses: [
      {
        at: 0,
        label: "Day 1",
        note: "Give a 1 mg test dose by infusion first, then the full dose over 2 h"
      },
      { at: 24, label: "Day 2", note: "Over 2 h" },
      { at: 48, label: "Day 3", note: "Over 2 h" },
      { at: 72, label: "Day 4", note: "Over 2 h" },
      { at: 96, label: "Day 5", note: "Over 2 h" },
      { at: 216, label: "Day 10", note: "Over 2 h" },
      { at: 384, label: "Day 17", note: "Over 2 h" },
      { at: 552, label: "Day 24", note: "Last infusion — cumulative 40 mg/kg" }
    ],
    dose: {
      perKg: 5,
      unit: "mg",
      conc: 4,
      concLabel: "4 mg/mL after reconstituting each 50 mg vial with 12 mL water for injection — then dilute in 5 % DEXTROSE only, never saline"
    },
    extendable: "If there is no good clinical response, WHO suggests repeating the same therapy for one more course — extend the schedule.",
    checks: [
      "Diluted in 5 % dextrose only — no saline anywhere in this line",
      "Infusion set to run over 2 h, drop rate counted",
      "Creatinine and potassium checked in the last 7 days (or urine output and clinical check if no laboratory)",
      "Potassium replacement given",
      "ART started (within 2 weeks of starting VL treatment)"
    ],
    ifFail: "Stop permanently for anaphylaxis. Slow the drip for rigors, fever or hypotension, keeping the line open with dextrose. Halve the dose for a few days if renal function deteriorates.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.2 Recommendations, pdf p. 35"
  }
];
