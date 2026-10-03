/* procedures-data.js — bedside surgical procedures.

   Scope came from an unattributed student exam-preparation file. That file is
   NOT cited anywhere here and was not trusted: several of its instructions were
   rejected outright, including clamping a chest drain for transport (which
   risks a tension pneumothorax), a 6th-intercostal-space drain site, antibiotics
   for the life of the drain, and a fixed cuff-deflation schedule.

   Only the equipment lists carry citations, and only to the Asella Referral and
   Teaching Hospital OR materials file. The technique, landmarks, sizes and
   aftercare are written as standard practice and are NOT traced to a named page
   in any textbook — the app says so on every procedure page. DRAFT throughout. */
window.PROCEDURES = [
  {
    id: "chest-tube",
    name: "Chest tube insertion (tube thoracostomy)",
    aka: ["chest drain", "intercostal drain", "ICD", "underwater seal drain", "tube thoracotomy"],
    summary: "A tube through the chest wall into the pleural space, draining to a one-way underwater seal. It is the definitive treatment for a pneumothorax, haemothorax or empyema, and the commonest life-saving operation a district hospital does without a surgeon. A tension pneumothorax is decompressed with a needle first; the drain follows.",
    urgency: "both",
    anaesthesia: "Local infiltration with lidocaine, down to and including the parietal pleura. Add ketamine with atropine for a child, or an adult too distressed to keep still, with a named person watching the airway.",
    indications: [
      "Pneumothorax: tension (after needle decompression), open, or any pneumothorax in a ventilated or transported patient.",
      "Simple spontaneous pneumothorax that is large or symptomatic, or that fails aspiration.",
      "Haemothorax, traumatic or spontaneous.",
      "Empyema or a parapneumonic effusion that is pus or loculated.",
      "Chylothorax.",
      "A recurrent or symptomatic malignant effusion, for drainage or pleurodesis.",
      "After thoracic or upper abdominal surgery where the pleura has been opened."
    ],
    contraindications: [
      {
        item: "Dense adhesion of the lung to the chest wall across the whole hemithorax",
        absolute: true,
        note: "There is no space to enter. You will go through lung. If an earlier film or earlier surgery tells you the pleura is obliterated, do not insert blind — this needs a surgeon and imaging."
      },
      {
        item: "No one-way drainage system available and no ability to improvise one",
        absolute: true,
        note: "Opening the pleura without a seal converts a closed pneumothorax into an open one. Read the `missing` list before you make the incision, not after."
      },
      {
        item: "Transudative effusion of heart, liver or renal failure",
        absolute: false,
        note: "Usually a reason NOT to drain. It reaccumulates, you lose protein, and you add infection to a patient who cannot afford it. Treat the cause. Tap it once with a needle if you must relieve breathlessness."
      },
      {
        item: "Coagulopathy, anticoagulants, liver disease, platelets very low",
        absolute: false,
        note: "Relative. Correct what you can first. In an emergency it does not stop you — but choose the safe triangle exactly, dissect bluntly, and have blood identified."
      },
      {
        item: "Skin infection or burn at the chosen site",
        absolute: false,
        note: "Move the site within the safe triangle, or to the other border of it. Do not drain through cellulitis if you have any alternative."
      },
      {
        item: "Suspected diaphragmatic hernia on that side",
        absolute: false,
        note: "Bowel may be sitting in the chest and a drain will perforate it. If the film shows gas-filled loops above the diaphragm, or bowel sounds in the chest, stop and get a surgeon."
      }
    ],
    equipment: [
      {
        item: "Chest tube, correct size, plus one size either side",
        qty: "3",
        note: "Silicone or PVC, with side fenestrations, depth markings and a radiopaque line. Check the fenestrations are patent before you open the chest.",
        drugId: null
      },
      {
        item: "Underwater seal bottle with connecting tubing and an adaptor",
        qty: "1",
        note: "Filled, connected, tested and standing on the floor BELOW the patient before the pleura is opened.",
        drugId: null
      },
      {
        item: "Sterile water or normal saline for the seal",
        qty: "500 mL",
        note: "Enough to cover the end of the long tube by about 2 cm and no more. Deeper makes the patient work harder to drain; shallower lets air be sucked back.",
        drugId: "normal-saline"
      },
      {
        item: "Lidocaine 1 % or 2 %",
        qty: "20 mL",
        note: "Maximum 5 mg/kg plain, 7 mg/kg with adrenaline. Calculate the volume before you draw it up. Anaesthetise the parietal pleura — it is the layer people skip and the layer that hurts.",
        drugId: "lidocaine"
      },
      {
        item: "Morphine, small titrated IV doses",
        qty: "1",
        note: "Before and after. This procedure is routinely under-treated for pain and an under-treated patient will not breathe deeply afterwards.",
        drugId: "morphine"
      },
      {
        item: "Ketamine",
        qty: "1",
        note: "For a child or an uncooperative adult, with a named person on the airway.",
        drugId: "ketamine"
      },
      { item: "Atropine", qty: "1", note: "With ketamine, for secretions.", drugId: "atropine" },
      {
        item: "Oxygen, high flow",
        qty: "1",
        note: "On and flowing before you start.",
        drugId: "oxygen"
      },
      {
        item: "Curved artery forceps / Kelly clamps",
        qty: "2",
        note: "One to dissect through muscle and pleura, one to guide the tube in. A third to clamp the tube's outer end until it is connected.",
        drugId: null
      },
      { item: "Scalpel, No. 11 or No. 23 blade", qty: "1", note: "", drugId: null },
      {
        item: "Needle holder, straight scissors, toothed forceps",
        qty: "1 each",
        note: "",
        drugId: null
      },
      {
        item: "Silk or nylon 1 or 1/0 on a cutting needle",
        qty: "1",
        note: "Non-absorbable. This single stitch is the only thing holding the drain in for the next several days.",
        drugId: null
      },
      {
        item: "Antiseptic — povidone-iodine or chlorhexidine",
        qty: "1",
        note: "Prepare the whole hemithorax. You will need to palpate the sternal angle and count ribs with a gloved hand.",
        drugId: "povidone-iodine"
      },
      { item: "Syringes 10 mL and 20 mL, needles 21G and 23G", qty: "2 each", note: "", drugId: null },
      {
        item: "Sterile gown, gloves, drape, mask and eye protection",
        qty: "1 set",
        note: "Blood and pus under pressure go where they want.",
        drugId: null
      },
      {
        item: "Sterile gauze, adhesive plaster, petroleum-jelly gauze",
        qty: "—",
        note: "The petroleum-jelly gauze is for the day the tube comes out, not for insertion.",
        drugId: null
      },
      {
        item: "Wide-bore needle or IV cannula (14G or 16G)",
        qty: "2",
        note: "For immediate needle decompression if this turns out to be a tension pneumothorax. Keep it on the trolley.",
        drugId: null
      },
      {
        item: "Large-bore IV access and crystalloid",
        qty: "2 L",
        note: "Draining a large haemothorax can unmask the hypovolaemia it was tamponading.",
        drugId: "ringers-lactate"
      },
      {
        item: "Blood: two crossmatched units or two identified donors, for a haemothorax",
        qty: "2",
        note: "Identify them before you drain, not after.",
        drugId: "blood-transfusion"
      },
      {
        item: "Tranexamic acid 1 g",
        qty: "1",
        note: "If within 3 hours of injury.",
        drugId: "tranexamic-acid"
      },
      {
        item: "Ceftriaxone",
        qty: "1",
        note: "A single pre-insertion dose is reasonable for a traumatic haemothorax. It is not needed for a spontaneous pneumothorax. Decide and say which — do not leave it to habit.",
        drugId: "ceftriaxone"
      }
    ],
    steps: [
      {
        n: 1,
        title: "Is this a tension pneumothorax?",
        text: "Tracheal deviation, distended neck veins, a silent resonant hemithorax, falling BP. If yes: decompress NOW with a 14G cannula in the second intercostal space in the mid-clavicular line, or in the safe triangle. Say out loud that you are doing this so nobody waits for a film. The drain comes afterwards."
      },
      {
        n: 2,
        title: "Confirm the side with your own hands",
        text: "Examine the patient yourself. Look at the film yourself, with the name on it. Mark the skin on the correct side. A drain on the wrong side is a recurring and entirely preventable catastrophe, and in a tension pneumothorax it is fatal."
      },
      {
        n: 3,
        title: "Set up the seal first",
        text: "Fill the bottle so the long tube sits about 2 cm under the water. Connect the tubing. Stand the bottle on the floor, below the patient. Test that you can blow down the tube and bubble. Do all of this BEFORE the pleura is opened."
      },
      {
        n: 4,
        title: "Position",
        text: "Supine, head of bed up about 45 degrees, arm on the affected side abducted and the hand behind the head or resting on the patient's forehead. This opens the axilla and moves the latissimus back."
      },
      {
        n: 5,
        title: "Find the safe triangle",
        text: "Anterior border: the lateral edge of pectoralis major. Posterior border: the anterior edge of latissimus dorsi (roughly the mid- to posterior axillary line). Floor: the horizontal line of the nipple, which is about the fifth intercostal space. Apex: the base of the axilla. Insert in the fourth or fifth intercostal space just anterior to the mid-axillary line. Going lower risks the diaphragm, and under it the liver on the right and the spleen and stomach on the left. Going higher risks the axillary vessels and is harder and more painful."
      },
      {
        n: 6,
        title: "Prepare and drape",
        text: "Antiseptic to the whole hemithorax — you will need to count ribs from the sternal angle with your hand in the field. Full sterile drape, gown, gloves, mask, eye protection."
      },
      {
        n: 7,
        title: "Anaesthetise in layers",
        text: "Raise a skin bleb over the rib BELOW your chosen space. Then aspirate before each injection and infiltrate as you advance: subcutaneous tissue, then down onto the rib, then the intercostal muscles walking just over the upper border of that lower rib, then the parietal pleura. Aspirating air or blood tells you where the space is. Give the pleura the biggest share of the dose."
      },
      {
        n: 8,
        title: "Incise",
        text: "A 2–3 cm transverse incision over the rib below the chosen space, about 1.5 times the diameter of the tube and no larger. Starting low and tunnelling up over the top of the lower rib makes an oblique track that closes itself when the tube comes out."
      },
      {
        n: 9,
        title: "Blunt dissection only",
        text: "With closed curved forceps, push and spread through the subcutaneous fat and the serratus fibres, angling up over the upper border of the lower rib. Stay on top of the rib: the artery, vein and nerve run under the lower border of the rib above. Do not cut muscle with a blade beyond the skin."
      },
      {
        n: 10,
        title: "Enter the pleura",
        text: "Push the closed tip of the forceps through the parietal pleura with controlled force, then open the jaws to widen the hole. There is usually a rush of air or fluid. Remove the forceps."
      },
      {
        n: 11,
        title: "Put a finger in",
        text: "Sweep a gloved finger through the hole. You are confirming you are in the pleural space, feeling lung move against your fingertip, and freeing any adhesion in reach. If you feel bowel, liver or solid organ, stop and get help. In a small child a finger will not fit — use the forceps and be certain of the air or fluid rush."
      },
      {
        n: 12,
        title: "Insert the tube",
        text: "Clamp the tube's outer end. Hold the tip in the jaws of the second forceps and guide it through the track. Aim the tip towards the apex for air, towards the base and posteriorly for blood or pus. Advance until every fenestration plus a few centimetres is inside the chest — usually 8–10 cm past the chest wall in an adult, more in a large patient. Read the depth marking at skin level and write it down."
      },
      {
        n: 13,
        title: "Connect and unclamp",
        text: "Connect to the seal tubing with the adaptor, push the connection fully home, and tape it. Then release the clamp. Watch for bubbling and for a fluid level that swings up and down with breathing. Swing means the tube is in the pleural space and patent."
      },
      {
        n: 14,
        title: "Anchor it",
        text: "A single stitch through the skin on each side of the tube, tied, then wound at least twice tightly round the tube and tied again so it just indents the tube. Non-absorbable suture only. Tape the tube to the chest wall in a loop so a pull on the tubing does not pull on the tube."
      },
      {
        n: 15,
        title: "Dress and document",
        text: "Simple gauze and plaster. Do not pack petroleum-jelly gauze round an indwelling tube — it macerates skin and hides a leak. Record: side, tube size, depth at skin, what came out and how much, whether it bubbles and whether it swings."
      },
      {
        n: 16,
        title: "Teach the ward before you leave",
        text: "Name a nurse and say the four rules out loud: the bottle stays on the floor below the chest; nobody lifts it above the patient, ever; nobody clamps it without a written instruction; output is recorded every shift. Then get a film if you can."
      }
    ],
    landmarks: "The safe triangle: lateral border of pectoralis major in front, anterior border of latissimus dorsi behind, the horizontal line of the nipple (about the fifth intercostal space) as the floor, the base of the axilla as the apex. Insert in the fourth or fifth intercostal space just anterior to the mid-axillary line, hugging the upper border of the lower rib because the intercostal vessels and nerve run under the lower border of the rib above. For needle decompression of a tension pneumothorax: second intercostal space, mid-clavicular line, or the safe triangle.",
    sizes: [
      {
        who: "Adult — haemothorax, empyema or thick pus",
        size: "28–32F",
        note: "Large-bore remains standard teaching where the fluid is blood or pus. Smaller tubes block."
      },
      {
        who: "Adult — air only (pneumothorax)",
        size: "20–24F",
        note: "Adequate for air. Smaller-bore drains are increasingly used for air in better-equipped units; practice varies, so confirm with your surgical department."
      },
      {
        who: "Child — blood or pus",
        size: "20–24F",
        note: "Judge against the size of the intercostal space, not the age alone."
      },
      { who: "Child — air only", size: "12–20F", note: "" },
      {
        who: "Infant / neonate",
        size: "8–12F",
        note: "A neonatal chest drain is a specialist procedure. If you have a choice, do not learn it tonight."
      },
      {
        who: "All ages — what the number means",
        size: "French gauge",
        note: "French is the outer circumference in millimetres, roughly three times the diameter, because diameter is unreliable in a soft tube. A 30F tube is about 10 mm across."
      }
    ],
    aftercare: [
      "Get a chest film if one is available: all fenestrations inside the pleural space, the lung expanded, the tube not in the lung parenchyma or across the mediastinum.",
      "Measure output hourly for the first 6 hours, then every 6 hours. Record volume and colour at every check.",
      "Limit the first drainage to about 1.5 L, then stop and wait an hour before draining more. Rapid drainage of a large collection causes re-expansion pulmonary oedema.",
      "Check at every round: the site, that the tube is at the recorded depth, that the connections are tight, that the bottle is upright and below the chest, that the level swings, and whether it bubbles.",
      "Describe air leak by when it bubbles: on coughing only, on talking, or continuously at rest. Continuous bubbling at rest means a big leak or a disconnection — check the connections first.",
      "Regular paracetamol plus titrated morphine. The point of analgesia here is to let the patient take deep breaths, cough and sit up. A patient too sore to breathe deeply gets a collapsed lower lobe and then pneumonia.",
      "Sit up, breathe deeply, cough hourly while awake, and mobilise with the bottle carried low.",
      "Empty or change the bottle when it is full, recording the volume. Keep the water level at 2 cm over the tube tip.",
      "Do not give routine antibiotics for the duration of the drain. A single dose at insertion for a traumatic haemothorax is reasonable; continuing antibiotics because a tube is in place is not."
    ],
    troubleshooting: [
      {
        problem: "No swing and no bubbling",
        action: "Either the lung is fully up and the pleura is dry, or the tube is blocked, kinked or out. Look at the patient, not just the bottle. Check the tube from skin to bottle for a kink or a loop of dependent fluid, check the depth marking against what you recorded, and check the connection. Then percuss and auscultate."
      },
      {
        problem: "Blocked by clot",
        action: "Milk the tubing by hand. If you must irrigate, clamp briefly, instil 20–30 mL of sterile saline through a sterile catheter passed down the tube or through a three-way tap, aspirate, then unclamp. Never leave a bubbling drain clamped and never walk away from a clamped drain."
      },
      {
        problem: "Continuous bubbling at rest",
        action: "Work from the bottle back to the patient. Loose adaptor, split tubing, a fenestration that has slipped out through the chest wall, or a genuine bronchopleural leak. If a fenestration is outside the chest, air is being sucked in through the skin wound: that tube must be replaced, not pushed back in — pushing a contaminated tube inwards seeds the pleura."
      },
      {
        problem: "Surgical emphysema spreading up the neck and face",
        action: "Usually a fenestration outside the pleura, a drain that is blocked, or a leak bigger than the drain can handle. Check the drain is patent and at depth. It is alarming but not itself dangerous; the cause is. If the airway or eyes are threatened, call for help."
      },
      {
        problem: "Bleeding from the insertion site",
        action: "Direct pressure with gauze. Most is from the wound edge. Bright brisk bleeding, or more than 200 mL/hour down the tube, is an intercostal vessel or an organ — this needs a surgeon, not a bigger dressing."
      },
      {
        problem: "Massive immediate drainage, patient deteriorating",
        action: "The haemothorax was tamponading the bleeding. Clamp nothing. Run fluid and blood, call for theatre. About 1500 mL immediately, or more than 200 mL/hour for 2–4 hours, is an indication for thoracotomy in an adult (roughly 20 mL/kg immediately or 3 mL/kg/hour in a child). Know before you start where that thoracotomy would happen."
      },
      {
        problem: "Cough, breathlessness and frothy sputum hours after a big drainage",
        action: "Re-expansion pulmonary oedema. Stop draining, clamp (there is no air leak in this situation), sit up, oxygen. It can be delayed 24–48 hours. This is the one circumstance in which clamping is correct, and it must be a written instruction."
      },
      {
        problem: "The tube has fallen out",
        action: "Cover the wound immediately with a gauze dressing taped on three sides only, so air can leave but not enter. Do not seal it on all four sides — that recreates a tension pneumothorax. Assess the patient and insert a new tube through a fresh site if still needed. Never reinsert the tube that fell out."
      },
      {
        problem: "Tube is in the wrong place on the film",
        action: "The first tube stays in until a second working tube is in. Insert the new one through a new site, confirm it swings and drains, then remove the first."
      }
    ],
    removal: {
      when: [
        "The reason for it has gone, confirmed clinically and on a film where one is available.",
        "For fluid: output under about 150–200 mL in 24 hours of clear serous fluid, and no pus, blood or chyle.",
        "For air: no bubbling at all, including on coughing, and the lung staying up.",
        "Patient comfortable, not breathless, saturations stable off suction.",
        "For a spontaneous pneumothorax many units clamp the tube for a period and repeat the film before removing. Practice varies on whether to clamp and for how long — confirm with your surgical department, and never clamp a tube that is still bubbling."
      ],
      how: [
        "Explain it and give analgesia 30–60 minutes beforehand. This hurts.",
        "Prepare a petroleum-jelly or antibiotic-ointment gauze and a dressing, opened and within reach, before you touch the tube.",
        "Clean the site. Cut the anchoring stitch.",
        "Have the patient take a deep breath in and hold it, or breathe out fully and hold — either works, what matters is that they are not breathing in while the tube leaves. Have them demonstrate the hold first so you know they understand.",
        "Pull the tube out in one brisk continuous movement and immediately press the occlusive gauze onto the wound.",
        "Tape it down firmly. Close the skin with one stitch if the hole is large.",
        "Listen to the chest. Get a film a few hours later if you can, and sooner if the patient becomes breathless.",
        "Record the time, who did it, and what the patient's breathing was like afterwards."
      ]
    },
    complications: {
      immediate: [
        "Wrong side.",
        "Perforation of lung, diaphragm, liver, spleen, stomach or heart — almost always from a trocar, from going below the safe triangle, or from blind insertion.",
        "Intercostal vessel or nerve injury from hugging the wrong border of the rib.",
        "Tube in the chest wall soft tissue or outside the pleura, draining nothing.",
        "Tube pushed into the lung parenchyma or across the mediastinum.",
        "Vasovagal syncope.",
        "Local anaesthetic toxicity if the maximum dose was not calculated.",
        "Severe pain from an unanaesthetised pleura."
      ],
      early: [
        "Blocked or kinked drain.",
        "Dislodgement, usually with the dressing or at night.",
        "Persistent air leak.",
        "Surgical emphysema.",
        "Re-expansion pulmonary oedema, up to 24–48 hours later.",
        "Retained haemothorax and then empyema.",
        "Site infection, pneumonia.",
        "Atelectasis and lower lobe collapse because the pain was not treated."
      ],
      late: [
        "Empyema.",
        "Intercostal neuralgia, which can last months.",
        "Fibrothorax and a trapped lung after an inadequately drained haemothorax or empyema.",
        "Scar at the site.",
        "Rarely, a bronchopleural fistula."
      ]
    },
    missing: [
      {
        item: "A chest tube",
        substitute: "In extremis, a sterile large-bore nasogastric tube (16–18F) for a simple pneumothorax only. Otherwise a finger thoracostomy left open under a dressing taped on three sides until a real tube is found.",
        note: "A urinary (Foley) catheter is NOT a chest drain and the reasons are specific. Its balloon can be inflated inside the chest, where it tears lung or wedges and is then pulled through the tract. It has one small end hole and no side fenestrations, so in a haemothorax it clots off within hours. Its wall is soft and it kinks at the chest wall and under the dressing. It has no radiopaque line and no depth markings, so a film cannot tell you where it is and you cannot record a depth. The lethal part is that it looks like it is working — the bag fills a little — while the chest goes on filling. For a tension pneumothorax, needle decompression buys you the hours you need to find a real tube."
      },
      {
        item: "An underwater seal bottle",
        substitute: "A clean glass or rigid plastic bottle with a stopper, a rigid tube through the stopper reaching about 2 cm below the water surface, and a second hole left open to air.",
        note: "This is the standard improvisation and it works. Non-negotiables: the tube end stays under the water; the second hole stays open or the bottle becomes a pressure vessel; the bottle stays on the floor below the chest and is never lifted above the patient, because lifting it siphons the contents back into the pleura. Mark the fluid level and the time on the outside with tape so output can be measured."
      },
      {
        item: "Any one-way system at all, including an improvised bottle",
        substitute: "A flutter valve: the finger of a sterile glove tied over the tube's end with a slit cut across its tip.",
        note: "It vents air and it is adequate for transport or a few hours. It does not drain blood or pus, it sticks shut when wet, and it needs watching continuously. It is a bridge to a seal, not a treatment."
      },
      {
        item: "A urine bag used as the collecting system",
        substitute: "Use it only as the reservoir hanging below an improvised water seal bottle, never as the seal itself.",
        note: "Asella's own OR materials list pairs an 18F nasogastric tube with a urine bag when an abdominal drain is needed, and for an abdominal drain that is reasonable. The chest is different: a urine bag has no water seal, so air tracks back up the tube on every inspiration. Attaching a chest tube straight to a urine bag gives you an open pneumothorax with a bag on the end of it."
      },
      {
        item: "Sterile water or saline for the seal",
        substitute: "Water boiled for 5 minutes and cooled in the covered pan it was boiled in.",
        note: "Acceptable. Tap water, well water or river water is not — you are building a direct channel into the pleural space."
      },
      {
        item: "Silk or nylon 1",
        substitute: "Nylon or polypropylene 2/0, or silk 2/0 doubled.",
        note: "Never anchor a chest drain with an absorbable suture alone. It lets go after a few days, usually at night, and the tube comes away with the dressing."
      },
      {
        item: "Kelly clamps or curved artery forceps",
        substitute: "Any sturdy curved haemostat, plus your own finger.",
        note: "The finger is the important instrument: it confirms the pleural space and frees adhesions. What you must not do is push a trocar-mounted tube in blind. If the only tube you have comes with a trocar, withdraw the trocar completely, make the track by blunt dissection and finger, and guide the tube with a clamp. Trocar insertion is how lungs, livers, hearts and spleens get perforated."
      },
      {
        item: "Lidocaine",
        substitute: "Ketamine 1 mg/kg IV with atropine and a named person on the airway.",
        note: "For an awake adult there is no substitute for local anaesthetic in a procedure this painful. Doing it without is cruel and it is also unsafe, because the patient moves at the worst moment. The single exception is a tension pneumothorax or an arrest: decompress with a needle at once and anaesthetise nothing."
      },
      {
        item: "A chest X-ray, before or after",
        substitute: "Your own examination, and the behaviour of the drain.",
        note: "Tension pneumothorax is a clinical diagnosis and waiting for a film kills people. Afterwards: bubbling with respiration, a column that swings with breathing, a chest that becomes resonant and symmetrical, and a patient whose work of breathing falls — these tell you a great deal. Write down what you found so the next person is not guessing."
      },
      {
        item: "Nursing able to keep the bottle upright and below the chest, and to measure output",
        substitute: "None.",
        note: "Say it plainly: the drain is only as safe as whoever looks after it for the next three days. If you cannot teach and name that person before you insert it, you have not finished preparing. The two instructions that matter most are never lift the bottle and never clamp without an order."
      },
      {
        item: "A written clamping instruction",
        substitute: "None.",
        note: "A clamped drain in a patient with an air leak causes a tension pneumothorax, and it is usually clamped by a well-meaning person moving the patient. Do not teach 'clamp for transport' — it is a common instruction and it is wrong. For transport, keep the bottle upright and below the patient and carry it low. Clamping is only for the specific written indications: re-expansion oedema, and a planned pre-removal trial in a non-bubbling drain."
      }
    ],
    redflags: [
      "Tension pneumothorax — needle decompression first, now, before any sterile preparation.",
      "You cannot satisfy yourself which side it is. Stop and re-examine. Do not proceed on someone else's report alone.",
      "Gas-filled bowel loops above the diaphragm on the film, or bowel sounds in the chest — this may be a diaphragmatic hernia. Do not insert.",
      "You have no one-way drainage system and no bottle you can improvise. Do not open the pleura.",
      "Your only tube is a Foley catheter. Do not use it. Needle-decompress, and find a tube.",
      "You feel solid organ through the thoracostomy. Stop, do not insert the tube, and get a surgeon.",
      "Immediate drainage approaching 1500 mL in an adult, or sustained output over 200 mL/hour — this is a thoracotomy. Call now.",
      "There is nobody who can look after an underwater seal on the ward. Resolve that before you insert the drain."
    ],
    caseIds: ["trauma"],
    packIds: ["chest-tube"],
    textbook: [],
    sources: [
      {
        name: "WHO. Surgical Care at the District Hospital, 2003 — chest drainage and the underwater seal"
      },
      {
        name: "Primary Surgery, Volume 2: Trauma (ed. Maurice King) — chest injuries and underwater seal drainage"
      },
      { name: "Primary Trauma Care manual — needle decompression and chest drainage" },
      { name: "Schwartz's Principles of Surgery — chest wall, pleura and trauma" },
      {
        name: "Note: the Asella Referral and Teaching Hospital OR materials list (2025) does not cover tube thoracostomy. No technique, size or equipment claim in this guide is attributed to it, except the single note about nasogastric tubes and urine bags used as abdominal drains."
      }
    ],
    review: { status: "draft", by: null, date: null }
  },
  {
    id: "urethral-catheter",
    name: "Urethral catheterisation",
    aka: ["Foley catheter", "indwelling catheter", "IDC", "bladder catheter", "catheterisation"],
    summary: "A tube passed along the urethra into the bladder to drain urine. It is the commonest invasive procedure in the hospital, and the one most often done badly: forced, oversized, left in too long, or inserted when the right answer was to leave the urethra alone. Done gently and removed early it is safe; forced, it causes a false passage and a stricture the patient carries for life.",
    urgency: "both",
    anaesthesia: "Topical: 10 mL of 2 % lidocaine gel instilled into the urethra and left for at least 5 minutes. In a woman, gel on the catheter tip is usually enough.",
    indications: [
      "Acute urinary retention.",
      "Accurate hourly urine output in a shocked, septic, burned or post-operative patient, or during resuscitation.",
      "Bypassing obstruction, particularly where there is hydronephrosis or rising creatinine.",
      "Intermittent decompression of a neurogenic bladder.",
      "Bladder irrigation for clot retention, pus or heavy haematuria (three-way catheter).",
      "Perioperative drainage for a laparotomy, caesarean or pelvic operation.",
      "An uncontaminated specimen or a post-void residual measurement where no other method exists.",
      "Contrast studies of the lower urinary tract.",
      "Incontinence with skin breakdown, when nothing else has worked and after the alternatives have genuinely been tried."
    ],
    contraindications: [
      {
        item: "Suspected urethral disruption",
        absolute: true,
        note: "Blood at the meatus, perineal or scrotal bruising, a high-riding or impalpable prostate, or a pelvic fracture with inability to pass urine. Do not pass a catheter and do not let anyone else try. A single attempt can convert a partial urethral tear into a complete one. The answer is a suprapubic catheter."
      },
      {
        item: "No catheter of a sensible size, and no sterile alternative",
        absolute: true,
        note: "Improvising a tube into the urethra is how strictures are made. See the `missing` list."
      },
      {
        item: "Known urethral stricture",
        absolute: false,
        note: "Relative. One gentle attempt with a smaller catheter (12–14F) by the most experienced person available. If it does not pass easily, stop. Do not dilate it at 2 a.m."
      },
      {
        item: "Recent urethral or prostatic surgery",
        absolute: false,
        note: "Relative. The anastomosis or resection bed is fragile. Find out what was done and by whom before you pass anything."
      },
      {
        item: "Acute prostatitis or florid urethritis",
        absolute: false,
        note: "Relative. Passing a catheter can seed bacteraemia. If you must, cover with antibiotics and use the smallest catheter that drains."
      },
      {
        item: "Known artificial urinary sphincter or penile prosthesis",
        absolute: false,
        note: "Rare here, but if present do not catheterise without urological advice."
      }
    ],
    equipment: [
      {
        item: "Foley catheter 16F two-way, plus one size smaller and one larger",
        qty: "3",
        note: "A 16F two-way catheter with a urine bag is what Asella's OR materials list specifies for adult laparotomy cases, and it is a sensible default adult size.",
        drugId: null
      },
      {
        item: "Urine drainage bag with a sampling port and an outlet tap",
        qty: "1",
        note: "A closed system. Every disconnection is an infection.",
        drugId: null
      },
      {
        item: "Lidocaine gel 2 %",
        qty: "10 mL",
        note: "It is the anaesthetic and the lubricant. Instil it, do not just smear the tip.",
        drugId: "lidocaine"
      },
      {
        item: "Sterile water for the balloon",
        qty: "20 mL",
        note: "In a 10 mL syringe. Inflate to the volume printed on the balloon port, not to what feels right.",
        drugId: null
      },
      {
        item: "Povidone-iodine or chlorhexidine for cleaning",
        qty: "1",
        note: "Use an aqueous preparation on the glans and vulva. Strong alcoholic iodine on scrotal or vulval skin causes a painful dermatitis.",
        drugId: "povidone-iodine"
      },
      { item: "Sterile gloves, drape, gauze, kidney dish", qty: "1 set", note: "", drugId: null },
      {
        item: "Syringe 10 mL",
        qty: "2",
        note: "One for the balloon, one for the gel if you have no pre-filled applicator.",
        drugId: null
      },
      {
        item: "Catheter strap or adhesive tape",
        qty: "1",
        note: "To secure the tubing to the lower abdomen or upper thigh.",
        drugId: null
      },
      {
        item: "Three-way catheter 20–24F plus irrigation fluid",
        qty: "1",
        note: "For clot retention only. Asella's list for transvesical prostatectomy specifies a 24F three-way catheter and 18F three-way catheters with two urine bags.",
        drugId: null
      },
      {
        item: "Normal saline for irrigation",
        qty: "3 L",
        note: "For a three-way catheter. Warm it if you can; cold irrigation causes bladder spasm.",
        drugId: "normal-saline"
      }
    ],
    steps: [
      {
        n: 1,
        title: "Ask the three questions first",
        text: "Is there blood at the meatus, bruising of the perineum or scrotum, or a pelvic fracture? Has this patient had urethral surgery or a known stricture? Does this patient actually need a catheter, or do they need a bottle and help to stand? If any of the first two is yes, stop and read the contraindications."
      },
      {
        n: 2,
        title: "Explain and position",
        text: "Explain what you are doing and that it will feel odd rather than sharp. Man: supine, legs slightly apart. Woman: supine, knees flexed and apart, with a light you can actually see by and an assistant if you need one. Dignity costs nothing and a relaxed patient is an easier catheterisation."
      },
      {
        n: 3,
        title: "Choose the catheter before you open anything",
        text: "Routine adult: 16F. Suspected stricture or a small meatus: 12–14F. Difficult prostate: 16–18F, because a larger catheter is stiffer and less likely to deviate into the prostatic fossa, with a coudé tip if you have one. Clot retention or heavy haematuria: 20–24F three-way."
      },
      {
        n: 4,
        title: "Clean",
        text: "Sterile gloves. Man: retract the foreskin, clean the glans and meatus with aqueous antiseptic working outwards. Woman: part the labia and clean from inside outwards, front to back. Drape. Then change to a second pair of sterile gloves, or keep one hand clean and one dirty and do not confuse them."
      },
      {
        n: 5,
        title: "Anaesthetise properly",
        text: "Instil 10 mL of 2 % lidocaine gel into the urethra, pinch the meatus closed, and wait at least 5 minutes. In a man, a gentle squeeze of the penile shaft spreads it along the urethra. This step is skipped constantly and it is the difference between a smooth insertion and a torn one."
      },
      {
        n: 6,
        title: "Insert — man",
        text: "Hold the penis up and straight to take out the normal S-bend. Advance the catheter steadily, not quickly. At the external sphincter in the membranous urethra you will meet a normal resistance: lower the penis towards horizontal, ask the patient to breathe out slowly or to imagine passing urine, and advance through it. Never force. If it will not go, withdraw a centimetre, re-angle, and try once more gently."
      },
      {
        n: 7,
        title: "Insert — woman",
        text: "Part the labia and identify the meatus above the vaginal opening. Insert straight, about 5–8 cm, until urine flows, then 2–3 cm more. If the catheter goes into the vagina, leave it there as a landmark and pass a second sterile catheter into the meatus above it, then remove the first."
      },
      {
        n: 8,
        title: "Do not stop when urine appears",
        text: "Urine coming out only means the tip is in the bladder; the balloon may still be in the prostatic urethra. Advance until the Y-junction of the catheter arms is at the meatus. Inflating a balloon inside the urethra ruptures it, and it is the commonest serious injury of this procedure."
      },
      {
        n: 9,
        title: "Inflate the balloon",
        text: "Inflate with sterile water to the volume printed on the balloon port — usually 10 mL in an adult, 3–5 mL in a child. Push the plunger fully in before you disconnect, or fluid runs back into the syringe. Stop immediately if the patient reports pain as you inflate: deflate completely, advance further, and try again. Then pull back gently until the balloon sits on the bladder neck."
      },
      {
        n: 10,
        title: "Connect and secure",
        text: "Connect to a closed drainage bag. Hang the bag below the level of the bladder but off the floor. Secure the tubing to the lower abdomen or upper thigh with slack in it — not stretched across the thigh, where walking tugs the catheter out."
      },
      {
        n: 11,
        title: "Replace the foreskin",
        text: "In an uncircumcised man, pull the foreskin forward over the glans. A foreskin left retracted behind the glans becomes a paraphimosis in a few hours, and that is a surgical emergency you created."
      },
      {
        n: 12,
        title: "Record it",
        text: "Date and time, size and type, balloon volume, residual volume drained, how it looked, and the reason the catheter is in. Then write the planned removal date. A catheter with no stated reason and no removal date is a catheter that stays in for a month."
      }
    ],
    landmarks: "Male urethra: the S-shaped course is straightened by lifting the penis; the normal point of resistance is the external sphincter at the membranous urethra, roughly 15–20 cm in. Female urethra: 3–4 cm long, the meatus lies in the vestibule between the clitoris and the vaginal opening — above and in front of the vagina.",
    sizes: [
      {
        who: "Adult, routine",
        size: "16F two-way",
        note: "The default. A 16F two-way catheter with a urine bag is on Asella's OR materials list for routine adult laparotomy."
      },
      {
        who: "Adult, suspected stricture or small meatus",
        size: "12–14F",
        note: "Smaller and softer. One gentle attempt only."
      },
      {
        who: "Adult man, enlarged prostate or a difficult pass",
        size: "16–18F, coudé tip if available",
        note: "Counterintuitive but correct: a larger, stiffer catheter follows the urethral curve better. A small floppy catheter curls up in the prostatic fossa."
      },
      {
        who: "Clot retention or heavy haematuria",
        size: "20–24F three-way",
        note: "You need the third channel to irrigate and the bore to pass clot. Asella's transvesical prostatectomy list specifies a 24F three-way plus 18F three-way catheters."
      },
      {
        who: "Child — formula",
        size: "French = (age in years ÷ 2) + 8",
        note: "A starting point, not a rule: a 4-year-old gives 10F, an 8-year-old 12F, a 12-year-old 14F. Round to the nearest size you actually have, and use the smallest catheter that drains freely."
      },
      { who: "Child 1–2 years", size: "8F", note: "" },
      { who: "Infant 6–12 months", size: "6–8F", note: "" },
      {
        who: "Neonate and infant under 6 months",
        size: "5–6F feeding tube",
        note: "The urethra will not take even an 8F Foley. A sterile feeding tube has no balloon, so it must be taped securely and it will fall out if it is not. Neonatal catheterisation is best avoided unless the output measurement genuinely changes what you will do."
      },
      {
        who: "Balloon volume",
        size: "10 mL adult, 3–5 mL child",
        note: "Always the volume printed on the balloon port. Over-inflation does not improve retention; it causes bladder spasm and pain."
      }
    ],
    aftercare: [
      "Bag below the bladder at all times, and off the floor. Lifting the bag above the bladder refluxes infected urine back in.",
      "Empty before it is full, through the outlet tap, into a clean individual container. Never disconnect the catheter from the bag to drain it.",
      "Record volume and appearance every shift. Hourly for a shocked, burned or post-operative patient.",
      "Meatal hygiene with soap and water once a day. No antiseptics, no antibiotic ointments, no bladder washouts for prophylaxis — none of these reduce infection and all of them cause harm.",
      "Keep the tubing free of kinks and dependent loops. A loop of tubing hanging below the bag holds a column of urine and stops drainage.",
      "Review the need for the catheter every single day and write the review down. Duration is the main driver of catheter-associated infection, and nothing else you do matters as much as taking it out.",
      "Do not treat a positive urine culture in a catheterised patient with no symptoms. Treat the patient, not the bag.",
      "Encourage fluids unless they are restricted for another reason.",
      "There is no single safe maximum duration. Latex and PVC catheters are usually changed at 2–4 weeks and silicone up to about 12 weeks. Follow the manufacturer's label and your department's policy — and better, remove it."
    ],
    troubleshooting: [
      {
        problem: "Catheter will not pass in a man — stopped early, around 15–20 cm",
        action: "This is the external sphincter and it is normal resistance. Lower the penis to horizontal, ask the patient to breathe out slowly or to try to pass urine, wait, and advance gently. Add more gel. Do not push harder."
      },
      {
        problem: "Catheter will not pass in a man — stopped just inside, or a gritty feel",
        action: "Think stricture. Try one size smaller (12F). If it still will not go after two gentle attempts by the most experienced person present, stop and go suprapubic. Every further attempt makes a false passage, and a false passage makes the next person's job impossible."
      },
      {
        problem: "No urine after it is clearly in",
        action: "The bladder may be empty — reassess the diagnosis. Or the eyes of the catheter are blocked with gel: flush 20–30 mL of sterile saline and aspirate. Or the catheter is in the vagina. Or you are in a false passage. Palpate and percuss the bladder before you blame the catheter."
      },
      {
        problem: "Pain as the balloon inflates",
        action: "Stop. Deflate completely. The balloon is in the urethra. Advance the catheter further until the Y-junction is at the meatus, confirm urine flow, and inflate again. Never inflate against pain."
      },
      {
        problem: "Frank blood after insertion",
        action: "Usually minor urethral trauma. Secure the catheter, do not remove it (it is tamponading), run fluids and watch. Heavy or continuing bleeding, or inability to pass the catheter with blood at the meatus, means a urethral injury — stop, and arrange suprapubic drainage and surgical review."
      },
      {
        problem: "Catheter blocked, bladder distended, patient in pain",
        action: "Check for a kink or a clamped tube first. Then flush with 30–50 mL of sterile saline through a bladder syringe and aspirate. If it will not clear and the bladder is distended, change the catheter — a blocked catheter in a distended bladder is an emergency, not a job for the morning."
      },
      {
        problem: "Urine leaking around the catheter (bypassing)",
        action: "Almost never means the catheter is too small. It means bladder spasm, constipation, or a blocked catheter. Check for blockage, treat constipation, and consider a SMALLER catheter. Going up a size makes bypassing worse and ulcerates the urethra."
      },
      {
        problem: "Balloon will not deflate at removal",
        action: "First wait, with the syringe left attached on gentle suction — a kinked inflation channel often clears. Then cut the inflation arm off cleanly above the Y-junction and let it drain by gravity for 10–15 minutes. Do NOT pull hard on an inflated balloon and do NOT cut the main catheter below the Y, which loses the lumen. If it is still inflated, this needs ultrasound-guided puncture or a urologist."
      },
      {
        problem: "Paraphimosis after catheterisation",
        action: "You left the foreskin retracted. Reduce it now: squeeze the oedema out of the glans with firm steady pressure for several minutes, then push the glans back through the ring with your thumbs while pulling the foreskin forward. Give analgesia first. Call for help early — a delayed paraphimosis loses the glans."
      }
    ],
    removal: {
      when: [
        "As soon as the reason for it has gone — and that is most catheters, most days.",
        "Output monitoring no longer changing management.",
        "Patient awake, mobile and able to use a bottle or get to the toilet.",
        "After a caesarean or laparotomy, usually within 24 hours unless there is a specific reason to keep it.",
        "After an episode of retention: once the cause has been addressed. In an older man started on an alpha-blocker, a trial of removal after a couple of days is usual. Practice varies — confirm with your surgical department.",
        "Any time there is catheter-associated sepsis and the catheter is the source: remove or change it, do not just give antibiotics down the line."
      ],
      how: [
        "Explain it. Have a bottle or bedpan ready.",
        "Gloves. Deflate the balloon by aspirating with a 10 mL syringe — let it empty passively, do not pull a vacuum against the balloon.",
        "Confirm you have withdrawn the full volume that was put in. If not, stop and see the troubleshooting entry.",
        "Withdraw the catheter gently and steadily. Ask the patient to breathe out as you do. Cover the tip to avoid splashing.",
        "Replace the foreskin if it is retracted.",
        "Record the time of removal, and then watch for the first void. If there is no urine in 6 hours, or the bladder is palpable and the patient is uncomfortable, they are back in retention — reassess before recatheterising."
      ]
    },
    complications: {
      immediate: [
        "Failure to pass it.",
        "Urethral trauma, bleeding and false passage from force.",
        "Urethral rupture from inflating the balloon in the urethra.",
        "Converting a partial urethral tear into a complete one in a pelvic fracture.",
        "Vagal response with bradycardia and faintness.",
        "Paraphimosis from a foreskin left retracted.",
        "Rapid decompression haematuria in a chronically distended bladder."
      ],
      early: [
        "Catheter-associated urinary tract infection, and bacteraemia.",
        "Blockage, bypassing and bladder spasm.",
        "Post-obstructive diuresis after relieving chronic retention — large volumes, with sodium and potassium loss.",
        "Accidental removal with the balloon inflated, tearing the urethra.",
        "Meatal and urethral pressure ulceration from an oversized catheter or tubing taped under tension.",
        "Loss of dignity and of mobility — catheters keep people in bed, and bed causes pressure sores and pneumonia."
      ],
      late: [
        "Urethral stricture, often years later and usually traceable to a forced insertion.",
        "Bladder stones and catheter encrustation.",
        "Reduced functional bladder capacity after prolonged drainage.",
        "Chronic infection and epididymo-orchitis.",
        "Rarely, squamous carcinoma of the bladder after many years of indwelling catheterisation."
      ]
    },
    missing: [
      {
        item: "Any urinary catheter",
        substitute: "For an adult, a sterile large-bore nasogastric or feeding tube can be passed and taped as a temporary drain. For an infant, a 5–6F sterile feeding tube is the normal choice anyway.",
        note: "An NGT has no balloon, so it will not stay in and must be taped to the thigh with slack. It has a smaller, softer lumen that blocks and will not pass clot. Accept it as a few-hours measure to relieve retention or get an output, and change it for a real catheter as soon as one exists. Never cut side holes in a tube yourself — the cut edges shear urethral mucosa and the piece you cut can be left in the bladder. If you cannot drain the bladder safely per urethra, the answer is suprapubic, not a worse tube."
      },
      {
        item: "Sterile water for the balloon",
        substitute: "Sterile normal saline is acceptable for short-term use.",
        note: "Saline can crystallise in the narrow inflation channel and then the balloon will not deflate, so avoid it for a catheter staying in for weeks. Never air: it floats to the top of the bladder, lifts the drainage eyes above the urine so the bladder does not empty, and cannot be measured, so you never know how much to take out. Never tap water."
      },
      {
        item: "Lidocaine gel",
        substitute: "2 % lidocaine injection solution, 10 mL instilled into the urethra, plus plain sterile lubricating jelly on the catheter. Or sterile lubricating jelly alone with very slow, gentle technique.",
        note: "Keep to the lidocaine maximum of 5 mg/kg; 10 mL of 2 % is 200 mg, which is fine for an adult but not for a child. Do NOT use petroleum jelly or Vaseline — it degrades latex catheters and it is not sterile. Do not catheterise an awake man with no lubricant at all: it is the shortest route to a stricture."
      },
      {
        item: "A closed drainage bag",
        substitute: "A clean covered bottle or jerrycan with the catheter running into it through a short length of sterile tubing, kept below the bladder and never lifted.",
        note: "This is a real downgrade and the patient will probably get infected, so it buys you days, not weeks. Asella's OR materials list carries urine bags as a separate line item for almost every case, which tells you how routinely they are needed and how routinely they run short. If you are improvising, cut the catheter duration ruthlessly and do not break the connection to empty — empty the bottle."
      },
      {
        item: "A coudé-tip catheter for an enlarged prostate",
        substitute: "A larger straight catheter, 16–18F, passed slowly with plenty of gel and the penis lifted then lowered at the sphincter.",
        note: "What you must not substitute is force, a stylet, a guidewire, or an introducer you improvised. Those make false passages. Two gentle attempts by the most experienced person present, then suprapubic."
      },
      {
        item: "A three-way catheter for clot retention",
        substitute: "A large two-way catheter (20–22F), with manual washout using a 50–60 mL bladder syringe and warm sterile saline, repeated until the returns are clear.",
        note: "Workable, but it ties up a person for an hour and it will clot again overnight. Do not try to manage heavy clot retention with a 16F two-way catheter — it blocks, the bladder distends, and the bleeding gets worse. If the bleeding needs continuous irrigation and you have no three-way catheter, that is a reason to transfer."
      },
      {
        item: "Sterile gloves and a sterile field",
        substitute: "Clean gloves, meticulous hand hygiene, a clean field and a catheter handled only by its sleeve.",
        note: "Clean intermittent catheterisation is done non-sterile every day and does not cause disaster. A first-time indwelling catheter in a sick inpatient is different — get sterile gloves. If you genuinely cannot, do not then leave the catheter in for days."
      },
      {
        item: "Ability to measure urine output",
        substitute: "Any marked container, or a container you have calibrated once with a syringe and marked with tape.",
        note: "If you cannot measure it, the main reason you put the catheter in has gone. Reconsider whether it should be in at all."
      },
      {
        item: "Someone who can reduce a paraphimosis",
        substitute: "None, and this is why the foreskin rule matters.",
        note: "Replacing the foreskin at the end of the procedure costs two seconds. Do it every time, write it in the notes, and tell the ward to check it."
      }
    ],
    redflags: [
      "Blood at the meatus, perineal or scrotal bruising, a high-riding prostate, or a pelvic fracture with retention — do not pass a urethral catheter. Suprapubic.",
      "Two gentle attempts have failed. Stop. Each further attempt makes a false passage and takes the suprapubic option further away.",
      "Pain as you inflate the balloon — deflate completely before you do anything else.",
      "The patient is anuric rather than retaining. A catheter will not fix renal failure and an empty bladder on catheterisation is a diagnosis, not a failure.",
      "Fever and rigors within an hour of catheterisation — bacteraemia. Blood cultures, antibiotics, resuscitate.",
      "Heavy haematuria with clot and you have no three-way catheter and no irrigation — arrange transfer early, not after the bladder has distended.",
      "A catheter that has been in for weeks with no documented reason. Taking it out is the intervention."
    ],
    caseIds: ["trauma", "septic-shock", "burns", "bowel-obstruction"],
    packIds: [],
    textbook: [
      {
        book: "asellaor",
        text: "A 16F two-way urinary catheter with a urine bag is listed as standard theatre equipment for adult laparotomy cases, including peritonitis from perforated peptic ulcer, adhesive small bowel obstruction, gangrenous sigmoid volvulus and stoma reversal.",
        ref: "Asella Referral and Teaching Hospital. List of OR Materials for Surgical cases, 2025 — per-operation materials lists"
      },
      {
        book: "asellaor",
        text: "For transvesical prostatectomy the list specifies a 24F three-way catheter and 18F three-way catheters, with two urine bags — larger bore and a third channel where irrigation is expected.",
        ref: "Asella Referral and Teaching Hospital. List of OR Materials for Surgical cases, 2025 — BPE (TVP)"
      }
    ],
    sources: [
      {
        name: "WHO. Surgical Care at the District Hospital, 2003 — urinary catheterisation and acute retention"
      },
      { name: "Primary Surgery, Volume 1: Non-trauma (ed. Maurice King) — the urinary tract" },
      { name: "Schwartz's Principles of Surgery — urology" },
      {
        name: "Note: Asella's OR materials list (2025) is cited here for catheter sizes and the urine bag only. All technique in this guide is standard practice and carries no citation."
      }
    ],
    review: { status: "draft", by: null, date: null }
  },
  {
    id: "suprapubic-catheter",
    name: "Suprapubic catheterisation (suprapubic cystostomy)",
    aka: ["SPC", "suprapubic cystostomy", "percutaneous cystostomy", "suprapubic tube"],
    summary: "A catheter placed through the lower abdominal wall directly into a distended bladder. It is the answer when the urethra cannot or must not be used: a stricture that will not pass, or a urethral injury in a pelvic fracture. It is safe when the bladder is full and palpable, and dangerous when it is not — a trocar into an empty pelvis finds bowel.",
    urgency: "both",
    anaesthesia: "Local infiltration with lidocaine, from skin down to and including the bladder wall. Add sedation only if you have someone to watch the airway. Open cystostomy is also comfortably done under local in a thin patient.",
    indications: [
      "Acute retention where a urethral catheter cannot be passed — usually stricture, bladder neck contracture or a very large prostate.",
      "Suspected or confirmed urethral injury: blood at the meatus, a straddle or pelvic fracture, perineal haematoma. Here it is the first choice, not a fallback.",
      "Urethral or perineal sepsis where passing a catheter would seed it, including Fournier's gangrene.",
      "Diversion after urethral or bladder neck surgery, or after repair of a urethral injury.",
      "Long-term bladder drainage where a urethral catheter has caused stricture, erosion or intolerable discomfort.",
      "To obtain urine in an infant where other methods have failed (suprapubic aspiration, a different and smaller procedure)."
    ],
    contraindications: [
      {
        item: "A bladder that is not distended, not palpable and cannot be confirmed by ultrasound or by needle aspiration of urine",
        absolute: true,
        note: "This is the one that kills. An undistended bladder sits behind the pubis and bowel lies in front of it. A blind trocar goes through bowel. If you cannot confirm a full bladder, do not puncture."
      },
      {
        item: "Known or suspected bladder cancer",
        absolute: false,
        note: "Risk of seeding the tract. Avoid if there is any alternative, and never do a blind trocar into a bladder with a known tumour."
      },
      {
        item: "Previous lower abdominal or pelvic surgery, or a lower midline scar",
        absolute: false,
        note: "Bowel may be adherent to the anterior bladder wall and will not be pushed aside by a full bladder. A blind trocar here is dangerous: do an open cystostomy under direct vision instead."
      },
      {
        item: "Coagulopathy or anticoagulation",
        absolute: false,
        note: "Relative. Correct what you can. The bladder bleeds and a haematoma in the space of Retzius is hard to control."
      },
      {
        item: "Pelvic irradiation or pelvic malignancy",
        absolute: false,
        note: "Relative. Tissue planes are fused and the bladder may be fixed and small. Open, under direct vision."
      },
      {
        item: "Orthopaedic metalwork across the pelvis, or an external fixator in the way",
        absolute: false,
        note: "Relative. Discuss with whoever is managing the fracture — the surgical approach may matter to them, and anterior pelvic plating is at risk of infection from a tract above it."
      },
      {
        item: "Gross obesity where the pubis and bladder cannot be palpated",
        absolute: false,
        note: "Relative but practically limiting. Without ultrasound you are guessing. Do not guess."
      }
    ],
    equipment: [
      {
        item: "Suprapubic catheter set with trocar or peel-away introducer",
        qty: "1",
        note: "If you have one. Check the catheter passes through the sheath before you start.",
        drugId: null
      },
      {
        item: "Foley catheter 16F",
        qty: "2",
        note: "To be placed through the trocar sheath, or through an open cystostomy. The balloon holds it in.",
        drugId: null
      },
      { item: "Urine drainage bag", qty: "2", note: "", drugId: null },
      {
        item: "Lidocaine 1 % or 2 %",
        qty: "20 mL",
        note: "Maximum 5 mg/kg plain, 7 mg/kg with adrenaline. Infiltrate all layers including the bladder wall.",
        drugId: "lidocaine"
      },
      {
        item: "Long 21G needle on a 10 mL syringe",
        qty: "2",
        note: "The most important instrument here. You use it to find urine before you commit anything larger.",
        drugId: null
      },
      { item: "Scalpel, No. 11 or No. 15 blade", qty: "1", note: "", drugId: null },
      {
        item: "Curved artery forceps, toothed forceps, scissors, needle holder, small retractors",
        qty: "1 set",
        note: "For an open cystostomy, which is what you will do if you have no trocar.",
        drugId: null
      },
      {
        item: "Absorbable suture 2/0 and 3/0 on a round needle",
        qty: "1 each",
        note: "For a purse-string or two-layer closure of the bladder around the tube in an open cystostomy.",
        drugId: null
      },
      {
        item: "Silk or nylon 2/0 on a cutting needle",
        qty: "1",
        note: "To anchor the tube to skin. Do this even when a balloon is holding it.",
        drugId: null
      },
      { item: "Antiseptic — povidone-iodine", qty: "1", note: "", drugId: "povidone-iodine" },
      { item: "Sterile gown, gloves, drape, gauze", qty: "1 set", note: "", drugId: null },
      {
        item: "Sterile water for the balloon",
        qty: "20 mL",
        note: "In a 10 mL syringe.",
        drugId: null
      },
      {
        item: "Ceftriaxone",
        qty: "1",
        note: "A single dose at the time of insertion is reasonable, particularly where the urine is already infected.",
        drugId: "ceftriaxone"
      },
      {
        item: "Metronidazole",
        qty: "1",
        note: "Add if there is perineal or scrotal sepsis.",
        drugId: "metronidazole"
      },
      {
        item: "Ultrasound machine",
        qty: "1",
        note: "If you have one, use it. Confirming a full bladder and the absence of bowel in the track is the single biggest safety gain available in this procedure.",
        drugId: null
      },
      {
        item: "Ringer's lactate, IV access",
        qty: "2 L",
        note: "Post-obstructive diuresis after relieving chronic retention can be litres.",
        drugId: "ringers-lactate"
      }
    ],
    steps: [
      {
        n: 1,
        title: "Prove the bladder is full",
        text: "Palpate and percuss a distended bladder above the pubis. Scan it if you have ultrasound. If you cannot be certain the bladder is full and reaching above the pubic bone, stop — do not proceed to a puncture. A bladder that is full displaces bowel upwards out of the way, and that displacement is the whole basis of the procedure's safety."
      },
      {
        n: 2,
        title: "Position and prepare",
        text: "Supine, flat, no head-up tilt. Shave only if necessary. Clean the lower abdomen from umbilicus to pubis widely with antiseptic and drape. Identify the upper border of the pubic symphysis with your finger through the drape."
      },
      {
        n: 3,
        title: "Mark the point",
        text: "In the midline, 2–4 cm above the upper border of the pubic symphysis — about two finger-breadths. Stay in the midline: lateral to it you meet the inferior epigastric vessels and the peritoneal reflection."
      },
      {
        n: 4,
        title: "Anaesthetise down to urine",
        text: "Infiltrate skin and subcutaneous tissue. Then advance the long 21G needle perpendicular to the skin, or angled slightly caudally towards the pelvis, aspirating as you go and injecting lidocaine ahead of the tip. Never angle the needle cranially — upward angulation is how you enter the peritoneum."
      },
      {
        n: 5,
        title: "Find urine first",
        text: "Keep advancing the fine needle, aspirating, until urine fills the syringe. That needle is now your map: note its direction and how deep it went. If you do not get urine, do not proceed. If you aspirate bowel content or faecal-smelling gas, stop, remove the needle, start antibiotics and get a surgeon."
      },
      {
        n: 6,
        title: "Incise",
        text: "A 1–1.5 cm transverse or vertical skin incision at the needle entry point, down through skin only."
      },
      {
        n: 7,
        title: "Trocar route — if you have a set",
        text: "Hold the trocar in the same direction and angle as the exploring needle. Advance with steady controlled pressure, not a thrust, supporting the shaft with your other hand to limit how far it can travel. There is a give as the bladder is entered and urine appears. Hold the sheath still, remove the trocar, pass the catheter through the sheath well into the bladder, then peel or withdraw the sheath."
      },
      {
        n: 8,
        title: "Open route — if you have no trocar, or any relative contraindication",
        text: "This is the safer operation and you should not feel it is second best. Deepen the incision through fat to the linea alba. Split the linea alba vertically in the midline. Sweep the extraperitoneal fat upwards off the anterior bladder wall with a finger or gauze — keep below the peritoneal reflection. Identify the bladder: it is pale, muscular and has visible vessels running over it, and your exploring needle confirms it."
      },
      {
        n: 9,
        title: "Open the bladder under vision",
        text: "Place two stay sutures in the bladder wall and lift between them. Place a purse-string suture, then open the bladder between the stays with a small stab. Urine comes out under pressure — have suction or gauze ready."
      },
      {
        n: 10,
        title: "Place the catheter",
        text: "Pass a 16F Foley well into the bladder, inflate the balloon with 10 mL of sterile water, and pull back gently so the balloon sits against the bladder dome. Tighten the purse-string around the tube, and close the bladder wall snugly against it with a second absorbable layer if you can. The aim is a watertight exit, because urine leaking into the space of Retzius causes a nasty extraperitoneal cellulitis."
      },
      {
        n: 11,
        title: "Secure and close",
        text: "Anchor the tube to the skin with a non-absorbable stitch, even though a balloon is holding it. Close the fascia loosely and the skin around the tube, leaving no dead space. Dress it flat so the tube does not kink at the skin."
      },
      {
        n: 12,
        title: "Drain and connect",
        text: "Connect to a closed bag below the bladder. Note the volume drained. Watch the patient for the next hours: post-obstructive diuresis and decompression haematuria both happen now."
      },
      {
        n: 13,
        title: "Document",
        text: "Why the urethral route was not used, which route you took, the size of the tube, the balloon volume, the volume of urine drained, and what the urine looked like. Add the plan: who will change this tube, when, and where."
      }
    ],
    landmarks: "Midline, 2–4 cm above the upper border of the pubic symphysis, through a bladder that is palpable above the pubis. Direction perpendicular to the skin or slightly caudal (towards the pelvis) — never cranial. The midline keeps you away from the inferior epigastric vessels. For an open approach, the linea alba is split in the midline and the extraperitoneal fat swept upwards off the bladder dome, staying below the peritoneal reflection.",
    sizes: [
      {
        who: "Adult, initial placement",
        size: "14–16F",
        note: "Big enough to drain and not to block. A 16F Foley is a reasonable default."
      },
      {
        who: "Adult, long-term",
        size: "16–18F",
        note: "A larger tube blocks less often with debris. Changing to a slightly larger size at the first change is common practice."
      },
      { who: "Haematuria or debris expected", size: "18–20F", note: "" },
      {
        who: "Child",
        size: "Specialist",
        note: "Suprapubic cystostomy in a child should be done by someone who does it. If a child cannot be catheterised per urethra, that is usually a reason to transfer rather than to improvise a trocar into a small pelvis."
      },
      {
        who: "Balloon volume",
        size: "10 mL",
        note: "The volume printed on the port. Do not over-inflate — a large balloon in the dome of the bladder is painful and causes spasm."
      }
    ],
    aftercare: [
      "Bag below the bladder, closed system, emptied through the tap.",
      "Watch urine output hourly for the first 12 hours. Post-obstructive diuresis after chronic retention can be several litres — replace with crystalloid, and check potassium and creatinine if you can.",
      "Expect some haematuria for the first day after decompressing a chronically distended bladder. Heavy or persistent bleeding is not expected.",
      "Check the exit site daily for leakage, cellulitis and the tube's depth. Urine tracking into the abdominal wall is the complication to catch early.",
      "Keep the dressing dry and the tube un-kinked, taped flat to the abdomen.",
      "Do not give continuing prophylactic antibiotics. A single dose at insertion, then treat infection if it happens.",
      "The first tube change is usually left for 4–6 weeks so the tract matures. Afterwards changes are typically every 6–12 weeks. Practice varies — confirm with your surgical department and write the plan in the notes.",
      "Teach the patient and the family: the tube must never be pulled on; if it comes out, the tract closes within hours and they must come back immediately, not tomorrow.",
      "If the patient has a urethral stricture or injury, make the follow-up plan explicit. A suprapubic catheter is drainage, not treatment, and people are lost to follow-up with a tube in for years."
    ],
    troubleshooting: [
      {
        problem: "No urine on the exploring needle",
        action: "Stop. The bladder is not where you think it is, or it is not full. Re-examine, re-percuss, scan if you can, and reconsider the diagnosis. Do not advance a trocar into a pelvis that has not given you urine."
      },
      {
        problem: "You aspirate bowel content or faecal-smelling gas",
        action: "Withdraw the needle. Give broad-spectrum antibiotics including metronidazole. Keep the patient nil by mouth, fluids, and get a surgeon or arrange transfer. A fine-needle puncture of bowel is often survivable; concealing it is not."
      },
      {
        problem: "Trocar in, but no urine",
        action: "You are not in the bladder, or the sheath has moved. Do not push further or fish around. Remove it, re-establish the direction with the fine needle, and if you cannot be sure, convert to an open cystostomy."
      },
      {
        problem: "Catheter drains, then stops within hours",
        action: "Blocked with clot or debris, or the balloon has pulled into the bladder wall or the tract. Flush gently with 20–30 mL of sterile saline and aspirate. Check the volume in the balloon. If the tube has migrated out, do not push it back in — the track is contaminated and the bladder wall may have separated."
      },
      {
        problem: "Urine leaking around the tube at the skin",
        action: "Usually the tube is blocked and the bladder is overflowing round it — check patency first. Otherwise the tract is wide or the balloon is not sitting against the bladder dome: pull back gently to seat the balloon, and consider a slightly larger tube at the next change. Persistent leakage macerates the skin fast, so dress it with a barrier."
      },
      {
        problem: "Tube has fallen out",
        action: "This is urgent. The tract closes within hours. Replace it immediately through the same tract with the same or slightly smaller size, using gentle steady pressure and aiming the way the old tube lay. If the tract has closed and you cannot re-enter, the patient needs the whole procedure again — so treat a dislodged suprapubic tube as an emergency, and say so to the ward."
      },
      {
        problem: "Spreading redness and tenderness around the site, with fever",
        action: "Extraperitoneal urine leak with cellulitis, or an abscess in the space of Retzius. Antibiotics, and surgical drainage — this does not settle on antibiotics alone. Check the tube is draining and not leaking alongside."
      },
      {
        problem: "Heavy haematuria after decompression",
        action: "Usually settles. Keep the tube draining — a blocked tube and a clot-filled bladder makes it worse. Flush gently, run fluids, and check haemoglobin. Persistent heavy bleeding needs irrigation and surgical review."
      },
      {
        problem: "Patient has huge urine output and is now hypotensive",
        action: "Post-obstructive diuresis. Replace volume with crystalloid, roughly matching output, and check potassium, sodium and creatinine. This is common after relieving chronic retention and it is missed because nobody is adding up the bag."
      }
    ],
    removal: {
      when: [
        "The urethral route has been restored — stricture dilated or repaired, urethral injury healed and confirmed patent — and the patient is voiding.",
        "A trial of clamping with successful urethral voiding, where that is the plan. Do not clamp a tube in a patient who cannot void: you are recreating retention.",
        "The tube is the source of sepsis or stones and the drainage route can be changed.",
        "Never remove it as a routine ward job in a patient with a stricture that has not been treated. The tube is the only thing emptying that bladder."
      ],
      how: [
        "Confirm the patient is voiding urethrally, with a measured residual if you can.",
        "Deflate the balloon fully and confirm you have withdrawn all the water that went in.",
        "Withdraw the tube steadily.",
        "Cover with a dry occlusive dressing. The tract leaks urine for a few days and then closes. Change the dressing as often as it needs and protect the skin.",
        "Review at a week. A tract that is still leaking after 7–10 days usually means the bladder is not emptying urethrally — reassess, do not just re-dress."
      ]
    },
    complications: {
      immediate: [
        "Bowel perforation — the serious one, and the reason the bladder must be full and palpable.",
        "Failure to enter the bladder.",
        "Bleeding from the bladder wall or from the abdominal wall vessels, with a haematoma in the space of Retzius.",
        "Intraperitoneal placement, with urine running into the peritoneal cavity.",
        "Decompression haematuria.",
        "Local anaesthetic toxicity if the dose was not calculated."
      ],
      early: [
        "Post-obstructive diuresis with dehydration, hypokalaemia and hypotension.",
        "Extraperitoneal urine leak, abdominal wall cellulitis and abscess.",
        "Tube dislodgement, with the tract closing within hours.",
        "Blockage with clot or debris.",
        "Urosepsis.",
        "Wound infection.",
        "Urine leaking around the tube, with skin maceration."
      ],
      late: [
        "Bladder stones on and around the tube.",
        "Tube encrustation and recurrent blockage.",
        "Chronic infection and persistent bacteriuria.",
        "Tract granuloma and bleeding.",
        "A small, contracted bladder after long-term free drainage.",
        "Persistent cutaneous fistula after removal.",
        "Loss to follow-up with a tube left in for years because nobody wrote the plan down."
      ]
    },
    missing: [
      {
        item: "A suprapubic catheter set with a trocar",
        substitute: "Open cystostomy under local anaesthesia, placing a 16F Foley through the bladder dome with a purse-string closure.",
        note: "This is the right answer, not a compromise. The open route is slower and needs a little more kit, and it is safer: you see the bladder, you see that bowel is not in the way, and you close the bladder around the tube so it does not leak. In a district hospital without ultrasound, an open cystostomy under local is usually the better operation even when a trocar is available."
      },
      {
        item: "A purpose-made suprapubic catheter",
        substitute: "A standard 16F Foley catheter, placed open or through a peel-away sheath.",
        note: "Entirely acceptable, and it is what most suprapubic tubes in district practice are. The balloon is what retains it. Add a skin stitch anyway — balloons deflate."
      },
      {
        item: "Any balloon-retained catheter",
        substitute: "A large-bore sterile tube — Asella's OR materials list uses an 18F nasogastric tube with a urine bag as its abdominal drainage tube, and that combination will drain a bladder — anchored with a non-absorbable stitch through the skin and a tie around the tube.",
        note: "This is a short-term bridge only, and the weakness is obvious: nothing inside the bladder holds it. The moment it slides out, the tract closes and you are back where you started, with a distended bladder and no route in. If this is all you have, stitch it properly, tape it, write the warning in the notes, and make finding a Foley the job of the night."
      },
      {
        item: "Ultrasound",
        substitute: "Palpation and percussion of the distended bladder, and a long fine needle that returns urine before anything larger is advanced.",
        note: "This is how it was done for decades and it is adequate — provided the bladder is genuinely palpable. The needle is not optional in this situation: it is your imaging. What ultrasound adds, and what nothing else replaces, is confidence in a patient with a midline scar or obesity. If the bladder is not palpable AND you have no ultrasound, there is no safe substitute: do not puncture."
      },
      {
        item: "Any way to confirm a full bladder",
        substitute: "None.",
        note: "Say it plainly. A blind suprapubic trocar into a bladder you cannot feel will go through bowel, and the patient will die of faecal peritonitis several days later in a hospital that cannot fix it. If the bladder is not full and not palpable and not visible on scan, the procedure must not start. Re-examine the diagnosis instead: an anuric patient in renal failure has no urine to drain."
      },
      {
        item: "Absorbable suture for the bladder purse-string",
        substitute: "Chromic catgut 2/0 or 3/0 on a round needle.",
        note: "Adequate. Do not use non-absorbable suture inside the bladder — it becomes a nucleus for a stone. If you have only non-absorbable, place it extravesically in the muscle wall and do not take it through the mucosa."
      },
      {
        item: "A urine bag",
        substitute: "A clean covered container below the level of the bladder, connected with sterile tubing.",
        note: "Keep it below the bladder and do not lift it. Measure and record. Break the connection as little as possible: an open suprapubic tract plus an open system is a direct route to urosepsis."
      },
      {
        item: "A surgeon, if you perforate bowel",
        substitute: "None, and this is the calculation to make before you start.",
        note: "Before you advance a trocar, know whether a laparotomy could happen in your hospital tonight. If it could not, that is a strong argument for the open route — or for transfer with a urethral attempt made by the most experienced person available, if the urethra is not injured."
      },
      {
        item: "A plan for who changes the tube and when",
        substitute: "None.",
        note: "A suprapubic catheter is a long-term device and the commonest late complication in district practice is simple abandonment. Write in the notes: first change at 4–6 weeks, by whom, where; and what the patient must do if it falls out. Tell the family, not only the patient."
      }
    ],
    redflags: [
      "The bladder is not palpable and you have no ultrasound. Do not puncture. There is no safe version of this.",
      "A lower midline scar or previous pelvic surgery. Do not use a blind trocar — open, under direct vision.",
      "Your exploring needle did not return urine. Stop.",
      "You aspirated bowel content. Stop, antibiotics, surgical help, be honest in the notes.",
      "The patient is anuric, not retaining. Draining an empty bladder will not help renal failure and the puncture still carries its risk.",
      "Known bladder cancer — avoid the tract if there is any alternative.",
      "A suprapubic tube has fallen out. This is an emergency, not a morning job — the tract closes in hours.",
      "You have placed the tube and the patient now has spreading lower abdominal cellulitis — extraperitoneal urine leak. Surgical drainage, not antibiotics alone."
    ],
    caseIds: ["trauma"],
    packIds: [],
    textbook: [
      {
        book: "asellaor",
        text: "Where an abdominal drainage tube is required the list specifies an 18F nasogastric tube with a urine bag and silk 2/0 on a cutting needle — documented institutional practice of using an NGT plus a urine bag as a drain.",
        ref: "Asella Referral and Teaching Hospital. List of OR Materials for Surgical cases, 2025 — drainage tube entries under open cholecystectomy, hydatid disease of liver, appendiceal abscess and generalized peritonitis"
      }
    ],
    sources: [
      {
        name: "WHO. Surgical Care at the District Hospital, 2003 — acute retention and suprapubic drainage"
      },
      { name: "Primary Surgery, Volume 1: Non-trauma (ed. Maurice King) — suprapubic cystostomy" },
      { name: "Schwartz's Principles of Surgery — urology, lower urinary tract trauma" },
      {
        name: "Note: the Asella Referral and Teaching Hospital OR materials list (2025) does not cover suprapubic cystostomy. It is cited only for the nasogastric-tube-and-urine-bag drain combination. Nothing else here is attributed to it."
      }
    ],
    review: { status: "draft", by: null, date: null }
  },
  {
    id: "tracheostomy",
    name: "Tracheostomy (open surgical)",
    aka: ["tracheotomy", "surgical airway", "trach"],
    summary: "An opening made in the anterior trachea with a tube placed through it, bypassing everything above. It is for upper airway obstruction that cannot be relieved any other way, for a patient who will need an artificial airway for weeks, and for clearing secretions a patient cannot clear. It is not the emergency surgical airway: in a crash, a cricothyroidotomy is faster and safer. A tracheostomy also commits the ward to suction, humidification and a spare tube at the bedside, every hour of every night.",
    urgency: "both",
    anaesthesia: "GA with a cuffed oral tube where the airway allows it — this is much the safest. Where intubation is impossible, local infiltration with lidocaine, awake, sitting up, with the most experienced operator available.",
    indications: [
      "Upper airway obstruction that cannot be bypassed from above: laryngeal tumour, trauma, burn, infection, bilateral vocal cord palsy, a foreign body that cannot be removed.",
      "Functional airway obstruction and loss of airway protection: tetanus with laryngeal spasm, bulbar weakness, Guillain-Barré syndrome.",
      "Failed or impossible orotracheal intubation where a longer-term airway is needed — midface trauma, severe facial burn, a fixed difficult airway.",
      "Expected prolonged ventilation: most units convert from an oral tube between about 7 and 14 days, though timing is actively debated. Confirm with your anaesthetic and surgical departments.",
      "Pulmonary toilet in a patient who cannot clear secretions, where repeated suction through the nose or mouth is failing.",
      "Planned, as part of major maxillofacial or laryngeal surgery."
    ],
    contraindications: [
      {
        item: "No suction available, continuously, day and night",
        absolute: true,
        note: "A tracheostomy tube is a tube that must be suctioned. Without suction it plugs with mucus and the patient dies of an airway you created. If suction cannot be guaranteed for every shift, do not make a tracheostomy."
      },
      {
        item: "No spare tube, no tracheal dilator or substitute, and nobody taught to use them at the bedside",
        absolute: true,
        note: "The tube will block or come out, usually at night. If there is nothing at the bedside to reopen the airway, the stoma is a trap."
      },
      {
        item: "This is a crash airway in an adult who cannot be oxygenated now",
        absolute: true,
        note: "Not a contraindication to a surgical airway — a contraindication to this operation. Do a cricothyroidotomy: the cricothyroid membrane is superficial, bloodless and quick. Tracheostomy in a hypoxic struggling patient is a bloody dissection in a moving field."
      },
      {
        item: "Uncorrectable bleeding diathesis",
        absolute: false,
        note: "Relative and serious. The thyroid isthmus and anterior jugular veins bleed. Correct what you can, and operate in theatre with light and suction and an assistant, never on the ward."
      },
      {
        item: "Gross distortion of the neck — large haematoma, massive goitre, tumour crossing the midline",
        absolute: false,
        note: "Relative. The landmarks are gone and the trachea may be displaced. If you cannot feel the cricoid and the sternal notch, you do not know where the trachea is."
      },
      {
        item: "Infection in the soft tissues of the neck",
        absolute: false,
        note: "Relative. You will seed the mediastinum. If the airway demands it, proceed and accept the risk — but say so in the notes."
      },
      {
        item: "Unstable cervical spine",
        absolute: false,
        note: "Relative. The neck cannot be extended. Keep the collar on behind, have a named person holding the head, and accept a harder operation. Do not extend the neck to make your life easier."
      },
      {
        item: "Short, thick neck in which the cricoid cannot be palpated",
        absolute: false,
        note: "Relative but practically limiting. Consider whether this patient needs a more experienced operator, in theatre, with an oral tube in place first."
      },
      {
        item: "A child",
        absolute: false,
        note: "Open surgical tracheostomy IS the paediatric technique and it is done in children — what is not for children is percutaneous dilatational tracheostomy, and the surgical cricothyroidotomy. A paediatric tracheostomy in a hospital with no ENT surgeon and no continuous nursing is a last resort: the tube is tiny, it blocks in minutes, and it needs someone awake beside the child."
      }
    ],
    equipment: [
      {
        item: "Tracheostomy tube, correct size, plus one size above and one below, opened and checked",
        qty: "3",
        note: "Check the cuff holds air and the obturator and inner cannula fit before anything is cut.",
        drugId: null
      },
      {
        item: "Working suction with rigid and soft catheters",
        qty: "1 set",
        note: "Tested before you start. This is not optional equipment.",
        drugId: null
      },
      {
        item: "Oxygen with a means of delivering it to a tracheostomy",
        qty: "1",
        note: "A tracheostomy mask, or a paediatric mask held over the stoma, or a T-piece.",
        drugId: "oxygen"
      },
      {
        item: "Self-inflating bag with a 15 mm connector",
        qty: "1",
        note: "To ventilate through the tube once it is in, and to confirm it works.",
        drugId: null
      },
      { item: "Scalpel, No. 15 and No. 10 or 23 blades", qty: "2", note: "", drugId: null },
      {
        item: "Tracheal hook (single, sharp) and tracheal dilator",
        qty: "1 each",
        note: "The hook lifts and steadies the trachea. The dilator holds the opening while the tube goes in, and then stays at the bedside.",
        drugId: null
      },
      {
        item: "Self-retaining or hand-held retractors",
        qty: "2",
        note: "Langenbeck or small Deaver. You need the field held open and still.",
        drugId: null
      },
      {
        item: "Artery forceps, fine and curved",
        qty: "6",
        note: "The anterior jugular veins and the thyroid isthmus will need clamping.",
        drugId: null
      },
      {
        item: "Needle holder, scissors, toothed and non-toothed forceps",
        qty: "1 each",
        note: "",
        drugId: null
      },
      {
        item: "Lidocaine 1 % or 2 %, with adrenaline if available",
        qty: "20 mL",
        note: "Maximum 5 mg/kg plain, 7 mg/kg with adrenaline. Adrenaline in the skin and strap muscles reduces troublesome venous ooze. Also instil a little into the tracheal lumen before you open it, to blunt the cough.",
        drugId: "lidocaine"
      },
      {
        item: "Ketamine",
        qty: "1",
        note: "Where GA is not possible and sedation is needed. Ketamine preserves respiratory drive better than most alternatives, but a partially obstructed airway can still be lost — have the most experienced person present.",
        drugId: "ketamine"
      },
      {
        item: "Atropine",
        qty: "1",
        note: "With ketamine. Also for the vagal bradycardia that tracheal manipulation can cause.",
        drugId: "atropine"
      },
      {
        item: "Adrenaline",
        qty: "1",
        note: "For resuscitation, and in the lidocaine if the preparation with adrenaline is not stocked.",
        drugId: "adrenaline"
      },
      {
        item: "Absorbable suture 3/0 on a round needle",
        qty: "1",
        note: "For stay sutures in the tracheal wall and for ligating the thyroid isthmus if it is divided.",
        drugId: null
      },
      {
        item: "Silk or nylon 2/0 on a cutting needle",
        qty: "2",
        note: "To stitch the flanges of the tube to the skin on both sides. Tapes alone are not enough in the first week.",
        drugId: null
      },
      {
        item: "Tracheostomy tapes or cotton ties",
        qty: "1",
        note: "Tied with the neck flexed, loose enough for one finger underneath.",
        drugId: null
      },
      {
        item: "Antiseptic — povidone-iodine",
        qty: "1",
        note: "Prepare from the chin to below the clavicles.",
        drugId: "povidone-iodine"
      },
      {
        item: "Sterile drapes, gown, gloves, mask, eye protection",
        qty: "1 set",
        note: "",
        drugId: null
      },
      {
        item: "Syringes and 22G–25G needles",
        qty: "3",
        note: "Including a 5 mL syringe with saline, to confirm you are in the trachea by aspirating air bubbles.",
        drugId: null
      },
      {
        item: "A headlight or a good adjustable lamp",
        qty: "1",
        note: "This is a deep narrow hole. You cannot operate in a shadow.",
        drugId: null
      },
      {
        item: "Cloxacillin or ceftriaxone",
        qty: "1",
        note: "A single dose covering skin flora 30–60 minutes before the incision is reasonable for an elective tracheostomy. Continuing antibiotics because a tracheostomy is in place is not.",
        drugId: "cloxacillin"
      },
      {
        item: "Petroleum-jelly or iodine gauze",
        qty: "1",
        note: "Laid between the skin and the flange for the first day.",
        drugId: null
      }
    ],
    steps: [
      {
        n: 1,
        title: "Secure the airway from above if you can",
        text: "A cuffed oral tube, or at least a reliable airway and oxygen, turns this from a desperate procedure into a controlled one. If the patient can be intubated, intubate, then do the tracheostomy. If the patient is obstructing now and cannot be oxygenated, this is the wrong operation: do a cricothyroidotomy."
      },
      {
        n: 2,
        title: "Check your kit, out loud",
        text: "Suction working. Oxygen flowing. Bag with a 15 mm connector. The tube, with its cuff tested, its obturator in, and one size either side open. Tracheal dilator and hook on the trolley. Light positioned. Do not start until all of this is true."
      },
      {
        n: 3,
        title: "Position",
        text: "Supine with a sandbag or rolled towel under the shoulders so the neck extends and the trachea comes forward. Do not over-extend: it pulls the trachea up out of the neck and you end up making a stoma too low, near the innominate artery, and a tube that sits badly when the neck relaxes. With a cervical collar, leave the back of the collar on and have a named person hold the head."
      },
      {
        n: 4,
        title: "Find the landmarks and mark them",
        text: "Palpate and mark the thyroid notch, the lower border of the thyroid cartilage, the cricoid cartilage, and the sternal notch. The cricoid is the one that matters: it is the firm complete ring just below the thyroid cartilage, and everything you do is referenced to it. If you cannot feel the cricoid, you do not know where the trachea is."
      },
      {
        n: 5,
        title: "Prepare, drape, infiltrate",
        text: "Antiseptic from chin to clavicles. Drape leaving the landmarks exposed. Infiltrate the midline skin and the deeper tissues with lidocaine, with adrenaline if you have it."
      },
      {
        n: 6,
        title: "Incise",
        text: "A 3–4 cm vertical midline incision from just below the cricoid towards the sternal notch, or a transverse incision about 2 cm below the cricoid. Vertical gives faster access with less bleeding and works for both emergency and elective; transverse heals more neatly. Through skin and subcutaneous fat only."
      },
      {
        n: 7,
        title: "Stay in the midline",
        text: "Everything from here is midline dissection. Divide the fat, identify and either retract or clamp and divide the anterior jugular veins. Find the midline raphe between the strap muscles and separate them vertically, retracting them laterally. Keep correcting yourself back to the midline — drifting laterally is how the carotid sheath gets found."
      },
      {
        n: 8,
        title: "Deal with the thyroid isthmus",
        text: "The isthmus crosses the trachea at about the second to fourth ring. Retract it upwards if it is thin and mobile. If it is in the way, clamp it between forceps, divide it, and suture-ligate both cut edges properly — an isthmus that is divided and not ligated bleeds into the airway later, which is a different and much worse problem."
      },
      {
        n: 9,
        title: "Identify the trachea and confirm it",
        text: "Clear the pretracheal fascia to expose the rings. Count them down from the cricoid by feel. Confirm with a 22G needle on a saline-filled syringe: aspirate, and free air bubbles confirm you are in the tracheal lumen. Do this — a stoma made into the oesophagus or into pretracheal tissue is a catastrophe discovered minutes later."
      },
      {
        n: 10,
        title: "Place stay sutures",
        text: "Put a 3/0 absorbable stay suture through the tracheal wall on each side of your intended opening and leave the ends long. If the tube comes out in the first days, traction on these sutures opens the stoma and lets you get back in. In a child this is not optional."
      },
      {
        n: 11,
        title: "Open the trachea",
        text: "Between the second and third, or third and fourth ring. Never the first ring and never the cricoid — damage there causes subglottic stenosis. Never lower than the fourth, where the innominate artery lies. Steady the trachea with the hook, warn the anaesthetist, instil a little lidocaine into the lumen, then make a vertical midline incision through one or two rings, or excise a small window. Keep to the midline: the tracheal blood supply enters at roughly the 3 and 9 o'clock positions."
      },
      {
        n: 12,
        title: "Suction and insert",
        text: "Suction blood and secretions out of the lumen. With the oral tube withdrawn under direction, insert the tracheostomy tube with its obturator, directing it backwards and then downwards along the line of the trachea. Remove the obturator at once and put in the inner cannula if it has one."
      },
      {
        n: 13,
        title: "Prove it is in the trachea",
        text: "Connect the bag and ventilate. You are looking for chest rise, equal breath sounds in both axillae, condensation in the tube, and return of exhaled volume. Capnography if you have it. If the chest does not rise, the tube is not in the trachea — take it out, ventilate from above, and start again. Do not accept 'it must be in'."
      },
      {
        n: 14,
        title: "Inflate the cuff and set the pressure",
        text: "Inflate with air to the minimum volume that stops a leak. Measure with a cuff manometer if you have one and keep it at 20–30 cmH2O — above that the tracheal mucosa is ischaemic. No manometer: inflate until the leak stops, then let a touch back out until a small leak returns at peak pressure."
      },
      {
        n: 15,
        title: "Fix it twice",
        text: "Stitch the flanges to the skin on both sides with silk or nylon. Then tie the tapes around the neck with the neck FLEXED, one finger loose. Tapes tied with the neck extended are loose the moment the patient sits up, and a tracheostomy tube that falls out in the first days is a very serious event."
      },
      {
        n: 16,
        title: "Do not close the skin tightly",
        text: "Leave the incision loose around the flange and lay a petroleum-jelly or iodine gauze between skin and flange. A tightly closed or packed skin wound forces air into the tissues and produces surgical emphysema and pneumomediastinum. Only approximate the skin with a stitch or two if the incision is clearly too wide, and never tightly."
      },
      {
        n: 17,
        title: "Hand over properly",
        text: "Write down and say out loud: the tube type and size, the date of insertion, that the first tube change is not before about 5–7 days, where the spare tube and dilator are kept, and that the stay sutures are there and what they are for. Then watch the first suction done by the nurse who will be doing it all night."
      }
    ],
    landmarks: "Thyroid notch, lower border of the thyroid cartilage, cricoid cartilage, sternal notch — all marked before incising. The cricoid is the reference point: it is the firm complete ring immediately below the thyroid cartilage. Open the trachea between the second and third or third and fourth rings; never through the first ring or the cricoid (subglottic stenosis), and never below the fourth (innominate artery). Stay in the midline — tracheal blood supply enters at about 3 and 9 o'clock, and lateral drift finds the carotid sheath. For an emergency cricothyroidotomy instead: the cricothyroid membrane, the soft dip between the lower border of the thyroid cartilage and the cricoid ring.",
    sizes: [
      {
        who: "Adult woman",
        size: "7.0–8.0 mm internal diameter",
        note: "Some units routinely use 6.0–7.0. Read the internal diameter in millimetres off the flange — manufacturers number tubes differently and the number on the box is not always the ID."
      },
      {
        who: "Adult man",
        size: "8.0–9.0 mm internal diameter",
        note: "Confirm with your department which tubes your hospital actually stocks and how they are labelled."
      },
      {
        who: "Child over 1 year",
        size: "Match to the uncuffed oral tube that fits",
        note: "The uncuffed oral tube size for a child over 1 year is about (age in years ÷ 4) + 4 mm internal diameter. Choose a tracheostomy tube of that internal diameter or half a size smaller, uncuffed. Do not guess from age alone, and always open one size above and one below."
      },
      {
        who: "Neonate",
        size: "3.0–3.5 mm internal diameter, uncuffed",
        note: "Neonatal tracheostomy is a specialist procedure with a tiny margin for error."
      },
      {
        who: "Cuffed or uncuffed",
        size: "—",
        note: "Cuffed for an adult who needs ventilation or protection from aspiration. Uncuffed in young children — a cuff in a small trachea causes mucosal injury and subglottic stenosis."
      },
      {
        who: "Metal or PVC",
        size: "—",
        note: "Metal tubes have a removable inner cannula that can be taken out and cleaned, which is a real advantage where plugging is the main risk, but they are uncuffed and so do not protect against aspiration or allow positive pressure ventilation. PVC cuffed tubes do both, and block more readily with dried secretions. Choose for the reason the tracheostomy was made."
      },
      {
        who: "Cuff pressure",
        size: "20–30 cmH2O",
        note: "Measured with a manometer where available. Higher pressures cause tracheal mucosal ischaemia, and that is the road to tracheal stenosis and tracheo-oesophageal fistula."
      }
    ],
    aftercare: [
      "Suction when the patient needs it — noisy or bubbling breathing, visible secretions, rising work of breathing, a fall in saturation — not on a fixed clock. Over-suctioning damages mucosa, causes hypoxia and bradycardia, and provokes bleeding. In the first 24–48 hours needs are frequent because secretions are bloody.",
      "Suction with a sterile catheter, no suction on the way in, suction applied on withdrawal, each pass under about 10–15 seconds, with oxygen before and after.",
      "Humidify continuously. A tracheostomy bypasses the whole nose and throat, so inspired gas arrives cold and dry and secretions dry into a plug. Use a humidifier, a nebuliser, a heat-moisture exchanger, or a damp gauze bib kept wet over the tube.",
      "A few drops of normal saline down the tube every 2–3 hours loosens thick secretions. It is not a substitute for humidification.",
      "Keep cuff pressure at the minimum that seals, 20–30 cmH2O where you can measure it. Do not deflate the cuff on a routine schedule: it does not prevent mucosal necrosis and it lets pooled secretions into the lungs. Pressure control is the thing that prevents necrosis.",
      "A spare tube of the same size, a size smaller, a tracheal dilator and working suction stay AT THE BEDSIDE from the moment the tube goes in until it comes out. Check them on every shift and sign for them.",
      "Clean around the stoma and change the dressing at least daily and whenever soiled. Keep the skin dry.",
      "Clean the inner cannula, where there is one, several times a day. This is the single most effective thing against blockage.",
      "Do not change the outer tube before about 5–7 days. The tract is not formed and a new tube can go into the pretracheal tissue instead of the trachea.",
      "Chest physiotherapy, sitting up, and encouragement to cough. The tube does not clear the chest; the patient does.",
      "Communication: the patient cannot speak with a cuffed tube. Give them a board, a pen, or an agreed set of signs on day one. Being unable to call for help with a tube in your neck is terrifying.",
      "Record on every shift: secretion volume and character, suction frequency, cuff status, stoma appearance, and that the spare tube and dilator are present."
    ],
    troubleshooting: [
      {
        problem: "Sudden respiratory distress with a tracheostomy in place",
        action: "Work through it in order: is the tube blocked, is the tube displaced, is it the lungs, is it the equipment. Give oxygen to the face AND to the stoma. Remove the inner cannula and suction. If a suction catheter will not pass, the tube is blocked or displaced."
      },
      {
        problem: "Tube blocked",
        action: "Remove and clean the inner cannula first — that solves most of them. If there is no inner cannula, or it does not help, pass a suction catheter: if it will not pass, the outer tube must come out. Within the first 72 hours removing the outer tube loses the airway, so call for help and prepare to oxygenate and ventilate from above (mouth, with the stoma occluded) while you change it over the stay sutures or a suction catheter used as a guide."
      },
      {
        problem: "Tube displaced or fallen out, more than a week after insertion",
        action: "The tract is mature. Reinsert the same size with the obturator, directing backwards then downwards. If it will not go, use a size smaller. Confirm placement by ventilating and listening."
      },
      {
        problem: "Tube displaced or fallen out within the first 72 hours",
        action: "An emergency. Oxygenate the patient first: bag-mask ventilation via the mouth and nose with a finger or gauze occluding the stoma usually works. Pull on the stay sutures to open the stoma. Pass a suction catheter into the trachea and railroad the tube over it, or use the tracheal dilator. Do not push a tube blindly into the neck — a false passage in front of the trachea ventilates the mediastinum and kills quickly. If you cannot re-establish the stoma, intubate orally."
      },
      {
        problem: "Surgical emphysema spreading in the neck and face",
        action: "Usually because the skin was closed or packed too tightly around the tube, or the tube is partly out of the trachea. Open the wound edges, release any packing, and confirm the tube position by ventilating and listening. Usually settles over days. If it is progressing fast, suspect pneumothorax or pneumomediastinum and get a film."
      },
      {
        problem: "Bleeding from the stoma in the first day",
        action: "Most is from the wound edge or a small vessel. Pack the wound edges gently, press, and look with light and suction. Do not pack around a tube so tightly that you cause emphysema. Bright arterial bleeding needs the wound explored, usually an unligated isthmus edge."
      },
      {
        problem: "Brisk bleeding from the stoma after the first week, especially after a herald bleed",
        action: "Suspect a tracheo-innominate artery fistula. This kills in minutes. Over-inflate the cuff to tamponade. If that fails, remove the tube, put a finger through the stoma and press the artery forwards against the back of the sternum, and intubate orally from above. Get to theatre. This is rare and it is the reason the stoma is never made below the fourth ring."
      },
      {
        problem: "Aspiration, coughing on feeds, recurrent pneumonia",
        action: "Check cuff pressure and position. Consider a tracheo-oesophageal fistula, which is a late complication of an over-inflated cuff. Sit the patient up for feeds, and reassess swallowing."
      },
      {
        problem: "Stoma site infected, with purulent discharge",
        action: "Clean more often, change the dressing more often, and swab. Topical antiseptics round the stoma, systemic antibiotics only if there is cellulitis or systemic signs. Loosen a tight wound."
      },
      {
        problem: "Tube seems too long or too short — persistent cough, or one-sided breath sounds",
        action: "A tube whose tip is against the carina causes relentless coughing; one in a bronchus gives one-sided air entry. A tube too short pulls out of the trachea when the neck moves. Change to a better-fitting tube, and do not solve the problem by tightening the tapes."
      }
    ],
    removal: {
      when: [
        "The reason for it has resolved: the upper airway is patent, the patient can protect it, and secretions are manageable.",
        "Awake, able to cough effectively, swallowing safely, breathing comfortably with the cuff down.",
        "Adult: occlude or cap the tube and see whether the patient tolerates it for about 24 hours, breathing around a deflated cuff. If they do, remove it. Use a smaller tube first if a full-size tube occluded leaves too little room to breathe around.",
        "Child: usually by stepping down through smaller tube sizes before capping, and the decision and the decannulation belong with someone experienced. An infant or small child should be decannulated where the airway can be re-secured — in theatre.",
        "Not during an acute illness, and not on a Friday night. The commonest decannulation disaster is doing it when the person who can re-secure the airway has gone home."
      ],
      how: [
        "Have everything you would need to reinsert a tube or intubate at the bedside before you take it out.",
        "Explain it, sit the patient up, suction the airway and the mouth.",
        "Deflate the cuff fully. Remove the tube steadily on expiration.",
        "Clean the stoma and cover it with a dry occlusive dressing. Teach the patient to press over the dressing when they cough or speak for the first days.",
        "Watch closely for several hours: stridor, rising work of breathing, falling saturation. Keep a tube and the dilator at the bedside for 24 hours at least.",
        "The stoma closes by itself, usually within 1–2 weeks. Change the dressing as it needs it.",
        "A stoma that is still open after several weeks is a persistent tracheocutaneous fistula and needs surgical closure. Say so in the follow-up plan rather than leaving the patient to discover it."
      ]
    },
    complications: {
      immediate: [
        "Loss of the airway during the procedure — the reason to secure it from above first wherever possible.",
        "Tube placed in the pretracheal tissue instead of the trachea, ventilating the mediastinum.",
        "Bleeding from the thyroid isthmus or the anterior jugular veins, into the wound and into the airway.",
        "Perforation of the posterior tracheal wall, and oesophageal injury.",
        "Injury to the recurrent laryngeal nerve, the carotid sheath or the apical pleura.",
        "Pneumothorax and pneumomediastinum.",
        "Stoma made too high, through the first ring or the cricoid, or too low near the innominate artery.",
        "Cardiac arrest from hypoxia in a patient who was already exhausted."
      ],
      early: [
        "Tube blockage with secretions or clot — the commonest cause of death in a tracheostomy patient, and preventable with suction, humidification and inner cannula care.",
        "Accidental decannulation, especially in the first 72 hours before the tract has formed.",
        "Surgical emphysema from a wound closed or packed too tightly.",
        "Wound and stoma infection.",
        "Pneumonia from loss of airway defences and from aspiration.",
        "Haematoma in the neck.",
        "Swallowing difficulty and aspiration of feeds.",
        "Inability to communicate, and the distress that comes with it."
      ],
      late: [
        "Tracheal stenosis from an over-inflated cuff or a stoma made too high.",
        "Subglottic stenosis, particularly where the first ring or cricoid was damaged.",
        "Tracheomalacia at the cuff or tube tip.",
        "Tracheo-oesophageal fistula from cuff pressure against the posterior wall.",
        "Tracheo-innominate artery fistula — rare, and usually fatal.",
        "Granulation tissue at the stoma or at the tube tip, causing bleeding and obstruction.",
        "Persistent tracheocutaneous fistula after decannulation.",
        "Difficult decannulation.",
        "Scarring and keloid at the stoma site."
      ]
    },
    missing: [
      {
        item: "A tracheostomy tube",
        substitute: "A cuffed endotracheal tube, cut short, placed through the tracheostomy and secured very carefully.",
        note: "This is the standard and accepted substitute and it does work. The dangers are specific and you must plan for them. An ETT is long and flexible, so the tip can sit against the carina or slip into the right main bronchus — measure, mark the tube at the skin, and confirm equal breath sounds. It has no flange, so it cannot be stitched in the usual way: tie it securely and stitch through the tube wall or a tape collar. It has no inner cannula, so it cannot be cleaned out and will block sooner, which means more suction and more humidification, not less. Cut it so a connector still fits and never cut off the end with the cuff inflation line. Write on the chart that this is an ETT in a stoma so the next person is not surprised."
      },
      {
        item: "A cuffed tube, when the patient needs ventilation",
        substitute: "None, for positive pressure ventilation.",
        note: "An uncuffed tube leaks and you cannot reliably ventilate through it. If the indication is ventilation and you have only uncuffed tubes, you cannot meet the indication — say that out loud before you operate rather than afterwards."
      },
      {
        item: "An uncuffed tube, for a young child",
        substitute: "Do not substitute a cuffed adult tube.",
        note: "A cuff in a small trachea causes mucosal ischaemia and subglottic stenosis, and a child may be left with a lifelong airway. If you have no appropriately sized uncuffed tube for a child, that is a reason to transfer rather than to improvise."
      },
      {
        item: "Working suction",
        substitute: "None.",
        note: "This is the hardest line in this guide and it is the most important. A tracheostomy without suction is a tube that will plug, and the patient will die of obstruction with a surgical airway in place. A foot pump or a hand-operated suction device is acceptable. A syringe with a soft catheter will get you through one emergency and will not get you through a night. If suction cannot be guaranteed on every shift, do not make the tracheostomy — manage the airway another way, or transfer."
      },
      {
        item: "A humidifier",
        substitute: "A gauze bib kept damp over the stoma, a few drops of normal saline down the tube every 2–3 hours, a nebuliser with saline, and a kettle kept boiling in a well-ventilated room to raise room humidity.",
        note: "These are the classic improvisations and they are reasonable. The damp gauze and the saline drops are the two that matter most. Keep the kettle away from the patient — scalds and a tipped kettle are real risks on a crowded ward. Dried secretions are the main cause of tube blockage, so this is not a comfort measure."
      },
      {
        item: "A tracheal dilator",
        substitute: "A pair of sturdy curved artery forceps, kept at the bedside with the spare tube, and stay sutures left long in the tracheal wall and taped to the chest.",
        note: "The stay sutures are the better answer and they cost nothing: pulling on them opens the stoma when a tube comes out in the first days. Place them in every tracheostomy and place them in every paediatric tracheostomy without exception. Label them on the dressing so nobody cuts them off."
      },
      {
        item: "A spare tube at the bedside",
        substitute: "None.",
        note: "If there is no second tube in the hospital, do not do an elective tracheostomy. For an emergency one, know before you finish where the next tube is coming from, and write in the notes that there is no spare, so the ward knows that oxygenating via the mouth with the stoma occluded is their plan if the tube comes out."
      },
      {
        item: "A full tracheostomy set — in a patient obstructing now",
        substitute: "Cricothyroidotomy, with a scalpel, a dilating instrument and a size 6.0 tube.",
        note: "For an adult who cannot be oxygenated, this is not an improvisation but the correct operation. The cricothyroid membrane is immediately under the skin, relatively bloodless, and easily found in the dip between the thyroid cartilage and the cricoid ring. In a child under about 12, do NOT do a surgical cricothyroidotomy: the landmarks are tiny and the cricoid is the narrowest point of the airway. Use needle cricothyroidotomy with a large cannula, oxygenate, and get help."
      },
      {
        item: "A cuff manometer",
        substitute: "Inflate to the minimum volume that just stops the leak, then let a little back out until a small leak returns at peak inflation.",
        note: "Acceptable. Pressure by feel is unreliable — a pilot balloon that feels firm is usually well above 30 cmH2O. Err on the side of a small leak. Do not adopt scheduled cuff deflation as a substitute: it does not protect the mucosa and it drops pooled secretions into the lung."
      },
      {
        item: "Nursing able to suction, humidify and check the spare tube on every shift",
        substitute: "None.",
        note: "A tracheostomy is a three-week commitment by the whole ward, not a procedure. Before you make one, name the nurses, teach them the suction, show them the spare tube and the dilator, and watch one suction done. If that is not possible, the honest answer is to find another way to manage the airway or to transfer, and to say so clearly in the notes."
      }
    ],
    redflags: [
      "The patient is obstructing and cannot be oxygenated now. Do not start a tracheostomy — cricothyroidotomy, or needle cricothyroidotomy in a child under about 12.",
      "You cannot palpate the cricoid cartilage. You do not know where the trachea is. Get a more experienced operator and an oral tube first.",
      "No working suction for every shift. Do not create the stoma.",
      "No spare tube and no tracheal dilator or stay sutures. Do not create the stoma electively.",
      "Your needle aspiration did not give air bubbles. You are not in the trachea. Stop and reorient.",
      "The chest does not rise when you ventilate the new tube. The tube is not in the trachea. Remove it, ventilate from above, start again.",
      "A small herald bleed from the stoma after the first week — suspect a tracheo-innominate fistula and prepare before the big bleed.",
      "Tube out within 72 hours of insertion. Oxygenate from above with the stoma occluded, pull the stay sutures, and never push a tube blindly into the neck.",
      "A child needing a tracheostomy in a hospital with no ENT surgeon and no continuous bedside nursing. Consider transfer before you operate, not after."
    ],
    caseIds: ["tetanus", "croup", "burns", "trauma"],
    packIds: [],
    textbook: [],
    sources: [
      {
        name: "WHO. Surgical Care at the District Hospital, 2003 — airway management and tracheostomy"
      },
      {
        name: "Primary Surgery, Volume 2: Trauma (ed. Maurice King) — the airway, tracheostomy and cricothyroidotomy"
      },
      { name: "Primary Trauma Care manual — surgical airway" },
      { name: "Schwartz's Principles of Surgery — airway management, head and neck" },
      {
        name: "Note: the Asella Referral and Teaching Hospital OR materials list (2025) does not cover tracheostomy. Nothing in this guide is attributed to it."
      }
    ],
    review: { status: "draft", by: null, date: null }
  },
  {
    id: "colostomy",
    name: "Colostomy (stoma formation and care)",
    aka: [
      "stoma",
      "end colostomy",
      "Hartmann's colostomy",
      "loop colostomy",
      "double-barrel colostomy",
      "transverse colostomy",
      "sigmoid colostomy"
    ],
    summary: "The colon brought out through the abdominal wall as a stoma, so that faeces leave through the abdomen instead of the anus. In this region the commonest reason is a gangrenous sigmoid volvulus resected as a Hartmann's procedure; the next commonest are colonic trauma and anorectal malformation. The operation is usually the easy part. Where it is placed, how it is matured, and whether the patient will ever get an appliance determine whether they live well with it.",
    urgency: "both",
    anaesthesia: "GA with relaxation, as part of a laparotomy. A planned trephine stoma in a thin patient can be done under spinal or even local infiltration, but if the abdomen must be explored, that is a GA.",
    indications: [
      "Gangrenous sigmoid volvulus: resection with an end colostomy (Hartmann's) rather than a primary anastomosis in an unstable or contaminated patient. This is the commonest indication in Ethiopian district practice.",
      "Colonic perforation or injury where an anastomosis would be unsafe — faecal peritonitis, delayed presentation, shock, malnutrition.",
      "Penetrating abdominal injury involving the colon.",
      "Obstructing left colonic or rectal cancer, for decompression or as part of resection.",
      "Diversion for a complex perineal or anorectal injury, or a high perineal tear, where the sphincter is intact but the wound must be kept clean.",
      "Diversion to protect a repair: rectovaginal, vesicocolic or other internal fistula repair.",
      "Anorectal malformation and Hirschsprung disease in children, as the first stage.",
      "Permanent: after abdominoperineal resection for low rectal cancer, after proctocolectomy, after total sphincter destruction, and for intractable faecal incontinence."
    ],
    contraindications: [
      {
        item: "No stoma appliance, and no realistic supply of appliances or improvised barrier for this patient",
        absolute: false,
        note: "Relative but decisive. A colostomy in a patient who will never get a bag means faecal soiling, excoriation and social isolation. If the alternative is an anastomosis that might be done safely, weigh it honestly, and if the stoma is unavoidable, start arranging supply on the day you make it."
      },
      {
        item: "Siting through a midline laparotomy wound or through the wound edge",
        absolute: true,
        note: "Not a contraindication to the stoma, but to that site. A stoma brought out through the laparotomy incision herniates, retracts, and no appliance will seal over a wound. Make a separate trephine through the rectus muscle."
      },
      {
        item: "Ascending or descending colon as the stoma segment",
        absolute: false,
        note: "They are retroperitoneal and fixed, so they will not reach the skin without tension — and a stoma under tension retracts and becomes ischaemic. Mobilise properly or choose transverse or sigmoid colon."
      },
      {
        item: "A stoma site over the costal margin, the iliac crest, the umbilicus, a scar or a skin crease",
        absolute: false,
        note: "Not an absolute rule but close to one in practice: no appliance will stick to an uneven surface, and the patient will leak continuously."
      }
    ],
    equipment: [
      {
        item: "Standard laparotomy set",
        qty: "1",
        note: "A colostomy is nearly always part of a laparotomy. Asella's list for gangrenous sigmoid volvulus — the operation at which most end colostomies here are made — is a GA case with ETT, relaxant, suction and extra saline for lavage.",
        drugId: null
      },
      { item: "Surgical blade No. 23 and No. 15", qty: "2", note: "", drugId: null },
      {
        item: "Absorbable suture 3/0 on a round needle",
        qty: "3",
        note: "For the mucocutaneous sutures that mature the stoma. Asella's lists for sigmoid volvulus and stoma reversal carry vicryl 3/0 round.",
        drugId: null
      },
      {
        item: "Absorbable suture 2/0 and No. 1 or No. 2 on a round needle",
        qty: "4",
        note: "2/0 for bowel and peritoneum; the heavier suture for the fascial closure of the laparotomy.",
        drugId: null
      },
      { item: "Absorbable suture 2/0 on a cutting needle", qty: "2", note: "Skin.", drugId: null },
      {
        item: "Stoma appliance, drainable, with a cut-to-fit flange",
        qty: "4",
        note: "Put the first one on in theatre, before the patient wakes up. A stoma left under a gauze dressing soils the wound within hours.",
        drugId: null
      },
      {
        item: "Stoma measuring guide, or a piece of card you cut to size",
        qty: "1",
        note: "",
        drugId: null
      },
      {
        item: "Skin barrier — zinc oxide ointment or barrier paste",
        qty: "1",
        note: "",
        drugId: null
      },
      {
        item: "Bridge rod for a loop colostomy",
        qty: "1",
        note: "A short rod or a length of sterile tubing passed through the mesenteric window to stop the loop retracting.",
        drugId: null
      },
      {
        item: "Ceftriaxone",
        qty: "2",
        note: "With metronidazole, from before the incision. Asella's lists for sigmoid volvulus, obstruction, peritonitis and stoma reversal all carry ceftriaxone plus metronidazole.",
        drugId: "ceftriaxone"
      },
      {
        item: "Metronidazole IV",
        qty: "2",
        note: "Anaerobic cover for colonic surgery.",
        drugId: "metronidazole"
      },
      {
        item: "Normal saline for lavage",
        qty: "4 L",
        note: "Asella's gangrenous sigmoid volvulus list adds 4 extra bags of saline specifically for lavage.",
        drugId: "normal-saline"
      },
      {
        item: "Ringer's lactate",
        qty: "3 L",
        note: "These patients arrive depleted, and a gangrenous volvulus with sepsis needs volume before induction.",
        drugId: "ringers-lactate"
      },
      {
        item: "Potassium chloride",
        qty: "1",
        note: "Replace once urine is flowing. Obstructed patients are potassium-depleted.",
        drugId: "potassium-chloride"
      },
      {
        item: "Nasogastric tube 16F or 18F",
        qty: "1",
        note: "Free drainage. Measure the aspirate.",
        drugId: null
      },
      {
        item: "Urinary catheter 16F with urine bag",
        qty: "1",
        note: "For hourly urine output. This combination is on Asella's list for every one of these operations.",
        drugId: null
      },
      {
        item: "Morphine, and paracetamol",
        qty: "1 each",
        note: "Regular paracetamol plus titrated morphine. A patient in pain does not sit up, cough or look at their stoma.",
        drugId: "morphine"
      },
      {
        item: "Blood: crossmatched or identified donors",
        qty: "2",
        note: "A gangrenous volvulus resection in an anaemic patient.",
        drugId: "blood-transfusion"
      }
    ],
    steps: [
      {
        n: 1,
        title: "Choose the site before the patient is asleep",
        text: "Mark it with the patient awake, sitting, standing and lying. Through the rectus abdominis, on the summit of the infraumbilical fat fold, at least 5 cm from the costal margin, the iliac crest, the umbilicus and any scar or deep crease, below the belt line, and somewhere the patient can see and reach with their own hands. This five-minute step determines whether an appliance will ever seal. A stoma sited by guesswork on an anaesthetised abdomen leaks for the rest of the patient's life."
      },
      {
        n: 2,
        title: "Know which stoma you are making, and why",
        text: "End (Hartmann's): proximal bowel out, distal end closed and left inside — the standard for a resected gangrenous sigmoid volvulus. Loop: a loop brought out and opened, two openings with continuity behind, easier to make and easier to reverse, but it does not divert completely. Double-barrel or spectacle: both ends brought out separately, for complete diversion, and for when the two ends will not reach the same hole. Decide before you open the abdominal wall, because the trephine differs."
      },
      {
        n: 3,
        title: "Resuscitate and get the antibiotics in",
        text: "Fluid, nasogastric decompression, urinary catheter, ceftriaxone and metronidazole before the incision. A gangrenous sigmoid volvulus with septic shock does not get better with a faster operation; it gets better with volume first."
      },
      {
        n: 4,
        title: "Do the abdominal part",
        text: "Laparotomy, deal with the pathology — untwist, resect, lavage. Lavage properly: a gangrenous volvulus contaminates, and Asella's own materials list sets aside extra saline for exactly this. Decide only now, with the bowel in your hand, whether the segment you have will reach the marked site without tension."
      },
      {
        n: 5,
        title: "Make the trephine",
        text: "At the marked site, excise a circular disc of skin about 2–2.5 cm across — roughly two finger-breadths, matched to the bowel. Divide the subcutaneous fat down to the anterior rectus sheath. Incise the sheath in a cruciate fashion, split the rectus muscle longitudinally rather than cutting across it, and open the posterior sheath and peritoneum. The opening should admit two fingers: tighter and the stoma obstructs or strangulates, looser and it prolapses or herniates."
      },
      {
        n: 6,
        title: "Bring the bowel out",
        text: "Deliver the bowel through the trephine without twisting it. Check the mesentery is not rotated and is not under tension, and that the marginal vessels are pulsatile and the serosa pink. Confirm the orientation out loud — a stoma twisted on its mesentery is the commonest cause of a colostomy that never works."
      },
      {
        n: 7,
        title: "Loop stoma: place the bridge",
        text: "If this is a loop, make a small window in the mesentery close to the bowel wall and pass a rod or a short length of sterile tubing through it, resting on the skin on each side, to stop the loop retracting. Secure it. Plan to remove it at about 5–7 days."
      },
      {
        n: 8,
        title: "Close the abdomen first",
        text: "Close the laparotomy fully and dress it BEFORE you open the bowel. Once the stoma is opened the field is contaminated and your abdominal wound will be too."
      },
      {
        n: 9,
        title: "Open and mature the stoma",
        text: "Open the bowel — transversely across the antimesenteric wall for a loop, or at the cut end for an end stoma. Suture the full thickness of the bowel edge to the dermis with interrupted 3/0 absorbable sutures, taking bowel wall and dermis and not epidermis. For a colostomy, a stoma that sits slightly proud of the skin, a few millimetres, gives an appliance something to seal around. Do not leave it flush and do not leave it buried in a hollow."
      },
      {
        n: 10,
        title: "Check it works before you leave theatre",
        text: "Put a gloved finger in: the lumen should admit a finger easily and the direction should be straight, not angled or kinked. Confirm the mucosa is pink, not dusky. A dark stoma on the table is ischaemic now and it will be necrotic tomorrow — take it down and redo it."
      },
      {
        n: 11,
        title: "Fit the appliance in theatre",
        text: "Measure the stoma, cut the flange to that size plus 2 mm, clean and dry the skin thoroughly, and apply the bag before the drapes come off. A bag applied in theatre on dry skin lasts days. A bag applied on day two over excoriated skin never sticks properly."
      },
      {
        n: 12,
        title: "Record the anatomy",
        text: "In the operation note, draw it: which segment, which limb is proximal, where the distal end is (closed inside, or brought out as a mucous fistula), whether a rod is in and when it comes out, and whether reversal is intended. The person who reverses this may never have met you, and an operation note that does not say which limb is which makes their job dangerous."
      }
    ],
    landmarks: "Stoma site: through the rectus abdominis, on the summit of the infraumbilical fat fold, at least 5 cm clear of the costal margin, iliac crest, umbilicus and any scar or crease, below the belt line, visible and reachable by the patient. Location tells you the segment: right or left upper quadrant means transverse colon; left lower quadrant means sigmoid; right lower quadrant is where an ileostomy sits. Transverse and sigmoid colon are mobile on their mesentery and reach the skin easily; the ascending and descending colon are retroperitoneal and fixed, and a stoma forced from them retracts.",
    sizes: [
      {
        who: "Trephine (skin disc)",
        size: "about 2–2.5 cm",
        note: "Roughly two finger-breadths, matched to the calibre of the bowel. A trephine that will not admit two fingers at the fascia will obstruct the stoma."
      },
      {
        who: "Spout height — colostomy",
        size: "a few millimetres proud of skin",
        note: "Slightly raised so the effluent goes into the bag, not under the flange. A colostomy does not need the long spout an ileostomy needs."
      },
      {
        who: "Appliance aperture",
        size: "stoma diameter + 2 mm",
        note: "Measure it at every bag change for the first weeks: the stoma shrinks as the oedema settles, and a flange cut for day one leaks by day ten."
      },
      {
        who: "Mucocutaneous suture",
        size: "3/0 absorbable, interrupted",
        note: "Asella's OR lists carry vicryl 3/0 round for sigmoid volvulus and stoma reversal."
      }
    ],
    aftercare: [
      "Expect function at about 48–72 hours as the ileus settles. Mucus comes first, then faeces.",
      "Look at the stoma every day for the first week and write down what you see: colour, whether it is above or below skin level, the skin around it, and the output. A dusky or black stoma is an emergency; a pink one with mucus is a healthy one.",
      "A colostomy made for a gangrenous volvulus belongs to a septic patient. Vital signs, urine output, conscious level and abdominal examination matter more in the first 48 hours than the stoma does.",
      "Appliance: empty when a third full, change every 2–4 days or whenever it leaks. Never patch a leaking flange with tape — take it off, clean, dry, re-measure, reapply.",
      "Skin care with plain warm water and a cloth. No soap, no antiseptic, no spirit — they strip the skin and stop the flange sticking. Dry completely before the new bag.",
      "Protect the skin with a barrier: zinc oxide ointment or barrier paste in a thin film, wiped off the area the flange must stick to.",
      "Remove a loop colostomy rod at about 5–7 days.",
      "Diet: normal food, reintroduced as the ileus settles. Colostomy output is formed or semi-formed and does not usually cause the fluid problems an ileostomy does.",
      "Teach the patient and one family member to change the bag themselves before discharge, with their own hands, while you watch. Give them spare appliances and tell them where the next ones come from.",
      "Discuss it honestly: the stoma, whether it is temporary, roughly when reversal might be considered, and that it can be concealed under clothing. Depression after stoma formation is common and under-recognised.",
      "Before discharge, write in the notes and on the patient's card: which segment, which limb, whether reversal is planned, and the date of the follow-up appointment."
    ],
    troubleshooting: [
      {
        problem: "Stoma dusky, dark or black in the first 48 hours",
        action: "Assess how deep the ischaemia goes: pass a lubricated test tube or a clear tube into the lumen with a light and look. Mucosal darkening above the fascia may be survivable and will slough. Darkness extending below the fascia means the bowel is dead inside the abdomen, and that is a laparotomy today, not tomorrow. Do not wait to see what happens."
      },
      {
        problem: "Stoma not working by day 2 or 3 — no mucus, no flatus, no faeces",
        action: "Pass a gloved finger into the stoma: you are feeling for a twist, a tight fascial ring, or a stoma that has angled off. Gentle digital stimulation often starts it. Then think about ileus from sepsis, obstruction from a twisted mesentery, retraction and fascial tightening. A distended tender abdomen with a non-functioning stoma means re-operation."
      },
      {
        problem: "Stoma retracted below skin level",
        action: "The effluent now goes under the flange and the skin burns. Use a convex appliance if you have one, build the surrounding skin up with barrier paste, and change more often. Severe retraction with leakage or obstruction needs surgical revision."
      },
      {
        problem: "Stoma prolapsed",
        action: "Commonest with a loop stoma. Lie the patient flat, which reduces intra-abdominal pressure, and reduce it with gentle sustained pressure. Where the prolapsed bowel is oedematous, sprinkling plain table sugar on the mucosa for 10–20 minutes is widely used to draw out the oedema osmotically before reduction; the evidence for it is case reports rather than trials, but it is harmless and worth trying. An irreducible prolapse, or one that is dusky, needs surgery."
      },
      {
        problem: "Parastomal skin red, raw and weeping",
        action: "Almost always effluent getting under a badly fitting flange, not infection. Re-measure the stoma — it has probably shrunk. Cut the aperture to size plus 2 mm. Clean with water only, dry completely, apply barrier paste to the raw skin, and change the bag more often. If the appearance is satellite spots and itch, treat as candida."
      },
      {
        problem: "Appliance will not stick at all",
        action: "Work through the causes in order: wet skin, soap or ointment residue where the flange must stick, a crease or scar under the flange, hair, or a stoma sited badly in the first place. Shave the area, degrease it with water and dry it fully, and fill dips with barrier paste. A stoma sited over the iliac crest or in a crease may need surgical resiting — say so rather than letting the patient fail for months."
      },
      {
        problem: "Bleeding from the stoma",
        action: "A little bleeding from the mucosa when the bag is changed is normal — stoma mucosa is friable. Direct pressure. Bleeding from the mucocutaneous junction may need a stitch. Bleeding into the bag from inside the bowel is a different problem: look for a cause."
      },
      {
        problem: "Parastomal hernia",
        action: "Common and often tolerable. A support garment, and advice to avoid heavy lifting. Repair is for pain, obstruction or an appliance that cannot be made to seal. Obstruction or strangulation in a parastomal hernia is an emergency."
      },
      {
        problem: "Watery high-volume output from a colostomy",
        action: "A proximal, particularly transverse, colostomy has less colon to absorb water and normally produces semi-liquid output. Sudden watery output is usually gastroenteritis — oral rehydration, and look for the cause. Only rarely does a colostomy cause the fluid and sodium problems that an ileostomy routinely does."
      },
      {
        problem: "Patient will not look at the stoma or touch it",
        action: "Normal, common, and the thing most likely to end with readmission. Do not do all the bag changes for them. Sit with them, name what they are feeling, show them the stoma in a mirror, and get them to do one change with their own hands before discharge. Involve a family member. Ask about mood at follow-up."
      }
    ],
    removal: {
      when: [
        "Reversal is considered once the original problem has resolved, the patient is nutritionally fit, and the inflammation has fully settled. In practice that is commonly 8–12 weeks and rarely sooner than about 6 weeks. Practice varies — confirm with your surgical department.",
        "Nutrition and anaemia corrected: a hypoalbuminaemic anaemic patient leaks their anastomosis.",
        "The distal bowel and the anal sphincter shown to be intact and adequate. An incontinent patient reversed into an unprotected perineum is worse off than before.",
        "Never reverse an end colostomy without knowing where the distal end was left and what it is attached to. If the operation note does not say, assume nothing.",
        "Reversal is a laparotomy with a colonic anastomosis, not a ward or minor-theatre procedure. Asella lists stoma reversal as a general anaesthetic case with a relaxant, ceftriaxone and metronidazole. If your hospital cannot do a colonic anastomosis safely, the patient needs referral, not a local attempt."
      ],
      how: [
        "This is an operation for a surgeon, so what follows is preparation, not technique.",
        "Confirm the distal anatomy before the day. Contrast study or endoscopy if you have it; at minimum, the original operation note and a careful examination including a rectal examination.",
        "Correct anaemia, albumin and glucose. Treat any parastomal infection first.",
        "Mechanical bowel preparation with saline washouts, through the stoma and through the anus (or the mucous fistula if the distal bowel is obstructed from below), typically twice daily for two days beforehand. Use saline only — soap enemas cause a chemical colitis and must not be used.",
        "A low-residue or clear liquid diet for a day or two beforehand, keeping the patient's calorie intake up, then nil by mouth for about 12 hours with maintenance IV fluids. Mechanical preparation itself is debated and some units omit it — confirm with your surgical department.",
        "Antibiotics: cover before the incision. Oral non-absorbable antibiotics the day before are used in some protocols and omitted in others.",
        "Prepare the patient as well as the bowel: explain the operation, that an anastomotic leak is the risk that matters, and that a leak may mean waking up with a stoma again.",
        "Afterwards, watch for leak at days 4–6: tachycardia first, then fever and abdominal tenderness. Unexplained tachycardia after a colonic anastomosis is a leak until proven otherwise. Take the patient back to theatre rather than observe overnight.",
        "Expect frequency, urgency and poor control for weeks to months after reversal of a long-standing stoma. Warn the patient beforehand, or they will think the operation failed."
      ]
    },
    complications: {
      immediate: [
        "Bleeding from a mesenteric vessel.",
        "Ischaemia or necrosis of the exteriorised bowel, from tension, a twisted mesentery or a tight trephine.",
        "Twisting of the bowel on its mesentery, so the stoma never functions.",
        "Retraction into the abdomen, especially from a fixed retroperitoneal segment.",
        "Siting error: over a crease, a bony point, or through the laparotomy wound."
      ],
      early: [
        "Obstruction of the stoma — twist, tight fascia, retraction, oedema, or faecal impaction.",
        "Prolonged ileus, especially where there is sepsis.",
        "Prolapse, commonest with a loop stoma.",
        "Mucocutaneous separation.",
        "Parastomal skin excoriation from a leaking appliance.",
        "Wound infection in the laparotomy wound.",
        "Parastomal abscess.",
        "Diarrhoea from gastroenteritis.",
        "Depression, withdrawal and refusal to engage with the stoma."
      ],
      late: [
        "Stomal stenosis.",
        "Parastomal hernia.",
        "Chronic prolapse.",
        "Parastomal fistula.",
        "Chronic skin damage.",
        "Blind loop problems in the defunctioned distal segment: mucus accumulation, distension, pain and diversion colitis.",
        "Hypertonic anal sphincter after a long-standing diversion, which raises anastomotic pressure at reversal.",
        "Never reversed — because the patient was lost to follow-up, or because the operation note did not record what was done."
      ]
    },
    missing: [
      {
        item: "A stoma appliance",
        substitute: "A clean plastic bag — an empty IV fluid bag cut open works well — fixed over a cut-out ring of zinc oxide plaster, with the skin inside the ring protected by zinc oxide ointment or barrier paste.",
        note: "This is the honest answer and it is not a good one. It leaks, it has no filter, and it must be changed often. What actually protects the patient is not the bag but the barrier: a thin film of zinc oxide on the parastomal skin, cleaning with plain water only, and changing before it leaks rather than after. A colostomy without any appliance at all — managed with gauze and a binder — is survivable because colostomy output is formed, and it is miserable. Make finding appliances a named person's job before discharge, not a hope."
      },
      {
        item: "A proper skin barrier wafer or paste",
        substitute: "Zinc oxide ointment in a thin film, or petroleum jelly as a second choice on skin the flange does not need to stick to.",
        note: "Keep any greasy ointment OFF the area the flange must adhere to — that is the commonest reason an appliance will not stick, and the staff then blame the appliance. Barrier under the bag, bare dry skin where the flange lands."
      },
      {
        item: "A bridge rod for a loop colostomy",
        substitute: "A short length of sterile IV giving-set tubing, or a cut sterile nasogastric tube, passed through the mesenteric window and secured at each side.",
        note: "Standard, cheap and effective. Pass it through a window made close to the bowel wall so you do not divide a marginal vessel, and write the removal date — about 5–7 days — in the notes and on the chart, because a rod nobody removes ulcerates the skin."
      },
      {
        item: "Absorbable 3/0 suture for maturing the stoma",
        substitute: "Chromic catgut 3/0, or 2/0 absorbable if that is all there is.",
        note: "Do not use silk or nylon on the mucocutaneous junction. Non-absorbable suture there does not dissolve, forms suture granulomas and sinuses, and has to be picked out one stitch at a time weeks later by someone who did not place them."
      },
      {
        item: "A proper stoma site, marked with the patient awake",
        substitute: "None that works.",
        note: "There is no technical substitute for marking the site. If the patient is unconscious or in extremis, use the anatomy: through the rectus, on the high point of the fat fold, a hand's breadth from the costal margin and the iliac crest, and off the midline wound. What you must not do, however rushed you are, is bring the stoma out through the laparotomy incision. It herniates, it retracts, the wound breaks down, and no appliance will ever seal across it."
      },
      {
        item: "A way to irrigate or wash out the distal bowel before reversal",
        substitute: "Saline washouts with a funnel or a bladder syringe, through the stoma and through the anus or mucous fistula.",
        note: "Saline only. Soap enemas and detergent washouts cause a chemical colitis and are still given in some places — do not. Do not use laxatives for this purpose either: they empty the small bowel too and dehydrate a patient who is about to have an anaesthetic."
      },
      {
        item: "A surgeon who can do a colonic anastomosis, when reversal is due",
        substitute: "None.",
        note: "Say this at the time the stoma is made, not three months later. If your hospital cannot safely reverse a Hartmann's, then a patient given an end colostomy must be put into a referral pathway on the day of the operation, with a written plan and a named receiving hospital. The commonest fate of a temporary colostomy in a district hospital is that it becomes permanent by default."
      },
      {
        item: "Any way to teach the patient before discharge",
        substitute: "None, and it is worth delaying discharge by a day for.",
        note: "A patient who leaves having never once changed their own bag is a readmission with excoriated skin. Watch them do one change with their own hands. Teach a family member too. Write down what they were taught."
      }
    ],
    redflags: [
      "Dusky or black stoma — assess the depth of ischaemia with a light and a clear tube today. Darkness below the fascia means a laparotomy now.",
      "No function by day 2–3 with a distended tender abdomen — obstruction or a twist. Examine the stoma with a finger and consider re-operation.",
      "Unexplained tachycardia after a colonic anastomosis at reversal, days 4–6 — anastomotic leak until proven otherwise. Back to theatre.",
      "A stoma sited on or through the laparotomy wound. Resite it before closing if you can see it happening.",
      "The segment will not reach the skin without tension. Mobilise more or choose another segment; never close under tension and hope.",
      "An irreducible or dusky prolapsed stoma — surgical.",
      "A patient about to be discharged with a stoma and no appliance supply and no follow-up date. Fix that before they leave.",
      "An operation note that does not say which limb is proximal or where the distal end was left. Rewrite it now, while you remember."
    ],
    caseIds: ["bowel-obstruction", "peritonitis", "trauma"],
    packIds: ["sigmoid-volvulus-resection", "laparotomy-obstruction", "laparotomy-perforation"],
    textbook: [
      {
        book: "asellaor",
        text: "Gangrenous sigmoid volvulus is listed as a general anaesthetic case requiring ETT, suction, relaxant, ceftriaxone and metronidazole, a 16F urinary catheter with urine bag, vicryl 2/0 and 3/0 round, vicryl 0 round and No. 2 round, and four extra bags of normal saline specifically for lavage.",
        ref: "Asella Referral and Teaching Hospital. List of OR Materials for Surgical cases, 2025 — 5. Gangrenous SV"
      },
      {
        book: "asellaor",
        text: "Stoma reversal is listed as a general anaesthetic case with ETT, suction, relaxant and reversal agents, ceftriaxone and metronidazole, a 16F urinary catheter with urine bag, vicryl 2/0 round, vicryl 3/0 round, vicryl No. 2 round, vicryl 2/0 cutting and catgut 2/0 round.",
        ref: "Asella Referral and Teaching Hospital. List of OR Materials for Surgical cases, 2025 — E. Stoma Reversal"
      }
    ],
    sources: [
      { name: "WHO. Surgical Care at the District Hospital, 2003 — bowel surgery and stomas" },
      {
        name: "Primary Surgery, Volume 1: Non-trauma (ed. Maurice King) — colostomy, stoma care and sigmoid volvulus"
      },
      { name: "Schwartz's Principles of Surgery — colon and rectum, stomas and their complications" },
      {
        name: "Note: Asella's OR materials list (2025) does not describe stoma technique. It is cited here only for the equipment, suture and antibiotic lists of the operations at which a colostomy is made or closed."
      }
    ],
    review: { status: "draft", by: null, date: null }
  },
  {
    id: "ileostomy",
    name: "Ileostomy (stoma formation and care)",
    aka: ["end ileostomy", "loop ileostomy", "Brooke ileostomy", "small bowel stoma"],
    summary: "The ileum brought out through the abdominal wall as a stoma. In this region it most often follows ileal perforation from typhoid or tuberculosis, complicated small bowel volvulus, or mesenteric ischaemia. It is technically similar to a colostomy and clinically quite different: the output is liquid, enzymatic and large, so an ileostomy threatens the patient's fluid and sodium balance and destroys skin in days. The danger after this operation is not the stoma; it is dehydration.",
    urgency: "both",
    anaesthesia: "GA with relaxation, as part of a laparotomy.",
    indications: [
      "Ileal perforation — typhoid or tuberculous — where primary repair or anastomosis would be unsafe: multiple perforations, delayed presentation, faecal peritonitis, malnutrition, shock.",
      "Complicated small bowel volvulus and mesenteric ischaemia requiring resection, where the ends should not be joined.",
      "Resection with an anastomosis of doubtful safety: exteriorise rather than risk a leak in a patient who could not survive one.",
      "Diversion to protect a distal anastomosis or an ileoanal pouch.",
      "After total or subtotal colectomy: total proctocolectomy for ulcerative colitis, colectomy for familial adenomatous polyposis or Lynch syndrome, subtotal colectomy for fulminant colitis.",
      "Children: meconium ileus, ileal atresia, long-segment Hirschsprung disease, complicated volvulus and irreducible intussusception with non-viable bowel.",
      "Obstructing or perforated right-sided colonic cancer where resection is done and an anastomosis is unsafe."
    ],
    contraindications: [
      {
        item: "No oral rehydration solution, no IV fluids, and no way to measure the output",
        absolute: true,
        note: "A high-output ileostomy kills by dehydration and sodium depletion, quietly, over days. If you can neither measure nor replace the losses, a patient with a new ileostomy in your facility will die of something you cannot see. That is a reason to discuss transfer before you operate."
      },
      {
        item: "No appliance and no realistic supply",
        absolute: false,
        note: "Relative but far more serious than for a colostomy: ileostomy effluent contains active digestive enzymes and will ulcerate skin within days, not weeks. Weigh an anastomosis honestly against a stoma you cannot support."
      },
      {
        item: "Siting through the laparotomy wound",
        absolute: true,
        note: "As for a colostomy, and worse — liquid enzymatic effluent into a laparotomy wound gives you a dehisced abdomen and an enterocutaneous fistula."
      },
      {
        item: "A very short remaining small bowel length",
        absolute: false,
        note: "Relative and important. An ileostomy brought out proximally, with little small bowel above it, produces enormous output that cannot be replaced orally. Measure and record the length of bowel remaining — the next surgeon needs that number and nobody ever writes it down."
      }
    ],
    equipment: [
      {
        item: "Standard laparotomy set",
        qty: "1",
        note: "An ileostomy is part of a laparotomy.",
        drugId: null
      },
      { item: "Surgical blade No. 23 and No. 15", qty: "2", note: "", drugId: null },
      {
        item: "Absorbable suture 3/0 on a round needle",
        qty: "3",
        note: "For the mucocutaneous sutures. The eversion stitches that build the spout are the ones that matter here.",
        drugId: null
      },
      {
        item: "Absorbable suture 2/0 and No. 1 or No. 2 on a round needle",
        qty: "4",
        note: "Bowel and peritoneum; the heavier suture for fascial closure.",
        drugId: null
      },
      {
        item: "Stoma appliance, drainable, cut-to-fit, with a tap",
        qty: "6",
        note: "You will get through more of these than for a colostomy. Fit the first in theatre. A drainable bag with a tap is strongly preferable — the output is liquid and constant.",
        drugId: null
      },
      {
        item: "Skin barrier — zinc oxide ointment or barrier paste",
        qty: "2",
        note: "Not optional for an ileostomy.",
        drugId: null
      },
      {
        item: "Bridge rod for a loop ileostomy",
        qty: "1",
        note: "Or a short length of sterile tubing.",
        drugId: null
      },
      {
        item: "Measured container for output",
        qty: "1",
        note: "A jug, a marked bottle, anything you can read a volume off. Without this you are flying blind.",
        drugId: null
      },
      {
        item: "Ringer's lactate",
        qty: "4 L",
        note: "For resuscitation before and after. Ileostomy losses are isotonic and sodium-rich: replace with a balanced salt solution, not with dextrose.",
        drugId: "ringers-lactate"
      },
      {
        item: "Oral rehydration salts",
        qty: "10 sachets",
        note: "The main long-term tool for a high-output ileostomy. Sipped through the day, not drunk in gulps.",
        drugId: "zinc-ors"
      },
      {
        item: "Potassium chloride",
        qty: "2",
        note: "Replace once urine is flowing. Never as a bolus.",
        drugId: "potassium-chloride"
      },
      {
        item: "Ceftriaxone",
        qty: "2",
        note: "With metronidazole, from before the incision.",
        drugId: "ceftriaxone"
      },
      { item: "Metronidazole IV", qty: "2", note: "", drugId: "metronidazole" },
      {
        item: "Nasogastric tube 16F or 18F",
        qty: "1",
        note: "Free drainage, aspirate measured.",
        drugId: null
      },
      {
        item: "Urinary catheter 16F with urine bag",
        qty: "1",
        note: "Hourly urine output is your best single guide to whether you are replacing the losses.",
        drugId: null
      },
      { item: "Morphine and paracetamol", qty: "1 each", note: "", drugId: "morphine" },
      {
        item: "Blood: crossmatched or identified donors",
        qty: "2",
        note: "Typhoid perforation patients are often anaemic and malnourished.",
        drugId: "blood-transfusion"
      },
      {
        item: "Normal saline for lavage",
        qty: "4 L",
        note: "Faecal peritonitis from an ileal perforation needs thorough lavage.",
        drugId: "normal-saline"
      }
    ],
    steps: [
      {
        n: 1,
        title: "Mark the site awake if there is any chance to",
        text: "Right lower quadrant, through the rectus abdominis, on the summit of the infraumbilical fat fold, clear of the iliac crest, the umbilicus, the costal margin, scars and creases, below the belt line, visible and reachable. In an emergency laparotomy for perforation you usually cannot mark it beforehand — then use the anatomy deliberately rather than putting it wherever the bowel happens to reach."
      },
      {
        n: 2,
        title: "Resuscitate hard before induction",
        text: "An ileal perforation with peritonitis arrives shocked, septic and depleted. Fluid, nasogastric decompression, catheter, ceftriaxone and metronidazole before the knife. Operating on an unresuscitated septic patient is how they arrest on induction."
      },
      {
        n: 3,
        title: "Do the abdominal part and lavage properly",
        text: "Laparotomy, deal with the perforation or the ischaemic segment, resect what must go, and lavage thoroughly with warm saline until the returns are clear. Note and record the length of small bowel remaining, from the duodenojejunal flexure to the stoma. Nobody writes this down and everybody later needs it."
      },
      {
        n: 4,
        title: "Decide: end, loop, or double-barrel",
        text: "End ileostomy with the distal end closed and left inside, for a resection where the distal bowel will be dealt with later. Loop ileostomy where you are defunctioning something downstream and intend to close it soon. Double-barrel where both ends must be accessible or the segments will not reach one hole. Decide before you cut the trephine."
      },
      {
        n: 5,
        title: "Make the trephine",
        text: "Excise a circular disc of skin about 2 cm across at the marked site — smaller than for a colostomy, matched to the ileum. Fat down to the anterior rectus sheath, cruciate incision in the sheath, split the rectus longitudinally, open the posterior sheath and peritoneum. Admit two fingers at the fascia: tight enough that it does not prolapse, loose enough that it does not strangulate."
      },
      {
        n: 6,
        title: "Deliver the bowel",
        text: "Bring the ileum through without twisting. Check the mesentery is not rotated and not under tension and that the bowel is pink with pulsatile vessels. Orientate it so the proximal (functioning) limb will be the one that is everted; mark or note which is which, because for a loop ileostomy getting this wrong means the output goes into the wrong limb."
      },
      {
        n: 7,
        title: "Close the abdomen first",
        text: "Close and dress the laparotomy wound before you open the bowel."
      },
      {
        n: 8,
        title: "Make a spout — this is the step that matters",
        text: "An ileostomy must be everted, a Brooke spout standing 2–3 cm proud of the skin. Take a 3/0 absorbable suture through the skin edge, then through the bowel wall at the level you want the fold, then full thickness through the cut edge of the bowel; as you tie these the bowel rolls back on itself like a cuff. Four to six of them around the circumference. A flush ileostomy guarantees effluent under the flange, and that means excoriated skin, a bag that will not stick, and a patient who never gets it under control."
      },
      {
        n: 9,
        title: "Check the lumen and the colour",
        text: "A finger should pass easily and the direction should be straight. The everted mucosa should be deep pink and glistening. Dusky is ischaemic — take it down and redo it now."
      },
      {
        n: 10,
        title: "Fit a drainable appliance in theatre",
        text: "Measure, cut the flange to size plus 2 mm, clean and dry the skin completely, apply barrier paste only where the flange will not land, and fit the bag before the drapes come off. For an ileostomy this is not tidiness — the output starts early and it is corrosive."
      },
      {
        n: 11,
        title: "Start the fluid plan the moment the operation ends",
        text: "Write the actual plan on the chart, not 'monitor output': measure stoma output every shift and total it daily; measure urine output; replace with Ringer's lactate volume for volume while the output is high; sip ORS; and name the daily thresholds at which someone must be called. Dehydration in a new ileostomy is the complication that kills, and it kills because nobody added up the bag."
      },
      {
        n: 12,
        title: "Record the anatomy and the bowel length",
        text: "Which segment, which limb is proximal, where the distal end is, how much small bowel remains, whether a rod is in and when it comes out, and whether closure is planned. Draw it."
      }
    ],
    landmarks: "Right lower quadrant, through the rectus abdominis, on the summit of the infraumbilical fat fold, clear of the iliac crest, umbilicus, costal margin, scars and creases, below the belt line, visible and reachable by the patient. Site tells you the stoma: right lower quadrant and a spout that protrudes is an ileostomy; right or left upper quadrant, or left lower quadrant, and flat is a colostomy. A tube stoma in the right lower quadrant with no visible mucosa is a caecostomy, not an ileostomy.",
    sizes: [
      {
        who: "Trephine (skin disc)",
        size: "about 2 cm",
        note: "Smaller than for a colostomy, matched to the ileum. Two fingers at the fascia."
      },
      {
        who: "Spout height",
        size: "2–3 cm proud of the skin",
        note: "The Brooke eversion. This is the single most important technical point in an ileostomy. A flush ileostomy cannot be managed with any appliance."
      },
      {
        who: "Appliance aperture",
        size: "stoma diameter + 2 mm",
        note: "Re-measure at every change for the first weeks as the oedema settles."
      },
      { who: "Mucocutaneous / eversion suture", size: "3/0 absorbable, interrupted", note: "" },
      {
        who: "Normal established output",
        size: "about 500–800 mL in 24 hours",
        note: "Higher in the first weeks before the bowel adapts."
      },
      {
        who: "High output",
        size: "over about 1000–1500 mL in 24 hours",
        note: "Needs active management: measure, replace with balanced salt solution, restrict plain hypotonic fluid, and look for a cause. Thresholds vary between units — confirm with your surgical department."
      }
    ],
    aftercare: [
      "Measure the output every shift and total it every 24 hours, in millilitres, written on the chart. This is the single most important piece of nursing after an ileostomy.",
      "Measure urine output. A falling urine output with a high stoma output means the patient is dehydrating, and it will show here before it shows in the blood pressure.",
      "Replace losses with Ringer's lactate or another balanced salt solution while the output is high. Ileostomy effluent is isotonic and sodium-rich; replacing it with 5 % dextrose gives you a dehydrated patient with a normal-looking fluid chart and a falling sodium.",
      "Oral rehydration solution, sipped steadily through the day. This is the mainstay once the patient is eating.",
      "Counterintuitive and important: do not let a high-output ileostomy patient drink large volumes of plain water. Hypotonic fluid drives sodium out through the stoma and makes the depletion worse. Salt-containing fluid, in small frequent amounts.",
      "Check potassium, sodium, creatinine and magnesium where you can. Where you cannot, use the output chart, urine output, thirst, skin turgor, postural dizziness and weight.",
      "Weigh the patient. A falling weight in the first weeks after an ileostomy is usually water.",
      "Expect function within 24–48 hours — earlier than a colostomy.",
      "Appliance: drainable, with a tap, emptied when a third full, changed every 2–3 days or on any leak. An ileostomy bag emptied too late detaches under its own weight.",
      "Skin: plain warm water only, dried completely, barrier paste on the surrounding skin. Enzymatic effluent on skin ulcerates within days — treat any redness as urgent, not cosmetic.",
      "Remove a loop ileostomy rod at about 5–7 days.",
      "Diet: eat, and eat regularly. Chew thoroughly. Introduce foods one at a time. Warn about the foods that typically cause a blockage at the fascial ring — nuts, popcorn, citrus pith, coconut, fibrous vegetable skins, and in this region unpeeled or stringy vegetables.",
      "Never give a bulk-forming laxative to a patient with an ileostomy.",
      "Teach the patient and a family member to empty and change the bag themselves before discharge, with their own hands.",
      "Before discharge, write down: the daily output, the fluid plan, the warning signs of dehydration, who to come back to, and where the next appliances come from."
    ],
    troubleshooting: [
      {
        problem: "High output — over about 1000–1500 mL a day",
        action: "First exclude a cause: intra-abdominal sepsis or a collection, partial obstruction distal to the stoma, enteritis, abrupt stopping of steroids, a drug cause, and a stoma made unexpectedly proximally. Then manage it: measure and total the output, replace with balanced salt solution, restrict plain water and give salt-containing oral fluid instead, eat small frequent meals, and reduce hypotonic drinks. Correct potassium and magnesium."
      },
      {
        problem: "Patient is thirsty, dizzy on standing, passing little dark urine",
        action: "Dehydration and sodium depletion, and this is the way ileostomy patients die after discharge. IV balanced salt solution now, total up the stoma output, and do not discharge until the output is controlled and the patient and family can state the warning signs back to you."
      },
      {
        problem: "Serum sodium falling despite good-looking fluid charts",
        action: "You are probably replacing isotonic sodium-rich stoma losses with dextrose or with plain water by mouth. Switch to a balanced salt solution and to ORS. This is a common and quietly dangerous error."
      },
      {
        problem: "Stoma output has stopped and the abdomen is distended",
        action: "Food bolus obstruction at the fascial ring is the commonest cause and it is often reversible. Nil by mouth, nasogastric tube, IV fluid, and gentle lavage of the stoma with 50 mL of warm saline through a soft catheter passed a short way in. A gloved finger into the stoma may feel the bolus or a twist. If it does not resolve, or there is tenderness, fever or tachycardia, this is an obstruction needing re-operation."
      },
      {
        problem: "Stoma dusky or black",
        action: "Assess the depth with a light and a clear tube. Mucosal change above the fascia may slough and survive; darkness below the fascia means dead bowel inside the abdomen and that is a laparotomy today."
      },
      {
        problem: "Parastomal skin raw, weeping and painful",
        action: "Almost always a flush stoma or a badly fitting flange letting enzymatic effluent onto skin. Re-measure the stoma and cut the flange to size plus 2 mm. Use a convex appliance if the stoma is flush. Clean with water only, dry fully, barrier paste on the raw skin, change more often. A flush ileostomy that keeps destroying skin is a surgical problem and needs revision to a proper spout — do not let a patient endure it for months."
      },
      {
        problem: "Stoma retracted or flush",
        action: "The underlying error is usually a spout that was not built, or tension on the mesentery. Convex appliance, barrier paste to build up the surrounding skin, more frequent changes. Revision is often the right answer for an ileostomy, more so than for a colostomy, because the effluent is so damaging."
      },
      {
        problem: "Prolapse",
        action: "Lie the patient flat and reduce it with gentle sustained pressure. Table sugar on an oedematous prolapse for 10–20 minutes is widely used to draw out the swelling before reduction; the evidence is case reports, but it is harmless and worth trying. Irreducible or dusky prolapse is surgical."
      },
      {
        problem: "Bleeding from the stoma",
        action: "Minor mucosal bleeding at bag changes is normal. Pressure. Bleeding from the mucocutaneous junction may need a stitch. Blood in the effluent from inside the bowel needs a cause found."
      },
      {
        problem: "Weight loss and malnutrition weeks after discharge",
        action: "Expected and under-treated. The ileum absorbs most of what is eaten and a proximal stoma shortcuts it. More frequent meals, more energy and protein, salt-containing fluid. Check for a short remaining bowel length — and this is where the operation note that recorded it earns its keep."
      }
    ],
    removal: {
      when: [
        "A loop ileostomy made to protect a distal anastomosis is usually closed once that anastomosis is shown to be healed and the patient is well — commonly 8–12 weeks. Practice varies and depends on what is downstream; confirm with your surgical department.",
        "The patient nutritionally fit, anaemia and albumin corrected.",
        "The distal bowel shown to be patent and intact, and the original problem resolved.",
        "An end ileostomy after resection is a bigger reconstruction, not a closure. It needs a surgeon who will do the anastomosis, and a clear record of how much small bowel remains.",
        "Never close an ileostomy without the original operation note and a clear understanding of which limb is which and what lies distally."
      ],
      how: [
        "This is theatre work for a surgeon; what follows is preparation.",
        "Confirm the distal anatomy. Contrast study or endoscopy if available; at minimum the operation note and a careful examination.",
        "Correct anaemia, albumin, sodium, potassium and magnesium. Ileostomy patients come to closure depleted, and depletion is what makes the anastomosis leak.",
        "No mechanical bowel preparation is needed for a small bowel stoma closure in most protocols — there is little faecal load. Antibiotic cover before the incision.",
        "Afterwards, watch for leak at days 4–6: unexplained tachycardia first, then fever and tenderness. Take the patient back rather than observe.",
        "Afterwards, warn the patient to expect frequent loose stool for weeks while the colon re-adapts, and keep them on oral rehydration until it settles. Patients closed and discharged the same week get readmitted dehydrated."
      ]
    },
    complications: {
      immediate: [
        "Bleeding from a mesenteric vessel.",
        "Ischaemia or necrosis of the exteriorised ileum from tension, a twisted mesentery or a tight trephine.",
        "Twisting of the bowel so the stoma does not function, or, in a loop, output into the wrong limb.",
        "Injury to adjacent bowel or to the bladder while making the trephine.",
        "Spillage and contamination of the abdominal wound.",
        "Retraction."
      ],
      early: [
        "Dehydration, sodium depletion, hypokalaemia and hypomagnesaemia from high output. This is the dominant early complication and the one that kills.",
        "Acute kidney injury from unreplaced losses.",
        "Rapid parastomal skin excoriation from enzymatic effluent, especially with a flush stoma.",
        "Food bolus obstruction at the fascial ring.",
        "Mucocutaneous separation.",
        "Prolonged ileus and intra-abdominal sepsis.",
        "Prolapse.",
        "Wound infection and, where effluent reaches the laparotomy wound, dehiscence.",
        "Enterocutaneous fistula.",
        "Depression and refusal to engage with the stoma."
      ],
      late: [
        "Chronic high output and chronic dehydration, with repeated admissions.",
        "Malnutrition and weight loss.",
        "Gallstones and renal stones, from altered bile salt and fluid handling.",
        "Stomal stenosis.",
        "Parastomal hernia.",
        "Chronic skin damage.",
        "Adhesive obstruction.",
        "Vitamin B12 deficiency where a long segment of terminal ileum was resected.",
        "Never closed, because the patient was lost to follow-up or the operation note did not record the anatomy."
      ]
    },
    missing: [
      {
        item: "Oral rehydration solution",
        substitute: "Home-made salt and sugar solution made to the standard recipe, sipped steadily through the day — and IV Ringer's lactate while the output is high.",
        note: "This is the substitution that matters most in this guide. Do NOT substitute plain water: hypotonic fluid drives sodium out through the stoma and deepens the depletion while appearing to treat it. Do not substitute tea, or dextrose, or fruit juice. The fluid must contain salt. If you have neither ORS sachets nor the ability to make a correctly proportioned solution, then the patient must stay on IV balanced salt solution, and that is a reason not to discharge them."
      },
      {
        item: "An antimotility drug for high output",
        substitute: "None available in MedBridge.",
        note: "Said plainly: loperamide and codeine are the drugs normally used to slow a high-output ileostomy, and neither is in this formulary, so do not expect to find one here. What you have instead are the three levers that genuinely work: replace the sodium and volume, stop the patient drinking large amounts of plain hypotonic fluid, and feed them small frequent meals. These are not inferior to loperamide; they are the foundation that loperamide is added to. If high output cannot be controlled with them, that is a reason to seek help, not to improvise a drug."
      },
      {
        item: "A stoma appliance",
        substitute: "A drainable plastic bag — a cut IV fluid bag — over a cut-out zinc oxide plaster ring, with heavy barrier protection of the surrounding skin.",
        note: "This is a much worse situation than for a colostomy and you should treat it as a serious problem rather than a nuisance. Ileostomy effluent contains active digestive enzymes: it will ulcerate skin in days and it will not be contained by gauze or by a binder. If you have no appliance at all for a patient who needs an ileostomy, raise it with the surgeon before the operation, because it may change the decision between an anastomosis and a stoma."
      },
      {
        item: "A drainable bag with a tap",
        substitute: "A closed bag changed frequently, or a bag with a corner cut and clamped with a clip or a tie.",
        note: "Workable but it means more handling and more leakage. Empty at a third full, not when it is heavy — the weight of liquid output pulls the flange off."
      },
      {
        item: "A way to measure the output",
        substitute: "Any marked container, or a bottle you calibrate once with a 50 mL syringe and mark with tape. Count and record the number of bag emptyings and their approximate volume.",
        note: "This is not optional. The entire management of a new ileostomy is driven by the 24-hour output total. A ward that records 'stoma functioning' and nothing else cannot keep this patient alive, and the error is invisible until the patient is in renal failure. If you can measure nothing else on the ward, measure this and the urine."
      },
      {
        item: "A properly everted spout",
        substitute: "None.",
        note: "There is no appliance, barrier or nursing technique that compensates for a flush ileostomy. Build the Brooke eversion at the operation: 2–3 cm proud, four to six eversion sutures. If you inherit a flush ileostomy that is destroying the skin, a convex appliance and barrier paste will hold the line for a while, but the definitive answer is surgical revision — and say so rather than letting the patient suffer for months."
      },
      {
        item: "Barrier paste or zinc oxide",
        substitute: "Petroleum jelly on the skin away from the flange seat, and more frequent bag changes.",
        note: "A weak substitute, and keep it off the area the flange must stick to. For an ileostomy, frequency of change is the thing you have most control over: changing a leaking bag at once, rather than taping over it, is worth more than any ointment."
      },
      {
        item: "Electrolyte testing",
        substitute: "The output chart, urine output and colour, daily weight, thirst, skin turgor, postural dizziness, and muscle weakness or cramps.",
        note: "Adequate to manage most patients if you actually do it and write it down. What you lose is early hypokalaemia and hypomagnesaemia, so replace potassium presumptively once urine is flowing, and treat unexplained weakness or cramps as electrolyte depletion rather than as weakness."
      },
      {
        item: "A bridge rod for a loop ileostomy",
        substitute: "A short length of sterile IV giving-set tubing or a cut sterile nasogastric tube through the mesenteric window.",
        note: "Standard. Note the removal date — about 5–7 days."
      },
      {
        item: "A surgeon to close it, when closure is due",
        substitute: "None.",
        note: "Write the referral plan on the day the stoma is made. A loop ileostomy made to protect something downstream is supposed to be temporary; the common fate in district practice is that it becomes permanent and the patient spends years dehydrated. Name the receiving hospital in the notes."
      },
      {
        item: "Any way to teach and follow up the patient",
        substitute: "None, and it is worth delaying discharge for.",
        note: "An ileostomy patient discharged without understanding the fluid rules comes back in renal failure, or does not come back. Before they leave: they have changed and emptied the bag with their own hands; they and a family member can repeat back the warning signs of dehydration; they have ORS and know how to use it; and they have a named date and place to return."
      }
    ],
    redflags: [
      "Output over 1500 mL a day, or a rising output with falling urine output — this patient is dehydrating. Replace with balanced salt solution now, and find the cause.",
      "Falling sodium with a fluid chart that looks balanced — you are replacing isotonic losses with hypotonic fluid. Change it.",
      "A patient ready for discharge whose output has not been totalled, or whose family cannot state the dehydration warning signs. Do not discharge.",
      "Dusky or black stoma — assess depth today; darkness below the fascia is a laparotomy now.",
      "Stoma stopped with a distended tender abdomen, fever or tachycardia — obstruction, not just a food bolus.",
      "A flush ileostomy with skin ulceration — this needs surgical revision, not more ointment.",
      "No ORS, no IV fluids and no way to measure output. Do not plan an ileostomy in this facility; discuss transfer first.",
      "An operation note that does not record how much small bowel remains. Add it now, while you remember.",
      "Effluent tracking into the laparotomy wound — enterocutaneous fistula. Protect the skin, replace the losses, and get help."
    ],
    caseIds: ["peritonitis", "bowel-obstruction", "severe-dehydration"],
    packIds: ["laparotomy-perforation", "laparotomy-obstruction"],
    textbook: [],
    sources: [
      { name: "WHO. Surgical Care at the District Hospital, 2003 — bowel surgery and stomas" },
      {
        name: "Primary Surgery, Volume 1: Non-trauma (ed. Maurice King) — small bowel, typhoid perforation and stomas"
      },
      { name: "Schwartz's Principles of Surgery — small intestine, stomas and high-output states" },
      { name: "WHO / UNICEF guidance on oral rehydration salts composition and use" },
      {
        name: "Note: the Asella Referral and Teaching Hospital OR materials list (2025) does not cover ileostomy. Nothing in this guide is attributed to it."
      }
    ],
    review: { status: "draft", by: null, date: null }
  }
];
