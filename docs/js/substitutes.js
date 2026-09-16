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
    {use: "Allergic itch or urticaria",none: true,note: "Use chlorphenamine, cetirizine or loratadine if stocked (not in this app)."},
    {use: "Nausea and vomiting",none: true,note: "Use metoclopramide or ondansetron if stocked (not in this app). Chlorpromazine is a last-line antiemetic because of hypotension."}
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
    {use: "Drug-induced parkinsonism (no anticholinergic in stock)",none: true,note: "Lower the antipsychotic dose or switch to a drug with fewer movement effects (quetiapine, olanzapine, aripiprazole). Amantadine if stocked (not in this app)."},
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
      note: "1 mg/kg every 3–4 weeks is the South-East Asia option. WHO's East Africa recommendation is pentamidine isethionate 4 mg/kg (300 mg adult) every 3–4 weeks — pentamidine is not yet in this app."
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
      note: "Azithromycin 20 mg/kg orally as a single dose (maximum 1 g; adults 1 g) is the preferred antibiotic and the one used for mass treatment — it is not in this app's drug list. Chloramphenicol 1 % eye ointment is a local alternative where it is stocked. If none of these exists, treat facial cleanliness and environment, epilate trichiatic lashes, and report the case to the woreda health office: individual antibiotics do not control trachoma."
    },
    {
      use: "Established gonococcal or chlamydial ophthalmia neonatorum",
      none: true,
      note: "There is NO topical substitute. This needs systemic treatment: ceftriaxone 50 mg/kg IM once (maximum 150 mg) for gonococcus, oral erythromycin 50 mg/kg/day in 4 doses for 14 days for chlamydia, plus hourly saline irrigation and treatment of the mother and her partner."
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
      none: true,
      note: "Ciprofloxacin does nothing here and neither does any other antibacterial. The drug is natamycin 5 % suspension, which is rarely stocked. Suspect fungus after injury with plant or grain material, in a slow ulcer with feathery edges and satellite lesions. Refer urgently and do not give a steroid."
    },
    {
      use: "Prophylaxis after foreign-body removal or a corneal abrasion",
      with: "tetracycline-eye",
      note: "1 % ointment 3 times daily for 3–5 days is entirely adequate for this indication and is usually the cheaper item on the shelf."
    }
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
      note: "Chlorhexidine 0.05 % aqueous (NOT the alcoholic or detergent preparations, and not higher strengths) is the accepted alternative for the conjunctival sac — it is not in this app's drug list. Record why iodine was avoided. Note that a reaction to intravenous radiographic contrast or to shellfish is NOT an iodine allergy and is not a reason to omit antisepsis."
    },
    {
      use: "Preventing endophthalmitis",
      none: true,
      note: "Do not substitute an antibiotic drop for the antiseptic. Povidone-iodine 5 % left in the conjunctival sac for 3 minutes before the procedure has better evidence behind it than any pre-operative antibiotic, and costs a fraction as much."
    }
  ]
};
