/*
 * MedBridge: special-population safety data (pregnancy, breastfeeding, kidney, liver)
 * ---------------------------------------------------------------------------------
 * window.SAFETY is keyed by drug id (same ids as window.DRUG_DB, plus ipratropium,
 * adenosine, mannitol, hypertonic-saline, arv-prophylaxis, tb-rhze, snake-antivenom, oxygen).
 *
 * STATUS: DRAFT. Not yet reviewed by a clinical pharmacist. Check against the national
 * formulary and local protocol before relying on it.
 *
 * Levels
 *   pregnancy / breastfeeding: "safe" | "caution" | "avoid"
 *   renal / hepatic:           "none" (no dose change) | "adjust" | "avoid"
 * renal.bands: shown after creatinine clearance (CrCl, mL/min) is calculated. The app shows
 * the most severe band whose `below` is greater than the patient's CrCl. Bands are ordered
 * from mildest (highest `below`) to most severe.
 *
 * Main sources: WHO Model Formulary 2008; WHO Managing Complications in Pregnancy and
 * Childbirth (2nd ed. 2017); WHO Guidelines for Malaria 2023; WHO consolidated HIV and TB
 * guidelines; BNF and BNF for Children; The Renal Drug Handbook; LactMed (NIH).
 * Textbook refs carry pdf_page and an exact quote, verified against the extracted text of:
 * Harrison's Principles of Internal Medicine 22nd ed. 2025; Williams Obstetrics 25th ed. 2018;
 * Gabbe's Obstetrics 9th ed. 2025; Schwartz's Principles of Surgery 11th ed. 2019;
 * Nelson Textbook of Pediatrics 22nd ed. 2024.
 */
