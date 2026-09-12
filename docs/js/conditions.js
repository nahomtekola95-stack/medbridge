/* ============================================================
   MedBridge clinical cases — drug bundles by presenting problem.
   Each case lists the drugs actually used, in the order they are
   reached for, with the role each one plays. DRAFT until reviewed.
   role: first | adjunct | supportive | alternative | avoid
   ============================================================ */
window.CASE_GROUPS = {
  emergency:  "Emergency & resuscitation",
  obstetric:  "Obstetric",
  surgical:   "Surgical",
  medical:    "Adult medical",
  paediatric: "Paediatric & neonatal"
};

window.CONDITIONS = [
/* ---------------- EMERGENCY ---------------- */
{
  id: "anaphylaxis", name: "Anaphylaxis", group: "emergency",
  aka: ["allergic shock", "severe allergic reaction"],
  summary: "Sudden airway, breathing or circulation compromise after an allergen. Adrenaline is the only drug that changes the outcome, and delay is the commonest cause of death.",
  redflags: ["Stridor, hoarseness or tongue swelling", "Wheeze with increasing effort", "Systolic BP falling or collapse", "Symptoms after an injection, drug, food or sting"],
  steps: [
    "Adrenaline IM into the anterolateral thigh IMMEDIATELY. Do not wait for IV access.",
    "Lie flat and raise the legs, or sit up if breathing is the main problem. Never stand the patient up.",
    "High-flow oxygen. Large-bore IV and a rapid fluid bolus if hypotensive.",
    "Repeat adrenaline every 5 minutes until improving.",
    "Observe 6–12 hours for a biphasic reaction."
  ],
  drugs: [
    { id: "adrenaline", role: "first", note: "0.5 mg IM adult, 0.01 mg/kg child (max 0.5 mg). Repeat every 5–15 min. This is the treatment." },
    { id: "ringers-lactate", role: "first", note: "20 mL/kg child, 500–1000 mL adult, fast, for hypotension." },
    { id: "salbutamol", role: "adjunct", note: "For persistent wheeze after adrenaline." },
    { id: "hydrocortisone", role: "adjunct", note: "200 mg adult IM/IV. Does not treat the acute event; may reduce biphasic reactions." },
    { id: "noradrenaline", role: "alternative", note: "Infusion for shock that persists after repeated adrenaline and fluids." }
  ],
  sources: [{ name: "Resuscitation Council UK. Emergency treatment of anaphylaxis, 2021" }, { name: "WHO Pocket Book 2013" }],
  review: { status: "draft" }
},
{
  id: "cardiac-arrest", name: "Cardiac arrest", group: "emergency",
  aka: ["CPR", "resuscitation", "VF", "asystole"],
  summary: "Good chest compressions and early defibrillation are what work. Drugs are secondary, and reversible causes matter more than any of them in this setting.",
  redflags: ["No pulse, no breathing", "Reversible causes: hypoxia, hypovolaemia, hypo/hyperkalaemia, hypothermia, toxins, tamponade, tension pneumothorax, thrombosis"],
  steps: [
    "Compressions 100–120/min, depth one third of the chest, minimal interruption.",
    "Ventilate with a bag-valve-mask; in children hypoxia is nearly always the cause.",
    "Shock VF and pulseless VT as early as possible if a defibrillator exists.",
    "Adrenaline every 3–5 min; amiodarone after the third shock.",
    "Treat the reversible cause: fluids, glucose, potassium, decompress a tension pneumothorax."
  ],
  drugs: [
    { id: "adrenaline", role: "first", note: "Adult 1 mg IV/IO every 3–5 min; child 0.01 mg/kg (0.1 mL/kg of 1:10 000). Dilute from 1:1000." },
    { id: "amiodarone", role: "first", note: "5 mg/kg (adult 300 mg) IV push after the third shock in VF/pulseless VT." },
    { id: "lidocaine", role: "alternative", note: "1 mg/kg IV/IO when amiodarone is unavailable." },
    { id: "calcium-gluconate", role: "adjunct", note: "For hyperkalaemia, hypocalcaemia or calcium-channel-blocker overdose as the cause." },
    { id: "dextrose", role: "adjunct", note: "Check and treat glucose in every arrest, especially in children." },
    { id: "sodium-bicarbonate", role: "adjunct", note: "1 mmol/kg only for hyperkalaemia, tricyclic overdose or prolonged arrest with adequate ventilation." },
    { id: "ringers-lactate", role: "supportive", note: "Volume for hypovolaemic arrest." },
    { id: "atropine", role: "supportive", note: "Not for arrest; for peri-arrest bradycardia after oxygenation." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 79 PALS algorithms, pp. 561–566" }, { name: "AHA PALS/ACLS 2020" }],
  review: { status: "draft" }
},
{
  id: "septic-shock", name: "Septic shock", group: "emergency",
  aka: ["sepsis", "shock"],
  summary: "Infection with circulatory failure. Antibiotics within the first hour and careful fluid resuscitation matter more than any vasopressor, and in settings without intensive care, cautious fluids are safer than large boluses.",
  redflags: ["Cold hands with capillary refill over 3 s and a weak fast pulse", "Confusion or reduced consciousness", "Falling urine output", "Lactate rising where measurable"],
  steps: [
    "Take cultures if possible, but never delay antibiotics for them.",
    "Antibiotics within 1 hour.",
    "Fluids: adults 30 mL/kg crystalloid; children 10–20 mL/kg boluses with reassessment, and NOT large boluses in a febrile child without shock (FEAST).",
    "Start a vasopressor if the blood pressure stays low after fluids. Peripheral noradrenaline through a large proximal vein is acceptable.",
    "Find and drain the source: pus, obstructed urine, retained products, an infected line."
  ],
  drugs: [
    { id: "ceftriaxone", role: "first", note: "Broad first-line where the source is unknown; 50–80 mg/kg, adult 2 g." },
    { id: "gentamicin", role: "first", note: "Once daily, with ampicillin or a cephalosporin. Watch urine output." },
    { id: "ampicillin", role: "first", note: "With gentamicin, particularly in neonates and young infants." },
    { id: "metronidazole", role: "adjunct", note: "Add for an abdominal or pelvic source." },
    { id: "ringers-lactate", role: "first", note: "Resuscitation fluid. Reassess after every bolus." },
    { id: "noradrenaline", role: "first", note: "First-choice vasopressor. Microdrip plus burette gives a countable rate without a pump." },
    { id: "adrenaline", role: "alternative", note: "Where noradrenaline is unavailable; also the push-dose bridge." },
    { id: "dopamine", role: "alternative", note: "Often the only vasoactive drug stocked at primary hospitals." },
    { id: "hydrocortisone", role: "adjunct", note: "For shock that persists despite fluids and vasopressors." },
    { id: "dextrose", role: "supportive", note: "Hypoglycaemia is common and easily missed." },
    { id: "blood-transfusion", role: "supportive", note: "For severe anaemia contributing to shock." }
  ],
  sources: [{ name: "Surviving Sepsis Campaign 2021" }, { name: "Maitland K et al. FEAST. NEJM 2011" }, { name: "Nelson 22nd ed. 2024, ch. 85, p. 611" }],
  review: { status: "draft" }
},
{
  id: "status-epilepticus", name: "Status epilepticus", group: "emergency",
  aka: ["continuous seizure", "fitting", "convulsion"],
  summary: "A seizure lasting over 5 minutes, or repeated seizures without recovery. Treat the airway and the glucose while you treat the seizure, and remember the cause is often meningitis, cerebral malaria or eclampsia.",
  redflags: ["Seizure over 5 minutes", "Not regaining consciousness between seizures", "Pregnancy — this is eclampsia until proved otherwise", "Fever with neck stiffness", "Low glucose"],
  steps: [
    "Airway, recovery position, oxygen. Do not force anything into the mouth.",
    "Check glucose in every convulsing patient and treat if low or unmeasurable.",
    "Benzodiazepine now: IM or intranasal midazolam, or rectal diazepam if no IV.",
    "Repeat once after 5–10 minutes if still fitting.",
    "Second-line: phenobarbital IM/IV, or phenytoin by slow infusion.",
    "In pregnancy the drug is magnesium sulfate, not a benzodiazepine."
  ],
  drugs: [
    { id: "midazolam", role: "first", note: "0.2 mg/kg IM (max 10 mg), or intranasal/buccal. As effective as IV lorazepam and faster to give." },
    { id: "diazepam", role: "first", note: "0.5 mg/kg rectally using the IV solution when there is no IV access." },
    { id: "dextrose", role: "first", note: "Check glucose in everyone. 5 mL/kg of 10 % in a child." },
    { id: "phenobarbital", role: "adjunct", note: "15–20 mg/kg IM or IV — the practical second line where there is no pump or monitor." },
    { id: "phenytoin", role: "alternative", note: "18–20 mg/kg by slow infusion in saline only, with pulse monitoring. Never IM." },
    { id: "magnesium-sulfate", role: "first", note: "The correct drug in eclampsia. Pritchard IM regimen needs no pump." },
    { id: "ceftriaxone", role: "adjunct", note: "If meningitis is possible, give it early." },
    { id: "artesunate", role: "adjunct", note: "Cerebral malaria in an endemic area." },
    { id: "paracetamol", role: "supportive", note: "For fever, which lowers the seizure threshold in children." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 633.8, p. 3628" }, { name: "Silbergleit R et al. RAMPART. NEJM 2012" }, { name: "WHO Pocket Book 2013" }],
  review: { status: "draft" }
},
{
  id: "organophosphate", name: "Organophosphate poisoning", group: "emergency",
  aka: ["pesticide poisoning", "insecticide", "carbamate"],
  summary: "Agricultural pesticide poisoning is common in farming communities and kills through secretions and respiratory failure. Under-dosing atropine is the usual reason patients die.",
  redflags: ["Wet chest, drooling, sweating, pinpoint pupils", "Bradycardia and hypotension", "Muscle fasciculation then weakness", "Intermediate syndrome: weakness returning at 24–96 hours"],
  steps: [
    "Protect yourself: gloves and apron. Remove contaminated clothing and wash the skin.",
    "Airway and suction. Oxygen. Intubate and ventilate if you can.",
    "Atropine by dose doubling every 5 minutes until the chest is clear, the skin is dry and the pulse is above 80.",
    "Then maintain atropinisation with hourly boluses or a gravity infusion.",
    "Add pralidoxime where available; diazepam for seizures and agitation.",
    "Watch for the intermediate syndrome for at least 4 days."
  ],
  drugs: [
    { id: "atropine", role: "first", note: "2–5 mg adult (0.05 mg/kg child) then DOUBLE every 5 min. Total doses of 20–100 mg or more are normal." },
    { id: "diazepam", role: "adjunct", note: "For seizures and agitation; also reduces mortality in severe poisoning." },
    { id: "midazolam", role: "alternative", note: "If diazepam is unavailable." },
    { id: "ringers-lactate", role: "supportive", note: "For hypotension after atropinisation." },
    { id: "adrenaline", role: "supportive", note: "If shock persists despite atropine and fluids." }
  ],
  sources: [{ name: "Eddleston M et al. Lancet 2008" }, { name: "WHO. Clinical management of acute pesticide intoxication, 2008" }],
  review: { status: "draft" }
},
{
  id: "opioid-overdose", name: "Opioid overdose", group: "emergency",
  aka: ["morphine overdose", "respiratory depression", "pethidine"],
  summary: "Pinpoint pupils, reduced consciousness and slow breathing. Ventilation keeps the patient alive; naloxone simply buys time, and it wears off before the opioid does.",
  redflags: ["Respiratory rate under 10 in an adult", "Pinpoint pupils", "Post-operative or palliative patient given an opioid", "Newborn whose mother had pethidine in labour"],
  steps: [
    "Open the airway and ventilate with a bag-valve-mask. This is the treatment.",
    "Naloxone titrated in small increments to restore breathing without abolishing analgesia.",
    "Watch for at least 2–4 hours, longer after long-acting opioids, because the naloxone wears off first.",
    "In a newborn, ventilate; do not give naloxone if the mother is opioid dependent."
  ],
  drugs: [
    { id: "naloxone", role: "first", note: "Dilute 0.4 mg to 10 mL and give 1 mL (40 mcg) every 1–2 min. Full dose 0.1 mg/kg only in overdose." },
    { id: "ringers-lactate", role: "supportive", note: "For hypotension." },
    { id: "dextrose", role: "supportive", note: "Check glucose in every unconscious patient." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, Table 79.5, p. 563" }, { name: "WHO. Community management of opioid overdose, 2014" }],
  review: { status: "draft" }
},
{
  id: "hyperkalaemia", name: "Hyperkalaemia", group: "emergency",
  aka: ["high potassium", "renal failure", "crush injury"],
  summary: "Often found late, in renal failure, crush injury or severe dehydration. Calcium protects the heart within minutes but does not lower the potassium; the shifting agents do that, and only temporarily.",
  redflags: ["Peaked T waves, wide QRS or absent P waves on ECG", "Potassium 6.5 mmol/L or above", "Anuria, crush injury, or severe muscle breakdown", "Weakness or palpitations"],
  steps: [
    "Calcium first if there are any ECG changes.",
    "Then insulin with glucose, and nebulised salbutamol, to shift potassium into the cells.",
    "Stop all potassium-containing fluids, including Ringer's lactate, and any potassium-sparing drug.",
    "Treat the cause: rehydrate, relieve obstruction, treat sepsis.",
    "Arrange dialysis or referral — all of these measures wear off within hours."
  ],
  drugs: [
    { id: "calcium-gluconate", role: "first", note: "10–30 mL of 10 % slowly. Protects the myocardium for 30–60 min. Never in the same line as bicarbonate." },
    { id: "insulin-soluble", role: "first", note: "10 units with 25 g glucose over 15–30 min. Check glucose every 30 min for 6 h." },
    { id: "dextrose", role: "first", note: "Always with the insulin. Use 10 % if no 50 % is available." },
    { id: "salbutamol", role: "adjunct", note: "Nebulised 10–20 mg adult; shifts potassium and needs no IV." },
    { id: "sodium-bicarbonate", role: "adjunct", note: "1–2 mmol/kg, mainly useful when there is an acidosis. Flush the line between calcium and bicarbonate." },
    { id: "furosemide", role: "adjunct", note: "Only if the patient still passes urine." },
    { id: "ringers-lactate", role: "avoid", note: "Contains potassium. Use 0.9 % saline instead." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 573, p. 3245" }, { name: "UK Kidney Association, 2023" }],
  review: { status: "draft" }
},
/* ---------------- OBSTETRIC ---------------- */
{
  id: "pre-eclampsia", name: "Severe pre-eclampsia", group: "obstetric",
  aka: ["hypertension in pregnancy", "PIH", "proteinuria"],
  summary: "Blood pressure at or above 160/110 with proteinuria, or with any severe feature. Two drugs matter: magnesium sulfate to prevent the fit, and an antihypertensive to prevent the stroke. Delivery is the cure.",
  redflags: ["Systolic 160 or diastolic 110 or above", "Headache, visual disturbance, epigastric pain", "Brisk reflexes and clonus", "Falling platelets, rising creatinine, or reduced urine output", "Fetal growth restriction or reduced movements"],
  steps: [
    "Magnesium sulfate loading dose now — do not wait for the fit.",
    "Lower the blood pressure to a diastolic of 90–100, not to normal.",
    "Antenatal corticosteroids if under 34 weeks.",
    "Catheterise and chart urine output; check reflexes and respiratory rate before every magnesium dose.",
    "Plan delivery. Stabilise first, then deliver; magnesium continues for 24 hours afterwards."
  ],
  drugs: [
    { id: "magnesium-sulfate", role: "first", note: "Pritchard IM regimen: 4 g IV + 10 g IM, then 5 g IM every 4 h. Needs no pump." },
    { id: "calcium-gluconate", role: "first", note: "The antidote. 1 g IV over 10 min. Must be on the tray before the first magnesium dose." },
    { id: "hydralazine", role: "first", note: "5 mg IV slowly, repeated; or 12.5 mg IM at health-centre level." },
    { id: "labetalol", role: "first", note: "Escalating IV boluses need no pump. Avoid in asthma." },
    { id: "nifedipine", role: "alternative", note: "10 mg oral, swallowed not sublingual, when no injectable is available." },
    { id: "dexamethasone", role: "adjunct", note: "6 mg IM every 12 h × 4 doses if under 34 weeks." },
    { id: "oxytocin", role: "supportive", note: "For the third stage. Preferred over ergometrine here." },
    { id: "ergometrine", role: "avoid", note: "Contraindicated — causes stroke and seizures in hypertensive women." }
  ],
  sources: [{ name: "WHO. Managing Complications in Pregnancy and Childbirth, 2017" }, { name: "WHO recommendations: drug treatment for severe hypertension in pregnancy, 2018" }],
  review: { status: "draft" }
},
{
  id: "eclampsia", name: "Eclampsia", group: "obstetric",
  aka: ["fit in pregnancy", "convulsion in pregnancy"],
  summary: "A seizure in pregnancy or the puerperium with pre-eclampsia. The drug is magnesium sulfate, not diazepam. Benzodiazepines are less effective and sedate both mother and baby.",
  redflags: ["Any seizure in pregnancy or within 6 weeks of delivery", "Repeated fits", "Coma between fits", "Very high blood pressure"],
  steps: [
    "Left lateral position, airway, oxygen, protect from injury. Do not leave her alone.",
    "Magnesium sulfate loading dose immediately, then the 4-hourly IM regimen for 24 hours.",
    "Control the blood pressure once the fit is over.",
    "Catheterise. Check respiratory rate, reflexes and urine output before every magnesium dose.",
    "Deliver once stabilised, regardless of gestation. Recurrent fit: 2 g magnesium IV over 5 minutes."
  ],
  drugs: [
    { id: "magnesium-sulfate", role: "first", note: "4 g IV over 5–20 min plus 10 g IM, then 5 g IM every 4 h for 24 h after the last fit or delivery." },
    { id: "calcium-gluconate", role: "first", note: "Antidote for respiratory depression: 1 g IV over 10 min." },
    { id: "hydralazine", role: "first", note: "After the fit, to bring the diastolic to 90–100." },
    { id: "labetalol", role: "alternative", note: "Where stocked and no asthma." },
    { id: "nifedipine", role: "alternative", note: "Oral, when no injectable antihypertensive exists." },
    { id: "diazepam", role: "alternative", note: "Only if magnesium is genuinely unavailable. Less effective and sedates the newborn." },
    { id: "oxytocin", role: "supportive", note: "Third stage and prevention of PPH." },
    { id: "ergometrine", role: "avoid", note: "Contraindicated in hypertension." }
  ],
  sources: [{ name: "WHO. Managing Complications in Pregnancy and Childbirth, 2017" }, { name: "Pritchard JA et al. AJOG 1984" }],
  review: { status: "draft" }
},
{
  id: "pph", name: "Postpartum haemorrhage", group: "obstetric",
  aka: ["PPH", "bleeding after delivery", "uterine atony"],
  summary: "The leading cause of maternal death. Four causes: tone, tissue, trauma and thrombin. Uterine massage, uterotonics and tranexamic acid come first, and a theatre decision must not be delayed for them.",
  redflags: ["Blood loss over 500 mL, or any loss with a rising pulse or falling BP", "Soft, boggy uterus", "Retained placenta or placental fragments", "Tear or rupture", "Continued bleeding despite uterotonics — go to theatre"],
  steps: [
    "Call for help. Rub up the uterus, empty the bladder, two large cannulae, cross-match.",
    "Oxytocin first; add the others if bleeding continues.",
    "Tranexamic acid within 3 hours of birth.",
    "Look for the cause: explore for retained tissue, inspect for tears, consider rupture.",
    "Bimanual compression, aortic compression or a uterine balloon while arranging theatre.",
    "Do not wait for blood to arrive before operating on a bleeding woman."
  ],
  drugs: [
    { id: "oxytocin", role: "first", note: "10 IU IM for prevention; 20 IU in 1 L at 60 drops/min for treatment. Never undiluted IV." },
    { id: "tranexamic-acid", role: "first", note: "1 g IV over 10 min within 3 h of birth, repeat once after 30 min. Reduces death from bleeding." },
    { id: "misoprostol", role: "first", note: "800 mcg sublingual. Heat-stable, no cold chain, works at any level of care." },
    { id: "ergometrine", role: "adjunct", note: "0.2 mg IM if the BP is normal. Never in pre-eclampsia." },
    { id: "ringers-lactate", role: "first", note: "Resuscitation while blood is found." },
    { id: "blood-transfusion", role: "first", note: "Call donors early; do not wait until she is moribund." },
    { id: "metronidazole", role: "adjunct", note: "With ampicillin for sepsis after manual removal or instrumentation." },
    { id: "ampicillin", role: "adjunct", note: "Prophylaxis after manual removal of the placenta." },
    { id: "ketamine", role: "supportive", note: "For examination under anaesthesia or laparotomy where there is no anaesthetist." }
  ],
  sources: [{ name: "WHO recommendations for the prevention and treatment of PPH, 2012/2018" }, { name: "WOMAN trial. Lancet 2017" }],
  review: { status: "draft" }
},
{
  id: "preterm-labour", name: "Preterm labour", group: "obstetric",
  aka: ["threatened preterm birth", "antenatal steroids"],
  summary: "Between 24 and 34 weeks, one drug changes newborn survival more than any equipment in the hospital: a corticosteroid given to the mother. Tocolysis exists only to buy time for it and for transfer.",
  redflags: ["Regular contractions before 34 weeks", "Ruptured membranes", "Fever or offensive discharge — do not give steroids or tocolysis", "Bleeding or fetal distress"],
  steps: [
    "Give the first dose of dexamethasone immediately. Do not wait for certainty about the gestation.",
    "Exclude infection. Chorioamnionitis is a contraindication to steroids and to tocolysis.",
    "Tocolysis with nifedipine for up to 48 hours while the steroid course is given and transfer is arranged.",
    "Transfer the mother with the baby inside her if a newborn unit is reachable; that is safer than transferring a preterm newborn.",
    "Magnesium sulfate for neuroprotection before 32 weeks where protocol allows.",
    "Prepare for the birth: warmth, a clean cord, kangaroo care, and someone able to ventilate."
  ],
  drugs: [
    { id: "dexamethasone", role: "first", note: "6 mg IM every 12 h for 4 doses between 24 and 34 weeks. The single most effective intervention here." },
    { id: "nifedipine", role: "adjunct", note: "20 mg oral then 10–20 mg every 6–8 h for up to 48 h. Buys time; does not improve outcome by itself." },
    { id: "magnesium-sulfate", role: "adjunct", note: "Fetal neuroprotection under 32 weeks where the protocol includes it." },
    { id: "benzylpenicillin", role: "adjunct", note: "Intrapartum prophylaxis for group B streptococcus; also for prolonged rupture of membranes." },
    { id: "ampicillin", role: "adjunct", note: "With ruptured membranes to prolong latency and reduce infection." },
    { id: "caffeine-citrate", role: "supportive", note: "For the baby after birth: apnoea of prematurity." },
    { id: "vitamin-k", role: "supportive", note: "1 mg IM to the newborn, 0.5 mg if under 1500 g." }
  ],
  sources: [{ name: "WHO recommendations on interventions to improve preterm birth outcomes, 2015/2022" }],
  review: { status: "draft" }
},
{
  id: "puerperal-sepsis", name: "Puerperal sepsis & chorioamnionitis", group: "obstetric",
  aka: ["postpartum infection", "endometritis", "septic abortion"],
  summary: "Fever with uterine tenderness or offensive lochia after birth, abortion or ruptured membranes. Antibiotics plus evacuation of infected tissue; antibiotics alone will not cure a uterus full of retained products.",
  redflags: ["Fever with a tender uterus or offensive discharge", "Tachycardia out of proportion to the fever", "Recent instrumentation or unsafe abortion", "Signs of shock or peritonitis — go to theatre"],
  steps: [
    "Triple antibiotics IV immediately.",
    "Evacuate retained products; drain any pelvic collection.",
    "Fluids and transfusion as needed; tetanus prophylaxis after unsafe abortion.",
    "Reassess at 48 hours; if no better, look for an abscess or a retained fragment.",
    "Do not discharge until afebrile for 48 hours."
  ],
  drugs: [
    { id: "ampicillin", role: "first", note: "2 g IV every 6 h, with gentamicin and metronidazole." },
    { id: "gentamicin", role: "first", note: "Once daily by weight." },
    { id: "metronidazole", role: "first", note: "500 mg every 8 h; oral is as good as IV once she can swallow." },
    { id: "ceftriaxone", role: "alternative", note: "Where the triple regimen is unavailable, with metronidazole." },
    { id: "oxytocin", role: "adjunct", note: "To contract the uterus during and after evacuation." },
    { id: "misoprostol", role: "adjunct", note: "For evacuation of an incomplete abortion where surgical evacuation is delayed." },
    { id: "ringers-lactate", role: "supportive", note: "Resuscitation." },
    { id: "paracetamol", role: "supportive", note: "Fever and pain." },
    { id: "blood-transfusion", role: "supportive", note: "For anaemia from bleeding or haemolysis." }
  ],
  sources: [{ name: "WHO. Managing Complications in Pregnancy and Childbirth, 2017" }, { name: "WHO recommendations for prevention and treatment of maternal peripartum infections, 2015" }],
  review: { status: "draft" }
},
{
  id: "caesarean", name: "Caesarean section", group: "obstetric",
  aka: ["C-section", "operative delivery", "spinal"],
  summary: "In a hospital without an anaesthetist, spinal anaesthesia is the safest technique and needs no machine. Plan the anaesthesia, the prophylaxis, the uterotonic and the analgesia before the knife.",
  redflags: ["Uncorrected hypovolaemia — do not give a spinal", "Coagulopathy or sepsis at the puncture site", "Fetal distress requiring speed", "Anticipated haemorrhage: placenta praevia, previous scar, prolonged obstructed labour"],
  steps: [
    "IV access, fluid co-load, vasopressor drawn up before the block.",
    "Antibiotic prophylaxis within 60 minutes before the incision.",
    "Spinal anaesthesia with heavy bupivacaine; keep a left lateral tilt.",
    "Oxytocin after delivery of the baby; have a second uterotonic and tranexamic acid ready.",
    "Infiltrate the wound before closing, and start regular paracetamol immediately."
  ],
  drugs: [
    { id: "bupivacaine", role: "first", note: "2–2.5 mL of 0.5 % heavy intrathecally at L3–L4." },
    { id: "adrenaline", role: "first", note: "Push-dose dilution for spinal hypotension where no ephedrine exists." },
    { id: "ringers-lactate", role: "first", note: "Co-load 500–1000 mL during the block." },
    { id: "ceftriaxone", role: "first", note: "Single dose within 60 min before incision." },
    { id: "oxytocin", role: "first", note: "After delivery of the baby, to contract the uterus." },
    { id: "ketamine", role: "alternative", note: "When spinal is contraindicated or has failed, and no anaesthetist is available." },
    { id: "lidocaine", role: "alternative", note: "Local infiltration in layers when nothing else is possible." },
    { id: "tranexamic-acid", role: "adjunct", note: "For bleeding, and prophylactically in high-risk cases." },
    { id: "misoprostol", role: "adjunct", note: "Second uterotonic for atony on the table." },
    { id: "paracetamol", role: "supportive", note: "Regular, by the clock, from the end of surgery." },
    { id: "morphine", role: "supportive", note: "For breakthrough pain in the first 24 h." }
  ],
  sources: [{ name: "WHO. Surgical Care at the District Hospital, 2003" }, { name: "MSF Clinical Guidelines — Anaesthesia" }],
  review: { status: "draft" }
},
/* ---------------- SURGICAL ---------------- */
{
  id: "bowel-obstruction", name: "Intestinal obstruction", group: "surgical",
  aka: ["surgical obstruction", "bowel obstruction", "volvulus", "strangulated hernia", "ileus"],
  summary: "Vomiting, distension, absolute constipation and colicky pain. The treatment is decompression, resuscitation and an operation; drugs support that and do not replace it. Sigmoid volvulus and strangulated hernia are the common causes in the region.",
  redflags: ["Tenderness, guarding or fever — strangulation, operate now", "Irreducible tender hernia", "Absent bowel sounds with a silent, distended abdomen", "Shock, or a rising pulse with a falling urine output", "A child with a palpable mass and redcurrant stool — intussusception"],
  steps: [
    "Nil by mouth. Pass a wide nasogastric tube and leave it on free drainage; measure the aspirate.",
    "Two large cannulae. Resuscitate with saline or Ringer's lactate; losses are large and underestimated.",
    "Catheterise and chart urine output hourly — this is the best guide to adequate resuscitation.",
    "Replace potassium once the patient is passing urine; these patients are usually depleted.",
    "Antibiotics if strangulation, perforation or peritonitis is suspected, and before any operation.",
    "Operate for strangulation, peritonitis or failed conservative management. Do not resuscitate indefinitely."
  ],
  drugs: [
    { id: "ringers-lactate", role: "first", note: "Large volumes are needed. Reassess with pulse, BP and urine output." },
    { id: "potassium-chloride", role: "first", note: "Add 20–40 mmol per litre once urine is flowing. Never as a bolus." },
    { id: "metronidazole", role: "first", note: "Anaerobic cover for strangulation, perforation or peritonitis." },
    { id: "gentamicin", role: "first", note: "Gram-negative cover; watch renal function in a dehydrated patient." },
    { id: "ampicillin", role: "first", note: "The third part of the classic triple regimen." },
    { id: "ceftriaxone", role: "alternative", note: "With metronidazole where the triple regimen is unavailable." },
    { id: "morphine", role: "supportive", note: "Titrated. Pain relief does not mask the diagnosis; a tender abdomen stays tender." },
    { id: "paracetamol", role: "supportive", note: "Regular, to reduce the opioid requirement." },
    { id: "bupivacaine", role: "supportive", note: "Spinal for a lower abdominal laparotomy where appropriate." },
    { id: "ketamine", role: "supportive", note: "Anaesthesia where no anaesthetist is available; avoid spinal in the shocked patient." },
    { id: "blood-transfusion", role: "supportive", note: "For anaemia or bleeding at operation." },
    { id: "atropine", role: "adjunct", note: "With ketamine, to reduce secretions." }
  ],
  sources: [{ name: "WHO. Surgical Care at the District Hospital, 2003" }, { name: "MSF Clinical Guidelines — surgical emergencies" }],
  review: { status: "draft" }
},
{
  id: "peritonitis", name: "Peritonitis & perforation", group: "surgical",
  aka: ["acute abdomen", "appendicitis", "typhoid perforation", "peptic ulcer perforation"],
  summary: "A rigid, silent abdomen after perforation of appendix, ulcer or typhoid bowel. Resuscitate, give antibiotics and operate. Typhoid perforation is common in the region and carries high mortality when the operation is delayed.",
  redflags: ["Board-like rigidity and rebound tenderness", "Free gas under the diaphragm on an erect film", "Shock with a rigid abdomen", "Prolonged fever before the pain — think typhoid"],
  steps: [
    "Nil by mouth, nasogastric tube, two cannulae, catheter.",
    "Aggressive fluid resuscitation to restore urine output before anaesthesia.",
    "Triple antibiotics immediately, before the operation.",
    "Laparotomy: wash out, close or resect the perforation.",
    "Continue antibiotics after surgery and watch for wound dehiscence and abscess."
  ],
  drugs: [
    { id: "ringers-lactate", role: "first", note: "Resuscitation before induction; these patients are profoundly depleted." },
    { id: "ampicillin", role: "first", note: "Triple regimen with gentamicin and metronidazole." },
    { id: "gentamicin", role: "first", note: "Once daily; monitor urine output." },
    { id: "metronidazole", role: "first", note: "Essential anaerobic cover." },
    { id: "ceftriaxone", role: "first", note: "First-line for typhoid perforation, with metronidazole." },
    { id: "chloramphenicol", role: "alternative", note: "For susceptible typhoid where cephalosporins are unavailable." },
    { id: "morphine", role: "supportive", note: "Titrated intravenously." },
    { id: "paracetamol", role: "supportive", note: "Regular." },
    { id: "ketamine", role: "supportive", note: "Anaesthesia for the shocked patient; spinal is contraindicated in hypovolaemia." },
    { id: "potassium-chloride", role: "adjunct", note: "After surgery, once urine is flowing." },
    { id: "blood-transfusion", role: "supportive", note: "As required." }
  ],
  sources: [{ name: "WHO. Surgical Care at the District Hospital, 2003" }, { name: "MSF Clinical Guidelines" }],
  review: { status: "draft" }
},
{
  id: "trauma", name: "Trauma & haemorrhagic shock", group: "surgical",
  aka: ["road traffic accident", "bleeding", "injury", "polytrauma"],
  summary: "Stop the bleeding first. Tranexamic acid within 3 hours saves lives, crystalloid does not replace blood, and the destination is the operating theatre.",
  redflags: ["Uncontrolled external bleeding", "Rising pulse with a narrowing pulse pressure", "Distended abdomen after blunt trauma", "Open fracture or crush injury", "Head injury with a falling conscious level"],
  steps: [
    "Direct pressure, tourniquet or packing for external bleeding.",
    "Airway with cervical spine control, breathing, circulation. Decompress a tension pneumothorax clinically, not radiologically.",
    "Tranexamic acid within 3 hours of injury.",
    "Limited crystalloid to a palpable radial pulse; call for blood and donors immediately.",
    "Keep the patient warm. Hypothermia stops clotting.",
    "Theatre for ongoing bleeding. Do not wait for blood to arrive."
  ],
  drugs: [
    { id: "tranexamic-acid", role: "first", note: "1 g over 10 min within 3 h, then 1 g over 8 h. Later than 3 h may be harmful." },
    { id: "blood-transfusion", role: "first", note: "The correct resuscitation fluid in haemorrhage. Start the donor call at once." },
    { id: "ringers-lactate", role: "first", note: "Bridge only. Over-infusion dilutes clotting factors." },
    { id: "morphine", role: "first", note: "Titrated intravenously in small increments for severe pain." },
    { id: "ketamine", role: "adjunct", note: "Analgesia and anaesthesia that preserves blood pressure in the shocked patient." },
    { id: "lidocaine", role: "adjunct", note: "Wound infiltration and nerve blocks, including femoral block for a fractured femur." },
    { id: "paracetamol", role: "supportive", note: "Regular background analgesia." },
    { id: "cloxacillin", role: "adjunct", note: "For open fractures and contaminated wounds." },
    { id: "metronidazole", role: "adjunct", note: "For heavily contaminated or penetrating abdominal wounds." },
    { id: "ceftriaxone", role: "adjunct", note: "Open fracture prophylaxis where protocol specifies." },
    { id: "atropine", role: "supportive", note: "With ketamine for secretions." },
    { id: "naloxone", role: "supportive", note: "If opioid analgesia causes respiratory depression." }
  ],
  sources: [{ name: "CRASH-2 collaborators. Lancet 2010" }, { name: "WHO. Surgical Care at the District Hospital, 2003" }],
  review: { status: "draft" }
},
{
  id: "burns", name: "Burns", group: "surgical",
  aka: ["scald", "burn injury", "fluid resuscitation"],
  summary: "Fluid by formula and by urine output, pain relief that actually works, and clean dressings. Under-resuscitation and under-analgesia are the two commonest failures.",
  redflags: ["Burns to face, neck, hands, feet, perineum or circumferential", "Hoarseness, soot in the nostrils, singed nasal hair — airway burn", "Over 10 % body surface in a child or 15 % in an adult", "Electrical or chemical burns"],
  steps: [
    "Cool with running water for 20 minutes; remove clothing and jewellery. Do not use ice.",
    "Estimate the percentage burned; the patient's palm with fingers is roughly 1 %.",
    "Fluid by formula from the time of the burn, adjusted to urine output of 0.5–1 mL/kg/h.",
    "Strong analgesia before every dressing change, not after the patient starts crying.",
    "Clean, cover, elevate. Tetanus prophylaxis. No prophylactic systemic antibiotics.",
    "Feed early and generously; burns are catabolic."
  ],
  drugs: [
    { id: "ringers-lactate", role: "first", note: "The resuscitation fluid. Titrate to urine output; the formula is a starting point, not a target." },
    { id: "morphine", role: "first", note: "Titrated intravenously. Under-treated burn pain is the norm and it is avoidable." },
    { id: "ketamine", role: "first", note: "1–4 mg/kg IV or 4–5 mg/kg IM for dressing changes; preserves airway reflexes at lower doses." },
    { id: "paracetamol", role: "supportive", note: "Regular background analgesia between dressings." },
    { id: "cloxacillin", role: "adjunct", note: "For established staphylococcal wound infection, not as prophylaxis." },
    { id: "metronidazole", role: "adjunct", note: "For invasive or foul-smelling wound infection." },
    { id: "blood-transfusion", role: "supportive", note: "For anaemia after excision or in extensive burns." },
    { id: "atropine", role: "adjunct", note: "Before ketamine, to reduce salivation." },
    { id: "potassium-chloride", role: "adjunct", note: "Replace after the first 24 hours as losses continue." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 91 Burn injuries, p. 654" }, { name: "WHO. Surgical Care at the District Hospital, 2003" }],
  review: { status: "draft" }
},
{
  id: "abscess", name: "Abscess, pyomyositis & osteomyelitis", group: "surgical",
  aka: ["pus", "septic arthritis", "bone infection", "cellulitis"],
  summary: "Pus must be drained. Antibiotics cannot sterilise a collection, and the usual reasons for failure are inadequate drainage and a course that stops too soon.",
  redflags: ["Fluctuance, or a tender swelling with fever", "A child refusing to move or bear weight on a limb", "A hot, swollen joint — septic arthritis is a surgical emergency", "Spreading cellulitis with systemic upset"],
  steps: [
    "Drain it. Incision and drainage, joint washout, or sequestrectomy.",
    "Send pus for culture where a laboratory exists.",
    "Antistaphylococcal antibiotic, parenterally until the fever settles.",
    "Then a long oral course: 3–6 weeks for bone, 2–3 weeks for joint or muscle.",
    "If no better at 48–72 hours, look for undrained pus before changing the antibiotic."
  ],
  drugs: [
    { id: "cloxacillin", role: "first", note: "50 mg/kg every 6 h; adult 2 g. The drug of choice for Staphylococcus aureus." },
    { id: "ceftriaxone", role: "alternative", note: "Where cloxacillin is out of stock, though weaker against staphylococci." },
    { id: "metronidazole", role: "adjunct", note: "For perianal, dental or foul-smelling collections." },
    { id: "gentamicin", role: "adjunct", note: "Added for severe sepsis or Gram-negative cover." },
    { id: "lidocaine", role: "first", note: "Field block for incision and drainage; injecting into the abscess itself does not work." },
    { id: "ketamine", role: "adjunct", note: "For drainage of a large or deep collection, or in a child." },
    { id: "paracetamol", role: "supportive", note: "Regular analgesia." },
    { id: "morphine", role: "supportive", note: "For severe pain around drainage." },
    { id: "ampicillin", role: "avoid", note: "Plain ampicillin and amoxicillin do not cover Staphylococcus aureus — a common and costly substitution error." }
  ],
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "Nelson 22nd ed. 2024, chs. 719–720" }],
  review: { status: "draft" }
},
/* ---------------- MEDICAL ---------------- */
{
  id: "dka", name: "Diabetic ketoacidosis", group: "medical",
  aka: ["DKA", "hyperglycaemia", "ketoacidosis"],
  summary: "Fluid first, insulin second, potassium always. In a hospital without pumps, hourly intramuscular insulin is a validated alternative to the infusion.",
  redflags: ["Deep sighing breathing with ketotic breath", "Drowsiness or confusion", "Potassium below 3.3 — do not start insulin yet", "Child with headache, falling pulse and rising BP — cerebral oedema"],
  steps: [
    "Fluid resuscitation first; start insulin an hour later in children.",
    "Hourly insulin IM, or an infusion through a burette if staffing allows.",
    "Add potassium to the fluids once the patient passes urine and potassium is under 5.5.",
    "Hourly glucose; switch to dextrose-containing fluid below 14 mmol/L (250 mg/dL) but keep the insulin going.",
    "Find and treat the precipitant: infection, missed insulin, new diagnosis.",
    "Stop insulin only when the acidosis has cleared and the patient is eating."
  ],
  drugs: [
    { id: "insulin-soluble", role: "first", note: "0.1 unit/kg IM every hour. No pump needed. Never stop it just because the glucose fell." },
    { id: "ringers-lactate", role: "first", note: "Or 0.9 % saline. Fluid is the first treatment, not insulin." },
    { id: "potassium-chloride", role: "first", note: "20–40 mmol per litre once urine is flowing. Hold insulin if potassium is below 3.3." },
    { id: "dextrose", role: "first", note: "Add when glucose falls below 14 mmol/L so the insulin can continue clearing ketones." },
    { id: "ceftriaxone", role: "adjunct", note: "If infection is the precipitant." },
    { id: "sodium-bicarbonate", role: "avoid", note: "Not recommended: it increases the risk of cerebral oedema in children." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 629, pp. 3525–3528" }, { name: "ISPAD Clinical Practice Consensus Guidelines 2022" }, { name: "Kitabchi AE et al. Diabetes Care 2009" }],
  review: { status: "draft" }
},
{
  id: "severe-malaria", name: "Severe malaria", group: "medical",
  aka: ["cerebral malaria", "falciparum", "malaria"],
  summary: "Artesunate rather than quinine, glucose checked repeatedly, and transfusion for severe anaemia. Hypoglycaemia is common, easily missed, and is often blamed on the malaria itself.",
  redflags: ["Impaired consciousness or convulsions", "Respiratory distress or acidotic breathing", "Haemoglobin under 5 g/dL", "Hypoglycaemia", "Dark urine, jaundice, or shock"],
  steps: [
    "Parenteral artesunate at 0, 12 and 24 hours, then daily.",
    "Check glucose on arrival and every 4 hours; quinine makes hypoglycaemia worse.",
    "Transfuse for severe anaemia, slowly, with furosemide if there is heart failure.",
    "Treat convulsions; consider concurrent meningitis and give antibiotics if in doubt.",
    "Complete a full oral ACT course once the patient can swallow.",
    "Check haemoglobin at days 7 and 14 for delayed haemolysis after artesunate."
  ],
  drugs: [
    { id: "artesunate", role: "first", note: "2.4 mg/kg (3 mg/kg under 20 kg) IV or IM at 0, 12, 24 h then daily. IM is as effective as IV." },
    { id: "quinine", role: "alternative", note: "When artesunate is unavailable. Loading dose then 8-hourly by drip; never as a bolus." },
    { id: "dextrose", role: "first", note: "Treat hypoglycaemia and prevent it, especially on quinine." },
    { id: "blood-transfusion", role: "first", note: "For haemoglobin under 5 g/dL, or under 6 with distress." },
    { id: "diazepam", role: "adjunct", note: "Rectal or IV for convulsions." },
    { id: "ceftriaxone", role: "adjunct", note: "Add if meningitis cannot be excluded, or for concurrent bacteraemia." },
    { id: "ringers-lactate", role: "supportive", note: "Careful fluids; avoid large boluses in a febrile child without shock." },
    { id: "paracetamol", role: "supportive", note: "For fever." },
    { id: "furosemide", role: "adjunct", note: "1 mg/kg at the start of transfusion if there is heart failure." }
  ],
  sources: [{ name: "WHO Guidelines for malaria, 2023" }, { name: "Nelson 22nd ed. 2024, ch. 336, p. 2136" }],
  review: { status: "draft" }
},
{
  id: "meningitis", name: "Bacterial meningitis", group: "medical",
  aka: ["meningococcal", "neck stiffness", "lumbar puncture"],
  summary: "Give the antibiotic first and do the lumbar puncture afterwards if there is any delay. Steroids only help if given with or before the first dose, and not in every setting.",
  redflags: ["Fever with neck stiffness, photophobia or a bulging fontanelle", "Purpuric rash — meningococcal sepsis, give antibiotics now", "Reduced consciousness or focal signs", "Seizures"],
  steps: [
    "Antibiotics immediately. Do not delay for a lumbar puncture or a scan.",
    "Dexamethasone with or just before the first antibiotic dose where the protocol supports it.",
    "Treat seizures and check glucose.",
    "Careful fluids; avoid overload and watch sodium.",
    "In an epidemic, single-dose ceftriaxone or oily chloramphenicol treats large numbers quickly."
  ],
  drugs: [
    { id: "ceftriaxone", role: "first", note: "100 mg/kg/day; adult 2 g every 12 h. Single IM dose for pre-referral and in epidemics." },
    { id: "benzylpenicillin", role: "alternative", note: "Where meningococcus is confirmed and susceptible; 4-hourly dosing is demanding for a ward." },
    { id: "ampicillin", role: "adjunct", note: "With gentamicin in neonates and young infants." },
    { id: "gentamicin", role: "adjunct", note: "Neonatal regimen partner." },
    { id: "chloramphenicol", role: "alternative", note: "Oily chloramphenicol as a single IM dose in epidemic settings." },
    { id: "dexamethasone", role: "adjunct", note: "0.15 mg/kg every 6 h, first dose with or before the antibiotic. No benefit afterwards." },
    { id: "diazepam", role: "adjunct", note: "For seizures." },
    { id: "phenobarbital", role: "adjunct", note: "Second line for ongoing seizures." },
    { id: "paracetamol", role: "supportive", note: "Fever and headache." },
    { id: "dextrose", role: "supportive", note: "Check glucose." }
  ],
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "WHO. Managing meningitis epidemics in Africa, 2015" }],
  review: { status: "draft" }
},
{
  id: "pulmonary-oedema", name: "Acute pulmonary oedema & heart failure", group: "medical",
  aka: ["heart failure", "breathlessness", "rheumatic heart disease", "fluid overload"],
  summary: "Sit the patient up, give furosemide and oxygen, and stop the drip. In this region the cause is often rheumatic heart disease, severe anaemia, or simple over-infusion.",
  redflags: ["Orthopnoea with crackles to the mid-zones", "Frothy pink sputum", "Recent large-volume infusion or transfusion", "Severe anaemia with breathlessness — transfuse slowly, do not offload"],
  steps: [
    "Sit upright with the legs dependent. This alone helps immediately and costs nothing.",
    "Stop all running fluids and add up what has been given.",
    "Furosemide intravenously; double it if there is no response in 30 minutes.",
    "Oxygen if available. Nitrate sublingually if the blood pressure allows.",
    "Catheterise so the response can be measured.",
    "Treat the cause: anaemia, arrhythmia, hypertension, valve disease, or over-infusion."
  ],
  drugs: [
    { id: "furosemide", role: "first", note: "40 mg IV adult, 1 mg/kg child. Double after 30 min if no urine." },
    { id: "morphine", role: "adjunct", note: "Small titrated doses reduce distress and preload; watch the respiratory rate." },
    { id: "digoxin", role: "adjunct", note: "For rate control in atrial fibrillation with heart failure, usually rheumatic in origin." },
    { id: "potassium-chloride", role: "adjunct", note: "Replace after diuresis, especially with digoxin." },
    { id: "blood-transfusion", role: "adjunct", note: "Packed cells slowly with furosemide when severe anaemia is the cause." },
    { id: "amiodarone", role: "alternative", note: "For arrhythmia driving the failure." },
    { id: "ringers-lactate", role: "avoid", note: "Stop the fluids. Over-infusion is a frequent and reversible cause." }
  ],
  sources: [{ name: "WHO Model Formulary" }, { name: "Nelson 22nd ed. 2024, ch. 491, Table 491.6, p. 2898" }],
  review: { status: "draft" }
},
{
  id: "severe-asthma", name: "Severe asthma", group: "medical",
  aka: ["asthma attack", "wheeze", "bronchospasm", "status asthmaticus"],
  summary: "Repeated inhaled bronchodilator with a spacer works as well as a nebuliser, and steroids given early prevent the relapse. Sedation is dangerous.",
  redflags: ["Unable to speak in full sentences", "Silent chest or exhaustion", "Cyanosis or saturation under 90 %", "Drowsiness — a pre-terminal sign"],
  steps: [
    "Inhaled salbutamol every 20 minutes for the first hour, by spacer or nebuliser.",
    "Oral or intramuscular steroid within the first hour.",
    "Oxygen to keep saturation above 92 %.",
    "Add ipratropium where available; magnesium sulfate for a severe attack.",
    "Never sedate. Look for pneumothorax if the patient suddenly deteriorates."
  ],
  drugs: [
    { id: "salbutamol", role: "first", note: "MDI with a bottle spacer, 2–8 puffs every 20 min, or 2.5–5 mg nebulised." },
    { id: "dexamethasone", role: "first", note: "0.6 mg/kg once (max 16 mg) oral, IM or IV — less vomiting than prednisolone." },
    { id: "hydrocortisone", role: "alternative", note: "4 mg/kg IV/IM when the patient cannot swallow." },
    { id: "magnesium-sulfate", role: "adjunct", note: "25–75 mg/kg (max 2 g) IV over 20 min in a severe attack." },
    { id: "adrenaline", role: "alternative", note: "Subcutaneous 0.01 mL/kg of 1:1000 when there is no inhaled route at all." },
    { id: "aminophylline", role: "alternative", note: "For a life-threatening attack not responding to the above; 6-hourly dosing avoids an infusion." },
    { id: "ceftriaxone", role: "adjunct", note: "Only if there is genuine evidence of pneumonia." },
    { id: "morphine", role: "avoid", note: "Sedation in asthma is dangerous." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 185, pp. 1405–1408" }, { name: "WHO Pocket Book 2013" }, { name: "GINA 2024" }],
  review: { status: "draft" }
},
{
  id: "pneumonia", name: "Severe pneumonia", group: "medical",
  aka: ["chest infection", "LRTI", "consolidation"],
  summary: "Oxygen and the right antibiotic. In children, counting the respiratory rate and looking for chest indrawing identifies severe disease without any equipment.",
  redflags: ["Chest indrawing or very fast breathing", "Saturation under 90 % or central cyanosis", "Unable to drink or breastfeed", "Grunting, head nodding, or reduced consciousness"],
  steps: [
    "Oxygen for saturation under 90 % or any danger sign.",
    "Antibiotics without delay; the first dose matters most.",
    "Position for comfort, keep feeding or give fluids carefully.",
    "Reassess at 48 hours: no improvement means empyema, tuberculosis, HIV-related disease or the wrong organism.",
    "Look for and drain an empyema."
  ],
  drugs: [
    { id: "benzylpenicillin", role: "first", note: "50,000 units/kg every 6 h, with gentamicin for very severe disease." },
    { id: "ampicillin", role: "first", note: "50 mg/kg every 6 h; the WHO first-line for severe pneumonia in children." },
    { id: "gentamicin", role: "first", note: "Once daily, added for very severe pneumonia." },
    { id: "ceftriaxone", role: "alternative", note: "Second-line or where the first-line has failed." },
    { id: "cloxacillin", role: "adjunct", note: "If staphylococcal pneumonia or empyema is suspected." },
    { id: "chloramphenicol", role: "alternative", note: "Where the above are unavailable." },
    { id: "salbutamol", role: "adjunct", note: "Only if there is wheeze." },
    { id: "paracetamol", role: "supportive", note: "Fever and pleuritic pain." },
    { id: "dextrose", role: "supportive", note: "Check glucose in a child who cannot feed." }
  ],
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "Nelson 22nd ed. 2024" }],
  review: { status: "draft" }
},
{
  id: "vte", name: "Deep vein thrombosis & pulmonary embolism", group: "medical",
  aka: ["DVT", "PE", "clot", "anticoagulation", "thrombosis"],
  summary: "A swollen painful leg, or sudden breathlessness with chest pain. Anticoagulation is the treatment, and low-molecular-weight heparin removes the need for an infusion pump and for laboratory monitoring.",
  redflags: ["Sudden breathlessness with clear lungs and a normal chest film", "Pleuritic chest pain with haemoptysis", "Unilateral leg swelling with calf tenderness", "Recent surgery, immobility, pregnancy or the puerperium", "Hypotension with a raised jugular venous pressure — massive pulmonary embolism"],
  steps: [
    "Start anticoagulation on clinical suspicion; do not wait for imaging that may not exist.",
    "Enoxaparin by weight subcutaneously twice daily is the practical choice with no pump and no monitoring.",
    "Start warfarin the same day for venous thrombosis and overlap for at least 5 days until the INR is above 2 on two days.",
    "In pregnancy, use low-molecular-weight heparin throughout and never warfarin.",
    "Compression, elevation and early mobilisation for the leg.",
    "Treat for 3 months, longer if the cause persists."
  ],
  drugs: [
    { id: "heparin", role: "first", note: "Enoxaparin 1 mg/kg subcutaneously every 12 h. Where only unfractionated heparin exists, 333 units/kg then 250 units/kg subcutaneously every 12 h needs no pump." },
    { id: "paracetamol", role: "supportive", note: "Analgesia; prefer it over NSAIDs while anticoagulated." },
    { id: "morphine", role: "supportive", note: "For severe pleuritic pain from pulmonary embolism." },
    { id: "furosemide", role: "avoid", note: "The raised venous pressure of pulmonary embolism is not fluid overload; diuresis worsens the low output state." },
    { id: "tranexamic-acid", role: "avoid", note: "Antifibrinolytics are contraindicated in active thromboembolism." }
  ],
  sources: [{ name: "Kearon C et al. FIDO. JAMA 2006" }, { name: "CHEST Antithrombotic Therapy for VTE Disease, 2021" }],
  review: { status: "draft" }
},
{
  id: "tetanus", name: "Tetanus", group: "medical",
  aka: ["lockjaw", "trismus", "spasms", "neonatal tetanus"],
  summary: "Spasms, rigidity and autonomic instability after a contaminated wound or unclean cord care. Quiet nursing, metronidazole, antitoxin and control of spasms. Mortality is high without ventilation, so prevention through vaccination is the real answer.",
  redflags: ["Trismus, risus sardonicus, opisthotonos", "Spasms triggered by light, noise or touch", "Laryngeal spasm or apnoea", "Autonomic storm: wild swings in pulse and blood pressure", "A newborn who stops feeding on day 3–10 and becomes rigid"],
  steps: [
    "Nurse in a dark, quiet room. Minimal handling; cluster all interventions together.",
    "Antitoxin before wound debridement.",
    "Metronidazole for 7–10 days.",
    "Diazepam in escalating doses to control spasms; be ready to ventilate.",
    "Magnesium sulfate for spasms and autonomic instability where it can be monitored.",
    "Secure nutrition by nasogastric tube. Start the vaccination course; the disease gives no immunity."
  ],
  drugs: [
    { id: "metronidazole", role: "first", note: "30 mg/kg/day 6-hourly, max 4 g/day, for 7–10 days. The antibiotic of choice." },
    { id: "benzylpenicillin", role: "alternative", note: "100,000 units/kg/day; may worsen spasms by GABA antagonism." },
    { id: "diazepam", role: "first", note: "Escalating doses for spasms; the mainstay where no ventilator exists." },
    { id: "midazolam", role: "alternative", note: "Where diazepam is unavailable." },
    { id: "magnesium-sulfate", role: "adjunct", note: "Reduces spasms and autonomic instability." },
    { id: "morphine", role: "adjunct", note: "For autonomic instability and pain." },
    { id: "ringers-lactate", role: "supportive", note: "Hydration; losses from spasm and sweating are large." },
    { id: "paracetamol", role: "supportive", note: "Fever and pain." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 257 Tetanus, p. 1823" }, { name: "WHO. Current recommendations for treatment of tetanus, 2010" }],
  review: { status: "draft" }
},
/* ---------------- PAEDIATRIC & NEONATAL ---------------- */
{
  id: "severe-dehydration", name: "Severe dehydration & diarrhoea", group: "paediatric",
  aka: ["Plan C", "gastroenteritis", "cholera", "diarrhoea"],
  summary: "Rapid intravenous rehydration by Plan C, or nasogastric oral rehydration when no drip can be placed. Zinc shortens the illness and prevents the next one.",
  redflags: ["Lethargic or unconscious, sunken eyes, skin pinch over 2 seconds", "Unable to drink", "Blood in the stool", "Severe acute malnutrition — Plan C rates are dangerous, use the malnutrition protocol"],
  steps: [
    "Weigh the child, or estimate the weight.",
    "Plan C: 30 mL/kg then 70 mL/kg of Ringer's lactate, by drop counting or a time-taped bag.",
    "Reassess every 15–30 minutes; repeat the first bolus if the radial pulse is still weak.",
    "Start oral rehydration salts as soon as the child can drink.",
    "Zinc for 10–14 days. Keep feeding and breastfeeding throughout.",
    "Antibiotics only for cholera, dysentery with blood, or a specific infection."
  ],
  drugs: [
    { id: "ringers-lactate", role: "first", note: "Plan C volumes and drip rates. Use the Plan C calculator." },
    { id: "zinc-ors", role: "first", note: "ORS by cup and spoon or nasogastric tube; zinc 20 mg daily for 10–14 days." },
    { id: "dextrose", role: "adjunct", note: "Check and treat hypoglycaemia, especially in a lethargic child." },
    { id: "ceftriaxone", role: "adjunct", note: "For dysentery or suspected invasive disease where indicated." },
    { id: "metronidazole", role: "adjunct", note: "For amoebic dysentery or giardiasis." },
    { id: "potassium-chloride", role: "adjunct", note: "Potassium losses are large; ORS contains potassium, IV fluids often do not." }
  ],
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "Nelson 22nd ed. 2024, ch. 387, p. 2372" }],
  review: { status: "draft" }
},
{
  id: "malnutrition", name: "Severe acute malnutrition", group: "paediatric",
  aka: ["SAM", "kwashiorkor", "marasmus", "wasting"],
  summary: "These children die from hypoglycaemia, hypothermia, infection and over-hydration, in that order. Standard emergency doses and fluid rates are dangerous here; the protocol is deliberately different.",
  redflags: ["MUAC under 11.5 cm, weight-for-height below −3, or bilateral pitting oedema", "Hypoglycaemia and hypothermia on admission", "Any infection, often without fever", "Rising pulse and respiratory rate during rehydration — stop, this is overload"],
  steps: [
    "Treat and prevent hypoglycaemia: 50 mL of 10 % glucose or sugar water immediately, then 2-hourly feeds.",
    "Keep warm: cover the head, kangaroo care, no draughts.",
    "Routine broad antibiotics even without fever.",
    "ReSoMal for dehydration, orally or by tube. Intravenous fluid only for shock, at 15 mL/kg over an hour.",
    "F-75 then F-100 or ready-to-use therapeutic food. No iron during stabilisation.",
    "Micronutrients, vitamin A if indicated, and treat the eyes and skin."
  ],
  drugs: [
    { id: "dextrose", role: "first", note: "50 mL of 10 % orally or by tube on admission; IV only if unconscious." },
    { id: "zinc-ors", role: "first", note: "ReSoMal, not standard ORS: 5 mL/kg every 30 min for 2 h, then 5–10 mL/kg/h in alternate hours." },
    { id: "ampicillin", role: "first", note: "50 mg/kg every 6 h for 2 days, then oral amoxicillin for 5 days." },
    { id: "gentamicin", role: "first", note: "7.5 mg/kg once daily for 7 days." },
    { id: "metronidazole", role: "adjunct", note: "7.5 mg/kg every 8 h for persistent diarrhoea or bowel overgrowth." },
    { id: "vitamin-a", role: "adjunct", note: "Only with eye signs or recent measles; days 1, 2 and 14." },
    { id: "blood-transfusion", role: "adjunct", note: "10 mL/kg whole blood over 3 h, with furosemide, for haemoglobin under 4 g/dL." },
    { id: "furosemide", role: "adjunct", note: "1 mg/kg at the start of transfusion only." },
    { id: "ringers-lactate", role: "avoid", note: "Plan C rates cause heart failure here. Use 15 mL/kg over 1 h for shock only." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 62, pp. 428–430" }, { name: "WHO. Updates on the management of severe acute malnutrition, 2013" }],
  review: { status: "draft" }
},
{
  id: "neonatal-sepsis", name: "Neonatal sepsis", group: "paediatric",
  aka: ["PSBI", "newborn infection", "young infant"],
  summary: "Newborns show almost nothing until they are very sick. Poor feeding, lethargy, temperature instability or fast breathing are enough to start antibiotics. Doses change with postnatal age.",
  redflags: ["Not feeding, lethargic, or floppy", "Temperature under 35.5 or over 37.5 °C", "Fast breathing, grunting, or chest indrawing", "Convulsions, or a bulging fontanelle", "Umbilical redness or discharge, or skin pustules"],
  steps: [
    "Take blood cultures if possible, but never delay the first dose.",
    "Ampicillin plus gentamicin, dosed by postnatal age.",
    "Check and treat glucose. Keep the baby warm; kangaroo care.",
    "Support feeding, by tube if needed.",
    "Where referral is impossible, use the WHO simplified regimen rather than nothing.",
    "Treat for 7–10 days; longer with meningitis."
  ],
  drugs: [
    { id: "ampicillin", role: "first", note: "50 mg/kg per dose; interval by age. Dilute to 50 mg/mL so the volume is 1 mL per kg." },
    { id: "gentamicin", role: "first", note: "3–5 mg/kg once daily in week one; 7.5 mg/kg after. Dilute for accuracy." },
    { id: "ceftriaxone", role: "alternative", note: "Avoid in jaundiced neonates and never with calcium-containing fluids." },
    { id: "benzylpenicillin", role: "alternative", note: "With gentamicin where ampicillin is unavailable." },
    { id: "dextrose", role: "first", note: "2 mL/kg of 10 % for hypoglycaemia, then an infusion." },
    { id: "phenobarbital", role: "adjunct", note: "First-line for neonatal seizures." },
    { id: "ringers-lactate", role: "supportive", note: "10 mL/kg for shock, given slowly." },
    { id: "dopamine", role: "adjunct", note: "For shock unresponsive to fluid; rule-of-6 dilution with a microdrip." },
    { id: "vitamin-k", role: "supportive", note: "1 mg IM if not already given at birth." }
  ],
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "WHO. Managing PSBI when referral is not feasible, 2015" }],
  review: { status: "draft" }
},
{
  id: "neonatal-seizures", name: "Neonatal seizures & birth asphyxia", group: "paediatric",
  aka: ["HIE", "birth asphyxia", "newborn fits"],
  summary: "Subtle in newborns: lip smacking, cycling, eye deviation or apnoea rather than obvious convulsions. Phenobarbital is first-line, not diazepam, and glucose and calcium must be checked.",
  redflags: ["Apnoea with abnormal movements", "Poor Apgar scores with abnormal tone or a poor suck", "Low glucose", "Fever or a bulging fontanelle — meningitis"],
  steps: [
    "Airway, breathing, warmth. Ventilation is the treatment for a non-breathing newborn.",
    "Check glucose and treat immediately if low.",
    "Phenobarbital 20 mg/kg IM or IV; repeat 10 mg/kg to a total of 40 mg/kg.",
    "Treat for meningitis if there is any doubt.",
    "Check calcium where possible; correct if low.",
    "Avoid routine bicarbonate and routine naloxone."
  ],
  drugs: [
    { id: "phenobarbital", role: "first", note: "20 mg/kg loading, IM or IV. First-line in neonates." },
    { id: "dextrose", role: "first", note: "2 mL/kg of 10 %, then an infusion of 5–8 mg/kg/min." },
    { id: "calcium-gluconate", role: "adjunct", note: "For documented hypocalcaemia; give slowly, never with bicarbonate." },
    { id: "ampicillin", role: "adjunct", note: "With gentamicin if infection is possible." },
    { id: "gentamicin", role: "adjunct", note: "Partner in the neonatal regimen." },
    { id: "phenytoin", role: "alternative", note: "Second-line after phenobarbital; slow infusion in saline only." },
    { id: "midazolam", role: "alternative", note: "For refractory seizures where available." },
    { id: "naloxone", role: "avoid", note: "Not part of newborn resuscitation, and dangerous if the mother is opioid dependent." },
    { id: "sodium-bicarbonate", role: "avoid", note: "Not recommended routinely; worsens intracellular acidosis without good ventilation." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 122, p. 1067" }, { name: "WHO. Guidelines on neonatal seizures, 2011" }],
  review: { status: "draft" }
},
{
  id: "hypoglycaemia", name: "Hypoglycaemia", group: "paediatric",
  aka: ["low blood sugar", "sugar", "collapse"],
  summary: "Check the glucose in every convulsing, unconscious, shocked or malnourished patient. Where no glucometer exists, treat on suspicion; the treatment is harmless and the omission is not.",
  redflags: ["Any reduced consciousness, convulsion or shock", "Severe malnutrition or sepsis", "On quinine or insulin", "Newborn who is jittery, floppy or not feeding"],
  steps: [
    "Check the glucose. If you cannot, treat anyway.",
    "Intravenous glucose if there is access; sublingual sugar or nasogastric sugar water if not.",
    "Recheck in 15–30 minutes and repeat if still low.",
    "Follow the bolus with an infusion or with feeding; a single bolus wears off.",
    "Find the cause: sepsis, malaria, malnutrition, quinine, insulin, alcohol, liver failure."
  ],
  drugs: [
    { id: "dextrose", role: "first", note: "Child 5 mL/kg of 10 %; neonate 2 mL/kg. Make 10 % from 50 % or 40 % by dilution." },
    { id: "zinc-ors", role: "alternative", note: "Sugar water or ORS by mouth or nasogastric tube when there is no IV access." },
    { id: "hydrocortisone", role: "adjunct", note: "If adrenal crisis is suspected as the cause." },
    { id: "artesunate", role: "adjunct", note: "Treat the malaria that is often behind it." },
    { id: "ampicillin", role: "adjunct", note: "With gentamicin if sepsis is the cause." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 113, p. 983" }, { name: "WHO Pocket Book of Hospital Care for Children 2013" }],
  review: { status: "draft" }
},
{
  id: "severe-anaemia", name: "Severe anaemia", group: "paediatric",
  aka: ["anaemia", "transfusion", "hookworm", "pallor"],
  summary: "Common from malaria, hookworm, malnutrition and sickle cell disease. Transfuse for decompensation, not for a number, and transfuse slowly with furosemide when the heart is failing.",
  redflags: ["Haemoglobin under 4 g/dL, or under 6 with respiratory distress", "Breathlessness at rest, gallop rhythm, or an enlarged liver", "Reduced consciousness", "Continuing blood loss"],
  steps: [
    "Decide whether transfusion is truly needed; chronic anaemia is well tolerated.",
    "Whole blood 20 mL/kg over 3–4 hours, or packed cells 10 mL/kg. Half that with heart failure.",
    "Furosemide at the start if there is heart failure.",
    "Time-tape the bag and monitor for reaction and overload.",
    "Treat the cause: antimalarials, deworming, iron and folate, nutrition."
  ],
  drugs: [
    { id: "blood-transfusion", role: "first", note: "Whole blood 20 mL/kg, or 10 mL/kg with heart failure. Never transfuse to a number alone." },
    { id: "furosemide", role: "adjunct", note: "1 mg/kg IV at the start of transfusion if there is heart failure." },
    { id: "artesunate", role: "adjunct", note: "Malaria is the commonest reversible cause in endemic areas." },
    { id: "vitamin-a", role: "adjunct", note: "Where deficiency or measles coexists." },
    { id: "zinc-ors", role: "supportive", note: "With concurrent diarrhoea." },
    { id: "paracetamol", role: "supportive", note: "For a febrile transfusion reaction." },
    { id: "ringers-lactate", role: "avoid", note: "Never prime or run a blood line with Ringer's lactate; use saline only." }
  ],
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "Nelson 22nd ed. 2024, ch. 62, p. 428" }],
  review: { status: "draft" }
},
{
  id: "measles", name: "Measles", group: "paediatric",
  aka: ["rubeola", "rash", "koplik"],
  summary: "Vitamin A on two consecutive days reduces mortality substantially. Most deaths are from pneumonia, diarrhoea and corneal damage rather than the virus itself.",
  redflags: ["Corneal clouding or ulceration — an emergency", "Deep or extensive mouth ulcers", "Pneumonia or severe diarrhoea", "Convulsions or reduced consciousness"],
  steps: [
    "Vitamin A on day 1 and day 2 for every child, and again on day 14 if there are eye signs.",
    "Treat pneumonia, diarrhoea and malnutrition actively.",
    "Eye care: chloramphenicol or tetracycline ointment, atropine for corneal ulceration.",
    "Mouth care and continued feeding; these children stop eating.",
    "Isolate from other children and vaccinate contacts."
  ],
  drugs: [
    { id: "vitamin-a", role: "first", note: "50,000 to 200,000 IU by age, on days 1, 2 and 14. Give to every child with measles in a deficient area." },
    { id: "chloramphenicol", role: "adjunct", note: "Eye ointment for conjunctivitis and corneal involvement." },
    { id: "atropine", role: "adjunct", note: "One drop of 1 % for corneal ulceration, to relax the eye." },
    { id: "ampicillin", role: "adjunct", note: "With gentamicin for measles pneumonia." },
    { id: "benzylpenicillin", role: "alternative", note: "For secondary bacterial pneumonia." },
    { id: "zinc-ors", role: "adjunct", note: "For accompanying diarrhoea." },
    { id: "paracetamol", role: "supportive", note: "Fever and mouth pain." }
  ],
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "Nelson 22nd ed. 2024, ch. 62, p. 428" }],
  review: { status: "draft" }
},
{
  id: "croup", name: "Croup", group: "paediatric",
  aka: ["stridor", "barking cough", "laryngotracheobronchitis"],
  summary: "A barking cough with inspiratory stridor in a young child. One dose of a steroid treats almost all of it; nebulised adrenaline buys time in severe cases.",
  redflags: ["Stridor at rest", "Chest indrawing and exhaustion", "Drooling and a toxic appearance — think epiglottitis, do not examine the throat", "Cyanosis or reduced consciousness"],
  steps: [
    "Keep the child calm on the parent's lap. Agitation worsens the obstruction.",
    "Dexamethasone 0.6 mg/kg once, by any route, including the injectable solution by mouth.",
    "Nebulised adrenaline for stridor at rest, then observe 2–4 hours for rebound.",
    "Oxygen if there is hypoxia. Do not force an examination.",
    "Humidified air has no proven benefit; do not delay the steroid for it."
  ],
  drugs: [
    { id: "dexamethasone", role: "first", note: "0.6 mg/kg once, maximum 16 mg. Give the injectable solution by mouth if there are no tablets." },
    { id: "adrenaline", role: "first", note: "Nebulised 0.5 mL/kg of 1:1000, maximum 5 mL, for stridor at rest." },
    { id: "hydrocortisone", role: "alternative", note: "If dexamethasone is unavailable." },
    { id: "paracetamol", role: "supportive", note: "For fever and discomfort." },
    { id: "ceftriaxone", role: "adjunct", note: "Only if bacterial tracheitis or epiglottitis is suspected." },
    { id: "salbutamol", role: "avoid", note: "Croup is upper airway obstruction; salbutamol does not help." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 433, p. 2571" }, { name: "WHO Pocket Book of Hospital Care for Children 2013" }],
  review: { status: "draft" }
},
{
  id: "apnoea-prematurity", name: "Apnoea of prematurity", group: "paediatric",
  aka: ["preterm apnoea", "caffeine", "periodic breathing"],
  summary: "Caffeine improves survival without disability and needs no pump, no levels and no cold chain. New apnoea in a previously stable baby means sepsis until proved otherwise.",
  redflags: ["New apnoea in a baby who was stable — look for sepsis", "Apnoea with bradycardia or desaturation", "Temperature instability", "Feeding intolerance or abdominal distension"],
  steps: [
    "Caffeine citrate loading dose, then once daily.",
    "Look hard for a cause: sepsis, hypoglycaemia, anaemia, intracranial haemorrhage, reflux, temperature swings.",
    "Position prone or lateral with the neck slightly extended; keep thermally neutral.",
    "Kangaroo mother care; continuous positive airway pressure where available.",
    "Continue caffeine through extubation and until about 34 weeks corrected with 5–7 apnoea-free days."
  ],
  drugs: [
    { id: "caffeine-citrate", role: "first", note: "20 mg/kg loading, then 5–10 mg/kg once daily. Oral works as well as IV." },
    { id: "aminophylline", role: "alternative", note: "6 mg/kg then 2.5 mg/kg every 12 h where caffeine is unavailable; more side-effects." },
    { id: "ampicillin", role: "adjunct", note: "With gentamicin if sepsis is suspected." },
    { id: "gentamicin", role: "adjunct", note: "Neonatal regimen partner." },
    { id: "dextrose", role: "supportive", note: "Check glucose." },
    { id: "blood-transfusion", role: "adjunct", note: "For anaemia of prematurity contributing to apnoea." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 124, p. 1076" }, { name: "Schmidt B et al. CAP trial. NEJM 2006" }],
  review: { status: "draft" }
}
];
