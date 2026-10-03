/* preop-data.js — preoperative assessment: conditions, medicines,
   investigations, the findings that postpone an elective operation, and
   fasting times.

   Scope came from an unattributed student exam-preparation file, which is NOT
   cited. Written to current practice and corrected where that file was out of
   date: no bridging for atrial fibrillation at any CHA2DS2-VASc score (BRIDGE
   trial), never start a beta-blocker in the last 24 hours (POISE), stent
   intervals from ESC 2022, basal insulin never omitted, ECG and chest X-ray
   not ordered by age alone, ranitidine flagged as withdrawn.

   Warfarin leads because it is the anticoagulant Ethiopian district hospitals
   actually have; every investigation says what to do if it is unavailable.
   No page citations are claimed. DRAFT — confirm with the anaesthetist. */
window.PREOP = {
  investigations: [
    {
      id: "spo2",
      test: "Pulse oximetry (SpO2) on room air",
      when: "Every patient — record a baseline before any anaesthetic or sedation.",
      why: "Gives the patient's normal value to compare against after surgery, and uncovers unrecognised lung or heart disease. A pulse oximeter is required by the WHO Surgical Safety Checklist.",
      ifUnavailable: "Count the respiratory rate, look for cyanosis and ask whether the patient can speak in full sentences. No anaesthetic should be given without a working pulse oximeter — find one before starting.",
      sources: ["WHO Surgical Care at the District Hospital (2003) and WHO Surgical Safety Checklist"],
      textbook: []
    },
    {
      id: "functional-capacity",
      test: "Functional capacity (bedside question)",
      when: "Every adult before intermediate or major surgery, and anyone with heart or lung disease.",
      why: "Asking whether the patient can climb two flights of stairs, or walk uphill, without stopping (roughly 4 METs) is one of the best predictors of perioperative cardiac and respiratory complications. Good capacity usually means no further cardiac testing is needed.",
      ifUnavailable: "Needs no equipment. If the patient cannot climb because of joint pain, blindness or weakness — not breathlessness or chest pain — record capacity as UNKNOWN, not poor, and rely on symptoms and examination.",
      sources: [
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)"
      ],
      textbook: []
    },
    {
      id: "fbc",
      test: "Full blood count (haemoglobin, white cells, platelets)",
      when: "Major surgery; intermediate surgery in a patient with significant illness (ASA 3–4); anyone who is pale or has anaemia symptoms; expected blood loss over about 500 mL; kidney or liver disease; anyone on anticoagulants, valproate or clozapine; any bleeding history.",
      why: "Detects anaemia that should be treated before elective surgery, a low platelet count that rules out a spinal, and a white count that may point to infection. Not needed for healthy patients having minor surgery.",
      ifUnavailable: "Haemoglobin by a point-of-care meter (HemoCue) or a packed cell volume by centrifuge is enough for most decisions. A blood film can give a rough platelet estimate. If a low platelet count is suspected and cannot be measured, do not do a spinal or epidural, and refer major elective surgery.",
      sources: [
        "NICE NG45: Routine preoperative tests for elective surgery (2016)",
        "British Society for Haematology: Guidelines for the use of platelet transfusions (2017)"
      ],
      textbook: []
    },
    {
      id: "group-crossmatch",
      test: "Blood group, antibody screen and crossmatch",
      when: "Any operation where significant blood loss is possible (laparotomy, caesarean section, thyroidectomy, prostatectomy, hip and long-bone surgery); anaemic patients before major surgery; patients on anticoagulants; sickle cell disease.",
      why: "Blood must be ready before the bleeding, not after it.",
      ifUnavailable: "Without a blood bank: identify and screen possible family donors in advance according to national blood service rules, have tranexamic acid ready, and keep the surgery as short as possible. Do NOT start an elective operation that is likely to need blood when none can be obtained — refer.",
      sources: ["WHO Surgical Care at the District Hospital (2003) and WHO Surgical Safety Checklist"],
      textbook: []
    },
    {
      id: "renal",
      test: "Creatinine (and urea) with sodium and potassium",
      when: "Major surgery; ASA 3–4 patients; diabetes; kidney, liver or heart failure; anyone on diuretics, ACE inhibitors, ARBs, digoxin or lithium; vomiting, diarrhoea or bowel obstruction; patients over 65 having major surgery.",
      why: "Finds kidney impairment (drug doses, fluids, contrast, risk of acute kidney injury) and dangerous potassium levels (arrhythmia under anaesthesia).",
      ifUnavailable: "Record urine output and a urine dipstick, and assess hydration. Potassium cannot be judged clinically; an ECG may show peaked T waves (high) or U waves (low), but a normal ECG does not exclude either. Refer elective major surgery in a patient with kidney disease, or on digoxin with diuretics, if potassium cannot be measured.",
      sources: ["NICE NG45: Routine preoperative tests for elective surgery (2016)"],
      textbook: []
    },
    {
      id: "glucose",
      test: "Capillary or venous blood glucose",
      when: "Every diabetic on admission, on the morning of surgery, and repeatedly while fasting; anyone on long-term steroids; malnourished patients; children who have fasted long; anyone with symptoms of diabetes.",
      why: "Hypoglycaemia under anaesthesia is silent and can cause permanent brain damage; high glucose increases wound infection and can signal ketoacidosis.",
      ifUnavailable: "A glucometer is the minimum standard for operating on anyone treated with insulin or a sulfonylurea — without one, do not do elective surgery on them; refer. A urine glucose dipstick only shows that glucose was high over the last few hours and cannot detect hypoglycaemia.",
      sources: [
        "JBDS-IP / CPOC: Perioperative care of people with diabetes undergoing surgery (2021, revised 2023)"
      ],
      textbook: []
    },
    {
      id: "hba1c",
      test: "HbA1c",
      when: "Any diabetic who has not had HbA1c measured in the last 3 months, before elective surgery.",
      why: "Above 69 mmol/mol (8.5 %) predicts more complications; UK guidance advises improving control before elective surgery if delay is safe.",
      ifUnavailable: "Use the patient's recent fasting glucose readings and clinic records to judge control. Do not delay surgery solely because HbA1c cannot be measured.",
      sources: [
        "JBDS-IP / CPOC: Perioperative care of people with diabetes undergoing surgery (2021, revised 2023)",
        "NICE NG45: Routine preoperative tests for elective surgery (2016)"
      ],
      textbook: []
    },
    {
      id: "ketones",
      test: "Blood or urine ketones",
      when: "Any diabetic with glucose above 12 mmol/L (216 mg/dL), vomiting, abdominal pain, rapid breathing or who is unwell; every type 1 diabetic who is fasting.",
      why: "Detects diabetic ketoacidosis, which must be treated before any elective surgery and changes the anaesthetic for any emergency.",
      ifUnavailable: "A urine dipstick is cheap and nearly always available. If neither test is possible, look for deep sighing breathing, dehydration and a ketotic breath, and treat as ketoacidosis if suspected.",
      sources: [
        "JBDS-IP / CPOC: Perioperative care of people with diabetes undergoing surgery (2021, revised 2023)"
      ],
      textbook: []
    },
    {
      id: "coag",
      test: "INR (prothrombin time) and aPTT",
      when: "Any patient on warfarin (the day before surgery, and again on the morning if vitamin K was given); liver disease or jaundice; sepsis with bleeding; a personal or family bleeding history; patients on unfractionated heparin (aPTT). Not routine for anyone else.",
      why: "Decides whether surgery or a spinal is safe. Note: aspirin, clopidogrel, LMWH and the DOACs are NOT detected reliably by INR or aPTT — timing since the last dose is what matters for them.",
      ifUnavailable: "The 20-minute whole blood clotting test (used for snakebite) detects only gross clotting failure; it cannot show that warfarin has worn off. A patient on warfarin needing elective surgery where no INR can be done should be referred. Do not do a spinal or epidural on a patient whose clotting is unknown and who has a reason for it to be abnormal.",
      sources: [
        "NICE NG45: Routine preoperative tests for elective surgery (2016)",
        "British Society for Haematology: Peri-operative management of anticoagulation and antiplatelet therapy (2016)",
        "AAGBI / OAA / RA-UK: Regional anaesthesia and patients with abnormalities of coagulation (2013)"
      ],
      textbook: []
    },
    {
      id: "ecg",
      test: "12-lead ECG",
      when: "Every patient with known heart disease, hypertension, diabetes, kidney disease, or cardiac symptoms (chest pain, palpitations, syncope, breathlessness); anyone with an irregular or slow pulse; patients on digoxin, antipsychotics, lithium or tricyclics; every patient over 65 having intermediate or major surgery (NICE). Guidelines differ on a lower age cut-off — many hospitals also do one routinely from 40–50; where an ECG is available it is cheap, so err towards doing it.",
      why: "Shows arrhythmia (AF, heart block), old or new ischaemia, left ventricular hypertrophy and a long QT interval, and gives a baseline if something goes wrong after surgery.",
      ifUnavailable: "Count the pulse for a full minute at the wrist and the apex, and take the blood pressure. An irregularly irregular pulse is AF until proven otherwise. A pulse below 50 with dizziness or fainting may be heart block — refer before elective surgery.",
      sources: [
        "NICE NG45: Routine preoperative tests for elective surgery (2016)",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)"
      ],
      textbook: []
    },
    {
      id: "cxr",
      test: "Chest X-ray",
      when: "Only when it will change management: new or worsening chest symptoms or signs; suspected tuberculosis; heart failure or valve disease with a change in symptoms; suspected chest metastases; goitre with possible retrosternal extension. NOT routine by age.",
      why: "Finds pneumonia, effusion, TB, heart failure, a large heart, or tracheal compression. A routine chest film in a well patient rarely changes anything.",
      ifUnavailable: "Rely on examination and pulse oximetry; send sputum for TB testing when TB is suspected. Postpone elective surgery in anyone with unexplained new chest signs.",
      sources: ["NICE NG45: Routine preoperative tests for elective surgery (2016)"],
      textbook: []
    },
    {
      id: "echo",
      test: "Echocardiography",
      when: "A murmur with symptoms (breathlessness, fainting, chest pain); suspected heart failure; known rheumatic or other valve disease without an echo in the past year or with new symptoms; before major surgery in a patient with poor functional capacity and heart disease.",
      why: "Severe aortic or mitral stenosis and poor ventricular function change the anaesthetic completely — severe aortic stenosis tolerates the fall in blood pressure after a spinal very badly.",
      ifUnavailable: "Judge by functional capacity and examination (character of the murmur, slow-rising pulse, signs of heart failure or pulmonary hypertension). A patient with a murmur and symptoms should not have elective surgery at a district hospital without cardiac assessment — refer.",
      sources: [
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "ACC/AHA guideline for the management of patients with valvular heart disease (2020)"
      ],
      textbook: []
    },
    {
      id: "urinalysis",
      test: "Urine dipstick (and culture where available)",
      when: "Urinary symptoms; before urological surgery; diabetics (glucose and ketones); suspected kidney disease.",
      why: "Finds urinary infection to treat before urological or implant surgery, and protein, blood or ketones that change management.",
      ifUnavailable: "Treat symptomatic urinary infection clinically before elective urological or implant surgery. Note that bacteria in the urine WITHOUT symptoms should only be treated before urological procedures that breach the lining of the urinary tract.",
      sources: ["IDSA clinical practice guideline for the management of asymptomatic bacteriuria (2019)"],
      textbook: []
    },
    {
      id: "pregnancy-test",
      test: "Urine pregnancy test (hCG)",
      when: "Every woman of reproductive age who could possibly be pregnant, with her consent.",
      why: "Elective surgery is postponed in pregnancy; anaesthetic drugs, positioning and X-rays all change.",
      ifUnavailable: "Take the date of the last menstrual period and ask about contraception. If there is any doubt, postpone elective surgery until a test or a period settles it.",
      sources: [
        "NICE NG45: Routine preoperative tests for elective surgery (2016)",
        "ACOG Committee Opinion 775: Nonobstetric surgery during pregnancy (2019)"
      ],
      textbook: []
    },
    {
      id: "lft-albumin",
      test: "Liver function tests and serum albumin",
      when: "Known or suspected liver disease; jaundice; heavy alcohol use; malnutrition; ascites; patients on TB treatment with symptoms of hepatitis.",
      why: "Needed for Child–Pugh scoring of liver disease; low albumin marks malnutrition and predicts wound and anastomotic complications.",
      ifUnavailable: "Visible jaundice, ascites or confusion (encephalopathy) each indicate advanced liver disease — refer elective major surgery. Assess nutrition by weight loss, BMI and mid-upper arm circumference.",
      sources: [
        "Child–Pugh and MELD scores (standard liver risk scoring)",
        "ESPEN guideline: Clinical nutrition in surgery (2017, updated 2021)"
      ],
      textbook: []
    },
    {
      id: "tft",
      test: "Thyroid function tests (TSH, free T4)",
      when: "Goitre; symptoms of an over- or under-active thyroid; patients on thyroid drugs; new atrial fibrillation without another cause.",
      why: "Surgery in an uncontrolled thyrotoxic patient can precipitate thyroid storm, which is often fatal.",
      ifUnavailable: "Judge clinically: resting pulse, tremor, weight loss, sweating, eye signs (over-active); slow pulse, cold intolerance, slow-relaxing reflexes (under-active). A patient who is clinically thyrotoxic must not have elective surgery.",
      sources: [
        "American Thyroid Association guidelines for hyperthyroidism and other causes of thyrotoxicosis (2016)"
      ],
      textbook: []
    },
    {
      id: "neck-xray",
      test: "Neck and thoracic-inlet X-ray (front and side views)",
      when: "Large goitre or neck mass; stridor; difficulty swallowing; suspected retrosternal extension.",
      why: "Shows how far the trachea is compressed or deviated, which decides the size of tube and whether the airway can be managed safely.",
      ifUnavailable: "Examine for tracheal deviation, a lower border that cannot be felt (retrosternal), stridor and voice change, and raise the arms above the head (Pemberton's sign). A goitre with airway symptoms needs an experienced anaesthetist — refer.",
      sources: [
        "Difficult Airway Society guidelines for management of unanticipated difficult intubation in adults (2015)"
      ],
      textbook: []
    },
    {
      id: "peak-flow",
      test: "Peak expiratory flow (or spirometry)",
      when: "Asthma or COPD, before elective surgery.",
      why: "Compares today's value with the patient's best — a value well below their best means they are not optimised.",
      ifUnavailable: "Ask about night symptoms, reliever use and recent steroid courses; listen for wheeze; check SpO2 and exercise tolerance.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "abg",
      test: "Arterial blood gas",
      when: "Severe lung disease (home oxygen, breathlessness at rest, low SpO2 on air) before major surgery, where available.",
      why: "A raised carbon dioxide level marks severe disease with a high risk of respiratory failure after surgery.",
      ifUnavailable: "Use SpO2 on air, respiratory rate and exercise tolerance. A patient breathless at rest or needing oxygen at home should have elective major surgery at a referral centre.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "hiv-test",
      test: "HIV test (with counselling and consent)",
      when: "Offer to any patient whose status is unknown, as provider-initiated testing under national guidelines. For known HIV, ask for the latest CD4 count and viral load.",
      why: "Identifies people who need ART and screening for opportunistic infections, and helps plan wound care. It is NOT a precondition for surgery.",
      ifUnavailable: "Standard (universal) precautions apply to every patient regardless of status. HIV infection is never a reason to refuse or postpone surgery on its own.",
      sources: ["WHO consolidated HIV guidelines; Ethiopian national consolidated HIV guidelines"],
      textbook: []
    },
    {
      id: "malaria-test",
      test: "Malaria rapid diagnostic test or blood film",
      when: "Any fever in a patient who lives in or has travelled to a malarious area.",
      why: "Malaria is a common cause of fever and anaemia and must be treated before elective surgery.",
      ifUnavailable: "Postpone elective surgery in a febrile patient and manage according to national malaria guidelines.",
      sources: ["WHO Surgical Care at the District Hospital (2003) and WHO Surgical Safety Checklist"],
      textbook: []
    },
    {
      id: "tb-test",
      test: "Sputum Xpert MTB/RIF (GeneXpert) or smear microscopy",
      when: "Cough for 2 weeks or more, weight loss, night sweats, haemoptysis, or a chest X-ray suggesting TB; any cough in a person living with HIV.",
      why: "Infectious pulmonary TB endangers staff and other patients and should be treated before elective surgery.",
      ifUnavailable: "Send the sample to the nearest TB laboratory and postpone elective surgery until TB is excluded or treated.",
      sources: ["WHO consolidated guidelines on tuberculosis"],
      textbook: []
    },
    {
      id: "sickle-test",
      test: "Sickle solubility test or haemoglobin electrophoresis",
      when: "Patients from areas where sickle cell disease occurs, or with a family history, unexplained anaemia, jaundice or painful crises.",
      why: "Sickle cell disease needs specific preparation (hydration, oxygen, warmth, often transfusion) to prevent crises and acute chest syndrome.",
      ifUnavailable: "Ask about painful crises, previous transfusions and family history; look at a blood film for sickled cells.",
      sources: [
        "TAPS trial — Howard et al., Lancet 2013; BSH guideline on red cell transfusion in sickle cell disease (2016)"
      ],
      textbook: []
    },
    {
      id: "drug-level",
      test: "Drug levels (lithium, digoxin, phenytoin)",
      when: "Patients on lithium before major surgery; digoxin or phenytoin with signs of toxicity, kidney impairment or poor seizure control.",
      why: "These drugs have narrow safety margins, and fasting, dehydration and interacting drugs push levels into the toxic range.",
      ifUnavailable: "Look for toxicity: lithium — coarse tremor, vomiting, diarrhoea, confusion, unsteadiness; digoxin — nausea, visual disturbance, slow or irregular pulse; phenytoin — nystagmus, unsteadiness, slurred speech. Check creatinine. If toxic, hold the drug and discuss before surgery.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "dvt-ultrasound",
      test: "Compression ultrasound of the leg veins",
      when: "Suspected deep vein thrombosis (one swollen, tender leg).",
      why: "An untreated DVT before surgery can become a fatal pulmonary embolism.",
      ifUnavailable: "Use a clinical score (Wells). If DVT or PE is likely and there is no contraindication, start anticoagulation and postpone elective surgery. D-dimer helps only to rule out clot when the clinical probability is low; it is usually unavailable and is often raised anyway after trauma, surgery, infection or in pregnancy. CT pulmonary angiography is not needed to make the decision to postpone.",
      sources: ["NICE NG89: Venous thromboembolism in over 16s — reducing the risk (2018, updated 2019)"],
      textbook: []
    }
  ],
  conditions: [
    {
      id: "all-patients",
      label: "Every patient (core assessment)",
      group: "general",
      ask: [
        "What operation, and is it elective, urgent or an emergency?",
        "Previous anaesthetics: any problems — difficult intubation, severe nausea, slow waking, prolonged paralysis, awareness?",
        "Family history of anaesthetic problems: unexplained death or very high fever under anaesthesia (malignant hyperthermia), prolonged paralysis after suxamethonium.",
        "Allergies: drugs (especially antibiotics), latex, plasters — and what actually happened.",
        "Every medication, including injections, contraceptives, inhalers, eye drops, over-the-counter drugs, traditional and herbal remedies.",
        "Exercise tolerance: can they climb two flights of stairs without stopping?",
        "Chest pain, breathlessness, lying flat, swollen ankles, palpitations, fainting.",
        "Cough, sputum, fever, recent cold or chest infection; TB symptoms (cough 2 weeks, night sweats, weight loss).",
        "Bleeding: excess bleeding after tooth extraction, circumcision, childbirth or previous surgery; easy bruising; heavy periods; family history.",
        "Previous DVT or pulmonary embolism.",
        "Smoking, alcohol (amount, last drink), khat (an amphetamine-like stimulant — when last chewed), other drugs.",
        "Women: last menstrual period, possibility of pregnancy.",
        "Loose teeth, crowns, dentures; reflux or heartburn; snoring or witnessed pauses in breathing.",
        "Time of the last food and the last drink."
      ],
      examine: [
        "Weight (always — doses depend on it), height and BMI.",
        "Pulse rate and rhythm, blood pressure (correct cuff size, repeat if high), respiratory rate, SpO2 on air, temperature.",
        "Pallor, jaundice, cyanosis, oedema, hydration.",
        "Heart sounds and murmurs; chest.",
        "Airway: mouth opening, Mallampati class, teeth, thyromental distance, neck movement.",
        "Lumbar spine and skin over it if a spinal is planned.",
        "Veins for IV access; nutritional state."
      ],
      investigate: ["spo2", "functional-capacity"],
      optimise: [
        "Assign an ASA physical status class (1 healthy, 2 mild systemic disease, 3 severe systemic disease, 4 severe disease that is a constant threat to life, 5 moribund; add E for emergency).",
        "Estimate cardiac risk with the Revised Cardiac Risk Index — one point each for high-risk surgery (intraperitoneal, intrathoracic, or suprainguinal vascular), ischaemic heart disease, heart failure, cerebrovascular disease, insulin-treated diabetes, and creatinine above 177 µmol/L (2.0 mg/dL). Two or more points with poor or unknown functional capacity means elevated risk: discuss with the anaesthetist and a physician before elective major surgery.",
        "Order tests only when the 'when' rule for that test applies — a healthy patient having minor surgery usually needs none.",
        "Advise stopping smoking now — any time helps; 4 weeks or more reduces wound and lung complications.",
        "Assess VTE risk and plan prophylaxis.",
        "Explain the anaesthetic and surgical risks and obtain informed consent."
      ],
      dayOfSurgery: [
        "Confirm fasting times and which medications were taken this morning.",
        "Complete the WHO Surgical Safety Checklist: identity, site marked, consent, allergies, airway and aspiration risk, expected blood loss and blood available.",
        "Give antibiotic prophylaxis, when indicated, within 60 minutes before the incision.",
        "Repeat the vital signs; anxiety raises blood pressure — recheck after rest before deciding to cancel."
      ],
      postponeIf: [
        "Systolic BP 180 or more, or diastolic 110 or more, on repeated readings after rest.",
        "Unexplained fever of 38 °C or more.",
        "Acute chest infection or wheeze.",
        "Possible pregnancy not yet excluded.",
        "Not fasted — delay to meet the fasting times rather than cancel."
      ],
      sources: [
        "ASA Physical Status Classification System",
        "Revised Cardiac Risk Index — Lee et al., Circulation 1999",
        "NICE NG45: Routine preoperative tests for elective surgery (2016)",
        "WHO Surgical Care at the District Hospital (2003) and WHO Surgical Safety Checklist",
        "WHO: Tobacco and postsurgical outcomes (2020)"
      ],
      textbook: []
    },
    {
      id: "child",
      label: "Child (under 16 years)",
      group: "general",
      ask: [
        "Recent cold, cough, fever or wheeze (within the last 2–4 weeks).",
        "Born preterm? Gestation at birth and current age — former preterm infants are at risk of apnoea after anaesthesia.",
        "Snoring, pauses in breathing, enlarged tonsils.",
        "Known heart murmur or congenital heart disease; previous operations.",
        "Bleeding history (circumcision, tooth extraction).",
        "Vaccination status; feeding and recent weight change.",
        "Loose teeth.",
        "Exactly when the child last ate, breastfed and drank."
      ],
      examine: [
        "Weight on a scale today — every drug and fluid dose depends on it.",
        "Temperature, respiratory rate, SpO2.",
        "Nose (colour of discharge), throat and tonsils, chest for wheeze or crackles.",
        "Hydration, pallor, nutrition (weight-for-height, MUAC), murmurs."
      ],
      investigate: ["spo2", "fbc", "malaria-test", "sickle-test"],
      optimise: [
        "Treat anaemia and malnutrition before elective surgery.",
        "A child with a current respiratory infection: see the postpone list; wait about 2 weeks after recovery (some advise up to 4 weeks).",
        "Former preterm infants under about 60 weeks post-conceptional age need overnight apnoea monitoring after anaesthesia — do elective surgery only where that monitoring exists.",
        "Prepare a weight-based chart of emergency drug doses and fluids before induction."
      ],
      dayOfSurgery: [
        "Put children first on the list to shorten fasting; encourage clear fluids up to the permitted time.",
        "If the fast becomes long, start a glucose-containing maintenance infusion.",
        "Let a parent stay until induction where possible."
      ],
      postponeIf: [
        "Respiratory infection with fever above 38 °C, purulent nasal discharge, productive cough, wheeze or low SpO2.",
        "Diarrhoea with dehydration.",
        "Severe acute malnutrition (elective surgery).",
        "Former preterm infant needing apnoea monitoring that the hospital cannot provide."
      ],
      sources: [
        "Tait & Malviya: anesthesia for the child with an upper respiratory tract infection, Anesth Analg 2005",
        "Coté et al., postoperative apnoea in former preterm infants, Anesthesiology 1995",
        "ESAIC guideline: Pre-operative fasting in children (2022)"
      ],
      textbook: []
    },
    {
      id: "elderly-frail",
      label: "Older or frail patient (over 65, or frail at any age)",
      group: "general",
      ask: [
        "Memory and thinking before this illness (ask family); any previous delirium after surgery.",
        "Falls, walking aids, ability to wash, dress and eat independently.",
        "Who they live with and who will care for them after discharge.",
        "Glasses, hearing aids, dentures.",
        "Weight loss, appetite, swallowing.",
        "Full medication list — many drugs, especially sedatives and anticholinergics, cause delirium."
      ],
      examine: [
        "Frailty (Clinical Frailty Scale); baseline cognition; screen for current delirium (4AT).",
        "Hydration, nutrition, pressure areas.",
        "Lying and standing blood pressure if falls or dizziness."
      ],
      investigate: ["fbc", "renal", "ecg", "glucose"],
      optimise: [
        "Review and simplify medications; avoid starting benzodiazepines and anticholinergic drugs.",
        "Treat anaemia, dehydration and malnutrition.",
        "Plan delirium prevention: glasses and hearing aids, a family member present, orientation, good pain control with regular paracetamol, early mobilisation.",
        "Discuss goals of care and expected recovery honestly with the patient and family."
      ],
      dayOfSurgery: [
        "Avoid long fasts — older patients dehydrate quickly; allow clear fluids up to 2 hours before.",
        "Glasses, hearing aids and dentures go with them to recovery.",
        "Lower doses of sedatives and opioids."
      ],
      postponeIf: [
        "New confusion (delirium) — find the cause first: infection, urinary retention, hypoglycaemia, drugs, hypoxia."
      ],
      sources: [
        "Clinical Frailty Scale (Rockwood); 4AT delirium assessment",
        "NICE NG45: Routine preoperative tests for elective surgery (2016)"
      ],
      textbook: []
    },
    {
      id: "pregnancy",
      label: "Pregnant, or might be pregnant",
      group: "general",
      ask: [
        "Last menstrual period; contraception; possibility of pregnancy.",
        "If pregnant: gestation, antenatal problems, pre-eclampsia."
      ],
      examine: ["Blood pressure, fundal height, fetal heart if viable."],
      investigate: ["pregnancy-test", "fbc"],
      optimise: [
        "Postpone purely elective non-obstetric surgery until after delivery.",
        "Surgery that is needed but not an emergency is safest in the second trimester (ACOG).",
        "Emergency surgery is never withheld because of pregnancy — involve the obstetric team.",
        "Plan VTE prophylaxis — pregnancy is a high-risk state."
      ],
      dayOfSurgery: [
        "From about 20 weeks, tilt or wedge to the left to avoid compression of the vena cava when lying flat.",
        "Treat as a full stomach from the second trimester: antacid prophylaxis and rapid-sequence induction if general anaesthesia.",
        "Check the fetal heart before and after surgery when the fetus is viable."
      ],
      postponeIf: ["Elective surgery while pregnant, or while pregnancy status is unresolved."],
      sources: [
        "ACOG Committee Opinion 775: Nonobstetric surgery during pregnancy (2019)",
        "NICE NG45: Routine preoperative tests for elective surgery (2016)"
      ],
      textbook: []
    },
    {
      id: "hiv",
      label: "HIV infection",
      group: "general",
      ask: [
        "ART regimen, adherence, and how long on treatment.",
        "Latest CD4 count and viral load.",
        "Opportunistic infections (TB, cryptococcal meningitis, others); co-trimoxazole prophylaxis.",
        "TB symptoms."
      ],
      examine: [
        "Weight and wasting; oral thrush; lymph nodes; chest; neurological deficit.",
        "Look in the mouth for Kaposi's sarcoma (can bleed or obstruct the airway)."
      ],
      investigate: ["fbc", "renal", "lft-albumin", "tb-test", "hiv-test"],
      optimise: [
        "Continue ART without interruption.",
        "Screen for and treat TB and other opportunistic infections before elective surgery.",
        "Advanced disease (CD4 below 200 cells/µL, or active opportunistic infection) is associated with more wound and other complications; it is not on its own a bar to surgery.",
        "Check drug interactions — ritonavir-boosted protease inhibitors greatly increase midazolam and fentanyl levels.",
        "Improve nutrition."
      ],
      dayOfSurgery: [
        "Give ART doses on time with a sip of water.",
        "Standard precautions as for every patient; post-exposure prophylaxis available for staff injuries."
      ],
      postponeIf: ["Active opportunistic infection or untreated TB (elective surgery)."],
      sources: ["WHO consolidated HIV guidelines; Ethiopian national consolidated HIV guidelines"],
      textbook: []
    },
    {
      id: "hypertension",
      label: "Hypertension",
      group: "cardiovascular",
      ask: [
        "How long; which drugs and doses; does the patient actually take them?",
        "Home or clinic readings over the past year.",
        "Angina, heart failure, stroke or kidney disease (end-organ damage).",
        "NSAIDs or steroids that raise BP."
      ],
      examine: [
        "Blood pressure with the correct cuff, after 5 minutes' rest, repeated 2–3 times.",
        "Signs of heart failure; heave of left ventricular hypertrophy."
      ],
      investigate: ["renal", "ecg", "urinalysis"],
      optimise: [
        "Continue antihypertensives (see medications for ACE inhibitors, ARBs and diuretics).",
        "If BP is 180/110 or above, postpone elective surgery and treat in clinic over weeks; aim for below 160/100 before re-booking (AAGBI/BHS 2016).",
        "Do NOT bring BP down rapidly in the ward before surgery — no sublingual nifedipine — a sudden fall can cause stroke or myocardial infarction.",
        "Do not start a new beta-blocker in the 24 hours before surgery (POISE)."
      ],
      dayOfSurgery: [
        "Give the usual morning antihypertensives except ACE inhibitors/ARBs and diuretics (see medication rules).",
        "Untreated hypertensives have bigger falls in BP after induction and spinal anaesthesia."
      ],
      postponeIf: [
        "Systolic 180 or more, or diastolic 110 or more, sustained on repeated readings.",
        "New end-organ damage (chest pain, heart failure, neurological signs, rising creatinine)."
      ],
      sources: [
        "AAGBI / British Hypertension Society: Measurement of adult blood pressure and management of hypertension before elective surgery (2016)",
        "POISE trial (Lancet 2008) and POISE-2 trial (NEJM 2014)",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)"
      ],
      textbook: []
    },
    {
      id: "ihd",
      label: "Angina or previous myocardial infarction",
      group: "cardiovascular",
      ask: [
        "Angina: how often, what brings it on, any change recently, any pain at rest?",
        "Date of any heart attack; any angioplasty, stent or bypass operation (date and type).",
        "Breathlessness, orthopnoea, ankle swelling.",
        "Functional capacity; current drugs."
      ],
      examine: ["Pulse, BP, signs of heart failure.", "Murmurs — aortic stenosis also causes angina."],
      investigate: ["ecg", "fbc", "renal", "functional-capacity", "echo", "glucose"],
      optimise: [
        "Continue beta-blocker, statin and aspirin.",
        "Do not start a new beta-blocker in the 24 hours before surgery (POISE: more strokes and deaths).",
        "Consider starting a statin if the patient qualifies for one anyway.",
        "Coronary revascularisation before non-cardiac surgery only for the same reasons it would be done anyway — not simply because surgery is planned.",
        "Treat anaemia, which worsens ischaemia.",
        "Unstable or worsening symptoms need a physician or cardiologist before elective surgery."
      ],
      dayOfSurgery: [
        "Give beta-blocker and statin; continue aspirin.",
        "Avoid tachycardia and hypotension; have GTN available."
      ],
      postponeIf: [
        "Myocardial infarction within the last 60 days (minimum; many anaesthetists prefer 3–6 months).",
        "Unstable angina — new, worsening, or at rest.",
        "New ischaemic changes on the ECG.",
        "Decompensated heart failure."
      ],
      sources: [
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "POISE trial (Lancet 2008) and POISE-2 trial (NEJM 2014)"
      ],
      textbook: []
    },
    {
      id: "coronary-stent",
      label: "Coronary stent (angioplasty / PCI)",
      group: "cardiovascular",
      ask: [
        "Date of the stent, type (bare-metal or drug-eluting), and why it was placed — a heart attack/acute coronary syndrome, or stable angina?",
        "Current antiplatelet drugs and who prescribes them; ask for the stent card or discharge letter."
      ],
      examine: ["As for angina."],
      investigate: ["ecg", "fbc", "group-crossmatch"],
      optimise: [
        "Never stop aspirin in a patient with a stent unless a cardiologist agrees.",
        "Postpone elective surgery until the minimum dual antiplatelet period is over: 6 months after a stent for stable disease, 12 months after a stent for an acute coronary syndrome (ESC 2022; ACC/AHA similar).",
        "Time-sensitive surgery (for example cancer) may proceed from 1 month after the stent, with aspirin continued, after discussion with a cardiologist.",
        "When the period is over: stop clopidogrel 5 days before, continue aspirin, and restart clopidogrel within 24–48 hours after surgery.",
        "Stent thrombosis presents as a heart attack, and most Ethiopian hospitals cannot do emergency PCI — this is why the delay matters so much."
      ],
      dayOfSurgery: [
        "Aspirin taken this morning.",
        "No spinal or epidural if clopidogrel was taken in the last 5–7 days; aspirin alone does not prevent one (ASRA)."
      ],
      postponeIf: ["Stent within the minimum period above when surgery would require stopping clopidogrel."],
      sources: [
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)",
        "ASRA evidence-based guidelines: Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy (4th edition, 2018)"
      ],
      textbook: []
    },
    {
      id: "heart-failure",
      label: "Heart failure",
      group: "cardiovascular",
      ask: [
        "Breathlessness lying flat or waking at night; exercise tolerance; ankle swelling; recent admissions.",
        "Cause: rheumatic valve disease, hypertension, cardiomyopathy, peripartum.",
        "Drugs and doses; weight trend."
      ],
      examine: ["JVP, basal crackles, third heart sound, oedema, enlarged liver; SpO2; BP."],
      investigate: ["echo", "ecg", "renal", "fbc", "cxr"],
      optimise: [
        "Treat to the patient's best (dry) state before any elective surgery.",
        "Continue guideline heart failure medications; correct potassium.",
        "Severely reduced ventricular function means high risk — major elective surgery belongs at a referral centre."
      ],
      dayOfSurgery: [
        "Continue the beta-blocker. ACE inhibitor/ARB and diuretic: practice differs in heart failure — many continue them — confirm with the anaesthetist.",
        "Careful IV fluids; a spinal can cause profound hypotension."
      ],
      postponeIf: ["Decompensated or new heart failure."],
      sources: [
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "AHA/ACC/HFSA guideline for the management of heart failure (2022)"
      ],
      textbook: []
    },
    {
      id: "valve-disease",
      label: "Valve disease, rheumatic heart disease, or mechanical valve",
      group: "cardiovascular",
      ask: [
        "Diagnosis and last echo; symptoms — breathlessness, fainting, chest pain, palpitations.",
        "Atrial fibrillation; previous stroke.",
        "Valve surgery: mechanical or tissue valve, and which position (mitral or aortic)?",
        "Anticoagulant, INR control and who monitors it; monthly benzathine penicillin."
      ],
      examine: [
        "Murmurs: ejection systolic radiating to the neck with a slow-rising pulse (aortic stenosis); mid-diastolic rumble with loud first sound (mitral stenosis); pansystolic (mitral regurgitation).",
        "Mechanical valve clicks; signs of heart failure or pulmonary hypertension; pulse rhythm."
      ],
      investigate: ["echo", "ecg", "coag", "fbc", "cxr"],
      optimise: [
        "Severe symptomatic aortic or mitral stenosis needs cardiology assessment (often valve treatment first) before elective non-cardiac surgery.",
        "Control the heart rate in AF, especially in mitral stenosis.",
        "Plan anticoagulation using the warfarin rules — a mechanical valve is the main indication for heparin bridging.",
        "Endocarditis prophylaxis: current guidance restricts extra antibiotics to high-risk patients (prosthetic valve, previous endocarditis, some congenital heart disease) having dental procedures that manipulate the gums; ordinary surgical prophylaxis still applies. Continue secondary penicillin prophylaxis."
      ],
      dayOfSurgery: [
        "Mitral stenosis: avoid tachycardia and fluid overload.",
        "Severe aortic stenosis: avoid hypotension and vasodilation; a single-shot spinal is risky — confirm the anaesthetic plan with the anaesthetist."
      ],
      postponeIf: [
        "Symptomatic severe aortic or mitral stenosis without specialist assessment.",
        "INR outside the acceptable range on the day.",
        "Mechanical valve with no bridging plan in place."
      ],
      sources: [
        "ACC/AHA guideline for the management of patients with valvular heart disease (2020)",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "AHA scientific statement on prevention of viridans group streptococcal infective endocarditis (2021); ESC endocarditis guidelines (2023)"
      ],
      textbook: []
    },
    {
      id: "af-arrhythmia",
      label: "Atrial fibrillation, heart block or other arrhythmia",
      group: "cardiovascular",
      ask: [
        "Palpitations, fainting, dizziness; previous stroke or TIA.",
        "Rate-control drugs and anticoagulant; who monitors the INR.",
        "Possible causes: rheumatic mitral valve disease, thyroid, hypertension, alcohol."
      ],
      examine: [
        "Apical and radial pulse together (pulse deficit); BP; murmurs; thyroid; signs of heart failure."
      ],
      investigate: ["ecg", "renal", "tft", "echo", "coag"],
      optimise: [
        "Resting ventricular rate above 100 in AF: find the cause (thyroid, sepsis, hypovolaemia, low potassium) and control the rate over days before elective surgery.",
        "Do not start a new beta-blocker in the final 24 hours before surgery; continue existing rate-control drugs.",
        "Anticoagulation: AF alone, at any CHA2DS2-VASc score, does NOT need heparin bridging when warfarin is stopped (BRIDGE trial: bridging increased major bleeding without reducing stroke). See the warfarin rules.",
        "Mobitz type II or complete heart block, or symptomatic bradycardia: needs pacing assessment before elective surgery. First-degree block and Mobitz type I without symptoms usually need nothing."
      ],
      dayOfSurgery: [
        "Give rate-control drugs (beta-blocker, digoxin, verapamil/diltiazem) as usual.",
        "Check potassium; defibrillator and atropine ready."
      ],
      postponeIf: [
        "AF with resting rate above 100.",
        "New AF not yet assessed.",
        "Mobitz II or complete heart block; symptomatic bradycardia."
      ],
      sources: [
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "BRIDGE trial — Douketis et al., Perioperative bridging anticoagulation in patients with atrial fibrillation, NEJM 2015",
        "American College of Chest Physicians (CHEST) guideline: Perioperative management of antithrombotic therapy (2022)"
      ],
      textbook: []
    },
    {
      id: "pacemaker-icd",
      label: "Pacemaker or implantable defibrillator (ICD)",
      group: "cardiovascular",
      ask: [
        "Pacemaker or ICD? Why fitted? Was the patient fainting or in complete heart block before (pacing-dependent)?",
        "Date of the last device check; device card and manufacturer."
      ],
      examine: ["Device pocket; pulse (fixed paced rate?); pacing spikes on ECG."],
      investigate: ["ecg", "renal"],
      optimise: [
        "Device checked within the last 12 months (pacemaker) or 6 months (ICD) — HRS/ASA consensus.",
        "Use bipolar diathermy where possible. With monopolar diathermy, place the return plate so the current path does not cross the device, and use short bursts.",
        "ICD: anti-tachycardia therapies must be suspended for surgery with monopolar diathermy above the umbilicus — by a programmer, or by taping a magnet over the device — with external defibrillator pads on the patient.",
        "Pacing-dependent patient with a pacemaker: a magnet usually switches to fixed-rate (asynchronous) pacing. Magnet responses vary by manufacturer — confirm with the anaesthetist and, if possible, a cardiac technician.",
        "A magnet over an ICD stops shocks but does NOT switch its pacing to asynchronous."
      ],
      dayOfSurgery: [
        "Defibrillator with pads in theatre; magnet available.",
        "Monitor the pulse with the oximeter trace — diathermy obscures the ECG.",
        "After surgery: remove the magnet or re-enable ICD therapies before the patient leaves monitoring; device check if monopolar diathermy was used near it."
      ],
      postponeIf: [
        "ICD whose therapies cannot be suspended when monopolar diathermy above the umbilicus is needed — refer.",
        "Device malfunction or overdue check in a pacing-dependent patient."
      ],
      sources: [
        "HRS / ASA expert consensus statement on perioperative management of implantable pacemakers and defibrillators (2011)"
      ],
      textbook: []
    },
    {
      id: "anaemia",
      label: "Anaemia",
      group: "haematological",
      ask: [
        "Tiredness, breathlessness, chest pain.",
        "Blood loss: stool, vomit, heavy periods.",
        "Diet; hookworm or schistosomiasis exposure; malaria; kidney disease; HIV drugs (zidovudine).",
        "Previous transfusions and reactions; any objection to transfusion."
      ],
      examine: ["Pallor, tachycardia, flow murmur, heart failure, spoon nails, jaundice, splenomegaly."],
      investigate: ["fbc", "group-crossmatch", "malaria-test", "renal"],
      optimise: [
        "Anaemia is haemoglobin below 13 g/dL in men and 12 g/dL in non-pregnant women (WHO); before surgery with expected blood loss, the international consensus treats below 13 g/dL as anaemia in both sexes.",
        "Find and treat the cause: iron, deworming, malaria, bleeding source.",
        "Oral iron takes weeks to raise haemoglobin; IV iron, where available, is faster when surgery is under 6 weeks away.",
        "Do not transfuse simply to 'top up' before surgery. Restrictive thresholds: transfuse below 7 g/dL; below 8 g/dL with cardiovascular disease or orthopaedic surgery (AABB 2023).",
        "There is no single evidence-based haemoglobin below which all elective surgery must be cancelled; many anaesthetists will not start major elective surgery with expected blood loss below about 10 g/dL without a plan — guidelines differ; decide with the anaesthetist."
      ],
      dayOfSurgery: [
        "Crossmatch according to expected blood loss.",
        "Tranexamic acid reduces blood loss in major surgery — confirm with the surgeon and anaesthetist."
      ],
      postponeIf: [
        "Unexplained anaemia before major elective surgery with expected blood loss — investigate and treat first.",
        "Haemoglobin below 7 g/dL before any elective surgery."
      ],
      sources: [
        "WHO guideline on haemoglobin cut-offs to define anaemia",
        "International consensus statement on the peri-operative management of anaemia and iron deficiency (Anaesthesia 2017)",
        "AABB international guidelines for red blood cell transfusion (JAMA 2023)"
      ],
      textbook: []
    },
    {
      id: "sickle-cell",
      label: "Sickle cell disease",
      group: "haematological",
      ask: [
        "Frequency of painful crises; acute chest syndrome; stroke; previous transfusions and antibodies; hydroxyurea."
      ],
      examine: ["Pallor, jaundice, spleen, chest, hydration, leg ulcers."],
      investigate: ["sickle-test", "fbc", "group-crossmatch", "renal", "spo2"],
      optimise: [
        "For HbSS patients having low- or medium-risk surgery (most abdominal surgery), preoperative transfusion to a haemoglobin of about 10 g/dL reduced complications (TAPS trial) — plan with a haematologist; do not over-transfuse.",
        "Avoid dehydration, hypoxia, cold and acidosis."
      ],
      dayOfSurgery: [
        "IV fluids from the start of fasting; oxygen; keep warm; good analgesia; early mobilisation and breathing exercises."
      ],
      postponeIf: ["Painful crisis, acute chest syndrome or fever."],
      sources: [
        "TAPS trial — Howard et al., Lancet 2013; BSH guideline on red cell transfusion in sickle cell disease (2016)"
      ],
      textbook: []
    },
    {
      id: "bleeding-disorder",
      label: "Bleeding tendency or known bleeding disorder",
      group: "haematological",
      ask: [
        "Bleeding after tooth extraction, circumcision, surgery or childbirth; heavy periods; spontaneous bruising; joint bleeds.",
        "Family history; liver disease; anticoagulant and antiplatelet drugs; herbal remedies."
      ],
      examine: ["Bruises, petechiae, joint deformity, liver and spleen size."],
      investigate: ["fbc", "coag", "lft-albumin", "group-crossmatch"],
      optimise: [
        "A positive bleeding history matters more than a normal routine screen.",
        "Known haemophilia or von Willebrand disease: surgery only where factor replacement is available — refer.",
        "Platelet thresholds: at least 50 × 10⁹/L for most surgery, 80 × 10⁹/L for a spinal or epidural, 100 × 10⁹/L for neurosurgery or posterior eye surgery (BSH 2017).",
        "Vitamin K corrects vitamin K deficiency (malnutrition, obstructive jaundice) but corrects liver-disease coagulopathy poorly."
      ],
      dayOfSurgery: [
        "No spinal or epidural if platelets are below 80 × 10⁹/L or INR above 1.4.",
        "Avoid NSAIDs and IM injections; tranexamic acid available."
      ],
      postponeIf: [
        "Unexplained bleeding history not yet investigated before major elective surgery.",
        "Platelets or INR outside the thresholds for the planned operation."
      ],
      sources: [
        "British Society for Haematology: Guidelines for the use of platelet transfusions (2017)",
        "AAGBI / OAA / RA-UK: Regional anaesthesia and patients with abnormalities of coagulation (2013)"
      ],
      textbook: []
    },
    {
      id: "vte-risk",
      label: "Previous DVT/PE, thrombophilia, or high VTE risk",
      group: "haematological",
      ask: [
        "Previous DVT or PE: when, and was there a cause (surgery, pregnancy, immobility)?",
        "Current anticoagulant; family history; cancer; combined pill or HRT; recent pregnancy."
      ],
      examine: ["Legs for swelling or tenderness; tachycardia or low SpO2 (possible PE); BMI."],
      investigate: ["dvt-ultrasound", "coag", "fbc"],
      optimise: [
        "Assess VTE risk (NICE NG89 tool or Caprini score) for every surgical admission.",
        "Stop the combined pill 4 weeks before major surgery or surgery with immobilisation (see medications).",
        "DVT or PE within the last 3 months: postpone elective surgery until at least 3 months of anticoagulation. If surgery cannot wait, bridging is justified — specialist decision.",
        "DVT or PE more than 3 months ago: no bridging; prophylactic-dose LMWH after surgery until warfarin is back in range."
      ],
      dayOfSurgery: [
        "Prophylaxis: enoxaparin 40 mg SC once daily or unfractionated heparin 5,000 units SC every 8–12 hours, first dose 6–12 hours after surgery when haemostasis is secure (time it around any spinal — see heparin rules).",
        "Mechanical measures (stockings — not with peripheral arterial disease) and early mobilisation."
      ],
      postponeIf: ["DVT or PE within the last 3 months.", "Suspected new DVT or PE."],
      sources: [
        "NICE NG89: Venous thromboembolism in over 16s — reducing the risk (2018, updated 2019)",
        "American College of Chest Physicians (CHEST) guideline: Perioperative management of antithrombotic therapy (2022)",
        "ASRA evidence-based guidelines: Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy (4th edition, 2018)"
      ],
      textbook: []
    },
    {
      id: "asthma-copd",
      label: "Asthma or COPD",
      group: "respiratory",
      ask: [
        "Hospital admissions, ICU or intubation for asthma; oral steroid courses in the past year.",
        "Night symptoms, reliever use, recent change in sputum colour.",
        "Asthma triggered by aspirin or NSAIDs?",
        "Home oxygen; exercise tolerance; smoking."
      ],
      examine: ["Respiratory rate, SpO2, wheeze, use of accessory muscles, signs of right heart failure."],
      investigate: ["spo2", "peak-flow", "cxr", "abg", "fbc"],
      optimise: [
        "Continue all inhalers; check inhaler technique.",
        "If not at their best, step up treatment — a short course of oral prednisolone may be needed — and re-book.",
        "Stop smoking; teach deep-breathing exercises (preoperative inspiratory muscle training reduces lung complications).",
        "Use a regional technique where suitable.",
        "NSAID-sensitive asthma: no NSAIDs."
      ],
      dayOfSurgery: [
        "Take usual inhalers this morning and bring them to theatre; salbutamol before induction.",
        "Steroid cover if on long-term oral steroids (see medications)."
      ],
      postponeIf: ["Current exacerbation, wheeze, or SpO2 below the patient's usual.", "Chest infection."],
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "chest-infection",
      label: "Current or recent chest infection or cold",
      group: "respiratory",
      ask: ["When it started; fever, sputum, breathlessness; cough longer than 2 weeks."],
      examine: ["Temperature, respiratory rate, SpO2, crackles or bronchial breathing."],
      investigate: ["cxr", "fbc", "tb-test", "malaria-test"],
      optimise: [
        "Treat the infection and postpone elective surgery until recovered.",
        "After pneumonia, airway irritability persists — many anaesthetists wait 4–6 weeks before major elective surgery."
      ],
      dayOfSurgery: [
        "Emergency surgery: treat the infection, oxygen, regional anaesthesia where possible, physiotherapy after."
      ],
      postponeIf: ["Fever, productive cough, crackles, wheeze or low SpO2."],
      sources: [
        "Tait & Malviya: anesthesia for the child with an upper respiratory tract infection, Anesth Analg 2005"
      ],
      textbook: []
    },
    {
      id: "tb",
      label: "Tuberculosis (active or on treatment)",
      group: "respiratory",
      ask: [
        "Date of diagnosis, treatment phase, adherence, sputum results; HIV status; drug-resistant TB?"
      ],
      examine: ["Weight, chest, SpO2."],
      investigate: ["tb-test", "cxr", "lft-albumin", "hiv-test", "fbc"],
      optimise: [
        "Defer elective surgery in pulmonary TB until no longer infectious — usually at least 2 weeks of effective treatment with clinical improvement; confirm with the TB clinic.",
        "Continue TB drugs; check liver function (isoniazid, rifampicin, pyrazinamide are hepatotoxic).",
        "Rifampicin speeds the breakdown of warfarin, steroids, contraceptives and many other drugs — doses may need changing."
      ],
      dayOfSurgery: [
        "Continue TB treatment.",
        "If an infectious patient needs emergency surgery: last on the list, filter on the breathing circuit, N95 masks for staff."
      ],
      postponeIf: ["Untreated or newly treated infectious pulmonary TB (elective surgery)."],
      sources: ["WHO consolidated guidelines on tuberculosis"],
      textbook: []
    },
    {
      id: "osa",
      label: "Obstructive sleep apnoea (known or suspected)",
      group: "respiratory",
      ask: [
        "STOP-Bang: Snoring, Tiredness in the day, Observed pauses in breathing, high blood Pressure, BMI above 35, Age over 50, Neck over 40 cm, male Gender. Score 5–8 = high risk, 3–4 = intermediate.",
        "Uses CPAP at home?"
      ],
      examine: ["Neck circumference, airway, BMI, BP; signs of right heart failure."],
      investigate: ["spo2", "ecg"],
      optimise: [
        "Bring the CPAP machine to hospital.",
        "Plan opioid-sparing analgesia and regional techniques; avoid sedative premedication."
      ],
      dayOfSurgery: ["Continuous pulse oximetry after surgery; nurse sitting up."],
      postponeIf: [
        "Suspected severe sleep apnoea with daytime hypoventilation or right heart failure before major elective surgery — refer."
      ],
      sources: [
        "STOP-Bang questionnaire — Chung et al.",
        "AAGBI: Peri-operative management of the obese surgical patient (2015)"
      ],
      textbook: []
    },
    {
      id: "smoker",
      label: "Current smoker",
      group: "respiratory",
      ask: ["How much and for how long; cough and sputum."],
      examine: ["Chest; SpO2."],
      investigate: ["spo2"],
      optimise: [
        "Stop now — any time helps. Four weeks or more reduces wound and lung complications; longer is better (WHO 2020).",
        "Even 12–24 hours without smoking lowers carbon monoxide in the blood."
      ],
      dayOfSurgery: ["Stopping smoking in hospital raises clozapine levels — check if the patient takes it."],
      postponeIf: [],
      sources: ["WHO: Tobacco and postsurgical outcomes (2020)"],
      textbook: []
    },
    {
      id: "liver-disease",
      label: "Liver disease or jaundice",
      group: "liver",
      ask: [
        "Cause: hepatitis B or C, alcohol, schistosomiasis, drugs.",
        "Jaundice, abdominal swelling, vomiting blood, confusion."
      ],
      examine: ["Jaundice, ascites, flapping tremor, spider naevi, splenomegaly, bruising, nutrition."],
      investigate: ["lft-albumin", "coag", "fbc", "renal", "glucose", "group-crossmatch"],
      optimise: [
        "Score with Child–Pugh: elective major surgery is generally acceptable in class A, needs optimisation and caution in class B, and is avoided in class C (classic studies show very high mortality).",
        "Treat ascites, encephalopathy and infection; improve nutrition.",
        "Vitamin K for a prolonged INR — it corrects deficiency, but not poor liver synthesis.",
        "Obstructive jaundice: hydrate well (kidney injury risk), vitamin K, treat cholangitis before elective surgery."
      ],
      dayOfSurgery: [
        "Check glucose (hypoglycaemia risk).",
        "No NSAIDs; reduce opioid and sedative doses; use a reduced maximum daily paracetamol dose in cirrhosis or low body weight — confirm the dose with the anaesthetist."
      ],
      postponeIf: [
        "Acute hepatitis.",
        "Child–Pugh class C (elective surgery).",
        "Jaundice not yet explained.",
        "Cholangitis or infected ascites until treated."
      ],
      sources: ["Child–Pugh and MELD scores (standard liver risk scoring)"],
      textbook: []
    },
    {
      id: "alcohol",
      label: "Heavy alcohol use",
      group: "liver",
      ask: [
        "How much, how often, time of the last drink; morning drinking.",
        "Previous withdrawal fits or delirium tremens."
      ],
      examine: ["Tremor, sweating, tachycardia, confusion; signs of liver disease; nutrition; unsteady gait."],
      investigate: ["fbc", "lft-albumin", "coag", "glucose", "renal"],
      optimise: [
        "Stopping alcohol 4–8 weeks before elective surgery reduces complications — but a dependent drinker needs a supervised withdrawal plan, not an abrupt stop.",
        "Give thiamine before any glucose.",
        "Plan withdrawal monitoring and treatment (chlordiazepoxide or diazepam)."
      ],
      dayOfSurgery: [
        "Thiamine IV or IM before glucose.",
        "Watch for withdrawal: tremor from 6–24 hours, fits at 12–48 hours, delirium tremens at 48–96 hours after the last drink."
      ],
      postponeIf: ["Signs of alcohol withdrawal or intoxication (elective surgery)."],
      sources: ["Cochrane review: preoperative alcohol cessation (2018)"],
      textbook: []
    },
    {
      id: "kidney-disease",
      label: "Chronic kidney disease or dialysis",
      group: "renal",
      ask: [
        "Cause and stage; dialysis schedule and type; urine output; fluid restriction.",
        "Previous high potassium; nephrotoxic drugs."
      ],
      examine: [
        "Fluid status: oedema, JVP, crackles; BP; pallor.",
        "AV fistula: feel for a thrill — protect that arm (no BP cuff, cannula or blood tests)."
      ],
      investigate: ["renal", "fbc", "ecg", "glucose"],
      optimise: [
        "Dialysis within the 24 hours before surgery (usually the day before), so fluid and potassium are corrected and the dialysis heparin has worn off.",
        "Treat potassium above 6.0 mmol/L and acidosis before elective surgery.",
        "Chronic anaemia of kidney disease is well tolerated; do not transfuse routinely.",
        "Avoid nephrotoxins (NSAIDs, gentamicin, contrast). Adjust drug doses for kidney function — enoxaparin and morphine accumulate; avoid pethidine."
      ],
      dayOfSurgery: [
        "Potassium on the morning of surgery.",
        "Suxamethonium raises potassium by about 0.5 mmol/L — tell the anaesthetist if potassium is high.",
        "Protect the fistula arm; careful fluids."
      ],
      postponeIf: [
        "Potassium above 6.0 mmol/L.",
        "Fluid overload or a missed dialysis.",
        "Acute kidney injury (rising creatinine) before elective surgery."
      ],
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "uti",
      label: "Urinary tract infection",
      group: "renal",
      ask: ["Burning, frequency, fever, loin pain; urinary catheter."],
      examine: ["Temperature; loin and suprapubic tenderness."],
      investigate: ["urinalysis"],
      optimise: [
        "Treat a symptomatic urinary infection before elective surgery, especially joint replacement, implants and urological surgery.",
        "Bacteria in the urine without symptoms: treat only before urological procedures that breach the lining of the urinary tract (for example TURP); not before other surgery (IDSA 2019)."
      ],
      dayOfSurgery: [
        "Emergency surgery: start antibiotics and keep a good urine output before, during and after surgery."
      ],
      postponeIf: ["Symptomatic infection or pyelonephritis before elective implant or urological surgery."],
      sources: ["IDSA clinical practice guideline for the management of asymptomatic bacteriuria (2019)"],
      textbook: []
    },
    {
      id: "malnutrition",
      label: "Malnutrition or recent weight loss",
      group: "endocrine",
      ask: [
        "Weight loss over the past 3–6 months; appetite and intake; vomiting, diarrhoea, difficulty swallowing.",
        "Underlying TB, HIV or cancer."
      ],
      examine: ["Weight, BMI, mid-upper arm circumference, muscle wasting, oedema."],
      investigate: ["lft-albumin", "fbc", "renal", "glucose"],
      optimise: [
        "Severe nutritional risk (ESPEN): weight loss over 10–15 % in 6 months, BMI below 18.5, or serum albumin below 30 g/L without liver or kidney disease. Delay major elective surgery for 7–14 days of nutritional support, by mouth or tube where possible.",
        "Very malnourished patients risk refeeding syndrome — start feeding slowly, give thiamine, and check potassium (and phosphate and magnesium where possible).",
        "Children with severe acute malnutrition: stabilise according to WHO protocols before elective surgery."
      ],
      dayOfSurgery: [
        "Minimise fasting; check glucose; dose drugs by actual weight; protect pressure areas; keep warm."
      ],
      postponeIf: ["Severe malnutrition before major elective surgery."],
      sources: ["ESPEN guideline: Clinical nutrition in surgery (2017, updated 2021)"],
      textbook: []
    },
    {
      id: "obesity",
      label: "Obesity (BMI 35 or above)",
      group: "endocrine",
      ask: [
        "Sleep apnoea (STOP-Bang); diabetes; hypertension; reflux; exercise tolerance; previous anaesthetics."
      ],
      examine: ["BMI, neck circumference, airway, BP with a large cuff, veins for access, skin folds."],
      investigate: ["glucose", "ecg", "spo2", "renal"],
      optimise: [
        "BMI 35 or above carries more complications; 40 or above more again. Screen for sleep apnoea and diabetes.",
        "Check that the theatre table, transfer equipment, large BP cuffs and long spinal needles are available.",
        "Weight loss before elective surgery if there is time."
      ],
      dayOfSurgery: [
        "Aspiration prophylaxis if reflux; head-up (ramped) positioning for induction.",
        "VTE prophylaxis dosed for weight — higher doses are often used at BMI 40 or above; confirm with the anaesthetist or pharmacist.",
        "Early mobilisation."
      ],
      postponeIf: ["Equipment or anaesthetic expertise not adequate for the patient's size — refer."],
      sources: [
        "AAGBI: Peri-operative management of the obese surgical patient (2015)",
        "STOP-Bang questionnaire — Chung et al."
      ],
      textbook: []
    },
    {
      id: "diabetes",
      label: "Diabetes",
      group: "endocrine",
      ask: [
        "Type 1 or type 2; exact names, doses and times of every diabetes drug (NPH, premixed 70/30, soluble insulin; metformin; glibenclamide).",
        "Hypoglycaemia: how often, can they feel it?",
        "Recent glucose readings; HbA1c; admissions with ketoacidosis.",
        "Complications: angina (may be silent), kidney disease, neuropathy (dizziness on standing, early fullness or vomiting), eyes, foot ulcers."
      ],
      examine: [
        "BP lying and standing; feet; injection sites; hydration.",
        "Airway: stiff joints (cannot press palms flat together — 'prayer sign') can mean a difficult intubation."
      ],
      investigate: ["glucose", "hba1c", "ketones", "renal", "ecg", "urinalysis"],
      optimise: [
        "HbA1c above 69 mmol/mol (8.5 %): improve control before elective surgery if the delay is safe (UK JBDS).",
        "Put the patient first on the morning list.",
        "Plan each medication using the medication rules — type 1 diabetics must never go without basal insulin.",
        "Target glucose 6–10 mmol/L (108–180 mg/dL); 4–12 mmol/L (72–216 mg/dL) is acceptable (JBDS).",
        "If the patient will miss more than one meal, is type 1 having major surgery, or control is poor, plan an insulin infusion. Without a pump, a glucose–insulin–potassium (GIK) bag is a recognised method — see the insulin rules."
      ],
      dayOfSurgery: [
        "Glucose on arrival, then at least every 1–2 hours while fasting, and hourly during surgery and on any insulin infusion.",
        "Glucose below 4 mmol/L (72 mg/dL): treat at once with IV dextrose (for example 150 mL of 10 % or 75 mL of 20 % over 10–15 minutes), recheck in 15 minutes.",
        "Glucose above 12 mmol/L (216 mg/dL): check ketones; give a correction dose of soluble insulin according to the local scale, or start GIK/insulin infusion.",
        "Do not rely on a subcutaneous sliding scale alone for a long fast."
      ],
      postponeIf: [
        "Ketoacidosis: blood ketones above 3 mmol/L, urine ketones 2+ or more, or acidosis; hyperosmolar state.",
        "Hypoglycaemia not corrected.",
        "HbA1c above 69 mmol/mol (8.5 %) when the operation can safely wait — refer to improve control."
      ],
      sources: [
        "JBDS-IP / CPOC: Perioperative care of people with diabetes undergoing surgery (2021, revised 2023)",
        "American Diabetes Association Standards of Care in Diabetes: Diabetes care in the hospital (current edition)",
        "JBDS-IP: The hospital management of hypoglycaemia in adults with diabetes mellitus (current edition)",
        "Alberti glucose–insulin–potassium regimen (Br J Anaesth 1979) and later reviews"
      ],
      textbook: []
    },
    {
      id: "steroid-dependent",
      label: "Long-term steroids or adrenal insufficiency",
      group: "endocrine",
      ask: [
        "Which steroid, what dose, for how long, and when stopped (within the last 3 months still counts).",
        "High-dose inhaled or topical steroids; Addison's disease."
      ],
      examine: ["Cushingoid features, BP, thin skin; glucose."],
      investigate: ["glucose", "renal"],
      optimise: [
        "Anyone taking prednisolone 5 mg a day or more (or equivalent) for 4 weeks or longer, now or within the last 3 months, is assumed to have a suppressed adrenal response and needs stress-dose cover (see medications).",
        "Control glucose; take care of fragile skin and wound healing."
      ],
      dayOfSurgery: [
        "Usual morning dose plus hydrocortisone cover at induction.",
        "Unexplained low blood pressure during or after surgery: think adrenal crisis — hydrocortisone 100 mg IV immediately."
      ],
      postponeIf: [],
      sources: [
        "AAGBI / RCP / Society for Endocrinology: Guidelines for the management of glucocorticoids during the peri-operative period (Anaesthesia 2020)"
      ],
      textbook: []
    },
    {
      id: "thyroid-disease",
      label: "Thyroid disease (over- or under-active)",
      group: "endocrine",
      ask: [
        "Weight loss, heat intolerance, palpitations, tremor (over-active); tiredness, cold intolerance, weight gain (under-active).",
        "Drugs and adherence; previous thyroid surgery."
      ],
      examine: ["Pulse, tremor, eye signs, reflexes, goitre."],
      investigate: ["tft", "ecg"],
      optimise: [
        "Over-active: make the patient euthyroid before elective surgery with an antithyroid drug (carbimazole/methimazole or propylthiouracil) over weeks, plus a beta-blocker for symptoms. Before thyroidectomy for Graves' disease, iodine (Lugol's) is usually given for about 10 days (ATA).",
        "Under-active: mild — proceed; severe — postpone and replace thyroxine (start slowly if there is heart disease)."
      ],
      dayOfSurgery: [
        "Continue antithyroid drugs, beta-blocker and thyroxine.",
        "Fever, very fast pulse and agitation during or after surgery: think thyroid storm — emergency."
      ],
      postponeIf: ["Clinically thyrotoxic.", "Severe hypothyroidism."],
      sources: [
        "American Thyroid Association guidelines for hyperthyroidism and other causes of thyrotoxicosis (2016)"
      ],
      textbook: []
    },
    {
      id: "goitre-neck-mass",
      label: "Goitre or neck mass",
      group: "airway",
      ask: [
        "Stridor, breathlessness lying flat, difficulty swallowing, hoarse voice; symptoms that change with position."
      ],
      examine: [
        "Size, lower border (retrosternal?), tracheal deviation, stridor, Pemberton's sign.",
        "Document the voice; before thyroid surgery, ENT examination of the vocal cords where available."
      ],
      investigate: ["neck-xray", "tft", "cxr"],
      optimise: [
        "Make the patient euthyroid first.",
        "A goitre with airway symptoms, or a large retrosternal goitre, needs an experienced anaesthetist and a difficult-airway plan — refer if not available."
      ],
      dayOfSurgery: ["Difficult-airway trolley including smaller tubes; senior anaesthetist present."],
      postponeIf: ["Stridor or airway compression with no experienced airway team (elective) — refer."],
      sources: [
        "Difficult Airway Society guidelines for management of unanticipated difficult intubation in adults (2015)",
        "American Thyroid Association guidelines for hyperthyroidism and other causes of thyrotoxicosis (2016)"
      ],
      textbook: []
    },
    {
      id: "difficult-airway",
      label: "Predicted difficult airway",
      group: "airway",
      ask: [
        "Previous difficult intubation (ask for the anaesthetic record or letter).",
        "Snoring or sleep apnoea; neck problems (arthritis, ankylosing spondylitis, previous injury); radiotherapy or burns to the neck; facial trauma; mouth infection."
      ],
      examine: [
        "Mouth opening less than 3 fingerbreadths (about 3 cm); Mallampati class III–IV; thyromental distance under 6 cm; limited neck extension; cannot push the lower jaw forward; prominent or loose teeth; beard; obesity."
      ],
      investigate: ["neck-xray", "spo2"],
      optimise: [
        "Plan in advance: regional anaesthesia where possible — but always with a general-anaesthetic backup plan.",
        "Senior anaesthetist; equipment ready: bougie, supraglottic airways, front-of-neck access kit (scalpel, bougie, tube — DAS 2015).",
        "Consider referral for elective surgery."
      ],
      dayOfSurgery: ["Plans A to D agreed and spoken aloud before induction; full preoxygenation."],
      postponeIf: [
        "Predicted difficult airway with no experienced airway provider or equipment (elective) — refer."
      ],
      sources: [
        "Difficult Airway Society guidelines for management of unanticipated difficult intubation in adults (2015)"
      ],
      textbook: []
    },
    {
      id: "stroke-tia",
      label: "Previous stroke or TIA",
      group: "neurological",
      ask: [
        "Date; ischaemic or haemorrhagic; remaining weakness, speech or swallowing problems; AF; antiplatelet or anticoagulant."
      ],
      examine: ["Document the neurological deficit as a baseline; BP; pulse rhythm; swallowing."],
      investigate: ["ecg", "glucose", "renal", "coag", "fbc"],
      optimise: [
        "Postpone elective surgery for at least 3 months after a stroke or TIA. Risk stays raised to about 9 months (large Danish cohort); for purely elective surgery many anaesthetists prefer to wait longer — guidelines differ.",
        "Continue aspirin for most surgery; clopidogrel is stopped 5 days before (see medications).",
        "Control BP."
      ],
      dayOfSurgery: [
        "Keep BP close to the patient's baseline — a commonly used target is within 20 % of baseline.",
        "Protect weak limbs during positioning; aspiration risk if swallowing is impaired."
      ],
      postponeIf: ["Stroke or TIA within the last 3 months."],
      sources: [
        "SNACC consensus statement on perioperative care of patients at high risk for stroke (2014); Jørgensen et al., JAMA 2014",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)"
      ],
      textbook: []
    },
    {
      id: "epilepsy",
      label: "Epilepsy",
      group: "neurological",
      ask: [
        "Seizure type, frequency, date of the last seizure, triggers (missed doses, lack of sleep, fasting), any status epilepticus.",
        "Exact drugs, doses and times."
      ],
      examine: [
        "Neurological examination; signs of toxicity (nystagmus, unsteadiness); gum overgrowth (phenytoin — bleeds at intubation)."
      ],
      investigate: ["drug-level", "fbc", "renal", "lft-albumin"],
      optimise: [
        "Seizures under control before elective surgery.",
        "Continue antiepileptics; plan an IV alternative if the patient will be unable to swallow for long."
      ],
      dayOfSurgery: [
        "Morning dose with a sip of water; first on the list; minimise fasting.",
        "Benzodiazepine ready for a seizure.",
        "Avoid drugs that lower seizure threshold: pethidine, tramadol; respect local-anaesthetic maximum doses."
      ],
      postponeIf: ["Seizures recently more frequent, or recent status epilepticus."],
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "parkinsons",
      label: "Parkinson's disease",
      group: "neurological",
      ask: [
        "Exact drug names and times; swallowing; 'off' periods; falls; dizziness on standing; hallucinations."
      ],
      examine: ["Rigidity, tremor, swallowing and cough; lying and standing BP."],
      investigate: [],
      optimise: [
        "Medicines must be given on time; plan a nasogastric tube if the patient cannot swallow for long.",
        "Avoid dopamine-blocking drugs (metoclopramide, haloperidol, prochlorperazine); ondansetron or domperidone are safer antiemetics."
      ],
      dayOfSurgery: ["Give levodopa at the usual time with a sip of water, even while fasting; first on the list."],
      postponeIf: ["Aspiration pneumonia or inability to take medication without a plan."],
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "myasthenia",
      label: "Myasthenia gravis",
      group: "neurological",
      ask: [
        "Pattern of weakness; swallowing or breathing problems; previous crises; drugs (pyridostigmine, steroids, azathioprine); thymectomy."
      ],
      examine: ["Ptosis, fatigable weakness, swallowing, cough strength."],
      investigate: ["spo2", "peak-flow"],
      optimise: [
        "Stable disease before elective surgery; major surgery at a centre able to ventilate after surgery.",
        "Avoid aminoglycosides (gentamicin) and magnesium, which worsen weakness.",
        "Very sensitive to non-depolarising muscle relaxants, resistant to suxamethonium — tell the anaesthetist."
      ],
      dayOfSurgery: [
        "Pyridostigmine: practice differs on the morning dose — confirm with the anaesthetist.",
        "Steroid cover if on long-term steroids."
      ],
      postponeIf: ["Bulbar or breathing weakness, or a recent crisis."],
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "mental-illness",
      label: "Severe mental illness on psychotropic drugs",
      group: "neurological",
      ask: [
        "Diagnosis and current state — stable or relapsing?",
        "Drugs: antipsychotics (and date of the last depot injection), lithium, antidepressants, benzodiazepines.",
        "Alcohol, khat and other substances.",
        "Capacity to consent; who supports the patient."
      ],
      examine: [
        "Mental state; tremor; stiffness or abnormal movements; fever with rigidity (neuroleptic malignant syndrome); hydration."
      ],
      investigate: ["ecg", "drug-level", "renal", "fbc", "glucose"],
      optimise: [
        "Continue most psychotropics (see medication rules; lithium is the main exception).",
        "Assess capacity and involve psychiatry and family in consent where needed.",
        "Never stop long-term benzodiazepines abruptly — withdrawal fits."
      ],
      dayOfSurgery: [
        "Usual morning psychotropics with a sip of water (lithium per its rule).",
        "QT-prolonging combinations (haloperidol, ondansetron, others): check the ECG.",
        "Tramadol and pethidine with SSRIs can cause serotonin syndrome."
      ],
      postponeIf: [
        "Acute relapse preventing cooperation or consent (elective).",
        "Lithium toxicity; neuroleptic malignant syndrome."
      ],
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    }
  ],
  medications: [
    {
      id: "warfarin-af",
      label: "Warfarin — atrial fibrillation (no mechanical valve)",
      drugId: "warfarin",
      rule: "stop",
      timing: "Last dose 6 days before surgery (5 full days without warfarin). Check INR the day before: if 1.5 or above, give oral vitamin K 1–2 mg and recheck on the morning. Proceed when INR is below 1.5 — 1.4 or below for a spinal or epidural. Restart at the usual dose the evening of surgery or the next day once bleeding is controlled. NO heparin bridging.",
      ifStoppedWrongly: "Stopping for a minor procedure that could be done on warfarin, or forgetting to restart it at discharge, leaves the patient exposed to stroke. Adding heparin 'bridging' does harm: in the BRIDGE trial it increased major bleeding without reducing strokes.",
      ifContinuedWrongly: "Surgical bleeding, and a spinal or epidural haematoma that can cause permanent paraplegia.",
      note: "BRIDGE (NEJM 2015) studied AF patients without mechanical valves across CHA2DS2-VASc scores — bridging did not help. A high CHA2DS2-VASc score is NOT a reason to bridge. Possible exceptions, for a specialist to decide: stroke or TIA within 3 months (better to postpone elective surgery), and AF with significant rheumatic mitral stenosis, which was poorly represented in BRIDGE and is common in Ethiopia. Starting or stopping rifampicin, amiodarone or many antibiotics changes the INR sharply. Practice varies — confirm with the anaesthetist.",
      sources: [
        "BRIDGE trial — Douketis et al., Perioperative bridging anticoagulation in patients with atrial fibrillation, NEJM 2015",
        "American College of Chest Physicians (CHEST) guideline: Perioperative management of antithrombotic therapy (2022)",
        "British Society for Haematology: Peri-operative management of anticoagulation and antiplatelet therapy (2016)",
        "ASRA evidence-based guidelines: Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy (4th edition, 2018)",
        "AAGBI / OAA / RA-UK: Regional anaesthesia and patients with abnormalities of coagulation (2013)"
      ],
      textbook: []
    },
    {
      id: "warfarin-mechanical-valve",
      label: "Warfarin — mechanical heart valve",
      drugId: "warfarin",
      rule: "stop-and-bridge",
      timing: "Last warfarin dose 6 days before surgery. When the INR falls below the patient's target range (usually about 3 days before surgery), start therapeutic enoxaparin 1 mg/kg SC every 12 hours (1 mg/kg once daily if creatinine clearance is below 30 mL/min). Last enoxaparin dose 24 hours before surgery. Check INR the day before; proceed when below 1.5. After surgery: restart warfarin at the usual dose that evening or the next day; restart therapeutic enoxaparin 24 hours after low-bleeding-risk surgery or 48–72 hours after high-bleeding-risk surgery (prophylactic dose in the meantime if the surgeon agrees), and continue until the INR is back in the target range.",
      ifStoppedWrongly: "Valve thrombosis or embolic stroke — can be fatal within days. Mitral and older-design valves carry the highest risk. Large doses of vitamin K make re-anticoagulation slow and dangerous — use small oral doses only if needed.",
      ifContinuedWrongly: "Major surgical bleeding; spinal or epidural haematoma.",
      note: "Mechanical valves are the main group that needs bridging. A modern bileaflet mechanical AORTIC valve with no other risk factor (no AF, previous stroke, or poor ventricle) may not need it according to ACC/AHA valve guidance, whereas CHEST 2022 suggests bridging for mechanical valves generally — guidelines differ; decide with a cardiologist. If enoxaparin is unavailable, the alternative is an IV unfractionated heparin infusion (stopped 4–6 hours before surgery) which needs a pump and aPTT monitoring — usually this means referral. Minor procedures such as dental extraction can often be done without stopping warfarin. Practice varies — confirm with the anaesthetist.",
      sources: [
        "American College of Chest Physicians (CHEST) guideline: Perioperative management of antithrombotic therapy (2022)",
        "ACC/AHA guideline for the management of patients with valvular heart disease (2020)",
        "British Society for Haematology: Peri-operative management of anticoagulation and antiplatelet therapy (2016)",
        "ASRA evidence-based guidelines: Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy (4th edition, 2018)"
      ],
      textbook: []
    },
    {
      id: "warfarin-vte",
      label: "Warfarin — previous DVT or PE",
      drugId: "warfarin",
      rule: "stop",
      timing: "Clot more than 3 months ago: stop as for AF (last dose 6 days before; INR below 1.5 on the day; below or equal to 1.4 for a spinal), no bridging; give prophylactic-dose LMWH after surgery until warfarin is back in range. Clot within the last 3 months: postpone elective surgery until at least 3 months of anticoagulation; if surgery cannot wait, bridge with therapeutic enoxaparin as for a mechanical valve — specialist decision.",
      ifStoppedWrongly: "Recurrent DVT or PE — highest risk in the first 3 months after the clot.",
      ifContinuedWrongly: "Surgical bleeding; spinal haematoma.",
      note: "Practice varies — confirm with the anaesthetist.",
      sources: [
        "American College of Chest Physicians (CHEST) guideline: Perioperative management of antithrombotic therapy (2022)",
        "British Society for Haematology: Peri-operative management of anticoagulation and antiplatelet therapy (2016)"
      ],
      textbook: []
    },
    {
      id: "warfarin-minor",
      label: "Warfarin — minor procedures (dental extraction, cataract, minor skin surgery)",
      drugId: "warfarin",
      rule: "continue",
      timing: "Continue warfarin. Check the INR within the 72 hours before (24 hours is better). For dental extraction, proceed if the INR is below 4 and use local measures — packing, sutures, tranexamic acid mouthwash. Not for anything under spinal or epidural anaesthesia.",
      ifStoppedWrongly: "Unnecessary exposure to stroke or clot for a procedure whose bleeding is easily controlled.",
      ifContinuedWrongly: "If the INR is above range: bleeding that is hard to stop — check it first.",
      note: "Dental guidance (SDCEP 2015). Cataract surgery under topical or sub-Tenon's anaesthesia is usually done on warfarin with INR in range. Practice varies — confirm with the anaesthetist.",
      sources: [
        "SDCEP: Management of dental patients taking anticoagulants or antiplatelet drugs (2015)",
        "British Society for Haematology: Peri-operative management of anticoagulation and antiplatelet therapy (2016)"
      ],
      textbook: []
    },
    {
      id: "heparin-ufh",
      label: "Unfractionated heparin (SC prophylaxis or IV infusion)",
      drugId: "heparin",
      rule: "stop",
      timing: "Prophylactic SC 5,000 units every 8–12 hours: last dose at least 4–6 hours before surgery or a spinal/epidural. Higher SC doses (7,500–10,000 units twice daily): 12 hours. Therapeutic SC doses (over 20,000 units a day): 24 hours. Therapeutic IV infusion: stop 4–6 hours before surgery and confirm a normal aPTT before a spinal. Timing of the first dose after a spinal or epidural: confirm with the anaesthetist.",
      ifStoppedWrongly: "Clot: DVT, PE, or valve thrombosis if it was being used for bridging.",
      ifContinuedWrongly: "Surgical bleeding; spinal or epidural haematoma with paraplegia.",
      note: "Check platelets if on heparin for more than 5 days (heparin-induced thrombocytopenia). Protamine reverses it: about 1 mg per 100 units of heparin given in the previous few hours, maximum 50 mg. Practice varies — confirm with the anaesthetist.",
      sources: [
        "ASRA evidence-based guidelines: Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy (4th edition, 2018)",
        "AAGBI / OAA / RA-UK: Regional anaesthesia and patients with abnormalities of coagulation (2013)",
        "American College of Chest Physicians (CHEST) guideline: Perioperative management of antithrombotic therapy (2022)"
      ],
      textbook: []
    },
    {
      id: "lmwh",
      label: "Low-molecular-weight heparin (enoxaparin)",
      drugId: "heparin",
      rule: "stop",
      timing: "Prophylactic dose (enoxaparin 40 mg once daily): last dose at least 12 hours before surgery or a spinal/epidural. Therapeutic dose (1 mg/kg twice daily or 1.5 mg/kg once daily): last dose at least 24 hours before — if on once daily, give half the daily dose as that last dose. Longer if kidney function is poor. After surgery: prophylactic dose 6–12 hours after surgery once haemostasis is secure, and not sooner than 12 hours after a spinal needle or 4 hours after removing an epidural catheter. Therapeutic dose: restart 24 hours after low-bleeding-risk surgery, 48–72 hours after high-bleeding-risk surgery.",
      ifStoppedWrongly: "DVT, PE, or valve thrombosis when used for bridging.",
      ifContinuedWrongly: "Surgical bleeding; spinal or epidural haematoma — LMWH given too close to a spinal is a classic cause of paraplegia.",
      note: "Not measured by INR or aPTT. Protamine reverses it only partly. Accumulates when creatinine clearance is below 30 mL/min. Practice varies — confirm with the anaesthetist.",
      sources: [
        "ASRA evidence-based guidelines: Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy (4th edition, 2018)",
        "American College of Chest Physicians (CHEST) guideline: Perioperative management of antithrombotic therapy (2022)",
        "NICE NG89: Venous thromboembolism in over 16s — reducing the risk (2018, updated 2019)",
        "AAGBI / OAA / RA-UK: Regional anaesthesia and patients with abnormalities of coagulation (2013)"
      ],
      textbook: []
    },
    {
      id: "doac",
      label: "DOAC (rivaroxaban, apixaban, edoxaban, dabigatran) — patient who arrives on one",
      drugId: null,
      rule: "stop",
      timing: "Rivaroxaban, apixaban, edoxaban, and dabigatran with normal kidney function: low-bleeding-risk surgery — last dose 2 days before (skip 1 day); high-bleeding-risk surgery — last dose 3 days before (skip 2 days). Spinal or epidural: at least 72 hours since the last dose of rivaroxaban, apixaban or edoxaban (ASRA); dabigatran 72–120 hours depending on kidney function. Dabigatran with creatinine clearance below 50 mL/min: last dose 3 days before low-risk and 5 days before high-risk surgery. Restart 24 hours after low-, 48–72 hours after high-bleeding-risk surgery. No bridging.",
      ifStoppedWrongly: "Stroke (AF) or recurrent clot (VTE) if not restarted.",
      ifContinuedWrongly: "Bleeding with no routine test to measure the drug, and reversal agents (idarucizumab, andexanet) are not available in most Ethiopian hospitals — so the stopping interval is the only protection.",
      note: "Timing from the PAUSE study. If a patient on a DOAC needs emergency surgery: find the time of the last dose, delay 12–24 hours if the condition allows, give tranexamic acid, and use prothrombin complex concentrate if available. Practice varies — confirm with the anaesthetist.",
      sources: [
        "PAUSE cohort study — Douketis et al., perioperative management of patients with atrial fibrillation on a DOAC, JAMA Internal Medicine 2019",
        "ASRA evidence-based guidelines: Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy (4th edition, 2018)",
        "American College of Chest Physicians (CHEST) guideline: Perioperative management of antithrombotic therapy (2022)"
      ],
      textbook: []
    },
    {
      id: "aspirin-secondary",
      label: "Aspirin — for heart disease, stent, stroke or peripheral arterial disease",
      drugId: null,
      rule: "continue",
      timing: "Continue throughout, including the morning of surgery. Stop 7 days before only for operations where bleeding into a closed space is catastrophic — intracranial, spinal canal, posterior chamber of the eye, and some prostate and middle-ear surgery — decided with the surgeon. Aspirin alone does not prevent a spinal (ASRA).",
      ifStoppedWrongly: "Myocardial infarction, stent thrombosis or stroke, with the risk peaking in the 1–2 weeks after stopping.",
      ifContinuedWrongly: "A modest increase in bleeding, rarely serious except in the closed-space operations listed.",
      note: "Never stop aspirin in a patient with a coronary stent without a cardiologist's agreement.",
      sources: [
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)",
        "ASRA evidence-based guidelines: Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy (4th edition, 2018)"
      ],
      textbook: []
    },
    {
      id: "aspirin-primary",
      label: "Aspirin — primary prevention only (no heart disease, stent or stroke)",
      drugId: null,
      rule: "stop",
      timing: "Stop 7 days before surgery. Restart once the bleeding risk has passed, or review whether it is needed at all.",
      ifStoppedWrongly: "Little harm — POISE-2 found no reduction in heart attacks from perioperative aspirin in this group.",
      ifContinuedWrongly: "More major bleeding (POISE-2) with no benefit.",
      note: "Confirm the indication carefully — if there is ANY stent, previous MI, stroke or peripheral arterial disease, use the 'continue' rule instead.",
      sources: [
        "POISE trial (Lancet 2008) and POISE-2 trial (NEJM 2014)",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)"
      ],
      textbook: []
    },
    {
      id: "clopidogrel",
      label: "Clopidogrel (also ticagrelor, prasugrel)",
      drugId: null,
      rule: "stop",
      timing: "Clopidogrel: last dose 5 days before surgery; 7 days before a spinal or epidural (ASRA 5–7 days). Ticagrelor: 5 days (ESC allows 3 for surgery). Prasugrel: 7 days. Keep aspirin going. Restart within 24–48 hours after surgery once haemostasis is secure. INSIDE the minimum period after a coronary stent, do not stop it — postpone the operation instead (see the stent rule).",
      ifStoppedWrongly: "Within months of a stent: stent thrombosis — a large heart attack, often fatal, and emergency PCI is rarely available in Ethiopia.",
      ifContinuedWrongly: "More surgical bleeding; a spinal or epidural is contraindicated.",
      note: "Practice varies — confirm with the anaesthetist.",
      sources: [
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)",
        "ASRA evidence-based guidelines: Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy (4th edition, 2018)"
      ],
      textbook: []
    },
    {
      id: "dapt-stent",
      label: "Dual antiplatelet therapy after a coronary stent (aspirin + clopidogrel)",
      drugId: null,
      rule: "adjust",
      timing: "Elective surgery waits until the minimum dual-therapy period is over: 6 months after a stent for stable angina, 12 months after a stent for an acute coronary syndrome (ESC 2022; ACC/AHA similar). Bare-metal stent: at least 30 days. Time-sensitive surgery (for example cancer) may be done from 1 month, on aspirin, with a cardiologist's agreement. After the period: continue aspirin, stop clopidogrel 5 days before, restart within 24–48 hours.",
      ifStoppedWrongly: "Stent thrombosis — myocardial infarction or death.",
      ifContinuedWrongly: "More bleeding, and no spinal anaesthesia — but bleeding is usually manageable; stent thrombosis often is not.",
      note: "Ask for the stent card or discharge letter: the date and the reason for the stent decide everything. Older teaching (6 weeks for bare-metal, 12 months for all drug-eluting stents) has been shortened for newer stents; where the stent type is unknown, use the longer interval. Practice varies — confirm with the anaesthetist.",
      sources: [
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)"
      ],
      textbook: []
    },
    {
      id: "ace-arb",
      label: "ACE inhibitors (enalapril, lisinopril, captopril) and ARBs (losartan)",
      drugId: null,
      rule: "hold-morning",
      timing: "For hypertension: omit the dose in the 24 hours before surgery (the morning dose, and the previous evening's if taken at night). Restart once BP is normal, the patient is eating and drinking, and urine output and creatinine are stable — usually within 48 hours. For heart failure: many anaesthetists continue it.",
      ifStoppedWrongly: "The real harm is not restarting it: uncontrolled BP and worsening heart failure; observational data link failure to restart within 48 hours with higher mortality.",
      ifContinuedWrongly: "Hypotension after induction or a spinal, sometimes resistant to usual vasopressors; acute kidney injury and high potassium if the patient becomes dehydrated.",
      note: "The STOP-or-NOT trial (JAMA 2024) found similar overall complications whether these drugs were continued or stopped, with more hypotension during surgery when continued. Practice varies — confirm with the anaesthetist.",
      sources: [
        "STOP-or-NOT trial: continuing versus stopping renin–angiotensin system inhibitors before major surgery (JAMA 2024)",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)"
      ],
      textbook: []
    },
    {
      id: "beta-blocker",
      label: "Beta-blockers (atenolol, metoprolol, bisoprolol, propranolol, carvedilol)",
      drugId: null,
      rule: "continue",
      timing: "Give the usual dose on the morning of surgery with a sip of water, and continue after (by another route if fasting is prolonged). Do NOT start a new beta-blocker in the 24 hours before surgery.",
      ifStoppedWrongly: "Rebound tachycardia, hypertension, myocardial ischaemia and infarction; loss of rate control in AF; thyroid storm risk in thyrotoxicosis.",
      ifContinuedWrongly: "Bradycardia and hypotension, especially with a spinal or blood loss; it also hides the tachycardia of hypovolaemia. If the pulse or BP is low on the morning, tell the anaesthetist rather than silently omitting it (hold parameters vary locally).",
      note: "POISE (2008): starting high-dose metoprolol on the day of surgery reduced MIs but increased strokes and deaths. Propranolol is in the app as a psychiatric drug entry, so no link is given here.",
      sources: [
        "POISE trial (Lancet 2008) and POISE-2 trial (NEJM 2014)",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)"
      ],
      textbook: []
    },
    {
      id: "ccb",
      label: "Calcium-channel blockers (amlodipine, nifedipine retard; verapamil, diltiazem)",
      drugId: null,
      rule: "continue",
      timing: "Give the usual morning dose.",
      ifStoppedWrongly: "Rebound hypertension and angina; loss of rate control (verapamil, diltiazem).",
      ifContinuedWrongly: "Additive hypotension with anaesthesia; verapamil or diltiazem with a beta-blocker can cause marked bradycardia.",
      note: "Never give sublingual immediate-release nifedipine to lower BP before surgery — the fall is uncontrolled and can cause stroke or MI.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "other-antihypertensives",
      label: "Other antihypertensives (methyldopa, hydralazine, clonidine, alpha-blockers)",
      drugId: null,
      rule: "continue",
      timing: "Give the usual morning dose. Never stop clonidine abruptly.",
      ifStoppedWrongly: "Rebound hypertension — clonidine withdrawal can cause a hypertensive crisis.",
      ifContinuedWrongly: "Hypotension; methyldopa adds sedation; alpha-blockers cause postural hypotension.",
      note: "Tamsulosin and other alpha-blockers cause 'floppy iris' during cataract surgery even after stopping — tell the eye surgeon rather than stopping the drug.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "diuretics",
      label: "Diuretics (furosemide, hydrochlorothiazide, spironolactone)",
      drugId: null,
      rule: "hold-morning",
      timing: "Omit the morning dose on the day of surgery; restart when drinking. If the diuretic controls fluid overload in heart failure, it is often continued — confirm with the anaesthetist. Check potassium before surgery.",
      ifStoppedWrongly: "Fluid overload and pulmonary oedema in heart failure if omitted for days.",
      ifContinuedWrongly: "Hypovolaemia and hypotension under anaesthesia; low potassium (arrhythmia) with furosemide or thiazides; high potassium with spironolactone if kidney function falls; a full bladder on the table.",
      note: "Practice varies — confirm with the anaesthetist.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "digoxin",
      label: "Digoxin",
      drugId: "digoxin",
      rule: "continue",
      timing: "Give the morning dose. Check potassium and creatinine beforehand. Hold and discuss if the pulse is below 60 or there are signs of toxicity.",
      ifStoppedWrongly: "Loss of rate control in AF — slowly, because of its long half-life; one missed dose matters little.",
      ifContinuedWrongly: "Toxicity — made more likely by low potassium, kidney injury and amiodarone — causes dangerous arrhythmias.",
      note: "",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "amiodarone",
      label: "Amiodarone",
      drugId: "amiodarone",
      rule: "continue",
      timing: "Continue, including the morning of surgery.",
      ifStoppedWrongly: "Little immediate effect (half-life of weeks), but arrhythmia can recur if left off.",
      ifContinuedWrongly: "Bradycardia and hypotension under anaesthesia; it raises the INR with warfarin and digoxin levels.",
      note: "Check thyroid function and for lung toxicity in long-term users.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "nitrates",
      label: "Nitrates and other anti-anginals (isosorbide mononitrate/dinitrate)",
      drugId: null,
      rule: "continue",
      timing: "Give the usual morning dose; GTN spray available.",
      ifStoppedWrongly: "Angina.",
      ifContinuedWrongly: "Additive hypotension, especially with a spinal.",
      note: "",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "statin",
      label: "Statins (atorvastatin, simvastatin)",
      drugId: null,
      rule: "continue",
      timing: "Continue without interruption, including the night before and after surgery.",
      ifStoppedWrongly: "Withdrawal is associated with more postoperative cardiac events (observational data).",
      ifContinuedWrongly: "Very rarely myopathy or rhabdomyolysis, especially with long surgery or interacting drugs — no reason to stop routinely.",
      note: "Consider starting one before surgery in a patient who qualifies for a statin anyway.",
      sources: [
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)"
      ],
      textbook: []
    },
    {
      id: "insulin-premixed-nph",
      label: "Insulin — premixed 70/30 or intermediate-acting (NPH), twice daily",
      drugId: null,
      rule: "adjust",
      timing: "Day before: usual doses. Day of surgery: give HALF the usual morning dose (UK JBDS), check glucose on arrival and at least every 1–2 hours, and keep it 6–10 mmol/L (108–180 mg/dL); a glucose-containing infusion while fasting is common Ethiopian practice and prevents hypoglycaemia. Give the usual evening dose once the patient is eating. If more than one meal will be missed, or glucose stays above 12 mmol/L (216 mg/dL), switch to a glucose–insulin–potassium (GIK) or variable-rate insulin regimen.",
      ifStoppedWrongly: "Omitting all insulin: high glucose, and in type 1 diabetes (and some long-standing insulin-treated type 2) diabetic ketoacidosis within hours.",
      ifContinuedWrongly: "The full dose with no food causes hypoglycaemia, which is silent under anaesthesia and can cause permanent brain damage.",
      note: "Why GIK suits a ward with no pump: the insulin is in the same bag as the glucose, so if the drip stops, blocks or runs fast, both change together and the patient cannot be given insulin without glucose. A separate insulin drip by gravity has no such protection — never run one. GIK without a pump (Alberti regimen): 500 mL of 10 % dextrose with 10 units of soluble insulin and 10 mmol of potassium chloride, run at 100 mL/hour by drop-counting, glucose hourly; make a new bag with more insulin (15 units) if glucose stays high or less (5 units) if it falls low. Confirm the regimen and adjustment steps with the anaesthetist before using it.",
      sources: [
        "JBDS-IP / CPOC: Perioperative care of people with diabetes undergoing surgery (2021, revised 2023)",
        "Alberti glucose–insulin–potassium regimen (Br J Anaesth 1979) and later reviews",
        "American Diabetes Association Standards of Care in Diabetes: Diabetes care in the hospital (current edition)"
      ],
      textbook: []
    },
    {
      id: "insulin-basal",
      label: "Insulin — long-acting basal (glargine, detemir, degludec), once daily",
      drugId: null,
      rule: "adjust",
      timing: "Reduce the dose by 20 %: the evening before if taken in the evening, or on the morning of surgery if taken in the morning. Never omit it in type 1 diabetes. Check glucose on arrival.",
      ifStoppedWrongly: "Diabetic ketoacidosis in type 1 diabetes.",
      ifContinuedWrongly: "At the full dose, hypoglycaemia while fasting.",
      note: "Practice varies — confirm with the anaesthetist.",
      sources: [
        "JBDS-IP / CPOC: Perioperative care of people with diabetes undergoing surgery (2021, revised 2023)"
      ],
      textbook: []
    },
    {
      id: "insulin-soluble",
      label: "Insulin — soluble (regular) before meals",
      drugId: "insulin-soluble",
      rule: "hold-morning",
      timing: "No meal, no mealtime dose: omit while fasting. Use soluble insulin only as correction doses for glucose above 12 mmol/L (216 mg/dL) on the local scale, or within a GIK or insulin infusion. Restart with the first meal.",
      ifStoppedWrongly: "If the patient has no basal insulin (type 1 on soluble insulin alone), omitting it means ketoacidosis — such a patient needs a GIK or insulin infusion while fasting.",
      ifContinuedWrongly: "A mealtime dose with no meal: hypoglycaemia.",
      note: "Practice varies — confirm with the anaesthetist.",
      sources: [
        "JBDS-IP / CPOC: Perioperative care of people with diabetes undergoing surgery (2021, revised 2023)"
      ],
      textbook: []
    },
    {
      id: "metformin",
      label: "Metformin",
      drugId: null,
      rule: "hold-morning",
      timing: "Omit on the day of surgery (ADA). UK JBDS allows taking it as usual if only one meal is missed and kidney function is normal — guidelines differ; omitting it is the conservative choice. Restart when eating normally and kidney function is stable (wait 48 hours after IV contrast if kidney function is impaired).",
      ifStoppedWrongly: "Only temporary high glucose.",
      ifContinuedWrongly: "Lactic acidosis if the kidneys fail or perfusion falls — rare but often fatal.",
      note: "",
      sources: [
        "American Diabetes Association Standards of Care in Diabetes: Diabetes care in the hospital (current edition)",
        "JBDS-IP / CPOC: Perioperative care of people with diabetes undergoing surgery (2021, revised 2023)"
      ],
      textbook: []
    },
    {
      id: "sulfonylurea",
      label: "Sulfonylureas (glibenclamide, gliclazide, glimepiride)",
      drugId: null,
      rule: "hold-morning",
      timing: "Omit on the day of surgery — the morning dose, and the afternoon dose too if taken twice daily and surgery is in the afternoon. Restart with the first normal meal. Glibenclamide acts for more than 24 hours: check glucose at least every 2 hours while fasting; some anaesthetists also omit the evening dose before.",
      ifStoppedWrongly: "Temporary high glucose.",
      ifContinuedWrongly: "Prolonged, recurrent hypoglycaemia while fasting — worst with glibenclamide, in older patients, and with kidney impairment.",
      note: "Practice varies — confirm with the anaesthetist.",
      sources: [
        "JBDS-IP / CPOC: Perioperative care of people with diabetes undergoing surgery (2021, revised 2023)",
        "American Diabetes Association Standards of Care in Diabetes: Diabetes care in the hospital (current edition)"
      ],
      textbook: []
    },
    {
      id: "sglt2",
      label: "SGLT2 inhibitors (empagliflozin, dapagliflozin, canagliflozin)",
      drugId: null,
      rule: "stop",
      timing: "Stop 3 days before surgery (ertugliflozin 4 days). Restart when eating and drinking normally.",
      ifStoppedWrongly: "Temporary high glucose; in heart failure, loss of a beneficial drug if not restarted.",
      ifContinuedWrongly: "Euglycaemic ketoacidosis — ketoacidosis with a NORMAL glucose, easily missed. Check ketones in any unwell patient on these drugs.",
      note: "",
      sources: [
        "US FDA drug safety communication: stopping SGLT2 inhibitors before scheduled surgery (2020)",
        "American Diabetes Association Standards of Care in Diabetes: Diabetes care in the hospital (current edition)"
      ],
      textbook: []
    },
    {
      id: "steroids-long-term",
      label: "Long-term corticosteroids (prednisolone 5 mg/day or more, or equivalent, for 4 weeks or more, now or in the last 3 months) and adrenal insufficiency",
      drugId: null,
      rule: "adjust",
      timing: "Give the usual morning dose. Minor surgery under local anaesthetic: usual dose only. All other surgery: hydrocortisone 100 mg IV at induction, then 50 mg IV or IM every 6 hours (or 200 mg per 24 hours by infusion) while fasting or unwell; once eating, double the usual oral dose for 48 hours (up to a week after major or complicated surgery), then return to the usual dose.",
      ifStoppedWrongly: "Adrenal crisis: severe hypotension that does not respond to fluids or vasopressors, vomiting, low glucose and sodium — can be fatal. Treat with hydrocortisone 100 mg IV at once and IV fluids.",
      ifContinuedWrongly: "Not a reason to omit. Cover raises glucose for a day or two — monitor it.",
      note: "Hydrocortisone is preferred for cover (dexamethasone has no mineralocorticoid action). Rifampicin, phenytoin and carbamazepine speed steroid breakdown — doses may need to be higher. High-dose inhaled steroids can also suppress the adrenals. See hydrocortisone in the app. Practice varies — confirm with the anaesthetist.",
      sources: [
        "AAGBI / RCP / Society for Endocrinology: Guidelines for the management of glucocorticoids during the peri-operative period (Anaesthesia 2020)"
      ],
      textbook: []
    },
    {
      id: "phenytoin",
      label: "Phenytoin",
      drugId: "phenytoin",
      rule: "continue",
      timing: "Give the usual morning dose with a sip of water. If the patient cannot swallow for long, give IV phenytoin — dose and rate decided with the physician.",
      ifStoppedWrongly: "Seizures, including status epilepticus.",
      ifContinuedWrongly: "Toxicity (nystagmus, ataxia) at high levels; IV phenytoin given too fast causes arrhythmia and hypotension.",
      note: "Enzyme inducer: resistance to non-depolarising muscle relaxants with long-term use; lowers warfarin and steroid levels. Gum overgrowth bleeds at intubation.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "carbamazepine",
      label: "Carbamazepine",
      drugId: "carbamazepine",
      rule: "continue",
      timing: "Give the usual morning dose with a sip of water. There is no IV form: if the patient cannot swallow for long, give via nasogastric tube, or switch temporarily to an IV antiepileptic on a physician's advice.",
      ifStoppedWrongly: "Seizures.",
      ifContinuedWrongly: "Toxicity (dizziness, double vision); low sodium.",
      note: "Enzyme inducer (lowers warfarin, steroids, contraceptives). Check sodium.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "sodium-valproate",
      label: "Sodium valproate",
      drugId: "sodium-valproate",
      rule: "continue",
      timing: "Give the usual morning dose with a sip of water.",
      ifStoppedWrongly: "Seizures; relapse of bipolar disorder.",
      ifContinuedWrongly: "Can lower platelets and impair platelet function — check the platelet count before major surgery or a spinal.",
      note: "",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "phenobarbital",
      label: "Phenobarbital",
      drugId: "phenobarbital",
      rule: "continue",
      timing: "Give the usual dose; IV or IM can be used while the patient cannot swallow.",
      ifStoppedWrongly: "Seizures and barbiturate withdrawal.",
      ifContinuedWrongly: "Adds to the sedation of anaesthetic drugs.",
      note: "Enzyme inducer.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "lamotrigine",
      label: "Lamotrigine",
      drugId: "lamotrigine",
      rule: "continue",
      timing: "Give the usual morning dose with a sip of water. There is no IV form.",
      ifStoppedWrongly: "Seizures or mood relapse. If it is stopped for about 5 days or more, it must be restarted at a low dose and re-titrated, because restarting at the full dose risks a serious rash (Stevens–Johnson syndrome).",
      ifContinuedWrongly: "Nothing specific to surgery.",
      note: "",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "levodopa",
      label: "Levodopa and other Parkinson's drugs",
      drugId: null,
      rule: "continue",
      timing: "Give at the usual times, including while fasting, with a sip of water. No IV form — if the patient cannot swallow, use a nasogastric tube.",
      ifStoppedWrongly: "Severe rigidity, swallowing failure, aspiration, and a neuroleptic malignant–like syndrome (fever, rigidity, high CK) that can be fatal.",
      ifContinuedWrongly: "Postural hypotension; confusion.",
      note: "Avoid metoclopramide, haloperidol and prochlorperazine.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "pyridostigmine",
      label: "Pyridostigmine (myasthenia gravis)",
      drugId: null,
      rule: "continue",
      timing: "Usually continued. Some anaesthetists omit the morning dose because it alters the response to muscle relaxants — confirm with the anaesthetist.",
      ifStoppedWrongly: "Worsening weakness, swallowing and breathing failure.",
      ifContinuedWrongly: "Altered response to neuromuscular blockers and their reversal.",
      note: "Practice varies — confirm with the anaesthetist.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "antipsychotics",
      label: "Antipsychotics (haloperidol, chlorpromazine, risperidone, olanzapine, quetiapine; depot injections)",
      drugId: null,
      rule: "continue",
      timing: "Give the usual morning dose with a sip of water; restart promptly after surgery. Keep depot injections on schedule.",
      ifStoppedWrongly: "Psychotic relapse; withdrawal symptoms; agitation after surgery that is easily mistaken for delirium.",
      ifContinuedWrongly: "Hypotension (especially chlorpromazine), QT prolongation with other QT drugs (ondansetron, haloperidol IV), lowered seizure threshold. Watch for neuroleptic malignant syndrome (fever, rigidity, confusion).",
      note: "Check the ECG for QT when on high doses or combinations. Clozapine and lithium have their own rules.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "clozapine",
      label: "Clozapine",
      drugId: "clozapine",
      rule: "continue",
      timing: "Give the usual dose; restart as soon as the patient can swallow. If more than 48 hours of doses are missed, it must be re-titrated from a low dose (12.5 mg) with the psychiatrist — never restart at the full dose.",
      ifStoppedWrongly: "Relapse and cholinergic rebound; restarting at full dose after a gap causes collapse, hypotension and seizures.",
      ifContinuedWrongly: "Hypotension, sedation, constipation progressing to ileus after abdominal surgery, lowered seizure threshold.",
      note: "Check the neutrophil count. Stopping smoking in hospital raises clozapine levels — watch for toxicity.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "lithium",
      label: "Lithium",
      drugId: "lithium",
      rule: "adjust",
      timing: "Minor surgery: continue, with normal fluid intake. Major surgery: stop 24 hours before (some guidance says up to 72 hours); restart at the usual dose once eating and drinking normally with stable kidney function. Check the lithium level, sodium and creatinine before surgery, and recheck the level after restarting.",
      ifStoppedWrongly: "Relapse of mania or depression, particularly if stopped abruptly for a long time.",
      ifContinuedWrongly: "Toxicity with dehydration, kidney injury, NSAIDs, ACE inhibitors or diuretics (tremor, vomiting, confusion, seizures); prolongs the action of muscle relaxants.",
      note: "Practice varies — confirm with the anaesthetist.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "ssri",
      label: "SSRI antidepressants (fluoxetine, sertraline, escitalopram)",
      drugId: null,
      rule: "continue",
      timing: "Continue, including the morning of surgery.",
      ifStoppedWrongly: "Discontinuation symptoms (dizziness, irritability) and relapse of depression.",
      ifContinuedWrongly: "Slightly more bleeding, especially with NSAIDs or antiplatelets; low sodium in older patients; serotonin syndrome if combined with tramadol, pethidine or methylene blue.",
      note: "Tramadol is widely used in Ethiopia — avoid it, or watch closely, in patients on SSRIs.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "tca",
      label: "Tricyclic antidepressants (amitriptyline, imipramine)",
      drugId: null,
      rule: "continue",
      timing: "Continue, including the morning of surgery.",
      ifStoppedWrongly: "Cholinergic rebound (nausea, sweating, restlessness); relapse.",
      ifContinuedWrongly: "Arrhythmias and hypotension under anaesthesia; exaggerated response to adrenaline and other sympathomimetics; anticholinergic delirium in older patients.",
      note: "Check the ECG at higher doses.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "maoi",
      label: "MAO inhibitors (phenelzine, tranylcypromine; moclobemide)",
      drugId: null,
      rule: "adjust",
      timing: "Do not stop on your own initiative — discuss with the psychiatrist and anaesthetist well before elective surgery. Current practice usually continues them and avoids interacting drugs.",
      ifStoppedWrongly: "Relapse of severe depression.",
      ifContinuedWrongly: "Severe hypertension with indirect sympathomimetics (ephedrine); serotonin syndrome with pethidine or tramadol.",
      note: "Rarely seen in Ethiopia. Practice varies — confirm with the anaesthetist.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "benzodiazepines",
      label: "Long-term benzodiazepines (diazepam, lorazepam)",
      drugId: null,
      rule: "continue",
      timing: "Continue the usual dose.",
      ifStoppedWrongly: "Withdrawal: anxiety, agitation and seizures.",
      ifContinuedWrongly: "Additive sedation and respiratory depression with opioids; delirium in older patients.",
      note: "",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "methadone",
      label: "Methadone (opioid agonist treatment)",
      drugId: "methadone",
      rule: "continue",
      timing: "Continue the usual daily dose (confirm the dose with the dispensing programme). Give pain relief ON TOP of it — it does not cover surgical pain.",
      ifStoppedWrongly: "Opioid withdrawal, severe pain, and relapse to illicit use.",
      ifContinuedWrongly: "Additive sedation with other opioids; QT prolongation.",
      note: "Use regional techniques, paracetamol and NSAIDs where safe; higher opioid doses are usually needed. Avoid partial agonists that can precipitate withdrawal.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "naltrexone",
      label: "Naltrexone (oral)",
      drugId: "naltrexone",
      rule: "stop",
      timing: "Stop 72 hours before elective surgery when opioid pain relief will be needed. Restart only when opioids are no longer needed — the patient must be opioid-free for 7–10 days first if opioids were used, or withdrawal is precipitated.",
      ifStoppedWrongly: "Relapse risk; after stopping, tolerance is lost — a dose of opioid the patient used to take can now cause overdose.",
      ifContinuedWrongly: "Opioids do not work, leaving severe pain; attempts to overcome the blockade with large opioid doses can cause respiratory depression when the blockade wears off.",
      note: "Practice varies — confirm with the anaesthetist.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "combined-pill",
      label: "Combined oral contraceptive pill (and oestrogen HRT)",
      drugId: null,
      rule: "stop",
      timing: "Stop 4 weeks before major elective surgery, and before any surgery to the legs or pelvis or followed by immobilisation. Give another contraceptive meanwhile (progestogen-only pill, injection or implant). Restart at least 2 weeks after full mobilisation. Minor surgery without immobilisation: continue. Oestrogen HRT: consider stopping 4 weeks before in the same situations (NICE).",
      ifStoppedWrongly: "Unplanned pregnancy if no alternative contraception is given.",
      ifContinuedWrongly: "Raised risk of DVT and PE after surgery. If it was not stopped (or for emergencies), give LMWH prophylaxis and mechanical measures.",
      note: "Do a pregnancy test before surgery.",
      sources: [
        "FSRH UK Medical Eligibility Criteria for Contraceptive Use (UKMEC)",
        "NICE NG89: Venous thromboembolism in over 16s — reducing the risk (2018, updated 2019)"
      ],
      textbook: []
    },
    {
      id: "progestogen-only",
      label: "Progestogen-only contraception (pill, Depo-Provera injection, implant)",
      drugId: null,
      rule: "continue",
      timing: "Continue — no need to stop before surgery.",
      ifStoppedWrongly: "Unplanned pregnancy.",
      ifContinuedWrongly: "No meaningful increase in VTE risk.",
      note: "Injection and implant are the commonest methods in Ethiopia — reassure the patient and the team that they do not need removal.",
      sources: ["FSRH UK Medical Eligibility Criteria for Contraceptive Use (UKMEC)"],
      textbook: []
    },
    {
      id: "levothyroxine",
      label: "Levothyroxine",
      drugId: null,
      rule: "continue",
      timing: "Give the usual morning dose; restart as soon as the patient can swallow.",
      ifStoppedWrongly: "Little harm over a few days (half-life about a week).",
      ifContinuedWrongly: "Nothing specific.",
      note: "",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "antithyroid",
      label: "Antithyroid drugs (carbimazole, methimazole, propylthiouracil)",
      drugId: null,
      rule: "continue",
      timing: "Continue, including the morning of surgery.",
      ifStoppedWrongly: "Loss of control and thyroid storm under the stress of surgery.",
      ifContinuedWrongly: "Nothing specific; check the white count if there is sore throat or fever (agranulocytosis).",
      note: "",
      sources: [
        "American Thyroid Association guidelines for hyperthyroidism and other causes of thyrotoxicosis (2016)",
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "inhalers",
      label: "Inhalers (salbutamol, beclomethasone, other asthma/COPD inhalers)",
      drugId: null,
      rule: "continue",
      timing: "Use as usual, including the morning of surgery; bring them to theatre.",
      ifStoppedWrongly: "Bronchospasm at induction or after surgery.",
      ifContinuedWrongly: "Nothing significant.",
      note: "High-dose inhaled steroids can suppress the adrenals — see the steroid rule.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "art",
      label: "Antiretroviral therapy (HIV)",
      drugId: null,
      rule: "continue",
      timing: "Give every dose on time, including the morning of surgery, with a sip of water; restart immediately after surgery.",
      ifStoppedWrongly: "Viral rebound and drug resistance.",
      ifContinuedWrongly: "Interactions: ritonavir-boosted protease inhibitors (second-line) greatly raise midazolam and fentanyl levels — reduce doses; efavirenz lowers levels of some drugs. Antacids, calcium and iron reduce dolutegravir absorption — separate the doses.",
      note: "Tenofovir: check kidney function. Zidovudine: check for anaemia.",
      sources: ["WHO consolidated HIV guidelines; Ethiopian national consolidated HIV guidelines"],
      textbook: []
    },
    {
      id: "tb-treatment",
      label: "TB treatment (rifampicin, isoniazid, pyrazinamide, ethambutol)",
      drugId: "tb-rhze",
      rule: "continue",
      timing: "Continue without interruption.",
      ifStoppedWrongly: "Treatment failure and drug resistance.",
      ifContinuedWrongly: "Hepatotoxicity — check liver function. Rifampicin markedly lowers warfarin, steroid, contraceptive and some antiretroviral levels.",
      note: "A steroid-dependent patient on rifampicin needs higher steroid cover — confirm with the physician.",
      sources: ["WHO consolidated guidelines on tuberculosis"],
      textbook: []
    },
    {
      id: "nsaids",
      label: "Regular NSAIDs (diclofenac, ibuprofen)",
      drugId: null,
      rule: "adjust",
      timing: "Usually omit on the day of surgery. Stop at least 24 hours earlier when there is kidney impairment, dehydration, a history of GI bleeding, or a closed-space operation (longer for long-acting NSAIDs such as piroxicam). NSAIDs alone do not prevent a spinal (ASRA).",
      ifStoppedWrongly: "Pain and stiffness in arthritis.",
      ifContinuedWrongly: "Acute kidney injury in dehydrated patients; GI bleeding; slightly more surgical bleeding.",
      note: "Practice varies — confirm with the anaesthetist.",
      sources: [
        "ASRA evidence-based guidelines: Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy (4th edition, 2018)",
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "herbal",
      label: "Herbal and traditional remedies",
      drugId: null,
      rule: "stop",
      timing: "Ask specifically — patients often do not mention them. Where possible stop about 2 weeks before elective surgery.",
      ifStoppedWrongly: "Nothing significant.",
      ifContinuedWrongly: "Unknown contents; several (garlic, ginkgo, ginseng, high-dose fish oil) increase bleeding, and others interact with anaesthetic drugs or affect the liver.",
      note: "The evidence on individual remedies is thin; the 2-week interval is precautionary advice.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    }
  ],
  postpone: [
    {
      id: "bp-high",
      finding: "Blood pressure 180/110 mmHg or above (systolic 180 or more, or diastolic 110 or more) on repeated readings after rest.",
      why: "Severe hypertension increases perioperative stroke, MI and bleeding, and causes large swings in BP under anaesthesia (AAGBI/BHS 2016; ACC/AHA).",
      action: "Postpone, start or adjust treatment, and re-book once below 160/100. Do not lower BP rapidly on the ward. Emergency: proceed; treat pain and anxiety, control BP carefully with titrated drugs, and avoid large falls.",
      sources: [
        "AAGBI / British Hypertension Society: Measurement of adult blood pressure and management of hypertension before elective surgery (2016)",
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)"
      ],
      textbook: []
    },
    {
      id: "recent-mi",
      finding: "Myocardial infarction within the last 60 days.",
      why: "Reinfarction and death are much more likely soon after an MI. 60 days is the ACC/AHA minimum; older teaching and many anaesthetists prefer 3–6 months — guidelines differ.",
      action: "Postpone elective surgery at least 60 days, longer if the MI was large or there is ongoing ischaemia; physician review. Emergency: proceed with senior anaesthetist, continue aspirin, beta-blocker and statin, invasive or close monitoring, avoid tachycardia and hypotension.",
      sources: [
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)"
      ],
      textbook: []
    },
    {
      id: "unstable-angina",
      finding: "Unstable angina — new, worsening, or chest pain at rest — or new ischaemic ECG changes.",
      why: "An active coronary syndrome carries a very high perioperative risk.",
      action: "Postpone; manage as acute coronary syndrome and refer. Emergency: proceed only with senior anaesthetic and medical input.",
      sources: [
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)"
      ],
      textbook: []
    },
    {
      id: "heart-failure-decompensated",
      finding: "Decompensated or new heart failure (breathless lying flat, raised JVP, crackles, new oedema).",
      why: "A strong predictor of perioperative death and pulmonary oedema.",
      action: "Postpone; treat to the patient's best state. Emergency: careful fluids, senior anaesthetist, avoid a high spinal block.",
      sources: [
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)"
      ],
      textbook: []
    },
    {
      id: "arrhythmia-uncontrolled",
      finding: "AF or other arrhythmia with resting ventricular rate above 100; new AF not yet assessed; symptomatic bradycardia; Mobitz type II or complete heart block.",
      why: "Uncontrolled rate causes ischaemia and heart failure; high-grade block can progress to asystole under anaesthesia.",
      action: "Postpone; find the cause (thyroid, sepsis, hypovolaemia, potassium), control the rate, refer heart block for pacing. Emergency: correct electrolytes, have atropine, adrenaline and external pacing or isoprenaline ready.",
      sources: ["ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)"],
      textbook: []
    },
    {
      id: "severe-stenosis",
      finding: "Symptomatic severe aortic or mitral stenosis (fainting, angina, breathlessness) without specialist assessment.",
      why: "These patients cannot raise cardiac output; the fall in BP from a spinal or induction can cause cardiac arrest.",
      action: "Postpone and refer for echo and cardiology. Emergency: senior anaesthetist, slow titrated technique, avoid tachycardia (mitral) and hypotension (aortic).",
      sources: [
        "ACC/AHA guideline for the management of patients with valvular heart disease (2020)",
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)"
      ],
      textbook: []
    },
    {
      id: "stent-recent",
      finding: "Coronary stent inside the minimum dual antiplatelet period (6 months after a stent for stable disease, 12 months after one for acute coronary syndrome; 30 days for bare-metal) when surgery would need clopidogrel stopped.",
      why: "Stopping antiplatelets early causes stent thrombosis — a large MI, often fatal.",
      action: "Postpone elective surgery. Time-sensitive surgery from 1 month with cardiologist agreement and aspirin continued. Emergency: proceed on both drugs if possible, accept more bleeding, have platelets available; no spinal on clopidogrel.",
      sources: [
        "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
        "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)"
      ],
      textbook: []
    },
    {
      id: "stroke-recent",
      finding: "Stroke or TIA within the last 3 months.",
      why: "Perioperative stroke and cardiac event rates are highest in the first 3 months and stay raised to about 9 months.",
      action: "Postpone elective surgery at least 3 months (many anaesthetists prefer 9 months for purely elective surgery — guidelines differ). Emergency: maintain BP near the patient's baseline; continue aspirin if possible.",
      sources: [
        "SNACC consensus statement on perioperative care of patients at high risk for stroke (2014); Jørgensen et al., JAMA 2014"
      ],
      textbook: []
    },
    {
      id: "vte-recent",
      finding: "DVT or PE within the last 3 months, or a suspected new DVT or PE.",
      why: "Stopping anticoagulation early carries a high risk of recurrence; an untreated clot can embolise.",
      action: "Postpone until at least 3 months of anticoagulation; treat a suspected new clot. Emergency: bridging with therapeutic heparin decided by a specialist; restart anticoagulation as soon as bleeding allows.",
      sources: [
        "American College of Chest Physicians (CHEST) guideline: Perioperative management of antithrombotic therapy (2022)"
      ],
      textbook: []
    },
    {
      id: "chest-infection-active",
      finding: "Acute chest infection or exacerbation of asthma/COPD: fever, productive cough, crackles, wheeze, or SpO2 below the patient's usual.",
      why: "Much higher risk of bronchospasm, hypoxia, postoperative pneumonia and respiratory failure.",
      action: "Postpone; treat and re-book after recovery (many wait 4–6 weeks after pneumonia before major surgery). Emergency: regional anaesthesia where possible, bronchodilators, oxygen, physiotherapy.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "child-urti",
      finding: "Child with a respiratory infection AND fever above 38 °C, purulent nasal discharge, productive cough, wheeze, or low SpO2.",
      why: "Laryngospasm, bronchospasm and desaturation are several times more likely.",
      action: "Postpone about 2 weeks after recovery (some advise up to 4). A child with only a clear runny nose and no fever can usually proceed. Emergency: experienced anaesthetist, avoid airway instrumentation where possible.",
      sources: [
        "Tait & Malviya: anesthesia for the child with an upper respiratory tract infection, Anesth Analg 2005"
      ],
      textbook: []
    },
    {
      id: "tb-infectious",
      finding: "Untreated or newly treated infectious pulmonary TB.",
      why: "Risk to staff and other patients; poor wound healing and lung reserve.",
      action: "Postpone until no longer infectious (usually at least 2 weeks of effective treatment with clinical improvement; confirm with the TB clinic). Emergency: last on the list, breathing-circuit filter, N95 masks.",
      sources: ["WHO consolidated guidelines on tuberculosis"],
      textbook: []
    },
    {
      id: "fever-unexplained",
      finding: "Unexplained fever of 38 °C or above.",
      why: "May be malaria, pneumonia, urinary or wound infection — all worsen outcome and some spread.",
      action: "Postpone; find the cause (malaria test, chest, urine). Emergency: treat the likely cause and proceed.",
      sources: ["WHO Surgical Care at the District Hospital (2003) and WHO Surgical Safety Checklist"],
      textbook: []
    },
    {
      id: "glucose-ketones",
      finding: "Diabetic with ketoacidosis (blood ketones above 3 mmol/L, urine ketones 2+ or more, or acidosis), hyperosmolar state, or uncorrected hypoglycaemia (glucose below 4 mmol/L / 72 mg/dL).",
      why: "Anaesthesia in DKA risks arrhythmia, cardiovascular collapse and cerebral oedema; hypoglycaemia under anaesthesia causes silent brain injury.",
      action: "Postpone; treat DKA or correct hypoglycaemia. Glucose above 12 mmol/L (216 mg/dL) without ketones is not on its own a cancellation threshold — correct it and discuss with the anaesthetist (there is no single agreed cut-off). Emergency: resuscitate and treat DKA first where the surgical condition allows — often the 'surgical abdomen' settles with DKA treatment.",
      sources: [
        "JBDS-IP / CPOC: Perioperative care of people with diabetes undergoing surgery (2021, revised 2023)",
        "JBDS-IP: The hospital management of hypoglycaemia in adults with diabetes mellitus (current edition)"
      ],
      textbook: []
    },
    {
      id: "hba1c-high",
      finding: "HbA1c above 69 mmol/mol (8.5 %) before elective surgery that can safely wait.",
      why: "Poor control predicts wound infection and other complications (UK JBDS).",
      action: "Refer to improve control and re-book. Not a reason to delay urgent or cancer surgery. Emergency: proceed with a glucose plan.",
      sources: [
        "JBDS-IP / CPOC: Perioperative care of people with diabetes undergoing surgery (2021, revised 2023)"
      ],
      textbook: []
    },
    {
      id: "potassium",
      finding: "Potassium below 3.0 mmol/L or above 6.0 mmol/L.",
      why: "Arrhythmia and cardiac arrest under anaesthesia; suxamethonium raises potassium further. Some anaesthetists use 3.5 and 5.5 as thresholds, especially with digoxin or a new result — guidelines differ.",
      action: "Postpone and correct. Emergency: correct as far as possible before induction; avoid suxamethonium when potassium is high; ECG monitoring.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "inr-high",
      finding: "INR 1.5 or above for surgery, or above 1.4 for a spinal or epidural; patient still within the stopping interval for a DOAC, clopidogrel or therapeutic LMWH.",
      why: "Surgical bleeding; spinal haematoma and paraplegia.",
      action: "Delay (oral vitamin K 1–2 mg for warfarin and recheck) or choose general anaesthesia instead of a spinal. Emergency on warfarin: vitamin K IV plus fresh frozen plasma or prothrombin complex concentrate.",
      sources: [
        "British Society for Haematology: Peri-operative management of anticoagulation and antiplatelet therapy (2016)",
        "AAGBI / OAA / RA-UK: Regional anaesthesia and patients with abnormalities of coagulation (2013)",
        "ASRA evidence-based guidelines: Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy (4th edition, 2018)"
      ],
      textbook: []
    },
    {
      id: "platelets-low",
      finding: "Platelets below 50 × 10⁹/L for surgery, below 80 × 10⁹/L for a spinal or epidural, or below 100 × 10⁹/L for neurosurgery or posterior eye surgery.",
      why: "Bleeding, and spinal haematoma (BSH 2017).",
      action: "Postpone and find the cause. Emergency: platelet transfusion if available; no spinal.",
      sources: ["British Society for Haematology: Guidelines for the use of platelet transfusions (2017)"],
      textbook: []
    },
    {
      id: "anaemia-severe",
      finding: "Haemoglobin below 7 g/dL, or unexplained anaemia before major surgery with expected blood loss.",
      why: "Anaemia increases transfusion, complications and death; treating the cause first is safer.",
      action: "Postpone, investigate and treat (iron, deworming, malaria). There is no single universal Hb cut-off for major elective surgery — many anaesthetists will not start below about 10 g/dL without a blood plan; guidelines differ. Emergency: crossmatch, tranexamic acid, transfuse by restrictive thresholds (7 g/dL; 8 with heart disease).",
      sources: [
        "International consensus statement on the peri-operative management of anaemia and iron deficiency (Anaesthesia 2017)",
        "AABB international guidelines for red blood cell transfusion (JAMA 2023)"
      ],
      textbook: []
    },
    {
      id: "thyrotoxic",
      finding: "Clinically thyrotoxic (tachycardia, tremor, weight loss) or severe hypothyroidism.",
      why: "Thyroid storm or myxoedema coma can be triggered by surgery.",
      action: "Postpone until euthyroid. Emergency: beta-blocker (if no asthma), antithyroid drug, steroids — with physician input.",
      sources: [
        "American Thyroid Association guidelines for hyperthyroidism and other causes of thyrotoxicosis (2016)"
      ],
      textbook: []
    },
    {
      id: "liver-decompensated",
      finding: "Acute hepatitis, unexplained jaundice, or Child–Pugh class C liver disease.",
      why: "Very high perioperative mortality.",
      action: "Postpone elective surgery; investigate and optimise; Child–Pugh C — elective surgery generally avoided. Emergency: correct clotting, glucose, fluids; minimise sedatives.",
      sources: ["Child–Pugh and MELD scores (standard liver risk scoring)"],
      textbook: []
    },
    {
      id: "aki",
      finding: "Acute kidney injury (creatinine rising), fluid overload, or a missed dialysis.",
      why: "Fluid, potassium and drug-handling problems; worse outcome.",
      action: "Postpone; find the cause, dialyse if needed. Emergency: dialyse first if possible; avoid nephrotoxins.",
      sources: [
        "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)"
      ],
      textbook: []
    },
    {
      id: "malnutrition-severe",
      finding: "Severe malnutrition (weight loss over 10–15 % in 6 months, BMI below 18.5, or albumin below 30 g/L without liver or kidney disease) before major elective surgery.",
      why: "Wound breakdown, anastomotic leak, infection and death (ESPEN).",
      action: "Postpone 7–14 days for nutritional support; watch for refeeding syndrome. Emergency: proceed and start nutrition early after surgery.",
      sources: ["ESPEN guideline: Clinical nutrition in surgery (2017, updated 2021)"],
      textbook: []
    },
    {
      id: "pregnancy-elective",
      finding: "Pregnancy, or possible pregnancy not excluded, for elective non-obstetric surgery.",
      why: "Risk to the fetus and changed anaesthetic management.",
      action: "Postpone until after delivery, or to the second trimester if surgery cannot wait (ACOG). Emergency: proceed with obstetric input, left uterine displacement, aspiration prophylaxis.",
      sources: ["ACOG Committee Opinion 775: Nonobstetric surgery during pregnancy (2019)"],
      textbook: []
    },
    {
      id: "airway-unsupported",
      finding: "Predicted difficult airway or a goitre with stridor, when no experienced airway provider or equipment is available.",
      why: "A 'cannot intubate, cannot oxygenate' situation kills within minutes.",
      action: "Refer elective cases. Emergency: most senior help available, regional technique where possible, front-of-neck access kit open.",
      sources: [
        "Difficult Airway Society guidelines for management of unanticipated difficult intubation in adults (2015)"
      ],
      textbook: []
    },
    {
      id: "not-fasted",
      finding: "Not fasted according to the fasting rules.",
      why: "Pulmonary aspiration.",
      action: "Delay until the fasting time is met — do not cancel. Emergency: rapid-sequence induction; do not wait for an arbitrary fasting time.",
      sources: ["ASA Practice guidelines for preoperative fasting (2017, with 2023 update)"],
      textbook: []
    },
    {
      id: "drug-not-stopped",
      finding: "A drug that should have been stopped was not (clopidogrel within 5 days, warfarin with INR too high, DOAC within its interval, combined pill before major surgery).",
      why: "Bleeding, spinal haematoma, or VTE.",
      action: "Delay to the correct interval, or change the plan (general instead of spinal anaesthesia; add VTE prophylaxis for the combined pill). Emergency: proceed with the precautions in the medication rule.",
      sources: [
        "ASRA evidence-based guidelines: Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy (4th edition, 2018)",
        "FSRH UK Medical Eligibility Criteria for Contraceptive Use (UKMEC)"
      ],
      textbook: []
    },
    {
      id: "delirium-new",
      finding: "New confusion (delirium) in an older patient.",
      why: "Usually signals an untreated cause (infection, retention, hypoglycaemia, drugs) and predicts poor outcome.",
      action: "Postpone elective surgery; find and treat the cause. Emergency: proceed, treating the cause at the same time.",
      sources: ["Clinical Frailty Scale (Rockwood); 4AT delirium assessment"],
      textbook: []
    },
    {
      id: "alcohol-withdrawal",
      finding: "Alcohol withdrawal (tremor, sweating, agitation, hallucinations) or intoxication.",
      why: "Withdrawal fits and delirium tremens carry a high mortality around surgery.",
      action: "Postpone; treat withdrawal, give thiamine. Emergency: thiamine before glucose, benzodiazepine cover, close monitoring.",
      sources: ["Cochrane review: preoperative alcohol cessation (2018)"],
      textbook: []
    }
  ],
  nbm: [
    {
      what: "Solid food, including a light meal and sweets",
      hours: 6,
      note: "A heavy, fatty or fried meal: 8 hours (ASA).",
      sources: [
        "ASA Practice guidelines for preoperative fasting (2017, with 2023 update)",
        "ESA guideline: Perioperative fasting in adults and children (2011)"
      ],
      textbook: []
    },
    {
      what: "Heavy, fatty or fried meal (adults)",
      hours: 8,
      note: "Fat and meat empty slowly from the stomach.",
      sources: ["ASA Practice guidelines for preoperative fasting (2017, with 2023 update)"],
      textbook: []
    },
    {
      what: "Formula milk and animal (cow, goat) milk",
      hours: 6,
      note: "Milk counts as food, not as a clear fluid — tea with milk is not a clear fluid.",
      sources: [
        "ASA Practice guidelines for preoperative fasting (2017, with 2023 update)",
        "ESAIC guideline: Pre-operative fasting in children (2022)"
      ],
      textbook: []
    },
    {
      what: "Breast milk",
      hours: 4,
      note: "ESAIC 2022 allows breast milk up to 3 hours before in infants; 4 hours is the more conservative and still widely used limit — guidelines differ.",
      sources: [
        "ASA Practice guidelines for preoperative fasting (2017, with 2023 update)",
        "ESAIC guideline: Pre-operative fasting in children (2022)"
      ],
      textbook: []
    },
    {
      what: "Clear fluids — adults (water, clear juice without pulp, black tea or coffee without milk)",
      hours: 2,
      note: "Encourage drinking clear fluids up to 2 hours before — it reduces thirst, dehydration and nausea and does not increase aspiration.",
      sources: [
        "ASA Practice guidelines for preoperative fasting (2017, with 2023 update)",
        "ESA guideline: Perioperative fasting in adults and children (2011)"
      ],
      textbook: []
    },
    {
      what: "Clear fluids — children",
      hours: 2,
      note: "European paediatric guidance (APA 2018, ESAIC 2022) allows clear fluids until 1 hour before; 2 hours is the conservative limit — guidelines differ, either is acceptable. Actively offer a drink up to the limit: the harm is in fasting far longer.",
      sources: [
        "APA / ESPA / ADARPEF consensus statement on clear fluids fasting for elective paediatric general anaesthesia (2018)",
        "ESAIC guideline: Pre-operative fasting in children (2022)",
        "ASA Practice guidelines for preoperative fasting (2017, with 2023 update)"
      ],
      textbook: []
    },
    {
      what: "Usual oral medications",
      hours: 0,
      note: "Take with a small sip of water at the usual time unless a medication rule says otherwise.",
      sources: ["ASA Practice guidelines for preoperative fasting (2017, with 2023 update)"],
      textbook: []
    },
    {
      what: "Chewing gum",
      hours: null,
      note: "Chewing gum should not by itself delay surgery (ESA), but ask the patient to remove it; sweets count as solid food.",
      sources: ["ESA guideline: Perioperative fasting in adults and children (2011)"],
      textbook: []
    },
    {
      what: "Prolonged fasting is harmful — children, diabetics, older and malnourished patients",
      hours: null,
      note: "Fasting longer than the limits above causes dehydration, hypoglycaemia and ketosis in children, hypoglycaemia or ketoacidosis in diabetics, and dehydration, low blood pressure, kidney injury and delirium in older patients. Put these patients first on the list. If the list is delayed, let them drink clear fluids until 2 hours before the new time, or start IV fluids — glucose-containing for children and diabetics.",
      sources: [
        "ESAIC guideline: Pre-operative fasting in children (2022)",
        "JBDS-IP / CPOC: Perioperative care of people with diabetes undergoing surgery (2021, revised 2023)",
        "ASA Practice guidelines for preoperative fasting (2017, with 2023 update)"
      ],
      textbook: []
    },
    {
      what: "High aspiration risk despite fasting (pregnancy from the second trimester, bowel obstruction, diabetic gastroparesis, severe reflux, obesity, opioids, trauma)",
      hours: null,
      note: "Fasting does not guarantee an empty stomach. Give antacid prophylaxis (oral omeprazole the night before and the morning, or an H2 blocker such as cimetidine or famotidine; 30 mL of 0.3 M sodium citrate just before induction) and use rapid-sequence induction for general anaesthesia. Ranitidine was withdrawn worldwide in 2020 and should not be used. Pass a nasogastric tube and aspirate in bowel obstruction.",
      sources: ["ASA Practice guidelines for preoperative fasting (2017, with 2023 update)"],
      textbook: []
    },
    {
      what: "Emergency surgery",
      hours: null,
      note: "Do not delay a genuine emergency to meet fasting times — treat the patient as having a full stomach (rapid-sequence induction, or regional anaesthesia where suitable).",
      sources: [
        "ASA Practice guidelines for preoperative fasting (2017, with 2023 update)",
        "WHO Surgical Care at the District Hospital (2003) and WHO Surgical Safety Checklist"
      ],
      textbook: []
    }
  ],
  sources: [
    "NICE NG45: Routine preoperative tests for elective surgery (2016)",
    "ACC/AHA guideline for perioperative cardiovascular management for noncardiac surgery (2024)",
    "ESC guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery (2022)",
    "American College of Chest Physicians (CHEST) guideline: Perioperative management of antithrombotic therapy (2022)",
    "BRIDGE trial — Douketis et al., Perioperative bridging anticoagulation in patients with atrial fibrillation, NEJM 2015",
    "PAUSE cohort study — Douketis et al., perioperative management of patients with atrial fibrillation on a DOAC, JAMA Internal Medicine 2019",
    "ASRA evidence-based guidelines: Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy (4th edition, 2018)",
    "AAGBI / OAA / RA-UK: Regional anaesthesia and patients with abnormalities of coagulation (2013)",
    "British Society for Haematology: Peri-operative management of anticoagulation and antiplatelet therapy (2016)",
    "British Society for Haematology: Guidelines for the use of platelet transfusions (2017)",
    "SDCEP: Management of dental patients taking anticoagulants or antiplatelet drugs (2015)",
    "ACC/AHA guideline for the management of patients with valvular heart disease (2020)",
    "JBDS-IP / CPOC: Perioperative care of people with diabetes undergoing surgery (2021, revised 2023)",
    "American Diabetes Association Standards of Care in Diabetes: Diabetes care in the hospital (current edition)",
    "US FDA drug safety communication: stopping SGLT2 inhibitors before scheduled surgery (2020)",
    "AAGBI / RCP / Society for Endocrinology: Guidelines for the management of glucocorticoids during the peri-operative period (Anaesthesia 2020)",
    "AAGBI / British Hypertension Society: Measurement of adult blood pressure and management of hypertension before elective surgery (2016)",
    "POISE trial (Lancet 2008) and POISE-2 trial (NEJM 2014)",
    "STOP-or-NOT trial: continuing versus stopping renin–angiotensin system inhibitors before major surgery (JAMA 2024)",
    "ASA Practice guidelines for preoperative fasting (2017, with 2023 update)",
    "ESA guideline: Perioperative fasting in adults and children (2011)",
    "ESAIC guideline: Pre-operative fasting in children (2022)",
    "APA / ESPA / ADARPEF consensus statement on clear fluids fasting for elective paediatric general anaesthesia (2018)",
    "ESPEN guideline: Clinical nutrition in surgery (2017, updated 2021)",
    "NICE NG89: Venous thromboembolism in over 16s — reducing the risk (2018, updated 2019)",
    "FSRH UK Medical Eligibility Criteria for Contraceptive Use (UKMEC)",
    "AABB international guidelines for red blood cell transfusion (JAMA 2023)",
    "International consensus statement on the peri-operative management of anaemia and iron deficiency (Anaesthesia 2017)",
    "WHO guideline on haemoglobin cut-offs to define anaemia",
    "TAPS trial — Howard et al., Lancet 2013; BSH guideline on red cell transfusion in sickle cell disease (2016)",
    "Difficult Airway Society guidelines for management of unanticipated difficult intubation in adults (2015)",
    "ASA Physical Status Classification System",
    "Revised Cardiac Risk Index — Lee et al., Circulation 1999",
    "IDSA clinical practice guideline for the management of asymptomatic bacteriuria (2019)",
    "HRS / ASA expert consensus statement on perioperative management of implantable pacemakers and defibrillators (2011)",
    "UK Clinical Pharmacy Association: Handbook of Perioperative Medicines (current online edition)",
    "SNACC consensus statement on perioperative care of patients at high risk for stroke (2014); Jørgensen et al., JAMA 2014",
    "AAGBI: Peri-operative management of the obese surgical patient (2015)",
    "STOP-Bang questionnaire — Chung et al.",
    "WHO Surgical Care at the District Hospital (2003) and WHO Surgical Safety Checklist",
    "ACOG Committee Opinion 775: Nonobstetric surgery during pregnancy (2019)",
    "AHA scientific statement on prevention of viridans group streptococcal infective endocarditis (2021); ESC endocarditis guidelines (2023)",
    "WHO consolidated guidelines on tuberculosis",
    "WHO consolidated HIV guidelines; Ethiopian national consolidated HIV guidelines",
    "Child–Pugh and MELD scores (standard liver risk scoring)",
    "Coté et al., postoperative apnoea in former preterm infants, Anesthesiology 1995",
    "Tait & Malviya: anesthesia for the child with an upper respiratory tract infection, Anesth Analg 2005",
    "WHO: Tobacco and postsurgical outcomes (2020)",
    "Cochrane review: preoperative alcohol cessation (2018)",
    "American Thyroid Association guidelines for hyperthyroidism and other causes of thyrotoxicosis (2016)",
    "Clinical Frailty Scale (Rockwood); 4AT delirium assessment",
    "JBDS-IP: The hospital management of hypoglycaemia in adults with diabetes mellitus (current edition)",
    "Alberti glucose–insulin–potassium regimen (Br J Anaesth 1979) and later reviews",
    "AHA/ACC/HFSA guideline for the management of heart failure (2022)"
  ]
};
