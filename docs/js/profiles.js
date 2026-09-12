/* ============================================================
   MedBridge setting profiles — country / facility-level adaptation
   ------------------------------------------------------------
   A profile changes: equipment defaults per facility tier, calculator
   defaults (drop factor, glucose unit, weight formula), local procedures,
   and per-drug notes (stocked strengths, national protocol, technique).
   All content is DRAFT until reviewed against the national STG/EML.
   ============================================================ */
window.PROFILES = [
/* ---------------------------------------------------------- */
{
  id: "generic",
  name: "Generic low-resource setting (WHO / MSF)",
  region: "Any country",
  summary: "Defaults drawn from WHO and MSF guidance. Use this when no national profile exists, then customise it for your facility.",
  tiers: [
    { id: "post", name: "Health post / dispensary", equipment: { im: true, oral: true, rectal: true, glucometer: true, bp: true, mdi: true } },
    { id: "centre", name: "Health centre", equipment: { iv: true, im: true, oral: true, rectal: true, macro_set: true, syringe_1ml: true, lidocaine: true, glucometer: true, bp: true, mdi: true, oxygen: true } },
    { id: "district", name: "District / primary hospital", equipment: { iv: true, io: true, im: true, oral: true, rectal: true, macro_set: true, micro_set: true, burette: true, syringe_1ml: true, lidocaine: true, glucometer: true, bp: true, oxygen: true, neb: true, mdi: true } },
    { id: "referral", name: "Regional / referral hospital", equipment: { iv: true, io: true, im: true, oral: true, rectal: true, pump: true, syringe_driver: true, macro_set: true, micro_set: true, burette: true, syringe_1ml: true, lidocaine: true, glucometer: true, ecg: true, bp: true, oxygen: true, neb: true, mdi: true } }
  ],
  calc: { dropFactor: 20, glucoseUnit: "mmol/L", weightFormula: "apls", sam: true },
  procedures: [
    { title: "Home-made ORS (when sachets run out)", level: "All levels", text: "6 level teaspoons of sugar + ½ level teaspoon of salt in 1 litre of clean (boiled, cooled) water. Taste: no saltier than tears. Use within 24 h. Sachet ORS is always preferred (contains potassium and citrate)." },
    { title: "Bottle spacer for inhalers", level: "All levels", text: "500 mL plastic bottle, hole cut in the base for the MDI, patient breathes from the bottle mouth. See Salbutamol." },
    { title: "Intraosseous access with an ordinary needle", level: "Health centre and above", text: "If no IO device: 18 G spinal needle (or large hypodermic needle) into the flat medial surface of the proximal tibia, 1–2 cm below the tuberosity, directed slightly away from the growth plate. Confirm by aspiration of marrow and free flush. Push fluids with a syringe. Remove within 24 h." },
    { title: "Time-tape on fluid bags", level: "All levels", text: "Tape down the bag, mark the expected level each hour. Nurses correct the clamp against the line." },
    { title: "Burette as a safety limit", level: "Health centre and above", text: "Fill only one hour of a dangerous drug (vasopressors, magnesium, potassium, insulin, heparin) so a free-running line cannot bolus the bag." },
    { title: "Kangaroo mother care", level: "All levels", text: "Skin-to-skin for low-birth-weight and preterm infants where incubators are unavailable; keeps temperature, supports breastfeeding, reduces sepsis." },
    { title: "Sublingual sugar for hypoglycaemia", level: "All levels", text: "One teaspoon of sugar moistened with water under the tongue when IV access is impossible (WHO Pocket Book)." },
    { title: "Referral note essentials", level: "All levels", text: "Drug, dose, route, exact time given, weight used, fluids given, last vital signs, and what is due next (e.g. next MgSO4 IM dose at 14:00)." }
  ],
  drugNotes: {},
  sources: [{ name: "WHO Pocket Book of Hospital Care for Children 2013" }, { name: "MSF Clinical Guidelines and Essential Drugs" }],
  review: { status: "draft" }
},
/* ---------------------------------------------------------- */
{
  id: "ethiopia",
  name: "Ethiopia",
  region: "East Africa",
  summary: "Adapted to the Ethiopian health system tiers (health post → health centre → primary hospital → general/specialised hospital), the national Standard Treatment Guidelines (STG) and Essential Medicines List, and common local stock strengths (e.g. 40 % dextrose, 20 %/50 % magnesium sulfate).",
  tiers: [
    { id: "post", name: "Health post (Health Extension Workers)", equipment: { im: true, oral: true, rectal: true, bp: true, mdi: false, glucometer: false } },
    { id: "centre", name: "Health centre (BEmONC, IMNCI)", equipment: { iv: true, im: true, oral: true, rectal: true, macro_set: true, syringe_1ml: true, lidocaine: true, glucometer: true, bp: true, mdi: true, oxygen: true } },
    { id: "primary", name: "Primary hospital (CEmONC, surgery)", equipment: { iv: true, io: true, im: true, oral: true, rectal: true, macro_set: true, micro_set: true, burette: true, syringe_1ml: true, lidocaine: true, glucometer: true, bp: true, oxygen: true, neb: true, mdi: true, ecg: true } },
    { id: "general", name: "General / specialised hospital", equipment: { iv: true, io: true, im: true, oral: true, rectal: true, pump: true, syringe_driver: true, macro_set: true, micro_set: true, burette: true, syringe_1ml: true, lidocaine: true, glucometer: true, ecg: true, bp: true, oxygen: true, neb: true, mdi: true } }
  ],
  calc: { dropFactor: 20, glucoseUnit: "mg/dL", weightFormula: "age4x2", sam: true },
  procedures: [
    { title: "Pre-referral care at health post / health centre", level: "Health post, health centre", text: "Give the first dose before transfer and write the time on the referral slip: rectal artesunate (child < 6 y, severe malaria), IM gentamicin + oral amoxicillin (young infant PSBI when referral refused), IM magnesium sulfate 10 g (eclampsia / severe pre-eclampsia), rectal diazepam (convulsion), oxytocin 10 IU IM or misoprostol (PPH), ORS by cup/NG on the way." },
    { title: "Community-based newborn care (CBNC)", level: "Health post", text: "Health Extension Workers manage possible serious bacterial infection in young infants with IM gentamicin once daily (7 days) plus oral amoxicillin twice daily when referral is not possible, per the national CBNC protocol. Dilute gentamicin for accurate small volumes (see Gentamicin)." },
    { title: "Misoprostol for PPH prevention at home births", level: "Health post", text: "Misoprostol 600 mcg oral immediately after birth where oxytocin/cold chain is unavailable; 800 mcg sublingual for treatment while referring (verify against the current national protocol)." },
    { title: "Magnesium sulfate — Pritchard IM regimen", level: "Health centre and above", text: "The Ethiopian obstetric management protocol uses the IM (Pritchard) regimen: 4 g IV of 20 % over 5–20 min + 10 g of 50 % IM (5 g each buttock), then 5 g IM every 4 h. Health centres give the loading dose and refer. Check RR, reflexes and urine output before each dose." },
    { title: "Home-made sugar–salt solution", level: "All levels", text: "6 level teaspoons sugar + ½ level teaspoon salt in 1 L boiled-cooled water when ORS sachets are out. Sachet ORS + zinc (10 mg < 6 mo, 20 mg ≥ 6 mo for 10–14 days) is standard." },
    { title: "Cholera treatment centre (CTC) rehydration", level: "Health centre and above", text: "Cholera cots, Ringer's lactate through two large cannulae for severe dehydration (100 mL/kg in 3 h adults; Plan C children), ORS by cup as soon as able, doxycycline single dose after rehydration; strict infection prevention." },
    { title: "Severe acute malnutrition (SAM) inpatient care", level: "Health centre (OTP) and stabilisation centres", text: "National SAM protocol: F-75 then F-100/RUTF, ReSoMal for dehydration (5 mL/kg every 30 min for 2 h, then 5–10 mL/kg/h), NO Plan C rates, IV only for shock (15 mL/kg over 1 h), routine amoxicillin, glucose 10 % 50 mL orally/NG on admission." },
    { title: "Ketamine anaesthesia by non-physician anaesthetists", level: "Primary hospital", text: "IM/IV ketamine is the standard anaesthetic for emergency surgery, caesarean section and burns dressings where an anaesthesia machine or specialist is not available. Suction, oxygen and bag-valve-mask at every table." },
    { title: "Oxygen concentrators", level: "Health centre and above", text: "Concentrators (5–10 L/min) with nasal prongs are the main oxygen source; keep a cylinder backup for power cuts; check SpO2 target ≥ 90 %. Split flow with a 'Y' connector or flow-splitter for two patients where necessary." },
    { title: "IV giving sets", level: "All levels", text: "Standard adult sets are 20 drops/mL; paediatric burette (Soluset) sets are 60 drops/mL. Check the packet — this is the default used by the calculators for this profile." },
    { title: "Glucose units", level: "All levels", text: "Glucometers in Ethiopia usually read in mg/dL. Divide by 18 to get mmol/L (e.g. 250 mg/dL ≈ 14 mmol/L; 70 mg/dL ≈ 3.9 mmol/L). The units calculator converts both ways." }
  ],
  drugNotes: {
    "dextrose": { stock: ["40 % dextrose (400 mg/mL) in 20 mL ampoules is commonly stocked instead of 50 %.", "5 % and 10 % dextrose 500 mL bags; 5 % dextrose in NS."], protocol: ["Hypoglycaemia in children: 5 mL/kg of 10 % glucose IV (IMNCI/STG); if no IV, sugar water or breast milk by NG/cup."], technique: ["Making 10 % from 40 %: 1 part D40 + 3 parts NS or WFI (e.g. 10 mL D40 + 30 mL NS = 40 mL of 10 %).", "Adult dose from 40 %: 25 g = 62.5 mL of D40 (≈ 3 ampoules) — dilute and give slowly, or use 10 % 250 mL.", "Use the Dilution calculator: stock 40, target 10."] },
    "magnesium-sulfate": { stock: ["20 % (2 g/10 mL) and 50 % (5 g/10 mL) ampoules — check which one is on the shelf before drawing up."], protocol: ["National obstetric protocol: Pritchard regimen (4 g IV + 10 g IM loading, 5 g IM 4-hourly). Health centres give the loading dose and refer.", "Calcium gluconate 10 % must be on the tray."], technique: ["If only 20 % is stocked: 4 g = 20 mL IV over 5–20 min; the IM 5 g doses need 25 mL of 20 % (split 2 sites) — painful and large; prefer 50 % for IM."] },
    "oxytocin": { stock: ["10 IU/mL ampoules; potency loss common with broken cold chain — store in the vaccine fridge."], protocol: ["AMTSL: 10 IU IM within 1 min of birth at all facility levels.", "Misoprostol is the alternative uterotonic at health post/home births."], technique: [] },
    "artesunate": { stock: ["Artesunate 60 mg vials with bicarbonate + NS; rectal artesunate 100 mg for pre-referral; artemether–lumefantrine (Coartem) for follow-on."], protocol: ["National Malaria Guideline: IV/IM artesunate first-line for severe malaria at all ages; quinine only if artesunate unavailable; complete a full AL course afterwards.", "P. vivax is common — chloroquine + primaquine 14 days for radical cure per the guideline (G6PD considerations)."], technique: ["Health post: rectal artesunate 10 mg/kg for children < 6 y then refer immediately."] },
    "quinine": { stock: ["Quinine dihydrochloride 600 mg/2 mL ampoules; oral quinine 300 mg tablets."], protocol: ["Second-line for severe malaria when artesunate is out of stock; 20 mg/kg loading by drip over 4 h, then 10 mg/kg every 8 h; IM diluted at health centres."], technique: [] },
    "gentamicin": { stock: ["80 mg/2 mL (40 mg/mL) ampoules; 20 mg/2 mL paediatric strength is stocked for CBNC where available."], protocol: ["CBNC/PSBI: Health Extension Workers give gentamicin IM once daily for 7 days plus oral amoxicillin when referral is refused or impossible.", "Neonatal sepsis at facilities: ampicillin + gentamicin (STG)."], technique: ["Dilute 40 mg/mL to 10 mg/mL for neonatal doses (1 mL + 3 mL WFI)."] },
    "ceftriaxone": { stock: ["250 mg, 500 mg and 1 g vials widely available."], protocol: ["Meningitis and severe pneumonia second-line per STG; IM with lidocaine at health centres for pre-referral."], technique: [] },
    "insulin-soluble": { stock: ["Regular (soluble) insulin 100 IU/mL vials; cold chain in the vaccine fridge; NPH and premixed for maintenance."], protocol: ["DKA at hospitals without pumps: hourly IM regular insulin 0.1 U/kg after fluids is the usual practice; glucose reported in mg/dL — switch to dextrose-containing fluids when glucose < 250 mg/dL (≈ 14 mmol/L)."], technique: ["Use U-100 insulin syringes; a tuberculin syringe is NOT the same scale."] },
    "potassium-chloride": { stock: ["Ampoules may be 15 % (2 mmol/mL) or 20 % (2.68 mmol/mL) — read the ampoule every time."], protocol: ["Oral potassium and ORS first where possible; IV only diluted to ≤ 40 mmol/L via a fresh bag."], technique: [] },
    "salbutamol": { stock: ["MDI 100 mcg/puff widely stocked; nebuliser solution mainly at hospitals."], protocol: ["IMNCI: MDI with home-made bottle spacer is the standard for wheeze at health centres; nebulisers are scarce."], technique: [] },
    "aminophylline": { stock: ["250 mg/10 mL ampoules commonly available."], protocol: ["Used at hospitals for severe asthma when nebulised/IV β2-agonists are unavailable; 6-hourly dosing without pumps (WHO Pocket Book)."], technique: [] },
    "diazepam": { stock: ["10 mg/2 mL ampoules; rectal use of the ampoule solution is the norm."], protocol: ["IMNCI pre-referral: rectal diazepam 0.5 mg/kg for a convulsing child, then refer."], technique: [] },
    "phenobarbital": { stock: ["200 mg/mL ampoules; 30/60/100 mg tablets."], protocol: ["Neonatal seizures and status second-line; IM loading where IV is unavailable."], technique: [] },
    "ketamine": { stock: ["50 mg/mL 10 mL vials in every primary hospital."], protocol: ["Primary anaesthetic for emergency surgery by nurse anaesthetists / emergency surgical officers; IM 5 mg/kg for children."], technique: [] },
    "morphine": { stock: ["Morphine 10 mg/mL ampoules and oral morphine solution are available in hospitals but supply is irregular; tramadol and pethidine are often the only strong analgesics at health centres."], protocol: [], technique: [] },
    "adrenaline": { stock: ["1 mg/mL ampoules only; no prefilled 1:10 000."], protocol: ["Anaphylaxis: 0.5 mg IM adult, 0.01 mg/kg child; make 1:10 000 by dilution for arrest."], technique: [] },
    "noradrenaline": { stock: ["Usually available only in general/specialised hospitals; dopamine or adrenaline are more commonly stocked at primary hospitals."], protocol: [], technique: ["Where noradrenaline is unavailable, use the adrenaline gravity infusion (4 mg/250 mL) with the same drop tables."] },
    "dopamine": { stock: ["200 mg/5 mL ampoules — often the vasoactive drug available at primary hospitals."], protocol: [], technique: [] },
    "hydralazine": { stock: ["20 mg powder ampoules; nifedipine 10/20 mg tablets."], protocol: ["National obstetric protocol: hydralazine 5 mg IV slowly repeated, or 12.5 mg IM; oral nifedipine as alternative; labetalol where stocked."], technique: [] },
    "labetalol": { stock: ["Limited availability outside referral hospitals."], protocol: [], technique: [] },
    "tranexamic-acid": { stock: ["500 mg/5 mL ampoules on the national EML for PPH and trauma."], protocol: ["1 g IV over 10 min within 3 h of birth with uterotonics for PPH."], technique: [] },
    "heparin": { stock: ["UFH 5000 IU/mL; enoxaparin 40/60/80 mg syringes at hospitals."], protocol: [], technique: [] },
    "ringers-lactate": { stock: ["Ringer's lactate and 0.9 % NaCl 500 mL/1 L; half-strength Darrow's with 5 % dextrose for SAM is not always stocked — ReSoMal is used."], protocol: ["Plan A/B/C per IMNCI; SAM: national protocol (no Plan C, 15 mL/kg/h only if shocked)."], technique: [] },
    "calcium-gluconate": { stock: ["10 % 10 mL ampoules — must accompany every magnesium sulfate tray."], protocol: [], technique: [] }
  },
  sources: [
    { name: "Ethiopia FMOH. Standard Treatment Guidelines for General Hospitals / Health Centres (EFDA), current edition — verify each note against it" },
    { name: "Ethiopia FMOH. Management Protocol on Selected Obstetrics Topics (magnesium sulfate, PPH, hypertension)" },
    { name: "Ethiopia FMOH. National Malaria Guidelines, 5th ed. 2022" },
    { name: "Ethiopia FMOH. Community-Based Newborn Care (CBNC) implementation guideline" },
    { name: "Ethiopia FMOH. National Guideline for the Management of Acute Malnutrition" },
    { name: "Ethiopia FMOH. IMNCI chart booklet" }
  ],
  review: { status: "draft" }
},
/* ---------------------------------------------------------- */
{
  id: "kenya",
  name: "Kenya",
  region: "East Africa",
  summary: "Based on the Kenya MOH Basic Paediatric Protocols (ETAT+) and the Kenya Essential Medicines List. Glucose is reported in mmol/L; 20 drops/mL adult sets and 60 drops/mL paediatric burettes are standard.",
  tiers: [
    { id: "dispensary", name: "Dispensary / health centre (Level 2–3)", equipment: { iv: true, im: true, oral: true, rectal: true, macro_set: true, syringe_1ml: true, glucometer: true, bp: true, mdi: true } },
    { id: "subcounty", name: "Sub-county hospital (Level 4)", equipment: { iv: true, io: true, im: true, oral: true, rectal: true, macro_set: true, micro_set: true, burette: true, syringe_1ml: true, lidocaine: true, glucometer: true, bp: true, oxygen: true, neb: true, mdi: true } },
    { id: "county", name: "County referral hospital (Level 5)", equipment: { iv: true, io: true, im: true, oral: true, rectal: true, pump: true, macro_set: true, micro_set: true, burette: true, syringe_1ml: true, lidocaine: true, glucometer: true, ecg: true, bp: true, oxygen: true, neb: true, mdi: true } }
  ],
  calc: { dropFactor: 20, glucoseUnit: "mmol/L", weightFormula: "apls", sam: true },
  procedures: [
    { title: "ETAT+ triage and shock definition", level: "All levels", text: "Fluid bolus (20 mL/kg Ringer's/NS over 1 h; 15 min if severe) only when ALL of: cold hands, capillary refill > 3 s, weak and fast pulse. Otherwise use Plan C for severe dehydration. Do not bolus children with SAM (use 15 mL/kg over 1 h only if shocked)." },
    { title: "Hypoglycaemia", level: "All levels", text: "5 mL/kg of 10 % dextrose IV; if only 50 % available, dilute 1 part D50 with 4 parts water for injection. If no IV: 50 mL of 10 % dextrose or sugar solution by NG." },
    { title: "Convulsions", level: "All levels", text: "Rectal diazepam 0.5 mg/kg (or IV 0.3 mg/kg slowly); repeat once after 10 min; then phenobarbital 20 mg/kg IM/IV." },
    { title: "Young infant sepsis", level: "All levels", text: "Benzylpenicillin + gentamicin (gentamicin: first week of life 3 mg/kg if < 2 kg, 5 mg/kg if ≥ 2 kg; > 7 days 7.5 mg/kg, once daily)." },
    { title: "Severe malaria", level: "All levels", text: "Artesunate IV/IM: 3 mg/kg if < 20 kg, 2.4 mg/kg if ≥ 20 kg at 0, 12, 24 h then daily; pre-referral rectal artesunate at dispensary level; follow-on AL." },
    { title: "Oxygen", level: "Level 3 and above", text: "Nasal prongs 1–2 L/min (infant) to 4 L/min (child) from concentrators; SpO2 target ≥ 90 %." }
  ],
  drugNotes: {
    "ringers-lactate": { stock: ["Ringer's lactate 500 mL is the bolus fluid in the protocols; NS acceptable."], protocol: ["Bolus only with the full shock definition (Basic Paediatric Protocols); Plan C otherwise."], technique: [] },
    "dextrose": { stock: ["50 % dextrose 50 mL and 10 % 500 mL bags."], protocol: ["5 mL/kg of 10 % IV; D50 diluted 1:4."], technique: [] },
    "gentamicin": { stock: ["80 mg/2 mL and 20 mg/2 mL."], protocol: ["Once-daily dosing per protocol; neonatal doses by weight/age as above."], technique: [] },
    "artesunate": { stock: ["60 mg vials; rectal 100 mg."], protocol: ["3 mg/kg (< 20 kg) or 2.4 mg/kg (≥ 20 kg)."], technique: [] },
    "diazepam": { stock: ["10 mg/2 mL ampoules used rectally."], protocol: ["0.5 mg/kg PR; 0.3 mg/kg IV."], technique: [] },
    "phenobarbital": { stock: ["200 mg/mL ampoules."], protocol: ["20 mg/kg IM/IV loading, then 5 mg/kg/day."], technique: [] },
    "insulin-soluble": { stock: ["Regular insulin 100 IU/mL."], protocol: ["Glucose in mmol/L: switch to dextrose-containing fluids below 14 mmol/L."], technique: [] }
  },
  sources: [
    { name: "Kenya MOH. Basic Paediatric Protocols for ages up to 5 years, 5th ed. 2022 — verify each note" },
    { name: "Kenya Essential Medicines List 2023" }
  ],
  review: { status: "draft" }
}
];

