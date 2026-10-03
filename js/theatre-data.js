/* theatre-data.js — what to have ready in theatre, operation by operation.

   The lists come from the OR materials file of Asella Referral and Teaching
   Hospital (2025), whose own foreword says it exists to decrease
   inconveniences due to missed materials. That document is real institutional
   practice from a named teaching hospital — it is NOT a clinical guideline,
   and nothing here should be read as one.

   The `missing` array is not from that document. It is this app's own
   contribution: what to do when a listed item is not on the trolley, and —
   just as important — where there is no safe substitute and the operation
   must not start. DRAFT until reviewed. */
window.THEATRE_PACKS = [
  {
    id: "laparotomy-perforation",
    name: "Laparotomy for perforated peptic ulcer / generalised peritonitis",
    aka: [
      "PPUD perforation",
      "perforated duodenal ulcer",
      "omental patch",
      "Graham patch",
      "generalized peritonitis",
      "typhoid perforation"
    ],
    urgency: "emergency",
    caseIds: ["peritonitis"],
    anaesthesia: "GA",
    sections: [
      {
        title: "Anaesthesia drugs",
        items: [
          {
            item: "Ketamine OR propofol",
            qty: "1",
            note: "Induction. The list offers either. In a septic, hypovolaemic patient ketamine is the one that will not drop the blood pressure further.",
            drugId: "ketamine"
          },
          {
            item: "Vecuronium",
            qty: "1",
            note: "Non-depolarising relaxant for maintenance. No MedBridge drug entry yet.",
            drugId: "vecuronium"
          },
          {
            item: "Suxamethonium (succinylcholine)",
            qty: "1",
            note: "For rapid-sequence intubation of a full stomach. No MedBridge drug entry yet.",
            drugId: "suxamethonium"
          },
          {
            item: "Atropine",
            qty: "2",
            note: "Two ampoules: with neostigmine for reversal, and for bradycardia.",
            drugId: "atropine"
          },
          {
            item: "Neostigmine",
            qty: "1",
            note: "Reversal of the non-depolarising relaxant, given with atropine. No MedBridge drug entry yet.",
            drugId: "neostigmine"
          },
          {
            item: "Dexamethasone",
            qty: "1",
            note: "Listed for every GA case in this document; in practice an antiemetic.",
            drugId: "dexamethasone"
          },
          {
            item: "Pethidine OR morphine",
            qty: "1",
            note: "Intra-operative opioid. Pethidine has no MedBridge entry; morphine does.",
            drugId: "morphine"
          },
          {
            item: "Tramadol",
            qty: "2",
            note: "Listed for this operation specifically, in addition to the strong opioid. No MedBridge drug entry yet.",
            drugId: "tramadol"
          },
          {
            item: "Omeprazole IV",
            qty: "2",
            note: "Listed for this operation specifically — acid suppression for the ulcer. No MedBridge drug entry yet.",
            drugId: "omeprazole"
          },
          {
            item: "40 % dextrose",
            qty: "3",
            note: "Three ampoules to hand. The MedBridge entry describes 50 % stock; 40 % is what Ethiopian theatres carry. Both need dilution before a peripheral vein.",
            drugId: "dextrose"
          }
        ]
      },
      {
        title: "Instruments",
        items: [
          { item: "Endotracheal tube 6.5 (female) // 7 or 7.5 (male)", qty: "1", note: "" },
          { item: "Suction tip", qty: "1", note: "" },
          { item: "Surgical blade No. 23", qty: "2", note: "" },
          { item: "Urinary catheter 16F + urine bag", qty: "1 each", note: "" },
          {
            item: "Nasogastric tube 18F",
            qty: "1",
            note: "Listed twice over: one to decompress the stomach, and one with a urine bag as the closed abdominal drain if a drain is left."
          }
        ]
      },
      {
        title: "Sutures",
        items: [
          {
            item: "Silk 2/0 round",
            qty: "4",
            note: "The largest silk allocation in the document — this is the perforation repair and the omental patch."
          },
          { item: "Silk 2/0 cutting", qty: "2", note: "" },
          { item: "Vicryl No 2 round", qty: "2", note: "Abdominal wall / mass closure." },
          { item: "Vicryl 2/0 cutting", qty: "2", note: "" },
          { item: "Vicryl 2/0 round", qty: "2", note: "" }
        ]
      },
      {
        title: "Consumables",
        items: [
          { item: "Ceftriaxone", qty: "2", note: "", drugId: "ceftriaxone" },
          {
            item: "Metronidazole IV",
            qty: "2",
            note: "Anaerobic cover for a contaminated peritoneum.",
            drugId: "metronidazole"
          },
          {
            item: "Normal saline",
            qty: "5 bags, plus 4 more for lavage",
            note: "The four extra bags are listed explicitly for peritoneal lavage.",
            drugId: "normal-saline"
          },
          { item: "IV cannula 18/20G", qty: "2", note: "" },
          { item: "Surgical gloves", qty: "20", note: "" },
          { item: "Disposable gloves", qty: "10 pairs", note: "" },
          { item: "Syringe 10 cc", qty: "6", note: "" },
          { item: "Syringe 5 cc", qty: "6", note: "" }
        ]
      },
      {
        title: "Have ready for trouble",
        items: [
          {
            item: "Bag-valve-mask, laryngoscope with a working bulb, spare blade, introducer and an ETT one size smaller",
            qty: "1 set",
            note: "ADDED HERE, not on the hospital list. Lay it out and test it before a single drop of relaxant goes in. You are about to paralyse a patient with a full stomach."
          },
          {
            item: "Working suction, tested, with a spare Yankauer",
            qty: "1",
            note: "ADDED HERE. Switch it on and hear it before induction, not after the vomit."
          },
          {
            item: "Adrenaline 1 mg diluted to 10 mL (100 mcg/mL), labelled",
            qty: "1 syringe",
            note: "ADDED HERE. For the hypotension of induction in sepsis, and for anaphylaxis.",
            drugId: "adrenaline"
          },
          {
            item: "Ringer's lactate or saline, 2 L running, warmed if you can",
            qty: "2 L",
            note: "ADDED HERE. Resuscitate before induction, not during it.",
            drugId: "ringers-lactate"
          },
          {
            item: "Two units crossmatched, or two bled donors in the building",
            qty: "2",
            note: "ADDED HERE. A perforation of several days' standing comes with anaemia and will bleed at adhesiolysis.",
            drugId: "blood-transfusion"
          },
          {
            item: "Nylon or polypropylene No 1 on a large curved needle",
            qty: "1",
            note: "ADDED HERE. For mass closure of a friable, infected abdominal wall where Vicryl will not hold."
          },
          {
            item: "Naloxone",
            qty: "1",
            note: "ADDED HERE. Pethidine plus tramadol plus morphine in one anaesthetic is a lot of opioid.",
            drugId: "naloxone"
          }
        ]
      }
    ],
    missing: [
      {
        item: "Endotracheal tube, laryngoscope or working suction",
        substitute: "None.",
        note: "There is no safe substitute and nothing to improvise. Do not give suxamethonium or vecuronium to a patient you cannot intubate, ventilate and suction. If the airway kit is incomplete, the operation does not start: resuscitate, keep the nasogastric tube draining, and move the patient or wait for the kit."
      },
      {
        item: "Suxamethonium",
        substitute: "A full intubating dose of a non-depolarising relaxant — vecuronium 0.15 mg/kg, rocuronium 0.9–1.2 mg/kg or atracurium 0.6 mg/kg.",
        note: "Workable, but you are then committed to a long block: if you cannot intubate you cannot wake the patient up either. Only do it with a second airway plan out on the trolley. If no relaxant at all exists, do a ketamine anaesthetic with spontaneous ventilation and generous local infiltration and accept a tight abdomen — or, in a fully resuscitated patient with a lower abdominal perforation, a spinal."
      },
      {
        item: "Neostigmine",
        substitute: "None.",
        note: "Say it plainly: with no reversal agent, do not give a long-acting non-depolarising relaxant. Use suxamethonium for intubation and a ketamine-based maintenance, or be prepared to hand-ventilate the patient for hours with a named person at the bag until the block wears off. 'It will wear off' is not a plan in a theatre with no ventilator."
      },
      {
        item: "Propofol or thiopental",
        substitute: "Ketamine 1–2 mg/kg IV (0.5–1 mg/kg if shocked), with atropine.",
        note: "Better than the alternative in this patient, not worse. Expect secretions and emergence agitation, and keep the lights and noise down in recovery."
      },
      {
        item: "Vecuronium",
        substitute: "Atracurium, rocuronium or pancuronium at equivalent dose.",
        note: "Straight swap. Pancuronium is long and will outlast a short operation. If there is no relaxant of any kind, see suxamethonium above."
      },
      {
        item: "Pethidine",
        substitute: "Morphine 0.1 mg/kg IV, titrated.",
        note: "Direct swap and in most respects a better drug. If neither exists, ketamine 0.2–0.3 mg/kg IV increments provide analgesia, with regular paracetamol and a local anaesthetic wound infiltration before closure."
      },
      {
        item: "Omeprazole IV or metoclopramide",
        substitute: "Oral or nasogastric omeprazole once gut function returns; the nasogastric tube itself for the stomach.",
        note: "Neither drug is doing the important work here. An NG tube on free drainage, kept patent and aspirated, matters more than any acid suppressant on this list."
      },
      {
        item: "Normal saline for lavage",
        substitute: "Ringer's lactate, warmed, in the same volume.",
        note: "Never lavage a peritoneum with plain water, boiled or not — it is hypotonic, it is absorbed, and it haemolyses. Never use a fluid that is not sterile. If you only have 2 L of sterile fluid, lavage less and suction more thoroughly; incomplete lavage is better than chemical injury or inoculation."
      },
      {
        item: "Ceftriaxone",
        substitute: "Ampicillin 2 g + gentamicin 5 mg/kg + metronidazole 500 mg IV, or cefazolin 2 g.",
        note: "The triple regimen is the app's standard for peritonitis and is usually cheaper and more available. Watch gentamicin in a patient who is not yet passing urine."
      },
      {
        item: "Metronidazole",
        substitute: "Chloramphenicol 1 g IV (it does cover anaerobes).",
        note: "An imperfect swap with marrow toxicity on a long course. What actually controls anaerobes here is source control and lavage, not the second-choice antibiotic — do not delay the operation to find metronidazole."
      },
      {
        item: "Vicryl No 2 for mass closure",
        substitute: "Nylon or polypropylene No 1 or No 2, interrupted or as a mass closure.",
        note: "Acceptable and in a septic abdomen arguably preferable. Do NOT close the fascia of a contaminated abdomen with plain catgut alone: it loses most of its strength in about a week, which is exactly when these wounds burst. Catgut is fine for peritoneum and subcutaneous tissue."
      },
      {
        item: "A proper closed suction drain",
        substitute: "An 18F nasogastric tube led into a urine bag — which is what this hospital does and lists.",
        note: "A sound improvisation: sterile, radiopaque, multiple side holes, and a closed system you can measure. A sterile glove or a glove finger is NOT a closed drain — it is an open wick that drains both ways and seeds the wound. A corrugated drain into a dressing is acceptable only for a superficial cavity."
      },
      {
        item: "Crossmatched blood",
        substitute: "Bled relatives or walking donors, grouped and cross-matched on the spot.",
        note: "Start the donor call when you book the theatre, not when the abdomen is open. For an uncomplicated perforation closure it is reasonable to proceed with donors identified but not yet bled; for a resection it is not."
      },
      {
        item: "Pulse oximeter",
        substitute: "None.",
        note: "There is no substitute, and WHO's checklist treats a working oximeter as a precondition for safe anaesthesia. If the only one in theatre is broken, a spinal on a resuscitated patient who stays awake and talking is safer than a relaxant general anaesthetic with no monitor. Say so out loud before anyone scrubs."
      }
    ],
    checks: [
      "Sign in: the patient says their own name, and you confirm the operation and the consent in the notes, in a language the patient actually speaks.",
      "Site and side marked and agreed — for a laparotomy, the planned incision, and any stoma site marked before the drapes go on.",
      "Allergy asked. Airway and aspiration risk stated aloud: this patient has a full stomach until the NG tube says otherwise.",
      "Antibiotic prophylaxis given within 60 minutes before the skin incision. If it has not been given, say so before the knife — do not discover it in recovery.",
      "Blood: group known, crossmatch sent, units in the fridge or donors bled. State the number out loud.",
      "Pulse oximeter on and reading. Suction on and tested. Oxygen source checked and the cylinder turned on.",
      "Swab, needle, blade and instrument count agreed with the scrub nurse before the incision, and repeated and agreed before the abdomen is closed. The four extra lavage bags make a soaked swab easy to lose.",
      "The document does not itemise the laparotomy tray — confirm the set is complete and that this autoclave cycle was logged.",
      "Nothing on the hospital list is a skin antiseptic. Confirm chlorhexidine or povidone-iodine is on the trolley before you drape.",
      "Diclofenac and tramadol appear on almost every list in this document. Hold the NSAID in hypovolaemia, sepsis, renal impairment or active ulcer disease — which is this patient. Paracetamol plus a titrated opioid instead.",
      "Sign out: the operation as actually performed recorded, specimens labelled with the patient's name before they leave the room, and a named person told where this patient recovers and what to watch."
    ],
    textbook: [
      {
        book: "asellaor",
        text: "The GA set listed for generalised peritonitis from a perforated peptic ulcer: ketamine or propofol for induction, vecuronium, atropine two ampoules, neostigmine and suxamethonium.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Generalized Peritonitis 2to PPUD - GA, pdf p. 10"
      },
      {
        book: "asellaor",
        text: "Beyond pethidine or morphine the list adds tramadol two ampoules and IV omeprazole two vials for this operation.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Generalized Peritonitis 2to PPUD - GA, pdf p. 10"
      },
      {
        book: "asellaor",
        text: "Antibiotics listed are ceftriaxone two and IV metronidazole two.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Generalized Peritonitis 2to PPUD - GA, pdf p. 10"
      },
      {
        book: "asellaor",
        text: "Closure materials for the perforation include silk 2/0 round four packets.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Generalized Peritonitis 2to PPUD - GA, pdf p. 10"
      },
      {
        book: "asellaor",
        text: "Four extra bags of normal saline are listed specifically for peritoneal lavage.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Generalized Peritonitis 2to PPUD - GA, pdf p. 10"
      }
    ],
    sources: [
      {
        name: "Asella Referral and Teaching Hospital. List of OR materials for surgical cases, 2025 — institutional practice from a named teaching hospital, not a clinical guideline"
      },
      {
        name: "WHO Surgical Safety Checklist (2nd ed., 2009), in WHO Guidelines for Safe Surgery 2009: Safe Surgery Saves Lives"
      },
      { name: "WHO. Surgical Care at the District Hospital, 2003" }
    ],
    review: { status: "draft" }
  },
  {
    id: "laparotomy-obstruction",
    name: "Laparotomy for intestinal obstruction (adhesive obstruction and small bowel volvulus)",
    aka: [
      "ASBO",
      "adhesive small bowel obstruction",
      "adhesiolysis",
      "SBV",
      "small bowel volvulus",
      "obstructed hernia"
    ],
    urgency: "emergency",
    caseIds: ["bowel-obstruction"],
    anaesthesia: "GA",
    sections: [
      {
        title: "Anaesthesia drugs",
        items: [
          {
            item: "Ketamine OR propofol",
            qty: "1",
            note: "Induction. For small bowel volvulus the list names ketamine alone.",
            drugId: "ketamine"
          },
          { item: "Vecuronium", qty: "1", note: "No MedBridge drug entry yet.", drugId: "vecuronium" },
          {
            item: "Suxamethonium (succinylcholine)",
            qty: "1",
            note: "For rapid-sequence intubation. No MedBridge drug entry yet.",
            drugId: "suxamethonium"
          },
          { item: "Atropine", qty: "2", note: "", drugId: "atropine" },
          {
            item: "Neostigmine",
            qty: "1",
            note: "Reversal, with atropine. No MedBridge drug entry yet.",
            drugId: "neostigmine"
          },
          { item: "Dexamethasone", qty: "1", note: "", drugId: "dexamethasone" },
          {
            item: "Pethidine OR morphine",
            qty: "1",
            note: "Pethidine has no MedBridge entry.",
            drugId: "morphine"
          },
          {
            item: "Diclofenac IM",
            qty: "2",
            note: "Listed. No MedBridge drug entry yet — and see the checks below before you give it to a dehydrated obstructed patient.",
            drugId: "diclofenac"
          },
          { item: "40 % dextrose", qty: "3", note: "", drugId: "dextrose" }
        ]
      },
      {
        title: "Instruments",
        items: [
          { item: "Endotracheal tube 6.5 (female) // 7 or 7.5 (male)", qty: "1", note: "" },
          { item: "Suction tip", qty: "1", note: "" },
          { item: "Surgical blade No. 23", qty: "2", note: "" },
          {
            item: "Urinary catheter 16F + urine bag",
            qty: "1 each",
            note: "Hourly urine output is the resuscitation endpoint in this case."
          }
        ]
      },
      {
        title: "Sutures",
        items: [
          { item: "Vicryl 2/0 round", qty: "2", note: "" },
          { item: "Vicryl 3/0 round", qty: "2", note: "Bowel repair or anastomosis." },
          { item: "Vicryl 2/0 cutting", qty: "2", note: "" },
          { item: "Vicryl No 2 round", qty: "2", note: "Abdominal wall." }
        ]
      },
      {
        title: "Consumables",
        items: [
          {
            item: "Ceftriaxone",
            qty: "2 for adhesive obstruction; 1 for small bowel volvulus",
            note: "",
            drugId: "ceftriaxone"
          },
          {
            item: "Metronidazole IV",
            qty: "2 for adhesive obstruction; 1 for small bowel volvulus",
            note: "",
            drugId: "metronidazole"
          },
          { item: "Normal saline", qty: "5", note: "", drugId: "normal-saline" },
          { item: "IV cannula 18G (20G for small bowel volvulus)", qty: "2", note: "" },
          { item: "Surgical gloves", qty: "20", note: "" },
          { item: "Disposable gloves", qty: "10 pairs", note: "" },
          { item: "Syringe 10 cc and 5 cc", qty: "6 each", note: "" }
        ]
      },
      {
        title: "Have ready for trouble",
        items: [
          {
            item: "Wide-bore nasogastric tube on free drainage, aspirated before induction",
            qty: "1",
            note: "ADDED HERE. The single most useful object in this operation and the one that keeps the patient out of the chest after induction."
          },
          {
            item: "Bag-valve-mask, laryngoscope, spare tube, introducer, oral airway, tested suction",
            qty: "1 set",
            note: "ADDED HERE. Classic high-risk aspiration: distended bowel, raised intra-abdominal pressure, and a stomach full of faeculent fluid."
          },
          {
            item: "Potassium chloride for after the operation, once urine is flowing",
            qty: "as needed",
            note: "ADDED HERE. These patients vomit potassium out for days. Never as a bolus.",
            drugId: "potassium-chloride"
          },
          {
            item: "Extra Ringer's lactate — 3 to 4 L of it",
            qty: "3–4 L",
            note: "ADDED HERE. The deficit in obstruction is routinely underestimated; the list's 5 bags of saline go nowhere.",
            drugId: "ringers-lactate"
          },
          {
            item: "Adrenaline 1 mg diluted to 10 mL, labelled",
            qty: "1 syringe",
            note: "ADDED HERE.",
            drugId: "adrenaline"
          },
          {
            item: "Two bled donors, or two crossmatched units, if a resection is at all likely",
            qty: "2",
            note: "ADDED HERE.",
            drugId: "blood-transfusion"
          },
          {
            item: "Linen ties or bowel clamps, plus an extra 2 L of warm sterile fluid",
            qty: "—",
            note: "ADDED HERE. If you open gangrenous bowel you will need both at once."
          }
        ]
      }
    ],
    missing: [
      {
        item: "Nasogastric tube",
        substitute: "None that is safe for an anaesthetised patient.",
        note: "Do not induce a distended obstructed patient with an undecompressed stomach if an NG tube exists anywhere in the hospital — borrow one. If there is genuinely none, a spinal on a fully resuscitated patient with an awake, protected airway is safer than a relaxant GA. A urinary catheter is too short and too soft to use as a gastric tube in an adult."
      },
      {
        item: "Suxamethonium",
        substitute: "Full intubating dose of vecuronium, rocuronium or atracurium.",
        note: "Acceptable with a second airway plan ready. If there is no relaxant at all, this is a spinal (lower abdomen, resuscitated patient) or a ketamine technique with local infiltration — not a heroic attempt at a deep inhalational induction in a full stomach."
      },
      {
        item: "Neostigmine",
        substitute: "None.",
        note: "No reversal, no long-acting relaxant. Full stop. The alternative is a person on the bag for as long as it takes, and in most district theatres at night that person does not exist."
      },
      {
        item: "Ringer's lactate or saline in adequate volume",
        substitute: "Any balanced crystalloid; oral rehydration solution by nasogastric tube is NOT a substitute in obstruction.",
        note: "The operation must not start in a patient who is not passing urine, unless the bowel is dead and the obstruction is the cause of the hypovolaemia. Resuscitate to a urine output of 0.5 mL/kg/h first; one more hour of fluid is almost always the right decision here."
      },
      {
        item: "Potassium chloride",
        substitute: "None in the hours around surgery.",
        note: "You cannot correct a potassium of 2.5 with bananas and good intentions. If there is no KCl, operate anyway if the bowel is strangulated, but expect an atonic gut and arrhythmias afterwards, and do not add a diuretic to the problem."
      },
      {
        item: "Vicryl 3/0 round for the anastomosis",
        substitute: "Vicryl 2/0 round, or polyglactin/polydioxanone 3/0 if it exists.",
        note: "Use the finest absorbable suture you actually have for bowel. Plain or chromic catgut is still used for single-layer bowel anastomosis in many places and will hold, but it is the weaker choice; silk is acceptable for a seromuscular layer and should never be the only layer. Never close bowel with a non-absorbable monofilament in the lumen."
      },
      {
        item: "Ceftriaxone and metronidazole",
        substitute: "Ampicillin + gentamicin + metronidazole, or cefazolin + metronidazole.",
        note: "For simple adhesive obstruction with no suspicion of ischaemia, the honest answer is that no antibiotic is indicated at all (the app's bowel-obstruction case says the same) — so a stock-out is not a reason to cancel. For suspected strangulation, cover before the incision."
      },
      {
        item: "Suction machine",
        substitute: "Head-down lateral position, a wide-bore rigid sucker on a foot pump, and gauze on a forceps.",
        note: "Thin. Do not paralyse an obstructed patient with no means of clearing the pharynx. Position, an awake technique, or wait."
      },
      {
        item: "Diclofenac",
        substitute: "Paracetamol 1 g regularly plus titrated morphine.",
        note: "Not a loss. Withholding the NSAID in a dehydrated obstructed patient is the right thing to do anyway; a stock-out has done you a favour."
      }
    ],
    checks: [
      "Sign in: patient states their own name; operation and consent confirmed in a language they speak.",
      "Incision and any stoma site marked and agreed before draping. If the obstruction is a hernia, mark the side — and check it against the examination, not the referral letter.",
      "Allergy asked. Full stomach declared aloud; NG tube aspirated immediately before induction and the volume stated.",
      "Antibiotic prophylaxis within 60 minutes before incision where strangulation is suspected; where it is simple adhesive obstruction, say out loud that none is indicated so nobody gives it by reflex.",
      "Urine output over the last hour stated out loud before induction. Below 0.5 mL/kg/h is a reason to give more fluid, not to hurry.",
      "Potassium result known, or the decision to proceed without it stated and recorded.",
      "Blood: group known and donors identified if a resection is possible.",
      "Pulse oximeter reading, suction tested, oxygen flowing.",
      "Swab, needle and instrument count agreed before incision and again before closure.",
      "Hold the listed diclofenac: hypovolaemia, sepsis and NSAIDs are how a surgical patient leaves theatre with an acute kidney injury.",
      "Sign out: findings and procedure recorded, bowel viability documented, specimens labelled with the patient's name, and a named person given the post-operative fluid, potassium and NG plan."
    ],
    textbook: [
      {
        book: "asellaor",
        text: "Adhesive small bowel obstruction is listed under GA with vecuronium plus atropine two, and neostigmine with suxamethonium.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), ASBO - GA, pdf p. 11"
      },
      {
        book: "asellaor",
        text: "Two 18G cannulae and three ampoules of 40% dextrose are listed.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), ASBO - GA, pdf p. 11"
      },
      {
        book: "asellaor",
        text: "Sutures listed for adhesive obstruction: Vicryl 2/0 round two, Vicryl 3/0 round two, Vicryl 2/0 cutting two and Vicryl No 2 round two.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), ASBO - GA, pdf p. 11"
      },
      {
        book: "asellaor",
        text: "For small bowel volvulus the list names the tube, suction tip and ketamine together as the induction set.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), SBV, pdf p. 11"
      },
      {
        book: "asellaor",
        text: "For small bowel volvulus the antibiotic allocation drops to ceftriaxone one and IV metronidazole one.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), SBV, pdf p. 11"
      }
    ],
    sources: [
      {
        name: "Asella Referral and Teaching Hospital. List of OR materials for surgical cases, 2025 — institutional practice from a named teaching hospital, not a clinical guideline"
      },
      {
        name: "WHO Surgical Safety Checklist (2nd ed., 2009), in WHO Guidelines for Safe Surgery 2009: Safe Surgery Saves Lives"
      },
      { name: "WHO. Surgical Care at the District Hospital, 2003" }
    ],
    review: { status: "draft" }
  },
  {
    id: "sigmoid-volvulus-resection",
    name: "Laparotomy for gangrenous sigmoid volvulus",
    aka: ["gangrenous SV", "sigmoid volvulus", "Hartmann's procedure", "sigmoid resection", "colostomy"],
    urgency: "emergency",
    caseIds: ["bowel-obstruction", "peritonitis"],
    anaesthesia: "GA",
    sections: [
      {
        title: "Anaesthesia drugs",
        items: [
          {
            item: "Ketamine OR propofol",
            qty: "1",
            note: "Induction in a patient who is usually elderly, dehydrated and septic — ketamine is the kinder choice here.",
            drugId: "ketamine"
          },
          { item: "Vecuronium", qty: "1", note: "No MedBridge drug entry yet.", drugId: "vecuronium" },
          {
            item: "Suxamethonium (succinylcholine)",
            qty: "1",
            note: "No MedBridge drug entry yet.",
            drugId: "suxamethonium"
          },
          { item: "Atropine", qty: "2", note: "", drugId: "atropine" },
          { item: "Neostigmine", qty: "1", note: "No MedBridge drug entry yet.", drugId: "neostigmine" },
          { item: "Dexamethasone", qty: "1", note: "", drugId: "dexamethasone" },
          { item: "Pethidine OR morphine", qty: "1", note: "", drugId: "morphine" },
          {
            item: "Diclofenac IM",
            qty: "2",
            note: "Listed. See checks — this is the patient in whom an NSAID does most harm.",
            drugId: "diclofenac"
          },
          { item: "40 % dextrose", qty: "3", note: "", drugId: "dextrose" }
        ]
      },
      {
        title: "Instruments",
        items: [
          { item: "Endotracheal tube 6.5 (female) // 7 or 7.5 (male)", qty: "1", note: "" },
          { item: "Suction tip", qty: "1", note: "" },
          { item: "Surgical blade No. 23", qty: "2", note: "" },
          { item: "Urinary catheter 16F + urine bag", qty: "1 each", note: "" }
        ]
      },
      {
        title: "Sutures",
        items: [
          {
            item: "Vicryl 2/0 round",
            qty: "5",
            note: "The largest suture allocation in the whole document — this is a resection."
          },
          { item: "Vicryl 0 round", qty: "3", note: "" },
          { item: "Vicryl 3/0 round", qty: "2", note: "" },
          { item: "Vicryl 2/0 cutting", qty: "2", note: "" },
          { item: "Vicryl No 2 round", qty: "2", note: "Abdominal wall." },
          { item: "Catgut 2/0 round", qty: "1", note: "" }
        ]
      },
      {
        title: "Consumables",
        items: [
          { item: "Ceftriaxone", qty: "2", note: "", drugId: "ceftriaxone" },
          { item: "Metronidazole IV", qty: "2", note: "", drugId: "metronidazole" },
          {
            item: "Normal saline",
            qty: "5 bags, plus 4 more for lavage",
            note: "",
            drugId: "normal-saline"
          },
          { item: "IV cannula 18/20G", qty: "2", note: "" },
          { item: "Surgical gloves", qty: "20", note: "" },
          { item: "Disposable gloves", qty: "10 pairs", note: "" },
          { item: "Syringe 10 cc and 5 cc", qty: "6 each", note: "" }
        ]
      },
      {
        title: "Have ready for trouble",
        items: [
          {
            item: "Two crossmatched units, or two donors already bled and in the building",
            qty: "2",
            note: "ADDED HERE. The hospital list crossmatches for a thyroidectomy but not for this. Do not start a colonic resection in a septic elderly patient on the promise of blood.",
            drugId: "blood-transfusion"
          },
          {
            item: "A stoma site marked on the abdominal wall before draping, and a stoma bag (or a cut and taped plastic bag) in the room",
            qty: "1",
            note: "ADDED HERE. No appliance appears anywhere on this list. A stoma with no bag is a nursing disaster from the first hour."
          },
          {
            item: "Bowel clamps or soft linen ties, and extra towels to isolate the field",
            qty: "2 pairs",
            note: "ADDED HERE. Gangrenous sigmoid spills."
          },
          {
            item: "4 L of warm Ringer's lactate or saline for lavage, in addition to the listed bags",
            qty: "4 L",
            note: "ADDED HERE. Faecal peritonitis needs more than four bags."
          },
          {
            item: "Adrenaline 1 mg diluted to 10 mL, labelled, and a vasopressor plan",
            qty: "1 syringe",
            note: "ADDED HERE. Untwisting gangrenous bowel releases a bolus of toxic venous blood and the pressure can fall away.",
            drugId: "adrenaline"
          },
          { item: "Nylon or polypropylene No 1 for mass closure", qty: "1", note: "ADDED HERE." },
          {
            item: "Nasogastric tube 18F and a urine bag as a closed drain",
            qty: "1 each",
            note: "ADDED HERE for this operation (the document lists this improvisation for other cases)."
          }
        ]
      }
    ],
    missing: [
      {
        item: "Crossmatched blood or a willing donor",
        substitute: "None.",
        note: "Say it plainly: an elective or semi-elective sigmoid resection must not start with no blood and no donor. For established gangrene with peritonitis the calculus changes — the patient dies without the operation — so proceed, but only with the family told, a donor being bled in parallel, and the decision written in the notes with a name against it."
      },
      {
        item: "Stoma appliance",
        substitute: "A clean plastic bag cut to size and taped to the skin, changed often, with zinc or petroleum ointment on the surrounding skin.",
        note: "Crude but it works for a few days and it is what is actually done. What does not work is gauze: it wicks effluent across the wound and excoriates the skin within a day."
      },
      {
        item: "Linen or bowel clamps",
        substitute: "Umbilical tape, cotton tape, or a long artery forceps padded with a swab.",
        note: "Fine. Do not crush bowel you intend to keep with an unpadded metal clamp."
      },
      {
        item: "Suxamethonium / vecuronium / neostigmine",
        substitute: "See the perforation and obstruction packs — the same answers apply.",
        note: "No reversal agent means no long-acting relaxant. In a frail elderly patient with gangrene, a ketamine technique with spontaneous ventilation plus generous local infiltration is a legitimate plan and may be the one that gets them off the table alive."
      },
      {
        item: "Normal saline for lavage",
        substitute: "Warm Ringer's lactate.",
        note: "Never water, never non-sterile fluid, never cold fluid in an elderly septic patient — hypothermia stops clotting and this patient has little reserve."
      },
      {
        item: "Vicryl for the resection",
        substitute: "Any absorbable suture of the right size; catgut 2/0 for the mesentery and peritoneum.",
        note: "If you are down to catgut only, do a Hartmann's with a stoma rather than a primary anastomosis. A hand-sewn anastomosis in faecal peritonitis with the weakest suture in the cupboard is a leak waiting to happen; a stoma is not a failure."
      },
      {
        item: "Ceftriaxone or metronidazole",
        substitute: "Ampicillin + gentamicin + metronidazole; chloramphenicol if there is no metronidazole at all.",
        note: "Watch gentamicin in an elderly patient with a low urine output. Source control and lavage do more here than the choice of antibiotic."
      },
      {
        item: "Warming — blankets, warmed fluids, a theatre that is not cold",
        substitute: "Plastic sheeting or bubble wrap over the exposed limbs and head, fluid bags warmed in a bowl of hand-hot water, and the theatre door shut.",
        note: "Not optional in a long open abdomen in an old person. Check the fluid against your own forearm — a fluid 'warmed' on a radiator can scald."
      }
    ],
    checks: [
      "Sign in: patient states their own name; operation and consent confirmed, including that a stoma is possible and what that means.",
      "Stoma site marked on the abdominal wall, away from the costal margin, the belt line and any scar, with the patient sitting if they can.",
      "Allergy asked. Full stomach declared; NG tube aspirated immediately before induction.",
      "Antibiotic prophylaxis given within 60 minutes before the skin incision — state the time it was given.",
      "Blood: state out loud how many units are in the fridge and how many donors are in the building. If the answer is none, the surgeon says whether they are still proceeding and why, and it is written down.",
      "Urine output and the last potassium stated before induction.",
      "Pulse oximeter reading, suction tested, oxygen flowing, patient actively being kept warm.",
      "Swab, needle, blade and instrument count agreed before the incision and repeated and agreed before closure — a long resection with lavage is where counts go wrong.",
      "The listed diclofenac is held in this patient: elderly, septic, hypovolaemic. Paracetamol and titrated morphine instead.",
      "Sign out: findings, resection margins, whether an anastomosis or a stoma was done, specimens labelled with the patient's name, and a named person given the stoma, fluid and potassium plan."
    ],
    textbook: [
      {
        book: "asellaor",
        text: "Gangrenous sigmoid volvulus carries the largest suture allocation on the list, with Vicryl 2/0 round five packets.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Gangrenous SV - GA, pdf p. 11"
      },
      {
        book: "asellaor",
        text: "Vicryl 0 round three packets are listed in addition.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Gangrenous SV - GA, pdf p. 11"
      },
      {
        book: "asellaor",
        text: "Four extra bags of normal saline are listed for lavage.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Gangrenous SV - GA, pdf p. 11"
      },
      {
        book: "asellaor",
        text: "Ceftriaxone two and IV metronidazole two are listed.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Gangrenous SV - GA, pdf p. 11"
      }
    ],
    sources: [
      {
        name: "Asella Referral and Teaching Hospital. List of OR materials for surgical cases, 2025 — institutional practice from a named teaching hospital, not a clinical guideline"
      },
      {
        name: "WHO Surgical Safety Checklist (2nd ed., 2009), in WHO Guidelines for Safe Surgery 2009: Safe Surgery Saves Lives"
      },
      { name: "WHO. Surgical Care at the District Hospital, 2003" }
    ],
    review: { status: "draft" }
  },
  {
    id: "appendicectomy",
    name: "Appendicectomy (and appendiceal abscess)",
    aka: ["appendectomy", "open appendicectomy", "appendicitis", "appendiceal abscess"],
    urgency: "emergency",
    caseIds: ["peritonitis"],
    anaesthesia: "spinal",
    sections: [
      {
        title: "Anaesthesia drugs",
        items: [
          {
            item: "Bupivacaine (spinal)",
            qty: "1",
            note: "The hospital lists a spinal for a simple appendicectomy. Heavy 0.5 % is what is used intrathecally.",
            drugId: "bupivacaine"
          },
          {
            item: "Diclofenac IM",
            qty: "2",
            note: "Listed. No MedBridge drug entry yet.",
            drugId: "diclofenac"
          },
          { item: "40 % dextrose", qty: "2", note: "", drugId: "dextrose" }
        ]
      },
      {
        title: "Instruments",
        items: [
          { item: "Spinal needle", qty: "1", note: "" },
          { item: "Surgical blade No. 23", qty: "2", note: "" },
          { item: "Urinary catheter 16F (2-way) + urine bag", qty: "1 each", note: "" },
          {
            item: "Nasogastric tube 18F + urine bag (appendiceal abscess only)",
            qty: "1 each",
            note: "Used as the closed drain after drainage of an abscess."
          }
        ]
      },
      {
        title: "Sutures",
        items: [
          { item: "Vicryl 2/0 round", qty: "3", note: "" },
          { item: "Vicryl 2/0 cutting", qty: "1", note: "Skin." },
          { item: "Vicryl No 2 round", qty: "1", note: "" },
          { item: "Catgut 2/0 round", qty: "1", note: "" },
          {
            item: "Silk 2/0 cutting",
            qty: "1 (appendiceal abscess only)",
            note: "Listed additionally for the abscess case, to secure the drain."
          }
        ]
      },
      {
        title: "Consumables",
        items: [
          { item: "Ceftriaxone", qty: "2", note: "", drugId: "ceftriaxone" },
          { item: "Metronidazole", qty: "2", note: "", drugId: "metronidazole" },
          { item: "IV cannula 18/20G", qty: "2", note: "" },
          { item: "Normal saline", qty: "4", note: "", drugId: "normal-saline" },
          { item: "Surgical gloves", qty: "20", note: "" },
          { item: "Disposable gloves", qty: "5 pairs", note: "" },
          { item: "Syringe 10 cc and 5 cc", qty: "6 each", note: "" }
        ]
      },
      {
        title: "Have ready for trouble",
        items: [
          {
            item: "Full GA kit — airway, relaxant, induction agent — even though this is listed as a spinal",
            qty: "1 set",
            note: "ADDED HERE. The hospital itself says general anaesthesia is preferred for an appendiceal abscess, and a spinal that is too low or a mass in the right iliac fossa can turn a 40-minute operation into a laparotomy."
          },
          {
            item: "Ketamine, with atropine",
            qty: "1 each",
            note: "ADDED HERE. The rescue if the spinal fails or the incision has to be extended.",
            drugId: "ketamine"
          },
          {
            item: "A vasopressor plan for spinal hypotension, and 500–1000 mL of crystalloid co-loading",
            qty: "1 L",
            note: "ADDED HERE. Nothing on this list treats the blood pressure drop that a spinal causes.",
            drugId: "ringers-lactate"
          },
          {
            item: "Adrenaline 1 mg diluted to 10 mL (100 mcg/mL) as a push-dose vasopressor",
            qty: "1 syringe",
            note: "ADDED HERE, where no ephedrine or phenylephrine exists — the app's caesarean case uses the same workaround.",
            drugId: "adrenaline"
          },
          {
            item: "Oxygen and a bag-valve-mask within arm's reach of the head",
            qty: "1",
            note: "ADDED HERE. A spinal that climbs too high is an airway emergency.",
            drugId: "oxygen"
          },
          {
            item: "A second pack of swabs and a retractor set, in case of perforation and pus",
            qty: "—",
            note: "ADDED HERE."
          }
        ]
      }
    ],
    missing: [
      {
        item: "Spinal needle",
        substitute: "A sterile 22G lumbar puncture needle from the medical ward, if it is long enough for this patient.",
        note: "A short hypodermic needle is NOT a spinal needle: it will not reach the subarachnoid space in most adults, it is too flexible to direct, and its cutting bevel raises the headache rate. If there is no lumbar puncture needle either, change the plan — ketamine anaesthesia with atropine, or local infiltration for a thin patient with a short operation. Do not improvise a needle."
      },
      {
        item: "Heavy (hyperbaric) bupivacaine",
        substitute: "Plain 0.5 % bupivacaine intrathecally, 2.5–3 mL.",
        note: "It works but spreads less predictably, so the block height is harder to control — position carefully and check the level before incision. Do NOT substitute 5 % hyperbaric lidocaine (cauda equina syndrome), and never inject any solution containing adrenaline or a preservative into the subarachnoid space. If only lidocaine with adrenaline is in the cupboard, there is no spinal: use ketamine."
      },
      {
        item: "Metronidazole",
        substitute: "Ceftriaxone alone for a non-perforated appendix; chloramphenicol if there is no metronidazole and the appendix is perforated.",
        note: "For a simple appendicectomy a single pre-operative dose of any agent covering Gram-negatives and anaerobes is enough and a stock-out is not a reason to cancel. For perforated appendicitis the anaerobic cover matters — but so does washing out the right iliac fossa."
      },
      {
        item: "Ceftriaxone",
        substitute: "Ampicillin 2 g + gentamicin, or cefazolin 2 g, with metronidazole.",
        note: "Any of these is an acceptable single pre-operative dose. Give it within 60 minutes before the incision; a dose given as the appendix comes out has achieved nothing."
      },
      {
        item: "Vicryl for the appendix stump",
        substitute: "Catgut 2/0 round — which the hospital lists anyway.",
        note: "Entirely acceptable for ligating the stump and the mesoappendix. Do not use a non-absorbable suture where it will sit in the caecal lumen."
      },
      {
        item: "Urinary catheter",
        substitute: "Ask the patient to empty their bladder before the spinal.",
        note: "A simple appendicectomy does not need a catheter. Catheterising for convenience buys a urinary infection; the list includes one, but the better practice is to leave it out and watch for retention after the spinal."
      },
      {
        item: "A drain for an appendiceal abscess",
        substitute: "An 18F nasogastric tube into a urine bag, secured with silk — which is what this hospital lists and does.",
        note: "A sound closed system. A sterile glove finger is not a drain, and a drain is not a substitute for adequate washout. Take it out as soon as it stops draining."
      },
      {
        item: "Anaesthetic capability for conversion to laparotomy",
        substitute: "None.",
        note: "If the only anaesthesia available is a single spinal with no means of converting to a general anaesthetic, do not start on a patient with a mass, a long history or generalised peritonitis — those are the ones that become laparotomies. For a short-history, localised appendicitis in a fit young patient, a spinal alone is reasonable."
      }
    ],
    checks: [
      "Sign in: patient states their own name; the operation and the consent confirmed, including that the incision may have to be extended.",
      "Site and side: right iliac fossa, agreed and marked. Pregnancy excluded or declared in any woman of childbearing age.",
      "Allergy asked. Fasting status and aspiration risk stated aloud.",
      "Antibiotic prophylaxis given within 60 minutes before the skin incision — state the time.",
      "Blood: group known. Crossmatch is not routinely needed for a simple appendicectomy; say so explicitly rather than leaving it unspoken.",
      "Before the spinal: IV running, co-load started, vasopressor drawn up and labelled, and the block level checked before the knife.",
      "Pulse oximeter on and reading. Oxygen and a bag-valve-mask at the head end.",
      "Swab, needle and instrument count agreed with the scrub nurse before the incision and again before closure.",
      "Appendix specimen labelled with the patient's name and placed in formalin before it leaves the room, where histology exists.",
      "Sign out: findings recorded (perforated or not — it changes the antibiotic course), drain documented if one was left, and a named person given the plan."
    ],
    textbook: [
      {
        book: "asellaor",
        text: "Simple appendicectomy is listed under spinal anaesthesia: one spinal needle and one bupivacaine.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Simple Appendectomy - SA, pdf p. 10"
      },
      {
        book: "asellaor",
        text: "Ceftriaxone two, metronidazole two and two 18/20G cannulae are listed.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Simple Appendectomy - SA, pdf p. 10"
      },
      {
        book: "asellaor",
        text: "Sutures listed: Vicryl 2/0 round three, Vicryl 2/0 cutting one and Vicryl No 2 round one.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Simple Appendectomy - SA, pdf p. 10"
      },
      {
        book: "asellaor",
        text: "For an appendiceal abscess the hospital states that general anaesthesia is preferred.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Appendiceal Abscess - SA or GA, pdf p. 10"
      },
      {
        book: "asellaor",
        text: "The drain for an appendiceal abscess is an 18F nasogastric tube connected to a urine bag.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Appendiceal Abscess - SA or GA, pdf p. 10"
      }
    ],
    sources: [
      {
        name: "Asella Referral and Teaching Hospital. List of OR materials for surgical cases, 2025 — institutional practice from a named teaching hospital, not a clinical guideline"
      },
      {
        name: "WHO Surgical Safety Checklist (2nd ed., 2009), in WHO Guidelines for Safe Surgery 2009: Safe Surgery Saves Lives"
      },
      { name: "WHO. Surgical Care at the District Hospital, 2003" }
    ],
    review: { status: "draft" }
  },
  {
    id: "inguinal-hernia-repair",
    name: "Inguinal hernia repair",
    aka: ["herniorrhaphy", "hernioplasty", "groin hernia", "strangulated hernia", "inguinal hernia"],
    urgency: "both",
    caseIds: ["bowel-obstruction"],
    anaesthesia: "spinal",
    sections: [
      {
        title: "Anaesthesia drugs",
        items: [
          { item: "Bupivacaine (spinal)", qty: "1", note: "", drugId: "bupivacaine" },
          {
            item: "Diclofenac IM",
            qty: "2",
            note: "Listed. No MedBridge drug entry yet.",
            drugId: "diclofenac"
          },
          { item: "40 % dextrose", qty: "3", note: "", drugId: "dextrose" }
        ]
      },
      {
        title: "Instruments",
        items: [
          { item: "Spinal needle", qty: "1", note: "" },
          { item: "Surgical blade No. 23", qty: "2", note: "" },
          { item: "Urinary catheter 16F (2-way) + urine bag", qty: "1 each", note: "" }
        ]
      },
      {
        title: "Sutures",
        items: [
          {
            item: "Vicryl No 2 round",
            qty: "4",
            note: "The floor of the canal — the largest heavy-suture allocation of any elective case on the list."
          },
          { item: "Vicryl 2/0 round", qty: "3", note: "" },
          { item: "Vicryl 2/0 cutting", qty: "1", note: "Skin." }
        ]
      },
      {
        title: "Consumables",
        items: [
          { item: "Ceftriaxone", qty: "2", note: "", drugId: "ceftriaxone" },
          { item: "IV cannula 18/20G", qty: "2", note: "" },
          { item: "Normal saline", qty: "4", note: "", drugId: "normal-saline" },
          { item: "Surgical gloves", qty: "20", note: "" },
          { item: "Disposable gloves", qty: "5 pairs", note: "" },
          { item: "Syringe 10 cc and 5 cc", qty: "6 each", note: "" }
        ]
      },
      {
        title: "Have ready for trouble",
        items: [
          {
            item: "A plan and the kit for conversion to a laparotomy, if the hernia is obstructed or strangulated",
            qty: "1 set",
            note: "ADDED HERE. A strangulated hernia that reduces into the abdomen with dead bowel inside it is the emergency this list does not cover. Have the laparotomy tray in the room, not in the store."
          },
          {
            item: "Ketamine, with atropine",
            qty: "1 each",
            note: "ADDED HERE, as the rescue for a failed spinal or an extended operation.",
            drugId: "ketamine"
          },
          {
            item: "Crystalloid co-load and a push-dose vasopressor drawn up before the block",
            qty: "1 L",
            note: "ADDED HERE. Spinal hypotension matters more in the elderly men who make up most of this list.",
            drugId: "ringers-lactate"
          },
          {
            item: "Lidocaine 1 % for a field block and for wound infiltration before closure",
            qty: "20 mL",
            note: "ADDED HERE. Also the whole anaesthetic, if the spinal is not an option.",
            drugId: "lidocaine"
          },
          {
            item: "Oxygen and a bag-valve-mask at the head end",
            qty: "1",
            note: "ADDED HERE.",
            drugId: "oxygen"
          },
          {
            item: "Metronidazole, if bowel turns out to be involved",
            qty: "1",
            note: "ADDED HERE. The hospital lists no anaerobic cover for this operation, which is right for a clean repair and wrong the moment you find gut in the sac.",
            drugId: "metronidazole"
          }
        ]
      }
    ],
    missing: [
      {
        item: "Mesh",
        substitute: "A tissue repair — Bassini, Shouldice or Desarda — with a non-absorbable suture.",
        note: "No mesh appears anywhere on this hospital's list, so a tissue repair is already the local standard and is a perfectly respectable operation. Sterilised polyester/polyethylene mosquito-net mesh has been tested against commercial mesh in randomised trials in low-income settings and performed comparably — but that is a departure for the surgical team to adopt deliberately, with the right material and a validated sterilisation cycle. It is not something to improvise from a window screen on the day."
      },
      {
        item: "Vicryl No 2 for the repair",
        substitute: "Nylon or polypropylene 1 or 2/0, or Vicryl 0.",
        note: "For a tissue repair a non-absorbable monofilament is arguably the better choice, since the repair must hold for life. Do not repair the floor of the inguinal canal with catgut: it is gone before the scar has strength, and the hernia comes back."
      },
      {
        item: "Spinal needle or spinal bupivacaine",
        substitute: "Local anaesthesia — an ilioinguinal and iliohypogastric field block plus layer-by-layer infiltration with lidocaine 1 % (up to 3 mg/kg plain, 7 mg/kg with adrenaline).",
        note: "This is a genuinely good substitution, not a compromise: local anaesthesia for inguinal hernia is a long-established technique, it avoids spinal hypotension and urinary retention in elderly men, and it lets the patient strain to test the repair. It is not adequate for a strangulated hernia needing bowel resection."
      },
      {
        item: "Ceftriaxone",
        substitute: "Cefazolin 2 g, or ampicillin 2 g, as a single dose before incision — or no antibiotic at all.",
        note: "For a clean elective tissue repair with no mesh, prophylaxis is of marginal benefit and a stock-out is not a reason to cancel. For an emergency strangulated hernia, give it, and add anaerobic cover."
      },
      {
        item: "Urinary catheter",
        substitute: "Ask the patient to void before the spinal; watch for retention afterwards.",
        note: "A short hernia repair does not need a catheter. Elderly men with prostates do develop retention after a spinal — that is an argument for watching and catheterising if needed, not for catheterising everyone."
      },
      {
        item: "Diclofenac",
        substitute: "Paracetamol 1 g regularly, plus wound infiltration with bupivacaine or lidocaine at closure.",
        note: "Local infiltration before closure is the best analgesic on this list and costs almost nothing. In an elderly man, skipping the NSAID protects his kidneys."
      },
      {
        item: "Theatre capacity for the emergency case",
        substitute: "None.",
        note: "A tender irreducible hernia with obstruction is not an operation to postpone to the elective list. If the theatre, the anaesthesia or the ability to resect bowel is not there tonight, that patient is a transfer now — not a reduction attempt under sedation, which can push dead bowel back into the abdomen and hide it."
      }
    ],
    checks: [
      "Sign in: patient states their own name; the operation and the consent confirmed.",
      "SIDE. Left or right, confirmed with the patient, examined by the operating surgeon, and marked on the skin before the drapes go on. Wrong-side hernia repair is one of the commonest wrong-site operations there is.",
      "Allergy asked. Fasting status stated.",
      "Whether this is elective or emergency said out loud, and whether bowel may need resection.",
      "Antibiotic prophylaxis decision stated: given within 60 minutes before incision, or explicitly not indicated for a clean no-mesh repair.",
      "Before the spinal: IV running, co-load started, vasopressor drawn up and labelled. Bladder emptied.",
      "Pulse oximeter on and reading. Oxygen and a bag-valve-mask at the head end.",
      "What repair is planned, and with which suture, agreed with the scrub nurse before the incision.",
      "Swab, needle and instrument count agreed before the incision and again before closure.",
      "Sign out: the repair performed recorded, bowel viability documented if the sac contained gut, and lifting and follow-up advice given to the patient in their own language."
    ],
    textbook: [
      {
        book: "asellaor",
        text: "Inguinal hernia repair is listed under spinal anaesthesia with one spinal needle and one bupivacaine.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Inguinal Hernia- SA, pdf p. 7"
      },
      {
        book: "asellaor",
        text: "Ceftriaxone two and two 18/20G cannulae are listed.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Inguinal Hernia- SA, pdf p. 7"
      },
      {
        book: "asellaor",
        text: "The repair sutures listed are Vicryl No 2 round four, Vicryl 2/0 round three and Vicryl 2/0 cutting one.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Inguinal Hernia- SA, pdf p. 7"
      },
      {
        book: "asellaor",
        text: "A 16F two-way catheter is listed with a urine bag.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Inguinal Hernia- SA, pdf p. 7"
      }
    ],
    sources: [
      {
        name: "Asella Referral and Teaching Hospital. List of OR materials for surgical cases, 2025 — institutional practice from a named teaching hospital, not a clinical guideline"
      },
      {
        name: "WHO Surgical Safety Checklist (2nd ed., 2009), in WHO Guidelines for Safe Surgery 2009: Safe Surgery Saves Lives"
      },
      { name: "WHO. Surgical Care at the District Hospital, 2003" },
      {
        name: "Löfgren J et al. A randomized trial of low-cost mesh in groin hernia repair. N Engl J Med 2016;374:146–153"
      }
    ],
    review: { status: "draft" }
  },
  {
    id: "perianal-abscess-drainage",
    name: "Incision and drainage of a perianal abscess",
    aka: ["I&D", "incision and drainage", "perianal abscess", "perirectal abscess", "anal abscess"],
    urgency: "emergency",
    caseIds: ["abscess"],
    anaesthesia: "spinal",
    sections: [
      {
        title: "Anaesthesia drugs",
        items: [
          { item: "Bupivacaine (spinal)", qty: "1", note: "", drugId: "bupivacaine" },
          {
            item: "Diclofenac IM",
            qty: "2",
            note: "Listed. No MedBridge drug entry yet.",
            drugId: "diclofenac"
          },
          {
            item: "40 % dextrose",
            qty: "1",
            note: "A single ampoule — the smallest allocation on the list, which matches the length of the operation.",
            drugId: "dextrose"
          }
        ]
      },
      {
        title: "Instruments",
        items: [
          { item: "Spinal needle", qty: "1", note: "" },
          { item: "Surgical blade No. 23", qty: "2", note: "" },
          { item: "Urinary catheter 16F (2-way) + urine bag", qty: "1 each", note: "" }
        ]
      },
      {
        title: "Sutures",
        items: [
          {
            item: "None listed for this operation",
            qty: "—",
            note: "Correct: a perianal abscess cavity is laid open and left open to heal by secondary intention. Nothing here should be closed."
          }
        ]
      },
      {
        title: "Consumables",
        items: [
          { item: "Ceftriaxone", qty: "2", note: "", drugId: "ceftriaxone" },
          { item: "Metronidazole", qty: "2", note: "", drugId: "metronidazole" },
          {
            item: "Hydrogen peroxide",
            qty: "2",
            note: "Listed for washing out the cavity. No MedBridge drug entry — and see the substitutions below."
          },
          { item: "IV cannula 18/20G", qty: "2", note: "" },
          { item: "Normal saline", qty: "4", note: "", drugId: "normal-saline" },
          { item: "Surgical gloves", qty: "20", note: "" },
          { item: "Disposable gloves", qty: "5 pairs", note: "" },
          { item: "Syringe 10 cc and 5 cc", qty: "4 each", note: "" }
        ]
      },
      {
        title: "Have ready for trouble",
        items: [
          {
            item: "Ketamine, with atropine",
            qty: "1 each",
            note: "ADDED HERE. The practical fallback where no spinal is possible, and in a child. Infected perianal tissue is acidic and exquisitely tender — local infiltration alone usually buys an inadequate drainage.",
            drugId: "ketamine"
          },
          {
            item: "Sterile gauze for a loose dressing, and a specimen pot for pus",
            qty: "—",
            note: "ADDED HERE. Nothing on the list collects a specimen, and this is the operation where culture changes the antibiotic."
          },
          {
            item: "A sitz bath or a clean basin, and an explanation of twice-daily salt-water soaks",
            qty: "1",
            note: "ADDED HERE. The after-care, not the operation, is what determines whether this heals."
          },
          {
            item: "Blood glucose stick, and a plan if it is high",
            qty: "1",
            note: "ADDED HERE. A perianal abscess is how undiagnosed diabetes announces itself, and a necrotising perineal infection is how it kills.",
            drugId: "dextrose"
          },
          {
            item: "Oxygen and a bag-valve-mask at the head end",
            qty: "1",
            note: "ADDED HERE.",
            drugId: "oxygen"
          },
          {
            item: "Paracetamol and a titrated opioid prescribed before the patient wakes",
            qty: "—",
            note: "ADDED HERE. The first bowel movement after this operation is the worst pain of the illness and it is routinely untreated.",
            drugId: "paracetamol"
          }
        ]
      }
    ],
    missing: [
      {
        item: "Hydrogen peroxide",
        substitute: "Warm sterile saline, in volume, with the cavity broken down by a gloved finger.",
        note: "No loss at all. Saline irrigation plus adequate deroofing is the treatment. Never inject hydrogen peroxide under pressure into a closed cavity or a fistula — it foams, it has caused gas embolism and tissue injury, and it does nothing that opening the cavity properly does not do better."
      },
      {
        item: "Spinal needle or spinal bupivacaine",
        substitute: "Ketamine 1–2 mg/kg IV with atropine, or 4–5 mg/kg IM, with someone watching the airway.",
        note: "Say it plainly: local infiltration is usually not adequate for a perianal abscess — the tissue is inflamed, the drug does not work well in it, and the result is a frightened patient and a half-drained cavity, which is the commonest reason these come back. If you have neither a spinal nor ketamine, a small superficial abscess can be opened under local; a deep or horseshoe abscess cannot, and should wait for proper anaesthesia or be transferred."
      },
      {
        item: "Ceftriaxone or metronidazole",
        substitute: "None needed for most cases.",
        note: "An abscess is cured by drainage, not by antibiotics — the app's abscess case says exactly this. Antibiotics are for surrounding cellulitis, systemic sepsis, diabetes or immunosuppression. So a stock-out does not delay this operation by one minute."
      },
      {
        item: "Urinary catheter",
        substitute: "Ask the patient to void before the spinal.",
        note: "Not needed for a drainage. Keep the catheter for the patient who goes into retention afterwards."
      },
      {
        item: "A drain or a packing strip",
        substitute: "A loose strip of sterile gauze, or nothing at all with a cruciate deroofing incision.",
        note: "A perianal abscess needs a hole that stays open, not a tight pack. Tight packing hurts, stops drainage and delays healing. Do not use a glove finger as a drain here."
      },
      {
        item: "Sitz bath facilities at home",
        substitute: "A clean plastic basin and boiled, cooled salted water twice a day and after every stool.",
        note: "Teach it before discharge and watch the patient repeat it back. This is the part of the treatment the patient does."
      },
      {
        item: "Theatre availability tonight",
        substitute: "None for a septic or diabetic patient, or for any perineal infection with crepitus, skin necrosis or pain out of all proportion.",
        note: "That is necrotising perineal infection, not a simple abscess, and the operation is a wide debridement now — it must not be put on tomorrow's list. For a small, fluctuant, well patient, drainage first thing in the morning under proper anaesthesia is reasonable."
      }
    ],
    checks: [
      "Sign in: patient states their own name; the operation and the consent confirmed, including that the wound will be left open and will need daily care.",
      "Site and side confirmed and marked: which side of the anus, and how far from it. Examine the patient yourself on the table before you incise.",
      "Allergy asked. Fasting status stated.",
      "Blood glucose checked and stated out loud — this is the operation that finds the diabetes.",
      "Antibiotics: give a single pre-operative dose if there is cellulitis, sepsis, diabetes or immunosuppression, within 60 minutes before the incision; otherwise say out loud that none is indicated so nobody gives it by reflex.",
      "Blood: not routinely needed. Say so rather than leaving it unspoken.",
      "Before the spinal: IV running, co-load started, vasopressor drawn up. Pulse oximeter on and reading.",
      "Pus sent for culture where a laboratory exists, labelled with the patient's name before it leaves the room.",
      "Swab and instrument count agreed before the incision and again at the end — and say out loud whether anything has been left in the cavity and what it is.",
      "Sign out: the extent of the cavity recorded, whether a fistula was identified (and that it was NOT laid open blindly across the sphincter), the dressing plan, and the sitz bath instructions given in the patient's own language."
    ],
    textbook: [
      {
        book: "asellaor",
        text: "Perianal abscess drainage is listed under spinal anaesthesia with one spinal needle and one bupivacaine.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Perianal abscess- SA, pdf p. 10"
      },
      {
        book: "asellaor",
        text: "One ampoule of 40% dextrose, 20 surgical gloves and four bags of normal saline are listed.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Perianal abscess- SA, pdf p. 10"
      },
      {
        book: "asellaor",
        text: "Four 10 cc and four 5 cc syringes are listed.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Perianal abscess- SA, pdf p. 10"
      },
      {
        book: "asellaor",
        text: "A 16F two-way catheter and two bottles of hydrogen peroxide are listed for this operation.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), Perianal abscess- SA, pdf p. 10"
      }
    ],
    sources: [
      {
        name: "Asella Referral and Teaching Hospital. List of OR materials for surgical cases, 2025 — institutional practice from a named teaching hospital, not a clinical guideline"
      },
      {
        name: "WHO Surgical Safety Checklist (2nd ed., 2009), in WHO Guidelines for Safe Surgery 2009: Safe Surgery Saves Lives"
      },
      { name: "WHO. Surgical Care at the District Hospital, 2003" }
    ],
    review: { status: "draft" }
  },
  {
    id: "burr-hole-csdh",
    name: "Burr hole drainage of a chronic subdural haematoma",
    aka: ["burrhole", "burr hole", "CSDH", "chronic subdural haematoma", "subdural drainage"],
    urgency: "both",
    caseIds: ["raised-icp", "trauma"],
    anaesthesia: "sedation",
    sections: [
      {
        title: "Anaesthesia drugs",
        items: [
          {
            item: "Lidocaine with adrenaline",
            qty: "1",
            note: "Scalp infiltration — this is the anaesthetic for the operation.",
            drugId: "lidocaine"
          },
          {
            item: "Diazepam IV",
            qty: "2",
            note: "Sedation. The hospital lists this operation under sedation, not general anaesthesia.",
            drugId: "diazepam"
          },
          {
            item: "Pethidine IV",
            qty: "1",
            note: "Analgesia. No MedBridge drug entry for pethidine — morphine is the available equivalent.",
            drugId: "pethidine"
          },
          { item: "40 % dextrose", qty: "3", note: "", drugId: "dextrose" }
        ]
      },
      {
        title: "Instruments",
        items: [
          { item: "Surgical blade No. 23", qty: "3", note: "" },
          { item: "Surgical blade No. 15", qty: "1", note: "For the dural opening." },
          { item: "Urinary catheter 16F + urine bag", qty: "1 each", note: "" },
          {
            item: "Nasogastric tube 8F or 10F + urine bag",
            qty: "1 each",
            note: "The subdural drain: a fine nasogastric tube led into a urine bag as a closed, measurable system."
          }
        ]
      },
      {
        title: "Sutures",
        items: [
          { item: "Silk 2/0 cutting", qty: "2", note: "Scalp closure and securing the drain." },
          { item: "Vicryl 2/0 round", qty: "1", note: "" }
        ]
      },
      {
        title: "Consumables",
        items: [
          { item: "Ceftriaxone", qty: "2", note: "", drugId: "ceftriaxone" },
          { item: "Hydrogen peroxide", qty: "2", note: "No MedBridge drug entry." },
          { item: "IV cannula 18/20G", qty: "2", note: "" },
          {
            item: "Normal saline",
            qty: "5",
            note: "Also what the subdural space is irrigated with — it must be warm and sterile.",
            drugId: "normal-saline"
          },
          { item: "Surgical gloves", qty: "20", note: "" },
          { item: "Syringe 10 cc and 5 cc", qty: "6 each", note: "" }
        ]
      },
      {
        title: "Have ready for trouble",
        items: [
          {
            item: "Oxygen, a bag-valve-mask and working suction at the head end before any sedation is given",
            qty: "1 set",
            note: "ADDED HERE. Diazepam plus pethidine in an elderly patient with a head injury is a respiratory arrest waiting for an audience. Nothing on this list rescues it.",
            drugId: "oxygen"
          },
          {
            item: "Naloxone",
            qty: "1",
            note: "ADDED HERE, drawn up and labelled, for the pethidine.",
            drugId: "naloxone"
          },
          {
            item: "A pulse oximeter with an audible tone, watched by a named person who is doing nothing else",
            qty: "1",
            note: "ADDED HERE. Sedation without a dedicated observer is the single most dangerous thing on this page."
          },
          {
            item: "Warm sterile saline for irrigation of the subdural space, in a bowl",
            qty: "500 mL",
            note: "ADDED HERE. Cold irrigation of the brain surface is avoidable harm."
          },
          {
            item: "Bone wax or a crushed gelatin sponge, and bipolar or fine ties for the scalp edges",
            qty: "—",
            note: "ADDED HERE. The scalp and the skull edge bleed and the list offers nothing for it."
          },
          {
            item: "Mannitol or hypertonic saline, if the patient deteriorates before you are in",
            qty: "1",
            note: "ADDED HERE, as a bridge only, and only after the blood pressure is secure.",
            drugId: "mannitol"
          }
        ]
      }
    ],
    missing: [
      {
        item: "A skull perforator, Hudson brace or craniotome",
        substitute: "None.",
        note: "Say it plainly: there is no substitute and this is the item that stops the operation. A workshop drill, a hand brace with an engineering bit, or a Steinmann pin and a hammer do not have a stop and will plunge through the dura into the brain. If there is no perforator, this patient is a transfer, not an improvisation — and the time to find that out is before the head is shaved."
      },
      {
        item: "Lidocaine with adrenaline",
        substitute: "Plain lidocaine 1 % for the scalp, with more swabs, Raney clips or artery forceps on the skin edges, and a scalp pressure stitch.",
        note: "Workable, but expect brisk bleeding from a scalp that is normally controlled by the adrenaline. You CAN make 1:200,000 by adding 0.1 mL of adrenaline 1:1000 to 20 mL of lidocaine — this is the substitution on this page I am least comfortable with, because a tenfold dilution error puts a vasoconstrictor into a scalp at 1:20,000 and into an elderly, often hypertensive patient. Use the commercial pre-mix whenever it exists; if you must dilute, do it with a 1 mL syringe, label the pot, and have a second person check the arithmetic out loud."
      },
      {
        item: "Diazepam or pethidine",
        substitute: "Often nothing is needed.",
        note: "A good scalp block is the anaesthetic; a drowsy patient with a chronic subdural does not need sedating at all, and sedation makes the neurological examination — the thing you are watching — impossible to interpret. If sedation is genuinely required, ketamine 0.3–0.5 mg/kg IV with atropine preserves respiration and airway reflexes better than a benzodiazepine-plus-opioid combination, which is the pairing most likely to stop this patient breathing."
      },
      {
        item: "A fine subdural drain",
        substitute: "An 8F or 10F nasogastric tube into a urine bag — which is what this hospital lists and does.",
        note: "A sound improvisation: soft, fine, multiple side holes, and a closed system you can measure. Do NOT use a stiff or large-bore tube against the cortex, and do not apply suction to a subdural drain. Keep the bag below head level and never lift it above the patient."
      },
      {
        item: "CT or ultrasound imaging",
        substitute: "Clinical localisation.",
        note: "An exploratory burr hole without imaging is justifiable only in a patient who is deteriorating, has a lateralising sign such as a dilated pupil, and cannot be transferred in time — and it goes on the side of the dilated pupil. It is not a procedure to do speculatively on a confused elderly patient, and 'no scanner' is not a reason to make a hole in a skull on a hunch."
      },
      {
        item: "Hydrogen peroxide",
        substitute: "Warm sterile saline.",
        note: "No loss. Never irrigate an open cranium or the subdural space with hydrogen peroxide."
      },
      {
        item: "Ceftriaxone",
        substitute: "Cefazolin 2 g, or cloxacillin, as a single dose before the incision.",
        note: "Prophylaxis for a clean cranial operation should cover skin organisms. Ceftriaxone is a wide-spectrum stand-in rather than the ideal agent, but it is what is on the shelf."
      },
      {
        item: "Post-operative nursing able to do hourly neurological observations",
        substitute: "None.",
        note: "This is as important as the perforator. A drained subdural that re-accumulates or bleeds shows itself as a falling conscious level over hours. If nobody can check the pupils and the conscious level hourly overnight, the operation has only moved the risk, and the family and the on-call doctor need to be told exactly that."
      }
    ],
    checks: [
      "Sign in: patient states their own name if they can, and a relative confirms it if they cannot. Consent from the patient or, where they lack capacity, from the family, with the conversation recorded.",
      "SIDE. The side of the haematoma confirmed against the imaging AND the examination, by the operating surgeon, and marked on the scalp before shaving and draping. A burr hole on the wrong side is a catastrophe that has happened in every country.",
      "Baseline conscious level and pupils recorded immediately before anything is given, and the time written down.",
      "Allergy asked. Anticoagulants, antiplatelets and traditional remedies asked about specifically — these patients are often on something.",
      "Antibiotic prophylaxis given within 60 minutes before the skin incision.",
      "Blood: group known. Crossmatch is not routine for a burr hole, but say out loud what the plan is if the brain bleeds.",
      "Sedation: a named person, doing nothing else, watching the oximeter and the breathing. Oxygen, bag-valve-mask, suction and naloxone laid out before the first dose.",
      "The perforator shown to be present and working BEFORE the scalp is incised.",
      "Swab, needle, blade and instrument count agreed before the incision and again before closure, and the drain documented by type and length.",
      "Sign out: the side operated on, the amount and appearance drained, the drain in place, and a named person told that this patient needs hourly conscious level and pupil checks and what to do if they fall."
    ],
    textbook: [
      {
        book: "asellaor",
        text: "The hospital lists burr-hole drainage of a chronic subdural haematoma under sedation, not general anaesthesia.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), CSDH/ Burrhole - Sedation, pdf p. 12"
      },
      {
        book: "asellaor",
        text: "Sedation and analgesia listed are IV diazepam two ampoules and IV pethidine one.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), CSDH/ Burrhole - Sedation, pdf p. 12"
      },
      {
        book: "asellaor",
        text: "The subdural drain is an 8F or 10F nasogastric tube connected to a urine bag.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), CSDH/ Burrhole - Sedation, pdf p. 12"
      },
      {
        book: "asellaor",
        text: "Three No 23 blades and one No 15 blade are listed.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), CSDH/ Burrhole - Sedation, pdf p. 12"
      }
    ],
    sources: [
      {
        name: "Asella Referral and Teaching Hospital. List of OR materials for surgical cases, 2025 — institutional practice from a named teaching hospital, not a clinical guideline"
      },
      {
        name: "WHO Surgical Safety Checklist (2nd ed., 2009), in WHO Guidelines for Safe Surgery 2009: Safe Surgery Saves Lives"
      },
      { name: "WHO. Surgical Care at the District Hospital, 2003" }
    ],
    review: { status: "draft" }
  },
  {
    id: "craniotomy-edh",
    name: "Craniotomy for acute extradural haematoma",
    aka: [
      "AEDH",
      "acute epidural haematoma",
      "extradural haematoma",
      "craniotomy",
      "head injury surgery"
    ],
    urgency: "emergency",
    caseIds: ["trauma", "raised-icp"],
    anaesthesia: "GA",
    sections: [
      {
        title: "Anaesthesia drugs",
        items: [
          {
            item: "Propofol",
            qty: "1",
            note: "The list names propofol specifically here, not ketamine. No MedBridge drug entry yet.",
            drugId: "propofol"
          },
          { item: "Vecuronium", qty: "1", note: "No MedBridge drug entry yet.", drugId: "vecuronium" },
          {
            item: "Suxamethonium (succinylcholine)",
            qty: "1",
            note: "No MedBridge drug entry yet.",
            drugId: "suxamethonium"
          },
          { item: "Atropine", qty: "2", note: "", drugId: "atropine" },
          { item: "Neostigmine", qty: "1", note: "No MedBridge drug entry yet.", drugId: "neostigmine" },
          {
            item: "Dexamethasone",
            qty: "1",
            note: "Listed. Note that steroids are not a treatment for traumatic brain injury — see the checks.",
            drugId: "dexamethasone"
          },
          { item: "Pethidine OR morphine", qty: "1", note: "", drugId: "morphine" },
          {
            item: "Lidocaine with adrenaline",
            qty: "1",
            note: "Scalp infiltration before the incision.",
            drugId: "lidocaine"
          },
          { item: "40 % dextrose", qty: "3", note: "", drugId: "dextrose" }
        ]
      },
      {
        title: "Instruments",
        items: [
          { item: "Endotracheal tube 6.5 (female) // 7 or 7.5 (male)", qty: "1", note: "" },
          { item: "Suction tip", qty: "1", note: "" },
          { item: "Surgical blade No. 23", qty: "3", note: "" },
          { item: "Urinary catheter 16F + urine bag", qty: "1 each", note: "" },
          { item: "Nasogastric tube 18F + urine bag", qty: "1 each", note: "Used as the closed drain." }
        ]
      },
      {
        title: "Sutures",
        items: [
          { item: "Silk 2/0 cutting", qty: "4", note: "Scalp." },
          { item: "Vicryl 2/0 round", qty: "3", note: "" },
          { item: "Vicryl 0 round", qty: "2", note: "" }
        ]
      },
      {
        title: "Consumables",
        items: [
          { item: "Ceftriaxone", qty: "2", note: "", drugId: "ceftriaxone" },
          { item: "Metronidazole IV", qty: "2", note: "", drugId: "metronidazole" },
          {
            item: "Hydrogen peroxide",
            qty: "4",
            note: "The largest allocation in the document. No MedBridge drug entry."
          },
          { item: "IV cannula 18/20G", qty: "2", note: "" },
          { item: "Normal saline", qty: "5", note: "", drugId: "normal-saline" },
          { item: "Surgical gloves", qty: "20", note: "" },
          { item: "Disposable gloves", qty: "10 pairs", note: "" },
          { item: "Syringe 10 cc and 5 cc", qty: "6 each", note: "" }
        ]
      },
      {
        title: "Have ready for trouble",
        items: [
          {
            item: "Two crossmatched units, or two bled donors in the building",
            qty: "2",
            note: "ADDED HERE. No crossmatch appears on this list for a craniotomy. A torn middle meningeal artery or a torn sinus empties a child fast.",
            drugId: "blood-transfusion"
          },
          {
            item: "Bone wax, crushed gelatin sponge or a muscle patch, and dural tack-up sutures",
            qty: "—",
            note: "ADDED HERE. Nothing on this list stops bone-edge or sinus bleeding."
          },
          {
            item: "Mannitol 0.5 g/kg, or hypertonic saline 3 % 2–5 mL/kg if the patient is also hypotensive or bleeding",
            qty: "1",
            note: "ADDED HERE, as a bridge to the operation only, and only once the blood pressure is restored.",
            drugId: "mannitol"
          },
          {
            item: "Hypertonic saline 3 %",
            qty: "1",
            note: "ADDED HERE — the preferred osmotic agent in a head-injured patient who is also hypovolaemic, as the app's trauma case sets out.",
            drugId: "hypertonic-saline"
          },
          {
            item: "Tranexamic acid 1 g, if within 3 hours of injury",
            qty: "1",
            note: "ADDED HERE. Not on the list, and it is the cheapest thing in the room that changes outcome in head injury given early.",
            drugId: "tranexamic-acid"
          },
          {
            item: "A target systolic above 100 mmHg written on the board, and the fluids to achieve it",
            qty: "—",
            note: "ADDED HERE. Permissive hypotension is wrong in a head injury; the injured brain needs pressure.",
            drugId: "ringers-lactate"
          },
          {
            item: "Oxygen, a working ventilator or a named person on the bag, and a plan for the airway after the operation",
            qty: "1",
            note: "ADDED HERE. Most district theatres have no ventilator; decide before induction who breathes for this patient afterwards and for how long.",
            drugId: "oxygen"
          }
        ]
      }
    ],
    missing: [
      {
        item: "Propofol or thiopental",
        substitute: "Ketamine 1–2 mg/kg IV with atropine, or midazolam with an opioid.",
        note: "The old teaching that ketamine must never be used in head injury has softened: the evidence does not show it worsens intracranial pressure in a ventilated patient, and in a hypotensive trauma patient it is often the safest induction agent you have. But propofol gives you a smooth, controlled induction with no coughing or straining, which is what the brain wants; if you must use ketamine, give a good scalp block, avoid coughing, and keep the blood pressure up."
      },
      {
        item: "Suxamethonium",
        substitute: "Full intubating dose of vecuronium, rocuronium or atracurium.",
        note: "Reasonable, and avoids the brief rise in intracranial pressure attributed to suxamethonium. With no reversal agent you are committed to ventilating this patient afterwards — which in a head injury you probably are anyway. Decide who does it before you start."
      },
      {
        item: "Neostigmine",
        substitute: "None.",
        note: "No reversal agent means someone hand-ventilates until the block wears off. In a craniotomy for extradural haematoma that is usually acceptable, because the patient needs airway protection afterwards regardless. It must still be a named person with a named relief, written on the board."
      },
      {
        item: "A craniotome, perforator, Gigli saw or bone nibblers",
        substitute: "None.",
        note: "Say it plainly: there is no improvisation for opening a skull. If the hospital has no perforator and no saw, this operation does not happen there — recognise that at the door and start the transfer, because an extradural haematoma kills in hours and the drive is the only treatment left."
      },
      {
        item: "Crossmatched blood",
        substitute: "Bled relatives or walking donors, grouped on the spot.",
        note: "Start the donor call at the same moment you book the theatre. In a child this is not optional: the volume in an extradural haematoma can be a large fraction of their circulating blood."
      },
      {
        item: "Bone wax",
        substitute: "Crushed gelatin sponge, a pedicled muscle patch, or bone dust mixed to a paste.",
        note: "All are used and all work for bone-edge bleeding. Nothing substitutes for packing and patience over a torn venous sinus — do not chase it with suction and a sucker."
      },
      {
        item: "Mannitol",
        substitute: "Hypertonic saline 3 % 2–5 mL/kg over 10–20 minutes.",
        note: "Preferable anyway in a trauma patient who is hypotensive or bleeding, because mannitol is a diuretic and will deepen the hypovolaemia. Neither is a treatment: both are a bridge to the operation, and if the operation cannot happen they buy only minutes."
      },
      {
        item: "Dexamethasone",
        substitute: "Do not substitute anything.",
        note: "This is on the hospital list but steroids do not treat traumatic brain injury and large trials found higher mortality when they were given for head injury. Give it as an antiemetic if that is why it is there; do not give it as a treatment for the brain injury, and do not go looking for an alternative steroid if it is out of stock."
      },
      {
        item: "A ventilator or high-dependency bed for afterwards",
        substitute: "A named person on a self-inflating bag, in rotation, with an oximeter and a clock.",
        note: "This is the honest answer in most district hospitals and it has been done. It requires a rota written down, someone senior checking it through the night, and the family told what is happening. It is a reason to transfer early, not a reason to decline the operation in a patient who will die without it."
      }
    ],
    checks: [
      "Sign in: patient identity confirmed by a relative or the notes if the patient cannot speak. Consent from the family where the patient lacks capacity, recorded with the time and who was spoken to.",
      "SIDE. The side confirmed against the imaging AND the examination, by the operating surgeon, and marked on the scalp before shaving and draping.",
      "Conscious level, pupils and limb movement recorded immediately before induction, with the time.",
      "Allergy asked. Cervical spine cleared or immobilised and stated aloud — this is a trauma patient.",
      "Antibiotic prophylaxis given within 60 minutes before the skin incision.",
      "Blood: state out loud how many units are in the fridge and how many donors are bled. For a child, say the estimated circulating volume.",
      "Target systolic blood pressure stated out loud and written up: above 100 mmHg. No permissive hypotension in a head injury.",
      "Tranexamic acid given if within 3 hours of the injury, and the time recorded.",
      "Pulse oximeter reading, suction tested, oxygen flowing. The perforator or saw shown to be present and working before the scalp is incised.",
      "Swab, needle, blade and instrument count agreed before the incision and repeated and agreed before closure. Patties and cottonoids counted separately — they are the ones left behind.",
      "The listed dexamethasone is not a treatment for the brain injury. Say so out loud so nobody continues it as if it were.",
      "Sign out: the side operated on, the clot evacuated, the bleeding point, the drain, and a named person given the post-operative airway plan and the hourly neurological observation plan."
    ],
    textbook: [
      {
        book: "asellaor",
        text: "Craniotomy for an acute extradural haematoma is listed with a suction tip and propofol as the induction agent.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), AEDH/ Craniotomy/, pdf p. 12"
      },
      {
        book: "asellaor",
        text: "Vecuronium, atropine two, neostigmine, suxamethonium and dexamethasone are listed.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), AEDH/ Craniotomy/, pdf p. 12"
      },
      {
        book: "asellaor",
        text: "Lidocaine with adrenaline for the scalp and four bottles of hydrogen peroxide are listed.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), AEDH/ Craniotomy/, pdf p. 12"
      },
      {
        book: "asellaor",
        text: "Closure materials are silk 2/0 cutting four, Vicryl 2/0 round three and Vicryl 0 round two.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), AEDH/ Craniotomy/, pdf p. 12"
      },
      {
        book: "asellaor",
        text: "Ceftriaxone two and IV metronidazole two are listed.",
        ref: "Asella Referral and Teaching Hospital, list of OR materials for surgical cases (2025), AEDH/ Craniotomy/, pdf p. 12"
      }
    ],
    sources: [
      {
        name: "Asella Referral and Teaching Hospital. List of OR materials for surgical cases, 2025 — institutional practice from a named teaching hospital, not a clinical guideline"
      },
      {
        name: "WHO Surgical Safety Checklist (2nd ed., 2009), in WHO Guidelines for Safe Surgery 2009: Safe Surgery Saves Lives"
      },
      { name: "WHO. Surgical Care at the District Hospital, 2003" },
      {
        name: "CRASH trial collaborators. Effect of intravenous corticosteroids on death within 14 days in 10,008 adults with clinically significant head injury. Lancet 2004;364:1321–1328"
      }
    ],
    review: { status: "draft" }
  },
  {
    id: "chest-tube",
    name: "Chest tube insertion (tube thoracostomy)",
    aka: [
      "chest drain",
      "intercostal drain",
      "ICD",
      "underwater seal",
      "thoracostomy",
      "haemothorax",
      "pneumothorax"
    ],
    urgency: "emergency",
    caseIds: ["trauma"],
    anaesthesia: "local",
    sections: [
      {
        title: "Anaesthesia drugs",
        items: [
          {
            item: "Lidocaine 1 % or 2 %, 20 mL",
            qty: "20 mL",
            note: "Skin, subcutaneous tissue, the intercostal muscles and the parietal pleura — the pleura is the part people forget and the part that hurts.",
            drugId: "lidocaine"
          },
          {
            item: "Ketamine, with atropine",
            qty: "1 each",
            note: "For a child, or an adult too distressed to keep still, with a named person watching the airway.",
            drugId: "ketamine"
          },
          {
            item: "Morphine, small titrated IV doses",
            qty: "1",
            note: "Before and after; this is a painful procedure that is routinely under-treated.",
            drugId: "morphine"
          },
          { item: "Atropine", qty: "1", note: "With ketamine, for secretions.", drugId: "atropine" }
        ]
      },
      {
        title: "Instruments",
        items: [
          {
            item: "Chest tube",
            qty: "1",
            note: "Adult 28–32F for blood or pus; 20–24F for a child; a smaller tube is acceptable for air alone. Straight or angled."
          },
          {
            item: "Underwater seal drainage bottle with a connecting tube",
            qty: "1",
            note: "The long tube must sit under the water; it is the water that makes the system one-way."
          },
          {
            item: "Curved artery forceps / Kelly clamps",
            qty: "2",
            note: "One to dissect through the intercostal muscle and pleura, one to guide the tube."
          },
          { item: "Scalpel with a No. 11 or No. 23 blade", qty: "1", note: "" },
          { item: "Straight scissors, needle holder, toothed forceps", qty: "1 each", note: "" },
          {
            item: "Sterile drape, gown, gloves, mask and eye protection",
            qty: "1 set",
            note: "Blood under pressure goes where it wants."
          }
        ]
      },
      {
        title: "Sutures",
        items: [
          {
            item: "Silk or nylon 1 or 1/0 on a cutting needle",
            qty: "1",
            note: "A horizontal mattress stitch each side of the tube, tied around it. This stitch is all that holds the drain in."
          }
        ]
      },
      {
        title: "Consumables",
        items: [
          {
            item: "Sterile water or normal saline for the seal",
            qty: "500 mL",
            note: "Enough to cover the end of the long tube by about 2 cm, and no more.",
            drugId: "normal-saline"
          },
          { item: "Antiseptic — chlorhexidine or povidone-iodine", qty: "1", note: "" },
          { item: "Syringe 10 cc and 20 cc, with 21G and 23G needles", qty: "2 each", note: "" },
          { item: "Sterile gauze and adhesive plaster", qty: "—", note: "" },
          {
            item: "Petroleum-jelly gauze",
            qty: "1",
            note: "For the day the tube comes out, not for the insertion."
          }
        ]
      },
      {
        title: "Have ready for trouble",
        items: [
          { item: "Oxygen, high flow", qty: "1", note: "ADDED HERE.", drugId: "oxygen" },
          {
            item: "A second chest tube and a second seal bottle",
            qty: "1 each",
            note: "ADDED HERE. The commonest complication is a malpositioned tube, and the rule is that the first tube stays in until a second one is working."
          },
          {
            item: "Large-bore IV access and 2 L of crystalloid",
            qty: "2 L",
            note: "ADDED HERE. Draining a large haemothorax can unmask the hypovolaemia it was tamponading.",
            drugId: "ringers-lactate"
          },
          {
            item: "Two crossmatched units or two bled donors, for a haemothorax",
            qty: "2",
            note: "ADDED HERE. An immediate drainage of 1500 mL, or more than 200 mL/h for 2–4 hours, is a thoracotomy — know before you start where that would happen.",
            drugId: "blood-transfusion"
          },
          {
            item: "Tranexamic acid 1 g, if within 3 hours of injury",
            qty: "1",
            note: "ADDED HERE.",
            drugId: "tranexamic-acid"
          },
          {
            item: "A clamp kept at the bedside, and clear written instructions on when it may be used",
            qty: "1",
            note: "ADDED HERE. For re-expansion pulmonary oedema after a large drainage: stop draining, clamp, wait 2–4 hours. A clamped drain in a patient with an air leak causes a tension pneumothorax, so the instruction must be written, not assumed."
          },
          {
            item: "A wide-bore needle or cannula for immediate decompression",
            qty: "1",
            note: "ADDED HERE. If this is a tension pneumothorax, decompress first and insert the drain second. Do not start sterilising a field while the patient arrests."
          }
        ]
      }
    ],
    missing: [
      {
        item: "A chest tube",
        substitute: "In extremis, a sterile large-bore nasogastric tube (16–18F) for a simple pneumothorax only; otherwise a finger thoracostomy left open to a dressing until a tube is found.",
        note: "A urinary (Foley) catheter is NOT an acceptable chest drain. The balloon can be inflated inside the chest and tear lung or be pulled into the tract; it has one small end hole and no side holes, so it clots off within hours in a haemothorax; it kinks; and it has no radiopaque line, so a film cannot tell you where it is. A drain that looks like it is working while the chest fills is worse than no drain. For a tension pneumothorax, needle decompression buys you the time to find a real tube."
      },
      {
        item: "An underwater seal bottle",
        substitute: "A clean glass or rigid plastic bottle with a stopper, a rigid tube passed through it to sit about 2 cm under sterile water, and a second hole left open to air.",
        note: "This is the standard improvisation and it works. Non-negotiables: the tube end stays under the water, the bottle stays below the level of the patient's chest, and nobody ever lifts the bottle above the patient — doing so siphons the contents back into the pleura. Mark the fluid level and the time on the bottle with tape so output can be measured."
      },
      {
        item: "A seal bottle or any one-way system at all",
        substitute: "A flutter valve: the finger of a sterile glove tied over the end of the tube with a slit cut in its tip.",
        note: "This drains air and it is adequate for transport or for a few hours. It does not drain blood or pus, it blocks, and it must be watched. It is a bridge, not a treatment."
      },
      {
        item: "Sterile water or saline for the seal",
        substitute: "Water boiled for 5 minutes and cooled in the covered pan it was boiled in.",
        note: "Acceptable. Tap water or river water is not — you are creating a direct channel into the pleural space."
      },
      {
        item: "Silk or nylon 1",
        substitute: "Nylon or polypropylene 2/0, or silk 2/0 doubled.",
        note: "Never anchor a chest drain with an absorbable suture alone. It lets go in a few days, usually at night, and the tube comes out with the dressing."
      },
      {
        item: "Kelly clamps or curved artery forceps",
        substitute: "Any sturdy curved haemostat, and your own finger.",
        note: "The finger is the important instrument: it confirms you are in the pleural space and frees adhesions. What you must NOT do is push a trocar-mounted tube in blind — if your only tube has a trocar, withdraw the trocar, make the track by blunt dissection and finger, and guide the tube in with a clamp. Trocar insertion is how lungs, livers, hearts and spleens get perforated."
      },
      {
        item: "Lidocaine",
        substitute: "Ketamine 1 mg/kg IV with atropine and a named person on the airway.",
        note: "For an awake adult there is no substitute for local anaesthetic in a procedure of this pain, and doing it without is both cruel and unsafe — the patient moves at the worst moment. The one exception is a tension pneumothorax or an arrest: decompress with a needle immediately and anaesthetise nothing."
      },
      {
        item: "A chest X-ray before or after",
        substitute: "Clinical examination, and the behaviour of the drain.",
        note: "Tension pneumothorax is a clinical diagnosis and waiting for a film kills people. Afterwards, bubbling with respiration, a fluid level that swings with breathing, and a chest that becomes resonant and symmetrical tell you a great deal. Record what you found so the next person is not guessing."
      },
      {
        item: "Nursing able to keep the bottle upright, below the chest, and to measure output",
        substitute: "None.",
        note: "Say it plainly: the drain is only as safe as the person looking after it for the next three days. Before you insert it, teach the ward: never lift the bottle, never clamp it without an instruction, never empty it without recording the volume, and call if the swing stops or the patient gets more breathless."
      }
    ],
    checks: [
      "Sign in: patient states their own name where they can; the procedure and the consent explained, including that the tube will hurt and will stay in for days.",
      "SIDE. Left or right, confirmed by your own examination AND the film, and marked on the skin. A chest drain on the wrong side is a recurring and entirely preventable catastrophe — and in a tension pneumothorax it is fatal.",
      "Site confirmed: the safe triangle, fourth or fifth intercostal space just anterior to the mid-axillary line, above the upper border of the lower rib so the neurovascular bundle is avoided.",
      "Allergy asked. Coagulopathy, anticoagulants and liver disease asked about — they change the risk, and a transudative effusion in liver failure is a reason not to drain at all.",
      "If this is a tension pneumothorax: decompress with a needle NOW, and do the checklist afterwards. Say that out loud so nobody waits.",
      "The seal bottle filled, connected and tested, and standing on the floor below the patient, BEFORE the pleura is opened.",
      "Antibiotic decision stated: a single pre-insertion dose is reasonable for a traumatic haemothorax; it is not needed for a spontaneous pneumothorax. Say which, so nobody guesses.",
      "Blood: for a haemothorax, group known and donors identified before you drain. State out loud what volume of immediate output would make this a thoracotomy, and where that thoracotomy would happen.",
      "Pulse oximeter on and reading. Oxygen flowing. Suction available.",
      "Gauze and instrument count agreed before and after; the tube length inserted recorded.",
      "Sign out: the side, the tube size, the depth, what came out and how much, whether it bubbles and swings, and a named nurse told the four rules — bottle below the chest, never lifted, never clamped without an order, output recorded every shift."
    ],
    textbook: [],
    sources: [
      {
        name: "WHO. Surgical Care at the District Hospital, 2003 — chest drainage and the underwater seal"
      },
      {
        name: "WHO Surgical Safety Checklist (2nd ed., 2009), in WHO Guidelines for Safe Surgery 2009: Safe Surgery Saves Lives"
      },
      {
        name: "Note: the Asella Referral and Teaching Hospital OR materials list (2025) does not cover tube thoracostomy, so nothing in this pack is attributed to it"
      }
    ],
    review: { status: "draft" }
  }
];