window.SAFETY = {

  "oxytocin": {
    pregnancy: { level: "safe", text: "Used routinely for induction and augmentation of labour and to prevent and treat postpartum haemorrhage. Avoid uterine hyperstimulation; do not use when vaginal birth is contraindicated." },
    breastfeeding: { level: "safe", text: "Compatible with breastfeeding. Oxytocin is a natural part of milk let-down." },
    renal: { level: "none", text: "No dose change. In kidney impairment or pre-eclampsia watch fluid balance closely: large volumes of dilute infusion can cause water intoxication and hyponatraemia." },
    hepatic: { level: "none", text: "No dose change." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "WHO Managing Complications in Pregnancy and Childbirth 2017", "BNF"]
  },

  "magnesium-sulfate": {
    pregnancy: { level: "safe", text: "The drug of choice to prevent and treat eclampsia, and used for fetal neuroprotection before 32 weeks. Continue for 24 hours after birth or after the last convulsion." },
    breastfeeding: { level: "safe", text: "Compatible with breastfeeding. Very little is absorbed by the baby from milk." },
    renal: {
      level: "adjust",
      text: "Magnesium is removed almost only by the kidneys. Give the full loading dose whatever the kidney function; it is the maintenance dose that must be reduced or withheld. Before every maintenance dose check: urine output at least 30 mL/h (100 mL in 4 h), knee reflexes present, respiratory rate at least 16/min. If any is not met, withhold the dose. Keep calcium gluconate 1 g at the bedside.",
      bands: [
        { below: 50, text: "Reduced kidney function: give the full 4 g loading dose, then reduce maintenance (for example 1 g/h IV instead of 2 g/h, or delay IM doses) and give each dose only if urine output, reflexes and breathing are reassuring. Measure serum magnesium every 4 to 6 h if available." },
        { below: 30, text: "Severe kidney impairment or oliguria: give the loading dose only. Withhold maintenance unless serum magnesium can be measured and is below the therapeutic range. Check reflexes and breathing hourly; calcium gluconate 1 g IV ready. Seek senior help." }
      ]
    },
    hepatic: { level: "none", text: "No dose change for liver disease (including HELLP syndrome)." },
    refs: [
      { book: "williams", text: "The 4 g loading dose is safe regardless of renal function.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1627", pdf_page: 1627, quote: "The initial 4-g loading dose of magnesium sulfate can be safely administered regardless of renal function." },
      { book: "williams", text: "Maintenance doses become excessive when glomerular filtration falls.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1627", pdf_page: 1627, quote: "the dosages described will become excessive if glomerular filtration is substantially decreased" },
      { book: "gabbe", text: "Renal impairment makes serum magnesium rise quickly.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 38 Hypertensive Disorders of Pregnancy, p. 733", pdf_page: 900, quote: "if renal function is impaired, serum magnesium levels will increase quickly" },
      { book: "gabbe", text: "Magnesium sulfate in normal doses is compatible with breastfeeding.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 134", pdf_page: 167, quote: "Patients may be reassured that in normal doses, carbamazepine, phenytoin, magnesium sulfate" }
    ],
    sources: ["WHO Managing Complications in Pregnancy and Childbirth 2017", "WHO Model Formulary 2008", "BNF"]
  },

  "adrenaline": {
    pregnancy: { level: "safe", text: "Do not withhold in anaphylaxis or cardiac arrest: the mother's survival protects the baby. Outside emergencies, high doses can reduce blood flow to the uterus." },
    breastfeeding: { level: "safe", text: "Compatible. Very short-acting and not absorbed from the baby's gut." },
    renal: { level: "none", text: "No dose change; titrate to effect." },
    hepatic: { level: "none", text: "No dose change; titrate to effect." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF", "Resuscitation Council UK anaphylaxis guideline"]
  },

  "noradrenaline": {
    pregnancy: { level: "caution", text: "Use when needed to treat maternal shock after fluid resuscitation; do not withhold. It can reduce uterine blood flow, so monitor the fetus and use the lowest effective dose." },
    breastfeeding: { level: "safe", text: "Compatible. Very short-acting and not absorbed from the baby's gut." },
    renal: { level: "none", text: "No dose change; titrate to blood pressure and urine output." },
    hepatic: { level: "none", text: "No dose change; titrate to effect." },
    refs: [],
    sources: ["BNF", "Surviving Sepsis Campaign 2021"]
  },

  "dopamine": {
    pregnancy: { level: "caution", text: "Use for maternal shock when noradrenaline is not available; do not withhold. May reduce uterine blood flow; monitor the fetus." },
    breastfeeding: { level: "caution", text: "Short courses are compatible, but dopamine lowers prolactin and can reduce milk supply. Encourage expressing once the mother is stable." },
    renal: { level: "none", text: "No dose change. Low-dose ('renal dose') dopamine does not protect the kidneys and should not be used for that purpose." },
    hepatic: { level: "none", text: "No dose change; titrate to effect." },
    refs: [],
    sources: ["BNF", "LactMed"]
  },

  "insulin-soluble": {
    pregnancy: { level: "safe", text: "The preferred treatment for diabetes and hyperglycaemia in pregnancy. Requirements rise in later pregnancy and fall sharply after delivery of the placenta: reduce the dose after birth and check glucose often." },
    breastfeeding: { level: "safe", text: "Compatible. Breastfeeding mothers may need less insulin; watch for hypoglycaemia." },
    renal: {
      level: "adjust",
      text: "The kidney clears insulin. With kidney impairment the same dose lasts longer and hypoglycaemia is more likely. Check glucose more often and reduce doses.",
      bands: [
        { below: 50, text: "CrCl 10 to 50: insulin needs are often about 25% lower. Reduce the dose and check capillary glucose at least every 1 to 2 h on an infusion." },
        { below: 10, text: "CrCl under 10: insulin needs are often about 50% lower. Start with half the usual dose, titrate to glucose, and check glucose hourly on an infusion." }
      ]
    },
    hepatic: { level: "adjust", text: "Requirements can fall (less glucose production by the liver) or rise (insulin resistance). Titrate to frequent glucose checks; hypoglycaemia is a particular risk in liver failure." },
    refs: [
      { book: "harrison", text: "Hypoglycaemia in kidney failure is partly caused by reduced insulin clearance.", ref: "Harrison 22nd ed. 2025, ch. 418 Hypoglycemia, p. 3234", pdf_page: 3277, quote: "hypoglycemia in patients with renal failure is also caused by the reduced clearance of insulin" }
    ],
    sources: ["BNF", "The Renal Drug Handbook"]
  },

  "potassium-chloride": {
    pregnancy: { level: "safe", text: "Safe when used to correct a low potassium. The same infusion limits apply." },
    breastfeeding: { level: "safe", text: "Compatible." },
    renal: {
      level: "adjust",
      text: "Potassium is excreted by the kidneys. In kidney impairment or low urine output, replacement can quickly cause dangerous hyperkalaemia and cardiac arrest. Give only for a measured low potassium, and recheck the level before each further dose.",
      bands: [
        { below: 50, text: "CrCl under 50: replace only for a measured low potassium. Use smaller amounts and about half the usual infusion rate, and recheck serum potassium before giving more." },
        { below: 10, text: "CrCl under 10, or urine output very low: avoid potassium unless serum potassium is measured low. If essential, give small amounts slowly with ECG monitoring and repeat potassium measurement. Do not add potassium to maintenance fluids." }
      ]
    },
    hepatic: { level: "none", text: "No dose change. Correcting low potassium is important in cirrhosis because hypokalaemia can precipitate hepatic encephalopathy." },
    refs: [
      { book: "harrison", text: "Potassium supplements are contraindicated with hyperkalaemia or advanced kidney disease.", ref: "Harrison 22nd ed. 2025, ch. 288 Hypertension, p. 2137", pdf_page: 2180, quote: "Potassium supplementation is contraindicated in patients with hyperkalemia or advanced kidney disease" }
    ],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "salbutamol": {
    pregnancy: { level: "safe", text: "Use normally for asthma. Poorly controlled asthma is a greater risk to the baby than the medicine. High or IV doses can cause maternal tachycardia and high blood glucose." },
    breastfeeding: { level: "safe", text: "Compatible. Inhaled doses give negligible amounts in milk." },
    renal: { level: "none", text: "No dose change for inhaled or nebulised use." },
    hepatic: { level: "none", text: "No dose change for inhaled or nebulised use." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF", "GINA 2024"]
  },

  "aminophylline": {
    pregnancy: { level: "caution", text: "Can be used for severe asthma when first-line treatment fails. Clearance falls in the third trimester, so levels can rise; use levels if available. Near delivery it can cause neonatal jitteriness, tachycardia and vomiting." },
    breastfeeding: { level: "caution", text: "Passes into milk. Generally acceptable, but watch the baby for irritability, poor sleep and poor feeding, especially in newborns." },
    renal: { level: "none", text: "No dose change for kidney function in adults (cleared by the liver). Monitor levels if available." },
    hepatic: {
      level: "adjust",
      text: "Cleared by the liver. In cirrhosis, severe heart failure or shock, levels rise and toxicity (vomiting, tachycardia, arrhythmia, seizures) is likely. Reduce the maintenance dose (often by about half), measure theophylline levels, and stop if signs of toxicity appear."
    },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "gentamicin": {
    pregnancy: { level: "caution", text: "Use when clearly needed (for example maternal sepsis, pyelonephritis, chorioamnionitis). No birth defects have been shown, but there is a theoretical risk of fetal ear damage. Keep courses short and monitor levels." },
    breastfeeding: { level: "safe", text: "Compatible. Small amounts reach the baby but are not expected to cause harm. Watch for diarrhoea or thrush." },
    renal: {
      level: "adjust",
      text: "Cleared by the kidneys and toxic to kidney and ear. Measure creatinine before starting and every 2 to 3 days. For once-daily dosing keep the dose in mg/kg but extend the interval; aim for a trough level under 1 mg/L before the next dose. Avoid combining with furosemide.",
      bands: [
        { below: 60, text: "CrCl 40 to 60: give the usual mg/kg dose every 36 h. Check a trough level before the next dose if available (under 1 mg/L)." },
        { below: 40, text: "CrCl 20 to 40: give the usual mg/kg dose every 48 h. Levels are strongly advised." },
        { below: 20, text: "CrCl under 20: avoid if an alternative antibiotic exists. If essential, give one dose and repeat only when the level is under 1 mg/L; get pharmacist advice." }
      ]
    },
    hepatic: { level: "none", text: "No dose change. Patients with cirrhosis are at higher risk of kidney injury: monitor creatinine closely." },
    refs: [
      { book: "williams", text: "No fetal harm or birth defects have been shown with prenatal aminoglycoside exposure.", ref: "Williams Obstetrics 25th ed. 2018, ch. 12 Teratology, Teratogens, and Fetotoxic Agents, pdf p. 534", pdf_page: 534, quote: "Despite theoretical concern for potential fetal toxicity, no adverse effects have been demonstrated" },
      { book: "gabbe", text: "Ototoxicity is the only fetal effect associated with aminoglycosides.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 130", pdf_page: 163, quote: "No known teratogenic effect other than ototoxicity has been associated with aminoglycosides" },
      { book: "gabbe", text: "Magnesium sulfate and gentamicin together can worsen neuromuscular weakness in the newborn.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 130", pdf_page: 163, quote: "Potentiation of magnesium sulfate" },
      { book: "gabbe", text: "Gentamicin reaches breast milk in low levels not expected to cause clinical effects.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 135", pdf_page: 168, quote: "The low levels detected would not be expected to cause clinical effects." },
      { book: "harrison", text: "Ear damage can largely be prevented by monitoring peak and trough levels.", ref: "Harrison 22nd ed. 2025, ch. 36 Disorders of Hearing, p. 251", pdf_page: 294, quote: "can largely be prevented by careful monitoring of serum peak and trough levels" },
      { book: "harrison", text: "All aminoglycosides are nephrotoxic and ototoxic.", ref: "Harrison 22nd ed. 2025, ch. 149 Treatment and Prophylaxis of Bacterial Infections, p. 1177", pdf_page: 1220, quote: "All aminoglycosides can cause nephrotoxicity and ototoxicity." }
    ],
    sources: ["WHO Model Formulary 2008", "BNF", "Hartford extended-interval aminoglycoside nomogram"]
  },

  "ceftriaxone": {
    pregnancy: { level: "safe", text: "Used routinely in pregnancy when indicated." },
    breastfeeding: { level: "safe", text: "Compatible. Only trace amounts in milk; watch the baby for diarrhoea or thrush." },
    renal: {
      level: "adjust",
      text: "No change in mild or moderate kidney impairment (also cleared in bile).",
      bands: [
        { below: 10, text: "CrCl under 10: maximum 2 g per day (meningitis doses need pharmacist advice). If liver function is also poor, the 2 g daily maximum is essential." }
      ]
    },
    hepatic: { level: "none", text: "No change for liver impairment alone. If severe liver and severe kidney impairment occur together, give no more than 2 g per day." },
    refs: [
      { book: "gabbe", text: "Cephalosporins appear only in trace amounts in breast milk.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 135", pdf_page: 168, quote: "Cephalosporins appear only in trace amounts in milk." }
    ],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "artesunate": {
    pregnancy: { level: "safe", text: "IV or IM artesunate is the first-line treatment for severe malaria in all trimesters (WHO 2023). Never delay it because of pregnancy. Check glucose: severe malaria in pregnancy often causes hypoglycaemia." },
    breastfeeding: { level: "safe", text: "Compatible. Continue breastfeeding." },
    renal: { level: "none", text: "No dose change. Acute kidney injury is common in severe malaria: monitor urine output and creatinine." },
    hepatic: { level: "none", text: "No dose change." },
    refs: [
      { book: "gabbe", text: "Severe malaria in pregnancy is treated as in non-pregnant patients, with IV artesunate first-line.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 58 Bacterial and Parasitic Infections in Pregnancy, p. 1133", pdf_page: 1385, quote: "Management is the same as for nonpregnant individuals, with IV artesunate being the first-line therapy." },
      { book: "williams", text: "A large trial of artemisinin drugs in pregnant women found no serious maternal or perinatal harm.", ref: "Williams Obstetrics 25th ed. 2018, ch. 64 Infectious Diseases, pdf p. 2722", pdf_page: 2722, quote: "reported no serious maternal or perinatal adverse effects" }
    ],
    sources: ["WHO Guidelines for Malaria 2023", "WHO Model Formulary 2008"]
  },

  "quinine": {
    pregnancy: { level: "safe", text: "Can be used in all trimesters when artesunate is not available. Quinine stimulates insulin release: hypoglycaemia is common and can be severe in pregnancy, so check glucose at least 4-hourly." },
    breastfeeding: { level: "safe", text: "Compatible. Avoid if the baby has G6PD deficiency." },
    renal: {
      level: "adjust",
      text: "Give the normal loading dose and normal doses for the first 48 h. If the patient is still seriously ill or in acute kidney failure after 48 h, reduce maintenance doses by one-third to one-half (for example 10 mg salt/kg every 12 h). Monitor glucose and ECG (QT)."
    },
    hepatic: { level: "adjust", text: "Severe liver impairment: same approach as kidney failure. Normal doses for 48 h, then reduce maintenance by one-third if not improving. Monitor glucose." },
    refs: [
      { book: "harrison", text: "Reduce quinine maintenance by 30 to 50% if the patient remains seriously ill or in renal failure after 2 days.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1772", pdf_page: 1815, quote: "maintenance doses of quinine should be reduced by 30–50% to prevent toxic accumulation of the drug" }
    ],
    sources: ["WHO Guidelines for Malaria 2023", "WHO Model Formulary 2008", "BNF"]
  },

  "dextrose": {
    pregnancy: { level: "safe", text: "Safe. Treat maternal hypoglycaemia promptly. Avoid large boluses of glucose in labour, which can cause neonatal hypoglycaemia." },
    breastfeeding: { level: "safe", text: "Compatible." },
    renal: { level: "none", text: "No dose change. In kidney failure avoid large volumes of 5% dextrose (fluid overload and low sodium)." },
    hepatic: { level: "none", text: "No dose change. Patients with liver failure are prone to hypoglycaemia and may need continuous glucose infusion." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "diazepam": {
    pregnancy: { level: "caution", text: "Do not withhold to stop a prolonged seizure. Regular or repeated use, especially near delivery, can cause a floppy, cold, sleepy newborn with breathing problems; have neonatal resuscitation ready." },
    breastfeeding: { level: "caution", text: "Long-acting; it can build up in the baby. A single dose is acceptable. After repeated doses watch the baby for sleepiness and poor feeding; a short-acting benzodiazepine is preferred." },
    renal: {
      level: "adjust",
      text: "Usual single doses to stop seizures can be given. With repeated doses in kidney failure, sedation lasts longer.",
      bands: [
        { below: 30, text: "CrCl under 30: give the smallest effective dose, avoid regular repeated doses, and watch sedation and breathing closely." }
      ]
    },
    hepatic: { level: "adjust", text: "Cleared by the liver; accumulates and can precipitate hepatic encephalopathy. Give the smallest effective dose and avoid repeated doses. In a seizure emergency, still treat the seizure." },
    refs: [
      { book: "gabbe", text: "Chronic benzodiazepine use is generally not recommended in pregnancy.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 125", pdf_page: 158, quote: "Generally, the chronic use of benzodiazepines is not recommended in pregnancy." },
      { book: "gabbe", text: "If benzodiazepines are used while breastfeeding, short-acting agents are preferred.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 8 Substance Use Disorder in Pregnancy, p. 149", pdf_page: 190, quote: "preference should be given to using short-acting rather than long-acting medications" }
    ],
    sources: ["WHO Model Formulary 2008", "WHO Managing Complications in Pregnancy and Childbirth 2017", "BNF"]
  },

  "phenobarbital": {
    pregnancy: { level: "caution", text: "Do not withhold to control status epilepticus. Long-term first-trimester use raises the risk of birth defects. The newborn may be sleepy or withdraw, and has a higher bleeding risk: give the baby vitamin K at birth." },
    breastfeeding: { level: "caution", text: "Passes into milk and can build up in the baby. Watch for sleepiness, poor feeding and poor weight gain; seek advice for long-term use." },
    renal: {
      level: "adjust",
      text: "Partly excreted by the kidneys. Loading doses are unchanged.",
      bands: [
        { below: 10, text: "CrCl under 10: reduce the maintenance dose and lengthen the interval; watch for over-sedation and measure levels if available." }
      ]
    },
    hepatic: { level: "adjust", text: "Reduce the dose in liver disease; it can precipitate hepatic coma. Avoid in severe liver failure if an alternative exists." },
    refs: [
      { book: "williams", text: "Malformation rates were twofold higher with phenytoin and threefold higher with phenobarbital exposure.", ref: "Williams Obstetrics 25th ed. 2018, ch. 12 Teratology, Teratogens, and Fetotoxic Agents, pdf p. 530", pdf_page: 530, quote: "threefold higher among those exposed to phenobarbital" }
    ],
    sources: ["WHO Model Formulary 2008", "BNF", "The Renal Drug Handbook"]
  },

  "ketamine": {
    pregnancy: { level: "caution", text: "Used for anaesthesia including caesarean section. Doses above about 1 mg/kg increase uterine tone and can depress the newborn; have neonatal resuscitation ready." },
    breastfeeding: { level: "safe", text: "After a single anaesthetic or sedation dose, breastfeeding can resume once the mother is awake and alert." },
    renal: { level: "none", text: "No dose change." },
    hepatic: { level: "adjust", text: "Metabolised by the liver: in severe liver disease use lower doses and titrate. Repeated or prolonged use can cause liver injury." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "morphine": {
    pregnancy: { level: "caution", text: "Use for severe pain when needed. Close to delivery it can depress the newborn's breathing: have naloxone and neonatal resuscitation ready. Regular use in pregnancy causes neonatal withdrawal." },
    breastfeeding: { level: "safe", text: "Short-term use is compatible; the baby receives about 1 to 2% of the maternal dose. Watch the baby for sleepiness or poor feeding. Do not use codeine instead." },
    renal: {
      level: "adjust",
      text: "Active metabolites are excreted by the kidneys and accumulate, causing prolonged sedation and respiratory depression. Use smaller doses at longer intervals and titrate to effect.",
      bands: [
        { below: 50, text: "CrCl 20 to 50: give about 75% of the usual dose, lengthen the interval, and titrate. Monitor sedation and respiratory rate." },
        { below: 20, text: "CrCl under 20: give about 50% of the usual dose at longer intervals, avoid continuous infusions where possible, and keep naloxone at the bedside. Consider an alternative opioid if available." }
      ]
    },
    hepatic: { level: "adjust", text: "Reduce the dose and extend the interval. Oral bioavailability roughly doubles in cirrhosis. Avoid in hepatic encephalopathy, where it can precipitate coma." },
    refs: [
      { book: "schwartz", text: "Morphine has renally excreted active metabolites: use with caution or avoid in renal insufficiency.", ref: "Schwartz's Principles of Surgery 11th ed. 2019, ch. 46 Anesthesia for Surgical Patients, p. 2031", pdf_page: 2058, quote: "Morphine and meperidine have active metabolites that are renally excreted" },
      { book: "harrison", text: "Oral bioavailability of morphine, midazolam and nifedipine nearly doubles in cirrhosis; reduce oral doses.", ref: "Harrison 22nd ed. 2025, ch. 71 Principles of Clinical Pharmacology, p. 488", pdf_page: 531, quote: "is almost doubled in patients with cirrhosis, compared to those with normal liver function" },
      { book: "gabbe", text: "Codeine, morphine and meperidine reach breast milk at about 1 to 2% of the maternal dose.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 135", pdf_page: 168, quote: "the dose detectable in breast milk is approximately 1% to 2% of the mother's dose" }
    ],
    sources: ["WHO Model Formulary 2008", "BNF", "The Renal Drug Handbook"]
  },

  "heparin": {
    pregnancy: { level: "safe", text: "Unfractionated heparin and enoxaparin do not cross the placenta and are the anticoagulants of choice in pregnancy. Plan neuraxial anaesthesia timing around doses." },
    breastfeeding: { level: "safe", text: "Compatible. Heparins do not enter milk in active form and are not absorbed by the baby." },
    renal: {
      level: "adjust",
      text: "Unfractionated heparin does not depend on the kidneys and is preferred in severe kidney failure (adjust by aPTT). Enoxaparin is cleared by the kidneys and accumulates, raising bleeding risk.",
      bands: [
        { below: 30, text: "CrCl under 30: enoxaparin treatment dose 1 mg/kg once daily (not twice daily); prophylaxis 20 to 30 mg once daily according to local product guidance. Measure anti-Xa if available, or switch to unfractionated heparin with aPTT monitoring." }
      ]
    },
    hepatic: { level: "none", text: "No dose change, but bleeding risk is higher in severe liver disease (low clotting factors, low platelets, varices). Monitor aPTT and platelets closely." },
    refs: [
      { book: "gabbe", text: "Heparin and enoxaparin are large molecules that do not cross the placenta.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 126", pdf_page: 159, quote: "The alternative drugs, heparin or enoxaparin, do not cross the placenta because they are large molecules." },
      { book: "williams", text: "None of the heparins cross the placenta.", ref: "Williams Obstetrics 25th ed. 2018, ch. 52 Thromboembolic Disorders, pdf p. 2244", pdf_page: 2244, quote: "None of these heparins cross the placenta" },
      { book: "williams", text: "LMWHs are safe during breastfeeding.", ref: "Williams Obstetrics 25th ed. 2018, ch. 52 Thromboembolic Disorders, pdf p. 2246", pdf_page: 2246, quote: "LMWHs are also safe during breastfeeding" },
      { book: "gabbe", text: "Heparin does not pass into milk and is not active orally.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 135", pdf_page: 168, quote: "Heparin does not cross into milk and is not active orally." },
      { book: "harrison", text: "LMWH is cleared almost only by the kidneys and accumulates in renal insufficiency.", ref: "Harrison 22nd ed. 2025, ch. 123 Antiplatelet, Anticoagulant, and Fibrinolytic Drugs, p. 949", pdf_page: 992, quote: "LMWH is cleared almost exclusively by the kidneys, and the drug can accumulate in patients with renal insufficiency." },
      { book: "harrison", text: "Monitoring is advisable when creatinine clearance is 30 mL/min or less.", ref: "Harrison 22nd ed. 2025, ch. 123 Antiplatelet, Anticoagulant, and Fibrinolytic Drugs, p. 949", pdf_page: 992, quote: "LMWH monitoring in patients with a creatinine clearance ≤30 mL/min is advisable" }
    ],
    sources: ["WHO Model Formulary 2008", "BNF", "RCOG Green-top Guideline 37a"]
  },

  "hydralazine": {
    pregnancy: { level: "safe", text: "A first-line IV drug for severe hypertension in pregnancy (WHO). Give small repeated doses to avoid a sudden fall in BP, which can harm the fetus." },
    breastfeeding: { level: "safe", text: "Compatible." },
    renal: {
      level: "adjust",
      text: "The effect can last longer in kidney impairment. Doses are titrated to blood pressure.",
      bands: [
        { below: 30, text: "CrCl under 30: use the smaller bolus (5 mg IV) and wait longer before repeating; recheck BP before each dose." }
      ]
    },
    hepatic: { level: "adjust", text: "Reduce the dose or lengthen the interval in severe liver impairment; titrate to BP." },
    refs: [
      { book: "gabbe", text: "Hydralazine is used frequently in pregnancy with no teratogenic effect observed.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 127", pdf_page: 160, quote: "is used frequently in pregnancy, and no teratogenic effect has been observed" }
    ],
    sources: ["WHO Managing Complications in Pregnancy and Childbirth 2017", "WHO Model Formulary 2008", "BNF"]
  },

  "labetalol": {
    pregnancy: { level: "safe", text: "A first-line drug for severe hypertension in pregnancy. Observe the newborn for slow heart rate and low blood glucose for 24 to 48 h. Avoid in asthma." },
    breastfeeding: { level: "safe", text: "Compatible. Watch preterm or small babies for slow heart rate and low glucose." },
    renal: { level: "none", text: "No dose change; titrate to blood pressure." },
    hepatic: { level: "adjust", text: "Metabolised by the liver: reduce oral doses. Rare severe liver injury has occurred: stop if jaundice or rising liver enzymes. BNF advises avoiding in hepatic impairment; short-term IV use to control BP in HELLP syndrome is common practice, so confirm with local protocol." },
    refs: [],
    sources: ["WHO Managing Complications in Pregnancy and Childbirth 2017", "BNF", "NICE NG133"]
  },

  "tranexamic-acid": {
    pregnancy: { level: "safe", text: "Give 1 g IV within 3 hours of birth for postpartum haemorrhage (WHO). Also used for antepartum bleeding. Avoid with active thrombosis." },
    breastfeeding: { level: "safe", text: "Compatible. Only small amounts pass into milk." },
    renal: {
      level: "adjust",
      text: "Excreted by the kidneys. A single emergency 1 g dose (PPH, trauma) is given at the normal dose whatever the kidney function; repeat or regular doses must be reduced. Guidance is based on serum creatinine; confirm with pharmacist.",
      bands: [
        { below: 50, text: "Mild to moderate impairment (serum creatinine about 120 to 250 micromol/L): emergency 1 g dose as usual. For repeat dosing give 10 mg/kg IV every 12 h." },
        { below: 25, text: "Moderate to severe impairment (serum creatinine about 250 to 500 micromol/L): emergency 1 g dose as usual. For repeat dosing give 10 mg/kg IV every 24 h." },
        { below: 10, text: "Severe impairment (serum creatinine over 500 micromol/L): emergency 1 g dose as usual. For repeat dosing give 5 mg/kg IV every 24 h (or 10 mg/kg every 48 h)." }
      ]
    },
    hepatic: { level: "none", text: "No dose change." },
    refs: [
      { book: "williams", text: "Tranexamic acid use has been associated with renal cortical necrosis.", ref: "Williams Obstetrics 25th ed. 2018, ch. 41 Obstetrical Hemorrhage, pdf p. 1748", pdf_page: 1748, quote: "Its use has been associated with a higher incidence of renal cortical necrosis" },
      { book: "gabbe", text: "For PPH it must be given within 3 hours of bleeding onset to be effective.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 20 Antepartum and Postpartum Hemorrhage, p. 406", pdf_page: 504, quote: "treatment must occur within 3 hours of bleeding onset" }
    ],
    sources: ["WHO recommendation on tranexamic acid for PPH 2017", "BNF", "Cyklokapron product information"]
  },

  "ringers-lactate": {
    pregnancy: { level: "safe", text: "Safe. Reassess after every bolus; women with pre-eclampsia easily develop pulmonary oedema, so restrict fluids in pre-eclampsia." },
    breastfeeding: { level: "safe", text: "Compatible." },
    renal: { level: "adjust", text: "Contains potassium (about 4 to 5 mmol/L). In oliguric or anuric kidney failure give only to correct hypovolaemia, reassess after each bolus for fluid overload, and avoid large maintenance volumes." },
    hepatic: { level: "none", text: "No dose change. In severe liver failure lactate is cleared slowly: monitor lactate and consider 0.9% saline for large volumes." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "WHO Pocket Book of Hospital Care for Children 2013", "BNF"]
  },

  "calcium-gluconate": {
    pregnancy: { level: "safe", text: "Safe. The antidote for magnesium toxicity; keep at the bedside of every woman receiving magnesium sulfate." },
    breastfeeding: { level: "safe", text: "Compatible." },
    renal: { level: "none", text: "Emergency doses need no change. With repeated doses in kidney failure, monitor serum calcium to avoid hypercalcaemia." },
    hepatic: { level: "none", text: "No dose change." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "misoprostol": {
    pregnancy: { level: "avoid", text: "Contraindicated in a pregnancy that is continuing: it causes miscarriage, uterine rupture and birth defects. Never give for PPH before the baby is delivered. Use only under specific protocols for induction, miscarriage or fetal death, and avoid for induction after a previous caesarean." },
    breastfeeding: { level: "safe", text: "Compatible after birth. It may cause diarrhoea in the baby; no interruption needed." },
    renal: { level: "none", text: "No dose change." },
    hepatic: { level: "none", text: "No dose change." },
    refs: [
      { book: "williams", text: "Misoprostol is a teratogen.", ref: "Williams Obstetrics 25th ed. 2018, ch. 18 Abortion, pdf p. 790", pdf_page: 790, quote: "Methotrexate and misoprostol are both teratogens." },
      { book: "williams", text: "Misoprostol is contraindicated for labour induction in women with a prior caesarean.", ref: "Williams Obstetrics 25th ed. 2018, ch. 31 Prior Cesarean Delivery, pdf p. 1317", pdf_page: 1317, quote: "most consider misoprostol to be contraindicated" }
    ],
    sources: ["WHO recommendations: uterotonics for PPH 2018", "WHO Managing Complications in Pregnancy and Childbirth 2017", "FIGO misoprostol dosage chart 2023"]
  },

  "ergometrine": {
    pregnancy: { level: "avoid", text: "Never give before the baby is delivered (and not before the second twin). Contraindicated in hypertension and pre-eclampsia: it can cause severe hypertension, stroke and seizures." },
    breastfeeding: { level: "safe", text: "A few doses for postpartum haemorrhage do not require stopping breastfeeding. Prolonged use can reduce milk supply." },
    renal: {
      level: "adjust",
      text: "Use with caution in kidney impairment.",
      bands: [
        { below: 30, text: "Severe kidney impairment: avoid if possible; use oxytocin or misoprostol instead." }
      ]
    },
    hepatic: { level: "adjust", text: "Use with caution in liver impairment; avoid in severe liver impairment and use oxytocin or misoprostol instead." },
    refs: [
      { book: "williams", text: "Methylergonovine is relatively contraindicated in hypertensive women.", ref: "Williams Obstetrics 25th ed. 2018, ch. 27 Vaginal Delivery, pdf p. 1157", pdf_page: 1157, quote: "Methylergonovine is relatively contraindicated in the hypertensive woman." },
      { book: "williams", text: "Ergot agents, especially IV, can cause dangerous hypertension in pre-eclampsia.", ref: "Williams Obstetrics 25th ed. 2018, ch. 41 Obstetrical Hemorrhage, pdf p. 1678", pdf_page: 1678, quote: "ergot agents, especially given intravenously, may cause dangerous hypertension" },
      { book: "gabbe", text: "An ergot alkaloid for uterine atony does not contraindicate lactation.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 134", pdf_page: 167, quote: "Administration of an ergot alkaloid for the treatment of uterine atony does not contraindicate lactation." }
    ],
    sources: ["WHO Managing Complications in Pregnancy and Childbirth 2017", "WHO Model Formulary 2008", "BNF"]
  },

  "dexamethasone": {
    pregnancy: { level: "safe", text: "Antenatal dexamethasone is recommended for women at risk of preterm birth from 24 to 34 weeks when gestational age is reliable, delivery is not imminent, there is no maternal infection, and adequate newborn care is available (WHO 2022). Other long courses: weigh benefit, raises glucose." },
    breastfeeding: { level: "safe", text: "Compatible for short courses." },
    renal: { level: "none", text: "No dose change. Watch for fluid retention." },
    hepatic: { level: "none", text: "No dose change." },
    refs: [
      { book: "gabbe", text: "Betamethasone and dexamethasone are preferred for fetal lung maturity because the placenta inactivates them minimally.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 128", pdf_page: 161, quote: "betamethasone (Celestone) and dexamethasone (Decadron) are preferred because these are minimally inactivated by the placenta" }
    ],
    sources: ["WHO recommendations on antenatal corticosteroids 2022", "BNF"]
  },

  "nifedipine": {
    pregnancy: { level: "safe", text: "Oral immediate-release nifedipine is a first-line option for severe hypertension in pregnancy and a tocolytic. Monitor BP closely when given with magnesium sulfate." },
    breastfeeding: { level: "safe", text: "Compatible. Less than 5% of the maternal dose reaches milk." },
    renal: { level: "none", text: "No dose change; titrate to BP." },
    hepatic: { level: "adjust", text: "Oral bioavailability roughly doubles in cirrhosis: use lower doses and titrate to BP." },
    refs: [
      { book: "gabbe", text: "Calcium channel blockers have been widely used in pregnancy without evidence of teratogenicity.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 127", pdf_page: 160, quote: "have been widely used for chronic hypertension in pregnancy without evidence of teratogenicity" },
      { book: "gabbe", text: "Nifedipine reaches breast milk at under 5% of the maternal dose.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 135", pdf_page: 168, quote: "Nifedipine is excreted into breast milk at a concentration of less than 5% of the maternal dose" },
      { book: "harrison", text: "Oral bioavailability of high first-pass drugs including nifedipine nearly doubles in cirrhosis.", ref: "Harrison 22nd ed. 2025, ch. 71 Principles of Clinical Pharmacology, p. 488", pdf_page: 531, quote: "the size of the oral dose of such drugs should be reduced in this setting" }
    ],
    sources: ["WHO Managing Complications in Pregnancy and Childbirth 2017", "BNF"]
  },

  "hydrocortisone": {
    pregnancy: { level: "safe", text: "Do not withhold in adrenal crisis, septic shock or severe asthma. Much of it is inactivated by the placenta." },
    breastfeeding: { level: "safe", text: "Compatible." },
    renal: { level: "none", text: "No dose change. Watch for fluid retention and high BP." },
    hepatic: { level: "none", text: "No dose change." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "naloxone": {
    pregnancy: { level: "safe", text: "Do not withhold in opioid overdose. In an opioid-dependent mother, use small titrated doses: sudden withdrawal can cause fetal distress." },
    breastfeeding: { level: "safe", text: "Compatible. Poorly absorbed by mouth." },
    renal: { level: "none", text: "No dose change; titrate to breathing." },
    hepatic: { level: "none", text: "No dose change; titrate to breathing." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "atropine": {
    pregnancy: { level: "safe", text: "Do not withhold in organophosphate poisoning or symptomatic bradycardia. It crosses the placenta and can cause fetal tachycardia." },
    breastfeeding: { level: "safe", text: "Single or short courses are compatible. Repeated doses may reduce milk supply; watch the baby for dry mouth, constipation or fast heart rate." },
    renal: { level: "none", text: "No dose change; titrate to effect." },
    hepatic: { level: "none", text: "No dose change; titrate to effect." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "amiodarone": {
    pregnancy: { level: "caution", text: "Do not withhold in cardiac arrest or life-threatening arrhythmia. Otherwise avoid: it contains iodine and can cause fetal hypothyroidism, goitre and bradycardia. Check the newborn's thyroid function after exposure." },
    breastfeeding: { level: "avoid", text: "Avoid breastfeeding during ongoing treatment: large amounts of iodine and drug reach milk and it has a very long half-life (infant hypothyroidism). After a single resuscitation dose, seek advice." },
    renal: { level: "none", text: "No dose change." },
    hepatic: { level: "adjust", text: "Can cause hepatitis. Emergency IV doses may be given, but avoid long-term use in liver disease; check liver enzymes before and during treatment and stop if they rise above 3 times normal." },
    refs: [
      { book: "gabbe", text: "Amiodarone is of concern in breastfeeding because of infant hypothyroidism.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 134", pdf_page: 167, quote: "amiodarone (associated with hypothyroidism)" },
      { book: "williams", text: "In pregnancy IV amiodarone is reserved for life-threatening SVT when other therapies fail.", ref: "Williams Obstetrics 25th ed. 2018, ch. 49 Cardiovascular Disorders, pdf p. 2143", pdf_page: 2143, quote: "Intravenous amiodarone with potentially life-threatening SVT and when other therapies are ineffective or contraindicated" },
      { book: "harrison", text: "Amiodarone liver injury may persist for months because of its long half-life.", ref: "Harrison 22nd ed. 2025, ch. 351 Toxic and Drug-Induced Hepatitis, p. 2671", pdf_page: 2714, quote: "Because amiodarone has a long half-life, liver injury may persist for months after the drug is stopped." }
    ],
    sources: ["BNF", "LactMed"]
  },

  "furosemide": {
    pregnancy: { level: "caution", text: "Use for pulmonary oedema or heart failure. Do not use to treat oedema of normal pregnancy or pre-eclampsia (it reduces the already low plasma volume)." },
    breastfeeding: { level: "caution", text: "Short courses are compatible. High doses or prolonged use may reduce milk supply." },
    renal: {
      level: "adjust",
      text: "Still works in kidney impairment but higher doses are needed. It does not help in anuria. Monitor potassium, sodium and creatinine.",
      bands: [
        { below: 30, text: "CrCl under 30: usual doses may not work; doses can be increased stepwise under senior advice. Give large IV doses no faster than 4 mg per minute to avoid deafness, and avoid combining with gentamicin." }
      ]
    },
    hepatic: { level: "adjust", text: "In cirrhosis low potassium and over-diuresis can precipitate hepatic encephalopathy and kidney injury. Use the lowest effective dose and monitor potassium. Do not use in hepatic pre-coma or coma." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "digoxin": {
    pregnancy: { level: "safe", text: "Used for maternal and fetal arrhythmias when indicated. Pregnancy changes blood levels; check levels and potassium." },
    breastfeeding: { level: "safe", text: "Compatible. Amounts in milk are too small to affect the baby." },
    renal: {
      level: "adjust",
      text: "Excreted by the kidneys; toxicity is common when the dose is not reduced. Check potassium and creatinine, and measure digoxin level (at least 6 h after a dose) if available. Watch for nausea, visual changes, bradycardia.",
      bands: [
        { below: 50, text: "CrCl under 50: reduce the maintenance dose to about half (for example 0.125 mg once daily). Check digoxin level and potassium after 5 to 7 days." },
        { below: 10, text: "CrCl under 10: maintenance 0.0625 mg once daily or 0.125 mg on alternate days; consider a reduced loading dose. Measure levels; get pharmacist or senior advice." }
      ]
    },
    hepatic: { level: "none", text: "No dose change." },
    refs: [
      { book: "harrison", text: "Drugs excreted by the kidneys, such as digoxin, must be reduced in renal dysfunction to avoid toxicity.", ref: "Harrison 22nd ed. 2025, ch. 71 Principles of Clinical Pharmacology, p. 488", pdf_page: 531, quote: "drug dosages must be reduced in patients with renal dysfunction to avoid toxicity. Digoxin is one example" }
    ],
    sources: ["WHO Model Formulary 2008", "BNF", "The Renal Drug Handbook"]
  },

  "ampicillin": {
    pregnancy: { level: "safe", text: "Used routinely in pregnancy (for example GBS prophylaxis, chorioamnionitis, maternal sepsis)." },
    breastfeeding: { level: "safe", text: "Compatible. Watch the baby for diarrhoea or thrush." },
    renal: {
      level: "adjust",
      text: "Excreted by the kidneys. High doses in kidney impairment can cause seizures and rashes are more common.",
      bands: [
        { below: 50, text: "CrCl 10 to 50: give the usual dose every 6 to 12 h (lengthen the interval rather than lowering the dose). For meningitis doses get pharmacist advice; watch for twitching or seizures." },
        { below: 10, text: "CrCl under 10: give the usual dose every 12 to 24 h. Avoid very high doses because of seizure risk." }
      ]
    },
    hepatic: { level: "none", text: "No dose change." },
    refs: [
      { book: "gabbe", text: "Penicillin derivatives, including ampicillin, are safe in nursing mothers.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 135", pdf_page: 168, quote: "Penicillin derivatives are safe in nursing mothers." }
    ],
    sources: ["WHO Model Formulary 2008", "BNF", "Sanford Guide renal dosing table"]
  },

  "benzylpenicillin": {
    pregnancy: { level: "safe", text: "Used routinely in pregnancy (for example syphilis, GBS prophylaxis)." },
    breastfeeding: { level: "safe", text: "Compatible." },
    renal: {
      level: "adjust",
      text: "Excreted by the kidneys. High doses in kidney impairment cause seizures (penicillin neurotoxicity) and a large potassium load.",
      bands: [
        { below: 50, text: "CrCl 10 to 50: reduce the total daily dose to about 75% (usual dose at a longer interval). Watch for twitching or seizures." },
        { below: 10, text: "CrCl under 10: reduce to 20 to 50% of the usual daily dose, and do not exceed 6 g (10 million units) per day. Monitor potassium and watch for seizures." }
      ]
    },
    hepatic: { level: "none", text: "No dose change." },
    refs: [
      { book: "harrison", text: "Penicillin can lower the seizure threshold.", ref: "Harrison 22nd ed. 2025, ch. 436 Seizures and Epilepsy, p. 3414", pdf_page: 3457, quote: "Penicillin, which can lower the seizure threshold in humans" },
      { book: "gabbe", text: "Penicillin derivatives are safe in nursing mothers.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 135", pdf_page: 168, quote: "With the usual therapeutic doses of penicillin or ampicillin, no adverse effects are noted in the infants." }
    ],
    sources: ["WHO Model Formulary 2008", "BNF", "Sanford Guide renal dosing table"]
  },

  "cloxacillin": {
    pregnancy: { level: "safe", text: "Used in pregnancy when indicated." },
    breastfeeding: { level: "safe", text: "Compatible. Watch the baby for diarrhoea or thrush." },
    renal: {
      level: "adjust",
      text: "No change in mild or moderate kidney impairment.",
      bands: [
        { below: 10, text: "CrCl under 10: reduce the dose (usual dose given less often); confirm with pharmacist." }
      ]
    },
    hepatic: { level: "adjust", text: "Can cause cholestatic jaundice, sometimes weeks after stopping (more likely over 50 years and courses over 2 weeks). Use with caution in liver disease, check liver tests on long courses, and do not use if there was previous jaundice with flucloxacillin." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "metronidazole": {
    pregnancy: { level: "caution", text: "Standard doses can be used when indicated at any stage; studies show no increase in birth defects. Avoid high-dose single-dose regimens (such as 2 g) in the first trimester if an alternative exists." },
    breastfeeding: { level: "caution", text: "Standard divided doses are usually acceptable; watch the baby for diarrhoea. After a single 2 g dose, consider stopping breastfeeding for 12 to 24 hours (express and discard)." },
    renal: { level: "none", text: "No dose change for kidney function." },
    hepatic: { level: "adjust", text: "Severe liver impairment or hepatic encephalopathy: reduce the total daily dose to one-third, given once daily." },
    refs: [
      { book: "harrison", text: "Most studies show no adverse effect of metronidazole in pregnancy on preterm birth or birth defects.", ref: "Harrison 22nd ed. 2025, ch. 141 Sexually Transmitted Infections: Overview and Clinical Approach, p. 1102", pdf_page: 1145, quote: "have shown no adverse effects of metronidazole use during pregnancy on preterm birth or birth defects" },
      { book: "gabbe", text: "Studies have not shown more birth defects after metronidazole in early or late pregnancy.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 130", pdf_page: 163, quote: "Studies have failed to show any increase in the incidence of congenital defects among the newborns of mothers treated with metronidazole" },
      { book: "gabbe", text: "Interrupting breastfeeding for 12 to 24 hours after a single dose gives negligible infant exposure.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 134", pdf_page: 167, quote: "interruption of lactation for 12 to 24 hours after single-dose therapy usually results in negligible exposure to the infant" }
    ],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "chloramphenicol": {
    pregnancy: { level: "caution", text: "Use only if no suitable alternative. Avoid near term and in labour: the newborn cannot clear it (grey baby syndrome)." },
    breastfeeding: { level: "avoid", text: "Avoid: it can cause bone marrow toxicity in the baby. Use an alternative antibiotic, or stop breastfeeding during treatment." },
    renal: {
      level: "adjust",
      text: "Marrow toxicity is dose-related. Monitor full blood count during treatment.",
      bands: [
        { below: 30, text: "Severe kidney impairment: avoid unless there is no alternative. If used, reduce the dose, monitor full blood count twice weekly, and measure levels if available." }
      ]
    },
    hepatic: { level: "adjust", text: "Avoid if possible: higher risk of bone marrow depression. If essential, reduce the dose, monitor full blood count and measure levels if available." },
    refs: [
      { book: "williams", text: "Chloramphenicol is avoided in late pregnancy because of grey baby syndrome.", ref: "Williams Obstetrics 25th ed. 2018, ch. 12 Teratology, Teratogens, and Fetotoxic Agents, pdf p. 534", pdf_page: 534, quote: "Chloramphenicol was subsequently avoided in late pregnancy due to theoretical concerns." },
      { book: "harrison", text: "Its use is limited by infrequent but severe bone marrow toxicity.", ref: "Harrison 22nd ed. 2025, ch. 150 Bacterial Resistance to Antimicrobial Agents, p. 1184", pdf_page: 1227, quote: "because of infrequent but potentially severe bone marrow toxicity" }
    ],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "paracetamol": {
    pregnancy: { level: "safe", text: "The preferred analgesic and antipyretic in pregnancy. Do not exceed the daily maximum." },
    breastfeeding: { level: "safe", text: "Compatible." },
    renal: {
      level: "adjust",
      text: "Normal doses in mild to moderate kidney impairment.",
      bands: [
        { below: 30, text: "CrCl under 30: give doses at least 6 hours apart (oral and IV)." }
      ]
    },
    hepatic: { level: "adjust", text: "Cirrhosis or chronic heavy alcohol use: maximum 2 g per day in adults. Malnutrition or adult weight under 50 kg: maximum 3 g per day (IV: 15 mg/kg per dose, no more than 60 mg/kg per day). Avoid in acute liver failure unless advised by a senior." },
    refs: [
      { book: "gabbe", text: "Acetaminophen shows no evidence of teratogenicity and is preferred in pregnancy.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 131", pdf_page: 164, quote: "acetaminophen is therefore preferred in pregnancy" },
      { book: "gabbe", text: "No harmful effects of acetaminophen have been noted in breastfed infants.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 135", pdf_page: 168, quote: "No harmful effects of acetaminophen (Tylenol, Datril) have been noted." },
      { book: "harrison", text: "In liver disease, up to 2 g per day generally causes no problems unless there is active alcohol use.", ref: "Harrison 22nd ed. 2025, ch. 355 Cirrhosis and Its Complications, p. 2710", pdf_page: 2753, quote: "if no more than 2 g of acetaminophen per day are consumed, there generally are no problems unless there is active alcohol use" },
      { book: "harrison", text: "In chronic alcohol use the toxic dose may be as low as 2 g.", ref: "Harrison 22nd ed. 2025, ch. 351 Toxic and Drug-Induced Hepatitis, p. 2670", pdf_page: 2713, quote: "in chronic alcoholics, the toxic dose of acetaminophen may be as low as 2 g" }
    ],
    sources: ["WHO Model Formulary 2008", "BNF", "BNF for Children"]
  },

  "lidocaine": {
    pregnancy: { level: "safe", text: "Local and regional anaesthesia is safe in pregnancy. Respect the maximum dose; toxicity can cause fetal bradycardia." },
    breastfeeding: { level: "safe", text: "Compatible." },
    renal: { level: "none", text: "No dose change." },
    hepatic: { level: "adjust", text: "Cleared by the liver. For IV infusion (antiarrhythmic) reduce the dose by about half in liver failure, heart failure or shock and watch for toxicity (numb lips, confusion, seizures). For infiltration use a lower total dose than the usual maximum." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "bupivacaine": {
    pregnancy: { level: "safe", text: "Spinal 0.5% heavy bupivacaine is standard for caesarean section. Pregnant women need a smaller spinal dose. Never use 0.75% for obstetric epidural." },
    breastfeeding: { level: "safe", text: "Compatible." },
    renal: { level: "none", text: "No dose change for a single spinal dose." },
    hepatic: { level: "adjust", text: "Single spinal doses need no change. For repeated doses or infusions in severe liver disease, reduce the dose. Check clotting and platelets first: coagulopathy may make neuraxial block unsafe." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "midazolam": {
    pregnancy: { level: "caution", text: "Do not withhold to stop a prolonged seizure. Repeated doses or infusions near delivery can cause neonatal sedation, low tone and breathing problems." },
    breastfeeding: { level: "caution", text: "A single dose (for example for a procedure or seizure) does not require stopping breastfeeding. After repeated doses or infusion, watch the baby for sleepiness." },
    renal: {
      level: "adjust",
      text: "Single doses can be given as usual. An active metabolite accumulates in kidney failure with repeated doses or infusions.",
      bands: [
        { below: 30, text: "CrCl under 30: for infusions start at a lower rate, titrate to a sedation score, and stop daily to reassess. Watch breathing and blood pressure." }
      ]
    },
    hepatic: { level: "adjust", text: "Clearance is reduced and it can precipitate hepatic encephalopathy. Use lower doses and titrate slowly; oral bioavailability roughly doubles in cirrhosis." },
    refs: [
      { book: "gabbe", text: "A single dose of a short-acting benzodiazepine should not affect breastfeeding.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 8 Substance Use Disorder in Pregnancy, p. 149", pdf_page: 190, quote: "a single dose of a short-acting benzodiazepine (e.g., for a postpartum procedure) should not impact breastfeeding" },
      { book: "harrison", text: "Oral bioavailability of midazolam nearly doubles in cirrhosis.", ref: "Harrison 22nd ed. 2025, ch. 71 Principles of Clinical Pharmacology, p. 488", pdf_page: 531, quote: "The oral bioavailability for high first-pass drugs such as morphine, meperidine, midazolam, and nifedipine" }
    ],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "phenytoin": {
    pregnancy: { level: "caution", text: "Do not withhold to treat status epilepticus (for eclampsia use magnesium sulfate instead). Long-term use raises the risk of birth defects: give folic acid, and give the newborn vitamin K." },
    breastfeeding: { level: "safe", text: "Compatible in normal doses. Watch the baby for sleepiness." },
    renal: { level: "adjust", text: "Dose is usually unchanged, but protein binding falls in kidney failure, so a normal total level can hide a toxic free level. Do not increase the dose because of a 'low' total level; measure free phenytoin if available and watch for toxicity (nystagmus, ataxia, drowsiness)." },
    hepatic: { level: "adjust", text: "Reduce the maintenance dose in liver disease and monitor for toxicity. Low albumin raises the free (active) fraction." },
    refs: [
      { book: "williams", text: "Malformation rates were twofold higher with phenytoin exposure.", ref: "Williams Obstetrics 25th ed. 2018, ch. 12 Teratology, Teratogens, and Fetotoxic Agents, pdf p. 530", pdf_page: 530, quote: "Rates were twofold higher among children exposed to carbamazepine or phenytoin" },
      { book: "gabbe", text: "Phenytoin lowers folic acid levels, increasing the risk of birth defects.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 124", pdf_page: 157, quote: "decreases folic acid levels, increasing the risk of birth defects" },
      { book: "gabbe", text: "Phenytoin in normal doses is compatible with breastfeeding.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 134", pdf_page: 167, quote: "Patients may be reassured that in normal doses, carbamazepine, phenytoin" },
      { book: "harrison", text: "Phenytoin protein binding is altered in uraemia; free levels may be needed.", ref: "Harrison 22nd ed. 2025, ch. 71 Principles of Clinical Pharmacology, p. 488", pdf_page: 531, quote: "Protein binding of some drugs (e.g., phenytoin) may be altered in uremia, so measuring free drug concentration may be desirable." }
    ],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "sodium-bicarbonate": {
    pregnancy: { level: "caution", text: "Use only for clear indications (for example hyperkalaemia, certain poisonings). Rapid correction of maternal acidosis can worsen fetal acidosis and gives a large sodium load." },
    breastfeeding: { level: "safe", text: "Compatible." },
    renal: { level: "adjust", text: "Large sodium and fluid load: risk of fluid overload and metabolic alkalosis in kidney failure. Give smaller amounts and monitor sodium, bicarbonate and fluid status." },
    hepatic: { level: "none", text: "No dose change. In cirrhosis with ascites, the sodium load worsens fluid retention." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF"]
  },

  "vitamin-k": {
    pregnancy: { level: "safe", text: "Safe when indicated. Give the newborn vitamin K at birth, especially after maternal phenytoin, phenobarbital or rifampicin." },
    breastfeeding: { level: "safe", text: "Compatible. Breastfed babies need the birth dose because breast milk is low in vitamin K." },
    renal: { level: "none", text: "No dose change." },
    hepatic: { level: "none", text: "No dose change, but it does not correct clotting in severe liver failure (the liver cannot make clotting factors). Give fresh frozen plasma if bleeding." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF for Children"]
  },

  "caffeine-citrate": {
    pregnancy: { level: "caution", text: "Caffeine citrate is a neonatal medicine and is not given to pregnant women. For dietary caffeine, moderate intake (under 200 mg per day) is considered acceptable." },
    breastfeeding: { level: "safe", text: "The treated baby can breastfeed. Mothers should keep their own caffeine intake moderate, as high intake can make babies irritable." },
    renal: { level: "adjust", text: "In neonates caffeine is excreted mainly unchanged by the kidneys. With kidney impairment reduce the maintenance dose and watch for tachycardia, jitteriness and feeding intolerance (measure levels if available)." },
    hepatic: { level: "adjust", text: "Use with caution in neonatal cholestatic liver disease; monitor for toxicity and measure levels if available." },
    refs: [
      { book: "gabbe", text: "Moderate caffeine consumption is not a major factor in miscarriage or preterm birth.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 133", pdf_page: 166, quote: "moderate caffeine consumption (less than 200 mg/day) does not appear to be a major contributing factor in miscarriage or preterm birth" }
    ],
    sources: ["BNF for Children", "WHO recommendations for care of the preterm or low-birth-weight infant 2022"]
  },

  "zinc-ors": {
    pregnancy: { level: "safe", text: "Safe. ORS is the right fluid for diarrhoea and vomiting in pregnancy." },
    breastfeeding: { level: "safe", text: "Safe. Continue breastfeeding during diarrhoea; it is part of the treatment." },
    renal: { level: "adjust", text: "ORS contains potassium (20 mmol/L) and sodium. In oliguric kidney failure give by measured losses, and monitor sodium, potassium and fluid status. Zinc needs no change." },
    hepatic: { level: "none", text: "No dose change." },
    refs: [],
    sources: ["WHO/UNICEF ORS and zinc joint statement", "WHO Pocket Book of Hospital Care for Children 2013"]
  },

  "vitamin-a": {
    pregnancy: { level: "caution", text: "Do not give high-dose capsules (100,000 to 200,000 IU) in pregnancy: high doses cause birth defects. For night blindness or Bitot's spots give no more than 10,000 IU daily or 25,000 IU weekly (WHO). Active corneal lesions threaten sight: seek advice on higher doses." },
    breastfeeding: { level: "safe", text: "Compatible in recommended doses." },
    renal: { level: "adjust", text: "Vitamin A accumulates in chronic kidney failure. Give treatment doses for measles or xerophthalmia, but avoid repeated or high-dose supplements." },
    hepatic: { level: "adjust", text: "High or repeated doses are toxic to the liver. Give treatment doses only; avoid in severe liver disease unless deficiency is proven." },
    refs: [
      { book: "williams", text: "Vitamin A above 10,000 IU per day in pregnancy has been associated with malformations.", ref: "Williams Obstetrics 25th ed. 2018, ch. 9 Prenatal Care, pdf p. 378", pdf_page: 378, quote: "has been associated with congenital malformations when taken in high doses (>10,000 IU/d) during pregnancy" },
      { book: "gabbe", text: "Birth defects have been reported after 25,000 IU or more of vitamin A in pregnancy.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 124", pdf_page: 157, quote: "Eighteen cases of birth defects have been reported after exposure to levels of 25,000 IU of vitamin A or greater during pregnancy." }
    ],
    sources: ["WHO guideline: vitamin A supplementation in pregnant women 2011", "WHO Model Formulary 2008", "BNF"]
  },

  "blood-transfusion": {
    pregnancy: { level: "safe", text: "Do not withhold in haemorrhage or severe anaemia. Give ABO and Rh D compatible blood; give Rh D negative women Rh D negative blood where possible to prevent haemolytic disease in future babies." },
    breastfeeding: { level: "safe", text: "Compatible. Continue breastfeeding." },
    renal: { level: "adjust", text: "Kidney failure raises the risk of circulatory overload and hyperkalaemia (from older stored blood). Transfuse slowly (each unit over 3 to 4 h), use the freshest blood available, and monitor breathing, fluid status and potassium." },
    hepatic: { level: "none", text: "No change." },
    refs: [],
    sources: ["WHO The Clinical Use of Blood 2001", "WHO Managing Complications in Pregnancy and Childbirth 2017"]
  },

  "ipratropium": {
    pregnancy: { level: "safe", text: "Used when needed with salbutamol for severe asthma. Very little is absorbed from the lungs." },
    breastfeeding: { level: "safe", text: "Compatible. Inhaled doses give negligible amounts in milk." },
    renal: { level: "none", text: "No dose change for nebulised use." },
    hepatic: { level: "none", text: "No dose change for nebulised use." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF", "GINA 2024"]
  },

  "adenosine": {
    pregnancy: { level: "safe", text: "First-line drug to terminate SVT in a stable pregnant woman. Transient fetal bradycardia has been reported; monitor the fetus if viable." },
    breastfeeding: { level: "safe", text: "Compatible. Its half-life is seconds." },
    renal: { level: "none", text: "No dose change." },
    hepatic: { level: "none", text: "No dose change." },
    refs: [
      { book: "williams", text: "Adenosine is safe and effective for cardioversion in stable pregnant women.", ref: "Williams Obstetrics 25th ed. 2018, ch. 49 Cardiovascular Disorders, pdf p. 2142", pdf_page: 2142, quote: "adenosine is safe and effective for cardioversion in hemodynamically stable gravidas" },
      { book: "williams", text: "Transient fetal bradycardia has been described.", ref: "Williams Obstetrics 25th ed. 2018, ch. 49 Cardiovascular Disorders, pdf p. 2142", pdf_page: 2142, quote: "Transient fetal bradycardia has been described with adenosine" }
    ],
    sources: ["BNF", "ESC 2018 Guidelines for cardiovascular disease during pregnancy"]
  },

  "mannitol": {
    pregnancy: { level: "caution", text: "Use when needed for raised intracranial pressure. The diuresis can reduce plasma volume and uterine blood flow; replace urine losses and monitor the fetus." },
    breastfeeding: { level: "safe", text: "Compatible. Not absorbed from the baby's gut." },
    renal: {
      level: "adjust",
      text: "Needs working kidneys to be excreted. In anuria or established kidney failure it stays in the circulation and causes fluid overload, pulmonary oedema and hyperosmolality. Monitor urine output, sodium and serum osmolality (stop if above 320 mOsm/kg).",
      bands: [
        { below: 30, text: "Severe kidney impairment or oliguria: give a test dose first (0.2 g/kg IV over 3 to 5 min). Continue only if urine output rises to at least 30 to 50 mL/h over the next 2 to 3 h. Monitor osmolality." },
        { below: 10, text: "CrCl under 10 or anuria: avoid. Discuss hypertonic saline for raised intracranial pressure with a senior." }
      ]
    },
    hepatic: { level: "none", text: "No dose change." },
    refs: [],
    sources: ["BNF", "Mannitol product information", "Brain Trauma Foundation guidelines 2016"]
  },

  "hypertonic-saline": {
    pregnancy: { level: "caution", text: "Use when needed for raised intracranial pressure or symptomatic severe hyponatraemia. Monitor sodium closely; rapid shifts affect the fetus too." },
    breastfeeding: { level: "safe", text: "Compatible." },
    renal: { level: "adjust", text: "Large sodium load: risk of fluid overload in kidney or heart failure. Check sodium every 2 to 4 h and watch fluid status and breathing." },
    hepatic: { level: "adjust", text: "Chronic low sodium in cirrhosis, alcohol use or malnutrition carries a high risk of osmotic demyelination: raise sodium by no more than 8 mmol/L in 24 h, and check sodium every 2 to 4 h." },
    refs: [
      { book: "harrison", text: "During hypertonic saline, check plasma sodium every 2 to 4 h because the rise is unpredictable.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 351", pdf_page: 394, quote: "plasma Na+ concentration should be monitored every 2–4 h during treatment" },
      { book: "harrison", text: "Too-rapid correction of chronic hyponatraemia can cause osmotic demyelination.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 350", pdf_page: 393, quote: "an osmotic demyelination syndrome (ODS)" }
    ],
    sources: ["BNF", "European hyponatraemia guideline 2014"]
  },

  "arv-prophylaxis": {
    pregnancy: { level: "safe", text: "TDF + 3TC + DTG is the WHO-preferred regimen in pregnancy, including early pregnancy, for PEP and treatment. Do not delay PEP (start within 72 h). Infant nevirapine or zidovudine prophylaxis is standard for HIV-exposed babies." },
    breastfeeding: { level: "safe", text: "Continue breastfeeding with the mother on ARVs and infant prophylaxis, as per national (WHO) guidance. A breastfeeding woman taking PEP can continue to breastfeed; if she may have acquired HIV recently, seek advice, as risk to the baby is highest in early infection." },
    renal: {
      level: "adjust",
      text: "Tenofovir disoproxil (TDF) can harm the kidneys and is cleared by them. Check creatinine before starting if possible, but do not delay the first dose waiting for the result. Dolutegravir needs no change. Infant nevirapine needs no change.",
      bands: [
        { below: 70, text: "CrCl 50 to 70: WHO allows standard TDF + 3TC + DTG; some guidance (US) prefers to avoid TDF below 70. Recheck creatinine during the course and seek advice if it rises." },
        { below: 50, text: "CrCl under 50: do not use the fixed-dose TDF tablet. Use zidovudine + lamivudine (lamivudine 150 mg once daily at CrCl 30 to 49) with dolutegravir 50 mg daily. Get HIV clinician or pharmacist advice." },
        { below: 30, text: "CrCl under 30: avoid TDF. Lamivudine and zidovudine both need further dose reduction; dolutegravir is unchanged. Get HIV clinician or pharmacist advice, but do not delay PEP beyond 72 h after exposure." }
      ]
    },
    hepatic: { level: "adjust", text: "Dolutegravir: no change in mild to moderate liver impairment; avoid in severe (no data). Zidovudine: reduce dose in severe liver disease. Check hepatitis B status: stopping TDF or 3TC in hepatitis B can cause a flare." },
    refs: [
      { book: "harrison", text: "Given renal toxicity, US guidance limits tenofovir disoproxil to CrCl above 70.", ref: "Harrison 22nd ed. 2025, ch. 208 Human Immunodeficiency Virus Disease: AIDS and Related Disorders, p. 1616", pdf_page: 1659, quote: "tenofovir disoproxil should be limited to use in patients with creatinine clearance (CrCl) >70" },
      { book: "harrison", text: "Tenofovir dosing frequency should be reduced when creatinine clearance is impaired.", ref: "Harrison 22nd ed. 2025, ch. 352 Chronic Hepatitis, p. 2679", pdf_page: 2722, quote: "Frequency of tenofovir administration should be reduced for patients with impaired creatinine clearance." },
      { book: "williams", text: "Tenofovir is recommended as first-line agent in pregnancy for hepatitis B.", ref: "Williams Obstetrics 25th ed. 2018, ch. 55 Hepatic, Biliary, and Pancreatic Disorders, pdf p. 2356", pdf_page: 2356, quote: "Tenofovir has been recommended as the first-line agent during pregnancy" }
    ],
    sources: ["WHO Consolidated guidelines on HIV prevention, testing, treatment 2021", "WHO Guidelines for HIV post-exposure prophylaxis 2024", "BNF"]
  },

  "tb-rhze": {
    pregnancy: { level: "safe", text: "Treat active TB in pregnancy with the standard regimen: untreated TB is far more dangerous than the drugs. WHO includes pyrazinamide; some US guidance omits it. Give pyridoxine (vitamin B6) 10 to 25 mg daily. Check that contraception is not relied on (rifampicin makes hormonal methods fail)." },
    breastfeeding: { level: "safe", text: "Compatible; small amounts pass into milk. Give the baby TB preventive therapy per national guidance once active TB is excluded, and pyridoxine if the baby takes isoniazid." },
    renal: {
      level: "adjust",
      text: "Isoniazid and rifampicin need no dose change. Pyrazinamide and ethambutol are cleared by the kidneys and accumulate (ethambutol eye damage).",
      bands: [
        { below: 30, text: "CrCl under 30: do not use the daily 4-drug fixed-dose tablet as usual. Give isoniazid and rifampicin daily at normal dose, and pyrazinamide 25 mg/kg plus ethambutol 15 mg/kg three times per week (after dialysis on dialysis days). Give pyridoxine and check vision monthly." }
      ]
    },
    hepatic: { level: "adjust", text: "Isoniazid, rifampicin and pyrazinamide can all damage the liver. Check ALT and bilirubin at baseline if there is liver disease, alcohol use, HIV, pregnancy or within 3 months after delivery, then monthly. Stop if ALT is over 5 times normal, or over 3 times with symptoms or jaundice. Advanced liver disease: avoid pyrazinamide and use a specialist regimen." },
    refs: [
      { book: "gabbe", text: "No teratogenic effect of isoniazid, rifampin or ethambutol has been shown.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 130", pdf_page: 163, quote: "There is no evidence of any teratogenic effect of isoniazid, para-aminosalicylic acid, rifampin (Rifadin), or ethambutol (Myambutol)." },
      { book: "harrison", text: "WHO recommends pyrazinamide in pregnancy; US guidance does not because of limited safety data.", ref: "Harrison 22nd ed. 2025, ch. 183 Tuberculosis, p. 1400", pdf_page: 1443, quote: "Although the WHO has recommended routine use of pyrazinamide for pregnant women in combination with isoniazid and rifampin" },
      { book: "williams", text: "Isoniazid has been used for decades and is considered safe in pregnancy.", ref: "Williams Obstetrics 25th ed. 2018, ch. 51 Pulmonary Disorders, pdf p. 2208", pdf_page: 2208, quote: "Isoniazid has been used for decades, and it is considered safe in pregnancy" },
      { book: "gabbe", text: "Small amounts of isoniazid, rifampin and ethambutol pass into breast milk.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 43 Respiratory Disease in Pregnancy, p. 829", pdf_page: 1019, quote: "Small amounts of INH, RIF, and ethambutol are excreted into breast milk." },
      { book: "gabbe", text: "Isoniazid is considered compatible with breastfeeding.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 135", pdf_page: 168, quote: "its use is considered compatible with breastfeeding" },
      { book: "harrison", text: "Isoniazid needs no dose adjustment in renal disease.", ref: "Harrison 22nd ed. 2025, ch. 186 Antimycobacterial Agents, p. 1422", pdf_page: 1465, quote: "Isoniazid does not require dosage adjustment in patients with renal disease." },
      { book: "harrison", text: "Rifampin needs no change in renal insufficiency.", ref: "Harrison 22nd ed. 2025, ch. 186 Antimycobacterial Agents, p. 1423", pdf_page: 1466, quote: "No adjustments of dose or frequency are necessary in patients with renal insufficiency." },
      { book: "harrison", text: "Pyrazinamide dosage must be adjusted to renal function.", ref: "Harrison 22nd ed. 2025, ch. 186 Antimycobacterial Agents, p. 1423", pdf_page: 1466, quote: "The dosage must be adjusted according to the level of renal function in patients with reduced creatinine clearance." },
      { book: "harrison", text: "Ethambutol dose must be lowered and given less often in renal insufficiency.", ref: "Harrison 22nd ed. 2025, ch. 186 Antimycobacterial Agents, p. 1423", pdf_page: 1466, quote: "the dosage must be lowered and the frequency of administration reduced for patients with renal insufficiency" },
      { book: "harrison", text: "Hepatic risk factors include pregnancy and the first 3 months postpartum.", ref: "Harrison 22nd ed. 2025, ch. 186 Antimycobacterial Agents, p. 1420", pdf_page: 1463, quote: "pregnancy or ≤3 months postpartum" },
      { book: "harrison", text: "Stop isoniazid if ALT/AST is over 3 times normal with symptoms, or over 5 times without.", ref: "Harrison 22nd ed. 2025, ch. 186 Antimycobacterial Agents, p. 1422", pdf_page: 1465, quote: "an ALT or AST level three times the upper limit of normal or in the absence of symptoms with an ALT or AST level five times the upper limit of normal" },
      { book: "harrison", text: "Pyrazinamide should be avoided in liver failure.", ref: "Harrison 22nd ed. 2025, ch. 183 Tuberculosis, p. 1400", pdf_page: 1443, quote: "The use of pyrazinamide in patients with liver failure should be avoided." }
    ],
    sources: ["WHO Consolidated guidelines on tuberculosis, Module 4: treatment 2022", "WHO Treatment of tuberculosis guidelines 4th ed. 2010 (renal dosing)", "BNF"]
  },

  "snake-antivenom": {
    pregnancy: { level: "safe", text: "Pregnancy is not a reason to withhold antivenom when indicated: envenoming threatens both mother and fetus. Have adrenaline ready; treat anaphylaxis with IM adrenaline as usual." },
    breastfeeding: { level: "safe", text: "Compatible. Continue breastfeeding." },
    renal: { level: "none", text: "No dose change. Envenoming often causes acute kidney injury: monitor urine output and creatinine. Antivenom does not reverse established kidney failure, which may need dialysis." },
    hepatic: { level: "none", text: "No dose change." },
    refs: [
      { book: "harrison", text: "Antivenom reverses active venom toxicity but not established renal failure or paralysis.", ref: "Harrison 22nd ed. 2025, ch. 471 Disorders Caused by Venomous Snakebites and Marine Animal Exposures, p. 3719", pdf_page: 3762, quote: "it is of little benefit in reversing effects that have already been established" }
    ],
    sources: ["WHO Guidelines for the Prevention and Clinical Management of Snakebite in Africa 2010", "WHO Model Formulary 2008"]
  },

  "oxygen": {
    pregnancy: { level: "safe", text: "Give to any hypoxaemic pregnant woman (target SpO2 94% or more). Routine oxygen for women in labour who are not hypoxaemic is not recommended." },
    breastfeeding: { level: "safe", text: "Compatible." },
    renal: { level: "none", text: "No change." },
    hepatic: { level: "none", text: "No change." },
    refs: [
      { book: "nelson", text: "In preterm babies, oxygen must be balanced against the risk of retinopathy of prematurity and lung injury.", ref: "Nelson Textbook of Pediatrics 22nd ed. 2024, ch. 119, p. 1044", pdf_page: 1054, quote: "must be balanced against the risk of hyperoxia to the eyes (retinopathy of prematurity [ROP])" }
    ],
    sources: ["WHO Oxygen therapy for children 2016", "WHO Managing Complications in Pregnancy and Childbirth 2017", "BTS oxygen guideline 2017"]
  },
  "haloperidol": {
    pregnancy: {
      level: "caution",
      text: "Untreated psychosis or mania in pregnancy is dangerous for mother and baby, so do not stop treatment suddenly. Use the lowest effective dose. Kaplan advises avoiding antipsychotics in the first trimester unless the benefit outweighs the risk, and prefers high-potency drugs such as haloperidol to low-potency ones. Use near delivery can cause movement symptoms, sleepiness and feeding problems in the newborn: tell the baby's team."
    },
    breastfeeding: {
      level: "caution",
      text: "Small amounts pass into milk. Kaplan advises against breastfeeding on antipsychotics, but LactMed and most perinatal services accept low doses (up to about 10 mg a day) with the baby watched for sleepiness, poor feeding and stiffness. Avoid combining with other sedating drugs. Decide with the mother."
    },
    renal: {
      level: "adjust",
      text: "Mostly cleared by the liver, but patients with severe kidney failure are more sensitive to sedation and hypotension.",
      bands: [
        {
          below: 30,
          text: "CrCl under 30: start with a low dose (for example half the usual starting dose) and increase slowly. Watch sedation and blood pressure."
        }
      ]
    },
    hepatic: {
      level: "adjust",
      text: "Metabolised by the liver: levels can be higher (Kaplan). Start low (for example half dose), increase slowly and watch for sedation and confusion, which can be mistaken for hepatic encephalopathy."
    },
    refs: [
      {
        book: "kaplan",
        text: "Antipsychotics should be avoided in pregnancy, especially the first trimester, unless benefit outweighs risk; high-potency drugs are preferred over low-potency drugs, which cause hypotension.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1963",
        pdf_page: 1963,
        quote: "High-potency drugs are preferable to low-potency drugs"
      },
      {
        book: "kaplan",
        text: "First-generation antipsychotics pass into breast milk at low concentrations; the chapter advises against breastfeeding.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1963",
        pdf_page: 1963,
        quote: "Women taking these agents should be advised against breastfeeding"
      },
      {
        book: "kaplan",
        text: "Give antipsychotics with caution in liver disease, because impaired metabolism may give high plasma levels.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1968",
        pdf_page: 1968,
        quote: "Antipsychotics should be administered with caution in persons with hepatic disease"
      }
    ],
    sources: [
      "WHO mhGAP Intervention Guide 2.0 2016",
      "BNF",
      "LactMed (NIH)",
      "Maudsley Prescribing Guidelines 14th ed. 2021"
    ]
  },
  "chlorpromazine": {
    pregnancy: {
      level: "caution",
      text: "Do not stop treatment suddenly. Kaplan prefers high-potency drugs such as haloperidol in pregnancy because low-potency drugs like chlorpromazine cause hypotension. If chlorpromazine is used, avoid high doses, watch the mother's blood pressure, and warn the baby's team: use near delivery can cause sleepiness, low tone and movement symptoms in the newborn."
    },
    breastfeeding: {
      level: "caution",
      text: "Passes into milk; drowsiness and lethargy have been reported in breastfed babies. Kaplan advises against breastfeeding on antipsychotics. If used, keep the dose low, avoid other sedatives and watch the baby for sleepiness and poor feeding. Another antipsychotic may be preferred."
    },
    renal: {
      level: "adjust",
      text: "Patients with kidney failure are more sensitive to sedation, hypotension and confusion.",
      bands: [
        {
          below: 30,
          text: "CrCl under 30: start with a small dose, increase slowly, and avoid IM doses. Watch blood pressure and sedation."
        }
      ]
    },
    hepatic: {
      level: "avoid",
      text: "Avoid in liver disease where possible: chlorpromazine can cause cholestatic jaundice (Kaplan) and can precipitate hepatic coma. If there is no alternative, use a small dose and stop at the first sign of jaundice."
    },
    refs: [
      {
        book: "kaplan",
        text: "Antipsychotics should be avoided in pregnancy, especially the first trimester, unless benefit outweighs risk; high-potency drugs are preferred over low-potency drugs, which cause hypotension.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1963",
        pdf_page: 1963,
        quote: "High-potency drugs are preferable to low-potency drugs"
      },
      {
        book: "kaplan",
        text: "First-generation antipsychotics pass into breast milk at low concentrations; the chapter advises against breastfeeding.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1963",
        pdf_page: 1963,
        quote: "Women taking these agents should be advised against breastfeeding"
      },
      {
        book: "kaplan",
        text: "Give antipsychotics with caution in liver disease, because impaired metabolism may give high plasma levels.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1968",
        pdf_page: 1968,
        quote: "Antipsychotics should be administered with caution in persons with hepatic disease"
      }
    ],
    sources: [
      "WHO mhGAP Intervention Guide 2.0 2016",
      "WHO Model Formulary 2008",
      "BNF",
      "LactMed (NIH)"
    ]
  },
  "olanzapine": {
    pregnancy: {
      level: "caution",
      text: "Do not stop treatment suddenly. Kaplan notes use in pregnancy has not been well studied; larger later studies have not shown a clear rise in birth defects. Olanzapine raises the risk of gestational diabetes and excess weight gain: check glucose during pregnancy. Watch the newborn for sleepiness and movement symptoms after use near delivery."
    },
    breastfeeding: {
      level: "caution",
      text: "Kaplan advises nursing mothers not to take second-generation antipsychotics. LactMed reports low milk levels and it is often considered one of the preferred antipsychotics when breastfeeding. If used, watch the baby for sleepiness, poor feeding and slow weight gain. Decide with the mother."
    },
    renal: {
      level: "adjust",
      text: "No change for mild or moderate kidney disease.",
      bands: [
        {
          below: 30,
          text: "CrCl under 30: start at 5 mg daily (product information) and increase slowly."
        }
      ]
    },
    hepatic: {
      level: "adjust",
      text: "Start at 5 mg daily and increase slowly in liver disease (product information). Olanzapine can raise liver enzymes (Kaplan): check liver function if possible, and stop if jaundice develops."
    },
    refs: [
      {
        book: "kaplan",
        text: "Use of second-generation antipsychotics in pregnancy has not been well studied; because they pass into breast milk the chapter advises nursing mothers not to take them.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1949",
        pdf_page: 1949,
        quote: "SDA use by pregnant women has not been studied"
      },
      {
        book: "kaplan",
        text: "Give antipsychotics with caution in liver disease, because impaired metabolism may give high plasma levels.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1968",
        pdf_page: 1968,
        quote: "Antipsychotics should be administered with caution in persons with hepatic disease"
      }
    ],
    sources: [
      "Olanzapine product information (SmPC)",
      "BNF",
      "LactMed (NIH)",
      "Maudsley Prescribing Guidelines 14th ed. 2021"
    ]
  },
  "fluphenazine-decanoate": {
    pregnancy: {
      level: "caution",
      text: "A depot cannot be withdrawn if problems arise, and drug remains for weeks. Discuss pregnancy plans with women of child-bearing age. If a woman becomes pregnant on the depot, do not stop abruptly: review with a specialist, use the lowest effective dose, and warn the baby's team about possible movement symptoms and withdrawal in the newborn."
    },
    breastfeeding: {
      level: "caution",
      text: "Little information for the depot. Kaplan advises against breastfeeding on antipsychotics. If the mother breastfeeds, watch the baby for sleepiness, stiffness and poor feeding; an oral drug that can be adjusted may be preferred."
    },
    renal: {
      level: "adjust",
      text: "Patients with kidney failure are more sensitive to sedation and hypotension.",
      bands: [
        {
          below: 30,
          text: "CrCl under 30: use the small test dose and low maintenance doses, and increase slowly."
        }
      ]
    },
    hepatic: {
      level: "adjust",
      text: "Metabolised by the liver (Kaplan: caution in liver disease). Avoid in severe liver disease. Otherwise use low doses and longer intervals, and watch for sedation and jaundice."
    },
    refs: [
      {
        book: "kaplan",
        text: "Antipsychotics should be avoided in pregnancy, especially the first trimester, unless benefit outweighs risk; high-potency drugs are preferred over low-potency drugs, which cause hypotension.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1963",
        pdf_page: 1963,
        quote: "High-potency drugs are preferable to low-potency drugs"
      },
      {
        book: "kaplan",
        text: "First-generation antipsychotics pass into breast milk at low concentrations; the chapter advises against breastfeeding.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1963",
        pdf_page: 1963,
        quote: "Women taking these agents should be advised against breastfeeding"
      },
      {
        book: "kaplan",
        text: "Give antipsychotics with caution in liver disease, because impaired metabolism may give high plasma levels.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1968",
        pdf_page: 1968,
        quote: "Antipsychotics should be administered with caution in persons with hepatic disease"
      }
    ],
    sources: [
      "Fluphenazine decanoate product information (SmPC)",
      "BNF",
      "LactMed (NIH)"
    ]
  },
  "biperiden": {
    pregnancy: {
      level: "caution",
      text: "Little information. Use only when clearly needed, for example acute dystonia, at the lowest dose and for the shortest time. First reduce or change the antipsychotic that caused the symptoms."
    },
    breastfeeding: {
      level: "caution",
      text: "Little information. Anticholinergic drugs can reduce milk supply and may cause constipation or drowsiness in the baby. A single dose for dystonia is reasonable; avoid long-term use if possible."
    },
    renal: {
      level: "none",
      text: "No dose change needed. Watch for urinary retention, which is more serious in kidney disease (Kaplan: caution with urinary retention)."
    },
    hepatic: {
      level: "none",
      text: "No specific dose change. Use the lowest effective dose and watch for confusion."
    },
    refs: [
      {
        book: "kaplan",
        text: "Anticholinergics should be used cautiously, if at all, with prostatic enlargement, urinary retention or narrow-angle glaucoma.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2212",
        pdf_page: 2212,
        quote: "persons with prostatic hypertrophy, urinary retention, and narrow-angle"
      }
    ],
    sources: [
      "Biperiden product information",
      "BNF",
      "LactMed (NIH)"
    ]
  },
  "promethazine": {
    pregnancy: {
      level: "caution",
      text: "Widely used for nausea and vomiting of pregnancy (one of the RCOG first-line options). Kaplan advises pregnant women to avoid antihistamines. Use the lowest dose for the shortest time. Avoid regular use in the last 2 weeks before delivery: it may cause breathing depression, sleepiness or bleeding problems in the newborn (US product information)."
    },
    breastfeeding: {
      level: "caution",
      text: "Kaplan advises nursing mothers to avoid antihistamines. Occasional doses are usually acceptable; repeated doses may sedate the baby and reduce milk supply. Watch the baby for sleepiness and poor feeding."
    },
    renal: {
      level: "none",
      text: "No dose change needed, but patients with kidney failure are more sensitive to sedation. Start with a low dose."
    },
    hepatic: {
      level: "adjust",
      text: "Metabolised by the liver: levels rise with repeated doses in cirrhosis (Kaplan). Use lower doses, avoid repeated dosing and avoid in severe liver disease: sedation can mask or precipitate hepatic encephalopathy."
    },
    refs: [
      {
        book: "kaplan",
        text: "Antihistamines pass into breast milk and the chapter advises nursing mothers and pregnant women to avoid them.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2217",
        pdf_page: 2217,
        quote: "Antihistamines are excreted in breast milk"
      },
      {
        book: "kaplan",
        text: "Sedating antihistamines are metabolised by the liver; people with cirrhosis may reach high levels with repeated dosing.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2215",
        pdf_page: 2215,
        quote: "persons with hepatic disease, such as cirrhosis"
      }
    ],
    sources: [
      "BNF",
      "RCOG Green-top Guideline 69, 2016",
      "Promethazine US product information",
      "LactMed (NIH)"
    ]
  },
  "lorazepam": {
    pregnancy: {
      level: "caution",
      text: "Do not withhold to stop a seizure or life-threatening catatonia. Kaplan does not advise benzodiazepines in pregnancy. Regular use in the third trimester can cause newborn withdrawal and a floppy, sleepy baby with breathing problems (Kaplan): warn the baby's team and have neonatal resuscitation ready."
    },
    breastfeeding: {
      level: "caution",
      text: "Kaplan warns milk levels can make babies drowsy with slow breathing. A single dose does not require stopping breastfeeding. After repeated doses watch the baby for sleepiness, poor feeding and slow breathing. Shorter-acting than diazepam, so preferred if a benzodiazepine is needed."
    },
    renal: {
      level: "adjust",
      text: "Single doses can be given as usual. With repeated doses in kidney failure, sedation can be prolonged.",
      bands: [
        {
          below: 30,
          text: "CrCl under 30: use the smallest effective dose, avoid regular repeated doses where possible, and watch sedation and breathing."
        }
      ]
    },
    hepatic: {
      level: "adjust",
      text: "Benzodiazepines can precipitate hepatic coma in liver disease (Kaplan). Lorazepam has no long-acting active metabolites and is often preferred to diazepam, but still start low, avoid repeated high doses and watch for encephalopathy."
    },
    refs: [
      {
        book: "kaplan",
        text: "Benzodiazepines are not advised in pregnancy; third-trimester use can cause newborn withdrawal, and breast milk levels can cause drowsiness, poor breathing and slow heart rate in the baby.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.4 Anxiolytics, pdf p. 2120",
        pdf_page: 2120,
        quote: "the third trimester can precipitate a withdrawal syndrome in newborns"
      },
      {
        book: "kaplan",
        text: "People with liver disease and older people are especially prone to benzodiazepine toxicity, including hepatic coma, with repeated or high doses.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.4 Anxiolytics, pdf p. 2120",
        pdf_page: 2120,
        quote: "Persons with hepatic disease and elderly persons are particularly likely"
      }
    ],
    sources: [
      "BNF",
      "WHO Model Formulary 2008",
      "LactMed (NIH)",
      "Lorazepam product information"
    ]
  },
  "thiamine": {
    pregnancy: {
      level: "safe",
      text: "Safe. Give to any pregnant woman with prolonged vomiting (hyperemesis gravidarum) before IV dextrose, and use the full Wernicke regimen if she is confused, unsteady or has abnormal eye movements."
    },
    breastfeeding: {
      level: "safe",
      text: "Safe. Treat a thiamine-deficient breastfeeding mother promptly: her infant is at risk of infantile beriberi."
    },
    renal: {
      level: "none",
      text: "No dose change. Patients on haemodialysis lose thiamine and are at risk of deficiency."
    },
    hepatic: {
      level: "none",
      text: "No dose change. Patients with alcohol-related liver disease are at high risk of Wernicke encephalopathy: give parenteral thiamine when admitted."
    },
    refs: [
      {
        book: "kaplan",
        text: "Thiamine deficiency is not only alcohol-related: starvation, gastric cancer, haemodialysis, hyperemesis gravidarum and prolonged IV feeding also cause it.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 3.3 Major or Minor Neurocognitive Disorder due to Another Medical Condition (Amnestic Disorders), pdf p. 799"
      }
    ],
    sources: [
      "BNF",
      "NICE CG100 Alcohol-use disorders: physical complications",
      "RCOG Green-top Guideline 69: Nausea and vomiting in pregnancy and hyperemesis gravidarum (2016)"
    ]
  },
  "lithium": {
    pregnancy: {
      level: "avoid",
      text: "Avoid in the first trimester where possible: cardiac malformations, especially Ebstein anomaly (about 1 in 1,000 exposed, roughly 20 times background — Kaplan). Stopping abruptly carries a high relapse risk, so a planned decision with a specialist is needed; if continued, use the lowest effective dose, check levels often (every 4 weeks, then weekly from 36 weeks — NICE CG192) and offer fetal cardiac scanning if available. Around delivery kidney clearance falls quickly: keep her well hydrated in labour, and consider withholding lithium in labour and checking a level within 24 hours after birth. Watch the newborn for floppiness, poor feeding, cyanosis and hypothyroidism. Without lithium levels, do not continue lithium through pregnancy — change to an alternative with specialist advice."
    },
    breastfeeding: {
      level: "avoid",
      text: "Lithium passes into milk and can reach meaningful levels in the infant, especially newborns and dehydrated babies (Kaplan: lethargy, cyanosis, abnormal reflexes). NICE advises against breastfeeding on lithium. If a fully informed mother chooses to breastfeed, it needs specialist follow-up with infant clinical monitoring (feeding, alertness, tone) and ideally infant levels and thyroid tests — not possible where no laboratory exists."
    },
    renal: {
      level: "adjust",
      text: "Lithium is removed only by the kidneys, and long-term use can itself reduce kidney function. Any kidney impairment or dehydration raises the level. Check creatinine before starting and every 6 months; a rising creatinine means reduce the dose, check the level and consider an alternative.",
      bands: [
        {
          below: 60,
          text: "Reduced kidney function: use lithium only if levels and creatinine can be checked; start low, increase slowly, check levels more often (at least every 3 months) and discuss an alternative with a specialist."
        },
        {
          below: 30,
          text: "Severe kidney impairment: avoid lithium. Stop or switch to another mood stabiliser or antipsychotic with specialist advice; if lithium must continue, only under specialist care with frequent levels."
        }
      ]
    },
    hepatic: {
      level: "none",
      text: "No dose change (lithium is not metabolised by the liver). Cirrhosis with ascites, diuretics or low-sodium diets changes fluid balance and raises toxicity risk: monitor closely."
    },
    refs: [
      {
        book: "kaplan",
        text: "Avoid in the first trimester (cardiac malformations, especially Ebstein anomaly); if continued, use the lowest dose and monitor closely, especially just after delivery when renal lithium excretion falls; hydration in labour reduces toxicity.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2062"
      },
      {
        book: "kaplan",
        text: "Lithium passes into breast milk; toxicity in breastfed infants shows as lethargy, cyanosis, abnormal reflexes and sometimes an enlarged liver.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2062"
      },
      {
        book: "kaplan",
        text: "Risk factors for lithium toxicity are excessive dose, renal impairment, a low-sodium diet, interacting drugs and dehydration; elderly people are more vulnerable.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2059"
      },
      {
        book: "kaplan",
        text: "Book starting dose is 300 mg three times daily for most adults, but 300 mg once or twice daily in elderly people or renal impairment.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2064"
      }
    ],
    sources: [
      "NICE CG185 Bipolar disorder",
      "NICE CG192 Antenatal and postnatal mental health (2014, updated 2020)",
      "BNF",
      "LactMed (NIH): lithium"
    ]
  },
  "sodium-valproate": {
    pregnancy: {
      level: "avoid",
      text: "Major teratogen: neural tube defects, heart, face and limb malformations (about 1 in 10 exposed babies) and learning, IQ and autism-spectrum problems in up to 4 in 10 (MHRA; Kaplan: lower IQ at 6 years). Bipolar disorder or migraine: do not use in pregnancy. Epilepsy: use only if no alternative works, at the lowest dose in divided doses, with folic acid, under specialist care. If a woman becomes pregnant on valproate for epilepsy, do not stop it suddenly — refer urgently to plan a switch."
    },
    breastfeeding: {
      level: "safe",
      text: "Compatible with breastfeeding: infant levels are 1–10 % of the mother's with no evidence of harm (Kaplan). Watch the infant for jaundice, unusual bruising or bleeding, and drowsiness."
    },
    renal: {
      level: "adjust",
      text: "Mild to moderate impairment: no change. Kidney failure raises the free (active) fraction, so total blood levels underestimate the effect; dose to clinical response and side effects.",
      bands: [
        {
          below: 30,
          text: "Severe kidney impairment: start at a low dose, increase slowly, and adjust by seizure or mood control and sedation or tremor rather than by total valproate level. Valproate is partly removed by haemodialysis."
        }
      ]
    },
    hepatic: {
      level: "avoid",
      text: "Avoid in active or severe liver disease, a personal or family history of severe liver dysfunction, and suspected mitochondrial disease (e.g. POLG). Kaplan advises avoiding valproate in hepatic disease. Stop immediately with vomiting, abdominal pain, lethargy, jaundice or oedema, and seek liver tests."
    },
    refs: [
      {
        book: "kaplan",
        text: "First-trimester exposure carries neural tube defect and other malformation risks, and children exposed in utero have lower IQ at 6 years and possibly more autism.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2074"
      },
      {
        book: "kaplan",
        text: "Breastfed infants reach 1–10 % of maternal levels with no evidence of harm; valproate is not contraindicated when nursing, but should be avoided in liver disease.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2075"
      },
      {
        book: "kaplan",
        text: "Risk factors for fatal hepatotoxicity: age under 3 years, concurrent phenobarbital, and neurological disorders, especially inborn errors of metabolism.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2072"
      },
      {
        book: "kaplan",
        text: "Lethargy, malaise, anorexia, nausea and vomiting, oedema or abdominal pain on valproate must raise the possibility of severe hepatotoxicity; a modest rise in liver enzymes does not predict it.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2074"
      }
    ],
    sources: [
      "MHRA Drug Safety Update: valproate (2018, 2024)",
      "BNF",
      "LactMed (NIH): valproic acid",
      "The Renal Drug Handbook"
    ]
  },
  "carbamazepine": {
    pregnancy: {
      level: "caution",
      text: "Increased malformation risk (neural tube defects, cleft palate, small head — Kaplan), lower than valproate. Avoid starting in pregnancy unless needed; in epilepsy do not stop suddenly. Give folic acid before conception and in the first trimester; confirm the newborn receives vitamin K at birth. Carbamazepine makes hormonal contraception unreliable, so unplanned pregnancies are common: plan contraception first."
    },
    breastfeeding: {
      level: "safe",
      text: "Compatible with breastfeeding in normal doses (Gabbe). Watch the infant for drowsiness, poor feeding, jaundice or rash."
    },
    renal: {
      level: "none",
      text: "No routine dose change. Use carefully in kidney disease because of hyponatraemia and fluid retention; check sodium if the patient becomes confused or drowsy."
    },
    hepatic: {
      level: "adjust",
      text: "Liver disease: use one-third to one-half of the usual dose and increase slowly (Kaplan). Avoid in severe liver disease. Stop if jaundice or persistent transaminases above 3 times normal."
    },
    refs: [
      {
        book: "kaplan",
        text: "Associated with cleft palate, microcephaly and spina bifida; avoid in pregnancy unless necessary and give folic acid to all women of childbearing potential.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2090"
      },
      {
        book: "kaplan",
        text: "Liver disease: use one-third to one-half of the usual dose and increase slowly.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2092"
      },
      {
        book: "kaplan",
        text: "Carbamazepine can cause an SIADH-like hyponatraemia, mainly in elderly people or at high doses; new confusion, severe weakness or headache should prompt a sodium check.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2089"
      }
    ],
    sources: [
      "BNF",
      "Gabbe's Obstetrics 9th ed. 2025 (breastfeeding)",
      "LactMed (NIH): carbamazepine"
    ]
  },
  "amitriptyline": {
    pregnancy: {
      level: "caution",
      text: "No clear malformation link after long experience (Kaplan). Neonatal withdrawal or toxicity (fast breathing, irritability, poor sucking, jitteriness) can follow use near delivery: use the lowest effective dose and warn the neonatal team. For new depression treatment in pregnancy, an SSRI (e.g. fluoxetine or sertraline) is usually preferred because of overdose risk."
    },
    breastfeeding: {
      level: "safe",
      text: "Compatible: amounts in milk are small and infant levels usually undetectable (Kaplan). Watch the baby for drowsiness and poor feeding, especially preterm or newborn infants."
    },
    renal: {
      level: "none",
      text: "No dose change; use cautiously (Kaplan) and start low in older people, who are sensitive to sedation, urinary retention and postural hypotension."
    },
    hepatic: {
      level: "adjust",
      text: "Metabolised by the liver: start low and increase slowly in liver disease; avoid in severe liver disease (sedation can precipitate hepatic encephalopathy)."
    },
    refs: [
      {
        book: "kaplan",
        text: "No definite teratogenic link; neonatal withdrawal (fast breathing, cyanosis, irritability, poor suck) can occur; amounts in breast milk are small and infant levels usually undetectable.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, tricyclics, pdf p. 2028"
      },
      {
        book: "kaplan",
        text: "Use cautiously in hepatic or renal disease.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, tricyclics, pdf p. 2029"
      }
    ],
    sources: [
      "BNF",
      "LactMed (NIH): amitriptyline",
      "WHO mhGAP Intervention Guide 2.0"
    ]
  },
  "fluoxetine": {
    pregnancy: {
      level: "caution",
      text: "SSRIs other than paroxetine are generally considered acceptable when depression needs medication (Kaplan); untreated depression also harms mother and baby. Late-pregnancy use can cause neonatal adaptation symptoms (jitteriness, feeding difficulty, fast breathing) and a small risk of persistent pulmonary hypertension of the newborn; transient QTc prolongation has been reported. Continue if already effective; observe the baby for the first days."
    },
    breastfeeding: {
      level: "caution",
      text: "Passes into milk and, because of its long half-life, can accumulate in young infants (irritability, poor feeding, poor sleep, weight loss). If starting an antidepressant after birth, sertraline is usually preferred; a mother already well on fluoxetine through pregnancy can usually continue with infant monitoring."
    },
    renal: {
      level: "none",
      text: "No dose change in mild to moderate kidney impairment. Severe impairment: use with caution; low sodium is more likely."
    },
    hepatic: {
      level: "adjust",
      text: "Liver impairment slows elimination: use a lower dose or give on alternate days (BNF), and increase slowly."
    },
    refs: [
      {
        book: "kaplan",
        text: "Apart from paroxetine, SSRIs are considered safe in pregnancy when needed; transient QTc prolongation has been seen in exposed newborns.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, SSRIs, pdf p. 1996"
      },
      {
        book: "kaplan",
        text: "SSRI-associated hyponatraemia (SIADH) occurs especially in older people and those on diuretics.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, SSRIs, pdf p. 1990"
      }
    ],
    sources: [
      "BNF",
      "NICE CG192 Antenatal and postnatal mental health",
      "LactMed (NIH): fluoxetine"
    ]
  },
  "risperidone": {
    pregnancy: {
      level: "caution",
      text: "Do not stop treatment suddenly: relapse of psychosis or mania in pregnancy is dangerous. Kaplan notes use in pregnancy has not been well studied; larger later studies have not shown a clear rise in birth defects. Risperidone raises prolactin, which can make it harder to conceive. Use the lowest effective dose, check glucose, and warn the baby's team: use near delivery can cause sleepiness, stiffness, tremor and feeding problems in the newborn."
    },
    breastfeeding: {
      level: "caution",
      text: "Kaplan advises nursing mothers not to take second-generation antipsychotics. LactMed reports low milk levels and no consistent harm, and many perinatal services accept it. If used, watch the baby for sleepiness, poor feeding, slow weight gain and stiffness. Decide with the mother."
    },
    renal: {
      level: "adjust",
      text: "Risperidone and its active metabolite are cleared by the kidneys: halve the starting dose and dose steps in any kidney impairment (BNF: 0.5 mg twice daily, increasing by 0.5 mg twice daily to 1–2 mg twice daily).",
      bands: [
        {
          below: 30,
          text: "CrCl under 30: start 0.5 mg twice daily, increase by no more than 0.5 mg twice daily, usually to no more than 1–2 mg twice daily. Watch for dizziness, sedation and stiffness. Establish oral tolerance before any long-acting injection."
        }
      ]
    },
    hepatic: {
      level: "adjust",
      text: "Halve the starting dose and dose steps (BNF: 0.5 mg twice daily, rising to 1–2 mg twice daily). Kaplan advises caution with antipsychotics in liver disease because levels can be higher."
    },
    refs: [
      {
        book: "kaplan",
        text: "Use of second-generation antipsychotics in pregnancy has not been well studied; risperidone can raise prolactin 3–4 times the upper limit, and because these drugs pass into milk the chapter advises nursing mothers not to take them.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1949",
        pdf_page: 1949,
        quote: "potential of risperidone to raise prolactin"
      },
      {
        book: "kaplan",
        text: "Give antipsychotics with caution in liver disease, because impaired metabolism may give high plasma levels.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1968",
        pdf_page: 1968,
        quote: "Antipsychotics should be administered with caution in persons with hepatic disease"
      }
    ],
    sources: [
      "BNF",
      "LactMed (NIH)",
      "Risperidone product information (SmPC)",
      "Maudsley Prescribing Guidelines 14th ed. 2021"
    ]
  },
  "quetiapine": {
    pregnancy: {
      level: "caution",
      text: "Do not stop treatment suddenly. Kaplan notes second-generation antipsychotics have not been well studied in pregnancy; available registry data have not shown a clear rise in birth defects. Quetiapine can raise blood sugar and cause weight gain: check glucose. Warn the baby's team about possible sleepiness and withdrawal or movement symptoms after use near delivery."
    },
    breastfeeding: {
      level: "caution",
      text: "Kaplan advises nursing mothers not to take second-generation antipsychotics. LactMed reports very low milk levels, and quetiapine is often considered one of the preferred antipsychotics when breastfeeding. If used, watch the baby for sleepiness and poor feeding. Decide with the mother."
    },
    renal: {
      level: "none",
      text: "No dose change in kidney impairment (product information). Start low in older patients and watch for postural hypotension."
    },
    hepatic: {
      level: "adjust",
      text: "Quetiapine is extensively metabolised by the liver. Start at 25 mg a day and increase by 25–50 mg a day to the lowest effective dose (BNF). Kaplan advises caution with antipsychotics in liver disease."
    },
    refs: [
      {
        book: "kaplan",
        text: "Use of second-generation antipsychotics in pregnancy has not been well studied; risperidone can raise prolactin 3–4 times the upper limit, and because these drugs pass into milk the chapter advises nursing mothers not to take them.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1949",
        pdf_page: 1949,
        quote: "potential of risperidone to raise prolactin"
      },
      {
        book: "kaplan",
        text: "Give antipsychotics with caution in liver disease, because impaired metabolism may give high plasma levels.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1968",
        pdf_page: 1968,
        quote: "Antipsychotics should be administered with caution in persons with hepatic disease"
      }
    ],
    sources: [
      "BNF",
      "LactMed (NIH)",
      "Quetiapine product information (SmPC)"
    ]
  },
  "clozapine": {
    pregnancy: {
      level: "caution",
      text: "Specialist decision. Do not stop suddenly: resistant schizophrenia often relapses badly. Kaplan notes second-generation antipsychotics have not been well studied in pregnancy; clozapine has not shown a clear pattern of birth defects but raises the risk of gestational diabetes and weight gain (check glucose), and constipation worsens in pregnancy. Continue blood counts. Warn the baby's team: newborn sleepiness, floppiness and, rarely, fits have been reported after use near delivery."
    },
    breastfeeding: {
      level: "avoid",
      text: "Avoid breastfeeding (product information). Clozapine passes into milk and may concentrate there; sedation and agranulocytosis have been reported in breastfed infants, and infant blood counts are rarely possible. Kaplan advises nursing mothers not to take second-generation antipsychotics. Support formula feeding where it is safe and affordable, or discuss an alternative antipsychotic with a specialist."
    },
    renal: {
      level: "adjust",
      text: "Start low (12.5 mg once daily on day 1) and titrate slowly in mild to moderate kidney impairment. Kaplan advises low starting doses in kidney or liver disease.",
      bands: [
        {
          below: 30,
          text: "CrCl under 30 (severe kidney impairment): avoid clozapine (product information contraindicates severe renal disease). Seek specialist advice on an alternative."
        }
      ]
    },
    hepatic: {
      level: "avoid",
      text: "Avoid in active, progressive liver disease or liver failure (product information). In stable mild liver disease a specialist may use a low starting dose with regular liver tests. Stop if jaundice, nausea, loss of appetite or right upper abdominal pain develop. Kaplan advises low starting doses in liver disease."
    },
    refs: [
      {
        book: "kaplan",
        text: "Use of second-generation antipsychotics in pregnancy has not been well studied; risperidone can raise prolactin 3–4 times the upper limit, and because these drugs pass into milk the chapter advises nursing mothers not to take them.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1949",
        pdf_page: 1949,
        quote: "potential of risperidone to raise prolactin"
      },
      {
        book: "kaplan",
        text: "Give antipsychotics with caution in liver disease, because impaired metabolism may give high plasma levels.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1968",
        pdf_page: 1968,
        quote: "Antipsychotics should be administered with caution in persons with hepatic disease"
      }
    ],
    sources: [
      "Clozapine product information (SmPC)",
      "BNF",
      "LactMed (NIH)",
      "Maudsley Prescribing Guidelines 14th ed. 2021"
    ]
  },
  "aripiprazole": {
    pregnancy: {
      level: "caution",
      text: "Do not stop treatment suddenly. Kaplan notes second-generation antipsychotics have not been well studied in pregnancy; available registry data have not shown a clear rise in birth defects. Warn the baby's team about possible newborn sleepiness, restlessness and feeding problems after use near delivery. Aripiprazole lowers prolactin, so fertility can return after switching to it: discuss contraception."
    },
    breastfeeding: {
      level: "caution",
      text: "Kaplan advises nursing mothers not to take second-generation antipsychotics. Aripiprazole lowers prolactin and can reduce milk supply (LactMed). If used, watch milk supply, the baby's weight gain and sleepiness; another antipsychotic may be preferred. Decide with the mother."
    },
    renal: {
      level: "none",
      text: "No dose change in kidney impairment (product information)."
    },
    hepatic: {
      level: "none",
      text: "No dose change needed (product information), but use with caution in severe liver impairment (limited data). Kaplan advises caution with antipsychotics in liver disease."
    },
    refs: [
      {
        book: "kaplan",
        text: "Use of second-generation antipsychotics in pregnancy has not been well studied; risperidone can raise prolactin 3–4 times the upper limit, and because these drugs pass into milk the chapter advises nursing mothers not to take them.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1949",
        pdf_page: 1949,
        quote: "potential of risperidone to raise prolactin"
      },
      {
        book: "kaplan",
        text: "Give antipsychotics with caution in liver disease, because impaired metabolism may give high plasma levels.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1968",
        pdf_page: 1968,
        quote: "Antipsychotics should be administered with caution in persons with hepatic disease"
      }
    ],
    sources: [
      "Aripiprazole product information (SmPC)",
      "BNF",
      "LactMed (NIH)"
    ]
  },
  "haloperidol-decanoate": {
    pregnancy: {
      level: "caution",
      text: "A depot cannot be withdrawn if problems arise and drug remains for weeks. Discuss pregnancy plans with women of child-bearing age before starting. If a woman becomes pregnant on the depot, do not stop abruptly: review with a specialist, use the lowest effective dose (or change to adjustable oral treatment), and warn the baby's team about movement symptoms and sleepiness in the newborn. Kaplan advises avoiding antipsychotics in the first trimester unless benefit outweighs risk, and prefers high-potency drugs such as haloperidol to low-potency ones."
    },
    breastfeeding: {
      level: "caution",
      text: "Little information for the depot. Kaplan advises against breastfeeding on first-generation antipsychotics. Oral haloperidol at low doses is often accepted (LactMed). If the mother breastfeeds, watch the baby for sleepiness, stiffness and poor feeding; an oral drug that can be adjusted may be preferred."
    },
    renal: {
      level: "adjust",
      text: "Mostly cleared by the liver, but patients with severe kidney failure are more sensitive to sedation and hypotension.",
      bands: [
        {
          below: 30,
          text: "CrCl under 30: start with a low injection dose (for example 12.5–25 mg), lengthen the review interval, and increase slowly. Watch sedation and blood pressure."
        }
      ]
    },
    hepatic: {
      level: "adjust",
      text: "Metabolised by the liver: levels can be higher (Kaplan). Use the lowest starting dose (for example 12.5–25 mg), increase slowly, and remember the effect cannot be removed. Sedation and confusion can be mistaken for hepatic encephalopathy."
    },
    refs: [
      {
        book: "kaplan",
        text: "Antipsychotics should be avoided in pregnancy, especially the first trimester, unless benefit outweighs risk; high-potency drugs are preferred over low-potency drugs, which cause hypotension.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1963",
        pdf_page: 1963,
        quote: "High-potency drugs are preferable to low-potency drugs"
      },
      {
        book: "kaplan",
        text: "First-generation antipsychotics pass into breast milk at low concentrations; the chapter advises against breastfeeding.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1963",
        pdf_page: 1963,
        quote: "Women taking these agents should be advised against breastfeeding"
      },
      {
        book: "kaplan",
        text: "Give antipsychotics with caution in liver disease, because impaired metabolism may give high plasma levels.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1968",
        pdf_page: 1968,
        quote: "Antipsychotics should be administered with caution in persons with hepatic disease"
      }
    ],
    sources: [
      "BNF",
      "LactMed (NIH)",
      "Haloperidol decanoate product information (SmPC)",
      "Maudsley Prescribing Guidelines 14th ed. 2021"
    ]
  },
  "trihexyphenidyl": {
    pregnancy: {
      level: "caution",
      text: "Little information on safety in pregnancy. Use only if clearly needed for real parkinsonism or dystonia, at the lowest dose; first try lowering the antipsychotic dose. Anticholinergics worsen constipation and urinary retention in pregnancy."
    },
    breastfeeding: {
      level: "caution",
      text: "No good data. Anticholinergics may reduce milk supply, and the baby could have dry mouth, constipation or irritability. Use the lowest dose for the shortest time, or avoid by lowering the antipsychotic dose where possible."
    },
    renal: {
      level: "adjust",
      text: "Use with caution (BNF): start at 1 mg a day, increase slowly, and watch for confusion and urinary retention, especially in older patients."
    },
    hepatic: {
      level: "adjust",
      text: "Use with caution (BNF): start at 1 mg a day, increase slowly, and watch for confusion, which can be mistaken for hepatic encephalopathy."
    },
    refs: [
      {
        book: "kaplan",
        text: "Use anticholinergics cautiously, if at all, with prostatic enlargement, urinary retention or narrow-angle glaucoma.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2212",
        pdf_page: 2212,
        quote: "should be used cautiously, if at all, by"
      }
    ],
    sources: [
      "BNF",
      "LactMed (NIH)",
      "Trihexyphenidyl product information (SmPC)"
    ]
  },
  "propranolol": {
    pregnancy: {
      level: "caution",
      text: "Used in pregnancy for hypertension, migraine and thyrotoxicosis, but can slow fetal growth and cause slow heart rate, low glucose and breathing problems in the newborn, especially near term. For akathisia or anxiety in pregnancy, first reduce the antipsychotic or use non-drug measures; if needed, use the lowest dose for the shortest time and tell the delivery team so the baby's glucose and heart rate are watched for 24–48 hours."
    },
    breastfeeding: {
      level: "caution",
      text: "Passes into milk in small amounts; generally considered compatible with breastfeeding (LactMed), but Kaplan advises caution for all beta-blockers. Watch the baby for drowsiness, poor feeding and slow breathing, especially preterm or young infants."
    },
    renal: {
      level: "none",
      text: "No dose change: propranolol is cleared by the liver. In severe kidney impairment start with a low dose and watch pulse and blood pressure, which may fall more easily."
    },
    hepatic: {
      level: "adjust",
      text: "Reduce the dose in liver disease: less is removed on first pass through the liver, so blood levels are much higher, and it can precipitate hepatic encephalopathy. Start at 10 mg once or twice daily and increase slowly with pulse checks; avoid in decompensated cirrhosis unless a specialist is using it for varices."
    },
    refs: [
      {
        book: "kaplan",
        text: "Contraindications listed: asthma, insulin-treated diabetes (blocks the response to hypoglycaemia), heart failure, significant vascular disease, persistent angina and hyperthyroidism; they can worsen heart block. All beta-blockers pass into breast milk.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.4 Anxiolytics (beta-adrenergic receptor antagonists), pdf p. 2130"
      }
    ],
    sources: [
      "BNF",
      "LactMed (NIH)",
      "WHO Model Formulary 2008",
      "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022"
    ]
  },
  "bromocriptine": {
    pregnancy: {
      level: "avoid",
      text: "Kaplan lists dopamine agonists as contraindicated in pregnancy. Stop when pregnancy is confirmed unless a specialist is treating a prolactinoma. In life-threatening neuroleptic malignant syndrome in a pregnant woman, specialist advice may still support its use. Remember that lowering prolactin restores fertility: discuss contraception before starting."
    },
    breastfeeding: {
      level: "avoid",
      text: "Suppresses milk production (Kaplan). Do not use in a breastfeeding mother, and do not use routinely to stop lactation after birth: hypertension, stroke, seizures, heart attack and postpartum psychosis have been reported."
    },
    renal: {
      level: "none",
      text: "No dose change: mainly cleared by the liver and bile."
    },
    hepatic: {
      level: "adjust",
      text: "Use with caution and at lower doses in liver disease (Kaplan): it is extensively metabolised by the liver, so levels and side effects (low blood pressure, confusion) increase. Increase the dose slowly."
    },
    refs: [
      {
        book: "kaplan",
        text: "Dopamine agonists are listed as contraindicated in pregnancy and especially in nursing mothers because they suppress milk; ergot alkaloids with bromocriptine may cause hypertension and heart attack.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2224"
      }
    ],
    sources: [
      "BNF",
      "Bromocriptine product information (SmPC)",
      "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022"
    ]
  },
  "cyproheptadine": {
    pregnancy: {
      level: "caution",
      text: "Kaplan advises pregnant women to avoid antihistamines because of possible teratogenicity. For moderate or severe serotonin syndrome, which is dangerous to mother and fetus, a short course is reasonable when benzodiazepines and cooling are not enough. Do not use it for appetite or allergy in pregnancy."
    },
    breastfeeding: {
      level: "caution",
      text: "Antihistamines pass into milk and Kaplan advises nursing mothers to avoid them; cyproheptadine can also reduce milk supply and sedate the baby. For a short course for serotonin syndrome, the mother is usually too unwell to breastfeed: express and discard if needed, and restart breastfeeding when she is well and the drug has stopped (about 24 hours after the last dose)."
    },
    renal: {
      level: "none",
      text: "No specific dose change is established. Its metabolites are excreted in urine, so in severe kidney impairment use the lowest effective dose and watch for sedation and anticholinergic effects."
    },
    hepatic: {
      level: "adjust",
      text: "Metabolised by the liver: in cirrhosis levels can rise with repeated doses (Kaplan, for sedating antihistamines). Use smaller doses and watch sedation; avoid in severe liver disease or hepatic encephalopathy unless the benefit is clear."
    },
    refs: [
      {
        book: "kaplan",
        text: "Antihistamines pass into breast milk, so nursing mothers should avoid them; because of possible teratogenicity pregnant women should also avoid them. Overdose can be fatal.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs (antihistamines), pdf p. 2217"
      }
    ],
    sources: [
      "BNF",
      "LactMed (NIH)",
      "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022"
    ]
  },
  "chlordiazepoxide": {
    pregnancy: {
      level: "caution",
      text: "Alcohol withdrawal in pregnancy must be treated: untreated withdrawal and seizures harm mother and fetus. Use benzodiazepines short term at the lowest effective doses, preferably symptom-triggered, and admit. Regular use late in pregnancy can cause a floppy, sleepy newborn with breathing and feeding problems, and later neonatal withdrawal: tell the paediatric team. Refer for specialist antenatal and alcohol care."
    },
    breastfeeding: {
      level: "caution",
      text: "Passes into milk. Chlordiazepoxide and its active metabolites are long acting and can build up in the baby (sleepiness, poor feeding, weight loss). A short withdrawal course is usually acceptable with the baby watched; prefer a short-acting drug such as lorazepam where available, and avoid breastfeeding while the mother is heavily sedated or drinking."
    },
    renal: {
      level: "adjust",
      text: "Mainly cleared by the liver, but people with kidney impairment are more sensitive to sedation. Start with smaller doses, prefer symptom-triggered dosing, and hold doses when drowsy.",
      bands: [
        {
          below: 30,
          text: "Moderate to severe kidney impairment: start with smaller doses, use symptom-triggered dosing rather than a fixed schedule, and hold whenever drowsy."
        },
        {
          below: 10,
          text: "Severe kidney failure: give about half the usual dose (Renal Drug Handbook) and increase only by response; watch breathing and consciousness closely."
        }
      ]
    },
    hepatic: {
      level: "adjust",
      text: "Long half-life with active metabolites (Kaplan) that accumulate in liver disease; repeated doses can precipitate hepatic coma. Prefer lorazepam. If chlordiazepoxide is the only choice, use small symptom-triggered doses and never a fixed schedule; avoid in severe liver failure or hepatic encephalopathy."
    },
    refs: [
      {
        book: "kaplan",
        text: "Chlordiazepoxide, like diazepam, is long acting (half-life 30 to over 100 hours, longer in slow metabolisers), and only lorazepam and midazolam are reliably absorbed IM.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.4 Anxiolytics, pdf p. 2114"
      }
    ],
    sources: [
      "BNF",
      "The Renal Drug Handbook",
      "NICE CG100",
      "WHO Guidelines for the identification and management of substance use and substance use disorders in pregnancy, 2014",
      "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022"
    ]
  },
  "naltrexone": {
    pregnancy: {
      level: "avoid",
      text: "Crosses the placenta; Kaplan advises use only for compelling need. Opioid dependence in pregnancy: do not start naltrexone and do not attempt opioid withdrawal; refer for methadone maintenance (WHO 2009 and 2014). A woman who becomes pregnant while on naltrexone for alcohol dependence should see a specialist to weigh relapse risk against limited safety data."
    },
    breastfeeding: {
      level: "caution",
      text: "Kaplan states it is not known whether naltrexone enters milk; limited later data show small amounts. If used, watch the baby for poor feeding, irritability or vomiting, and discuss with a specialist."
    },
    renal: {
      level: "none",
      text: "No established dose change, but naltrexone and its active metabolite are excreted by the kidneys: use with caution in kidney impairment and watch for side effects."
    },
    hepatic: {
      level: "avoid",
      text: "Do not use in acute hepatitis or liver failure (Kaplan). Liver injury is dose-related, and 50 mg a day can be harmful in pre-existing liver disease such as alcoholic cirrhosis. With milder liver disease only with specialist advice and liver tests before and monthly for 6 months where available; stop if jaundice, dark urine or right upper abdominal pain appear."
    },
    refs: [
      {
        book: "kaplan",
        text: "Naltrexone crosses the placenta, so use in pregnancy only for compelling need; excretion in breast milk is not known.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.7 Drugs Used to Treat Substance Use Disorders, pdf p. 2181"
      },
      {
        book: "kaplan",
        text: "Liver injury is dose-related (mainly at 300 mg a day) but 50 mg may harm people with liver disease such as alcoholic cirrhosis; contraindicated in acute hepatitis or liver failure and in anyone taking opioids.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.7 Drugs Used to Treat Substance Use Disorders, pdf p. 2181"
      }
    ],
    sources: [
      "BNF",
      "WHO Guidelines for the psychosocially assisted pharmacological treatment of opioid dependence, 2009",
      "WHO Guidelines for the identification and management of substance use and substance use disorders in pregnancy, 2014",
      "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022"
    ]
  },
  "methadone": {
    pregnancy: {
      level: "safe",
      text: "Recommended for pregnant women with opioid dependence: methadone maintenance is safer than continued heroin use or withdrawal (WHO 2009 and 2014; Kaplan). Do not attempt withdrawal during pregnancy (Kaplan). Use the lowest effective dose; the dose often needs to rise in the third trimester, sometimes split into two doses. No known teratogenic effect (Kaplan). The baby may develop neonatal abstinence syndrome: plan observation after birth and never give naloxone to the newborn."
    },
    breastfeeding: {
      level: "caution",
      text: "Guidance differs. WHO (2014) encourages mothers on stable opioid agonist treatment to breastfeed unless the risks clearly outweigh the benefits; only small amounts pass into milk and breastfeeding may ease neonatal withdrawal. Kaplan advises mothers not to breastfeed while still taking methadone. In practice: support breastfeeding if the mother is stable, not using other drugs or alcohol, and follows HIV infant-feeding guidance; watch the baby for sleepiness, poor feeding and slow breathing, and do not stop breastfeeding abruptly."
    },
    renal: {
      level: "adjust",
      text: "Mostly cleared by the liver, but metabolites and some methadone are excreted in urine, and people with kidney failure are more sensitive to opioids. Increase doses slowly and watch sedation.",
      bands: [
        {
          below: 10,
          text: "Severe kidney failure: give about 50–75 % of the usual dose (Renal Drug Handbook) and titrate slowly by response, watching breathing and sedation; confirm with specialist."
        }
      ]
    },
    hepatic: {
      level: "adjust",
      text: "Overdose risk is higher in liver disease, especially during induction (Kaplan). Start low, increase slowly and assess sedation before each increase; in decompensated cirrhosis or hepatic encephalopathy seek specialist advice. Stable maintenance patients with hepatitis C or B usually continue their dose with monitoring."
    },
    refs: [
      {
        book: "kaplan",
        text: "In pregnancy use the lowest effective dose and do not attempt withdrawal; the third trimester may need a higher dose, sometimes split into two doses. Newborns may show tremor, high-pitched cry, poor feeding and seizures, often delayed.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.7 Drugs Used to Treat Substance Use Disorders, pdf p. 2168"
      },
      {
        book: "kaplan",
        text: "Kaplan advises women not to breastfeed while still taking methadone (some are counselled to use breastfeeding to wean the infant). WHO guidance differs: see safety text.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.7 Drugs Used to Treat Substance Use Disorders, pdf p. 2168"
      },
      {
        book: "kaplan",
        text: "Overdose risk is greatest during induction and in liver disease; deaths have occurred in the first week at only 50–60 mg a day.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.7 Drugs Used to Treat Substance Use Disorders, pdf p. 2171"
      }
    ],
    sources: [
      "WHO Guidelines for the psychosocially assisted pharmacological treatment of opioid dependence, 2009",
      "WHO Guidelines for the identification and management of substance use and substance use disorders in pregnancy, 2014",
      "BNF",
      "The Renal Drug Handbook",
      "LactMed (NIH)",
      "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022"
    ]
  },
  "sertraline": {
    pregnancy: {
      level: "caution",
      text: "Usually the preferred antidepressant when depression in pregnancy needs medicine. No significant increase in major malformations with SSRIs other than paroxetine (Kaplan), and stopping treatment often leads to relapse. Late-pregnancy use can cause neonatal adaptation symptoms (jitteriness, poor feeding, fast breathing) and a small risk of persistent pulmonary hypertension of the newborn: use the lowest effective dose, tell the delivery team and observe the baby for the first days."
    },
    breastfeeding: {
      level: "safe",
      text: "Preferred antidepressant in breastfeeding: very low levels in milk and infant blood (Kaplan). Watch young or preterm babies for drowsiness, poor feeding or irritability."
    },
    renal: {
      level: "none",
      text: "No dose change in kidney impairment. Start low and increase slowly in older people; low sodium is more likely with diuretics."
    },
    hepatic: {
      level: "adjust",
      text: "Cleared by the liver: in mild to moderate liver disease use a lower dose or less frequent dosing (BNF) and increase slowly. Avoid in severe liver disease."
    },
    refs: [
      {
        book: "kaplan",
        text: "Apart from paroxetine, SSRIs show no significant increase in major malformations, while stopping antidepressants in pregnancy leads to very high relapse rates.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, SSRIs, pdf p. 1979"
      },
      {
        book: "kaplan",
        text: "Sertraline and escitalopram concentrations in breast milk are especially low, and no harm has been found in breastfed babies.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, SSRIs, pdf p. 1980"
      }
    ],
    sources: [
      "BNF: sertraline",
      "LactMed (NIH): sertraline",
      "NICE CG192 Antenatal and postnatal mental health (2014, updated 2020)",
      "WHO mhGAP Intervention Guide 2.0"
    ]
  },
  "escitalopram": {
    pregnancy: {
      level: "caution",
      text: "SSRIs other than paroxetine are considered acceptable when needed (Kaplan). If starting an antidepressant in pregnancy, sertraline is usually preferred because there is more experience; a woman already well on escitalopram can usually continue. Neonatal adaptation symptoms and a small risk of persistent pulmonary hypertension of the newborn with late-pregnancy use."
    },
    breastfeeding: {
      level: "caution",
      text: "Low levels in milk (Kaplan) and generally considered acceptable, but sertraline is preferred when starting treatment after birth. Watch the baby for drowsiness and poor feeding."
    },
    renal: {
      level: "none",
      text: "No dose change in mild to moderate kidney impairment. Severe impairment (CrCl below 30 mL/min): use with caution (BNF).",
      bands: [
        {
          below: 30,
          text: "Severe kidney impairment: use escitalopram with caution. Start at 5 mg daily, increase slowly and watch for confusion or low sodium (confirm with local protocol)."
        }
      ]
    },
    hepatic: {
      level: "adjust",
      text: "Mild to moderate liver impairment: start 5 mg daily for 2 weeks, maximum 10 mg daily (BNF). Severe impairment: titrate very carefully or choose another drug."
    },
    refs: [
      {
        book: "kaplan",
        text: "Except for paroxetine, SSRIs are safe in pregnancy when needed; transient QTc prolongation has been seen in exposed newborns.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, SSRIs, pdf p. 1996"
      },
      {
        book: "kaplan",
        text: "Sertraline and escitalopram concentrations in breast milk are especially low.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, SSRIs, pdf p. 1980"
      }
    ],
    sources: [
      "BNF: escitalopram",
      "LactMed (NIH): escitalopram",
      "Escitalopram product information (QT and hepatic dosing)"
    ]
  },
  "imipramine": {
    pregnancy: {
      level: "caution",
      text: "No clear malformation link after long use, but neonatal withdrawal (jitteriness, fast breathing, poor feeding) and anticholinergic effects can follow use near delivery. For new depression treatment in pregnancy prefer an SSRI such as sertraline, which is safer in overdose."
    },
    breastfeeding: {
      level: "caution",
      text: "Small amounts in milk; generally considered compatible, but watch the baby for drowsiness and poor feeding. Sertraline is preferred when starting an antidepressant after birth."
    },
    renal: {
      level: "none",
      text: "No dose change; use with caution in severe kidney impairment and start low in older people (postural hypotension, urinary retention, confusion)."
    },
    hepatic: {
      level: "adjust",
      text: "Metabolised by the liver: start low and increase slowly. Avoid in severe liver disease (sedation can precipitate hepatic encephalopathy)."
    },
    refs: [
      {
        book: "kaplan",
        text: "Obtain an ECG before tricyclic treatment; they are contraindicated with a QTc over 450 ms.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, tricyclics, pdf p. 2030"
      }
    ],
    sources: [
      "BNF: imipramine hydrochloride",
      "LactMed (NIH): imipramine",
      "WHO Model Formulary 2008"
    ]
  },
  "mirtazapine": {
    pregnancy: {
      level: "caution",
      text: "Limited data; no clear malformation signal in published cohorts, but Kaplan advises caution because fetal data are lacking. Use only if an SSRI is unsuitable; neonatal adaptation symptoms are possible after late-pregnancy use."
    },
    breastfeeding: {
      level: "caution",
      text: "Kaplan says nursing mothers should not take it because it may pass into milk. Lactation references (LactMed) report low infant levels and consider it usually acceptable. Prefer sertraline; if mirtazapine is needed, watch the baby for drowsiness, poor feeding and weight gain."
    },
    renal: {
      level: "adjust",
      text: "Clearance falls by up to 50 percent in kidney impairment (Kaplan): start 7.5–15 mg at night and increase slowly.",
      bands: [
        {
          below: 40,
          text: "Moderate kidney impairment: clearance about 30 percent lower. Start 7.5–15 mg at night and increase more slowly than usual; watch for oversedation."
        },
        {
          below: 10,
          text: "Severe kidney impairment: clearance about half. Use the lowest effective dose (start 7.5 mg at night), increase only with close review of sedation and falls."
        }
      ]
    },
    hepatic: {
      level: "adjust",
      text: "Clearance falls by up to 30 percent in liver impairment (Kaplan): start low and increase slowly. Stop if jaundice develops."
    },
    refs: [
      {
        book: "kaplan",
        text: "Mirtazapine clearance falls by up to 30 percent in liver impairment and up to 50 percent in kidney impairment.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, mirtazapine, pdf p. 2011"
      },
      {
        book: "kaplan",
        text: "Use cautiously in pregnancy (no fetal data); Kaplan says it should not be taken by nursing mothers.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, mirtazapine, pdf p. 2014"
      }
    ],
    sources: [
      "BNF: mirtazapine",
      "Mirtazapine product information (renal and hepatic clearance)",
      "LactMed (NIH): mirtazapine"
    ]
  },
  "lamotrigine": {
    pregnancy: {
      level: "caution",
      text: "The preferred mood stabiliser and one of the preferred antiepileptics in pregnancy; far safer than valproate. Kaplan notes a possible link with oral clefts in the first trimester. Give folic acid before and during pregnancy. Levels fall markedly during pregnancy (seizures or mood relapse): review the dose each trimester, and reduce back towards the pre-pregnancy dose soon after delivery to avoid toxicity (dizziness, double vision, unsteadiness). Confirm with local protocol."
    },
    breastfeeding: {
      level: "caution",
      text: "Passes into milk and infant levels can be substantial. Breastfeeding is usually continued: watch the baby for rash, drowsiness, poor feeding and poor weight gain, especially in the first weeks and after maternal dose reductions after delivery."
    },
    renal: {
      level: "adjust",
      text: "Mostly excreted in urine as inactive metabolite: use a lower maintenance dose in kidney impairment (Kaplan) and increase slowly.",
      bands: [
        {
          below: 30,
          text: "Significant kidney impairment: titrate with the usual slow schedule but aim for a lower maintenance dose; watch for dizziness, unsteadiness and double vision (confirm with local protocol)."
        }
      ]
    },
    hepatic: {
      level: "adjust",
      text: "Moderate liver impairment: reduce starting, escalation and maintenance doses by about 50 percent; severe impairment by about 75 percent (product information). Adjust further by response."
    },
    refs: [
      {
        book: "kaplan",
        text: "First-trimester lamotrigine may be linked with oral clefts; valproate and carbamazepine with neural tube defects.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 General Principles of Psychopharmacology, pregnancy, pdf p. 1920"
      },
      {
        book: "kaplan",
        text: "People with kidney impairment should aim for a lower lamotrigine maintenance dose.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, lamotrigine, pdf p. 2084"
      }
    ],
    sources: [
      "BNF: lamotrigine",
      "Lamotrigine product information (hepatic impairment)",
      "NICE CG192 Antenatal and postnatal mental health",
      "MHRA 2021 review: antiepileptic drugs in pregnancy",
      "LactMed (NIH): lamotrigine"
    ]
  },
  "methylphenidate": {
    pregnancy: {
      level: "avoid",
      text: "Kaplan advises avoiding stimulants in pregnancy, especially the first trimester. Usually stop when pregnancy is planned or confirmed; continue only on specialist advice where untreated ADHD causes serious harm (e.g. driving risk)."
    },
    breastfeeding: {
      level: "caution",
      text: "Passes into milk (Kaplan) in small amounts. If used, watch the baby for poor feeding, irritability, poor sleep and weight gain; specialist advice."
    },
    renal: {
      level: "adjust",
      text: "No specific dose bands. Kaplan advises assessing kidney function and using lower doses when elimination is impaired: start at the lowest dose and increase slowly with BP and pulse checks."
    },
    hepatic: {
      level: "adjust",
      text: "No specific dose bands. Kaplan advises assessing liver function and reducing doses when metabolism is impaired: start low and titrate slowly."
    },
    refs: [
      {
        book: "kaplan",
        text: "Stimulants should be avoided in pregnancy, especially the first trimester; methylphenidate passes into breast milk.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.6 Stimulants, pdf p. 2159"
      },
      {
        book: "kaplan",
        text: "Assess liver and kidney function before starting and reduce stimulant doses in impaired metabolism.",
        ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.6 Stimulants, pdf p. 2160"
      }
    ],
    sources: [
      "BNF and BNF for Children: methylphenidate",
      "LactMed (NIH): methylphenidate",
      "NICE NG87 ADHD (2018, updated 2019)"
    ]
  },

  /* ---- visceral leishmaniasis ---- */
  "liposomal-amphotericin-b": {
    pregnancy: {
      level: "caution",
      text: "This is the drug to use if VL must be treated in pregnancy: WHO states that the current literature favours liposomal amphotericin B for VL in pregnant women. Untreated VL threatens mother, fetus and newborn far more than the drug does — spontaneous abortion, small-for-gestational-age babies and congenital leishmaniasis are all described. Miltefosine must NOT be added (teratogenic), and pentavalent antimonials are contraindicated, so a pregnant woman with VL–HIV gets L-AMB alone. Discuss the decision with the woman, and record the outcome in a pregnancy register as the guideline asks. If she received it in the last month of pregnancy, check the newborn's renal function."
    },
    breastfeeding: {
      level: "caution",
      text: "WHO's guidance is that breastfeeding should be avoided unless it is vital. In a setting where replacement feeding is not safe, affordable or feasible, 'vital' usually applies — weigh the real risk of not breastfeeding against a drug that is very poorly absorbed from the gut. Decide with the mother and the national infant feeding policy."
    },
    renal: {
      level: "adjust",
      text: "Nephrotoxic, though far less so than amphotericin B deoxycholate. Check creatinine, and potassium where possible, once or twice weekly through the course. If renal function deteriorates, WHO's instruction is to halve the dose for a few days — not to stop the course. Replace potassium and magnesium, adjusted to the results. Keep the patient hydrated and avoid other nephrotoxic drugs (tenofovir, gentamicin, paromomycin) where there is a choice.",
      bands: [
        {
          below: 60,
          text: "Reduced kidney function: no fixed dose reduction, but check creatinine and potassium twice weekly rather than once, give oral potassium routinely, and keep the patient well hydrated before each infusion."
        },
        {
          below: 30,
          text: "Severe impairment: halve the dose for a few days if creatinine is rising, then return to 5 mg/kg if it settles. Watch urine output every shift. Get senior or pharmacist advice before continuing; the cumulative dose still has to be reached for cure."
        }
      ]
    },
    hepatic: {
      level: "none",
      text: "No dose change is specified. Raised alkaline phosphatase and transaminases and bilirubinaemia are recognised. Check liver tests where the laboratory can do them, and look for jaundice clinically."
    },
    refs: [
      {
        book: "whovl",
        text: "The current literature favours liposomal amphotericin B for treating VL in pregnant women.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.6 Special situations — pregnancy, pdf p. 46",
        pdf_page: 46,
        quote: "The current literature favours the use of liposomal amphotericin B for the treatment of VL in pregnant women"
      },
      {
        book: "whovl",
        text: "A fatal outcome of VL for mother, fetus and newborn is a much greater threat than the risk of adverse effects.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.6 Special situations — pregnancy, pdf p. 46",
        pdf_page: 46,
        quote: "The threat of a fatal outcome of VL for the mother"
      },
      {
        book: "whovl",
        text: "L-AMB has the highest therapeutic index and is safe to give at any age.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.6 Special situations — children, pdf p. 46",
        pdf_page: 46,
        quote: "L-AMB has the highest therapeutic index and is safe to administer to all age groups."
      },
      {
        book: "whovl",
        text: "Breastfeeding should be avoided unless it is vital.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.1 Liposomal amphotericin B — administration, pdf p. 55",
        pdf_page: 55,
        quote: "Breast-feeding should be avoided unless it is vital."
      },
      {
        book: "whovl",
        text: "Creatinine and, if possible, potassium should be monitored once or twice weekly, with potassium and magnesium replacement adjusted accordingly.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.1 Liposomal amphotericin B — administration, pdf p. 55",
        pdf_page: 55,
        quote: "Serum creatinine levels and, if possible, serum potassium levels should be monitored"
      },
      {
        book: "whovl",
        text: "If renal function deteriorates the dose should be halved for a few days.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.1 Liposomal amphotericin B — administration, pdf p. 55",
        pdf_page: 55,
        quote: "If renal function deteriorates, the dose should be halved for a few days."
      },
      {
        book: "whovl",
        text: "Renal dysfunction should be checked in the newborn if the drug was given in the last month of pregnancy.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.1 Liposomal amphotericin B — administration, pdf p. 55",
        pdf_page: 55,
        quote: "Renal dysfunction should be checked in newborns if the drug was administered"
      },
      {
        book: "whovl",
        text: "Lipid formulations are about as effective as amphotericin B deoxycholate but significantly less toxic.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2 Information on leishmanial medicines, pdf p. 55",
        pdf_page: 55,
        quote: "efficacy similar to that of amphotericin B deoxycholate but which are significantly less toxic"
      }
    ],
    sources: [
      "WHO guideline on VL in HIV co-infected patients, 2022",
      "AmBisome product information",
      "WHO Model Formulary"
    ]
  },
  "amphotericin-b-deoxycholate": {
    pregnancy: {
      level: "caution",
      text: "Amphotericin B deoxycholate and the lipid formulations have both been used to treat VL in pregnancy, but the literature favours the liposomal form — use L-AMB if you can get it at all. If this is the only amphotericin available, treating is still right: untreated VL threatens the mother, the fetus and the newborn far more. Miltefosine must not be added and antimonials are contraindicated. Pre-hydrate with saline, replace potassium, and record the pregnancy outcome."
    },
    breastfeeding: {
      level: "caution",
      text: "No data specific to this formulation in the guideline; WHO's advice for amphotericin B products is that breastfeeding should be avoided unless it is vital. It is very poorly absorbed from the infant gut. Decide with the mother and the national infant feeding policy."
    },
    renal: {
      level: "adjust",
      text: "Markedly nephrotoxic — this is the main reason to prefer the liposomal form. Decreased renal function with azotaemia, hypokalaemia, renal tubular acidosis and nephrocalcinosis is very common; it usually improves when the drug is stopped but can be permanent, especially after large cumulative amounts (over 5 g) or with other nephrotoxic drugs. Pre-load with 0.9 % saline before every dose unless the patient has heart failure. Check creatinine and potassium at baseline and at least twice weekly; replace potassium and magnesium routinely.",
      bands: [
        {
          below: 60,
          text: "Reduced kidney function: give the saline pre-load before every dose, check creatinine and potassium twice weekly, replace potassium routinely, and stop any other nephrotoxic drug you can."
        },
        {
          below: 30,
          text: "Severe impairment: switch to liposomal amphotericin B if it can be obtained at all — it is the whole point of the lipid formulation. If it cannot, give alternate-day dosing, halve the dose while creatinine is rising, and get senior or pharmacist advice. Hold the dose for oliguria."
        }
      ]
    },
    hepatic: {
      level: "none",
      text: "No dose adjustment is defined. Acute liver failure, hepatitis and jaundice are recognised, though uncommon. Check liver tests where possible and look for jaundice; stop and get advice if the patient becomes jaundiced."
    },
    refs: [
      {
        book: "whovl",
        text: "In pregnancy, amphotericin B deoxycholate and the lipid formulations have generally been used, with the literature favouring the liposomal form.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.6 Special situations — pregnancy, pdf p. 46",
        pdf_page: 46,
        quote: "The current literature favours the use of liposomal amphotericin B for the treatment of VL in pregnant women"
      },
      {
        book: "whovl",
        text: "Reduced renal function with azotaemia, hypokalaemia, renal tubular acidosis and nephrocalcinosis is very common and can be permanent after large cumulative amounts or with other nephrotoxic drugs.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 85",
        pdf_page: 85,
        quote: "Decreased renal function and renal function abnormalities, including azotaemia, hypokalaemia"
      },
      {
        book: "whovl",
        text: "Acute renal failure, anuria and oliguria are recognised adverse effects.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 85",
        pdf_page: 85,
        quote: "Acute renal failure, anuria, oliguria"
      },
      {
        book: "whovl",
        text: "Fever with shaking chills typically starts within 15–20 minutes of starting the infusion.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 85",
        pdf_page: 85,
        quote: "usually within 15-20 min of initiation of treatment"
      },
      {
        book: "whovl",
        text: "Lipid formulations have similar efficacy but are significantly less toxic than amphotericin B deoxycholate.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2 Information on leishmanial medicines, pdf p. 55",
        pdf_page: 55,
        quote: "efficacy similar to that of amphotericin B deoxycholate but which are significantly less toxic"
      },
      {
        book: "whovl",
        text: "Concurrent use with other nephrotoxic medicines increases renal toxicity and requires intensive monitoring.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.1 Drug interactions, pdf p. 60",
        pdf_page: 60,
        quote: "Concurrent use of amphotericin B and other nephrotoxic medications may enhance potential drug-induced renal toxicity."
      }
    ],
    sources: [
      "WHO guideline on VL in HIV co-infected patients, 2022",
      "WHO Expert Committee on the Control of Leishmaniases, TRS 949, 2010",
      "Amphotericin B product information"
    ]
  },
  "sodium-stibogluconate": {
    pregnancy: {
      level: "avoid",
      text: "Contraindicated. Pentavalent antimonials can cause spontaneous abortion, preterm delivery, hepatic encephalopathy in the mother, and vertical transmission. Treat VL in pregnancy with liposomal amphotericin B instead — do not delay treating, because untreated VL is more dangerous to mother and baby than the drug used to treat it. Ask about the date of the last period before the first injection in any woman who could be pregnant."
    },
    breastfeeding: {
      level: "caution",
      text: "The guideline gives no data on antimonials in breastfeeding. Antimony is excreted by the kidneys and little is known about milk transfer. Where VL in a breastfeeding mother needs treating, liposomal amphotericin B is the better-documented choice. If an antimonial must be used, watch the infant for vomiting, poor feeding and jaundice, and confirm with the national protocol."
    },
    renal: {
      level: "adjust",
      text: "Antimony is cleared by the kidneys, so impaired function means accumulation and more cardiotoxicity and pancreatitis. Check creatinine before starting where possible and keep the patient hydrated. There is no validated dose reduction — the practical decision is usually to use liposomal amphotericin B instead. Never give it with another nephrotoxic drug unless there is no alternative.",
      bands: [
        {
          below: 60,
          text: "Reduced kidney function: use only if no alternative exists. Hydrate, monitor creatinine twice weekly, take a 60-second pulse before every dose, and get an ECG before the first dose and weekly if a machine exists."
        },
        {
          below: 30,
          text: "Severe impairment: avoid. Use liposomal amphotericin B. If there is genuinely no alternative, this is a senior decision with ECG monitoring."
        }
      ]
    },
    hepatic: {
      level: "adjust",
      text: "Hepatotoxic: jaundice and raised liver enzymes are common, and hepatic encephalopathy is described in pregnancy. Avoid in established liver disease and in a patient who is already jaundiced. Look at the eyes for jaundice before every dose where no laboratory exists, and stop for new jaundice."
    },
    refs: [
      {
        book: "whovl",
        text: "Pentavalent antimonials are contraindicated in pregnancy — spontaneous abortion, preterm delivery, maternal hepatic encephalopathy and vertical transmission.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.6 Special situations, footnote, pdf p. 46",
        pdf_page: 46,
        quote: "Pentavalent antimonials are contraindicated in pregnancy"
      },
      {
        book: "whovl",
        text: "Fatal cardiac arrhythmia and ECG changes including QT prolongation and T-wave inversion are listed adverse effects.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 86",
        pdf_page: 86,
        quote: "Fatal cardiac arrhythmia, changes"
      },
      {
        book: "whovl",
        text: "A transient rise in serum lipase and amylase and symptomatic pancreatitis are very common.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 86",
        pdf_page: 86,
        quote: "Transient rise in serum lipase and amylase, symptomatic pancreatitis"
      },
      {
        book: "whovl",
        text: "Yellow skin and eyes, fever, rash, myalgia and injection-site pain are very common.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 86",
        pdf_page: 86,
        quote: "pain at injection site if"
      },
      {
        book: "whovl",
        text: "Antimonials are more toxic in HIV patients and require careful monitoring for pancreatitis and cardiotoxicity.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.5 Rescue treatment, pdf p. 45",
        pdf_page: 45,
        quote: "As antimonials are more toxic in HIV patients, they must be carefully monitored for pancreatitis and cardiotoxicity."
      },
      {
        book: "whovl",
        text: "Sodium stibogluconate is known to be highly toxic in HIV patients, with a cure rate of only 43 % in an Ethiopian VL–HIV series.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 3.3 VL–HIV coinfection in East Africa, pdf p. 28",
        pdf_page: 28,
        quote: "which is known to be highly toxic in HIV patients"
      }
    ],
    sources: [
      "WHO guideline on VL in HIV co-infected patients, 2022",
      "WHO Expert Committee on the Control of Leishmaniases, TRS 949, 2010",
      "Ethiopian national kala-azar guideline — confirm current edition"
    ]
  },
  miltefosine: {
    pregnancy: {
      level: "avoid",
      text: "CONTRAINDICATED — it is embryotoxic and teratogenic, with fetal death and malformation in animals at doses below the maximum recommended human dose. Get a urine or serum pregnancy test before the first capsule in any woman of reproductive age. Do not prescribe it to a woman of childbearing potential unless effective contraception is assured for the whole course AND for 5 months after the last dose. Vomiting and diarrhoea on the drug can stop an oral contraceptive working, so an implant, an injectable or an added barrier method is needed. If contraception cannot be assured, WHO's alternative is liposomal amphotericin B alone up to 40 mg/kg. If a pregnancy occurs, record it in the centre's pregnancy register."
    },
    breastfeeding: {
      level: "avoid",
      text: "Either the drug or nursing should be stopped after a risk–benefit discussion, and breastfeeding should be avoided for 5 months after treatment because of the long half-life. In a setting where replacement feeding is not safe or affordable, that is a serious trade-off: treating the mother with liposomal amphotericin B alone may be the better answer. Discuss with the mother and follow the national infant feeding policy."
    },
    renal: {
      level: "adjust",
      text: "A rise in serum creatinine and blood urea was seen in the leishmaniasis trials, and WHO recommends regular monitoring of renal function. No validated dose reduction exists for impaired kidneys. Check creatinine at baseline and during the course where possible; keep the patient hydrated, because the vomiting and diarrhoea the drug causes lead to volume depletion, which is often the real reason creatinine rises.",
      bands: [
        {
          below: 60,
          text: "Reduced kidney function: no defined dose change. Monitor creatinine during the course, push oral fluids, and treat vomiting and diarrhoea actively rather than letting the patient dehydrate."
        },
        {
          below: 30,
          text: "Severe impairment: no dosing data. Get senior or pharmacist advice before starting, monitor creatinine closely, and consider L-AMB monotherapy instead."
        }
      ]
    },
    hepatic: {
      level: "adjust",
      text: "Raised alanine and aspartate transaminases and raised bilirubin were seen in the VL trials. WHO advises monitoring transaminases and bilirubin during treatment. No defined dose reduction; in established liver disease start only with senior advice, watch for jaundice clinically at every visit, and stop for new jaundice or a rapidly rising bilirubin."
    },
    refs: [
      {
        book: "whovl",
        text: "Miltefosine may harm the fetus and is contraindicated in pregnant women; obtain a pregnancy test before giving it to a woman of reproductive age.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.2 Miltefosine — contraindications, pdf p. 57",
        pdf_page: 57,
        quote: "Miltefosine may harm the fetus and is thus contraindicated in pregnant women."
      },
      {
        book: "whovl",
        text: "It must not be prescribed to a woman of childbearing potential unless adequate contraception can be assured for the whole treatment and for 5 months afterwards.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.2 Miltefosine — contraindications, pdf p. 58",
        pdf_page: 58,
        quote: "adequate contraception cannot be assured for the duration of treatment"
      },
      {
        book: "whovl",
        text: "Breastfeeding should be avoided for 5 months after treatment.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.2 Miltefosine — warnings, pdf p. 58",
        pdf_page: 58,
        quote: "Breastfeeding should be avoided for 5 months after treatment."
      },
      {
        book: "whovl",
        text: "Vomiting and diarrhoea during miltefosine therapy may stop an oral contraceptive from being absorbed, so an additional non-hormonal method is advised.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.2 Miltefosine — gastrointestinal effects, pdf p. 59",
        pdf_page: 59,
        quote: "may affect the absorption of oral contraceptives"
      },
      {
        book: "whovl",
        text: "Increased serum creatinine was noted in the leishmaniasis trials and regular monitoring of renal function is recommended.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.2 Miltefosine — renal effects, pdf p. 58",
        pdf_page: 58,
        quote: "Regular monitoring of renal function is recommended."
      },
      {
        book: "whovl",
        text: "Side effects include abnormalities in liver and kidney tests, alongside the common nausea, vomiting, diarrhoea, abdominal pain, dizziness and headache; transaminases and bilirubin should be monitored.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.2 Miltefosine — adverse effects, pdf p. 58",
        pdf_page: 58,
        quote: "abnormalities in liver or kidney tests"
      },
      {
        book: "whovl",
        text: "Ensure access to contraception and pregnancy testing for women of childbearing potential before miltefosine is given.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Recommendations — considerations, pdf p. 13",
        pdf_page: 13,
        quote: "Ensure access to contraception and pregnancy testing for women of child-bearing potential"
      },
      {
        book: "whovl",
        text: "Where miltefosine is contraindicated, WHO's alternative is L-AMB monotherapy up to a total of 40 mg/kg.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.2 Recommendations — remarks, pdf p. 35",
        pdf_page: 35,
        quote: "When miltefosine is not available or is contraindicated, consider using monotherapy with L-AMB"
      }
    ],
    sources: [
      "WHO guideline on VL in HIV co-infected patients, 2022",
      "Miltefosine (Impavido) product information"
    ]
  },
  paromomycin: {
    pregnancy: {
      level: "caution",
      text: "There are insufficient data on paromomycin in pregnancy, and fetal ototoxicity is the main concern — as with any aminoglycoside. Liposomal amphotericin B is the drug WHO's guideline points to for VL in pregnancy, so use that instead where it can be obtained. If paromomycin is the only option, the untreated disease is still the greater danger to mother and baby: treat, keep the course as short as the protocol allows, and record the pregnancy outcome in the centre's register."
    },
    breastfeeding: {
      level: "caution",
      text: "No data in the guideline. Aminoglycosides are very poorly absorbed from the infant gut, so significant systemic exposure through milk is unlikely. Watch the infant for diarrhoea and thrush. Confirm with the national protocol; do not stop breastfeeding on the strength of this drug alone where replacement feeding is unsafe."
    },
    renal: {
      level: "adjust",
      text: "An aminoglycoside: nephrotoxic, and cleared by the kidneys, so impaired function means accumulation and more ototoxicity. Proteinuria is a recognised adverse effect — dipstick the urine before starting and twice weekly, and keep a fluid balance chart. Check creatinine at baseline and mid-course where the laboratory can. As with other aminoglycosides, lengthen the interval rather than cutting the dose, and get pharmacist advice before doing either. Avoid giving it with amphotericin B, gentamicin or tenofovir unless there is no alternative.",
      bands: [
        {
          below: 60,
          text: "Reduced kidney function: use only if there is no alternative. Dipstick for protein twice weekly, keep a fluid chart, check creatinine mid-course, and test hearing weekly with the whispered-voice test."
        },
        {
          below: 30,
          text: "Severe impairment: avoid. Liposomal amphotericin B is the alternative. If paromomycin is unavoidable, this is a senior and pharmacist decision, with lengthened intervals and close monitoring."
        }
      ]
    },
    hepatic: {
      level: "none",
      text: "No dose change. Transient rises in alanine and aspartate transaminases are common, and raised alkaline phosphatase and bilirubin are seen. Check liver tests where possible; look for jaundice clinically."
    },
    refs: [
      {
        book: "whovl",
        text: "With paromomycin the main concern in pregnancy is fetal ototoxicity, and there are insufficient data on its use in pregnant women.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.6 Special situations, footnote, pdf p. 46",
        pdf_page: 46,
        quote: "With paromomycin, ototoxicity in the fetus is the main concern."
      },
      {
        book: "whovl",
        text: "Injection-site swelling and abscess, ototoxicity, conductive deafness and proteinuria are recognised adverse effects.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 84",
        pdf_page: 84,
        quote: "Injection site swelling, abscess, ototoxicity, conductive deafness, proteinuria"
      },
      {
        book: "whovl",
        text: "Fever and a reversible abnormal audiogram are common findings on treatment.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 84",
        pdf_page: 84,
        quote: "Pyrexia, reversible abnormal audiogram"
      },
      {
        book: "whovl",
        text: "Transient increases in alanine and aspartate transaminases are recognised, with raised alkaline phosphatase and bilirubin.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 84",
        pdf_page: 84,
        quote: "Transient increases in alanine and aspartate"
      },
      {
        book: "whovl",
        text: "In pregnancy, the literature favours liposomal amphotericin B for treating VL.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.6 Special situations — pregnancy, pdf p. 46",
        pdf_page: 46,
        quote: "The current literature favours the use of liposomal amphotericin B for the treatment of VL in pregnant women"
      },
      {
        book: "whovl",
        text: "HIV-positive VL patients generally require higher doses of paromomycin and L-AMB.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 3.3 VL–HIV coinfection in East Africa, pdf p. 28",
        pdf_page: 28,
        quote: "they generally require higher doses of paromomycin and L-AMB"
      }
    ],
    sources: [
      "WHO guideline on VL in HIV co-infected patients, 2022",
      "WHO Expert Committee on the Control of Leishmaniases, TRS 949, 2010",
      "BNF; WHO Model Formulary"
    ]
  },

  /* ---- eye and vision ---- */
  "tetracycline-eye": {
    pregnancy: {
      level: "safe",
      text: "The 1 % eye ointment is acceptable in pregnancy. The warnings about tetracyclines in pregnancy (fetal tooth discolouration, effects on developing bone, maternal liver injury with large intravenous doses) relate to systemic treatment; almost nothing is absorbed from an ointment applied to the eye. Do not give oral tetracycline or doxycycline for trachoma in a pregnant woman — use azithromycin, or the ointment."
    },
    breastfeeding: {
      level: "safe",
      text: "Compatible. Systemic absorption from the eye is negligible and nothing meaningful reaches the milk. The baby's own eye prophylaxis at birth is a separate, single application to the baby."
    },
    renal: { level: "none", text: "No dose change. Topical ocular use does not produce systemic levels." },
    hepatic: { level: "none", text: "No dose change for topical ocular use." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "WHO trachoma (SAFE strategy) guidance", "LactMed (NIH)", "BNF"]
  },
  "ciprofloxacin-eye": {
    pregnancy: {
      level: "safe",
      text: "Topical ocular ciprofloxacin is acceptable in pregnancy, including for a sight-threatening corneal ulcer. Systemic absorption from drops is very low, and the cartilage concerns that attach to systemic fluoroquinolones in pregnancy and childhood do not apply to a drop. Do not withhold treatment of a corneal ulcer from a pregnant woman."
    },
    breastfeeding: {
      level: "safe",
      text: "Compatible. Amounts reaching milk after ocular use are negligible. Use punctal occlusion and continue breastfeeding."
    },
    renal: { level: "none", text: "No dose change for eye drops or eye ointment." },
    hepatic: { level: "none", text: "No dose change for topical ocular use." },
    refs: [],
    sources: [
      "WHO Model Formulary 2008",
      "LactMed (NIH)",
      "BNF",
      "AAO Preferred Practice Pattern: Bacterial Keratitis"
    ]
  },
  "atropine-eye": {
    pregnancy: {
      level: "caution",
      text: "Short courses for uveitis, corneal ulcer or eye trauma are acceptable when the eye needs them; the amount absorbed from one or two drops a day is small. Atropine does cross the placenta and can cause fetal tachycardia. Use 1 % sparingly, teach punctal occlusion, and avoid prolonged or repeated daily use (for example amblyopia penalisation) during pregnancy unless an ophthalmologist advises it. Prefer a shorter-acting cycloplegic (homatropine, cyclopentolate) if stocked."
    },
    breastfeeding: {
      level: "caution",
      text: "Occasional doses are acceptable. Anticholinergic drugs can reduce milk production with regular use, and small amounts pass into milk; watch the infant for irritability, flushing, a fast pulse, constipation or a dry mouth. Use punctal occlusion for 2 minutes and wipe the lids dry after every dose."
    },
    renal: { level: "none", text: "No dose change for topical ocular use." },
    hepatic: { level: "none", text: "No dose change for topical ocular use." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF and BNF for Children", "LactMed (NIH)"]
  },
  tropicamide: {
    pregnancy: {
      level: "caution",
      text: "A single diagnostic dilation is acceptable in pregnancy when the retina genuinely needs to be examined — for example diabetic retinopathy screening or suspected papilloedema. Use tropicamide alone if possible: phenylephrine is a systemic vasoconstrictor and can raise blood pressure, which matters in pre-eclampsia, so avoid it in a hypertensive pregnancy and never use the 10 % strength. Teach punctal occlusion."
    },
    breastfeeding: {
      level: "caution",
      text: "A single diagnostic dose is acceptable; amounts in milk are very small and the drug is short-acting. Use punctal occlusion, wipe the lids, and if you are worried, breastfeed just before the drops rather than interrupting feeding afterwards. Anticholinergics can reduce milk supply with repeated use, which does not apply to a one-off examination."
    },
    renal: { level: "none", text: "No dose change for topical ocular use." },
    hepatic: { level: "none", text: "No dose change for topical ocular use." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF and BNF for Children", "LactMed (NIH)"]
  },
  "timolol-eye": {
    pregnancy: {
      level: "caution",
      text: "Timolol drops produce real plasma beta-blockade. Systemic beta-blockers in pregnancy are associated with fetal growth restriction and fetal bradycardia, and near term with neonatal bradycardia, hypoglycaemia and respiratory depression. Do not leave glaucoma untreated — irreversible blindness is the alternative — but use the lowest strength (0.25 %) and lowest frequency that controls the pressure, teach punctal occlusion for 2 minutes after every drop, and discuss alternatives (laser, a prostaglandin analogue, brimonidine — which must be stopped before delivery and is avoided in infants) with the eye unit. Tell the paediatric team at delivery that the mother is on a beta-blocker, and check the newborn's heart rate and blood glucose."
    },
    breastfeeding: {
      level: "caution",
      text: "Timolol is excreted into breast milk and has been measured at higher concentrations in milk than in maternal plasma after ocular use, although the infant's calculated dose is small. It is usually considered compatible, with punctal occlusion. Watch the baby for a slow pulse, poor feeding, sleepiness, cold hands or wheeze, and have a lower threshold for stopping in a preterm or unwell infant."
    },
    renal: {
      level: "none",
      text: "No dose adjustment is possible or required for a drop, but the systemically absorbed fraction is cleared partly by the kidneys. In severe renal impairment watch the pulse and blood pressure more closely, and be alert to accumulation of beta-blockade (bradycardia, tiredness, dizziness on standing)."
    },
    hepatic: {
      level: "none",
      text: "No formal dose change. Timolol is metabolised by the liver (CYP2D6); in severe liver disease the absorbed fraction is cleared more slowly, so monitor pulse and blood pressure. Poor CYP2D6 metabolisers have higher levels whatever the liver function."
    },
    refs: [],
    sources: [
      "WHO Model Formulary 2008",
      "BNF — timolol maleate (ocular)",
      "LactMed (NIH)",
      "AAO Preferred Practice Pattern: Primary Open-Angle Glaucoma"
    ]
  },
  "pilocarpine-eye": {
    pregnancy: {
      level: "caution",
      text: "There are few data, but acute angle-closure glaucoma is a sight-threatening emergency and treatment should not be withheld from a pregnant woman. Short-term use as part of the emergency combination is acceptable. Teach punctal occlusion, and arrange definitive laser iridotomy, which is safe in pregnancy, rather than continuing drops for months."
    },
    breastfeeding: {
      level: "caution",
      text: "Little published information. Short-term use during an acute attack is acceptable; use punctal occlusion and wipe the lids. Watch the infant for sweating, diarrhoea, colic or a slow pulse if the mother is using it four times daily in both eyes over several days."
    },
    renal: { level: "none", text: "No dose change for topical ocular use." },
    hepatic: { level: "none", text: "No dose change for topical ocular use." },
    refs: [],
    sources: [
      "WHO Model Formulary 2008",
      "BNF",
      "AAO Preferred Practice Pattern: Primary Angle-Closure Disease"
    ]
  },
  acetazolamide: {
    pregnancy: {
      level: "avoid",
      text: "Avoid, particularly in the first trimester: acetazolamide is teratogenic in animals (limb defects) and there are human case reports of limb and renal anomalies, and of neonatal metabolic acidosis and electrolyte disturbance after use near term. The exception is an eye that is going blind: in acute angle-closure glaucoma or a sight-threatening pressure rise, give it — a single 500 mg dose to save an eye is a reasonable risk — document the reason, treat the attack definitively with laser as soon as possible, and tell the obstetric team. Do not use it for chronic glaucoma or for altitude sickness in pregnancy."
    },
    breastfeeding: {
      level: "caution",
      text: "Small amounts enter milk (the infant receives roughly 1–2 % of the maternal weight-adjusted dose) and it is generally considered compatible with breastfeeding, including for short courses. Watch the baby for drowsiness, poor feeding, fast breathing or reduced urine output, and prefer short courses. Avoid in a preterm or jaundiced newborn if there is an alternative."
    },
    renal: {
      level: "adjust",
      text: "Acetazolamide is eliminated unchanged by the kidneys. It accumulates in renal impairment, and it both causes a metabolic acidosis and loses its effect as kidney function falls. Keep courses short, keep the patient hydrated, and watch for drowsiness and deep fast breathing. Do not give it with high-dose aspirin at any level of kidney function.",
      bands: [
        {
          below: 50,
          text: "CrCl 10–50 mL/min: increase the dose interval — give 250 mg every 12 hours rather than every 6, and do not exceed 500 mg in 24 hours. Watch for acidosis (deep fast breathing, drowsiness), hypokalaemia and confusion. Review daily; stop as soon as the eye has been treated definitively."
        },
        {
          below: 10,
          text: "CrCl under 10 mL/min: AVOID. It accumulates, it will not lower the pressure effectively, and severe metabolic acidosis follows. Use topical pressure-lowering drugs and an osmotic agent with great care, and get the patient to an ophthalmologist urgently for laser or surgery."
        }
      ]
    },
    hepatic: {
      level: "avoid",
      text: "Avoid in cirrhosis and in significant liver impairment. Acetazolamide causes a metabolic acidosis and reduces the urinary excretion of ammonia, which can precipitate hepatic encephalopathy. If there is no alternative in a sight-threatening emergency, give a single dose only, watch the level of consciousness closely, and stop it."
    },
    refs: [],
    sources: [
      "WHO Model Formulary 2008",
      "BNF and BNF for Children — acetazolamide",
      "The Renal Drug Handbook",
      "LactMed (NIH)"
    ]
  },
  "prednisolone-eye": {
    pregnancy: {
      level: "safe",
      text: "Topical ocular corticosteroids are acceptable in pregnancy when there is a clear indication such as uveitis or after surgery. Systemic absorption is small and well below the doses of oral steroid used routinely in pregnancy. The danger of these drops is ocular, not obstetric: the diagnosis must be right, and the pressure must be checked if the course runs beyond 2 weeks."
    },
    breastfeeding: {
      level: "safe",
      text: "Compatible. Very little reaches the milk after ocular use. Use punctal occlusion for 2 minutes and continue breastfeeding."
    },
    renal: { level: "none", text: "No dose change for topical ocular use." },
    hepatic: { level: "none", text: "No dose change for topical ocular use." },
    refs: [],
    sources: [
      "WHO Model Formulary 2008",
      "LactMed (NIH)",
      "BNF",
      "AAO Basic and Clinical Science Course, Section 9: Uveitis and Ocular Inflammation"
    ]
  },
  "tetracaine-eye": {
    pregnancy: {
      level: "safe",
      text: "A drop or two for an examination or a procedure is acceptable at any stage of pregnancy; systemic absorption is minimal and the drug is short-acting. The rule that matters is the same as for everyone else: it is used in the clinic, for a procedure, and it is never dispensed."
    },
    breastfeeding: {
      level: "safe",
      text: "Compatible. Amounts reaching milk after a single ocular dose are negligible; there is no need to interrupt feeding."
    },
    renal: { level: "none", text: "No dose change for topical ocular use." },
    hepatic: {
      level: "none",
      text: "No dose change. Ester anaesthetics are broken down by plasma cholinesterase rather than by the liver."
    },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF", "LactMed (NIH)"]
  },
  fluorescein: {
    pregnancy: {
      level: "safe",
      text: "Topical fluorescein used as a diagnostic stain is acceptable in pregnancy; systemic absorption from an intact or even an abraded eye is negligible. This is not the same as INTRAVENOUS fluorescein angiography, which is a different procedure with a different risk discussion."
    },
    breastfeeding: {
      level: "safe",
      text: "Compatible; no interruption of breastfeeding is needed after topical use. (After intravenous fluorescein angiography some units advise discarding milk for a short period — that does not apply to a strip or a drop.)"
    },
    renal: { level: "none", text: "No dose change for topical ocular use." },
    hepatic: { level: "none", text: "No dose change for topical ocular use." },
    refs: [],
    sources: ["WHO Model Formulary 2008", "BNF", "LactMed (NIH)"]
  },
  "povidone-iodine": {
    pregnancy: {
      level: "caution",
      text: "A single application for antisepsis before an eye procedure is acceptable. Iodine crosses the placenta and repeated or prolonged application over large areas can suppress the fetal thyroid, so avoid repeated iodine antisepsis in pregnancy and prefer chlorhexidine where an equivalent alternative exists. Check the strength: 10 % is for skin, 5 % for the conjunctival sac, 2.5 % for a newborn's eye."
    },
    breastfeeding: {
      level: "caution",
      text: "Iodine is concentrated in breast milk and repeated maternal application can raise the infant's iodine load and affect the infant's thyroid, particularly in a preterm baby. A single application for an eye procedure is acceptable; avoid repeated or prolonged use over large skin areas while breastfeeding, and use chlorhexidine instead where possible."
    },
    renal: {
      level: "none",
      text: "No dose change. Iodine absorbed after repeated application is excreted by the kidneys and can accumulate in severe renal impairment, so avoid repeated large-area application; single ocular antisepsis is not a problem."
    },
    hepatic: { level: "none", text: "No dose change for ocular antisepsis." },
    refs: [],
    sources: [
      "WHO Model List of Essential Medicines (22nd list, 2021)",
      "WHO Guidelines for the management of sexually transmitted infections, 2016",
      "LactMed (NIH)",
      "BNF"
    ]
  },

  /* ---- carbetocin ---- */
  carbetocin: {
    pregnancy: {
      level: "avoid",
      text: "Carbetocin is given AFTER the baby is born, never during pregnancy or labour. It is a long-acting oxytocin analogue and would cause sustained uterine contraction with a fetus still in utero. There is no fetal exposure when it is used correctly, because the only recommended moment to give it is within about 1 minute of the birth of the baby (or of the last baby in a multiple birth). It has no role in induction or augmentation of labour: WHO 2025 recommends it for the prevention of postpartum haemorrhage only."
    },
    breastfeeding: {
      level: "safe",
      text: "Compatible with breastfeeding, and it is recommended at all births including those of women who will breastfeed. It is a single 100 µg dose of an oxytocin analogue given once, and oxytocin itself is a normal part of milk let-down. Put the baby to the breast as usual; there is no need to withhold or discard milk."
    },
    renal: {
      level: "none",
      text: "No dose adjustment is described in the WHO 2025 PPH guideline or the Ethiopian national guideline, and there is nothing to adjust: it is a single fixed 100 µg dose, not an infusion. As with oxytocin, the practical concern in kidney impairment or pre-eclampsia is the fluid given alongside it — watch fluid balance and urine output, and avoid overload."
    },
    hepatic: {
      level: "none",
      text: "No dose adjustment is described. A single fixed 100 µg dose; there is no titration and no cumulative exposure."
    },
    refs: [
      {
        book: "whopph",
        text: "Carbetocin 100 micrograms IM or IV is recommended for preventing PPH at all births, with the heat-stable form where the cold chain cannot be guaranteed.",
        ref: "WHO Consolidated guidelines on PPH 2025, Recommendation 7.2, pdf p. 39",
        pdf_page: 39,
        quote: "Carbetocin (100 µg, intramuscularly/intravenously) is recommended for the prevention of postpartum"
      },
      {
        book: "whopph",
        text: "Give it as soon as possible after the birth, preferably within a minute; it is not recommended for induction, augmentation or treatment.",
        ref: "WHO Consolidated guidelines on PPH 2025, Recommendation 7.2 remarks, pdf p. 39",
        pdf_page: 39,
        quote: "not currently recommended for other obstetric indications"
      },
      {
        book: "whopph",
        text: "The recommended moment is immediately after the birth of the baby or babies, and it does not force early cord clamping.",
        ref: "WHO Consolidated guidelines on PPH 2025, Recommendation 7.2 remarks, pdf p. 39",
        pdf_page: 39,
        quote: "To maximize efficacy, carbetocin is best given immediately"
      },
      {
        book: "whopph",
        text: "Side-effects such as nausea, abdominal pain, headache, shivering and fever are barely different from no uterotonic.",
        ref: "WHO Consolidated guidelines on PPH 2025, Recommendation 7.2 justification, pdf p. 39",
        pdf_page: 39,
        quote: "nausea, abdominal pain, headache, shivering and fever"
      }
    ],
    sources: [
      "WHO. Consolidated guidelines for the prevention, diagnosis and treatment of postpartum haemorrhage, 2025",
      "National guideline on prevention and management of postpartum haemorrhage, Ministry of Health, Ethiopia, 2022"
    ]
  }
};
