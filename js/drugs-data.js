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
  nutrition:  "Nutrition & micronutrients"
};

window.WARDS = {
  emergency:  { label: "Emergency / casualty", note: "Resuscitation, triage and the first hour." },
  maternity:  { label: "Labour & maternity",   note: "Delivery room, obstetric theatre and postnatal ward." },
  neonatal:   { label: "Neonatal unit",        note: "Newborns and preterm infants. Volumes are small and dilutions matter." },
  paediatric: { label: "Paediatric ward",      note: "Children beyond the newborn period." },
  medical:    { label: "Adult medical ward",   note: "General internal medicine inpatients." },
  surgical:   { label: "Surgery & theatre",    note: "Operating theatre, anaesthesia and the surgical ward." },
  icu:        { label: "ICU / high dependency", note: "Sickest patients; where pumps are missed most." },
  outpatient: { label: "Outpatient & health post", note: "OPD, health centre and community level." }
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
  cautions: ["Toxicity thresholds (serum magnesium): patellar reflexes are lost at about 7–10 mEq/L (9–12 mg/dL, roughly 3.5–5 mmol/L); respiratory depression at about 10–12 mEq/L (12–15 mg/dL, 5–6 mmol/L); cardiac arrest at about 25 mEq/L (30 mg/dL, 12.5 mmol/L). Loss of the knee reflex is the early warning — stop the magnesium before breathing is affected.", "Risk rises sharply with oliguria or renal impairment (creatinine above 1.2 mg/dL or urine under 30 mL/h for more than 4 h): give maintenance at a reduced dose or withhold, and check reflexes and breathing before every dose.", "Do not combine with nifedipine without BP monitoring (hypotension)."],
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
    { book: "note", text: "Eclampsia regimens are obstetric and not covered in Nelson; see WHO sources.", ref: "Editorial note" }
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
    "Cerebral oedema: headache, falling HR, rising BP, drowsiness → raise head, reduce fluids by one third, mannitol 0.5–1 g/kg IV over 15 min or 3 % saline 2.5–5 mL/kg."
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
  paediatric: ["Apnoea of prematurity: 6 mg/kg loading then 2.5 mg/kg every 12 h (WHO) — oral or IV."],
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
      { label: "Neonate", text: "50 mg/kg once daily (meningitis 100 mg/kg). Avoid if jaundiced or < 41 weeks corrected age and never with calcium-containing IV fluids (e.g. Ringer's lactate)." }
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
  calc: { type: "weight", dosePerKg: 2.4, doseUnit: "mg", conc: 10, concUnit: "mg/mL", label: "IV dose (2.4 mg/kg; use 3 mg/kg if < 20 kg) at 10 mg/mL" },
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
  cautions: ["Thiamine 100 mg IV/IM before or with glucose in alcohol-dependent/malnourished adults (Wernicke's)."],
  calc: { type: "weight", dosePerKg: 5, doseUnit: "mL", conc: 1, concUnit: "mL/mL", label: "Child bolus: 5 mL/kg of 10 % glucose" },
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013 (hypoglycaemia; sublingual sugar)" }, { name: "WHO. Updates on the management of severe acute malnutrition, 2013" }, { name: "JBDS. Hospital management of hypoglycaemia in adults with diabetes, 2023" }],
  textbook: [
    { book: "harrison", text: "Hypoglycaemia unable to take oral carbohydrate: IV glucose 25 g, followed by a glucose infusion guided by serial plasma glucose; oral 15-20 g if able to swallow.", ref: "Harrison 22nd ed. 2025, ch. 418 Hypoglycemia, p. 3236" },
    { book: "harrison", text: "If IV access is impractical, glucagon 1 mg SC or IM in adults; ineffective in glycogen-depleted patients such as alcohol-induced hypoglycaemia. Patients should eat as soon as practical.", ref: "Harrison 22nd ed. 2025, ch. 418 Hypoglycemia, p. 3236" },
    { book: "harrison", text: "Poisoned patients with altered mental status: consider IV glucose (unless glucose documented normal), naloxone and thiamine.", ref: "Harrison 22nd ed. 2025, ch. 470 Poisoning and Drug Overdose, p. 3707" },
    { book: "harrison", text: "Hyperkalaemia: never give a D50 bolus without insulin, because hypertonic glucose can acutely worsen hyperkalaemia.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 361" },
    { book: "nelson", text: "Hypoglycaemia: if symptomatic or unable to take oral intake, 2 mL/kg of 10 % dextrose (D10W) IV bolus, then a dextrose infusion at 5–6 mg/kg/min (infants) or 2–3 mg/kg/min (older children) to prevent recurrence. Conscious child: 15 g rapid-acting carbohydrate (e.g. 4 oz juice).", ref: "Nelson 22nd ed. 2024, ch. 113 Hypoglycemia, p. 983" },
    { book: "nelson", text: "Resuscitation dosing: dextrose 0.5–1 g/kg IV/IO = D10W 5–10 mL/kg, D25W 2–4 mL/kg, D50W 1–2 mL/kg; recheck serial glucose as hypoglycaemia can recur.", ref: "Nelson 22nd ed. 2024, Table 79.x, p. 563" },
    { book: "nelson", text: "Glucagon IM: 0.5 mg if < 20 kg, 1.0 mg if > 20 kg; intranasal 3 mg. Often causes vomiting.", ref: "Nelson 22nd ed. 2024, ch. 629, p. 3534" }
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
    { book: "nelson", text: "Lorazepam 0.1 mg/kg IV/PO/SL/PR, repeat every 10 min × 2; rectal diazepam gel 0.2 mg/kg/dose.", ref: "Nelson 22nd ed. 2024, ch. 8 Pediatric palliative care, symptom table" }
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
    { book: "nelson", text: "Neonatal seizures: phenobarbital remains first-line; levetiracetam is increasingly preferred as second-line over phenytoin 20 mg/kg or lorazepam 0.1 mg/kg.", ref: "Nelson 22nd ed. 2024, ch. 122 Nervous system disorders of the newborn, p. 1067" }
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
    { book: "nelson", text: "Burn dressing changes: ketamine 1–4 mg/kg IV for children with high opioid requirements, with continuous cardiovascular monitoring and an advanced-airway-trained provider.", ref: "Nelson 22nd ed. 2024, ch. 91 Burn injuries, p. 654" }
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
  cautions: ["Heparin-induced thrombocytopenia; renal impairment with LMWH; spinal/epidural haematoma."],
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
  cautions: ["Hypotension, flushing, headache, tachycardia.", "Do not combine immediate-release nifedipine with intravenous magnesium without close BP monitoring.", "Slow-release tablets act too slowly for an emergency."],
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
    { book: "nelson", text: "Opiate toxicity is confirmed by IV naloxone 0.1 mg/kg, not exceeding 2 mg, which dilates pupils constricted by the opiate; treatment consists of maintaining oxygenation and continued naloxone.", ref: "Nelson 22nd ed. 2024, ch. 156 Substance use, p. 1208" }
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
  calc: { type: "weight", dosePerKg: 0.02, doseUnit: "mg", conc: 0.6, concUnit: "mg/mL", maxDose: 0.5, label: "Bradycardia dose (0.02 mg/kg, min 0.1 mg, max 0.5 mg)" },
  textbook: [
    { book: "harrison", text: "Bradycardic arrest rhythms/peri-arrest bradycardia: atropine 1 mg IV together with external or transvenous pacing; atropine is not part of the VF/PEA drug sequence.", ref: "Harrison 22nd ed. 2025, ch. 317 Cardiovascular Collapse, Cardiac Arrest, and Sudden Cardiac Death, p. 2337" },
    { book: "harrison", text: "Cholinesterase-inhibitor (organophosphate, carbamate, nerve agent) poisoning: atropine for muscarinic features; pralidoxime (2-PAM) for nicotinic features from organophosphates.", ref: "Harrison 22nd ed. 2025, ch. 470 Poisoning and Drug Overdose, p. 3712" },
    { book: "harrison", text: "Cardiac glycoside toxicity: atropine, dopamine, epinephrine and external pacing are temporizing measures for bradydysrhythmias pending digoxin Fab.", ref: "Harrison 22nd ed. 2025, ch. 470 Poisoning and Drug Overdose, p. 3712" },
    { book: "nelson", text: "Atropine IV/IO 0.02 mg/kg; minimum dose 0.1 mg for bradycardia treatment; maximum single dose 0.5 mg in a child and 1 mg in an adolescent; repeat once if needed. Endotracheal dose 0.04–0.06 mg/kg, maximum 2 mg. Higher doses may be used with organophosphate poisoning.", ref: "Nelson 22nd ed. 2024, Table 79.5, p. 563" },
    { book: "nelson", text: "In the bradycardia algorithm, atropine IV/IO 0.02 mg/kg may be repeated once, with epinephrine 0.01 mg/kg repeated every 3–5 minutes as the primary drug.", ref: "Nelson 22nd ed. 2024, Fig. 79 bradycardia algorithm, p. 561" },
    { book: "nelson", text: "Severe acute malnutrition with corneal ulceration: instil 1 drop of atropine 1 % into the affected eye to relax the eye and prevent the lens from pushing out.", ref: "Nelson 22nd ed. 2024, ch. 62, Table, p. 428" }
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
      { label: "Neonate", text: "50 mg/kg IV or IM every 12 h in the first week of life, every 8 h from 7–21 days, every 6 h thereafter. Meningitis: 100 mg/kg per dose." },
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
        "Reduce to 3 g/day in malnutrition, chronic alcohol use, low body weight and liver disease."
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
    { book: "nelson", text: "Severe hyperkalaemia above 7 mEq/L, especially with electrocardiographic changes, requires calcium gluconate 10 % 100 mg/kg/dose (maximum 3,000 mg), sodium bicarbonate 1–2 mEq/kg IV over 5–10 minutes, and regular insulin 0.1 units/kg with 50 % glucose 1 mL/kg over 1 hour.", ref: "Nelson 22nd ed. 2024, ch. 573, p. 3245" }
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
}
];
