/* ============================================================
   MedBridge drug database  (working name — placeholder)
   ------------------------------------------------------------
   EVERY entry is a DRAFT until review.status === "reviewed".
   Content must be verified by a pharmacist / physician against
   the cited sources and the national formulary before use.
   Schema documented in README.md.
   ============================================================ */

window.EQUIPMENT = {
  iv:          { label: "IV access (cannula)",            group: "Access" },
  io:          { label: "Intraosseous access",            group: "Access" },
  im:          { label: "IM injection (syringe + needle)", group: "Access" },
  oral:        { label: "Oral / NG route usable",         group: "Access" },
  rectal:      { label: "Rectal route usable",            group: "Access" },
  pump:        { label: "Infusion pump",                  group: "Infusion" },
  syringe_driver:{ label: "Syringe driver",               group: "Infusion" },
  macro_set:   { label: "Standard giving set (10–20 gtt/mL)", group: "Infusion" },
  micro_set:   { label: "Microdrip / paediatric set (60 gtt/mL)", group: "Infusion" },
  burette:     { label: "Burette set (100–150 mL)",       group: "Infusion" },
  syringe_1ml: { label: "1 mL (insulin/tuberculin) syringe", group: "Infusion" },
  lidocaine:   { label: "Lidocaine 1–2 % (plain)",        group: "Supplies" },
  glucometer:  { label: "Glucometer",                     group: "Monitoring" },
  ecg:         { label: "ECG / cardiac monitor",          group: "Monitoring" },
  bp:          { label: "BP cuff",                        group: "Monitoring" },
  oxygen:      { label: "Oxygen supply",                  group: "Respiratory" },
  neb:         { label: "Nebuliser",                      group: "Respiratory" },
  mdi:         { label: "Metered-dose inhaler (MDI)",     group: "Respiratory" }
};

window.CATEGORIES = {
  emergency:  "Emergency & resuscitation",
  obstetric:  "Obstetric",
  cardio:     "Cardiovascular / shock",
  endocrine:  "Endocrine & metabolic",
  electrolyte:"Fluids & electrolytes",
  infection:  "Anti-infectives",
  respiratory:"Respiratory",
  neuro:      "Seizures & neurology",
  analgesia:  "Analgesia, sedation & anaesthesia",
  haem:       "Haematology & bleeding",
  nutrition:  "Nutrition & micronutrients",
  psychiatry: "Psychiatry & mental health"
};

window.WARDS = {
  emergency:  { label: "Emergency / casualty", note: "Resuscitation, triage and the first hour." },
  maternity:  { label: "Labour & maternity",   note: "Delivery room, obstetric theatre and postnatal ward." },
  neonatal:   { label: "Neonatal unit",        note: "Newborns and preterm infants. Volumes are small and dilutions matter." },
  paediatric: { label: "Paediatric ward",      note: "Children beyond the newborn period." },
  medical:    { label: "Adult medical ward",   note: "General internal medicine inpatients." },
  surgical:   { label: "Surgery & theatre",    note: "Operating theatre, anaesthesia and the surgical ward." },
  icu:        { label: "ICU / high dependency", note: "Sickest patients; where pumps are missed most." },
  outpatient: { label: "Outpatient & health post", note: "OPD, health centre and community level." },
  psychiatric: { label: "Psychiatric ward & mental health", note: "Inpatient psychiatry, emergency mental health and community follow-up." }
};

window.DRUG_DB = [
/* ---------------------------------------------------------- */
{
  id: "oxytocin",
  name: "Oxytocin",
  aka: ["Syntocinon", "Pitocin"],
  cls: "Uterotonic",
  cat: "obstetric",
  wards: ["emergency", "maternity", "surgical"],
  tags: ["PPH", "postpartum haemorrhage", "induction", "augmentation"],
  presentation: [
    "10 IU/mL, 1 mL ampoule (also 5 IU/mL).",
    "Store 2–8 °C; loses potency with heat exposure — keep in cold chain where possible."
  ],
  indications: ["Prevention of PPH (third stage)", "Treatment of PPH (uterine atony)", "Induction / augmentation of labour"],
  standard: {
    summary: "Pump-controlled infusion for induction; gravity infusion tables for PPH are already the WHO standard.",
    items: [
      { label: "PPH prevention", text: "10 IU IM within 1 minute of birth. First-line uterotonic (WHO). If given IV, dilute it and infuse — a 10-unit IV bolus causes profound transient hypotension, dangerous in a bleeding or cardiac patient (Williams)." },
      { label: "PPH treatment", text: "20 IU in 1 L NS or RL IV at 60 drops/min (≈180 mL/h), then 20 IU in 1 L at 40 drops/min. Do not exceed 3 L of oxytocin-containing fluid." },
      { label: "Induction / augmentation (pump)", text: "Start 1–2 mIU/min, increase every 30 min until 3 contractions per 10 min lasting >40 s; usual max 20–32 mIU/min." }
    ]
  },
  improvised: [
    {
      title: "PPH treatment by gravity drip (WHO regimen — designed for drop counting)",
      best_for: "Uterine atony after delivery when no pump is available.",
      requires: ["iv", "macro_set"],
      steps: [
        "Draw 20 IU (2 mL of 10 IU/mL) and inject into a 1 L bag of NS or RL. Invert the bag 10 times. Label: “Oxytocin 20 IU”.",
        "Run at 60 drops/min with a 20 gtt/mL set (= 15 drops per 15 s). Massage uterus, empty bladder.",
        "Once bleeding is controlled: 20 IU in 1 L at 40 drops/min (10 drops per 15 s).",
        "Maximum 3 L of oxytocin-containing fluid in total (water intoxication risk).",
        "Never give undiluted oxytocin as an IV bolus — causes hypotension."
      ],
      monitor: ["Bleeding, uterine tone, pulse and BP every 15 min", "Urine output", "Fluid volume infused"],
      cautions: ["If bleeding continues: ergometrine 0.2 mg IM (not if hypertensive), misoprostol 800 mcg sublingual, tranexamic acid 1 g IV, bimanual compression, referral."]
    },
    {
      title: "No IV access: IM oxytocin",
      best_for: "PPH treatment or prevention when a cannula cannot be placed immediately.",
      requires: ["im"],
      steps: [
        "10 IU IM into the anterolateral thigh. Repeat 10 IU IM after 20 min if atony persists while IV access is obtained... (many protocols cap total at 40 IU) — verify local protocol.",
        "Add misoprostol 800 mcg sublingual if oxytocin alone insufficient.",
        "Obtain IV/IO access as soon as possible for fluids and the infusion above."
      ],
      monitor: ["Bleeding, pulse, BP"],
      cautions: []
    },
    {
      title: "Augmentation of labour by drop counting (WHO)",
      best_for: "Augmentation/induction with no pump. Requires one-to-one monitoring.",
      requires: ["iv", "macro_set"],
      steps: [
        "2.5 IU in 500 mL D5W or NS (20 gtt/mL set). Start at 10 drops/min (≈2.5 mIU/min).",
        "Increase by 10 drops/min every 30 min until 3 contractions per 10 min lasting >40 s. Maximum 60 drops/min.",
        "If still inadequate at 60 drops/min: 5 IU in 500 mL, start at 30 drops/min, increase by 10 every 30 min to max 60 drops/min.",
        "Multigravida and previous caesarean: do not exceed 5 IU in 500 mL. Primigravida may go to 10 IU in 500 mL."
      ],
      monitor: ["Contractions and fetal heart every 30 min", "Stop the infusion if >4 contractions per 10 min, contractions >60 s, or fetal distress"],
      cautions: ["Hyperstimulation → stop infusion, left lateral, oxygen, consider terbutaline 0.25 mg SC (verify)."]
    }
  ],
  cautions: ["Water intoxication with large volumes (use NS/RL, monitor urine output).", "Hypotension/tachycardia with rapid IV.", "Uterine rupture risk with hyperstimulation, especially grand multiparity or previous scar."],
  sources: [
    { name: "WHO. Managing Complications in Pregnancy and Childbirth, 2nd ed. 2017", url: "https://www.who.int/publications/i/item/9789241565493" },
    { name: "WHO recommendations for the prevention and treatment of postpartum haemorrhage (2012) and updates (2018, 2020)" }
  ],
  textbook: [
    { book: "williams", text: "A 10-unit IV bolus causes marked transient hypotension; give oxytocin as a dilute continuous infusion or IM. Parkland: 20 units per liter at 10 to 20 mL/min after placental delivery until firm, then 1 to 2 mL/min; 10 units IM if no IV access.", ref: "Williams Obstetrics 25th ed. 2018, ch. 27 Vaginal Delivery, pdf p. 1156" },
    { book: "williams", text: "Antidiuretic effect: at 20 mU/min or more free-water clearance falls; with large aqueous volumes water intoxication can cause convulsions, coma and death. Raise concentration rather than flow rate and use saline or lactated Ringer.", ref: "Williams Obstetrics 25th ed. 2018, ch. 26 Induction and Augmentation of Labor, pdf p. 1120" },
    { book: "williams", text: "Induction/augmentation regimens: low-dose (0.5 to 1.5 mU/min) or high-dose (4.5 to 6 mU/min) starts; Parkland 6 mU/min increased by 6 mU/min every 40 minutes, UAB 2 mU/min increased every 15 minutes to 30 mU/min.", ref: "Williams Obstetrics 25th ed. 2018, ch. 26 Induction and Augmentation of Labor, pdf p. 1119" },
    { book: "gabbe", text: "Prophylactic uterotonic, preferably oxytocin, recommended after all births (ACOG, WHO) as part of active third-stage management.", ref: "Gabbe's Obstetrics 9th ed., ch. 13 Normal Labor and Delivery, p. 271" },
    { book: "gabbe", text: "PPH from atony: oxytocin first-line, starting 10-80 U in 500-1000 mL crystalloid IV; IM or intrauterine possible. Hemorrhage algorithm lists 10-40 U IV or 10 U IM.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 405" },
    { book: "gabbe", text: "At caesarean, IV bolus 5-10 IU and/or infusion 10-40 IU are common; authors prefer infusion of at least 20 IU because of bolus side effects.", ref: "Gabbe's Obstetrics 9th ed., ch. 21 Cesarean Delivery, p. 431" },
    { book: "gabbe", text: "Induction: low-dose protocols start 0.5-2 mU/min, increasing by 1-2 mU/min every 15-40 min; most protocols do not exceed 42 mU/min.", ref: "Gabbe's Obstetrics 9th ed., ch. 14 Induction of Labor, p. 285" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "magnesium-sulfate",
  name: "Magnesium sulfate",
  aka: ["MgSO4"],
  cls: "Anticonvulsant (eclampsia)",
  cat: "obstetric",
  wards: ["emergency", "maternity", "paediatric", "icu"],
  tags: ["pre-eclampsia", "eclampsia", "seizure", "asthma"],
  presentation: [
    "50 % solution: 500 mg/mL — 5 g in 10 mL ampoule (most common).",
    "20 % solution: 200 mg/mL. 10 %: 100 mg/mL.",
    "To make 20 % from 50 %: 8 mL of 50 % (4 g) + 12 mL water for injection or NS = 20 mL of 20 %."
  ],
  indications: ["Severe pre-eclampsia (prevention of eclampsia)", "Eclampsia", "Severe asthma (adjunct)", "Torsades de pointes"],
  standard: {
    summary: "Zuspan regimen: IV loading then continuous IV maintenance by pump.",
    items: [
      { label: "Loading", text: "4 g IV over 5–20 min (as 20 % solution)." },
      { label: "Maintenance (pump)", text: "1 g/h IV infusion (WHO/Zuspan) for 24 h after delivery or after the last seizure, whichever is later. Williams and Gabbe maintain at 2 g/h after a 4–6 g load, because 1 g/h often gives subtherapeutic levels; they keep 1 g/h for renal impairment." },
      { label: "Recurrent seizure", text: "2 g IV over 5 min (4 mL of 50 % diluted to 20 %)." },
      { label: "Severe asthma (adjunct)", text: "Adult 2 g IV over 20 min; child 40–50 mg/kg (max 2 g) over 20 min." }
    ]
  },
  improvised: [
    {
      title: "Pritchard IM regimen (WHO first-line where no pump)",
      best_for: "Any facility. The IM regimen is as effective as the IV regimen and needs no rate control.",
      requires: ["iv", "im"],
      steps: [
        "LOADING (IV part): 4 g as 20 % solution IV over 5–20 min. (8 mL of 50 % + 12 mL water/NS.)",
        "LOADING (IM part), immediately after: 10 g of 50 % IM — 5 g (10 mL) deep IM in each buttock (upper outer quadrant). Add 1 mL of 2 % lidocaine to each syringe to reduce pain (optional).",
        "MAINTENANCE: 5 g of 50 % (10 mL, + 1 mL 2 % lidocaine) deep IM every 4 hours, alternating buttocks.",
        "Continue for 24 h after delivery or after the last seizure, whichever is later.",
        "Recurrent seizure: give 2 g IV over 5 min (4 mL of 50 % + 6 mL water/NS)."
      ],
      monitor: [
        "BEFORE EACH DOSE check all three: respiratory rate ≥ 16/min; patellar (knee) reflexes present; urine output ≥ 30 mL/h averaged over the last 4 h (≥ 100 mL in 4 h).",
        "If any is absent — withhold or delay the dose and reassess.",
        "BP, fetal heart, level of consciousness."
      ],
      cautions: [
        "ANTIDOTE for respiratory depression: calcium gluconate 10 % — 1 g (10 mL) IV slowly over 10 min. Support breathing with bag-valve-mask.",
        "Do not give IM into oedematous or infected sites; rotate sites."
      ]
    },
    {
      title: "Gravity IV maintenance (if IM impossible, e.g. severe thrombocytopenia)",
      best_for: "Facilities with a burette or reliable drop counting and one-to-one nursing.",
      requires: ["iv", "burette"],
      steps: [
        "5 g (10 mL of 50 %) in 500 mL NS = 10 mg/mL. Label the bag.",
        "1 g/h = 100 mL/h. With a 20 gtt/mL set: 33 drops/min (≈ 8 drops per 15 s). With a microdrip (60 gtt/mL): 100 drops/min.",
        "Fill the burette with only 100 mL at a time (1 hour) so a runaway drip cannot deliver more than 1 g."
      ],
      monitor: ["Same toxicity checks as above, every hour", "Re-check drip rate every 15–30 min"],
      cautions: ["Rate drift is common with gravity sets — the IM regimen is safer where nursing ratios are low."]
    },
    {
      title: "Pre-referral / no IV access",
      best_for: "Health centre before transfer.",
      requires: ["im"],
      steps: [
        "Give the IM part of the loading dose: 10 g of 50 % (5 g in each buttock) and refer immediately.",
        "Record the time and dose on the referral note. Next dose (5 g IM) is due 4 h later at the receiving facility."
      ],
      monitor: ["Airway, breathing, left lateral position, BP"],
      cautions: ["Verify against the national protocol (some protocols give 4 g IV + 6 g IM, or 14 g IM as loading)."]
    }
  ],
  cautions: ["Toxicity thresholds (serum magnesium): patellar reflexes are lost at about 7–10 mEq/L (9–12 mg/dL, roughly 3.5–5 mmol/L); respiratory depression at about 10–12 mEq/L (12–15 mg/dL, 5–6 mmol/L); cardiac arrest at about 25 mEq/L (30 mg/dL, 12.5 mmol/L). Loss of the knee reflex is the early warning — stop the magnesium before breathing is affected.", "Risk rises sharply with oliguria or renal impairment (creatinine above 1.2 mg/dL or urine under 30 mL/h for more than 4 h): give maintenance at a reduced dose or withhold, and check reflexes and breathing before every dose.", "With nifedipine in severe pre-eclampsia: the combination is acceptable, as nifedipine does not potentiate magnesium (Williams), but check BP every 15 min and reflexes hourly. Avoid the combination for tocolysis (Williams)."],
  antidote: "Calcium gluconate 10 %: 1 g (10 mL) IV over 10 min.",
  sources: [
    { name: "WHO. Managing Complications in Pregnancy and Childbirth, 2nd ed. 2017 (magnesium sulfate schedules)" },
    { name: "WHO recommendations for prevention and treatment of pre-eclampsia and eclampsia, 2011" },
    { name: "Pritchard JA et al. Am J Obstet Gynecol 1984 (Parkland regimen)" }
  ],
  textbook: [
    { book: "harrison", text: "Torsades de pointes: IV magnesium sulphate 1–2 g usually suppresses recurrences; if not, raise heart rate with isoproterenol or pacing and correct potassium.", ref: "Harrison 22nd ed. 2025, ch. 262 Polymorphic Ventricular Tachycardia and Ventricular Fibrillation, p. 1969" },
    { book: "harrison", text: "Severe hypomagnesaemia: parenteral magnesium (IV MgCl2 preferred) as continuous infusion 50 mmol/day with normal renal function; reduce rate 50–75% if GFR reduced.", ref: "Harrison 22nd ed. 2025, ch. 421 Bone and Mineral Metabolism in Health and Disease, p. 3267" },
    { book: "harrison", text: "IM magnesium sulfate is discouraged for hypomagnesaemia: painful and delivers little magnesium (2 mL of 50% = 4 mmol); monitor serum Mg every 12–24 h.", ref: "Harrison 22nd ed. 2025, ch. 421 Bone and Mineral Metabolism in Health and Disease, p. 3267" },
    { book: "harrison", text: "Tetanus: magnesium sulfate is used for autonomic dysfunction (hypertension, tachycardia), aiming for plasma magnesium 2–4 mmol/L; as a muscle relaxant it is grouped with agents needing ventilation.", ref: "Harrison 22nd ed. 2025, ch. 157 Tetanus, p. 1231" },
    { book: "williams", text: "Magnesium sulfate may be given by continuous IV infusion or by intermittent IM injection; doses for severe preeclampsia equal those for eclampsia, continued through labor and for 24 hours postpartum.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1624" },
    { book: "williams", text: "IM route is as effective as IV where infusion technology is lacking. A recurrent convulsion is treated with an additional 2 g as 20 percent solution given slowly IV (once in a small woman, up to twice in a larger one).", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1625" },
    { book: "williams", text: "Patellar reflexes disappear near 10 mEq/L and respiratory paralysis follows at 12 mEq/L or more. Calcium gluconate 1 g IV plus stopping magnesium reverses mild-moderate respiratory depression. Give the full 4 g load regardless of renal function; reduce only maintenance.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1627" },
    { book: "williams", text: "For fetal neuroprotection (BEAM trial, 24 to 31 weeks) a 6 g IV bolus over 20 to 30 minutes then 2 g/h was used; Parkland gives neuroprotection from 24 0/7 to 27 6/7 weeks.", ref: "Williams Obstetrics 25th ed. 2018, ch. 42 Preterm Birth, pdf p. 1825" },
    { book: "gabbe", text: "Eclampsia: IV loading 6 g over 15-20 min then 2 g/h infusion recommended; if no IV access, IM regimen of 10 g (5 g each buttock) then 5 g every 4 h.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 733" },
    { book: "gabbe", text: "Recurrent convulsion on magnesium: further 2 g IV bolus over 3-5 min; lorazepam 4 mg IV if seizures recur despite therapeutic magnesium.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 733" },
    { book: "gabbe", text: "Renal impairment (creatinine >1.2 mg/dL or urine <30 mL/h for >4 h): after 4-6 g load, maintenance only 1 g/h. Reflexes lost at 7 mEq/L, respiratory depression at 10 mEq/L; continue 24 h after delivery and last fit.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 733" },
    { book: "gabbe", text: "Fetal neuroprotection before 32 weeks: IV load 4-6 g over 30 min then 1-2 g/h; hourly reflexes and respiratory rate, calcium gluconate at hand.", ref: "Gabbe's Obstetrics 9th ed., ch. 36 Spontaneous Preterm Labor and Birth, p. 681" },
    { book: "nelson", text: "Asthma adjunct: magnesium sulfate 25–75 mg/kg IV over 20 min, maximum 2 g; flushing, headache, rare hypotension.", ref: "Nelson 22nd ed. 2024, ch. 185, p. 1406" },
    { book: "nelson", text: "Resuscitation/torsades: 25–50 mg/kg IV/IO, max 2 g, over 10–20 min (faster in torsades); can cause hypotension.", ref: "Nelson 22nd ed. 2024, Table 79.x Resuscitation drugs, p. 563" },
    { book: "nelson", text: "Hypomagnesaemia: 25–50 mg/kg (0.05–0.1 mL/kg of 50 %) as slow IV infusion; may be given IM in neonates.", ref: "Nelson 22nd ed. 2024, ch. 69 Electrolyte disorders, p. 505" },
    { book: "note", text: "Eclampsia regimens are obstetric and not covered in Nelson; see WHO sources.", ref: "Editorial note" },
    {book: "kaplan",text: "Magnesium is often low in heavy drinkers; low magnesium causes agitation, confusion and delirium, and untreated can lead to convulsions and coma.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 1 Examination and Diagnosis of the Psychiatric Patient, pdf p. 211"},
    {book: "kaplan",text: "Wernicke encephalopathy: thiamine 100 mg IV or IM given with magnesium sulfate before glucose loading.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, Table 25-12, pdf p. 2567"}
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "adrenaline",
  name: "Adrenaline (epinephrine)",
  aka: ["Epinephrine", "Adrenalin"],
  cls: "Catecholamine / vasopressor",
  cat: "emergency",
  wards: ["emergency", "maternity", "neonatal", "paediatric", "surgical", "icu", "outpatient"],
  tags: ["anaphylaxis", "cardiac arrest", "shock", "croup", "push-dose pressor"],
  presentation: [
    "1 mg/mL (1:1000) 1 mL ampoule — the only strength in most district hospitals.",
    "1:10 000 (0.1 mg/mL) prefilled syringes where available.",
    "Protect from light; discard if brown/pink."
  ],
  indications: ["Anaphylaxis", "Cardiac arrest", "Shock unresponsive to fluids (infusion)", "Croup (nebulised)", "Severe asthma with no inhaled route"],
  standard: {
    summary: "IM for anaphylaxis; IV/IO in arrest; pump infusion for shock.",
    items: [
      { label: "Anaphylaxis", text: "Adult 0.5 mg IM (0.5 mL of 1:1000) anterolateral thigh; child 0.01 mg/kg IM (max 0.5 mg). Repeat every 5–15 min if needed." },
      { label: "Cardiac arrest", text: "Adult 1 mg IV/IO every 3–5 min. Child 0.01 mg/kg = 0.1 mL/kg of 1:10 000 IV/IO." },
      { label: "Shock infusion (pump)", text: "0.05–0.5 mcg/kg/min, e.g. 4 mg in 250 mL (16 mcg/mL). Central line preferred." },
      { label: "Croup", text: "Nebulised 0.5 mL/kg of 1:1000 (max 5 mL) — observe 2–4 h for rebound." }
    ]
  },
  improvised: [
    {
      title: "Dilutions from the 1 mg/mL ampoule",
      best_for: "Making 1:10 000 for arrest/children and 1:100 000 'push-dose' for peri-arrest hypotension.",
      requires: ["iv"],
      steps: [
        "1:10 000 (100 mcg/mL): 1 mL of 1:1000 + 9 mL NS in a 10 mL syringe. Label it.",
        "1:100 000 'push-dose' (10 mcg/mL): 1 mL of the 1:10 000 + 9 mL NS in a new 10 mL syringe. Label it.",
        "Push-dose use (adult): 0.5–2 mL (5–20 mcg) IV every 2–5 min to bridge hypotension while fluids/infusion are set up.",
        "Never inject undiluted 1:1000 IV except when nothing else is possible in cardiac arrest (then flush with 20 mL)."
      ],
      monitor: ["BP/pulse every 2–5 min", "Site for extravasation"],
      cautions: ["Two syringes of different strengths on one trolley is a classic error — label large and bold, discard when done."]
    },
    {
      title: "Adrenaline infusion by gravity with a microdrip (no pump)",
      best_for: "Shock not responding to fluids, when a microdrip (60 gtt/mL) set and ideally a burette are available.",
      requires: ["iv", "micro_set", "burette"],
      steps: [
        "Add 4 mg (4 mL of 1:1000) to 250 mL NS → 16 mcg/mL. Label: “ADRENALINE 4 mg/250 mL — 16 mcg/mL”.",
        "With a 60 gtt/mL microdrip set, drops/min = mL/h.",
        "mL/h = dose (mcg/kg/min) × weight (kg) × 3.75. Example 70 kg at 0.1 mcg/kg/min = 26 mL/h = 26 drops/min (≈ 6–7 drops per 15 s).",
        "Start 0.05–0.1 mcg/kg/min and titrate every 5–10 min to MAP ≥ 65 mmHg / capillary refill < 3 s.",
        "Put only 1 hour of fluid in the burette so a free-running line cannot deliver a large bolus.",
        "Use a large proximal vein (antecubital or above), a dedicated line; never flush this line or piggy-back other drugs."
      ],
      monitor: ["BP every 5 min while titrating, then every 15 min", "Infusion site every hour for pallor/swelling", "Recount drops every 15–30 min"],
      cautions: ["Extravasation → stop, aspirate, elevate; phentolamine 5–10 mg in 10–15 mL NS infiltrated SC if available.", "Arrhythmias, hyperglycaemia, lactate rise."]
    },
    {
      title: "Paediatric ‘rule of 6’ (no pump)",
      best_for: "Children, when a standard concentration would need un-countable drop rates.",
      requires: ["iv", "micro_set", "burette"],
      steps: [
        "Add 0.6 × weight (kg) = mg of adrenaline to enough D5W/NS to make 100 mL total.",
        "Then 1 mL/h (= 1 drop/min on a microdrip) = 0.1 mcg/kg/min.",
        "Example 10 kg child: 6 mg (6 mL) in 94 mL NS. Run 1–5 drops/min for 0.1–0.5 mcg/kg/min.",
        "Discard the bag after 24 h. Label with the child's weight and the formula used."
      ],
      monitor: ["HR, BP, capillary refill every 15 min", "Site hourly"],
      cautions: ["Non-standard concentration: a bag made for one child must never be used for another."]
    },
    {
      title: "Anaphylaxis with minimal equipment",
      best_for: "Any setting. IM is first-line — do not delay for IV access.",
      requires: ["im"],
      steps: [
        "IM anterolateral thigh: > 12 y / adult 0.5 mL; 6–12 y 0.3 mL; < 6 y 0.15 mL (of 1:1000). Repeat after 5 min if no improvement.",
        "Lie flat, raise legs (sit up if breathing is the main problem). Oxygen if available. Fluids 20 mL/kg (child) / 500–1000 mL (adult) if hypotensive.",
        "Adjuncts after adrenaline: salbutamol for wheeze, hydrocortisone 200 mg IM/IV, chlorphenamine 10 mg IM/IV (not substitutes for adrenaline)."
      ],
      monitor: ["Airway, breathing, BP every 5 min; observe 6–12 h for biphasic reaction"],
      cautions: ["If no 1 mL syringe, a 2 mL syringe can still measure 0.5 mL; check the markings."]
    }
  ],
  paediatric: ["Child cardiac arrest: 0.01 mg/kg IV/IO (0.1 mL/kg of 1:10 000), maximum 1 mg, every 3–5 min.", "Newborn resuscitation (heart rate under 60 despite effective ventilation and compressions): 0.02 mg/kg IV/IO via the umbilical vein (0.2 mL/kg of 1:10 000) with a 3 mL saline flush, every 3–5 min; endotracheal 0.1 mg/kg only if there is no access (Nelson).", "Anaphylaxis: 0.01 mg/kg IM of 1:1000 (maximum 0.5 mg)."],
  cautions: ["IV adrenaline in a patient with a pulse causes hypertensive crisis/arrhythmia if given undiluted or too fast.", "Interacts with tricyclics, beta-blockers (unopposed alpha)."],
  calc: { type: "infusion", amount: 4, amountUnit: "mg", volumeMl: 250, doseUnit: "mcg/kg/min", range: [0.05, 0.5], defaultDose: 0.1, dropFactor: 60 },
  sources: [
    { name: "WHO Pocket Book of Hospital Care for Children, 2nd ed. 2013", url: "https://www.who.int/publications/i/item/978-92-4-154837-3" },
    { name: "Resuscitation Council UK. Emergency treatment of anaphylaxis, 2021" },
    { name: "Weingart S. Push-dose pressors for immediate blood pressure control. Clin Exp Emerg Med 2015" }
  ],
  textbook: [
    { book: "harrison", text: "Anaphylaxis: first-choice treatment is IM epinephrine 0.3-0.5 mL of the 1 mg/mL (1:1000) solution, repeated every 5-20 min as needed for severe reactions; delay beyond 20 min predicts poor outcome.", ref: "Harrison 22nd ed. 2025, ch. 364 Anaphylaxis, p. 2813" },
    { book: "harrison", text: "Cardiac arrest: epinephrine 1 mg IV or IO every 3-5 min once advanced life support access is established.", ref: "Harrison 22nd ed. 2025, ch. 317 Cardiovascular Collapse, Cardiac Arrest, and Sudden Cardiac Death, p. 2336" },
    { book: "harrison", text: "Septic shock: epinephrine is the third-line vasopressor after norepinephrine and vasopressin; it carries more tachyarrhythmia, ischaemia and acidosis than norepinephrine.", ref: "Harrison 22nd ed. 2025, ch. 315 Sepsis and Septic Shock, p. 2323" },
    { book: "nelson", text: "Anaphylaxis: epinephrine 1:1000, 0.01 mg/kg IM to the lateral thigh, maximum 0.5 mg; children ≥ 25 kg receive 0.3 mg, older adolescents 0.5 mg; repeat every 5–15 min if symptoms persist. IV epinephrine only if no response to multiple IM doses.", ref: "Nelson 22nd ed. 2024, ch. 190 Anaphylaxis, p. 1437" },
    { book: "nelson", text: "Post-arrest / cardiac output support: epinephrine infusion 0.01–1 μg/kg/min IV/IO (vasodilator at low, vasoconstrictor at medium–high doses). Infusion rate (mL/h) = weight (kg) × dose (μg/kg/min) × 60 ÷ concentration (μg/mL) — the formula used by this app's calculator.", ref: "Nelson 22nd ed. 2024, Table 79.7, p. 568" },
    { book: "nelson", text: "Croup: 5 mL of 1:1000 L-epinephrine nebulised is as effective and safe as racemic epinephrine; duration under 2 h, observe for rebound.", ref: "Nelson 22nd ed. 2024, ch. 433 Acute inflammatory upper airway obstruction, p. 2571" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "noradrenaline",
  name: "Noradrenaline (norepinephrine)",
  aka: ["Norepinephrine", "Levophed"],
  cls: "Vasopressor",
  cat: "cardio",
  wards: ["emergency", "surgical", "icu"],
  tags: ["septic shock", "vasopressor", "hypotension"],
  presentation: [
    "Ampoules usually labelled 4 mg/4 mL (1 mg/mL noradrenaline base = 2 mg/mL noradrenaline tartrate). Check whether your ampoule states the base or the salt — doses here are as base.",
    "Protect from light; discard if discoloured."
  ],
  indications: ["Septic shock and other vasodilatory shock after fluid resuscitation", "Post-arrest hypotension"],
  standard: {
    summary: "Continuous pump infusion, central line preferred.",
    items: [
      { label: "Infusion (pump)", text: "4 mg in 250 mL D5W or NS (16 mcg/mL). Start 0.05–0.1 mcg/kg/min, titrate to MAP ≥ 65 mmHg; usual range 0.05–0.5 mcg/kg/min (higher doses used)." }
    ]
  },
  improvised: [
    {
      title: "Peripheral gravity infusion with a microdrip and burette",
      best_for: "District hospital without pumps or central lines. Dilute peripheral noradrenaline through a large proximal vein is acceptable for 24–48 h.",
      requires: ["iv", "micro_set", "burette"],
      steps: [
        "4 mg in 250 mL NS → 16 mcg/mL. Label bag and line: “NORADRENALINE — do not flush, do not piggy-back”.",
        "Cannula 18–20 G in the antecubital fossa or more proximal (not hand/wrist/foot); confirm free flow of saline first.",
        "Microdrip set: drops/min = mL/h. mL/h = dose (mcg/kg/min) × kg × 3.75.",
        "Quick table at 0.1 mcg/kg/min: 50 kg → 19; 60 kg → 23; 70 kg → 26; 80 kg → 30 drops/min (microdrip).",
        "Fill the burette with ≤ 1 hour of volume. Titrate by 3–5 drops/min every 5–10 min to MAP ≥ 65.",
        "If dose exceeds ~0.3 mcg/kg/min or infusion > 48 h, arrange central access/referral if at all possible."
      ],
      monitor: ["BP every 5 min while titrating, then every 15 min (manual cuff is acceptable)", "Infusion site EVERY HOUR — pallor, blanching, pain, swelling", "Urine output hourly", "Recount drops every 15–30 min; retighten after any movement"],
      cautions: [
        "Extravasation: stop the infusion, aspirate through the cannula, elevate limb, infiltrate phentolamine 5–10 mg in 10–15 mL NS around the site within 12 h. If unavailable: terbutaline 1 mg in 10 mL SC or topical nitroglycerin 2 % (verify). Restart in another limb.",
        "Never disconnect and flush the line — the dead-space contains a bolus."
      ]
    },
    {
      title: "Lower concentration for a standard (20 gtt/mL) set only",
      best_for: "When no microdrip set exists. Trades volume for countable drop rates.",
      requires: ["iv", "macro_set"],
      steps: [
        "4 mg in 1 L NS → 4 mcg/mL.",
        "mL/h = dose (mcg/kg/min) × kg × 15. Drops/min (20 gtt/mL) = mL/h ÷ 3.",
        "Example 70 kg at 0.1 mcg/kg/min: 105 mL/h = 35 drops/min (≈ 9 drops per 15 s).",
        "This delivers ≈ 2.5 L/day — acceptable short-term in septic shock, not in fluid overload or cardiogenic shock."
      ],
      monitor: ["As above; plus signs of fluid overload (rising RR, crackles, JVP)"],
      cautions: ["Change to the 250 mL preparation as soon as a microdrip set is obtained."]
    },
    {
      title: "Bridge while preparing the infusion",
      best_for: "Profound hypotension for a few minutes.",
      requires: ["iv"],
      steps: ["Use push-dose adrenaline 5–20 mcg IV every 2–5 min (see Adrenaline → dilutions) — noradrenaline is not usually given as a bolus."],
      monitor: ["BP every 2 min"],
      cautions: []
    }
  ],
  cautions: ["Give only after adequate fluid resuscitation (or concurrently if severe).", "Tissue necrosis on extravasation.", "Reflex bradycardia; arrhythmias with high doses."],
  calc: { type: "infusion", amount: 4, amountUnit: "mg", volumeMl: 250, doseUnit: "mcg/kg/min", range: [0.05, 0.5], defaultDose: 0.1, dropFactor: 60 },
  sources: [
    { name: "Surviving Sepsis Campaign guidelines 2021 (peripheral vasopressors acceptable short-term)" },
    { name: "Tian DH et al. Safety of peripheral administration of vasopressor medications: a systematic review. Emerg Med Australas 2020" },
    { name: "MSF Clinical Guidelines, Shock chapter" }
  ],
  textbook: [
    { book: "harrison", text: "Septic shock: after adequate fluids, start a continuous norepinephrine infusion as first-line vasopressor targeting MAP of at least 65 mmHg; add vasopressin second, epinephrine third.", ref: "Harrison 22nd ed. 2025, ch. 315 Sepsis and Septic Shock, p. 2323" },
    { book: "harrison", text: "Norepinephrine is the first-choice vasopressor in septic (distributive) shock because of its alpha-1 and beta-1 effects.", ref: "Harrison 22nd ed. 2025, ch. 314 Approach to the Patient with Shock, p. 2315" },
    { book: "nelson", text: "Shock: norepinephrine 0.05–2.0 μg/kg/min — potent vasoconstriction, raises BP via systemic vascular resistance; contractility gain may be blunted by afterload.", ref: "Nelson 22nd ed. 2024, ch. 85 Shock, Table (vasoactive agents), p. 610" },
    { book: "nelson", text: "Post-arrest table lists norepinephrine 0.01–1 μg/kg/min IV/IO as vasopressor with weak inotropy.", ref: "Nelson 22nd ed. 2024, Table 79.7, p. 568" },
    { book: "note", text: "Nelson does not describe peripheral gravity administration; the peripheral-line method in this app follows Surviving Sepsis 2021 and MSF practice.", ref: "Editorial note" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "dopamine",
  name: "Dopamine",
  aka: [],
  cls: "Inotrope / vasopressor",
  cat: "cardio",
  wards: ["emergency", "neonatal", "paediatric", "icu"],
  tags: ["shock", "inotrope"],
  presentation: ["200 mg/5 mL (40 mg/mL) ampoule.", "Also 800 mg/5 mL — check strength."],
  indications: ["Shock when noradrenaline/adrenaline unavailable", "Paediatric septic shock (where used)"],
  standard: {
    summary: "Pump infusion; noradrenaline is preferred in adult septic shock (fewer arrhythmias, lower mortality).",
    items: [{ label: "Infusion (pump)", text: "200 mg in 250 mL NS/D5W (800 mcg/mL). 5–20 mcg/kg/min, titrate every 5–10 min." }]
  },
  improvised: [
    {
      title: "Gravity infusion with microdrip",
      best_for: "When dopamine is the only vasoactive drug available.",
      requires: ["iv", "micro_set", "burette"],
      steps: [
        "200 mg (5 mL) in 250 mL NS → 800 mcg/mL. Label.",
        "mL/h = dose (mcg/kg/min) × kg × 0.075. Microdrip: drops/min = mL/h.",
        "Example 70 kg at 10 mcg/kg/min: 52.5 mL/h ≈ 53 drops/min (≈ 13 per 15 s).",
        "Burette with ≤ 1 h volume; large vein; dedicated line."
      ],
      monitor: ["BP/HR every 5–15 min", "Site hourly", "Arrhythmias (pulse regularity)"],
      cautions: ["Extravasation: as for noradrenaline."]
    },
    {
      title: "Paediatric ‘rule of 6’ (dopamine/dobutamine)",
      best_for: "Children without a pump.",
      requires: ["iv", "micro_set", "burette"],
      steps: [
        "6 × weight (kg) = mg of dopamine added to make 100 mL total. Then 1 mL/h (1 drop/min microdrip) = 1 mcg/kg/min.",
        "Example 8 kg: 48 mg (1.2 mL) made up to 100 mL. 5–10 drops/min = 5–10 mcg/kg/min.",
        "Label with weight; discard after 24 h."
      ],
      monitor: ["HR, BP, perfusion every 15 min"],
      cautions: ["Non-standard concentration — single-patient bag."]
    }
  ],
  cautions: ["Tachyarrhythmias; tissue necrosis on extravasation; do not mix with bicarbonate (inactivated)."],
  calc: { type: "infusion", amount: 200, amountUnit: "mg", volumeMl: 250, doseUnit: "mcg/kg/min", range: [2, 20], defaultDose: 5, dropFactor: 60 },
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "De Backer D et al. Dopamine versus norepinephrine in shock. NEJM 2010" }],
  textbook: [
    { book: "harrison", text: "Dopamine has no first-line role in distributive shock; a trial showed no survival benefit, more arrhythmias, and higher mortality in the cardiogenic shock subgroup.", ref: "Harrison 22nd ed. 2025, ch. 314 Approach to the Patient with Shock, p. 2315" },
    { book: "harrison", text: "Cardiogenic shock guideline algorithm: when a vasopressor is needed for persistent hypotension, norepinephrine is preferable to dopamine.", ref: "Harrison 22nd ed. 2025, ch. 316 Cardiogenic Shock and Pulmonary Edema, p. 2328" },
    { book: "nelson", text: "Dopamine 3–20 μg/kg/min raises contractility; risk of arrhythmias at high doses; significant peripheral vasoconstriction above 10 μg/kg/min.", ref: "Nelson 22nd ed. 2024, ch. 85 Shock, p. 610" },
    { book: "nelson", text: "Post-arrest: dopamine 2–20 μg/kg/min IV/IO — inotrope/chronotrope, vasodilator at low and vasoconstrictor at high doses.", ref: "Nelson 22nd ed. 2024, Table 79.7, p. 568" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "insulin-soluble",
  name: "Insulin, soluble (regular)",
  aka: ["Actrapid", "Humulin R", "regular insulin"],
  cls: "Hormone",
  cat: "endocrine",
  wards: ["emergency", "paediatric", "medical", "icu"],
  tags: ["DKA", "diabetic ketoacidosis", "hyperkalaemia", "HHS"],
  presentation: [
    "100 IU/mL, 10 mL vial. Use U-100 insulin syringes only (a 1 mL tuberculin syringe is NOT the same scale).",
    "Keep cool (fridge; if none, a clay pot cooler / cool bag). Unopened vials tolerate up to 25–30 °C for ~4 weeks."
  ],
  indications: ["Diabetic ketoacidosis (DKA)", "Hyperosmolar hyperglycaemic state", "Hyperkalaemia (with glucose)"],
  standard: {
    summary: "Fixed-rate IV infusion by syringe driver (50 units in 50 mL NS).",
    items: [
      { label: "DKA (adult)", text: "0.1 unit/kg/h IV infusion. Start after first litre of fluid; continue until ketones cleared/acidosis resolved; add 10 % glucose when glucose < 14 mmol/L (250 mg/dL)." },
      { label: "DKA (child)", text: "0.05–0.1 unit/kg/h IV, starting 1 hour after fluids. No bolus." },
      { label: "Hyperkalaemia", text: "10 units IV with 25 g glucose (50 mL of 50 %) over 15–30 min." }
    ]
  },
  improvised: [
    {
      title: "Hourly IM regular insulin (no pump) — DKA",
      best_for: "Any hospital. Well-established alternative in adults and children.",
      requires: ["im", "syringe_1ml", "glucometer"],
      steps: [
        "Resuscitate with fluids first (NS 15–20 mL/kg in first hour in adults; children 10 mL/kg over 1 h unless shocked). Check potassium if possible.",
        "Adults: optional initial 0.1 unit/kg IV (or IM) then 0.1 unit/kg IM EVERY HOUR into the deltoid or thigh (not into oedematous or poorly perfused tissue). Children: no bolus; 0.1 unit/kg IM hourly starting 1 h after fluids.",
        "Check glucose hourly. Target fall 3–4 mmol/L per hour (50–70 mg/dL). If glucose is not falling after 2 doses: check hydration, re-check the insulin, and double the hourly dose.",
        "When glucose < 14 mmol/L (250 mg/dL): change fluids to 5 % glucose (with NS) and CONTINUE hourly insulin (do not stop — it clears ketones).",
        "Stop when acidosis resolved (bicarbonate > 18, pH > 7.3, ketones negative) and the patient is eating: give SC insulin and stop IM 1–2 h later.",
        "If IM impossible (thin, shocked): SC 0.1 unit/kg every 1–2 h, but absorption is unreliable in shock."
      ],
      monitor: ["Glucose hourly", "Potassium every 2–4 h if available; if not, ECG or watch for weakness/arrhythmia", "Fluid balance, level of consciousness (cerebral oedema in children)", "Ketones (urine) 2–4 hourly"],
      cautions: [
        "POTASSIUM: hold insulin if K < 3.3 mmol/L (give K first). Once potassium is 3.3–5.0 mmol/L and the patient is passing urine, add potassium to every litre — Harrison uses 10–20 mmol/L, other protocols up to 40 mmol/L when potassium is at the low end. Above 5.0, give no potassium yet and recheck in 2 h.",
        "Where no potassium result is possible, most protocols still add 20 mmol/L after the first litre if urine output is good — verify local protocol."
      ]
    },
    {
      title: "Gravity IV infusion of insulin (with burette)",
      best_for: "When a burette and good drop counting are available and IM is impractical.",
      requires: ["iv", "burette", "glucometer"],
      steps: [
        "50 units in 500 mL NS → 0.1 unit/mL. Flush 50 mL of the mixture through the tubing and discard (insulin adsorbs to plastic).",
        "mL/h = units/h × 10. Example 60 kg at 0.1 unit/kg/h = 6 units/h = 60 mL/h → 20 drops/min (20 gtt/mL) or 60 drops/min (microdrip).",
        "Burette with 1 h of volume. Recount every 15–30 min.",
        "Run the rehydration fluid through a SEPARATE line."
      ],
      monitor: ["Glucose hourly", "Potassium as above"],
      cautions: ["Gravity insulin rates drift; convert to IM regimen if staffing is thin."]
    },
    {
      title: "Hyperkalaemia without 50 % glucose",
      best_for: "K ≥ 6.5 mmol/L or ECG changes.",
      requires: ["iv", "glucometer"],
      steps: [
        "Give calcium first if ECG changes (see Calcium gluconate).",
        "10 units soluble insulin IV with 250 mL of 10 % glucose over 15–30 min (= 25 g), or 50 mL of 50 %.",
        "If only 5 % glucose: 500 mL D5 over 30–60 min with 10 units insulin (hypoglycaemia risk higher; check glucose every 30 min).",
        "Add nebulised salbutamol 10–20 mg (adult) / 2.5–5 mg (child). Check glucose every 30 min for 6 h."
      ],
      monitor: ["Glucose every 30 min for 6 h", "ECG/pulse"],
      cautions: ["Rebound hypokalaemia is not a problem; hypoglycaemia is — especially in renal failure."]
    }
  ],
  paediatric: [
    "Start insulin 1 h after starting fluids; never bolus. 0.05–0.1 unit/kg/h (0.1 unit/kg IM hourly).",
    "Cerebral oedema: headache, falling HR, rising BP, drowsiness → raise head, reduce fluids by one third, mannitol 0.5–1 g/kg IV over 10–20 min or 3 % saline 2.5–5 mL/kg."
  ],
  cautions: ["Hypokalaemia, hypoglycaemia, cerebral oedema (children)."],
  calc: { type: "weight", dosePerKg: 0.1, doseUnit: "units", conc: 100, concUnit: "units/mL", label: "IM hourly dose (0.1 unit/kg)" },
  sources: [
    { name: "Kitabchi AE et al. Hyperglycemic crises in adult patients with diabetes. Diabetes Care 2009 (IM/SC alternatives)" },
    { name: "ISPAD Clinical Practice Consensus Guidelines 2022: DKA and HHS" },
    { name: "MSF Clinical Guidelines; WHO Pocket Book 2013" }
  ],
  textbook: [
    { book: "harrison", text: "DKA: regular insulin 0.1 units/kg IV bolus, then 0.1 units/kg/h continuous IV infusion; increase two- to threefold if no response by 2-4 h.", ref: "Harrison 22nd ed. 2025, ch. 416 Diabetes Mellitus: Management and Therapies, p. 3218" },
    { book: "harrison", text: "DKA: if initial potassium is below 3.3 mmol/L, withhold insulin until potassium has been corrected.", ref: "Harrison 22nd ed. 2025, ch. 416 Diabetes Mellitus: Management and Therapies, p. 3218" },
    { book: "harrison", text: "Mild to moderate DKA may be treated with SC rapid-acting analogue 0.1 unit/kg then 0.1 unit/kg hourly or 0.2 unit/kg every 2 h, with close monitoring; continue insulin with 5-10% dextrose.", ref: "Harrison 22nd ed. 2025, ch. 416 Diabetes Mellitus: Management and Therapies, p. 3218" },
    { book: "harrison", text: "Hyperkalaemia: 10 units IV regular insulin followed immediately by 50 mL of 50% dextrose (25 g); onset 10-20 min, lasts 4-6 h; follow with 10% dextrose 50-75 mL/h.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 361" },
    { book: "williams", text: "DKA in pregnancy (Table 57-7): low-dose IV insulin with 0.2 to 0.4 U/kg loading dose then 2 to 10 U/h; isotonic saline 1 L in first hour, 4 to 6 L over 12 hours; add 5 percent dextrose when glucose reaches 250 mg/dL.", ref: "Williams Obstetrics 25th ed. 2018, ch. 57 Diabetes Mellitus, pdf p. 2448" },
    { book: "williams", text: "Pregnant women develop ketoacidosis at lower glucose levels than nonpregnant women; vigorous crystalloid rehydration is a cornerstone.", ref: "Williams Obstetrics 25th ed. 2018, ch. 57 Diabetes Mellitus, pdf p. 2448" },
    { book: "gabbe", text: "DKA in pregnancy: regular insulin IV, consider 0.1-0.2 U/kg bolus, infusion 0.1 U/kg/h; at glucose 200 mg/dL reduce to 0.05-0.1 U/kg/h and switch to D5 0.45% saline.", ref: "Gabbe's Obstetrics 9th ed., ch. 45 Diabetes Mellitus Complicating Pregnancy, p. 878" },
    { book: "gabbe", text: "Pregnant women can develop DKA at glucose below 200 mg/dL (euglycaemic DKA); pH ≤7.3 confirms.", ref: "Gabbe's Obstetrics 9th ed., ch. 45 Diabetes Mellitus Complicating Pregnancy, p. 878" },
    { book: "nelson", text: "DKA: continuous IV insulin infusion at 0.05–0.1 unit/kg/h starting 1 hour after fluids are begun; this approximates maximal physiological insulin output. Hourly glucose, neurological status at least hourly, electrolytes every 2 h, ECG for T-wave changes.", ref: "Nelson 22nd ed. 2024, ch. 629 Diabetes mellitus, Fig. 629.5 and text, pp. 3525–3526" },
    { book: "nelson", text: "Hyperosmolar hyperglycaemic state: start insulin after the initial fluid bolus only when glucose no longer falls with fluid alone; 0.025–0.05 unit/kg/h titrated to a fall of 50–75 mg/dL/h (2.8–4.2 mmol/L/h).", ref: "Nelson 22nd ed. 2024, ch. 629, p. 3528" },
    { book: "nelson", text: "Transition to subcutaneous insulin when DKA has resolved (total CO2 > 15 mEq/L, pH > 7.30, sodium stable, anion gap closed, no vomiting): give long-acting insulin, stop the drip about 30 min later.", ref: "Nelson 22nd ed. 2024, ch. 629, p. 3527" },
    { book: "nelson", text: "Hyperkalaemia (K > 7 or ECG changes): regular insulin 0.1 unit/kg with 50 % glucose 1 mL/kg over 1 hour, together with calcium gluconate and bicarbonate.", ref: "Nelson 22nd ed. 2024, ch. 573 Renal failure, p. 3245" },
    { book: "note", text: "Nelson describes IV infusion only for DKA. The hourly IM regimen in this app is from ADA (Kitabchi 2009) and ISPAD 2022 low-resource guidance.", ref: "Editorial note" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "potassium-chloride",
  name: "Potassium chloride",
  aka: ["KCl"],
  cls: "Electrolyte",
  cat: "electrolyte",
  wards: ["emergency", "paediatric", "medical", "surgical", "icu"],
  tags: ["hypokalaemia", "potassium"],
  presentation: [
    "15 % KCl: 2 mmol/mL — 10 mL ampoule = 20 mmol.",
    "20 % KCl: 2.68 mmol/mL — 10 mL = 26.8 mmol. 7.45 %: 1 mmol/mL.",
    "Oral: 600 mg tablets (8 mmol); syrup; 1 g KCl ≈ 13 mmol."
  ],
  indications: ["Hypokalaemia", "Potassium replacement in DKA and rehydration"],
  standard: {
    summary: "Premixed bags via pump; peripheral maximum 40 mmol/L and 10 mmol/h; central line with ECG for faster rates.",
    items: [
      { label: "Peripheral IV", text: "Max 40 mmol/L, max 10 mmol/h (20 mmol in 500 mL over 2 h)." },
      { label: "Central + ECG", text: "Up to 20 mmol/h (40 mmol in 100 mL via pump) for K < 2.5 with arrhythmia/paralysis." },
      { label: "Never", text: "Never IV push. Never add to a hanging bag." }
    ]
  },
  improvised: [
    {
      title: "Oral replacement first",
      best_for: "K 2.5–3.5 mmol/L without ECG changes or symptoms; anyone who can swallow.",
      requires: ["oral"],
      steps: [
        "20–40 mmol oral 2–3 times a day (e.g. 3–5 tablets of 600 mg, or syrup) with food/water — total 40–100 mmol/day. Recheck K next day.",
        "If no potassium preparation: ORS contains 20 mmol/L; a 1 L per day plus potassium-rich food (bananas, oranges, coconut water, beans) is an adjunct only."
      ],
      monitor: ["K daily if possible; symptoms (weakness, palpitations)"],
      cautions: ["GI upset; caution renal impairment, ACE inhibitors/spironolactone."]
    },
    {
      title: "Peripheral gravity infusion — the safe way to mix and run",
      best_for: "Moderate hypokalaemia, DKA, or when oral impossible.",
      requires: ["iv", "macro_set"],
      steps: [
        "Take the bag DOWN from the stand. Inject 20 mmol (10 mL of 15 %) through the additive port of a 500 mL 0.9 % saline bag — NOT dextrose, whose insulin surge drives potassium into cells and can worsen hypokalaemia acutely (Harrison) — (= 40 mmol/L, the peripheral maximum). Invert the bag 10 times. Label boldly: “KCl 20 mmol added — DO NOT BOLUS”.",
        "Run over 2–4 h (5–10 mmol/h) = 125–250 mL/h = 42–83 drops/min with a 20 gtt/mL set.",
        "Use a burette if available and fill 1 h at a time.",
        "Recheck K after every 40 mmol given (or at least daily where labs are scarce)."
      ],
      monitor: ["Drop rate every 30 min", "Pain/phlebitis at site (slow rate or larger vein)", "Urine output — stop if anuric"],
      cautions: [
        "NEVER add KCl to a hanging bag: it layers at the bottom and delivers a concentrated bolus.",
        "Without ECG monitoring, do not exceed 10 mmol/h."
      ]
    },
    {
      title: "Severe hypokalaemia (< 2.5, arrhythmia/paralysis) without central line or pump",
      best_for: "Life-threatening K with limited equipment.",
      requires: ["iv", "burette", "ecg"],
      steps: [
        "With ECG monitoring only: 20 mmol in 100 mL NS via burette over 1 h (20 mmol/h) through a large antecubital or femoral vein — 100 drops/min microdrip or 33 drops/min macro. Repeat with K check each hour.",
        "Without ECG: 10 mmol/h maximum (regimen above) plus oral 40 mmol at once if able to swallow; refer.",
        "Correct magnesium as well (MgSO4 2 g IV over 20 min) — hypokalaemia is refractory without it."
      ],
      monitor: ["Continuous ECG", "K hourly"],
      cautions: ["Concentrated potassium via a small peripheral vein causes severe pain and phlebitis."]
    }
  ],
  paediatric: [
    "Oral 2–4 mmol/kg/day in divided doses. IV: 0.2–0.3 mmol/kg/h (max 0.5 mmol/kg/h only with ECG), concentration ≤ 40 mmol/L peripherally.",
    "Severe malnutrition: use ReSoMal and F-75 (contain potassium); avoid rapid IV potassium."
  ],
  cautions: ["Fatal arrhythmia with rapid IV. Renal failure: halve rates, monitor."],
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "BNF: potassium chloride IV administration" }, { name: "MSF Essential Drugs" }],
  textbook: [
    { book: "harrison", text: "Peripheral IV KCl is usually 20-40 mmol per litre; higher concentrations cause phlebitis. Severe (<2.5) or critical hypokalaemia: central vein with cardiac monitoring at 10-20 mmol/h, limited amounts such as 20 mmol in 100 mL saline.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 357" },
    { book: "harrison", text: "IV KCl should always be given in saline, not dextrose, because dextrose-induced insulin release can acutely worsen hypokalaemia.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 357" },
    { book: "harrison", text: "Reserve IV potassium for patients who cannot use the enteral route or have paralysis/arrhythmia; replace deficits gradually over 24-48 h with frequent potassium checks.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 357" },
    { book: "schwartz", text: "Oral repletion suffices for mild asymptomatic hypokalaemia; IV usually no more than 10 mEq/h unmonitored, up to 40 mEq/h with continuous ECG; caution with oliguria or renal impairment.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 3 Fluid and Electrolyte Management of the Surgical Patient, p. 95" },
    { book: "schwartz", text: "Protocol (K <4.0): enteral KCl 40 mEq once; not tolerating enteral, 20 mEq IV q2h x2; symptomatic, 20 mEq IV q1h x4; recheck 2 h after infusion.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 3 Fluid and Electrolyte Management of the Surgical Patient, p. 96" },
    { book: "schwartz", text: "Correct hypomagnesaemia, otherwise potassium repletion is difficult.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 3 Fluid and Electrolyte Management of the Surgical Patient, p. 90" },
    { book: "nelson", text: "DKA/HHS protocol: when serum K+ is below 5 mEq/L, begin replacement with 40 mEq/L of potassium in the IV fluids; monitor electrolytes every 2–4 h.", ref: "Nelson 22nd ed. 2024, ch. 629, Fig. 629.5/Table, p. 3526" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "salbutamol",
  name: "Salbutamol (albuterol)",
  aka: ["Albuterol", "Ventolin"],
  cls: "β2-agonist bronchodilator",
  cat: "respiratory",
  wards: ["emergency", "paediatric", "medical", "outpatient"],
  tags: ["asthma", "wheeze", "bronchospasm", "hyperkalaemia"],
  presentation: ["MDI 100 mcg/puff.", "Nebuliser solution 5 mg/mL (0.5 %) or 2.5 mg/2.5 mL nebules.", "Oral tablets/syrup (not for acute attacks)."],
  indications: ["Acute asthma / wheeze", "Hyperkalaemia (adjunct)"],
  standard: {
    summary: "Oxygen-driven nebulisation.",
    items: [
      { label: "Nebulised", text: "Adult 5 mg; child 2.5 mg (5 mg if > 5 y/20 kg) driven by oxygen 6–8 L/min. Every 20 min × 3 in the first hour, then 1–4 hourly. Add ipratropium 250–500 mcg in severe attacks." },
      { label: "Steroid", text: "Prednisolone 1 mg/kg oral (max 40–60 mg) for 3–5 days; or hydrocortisone 4 mg/kg (max 100–200 mg) IV/IM if vomiting." }
    ]
  },
  improvised: [
    {
      title: "MDI with a home-made bottle spacer (WHO)",
      best_for: "Any setting with an inhaler but no nebuliser. As effective as a nebuliser for most attacks.",
      requires: ["mdi"],
      steps: [
        "Take a clean 500 mL plastic bottle. Cut/heat a hole in the base to fit the MDI mouthpiece tightly (seal gaps with tape). The patient breathes from the bottle's mouth. For infants, fit a cup/mask over the bottle mouth or use a 200 mL cup with a hole cut for the MDI.",
        "Shake the MDI. Fire 1 puff into the spacer, then the patient takes 4–6 normal breaths. Repeat puff-by-puff.",
        "Dose: child 2–6 puffs (start with 2, WHO), adult 4–10 puffs, every 20 min for the first hour, then every 1–4 h as needed. 10 puffs via spacer ≈ one 5 mg nebulisation.",
        "Prime a new bottle spacer by firing 10 puffs into it (reduces static)."
      ],
      monitor: ["RR, wheeze, ability to talk, SpO2 if available; reassess after each round"],
      cautions: ["Tremor and tachycardia are expected; hypokalaemia with repeated doses."]
    },
    {
      title: "Nebuliser without oxygen",
      best_for: "Electric or foot-pump compressor nebuliser but no oxygen.",
      requires: ["neb"],
      steps: ["Nebulise with air-driven compressor at the same doses; give oxygen by nasal prongs simultaneously if any is available (1–2 L/min)."],
      monitor: ["SpO2, RR"],
      cautions: []
    },
    {
      title: "No inhaled route at all — subcutaneous adrenaline",
      best_for: "Severe attack with no MDI or nebuliser (WHO Pocket Book).",
      requires: ["syringe_1ml"],
      steps: [
        "Adrenaline 1:1000 SC 0.01 mL/kg (max 0.3 mL child, 0.3–0.5 mL adult). Repeat every 20 min up to 3 doses.",
        "Or terbutaline 0.25 mg SC (adult), 0.01 mg/kg (child), repeat once after 20 min.",
        "Give steroid. Consider aminophylline (see entry) for life-threatening attacks."
      ],
      monitor: ["HR, BP every 10 min"],
      cautions: ["Elderly/ischaemic heart disease: use with care."]
    }
  ],
  paediatric: ["Infants < 1 y: bronchiolitis rarely responds to salbutamol — trial one dose only.", "Oral salbutamol is a last resort (slow onset, more side-effects)."],
  cautions: ["Look for pneumothorax if sudden deterioration.", "Sedation contraindicated."],
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013, ch. 4 (spacer instructions)" }, { name: "GINA 2024; BTS/SIGN asthma guideline" }],
  textbook: [
    { book: "harrison", text: "Hyperkalaemia: nebulised albuterol 10-20 mg in 4 mL saline over 10 min; onset ~30 min, peak ~90 min; about 20% of ESRD patients do not respond, so use with insulin-glucose.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 361" },
    { book: "harrison", text: "Asthma attack in urgent care: nebulised beta2-agonist up to every 20 min; IV corticosteroids if no response in 1-2 h; oxygen for hypoxaemia; nebulised anticholinergic may add bronchodilation.", ref: "Harrison 22nd ed. 2025, ch. 298 Asthma, p. 2227" },
    { book: "nelson", text: "Acute asthma: albuterol MDI (90 μg/puff) 2–8 puffs with spacer/holding chamber, as often as every 20 min for 3 doses, then every 1–4 h as needed. Nebulised: 0.15 mg/kg (minimum 2.5 mg) every 20 min × 3, then 0.15–0.3 mg/kg (max 10 mg) every 1–4 h, or continuous 0.5 mg/kg/h.", ref: "Nelson 22nd ed. 2024, ch. 185 Childhood asthma, Table 185.x (ED/hospital management), p. 1405" },
    { book: "nelson", text: "Adjuncts: magnesium sulfate 25–75 mg/kg IV over 20 min (max 2 g); terbutaline IV 2–10 μg/kg loading then 0.1–0.4 μg/kg/min where available.", ref: "Nelson 22nd ed. 2024, ch. 185, p. 1406" },
    { book: "nelson", text: "Home action plan: 2–4 puffs (or nebuliser) every 20 min up to 3 times in 1 hour, then reassess.", ref: "Nelson 22nd ed. 2024, ch. 185, Fig. (asthma action plan), p. 1407" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "aminophylline",
  name: "Aminophylline",
  aka: ["Theophylline ethylenediamine"],
  cls: "Methylxanthine bronchodilator",
  cat: "respiratory",
  wards: ["emergency", "neonatal", "paediatric", "medical"],
  tags: ["asthma", "apnoea of prematurity"],
  presentation: ["250 mg/10 mL (25 mg/mL) ampoule."],
  indications: ["Severe asthma not responding to β2-agonists and steroids", "Apnoea of prematurity (where caffeine unavailable)"],
  standard: {
    summary: "Loading dose then continuous infusion with level monitoring.",
    items: [
      { label: "Loading", text: "5–6 mg/kg IV over 20–30 min (omit if oral theophylline in last 24 h). Adult max ~500 mg (use ideal body weight)." },
      { label: "Maintenance (pump)", text: "Adult 0.5 mg/kg/h; child 1–9 y 1 mg/kg/h, 10–16 y 0.8 mg/kg/h. Serum levels at 12–24 h." }
    ]
  },
  improvised: [
    {
      title: "Intermittent 6-hourly dosing instead of infusion (WHO Pocket Book)",
      best_for: "No pump, no theophylline levels.",
      requires: ["iv", "burette"],
      steps: [
        "Loading: 5–6 mg/kg (max 300 mg child; ~500 mg adult) diluted in 20–50 mL NS in the burette, run over 20–60 min. If no burette: slow IV push over 20 min by the clock, diluted in a 20 mL syringe.",
        "Maintenance: 5 mg/kg IV every 6 h (child, WHO). Adults: 3–5 mg/kg every 6 h (lower end for elderly, heart failure, liver disease, or on erythromycin/ciprofloxacin). Each dose over 20–30 min.",
        "Stop and reassess if vomiting, pulse > 140 (adult) / > 180 (child), tremor, arrhythmia or seizure."
      ],
      monitor: ["Pulse before every dose", "Signs of toxicity: vomiting, agitation, arrhythmia, seizures"],
      cautions: ["Narrow therapeutic index; seizures may be the first sign of toxicity. Never IV push fast."]
    }
  ],
  paediatric: ["Apnoea of prematurity: 6 mg/kg loading, then 2.5 mg/kg every 12 h in the first week of life and 4 mg/kg every 12 h from week 2 to 4 (WHO) — oral or IV."],
  cautions: ["Interactions: macrolides, ciprofloxacin, cimetidine raise levels; rifampicin, smoking lower them."],
  calc: { type: "weight", dosePerKg: 5, doseUnit: "mg", conc: 25, concUnit: "mg/mL", maxDose: 500, label: "Loading / 6-hourly dose (5 mg/kg)" },
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013, p. 98–99" }, { name: "BNF: aminophylline" }],
  textbook: [
    { book: "harrison", text: "Theophylline is now rarely used for asthma because of its narrow therapeutic window, drug interactions and weaker bronchodilation than other agents.", ref: "Harrison 22nd ed. 2025, ch. 298 Asthma, p. 2224" },
    { book: "harrison", text: "Severe theophylline poisoning: multiple-dose activated charcoal and haemodialysis should be considered.", ref: "Harrison 22nd ed. 2025, ch. 470 Poisoning and Drug Overdose, p. 3709" },
    { book: "note", text: "Nelson's acute asthma table lists IV terbutaline, not aminophylline, as the parenteral bronchodilator; theophylline is not part of the recommended emergency regimen in the US. Aminophylline remains on the WHO EML for settings without IV β2-agonists.", ref: "Editorial note" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "gentamicin",
  name: "Gentamicin",
  aka: [],
  cls: "Aminoglycoside antibiotic",
  cat: "infection",
  wards: ["maternity", "neonatal", "paediatric", "medical", "surgical", "outpatient"],
  tags: ["sepsis", "neonatal sepsis", "pneumonia", "PSBI"],
  presentation: ["40 mg/mL (2 mL = 80 mg).", "10 mg/mL paediatric; 20 mg/2 mL."],
  indications: ["Neonatal and childhood sepsis (with ampicillin/benzylpenicillin)", "Severe pneumonia", "Pyelonephritis, intra-abdominal sepsis (with other agents)"],
  standard: {
    summary: "Once-daily IV with levels and renal monitoring.",
    items: [
      { label: "Adult", text: "5–7 mg/kg IV once daily (ideal body weight if obese); adjust to renal function and levels." },
      { label: "Child > 1 month", text: "7.5 mg/kg IV/IM once daily (WHO)." },
      { label: "Neonate", text: "First week of life: low birth weight 3 mg/kg once daily; normal weight 5 mg/kg once daily. Age > 7 days: 7.5 mg/kg once daily (WHO)." }
    ]
  },
  improvised: [
    {
      title: "IM once daily (no IV access)",
      best_for: "Health-centre level; WHO outpatient regimen for young infants when referral is impossible.",
      requires: ["im"],
      steps: [
        "Same dose IM into the anterolateral thigh (not the buttock in infants).",
        "Young infant with possible serious bacterial infection (PSBI) when referral is refused/impossible: gentamicin IM once daily for 7 days + oral amoxicillin twice daily for 7 days (WHO 2015).",
        "Adults: IM absorption is reliable if perfusion is normal — not in shock."
      ],
      monitor: ["Daily urine output; hearing/balance complaints", "Clinical response at 48 h"],
      cautions: ["Avoid combining with furosemide; keep well hydrated."]
    },
    {
      title: "Accurate small doses for neonates",
      best_for: "When only 40 mg/mL ampoules are available.",
      requires: ["syringe_1ml"],
      steps: [
        "Dilute 1 mL of 40 mg/mL with 3 mL WFI or NS → 4 mL of 10 mg/mL. Label.",
        "A 2 kg neonate on 5 mg/kg needs 10 mg = 1 mL of the 10 mg/mL dilution (instead of 0.25 mL of the concentrate — impossible to measure accurately).",
        "Use a 1 mL syringe; discard the remaining diluted solution after 24 h."
      ],
      monitor: [],
      cautions: []
    },
    {
      title: "No drug levels available",
      best_for: "All facilities without a lab for aminoglycoside levels.",
      requires: [],
      steps: [
        "Use once-daily dosing only (safer than divided doses).",
        "Limit to 5–7 days where possible.",
        "If creatinine is raised or urine output falls: LENGTHEN the interval (36–48 h) rather than reduce the dose.",
        "Stop at the first sign of hearing loss, dizziness, or oliguria."
      ],
      monitor: ["Urine output daily; creatinine at baseline and day 3 if available"],
      cautions: ["Higher risk in dehydration, elderly, pre-existing renal disease."]
    }
  ],
  paediatric: ["Give once daily; WHO does not recommend divided doses."],
  cautions: ["Nephrotoxicity, ototoxicity, neuromuscular blockade (myasthenia)."],
  calc: { type: "weight", dosePerKg: 7.5, doseUnit: "mg", conc: 40, concUnit: "mg/mL", label: "Child once-daily dose (7.5 mg/kg)" },
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "WHO. Managing possible serious bacterial infection in young infants when referral is not feasible, 2015" }],
  textbook: [
    { book: "harrison", text: "Adult hospital-acquired or ventilator pneumonia with resistant gram-negative risk: gentamicin 5–7 mg/kg IV once every 24 h as the aminoglycoside option.", ref: "Harrison 22nd ed. 2025, ch. 131 Pneumonia, p. 1032" },
    { book: "harrison", text: "Concentration-dependent killing and a post-antibiotic effect justify extended-interval dosing: one larger daily dose rather than several smaller doses.", ref: "Harrison 22nd ed. 2025, ch. 149 Treatment and Prophylaxis of Bacterial Infections, p. 1176" },
    { book: "harrison", text: "In CNS infection (e.g. Listeria, with ampicillin) gentamicin 7.5 mg/kg/day IV divided 8-hourly, adjusted to levels: peak 5–8 µg/mL, trough below 2 µg/mL.", ref: "Harrison 22nd ed. 2025, ch. 143 Acute Meningitis, p. 1121" },
    { book: "williams", text: "For pelvic infection, once-daily and multiple-daily gentamicin dosing give adequate levels and similar cure rates; Parkland does not routinely monitor levels with normal renal function. With reduced GFR consider non-aminoglycoside combinations.", ref: "Williams Obstetrics 25th ed. 2018, ch. 37 Puerperal Complications, pdf p. 1475" },
    { book: "gabbe", text: "Chorioamnionitis: gentamicin 2 mg/kg load then 1.5 mg/kg every 8 h, or 5 mg/kg every 24 h, with ampicillin.", ref: "Gabbe's Obstetrics 9th ed., ch. 58 Bacterial and Parasitic Infections in Pregnancy, p. 1118" },
    { book: "gabbe", text: "Postpartum endometritis: clindamycin 900 mg every 8 h plus gentamicin 5 mg/kg every 24 h or 1.5 mg/kg every 8 h; add ampicillin 2 g every 6 h if GBS colonised.", ref: "Gabbe's Obstetrics 9th ed., ch. 58 Bacterial and Parasitic Infections in Pregnancy, p. 1120" },
    { book: "schwartz", text: "Aminoglycosides, vancomycin and furosemide contribute directly to nephrotoxicity (acute tubular necrosis).", ref: "Schwartz's Principles of Surgery 11th ed., ch. 12 Quality, Patient Safety, Assessments of Care, and Complications, p. 423" },
    { book: "schwartz", text: "For penicillin- and cephalosporin-allergic patients, clindamycin or vancomycin with gentamicin (or ciprofloxacin/aztreonam) is a reasonable prophylaxis alternative; aminoglycoside may be added where Gram-negatives are likely.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 9 Wound Healing, p. 288" },
    { book: "nelson", text: "Children: gentamicin 7.5 mg/kg IM or IV every 24 h; adults 5 mg/kg IM or IV every 24 h (cited for plague; same once-daily principle).", ref: "Nelson 22nd ed. 2024, ch. 246 Plague, p. 1795" },
    { book: "nelson", text: "Once-daily gentamicin 5–7.5 mg/kg/day IM/IV.", ref: "Nelson 22nd ed. 2024, ch. 247 Brucellosis, Table, p. 1809" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "ceftriaxone",
  name: "Ceftriaxone",
  aka: ["Rocephin"],
  cls: "3rd-generation cephalosporin",
  cat: "infection",
  wards: ["emergency", "neonatal", "paediatric", "medical", "surgical", "icu", "outpatient"],
  tags: ["meningitis", "sepsis", "pneumonia", "typhoid", "gonorrhoea"],
  presentation: ["250 mg, 500 mg, 1 g and 2 g vials (powder)."],
  indications: ["Meningitis", "Severe pneumonia / sepsis", "Typhoid, severe UTI, gonorrhoea, others"],
  standard: {
    summary: "IV infusion over 30 min or slow IV push.",
    items: [
      { label: "Adult", text: "1–2 g IV once daily; meningitis 2 g every 12 h." },
      { label: "Child", text: "50–80 mg/kg once daily; meningitis 100 mg/kg/day (max 4 g/day) in 1–2 doses." },
      { label: "Neonate", text: "Ampicillin plus gentamicin is preferred in newborns: ceftriaxone is typically not used in the neonatal period because it precipitates with calcium and displaces bilirubin (Nelson). If it is the only option: 50 mg/kg once daily (meningitis 100 mg/kg). Avoid if jaundiced or < 41 weeks corrected age and never with calcium-containing IV fluids (e.g. Ringer's lactate)." }
    ]
  },
  improvised: [
    {
      title: "IM with lidocaine (no IV access)",
      best_for: "Outpatient/pre-referral, or when cannulation fails.",
      requires: ["im", "lidocaine"],
      steps: [
        "Reconstitute 1 g with 3.5 mL of 1 % lidocaine (plain, no adrenaline) → ~250 mg/mL. 250 mg vial: 0.9 mL; 500 mg: 1.8 mL.",
        "Deep IM into the gluteal (adults) or anterolateral thigh (children). Maximum 1 g per injection site — split 2 g between sites.",
        "NEVER inject the lidocaine mixture IV.",
        "If no lidocaine: reconstitute with WFI — it is painful but acceptable."
      ],
      monitor: ["Local reaction; response at 48 h"],
      cautions: ["Neonates: WFI only (no lidocaine)."]
    },
    {
      title: "Slow IV push without a giving set",
      best_for: "No bags of fluid or sets available.",
      requires: ["iv"],
      steps: ["Reconstitute 1 g with 10 mL WFI (100 mg/mL). Give slowly over 2–4 min through a cannula flushed before and after with 5–10 mL NS."],
      monitor: [],
      cautions: ["Do not flush with Ringer's lactate (calcium) in neonates."]
    }
  ],
  paediatric: ["Pre-referral for suspected meningitis/sepsis where WHO IMCI applies: single IM dose then refer."],
  cautions: ["Calcium precipitation (fatal in neonates) — separate lines and flush with NS.", "Biliary sludge with prolonged use; cross-allergy with penicillins ~1–2 %."],
  calc: { type: "weight", dosePerKg: 80, doseUnit: "mg", conc: 250, concUnit: "mg/mL", maxDose: 2000, label: "Child once-daily dose (80 mg/kg, 250 mg/mL IM)" },
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "MSF Essential Drugs — ceftriaxone" }],
  textbook: [
    { book: "harrison", text: "Bacterial meningitis empirical dosing: adult ceftriaxone 4 g/day IV given 12-hourly (2 g q12h); child over 1 month 100 mg/kg/day 12-hourly.", ref: "Harrison 22nd ed. 2025, ch. 143 Acute Meningitis, p. 1121" },
    { book: "harrison", text: "Hospitalised community-acquired pneumonia: ceftriaxone 1–2 g/day as the beta-lactam, combined with a macrolide (or a respiratory fluoroquinolone).", ref: "Harrison 22nd ed. 2025, ch. 131 Pneumonia, p. 1028" },
    { book: "harrison", text: "Meningococcal meningitis/septicaemia is usually treated for 7 days (3–5 days may suffice); a single ceftriaxone dose has been used successfully in resource-poor settings.", ref: "Harrison 22nd ed. 2025, ch. 160 Meningococcal Infections, p. 1249" },
    { book: "schwartz", text: "Prophylaxis principles: agent active against site flora, first dose within 30 min before incision, redose in long operations, no more than 24 h after surgery.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 6 Surgical Infections, p. 158" },
    { book: "schwartz", text: "Ceftriaxone listed for open/high-risk biliary and orthopaedic prophylaxis, and with metronidazole for colorectal or obstructed small bowel surgery.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 6 Surgical Infections, p. 168" },
    { book: "schwartz", text: "SIS 2016 intra-abdominal infection: at most 24 h for bowel injury operated within 12 h, gastroduodenal perforation within 24 h, gangrenous non-perforated appendix/gallbladder; perforated appendicitis limited to 4 days.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 6 Surgical Infections, p. 168" },
    { book: "nelson", text: "Neonatal gonococcal infection: ceftriaxone 25–50 mg/kg IV or IM once daily (ophthalmia: single dose; disseminated/meningitis: 7–14 days).", ref: "Nelson 22nd ed. 2024, ch. 238 Gonococcal infections, Table 238.1, p. 1751" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "artesunate",
  name: "Artesunate (injectable)",
  aka: [],
  cls: "Antimalarial (artemisinin)",
  cat: "infection",
  wards: ["emergency", "paediatric", "medical", "outpatient"],
  tags: ["severe malaria", "malaria"],
  presentation: ["60 mg vial of powder, supplied with 1 mL of 5 % sodium bicarbonate and 5 mL NS diluent.", "Rectal capsules 100 mg (pre-referral)."],
  indications: ["Severe malaria (all ages, including pregnancy)"],
  standard: {
    summary: "IV bolus at 0, 12, 24 h then daily; then a full oral ACT course.",
    items: [
      { label: "Dose", text: "2.4 mg/kg IV (slow push over 1–2 min) at 0, 12 and 24 h, then once daily until oral therapy possible (minimum 3 doses / 24 h). Children < 20 kg: 3 mg/kg per dose." },
      { label: "Follow-on", text: "Full 3-day ACT course once the patient can swallow." }
    ]
  },
  improvised: [
    {
      title: "Reconstitution and IM route",
      best_for: "No IV access, or IV is unreliable. IM artesunate is as effective as IV.",
      requires: ["im"],
      steps: [
        "Add the 1 mL of 5 % bicarbonate to the 60 mg vial; shake 2–3 min until completely clear.",
        "For IV: add 5 mL NS/D5 → 10 mg/mL. For IM: add 2 mL NS → 20 mg/mL.",
        "IM: inject into the anterolateral thigh; divide volumes > 3–4 mL between two sites.",
        "Use within 1 h; discard if cloudy."
      ],
      monitor: ["Glucose on admission and every 4 h (hypoglycaemia is common)", "Hb at day 7 and 14 (delayed haemolysis)"],
      cautions: []
    },
    {
      title: "Pre-referral rectal artesunate",
      best_for: "Children < 6 years at community/health-post level who cannot take oral treatment; referral time > 6 h.",
      requires: ["rectal"],
      steps: [
        "10 mg/kg single rectal dose (100 mg capsules: 1 capsule for 10–< 20 kg? — use the national dosing table by weight/age).",
        "If expelled within 30 min, insert another and hold buttocks together 10 min.",
        "Refer immediately for parenteral treatment; the rectal dose only buys time."
      ],
      monitor: [],
      cautions: ["Not for adults or as a full course (resistance risk)."]
    },
    {
      title: "If artesunate is unavailable",
      best_for: "Stock-outs.",
      requires: ["im"],
      steps: [
        "Artemether IM 3.2 mg/kg loading, then 1.6 mg/kg once daily (anterior thigh; absorption poorer in shock).",
        "Or quinine (see entry) — loading dose then 8-hourly, IV by gravity or IM diluted."
      ],
      monitor: [],
      cautions: []
    }
  ],
  paediatric: ["< 20 kg: 3 mg/kg per dose.", "Check glucose; treat convulsions; transfuse if Hb < 5 g/dL (WHO)."],
  cautions: ["Post-artesunate delayed haemolysis (day 7–21) in high-parasitaemia patients."],
  calc: { type: "weight", dosePerKg: 2.4, bands: [{ under: 20, dosePerKg: 3 }], doseUnit: "mg", conc: 10, concUnit: "mg/mL", label: "IV dose (2.4 mg/kg; use 3 mg/kg if < 20 kg) at 10 mg/mL" },
  sources: [{ name: "WHO Guidelines for malaria, 2023 (severe malaria)", url: "https://www.who.int/publications/i/item/guidelines-for-malaria" }],
  textbook: [
    { book: "harrison", text: "Severe falciparum malaria: artesunate 2.4 mg/kg IV stat, then at 12 and 24 h, then daily if needed; children under 20 kg 3 mg/kg per dose.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1770" },
    { book: "harrison", text: "Artesunate is given IV but is also rapidly absorbed IM; oily IM artemether is erratically absorbed and less effective.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1770" },
    { book: "harrison", text: "Switch to oral therapy as soon as fluids are tolerated and give a full 3-day ACT course; avoid mefloquine as follow-on.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1772" },
    { book: "harrison", text: "In non-immune patients with hyperparasitaemia, sudden haemolysis can occur many days after artesunate treatment.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1765" },
    { book: "nelson", text: "Severe malaria (all species): artesunate 2.4 mg/kg/dose IV at 0, 12 and 24 h, then daily (3 days), followed by artemether–lumefantrine (preferred), atovaquone–proguanil, or quinine plus doxycycline/clindamycin.", ref: "Nelson 22nd ed. 2024, ch. 336 Malaria, Table (treatment), p. 2136" },
    { book: "nelson", text: "Interim treatment while awaiting IV artesunate: oral artemether–lumefantrine, atovaquone–proguanil or quinine.", ref: "Nelson 22nd ed. 2024, ch. 336, Fig. (management algorithm)" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "quinine",
  name: "Quinine dihydrochloride",
  aka: [],
  cls: "Antimalarial",
  cat: "infection",
  wards: ["emergency", "maternity", "paediatric", "medical"],
  tags: ["severe malaria", "malaria"],
  presentation: ["300 mg/mL, 2 mL ampoule (600 mg)."],
  indications: ["Severe malaria when artesunate/artemether unavailable", "First trimester severe malaria (artesunate now preferred by WHO)"],
  standard: {
    summary: "Loading dose then 8-hourly infusions, each over 4 h, by pump.",
    items: [
      { label: "Loading", text: "20 mg salt/kg (max 1.2 g) in 10 mL/kg D5W or NS over 4 h. Omit if quinine/quinidine/mefloquine in the last 24 h." },
      { label: "Maintenance", text: "10 mg/kg over 4 h every 8 h (start 8 h after the start of the loading dose). Switch to oral 10 mg/kg 8-hourly when able, to complete 7 days, plus doxycycline or clindamycin — or a full ACT course. If the patient still needs IV quinine after 48 h, or has acute kidney injury, reduce each maintenance dose by one-third to one-half to avoid accumulation (Harrison)." }
    ]
  },
  improvised: [
    {
      title: "Infusion by drop counting (the pre-pump standard)",
      best_for: "Any facility with a giving set; burette for children.",
      requires: ["iv", "macro_set", "glucometer"],
      steps: [
        "Adult 60 kg loading: 1200 mg (4 mL) in 500 mL D5W over 4 h = 125 mL/h = 42 drops/min (20 gtt/mL; ≈ 10–11 drops per 15 s).",
        "Maintenance: 600 mg (2 mL) in 500 mL over 4 h at the same rate, every 8 h.",
        "Child: 10 mg/kg in 10 mL/kg D5W over 4 h. Example 15 kg: 150 mg (0.5 mL) in 150 mL in a burette over 4 h = 38 mL/h = 38 drops/min (microdrip) or 13 drops/min (20 gtt/mL).",
        "Use D5W/D10 rather than NS where possible (hypoglycaemia). Mark the bag with tape at hourly levels."
      ],
      monitor: ["Glucose every 4 h (quinine causes hyperinsulinaemia)", "Drop rate every 30 min", "Pulse; ECG if available"],
      cautions: ["NEVER give as an IV bolus — fatal hypotension/arrhythmia.", "Tinnitus/deafness (cinchonism) is expected and not a reason to stop."]
    },
    {
      title: "IM quinine (diluted) — no IV or no way to control the rate",
      best_for: "Health centre, pre-referral, or when IV impossible.",
      requires: ["im"],
      steps: [
        "Dilute to 60 mg/mL: 1 mL (300 mg) + 4 mL WFI or NS = 5 mL of 60 mg/mL.",
        "Loading 20 mg/kg IM split equally between both anterior thighs (never buttock — sciatic nerve, abscess). 60 kg: 1200 mg = 20 mL → 10 mL each thigh.",
        "Then 10 mg/kg IM every 8 h. Switch to oral as soon as able.",
        "Children: same doses by weight; use anterior thigh."
      ],
      monitor: ["Glucose every 4 h", "Injection sites for abscess"],
      cautions: ["Undiluted 300 mg/mL IM causes necrosis and erratic absorption."]
    }
  ],
  paediatric: ["Hypoglycaemia is the major risk — feed/glucose infusion; check glucose before each dose."],
  cautions: ["QT prolongation; do not combine with mefloquine/halofantrine; pregnancy: safe but hypoglycaemia risk higher."],
  calc: { type: "weight", dosePerKg: 10, doseUnit: "mg", conc: 300, concUnit: "mg/mL", maxDose: 600, label: "Maintenance dose (10 mg/kg); loading = double" },
  sources: [{ name: "WHO Guidelines for malaria 2023" }, { name: "WHO Pocket Book of Hospital Care for Children 2013" }],
  textbook: [
    { book: "harrison", text: "Severe malaria if artesunate/artemether unavailable: quinine dihydrochloride 20 mg salt/kg infused over 4 h, then 10 mg salt/kg over 2–8 h every 8 h.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1770" },
    { book: "harrison", text: "Omit the loading dose only if therapeutic quinine doses were definitely given in the previous 24 h.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1770" },
    { book: "harrison", text: "Rapid injection causes dangerous hypotension: give by rate-controlled infusion only; if impossible, deep IM injection into the anterior thigh.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1772" },
    { book: "harrison", text: "Hypoglycaemia is a common major toxicity; cinchonism and modest QT prolongation are common minor effects.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1771" },
    { book: "note", text: "Nelson (US practice) uses IV artesunate for severe malaria and oral quinine only as follow-on; IV quinine dosing is not given. The IV/IM quinine regimens in this app follow WHO 2023.", ref: "Editorial note" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "dextrose",
  name: "Dextrose (glucose)",
  aka: ["Glucose", "D50", "D10", "D5"],
  cls: "Carbohydrate",
  cat: "endocrine",
  wards: ["emergency", "maternity", "neonatal", "paediatric", "medical", "surgical", "icu"],
  tags: ["hypoglycaemia", "neonate", "malnutrition"],
  presentation: ["50 % (500 mg/mL) 50 mL vial/ampoule.", "10 % 500 mL; 5 % 500 mL / 1 L.", "Household sugar (sucrose) for oral/sublingual/NG."],
  indications: ["Hypoglycaemia (all ages)", "Maintenance glucose (neonates, malnutrition, quinine therapy)", "Hyperkalaemia (with insulin)"],
  standard: {
    summary: "IV bolus of 10 % (preferred) or 50 %, then maintenance infusion and feeding.",
    items: [
      { label: "Adult", text: "25 g IV: 50 mL of 50 % (irritant) or 100–250 mL of 10 % over 10–15 min (preferred). Recheck in 15 min; repeat if < 4 mmol/L (70 mg/dL)." },
      { label: "Child", text: "5 mL/kg of 10 % glucose IV (WHO). Neonate: 2 mL/kg of 10 %, then infusion 5–8 mg/kg/min (≈ 3–5 mL/kg/h of 10 %)." },
      { label: "After the bolus", text: "Feed or start 10 % glucose infusion; find the cause (insulin, sulfonylurea, sepsis, malaria, quinine, alcohol, malnutrition)." }
    ]
  },
  improvised: [
    {
      title: "Making 10 % (and 5 %) from 50 % dextrose",
      best_for: "Where only D50 and NS are stocked.",
      requires: ["iv"],
      steps: [
        "10 % bolus for a child: 1 part D50 + 4 parts NS or WFI. E.g. 10 mL D50 + 40 mL NS = 50 mL of 10 % → 5 mL/kg for a 10 kg child.",
        "10 % bag: withdraw and discard 100 mL from a 500 mL NS bag, add 100 mL of D50 (50 g) → 500 mL of 10 % dextrose in 0.8 % saline. Invert 10 times, label.",
        "5 % bag: 50 mL D50 into 450 mL NS → 5 % dextrose-saline.",
        "For neonates 10 % is the maximum peripheral concentration (never D50 undiluted)."
      ],
      monitor: ["Glucose 15–30 min after bolus, then hourly until stable"],
      cautions: ["Mixing D50 into a D5 bag (instead of NS) gives ~14 %, not 10 % — use NS or discard volume first."]
    },
    {
      title: "No IV access: sublingual sugar, oral or NG glucose",
      best_for: "Conscious or semi-conscious child/adult; health post; while IV is being placed.",
      requires: ["oral"],
      steps: [
        "Sublingual: 1 teaspoon of sugar moistened with a few drops of water under the tongue (child); repeat after 20 min if not improved. Absorbed even if swallowing is impaired.",
        "Oral (conscious): 15–20 g glucose = 3–4 teaspoons sugar in 200 mL water/juice; recheck after 15 min; repeat up to 3 times; then a snack.",
        "NG (unconscious, no IV): 5 mL/kg of 10 % glucose or sugar water (4 level teaspoons = 20 g sugar in 200 mL clean water ≈ 10 %) via NG tube.",
        "Glucagon 1 mg IM/SC (0.5 mg if < 25 kg) if available — ineffective in malnutrition/liver glycogen depletion."
      ],
      monitor: ["Glucose every 15–30 min", "Airway (aspiration risk if oral in drowsy patient)"],
      cautions: []
    },
    {
      title: "Only D50 available for an adult with a small vein",
      best_for: "Minimising phlebitis/extravasation injury.",
      requires: ["iv"],
      steps: ["Dilute 50 mL D50 with 50 mL NS (→ 25 %) and give over 5–10 min, flushing well. Or 25 mL D50 + 75 mL NS ≈ 12.5 % over 10 min."],
      monitor: ["Site"],
      cautions: ["Extravasated D50 causes tissue necrosis."]
    }
  ],
  paediatric: [
    "Severe acute malnutrition: 50 mL of 10 % glucose or sucrose orally/NG, then F-75 every 2 h; IV 5 mL/kg of 10 % only if unconscious.",
    "Every convulsing, unconscious or shocked child: check/treat glucose."
  ],
  cautions: ["In alcohol-dependent or malnourished adults give thiamine IV/IM before glucose where possible, to avoid precipitating Wernicke encephalopathy (Kaplan), but never delay treating hypoglycaemia while waiting for thiamine."],
  calc: { type: "weight", dosePerKg: 5, doseUnit: "mL", conc: 1, concUnit: "mL/mL", label: "Child bolus: 5 mL/kg of 10 % glucose" },
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013 (hypoglycaemia; sublingual sugar)" }, { name: "WHO. Updates on the management of severe acute malnutrition, 2013" }, { name: "JBDS. Hospital management of hypoglycaemia in adults with diabetes, 2023" }],
  textbook: [
    { book: "harrison", text: "Hypoglycaemia unable to take oral carbohydrate: IV glucose 25 g, followed by a glucose infusion guided by serial plasma glucose; oral 15-20 g if able to swallow.", ref: "Harrison 22nd ed. 2025, ch. 418 Hypoglycemia, p. 3236" },
    { book: "harrison", text: "If IV access is impractical, glucagon 1 mg SC or IM in adults; ineffective in glycogen-depleted patients such as alcohol-induced hypoglycaemia. Patients should eat as soon as practical.", ref: "Harrison 22nd ed. 2025, ch. 418 Hypoglycemia, p. 3236" },
    { book: "harrison", text: "Poisoned patients with altered mental status: consider IV glucose (unless glucose documented normal), naloxone and thiamine.", ref: "Harrison 22nd ed. 2025, ch. 470 Poisoning and Drug Overdose, p. 3707" },
    { book: "harrison", text: "Hyperkalaemia: never give a D50 bolus without insulin, because hypertonic glucose can acutely worsen hyperkalaemia.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 361" },
    { book: "nelson", text: "Hypoglycaemia: if symptomatic or unable to take oral intake, 2 mL/kg of 10 % dextrose (D10W) IV bolus, then a dextrose infusion at 5–6 mg/kg/min (infants) or 2–3 mg/kg/min (older children) to prevent recurrence. Conscious child: 15 g rapid-acting carbohydrate (e.g. 4 oz juice).", ref: "Nelson 22nd ed. 2024, ch. 113 Hypoglycemia, p. 983" },
    { book: "nelson", text: "Resuscitation dosing: dextrose 0.5–1 g/kg IV/IO = D10W 5–10 mL/kg, D25W 2–4 mL/kg, D50W 1–2 mL/kg; recheck serial glucose as hypoglycaemia can recur.", ref: "Nelson 22nd ed. 2024, Table 79.x, p. 563" },
    { book: "nelson", text: "Glucagon IM: 0.5 mg if < 20 kg, 1.0 mg if > 20 kg; intranasal 3 mg. Often causes vomiting.", ref: "Nelson 22nd ed. 2024, ch. 629, p. 3534" },
    {book: "kaplan",text: "In alcohol-dependent or malnourished patients glucose uses up remaining thiamine; give thiamine (IM) before a glucose infusion to avoid precipitating Wernicke encephalopathy.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.1 Consultation-Liaison Psychiatry, pdf p. 2522"},
    {book: "kaplan",text: "For alcohol-dependent patients on IV glucose, add 100 mg thiamine to each litre.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 915"}
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "diazepam",
  name: "Diazepam",
  aka: ["Valium"],
  cls: "Benzodiazepine",
  cat: "neuro",
  wards: ["emergency", "paediatric", "medical", "outpatient"],
  tags: ["status epilepticus", "seizure", "convulsion", "eclampsia"],
  presentation: ["5 mg/mL, 2 mL ampoule (10 mg). Emulsion (Diazemuls) where available.", "Rectal tubes 5/10 mg; tablets 5 mg."],
  indications: ["Acute seizures / status epilepticus (first-line benzodiazepine where lorazepam/midazolam unavailable)", "Severe agitation, alcohol withdrawal"],
  standard: {
    summary: "Slow IV; lorazepam preferred where available.",
    items: [
      { label: "Adult", text: "10 mg IV over 2–5 min; repeat once after 10 min if still convulsing (max 20 mg first line). Then second-line agent." },
      { label: "Child", text: "0.2–0.3 mg/kg IV slowly (max 10 mg); repeat once after 10 min." }
    ]
  },
  improvised: [
    {
      title: "Rectal diazepam using the IV solution (WHO)",
      best_for: "No IV access; children; pre-hospital. Works within 2–5 min.",
      requires: ["rectal"],
      steps: [
        "0.5 mg/kg (max 10 mg child; adult 10–20 mg). Draw the IV solution into a 1 or 2 mL syringe, REMOVE THE NEEDLE.",
        "Insert the syringe nozzle 4–5 cm into the rectum, inject, hold the buttocks together for 1–2 min.",
        "Weight table (5 mg/mL): 5 kg → 0.5 mL; 10 kg → 1 mL; 15 kg → 1.5 mL; 20 kg → 2 mL; adult → 2–4 mL.",
        "Repeat once after 10 min if still convulsing; then second-line agent."
      ],
      monitor: ["Breathing and colour continuously; bag-valve-mask at hand", "Glucose", "Temperature (fever → paracetamol, tepid sponging)"],
      cautions: ["Never give IM diazepam (erratic absorption)."]
    },
    {
      title: "Midazolam IM / buccal when diazepam unavailable or IV impossible",
      best_for: "Any setting; IM midazolam is at least as effective as IV lorazepam (RAMPART).",
      requires: ["im"],
      steps: [
        "IM: 0.2 mg/kg (max 10 mg). Adult > 40 kg: 10 mg; 13–40 kg: 5 mg.",
        "Buccal: 0.3–0.5 mg/kg (max 10 mg) — draw the IV solution, squirt half between each cheek and gum.",
        "Intranasal: 0.2 mg/kg (max 10 mg) using the 5 mg/mL strength, half per nostril, with atomiser or dropper."
      ],
      monitor: ["Respiration continuously"],
      cautions: []
    },
    {
      title: "Second line without a pump",
      best_for: "Seizure continuing 10 min after the second benzodiazepine dose.",
      requires: ["im"],
      steps: [
        "Prefer phenobarbital 15–20 mg/kg IM or IV over 20 min (see Phenobarbital) — needs no infusion pump.",
        "Phenytoin 15–20 mg/kg IV requires ≤ 1 mg/kg/min (max 50 mg/min) and ideally ECG: dilute in 100 mL NS ONLY (precipitates in glucose) and run via burette over 20–30 min for a child, 30–60 min for an adult (e.g. 1000 mg/100 mL over 30 min ≈ 67 drops/min with 20 gtt/mL). NEVER IM phenytoin.",
        "Eclampsia: use magnesium sulfate, not repeated benzodiazepines."
      ],
      monitor: ["Airway, BP, ECG if phenytoin"],
      cautions: ["Respiratory depression is additive: phenobarbital after diazepam → be ready to ventilate."]
    }
  ],
  paediatric: ["Always check glucose; consider meningitis and cerebral malaria.", "Neonates: phenobarbital is first-line, not diazepam."],
  cautions: ["Respiratory depression; hypotension; propylene glycol vehicle is irritant."],
  antidote: "Flumazenil 0.2 mg IV (rarely appropriate — supportive ventilation preferred).",
  calc: { type: "weight", dosePerKg: 0.5, doseUnit: "mg", conc: 5, concUnit: "mg/mL", maxDose: 10, label: "Rectal dose (0.5 mg/kg, max 10 mg)" },
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013, ch. 1 (convulsions)" }, { name: "Silbergleit R et al. RAMPART. NEJM 2012" }, { name: "WHO mhGAP Intervention Guide 2.0, 2016" }],
  textbook: [
    { book: "harrison", text: "Convulsions in severe malaria should be treated promptly with IV or rectal benzodiazepines.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1772" },
    { book: "harrison", text: "Tetanus: benzodiazepines control spasms and are tolerated in high doses; intermittent vs continuous sedation depends on ventilator availability; high-dose diazepam can cause hyperosmolarity and lactic acidosis.", ref: "Harrison 22nd ed. 2025, ch. 157 Tetanus, p. 1231" },
    { book: "harrison", text: "Benzodiazepine overdose: flumazenil 0.2 mg/min reverses rapidly but may precipitate seizures and raise intracranial pressure; its effect is shorter than most benzodiazepines.", ref: "Harrison 22nd ed. 2025, ch. 467 Opioid-Related Disorders, p. 3691" },
    { book: "nelson", text: "Status epilepticus: a benzodiazepine is emergency therapy; if seizures persist 5 min after the second benzodiazepine dose, urgent therapy with fosphenytoin (20 mg/kg), valproate (40 mg/kg) or levetiracetam is recommended; IV phenobarbital is an alternative if these are unavailable.", ref: "Nelson 22nd ed. 2024, ch. 633.8 Status epilepticus, p. 3628" },
    { book: "nelson", text: "Rescue at home: rectal diazepam for a seizure lasting > 5 min; buccal or intranasal midazolam or diazepam are alternatives.", ref: "Nelson 22nd ed. 2024, ch. 633.1 Febrile seizures, p. 3597" },
    { book: "nelson", text: "Lorazepam 0.1 mg/kg IV/PO/SL/PR, repeat every 10 min × 2; rectal diazepam gel 0.2 mg/kg/dose.", ref: "Nelson 22nd ed. 2024, ch. 8 Pediatric palliative care, symptom table" },
    {book: "kaplan",text: "Do not give diazepam IM for alcohol withdrawal because absorption is erratic; benzodiazepines are the treatment of choice for withdrawal seizures.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 908"},
    {book: "kaplan",text: "Violent, struggling patient: diazepam 5–10 mg IV slowly over 2 minutes, with great care to avoid respiratory arrest.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, pdf p. 2560"},
    {book: "kaplan",text: "Acute dystonia: diazepam 10 mg IV has been reported effective when anticholinergics are not used.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21 Psychopharmacology, Medication-Induced Movement Disorders, pdf p. 1892"}
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "phenobarbital",
  name: "Phenobarbital (phenobarbitone)",
  aka: ["Phenobarbitone", "Luminal"],
  cls: "Barbiturate anticonvulsant",
  cat: "neuro",
  wards: ["emergency", "neonatal", "paediatric", "medical"],
  tags: ["status epilepticus", "neonatal seizures", "epilepsy"],
  presentation: ["200 mg/mL 1 mL ampoule (IM, or dilute 1:10 for IV). Also 30 mg/mL and 60 mg/mL.", "Tablets 30, 60, 100 mg."],
  indications: ["Neonatal seizures (first-line, WHO)", "Status epilepticus second line", "Maintenance epilepsy therapy (WHO EML)"],
  standard: {
    summary: "IV loading at ≤ 1 mg/kg/min (max 100 mg/min), then daily maintenance.",
    items: [
      { label: "Loading (child/adult)", text: "15–20 mg/kg IV over 20 min (dilute the 200 mg/mL ampoule 1:10 with WFI for IV)." },
      { label: "Neonate", text: "20 mg/kg IV over 15–20 min; if seizures continue after 30 min, further 10 mg/kg doses up to a total of 40 mg/kg. Maintenance 5 mg/kg/day if needed after 24 h." },
      { label: "Maintenance", text: "2.5–5 mg/kg/day oral (adult 60–180 mg at night)." }
    ]
  },
  improvised: [
    {
      title: "IM loading dose (no IV, no pump)",
      best_for: "Neonates and children at health-centre level; adults when IV rate control is impossible.",
      requires: ["im"],
      steps: [
        "15–20 mg/kg deep IM (neonate 20 mg/kg — WHO Pocket Book allows IM or IV). Onset 20–60 min, so give early.",
        "Volume: 200 mg/mL undiluted for IM. Max 2–3 mL per site in children (anterolateral thigh), 5 mL per site in adults — split large doses. Adult 1000 mg = 5 mL.",
        "Give the benzodiazepine first for an actively convulsing patient; IM phenobarbital is the second line/maintenance."
      ],
      monitor: ["Respiratory rate and depth every 5 min for 1 h; bag-valve-mask ready", "BP", "Glucose"],
      cautions: ["Profound respiratory depression when combined with diazepam/midazolam — do not leave the patient unattended."]
    },
    {
      title: "IV via burette instead of pump",
      best_for: "Facilities with a burette.",
      requires: ["iv", "burette"],
      steps: [
        "Dilute the dose in 20–50 mL NS in the burette. Run over 20–30 min: 50 mL over 20 min = 150 mL/h = 50 drops/min (20 gtt/mL) or 150 drops/min (microdrip — use macro set).",
        "Never push the 200 mg/mL solution undiluted IV."
      ],
      monitor: ["Respiration, BP every 5 min"],
      cautions: []
    },
    {
      title: "Oral loading (non-emergency, very low resource)",
      best_for: "Frequent seizures without status, where injectables are unavailable.",
      requires: ["oral"],
      steps: ["15–20 mg/kg oral once (or split over 24 h), then 3–5 mg/kg/day. Sedation for 1–2 days is expected. Verify with local protocol."],
      monitor: ["Drowsiness, breathing"],
      cautions: []
    }
  ],
  paediatric: ["Neonates: first-line for seizures; check glucose and calcium, treat infection."],
  cautions: ["Respiratory depression, hypotension; enzyme inducer (reduces efficacy of contraceptives, antiretrovirals, warfarin).", "Never give phenobarbital as seizure PROPHYLAXIS in cerebral malaria: a 20 mg/kg dose without respiratory support increased deaths from respiratory arrest (Harrison). Use it only to treat seizures that continue after benzodiazepines, with a bag-valve-mask at the bedside."],
  calc: { type: "weight", dosePerKg: 20, doseUnit: "mg", conc: 200, concUnit: "mg/mL", maxDose: 1000, label: "Loading dose (20 mg/kg) using 200 mg/mL" },
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013 (neonatal seizures)" }, { name: "WHO. Guidelines on neonatal seizures, 2011" }, { name: "WHO mhGAP-IG 2.0" }],
  textbook: [
    { book: "harrison", text: "Oral maintenance for tonic-clonic or focal epilepsy: phenobarbital 60–180 mg/day, once to three times daily; half-life about 90 h; target level 10–40 µg/mL.", ref: "Harrison 22nd ed. 2025, ch. 436 Seizures and Epilepsy, p. 3422" },
    { book: "harrison", text: "Severe malaria: without respiratory support, do not give a full 20 mg/kg phenobarbital load to prevent convulsions, as it may cause respiratory arrest; levetiracetam is preferred.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1772" },
    { book: "nelson", text: "Loading doses: phenytoin 20 mg/kg, phenobarbital 10–20 mg/kg; in older children a lower load of 5 mg/kg (repeatable) avoids excessive sedation.", ref: "Nelson 22nd ed. 2024, ch. 633.10 Treatment of seizures, p. 3612" },
    { book: "nelson", text: "Neonatal loading dose is usually 20 mg/kg; infants and children often receive lower doses to avoid respiratory depression, repeated if response is inadequate. Not a first-line urgent therapy because of side-effects.", ref: "Nelson 22nd ed. 2024, ch. 633.8, p. 3628" },
    { book: "nelson", text: "Neonatal seizures: phenobarbital remains first-line; levetiracetam is increasingly preferred as second-line over phenytoin 20 mg/kg or lorazepam 0.1 mg/kg.", ref: "Nelson 22nd ed. 2024, ch. 122 Nervous system disorders of the newborn, p. 1067" },
    {book: "kaplan",text: "Any CNS depressant, including barbiturates, can treat alcohol withdrawal, but most clinicians choose a benzodiazepine for relative safety.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 908"},
    {book: "kaplan",text: "In barbiturate withdrawal, phenobarbital substitutes for short-acting barbiturates (about 30 mg per 100 mg), held for 2 days before tapering.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.5 Sedative-, Hypnotic-, or Anxiolytic-Related Disorders, pdf p. 971"},
    {book: "dsm",text: "The casebook's alcohol-withdrawal reading list includes a register study comparing phenobarbital with benzodiazepines.",ref: "DSM-5-TR Clinical Cases 2023, ch. 16 Substance-Related and Addictive Disorders, case 16.2 Alcohol Withdrawal, pdf p. 386"}
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "ketamine",
  name: "Ketamine",
  aka: ["Ketalar"],
  cls: "Dissociative anaesthetic / analgesic",
  cat: "analgesia",
  wards: ["emergency", "maternity", "paediatric", "surgical"],
  tags: ["anaesthesia", "sedation", "analgesia", "burns", "fracture"],
  presentation: ["50 mg/mL 10 mL vial (most common); also 10 mg/mL and 100 mg/mL — CHECK the strength every time."],
  indications: ["Procedural sedation and analgesia (fracture reduction, burns dressing, I&D)", "Induction and maintenance of anaesthesia where no anaesthetist/ventilator", "Analgesia in trauma (low dose)"],
  standard: {
    summary: "IV titration; infusion by pump for maintenance.",
    items: [
      { label: "Procedural sedation IV", text: "1–2 mg/kg IV over 1 min; top-ups 0.5 mg/kg every 5–10 min." },
      { label: "Induction / maintenance", text: "1–2 mg/kg IV, then infusion ~ 0.5–2 mg/kg/h or repeat boluses." },
      { label: "Analgesia", text: "0.1–0.3 mg/kg IV slowly (sub-dissociative)." }
    ]
  },
  improvised: [
    {
      title: "IM ketamine (no IV)",
      best_for: "Children, uncooperative patients, field surgery. Onset 3–5 min, lasts 15–25 min.",
      requires: ["im"],
      steps: [
        "4–5 mg/kg IM (use 50 mg/mL; 100 mg/mL for large adults to keep volume small). Top-up 2–4 mg/kg IM if needed.",
        "Optional: atropine 0.01–0.02 mg/kg IM (max 0.5 mg) 10–20 min before to reduce secretions.",
        "Nil by mouth ≥ 2 h clear fluids / 6 h food where possible; left-lateral recovery in a quiet, dim room."
      ],
      monitor: ["Airway, SpO2 if available, RR every 5 min; suction ready", "BP (rises)"],
      cautions: ["Laryngospasm (rare): jaw thrust, bag-valve-mask, suction; emergence phenomena: quiet recovery, midazolam 0.03–0.05 mg/kg if severe."]
    },
    {
      title: "Maintenance without a pump — 1 mg/mL 'ketamine drip' or intermittent boluses",
      best_for: "Surgery/burns dressings > 20 min at district hospital level.",
      requires: ["iv", "macro_set"],
      steps: [
        "Intermittent: 0.5–1 mg/kg IV every 10–15 min as movement/response returns.",
        "Drip: 500 mg (10 mL of 50 mg/mL) in 500 mL NS → 1 mg/mL. Rate 1–2 mg/kg/h = 1–2 mL/kg/h. Example 60 kg: 60–120 mL/h = 20–40 drops/min (20 gtt/mL). Stop 15–20 min before the end.",
        "Add a small dose of midazolam or diazepam (0.05–0.1 mg/kg) at induction in adults to reduce emergence reactions if monitoring allows."
      ],
      monitor: ["Airway, respiration, pulse, BP every 5 min; a dedicated person watches the airway"],
      cautions: ["Not a substitute for a trained anaesthesia provider where one is available."]
    },
    {
      title: "Low-dose analgesia by IM / intranasal / oral",
      best_for: "Trauma, burns dressing changes, when opioids are absent.",
      requires: ["syringe_1ml"],
      steps: [
        "IM 0.5–1 mg/kg for analgesia (not dissociation).",
        "Intranasal 1 mg/kg (50 mg/mL; half per nostril with atomiser, or drops) — onset 5–10 min.",
        "Oral for children's dressing changes: 5–10 mg/kg of the IV solution mixed in juice, 20–30 min before (verify local protocol)."
      ],
      monitor: ["Sedation level, RR"],
      cautions: []
    }
  ],
  paediatric: ["Widely used and safe in children > 3 months; hypersalivation more common.", "Infants < 3 months: increased airway risk — expert only."],
  cautions: ["Relative contraindications: severe hypertension, ischaemic heart disease, psychosis, raised intracranial pressure with poor ventilation (head injury is no longer an absolute contraindication).", "Shock: ketamine usually supports blood pressure through catecholamine release, but it is a direct myocardial depressant. In a patient who is catecholamine-depleted — prolonged or exhausted shock, late sepsis — it can cause profound hypotension and low cardiac output (Schwartz). Reduce the dose (0.5–1 mg/kg IV), give it slowly, and have fluids and a vasopressor ready.", "Always have suction, oxygen and bag-valve-mask ready."],
  calc: { type: "weight", dosePerKg: 5, doseUnit: "mg", conc: 50, concUnit: "mg/mL", label: "IM sedation dose (5 mg/kg) at 50 mg/mL" },
  sources: [{ name: "WHO. Surgical Care at the District Hospital, 2003 (ketamine anaesthesia)" }, { name: "MSF Clinical Guidelines — Anaesthesia; WHO Model Formulary" }, { name: "Green SM et al. Clinical practice guideline for ED ketamine dissociative sedation. Ann Emerg Med 2011" }],
  textbook: [
    { book: "schwartz", text: "Ketamine is often used in acutely hypovolaemic patients because sympathetic stimulation maintains BP, but it directly depresses the myocardium when catecholamines are depleted and can cause profound hypotension.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 46 Anesthesia for Surgical Patients, p. 2031" },
    { book: "schwartz", text: "Dissociative NMDA-receptor anaesthetic; emergence delirium and hallucinations are reduced by adding a benzodiazepine; can be given IM to induce anaesthesia when IV access is not possible.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 46 Anesthesia for Surgical Patients, p. 2031" },
    { book: "schwartz", text: "Ketamine raises intracranial and intraocular pressure, so its use in head and neck trauma is described as controversial; it may cause myocardial ischaemia in coronary disease.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 46 Anesthesia for Surgical Patients, p. 2031" },
    { book: "nelson", text: "Intubation/sedation: ketamine 1–2 mg/kg IV or 4–6 mg/kg IM; onset 2–3 min, duration 10–15 min; raises HR, BP, ICP; bronchodilation, sialorrhoea.", ref: "Nelson 22nd ed. 2024, ch. 86 Table 86.11 Medications for intubation, p. 620" },
    { book: "nelson", text: "Low-dose (1–2 mg/kg) ketamine preserves airway reflexes and spontaneous ventilation; at 3–5 mg/kg loss of airway reflexes, apnoea and respiratory depression can occur; aspiration remains a risk.", ref: "Nelson 22nd ed. 2024, ch. 92 Procedural sedation, p. 670" },
    { book: "nelson", text: "Burn dressing changes: ketamine 1–4 mg/kg IV for children with high opioid requirements, with continuous cardiovascular monitoring and an advanced-airway-trained provider.", ref: "Nelson 22nd ed. 2024, ch. 91 Burn injuries, p. 654" },
    {book: "kaplan",text: "Ketamine acts quickly in treatment-resistant depression but the effect fades within 2–7 days; dissociation and hallucinations occur, and it has abuse potential.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 7 Depressive Disorders, pdf p. 1254"},
    {book: "kaplan",text: "Ketamine blocks NMDA glutamate receptors and can cause symptoms ranging from anxiety to psychosis.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.9 Hallucinogen-Related Disorders, pdf p. 1024"},
    {book: "kaplan",text: "When low-dose ketamine is given for depression, staff must be ready to treat effects on breathing or significant bradycardia.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, pdf p. 2046"}
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "morphine",
  name: "Morphine",
  aka: [],
  cls: "Opioid analgesic",
  cat: "analgesia",
  wards: ["emergency", "maternity", "paediatric", "medical", "surgical", "icu"],
  tags: ["pain", "MI", "pulmonary oedema", "palliative"],
  presentation: ["10 mg/mL 1 mL ampoule (also 15 mg/mL).", "Oral solution (often 1 mg/mL or 10 mg/mL compounded from powder); tablets 10 mg."],
  indications: ["Severe acute pain (trauma, burns, post-operative, sickle cell crisis)", "Acute pulmonary oedema (small doses)", "Palliative care"],
  standard: {
    summary: "IV titration, then PCA or continuous infusion.",
    items: [
      { label: "IV titration", text: "Adult 2.5–5 mg IV, repeat every 5–10 min to effect (child 0.05–0.1 mg/kg)." },
      { label: "Infusion (pump)", text: "Adult 1–5 mg/h; child 10–40 mcg/kg/h." }
    ]
  },
  improvised: [
    {
      title: "Dilute for safe IV titration by hand",
      best_for: "Any facility with a syringe.",
      requires: ["iv"],
      steps: ["10 mg in 10 mL NS = 1 mg/mL. Give 1–2 mL (1–2 mg) IV every 5 min until pain controlled (adult); child 0.05 mg/kg per increment.", "Label the syringe; discard after use."],
      monitor: ["RR (stop if < 10/min adult, < 20 infant), sedation score, BP", "Naloxone at hand"],
      cautions: []
    },
    {
      title: "Intermittent IM/SC instead of infusion",
      best_for: "Post-operative pain, sickle crisis, when no pump.",
      requires: ["im"],
      steps: [
        "Adult 5–10 mg IM/SC every 4 h regularly (not 'as needed' for severe pain); elderly 2.5–5 mg. Child 0.1–0.2 mg/kg IM/SC every 4 h (max 10 mg).",
        "SC absorption fails in shock/hypothermia — use IV then.",
        "Add regular paracetamol ± NSAID to reduce opioid need."
      ],
      monitor: ["RR and sedation before each dose"],
      cautions: []
    },
    {
      title: "Oral morphine where injectables are scarce",
      best_for: "Palliative care, chronic severe pain, step-down from IV.",
      requires: ["oral"],
      steps: [
        "Oral solution (pharmacy-compounded from powder, e.g. 1 mg/mL): start 2.5–5 mg every 4 h (adult), 0.1–0.2 mg/kg (child); double the bedtime dose. Titrate by 30–50 % daily.",
        "Oral dose ≈ 2–3 × the parenteral dose.",
        "Always prescribe a laxative."
      ],
      monitor: ["Sedation, constipation, nausea"],
      cautions: []
    },
    {
      title: "If no morphine",
      best_for: "Stock-outs.",
      requires: [],
      steps: ["Tramadol 50–100 mg IM/IV/oral 6-hourly (adult); pethidine 50–100 mg IM (WHO MCPC, obstetrics); low-dose ketamine 0.1–0.3 mg/kg; regional/nerve blocks with lidocaine."],
      monitor: [],
      cautions: []
    }
  ],
  paediatric: ["Neonates and infants < 6 months: reduce dose (0.025–0.05 mg/kg) — greater respiratory depression."],
  cautions: ["Respiratory depression, hypotension in hypovolaemia; caution with benzodiazepines.", "Renal impairment: morphine's active metabolites accumulate and cause prolonged sedation and respiratory depression — use smaller doses at longer intervals, or avoid (Schwartz)."],
  antidote: "Naloxone 0.4 mg IV/IM (adult; 0.01 mg/kg child), repeat every 2–3 min; dilute 0.4 mg in 10 mL and give 1–2 mL increments to reverse respiratory depression without abolishing analgesia.",
  calc: { type: "weight", dosePerKg: 0.1, doseUnit: "mg", conc: 10, concUnit: "mg/mL", maxDose: 10, label: "Child IM/SC dose (0.1 mg/kg)" },
  sources: [{ name: "WHO. Guidelines on the management of chronic pain in children, 2020; WHO Pocket Book 2013" }, { name: "MSF Essential Drugs — morphine" }],
  textbook: [
    { book: "harrison", text: "Acute pulmonary oedema: morphine 2-4 mg IV boluses reduce preload, dyspnoea and anxiety, but registry data linked morphine use with higher mortality.", ref: "Harrison 22nd ed. 2025, ch. 316 Cardiogenic Shock and Pulmonary Edema, p. 2331" },
    { book: "harrison", text: "Pain table: morphine parenteral 5 mg every 4 h; oral 30 mg every 4 h.", ref: "Harrison 22nd ed. 2025, ch. 14 Pain: Pathophysiology and Management, p. 97" },
    { book: "harrison", text: "Opioid respiratory depression: keep naloxone available with high doses or lung disease; avoid co-administering benzodiazepines, which markedly increase respiratory depression.", ref: "Harrison 22nd ed. 2025, ch. 14 Pain: Pathophysiology and Management, p. 98" },
    { book: "schwartz", text: "Equianalgesic doses of all opioids cause equal respiratory depression; no opioid is safer than another.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 46 Anesthesia for Surgical Patients, p. 2031" },
    { book: "schwartz", text: "Morphine has renally excreted active metabolites, so use cautiously or avoid in renal insufficiency.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 46 Anesthesia for Surgical Patients, p. 2031" },
    { book: "schwartz", text: "In burns, use opioids responsibly within multimodal analgesia and plan weaning from the start.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 8 Burns, p. 252" },
    { book: "nelson", text: "Morphine 0.1 mg/kg IV; onset 5–15 min, duration 120–240 min; hypotension and respiratory depression.", ref: "Nelson 22nd ed. 2024, Table 86.11, p. 620" },
    { book: "nelson", text: "Naloxone: 0.1 mg/kg IV/IO/IM/SC for full reversal (max 2 mg); intranasal 4 mg spray, repeat every 2–3 min; use lower doses for opioid-induced respiratory depression in patients on chronic opioids.", ref: "Nelson 22nd ed. 2024, Table 79.x, p. 563" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "heparin",
  name: "Heparin (unfractionated) & enoxaparin",
  aka: ["UFH", "LMWH", "Clexane"],
  cls: "Anticoagulant",
  cat: "haem",
  wards: ["medical", "surgical", "icu"],
  tags: ["DVT", "PE", "ACS", "VTE", "anticoagulation"],
  presentation: ["UFH 5000 IU/mL (5 mL vial = 25 000 IU); 1000 IU/mL.", "Enoxaparin 40 mg/0.4 mL, 60/80/100 mg prefilled syringes (100 mg/mL)."],
  indications: ["Venous thromboembolism (DVT/PE) treatment", "Acute coronary syndrome", "Prophylaxis"],
  standard: {
    summary: "Weight-based IV UFH by pump with aPTT monitoring.",
    items: [
      { label: "VTE (UFH)", text: "80 IU/kg IV bolus then 18 IU/kg/h infusion; aPTT at 6 h, target 1.5–2.5× control." },
      { label: "ACS (UFH)", text: "60 IU/kg (max 4000) bolus then 12 IU/kg/h (max 1000 IU/h)." },
      { label: "Enoxaparin", text: "1 mg/kg SC every 12 h (VTE/ACS) or 1.5 mg/kg once daily (VTE)." }
    ]
  },
  improvised: [
    {
      title: "Enoxaparin replaces the infusion (preferred)",
      best_for: "Any facility stocking LMWH. No pump, no aPTT.",
      requires: ["syringe_1ml"],
      steps: [
        "1 mg/kg SC every 12 h (deep SC abdominal wall, do not rub). Creatinine clearance < 30 mL/min: 1 mg/kg once daily.",
        "Multi-dose from a 100 mg/mL syringe: expel the excess to the mark; or draw from a vial with a 1 mL syringe.",
        "Not pregnant: start warfarin the same day (VTE); overlap ≥ 5 days and until INR ≥ 2 on two days.",
        "PREGNANT: never start warfarin — it crosses the placenta and causes fetal haemorrhage, death and malformations. Continue enoxaparin by weight for the rest of the pregnancy and at least 6 weeks postpartum; warfarin may be started after delivery and is compatible with breastfeeding."
      ],
      monitor: ["Bleeding, platelets at day 5–7 if possible"],
      cautions: ["Pregnancy: enoxaparin is the preferred anticoagulant."]
    },
    {
      title: "Subcutaneous UFH treatment dose (no pump, no LMWH)",
      best_for: "Where only UFH is available and monitoring is limited.",
      requires: ["syringe_1ml"],
      steps: [
        "Unmonitored weight-adjusted regimen (FIDO trial): 333 IU/kg SC initial dose, then 250 IU/kg SC every 12 h.",
        "Or monitored: 5000 IU IV bolus then 17 500 IU SC every 12 h, adjust to aPTT 1.5–2.5× taken 6 h after the dose.",
        "Use the 25 000 IU/5 mL (5000 IU/mL) strength to keep volumes < 1.5 mL per injection; deep SC abdominal wall, rotate sites."
      ],
      monitor: ["Bleeding; aPTT 6 h post-dose if available; platelets day 5"],
      cautions: ["Larger haematomas at injection sites; not for patients in shock (poor absorption)."]
    },
    {
      title: "Gravity UFH infusion (last resort)",
      best_for: "Massive PE/ACS where IV heparin is strongly preferred and a burette with microdrip exists.",
      requires: ["iv", "micro_set", "burette"],
      steps: [
        "25 000 IU in 500 mL NS → 50 IU/mL. Label.",
        "mL/h = IU/h ÷ 50. Example 70 kg at 18 IU/kg/h = 1260 IU/h ≈ 25 mL/h = 25 drops/min (microdrip).",
        "Burette with ≤ 1–2 h of volume; dedicated line; aPTT 6 h after any change."
      ],
      monitor: ["Drop rate every 30 min", "aPTT 6-hourly until stable, then daily", "Bleeding"],
      cautions: ["Free-flow of this bag delivers 25 000 IU — the burette limit is essential."]
    }
  ],
  paediatric: ["Enoxaparin 1 mg/kg SC 12-hourly (< 2 months: 1.5 mg/kg); anti-Xa monitoring where possible."],
  cautions: ["Heparin-induced thrombocytopenia; spinal/epidural haematoma.", "Enoxaparin accumulates in kidney impairment: with creatinine clearance 30 mL/min or less use the reduced once-daily dose and watch for bleeding (see Safety tab, kidney)."],
  antidote: "Protamine sulfate 1 mg per 100 IU of UFH given in the last 2–3 h (max 50 mg) slow IV; partial reversal only for enoxaparin (1 mg per 1 mg).",
  calc: { type: "infusion", amount: 25000, amountUnit: "units", volumeMl: 500, doseUnit: "units/kg/h", range: [12, 18], defaultDose: 18, dropFactor: 60 },
  sources: [{ name: "Kearon C et al. Comparison of fixed-dose weight-adjusted UFH and LMWH for acute VTE (FIDO). JAMA 2006" }, { name: "CHEST Antithrombotic Therapy for VTE Disease, 2016/2021" }],
  textbook: [
    { book: "harrison", text: "VTE weight-adjusted UFH nomogram: bolus 5000 units or 80 units/kg, then 18 units/kg/h; ACS uses 70 units/kg then 12-15 units/kg/h.", ref: "Harrison 22nd ed. 2025, ch. 123 Antiplatelet, Anticoagulant, and Fibrinolytic Drugs, p. 947" },
    { book: "harrison", text: "VTE: enoxaparin 1 mg/kg twice daily with normal renal function; UFH titrated to aPTT 2-3 times the upper limit of normal.", ref: "Harrison 22nd ed. 2025, ch. 290 Deep-Venous Thrombosis and Pulmonary Thromboembolism, p. 2163" },
    { book: "harrison", text: "Warfarin bridging: continue full-dose parenteral anticoagulant for at least 5 days and until two INRs at least 1 day apart are in range (2.0-3.0); usual start 5 mg.", ref: "Harrison 22nd ed. 2025, ch. 290 Deep-Venous Thrombosis and Pulmonary Thromboembolism, p. 2163" },
    { book: "harrison", text: "Heparin reversal: 1 mg protamine neutralizes about 100 units heparin, maximum 50 mg per dose by slow IV infusion; protamine only partially reverses LMWH anti-Xa activity.", ref: "Harrison 22nd ed. 2025, ch. 123 Antiplatelet, Anticoagulant, and Fibrinolytic Drugs, p. 948" },
    { book: "williams", text: "IV unfractionated heparin in pregnancy: bolus 70 to 100 U/kg (5000 to 10,000 U), then 15 to 20 U/kg/h (about 1000 U/h) titrated to aPTT 1.5 to 2.5 times control, for at least 5 to 7 days before subcutaneous conversion.", ref: "Williams Obstetrics 25th ed. 2018, ch. 52 Thromboembolic Disorders, pdf p. 2244" },
    { book: "williams", text: "Enoxaparin about 1 mg/kg twice daily provided satisfactory anticoagulation for pregnancy VTE; LMWHs do not cross the placenta and are cleared renally.", ref: "Williams Obstetrics 25th ed. 2018, ch. 52 Thromboembolic Disorders, pdf p. 2245" },
    { book: "williams", text: "Withhold neuraxial blockade 10 to 12 hours after prophylactic LMWH and 24 hours after a therapeutic dose; convert LMWH to UFH in the last month or when delivery is imminent.", ref: "Williams Obstetrics 25th ed. 2018, ch. 52 Thromboembolic Disorders, pdf p. 2247" },
    { book: "gabbe", text: "VTE in pregnancy: LMWH preferred; enoxaparin 1 mg/kg SC twice daily or 1.5 mg/kg daily; IV UFH titrated to aPTT 1.5-2.5 times control. Continue at least 6 weeks postpartum.", ref: "Gabbe's Obstetrics 9th ed., ch. 50 Thromboembolic Disorders in Pregnancy, p. 960" },
    { book: "gabbe", text: "Neuraxial anaesthesia contraindicated within 24 h of therapeutic and 12 h of prophylactic LMWH; convert to UFH at 36 weeks; restart 4-6 h after vaginal, 6-12 h after caesarean birth.", ref: "Gabbe's Obstetrics 9th ed., ch. 50 Thromboembolic Disorders in Pregnancy, p. 962" },
    { book: "schwartz", text: "VTE treatment with UFH: 80 units/kg IV bolus then 18 units/kg/h; check aPTT every 6 h, target 1.5-2.5 x control (anti-Xa 0.3-0.7 IU/mL).", ref: "Schwartz's Principles of Surgery 11th ed., ch. 24 Venous and Lymphatic Disease, p. 988" },
    { book: "schwartz", text: "SC UFH options: adjusted-dose 17,500 units then 250 units/kg twice daily to aPTT; fixed unmonitored 333 units/kg then 250 units/kg twice daily.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 24 Venous and Lymphatic Disease, p. 988" },
    { book: "schwartz", text: "Protamine: 1 mg neutralises 90-115 units heparin, not more than 50 mg IV in any 10 min; reverses LMWH only about 60%.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 24 Venous and Lymphatic Disease, p. 988" },
    { book: "schwartz", text: "Overlap heparin with warfarin until INR at least 2 for 24 h, with a minimum of 5 days of heparin.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 24 Venous and Lymphatic Disease, p. 987" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "hydralazine",
  name: "Hydralazine",
  aka: ["Apresoline"],
  cls: "Vasodilator antihypertensive",
  cat: "obstetric",
  wards: ["emergency", "maternity", "medical"],
  tags: ["severe hypertension", "pre-eclampsia", "eclampsia"],
  presentation: ["20 mg powder ampoule — reconstitute with 1 mL WFI (20 mg/mL), then dilute to 10–20 mL with NS for slow IV.", "Tablets 25 mg, 50 mg."],
  indications: ["Severe hypertension in pregnancy (systolic ≥ 160 or diastolic ≥ 110 mmHg)", "Hypertensive emergency when labetalol/nifedipine unavailable"],
  standard: {
    summary: "Repeated small IV boluses (no pump required); infusion rarely used.",
    items: [
      { label: "IV (WHO)", text: "5 mg IV slowly over 1–2 min; recheck BP after 20 min and repeat 5–10 mg only if still severe, until diastolic BP 90–100 mmHg; max 20 mg per episode. Do NOT repeat at shorter intervals — the effect peaks at about 20 min, and 5-minute dosing has caused precipitous BP falls with fetal bradycardia (Williams)." }
    ]
  },
  improvised: [
    {
      title: "IM hydralazine (no IV)",
      best_for: "Health centre / pre-referral.",
      requires: ["im"],
      steps: ["12.5 mg IM every 2 h as needed (WHO). Onset 20–30 min; check BP every 15 min for the first hour."],
      monitor: ["BP every 15 min; fetal heart", "Avoid diastolic < 90 (placental perfusion)"],
      cautions: []
    },
    {
      title: "Safe slow IV without an infusion",
      best_for: "Any facility with a syringe and NS.",
      requires: ["iv", "bp"],
      steps: [
        "Reconstitute 20 mg in 1 mL WFI, then add to 19 mL NS → 1 mg/mL in a 20 mL syringe. Label.",
        "Give 5 mL (5 mg) over 5 min by the clock. Recheck BP after 20 min; repeat 5 mg if diastolic still ≥ 110. Max 20 mg.",
        "Preload with 250–500 mL NS/RL in pre-eclampsia if oliguric or fetal distress with the BP fall."
      ],
      monitor: ["BP every 5 min during and 20 min after; fetal heart"],
      cautions: ["Reflex tachycardia, headache, flushing; maternal hypotension → fetal distress."]
    },
    {
      title: "Oral alternatives when no injectables",
      best_for: "Stock-outs.",
      requires: ["oral"],
      steps: [
        "Nifedipine immediate-release 5–10 mg oral (swallowed, not sublingual); repeat after 30 min if needed (max 30–40 mg in the first hour) — WHO MCPC.",
        "Labetalol 200 mg oral, repeat after 1 h.",
        "Methyldopa is for maintenance, not acute control."
      ],
      monitor: ["BP every 15–30 min"],
      cautions: ["Nifedipine + magnesium sulfate: monitor for hypotension (usually safe)."]
    }
  ],
  cautions: ["Target diastolic 90–100 mmHg, not normal BP.", "Lupus-like syndrome with chronic use."],
  sources: [{ name: "WHO. Managing Complications in Pregnancy and Childbirth, 2017" }, { name: "WHO recommendations: drug treatment for severe hypertension in pregnancy, 2018" }],
  textbook: [
    { book: "williams", text: "Hydralazine IV 5 to 10 mg initially, then 10 mg every 15 to 20 minutes until response. Target systolic below 160 and diastolic 90 to 110 mm Hg; lower diastolic pressures risk placental hypoperfusion.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1630" },
    { book: "williams", text: "Always start with 5 mg regardless of BP severity; dosing more often than recommended (5-minute intervals) caused a precipitous fall in pressure with fetal bradycardia.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1631" },
    { book: "gabbe", text: "Severe hypertension in pregnancy (systolic 160 or diastolic 110 and above): IV hydralazine 5–10 mg bolus every 20 minutes, to a maximum of 20 mg in 60 minutes.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 712" },
    { book: "gabbe", text: "Antihypertensive therapy aims for systolic 140-155 and diastolic 90-105 mm Hg, not normal BP.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 708" },
    { book: "gabbe", text: "Hydralazine and nifedipine cause tachycardia and headache, so labetalol is preferred when maternal heart rate exceeds 100/min.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 712" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "labetalol",
  name: "Labetalol",
  aka: ["Trandate"],
  cls: "α/β-blocker",
  cat: "obstetric",
  wards: ["emergency", "maternity", "medical", "icu"],
  tags: ["severe hypertension", "pre-eclampsia", "hypertensive emergency"],
  presentation: ["5 mg/mL, 20 mL ampoule (100 mg).", "Tablets 100 mg, 200 mg."],
  indications: ["Severe hypertension in pregnancy", "Hypertensive emergency (stroke, dissection)"],
  standard: {
    summary: "Escalating IV boluses, or pump infusion 1–2 mg/min.",
    items: [
      { label: "Bolus regimen", text: "20 mg IV over 2 min; if BP not controlled after 10 min → 40 mg, then 80 mg, then 80 mg at 10-min intervals; max 300 mg cumulative." },
      { label: "Infusion (pump)", text: "1–2 mg/min (200 mg in 200 mL NS = 1 mg/mL), stop when target BP reached." }
    ]
  },
  improvised: [
    {
      title: "The bolus regimen needs no pump",
      best_for: "Any facility with the ampoule and a BP cuff.",
      requires: ["iv", "bp"],
      steps: [
        "20 mg = 4 mL IV over 2 min. Recheck BP at 10 min.",
        "Not controlled → 40 mg (8 mL) over 2 min; then 80 mg (16 mL) over 2 min at 10-min intervals; maximum 300 mg total.",
        "Target: systolic 140–150, diastolic 90–100 mmHg in pregnancy."
      ],
      monitor: ["BP every 5 min during titration; pulse (hold if < 60)", "Fetal heart"],
      cautions: ["Avoid in asthma, heart failure, heart block, bradycardia."]
    },
    {
      title: "Gravity infusion if boluses are unsuitable",
      best_for: "Facilities without pumps that prefer an infusion.",
      requires: ["iv", "macro_set"],
      steps: [
        "200 mg (40 mL) in 160 mL NS → 1 mg/mL in a 200 mL bag/burette. Label.",
        "1–2 mg/min = 60–120 mL/h = 20–40 drops/min with a 20 gtt/mL set. Stop when BP at target; effect persists.",
        "Do not exceed 300 mg total without re-evaluation."
      ],
      monitor: ["BP every 5 min", "Drop rate every 15 min"],
      cautions: []
    },
    {
      title: "Oral labetalol",
      best_for: "Less severe, or no IV.",
      requires: ["oral"],
      steps: ["200 mg oral; repeat after 1 h if needed; maintenance 100–400 mg twice daily (up to 2.4 g/day)."],
      monitor: ["BP hourly then 4-hourly"],
      cautions: []
    }
  ],
  cautions: ["Neonatal bradycardia/hypoglycaemia after maternal use.", "Postural hypotension."],
  sources: [{ name: "WHO. Managing Complications in Pregnancy and Childbirth, 2017" }, { name: "NICE NG133 Hypertension in pregnancy, 2019" }],
  textbook: [
    { book: "williams", text: "ACOG: labetalol 20 mg IV bolus; if not effective in 10 minutes, 40 mg, then 80 mg every 10 minutes, then hydralazine. Sibai caps 220 mg per treatment cycle. Not given to asthmatic women.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1632" },
    { book: "williams", text: "Labetalol causes maternal hypotension and bradycardia more often than hydralazine, and is contraindicated in asthma.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1632" },
    { book: "gabbe", text: "IV labetalol 20, 40, 80, 80, 80 mg every 10 min, maximum 300 mg; authors use it first-line and switch to hydralazine if 20, 40 and 80 mg fail.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 712" },
    { book: "gabbe", text: "Avoid labetalol in moderate-severe asthma, bradycardia below 60/min and congestive heart failure.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 712" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "tranexamic-acid",
  name: "Tranexamic acid",
  aka: ["TXA", "Cyklokapron"],
  cls: "Antifibrinolytic",
  cat: "haem",
  wards: ["emergency", "maternity", "medical", "surgical"],
  tags: ["PPH", "trauma", "haemorrhage", "epistaxis"],
  presentation: ["500 mg/5 mL ampoule (100 mg/mL).", "Tablets 500 mg."],
  indications: ["Postpartum haemorrhage (within 3 h of birth)", "Trauma haemorrhage / TBI (within 3 h)", "Epistaxis, dental and menstrual bleeding"],
  standard: {
    summary: "1 g slow IV over 10 min; trauma second dose by 8-h pump infusion.",
    items: [
      { label: "PPH (WHO)", text: "1 g IV over 10 min as soon as PPH is diagnosed, in addition to uterotonics; repeat 1 g after 30 min if bleeding continues." },
      { label: "Trauma (CRASH-2)", text: "1 g IV over 10 min then 1 g over 8 h (pump)." }
    ]
  },
  improvised: [
    {
      title: "Slow IV push by the clock",
      best_for: "Any facility. Fast injection causes hypotension.",
      requires: ["iv"],
      steps: [
        "Draw 1 g (10 mL) into a 10 mL syringe. Inject 1 mL every minute for 10 min (watch the second hand), or dilute in 100 mL NS in a burette and let it run over ~10 min.",
        "PPH: repeat 1 g after 30 min if bleeding continues. Do not use > 3 h after birth."
      ],
      monitor: ["BP", "Bleeding"],
      cautions: []
    },
    {
      title: "Trauma 8-hour dose without a pump",
      best_for: "District hospital trauma care.",
      requires: ["iv", "macro_set"],
      steps: [
        "1 g in 500 mL NS over 8 h = 62.5 mL/h ≈ 21 drops/min (20 gtt/mL; ≈ 5 per 15 s). Label the bag.",
        "Where an 8-h infusion cannot be reliably run (transfer, no nursing), some services give 2 g as a single slow IV dose over 10 min (military TCCC practice) — verify local protocol."
      ],
      monitor: ["Drop rate hourly"],
      cautions: ["Start within 3 h of injury; later use may increase mortality."]
    },
    {
      title: "Non-IV uses",
      best_for: "Minor bleeding.",
      requires: ["oral"],
      steps: ["Epistaxis/dental: gauze soaked with 500 mg/5 mL applied to the bleeding site.", "Oral 1–1.5 g three times daily for menorrhagia or after dental extraction (not for PPH/trauma)."],
      monitor: [],
      cautions: []
    }
  ],
  cautions: ["Avoid in active thromboembolism; reduce dose in renal failure.", "Williams advises against antifibrinolytics once consumptive coagulopathy is established (for example placental abruption or amniotic fluid embolism) and reports renal cortical necrosis with tranexamic acid. This does not change the WHO recommendation to give it early in postpartum haemorrhage.", "Never intrathecal (fatal)."],
  sources: [{ name: "WHO recommendation on tranexamic acid for the treatment of PPH, 2017" }, { name: "WOMAN trial collaborators. Lancet 2017; CRASH-2 collaborators. Lancet 2010" }],
  textbook: [
    { book: "williams", text: "Tranexamic acid inhibits clot lysis; Williams calls the evidence for adjunctive use in obstetrical haemorrhage limited, notes an association with renal cortical necrosis, and does not recommend routine prophylaxis.", ref: "Williams Obstetrics 25th ed. 2018, ch. 41 Obstetrical Hemorrhage, pdf p. 1748" },
    { book: "williams", text: "In consumptive coagulopathy (DIC), antifibrinolytics such as tranexamic acid are not recommended because fibrinolysis is needed to clear widespread fibrin thromboses.", ref: "Williams Obstetrics 25th ed. 2018, ch. 41 Obstetrical Hemorrhage, pdf p. 1736" },
    { book: "gabbe", text: "TXA for PPH reduced maternal death by nearly 20%; must be given within 3 h of bleeding onset to be effective.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 406" },
    { book: "gabbe", text: "Caesarean: pre-incision TXA 10 mg/kg IV (usually 1 g) reduces blood loss; prophylaxis after cord clamping did not reduce death or transfusion composite in large RCT.", ref: "Gabbe's Obstetrics 9th ed., ch. 21 Cesarean Delivery, p. 432" },
    { book: "schwartz", text: "CRASH-2: early TXA in bleeding trauma limits rebleeding and reduces mortality; benefit is within 3 h, later treatment worsened outcome.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 5 Shock, p. 145" },
    { book: "schwartz", text: "EAST conditionally recommends early TXA in severe injury; do not give with active intravascular clotting or with activated PCC or factor IX complex concentrates.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 4 Hemostasis, Surgical Bleeding, and Transfusion, p. 117" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "ringers-lactate",
  name: "Ringer's lactate / IV fluid resuscitation",
  aka: ["Hartmann's", "RL", "Normal saline (0.9 %)"],
  cls: "Crystalloid",
  cat: "electrolyte",
  wards: ["emergency", "maternity", "neonatal", "paediatric", "medical", "surgical", "icu", "outpatient"],
  tags: ["dehydration", "Plan C", "shock", "cholera", "sepsis"],
  presentation: ["Ringer's lactate 500 mL / 1 L bags.", "0.9 % NaCl 500 mL / 1 L. Half-strength Darrow's with 5 % dextrose (malnutrition)."],
  indications: ["Severe dehydration (WHO Plan C)", "Shock (hypovolaemic, septic)", "Cholera"],
  standard: {
    summary: "Volumes by weight and age; pumps are not normally used — this is a drop-counting skill.",
    items: [
      { label: "Plan C (WHO)", text: "100 mL/kg RL: infants < 12 months — 30 mL/kg in 1 h then 70 mL/kg in 5 h; ≥ 12 months — 30 mL/kg in 30 min then 70 mL/kg in 2.5 h. Repeat the first 30 mL/kg if the radial pulse is still weak. Reassess every 15–30 min." },
      { label: "Shock, child (WHO 2016)", text: "Only with signs of shock (cold hands + capillary refill > 3 s + weak fast pulse): 10–20 mL/kg over 30–60 min, reassess; avoid rapid boluses in febrile children without hypovolaemia (FEAST)." },
      { label: "Shock, adult", text: "Sepsis: 30 mL/kg crystalloid within 3 h. Haemorrhage: limited crystalloid, blood early." },
      { label: "Severe acute malnutrition with shock", text: "15 mL/kg over 1 h of RL with 5 % dextrose (or half-strength Darrow's + D5); reassess; repeat once if improving, else transfuse." }
    ]
  },
  improvised: [
    {
      title: "Converting Plan C into drops per minute and time-tape",
      best_for: "Every ward. Use the Plan C calculator in this app.",
      requires: ["iv", "macro_set"],
      steps: [
        "Phase 1, infant 8 kg: 240 mL over 1 h = 240 mL/h = 80 drops/min (20 gtt/mL) — 20 drops per 15 s.",
        "Phase 1, child 15 kg: 450 mL in 30 min = 900 mL/h = 300 drops/min — not countable: open the roller clamp fully with an 18–20 G cannula and check the bag every 10 min.",
        "Phase 2, child 15 kg: 1050 mL over 2.5 h = 420 mL/h = 140 drops/min (35 per 15 s).",
        "TIME-TAPE: stick a strip of tape on the bag and mark the fluid level expected at each hour; nurses adjust the clamp to keep on the line.",
        "Give ORS 5 mL/kg/h by mouth as soon as the child can drink (usually after 3–4 h in infants, 1–2 h in older children)."
      ],
      monitor: ["Reassess every 15–30 min: pulse, capillary refill, skin pinch, level of consciousness, urine", "Overload: rising RR, crackles, enlarging liver, puffy eyelids — slow down"],
      cautions: ["Malnourished children: never Plan C rates — use the SAM protocol."]
    },
    {
      title: "No IV access: NG rehydration and intraosseous",
      best_for: "Health post; failed cannulation; while awaiting referral.",
      requires: ["oral"],
      steps: [
        "NG ORS 20 mL/kg/h for 6 h (120 mL/kg) — reassess every 1–2 h; slow if repeated vomiting or abdominal distension.",
        "Oral ORS if able to drink: same 20 mL/kg/h.",
        "Intraosseous (child in shock, IV failed within 90 s): IO needle, or an 18 G spinal/hypodermic needle, into the flat medial proximal tibia 1–2 cm below the tuberosity; push fluids with a 20–50 mL syringe.",
        "Refer for IV if not improving after 3 h."
      ],
      monitor: ["Hydration signs hourly", "Abdominal distension"],
      cautions: []
    },
    {
      title: "Adult cholera / severe dehydration",
      best_for: "Cholera treatment centre; two large cannulae.",
      requires: ["iv", "macro_set"],
      steps: [
        "Total 100 mL/kg RL in 3 h: first 30 mL/kg as fast as possible (within 30 min — free flow through 2 × 16–18 G lines), then 70 mL/kg over 2.5 h (70 kg: 4.9 L ≈ 2 L/h ≈ 650 drops/min → run near free flow and check the bag every 15 min).",
        "Start ORS by mouth as soon as vomiting stops; then match ongoing losses (cholera cot bucket volumes).",
        "Add potassium via ORS (contains 20 mmol/L); antibiotics (doxycycline 300 mg once) after rehydration."
      ],
      monitor: ["Radial pulse, urine output, stool volume", "Overload in the elderly and cardiac patients"],
      cautions: ["Normal saline is acceptable if RL unavailable but lacks potassium/base — give ORS early."]
    },
    {
      title: "Precise small boluses with a syringe (neonates/infants, no pump)",
      best_for: "Neonatal unit without pumps.",
      requires: ["iv"],
      steps: ["Draw the bolus (neonate 10 mL/kg; infant 10–20 mL/kg) into a 20–50 mL syringe and push over 10–20 min via a three-way tap. Maintenance fluids for neonates without a pump: use a burette filled with 1–2 h of volume and a microdrip (drops/min = mL/h)."],
      monitor: ["Glucose, HR, RR, liver edge"],
      cautions: []
    }
  ],
  paediatric: ["Weigh the child. If no scale: (age in years + 4) × 2 kg (1–5 y); see the weight calculator."],
  cautions: ["FEAST 2011: fluid boluses increased mortality in febrile African children without severe dehydration/hypovolaemia — reserve boluses for true shock.", "Severe anaemia (Hb < 5) with respiratory distress: transfuse rather than crystalloid."],
  calc: { type: "planC" },
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013 (Plan C; shock)" }, { name: "WHO. Updated guideline: paediatric emergency triage, assessment and treatment, 2016" }, { name: "Maitland K et al. FEAST. NEJM 2011" }, { name: "WHO/GTFCC Cholera outbreak response field manual, 2019" }],
  textbook: [
    { book: "harrison", text: "Septic shock: balanced crystalloid such as lactated Ringer's may be preferable to 0.9% saline (less hyperchloraemic acidosis and kidney injury); avoid starches.", ref: "Harrison 22nd ed. 2025, ch. 315 Sepsis and Septic Shock, p. 2322" },
    { book: "harrison", text: "Septic shock: give crystalloid boluses of about 30 mL/kg, not appropriate for everyone (ESRD, systolic heart failure); guide further volume by dynamic reassessment such as capillary refill and passive leg raise.", ref: "Harrison 22nd ed. 2025, ch. 315 Sepsis and Septic Shock, p. 2322" },
    { book: "harrison", text: "DKA: 2-3 L of 0.9% saline or lactated Ringer's over the first 1-3 h (10-20 mL/kg/h); Ringer's lactate is associated with faster DKA resolution and less hyperchloraemia.", ref: "Harrison 22nd ed. 2025, ch. 416 Diabetes Mellitus: Management and Therapies, p. 3218" },
    { book: "williams", text: "In obstetrical haemorrhage establish one or more large-bore IV lines and infuse crystalloid rapidly while blood is obtained; initial crystalloid volume is two to three times estimated blood loss, as only 20 percent stays intravascular at 1 hour.", ref: "Williams Obstetrics 25th ed. 2018, ch. 41 Obstetrical Hemorrhage, pdf p. 1744" },
    { book: "williams", text: "In severe preeclampsia lactated Ringer is given routinely at 60 to 125 mL/h; vigorous fluids raise pulmonary and cerebral oedema risk, so oliguria is managed with small incremental boluses.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1633" },
    { book: "gabbe", text: "Haemorrhage: two large-bore IV lines, warmed crystalloid 3:1 to measured blood loss; aim systolic >90 and urine ≥30 mL/h; >3-4 L risks dilutional coagulopathy.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 418" },
    { book: "gabbe", text: "Obstetric septic shock: initial 1-2 L isotonic crystalloid (Ringer's lactate or saline), then assess fluid responsiveness; norepinephrine if MAP <65.", ref: "Gabbe's Obstetrics 9th ed., ch. 58 Bacterial and Parasitic Infections in Pregnancy, p. 1124" },
    { book: "schwartz", text: "Parkland/Baxter burns formula: 3-4 mL/kg per % burn of lactated Ringer's, half in first 8 h from burn, half over next 16 h; ABA consensus now starts at 2 mL/kg/%.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 8 Burns, p. 254" },
    { book: "schwartz", text: "Titrate burn resuscitation to MAP 60 mmHg and urine output 30 mL/h in adults, 1-1.5 mL/kg/h in children; formulas are only guidelines.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 8 Burns, p. 254" },
    { book: "schwartz", text: "Trauma: resuscitation usually begins with isotonic crystalloid, typically Ringer's lactate, but patients arriving in shock (SBP <90) should get a massive transfusion protocol instead of crystalloid.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 7 Trauma, p. 191" },
    { book: "nelson", text: "Dehydration: fluid bolus 20 mL/kg isotonic fluid (NS, Ringer lactate or Plasma-Lyte) over about 20 min; severe dehydration may need multiple boluses as fast as possible.", ref: "Nelson 22nd ed. 2024, ch. 70 Deficit therapy, p. 530" },
    { book: "nelson", text: "Septic shock: Surviving Sepsis suggests up to 40–60 mL/kg in 10–20 mL/kg boluses in the first hour, titrated to markers of cardiac output and stopped if overload develops — for settings with intensive care access, or any setting when hypotension is present. Where no intensive care is available, boluses are restricted (consistent with FEAST and WHO guidance).", ref: "Nelson 22nd ed. 2024, ch. 85 Shock, p. 611" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "calcium-gluconate",
  name: "Calcium gluconate",
  aka: ["Calcium chloride (alternative)"],
  cls: "Electrolyte / antidote",
  cat: "emergency",
  wards: ["emergency", "maternity", "neonatal", "paediatric", "medical", "icu"],
  tags: ["hyperkalaemia", "magnesium toxicity", "hypocalcaemia", "antidote"],
  presentation: ["10 % calcium gluconate: 10 mL ampoule = 1 g = 2.2 mmol calcium.", "10 % calcium chloride: 10 mL = 1 g = 6.8 mmol calcium (3× more potent, more irritant — central/large vein)."],
  indications: ["Magnesium sulfate toxicity (antidote)", "Hyperkalaemia with ECG changes (membrane stabilisation)", "Symptomatic hypocalcaemia", "Calcium-channel-blocker overdose"],
  standard: {
    summary: "Slow IV push or short infusion with ECG monitoring.",
    items: [
      { label: "MgSO4 toxicity", text: "1 g (10 mL of 10 %) IV over 5–10 min; repeat if needed." },
      { label: "Hyperkalaemia", text: "10 mL of 10 % calcium gluconate IV over 5–10 min (Schwartz gives 5–10 mL); repeat 10 mL after 5–10 min if ECG changes persist, to a total of about 30 mL. Works within minutes, lasts 30–60 min — follow with insulin/glucose and salbutamol." },
      { label: "Child", text: "0.5 mL/kg of 10 % calcium gluconate (max 20 mL) diluted 1:1 with NS, over 5–10 min; neonates max 1 mL/min." }
    ]
  },
  improvised: [
    {
      title: "Slow push by the clock, or burette",
      best_for: "No pump, no ECG.",
      requires: ["iv"],
      steps: [
        "Dilute 10 mL of 10 % calcium gluconate in 10–20 mL NS in a 20 mL syringe; inject over 5–10 min counting (2–4 mL per minute). Check the pulse rate every minute — stop if bradycardia.",
        "Or add 10–30 mL to 100 mL NS in a burette and run over 10–20 min (≈ 100–200 drops/min microdrip — use a macro set: 33–66 drops/min).",
        "Flush the line well before and after; never in the same line as bicarbonate, phosphate or ceftriaxone (precipitation)."
      ],
      monitor: ["Pulse continuously (bradycardia/asystole with fast injection, especially on digoxin)", "Site — extravasation causes necrosis"],
      cautions: ["Never IM or SC. Never in a scalp vein in neonates."]
    },
    {
      title: "Only calcium chloride available",
      best_for: "Emergency trolleys stocked with CaCl2.",
      requires: ["iv"],
      steps: ["Use one third of the volume: 3–5 mL of 10 % CaCl2 ≈ 10–15 mL of calcium gluconate. Dilute in 50–100 mL NS and give over 10 min via the largest vein available (ideally central)."],
      monitor: ["Pulse, site"],
      cautions: ["Severe tissue necrosis if extravasated."]
    }
  ],
  cautions: ["Digoxin toxicity: give calcium slowly over 20–30 min or avoid (arrhythmia).", "Does not lower potassium — it only protects the heart temporarily."],
  sources: [{ name: "UK Kidney Association. Treatment of acute hyperkalaemia in adults, 2023" }, { name: "WHO Managing Complications in Pregnancy and Childbirth 2017 (MgSO4 antidote)" }, { name: "WHO Pocket Book 2013" }],
  textbook: [
    { book: "harrison", text: "Hyperkalaemia with ECG changes: 10 mL of 10% calcium gluconate IV over 2-3 min with cardiac monitoring; acts in 1-3 min, lasts 30-60 min; repeat if ECG unchanged or changes recur.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 361" },
    { book: "harrison", text: "Patients on digoxin: use IV calcium with extreme caution; if needed add 10 mL of 10% calcium gluconate to 100 mL D5W and infuse over 20-30 min.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 361" },
    { book: "williams", text: "For magnesium-induced respiratory depression give calcium gluconate or chloride 1 g IV and stop magnesium; keep one available whenever magnesium is infused. Effect may be short-lived; severe depression needs intubation and ventilation.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1627" },
    { book: "gabbe", text: "Magnesium-induced respiratory depression: calcium gluconate 10% 10 mL IV over 3 min, with intubation if needed.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 733" },
    { book: "gabbe", text: "Neuromuscular blockade in women on magnesium plus nifedipine is readily reversed with 1 g IV calcium gluconate.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 712" },
    { book: "gabbe", text: "Atony due to magnesium or nifedipine: one ampule (1 g in 10 mL) calcium gluconate or chloride IV may improve uterine tone as an adjunct.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 406" },
    { book: "schwartz", text: "Hyperkalaemia with ECG changes: give calcium chloride or gluconate 5-10 mL of 10% immediately; caution with digitalis; effect temporary.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 3 Fluid and Electrolyte Management of the Surgical Patient, p. 95" },
    { book: "schwartz", text: "Acute symptomatic hypocalcaemia: IV 10% calcium gluconate; protocol gives 2 g IV over 1 h; correct magnesium first or it is refractory.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 3 Fluid and Electrolyte Management of the Surgical Patient, p. 96" },
    { book: "nelson", text: "Resuscitation: calcium gluconate 50–100 mg/kg IV/IO (calcium chloride 10 %: 20 mg/kg), max 2 g; administer slowly — fast push can cause heart block/asystole; use only with documented hypocalcaemia (or hyperkalaemia).", ref: "Nelson 22nd ed. 2024, Table 79.x, p. 563" },
    { book: "nelson", text: "Hyperkalaemia > 7 mEq/L or ECG changes: calcium gluconate 10 % 100 mg/kg/dose (max 3 g), sodium bicarbonate 1–2 mEq/kg IV over 5–10 min, regular insulin 0.1 unit/kg with 50 % glucose 1 mL/kg over 1 h. Calcium does not lower potassium.", ref: "Nelson 22nd ed. 2024, ch. 573, p. 3245" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "misoprostol",
  name: "Misoprostol",
  aka: ["Cytotec"],
  cls: "Prostaglandin E1 analogue (uterotonic)",
  cat: "obstetric",
  wards: ["emergency", "maternity", "outpatient"],
  tags: ["PPH", "postpartum haemorrhage", "induction", "abortion care", "retained products"],
  presentation: [
    "200 mcg tablets (also 25 mcg where available).",
    "Heat-stable and needs no cold chain — this is why it replaces oxytocin where refrigeration fails.",
    "Store in the original blister; tablets absorb moisture and lose potency once loose."
  ],
  indications: ["Prevention and treatment of postpartum haemorrhage", "Induction of labour (low dose, hospital only)", "Incomplete abortion and miscarriage care", "Cervical preparation before procedures"],
  standard: {
    summary: "Oxytocin remains first-line for PPH where a cold chain exists; misoprostol is the heat-stable alternative and the adjunct when bleeding continues.",
    items: [
      { label: "PPH prevention", text: "600 mcg orally once, immediately after birth, when oxytocin is unavailable or cannot be given safely (WHO)." },
      { label: "PPH treatment", text: "800 mcg sublingual once, in addition to oxytocin and tranexamic acid. Do not repeat." },
      { label: "Incomplete abortion", text: "600 mcg orally once, or 400 mcg sublingual once." },
      { label: "Induction (viable fetus)", text: "25 mcg orally or vaginally every 2 h (oral) or 6 h (vaginal). Hospital with fetal monitoring only." }
    ]
  },
  improvised: [
    {
      title: "PPH at a home birth or health post",
      best_for: "Community and health-post level with no cold chain, no IV and no oxytocin.",
      requires: ["oral"],
      steps: [
        "Prevention: 600 mcg (3 × 200 mcg tablets) orally immediately after the baby is born, before the placenta delivers. Swallow with water.",
        "Treatment of bleeding: 800 mcg (4 tablets) sublingual — placed under the tongue and left to dissolve, not swallowed. Sublingual acts fastest.",
        "Give only ONE treatment dose. Repeating does not stop bleeding and causes high fever.",
        "At the same time: rub up the uterus, empty the bladder, put the baby to the breast, and start bimanual compression if bleeding is heavy.",
        "Refer immediately. Write the dose, route and exact time on the referral note — the receiving facility must not repeat it."
      ],
      monitor: ["Bleeding, uterine tone and pulse every 15 min", "Temperature — shivering and fever up to 40 °C are common and settle within 3 h"],
      cautions: ["Never give misoprostol before the baby is delivered when the fetus is viable — it causes uterine rupture.", "Shivering and fever are expected, not an allergy."]
    },
    {
      title: "Rectal route when the woman is unconscious or vomiting",
      best_for: "Unconscious or fitting woman, or persistent vomiting, with no IV access.",
      requires: ["rectal"],
      steps: [
        "800–1000 mcg (4–5 tablets) inserted high in the rectum with a gloved finger.",
        "Onset is slower than sublingual (about 20 min) but absorption is reliable and it cannot be aspirated.",
        "Hold the buttocks together for 1 minute. Record time and dose."
      ],
      monitor: ["Bleeding, pulse, BP"],
      cautions: ["Slower onset — if the woman can take sublingual, prefer that route."]
    },
    {
      title: "Keeping tablets effective without a cold chain",
      best_for: "Health posts and outreach kits in hot climates.",
      requires: [],
      steps: [
        "Keep tablets sealed in the foil blister until the moment of use; misoprostol degrades with humidity, not heat.",
        "Discard any tablet that is discoloured, soft, chipped or loose in a jar.",
        "Do not pre-cut or store part-blisters. Rotate stock by expiry date."
      ],
      monitor: [],
      cautions: ["Loose tablets in a pill bottle may have lost most of their activity — a common hidden cause of 'misoprostol failure'."]
    }
  ],
  cautions: ["Fever, shivering and diarrhoea are dose-related and common.", "Uterine hyperstimulation and rupture if given with a viable fetus in utero, or combined with oxytocin during labour.", "Legal restrictions on abortion indications vary — follow national law and policy."],
  textbook: [
    { book: "williams", text: "Misoprostol is inferior to oxytocin for PPH prevention but suitable where oxytocin is lacking, as a single 600 microgram oral dose.", ref: "Williams Obstetrics 25th ed. 2018, ch. 27 Vaginal Delivery, pdf p. 1157" },
    { book: "williams", text: "For treatment of uterine atony ACOG recommends misoprostol 600 to 1000 micrograms rectally, orally or sublingually.", ref: "Williams Obstetrics 25th ed. 2018, ch. 41 Obstetrical Hemorrhage, pdf p. 1679" },
    { book: "williams", text: "Incomplete abortion: oral misoprostol 600 micrograms, or 800 micrograms vaginally, or 400 micrograms oral/sublingual. Medical and expectant options are deferred in unstable women or those with uterine infection.", ref: "Williams Obstetrics 25th ed. 2018, ch. 18 Abortion, pdf p. 762" },
    { book: "williams", text: "For cervical ripening or induction ACOG recommends a 25 microgram vaginal dose (a quarter of a 100 microgram tablet); higher doses cause more tachysystole.", ref: "Williams Obstetrics 25th ed. 2018, ch. 26 Induction and Augmentation of Labor, pdf p. 1113" },
    { book: "gabbe", text: "Misoprostol is a safe, cheap uterotonic needing no refrigeration; sublingual gives fastest onset at lowest dose, rectal highest bioavailability. Algorithm caps total at 1000 mcg.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 406" },
    { book: "gabbe", text: "Postpartum haemorrhage table: misoprostol 600–1000 mcg rectally and/or 400 mcg sublingually, total not above 1000 mcg; side-effects include fever, chills and diarrhoea.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 420" },
    { book: "gabbe", text: "Induction: ACOG recommends 25 mcg vaginally every 3-6 h; oral regimens use 20-25 mcg every 2 h; oxytocin may start 4 h after last dose.", ref: "Gabbe's Obstetrics 9th ed., ch. 14 Induction of Labor, p. 283" },
    { book: "note", text: "Nelson covers misoprostol chiefly as a cause of neonatal exposure and in obstetric context; PPH regimens are obstetric and are taken from WHO.", ref: "Editorial note" }
  ],
  sources: [
    { name: "WHO recommendations for the prevention and treatment of postpartum haemorrhage, 2012 (and 2018 updates)" },
    { name: "WHO. Managing Complications in Pregnancy and Childbirth, 2nd ed. 2017" },
    { name: "FIGO misoprostol-only recommended regimens, 2023" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "ergometrine",
  name: "Ergometrine (methylergometrine)",
  aka: ["Ergonovine", "Methergine", "Syntometrine (with oxytocin)"],
  cls: "Ergot alkaloid uterotonic",
  cat: "obstetric",
  wards: ["emergency", "maternity"],
  tags: ["PPH", "postpartum haemorrhage", "uterine atony"],
  presentation: [
    "0.2 mg/mL (0.5 mg/mL in some countries) 1 mL ampoule.",
    "Heat- and light-sensitive: requires 2–8 °C and protection from light. Discoloured ampoules have lost potency.",
    "Syntometrine = oxytocin 5 IU + ergometrine 0.5 mg in 1 mL."
  ],
  indications: ["Second-line treatment of PPH from uterine atony", "Third stage of labour where policy includes it"],
  standard: {
    summary: "Given after oxytocin when bleeding continues, provided blood pressure is normal.",
    items: [
      { label: "PPH treatment", text: "0.2 mg IM. Repeat 0.2 mg IM after 15 min if bleeding continues, then every 4 h if needed. Maximum 5 doses (1 mg) in 24 h." },
      { label: "IV route", text: "0.2 mg IV slowly over at least 1 min — only for life-threatening bleeding, because of hypertension and vomiting." }
    ]
  },
  improvised: [
    {
      title: "Second-line IM use when oxytocin has failed",
      best_for: "Any facility. Needs no pump, no IV and no dilution.",
      requires: ["im", "bp"],
      steps: [
        "CHECK THE BLOOD PRESSURE FIRST. Do not give if the woman has pre-eclampsia, eclampsia, hypertension or heart disease — use misoprostol or tranexamic acid instead.",
        "0.2 mg (1 mL of 0.2 mg/mL) deep IM into the thigh or buttock.",
        "Repeat 0.2 mg IM after 15 min if the uterus is still soft and bleeding continues.",
        "Then 0.2 mg IM every 4 h as needed, to a maximum of 5 doses in 24 h.",
        "Continue uterine massage, bimanual compression and fluid resuscitation throughout."
      ],
      monitor: ["BP before each dose and 15 min after", "Bleeding and uterine tone", "Nausea and vomiting are common — have a bowl ready"],
      cautions: [
        "Absolutely contraindicated in pre-eclampsia, eclampsia and hypertension — it can cause stroke or seizure.",
        "Also avoid in heart disease, severe anaemia with heart failure, and retained placenta before delivery of the placenta."
      ]
    },
    {
      title: "Judging whether the ampoule is still active",
      best_for: "Facilities with unreliable refrigeration.",
      requires: [],
      steps: [
        "Ergometrine loses potency quickly above 25 °C and in light. Keep ampoules in the vaccine fridge inside their carton.",
        "Discard any ampoule that has turned yellow or brown, or that has been out of the fridge for weeks.",
        "If refrigeration cannot be guaranteed, stock misoprostol instead — it is heat-stable and does not fail silently."
      ],
      monitor: [],
      cautions: ["A clear ampoule is not proof of potency; a discoloured one is proof of degradation."]
    }
  ],
  cautions: ["Hypertension, stroke, seizure, myocardial ischaemia.", "Nausea and vomiting in about a quarter of women.", "Do not give before delivery of the baby."],
  textbook: [
    { book: "williams", text: "Second-line for atony: methylergonovine or ergonovine 0.2 mg IM, repeatable every 2 to 4 hours. Ergots, especially IV, may cause dangerous hypertension, particularly in preeclampsia or with HIV protease inhibitors.", ref: "Williams Obstetrics 25th ed. 2018, ch. 41 Obstetrical Hemorrhage, pdf p. 1678" },
    { book: "williams", text: "If given IV, methylergonovine 0.2 mg is injected slowly over not less than 60 seconds to avoid sudden hypertension; relatively contraindicated in hypertensive women.", ref: "Williams Obstetrics 25th ed. 2018, ch. 27 Vaginal Delivery, pdf p. 1157" },
    { book: "gabbe", text: "Methylergonovine 0.2 mg IM, repeatable every 2-4 h, for atony.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 420" },
    { book: "gabbe", text: "Contraindicated in hypertension (also scleroderma, migraine, Raynaud); unstable at room temperature.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 406" },
    { book: "gabbe", text: "Methergine should not be used in women with hypertensive disorders.", ref: "Gabbe's Obstetrics 9th ed., ch. 13 Normal Labor and Delivery, p. 271" },
    { book: "note", text: "Not covered as a paediatric drug in Nelson. Obstetric regimens are from WHO.", ref: "Editorial note" }
  ],
  sources: [
    { name: "WHO. Managing Complications in Pregnancy and Childbirth, 2nd ed. 2017" },
    { name: "WHO recommendations: uterotonics for the prevention of postpartum haemorrhage, 2018" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "dexamethasone",
  name: "Dexamethasone",
  aka: ["Decadron"],
  cls: "Corticosteroid",
  cat: "obstetric",
  wards: ["maternity", "paediatric", "medical", "outpatient"],
  tags: ["preterm labour", "antenatal corticosteroid", "croup", "asthma", "meningitis", "lung maturity"],
  presentation: ["4 mg/mL ampoules (also 5 mg/mL — check the label).", "0.5 mg and 4 mg tablets.", "Heat-stable, no cold chain needed."],
  indications: ["Preterm labour: fetal lung maturation (24–34 weeks)", "Croup", "Acute asthma", "Bacterial meningitis (with or before the first antibiotic dose)", "Raised intracranial pressure from tumour or high-altitude cerebral oedema"],
  standard: {
    summary: "Given by simple IM or oral dosing — one of the highest-impact drugs in a low-resource hospital and it needs no equipment at all.",
    items: [
      { label: "Antenatal (preterm labour)", text: "6 mg IM every 12 h for 4 doses (24 mg total), between 24 and 34 weeks, only when gestation is reliably dated, preterm birth is expected within 7 days, there is no maternal infection, and adequate newborn care is available (WHO)." },
      { label: "Croup", text: "0.6 mg/kg once (maximum 16 mg) orally, IM or IV. A single dose is enough." },
      { label: "Asthma", text: "0.6 mg/kg once (maximum 16 mg) oral, IV or IM — as effective as prednisolone for 5 days, with less vomiting. A second dose may be given the next day." },
      { label: "Meningitis", text: "0.15 mg/kg (adult 10 mg) every 6 h for 2–4 days, first dose with or just before the first antibiotic dose (not after). Harrison does not support it for patients in sub-Saharan Africa and other low-income settings unless pneumococcal meningitis is confirmed by Gram stain or culture — trials there showed no benefit." }
    ]
  },
  improvised: [
    {
      title: "Antenatal corticosteroids at health-centre level",
      best_for: "Threatened preterm birth anywhere a woman may deliver or be referred. This single intervention reduces newborn deaths more than most hospital equipment.",
      requires: ["im"],
      steps: [
        "Give only when ALL of these hold (WHO): gestational age is reliably 24–34 weeks; preterm birth is judged likely within 7 days; there is no clinical sign of maternal infection; and the baby can receive adequate newborn care, including resuscitation, warmth, feeding support and treatment of infection, here or at the referral facility.",
        "Why this matters: in a large trial in low- and middle-income countries, giving antenatal steroids broadly — with uncertain dating and many women who delivered at term — increased newborn deaths (Althabe 2015, cited in Williams). Steroids help when the conditions are met and can harm when they are not.",
        "Date the pregnancy as well as you can: an early scan is best; last menstrual period and fundal height are much less reliable. If you cannot place her in 24–34 weeks with reasonable confidence, refer rather than treat.",
        "When the conditions are met, give 6 mg (1.5 mL of 4 mg/mL) IM without waiting for transfer, and write the time on the referral note.",
        "Repeat 6 mg IM every 12 hours for 4 doses in total.",
        "Write each dose and time on the referral note so the receiving hospital continues the course rather than restarting it.",
        "Betamethasone 12 mg IM every 24 h for 2 doses is an equally acceptable alternative where stocked."
      ],
      monitor: ["Maternal temperature and signs of infection", "Blood glucose in diabetic women — steroids raise it", "Fetal heart"],
      cautions: [
        "Do NOT give if there is clinical chorioamnionitis or another untreated maternal infection, including active tuberculosis.",
        "Requires the capacity to provide newborn care or timely referral (WHO condition).",
        "The benefit is greatest when the first dose is given at least 24 h before birth, but even one dose given hours before delivery helps."
      ]
    },
    {
      title: "Croup with no nebuliser",
      best_for: "Health centre or hospital without nebulised adrenaline.",
      requires: ["oral"],
      steps: [
        "Give dexamethasone 0.6 mg/kg once, by mouth, using the injectable solution if no tablets or syrup exist — draw the dose into a syringe (no needle) and squirt it into the cheek, mixed with a little sweet drink if needed.",
        "Keep the child calm on the parent's lap; agitation worsens stridor.",
        "Humidified air has no proven benefit — do not delay the steroid for it.",
        "If stridor is present at rest, add nebulised adrenaline 0.5 mL/kg of 1:1000 (maximum 5 mL) where available and observe 2–4 h for rebound."
      ],
      monitor: ["Stridor at rest, chest indrawing, air entry, colour and level of consciousness"],
      cautions: ["Never examine the throat with a spatula if epiglottitis is possible.", "One dose is sufficient — do not give a course."]
    },
    {
      title: "Using the injectable solution by mouth",
      best_for: "Any facility that stocks only ampoules.",
      requires: ["oral"],
      steps: [
        "The 4 mg/mL injection is given orally at the same dose. It tastes bitter — mix with a small amount of juice, milk or sugar water.",
        "Volume for a 0.6 mg/kg dose: weight (kg) × 0.15 = mL of 4 mg/mL. A 10 kg child needs 1.5 mL.",
        "Use a 1 or 2 mL syringe with the needle removed. Give slowly into the side of the mouth."
      ],
      monitor: [],
      cautions: []
    }
  ],
  paediatric: ["Croup and asthma: single 0.6 mg/kg dose, maximum 16 mg.", "Meningitis: give with or before the first antibiotic; no benefit if given afterwards, and it is not recommended in settings where children present late or in meningitis complicating severe malnutrition or HIV."],
  cautions: ["Masks infection; raises blood glucose; avoid prolonged courses.", "Never give antenatal steroids when maternal infection is present."],
  calc: { type: "weight", dosePerKg: 0.6, doseUnit: "mg", conc: 4, concUnit: "mg/mL", maxDose: 16, label: "Croup / asthma single dose (0.6 mg/kg, 4 mg/mL)" },
  textbook: [
    { book: "harrison", text: "Adult bacterial meningitis: dexamethasone 10 mg IV given 15–20 min before the first antibiotic dose, repeated every 6 h for 4 days.", ref: "Harrison 22nd ed. 2025, ch. 143 Acute Meningitis, p. 1123" },
    { book: "harrison", text: "Benefit is unlikely if dexamethasone is started more than 6 h after antibiotics have begun.", ref: "Harrison 22nd ed. 2025, ch. 143 Acute Meningitis, p. 1123" },
    { book: "harrison", text: "Trials in low-income settings showed no benefit; in sub-Saharan Africa and low-income countries, patients with negative CSF Gram stain and culture should not receive dexamethasone.", ref: "Harrison 22nd ed. 2025, ch. 143 Acute Meningitis, p. 1123" },
    { book: "williams", text: "Single course for women 24 to 34 weeks at risk of delivery within 7 days: dexamethasone 6 mg IM every 12 hours for four doses, or betamethasone 12 mg IM twice 24 hours apart. Give the first dose even if the course cannot be completed.", ref: "Williams Obstetrics 25th ed. 2018, ch. 42 Preterm Birth, pdf p. 1823" },
    { book: "williams", text: "A single corticosteroid course is also recommended with ruptured membranes between 24 0/7 and 34 0/7 weeks.", ref: "Williams Obstetrics 25th ed. 2018, ch. 42 Preterm Birth, pdf p. 1821" },
    { book: "williams", text: "Late-preterm betamethasone (34 to 36 weeks) raised neonatal hypoglycemia; Parkland does not give steroids beyond 34 weeks and gives no repeat courses.", ref: "Williams Obstetrics 25th ed. 2018, ch. 42 Preterm Birth, pdf p. 1824" },
    { book: "gabbe", text: "Antenatal steroid course: betamethasone 12 mg IM twice 24 h apart, or dexamethasone 6 mg IM every 12 h for 4 doses; oral dexamethasone not a suitable alternative.", ref: "Gabbe's Obstetrics 9th ed., ch. 36 Spontaneous Preterm Labor and Birth, p. 680" },
    { book: "gabbe", text: "Single course for women at 24-34 weeks at risk of delivery within 7 days; regular repeat courses not recommended.", ref: "Gabbe's Obstetrics 9th ed., ch. 36 Spontaneous Preterm Labor and Birth, p. 680" },
    { book: "gabbe", text: "Severe preeclampsia at 24-34 weeks: give corticosteroids during initial observation.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 708" },
    { book: "nelson", text: "Acute asthma: a single oral, IV or IM dose of dexamethasone 0.6 mg/kg (maximum 16 mg) is an effective alternative to prednisone with less vomiting; a second dose may be given the next day.", ref: "Nelson 22nd ed. 2024, ch. 185 Childhood asthma, p. 1408" },
    { book: "nelson", text: "High-altitude cerebral oedema: dexamethasone 0.15 mg/kg per dose orally, IM or IV every 6 hours, maximum 4 mg per dose.", ref: "Nelson 22nd ed. 2024, ch. 87, Table 87.2 and text, pp. 633–634" },
    { book: "nelson", text: "Croup: nebulised L-epinephrine 5 mL of 1:1000 is as effective as racemic epinephrine; indications are stridor at rest, respiratory distress or hypoxaemia, with duration of effect under 2 hours.", ref: "Nelson 22nd ed. 2024, ch. 433, p. 2571" }
  ],
  sources: [
    { name: "WHO recommendations on interventions to improve preterm birth outcomes, 2015 (updated 2022)" },
    { name: "WHO Pocket Book of Hospital Care for Children 2013 (croup, meningitis)" },
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "nifedipine",
  name: "Nifedipine",
  aka: ["Adalat"],
  cls: "Calcium-channel blocker",
  cat: "obstetric",
  wards: ["emergency", "maternity", "medical"],
  tags: ["severe hypertension", "pre-eclampsia", "tocolysis", "preterm labour"],
  presentation: [
    "Immediate-release 10 mg capsules or tablets (the form used for acute blood-pressure control and tocolysis).",
    "Slow-release 20 mg, 30 mg and 60 mg tablets — NOT interchangeable with the immediate-release form.",
    "Heat-stable, oral only. No cold chain, no injection, no equipment."
  ],
  indications: ["Severe hypertension in pregnancy", "Tocolysis in preterm labour (to allow antenatal steroids and transfer)", "Chronic hypertension"],
  standard: {
    summary: "An oral first-line option for severe hypertension in pregnancy where no injectable agent is available, and the preferred tocolytic.",
    items: [
      { label: "Severe hypertension", text: "10 mg orally, swallowed. Repeat every 30 min if diastolic remains ≥ 110 mmHg, to a maximum of 30–40 mg in the first hour. Target diastolic 90–100 mmHg." },
      { label: "Tocolysis", text: "20 mg orally, then 10–20 mg every 6–8 h for up to 48 h, while antenatal corticosteroids are given and transfer is arranged." },
      { label: "Maintenance", text: "Slow-release 20–60 mg once or twice daily." }
    ]
  },
  improvised: [
    {
      title: "Severe hypertension with no injectable drug",
      best_for: "Health centre or hospital out of hydralazine and labetalol. Needs only a BP cuff.",
      requires: ["oral", "bp"],
      steps: [
        "Give 10 mg immediate-release SWALLOWED with water. Do not puncture the capsule and do not give it sublingually — that causes an uncontrolled BP crash and fetal distress.",
        "Recheck BP after 20–30 min.",
        "If diastolic is still ≥ 110 mmHg, repeat 10 mg. Maximum 30–40 mg in the first hour.",
        "Aim for diastolic 90–100 mmHg, not a normal BP — a lower pressure reduces placental blood flow.",
        "Give magnesium sulfate as well if there is severe pre-eclampsia or eclampsia; the combination is acceptable but watch for hypotension."
      ],
      monitor: ["BP every 15 min for the first hour, then every 30 min", "Fetal heart rate", "Headache and flushing are common"],
      cautions: ["Never sublingual or by capsule puncture.", "Watch for hypotension when combined with magnesium sulfate."]
    },
    {
      title: "Tocolysis to buy time for steroids and transfer",
      best_for: "Preterm labour between 24 and 34 weeks at a facility without newborn care.",
      requires: ["oral"],
      steps: [
        "Give dexamethasone 6 mg IM at the same time — the steroid is the intervention that saves the baby; the tocolytic only buys time for it.",
        "Nifedipine 20 mg orally, then 10–20 mg every 6–8 h for up to 48 hours.",
        "Arrange transfer to a facility with newborn care during this window.",
        "Stop tocolysis if there is bleeding, infection, fetal distress or the cervix is fully dilated."
      ],
      monitor: ["Maternal pulse and BP", "Contractions and fetal heart", "Temperature — do not continue tocolysis in the face of infection"],
      cautions: ["Do not use tocolysis beyond 48 h; it does not improve outcomes and can delay necessary delivery."]
    }
  ],
  cautions: ["Hypotension, flushing, headache, tachycardia.", "With magnesium sulfate in pre-eclampsia: acceptable with BP checks every 15 min (nifedipine does not potentiate magnesium, Williams). Do not combine the two as tocolytics.", "Slow-release tablets act too slowly for an emergency."],
  textbook: [
    { book: "williams", text: "For acute severe hypertension: 10 mg immediate-release oral nifedipine, then 10 to 20 mg after 20 to 30 minutes if needed, then labetalol. Sublingual use is no longer recommended because of dangerously rapid effects.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1632" },
    { book: "williams", text: "As tocolytic, calcium-channel blockers (especially nifedipine) are safer and more effective than beta-agonists; efficacy similar to magnesium sulfate.", ref: "Williams Obstetrics 25th ed. 2018, ch. 42 Preterm Birth, pdf p. 1831" },
    { book: "williams", text: "Combining nifedipine with magnesium for tocolysis is potentially dangerous because nifedipine may enhance magnesium's neuromuscular blockade.", ref: "Williams Obstetrics 25th ed. 2018, ch. 42 Preterm Birth, pdf p. 1832" },
    { book: "gabbe", text: "Severe hypertension: oral nifedipine 10-20 mg every 20 min, maximum 50 mg in 60 min; reasonable first choice when IV access unavailable and useful postpartum.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 712" },
    { book: "gabbe", text: "Combined magnesium plus nifedipine did not increase hypotension or neuromuscular blockade in a retrospective study.", ref: "Gabbe's Obstetrics 9th ed., ch. 38 Hypertensive Disorders of Pregnancy, p. 712" },
    { book: "gabbe", text: "Tocolysis: 20 mg oral load then 20 mg at 90 min (or 10 mg every 20 min up to 4 doses); then 20 mg every 3-8 h up to 72 h, max 180 mg/day. Contraindicated with severe preeclampsia, haemorrhage, chorioamnionitis.", ref: "Gabbe's Obstetrics 9th ed., ch. 36 Spontaneous Preterm Labor and Birth, p. 674" },
    { book: "nelson", text: "Nifedipine is listed for high-altitude pulmonary oedema prevention and treatment; for patients over 50 kg the adult dose of 30 mg extended-release every 12 hours is used. Side-effects include flushing, gastrointestinal distress and hypotension.", ref: "Nelson 22nd ed. 2024, ch. 87, Table 87.2, p. 633" }
  ],
  sources: [
    { name: "WHO recommendations: drug treatment for severe hypertension in pregnancy, 2018" },
    { name: "WHO. Managing Complications in Pregnancy and Childbirth, 2017" },
    { name: "WHO recommendations on interventions to improve preterm birth outcomes, 2015" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "hydrocortisone",
  name: "Hydrocortisone",
  aka: ["Solu-Cortef", "cortisol"],
  cls: "Corticosteroid",
  cat: "endocrine",
  wards: ["emergency", "paediatric", "medical", "surgical", "icu"],
  tags: ["adrenal crisis", "anaphylaxis", "asthma", "shock", "steroid cover"],
  presentation: ["100 mg powder vial with diluent (also 250 mg and 500 mg).", "Reconstitute with 2 mL water for injection → 50 mg/mL."],
  indications: ["Adrenal crisis", "Severe asthma when oral steroids cannot be given", "Anaphylaxis (after adrenaline)", "Septic shock unresponsive to fluids and vasopressors", "Steroid cover for surgery in steroid-dependent patients"],
  standard: {
    summary: "Bolus IV or IM dosing — no pump needed at any point.",
    items: [
      { label: "Adrenal crisis (child)", text: "100 mg/m² IV or IM once, then 25 mg/m² every 6 h (maximum 100 mg/day). Practical weight-based equivalent: 2–4 mg/kg per dose." },
      { label: "Adrenal crisis (adult)", text: "100 mg IV or IM bolus, then 200 mg over 24 h (50 mg every 6 h, or a continuous infusion) until stable, then taper (Harrison)." },
      { label: "Asthma", text: "Child 4 mg/kg (maximum 100 mg) IV/IM every 6 h; adult 100–200 mg." },
      { label: "Septic shock", text: "Adult 200 mg/day in divided doses or by infusion; child 1–2 mg/kg every 6 h, for catecholamine-resistant shock." }
    ]
  },
  improvised: [
    {
      title: "Adrenal crisis where no diagnosis is possible",
      best_for: "Shocked child or adult with hyponatraemia, hyperkalaemia and hypoglycaemia that does not respond to fluids — especially with known steroid use, ambiguous genitalia, or hyperpigmentation.",
      requires: ["im", "iv"],
      steps: [
        "Do not wait for cortisol results, which are unavailable in most district hospitals. Treat on suspicion.",
        "Reconstitute 100 mg with 2 mL water for injection (50 mg/mL). Give the full dose IV; if no IV access, give IM — absorption is adequate.",
        "Adult 100 mg; child 2–4 mg/kg (roughly 25 mg under 3 years, 50 mg for 3–12 years, 100 mg over 12 years).",
        "Give 0.9 % saline 20 mL/kg for shock and 10 % glucose 5 mL/kg if the sugar is low.",
        "Repeat hydrocortisone every 6 hours. Once stabilised, taper and arrange long-term replacement with oral hydrocortisone.",
        "Hydrocortisone at these doses covers both glucocorticoid and mineralocorticoid needs, so fludrocortisone is not required acutely."
      ],
      monitor: ["BP, pulse, level of consciousness", "Glucose hourly initially", "Sodium and potassium where available"],
      cautions: ["A patient on long-term steroids who stops abruptly, or who is ill or having surgery, needs stress dosing — double the usual oral dose during a febrile illness (Harrison's sick-day rule), and give hydrocortisone 100 mg IV or IM if vomiting, severely ill or collapsing."]
    },
    {
      title: "Steroid cover for surgery without an endocrinologist",
      best_for: "Any patient on daily steroids for more than 3 weeks who needs an operation.",
      requires: ["im"],
      steps: [
        "Always continue the patient's usual daily steroid dose on the day of surgery — a missed dose is the commonest cause of perioperative adrenal crisis.",
        "Low maintenance doses (prednisolone 5–15 mg a day): the usual dose is generally enough. Schwartz notes recent studies discourage routine supraphysiologic stress doses for these patients.",
        "Prednisolone 20 mg a day or more, or a major operation in a patient with suspected adrenal suppression: hydrocortisone 50–100 mg (child 2 mg/kg) IV at induction, then every 8 h for no more than 48 h, then back to the usual dose.",
        "Whatever the dose history, treat unexplained intraoperative hypotension that does not respond to fluids with hydrocortisone 100 mg IV.",
        "Record it clearly on the anaesthetic chart — a missed dose causes intraoperative collapse that looks like haemorrhage."
      ],
      monitor: ["BP intra- and post-operatively", "Glucose"],
      cautions: []
    }
  ],
  paediatric: ["Where body surface area cannot be calculated, use 2–4 mg/kg per dose — it is close enough and far better than delaying."],
  cautions: ["Hyperglycaemia, hypertension, fluid retention, immunosuppression with repeated dosing."],
  calc: { type: "weight", dosePerKg: 4, doseUnit: "mg", conc: 50, concUnit: "mg/mL", maxDose: 100, label: "Child dose (4 mg/kg) at 50 mg/mL" },
  textbook: [
    { book: "harrison", text: "Acute adrenal insufficiency: hydrocortisone 100 mg bolus, then 200 mg over 24 h by continuous infusion or IV/IM boluses, with saline initially at 1 L/h.", ref: "Harrison 22nd ed. 2025, ch. 398 Disorders of the Adrenal Cortex, p. 3069" },
    { book: "harrison", text: "Septic shock with ongoing vasopressor requirement: IV hydrocortisone 200 mg/day, often as 50 mg every 6 h.", ref: "Harrison 22nd ed. 2025, ch. 315 Sepsis and Septic Shock, p. 2323" },
    { book: "harrison", text: "Stress dosing in known adrenal insufficiency: double the routine oral glucocorticoid dose during febrile intercurrent illness; give 100 mg IV/IM hydrocortisone when severe.", ref: "Harrison 22nd ed. 2025, ch. 398 Disorders of the Adrenal Cortex, p. 3069" },
    { book: "harrison", text: "Anaphylaxis: glucocorticoids, antihistamines and bronchodilators are ancillary agents used once the patient is haemodynamically stable, not substitutes for epinephrine.", ref: "Harrison 22nd ed. 2025, ch. 364 Anaphylaxis, p. 2813" },
    { book: "schwartz", text: "Perioperative steroids: supraphysiologic stress dosing is discouraged for low/maintenance prednisone 5-15 mg; at 20 mg/day or more, extra glucocorticoid for no more than 2 perioperative days.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 12 Quality, Patient Safety, Assessments of Care, and Complications, p. 427" },
    { book: "schwartz", text: "Adrenal crisis: treat on suspicion; 2-3 L saline, dexamethasone 4 mg IV or hydrocortisone 100 mg IV every 8 h, then taper to maintenance.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 38 Thyroid, Parathyroid, and Adrenal, p. 1698" },
    { book: "schwartz", text: "Septic shock with hypotension responding poorly to fluids and vasopressors: consider IV hydrocortisone below 300 mg/day (about 200 mg/day elsewhere in the chapter).", ref: "Schwartz's Principles of Surgery 11th ed., ch. 6 Surgical Infections, p. 176" },
    { book: "nelson", text: "Adrenal crisis: hydrocortisone 100 mg/m² IV or IM once, followed by 25 mg/m² per dose IV/IM every 6 hours, maximum 100 mg/day, tapered as clinically indicated; reported regimens vary.", ref: "Nelson 22nd ed. 2024, ch. 352, Table 352.8, p. 2231" },
    { book: "nelson", text: "Neonatal hypotension: a test dose of hydrocortisone 1 mg/kg is given; if blood pressure rises, dosing continues at 0.5 mg/kg every 6–8 hours (under 34 weeks) or every 12 hours (34 weeks and above), with no further dosing if there is no response at 2–4 hours.", ref: "Nelson 22nd ed. 2024, ch. 120, p. 1055" },
    { book: "nelson", text: "Maintenance replacement in adrenal insufficiency is 8–12 mg/m²/day orally.", ref: "Nelson 22nd ed. 2024, ch. 113, p. 987" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO Model Formulary; MSF Clinical Guidelines" },
    { name: "Society for Endocrinology emergency guidance: adrenal crisis, 2023" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "naloxone",
  name: "Naloxone",
  aka: ["Narcan"],
  cls: "Opioid antagonist",
  cat: "emergency",
  wards: ["emergency", "neonatal", "medical", "surgical", "icu"],
  tags: ["antidote", "opioid", "respiratory depression", "overdose", "morphine"],
  presentation: ["0.4 mg/mL 1 mL ampoule.", "Also 1 mg/mL and 4 mg intranasal spray where available."],
  indications: ["Opioid-induced respiratory depression", "Opioid overdose", "Reversal after therapeutic morphine or pethidine", "Neonatal respiratory depression after maternal opioid (rarely, and never before ventilation)"],
  standard: {
    summary: "Titrated IV boluses; a repeat dose is usually needed because naloxone wears off before the opioid does.",
    items: [
      { label: "Full reversal (overdose)", text: "Child 0.1 mg/kg IV/IO/IM/SC (maximum 2 mg); adult 0.4–2 mg. Repeat every 2–3 min until breathing is adequate." },
      { label: "Partial reversal (therapeutic opioid)", text: "0.001–0.005 mg/kg (1–5 mcg/kg) increments — enough to restore breathing without abolishing analgesia or precipitating withdrawal." },
      { label: "Duration", text: "Effect lasts 20–60 min, shorter than most opioids. The patient must be watched for at least 2–4 hours, longer after long-acting opioids." }
    ]
  },
  improvised: [
    {
      title: "Dilute for titrated reversal without abolishing analgesia",
      best_for: "The post-operative or palliative patient who is over-sedated but in pain. Full-dose naloxone causes severe pain, vomiting and hypertension.",
      requires: ["iv"],
      steps: [
        "Draw 0.4 mg (1 mL) and dilute to 10 mL with 0.9 % saline → 40 mcg/mL.",
        "Give 1 mL (40 mcg) IV every 1–2 min while watching the respiratory rate. Stop as soon as breathing is adequate, usually after 1–3 mL.",
        "Support ventilation with a bag-valve-mask while you titrate — oxygen and airway come before the antidote.",
        "Set an alarm to reassess every 15 min for at least 2 h; the opioid outlasts the naloxone.",
        "If breathing falls again, repeat the titration. Where repeated doses are needed and no pump exists, give 0.4 mg IM as a depot alongside IV titration."
      ],
      monitor: ["Respiratory rate and depth every 2 min during titration, then every 15 min for 2 h", "Level of consciousness, pupils", "Pain score — under-treated pain after reversal is common"],
      cautions: ["Full-dose reversal in a dependent patient causes acute withdrawal: agitation, vomiting, hypertension, and rarely pulmonary oedema.", "Naloxone does not reverse benzodiazepine or barbiturate sedation — if breathing does not improve, the cause is something else."]
    },
    {
      title: "No IV access",
      best_for: "Pre-hospital, health post, collapsed patient with no cannula.",
      requires: ["im"],
      steps: [
        "Give the full dose IM into the thigh: child 0.1 mg/kg (maximum 2 mg), adult 0.4–0.8 mg. Onset 2–5 min.",
        "Intranasal: the injectable solution can be given as drops or with an atomiser, half into each nostril, at double the IV dose. Use the most concentrated ampoule available so the volume stays under 1 mL per nostril.",
        "Keep bagging the patient throughout. Ventilation, not naloxone, is what keeps them alive."
      ],
      monitor: ["Respiratory rate, colour, consciousness"],
      cautions: []
    },
    {
      title: "Newborn after maternal opioid in labour",
      best_for: "Term newborn who is not breathing and whose mother received pethidine or morphine within 4 hours.",
      requires: ["im"],
      steps: [
        "VENTILATE FIRST. Effective bag-and-mask ventilation is the treatment for a non-breathing newborn; naloxone is not part of resuscitation.",
        "Only after the heart rate and colour have recovered but breathing remains depressed, consider naloxone 0.1 mg/kg IM.",
        "NEVER give naloxone to the baby of a mother who is opioid dependent — it causes severe neonatal withdrawal and seizures.",
        "Watch the baby for at least 6 hours; apnoea can recur."
      ],
      monitor: ["Breathing, heart rate, tone, temperature", "Blood glucose"],
      cautions: ["Naloxone is no longer recommended as part of routine newborn resuscitation."]
    }
  ],
  cautions: ["Short duration — recurrence of respiratory depression is the main danger.", "Acute withdrawal in dependent patients.", "Ineffective in non-opioid causes of coma."],
  calc: { type: "weight", dosePerKg: 0.1, doseUnit: "mg", conc: 0.4, concUnit: "mg/mL", maxDose: 2, label: "Full reversal (0.1 mg/kg, max 2 mg) at 0.4 mg/mL" },
  textbook: [
    { book: "harrison", text: "Opioid overdose: secure airway; naloxone 0.4-2.0 mg IV, IM or via endotracheal tube, onset about 1-2 min IV; repeat doses or infusion as needed.", ref: "Harrison 22nd ed. 2025, ch. 467 Opioid-Related Disorders, p. 3690" },
    { book: "harrison", text: "Maintenance after reversal: give one-half to two-thirds of the initial reversing naloxone dose hourly (not needed if intubated).", ref: "Harrison 22nd ed. 2025, ch. 467 Opioid-Related Disorders, p. 3690" },
    { book: "harrison", text: "Fentanyl overdose may need about twice the usual naloxone dose; buprenorphine or fentanyl overdose may require total doses of 10 mg or more.", ref: "Harrison 22nd ed. 2025, ch. 467 Opioid-Related Disorders, p. 3690" },
    { book: "schwartz", text: "Naloxone rapidly reverses opioid effects and is used to rescue opioid-associated respiratory depression; poorly absorbed orally.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 46 Anesthesia for Surgical Patients, p. 2031" },
    { book: "nelson", text: "Naloxone IV/IO/IM/SC 0.1 mg/kg for full reversal, maximum 2 mg; intranasal 4 mg spray, may repeat every 2–3 minutes; endotracheal 2–3 times the IV dose if no IV/IO access. Use lower doses (0.001–0.005 mg/kg) for respiratory depression from therapeutic opioid dosing. May need redosing every 2–3 minutes as the half-life is shorter than most narcotics.", ref: "Nelson 22nd ed. 2024, Table 79.5 Medications for pediatric resuscitation, p. 563" },
    { book: "nelson", text: "Opiate toxicity is confirmed by IV naloxone 0.1 mg/kg, not exceeding 2 mg, which dilates pupils constricted by the opiate; treatment consists of maintaining oxygenation and continued naloxone.", ref: "Nelson 22nd ed. 2024, ch. 156 Substance use, p. 1208" },
    {book: "kaplan",text: "Opioid overdose: secure the airway and ventilate first; naloxone about 0.8 mg per 70 kg IV slowly, repeated after a few minutes; too much precipitates withdrawal in dependent patients.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.4 Opioid-Related Disorders, pdf p. 948"},
    {book: "kaplan",text: "No response after 4–5 mg suggests non-opioid causes; naloxone is shorter acting than many opioids, so repeat doses may be needed.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.4 Opioid-Related Disorders, pdf p. 948"}
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO. Community management of opioid overdose, 2014" },
    { name: "WHO Pocket Book of Hospital Care for Children 2013" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "atropine",
  name: "Atropine",
  aka: [],
  cls: "Antimuscarinic",
  cat: "emergency",
  wards: ["emergency", "paediatric", "medical", "surgical", "icu"],
  tags: ["bradycardia", "organophosphate", "poisoning", "antidote", "secretions", "ketamine"],
  presentation: ["0.6 mg/mL or 1 mg/mL 1 mL ampoules (some stock 0.5 mg/mL — check every time).", "Heat-stable."],
  indications: ["Symptomatic bradycardia, especially vagally mediated", "Organophosphate and carbamate poisoning (pesticide poisoning)", "Drying secretions before ketamine anaesthesia", "Reversal of neuromuscular blockade with neostigmine"],
  standard: {
    summary: "Bolus dosing only. The organophosphate indication is the one that matters most in rural hospitals, and it needs far larger doses than people expect.",
    items: [
      { label: "Bradycardia (child)", text: "0.02 mg/kg IV/IO. Minimum dose 0.1 mg; maximum single dose 0.5 mg in a child, 1 mg in an adolescent. May repeat once." },
      { label: "Bradycardia (adult)", text: "0.5–1 mg IV every 3–5 min, maximum 3 mg." },
      { label: "Organophosphate poisoning", text: "Adult 2–5 mg IV; child 0.05 mg/kg IV. DOUBLE the dose every 5 min until the chest is clear and the patient is dry. Very large cumulative doses (tens of milligrams) are normal and necessary." },
      { label: "Before ketamine", text: "0.01–0.02 mg/kg IM (maximum 0.5 mg) 10–20 min before, to reduce salivation." }
    ]
  },
  improvised: [
    {
      title: "Organophosphate poisoning — dose doubling without an infusion pump",
      best_for: "Pesticide poisoning, one of the commonest poisonings in farming communities. Under-dosing atropine is the usual cause of death.",
      requires: ["iv", "im"],
      steps: [
        "Resuscitate first: airway, suction the secretions, oxygen, remove contaminated clothing, wash the skin with soap and water (staff wear gloves).",
        "Give atropine 2–5 mg IV in an adult (child 0.05 mg/kg). If no IV, give the same dose IM while access is obtained.",
        "After 5 minutes, reassess. If the chest is still wet, the patient still sweating, or the heart rate still low — DOUBLE the previous dose and give it again.",
        "Keep doubling every 5 minutes until all three endpoints are reached: chest clear on auscultation, skin dry, heart rate above 80 and systolic BP above 80.",
        "Then give roughly 10–20 % of the total loading dose each hour to maintain atropinisation. With no pump: add the hourly amount to 500 mL saline and run it by gravity, or give it as divided IV boluses every 15–30 minutes.",
        "Add pralidoxime 30 mg/kg IV over 20 min then 8 mg/kg/h where available. Diazepam for seizures or agitation.",
        "Do NOT use pupil size as the endpoint — pupils may stay small for hours."
      ],
      monitor: ["Chest sounds, skin dryness, heart rate and BP every 5 min during loading, then every 15–30 min", "Over-atropinisation: confusion, agitation, fever, absent bowel sounds, urinary retention — stop and restart at a lower rate", "Watch for the intermediate syndrome (weakness at 24–96 h) requiring ventilation"],
      cautions: [
        "The total dose needed is often 20–100 mg or more. Order supplies early — running out of atropine mid-resuscitation is a real and fatal risk.",
        "Never give a small fixed dose and repeat it unchanged; doubling is what works."
      ]
    },
    {
      title: "Bradycardia in a child",
      best_for: "Any facility. Remember the cause is usually hypoxia.",
      requires: ["iv"],
      steps: [
        "TREAT HYPOXIA FIRST — open the airway, give oxygen, ventilate. Most paediatric bradycardia is hypoxic and resolves with ventilation, not drugs.",
        "If bradycardia persists with poor perfusion despite oxygenation, give adrenaline 0.01 mg/kg, not atropine.",
        "Atropine 0.02 mg/kg IV is for vagally mediated bradycardia or AV block, or before intubation. Minimum 0.1 mg — smaller doses cause paradoxical slowing.",
        "Dilute to measure small volumes: 1 mL of 0.6 mg/mL + 5 mL saline = 0.1 mg/mL."
      ],
      monitor: ["Heart rate, perfusion, oxygen saturation"],
      cautions: ["Never give less than 0.1 mg as a single dose."]
    }
  ],
  paediatric: ["Minimum single dose 0.1 mg regardless of weight.", "Higher doses are used in organophosphate poisoning than for any other indication."],
  cautions: ["Hyperthermia in hot climates (blocks sweating) — sponge and cool the patient.", "Urinary retention, confusion and agitation with excess.", "Tachycardia is not a reason to withhold atropine in organophosphate poisoning."],
  calc: { type: "weight", dosePerKg: 0.02, doseUnit: "mg", conc: 0.6, concUnit: "mg/mL", maxDose: 0.5, minDose: 0.1, label: "Bradycardia dose (0.02 mg/kg, min 0.1 mg, max 0.5 mg)" },
  textbook: [
    { book: "harrison", text: "Bradycardic arrest rhythms/peri-arrest bradycardia: atropine 1 mg IV together with external or transvenous pacing; atropine is not part of the VF/PEA drug sequence.", ref: "Harrison 22nd ed. 2025, ch. 317 Cardiovascular Collapse, Cardiac Arrest, and Sudden Cardiac Death, p. 2337" },
    { book: "harrison", text: "Cholinesterase-inhibitor (organophosphate, carbamate, nerve agent) poisoning: atropine for muscarinic features; pralidoxime (2-PAM) for nicotinic features from organophosphates.", ref: "Harrison 22nd ed. 2025, ch. 470 Poisoning and Drug Overdose, p. 3712" },
    { book: "harrison", text: "Cardiac glycoside toxicity: atropine, dopamine, epinephrine and external pacing are temporizing measures for bradydysrhythmias pending digoxin Fab.", ref: "Harrison 22nd ed. 2025, ch. 470 Poisoning and Drug Overdose, p. 3712" },
    { book: "nelson", text: "Atropine IV/IO 0.02 mg/kg; minimum dose 0.1 mg for bradycardia treatment; maximum single dose 0.5 mg in a child and 1 mg in an adolescent; repeat once if needed. Endotracheal dose 0.04–0.06 mg/kg, maximum 2 mg. Higher doses may be used with organophosphate poisoning.", ref: "Nelson 22nd ed. 2024, Table 79.5, p. 563" },
    { book: "nelson", text: "In the bradycardia algorithm, atropine IV/IO 0.02 mg/kg may be repeated once, with epinephrine 0.01 mg/kg repeated every 3–5 minutes as the primary drug.", ref: "Nelson 22nd ed. 2024, Fig. 79 bradycardia algorithm, p. 561" },
    { book: "nelson", text: "Severe acute malnutrition with corneal ulceration: instil 1 drop of atropine 1 % into the affected eye to relax the eye and prevent the lens from pushing out.", ref: "Nelson 22nd ed. 2024, ch. 62, Table, p. 428" },
    {book: "kaplan",text: "Atropine 0.5 mg reverses physostigmine toxicity (salivation, sweating) when physostigmine is used for anticholinergic toxicity.",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1959"}
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "Eddleston M et al. Management of acute organophosphorus pesticide poisoning. Lancet 2008" },
    { name: "WHO. Clinical management of acute pesticide intoxication, 2008" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "amiodarone",
  name: "Amiodarone",
  aka: ["Cordarone"],
  cls: "Class III antiarrhythmic",
  cat: "cardio",
  wards: ["emergency", "medical", "icu"],
  tags: ["cardiac arrest", "VF", "ventricular tachycardia", "SVT", "arrhythmia"],
  presentation: ["150 mg/3 mL ampoule (50 mg/mL).", "200 mg tablets.", "Incompatible with saline for infusion — dilute in 5 % glucose only."],
  indications: ["Shock-refractory ventricular fibrillation and pulseless ventricular tachycardia", "Haemodynamically stable ventricular tachycardia", "Supraventricular arrhythmias resistant to other measures"],
  standard: {
    summary: "Bolus in arrest; slow infusion with ECG and BP monitoring when a pulse is present.",
    items: [
      { label: "Cardiac arrest (child)", text: "5 mg/kg IV/IO bolus; may repeat up to 3 doses total (15 mg/kg), maximum 300 mg per dose." },
      { label: "Cardiac arrest (adult)", text: "300 mg IV push after the third shock, then 150 mg after the fifth." },
      { label: "With a pulse", text: "5 mg/kg (adult 150–300 mg) over 20–60 minutes with ECG and BP monitoring — never as a push, because it causes hypotension." },
      { label: "Maintenance", text: "Adult 900 mg over 24 h via a central line where available." }
    ]
  },
  improvised: [
    {
      title: "Giving the loading dose over 20–60 minutes without a pump",
      best_for: "Stable ventricular tachycardia at a hospital with a cardiac monitor but no syringe driver.",
      requires: ["iv", "burette", "ecg"],
      steps: [
        "Dilute the dose in 100 mL of 5 % GLUCOSE — amiodarone precipitates in saline.",
        "Put the 100 mL in a burette so the maximum that can run in is one dose.",
        "Over 30 min = 200 mL/h = 67 drops/min with a 20 drops/mL set (about 17 drops per 15 s). Over 60 min = 100 mL/h = 33 drops/min.",
        "Use a large vein and a dedicated line; amiodarone is a severe vein irritant and causes phlebitis within hours.",
        "Stop or slow the infusion if systolic BP falls below 90 mmHg or the QRS widens by more than 50 %.",
        "In cardiac arrest only, the dose is given as a rapid push — the hypotension does not matter when there is no pulse."
      ],
      monitor: ["Continuous ECG if at all possible; otherwise pulse and BP every 5 min", "Infusion site hourly", "QT interval before and after"],
      cautions: [
        "Hypotension is dose- and rate-related; it is the reason the infusion must not be rushed.",
        "Do not combine with other QT-prolonging drugs (quinine, chloroquine, haloperidol, macrolides) without monitoring.",
        "If no monitor and no defibrillator exist, amiodarone for a stable arrhythmia is usually the wrong choice — treat reversible causes and refer."
      ]
    },
    {
      title: "If amiodarone is unavailable",
      best_for: "Stock-outs during resuscitation.",
      requires: ["iv"],
      steps: [
        "Lidocaine 1 mg/kg IV/IO bolus (maximum 100 mg) is the accepted alternative in shock-refractory VF and pulseless VT; repeat if an infusion starts more than 15 min after the bolus.",
        "Magnesium sulfate 25–50 mg/kg (adult 2 g) IV over 10–20 min, faster in torsades de pointes.",
        "Correct potassium, magnesium, hypoxia and acidosis — in low-resource settings these are more often the cause than a primary arrhythmia."
      ],
      monitor: ["ECG, BP"],
      cautions: []
    }
  ],
  cautions: ["Hypotension and bradycardia with rapid administration.", "Severe phlebitis peripherally.", "Thyroid, pulmonary, hepatic and corneal toxicity with long-term oral use.", "Contains iodine — caution in iodine allergy and thyroid disease."],
  calc: { type: "weight", dosePerKg: 5, doseUnit: "mg", conc: 50, concUnit: "mg/mL", maxDose: 300, label: "Loading dose (5 mg/kg, max 300 mg) at 50 mg/mL" },
  textbook: [
    { book: "harrison", text: "VF/pulseless VT recurring after shocks: amiodarone 300 mg IV or IO bolus, then a 150 mg bolus if the arrhythmia recurs; lidocaine if amiodarone fails.", ref: "Harrison 22nd ed. 2025, ch. 317 Cardiovascular Collapse, Cardiac Arrest, and Sudden Cardiac Death, p. 2336" },
    { book: "harrison", text: "Haemodynamically tolerated sustained VT after MI: amiodarone 150 mg IV over 10 min, then 1 mg/min for 6 h, then 0.5 mg/min.", ref: "Harrison 22nd ed. 2025, ch. 286 ST-Segment Elevation Myocardial Infarction, p. 2123" },
    { book: "harrison", text: "IV amiodarone given through a peripheral vein for more than 24 h can cause severe thrombophlebitis; long-term therapy needs thyroid, liver and lung monitoring.", ref: "Harrison 22nd ed. 2025, ch. 259 Approach to Ventricular Arrhythmias, p. 1958" },
    { book: "nelson", text: "Amiodarone 5 mg/kg IV/IO; repeat 5 mg/kg doses up to 15 mg/kg, maximum 300 mg. Monitor ECG and blood pressure as it can cause hypotension. Give over 20–60 minutes, though it can be given by IV push in cardiac arrest. Use caution with other drugs that prolong the QT interval.", ref: "Nelson 22nd ed. 2024, Table 79.5, p. 563" },
    { book: "nelson", text: "In the cardiac arrest algorithm, amiodarone 5 mg/kg IV/IO bolus may be repeated up to 3 total doses for refractory VF or pulseless VT; lidocaine 1 mg/kg loading dose is the alternative.", ref: "Nelson 22nd ed. 2024, Fig. 79.16 PALS cardiac arrest algorithm, p. 566" },
    { book: "nelson", text: "Adenosine, the first drug for SVT, is 0.1 mg/kg rapid IV/IO bolus (maximum 6 mg), then 0.2 mg/kg (maximum 12 mg), given with a flush.", ref: "Nelson 22nd ed. 2024, Table 79.5 and Fig. 79.12, pp. 562–563" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "American Heart Association PALS/ACLS guidelines, 2020" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "furosemide",
  name: "Furosemide (frusemide)",
  aka: ["Lasix", "frusemide"],
  cls: "Loop diuretic",
  cat: "cardio",
  wards: ["emergency", "maternity", "paediatric", "medical", "icu"],
  tags: ["heart failure", "pulmonary oedema", "transfusion", "fluid overload", "oedema"],
  presentation: ["10 mg/mL, 2 mL ampoule (20 mg) and 4 mL (40 mg).", "40 mg tablets.", "Heat-stable; protect from light."],
  indications: ["Acute pulmonary oedema", "Heart failure", "Fluid overload including over-transfusion and over-infusion", "Prevention of overload during transfusion in severe anaemia", "Oedema of renal or hepatic origin"],
  standard: {
    summary: "Bolus IV dosing. One of the few emergency drugs that needs nothing but a syringe.",
    items: [
      { label: "Acute pulmonary oedema (adult)", text: "40 mg IV slowly over 1–2 min; double the dose after 20–30 min if there is no response. Patients already on furosemide need at least their usual daily dose intravenously." },
      { label: "Child", text: "1 mg/kg per dose IV (maximum 2 mg/kg), or 2 mg/kg orally, every 12–24 h." },
      { label: "With transfusion", text: "1 mg/kg IV at the start of transfusion in a severely anaemic child with signs of heart failure (WHO)." }
    ]
  },
  improvised: [
    {
      title: "Acute pulmonary oedema without oxygen or morphine",
      best_for: "District hospital or health centre where the patient is drowning in fluid and little else is available.",
      requires: ["iv"],
      steps: [
        "Sit the patient upright with the legs dependent over the side of the bed. This alone shifts litres out of the chest and is free.",
        "Furosemide 40 mg IV slowly (child 1 mg/kg). Double it after 20–30 min if there is no urine and no improvement.",
        "Oxygen if available, by any route.",
        "If the blood pressure is adequate and nitrates are stocked, sublingual glyceryl trinitrate 0.5 mg every 5–10 min reduces preload faster than the diuretic does.",
        "Stop all running IV fluids. Record the running total — over-infusion is a common cause.",
        "Insert a urinary catheter if you have one, so that the response can actually be measured."
      ],
      monitor: ["Respiratory rate, oxygen saturation, chest crackles", "Urine output — the point of the drug; 500 mL or more in 2 h means it worked", "BP, potassium"],
      cautions: [
        "Furosemide worsens hypotensive or septic patients — be sure the problem is overload, not shock.",
        "Beware in severe anaemia with heart failure: the answer is slow packed-cell transfusion with furosemide, not diuresis alone."
      ]
    },
    {
      title: "Preventing overload during transfusion",
      best_for: "Severe anaemia from malaria, hookworm or malnutrition, especially in children.",
      requires: ["iv"],
      steps: [
        "If there are signs of heart failure, give 5–7 mL/kg of packed cells rather than 10 mL/kg of whole blood.",
        "Give furosemide 1 mg/kg IV at the START of the transfusion (not afterwards).",
        "Transfuse slowly over 3–4 hours and watch for rising respiratory rate, new crackles, and an enlarging liver.",
        "Do not give furosemide routinely in a severely malnourished child — circulatory overload and heart failure are managed by transfusing very slowly instead."
      ],
      monitor: ["Respiratory rate and liver edge every 30 min during transfusion", "Urine output"],
      cautions: []
    },
    {
      title: "No IV access",
      best_for: "Health post or failed cannulation.",
      requires: ["im", "oral"],
      steps: [
        "Furosemide can be given IM at the same dose; onset is slower (about 30 min) but reliable.",
        "Oral furosemide 40 mg (child 2 mg/kg) works within an hour if the patient can swallow and is not vomiting.",
        "Gut absorption is poor when the bowel wall is oedematous in severe heart failure — the IV or IM route is better in that situation."
      ],
      monitor: ["Urine output, respiratory rate"],
      cautions: []
    }
  ],
  paediatric: ["1 mg/kg per dose IV or 2 mg/kg orally every 12–24 h.", "Prolonged use in preterm infants causes nephrocalcinosis and hearing loss."],
  cautions: ["Hypokalaemia, hyponatraemia, hypovolaemia and acute kidney injury with over-diuresis.", "Ototoxicity with rapid large IV doses, and with concurrent gentamicin.", "Check and replace potassium — the combination of furosemide and digoxin without potassium monitoring causes digoxin toxicity."],
  calc: { type: "weight", dosePerKg: 1, doseUnit: "mg", conc: 10, concUnit: "mg/mL", maxDose: 40, label: "Child dose (1 mg/kg) at 10 mg/mL" },
  textbook: [
    { book: "harrison", text: "Acute pulmonary oedema: furosemide is the diuretic of choice and also an early venodilator; initial dose 0.5 mg/kg or less, 1 mg/kg in renal insufficiency, chronic diuretic use, hypervolaemia or after a lower dose fails.", ref: "Harrison 22nd ed. 2025, ch. 316 Cardiogenic Shock and Pulmonary Edema, p. 2331" },
    { book: "harrison", text: "Acute decompensated heart failure: IV loop diuretic at 1x home dose or 2.5x home dose is equally effective; higher dose carries more renal worsening. Oral furosemide range 20-240 mg daily.", ref: "Harrison 22nd ed. 2025, ch. 265 Heart Failure: Management, p. 1993" },
    { book: "nelson", text: "Severe acute malnutrition with very severe anaemia (Hb under 4 g/dL, or 4–6 g/dL with respiratory distress): give whole blood 10 mL/kg slowly over 3 hours, or 5–7 mL/kg packed cells if there are signs of heart failure, and give furosemide 1 mg/kg IV at the start of the transfusion.", ref: "Nelson 22nd ed. 2024, ch. 62 Severe acute malnutrition, Table, p. 428" },
    { book: "nelson", text: "Bronchopulmonary dysplasia: furosemide 1 mg/kg/dose IV or 2 mg/kg/dose orally every 12–24 hours decreases pulmonary interstitial oedema and pulmonary vascular resistance and facilitates weaning from respiratory support; adverse effects of long-term therapy are common.", ref: "Nelson 22nd ed. 2024, ch. 127, p. 1086" },
    { book: "nelson", text: "Heart failure dosing table: furosemide 1–4 mg/kg/day orally in divided doses; other agents listed include bumetanide, chlorothiazide and spironolactone.", ref: "Nelson 22nd ed. 2024, ch. 491, Table 491.6, p. 2898" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO Pocket Book of Hospital Care for Children 2013 (severe anaemia, transfusion)" },
    { name: "WHO Model Formulary" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "digoxin",
  name: "Digoxin",
  aka: ["Lanoxin"],
  cls: "Cardiac glycoside",
  cat: "cardio",
  wards: ["paediatric", "medical", "outpatient"],
  tags: ["heart failure", "atrial fibrillation", "rheumatic heart disease", "SVT"],
  presentation: ["0.25 mg/mL, 2 mL ampoule.", "0.0625 mg, 0.125 mg and 0.25 mg tablets; paediatric elixir 0.05 mg/mL where available."],
  indications: ["Rate control in atrial fibrillation, particularly with rheumatic heart disease", "Heart failure with reduced ejection fraction", "Supraventricular tachycardia in infants (specialist use)"],
  standard: {
    summary: "Oral loading and maintenance; a narrow therapeutic index makes potassium and renal function more important than the dose itself.",
    items: [
      { label: "Adult loading", text: "0.5 mg then 0.25 mg every 6 h for 2 doses (1 mg total) orally, then maintenance 0.0625–0.25 mg daily by renal function and age." },
      { label: "Child digitalisation", text: "Premature 20 mcg/kg; term neonate 20–30 mcg/kg; infant or child 25–40 mcg/kg — half initially, then a quarter every 12 h for 2 doses. IV dose is 75 % of the oral dose." },
      { label: "Child maintenance", text: "5–10 mcg/kg/day orally, divided every 12 h." }
    ]
  },
  improvised: [
    {
      title: "Using digoxin safely where no drug levels can be measured",
      best_for: "Almost every district hospital. Digoxin levels are rarely available anywhere in the region.",
      requires: ["oral"],
      steps: [
        "Use the lowest effective maintenance dose. In adults with normal renal function 0.125 mg daily is usually enough for rate control; 0.25 mg daily is the upper end.",
        "Halve the dose in the elderly, in small body weight, and in any renal impairment. Digoxin is cleared by the kidney and accumulates silently.",
        "Check the potassium before starting if you can, and whenever the patient is also on furosemide. Low potassium causes toxicity at normal doses.",
        "Judge the effect clinically: target a resting ventricular rate around 80–100 in atrial fibrillation, and improvement in breathlessness and liver size in heart failure.",
        "Teach the patient the toxic symptoms and tell them to stop the drug and return: nausea, vomiting, loss of appetite, yellow-green visual haloes, confusion, palpitations.",
        "Avoid rapid IV digitalisation unless there is no alternative — it offers little over oral loading and is the situation in which most toxicity occurs."
      ],
      monitor: ["Pulse rate and rhythm at every visit; withhold if under 60 in adults or under 100 in infants", "Potassium whenever a diuretic is added or the patient vomits or has diarrhoea", "Appetite and vomiting — the earliest signs of toxicity"],
      cautions: [
        "Hypokalaemia, hypomagnesaemia and hypercalcaemia all increase toxicity.",
        "Interactions that raise levels: amiodarone, verapamil, quinine, erythromycin, spironolactone. Halve the digoxin dose when amiodarone or quinine is started.",
        "In quinine-treated severe malaria with rheumatic heart disease, digoxin toxicity is easy to miss and hard to distinguish from malaria."
      ]
    },
    {
      title: "Suspected digoxin toxicity with no assay and no antidote",
      best_for: "Vomiting patient on digoxin with bradycardia or arrhythmia.",
      requires: ["ecg"],
      steps: [
        "Stop digoxin and all potassium-losing diuretics immediately.",
        "Check and correct potassium and magnesium. Give potassium if the level is low or unknown AND the patient is passing urine — but never if it is high, because hyperkalaemia in digoxin toxicity is a bad sign.",
        "Atropine 0.5–1 mg IV (child 0.02 mg/kg) for symptomatic bradycardia or heart block.",
        "Magnesium sulfate 2 g IV over 10–20 min for ventricular arrhythmia.",
        "AVOID calcium — it can precipitate fatal arrhythmia in digoxin toxicity.",
        "Digoxin-specific antibody (Fab) is the definitive treatment but is rarely available; refer if it exists anywhere reachable."
      ],
      monitor: ["Continuous ECG or frequent pulse checks", "Potassium every few hours if possible"],
      cautions: ["Calcium is contraindicated.", "Cardioversion can provoke refractory arrhythmia — use only for life-threatening rhythms and at low energy."]
    }
  ],
  paediatric: ["IV dose is 75 % of the oral dose.", "Doses are in micrograms per kilogram — a decimal error here is lethal. Have a second person check the calculation and the syringe."],
  cautions: ["Narrow therapeutic index; toxicity is common and often missed.", "Contraindicated in ventricular tachycardia, hypertrophic obstructive cardiomyopathy and Wolff-Parkinson-White with atrial fibrillation."],
  calc: { type: "weight", dosePerKg: 0.01, doseUnit: "mg", conc: 0.25, concUnit: "mg/mL", label: "Child maintenance (10 mcg/kg/day = 0.01 mg/kg) at 0.25 mg/mL" },
  textbook: [
    { book: "harrison", text: "Digoxin toxicity: Fab fragments for compromising dysrhythmias, Mobitz II/complete block, or K above 5.5 in acute poisoning; atropine, pacing for bradycardia, magnesium or lidocaine for ventricular arrhythmia; cardioversion only if refractory.", ref: "Harrison 22nd ed. 2025, ch. 470 Poisoning and Drug Overdose, p. 3712" },
    { book: "harrison", text: "Hypercalcaemia potentiates digoxin cardiotoxicity: if IV calcium is essential, dilute 10 mL of 10% calcium gluconate in 100 mL D5W and infuse over 20-30 min.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 361" },
    { book: "harrison", text: "In pulmonary oedema, digitalis is rarely used but can control ventricular rate in rapid AF/flutter with LV dysfunction because it is not negatively inotropic.", ref: "Harrison 22nd ed. 2025, ch. 316 Cardiogenic Shock and Pulmonary Edema, p. 2331" },
    { book: "harrison", text: "Heart failure: low digoxin doses suffice and higher doses breach the safety index; reduce the dose for high levels. DIG trial showed fewer admissions but no mortality benefit.", ref: "Harrison 22nd ed. 2025, ch. 265 Heart Failure: Management, p. 1996" },
    { book: "nelson", text: "Digitalisation: premature 20 mcg/kg; full-term neonate up to 1 month 20–30 mcg/kg; infant or child 25–40 mcg/kg; adolescent or adult 0.5–1 mg in divided doses — half initially, then a quarter every 12 hours for two doses. Maintenance 5–10 mcg/kg/day divided every 12 hours. These are oral doses; the IV dose is 75 % of the oral dose.", ref: "Nelson 22nd ed. 2024, ch. 491, Table 491.6 Drugs for congestive heart failure, p. 2898" },
    { book: "nelson", text: "Verapamil for SVT (not in Wolff-Parkinson-White) is 0.1–0.3 mg/kg per dose IV, maximum 5–10 mg; use with a beta blocker exacerbates heart failure and increases digoxin level and toxicity.", ref: "Nelson 22nd ed. 2024, ch. 484, Table, p. 2846" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO Model Formulary; WHO Essential Medicines List" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "ampicillin",
  name: "Ampicillin",
  aka: ["Amoxicillin (oral equivalent)"],
  cls: "Aminopenicillin",
  cat: "infection",
  wards: ["maternity", "neonatal", "paediatric", "medical", "surgical"],
  tags: ["neonatal sepsis", "pneumonia", "meningitis", "PSBI", "malnutrition"],
  presentation: ["250 mg, 500 mg and 1 g powder vials.", "Reconstitute 500 mg with 2 mL water for injection → 250 mg/mL.", "Use within 1 hour of reconstitution; it degrades quickly, faster in heat."],
  indications: ["Neonatal sepsis and severe bacterial infection in young infants (with gentamicin)", "Severe pneumonia", "Meningitis (with gentamicin or a cephalosporin)", "Routine antibiotic in severe acute malnutrition"],
  standard: {
    summary: "Intermittent IV or IM dosing — never an infusion, so no pump is needed anywhere.",
    items: [
      { label: "Neonate", text: "50 mg/kg IV or IM every 12 h in the first week of life, every 8 h in weeks 2–4 (WHO). Meningitis: 100 mg/kg per dose." },
      { label: "Child", text: "50 mg/kg IV or IM every 6 h (WHO). Meningitis 100 mg/kg every 6 h." },
      { label: "Adult", text: "1–2 g IV every 6 h; 2 g every 4 h in meningitis." },
      { label: "Severe malnutrition", text: "50 mg/kg IV or IM every 6 h for 2 days, then oral amoxicillin 25–40 mg/kg every 8 h for 5 days, with gentamicin once daily for 7 days." }
    ]
  },
  improvised: [
    {
      title: "Accurate small doses for neonates from a 500 mg vial",
      best_for: "Every newborn unit. The commonest dosing error in neonatal sepsis is a volume that cannot be measured.",
      requires: ["syringe_1ml", "im"],
      steps: [
        "Reconstitute the 500 mg vial with 2 mL water for injection → 250 mg/mL. Shake until completely clear.",
        "This is too concentrated for a neonate. Take 1 mL (250 mg) and add 4 mL water for injection → 5 mL of 50 mg/mL. Label the syringe with drug, strength and time.",
        "At 50 mg/kg the volume is now simply 1 mL per kg of body weight. A 2.5 kg baby gets 2.5 mL.",
        "Give slowly IV over 3–5 min, or IM into the anterolateral thigh (maximum 1 mL per site in a neonate — split larger volumes).",
        "Discard the remaining solution after the dose. Reconstituted ampicillin loses activity within hours, and faster without a fridge."
      ],
      monitor: ["Temperature, feeding, activity, respiratory rate at each dose", "Injection sites for induration"],
      cautions: ["Never keep a reconstituted vial overnight to 'save' it — potency is lost and contamination is likely."]
    },
    {
      title: "IM ampicillin at a health centre before referral",
      best_for: "Young infant with signs of possible serious bacterial infection where referral is delayed or refused.",
      requires: ["im"],
      steps: [
        "Give the first dose of ampicillin 50 mg/kg IM plus gentamicin by weight IM before transport, and write both on the referral note with the exact time.",
        "If referral is impossible, WHO simplified regimens allow ampicillin 50 mg/kg IM every 12 h for 2 days with gentamicin once daily for 7 days, then oral amoxicillin.",
        "Where injectable ampicillin is unavailable, oral amoxicillin 50 mg/kg twice daily for 7 days plus IM gentamicin once daily is the WHO regimen for clinical severe infection when referral is not feasible."
      ],
      monitor: ["Feeding, temperature, breathing, and re-assessment daily"],
      cautions: ["Simplified regimens are for when referral is genuinely not possible — hospital care remains better."]
    },
    {
      title: "No IV, no IM, only oral",
      best_for: "Stock-out of injectable forms.",
      requires: ["oral"],
      steps: [
        "Amoxicillin is the oral equivalent and is better absorbed than oral ampicillin — use amoxicillin, not ampicillin, by mouth.",
        "Child 40–50 mg/kg/day divided twice or three times daily; 80–90 mg/kg/day for pneumonia or otitis where resistance is a concern.",
        "Crush tablets and mix with a little breast milk or clean water for infants; dispersible tablets dissolve properly and are preferable."
      ],
      monitor: ["Response at 48 h"],
      cautions: ["Oral therapy is not adequate for meningitis or for a shocked patient."]
    }
  ],
  paediatric: ["Doses change with postnatal age in the first month — check the interval, not just the dose."],
  cautions: ["Penicillin allergy; rash with Epstein-Barr infection.", "High doses in renal impairment cause seizures."],
  calc: { type: "weight", dosePerKg: 50, doseUnit: "mg", conc: 50, concUnit: "mg/mL", label: "Dose 50 mg/kg using the 50 mg/mL neonatal dilution (1 mL per kg)" },
  textbook: [
    { book: "harrison", text: "Meningitis: adult ampicillin 12 g/day IV divided 4-hourly (2 g q4h); child over 1 month 300 mg/kg/day 6-hourly.", ref: "Harrison 22nd ed. 2025, ch. 143 Acute Meningitis, p. 1121" },
    { book: "harrison", text: "Add ampicillin to empirical meningitis therapy for Listeria cover in infants under 3 months, adults over 55, and those with impaired cell-mediated immunity (including pregnancy).", ref: "Harrison 22nd ed. 2025, ch. 143 Acute Meningitis, p. 1122" },
    { book: "williams", text: "Cesarean prophylaxis: a single 2 g dose of ampicillin or a first-generation cephalosporin is ideal, as effective as broad-spectrum or multidose regimens; predelivery (before incision) administration is favoured.", ref: "Williams Obstetrics 25th ed. 2018, ch. 37 Puerperal Complications, pdf p. 1476" },
    { book: "williams", text: "Metritis after vaginal delivery: up to 90 percent respond to ampicillin plus gentamicin; anaerobic coverage is added after cesarean delivery. Improvement expected within 48 to 72 hours.", ref: "Williams Obstetrics 25th ed. 2018, ch. 37 Puerperal Complications, pdf p. 1474" },
    { book: "williams", text: "Intrapartum GBS prophylaxis: penicillin is first-line and ampicillin an acceptable alternative, ideally given 4 or more hours before delivery.", ref: "Williams Obstetrics 25th ed. 2018, ch. 64 Infectious Diseases, pdf p. 2708" },
    { book: "williams", text: "PPROM 24 to 32 weeks: IV ampicillin plus erythromycin every 6 hours for 48 hours, then oral amoxicillin plus erythromycin for 5 days prolonged latency and reduced neonatal morbidity; avoid amoxicillin-clavulanate (necrotizing enterocolitis).", ref: "Williams Obstetrics 25th ed. 2018, ch. 42 Preterm Birth, pdf p. 1821" },
    { book: "gabbe", text: "GBS prophylaxis alternative: ampicillin 2 g IV load then 1 g every 4 h until delivery.", ref: "Gabbe's Obstetrics 9th ed., ch. 36 Spontaneous Preterm Labor and Birth, p. 679" },
    { book: "gabbe", text: "Chorioamnionitis: ampicillin 2 g every 6 h plus gentamicin; add anaerobic cover (metronidazole 500 mg or clindamycin) if caesarean.", ref: "Gabbe's Obstetrics 9th ed., ch. 58 Bacterial and Parasitic Infections in Pregnancy, p. 1118" },
    { book: "gabbe", text: "Preterm PROM latency: 48 h IV ampicillin 2 g every 6 h plus erythromycin, then 5 days oral amoxicillin and erythromycin.", ref: "Gabbe's Obstetrics 9th ed., ch. 37 Premature Rupture of the Membranes, p. 696" },
    { book: "gabbe", text: "Caesarean prophylaxis: first-generation cephalosporin (cefazolin 1-2 g) or ampicillin 30-60 min before incision; add azithromycin if in labour or membranes ruptured.", ref: "Gabbe's Obstetrics 9th ed., ch. 21 Cesarean Delivery, p. 427" },
    { book: "nelson", text: "Severe acute malnutrition: gentamicin 7.5 mg/kg IV or IM once daily for 7 days plus ampicillin 50 mg/kg IV or IM every 6 hours for 2 days, then oral amoxicillin 25–40 mg/kg every 8 hours for 5 days. For persistent diarrhoea or small bowel overgrowth add metronidazole 7.5 mg/kg orally every 8 hours for 7 days.", ref: "Nelson 22nd ed. 2024, ch. 62 Severe acute malnutrition, Table, p. 430" },
    { book: "nelson", text: "Invasive meningococcal disease: ampicillin IM or IV 200–400 mg/kg/day divided every 4–6 hours (4-hourly for meningitis), maximum 8 g/day; penicillin G 300,000–400,000 units/kg/day on the same interval, maximum 12–24 million units.", ref: "Nelson 22nd ed. 2024, ch. 237, Table 237.2, p. 1743" },
    { book: "nelson", text: "Severe infection requiring hospitalisation: ampicillin/sulbactam 200–400 mg ampicillin/kg/day IV divided every 6 hours, maximum 8 g ampicillin/day.", ref: "Nelson 22nd ed. 2024, ch. 430 Sinusitis, p. 2556" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO Pocket Book of Hospital Care for Children 2013" },
    { name: "WHO. Managing possible serious bacterial infection in young infants when referral is not feasible, 2015" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "benzylpenicillin",
  name: "Benzylpenicillin (penicillin G)",
  aka: ["Crystalline penicillin", "Penicillin G", "Procaine penicillin (separate product)"],
  cls: "Natural penicillin",
  cat: "infection",
  wards: ["emergency", "maternity", "neonatal", "paediatric", "medical", "outpatient"],
  tags: ["pneumonia", "meningitis", "neonatal sepsis", "tetanus", "syphilis", "rheumatic fever"],
  presentation: [
    "Powder vials of 600 mg (1 million units), 1.2 g (2 MU), 3 g (5 MU). 1 million units = 600 mg.",
    "Benzathine benzylpenicillin (1.2 or 2.4 MU) is a DIFFERENT, long-acting product for IM use only — never give it intravenously.",
    "Procaine penicillin is also IM only and must never be given IV."
  ],
  indications: ["Severe pneumonia", "Meningitis (with a second agent)", "Neonatal sepsis", "Tetanus", "Syphilis including congenital and in pregnancy", "Rheumatic fever prophylaxis (benzathine)"],
  standard: {
    summary: "Frequent intermittent dosing. Nothing here requires a pump, but the 4- to 6-hourly interval requires a ward that can actually give night doses.",
    items: [
      { label: "Child", text: "50,000 units/kg (30 mg/kg) IV or IM every 6 h. Meningitis: 100,000 units/kg every 6 h, or 300,000–400,000 units/kg/day divided 4-hourly." },
      { label: "Neonate", text: "50,000 units/kg IV every 12 h in the first week, every 8 h from 7–28 days. Meningitis 100,000 units/kg per dose." },
      { label: "Adult", text: "1.2–2.4 g (2–4 MU) IV every 4–6 h; up to 24 MU/day in meningitis." },
      { label: "Tetanus", text: "Penicillin G 100,000 units/kg/day IV divided every 4–6 h (maximum 12 MU/day) for 7–10 days; metronidazole is now preferred." }
    ]
  },
  improvised: [
    {
      title: "Reconstitution and volumes that a ward can actually give",
      best_for: "Any hospital. Getting the dilution right prevents both under-dosing and painful injections.",
      requires: ["im", "iv"],
      steps: [
        "Reconstitute 600 mg (1 MU) with 1.6 mL water for injection → about 2 mL of 500,000 units/mL for IM use.",
        "For IV use, dilute further: 600 mg in 5–10 mL water for injection and give slowly over 3–5 min, or add to 50–100 mL saline in a burette over 20 min.",
        "For children, make a working strength of 100,000 units/mL: take 1 mL of the 500,000 units/mL and add 4 mL water for injection. At 50,000 units/kg the volume is then 0.5 mL per kg.",
        "IM maximum volume per site: 1 mL in a neonate, 2 mL in a small child, 5 mL in an adult. Split larger volumes between sites.",
        "Use within 1 hour of reconstitution."
      ],
      monitor: ["Injection sites", "Temperature and clinical response at 48 h"],
      cautions: [
        "NEVER give benzathine or procaine penicillin intravenously — it causes cardiorespiratory arrest. Check the vial label every single time.",
        "Very high doses contain a large potassium load; caution in renal failure."
      ]
    },
    {
      title: "When the ward cannot give 4- to 6-hourly doses at night",
      best_for: "Health centres and small hospitals with one night nurse — a real and common constraint.",
      requires: ["im"],
      steps: [
        "Do not simply stretch the interval; penicillin is time-dependent and a missed night dose means hours below the effective concentration.",
        "Prefer an antibiotic with once- or twice-daily dosing where the diagnosis allows: ceftriaxone 50–80 mg/kg once daily IM or IV covers most of the same indications.",
        "If penicillin must be used, arrange the doses to fall at handover times and write the exact clock times on the chart rather than 'QID'.",
        "For syphilis and rheumatic fever prophylaxis, benzathine penicillin given IM every 2–4 weeks removes the problem entirely."
      ],
      monitor: ["Actual administration times against the chart"],
      cautions: []
    },
    {
      title: "Benzathine penicillin IM without lidocaine",
      best_for: "Syphilis in pregnancy and rheumatic fever prophylaxis — the two most cost-effective injections in a district hospital.",
      requires: ["im"],
      steps: [
        "Reconstitute with the supplied water or 2 mL of 1 % lidocaine if permitted locally — lidocaine makes the injection far less painful and improves adherence for monthly prophylaxis.",
        "Use a 21 G needle; the suspension is thick and blocks fine needles. Inject deep into the upper outer quadrant of the buttock or the vastus lateralis.",
        "Adult and child over 30 kg: 2.4 MU (syphilis) or 1.2 MU (rheumatic prophylaxis every 3–4 weeks). Child under 30 kg: 600,000 units.",
        "Give as a single injection, slowly, warming the syringe in the hand first to reduce viscosity.",
        "Keep the patient seated for 15 min afterwards and have adrenaline available."
      ],
      monitor: ["Anaphylaxis for 15–30 min", "Jarisch-Herxheimer reaction in syphilis — fever and contractions in pregnancy; warn the woman and monitor the fetus"],
      cautions: ["IM only. Aspirate before injecting; accidental intravascular injection causes severe reactions."]
    }
  ],
  cautions: ["Penicillin allergy — take a proper history and keep adrenaline at hand.", "Large sodium and potassium load at high doses."],
  textbook: [
    { book: "harrison", text: "Meningitis: adult penicillin G 20–24 million units/day IV divided 4-hourly; child 400,000 U/kg/day 4-hourly.", ref: "Harrison 22nd ed. 2025, ch. 143 Acute Meningitis, p. 1121" },
    { book: "harrison", text: "Penicillin G remains the drug of choice for meningococcal meningitis once the isolate is shown to be penicillin-susceptible; otherwise use ceftriaxone or cefotaxime.", ref: "Harrison 22nd ed. 2025, ch. 143 Acute Meningitis, p. 1122" },
    { book: "harrison", text: "Non-meningeal pneumococcal infection: IV penicillin G 12 million units/day in 6 divided doses (18–24 MU/day for intermediate strains).", ref: "Harrison 22nd ed. 2025, ch. 151 Pneumococcal Infections, p. 1193" },
    { book: "harrison", text: "Tetanus: penicillin 100,000–200,000 IU/kg/day is only an alternative; it may worsen spasms via GABA-receptor binding and was linked to higher mortality.", ref: "Harrison 22nd ed. 2025, ch. 157 Tetanus, p. 1231" },
    { book: "williams", text: "Risk-based GBS prophylaxis when culture status is unknown: give intrapartum antibiotics for delivery before 37 weeks, membranes ruptured 18 hours or more, or intrapartum temperature 38.0 C or higher.", ref: "Williams Obstetrics 25th ed. 2018, ch. 64 Infectious Diseases, pdf p. 2708" },
    { book: "williams", text: "Penicillin is first-line for intrapartum GBS prophylaxis; antibiotics given 4 or more hours before delivery are highly effective. Cefazolin if non-anaphylactic penicillin allergy.", ref: "Williams Obstetrics 25th ed. 2018, ch. 64 Infectious Diseases, pdf p. 2708" },
    { book: "williams", text: "Parenteral penicillin G is preferred for all stages of syphilis in pregnancy; many authorities give a second benzathine penicillin G dose 1 week after the first. There are no proven alternatives to penicillin in pregnancy.", ref: "Williams Obstetrics 25th ed. 2018, ch. 65 Sexually Transmitted Infections, pdf p. 2745" },
    { book: "gabbe", text: "Intrapartum GBS prophylaxis: penicillin G 5 million units IV load then 2.5-3 million units every 4 h until delivery; treat preterm labour with unknown GBS status.", ref: "Gabbe's Obstetrics 9th ed., ch. 36 Spontaneous Preterm Labor and Birth, p. 679" },
    { book: "nelson", text: "Tetanus: oral or IV metronidazole 30 mg/kg/day at 6-hourly intervals, maximum 4 g/day, is the antibiotic of choice; parenteral penicillin G 100,000 units/kg/day at 4- to 6-hourly intervals with a daily maximum of 12 million units is an alternative. Total duration 7–10 days.", ref: "Nelson 22nd ed. 2024, ch. 257 Tetanus, p. 1823" },
    { book: "nelson", text: "Meningococcal disease: penicillin G IM or IV 300,000–400,000 units/kg/day at 4- to 6-hourly intervals (4-hourly for meningitis), maximum 12–24 million units daily. It does not clear carriage, so prophylaxis is required at the end of treatment.", ref: "Nelson 22nd ed. 2024, ch. 237, Table 237.2, p. 1743" },
    { book: "nelson", text: "Diphtheria: aqueous crystalline penicillin G 150,000–250,000 units/kg/day divided every 6 hours IV or IM (up to 2–3 million units/day), or procaine penicillin 300,000 units every 12 hours IM for those 10 kg or less and 600,000 units every 12 hours for those over 10 kg, for 14 days.", ref: "Nelson 22nd ed. 2024, ch. 231 Diphtheria, p. 1728" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO Pocket Book of Hospital Care for Children 2013" },
    { name: "WHO guidelines for the treatment of Treponema pallidum, 2016" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "cloxacillin",
  name: "Cloxacillin (flucloxacillin)",
  aka: ["Flucloxacillin", "Oxacillin", "Nafcillin"],
  cls: "Antistaphylococcal penicillin",
  cat: "infection",
  wards: ["paediatric", "medical", "surgical", "outpatient"],
  tags: ["staphylococcus", "abscess", "osteomyelitis", "septic arthritis", "pyomyositis", "cellulitis", "empyema"],
  presentation: ["250 mg and 500 mg powder vials.", "250 mg and 500 mg capsules; syrup 125 mg/5 mL."],
  indications: ["Staphylococcal skin and soft-tissue infection", "Osteomyelitis and septic arthritis", "Pyomyositis", "Staphylococcal pneumonia and empyema", "Infected burns and surgical wounds"],
  standard: {
    summary: "Intermittent IV or IM dosing, then a long oral course. Staphylococcal bone and joint infection is common in the region and is undertreated far more often than it is overtreated.",
    items: [
      { label: "Child", text: "50 mg/kg IV or IM every 6 h for severe infection (osteomyelitis, pyomyositis, empyema); 25 mg/kg every 6 h for less severe." },
      { label: "Neonate", text: "25–50 mg/kg per dose every 12 h in the first week, every 8 h from 7–28 days." },
      { label: "Adult", text: "1–2 g IV every 6 h; 500 mg orally every 6 h for mild infection." },
      { label: "Duration", text: "Osteomyelitis and septic arthritis: 3–6 weeks in total, switching to oral once the fever has settled and the patient is improving. Stopping at 10 days causes relapse." }
    ]
  },
  improvised: [
    {
      title: "Osteomyelitis and pyomyositis where surgery is the treatment",
      best_for: "District hospital. Antibiotics alone rarely cure a collection.",
      requires: ["im", "oral"],
      steps: [
        "Drain the pus. Antibiotics cannot sterilise an abscess, a septic joint or a sequestrum. Incision and drainage, joint washout or sequestrectomy is the definitive treatment.",
        "Send pus for culture where a laboratory exists, and always send it before the first dose if that does not delay treatment.",
        "Cloxacillin 50 mg/kg IV or IM every 6 h (adult 2 g). Reconstitute 500 mg with 2 mL water for injection → 250 mg/mL; dilute further to 50 mg/mL for small children.",
        "Continue parenterally until the fever has settled for 48–72 h and the wound is clean, usually 5–14 days.",
        "Then switch to oral cloxacillin or flucloxacillin at the same dose four times a day to complete 3–6 weeks for bone, 2–3 weeks for joint, 2–3 weeks for pyomyositis.",
        "Take the oral doses on an empty stomach — food halves absorption."
      ],
      monitor: ["Temperature chart, wound appearance, pain and range of movement", "Ability to bear weight", "Repeat drainage if the fever returns"],
      cautions: [
        "The commonest reason for failure is a short course and inadequate drainage, not the wrong antibiotic.",
        "If there is no improvement in 48–72 h, look for undrained pus first, then consider MRSA or tuberculosis."
      ]
    },
    {
      title: "If cloxacillin is unavailable",
      best_for: "Stock-outs, which are frequent.",
      requires: ["oral", "im"],
      steps: [
        "Cefazolin or ceftriaxone covers most methicillin-sensitive staphylococci, though ceftriaxone is a weaker antistaphylococcal agent.",
        "Clindamycin 10 mg/kg every 8 h (oral or IV) is an excellent alternative for bone, joint and soft tissue, and covers many MRSA strains.",
        "Co-trimoxazole plus rifampicin is an oral option for MRSA where clindamycin is unavailable.",
        "Amoxicillin-clavulanate covers staphylococci and is often on the shelf when cloxacillin is not."
      ],
      monitor: [],
      cautions: ["Plain amoxicillin and ampicillin do NOT cover Staphylococcus aureus — this substitution is a common and costly error."]
    }
  ],
  cautions: ["Cholestatic hepatitis with flucloxacillin, especially in older adults and with courses over 2 weeks.", "Painful IM injection; thrombophlebitis IV.", "Poor oral absorption with food."],
  calc: { type: "weight", dosePerKg: 50, doseUnit: "mg", conc: 250, concUnit: "mg/mL", maxDose: 2000, label: "Severe infection (50 mg/kg per dose) at 250 mg/mL" },
  textbook: [
    { book: "harrison", text: "Adult MSSA osteomyelitis: nafcillin or oxacillin 2 g IV 6-hourly, then oral step-down; total antibiotic duration generally 6 weeks.", ref: "Harrison 22nd ed. 2025, ch. 136 Osteomyelitis, p. 1064" },
    { book: "harrison", text: "Serious MSSA infections (parenteral): nafcillin or oxacillin 2 g every 4 h, or cefazolin 2 g every 8 h.", ref: "Harrison 22nd ed. 2025, ch. 152 Staphylococcal Infections, p. 1203" },
    { book: "schwartz", text: "Hand osteomyelitis: debride necrotic bone; initial IV therapy should cover S. aureus, adjust to bone cultures, continue 4-6 weeks once improving.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 44 Surgery of the Hand and Wrist, p. 1949" },
    { book: "schwartz", text: "Abscess: S. aureus is the commonest pathogen; treat with incision and drainage, debridement, cultures, packing, elevation, immobilisation and antibiotics.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 44 Surgery of the Hand and Wrist, p. 1948" },
    { book: "nelson", text: "Nelson covers staphylococcal osteomyelitis, septic arthritis and pyomyositis with antistaphylococcal penicillins (oxacillin, nafcillin) or cefazolin, with clindamycin or vancomycin where MRSA is prevalent, alongside surgical drainage.", ref: "Nelson 22nd ed. 2024, chs. 208 Staphylococcus aureus, 719 Osteomyelitis, 720 Septic arthritis" }
  ],
  sources: [
    { name: "WHO Pocket Book of Hospital Care for Children 2013" },
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "MSF Clinical Guidelines — bone and joint infection" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "metronidazole",
  name: "Metronidazole",
  aka: ["Flagyl"],
  cls: "Nitroimidazole",
  cat: "infection",
  wards: ["emergency", "maternity", "paediatric", "medical", "surgical"],
  tags: ["anaerobes", "tetanus", "amoebiasis", "giardia", "sepsis", "abortion", "peritonitis"],
  presentation: ["500 mg in 100 mL infusion bag (5 mg/mL) — ready to use, no dilution.", "250 mg and 500 mg tablets.", "Suppositories 500 mg/1 g where available."],
  indications: ["Intra-abdominal sepsis, peritonitis, appendicitis", "Septic abortion and puerperal sepsis", "Tetanus (antibiotic of choice)", "Amoebic dysentery and liver abscess", "Giardiasis", "Small bowel overgrowth in severe malnutrition", "Anaerobic wound infection"],
  standard: {
    summary: "The 100 mL infusion bag runs over 20–30 minutes by gravity and needs no pump. Oral and rectal routes are as good as IV.",
    items: [
      { label: "Adult IV", text: "500 mg every 8 h by infusion over 20–30 min." },
      { label: "Child", text: "7.5 mg/kg every 8 h IV or orally (maximum 500 mg per dose)." },
      { label: "Tetanus", text: "30 mg/kg/day divided every 6 h, maximum 4 g/day, for 7–10 days — the antibiotic of choice." },
      { label: "Amoebic liver abscess / dysentery", text: "Adult 750 mg three times daily for 5–10 days; child 10 mg/kg three times daily. ALWAYS follow with a luminal agent to clear the cysts, which metronidazole does not eradicate — paromomycin 25–35 mg/kg/day in 3 doses for 7 days, or diloxanide furoate 500 mg three times daily for 10 days (Harrison)." },
      { label: "Giardiasis", text: "Child 5 mg/kg three times daily for 5–7 days." }
    ]
  },
  improvised: [
    {
      title: "Use the oral or rectal route instead of IV",
      best_for: "Almost every patient. Oral metronidazole is nearly 100 % absorbed, so the IV form is usually an unnecessary expense.",
      requires: ["oral"],
      steps: [
        "If the patient can swallow and is not vomiting, give oral metronidazole at the same dose as IV. Bioavailability is essentially complete.",
        "If the patient cannot swallow but has a nasogastric tube, crush the tablet and give it down the tube.",
        "If neither is possible and no IV bag exists, give a 500 mg suppository or a crushed tablet per rectum every 8 h.",
        "Reserve the IV bags for patients who are shocked, vomiting, or have an ileus.",
        "Switch from IV to oral as soon as the patient can drink — usually within 24–48 hours after laparotomy."
      ],
      monitor: ["Tolerance, nausea, metallic taste"],
      cautions: ["Do not give alcohol during and for 48 h after treatment — a severe disulfiram-like reaction."]
    },
    {
      title: "Running the 100 mL bag by gravity",
      best_for: "Any ward with a giving set.",
      requires: ["iv", "macro_set"],
      steps: [
        "The 500 mg in 100 mL bag is ready to use and needs no dilution.",
        "Run over 20–30 min: 100 mL in 30 min = 200 mL/h = 67 drops/min with a 20 drops/mL set, roughly 17 drops per 15 seconds.",
        "For a child needing 7.5 mg/kg, draw the calculated volume from the bag (1.5 mL per kg of the 5 mg/mL solution) and give it in a burette over 20–30 min, or slowly by syringe.",
        "Do not add other drugs to the bag."
      ],
      monitor: ["Drip rate", "Infusion site"],
      cautions: []
    },
    {
      title: "Tetanus at a district hospital",
      best_for: "The classic low-resource emergency where metronidazole is first-line.",
      requires: ["oral", "im"],
      steps: [
        "Metronidazole 30 mg/kg/day divided every 6 h orally, by nasogastric tube or IV for 7–10 days. It is preferred over penicillin, which antagonises GABA and may worsen spasms.",
        "Clean and debride the wound, but not until after the antitoxin has been given.",
        "Human tetanus immunoglobulin 500–3000 units IM (or equine antitoxin 10,000–20,000 units where TIG is unavailable, after a test dose).",
        "Control spasms with diazepam in escalating doses, and nurse in a dark, quiet room with minimal handling.",
        "Magnesium sulfate infusion reduces spasms and autonomic instability where it can be monitored.",
        "Start the tetanus vaccination course — the disease does not confer immunity."
      ],
      monitor: ["Spasms, airway, autonomic instability (BP and pulse swings)", "Respiratory depression from diazepam — have a bag-valve-mask at the bedside"],
      cautions: ["Mortality is high without ventilation; refer early if a ventilator exists anywhere reachable."]
    }
  ],
  paediatric: ["7.5 mg/kg every 8 h. For malnutrition with persistent diarrhoea or bacterial overgrowth, 7.5 mg/kg orally every 8 h for 7 days (WHO)."],
  cautions: ["Metallic taste, nausea; peripheral neuropathy with long courses.", "Disulfiram reaction with alcohol.", "Avoid high doses in the first trimester where alternatives exist."],
  calc: { type: "weight", dosePerKg: 7.5, doseUnit: "mg", conc: 5, concUnit: "mg/mL", maxDose: 500, label: "Child dose (7.5 mg/kg) from the 5 mg/mL infusion bag" },
  textbook: [
    { book: "harrison", text: "Tetanus: metronidazole is the preferred antibiotic, 400 mg rectally or 500 mg IV every 6 h for 7 days.", ref: "Harrison 22nd ed. 2025, ch. 157 Tetanus, p. 1231" },
    { book: "harrison", text: "Amoebic colitis: metronidazole 750 mg orally or IV three times daily for 5–10 days (or tinidazole 2 g/day for 3 days), followed by a luminal agent.", ref: "Harrison 22nd ed. 2025, ch. 230 Amebiasis and Infection with Free-Living Amebae, p. 1757" },
    { book: "harrison", text: "Mild–moderate complicated intra-abdominal infection: metronidazole 500 mg every 8–12 h combined with a cephalosporin or fluoroquinolone.", ref: "Harrison 22nd ed. 2025, ch. 124 Approach to the Patient with an Infectious Disease, p. 963" },
    { book: "williams", text: "Metronidazole has superior in vitro anaerobic activity; combined with ampicillin and an aminoglycoside it covers most organisms in serious pelvic infections.", ref: "Williams Obstetrics 25th ed. 2018, ch. 37 Puerperal Complications, pdf p. 1475" },
    { book: "gabbe", text: "Chorioamnionitis requiring caesarean: add anaerobic cover, metronidazole 500 mg (at least one dose) preferred to clindamycin by many experts.", ref: "Gabbe's Obstetrics 9th ed., ch. 58 Bacterial and Parasitic Infections in Pregnancy, p. 1118" },
    { book: "gabbe", text: "Genital tract sepsis (SMFM): ampicillin plus clindamycin or metronidazole plus gentamicin, or cefotaxime/ceftriaxone plus metronidazole; antibiotics within 1 h.", ref: "Gabbe's Obstetrics 9th ed., ch. 58 Bacterial and Parasitic Infections in Pregnancy, p. 1125" },
    { book: "schwartz", text: "Prophylaxis for colorectal surgery and non-perforated appendicectomy: cefazolin 1–2 g IV plus metronidazole IV, as a single dose within 60 minutes before incision.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 9 Wound Healing, p. 288" },
    { book: "schwartz", text: "Colorectal surgery or obstructed small intestine: cefazolin or ceftriaxone plus metronidazole (or ertapenem, cefoxitin, ampicillin-sulbactam).", ref: "Schwartz's Principles of Surgery 11th ed., ch. 6 Surgical Infections, p. 168" },
    { book: "schwartz", text: "Perforated appendicitis: preoperative cover for Gram-negatives and anaerobes, e.g. cephalosporin plus metronidazole; postoperative course generally under 4 days after source control.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 30 The Appendix, p. 1336" },
    { book: "nelson", text: "Tetanus: oral or intravenous metronidazole 30 mg/kg per day at 6-hourly intervals, maximum 4 g/day, decreases the number of vegetative forms of Clostridium tetani and is currently considered the antibiotic of choice. Total antimicrobial duration 7–10 days.", ref: "Nelson 22nd ed. 2024, ch. 257 Tetanus, p. 1823" },
    { book: "nelson", text: "Severe acute malnutrition: for persistent diarrhoea or small bowel overgrowth add metronidazole 7.5 mg/kg orally every 8 hours for 7 days.", ref: "Nelson 22nd ed. 2024, ch. 62, Table, p. 430" },
    { book: "nelson", text: "Clostridioides difficile infection, first episode or first recurrence, non-severe: metronidazole 7.5 mg/kg/dose (maximum 500 mg) orally three times daily for 10 days, or vancomycin 10 mg/kg/dose orally four times daily.", ref: "Nelson 22nd ed. 2024, ch. 258, Table 258.2, p. 1826" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO Pocket Book of Hospital Care for Children 2013" },
    { name: "MSF Clinical Guidelines" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "chloramphenicol",
  name: "Chloramphenicol",
  aka: [],
  cls: "Broad-spectrum antibiotic",
  cat: "infection",
  wards: ["emergency", "paediatric", "medical", "outpatient"],
  tags: ["meningitis", "typhoid", "plague", "rickettsia", "epidemic", "oily chloramphenicol"],
  presentation: [
    "1 g powder vial for injection (reconstitute with 5 mL water for injection → 200 mg/mL).",
    "Oily chloramphenicol 0.5 g/2 mL ampoule — a single deep IM dose used in meningitis epidemics.",
    "250 mg capsules; 125 mg/5 mL suspension; 1 % eye ointment."
  ],
  indications: ["Bacterial meningitis where third-generation cephalosporins are unavailable (with ampicillin or penicillin)", "Epidemic meningococcal meningitis (oily chloramphenicol, single dose)", "Typhoid fever where susceptible", "Plague, rickettsial disease, melioidosis as an alternative", "Bacterial conjunctivitis and trachoma (eye ointment)"],
  standard: {
    summary: "Still on the WHO essential list precisely because it is cheap, heat-stable and effective when nothing else is available. It is used less now because of marrow toxicity, not because it stopped working.",
    items: [
      { label: "Child", text: "25 mg/kg IV or IM every 6 h (100 mg/kg/day); meningitis 25 mg/kg every 6 h, maximum 4 g/day." },
      { label: "Adult", text: "500 mg to 1 g IV every 6 h." },
      { label: "Epidemic meningitis", text: "Oily chloramphenicol, single deep IM dose: adult and child over 15 years 3 g (6 mL); repeat once after 24–48 h if needed. Paediatric doses by weight per the epidemic protocol." },
      { label: "Neonates", text: "Avoid where possible. If unavoidable: 25 mg/kg/day in the first week — higher doses cause grey baby syndrome." }
    ]
  },
  improvised: [
    {
      title: "Single-dose oily chloramphenicol in a meningitis epidemic",
      best_for: "Meningitis belt outbreaks where hundreds of patients present and 6-hourly IV therapy is impossible.",
      requires: ["im"],
      steps: [
        "Warm the ampoule in the hand — the oily suspension is thick and hard to draw up when cold.",
        "Use a 21 G needle and a dry syringe. Give a single deep IM injection into the upper outer buttock.",
        "Adult dose 3 g (6 mL), split between two sites. Repeat once after 24–48 h only if there is no improvement.",
        "This one injection replaces a week of 6-hourly therapy and can be given at a health post, which is why it remains an epidemic tool.",
        "Ceftriaxone as a single IM dose is an equally effective alternative and is preferred where stocked, including in pregnancy."
      ],
      monitor: ["Level of consciousness, neck stiffness, fever at 24 and 48 h", "Injection site"],
      cautions: ["Oily chloramphenicol is for IM use only. Never intravenously.", "Not for neonates."]
    },
    {
      title: "Reconstitution and safe use without blood counts",
      best_for: "Hospitals with no full blood count available — the usual situation.",
      requires: ["iv", "im"],
      steps: [
        "Reconstitute the 1 g vial with 5 mL water for injection → 200 mg/mL. For children make a 50 mg/mL working strength by adding 1 mL to 3 mL of water.",
        "Give slowly IV over 3–5 min, or deep IM.",
        "Keep the course as short as the illness allows — usually 7 days for meningitis, 10–14 days for typhoid — and stop at the first sign of toxicity.",
        "Dose-related marrow suppression is predictable and reversible, appearing after about a week at high doses; it is not the same as the rare, fatal, idiosyncratic aplastic anaemia.",
        "Watch clinically for pallor, bleeding, bruising and new fever. Where any laboratory exists, check haemoglobin and white count twice weekly.",
        "Never exceed 100 mg/kg/day, and never use it in a neonate if any alternative exists."
      ],
      monitor: ["Pallor, bruising, bleeding gums, new fever", "Haemoglobin and white cell count twice weekly where possible", "In neonates: abdominal distension, vomiting, grey colour, hypotension — stop immediately"],
      cautions: [
        "Grey baby syndrome in neonates and in any patient given excessive doses.",
        "Aplastic anaemia is rare, idiosyncratic and unrelated to dose — it can follow even the eye ointment, though that risk is extremely small.",
        "Interactions: raises phenytoin and warfarin levels."
      ]
    }
  ],
  paediatric: ["Avoid in neonates where a cephalosporin exists.", "Doses above 100 mg/kg/day cause cardiovascular collapse."],
  cautions: ["Dose-related reversible marrow suppression; rare irreversible aplastic anaemia.", "Grey baby syndrome."],
  calc: { type: "weight", dosePerKg: 25, doseUnit: "mg", conc: 200, concUnit: "mg/mL", maxDose: 1000, label: "Dose 25 mg/kg every 6 h at 200 mg/mL" },
  textbook: [
    { book: "harrison", text: "Reserved for when other agents are contraindicated or ineffective, e.g. meningitis due to susceptible meningococcus, H. influenzae or pneumococcus; also typhoid and rickettsial infection.", ref: "Harrison 22nd ed. 2025, ch. 149 Treatment and Prophylaxis of Bacterial Infections, p. 1179" },
    { book: "harrison", text: "Adverse effects: aplastic anaemia, myelosuppression and grey baby syndrome; inhibits CYP2C19 and CYP3A4, raising levels of many co-administered drugs.", ref: "Harrison 22nd ed. 2025, ch. 149 Treatment and Prophylaxis of Bacterial Infections, p. 1179" },
    { book: "harrison", text: "Meningococcal disease in resource-poor settings: a single dose of oily chloramphenicol suspension (or ceftriaxone) has been used successfully.", ref: "Harrison 22nd ed. 2025, ch. 160 Meningococcal Infections, p. 1249" },
    { book: "nelson", text: "Chloramphenicol 50–100 mg/kg/day divided every 6 hours IV, maximum 4 g/day, is reserved for patients with doxycycline allergy and for pregnant women in Rocky Mountain spotted fever, because chloramphenicol is an independent risk factor for increased mortality compared with tetracyclines. Serum concentrations should be monitored if used.", ref: "Nelson 22nd ed. 2024, ch. 273 Rickettsial diseases, p. 1905" },
    { book: "nelson", text: "Bartonellosis: chloramphenicol 50–75 mg/kg/day is considered the drug of choice because it is also useful against concomitant Salmonella infection.", ref: "Nelson 22nd ed. 2024, ch. 250, p. 1815" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO. Managing meningitis epidemics in Africa: a quick reference guide, 2015" },
    { name: "WHO Pocket Book of Hospital Care for Children 2013" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "paracetamol",
  name: "Paracetamol (acetaminophen)",
  aka: ["Acetaminophen", "Panadol", "Calpol"],
  cls: "Analgesic and antipyretic",
  cat: "analgesia",
  wards: ["emergency", "maternity", "neonatal", "paediatric", "medical", "surgical", "outpatient"],
  tags: ["fever", "pain", "post-operative", "antipyretic"],
  presentation: [
    "500 mg tablets; 120 mg/5 mL and 250 mg/5 mL syrup.",
    "Suppositories 125 mg, 250 mg, 500 mg.",
    "1 g/100 mL IV infusion bottles (expensive; rarely justified when the gut works)."
  ],
  indications: ["Fever", "Mild to moderate pain", "Component of multimodal post-operative analgesia, reducing opioid requirement"],
  standard: {
    summary: "The single most useful analgesic in a low-resource hospital, because regular dosing by mouth or rectum reduces the need for opioids that may not exist.",
    items: [
      { label: "Child oral", text: "10–15 mg/kg every 4–6 h. Maximum 75 mg/kg/24 h (60 mg/kg under 2 years, 30–45 mg/kg in neonates)." },
      { label: "Child rectal", text: "20–30 mg/kg every 4 h, or 40 mg/kg every 6–8 h — rectal doses are higher because absorption is lower and slower." },
      { label: "Adult", text: "1 g every 6 h orally or rectally; maximum 4 g in 24 h; 3 g if underweight or malnourished; 2 g in cirrhosis or chronic heavy alcohol use, where toxicity has occurred at doses as low as 2 g (Harrison)." },
      { label: "IV", text: "Adult and child over 50 kg 1 g every 6 h; child 15 mg/kg every 6 h (10 mg/kg every 6 h under 2 years)." }
    ]
  },
  improvised: [
    {
      title: "Regular oral paracetamol as the backbone of post-operative pain relief",
      best_for: "Any hospital where morphine is scarce, irregular or tightly controlled.",
      requires: ["oral"],
      steps: [
        "Prescribe paracetamol REGULARLY by the clock, not 'as required'. Written as four fixed times a day it is actually given; written PRN it is not.",
        "Adult 1 g every 6 h. Child 15 mg/kg every 6 h.",
        "Add a regular NSAID where not contraindicated: ibuprofen 8–10 mg/kg every 8 h (child) or diclofenac 50 mg every 8 h (adult). The combination is close to a weak opioid in effect.",
        "Reserve the available opioid for breakthrough pain and for the first 24 h after major surgery.",
        "Add a local anaesthetic wound infiltration at the end of every operation — 0.25 % bupivacaine into the wound edges gives several hours of analgesia for almost no cost."
      ],
      monitor: ["Pain score at rest and on movement", "Total 24-hour paracetamol dose across all routes and all preparations"],
      cautions: [
        "Count every source. A patient given tablets, syrup and a combination cold remedy can easily exceed the maximum.",
        "Reduce to 3 g/day in malnutrition and low body weight, and to 2 g/day in cirrhosis or chronic heavy alcohol use (Harrison)."
      ]
    },
    {
      title: "Rectal paracetamol when the child cannot swallow",
      best_for: "Vomiting, convulsing, post-operative or unconscious children with no IV preparation.",
      requires: ["rectal"],
      steps: [
        "Give 20–30 mg/kg as a loading dose per rectum, then 15–20 mg/kg every 6 h. Rectal absorption is slower and less complete than oral, which is why the dose is higher.",
        "If only the wrong suppository strength exists, a suppository may be cut lengthwise with a clean blade to approximate the dose. Do not cut crosswise, as the drug is not evenly distributed.",
        "If no suppositories exist, a crushed tablet suspended in 5–10 mL of water can be given rectally with a syringe (no needle) as a retention enema.",
        "Hold the buttocks together for a minute."
      ],
      monitor: ["Temperature and comfort at 1 hour", "Total daily dose"],
      cautions: ["Do not repeat within 4 hours because 'it did not work' — rectal onset takes 60–90 min."]
    },
    {
      title: "Fever in a child without wasting drugs",
      best_for: "Outpatient and inpatient paediatrics.",
      requires: ["oral"],
      steps: [
        "Treat fever for discomfort, not for the number. A comfortable, drinking child with a temperature of 38.5 °C needs no antipyretic.",
        "Give paracetamol 15 mg/kg if the child is miserable, in pain or refusing fluids.",
        "Undress the child and offer frequent fluids. Tepid sponging is used in WHO guidance for very high fever but cold water and alcohol rubs are harmful.",
        "Do not alternate paracetamol and ibuprofen routinely — it causes dosing errors and has no clear benefit.",
        "Always look for the cause of the fever. Malaria, pneumonia and meningitis are not treated with antipyretics."
      ],
      monitor: ["Feeding and fluid intake, activity level, danger signs"],
      cautions: ["Antipyretics do not prevent febrile convulsions."]
    }
  ],
  paediatric: ["Neonatal maximum 30–45 mg/kg/24 h.", "Weigh the child. Dosing by age rather than weight is the commonest cause of paediatric overdose."],
  cautions: ["Hepatotoxicity in overdose, in malnutrition, and with chronic alcohol use.", "Overdose has no early symptoms — the child looks well for 24 hours."],
  antidote: "N-acetylcysteine 150 mg/kg IV over 1 h, then 50 mg/kg over 4 h, then 100 mg/kg over 16 h. Where no IV form exists, oral N-acetylcysteine or oral methionine 2.5 g every 4 h for 4 doses may be used. Start within 8 hours of ingestion for full protection, but give it even if presentation is late.",
  calc: { type: "weight", dosePerKg: 15, doseUnit: "mg", conc: 24, concUnit: "mg/mL", maxDose: 1000, label: "Child oral dose (15 mg/kg) using 120 mg/5 mL syrup (24 mg/mL)" },
  textbook: [
    { book: "harrison", text: "Acetaminophen can be used up to 4 g/day; reduce doses with liver dysfunction or heavy alcohol use, and limit to 2 g/day in cirrhosis.", ref: "Harrison 22nd ed. 2025, ch. 13 Palliative and End-of-Life Care, p. 81" },
    { book: "harrison", text: "In chronic alcohol use the toxic acetaminophen dose may be as low as 2 g; patients should be warned about standard doses.", ref: "Harrison 22nd ed. 2025, ch. 351 Toxic and Drug-Induced Hepatitis, p. 2670" },
    { book: "harrison", text: "Overdose: start N-acetylcysteine within 8 h (partly effective up to 24-36 h); Harrison cites a 140 mg/kg load over 1 h then 70 mg/kg every 4 h for 15-20 doses.", ref: "Harrison 22nd ed. 2025, ch. 351 Toxic and Drug-Induced Hepatitis, p. 2670" },
    { book: "schwartz", text: "Acetaminophen reduces postoperative opioid requirements; available orally, rectally and IV.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 46 Anesthesia for Surgical Patients, p. 2031" },
    { book: "schwartz", text: "Enhanced-recovery multimodal analgesia: pre- and postoperative acetaminophen plus NSAID (and gabapentin) to limit opioid use.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 50 Optimizing Perioperative Care: Enhanced Recovery and Chinese Medicine, p. 2120" },
    { book: "nelson", text: "Acetaminophen 10–15 mg/kg orally every 4 hours; 10 mg/kg IV every 4 hours or 15 mg/kg IV every 6 hours (10 mg/kg every 6 hours under 2 years); 20–30 mg/kg rectally every 4 hours or 40 mg/kg rectally every 6–8 hours. Maximum daily dosing 75 mg/kg/24 h in children, 60 mg/kg/24 h under 2 years, and 30–45 mg/kg/24 h in neonates. It has minimal antiinflammatory action and no antiplatelet or adverse gastric effects, but overdosing can produce fulminant hepatic failure.", ref: "Nelson 22nd ed. 2024, ch. 93 Pediatric pain management, Table 93.6, p. 681" },
    { book: "nelson", text: "Migraine: ibuprofen 7.5–10 mg/kg is well documented and often preferred; acetaminophen 15 mg/kg can be effective in those with a contraindication to NSAIDs.", ref: "Nelson 22nd ed. 2024, ch. 638 Headaches, p. 3645" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO. Guidelines on the management of chronic pain in children, 2020" },
    { name: "WHO Pocket Book of Hospital Care for Children 2013" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "lidocaine",
  name: "Lidocaine (lignocaine)",
  aka: ["Lignocaine", "Xylocaine"],
  cls: "Local anaesthetic and antiarrhythmic",
  cat: "analgesia",
  wards: ["emergency", "maternity", "medical", "surgical", "outpatient"],
  tags: ["local anaesthesia", "suturing", "nerve block", "arrhythmia", "VF", "circumcision"],
  presentation: [
    "1 % (10 mg/mL) and 2 % (20 mg/mL) vials, plain or with adrenaline 1:200,000.",
    "5 % heavy (hyperbaric) for spinal anaesthesia in some countries.",
    "Gel 2 % and topical spray 10 %."
  ],
  indications: ["Infiltration and nerve-block anaesthesia for suturing, incision and drainage, chest drains, circumcision and minor surgery", "Reducing pain of IM ceftriaxone and benzathine penicillin", "Shock-refractory ventricular fibrillation and pulseless VT when amiodarone is unavailable"],
  standard: {
    summary: "Nothing in low-resource surgery expands capability more than confident use of local anaesthesia. Knowing the maximum dose is what makes it safe.",
    items: [
      { label: "Maximum dose", text: "5 mg/kg without adrenaline; 7 mg/kg with adrenaline. In practice: a 60 kg adult may have 30 mL of 1 % plain, or 42 mL of 1 % with adrenaline." },
      { label: "Conversion", text: "1 % = 10 mg/mL. So 5 mg/kg = 0.5 mL/kg of 1 %, or 0.25 mL/kg of 2 %." },
      { label: "Onset and duration", text: "Onset 2–5 min; duration 1–2 h plain, 2–4 h with adrenaline." },
      { label: "Arrhythmia", text: "1 mg/kg IV/IO bolus (maximum 100 mg); infusion 20–50 mcg/kg/min. Repeat the bolus if an infusion starts more than 15 min later." }
    ]
  },
  improvised: [
    {
      title: "Diluting 2 % to 1 % or 0.5 % to cover a larger area",
      best_for: "Large wounds, burns dressings and field blocks when only 2 % is stocked.",
      requires: ["lidocaine"],
      steps: [
        "Dilute with 0.9 % saline, not water. Equal parts of 2 % and saline gives 1 %. One part 2 % to three parts saline gives 0.5 %.",
        "Dilute solutions are as effective for skin infiltration as concentrated ones, sting less, and let you cover much more area within the same milligram limit.",
        "Work out the milligram maximum first, then choose the concentration to give the volume you need. A 60 kg adult: 300 mg maximum plain, which is 30 mL of 1 % or 60 mL of 0.5 %.",
        "Buffer the sting by adding 1 mL of 8.4 % sodium bicarbonate to every 9 mL of lidocaine, where bicarbonate is available. Use within an hour of mixing.",
        "Warm the syringe in your hand, inject slowly through the wound edges rather than intact skin, and use the smallest needle you have."
      ],
      monitor: ["Total milligrams given, written down as you go", "Early toxicity: perioral tingling, metallic taste, tinnitus, dizziness, slurred speech"],
      cautions: [
        "ALWAYS aspirate before injecting. Intravascular injection causes seizures and cardiac arrest.",
        "Never use adrenaline-containing solution in fingers, toes, ears, nose or penis where the blood supply is end-arterial, unless you are trained in its use.",
        "Toxicity treatment: stop injecting, secure the airway and ventilate, give a benzodiazepine for seizures, and give 20 % lipid emulsion 1.5 mL/kg over 1 min then 0.25 mL/kg/min if available."
      ]
    },
    {
      title: "Field blocks and nerve blocks that replace general anaesthesia",
      best_for: "District hospitals with no anaesthetist. These techniques convert an impossible operation into a routine one.",
      requires: ["lidocaine"],
      steps: [
        "Digital block for a finger or toe: 1–1.5 mL of 1 % PLAIN lidocaine on each side of the base of the digit. No adrenaline.",
        "Wrist block for hand wounds: 3–5 mL around the median, ulnar and radial nerves at the wrist.",
        "Inguinal field block for hernia repair: infiltrate 20–30 mL of 0.5 % along the line of the incision and around the internal ring, in layers as you go.",
        "Local infiltration for caesarean section when no spinal or ketamine is possible: up to the maximum dose infiltrated in layers by an experienced operator. Slow and imperfect, but life-saving.",
        "Wound-edge infiltration at the end of any operation gives several hours of post-operative pain relief for the price of one vial.",
        "Pudendal block for instrumental delivery or repair of a tear: 10 mL of 1 % on each side."
      ],
      monitor: ["Running total of milligrams", "Patient talking with you throughout — a silent patient may be developing toxicity"],
      cautions: ["Add up the dose across all the blocks in one session; it is easy to exceed the maximum when several sites are injected."]
    },
    {
      title: "Reducing injection pain of IM antibiotics",
      best_for: "Ceftriaxone and benzathine penicillin, which are notoriously painful.",
      requires: ["lidocaine", "im"],
      steps: [
        "Reconstitute ceftriaxone 1 g with 3.5 mL of 1 % PLAIN lidocaine instead of water for injection.",
        "Benzathine penicillin may be reconstituted with 1 % lidocaine where national policy permits.",
        "NEVER give a lidocaine-reconstituted antibiotic intravenously. Mark the syringe.",
        "Do not use lidocaine for neonatal reconstitution — use water for injection."
      ],
      monitor: [],
      cautions: ["Plain lidocaine only — never the adrenaline-containing solution for reconstitution."]
    }
  ],
  paediatric: ["Maximum 5 mg/kg plain, 7 mg/kg with adrenaline — calculate before starting, as small children reach the limit with surprisingly small volumes.", "Topical anaesthetic creams or cold spray reduce cannulation pain where available."],
  cautions: ["Toxicity: circumoral numbness, tinnitus, agitation, seizures, then arrhythmia and arrest.", "Reduce the dose in liver failure, heart failure and the elderly."],
  calc: { type: "weight", dosePerKg: 5, doseUnit: "mg", conc: 10, concUnit: "mg/mL", label: "Maximum plain dose (5 mg/kg); 1 % = 10 mg/mL" },
  textbook: [
    { book: "harrison", text: "Refractory VF/pulseless VT in cardiac arrest: amiodarone 300 mg then 150 mg; if amiodarone fails, lidocaine can be given.", ref: "Harrison 22nd ed. 2025, ch. 317 Cardiovascular Collapse, Cardiac Arrest, and Sudden Cardiac Death, p. 2336" },
    { book: "harrison", text: "Arrest algorithm: lidocaine is a specific therapy for monomorphic VT and for polymorphic VT/VF due to acute coronary syndrome.", ref: "Harrison 22nd ed. 2025, ch. 317 Cardiovascular Collapse, Cardiac Arrest, and Sudden Cardiac Death, p. 2337" },
    { book: "harrison", text: "After STEMI, prophylactic IV lidocaine for ventricular premature beats without significant ventricular tachyarrhythmia is contraindicated (may increase mortality).", ref: "Harrison 22nd ed. 2025, ch. 286 ST-Segment Elevation Myocardial Infarction, p. 2123" },
    { book: "schwartz", text: "The standard lidocaine dosing limit is 7 mg/kg; only slowly absorbed dilute tumescent infiltration allows up to 35 mg/kg.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 45 Plastic and Reconstructive Surgery, p. 2022" },
    { book: "schwartz", text: "Systemic toxicity: CNS signs (restlessness, tinnitus, slurred speech, seizures, coma) and cardiovascular toxicity to arrest; risk rises with cumulative dose and renal, hepatic or cardiac disease; IV lipid emulsion treats toxicity.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 46 Anesthesia for Surgical Patients, p. 2031" },
    { book: "schwartz", text: "Buffering: 8.4% sodium bicarbonate mixed 1:9 with 1% lidocaine (with 1:100,000 adrenaline) reduces injection pain; local anaesthetics work less well in inflamed tissue.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 44 Surgery of the Hand and Wrist, p. 1936" },
    { book: "nelson", text: "Lidocaine is the most commonly used local anaesthetic for cutaneous infiltration. Maximum safe doses are 5 mg/kg without epinephrine and 7 mg/kg with epinephrine. Although 2 % solutions are commonly available, more dilute solutions of 0.25 % and 0.5 % are equally effective, cause less burning on injection, and permit the use of larger volumes.", ref: "Nelson 22nd ed. 2024, ch. 93 Pediatric pain management, p. 686" },
    { book: "nelson", text: "Resuscitation: lidocaine IV/IO 1 mg/kg bolus, maximum 100 mg, with an infusion of 20–50 mcg/kg/min; endotracheal 2–3 mg/kg. Repeat the bolus dose if the infusion is started more than 15 minutes after the initial bolus.", ref: "Nelson 22nd ed. 2024, Table 79.5, p. 563" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO. Surgical Care at the District Hospital, 2003" },
    { name: "MSF Clinical Guidelines — minor surgical procedures" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "bupivacaine",
  name: "Bupivacaine (spinal anaesthesia)",
  aka: ["Marcaine", "heavy bupivacaine", "hyperbaric bupivacaine"],
  cls: "Long-acting local anaesthetic",
  cat: "analgesia",
  wards: ["maternity", "surgical"],
  tags: ["spinal anaesthesia", "caesarean section", "surgery", "nerve block", "anaesthesia"],
  presentation: [
    "0.5 % HEAVY (hyperbaric, with 8 % glucose) 4 mL ampoule — for spinal anaesthesia.",
    "0.5 % and 0.25 % PLAIN — for infiltration and nerve blocks, never for routine spinal use in place of the heavy preparation.",
    "Read the ampoule twice: heavy and plain look almost identical."
  ],
  indications: ["Spinal anaesthesia for caesarean section, hernia repair, lower limb and lower abdominal surgery", "Post-operative wound infiltration and nerve blocks"],
  standard: {
    summary: "Spinal anaesthesia is the safest anaesthetic for caesarean section in a hospital without a trained anaesthetist and without oxygen or a ventilator, and it needs no machine at all.",
    items: [
      { label: "Caesarean section", text: "2–2.5 mL of 0.5 % heavy bupivacaine (10–12.5 mg) intrathecally at L3–L4." },
      { label: "Lower limb / hernia", text: "1.5–3 mL of 0.5 % heavy (7.5–15 mg) depending on the height of block required." },
      { label: "Duration", text: "90–150 minutes of surgical anaesthesia; longer with an intrathecal opioid additive." },
      { label: "Infiltration maximum", text: "2 mg/kg (2.5 mg/kg with adrenaline). 0.5 % = 5 mg/mL, so a 60 kg adult may have about 24 mL of 0.5 %." }
    ]
  },
  improvised: [
    {
      title: "Safe spinal anaesthesia with minimal equipment",
      best_for: "Caesarean section and lower abdominal surgery at a district hospital with no anaesthetic machine.",
      requires: ["iv", "bp"],
      steps: [
        "BEFORE the block: IV cannula running, ephedrine or adrenaline drawn up, atropine available, suction working, a bag-valve-mask and a way to give oxygen at hand, and an assistant who can help position the patient.",
        "Preload or co-load with 500–1000 mL of Ringer's lactate. Co-loading during the block works at least as well as preloading.",
        "Position sitting or left lateral, back flexed. Identify L3–L4 (the line between the iliac crests). Strict asepsis: scrub, gloves, antiseptic, drape.",
        "Use the finest needle you have (25–27 G pencil-point if possible) to reduce post-dural-puncture headache. Wait for clear cerebrospinal fluid.",
        "Inject 2–2.5 mL of 0.5 % HEAVY bupivacaine slowly. Lie the patient down immediately with a left lateral tilt or a wedge under the right hip in pregnancy.",
        "Check the block height with cold or pinprick before starting surgery. Aim for T4–T6 for caesarean section.",
        "Treat hypotension early and aggressively: fluids wide open, ephedrine 5–10 mg IV repeated, or phenylephrine, or dilute adrenaline 5–20 mcg if neither is available. Hypotension is expected, not a complication."
      ],
      monitor: ["BP every 1–2 min for the first 15 min, then every 5 min — manual cuff is adequate", "Pulse, level of consciousness, and the woman's ability to speak and breathe", "Block height, nausea (an early sign of hypotension), and fetal condition until delivery"],
      cautions: [
        "Absolute contraindications: patient refusal, infection at the puncture site, uncorrected hypovolaemia or active haemorrhage, coagulopathy, and raised intracranial pressure.",
        "A high or total spinal causes difficulty breathing, weak arms and loss of consciousness: ventilate with the bag-valve-mask, give fluids and vasopressor, and support until it wears off. Someone must stay at the head throughout.",
        "Never use the heavy preparation for a nerve block, and never use the plain preparation expecting a predictable spinal level."
      ]
    },
    {
      title: "Making the block last for post-operative pain",
      best_for: "Hospitals with little or no morphine.",
      requires: ["lidocaine"],
      steps: [
        "Infiltrate the wound edges with 10–20 mL of 0.25 % bupivacaine before closing. This costs almost nothing and gives 4–8 hours of relief.",
        "A transversus abdominis plane block with 20 mL of 0.25 % bupivacaine on each side after caesarean section gives many hours of analgesia and can be done with landmarks alone.",
        "Start regular paracetamol and an NSAID immediately, before the block wears off.",
        "Where intrathecal morphine 0.1 mg is available and the ward can watch the respiratory rate hourly for 24 h, it provides the best post-caesarean analgesia there is."
      ],
      monitor: ["Pain score, respiratory rate if intrathecal opioid was used"],
      cautions: ["Add the infiltration dose to the total bupivacaine given; do not exceed 2 mg/kg."]
    }
  ],
  cautions: [
    "Bupivacaine cardiotoxicity is severe and hard to reverse — an accidental intravascular injection of 0.5 % can cause refractory cardiac arrest. Aspirate frequently, inject slowly and never exceed the maximum dose.",
    "Do not use 0.75 % bupivacaine for obstetric procedures.",
    "Post-dural-puncture headache: fluids, caffeine and analgesia give temporary relief, but conservative treatment is largely ineffective; an epidural blood patch with 10–20 mL of the patient's own blood is the definitive treatment, and untreated headache can become chronic (Williams). Refer if no one can perform it."
  ],
  antidote: "Local anaesthetic systemic toxicity: stop injecting, ventilate with 100 % oxygen, treat seizures with a benzodiazepine, and give 20 % lipid emulsion 1.5 mL/kg over 1 min then 0.25 mL/kg/min where available. Prolonged CPR may be needed and is often successful.",
  textbook: [
    { book: "williams", text: "Spinal for cesarean: aim for T4 sensory level; 10 to 12 mg hyperbaric bupivacaine depending on maternal size. Intrathecal preservative-free morphine 0.1 to 0.3 mg gives up to 24 hours of analgesia.", ref: "Williams Obstetrics 25th ed. 2018, ch. 25 Obstetrical Analgesia and Anesthesia, pdf p. 1078" },
    { book: "williams", text: "Spinal hypotension: treat with left lateral uterine displacement, IV crystalloid, and IV boluses of ephedrine or phenylephrine; both vasopressors have comparable safety.", ref: "Williams Obstetrics 25th ed. 2018, ch. 25 Obstetrical Analgesia and Anesthesia, pdf p. 1079" },
    { book: "williams", text: "Bupivacaine is neurotoxic and cardiotoxic at nearly identical levels; 0.75 percent solution is proscribed for epidural use. Treat systemic toxicity with 20 percent lipid emulsion bolus then infusion, airway control, and benzodiazepines for seizures.", ref: "Williams Obstetrics 25th ed. 2018, ch. 25 Obstetrical Analgesia and Anesthesia, pdf p. 1075" },
    { book: "gabbe", text: "0.75% bupivacaine should not be used in obstetric patients; inject all local anaesthetics slowly and incrementally.", ref: "Gabbe's Obstetrics 9th ed., ch. 18 Obstetric Anesthesia, p. 351" },
    { book: "gabbe", text: "LAST: 20% lipid emulsion, ~1.5 mL/kg bolus over 2-3 min then ~0.25 mL/kg/min (under 70 kg); benzodiazepine for seizures; max 12 mL/kg.", ref: "Gabbe's Obstetrics 9th ed., ch. 18 Obstetric Anesthesia, p. 351" },
    { book: "gabbe", text: "Contraindications to neuraxial anaesthesia: significant haemorrhage or sepsis, site infection, coagulopathy, raised ICP from mass, patient refusal, some cardiac lesions.", ref: "Gabbe's Obstetrics 9th ed., ch. 18 Obstetric Anesthesia, p. 364" },
    { book: "gabbe", text: "Spinal hypotension: increase IV fluid and left uterine displacement, then ephedrine or phenylephrine; dextrose-free crystalloid.", ref: "Gabbe's Obstetrics 9th ed., ch. 18 Obstetric Anesthesia, p. 350" },
    { book: "schwartz", text: "Bupivacaine is the local anaesthetic most associated with cardiovascular toxicity (heart block, ventricular arrhythmia, arrest); lipid emulsion is a treatment.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 46 Anesthesia for Surgical Patients, p. 2031" },
    { book: "schwartz", text: "For hand blocks bupivacaine lasts on average 6-8 h; tolerated paediatric dose 2.5 mg/kg, i.e. 1 mL/kg of 0.25%.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 44 Surgery of the Hand and Wrist, p. 1936" },
    { book: "schwartz", text: "Spinal anaesthesia complications include hypotension, bradycardia, post-dural puncture headache, nerve injury and haematoma; follow guidelines on intervals after anticoagulants.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 46 Anesthesia for Surgical Patients, p. 2039" },
    { book: "nelson", text: "Nelson covers regional and local anaesthesia in children, with maximum safe local anaesthetic dosing and the use of dilute solutions; obstetric spinal technique is drawn from WHO surgical guidance.", ref: "Nelson 22nd ed. 2024, ch. 93; Editorial note" }
  ],
  sources: [
    { name: "WHO. Surgical Care at the District Hospital, 2003" },
    { name: "MSF Clinical Guidelines — Anaesthesia" },
    { name: "WHO Integrated Management of Emergency and Essential Surgical Care (IMEESC) toolkit" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "midazolam",
  name: "Midazolam",
  aka: ["Dormicum", "Versed"],
  cls: "Short-acting benzodiazepine",
  cat: "neuro",
  wards: ["emergency", "neonatal", "paediatric", "icu"],
  tags: ["status epilepticus", "seizure", "sedation", "intranasal", "buccal"],
  presentation: ["5 mg/mL 1 mL or 3 mL ampoule (preferred for intranasal and buccal use — smaller volume).", "1 mg/mL 5 mL ampoule.", "Heat-stable, no cold chain."],
  indications: ["Status epilepticus, especially where there is no IV access", "Procedural sedation", "Premedication", "Agitation and sedation during ventilation"],
  standard: {
    summary: "Intramuscular midazolam is at least as effective as intravenous lorazepam for status epilepticus, which makes it the ideal seizure drug where cannulation is difficult.",
    items: [
      { label: "Status epilepticus IM", text: "0.2 mg/kg IM (maximum 10 mg). Adult or child over 40 kg: 10 mg. Child 13–40 kg: 5 mg." },
      { label: "Buccal", text: "0.3–0.5 mg/kg (maximum 10 mg) into the cheek." },
      { label: "Intranasal", text: "0.2–0.3 mg/kg (maximum 10 mg), half into each nostril, using the 5 mg/mL strength." },
      { label: "Procedural sedation", text: "0.05–0.1 mg/kg IV titrated; oral premedication 0.5 mg/kg (maximum 20 mg) 20–30 min before." }
    ]
  },
  improvised: [
    {
      title: "Intranasal midazolam with no atomiser",
      best_for: "Convulsing child where a cannula would take minutes that the brain does not have.",
      requires: ["syringe_1ml"],
      steps: [
        "Use the 5 mg/mL strength so the volume stays small — no more than 0.5 mL per nostril, ideally 0.2–0.3 mL.",
        "Draw the dose (0.2–0.3 mg/kg, maximum 10 mg) into a 1 mL syringe and remove the needle.",
        "Lay the child flat or head slightly back. Place the syringe tip just inside one nostril, angled slightly outward toward the top of the ear, and squirt half the dose briskly.",
        "Repeat in the other nostril. Brisk delivery matters: a slow trickle runs down the throat and is swallowed rather than absorbed.",
        "Onset is 3–5 minutes. If the seizure continues after 5–10 minutes, give a second dose or move to the second-line drug.",
        "A mucosal atomiser device makes this far more reliable — if your hospital can buy one thing for the emergency room, buy a box of these."
      ],
      monitor: ["Breathing and colour continuously; bag-valve-mask and suction ready", "Blood glucose — check it in every convulsing patient", "Temperature, and look for meningitis and cerebral malaria"],
      cautions: ["Respiratory depression, particularly if a benzodiazepine has already been given.", "Blocked or bleeding nose makes absorption unreliable — use the IM or buccal route instead."]
    },
    {
      title: "Buccal midazolam",
      best_for: "Community, health post, or a child with a blocked nose. Can be taught to parents of children with known epilepsy.",
      requires: ["oral"],
      steps: [
        "Draw 0.3–0.5 mg/kg (maximum 10 mg) of the 5 mg/mL solution into a syringe and remove the needle.",
        "Turn the head to the side. Place the syringe between the cheek and the lower gum and give half the volume on each side, slowly enough that it is not swallowed.",
        "Do not try to open a clenched jaw or put fingers in the mouth.",
        "Onset is 5–10 minutes. Put the child in the recovery position."
      ],
      monitor: ["Breathing, colour, duration of the seizure"],
      cautions: ["Swallowed drug is much less effective — aim for the cheek lining, not the throat."]
    },
    {
      title: "IM midazolam for the adult in status",
      best_for: "Any setting. This is the evidence-based first-line where no IV is running.",
      requires: ["im"],
      steps: [
        "10 mg IM into the anterolateral thigh for an adult or a child over 40 kg; 5 mg for a child 13–40 kg.",
        "Do not spend more than 60–90 seconds trying to cannulate first. The IM dose works as fast overall because it is given sooner.",
        "If seizures persist 5 minutes after the dose, give a second benzodiazepine dose, then move to phenobarbital or phenytoin.",
        "Get IV or intraosseous access in parallel for glucose, the second-line drug and fluids."
      ],
      monitor: ["Respiratory rate, oxygen saturation if available, BP", "Glucose"],
      cautions: ["Respiratory depression is additive with other benzodiazepines and with phenobarbital — be ready to ventilate."]
    }
  ],
  paediatric: ["Never leave a sedated child unattended.", "Neonates: phenobarbital remains first-line, not midazolam."],
  cautions: ["Respiratory depression and hypotension.", "Accumulates in renal and hepatic failure."],
  antidote: "Flumazenil 0.01 mg/kg IV (adult 0.2 mg), repeated to a maximum of 1 mg — rarely appropriate, and dangerous in a patient with epilepsy or a mixed overdose. Support ventilation instead.",
  calc: { type: "weight", dosePerKg: 0.2, doseUnit: "mg", conc: 5, concUnit: "mg/mL", maxDose: 10, label: "IM or intranasal dose (0.2 mg/kg, max 10 mg) at 5 mg/mL" },
  textbook: [
    { book: "harrison", text: "Early generalized convulsive status epilepticus in adults: IV lorazepam 0.1 mg/kg or midazolam 0.2 mg/kg (or clonazepam 0.015 mg/kg).", ref: "Harrison 22nd ed. 2025, ch. 436 Seizures and Epilepsy, p. 3426" },
    { book: "harrison", text: "Refractory status epilepticus: IV midazolam 0.2 mg/kg bolus then infusion 0.2–0.6 mg/kg/h (ICU setting).", ref: "Harrison 22nd ed. 2025, ch. 436 Seizures and Epilepsy, p. 3426" },
    { book: "harrison", text: "Tetanus: midazolam is an alternative for spasm control with fewer side effects and suitability for continuous use.", ref: "Harrison 22nd ed. 2025, ch. 157 Tetanus, p. 1231" },
    { book: "nelson", text: "Guidelines recommend intravenous lorazepam as a first-line agent and, if the patient does not have intravenous access, intramuscular midazolam. Other options besides IM midazolam include buccal or intranasal midazolam, intranasal lorazepam, or rectal diazepam. With all options respiratory depression is a potential side-effect that must be monitored and managed. If seizures persist 5 minutes after the initial benzodiazepine dose, a second dose should be given.", ref: "Nelson 22nd ed. 2024, ch. 633.8 Status epilepticus, p. 3628" },
    { book: "nelson", text: "Oral preoperative midazolam 0.5 mg/kg produces rapid-onset anxiolysis and amnesia and may decrease negative postoperative behavioural changes.", ref: "Nelson 22nd ed. 2024, ch. 92 Anaesthesia, p. 665" },
    { book: "nelson", text: "For intubation, midazolam 0.1 mg/kg IV has onset in 3–5 minutes and duration 60–120 minutes, giving amnesia with respiratory depression.", ref: "Nelson 22nd ed. 2024, Table 86.11, p. 620" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "Silbergleit R et al. Intramuscular versus intravenous therapy for prehospital status epilepticus (RAMPART). NEJM 2012" },
    { name: "WHO mhGAP Intervention Guide 2.0, 2016" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "phenytoin",
  name: "Phenytoin (and fosphenytoin)",
  aka: ["Dilantin", "Epanutin", "fosphenytoin"],
  cls: "Anticonvulsant",
  cat: "neuro",
  wards: ["emergency", "neonatal", "paediatric", "medical", "icu"],
  tags: ["status epilepticus", "seizure", "epilepsy", "eclampsia"],
  presentation: [
    "50 mg/mL, 5 mL ampoule (250 mg). Strongly alkaline and irritant.",
    "100 mg capsules; 30 mg/5 mL suspension.",
    "Fosphenytoin, where available, is dosed in phenytoin equivalents (PE) and can be given faster and IM."
  ],
  indications: ["Second-line treatment of status epilepticus", "Maintenance treatment of epilepsy", "Seizure prophylaxis after head injury or neurosurgery"],
  standard: {
    summary: "The loading dose must go in slowly. This is the drug where a gravity infusion and a watch are genuinely safer than a rushed push.",
    items: [
      { label: "Loading dose", text: "15–20 mg/kg IV. Maximum rate 1 mg/kg/min in children, 50 mg/min in adults — so an adult 1 g load takes at least 20 minutes." },
      { label: "Maintenance", text: "5 mg/kg/day in 2 divided doses (adult 300 mg daily), starting 12 h after the load." },
      { label: "Dilution", text: "In 0.9 % SALINE ONLY. Phenytoin precipitates in glucose solutions." },
      { label: "Fosphenytoin", text: "20 mg PE/kg, may be given at 3 mg PE/kg/min and by the intramuscular route." }
    ]
  },
  improvised: [
    {
      title: "Giving the loading dose safely with a burette and a watch",
      best_for: "Status epilepticus continuing after two benzodiazepine doses, where no pump exists.",
      requires: ["iv", "burette", "macro_set"],
      steps: [
        "Calculate the dose: 18 mg/kg is a good working figure. A 50 kg adult needs 900 mg; a 15 kg child needs 270 mg.",
        "Dilute in 0.9 % SALINE only, to a concentration no greater than 10 mg/mL. Never use glucose — the drug precipitates and the patient gets nothing.",
        "Put the diluted dose into a burette. For an adult, 1000 mg in 100 mL of saline given over 30 minutes is 200 mL/h, which is 67 drops/min on a 20 drops/mL set, about 17 drops per 15 seconds.",
        "For a child, 270 mg in 50 mL over 25 minutes is 120 mL/h, which is 40 drops/min on a 20 drops/mL set.",
        "Use a large vein with a free-flowing cannula, and flush with saline before and after. Phenytoin causes severe tissue injury if it leaks.",
        "Check the pulse every 5 minutes. Slow or stop the infusion if the pulse falls or the blood pressure drops.",
        "NEVER give phenytoin intramuscularly — it crystallises in muscle, causes necrosis and is not absorbed."
      ],
      monitor: ["Pulse and BP every 5 min throughout the infusion; ECG where available", "Infusion site every 5 min — purple glove syndrome and skin necrosis follow extravasation", "Seizure activity and conscious level"],
      cautions: [
        "Rapid injection causes hypotension, bradycardia and asystole — caused by the propylene glycol vehicle, not the phenytoin itself.",
        "If the patient is eclamptic, the correct drug is magnesium sulfate, not phenytoin.",
        "Where phenobarbital is available and no monitor exists, phenobarbital 15–20 mg/kg IM is often the safer second-line choice in a low-resource ward."
      ]
    },
    {
      title: "Maintenance without drug levels",
      best_for: "Every hospital in the region; phenytoin levels are almost never available.",
      requires: ["oral"],
      steps: [
        "Start 5 mg/kg/day in two divided doses (adult 300 mg daily), 12 hours after the loading dose.",
        "Change the dose in small steps. Phenytoin has saturable kinetics: near the therapeutic range a small increase can double the blood level.",
        "Titrate against seizure control and toxicity rather than a number. Toxicity appears in a predictable order: nystagmus on lateral gaze first, then unsteady walking, then slurred speech, then drowsiness and confusion.",
        "Teach the patient and family to look for unsteadiness and to come back rather than stopping the drug suddenly.",
        "Check the gums at every visit and reinforce tooth brushing; gum overgrowth is common, disfiguring and preventable.",
        "Phenytoin is a strong enzyme inducer: it lowers the effectiveness of contraceptive implants and pills, some antiretrovirals, and warfarin. Counsel women of childbearing age and offer an alternative contraceptive method."
      ],
      monitor: ["Nystagmus, gait and speech at every visit", "Gum health", "Seizure diary"],
      cautions: [
        "Teratogenic — where possible use an alternative in women who may become pregnant, and give folic acid 5 mg daily.",
        "Never stop abruptly; withdrawal causes status epilepticus."
      ]
    }
  ],
  cautions: ["Severe tissue necrosis with extravasation.", "Stevens-Johnson syndrome, especially in people carrying HLA-B*1502 and in HIV.", "Multiple drug interactions."],
  calc: { type: "weight", dosePerKg: 18, doseUnit: "mg", conc: 50, concUnit: "mg/mL", maxDose: 1000, label: "Loading dose (18 mg/kg) at 50 mg/mL — dilute in saline" },
  textbook: [
    { book: "harrison", text: "Established status epilepticus after benzodiazepine: IV phenytoin/fosphenytoin 20 mg/kg, or valproate 20–30 mg/kg, or levetiracetam 20–30 mg/kg.", ref: "Harrison 22nd ed. 2025, ch. 436 Seizures and Epilepsy, p. 3426" },
    { book: "harrison", text: "Maintenance: phenytoin 300–400 mg/day in adults (3–6 mg/kg; child 4–8 mg/kg), once to three times daily; target level 10–20 µg/mL; dose-dependent half-life.", ref: "Harrison 22nd ed. 2025, ch. 436 Seizures and Epilepsy, p. 3422" },
    { book: "harrison", text: "Lorazepam is the benzodiazepine of choice; seizure control is then maintained with a loading dose of fosphenytoin, valproate or levetiracetam, which have similar efficacy.", ref: "Harrison 22nd ed. 2025, ch. 311 Approach to the Patient with Critical Illness, p. 2298" },
    { book: "nelson", text: "If emergency therapy with a benzodiazepine is unsuccessful, with persistent seizures 5 minutes after the second benzodiazepine dose, fosphenytoin, valproate or levetiracetam is the recommended urgent therapy. Fosphenytoin is given at a loading dose of 20 mg/kg and a level is usually taken 2 hours later. Valproate is given at a loading dose of 40 mg/kg.", ref: "Nelson 22nd ed. 2024, ch. 633.8 Status epilepticus, p. 3628" },
    { book: "nelson", text: "For refractory neonatal seizures, phenytoin 20 mg/kg loading dose or lorazepam 0.1 mg/kg have historically been preferred, but levetiracetam is now often preferred as a second-line agent.", ref: "Nelson 22nd ed. 2024, ch. 122, p. 1067" },
    { book: "nelson", text: "Loading doses to achieve a therapeutic level quickly are 20 mg/kg for valproate, 20 mg/kg for phenytoin, and 10–20 mg/kg for phenobarbital; a lower phenobarbital load of 5 mg/kg is sometimes used in older children to avoid excessive sedation.", ref: "Nelson 22nd ed. 2024, ch. 633.10, p. 3612" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO Pocket Book of Hospital Care for Children 2013" },
    { name: "WHO mhGAP Intervention Guide 2.0, 2016" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "sodium-bicarbonate",
  name: "Sodium bicarbonate",
  aka: ["NaHCO3"],
  cls: "Alkalinising agent",
  cat: "electrolyte",
  wards: ["emergency", "neonatal", "medical", "icu"],
  tags: ["acidosis", "hyperkalaemia", "poisoning", "tricyclic", "resuscitation"],
  presentation: [
    "8.4 % (1 mmol/mL) 10 mL ampoule or 50 mL vial — for adults.",
    "4.2 % (0.5 mmol/mL) — the strength for neonates; make it by diluting 8.4 % with an equal volume of water for injection.",
    "1.4 % (isotonic) 500 mL bags where available."
  ],
  indications: ["Hyperkalaemia with ECG changes", "Severe metabolic acidosis with a pH below about 7.1 and a treatable cause", "Tricyclic antidepressant and some other poisonings", "Urinary alkalinisation"],
  standard: {
    summary: "Rarely the answer, and often harmful. Treating the cause of the acidosis matters far more than treating the number.",
    items: [
      { label: "Resuscitation", text: "1 mmol/kg IV/IO slowly, only with adequate ventilation." },
      { label: "Hyperkalaemia", text: "Little or no role in acute hyperkalaemia unless there is significant metabolic acidosis (Harrison). Do not give undiluted hypertonic boluses for potassium alone. With acidosis: adult 50 mmol (Schwartz: one ampoule), preferably diluted and given slowly; child 1–2 mmol/kg. Always after calcium, with insulin–glucose and salbutamol doing the real work." },
      { label: "Deficit formula", text: "mmol needed = base deficit × weight (kg) × 0.3. Give half, then reassess." },
      { label: "Tricyclic poisoning", text: "1–2 mmol/kg IV boluses to narrow the QRS and raise the pH to 7.45–7.55." }
    ]
  },
  improvised: [
    {
      title: "Making the neonatal strength and giving it safely",
      best_for: "Newborn units where only the 8.4 % ampoule is stocked.",
      requires: ["iv", "syringe_1ml"],
      steps: [
        "8.4 % is far too concentrated and hyperosmolar for a neonate and causes intraventricular haemorrhage. Dilute it: equal parts 8.4 % and water for injection gives 4.2 % (0.5 mmol/mL).",
        "Give 1–2 mmol/kg of the 4.2 % solution slowly over at least 20–30 minutes, never as a push.",
        "Make sure the baby is being ventilated effectively first. Bicarbonate generates carbon dioxide, and if that CO2 cannot be blown off, the acidosis inside the cells gets worse, not better.",
        "Flush the line before and after with saline. Bicarbonate is incompatible with calcium, adrenaline and many other drugs, and precipitates in the tubing.",
        "Never give bicarbonate through the same line as calcium gluconate."
      ],
      monitor: ["Ventilation quality and chest movement", "Sodium — repeated doses cause hypernatraemia", "Infusion site: extravasation causes severe tissue necrosis"],
      cautions: [
        "Routine bicarbonate is NOT recommended in neonatal resuscitation.",
        "It is also not recommended in diabetic ketoacidosis, where it increases the risk of cerebral oedema in children — treat with fluids and insulin instead."
      ]
    },
    {
      title: "Hyperkalaemia when 8.4 % is all you have",
      best_for: "Renal failure or crush injury with peaked T waves and no dialysis.",
      requires: ["iv"],
      steps: [
        "Give calcium FIRST: 10 % calcium gluconate 0.5 mL/kg (adult 10–30 mL) slowly, to protect the heart. Calcium does not lower potassium but buys time.",
        "Flush the line thoroughly with saline, then give sodium bicarbonate 1–2 mmol/kg over 5–10 minutes. Never in the same line or syringe as calcium.",
        "Then insulin with glucose, and nebulised salbutamol, which actually shift potassium into the cells.",
        "Bicarbonate works best when there is a metabolic acidosis; in its absence the potassium-lowering effect is small.",
        "Arrange dialysis or referral — these are all temporary measures and the potassium will return within hours."
      ],
      monitor: ["ECG or at least continuous pulse and rhythm", "Glucose every 30 min for 6 h after insulin", "Potassium where it can be measured, and urine output"],
      cautions: ["Sodium and fluid load can precipitate pulmonary oedema in anuric renal failure."]
    },
    {
      title: "Oral bicarbonate and non-drug measures",
      best_for: "Chronic acidosis of renal tubular acidosis or chronic kidney disease, where the injectable form is not needed.",
      requires: ["oral"],
      steps: [
        "Oral sodium bicarbonate tablets, or baking soda measured carefully (one level 5 mL teaspoon of baking soda is roughly 60 mmol — this is a large dose, so divide it) for chronic acidosis, titrated to the bicarbonate level.",
        "For acute acidosis the priority is always the cause: fluids for dehydration and shock, insulin for ketoacidosis, oxygen and ventilation for respiratory failure, antibiotics for sepsis.",
        "Do not chase a bicarbonate number in a patient who is improving clinically."
      ],
      monitor: ["Bicarbonate or CO2 where available; growth in children with renal tubular acidosis"],
      cautions: ["Household baking soda is not a sterile or accurately dosed medicine — use it only for chronic oral therapy when nothing else exists, and never inject it."]
    }
  ],
  paediatric: ["Use 4.2 % in neonates.", "Not recommended in diabetic ketoacidosis."],
  cautions: ["Hypernatraemia, hyperosmolarity, hypokalaemia, and a fall in ionised calcium.", "Worsens intracellular acidosis if ventilation is inadequate.", "Severe tissue necrosis on extravasation."],
  calc: { type: "weight", dosePerKg: 1, doseUnit: "mmol", conc: 1, concUnit: "mmol/mL", label: "Dose 1 mmol/kg using 8.4 % (1 mmol/mL); halve the concentration for neonates" },
  textbook: [
    { book: "harrison", text: "Cardiac arrest: if metabolic acidosis persists after successful defibrillation and with adequate ventilation, NaHCO3 1 mEq/kg may be given.", ref: "Harrison 22nd ed. 2025, ch. 317 Cardiovascular Collapse, Cardiac Arrest, and Sudden Cardiac Death, p. 2336" },
    { book: "harrison", text: "Hyperkalaemia: IV bicarbonate has no acute role; never repeated hypertonic ampoule boluses; if used, give isotonic infusion (150 mEq in 1 L D5W) over hours.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 361" },
    { book: "harrison", text: "DKA: bicarbonate has not improved outcomes; if arterial pH is below 7.0, 50 mmol in 200 mL sterile water with KCl may be given over the first 2 h until pH exceeds 7.0.", ref: "Harrison 22nd ed. 2025, ch. 416 Diabetes Mellitus: Management and Therapies, p. 3218" },
    { book: "harrison", text: "Ventricular arrhythmias from tricyclics or other membrane-active poisons: sodium bicarbonate is indicated and should be considered first; class IA, IC and III antiarrhythmics are contraindicated.", ref: "Harrison 22nd ed. 2025, ch. 470 Poisoning and Drug Overdose, p. 3708" },
    { book: "schwartz", text: "Lactic acidosis of shock: restore perfusion with volume, not bicarbonate; bicarbonate has not reduced morbidity or mortality and can raise PCO2 and worsen intracellular acidosis.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 3 Fluid and Electrolyte Management of the Surgical Patient, p. 92" },
    { book: "schwartz", text: "Hyperkalaemia shift: bicarbonate 1 ampule IV with glucose/insulin; watch for circulatory overload and hypernatraemia in fragile cardiac patients.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 3 Fluid and Electrolyte Management of the Surgical Patient, p. 95" },
    { book: "nelson", text: "Sodium bicarbonate 1 mEq/kg IV/IO; administer slowly and ensure adequate ventilation.", ref: "Nelson 22nd ed. 2024, Table 79.5 Medications for pediatric resuscitation, p. 563" },
    { book: "nelson", text: "Severe hyperkalaemia above 7 mEq/L, especially with electrocardiographic changes, requires calcium gluconate 10 % 100 mg/kg/dose (maximum 3,000 mg), sodium bicarbonate 1–2 mEq/kg IV over 5–10 minutes, and regular insulin 0.1 units/kg with 50 % glucose 1 mL/kg over 1 hour.", ref: "Nelson 22nd ed. 2024, ch. 573, p. 3245" },
    {book: "kaplan",text: "Kaplan describes tricyclic overdose arrhythmias that may resist treatment for 3–4 days but gives no bicarbonate dosing (use toxicology guidance).",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, pdf p. 2033"},
    {book: "kaplan",text: "Sodium bicarbonate increases renal lithium clearance (interaction table; not a treatment recommendation).",ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, Table 21-30, pdf p. 2066"}
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "ISPAD Clinical Practice Consensus Guidelines 2022 (bicarbonate not recommended in DKA)" },
    { name: "UK Kidney Association. Treatment of acute hyperkalaemia in adults, 2023" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "vitamin-k",
  name: "Vitamin K1 (phytomenadione)",
  aka: ["Phytomenadione", "Phylloquinone", "Konakion"],
  cls: "Fat-soluble vitamin, antidote",
  cat: "haem",
  wards: ["emergency", "maternity", "neonatal", "medical"],
  tags: ["newborn", "bleeding", "haemorrhagic disease", "warfarin", "rodenticide", "antidote"],
  presentation: [
    "10 mg/mL 1 mL ampoule (adult).",
    "1 mg/0.5 mL paediatric ampoule — the correct preparation for newborns.",
    "Oral drops or tablets in some countries. Protect from light."
  ],
  indications: ["Prevention of vitamin K deficiency bleeding of the newborn", "Treatment of bleeding due to vitamin K deficiency", "Warfarin over-anticoagulation and superwarfarin rodenticide poisoning", "Bleeding in liver disease and in prolonged malabsorption"],
  standard: {
    summary: "One intramuscular injection at birth prevents a disease that kills or disables babies weeks later. It is among the cheapest interventions in medicine.",
    items: [
      { label: "Newborn prophylaxis", text: "1 mg IM once within 1 hour of birth (0.5 mg if under 1500 g). A single IM dose is almost universally effective." },
      { label: "Newborn with bleeding", text: "1 mg IM or slow IV, repeated every 8 h if needed, plus fresh frozen plasma 10–20 mL/kg for active bleeding." },
      { label: "Warfarin reversal", text: "1–10 mg slow IV depending on INR and bleeding; oral 1–5 mg for a high INR without bleeding." },
      { label: "Older child or adult deficiency", text: "5–10 mg IM or slow IV daily for 3 days." }
    ]
  },
  improvised: [
    {
      title: "Giving 1 mg accurately when only the 10 mg/mL adult ampoule exists",
      best_for: "Delivery rooms stocked only with the adult preparation, which is very common.",
      requires: ["syringe_1ml", "im"],
      steps: [
        "1 mg of a 10 mg/mL solution is 0.1 mL. That volume cannot be measured accurately in a 2 mL or 5 mL syringe.",
        "Use a 1 mL (insulin or tuberculin) syringe and draw exactly 0.1 mL. Have a second person check it.",
        "If no 1 mL syringe is available, dilute: draw 0.5 mL of the 10 mg/mL into a syringe and add 4.5 mL of water for injection, giving 5 mL of 1 mg/mL. Then 1 mg is 1 mL. Label the syringe and discard the remainder — do not keep it for the next baby.",
        "Inject into the anterolateral thigh, not the buttock.",
        "Record it in the baby's notes and on the mother's card. Missed vitamin K is invisible until the baby bleeds at 3–8 weeks."
      ],
      monitor: ["Injection site", "Documentation that it was actually given"],
      cautions: ["Never give the 10 mg/mL ampoule undiluted to a newborn."]
    },
    {
      title: "Oral vitamin K when the injectable form is out of stock",
      best_for: "Home births and health posts with no injectable supply.",
      requires: ["oral"],
      steps: [
        "Oral vitamin K 2 mg at birth, repeated at 4–7 days and again at 4–6 weeks. All three doses are needed.",
        "A single oral dose does NOT prevent late vitamin K deficiency bleeding, which is the form that causes brain haemorrhage. The intramuscular dose is clearly better, and Williams regards oral vitamin K as ineffective — use this oral schedule only when no injectable exists at all.",
        "Oral dosing is unreliable in a baby who vomits, who is not exclusively breastfed, or who has cholestasis or diarrhoea. These babies need the injection.",
        "Use the injectable solution by mouth if no oral preparation exists, at the doses above.",
        "Give the parents a written card with the dates the next two doses are due."
      ],
      monitor: ["Bruising, bleeding from the cord or circumcision site, prolonged bleeding after injections", "Late warning signs at 3–8 weeks: pallor, vomiting, irritability, bulging fontanelle, seizures"],
      cautions: ["Purely breastfed babies are at highest risk because breast milk is low in vitamin K."]
    },
    {
      title: "Superwarfarin rodenticide poisoning",
      best_for: "Accidental ingestion of rat poison, which is common in children.",
      requires: ["oral"],
      steps: [
        "Check the prothrombin time or INR at 24 and 48 hours if available. Long-acting rodenticides may not prolong clotting for a day or more, so an early normal result is not reassuring.",
        "If there is no laboratory at all, treat a symptomatic child and observe the asymptomatic one closely for bruising or bleeding.",
        "Bleeding: vitamin K1 5–10 mg (child 0.3 mg/kg) slow IV over 20–30 min, plus fresh frozen plasma or whole blood for active haemorrhage.",
        "Then oral vitamin K1 in high doses for WEEKS to MONTHS, since superwarfarins persist. Typical maintenance is 1–2 mg/kg/day in divided doses, tapered against the INR.",
        "Never use vitamin K3 (menadione) — it causes haemolysis and kernicterus. Only K1 (phytomenadione) is acceptable."
      ],
      monitor: ["INR or prothrombin time weekly during the taper", "Bruising and bleeding"],
      cautions: ["Rapid IV vitamin K can cause an anaphylactoid reaction — dilute it and give it over at least 20 minutes."]
    }
  ],
  paediatric: ["1 mg IM at birth; 0.5 mg if under 1500 g.", "Babies of mothers on phenobarbital, phenytoin, rifampicin or warfarin are at higher risk and must not be missed."],
  cautions: ["Anaphylactoid reactions with rapid IV injection.", "Vitamin K3 (menadione) is unsafe in newborns."],
  calc: { type: "weight", dosePerKg: 0.3, doseUnit: "mg", conc: 10, concUnit: "mg/mL", maxDose: 10, label: "Treatment dose (0.3 mg/kg) at 10 mg/mL — newborn prophylaxis is a flat 1 mg" },
  textbook: [
    { book: "harrison", text: "Warfarin with INR 3.5–10 and no bleeding: withhold warfarin; if INR above 10, oral vitamin K 2.5–5 mg may be given.", ref: "Harrison 22nd ed. 2025, ch. 123 Antiplatelet, Anticoagulant, and Fibrinolytic Drugs, p. 952" },
    { book: "harrison", text: "Serious bleeding with raised INR: vitamin K 5–10 mg by slow IV infusion, repeated until INR normal, plus four-factor prothrombin complex concentrate.", ref: "Harrison 22nd ed. 2025, ch. 123 Antiplatelet, Anticoagulant, and Fibrinolytic Drugs, p. 952" },
    { book: "harrison", text: "Vitamin K deficiency: 10 mg parenterally restores clotting factor levels within 8–10 h; FFP or PCC for faster correction.", ref: "Harrison 22nd ed. 2025, ch. 121 Coagulation Disorders, p. 935" },
    { book: "williams", text: "Newborn prophylaxis: a single IM dose of vitamin K 0.5 to 1 mg within 1 hour of birth prevents vitamin K-dependent haemorrhagic disease.", ref: "Williams Obstetrics 25th ed. 2018, ch. 32 The Newborn, pdf p. 1349" },
    { book: "gabbe", text: "All newborns should receive vitamin K1 0.5-1 mg IM; IM preferred because oral is less effective against late haemorrhagic disease.", ref: "Gabbe's Obstetrics 9th ed., ch. 25 The Neonate, p. 496" },
    { book: "nelson", text: "Administration of either oral or parenteral vitamin K soon after birth prevents early vitamin K deficiency bleeding. A single dose of oral vitamin K does not prevent a substantial number of cases of late vitamin K deficiency bleeding. However, a single intramuscular injection of vitamin K 1 mg, the current practice in the United States, is almost universally effective, except in children with severe malabsorption; the increased efficacy of the intramuscular form is thought to result from a depot effect.", ref: "Nelson 22nd ed. 2024, ch. 65 Vitamin K deficiency, p. 482" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO recommendations on newborn health, 2017" },
    { name: "WHO Model Formulary for Children" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "caffeine-citrate",
  name: "Caffeine citrate",
  aka: ["Caffeine"],
  cls: "Methylxanthine respiratory stimulant",
  cat: "respiratory",
  wards: ["neonatal"],
  tags: ["apnoea of prematurity", "neonate", "preterm", "extubation"],
  presentation: [
    "Caffeine citrate 20 mg/mL (equivalent to 10 mg/mL caffeine base) — doses below are of the CITRATE salt.",
    "Where only caffeine base is stocked, halve the citrate dose. Confusing the two is the classic error with this drug.",
    "Oral and IV preparations are interchangeable at the same dose."
  ],
  indications: ["Apnoea of prematurity", "Facilitating extubation in preterm infants", "Prevention of apnoea in preterm infants under 34 weeks"],
  standard: {
    summary: "One of the few neonatal drugs proven to improve long-term outcome, and it needs no pump, no monitoring of levels and no cold chain.",
    items: [
      { label: "Loading dose", text: "20 mg/kg of caffeine citrate, orally or IV over 30 min." },
      { label: "Maintenance", text: "5–10 mg/kg once daily, starting 24 hours after the load. Give orally once feeds are established." },
      { label: "Duration", text: "Continue until about 34 weeks corrected age and 5–7 days free of apnoea." },
      { label: "Monitoring", text: "Serum levels are usually unnecessary because the therapeutic window is wide. Monitor the heart rate and clinical response instead." }
    ]
  },
  improvised: [
    {
      title: "Oral caffeine citrate as the default route",
      best_for: "Any newborn unit. The oral route works as well as intravenous and avoids a cannula entirely.",
      requires: ["oral"],
      steps: [
        "Give the 20 mg/kg loading dose orally or by nasogastric tube if the baby is not shocked and the gut is working. Absorption is essentially complete.",
        "Then 5 mg/kg once daily, at the same time each day. Increase to 10 mg/kg if apnoeas continue.",
        "Volume with the 20 mg/mL solution: loading dose 1 mL per kg, maintenance 0.25 mL per kg. Use a 1 mL syringe.",
        "Continue during and after extubation — stopping caffeine at extubation is a common cause of failure.",
        "Combine with kangaroo mother care, keeping the baby warm, treating anaemia and sepsis, and careful positioning. Caffeine alone does not manage apnoea."
      ],
      monitor: ["Apnoea count per shift", "Heart rate — persistent tachycardia above 180 suggests the dose is too high", "Feeding tolerance and weight gain"],
      cautions: ["Check whether your stock is caffeine CITRATE or caffeine BASE. The base dose is half.", "Apnoea in a previously stable preterm baby means sepsis, hypoglycaemia, anaemia or intracranial haemorrhage until proved otherwise — do not simply increase the caffeine."]
    },
    {
      title: "If caffeine is unavailable",
      best_for: "Stock-outs, which are common because caffeine citrate is expensive in some markets.",
      requires: ["oral", "iv"],
      steps: [
        "Aminophylline is the alternative: 6 mg/kg loading, then 2.5 mg/kg every 12 hours, oral or slow IV (WHO).",
        "Aminophylline causes more tachycardia, jitteriness, feeding intolerance and has a narrower margin of safety than caffeine, so switch back to caffeine as soon as it is available.",
        "Non-drug measures matter and cost nothing: prone or lateral positioning with the neck slightly extended, thermal neutrality, avoiding suctioning-induced apnoea, treating anaemia, and continuous positive airway pressure where it exists."
      ],
      monitor: ["Heart rate, feeding tolerance, apnoea frequency"],
      cautions: ["Do not use theophylline or aminophylline together with caffeine."]
    }
  ],
  paediatric: ["This is a neonatal drug; there is no role in older children.", "Doses are of caffeine citrate unless stated otherwise."],
  cautions: ["Tachycardia, jitteriness, feeding intolerance and, rarely, seizures at high levels.", "Caffeine does not treat the cause of new apnoea — look for sepsis."],
  calc: { type: "weight", dosePerKg: 20, doseUnit: "mg", conc: 20, concUnit: "mg/mL", label: "Loading dose (20 mg/kg citrate) at 20 mg/mL = 1 mL per kg" },
  textbook: [
    { book: "nelson", text: "Caffeine facilitates extubation from mechanical ventilation, reduces the rate of bronchopulmonary dysplasia and improves neurodevelopmental outcomes. It can safely be given orally or intravenously. Infants are generally given an initial loading dose of 20 mg/kg of caffeine citrate followed 24 hours later by once-daily maintenance doses of 5–10 mg/kg. Because the therapeutic window is wide and serious side-effects are rare, monitoring of serum drug concentrations is usually unnecessary; monitoring is primarily through observation of vital signs such as tachycardia and clinical response.", ref: "Nelson 22nd ed. 2024, ch. 124 Apnoea of prematurity, p. 1076" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "Schmidt B et al. Caffeine therapy for apnea of prematurity (CAP trial). NEJM 2006" },
    { name: "WHO recommendations for care of the preterm or low-birth-weight infant, 2022" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "zinc-ors",
  name: "Oral rehydration salts and zinc",
  aka: ["ORS", "ReSoMal", "zinc sulfate"],
  cls: "Oral rehydration and micronutrient",
  cat: "nutrition",
  wards: ["emergency", "paediatric", "outpatient"],
  tags: ["diarrhoea", "dehydration", "cholera", "zinc", "ORS", "Plan A", "Plan B"],
  presentation: [
    "Low-osmolarity ORS sachets for 1 litre (sodium 75, glucose 75, potassium 20, citrate 10 mmol/L).",
    "Zinc sulfate 20 mg dispersible tablets (10 mg for infants under 6 months).",
    "ReSoMal for severe acute malnutrition: lower sodium, higher potassium than standard ORS."
  ],
  indications: ["Prevention and treatment of dehydration from diarrhoea (WHO Plan A and Plan B)", "Cholera", "Zinc supplementation during and after diarrhoea", "Maintenance after IV rehydration"],
  standard: {
    summary: "ORS and zinc together prevent the majority of child deaths from diarrhoea, and neither needs electricity, a cold chain or a cannula.",
    items: [
      { label: "Plan A (no dehydration, at home)", text: "After each loose stool: under 2 years 50–100 mL; 2–10 years 100–200 mL; older children and adults as much as they want. Continue feeding and breastfeeding." },
      { label: "Plan B (some dehydration)", text: "75 mL/kg of ORS over 4 hours at the facility, given by cup and spoon. Reassess at 4 hours." },
      { label: "Plan C (severe dehydration)", text: "Intravenous Ringer's lactate — see the Ringer's lactate entry and the Plan C calculator." },
      { label: "Zinc", text: "Children under 5: 20 mg daily for 10–14 days (10 mg daily if under 6 months), starting on day 1 of the diarrhoea, whatever the plan. There is no established benefit in adults (Harrison)." }
    ]
  },
  improvised: [
    {
      title: "Home-made sugar and salt solution when sachets run out",
      best_for: "Health posts, outbreaks and households far from a facility. It is inferior to ORS but far better than nothing.",
      requires: ["oral"],
      steps: [
        "Six level teaspoons of sugar and half a level teaspoon of salt in one litre of clean water (boiled and cooled if the source is doubtful).",
        "Taste it. It should be no saltier than tears. Too much salt is dangerous, especially for infants.",
        "Make a fresh batch every 24 hours and discard the rest.",
        "This solution contains no potassium and no citrate, so give potassium-rich foods alongside it: banana, orange juice, coconut water, potato, beans.",
        "Switch to proper ORS sachets as soon as any are available, and never use this mixture in severe acute malnutrition, where ReSoMal is required."
      ],
      monitor: ["Hydration signs every 1–2 hours: alertness, thirst, eyes, skin pinch, urine output", "Danger signs: repeated vomiting, blood in stool, convulsions, inability to drink"],
      cautions: [
        "Never add salt by eye. Teach the recipe with a real teaspoon and demonstrate it.",
        "Plain water, sweet fizzy drinks and commercial fruit juice all make diarrhoea worse: they have too much sugar and no salt."
      ]
    },
    {
      title: "Giving ORS to a child who keeps vomiting",
      best_for: "The commonest reason clinicians abandon oral rehydration too early and reach for a drip that is not needed.",
      requires: ["oral"],
      steps: [
        "Vomiting is not a reason to stop ORS. Give it slowly: 5 mL by spoon or syringe every 1–2 minutes, which is about 150 mL in an hour.",
        "If the child vomits, wait 10 minutes and then restart, more slowly.",
        "Use a cup and spoon or a syringe, never a bottle, so the rate is controlled.",
        "If the child still cannot keep it down after an hour, pass a nasogastric tube and give 20 mL/kg/hour for up to 6 hours. This works when an IV cannot be placed.",
        "Ondansetron, where available, reduces vomiting and the need for IV fluids in children over 6 months; a single oral dose of 0.15 mg/kg is used in many settings.",
        "Keep breastfeeding throughout. Never stop feeding a child with diarrhoea; withholding food prolongs the illness."
      ],
      monitor: ["Weight, hydration signs and urine output hourly", "Abdominal distension during nasogastric rehydration — slow the rate if it develops"],
      cautions: ["Do not use antidiarrhoeals such as loperamide in children — they cause ileus and mask fluid loss.", "Antibiotics are for cholera, dysentery with blood, and specific infections only."]
    },
    {
      title: "Making ReSoMal for severe acute malnutrition",
      best_for: "Stabilisation centres and hospitals where ReSoMal sachets are unavailable.",
      requires: ["oral"],
      steps: [
        "Severely malnourished children have too much sodium and too little potassium in their cells. Standard ORS has too much sodium for them and can cause heart failure.",
        "WHO recipe: dissolve one 1-litre sachet of standard ORS in 2 litres of water, then add 50 g of sucrose and 40 mL of combined mineral and vitamin mix (or the commercial electrolyte or mineral solution).",
        "Give 5 mL/kg every 30 minutes for the first 2 hours, then 5–10 mL/kg per hour in alternate hours with F-75 feeds, for up to 10 hours.",
        "Stop if the respiratory rate or pulse rises, the eyelids become puffy, or the liver enlarges — these mean overload.",
        "Give zinc as part of the mineral mix; do not give iron during the stabilisation phase.",
        "Intravenous fluids in severe acute malnutrition are only for shock, at 15 mL/kg over 1 hour."
      ],
      monitor: ["Pulse and respiratory rate every 30 minutes during rehydration", "Weight, puffiness of eyelids, liver size", "Blood glucose and temperature"],
      cautions: ["Never use WHO Plan C rates in severe acute malnutrition.", "Do not use standard ORS if ReSoMal or the recipe above can be made."]
    }
  ],
  paediatric: ["Zinc for 10–14 days shortens the episode and reduces the risk of another one over the next 2–3 months.", "Dispersible zinc tablets dissolve in a spoon of breast milk or clean water."],
  cautions: ["Hypernatraemia from incorrectly mixed solutions.", "ORS does not reduce stool volume — it replaces losses. Parents need to be told this or they will believe it failed."],
  textbook: [
    { book: "harrison", text: "Cholera with severe dehydration (all ages): Ringer's lactate (or saline) 100 mL/kg in the first 3 h (6 h if under 12 months), total 200 mL/kg in 24 h.", ref: "Harrison 22nd ed. 2025, ch. 173 Cholera and Other Vibrioses, p. 1328" },
    { book: "harrison", text: "Moderate dehydration, age 15 years or more (30 kg+): 2200–4000 mL ORS within the first 4 h, reassessing regularly.", ref: "Harrison 22nd ed. 2025, ch. 173 Cholera and Other Vibrioses, p. 1328" },
    { book: "harrison", text: "Homemade ORS: about half a teaspoon (3.5 g) salt with 6 teaspoons sugar or 50 g rice cereal per litre; potassium must be given separately.", ref: "Harrison 22nd ed. 2025, ch. 173 Cholera and Other Vibrioses, p. 1328" },
    { book: "harrison", text: "Zinc reduces diarrhoea volume and severity in young children with cholera: 10 mg daily for 10 days under 6 months, 20 mg daily for 10 days at 6–59 months.", ref: "Harrison 22nd ed. 2025, ch. 173 Cholera and Other Vibrioses, p. 1329" },
    { book: "nelson", text: "All children older than 6 months with acute diarrhoea in at-risk areas should receive oral zinc, 20 mg/day recommended by most guidelines, for 10–14 days during and after the diarrhoea; administration of zinc in community settings also increases the use of ORS and reduces inappropriate use of antimicrobials.", ref: "Nelson 22nd ed. 2024, ch. 387 Acute gastroenteritis in children, p. 2372" },
    { book: "nelson", text: "Shigella treatment includes zinc 20 mg (10 mg for infants under 6 months) for 10–14 days by mouth alongside ciprofloxacin or ceftriaxone.", ref: "Nelson 22nd ed. 2024, ch. 243 Shigella, p. 1780" },
    { book: "nelson", text: "Zinc supplements are recommended for children during and after diarrhoea at 10–20 mg/day for 2 weeks as part of essential nutrition actions.", ref: "Nelson 22nd ed. 2024, ch. 61 Nutrition and global health, p. 425" },
    { book: "nelson", text: "ReSuMal recipe for malnutrition and the severe acute malnutrition rehydration schedule are given in the malnutrition chapter, with ReSoMal 5–10 mL/kg in alternate hours and IV fluids reserved for shock.", ref: "Nelson 22nd ed. 2024, ch. 62, Tables 62.8 and 62.11, pp. 428–430" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO/UNICEF joint statement: clinical management of acute diarrhoea, 2004; WHO Pocket Book 2013" },
    { name: "WHO. Guideline: updates on the management of severe acute malnutrition, 2013" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "vitamin-a",
  name: "Vitamin A (retinol)",
  aka: ["Retinol palmitate"],
  cls: "Fat-soluble vitamin",
  cat: "nutrition",
  wards: ["paediatric", "outpatient"],
  tags: ["measles", "xerophthalmia", "malnutrition", "night blindness", "corneal ulcer"],
  presentation: ["200,000 IU and 100,000 IU soft gelatin capsules (oil).", "Some programmes stock 50,000 IU capsules for young infants.", "Capsules can be snipped and the oil given by mouth."],
  indications: ["Measles in any child in a region with vitamin A deficiency", "Xerophthalmia: night blindness, Bitot spots, corneal ulceration", "Severe acute malnutrition with eye signs or recent measles", "Routine supplementation programmes in deficient populations"],
  standard: {
    summary: "Two capsules given on two consecutive days cut measles mortality substantially. It costs a few cents and needs no equipment at all.",
    items: [
      { label: "Measles or xerophthalmia", text: "Under 6 months 50,000 IU; 6–12 months 100,000 IU; over 12 months 200,000 IU. Give on day 1 and day 2, and repeat the same dose on day 14 if there are eye signs or severe malnutrition." },
      { label: "Severe acute malnutrition", text: "Give on day 1 only if there are eye signs of deficiency or recent measles, then repeat on days 2 and 14 (WHO). Routine high-dose vitamin A is no longer given to all children receiving fortified therapeutic feeds, which already contain it." },
      { label: "Routine supplementation", text: "6–11 months 100,000 IU once; 12–59 months 200,000 IU every 4–6 months in deficient areas." }
    ]
  },
  improvised: [
    {
      title: "Giving a capsule to a small or unconscious child",
      best_for: "Any facility. The capsule is designed to be opened.",
      requires: ["oral"],
      steps: [
        "Cut the narrow end of the capsule with clean scissors or snip it with a needle.",
        "Squeeze the oil directly into the child's mouth. Do not give the capsule whole to a young child, who may choke on it.",
        "For a 50,000 IU dose when only 200,000 IU capsules exist, squeeze the oil into a clean spoon and give roughly a quarter of the drops. Precision is not critical; the dose range is wide and a rough quarter is safe and effective.",
        "If the child is unconscious, the oil can be given down a nasogastric tube.",
        "Record the dose and the date on the child's card so the day-14 dose is not missed and so a routine campaign dose is not duplicated within a month."
      ],
      monitor: ["Eye signs at review", "Bulging fontanelle or vomiting in an infant after dosing — a transient sign of raised intracranial pressure that settles"],
      cautions: [
        "Do not repeat a high dose within a month outside the prescribed schedule.",
        "Avoid high doses in pregnancy: 200,000 IU is teratogenic. Pregnant women with night blindness receive no more than 10,000 IU daily or 25,000 IU weekly."
      ]
    },
    {
      title: "Corneal ulceration from vitamin A deficiency",
      best_for: "The true ophthalmic emergency in malnutrition and measles. The eye can perforate within a day.",
      requires: ["oral"],
      steps: [
        "Give vitamin A immediately at the age-appropriate dose, and repeat the next day and on day 14.",
        "Instil chloramphenicol or tetracycline eye ointment three times daily.",
        "Instil one drop of atropine 1 % to relax the eye and reduce the risk of the lens pushing out through a perforation.",
        "Cover the eye with a pad or eye shield. Do not let anyone press on the eye.",
        "Treat the underlying malnutrition and measles, and refer urgently for ophthalmic assessment."
      ],
      monitor: ["Daily eye examination", "Nutritional recovery"],
      cautions: ["Never apply steroid eye drops to a corneal ulcer.", "Do not force the eye open for examination if perforation is possible."]
    }
  ],
  paediatric: ["Dose by age, not weight.", "Give to every child with measles in a region with vitamin A deficiency, whether or not there are eye signs."],
  cautions: ["Acute overdose causes vomiting, headache and a bulging fontanelle, which resolve.", "Teratogenic in pregnancy at high doses."],
  textbook: [
    { book: "nelson", text: "Severe acute malnutrition with corneal ulceration: give vitamin A immediately, at 50,000 IU if under 6 months, 100,000 IU at 6–12 months and 200,000 IU over 12 months, and instil 1 drop of atropine 1 % into the affected eye to relax the eye and prevent the lens from pushing out.", ref: "Nelson 22nd ed. 2024, ch. 62, Table, p. 428" },
    { book: "nelson", text: "Give vitamin A on day 1 (under 6 months 50,000 units; 6–12 months 100,000 units; over 12 months 200,000 units) if the child has any eye signs of vitamin A deficiency or has had recent measles, and repeat this dose on days 2 and 14. Folic acid 1 mg (5 mg on day 1), zinc 2 mg/kg/day and copper 0.3 mg/kg/day are also given; iron is not given in the stabilisation phase.", ref: "Nelson 22nd ed. 2024, ch. 62 Severe acute malnutrition, p. 429" },
    { book: "nelson", text: "Micronutrient supplements for young children, including vitamin A, iron and zinc, are among the essential nutrition actions in deficient areas.", ref: "Nelson 22nd ed. 2024, ch. 61, p. 425" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO. Guideline: vitamin A supplementation in infants and children 6–59 months, 2011" },
    { name: "WHO Pocket Book of Hospital Care for Children 2013 (measles, xerophthalmia)" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "blood-transfusion",
  name: "Blood transfusion (whole blood and packed cells)",
  aka: ["Whole blood", "Packed red cells", "PRBC"],
  cls: "Blood product",
  cat: "haem",
  wards: ["emergency", "maternity", "neonatal", "paediatric", "medical", "surgical", "icu"],
  tags: ["anaemia", "haemorrhage", "PPH", "malaria", "transfusion", "sickle cell"],
  presentation: [
    "Whole blood unit (about 450 mL) — the usual product where component separation is unavailable.",
    "Packed red cells (about 250 mL) — preferred when the patient is anaemic but not hypovolaemic, or has heart failure.",
    "Store at 2–6 °C in a monitored blood-bank fridge, never a domestic or vaccine fridge."
  ],
  indications: ["Severe anaemia with decompensation (malaria, hookworm, malnutrition, sickle cell)", "Acute haemorrhage including postpartum haemorrhage and trauma", "Exchange transfusion in severe neonatal jaundice"],
  standard: {
    summary: "Transfusion is the one 'drug' that cannot be improvised, so the skill lies in transfusing the right patient, at the right rate, with the equipment you have.",
    items: [
      { label: "Child, severe anaemia", text: "Whole blood 20 mL/kg over 3–4 h, or packed cells 10 mL/kg. WHO threshold: Hb under 4 g/dL, or 4–6 g/dL with respiratory distress, heart failure, impaired consciousness or hyperparasitaemia." },
      { label: "Severe acute malnutrition", text: "Whole blood 10 mL/kg slowly over 3 h, or packed cells 5–7 mL/kg if there are signs of heart failure, with furosemide 1 mg/kg IV at the start." },
      { label: "Adult haemorrhage", text: "Transfuse to control of bleeding and clinical endpoints rather than to a haemoglobin number; give tranexamic acid 1 g within 3 h." },
      { label: "Expected rise", text: "Whole blood 20 mL/kg or packed cells 10 mL/kg raises the haemoglobin by roughly 2–3 g/dL." }
    ]
  },
  improvised: [
    {
      title: "Running and timing a transfusion by gravity",
      best_for: "Every hospital. Pumps are never used for blood in these settings, and a time-tape is the control.",
      requires: ["iv", "macro_set"],
      steps: [
        "Use a blood giving set with a filter, not an ordinary fluid set. Prime it with normal saline only. Never with glucose or Ringer's lactate, which cause haemolysis or clotting.",
        "Use the largest cannula the vein will take: 18 G or larger in adults, 22–24 G in small children.",
        "Blood giving sets are usually 15 drops per mL — check the packet, since this differs from the 20 drops/mL fluid set.",
        "A 15 kg child receiving 300 mL of whole blood over 4 hours needs 75 mL/h, which is about 19 drops/min on a 15 drops/mL set, roughly 5 drops every 15 seconds.",
        "Time-tape the bag: mark the level the blood should reach at each hour and have the nurse correct the clamp against the marks.",
        "Start slowly for the first 15 minutes and stay with the patient, because most severe reactions appear in that window.",
        "Complete each unit within 4 hours of leaving the fridge. Discard a unit that has been out longer.",
        "Give furosemide 1 mg/kg IV at the start in a child with heart failure, or transfuse packed cells more slowly instead."
      ],
      monitor: [
        "Baseline temperature, pulse, respiratory rate and BP before starting; then at 15 min, at 30 min, hourly during, and at the end.",
        "Watch for fever, rigors, rash, back or chest pain, dark urine, breathlessness, or a fall in BP.",
        "Watch for overload: rising respiratory rate, new crackles, enlarging liver and puffy eyelids."
      ],
      cautions: [
        "Reaction: STOP the transfusion, keep the line open with saline through a NEW giving set, check the patient's identity against the unit, treat the symptoms, and send the unit and a fresh sample back to the laboratory.",
        "The commonest fatal error worldwide is giving the right blood to the wrong patient. Check the name, the number and the unit at the bedside with a second person, every time.",
        "Never warm blood in hot water, on a radiator or in the sun. Uncontrolled warming haemolyses the unit and can kill the patient."
      ]
    },
    {
      title: "Deciding not to transfuse",
      best_for: "The most important skill where blood is scarce, unscreened or expensive.",
      requires: [],
      steps: [
        "Transfuse for symptoms and decompensation, not for a number. A stable child with a haemoglobin of 5 g/dL who is feeding, alert and not breathless is usually better treated with iron, antimalarials, deworming and nutrition.",
        "Treat the cause at the same time: antimalarials, albendazole for hookworm, iron and folate, and food. Chronic anaemia has been compensated for over weeks and is remarkably well tolerated.",
        "In acute haemorrhage, stop the bleeding first. In postpartum haemorrhage the uterotonics, tranexamic acid, bimanual compression and the theatre save more lives than the blood does.",
        "Where blood is unscreened for HIV, hepatitis B and C and syphilis, the threshold to transfuse must be higher still, and the family must understand the risk.",
        "Recruit and screen donors before the patient becomes critical. A functioning walking-donor panel of relatives and staff is worth more than any single piece of equipment in an obstetric unit."
      ],
      monitor: ["Haemoglobin trend, respiratory rate, feeding and activity", "Response to iron at 2 weeks"],
      cautions: ["Never transfuse purely to correct a laboratory value in a stable patient."]
    },
    {
      title: "Massive haemorrhage without a blood bank",
      best_for: "Postpartum haemorrhage, ruptured ectopic pregnancy and trauma at a hospital with no stored blood.",
      requires: ["iv", "macro_set"],
      steps: [
        "Call for donors immediately, in parallel with everything else. Group O donors are the fallback; relatives and staff are the usual panel.",
        "Meanwhile: two large cannulae, crystalloid to maintain a palpable radial pulse, tranexamic acid 1 g IV over 10 min, and definitive control of the bleeding.",
        "Do not over-transfuse crystalloid in ongoing haemorrhage. Dilution worsens clotting; the destination is the operating theatre or the uterus, not the drip stand.",
        "Autotransfusion is life-saving in ruptured ectopic pregnancy where the abdominal blood is fresh and not contaminated by bowel content or infection: collect it into a sterile bowl, filter through sterile gauze into a bottle with citrate anticoagulant, and reinfuse through a blood filter set. Follow your national protocol for this technique.",
        "Keep the patient warm. Hypothermia stops clotting as effectively as a lack of clotting factors."
      ],
      monitor: ["Pulse, BP, urine output, conscious level", "Ongoing blood loss, clot formation"],
      cautions: ["Never autotransfuse blood contaminated by bowel contents, infection or malignancy."]
    }
  ],
  paediatric: ["Calculate every volume and write it down; 20 mL/kg of whole blood in a 4 kg infant is only 80 mL, and a whole unit would be fatal.", "Use a burette or a syringe for small volumes and give the exact amount, discarding the rest of the unit if necessary."],
  cautions: ["Acute haemolytic reaction, febrile and allergic reactions, transfusion-associated circulatory overload, and transmission of HIV, hepatitis B and C, syphilis and malaria.", "Blood must be screened; where it is not, the indication must be strong."],
  calc: { type: "weight", dosePerKg: 20, doseUnit: "mL", conc: 1, concUnit: "mL/mL", label: "Whole blood 20 mL/kg (packed cells 10 mL/kg)" },
  textbook: [
    { book: "harrison", text: "Red cell transfusion thresholds (with symptoms): Hb below 7 g/dL if haemodynamically stable, below 8 g/dL with cardiovascular disease or orthopaedic/cardiac surgery, 9-10 g/dL in acute coronary disease; not for nutritional anaemia.", ref: "Harrison 22nd ed. 2025, ch. 118 Transfusion Therapy and Biology, p. 906" },
    { book: "harrison", text: "Give one red cell unit at a time (250-350 mL); each unit raises Hb by about 1 g/dL and haematocrit by 3%.", ref: "Harrison 22nd ed. 2025, ch. 118 Transfusion Therapy and Biology, p. 906" },
    { book: "harrison", text: "Preventing circulatory overload (TACO): identify at-risk patients, transfuse slowly (1 unit over 3-4 h), use diuretics in stable patients with prior TACO; treat by stopping transfusion, oxygen and diuretics.", ref: "Harrison 22nd ed. 2025, ch. 118 Transfusion Therapy and Biology, p. 912" },
    { book: "williams", text: "With ongoing obstetrical haemorrhage Parkland transfuses rapidly when hematocrit is below 25 percent; compatible whole blood is ideal and one unit raises hematocrit 3 to 4 volume percent.", ref: "Williams Obstetrics 25th ed. 2018, ch. 41 Obstetrical Hemorrhage, pdf p. 1745" },
    { book: "williams", text: "After about five red cell units check platelets, clotting studies and fibrinogen; keep platelets above 50,000/microL, replace if fibrinogen below 150 mg/dL, fresh-frozen plasma 10 to 15 mL/kg.", ref: "Williams Obstetrics 25th ed. 2018, ch. 41 Obstetrical Hemorrhage, pdf p. 1746" },
    { book: "williams", text: "Urine output measured hourly is a key vital sign in haemorrhage; maintain at least 30 and preferably 50 mL or more per hour.", ref: "Williams Obstetrics 25th ed. 2018, ch. 41 Obstetrical Hemorrhage, pdf p. 1743" },
    { book: "gabbe", text: "Consider packed red cells for Hb below 7 g/dL or active haemorrhage with coagulopathy; one unit raises Hb about 1 g/dL in a 70 kg patient.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 418" },
    { book: "gabbe", text: "Obstetric massive transfusion commonly 4 units pRBC : 4 FFP : 1 apheresis platelets; platelets if count <20,000 after vaginal or <50,000 after caesarean delivery.", ref: "Gabbe's Obstetrics 9th ed., ch. 20 Antepartum and Postpartum Hemorrhage, p. 418" },
    { book: "schwartz", text: "Massive transfusion: deliver plasma, platelets and RBCs 1:1:1, started early (ideally with the first 2 RBC units), minimise crystalloid, stop once active bleeding ends.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 4 Hemostasis, Surgical Bleeding, and Transfusion, p. 120" },
    { book: "schwartz", text: "Non-bleeding patients: restrictive trigger; AABB minimum threshold 7 g/dL if stable, 8 g/dL for cardiac/orthopaedic surgery or cardiovascular disease; transfuse symptomatic anaemia one unit at a time.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 4 Hemostasis, Surgical Bleeding, and Transfusion, p. 117" },
    { book: "schwartz", text: "Whole blood is advantageous in remote/austere settings where platelets are unavailable and was associated with improved survival versus component therapy in military casualties.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 4 Hemostasis, Surgical Bleeding, and Transfusion, p. 121" },
    { book: "schwartz", text: "Damage control resuscitation: permissive hypotension, minimal crystalloid, early balanced blood products in whole-blood-like ratios, and haemostatic adjuncts.", ref: "Schwartz's Principles of Surgery 11th ed., ch. 4 Hemostasis, Surgical Bleeding, and Transfusion, p. 119" },
    { book: "nelson", text: "Severe acute malnutrition with very severe anaemia, haemoglobin under 4 g/dL, or 4–6 g/dL with respiratory distress: give whole blood 10 mL/kg slowly over 3 hours, or packed cells 5–7 mL/kg if there are signs of heart failure, with furosemide 1 mg/kg IV at the start of the transfusion. In shock not improving, assume septic shock, give maintenance fluid 4 mL/kg/hr while waiting for blood, and order 10 mL/kg fresh whole blood transfused slowly over 3 hours.", ref: "Nelson 22nd ed. 2024, ch. 62 Severe acute malnutrition, Table, p. 428" },
    { book: "nelson", text: "After receiving 100 mL/kg of red-cell transfusions, regular assessment for iron overload should begin, usually including serum ferritin and MRI assessment of hepatic iron every 1–2 years; children on chronic transfusion should also have annual screening for transfusion-transmitted infections including hepatitis B, hepatitis C and HIV.", ref: "Nelson 22nd ed. 2024, ch. 511 Sickle cell disease, p. 2976" }
  ],
  sources: [
    { name: "Nelson Textbook of Pediatrics, 22nd ed. 2024" },
    { name: "WHO Pocket Book of Hospital Care for Children 2013 (blood transfusion)" },
    { name: "WHO. The clinical use of blood, handbook" }
  ],
  review: { status: "draft", by: null, date: null }
},
/* ---------------------------------------------------------- */
{
  id: "ipratropium",
  name: "Ipratropium bromide",
  aka: [
    "Atrovent",
    "ipratropium",
    "Combivent (with salbutamol)"
  ],
  cls: "Short-acting muscarinic antagonist (inhaled anticholinergic bronchodilator)",
  cat: "respiratory",
  wards: [
    "emergency",
    "paediatric",
    "medical",
    "icu",
    "outpatient"
  ],
  tags: [
    "asthma",
    "severe asthma",
    "COPD",
    "wheeze",
    "bronchospasm",
    "nebuliser"
  ],
  presentation: [
    "Nebuliser solution 250 mcg/mL: 1 mL (250 mcg) and 2 mL (500 mcg) unit-dose vials. Preservative-free — discard the opened vial after use.",
    "Metered-dose inhaler 20 mcg per puff (US products are labelled 18 mcg per actuation).",
    "Combination nebules: salbutamol 2.5 mg + ipratropium 500 mcg in 2.5 mL.",
    "Room temperature; protect nebules from light."
  ],
  indications: [
    "Add-on to salbutamol in a severe or life-threatening asthma attack (first hours in the emergency department)",
    "Acute exacerbation of COPD (with salbutamol)",
    "Wheeze in a patient on a β-blocker, or with heavy secretions, where β-agonists alone are not enough"
  ],
  standard: {
    summary: "Nebulised or MDI doses given alongside salbutamol. Never used alone as the reliever — it is weaker and slower than salbutamol. No infusion, no pump.",
    items: [
      {
        label: "Severe asthma — nebulised",
        text: "Add to every salbutamol nebulisation in the first hour (every 20 min, 3 doses), then every 4–6 h or stop once improving. Adult and child 12 y or over: 500 mcg. Child under 12 y: 250 mcg (NAEPP allows 250–500 mcg). The two solutions can be mixed in the same nebuliser chamber."
      },
      {
        label: "Severe asthma — MDI with spacer",
        text: "Adult: 8 puffs every 20 min as needed for up to 3 h. Child under 12 y: 4–8 puffs every 20 min for up to 3 h (NAEPP EPR-3). Give the salbutamol puffs first, then the ipratropium puffs, one puff at a time into the spacer."
      },
      {
        label: "COPD exacerbation (adult)",
        text: "500 mcg nebulised every 4–6 h with salbutamol 2.5–5 mg. In a patient known to retain CO2, drive the nebuliser with compressed air, not oxygen, and give oxygen separately by nasal prongs to a target saturation of 88–92 %."
      },
      {
        label: "After admission",
        text: "Little added benefit in children once they are on frequent salbutamol and a systemic steroid (Nelson). Stop it rather than continue 6-hourly by habit, unless the patient has COPD, heavy secretions, or is on a β-blocker."
      }
    ]
  },
  improvised: [
    {
      title: "MDI and a home-made bottle spacer (no nebuliser, no oxygen)",
      best_for: "Health centre or ward with inhalers only. Works as well as nebulisation for most attacks.",
      requires: [
        "mdi"
      ],
      steps: [
        "Make the spacer as on the salbutamol page: a clean 500 mL plastic bottle with the inhaler mouthpiece sealed into a hole in the base; the patient breathes from the bottle neck (small child: a cup or mask fitted over the neck).",
        "Salbutamol first: 1 puff at a time, 4–6 normal breaths after each puff, up to the salbutamol dose.",
        "Then ipratropium the same way: adult 8 puffs, child under 12 y 4–8 puffs.",
        "Repeat both every 20 min for the first hour (3 rounds). Reassess after each round.",
        "After the first 1–3 hours, stop the ipratropium if the patient is improving; continue salbutamol as needed."
      ],
      monitor: [
        "Respiratory rate, ability to talk or feed, chest indrawing, wheeze (a silent chest is worse, not better)",
        "SpO2 if available — give oxygen for SpO2 under 90 %"
      ],
      cautions: [
        "Shake the inhaler and prime a new bottle spacer with a few puffs; static in plastic bottles reduces the dose.",
        "A dry mouth and a bitter taste are expected."
      ]
    },
    {
      title: "Giving 250 mcg from a 500 mcg vial",
      best_for: "Only 500 mcg/2 mL vials in stock and a child under 12 needs 250 mcg.",
      requires: [
        "neb"
      ],
      steps: [
        "Snap open the 2 mL vial (250 mcg/mL). Draw exactly 1 mL (250 mcg) with a clean syringe and put it in the nebuliser chamber.",
        "Add the salbutamol dose and make the volume up to about 3–4 mL with 0.9 % saline if the chamber needs it.",
        "The vial has no preservative: discard the remaining 1 mL unless your unit's policy allows it to be kept, in a sterile capped labelled syringe, for the same child's next dose within the hour."
      ],
      monitor: [
        "Response after each nebulisation"
      ],
      cautions: [
        "Label the capped syringe with the name, drug and time. Never share a part-used vial between patients."
      ]
    },
    {
      title: "Nebulising without oxygen (compressor or foot pump)",
      best_for: "Oxygen shortage, or COPD with CO2 retention where oxygen-driven nebulisation is unsafe.",
      requires: [
        "neb"
      ],
      steps: [
        "Drive the nebuliser with an electric compressor or foot pump at the usual doses (ipratropium plus salbutamol in the same chamber).",
        "Give oxygen at the same time by nasal prongs (adult 1–2 L/min to start) — the nebuliser mask fits over the prongs.",
        "If there is no oxygen at all, still give the nebuliser: bronchodilation helps more than the brief fall in saturation hurts, but watch closely."
      ],
      monitor: [
        "SpO2 before, during and after; drowsiness (CO2 retention) in COPD"
      ],
      cautions: [
        "Use a mouthpiece rather than a face mask if the patient has glaucoma — mist in the eyes can precipitate angle-closure glaucoma."
      ]
    }
  ],
  paediatric: [
    "Under 12 y: 250 mcg nebulised (4–8 puffs by MDI and spacer) every 20 min for the first hour, with salbutamol.",
    "Its benefit is in the first hours in the emergency department (fewer admissions); routine continuation on the ward adds little (Nelson).",
    "Bronchiolitis in infants: not recommended."
  ],
  cautions: [
    "Never a substitute for salbutamol or for steroids — it is an add-on.",
    "Angle-closure glaucoma: nebuliser mist in the eyes can precipitate an attack; use a mouthpiece or protect the eyes.",
    "Urinary retention in older men with prostatic enlargement; dry mouth; rarely paradoxical bronchospasm — stop it if wheeze worsens straight after a dose.",
    "Patients with COPD who retain CO2: oxygen-driven nebulisers can cause drowsiness and respiratory acidosis — use air and separate oxygen to 88–92 %."
  ],
  sources: [
    {
      name: "GINA. Global Strategy for Asthma Management and Prevention, 2024"
    },
    {
      name: "NAEPP Expert Panel Report 3 (EPR-3): Guidelines for the Diagnosis and Management of Asthma, 2007 — emergency department dosing table"
    },
    {
      name: "BTS/SIGN British guideline on the management of asthma; BNF and BNF for Children (ipratropium bromide)"
    },
    {
      name: "GOLD. Global Strategy for the Diagnosis, Management and Prevention of COPD, 2024"
    },
    {
      name: "WHO Pocket Book of Hospital Care for Children, 2nd ed. 2013 (spacer technique)"
    }
  ],
  textbook: [
    {
      book: "nelson",
      text: "Anticholinergics are weaker bronchodilators than β-agonists; inhaled ipratropium is used mainly in acute severe asthma, and added to salbutamol in the emergency department it improves lung function and reduces hospital admission in children.",
      ref: "Nelson 22nd ed. 2024, ch. 185 Childhood asthma, p. 1404"
    },
    {
      book: "nelson",
      text: "Exacerbation table: ipratropium is not first-line and is added to β2-agonist therapy; nebuliser solution 0.5 mg/2.5 mL, MDI 18 mcg per puff; nebulised ipratropium may be mixed with salbutamol.",
      ref: "Nelson 22nd ed. 2024, ch. 185, Table 185.17, p. 1405"
    },
    {
      book: "nelson",
      text: "In hospital, ipratropium is often added to salbutamol every 6 hours if the child is not clearly improving, although there is little evidence of extra benefit once aggressive β-agonist and systemic steroid therapy are under way; it may help with mucus hypersecretion or in patients on β-blockers.",
      ref: "Nelson 22nd ed. 2024, ch. 185, p. 1409"
    },
    {
      book: "harrison",
      text: "Acute asthma in urgent care: nebulised β2-agonist up to every 20 min, IV corticosteroids if no response in 1–2 h, oxygen for hypoxaemia; nebulised anticholinergics can add bronchodilation.",
      ref: "Harrison 22nd ed. 2025, ch. 298 Asthma, p. 2227"
    },
    {
      book: "harrison",
      text: "COPD exacerbation: inhaled β-agonists and muscarinic antagonists, separately or together, usually nebulised at first; changing to MDIs with training of patients and staff is effective. Oxygen to a saturation target of 88–92 %.",
      ref: "Harrison 22nd ed. 2025, ch. 303 COPD, p. 2259"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "adenosine",
  name: "Adenosine",
  aka: [
    "Adenocor",
    "Adenocard"
  ],
  cls: "Antiarrhythmic (AV nodal blocker, ultra-short-acting)",
  cat: "cardio",
  wards: [
    "emergency",
    "paediatric",
    "medical",
    "icu",
    "maternity"
  ],
  tags: [
    "SVT",
    "supraventricular tachycardia",
    "palpitations",
    "narrow complex tachycardia",
    "arrhythmia"
  ],
  presentation: [
    "3 mg/mL, 2 mL vial (6 mg). Also 30 mg/10 mL vials sold for cardiac stress testing — do not confuse them.",
    "Store at room temperature; do NOT refrigerate (crystallises)."
  ],
  indications: [
    "Regular narrow-complex tachycardia (SVT) in a stable patient after vagal manoeuvres fail",
    "Diagnostic: to slow the ventricular rate and reveal flutter waves in a regular narrow-complex tachycardia"
  ],
  standard: {
    summary: "Rapid IV push into a large vein followed instantly by a saline flush, with continuous ECG recording and a defibrillator at hand. Half-life is under 10 seconds — a slow push does nothing.",
    items: [
      {
        label: "First: vagal manoeuvres",
        text: "Adult or older child: modified Valsalva — blow into a 10 mL syringe hard enough to move the plunger for 15 s, then immediately lie flat and have the legs lifted to 45° for 15 s. Infant: a bag of ice-cold water or a cold wet cloth over the whole face for 15–30 s (Nelson). Never press on the eyeballs. Carotid sinus massage only in young adults without bruits or stroke history."
      },
      {
        label: "Child (and neonate)",
        text: "0.1 mg/kg (maximum 6 mg) rapid IV push with a flush. If no effect after 2 min: 0.2 mg/kg (maximum 12 mg) (Nelson, PALS). BNF for Children starts neonates at 150 mcg/kg — follow your national protocol."
      },
      {
        label: "Adult",
        text: "6 mg rapid IV push with a 20 mL saline flush. If no effect after 1–2 min: 12 mg. A further 12 mg may be given (Resuscitation Council UK uses 18 mg for the third dose). Use 3 mg as the first dose if the patient takes dipyridamole or carbamazepine, has had a heart transplant, or the drug goes into a central line."
      },
      {
        label: "Unstable (shock, syncope, heart failure, chest pain)",
        text: "Synchronised cardioversion (child 0.5–1 J/kg, then 2 J/kg; adult: use the energy recommended for your defibrillator, commonly 70–150 J biphasic for narrow-complex SVT) under sedation. Adenosine may be tried while the defibrillator is being prepared only if it does not delay the shock."
      },
      {
        label: "Pregnancy",
        text: "Vagal manoeuvres, then adenosine at the adult doses — safe and effective in stable pregnant women; transient fetal bradycardia has been reported (Williams)."
      }
    ]
  },
  improvised: [
    {
      title: "Single-person rapid push with a 3-way tap",
      best_for: "The standard method when you have one nurse or doctor at the bedside and no pump — which is all adenosine ever needs.",
      requires: [
        "iv"
      ],
      steps: [
        "Cannula in a large proximal vein — antecubital fossa, not the hand or foot. Check it flushes freely.",
        "Attach a 3-way tap directly to the cannula (no extension line if possible — dead space delays the drug).",
        "Syringe 1 (on the side port in line with the vein): the adenosine dose. Child: draw 1 mL (3 mg) and dilute to 10 mL with 0.9 % saline = 0.3 mg/mL, then draw the dose. Adult: 6 mg = 2 mL undiluted.",
        "Syringe 2 (on the other port): the flush — adult 20 mL 0.9 % saline, child 5–10 mL.",
        "Raise the arm. Start recording the ECG. Turn the tap towards the adenosine, push it as fast as you can (under 1–2 seconds), turn the tap and slam in the whole flush immediately.",
        "Warn the patient first: a few seconds of chest tightness, flushing and a sense of doom are expected.",
        "If no change after 1–2 min, repeat with the next dose. Maximum three doses, then think again about the rhythm."
      ],
      monitor: [
        "ECG running before, during and for 1 minute after each push — the response is the diagnosis",
        "Pulse and blood pressure after conversion"
      ],
      cautions: [
        "A pause of several seconds (asystole) before sinus rhythm returns is normal; if it lasts, give chest compressions briefly — it wears off within 10–20 s.",
        "If the rate slows and flutter waves or atrial activity appear without conversion, the rhythm is atrial flutter or atrial tachycardia — adenosine will not cure it; treat rate control instead."
      ]
    },
    {
      title: "No 3-way tap: two syringes, two ports",
      best_for: "Cannula with an injection port, or a running drip, but no 3-way tap.",
      requires: [
        "iv"
      ],
      steps: [
        "Option A — cannula with a top injection port: put the flush syringe on the cannula hub (Luer end) and inject the adenosine through the top port; push adenosine and follow with the flush with no gap.",
        "Option B — running 0.9 % saline drip: inject the adenosine into the injection port closest to the cannula, then open the roller clamp fully and squeeze the drip chamber/bag while a second person pushes the saline flush through the same port.",
        "Option C — two people: one pushes the adenosine, the other has the flush syringe ready and pushes the moment the first syringe is empty, through the same port."
      ],
      monitor: [
        "ECG recording during the push"
      ],
      cautions: [
        "Drawing adenosine and the saline flush into one large syringe has been studied and may work similarly, but most protocols still use separate syringes — use it only if your unit accepts it.",
        "Any delay between drug and flush is the usual reason adenosine 'fails'."
      ]
    },
    {
      title: "No cardiac monitor — using a 12-lead ECG machine or a defibrillator screen",
      best_for: "Ward or casualty with an ECG machine or a manual defibrillator but no bedside monitor.",
      requires: [
        "iv",
        "ecg"
      ],
      steps: [
        "Record a 12-lead ECG first. Give adenosine only if the tachycardia is REGULAR and NARROW (QRS under 3 small squares). A regular broad-complex tachycardia is treated as ventricular tachycardia; an irregular one must never get adenosine.",
        "During the push, run a continuous rhythm strip (lead II) on the ECG machine, or connect the defibrillator pads/leads and watch its screen.",
        "Have a second person feel the pulse or listen to the apex throughout.",
        "Bag-valve-mask, oxygen and the defibrillator must be at the bed before the first dose."
      ],
      monitor: [
        "Printed strip kept in the notes — it shows whether it was SVT, flutter or something else"
      ],
      cautions: [
        "If there is NO way to see the rhythm at all, do not give adenosine blind: use vagal manoeuvres and refer. Signs that suggest SVT rather than sinus tachycardia (fixed rate that does not vary with crying, fever or movement; infant rate usually over 220/min, child over 180/min, sudden onset and offset) are not enough on their own.",
        "Do not give adenosine in an irregular tachycardia with broad complexes (pre-excited atrial fibrillation) — it can cause ventricular fibrillation."
      ]
    }
  ],
  paediatric: [
    "0.1 mg/kg (max 6 mg) rapid IV/IO push, then 0.2 mg/kg (max 12 mg). Dilute 3 mg in 10 mL saline (0.3 mg/mL) so that small doses can be measured.",
    "Infants: ice-water bag to the face first. Never eyeball pressure.",
    "Verapamil is contraindicated under 1 year — it causes hypotension and cardiac arrest in infants (Nelson).",
    "Heart failure in an infant with SVT: synchronised cardioversion 0.5–2 J/kg is first-line."
  ],
  cautions: [
    "Always have a defibrillator nearby: adenosine triggers atrial fibrillation (usually brief) in up to 15 % — dangerous in Wolff-Parkinson-White.",
    "Asthma and severe COPD: can cause bronchospasm; avoid if another option exists, and have salbutamol ready.",
    "Contraindicated in second- or third-degree AV block and sick sinus syndrome (unless paced), long QT, and after heart transplantation (Harrison).",
    "Aminophylline, theophylline and caffeine block adenosine — larger doses may be needed. Dipyridamole and carbamazepine increase its effect — start at 3 mg (adult).",
    "Verapamil is NOT in this app. Adults only, if in your formulary and adenosine is unavailable or has failed: verapamil 5 mg IV over 2 min (not in infants, broad-complex tachycardia, WPW, heart failure, hypotension, or with a β-blocker) — check your formulary."
  ],
  calc: {
    type: "weight",
    dosePerKg: 0.1,
    doseUnit: "mg",
    conc: 3,
    concUnit: "mg/mL",
    maxDose: 6,
    label: "First dose 0.1 mg/kg (max 6 mg) at 3 mg/mL — for small children dilute 3 mg in 10 mL (0.3 mg/mL); second dose 0.2 mg/kg (max 12 mg)"
  },
  sources: [
    {
      name: "Resuscitation Council UK. Adult and Paediatric Advanced Life Support guidelines, 2021 (tachycardia algorithms)"
    },
    {
      name: "American Heart Association. PALS and ACLS guidelines 2020, focused updates 2023"
    },
    {
      name: "Appelboam A et al. Postural modification to the standard Valsalva manoeuvre (REVERT). Lancet 2015;386:1747–53"
    },
    {
      name: "BNF and BNF for Children — adenosine"
    },
    {
      name: "Nelson Textbook of Pediatrics, 22nd ed. 2024, ch. 484"
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
      book: "harrison",
      text: "Adenosine causes transient chest pain, dyspnoea and anxiety; it is contraindicated after cardiac transplantation, may aggravate bronchospasm, and triggers (usually brief) AF in up to 15 %, so use cautiously in WPW. Verapamil and β-blockers work but can cause hypotension.",
      ref: "Harrison 22nd ed. 2025, ch. 256 Paroxysmal Supraventricular Tachycardias, p. 1943"
    },
    {
      book: "harrison",
      text: "Adenosine must be given as a rapid bolus because it is taken up by red cells and endothelium within seconds, before it can reach the AV node.",
      ref: "Harrison 22nd ed. 2025, ch. 71 Principles of Clinical Pharmacology, p. 486"
    },
    {
      book: "williams",
      text: "Pregnancy: vagal manoeuvres first, then IV adenosine, which is safe and effective in haemodynamically stable pregnant women; transient fetal bradycardia has been described. Synchronised cardioversion if unstable.",
      ref: "Williams Obstetrics 25th ed. 2018, ch. 49 Cardiovascular Disorders, pdf p. 2142"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "mannitol",
  name: "Mannitol",
  aka: [
    "Osmitrol",
    "mannitol 20 %",
    "osmotic diuretic"
  ],
  cls: "Osmotic diuretic (osmotherapy)",
  cat: "neuro",
  wards: [
    "emergency",
    "surgical",
    "icu",
    "paediatric",
    "medical"
  ],
  tags: [
    "raised intracranial pressure",
    "ICP",
    "head injury",
    "cerebral oedema",
    "herniation",
    "brain swelling"
  ],
  presentation: [
    "20 % (200 mg/mL = 20 g per 100 mL) in 250 mL and 500 mL bottles or bags; 10 % (100 mg/mL) in 500 mL.",
    "20 % crystallises when cold (store 20–30 °C). Crystals must be fully redissolved before use."
  ],
  indications: [
    "Raised intracranial pressure with signs of herniation (falling consciousness, unequal or dilated pupil, posturing, Cushing response) — as a bridge to CT, surgery or burr holes",
    "Cerebral oedema in diabetic ketoacidosis (hypertonic saline is the alternative)",
    "Acute angle-closure glaucoma (specialist)"
  ],
  standard: {
    summary: "An intermittent dose run over 20–30 minutes — no pump needed. Effect starts in about 20 min and lasts a few hours; it buys time, it does not fix the cause.",
    items: [
      {
        label: "Dose",
        text: "0.25–1 g/kg IV over 20–30 min. A usual starting dose is 0.5 g/kg = 2.5 mL/kg of 20 % (70 kg adult: 35 g = 175 mL). Harrison: 25–100 g every 4 h as needed in adults."
      },
      {
        label: "Repeat",
        text: "Every 4–6 h only while signs of raised ICP persist and the patient is not dehydrated. Stop if serum osmolality exceeds 320 mOsm/kg. If osmolality cannot be measured, stop when the patient becomes hypovolaemic or hypotensive, urine output falls, or sodium rises steeply."
      },
      {
        label: "Before you start",
        text: "Head of bed up 30°, head midline, airway protected, oxygen to SpO2 ≥ 94 %, systolic BP kept above 100 mmHg in head injury, treat seizures, fever and hypoglycaemia. Catheterise the bladder — mannitol produces a large diuresis."
      },
      {
        label: "Replace the urine",
        text: "Match urine output with 0.9 % saline if the patient is not overloaded. Hypovolaemia and low blood pressure after mannitol reduce brain perfusion and undo the benefit."
      }
    ]
  },
  improvised: [
    {
      title: "Gravity infusion over 20–30 min with a macro set",
      best_for: "Adults and larger children when no pump is available.",
      requires: [
        "iv",
        "macro_set"
      ],
      steps: [
        "Inspect the bottle against the light. If you see crystals, warm it (below) until completely clear.",
        "Calculate the volume: dose (g) ÷ 0.2 = mL of 20 %. Example 70 kg at 0.5 g/kg: 35 g ÷ 0.2 = 175 mL.",
        "Remove the excess from a 250 mL bottle (or mark the target level with a pen) so that only the dose can run.",
        "Use a set with an in-line filter if you have one. A blood giving set works as an improvised filter — its 170–200 micron screen catches crystals.",
        "Drops per minute = mL × drop factor ÷ minutes. 175 mL over 30 min: 20 drops/mL set → 117 drops/min (29 per 15 s); 15 drops/mL set → 88 drops/min (22 per 15 s).",
        "Over 20 min the rate is too fast to count (175 drops/min with a 20-drop set): open the clamp and check the level instead — about 45 mL should run every 5 min.",
        "Flush the line with 0.9 % saline afterwards; do not leave the remainder hanging."
      ],
      monitor: [
        "Pupils, GCS, pulse and BP every 15 min during and for 1 h after",
        "Urine output hourly",
        "Sodium and osmolality before each repeat dose where available"
      ],
      cautions: [
        "Run it through its own line — never with blood in the same set.",
        "Extravasation causes tissue damage; use a good vein and check the site."
      ]
    },
    {
      title: "Burette dose for small children",
      best_for: "Children under about 20 kg, where 2.5 mL/kg is too small to control from a bottle.",
      requires: [
        "iv",
        "burette"
      ],
      steps: [
        "Run exactly the calculated volume into the burette (10 kg at 0.5 g/kg: 5 g = 25 mL of 20 %). Close the upper clamp so no more can enter.",
        "With a 60 drops/mL burette: drops/min = mL × 60 ÷ minutes = mL × 3 over 20 min. 25 mL → 75 drops/min; 3 kg (7.5 mL) → about 22 drops/min.",
        "When the burette is empty, add 10 mL 0.9 % saline to flush the dose through the chamber and tubing."
      ],
      monitor: [
        "Pupils, conscious level, heart rate and BP every 15 min",
        "Urine output (weigh nappies: 1 g = 1 mL)"
      ],
      cautions: [
        "No burette: give by slow push with a 50 mL syringe over 20 min by the clock (for 25 mL, about 6 mL every 5 min)."
      ]
    },
    {
      title: "Redissolving crystals",
      best_for: "Cold stores and cold nights — 20 % mannitol crystallises below room temperature.",
      requires: [],
      steps: [
        "Stand the closed bottle or bag in a bowl of warm water (hot to the hand but not boiling) and shake it gently every few minutes until no crystals remain.",
        "Let it cool to about body temperature before giving. Check again against the light.",
        "If crystals do not dissolve completely, do not use that bottle."
      ],
      monitor: [
        "Visual check against light before connecting and again halfway through"
      ],
      cautions: [
        "Never heat in a microwave or directly on a stove.",
        "Keep stock in a warm (not hot) place so it is ready in an emergency."
      ]
    }
  ],
  paediatric: [
    "0.25–1 g/kg IV over 20 min (Nelson); 0.5 g/kg (2.5 mL/kg of 20 %) is a common starting dose.",
    "DKA cerebral oedema: raise the head, reduce the IV fluid rate, mannitol 0.5–1 g/kg over 10–15 min, or 3 % saline 2.5–5 mL/kg over 10–15 min if mannitol is not available (ISPAD).",
    "Cerebral malaria: mannitol (and steroids) have not improved outcomes in children and are not recommended (Nelson, WHO)."
  ],
  cautions: [
    "Hypovolaemia and hypotension: mannitol is a diuretic — resuscitate first; in a shocked or bleeding head-injured patient hypertonic saline is the better osmotic agent.",
    "Contraindicated in anuria, pulmonary oedema or severe heart failure (the first effect is to expand plasma volume), and active intracranial bleeding outside a surgical plan.",
    "Repeated doses cause hypernatraemia or hyponatraemia, hyperkalaemia, dehydration and acute kidney injury, especially above osmolality 320.",
    "Not for cerebral malaria or routine meningitis care; do not give it to patients who are not herniating 'just in case'.",
    "Rebound brain swelling can occur when repeated doses are stopped abruptly after days of use."
  ],
  calc: {
    type: "weight",
    dosePerKg: 0.5,
    doseUnit: "g",
    conc: 0.2,
    concUnit: "g/mL",
    maxDose: 100,
    label: "Mannitol 0.5 g/kg as 20 % (0.2 g/mL) = 2.5 mL/kg over 20–30 min"
  },
  sources: [
    {
      name: "Brain Trauma Foundation. Guidelines for the Management of Severe Traumatic Brain Injury, 4th ed. 2016"
    },
    {
      name: "WHO. Surgical Care at the District Hospital, 2003 (head injury)"
    },
    {
      name: "ISPAD Clinical Practice Consensus Guidelines 2022 — diabetic ketoacidosis (cerebral oedema)"
    },
    {
      name: "WHO Pocket Book of Hospital Care for Children, 2nd ed. 2013 (cerebral malaria: mannitol not recommended)"
    },
    {
      name: "Mannitol 20 % product information (crystallisation, filter, incompatibility with blood)"
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
      book: "nelson",
      text: "Head trauma: mannitol and hypertonic saline lower ICP; mannitol's diuresis can worsen hypovolaemia, so hypertonic saline may be more useful in severe head injury.",
      ref: "Nelson 22nd ed. 2024, ch. 80 Acute care of multiple trauma, p. 575"
    },
    {
      book: "nelson",
      text: "Cerebral oedema in DKA: raise the head of the bed, reduce IV fluids and give mannitol, typically 1 g/kg over 20 minutes.",
      ref: "Nelson 22nd ed. 2024, ch. 629 Diabetes mellitus, p. 3527"
    },
    {
      book: "nelson",
      text: "Cerebral malaria: brain swelling with raised ICP is the leading cause of death, but mannitol and corticosteroids have not improved outcomes.",
      ref: "Nelson 22nd ed. 2024, ch. 334 Malaria, p. 2179"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "hypertonic-saline",
  name: "Hypertonic saline 3 %",
  aka: [
    "3 % sodium chloride",
    "3 % NaCl",
    "hypertonic sodium chloride",
    "HTS"
  ],
  cls: "Hypertonic electrolyte solution (osmotherapy)",
  cat: "electrolyte",
  wards: [
    "emergency",
    "icu",
    "medical",
    "paediatric",
    "surgical"
  ],
  tags: [
    "hyponatraemia",
    "raised intracranial pressure",
    "cerebral oedema",
    "head injury",
    "seizure",
    "sodium"
  ],
  presentation: [
    "3 % sodium chloride (30 g/L = 513 mmol/L, about 1027 mOsm/L) in 500 mL bags where stocked.",
    "Often NOT stocked — made on the ward from 0.9 % saline plus concentrated NaCl ampoules (20 % = 3.4 mmol/mL, 10 % = 1.7 mmol/mL; 23.4 % = 4 mmol/mL in some countries).",
    "HIGH-ALERT: concentrated NaCl ampoules have killed patients given undiluted. Store them separately from 0.9 % saline and water for injection."
  ],
  indications: [
    "Severe symptomatic hyponatraemia: seizures, coma, severe confusion or vomiting with a low sodium",
    "Raised intracranial pressure with signs of herniation, especially in a hypotensive or hypovolaemic patient (preferred to mannitol there)",
    "DKA cerebral oedema when mannitol is unavailable"
  ],
  standard: {
    summary: "Small boluses over 10–20 minutes, repeated against the response and the sodium. Bolus volumes are small enough to give by syringe or burette.",
    items: [
      {
        label: "Symptomatic hyponatraemia — adult",
        text: "100 mL of 3 % over 10–15 min (Harrison). Recheck the patient; repeat up to 2 more times, 10 min apart, until symptoms stop or sodium has risen by 4–6 mmol/L. Then stop the hypertonic saline."
      },
      {
        label: "Symptomatic hyponatraemia — child",
        text: "2 mL/kg (maximum 100 mL) over 10–15 min, repeated if symptoms persist. Each 1 mL/kg raises sodium by about 1 mmol/L; symptoms usually settle after a total of 4–6 mL/kg (Nelson)."
      },
      {
        label: "Correction limits (osmotic demyelination)",
        text: "Aim for a rise of 4–6 mmol/L in the first hours, then no more. Never more than 10 mmol/L in 24 h or 18 mmol/L in 48 h (Nelson); in chronic hyponatraemia or high-risk patients (alcohol use, malnutrition, hypokalaemia, liver disease) keep to under 8 mmol/L in 24 h (Harrison: under 6–8). Check sodium every 2–4 h."
      },
      {
        label: "Raised ICP",
        text: "2–5 mL/kg of 3 % over 10–20 min (Nelson), repeated as needed for signs of herniation, avoiding sustained sodium above 160 mmol/L (paediatric TBI guideline) and osmolality above 320. Adults: use the same weight-based dose."
      },
      {
        label: "Overcorrection",
        text: "If sodium rises too fast, stop all sodium-containing fluid and seek specialist advice — re-lowering with 5 % glucose and desmopressin is a specialist treatment."
      }
    ]
  },
  improvised: [
    {
      title: "Making 3 % saline when it is not stocked (show your arithmetic)",
      best_for: "Every hospital that has 0.9 % saline and 20 % or 10 % NaCl ampoules but no commercial 3 %.",
      requires: [
        "iv"
      ],
      steps: [
        "Principle: grams of salt in = grams of salt wanted. 3 % = 3 g per 100 mL. 0.9 % = 0.9 g/100 mL, 10 % = 10 g/100 mL, 20 % = 20 g/100 mL.",
        "500 mL of 3 % from 20 % NaCl: you need 15 g. If x mL of 20 % replaces x mL of the 0.9 % bag: 0.20x + 0.009(500 − x) = 15 → 0.191x = 10.5 → x = 55 mL. Remove 55 mL from a 500 mL bag of 0.9 % saline (leaving 445 mL) and add 55 mL of 20 % NaCl. Check: 11 g + 4.0 g = 15 g in 500 mL = 3.0 %.",
        "500 mL of 3 % from 10 % NaCl: 0.10x + 0.009(500 − x) = 15 → 0.091x = 10.5 → x = 115 mL. Remove 115 mL from the 500 mL bag (leaving 385 mL) and add 115 mL of 10 % NaCl. Check: 11.5 g + 3.5 g = 15 g = 3.0 %.",
        "100 mL of 3 % (paediatric): 20 % → remove 11 mL from a 100 mL 0.9 % bag, add 11 mL of 20 % (2.2 g + 0.8 g = 3.0 g). 10 % → remove 23 mL, add 23 mL of 10 % (2.3 g + 0.7 g = 3.0 g).",
        "50 mL syringe of 3 %: 5.5 mL of 20 % + 44.5 mL of 0.9 % saline (1.1 g + 0.4 g = 1.5 g in 50 mL). Or 11.5 mL of 10 % + 38.5 mL of 0.9 %.",
        "23.4 % ampoules: 47 mL of 23.4 % replacing 47 mL of a 500 mL 0.9 % bag.",
        "If you add the concentrate without removing saline first, the bag is weaker (55 mL of 20 % into a full 500 mL bag = about 2.8 %). Bags are also overfilled by a few percent, so home-made 3 % is usually slightly under strength — that errs on the safe side.",
        "Mix by inverting 10 times, off the drip stand. Two people check the calculation and the ampoule strength. Label in red: '3 % SALINE — HYPERTONIC', date, time, initials. Discard after 24 h."
      ],
      monitor: [
        "Second-person check of ampoule strength, volumes and label before hanging"
      ],
      cautions: [
        "Concentrated NaCl is 7–26 times stronger than 0.9 % — never give it undiluted, never mistake it for water for injection when reconstituting antibiotics.",
        "Make only what you need; do not leave home-made 3 % hanging unlabelled."
      ]
    },
    {
      title: "Giving a bolus without a pump",
      best_for: "Seizing hyponatraemic patient or herniating head injury.",
      requires: [
        "iv",
        "burette"
      ],
      steps: [
        "Child: draw the bolus (2 mL/kg; 10 kg = 20 mL) into a 20 or 50 mL syringe and push it over 10–15 min by the clock — split it into equal parts, e.g. 20 mL over 10 min = 2 mL every minute. Or run it from a burette: with a 60-drop set, drops/min = mL × 60 ÷ minutes (20 mL over 10 min = 120 drops/min; over 15 min = 80 drops/min).",
        "Adult: 100 mL in a burette or 100 mL bag. Over 15 min with a 20 drops/mL set = 133 drops/min (too fast to count — check the level: about 33 mL every 5 min); with a 60-drop burette over 20 min = 300 drops/min, so use the level method.",
        "Flush with a few mL of 0.9 % saline. Reassess 10 min after each bolus before deciding on the next."
      ],
      monitor: [
        "Seizure activity, GCS, pupils after each bolus",
        "Sodium 2–4-hourly (at least before any repeat after the first hour)",
        "Urine output — a sudden large dilute diuresis means sodium may overshoot"
      ],
      cautions: [
        "Do not run 3 % as a continuous infusion without a pump and 2–4-hourly sodium results; if you cannot measure sodium, give boluses only for life-threatening symptoms and refer."
      ]
    },
    {
      title: "Peripheral vein use",
      best_for: "No central line — which is almost everywhere this app is used.",
      requires: [
        "iv"
      ],
      steps: [
        "3 % saline (about 1000 mOsm/L) may be given through a peripheral cannula for bolus doses: choose the largest vein you can find (antecubital or forearm), not the back of the hand, foot or scalp if avoidable.",
        "Check that the cannula flushes freely and that there is no swelling before you start.",
        "Watch the site throughout; stop at once if there is pain, swelling or blanching, and resite in another limb."
      ],
      monitor: [
        "Cannula site before, during and after each bolus"
      ],
      cautions: [
        "Extravasation causes skin necrosis, particularly in infants.",
        "Never use 10 %, 20 % or 23.4 % NaCl in a peripheral vein."
      ]
    }
  ],
  paediatric: [
    "Symptomatic hyponatraemia: 2 mL/kg (max 100 mL) of 3 % over 10–15 min, repeat until symptoms stop; usually 4–6 mL/kg in total. 1 mL/kg raises sodium by about 1 mmol/L.",
    "Raised ICP: 2–5 mL/kg over 10–20 min (Nelson).",
    "The commonest cause of acute hyponatraemia in hospitalised children is hypotonic IV fluid (e.g. 0.18 % or 0.45 % saline with glucose): stop it and use isotonic fluid."
  ],
  cautions: [
    "Osmotic demyelination syndrome from over-rapid correction presents days later with dysarthria, swallowing difficulty, quadriparesis and death — respect the 24 h limits even when the patient looks better.",
    "Fluid overload and pulmonary oedema in heart failure or renal failure.",
    "Hypernatraemia and hyperchloraemic acidosis with repeated doses; hyperkalaemia shift.",
    "Asymptomatic or mildly symptomatic chronic hyponatraemia does not need hypertonic saline — treat the cause (stop thiazides and hypotonic fluids, fluid restriction for SIADH, isotonic saline for hypovolaemia)."
  ],
  calc: {
    type: "weight",
    dosePerKg: 2,
    doseUnit: "mL",
    conc: 1,
    concUnit: "mL/mL",
    maxDose: 100,
    label: "3 % saline bolus 2 mL/kg (max 100 mL) over 10–20 min; ICP 2–5 mL/kg"
  },
  sources: [
    {
      name: "Spasovski G et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia (ESE/ESICM/ERBP). Eur J Endocrinol 2014;170:G1–G47"
    },
    {
      name: "Verbalis JG et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations. Am J Med 2013;126:S1–S42"
    },
    {
      name: "Kochanek PM et al. Guidelines for the Management of Pediatric Severe Traumatic Brain Injury, 3rd ed. Pediatr Crit Care Med 2019"
    },
    {
      name: "Brain Trauma Foundation. Guidelines for the Management of Severe TBI, 4th ed. 2016"
    },
    {
      name: "ISMP high-alert medications list (concentrated sodium chloride)"
    }
  ],
  textbook: [
    {
      book: "harrison",
      text: "Acute symptomatic hyponatraemia: 3 % saline (513 mmol/L) to raise sodium by 1–2 mmol/L per hour to a total of 4–6 mmol/L; a 100 mL bolus works better than an infusion. Check sodium every 2–4 h — the rise is unpredictable.",
      ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 351"
    },
    {
      book: "harrison",
      text: "Chronic hyponatraemia: correct by less than 6–8 mmol/L in the first 24 h and less than 6 mmol/L in each following 24 h to avoid osmotic demyelination; lower targets in alcoholism or hypokalaemia.",
      ref: "Harrison 22nd ed. 2025, ch. 56, p. 351"
    },
    {
      book: "harrison",
      text: "SIAD with severe neurological symptoms: 100 mL of 3 % NaCl over about 15 minutes, aiming for a 4–6 mmol/L rise; reassess and repeat if no clinical response.",
      ref: "Harrison 22nd ed. 2025, ch. 393 Disorders of the Neurohypophysis, p. 3020"
    },
    {
      book: "nelson",
      text: "Each 1 mL/kg of 3 % NaCl raises serum sodium by about 1 mmol/L; a symptomatic child often improves after 4–6 mL/kg. Monitor pulse oximetry and correct hypoxia, which worsens cerebral oedema.",
      ref: "Nelson 22nd ed. 2024, ch. 73 Electrolyte and acid-base disorders, p. 494"
    },
    {
      book: "nelson",
      text: "Osmotic demyelination is commoner when chronic hyponatraemia is corrected; avoid raising sodium by more than 10 mmol/L in 24 h or 18 mmol/L in 48 h.",
      ref: "Nelson 22nd ed. 2024, ch. 73, p. 494"
    },
    {
      book: "nelson",
      text: "Raised ICP: 3 % saline 2–5 mL/kg over 10–20 minutes for ICP spikes or at fixed 4–6-hourly intervals, or 0.1–1 mL/kg/h continuously; avoid osmolality above 320.",
      ref: "Nelson 22nd ed. 2024, ch. 82, p. 586"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "arv-prophylaxis",
  name: "HIV prophylaxis: post-exposure (PEP) and infant prophylaxis",
  aka: [
    "PEP",
    "post-exposure prophylaxis",
    "TLD",
    "TDF/3TC/DTG",
    "nevirapine",
    "NVP",
    "zidovudine",
    "AZT",
    "ZDV",
    "PMTCT",
    "HIV-exposed infant"
  ],
  cls: "Antiretrovirals (NRTI backbone + integrase inhibitor; NNRTI/NRTI for infants)",
  cat: "infection",
  wards: [
    "emergency",
    "maternity",
    "neonatal",
    "paediatric",
    "medical",
    "outpatient"
  ],
  tags: [
    "HIV",
    "needlestick",
    "sexual assault",
    "occupational exposure",
    "PMTCT",
    "HIV-exposed newborn",
    "mother-to-child transmission"
  ],
  presentation: [
    "TLD fixed-dose tablet: tenofovir disoproxil fumarate 300 mg + lamivudine 300 mg + dolutegravir 50 mg (one tablet once daily).",
    "TDF/3TC 300/300 mg tablets; dolutegravir 50 mg tablets; paediatric dolutegravir 10 mg dispersible tablets; abacavir/lamivudine 120/60 mg dispersible tablets.",
    "Nevirapine oral suspension 10 mg/mL (also 50 mg dispersible tablets). Zidovudine oral solution 10 mg/mL (also 60 mg dispersible tablets).",
    "Store below 30 °C. PEP starter packs should be kept in the emergency department, labour ward and theatre so that PEP can start at any hour."
  ],
  indications: [
    "PEP: percutaneous injury, mucous-membrane or broken-skin exposure to blood, visibly bloody fluid, semen, vaginal secretions or CSF/pleural/peritoneal/amniotic fluid from a person who has HIV or whose status is unknown — within 72 h",
    "PEP after sexual assault or other high-risk sexual exposure — within 72 h",
    "Infant prophylaxis for every HIV-exposed newborn, starting as soon as possible after birth"
  ],
  standard: {
    summary: "Oral tablets or syrup — no infusion needed. The only thing that makes PEP fail is delay or stopping early. Doses and durations must be confirmed against the current Ethiopian national HIV guideline.",
    items: [
      {
        label: "PEP — adults and adolescents (WHO)",
        text: "TDF + 3TC (or FTC) + DTG: one TLD tablet once daily for 28 days. Start as soon as possible — ideally within hours, and no later than 72 h after exposure. Give the first dose before test results come back. Alternatives if DTG cannot be used: TDF/3TC with atazanavir/ritonavir, darunavir/ritonavir, lopinavir/ritonavir or raltegravir, per national guideline."
      },
      {
        label: "PEP — children",
        text: "Weight 30 kg or more: adult regimen. Under 30 kg: use the preferred paediatric first-line regimen of the national guideline for 28 days, dosed by weight band — usually ABC/3TC (120/60 mg dispersible) + DTG 10 mg dispersible (WHO bands; DTG from 4 weeks of age: 3–5.9 kg 1 ABC/3TC + DTG 5 mg; 6–9.9 kg 1.5 + 15 mg; 10–13.9 kg 2 + 20 mg; 14–19.9 kg 2.5 + 25 mg; 20–24.9 kg 3 + DTG 50 mg film-coated). Confirm with the paediatric HIV dosing chart; AZT/3TC is an acceptable backbone."
      },
      {
        label: "At the first visit",
        text: "First aid (wash with soap and water; irrigate eyes/mouth with water or saline; do not squeeze or scrub). Assess the exposure and the source (rapid HIV test with consent, HBsAg). Baseline HIV test of the exposed person, pregnancy test, HBsAg or vaccination history, creatinine if available. After sexual assault also: emergency contraception, presumptive STI treatment per national protocol, tetanus, and psychological support."
      },
      {
        label: "Follow-up",
        text: "Adherence check and side effects at 3–7 days; complete 28 days; repeat HIV test at 4–6 weeks and 3 months (national protocol). If the baseline test is positive, do not stop — refer the same day for lifelong ART (TLD is also first-line treatment). Start hepatitis B vaccination if not immune."
      },
      {
        label: "HIV-exposed newborn — low risk (WHO)",
        text: "Mother on ART for more than 4 weeks before delivery with a suppressed viral load: nevirapine once daily for 6 weeks (breastfeeding or not; some programmes use 4–6 weeks for formula-fed infants)."
      },
      {
        label: "HIV-exposed newborn — high risk (WHO)",
        text: "Mother diagnosed in labour or after birth, on ART for less than 4 weeks before delivery, or viral load over 1000 copies/mL in the last 4 weeks before delivery (or unknown): zidovudine twice daily + nevirapine once daily for the first 6 weeks, then continue for a further 6 weeks (nevirapine alone, or both) if breastfeeding — 12 weeks in total. Confirm the exact regimen with the Ethiopian national PMTCT guideline."
      },
      {
        label: "Infant doses (WHO weight bands)",
        text: "Nevirapine 10 mg/mL, once daily — birth to 6 weeks: birth weight 2.0–2.49 kg 10 mg (1 mL); 2.5 kg or more 15 mg (1.5 mL). 6–12 weeks: 20 mg (2 mL). Zidovudine 10 mg/mL, twice daily — birth to 6 weeks: 2.0–2.49 kg 10 mg (1 mL); 2.5 kg or more 15 mg (1.5 mL). 6–12 weeks: 60 mg (6 mL). Under 2 kg: nevirapine 2 mg/kg once daily and zidovudine 2 mg/kg twice daily — seek specialist advice for preterm infants."
      },
      {
        label: "Every HIV-exposed infant also needs",
        text: "Cotrimoxazole prophylaxis from 6 weeks, early infant diagnosis (DNA PCR at 6 weeks or earlier per national algorithm, and after breastfeeding ends), exclusive breastfeeding for 6 months with the mother on ART, and routine immunisation including BCG."
      }
    ]
  },
  improvised: [
    {
      title: "Starting PEP at night or at a health centre without a starter pack",
      best_for: "Needlestick in theatre or labour ward at 2 a.m., or a survivor of sexual assault arriving at a health centre.",
      requires: [
        "oral"
      ],
      steps: [
        "Do first aid immediately: wash the wound with soap and running water; irrigate splashed eyes or mouth with clean water or saline.",
        "Take a TLD tablet from the ART clinic stock or any patient-dispensing stock that the facility's rules allow for emergency use. The first dose should not wait for the pharmacy to open or for test results.",
        "If TLD is not available but TDF/3TC is, start TDF/3TC now and add DTG (or the national alternative third drug) as soon as it can be obtained — two drugs today are better than three drugs after 72 h.",
        "Write the time of exposure and the time of the first dose on the card. Arrange collection of the remaining 27 days the next working day.",
        "Do not refuse PEP because the source cannot be tested; test the source later with consent and stop PEP only if the source is confirmed HIV-negative and not in the window period."
      ],
      monitor: [
        "Adherence and side effects (nausea, headache, insomnia) at 3–7 days",
        "Creatinine where available if kidney disease is suspected"
      ],
      cautions: [
        "Dolutegravir must be taken 2 h before or 6 h after antacids, iron, calcium or zinc supplements (or with food if taken together with iron/calcium).",
        "If the person is taking rifampicin, DTG must be given twice daily (50 mg twice daily).",
        "Beyond 72 h, PEP is not recommended; offer testing, follow-up and prevention counselling instead."
      ]
    },
    {
      title: "Measuring infant doses without oral syringes",
      best_for: "HIV-exposed newborn where only syrup bottles or dispersible tablets are available.",
      requires: [
        "oral",
        "syringe_1ml"
      ],
      steps: [
        "Use a 1 mL or 2 mL syringe without the needle to measure syrup exactly (1 mL = 10 mg for both nevirapine and zidovudine 10 mg/mL). Never use a household spoon.",
        "No nevirapine syrup: disperse one nevirapine 50 mg dispersible tablet in 5 mL of clean water = 10 mg/mL; stir, draw the dose immediately and discard the rest. Confirm this use with the pharmacist and national guideline.",
        "Zidovudine 60 mg dispersible tablet for the 6–12 week dose (60 mg twice daily): disperse one tablet in a little clean water and give it all.",
        "Teach the mother with her own syringe, mark the dose level on the syringe barrel with tape or a pen, and ask her to show you before discharge."
      ],
      monitor: [
        "Mother demonstrates the dose correctly",
        "Rash or jaundice in the infant on nevirapine"
      ],
      cautions: [
        "Give the first dose before the mother and baby leave the delivery room or postnatal ward.",
        "Weight bands change at 6 weeks — review the dose at the immunisation visit."
      ]
    },
    {
      title: "Mother first tested positive in labour or after delivery",
      best_for: "Labour ward where the maternal status was unknown and a rapid test is positive.",
      requires: [
        "oral"
      ],
      steps: [
        "Treat the infant as HIV-exposed at high risk: start zidovudine + nevirapine as soon as possible after birth (ideally within 6 h; do not wait for confirmatory tests).",
        "Do not stop breastfeeding; start the mother on ART (TLD) the same day or as soon as the national algorithm confirms the diagnosis.",
        "Continue dual prophylaxis for 6 weeks, then per national guideline for a further 6 weeks while breastfeeding.",
        "Link mother and baby to the ART/PMTCT clinic before discharge, with a written appointment."
      ],
      monitor: [
        "Maternal viral load after starting ART; infant DNA PCR per algorithm"
      ],
      cautions: [
        "If the mother's confirmatory test is negative, stop infant prophylaxis per national algorithm."
      ]
    }
  ],
  paediatric: [
    "Infant nevirapine (10 mg/mL) once daily: birth–6 weeks 1 mL (2.0–2.49 kg) or 1.5 mL (≥ 2.5 kg); 6–12 weeks 2 mL.",
    "Infant zidovudine (10 mg/mL) twice daily: birth–6 weeks 1 mL (2.0–2.49 kg) or 1.5 mL (≥ 2.5 kg); 6–12 weeks 6 mL.",
    "Children needing PEP after sexual abuse: 28 days of a weight-banded paediatric regimen; involve child-protection services."
  ],
  cautions: [
    "Local protocol confirmation is essential: WHO and Ethiopian national regimens are periodically updated; check the current national consolidated HIV guideline.",
    "TDF: avoid or adjust in significant kidney impairment (creatinine clearance under 50 mL/min) — seek advice.",
    "Nevirapine in infants: rash or jaundice — review the same day.",
    "Zidovudine: anaemia in infants, especially preterm or already anaemic; check haemoglobin if pale.",
    "Hepatitis B: TDF and 3TC also treat hepatitis B — stopping them after 28 days in an HBsAg-positive person can cause a hepatitis flare; refer."
  ],
  sources: [
    {
      name: "WHO. Guidelines for HIV post-exposure prophylaxis. Geneva, 2024",
      url: "https://www.who.int/publications/i/item/9789240095137"
    },
    {
      name: "WHO. Consolidated guidelines on HIV prevention, testing, treatment, service delivery and monitoring. Geneva, 2021 (infant prophylaxis, paediatric dosing annex)"
    },
    {
      name: "Federal Ministry of Health Ethiopia. National Consolidated Guidelines for Comprehensive HIV Prevention, Care and Treatment (current edition) — confirm regimens and weight bands"
    },
    {
      name: "MSF Clinical Guidelines — post-exposure prophylaxis and sexual violence"
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
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "tb-rhze",
  name: "First-line TB treatment (RHZE / RH fixed-dose combinations)",
  aka: [
    "RHZE",
    "HRZE",
    "2RHZE/4RH",
    "rifampicin",
    "isoniazid",
    "pyrazinamide",
    "ethambutol",
    "FDC",
    "anti-TB drugs"
  ],
  cls: "Antimycobacterial combination",
  cat: "infection",
  wards: [
    "medical",
    "paediatric",
    "outpatient",
    "emergency",
    "maternity"
  ],
  tags: [
    "tuberculosis",
    "TB",
    "TB meningitis",
    "pulmonary TB",
    "extrapulmonary TB",
    "DOT"
  ],
  presentation: [
    "Adult intensive phase: RHZE 150/75/400/275 mg tablet (rifampicin/isoniazid/pyrazinamide/ethambutol).",
    "Adult continuation phase: RH 150/75 mg tablet.",
    "Child dispersible: RHZ 75/50/150 mg and RH 75/50 mg; ethambutol 100 mg dispersible.",
    "Pyridoxine (vitamin B6) 25 mg or 50 mg tablets.",
    "Store in the original blister below 30 °C, away from humidity."
  ],
  indications: [
    "Drug-susceptible pulmonary and extrapulmonary TB in adults and children (confirmed or clinically diagnosed)",
    "TB with HIV (start ART within 2 weeks of TB treatment, later in TB meningitis per guideline)"
  ],
  standard: {
    summary: "Daily oral fixed-dose tablets dosed by weight band, taken under supervision for 6 months (2RHZE/4RH). Re-weigh monthly and move up a band as the patient gains weight.",
    items: [
      {
        label: "Regimen",
        text: "2 months RHZE daily (intensive phase), then 4 months RH daily (continuation phase). TB meningitis and bone/joint TB: 2 months RHZE then 10 months RH (12 months total). Children 3 months–16 years with non-severe TB: WHO allows 4 months (2HRZ(E)/2HR) — follow the national guideline."
      },
      {
        label: "Adult weight bands (WHO, RHZE 150/75/400/275 then RH 150/75)",
        text: "30–39 kg: 2 tablets daily; 40–54 kg: 3 tablets; 55–70 kg: 4 tablets; over 70 kg: 5 tablets. Same number of RH tablets in the continuation phase. Some WHO and national charts use 30–37 / 38–54 kg — use the band chart printed in your national TB guideline."
      },
      {
        label: "Per-kg doses (for checking or loose drugs)",
        text: "Adults: isoniazid 5 mg/kg (4–6, max 300 mg), rifampicin 10 mg/kg (8–12, max 600 mg), pyrazinamide 25 mg/kg (20–30), ethambutol 15 mg/kg (15–20). Children: isoniazid 10 mg/kg (7–15, max 300 mg), rifampicin 15 mg/kg (10–20, max 600 mg), pyrazinamide 35 mg/kg (30–40), ethambutol 20 mg/kg (15–25)."
      },
      {
        label: "Child dispersible FDC weight bands (WHO 2014)",
        text: "Intensive phase RHZ 75/50/150 plus ethambutol 100 mg: 4–7 kg 1 + 1; 8–11 kg 2 + 2; 12–15 kg 3 + 3; 16–24 kg 4 + 4; 25 kg or more: adult tablets and bands. Continuation RH 75/50: same number of tablets. Under 4 kg or newborns: specialist dosing. WHO updated its paediatric bands in 2022 — check the current national chart."
      },
      {
        label: "Pyridoxine",
        text: "Adults at risk of neuropathy (HIV, pregnancy or breastfeeding, alcohol use, malnutrition, diabetes, kidney failure): 10–25 mg daily (Harrison; many programmes give 25 mg to all people with HIV). Children with HIV or malnutrition, and breastfed infants of mothers on isoniazid: 5–10 mg daily."
      },
      {
        label: "Taking the tablets",
        text: "Once daily, all tablets together, ideally on an empty stomach (1 h before food). If nausea stops adherence, take with a light meal — taking the drugs matters more than perfect absorption. Rifampicin turns urine, sweat and tears orange-red; warn the patient."
      }
    ]
  },
  improvised: [
    {
      title: "Patient who cannot swallow: crushing and nasogastric route",
      best_for: "TB meningitis with reduced consciousness, very sick adults, or children who cannot take tablets.",
      requires: [
        "oral"
      ],
      steps: [
        "Adult FDC tablets can be crushed. Crush the day's tablets finely between two spoons or in a mortar, mix with 20–30 mL of clean water, and give by mouth or down the NG tube.",
        "Child dispersible tablets: drop them into a little clean water in a cup, swirl until dispersed, give it all by cup or spoon, then rinse the cup with a little more water and give that too.",
        "NG tube: flush with 20–30 mL water before and after (5–10 mL in small children). Stop feeds for 1 h before and after if possible; if feeds cannot be stopped, give the drugs anyway at the same time each day.",
        "Give the suspension immediately after preparing it — do not store it.",
        "Record each dose on the DOT card; missed doses in a sick inpatient are common."
      ],
      monitor: [
        "Conscious level and neurological signs in TB meningitis",
        "Tube position before each dose"
      ],
      cautions: [
        "There is no reliable injectable form of rifampicin, isoniazid, pyrazinamide and ethambutol in most Ethiopian hospitals. If the gut cannot be used at all (e.g. ileus), a temporary regimen of injectable streptomycin or amikacin plus an IV fluoroquinolone may be used on specialist advice only.",
        "Ethambutol eye toxicity cannot be tested in an unconscious patient — reassess vision as soon as possible."
      ]
    },
    {
      title: "Hepatotoxicity: stopping and reintroducing without a full lab",
      best_for: "Patient on RHZE who develops nausea, vomiting, abdominal pain or jaundice.",
      requires: [],
      steps: [
        "Ask about nausea, vomiting, right-upper-abdominal pain, dark urine and yellow eyes at EVERY visit and every ward round in the first 2 months.",
        "Stop ALL TB drugs if there is jaundice, or ALT over 3 × upper limit with symptoms, or over 5 × without symptoms (Harrison). If ALT cannot be measured, clinical jaundice with symptoms is enough to stop.",
        "Exclude other causes: viral hepatitis, alcohol, other hepatotoxic drugs (cotrimoxazole, fluconazole, nevirapine, traditional medicines), severe malaria.",
        "If the patient is very sick (TB meningitis, miliary or smear-positive disease), start a non-hepatotoxic holding regimen on specialist advice: ethambutol + streptomycin (or amikacin) + a fluoroquinolone.",
        "When symptoms resolve and ALT is under 2 × upper limit (or jaundice has cleared), restart one drug at a time: rifampicin (with ethambutol) first; after 3–7 days, isoniazid. If there is no recurrence, pyrazinamide is often not restarted and the total treatment is extended (e.g. 2RHE/7RH) per national guideline.",
        "If symptoms recur with a drug, stop that drug permanently and seek specialist advice for an alternative regimen."
      ],
      monitor: [
        "Symptoms daily while restarting",
        "ALT and bilirubin weekly during reintroduction where available"
      ],
      cautions: [
        "Baseline ALT and bilirubin for everyone where possible; monthly if there are hepatic risk factors (Harrison) — for example HIV, alcohol use, prior liver disease, hepatitis B or C, pregnancy and the postpartum period, and other hepatotoxic drugs.",
        "Avoid pyrazinamide in liver failure (Harrison)."
      ]
    },
    {
      title: "Out of the child FDC: using adult tablets or loose drugs",
      best_for: "Child dispersible FDCs are out of stock.",
      requires: [
        "oral"
      ],
      steps: [
        "Calculate each drug by the per-kg doses above. Example 12 kg child: rifampicin 15 mg/kg = 180 mg; isoniazid 10 mg/kg = 120 mg; pyrazinamide 35 mg/kg = 420 mg; ethambutol 20 mg/kg = 240 mg.",
        "Adult RHZE 150/75/400/275: one tablet gives rifampicin 150 mg, isoniazid 75 mg, pyrazinamide 400 mg, ethambutol 275 mg — for this 12 kg child, 1 tablet slightly under-doses isoniazid; add loose isoniazid (e.g. 50 mg, half of a 100 mg tablet) if available.",
        "Halves of scored tablets are acceptable; quarters of adult FDC tablets are inaccurate — prefer loose single drugs for children under about 8 kg.",
        "Write the plan clearly on the treatment card and re-check at each monthly weight."
      ],
      monitor: [
        "Monthly weight and dose adjustment"
      ],
      cautions: [
        "Get the child back onto dispersible FDCs as soon as stock returns — accuracy and adherence are better."
      ]
    }
  ],
  paediatric: [
    "Dispersible RHZ 75/50/150 (+ ethambutol 100 mg) by weight band: 4–7 kg 1; 8–11 kg 2; 12–15 kg 3; 16–24 kg 4; 25 kg or more adult bands.",
    "Child doses per kg are higher than adult doses (isoniazid 10, rifampicin 15, pyrazinamide 35, ethambutol 20 mg/kg).",
    "Pyridoxine 5–10 mg daily for children with HIV or malnutrition and for breastfed infants of mothers on isoniazid.",
    "Children with TB and HIV: daily treatment only, never intermittent; watch for interactions with antiretrovirals (Nelson)."
  ],
  cautions: [
    "Rifampicin interactions: reduces levels of dolutegravir (give DTG 50 mg twice daily), nevirapine, protease inhibitors, hormonal contraceptive pills and implants (use an IUD or DMPA injections), warfarin, fluconazole, methadone and many others.",
    "Isoniazid: peripheral neuropathy (prevent with pyridoxine); hepatitis.",
    "Pyrazinamide: hepatitis, joint pain, gout.",
    "Ethambutol: optic neuritis — ask about blurred vision and red–green colour vision; stop it if vision changes.",
    "Pregnancy: RHZE is safe; give pyridoxine. Newborns of mothers on rifampicin need vitamin K at birth.",
    "Treatment interruption and poor adherence cause relapse and drug resistance — trace patients who miss doses within days."
  ],
  sources: [
    {
      name: "WHO consolidated guidelines on tuberculosis. Module 4: Treatment — drug-susceptible tuberculosis treatment. Geneva, 2022"
    },
    {
      name: "WHO operational handbook on tuberculosis. Module 5: Management of tuberculosis in children and adolescents. Geneva, 2022"
    },
    {
      name: "WHO. Treatment of tuberculosis guidelines, 4th ed. 2010 (weight-band tables)"
    },
    {
      name: "WHO. Guidance for national tuberculosis programmes on the management of tuberculosis in children, 2nd ed. 2014"
    },
    {
      name: "Federal Ministry of Health Ethiopia. Guidelines for clinical and programmatic management of TB, TB/HIV, DR-TB and leprosy (current edition) — confirm weight bands"
    },
    {
      name: "ATS/CDC/IDSA. Treatment of drug-susceptible tuberculosis. Clin Infect Dis 2016;63:e147 (hepatotoxicity rechallenge)"
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
      text: "Severe liver disease: treat with ethambutol, streptomycin and possibly a fluoroquinolone; isoniazid and rifampicin only under close supervision; avoid pyrazinamide in liver failure.",
      ref: "Harrison 22nd ed. 2025, ch. 183, p. 1400"
    },
    {
      book: "harrison",
      text: "Hepatotoxicity: stop isoniazid, pyrazinamide and rifampicin if ALT is over 5 × ULN, or over 3 × ULN with symptoms; once enzymes normalise, reintroduce rifampicin and isoniazid one at a time; pyrazinamide often not restarted. Baseline ALT and bilirubin for all; monthly if risk factors.",
      ref: "Harrison 22nd ed. 2025, ch. 186 Antimycobacterial Agents, Table, p. 1420"
    },
    {
      book: "nelson",
      text: "Children: isoniazid hepatotoxicity in about 1 %; pyridoxine indicated for breastfed infants and their mothers, children on milk- or meat-poor diets, pregnant adolescents and children with symptomatic HIV.",
      ref: "Nelson 22nd ed. 2024, ch. 260 Principles of antimycobacterial therapy, p. 1830"
    },
    {
      book: "nelson",
      text: "Children with HIV and drug-susceptible TB: four drugs for 2 months then isoniazid and rifampicin; treatment should be daily, not intermittent, with close monitoring for adverse reactions and rifampicin–antiretroviral interactions.",
      ref: "Nelson 22nd ed. 2024, ch. 261 Tuberculosis, p. 1851"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "snake-antivenom",
  name: "Snake antivenom (polyvalent, African)",
  aka: [
    "antivenin",
    "antivenene",
    "snake venom antiserum",
    "polyvalent antivenom",
    "ASV"
  ],
  cls: "Equine or ovine immunoglobulin (F(ab')2 or IgG) against snake venoms",
  cat: "emergency",
  wards: [
    "emergency",
    "paediatric",
    "medical",
    "icu",
    "outpatient"
  ],
  tags: [
    "snakebite",
    "envenoming",
    "viper",
    "cobra",
    "mamba",
    "puff adder",
    "saw-scaled viper",
    "Echis",
    "Bitis",
    "Naja",
    "coagulopathy",
    "20WBCT"
  ],
  presentation: [
    "Vials of liquid or freeze-dried (lyophilised) antivenom, usually 10 mL per vial. Polyvalent products sold in Ethiopia and East Africa cover some or all of: saw-scaled/carpet vipers (Echis), puff adder (Bitis), cobras and spitting cobras (Naja) and mambas (Dendroaspis).",
    "Read the leaflet of the product you actually have: which snakes it covers, the starting dose in vials or mL, and storage. Doses differ several-fold between products.",
    "Liquid products usually need 2–8 °C; freeze-dried products are more heat-stable. Reconstitute freeze-dried vials with the diluent supplied by gentle swirling, not shaking."
  ],
  indications: [
    "Systemic envenoming: blood that fails the 20-minute whole blood clotting test (20WBCT), spontaneous bleeding (gums, old wounds, vomit, urine)",
    "Neurotoxic signs: ptosis, difficulty opening the eyes, swallowing or breathing, drooling, weak neck flexion",
    "Shock or hypotension, dark urine, falling urine output (acute kidney injury)",
    "Severe local envenoming: swelling spreading beyond more than half the bitten limb, rapid extension, extensive blistering or bruising, or swelling after a bite on a finger or toe"
  ],
  standard: {
    summary: "IV antivenom for systemic or severe local envenoming, given by slow push or diluted infusion over about 1 hour with adrenaline drawn up at the bedside. The dose is the same for children and adults — snakes inject the same amount of venom into a child.",
    items: [
      {
        label: "Dose",
        text: "The starting dose in the leaflet of your product — the SAME dose for a child as for an adult. Never reduce it by weight. Only the volume of diluent is reduced for small children."
      },
      {
        label: "Route",
        text: "IV only. Either slow IV push of reconstituted antivenom at no more than 2 mL/min, or diluted in 5–10 mL/kg of 0.9 % saline (or 5 % glucose) run over about 1 hour. Never IM, never into the bite site."
      },
      {
        label: "Premedication",
        text: "Skin or conjunctival test doses do not predict reactions and delay treatment — do not use them. Antihistamines and steroids as premedication have not been shown to prevent reactions. Some WHO guidance allows low-dose subcutaneous adrenaline (adult 0.25 mg of 1 mg/mL) before antivenom where reactions to the product are common — follow your national protocol."
      },
      {
        label: "Reaction",
        text: "Stop the infusion. Adrenaline 0.5 mg IM (0.5 mL of 1 mg/mL; child 0.01 mg/kg, max 0.5 mg) into the thigh at the first sign of urticaria, wheeze, hypotension or angio-oedema; repeat every 5–10 min if needed. Then chlorphenamine and hydrocortisone. When settled, restart the antivenom more slowly — the patient still needs it."
      },
      {
        label: "Repeat — haemotoxic (viper) bites",
        text: "Repeat the 20WBCT 6 hours after the dose. If the blood still does not clot, give the same starting dose again. Continue 6-hourly tests and doses until the blood clots. Give a repeat dose earlier if bleeding continues or worsens 1–2 h after the first dose."
      },
      {
        label: "Repeat — neurotoxic (cobra, mamba) bites",
        text: "If paralysis is not improving or is worsening 1–2 h after the dose, repeat the starting dose. Ventilate (bag-valve-mask or intubation) whenever breathing fails — antivenom does not reverse established paralysis quickly."
      },
      {
        label: "Supportive care",
        text: "Splint the limb, no tourniquet, no incision or suction. Tetanus toxoid. Paracetamol or morphine for pain (no NSAIDs or aspirin; no IM injections while blood is not clotting). Antibiotics only for signs of infection or after incision. Fluids for shock; blood products only after antivenom."
      }
    ]
  },
  improvised: [
    {
      title: "20-minute whole blood clotting test (20WBCT) — the improvised coagulation test",
      best_for: "Any facility without a laboratory. Decides whether to give antivenom for a viper bite and whether to repeat it.",
      requires: [],
      steps: [
        "Use a NEW, clean, DRY GLASS tube or bottle (not plastic, not washed with detergent — both can stop normal blood clotting and give a false result).",
        "Take 2 mL of venous blood with a fresh needle and put it in the tube.",
        "Leave it undisturbed at room temperature for exactly 20 minutes by the clock.",
        "Tip the tube once, gently, through 90°. If the blood is still liquid and runs, the test is abnormal = the blood is incoagulable = give antivenom.",
        "Validate a new batch of tubes by testing the blood of a healthy staff member — it must clot within 20 min.",
        "Repeat 6 hours after each antivenom dose, and every 6 h until the blood clots twice."
      ],
      monitor: [
        "Record test time and result on the chart each time"
      ],
      cautions: [
        "Do not shake, tip early or re-check repeatedly — this breaks up a forming clot.",
        "A clotting test can be normal early after a bite — venom effects can appear hours later. If a viper is possible, repeat the test during observation as your national protocol specifies."
      ]
    },
    {
      title: "Gravity infusion over 1 hour",
      best_for: "The usual method without a pump; allows a slow start while watching for reactions.",
      requires: [
        "iv",
        "macro_set"
      ],
      steps: [
        "Draw up adrenaline 1 mg/mL: 0.5 mL (adult) or 0.01 mL/kg (child, max 0.5 mL) in a labelled 1 mL syringe with an IM needle, and tape it to the drip stand.",
        "Reconstitute and add the full starting dose to 0.9 % saline, about 5–10 mL/kg (WHO): for an adult, a 500 mL bag is convenient; a 250 mL bag is acceptable. Label the bag.",
        "Drops/min = mL × drop factor ÷ 60. 250 mL over 60 min with a 20 drops/mL set = 83 drops/min (21 per 15 s). 500 mL with a 20-drop set = 167 drops/min — too fast to count, so check the level instead: 125 mL should run every 15 min.",
        "First 10–15 minutes: run at about a quarter of the final rate (about 20 drops/min for 250 mL with a 20-drop set) with a clinician at the bedside.",
        "No reaction after 15 min: increase to the full rate so that the whole dose is in by about 1 hour.",
        "Flush the line with saline at the end so the antivenom in the tubing is not wasted."
      ],
      monitor: [
        "Pulse, BP, respiratory rate, skin (urticaria) every 5–10 min for the first 30 min, then every 15 min",
        "Ptosis, swallowing, breathing (single breath count) hourly in neurotoxic bites",
        "Limb swelling (mark the edge with pen and time) and urine colour and volume"
      ],
      cautions: [
        "Antivenom runs through its own line — do not add other drugs to the bag."
      ]
    },
    {
      title: "Small child: burette or syringe push",
      best_for: "Children, in whom 5–10 mL/kg keeps the volume safe while the antivenom dose stays full.",
      requires: [
        "iv",
        "burette"
      ],
      steps: [
        "Full adult dose of antivenom — do not reduce it.",
        "Burette: add the antivenom and make up to 5–10 mL/kg with 0.9 % saline (10 kg child: 50–100 mL). With a 60 drops/mL burette, drops/min = mL per hour (100 mL over 1 h = 100 drops/min; 50 mL = 50 drops/min). Start at a quarter of that rate for 10–15 min.",
        "No burette: give the reconstituted antivenom by slow IV push at no more than 2 mL/min, e.g. 10 mL every 5 minutes by the clock, stopping at any sign of reaction."
      ],
      monitor: [
        "Same as above; also watch for fluid overload in small or malnourished children"
      ],
      cautions: [
        "Adrenaline 0.01 mg/kg IM (0.01 mL/kg of 1 mg/mL) drawn up before the first mL goes in."
      ]
    },
    {
      title: "Neurotoxic bite with no ventilator: neostigmine and hand ventilation",
      best_for: "Cobra bite with ptosis or weakness, while antivenom is given or when it is not available.",
      requires: [
        "iv",
        "im"
      ],
      steps: [
        "Give atropine 0.6 mg IV (child 0.02 mg/kg, minimum 0.1 mg), then neostigmine 0.02 mg/kg IV or IM (child 0.04 mg/kg) as a test (Harrison).",
        "If ptosis or breathing clearly improves within 30 min, continue neostigmine 0.5 mg (child 0.01 mg/kg) hourly with atropine as needed.",
        "If breathing fails, ventilate with a bag-valve-mask, taking turns with relatives or staff if necessary, for as long as it takes — paralysis from cobra venom is reversible and patients survive days of hand ventilation.",
        "Keep the airway clear: recovery position, suction of saliva."
      ],
      monitor: [
        "Single breath count, neck flexion, ability to swallow, SpO2 if available, every 30–60 min"
      ],
      cautions: [
        "Neostigmine is less useful after mamba bites (presynaptic toxins). It does not replace antivenom or ventilation."
      ]
    }
  ],
  paediatric: [
    "Same antivenom dose as adults — children often need more because a small body receives the same venom.",
    "Reduce only the diluent: 5–10 mL/kg.",
    "Adrenaline 0.01 mg/kg IM (max 0.5 mg) drawn up before starting.",
    "Children develop shock and bleeding faster; monitor every 15 min in the first hours."
  ],
  cautions: [
    "Reactions are common with many African antivenoms: early anaphylactic (usually within the first 1–3 hours), pyrogenic (fever, rigors — cool and give paracetamol), and late serum sickness about 1–2 weeks later (fever, rash, joint pain — prednisolone 1–2 mg/kg daily, Harrison).",
    "Previous antivenom or equine serum, and asthma or allergy, increase the risk of reaction — not a reason to withhold antivenom in real envenoming.",
    "A 'dry bite' needs no antivenom: observe at least 24 h with repeated 20WBCT before discharge.",
    "Spitting cobra venom in the eyes: irrigate immediately with large volumes of water; antivenom is not needed for the eye alone.",
    "Blood products and fresh plasma before antivenom feed the consumptive coagulopathy — give antivenom first (Harrison).",
    "Coagulopathy can return up to 2–3 weeks after the bite: warn the patient, avoid elective surgery.",
    "Fasciotomy for a swollen limb is almost never needed and must not be done while the blood is incoagulable."
  ],
  antidote: "Adrenaline 0.5 mg IM (child 0.01 mg/kg, max 0.5 mg) for antivenom anaphylaxis — draw it up before starting.",
  sources: [
    {
      name: "WHO Regional Office for Africa. Guidelines for the Prevention and Clinical Management of Snakebite in Africa. Brazzaville, 2010"
    },
    {
      name: "WHO Regional Office for South-East Asia. Guidelines for the Management of Snakebites, 2nd ed. 2016 (antivenom administration, 20WBCT, adrenaline)"
    },
    {
      name: "WHO. Snakebite envenoming: a strategy for prevention and control. Geneva, 2019"
    },
    {
      name: "MSF. Clinical Guidelines — snake bites and envenomations"
    },
    {
      name: "Product leaflet of the antivenom in stock (species covered, starting dose, storage)"
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
      text: "Indications: progressive local swelling (more than half the limb, extensive blistering or bruising) or any systemic envenoming; for neurotoxic elapids, the first sign of neurotoxicity. Antivenom does not reverse established renal failure or paralysis.",
      ref: "Harrison 22nd ed. 2025, ch. 471, p. 3719"
    },
    {
      book: "harrison",
      text: "Blood products are rarely needed; clotting factors usually recover within hours of adequate antivenom, and blood products given before antivenom fuel the consumptive coagulopathy. Serum sickness 1–2 weeks later: prednisone 1–2 mg/kg daily.",
      ref: "Harrison 22nd ed. 2025, ch. 471, p. 3721"
    },
    {
      book: "harrison",
      text: "Neurotoxic bites with ptosis: test dose of neostigmine 0.02 mg/kg (children 0.04 mg/kg) after atropine 0.6 mg (children 0.02 mg/kg, minimum 0.1 mg); if improved after 30 min continue neostigmine 0.5 mg (children 0.01 mg/kg) hourly. Not a substitute for antivenom or ventilation.",
      ref: "Harrison 22nd ed. 2025, ch. 471, Table 471-2, p. 3721"
    },
    {
      book: "harrison",
      text: "Coagulopathy can recur 2–3 weeks after the bite because venom outlasts antivenom; warn against surgery and trauma, and consider repeat antivenom for delayed bleeding.",
      ref: "Harrison 22nd ed. 2025, ch. 471, p. 3722"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "oxygen",
  name: "Oxygen",
  aka: [
    "O2",
    "medical oxygen",
    "oxygen concentrator",
    "bubble CPAP",
    "bCPAP"
  ],
  cls: "Medical gas",
  cat: "respiratory",
  wards: [
    "emergency",
    "neonatal",
    "paediatric",
    "medical",
    "surgical",
    "maternity",
    "icu"
  ],
  tags: [
    "hypoxaemia",
    "pneumonia",
    "SpO2",
    "pulse oximetry",
    "nasal prongs",
    "concentrator",
    "cylinder",
    "CPAP",
    "bronchiolitis",
    "respiratory distress"
  ],
  presentation: [
    "Oxygen concentrators: 5 L/min or 10 L/min, typically about 90 % oxygen or more up to the rated flow; need continuous mains power.",
    "Cylinders: stamped with water capacity in litres; content = water capacity × pressure (bar). A full 'J' size holds about 6800 L, an 'E' size about 680 L.",
    "Piped oxygen or PSA plant in some referral hospitals.",
    "Delivery devices: nasal prongs (neonatal, infant, paediatric, adult), 8 Fr nasal catheters, simple face masks, non-rebreather masks, flowmeters (including 0–2 L/min low-flow), bubble humidifiers, flow-splitter stands, pulse oximeters with neonatal and child probes."
  ],
  indications: [
    "SpO2 under 90 % (at altitudes up to about 2500 m)",
    "Emergency signs: obstructed or absent breathing, severe respiratory distress, central cyanosis, shock, coma or convulsions — target SpO2 94 % or more during resuscitation",
    "Clinical signs of hypoxaemia when no oximeter is available",
    "Neonatal resuscitation and preterm infants with respiratory distress (titrated — too much is harmful)",
    "Carbon monoxide poisoning (100 % by non-rebreather mask regardless of SpO2)"
  ],
  standard: {
    summary: "Oxygen is a drug: prescribe a target, a device and a flow; measure SpO2; wean when no longer needed. It is the one respiratory treatment most often missing, and the most often wasted.",
    items: [
      {
        label: "Targets (WHO)",
        text: "Give oxygen if SpO2 is under 90 %. Aim for 94 % or more in a child or adult with emergency signs during resuscitation, then 90 % or more once stable. Preterm infants: 88/90–95 % — avoid higher (retinopathy of prematurity). COPD with CO2 retention: 88–92 % (Harrison). Myocardial infarction or stroke: only if SpO2 is under 90 %."
      },
      {
        label: "Nasal prongs — flows (WHO, children)",
        text: "Neonate 0.5–1 L/min; infant 1–2 L/min; older child 1–4 L/min (WHO Pocket Book; the 2016 WHO manual allows higher flows in school-age children — check its table). Adults 1–6 L/min (FiO2 about 24–40 %). Prongs just inside the nostrils, tube taped to the cheeks. Nelson: flows under 5 L/min are usual in children; FiO2 (%) ≈ 21 + 3 × L/min in older children and adults, higher in small infants."
      },
      {
        label: "Nasal catheter (WHO)",
        text: "8 Fr catheter inserted the distance from the side of the nostril to the inner margin of the eyebrow. Flows are the same as or lower than for prongs (neonate 0.5 L/min, infant 1 L/min) — confirm older-child flows against the WHO manual. Check placement and clear mucus every 4–6 h."
      },
      {
        label: "Face masks (adults)",
        text: "Simple mask 5–10 L/min (never under 5 L/min — CO2 rebuilds in the mask). Non-rebreather mask with reservoir 10–15 L/min for shock, severe hypoxaemia, CO poisoning."
      },
      {
        label: "Without an oximeter — signs that mean oxygen (WHO)",
        text: "Central cyanosis; grunting with every breath; inability to drink or breastfeed because of breathlessness; severe lower chest wall indrawing; respiratory rate 70/min or more; head nodding; depressed consciousness. If in doubt and oxygen is available, give it."
      },
      {
        label: "Humidification",
        text: "Not needed for nasal prongs or nasal catheters at standard low flows. Needed for nasopharyngeal catheters, high flows and CPAP. Bubble humidifiers: fill with clean (ideally distilled or boiled-cooled) water to the line, change the water daily and clean the bottle — dirty humidifiers spread Pseudomonas."
      },
      {
        label: "Weaning",
        text: "Trial off oxygen at least once a day in a stable patient: stop it and recheck SpO2 after 10–15 min and again later; stop oxygen when SpO2 stays at 90 % or more in room air (WHO)."
      },
      {
        label: "Altitude",
        text: "At altitudes above about 2500 m, normal SpO2 is lower and WHO allows a lower threshold (about 87 %). Addis Ababa (about 2350 m) generally uses the standard 90 % — follow the national guideline for high-altitude facilities."
      }
    ]
  },
  improvised: [
    {
      title: "One concentrator for several children: flow splitter",
      best_for: "Paediatric ward with more hypoxaemic children than oxygen sources.",
      requires: [
        "oxygen"
      ],
      steps: [
        "Use a flowmeter stand (flow splitter) that divides the concentrator output into separate outlets, each with its OWN adjustable flowmeter (low-flow 0–2 L/min for infants).",
        "Add up the flows: the total must not exceed the concentrator's rated output (e.g. a 5 L/min concentrator: four infants at 1 L/min plus one at 0.5 L/min = 4.5 L/min).",
        "Prioritise by SpO2: children below 90 % first; recheck all children after any change in flows.",
        "A plain Y-connector without individual flowmeters gives unequal, unknown flows — gas takes the path of least resistance. Use it only as a last resort, and check SpO2 on every child it supplies.",
        "Keep a charged cylinder with a regulator next to the concentrator for power cuts."
      ],
      monitor: [
        "SpO2 of each child at least every 3–6 h and after any change",
        "Concentrator output with an oxygen analyser monthly where available; the alarm light"
      ],
      cautions: [
        "Concentrators give less than 90 % oxygen when run above their rated flow — splitting beyond the rated output lowers the concentration for everyone.",
        "Place the concentrator 30 cm from walls and curtains; clean the filter weekly."
      ]
    },
    {
      title: "Improvised bubble CPAP from nasal prongs and a water bottle",
      best_for: "Infants and young children with severe pneumonia, bronchiolitis or neonatal respiratory distress who remain distressed or hypoxaemic on standard oxygen, where there is no ventilator.",
      requires: [
        "oxygen"
      ],
      steps: [
        "Materials: short binasal prongs that fill the nostrils (or snug nasal prongs), oxygen tubing, a length of corrugated or wide tubing for the expiratory limb, a clean 1 L plastic bottle with centimetre marks, water, tape.",
        "Inspiratory limb: oxygen (ideally blended with air) from the flowmeter to the prongs. Expiratory limb: from the prong circuit to the bottle, with its end held under water.",
        "Depth of the tube end below the water surface = the CPAP pressure in cm H2O. Start at 5 cm H2O. Fix the tube with tape so the depth cannot change.",
        "Set the flow so that there is continuous bubbling through the whole breathing cycle — published low-cost designs typically use about 5 L/min for young children. If bubbling stops, there is a leak (usually an open mouth or loose prongs): close the mouth gently with a chin strap or dummy, reseat the prongs.",
        "Pass an NG tube and leave it open to air to vent swallowed gas.",
        "Nurse the child semi-upright; suction the nose gently when bubbling falls or distress increases."
      ],
      monitor: [
        "One-to-one observation for the first hours: bubbling, respiratory rate, indrawing, SpO2, heart rate every 15–30 min",
        "Nasal skin and septum for pressure injury every 2–4 h",
        "Abdominal distension"
      ],
      cautions: [
        "Do not use in apnoea or very weak respiratory effort, shock, pneumothorax, facial trauma, repeated vomiting or depressed consciousness — these children need referral for ventilation.",
        "Deteriorating on CPAP (rising respiratory rate, SpO2 falling, exhaustion, apnoea): stop and hand-ventilate; look for pneumothorax.",
        "Running bubble CPAP on 100 % oxygen from a concentrator in preterm infants risks retinopathy — blend with air where possible and keep SpO2 no higher than 95 %.",
        "A trial in Malawian district hospitals without doctors found HIGHER mortality with bubble CPAP than with standard oxygen in children with pneumonia (McCollum 2019), while a Bangladeshi trial with doctors found lower mortality (Chisti 2015) — use it only where staff can watch the child closely and escalate."
      ]
    },
    {
      title: "How long will this cylinder last?",
      best_for: "Transfers, power cuts, and planning overnight supply.",
      requires: [
        "oxygen"
      ],
      steps: [
        "Find the water capacity (in litres) stamped on the cylinder shoulder and read the pressure gauge in bar (psi ÷ 14.5 = bar; kPa ÷ 100 = bar).",
        "Litres available = water capacity × pressure. Keep a reserve: use (pressure − 20 bar) so that the cylinder is changed before it runs dry.",
        "Minutes = litres available ÷ total flow (L/min). Hours = minutes ÷ 60.",
        "Example: 47 L cylinder at 150 bar = 7050 L; minus reserve (47 × 20 = 940 L) = 6110 L. At 2 L/min for one child: 3055 min ≈ 51 h. At 15 L/min on a non-rebreather: 407 min ≈ 6.8 h.",
        "Example small cylinder: 10 L water capacity at 100 bar = 1000 L; minus reserve 200 L = 800 L. At 4 L/min: 200 min ≈ 3.3 h.",
        "If only the nominal content is known (e.g. 'J' ≈ 6800 L full), estimate litres = nominal content × (gauge pressure ÷ full pressure)."
      ],
      monitor: [
        "Gauge pressure every 2–4 h on a patient's cylinder; write the expected empty time on the chart"
      ],
      cautions: [
        "Chain cylinders upright. No oil, grease or hand cream on valves or regulators. No smoking, candles or open flames within 3 m.",
        "Open the valve slowly; a cylinder falling over can shear its valve."
      ]
    },
    {
      title: "No pulse oximeter: giving oxygen by clinical signs",
      best_for: "Health centre or ward with oxygen but no working oximeter.",
      requires: [
        "oxygen"
      ],
      steps: [
        "Give oxygen to any child with central cyanosis, grunting, inability to drink or breastfeed due to breathlessness, severe chest indrawing, respiratory rate 70/min or more, head nodding, or depressed consciousness (WHO signs).",
        "Use nasal prongs at the standard flow for age (infant 1–2 L/min) — within these flows oxygen is safe for all children except preterm newborns.",
        "Reassess every 3 h: continue oxygen until the signs have gone.",
        "Try the child off oxygen once the signs have settled; restart if cyanosis, grunting or fast breathing return within 15–30 min.",
        "Borrow or request an oximeter as a priority — clinical signs miss many hypoxaemic children."
      ],
      monitor: [
        "Colour of lips and tongue in daylight, respiratory rate, indrawing, feeding, consciousness every 3 h"
      ],
      cautions: [
        "Preterm babies: use the lowest flow that removes cyanosis (0.5 L/min) and seek an oximeter — unmonitored high oxygen causes blindness."
      ]
    }
  ],
  paediatric: [
    "Nasal prongs: neonate 0.5–1 L/min, infant 1–2 L/min, older child 1–4 L/min (WHO).",
    "Target SpO2 ≥ 94 % with emergency signs, ≥ 90 % once stable; preterm infants no higher than 95 %.",
    "Term newborn resuscitation: start ventilation with room air; add oxygen only if heart rate or SpO2 do not improve.",
    "Bubble CPAP only with close nursing observation (see method)."
  ],
  cautions: [
    "Oxygen supports combustion: fires and burns happen from smoking, candles and grease near oxygen.",
    "Hyperoxia harms preterm infants (retinopathy of prematurity, lung injury) and patients with CO2 retention (drowsiness, acidosis) — titrate to target, do not simply turn it up.",
    "Oxygen treats hypoxaemia, not breathlessness: a patient with normal SpO2 does not need it (Harrison, MI).",
    "Nasal catheters and prongs block with mucus — check and clear them every few hours.",
    "Never leave a patient on a cylinder without knowing when it will run out."
  ],
  sources: [
    {
      name: "WHO. Oxygen therapy for children: a manual for health workers. Geneva, 2016",
      url: "https://www.who.int/publications/i/item/9789241549554"
    },
    {
      name: "WHO. Pocket Book of Hospital Care for Children, 2nd ed. 2013 — section 10.7 Oxygen therapy"
    },
    {
      name: "WHO/UNICEF. Technical specifications for oxygen concentrators, 2015"
    },
    {
      name: "Chisti MJ et al. Bubble CPAP versus low-flow oxygen for severe pneumonia in children in Bangladesh. Lancet 2015;386:1057–65"
    },
    {
      name: "McCollum ED et al. Bubble CPAP versus oxygen for childhood pneumonia in Malawi. Lancet Glob Health 2019;7:e964–75"
    },
    {
      name: "BTS guideline for oxygen use in healthcare and emergency settings, 2017"
    }
  ],
  textbook: [
    {
      book: "nelson",
      text: "Nasal prongs deliver low-level oxygen, humidified by a bubble humidifier; in children flows under 5 L/min are usual. FiO2 (%) ≈ 21 + 3 × flow (L/min) in older children and adults; small children get a higher FiO2 at the same flow. Simple mask 5–10 L/min gives about 30–65 %.",
      ref: "Nelson 22nd ed. 2024, ch. 86 Acute care of respiratory distress and failure, p. 618"
    },
    {
      book: "nelson",
      text: "Bubble CPAP reduces mortality in hypoxaemic pneumonia compared with standard oxygen where ventilator CPAP and mechanical ventilation are not available.",
      ref: "Nelson 22nd ed. 2024, ch. 449 Community-acquired pneumonia, p. 2647"
    },
    {
      book: "harrison",
      text: "COPD exacerbation: oxygen to a target saturation of 88–92 %.",
      ref: "Harrison 22nd ed. 2025, ch. 303 COPD, p. 2259"
    },
    {
      book: "harrison",
      text: "Myocardial infarction: supplemental oxygen is not recommended when saturation is normal; give it when saturation is under 90 % and reassess the need.",
      ref: "Harrison 22nd ed. 2025, ch. 286 ST-Segment Elevation Myocardial Infarction, p. 2118"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "haloperidol",
  name: "Haloperidol",
  aka: [
    "Haldol",
    "Serenace"
  ],
  cls: "First-generation (high-potency) antipsychotic, butyrophenone",
  cat: "psychiatry",
  wards: [
    "psychiatric",
    "emergency",
    "medical",
    "surgical",
    "icu",
    "outpatient"
  ],
  tags: [
    "psychosis",
    "schizophrenia",
    "mania",
    "agitation",
    "aggression",
    "rapid tranquillisation",
    "delirium",
    "antipsychotic"
  ],
  presentation: [
    "Tablets 1.5 mg and 5 mg (strengths vary by supplier).",
    "Injection 5 mg/mL, 1 mL ampoule (haloperidol lactate) for IM use.",
    "Do not confuse with haloperidol DECANOATE 50 mg/mL: an oily long-acting depot. It is never given IV and never used for acute agitation."
  ],
  indications: [
    "Acute psychosis and schizophrenia (acute treatment and maintenance)",
    "Mania with psychotic symptoms or severe agitation",
    "Severe agitation or violence when calming by talking has failed (rapid tranquillisation, often with promethazine)",
    "Delirium with distressing hallucinations or dangerous agitation, while the cause is treated",
    "Nausea and vomiting in palliative care (low dose)"
  ],
  standard: {
    summary: "Oral first. IM if the patient refuses and the risk is high. An ECG before regular or higher doses where possible. IV haloperidol is not recommended without cardiac monitoring.",
    items: [
      {
        label: "Psychosis, adult (oral)",
        text: "WHO mhGAP: start 1.5–3 mg daily and increase as needed; maximum 20 mg daily. About 5 mg a day is a usual effective dose (Kaplan). Higher doses add side effects, not benefit."
      },
      {
        label: "Acute agitation, adult",
        text: "Oral 5 mg first if the patient will take it. If refused and the risk is high: 5 mg deep IM, often with promethazine 25–50 mg IM in a separate syringe (NICE NG10). Watch for 1 hour after the first dose before giving more. Most references cap total haloperidol (oral plus IM) at 20 mg in 24 hours; many units use a lower cap. Confirm with local protocol."
      },
      {
        label: "Older adults and dementia",
        text: "Start 0.5–1 mg (Kaplan recommends 0.5–1 mg a day for agitation in dementia). Increase slowly. All antipsychotics raise the risk of death and stroke in older people with dementia: use only for severe distress or danger, for the shortest time."
      },
      {
        label: "Delirium",
        text: "Treat the cause first (infection, hypoxia, low glucose, drugs, alcohol withdrawal, urinary retention, pain). Older or frail: 0.5–1 mg orally twice daily, with extra doses every 4–6 hours if needed (Kaplan). Younger adults with severe agitation: 2–5 mg IM, repeated after an hour if needed (Kaplan). Stop once the delirium settles."
      },
      {
        label: "Nausea and vomiting (palliative care)",
        text: "Low doses, commonly 0.5–1.5 mg at night orally. Confirm with the palliative care protocol."
      }
    ]
  },
  improvised: [
    {
      title: "Rapid tranquillisation without a cardiac monitor: oral first, then IM",
      best_for: "Emergency department, medical or psychiatric ward, health centre. An agitated patient who is a danger to self or others and calming by talking has failed.",
      requires: [
        "oral",
        "im"
      ],
      steps: [
        "Try to calm first: one calm speaker, space, a quiet area, offer food, water and a family member. Tell the patient clearly what will happen.",
        "Look quickly for a medical cause: fever (malaria, meningitis), low glucose (check if you have a glucometer), low oxygen, head injury, alcohol withdrawal, drug intoxication, pain, full bladder.",
        "Offer oral medicine: haloperidol 5 mg (older or frail: 0.5–1 mg), with or without promethazine 25 mg oral. If alcohol withdrawal or stimulant intoxication is likely, give a benzodiazepine instead (see Lorazepam or Diazepam).",
        "Wait 30–60 minutes. If still dangerous and oral is refused: haloperidol 5 mg deep IM plus promethazine 25–50 mg deep IM, in separate syringes and separate sites (outer thigh or upper outer buttock).",
        "Use a benzodiazepine instead of haloperidol if: this is the first ever antipsychotic, there is known heart disease, fainting or palpitations, a family history of sudden death, or no ECG can be done (NICE NG10 advises IM lorazepam in these cases). If lorazepam is not stocked: diazepam 10 mg orally, or 5–10 mg slowly IV. Never IM diazepam.",
        "Reassess after 30–60 minutes (Kaplan: observe for 1 hour after the first dose). Small repeated doses are safer than one large dose. Do not exceed the daily maximum in your protocol.",
        "Keep biperiden (or another anticholinergic) ready for acute dystonia, especially in young men."
      ],
      monitor: [
        "After any sedating injection: pulse, blood pressure (if a cuff is available), breathing rate, temperature, hydration and level of consciousness at least every hour until there are no concerns. Every 15 minutes if the patient is asleep or heavily sedated, has taken alcohol or other drugs, has a physical illness, was restrained, or received more than the usual maximum dose (NICE NG10).",
        "No pulse oximeter: count breaths for a full minute, look at lip and tongue colour, and check the patient rouses to voice. Put a sedated patient in the recovery position. Call for help and prepare a bag-valve-mask if breathing is slow or shallow, colour is poor, or the patient cannot be roused.",
        "Watch for acute dystonia (twisted neck, eyes rolling up, jaw or tongue spasm) in the first hours to days."
      ],
      cautions: [
        "Never use haloperidol decanoate for agitation.",
        "Avoid in patients already heavily intoxicated with alcohol or other sedatives (Kaplan lists this as a contraindication): add-on breathing depression.",
        "In alcohol withdrawal antipsychotics lower the seizure threshold; a benzodiazepine is the main treatment.",
        "Parkinson's disease or Lewy body dementia: severe stiffness and falls. Avoid haloperidol."
      ]
    },
    {
      title: "Safe physical restraint and positioning to give an injection",
      best_for: "When a patient must be held briefly to receive medicine or prevent serious harm.",
      requires: [
        "im"
      ],
      steps: [
        "Restraint is a last resort, only after talking and offering oral medicine have failed (Kaplan). Use the least restrictive hold for the shortest time.",
        "Gather enough trained staff before starting: usually one to hold and protect the head, one for each limb. One person leads, speaks to the patient and watches the airway throughout.",
        "Never press on the neck, chest, back or abdomen. Never kneel on the patient. Do not cover the face.",
        "If the patient is held face down to inject the buttock, keep it as short as possible, then turn onto the side or back.",
        "Give the injection into the outer thigh if possible: it can be done with the patient on their back or side.",
        "Release holds as soon as it is safe. A sedated patient goes into the recovery position.",
        "If mechanical restraint (straps) is used under local law and policy: padded straps, never tied face down, limb circulation and skin checked often, and a staff member watching continuously. Never leave a restrained patient alone.",
        "Record why, when, who, how long, medicines given and observations. Keep the patient's dignity and privacy (Kaplan)."
      ],
      monitor: [
        "Breathing, colour and responsiveness continuously during the hold",
        "If the patient says they cannot breathe, goes quiet or goes limp: release at once and check airway and pulse",
        "After restraint: skin injury, limb circulation, urine colour (dark urine suggests muscle breakdown), temperature"
      ],
      cautions: [
        "Sudden death during restraint is more likely with obesity, alcohol or stimulant intoxication, exhaustion, long struggles and face-down holds.",
        "Restraining a patient in alcohol withdrawal delirium is risky: they may fight to dangerous exhaustion (Kaplan). Prefer adequate benzodiazepine sedation in a safe room with staff present.",
        "A hot room plus struggling plus antipsychotic increases the risk of heat stroke and neuroleptic malignant syndrome."
      ]
    },
    {
      title: "Lowering QT risk when no ECG is available",
      best_for: "Any hospital or health centre without an ECG, before and during antipsychotic treatment.",
      requires: [],
      steps: [
        "Ask about fainting, collapse during exercise or emotion, palpitations, known heart disease, and sudden unexplained death in young relatives. Any yes: avoid haloperidol if possible and get an ECG first.",
        "Feel the pulse for a full minute. A slow pulse (below 50) or an irregular pulse raises the risk.",
        "Look for low potassium or magnesium: vomiting, diarrhoea, heavy alcohol use, malnutrition, diuretics such as furosemide. Correct these first.",
        "Check the medicine list for other QT-prolonging drugs: amiodarone, quinine, amitriptyline, chlorpromazine, other antipsychotics, some antibiotics (macrolides, fluoroquinolones), methadone. Avoid combining them.",
        "Use the lowest effective dose. Give it orally or IM, never IV.",
        "For agitation in a high-risk patient, prefer a benzodiazepine or olanzapine.",
        "Arrange an ECG at the nearest facility before long-term treatment, doses above the usual range, or combinations of QT-prolonging drugs."
      ],
      monitor: [
        "Pulse rate and rhythm before starting and after each dose increase",
        "Any fainting, palpitations or a brief seizure-like collapse (torsades can look like a seizure)"
      ],
      cautions: [
        "A normal pulse does not rule out a long QT.",
        "Torsades de pointes: lie flat, check pulse, start CPR if absent. Magnesium sulfate IV is the treatment (see Magnesium sulfate)."
      ]
    },
    {
      title: "Recognising neuroleptic malignant syndrome without a CK test",
      best_for: "Any patient on an antipsychotic (tablets, injection or depot) who becomes feverish, stiff or confused.",
      requires: [],
      steps: [
        "Suspect it in anyone on an antipsychotic with fever plus muscle stiffness plus confusion. It develops over 24–72 hours and is often mistaken for worsening psychosis (Kaplan). Risk is highest with high-potency drugs, high or rapidly increased doses, IM dosing, depots and dehydration.",
        "Check by hand: temperature; stiffness like a bending lead pipe when you flex the elbow; heavy sweating; fast pulse; high or swinging blood pressure; mutism; drowsiness; trouble swallowing; incontinence.",
        "Look at the urine: dark or cola-coloured urine, or a dipstick positive for blood with no red cells seen, suggests muscle breakdown. Measure urine output.",
        "Think of other causes that look similar and treat them if you cannot exclude them: malaria (do a rapid test), meningitis or encephalitis, sepsis, heat stroke, catatonia, alcohol withdrawal, lithium toxicity, serotonin syndrome (jerks and clonus, on fluoxetine or amitriptyline), anticholinergic poisoning (hot DRY skin, big pupils, no rigidity).",
        "Act: stop ALL antipsychotics (and metoclopramide). Cool with tepid sponging, fans and ice packs to groin and armpits. Give generous IV fluids (0.9 % saline or Ringer's lactate) and aim for good urine output; insert a catheter if possible.",
        "Give a benzodiazepine for agitation and stiffness: lorazepam 1–2 mg IM or IV, or diazepam slowly IV (never IM).",
        "Refer urgently to a hospital with high-dependency care. Bromocriptine or dantrolene may be used there (Kaplan lists bromocriptine 2.5 mg orally two or three times a day).",
        "After full recovery wait before restarting (often at least 2 weeks; ask a specialist), then use a low dose of a different, lower-potency or second-generation drug and increase slowly (Kaplan)."
      ],
      monitor: [
        "Temperature, pulse, blood pressure, breathing and consciousness every 1–2 hours",
        "Urine output and colour; fluid balance",
        "Creatinine and potassium if any laboratory is available"
      ],
      cautions: [
        "A depot keeps releasing drug for weeks; mortality is higher when depots are involved (Kaplan).",
        "Do not restrain a feverish rigid patient face down or in a hot room."
      ]
    }
  ],
  paediatric: [
    "Children and adolescents: specialist decision. For rapid tranquillisation in children and young people, NICE NG10 recommends IM lorazepam rather than haloperidol.",
    "Tics, Tourette disorder and severe aggression in autism: specialist use only. Haloperidol causes more dystonia and sedation in young people than newer drugs (Kaplan).",
    "Adolescents, especially boys, are at high risk of acute dystonia: keep an anticholinergic ready.",
    "Any dose by weight or age must come from BNF for Children or the local paediatric protocol."
  ],
  cautions: [
    "Movement side effects: acute dystonia (hours to days), parkinsonism (weeks), akathisia (inner restlessness, often mistaken for worse agitation), tardive dyskinesia (months to years). See Biperiden.",
    "Neuroleptic malignant syndrome: fever, rigidity, confusion, unstable pulse and blood pressure. Stop the drug and treat urgently.",
    "QT prolongation and torsades de pointes, especially IV, at high doses, with other QT drugs, low potassium or magnesium, or heart disease (Kaplan).",
    "Older people with dementia: higher death and stroke risk. Parkinson's disease and Lewy body dementia: avoid.",
    "Lowers the seizure threshold; impairs temperature control (heat stroke risk in hot weather, especially with alcohol).",
    "Raises prolactin: missed periods, breast milk leakage, sexual problems.",
    "Pregnancy and breastfeeding: see Safety tab. Liver disease: start low."
  ],
  antidote: "No specific antidote. Acute dystonia: biperiden (or benztropine, promethazine or diazepam). Hypotension: lie flat with legs raised and give IV fluids; noradrenaline if severe. Do not use adrenaline for antipsychotic-induced hypotension. Torsades: magnesium sulfate IV.",
  textbook: [
    {
      book: "kaplan",
      text: "For an acutely disturbed adult, the equivalent of haloperidol 5–20 mg is reasonable; an older adult may need as little as 1 mg. IM doses are about half oral doses. Observe for 1 hour after the first dose before giving more.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1968"
    },
    {
      book: "kaplan",
      text: "Small IM or oral doses (e.g. haloperidol 2–5 mg) repeated every 30–60 minutes until controlled are often better than a large first dose, which over-sedates; check blood pressure and vital signs meanwhile.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, pdf p. 2561"
    },
    {
      book: "kaplan",
      text: "Haloperidol has been linked to ventricular arrhythmia, torsades de pointes and sudden death when given intravenously.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1959"
    },
    {
      book: "kaplan",
      text: "Delirium with psychosis: haloperidol 2–5 mg IM, repeated after an hour if still agitated, then oral twice daily once calm; it can prolong QT, so ECGs and cardiac status should be checked.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 3.1 Delirium, pdf p. 742"
    },
    {
      book: "kaplan",
      text: "Agitation in dementia: low doses of a high-potency drug (haloperidol 0.5–1 mg a day) are recommended; falls from postural hypotension, parkinsonism and worse confusion are the main problems.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1955"
    },
    {
      book: "kaplan",
      text: "Neuroleptic malignant syndrome evolves over 24–72 hours and is often missed early, when withdrawal or agitation is mistaken for worsening psychosis; high-potency drugs such as haloperidol carry the greatest risk.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21 Psychopharmacology, Medication-Induced Movement Disorders, pdf p. 1888"
    },
    {
      book: "dsm",
      text: "An older man after hip surgery became stiff within an hour of haloperidol 2 mg given for agitation; this is especially common with Lewy body or Parkinson-related cognitive decline.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 17 Neurocognitive Disorders, case 17.1 Dysphoria, pdf p. 409"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016 (Psychoses; Bipolar disorder; Substance use)"
    },
    {
      name: "WHO Model Formulary 2008"
    },
    {
      name: "NICE NG10 Violence and aggression: short-term management in mental health, health and community settings, 2015 (rapid tranquillisation)"
    },
    {
      name: "British National Formulary (BNF) and BNF for Children"
    },
    {
      name: "Taylor DM, Barnes TRE, Young AH. The Maudsley Prescribing Guidelines in Psychiatry, 14th ed. 2021"
    },
    {
      name: "Haloperidol injection and tablets, product information (SmPC)"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "chlorpromazine",
  name: "Chlorpromazine",
  aka: [
    "Largactil",
    "Thorazine"
  ],
  cls: "First-generation (low-potency) antipsychotic, phenothiazine",
  cat: "psychiatry",
  wards: [
    "psychiatric",
    "emergency",
    "medical",
    "outpatient"
  ],
  tags: [
    "psychosis",
    "schizophrenia",
    "mania",
    "agitation",
    "sedation",
    "hiccups",
    "antipsychotic",
    "phenothiazine"
  ],
  presentation: [
    "Tablets 25 mg, 50 mg and 100 mg.",
    "Injection 25 mg/mL, 2 mL ampoule (50 mg). Protect from light.",
    "Oral syrup (for example 25 mg/5 mL) in some settings; check strength.",
    "Staff: avoid skin contact with the solution or crushed tablets (contact dermatitis). Wear gloves."
  ],
  indications: [
    "Schizophrenia and other psychoses (WHO essential medicine)",
    "Mania",
    "Agitation where sedation is wanted, preferably orally",
    "Intractable hiccups",
    "Nausea and vomiting in terminal illness (when other antiemetics are unsuitable)"
  ],
  standard: {
    summary: "Oral is the safe route. IM only in small doses with the patient lying down and blood pressure checked: it can cause a profound fall in blood pressure.",
    items: [
      {
        label: "Psychosis, adult (oral)",
        text: "WHO mhGAP: start 25–50 mg daily; usual effective dose 75–300 mg daily; up to 1000 mg may be needed for severe symptoms (specialist). Kaplan gives about 300 mg a day as a usual effective dose. Give most or all at night to use the sedation."
      },
      {
        label: "Acute agitation, adult",
        text: "Oral 25–50 mg. IM only if essential: no more than 25 mg in one injection (Kaplan: more can cause profound hypotension), patient lying down, with blood pressure checked. For rapid tranquillisation, haloperidol with promethazine or a benzodiazepine is usually safer."
      },
      {
        label: "Older adults",
        text: "Start with a third to half of the adult dose and increase slowly. Postural hypotension, falls, confusion and constipation are common. Avoid IM."
      },
      {
        label: "Intractable hiccups",
        text: "25–50 mg orally three or four times daily (BNF). Confirm with local protocol."
      },
      {
        label: "Nausea and vomiting",
        text: "10–25 mg orally every 4–6 hours as needed (BNF). Confirm with local protocol."
      }
    ]
  },
  improvised: [
    {
      title: "Giving IM chlorpromazine safely without monitors (hypotension precautions)",
      best_for: "When chlorpromazine injection is the only sedating antipsychotic stocked.",
      requires: [
        "im",
        "bp"
      ],
      steps: [
        "First choose another option if you can: oral chlorpromazine, or haloperidol with promethazine, or a benzodiazepine.",
        "Do not give IM chlorpromazine to a patient who is dehydrated, bleeding, septic, elderly, or drunk.",
        "Measure blood pressure and pulse lying and, if safe, sitting or standing before the dose (Kaplan).",
        "Give no more than 25 mg (1 mL of 25 mg/mL) in one injection (Kaplan), slowly and deep into a large muscle. It is painful.",
        "Keep the patient lying down. Peak effect after IM is about 30 minutes (Kaplan), so stay lying for at least that long.",
        "Recheck lying and sitting blood pressure and pulse at 30 and 60 minutes and before the patient gets up. Sit up first with legs over the bed edge, then stand with help.",
        "If blood pressure falls or the patient faints: lie flat with legs raised, give IV fluids (0.9 % saline or Ringer's lactate). If severe, noradrenaline. Do not give adrenaline (Kaplan: it worsens this hypotension)."
      ],
      monitor: [
        "Lying and sitting blood pressure and pulse before, at 30 and 60 minutes, and during the first days (Kaplan)",
        "Dizziness or fainting on standing",
        "Urine output",
        "After any sedating injection: pulse, blood pressure (if a cuff is available), breathing rate, temperature, hydration and level of consciousness at least every hour until there are no concerns. Every 15 minutes if the patient is asleep or heavily sedated, has taken alcohol or other drugs, has a physical illness, was restrained, or received more than the usual maximum dose (NICE NG10)."
      ],
      cautions: [
        "No BP cuff: use pulse (rising pulse on sitting up), dizziness and pale sweaty skin as warning signs, and keep the patient lying for longer."
      ]
    },
    {
      title: "Starting oral chlorpromazine without falls or sunburn",
      best_for: "Outpatient, health centre or ward starting long-term oral treatment.",
      requires: [
        "oral"
      ],
      steps: [
        "Start low, usually 25–50 mg at night, and increase every few days. Tolerance to dizziness and sedation develops (Kaplan).",
        "Teach the patient and family: get up slowly (sit, wait, then stand); drink enough fluid, about 2 litres a day unless fluid is restricted (Kaplan); avoid alcohol.",
        "Older people: a large bedtime dose can cause falls at night when they get up to pass urine (Kaplan). Consider divided doses, a light or bedside container at night, and help to walk.",
        "Sun: chlorpromazine can cause severe sunburn and later grey-blue skin (Kaplan). Advise a hat, long sleeves and shade, and limit time in strong sun. This matters in the highlands where the sun is strong.",
        "Constipation: fluids, fruit, vegetables and a laxative if needed. Severe constipation can progress to bowel obstruction (Kaplan).",
        "Hot lowland climates: chlorpromazine reduces sweating and heat control. Avoid heavy work in the heat; watch for heat stroke."
      ],
      monitor: [
        "Dizziness, falls",
        "Sedation",
        "Bowel habit and passing urine",
        "Weight"
      ],
      cautions: [
        "Epilepsy: chlorpromazine lowers the seizure threshold more than high-potency drugs (Kaplan). Prefer haloperidol or olanzapine if seizures are a concern."
      ]
    },
    {
      title: "Recognising serious chlorpromazine harms without laboratory tests",
      best_for: "Follow-up visits at health-centre level.",
      requires: [],
      steps: [
        "Yellow eyes, dark urine, pale stools, upper abdominal pain, nausea or fever with rash, usually in the first month: think cholestatic jaundice. Stop chlorpromazine and refer (Kaplan).",
        "Sore throat, mouth ulcers or fever: think agranulocytosis. Stop the drug and get a full blood count urgently (Kaplan).",
        "Confusion, flushed hot dry skin, big pupils, fast pulse, urinary retention: anticholinergic toxicity, especially with amitriptyline, biperiden or promethazine. Stop the anticholinergic drugs and refer.",
        "Fever with stiffness and confusion: neuroleptic malignant syndrome (see Haloperidol method).",
        "Fainting or seizure-like collapse: think arrhythmia (QT) or low blood pressure."
      ],
      monitor: [
        "Ask about these symptoms at every visit, especially in the first months"
      ],
      cautions: []
    }
  ],
  paediatric: [
    "Specialist use only. Not recommended under 1 year of age (product information).",
    "Children are more sensitive to hypotension, sedation and dystonia. Avoid IM where possible.",
    "Doses by weight or age must come from BNF for Children or the local paediatric protocol."
  ],
  cautions: [
    "Postural hypotension, worst in the first days and with IM doses above 25 mg (Kaplan).",
    "The most sedating typical antipsychotic; lowers the seizure threshold (Kaplan).",
    "Anticholinergic effects: dry mouth, constipation (risk of ileus), urinary retention, blurred vision. Avoid in narrow-angle glaucoma and prostatic enlargement. Can worsen delirium caused by anticholinergic drugs (Kaplan).",
    "QT prolongation; cholestatic jaundice; agranulocytosis; photosensitivity and skin pigmentation (Kaplan).",
    "Neuroleptic malignant syndrome, dystonia, parkinsonism, tardive dyskinesia.",
    "Older people with dementia: higher death and stroke risk.",
    "Do not use adrenaline to treat hypotension caused by chlorpromazine; use fluids and noradrenaline."
  ],
  antidote: "No specific antidote. Hypotension: lie flat, legs raised, IV fluids; noradrenaline if severe, never adrenaline (Kaplan). Dystonia: biperiden. Anticholinergic delirium: stop the drug and give supportive care.",
  textbook: [
    {
      book: "kaplan",
      text: "More than 25 mg of chlorpromazine in a single injection may cause profound hypotension.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1968"
    },
    {
      book: "kaplan",
      text: "Postural hypotension is most frequent with low-potency drugs such as chlorpromazine; with IM use, check lying and standing BP before and after the first dose and over the first days.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1959"
    },
    {
      book: "kaplan",
      text: "Treat antipsychotic hypotension by lying the patient flat with legs raised; fluids or noradrenaline in severe cases. Adrenaline paradoxically worsens it and is contraindicated for this purpose.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1960"
    },
    {
      book: "kaplan",
      text: "Chlorpromazine can cause a sunburn-like photosensitivity reaction; limit sun exposure and use sunscreen. Long-term use can discolour sun-exposed skin.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1961"
    },
    {
      book: "kaplan",
      text: "Cholestatic jaundice was reported, usually in the first month, heralded by abdominal pain, nausea and vomiting then fever and rash; stop the drug if jaundice occurs.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1962"
    },
    {
      book: "kaplan",
      text: "Chlorpromazine is the most sedating typical antipsychotic, and low-potency drugs lower the seizure threshold more than high-potency drugs.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1958"
    },
    {
      book: "kaplan",
      text: "About 300 mg of chlorpromazine (or 5 mg haloperidol) a day is a usual effective dose; much higher doses add side effects without benefit.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1969"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016 (Psychoses; Bipolar disorder; Substance use)"
    },
    {
      name: "WHO Model Formulary 2008"
    },
    {
      name: "British National Formulary (BNF) and BNF for Children"
    },
    {
      name: "Taylor DM, Barnes TRE, Young AH. The Maudsley Prescribing Guidelines in Psychiatry, 14th ed. 2021"
    },
    {
      name: "Chlorpromazine tablets and injection, product information (SmPC)"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "olanzapine",
  name: "Olanzapine",
  aka: [
    "Zyprexa",
    "Zyprexa Velotab"
  ],
  cls: "Second-generation antipsychotic",
  cat: "psychiatry",
  wards: [
    "psychiatric",
    "emergency",
    "medical",
    "outpatient"
  ],
  tags: [
    "psychosis",
    "schizophrenia",
    "mania",
    "bipolar",
    "agitation",
    "antipsychotic",
    "orodispersible"
  ],
  presentation: [
    "Tablets 2.5, 5, 7.5, 10, 15 and 20 mg.",
    "Orally disintegrating tablets (ODT) 5, 10, 15 and 20 mg: dissolve on the tongue or in a drink.",
    "IM powder 10 mg vial. Dissolve in 2.1 mL water for injection to give 5 mg/mL; use within 1 hour (product information).",
    "A long-acting olanzapine pamoate injection exists but needs 3 hours of observation after each dose (Kaplan) and is rarely stocked."
  ],
  indications: [
    "Schizophrenia and other psychoses",
    "Acute mania and bipolar maintenance (alone or with lithium or valproate)",
    "Agitation in psychosis or mania (ODT or IM)",
    "Patients who had severe movement side effects with haloperidol or chlorpromazine"
  ],
  standard: {
    summary: "Once-daily oral. ODT or IM for agitation. Fewer movement side effects than haloperidol, but more weight gain, sedation and diabetes risk.",
    items: [
      {
        label: "Schizophrenia, adult",
        text: "Start 5–10 mg once daily (Kaplan); usual range 5–20 mg daily. Wait about a week between dose changes because of the long half-life (Kaplan)."
      },
      {
        label: "Mania, adult",
        text: "Usually 10–15 mg once daily (Kaplan); maximum 20 mg daily."
      },
      {
        label: "Agitation, adult IM",
        text: "10 mg IM (Kaplan; 5–7.5 mg if frail). A second dose may be given after at least 2 hours; no more than 3 injections and 20 mg total olanzapine (oral plus IM) in 24 hours (product information)."
      },
      {
        label: "Older adults",
        text: "Oral start 2.5–5 mg daily. IM 2.5–5 mg. Higher risk of death and stroke in dementia (boxed warning, Kaplan)."
      },
      {
        label: "Missed doses and stopping",
        text: "If stopped for more than 36 hours, restart at the starting dose (Kaplan). Taper when stopping to avoid rebound sweating, nausea and diarrhoea."
      }
    ]
  },
  improvised: [
    {
      title: "Calming agitation with olanzapine: ODT first, IM second, never with an IM benzodiazepine",
      best_for: "Agitated patient with psychosis or mania, especially when there is no ECG or haloperidol has caused dystonia before.",
      requires: [
        "im"
      ],
      steps: [
        "Offer an orally disintegrating tablet 10 mg (older or frail: 2.5–5 mg). Place it on the tongue; it dissolves in seconds.",
        "If refused and the risk is high: dissolve the 10 mg vial in 2.1 mL water for injection (5 mg/mL). Draw up 2 mL for 10 mg (0.5–1 mL for 2.5–5 mg). Give deep IM. Use within 1 hour of mixing.",
        "Do not give IM or IV lorazepam or diazepam within 1 hour of IM olanzapine. Deaths have followed the combination (Kaplan). If a benzodiazepine is needed, give it orally or wait at least 1 hour and watch breathing closely.",
        "Do not mix olanzapine in a syringe with any other drug.",
        "Reassess after 1–2 hours. A second IM dose only after at least 2 hours."
      ],
      monitor: [
        "Blood pressure and pulse, especially on standing: hypotension and slow pulse can occur",
        "Breathing rate and depth closely for the first 4 hours after IM (product information)",
        "After any sedating injection: pulse, blood pressure (if a cuff is available), breathing rate, temperature, hydration and level of consciousness at least every hour until there are no concerns. Every 15 minutes if the patient is asleep or heavily sedated, has taken alcohol or other drugs, has a physical illness, was restrained, or received more than the usual maximum dose (NICE NG10).",
        "No pulse oximeter: count breaths for a full minute, look at lip and tongue colour, and check the patient rouses to voice. Put a sedated patient in the recovery position. Call for help and prepare a bag-valve-mask if breathing is slow or shallow, colour is poor, or the patient cannot be roused."
      ],
      cautions: [
        "Alcohol greatly increases sedation (Kaplan). Avoid IM olanzapine in patients who are drunk or have taken sedatives."
      ]
    },
    {
      title: "Patient refusing tablets or hiding them: ODT or liquid, never covert",
      best_for: "Ward or home when a patient cheeks, spits out or refuses tablets.",
      requires: [
        "oral"
      ],
      steps: [
        "Ask why. Common reasons: side effects (stiffness, restlessness, sleepiness, weight gain, sexual problems), fear of poisoning, feeling well, cost. Treat side effects and explain.",
        "Offer a choice the patient can accept: ODT (dissolves on the tongue and is hard to hide, Kaplan), or ODT dispersed in a small glass of water or juice in front of the patient, or another drug in liquid form, or a depot injection for the long term (see Fluphenazine decanoate).",
        "Supervise the dose respectfully: stay until it is swallowed and dissolved.",
        "Involve family or a trusted person to encourage the patient.",
        "If the patient lacks capacity and is at serious risk, a senior clinician decides with the family and records capacity, reasons and who agreed, following national law and hospital policy. An open IM dose is usually better than hiding medicine.",
        "Never hide medicine in food or drink without a documented legal and ethical decision. Do not tell families to do it at home: doses become unreliable, and discovery destroys trust and can deepen paranoia."
      ],
      monitor: [
        "Adherence at each visit (ask, count tablets)",
        "Relapse signs: poor sleep, suspiciousness, withdrawal"
      ],
      cautions: []
    },
    {
      title: "Weight, sugar and blood pressure checks without a laboratory",
      best_for: "Follow-up of anyone on olanzapine at health-centre or outpatient level.",
      requires: [],
      steps: [
        "Before starting, record: weight, height, waist circumference with a tape at the navel, blood pressure if a cuff is available, and family history of diabetes and heart disease (Kaplan lists these checks).",
        "Check blood glucose with a glucometer, or urine glucose with a dipstick if that is all you have, before starting and at follow-up.",
        "Weigh at every visit for the first months. Olanzapine causes the most weight gain after clozapine, and it can continue for many months (Kaplan).",
        "Advise from the start: regular meals, fewer sugary drinks and snacks, daily walking.",
        "Ask about thirst, passing a lot of urine and weight loss despite eating: possible diabetes. Check glucose the same day.",
        "Rapid weight gain or new diabetes: discuss switching to haloperidol or another drug with lower metabolic risk."
      ],
      monitor: [
        "Weight and waist",
        "Glucose",
        "Blood pressure"
      ],
      cautions: [
        "Diabetic ketoacidosis is rare but has occurred with olanzapine: vomiting, deep breathing and drowsiness need urgent glucose and ketone checks."
      ]
    }
  ],
  paediatric: [
    "Adolescents 13–17 years with schizophrenia or mania: specialist use; start 2.5–5 mg daily, target around 10 mg (US product information).",
    "Adolescents gain more weight than adults. Monitor weight and glucose closely.",
    "IM olanzapine is not established under 18 years. For rapid tranquillisation in young people NICE NG10 recommends IM lorazepam.",
    "Under 13: specialist only."
  ],
  cautions: [
    "Weight gain, diabetes and raised lipids (Kaplan).",
    "Sedation and postural hypotension, especially after IM doses and in older people.",
    "Never give with an IM or IV benzodiazepine within 1 hour.",
    "Older people with dementia: higher death and stroke risk (Kaplan).",
    "Anticholinergic effects: constipation, urinary retention, glaucoma risk.",
    "Dose-related movement side effects and neuroleptic malignant syndrome still occur.",
    "Raised liver enzymes (about 2 % stop because of this, Kaplan); caution in liver disease.",
    "Smoking lowers olanzapine levels. A heavy smoker who stops suddenly (for example on admission) can become over-sedated (Maudsley)."
  ],
  antidote: "No specific antidote. Supportive care. Hypotension: lie flat, IV fluids; avoid adrenaline.",
  textbook: [
    {
      book: "kaplan",
      text: "Olanzapine: start 5–10 mg once daily; 5–20 mg/day is usual. Orally disintegrating tablets help patients who cannot swallow or who cheek tablets. The IM dose for acute agitation is 10 mg.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1934"
    },
    {
      book: "kaplan",
      text: "Carbamazepine and phenytoin lower olanzapine levels; alcohol increases absorption and sedation. Olanzapine causes the most weight gain after clozapine; check glucose and liver enzymes periodically.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1935"
    },
    {
      book: "kaplan",
      text: "All second-generation antipsychotics carry a boxed warning: elderly people with dementia-related psychosis have about 1.6–1.7 times the risk of death compared with placebo.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1929"
    },
    {
      book: "kaplan",
      text: "Deaths have been reported when parenteral lorazepam was given with parenteral olanzapine.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.4 Anxiolytics, pdf p. 2122"
    },
    {
      book: "kaplan",
      text: "IM olanzapine calms agitated psychotic patients with few extrapyramidal effects, unlike haloperidol or fluphenazine; a rapidly dissolving oral tablet can be an alternative to injection.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 5 Schizophrenia Spectrum and Other Psychotic Disorders, pdf p. 1137"
    },
    {
      book: "kaplan",
      text: "If an SGA has been stopped for more than 36 hours, restart at the initial titration dose; taper olanzapine when stopping to avoid cholinergic rebound (sweating, diarrhoea).",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1948"
    },
    {
      book: "dsm",
      text: "In an obese man with high blood sugar, chronic olanzapine was flagged as a risk because it is known to cause large weight gain.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.1 Emotionally Disturbed, pdf p. 91"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016 (Psychoses; Bipolar disorder; Substance use)"
    },
    {
      name: "NICE NG10 Violence and aggression: short-term management in mental health, health and community settings, 2015 (rapid tranquillisation)"
    },
    {
      name: "British National Formulary (BNF) and BNF for Children"
    },
    {
      name: "Taylor DM, Barnes TRE, Young AH. The Maudsley Prescribing Guidelines in Psychiatry, 14th ed. 2021"
    },
    {
      name: "Olanzapine tablets, orodispersible tablets and powder for solution for injection, product information (SmPC)"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "fluphenazine-decanoate",
  name: "Fluphenazine decanoate (long-acting depot)",
  aka: [
    "Modecate",
    "fluphenazine depot",
    "long-acting injectable antipsychotic",
    "LAI"
  ],
  cls: "First-generation antipsychotic, long-acting depot injection (phenothiazine)",
  cat: "psychiatry",
  wards: [
    "psychiatric",
    "outpatient"
  ],
  tags: [
    "schizophrenia",
    "psychosis",
    "depot",
    "long-acting injection",
    "adherence",
    "relapse prevention",
    "antipsychotic"
  ],
  presentation: [
    "25 mg/mL oily solution (sesame oil), 1 mL ampoule. A 100 mg/mL concentrate exists in some countries: check the strength every time.",
    "Store below 25 °C and protect from light (check the pack).",
    "Deep IM only. Never IV. Not for acute agitation: it takes days to work."
  ],
  indications: [
    "Maintenance treatment of schizophrenia and other chronic psychoses, especially when tablets are often missed or the patient prefers an injection",
    "Relapse prevention after a patient has responded to an antipsychotic"
  ],
  standard: {
    summary: "Test dose, then deep IM every 2–5 weeks. Oral cover during the first weeks. Lowest dose that keeps the patient well.",
    items: [
      {
        label: "Test dose",
        text: "12.5 mg (0.5 mL of 25 mg/mL) deep IM (Kaplan; BNF). Older people: 6.25 mg (BNF). Ideally give at least one oral dose of an antipsychotic first to check for severe movement side effects or allergy (Kaplan). Review after 4–7 days."
      },
      {
        label: "Maintenance",
        text: "WHO mhGAP: 12.5–50 mg every 2–4 weeks. BNF allows 12.5–100 mg every 14–35 days, adjusted to response. Increase only after 3–4 weeks, because early absorption can be faster than later (Kaplan)."
      },
      {
        label: "Oral cover",
        text: "Continue oral antipsychotic, reducing it, for about the first month (Kaplan). It can take months to reach a steady level."
      },
      {
        label: "Switching to a depot",
        text: "There is no exact oral-to-depot conversion. Start low, cover with oral doses, and increase slowly. When switching from a depot to an oral second-generation drug, start the oral drug on the day the next injection is due (Kaplan)."
      }
    ]
  },
  improvised: [
    {
      title: "Running a depot clinic without a computer: card, register and defaulter tracing",
      best_for: "Health centre or outpatient psychiatric clinic.",
      requires: [
        "im"
      ],
      steps: [
        "Give every patient a card showing: drug, strength, dose, interval, injection site used, and the next due date in both Ethiopian and Gregorian calendars.",
        "Keep a clinic register with the same details, sorted by due date. Each morning, list who is due this week.",
        "Record a phone number for the patient and a family member. Call or send a text the day before the due date.",
        "If a patient does not come within a few days of the due date, ask the health extension worker or family to trace them that week. A missed depot is often the first sign of relapse (Kaplan: you know at once when a dose is missed).",
        "At each visit check: mental state, stiffness, tremor, restlessness, abnormal mouth or tongue movements, weight, blood pressure, and side effects the patient worries about.",
        "Where possible move the injection to the facility nearest the patient's home and send the card details with them.",
        "Keep a stock register so the clinic does not run out; an interrupted depot supply causes relapses."
      ],
      monitor: [
        "Attendance against due dates",
        "Relapse signs",
        "Movement side effects at every visit"
      ],
      cautions: []
    },
    {
      title: "Giving the depot injection safely",
      best_for: "Any nurse or health officer giving the injection.",
      requires: [
        "im"
      ],
      steps: [
        "Check the patient, drug, strength (25 or 100 mg/mL), dose and date. Make sure it is the decanoate and not an ordinary short-acting injection.",
        "Warm the ampoule in your hand for a minute: the oil flows more easily.",
        "Draw up with a wide needle, then change to a 21 G needle long enough to reach deep muscle.",
        "Site: upper outer quadrant of the buttock or the ventrogluteal site. Alternate sides every visit and write the side on the card.",
        "Use a Z-track technique. Aspirate before injecting: if blood appears, withdraw and use a new site. Oil must never enter a vein.",
        "Inject slowly. Do not massage afterwards.",
        "Large volumes: split between two sites as advised in the product leaflet.",
        "Keep the patient in the clinic for a short time after the test dose to watch for fainting or allergy, as your protocol advises."
      ],
      monitor: [
        "Injection site pain, swelling or lumps at the next visit",
        "Acute dystonia in the first days after the first injections (Kaplan)"
      ],
      cautions: [
        "Sesame allergy: do not use (sesame oil vehicle).",
        "Never IV, never subcutaneous."
      ]
    },
    {
      title: "Missed or late depot dose",
      best_for: "Patient arrives late for the injection.",
      requires: [
        "im",
        "oral"
      ],
      steps: [
        "Find out how late, why, and whether symptoms are returning. Examine for relapse and for movement side effects.",
        "Late by less than one full dosing interval and well: give the usual dose now and set the next date from today.",
        "Late by more than one full interval, or symptoms returning: give the usual dose if there were no problems with it before, and add a short course of oral antipsychotic if symptoms are returning. Increase follow-up.",
        "Several months since the last injection: treat as a new start. Give a test dose (12.5 mg; older people 6.25 mg) and build up again with oral cover, because tolerance to side effects is lost and early doses can cause frightening dystonia (Kaplan).",
        "Look for the reason: travel, cost, stock-out, side effects, stigma. Fix what you can.",
        "Guidance varies. Confirm with local protocol or the Maudsley Prescribing Guidelines."
      ],
      monitor: [
        "Mental state and movement side effects at the next visit, 1–2 weeks after a restart"
      ],
      cautions: [
        "A late patient who is now febrile, stiff and confused may have neuroleptic malignant syndrome, not relapse (see Haloperidol method)."
      ]
    }
  ],
  paediatric: [
    "Not recommended for children (product information). Adolescents: specialist decision only."
  ],
  cautions: [
    "Effects last weeks after the last injection and cannot be removed: side effects such as dystonia, parkinsonism or neuroleptic malignant syndrome can persist. Neuroleptic malignant syndrome is more often fatal when a depot is involved (Kaplan).",
    "Movement side effects are common with this high-potency drug. Keep an anticholinergic available; tardive dyskinesia can appear up to 8 weeks after a depot is stopped (Kaplan).",
    "Not for patients who have never taken an antipsychotic before without an oral test first.",
    "Avoid in severe depression (can worsen it), in Parkinson's disease, and in older people with dementia (higher death and stroke risk).",
    "QT prolongation, hypotension, seizures, raised prolactin, sedation: as for other phenothiazines."
  ],
  antidote: "No specific antidote. Dystonia or parkinsonism: biperiden, often needed for longer than with oral drugs. Neuroleptic malignant syndrome: stop further injections and treat urgently.",
  textbook: [
    {
      book: "kaplan",
      text: "Depot injections go deep IM into a large muscle every 1–4 weeks. Give at least one oral dose first to check for severe EPS or allergy; start with fluphenazine 12.5 mg (0.5 mL) and cover breakthrough symptoms with oral doses before increasing after 3–4 weeks.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1971"
    },
    {
      book: "kaplan",
      text: "Start depot treatment low because absorption can be faster at first and cause frightening dystonia that puts patients off treatment.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1971"
    },
    {
      book: "kaplan",
      text: "Depot haloperidol and fluphenazine may take up to 6 months to reach steady state, so oral treatment should continue for about the first month.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1952"
    },
    {
      book: "kaplan",
      text: "Neuroleptic malignant syndrome mortality can reach 20–30 percent or more when depot medications are involved.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.1 Antipsychotics, pdf p. 1958"
    },
    {
      book: "kaplan",
      text: "About 40–50 percent of patients stop oral antipsychotics within 1–2 years; long-acting injections help adherence and reduce relapse, with oral supplementation needed at the start.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 5 Schizophrenia Spectrum and Other Psychotic Disorders, pdf p. 1142"
    },
    {
      book: "kaplan",
      text: "With a depot, clinicians know at once when a dose is missed and have time to act before the effect wears off.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 5 Schizophrenia Spectrum and Other Psychotic Disorders, pdf p. 1143"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016 (Psychoses; Bipolar disorder; Substance use)"
    },
    {
      name: "WHO Model Formulary 2008"
    },
    {
      name: "British National Formulary (BNF) and BNF for Children"
    },
    {
      name: "Taylor DM, Barnes TRE, Young AH. The Maudsley Prescribing Guidelines in Psychiatry, 14th ed. 2021"
    },
    {
      name: "Fluphenazine decanoate injection (Modecate), product information (SmPC)"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "biperiden",
  name: "Biperiden",
  aka: [
    "Akineton"
  ],
  cls: "Anticholinergic (antimuscarinic) antiparkinsonian agent",
  cat: "psychiatry",
  wards: [
    "psychiatric",
    "emergency",
    "medical",
    "paediatric",
    "outpatient"
  ],
  tags: [
    "acute dystonia",
    "extrapyramidal side effects",
    "EPS",
    "parkinsonism",
    "oculogyric crisis",
    "anticholinergic",
    "benztropine",
    "trihexyphenidyl",
    "benzhexol"
  ],
  presentation: [
    "Tablets 2 mg.",
    "Injection 5 mg/mL, 1 mL ampoule (biperiden lactate) for IM or slow IV use.",
    "Alternatives: benztropine injection 1 mg/mL and tablets; trihexyphenidyl (benzhexol) tablets 2 mg and 5 mg (oral only)."
  ],
  indications: [
    "Acute dystonia caused by antipsychotics or antiemetics such as metoclopramide (IM or IV)",
    "Drug-induced parkinsonism (oral)",
    "Short-term prevention of dystonia in high-risk patients (young men on high-potency antipsychotics, or after a previous episode)"
  ],
  standard: {
    summary: "IM or slow IV for acute dystonia; oral for parkinsonism. Review and stop after some weeks. Not for tardive dyskinesia.",
    items: [
      {
        label: "Acute dystonia, adult",
        text: "2–5 mg IM or slowly IV (Kaplan lists 2 mg; the product information gives 2.5–5 mg). Repeat after about 30 minutes if needed (Kaplan: repeat an anticholinergic after 20–30 minutes). If still no better, give a benzodiazepine (Kaplan). Do not exceed the daily maximum in the product leaflet."
      },
      {
        label: "After the dystonia settles",
        text: "Continue an oral anticholinergic for some days because the antipsychotic outlasts the injection. After one episode, prophylaxis for 4–8 weeks then a taper is reasonable (Kaplan). Reduce or change the antipsychotic."
      },
      {
        label: "Drug-induced parkinsonism, adult (oral)",
        text: "WHO mhGAP: biperiden 1 mg twice daily, increasing to 3–12 mg daily in divided doses. (Kaplan's table lists higher oral doses, 2–6 mg three times daily.) Review at 4–8 weeks and taper over 1–2 weeks to see if it is still needed (Kaplan)."
      },
      {
        label: "Alternatives",
        text: "Benztropine 1–2 mg IM or IV, repeated after 20–30 minutes (Kaplan). Trihexyphenidyl (benzhexol), oral only: start 1 mg daily and increase; usually 2 mg two or three times daily (Kaplan lists 2–5 mg three times daily). Diphenhydramine 25–50 mg IM or IV where stocked (Kaplan). Confirm with local protocol."
      }
    ]
  },
  improvised: [
    {
      title: "Acute dystonia when biperiden injection is out of stock",
      best_for: "Emergency or ward: twisted neck, eyes rolled up, tongue or jaw spasm, arched back, hours to days after haloperidol, fluphenazine, chlorpromazine or metoclopramide.",
      requires: [
        "im"
      ],
      steps: [
        "Recognise it: the patient is awake and frightened, not having a seizure. It is not 'hysteria': dystonia can fluctuate and ease with reassurance, which misleads staff (Kaplan).",
        "Check the airway first. Noisy breathing, inability to speak or swallow, or blue lips means laryngeal dystonia: see the next method.",
        "Use what you have, in this order: benztropine 1–2 mg IM (Kaplan); OR promethazine 25–50 mg deep IM (a sedating antihistamine with anticholinergic action; Kaplan supports antihistamines such as diphenhydramine as an alternative); OR diazepam 5–10 mg slowly IV (Kaplan: 10 mg IV reported effective). Never give diazepam IM.",
        "If only tablets are available and the airway is safe: biperiden 2 mg or trihexyphenidyl 2 mg by mouth. This takes longer to work (often 30–60 minutes).",
        "If there is no improvement 20–30 minutes after the first injection, repeat once, then add a benzodiazepine such as lorazepam 1 mg IM (Kaplan).",
        "Afterwards, continue an oral anticholinergic for several days and review the antipsychotic dose.",
        "Explain to the patient what happened. Dystonia is frightening and often makes patients refuse future treatment (Kaplan)."
      ],
      monitor: [
        "Improvement within 10–30 minutes after IM, a few minutes after IV",
        "Breathing and sedation after promethazine or diazepam",
        "Recurrence over the next 1–3 days"
      ],
      cautions: [
        "Promethazine: not under 2 years of age.",
        "Do not give more antipsychotic until the dystonia is controlled."
      ]
    },
    {
      title: "Laryngeal dystonia: noisy breathing, cannot speak or swallow",
      best_for: "Emergency. Rare but life-threatening.",
      requires: [
        "iv"
      ],
      steps: [
        "Call for help. Sit the patient up. Give oxygen if available.",
        "Give an anticholinergic IV: biperiden slowly IV at the dose above, or benztropine; Kaplan describes benztropine up to 4 mg within 10 minutes.",
        "Then give a benzodiazepine slowly IV: lorazepam 1–2 mg (Kaplan), or diazepam 5–10 mg if lorazepam is not stocked.",
        "No IV access: give the anticholinergic IM and try again for IV or intraosseous access.",
        "Have a bag-valve-mask and suction ready. Be prepared to support the airway (Kaplan)."
      ],
      monitor: [
        "Breathing, colour and voice continuously until clearly improved",
        "Respiratory rate after the benzodiazepine"
      ],
      cautions: [
        "Stridor that does not improve quickly may be anaphylaxis or another cause: give adrenaline IM if anaphylaxis is possible."
      ]
    },
    {
      title: "Oral anticholinergic for drug-induced parkinsonism at health-centre level",
      best_for: "Stiffness, slow movement, shuffling, tremor or drooling weeks after starting an antipsychotic.",
      requires: [
        "oral"
      ],
      steps: [
        "Recognise it: stiff arms, reduced arm swing, shuffling steps, mask-like face, drooling, coarse tremor. It can look like depression or negative symptoms (Kaplan).",
        "First try lowering the antipsychotic dose, or switching to a drug with fewer movement effects (olanzapine), if the illness allows.",
        "If needed: biperiden 1 mg twice daily, increasing gradually (WHO mhGAP), or trihexyphenidyl if that is what is stocked.",
        "Review after 4–8 weeks. Taper over 1–2 weeks and stop if symptoms do not return (Kaplan). About half of patients need to continue (Kaplan).",
        "Do not use for tardive dyskinesia (slow writhing tongue, mouth or finger movements): anticholinergics can make it worse. Refer."
      ],
      monitor: [
        "Stiffness and walking",
        "Constipation, urinary retention, blurred vision, confusion",
        "Signs of misuse (asking for more, euphoria)"
      ],
      cautions: [
        "Trihexyphenidyl in particular is misused for its mood-lifting effect (Kaplan). Prescribe small quantities."
      ]
    }
  ],
  paediatric: [
    "Children are very prone to dystonia from metoclopramide, haloperidol and chlorpromazine; opisthotonos (arched back) is common in children (Kaplan).",
    "Biperiden IM or IV doses for children are age-based in the product information: use BNF for Children or the local paediatric protocol.",
    "Alternatives: diphenhydramine where available, or diazepam slowly IV at a paediatric dose. Promethazine is not used under 2 years."
  ],
  cautions: [
    "Anticholinergic effects: dry mouth, constipation, urinary retention, blurred vision, fast pulse. Use cautiously, if at all, in prostatic enlargement, urinary retention and narrow-angle glaucoma (Kaplan).",
    "Confusion and delirium, especially in older people and in dementia. Avoid long-term use in them.",
    "Additive toxicity with amitriptyline, chlorpromazine, promethazine, olanzapine and atropine: hot dry skin, big pupils, fever, delirium (Kaplan).",
    "Worsens tardive dyskinesia. Misuse potential.",
    "Give IV doses slowly with the patient lying down: transient hypotension can occur."
  ],
  antidote: "No routine antidote. Anticholinergic toxicity: stop all anticholinergic drugs, cool, IV fluids, benzodiazepine for agitation or seizures. Physostigmine only where cardiac monitoring and resuscitation are available (Kaplan).",
  textbook: [
    {
      book: "kaplan",
      text: "Biperiden is listed for acute dystonia, parkinsonism, akinesia and akathisia: IM or IV 2 mg, or oral dosing three times daily.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21 Psychopharmacology, Medication-Induced Movement Disorders, Table 21-3, pdf p. 1890"
    },
    {
      book: "kaplan",
      text: "Acute dystonia: give benztropine 1–2 mg IM (or an equivalent anticholinergic), repeat after 20–30 minutes; if still no better, give a benzodiazepine such as lorazepam 1 mg IM/IV. Laryngeal dystonia is an emergency.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2214"
    },
    {
      book: "kaplan",
      text: "Prophylaxis against dystonia is indicated after one episode, or in high-risk patients such as young men on high-potency drugs, for 4–8 weeks and then tapered.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2214"
    },
    {
      book: "kaplan",
      text: "IM anticholinergics or IV/IM diphenhydramine almost always relieve dystonia; IV diazepam 10 mg has also been reported effective.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21 Psychopharmacology, Medication-Induced Movement Disorders, pdf p. 1892"
    },
    {
      book: "kaplan",
      text: "Use anticholinergics cautiously, if at all, in prostatic enlargement, urinary retention and narrow-angle glaucoma; trihexyphenidyl in particular is misused for its mood-elevating effect.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2212"
    },
    {
      book: "kaplan",
      text: "Combined with other anticholinergic drugs (low-potency antipsychotics, tricyclics), they can cause life-threatening anticholinergic delirium with fever, dry flushed skin and dilated pupils.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2213"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016 (Psychoses; Bipolar disorder; Substance use)"
    },
    {
      name: "WHO Model Formulary 2008"
    },
    {
      name: "British National Formulary (BNF) and BNF for Children"
    },
    {
      name: "Taylor DM, Barnes TRE, Young AH. The Maudsley Prescribing Guidelines in Psychiatry, 14th ed. 2021"
    },
    {
      name: "Biperiden (Akineton) tablets and injection, product information"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "promethazine",
  name: "Promethazine",
  aka: [
    "Phenergan"
  ],
  cls: "Sedating antihistamine (H1 antagonist, phenothiazine)",
  cat: "psychiatry",
  wards: [
    "psychiatric",
    "emergency",
    "medical",
    "maternity",
    "outpatient"
  ],
  tags: [
    "rapid tranquillisation",
    "sedation",
    "agitation",
    "antihistamine",
    "allergy",
    "urticaria",
    "nausea",
    "vomiting",
    "hyperemesis"
  ],
  presentation: [
    "Injection 25 mg/mL, 2 mL ampoule (50 mg). Protect from light.",
    "Tablets 10 mg and 25 mg.",
    "Oral solution 5 mg/5 mL."
  ],
  indications: [
    "Sedation in rapid tranquillisation, given IM with haloperidol (NICE NG10)",
    "Short-term sedation or anxiety when a benzodiazepine is unsuitable",
    "Allergic reactions: urticaria, itch, rhinitis; after adrenaline in anaphylaxis",
    "Nausea and vomiting, including motion sickness and vomiting in pregnancy",
    "Alternative treatment for acute dystonia (anticholinergic action)"
  ],
  standard: {
    summary: "Oral or deep IM. Avoid IV unless essential (severe tissue injury). Do not use under 2 years of age.",
    items: [
      {
        label: "Rapid tranquillisation, adult",
        text: "25–50 mg deep IM, with haloperidol 5 mg IM in a separate syringe (NICE NG10). Maximum 100 mg promethazine in 24 hours (BNF). Sedation begins after 20–60 minutes and lasts 4–6 hours (Kaplan)."
      },
      {
        label: "Oral sedation, adult",
        text: "25–50 mg orally (BNF). Confirm with local protocol."
      },
      {
        label: "Allergy, adult",
        text: "Oral 10–20 mg two or three times daily, or 25 mg at night (BNF). IM 25–50 mg (maximum 100 mg) for severe reactions, only after adrenaline if anaphylaxis."
      },
      {
        label: "Nausea and vomiting, adult",
        text: "25 mg orally, repeated as needed within the daily maximum in BNF. In pregnancy it is one of the usual first-line antiemetics (RCOG). Confirm with local protocol."
      },
      {
        label: "Older adults",
        text: "Use lower doses and avoid regular use: sedation, confusion, hypotension and falls are more severe (Kaplan)."
      }
    ]
  },
  improvised: [
    {
      title: "Haloperidol plus promethazine IM for rapid tranquillisation",
      best_for: "Agitated adult who refuses oral medicine, with no cardiac risk factors, where lorazepam is not stocked.",
      requires: [
        "im"
      ],
      steps: [
        "Try talking and oral medicine first (see Haloperidol method).",
        "Draw up promethazine 25–50 mg (1–2 mL of 25 mg/mL) in one syringe and haloperidol 5 mg (1 mL of 5 mg/mL) in a second syringe.",
        "Inject each deep IM into a different site: outer thigh or upper outer buttock. Aspirate first. Never subcutaneous.",
        "Wait 30–60 minutes. Sedation from promethazine starts after 20–60 minutes (Kaplan).",
        "If still dangerous, a further dose may be given within your protocol's limits. Promethazine maximum 100 mg in 24 hours.",
        "Keep biperiden ready for dystonia."
      ],
      monitor: [
        "After any sedating injection: pulse, blood pressure (if a cuff is available), breathing rate, temperature, hydration and level of consciousness at least every hour until there are no concerns. Every 15 minutes if the patient is asleep or heavily sedated, has taken alcohol or other drugs, has a physical illness, was restrained, or received more than the usual maximum dose (NICE NG10).",
        "No pulse oximeter: count breaths for a full minute, look at lip and tongue colour, and check the patient rouses to voice. Put a sedated patient in the recovery position. Call for help and prepare a bag-valve-mask if breathing is slow or shallow, colour is poor, or the patient cannot be roused.",
        "Blood pressure on standing when the patient first gets up"
      ],
      cautions: [
        "Avoid in patients who have taken alcohol, opioids or other sedatives: additive breathing depression (Kaplan).",
        "Do not add promethazine when a benzodiazepine has already been given unless you can watch breathing closely."
      ]
    },
    {
      title: "Injecting promethazine without causing tissue damage",
      best_for: "Every time promethazine is injected.",
      requires: [
        "im"
      ],
      steps: [
        "Deep IM into a large muscle is the preferred route. Superficial injection irritates tissue (Kaplan).",
        "Aspirate before injecting to avoid a blood vessel.",
        "Never give subcutaneously. Accidental injection into an artery or around a vein can cause gangrene.",
        "IV only if there is no alternative: concentration no more than 25 mg/mL, rate no faster than 25 mg per minute, into the tubing of a freely running IV in a large vein (US boxed warning).",
        "Stop at once if the patient complains of burning or pain, or the skin blanches or swells."
      ],
      monitor: [
        "Injection site for pain, swelling, pale or dusky skin over the next hours"
      ],
      cautions: [
        "Tissue injury from promethazine can need surgery. Report and refer early."
      ]
    },
    {
      title: "Allergic reaction at a health post",
      best_for: "Urticaria, itch or swelling; or after adrenaline in anaphylaxis.",
      requires: [
        "im"
      ],
      steps: [
        "Decide if it is anaphylaxis: breathing difficulty, wheeze, stridor, low blood pressure, collapse, or rapid swelling of lips and tongue. If yes, adrenaline IM first (see Adrenaline). Promethazine does not treat anaphylaxis.",
        "Skin symptoms only, or after adrenaline: promethazine 25–50 mg deep IM for an adult, or 10–25 mg orally if the patient can swallow.",
        "Children 2 years and older: dose by age from BNF for Children or the local protocol.",
        "Tell the patient not to drive or work with machinery; sedation can last hours."
      ],
      monitor: [
        "Breathing and blood pressure for at least several hours after anaphylaxis",
        "Sedation"
      ],
      cautions: [
        "Never under 2 years of age."
      ]
    }
  ],
  paediatric: [
    "Contraindicated under 2 years: fatal breathing depression has occurred (US boxed warning).",
    "Children 2 years and older: lower doses by age from BNF for Children. Children are more sensitive and may become excited rather than sedated (Kaplan).",
    "Not a routine sedative for children; do not use for a child with breathing problems or reduced consciousness."
  ],
  cautions: [
    "Sedation and breathing depression, added to opioids, benzodiazepines, alcohol, antipsychotics and tricyclics (Kaplan).",
    "Anticholinergic effects: urinary retention, constipation, glaucoma, confusion in older people (Kaplan).",
    "Hypotension and dizziness, severe in older people (Kaplan).",
    "Severe tissue injury if injected subcutaneously, into an artery or outside a vein.",
    "A phenothiazine: can lower the seizure threshold; rare neuroleptic malignant syndrome; minor QT prolongation.",
    "Can cause false pregnancy test results and raise blood glucose (Kaplan)."
  ],
  antidote: "No specific antidote. Supportive care: airway, breathing, IV fluids for hypotension. Physostigmine for severe anticholinergic delirium only with cardiac monitoring.",
  textbook: [
    {
      book: "kaplan",
      text: "Promethazine is used in psychiatry for sedation and anxiety; its sedative effect starts after 20–60 minutes and lasts 4–6 hours. It is metabolised by the liver.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2215"
    },
    {
      book: "kaplan",
      text: "Sedating antihistamines cause sedation, dizziness and hypotension, worse in older people, plus anticholinergic effects and occasional paradoxical excitement; overdose can be fatal. The chapter advises avoiding them in pregnancy and breastfeeding.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2217"
    },
    {
      book: "kaplan",
      text: "Sedation adds to alcohol, other sedatives, tricyclics and antipsychotics; anticholinergic effects add up. IM injections must be deep because superficial injection irritates tissue.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2218"
    },
    {
      book: "kaplan",
      text: "Antihistamines are an alternative to anticholinergics for drug-induced parkinsonism, acute dystonia and akathisia.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2216"
    },
    {
      book: "kaplan",
      text: "Episodic violent outbursts may respond to antipsychotics, benzodiazepines or antihistamines.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, pdf p. 2560"
    }
  ],
  sources: [
    {
      name: "NICE NG10 Violence and aggression: short-term management in mental health, health and community settings, 2015 (rapid tranquillisation)"
    },
    {
      name: "WHO Model Formulary 2008"
    },
    {
      name: "British National Formulary (BNF) and BNF for Children"
    },
    {
      name: "Taylor DM, Barnes TRE, Young AH. The Maudsley Prescribing Guidelines in Psychiatry, 14th ed. 2021"
    },
    {
      name: "US FDA boxed warning, promethazine injection (tissue injury, 2009) and promethazine under 2 years (respiratory depression)"
    },
    {
      name: "Royal College of Obstetricians and Gynaecologists. Nausea and vomiting of pregnancy and hyperemesis gravidarum, Green-top Guideline 69, 2016"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "lorazepam",
  name: "Lorazepam",
  aka: [
    "Ativan"
  ],
  cls: "Benzodiazepine (intermediate-acting)",
  cat: "psychiatry",
  wards: [
    "psychiatric",
    "emergency",
    "medical",
    "icu",
    "paediatric"
  ],
  tags: [
    "agitation",
    "rapid tranquillisation",
    "catatonia",
    "alcohol withdrawal",
    "status epilepticus",
    "benzodiazepine",
    "anxiety"
  ],
  presentation: [
    "Tablets 1 mg and 2 mg (other strengths exist).",
    "Injection 4 mg/mL (UK) or 2 mg/mL and 4 mg/mL (US), 1 mL. CHECK the strength.",
    "Injection must be kept in a fridge (2–8 °C) and protected from light: loses potency in heat.",
    "Often NOT stocked in Ethiopian facilities. Diazepam and midazolam (separate entries in this app) are the usual substitutes."
  ],
  indications: [
    "Acute agitation, especially when an antipsychotic is unsuitable (no ECG, heart disease, first episode, alcohol or stimulant cause)",
    "Catatonia: diagnostic challenge and treatment",
    "Alcohol withdrawal, particularly with liver disease or in older people",
    "Status epilepticus (first-line benzodiazepine where stocked)",
    "Acute dystonia not settling with an anticholinergic",
    "Short-term severe anxiety"
  ],
  standard: {
    summary: "Oral, IM or slow IV. One of only two benzodiazepines reliably absorbed IM (with midazolam). Short courses only. Watch breathing.",
    items: [
      {
        label: "Agitation, adult",
        text: "1–2 mg orally or IM (NICE NG10). Reassess after 30–60 minutes and repeat if needed. Many protocols (BNF) use a usual maximum of 4 mg in 24 hours for agitation; higher only with specialist advice. Older or frail: 0.5–1 mg."
      },
      {
        label: "Preparing the injection",
        text: "For IM: dilute with an equal volume of 0.9 % saline or water for injection just before use. For IV: dilute the same way and give slowly into a large vein, no faster than 2 mg per minute (product information)."
      },
      {
        label: "Catatonia",
        text: "Challenge: 1–2 mg IV, IM or orally, then re-examine (see method). If it helps, give regular doses, for example 1 mg every 4–6 hours as in the DSM case, increasing if the response is partial. Kaplan notes doses of 12 mg a day or more are sometimes needed: specialist advice. ECT is the definitive treatment (Kaplan)."
      },
      {
        label: "Alcohol withdrawal",
        text: "Give thiamine first (see Thiamine). Dose by symptoms, commonly 1–4 mg orally, IM or IV, with a daily reducing plan over about 5 days (Kaplan). Never miss doses of a short-acting benzodiazepine (Kaplan). Use a local symptom-scale protocol."
      },
      {
        label: "Status epilepticus",
        text: "0.1 mg/kg IV (maximum 4 mg), repeat once after 5–10 minutes if still seizing (Harrison and Nelson, see Diazepam and Midazolam entries)."
      }
    ]
  },
  improvised: [
    {
      title: "Catatonia: lorazepam challenge, or diazepam if lorazepam is not stocked",
      best_for: "Mute, staring, rigid or posturing patient who is not eating or drinking; in psychosis, mood disorder or medical illness.",
      requires: [
        "im",
        "oral"
      ],
      steps: [
        "Recognise catatonia: mutism, stupor, fixed staring, holding odd postures, rigidity, resisting being moved (negativism), limbs staying where you place them, copying words or movements, refusing food and fluids.",
        "Check temperature, pulse and blood pressure. Fever with rigidity and unstable vital signs in someone on antipsychotics: treat as neuroleptic malignant syndrome or malignant catatonia (see Haloperidol method) and refer urgently.",
        "Look for medical causes: glucose, malaria test, signs of meningitis or encephalitis, head injury, non-convulsive seizures, dehydration, drugs (DSM case: medical causes are often dangerous and must be sought).",
        "Before the dose, write down which catatonic signs are present, so you can compare.",
        "Give lorazepam 1–2 mg IV, IM (diluted) or as a tablet by mouth or under the tongue if swallowing is safe. The DSM case used 1 mg IV, repeated after 5 minutes.",
        "Lorazepam not stocked: diazepam 5–10 mg slowly IV, or 5–10 mg orally. Never IM diazepam (erratic absorption). Diazepam 10 mg is roughly equivalent to lorazepam 2 mg (Kaplan equivalence table).",
        "Re-examine the same signs once the dose has had time to work (minutes after IV, longer after IM or oral). Patients with catatonia often become more alert rather than sleepy (DSM case). Clear improvement supports the diagnosis.",
        "If helpful, continue regular doses and increase gradually if improvement is partial. Hold antipsychotics during acute catatonia (Maudsley): they can worsen it or trigger neuroleptic malignant syndrome.",
        "Meanwhile: fluids (oral, nasogastric or IV), food, turning and pressure care, moving the legs to prevent clots.",
        "No response, or life-threatening: refer for ECT (Kaplan: definitive treatment)."
      ],
      monitor: [
        "Breathing rate and sedation after each dose (catatonic patients often tolerate doses without sedation, DSM case)",
        "Temperature, pulse and blood pressure at least 4-hourly",
        "Fluid intake, urine output, weight",
        "Pressure areas"
      ],
      cautions: [
        "Catatonia itself kills through dehydration, starvation, clots and pressure sores (DSM case). Do not wait for a psychiatrist to start supportive care."
      ]
    },
    {
      title: "Benzodiazepine rapid tranquillisation when there is no ECG or the patient has heart disease",
      best_for: "Agitated adult or young person, first episode, known heart disease, alcohol or stimulant cause, or no ECG.",
      requires: [
        "im"
      ],
      steps: [
        "Offer oral lorazepam 1–2 mg first (older or frail 0.5–1 mg).",
        "If refused and the risk is high: lorazepam 1–2 mg IM, diluted 1:1 with saline or water (NICE NG10).",
        "Lorazepam not stocked: diazepam 10 mg orally, or 5–10 mg slowly IV over 2 minutes (Kaplan warns to go slowly to avoid respiratory arrest). Midazolam IM is an option only where staff can manage the airway (see Midazolam).",
        "Reassess after 30–60 minutes. Repeat within your protocol's limits.",
        "Do not give IM or IV lorazepam within 1 hour of IM olanzapine."
      ],
      monitor: [
        "After any sedating injection: pulse, blood pressure (if a cuff is available), breathing rate, temperature, hydration and level of consciousness at least every hour until there are no concerns. Every 15 minutes if the patient is asleep or heavily sedated, has taken alcohol or other drugs, has a physical illness, was restrained, or received more than the usual maximum dose (NICE NG10).",
        "No pulse oximeter: count breaths for a full minute, look at lip and tongue colour, and check the patient rouses to voice. Put a sedated patient in the recovery position. Call for help and prepare a bag-valve-mask if breathing is slow or shallow, colour is poor, or the patient cannot be roused."
      ],
      cautions: [
        "Paradoxical disinhibition and more aggression can occur, especially with brain injury or intellectual disability (Kaplan).",
        "Alcohol, opioids and other sedatives multiply the breathing depression (Kaplan)."
      ]
    },
    {
      title: "Alcohol withdrawal in a patient with liver disease or old age",
      best_for: "Medical ward or health centre; tremor, sweating, fast pulse, anxiety or hallucinations after stopping heavy drinking.",
      requires: [
        "oral"
      ],
      steps: [
        "Give thiamine before any glucose (see Thiamine).",
        "Lorazepam orally by symptoms, with no missed doses (Kaplan). Reduce the total daily dose step by step over about 5 days (Kaplan).",
        "If lorazepam is not stocked: diazepam, but with smaller doses given only when symptoms are present, because it builds up in liver disease and older people. Hold a dose if the patient is sleepy.",
        "Seizures: benzodiazepine is the treatment of choice (Kaplan).",
        "Severe hallucinations despite enough benzodiazepine: a small dose of haloperidol may be added, but it lowers the seizure threshold (Kaplan).",
        "Avoid restraint in delirium tremens: patients can fight to exhaustion (Kaplan). Give fluids, food, check glucose and look for infection, head injury and bleeding."
      ],
      monitor: [
        "Pulse, blood pressure, temperature, tremor, sweating, orientation every 1–4 hours while symptomatic",
        "Sedation and breathing before each dose",
        "Glucose"
      ],
      cautions: [
        "Delirium in someone who is not withdrawing from alcohol or benzodiazepines can be made worse by lorazepam (Kaplan)."
      ]
    }
  ],
  paediatric: [
    "Status epilepticus: 0.1 mg/kg IV or IO (maximum 4 mg), repeat once after 5–10 minutes.",
    "Rapid tranquillisation in children and young people: NICE NG10 recommends IM lorazepam; dose from BNF for Children or specialist advice.",
    "Paradoxical excitement is more common in children.",
    "Newborns: some injections contain benzyl alcohol and propylene glycol, which are toxic to neonates. Use only on specialist advice."
  ],
  cautions: [
    "Breathing depression, especially with opioids, alcohol, other sedatives, antipsychotics and IM olanzapine (Kaplan).",
    "Older people: falls, hip fractures and confusion (Kaplan). Use half doses.",
    "Liver disease: can precipitate hepatic coma with repeated or high doses (Kaplan).",
    "Myasthenia gravis, severe lung disease and sleep apnoea: breathing can fail.",
    "Dependence after more than 1–2 weeks of regular use; stop by tapering (Kaplan).",
    "Injection stored outside a fridge loses potency."
  ],
  antidote: "Support breathing first (bag-valve-mask). Flumazenil 0.2 mg IV over 30 seconds, then 0.3 mg, then 0.5 mg at 1-minute intervals up to 3 mg total (Kaplan). It can cause seizures in dependent patients and in mixed overdoses with tricyclics, and sedation can return.",
  calc: {
    type: "weight",
    dosePerKg: 0.1,
    doseUnit: "mg",
    conc: 4,
    concUnit: "mg/mL",
    maxDose: 4,
    label: "Status epilepticus dose (0.1 mg/kg, max 4 mg) at 4 mg/mL. CHECK the ampoule: 2 mg/mL also exists"
  },
  textbook: [
    {
      book: "kaplan",
      text: "Of the benzodiazepines, only lorazepam and midazolam are rapidly and reliably absorbed after IM injection.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.4 Anxiolytics, pdf p. 2114"
    },
    {
      book: "kaplan",
      text: "Lorazepam, at low doses (under 5 mg/day) or sometimes very high doses (12 mg/day or more), is regularly used for acute catatonia, though controlled trials are lacking; ECT is the definitive treatment.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.4 Anxiolytics, pdf p. 2117"
    },
    {
      book: "dsm",
      text: "A mute, rigid young man was given IV lorazepam 1 mg as a test dose, repeated after 5 minutes, then 1 mg every 4–6 hours; the rigidity resolved within 24 hours.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.7 Bizarrely Silent, pdf p. 113"
    },
    {
      book: "dsm",
      text: "Unlike most patients, people with catatonia often become more alert after a benzodiazepine, so low-dose lorazepam is both diagnostic and treatment.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.7 Bizarrely Silent, pdf p. 115"
    },
    {
      book: "kaplan",
      text: "Alcohol withdrawal: with a short-acting drug such as lorazepam no dose may be missed, because rapid falls in level can precipitate severe withdrawal.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 909"
    },
    {
      book: "kaplan",
      text: "Violent patients: diazepam 5–10 mg or lorazepam 2–4 mg can be given slowly IV over 2 minutes, with great care to avoid respiratory arrest.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, pdf p. 2560"
    },
    {
      book: "kaplan",
      text: "Flumazenil reverses benzodiazepine sedation: 0.2 mg IV over 30 seconds, then 0.3 mg, then 0.5 mg at 1-minute intervals to a total of 3 mg; it can precipitate seizures in dependent patients or mixed overdoses.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.4 Anxiolytics, pdf p. 2118"
    }
  ],
  sources: [
    {
      name: "NICE NG10 Violence and aggression: short-term management in mental health, health and community settings, 2015 (rapid tranquillisation)"
    },
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016 (Psychoses; Bipolar disorder; Substance use)"
    },
    {
      name: "WHO Model Formulary 2008"
    },
    {
      name: "British National Formulary (BNF) and BNF for Children"
    },
    {
      name: "Taylor DM, Barnes TRE, Young AH. The Maudsley Prescribing Guidelines in Psychiatry, 14th ed. 2021"
    },
    {
      name: "Lorazepam injection (Ativan), product information (SmPC and US label)"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "thiamine",
  name: "Thiamine (vitamin B1)",
  aka: [
    "Vitamin B1",
    "Aneurin",
    "Pabrinex (thiamine with other B vitamins and vitamin C)"
  ],
  cls: "Vitamin",
  cat: "nutrition",
  wards: [
    "emergency",
    "medical",
    "icu",
    "psychiatric",
    "maternity",
    "paediatric",
    "outpatient"
  ],
  tags: [
    "Wernicke encephalopathy",
    "Korsakoff",
    "alcohol withdrawal",
    "alcohol use disorder",
    "refeeding syndrome",
    "malnutrition",
    "hyperemesis gravidarum",
    "beriberi",
    "before glucose"
  ],
  presentation: [
    "Injection 100 mg/mL (1 mL and 2 mL ampoules are common; 50 mg/mL also exists). Read the strength on the ampoule before drawing up.",
    "Pabrinex IV High Potency (where stocked): a pair of ampoules No. 1 + No. 2 contains thiamine 250 mg with riboflavin, pyridoxine, nicotinamide and vitamin C. An IM version also exists.",
    "Tablets 50 mg and 100 mg (also 25 mg).",
    "Vitamin B complex tablets and injections contain only a few milligrams of thiamine per dose (check the label). They are NOT a treatment for Wernicke encephalopathy.",
    "Protect ampoules from light; thiamine breaks down in alkaline solutions."
  ],
  indications: [
    "Suspected or established Wernicke encephalopathy (treat on suspicion; do not wait for the classic triad)",
    "Prevention of Wernicke encephalopathy in alcohol withdrawal, alcohol dependence with malnutrition, or any at-risk patient before glucose",
    "Refeeding syndrome prevention in severe malnutrition, prolonged starvation, anorexia and prolonged vomiting",
    "Hyperemesis gravidarum with prolonged vomiting (before IV dextrose)",
    "Korsakoff syndrome (long-term oral treatment)",
    "Beriberi (wet or dry) and infantile beriberi"
  ],
  standard: {
    summary: "Parenteral thiamine at high dose for anyone who might have Wernicke encephalopathy, given before or with glucose. It is cheap and very safe; under-treatment causes permanent memory loss.",
    items: [
      {
        label: "Suspected or established Wernicke encephalopathy",
        text: "Royal College of Physicians / BNF practice: Pabrinex 2 pairs (thiamine 500 mg) IV in 50–100 mL 0.9 % saline or 5 % glucose over 30 minutes, three times daily for 3 days. With plain thiamine ampoules the commonly used equivalent is thiamine 500 mg IV over 30 minutes three times daily for 2–3 days (the EFNS 2010 guideline uses 200 mg three times daily). If there is a response, continue about 250 mg (1 pair) IV or IM once daily for 3–5 days or while improvement continues, then oral thiamine. Doses vary between guidelines: confirm with local protocol."
      },
      {
        label: "Prevention in high-risk patients",
        text: "NICE CG100: harmful or dependent drinkers who are malnourished (or at risk) or have decompensated liver disease AND attend the emergency department or are admitted with acute illness or injury should get parenteral thiamine followed by oral thiamine — for example Pabrinex 1 pair (thiamine 250 mg) IV or IM once daily for 3–5 days (RCP). Oral prophylaxis for others at risk, including during withdrawal: thiamine 200–300 mg daily in divided doses (BNF)."
      },
      {
        label: "Before glucose",
        text: "Give thiamine before or with any IV glucose in a malnourished or alcohol-dependent patient. Never delay glucose for proven hypoglycaemia — give both, thiamine first if it is in your hand."
      },
      {
        label: "Refeeding syndrome (NICE CG32)",
        text: "Oral thiamine 200–300 mg daily (or full-dose IV vitamin B preparation if oral route not possible) immediately before and during the first 10 days of feeding, with a vitamin B complex; replace potassium, phosphate and magnesium."
      },
      {
        label: "Korsakoff syndrome / after Wernicke",
        text: "Oral thiamine long term; Kaplan uses 100 mg two to three times daily for 3 to 12 months, with nutrition and abstinence support."
      },
      {
        label: "Magnesium",
        text: "Thiamine-dependent enzymes need magnesium. Low magnesium is common in alcohol dependence and can make Wernicke encephalopathy resistant to thiamine: replace it (see magnesium sulfate)."
      }
    ]
  },
  improvised: [
    {
      title: "High-dose IV thiamine from plain 100 mg/mL ampoules, by gravity",
      best_for: "Suspected Wernicke encephalopathy where Pabrinex is not stocked and there is no pump.",
      requires: [
        "iv",
        "macro_set"
      ],
      steps: [
        "Treat on suspicion. Any one of confusion, unsteady gait, abnormal eye movements (nystagmus, gaze palsy) or unexplained drowsiness in a person with heavy alcohol use, malnutrition, prolonged vomiting or starvation is enough.",
        "Draw 500 mg (5 mL of 100 mg/mL) into a 100 mL bag of 0.9 % saline. Label the bag. If only 50 mL bags exist, 50 mL is fine.",
        "Run over 30 minutes: 100 mL in 30 min = 200 mL/h = about 67 drops/min with a 20 drops/mL set (17 drops per 15 s); with a 15 drops/mL set, 50 drops/min.",
        "Give it three times a day (for example 06:00, 14:00, 22:00) for 2–3 days. Use the app's dose schedule to record doses.",
        "Start any glucose-containing fluid after the thiamine has started. If the patient is hypoglycaemic, give glucose at once and the thiamine immediately afterwards.",
        "Replace magnesium if the patient is malnourished or alcohol-dependent (magnesium sulfate IV or IM as per that entry) — resistant cases often have low magnesium.",
        "If eye signs, gait or confusion improve, continue thiamine 250 mg IV or IM daily for 3–5 days, then oral thiamine 100 mg three times daily."
      ],
      monitor: [
        "Eye movements, gait and orientation before each dose (eye signs often improve within hours to days)",
        "Glucose",
        "Pulse, BP and breathing during the first infusion",
        "Magnesium, potassium and phosphate where available"
      ],
      cautions: [
        "Anaphylaxis with IV thiamine is rare but reported: give over 30 minutes, not as a fast push, with adrenaline available.",
        "Confusion in alcohol withdrawal may also be delirium tremens, hypoglycaemia, head injury, hepatic encephalopathy, meningitis or sepsis — thiamine does not replace looking for these."
      ]
    },
    {
      title: "No IV access or confused and pulling lines: IM thiamine",
      best_for: "Agitated withdrawal, psychiatric ward, health centre, or any patient without a working cannula.",
      requires: [
        "im"
      ],
      steps: [
        "Use deep IM injection into the gluteal or lateral thigh muscle.",
        "Prevention dose: 100–250 mg IM once daily for 3–5 days.",
        "Suspected Wernicke encephalopathy with no IV: give the high dose IM, split into injections of no more than about 5 mL in an adult at each site (e.g. 500 mg = 5 mL of 100 mg/mL, or 2.5 mL in each buttock), three times daily, and try again to obtain IV access.",
        "If the patient is being sedated for withdrawal (e.g. diazepam), give the thiamine while they are calm and record which side was used.",
        "Kaplan's emergency table and consultation chapter both place IM or IV thiamine before glucose loading."
      ],
      monitor: [
        "Injection site",
        "Eye movements, gait and confusion daily",
        "Signs of anaphylaxis for 30 minutes after the first dose"
      ],
      cautions: [
        "IM injection is painful; large single-site volumes are poorly tolerated.",
        "Avoid IM in a patient with severe thrombocytopenia or coagulopathy from liver disease; use IV where possible."
      ]
    },
    {
      title: "Only oral thiamine or vitamin B complex in stock",
      best_for: "Health posts and pharmacies with no injectable thiamine; outpatient alcohol withdrawal.",
      requires: [
        "oral"
      ],
      steps: [
        "Understand why oral thiamine fails in Wernicke encephalopathy: absorption in the gut is by an active carrier that saturates at small doses, and alcohol, malnutrition and vomiting all reduce it further. A tablet cannot reliably raise brain thiamine quickly.",
        "Suspected Wernicke encephalopathy is therefore an emergency referral for injectable thiamine. While arranging transfer, give the largest oral dose available (e.g. 100 mg three times daily; higher oral doses rely on passive absorption) — it is better than nothing but not a substitute.",
        "Count the thiamine in vitamin B complex: most tablets contain only a few mg. Ten tablets may still be far below one 100 mg tablet, and high doses of other ingredients (e.g. pyridoxine, nicotinamide) can harm. Do not treat Wernicke encephalopathy with B complex.",
        "For prevention in a person who is still eating and has no neurological signs: oral thiamine 200–300 mg daily in divided doses during withdrawal and for several weeks, with food and a multivitamin (Kaplan: rest, nutrition and multivitamins containing thiamine).",
        "Give the patient and family a written warning: return at once for confusion, unsteadiness, double vision or drowsiness."
      ],
      monitor: [
        "Mental state, gait and eye movements at each contact",
        "Food intake and vomiting"
      ],
      cautions: [
        "Vomiting, diarrhoea or ongoing drinking make oral thiamine even less reliable — refer."
      ]
    },
    {
      title: "Starting feeds or dextrose in a starved patient (refeeding, hyperemesis, severe malnutrition)",
      best_for: "Medical, maternity and paediatric wards starting nutrition or glucose fluids in someone who has not eaten for days.",
      requires: [
        "oral"
      ],
      steps: [
        "Give thiamine BEFORE the first feed or glucose infusion: oral 200–300 mg daily in divided doses (adults), or IV/IM if vomiting, for the first 10 days of feeding (NICE CG32).",
        "Hyperemesis gravidarum: give thiamine before IV dextrose to any woman vomiting for weeks; if she is confused, ataxic or has abnormal eye movements, use the high-dose Wernicke regimen — Kaplan lists hyperemesis among causes of thiamine deficiency.",
        "Start feeds slowly and replace potassium, phosphate and magnesium where they can be measured or when there are clinical signs of deficiency.",
        "Children with severe acute malnutrition: follow the WHO F-75 protocol, which includes a vitamin mix; seek paediatric advice on added thiamine doses."
      ],
      monitor: [
        "Mental state and eye movements",
        "Heart rate, oedema and breathing (refeeding heart failure)",
        "Potassium, phosphate, magnesium and glucose where available"
      ],
      cautions: [
        "Refeeding syndrome can kill in the first days of feeding; thiamine alone does not prevent the electrolyte shifts."
      ]
    }
  ],
  paediatric: [
    "Infantile beriberi (breastfed infant of a thiamine-deficient mother: sudden heart failure, hoarse or absent cry, vomiting, seizures) is an emergency: give parenteral thiamine by paediatric protocol and treat the mother too. Confirm the dose with the local paediatric protocol or BNF for Children.",
    "Severe acute malnutrition: WHO therapeutic feeds contain vitamins; seek senior advice before adding high-dose thiamine."
  ],
  cautions: [
    "Very safe; excess is excreted in urine. Rare anaphylaxis with IV use: infuse over 30 minutes with adrenaline available.",
    "Do not give Wernicke-suspected patients oral thiamine or B complex alone.",
    "If there is no response to thiamine in apparent Wernicke–Korsakoff syndrome, consider niacin deficiency (alcoholic pellagra), low magnesium, or another diagnosis."
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Wernicke encephalopathy (ataxia, eye movement abnormalities, confusion) is fully reversible with treatment, whereas only about one in five patients with Korsakoff syndrome recovers; thiamine deficiency links the two.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 895"
    },
    {
      book: "kaplan",
      text: "Intravenous glucose rapidly uses up the remaining thiamine, so a patient with alcohol dependence should receive thiamine by injection before a glucose infusion.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.1 Consultation-Liaison Psychiatry, pdf p. 2522"
    },
    {
      book: "kaplan",
      text: "Early Wernicke encephalopathy responds rapidly to large parenteral doses of thiamine, which probably prevent progression to Korsakoff syndrome.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 915"
    },
    {
      book: "kaplan",
      text: "For alcohol-related disorders receiving IV glucose, adding thiamine 100 mg to each litre of glucose solution is good practice; the book's oral course is 100 mg two to three times daily for 1 to 2 weeks.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 915"
    },
    {
      book: "kaplan",
      text: "Korsakoff syndrome is also treated with oral thiamine 100 mg two to three times daily, continued for 3 to 12 months; if there is no response to thiamine, consider alcoholic pellagra (niacin deficiency).",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, pdf p. 919"
    },
    {
      book: "kaplan",
      text: "Emergency table: Wernicke encephalopathy is treated with thiamine 100 mg IV or IM, with magnesium sulfate, given before glucose loading.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, table of emergencies, pdf p. 2567"
    },
    {
      book: "kaplan",
      text: "Thiamine deficiency is not only alcohol-related: starvation, gastric cancer, haemodialysis, hyperemesis gravidarum and prolonged IV feeding also cause it.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 3.3 Major or Minor Neurocognitive Disorder due to Another Medical Condition (Amnestic Disorders), pdf p. 799"
    },
    {
      book: "kaplan",
      text: "Alcohol detoxification begins with a physical examination, then rest, adequate nutrition and multivitamins, particularly thiamine.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 4.2 Alcohol-Related Disorders, detoxification, pdf p. 907"
    }
  ],
  sources: [
    {
      name: "Thomson AD et al. The Royal College of Physicians report on alcohol: guidelines for managing Wernicke's encephalopathy in the accident and emergency department. Alcohol Alcohol 2002"
    },
    {
      name: "NICE CG100 Alcohol-use disorders: diagnosis and management of physical complications (2010, updated 2017)"
    },
    {
      name: "NICE CG32 Nutrition support for adults (2006, updated 2017) — refeeding syndrome"
    },
    {
      name: "Galvin R et al. EFNS guidelines for diagnosis, therapy and prevention of Wernicke encephalopathy. Eur J Neurol 2010"
    },
    {
      name: "BNF: thiamine; Pabrinex product information"
    },
    {
      name: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "lithium",
  name: "Lithium carbonate",
  aka: [
    "Lithium",
    "Priadel",
    "Camcolit",
    "Eskalith"
  ],
  cls: "Mood stabiliser",
  cat: "psychiatry",
  wards: [
    "psychiatric",
    "outpatient",
    "medical",
    "emergency",
    "icu"
  ],
  tags: [
    "bipolar disorder",
    "mania",
    "mood stabiliser",
    "lithium toxicity",
    "narrow therapeutic index",
    "suicide prevention"
  ],
  presentation: [
    "Lithium carbonate 300 mg tablets or capsules (also 250 mg); modified-release 200 mg and 400 mg (e.g. Priadel).",
    "Different brands and modified-release forms are NOT interchangeable dose for dose: prescribe and dispense the same brand, and recheck the level after any switch.",
    "Lithium citrate liquid exists; its mg strength is not equivalent to lithium carbonate mg."
  ],
  indications: [
    "Bipolar disorder: long-term prevention of manic and depressive relapse",
    "Acute mania (slow onset; usually with an antipsychotic or benzodiazepine at first)",
    "Augmentation in treatment-resistant depression (specialist)",
    "Reduces suicide risk in mood disorders"
  ],
  standard: {
    summary: "Effective but with a narrow margin between the effective and toxic level. It is safe only where the level, kidney function and sodium can be checked, and where patients understand dehydration and sick-day rules.",
    items: [
      {
        label: "When to use (mhGAP)",
        text: "WHO mhGAP 2.0: consider lithium for bipolar disorder only where clinical and laboratory monitoring are available. Where levels cannot be measured, choose another mood stabiliser or antipsychotic (valproate — not in women and girls who could become pregnant — carbamazepine, haloperidol or olanzapine)."
      },
      {
        label: "Before starting",
        text: "Creatinine (eGFR), sodium and potassium, TSH, weight, blood pressure, ECG if cardiac disease or risk factors, pregnancy test in women who could become pregnant (Kaplan; NICE CG185). Ask about fainting, known heart disease and family sudden death under 45."
      },
      {
        label: "Starting dose",
        text: "Doses differ between brands and between standard and modified-release forms: follow the BNF or product information for the brand you stock, and confirm with local protocol. Kaplan's standard-release start is 300 mg three times daily in most adults, but 300 mg once or twice daily in older people or kidney impairment. Where monitoring is limited, a low start (for example a single evening dose) with small increases guided by levels is safer."
      },
      {
        label: "Levels (where available)",
        text: "Take the sample 12 hours after the last dose, 5–7 days after starting or any dose change, and weekly until stable; then every 3 months for the first year and every 6 months after (every 3 months in older people, kidney impairment, interacting drugs, or poor adherence). Target 0.6–0.8 mmol/L for maintenance; up to 0.8–1.0 mmol/L if relapse on the lower range or in acute mania. Kidney function and TSH every 6 months (NICE CG185). Do not use a lithium–heparin blood tube (falsely high)."
      },
      {
        label: "Toxicity",
        text: "Usually above 1.5 mmol/L, but it can occur within the normal range, especially in older people and in chronic accumulation. Stop lithium, restore fluid with 0.9 % saline, stop interacting drugs, check creatinine, sodium, potassium, glucose, ECG. Haemodialysis for severe neurological features (reduced consciousness, seizures), arrhythmia, or level above 4.0 mmol/L with kidney impairment (EXTRIP 2015; Kaplan). Activated charcoal does NOT bind lithium."
      },
      {
        label: "Stopping",
        text: "Taper over at least 4 weeks (ideally longer) unless toxicity; abrupt stopping causes rebound mania."
      }
    ]
  },
  improvised: [
    {
      title: "When serum lithium levels cannot be measured: decide, then monitor clinically",
      best_for: "District hospitals and health centres with no lithium assay, or a referral laboratory that is slow or intermittent.",
      requires: [
        "oral",
        "bp"
      ],
      steps: [
        "Do not START lithium where no level can ever be measured (mhGAP). Use valproate (not in women and girls who could become pregnant), carbamazepine, or an antipsychotic instead.",
        "A patient already stable on lithium who can no longer get levels: do not stop suddenly (relapse risk). Keep the same brand and dose that gave a known safe level, never increase the dose without a level, and plan transfer to an alternative or to a site with monitoring.",
        "If you can measure creatinine and sodium but not lithium, do so at least every 3–6 months and whenever the patient is unwell; a rising creatinine or falling sodium means lithium is accumulating — reduce or withhold and seek advice.",
        "At every visit ask and look for: coarse tremor (hands shake so a cup spills — a fine tremor is common and usually harmless), unsteady walking, slurred speech, new confusion or drowsiness, vomiting, diarrhoea, muscle twitching. Any of these = withhold lithium today and assess for toxicity.",
        "Also check: blood pressure, pulse (slow or irregular pulse suggests sinus node effect), weight, thirst and urine volume, neck swelling (goitre), tiredness and weight gain (hypothyroidism).",
        "Review every medicine the patient takes, including medicines bought in pharmacies: ibuprofen, diclofenac and other NSAIDs, diuretics, ACE inhibitors and metronidazole raise lithium (Kaplan). Paracetamol is the safe painkiller.",
        "In women who could become pregnant, confirm reliable contraception and plan for pregnancy before it happens."
      ],
      monitor: [
        "Toxicity symptoms and gait at every contact",
        "BP, pulse and weight",
        "Creatinine and sodium where available",
        "Thyroid symptoms; TSH yearly if possible"
      ],
      cautions: [
        "Older people, people with kidney disease, heart failure or low salt diets develop toxicity at 'normal' doses (Kaplan).",
        "Clinical monitoring reduces but does not remove the risk; document the discussion of risks with the patient and family."
      ]
    },
    {
      title: "Suspected lithium toxicity with no lithium level and no dialysis on site",
      best_for: "Emergency and medical wards where lithium assay and dialysis are not available.",
      requires: [
        "iv",
        "macro_set",
        "bp"
      ],
      steps: [
        "Suspect toxicity in anyone on lithium with vomiting, diarrhoea, coarse tremor, unsteadiness, slurred speech, confusion, myoclonus, brisk reflexes, seizures or reduced consciousness — even if they took their usual dose (chronic toxicity).",
        "STOP lithium. Stop NSAIDs, diuretics (including furosemide), ACE inhibitors and metronidazole.",
        "Do NOT give activated charcoal for lithium (it does not bind). Do not use furosemide or mannitol to 'wash out' lithium: diuretics cause dehydration and forced diuresis is unproven.",
        "Restore circulating volume and urine flow with 0.9 % saline: in an adult without heart failure, for example 1 litre over 1–2 hours by gravity (a 20 drops/mL set at about 160–330 drops/min is too fast to count — use the bag markings every 15 minutes), then adjust to keep urine output at least 1 mL/kg/h and the patient clinically well hydrated. Use smaller volumes and frequent chest checks in older people and heart or kidney disease.",
        "Treat seizures with a benzodiazepine (see diazepam or midazolam). Check glucose.",
        "Measure creatinine, sodium and potassium if any laboratory is available; lithium can cause nephrogenic diabetes insipidus with large urine volumes and high sodium — if urine output is very high and the patient is thirsty or sodium is rising, seek advice before giving more saline.",
        "Refer urgently for haemodialysis (arrange transfer early, the journey takes time) if there is reduced consciousness, seizures, a slow or irregular pulse or low BP, worsening despite 6 hours of fluids, falling urine output or known kidney failure.",
        "Neurological recovery lags behind the fall in lithium by days (Kaplan): improvement may be slow even with correct treatment. Do not restart lithium until fully recovered and specialist review."
      ],
      monitor: [
        "Conscious level, tremor, gait and reflexes every 1–2 h",
        "Urine output hourly (catheter if confused)",
        "Pulse, BP, breathing; ECG if available (bradycardia, QT, T-wave changes)",
        "Fluid balance and chest (overload)",
        "Sodium and creatinine where available"
      ],
      cautions: [
        "Chronic toxicity (accumulation over weeks from dehydration, kidney decline or a new drug) is more dangerous at a given level than an acute single overdose.",
        "Modified-release overdose may keep absorbing for many hours: observe for at least 24 hours."
      ]
    },
    {
      title: "Sick-day rules and dehydration counselling for patients and families",
      best_for: "Outpatient follow-up and discharge from the psychiatric ward, especially in hot climates, manual work, and during religious fasting.",
      requires: [],
      steps: [
        "Drink regularly (about 2–3 litres a day in hot weather or heavy work) and keep a normal amount of salt in food; do not start a salt-free diet (Kaplan).",
        "If you have vomiting, diarrhoea, fever or cannot eat and drink: STOP lithium and come to the clinic the same day. Restart only when eating and drinking normally for 24–48 hours, or after a check.",
        "During fasting without fluids in the day (e.g. Ramadan), in heat waves or long travel on foot, discuss in advance: a dose reduction or avoiding lithium during that period may be needed.",
        "Never buy painkillers for joint or back pain (ibuprofen, diclofenac, 'anti-inflammatories') without telling the pharmacist you take lithium. Use paracetamol.",
        "Know the warning signs: shaking hands that spill drinks, unsteady walking, slurred speech, confusion, severe diarrhoea — come immediately.",
        "Keep a lithium card or note with the brand, dose, last level and clinic phone number."
      ],
      monitor: [
        "Understanding: ask the patient to repeat back the sick-day rule",
        "Family member knows the warning signs"
      ],
      cautions: [
        "Lithium is lethal in overdose. For a patient at risk of suicide, dispense small quantities and involve family in holding supplies."
      ]
    }
  ],
  paediatric: [
    "Specialist use only in children and adolescents. Adolescents use similar serum levels to adults (Kaplan); weight gain and acne are common reasons for stopping.",
    "Not usually used in children under 12 years."
  ],
  cautions: [
    "Narrow therapeutic index; toxicity may occur within the reference range, especially in the elderly.",
    "Kidney impairment, dehydration, low-sodium diet, heart failure, Addison disease: avoid or use with specialist monitoring.",
    "Hypothyroidism, hyperparathyroidism (raised calcium), nephrogenic diabetes insipidus and long-term reduced kidney function.",
    "Contraindicated in sick sinus syndrome (Kaplan); caution with other cardiac conduction disease and Brugada syndrome.",
    "Pregnancy: avoid in the first trimester if possible (Ebstein anomaly); high risk of neonatal and maternal toxicity around delivery — see Safety tab.",
    "Stop 24 hours before major surgery or ECT where possible (Kaplan: 2 days before ECT), restart when eating and drinking and kidney function normal."
  ],
  antidote: "No antidote. Stop lithium, restore fluids with 0.9 % saline, avoid diuretics and NSAIDs; haemodialysis for severe toxicity.",
  textbook: [
    {
      book: "kaplan",
      text: "Risk factors for lithium toxicity are excessive dose, renal impairment, a low-sodium diet, interacting drugs and dehydration; elderly people are more vulnerable.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2059"
    },
    {
      book: "kaplan",
      text: "Early toxicity: coarse tremor, slurred speech, unsteadiness, gastrointestinal upset; later: impaired consciousness, twitching, myoclonus, seizures and coma.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2059"
    },
    {
      book: "kaplan",
      text: "Lithium toxicity is a medical emergency: stop lithium and treat dehydration; activated charcoal does not bind lithium.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2060"
    },
    {
      book: "kaplan",
      text: "Severe toxicity needs haemodialysis; levels rebound from tissue stores so dialysis may need repeating, and neurological recovery lags behind the fall in serum lithium by days.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, Table 21-29, pdf p. 2061"
    },
    {
      book: "kaplan",
      text: "Book starting dose is 300 mg three times daily for most adults, but 300 mg once or twice daily in elderly people or renal impairment.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2064"
    },
    {
      book: "kaplan",
      text: "Many NSAIDs (including ibuprofen, diclofenac, indomethacin, naproxen) reduce lithium clearance and raise levels; thiazide and potassium-sparing diuretics and ACE inhibitors also raise levels.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2063"
    },
    {
      book: "kaplan",
      text: "Clinical toxicity is well documented at or just above the upper therapeutic limit, especially in elderly people: combine levels with clinical judgement.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2066"
    },
    {
      book: "kaplan",
      text: "Maintenance range 0.4–0.8 mEq/L; higher levels (about 1.0–1.2) are used for acute mania; treat the patient, not the laboratory result.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2067"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016 (Psychoses module: bipolar disorder)"
    },
    {
      name: "NICE CG185 Bipolar disorder: assessment and management (2014, updated 2023)"
    },
    {
      name: "BNF: lithium carbonate"
    },
    {
      name: "Decker BS et al. Extracorporeal treatment for lithium poisoning: EXTRIP recommendations. Clin J Am Soc Nephrol 2015"
    },
    {
      name: "WHO Model Formulary 2008"
    },
    {
      name: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "sodium-valproate",
  name: "Sodium valproate (valproic acid)",
  aka: [
    "Valproate",
    "Valproic acid",
    "Epilim",
    "Depakine",
    "Depakote (divalproex)",
    "Epival"
  ],
  cls: "Anticonvulsant / mood stabiliser",
  cat: "psychiatry",
  wards: [
    "psychiatric",
    "emergency",
    "medical",
    "paediatric",
    "icu",
    "outpatient"
  ],
  tags: [
    "epilepsy",
    "status epilepticus",
    "mania",
    "bipolar disorder",
    "generalised seizures",
    "absence",
    "myoclonic",
    "migraine prophylaxis",
    "teratogen"
  ],
  presentation: [
    "Enteric-coated tablets 200 mg and 500 mg (swallow whole — do not crush); modified-release 200, 300, 500 mg.",
    "Oral solution or syrup 200 mg/5 mL (sugar-free forms exist).",
    "IV powder 400 mg vial, reconstituted to 100 mg/mL (or solution 100 mg/mL). Not stocked in many hospitals.",
    "Divalproex sodium (Depakote) and valproic acid have similar mg-for-mg dosing in practice; check local product."
  ],
  indications: [
    "Epilepsy: generalised tonic-clonic, absence, myoclonic and focal seizures",
    "Established status epilepticus after benzodiazepines (IV loading)",
    "Bipolar disorder: acute mania and maintenance",
    "Migraine prophylaxis (not in women and girls who could become pregnant)"
  ],
  standard: {
    summary: "Broad-spectrum and well tolerated, with less sedation and respiratory depression than phenobarbital or phenytoin — but the most harmful antiepileptic in pregnancy. Do not start it in a woman or girl who could become pregnant unless there is no alternative and a pregnancy prevention plan is in place.",
    items: [
      {
        label: "Women and girls who could become pregnant",
        text: "EMA/MHRA pregnancy prevention programme (2018, strengthened 2024): do not use unless other treatments are ineffective or not tolerated; effective contraception, a pregnancy test before starting, and a documented risk discussion. In bipolar disorder do not use in pregnancy. About 1 in 10 exposed babies have malformations and up to 4 in 10 have neurodevelopmental problems. MHRA 2024 also advises that new patients under 55 (male or female) start only when two specialists agree no alternative is suitable, and has flagged a possible risk from paternal use — confirm with local guidance."
      },
      {
        label: "Epilepsy, adult",
        text: "BNF: 600 mg daily in 1–2 divided doses, increasing by 150–300 mg every 3 days; usual maintenance 1–2 g daily (20–30 mg/kg/day); maximum 2.5 g daily."
      },
      {
        label: "Epilepsy, child (1 month–11 years)",
        text: "BNF for Children: 10–15 mg/kg/day in 1–2 divided doses (maximum 600 mg to start), increased to usual maintenance 25–30 mg/kg/day in 2 divided doses. Confirm with local protocol."
      },
      {
        label: "Status epilepticus (IV)",
        text: "After two benzodiazepine doses: 20–40 mg/kg IV (maximum 3,000 mg) over about 10 minutes. Harrison quotes 20–30 mg/kg; Nelson and the American Epilepsy Society 2016 guideline use 40 mg/kg. Confirm with local protocol. Avoid in known liver disease, suspected metabolic or mitochondrial disease, and children under 2 years with seizures of unknown cause."
      },
      {
        label: "Mania",
        text: "Kaplan: oral loading 20–30 mg/kg/day in divided doses for acute mania (well tolerated, faster control), or start 250 mg with a meal and build up over 3–6 days; usual 1,200–1,500 mg/day (range 750–2,500 mg/day). WHO mhGAP starts at 500 mg/day and increases to 1,000–2,000 mg/day. Once stable the daily dose can be taken at night."
      },
      {
        label: "Monitoring",
        text: "Baseline liver tests, full blood count with platelets, and pregnancy test (Kaplan). Repeat liver tests and platelets in the first 6 months and before surgery. Levels (50–100 mg/L) help with adherence or toxicity only. Symptoms matter more than routine tests (Kaplan)."
      }
    ]
  },
  improvised: [
    {
      title: "IV valproate loading in status epilepticus by timed syringe push",
      best_for: "Seizures continuing after two benzodiazepine doses, no pump and no cardiac monitor; valproate causes little hypotension or respiratory depression.",
      requires: [
        "iv"
      ],
      steps: [
        "Check contraindications quickly: known liver disease, suspected metabolic disease or child under 2 years with unexplained seizures (use phenobarbital instead), known or possible pregnancy (use phenytoin or phenobarbital if available).",
        "Reconstitute each 400 mg vial with the supplied 4 mL water: 100 mg/mL.",
        "Dose: 20–40 mg/kg (maximum 3,000 mg); the app calculator uses 20 mg/kg. Example: 50 kg × 20 mg/kg = 1,000 mg = 10 mL; 40 mg/kg = 2,000 mg = 20 mL.",
        "Draw into a syringe and push over about 10 minutes, dividing the volume by the clock: for 10 mL give 1 mL every minute; for 20 mL give 2 mL every minute. It can also be diluted in 0.9 % saline or 5 % glucose to double the volume for easier timing.",
        "Flush with 0.9 % saline before and after. Valproate is compatible with saline, glucose and Ringer's lactate.",
        "If seizures continue 10 minutes after the dose, move to the next drug (phenobarbital or phenytoin) and call for airway support.",
        "Continue maintenance orally or via NG tube (syrup; do not crush enteric-coated tablets) at the usual daily dose in 2 divided doses, starting 12 hours after the load."
      ],
      monitor: [
        "Seizure activity and conscious level",
        "Breathing and oxygen saturation where available",
        "Pulse and BP every 15 min for 1 h",
        "Glucose"
      ],
      cautions: [
        "Hyperammonaemic encephalopathy (drowsiness, vomiting, confusion with normal liver tests) can follow, especially with carbamazepine or phenobarbital, or in urea-cycle disorders.",
        "Carbapenem antibiotics (meropenem, imipenem) lower valproate levels so much that seizures return — avoid the combination."
      ]
    },
    {
      title: "Starting and continuing valproate where blood tests are rarely available",
      best_for: "Outpatient epilepsy and bipolar clinics without routine liver tests, platelet counts or drug levels.",
      requires: [
        "oral"
      ],
      steps: [
        "Before starting: ask about liver disease, jaundice, heavy alcohol use, pancreatitis, bleeding or bruising, and known metabolic disease; examine for jaundice and liver size. Do a urine pregnancy test in any woman or girl who could become pregnant.",
        "Start low and increase every 3–7 days (e.g. 200–250 mg twice daily in adults) to reduce nausea and sedation.",
        "Kaplan notes that even frequent blood tests do not reliably predict severe liver toxicity: teaching is the main safety test. Tell the patient and family to stop and come the same day for: vomiting, loss of appetite, abdominal pain, lethargy, jaundice, swelling of legs or face, unusual bruising or bleeding, or new confusion.",
        "Pancreatitis usually appears in the first 6 months: severe upper abdominal pain with vomiting means stop valproate and admit.",
        "If liver tests or platelets can be done once, do them 1–3 months after starting and before any surgery.",
        "Check weight and menstrual pattern in young women (weight gain, polycystic ovary features) and tremor at each visit.",
        "Titrate by clinical response (fewer seizures; mood stable) and by side effects. Tremor, unsteadiness or drowsiness after a dose increase usually means the level is high: go back to the previous dose."
      ],
      monitor: [
        "Seizure diary or mood chart",
        "Jaundice, abdominal pain, bruising at every visit",
        "Weight, tremor, sedation",
        "Pregnancy status and contraception"
      ],
      cautions: [
        "Highest liver risk: children under 3 years, multiple antiepileptics (especially with phenobarbital), and metabolic disease (Kaplan)."
      ]
    },
    {
      title: "A woman or girl who could become pregnant, and valproate is the only stocked option",
      best_for: "Health centres where valproate is available but lamotrigine, levetiracetam or antipsychotics are not.",
      requires: [
        "oral"
      ],
      steps: [
        "First look for an alternative that is stocked: epilepsy — carbamazepine (focal and tonic-clonic seizures) or phenobarbital; bipolar disorder — an antipsychotic such as haloperidol or olanzapine, or carbamazepine; migraine — do not use valproate.",
        "If valproate is truly the only option: explain in plain words that valproate taken in pregnancy commonly harms the baby's development and can cause spina bifida and other malformations, and record the discussion.",
        "Arrange effective contraception before the first dose. Valproate does not reduce the effect of hormonal methods, so implants, injections (DMPA), IUDs and pills can all be used; long-acting methods are most reliable.",
        "Urine pregnancy test before starting and whenever a period is missed.",
        "Give folic acid (5 mg daily is widely used with antiepileptics; confirm local practice) — it does not remove the valproate risk.",
        "If she becomes pregnant while taking valproate for epilepsy: do NOT stop it suddenly (status epilepticus harms mother and baby). Refer urgently to plan a switch. For bipolar disorder, seek urgent specialist advice to change treatment.",
        "Review every year whether an alternative has become available."
      ],
      monitor: [
        "Contraception use at every visit",
        "Pregnancy test when periods are late"
      ],
      cautions: [
        "Girls reach childbearing age during treatment: plan from diagnosis, not from first period."
      ]
    }
  ],
  paediatric: [
    "Epilepsy 1 month–11 years: 10–15 mg/kg/day in 1–2 doses, usual maintenance 25–30 mg/kg/day in 2 divided doses (BNF for Children).",
    "Status epilepticus: 20–40 mg/kg IV (Nelson: 40 mg/kg). Avoid in children under 2 years with unexplained seizures or suspected metabolic/mitochondrial disease (e.g. POLG), where fatal liver failure occurs.",
    "Fatal hepatotoxicity risk is highest under 3 years, with multiple antiepileptics and with developmental delay (Kaplan).",
    "Avoid aspirin in children on valproate (bleeding and raised valproate levels)."
  ],
  cautions: [
    "Pregnancy: major teratogen — see Safety tab.",
    "Liver failure (rare, mostly young children), pancreatitis (first 6 months), thrombocytopenia and platelet dysfunction, hyperammonaemic encephalopathy.",
    "Weight gain, hair loss, tremor, polycystic ovary features.",
    "Hyponatraemia at doses above about 1 g/day (Kaplan).",
    "Overdose can cause coma and death; enteric-coated and modified-release tablets absorb late."
  ],
  calc: {
    type: "weight",
    dosePerKg: 20,
    doseUnit: "mg",
    conc: 100,
    concUnit: "mg/mL",
    maxDose: 3000,
    label: "Status epilepticus load 20 mg/kg (guidelines 20–40 mg/kg, max 3 g) at 100 mg/mL, over about 10 min"
  },
  textbook: [
    {
      book: "kaplan",
      text: "Risk factors for fatal hepatotoxicity: age under 3 years, concurrent phenobarbital, and neurological disorders, especially inborn errors of metabolism.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2072"
    },
    {
      book: "kaplan",
      text: "Lethargy, malaise, anorexia, nausea and vomiting, oedema or abdominal pain on valproate must raise the possibility of severe hepatotoxicity; a modest rise in liver enzymes does not predict it.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2074"
    },
    {
      book: "kaplan",
      text: "Pancreatitis is rare, usually within the first 6 months, and occasionally fatal.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2074"
    },
    {
      book: "kaplan",
      text: "First-trimester exposure carries neural tube defect and other malformation risks, and children exposed in utero have lower IQ at 6 years and possibly more autism.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2074"
    },
    {
      book: "kaplan",
      text: "Valproate raises levels of carbamazepine, diazepam, amitriptyline and phenobarbital and lowers phenytoin; carbamazepine lowers valproate; amitriptyline and fluoxetine may raise valproate.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2077"
    },
    {
      book: "kaplan",
      text: "Acute mania: oral loading 20–30 mg/kg/day; otherwise start 250 mg with a meal and increase to 250 mg three times daily over 3–6 days.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2079"
    },
    {
      book: "kaplan",
      text: "Even frequent blood monitoring may not predict severe organ toxicity; teaching patients to seek prompt review for any illness is more prudent.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2079"
    },
    {
      book: "kaplan",
      text: "About two-thirds of patients with acute mania respond; valproate is preferred to lithium for acute mania in children and elderly people.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2071"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016 (Epilepsy and Psychoses modules)"
    },
    {
      name: "BNF and BNF for Children: sodium valproate"
    },
    {
      name: "MHRA Drug Safety Update: valproate pregnancy prevention programme (2018) and new safety measures (2024)"
    },
    {
      name: "Glauser T et al. Evidence-based guideline: treatment of convulsive status epilepticus. American Epilepsy Society, Epilepsy Curr 2016"
    },
    {
      name: "NICE CG185 Bipolar disorder (valproate in women of childbearing potential)"
    },
    {
      name: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "carbamazepine",
  name: "Carbamazepine",
  aka: [
    "Tegretol",
    "Carbatrol",
    "Equetro"
  ],
  cls: "Anticonvulsant / mood stabiliser",
  cat: "psychiatry",
  wards: [
    "psychiatric",
    "outpatient",
    "medical",
    "paediatric",
    "emergency"
  ],
  tags: [
    "epilepsy",
    "focal seizures",
    "tonic-clonic",
    "bipolar disorder",
    "mania",
    "trigeminal neuralgia",
    "neuropathic pain",
    "enzyme inducer",
    "Stevens-Johnson syndrome",
    "hyponatraemia",
    "agranulocytosis"
  ],
  presentation: [
    "Tablets 200 mg (also 100 mg and 400 mg); chewable 100 mg.",
    "Modified-release tablets 200 mg and 400 mg (swallow whole); not interchangeable dose for dose with standard tablets.",
    "Oral suspension 100 mg/5 mL.",
    "No injection. Suppositories exist but are rarely stocked."
  ],
  indications: [
    "Epilepsy: focal seizures and generalised tonic-clonic seizures (NOT absence or myoclonic seizures, which it can worsen)",
    "Trigeminal neuralgia (first-line)",
    "Bipolar disorder: acute mania and prevention when lithium or valproate are unsuitable",
    "Neuropathic pain (second-line) and adjunct in alcohol withdrawal (benzodiazepines are more effective)"
  ],
  standard: {
    summary: "Start low and go slow. The main dangers are serious skin reactions in the first months, low sodium, rare blood disorders, and the many medicines it makes ineffective — including dolutegravir, TB-regimen partners, hormonal contraception and steroids.",
    items: [
      {
        label: "Epilepsy, adult",
        text: "BNF: 100–200 mg once or twice daily, increased by 100–200 mg every 2 weeks; usual maintenance 0.8–1.2 g daily in divided doses; maximum 2 g daily."
      },
      {
        label: "Epilepsy, child",
        text: "BNF for Children (1 month–11 years): 5 mg/kg at night or 2.5 mg/kg twice daily, increased by 2.5–5 mg/kg every 3–7 days; usual maintenance 5 mg/kg two to three times daily; maximum 20 mg/kg/day. Confirm with local protocol."
      },
      {
        label: "Trigeminal neuralgia",
        text: "100 mg once or twice daily, increased gradually; usual 200 mg three to four times daily; maximum 1.6 g daily. Reduce to the lowest effective dose in remission."
      },
      {
        label: "Bipolar disorder",
        text: "Kaplan: 200 mg at bedtime to start (600–800 mg/day in divided doses for manic inpatients), titrate slowly; typical antimanic dose 600–1,800 mg/day (anticonvulsant levels 4–12 mg/L). Enzyme autoinduction over 2–3 weeks may need a small dose rise."
      },
      {
        label: "Before starting",
        text: "Full blood count, sodium, liver tests where available; ECG if over 40 or cardiac disease (Kaplan). Screen for HLA-B*1502 in people of Han Chinese, Thai or other South-East Asian ancestry (very high Stevens–Johnson/TEN risk) — not needed routinely for people of Ethiopian ancestry. Check all co-medications and contraception."
      },
      {
        label: "Stop rules",
        text: "Any rash: stop and review (Kaplan). Fever, sore throat, mouth ulcers, bruising or bleeding: urgent full blood count; stop if neutrophils below 1.5 × 10⁹/L or platelets below 100 × 10⁹/L. Confusion, headache, vomiting or seizures increasing: check sodium."
      }
    ]
  },
  improvised: [
    {
      title: "Safe start without routine blood counts, sodium or levels",
      best_for: "Outpatient epilepsy, bipolar and pain clinics where laboratory tests are occasional.",
      requires: [
        "oral"
      ],
      steps: [
        "Start at the lowest dose (adult 100–200 mg at night) and increase no faster than every 1–2 weeks. Most side effects (dizziness, double vision, unsteadiness, nausea) come from increasing too quickly.",
        "Teach the rash rule clearly: any new rash, blistering, mouth or eye soreness, or fever with rash in the first 3 months — stop the tablets and come the same day. Stevens–Johnson syndrome risk is highest in the first 8 weeks and is higher in people with HIV.",
        "Teach the blood rule: fever, sore throat, mouth ulcers, bleeding gums, bruising or pinpoint spots — come for a blood count the same day (Kaplan: teaching is more useful than frequent routine counts).",
        "Low sodium: older people and those on diuretics are at most risk. New headache, confusion, vomiting, drowsiness or more seizures — check sodium if possible; if not, withhold the next dose and refer.",
        "Toxic level signs replace a blood level: double vision, nystagmus, unsteady walking and drowsiness 2–4 hours after doses mean the dose is too high — reduce to the previous step.",
        "At 2–3 weeks the drug speeds its own breakdown (autoinduction); seizures may return briefly and need one small increase.",
        "Review every other medicine at each visit — see the Interactions tab (dolutegravir, TB drugs, contraception, steroids, nifedipine, midazolam, valproate, phenytoin)."
      ],
      monitor: [
        "Skin and mouth at each visit for the first 3 months",
        "Gait, nystagmus and drowsiness",
        "Seizure diary or mood chart",
        "Sodium and full blood count when symptoms occur or when a laboratory is available (at least once in the first 3 months)"
      ],
      cautions: [
        "Avoid in atrioventricular block, history of bone marrow depression, and acute porphyria.",
        "It can worsen absence and myoclonic seizures — if these occur, change drug."
      ]
    },
    {
      title: "Carbamazepine with HIV, TB treatment or contraception: an interaction plan",
      best_for: "Ethiopian clinics where many patients with epilepsy or bipolar disorder also take dolutegravir-based ART, TB treatment or hormonal contraception.",
      requires: [
        "oral"
      ],
      steps: [
        "Before starting carbamazepine, list every medicine. Carbamazepine strongly induces liver enzymes and lowers many drugs.",
        "On dolutegravir (TLD) or dolutegravir-containing PEP: avoid carbamazepine if possible (use valproate — not in women and girls who could become pregnant — or seek HIV specialist advice). If there is no alternative, the dolutegravir product information advises 50 mg twice daily in adults; confirm with the HIV programme.",
        "On TB treatment: isoniazid raises carbamazepine (toxicity: drowsiness, unsteadiness, vomiting) while rifampicin lowers it (breakthrough seizures). Discuss with the TB clinician; watch closely during the first weeks and after stopping either drug.",
        "Contraception: carbamazepine makes pills, patches and implants unreliable. Use a copper IUD, levonorgestrel IUD or DMPA injection (at the usual interval — confirm with national family planning guidance). Emergency levonorgestrel needs a double dose or copper IUD.",
        "Steroids (dexamethasone, hydrocortisone) and nifedipine lose effect — higher doses or an alternative may be needed.",
        "When carbamazepine is stopped, the enzyme effect wears off over about 2 weeks: other drug levels rise again."
      ],
      monitor: [
        "Seizure control and toxicity signs whenever a TB or HIV drug is started or stopped",
        "Viral load where available if carbamazepine and dolutegravir are combined",
        "Contraception at each visit"
      ],
      cautions: [
        "Folic acid for women of childbearing potential (Kaplan); carbamazepine carries a lower but real malformation risk in pregnancy."
      ]
    },
    {
      title: "Carbamazepine overdose with no levels or cardiac monitor",
      best_for: "Emergency department after intentional or accidental overdose, including children who swallowed a family member's tablets.",
      requires: [
        "oral",
        "bp"
      ],
      steps: [
        "Features: drowsiness, nystagmus, unsteadiness, dilated pupils, tachycardia, urinary retention, myoclonus, seizures, coma, low BP and broad-complex rhythm. Absorption is slow and erratic: patients can deteriorate 12–24 hours or more after ingestion.",
        "Airway, breathing, glucose. Put the unconscious patient in the recovery position if the airway cannot be secured.",
        "Activated charcoal 50 g (child 1 g/kg, maximum 50 g) orally or by NG tube if within about 1–2 hours and the airway is safe. Repeated doses (every 4 hours) are recommended for life-threatening carbamazepine poisoning by the AACT/EAPCCT position statement — only with a protected airway and working bowel.",
        "Seizures: benzodiazepine (diazepam or midazolam).",
        "Low BP: 0.9 % saline boluses. If the pulse becomes irregular or wide, or BP falls despite fluids, sodium bicarbonate as for tricyclic poisoning may be considered (see the sodium bicarbonate entry) and refer to a unit with monitoring.",
        "Observe for at least 24 hours after large or modified-release overdoses."
      ],
      monitor: [
        "Conscious level and breathing hourly",
        "Pulse rate and rhythm, BP",
        "Bowel sounds before repeat charcoal",
        "Sodium where available"
      ],
      cautions: [
        "Do not give repeat charcoal to a drowsy patient with an unprotected airway (aspiration)."
      ]
    }
  ],
  paediatric: [
    "1 month–11 years: 5 mg/kg at night (or 2.5 mg/kg twice daily), increase by 2.5–5 mg/kg every 3–7 days to usual 5 mg/kg two to three times daily, maximum 20 mg/kg/day (BNF for Children).",
    "Can worsen absence and myoclonic seizures, which are common in children.",
    "Rash and hyponatraemia (irritability, vomiting, drowsiness) as in adults."
  ],
  cautions: [
    "Serious skin reactions (SJS/TEN), strongly linked to HLA-B*1502 in Han Chinese and South-East Asian ancestry and more common with HIV.",
    "Hyponatraemia/SIADH, especially in the elderly or with diuretics.",
    "Agranulocytosis and aplastic anaemia (rare, not dose-related); hepatitis; atrioventricular block.",
    "Strong enzyme inducer: lowers dolutegravir, efavirenz, nevirapine, hormonal contraception, steroids, haloperidol, valproate, amitriptyline and many others.",
    "Liver disease: one-third to one-half of the usual dose (Kaplan).",
    "Anticholinergic: caution in glaucoma and urinary retention."
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Severe blood dyscrasias (aplastic anaemia, agranulocytosis) are not dose-related (about 1 in 125,000); warn patients to seek review for fever, sore throat, rash, petechiae, bruising or bleeding.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2088"
    },
    {
      book: "kaplan",
      text: "10–15 % develop a rash in the first 3 weeks; because life-threatening reactions (Stevens–Johnson syndrome, toxic epidermal necrolysis) cannot be predicted, most clinicians stop carbamazepine for any rash.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2089"
    },
    {
      book: "kaplan",
      text: "Carbamazepine can cause an SIADH-like hyponatraemia, mainly in elderly people or at high doses; new confusion, severe weakness or headache should prompt a sodium check.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2089"
    },
    {
      book: "kaplan",
      text: "Strong CYP3A4 induction lowers many drugs, including oral contraceptives, making contraception unreliable.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2090"
    },
    {
      book: "kaplan",
      text: "Carbamazepine lowers haloperidol, fluphenazine, amitriptyline, phenytoin, valproate and hormonal contraceptives; isoniazid and valproate raise the active epoxide; phenobarbital, phenytoin and rifampicin lower carbamazepine.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, Table 21-39, pdf p. 2091"
    },
    {
      book: "kaplan",
      text: "Start 200 mg at bedtime (600–800 mg/day divided for manic inpatients), titrate slowly; enzyme autoinduction over 2–3 weeks may need slightly higher doses.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, Table 21-40, pdf p. 2093"
    },
    {
      book: "kaplan",
      text: "Teaching patients that fever, sore throat, rash, bruising or bleeding need urgent review is probably more useful than frequent routine blood counts in long-term treatment.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2093"
    },
    {
      book: "kaplan",
      text: "Stop carbamazepine and seek haematology advice if WBC falls below 3,000, neutrophils below 1,500 or platelets below 100,000 per cubic mm.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2094"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016 (Epilepsy and Psychoses modules)"
    },
    {
      name: "BNF and BNF for Children: carbamazepine"
    },
    {
      name: "US FDA / MHRA safety communications: carbamazepine and HLA-B*1502 (2007–2008)"
    },
    {
      name: "Dolutegravir (Tivicay) summary of product characteristics: interaction with carbamazepine"
    },
    {
      name: "WHO Medical Eligibility Criteria for Contraceptive Use, 5th ed. 2015 (enzyme-inducing anticonvulsants)"
    },
    {
      name: "AACT/EAPCCT position statement: multiple-dose activated charcoal. J Toxicol Clin Toxicol 1999"
    },
    {
      name: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "amitriptyline",
  name: "Amitriptyline",
  aka: [
    "Elavil",
    "Tryptizol",
    "Laroxyl",
    "tricyclic antidepressant",
    "TCA"
  ],
  cls: "Tricyclic antidepressant",
  cat: "psychiatry",
  wards: [
    "psychiatric",
    "outpatient",
    "medical",
    "emergency",
    "icu"
  ],
  tags: [
    "depression",
    "neuropathic pain",
    "migraine prophylaxis",
    "tension headache",
    "HIV neuropathy",
    "diabetic neuropathy",
    "tricyclic overdose",
    "QRS widening",
    "sodium bicarbonate",
    "suicide risk"
  ],
  presentation: [
    "Tablets 10 mg and 25 mg (also 50 mg).",
    "Oral solution 10 mg/5 mL, 25 mg/5 mL and 50 mg/5 mL where available.",
    "A week's supply at antidepressant doses can be a fatal overdose."
  ],
  indications: [
    "Depression in adults (WHO mhGAP option; fluoxetine is safer in overdose)",
    "Neuropathic pain (diabetic, HIV-related, post-herpetic) at low doses",
    "Migraine and tension-type headache prophylaxis"
  ],
  standard: {
    summary: "Effective and cheap, but it is the most dangerous common medicine in overdose: sodium-channel block widens the QRS, causing seizures, arrhythmias and hypotension. Prescribe small quantities, avoid in heart disease, and know how to use sodium bicarbonate.",
    items: [
      {
        label: "Depression, adult (mhGAP)",
        text: "Start 25 mg at bedtime; increase by 25–50 mg per week to 100–150 mg daily (maximum 300 mg). Older or medically ill adults: start 25 mg, increase by 25 mg per week to 50–75 mg daily (maximum 100 mg). Confirm with local protocol. Continue 9–12 months after recovery; taper slowly."
      },
      {
        label: "Neuropathic pain",
        text: "BNF: 10–25 mg in the evening, increased gradually if needed to 50–75 mg daily; higher doses only under specialist supervision. Kaplan: chronic pain may respond to 10–75 mg/day, started low."
      },
      {
        label: "Migraine prophylaxis",
        text: "BNF: 10 mg at night, increased gradually to a usual maintenance of 50–75 mg at night; maximum 150 mg."
      },
      {
        label: "Before starting",
        text: "Ask about heart disease, fainting, palpitations, recent heart attack, glaucoma, prostate or urinary retention, epilepsy, bipolar disorder and suicidal thoughts. ECG where available, especially over 50 or with heart disease; do not use with a QTc over 450 ms or conduction block (Kaplan). Check lying and standing BP in older people."
      },
      {
        label: "Overdose",
        text: "Airway and oxygen; activated charcoal 50 g within 1 hour if the airway is safe; ECG — QRS over 100 ms predicts seizures and over 160 ms ventricular arrhythmias. Sodium bicarbonate 1–2 mmol/kg IV bolus (8.4 % = 1 mmol/mL) for QRS widening, arrhythmia, hypotension or seizures, repeated to effect with a target blood pH 7.45–7.55 where gases are available. Seizures: benzodiazepines. Observe at least 6 hours; symptomatic patients need monitoring for at least 24 hours (Kaplan: arrhythmia risk for 3–4 days)."
      }
    ]
  },
  improvised: [
    {
      title: "Tricyclic overdose with no ECG monitor: recognise and treat clinically",
      best_for: "Emergency departments and medical wards without cardiac monitoring.",
      requires: [
        "iv",
        "bp",
        "oxygen"
      ],
      steps: [
        "Treat every amitriptyline overdose as potentially lethal, whatever the patient says was taken. Ask the family to bring all packets.",
        "Signs of serious toxicity (Kaplan): drowsiness or coma, agitation or delirium, seizures, dilated pupils, hot dry skin, urinary retention, absent bowel sounds, fast pulse, low BP, breathing slowing. Deterioration can be sudden in the first 6 hours.",
        "Airway and oxygen. Hypoventilation and acidosis make cardiotoxicity worse — support ventilation with a bag-valve-mask if breathing is slow.",
        "Activated charcoal 50 g (child 1 g/kg, maximum 50 g) orally or by NG tube if within 1 hour (consider up to 2 hours) and the patient is awake or the airway is protected.",
        "Without an ECG, use the pulse and BP as your monitor: count the pulse for a full minute every 15 minutes; an irregular pulse, a fall in heart rate from fast to slow, systolic BP below 90 mmHg, a seizure, or a fall in consciousness means give sodium bicarbonate now (next method). If any single ECG can be done (even a 12-lead machine elsewhere in the hospital), a QRS over 100 ms (2.5 small squares) is also an indication.",
        "Seizures: diazepam 10 mg IV (or 10–20 mg rectal) or midazolam 10 mg IM/buccal in adults. Do NOT use phenytoin (sodium-channel blocker, can worsen toxicity).",
        "Low BP: 0.9 % saline 10–20 mL/kg bolus, plus sodium bicarbonate. If BP stays low after 2 boluses and bicarbonate, a vasopressor (noradrenaline, or adrenaline) with senior help.",
        "Do NOT give physostigmine (asystole and seizures in tricyclic poisoning) or flumazenil (seizures if benzodiazepines were also taken). Avoid amiodarone and class Ia/Ic antiarrhythmics; bicarbonate is the first treatment for broad-complex arrhythmias.",
        "Observe a patient with no symptoms for at least 6 hours after ingestion with pulse, BP and consciousness hourly. Anyone with signs of toxicity needs at least 24 hours of observation and referral to a monitored bed if possible."
      ],
      monitor: [
        "Conscious level, breathing, pulse (rate and regularity) and BP every 15 min for the first 6 h",
        "Seizures",
        "Urine output (retention — catheterise if needed)",
        "Temperature",
        "Glucose and potassium where available (bicarbonate lowers potassium)"
      ],
      cautions: [
        "Kaplan's emergency table recommends physostigmine for anticholinergic poisoning in general; in tricyclic overdose it is contraindicated.",
        "Once medically fit, every overdose needs a suicide risk assessment before discharge."
      ]
    },
    {
      title: "Sodium bicarbonate bolus technique using 8.4 % ampoules",
      best_for: "Tricyclic cardiotoxicity (broad QRS, arrhythmia, hypotension or seizures) where only 8.4 % sodium bicarbonate is available. See also the app's sodium bicarbonate entry.",
      requires: [
        "iv"
      ],
      steps: [
        "8.4 % sodium bicarbonate contains 1 mmol/mL. Adult dose: 1–2 mmol/kg, usually 50–100 mL (50–100 mmol) as the first bolus.",
        "Give by slow IV push over 2–5 minutes into a large, free-running vein with a 0.9 % saline flush before and after. It is hypertonic and irritant: extravasation causes tissue necrosis.",
        "Child: 1–2 mmol/kg (1–2 mL/kg of 8.4 %), diluted with an equal volume of water for injection to make 4.2 % if given through a small vein; newborns only 4.2 %.",
        "Repeat every 5–10 minutes while the QRS remains broad, the pulse is irregular, BP remains low or seizures recur — reassess after each bolus.",
        "Stop when the pulse is regular, BP recovers and the QRS (if measured) narrows. Where blood gases are available keep pH 7.45–7.55; where sodium is available stop above about 150–155 mmol/L.",
        "Never mix in the same line or syringe as calcium, adrenaline or noradrenaline (precipitates or inactivates). Flush between drugs.",
        "After bolus control, some centres run an infusion to hold alkalinisation; without monitoring prefer repeated boluses guided by pulse and BP and transfer."
      ],
      monitor: [
        "Pulse rate and rhythm, BP after each bolus",
        "Breathing (bicarbonate produces CO2 that must be breathed off)",
        "Potassium (falls), sodium (rises), and pH where available",
        "Cannula site"
      ],
      cautions: [
        "Large doses cause hypernatraemia, hypokalaemia, fluid overload and severe alkalosis.",
        "Poor ventilation turns bicarbonate into CO2 and worsens intracellular acidosis — ventilate first."
      ]
    },
    {
      title: "Prescribing safely to a patient who may be at risk of suicide",
      best_for: "Outpatient and health-centre prescribing for depression or chronic pain.",
      requires: [
        "oral"
      ],
      steps: [
        "Ask directly about thoughts of suicide, plans and past attempts before prescribing amitriptyline for any reason (pain clinics included).",
        "If there is any suicide risk, prefer fluoxetine for depression; for pain, use the lowest dose.",
        "Dispense small quantities: no more than 1 week at a time for patients at risk (Kaplan). Ask a trusted family member to keep the supply and give daily doses.",
        "For pain, 10 mg tablets limit the danger of the supply; avoid dispensing large packs of 25 mg or 50 mg tablets.",
        "Remove old stocks of tablets from the home.",
        "Screen for heart disease (fainting, palpitations, chest pain, known heart failure or heart attack) and check pulse regularity; if present, avoid amitriptyline.",
        "Tell patients: sedation and dry mouth are common early; stand up slowly; do not drink alcohol; it takes 2–4 weeks for mood effect. Taper slowly when stopping (cholinergic rebound).",
        "Review within 1–2 weeks after starting and after each dose increase."
      ],
      monitor: [
        "Suicidal thoughts at every visit",
        "Pulse and postural BP",
        "Constipation and urinary retention in older people",
        "Switch to mania in anyone with bipolar history"
      ],
      cautions: [
        "Not for depression in children or adolescents (Kaplan: sudden deaths reported).",
        "Avoid in bipolar depression without a mood stabiliser."
      ]
    }
  ],
  paediatric: [
    "Not for depression in children or adolescents (Kaplan: sudden deaths; poor evidence). Specialist use only for pain or enuresis.",
    "Accidental ingestion of even a few adult tablets can be dangerous in a small child: observe for at least 6 hours and treat as in adults (bicarbonate 1–2 mmol/kg)."
  ],
  cautions: [
    "Contraindicated in recent myocardial infarction, heart block or bundle-branch block, arrhythmia, and QTc over 450 ms (Kaplan).",
    "Anticholinergic: avoid in narrow-angle glaucoma, urinary retention, prostatism; causes confusion and delirium in older people and dementia.",
    "Orthostatic hypotension and falls; sedation; weight gain.",
    "Lowers seizure threshold; can trigger mania in bipolar disorder.",
    "Lethal in overdose — small quantities for anyone at risk."
  ],
  antidote: "No specific antidote. Sodium bicarbonate 1–2 mmol/kg IV bolus for QRS widening, arrhythmia or hypotension; benzodiazepines for seizures. Do NOT use physostigmine or flumazenil.",
  textbook: [
    {
      book: "kaplan",
      text: "Tricyclic overdose is severe and often fatal; for patients at risk of suicide give non-refillable prescriptions for no more than 1 week at a time.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, tricyclics, pdf p. 2033"
    },
    {
      book: "kaplan",
      text: "Overdose causes agitation, delirium, convulsions, brisk reflexes, bowel and bladder paralysis, temperature and BP instability, dilated pupils, then coma; arrhythmia risk lasts 3–4 days.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, tricyclics, pdf p. 2033"
    },
    {
      book: "kaplan",
      text: "Amitriptyline is the tricyclic most used for neuropathic pain and migraine prophylaxis, at lower doses than for depression (for example 75 mg).",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, tricyclics, pdf p. 2025"
    },
    {
      book: "kaplan",
      text: "Tricyclics have caused sudden death in children and adolescents and should not be used in children.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, tricyclics, pdf p. 2025"
    },
    {
      book: "kaplan",
      text: "Tricyclics prolong cardiac conduction and are contraindicated with pre-existing conduction defects; avoid in narrow-angle glaucoma.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, tricyclics, pdf p. 2026"
    },
    {
      book: "kaplan",
      text: "Obtain an ECG before treatment; tricyclics are contraindicated if QTc is over 450 ms.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, tricyclics, pdf p. 2030"
    },
    {
      book: "dsm",
      text: "In an older man with delirium, tricyclic-like drugs (and benzodiazepines, opioids) were the likely anticholinergic cause.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 17 Neurocognitive Disorders, case 17.2 Agitated and Confused, pdf p. 415"
    },
    {
      book: "kaplan",
      text: "The emergency table lists physostigmine 0.5–2 mg for anticholinergic intoxication with severe agitation or fever; this general advice does not apply to tricyclic overdose, where physostigmine is contraindicated (toxicology guidance).",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 25.3 Psychiatric Emergencies, table of emergencies, pdf p. 2568"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016 (Depression module)"
    },
    {
      name: "BNF: amitriptyline hydrochloride"
    },
    {
      name: "NICE CG173 Neuropathic pain in adults: pharmacological management (2013, updated 2020)"
    },
    {
      name: "Boehnert MT, Lovejoy FH. Value of the QRS duration versus the serum drug level in predicting seizures and ventricular arrhythmias after an acute overdose of tricyclic antidepressants. N Engl J Med 1985"
    },
    {
      name: "Kerr GW et al. Tricyclic antidepressant overdose: a review. Emerg Med J 2001"
    },
    {
      name: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022; DSM-5-TR Clinical Cases 2023"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
},
/* ---------------------------------------------------------- */
{
  id: "fluoxetine",
  name: "Fluoxetine",
  aka: [
    "Prozac",
    "SSRI"
  ],
  cls: "Selective serotonin reuptake inhibitor (SSRI) antidepressant",
  cat: "psychiatry",
  wards: [
    "psychiatric",
    "outpatient",
    "medical",
    "maternity",
    "paediatric"
  ],
  tags: [
    "depression",
    "anxiety",
    "panic disorder",
    "OCD",
    "bulimia",
    "PTSD",
    "adolescent depression",
    "serotonin syndrome",
    "switch to mania",
    "suicide safety planning",
    "perinatal depression"
  ],
  presentation: [
    "Capsules 20 mg (also 10 mg); dispersible or scored tablets 10 mg and 20 mg.",
    "Oral liquid 20 mg/5 mL.",
    "Very long half-life (active metabolite over a week): about 4 weeks to steady state and weeks to wash out."
  ],
  indications: [
    "Moderate to severe depression in adults (WHO mhGAP first-line antidepressant, with psychosocial support)",
    "Depression in adolescents when psychological treatment alone has not helped (the only antidepressant recommended by mhGAP and NICE for this age)",
    "Panic disorder, generalised anxiety, obsessive-compulsive disorder, PTSD, bulimia nervosa"
  ],
  standard: {
    summary: "The safest antidepressant to start in primary care and in overdose. Its risks are early agitation and suicidal thinking in young people, switching to mania in unrecognised bipolar disorder, bleeding, low sodium in older people and serotonin syndrome with other serotonergic drugs.",
    items: [
      {
        label: "Adult depression (mhGAP)",
        text: "Start 10 mg daily for 1 week, then 20 mg daily in the morning. If no response after 4–6 weeks, increase to 40 mg (maximum 80 mg). Older or medically ill adults: 10 mg then 20 mg daily (maximum 40 mg). Kaplan: 20 mg is often as effective as higher doses. Confirm with local protocol."
      },
      {
        label: "Adolescents 12–18 years",
        text: "Only after or with psychosocial treatment. Start 10 mg daily; increase to 20 mg after 1–2 weeks if needed (NICE NG134; mhGAP). See weekly for the first 4 weeks for suicidal thinking, agitation or hypomania. mhGAP: do not use antidepressants for depression in children under 12."
      },
      {
        label: "Other uses (BNF)",
        text: "OCD: 20 mg daily, up to 60 mg. Bulimia nervosa: 60 mg daily. Panic disorder: start low (Kaplan: 5–10 mg) and increase slowly because early anxiety is common."
      },
      {
        label: "Duration and stopping",
        text: "Continue for at least 9–12 months after symptoms resolve (mhGAP). Fluoxetine tapers itself because of its long half-life; other SSRIs need gradual withdrawal."
      },
      {
        label: "Before starting",
        text: "Ask about previous mania or hypomania and family history of bipolar disorder (antidepressant alone can trigger mania); suicidal thoughts; bleeding risk (NSAIDs, anticoagulants); other serotonergic drugs (tramadol, pethidine, amitriptyline, lithium, MAOIs — never within 5 weeks after stopping fluoxetine before an MAOI); pregnancy and breastfeeding."
      },
      {
        label: "Serotonin syndrome",
        text: "Agitation, tremor, sweating, diarrhoea, hyperreflexia and inducible or spontaneous clonus (legs first), fever, rigidity. Stop all serotonergic drugs; benzodiazepines for agitation and muscle activity; cooling; IV fluids; severe cases need intensive care (Kaplan)."
      }
    ]
  },
  improvised: [
    {
      title: "Safe start and follow-up at a health centre or outpatient clinic (mhGAP)",
      best_for: "Primary care, general OPD and psychiatric clinics with limited staff and no laboratory.",
      requires: [
        "oral"
      ],
      steps: [
        "Confirm moderate to severe depression and ask about suicidal thoughts, previous mania (days of little sleep, overactivity, overspending, grandiosity) and substance use. If there has ever been mania, do not start fluoxetine alone — treat as bipolar disorder.",
        "Offer psychoeducation and psychosocial support first or at the same time (problem-solving, behavioural activation, social support).",
        "Start 10 mg daily (open a 20 mg capsule into water or juice and take half, or use 10 mg tablets or liquid) for 1 week, then 20 mg each morning with food. Early nausea, headache, restlessness and poor sleep usually settle within 2 weeks.",
        "Explain: benefit starts after 2–4 weeks; do not stop when feeling better; continue 9–12 months after recovery.",
        "Follow up in 1–2 weeks (a phone call or health extension worker visit is acceptable), then every month. At each contact: mood, suicidal thoughts, side effects, adherence, and signs of mania.",
        "If no improvement after 4–6 weeks at 20 mg and the patient is taking it: increase to 40 mg, or refer.",
        "Older adults: check for confusion, drowsiness, falls or vomiting in the first month — these may be low sodium; withhold and refer for a sodium check."
      ],
      monitor: [
        "Suicidal thoughts at every visit",
        "Agitation or restlessness in the first 2 weeks",
        "Signs of mania",
        "Weight, sleep, sexual side effects (a common reason for stopping)"
      ],
      cautions: [
        "Bleeding risk with NSAIDs and anticoagulants: prefer paracetamol for pain.",
        "Seizure threshold slightly lowered: use with care in epilepsy but do not withhold treatment."
      ]
    },
    {
      title: "Suicide safety plan when prescribing an antidepressant",
      best_for: "Any patient with depression, especially adolescents, young adults and anyone with past self-harm.",
      requires: [],
      steps: [
        "Ask directly: 'Have you had thoughts of ending your life? Have you made a plan? Do you have the means?' Asking does not increase risk.",
        "Imminent risk (a plan and the means, recent attempt, severe agitation, psychosis): do not send home alone — admit or keep under supervision with a family member and refer urgently.",
        "Remove or lock away the means: pesticides and rat poison, stored medicines (especially amitriptyline, paracetamol and antimalarials), ropes, firearms.",
        "Write a simple plan with the patient: warning signs; things that help; people to call (names and phone numbers); the clinic or emergency number; a safe place to go.",
        "Involve a trusted family member with the patient's consent and ask them to hold the medicines. Fluoxetine is relatively safe in overdose, but mixed overdoses are not.",
        "Explain that in the first weeks — and particularly in people under 25 — energy can return before mood improves, and some people feel more agitated or have more suicidal thoughts. Tell them to come back at once if this happens.",
        "See the person again within 1 week (adolescents weekly for the first month); keep contact by phone if travel is difficult."
      ],
      monitor: [
        "Suicidal thoughts and plans at every contact",
        "Agitation, akathisia (inner restlessness), impulsive behaviour",
        "Family report"
      ],
      cautions: [
        "Stop fluoxetine and review urgently if new severe agitation, hostility or hypomania appears (Kaplan)."
      ]
    },
    {
      title: "Recognising switch to mania or serotonin syndrome without laboratory tests",
      best_for: "Wards and clinics where the diagnosis is clinical.",
      requires: [
        "bp"
      ],
      steps: [
        "Switch to mania or hypomania: days of reduced need for sleep, overtalkativeness, grandiosity, spending, irritability, risky behaviour after starting fluoxetine. Stop fluoxetine; treat as bipolar disorder (mood stabiliser or antipsychotic, e.g. haloperidol or olanzapine) and do not restart an antidepressant alone.",
        "Mixed states (agitation with low mood) on an SSRI are also a warning sign of bipolar disorder (DSM-5-TR Clinical Cases).",
        "Serotonin syndrome usually starts within 24 hours of adding or increasing a serotonergic drug (e.g. tramadol, amitriptyline, lithium, pethidine). Look for tremor, sweating, diarrhoea, fast pulse, high BP, dilated pupils, brisk reflexes and clonus — tap the knee reflex and flex the ankle sharply: repeated beating = clonus.",
        "Mild (tremor, brisk reflexes, normal temperature): stop serotonergic drugs, oral or IV diazepam for agitation, observe 24 hours.",
        "Moderate or severe (temperature over 38.5 °C, rigidity, confusion, unstable BP): IV fluids, active cooling (undress, tepid sponging and fanning, cool IV fluids), benzodiazepines, oxygen, and urgent referral to intensive care. Chlorpromazine is used in some protocols once the patient is not hypotensive (Kaplan lists it); paracetamol does not treat this fever.",
        "Differentiate from neuroleptic malignant syndrome (slow onset, lead-pipe rigidity, slow reflexes, on antipsychotic) and anticholinergic poisoning (dry hot skin, absent bowel sounds, no sweating)."
      ],
      monitor: [
        "Temperature, pulse and BP every 30–60 min",
        "Muscle tone, reflexes and clonus",
        "Urine output (rhabdomyolysis: dark urine)"
      ],
      cautions: [
        "After stopping, fluoxetine persists for weeks: wait at least 5 weeks before an MAOI, and add other serotonergic drugs cautiously for some weeks."
      ]
    }
  ],
  paediatric: [
    "Children under 12: do not use antidepressants for depression (mhGAP); specialist use only (e.g. OCD from 7 years).",
    "Adolescents 12–18: fluoxetine is the first choice when medication is needed — 10 mg daily, increase to 20 mg after 1–2 weeks; weekly review for the first month (suicidal thinking, agitation, hypomania). Kaplan: fluoxetine has the most consistent evidence and adding CBT reduces emergent suicidal ideation."
  ],
  cautions: [
    "Suicidal thoughts and agitation may increase early in treatment, especially under 25 years.",
    "Can precipitate mania in bipolar disorder; do not use as monotherapy for bipolar depression.",
    "Bleeding with NSAIDs, aspirin and anticoagulants; hyponatraemia in older people and with diuretics.",
    "Serotonin syndrome with other serotonergic drugs; never with or within 5 weeks before an MAOI.",
    "Enzyme inhibitor (CYP2D6): raises amitriptyline, phenytoin, carbamazepine and diazepam levels.",
    "Poorly controlled epilepsy; diabetes (glucose may fall early)."
  ],
  textbook: [
    {
      book: "kaplan",
      text: "Depression: start 10–20 mg each morning with food; 20 mg is often as effective as higher doses; about 4 weeks to steady state; manufacturer maximum 80 mg; start 5–10 mg or on alternate days if early anxiety is a problem.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, SSRIs, pdf p. 1994"
    },
    {
      book: "kaplan",
      text: "Serotonin syndrome (diarrhoea, restlessness, agitation, hyperreflexia, autonomic instability, myoclonus, hyperthermia, rigidity) is treated by stopping the drugs and supportive care including benzodiazepines and cooling.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, SSRIs, pdf p. 1990"
    },
    {
      book: "kaplan",
      text: "Fluoxetine has the most consistent evidence among SSRIs for depression in children and adolescents, within comprehensive management.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.2 Antidepressants, SSRIs, pdf p. 1981"
    },
    {
      book: "kaplan",
      text: "Antidepressants carry a warning of increased suicidal thoughts and behaviour in young people requiring close monitoring; behavioural activation or hypomania means stopping the drug.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 2.9 Depressive Disorders and Suicide in Children and Adolescents, pdf p. 568"
    },
    {
      book: "kaplan",
      text: "In adolescents (TADS), fluoxetine 10–40 mg/day was effective and adding CBT reduced emergent suicidal ideation.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 2.9 Depressive Disorders and Suicide in Children and Adolescents, pdf p. 564"
    },
    {
      book: "kaplan",
      text: "Antidepressants can induce mania or cycling and are not appropriate as monotherapy in bipolar disorder; fluoxetine has some evidence as an adjunct to a mood stabilizer.",
      ref: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 6 Bipolar Disorders, pdf p. 1201"
    },
    {
      book: "dsm",
      text: "An apparent quick response to fluoxetine in unrecognised bipolar disorder may reflect antidepressant-driven rapid cycling without a mood stabilizer.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.2 Cycles of Depression, pdf p. 95"
    },
    {
      book: "dsm",
      text: "A mixed state emerging on an SSRI is a red flag for bipolar disorder, especially with a family history.",
      ref: "DSM-5-TR Clinical Cases 2023, ch. 3 Bipolar and Related Disorders, case 3.9 Depressed and Anxious, pdf p. 122"
    }
  ],
  sources: [
    {
      name: "WHO mhGAP Intervention Guide 2.0, 2016 (Depression and Self-harm/suicide modules)"
    },
    {
      name: "NICE NG134 Depression in children and young people (2019)"
    },
    {
      name: "NICE NG222 Depression in adults (2022)"
    },
    {
      name: "BNF and BNF for Children: fluoxetine"
    },
    {
      name: "Boyer EW, Shannon M. The serotonin syndrome. N Engl J Med 2005"
    },
    {
      name: "Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022; DSM-5-TR Clinical Cases 2023"
    }
  ],
  review: {
    status: "draft",
    by: null,
    date: null
  }
}
];
