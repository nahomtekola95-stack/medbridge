/* ============================================================
   MedBridge emergency drug card — weight-based resuscitation doses.
   Every row is DRAFT until clinically reviewed. Doses follow the
   drug entries in drugs-data.js and the cited textbook tables.

   type:
     dose    perKg × weight, capped at max, raised to min; volume = dose / conc
     volume  mL/kg of a fluid
     energy  J/kg
     band    fixed doses chosen by weight band
     maint   Holliday–Segar maintenance fluid (4-2-1 rule)
   ============================================================ */
window.RESUS_GROUPS = {
  arrest: "Cardiac arrest & arrhythmia",
  airway: "Anaphylaxis & airway",
  seizure: "Seizures",
  metabolic: "Glucose, electrolytes & antidotes",
  circulation: "Fluids & blood",
  infection: "First antibiotic dose",
  analgesia: "Analgesia & sedation"
};

window.RESUS = [
  /* ---- arrest ---- */
  { group: "arrest", drug: "adrenaline", name: "Adrenaline", use: "Cardiac arrest", route: "IV / IO",
    type: "dose", perKg: 0.01, unit: "mg", max: 1, conc: 0.1, concLabel: "1:10 000 (0.1 mg/mL)",
    prep: "1 mL of 1:1000 + 9 mL saline = 1:10 000", repeat: "Every 3–5 min",
    ref: "Nelson 22nd ed., Table 79.5, p. 563" },
  { group: "arrest", drug: "amiodarone", name: "Amiodarone", use: "VF / pulseless VT after 3rd shock", route: "IV / IO push in arrest",
    type: "dose", perKg: 5, unit: "mg", max: 300, conc: 50, concLabel: "50 mg/mL",
    repeat: "May repeat to 15 mg/kg total", ref: "Nelson 22nd ed., Table 79.5, p. 563" },
  { group: "arrest", drug: "lidocaine", name: "Lidocaine", use: "VF / pVT if no amiodarone", route: "IV / IO",
    type: "dose", perKg: 1, unit: "mg", max: 100, conc: 10, concLabel: "1 % (10 mg/mL)",
    ref: "Nelson 22nd ed., Table 79.5, p. 563" },
  { group: "arrest", drug: "atropine", name: "Atropine", use: "Bradycardia (after oxygen and ventilation)", route: "IV / IO",
    type: "dose", perKg: 0.02, unit: "mg", min: 0.1, max: 0.5, conc: 0.6, concLabel: "0.6 mg/mL",
    repeat: "Once; adolescent max 1 mg", ref: "Nelson 22nd ed., Table 79.5, p. 563" },
  { group: "arrest", name: "Defibrillation", use: "VF / pulseless VT", route: "Unsynchronised shock",
    type: "energy", perKg: 2, then: 4, maxPerKg: 10, adultCap: "or adult dose",
    ref: "Nelson 22nd ed., Fig. 79.16, p. 566" },
  { group: "arrest", name: "Synchronised cardioversion", use: "Unstable SVT / VT with a pulse", route: "Synchronised shock",
    type: "energy", perKg: 0.5, upper: 1, then: 2,
    ref: "Nelson 22nd ed., Fig. 79.12, p. 562" },

  /* ---- anaphylaxis & airway ---- */
  { group: "airway", drug: "adrenaline", name: "Adrenaline", use: "Anaphylaxis", route: "IM, anterolateral thigh",
    type: "dose", perKg: 0.01, unit: "mg", max: 0.5, conc: 1, concLabel: "1:1000 (1 mg/mL)",
    repeat: "Every 5–15 min if needed", note: "Child ≥ 25 kg: 0.3 mg; adolescent 0.5 mg",
    ref: "Nelson 22nd ed., ch. 190, p. 1437" },
  { group: "airway", drug: "salbutamol", name: "Salbutamol", use: "Severe wheeze", route: "Nebulised (or MDI + spacer)",
    type: "band", bands: [{ under: 20, text: "2.5 mg" }, { under: Infinity, text: "5 mg" }],
    repeat: "Every 20 min × 3 in the first hour", note: "MDI + spacer: 2–8 puffs (Nelson)",
    ref: "Nelson 22nd ed., ch. 185, p. 1405; WHO Pocket Book" },
  { group: "airway", drug: "magnesium-sulfate", name: "Magnesium sulfate", use: "Life-threatening asthma", route: "IV over 20 min (dilute)",
    type: "dose", perKg: 50, unit: "mg", max: 2000, conc: 500, concLabel: "50 % (500 mg/mL) — dilute before use",
    note: "Range 25–75 mg/kg", ref: "Nelson 22nd ed., ch. 185, p. 1406" },
  { group: "airway", drug: "dexamethasone", name: "Dexamethasone", use: "Croup / asthma", route: "Oral, IM or IV",
    type: "dose", perKg: 0.6, unit: "mg", max: 16, conc: 4, concLabel: "4 mg/mL",
    repeat: "Single dose", ref: "Nelson 22nd ed., ch. 185, p. 1408" },
  { group: "airway", drug: "hydrocortisone", name: "Hydrocortisone", use: "Asthma / anaphylaxis adjunct / adrenal crisis", route: "IV or IM",
    type: "dose", perKg: 4, unit: "mg", max: 100, conc: 50, concLabel: "50 mg/mL after reconstitution",
    repeat: "Every 6 h", ref: "WHO Pocket Book; Nelson 22nd ed., Table 352.8, p. 2231" },

  /* ---- seizures ---- */
  { group: "seizure", drug: "midazolam", name: "Midazolam", use: "Convulsion — no IV needed", route: "IM, intranasal or buccal",
    type: "dose", perKg: 0.2, unit: "mg", max: 10, conc: 5, concLabel: "5 mg/mL",
    repeat: "Once after 5–10 min", ref: "Nelson 22nd ed., ch. 633.8, p. 3628; RAMPART 2012" },
  { group: "seizure", drug: "diazepam", name: "Diazepam", use: "Convulsion", route: "Rectal (IV solution, needle removed)",
    type: "dose", perKg: 0.5, unit: "mg", max: 10, conc: 5, concLabel: "5 mg/mL",
    repeat: "Once after 10 min", note: "IV: 0.2–0.3 mg/kg slowly, max 10 mg",
    ref: "WHO Pocket Book 2013" },
  { group: "seizure", drug: "phenobarbital", name: "Phenobarbital", use: "Seizure continuing after 2 benzodiazepine doses; first-line in neonates", route: "IM, or IV over 20 min",
    type: "dose", perKg: 20, unit: "mg", max: 1000, conc: 200, concLabel: "200 mg/mL (dilute 1:10 for IV)",
    note: "Bag-valve-mask at the bedside — respiratory arrest risk", ref: "Nelson 22nd ed., ch. 633.8, p. 3628" },
  { group: "seizure", drug: "magnesium-sulfate", name: "Magnesium sulfate", use: "Eclampsia (adult woman — not weight based)", route: "IV + IM (Pritchard)",
    type: "band", bands: [{ under: Infinity, text: "4 g IV over 5–20 min + 10 g IM (5 g each buttock)" }],
    note: "Then 5 g IM every 4 h — use Dose schedules", ref: "WHO MCPC 2017" },

  /* ---- metabolic & antidotes ---- */
  { group: "metabolic", drug: "dextrose", name: "Glucose 10 %", use: "Hypoglycaemia — child", route: "IV / IO",
    type: "volume", perKg: 5, fluid: "10 % dextrose", note: "= 0.5 g/kg. 10 % from 50 %: 1 part + 4 parts saline",
    ref: "WHO Pocket Book 2013" },
  { group: "metabolic", drug: "dextrose", name: "Glucose 10 %", use: "Hypoglycaemia — neonate", route: "IV",
    type: "volume", perKg: 2, fluid: "10 % dextrose", note: "Then infusion 5–8 mg/kg/min",
    ref: "Nelson 22nd ed., ch. 113, p. 983" },
  { group: "metabolic", drug: "calcium-gluconate", name: "Calcium gluconate 10 %", use: "Hyperkalaemia with ECG changes / hypocalcaemia / Mg toxicity", route: "IV over 5–10 min, diluted",
    type: "dose", perKg: 0.5, unit: "mL", max: 20, conc: 1, concLabel: "10 % (100 mg/mL)",
    note: "= 50 mg/kg. Never in the same line as bicarbonate", ref: "Nelson 22nd ed., Table 79.5, p. 563" },
  { group: "metabolic", drug: "sodium-bicarbonate", name: "Sodium bicarbonate 8.4 %", use: "Prolonged arrest / hyperkalaemia with acidosis", route: "IV slowly, with ventilation",
    type: "dose", perKg: 1, unit: "mmol", conc: 1, concLabel: "8.4 % (1 mmol/mL)",
    note: "Neonate: dilute 1:1 to 4.2 % (2 mL/kg). Not routine", ref: "Nelson 22nd ed., Table 79.5, p. 563" },
  { group: "metabolic", drug: "naloxone", name: "Naloxone", use: "Opioid overdose", route: "IV, IO, IM, SC",
    type: "dose", perKg: 0.1, unit: "mg", max: 2, conc: 0.4, concLabel: "0.4 mg/mL",
    repeat: "Every 2–3 min; may need infusion", note: "Therapeutic over-sedation: 1–5 mcg/kg only",
    ref: "Nelson 22nd ed., Table 79.5, p. 563" },

  /* ---- fluids & blood ---- */
  { group: "circulation", drug: "ringers-lactate", name: "Fluid bolus", use: "Shock (not malnourished)", route: "IV / IO",
    type: "volume", perKg: 10, upper: 20, fluid: "Ringer's lactate or 0.9 % saline",
    note: "Reassess after each bolus; stop if crackles or liver enlarges", ref: "Nelson 22nd ed., ch. 85, p. 611" },
  { group: "circulation", drug: "ringers-lactate", name: "Fluid bolus", use: "Shock in severe acute malnutrition", route: "IV over 1 hour",
    type: "volume", perKg: 15, fluid: "RL + 5 % dextrose (or half-strength Darrow's + D5)",
    note: "Never Plan C rates in SAM", ref: "WHO Pocket Book; Nelson 22nd ed., ch. 62, p. 428" },
  { group: "circulation", drug: "blood-transfusion", name: "Whole blood", use: "Severe anaemia / haemorrhage", route: "IV over 3–4 h",
    type: "volume", perKg: 20, fluid: "whole blood", note: "Packed cells 10 mL/kg; heart failure or SAM: 10 mL/kg over 3 h + furosemide 1 mg/kg",
    ref: "WHO Pocket Book; Nelson 22nd ed., ch. 62, p. 428" },
  { group: "circulation", name: "Maintenance fluid", use: "Daily requirement (Holliday–Segar)", route: "IV or oral",
    type: "maint", ref: "4-2-1 rule" },

  /* ---- first antibiotic ---- */
  { group: "infection", drug: "ceftriaxone", name: "Ceftriaxone", use: "Sepsis / meningitis — first dose", route: "IV or IM",
    type: "dose", perKg: 80, unit: "mg", max: 2000, conc: 250, concLabel: "250 mg/mL (IM) or 100 mg/mL (IV)",
    note: "Meningitis 100 mg/kg/day (max 4 g). Avoid in jaundiced neonates and with calcium fluids", ref: "WHO Pocket Book 2013" },
  { group: "infection", drug: "ampicillin", name: "Ampicillin", use: "Neonatal / child sepsis, with gentamicin", route: "IV or IM",
    type: "dose", perKg: 50, unit: "mg", max: 2000, conc: 50, concLabel: "50 mg/mL working dilution",
    ref: "WHO Pocket Book 2013; Nelson 22nd ed., ch. 62, p. 430" },
  { group: "infection", drug: "gentamicin", name: "Gentamicin", use: "Sepsis (child > 1 week)", route: "IV or IM once daily",
    type: "dose", perKg: 7.5, unit: "mg", conc: 40, concLabel: "40 mg/mL",
    note: "First week of life: 3 mg/kg (< 2 kg) or 5 mg/kg", ref: "WHO Pocket Book 2013" },
  { group: "infection", drug: "artesunate", name: "Artesunate", use: "Severe malaria", route: "IV or IM",
    type: "dose", perKg: 2.4, bands: [{ under: 20, perKg: 3 }], unit: "mg", conc: 10, concLabel: "10 mg/mL IV (20 mg/mL IM)",
    repeat: "At 0, 12 and 24 h, then daily", ref: "WHO Guidelines for malaria 2023; Nelson 22nd ed., p. 2136" },

  /* ---- analgesia & sedation ---- */
  { group: "analgesia", drug: "ketamine", name: "Ketamine", use: "Procedural sedation", route: "IV over 1 min",
    type: "dose", perKg: 1, upper: 2, unit: "mg", conc: 50, concLabel: "50 mg/mL",
    note: "IM: 4–5 mg/kg. Reduce the dose in exhausted shock", ref: "Nelson 22nd ed., Table 86.11, p. 620" },
  { group: "analgesia", drug: "morphine", name: "Morphine", use: "Severe pain", route: "IV titrated / IM",
    type: "dose", perKg: 0.1, unit: "mg", max: 10, conc: 10, concLabel: "10 mg/mL — dilute to 1 mg/mL for IV",
    note: "Infants < 6 months: 0.025–0.05 mg/kg", ref: "Nelson 22nd ed., Table 86.11, p. 620" },
  { group: "analgesia", drug: "paracetamol", name: "Paracetamol", use: "Pain / fever", route: "Oral",
    type: "dose", perKg: 15, unit: "mg", max: 1000, conc: 24, concLabel: "120 mg/5 mL syrup (24 mg/mL)",
    repeat: "Every 6 h, max 75 mg/kg/day (60 < 2 y)", ref: "Nelson 22nd ed., Table 93.6, p. 681" }
];
