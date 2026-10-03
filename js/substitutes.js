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
    { use: "PPH treatment (second uterotonic)", with: "ergometrine", note: "0.2 mg IM — only if blood pressure is normal; never in pre-eclampsia." },
    {
      use: "PPH prevention where there is no reliable fridge",
      with: "carbetocin",
      note: "Heat-stable carbetocin 100 mcg IM or IV, one dose. WHO 2025 makes this the first choice where the oxytocin cold chain cannot be kept: no refrigerated transport, no refrigerated storage, no silent loss of potency. Costs much more than oxytocin and must be given by someone trained to inject. Check the carton says heat-stable."
    },
    {
      use: "PPH prevention where there is no fridge AND no carbetocin",
      with: "misoprostol",
      note: "400 mcg or 600 mcg orally, once, immediately after the birth — the WHO 2025 alternative when heat-stable carbetocin is unavailable. The 400 mcg dose causes less shivering and fever."
    },
    {
      use: "PPH prevention where no skilled health worker can inject",
      with: "misoprostol",
      note: "400 mcg or 600 mcg orally given by a community or lay health worker. Recommended by WHO 2025 for exactly this situation; do not wait for an injection that will not come."
    }
  ],
  "misoprostol": [
    { use: "PPH prevention and treatment", with: "oxytocin", note: "10 IU IM. Needs a cold chain to stay potent." },
    { use: "PPH treatment", with: "ergometrine", note: "0.2 mg IM if blood pressure is normal." },
    {
      use: "PPH prevention where there is no reliable fridge",
      with: "carbetocin",
      note: "Heat-stable carbetocin 100 mcg IM/IV is WHO's first choice here and misoprostol the alternative — so if both are on the shelf, use the carbetocin and keep the misoprostol for the births nobody can attend with a syringe."
    }
  ],
  "ergometrine": [
    { use: "PPH treatment", with: "misoprostol", note: "800 mcg sublingual; safe in hypertension." },
    { use: "PPH treatment", with: "oxytocin", note: "First-line uterotonic in any case." },
    {
      use: "PPH prevention (third stage of labour)",
      none: true,
      note: "Ergometrine is no longer recommended for prevention at all (WHO 2025) — there is no substitution question, it should not be used. Prevent with oxytocin 10 IU, or heat-stable carbetocin 100 mcg where the cold chain fails, or misoprostol 400-600 mcg orally. The same applies to Syntometrine."
    },
    {
      use: "PPH treatment where refrigeration has failed",
      with: "misoprostol",
      note: "800 mcg sublingual. Ergometrine is heat- and light-sensitive and fails silently; misoprostol does not, and is safe when the blood pressure is high."
    }
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
    {use: "Stable SVT",none: true,note: "Vagal manoeuvres; if unstable, synchronised cardioversion. Adults only: verapamil 5 mg IV over 2 min if in your formulary (never in infants, WPW, broad-complex tachycardia or with a β-blocker). Refer."}
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
  ],
  "haloperidol": [
    {use: "Acute agitation (rapid tranquillisation)",with: "lorazepam",note: "1–2 mg orally or IM (diluted). Preferred when there is no ECG, heart disease or a first episode (NICE NG10)."},
    {use: "Acute agitation (rapid tranquillisation)",with: "diazepam",note: "10 mg orally, or 5–10 mg slowly IV. Never IM. Watch breathing."},
    {use: "Acute agitation in psychosis or mania",with: "olanzapine",note: "10 mg ODT or IM (older people 2.5–5 mg). No IM or IV benzodiazepine within 1 hour."},
    {use: "Psychosis (oral maintenance)",with: "chlorpromazine",note: "Start 25–50 mg at night; usual 75–300 mg daily (WHO mhGAP). More sedation and postural hypotension."},
    {use: "Psychosis when tablets are often missed",with: "fluphenazine-decanoate",note: "Test dose 12.5 mg deep IM, then 12.5–50 mg every 2–4 weeks with oral cover at first."}
  ],
  "chlorpromazine": [
    {use: "Psychosis (oral)",with: "haloperidol",note: "Start 1.5–3 mg daily (WHO mhGAP). Less sedation and hypotension; more dystonia and parkinsonism."},
    {use: "Psychosis or mania (oral)",with: "olanzapine",note: "5–10 mg once daily. Sedating; watch weight and glucose."},
    {use: "Sedation for agitation",with: "promethazine",note: "25–50 mg orally or deep IM, usually with haloperidol. Less hypotension than IM chlorpromazine."}
  ],
  "olanzapine": [
    {use: "Psychosis or mania (oral)",with: "haloperidol",note: "Start 1.5–3 mg daily. Keep biperiden available for dystonia."},
    {use: "Psychosis (oral, sedation wanted)",with: "chlorpromazine",note: "Start 25–50 mg at night; watch postural hypotension."},
    {use: "Acute mania",with: "sodium-valproate",note: "Mood stabiliser; slower onset, often combined with an antipsychotic at first. Avoid in women who may become pregnant."},
    {use: "Agitation (IM)",with: "lorazepam",note: "1–2 mg IM. If not stocked, haloperidol 5 mg IM with promethazine 25–50 mg IM."}
  ],
  "fluphenazine-decanoate": [
    {use: "Long-acting depot antipsychotic",with: "haloperidol-decanoate",note: "The usual alternative depot (oily, deep IM only). Start low with a test dose and follow local protocol; see its page for conversion. Otherwise supervised daily oral treatment."},
    {use: "Maintenance of psychosis (oral)",with: "haloperidol",note: "Daily supervised oral dosing by family or a health extension worker; trace missed doses."}
  ],
  "biperiden": [
    {use: "Acute dystonia",with: "promethazine",note: "25–50 mg deep IM. Sedating antihistamine with anticholinergic action (Kaplan supports antihistamines). Not under 2 years."},
    {use: "Acute dystonia",with: "diazepam",note: "5–10 mg slowly IV (Kaplan: 10 mg IV effective). Never IM. Watch breathing."},
    {use: "Acute dystonia not settling",with: "lorazepam",note: "1 mg IM or IV after the anticholinergic (Kaplan)."},
    {use: "Drug-induced parkinsonism",with: "trihexyphenidyl",note: "Benzhexol, widely stocked: start 1 mg daily and increase slowly. First try lowering the antipsychotic dose or switching to olanzapine."}
  ],
  "promethazine": [
    {use: "Sedation in rapid tranquillisation",with: "lorazepam",note: "1–2 mg IM. Do not also give promethazine."},
    {use: "Sedation in rapid tranquillisation",with: "diazepam",note: "10 mg orally or 5–10 mg slowly IV. Never IM."},
    {use: "Anaphylaxis",with: "adrenaline",note: "Adrenaline IM is the essential treatment; an antihistamine is only for skin symptoms afterwards."},
    {use: "Allergic itch or urticaria",with: "chlorphenamine",note: "Use chlorphenamine, cetirizine or loratadine if stocked."},
    {use: "Nausea and vomiting",with: "ondansetron",note: "Use metoclopramide or ondansetron if stocked. Chlorpromazine is a last-line antiemetic because of hypotension."}
  ],
  "lorazepam": [
    {use: "Acute agitation",with: "diazepam",note: "10 mg orally, or 5–10 mg slowly IV over 2 minutes. Never IM (erratic absorption)."},
    {use: "Acute agitation",with: "midazolam",note: "IM midazolam is reliably absorbed but causes more breathing depression; only where the airway can be managed."},
    {use: "Catatonia",with: "diazepam",note: "5–10 mg slowly IV or orally; diazepam 10 mg is roughly lorazepam 2 mg (Kaplan). Never IM."},
    {use: "Alcohol withdrawal",with: "diazepam",note: "Standard choice. In liver disease or old age use smaller, symptom-triggered doses: it accumulates."},
    {use: "Status epilepticus",with: "midazolam",note: "0.2 mg/kg IM (max 10 mg), or buccal or intranasal."},
    {use: "Status epilepticus",with: "diazepam",note: "10 mg IV slowly, or 0.5 mg/kg rectally (max 10 mg in children)."}
  ],
  "thiamine": [
    {use: "Wernicke encephalopathy (suspected or proven)",none: true,note: "No drug substitute. Vitamin B complex contains too little thiamine and oral tablets are poorly absorbed. Give the largest oral dose available and transfer urgently for injectable thiamine."},
    {use: "Refeeding and alcohol withdrawal prophylaxis",none: true,note: "If only oral thiamine is available, give 200–300 mg daily in divided doses; if nothing, start feeds slowly and refer for supplies."}
  ],
  "lithium": [
    {use: "Acute mania",with: "sodium-valproate",note: "First choice where lithium levels cannot be measured, but not in women and girls who could become pregnant."},
    {use: "Acute mania",with: "haloperidol",note: "Rapid effect; watch for dystonia and have biperiden available."},
    {use: "Acute mania and bipolar maintenance",with: "olanzapine",note: "Effective for both; weight gain and sedation."},
    {use: "Bipolar maintenance",with: "carbamazepine",note: "Second-line; many drug interactions (dolutegravir, TB drugs, contraception)."}
  ],
  "sodium-valproate": [
    {use: "Established status epilepticus",with: "phenytoin",note: "18–20 mg/kg in saline only over at least 20 minutes; watch pulse and BP."},
    {use: "Established status epilepticus",with: "phenobarbital",note: "15–20 mg/kg IV or IM; bag-valve-mask ready (respiratory depression)."},
    {use: "Epilepsy maintenance (focal or tonic-clonic seizures)",with: "carbamazepine",note: "Not for absence or myoclonic seizures; enzyme inducer."},
    {use: "Epilepsy maintenance",with: "phenobarbital",note: "WHO mhGAP option; sedation and behaviour effects in children."},
    {use: "Acute mania and bipolar maintenance",with: "olanzapine",note: "Preferred in women and girls who could become pregnant where available."},
    {use: "Acute mania",with: "haloperidol",note: "Rapid effect; extrapyramidal side effects."},
    {use: "Bipolar maintenance",with: "lithium",note: "Only where lithium levels and kidney function can be monitored."}
  ],
  "carbamazepine": [
    {use: "Epilepsy (focal or generalised tonic-clonic)",with: "sodium-valproate",note: "Broad spectrum; avoid in women and girls who could become pregnant."},
    {use: "Epilepsy",with: "phenobarbital",note: "Cheap and widely stocked; sedation; enzyme inducer too."},
    {use: "Epilepsy",with: "phenytoin",note: "Saturable kinetics; gum overgrowth; enzyme inducer."},
    {use: "Bipolar disorder",with: "sodium-valproate",note: "Not in women and girls who could become pregnant."},
    {use: "Bipolar disorder",with: "olanzapine",note: "Effective for mania and maintenance."},
    {use: "Trigeminal neuralgia",none: true,note: "No equivalent in this app. Phenytoin or amitriptyline are sometimes tried with less benefit; refer to neurology or pain services."}
  ],
  "amitriptyline": [
    {use: "Depression",with: "fluoxetine",note: "Safer in overdose and preferred for adolescents, older people, heart disease and anyone at suicide risk."},
    {use: "Trigeminal neuralgia",with: "carbamazepine",note: "First-line for trigeminal neuralgia specifically."},
    {use: "Other neuropathic pain and migraine prophylaxis",none: true,note: "No substitute in this app (gabapentin, pregabalin, duloxetine or propranolol if stocked locally). Use paracetamol and non-drug measures and refer."}
  ],
  "fluoxetine": [
    {use: "Depression in adults",with: "sertraline",note: "Start 50 mg once daily. Stop fluoxetine first; its long half-life means sertraline can usually start after a few days at a low dose, watching for serotonin symptoms."},
    {use: "Depression in adults",with: "amitriptyline",note: "Effective but dangerous in overdose: small supplies, avoid in heart disease and suicide risk."},
    {use: "Depression in adolescents",with: "sertraline",note: "Second-line SSRI under 18 with specialist advice; tricyclics are not recommended. Weekly review for suicidal thoughts at the start."},
    {use: "Anxiety disorders and OCD",with: "sertraline",note: "Start low (25–50 mg) and increase slowly; benzodiazepines only short-term."}
  ],
  "risperidone": [
    {use: "Psychosis (oral)",with: "haloperidol",note: "Start 1.5–3 mg daily (WHO mhGAP). Cheaper and widely stocked; more dystonia and parkinsonism."},
    {use: "Psychosis or mania (oral)",with: "olanzapine",note: "5–10 mg once daily. Fewer movement effects; more weight gain and sedation."},
    {use: "Psychosis with raised prolactin or weight problems",with: "aripiprazole",note: "10–15 mg once daily (many start 5 mg). Cross-taper; watch for restlessness."},
    {use: "Acute mania",with: "sodium-valproate",note: "Mood stabiliser; slower onset. Avoid in women and girls who could become pregnant."},
    {use: "Long-acting injection",with: "haloperidol-decanoate",note: "No cold chain needed. Oral haloperidol first, then 25 mg deep IM with oral cover; no exact conversion from risperidone."}
  ],
  "quetiapine": [
    {use: "Psychosis or mania (oral)",with: "olanzapine",note: "5–10 mg once daily; no long titration. Weight gain and sedation."},
    {use: "Psychosis or mania (oral)",with: "risperidone",note: "1–2 mg a day, increase to 2–4 mg. More prolactin and movement effects."},
    {use: "Psychosis in Parkinson disease or Lewy body dementia",none: true,note: "Do not substitute haloperidol, risperidone or other strong D2 blockers: severe rigidity and falls. Reduce antiparkinson drugs, treat delirium causes, and ask a specialist (clozapine under monitoring is the evidence-based option)."},
    {use: "Bipolar depression",with: "lithium",note: "Only where levels and kidney function can be checked. Antidepressants alone can trigger mania."},
    {use: "Insomnia",none: true,note: "Not a reason to use quetiapine. Sleep advice; short courses of promethazine or a benzodiazepine only if needed."}
  ],
  "clozapine": [
    {use: "Treatment-resistant schizophrenia",none: true,note: "No drug is as effective. Check adherence first; then use the best-tolerated antipsychotic at an adequate dose for 4–6 weeks (for example olanzapine up to 20 mg), consider a depot, and refer. Never start clozapine where blood counts cannot be done."},
    {use: "Clozapine stopped for agranulocytosis",with: "olanzapine",note: "Kaplan: safe after clozapine agranulocytosis, but wait until the count has recovered. Never re-expose to clozapine."},
    {use: "Temporary clozapine stock-out",none: true,note: "Every effort to get supplies: a gap over 48 hours means re-titration from 12.5 mg. Meanwhile cover severe symptoms with olanzapine or a benzodiazepine by mouth (no IM benzodiazepine) and watch for rebound psychosis and cholinergic rebound."}
  ],
  "aripiprazole": [
    {use: "Psychosis (low metabolic risk)",with: "haloperidol",note: "About 5 mg a day; little weight gain but more movement effects and prolactin rise."},
    {use: "Psychosis or mania",with: "risperidone",note: "1–2 mg a day increasing to 2–4 mg; raises prolactin."},
    {use: "Psychosis or mania",with: "quetiapine",note: "Titrate over days from 25 mg twice daily; sedation and dizziness."},
    {use: "Acute mania",with: "sodium-valproate",note: "Avoid in women and girls who could become pregnant."}
  ],
  "haloperidol-decanoate": [
    {use: "Long-acting depot antipsychotic",with: "fluphenazine-decanoate",note: "Test dose 12.5 mg deep IM when the next haloperidol injection is due, then 12.5–50 mg every 2–4 weeks with oral cover. No exact conversion."},
    {use: "Maintenance of psychosis (oral)",with: "haloperidol",note: "Start on the day the injection is due; about 5 mg a day, supervised by family or a health extension worker."},
    {use: "Long-acting injection (cold chain available)",with: "risperidone",note: "Consta 25 mg every 2 weeks after oral risperidone tolerance, with 3 weeks of oral cover. Rarely stocked."}
  ],
  "trihexyphenidyl": [
    {use: "Drug-induced parkinsonism",with: "biperiden",note: "1 mg twice daily orally, increasing gradually (WHO mhGAP). Same anticholinergic cautions; prescribe small amounts."},
    {use: "Acute dystonia",with: "biperiden",note: "2–5 mg IM or slowly IV; faster than oral trihexyphenidyl."},
    {use: "Acute dystonia",with: "promethazine",note: "25–50 mg deep IM. Not under 2 years."},
    {use: "Acute dystonia",with: "diazepam",note: "5–10 mg slowly IV. Never IM. Watch breathing."},
    {use: "Drug-induced parkinsonism (no anticholinergic in stock)",none: true,note: "Lower the antipsychotic dose or switch to a drug with fewer movement effects (quetiapine, olanzapine, aripiprazole). Amantadine if stocked."},
    {use: "Akathisia",with: "propranolol",note: "Anticholinergics are not the drug of choice for akathisia (Kaplan). First reduce the antipsychotic dose."}
  ],
  "propranolol": [
    {use: "Akathisia",with: "diazepam",note: "Short course, e.g. 5 mg orally two or three times daily; first reduce the antipsychotic. Use instead of propranolol in asthma."},
    {use: "Akathisia",with: "lorazepam",note: "0.5–1 mg orally two or three times daily for a few days where stocked; watch sedation."},
    {use: "Akathisia (second-line)",with: "cyproheptadine",note: "Helps some patients (Kaplan); sedating and anticholinergic. Specialist dose."},
    {use: "Lithium tremor",none: true,note: "No drug substitute in this app. Lower the lithium dose, give it at bedtime, cut coffee and tea, and exclude lithium toxicity."},
    {use: "Performance anxiety",none: true,note: "No good substitute: avoid benzodiazepines before performances (impair skill). Use breathing and rehearsal techniques."}
  ],
  "bromocriptine": [
    {use: "Neuroleptic malignant syndrome",with: "lorazepam",note: "1–2 mg IM or IV, repeated for rigidity and agitation, with cooling and fluids. Amantadine or dantrolene, if stocked, at referral level."},
    {use: "Neuroleptic malignant syndrome",with: "diazepam",note: "5–10 mg slowly IV (never IM) if lorazepam is unavailable; plus cooling and generous fluids."},
    {use: "Antipsychotic-induced hyperprolactinaemia",with: "aripiprazole",note: "Switch to, or add low-dose, aripiprazole with a psychiatrist; less risk of worsening psychosis than bromocriptine."}
  ],
  "cyproheptadine": [
    {use: "Serotonin syndrome",with: "lorazepam",note: "1–2 mg IM or IV every 30 min as needed with cooling and fluids; the main treatment in any case."},
    {use: "Serotonin syndrome",with: "diazepam",note: "5–10 mg slowly IV or orally, repeated as needed. Never IM."},
    {use: "Serotonin syndrome (severe, specialist only)",with: "chlorpromazine",note: "Kaplan lists it, but it causes hypotension and is dangerous if NMS is the true diagnosis. Only with specialist advice."}
  ],
  "chlordiazepoxide": [
    {use: "Alcohol withdrawal",with: "diazepam",note: "Usual choice in Ethiopia (mhGAP): 10–20 mg orally every 1–2 h while CIWA-Ar is 10 or more, then reduce. Diazepam 10 mg is roughly chlordiazepoxide 25 mg."},
    {use: "Alcohol withdrawal with liver disease or old age",with: "lorazepam",note: "1–4 mg orally, IM or IV by symptoms; does not accumulate. Do not miss doses."},
    {use: "Alcohol withdrawal (benzodiazepines unsuitable, mild–moderate)",with: "carbamazepine",note: "About 800 mg a day, reduced over 5–7 days (Kaplan). Does not treat delirium tremens."}
  ],
  "naltrexone": [
    {use: "Alcohol relapse prevention",none: true,note: "No substitute in this app (acamprosate or disulfiram if stocked locally). Use mhGAP psychosocial interventions and follow-up."},
    {use: "Opioid dependence",with: "methadone",note: "Maintenance (usually 60–120 mg daily) through a treatment programme; more effective than naltrexone for most patients."}
  ],
  "methadone": [
    {use: "Opioid dependence maintenance",none: true,note: "No substitute in this app (buprenorphine where the programme stocks it). Never replace with morphine or tramadol. Refer to the methadone programme."},
    {use: "Opioid withdrawal symptoms while waiting for a programme",with: "diazepam",note: "Short course for anxiety and agitation, e.g. 5–10 mg orally up to three times daily for a few days, with fluids; does not treat craving. Watch breathing if opioids are also used."}
  ],
  "sertraline": [
    {use: "Depression and anxiety in adults",with: "fluoxetine",note: "WHO mhGAP first-line and widely stocked: start 10–20 mg each morning. Stop sertraline and start fluoxetine the next day at 20 mg."},
    {use: "Depression and anxiety in adults",with: "escitalopram",note: "Switch directly: sertraline 50 mg ≈ escitalopram 10 mg. More QT effect; avoid with haloperidol, quinine or amiodarone."},
    {use: "Depression in pregnancy or breastfeeding",with: "fluoxetine",note: "Acceptable in pregnancy; in breastfeeding it can build up in young infants, so watch the baby for irritability and poor feeding."},
    {use: "Depression with insomnia or poor appetite",with: "mirtazapine",note: "15 mg at night; sedation and weight gain. Taper sertraline over 1–2 weeks while starting."},
    {use: "PTSD",with: "fluoxetine",note: "Another SSRI with the same class evidence; 20 mg daily. Trauma-focused psychological therapy remains first-line."},
    {use: "Adults, only if no SSRI is available",with: "amitriptyline",note: "Dangerous in overdose: 1 week supply at a time held by family; avoid in heart disease, older people and suicide risk."}
  ],
  "escitalopram": [
    {use: "Depression and anxiety in adults",with: "sertraline",note: "Preferred when there is QT risk or pregnancy/breastfeeding: 50 mg daily, switch directly the next day."},
    {use: "Depression and anxiety in adults",with: "fluoxetine",note: "20 mg each morning, start the next day. Longer half-life smooths missed doses."},
    {use: "Depression with insomnia or poor appetite",with: "mirtazapine",note: "15 mg at night; no QT concern at usual doses."},
    {use: "Depression in adolescents",with: "fluoxetine",note: "The first choice under 18 (mhGAP, NICE): 10 mg, then 20 mg after 1–2 weeks, with weekly review."}
  ],
  "imipramine": [
    {use: "Depression in adults",with: "fluoxetine",note: "Safer in overdose and in heart disease. Reduce imipramine to 25–50 mg before starting fluoxetine 10 mg, then stop imipramine over 1–2 weeks (fluoxetine raises tricyclic levels)."},
    {use: "Depression in adults",with: "amitriptyline",note: "Same class and same overdose danger; more sedating and anticholinergic. Switch at the same dose."},
    {use: "Nocturnal enuresis in children",none: true,note: "No drug substitute in this app (desmopressin if stocked locally). An enuresis alarm, star chart, toileting before bed and treating constipation are more effective than medicine anyway."},
    {use: "Panic disorder",with: "sertraline",note: "Start 25 mg daily and increase slowly; first-line and safer than a tricyclic."}
  ],
  "mirtazapine": [
    {use: "Depression with insomnia or poor appetite",with: "sertraline",note: "50 mg daily; does not help sleep or appetite early, so a short course of sleep hygiene support may be needed. Taper mirtazapine over 1–2 weeks."},
    {use: "Depression in adults",with: "fluoxetine",note: "20 mg each morning; can worsen insomnia and appetite at first."},
    {use: "Depression with insomnia in adults without suicide risk",with: "amitriptyline",note: "Sedating alternative at 25–50 mg at night, but dangerous in overdose and in heart disease or older people."}
  ],
  "lamotrigine": [
    {use: "Bipolar maintenance in women who could become pregnant",with: "olanzapine",note: "Effective for preventing mania (less for depression); weight gain and sedation. Avoid valproate in this group."},
    {use: "Bipolar maintenance",with: "lithium",note: "Only with lithium levels, kidney and thyroid monitoring; avoid first trimester."},
    {use: "Bipolar depression",none: true,note: "No close substitute in this app. Quetiapine where stocked; otherwise an SSRI (fluoxetine) only together with a mood stabiliser or antipsychotic, never alone. Refer."},
    {use: "Epilepsy (focal or generalised tonic-clonic) in women who could become pregnant",with: "carbamazepine",note: "For focal and tonic-clonic seizures; enzyme inducer that reduces hormonal contraception; folic acid. Not for absence or myoclonic seizures."},
    {use: "Epilepsy",with: "phenobarbital",note: "Cheap, widely stocked WHO option; sedation and behaviour effects."},
    {use: "Restarting after a stock-out of more than 4–5 days",none: true,note: "Not a substitute issue: restart lamotrigine from the first titration step, not at the old dose (serious rash risk)."}
  ],
  "methylphenidate": [
    {use: "ADHD in children",none: true,note: "No substitute in this app. Parent training, classroom strategies and behavioural programmes are first-line where medicine is unavailable. Atomoxetine, clonidine or guanfacine if stocked locally, with specialist advice; imipramine is a last-resort option only under specialist care (overdose and cardiac risk)."},
    {use: "Tics, anxiety or growth concerns on methylphenidate",none: true,note: "Refer to child psychiatry or paediatrics; risperidone is sometimes used for severe tics or irritability under specialist care."}
  ],

  /* ---- visceral leishmaniasis ---- */
  "liposomal-amphotericin-b": [
    {
      use: "VL–HIV, East Africa (as part of the combination)",
      with: "amphotericin-b-deoxycholate",
      note: "Only if no liposomal product can be obtained. Far more toxic: 4–6 h infusion, 0.9 % saline pre-load, routine potassium replacement, and a cumulative dose that damages kidneys. Chase the AmBisome donation supply first."
    },
    {
      use: "VL without HIV, East Africa",
      with: "sodium-stibogluconate",
      note: "20 mg Sb5+/kg/day IM with paromomycin 15 mg/kg/day for 17 days is the first line in HIV-negative patients anyway. Not a substitute in advanced HIV — cardiotoxic, pancreatotoxic and poorly effective there."
    },
    {
      use: "VL in pregnancy",
      with: "amphotericin-b-deoxycholate",
      note: "The only amphotericin substitute. Miltefosine (teratogenic) and pentavalent antimonials (abortion, preterm birth, maternal encephalopathy) are both contraindicated in pregnancy."
    },
    {
      use: "Secondary prophylaxis after a first VL episode",
      with: "amphotericin-b-deoxycholate",
      note: "1 mg/kg every 3–4 weeks is the South-East Asia option. WHO's East Africa recommendation is pentamidine isethionate 4 mg/kg (300 mg adult) every 3–4 weeks."
    }
  ],
  "amphotericin-b-deoxycholate": [
    {
      use: "VL and VL–HIV treatment",
      with: "liposomal-amphotericin-b",
      note: "Always prefer this where it exists: similar efficacy, far less toxicity, and it is the formulation in the WHO regimens. AmBisome is donated for some East African programmes."
    },
    {
      use: "VL without HIV, East Africa",
      with: "sodium-stibogluconate",
      note: "With paromomycin for 17 days — the East African first line in HIV-negative patients."
    }
  ],
  "sodium-stibogluconate": [
    {
      use: "VL without HIV, East Africa (first line)",
      with: "liposomal-amphotericin-b",
      note: "3–5 mg/kg per daily dose over 6–10 days to a total of 30 mg/kg. This is the WHO second line and the regimen for complicated cases, and the choice in pregnancy and in HIV coinfection."
    },
    {
      use: "VL when an antimonial is contraindicated (pregnancy, heart disease, QT drugs)",
      with: "liposomal-amphotericin-b",
      note: "Pentavalent antimonials are contraindicated in pregnancy. L-AMB is the safe alternative."
    },
    {
      use: "Rescue treatment of VL–HIV after L-AMB plus miltefosine",
      with: "paromomycin",
      note: "The guideline's rescue options are sodium stibogluconate alone OR sodium stibogluconate with paromomycin. Paromomycin with miltefosine has also been used for relapse in South-East Asia."
    }
  ],
  miltefosine: [
    {
      use: "VL–HIV combination treatment, East Africa",
      with: "liposomal-amphotericin-b",
      note: "WHO's stated fallback: where miltefosine is unavailable or contraindicated, give L-AMB alone up to a total of 40 mg/kg (5 mg/kg on days 1–5, 10, 17 and 24). Cure at day 29 falls from 67 % to 50 %, so use it only when you must."
    },
    {
      use: "A woman of childbearing potential with no assured contraception",
      with: "liposomal-amphotericin-b",
      note: "Not a stock-out but a contraindication. No pregnancy test or no contraception plan covering the course and 5 months afterwards means no miltefosine — use L-AMB monotherapy."
    },
    {
      use: "Oral treatment of VL",
      none: true,
      note: "Miltefosine is the only oral antileishmanial there is. Every other option is an injection or an infusion. There is no oral substitute."
    }
  ],
  paromomycin: [
    {
      use: "VL without HIV, East Africa (with an antimonial)",
      with: "sodium-stibogluconate",
      note: "SSG monotherapy 20 mg Sb5+/kg/day for 30 days where paromomycin is out of stock — a longer course and more toxicity. Confirm with the national protocol."
    },
    {
      use: "VL without HIV, East Africa",
      with: "liposomal-amphotericin-b",
      note: "3–5 mg/kg per daily dose over 6–10 days to a total of 30 mg/kg — the second-line and complicated-case regimen."
    },
    {
      use: "Rescue treatment of VL–HIV",
      with: "liposomal-amphotericin-b",
      note: "Extending therapy with a further cycle of L-AMB plus miltefosine is what WHO suggests first for a slow responder, before rescue drugs."
    }
  ],

  /* ---- eye and vision ---- */
  "tetracycline-eye": [
    {
      use: "Newborn eye prophylaxis at birth",
      with: "povidone-iodine",
      note: "Povidone-iodine 2.5 % AQUEOUS drops, one drop in each eye once within 1 hour of birth. As effective against gonococcus and chlamydia, cheaper, and it does not select for resistance. Never 5 % or 10 % in a newborn's eye, and never the detergent scrub."
    },
    {
      use: "Bacterial conjunctivitis",
      with: "ciprofloxacin-eye",
      note: "0.3 % drops 2-hourly for 2 days then 4-hourly for 5 days, or the 0.3 % ointment 3 times daily. Drops suit a school-age child who must see the board; ointment suits an infant."
    },
    {
      use: "Eye care in measles or severe acute malnutrition",
      with: "ciprofloxacin-eye",
      note: "Any antibiotic eye preparation you have will do for prophylaxis of the ulcerated cornea; what actually changes the outcome is vitamin A on days 1, 2 and 14 plus atropine 1 % if the cornea is ulcerated."
    },
    {
      use: "Trachoma (active disease)",
      none: true,
      note: "Azithromycin 20 mg/kg orally as a single dose (maximum 1 g; adults 1 g) is the preferred antibiotic and the one used for mass treatment. Chloramphenicol 1 % eye ointment is a local alternative where it is stocked. If none of these exists, treat facial cleanliness and environment, epilate trichiatic lashes, and report the case to the woreda health office: individual antibiotics do not control trachoma."
    },
    {
      use: "Established gonococcal or chlamydial ophthalmia neonatorum",
      none: true,
      note: "There is NO topical substitute. This needs systemic treatment: ceftriaxone 25–50 mg/kg IM once (maximum 125 mg) for gonococcus, oral erythromycin 50 mg/kg/day in 4 doses for 14 days for chlamydia, plus hourly saline irrigation and treatment of the mother and her partner."
    }
  ],
  "ciprofloxacin-eye": [
    {
      use: "Bacterial conjunctivitis",
      with: "tetracycline-eye",
      note: "1 % ointment 3 times daily for 5 days. Blurs vision for 15–30 minutes after each dose, so give the last dose at bedtime."
    },
    {
      use: "Corneal ulcer / bacterial keratitis",
      none: true,
      note: "There is no equivalent substitute at health-centre level. Use whatever antibiotic eye preparation you have at the same intensive frequency (chloramphenicol 0.5 % drops or gentamicin 0.3 % eye drops where stocked; ointment 2-hourly if that is all there is), add atropine 1 % for pain, do NOT pad the eye, do NOT give a steroid, and refer today. Fortified drops made from injectable antibiotics are a hospital-pharmacy preparation, not a ward improvisation."
    },
    {
      use: "Fungal keratitis",
      with: "natamycin",
      note: "Ciprofloxacin does nothing here and neither does any other antibacterial. The drug is natamycin 5 % suspension, which is rarely stocked. Suspect fungus after injury with plant or grain material, in a slow ulcer with feathery edges and satellite lesions. Refer urgently and do not give a steroid."
    },
    {
      use: "Prophylaxis after foreign-body removal or a corneal abrasion",
      with: "tetracycline-eye",
      note: "1 % ointment 3 times daily for 3–5 days is entirely adequate for this indication and is usually the cheaper item on the shelf."
    },
    { use: "Systemic infection — typhoid, dysentery, urinary infection", with: "ciprofloxacin", note: "The eye drops treat the eye only and give no useful blood level. A systemic infection needs oral or IV ciprofloxacin, which is a different preparation with its own page." }
  ],
  "atropine-eye": [
    {
      use: "Cycloplegia for uveitis, corneal ulcer or eye trauma",
      none: true,
      note: "Homatropine 2 % (lasts 1–3 days) and cyclopentolate 1 % (about 24 hours) are the proper alternatives and are preferable where the shorter action is wanted, but neither is in this app's drug list. If no cycloplegic of any kind exists, refer: the pain of ciliary spasm does not respond well to oral analgesia."
    },
    {
      use: "Pain from ciliary spasm when there is no cycloplegic at all",
      with: "paracetamol",
      note: "A poor substitute — say so honestly. Regular paracetamol or ibuprofen, dark glasses, rest in a shaded room, and no reading. A cycloplegic works within an hour and analgesia does not; order homatropine 2 % or cyclopentolate 1 % for the clinic."
    },
    {
      use: "Amblyopia penalisation",
      none: true,
      note: "Patching the good eye is the standard alternative and is usually tried first: 2–6 hours a day, supervised by the eye unit. Atropine is chosen when the patch is refused, not tolerated, or cannot be kept on."
    },
    {
      use: "Dilating the pupil for a fundus examination",
      with: "tropicamide",
      note: "Tropicamide 1 % is the right drug for this — 4–6 hours of blur rather than 1–2 weeks. Do not use atropine for a diagnostic dilation unless there is genuinely nothing else, and then warn the patient the blur lasts a fortnight."
    }
  ],
  tropicamide: [
    {
      use: "Dilating for fundus examination",
      with: "atropine-eye",
      note: "Last resort only. Atropine 1 % dilates well but the pupil stays large and reading vision stays blurred for 1–2 weeks, the patient cannot work or ride, and the pupil cannot then be used for neurological monitoring. If you must, dilate ONE eye and warn the patient in detail."
    },
    {
      use: "Widening a stubborn pupil in a dark iris",
      none: true,
      note: "Phenylephrine 2.5 % added to tropicamide is the answer — never the 10 % strength, which has caused hypertensive crisis, myocardial infarction and stroke, and is dangerous in infants and the elderly. If only 10 % is stocked, use tropicamide alone in a darkened room and accept a smaller pupil."
    },
    {
      use: "Checking for a cataract or retinoblastoma in a newborn",
      none: true,
      note: "No drop is needed. A red reflex check with a direct ophthalmoscope at arm's length in a darkened room, both eyes in the beam at once, needs no dilation at all. Absent, dull, white or asymmetrical reflexes mean urgent referral."
    }
  ],
  "timolol-eye": [
    {
      use: "Chronic glaucoma in a patient with asthma, heart block or a slow pulse",
      with: "pilocarpine-eye",
      note: "Pilocarpine 2 % four times daily lowers pressure without beta-blockade. The catch is tolerability: brow ache, headache, dim vision from the small pupil and induced short-sightedness, so adherence is poor. Discuss with the eye unit — a topical carbonic anhydrase inhibitor, brimonidine or a prostaglandin analogue is better if the programme stocks one."
    },
    {
      use: "Short-term pressure lowering when timolol is contraindicated or unavailable",
      with: "acetazolamide",
      note: "Effective but systemic: 250 mg 6-hourly, for days not months, with attention to potassium, and contraindicated in sulfonamide allergy, sickle cell disease and significant kidney or liver disease."
    },
    {
      use: "Long-term glaucoma control when no drop at all is available",
      none: true,
      note: "There is no substitute for treatment. Refer for laser trabeculoplasty or iridotomy, or for drainage surgery — in many districts surgery is the more reliable answer than a drug supply chain that breaks every few months. Glaucoma blindness is painless, silent and permanent."
    }
  ],
  "pilocarpine-eye": [
    {
      use: "Acute angle-closure glaucoma",
      with: "acetazolamide",
      note: "The more important of the two: 500 mg IV or orally at once, then 250 mg 6-hourly. Give it first — pilocarpine does not work until the pressure has fallen enough for the iris sphincter to contract."
    },
    {
      use: "Acute angle-closure glaucoma",
      with: "timolol-eye",
      note: "0.5 % one drop, repeated once after 30 minutes, unless there is asthma, heart block or a pulse under 55."
    },
    {
      use: "Acute angle closure not responding to drops and tablets",
      with: "mannitol",
      note: "1–1.5 g/kg IV over 30–45 minutes where the heart and kidneys will take the load. Catheterise an elderly man first. It is a bridge of a few hours to laser iridotomy, nothing more. Oral glycerol 1–1.5 g/kg of a 50 % solution is the alternative — not in a diabetic and useless in a vomiting patient."
    },
    {
      use: "Definitive treatment of angle closure",
      none: true,
      note: "No drug is definitive. The treatment is laser peripheral iridotomy or surgical iridectomy, to both eyes. Drops buy hours; refer the same day."
    }
  ],
  acetazolamide: [
    {
      use: "Acute angle-closure glaucoma",
      with: "timolol-eye",
      note: "0.5 % one drop, repeated once after 30 minutes. Weaker than acetazolamide but safe in sulfonamide allergy and sickle cell disease — check for asthma, heart block and bradycardia first."
    },
    {
      use: "Acute angle-closure glaucoma",
      with: "pilocarpine-eye",
      note: "2 % (4 % in a dark iris) every 15 minutes for 2 doses then 4 times daily, once the pressure has started to fall. Also 1–2 % four times daily in the fellow eye."
    },
    {
      use: "Emergency pressure lowering when acetazolamide is contraindicated",
      with: "mannitol",
      note: "1–1.5 g/kg IV over 30–45 minutes. Avoid in heart failure, anuria and significant dehydration; catheterise first in an elderly man. Oral glycerol 50 % 1–1.5 g/kg is the alternative, but not in diabetes and not in a vomiting patient."
    },
    {
      use: "Sustained-release capsules in an emergency",
      none: true,
      note: "The 500 mg sustained-release capsule is NOT a substitute for immediate-release tablets in an acute attack: it releases over about 12 hours. Use two 250 mg immediate-release tablets, crushed if necessary, or the IV preparation. Never open or crush the sustained-release capsule."
    }
  ],
  "prednisolone-eye": [
    {
      use: "Anterior uveitis or postoperative inflammation",
      none: true,
      note: "Dexamethasone 0.1 % drops are covered by this same entry and are the usual alternative where prednisolone acetate 1 % is not stocked — they need no shaking but penetrate the intact cornea less well, so give them more frequently in severe uveitis and review sooner. Say in the referral note which steroid was used."
    },
    {
      use: "Severe uveitis where no steroid eye drop exists at all",
      none: true,
      note: "Do not improvise. Refer the same day: untreated uveitis causes synechiae, secondary glaucoma and cataract within weeks. Oral prednisolone is used for severe or posterior uveitis but only on specialist instruction and only once infection (tuberculosis, toxoplasmosis, herpes) has been considered — this is not a decision to make at health-centre level. Give a cycloplegic (atropine 1 %) meanwhile: it relieves the pain and prevents the iris scarring down."
    },
    {
      use: "An undiagnosed red eye",
      none: true,
      note: "No steroid, and no substitute for a steroid. Stain with fluorescein, look with a blue light, and treat what you find. Steroid on a herpetic dendritic ulcer or on fungal keratitis blinds the eye."
    }
  ],
  "tetracaine-eye": [
    {
      use: "Topical anaesthesia for examination, tonometry or foreign-body removal",
      none: true,
      note: "Oxybuprocaine (benoxinate) 0.4 % and proparacaine 0.5 % are exact equivalents and sting less; combined fluorescein–anaesthetic minims are convenient for tonometry. None of them is in this app's drug list, but any one of them substitutes directly for another."
    },
    {
      use: "Topical ocular anaesthesia when no ophthalmic anaesthetic exists at all",
      with: "lidocaine",
      note: "Preservative-free lidocaine, drawn from a FRESH single-use ampoule of plain 1–2 % solution (never with adrenaline, never from a multi-dose vial with preservative), has been used as a topical ocular anaesthetic and 2 % lidocaine gel is a standard topical anaesthetic for cataract surgery. It stings considerably and is not a licensed eye preparation in most places — confirm with the national protocol before adopting it. Preserved or multi-dose formulations are toxic to the corneal epithelium and must not be used."
    },
    {
      use: "Pain relief for a corneal abrasion, ulcer or welding flash burn at home",
      none: true,
      note: "NEVER. Repeated topical anaesthetic causes a non-healing ring ulcer, corneal melting, perforation and blindness. Treat the pain with oral paracetamol or ibuprofen, a cycloplegic drop (atropine 1 % or homatropine 2 %) for the ciliary spasm that causes most of the ache, and dark glasses. The bottle stays in the clinic."
    }
  ],
  fluorescein: [
    {
      use: "Staining the cornea",
      none: true,
      note: "There is no substitute and no improvisation. Highlighter ink, food colouring and 'fluorescent' powders are not sterile, are not the same molecule and have caused chemical injury. Sterile strips cost very little, keep for years unopened and need no cold chain — set a re-order level of 20 and do not run out. A strip and a 2 % drop are interchangeable; a strip is safer."
    },
    {
      use: "A blue light to view the stain",
      none: true,
      note: "Use the cobalt blue filter on a direct ophthalmoscope — most have one and most staff have never found it. Failing that, tape translucent blue plastic (a sweet wrapper, a blue folder, theatre blue gel; two layers is better than one) over a phone torch, and darken the room."
    }
  ],
  "povidone-iodine": [
    {
      use: "Newborn eye prophylaxis at birth",
      with: "tetracycline-eye",
      note: "A single 1 cm ribbon of 1 % ointment into each eye within 1 hour of birth. Erythromycin 0.5 % ointment is the third option. Give one of them to every baby, and do not irrigate the eyes afterwards."
    },
    {
      use: "Conjunctival antisepsis before surgery in a patient with a documented severe reaction to povidone-iodine",
      none: true,
      note: "Chlorhexidine 0.05 % aqueous (NOT the alcoholic or detergent preparations, and not higher strengths) is the accepted alternative for the conjunctival sac. Record why iodine was avoided. Note that a reaction to intravenous radiographic contrast or to shellfish is NOT an iodine allergy and is not a reason to omit antisepsis."
    },
    {
      use: "Preventing endophthalmitis",
      none: true,
      note: "Do not substitute an antibiotic drop for the antiseptic. Povidone-iodine 5 % left in the conjunctival sac for 3 minutes before the procedure has better evidence behind it than any pre-operative antibiotic, and costs a fraction as much."
    }
  ],

  /* ---- carbetocin ---- */
  carbetocin: [
    {
      use: "PPH prevention where the cold chain cannot be maintained",
      with: "misoprostol",
      note: "400 mcg or 600 mcg orally, once, immediately after the birth. This is the substitute WHO 2025 names when heat-stable carbetocin is not available. Heat-stable, needs no needle, and a community or lay health worker can give it."
    },
    {
      use: "PPH prevention where the cold chain IS reliable",
      with: "oxytocin",
      note: "10 IU IM or IV within 1 minute of birth. It is the uterotonic of choice when several options are stocked, and roughly a nineteenth of the non-subsidised price of carbetocin."
    },
    {
      use: "PPH treatment",
      none: true,
      note: "Carbetocin is not a treatment drug and there is nothing to substitute. Treat with IV oxytocin first, plus tranexamic acid 1 g IV within 3 h of birth, then ergometrine or misoprostol 800 mcg sublingual as second-line, with massage, fluids, compression and escalation."
    },
    {
      use: "Induction or augmentation of labour",
      none: true,
      note: "Not an indication for carbetocin at all. Use oxytocin by pump or drop counting, or low-dose misoprostol in hospital."
    }
  ],

  /* ---- warfarin ---- */
  warfarin: [
    {
      use: "DVT or PE treatment (not pregnant), when there is no INR testing or warfarin is out of stock",
      with: "heparin",
      note: "Enoxaparin 1 mg/kg SC every 12 h (or 1.5 mg/kg once daily) for the WHOLE course, at least 3 months. No INR is needed; check platelets once at day 5–7 if possible. If CrCl is under 30 mL/min, give 1 mg/kg once daily. If there is no enoxaparin: SC unfractionated heparin 333 IU/kg, then 250 IU/kg every 12 h (unmonitored, FIDO regimen). Cost and daily injections are the barriers. A direct oral anticoagulant (rivaroxaban, apixaban) also replaces warfarin here, if the patient can obtain one."
    },
    {
      use: "VTE in pregnancy",
      with: "heparin",
      note: "Use enoxaparin throughout pregnancy and for at least 6 weeks after delivery. Never use warfarin for VTE in pregnancy. Warfarin may be started after delivery (overlap with heparin) and is compatible with breastfeeding."
    },
    {
      use: "Warfarin stopped for surgery: bridging for a mechanical valve or a clot within 3 months",
      with: "heparin",
      note: "Start therapeutic enoxaparin 1 mg/kg SC every 12 h once the INR falls below range, and give the last dose 24 h before surgery. Restart it 24 h after low-bleeding-risk surgery or 48–72 h after high-risk surgery, and continue until the INR is back in range. See the Pre-op tool. Do NOT bridge for atrial fibrillation alone."
    },
    {
      use: "Mechanical heart valve (long term)",
      none: true,
      note: "No substitute. Direct oral anticoagulants are contraindicated: dabigatran and apixaban were less effective than warfarin at preventing valve thrombosis, and aspirin alone is not enough. If warfarin runs out, do not let the patient go without anticoagulation: give therapeutic enoxaparin (1 mg/kg SC every 12 h) until warfarin is restocked, borrow from another facility, and refer if neither is possible."
    },
    {
      use: "Rheumatic mitral stenosis with atrial fibrillation",
      none: true,
      note: "Warfarin is required. Rivaroxaban did worse than warfarin in rheumatic heart disease with AF, and the other DOACs are not licensed for it. For a short gap in supply, give therapeutic enoxaparin; for long-term use there is no alternative, so keep warfarin and INR testing available for these patients."
    },
    {
      use: "Atrial fibrillation without a mechanical valve or mitral stenosis, when warfarin cannot be monitored",
      with: "apixaban",
      note: "A direct oral anticoagulant (apixaban, rivaroxaban, dabigatran, edoxaban) is the alternative if the patient can obtain and afford one. Aspirin is NOT an adequate substitute: it prevents fewer strokes than warfarin and is no safer for bleeding. Long-term enoxaparin is not a standard AF treatment. Refer to a centre with INR testing."
    }
  ],

  /* ---- anaesthesia ---- */
  suxamethonium: [
    {
      use: "Rapid-sequence intubation (full stomach)",
      with: "vecuronium",
      note: "0.15 mg/kg IV — slower onset and a block lasting more than an hour. Only with neostigmine and atropine in the room, a second airway plan on the trolley and someone to ventilate (theatre packs)."
    },
    {
      use: "Patient at risk of hyperkalaemia or malignant hyperthermia",
      with: "vecuronium",
      note: "Same conditions as above. Or avoid a relaxant: ketamine with spontaneous breathing and local infiltration, or a spinal in a resuscitated patient."
    },
    {
      use: "Any relaxant where the airway kit or a trained person is missing",
      none: true,
      note: "No substitute and nothing to improvise. Do not paralyse a patient you cannot intubate, ventilate and suction."
    }
  ],
  neostigmine: [
    {
      use: "Reversal of vecuronium or another non-depolarising relaxant",
      none: true,
      note: "No substitute in this app. Sugammadex reverses vecuronium and rocuronium where available. Otherwise do not give a long-acting relaxant, or ventilate until it wears off with a named person at the bag."
    }
  ],
  vecuronium: [
    {
      use: "Relaxation for abdominal surgery",
      with: "atracurium",
      note: "Atracurium, rocuronium or pancuronium — each has its own page and its own dose — can replace it; pancuronium lasts longer. With no relaxant: ketamine with spontaneous breathing and local infiltration, or a spinal for lower abdominal surgery."
    },
    {
      use: "Intubation only",
      with: "suxamethonium",
      note: "1–1.5 mg/kg IV; then let the patient breathe spontaneously under ketamine or a volatile agent."
    }
  ],
  ephedrine: [
    {
      use: "Spinal or post-induction hypotension",
      with: "adrenaline",
      note: "Push-dose 10 mcg/mL (made in two dilution steps), 5–20 mcg IV — the app's caesarean case uses this."
    },
    {
      use: "Hypotension with a slow pulse",
      with: "atropine",
      note: "0.5–0.6 mg IV restores rate; it does not treat vasodilatation, so fluids and a vasopressor may still be needed."
    }
  ],
  propofol: [
    {
      use: "Induction of anaesthesia",
      with: "ketamine",
      note: "1–2 mg/kg IV (0.5–1 mg/kg if shocked). Better than propofol in the shocked or septic patient; expect secretions (atropine) and emergence reactions."
    },
    {
      use: "Induction of anaesthesia",
      with: "thiopental",
      note: "Up to 4 mg/kg IV of 2.5 % (max 500 mg), titrated. Same hypotension risk; dangerous outside the vein or in an artery; not for maintenance."
    },
    {
      use: "Refractory status epilepticus (ventilated)",
      with: "midazolam",
      note: "0.2 mg/kg IV then infusion (Harrison) — intubated, ventilated patient."
    }
  ],
  thiopental: [
    {
      use: "Induction of anaesthesia",
      with: "propofol",
      note: "1.5–2.5 mg/kg in a fit adult, titrated; much less if elderly or shocked."
    },
    {
      use: "Induction in shock, sepsis or asthma",
      with: "ketamine",
      note: "1–2 mg/kg IV (0.5–1 mg/kg if shocked)."
    }
  ],

  /* ---- pain and gut ---- */
  pethidine: [
    {
      use: "Severe pain, labour analgesia, intra-operative opioid",
      with: "morphine",
      note: "The better drug in almost every respect: no seizure-causing metabolite. Pethidine 100 mg ≈ morphine 10 mg. Labour: 2.5–5 mg IV titrated or 5–10 mg IM; reduce doses in kidney impairment."
    },
    {
      use: "Analgesia for manual removal of placenta or uterine inversion",
      with: "ketamine",
      note: "The alternative the Ethiopian PPH guideline names. Preserves blood pressure and breathing in a bleeding woman; give with atropine or have suction ready."
    },
    {
      use: "Background analgesia so less opioid is needed",
      with: "paracetamol",
      note: "1 g every 6 h by the clock."
    }
  ],
  tramadol: [
    {
      use: "Moderate to severe pain",
      with: "morphine",
      note: "Low-dose oral or IM morphine (2.5–5 mg every 4 h in adults) is often safer than tramadol in patients on antidepressants or with seizure risk."
    },
    {
      use: "Mild to moderate pain (step 1)",
      with: "paracetamol",
      note: "Regular 1 g every 6 h is the base for any step-2 drug."
    },
    {
      use: "Mild to moderate pain (step 1)",
      with: "ibuprofen",
      note: "400 mg every 8 h with food if the NSAID check is passed (hydration, kidneys, ulcer, asthma, pregnancy)."
    }
  ],
  diclofenac: [
    {
      use: "NSAID analgesia",
      with: "ibuprofen",
      note: "Oral 400 mg every 8 h. Same kidney, ulcer, asthma and pregnancy cautions, but lower cardiovascular risk."
    },
    {
      use: "Analgesia when an NSAID is unsafe (hypovolaemia, sepsis, AKI, ulcer, late pregnancy)",
      with: "paracetamol",
      note: "1 g every 6 h regularly, plus wound infiltration with bupivacaine and titrated morphine. Not a loss."
    }
  ],
  ibuprofen: [
    {
      use: "Fever and pain in children",
      with: "paracetamol",
      note: "15 mg/kg every 6 h; safer when the child is dehydrated, has chickenpox, or has NSAID-sensitive asthma."
    },
    {
      use: "Adult NSAID analgesia",
      with: "diclofenac",
      note: "50 mg every 8 h orally, or 100 mg rectally; maximum 150 mg/day. Same cautions; avoid in heart disease."
    }
  ],
  metoclopramide: [
    {
      use: "Post-operative nausea and vomiting",
      with: "ondansetron",
      note: "4 mg IV; better antiemetic for PONV, no dystonia. Watch QT drugs and low potassium."
    },
    {
      use: "PONV prophylaxis",
      with: "dexamethasone",
      note: "4–8 mg IV at induction. Too slow for rescue."
    },
    {
      use: "PONV rescue or drug-induced nausea",
      with: "haloperidol",
      note: "0.5–1 mg IV slowly or IM. Also a dopamine blocker, so do not give with metoclopramide."
    },
    {
      use: "Nausea and vomiting of pregnancy",
      with: "promethazine",
      note: "25 mg orally or deep IM. Sedating; never under 2 years."
    }
  ],
  ondansetron: [
    { use: "PONV prophylaxis", with: "dexamethasone", note: "4–8 mg IV at induction." },
    {
      use: "PONV rescue",
      with: "haloperidol",
      note: "0.5–1 mg IV slowly or IM. Also prolongs QT at higher doses."
    },
    {
      use: "Nausea when obstruction is excluded",
      with: "metoclopramide",
      note: "10 mg slowly IV; never in possible bowel obstruction; dystonia risk in young people."
    },
    {
      use: "Nausea and vomiting of pregnancy",
      with: "promethazine",
      note: "First-line; 25 mg orally or deep IM."
    }
  ],
  omeprazole: [
    {
      use: "IV omeprazole stock-out",
      none: true,
      note: "Give omeprazole orally (40 mg twice daily for a bleed) or by NG tube as a 2 mg/mL suspension in 8.4 % sodium bicarbonate — the same drug, a different route. See the Omeprazole page."
    },
    {
      use: "Acid suppression with no PPI at all",
      with: "famotidine",
      note: "Famotidine or cimetidine are the remaining H2 blockers. Ranitidine was withdrawn in 2020 and must not be used. An H2 blocker is weaker than a PPI for a bleeding ulcer."
    },
    {
      use: "Immediate acid neutralisation before emergency anaesthesia",
      with: "sodium-citrate",
      note: "30 mL of 0.3 M sodium citrate by mouth just before induction. A PPI takes 30–60 minutes or longer to act."
    }
  ],

  /* ---- anti-infectives ---- */
  ciprofloxacin: [
    {
      use: "Shigella / bloody diarrhoea",
      with: "azithromycin",
      note: "Child 12 mg/kg on day 1, then 6 mg/kg daily for 4 more days; adult 1 g (confirm with protocol). Also the drug to switch to when ciprofloxacin has not worked after 48 h."
    },
    {
      use: "Shigella / bloody diarrhoea in a sick or vomiting child",
      with: "ceftriaxone",
      note: "50–100 mg/kg once daily IM or IV for 3 days."
    },
    {
      use: "Typhoid (uncomplicated)",
      with: "azithromycin",
      note: "Adult 1 g daily for 5 days; child 10–20 mg/kg daily (max 1 g) for 7 days. Works against fluoroquinolone-resistant strains."
    },
    {
      use: "Typhoid (severe)",
      with: "ceftriaxone",
      note: "2 g IV daily in adults for 10–14 days (Harrison); child 50–80 mg/kg daily. Cefotaxime is an alternative."
    },
    {
      use: "Corneal ulcer or bacterial conjunctivitis",
      with: "ciprofloxacin-eye",
      note: "The eye needs the 0.3 % EYE DROP, a different product. Tablets do not treat a corneal ulcer, and the IV solution must never go in the eye."
    }
  ],
  azithromycin: [
    {
      use: "Trachoma (active TF/TI)",
      with: "tetracycline-eye",
      note: "1 % ointment twice daily to both eyes for 6 weeks. Effective but few families complete it; also the treatment for infants under 6 months."
    },
    {
      use: "Chlamydial conjunctivitis or pneumonia in an infant",
      with: "erythromycin",
      note: "50 mg/kg/day in 4 doses for 14 days. More pyloric stenosis risk in the first 2 weeks, and adherence is harder."
    },
    {
      use: "Typhoid",
      with: "ceftriaxone",
      note: "IV or IM; the choice for severe typhoid in any case."
    },
    {
      use: "Typhoid where the strain is known to be susceptible",
      with: "ciprofloxacin",
      note: "500 mg twice daily for 5–7 days (adult). Do not use blind where fluoroquinolone resistance is common."
    },
    {
      use: "Pertussis (infant over 2 months, macrolide not possible)",
      with: "cotrimoxazole",
      note: "Trimethoprim 8 mg/kg/day + sulfamethoxazole 40 mg/kg/day in 2 doses for 14 days. Never under 2 months."
    },
    {
      use: "Chlamydia in pregnancy",
      with: "ampicillin",
      note: "Oral amoxicillin 500 mg three times daily for 7 days is the recommended alternative (amoxicillin is the oral form in the ampicillin entry)."
    }
  ],
  erythromycin: [
    {
      use: "Chlamydial conjunctivitis or pneumonia in an infant",
      with: "azithromycin",
      note: "20 mg/kg once daily for 3 days — preferred if available: shorter and less linked to pyloric stenosis."
    },
    { use: "Pertussis", with: "azithromycin", note: "The drug of choice at all ages (Nelson)." },
    {
      use: "Preterm prelabour rupture of membranes",
      with: "azithromycin",
      note: "Listed by Gabbe as an acceptable alternative during shortages; oral ampicillin/amoxicillin is another. Never amoxicillin-clavulanate (necrotising enterocolitis)."
    },
    {
      use: "Preterm prelabour rupture of membranes",
      with: "ampicillin",
      note: "IV ampicillin, or oral amoxicillin — the other arm of the NICHD regimen."
    }
  ],
  cotrimoxazole: [
    {
      use: "PCP / HIV prophylaxis (cotrimoxazole preventive therapy)",
      with: "dapsone",
      note: "The alternatives — dapsone 100 mg daily (check G6PD), atovaquone, or monthly aerosolised pentamidine with a special nebuliser — need referral or the HIV programme. Do not leave the patient unprotected: report the stock-out the same day."
    },
    {
      use: "Severe PCP treatment when cotrimoxazole cannot be used",
      with: "pentamidine",
      note: "4 mg/kg IV once daily over at least 60 min for 21 days — toxic (hypotension, hypoglycaemia, kidney injury, arrhythmia)."
    },
    {
      use: "Shigella / dysentery",
      with: "ciprofloxacin",
      note: "WHO first line: 15 mg/kg twice daily for 3 days (adult 500 mg). Cotrimoxazole should not be used empirically anyway."
    }
  ],
  cefotaxime: [
    {
      use: "Neonatal sepsis",
      with: "ampicillin",
      note: "Ampicillin plus gentamicin remains the first-line regimen; use it if cefotaxime is unavailable."
    },
    {
      use: "Neonatal or child sepsis/meningitis — term baby, not jaundiced, no calcium-containing IV fluids",
      with: "ceftriaxone",
      note: "50 mg/kg once daily (meningitis 100 mg/kg/day). Never with calcium in a neonate; avoid in jaundice and under 41 weeks corrected age."
    },
    {
      use: "Gonococcal ophthalmia neonatorum",
      with: "ceftriaxone",
      note: "25–50 mg/kg IM or IV once, maximum 125 mg — only if the baby is not jaundiced or preterm and no calcium is running."
    },
    {
      use: "Meningitis or sepsis in a child or adult",
      with: "ceftriaxone",
      note: "The usual choice outside the neonatal period; once or twice daily."
    }
  ],
  fluconazole: [
    {
      use: "Cryptococcal meningitis (induction)",
      with: "liposomal-amphotericin-b",
      note: "Single 10 mg/kg dose with flucytosine and fluconazole is the WHO preferred induction — fluconazole is part of it, not replaced by it."
    },
    {
      use: "Cryptococcal meningitis (induction) without liposomal amphotericin",
      with: "amphotericin-b-deoxycholate",
      note: "1 mg/kg/day for 7 days (WHO via Harrison), with fluconazole and flucytosine. Watch potassium and creatinine."
    },
    {
      use: "Oral or oesophageal candidiasis",
      with: "miconazole",
      note: "Nystatin suspension or miconazole oral gel treat oral thrush; oesophageal candidiasis needs an azole (itraconazole) or referral."
    },
    {
      use: "Vaginal candidiasis (and always in pregnancy)",
      with: "clotrimazole",
      note: "Use a topical azole (clotrimazole or miconazole pessary/cream); preferred to fluconazole in pregnancy."
    },
    {
      use: "Fungal keratitis",
      with: "natamycin",
      note: "Fluconazole does not cover the moulds that cause most fungal corneal ulcers. Natamycin 5 % drops are the treatment."
    }
  ],
  pentamidine: [
    {
      use: "VL–HIV secondary prophylaxis",
      with: "amphotericin-b-deoxycholate",
      note: "1 mg/kg every 3–4 weeks is the South-East Asia option; WHO prefers pentamidine in East Africa and a drug different from the one used for the primary episode."
    },
    {
      use: "VL–HIV secondary prophylaxis",
      with: "liposomal-amphotericin-b",
      note: "An alternative where pentamidine is unavailable; agree the dose and interval with the VL treatment centre."
    },
    {
      use: "PCP treatment",
      with: "cotrimoxazole",
      note: "The first-choice treatment: trimethoprim 5 mg/kg every 6–8 h for 21 days. Pentamidine is only for when cotrimoxazole cannot be used."
    }
  ],
  natamycin: [
    {
      use: "Fungal keratitis",
      none: true,
      note: "No safe substitute at ward level: not ciprofloxacin or other antibacterial drops, not fluconazole (does not cover the moulds), never a steroid, and no home-made drops. Give atropine 1 % and analgesia, do not pad, and refer the same day to an eye unit with natamycin or another antifungal drop."
    }
  ],

  /* ---- fluids and other ---- */
  "normal-saline": [
    {
      use: "Resuscitation, dehydration (Plan C), burns",
      with: "ringers-lactate",
      note: "Same volumes and rates. Ringer's lactate is the better fluid for large volumes, sepsis and burns. Do not run it in a line with blood, or with ceftriaxone in neonates (contains calcium)."
    },
    {
      use: "Vomiting with low chloride and alkalosis (gastric outlet obstruction, pyloric stenosis)",
      with: "ringers-lactate",
      note: "Acceptable to restore the circulation if saline has run out, but it contains less chloride and its lactate becomes bicarbonate, so it corrects the alkalosis poorly. Return to saline, with potassium, as soon as it is available."
    },
    {
      use: "Line with blood; diluent for phenytoin",
      none: true,
      note: "Nothing else may share a line with blood, and phenytoin crystallises in glucose. Use a fresh unopened saline bag or ampoule for one patient only. If there is truly no saline: run blood through its own cannula with nothing else in it, and do not dilute phenytoin in any glucose-containing fluid — ask the pharmacist, or use another anticonvulsant from the seizure protocol (phenobarbital)."
    },
    {
      use: "Flushes and drug dilution",
      none: true,
      note: "Use a single-patient 100 or 500 mL saline bag, labelled and discarded within 24 h (see method). Never a shared ward bottle. Water for injection only to reconstitute powders, never as a flush in volume. 5 % dextrose only for drugs labelled as compatible with it."
    }
  ],
  protamine: [
    {
      use: "Bleeding on unfractionated heparin or enoxaparin",
      none: true,
      note: "No substitute. Stop the heparin (UFH effect is largely gone 2–3 h after an infusion stops; enoxaparin lasts much longer, especially in kidney failure), local pressure and packing, tranexamic acid for surgical or mucosal bleeding, and blood for losses. Fresh frozen plasma and vitamin K do NOT reverse heparin. Transfer if bleeding continues."
    }
  ],
  "tetanus-toxoid": [
    {
      use: "Active immunisation after a wound",
      none: true,
      note: "TT and Td are interchangeable for tetanus (WHO prefers Td). Children under 7: the DTP-containing vaccine of the national schedule. If no tetanus-containing vaccine is in stock, give the TIG or antitoxin if needed, and send the patient with a written note to the nearest EPI site within days — the first dose cannot wait for the next routine session."
    },
    {
      use: "Passive immunisation (tetanus-prone wound, non-immune patient)",
      none: true,
      note: "Human TIG 250 IU first choice; if unavailable, IVIG where it exists, or equine tetanus antitoxin after a sensitivity test with adrenaline ready. If none: thorough debridement, the toxoid, and a clear warning about early tetanus signs. Antibiotics are not a substitute."
    }
  ],
  "glyceryl-trinitrate": [
    {
      use: "Uterine relaxation to replace an inverted uterus",
      with: "magnesium-sulfate",
      note: "Williams lists IV magnesium sulfate and terbutaline as alternative relaxants. It acts more slowly than GTN. Use the loading dose on the Magnesium sulfate page with calcium gluconate at hand; general anaesthesia with a halogenated agent is the other option. Oxytocin as soon as the uterus is replaced."
    },
    {
      use: "Acute cardiogenic pulmonary oedema",
      with: "furosemide",
      note: "Sit upright, oxygen and IV furosemide are the backbone anyway; without GTN the preload reduction is slower. Morphine in small doses only, if at all."
    },
    {
      use: "Angina attack",
      none: true,
      note: "No nitrate substitute in this app. Stop and rest; if pain lasts more than 15–20 minutes treat as an acute coronary syndrome: aspirin, ECG, oxygen if hypoxic, refer."
    }
  ],
  tamsulosin: [
    {
      use: "Acute urinary retention or BPH symptoms",
      none: true,
      note: "Another alpha-blocker on your formulary (doxazosin, terazosin, prazosin, alfuzosin) at its lowest starting dose at bedtime (first-dose fainting). None available: keep the catheter in longer and refer for urology."
    },
    {
      use: "Distal ureteric stone",
      none: true,
      note: "No expulsive-therapy substitute in this app. Analgesia (an NSAID if kidney function allows), strain the urine, and the same-day return rules for fever, vomiting or uncontrolled pain. Most stones under 5 mm pass anyway."
    }
  ],

  /* ---- cardio and reversal ---- */
  verapamil: [
    {
      use: "Stable regular narrow-complex SVT after vagal manoeuvres",
      with: "adenosine",
      note: "Adenosine is the first choice, not just a substitute: a rapid push with an instant flush (see Adenosine). It is the drug for infants, children and pregnancy. Verapamil is the adult second line."
    },
    {
      use: "SVT when adenosine and verapamil have failed or cannot be used",
      with: "amiodarone",
      note: "Specialist option (see the SVT case). It causes hypotension if given fast. If the patient is unstable, use synchronised cardioversion, not more drugs."
    },
    {
      use: "Rate control of atrial fibrillation with heart failure or low blood pressure",
      with: "digoxin",
      note: "Use digoxin when heart failure or low BP rules verapamil out; it does not weaken heart contraction (Harrison). Onset is slower. Never in pre-excited AF (WPW)."
    },
    {
      use: "Oral rate control or prevention of recurrent SVT when verapamil is not available",
      with: "propranolol",
      note: "A β-blocker does the same job by mouth. Never combine the two, and when switching let a specialist decide the timing. Avoid in asthma."
    }
  ],
  apixaban: [
    {
      use: "Stroke prevention in atrial fibrillation (no mechanical valve, no rheumatic mitral stenosis)",
      with: "warfarin",
      note: "Needs INR monitoring (target 2.0–3.0). Switch by giving both until the INR is 2.0 or more, then stop apixaban (see Apixaban: switching). Aspirin is not an adequate substitute."
    },
    {
      use: "DVT or PE treatment",
      with: "heparin",
      note: "Enoxaparin 1 mg/kg SC every 12 hours for the whole course (once daily if creatinine clearance is under 30 mL/min), starting when the next tablet would have been due. Warfarin overlapped with heparin is the other option where INR testing exists."
    },
    {
      use: "Mechanical heart valve or moderate–severe rheumatic mitral stenosis",
      with: "warfarin",
      note: "Apixaban is the wrong drug here (Harrison). Change to warfarin at the valve target INR with heparin cover until it is in range (see Warfarin). Refer if you cannot measure the INR."
    },
    {
      use: "Pregnancy, or a woman planning pregnancy",
      with: "heparin",
      note: "Stop apixaban and change to enoxaparin (or unfractionated heparin) as soon as pregnancy is known. DOACs cross the placenta (Harrison)."
    }
  ],
  flumazenil: [
    {
      use: "Benzodiazepine overdose or oversedation",
      none: true,
      note: "No drug substitute, and none is needed: support the airway and breathing (recovery position, jaw thrust, bag-valve-mask with oxygen) until the benzodiazepine wears off. This is the treatment for almost every benzodiazepine overdose."
    },
    {
      use: "Oversedation when an opioid was also given (for example midazolam with morphine or pethidine)",
      with: "naloxone",
      note: "Naloxone reverses the opioid part only. Ventilate for the rest. Give it first when breathing is slow and the pupils are pinpoint."
    }
  ],
  glycopyrrolate: [
    {
      use: "With neostigmine for reversal of a non-depolarising relaxant",
      with: "atropine",
      note: "Atropine 0.02 mg/kg does the same job (see Neostigmine). It causes more tachycardia (use care in mitral stenosis), and it crosses the blood–brain barrier (confusion in older patients) and the placenta."
    },
    {
      use: "Drying secretions before ketamine, or bradycardia during anaesthesia",
      with: "atropine",
      note: "Atropine 0.01–0.02 mg/kg IV or IM, maximum 0.5 mg (see Atropine). It acts faster, so it is the better choice for bradycardia with poor perfusion."
    },
    {
      use: "Chronic drooling in neurological disability",
      none: true,
      note: "No substitute in this app. Use positioning, swallowing therapy, and a hyoscine patch where stocked. Do not put atropine eye drops under a child's tongue without specialist advice: one drop of 1 % contains about 0.5 mg of atropine."
    },
    {
      use: "Noisy secretions at the end of life",
      none: true,
      note: "No substitute in this app. Hyoscine butylbromide SC where stocked. Reposition the patient and reassure the family. Atropine works but can cause agitation in a patient who is still aware."
    }
  ],

  /* ---- other ---- */
  dapsone: [
    {
      use: "PCP prophylaxis (first choice)",
      with: "cotrimoxazole",
      note: "Cotrimoxazole is always first: it also prevents toxoplasmosis, malaria, bacterial pneumonia and diarrhoea, which dapsone does not. After a mild, non-mucosal rash a supervised rechallenge or dose-escalation may be possible (national guideline); never after Stevens-Johnson syndrome, blistering, mucosal sores or fever with rash."
    },
    {
      use: "Severe PCP treatment",
      with: "pentamidine",
      note: "Dapsone is for prophylaxis here, not for treating severe PCP. IV pentamidine 4 mg/kg daily for 21 days when cotrimoxazole cannot be used. Monthly aerosolised pentamidine 300 mg is a prophylaxis alternative but needs a special nebuliser (referral level)."
    },
    {
      use: "PCP prophylaxis when neither cotrimoxazole nor dapsone can be used",
      none: true,
      note: "Atovaquone 1500 mg daily with food, or monthly aerosolised pentamidine — referral or HIV programme. Do not leave the patient unprotected; effective ART is the long-term protection."
    },
    {
      use: "Leprosy (dapsone intolerance or hypersensitivity)",
      none: true,
      note: "Do not improvise. The national leprosy programme supplies an MDT regimen without dapsone (rifampicin and clofazimine, with second-line drugs as WHO advises). Never treat leprosy with a single drug."
    }
  ],
  chlorhexidine: [
    {
      use: "Skin antisepsis before surgery, lines or procedures",
      with: "povidone-iodine",
      note: "10 % povidone-iodine on intact skin, allowed to dry for at least 2 minutes. Use it when chlorhexidine is out of stock or the patient is allergic to chlorhexidine. Alcoholic preparations of either are flammable — dry before diathermy."
    },
    {
      use: "Conjunctival-sac antisepsis before eye surgery",
      with: "povidone-iodine",
      note: "5 % povidone-iodine for 3 minutes is the first choice. Chlorhexidine is the alternative only as 0.05 % AQUEOUS solution, and only when iodine is contraindicated. Never alcoholic, scrub or skin-prep chlorhexidine in the eye."
    },
    {
      use: "Umbilical cord care when 7.1 % chlorhexidine is out of stock",
      none: true,
      note: "Clean, dry cord care: wash hands, keep the stump clean, dry and uncovered, nothing applied. Do not substitute the alcoholic skin prep, the 4 % scrub, iodine or any traditional substance."
    },
    {
      use: "Mouth care without chlorhexidine mouthwash",
      none: true,
      note: "Tooth-brushing twice daily, swabs moistened with clean water or saline, suction, head-up nursing. These matter more than the antiseptic for preventing ventilator-associated pneumonia."
    }
  ],
  amantadine: [
    {
      use: "Drug-induced parkinsonism (younger adult, no confusion)",
      with: "trihexyphenidyl",
      note: "Widely stocked: start 1 mg daily and increase slowly. Avoid in older or confused patients, glaucoma or prostatic enlargement — that is when amantadine is preferred."
    },
    {
      use: "Drug-induced parkinsonism",
      with: "biperiden",
      note: "1 mg twice daily orally, increasing gradually (WHO mhGAP). Same anticholinergic cautions as trihexyphenidyl."
    },
    {
      use: "Drug-induced parkinsonism (first step)",
      none: true,
      note: "Before any antiparkinsonian drug, lower the antipsychotic dose or switch to one with fewer movement effects (quetiapine, olanzapine, aripiprazole)."
    },
    {
      use: "Neuroleptic malignant syndrome",
      with: "bromocriptine",
      note: "The preferred dopamine-acting adjunct, with stopping the antipsychotic, cooling, fluids and benzodiazepines (see bromocriptine)."
    },
    {
      use: "Influenza",
      none: true,
      note: "Amantadine must not be used — resistance is near-universal. Neuraminidase inhibitors (oseltamivir) are the treatment; they are not in this app."
    }
  ],

  /* ---- allergy and stomach ---- */
  chlorphenamine: [
    {
      use: "Anaphylaxis",
      with: "adrenaline",
      note: "Adrenaline IM is the treatment. No antihistamine replaces it; chlorphenamine is only for skin symptoms afterwards."
    },
    {
      use: "Allergic reaction needing an injection",
      with: "promethazine",
      note: "25–50 mg deep IM for an adult. Never under 2 years; more sedating, and tissue injury if injected badly."
    },
    {
      use: "Hives or itch, patient can swallow",
      with: "cetirizine",
      note: "10 mg once daily (child by age from 6 months). Sedates less; preferred in young children."
    },
    {
      use: "Hives or itch, patient can swallow",
      with: "loratadine",
      note: "10 mg once daily (2–5 years 5 mg). Least sedating; preferred in pregnancy and breastfeeding."
    }
  ],
  cetirizine: [
    {
      use: "Hives, itch or hay fever",
      with: "loratadine",
      note: "10 mg once daily; 2–5 years 5 mg. Not under 2 years."
    },
    {
      use: "Hives or itch, oral or injection",
      with: "chlorphenamine",
      note: "4 mg orally every 4–6 hours, or 10 mg IM/IV. Sedating — best at night."
    },
    {
      use: "Anaphylaxis",
      with: "adrenaline",
      note: "Adrenaline IM first; an oral antihistamine is only for skin symptoms afterwards."
    }
  ],
  loratadine: [
    {
      use: "Hives, itch or hay fever",
      with: "cetirizine",
      note: "10 mg once daily; usable from 6 months. Slightly more sedating."
    },
    {
      use: "Hives or itch, oral or injection",
      with: "chlorphenamine",
      note: "4 mg orally every 4–6 hours, or 10 mg IM/IV. Sedating."
    },
    {
      use: "Anaphylaxis",
      with: "adrenaline",
      note: "Adrenaline IM first; an oral antihistamine is only for skin symptoms afterwards."
    }
  ],
  famotidine: [
    {
      use: "Acid suppression, ulcer or reflux",
      with: "omeprazole",
      note: "More potent; first choice for a bleeding ulcer. Oral, IV, or by NG tube as a bicarbonate suspension."
    },
    {
      use: "Acid suppression when no famotidine or PPI",
      with: "cimetidine",
      note: "Last choice: inhibits liver enzymes (warfarin, phenytoin, aminophylline and others). Check every other drug first."
    },
    {
      use: "Immediate neutralisation before induction",
      with: "sodium-citrate",
      note: "30 mL of 0.3 M in the last minutes before induction. Not a substitute for the H2 blocker given earlier — they work together."
    },
    {
      use: "Any use",
      none: true,
      note: "Ranitidine was withdrawn worldwide in 2020 and must not be used as an alternative."
    }
  ],
  cimetidine: [
    {
      use: "Acid suppression, ulcer or reflux",
      with: "famotidine",
      note: "Preferred H2 blocker: more potent and no liver-enzyme interactions."
    },
    {
      use: "Acid suppression, ulcer or reflux",
      with: "omeprazole",
      note: "More potent still; first choice for a bleeding ulcer."
    },
    {
      use: "Immediate neutralisation before induction",
      with: "sodium-citrate",
      note: "30 mL of 0.3 M in the last minutes before induction."
    }
  ],
  "sodium-citrate": [
    {
      use: "Immediate neutralisation of stomach acid before induction",
      none: true,
      note: "Nothing else acts at once. Never use a chalky (particulate) antacid. A pharmacy can make 0.3 M sodium citrate (see the Sodium citrate page)."
    },
    {
      use: "Acid aspiration prophylaxis (slower)",
      with: "famotidine",
      note: "20 mg IV at the decision to operate; needs 30–60 minutes. Does not neutralise acid already in the stomach."
    },
    {
      use: "Acid aspiration prophylaxis (slower)",
      with: "omeprazole",
      note: "40 mg IV at least 30–60 minutes before induction."
    }
  ],

  /* ---- anaesthesia and airway ---- */
  atracurium: [
    {
      use: "Relaxation for surgery",
      with: "vecuronium",
      note: "0.1 mg/kg IV, top-ups 0.02–0.03 mg/kg; a straight swap with the same rules (neostigmine and atropine in the room, someone to ventilate). The powder needs no fridge. It lasts longer in liver failure and somewhat longer in kidney failure."
    },
    {
      use: "Relaxation in kidney or liver failure",
      none: true,
      note: "No other relaxant on these pages escapes kidney and liver clearance as atracurium does. Avoid pancuronium. If only vecuronium or rocuronium exists: one intubating dose, then smaller, less frequent top-ups and full clinical recovery before extubation. Or avoid a relaxant: ketamine with spontaneous breathing and local infiltration, or a spinal in a resuscitated patient."
    },
    {
      use: "Any relaxant where the airway kit, a trained person or the reversal drugs are missing",
      none: true,
      note: "No substitute and nothing to improvise. Do not paralyse a patient you cannot intubate and ventilate."
    }
  ],
  rocuronium: [
    {
      use: "Rapid-sequence intubation (patient who CAN have suxamethonium)",
      with: "suxamethonium",
      note: "1–1.5 mg/kg IV. Usually the better choice where sugammadex is not stocked: if intubation fails, breathing returns in 5–8 minutes. Check the contraindication list on its page first."
    },
    {
      use: "Rapid-sequence intubation when suxamethonium is contraindicated",
      with: "vecuronium",
      note: "0.15 mg/kg IV — slower onset and a block of more than an hour. The same commitment to the airway as rocuronium: only with a second airway plan on the trolley and someone to ventilate (theatre packs)."
    },
    {
      use: "Relaxation for surgery after intubation",
      with: "atracurium",
      note: "0.5 mg/kg IV given slowly, top-ups 0.1–0.2 mg/kg. Best choice in kidney or liver failure. Needs a fridge. Vecuronium 0.1 mg/kg is the other straight swap."
    }
  ],
  pancuronium: [
    {
      use: "Relaxation for surgery",
      with: "vecuronium",
      note: "0.1 mg/kg IV, top-ups 0.02–0.03 mg/kg. Shorter, less residual paralysis and no rise in heart rate — the better drug for most operations."
    },
    {
      use: "Relaxation in kidney failure",
      with: "atracurium",
      note: "0.5 mg/kg IV given slowly. Its breakdown does not depend on the kidney, whereas pancuronium can last many hours in kidney failure."
    }
  ],
  terbutaline: [
    {
      use: "Acute asthma (inhaled route available)",
      with: "salbutamol",
      note: "Inhaled salbutamol by spacer or nebuliser is first-line anyway; terbutaline injection is only for the patient with no inhaled route."
    },
    {
      use: "Severe asthma with no inhaled route",
      with: "adrenaline",
      note: "Adrenaline 1:1000 SC 0.01 mL/kg (maximum 0.3 mL child, 0.3–0.5 mL adult), repeated every 20 minutes up to 3 doses, as on the Salbutamol page. More tachycardia and BP rise than terbutaline."
    },
    {
      use: "Uterine relaxation (inversion, head entrapment, trapped placenta)",
      with: "glyceryl-trinitrate",
      note: "50 micrograms IV (repeat 50–100 micrograms) or sublingual GTN; acts in 1–2 minutes and wears off in minutes. BP checked first, fluids running. See the GTN page."
    },
    {
      use: "Uterine relaxation when neither GTN nor terbutaline is available",
      with: "magnesium-sulfate",
      note: "Williams lists IV magnesium sulfate as an alternative relaxant for inversion; slower. Use the loading dose on its page, with calcium gluconate at hand. General anaesthesia with a halogenated agent is the other option."
    },
    {
      use: "Tocolysis to allow antenatal corticosteroids and transfer",
      with: "nifedipine",
      note: "The preferred tocolytic: 20 mg orally, then 10–20 mg every 6–8 h for up to 48 h (see its page). Do not combine it with magnesium as tocolytics."
    }
  ],

  /* ---- anticoagulant, infection and topical ---- */
  rivaroxaban: [
    {
      use: "Stroke prevention in atrial fibrillation (no mechanical valve, no rheumatic mitral stenosis)",
      with: "warfarin",
      note: "Needs INR monitoring (target 2.0–3.0). Switch by giving both until the INR is 2.0 or more, then stop rivaroxaban (see Rivaroxaban: switching). Aspirin is not an adequate substitute."
    },
    {
      use: "Stroke prevention in atrial fibrillation, if the patient can obtain another DOAC",
      with: "apixaban",
      note: "5 mg twice daily (2.5 mg twice daily only by apixaban's own criteria). Start the first apixaban tablet when the next rivaroxaban dose would have been due. Apixaban can be taken without food. Not for valves or rheumatic mitral stenosis either."
    },
    {
      use: "DVT or PE treatment",
      with: "heparin",
      note: "Enoxaparin 1 mg/kg SC every 12 hours for the whole course (once daily if creatinine clearance is under 30 mL/min), starting when the next tablet would have been due. Warfarin overlapped with heparin is the other option where INR testing exists."
    },
    {
      use: "Mechanical heart valve or moderate–severe rheumatic mitral stenosis",
      with: "warfarin",
      note: "Rivaroxaban is the wrong drug here (Harrison); in rheumatic AF it did worse than warfarin (INVICTUS). Change to warfarin at the valve target INR with heparin cover until it is in range (see Warfarin). Refer if you cannot measure the INR."
    },
    {
      use: "Pregnancy, or a woman planning pregnancy",
      with: "heparin",
      note: "Stop rivaroxaban and change to enoxaparin (or unfractionated heparin) as soon as pregnancy is known. DOACs cross the placenta (Harrison)."
    }
  ],
  atovaquone: [
    {
      use: "PCP prophylaxis (first choice)",
      with: "cotrimoxazole",
      note: "Cotrimoxazole is always first: it also prevents toxoplasmosis, malaria, bacterial pneumonia and diarrhoea. After a mild, non-mucosal rash a supervised rechallenge may be possible (national guideline); never after Stevens-Johnson syndrome, blistering, mucosal sores or fever with rash."
    },
    {
      use: "PCP prophylaxis when cotrimoxazole cannot be used",
      with: "dapsone",
      note: "100 mg daily if G6PD is normal. Dapsone cross-reacts with sulfonamides in a substantial fraction of patients (Harrison), so after a severe cotrimoxazole reaction many clinicians avoid it. Its levels also fall on rifampicin."
    },
    {
      use: "PCP prophylaxis when neither cotrimoxazole nor dapsone can be used, or during rifampicin TB treatment",
      with: "pentamidine",
      note: "Monthly aerosolised pentamidine 300 mg with a special nebuliser — referral level and less effective than cotrimoxazole (Harrison). Do not leave the patient unprotected while it is arranged."
    },
    {
      use: "Severe PCP treatment when cotrimoxazole cannot be used",
      with: "pentamidine",
      note: "4 mg/kg IV once daily over at least 60 minutes for 21 days — toxic (hypotension, hypoglycaemia, kidney injury, arrhythmia). Atovaquone is only for mild to moderate PCP."
    },
    {
      use: "Uncomplicated falciparum malaria",
      none: true,
      note: "Atovaquone–proguanil is itself the alternative, not the first choice. Use the national first-line ACT (artemether–lumefantrine in Ethiopia). If the patient cannot take oral treatment or has any danger sign, give artesunate as for severe malaria."
    },
    {
      use: "Severe malaria",
      with: "artesunate",
      note: "IV or IM artesunate first (see Artesunate). Atovaquone–proguanil is used only as the oral follow-on once the patient can swallow."
    }
  ],
  clotrimazole: [
    {
      use: "Vaginal candidiasis, including pregnancy",
      with: "miconazole",
      note: "Miconazole pessary or 2 % vaginal cream at night for 7 nights works as well. Not the oral gel."
    },
    {
      use: "Vaginal candidiasis, NOT pregnant",
      with: "fluconazole",
      note: "150 mg by mouth as a single dose (Harrison). Never in pregnancy; check for warfarin and QT drugs first."
    },
    {
      use: "Vaginal candidiasis in pregnancy when no topical azole is stocked",
      none: true,
      note: "Nystatin pessaries are the alternative. Do not give oral fluconazole instead; treatment can wait a day for a pessary or a referral (see Fluconazole)."
    },
    {
      use: "Skin Candida, nappy rash, ringworm",
      with: "miconazole",
      note: "2 % cream twice daily, continued for 1 week after the skin looks clear. Equivalent to clotrimazole on the skin."
    },
    {
      use: "Mild oral thrush (clotrimazole troches)",
      with: "fluconazole",
      note: "100–200 mg daily for 7–14 days in adults, 3–6 mg/kg daily in children (see Fluconazole). Nystatin suspension or miconazole oral gel are the topical options; never the oral gel with warfarin."
    }
  ],
  miconazole: [
    {
      use: "Vaginal candidiasis, including pregnancy",
      with: "clotrimazole",
      note: "100 mg pessary at night for 7 nights. The better choice for a woman on warfarin."
    },
    {
      use: "Skin Candida, nappy rash, ringworm",
      with: "clotrimazole",
      note: "1 % cream twice daily, continued for 1 week after the skin looks clear."
    },
    {
      use: "Oral thrush in an adult or child (not on warfarin)",
      with: "fluconazole",
      note: "Adult 100–200 mg daily for 7–14 days; child 3–6 mg/kg daily (see Fluconazole). Fluconazole also raises the INR on warfarin."
    },
    {
      use: "Oral thrush in an infant under 4 months, or in a patient on warfarin",
      none: true,
      note: "Nystatin oral suspension: it is not absorbed, does not affect the INR, and is the usual treatment in young infants (Nelson). Mild thrush in a well baby may need no treatment at all (Nelson)."
    }
  ]
};
