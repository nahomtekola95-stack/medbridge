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
  }
};
