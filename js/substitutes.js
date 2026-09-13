/* ============================================================
   MedBridge stock-out substitutes — explicit, per indication.
   Each entry says what can replace a drug, FOR WHICH USE, and the
   catch. Taken from the drug entries and cases in this app.
   `none` = no drug substitute exists; the note says what to do.
   DRAFT until reviewed.
   ============================================================ */
window.SUBSTITUTES = {
  "oxytocin": [
    { use: "PPH prevention and treatment", with: "misoprostol", note: "Prevention 600 mcg orally; treatment 800 mcg sublingual. Heat-stable, no cold chain." },
    { use: "PPH treatment (second uterotonic)", with: "ergometrine", note: "0.2 mg IM — only if blood pressure is normal; never in pre-eclampsia." }
  ],
  "misoprostol": [
    { use: "PPH prevention and treatment", with: "oxytocin", note: "10 IU IM. Needs a cold chain to stay potent." },
    { use: "PPH treatment", with: "ergometrine", note: "0.2 mg IM if blood pressure is normal." }
  ],
  "ergometrine": [
    { use: "PPH treatment", with: "misoprostol", note: "800 mcg sublingual; safe in hypertension." },
    { use: "PPH treatment", with: "oxytocin", note: "First-line uterotonic in any case." }
  ],
  "magnesium-sulfate": [
    { use: "Eclampsia", with: "diazepam", note: "Only if magnesium is genuinely unavailable. Less effective, and it sedates mother and baby. Refer for magnesium." },
    { use: "Life-threatening asthma", with: "aminophylline", note: "6-hourly doses without a pump; narrow safety margin." }
  ],
  "hydralazine": [
    { use: "Severe hypertension in pregnancy", with: "labetalol", note: "Escalating IV boluses; avoid in asthma." },
    { use: "Severe hypertension in pregnancy", with: "nifedipine", note: "10 mg oral, swallowed — never sublingual." }
  ],
  "labetalol": [
    { use: "Severe hypertension in pregnancy", with: "hydralazine", note: "5 mg IV, repeat after 20 min." },
    { use: "Severe hypertension in pregnancy", with: "nifedipine", note: "10 mg oral, swallowed." }
  ],
  "nifedipine": [
    { use: "Severe hypertension in pregnancy", with: "hydralazine", note: "5 mg IV, or 12.5 mg IM at health-centre level." },
    { use: "Severe hypertension in pregnancy", with: "labetalol", note: "IV boluses or 200 mg orally." }
  ],
  "noradrenaline": [
    { use: "Septic or vasodilatory shock", with: "adrenaline", note: "Same 4 mg in 250 mL gravity method and drop tables." },
    { use: "Septic or vasodilatory shock", with: "dopamine", note: "Fallback only: more arrhythmias, no survival benefit." }
  ],
  "dopamine": [
    { use: "Shock", with: "noradrenaline", note: "Preferred vasopressor where stocked." },
    { use: "Shock", with: "adrenaline", note: "Same microdrip and burette method." }
  ],
  "adrenaline": [
    { use: "Shock infusion", with: "noradrenaline", note: "Preferred in septic shock." },
    { use: "Anaphylaxis or cardiac arrest", none: true, note: "No substitute. Adrenaline is essential — keep 1 mg/mL ampoules on every emergency tray." }
  ],
  "artesunate": [
    { use: "Severe malaria", with: "quinine", note: "Loading dose then 8-hourly infusions over 4 h; check glucose every 4 h." }
  ],
  "quinine": [
    { use: "Severe malaria", with: "artesunate", note: "Preferred by WHO for all ages — more effective and safer." }
  ],
  "ceftriaxone": [
    { use: "Sepsis or meningitis in children", with: "ampicillin", note: "With gentamicin (WHO first line)." },
    { use: "Meningitis in an epidemic or when nothing else is stocked", with: "chloramphenicol", note: "Watch for marrow toxicity; avoid in neonates." },
    { use: "Severe pneumonia", with: "benzylpenicillin", note: "With gentamicin; 6-hourly dosing." }
  ],
  "ampicillin": [
    { use: "Neonatal and child sepsis", with: "benzylpenicillin", note: "With gentamicin, same interval." },
    { use: "Sepsis or meningitis", with: "ceftriaxone", note: "Avoid in jaundiced neonates and with calcium fluids." }
  ],
  "benzylpenicillin": [
    { use: "Pneumonia or sepsis", with: "ampicillin", note: "With gentamicin." },
    { use: "Meningitis", with: "ceftriaxone", note: "Once or twice daily — easier on a short-staffed ward." }
  ],
  "cloxacillin": [
    { use: "Staphylococcal bone, joint, skin infection", with: "ceftriaxone", note: "Weaker against Staphylococcus aureus. Plain ampicillin or amoxicillin does NOT cover it." }
  ],
  "gentamicin": [
    { use: "Gram-negative cover in sepsis", with: "ceftriaxone", note: "Covers most of the same organisms once daily; avoid in jaundiced neonates." }
  ],
  "chloramphenicol": [
    { use: "Meningitis, typhoid", with: "ceftriaxone", note: "Preferred where available." }
  ],
  "midazolam": [
    { use: "Convulsion without IV access", with: "diazepam", note: "0.5 mg/kg rectally, max 10 mg." },
    { use: "Seizure continuing after benzodiazepines", with: "phenobarbital", note: "20 mg/kg IM or IV; be ready to ventilate." }
  ],
  "diazepam": [
    { use: "Convulsion", with: "midazolam", note: "0.2 mg/kg IM, intranasal or buccal, max 10 mg." }
  ],
  "phenobarbital": [
    { use: "Status epilepticus (not neonates)", with: "phenytoin", note: "Slow infusion in saline only; never IM." }
  ],
  "phenytoin": [
    { use: "Status epilepticus", with: "phenobarbital", note: "IM or IV loading; respiratory depression risk." }
  ],
  "morphine": [
    { use: "Severe pain", with: "ketamine", note: "Low dose 0.1–0.3 mg/kg IV, or 0.5–1 mg/kg IM." },
    { use: "Background analgesia", with: "paracetamol", note: "Regular 6-hourly; reduces opioid need." }
  ],
  "ketamine": [
    { use: "Surgery below the umbilicus / caesarean section", with: "bupivacaine", note: "Spinal anaesthesia — not in hypovolaemic patients." },
    { use: "Minor procedures", with: "lidocaine", note: "Infiltration and nerve blocks within the maximum dose." }
  ],
  "bupivacaine": [
    { use: "Anaesthesia for surgery", with: "ketamine", note: "When spinal is contraindicated or unavailable." },
    { use: "Wound infiltration", with: "lidocaine", note: "Shorter acting; 5 mg/kg plain maximum." }
  ],
  "lidocaine": [
    { use: "Infiltration and blocks", with: "bupivacaine", note: "Longer acting; lower maximum dose (2 mg/kg); cardiotoxic intravascularly." },
    { use: "VF / pulseless VT", with: "amiodarone", note: "5 mg/kg IV/IO push in arrest." }
  ],
  "amiodarone": [
    { use: "VF / pulseless VT", with: "lidocaine", note: "1 mg/kg IV/IO, max 100 mg." }
  ],
  "salbutamol": [
    { use: "Severe asthma with no inhaled route", with: "adrenaline", note: "0.01 mL/kg of 1:1000 subcutaneously, max 0.3–0.5 mL." },
    { use: "Life-threatening asthma", with: "magnesium-sulfate", note: "25–75 mg/kg IV over 20 min, max 2 g." }
  ],
  "aminophylline": [
    { use: "Life-threatening asthma", with: "magnesium-sulfate", note: "Safer adjunct than aminophylline." },
    { use: "Apnoea of prematurity", with: "caffeine-citrate", note: "Preferred: wider safety margin." }
  ],
  "caffeine-citrate": [
    { use: "Apnoea of prematurity", with: "aminophylline", note: "6 mg/kg then 2.5 mg/kg every 12 h; more side-effects." }
  ],
  "dexamethasone": [
    { use: "Croup or asthma", with: "hydrocortisone", note: "4 mg/kg IV/IM every 6 h." }
  ],
  "hydrocortisone": [
    { use: "Asthma, croup, anaphylaxis adjunct", with: "dexamethasone", note: "0.6 mg/kg once (croup/asthma)." },
    { use: "Adrenal crisis", none: true, note: "Dexamethasone lacks mineralocorticoid action; use hydrocortisone. Refer if none is available." }
  ],
  "dextrose": [
    { use: "Hypoglycaemia without IV glucose", with: "zinc-ors", note: "Sugar water or ORS by mouth or nasogastric tube; sublingual sugar in children." }
  ],
  "digoxin": [
    { use: "Rate control in atrial fibrillation", with: "amiodarone", note: "Specialist use; needs ECG and BP monitoring." }
  ],
  "insulin-soluble": [
    { use: "Diabetic ketoacidosis", none: true, note: "No substitute. Keep fluids and potassium going and refer urgently." }
  ],
  "naloxone": [
    { use: "Opioid overdose", none: true, note: "No drug substitute: ventilate with a bag-valve-mask until the opioid wears off." }
  ],
  "atropine": [
    { use: "Organophosphate poisoning", none: true, note: "No substitute. Order atropine in bulk early — doses of 20–100 mg are common." }
  ],
  "tranexamic-acid": [
    { use: "Postpartum haemorrhage or trauma", none: true, note: "No drug substitute. Uterotonics, compression, surgery and blood." }
  ],
  "calcium-gluconate": [
    { use: "Hyperkalaemia, magnesium toxicity", none: true, note: "Calcium chloride 10 % works at one-third of the volume, through a large vein." }
  ],
  "ipratropium": [
    {use: "Severe asthma add-on",with: "magnesium-sulfate",note: "Give magnesium sulfate 25–75 mg/kg (max 2 g) IV over 20 min for a severe attack; keep salbutamol every 20 min and the steroid."},
    {use: "COPD exacerbation",none: true,note: "No substitute bronchodilator in this app apart from salbutamol: give salbutamol more often, steroid, and oxygen to 88–92 %."}
  ],
  "adenosine": [
    {use: "Stable SVT",none: true,note: "No substitute in this app. Vagal manoeuvres; if unstable, synchronised cardioversion. Adults only: verapamil 5 mg IV over 2 min if in your formulary (never in infants, WPW, broad-complex tachycardia or with a β-blocker). Refer."}
  ],
  "mannitol": [
    {use: "Raised intracranial pressure",with: "hypertonic-saline",note: "3 % saline 2–5 mL/kg over 10–20 min; can be made from 0.9 % saline and 20 % or 10 % NaCl ampoules. Preferred if hypotensive."}
  ],
  "hypertonic-saline": [
    {use: "Raised intracranial pressure",with: "mannitol",note: "0.25–1 g/kg over 20–30 min; avoid in hypovolaemia."},
    {use: "Symptomatic severe hyponatraemia",none: true,note: "Make 3 % from 0.9 % saline plus 20 % or 10 % NaCl ampoules (see method). Mannitol is NOT a substitute for hyponatraemia."}
  ],
  "arv-prophylaxis": [
    {use: "HIV post-exposure prophylaxis",none: true,note: "No non-antiretroviral substitute. If TLD is out, start whatever national-guideline components are available (e.g. TDF/3TC) now and complete the regimen within 24 h; borrow from the ART clinic."},
    {use: "HIV-exposed newborn",none: true,note: "If nevirapine syrup is out, use nevirapine 50 mg dispersible tablets (50 mg in 5 mL water = 10 mg/mL) after pharmacist confirmation; contact the PMTCT focal person."}
  ],
  "tb-rhze": [
    {use: "Drug-susceptible TB",none: true,note: "No substitute regimen. If FDCs are out, use loose rifampicin, isoniazid, pyrazinamide and ethambutol at the same per-kg doses; never give one or two drugs alone."}
  ],
  "snake-antivenom": [
    {use: "Systemic envenoming",none: true,note: "No substitute. Refer to the nearest facility with antivenom while giving supportive care: splint, fluids, bag-valve-mask ventilation for paralysis, atropine + neostigmine trial for cobra bites, no fresh plasma or blood before antivenom unless bleeding is life-threatening."}
  ],
  "oxygen": [
    {use: "Hypoxaemia",none: true,note: "No drug substitute. Share a concentrator with a flow splitter, prioritise children with SpO2 under 90 %, keep a cylinder for power cuts, and refer."}
  ]
};
