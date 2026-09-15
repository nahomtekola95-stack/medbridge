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
  paediatric: "Paediatric & neonatal",
  psychiatric: "Psychiatry & mental health"
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
    { id: "noradrenaline", role: "alternative", note: "Infusion for shock that persists after repeated adrenaline and fluids." },
    { id: "oxygen", role: "supportive", note: "High-flow oxygen by non-rebreather mask while adrenaline takes effect." }
  ],
  sources: [{ name: "Resuscitation Council UK. Emergency treatment of anaphylaxis, 2021" }, { name: "WHO Pocket Book 2013" }],
  textbook: [
    { book: "harrison", text: "First-choice treatment is IM epinephrine 0.3-0.5 mg (1 mg/mL), repeated every 5-20 min for severe reactions; failure to give it within 20 min is linked to poor outcomes.", ref: "Harrison 22nd ed. 2025, ch. 364 Anaphylaxis, p. 2813" },
    { book: "harrison", text: "IV fluids and vasopressors are added in the acute setting for intractable hypotension; beta blockers may blunt the epinephrine response.", ref: "Harrison 22nd ed. 2025, ch. 364 Anaphylaxis, p. 2813" },
    { book: "harrison", text: "Antihistamines, glucocorticoids and bronchodilators are ancillary, used once haemodynamically stable; progressive hypoxia mandates intubation or tracheostomy.", ref: "Harrison 22nd ed. 2025, ch. 364 Anaphylaxis, p. 2813" }
  ],
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
    { id: "atropine", role: "supportive", note: "Not for arrest; for peri-arrest bradycardia after oxygenation." },
    { id: "oxygen", role: "first", note: "Ventilate with bag-valve-mask attached to oxygen at 10–15 L/min; hypoxia is the usual cause in children." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 79 PALS algorithms, pp. 561–566" }, { name: "AHA PALS/ACLS 2020" }],
  textbook: [
    { book: "harrison", text: "Epinephrine 1 mg IV/IO every 3-5 min once access is established; IO if IV access fails.", ref: "Harrison 22nd ed. 2025, ch. 317 Cardiovascular Collapse, Cardiac Arrest, and Sudden Cardiac Death, p. 2336" },
    { book: "harrison", text: "Recurrent VF/VT after shocks: amiodarone 300 mg IV/IO bolus, then 150 mg if it recurs; lidocaine if amiodarone fails.", ref: "Harrison 22nd ed. 2025, ch. 317 Cardiovascular Collapse, Cardiac Arrest, and Sudden Cardiac Death, p. 2336" },
    { book: "harrison", text: "Persistent metabolic acidosis after successful defibrillation with adequate ventilation: NaHCO3 1 mEq/kg may be given.", ref: "Harrison 22nd ed. 2025, ch. 317 Cardiovascular Collapse, Cardiac Arrest, and Sudden Cardiac Death, p. 2336" },
    { book: "harrison", text: "PEA/asystole: CPR, ventilation and epinephrine while treating reversible causes (hypoxia, hypovolaemia, acidosis, hyperkalaemia, hypothermia, toxins, tamponade, tension pneumothorax, PE, MI); give naloxone if opiate overdose suspected.", ref: "Harrison 22nd ed. 2025, ch. 317 Cardiovascular Collapse, Cardiac Arrest, and Sudden Cardiac Death, p. 2336" }
  ],
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
    { id: "dopamine", role: "alternative", note: "Fallback only, when noradrenaline and adrenaline are unavailable: it causes more arrhythmias and gives no survival benefit in septic shock (Harrison). Often the only vasoactive drug at primary hospitals." },
    { id: "hydrocortisone", role: "adjunct", note: "For shock that persists despite fluids and vasopressors." },
    { id: "dextrose", role: "supportive", note: "Hypoglycaemia is common and easily missed." },
    { id: "blood-transfusion", role: "supportive", note: "For severe anaemia contributing to shock." },
    { id: "oxygen", role: "supportive", note: "Target SpO2 94 % or more during resuscitation of shock." }
  ],
  sources: [{ name: "Surviving Sepsis Campaign 2021" }, { name: "Maitland K et al. FEAST. NEJM 2011" }, { name: "Nelson 22nd ed. 2024, ch. 85, p. 611" }],
  textbook: [
    { book: "harrison", text: "Septic shock: give empiric antimicrobials within 1 h of shock recognition; each hour of delay adds an estimated 7-8% mortality.", ref: "Harrison 22nd ed. 2025, ch. 315 Sepsis and Septic Shock, p. 2320" },
    { book: "harrison", text: "Resuscitate with about 30 mL/kg balanced crystalloid (lactated Ringer's preferred over saline), then guide further fluid by dynamic reassessment (capillary refill, passive leg raise, ultrasound).", ref: "Harrison 22nd ed. 2025, ch. 315 Sepsis and Septic Shock, p. 2322" },
    { book: "harrison", text: "Persistent hypotension after fluids: norepinephrine first-line to MAP of at least 65 mmHg, vasopressin second, epinephrine third.", ref: "Harrison 22nd ed. 2025, ch. 315 Sepsis and Septic Shock, p. 2323" },
    { book: "harrison", text: "Ongoing vasopressor requirement: IV hydrocortisone 200 mg/day, often 50 mg every 6 h.", ref: "Harrison 22nd ed. 2025, ch. 315 Sepsis and Septic Shock, p. 2323" }
  ],
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
    "Second-line: phenytoin by slow infusion, or valproate or levetiracetam where stocked (Harrison). Phenobarbital IM/IV works where nothing else exists, but only with a bag-valve-mask ready — a full load can stop breathing.",
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
    { id: "paracetamol", role: "supportive", note: "For fever, which lowers the seizure threshold in children." },
    { id: "oxygen", role: "supportive", note: "Open the airway, give oxygen and check glucose while giving the anticonvulsant." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 633.8, p. 3628" }, { name: "Silbergleit R et al. RAMPART. NEJM 2012" }, { name: "WHO Pocket Book 2013" }],
  textbook: [
    { book: "harrison", text: "Generalized convulsive status epilepticus warrants acute anticonvulsant treatment once seizures last beyond 5 minutes.", ref: "Harrison 22nd ed. 2025, ch. 436 Seizures and Epilepsy, p. 3425" },
    { book: "harrison", text: "Adult algorithm: IV lorazepam 0.1 mg/kg or midazolam 0.2 mg/kg, then IV phenytoin 20 mg/kg, valproate 20–30 mg/kg or levetiracetam 20–30 mg/kg.", ref: "Harrison 22nd ed. 2025, ch. 436 Seizures and Epilepsy, p. 3426" },
    { book: "harrison", text: "Lorazepam is the benzodiazepine of choice; follow with fosphenytoin, valproate or levetiracetam loading.", ref: "Harrison 22nd ed. 2025, ch. 311 Approach to the Patient with Critical Illness, p. 2298" }
  ],
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
    { id: "adrenaline", role: "supportive", note: "If shock persists despite atropine and fluids." },
    { id: "oxygen", role: "supportive", note: "Oxygen and suction of secretions while atropine is titrated; ventilate if breathing fails." }
  ],
  sources: [{ name: "Eddleston M et al. Lancet 2008" }, { name: "WHO. Clinical management of acute pesticide intoxication, 2008" }],
  textbook: [
    { book: "harrison", text: "Cholinesterase-inhibitor poisoning: atropine treats muscarinic features; pralidoxime (2-PAM) treats nicotinic features from organophosphates or nerve agents.", ref: "Harrison 22nd ed. 2025, ch. 470 Poisoning and Drug Overdose, p. 3712" },
    { book: "harrison", text: "Features: seizures, bronchorrhoea, wheeze, sweating, GI and bladder hyperactivity, fasciculations, weakness and paralysis; death is usually from respiratory failure; cholinesterase activity below 50% of normal.", ref: "Harrison 22nd ed. 2025, ch. 470 Poisoning and Drug Overdose, p. 3712" }
  ],
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
    { id: "naloxone", role: "first", note: "Overdose with apnoea or severe respiratory depression: adult 0.4–2 mg IV, IM or intranasal, repeated every 2–3 min; synthetic opioids such as fentanyl may need twice that (Harrison). Child 0.1 mg/kg, max 2 mg. For over-sedation from therapeutic opioids instead, titrate 40 mcg increments so analgesia is kept." },
    { id: "ringers-lactate", role: "supportive", note: "For hypotension." },
    { id: "dextrose", role: "supportive", note: "Check glucose in every unconscious patient." },
    { id: "oxygen", role: "supportive", note: "Bag-valve-mask with oxygen before and between naloxone doses." },
    { id: "methadone", role: "avoid", note: "Never give methadone during or soon after an overdose. Methadone overdose outlasts naloxone: expect repeated doses or an infusion (hourly 1/2–2/3 of the reversing dose) and observe at least 24 h after the last naloxone." },
    { id: "naltrexone", role: "avoid", note: "Do not use to reverse overdose: it is oral, slow and causes prolonged precipitated withdrawal. Naloxone is the antidote. Recent naltrexone stoppers have lost tolerance and overdose easily." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, Table 79.5, p. 563" }, { name: "WHO. Community management of opioid overdose, 2014" }],
  textbook: [
    { book: "harrison", text: "Establish the airway (intubation/ventilation if needed); naloxone 0.4-2.0 mg IV, IM or endotracheal; repeat or infuse as needed.", ref: "Harrison 22nd ed. 2025, ch. 467 Opioid-Related Disorders, p. 3690" },
    { book: "harrison", text: "After reversal, give one-half to two-thirds of the reversing naloxone dose hourly, because respiratory depression can recur.", ref: "Harrison 22nd ed. 2025, ch. 467 Opioid-Related Disorders, p. 3690" },
    { book: "harrison", text: "Fentanyl overdoses may need about twice the usual naloxone dose; newer rescue products contain double the traditional dose.", ref: "Harrison 22nd ed. 2025, ch. 467 Opioid-Related Disorders, p. 3690" }
  ],
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
    { id: "dextrose", role: "first", note: "25 g with the insulin (10 % if no 50 %), then 10 % dextrose at 50–75 mL/h to prevent late hypoglycaemia. If glucose is already 11–14 mmol/L (200–250 mg/dL) or higher, give the insulin without the bolus (Harrison)." },
    { id: "salbutamol", role: "adjunct", note: "Nebulised 10–20 mg adult; shifts potassium and needs no IV. Use with insulin, not instead of it — about 20 % of dialysis patients do not respond (Harrison)." },
    { id: "sodium-bicarbonate", role: "adjunct", note: "Only with significant metabolic acidosis; Harrison gives it no role in hyperkalaemia otherwise. Never in the same line as calcium." },
    { id: "furosemide", role: "adjunct", note: "Only if the patient still passes urine." },
    { id: "ringers-lactate", role: "avoid", note: "Contains potassium. Use 0.9 % saline instead." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 573, p. 3245" }, { name: "UK Kidney Association, 2023" }],
  textbook: [
    { book: "harrison", text: "ECG changes are an emergency; K of 6.5 mM or more without ECG changes should also be treated aggressively with admission and continuous cardiac monitoring.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 360" },
    { book: "harrison", text: "Membrane stabilisation: 10 mL of 10% calcium gluconate IV over 2-3 min, onset 1-3 min, lasting 30-60 min; repeat if ECG unchanged.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 361" },
    { book: "harrison", text: "Shift: 10 units IV regular insulin plus 25 g glucose (D50), then 10% dextrose 50-75 mL/h with glucose monitoring; if glucose is 200-250 mg/dL or more give insulin without glucose.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 361" },
    { book: "harrison", text: "Nebulised albuterol 10-20 mg is additive to insulin-glucose but should not be used alone, as about 20% of ESRD patients are resistant.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 361" }
  ],
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
    "Lower the blood pressure to below 160 systolic and 90–100 diastolic, not to normal. Systolic above 160 is the main predictor of stroke (Williams, Gabbe).",
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
  textbook: [
    { book: "williams", text: "Treat severe hypertension to bring systolic to 160 or below and diastolic to 110 or below; strokes in severe preeclampsia occurred with systolic pressures above 160 even when diastolic was under 110.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1630" },
    { book: "williams", text: "Hydralazine, labetalol and oral nifedipine are all first-line agents for acute severe hypertension in pregnancy.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1630" },
    { book: "williams", text: "Women with preeclampsia-eclampsia usually receive magnesium sulfate during labor and for 24 hours postpartum; doses are the same as for eclampsia.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1624" },
    { book: "williams", text: "Restrict IV fluids: lactated Ringer 60 to 125 mL/h; large volumes worsen pulmonary and cerebral oedema; for oliguria use small incremental boluses to keep urine above 30 mL/h.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1633" },
    { book: "gabbe", text: "Severe features: admit, start IV magnesium sulfate, treat SBP ≥160 or DBP ≥110; steroids at 24-34 weeks.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 708" },
    { book: "gabbe", text: "Treat sustained SBP ≥160 and/or DBP ≥110 lasting 15-30 min; deliver if resistant despite max labetalol 300 mg plus hydralazine 20 mg or nifedipine 50 mg.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 711" },
    { book: "gabbe", text: "Once delivery is decided, give magnesium in labour and for at least 24 h postpartum.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 710" },
    { book: "gabbe", text: "Neuraxial anaesthesia preferred but contraindicated with coagulopathy or severe thrombocytopenia; general anaesthesia risks failed intubation from airway oedema.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 711" }
  ],
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
    { id: "ergometrine", role: "avoid", note: "Contraindicated in hypertension." },
    { id: "oxygen", role: "supportive", note: "Recovery position and oxygen after a fit." }
  ],
  sources: [{ name: "WHO. Managing Complications in Pregnancy and Childbirth, 2017" }, { name: "Pritchard JA et al. AJOG 1984" }],
  textbook: [
    { book: "williams", text: "Recurrent convulsion (10 to 15 percent) after magnesium: an additional 2 g as 20 percent solution slowly IV. Refractory cases get IV barbiturate; benzodiazepines only as a small single dose because prolonged use raises aspiration-pneumonia mortality.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1625" },
    { book: "williams", text: "Eclampsia management: IV magnesium loading then maintenance, intermittent antihypertensive for dangerous BP, avoid diuretics and excess fluids, and deliver.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1624" },
    { book: "williams", text: "Maintenance magnesium continues 24 hours after delivery; for postpartum-onset eclampsia, 24 hours after the onset of convulsions.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1626" },
    { book: "williams", text: "IM magnesium is as effective as IV where infusion technology is lacking; typically convulsions stop after the 4 g loading dose.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1625" },
    { book: "gabbe", text: "During a fit: protect from injury, lateral decubitus, suction, oxygen 8-10 L/min by mask; do not restrain.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 732" },
    { book: "gabbe", text: "Stabilise BP and give magnesium loading dose before transfer; eclampsia is an indication for delivery but not for caesarean.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 732" },
    { book: "gabbe", text: "Magnesium continued 24 h after delivery and at least 24 h after last convulsion; recurrent fit 2 g IV over 3-5 min.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 733" },
    { book: "gabbe", text: "Delivery indicated once stable; caesarean recommended before 30 weeks when not in labour with unfavourable cervix.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 733" }
  ],
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
    { id: "ketamine", role: "supportive", note: "For examination under anaesthesia or laparotomy where there is no anaesthetist." },
    { id: "oxygen", role: "supportive", note: "Oxygen by mask at 6–8 L/min during resuscitation of haemorrhagic shock." }
  ],
  sources: [{ name: "WHO recommendations for the prevention and treatment of PPH, 2012/2018" }, { name: "WOMAN trial. Lancet 2017" }],
  textbook: [
    { book: "williams", text: "On immediate PPH, inspect for lacerations and retained placental fragments, massage the uterus and give uterotonics; ergot derivatives are second-line if atony persists after oxytocin.", ref: "Williams Obstetrics 25th ed. 2018, ch. 41 Obstetrical Hemorrhage, pdf p. 1677" },
    { book: "williams", text: "If bleeding persists despite uterotonics, immediately and simultaneously begin bimanual uterine compression, which controls most cases.", ref: "Williams Obstetrics 25th ed. 2018, ch. 41 Obstetrical Hemorrhage, pdf p. 1679" },
    { book: "williams", text: "Establish large-bore IV access, rapid crystalloid while blood is made available, and ready the operating room and surgical/anaesthesia team immediately.", ref: "Williams Obstetrics 25th ed. 2018, ch. 41 Obstetrical Hemorrhage, pdf p. 1744" },
    { book: "williams", text: "After manual removal of the placenta evidence of antibiotic benefit is lacking, but WHO recommends prophylaxis and Parkland gives a single dose to women not already on antibiotics.", ref: "Williams Obstetrics 25th ed. 2018, ch. 27 Vaginal Delivery, pdf p. 1157" },
    { book: "gabbe", text: "Uterotonics are mainstay for atony; oxytocin first-line, then second agent chosen by side-effect profile and contraindications, with bimanual massage.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 405" },
    { book: "gabbe", text: "Tranexamic acid within 3 h of bleeding onset reduced maternal death by nearly 20%.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 406" },
    { book: "gabbe", text: "Resuscitation: two large-bore lines, crystalloid, pRBC if Hb <7 or active bleeding with coagulopathy; massive transfusion 4:4:1.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 417" },
    { book: "gabbe", text: "If drugs fail, inspect for lacerations, then intrauterine vacuum, tamponade, embolisation or surgery.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 406" }
  ],
  review: { status: "draft" }
},
{
  id: "preterm-labour", name: "Preterm labour", group: "obstetric",
  aka: ["threatened preterm birth", "antenatal steroids"],
  summary: "Between 24 and 34 weeks, one drug changes newborn survival more than any equipment in the hospital: a corticosteroid given to the mother. Tocolysis exists only to buy time for it and for transfer.",
  redflags: ["Regular contractions before 34 weeks", "Ruptured membranes", "Fever or offensive discharge — do not give steroids or tocolysis", "Bleeding or fetal distress"],
  steps: [
    "Give dexamethasone only if gestation is reliably 24–34 weeks, birth is likely within 7 days, there is no maternal infection, and newborn care is available. Given broadly in low-resource settings with uncertain dating, antenatal steroids increased newborn deaths (Althabe 2015, cited in Williams).",
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
  textbook: [
    { book: "williams", text: "Single corticosteroid course at 24 to 34 weeks with delivery risk within 7 days; first dose given even if the course may not be completed.", ref: "Williams Obstetrics 25th ed. 2018, ch. 42 Preterm Birth, pdf p. 1823" },
    { book: "williams", text: "Magnesium for neuroprotection lowered cerebral palsy risk (number needed to treat 63); Parkland uses it for threatened delivery from 24 0/7 to 27 6/7 weeks.", ref: "Williams Obstetrics 25th ed. 2018, ch. 42 Preterm Birth, pdf p. 1826" },
    { book: "williams", text: "Group B streptococcal infection is common and dangerous in preterm neonates; give intrapartum antimicrobial prophylaxis.", ref: "Williams Obstetrics 25th ed. 2018, ch. 42 Preterm Birth, pdf p. 1832" },
    { book: "williams", text: "Antibiotics for preterm labor with intact membranes do not help and ORACLE II linked fetal exposure to higher cerebral palsy at 7 years; this is distinct from GBS prophylaxis.", ref: "Williams Obstetrics 25th ed. 2018, ch. 42 Preterm Birth, pdf p. 1827" },
    { book: "gabbe", text: "Four proven interventions: maternal transfer, antenatal corticosteroids, intrapartum GBS antibiotics, magnesium for neuroprotection at ≤32 weeks.", ref: "Gabbe's Obstetrics 9th ed., ch. 36 Spontaneous Preterm Labor and Birth, p. 673" },
    { book: "gabbe", text: "Tocolysis contraindicated in preeclampsia with severe features, haemorrhage, clinical chorioamnionitis, severe cardiac disease, fetal compromise.", ref: "Gabbe's Obstetrics 9th ed., ch. 36 Spontaneous Preterm Labor and Birth, p. 673" },
    { book: "gabbe", text: "Dexamethasone 6 mg IM every 12 h x4 or betamethasone 12 mg IM every 24 h x2 at 24-34 weeks.", ref: "Gabbe's Obstetrics 9th ed., ch. 37 Premature Rupture of the Membranes, p. 696" },
    { book: "gabbe", text: "Magnesium sulfate for neuroprotection below 32 weeks: 4-6 g IV over 30 min, then 1-2 g/h.", ref: "Gabbe's Obstetrics 9th ed., ch. 36 Spontaneous Preterm Labor and Birth, p. 681" }
  ],
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
    "Discharge once afebrile for 24–48 hours; further oral antibiotics are not needed after an uncomplicated recovery (Williams)."
  ],
  drugs: [
    { id: "ampicillin", role: "first", note: "2 g IV every 6 h, with gentamicin and metronidazole." },
    { id: "gentamicin", role: "first", note: "Once daily by weight." },
    { id: "metronidazole", role: "first", note: "500 mg every 8 h; oral is as good as IV once she can swallow." },
    { id: "ceftriaxone", role: "alternative", note: "Where the triple regimen is unavailable, with metronidazole." },
    { id: "oxytocin", role: "adjunct", note: "To contract the uterus during and after evacuation." },
    { id: "misoprostol", role: "avoid", note: "Do not use medical evacuation when the uterus is infected. Evacuate septic retained products by manual vacuum aspiration or suction curettage under antibiotic cover (Williams)." },
    { id: "ringers-lactate", role: "supportive", note: "Resuscitation." },
    { id: "paracetamol", role: "supportive", note: "Fever and pain." },
    { id: "blood-transfusion", role: "supportive", note: "For anaemia from bleeding or haemolysis." }
  ],
  sources: [{ name: "WHO. Managing Complications in Pregnancy and Childbirth, 2017" }, { name: "WHO recommendations for prevention and treatment of maternal peripartum infections, 2015" }],
  textbook: [
    { book: "williams", text: "Moderate to severe metritis needs IV broad-spectrum antibiotics; about 90 percent improve in 48 to 72 hours. Persistent fever prompts a search for phlegmon, abscess, infected haematoma or septic pelvic thrombophlebitis.", ref: "Williams Obstetrics 25th ed. 2018, ch. 37 Puerperal Complications, pdf p. 1474" },
    { book: "williams", text: "Ampicillin plus an aminoglycoside plus metronidazole covers most organisms in serious pelvic infections; clindamycin-gentamicin remains the standard comparator.", ref: "Williams Obstetrics 25th ed. 2018, ch. 37 Puerperal Complications, pdf p. 1475" },
    { book: "williams", text: "Septic abortion: prompt broad-spectrum antibiotics plus suction curettage of retained products; laparotomy if peritonitis or free air, hysterectomy if the uterus is necrotic.", ref: "Williams Obstetrics 25th ed. 2018, ch. 18 Abortion, pdf p. 767" },
    { book: "gabbe", text: "Endometritis diagnosed by two of: fever ≥38 °C, uterine tenderness, purulent lochia; far commoner after caesarean.", ref: "Gabbe's Obstetrics 9th ed., ch. 58 Bacterial and Parasitic Infections in Pregnancy, p. 1120" },
    { book: "gabbe", text: "Stop IV antibiotics once clinically improved and afebrile 24-48 h; if no response in 48 h re-examine and add ampicillin.", ref: "Gabbe's Obstetrics 9th ed., ch. 58 Bacterial and Parasitic Infections in Pregnancy, p. 1121" },
    { book: "gabbe", text: "Sepsis: antibiotics ideally within 1 h; source control surgery (evacuation, abscess drainage) should not be delayed for instability.", ref: "Gabbe's Obstetrics 9th ed., ch. 58 Bacterial and Parasitic Infections in Pregnancy, p. 1125" },
    { book: "gabbe", text: "Septic shock: 1-2 L crystalloid, transfuse to Hb ≥7, norepinephrine if MAP <65; hydrocortisone if unresponsive.", ref: "Gabbe's Obstetrics 9th ed., ch. 58 Bacterial and Parasitic Infections in Pregnancy, p. 1124" }
  ],
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
    { id: "ampicillin", role: "first", note: "Prophylaxis: 2 g IV as a single dose within 60 min before incision. Williams and Gabbe recommend ampicillin or a first-generation cephalosporin such as cefazolin 2 g." },
    { id: "ceftriaxone", role: "alternative", note: "Single dose within 60 min before incision, only if neither cefazolin nor ampicillin is available; the obstetric texts prefer narrower agents." },
    { id: "oxytocin", role: "first", note: "After delivery of the baby, to contract the uterus." },
    { id: "ketamine", role: "alternative", note: "When spinal is contraindicated or has failed, and no anaesthetist is available." },
    { id: "lidocaine", role: "alternative", note: "Local infiltration in layers when nothing else is possible." },
    { id: "tranexamic-acid", role: "adjunct", note: "1 g IV for bleeding. Routine prophylaxis at caesarean is not recommended: a large trial found no reduction in death or transfusion (Williams, Gabbe)." },
    { id: "misoprostol", role: "adjunct", note: "Second uterotonic for atony on the table." },
    { id: "paracetamol", role: "supportive", note: "Regular, by the clock, from the end of surgery." },
    { id: "morphine", role: "supportive", note: "For breakthrough pain in the first 24 h." }
  ],
  sources: [{ name: "WHO. Surgical Care at the District Hospital, 2003" }, { name: "MSF Clinical Guidelines — Anaesthesia" }],
  textbook: [
    { book: "williams", text: "Prophylaxis reduces post-cesarean pelvic infection by 70 to 80 percent; single-dose ampicillin 2 g or a first-generation cephalosporin (cefazolin 3 g if obese) is ideal, given before incision.", ref: "Williams Obstetrics 25th ed. 2018, ch. 37 Puerperal Complications, pdf p. 1476" },
    { book: "williams", text: "Spinal for cesarean needs a T4 sensory level: 10 to 12 mg hyperbaric bupivacaine; intrathecal morphine 0.1 to 0.3 mg gives up to 24 hours of pain control.", ref: "Williams Obstetrics 25th ed. 2018, ch. 25 Obstetrical Analgesia and Anesthesia, pdf p. 1078" },
    { book: "williams", text: "Spinal hypotension from sympathetic block and aortocaval compression: left lateral displacement, crystalloid, and ephedrine or phenylephrine boluses.", ref: "Williams Obstetrics 25th ed. 2018, ch. 25 Obstetrical Analgesia and Anesthesia, pdf p. 1079" },
    { book: "williams", text: "Tranexamic acid added to oxytocin at cesarean has been proposed, but thromboembolic effects are unclear and larger trials are needed before widespread use.", ref: "Williams Obstetrics 25th ed. 2018, ch. 30 Cesarean Delivery and Peripartum Hysterectomy, pdf p. 1269" },
    { book: "gabbe", text: "Prophylactic antibiotic (cefazolin 1-2 g or ampicillin) 30-60 min before skin incision; single dose; add azithromycin if in labour or ruptured membranes.", ref: "Gabbe's Obstetrics 9th ed., ch. 21 Cesarean Delivery, p. 427" },
    { book: "gabbe", text: "Neuraxial anaesthesia is the gold standard for caesarean; firm contraindication with significant ongoing haemorrhage.", ref: "Gabbe's Obstetrics 9th ed., ch. 18 Obstetric Anesthesia, p. 364" },
    { book: "gabbe", text: "After delivery start PPH prevention: oxytocin infusion of at least 20 IU preferred to bolus; pre-incision TXA 1 g reduces blood loss.", ref: "Gabbe's Obstetrics 9th ed., ch. 21 Cesarean Delivery, p. 431" },
    { book: "gabbe", text: "Platelet count ≥70,000 is acceptable for neuraxial block when stable, no coagulopathy or anticoagulants.", ref: "Gabbe's Obstetrics 9th ed., ch. 18 Obstetric Anesthesia, p. 354" }
  ],
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
    { id: "metronidazole", role: "adjunct", note: "Only when strangulation, ischaemia or perforation is suspected, and before laparotomy. Simple adhesive obstruction does not need antibiotics (Schwartz)." },
    { id: "gentamicin", role: "adjunct", note: "With metronidazole and ampicillin when strangulation or perforation is suspected. Watch renal function in a dehydrated patient." },
    { id: "ampicillin", role: "adjunct", note: "Third part of the triple regimen, for suspected strangulation or perforation only." },
    { id: "ceftriaxone", role: "alternative", note: "With metronidazole where the triple regimen is unavailable." },
    { id: "morphine", role: "supportive", note: "Titrated. Pain relief does not mask the diagnosis; a tender abdomen stays tender." },
    { id: "paracetamol", role: "supportive", note: "Regular, to reduce the opioid requirement." },
    { id: "bupivacaine", role: "supportive", note: "Spinal for a lower abdominal laparotomy where appropriate." },
    { id: "ketamine", role: "supportive", note: "Anaesthesia where no anaesthetist is available; avoid spinal in the shocked patient." },
    { id: "blood-transfusion", role: "supportive", note: "For anaemia or bleeding at operation." },
    { id: "atropine", role: "adjunct", note: "With ketamine, to reduce secretions." }
  ],
  sources: [{ name: "WHO. Surgical Care at the District Hospital, 2003" }, { name: "MSF Clinical Guidelines — surgical emergencies" }],
  textbook: [
    { book: "schwartz", text: "SBO causes marked volume depletion: give IV isotonic fluid, consider a bladder catheter for urine output, and decompress the stomach continuously with an NG tube.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 28 Small Intestine, p. 1231" },
    { book: "schwartz", text: "Broad-spectrum antibiotics are not indicated unless bowel ischaemia is suspected and surgery is planned.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 28 Small Intestine, p. 1231" },
    { book: "schwartz", text: "Strangulation features: pain out of proportion to findings, tachycardia, localised tenderness, fever, marked leukocytosis, acidosis; any should prompt early surgery.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 28 Small Intestine, p. 1229" },
    { book: "schwartz", text: "Non-operative NG decompression and fluids is now common for non-ischaemic obstruction if closed-loop obstruction and ischaemia are excluded.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 28 Small Intestine, p. 1231" }
  ],
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
    "Continue antibiotics for about 4 days after adequate source control, longer only with heavy contamination (Schwartz); watch for wound dehiscence and abscess."
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
  textbook: [
    { book: "schwartz", text: "Secondary peritonitis needs source control (resect/repair, debride) plus antimicrobials covering aerobes and anaerobes.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 6 Surgical Infections, p. 171" },
    { book: "schwartz", text: "After adequate source control, perforated appendicitis/extensive intraperitoneal infection: limit antibiotics to about 4 days; re-evaluate for missed source if no improvement after 5-7 days.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 6 Surgical Infections, p. 168" },
    { book: "schwartz", text: "Most intra-abdominal abscesses can now be diagnosed by CT and drained percutaneously; operate for multiple abscesses, hazardous location or an ongoing leak.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 6 Surgical Infections, p. 172" }
  ],
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
    "Penetrating injury without head injury: limited crystalloid to a palpable radial pulse (systolic about 80–90) until the bleeding is controlled; call for blood and donors immediately.",
    "Head injury, and most blunt trauma: do NOT use permissive hypotension — the injured brain needs a systolic above 100 mmHg (Schwartz).",
    "Keep the patient warm. Hypothermia stops clotting.",
    "Theatre for ongoing bleeding. Do not wait for blood to arrive."
  ],
  drugs: [
    { id: "tranexamic-acid", role: "first", note: "1 g over 10 min within 3 h, then 1 g over 8 h. Later than 3 h may be harmful." },
    { id: "blood-transfusion", role: "first", note: "The correct resuscitation fluid in haemorrhage. Start the donor call at once." },
    { id: "ringers-lactate", role: "first", note: "Bridge only. Over-infusion dilutes clotting factors." },
    { id: "morphine", role: "first", note: "Titrated intravenously in small increments for severe pain." },
    { id: "ketamine", role: "adjunct", note: "Usually supports blood pressure, but in prolonged, catecholamine-depleted shock it can cause profound hypotension (Schwartz). Use a reduced dose, slowly, with fluids and a vasopressor ready." },
    { id: "lidocaine", role: "adjunct", note: "Wound infiltration and nerve blocks, including femoral block for a fractured femur." },
    { id: "paracetamol", role: "supportive", note: "Regular background analgesia." },
    { id: "cloxacillin", role: "adjunct", note: "For open fractures and contaminated wounds." },
    { id: "metronidazole", role: "adjunct", note: "For heavily contaminated or penetrating abdominal wounds." },
    { id: "ceftriaxone", role: "adjunct", note: "Open fracture prophylaxis where protocol specifies." },
    { id: "atropine", role: "supportive", note: "With ketamine for secretions." },
    { id: "naloxone", role: "supportive", note: "If opioid analgesia causes respiratory depression." },
    { id: "oxygen", role: "supportive", note: "High-flow oxygen for major trauma and head injury (SpO2 94 % or more)." },
    { id: "mannitol", role: "adjunct", note: "Head injury with signs of herniation only, after blood pressure is restored: 0.5 g/kg over 20–30 min as a bridge to surgery. Worsens hypovolaemia." },
    { id: "hypertonic-saline", role: "adjunct", note: "Preferred osmotic agent for a head-injured patient who is also hypotensive or bleeding: 3 % saline 2–5 mL/kg over 10–20 min." }
  ],
  sources: [{ name: "CRASH-2 collaborators. Lancet 2010" }, { name: "WHO. Surgical Care at the District Hospital, 2003" }],
  textbook: [
    { book: "schwartz", text: "Hypotensive resuscitation is controversial and mainly for penetrating vascular injury (SBP around 90); TBI needs SBP >100, so it is not appropriate for most blunt trauma.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 7 Trauma, p. 195" },
    { book: "schwartz", text: "Patients arriving in shock (SBP <90) should receive a massive transfusion protocol (RBC and plasma) rather than crystalloid.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 7 Trauma, p. 191" },
    { book: "schwartz", text: "All operated trauma patients get preoperative antibiotics, redosed for blood loss; extended postoperative antibiotics only for contaminated open fractures; tetanus prophylaxis for all.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 7 Trauma, p. 208" },
    { book: "schwartz", text: "Tranexamic acid within 3 h of injury reduces mortality; later administration worsened outcome.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 5 Shock, p. 145" }
  ],
  review: { status: "draft" }
},
{
  id: "burns", name: "Burns", group: "surgical",
  aka: ["scald", "burn injury", "fluid resuscitation"],
  summary: "Fluid by formula and by urine output, pain relief that actually works, and clean dressings. Under-resuscitation and under-analgesia are the two commonest failures.",
  redflags: ["Burns to face, neck, hands, feet, perineum or circumferential", "Hoarseness, soot in the nostrils, singed nasal hair — airway burn", "Over 10 % body surface in a child or 15 % in an adult", "Electrical or chemical burns"],
  steps: [
    "Small burns: cool with running water for up to 20 minutes, ideally within 3 hours. Do not use ice. Remove clothing and jewellery in every burn.",
    "Burns over about 20 % of the body: do NOT cool — hypothermia contributes to resuscitation failure. Cover with clean dry sheets and keep the patient warm (Schwartz).",
    "Estimate the percentage burned; the patient's palm with fingers is roughly 1 %.",
    "Fluid by formula from the time of the burn, then titrate to urine output: about 30 mL/h (0.5 mL/kg/h) in adults and 1–1.5 mL/kg/h in children (Schwartz).",
    "Children under 20 kg: give weight-based maintenance fluid containing glucose in addition to the Ringer's lactate — they have little glycogen and become hypoglycaemic (Schwartz).",
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
    { id: "potassium-chloride", role: "adjunct", note: "Replace after the first 24 hours as losses continue." },
    { id: "oxygen", role: "first", note: "High-flow oxygen by non-rebreather mask for smoke inhalation or suspected carbon monoxide, regardless of SpO2 (oximeters read falsely normal with CO)." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 91 Burn injuries, p. 654" }, { name: "WHO. Surgical Care at the District Hospital, 2003" }],
  textbook: [
    { book: "schwartz", text: "Parkland 3-4 mL/kg/% burn LR (half in first 8 h); ABA now recommends 2 mL/kg/%; children <20 kg also need maintenance fluid with glucose.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 8 Burns, p. 254" },
    { book: "schwartz", text: "Resuscitation endpoints: MAP 60 mmHg, urine output 30 mL/h adults and 1-1.5 mL/kg/h children.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 8 Burns, p. 254" },
    { book: "schwartz", text: "Never give prophylactic systemic antibiotics for acute burns (fungal and resistant infections); give tetanus booster per immunisation status; avoid cooling in burns >20% TBSA.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 8 Burns, p. 252" },
    { book: "schwartz", text: "Palmar surface including digits is about 1% TBSA; refer partial-thickness burns >10% TBSA, face/hands/feet/genitalia/perineum/joint burns, electrical, chemical and inhalation injury.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 8 Burns, p. 252" }
  ],
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
  textbook: [
    { book: "schwartz", text: "Abscess (hand): S. aureus commonest; incision and drainage with debridement, cultures, packing (remove in 12-24 h), elevation, immobilisation and antibiotics; heal by secondary intention.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 44 Surgery of the Hand and Wrist, p. 1948" },
    { book: "schwartz", text: "Furuncles may need incision and drainage; antibiotics if significant cellulitis or cellulitis not resolving after drainage; suspect MRSA if infection persists despite drainage and first-line antibiotics.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 6 Surgical Infections, p. 173" },
    { book: "schwartz", text: "Incisional surgical-site infection is treated by opening and draining alone; antibiotics only for significant cellulitis or systemic inflammatory response.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 6 Surgical Infections, p. 170" },
    { book: "schwartz", text: "Osteomyelitis: IV therapy covering S. aureus, adjusted to bone culture, 4-6 weeks after clinical improvement.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 44 Surgery of the Hand and Wrist, p. 1949" }
  ],
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
    "Add potassium 10–20 mmol/L to the fluids once the patient passes urine and potassium is 3.3–5.0; none above 5.0 (Harrison).",
    "Hourly glucose; switch to dextrose-containing fluid below 14 mmol/L (250 mg/dL) but keep the insulin going.",
    "Find and treat the precipitant: infection, missed insulin, new diagnosis.",
    "Stop insulin only when the acidosis has cleared and the patient is eating."
  ],
  drugs: [
    { id: "insulin-soluble", role: "first", note: "0.1 unit/kg IM every hour. No pump needed. Never stop it just because the glucose fell." },
    { id: "ringers-lactate", role: "first", note: "Or 0.9 % saline. Fluid is the first treatment, not insulin." },
    { id: "potassium-chloride", role: "first", note: "10–20 mmol per litre (up to 40 at the low end) once potassium is 3.3–5.0 and urine is flowing; none above 5.0. Hold insulin if potassium is below 3.3 (Harrison)." },
    { id: "dextrose", role: "first", note: "Add when glucose falls below 14 mmol/L so the insulin can continue clearing ketones." },
    { id: "ceftriaxone", role: "adjunct", note: "If infection is the precipitant." },
    { id: "sodium-bicarbonate", role: "avoid", note: "Children: never — it increases the risk of cerebral oedema. Adults: only if arterial pH is below 7.0, and only until it rises above 7.0 (Harrison); without blood gases, do not give it." },
    { id: "mannitol", role: "adjunct", note: "Cerebral oedema (headache, falling heart rate, rising BP, drowsiness): 0.5–1 g/kg over 10–15 min after raising the head and reducing fluids." },
    { id: "hypertonic-saline", role: "alternative", note: "Cerebral oedema when mannitol is unavailable: 3 % saline 2.5–5 mL/kg over 10–15 min." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 629, pp. 3525–3528" }, { name: "ISPAD Clinical Practice Consensus Guidelines 2022" }, { name: "Kitabchi AE et al. Diabetes Care 2009" }],
  textbook: [
    { book: "harrison", text: "Fluids: 2-3 L of 0.9% saline or lactated Ringer's over 1-3 h, then 0.45% saline 250-500 mL/h; add 5-10% glucose when glucose reaches 250 mg/dL (13.9 mmol/L).", ref: "Harrison 22nd ed. 2025, ch. 416 Diabetes Mellitus: Management and Therapies, p. 3218" },
    { book: "harrison", text: "Insulin 0.1 units/kg IV bolus then 0.1 units/kg/h; do not start insulin if initial potassium is below 3.3 mmol/L until corrected.", ref: "Harrison 22nd ed. 2025, ch. 416 Diabetes Mellitus: Management and Therapies, p. 3218" },
    { book: "harrison", text: "Potassium: if K below 3.5 give 10-20 mmol/h; if 3.5-5 add 10-20 mmol per litre; if above 5.0 hold potassium; recheck every 2 h.", ref: "Harrison 22nd ed. 2025, ch. 416 Diabetes Mellitus: Management and Therapies, p. 3218" },
    { book: "harrison", text: "Continue until glucose 150-200 mg/dL, normal ketones and pH, and bicarbonate at least 18 mmol/L; overlap SC long-acting insulin 2-4 h before stopping the infusion.", ref: "Harrison 22nd ed. 2025, ch. 416 Diabetes Mellitus: Management and Therapies, p. 3218" }
  ],
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
    { id: "blood-transfusion", role: "first", note: "Children: haemoglobin under 5 g/dL, or under 6 with distress. Adults: haematocrit below 20 % (haemoglobin about 7 g/dL), or below 15 % where blood is scarce (Harrison)." },
    { id: "diazepam", role: "adjunct", note: "Rectal or IV for convulsions." },
    { id: "ceftriaxone", role: "adjunct", note: "Add if meningitis cannot be excluded, or for concurrent bacteraemia." },
    { id: "ringers-lactate", role: "supportive", note: "Careful fluids; avoid large boluses in a febrile child without shock." },
    { id: "paracetamol", role: "supportive", note: "For fever." },
    { id: "furosemide", role: "adjunct", note: "1 mg/kg at the start of transfusion if there is heart failure." },
    { id: "mannitol", role: "avoid", note: "Mannitol has not improved outcomes in cerebral malaria and is not recommended (Nelson, Harrison, WHO)." },
    { id: "oxygen", role: "supportive", note: "For respiratory distress, severe anaemia or SpO2 under 90 %." }
  ],
  sources: [{ name: "WHO Guidelines for malaria, 2023" }, { name: "Nelson 22nd ed. 2024, ch. 336, p. 2136" }],
  textbook: [
    { book: "harrison", text: "Artesunate is the drug of choice (35% lower mortality in Asia, 22.5% in Africa vs quinine): 2.4 mg/kg at 0, 12, 24 h then daily.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1770" },
    { book: "harrison", text: "If unconscious, check blood glucose every 6 h for at least 24 h; give all patients a continuous dextrose infusion; treat glucose below 2.2 mmol/L with a bolus.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1772" },
    { book: "harrison", text: "Transfuse slowly if haematocrit falls below 20% (15% threshold used in high-transmission areas); children with Hb under 4 g/dL and acidotic breathing need immediate transfusion.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1772" },
    { book: "harrison", text: "Fluid management differs from sepsis: fluid boluses are potentially dangerous in severe malaria.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1772" }
  ],
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
    { id: "ampicillin", role: "adjunct", note: "With gentamicin in neonates and young infants. In adults, add ampicillin 2 g every 4 h to ceftriaxone for anyone over 55, pregnant, alcohol-dependent, debilitated or with impaired cell-mediated immunity (including HIV), to cover Listeria, which ceftriaxone misses (Harrison)." },
    { id: "gentamicin", role: "adjunct", note: "Neonatal regimen partner." },
    { id: "chloramphenicol", role: "alternative", note: "Oily chloramphenicol as a single IM dose in epidemic settings." },
    { id: "dexamethasone", role: "adjunct", note: "0.15 mg/kg (adult 10 mg) every 6 h, first dose with or before the antibiotic; no benefit afterwards. In low-income settings Harrison advises against it unless pneumococcal meningitis is confirmed, as trials there showed no benefit." },
    { id: "diazepam", role: "adjunct", note: "For seizures." },
    { id: "phenobarbital", role: "adjunct", note: "Second line for ongoing seizures." },
    { id: "paracetamol", role: "supportive", note: "Fever and headache." },
    { id: "dextrose", role: "supportive", note: "Check glucose." },
    { id: "oxygen", role: "supportive", note: "Airway and oxygen in a child with depressed consciousness or seizures." }
  ],
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "WHO. Managing meningitis epidemics in Africa, 2015" }],
  textbook: [
    { book: "harrison", text: "Bacterial meningitis is an emergency: aim to start antibiotics within 60 min of arrival, before CSF results.", ref: "Harrison 22nd ed. 2025, ch. 143 Acute Meningitis, p. 1122" },
    { book: "harrison", text: "If lumbar puncture is delayed for neuroimaging, start empirical antibiotics as soon as blood cultures are taken.", ref: "Harrison 22nd ed. 2025, ch. 143 Acute Meningitis, p. 1120" },
    { book: "harrison", text: "Adults over 55 or debilitated (e.g. alcoholism): ampicillin plus ceftriaxone/cefotaxime/cefepime plus vancomycin; younger adults: cephalosporin plus vancomycin.", ref: "Harrison 22nd ed. 2025, ch. 143 Acute Meningitis, p. 1121" },
    { book: "harrison", text: "Dexamethasone 10 mg IV q6h for 4 days before/with first antibiotic, but not for Gram-stain/culture-negative patients in low-income countries.", ref: "Harrison 22nd ed. 2025, ch. 143 Acute Meningitis, p. 1123" }
  ],
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
    { id: "morphine", role: "adjunct", note: "2–4 mg IV boluses can ease distress, but registry data link morphine to higher mortality in pulmonary oedema (Harrison) — use sparingly and never instead of sitting up, diuretic and oxygen." },
    { id: "digoxin", role: "adjunct", note: "For rate control in atrial fibrillation with heart failure, usually rheumatic in origin." },
    { id: "potassium-chloride", role: "adjunct", note: "Replace after diuresis, especially with digoxin." },
    { id: "blood-transfusion", role: "adjunct", note: "Packed cells slowly with furosemide when severe anaemia is the cause." },
    { id: "amiodarone", role: "alternative", note: "For arrhythmia driving the failure." },
    { id: "ringers-lactate", role: "avoid", note: "Stop the fluids. Over-infusion is a frequent and reversible cause." },
    { id: "oxygen", role: "first", note: "Sit upright; oxygen by mask or prongs to SpO2 94 % or more if hypoxaemic." }
  ],
  sources: [{ name: "WHO Model Formulary" }, { name: "Nelson 22nd ed. 2024, ch. 491, Table 491.6, p. 2898" }],
  textbook: [
    { book: "harrison", text: "Furosemide is the diuretic of choice: initial dose 0.5 mg/kg or less, 1 mg/kg with renal insufficiency, chronic diuretic use, hypervolaemia or failure of a lower dose.", ref: "Harrison 22nd ed. 2025, ch. 316 Cardiogenic Shock and Pulmonary Edema, p. 2331" },
    { book: "harrison", text: "Sublingual nitroglycerin 0.4 mg every 5 min for 3 doses is first-line; if oedema persists without hypotension, IV nitroglycerin from 5-10 micrograms/min.", ref: "Harrison 22nd ed. 2025, ch. 316 Cardiogenic Shock and Pulmonary Edema, p. 2331" },
    { book: "harrison", text: "In patients who are not hypotensive, sitting upright with the legs dangling over the side of the bed reduces venous return and helps relieve pulmonary oedema.", ref: "Harrison 22nd ed. 2025, ch. 316 Cardiogenic Shock and Pulmonary Edema, p. 2331" },
    { book: "harrison", text: "Morphine 2-4 mg IV boluses reduce preload and dyspnoea, but registry trials showed increased mortality with morphine.", ref: "Harrison 22nd ed. 2025, ch. 316 Cardiogenic Shock and Pulmonary Edema, p. 2331" }
  ],
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
    { id: "morphine", role: "avoid", note: "Sedation in asthma is dangerous." },
    { id: "ipratropium", role: "adjunct", note: "Added to salbutamol every 20 min for the first hour in a severe attack (adult 500 mcg, child 250 mcg nebulised, or by MDI and spacer); little extra benefit once admitted on steroids." },
    { id: "oxygen", role: "first", note: "For SpO2 under 90 % or any emergency sign (94 % or more during resuscitation); nasal prongs, or drive the nebuliser with oxygen." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 185, pp. 1405–1408" }, { name: "WHO Pocket Book 2013" }, { name: "GINA 2024" }],
  textbook: [
    { book: "harrison", text: "Urgent care: nebulised beta2-agonist up to every 20 min; add IV corticosteroids if no response in 1-2 h; oxygen for hypoxaemia; magnesium and nebulised anticholinergics may be added.", ref: "Harrison 22nd ed. 2025, ch. 298 Asthma, p. 2227" },
    { book: "harrison", text: "Antibiotics only with signs of infection; failure to reach PEFR above 60% or persistent tachypnoea over 4-6 h should prompt admission.", ref: "Harrison 22nd ed. 2025, ch. 298 Asthma, p. 2227" },
    { book: "harrison", text: "A normal or near-normal PCO2 in a distressed asthmatic signals impending respiratory failure and possible need for ventilation.", ref: "Harrison 22nd ed. 2025, ch. 298 Asthma, p. 2227" }
  ],
  review: { status: "draft" }
},
{
  id: "pneumonia", name: "Severe pneumonia", group: "medical",
  aka: ["chest infection", "LRTI", "consolidation"],
  summary: "Oxygen and the right antibiotic. In children, counting the respiratory rate and looking for chest indrawing identifies severe disease without any equipment.",
  redflags: ["Chest indrawing or very fast breathing", "Saturation under 90 % or central cyanosis", "Unable to drink or breastfeed", "Grunting, head nodding, or reduced consciousness"],
  steps: [
    "Oxygen for saturation under 90 % or any danger sign.",
    "Antibiotics without delay; the first dose matters most. Adults admitted with pneumonia: add a macrolide such as azithromycin 500 mg daily to the beta-lactam to cover atypical organisms (Harrison).",
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
    { id: "dextrose", role: "supportive", note: "Check glucose in a child who cannot feed." },
    { id: "oxygen", role: "first", note: "SpO2 under 90 % or danger signs: nasal prongs 1–2 L/min in infants. Bubble CPAP only with close nursing observation." }
  ],
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "Nelson 22nd ed. 2024" }],
  textbook: [
    { book: "harrison", text: "Adult inpatients with non-severe or severe CAP and no MRSA/Pseudomonas risk: a beta-lactam plus a macrolide, or a respiratory fluoroquinolone.", ref: "Harrison 22nd ed. 2025, ch. 131 Pneumonia, p. 1028" },
    { book: "harrison", text: "Parenteral beta-lactams such as ampicillin, cefotaxime, ceftriaxone and cefuroxime are commonly first-line for community-acquired pneumococcal infection.", ref: "Harrison 22nd ed. 2025, ch. 151 Pneumococcal Infections, p. 1193" }
  ],
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
    "Treat for at least 3 months. After a provoked clot with a transient cause, 3 months is usually enough; after a first pulmonary embolism with no identifiable cause, or only a minor one, consider indefinite anticoagulation if bleeding risk is low (Harrison)."
  ],
  drugs: [
    { id: "heparin", role: "first", note: "Enoxaparin 1 mg/kg subcutaneously every 12 h. Where only unfractionated heparin exists, 333 units/kg then 250 units/kg subcutaneously every 12 h needs no pump." },
    { id: "paracetamol", role: "supportive", note: "Analgesia; prefer it over NSAIDs while anticoagulated." },
    { id: "morphine", role: "supportive", note: "For severe pleuritic pain from pulmonary embolism." },
    { id: "furosemide", role: "avoid", note: "The raised venous pressure of pulmonary embolism is not fluid overload; diuresis worsens the low output state." },
    { id: "tranexamic-acid", role: "avoid", note: "Antifibrinolytics are contraindicated in active thromboembolism." },
    { id: "oxygen", role: "supportive", note: "Pulmonary embolism with hypoxaemia." }
  ],
  sources: [{ name: "Kearon C et al. FIDO. JAMA 2006" }, { name: "CHEST Antithrombotic Therapy for VTE Disease, 2021" }],
  textbook: [
    { book: "harrison", text: "Parenteral options include enoxaparin 1 mg/kg twice daily with normal renal function, or UFH infusion titrated to aPTT 2-3 times upper normal.", ref: "Harrison 22nd ed. 2025, ch. 290 Deep-Venous Thrombosis and Pulmonary Thromboembolism, p. 2163" },
    { book: "harrison", text: "When starting warfarin (usually 5 mg, INR 2.0-3.0), overlap parenteral anticoagulation for at least 5 days and until two INRs at least a day apart are therapeutic.", ref: "Harrison 22nd ed. 2025, ch. 290 Deep-Venous Thrombosis and Pulmonary Thromboembolism, p. 2163" },
    { book: "harrison", text: "Warfarin is contraindicated in pregnancy, especially first and third trimesters; use heparin, LMWH or fondaparinux instead.", ref: "Harrison 22nd ed. 2025, ch. 123 Antiplatelet, Anticoagulant, and Fibrinolytic Drugs, p. 952" },
    { book: "harrison", text: "ESC guidance: consider extended anticoagulation without an end date after a first PE with no identifiable risk factor, a persistent risk factor, or a minor transient risk factor.", ref: "Harrison 22nd ed. 2025, ch. 290 Deep-Venous Thrombosis and Pulmonary Thromboembolism, p. 2163" }
  ],
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
    { id: "magnesium-sulfate", role: "adjunct", note: "Controls autonomic instability (target serum magnesium 2–4 mmol/L). At doses high enough to relax muscle spasms it requires mechanical ventilation (Harrison), so without a ventilator use it for autonomic control, not as the main spasm treatment." },
    { id: "morphine", role: "adjunct", note: "For autonomic instability and pain." },
    { id: "ringers-lactate", role: "supportive", note: "Hydration; losses from spasm and sweating are large." },
    { id: "paracetamol", role: "supportive", note: "Fever and pain." },
    { id: "oxygen", role: "supportive", note: "During spasms and after sedation; suction and bag-valve-mask at the bedside." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 257 Tetanus, p. 1823" }, { name: "WHO. Current recommendations for treatment of tetanus, 2010" }],
  textbook: [
    { book: "harrison", text: "Metronidazole 400 mg rectally or 500 mg IV every 6 h for 7 days is preferred; penicillin is a second choice.", ref: "Harrison 22nd ed. 2025, ch. 157 Tetanus, p. 1231" },
    { book: "harrison", text: "Antitoxin: human tetanus immunoglobulin single IM dose 500–5000 IU; equine antitoxin 10,000–20,000 U IM after hypersensitivity testing.", ref: "Harrison 22nd ed. 2025, ch. 157 Tetanus, p. 1231" },
    { book: "harrison", text: "Debride and clean the wound several hours after the antitoxin has been given.", ref: "Harrison 22nd ed. 2025, ch. 157 Tetanus, p. 1231" },
    { book: "harrison", text: "Secure the airway early in severe tetanus; tracheostomy is preferred because intubation is difficult.", ref: "Harrison 22nd ed. 2025, ch. 157 Tetanus, p. 1231" }
  ],
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
    "Antibiotics only for cholera, dysentery with blood, or a specific infection. Moderate or severe cholera: a single oral dose after rehydration shortens the illness — azithromycin 1 g (child 20 mg/kg) or, where susceptible, doxycycline 300 mg (Harrison)."
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
  textbook: [
    { book: "harrison", text: "Severe cholera dehydration: IV Ringer's lactate 100 mL/kg in first 3 h (6 h under 12 months), 200 mL/kg total in first 24 h, until awake and drinking.", ref: "Harrison 22nd ed. 2025, ch. 173 Cholera and Other Vibrioses, p. 1328" },
    { book: "harrison", text: "The whole deficit (over 10% body weight) can be safely replaced within 3–4 h, half in the first hour.", ref: "Harrison 22nd ed. 2025, ch. 173 Cholera and Other Vibrioses, p. 1328" },
    { book: "harrison", text: "Give adjunctive antibiotics for moderate/severe cholera dehydration: e.g. azithromycin 1 g single dose adult, or doxycycline 300 mg single dose where susceptible.", ref: "Harrison 22nd ed. 2025, ch. 173 Cholera and Other Vibrioses, p. 1329" }
  ],
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
    { id: "ringers-lactate", role: "avoid", note: "Plan C rates cause heart failure here. Use 15 mL/kg over 1 h for shock only." },
    { id: "oxygen", role: "supportive", note: "Pneumonia or heart failure with SpO2 under 90 %." }
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
    { id: "vitamin-k", role: "supportive", note: "1 mg IM if not already given at birth." },
    { id: "oxygen", role: "supportive", note: "Nasal prongs 0.5–1 L/min for SpO2 under 90 %; avoid SpO2 above 95 % in preterm babies." }
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
    { id: "sodium-bicarbonate", role: "avoid", note: "Not recommended routinely; worsens intracellular acidosis without good ventilation." },
    { id: "oxygen", role: "supportive", note: "Titrated to SpO2 90–95 % in newborns; term resuscitation starts with room air." }
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
    { id: "ringers-lactate", role: "avoid", note: "Never prime or run a blood line with Ringer's lactate; use saline only." },
    { id: "oxygen", role: "supportive", note: "While blood is being arranged in a child with respiratory distress." }
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
    { id: "paracetamol", role: "supportive", note: "Fever and mouth pain." },
    { id: "oxygen", role: "supportive", note: "Measles pneumonia with SpO2 under 90 % or danger signs." }
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
    { id: "salbutamol", role: "avoid", note: "Croup is upper airway obstruction; salbutamol does not help." },
    { id: "oxygen", role: "supportive", note: "Only for hypoxaemia or severe obstruction — keep the child calm on the parent's lap; hypoxaemia means impending airway failure." }
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
    { id: "aminophylline", role: "alternative", note: "6 mg/kg, then 2.5 mg/kg every 12 h in week 1 and 4 mg/kg every 12 h in weeks 2–4 (WHO), where caffeine is unavailable; more side-effects." },
    { id: "ampicillin", role: "adjunct", note: "With gentamicin if sepsis is suspected." },
    { id: "gentamicin", role: "adjunct", note: "Neonatal regimen partner." },
    { id: "dextrose", role: "supportive", note: "Check glucose." },
    { id: "blood-transfusion", role: "adjunct", note: "For anaemia of prematurity contributing to apnoea." },
    { id: "oxygen", role: "supportive", note: "Low-flow oxygen titrated to SpO2 90–95 %; bag-and-mask for apnoea that does not respond to stimulation." }
  ],
  sources: [{ name: "Nelson 22nd ed. 2024, ch. 124, p. 1076" }, { name: "Schmidt B et al. CAP trial. NEJM 2006" }],
  review: { status: "draft" }
},
{
  id: "snakebite",
  name: "Snakebite envenoming",
  group: "emergency",
  aka: [
    "snake bite",
    "viper bite",
    "cobra bite",
    "mamba bite",
    "puff adder",
    "envenomation"
  ],
  summary: "Most bites need observation, not antivenom — but blood that will not clot, paralysis or rapidly spreading swelling need antivenom at once, at the same dose for a child as for an adult, with adrenaline drawn up beside the drip.",
  redflags: [
    "Blood still liquid at 20 min in a glass tube (20WBCT)",
    "Bleeding from gums, old wounds or cannula sites; blood in urine or vomit",
    "Ptosis, double vision, difficulty swallowing, drooling, weak neck or breathing",
    "Swelling spreading beyond half the limb, blistering, or shock",
    "Dark urine or falling urine output"
  ],
  steps: [
    "Reassure, remove rings and tight clothing, splint the limb. Remove a tourniquet only once IV access is in place and antivenom is ready. No incision, suction or traditional remedies.",
    "IV access in an unbitten limb. 20WBCT on arrival. Mark the edge of the swelling with the time.",
    "Antivenom IV for systemic or severe local envenoming — full dose, same for children — by slow push or diluted infusion over 1 h, adrenaline drawn up.",
    "Repeat 20WBCT 6 h after each dose; repeat the dose while the blood does not clot. Neurotoxic signs worsening 1–2 h after a dose: repeat the dose.",
    "Airway and breathing: bag-valve-mask for paralysis for as long as needed; atropine plus neostigmine trial for cobra bites.",
    "Observe every bite for at least 24 h. Tetanus toxoid. Paracetamol or morphine; no NSAIDs and no IM injections while blood does not clot."
  ],
  drugs: [
    {
      id: "snake-antivenom",
      role: "first",
      note: "Starting dose from the leaflet of the product in stock, identical for children and adults; repeat by 20WBCT at 6 h or by neurological response at 1–2 h."
    },
    {
      id: "adrenaline",
      role: "first",
      note: "Drawn up before antivenom starts: 0.5 mg IM (child 0.01 mg/kg, max 0.5 mg) at the first sign of a reaction."
    },
    {
      id: "atropine",
      role: "adjunct",
      note: "0.6 mg IV (child 0.02 mg/kg, min 0.1 mg) before a neostigmine trial in neurotoxic bites (Harrison)."
    },
    {
      id: "hydrocortisone",
      role: "adjunct",
      note: "After adrenaline for an antivenom reaction; not useful as premedication."
    },
    {
      id: "oxygen",
      role: "supportive",
      note: "Neurotoxic envenoming, shock or respiratory failure."
    },
    {
      id: "ringers-lactate",
      role: "supportive",
      note: "Fluid boluses for shock; watch urine output for acute kidney injury."
    },
    {
      id: "blood-transfusion",
      role: "adjunct",
      note: "Only after antivenom, for severe bleeding or anaemia — before antivenom it fuels the coagulopathy."
    },
    {
      id: "paracetamol",
      role: "supportive",
      note: "Pain and pyrogenic antivenom reactions."
    },
    {
      id: "morphine",
      role: "supportive",
      note: "Severe pain; small IV increments, not IM while blood is incoagulable."
    },
    {
      id: "cloxacillin",
      role: "adjunct",
      note: "Only for a clinically infected bite wound or after incision."
    }
  ],
  sources: [
    {
      name: "WHO Regional Office for Africa. Guidelines for the Prevention and Clinical Management of Snakebite in Africa, 2010"
    },
    {
      name: "WHO SEARO. Guidelines for the Management of Snakebites, 2nd ed. 2016"
    },
    {
      name: "MSF Clinical Guidelines — snake bites"
    }
  ],
  textbook: [
    {
      book: "harrison",
      text: "20-minute whole blood clotting test: 1–2 mL venous blood in a clean, dry glass tube, left undisturbed 20 min then tipped; blood still liquid = coagulopathy.",
      ref: "Harrison 22nd ed. 2025, ch. 471 Venomous Snakebites, p. 3719"
    },
    {
      book: "harrison",
      text: "Give antivenom IV only, starting slowly with the clinician at the bedside; if there is no reaction, speed up to finish the starting dose over about 1 h. Repeat if the patient worsens, fails to stabilise or venom effects recur; for viper bites continue until coagulation is restored.",
      ref: "Harrison 22nd ed. 2025, ch. 471, p. 3719"
    },
    {
      book: "harrison",
      text: "Blood products are rarely needed; clotting factors usually recover within hours of adequate antivenom, and blood products given before antivenom fuel the consumptive coagulopathy. Serum sickness 1–2 weeks later: prednisone 1–2 mg/kg daily.",
      ref: "Harrison 22nd ed. 2025, ch. 471, p. 3721"
    },
    {
      book: "harrison",
      text: "Coagulopathy can recur 2–3 weeks after the bite because venom outlasts antivenom; warn against surgery and trauma, and consider repeat antivenom for delayed bleeding.",
      ref: "Harrison 22nd ed. 2025, ch. 471, p. 3722"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "svt",
  name: "Supraventricular tachycardia",
  group: "emergency",
  aka: [
    "SVT",
    "narrow complex tachycardia",
    "palpitations",
    "PSVT",
    "fast heart rate in infants"
  ],
  summary: "A regular, fixed, very fast narrow-complex rhythm. Vagal manoeuvres first, adenosine by a truly rapid push with an instant flush second, and a synchronised shock for anyone in shock or heart failure.",
  redflags: [
    "Hypotension, poor perfusion, altered consciousness — cardioversion now",
    "Infant with poor feeding, sweating, grey colour or enlarged liver (heart failure)",
    "Broad QRS complexes — treat as ventricular tachycardia",
    "Irregular rhythm — not SVT; never adenosine in irregular broad-complex tachycardia"
  ],
  steps: [
    "Record a 12-lead ECG (or at least a rhythm strip). Confirm regular narrow-complex tachycardia.",
    "Stable: modified Valsalva in adults and older children; ice-cold water bag to the face for 15–30 s in infants. Never press on the eyes.",
    "Adenosine rapid IV push with a 3-way tap and flush while the ECG runs: child 0.1 mg/kg then 0.2 mg/kg; adult 6 mg then 12 mg.",
    "Unstable, or adenosine fails: synchronised cardioversion (child 0.5–1 J/kg then 2 J/kg) with sedation; oxygen and bag-valve-mask ready.",
    "After conversion, repeat the ECG (look for Wolff-Parkinson-White) and refer for long-term management. Verapamil is not in this app — never in infants."
  ],
  drugs: [
    {
      id: "adenosine",
      role: "first",
      note: "Rapid push into a large proximal vein with an immediate flush; child 0.1 mg/kg (max 6 mg) then 0.2 mg/kg (max 12 mg); adult 6 mg, 12 mg, 12 mg."
    },
    {
      id: "midazolam",
      role: "adjunct",
      note: "Sedation before synchronised cardioversion in a conscious patient; bag-valve-mask ready."
    },
    {
      id: "amiodarone",
      role: "alternative",
      note: "Specialist option for SVT resistant to adenosine and cardioversion; causes hypotension if given fast."
    },
    {
      id: "digoxin",
      role: "alternative",
      note: "Specialist oral or IV option for recurrent SVT in infants without WPW; slow onset — not for acute conversion."
    },
    {
      id: "oxygen",
      role: "supportive",
      note: "Shock or heart failure, and during cardioversion."
    }
  ],
  sources: [
    {
      name: "Resuscitation Council UK. Adult and Paediatric tachycardia algorithms, 2021"
    },
    {
      name: "AHA PALS/ACLS 2020"
    },
    {
      name: "Nelson 22nd ed. 2024, ch. 484"
    }
  ],
  textbook: [
    {
      book: "nelson",
      text: "SVT: in infants an ice bag over the whole face for 15–30 s; older children Valsalva or straining; never ocular pressure. Stable patients: adenosine by rapid IV push 0.1 mg/kg (up to 6 mg), increased to 0.2 mg/kg (up to 12 mg) if no effect.",
      ref: "Nelson 22nd ed. 2024, ch. 484 Disturbances of rate and rhythm, p. 2850"
    },
    {
      book: "nelson",
      text: "Adenosine can trigger atrial fibrillation, so a means of DC cardioversion should be at hand; verapamil can cause hypotension and cardiac arrest under 1 year and is contraindicated in that age group; synchronised cardioversion 0.5–2 J/kg if in heart failure.",
      ref: "Nelson 22nd ed. 2024, ch. 484, p. 2850"
    },
    {
      book: "harrison",
      text: "Urgent SVT treatment: vagal manoeuvres or carotid sinus massage (cautiously if carotid disease), then adenosine 6 or 12 mg, which terminates AV node-dependent SVT or unmasks atrial tachycardia or flutter.",
      ref: "Harrison 22nd ed. 2025, ch. 253 Approach to Supraventricular Arrhythmias, p. 1933"
    },
    {
      book: "williams",
      text: "Pregnancy: vagal manoeuvres first, then IV adenosine, which is safe and effective in haemodynamically stable pregnant women; transient fetal bradycardia has been described. Synchronised cardioversion if unstable.",
      ref: "Williams Obstetrics 25th ed. 2018, ch. 49 Cardiovascular Disorders, pdf p. 2142"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "raised-icp",
  name: "Head injury & raised intracranial pressure",
  group: "surgical",
  aka: [
    "head injury",
    "traumatic brain injury",
    "TBI",
    "raised ICP",
    "cerebral oedema",
    "herniation",
    "brain swelling"
  ],
  summary: "Prevent the second injury: oxygen, a systolic blood pressure above 100 mmHg, head up 30°, seizures and glucose controlled. Osmotic therapy with mannitol or 3 % saline buys an hour or two for burr holes or referral — it is not a treatment on its own.",
  redflags: [
    "GCS falling by 2 or more points, or GCS 8 or below",
    "One pupil dilated or unreactive, or new limb weakness",
    "Cushing response: rising blood pressure with a slowing pulse and irregular breathing",
    "Lucid interval then deterioration (extradural haematoma)",
    "Seizures after head injury; CSF leak; depressed skull fracture"
  ],
  steps: [
    "Airway with cervical spine control. Oxygen to SpO2 94 % or more. Ventilate if GCS 8 or below and you can.",
    "Resuscitate to euvolaemia and a systolic BP above 100 mmHg — no permissive hypotension in head injury. Use 0.9 % saline for large volumes; avoid glucose-only and hypotonic fluids.",
    "Head of bed up 30°, head midline, collar not tight. Treat seizures, fever, hypoglycaemia and pain.",
    "Signs of herniation: mannitol 0.5 g/kg over 20–30 min (only if not hypovolaemic) or 3 % saline 2–5 mL/kg over 10–20 min; catheterise; call the surgeon.",
    "Tranexamic acid within 3 h of injury for mild-to-moderate head injury (CRASH-3). No steroids for head injury.",
    "Urgent CT and neurosurgical referral; burr holes at the district hospital for a deteriorating patient with a lateralising extradural haematoma when referral is impossible."
  ],
  drugs: [
    {
      id: "oxygen",
      role: "first",
      note: "SpO2 94 % or more; hypoxia and hypotension each markedly worsen outcome after head injury."
    },
    {
      id: "mannitol",
      role: "first",
      note: "Herniation signs, normovolaemic patient: 0.25–1 g/kg (usually 0.5 g/kg) over 20–30 min; catheterise and replace urine losses."
    },
    {
      id: "hypertonic-saline",
      role: "first",
      note: "Herniation signs, especially if hypotensive or bleeding: 3 % saline 2–5 mL/kg over 10–20 min; can be made from 0.9 % saline and 20 % NaCl ampoules."
    },
    {
      id: "tranexamic-acid",
      role: "adjunct",
      note: "1 g over 10 min then 1 g over 8 h within 3 h of injury (mild-to-moderate TBI)."
    },
    {
      id: "phenytoin",
      role: "adjunct",
      note: "Seizures after head injury; loading dose diluted in saline."
    },
    {
      id: "diazepam",
      role: "adjunct",
      note: "Stop an active seizure; watch breathing."
    },
    {
      id: "morphine",
      role: "supportive",
      note: "Small IV increments for pain from other injuries; monitor breathing and pupils."
    },
    {
      id: "paracetamol",
      role: "supportive",
      note: "Fever and pain; fever worsens brain injury."
    },
    {
      id: "dexamethasone",
      role: "avoid",
      note: "Steroids increase mortality after head injury; they are for tumour or abscess oedema only."
    }
  ],
  sources: [
    {
      name: "Brain Trauma Foundation. Guidelines for the Management of Severe TBI, 4th ed. 2016"
    },
    {
      name: "CRASH-3 trial collaborators. Lancet 2019;394:1713–23"
    },
    {
      name: "CRASH trial collaborators. Lancet 2004;364:1321–8 (corticosteroids)"
    },
    {
      name: "WHO. Surgical Care at the District Hospital, 2003"
    }
  ],
  textbook: [
    {
      book: "harrison",
      text: "Raised ICP: head up, midline position; osmotherapy with mannitol 25–100 g every 4 h as needed, keeping serum osmolality under 320; glucocorticoids only for tumour or abscess oedema, not head injury or stroke.",
      ref: "Harrison 22nd ed. 2025, ch. 318 Nervous System Disorders in Critical Care, p. 2345"
    },
    {
      book: "schwartz",
      text: "A bolus of mannitol up to 1 g/kg draws water out of the brain; the effect starts after about 20 minutes and is transient. Driving osmolality above 300 is of uncertain benefit and can cause hypovolaemia, hypotension and reduced brain perfusion.",
      ref: "Schwartz's Principles of Surgery 11th ed., ch. 42 Neurosurgery, p. 1832"
    },
    {
      book: "nelson",
      text: "Children with raised ICP: 3 % saline 2–5 mL/kg over 10–20 min or mannitol 0.25–1 g/kg IV over 20 min; avoid serum osmolality above 320; insert a urinary catheter.",
      ref: "Nelson 22nd ed. 2024, ch. 82 Neurologic emergencies and stabilization, p. 586"
    },
    {
      book: "schwartz",
      text: "Head injury: resuscitate to euvolaemia and systolic BP above 100 mmHg; cerebral perfusion pressure (MAP minus ICP) above 60; sedation, osmotic diuresis, ventricular drainage and barbiturate coma are used in sequence.",
      ref: "Schwartz's Principles of Surgery 11th ed., ch. 7 Trauma, p. 218"
    },
    {
      book: "harrison",
      text: "Stuporous or comatose patients with signs of herniation from intracerebral haemorrhage: treat presumptively for raised ICP with intubation and sedation, mannitol or hypertonic saline and head elevation while surgical help is sought.",
      ref: "Harrison 22nd ed. 2025, ch. 439 Intracerebral Hemorrhage, p. 3453"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "hiv-exposure",
  name: "HIV exposure: post-exposure prophylaxis & HIV-exposed newborn",
  group: "medical",
  aka: [
    "PEP",
    "needlestick injury",
    "sharps injury",
    "sexual assault",
    "rape",
    "PMTCT",
    "HIV-exposed infant"
  ],
  summary: "PEP works only if it starts early — within hours, never after 72 h — and continues for 28 days. Every baby born to a mother with HIV needs prophylaxis from the first hours of life. Confirm regimens against the Ethiopian national HIV guideline.",
  redflags: [
    "More than 72 h since exposure — PEP no longer recommended",
    "Deep needlestick, visible blood on the device, needle from a vein or artery, source with advanced HIV",
    "Sexual assault — also pregnancy, STI, hepatitis B, tetanus, safety and psychological needs",
    "Mother tested HIV-positive in labour or after delivery — high-risk infant"
  ],
  steps: [
    "First aid now: wash wounds with soap and water; irrigate eyes and mouth. Do not squeeze or apply bleach.",
    "Assess the exposure and the source (rapid HIV test and HBsAg with consent). Baseline HIV test of the exposed person, but do not wait for results to give the first dose.",
    "Start TLD (TDF/3TC/DTG) one tablet daily for 28 days; children under 30 kg a weight-banded paediatric regimen.",
    "Sexual assault: emergency contraception, presumptive STI treatment, hepatitis B vaccine and tetanus per national protocol; document and link to protection services.",
    "HIV-exposed newborn: nevirapine (low risk) or zidovudine + nevirapine (high risk) from birth, dosed by birth weight; cotrimoxazole from 6 weeks; DNA PCR per national algorithm.",
    "Follow up at 3–7 days for adherence, complete 28 days, HIV test at 4–6 weeks and 3 months."
  ],
  drugs: [
    {
      id: "arv-prophylaxis",
      role: "first",
      note: "TLD once daily for 28 days (adults and children 30 kg or more); infant nevirapine ± zidovudine by risk and birth weight."
    },
    {
      id: "ceftriaxone",
      role: "adjunct",
      note: "Presumptive gonorrhoea treatment after sexual assault, at the dose in the national STI guideline."
    },
    {
      id: "metronidazole",
      role: "adjunct",
      note: "Presumptive trichomonas treatment after sexual assault per national protocol."
    }
  ],
  sources: [
    {
      name: "WHO. Guidelines for HIV post-exposure prophylaxis, 2024"
    },
    {
      name: "WHO. Consolidated HIV guidelines, 2021"
    },
    {
      name: "FMOH Ethiopia. National Consolidated Guidelines for Comprehensive HIV Prevention, Care and Treatment (current edition)"
    }
  ],
  textbook: [
    {
      book: "harrison",
      text: "Occupational HIV exposure is a medical emergency; clean the wound at once. PEP should contain three antiretroviral drugs for 4 weeks, with counselling, baseline and follow-up HIV tests and toxicity monitoring.",
      ref: "Harrison 22nd ed. 2025, ch. 208 HIV Disease, p. 1625"
    },
    {
      book: "harrison",
      text: "Higher-risk occupational exposures: deep injury, visible blood on the device, a needle that was in the source patient's vein or artery, and advanced HIV disease in the source.",
      ref: "Harrison 22nd ed. 2025, ch. 208, p. 1625"
    },
    {
      book: "nelson",
      text: "Non-occupational post-exposure prophylaxis in adolescents and children: three-drug regimens for 28 days.",
      ref: "Nelson 22nd ed. 2024, ch. 322 HIV and AIDS, p. 2116"
    },
    {
      book: "nelson",
      text: "All HIV-exposed infants receive antiretroviral prophylaxis; more drugs are added when the risk is high — mother on no antenatal ART, only intrapartum ART, or not virally suppressed near delivery.",
      ref: "Nelson 22nd ed. 2024, ch. 322, p. 2113"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "tuberculosis",
  name: "Tuberculosis (drug-susceptible)",
  group: "medical",
  aka: [
    "TB",
    "pulmonary TB",
    "TB meningitis",
    "miliary TB",
    "spinal TB",
    "TB lymphadenitis"
  ],
  summary: "Six months of daily fixed-dose tablets cures drug-susceptible TB. The work is in finding it, dosing by weight band, getting tablets into patients who cannot swallow, catching hepatitis early, and not letting anyone stop.",
  redflags: [
    "Cough over 2 weeks with weight loss, fever or night sweats; haemoptysis",
    "Headache, neck stiffness and falling consciousness over days (TB meningitis)",
    "Jaundice, vomiting or abdominal pain on treatment (drug-induced hepatitis)",
    "Blurred vision or colour-vision change on ethambutol",
    "HIV co-infection, malnutrition, child contact of an adult with TB"
  ],
  steps: [
    "Confirm where possible (Xpert MTB/RIF on sputum, gastric aspirate or stool in children; urine LAM in advanced HIV), but start treatment on clinical grounds when the patient is sick.",
    "Weigh and dose RHZE by weight band for 2 months, then RH for 4 months (12 months total for meningitis and bone TB). Pyridoxine for those at risk.",
    "Cannot swallow: crush adult FDCs or disperse child FDCs and give by NG tube.",
    "TB meningitis and TB pericarditis: add corticosteroids per national protocol.",
    "Test for HIV; start ART within 2 weeks (delayed in TB meningitis per guideline) — with rifampicin, dolutegravir must be given 50 mg twice daily; cotrimoxazole prophylaxis.",
    "Ask about hepatitis symptoms at every contact; stop all drugs for jaundice or high ALT and reintroduce one at a time.",
    "Screen household contacts, especially children under 5, and give TB preventive treatment."
  ],
  drugs: [
    {
      id: "tb-rhze",
      role: "first",
      note: "2RHZE/4RH daily by weight band; child dispersible FDCs; pyridoxine at-risk groups."
    },
    {
      id: "dexamethasone",
      role: "adjunct",
      note: "TB meningitis (and pericarditis), tapering over several weeks per national protocol."
    },
    {
      id: "oxygen",
      role: "supportive",
      note: "Extensive pulmonary or miliary TB with SpO2 under 90 %."
    },
    {
      id: "paracetamol",
      role: "supportive",
      note: "Fever and pain."
    }
  ],
  sources: [
    {
      name: "WHO consolidated guidelines on tuberculosis, Module 4: Treatment, 2022"
    },
    {
      name: "WHO operational handbook on tuberculosis, Module 5: children and adolescents, 2022"
    },
    {
      name: "FMOH Ethiopia. National TB, TB/HIV, DR-TB and leprosy guidelines (current edition)"
    }
  ],
  textbook: [
    {
      book: "harrison",
      text: "Regimen of choice for almost all drug-susceptible TB in adults: 2 months of isoniazid, rifampicin, pyrazinamide and ethambutol, then 4 months of isoniazid and rifampicin (2HRZE/4HR).",
      ref: "Harrison 22nd ed. 2025, ch. 183 Tuberculosis, p. 1395"
    },
    {
      book: "harrison",
      text: "Pyridoxine 10–25 mg daily for those at risk of isoniazid neuropathy: alcohol use, malnutrition, pregnancy and breastfeeding, renal failure, diabetes and HIV.",
      ref: "Harrison 22nd ed. 2025, ch. 183, p. 1396"
    },
    {
      book: "harrison",
      text: "Hepatotoxicity: stop isoniazid, pyrazinamide and rifampicin if ALT is over 5 × ULN, or over 3 × ULN with symptoms; once enzymes normalise, reintroduce rifampicin and isoniazid one at a time; pyrazinamide often not restarted. Baseline ALT and bilirubin for all; monthly if risk factors.",
      ref: "Harrison 22nd ed. 2025, ch. 186 Antimycobacterial Agents, Table, p. 1420"
    },
    {
      book: "nelson",
      text: "Children with HIV and drug-susceptible TB: four drugs for 2 months then isoniazid and rifampicin; treatment should be daily, not intermittent, with close monitoring for adverse reactions and rifampicin–antiretroviral interactions.",
      ref: "Nelson 22nd ed. 2024, ch. 261 Tuberculosis, p. 1851"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "acute-agitation",
  name: "Acute agitation and rapid tranquillisation",
  group: "psychiatric",
  aka: [
    "violent patient",
    "aggression",
    "combative",
    "rapid tranquilization",
    "chemical restraint",
    "sedation of agitated patient"
  ],
  summary: "A person who is agitated or violent is often frightened, ill or intoxicated. Talk first, offer oral medicine second, and inject only when there is serious and immediate danger. Every sedated or restrained person needs close observation, because over-sedation, airway loss and positional asphyxia kill.",
  redflags: [
    "Fever, confusion or fluctuating alertness: this may be delirium, meningitis, cerebral malaria or withdrawal, not a psychiatric illness",
    "Low glucose, low oxygen saturation, head injury or recent seizure",
    "Alcohol, khat, cannabis, stimulant or unknown drug use, or alcohol withdrawal",
    "Weapon, threats or violence already happened",
    "Older age, pregnancy, heart disease, or never had an antipsychotic before",
    "Sedated person who is snoring, slow breathing (under 10/min) or cannot be woken"
  ],
  steps: [
    "Keep yourself, staff and other patients safe: a quiet space, exits clear, enough staff present, no one alone with the patient.",
    "De-escalate: one calm person speaks, uses the person's name, listens, offers food, water or a phone call to family, and explains what will happen.",
    "Check quickly for a physical cause: glucose, temperature, oxygen saturation, pupils, signs of head injury, intoxication or withdrawal. Treat low glucose at once (give thiamine as well if alcohol use or malnutrition is likely).",
    "Offer oral medicine first and let the person choose if possible: lorazepam or diazepam orally, or an oral antipsychotic (haloperidol or olanzapine) if they are psychotic and have taken one before.",
    "Inject only if oral medicine is refused or fails and danger is immediate. With no ECG and no history of antipsychotic use, IM lorazepam is the safer choice (NICE NG10). IM haloperidol with IM promethazine is an option where lorazepam is unavailable and there is no known heart disease. Give one dose, wait 30–60 minutes, then reassess before repeating.",
    "Do not give IM diazepam (erratic absorption) or IV doses without airway equipment and a bag-valve-mask at the bedside.",
    "Physical restraint is a last resort to give treatment or prevent serious harm. Use trained staff, the minimum force for the shortest time, one person watching the airway and face. Avoid face-down holds and never press on the neck, chest, back or abdomen.",
    "After any injection or restraint, observe pulse, BP, respiratory rate, temperature, oxygen saturation and level of consciousness at least every 15 minutes for the first hour, then hourly until fully alert (NICE NG10). Record in the chart.",
    "Capacity and consent: a person can refuse treatment if they can understand, remember, weigh and communicate the decision. In an emergency without capacity, give the least restrictive treatment needed to prevent serious harm, following hospital policy and national law. Document the danger, who decided, what was given and why.",
    "Afterwards: talk with the patient about what happened, review the cause (medical, psychiatric, substance) and plan to prevent a repeat."
  ],
  drugs: [
    {
      id: "lorazepam",
      role: "first",
      note: "Oral 1–2 mg, or 1–2 mg IM/IV if oral is refused; repeat after 30–60 min if needed, up to the maximum in the local protocol. Reliable IM absorption. Halve the dose in older, frail or lung disease patients. Flumazenil is not stocked in this app; support breathing instead."
    },
    {
      id: "diazepam",
      role: "alternative",
      note: "Oral 5–10 mg, or 5–10 mg IV slowly over 2 minutes with a bag-valve-mask ready (Kaplan). Never IM. Long acting; repeated doses accumulate, especially in liver disease and older people."
    },
    {
      id: "haloperidol",
      role: "first",
      note: "For agitation with psychosis or mania: 2–5 mg orally or IM; repeat after 30–60 min if needed; usual maximum 20 mg in 24 h (confirm local protocol). Avoid in suspected alcohol withdrawal seizures, Parkinson's disease or Lewy body dementia. Risk of acute dystonia (keep biperiden ready) and QT prolongation."
    },
    {
      id: "promethazine",
      role: "adjunct",
      note: "25–50 mg IM combined with IM haloperidol (NICE NG10). Sedating; also lowers the chance of dystonia. Avoid in delirium (anticholinergic)."
    },
    {
      id: "olanzapine",
      role: "alternative",
      note: "Oral 5–10 mg, or 10 mg IM where available. Do not give IM olanzapine within about 1 hour of an IM or IV benzodiazepine (Kaplan: combination not approved)."
    },
    {
      id: "midazolam",
      role: "alternative",
      note: "Reliable IM absorption. Used for severe agitation in emergency settings where lorazepam is unavailable; strong respiratory depressant, so give only with continuous observation and airway equipment (confirm local protocol)."
    },
    {
      id: "chlorpromazine",
      role: "avoid",
      note: "Avoid IM for rapid tranquillisation: marked postural hypotension, painful injection, lowers seizure threshold and is dangerous in delirium or intoxication."
    },
    {
      id: "biperiden",
      role: "supportive",
      note: "Treatment of acute dystonia after haloperidol: 2 mg IM or slow IV (Kaplan). Not needed routinely."
    },
    {
      id: "dextrose",
      role: "supportive",
      note: "Check glucose in every agitated patient and treat hypoglycaemia; give thiamine too if alcohol use or malnutrition is likely."
    },
    {
      id: "oxygen",
      role: "supportive",
      note: "For low saturation after sedation; position on the side and support the airway."
    },
    { id: "haloperidol-decanoate", role: "avoid", note: "Never for agitation: it takes days to work and cannot be removed. Use short-acting haloperidol lactate or a benzodiazepine." },
    { id: "clozapine", role: "avoid", note: "Do not give IM or IV benzodiazepines to a patient taking clozapine (collapse and breathing depression); ask about clozapine before sedating and use small oral doses with close observation." }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Violent patient: say calmly that violence is not acceptable, approach in a non-threatening way, reassure and offer medication, and only then prepare a trained team for restraint.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, pdf p. 2552"
    },
    {
      book: "kaplan",
      text: "Haloperidol can be repeated every 30–60 minutes until the patient is settled; a benzodiazepine can be used instead of or with it to lower the antipsychotic dose, and is preferred when the drug taken is strongly anticholinergic.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, pdf p. 2560"
    },
    {
      book: "kaplan",
      text: "Small oral or IM doses every 30–60 minutes are better than one large dose, which can over-sedate; reduce doses as behaviour settles and monitor blood pressure and vital signs.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, pdf p. 2561"
    },
    {
      book: "kaplan",
      text: "Restraint: only after non-physical approaches fail, least restrictive and dignified, by trained staff, with continuous observation and clear local rules on monitoring and ending it.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, pdf p. 2562"
    },
    {
      book: "kaplan",
      text: "IM olanzapine 10 mg is used for acute agitation in schizophrenia and bipolar disorder; giving it together with a benzodiazepine is not approved.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1934"
    },
    {
      book: "dsm",
      text: "Casebook: in a severely agitated man, safety came first (brief restraint, IM lorazepam plus haloperidol, an antihistamine ready for dystonia), while intoxication, withdrawal and delirium were being ruled out.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.1 Emotionally Disturbed, pdf p. 90"
    }
  ],
  sources: [
    {
      name: "NICE NG10. Violence and aggression: short-term management in mental health, health and community settings, 2015"
    },
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016"
    },
    {
      name: "American College of Emergency Physicians. Use of patient restraints, policy statement 2014"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "delirium",
  name: "Delirium (acute confusional state)",
  group: "psychiatric",
  aka: [
    "acute confusion",
    "acute brain failure",
    "confused patient",
    "sundowning",
    "ICU psychosis",
    "encephalopathy"
  ],
  summary: "Sudden, fluctuating confusion with poor attention, caused by a physical illness, drug or withdrawal. It is a medical emergency with high mortality. The treatment is to find and fix the cause; medicines only reduce danger or distress, and benzodiazepines usually make it worse.",
  redflags: [
    "Fever, neck stiffness or seizures: meningitis, encephalitis or cerebral malaria",
    "Low glucose, low oxygen, low BP or signs of sepsis",
    "Recent heavy drinking or sudden stopping of alcohol or sedatives",
    "Head injury, focal weakness or unequal pupils",
    "Dry hot skin, big pupils and urinary retention (anticholinergic poisoning)",
    "Quiet, withdrawn confusion in an older or post-operative patient (hypoactive delirium is easily missed)"
  ],
  steps: [
    "Recognise it: onset over hours to days, fluctuates, poor attention (cannot keep attention on months of the year backwards), disorientation, sometimes hallucinations. Ask family what the person is normally like.",
    "Check airway, breathing, circulation, glucose, temperature and oxygen saturation. Treat hypoxia, hypoglycaemia and shock at once.",
    "Search for the cause, often more than one: infection (malaria test, urine, chest, meningitis), dehydration, electrolytes, kidney or liver failure, HIV, syphilis, seizure, head injury, stroke, pain, urinary retention, constipation, and medicines (opioids, benzodiazepines, anticholinergics, steroids, antimalarials).",
    "Ask about alcohol and sedative use. If withdrawal is likely, this is the one situation where a benzodiazepine is the treatment (see Alcohol withdrawal), and give thiamine.",
    "Stop or reduce any drug that may be causing it.",
    "Non-drug care for every patient: a calm, well-lit room by day and dark at night, a family member present, glasses and hearing aids, a clock or calendar, frequent reorientation, fluids and food, early mobilisation. Avoid physical restraint and urinary catheters where possible.",
    "Medicine only if the person is very distressed or dangerous to self or others and talking has failed: low-dose haloperidol for the shortest time, usually no more than a week (NICE CG103). Start low in older people.",
    "Avoid benzodiazepines, chlorpromazine and promethazine except in alcohol or benzodiazepine withdrawal: they deepen confusion and cause falls and aspiration.",
    "Capacity is usually impaired: involve family, act in the person's best interests, and document decisions. Review daily; delirium can last days to weeks after the cause is treated."
  ],
  drugs: [
    {
      id: "haloperidol",
      role: "first",
      note: "Only for severe distress or danger: 0.5–1 mg orally or IM in older or frail adults, 1–2 mg in younger adults; may repeat after 1–2 h; keep the total low (older adults usually 5 mg/day or less). QT risk; avoid in Parkinson's disease or Lewy body dementia. Stop as soon as possible."
    },
    {
      id: "olanzapine",
      role: "alternative",
      note: "2.5–5 mg orally at night where available; more sedating, fewer dystonic reactions."
    },
    {
      id: "lorazepam",
      role: "avoid",
      note: "Worsens most delirium. Exception: alcohol or benzodiazepine withdrawal delirium, where a benzodiazepine is the treatment."
    },
    {
      id: "diazepam",
      role: "avoid",
      note: "Worsens confusion except in alcohol or benzodiazepine withdrawal, where it is the treatment."
    },
    {
      id: "chlorpromazine",
      role: "avoid",
      note: "Anticholinergic phenothiazine; worsens delirium, causes hypotension and lowers seizure threshold (Kaplan)."
    },
    {
      id: "promethazine",
      role: "avoid",
      note: "Anticholinergic; worsens confusion."
    },
    {
      id: "thiamine",
      role: "adjunct",
      note: "Give to anyone with alcohol use, malnutrition, prolonged vomiting or HIV wasting, before or with glucose."
    },
    {
      id: "dextrose",
      role: "supportive",
      note: "Treat hypoglycaemia immediately; do not delay glucose for thiamine, give both."
    },
    {
      id: "artesunate",
      role: "adjunct",
      note: "If severe malaria is the cause (positive test, or no test and endemic area with fever)."
    },
    {
      id: "ceftriaxone",
      role: "adjunct",
      note: "If meningitis or sepsis is possible; give early."
    },
    {
      id: "paracetamol",
      role: "supportive",
      note: "For pain and fever, which both drive delirium. Avoid opioids and sedatives where possible, but treat severe pain."
    },
    {
      id: "oxygen",
      role: "supportive",
      note: "If saturation is low."
    },
    { id: "quetiapine", role: "alternative", note: "Only when haloperidol is unsuitable, for example Parkinson disease or Lewy body dementia: 12.5–25 mg at night with caution. Evidence is limited; sedation, low blood pressure and falls." },
    { id: "risperidone", role: "alternative", note: "If an antipsychotic is needed and haloperidol is not available: older people 0.25–0.5 mg once or twice daily, shortest time. Avoid in Parkinson disease and Lewy body dementia." },
    { id: "trihexyphenidyl", role: "avoid", note: "Anticholinergic drugs cause and worsen delirium. Stop or taper it if the patient is taking it." },
    { id: "cyproheptadine", role: "avoid", note: "Sedating anticholinergic antihistamine: worsens confusion (Kaplan: can cause central anticholinergic syndrome with psychosis)." },
    { id: "imipramine", role: "avoid", note: "Anticholinergic; worsens confusion, especially in older people. Stop (taper if on long-term treatment) unless withdrawal is itself a concern." },
    { id: "mirtazapine", role: "avoid", note: "Sedating; stop or reduce during delirium unless it was long-term and stopping causes withdrawal. Not a treatment for agitation." }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "The main goal is to find and treat the cause, and to give physical, sensory and environmental support: a familiar person, a clock or calendar, and regular reorientation.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 3.1 Delirium, pdf p. 741"
    },
    {
      book: "kaplan",
      text: "Haloperidol is the usual drug for psychosis or agitation in delirium (2–5 mg IM in adults, less in the frail), but it can prolong the QT interval; phenothiazines should be avoided because they are anticholinergic.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 3.1 Delirium, pdf p. 742"
    },
    {
      book: "kaplan",
      text: "There is no conclusive evidence for benzodiazepines in delirium not related to alcohol, and they can worsen confusion.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 3.1 Delirium, pdf p. 746"
    },
    {
      book: "kaplan",
      text: "Lorazepam is best reserved for delirium from alcohol or benzodiazepine withdrawal and can worsen other types; typical haloperidol dose in older patients is 0.5–1 mg twice daily.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 3.1 Delirium, Table 3-9, pdf p. 750"
    },
    {
      book: "kaplan",
      text: "Common causes include infection (sepsis, malaria, syphilis), low or high glucose, electrolyte and fluid disturbance, seizures, head injury, stroke, heat stroke and medicines.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 3.1 Delirium, Table 3-13, pdf p. 755"
    },
    {
      book: "dsm",
      text: "Casebook: quiet (hypoactive) delirium is often missed or mistaken for depression; the diagnosis requires a physical cause, which is often multiple.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 17 Neurocognitive Disorders, case 17.1 Dysphoria, pdf p. 410"
    },
    {
      book: "dsm",
      text: "Casebook: always consider alcohol withdrawal, because it is treated with benzodiazepines, which are otherwise generally avoided in delirium after surgery and in older people.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 17 Neurocognitive Disorders, case 17.1 Dysphoria, pdf p. 411"
    }
  ],
  sources: [
    {
      name: "NICE CG103. Delirium: prevention, diagnosis and management, 2010 (updated 2023)"
    },
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016"
    },
    {
      name: "American Psychiatric Association. DSM-5-TR, 2022"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "alcohol-withdrawal",
  name: "Alcohol withdrawal, withdrawal seizures and delirium tremens",
  group: "psychiatric",
  aka: [
    "DTs",
    "delirium tremens",
    "rum fits",
    "alcohol withdrawal syndrome",
    "shakes",
    "alcoholic hallucinosis",
    "detoxification"
  ],
  summary: "After stopping or cutting down heavy drinking, tremor, sweating, anxiety and vomiting start within hours; seizures peak at 12–48 hours and delirium tremens at 2–4 days. Delirium tremens kills. Give a benzodiazepine early and in enough dose, thiamine before glucose, and treat dehydration and the illness that brought the patient in.",
  redflags: [
    "Confusion, disorientation or hallucinations with sweating, fast pulse and fever: delirium tremens",
    "Seizure, especially more than one, or a seizure after confusion began (look for head injury)",
    "Previous delirium tremens or withdrawal seizures",
    "Ataxia, confusion or abnormal eye movements: Wernicke encephalopathy",
    "Infection, GI bleeding, pancreatitis, liver failure or head injury",
    "Over-sedation: respiratory rate under 10, cannot be woken"
  ],
  steps: [
    "Ask when the last drink was, how much is usually drunk, and about previous withdrawal seizures or delirium tremens. Admitted patients may start withdrawal on day 2–3 of an unrelated stay.",
    "Examine for the cause of admission and complications: infection, head injury, GI bleeding, liver disease, dehydration. Check glucose, and electrolytes and magnesium if possible.",
    "Give thiamine to every patient: IM or IV if malnourished, vomiting, confused or unwell (see Wernicke encephalopathy). Give it before glucose where possible, but never delay treatment of hypoglycaemia; give both.",
    "Score severity with CIWA-Ar every 1–2 hours while symptoms are active, if the patient can communicate. Without a score, use tremor, sweating, pulse, agitation and hallucinations.",
    "Benzodiazepine: oral diazepam 10–20 mg every 1–2 hours while withdrawal signs persist (CIWA-Ar 10 or more), until settled or lightly sedated (mhGAP inpatient approach). Then give the total needed in the first 24 h divided into doses and reduce by about 20% a day over 4–7 days (Kaplan). Omit a dose if drowsy.",
    "Mild withdrawal in an outpatient with family support: up to diazepam 10 mg four times daily, reducing over 3–7 days, with daily review and no alcohol (mhGAP). Supply small amounts.",
    "In liver failure, older age or respiratory disease use lorazepam, which does not accumulate; do not miss lorazepam doses.",
    "Delirium tremens: nurse in a quiet, lit room with a family member; slow IV diazepam 10 mg repeated every 10–15 minutes until calm but rousable, with a bag-valve-mask ready (confirm local protocol). Large totals may be needed. Treat fever and dehydration; look for infection. Avoid physical restraint where possible: patients fight to exhaustion.",
    "Withdrawal seizures: benzodiazepine (diazepam IV or rectal, or midazolam IM). Phenytoin does not prevent alcohol withdrawal seizures. A first seizure, focal signs or a seizure after delirium needs a search for head injury, meningitis or hypoglycaemia.",
    "Hallucinations or severe agitation despite adequate benzodiazepine: add low-dose haloperidol cautiously, because antipsychotics lower the seizure threshold.",
    "Fluids: oral if possible; IV Ringer's lactate for dehydration. Replace potassium and magnesium if low.",
    "Before discharge: brief intervention, family involvement, screen for depression and suicide risk, and link to follow-up."
  ],
  drugs: [
    {
      id: "diazepam",
      role: "first",
      note: "Oral 10–20 mg every 1–2 h until settled (inpatient), then taper about 20% a day; outpatient up to 10 mg four times daily, reducing over 3–7 days (mhGAP). Delirium tremens or unable to swallow: 10 mg IV slowly, repeat every 10–15 min with airway support. Never IM."
    },
    {
      id: "lorazepam",
      role: "alternative",
      note: "Preferred in liver failure, older age or lung disease: 1–4 mg orally, IM or IV every 1–2 h while symptomatic (confirm local protocol). Short acting: do not miss doses."
    },
    {
      id: "thiamine",
      role: "first",
      note: "Every patient. High risk (malnourished, vomiting, confused, liver disease, hospital admission) needs parenteral thiamine; suspected Wernicke needs treatment doses. Give before or with glucose."
    },
    {
      id: "phenobarbital",
      role: "alternative",
      note: "For withdrawal not controlled by large benzodiazepine doses, only where breathing can be supported (bag-valve-mask, ideally ventilation). Adds to respiratory depression. Specialist or local protocol."
    },
    {
      id: "carbamazepine",
      role: "alternative",
      note: "Mild–moderate withdrawal where benzodiazepines are unsuitable: about 800 mg/day, as effective as benzodiazepines (Kaplan), reduced over 5–7 days. Does not treat delirium tremens."
    },
    {
      id: "haloperidol",
      role: "adjunct",
      note: "Only for hallucinations or agitation that persist despite adequate benzodiazepine: 2–5 mg orally or IM. Lowers the seizure threshold; never instead of the benzodiazepine."
    },
    {
      id: "midazolam",
      role: "alternative",
      note: "For a withdrawal seizure with no IV access: 10 mg IM (adult)."
    },
    {
      id: "chlorpromazine",
      role: "avoid",
      note: "Lowers the seizure threshold and causes hypotension; do not use for withdrawal agitation."
    },
    {
      id: "dextrose",
      role: "supportive",
      note: "Treat hypoglycaemia at once and give thiamine with it."
    },
    {
      id: "ringers-lactate",
      role: "supportive",
      note: "For dehydration from sweating, fever and vomiting."
    },
    {
      id: "magnesium-sulfate",
      role: "supportive",
      note: "Magnesium is often low in heavy drinkers. Replace if low, or in refractory seizures or arrhythmia; where levels cannot be measured, confirm local protocol."
    },
    {
      id: "potassium-chloride",
      role: "supportive",
      note: "Replace if low (vomiting, poor intake); check kidney function and urine output first."
    },
    {
      id: "paracetamol",
      role: "supportive",
      note: "For fever and pain; maximum 2 g/day in chronic heavy drinking or liver disease."
    },
    { id: "chlordiazepoxide", role: "alternative", note: "Oral only: 25 mg 3–4 times daily on day 1, then reduce total by 20% a day (Kaplan), or 25–50 mg when CIWA-Ar is 10 or more. Long acting: hold if drowsy; avoid fixed schedules in liver disease." },
    { id: "propranolol", role: "avoid", note: "Not a treatment for withdrawal: does not prevent seizures or delirium and hides tremor and fast pulse used for scoring (Kaplan). Adjunct only on specialist advice once benzodiazepine dosing is adequate." },
    { id: "naltrexone", role: "supportive", note: "After withdrawal is complete, for relapse prevention: 25 mg then 50 mg daily for 3–12 months with psychosocial support (mhGAP). Not if liver failure, acute hepatitis or recent opioid use." }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Usual timeline: tremor at 6–8 h, perceptual disturbances at 8–12 h, seizures at 12–24 h and delirium tremens within 72 h, although stages can be skipped.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, Table 4-5, pdf p. 891"
    },
    {
      book: "kaplan",
      text: "Withdrawal seizures are generalized and may cluster; still look for head injury, CNS infection, hypoglycaemia, hyponatraemia and hypomagnesaemia. Untreated delirium tremens has about 20% mortality, usually from coexisting illness.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 892"
    },
    {
      book: "kaplan",
      text: "Benzodiazepines are the treatment of choice for withdrawal seizures and anticonvulsants add no clear benefit. Give enough on day 1, then taper over about 5 days; do not give diazepam IM because absorption is erratic.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 908"
    },
    {
      book: "kaplan",
      text: "With a long-acting benzodiazepine, omit the next dose if the patient is sleepy; with short-acting lorazepam, do not miss doses.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 909"
    },
    {
      book: "kaplan",
      text: "Delirium tremens: same approach with higher doses, fluids for dehydration and nutrition with vitamins. Restraint is risky because patients fight to exhaustion; antipsychotics are adjuncts only because they lower the seizure threshold.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 910"
    },
    {
      book: "kaplan",
      text: "Emergency table for withdrawal: maintain fluids and electrolytes, sedate with benzodiazepines, monitor vital signs, give thiamine 100 mg IM.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, Table 25-12, pdf p. 2567"
    },
    {
      book: "dsm",
      text: "Casebook: symptoms start 4–12 h after the last drink and peak at 24–48 h; seizures affect about 3%, mostly 7–48 h; a seizure that comes after delirium should prompt a search for another cause such as subdural haematoma.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 16 Substance-Related and Addictive Disorders, case 16.2 Alcohol Withdrawal, pdf p. 385"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016"
    },
    {
      name: "NICE CG100. Alcohol-use disorders: diagnosis and management of physical complications, 2010 (updated 2017)"
    },
    {
      name: "Sullivan JT et al. CIWA-Ar. Br J Addict 1989;84:1353–7"
    },
    {
      name: "American Psychiatric Association. DSM-5-TR, 2022"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "wernicke-encephalopathy",
  name: "Wernicke encephalopathy",
  group: "psychiatric",
  aka: [
    "thiamine deficiency",
    "Wernicke-Korsakoff syndrome",
    "Korsakoff",
    "vitamin B1 deficiency",
    "alcoholic encephalopathy"
  ],
  summary: "Acute thiamine deficiency causing confusion, unsteady gait and abnormal eye movements; the full triad is often absent. It is reversible if treated early with high-dose parenteral thiamine and leads to permanent memory loss (Korsakoff syndrome) or death if missed. Treat on suspicion.",
  redflags: [
    "Any of: confusion, ataxia or unsteadiness, nystagmus or eye-movement palsy, in a drinker or malnourished person",
    "Hypothermia, low BP or reduced consciousness in a heavy drinker",
    "Prolonged vomiting, including hyperemesis gravidarum, or starvation, HIV wasting or refeeding",
    "Confusion that started or worsened after IV glucose",
    "Memory loss with confabulation (Korsakoff syndrome)"
  ],
  steps: [
    "Suspect it in anyone with alcohol dependence, malnutrition or prolonged vomiting who has any one of confusion, ataxia or eye signs. Do not wait for all three.",
    "Give parenteral thiamine immediately, before any glucose infusion where possible. If glucose is low, give glucose and thiamine together: never leave hypoglycaemia untreated.",
    "Treatment dose: thiamine 100–500 mg IV or IM two to three times daily for 3–5 days (mhGAP). Many guidelines use 500 mg IV three times daily for 3 days, then 250 mg daily for 3–5 days; confirm local protocol and stock. Dilute IV doses in 50–100 mL saline over 30 minutes; keep adrenaline available for the rare allergic reaction.",
    "Then oral thiamine 100 mg two to three times daily with a multivitamin while drinking or malnutrition continues.",
    "Correct magnesium if low; thiamine may not work while magnesium is depleted.",
    "Look for and treat alcohol withdrawal, infection, hypoglycaemia, head injury and liver failure.",
    "Keep the patient safe from falls; assess swallowing before food.",
    "If there is no response to thiamine, consider pellagra (niacin deficiency) or another cause of encephalopathy.",
    "Prevention: give thiamine to every at-risk patient on admission, and add it to glucose-containing drips."
  ],
  drugs: [
    {
      id: "thiamine",
      role: "first",
      note: "Suspected Wernicke: 100–500 mg IV or IM two to three times daily for 3–5 days (mhGAP); confirm local protocol. Prevention: 100 mg orally daily, or parenterally if high risk. Always before or with glucose."
    },
    {
      id: "magnesium-sulfate",
      role: "adjunct",
      note: "Replace magnesium if low; Kaplan's emergency table pairs thiamine with magnesium sulfate before glucose loading."
    },
    {
      id: "dextrose",
      role: "supportive",
      note: "Treat hypoglycaemia immediately, with thiamine given at the same time. Add thiamine to glucose drips in at-risk patients."
    },
    {
      id: "diazepam",
      role: "adjunct",
      note: "If alcohol withdrawal is also present (see Alcohol withdrawal)."
    }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Wernicke encephalopathy (gait ataxia, confusion, nystagmus and gaze palsies) is reversible with treatment; only about 20% with Korsakoff syndrome recover. The cause is thiamine deficiency.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 895"
    },
    {
      book: "kaplan",
      text: "Early Wernicke encephalopathy responds rapidly to large parenteral thiamine doses; add 100 mg thiamine to each litre of glucose fluid in alcohol-dependent patients. The oral dose the book then gives (100 mg two to three times daily) is lower than current parenteral treatment guidance.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 915"
    },
    {
      book: "kaplan",
      text: "Glucose rapidly uses up remaining thiamine, so give thiamine to alcohol-dependent patients before a glucose infusion; untreated, it progresses to Korsakoff syndrome or death.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.1 Consultation-Liaison Psychiatry, pdf p. 2522"
    },
    {
      book: "kaplan",
      text: "Emergency table: thiamine 100 mg IV or IM, with magnesium sulfate, given before glucose loading.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, Table 25-12, pdf p. 2567"
    },
    {
      book: "kaplan",
      text: "Thiamine deficiency also follows starvation, gastric cancer, dialysis, hyperemesis gravidarum and prolonged IV feeding, not only alcohol.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 3.3 Neurocognitive Disorder Due to Another Medical Condition (Korsakoff syndrome), pdf p. 799"
    },
    {
      book: "kaplan",
      text: "If apparent Wernicke–Korsakoff syndrome does not respond to thiamine, consider alcoholic pellagra (niacin deficiency).",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 919"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016"
    },
    {
      name: "NICE CG100. Alcohol-use disorders: diagnosis and management of physical complications, 2010 (updated 2017)"
    },
    {
      name: "Galvin R et al. EFNS guidelines for Wernicke encephalopathy. Eur J Neurol 2010"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "acute-psychosis",
  name: "Acute psychosis (first episode)",
  group: "psychiatric",
  aka: [
    "first episode psychosis",
    "schizophrenia",
    "brief psychotic disorder",
    "hearing voices",
    "paranoia",
    "madness",
    "acute psychotic episode"
  ],
  summary: "New hallucinations, delusions or disorganised behaviour. First rule out delirium, drugs and physical illness, which in Ethiopia include malaria, HIV, syphilis, epilepsy and khat or alcohol use. Then start a low-dose antipsychotic, involve the family, and follow up closely.",
  redflags: [
    "Fluctuating alertness, disorientation or poor attention: this is delirium until proved otherwise",
    "Fever, headache, neck stiffness, seizures or focal signs",
    "Visual, tactile or smell hallucinations, or older age at first onset",
    "Recent childbirth (see Postpartum psychosis)",
    "Suicidal thoughts, command hallucinations to harm, or threats to others",
    "Not eating or drinking, or rigidity and mutism (catatonia)"
  ],
  steps: [
    "Make it safe and calm; manage agitation as in Acute agitation.",
    "Check for delirium (attention, orientation, fluctuation) and do a physical examination with glucose, temperature, BP and a neurological check.",
    "Test or look for medical causes where available: malaria test if fever, HIV test, syphilis serology, pregnancy test, and signs of head injury, epilepsy (including after seizures), thyroid disease, anaemia and infection.",
    "Ask about substances and medicines: khat, alcohol (intoxication or withdrawal), cannabis, stimulants, steroids, efavirenz, isoniazid, mefloquine or chloroquine. Substance-induced psychosis usually settles within days of stopping.",
    "Ask about mood: grandiosity and no sleep suggests mania; guilt and hopelessness suggests psychotic depression. Assess suicide risk and risk to others.",
    "Respect cultural and religious explanations. Beliefs shared by the person's community are not delusions. Work with families and religious or traditional healers, but never accept chaining or confinement.",
    "Start a single antipsychotic at a low dose and increase slowly over 1–2 weeks if needed (mhGAP). Expect some benefit within 1–2 weeks; full effect takes 4–6 weeks.",
    "Do not give anticholinergics routinely; treat dystonia or parkinsonism if they occur.",
    "Short-term benzodiazepine for severe agitation or insomnia in the first days only.",
    "Explain the illness and the medicine to the patient and family: side effects, not stopping suddenly, avoiding alcohol and khat, and warning signs of relapse.",
    "Admission is needed for serious risk to self or others, inability to care for self, or a medical cause. If the person lacks capacity and refuses, follow hospital policy and national law; use the least restrictive option and document.",
    "Follow up within 1–2 weeks, then monthly. Continue treatment for many months after recovery; decide duration with a specialist (commonly at least 12 months after a first episode). Depot fluphenazine is for later maintenance when adherence is poor, not for the first days."
  ],
  drugs: [
    {
      id: "haloperidol",
      role: "first",
      note: "Start 1.5–3 mg daily orally, increase gradually; usual range 5–10 mg/day (mhGAP range up to 20 mg). Watch for dystonia and parkinsonism."
    },
    {
      id: "olanzapine",
      role: "alternative",
      note: "5–10 mg at night where available; fewer movement effects but weight gain, diabetes and sedation."
    },
    {
      id: "chlorpromazine",
      role: "alternative",
      note: "Start 25–50 mg at night, increase gradually (usual 75–300 mg/day, up to 1 g in hospital). Sedating; postural hypotension, sun sensitivity, lowers seizure threshold. Avoid in epilepsy and older people."
    },
    {
      id: "lorazepam",
      role: "adjunct",
      note: "Short term for severe agitation or insomnia: 1–2 mg orally or IM as needed (Kaplan). Stop within days."
    },
    {
      id: "diazepam",
      role: "adjunct",
      note: "Short-term oral alternative for agitation or insomnia: 5–10 mg. Never IM."
    },
    {
      id: "biperiden",
      role: "supportive",
      note: "Only if dystonia or parkinsonism occurs; do not give routinely (mhGAP)."
    },
    {
      id: "fluphenazine-decanoate",
      role: "alternative",
      note: "Later maintenance when oral adherence fails and the person has tolerated oral antipsychotics; give a small test dose first. Not for a first acute episode in someone never treated."
    },
    {
      id: "artesunate",
      role: "adjunct",
      note: "If fever and positive malaria test: psychosis may be cerebral malaria (and some antimalarials such as mefloquine can cause psychosis)."
    },
    {
      id: "ceftriaxone",
      role: "adjunct",
      note: "If meningitis or encephalitis is possible."
    },
    {
      id: "thiamine",
      role: "adjunct",
      note: "If alcohol use or malnutrition."
    },
    { id: "risperidone", role: "alternative", note: "Start 1 mg daily, increase to 2–4 mg daily (mhGAP range 2–6 mg). Fewer movement effects than haloperidol at low doses; raises prolactin." },
    { id: "quetiapine", role: "alternative", note: "25 mg twice daily, built up over days to 300–400 mg a day. Sedating with very few movement effects; watch dizziness on standing." },
    { id: "aripiprazole", role: "alternative", note: "5–10 mg once daily, up to 15–30 mg. Least weight gain and prolactin rise; restlessness and insomnia are common." },
    { id: "clozapine", role: "avoid", note: "Not for a first episode. Only for schizophrenia resistant to two adequate antipsychotic trials, started by a specialist where regular blood counts are possible." },
    { id: "haloperidol-decanoate", role: "alternative", note: "Later maintenance when oral adherence fails, after oral haloperidol has been tolerated: 25 mg deep IM first, with oral cover. Not for the acute episode." },
    { id: "trihexyphenidyl", role: "supportive", note: "Only if parkinsonism occurs: 1 mg daily increasing slowly. Do not give routinely with the antipsychotic (mhGAP); it is misused." },
    { id: "bromocriptine", role: "avoid", note: "Dopamine agonist: can trigger or worsen hallucinations, delusions and mania (Kaplan). Stop or avoid in active psychosis unless treating NMS." },
    { id: "methylphenidate", role: "avoid", note: "Stop: stimulants can cause or worsen psychosis, especially at high doses or with misuse (Kaplan). Restart only after specialist review." }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Actively look for a medical cause when symptoms are unusual or consciousness varies, even in someone already diagnosed with a psychotic illness.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 5 Schizophrenia Spectrum and Other Psychotic Disorders, pdf p. 1125"
    },
    {
      book: "kaplan",
      text: "Medical causes of psychosis include HIV, syphilis, malaria, encephalitis, epilepsy, head injury, metabolic and endocrine disease, vitamin deficiencies, steroids and other medicines, alcohol, cannabis and stimulants.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 5 Schizophrenia Spectrum and Other Psychotic Disorders, Table 5-8, pdf p. 1126"
    },
    {
      book: "kaplan",
      text: "Features pointing to a medical cause: acute onset, first episode, older age, physical illness or injury, substance use, non-auditory hallucinations, neurological signs, reduced alertness or disorientation.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, Table 25-8, pdf p. 2554"
    },
    {
      book: "kaplan",
      text: "Start second-generation antipsychotics at low doses and increase gradually; lorazepam 1–2 mg orally or IM can be used as needed for agitation in the first weeks.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1948"
    },
    {
      book: "kaplan",
      text: "Brief psychotic disorder after stress: admission is often needed and a low-dose antipsychotic may be necessary, but it often resolves on its own.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, Table 25-12, pdf p. 2569"
    },
    {
      book: "dsm",
      text: "Casebook: the differential for new psychosis includes an independent psychotic disorder, mood disorder with psychosis, substance-induced psychosis, medical causes, trauma and beliefs shared by the person's religious or cultural group.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 2 Schizophrenia Spectrum and Other Psychotic Disorders, case 2.3 Hallucinations of a Spiritual Nature, pdf p. 64"
    },
    {
      book: "dsm",
      text: "Casebook: substance-induced psychosis usually clears within days; psychosis lasting beyond a month after exposure suggests an independent disorder.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 2 Schizophrenia Spectrum and Other Psychotic Disorders, case 2.6 Psychosis and Cannabis, pdf p. 77"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016"
    },
    {
      name: "American Psychiatric Association. DSM-5-TR, 2022"
    },
    {
      name: "WHO QualityRights guidance; WHO Mental Health Action Plan 2013–2030"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "acute-mania",
  name: "Acute mania",
  group: "psychiatric",
  aka: [
    "bipolar disorder",
    "manic episode",
    "manic depression",
    "hypomania",
    "elated mood"
  ],
  summary: "Days of elated or irritable mood, overactivity, little sleep, rapid speech, grandiosity and risky behaviour, sometimes with psychosis. Rule out substances and physical causes, stop antidepressants, protect sleep, hydration and dignity, and start an antipsychotic or mood stabiliser.",
  redflags: [
    "Violence, sexual or financial risk-taking, or exhaustion and dehydration",
    "Confusion or fever: delirium, encephalitis or NMS rather than mania",
    "Recent antidepressant, steroid, efavirenz, khat or stimulant use",
    "Pregnancy or recent childbirth",
    "Suicidal thoughts (mixed states carry high risk)"
  ],
  steps: [
    "Keep safe and calm; manage agitation as in Acute agitation. Reduce stimulation.",
    "Examine and check glucose, temperature, hydration and pregnancy status. Look for thyroid disease, head injury, HIV, neurosyphilis, epilepsy and drugs (khat, amphetamines, steroids, efavirenz).",
    "Stop antidepressants (amitriptyline, fluoxetine) and do not start them during mania.",
    "Start an antipsychotic (haloperidol or olanzapine) for rapid control. Add a short course of benzodiazepine for sleep and agitation.",
    "Mood stabiliser: lithium only where blood levels, kidney and thyroid tests can be done reliably (mhGAP); otherwise valproate or carbamazepine. Avoid valproate in women and girls who could become pregnant unless no alternative and effective contraception is in place.",
    "Assess capacity: many people with mania lack insight. If admission or treatment is needed against their wishes to prevent serious harm, follow hospital policy and national law and document.",
    "Protect finances, relationships and reputation where possible with family help.",
    "Once settled: psychoeducation, early warning signs, sleep routine, avoiding alcohol and khat, and a maintenance plan with follow-up. Watch for the depression that often follows."
  ],
  drugs: [
    {
      id: "haloperidol",
      role: "first",
      note: "2–5 mg orally or IM, increase as needed (usual 5–15 mg/day). Watch for dystonia and parkinsonism."
    },
    {
      id: "olanzapine",
      role: "first",
      note: "10–15 mg daily where available; effective alone. Weight gain and sedation."
    },
    {
      id: "lithium",
      role: "alternative",
      note: "Only with reliable level monitoring (target 0.6–1.0 mmol/L acute; levels 12 h after dose) plus kidney and thyroid tests. Slow onset. Avoid in first trimester, kidney disease, and with NSAIDs or dehydration."
    },
    {
      id: "sodium-valproate",
      role: "alternative",
      note: "Start 500 mg/day, increase to 1–2 g/day; Kaplan describes loading 15–20 mg/kg. Avoid in women of childbearing potential (birth defects) and liver disease."
    },
    {
      id: "carbamazepine",
      role: "alternative",
      note: "600–1,800 mg/day (Kaplan), increase slowly. Many interactions: reduces hormonal contraception, efavirenz, other antiretrovirals and antipsychotic levels. Rash; avoid in pregnancy where possible."
    },
    {
      id: "lorazepam",
      role: "adjunct",
      note: "Short-term for agitation and sleep: 1–2 mg orally or IM."
    },
    {
      id: "diazepam",
      role: "adjunct",
      note: "Short-term oral alternative for sleep and agitation."
    },
    {
      id: "chlorpromazine",
      role: "alternative",
      note: "Sedating option where others are unavailable; watch BP."
    },
    {
      id: "amitriptyline",
      role: "avoid",
      note: "Can trigger or worsen mania (highest risk among antidepressants); stop."
    },
    {
      id: "fluoxetine",
      role: "avoid",
      note: "Do not use alone in bipolar disorder; stop during mania."
    },
    {
      id: "biperiden",
      role: "supportive",
      note: "For dystonia or parkinsonism from haloperidol."
    },
    { id: "risperidone", role: "first", note: "2 mg once daily, adjust by 1 mg to 1–6 mg daily, alone or with lithium or valproate. Watch for dystonia and prolactin effects." },
    { id: "quetiapine", role: "alternative", note: "Built up from 100 mg on day 1 to 400 mg on day 4 in two doses, then up to 800 mg a day. Sedating; check lying and standing blood pressure." },
    { id: "aripiprazole", role: "alternative", note: "15 mg once daily (maximum 30 mg), alone or with lithium or valproate. Little sedation, so a short benzodiazepine course may be needed for agitation." },
    { id: "lamotrigine", role: "avoid", note: "Not effective as acute mania treatment (Kaplan) and needs weeks of titration. Keep it for bipolar maintenance and depression once mania is controlled." },
    { id: "sertraline", role: "avoid", note: "Stop any antidepressant during mania; do not restart alone in bipolar disorder." },
    { id: "escitalopram", role: "avoid", note: "Stop during mania; never as monotherapy in bipolar disorder." },
    { id: "imipramine", role: "avoid", note: "Tricyclics carry a higher risk than SSRIs of triggering mania or rapid cycling (Kaplan); stop." },
    { id: "mirtazapine", role: "avoid", note: "Can trigger mania like other antidepressants; stop." },
    { id: "methylphenidate", role: "avoid", note: "Stimulants can worsen mania; stop during an episode and review the diagnosis." }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "People with mania often lack insight and refuse treatment; medication is needed when poor judgement, impulsivity and aggression put them or others at risk. Lithium acts slowly, so antipsychotics, anticonvulsants or benzodiazepines are often added early.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 6 Bipolar Disorders, pdf p. 1199"
    },
    {
      book: "kaplan",
      text: "Valproate is widely used for acute mania, and rapid oral loading of 15–20 mg/kg is well tolerated; carbamazepine 600–1,800 mg/day is a long-established alternative.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 6 Bipolar Disorders, pdf p. 1200"
    },
    {
      book: "kaplan",
      text: "Antidepressants can trigger mania, with the highest risk from tricyclics; they should not be used alone in bipolar disorder.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 6 Bipolar Disorders, pdf p. 1201"
    },
    {
      book: "kaplan",
      text: "Emergency approach to mania: admission, restraint only if necessary, rapid tranquillisation with antipsychotics.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, Table 25-12, pdf p. 2575"
    },
    {
      book: "kaplan",
      text: "Avoid lithium in the first trimester; monitor levels closely around delivery; it passes into breast milk.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2062"
    },
    {
      book: "dsm",
      text: "Casebook: grandiosity, little need for sleep, pressured speech, racing thoughts, distractibility, agitation and disinhibition amounted to a manic episode with psychosis, not schizophrenia; misdiagnosis means missing a mood stabiliser.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.1 Emotionally Disturbed, pdf p. 91"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016"
    },
    {
      name: "American Psychiatric Association. DSM-5-TR, 2022"
    },
    {
      name: "Yatham LN et al. CANMAT/ISBD guidelines for bipolar disorder, 2018"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "depression-suicide-risk",
  name: "Severe depression with suicide risk",
  group: "psychiatric",
  aka: [
    "suicidal ideation",
    "suicide attempt",
    "self-harm",
    "major depression",
    "wants to die",
    "hopelessness"
  ],
  summary: "Depression with thoughts of death or self-harm. Ask directly; asking does not increase risk. Keep the person safe, remove the means (pesticides, rope, stored medicines), involve family, and treat the depression with a medicine that is safe in overdose.",
  redflags: [
    "A plan, preparations, or access to means (pesticides, weapons, stored tablets)",
    "A previous attempt, especially a violent or medically serious one",
    "Hopelessness, psychotic depression or command hallucinations",
    "Alcohol or drug use, chronic painful illness, HIV, recent loss, shame or isolation",
    "Sudden calm after a period of suicidal talk",
    "Poisoning already taken: treat medically first (see Organophosphate poisoning, Tricyclic overdose)"
  ],
  steps: [
    "Treat any self-harm or poisoning medically first.",
    "Ask directly and privately: 'Do you feel life is not worth living?' 'Have you thought of ending your life?' 'Do you have a plan?' 'What stops you?' Asking does not put the idea in their head.",
    "Imminent risk (plan, intent, means, or recent serious attempt): do not leave the person alone; remove means from them and the room; admit or observe in a safe place; involve family.",
    "Means restriction: ask family to lock away or remove pesticides, rope, weapons and medicines. Prescribe small supplies (no more than 1 week) and ask a family member to hold medicines.",
    "Make a written safety plan with the person: warning signs, own coping steps, people and places for distraction, who to call (family, health worker, facility phone), and how the home will be made safer.",
    "Look for causes and complications: alcohol use, physical illness (thyroid, anaemia, HIV), medicines, psychotic features, bipolar history, recent childbirth.",
    "Antidepressant: fluoxetine first, as it is much safer in overdose. Avoid amitriptyline in anyone at suicide risk. Warn that benefit takes 2–4 weeks and risk may rise as energy returns, so review weekly at first.",
    "Psychological support: problem-solving, behavioural activation, and addressing social problems. Refer for psychotherapy where available.",
    "Psychotic depression: add an antipsychotic; refer, as ECT may be needed. Bipolar depression: do not give an antidepressant alone.",
    "Adolescents: psychological treatment first; if medicine is needed, fluoxetine only, with specialist involvement and close monitoring.",
    "Confidentiality may be broken to protect life; tell the person what will be shared and why. If they lack capacity and are at serious risk, follow hospital policy and national law and document.",
    "Follow up within days of discharge, when risk is highest, and keep regular contact."
  ],
  drugs: [
    {
      id: "fluoxetine",
      role: "first",
      note: "Start 10–20 mg daily; if there is no response after several weeks, increase to 40 mg (confirm mhGAP dosing and local protocol). Safer in overdose. Early restlessness or agitation needs review. Can trigger mania in bipolar disorder."
    },
    {
      id: "amitriptyline",
      role: "avoid",
      note: "Dangerous in overdose (arrhythmias, seizures, coma; fatal with a few days' supply). Avoid in suicide risk. If truly the only option: no more than 1 week supply, held by family (Kaplan)."
    },
    {
      id: "lorazepam",
      role: "adjunct",
      note: "Very short term for severe anxiety or insomnia while starting treatment; small supplies only. Disinhibition and overdose risk with alcohol."
    },
    {
      id: "diazepam",
      role: "adjunct",
      note: "Short-term oral alternative; small supplies, not with alcohol."
    },
    {
      id: "haloperidol",
      role: "adjunct",
      note: "For psychotic depression, combined with the antidepressant; low dose."
    },
    {
      id: "olanzapine",
      role: "adjunct",
      note: "Alternative antipsychotic for psychotic depression."
    },
    {
      id: "lithium",
      role: "alternative",
      note: "Specialist only; reduces suicide in mood disorders but is dangerous in overdose, so needs level monitoring and controlled supply."
    },
    {
      id: "paracetamol",
      role: "avoid",
      note: "Not for treatment of depression; do not dispense large quantities to a person at risk (common overdose)."
    },
    { id: "quetiapine", role: "adjunct", note: "Specialist add-on for severe or psychotic depression not responding to an antidepressant, commonly 150–300 mg at night. Dangerous in overdose (sedation, QT): small supplies." },
    { id: "aripiprazole", role: "adjunct", note: "Specialist add-on to an antidepressant: start 2–5 mg daily (range 2–15 mg); lower doses if on fluoxetine. Akathisia can increase suicidal impulses: ask about restlessness." },
    { id: "sertraline", role: "first", note: "Start 25–50 mg daily after food, increase by 50 mg steps every 1–2 weeks if needed (maximum 200 mg). Safe in overdose; preferred in pregnancy, breastfeeding and heart disease. Small supplies and review within 1 week." },
    { id: "escitalopram", role: "alternative", note: "10 mg daily (5 mg in older people or liver disease; usual maximum 20 mg, 10 mg over 65). Avoid with haloperidol, quinine, amiodarone or methadone (QT)." },
    { id: "mirtazapine", role: "alternative", note: "15 mg at night, up to 45 mg; helpful when insomnia, anxiety or weight loss are prominent. Sedating; safer than tricyclics in overdose." },
    { id: "imipramine", role: "avoid", note: "Tricyclic: can be fatal in overdose, like amitriptyline. Use an SSRI; if truly the only option, no more than 1 week supply held by family." }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Ask every depressed patient directly about suicide. A plan is a particularly dangerous sign, and sudden calm in a previously suicidal person can be ominous.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, pdf p. 2555"
    },
    {
      book: "kaplan",
      text: "Asking about suicide does not make suicidal behaviour more likely.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.2 Geriatric Psychiatry, pdf p. 2541"
    },
    {
      book: "kaplan",
      text: "Tricyclic overdose is severe and often fatal: for patients at risk of suicide, prescribe no more than 1 week at a time without refills; newer antidepressants are safer in overdose.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, pdf p. 2033"
    },
    {
      book: "kaplan",
      text: "About two-thirds of depressed patients think about suicide; risk can rise as they begin to improve and regain energy.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 7 Depressive Disorders, pdf p. 1218"
    },
    {
      book: "kaplan",
      text: "WHO suicide-prevention principles begin with reducing access to means such as pesticides and firearms, and treating mental disorders.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 31 Global and Cultural Issues in Psychiatry, pdf p. 2770"
    },
    {
      book: "dsm",
      text: "Casebook: everyone with depressive symptoms, including after childbirth, needs a suicide assessment, including thoughts that the family or children would be better off dead.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 4 Depressive Disorders, case 4.2 Postpartum Sadness, pdf p. 134"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016"
    },
    {
      name: "WHO. Preventing suicide: a global imperative, 2014; LIVE LIFE implementation guide, 2021"
    },
    {
      name: "Stanley B, Brown GK. Safety planning intervention. Cogn Behav Pract 2012"
    },
    {
      name: "American Psychiatric Association. DSM-5-TR, 2022"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "neuroleptic-malignant-syndrome",
  name: "Neuroleptic malignant syndrome (NMS)",
  group: "psychiatric",
  aka: [
    "NMS",
    "antipsychotic reaction",
    "malignant hyperthermia antipsychotic",
    "rigid and febrile on haloperidol"
  ],
  summary: "A rare, life-threatening reaction to antipsychotics (and other dopamine blockers such as metoclopramide): muscle rigidity, high fever, confusion and unstable pulse and BP, developing over 1–3 days. Stop all antipsychotics, cool, give fluids, and treat infection if it cannot be excluded. Diagnose clinically when CK cannot be measured.",
  redflags: [
    "Rigidity ('lead pipe') with fever after starting or increasing an antipsychotic, a depot injection, or several IM doses",
    "Confusion, mutism or reduced consciousness",
    "Fast pulse, labile or high BP, heavy sweating",
    "Dark urine or falling urine output (rhabdomyolysis, kidney failure)",
    "Temperature 40 °C or more, seizures or breathing difficulty"
  ],
  steps: [
    "Stop every antipsychotic, including depots, and metoclopramide. Do not give 'just one more dose' for agitation.",
    "Airway, breathing, circulation; oxygen; position to prevent aspiration.",
    "Cool: undress, tepid sponging and fanning, cool fluids. Paracetamol helps little.",
    "IV fluids generously to protect the kidneys: aim for good urine output (adult at least 1 mL/kg/h, more if urine is dark) while the chest stays clear. Watch urine colour.",
    "Because fever and confusion have many causes, treat meningitis, sepsis and malaria empirically if they cannot be excluded.",
    "Differentiate: serotonin syndrome (clonus, brisk reflexes, diarrhoea), anticholinergic toxicity (dry skin, big pupils), heat stroke, catatonia, alcohol withdrawal and tetanus.",
    "Lorazepam or diazepam for agitation and rigidity; it may also help overlapping catatonia.",
    "Bromocriptine (see its page) or dantrolene where available, with specialist advice. Refer for intensive care if possible; ECT is used when drugs fail.",
    "Check CK, creatinine and potassium where available. Prevent pressure sores and blood clots.",
    "Record the reaction clearly as an allergy-type alert. Wait at least 2 weeks after full recovery before any antipsychotic; then use a low dose of a lower-potency or second-generation drug, increase slowly, keep hydrated, avoid depots, and monitor temperature and rigidity."
  ],
  drugs: [
    {
      id: "haloperidol",
      role: "avoid",
      note: "Stop immediately. High-potency antipsychotics carry the highest risk (Kaplan)."
    },
    {
      id: "fluphenazine-decanoate",
      role: "avoid",
      note: "Depot keeps acting for weeks; mortality is higher with depots. Never give again after NMS."
    },
    {
      id: "chlorpromazine",
      role: "avoid",
      note: "All antipsychotics must be stopped."
    },
    {
      id: "olanzapine",
      role: "avoid",
      note: "Second-generation drugs also cause NMS; stop. Only restart any antipsychotic with specialist advice after recovery."
    },
    {
      id: "promethazine",
      role: "avoid",
      note: "Phenothiazine with anticholinergic effect; avoid for sedation."
    },
    {
      id: "lorazepam",
      role: "first",
      note: "1–2 mg IM or IV, repeat as needed for agitation and rigidity (Kaplan lists a benzodiazepine test dose). Watch breathing."
    },
    {
      id: "diazepam",
      role: "alternative",
      note: "5–10 mg IV slowly if lorazepam is unavailable. Never IM."
    },
    {
      id: "ringers-lactate",
      role: "first",
      note: "Generous IV fluids to prevent kidney failure from muscle breakdown; reassess chest and urine output."
    },
    {
      id: "paracetamol",
      role: "supportive",
      note: "Little effect on this fever; physical cooling is the main measure."
    },
    {
      id: "ceftriaxone",
      role: "adjunct",
      note: "If meningitis or sepsis cannot be excluded."
    },
    {
      id: "artesunate",
      role: "adjunct",
      note: "If malaria cannot be excluded in an endemic area."
    },
    {
      id: "heparin",
      role: "supportive",
      note: "Prophylactic dose to prevent clots in an immobile patient if no bleeding risk."
    },
    {
      id: "oxygen",
      role: "supportive",
      note: "For low saturation or reduced consciousness."
    },
    { id: "clozapine", role: "avoid", note: "Clozapine can also cause NMS (Kaplan). Stop it; any later rechallenge is a specialist decision after full recovery." },
    { id: "risperidone", role: "avoid", note: "Stop all antipsychotics, including risperidone, until fully recovered." },
    { id: "quetiapine", role: "avoid", note: "Stop during NMS. After full recovery (often at least 2 weeks) a specialist may restart a low dose of a low-potency or second-generation drug such as quetiapine, increased slowly." },
    { id: "aripiprazole", role: "avoid", note: "Stop all antipsychotics, including aripiprazole, until fully recovered." },
    { id: "haloperidol-decanoate", role: "avoid", note: "Give no further injections. The depot keeps releasing drug for weeks and NMS mortality is higher with depots (Kaplan): expect a longer course and refer." },
    { id: "bromocriptine", role: "adjunct", note: "2.5 mg orally or by nasogastric tube 2–3 times daily, increased as needed (Kaplan up to 45 mg/day); continue at least 10 days after recovery, then taper. Can worsen psychosis and lower blood pressure." },
    { id: "cyproheptadine", role: "avoid", note: "Not a treatment for NMS; its anticholinergic effect reduces sweating and can worsen fever. Consider only if serotonin syndrome is the real diagnosis." }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "NMS can occur at any time during antipsychotic treatment: rigidity, dystonia, akinesia, mutism, reduced consciousness or agitation, with high temperature, sweating, fast pulse and raised BP; white cells and CK rise and myoglobinuria can cause kidney failure.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21 Psychopharmacology, Medication-Induced Movement Disorders, pdf p. 1887"
    },
    {
      book: "kaplan",
      text: "It evolves over 24–72 hours, lasts 10–14 days untreated, and is often missed early as worsening psychosis; mortality can reach 10–20%, higher with depot drugs.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21 Psychopharmacology, Medication-Induced Movement Disorders, pdf p. 1888"
    },
    {
      book: "kaplan",
      text: "High-potency drugs such as haloperidol carry the greatest risk; use the lowest effective antipsychotic dose.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21 Psychopharmacology, Medication-Induced Movement Disorders, pdf p. 1889"
    },
    {
      book: "kaplan",
      text: "Stop the antipsychotic immediately; cool; monitor vital signs, electrolytes, fluid balance and urine output; dantrolene, bromocriptine or amantadine may help. When restarting, consider a low-potency or second-generation drug, which can still cause NMS.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1958"
    },
    {
      book: "kaplan",
      text: "Treatment table: supportive care (IV fluids, cooling, oxygen) is often effective early; a benzodiazepine test dose IM, then oral, is reported to help, and ECT when drugs fail.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21 Psychopharmacology, Medication-Induced Movement Disorders, Table 21-4, pdf p. 1892"
    },
    {
      book: "dsm",
      text: "Casebook: NMS means rigidity, fever, autonomic instability, confusion and raised CK; catatonia after IM haloperidol can look similar, and serotonin syndrome is separated by myoclonus and gut symptoms.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.7 Bizarrely Silent, pdf p. 115"
    }
  ],
  sources: [
    {
      name: "Gurrera RJ et al. International expert consensus criteria for NMS. J Clin Psychiatry 2011"
    },
    {
      name: "American Psychiatric Association. DSM-5-TR, 2022"
    },
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "serotonin-syndrome",
  name: "Serotonin syndrome",
  group: "psychiatric",
  aka: [
    "serotonin toxicity",
    "SSRI toxicity",
    "fluoxetine tramadol reaction"
  ],
  summary: "Too much serotonin from combining or overdosing serotonergic medicines (fluoxetine, amitriptyline, tramadol, pethidine, lithium, linezolid, MAOIs). Starts within hours: agitation, tremor, sweating, diarrhoea, and clonus or brisk reflexes worse in the legs, sometimes high fever. Stop the drugs, sedate with benzodiazepines, cool and give fluids.",
  redflags: [
    "Inducible or spontaneous clonus, eye clonus, or brisk reflexes worse in the legs",
    "Temperature above 38.5 °C with rigidity: severe, can be fatal",
    "Started within 24 hours of a new serotonergic drug, dose increase or overdose",
    "Seizures, confusion or unstable BP",
    "Rigidity with slow onset over days after an antipsychotic: think NMS instead"
  ],
  steps: [
    "Stop all serotonergic drugs: SSRIs, amitriptyline, tramadol, pethidine, ondansetron, metoclopramide, lithium, linezolid. Fluoxetine lasts for weeks, so effects may persist.",
    "Airway, breathing, circulation; continuous observation.",
    "Benzodiazepine for agitation, tremor and muscle activity. Avoid physical restraint, which increases heat production.",
    "Cool the patient and give IV fluids; paracetamol does not lower this temperature.",
    "Differentiate from NMS (slow onset, antipsychotic, bradykinesia and lead-pipe rigidity), anticholinergic toxicity (dry skin, absent bowel sounds), malignant hyperthermia, sepsis, meningitis, malaria and alcohol withdrawal.",
    "Cyproheptadine (not in this app) where available: 12 mg orally or by NG tube, then 2 mg every 2 hours while symptoms continue.",
    "Temperature above 40 °C or rising rigidity: refer urgently for intensive care; sedation, paralysis and ventilation may be needed.",
    "Most cases resolve within 24 hours of stopping the drugs. Review all prescriptions before restarting; avoid the combination in future."
  ],
  drugs: [
    {
      id: "lorazepam",
      role: "first",
      note: "1–2 mg IV or IM, repeat every 30 min as needed; watch breathing."
    },
    {
      id: "diazepam",
      role: "alternative",
      note: "5–10 mg IV slowly or orally, repeat as needed. Never IM."
    },
    {
      id: "midazolam",
      role: "alternative",
      note: "IM if no IV access and no lorazepam."
    },
    {
      id: "ringers-lactate",
      role: "supportive",
      note: "IV fluids for sweating, fever and diarrhoea."
    },
    {
      id: "fluoxetine",
      role: "avoid",
      note: "Stop; long half-life, so toxicity may last longer and a washout of about 5 weeks is needed before MAOIs."
    },
    {
      id: "amitriptyline",
      role: "avoid",
      note: "Stop; serotonergic, and raised levels when combined with fluoxetine."
    },
    {
      id: "lithium",
      role: "avoid",
      note: "Can precipitate serotonin syndrome with SSRIs; hold."
    },
    {
      id: "chlorpromazine",
      role: "avoid",
      note: "Sometimes listed as a serotonin blocker (Kaplan), but causes hypotension, lowers the seizure threshold and is dangerous if NMS is the real diagnosis. Specialist use only."
    },
    {
      id: "haloperidol",
      role: "avoid",
      note: "No benefit; may confuse the picture with NMS."
    },
    {
      id: "paracetamol",
      role: "avoid",
      note: "Ineffective for this muscle-generated fever; do not rely on it. Cool physically."
    },
    {
      id: "oxygen",
      role: "supportive",
      note: "For low saturation or seizures."
    },
    { id: "cyproheptadine", role: "adjunct", note: "Moderate or severe cases: 12 mg orally or crushed by nasogastric tube, then 2 mg every 2 h while symptoms continue, then 8 mg every 6 h (max about 32 mg/day). No injection exists." },
    { id: "sertraline", role: "avoid", note: "Stop; common cause, especially with tramadol, lithium, amitriptyline or a second antidepressant. Do not restart without review." },
    { id: "escitalopram", role: "avoid", note: "Stop; serotonergic, and adds QT prolongation in overdose." },
    { id: "imipramine", role: "avoid", note: "Stop; serotonergic tricyclic, and SSRIs raise its levels." },
    { id: "mirtazapine", role: "avoid", note: "Hold; can contribute when combined with SSRIs or other serotonergic drugs." }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Combining serotonergic drugs (for example an SSRI with an MAOI, tryptophan or lithium) causes a syndrome that progresses from diarrhoea and restlessness to agitation, brisk reflexes, unstable vital signs, myoclonus, seizures, hyperthermia, rigidity, delirium, coma and death.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, pdf p. 1990"
    },
    {
      book: "kaplan",
      text: "Treatment is to stop the causative drugs and give full supportive care; options listed include cyproheptadine, cooling, benzodiazepines, anticonvulsants, and ventilation with paralysis in severe cases.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, pdf p. 1990"
    },
    {
      book: "kaplan",
      text: "Key signs: diarrhoea, myoclonus, sweating, hyperactive reflexes, tremor, disorientation, ataxia and labile mood.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, Table 21-17, pdf p. 1992"
    },
    {
      book: "kaplan",
      text: "SSRIs with MAOIs, tryptophan, lithium or other serotonin reuptake inhibitors can cause serotonin syndrome; fluoxetine, sertraline and paroxetine can also raise tricyclic levels to toxic range.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, pdf p. 1991"
    },
    {
      book: "kaplan",
      text: "Paroxetine given with tramadol may precipitate serotonin syndrome in older people.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, pdf p. 1993"
    },
    {
      book: "dsm",
      text: "Casebook: serotonin syndrome is linked to SSRIs; its typical myoclonus and gut symptoms help separate it from NMS and catatonia.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.7 Bizarrely Silent, pdf p. 115"
    }
  ],
  sources: [
    {
      name: "Boyer EW, Shannon M. The serotonin syndrome. NEJM 2005"
    },
    {
      name: "Dunkley EJ et al. Hunter Serotonin Toxicity Criteria. QJM 2003"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "lithium-toxicity",
  name: "Lithium toxicity",
  group: "psychiatric",
  aka: [
    "lithium poisoning",
    "lithium overdose",
    "high lithium level"
  ],
  summary: "Lithium has a narrow safety margin. Toxicity usually comes from dehydration, vomiting or diarrhoea, kidney impairment or interacting drugs rather than overdose. Early signs are coarse tremor, vomiting and unsteadiness; late signs are confusion, myoclonus, seizures and coma. Stop lithium, restore fluids and kidney function, and refer for dialysis if severe.",
  redflags: [
    "Coarse tremor, slurred speech, unsteady gait, vomiting or diarrhoea in anyone on lithium",
    "Confusion, twitching, myoclonus or seizures",
    "Dehydration, fever, heat, reduced intake or new NSAID, ACE inhibitor or thiazide diuretic",
    "Reduced urine output or kidney disease",
    "Older person with toxicity signs even at a 'normal' level",
    "Intentional overdose, especially of slow-release tablets"
  ],
  steps: [
    "Stop lithium at once. Stop interacting drugs (NSAIDs, ACE inhibitors, thiazides).",
    "Airway, breathing, circulation; recovery position if drowsy; treat seizures with a benzodiazepine.",
    "Measure lithium level (12 h after the last dose for chronic use), creatinine, sodium and potassium if available. Repeat levels, as they can rise again after an overdose. Do not wait for the level to act.",
    "Restore fluids: IV 0.9% sodium chloride is preferred for volume depletion (Ringer's lactate is acceptable for resuscitation). Aim for good urine output; watch for fluid overload in older and heart patients.",
    "Activated charcoal does not bind lithium; give it only if other drugs were taken. Large slow-release overdose may need whole-bowel irrigation (specialist).",
    "Refer urgently for haemodialysis if there is reduced consciousness, seizures, arrhythmia, kidney failure, or a very high level (for example above 4.0 mmol/L with poor kidney function, or above 5.0 mmol/L; confirm local protocol).",
    "Neurological recovery lags behind the blood level by days; some damage (cerebellar) can be permanent.",
    "Do not use haloperidol for agitation if possible (combined neurotoxicity); use a benzodiazepine.",
    "Before any restart: find the cause, review kidney and thyroid function, teach the patient to stop lithium and seek help when vomiting, having diarrhoea or unable to drink, and ensure level monitoring is available."
  ],
  drugs: [
    {
      id: "lithium",
      role: "avoid",
      note: "Stop. Restart only with specialist advice, after recovery, with monitoring in place."
    },
    {
      id: "ringers-lactate",
      role: "supportive",
      note: "For volume resuscitation if 0.9% saline is unavailable; saline is preferred to restore sodium and lithium excretion."
    },
    {
      id: "diazepam",
      role: "first",
      note: "For seizures: 10 mg IV slowly or rectally (adult). Never IM."
    },
    {
      id: "midazolam",
      role: "alternative",
      note: "10 mg IM (adult) for seizures without IV access."
    },
    {
      id: "lorazepam",
      role: "alternative",
      note: "For seizures or agitation: 2–4 mg IV or IM."
    },
    {
      id: "haloperidol",
      role: "avoid",
      note: "Antipsychotic plus lithium can increase neurotoxicity (Kaplan); prefer a benzodiazepine for agitation."
    },
    {
      id: "potassium-chloride",
      role: "supportive",
      note: "Only if potassium is measured low and urine output is adequate."
    },
    { id: "propranolol", role: "avoid", note: "Do not use to mask tremor when toxicity is possible: a coarse tremor with vomiting, unsteadiness or confusion needs lithium stopped, not propranolol." }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Early toxicity: coarse tremor, slurred speech, ataxia, gut symptoms; later: reduced consciousness, fasciculation, myoclonus, seizures, coma. Risks: excess dose, kidney impairment, low-salt diet, interacting drugs, dehydration and older age.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2059"
    },
    {
      book: "kaplan",
      text: "Stop lithium and treat dehydration; activated charcoal does not bind lithium; bowel irrigation or lavage are options after large ingestions.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2060"
    },
    {
      book: "kaplan",
      text: "Haemodialysis removes lithium in severe cases (the book's table uses a level above 4.0 mEq/L); levels can rebound, and neurological recovery lags behind blood levels by days.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2061"
    },
    {
      book: "kaplan",
      text: "Toxicity is well documented at or just above the upper therapeutic level, especially in older people; treat the patient, not only the number.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2066"
    },
    {
      book: "kaplan",
      text: "High-dose antipsychotics with lithium can increase neurological side effects; rarely encephalopathy occurs.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2062"
    }
  ],
  sources: [
    {
      name: "Decker BS et al. EXTRIP recommendations for lithium poisoning. Clin J Am Soc Nephrol 2015"
    },
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "acute-dystonia",
  name: "Acute dystonia and other acute extrapyramidal reactions",
  group: "psychiatric",
  aka: [
    "dystonic reaction",
    "oculogyric crisis",
    "torticollis",
    "akathisia",
    "drug-induced parkinsonism",
    "extrapyramidal side effects",
    "EPS"
  ],
  summary: "Painful, frightening muscle spasms (eyes rolled up, neck twisted, jaw locked, tongue out) within hours to days of starting or increasing haloperidol, fluphenazine or metoclopramide, especially in young men. It is not 'hysteria'. An IM anticholinergic such as biperiden works within minutes. Throat spasm is an airway emergency.",
  redflags: [
    "Stridor, difficulty breathing or swallowing: laryngeal dystonia",
    "Fever, rigidity and confusion: think NMS, not simple dystonia",
    "Recent depot injection: symptoms can return for days to weeks",
    "Severe restlessness with suicidal thoughts (akathisia can drive self-harm)",
    "Child who took metoclopramide or an adult's tablets"
  ],
  steps: [
    "Recognise it: sudden sustained spasm of eyes (oculogyric crisis), neck, jaw, tongue, back or limbs, after a dopamine-blocking drug. It can wax and wane with reassurance; do not dismiss it.",
    "Laryngeal dystonia: oxygen, call for help, give biperiden IV (or IM if no access) immediately, then a benzodiazepine if needed; be ready to support the airway.",
    "Give biperiden 2 mg (adult) IM or slow IV; relief usually within 10–30 minutes. Repeat after 30 minutes if needed.",
    "If biperiden is unavailable: promethazine IM, or diazepam IV slowly, or lorazepam IM or IV.",
    "Continue oral biperiden 2 mg one to three times daily for several days (longer after a depot) to stop it returning.",
    "Reduce the antipsychotic dose or change to a lower-risk drug; stop metoclopramide.",
    "Akathisia (inner restlessness, pacing): reduce the antipsychotic dose; a short course of a benzodiazepine or propranolol helps; anticholinergics work less well.",
    "Parkinsonism (stiffness, slow movement, tremor): reduce the dose; oral biperiden if needed, reviewed after 4–6 weeks.",
    "Explain what happened to the patient and family so that they do not stop all treatment in fear, and record the reaction."
  ],
  drugs: [
    {
      id: "biperiden",
      role: "first",
      note: "2 mg IM or slow IV (Kaplan), repeat after 30 min if needed; maximum about 4 doses in 24 h (confirm product leaflet). Then 2 mg orally 1–3 times daily for several days. Avoid in glaucoma, urinary retention, delirium."
    },
    {
      id: "promethazine",
      role: "alternative",
      note: "25–50 mg IM or slow IV (antihistamine with anticholinergic action, like diphenhydramine in Kaplan). Sedating."
    },
    {
      id: "diazepam",
      role: "alternative",
      note: "5–10 mg IV slowly (Kaplan reports 10 mg IV effective). Never IM."
    },
    {
      id: "lorazepam",
      role: "alternative",
      note: "1 mg IM or IV if anticholinergics fail after 20–30 min (Kaplan); also for akathisia."
    },
    {
      id: "haloperidol",
      role: "avoid",
      note: "Cause; do not give further doses until settled, then lower the dose or change drug."
    },
    {
      id: "fluphenazine-decanoate",
      role: "avoid",
      note: "Common cause; after a depot, dystonia can recur for weeks, so continue oral biperiden."
    },
    {
      id: "chlorpromazine",
      role: "avoid",
      note: "Not a treatment; another dopamine blocker."
    },
    {
      id: "oxygen",
      role: "supportive",
      note: "For laryngeal dystonia or breathing difficulty."
    },
    { id: "trihexyphenidyl", role: "alternative", note: "Only if no injectable anticholinergic and the airway is safe: 2 mg by mouth, slower than IM. Then 2 mg two or three times daily for a few days while the antipsychotic is reviewed." },
    { id: "haloperidol-decanoate", role: "avoid", note: "If dystonia follows a depot, give no further injection until reviewed; anticholinergic cover may be needed for days to weeks." },
    { id: "propranolol", role: "adjunct", note: "For akathisia only (not dystonia or parkinsonism): 10 mg two or three times daily, usual 30–80 mg/day; hold if pulse under 50 or systolic BP under 90. Never in asthma." }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Acute dystonia: sustained contractions such as oculogyric crisis, tongue protrusion, trismus, torticollis and throat spasm that can impair breathing; commonest in young men on high doses of high-potency drugs, especially IM.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21 Psychopharmacology, Medication-Induced Movement Disorders, pdf p. 1889"
    },
    {
      book: "kaplan",
      text: "Dystonia can fluctuate and respond to reassurance, which falsely suggests it is under voluntary control.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21 Psychopharmacology, Medication-Induced Movement Disorders, pdf p. 1891"
    },
    {
      book: "kaplan",
      text: "IM anticholinergic, or IV/IM diphenhydramine 50 mg, almost always relieves acute dystonia; IV diazepam 10 mg has also been reported effective.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21 Psychopharmacology, Medication-Induced Movement Disorders, pdf p. 1892"
    },
    {
      book: "kaplan",
      text: "Biperiden: 2 mg IM or IV for acute extrapyramidal reactions.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21 Psychopharmacology, Medication-Induced Movement Disorders, Table 21-3, pdf p. 1890"
    },
    {
      book: "kaplan",
      text: "Give an anticholinergic IM and repeat after 20–30 minutes if needed; if still no better, lorazepam 1 mg IM or IV. Laryngeal dystonia is an emergency. Prophylaxis for 4–8 weeks after an episode or in high-risk patients.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2214"
    },
    {
      book: "dsm",
      text: "Casebook: when IM haloperidol was given for agitation, an anticholinergic antihistamine was kept ready for extrapyramidal reactions.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.1 Emotionally Disturbed, pdf p. 88"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016"
    },
    {
      name: "WHO Model Formulary 2008 (biperiden)"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "catatonia",
  name: "Catatonia",
  group: "psychiatric",
  aka: [
    "catatonic stupor",
    "mutism",
    "waxy flexibility",
    "catatonic excitement",
    "malignant catatonia",
    "not eating or speaking"
  ],
  summary: "A movement syndrome: the person stops speaking, moving, eating or drinking, holds odd postures, resists being moved, or has purposeless excitement. It is most often caused by depression or bipolar disorder, but also by medical illness and drugs. It kills through dehydration, clots and malignant catatonia. Lorazepam usually works quickly; ECT is the definitive treatment.",
  redflags: [
    "Fever, fast pulse, unstable BP or rigidity: malignant catatonia or NMS, an emergency",
    "Not drinking for more than a day, or not eating: dehydration, kidney failure, malnutrition",
    "Recent antipsychotic dose: NMS",
    "Immobile for days: pressure sores, pneumonia, DVT and pulmonary embolism",
    "Confusion, seizures or fever: encephalitis, cerebral malaria, non-convulsive status epilepticus"
  ],
  steps: [
    "Recognise it: three or more of stupor, mutism, negativism, posturing, catalepsy, waxy flexibility, staring, mannerisms, stereotypies, grimacing, echolalia, echopraxia, or purposeless agitation.",
    "Check vital signs, glucose, hydration and temperature; examine for infection, neurological signs and injuries.",
    "Look for medical causes: encephalitis (including HIV), cerebral malaria, meningitis, epilepsy, metabolic disturbance, hepatic or kidney failure, and drugs (antipsychotics, recent benzodiazepine withdrawal).",
    "Stop antipsychotics while catatonic: they can precipitate NMS or malignant catatonia.",
    "Lorazepam challenge: 1–2 mg IV or IM; reassess after 10–30 minutes. Improvement supports the diagnosis. If lorazepam is unavailable, diazepam 5–10 mg IV slowly can be used (confirm local protocol).",
    "If it helps, continue lorazepam 1–2 mg every 4–8 hours and increase as needed; high total doses are often tolerated (Kaplan). Do not stop suddenly.",
    "No response within a few days, malignant catatonia, or life-threatening refusal to eat or drink: refer urgently for ECT.",
    "Supportive care: IV or NG fluids and feeding, turning and pressure care, thromboprophylaxis if no bleeding risk, oral care.",
    "The patient cannot consent: act in their best interests to preserve life, involve family, follow hospital policy and national law, and document.",
    "Once catatonia resolves, treat the underlying disorder (often mania or depression); reintroduce antipsychotics cautiously if needed."
  ],
  drugs: [
    {
      id: "lorazepam",
      role: "first",
      note: "Challenge 1–2 mg IV or IM, then 1–2 mg every 4–8 h, increased as needed (Kaplan: from under 5 up to 12 mg/day or more). Monitor breathing."
    },
    {
      id: "diazepam",
      role: "alternative",
      note: "Where lorazepam is unavailable: 5–10 mg IV slowly or orally, repeated; less studied. Never IM."
    },
    {
      id: "haloperidol",
      role: "avoid",
      note: "Can worsen catatonia and precipitate NMS; avoid while catatonic."
    },
    {
      id: "chlorpromazine",
      role: "avoid",
      note: "Avoid while catatonic (NMS and hypotension risk)."
    },
    {
      id: "fluphenazine-decanoate",
      role: "avoid",
      note: "Depot antipsychotic; avoid (NMS risk, cannot be withdrawn)."
    },
    {
      id: "olanzapine",
      role: "avoid",
      note: "Avoid until catatonia has resolved; restart any antipsychotic only with specialist advice."
    },
    {
      id: "ringers-lactate",
      role: "supportive",
      note: "IV fluids for dehydration."
    },
    {
      id: "heparin",
      role: "supportive",
      note: "Prophylactic dose for the immobile patient if no bleeding risk."
    },
    {
      id: "dextrose",
      role: "supportive",
      note: "If not eating; check glucose. Give thiamine if malnourished."
    },
    { id: "risperidone", role: "avoid", note: "Antipsychotics can worsen catatonia or trigger NMS; treat with lorazepam first." },
    { id: "haloperidol-decanoate", role: "avoid", note: "Never start or continue a depot in catatonia; withhold the next injection and treat with lorazepam." }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Lorazepam, from under 5 mg/day up to 12 mg/day or more, is regularly used for acute catatonia, although there are no controlled trials; chronic catatonia responds less well.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.4 Anxiolytics, pdf p. 2117"
    },
    {
      book: "kaplan",
      text: "The definitive treatment for catatonia is ECT.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.4 Anxiolytics, pdf p. 2118"
    },
    {
      book: "kaplan",
      text: "Catatonic patients need close supervision to prevent harm and often need medical care for malnutrition, exhaustion, high fever or self-injury.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 5 Schizophrenia Spectrum and Other Psychotic Disorders, pdf p. 1106"
    },
    {
      book: "dsm",
      text: "Casebook: most catatonia is due to depression or bipolar disorder; medical causes, NMS and drugs must be sought urgently. Catatonia itself kills through dehydration, malnutrition, exhaustion and thromboembolism, and can become malignant with fever and autonomic instability.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.7 Bizarrely Silent, pdf p. 114"
    },
    {
      book: "dsm",
      text: "Casebook: a low-dose IV lorazepam challenge is both diagnostic and therapeutic; in the case, 1 mg repeated after 5 minutes, then 1 mg every 4–6 hours, relieved rigidity within 24 hours.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.7 Bizarrely Silent, pdf p. 115"
    }
  ],
  sources: [
    {
      name: "American Psychiatric Association. DSM-5-TR, 2022"
    },
    {
      name: "Rogers JP et al. BAP consensus guidelines on catatonia. J Psychopharmacol 2023"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "postpartum-psychosis",
  name: "Postpartum psychosis",
  group: "psychiatric",
  aka: [
    "puerperal psychosis",
    "psychosis after childbirth",
    "postpartum mania",
    "peripartum onset"
  ],
  summary: "A sudden psychosis, usually within the first two weeks after birth, with confusion, rapidly changing mood, strange beliefs and little sleep, often about the baby. It is a psychiatric emergency with risk of suicide and harm to the baby. Exclude eclampsia, infection, bleeding and other medical causes, admit, and start an antipsychotic.",
  redflags: [
    "Beliefs that the baby is harmed, evil, not hers, or must be saved by death",
    "Suicidal thoughts or talk of harming the baby",
    "High BP, headache, visual disturbance, seizures: eclampsia",
    "Fever: puerperal sepsis, mastitis, malaria, meningitis",
    "Severe headache, focal signs or seizures: cerebral venous thrombosis",
    "Previous bipolar disorder or postpartum psychosis, or family history"
  ],
  steps: [
    "Treat as an emergency. The mother should not be left alone with the baby while acutely unwell; keep them together under supervision where safe.",
    "Check BP, urine protein, temperature, pulse, glucose, haemoglobin and blood loss. Treat eclampsia with magnesium sulfate.",
    "Look for medical causes: sepsis, malaria, HIV, thyroid disease, anaemia or Sheehan syndrome after haemorrhage, hypoglycaemia, cerebral venous thrombosis, drugs (steroids, bromocriptine) and alcohol withdrawal.",
    "Assess suicide risk and risk to the baby directly with the mother and family.",
    "Admit, ideally to a setting where the baby can stay with supervision. Arrange feeding support for the baby.",
    "Start an antipsychotic (olanzapine or haloperidol) at a low dose; add short-term lorazepam for sleep and agitation. Protect sleep: family help with night feeds.",
    "Breastfeeding: olanzapine and haloperidol are generally considered compatible with monitoring of the baby for sedation and poor feeding (guidance varies; Kaplan advises against breastfeeding on older antipsychotics). Confirm local protocol and decide with the mother.",
    "Avoid valproate. Lithium only with specialist advice and level monitoring (it passes into breast milk). Do not give an antidepressant alone if there are manic or mixed features.",
    "Consent: if the mother lacks capacity and is at serious risk, follow hospital policy and national law, involve family, and document.",
    "Severe or refusing food and drink: refer for ECT.",
    "After recovery: plan for future pregnancies (recurrence risk over 1 in 2), assess for bipolar disorder, and provide contraception advice and close follow-up."
  ],
  drugs: [
    {
      id: "olanzapine",
      role: "first",
      note: "5–10 mg at night. Monitor the breastfed baby for drowsiness."
    },
    {
      id: "haloperidol",
      role: "first",
      note: "1.5–5 mg daily orally, increase as needed; IM if refusing and at serious risk. Watch for dystonia."
    },
    {
      id: "lorazepam",
      role: "adjunct",
      note: "0.5–1 mg for sleep and agitation for a few days; watch the breastfed baby for sedation."
    },
    {
      id: "promethazine",
      role: "adjunct",
      note: "25 mg at night for sleep where benzodiazepines are unavailable; sedating."
    },
    {
      id: "lithium",
      role: "alternative",
      note: "Specialist only, with level monitoring; high effect for postpartum mania and prevention in bipolar disorder (Kaplan), but passes into milk: usually avoid breastfeeding or monitor the infant closely."
    },
    {
      id: "sodium-valproate",
      role: "avoid",
      note: "Avoid in women of childbearing potential (birth defects in future pregnancy) unless no alternative and effective contraception."
    },
    {
      id: "carbamazepine",
      role: "avoid",
      note: "Reduces hormonal contraception; avoid unless specialist advice."
    },
    {
      id: "fluoxetine",
      role: "avoid",
      note: "Not alone when psychotic, manic or mixed features are present; can worsen mania."
    },
    {
      id: "amitriptyline",
      role: "avoid",
      note: "Can trigger mania; dangerous in overdose."
    },
    {
      id: "magnesium-sulfate",
      role: "adjunct",
      note: "Only if eclampsia or severe pre-eclampsia is present (see Eclampsia)."
    },
    {
      id: "ceftriaxone",
      role: "adjunct",
      note: "If puerperal sepsis or meningitis is possible."
    },
    {
      id: "biperiden",
      role: "supportive",
      note: "For dystonia from haloperidol."
    },
    { id: "quetiapine", role: "alternative", note: "Built up from 25 mg twice daily; low milk levels, often preferred when breastfeeding. Sedation can interfere with night feeds and baby safety." },
    { id: "risperidone", role: "alternative", note: "1–2 mg a day, increasing to 2–4 mg. Low milk levels, but raises prolactin; watch the baby for sleepiness." },
    { id: "bromocriptine", role: "avoid", note: "Do not use to suppress breast milk: linked to postpartum psychosis, hypertension, seizures and stroke, and can worsen psychosis (Kaplan). Stop it if already started." },
    { id: "sertraline", role: "avoid", note: "Not alone when psychotic, manic or mixed features are present. For postpartum depression without psychosis, sertraline 50 mg is the usual first choice in breastfeeding." }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Postpartum psychosis: assess danger to self and to the infant and take precautions; look for medical illness presenting as behaviour change; suicide risk rises after birth.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, Table 25-12, pdf p. 2579"
    },
    {
      book: "kaplan",
      text: "Postpartum onset means onset within 4 weeks of delivery, and these episodes commonly include psychotic symptoms.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 7 Depressive Disorders, pdf p. 1226"
    },
    {
      book: "kaplan",
      text: "Lithium prophylaxis is recommended for women with bipolar disorder entering the postpartum period; kidney clearance changes after delivery need close level monitoring; lithium enters breast milk, so weigh risks.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2062"
    },
    {
      book: "kaplan",
      text: "The book advises against breastfeeding on older (dopamine-blocking) antipsychotics, although milk levels are low; many guidelines allow breastfeeding with infant monitoring.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1963"
    },
    {
      book: "dsm",
      text: "Casebook: onset is usually in the first postpartum week, rapid, with changing delusions; it is a psychiatric emergency needing admission and risk assessment for suicide and harm to the baby.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.8 A Postpartum Change, pdf p. 118"
    },
    {
      book: "dsm",
      text: "Casebook: risk is about 1 in 1,000 births overall, about 1 in 4 with bipolar disorder and over 1 in 2 after a previous postpartum psychosis; identify high-risk women in pregnancy.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.8 A Postpartum Change, pdf p. 118"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016"
    },
    {
      name: "NICE CG192. Antenatal and postnatal mental health, 2014 (updated 2020)"
    },
    {
      name: "American Psychiatric Association. DSM-5-TR, 2022"
    }
  ],
  review: {
    status: "draft"
  }
},
{
  id: "tricyclic-overdose",
  name: "Tricyclic antidepressant overdose",
  group: "psychiatric",
  aka: [
    "amitriptyline overdose",
    "TCA poisoning",
    "imipramine overdose",
    "antidepressant overdose"
  ],
  summary: "Amitriptyline is cheap, widely prescribed and one of the most dangerous overdoses: seizures, coma, low BP and wide-complex arrhythmias can develop within 1–6 hours. Protect the airway, treat seizures with a benzodiazepine, and give sodium bicarbonate for arrhythmia, hypotension or a broad QRS. Then assess suicide risk.",
  redflags: [
    "Drowsiness or confusion with dry skin, dilated pupils, fast pulse and urinary retention",
    "Seizure",
    "Low BP or irregular, slow or very fast pulse",
    "QRS wider than 100 ms (0.10 s) on ECG, or a broad-complex rhythm on a monitor",
    "Child who swallowed any amount of an adult's tablets",
    "Mixed overdose with alcohol, benzodiazepines or opioids"
  ],
  steps: [
    "Ask what, how much and when; count missing tablets. More than about 5–10 mg/kg of amitriptyline can be serious; any ingestion in a small child needs observation.",
    "Airway, breathing, circulation. Oxygen. Put in recovery position. Intubate if consciousness is falling and it is possible.",
    "IV access. ECG if available; otherwise continuous pulse and BP checks every 15 minutes.",
    "Activated charcoal (if stocked) 50 g adult or 1 g/kg child only if within about 1–2 hours and the airway is safe. No induced vomiting.",
    "Seizures: diazepam IV or rectally, or midazolam IM. Do not use phenytoin (it worsens sodium-channel toxicity).",
    "Sodium bicarbonate 8.4% 1–2 mmol/kg (1–2 mL/kg) IV over a few minutes for QRS over 100 ms, arrhythmia, hypotension or seizures; repeat until the QRS narrows and BP improves. Watch potassium and sodium. Confirm local protocol.",
    "Hypotension: IV fluid bolus, then bicarbonate, then noradrenaline if still low.",
    "Do not give flumazenil (not in app) or physostigmine: both can cause seizures or cardiac arrest in tricyclic poisoning. Avoid haloperidol and chlorpromazine for agitation; use a benzodiazepine.",
    "Observe for at least 6 hours; anyone with symptoms or ECG changes needs admission and monitoring, as arrhythmias can occur for days (Kaplan).",
    "Urinary retention: catheterise. Cool if hyperthermic.",
    "Once medically fit: full suicide risk assessment (see Severe depression with suicide risk). Switch to fluoxetine; never restart amitriptyline in a person who overdosed; limit supplies for the household."
  ],
  drugs: [
    {
      id: "sodium-bicarbonate",
      role: "first",
      note: "8.4% 1–2 mmol/kg IV bolus for broad QRS, arrhythmia, hypotension or seizures; repeat to effect. Do not mix with calcium in the same line."
    },
    {
      id: "oxygen",
      role: "first",
      note: "Hypoxia and acidosis worsen cardiotoxicity; ventilate if breathing is inadequate."
    },
    {
      id: "diazepam",
      role: "first",
      note: "Seizures: 10 mg IV slowly or rectally (adult); 0.5 mg/kg rectally in a child. Never IM."
    },
    {
      id: "midazolam",
      role: "alternative",
      note: "Seizures without IV access: 10 mg IM adult, 0.2 mg/kg child (max 10 mg)."
    },
    {
      id: "lorazepam",
      role: "alternative",
      note: "Seizures or agitation: 2–4 mg IV or IM adult."
    },
    {
      id: "ringers-lactate",
      role: "first",
      note: "Fluid bolus for hypotension, 10–20 mL/kg, reassess."
    },
    {
      id: "noradrenaline",
      role: "alternative",
      note: "If hypotension persists after fluids and bicarbonate."
    },
    {
      id: "phenytoin",
      role: "avoid",
      note: "Sodium-channel blocker: worsens cardiotoxicity; ineffective for these seizures."
    },
    {
      id: "amiodarone",
      role: "avoid",
      note: "Prolongs QT and can worsen tricyclic arrhythmias; use bicarbonate first and seek expert advice."
    },
    {
      id: "haloperidol",
      role: "avoid",
      note: "Lowers seizure threshold and prolongs QT; use benzodiazepines for agitation."
    },
    {
      id: "chlorpromazine",
      role: "avoid",
      note: "Anticholinergic, hypotensive and pro-convulsant."
    },
    {
      id: "amitriptyline",
      role: "avoid",
      note: "Do not restart after an overdose; switch to fluoxetine and limit supplies."
    },
    {
      id: "potassium-chloride",
      role: "supportive",
      note: "Bicarbonate lowers potassium; replace if measured low."
    },
    {
      id: "fluoxetine",
      role: "supportive",
      note: "Safer antidepressant once recovered and assessed. Note that fluoxetine raises tricyclic levels if both are taken."
    },
    { id: "trihexyphenidyl", role: "avoid", note: "Adds to anticholinergic toxicity (delirium, fever, urinary retention, seizures). Stop it." },
    { id: "imipramine", role: "avoid", note: "Imipramine overdose is managed exactly like amitriptyline overdose (bicarbonate for broad QRS, benzodiazepines for seizures). Do not restart after recovery; switch to an SSRI with small supplies." }
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Tricyclic overdose: agitation, delirium, convulsions, brisk reflexes, bowel and bladder paralysis, unstable BP and temperature, dilated pupils, then coma and respiratory depression. Arrhythmias may resist treatment and the risk lasts 3–4 days, so monitor intensively.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, pdf p. 2033"
    },
    {
      book: "kaplan",
      text: "Tricyclics can prolong the PR, QRS and QT intervals and cause or worsen heart block.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 1 Examination and Diagnosis of the Psychiatric Patient, pdf p. 218"
    },
    {
      book: "kaplan",
      text: "Fluoxetine, paroxetine and fluvoxamine can raise tricyclic levels three- to fourfold.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, pdf p. 2030"
    },
    {
      book: "dsm",
      text: "Casebook: dilated pupils, reduced bowel sounds, urinary retention, fever, fast pulse and fluctuating confusion pointed to anticholinergic delirium; the urine screen was positive for tricyclics.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 17 Neurocognitive Disorders, case 17.2 Agitated and Confused, pdf p. 414"
    }
  ],
  sources: [
    {
      name: "WHO. Guidelines for the management of self-harm/poisoning; Toxbase / national poison centre guidance"
    },
    {
      name: "Body R et al. Sodium bicarbonate in tricyclic overdose. Emerg Med J 2011"
    },
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016"
    }
  ],
  review: {
    status: "draft"
  }
}
];
