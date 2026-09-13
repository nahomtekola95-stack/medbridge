/* ============================================================
   MedBridge neonatal dosing by gestational age (GA, completed weeks
   at birth), postnatal age (PNA, days) and current weight.
   DRAFT until reviewed by a neonatologist / clinical pharmacist.
   Rule order matters: the FIRST matching rule wins.
   Main scheme: WHO Pocket Book of Hospital Care for Children, 2nd ed.
   2013 (ch. 3 Problems of the neonate and young infant, and its neonatal
   drug-dose table) — the scheme used in Ethiopian national guidelines.
   Where WHO gives no age-based scheme, BNF for Children (BNFc) or
   Nelson Textbook of Pediatrics 22nd ed. 2024 is used and named in
   each rule's note. `refs` quotes were checked against the cited page.
   PMA (postmenstrual age) = GA + PNA/7.
   ============================================================ */
window.NEONATAL = {
  "gentamicin": {
    use: "Possible serious bacterial infection / sepsis, with ampicillin or benzylpenicillin (first 28 days of life)",
    unit: "mg", conc: 10, concLabel: "10 mg/mL paediatric vial (or dilute 40 mg/mL: 1 mL + 3 mL water for injection = 10 mg/mL)",
    route: "IV (slow, over 3–5 min) or IM",
    rules: [
      { pnaMax: 7, wtMax: 1.99, perKg: 3, every: 24, note: "WHO 2013: first week of life, low birth weight (< 2 kg) — 3 mg/kg once daily. (BNFc alternative in the first week: 5 mg/kg every 36 h.)" },
      { pnaMax: 7, perKg: 5, every: 24, note: "WHO 2013: first week of life, weight ≥ 2 kg — 5 mg/kg once daily." },
      { pnaMin: 8, perKg: 7.5, every: 24, note: "WHO 2013: weeks 2–4 of life — 7.5 mg/kg once daily." }
    ],
    monitor: "Ototoxic and nephrotoxic: check urine output; if the baby is anuric or creatinine rising, extend the interval and measure trough levels where available (trough < 2 mg/L). Do not combine with furosemide.",
    ref: "WHO Pocket Book of Hospital Care for Children, 2nd ed. 2013, ch. 3 and neonatal drug-dose table; BNF for Children",
    refs: [
      { book: "nelson", text: "Ampicillin plus gentamicin is the standard empirical regimen for early-onset neonatal sepsis.", ref: "Nelson 22nd ed. 2024, ch. 148, p. 1149", pdf_page: 1162, quote: "An empirical regimen for suspected early-onset infection in a term or late preterm infant includes ampicillin and gentamicin" },
      { book: "nelson", text: "Gentamicin may cause ototoxicity and nephrotoxicity; monitor renal function.", ref: "Nelson 22nd ed. 2024, ch. 225 Principles of Antibacterial Therapy, Table 225.3, p. 1680", pdf_page: 1686, quote: "May cause ototoxicity and nephrotoxicity" }
    ]
  },

  "ampicillin": {
    use: "Possible serious bacterial infection / sepsis, with gentamicin",
    unit: "mg", conc: 50, concLabel: "50 mg/mL (500 mg vial made up to 10 mL with water for injection); use within 1 hour",
    route: "IV or IM",
    rules: [
      { pnaMax: 7, perKg: 50, every: 12, note: "WHO 2013: first week of life — 50 mg/kg every 12 h. Meningitis: 100 mg/kg per dose." },
      { pnaMin: 8, perKg: 50, every: 8, note: "WHO 2013: weeks 2–4 of life — 50 mg/kg every 8 h. Meningitis: 100 mg/kg per dose. (BNFc shortens the interval to every 6 h from day 21.)" }
    ],
    ref: "WHO Pocket Book of Hospital Care for Children, 2nd ed. 2013, neonatal drug-dose table",
    refs: [
      { book: "nelson", text: "Ampicillin plus gentamicin is the standard empirical regimen for early-onset neonatal sepsis.", ref: "Nelson 22nd ed. 2024, ch. 148, p. 1149", pdf_page: 1162, quote: "An empirical regimen for suspected early-onset infection in a term or late preterm infant includes ampicillin and gentamicin" }
    ]
  },

  "benzylpenicillin": {
    use: "Sepsis (with gentamicin), congenital syphilis, GBS infection",
    unit: "units", conc: 100000, concLabel: "100,000 units/mL (1 MU = 600 mg vial made up to 10 mL with water for injection)",
    route: "IV (IM possible)",
    rules: [
      { pnaMax: 7, perKg: 50000, every: 12, note: "WHO 2013: first week of life — 50,000 units/kg every 12 h. Meningitis: 100,000 units/kg per dose." },
      { pnaMin: 8, perKg: 50000, every: 8, note: "WHO 2013: weeks 2–4 of life — 50,000 units/kg every 8 h. Meningitis: 100,000 units/kg per dose." }
    ],
    avoid: "Benzathine and procaine penicillin are different long-acting IM-only products — never give them intravenously.",
    ref: "WHO Pocket Book of Hospital Care for Children, 2nd ed. 2013, neonatal drug-dose table; Nelson 22nd ed. 2024, Table 225.3",
    refs: [
      { book: "nelson", text: "Nelson Table 225.3 gives lower per-day penicillin G doses divided 12-hourly in the first week and 8-hourly later (weight-banded scheme).", ref: "Nelson 22nd ed. 2024, ch. 225 Principles of Antibacterial Therapy, Table 225.3, p. 1682", pdf_page: 1688, quote: "units/kg/24 hr divided q12h IV or IM (meningitis: 100,000 U/" }
    ]
  },

  "cloxacillin": {
    use: "Suspected staphylococcal infection (skin pustules, umbilical infection with cellulitis, osteomyelitis, abscess)",
    unit: "mg", conc: 50, concLabel: "50 mg/mL (500 mg vial made up to 10 mL with water for injection)",
    route: "IV or IM",
    rules: [
      { pnaMax: 7, perKg: 25, every: 12, note: "WHO 2013: first week of life — 25–50 mg/kg every 12 h; use 50 mg/kg for severe infection or meningitis." },
      { pnaMin: 8, perKg: 25, every: 8, note: "WHO 2013: weeks 2–4 of life — 25–50 mg/kg every 8 h; use 50 mg/kg for severe infection or meningitis." }
    ],
    ref: "WHO Pocket Book of Hospital Care for Children, 2nd ed. 2013, neonatal drug-dose table",
    refs: [
      { book: "nelson", text: "Nelson's antistaphylococcal penicillin (oxacillin/nafcillin) neonatal dosing is also divided 12-hourly in week 1 and 8-hourly or more often later.", ref: "Nelson 22nd ed. 2024, ch. 225 Principles of Antibacterial Therapy, Table 225.3, p. 1681", pdf_page: 1687, quote: "Postnatal age ≤7 days weight 1,200-2,000 g: 50 mg/" }
    ]
  },

  "ceftriaxone": {
    use: "Neonatal meningitis or sepsis when ampicillin + gentamicin is unavailable or failing; gonococcal eye infection",
    unit: "mg", conc: 100, concLabel: "100 mg/mL (1 g vial made up to 10 mL with water for injection) for IV use",
    route: "IV over 30–60 min, or IM",
    rules: [
      { pmaMax: 40.99, perKg: 50, every: 24, note: "BNFc: contraindicated below 41 weeks corrected (postmenstrual) age — prefer ampicillin + gentamicin (or cefotaxime if stocked). Dose shown is WHO 2013 50 mg/kg once daily; meningitis 100 mg/kg once daily." },
      { perKg: 50, every: 24, note: "WHO 2013: 50 mg/kg once daily; meningitis 100 mg/kg once daily. Nelson Table 225.3: 50–75 mg/kg every 24 h." }
    ],
    avoid: "Avoid in jaundiced babies (displaces bilirubin) and in preterm babies below 41 weeks corrected age. NEVER give with any calcium-containing IV fluid or calcium gluconate in a neonate, even in separate lines (fatal precipitates).",
    ref: "WHO Pocket Book of Hospital Care for Children, 2nd ed. 2013; BNF for Children; Nelson 22nd ed. 2024, ch. 148 and Table 225.3",
    refs: [
      { book: "nelson", text: "Ceftriaxone is typically not used in neonates: calcium precipitation and bilirubin displacement.", ref: "Nelson 22nd ed. 2024, ch. 148, p. 1149", pdf_page: 1162, quote: "Ceftriaxone is typically not used in the neonatal period" },
      { book: "nelson", text: "Neonatal ceftriaxone dose 50–75 mg/kg every 24 h.", ref: "Nelson 22nd ed. 2024, ch. 225 Principles of Antibacterial Therapy, Table 225.3, p. 1678", pdf_page: 1684, quote: "Neonates: 50-75 mg/kg q24h IV or IM" }
    ]
  },

  "metronidazole": {
    use: "Anaerobic infection (necrotising enterocolitis, intra-abdominal sepsis), tetanus neonatorum",
    unit: "mg", conc: 5, concLabel: "5 mg/mL ready-to-use 100 mL infusion bag (draw the dose into a syringe)",
    route: "IV over 20–30 min (or oral)",
    rules: [
      { pmaMax: 25.99, perKg: 7.5, every: 24, note: "BNFc: below 26 weeks corrected age — 7.5 mg/kg every 24 h, starting 24 h after the loading dose." },
      { pmaMax: 33.99, perKg: 7.5, every: 12, note: "BNFc: 26–34 weeks corrected age — 7.5 mg/kg every 12 h, starting 12 h after the loading dose." },
      { perKg: 7.5, every: 8, note: "BNFc: 34 weeks corrected age and above — 7.5 mg/kg every 8 h, starting 8 h after the loading dose." }
    ],
    loading: { perKg: 15, note: "BNFc: single 15 mg/kg loading dose, then maintenance by corrected age." },
    ref: "BNF for Children (metronidazole, neonatal anaerobic infection); WHO Pocket Book 2013 gives 7.5 mg/kg per dose",
    refs: []
  },

  "chloramphenicol": {
    use: "Only when no safer antibiotic exists (e.g. meningitis with penicillin allergy and no cephalosporin)",
    unit: "mg", conc: 20, concLabel: "20 mg/mL (1 g vial + 5 mL water = 200 mg/mL, then 1 mL + 9 mL water)",
    route: "IV",
    rules: [
      { pnaMax: 14, perKg: 12.5, every: 12, note: "BNFc: neonate up to 14 days — 12.5 mg/kg twice daily (= 25 mg/kg/day, as in the app entry)." },
      { pnaMin: 15, perKg: 12.5, every: 12, note: "BNFc: 14–28 days — 12.5 mg/kg 2–4 times daily; increase frequency only with serum-level monitoring." }
    ],
    avoid: "Avoid in newborns where ampicillin + gentamicin or a cephalosporin is available: immature glucuronidation causes grey baby syndrome (shock, marrow suppression). Never use the child dose of 25 mg/kg every 6 h.",
    monitor: "Abdominal distension, vomiting, grey colour, hypothermia or hypotension = stop immediately. Full blood count.",
    ref: "BNF for Children (chloramphenicol); WHO Pocket Book 2013; Nelson 22nd ed. 2024, Table 119.4",
    refs: [
      { book: "nelson", text: "Chloramphenicol in premature infants causes gray baby syndrome.", ref: "Nelson 22nd ed. 2024, ch. 119 The High-Risk Infant, Table 119.4, p. 1045", pdf_page: 1055, quote: "Gray baby syndrome—shock, bone marrow suppression" }
    ]
  },

  "phenobarbital": {
    use: "Neonatal seizures (first line)",
    unit: "mg", conc: 20, concLabel: "20 mg/mL (200 mg/mL ampoule: 1 mL + 9 mL water for injection)",
    route: "IV over 15–20 min (or IM); maintenance IV or oral",
    rules: [
      { perKg: 5, every: 24, note: "WHO 2013: maintenance 5 mg/kg once daily, starting 24 h after the load. Nelson: 3–6 mg/kg/day, usually in two doses." }
    ],
    loading: { perKg: 20, note: "20 mg/kg; if seizures continue after 30 min give further 10 mg/kg doses up to a total of 40 mg/kg (WHO 2013; Nelson). Bag-valve-mask ready — apnoea may follow." },
    monitor: "Breathing and heart rate after loading; check glucose and calcium; EEG if available (seizures may continue electrically).",
    ref: "WHO Pocket Book of Hospital Care for Children, 2nd ed. 2013, ch. 3; Nelson 22nd ed. 2024, ch. 633.7",
    refs: [
      { book: "nelson", text: "Phenobarbital is first-choice for neonatal seizures; load 20 mg/kg, extra 10–20 mg/kg to 40 mg/kg.", ref: "Nelson 22nd ed. 2024, ch. 633.7 Neonatal Seizures, p. 3623", pdf_page: 3661, quote: "The usual loading dose is 20 mg/kg" },
      { book: "nelson", text: "Maintenance 3–6 mg/kg/day, usually in two doses, from 24 h after loading.", ref: "Nelson 22nd ed. 2024, ch. 633.7 Neonatal Seizures, p. 3623", pdf_page: 3661, quote: "maintenance dosing can be started at 3-6 mg/kg/day, usually administered in two separate doses" }
    ]
  },

  "phenytoin": {
    use: "Neonatal seizures not controlled by phenobarbital (second line)",
    unit: "mg", conc: 5, concLabel: "5 mg/mL (50 mg/mL ampoule: 1 mL + 9 mL 0.9 % saline ONLY; use within 1 h)",
    route: "IV via saline-flushed line",
    rules: [
      { perKg: 2.5, every: 12, note: "BNFc: maintenance 2.5–5 mg/kg twice daily, adjusted to response and levels, starting 12 h after the load. Nelson: fosphenytoin maintenance 4–8 mg PE/kg/day." }
    ],
    loading: { perKg: 20, note: "Nelson: 20 mg/kg at no more than 0.5–1 mg/kg/min (at least 20–40 min) with heart-rate monitoring." },
    avoid: "Never dilute in glucose. Do not give with IV lidocaine. Avoid in significant heart disease.",
    monitor: "ECG/heart rate during loading; oral absorption in neonates is poor and levels are unpredictable.",
    ref: "Nelson 22nd ed. 2024, ch. 633.7; BNF for Children",
    refs: [
      { book: "nelson", text: "Phenytoin load 20 mg/kg at ≤0.5–1 mg/kg/min with heart-rate monitoring.", ref: "Nelson 22nd ed. 2024, ch. 633.7 Neonatal Seizures, p. 3623", pdf_page: 3661, quote: "Phenytoin is given at a loading dose of 20 mg/kg at a rate not to exceed 0.5-1.0 mg/kg/min" }
    ]
  },

  "midazolam": {
    use: "Refractory neonatal seizures after phenobarbital (and phenytoin), where ventilatory support is available",
    unit: "mg", conc: 1, concLabel: "1 mg/mL (1 mg/mL ampoule, or 5 mg/mL: 1 mL + 4 mL saline)",
    route: "IV bolus then continuous infusion (pump)",
    rules: [
      { perKg: 0.05, note: "Nelson: initial IV bolus 0.05–0.15 mg/kg, then infusion 0.5–1 mcg/kg/min titrated upward every 5 min or longer to a maximum of about 33 mcg/kg/min (2 mg/kg/h). Start at the low end in preterm babies." }
    ],
    avoid: "Not first line in newborns (phenobarbital is). Apnoea and hypotension — only with bag-valve-mask and staff able to ventilate.",
    ref: "Nelson 22nd ed. 2024, ch. 633.7 Neonatal Seizures, p. 3623",
    refs: [
      { book: "nelson", text: "Midazolam for refractory neonatal seizures: bolus 0.05–0.15 mg/kg then infusion.", ref: "Nelson 22nd ed. 2024, ch. 633.7 Neonatal Seizures, p. 3623", pdf_page: 3661, quote: "as an initial intravenous bolus, with a continuous infusion" }
    ]
  },

  "caffeine-citrate": {
    use: "Apnoea of prematurity (and before/after extubation in preterm babies)",
    unit: "mg", conc: 20, concLabel: "Caffeine CITRATE 20 mg/mL (= 10 mg/mL caffeine base)",
    route: "Oral / NG or IV over 30 min",
    rules: [
      { perKg: 5, every: 24, note: "WHO 2013 / Nelson: maintenance 5 mg/kg once daily, starting 24 h after the load; Nelson allows up to 10 mg/kg if apnoea persists." }
    ],
    loading: { perKg: 20, note: "20 mg/kg caffeine citrate once." },
    monitor: "Hold a dose if heart rate > 180/min or jittery. Continue to about 34 weeks corrected age and 5–7 apnoea-free days.",
    ref: "WHO Pocket Book of Hospital Care for Children, 2nd ed. 2013; Nelson 22nd ed. 2024, ch. 125 Apnea, p. 1076",
    refs: [
      { book: "nelson", text: "Caffeine citrate 20 mg/kg load, then 5–10 mg/kg once daily 24 h later; levels usually unnecessary.", ref: "Nelson 22nd ed. 2024, ch. 125 Apnea, p. 1076", pdf_page: 1087, quote: "loading dose of 20 mg/kg of caffeine citrate followed 24 hours later by once-daily maintenance doses of 5-10 mg/kg" }
    ]
  },

  "aminophylline": {
    use: "Apnoea of prematurity when caffeine citrate is not available",
    unit: "mg", conc: 5, concLabel: "5 mg/mL (25 mg/mL ampoule: 1 mL + 4 mL 0.9 % saline or 5 % glucose)",
    route: "IV (slowly) or oral",
    rules: [
      { pnaMax: 7, perKg: 2.5, every: 12, note: "WHO 2013: first week of life — 2.5 mg/kg every 12 h." },
      { pnaMin: 8, perKg: 4, every: 12, note: "WHO 2013: weeks 2–4 of life — 4 mg/kg every 12 h." }
    ],
    loading: { perKg: 6, note: "WHO 2013: 6 mg/kg IV over 20 min (or orally)." },
    avoid: "Prefer caffeine citrate: wider safety margin and once-daily dosing.",
    monitor: "Heart rate (hold if > 180/min), feeding intolerance, jitteriness, seizures. Very long half-life in preterm babies.",
    ref: "WHO Pocket Book of Hospital Care for Children, 2nd ed. 2013, neonatal drug-dose table",
    refs: []
  },

  "paracetamol": {
    use: "Pain or fever in the newborn (oral)",
    unit: "mg", conc: 24, concLabel: "120 mg/5 mL syrup (24 mg/mL)",
    route: "Oral / NG",
    rules: [
      { pmaMin: 32, perKg: 15, every: 8, note: "BNFc: 32 weeks corrected age and above — 10–15 mg/kg every 6–8 h, maximum 60 mg/kg/day. Shown at every 8 h (45 mg/kg/day), the app's neonatal maximum." },
      { pmaMin: 28, perKg: 15, every: 12, note: "BNFc: 28–32 weeks corrected age — 10–15 mg/kg every 8–12 h, maximum 30 mg/kg/day." },
      { perKg: 15, every: 12, note: "Below 28 weeks corrected age BNFc gives no dose. The 28–32 week regimen (maximum 30 mg/kg/day) is shown as the most conservative option — use only on senior advice." }
    ],
    loading: { perKg: 20, note: "BNFc: 20 mg/kg single loading dose." },
    monitor: "Count every dose from every source; neonatal liver metabolism is immature.",
    ref: "BNF for Children (paracetamol, neonate by corrected gestational age)",
    refs: [
      { book: "nelson", text: "Drug biotransformation is immature in neonates.", ref: "Nelson 22nd ed. 2024, ch. 93 Pediatric Pain Management, p. 681", pdf_page: 727, quote: "Drug biotransformation processes are immature in neonates" }
    ]
  },

  "vitamin-k": {
    use: "Prophylaxis of vitamin K deficiency bleeding at birth",
    unit: "mg", conc: 2, concLabel: "Paediatric ampoule 1 mg/0.5 mL (2 mg/mL)",
    route: "IM (anterolateral thigh)",
    rules: [
      { wtMax: 1.49, fixed: 0.5, note: "Low birth weight (< 1.5 kg): 0.5 mg IM once (Nelson; app entry)." },
      { fixed: 1, note: "1 mg IM once within the first hours of birth (WHO; Nelson). For a bleeding newborn give 1 mg IM or slow IV, repeat every 8 h if needed, plus fresh frozen plasma." }
    ],
    ref: "WHO recommendations on newborn health; Nelson 22nd ed. 2024, ch. 142 Hemorrhage in the Newborn Infant, pp. 1126–1127",
    refs: [
      { book: "nelson", text: "IM vitamin K1 1 mg soon after birth prevents bleeding in most term infants.", ref: "Nelson 22nd ed. 2024, ch. 142 Hemorrhage in the Newborn Infant, p. 1126", pdf_page: 1139, quote: "Intramuscular administration of 1 mg vitamin K1 (phytonadione) soon after birth" },
      { book: "nelson", text: "Low birthweight infants may be given 0.5 mg.", ref: "Nelson 22nd ed. 2024, ch. 142 Hemorrhage in the Newborn Infant, p. 1126", pdf_page: 1139, quote: "Low birthweight infants may be given 0.5 mg phytonadione" }
    ]
  },

  "dextrose": {
    use: "Symptomatic neonatal hypoglycaemia, or low glucose despite feeding",
    unit: "mL", conc: 1, concLabel: "Volume of 10 % glucose (dilute 50 %: 1 mL + 4 mL water or saline = 10 %)",
    route: "IV slowly over 5–10 min, then infusion",
    rules: [
      { perKg: 2, note: "Nelson: bolus 2 mL/kg of 10 % glucose, then continuous infusion 4–8 mg/kg/min (10 % glucose 2.4–4.8 mL/kg/h). Recheck glucose in 15–30 min. Never give 25 % or 50 % undiluted." }
    ],
    monitor: "Glucose every 15–30 min until stable, then 3–6-hourly; keep feeding.",
    ref: "Nelson 22nd ed. 2024, ch. 113 Hypoglycemia, p. 983 and ch. 148, p. 1143; WHO Pocket Book 2013",
    refs: [
      { book: "nelson", text: "Symptomatic hypoglycaemia: 2 mL/kg of 10 % dextrose, then infusion.", ref: "Nelson 22nd ed. 2024, ch. 113 Hypoglycemia, p. 983", pdf_page: 1029, quote: "2 mL/kg of dextrose 10% water (D10W) should be administered" },
      { book: "nelson", text: "Continuous peripheral glucose infusion 4–8 mg/kg/min; avoid 25 % boluses (rebound hypoglycaemia).", ref: "Nelson 22nd ed. 2024, ch. 148, p. 1143", pdf_page: 1156, quote: "a continuous peripheral IV infusion at a rate of 4-8 mg/kg/min should be given" }
    ]
  },

  "adrenaline": {
    use: "Newborn resuscitation: heart rate < 60/min after 60 s of effective ventilation plus chest compressions",
    unit: "mg", conc: 0.1, concLabel: "0.1 mg/mL (1:10,000) — 1 mL of 1:1000 + 9 mL 0.9 % saline",
    route: "IV/IO via umbilical vein (preferred); endotracheal only if no access",
    rules: [
      { perKg: 0.02, note: "Nelson (NRP): 0.02 mg/kg IV/IO (0.2 mL/kg of 1:10,000) followed by a 3 mL saline flush; repeat every 3–5 min. Endotracheal dose 0.1 mg/kg (1 mL/kg of 1:10,000)." }
    ],
    avoid: "Ventilation is the priority — adrenaline is rarely needed if the lungs are being inflated effectively.",
    ref: "Nelson 22nd ed. 2024, ch. 123 Neonatal Resuscitation and Delivery Room Emergencies, p. 1071",
    refs: [
      { book: "nelson", text: "Epinephrine 0.02 mg/kg IV/IO with a 3 mL flush, repeat every 3–5 min; ETT 0.1 mg/kg.", ref: "Nelson 22nd ed. 2024, ch. 123 Neonatal Resuscitation, p. 1071", pdf_page: 1082, quote: "initial dose recommendation of 0.02 mg/kg intravenously/intraosseously followed by a 3-mL flush" },
      { book: "nelson", text: "Endotracheal epinephrine dose 0.1 mg/kg.", ref: "Nelson 22nd ed. 2024, ch. 123 Neonatal Resuscitation, p. 1071", pdf_page: 1082, quote: "Epinephrine may also be given through the ETT (0.1 mg/kg)" }
    ]
  },

  "naloxone": {
    use: "Newborn respiratory depression from maternal opioid given within about 4 h of birth, AFTER ventilation has restored heart rate and colour",
    unit: "mg", conc: 0.4, concLabel: "0.4 mg/mL ampoule (undiluted)",
    route: "IV or IM",
    rules: [
      { perKg: 0.1, note: "0.1 mg/kg IV or IM (WHO Pocket Book 2013; app full-reversal dose). Repeat if breathing becomes depressed again — naloxone wears off before pethidine or morphine." }
    ],
    avoid: "Contraindicated in a baby whose mother is opioid-dependent (precipitates withdrawal seizures). Not part of initial resuscitation — ventilate first.",
    monitor: "Observe breathing and SpO2 for at least 4–6 h after a dose.",
    ref: "WHO Pocket Book of Hospital Care for Children, 2nd ed. 2013; Williams 25th ed. 2018, ch. 25, pdf p. 1073",
    refs: [
      { book: "williams", text: "Naloxone is contraindicated in a newborn of a narcotic-addicted mother.", ref: "Williams Obstetrics 25th ed. 2018, ch. 25 Obstetrical Analgesia and Anesthesia, pdf p. 1073", pdf_page: 1073, quote: "naloxone is contraindicated in a newborn of a narcotic-addicted mother" }
    ]
  },

  "calcium-gluconate": {
    use: "Symptomatic neonatal hypocalcaemia (tetany, seizures with low calcium)",
    unit: "mg", conc: 100, concLabel: "10 % calcium gluconate = 100 mg/mL (dilute 1:1 with 0.9 % saline or 5 % glucose)",
    route: "Slow IV into a secure vein",
    rules: [
      { perKg: 100, note: "Nelson: 100 mg/kg (1 mL/kg of 10 %) as an acute IV bolus, at no more than 0.5–1 mL/min with heart-rate monitoring; total not above 20 mg elemental calcium/kg (about 2 mL/kg of 10 %). Stop if bradycardia." }
    ],
    avoid: "Never in the same line as bicarbonate or phosphate; never with ceftriaxone in neonates. Extravasation causes skin necrosis. Check magnesium if seizures persist.",
    ref: "Nelson 22nd ed. 2024, ch. 69, p. 475 and ch. 611 Hypoparathyroidism, p. 3437",
    refs: [
      { book: "nelson", text: "Symptomatic hypocalcaemia: acute IV bolus of 100 mg/kg calcium gluconate.", ref: "Nelson 22nd ed. 2024, ch. 69 Vitamin D Deficiency (Rickets), p. 475", pdf_page: 522, quote: "100 mg/kg calcium gluconate" },
      { book: "nelson", text: "Neonatal tetany: 10 % calcium gluconate at 0.5–1 mL/min with heart-rate monitoring, total ≤ 20 mg elemental calcium/kg.", ref: "Nelson 22nd ed. 2024, ch. 611 Hypoparathyroidism, p. 3437", pdf_page: 3475, quote: "at the rate of 0.5-1.0 mL/min while the heart rate is monitored" }
    ]
  }
};
