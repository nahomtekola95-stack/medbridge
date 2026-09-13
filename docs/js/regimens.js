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
  }
];