/* Ethiopian regions and the cities/towns with hospitals — used by the account form. */
window.ET_PLACES = [
  { region: "Addis Ababa", cities: ["Addis Ababa"] },
  { region: "Afar", cities: ["Semera", "Asayita", "Dubti", "Logiya", "Awash", "Chifra"] },
  { region: "Amhara", cities: ["Bahir Dar", "Gondar", "Dessie", "Debre Birhan", "Debre Markos", "Woldia", "Kombolcha", "Debre Tabor", "Finote Selam", "Injibara", "Motta", "Shewa Robit", "Lalibela"] },
  { region: "Benishangul-Gumuz", cities: ["Assosa", "Bambasi", "Gilgel Beles", "Kamashi"] },
  { region: "Central Ethiopia", cities: ["Hosaena", "Butajira", "Worabe", "Wolkite", "Durame", "Halaba Kulito"] },
  { region: "Dire Dawa", cities: ["Dire Dawa"] },
  { region: "Gambela", cities: ["Gambela", "Itang", "Abobo"] },
  { region: "Harari", cities: ["Harar"] },
  { region: "Oromia", cities: ["Adama", "Jimma", "Bishoftu", "Nekemte", "Shashemene", "Asella", "Ambo", "Robe (Bale)", "Goba", "Metu", "Bedele", "Gimbi", "Dembi Dolo", "Wolisso", "Fiche", "Modjo", "Ziway (Batu)", "Agaro", "Chiro", "Negele Borana", "Yabelo", "Holeta", "Sebeta", "Burayu", "Mojo", "Bule Hora" ] },
  { region: "Sidama", cities: ["Hawassa", "Yirgalem", "Aleta Wondo", "Leku", "Hagere Selam"] },
  { region: "Somali", cities: ["Jigjiga", "Gode", "Degehabur", "Kebri Dehar", "Werder", "Shilabo", "Dolo Ado"] },
  { region: "South Ethiopia", cities: ["Arba Minch", "Sodo (Wolaita)", "Jinka", "Sawla", "Dilla", "Bonga", "Mizan Teferi", "Tepi", "Karat (Konso)"] },
  { region: "Tigray", cities: ["Mekelle", "Adigrat", "Axum", "Shire (Inda Selassie)", "Alamata", "Wukro", "Humera", "Maychew", "Adwa"] },
  { region: "Other / outside Ethiopia", cities: ["Other"] }
];
