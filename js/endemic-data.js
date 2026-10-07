/* endemic-data.js — disease pathways for #/disease/<id> (js/endemic.js).

   Each pathway: the situations a physician meets, what to give in each, and the
   weight-band tables behind the tablet counts. Ethiopian national documents come
   first (malaria: FMoH case-management manual 2024; HIV: MoH National HIV PCT
   manual 2025); WHO is shown where it differs (malaria 2026, HIV 2025, kala-azar
   2026, VL–HIV 2022). Weight bands run from `from` kg (inclusive) to `to` kg
   (exclusive). Every situation's refs were checked word-for-word against the
   cited PDF page. Generated, then reviewed — DRAFT, not clinically verified. */
window.ENDEMIC = [
  {
    id: "malaria",
    name: "Malaria",
    icon: "drop",
    short: "Falciparum, vivax, mixed, severe; pregnancy, infants, vomiting, treatment failure and relapse.",
    summary: "Confirm with an RDT or blood film, look for danger signs, name the species, then treat by weight. Ethiopia: artemether–lumefantrine plus a single dose of primaquine for falciparum; chloroquine plus 14 days of primaquine for vivax; artemether–lumefantrine plus 14 days of primaquine for mixed infection; parenteral artesunate for severe malaria; dihydroartemisinin–piperaquine as second line. WHO 2026 is shown where it differs.",
    basis: ["Ethiopia FMoH malaria manual 2024", "WHO malaria guidelines 2026"],
    firstLook: [
      "Cannot sit or stand (prostration), cannot drink or breastfeed, or vomits everything",
      "Convulsions, confusion, drowsiness or coma",
      "Fast or deep breathing, very pale, jaundiced, dark urine, bleeding, or cold hands with a weak pulse",
      "Any of these: severe malaria — give parenteral (or pre-referral rectal) artesunate now"
    ],
    scenarios: [
      {
        id: "pf-uncomplicated",
        group: "Treat",
        title: "Falciparum, uncomplicated",
        who: "RDT or film positive for P. falciparum, no danger sign, can swallow",
        give: [
          {
            drug: "artemether-lumefantrine",
            label: "Artemether–lumefantrine 20/120 mg",
            dose: "By weight: at once, after 8 h, then morning and evening on days 2 and 3 (6 doses); each dose with milk or fatty food",
            dosing: "al"
          },
          {
            drug: "primaquine",
            label: "Primaquine (single dose)",
            dose: "ONE dose of 0.25 mg base/kg on day 1, with the first AL dose, both swallowed in front of you",
            dosing: "primaquine"
          }
        ],
        also: [
          "Paracetamol 15 mg/kg for temperature 38.5 °C or more; tepid sponging (Ethiopia).",
          "Repeat a dose vomited within 30 minutes (Ethiopia; WHO: within 1 hour).",
          "Counsel: finish all 6 doses, eat or drink milk with each, sleep under a net, come back after 3 days if not better or at once if worse.",
          "WHO 2026 differs on the single primaquine dose: only in low-transmission areas, and its exclusions are pregnancy and infants (or breastfed infants) under 1 month; no G6PD test is needed in either guideline."
        ],
        avoid: [
          "Chloroquine: useless for falciparum.",
          "No primaquine in pregnancy, in infants under 6 months, in a woman breastfeeding an infant under 6 months, or with moderate to severe anaemia (Ethiopia).",
          "Tablets for a patient with any danger sign or who cannot keep tablets down: that is severe malaria — artesunate."
        ],
        followup: [
          "Not better by day 3, or worse at any time: re-examine and repeat a blood film.",
          "Fever again within 28 days: microscopy (not RDT) for treatment failure."
        ],
        caseId: "uncomplicated-malaria",
        refs: [
          {
            book: "ethmal",
            text: "AL plus single-dose primaquine is the recommended first-line treatment for P. falciparum.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 Treatment of uncomplicated malaria, pdf p. 76",
            pdf_page: 76,
            quote: "Artemether-Lumefantrine (AL) plus single-dose primaquine are the recommended first-line"
          },
          {
            book: "ethmal",
            text: "The single dose of primaquine is 0.25 mg base/kg; the first AL dose and the primaquine are given under direct supervision.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 Treatment of uncomplicated malaria, pdf p. 76",
            pdf_page: 76,
            quote: "The single dose primaquine phosphate dose is 0.25 mg base per kg"
          },
          {
            book: "ethmal",
            text: "Table 4: AL weight bands (<5 kg and 5–14 kg 1 tablet; 15–24 kg 2; 25–34 kg 3; >35 kg 4) at once, after 8 h, then twice daily on days 2 and 3.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, Table 4, pdf p. 77",
            pdf_page: 77,
            quote: "Table 4. Tablet containing 20 mg Artemether plus 120 mg Lumefantrine in a fixed dose"
          },
          {
            book: "whomal",
            text: "WHO 2026: single-dose primaquine 0.25 mg/kg with an ACT in low-transmission areas, except pregnant women, infants under 1 month and women breastfeeding infants under 1 month.",
            ref: "WHO guidelines for malaria 2026, 5.2.1.3 Reducing the transmissibility of treated P. falciparum infections, p. 180",
            pdf_page: 180,
            quote: "infants < 1 months of age and women breastfeeding infants < 1 months of age"
          }
        ]
      },
      {
        id: "pv-uncomplicated",
        group: "Treat",
        title: "Vivax or ovale, uncomplicated",
        who: "RDT or film positive for P. vivax (or P. ovale) only, no danger sign",
        give: [
          {
            drug: "chloroquine",
            label: "Chloroquine 150 mg base tablet or 50 mg base/5 mL syrup",
            dose: "Total 25 mg base/kg over 3 days, by the weight table",
            dosing: "chloroquine"
          },
          {
            drug: "primaquine",
            label: "Primaquine (radical cure)",
            dose: "0.25 mg base/kg once daily for 14 days, with food, starting with the chloroquine",
            dosing: "primaquine"
          }
        ],
        also: [
          "No G6PD test is required in Ethiopia (deficiency is very rare here), but tell every patient: dark urine, yellow eyes or breathlessness means stop primaquine and come back the same day.",
          "Support adherence over 14 days, for example with a phone call reminder (Ethiopia).",
          "A small child and no chloroquine syrup: give AL instead (Ethiopian algorithm), plus the 14-day primaquine.",
          "WHO 2026 differs: an ACT or chloroquine for the blood stage, and primaquine at a high total dose of 7 mg/kg (0.5 mg/kg daily for 14 days, or 1 mg/kg daily for 7 days only with G6PD activity of 70 % or more) guided by a G6PD test."
        ],
        avoid: [
          "No primaquine in pregnancy, in infants under 6 months, in a woman breastfeeding an infant under 6 months, or with moderate to severe anaemia (Ethiopia).",
          "Chloroquine with a history of epilepsy or with psoriasis (Ethiopia): give AL plus primaquine instead.",
          "More than four chloroquine tablets (150 mg base) in one day."
        ],
        followup: [
          "Review after 3 days if not better; review urine colour and pallor on about day 3 of primaquine.",
          "Vivax again within 28 days: treatment failure pathway. After 28 days: see 'Vivax again (relapse)'."
        ],
        caseId: "uncomplicated-malaria",
        refs: [
          {
            book: "ethmal",
            text: "P. vivax: chloroquine 25 mg base/kg total plus primaquine 0.25 mg/kg daily for 14 days with close follow-up.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 P. vivax malaria, pdf p. 78",
            pdf_page: 78,
            quote: "The first line drug of choice is chloroquine at a total dose of 25 mg base/kg"
          },
          {
            book: "ethmal",
            text: "Table 5: chloroquine 150 mg base tablets or 50 mg base/5 mL syrup by weight band for days 1, 2 and 3.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, Table 5, pdf p. 78",
            pdf_page: 78,
            quote: "Table 5. Tablets of chloroquine 150 mg base or syrup 50 mg base per 5 ml"
          },
          {
            book: "ethmal",
            text: "G6PD deficiency is very rare in Ethiopia; follow patients on primaquine closely and stop it for dark urine.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 Side effects of primaquine, pdf p. 79",
            pdf_page: 79,
            quote: "Though the prevalence of G6PD deficiency is very low in Ethiopia"
          },
          {
            book: "whomal",
            text: "WHO 2024: primaquine at a high total dose (7 mg/kg) for relapse prevention, after G6PD testing.",
            ref: "WHO guidelines for malaria 2026, 5.2.1.7 Primaquine as anti-relapse therapy (2024), p. 207",
            pdf_page: 207,
            quote: "primaquine should be given at a high total dose (7 mg/kg)"
          }
        ]
      },
      {
        id: "mixed",
        group: "Treat",
        title: "Mixed falciparum + vivax",
        who: "Both Pf and Pv lines on the RDT, or both species on the film",
        give: [
          {
            drug: "artemether-lumefantrine",
            label: "Artemether–lumefantrine 20/120 mg",
            dose: "By weight, 6 doses over 3 days with milk or fatty food",
            dosing: "al"
          },
          {
            drug: "primaquine",
            label: "Primaquine (radical cure)",
            dose: "0.25 mg base/kg once daily for 14 days (this replaces the single dose)",
            dosing: "primaquine"
          }
        ],
        also: [
          "Same counselling as for falciparum and vivax: fat with AL, dark-urine warning with primaquine."
        ],
        avoid: [
          "AL plus chloroquine: never give both (Ethiopia).",
          "No primaquine in pregnancy, in infants under 6 months, in a woman breastfeeding an infant under 6 months, or with moderate to severe anaemia (Ethiopia)."
        ],
        followup: [
          "Review after 3 days if not better; fever again within 28 days: microscopy for treatment failure."
        ],
        caseId: "uncomplicated-malaria",
        refs: [
          {
            book: "ethmal",
            text: "Mixed infection: AL plus primaquine radical cure for 14 days.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 Mixed infection, pdf p. 79",
            pdf_page: 79,
            quote: "The recommended first-line treatment for mixed infection is AL and"
          },
          {
            book: "ethmal",
            text: "Do not treat a confirmed mixed infection with AL plus chloroquine.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 Mixed infection, pdf p. 79",
            pdf_page: 79,
            quote: "Do not treat a patient with confirmed mixed infection with AL plus chloroquine"
          },
          {
            book: "whomal",
            text: "ACTs are effective against all malaria species and are the treatment of choice for mixed infections.",
            ref: "WHO guidelines for malaria 2026, 5.2.1.5 Mixed malaria infections, p. 194",
            pdf_page: 194,
            quote: "ACTs are effective against all malaria species and so are the treatment of choice for mixed infections"
          }
        ]
      },
      {
        id: "no-test",
        group: "Treat",
        title: "No RDT or microscope available",
        who: "Fever now or in the last 48 h, lives in or travelled in the last 30 days to a malarious area, and no test possible",
        give: [
          {
            drug: "artemether-lumefantrine",
            label: "Artemether–lumefantrine 20/120 mg",
            dose: "By weight, 6 doses over 3 days with milk or fatty food",
            dosing: "al"
          },
          {
            drug: "primaquine",
            label: "Primaquine (single dose)",
            dose: "ONE dose of 0.25 mg base/kg on day 1",
            dosing: "primaquine"
          }
        ],
        also: [
          "Look for another cause of fever too: pneumonia, urinary infection, meningitis, typhoid, relapsing fever, kala-azar.",
          "Record 'presumptive, no test'; test at the next chance; report the test stock-out the same day.",
          "Treating on clinical grounds is the last option, only when neither RDT nor microscopy exists (Ethiopia)."
        ],
        avoid: [
          "Giving only the first dose 'until the test comes back': WHO calls this unsafe — give a full course or none.",
          "No primaquine in pregnancy, in infants under 6 months, in a woman breastfeeding an infant under 6 months, or with moderate to severe anaemia (Ethiopia)."
        ],
        followup: ["Review after 3 days if not better, at once if worse."],
        caseId: "uncomplicated-malaria",
        refs: [
          {
            book: "ethmal",
            text: "Where microscopy and RDT are not available and the patient meets the clinical criteria, give AL with a single dose of primaquine.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 No parasitological test, pdf p. 79",
            pdf_page: 79,
            quote: "the patient fulfills the clinical criteria of malaria, AL with a single dose of Primaquine"
          },
          {
            book: "ethmal",
            text: "Suspect malaria with fever or a history of fever in the last 48 hours in someone living in, or returning within 30 days from, a malarious area.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.1 Malaria suspect, pdf p. 74",
            pdf_page: 74,
            quote: "fever or history of fever in the last 48"
          },
          {
            book: "whomal",
            text: "Giving only the first dose of a course to patients with unconfirmed malaria is unsafe and not recommended.",
            ref: "WHO guidelines for malaria 2026, 5.2.1 Treating uncomplicated malaria, p. 169",
            pdf_page: 169,
            quote: "Another potentially dangerous practice is to give only the first dose of a treatment course"
          }
        ]
      },
      {
        id: "vomiting",
        group: "Treat",
        title: "Vomits the tablets or cannot swallow",
        who: "Malaria with vomiting of doses, or unable to take or keep down tablets",
        give: [
          {
            drug: "artemether-lumefantrine",
            label: "Artemether–lumefantrine: repeat the dose",
            dose: "Vomited within 30 minutes: give the dose again from stock (Ethiopia; WHO: if brought up within 1 hour)",
            dosing: "al"
          },
          {
            drug: "dihydroartemisinin-piperaquine",
            label: "Dihydroartemisinin–piperaquine (if this is the drug)",
            dose: "Vomited within 30 min: full dose again; at 30–60 min: half the dose again (Ethiopia)",
            dosing: "dhapq"
          },
          {
            drug: "artesunate",
            label: "Artesunate IM/IV if tablets cannot be kept down",
            dose: "As for severe malaria: 2.4 mg/kg (3 mg/kg under 20 kg) at 0, 12 and 24 h, then a full oral course",
            dosing: null
          }
        ],
        also: [
          "Paracetamol first for a high fever: it reduces vomiting.",
          "A patient who cannot take oral treatment gets the same first treatment as severe malaria, then a full 3-day ACT course (WHO).",
          "Child under 6 years at a health post where no injection can be given: rectal artesunate 10 mg/kg and refer (WHO)."
        ],
        avoid: ["Sending home a patient who vomits every dose: repeated vomiting is a danger sign."],
        followup: ["Watch for an hour after each supervised dose."],
        caseId: "severe-malaria",
        refs: [
          {
            book: "ethmal",
            text: "If vomiting occurs within half an hour after swallowing AL, repeat the dose.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 Treatment of uncomplicated malaria, pdf p. 77",
            pdf_page: 77,
            quote: "If vomiting occurs within half an hour after swallowing the drug, the dose should be repeated"
          },
          {
            book: "ethmal",
            text: "DHA-PPQ: vomited within 30 minutes, full dose again; between 30 minutes and 1 hour, half the dose.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, Table 7, contra-indications and precautions, pdf p. 81",
            pdf_page: 81,
            quote: "If the patient vomits between 30 minutes and 1 hour after administration"
          },
          {
            book: "whomal",
            text: "Patients who cannot tolerate oral treatment should receive the same initial treatment as severe malaria, followed by a full 3-day ACT.",
            ref: "WHO guidelines for malaria 2026, 5.2.1 Treating uncomplicated malaria, p. 169",
            pdf_page: 169,
            quote: "they should receive the same initial antimalarial treatments recommended for severe malaria"
          }
        ]
      },
      {
        id: "pregnant-pf",
        group: "Special groups",
        title: "Pregnant: falciparum or mixed",
        who: "Pregnant woman with uncomplicated falciparum or mixed malaria, ANY trimester including the first",
        give: [
          {
            drug: "artemether-lumefantrine",
            label: "Artemether–lumefantrine 20/120 mg",
            dose: "4 tablets a dose (35 kg and over), 6 doses over 3 days, with milk or food",
            dosing: "al"
          }
        ],
        also: [
          "Ask every woman of child-bearing age whether she is or could be pregnant before prescribing (Ethiopia).",
          "Pregnant women in low-transmission areas such as most of Ethiopia become severely ill more easily: check glucose and haemoglobin; admit if in doubt.",
          "Mixed infection: no primaquine now; the Ethiopian manual describes weekly chloroquine relapse prevention for vivax in pregnancy — extending it to mixed infection is a senior decision.",
          "Gabbe and the US CDC still prefer quinine-based treatment in the first trimester; that is not Ethiopian or WHO practice.",
          "IPTp is not used in Ethiopia (Ethiopia)."
        ],
        avoid: [
          "Primaquine — not even the single dose (Ethiopia; WHO).",
          "Artesunate–SP and artesunate–pyronaridine in the first trimester (WHO).",
          "Delaying treatment while deciding: untreated malaria harms mother and fetus."
        ],
        followup: [
          "Any danger sign, vomiting or high fever: treat as severe — IV/IM artesunate in all trimesters."
        ],
        caseId: "uncomplicated-malaria",
        refs: [
          {
            book: "ethmal",
            text: "Uncomplicated falciparum malaria in pregnancy: AL in all trimesters.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 Treatment of uncomplicated malaria in pregnancy, pdf p. 83",
            pdf_page: 83,
            quote: "In all trimesters, give Artemether-Lumefantrine (AL)"
          },
          {
            book: "whomal",
            text: "WHO 2022 (strong recommendation): treat uncomplicated falciparum malaria in the first trimester with artemether-lumefantrine.",
            ref: "WHO guidelines for malaria 2026, 5.2.1.4.1 Pregnant and lactating women, p. 183",
            pdf_page: 183,
            quote: "Pregnant women with uncomplicated P. falciparum malaria should be treated with artemether-lumefantrine during the first"
          }
        ]
      },
      {
        id: "pregnant-pv",
        group: "Special groups",
        title: "Pregnant or breastfeeding: vivax",
        who: "Pregnant woman, or mother breastfeeding an infant under 6 months, with vivax or ovale malaria",
        give: [
          {
            drug: "chloroquine",
            label: "Chloroquine (treatment)",
            dose: "25 mg base/kg over 3 days by the table (adult: 4, 4 and 2 tablets for 51 kg and over)",
            dosing: "chloroquine"
          },
          {
            drug: "chloroquine",
            label: "Chloroquine weekly (relapse prevention)",
            dose: "300 mg base (2 tablets) once a week, until after delivery and 6 months of breastfeeding; then primaquine radical cure",
            dosing: null
          }
        ],
        also: [
          "Chloroquine is safe in pregnancy (Ethiopia).",
          "WHO: weekly chloroquine until delivery and breastfeeding are completed, then primaquine based on G6PD status.",
          "Breastfeeding limit for primaquine: Ethiopia, infant under 6 months; WHO 2024–2026, infant under 1 month (secretion in milk is negligible)."
        ],
        avoid: ["Primaquine during pregnancy, or while breastfeeding an infant under 6 months (Ethiopia)."],
        followup: [
          "Give the 14-day primaquine when the baby is 6 months old and the woman is not pregnant again."
        ],
        caseId: "uncomplicated-malaria",
        refs: [
          {
            book: "ethmal",
            text: "Pregnancy, vivax: weekly chloroquine 2 tablets (300 mg base) until after delivery and 6 months of breastfeeding, then radical cure.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 Treatment of uncomplicated malaria in pregnancy, pdf p. 83",
            pdf_page: 83,
            quote: "Provide weekly chloroquine prophylaxis at a dose of 2 tabs weekly (300mg base/500mg salt)"
          },
          {
            book: "ethmal",
            text: "Primaquine is contraindicated in women breastfeeding infants less than six months of age.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 Primaquine contraindications, pdf p. 79",
            pdf_page: 79,
            quote: "Women breastfeeding infants less than six months of age"
          },
          {
            book: "whomal",
            text: "WHO: weekly chloroquine chemoprophylaxis until delivery and breastfeeding are completed, then primaquine.",
            ref: "WHO guidelines for malaria 2026, 5.2.1.7 Pregnant and breastfeeding women, p. 211",
            pdf_page: 211,
            quote: "weekly chemoprophylaxis with chloroquine can be given until delivery and breastfeeding are completed"
          }
        ]
      },
      {
        id: "young-infant",
        group: "Special groups",
        title: "Infant under 6 months or under 5 kg",
        who: "Young infant with confirmed malaria and no danger sign",
        give: [
          {
            drug: "artemether-lumefantrine",
            label: "Artemether–lumefantrine (dispersible)",
            dose: "Ethiopia: 1 tablet a dose, 6 doses, also under 5 kg. WHO 2026: under 5 kg use the AL baby formulation, 5 mg + 60 mg twice daily for 3 days",
            dosing: "al"
          },
          {
            drug: "chloroquine",
            label: "Chloroquine for vivax (from 5 kg)",
            dose: "Syrup 50 mg base/5 mL by the table; under 5 kg there is no chloroquine band: AL treats the vivax blood stage too (WHO)",
            dosing: "chloroquine"
          }
        ],
        also: [
          "No primaquine under 6 months (Ethiopia): give the blood-stage treatment and plan radical cure for vivax when the child is 6 months old.",
          "The Ethiopian primaquine table starts at 8 kg: a child of 6 months or more who weighs under 8 kg needs a senior decision.",
          "Admit if in doubt: infants deteriorate fast, so the threshold for parenteral treatment is lower (WHO). Watch the response closely.",
          "Breastfeed with or straight after each AL dose."
        ],
        avoid: ["Primaquine (single dose or radical cure) under 6 months (Ethiopia); WHO: under 1 month."],
        followup: ["Review daily until afebrile and feeding; any danger sign: artesunate."],
        caseId: "uncomplicated-malaria",
        refs: [
          {
            book: "ethmal",
            text: "AL is indicated for young infants under 3 months (5 kg).",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 8.2 Case management in epidemics, pdf p. 167",
            pdf_page: 167,
            quote: "young infant <3months (5kg)"
          },
          {
            book: "ethmal",
            text: "Primaquine is contraindicated in infants less than six months of age.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 Primaquine contraindications, pdf p. 79",
            pdf_page: 79,
            quote: "Infants less than six months of age"
          },
          {
            book: "whomal",
            text: "WHO 2026: infants under 5 kg get an ACT at the same mg/kg dose as a 5 kg child; where AL is used, the new 1:12 baby formulation.",
            ref: "WHO guidelines for malaria 2026, 5.2.1.4.2 Young children and infants (2026 recommendation), p. 189",
            pdf_page: 189,
            quote: "Infants weighing < 5 kg with uncomplicated P. falciparum malaria should be treated with an ACT at the same mg/kg bw"
          },
          {
            book: "whomal",
            text: "WHO dosing table: under 5 kg, artemether 5 mg + lumefantrine 60 mg twice daily for 3 days.",
            ref: "WHO guidelines for malaria 2026, 5.2.1.1.2 Dosing of ACTs, p. 176",
            pdf_page: 176,
            quote: "is recommended for uncomplicated malaria in infants and neonates <5 kg bw"
          }
        ]
      },
      {
        id: "severe",
        group: "Severe",
        title: "Severe malaria",
        who: "Any danger sign: prostration, impaired consciousness, convulsions, deep breathing, severe anaemia, hypoglycaemia, jaundice, dark urine, bleeding, shock — or parasitaemia over 2 %",
        give: [
          {
            drug: "artesunate",
            label: "Artesunate IV (or IM), 20 kg and over",
            dose: "2.4 mg/kg at 0, 12 and 24 h, then once daily until able to take tablets (up to 7 days)",
            dosing: null
          },
          {
            drug: "artesunate",
            label: "Artesunate IV (or IM), under 20 kg",
            dose: "3 mg/kg at 0, 12 and 24 h, then once daily until able to take tablets",
            dosing: null
          },
          {
            drug: "artemether-lumefantrine",
            label: "Then artemether–lumefantrine, full course",
            dose: "After at least 3 artesunate doses and once able to swallow: a FULL 6-dose course",
            dosing: "al"
          },
          {
            drug: "dihydroartemisinin-piperaquine",
            label: "Or dihydroartemisinin–piperaquine",
            dose: "Full 3-day course if AL cannot be taken for any reason",
            dosing: "dhapq"
          },
          {
            drug: "primaquine",
            label: "Plus primaquine",
            dose: "Falciparum: single dose 0.25 mg base/kg; vivax: 0.25 mg base/kg daily for 14 days",
            dosing: "primaquine"
          }
        ],
        also: [
          "Reconstitute the 60 mg vial with 1 mL 5 % bicarbonate, then add 5 mL glucose 5 % or saline (10 mg/mL) for IV, or 2 mL (20 mg/mL) for IM into the anterior thigh (Ethiopia).",
          "Give parenteral treatment for at least 24 h even if the patient can swallow earlier (48 h for quinine) (Ethiopia; WHO).",
          "Glucose on arrival and every 2–4 hours; treat below 2.2 mmol/L (WHO: below 3 mmol/L in children under 5) with 10 % dextrose 5 mL/kg (adult) or 4 mL/kg (child) (Ethiopia).",
          "Transfuse for Hb under 5 g/dL or when the anaemia threatens life (Ethiopia). WHO: under 5 g/dL in children in high-transmission areas; 7 g/dL (Hct 20 %) in low-transmission areas.",
          "Antibiotics when bacterial infection is possible (shock, coma without LP, pneumonia); in children with suspected severe malaria, start broad-spectrum antibiotics (WHO).",
          "Convulsions over 5 minutes: diazepam 0.15 mg/kg slowly IV (max 10 mg) (Ethiopia).",
          "Artesunate out of stock: IM artemether 3.2 mg/kg on day 1, then 1.6 mg/kg on days 2–3 (never IV); then quinine 20 mg salt/kg loading, 10 mg/kg every 8 h, each over 4 h (Ethiopia; WHO prefers artemether to quinine).",
          "Hyperparasitaemia threshold: over 2 % in Ethiopia; WHO 2026 uses over 10 %. Use the Ethiopian threshold."
        ],
        avoid: [
          "Oral treatment as the first treatment.",
          "Quinine as an IV bolus, or faster than 5 mg salt/kg per hour.",
          "Fast fluid boluses (WHO); prophylactic anticonvulsants, steroids, heparin, mannitol (WHO)."
        ],
        followup: [
          "Coma score, glucose, urine output and vital signs at least 4-hourly.",
          "Delayed haemolysis can start more than a week after artesunate (WHO): check haemoglobin at about day 7 and 14, especially after high parasitaemia."
        ],
        caseId: "severe-malaria",
        refs: [
          {
            book: "ethmal",
            text: "Artesunate 3 mg/kg for children under 20 kg; 2.4 mg/kg above 20 kg.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 5.3.4 Specific antimalarial treatment, pdf p. 112",
            pdf_page: 112,
            quote: "For children < 20kg: The dose of Artesunate is 3mg/kg; Above 20 kg-it is 2.4"
          },
          {
            book: "ethmal",
            text: "Give at least three doses, at 0 (admission), 12 and 24 hours; IV preferred, IM if IV fails.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 5.3.4 Specific antimalarial treatment, pdf p. 112",
            pdf_page: 112,
            quote: "Administer at least three times on time 0 (admission), 12h, and 24h after"
          },
          {
            book: "ethmal",
            text: "Artesunate can be continued for up to 7 days if oral treatment is not tolerated; then a full AL course, or DHA-PPQ if AL cannot be taken.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 5.3.4 Specific antimalarial treatment, pdf p. 113",
            pdf_page: 113,
            quote: "Artesunate can be continued for up to 7- days if the patient does not tolerate oral"
          },
          {
            book: "ethmal",
            text: "Ethiopian definition: hyperparasitaemia is P. falciparum parasitaemia over 2 %.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 5.1 Definition of severe malaria, pdf p. 99",
            pdf_page: 99,
            quote: "Hyperparasitaemia: P. falciparum parasitaemia > 2%"
          },
          {
            book: "whomal",
            text: "WHO 2026 definition: hyperparasitaemia is P. falciparum parasitaemia over 10 %.",
            ref: "WHO guidelines for malaria 2026, 5.2.2 Treating severe malaria, definitions, p. 212",
            pdf_page: 212,
            quote: "Hyperparasitaemia: P. falciparum parasitaemia > 10%"
          },
          {
            book: "whomal",
            text: "Delayed haemolysis starting more than 1 week after artesunate has been reported.",
            ref: "WHO guidelines for malaria 2026, 5.2.2.1 Artesunate and post-treatment haemolysis, p. 217",
            pdf_page: 217,
            quote: "Delayed haemolysis starting >1 week after artesunate treatment of severe malaria has been reported"
          }
        ]
      },
      {
        id: "pre-referral",
        group: "Severe",
        title: "Pre-referral at health post or centre",
        who: "Danger sign, or cannot take oral drugs, and the patient must be referred",
        give: [
          {
            drug: "artesunate",
            label: "Artesunate IM (first choice)",
            dose: "One IM dose before referral: 2.4 mg/kg (3 mg/kg under 20 kg) into the anterior thigh",
            dosing: null
          },
          {
            drug: "artesunate",
            label: "Rectal artesunate (children under 6 years only)",
            dose: "Single rectal dose 10 mg/kg, only where IM artesunate cannot be given (WHO); if expelled within 30 min, insert another and hold the buttocks together for 10 min",
            dosing: null
          },
          {
            drug: null,
            label: "IM artemether (second choice)",
            dose: "3.2 mg/kg IM into the anterior thigh",
            dosing: null
          },
          {
            drug: "quinine",
            label: "IM quinine (third choice)",
            dose: "20 mg salt/kg, diluted to 60–100 mg/mL, half into each anterior thigh",
            dosing: null
          }
        ],
        also: [
          "Child with fever and a general danger sign (IMNCI 'very severe febrile disease'): first dose of artesunate or artemether PLUS first dose of ampicillin and gentamicin, prevent low blood sugar, paracetamol for 38.5 °C or more, refer urgently (Ethiopia).",
          "Conscious: paracetamol for high fever, fluids during transfer, keep breastfeeding. Unconscious: show the family how to keep the patient on the side (Ethiopia).",
          "Write the drug, dose and time on the referral form; IV artesunate at the hospital replaces any pre-referral dose (Ethiopia)."
        ],
        avoid: [
          "Rectal artesunate for older children or adults (WHO).",
          "Waiting: the risk of death is greatest in the first 24 h."
        ],
        followup: [
          "If referral is truly impossible: continue the parenteral (or rectal) doses until oral treatment is possible, then a full ACT course (WHO)."
        ],
        caseId: "severe-malaria",
        refs: [
          {
            book: "ethmal",
            text: "Pre-referral options in descending order: IM artesunate, IM artemether, IM quinine.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 5.3.5 Pre-referral treatment, pdf p. 115",
            pdf_page: 115,
            quote: "intramuscular artesunate; intramuscular artemether; and intramuscular quinine"
          },
          {
            book: "ethmal",
            text: "IMNCI very severe febrile disease: first dose of artesunate or artemether, plus ampicillin and gentamicin, and refer.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 3.4 IMNCI fever classification (very severe febrile disease), pdf p. 62",
            pdf_page: 62,
            quote: "Give the first dose of Artesunate or artemether for severe"
          },
          {
            book: "whomal",
            text: "WHO: for children under 6 years, IM artesunate, then rectal artesunate, IM artemether, IM quinine.",
            ref: "WHO guidelines for malaria 2026, 5.2.2.3 Pre-referral treatment options, p. 221",
            pdf_page: 221,
            quote: "The recommended pre-referral treatment options for children <6 years, in descending order of preference"
          },
          {
            book: "whomal",
            text: "Rectal artesunate should not be used in older children and adults.",
            ref: "WHO guidelines for malaria 2026, 5.2.2.3 Pre-referral treatment options, p. 222",
            pdf_page: 222,
            quote: "Rectal artesunate should not be used in older children and adults"
          },
          {
            book: "whomal",
            text: "Rectal artesunate: single dose of 10 mg/kg.",
            ref: "WHO guidelines for malaria 2026, 5.2.2.3 Pre-referral treatment options, p. 222",
            pdf_page: 222,
            quote: "The single dose of 10 mg/kg bw of artesunate when given as a suppository"
          }
        ]
      },
      {
        id: "treatment-failure",
        group: "When it goes wrong",
        title: "Back with malaria within 28 days",
        who: "Treated for malaria in the past 28 days, fever again, parasites on MICROSCOPY, no danger sign",
        give: [
          {
            drug: "dihydroartemisinin-piperaquine",
            label: "Dihydroartemisinin–piperaquine",
            dose: "By weight, once daily for 3 days (only when no cause such as vomiting or missed doses is found)",
            dosing: "dhapq"
          },
          {
            drug: "primaquine",
            label: "Plus primaquine",
            dose: "Falciparum: single dose 0.25 mg base/kg. Vivax: 14 days, if the first radical-cure course was completed; if still taking it, just finish it",
            dosing: "primaquine"
          }
        ],
        also: [
          "Confirm by microscopy, not RDT: HRP2 stays positive for weeks (Ethiopia; WHO). Health posts refer.",
          "Find the cause first: vomited or missed doses, AL without fat, wrong band, interacting drug, fake pack, another diagnosis (relapsing fever). Cause found: fix it and repeat the first-line drug (Ethiopia).",
          "A different species from the first episode: first-line treatment for that species (Ethiopia).",
          "WHO: second line is any other ACT that works locally; 7-day quinine or artesunate regimens are no longer generally recommended."
        ],
        avoid: [
          "Switching on an RDT result alone.",
          "DHA-PPQ with a cardiac disorder or a QT-prolonging drug (see the drug page)."
        ],
        followup: [
          "Smear negative and no cause: re-evaluate or refer. More than 28 days: treat as a new infection with first-line drugs."
        ],
        caseId: "uncomplicated-malaria",
        refs: [
          {
            book: "ethmal",
            text: "Consider treatment failure in a patient treated for malaria in the past 28 days.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.4 Treatment failure, pdf p. 87",
            pdf_page: 87,
            quote: "consider treatment failure in a patient with malaria who was treated for malaria in the past 28 days"
          },
          {
            book: "ethmal",
            text: "Confirm parasites by microscopy, not RDT.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.4 Management of treatment failure, pdf p. 88",
            pdf_page: 88,
            quote: "if parasites are detected by microscopy (Note: do not use RDTs)"
          },
          {
            book: "ethmal",
            text: "With no cause identified, change to the second-line drug, dihydroartemisinin–piperaquine.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.4 Management of treatment failure, pdf p. 88",
            pdf_page: 88,
            quote: "the treatment should be changed to the second-line drug, i.e. Dihydroartemisnin-piperaquine tablets"
          },
          {
            book: "whomal",
            text: "WHO: the recommended second-line treatment is an alternative ACT known to be effective in the region.",
            ref: "WHO guidelines for malaria 2026, 5.2.1.2 Recurrent falciparum malaria, p. 179",
            pdf_page: 179,
            quote: "The recommended second-line treatment is an alternative ACT known to be effective in the region"
          }
        ]
      },
      {
        id: "relapse",
        group: "When it goes wrong",
        title: "Vivax again (relapse)",
        who: "P. vivax again more than 28 days after a previous episode",
        give: [
          {
            drug: "chloroquine",
            label: "Chloroquine",
            dose: "25 mg base/kg over 3 days by the table (first-line again)",
            dosing: "chloroquine"
          },
          {
            drug: "primaquine",
            label: "Primaquine (radical cure)",
            dose: "0.25 mg base/kg daily for 14 days — check that it is actually taken this time",
            dosing: "primaquine"
          }
        ],
        also: [
          "After 28 days a recurrence is treated as a new infection with first-line drugs (Ethiopia; WHO).",
          "Ask whether primaquine was given last time, and whether all 14 days were taken; relapses start about 5–7 weeks after chloroquine if no primaquine was given (WHO).",
          "Pregnant, or breastfeeding an infant under 6 months: chloroquine, then weekly chloroquine — no primaquine."
        ],
        avoid: [
          "No primaquine in pregnancy, in infants under 6 months, in a woman breastfeeding an infant under 6 months, or with moderate to severe anaemia (Ethiopia)."
        ],
        followup: ["Within 28 days instead: use 'Back with malaria within 28 days'."],
        caseId: "uncomplicated-malaria",
        refs: [
          {
            book: "ethmal",
            text: "All presumed treatment failures after four weeks should be considered new infections and treated with the first-line drug.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.4 Management of treatment failure, pdf p. 88",
            pdf_page: 88,
            quote: "all presumed treatment failures after four weeks of initial treatment should be"
          },
          {
            book: "whomal",
            text: "Without primaquine radical cure, vivax relapses begin about 5–7 weeks after chloroquine treatment.",
            ref: "WHO guidelines for malaria 2026, 5.2.1.5 P. vivax, P. ovale, P. malariae or P. knowlesi, p. 193",
            pdf_page: 193,
            quote: "relapses begin to occur 5–7 weeks after"
          }
        ]
      },
      {
        id: "hiv-tb",
        group: "Special groups",
        title: "With HIV, TB drugs or malnutrition",
        who: "Malaria in a person on ART or HIV prophylaxis, on rifampicin-based TB treatment, or malnourished",
        give: [
          {
            drug: "artemether-lumefantrine",
            label: "Usual drug for the species",
            dose: "Same drugs and same doses as for anyone else (Ethiopia; WHO)",
            dosing: "al"
          }
        ],
        also: [
          "Rifampicin lowers ACT levels (WHO: artemether nine-fold, lumefantrine three-fold) and recrudescence is more likely: give the full course with fat, and test again by microscopy for any fever in the next 4 weeks (Ethiopia; WHO).",
          "Efavirenz lowers lumefantrine 2–4-fold (WHO): monitor closely.",
          "DHA-PPQ with antiretrovirals: monitor (Ethiopia).",
          "Malnutrition: no dose change, but monitor the response more closely (Ethiopia)."
        ],
        avoid: [
          "Stopping TB or HIV treatment to treat malaria.",
          "Artesunate–amodiaquine with efavirenz or zidovudine, artesunate–SP with cotrimoxazole (WHO)."
        ],
        followup: ["Review on day 3 and at any fever in the next 4 weeks."],
        caseId: "uncomplicated-malaria",
        refs: [
          {
            book: "ethmal",
            text: "There is insufficient information to change the antimalarial drugs or doses for people with HIV.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 Malaria and HIV, pdf p. 84",
            pdf_page: 84,
            quote: "insufficient information to change the drugs and dose of anti-malarial drugs we used for non-HIV-infected"
          },
          {
            book: "ethmal",
            text: "Patients on anti-TB drugs are at higher risk of recrudescence and should be monitored closely.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 Malaria and TB, pdf p. 84",
            pdf_page: 84,
            quote: "these patients are at higher risk of recrudescent"
          },
          {
            book: "whomal",
            text: "With rifampicin, exposure to artemether, dihydroartemisinin and lumefantrine was much lower.",
            ref: "WHO guidelines for malaria 2026, 5.2.1.4.3 Patients co-infected with tuberculosis, p. 190",
            pdf_page: 190,
            quote: "administration of artemether + lumefantrine resulted in significantly lower exposure"
          }
        ]
      },
      {
        id: "dark-urine-primaquine",
        group: "When it goes wrong",
        title: "Dark urine or pallor on primaquine",
        who: "Patient on primaquine with dark (tea or cola) urine, yellow eyes, pallor or breathlessness",
        give: [
          {
            drug: "primaquine",
            label: "STOP primaquine",
            dose: "Stop now and never give it again; write 'probable G6PD deficiency' on the card",
            dosing: null
          }
        ],
        also: [
          "Check haemoglobin, pulse, blood pressure and urine output; encourage fluids or give IV fluids if the urine is dark and scanty; transfuse for severe anaemia.",
          "Dark urine is also a sign of severe malaria: examine for other danger signs.",
          "Relapse prevention later (WHO): a known G6PD-deficient patient may get primaquine 0.75 mg base/kg once a week for 8 weeks under close medical supervision. The Ethiopian manual says never again."
        ],
        avoid: ["Restarting primaquine (Ethiopia).", "Other oxidant drugs such as dapsone."],
        followup: [
          "Review daily until the haemoglobin is stable; report the reaction (primaquine is under special pharmacovigilance in Ethiopia)."
        ],
        caseId: "uncomplicated-malaria",
        refs: [
          {
            book: "ethmal",
            text: "With evidence of haemolysis, stop primaquine and do not give it to the patient in the future.",
            ref: "Ethiopia FMoH Malaria case management manual 2024, 4.2 Side effects of primaquine, pdf p. 79",
            pdf_page: 79,
            quote: "If there is evidence of hemolysis, primaquine should be discontinued and should not be given to"
          },
          {
            book: "whomal",
            text: "WHO: in G6PD deficiency, primaquine 0.75 mg base/kg once a week for 8 weeks may be considered under close supervision.",
            ref: "WHO guidelines for malaria 2026, 5.2.1.7 Preventing relapse in G6PD deficiency, p. 209",
            pdf_page: 209,
            quote: "primaquine may be considered at a dose of 0.75 mg base/kg bw once a week for"
          }
        ]
      }
    ],
    dosing: [
      {
        id: "al",
        drug: "artemether-lumefantrine",
        label: "Artemether–lumefantrine 20/120 mg tablet (Ethiopia Table 4)",
        per: "tablets per dose",
        schedule: "At once, after 8 h, then morning and evening on days 2 and 3 (6 doses); each dose with milk or fatty food",
        bands: [
          {
            from: 1,
            to: 5,
            value: "1 tablet (Ethiopia) — WHO 2026: the 5/60 mg baby formulation where available; senior decision"
          },
          { from: 5, to: 15, value: "1" },
          { from: 15, to: 25, value: "2" },
          { from: 25, to: 35, value: "3" },
          { from: 35, to: null, value: "4" }
        ],
        note: "Ethiopian bands '<5 kg', '5-14', '15-24', '25-34', '>35' read as <5, 5 to <15, 15 to <25, 25 to <35, and 35 kg and over (the source writes '>35', leaving exactly 35 kg unassigned; 35 and over matches WHO '≥ 35'). The <5 kg row (1 tablet, yellow pack) is Ethiopian; WHO 2026 instead recommends the new 1:12 baby formulation, artemether 5 mg + lumefantrine 60 mg twice daily for 3 days, for infants and neonates under 5 kg. Dispersible tablets come in the yellow (1-tablet) and blue (2-tablet) packs.",
        ref: {
          book: "ethmal",
          text: "Table 4: AL tablets per dose by weight, at once, after 8 hours, then morning and evening on days 2 and 3.",
          ref: "Ethiopia FMoH Malaria case management manual 2024, Table 4, pdf p. 77",
          pdf_page: 77,
          quote: "Table 4. Tablet containing 20 mg Artemether plus 120 mg Lumefantrine in a fixed dose"
        }
      },
      {
        id: "chloroquine",
        drug: "chloroquine",
        label: "Chloroquine 150 mg base tablet or 50 mg base/5 mL syrup (Ethiopia Table 5)",
        per: "dose on each of days 1, 2 and 3",
        schedule: "Once daily for 3 days (total 25 mg base/kg); never more than 4 tablets in a day",
        bands: [
          {
            from: 5,
            to: 7,
            value: "Day 1: ½ tab or 5 mL · Day 2: ½ tab or 5 mL · Day 3: ¼ tab or 2.5 mL"
          },
          {
            from: 7,
            to: 11,
            value: "Day 1: ½ tab or 7.5 mL · Day 2: ½ tab or 7.5 mL · Day 3: ½ tab or 5 mL"
          },
          {
            from: 11,
            to: 15,
            value: "Day 1: 1 tab or 12.5 mL · Day 2: ½ tab or 12.5 mL · Day 3: ½ tab or 7.5 mL"
          },
          {
            from: 15,
            to: 19,
            value: "Day 1: 1 tab or 15 mL · Day 2: 1 tab or 15 mL · Day 3: 1 tab or 15 mL"
          },
          {
            from: 19,
            to: 25,
            value: "Day 1: 1½ tabs or 20 mL · Day 2: 1½ tabs or 20 mL · Day 3: 1 tab or 15 mL"
          },
          { from: 25, to: 36, value: "Day 1: 2½ tabs · Day 2: 2 tabs · Day 3: 1 tab" },
          { from: 36, to: 51, value: "Day 1: 3 tabs · Day 2: 2 tabs · Day 3: 2 tabs" },
          { from: 51, to: null, value: "Day 1: 4 tabs · Day 2: 4 tabs · Day 3: 2 tabs" }
        ],
        note: "Copied exactly from Ethiopia Table 5 (pdf p. 78). Whole-kg bands '5–6', '7–10', '11–14', '15–18', '19–24', '25-35', '36-50', '51+' read as 5 to <7, 7 to <11, 11 to <15, 15 to <19, 19 to <25, 25 to <36, 36 to <51, 51 and over. No syrup volumes are given from 25 kg. The tablet and syrup columns are NOT mg-equivalent in several rows (a ½ tablet is 75 mg base, 5 mL is 50 mg): 5–6 kg (75 vs 50 mg on days 1–2), 7–10 kg day 3 (½ tab = 75 mg vs 5 mL = 50 mg), 11–14 kg day 2 (½ tab = 75 mg vs 12.5 mL = 125 mg; the row totals, 2 tabs and 32.5 mL, are internally consistent), 19–24 kg days 1–2 (1½ tabs = 225 mg vs 20 mL = 200 mg). Give one form for the whole course; do not mix tablets and syrup. No band under 5 kg: Ethiopia's algorithm gives AL when chloroquine syrup is not available.",
        ref: {
          book: "ethmal",
          text: "Table 5: chloroquine 150 mg base tablets or syrup 50 mg base per 5 mL by weight band, days 1–3.",
          ref: "Ethiopia FMoH Malaria case management manual 2024, Table 5, pdf p. 78",
          pdf_page: 78,
          quote: "Table 5. Tablets of chloroquine 150 mg base or syrup 50 mg base per 5 ml"
        }
      },
      {
        id: "primaquine",
        drug: "primaquine",
        label: "Primaquine 7.5 mg base tablet (or 15 mg base tablet) (Ethiopia Table 6)",
        per: "dose (once only for falciparum; once daily for 14 days for vivax, ovale or mixed)",
        schedule: "Single dose on day 1 with the ACT, or daily for 14 days, with food",
        bands: [
          { from: 8, to: 19, value: "½ × 7.5 mg (or ¼ × 15 mg)" },
          { from: 19, to: 25, value: "¾ × 7.5 mg (or ½ × 15 mg) — the two columns differ" },
          { from: 25, to: 36, value: "1 × 7.5 mg (or ½ × 15 mg)" },
          { from: 36, to: 51, value: "1½ × 7.5 mg (or ¾ × 15 mg)" },
          { from: 51, to: null, value: "2 × 7.5 mg (or 1 × 15 mg)" }
        ],
        note: "Ethiopia Table 6 (pdf p. 79), for 0.25 mg base/kg. Bands '8-18', '19–24', '25–35', '36–50', '50+' read as 8 to <19, 19 to <25, 25 to <36, 36 to <51, and over 50 (51 and over); 50 kg itself appears in both '36–50' and '50+' in the source, read here as 36–50. Source inconsistency: for 19–24 kg the 7.5 mg column gives ¾ tablet (5.6 mg) but the 15 mg column gives ½ tablet (7.5 mg); in every other row the columns match. No band under 8 kg, so a child of 6 months or more who weighs under 8 kg needs a senior decision. Not under 6 months, not in pregnancy, not when breastfeeding an infant under 6 months (Ethiopia). WHO's single-dose table (7.5 mg tablets) differs: 5 to <25 kg 3.75 mg; 25 to <50 kg 7.5 mg; 50–100 kg 15 mg.",
        ref: {
          book: "ethmal",
          text: "Table 6: primaquine 7.5 mg and 15 mg tablet fractions by weight band.",
          ref: "Ethiopia FMoH Malaria case management manual 2024, Table 6, pdf p. 79",
          pdf_page: 79,
          quote: "Table 6. Tablet containing 7.5 mg of Primaquine"
        }
      },
      {
        id: "dhapq",
        drug: "dihydroartemisinin-piperaquine",
        label: "Dihydroartemisinin–piperaquine: paediatric 20/160 mg or adult 40/320 mg tablet (Ethiopia Table 7)",
        per: "tablets once a day",
        schedule: "Once daily for 3 days; with water or a normal meal, not a high-fat meal",
        bands: [
          { from: 5, to: 8, value: "1 paediatric (20/160 mg)" },
          { from: 8, to: 11, value: "1½ paediatric (20/160 mg)" },
          { from: 11, to: 17, value: "1 adult (40/320 mg)" },
          { from: 17, to: 25, value: "1½ adult" },
          { from: 25, to: 36, value: "2 adult" },
          { from: 36, to: 60, value: "3 adult" },
          { from: 60, to: 80, value: "4 adult" },
          { from: 80, to: null, value: "5 adult (WHO 200 + 1600 mg; the Ethiopian table stops at 80 kg)" }
        ],
        note: "Bands copied from Ethiopia Table 7 (pdf p. 81), already written as 'from to <to'. The Ethiopian table has no row at or above 80 kg; the 80 kg+ row is WHO's (>80 kg: 200 mg + 1600 mg a day = 5 adult tablets). WHO writes its 60–80 row as '60 < 80'. No Ethiopian band under 5 kg (WHO's first row is '< 8 kg'); AL is the Ethiopian drug for that age. Children under 25 kg need at least 2.5 mg/kg DHA and 20 mg/kg piperaquine a day (WHO).",
        ref: {
          book: "ethmal",
          text: "Table 7: dihydroartemisinin–piperaquine tablets by weight band, once daily for 3 days.",
          ref: "Ethiopia FMoH Malaria case management manual 2024, Table 7, pdf p. 81",
          pdf_page: 81,
          quote: "Table 7. Dihydroartemisinin-piperaquine dose"
        }
      }
    ],
    drugs: [
      "artemether-lumefantrine",
      "primaquine",
      "chloroquine",
      "dihydroartemisinin-piperaquine",
      "artesunate",
      "quinine"
    ],
    cases: ["uncomplicated-malaria", "severe-malaria"],
    sources: [
      {
        name: "Ethiopia FMoH. Malaria case management training manual, approved 2024 (from the National Malaria Guidelines 2022)"
      },
      { name: "WHO guidelines for malaria, 10 September 2026" }
    ]
  },
  {
    id: "hiv",
    name: "HIV",
    icon: "shield",
    short: "Starting ART, children, pregnancy, newborns, viral load and failure, advanced disease, cryptococcal meningitis, TB, PEP and PrEP.",
    summary: "Confirm, start ART the same day if ready, dose children by weight band, check viral load on schedule, act on a high result. Ethiopia MoH manual 2025 first; WHO 2025 shown where it differs. Advanced HIV disease (CD4 under 200, WHO stage 3–4, or any child under 5) gets the screening and prophylaxis package before ART timing is decided.",
    basis: [
      "Ethiopia MoH National HIV PCT manual 2025",
      "WHO HIV clinical management 2025",
      "WHO HIV & STI recommendations overview 2025"
    ],
    firstLook: [
      "Headache, neck stiffness or confusion — rule out cryptococcal and TB meningitis before starting ART",
      "Woman first found HIV-positive in labour — ART within the hour; enhanced prophylaxis for the baby within 1 hour of birth",
      "Exposure in the last 72 hours — PEP now, test later"
    ],
    scenarios: [
      {
        id: "ahd-package",
        group: "Assess first",
        title: "New or returning: AHD package",
        who: "CD4 under 200 or WHO stage 3–4 (age 5+); any child with HIV under 5; back after more than 28 days off ART",
        give: [
          {
            drug: "cotrimoxazole",
            label: "Cotrimoxazole prophylaxis",
            dose: "Once daily by age/weight band (Ethiopia Table 11.2)",
            dosing: "ctx"
          },
          {
            drug: "isoniazid",
            label: "TB preventive therapy (3HP or 6H)",
            dose: "Only after TB is excluded; regimen by age and ART — see the TPT scenarios",
            dosing: null
          },
          {
            drug: "fluconazole",
            label: "Fluconazole if serum CrAg positive without meningitis (or no CrAg test and CD4 under 100)",
            dose: "800 mg daily × 2 weeks, then 400 mg daily × 8 weeks, then 200 mg daily",
            dosing: null
          }
        ],
        also: [
          "CD4 for everyone starting or restarting ART. No CD4: use WHO clinical staging (WHO 2025).",
          "TB symptom screen every visit: cough, fever, weight loss, night sweats (children: poor weight gain, TB contact). Positive: sputum Xpert, chest X-ray where available.",
          "Urine LF-LAM: inpatients with TB symptoms, AHD or seriously ill, or CD4 under 200; outpatients with TB symptoms or seriously ill, or CD4 under 100; every child under 5 at least once.",
          "Serum CrAg: age 10 and over with CD4 under 100, before starting or restarting ART. Positive: ask about headache and confusion; any symptom → lumbar puncture.",
          "'Seriously ill' = respiratory rate over 30, temperature over 39 °C, pulse over 120, or cannot walk unaided.",
          "Start ART same day, no later than 7 days. A positive TB symptom screen does not delay ART if there are no signs of meningitis.",
          "Children under 5: pneumococcal vaccine catch-up; check BCG, measles, HBV and HPV status."
        ],
        avoid: [
          "Same-day ART when there are signs of meningitis: do a lumbar puncture first (cryptococcal: ART after 4–6 weeks; TB meningitis: after 4–8 weeks).",
          "LF-LAM as a triage test or without assessing symptoms; a negative LAM does not rule TB out.",
          "Routine CrAg screening under 10 years (test only if there are meningitis symptoms)."
        ],
        followup: [
          "See the patient within 1–2 weeks of starting ART: the first 3 months carry the highest risk of death, IRIS and drug reactions.",
          "Repeat CD4 if clinically unstable, after another interruption, or with two viral loads over 1,000.",
          "Patients leaving hospital: medication review, discharge plan, phone call or home/peer visit (WHO 2025)."
        ],
        caseId: "advanced-hiv-disease",
        refs: [
          {
            book: "ethhiv",
            text: "AHD: CD4 under 200 or WHO stage 3–4 (age 5+); all children under 5.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.7 Management of Advanced HIV Disease, p. 261",
            pdf_page: 291,
            quote: "All children younger than five years old with HIV are considered as having advanced HIV disease."
          },
          {
            book: "ethhiv",
            text: "Package of screening, treatment, prophylaxis, rapid ART and adherence support for all with AHD, including re-engagement after >28 days.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.7, p. 262",
            pdf_page: 292,
            quote: "including those who are reengaging with care after a period of interruption for >28 days"
          },
          {
            book: "ethhiv",
            text: "CD4 at baseline and on restarting ART after 28 days or more off treatment.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.7, p. 262",
            pdf_page: 292,
            quote: "reinitiating treatment after 28 days or greater of ART interruption"
          },
          {
            book: "ethhiv",
            text: "LF-LAM inpatients: TB symptoms, AHD or seriously ill, or CD4 under 200.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1 Urine LF LAM, p. 195",
            pdf_page: 225,
            quote: "Irrespective of signs and symptoms of TB, with a CD4 cell count of less than 200 cells/mm3"
          },
          {
            book: "ethhiv",
            text: "LF-LAM outpatients: TB symptoms or seriously ill, or CD4 under 100; not a triage test.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1 Urine LF LAM, p. 196",
            pdf_page: 226,
            quote: "Irrespective of signs and symptoms of TB and with a CD4 cell count of less than 100 cells/mm3"
          },
          {
            book: "ethhiv",
            text: "LF-LAM at least once for every child with HIV under 5.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1, p. 198",
            pdf_page: 228,
            quote: "LF_LAM test should be conducted for all HIV infected children under 5 years at least once"
          },
          {
            book: "ethhiv",
            text: "CrAg screening for people 10 years and over with AHD; CD4 under 100 before ART.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Prevention of cryptococcal disease, p. 234",
            pdf_page: 264,
            quote: "Screening for cryptococcal antigen is the preferred approach for identifying infection when managing people aged 10 years or older presenting with AHD"
          },
          {
            book: "ethhiv",
            text: "Positive TB symptom screen: start ART while TB is investigated if no signs of meningitis.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.16, p. 263",
            pdf_page: 293,
            quote: "People receiving a positive WHO four-symptom screen should initiate ART while being evaluated for TB"
          },
          {
            book: "ethhiv",
            text: "No CrAg test: fluconazole primary prophylaxis for CD4 under 100.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.16, p. 263",
            pdf_page: 293,
            quote: "When cryptococcal antigen screening is not available, fluconazole primary prophylaxis should be given"
          },
          {
            book: "ethhiv",
            text: "Rapid ART: preferably same day, no later than 7 days, unless TB or cryptococcal meningitis.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.17, p. 264",
            pdf_page: 294,
            quote: "Preferably same-day but no later than seven days after diagnosis with optimal regimens"
          },
          {
            book: "ethhiv",
            text: "No routine CrAg screening under 10 years.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.7, p. 265",
            pdf_page: 295,
            quote: "routine cryptococcal antigen screening and pre-emptive therapy are not recommended for children younger than 10 years"
          },
          {
            book: "whohivsti",
            text: "WHO 2025: CD4 is the preferred test to identify AHD; clinical staging where CD4 is unavailable.",
            ref: "WHO HIV & STI recommendations overview 2025, Advanced HIV disease, p. 4",
            pdf_page: 7,
            quote: "CD4 testing is recommended as the preferred method to identify advanced HIV"
          },
          {
            book: "ethhiv",
            text: "CPT for all children under 5 regardless of CD4 or stage.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.18, p. 266",
            pdf_page: 296,
            quote: "For children <5 years, provide CPT until 5years irrespective of CD4 and WHO Staging."
          },
          {
            book: "ethhiv",
            text: "STOP table: vaccinations for children with AHD.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.17, p. 264",
            pdf_page: 294,
            quote: "Pneumococcal vaccine"
          },
          {
            book: "ethhiv",
            text: "Death, IRIS and drug reactions concentrate in the first months of ART.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.6.2 What to expect in the first months of ART, p. 307",
            pdf_page: 337,
            quote: "Death rates are also highest in the first three months of ART."
          }
        ]
      },
      {
        id: "art-adult-start",
        group: "Treat",
        title: "Start ART: adult or adolescent ≥30 kg",
        who: "Confirmed HIV, not on ART, 30 kg or more (pregnant and breastfeeding women included)",
        give: [
          {
            drug: "dolutegravir",
            label: "TLD (TDF 300 / 3TC 300 / DTG 50 mg)",
            dose: "One tablet once daily, for life",
            dosing: "tld"
          }
        ],
        also: [
          "Confirm with the national three-test algorithm and re-test at the ART site before starting",
          "Start today if ready (rapid ART = same day or within 7 days); missing baseline tests must not delay ART",
          "Baseline if available: Hb/CBC, CD4, CrAg if CD4 ≤100, HBsAg, HCV, creatinine/eGFR, pregnancy test, fasting glucose",
          "TB symptom screen; start CPT, TPT and fluconazole preventive therapy if indicated",
          "Index testing of partners and children"
        ],
        avoid: [
          "Do not start ART yet in TB meningitis (delay 4–8 weeks) or cryptococcal meningitis (delay 4–6 weeks)",
          "No TLD if eGFR under 50, uncontrolled hypertension or untreated diabetes: DTG 50 mg + ABC/3TC or AZT/3TC instead",
          "No AZT if haemoglobin is under 7 g/dL"
        ],
        followup: [
          "2 weeks after starting, then every 4 weeks until 24 weeks",
          "Hb at 4 weeks if on AZT",
          "Viral load at 6 and 12 months, then every 12 months"
        ],
        caseId: "hiv-art",
        refs: [
          {
            book: "ethhiv",
            text: "Preferred first line for adults and adolescents including pregnant and breastfeeding women is TDF + 3TC + DTG once daily.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.4, p. 277",
            pdf_page: 307,
            quote: "including pregnant and breast-feeding women is TDF+ 3TC+DTG as a once-daily dose"
          },
          {
            book: "ethhiv",
            text: "Rapid ART is initiation the same day or within seven days of diagnosis.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.2.1, p. 275",
            pdf_page: 305,
            quote: "Rapid ART initiation is defined as initiation of ART same day or within seven days of HIV diagnosis"
          },
          {
            book: "ethhiv",
            text: "Missing baseline tests should not delay ART initiation.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, p. 307",
            pdf_page: 337,
            quote: "If the recommended baseline tests are not available, it should not delay ART initiation"
          },
          {
            book: "ethhiv",
            text: "Viral load at 6 and 12 months after starting, then every 12 months.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 12.7, p. 305",
            pdf_page: 335,
            quote: "HIV viral load at 6 and 12 months after initiating ART and every 12 months"
          }
        ]
      },
      {
        id: "art-child-start",
        group: "Treat",
        title: "Start ART: child ≥4 weeks, 3 to <30 kg",
        who: "Child with confirmed HIV (DNA PCR under 18 months), older than 4 weeks, weighing 3 kg to under 30 kg",
        give: [
          {
            drug: "abacavir-lamivudine",
            label: "ABC/3TC 120/60 mg dispersible",
            dose: "By weight band, once daily",
            dosing: "abc3tc"
          },
          {
            drug: "dolutegravir",
            label: "Dolutegravir: pDTG 10 mg dispersible, DTG 50 mg from 20 kg",
            dose: "By weight band, once daily",
            dosing: "pdtg"
          }
        ],
        also: [
          "Dissolve pDTG and ABC/3TC together in 10–20 mL of clean water; give within 30 minutes; rinse the cup and give that too",
          "Re-weigh at every visit and move up a band at each edge",
          "Infant with a first positive DNA PCR: start ART now and send a second DBS to confirm; if the second is negative, do a third before stopping",
          "Parental consent and caregiver support; a treatment supporter"
        ],
        avoid: [
          "Do not give TLD under 30 kg (300 mg TDF harms bone and kidney in small children)",
          "Do not swap pDTG and DTG 50 mg film-coated 1:1 (50 mg FCT ≈ 30 mg dispersible)",
          "No efavirenz under 3 years",
          "Under 4 weeks old: the Ethiopian manual gives no regimen — senior advice (WHO 2025 neonatal ABC/3TC + DTG schedule)"
        ],
        followup: [
          "2 weeks, then every 4 weeks to 24 weeks; dose by new weight each visit",
          "Viral load at 6 and 12 months, then yearly"
        ],
        caseId: "hiv-art",
        refs: [
          {
            book: "ethhiv",
            text: "Preferred first line for children over 4 weeks and at least 3 kg is ABC + 3TC + DTG.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.4, p. 277",
            pdf_page: 307,
            quote: "The preferred first-line regimen for children > 4weeks and ≥3kg"
          },
          {
            book: "ethhiv",
            text: "From 20 kg use the film-coated DTG 50 mg tablet, 1 tablet daily.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Annex 10, Table 10a, p. 469",
            pdf_page: 499,
            quote: "Use the film coated DTG 50mg tablet, 1 tablet daily."
          },
          {
            book: "ethhiv",
            text: "DTG 50 mg film-coated is about equal to 30 mg of dispersible tablets.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, p. 278",
            pdf_page: 308,
            quote: "DTG dose of 50 mg FCT is approximately equal to 30 mg of DT"
          },
          {
            book: "ethhiv",
            text: "Infants positive on the first DNA PCR start ART while a confirmatory DNA PCR is taken.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.2.2, p. 276",
            pdf_page: 306,
            quote: "initiate ART and take DBS specimen for confirmatory DNA PCR"
          }
        ]
      },
      {
        id: "tb-hiv",
        group: "Treat",
        title: "TB with HIV: treat and time ART",
        who: "TB confirmed (Xpert, LF-LAM) or clinically diagnosed in a person with HIV — no meningitis",
        give: [
          {
            drug: "tb-rhze",
            label: "RHZE then RH (fixed-dose tablets)",
            dose: "2 months RHZE + 4 months RH daily by weight band (bone/joint TB: 2RHZE/10RH)",
            dosing: null
          },
          {
            drug: "cotrimoxazole",
            label: "Cotrimoxazole prophylaxis",
            dose: "Once daily by band",
            dosing: "ctx"
          }
        ],
        also: [
          "Start ART as soon as possible within 2 weeks of starting TB treatment, whatever the CD4 — including drug-resistant TB.",
          "Already on ART when TB is found: start TB treatment, adjust the ART for rifampicin (dolutegravir 50 mg twice daily — see the ARV entries), and check for ART failure.",
          "A positive LF-LAM is enough to start TB treatment.",
          "Pyridoxine with isoniazid for those at risk."
        ],
        avoid: [
          "Waiting for a CD4 result before ART.",
          "TB preventive therapy in someone with TB disease.",
          "3HP or other rifamycin TPT given alongside TB treatment (they already take rifampicin)."
        ],
        followup: [
          "Hepatitis symptoms at every visit; weigh monthly and move up the band.",
          "Worse 2–8 weeks after ART starts: TB IRIS — continue both treatments (see IRIS)."
        ],
        caseId: "tuberculosis",
        refs: [
          {
            book: "ethhiv",
            text: "ART within 2 weeks of TB treatment regardless of CD4.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.6, p. 201",
            pdf_page: 231,
            quote: "ART should be started as soon as possible within two weeks of initiating TB treatment"
          },
          {
            book: "ethhiv",
            text: "On ART when TB is diagnosed: start anti-TB, modify ART, evaluate for failure.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.6, p. 201",
            pdf_page: 231,
            quote: "Evaluate for treatment failure"
          },
          {
            book: "ethhiv",
            text: "2RHZE/10RH for CNS and bone/joint TB.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.5, p. 201",
            pdf_page: 231,
            quote: "New clients with CNS TB (meningitis, tuberculoma)"
          },
          {
            book: "ethhiv",
            text: "LF-LAM outpatients: TB symptoms or seriously ill, or CD4 under 100; not a triage test.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1 Urine LF LAM, p. 196",
            pdf_page: 226,
            quote: "Irrespective of signs and symptoms of TB and with a CD4 cell count of less than 100 cells/mm3"
          },
          {
            book: "ethhiv",
            text: "Start ART right away after diagnosis except with TB and/or cryptococcal meningitis.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.2.1 When to start ART, p. 275",
            pdf_page: 305,
            quote: "except when they have TB and/or cryptococcal meningitis"
          }
        ]
      },
      {
        id: "oi-oesophageal-candida",
        group: "Treat",
        title: "Thrush or painful swallowing",
        who: "White plaques in the mouth; with pain or difficulty swallowing or chest pain on swallowing = oesophageal candidiasis",
        give: [
          {
            drug: "fluconazole",
            label: "Oesophageal candidiasis: fluconazole",
            dose: "Adult 200 mg once daily; child 6 mg/kg once daily; for 14–21 days",
            dosing: null
          },
          {
            drug: "miconazole",
            label: "Oral thrush only: miconazole 2 % oral gel",
            dose: "Apply twice daily",
            dosing: null
          },
          {
            drug: "fluconazole",
            label: "Recurrent or oropharyngeal thrush: fluconazole",
            dose: "100 mg once daily for 10 days",
            dosing: null
          }
        ],
        also: [
          "Treat on clinical grounds when thrush comes with painful swallowing; oesophageal candidiasis can occur without visible thrush.",
          "Admit if the patient cannot swallow fluids or medicines.",
          "Oesophageal candidiasis is a WHO stage 4 condition: start the AHD package and ART.",
          "On ART already: check for treatment failure."
        ],
        avoid: [
          "Ketoconazole (the manual's alternative) with interacting drugs: check the list first.",
          "Oral fluconazole for vaginal thrush in pregnancy (see Fluconazole)."
        ],
        followup: [
          "Review at 1 week. No response: refer or investigate for HSV (acyclovir 400 mg five times daily for 14–21 days) or CMV."
        ],
        caseId: "advanced-hiv-disease",
        refs: [
          {
            book: "ethhiv",
            text: "Oesophageal candidiasis: fluconazole 200 mg 14–21 days.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.2 Dysphagia and odynophagia, p. 214",
            pdf_page: 244,
            quote: "Fluconazole 200 mg (6mg/kg/day in children) PO daily for 14-21 days"
          },
          {
            book: "ethhiv",
            text: "HSV oesophagitis: acyclovir.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.2, p. 215",
            pdf_page: 245,
            quote: "acyclovir 400mg po five times for 14 to 21 days"
          },
          {
            book: "ethhiv",
            text: "Oral thrush: miconazole gel; fluconazole 100 mg × 10 days if recurrent.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.12, p. 244",
            pdf_page: 274,
            quote: "Miconazole gel 2% apply bid"
          },
          {
            book: "ethhiv",
            text: "Fluconazole for recurrent or oropharyngeal thrush.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.12, p. 244",
            pdf_page: 274,
            quote: "Fluconazole 100 mg daily for ten days for recurrent or"
          },
          {
            book: "ethhiv",
            text: "Oesophageal candidiasis is a WHO clinical stage 4 condition.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, ch. 7 WHO clinical staging, p. 126",
            pdf_page: 156,
            quote: "Esophageal candidiasis (or candidiasis of trachea"
          }
        ]
      },
      {
        id: "oi-pcp",
        group: "Treat",
        title: "PCP (Pneumocystis pneumonia)",
        who: "Advanced HIV with breathlessness and dry cough over days to weeks; infant 2–6 months with abrupt fever, fast breathing, cyanosis",
        give: [
          {
            drug: "cotrimoxazole",
            label: "High-dose cotrimoxazole × 21 days",
            dose: "Trimethoprim 15–20 mg/kg/DAY in 3–4 doses (Ethiopia prints 15–25 mg/kg); adult about 2 double-strength (960 mg) tablets 3–4 times daily (Harrison)",
            dosing: null
          },
          {
            drug: null,
            label: "Prednisolone (severely ill, marked respiratory distress)",
            dose: "Adult: 40 mg twice daily × 5 days, 40 mg daily × next 6 days, then 20 mg daily to the end of treatment. Child: 2 mg/kg/day × 7–10 days, then taper over 10–14 days",
            dosing: null
          },
          { drug: "oxygen", label: "Oxygen", dose: "If breathless or hypoxic", dosing: null }
        ],
        also: [
          "Chest X-ray: perihilar interstitial shadowing; normal in 20 %. Look for TB at the same time.",
          "Cotrimoxazole cannot be used, mild to moderate: clindamycin 600 mg four times daily + primaquine 15 mg twice daily (check G6PD).",
          "Severe and cotrimoxazole impossible: IV pentamidine 3–4 mg/kg daily (Harrison).",
          "Start ART within the first 2 weeks of PCP treatment in most patients (Harrison)."
        ],
        avoid: [
          "Stopping at 14 days: give 21 days in HIV.",
          "'Clindamycin + dapsone' as printed in the manual: the textbook partner of dapsone is trimethoprim — confirm before use."
        ],
        followup: [
          "Potassium and creatinine twice weekly on high dose.",
          "Sudden worsening: pneumothorax.",
          "Not better in 7–10 days: re-evaluate.",
          "After 21 days: secondary prophylaxis 960 mg daily."
        ],
        caseId: "pcp",
        refs: [
          {
            book: "ethhiv",
            text: "PCP with CD4 under 200 or under 14 %.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1 Pneumocystis pneumonia, p. 189",
            pdf_page: 219,
            quote: "It commonly occurs when clients have significant immune suppression"
          },
          {
            book: "ethhiv",
            text: "CXR normal in 20 %.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1 Pneumocystis pneumonia, p. 190",
            pdf_page: 220,
            quote: "Note that the chest X-ray can be normal in 20% of clients."
          },
          {
            book: "ethhiv",
            text: "PCP treatment as printed.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1 Pneumocystis pneumonia, p. 190",
            pdf_page: 220,
            quote: "Trimethoprim 15-25 mg/Kg and sulphamethoxazole 75-125mg/kg, three or four times daily for 21 days."
          },
          {
            book: "ethhiv",
            text: "Prednisolone course in severe adult PCP.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1 Pneumocystis pneumonia, p. 190",
            pdf_page: 220,
            quote: "40mg BID for the first five days then, 40 mg daily for the next 6 days"
          },
          {
            book: "ethhiv",
            text: "Severe paediatric PCP: prednisolone 2 mg/kg/day 7–10 days then taper.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1 Pneumocystis pneumonia, p. 190",
            pdf_page: 220,
            quote: "prednisolone 2mg/kg per day for the first 7 - 10 days"
          },
          {
            book: "ethhiv",
            text: "Alternatives for mild to moderate PCP.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1 Pneumocystis pneumonia, p. 190",
            pdf_page: 220,
            quote: "Clindamycin 600 mg QID plus primaquine 15 mg BID"
          },
          {
            book: "ethhiv",
            text: "Second listed alternative (flagged).",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1 Pneumocystis pneumonia, p. 190",
            pdf_page: 220,
            quote: "Clindamycin 600 mg QID plus dapsone 100 mg daily"
          },
          {
            book: "ethhiv",
            text: "Secondary prophylaxis after 21 days.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1 Pneumocystis pneumonia, p. 190",
            pdf_page: 220,
            quote: "Secondary prophylaxis immediately after completion of the course of treatment"
          },
          {
            book: "harrison",
            text: "TMP-SMX 21 days in HIV.",
            ref: "Harrison 22nd ed. 2025, ch. 227 Pneumocystis Infections, p. 1733",
            pdf_page: 1776,
            quote: "for 21 days to all other patients"
          },
          {
            book: "harrison",
            text: "ART within 2 weeks of PCP treatment in most.",
            ref: "Harrison 22nd ed. 2025, ch. 227 Pneumocystis Infections, p. 1734",
            pdf_page: 1777,
            quote: "ART should be started within the first 2 weeks of therapy for PCP"
          },
          {
            book: "harrison",
            text: "IV pentamidine or clindamycin–primaquine when TMP-SMX cannot be used or is failing.",
            ref: "Harrison 22nd ed. 2025, ch. 227 Pneumocystis Infections, p. 1734",
            pdf_page: 1777,
            quote: "Pentamidine must be administered IV over at least 60 min"
          }
        ]
      },
      {
        id: "crypto-crag-positive",
        group: "Treat",
        title: "Serum CrAg positive, no meningitis",
        who: "Blood CrAg positive on screening (CD4 under 100, age 10+) with no headache, confusion or neck stiffness",
        give: [
          {
            drug: "fluconazole",
            label: "Fluconazole pre-emptive therapy (FPT)",
            dose: "800 mg daily × 2 weeks → 400 mg daily × 8 weeks → 200 mg daily",
            dosing: null
          }
        ],
        also: [
          "Ask and examine for headache, confusion, fits, neck stiffness, visual change. Any one → lumbar puncture and treat as meningitis if CSF is positive.",
          "Start or restart ART after the first 2 weeks of fluconazole.",
          "Stop the 200 mg when on ART at least 6 months AND CD4 over 200, or CD4 over 100 with viral load under 50.",
          "On rifampicin: increase the fluconazole dose by 50 %.",
          "No CrAg test and CD4 under 100: give fluconazole primary prophylaxis (same schedule in the Ethiopian manual)."
        ],
        avoid: [
          "Starting ART in the first 2 weeks.",
          "Giving FPT to someone with meningitis symptoms without an LP.",
          "Fluconazole in pregnancy without specialist advice (category D)."
        ],
        followup: [
          "Headache or confusion at any visit → LP the same day.",
          "Liver symptoms; check interacting drugs (warfarin, phenytoin, sulfonylureas)."
        ],
        caseId: "cryptococcal-meningitis",
        refs: [
          {
            book: "ethhiv",
            text: "CrAg screening for people 10 years and over with AHD; CD4 under 100 before ART.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Prevention of cryptococcal disease, p. 234",
            pdf_page: 264,
            quote: "Screening for cryptococcal antigen is the preferred approach for identifying infection when managing people aged 10 years or older presenting with AHD"
          },
          {
            book: "ethhiv",
            text: "CrAg positive with symptoms: LP.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 234",
            pdf_page: 264,
            quote: "if symptomatic they should undergo a LP"
          },
          {
            book: "ethhiv",
            text: "FPT 800 mg × 2 weeks, ART after 2 weeks, 400 mg × 8 weeks, then 200 mg.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Fluconazole pre-emptive therapy, p. 236",
            pdf_page: 266,
            quote: "Treat with Fluconazole 800 mg daily for two weeks"
          },
          {
            book: "ethhiv",
            text: "FPT 400 mg × 8 weeks.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Fluconazole pre-emptive therapy, p. 236",
            pdf_page: 266,
            quote: "Fluconazole 400 mg daily for 8 weeks, then"
          },
          {
            book: "ethhiv",
            text: "Stop 200 mg when on ART 6 months and CD4 over 200, or over 100 with VL under 50.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Fluconazole pre-emptive therapy, p. 236",
            pdf_page: 266,
            quote: "CD4>100 cells/mm3 and Viral suppression (VL< 50)"
          },
          {
            book: "ethhiv",
            text: "With rifampicin increase fluconazole 50 %.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 237",
            pdf_page: 267,
            quote: "fluconazole dose increased by 50% in induction phase"
          },
          {
            book: "ethhiv",
            text: "Fluconazole category D in pregnancy.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 236",
            pdf_page: 266,
            quote: "Category D risk in pregnancy"
          }
        ]
      },
      {
        id: "crypto-meningitis",
        group: "Treat",
        title: "Cryptococcal meningitis: induction",
        who: "HIV with headache, fever, confusion; CSF CrAg or India ink positive (serum CrAg with symptoms if LP impossible)",
        give: [
          {
            drug: "liposomal-amphotericin-b",
            label: "Liposomal amphotericin B",
            dose: "10 mg/kg IV ONCE (day 1), in 5 % dextrose",
            dosing: null
          },
          {
            drug: "flucytosine",
            label: "Flucytosine (5-FC)",
            dose: "25 mg/kg every 6 h (100 mg/kg/day) × 14 days",
            dosing: null
          },
          {
            drug: "fluconazole",
            label: "Fluconazole",
            dose: "1200 mg daily × 14 days (child 12 mg/kg, max 800 mg)",
            dosing: null
          }
        ],
        also: [
          "No liposomal: amphotericin B deoxycholate 1 mg/kg/day + flucytosine × 7 days, then fluconazole 1200 mg × 7 days.",
          "No amphotericin: fluconazole 1200 mg + flucytosine × 14 days.",
          "No flucytosine: liposomal amphotericin 3–4 mg/kg/day + fluconazole 1200 mg × 14 days; or deoxycholate 1 mg/kg/day + fluconazole × 14 days. Flucytosine regimens are superior.",
          "Opening pressure at the first LP; daily therapeutic LPs if raised (see 'Crypto: raised pressure').",
          "Then consolidation: fluconazole 400–800 mg daily (child 6–12 mg/kg, max 800) × 8 weeks; maintenance 200 mg daily (child 6 mg/kg).",
          "Amphotericin safety: saline pre-load, routine potassium and magnesium, potassium/creatinine/haemoglobin twice weekly.",
          "Start cotrimoxazole prophylaxis."
        ],
        avoid: [
          "ART before 4–6 weeks from the start of antifungal treatment (more deaths).",
          "Mannitol, acetazolamide or corticosteroids for raised pressure."
        ],
        followup: [
          "Daily: headache, conscious level, vision, hearing.",
          "Twice weekly: potassium, creatinine, blood count.",
          "ART at 4–6 weeks.",
          "Stop maintenance only after 1 year stable on ART with CD4 200+ twice, 6 months apart."
        ],
        caseId: "cryptococcal-meningitis",
        refs: [
          {
            book: "ethhiv",
            text: "LP with opening pressure and CSF CrAg.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 230",
            pdf_page: 260,
            quote: "prompt lumbar puncture (LP) with measurement of cerebrospinal fluid (CSF) opening pressure"
          },
          {
            book: "ethhiv",
            text: "Preferred induction.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 231",
            pdf_page: 261,
            quote: "A single high dose (10 mg/kg) of Liposomal Amphotericin B with 14 days of flucytosine (100 mg/kg per day divided into four doses per day)"
          },
          {
            book: "ethhiv",
            text: "Children's induction fluconazole dose.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 231",
            pdf_page: 261,
            quote: "12 mg/kg per day for children and adolescents up to a maximum of 800 mg daily"
          },
          {
            book: "ethhiv",
            text: "Flucytosine regimens are superior.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 231",
            pdf_page: 261,
            quote: "Note: Flucytosine-containing regimens are superior."
          },
          {
            book: "ethhiv",
            text: "Consolidation dose.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 231",
            pdf_page: 261,
            quote: "Fluconazole (400–800 mg daily for adults or 6–12 mg/kg per day for children and adolescents up to a"
          },
          {
            book: "ethhiv",
            text: "Maintenance dose.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 231",
            pdf_page: 261,
            quote: "Fluconazole (200 mg daily for adults or 6 mg/kg per day for adolescents and children)"
          },
          {
            book: "ethhiv",
            text: "Stop maintenance: 1 year stable on ART, CD4 200+ twice 6 months apart.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 232",
            pdf_page: 262,
            quote: "greater than or equal to 200 cells/mm3 (two measurements six months apart)"
          },
          {
            book: "ethhiv",
            text: "Cryptococcal meningitis: defer ART 4–6 weeks.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Cryptococcal infection, p. 229",
            pdf_page: 259,
            quote: "ART initiation should be deferred 4–6 weeks from the initiation of antifungal treatment"
          },
          {
            book: "ethhiv",
            text: "Amphotericin toxicity prevention package.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 233",
            pdf_page: 263,
            quote: "minimum package of preventing, monitoring, and managing toxicity is recommended"
          },
          {
            book: "harrison",
            text: "WHO induction as summarised by Harrison.",
            ref: "Harrison 22nd ed. 2025, ch. 221 Cryptococcosis, p. 1705",
            pdf_page: 1748,
            quote: "a single dose of liposomal AmB 10 mg/kg given along with 14 days of 5-FC"
          }
        ]
      },
      {
        id: "oi-zoster",
        group: "Treat",
        title: "Herpes zoster (shingles)",
        who: "Painful vesicular rash in one dermatome in a person with HIV",
        give: [
          {
            drug: null,
            label: "Acyclovir",
            dose: "Adult 800 mg five times daily × 7 days. Child: 20 mg/kg per dose four times daily (the manual prints 20–40 mg/kg; 40 mg/kg is above usual doses — confirm)",
            dosing: null
          }
        ],
        also: [
          "Eye involvement is a medical emergency: refer to an eye specialist.",
          "Monitor kidney function on acyclovir.",
          "Check CD4 and CPT eligibility; start or continue ART.",
          "Herpes simplex (oral or genital): acyclovir 400 mg three times daily for 10 days; lesions over 1 month → start ART promptly."
        ],
        avoid: ["Acyclovir when the rash is more than 72 hours old (Ethiopian manual)."],
        followup: ["Pain control; watch for secondary infection of the blisters."],
        caseId: null,
        refs: [
          {
            book: "ethhiv",
            text: "Herpes zoster: acyclovir 800 mg five times daily for 7 days.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.12, p. 243",
            pdf_page: 273,
            quote: "Acyclovir 800mg 5X per day for seven days."
          },
          {
            book: "ethhiv",
            text: "No acyclovir after 72 hours; eye involvement is an emergency.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.12, p. 243",
            pdf_page: 273,
            quote: "Do not give Acyclovir* if duration is >72 hours."
          },
          {
            book: "ethhiv",
            text: "Child zoster dose as printed.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.12, p. 243",
            pdf_page: 273,
            quote: "20–40 mg/kg per dose four times a day."
          },
          {
            book: "ethhiv",
            text: "Herpes simplex: acyclovir 400 mg three times daily for 10 days; chronic lesions benefit from immediate ART.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.12, p. 243",
            pdf_page: 273,
            quote: "Acyclovir 400mg TID for ten days"
          }
        ]
      },
      {
        id: "oi-toxo",
        group: "Treat",
        title: "Toxoplasmosis (focal brain signs)",
        who: "Headache, confusion, focal weakness or fits with CD4 under 200 — treat empirically if no CT",
        give: [
          {
            drug: "cotrimoxazole",
            label: "Cotrimoxazole (Ethiopian first line)",
            dose: "Adult: 480 mg tablets, 4 every 12 h × 28 days, then 2 every 12 h × 3 months; then 960 mg daily. Child: trimethoprim 5 mg/kg + sulfamethoxazole 25 mg/kg per dose every 12 h (10 mg/kg trimethoprim per DAY) × 28 days, then half. The manual prints 10/50 mg/kg per dose — twice the adult dose per kg — read as a daily total; confirm with a senior.",
            dosing: null
          },
          {
            drug: null,
            label: "Alternative: sulfadiazine + pyrimethamine + folinic acid",
            dose: "Sulfadiazine 1–2 g every 6 h; pyrimethamine 200 mg once, then 50–75 mg daily; folinic acid 10–20 mg daily; 6 weeks (or 3 weeks after lesions resolve)",
            dosing: null
          },
          {
            drug: "clindamycin",
            label: "Alternative: clindamycin with pyrimethamine + folinic acid",
            dose: "Clindamycin 600 mg every 6 h",
            dosing: null
          }
        ],
        also: [
          "Nearly 90 % improve within days; no response in 1–2 weeks makes toxoplasmosis unlikely — think TB, lymphoma, crypto.",
          "Dexamethasone 4 mg every 6 h (child 0.15 mg/kg) only for midline shift, critically raised pressure or deterioration in the first 48 h; taper quickly.",
          "Anticonvulsant only if the patient has had seizures."
        ],
        avoid: ["Routine anticonvulsant prophylaxis.", "Sulfonamides in severe sulfa allergy."],
        followup: ["Neurological signs daily.", "Then secondary prophylaxis and ART."],
        caseId: "advanced-hiv-disease",
        refs: [
          {
            book: "ethhiv",
            text: "Empirical treatment with focal signs and CD4 under 200.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Toxoplasma gondii encephalitis, p. 228",
            pdf_page: 258,
            quote: "empirical treatment is justified when clients present with focal neurological findings"
          },
          {
            book: "ethhiv",
            text: "Toxoplasmosis first line (adult).",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Toxoplasma gondii encephalitis, p. 228",
            pdf_page: 258,
            quote: "Trimethoprim/sulfamethoxazole 80/400, oral, 4 tablets 12 hourly for 28 days"
          },
          {
            book: "ethhiv",
            text: "Toxoplasmosis child dose as printed.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Toxoplasma gondii encephalitis, p. 228",
            pdf_page: 258,
            quote: "10mg of trimethoprim + 50mg of sulfamethoxazole/kg per dose every 12 hours for 28 days"
          },
          {
            book: "ethhiv",
            text: "Secondary prophylaxis 960 mg daily.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Toxoplasma gondii encephalitis, p. 228",
            pdf_page: 258,
            quote: "Secondary prophylaxis: use co-trimoxazole 960mg daily for adults"
          },
          {
            book: "ethhiv",
            text: "Alternative: sulfadiazine + pyrimethamine + folinic acid.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Toxoplasma gondii encephalitis, p. 228",
            pdf_page: 258,
            quote: "PLUS Pyrimethamine, loading dose of 200 mg once"
          },
          {
            book: "ethhiv",
            text: "Dexamethasone for midline shift, raised ICP or deterioration.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Toxoplasma gondii encephalitis, p. 229",
            pdf_page: 259,
            quote: "Dexamethasone (4 mg every six hours"
          }
        ]
      },
      {
        id: "tb-meningitis",
        group: "Treat",
        title: "TB meningitis with HIV",
        who: "Headache, fever, confusion or cranial nerve palsy over 2+ weeks; CSF lymphocytes, low glucose, high protein",
        give: [
          {
            drug: "tb-rhze",
            label: "RHZE then RH",
            dose: "2 months RHZE + 10 months RH daily by weight band (12 months total)",
            dosing: null
          },
          {
            drug: null,
            label: "Prednisolone (all patients)",
            dose: "1 mg/kg daily × 2–4 weeks, then taper over 4–8 weeks",
            dosing: null
          }
        ],
        also: [
          "CSF GeneXpert; AFB is seldom positive. Send CSF CrAg too: cryptococcal meningitis looks similar.",
          "Cotrimoxazole prophylaxis."
        ],
        avoid: ["ART in the first 4 weeks: start it between week 4 and week 8 of TB treatment."],
        followup: ["Conscious level daily; hepatitis symptoms.", "ART by week 8."],
        caseId: "tuberculosis",
        refs: [
          {
            book: "ethhiv",
            text: "TB meningitis: ART after 4 weeks, within 8 weeks.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.6, p. 202",
            pdf_page: 232,
            quote: "ART should be delayed at least four weeks (and initiated within eight weeks) after treatment for TB meningitis is initiated"
          },
          {
            book: "ethhiv",
            text: "TB meningitis: prednisolone 1 mg/kg 2–4 weeks then taper over 4–8 weeks.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Tuberculosis meningitis, p. 238",
            pdf_page: 268,
            quote: "Start prednisolone 1mg/kg for 2-4 wks. then taper off over 4-8wks with Anti-TB for all clients"
          },
          {
            book: "ethhiv",
            text: "Delay ART at least 4 weeks, within 8 weeks.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Tuberculosis meningitis, p. 238",
            pdf_page: 268,
            quote: "Delay ART for at least 4 weeks and initiate within 8weeks"
          },
          {
            book: "ethhiv",
            text: "2RHZE/10RH for CNS and bone/joint TB.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.5, p. 201",
            pdf_page: 231,
            quote: "New clients with CNS TB (meningitis, tuberculoma)"
          },
          {
            book: "ethhiv",
            text: "TB meningitis: CSF GeneXpert; AFB seldom positive.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3 Tuberculosis meningitis, p. 237",
            pdf_page: 267,
            quote: "seldom positive (10-40%)"
          }
        ]
      },
      {
        id: "preg-art",
        group: "Special groups",
        title: "Pregnant or breastfeeding woman",
        who: "HIV-positive woman who is pregnant or breastfeeding, new to ART or already on it",
        give: [
          {
            drug: "dolutegravir",
            label: "TLD (TDF 300 / 3TC 300 / DTG 50 mg)",
            dose: "One tablet once daily; continue an effective existing regimen",
            dosing: "tld"
          }
        ],
        also: [
          "Viral load: newly started — by 3 months after starting (or at 34–36 weeks if close); already on ART — at the first ANC visit; ALL — at 34–36 weeks or at delivery at the latest",
          "Breastfeeding: viral load 3 months after delivery, then every 6 months",
          "Use same-day point-of-care viral load where available; otherwise prioritise her sample and result",
          "Feeding: WHO — exclusive breastfeeding for 6 months, then continue to at least 12 months and up to 24 months with complementary food while on ART"
        ],
        avoid: [
          "Do not stop ART in pregnancy or at delivery",
          "LPV/r is the least preferred PI in pregnancy (more adverse outcomes, WHO 2025)"
        ],
        followup: [
          "Unsuppressed result: enhanced adherence support and urgent repeat (see Viral load above 50)",
          "Baby: prophylaxis from birth and DNA PCR at 4–6 weeks"
        ],
        caseId: "hiv-art",
        refs: [
          {
            book: "ethhiv",
            text: "All pregnant women: viral load at 34–36 weeks (or at delivery at the latest).",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.8.1, p. 330",
            pdf_page: 360,
            quote: "Conduct viral load testing at 34–36 weeks of gestation (or at the latest at delivery)"
          },
          {
            book: "ethhiv",
            text: "Breastfeeding women: viral load 3 months after delivery, then every 6 months.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.8.1, p. 330",
            pdf_page: 360,
            quote: "Conduct viral load test three months after delivery and every six months thereafter"
          },
          {
            book: "whohivclin",
            text: "WHO: exclusive breastfeeding for 6 months, continued to 12 months and possibly 24 months or longer.",
            ref: "WHO HIV clinical management 2025, Executive summary, p. x",
            pdf_page: 12,
            quote: "WHO continues to recommend that mothers with HIV exclusively breastfeed for the first six months"
          }
        ]
      },
      {
        id: "preg-labour",
        group: "Special groups",
        title: "First HIV-positive test in labour",
        who: "Woman in labour or just delivered, newly diagnosed HIV-positive (or diagnosed after birth while breastfeeding)",
        give: [
          {
            drug: "dolutegravir",
            label: "TLD for the mother",
            dose: "First tablet within the same hour of diagnosis, then once daily",
            dosing: "tld"
          },
          {
            drug: "arv-prophylaxis",
            label: "Baby: nevirapine + zidovudine syrup",
            dose: "Start within 1 hour of birth — see HIV-exposed newborn",
            dosing: "nvp-birth"
          }
        ],
        also: [
          "Brief counselling now; detailed ART and adherence counselling after delivery",
          "Do not stop breastfeeding",
          "Link mother and baby to ART/PMTCT follow-up before discharge"
        ],
        avoid: [
          "Do not wait for confirmatory tests or CD4 before the first ART dose or the baby's first prophylaxis dose"
        ],
        followup: [
          "Mother: viral load by 3 months after starting ART",
          "Baby: DNA PCR at 4–6 weeks; WHO 2025 would class this baby as high risk (3-drug prophylaxis)"
        ],
        caseId: "hiv-exposure",
        refs: [
          {
            book: "ethhiv",
            text: "Women identified in labour and delivery: provide ART within the same hour of diagnosis.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 12.2, p. 276",
            pdf_page: 306,
            quote: "provide ART within the same hour of HIV diagnosis"
          },
          {
            book: "whohivclin",
            text: "High-risk infants include those born to women identified for the first time in the postpartum period.",
            ref: "WHO HIV clinical management 2025, 4.1.1, p. 54",
            pdf_page: 70,
            quote: "born to women identified for the first time during the postpartum period"
          }
        ]
      },
      {
        id: "infant-prophylaxis",
        group: "Special groups",
        title: "HIV-exposed newborn: prophylaxis",
        who: "Any baby born to a mother with HIV (Ethiopia treats every HIV-exposed infant as high risk)",
        give: [
          {
            drug: "arv-prophylaxis",
            label: "Nevirapine 10 mg/mL — once daily",
            dose: "Birth to 6 weeks by birth weight; then 20 mg (2 mL or ½ × 50 mg tablet) once daily from 6 to 12 weeks",
            dosing: "nvp-birth"
          },
          {
            drug: "arv-prophylaxis",
            label: "Zidovudine 10 mg/mL — twice daily",
            dose: "Birth to 6 weeks only, by birth weight",
            dosing: "azt-birth"
          }
        ],
        also: [
          "Ethiopia: enhanced postnatal prophylaxis (ePNP) for ALL HIV-exposed infants — AZT for 6 weeks + NVP for 12 weeks, started within 1 hour of birth",
          "Under 2 kg: NVP 2 mg/kg (0.2 mL/kg) once daily and AZT 2 mg/kg (0.2 mL/kg) twice daily",
          "Measure doses with an oral syringe from a little syrup poured into a cup; label the bottle with the opening date",
          "Cotrimoxazole from 6 weeks until HIV is excluded and breastfeeding has ended; routine EPI vaccines, BCG unless symptomatic HIV",
          "WHO 2025 differs: not-high-risk infants get 6 weeks of NVP alone; high-risk infants get ABC/3TC + DTG for 6 weeks, then NVP while breastfeeding until the mother is suppressed"
        ],
        avoid: [
          "Do not wait for the mother's confirmatory test or viral load before the first dose",
          "Do not put the oral syringe into the bottle",
          "Nevirapine rash or jaundice: stop NVP and use AZT only (Ethiopia)"
        ],
        followup: [
          "Re-check the dose at 6 weeks (NVP changes to 20 mg; AZT stops)",
          "Monthly visits for 6 months, then every 3 months to 18 months"
        ],
        caseId: "hiv-exposure",
        refs: [
          {
            book: "ethhiv",
            text: "ePNP for all HEIs: AZT for 6 weeks and NVP for 12 weeks, irrespective of risk, started within 1 hour of birth.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 5.1, p. 92",
            pdf_page: 122,
            quote: "AZT for 6 weeks and NVP for 12 weeks) for all HEIs irrespective of the risk"
          },
          {
            book: "ethhiv",
            text: "Low birth weight infants receive mg/kg dosing: NVP 2 mg/kg once daily, AZT 2 mg/kg twice daily.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 5.2 note, p. 93",
            pdf_page: 123,
            quote: "suggested dose is 2 mg/kg once daily for NVP and 2mg/kg twice daily for AZT"
          },
          {
            book: "whohivclin",
            text: "WHO 2025: infants not at high risk get six weeks of single-drug NVP; high-risk infants get ABC/3TC-DTG.",
            ref: "WHO HIV clinical management 2025, 4.1.1, p. 54",
            pdf_page: 70,
            quote: "Infants who are at high risk of acquiring HIV should receive a three-drug regimen"
          },
          {
            book: "whohivclin",
            text: "WHO: universal enhanced prophylaxis leads to unnecessary drug exposure in most neonates.",
            ref: "WHO HIV clinical management 2025, 4.1.4, p. 59",
            pdf_page: 75,
            quote: "The strategy of recommending universal enhanced prophylaxis leads to unnecessary drug exposure"
          }
        ]
      },
      {
        id: "infant-testing",
        group: "Special groups",
        title: "HIV-exposed infant: testing, follow-up",
        who: "HIV-exposed infant from 4–6 weeks to 18 months (or to the end of breastfeeding)",
        give: [
          {
            drug: "cotrimoxazole",
            label: "Cotrimoxazole preventive therapy",
            dose: "From 6 weeks until HIV is excluded and the infant is no longer at risk from breastfeeding — dose on the cotrimoxazole page",
            dosing: null
          }
        ],
        also: [
          "DNA PCR (DBS) at 4–6 weeks or the earliest opportunity after",
          "Negative at 4–6 weeks: repeat DNA PCR at 9 months, and any time the child is sick with signs of HIV",
          "Final status: antibody test at 18 months, or 12 weeks after breastfeeding stops, whichever is later",
          "Infant 9–12 months not breastfed for over 12 weeks: antibody test first; if positive, DNA PCR",
          "Any positive DNA PCR: start ART at once and send a confirmatory DNA PCR; if that is negative, do a third before stopping ART"
        ],
        avoid: [
          "Do not use an antibody test to diagnose infection under 18 months — maternal antibodies; positive results need DNA PCR",
          "Do not discharge as HIV-free while breastfeeding continues"
        ],
        followup: [
          "Monthly for the first 6 months, then every 3 months until 18 months: growth, development, feeding, TB screen, immunisation"
        ],
        caseId: "hiv-exposure",
        refs: [
          {
            book: "ethhiv",
            text: "DNA PCR at 4–6 weeks; repeat at 9 months if negative.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 5.1, p. 94",
            pdf_page: 124,
            quote: "do DNA PCR testing at 9 months of age for those who tested negative at 4-6 weeks of age"
          },
          {
            book: "ethhiv",
            text: "Final testing at 18 months or 12 weeks after cessation of breastfeeding, whichever is later.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Figure 4.5 notes, p. 81",
            pdf_page: 111,
            quote: "Retesting at 18 months or 12 weeks after cessation of breastfeeding (whichever is later)"
          },
          {
            book: "ethhiv",
            text: "If the second DNA PCR is negative, do a third before interrupting ART.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Figure 4.5 notes, p. 80",
            pdf_page: 110,
            quote: "If the second test is negative, a third DNA PCR should be performed before"
          },
          {
            book: "ethhiv",
            text: "Start cotrimoxazole for all HIV-exposed infants from 6 weeks.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 5.1, p. 93",
            pdf_page: 123,
            quote: "Start cotrimoxazole to all HIV exposed infants from 6weeks of age"
          }
        ]
      },
      {
        id: "pep-occupational",
        group: "Prevent",
        title: "Needlestick or splash (occupational PEP)",
        who: "Health worker exposed to blood or body fluid, within 72 hours",
        give: [
          {
            drug: "arv-prophylaxis",
            label: "Expanded 3-drug PEP: TLD",
            dose: "One tablet once daily for 28 days — start within 1–2 hours",
            dosing: "tld"
          },
          {
            drug: "zidovudine-lamivudine",
            label: "Basic 2-drug PEP (Ethiopia, lower-risk exposures): TDF + 3TC or AZT/3TC 300/150 mg",
            dose: "TDF/3TC once daily or AZT/3TC twice daily for 28 days",
            dosing: null
          }
        ],
        also: [
          "First aid: wash with soap and water without scrubbing; let it bleed, do not squeeze; no antiseptics. Eyes and mouth: irrigate with water or saline",
          "Ethiopia risk table: source HIV-positive asymptomatic (SC1) — EC1/EC2 basic 2-drug, EC3 expanded 3-drug; source advanced HIV (SC2) — EC1 basic, EC2/EC3 expanded; source unknown — consider basic 2-drug",
          "EC3 = deep injury, large-bore hollow needle, visible blood on the device, needle from an artery or vein",
          "Baseline HIV test of the worker; test the source with consent; HBsAg and hepatitis B vaccination",
          "Drug-experienced source: start what is available and refer"
        ],
        avoid: [
          "No PEP after 72 hours",
          "No PEP if the source is HIV-negative or the worker is already HIV-positive (link to ART instead)"
        ],
        followup: [
          "Review at 3–5 days for tolerance; CBC and liver tests at baseline and 2 weeks",
          "HIV test at 6 weeks, 12 weeks and 24 weeks"
        ],
        caseId: "hiv-exposure",
        refs: [
          {
            book: "ethhiv",
            text: "Do not consider PEP beyond 72 hours; give for 28 days.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 16.6, p. 435",
            pdf_page: 465,
            quote: "Prophylaxis is to be given for 28 days"
          },
          {
            book: "ethhiv",
            text: "Follow-up HIV testing at 6 weeks, 12 weeks and 24 weeks.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 16.3.3, p. 432",
            pdf_page: 462,
            quote: "Do all follow up HIV testing at 6 weeks, 12 weeks and 24 weeks"
          },
          {
            book: "ethhiv",
            text: "Reassess within 3–5 days; minimum toxicity tests are CBC and liver function.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 16.4, p. 440",
            pdf_page: 470,
            quote: "Exposed clients should be reassessed within 3-5 days for medication tolerability and toxicity"
          }
        ]
      },
      {
        id: "pep-sexual",
        group: "Prevent",
        title: "Sexual assault (PEP)",
        who: "Survivor of sexual assault with vaginal or anal exposure to semen, within 72 hours",
        give: [
          {
            drug: "arv-prophylaxis",
            label: "TLD (adults and older children ≥30 kg)",
            dose: "One tablet once daily for 28 days",
            dosing: "tld"
          },
          {
            drug: "zidovudine-lamivudine",
            label: "Child under 30 kg: AZT/3TC (backbone)",
            dose: "By weight band, twice daily, 28 days",
            dosing: "azt3tc"
          },
          {
            drug: "dolutegravir",
            label: "+ dolutegravir (child over 6 years)",
            dose: "By weight band, once daily, 28 days",
            dosing: "pdtg"
          },
          {
            drug: "lopinavir-ritonavir",
            label: "+ LPV/r instead of DTG (child under 6 years)",
            dose: "By weight band, twice daily, 28 days",
            dosing: "lpvr"
          }
        ],
        also: [
          "Treat the source as status unknown; start PEP now — a 3-day starter pack if testing is delayed (decide within 72 h)",
          "Emergency contraception or IUCD; STI screening and prophylaxis/treatment; hepatitis B vaccination; tetanus antitoxin if injured",
          "Police and legal support; long-term psychosocial support; child protection for children",
          "Alternatives (Ethiopia): TDF + 3TC + EFV, or LPV/r, or ATV/r"
        ],
        avoid: ["No PEP after 72 hours, or after a condom leak or tear (Ethiopia)"],
        followup: [
          "HIV test at 6 weeks, 12 weeks (3 months) and 24 weeks (6 months)",
          "Follow in the adult ART clinic"
        ],
        caseId: "hiv-exposure",
        refs: [
          {
            book: "ethhiv",
            text: "After sexual assault the recommended regimen is TDF + 3TC + DTG for 28 days.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 16.8, p. 438",
            pdf_page: 468,
            quote: "TDF+3TC+DTG for 28 days."
          },
          {
            book: "ethhiv",
            text: "Paediatric PEP: AZT + 3TC + DTG over 6 years; AZT + 3TC + LPV/r under 6 years.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 16.7, p. 436",
            pdf_page: 466,
            quote: "Children <6yrs: AZT+3TC+LPV/r"
          },
          {
            book: "ethhiv",
            text: "HIV testing at 6, 12 and 24 weeks after sexual assault.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 16.3.6, p. 437",
            pdf_page: 467,
            quote: "Testing for HIV at 6 weeks, 12 weeks (3 month) and 24 weeks (6 month)"
          }
        ]
      },
      {
        id: "prep-oral",
        group: "Prevent",
        title: "PrEP: HIV-negative at substantial risk",
        who: "HIV-negative female sex worker, or HIV-negative partner of someone not yet virally suppressed; 18 years and over",
        give: [
          {
            drug: "arv-prophylaxis",
            label: "TDF 300 mg + lamivudine 300 mg",
            dose: "One tablet once daily",
            dosing: null
          }
        ],
        also: [
          "HIV rapid test the same day; exclude acute HIV (flu-like illness after recent exposure → defer 4 weeks and retest)",
          "Creatinine, pregnancy test, STI screening, HBsAg if available — but they must not block PrEP",
          "Pregnancy is not a contraindication",
          "Continue for 28 days after the last high-risk exposure",
          "WHO 2025: six-monthly injectable lenacapavir is an additional PrEP option (not in the Ethiopian manual)"
        ],
        avoid: [
          "Not with creatinine clearance under 60 mL/min",
          "Not with suspected acute HIV or a positive test (start full ART instead)",
          "Exposure in the last 72 hours: PEP first"
        ],
        followup: [
          "HIV test every 3 months; creatinine every 6 months",
          "Stop if HIV-positive, sustained CrCl under 60, persistent poor adherence, or the partner is suppressed"
        ],
        caseId: "hiv-prep",
        refs: [
          {
            book: "ethhiv",
            text: "National PrEP: tenofovir 300 mg + lamivudine 300 mg once daily.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 16.2, p. 423",
            pdf_page: 453,
            quote: "Tenofovir 300mg and Lamivudine 300mg once daily"
          },
          {
            book: "ethhiv",
            text: "Exclusion: creatinine clearance under 60 mL/min.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 16.1, p. 422",
            pdf_page: 452,
            quote: "Estimated creatinine clearance of less than 60 ml/min (if known)"
          },
          {
            book: "whohivsti",
            text: "Long-acting injectable lenacapavir should be offered as an additional prevention choice.",
            ref: "WHO HIV & STI recommendations overview 2025, Table 1, p. 2",
            pdf_page: 5,
            quote: "Long-acting injectable lenacapavir should be offered as an additional prevention"
          }
        ]
      },
      {
        id: "ctx-prophylaxis",
        group: "Prevent",
        title: "Cotrimoxazole prophylaxis (CPT)",
        who: "HIV-exposed infant from 6 weeks; any child with HIV under 5; age 5+ with CD4 350 or below or WHO stage 3–4",
        give: [
          {
            drug: "cotrimoxazole",
            label: "Cotrimoxazole 480 mg tablet or 240 mg/5 mL suspension",
            dose: "Once daily by age/weight band",
            dosing: "ctx"
          }
        ],
        also: [
          "HIV-exposed infant: start at 6 weeks; continue until the risk of transmission ends (breastfeeding over) or HIV is excluded.",
          "Children with HIV under 5: give to all, regardless of CD4 or stage, at least until age 5.",
          "Give every person with TB and HIV cotrimoxazole.",
          "Stop (age 5+): on ART at least 1 year with no new stage 2–4 event AND CD4 over 350 with suppressed viral load (or two CD4 counts over 350 if no viral load).",
          "Stop at once for Stevens-Johnson syndrome, severe liver disease, severe anaemia or pancytopenia, or a negative final HIV test in an exposed infant."
        ],
        avoid: [
          "Severe sulfa allergy (including Fansidar), severe liver or kidney disease, G6PD deficiency (Ethiopia contraindications).",
          "Stopping early because the patient 'feels well': use the Table 11.1 stop rule."
        ],
        followup: [
          "Every visit: rash, mouth sores, yellow eyes, pallor; count tablets.",
          "Move up a band as the child grows.",
          "Rash: see 'Rash on cotrimoxazole'."
        ],
        caseId: "advanced-hiv-disease",
        refs: [
          {
            book: "ethhiv",
            text: "CPT start and stop criteria (Table 11.1).",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.1, p. 182",
            pdf_page: 212,
            quote: "Two consecutive CD4 count > 350 cells/mm3 if no VL result"
          },
          {
            book: "ethhiv",
            text: "HIV-exposed infants: from 6 weeks until transmission risk ends or HIV is excluded.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.1, p. 182",
            pdf_page: 212,
            quote: "Until the risk of HIV transmission ends or HIV infection is excluded"
          },
          {
            book: "ethhiv",
            text: "CPT doses by age (weight), Table 11.2.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.2, p. 183",
            pdf_page: 213,
            quote: "6 months to 5 year (5-15Kg)"
          },
          {
            book: "ethhiv",
            text: "CPT contraindications: severe sulfa allergy, severe liver or renal disease, G6PD deficiency.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.2, p. 183",
            pdf_page: 213,
            quote: "severe allergy to sulfa drugs (including Fansidar)"
          },
          {
            book: "ethhiv",
            text: "Start CPT in all HIV-exposed infants from 6 weeks.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, ch. 5, Table 5.3, p. 93",
            pdf_page: 123,
            quote: "Start cotrimoxazole to all HIV exposed infants from 6weeks of age."
          },
          {
            book: "ethhiv",
            text: "CPT for all children under 5 regardless of CD4 or stage.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.18, p. 266",
            pdf_page: 296,
            quote: "For children <5 years, provide CPT until 5years irrespective of CD4 and WHO Staging."
          }
        ]
      },
      {
        id: "tpt-adult",
        group: "Prevent",
        title: "TPT: adult or adolescent (15+)",
        who: "HIV, no cough, fever, weight loss or night sweats, no contraindication — any CD4, ART status or pregnancy",
        give: [
          {
            drug: "isoniazid",
            label: "3HP: isoniazid + rifapentine once WEEKLY × 12 doses (non-PI ART)",
            dose: "Isoniazid 15 mg/kg (max 900 mg) + rifapentine 15–30 mg/kg (max 900 mg) weekly (WHO table in Harrison); 50 kg and over: 900 mg + 900 mg. With food. Use the national chart for fixed-dose tablets.",
            dosing: "rpt-3hp"
          },
          {
            drug: "isoniazid",
            label: "6H: isoniazid DAILY × 6 months (PI-based ART, pregnancy, breastfeeding, or 3HP not possible)",
            dose: "5 mg/kg daily, maximum 300 mg (usual adult dose 300 mg)",
            dosing: null
          }
        ],
        also: [
          "Pyridoxine (vitamin B6) 10–25 mg daily for those at risk of neuropathy (HIV, alcohol, malnutrition, pregnancy, diabetes); WHO 2025 includes B6 with every isoniazid regimen. Do not delay 3HP if B6 is out of stock.",
          "3HP turns urine and tears orange: harmless.",
          "WHO 2025 also prefers 3HP; 1HP (isoniazid 300 mg + rifapentine 600 mg daily × 28 doses, age over 13) is a 'special circumstances' option not in the Ethiopian table.",
          "Chest X-ray before TPT where available."
        ],
        avoid: [
          "Any TB symptom: investigate, do not start TPT.",
          "3HP (rifapentine) with PI- or nevirapine-based ART, in pregnancy or breastfeeding: use 6H.",
          "Any TPT with active hepatitis, regular heavy alcohol use, neuropathy symptoms, or previous intolerance to the drug."
        ],
        followup: [
          "Monthly: TB symptoms, hepatitis symptoms (weakness, nausea, loss of appetite, yellow eyes), neuropathy, rash.",
          "3HP: flu-like or dizzy after a dose → no more doses until reviewed.",
          "Complete = 3HP 11 doses within 16 weeks; 6H 6 months of doses within 9 months.",
          "6H interrupted under 3 months: resume and add the missed doses; over 3 months: restart.",
          "TB diagnosed: stop TPT and start TB treatment at once."
        ],
        caseId: "tuberculosis",
        refs: [
          {
            book: "ethhiv",
            text: "TPT eligibility in adults and adolescents with HIV.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1 TB Preventive Therapy, p. 203",
            pdf_page: 233,
            quote: "irrespective of CD4 count, ART status, pregnancy status or history of treatment for prior episode of TB before three years"
          },
          {
            book: "ethhiv",
            text: "Table 11.7 TPT regimens by group.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.7, p. 207",
            pdf_page: 237,
            quote: "Daily rifampicin Plus isoniazid for 3 months (3RH)."
          },
          {
            book: "ethhiv",
            text: "No rifamycin TPT with NVP or PI.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1, p. 208",
            pdf_page: 238,
            quote: "Both rifampicin and rifapentine should not be administered in persons who are receiving nevirapine or Protease Inhibitor"
          },
          {
            book: "ethhiv",
            text: "3HP not in pregnancy or under 2 years; offer B6.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.8, p. 209",
            pdf_page: 239,
            quote: "3HP is currently not recommended in:"
          },
          {
            book: "ethhiv",
            text: "B6 with 3HP for those at risk; do not delay 3HP if absent.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.8, p. 209",
            pdf_page: 239,
            quote: "Individuals at higher risk of peripheral neuropathy should be offered vitamin B6"
          },
          {
            book: "ethhiv",
            text: "Orange urine on 3HP is harmless.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.8, p. 210",
            pdf_page: 240,
            quote: "Red/orange discoloration of urine and other body fluids while receiving 3HP is normal"
          },
          {
            book: "ethhiv",
            text: "TPT contraindications; rifapentine limits; completion rules.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1, p. 211",
            pdf_page: 241,
            quote: "rifapentine is not currently indicated for children below 2 years"
          },
          {
            book: "ethhiv",
            text: "3HP complete with 11 doses in 16 weeks; 6H within 9 months.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1, p. 211",
            pdf_page: 241,
            quote: "Completion for 3HP is defined when the client took at least 11 doses of treatment in 16 weeks."
          },
          {
            book: "ethhiv",
            text: "Interruption under 3 months: add missed doses; over 3 months: restart.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1, p. 211",
            pdf_page: 241,
            quote: "Resume the same course by adding for the missed doses at the end"
          },
          {
            book: "whohivclin",
            text: "WHO 2025: 3HP preferred, 6H/9H alternative.",
            ref: "WHO HIV clinical management 2025, 5.1.1 Recommendation, p. 76",
            pdf_page: 92,
            quote: "three months of weekly isoniazid + rifapentine (3HP) is the suggested preferred regimen"
          },
          {
            book: "whohivclin",
            text: "WHO 2025: 1HP only 13 years and over.",
            ref: "WHO HIV clinical management 2025, 5.1.3, p. 77",
            pdf_page: 93,
            quote: "1HP is recommended only for adults and adolescents (≥ 13 years)."
          },
          {
            book: "harrison",
            text: "WHO TPT dose table: 3HP isoniazid 15 mg/kg (900 mg) + rifapentine 15–30 mg/kg (900 mg) weekly.",
            ref: "Harrison 22nd ed. 2025, ch. 183 Tuberculosis, Table 183-6, p. 1402",
            pdf_page: 1445,
            quote: "Rifapentine: 15–30 mg/kg (900 mg) weekly"
          },
          {
            book: "harrison",
            text: "6H: adults 5 mg/kg (max 300 mg); children under 10 years 10 mg/kg (7–15).",
            ref: "Harrison 22nd ed. 2025, ch. 183 Tuberculosis, Table 183-6, p. 1402",
            pdf_page: 1445,
            quote: "Adults: 5 mg/kg (max, 300 mg) per day"
          },
          {
            book: "harrison",
            text: "Pyridoxine 10–25 mg/day for those at risk of neuropathy.",
            ref: "Harrison 22nd ed. 2025, ch. 183 Tuberculosis, p. 1396",
            pdf_page: 1439,
            quote: "pyridoxine (10–25 mg/d) should be added to the regimen"
          },
          {
            book: "ethhiv",
            text: "Chest X-ray (if available) before TPT.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1, p. 194",
            pdf_page: 224,
            quote: "Prior to TPT initiation"
          },
          {
            book: "whohivclin",
            text: "WHO 2025: vitamin B6 with any isoniazid regimen.",
            ref: "WHO HIV clinical management 2025, 5.1.4, p. 78",
            pdf_page: 94,
            quote: "vitamin B6 supplementation for any INH-containing regimen"
          }
        ]
      },
      {
        id: "tpt-child",
        group: "Prevent",
        title: "TPT: child under 15 or newborn",
        who: "Child with HIV screening negative for TB, or HIV-negative household contact of pulmonary TB, with active TB excluded",
        give: [
          {
            drug: "isoniazid",
            label: "6H — child with HIV on DTG or a PI (or any child as alternative)",
            dose: "10 mg/kg daily (7–15 mg/kg), max 300 mg, × 6 months",
            dosing: null
          },
          {
            drug: "isoniazid",
            label: "3HP — age 2+: HIV on EFV, or HIV-negative contact 2–14 years",
            dose: "Weekly × 12. Rifapentine by weight band; isoniazid 25 mg/kg (2–12 y) or 15 mg/kg rounded up (12 y+), max 900 mg",
            dosing: "rpt-3hp"
          },
          {
            drug: "tb-rhze",
            label: "3RH — HIV-negative contact under 2 years",
            dose: "Daily × 3 months: isoniazid 10–15 mg/kg + rifampicin 10–20 mg/kg (child RH 75/50 dispersible)",
            dosing: null
          },
          {
            drug: "isoniazid",
            label: "Newborn of a mother with pulmonary TB (diagnosed under 2 months before birth or after)",
            dose: "10 mg/kg once daily (7–15 mg/kg) × 6 months. The Ethiopian manual prints 5 mg/kg for this baby (half the usual child dose): confirm with the TB programme.",
            dosing: null
          }
        ],
        also: [
          "Infant under 1 year with HIV: TPT only after a household TB contact.",
          "Newborn: exclude congenital TB first; delay BCG until the course ends (or repeat BCG after); breastfeeding continues.",
          "3HP tablets can be crushed into a little soft food.",
          "Pyridoxine for children with HIV or malnutrition and breastfed infants on isoniazid."
        ],
        avoid: [
          "3HP under 2 years.",
          "Rifapentine or rifampicin with PI- or nevirapine-based ART.",
          "1HP under 13 years (WHO 2025)."
        ],
        followup: [
          "Monthly weight and dose check.",
          "TB symptoms at each visit: stop TPT and investigate if they appear."
        ],
        caseId: "tuberculosis",
        refs: [
          {
            book: "ethhiv",
            text: "Infants under 1 year: TPT only after household contact.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1, p. 203",
            pdf_page: 233,
            quote: "Children and infants less than 1 year of age should be provided preventive therapy only if they have a history of household contacts"
          },
          {
            book: "ethhiv",
            text: "Table 11.7 TPT regimens by group.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.7, p. 207",
            pdf_page: 237,
            quote: "Daily rifampicin Plus isoniazid for 3 months (3RH)."
          },
          {
            book: "ethhiv",
            text: "3HP with food; crush into semi-solid food; not with NVP or PI.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.7, p. 208",
            pdf_page: 238,
            quote: "should be taken with food to prevent GI upset"
          },
          {
            book: "ethhiv",
            text: "TPT contraindications; rifapentine limits; completion rules.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.1, p. 211",
            pdf_page: 241,
            quote: "rifapentine is not currently indicated for children below 2 years"
          },
          {
            book: "ethhiv",
            text: "Newborn of mother with PTB: INH 5 mg/kg daily 6 months; delay BCG.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, ch. 5 TB risk assessment for HEI, p. 94",
            pdf_page: 124,
            quote: "Give the baby 5mg/kg isoniazid (INH) orally once a day for 6 months to the baby."
          },
          {
            book: "ethhiv",
            text: "Delay BCG until INH course completed.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, ch. 5, p. 94",
            pdf_page: 124,
            quote: "Delay BCG vaccination until INH prophylaxis is completed"
          },
          {
            book: "harrison",
            text: "6H child dose 10 mg/kg (7–15).",
            ref: "Harrison 22nd ed. 2025, ch. 183 Tuberculosis, Table 183-6, p. 1402",
            pdf_page: 1445,
            quote: "age: 10 mg/kg per day (range, 7–15 mg)"
          },
          {
            book: "nelson",
            text: "3HP rifapentine weight bands (children 2 years and over).",
            ref: "Nelson 22nd ed. 2024, ch. 322 HIV and AIDS, Table 322.6, p. 2112",
            pdf_page: 2120,
            quote: "14.1–25.0 kg: 450 mg"
          },
          {
            book: "nelson",
            text: "3HP isoniazid 25 mg/kg at 2–12 years.",
            ref: "Nelson 22nd ed. 2024, ch. 322, Table 322.6, p. 2112",
            pdf_page: 2120,
            quote: "12 weekly doses of isoniazid (25 mg/kg for children age 2–12 yr)"
          },
          {
            book: "nelson",
            text: "3HP isoniazid 15 mg/kg at 12 years and over, max 900 mg.",
            ref: "Nelson 22nd ed. 2024, ch. 322, Table 322.6, p. 2112",
            pdf_page: 2120,
            quote: "15 mg/kg rounded up to the nearest 50 or 100 mg; max 900 mg"
          },
          {
            book: "nelson",
            text: "3RH doses (note: Nelson prints rifampin max 300 mg/day here).",
            ref: "Nelson 22nd ed. 2024, ch. 322, Table 322.6, p. 2112",
            pdf_page: 2120,
            quote: "Isoniazid 10–15 mg/kg (max 300 mg) daily and rifampin 10–20 mg/kg (max 300 mg/day) for 3 mo"
          },
          {
            book: "whohivclin",
            text: "WHO 2025: 1HP only 13 years and over.",
            ref: "WHO HIV clinical management 2025, 5.1.3, p. 77",
            pdf_page: 93,
            quote: "1HP is recommended only for adults and adolescents (≥ 13 years)."
          }
        ]
      },
      {
        id: "fail-high-vl",
        group: "When it goes wrong",
        title: "Viral load above 50 copies/mL",
        who: "On ART for at least 6 months, last viral load over 50 copies/mL",
        give: [
          {
            drug: null,
            label: "Enhanced adherence support (EAS) — no drug change yet",
            dose: "Sessions at day 0, 30 and 60; repeat viral load at day 90",
            dosing: null
          }
        ],
        also: [
          "Over 50 to 1000 = low-level viraemia; over 1000 = unsuppressed — both start EAS",
          "Look for causes: vomiting, wrong weight band, rifampicin without twice-daily DTG, DTG with iron/calcium/antacids, enzyme-inducing anticonvulsants, stock-outs, alcohol, depression, stigma",
          "Pregnant or breastfeeding: same-day point-of-care repeat if available",
          "Repeat result ≤50: continue. 50–1000: continue regimen, 3 more months of EAS, repeat; if it persists, keep the regimen and test every 6 months. Over 1000: switch"
        ],
        avoid: ["Do not test during acute illness or fever (blips)", "Never add one drug to a failing regimen"],
        followup: ["Repeat viral load 3 months after the first result (after effective EAS)"],
        caseId: "hiv-treatment-failure",
        refs: [
          {
            book: "ethhiv",
            text: "Viral suppression is 50 copies/mL or less.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.8.1, p. 332",
            pdf_page: 362,
            quote: "is a viral load that is undetectable, equal to or less than 50 copies/ml"
          },
          {
            book: "ethhiv",
            text: "Persistent low-level viraemia: keep the regimen and test every six months.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.8.1, p. 332",
            pdf_page: 362,
            quote: "If viral load is still 50-1000 copies/ml, maintain ARV drug regimen and continue viral load test every six months"
          },
          {
            book: "ethhiv",
            text: "Repeat viral load 3 months after effective enhanced adherence support.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.8.2, p. 333",
            pdf_page: 363,
            quote: "VL should be repeated 3 months after effective EAS"
          }
        ]
      },
      {
        id: "fail-switch",
        group: "When it goes wrong",
        title: "Confirmed failure: switch regimen",
        who: "Two viral loads above 1000 copies/mL, 3 months apart, with adherence support in between",
        give: [
          {
            drug: "zidovudine-lamivudine",
            label: "Adult after TLD: AZT/3TC 300/150 mg",
            dose: "1 tablet twice daily",
            dosing: "azt3tc"
          },
          {
            drug: "atazanavir-ritonavir",
            label: "+ Atazanavir/ritonavir 300/100 mg",
            dose: "1 tablet once daily (or LPV/r 400/100 mg twice daily)",
            dosing: null
          },
          {
            drug: "lopinavir-ritonavir",
            label: "Child after ABC/3TC + DTG: AZT/3TC + LPV/r",
            dose: "Both by weight band, twice daily",
            dosing: "lpvr"
          }
        ],
        also: [
          "Ethiopia: TDF+3TC+EFV failing → AZT+3TC+DTG (or ATV/r or LPV/r); AZT+3TC+EFV failing → TDF+3TC+DTG; child on ABC+3TC+LPV/r failing → AZT+3TC+DTG",
          "WHO 2025 differs: after TLD failure, TDF+3TC+DRV/r preferred (keep tenofovir); children under 30 kg keep ABC+3TC",
          "Use at least two new drugs; consult an experienced clinician",
          "Third line (DRV/r-based) only at selected high-load hospitals; genotype first if accessible"
        ],
        avoid: [
          "Do not switch before failure is confirmed",
          "Do not add one drug to a failing regimen",
          "No DRV/r under 3 years — keep second line until age 3"
        ],
        followup: ["Same visit schedule as a new start; viral load at 6 and 12 months after the switch"],
        caseId: "hiv-treatment-failure",
        refs: [
          {
            book: "ethhiv",
            text: "Virological failure: above 1000 copies/mL on two consecutive viral loads 3 months apart with adherence support.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 12.11, p. 331",
            pdf_page: 361,
            quote: "An individual must be taking ART for at least 6 months before it can be determined that a regimen has failed"
          },
          {
            book: "ethhiv",
            text: "Do not add one drug to a failing regimen; use at least two new drugs.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.8.3, p. 336",
            pdf_page: 366,
            quote: "Do not add one drug to a failing regimen!"
          },
          {
            book: "ethhiv",
            text: "Sequencing of second and third-line regimens.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 12.13, p. 337",
            pdf_page: 367,
            quote: "Summary of sequencing options for third-line ART regimens depending on first and second line experiences"
          },
          {
            book: "whohivclin",
            text: "WHO: preferred and alternative subsequent ART regimens (TDF + 3TC + DRV/r after TLD).",
            ref: "WHO HIV clinical management 2025, Table 3.3, p. 31",
            pdf_page: 47,
            quote: "Preferred and alternative subsequent ART regimens for adults"
          }
        ]
      },
      {
        id: "art-side-effects",
        group: "When it goes wrong",
        title: "Side effects on ART",
        who: "Person on ART with a new symptom or abnormal test, especially in the first 3–6 months",
        give: [
          {
            drug: null,
            label: "Grade the reaction first",
            dose: "Grade 1–2: continue; grade 3: substitute the offending drug without stopping ART; grade 4: stop all ARVs, stabilise, restart a modified regimen",
            dosing: null
          }
        ],
        also: [
          "AZT anaemia/neutropenia → TDF or ABC",
          "TDF kidney injury → AZT or ABC; never start TDF at eGFR under 50",
          "DTG insomnia → morning dose; persistent → EFV or boosted PI. Weight gain → diet and exercise first",
          "ABC hypersensitivity → TDF or AZT; never rechallenge",
          "ATV/r jaundice is benign → LPV/r only if adherence suffers",
          "LPV/r diarrhoea → ATV/r or DTG",
          "Infant NVP rash or jaundice → AZT only",
          "Stopping efavirenz: keep the NRTI backbone 2 more weeks (not in grade 4)"
        ],
        avoid: [
          "Do not stop ART for mild symptoms that settle in 2–4 weeks",
          "Do not mistake IRIS for toxicity or failure — treat the infection and continue ART"
        ],
        followup: [
          "Report on the national adverse drug event form",
          "Review within 1–2 weeks after any substitution"
        ],
        caseId: "hiv-art",
        refs: [
          {
            book: "ethhiv",
            text: "Grade 4: immediately discontinue all ARVs and restart a modified regimen when stable.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.7.1, p. 319",
            pdf_page: 349,
            quote: "Immediately discontinue all ARV drugs"
          },
          {
            book: "ethhiv",
            text: "Avoid AZT with severe anaemia at baseline (haemoglobin under 7.0 g/dL).",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 12.8, p. 315",
            pdf_page: 345,
            quote: "Avoid use of AZT for people with HIV and severe anemia at baseline (hemoglobin <7.0"
          },
          {
            book: "ethhiv",
            text: "IRIS is not treatment failure or a drug side effect.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.6.3, p. 310",
            pdf_page: 340,
            quote: "IRIS is not indicative of treatment failure or drug side effect"
          }
        ]
      },
      {
        id: "art-reengage",
        group: "When it goes wrong",
        title: "Back after stopping ART (>28 days)",
        who: "Person who missed an ART appointment by more than 28 days and returns",
        give: [
          {
            drug: "dolutegravir",
            label: "Restart the previous regimen — DTG-based if the previous one was NNRTI (efavirenz)",
            dose: "TLD once daily (≥30 kg) or the child's weight-band regimen",
            dosing: "tld"
          }
        ],
        also: [
          "Find and address the reason; ongoing enhanced adherence counselling",
          "CD4 (advanced disease is common after interruption)",
          "Screen for TB and other OIs before restarting"
        ],
        avoid: ["Do not restart an NNRTI (efavirenz) regimen if DTG can be used"],
        followup: [
          "Viral load 3 and 6 months after restarting; over 1000 twice → switch to second or third line; 50–1000 → EAS and repeat after 3 months"
        ],
        caseId: "hiv-art",
        refs: [
          {
            book: "ethhiv",
            text: "Interruption = missed appointment over 28 days; NNRTI regimens restart on a DTG-containing regimen.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.6.3, p. 310",
            pdf_page: 340,
            quote: "should restart ART using a DTG-containing regimen if not contraindicated to DTG"
          }
        ]
      },
      {
        id: "art-rifampicin",
        group: "When it goes wrong",
        title: "On rifampicin: ART dose change",
        who: "Person on (or starting) dolutegravir- or PI-based ART who starts rifampicin-containing TB treatment",
        give: [
          {
            drug: "dolutegravir",
            label: "Dolutegravir — twice daily while on rifampicin",
            dose: "Adult: TLD morning + DTG 50 mg evening. Child: the weight-band DTG dose twice daily",
            dosing: "pdtg"
          }
        ],
        also: [
          "Children: keep twice-daily DTG for 2 weeks after rifampicin ends (Ethiopia)",
          "On a boosted PI: adjust the PI dose or switch to DTG (Ethiopia) — decide with an experienced clinician",
          "Start ART within 2 weeks of TB treatment if not yet on ART (TB meningitis: after 4–8 weeks)"
        ],
        avoid: [
          "Never give a second TLD tablet as the extra dolutegravir dose",
          "No 3HP (rifapentine) with protease inhibitors — use 6H"
        ],
        followup: [
          "Return to once-daily DTG after rifampicin (and the 2-week tail) ends",
          "Viral load as scheduled"
        ],
        caseId: "tuberculosis",
        refs: [
          {
            book: "ethhiv",
            text: "Rifampicin: DTG 50 mg twice daily; children twice daily by weight band.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 12.9, p. 323",
            pdf_page: 353,
            quote: "DTG 50mg BID. For pediatrics DTG BID by weight band."
          },
          {
            book: "ethhiv",
            text: "Boosted PI with rifampicin: adjust the PI dose or substitute with DTG.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 12.9, p. 321",
            pdf_page: 351,
            quote: "Adjust the PI dose or substitute"
          }
        ]
      },
      {
        id: "oi-iris",
        group: "When it goes wrong",
        title: "Worse after starting ART (IRIS)",
        who: "An OI flares or a new one appears, usually 4–8 weeks after starting ART (crypto 3–12 weeks), often with low pre-ART CD4",
        give: [
          {
            drug: null,
            label: "Prednisone or prednisolone (only when needed, e.g. obstructive mass lesion)",
            dose: "1 mg/kg/day (max 60–80 mg), then rapid taper over 10–14 days",
            dosing: null
          }
        ],
        also: [
          "First exclude: a new infection, drug-resistant infection, drug reaction, non-adherence, drug interaction or malabsorption.",
          "Treat the underlying OI with standard treatment.",
          "CNS IRIS (cryptococcal, TB): manage promptly or refer — crypto IRIS needs repeated LPs."
        ],
        avoid: ["Stopping or changing ART for IRIS: it is not ART failure."],
        followup: ["Reassure: most IRIS is self-limiting.", "Taper steroids as soon as symptoms allow."],
        caseId: "advanced-hiv-disease",
        refs: [
          {
            book: "ethhiv",
            text: "IRIS in 10–30 %, usually 4–8 weeks after ART.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.6.2 IRIS, p. 308",
            pdf_page: 338,
            quote: "usually within the first 4–8 weeks after initiating therapy"
          },
          {
            book: "ethhiv",
            text: "IRIS steroid course.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.6.2 IRIS, p. 309",
            pdf_page: 339,
            quote: "initiate therapy with prednisone at a dose of 1 mg/kg/day (maximal dose 60 to 80 mg)"
          },
          {
            book: "ethhiv",
            text: "Continue ART in IRIS.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 12.6.2 IRIS, p. 309",
            pdf_page: 339,
            quote: "Continuation of ART when IRIS occurs."
          },
          {
            book: "ethhiv",
            text: "Crypto IRIS typically 3–12 weeks after ART.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 233",
            pdf_page: 263,
            quote: "typically is 3–12 weeks after initiating ART"
          }
        ]
      },
      {
        id: "ctx-rash",
        group: "When it goes wrong",
        title: "Rash on cotrimoxazole",
        who: "New rash, itch, blisters or mouth sores in a patient taking cotrimoxazole",
        give: [
          {
            drug: "cotrimoxazole",
            label: "Grade 3 only: desensitise after 2 weeks (adult)",
            dose: "Suspension 240 mg/5 mL: day 1 2 mL, day 2 4 mL, day 3 6 mL, day 4 8 mL, day 5 one 480 mg tablet, day 6 one 960 mg tablet",
            dosing: null
          },
          {
            drug: "dapsone",
            label: "Dapsone if severe allergy or failed desensitisation",
            dose: "Adult 100 mg daily; child 2 mg/kg daily (max 100 mg) or 4 mg/kg weekly (max 200 mg)",
            dosing: null
          }
        ],
        also: [
          "Grade 1 (redness, itch) and grade 2 (diffuse rash, dry peeling): antihistamine, CONTINUE cotrimoxazole, review closely.",
          "Grade 3 (blisters, minor mouth ulcers): stop, treat, re-introduce after 2 weeks by desensitisation under observation.",
          "Grade 4 (exfoliation, Stevens-Johnson, erythema multiforme, moist peeling): stop and refer urgently.",
          "Dapsone: only for WHO stage 4 and/or CD4 under 200 (child under 5: under 25 %); stop when CD4 over 200 (over 25 %) for 6 months; haemoglobin every 1–2 weeks at first."
        ],
        avoid: [
          "Restarting cotrimoxazole ever after a grade 4 reaction.",
          "Dapsone during breastfeeding (Ethiopia)."
        ],
        followup: ["Mouth, eyes and skin daily after a grade 3–4 reaction.", "Write the allergy on the card."],
        caseId: "advanced-hiv-disease",
        refs: [
          {
            book: "ethhiv",
            text: "Grade 1–2 rash: antihistamine, continue CPT.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.3, p. 183",
            pdf_page: 213,
            quote: "Prescribe Antihistamine and continue CPT & close"
          },
          {
            book: "ethhiv",
            text: "Grade 4: stop and never restart.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.3, p. 184",
            pdf_page: 214,
            quote: "Exfoliative dermatitis, Steven-Johnson syndrome or erythema"
          },
          {
            book: "ethhiv",
            text: "Desensitisation protocol, Table 11.4.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.4, p. 184",
            pdf_page: 214,
            quote: "Desensitization protocol for mild to moderate co-trimoxazole hypersensitivity"
          },
          {
            book: "ethhiv",
            text: "Dapsone as CPT substitute; not in breastfeeding.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.2, p. 184",
            pdf_page: 214,
            quote: "Dapsone is not recommended during breastfeeding."
          },
          {
            book: "ethhiv",
            text: "Dapsone doses and stage 4 / CD4 under 200 criterion.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.2, p. 185",
            pdf_page: 215,
            quote: "Children: 2 mg/kg once daily (maximum dose: 100 mg)"
          }
        ]
      },
      {
        id: "crypto-raised-pressure",
        group: "When it goes wrong",
        title: "Crypto: raised pressure or IRIS",
        who: "On cryptococcal treatment with persistent headache, vomiting, drowsiness, or new vision or hearing loss",
        give: [
          {
            drug: null,
            label: "Therapeutic lumbar puncture",
            dose: "Remove 20–30 mL of CSF, daily, guided by symptoms; measure opening pressure where possible",
            dosing: null
          }
        ],
        also: [
          "Raised pressure causes over 90 % of deaths in the first 2 weeks; failing to treat it is the commonest and most dangerous mistake.",
          "Weeks after ART started (typically 3–12 weeks): cryptococcal IRIS — repeat LPs, check fluconazole adherence and dose, re-induce with amphotericin if treatment was suboptimal; continue ART."
        ],
        avoid: ["Acetazolamide, mannitol or corticosteroids to lower the pressure."],
        followup: ["Repeat LP daily until headache and conscious level settle."],
        caseId: "cryptococcal-meningitis",
        refs: [
          {
            book: "ethhiv",
            text: "Over 90 % of deaths in first 2 weeks are from raised pressure.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 232",
            pdf_page: 262,
            quote: ">90% of deaths in the first two weeks"
          },
          {
            book: "ethhiv",
            text: "Daily therapeutic LP, 20–30 mL.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 232",
            pdf_page: 262,
            quote: "Daily serial LP should be done to control increased ICP by drawing 20-30 ml of CSF"
          },
          {
            book: "ethhiv",
            text: "No acetazolamide, mannitol or steroids for pressure.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 232",
            pdf_page: 262,
            quote: "There is no role for acetazolamide, mannitol, or corticosteroids to reduce intracranial pressure."
          },
          {
            book: "ethhiv",
            text: "Crypto IRIS: repeat LPs, re-induce if antifungal treatment was suboptimal.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 233",
            pdf_page: 263,
            quote: "reinduction with an amphotericin-based regimen"
          },
          {
            book: "ethhiv",
            text: "Crypto IRIS typically 3–12 weeks after ART.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.3.3, p. 233",
            pdf_page: 263,
            quote: "typically is 3–12 weeks after initiating ART"
          }
        ]
      }
    ],
    dosing: [
      {
        id: "tld",
        drug: "dolutegravir",
        label: "TLD tablet (TDF 300 mg / 3TC 300 mg / DTG 50 mg)",
        per: "tablets once daily",
        schedule: "Once daily, any time, with or without food",
        bands: [
          { from: 30, to: null, value: "1" }
        ],
        note: "Ethiopia Annex 9: TLD from 30 kg. Table 12.3 also lists 'adolescents 10–19 years OR weight ≥30 kg' — but Annex 9 warns against the 300 mg TDF in TLD for children under 30 kg, so this table uses weight only. Under 30 kg see the paediatric DTG and ABC/3TC tables. With rifampicin add DTG 50 mg in the evening.",
        ref: {
          book: "ethhiv",
          text: "TDF + 3TC + DTG once daily for adolescents (10–19 years or ≥30 kg) and adults.",
          ref: "Ethiopia MoH National HIV PCT manual 2025, 12.4, p. 277",
          pdf_page: 307,
          quote: "including pregnant and breast-feeding women is TDF+ 3TC+DTG as a once-daily dose"
        }
      },
      {
        id: "pdtg",
        drug: "dolutegravir",
        label: "Dolutegravir, child >4 weeks: pDTG 10 mg dispersible / DTG 50 mg film-coated",
        per: "dose once daily",
        schedule: "Once daily (twice daily, same dose, while on rifampicin)",
        bands: [
          { from: 3, to: 6, value: "½ × pDTG 10 mg (5 mg)" },
          { from: 6, to: 10, value: "1½ × pDTG 10 mg (15 mg)" },
          { from: 10, to: 14, value: "2 × pDTG 10 mg (20 mg)" },
          { from: 14, to: 20, value: "2½ × pDTG 10 mg (25 mg)" },
          { from: 20, to: 30, value: "1 × DTG 50 mg film-coated" }
        ],
        note: "Source bands 3–5.9, 6–9.9, 10–13.9, 14–19.9, 20–24.9, 25–29.9 kg read as from (inclusive) to the next band (exclusive). 20–24.9 and 25–29.9 both 1 × 50 mg, merged here. 30 kg and over: TLD if eligible. Not for infants under 4 weeks (no Ethiopian regimen). pDTG and 50 mg film-coated are not interchangeable 1:1.",
        ref: {
          book: "ethhiv",
          text: "Paediatric DTG weight bands; from 20 kg the film-coated DTG 50 mg tablet.",
          ref: "Ethiopia MoH National HIV PCT manual 2025, Annex 10, Table 10a, p. 469",
          pdf_page: 499,
          quote: "Use the film coated DTG 50mg tablet, 1 tablet daily."
        }
      },
      {
        id: "abc3tc",
        drug: "abacavir-lamivudine",
        label: "ABC/3TC, child >4 weeks — once daily",
        per: "tablets once daily",
        schedule: "Once daily, with pDTG in the same water",
        bands: [
          { from: 3, to: 6, value: "1 × ABC/3TC 120/60 mg" },
          { from: 6, to: 10, value: "1½ × ABC/3TC 120/60 mg" },
          { from: 10, to: 14, value: "2 × ABC/3TC 120/60 mg" },
          { from: 14, to: 20, value: "2½ × ABC/3TC 120/60 mg" },
          { from: 20, to: 25, value: "3 × ABC/3TC 120/60 mg" },
          { from: 25, to: 35, value: "1 × ABC/3TC 600/300 mg" }
        ],
        note: "Ethiopia Annex 10 Table 10a and Annex 9. Bands 3–5.9 … 30–34.9 kg read as from (inclusive) to next band (exclusive); 25–29.9 and 30–34.9 both 1 × 600/300 mg, merged. From 30 kg TLD replaces ABC/3TC + DTG if eligible. Adults who cannot take TDF: ABC/3TC 600/300 mg once daily.",
        ref: {
          book: "ethhiv",
          text: "ABC/3TC 120/60 mg once-daily weight bands.",
          ref: "Ethiopia MoH National HIV PCT manual 2025, Annex 10, Table 10a, p. 469",
          pdf_page: 499,
          quote: "Solid and oral liquid formulations for once-daily dosing for infants and children > 4 weeks of age"
        }
      },
      {
        id: "azt3tc",
        drug: "zidovudine-lamivudine",
        label: "AZT/3TC — twice daily",
        per: "tablets morning + evening",
        schedule: "Twice daily, about 12 hours apart",
        bands: [
          { from: 3, to: 6, value: "1 + 1 × AZT/3TC 60/30 mg" },
          { from: 6, to: 10, value: "1½ + 1½ × AZT/3TC 60/30 mg" },
          { from: 10, to: 14, value: "2 + 2 × AZT/3TC 60/30 mg" },
          { from: 14, to: 20, value: "2½ + 2½ × AZT/3TC 60/30 mg" },
          { from: 20, to: 25, value: "3 + 3 × AZT/3TC 60/30 mg" },
          { from: 25, to: null, value: "1 + 1 × AZT/3TC 300/150 mg" }
        ],
        note: "Ethiopia Annex 10 Table 10b (children >4 weeks) and Annex 9; 25–34.9 kg is 300/150 mg 1 + 1, which is also the adult dose (Table 12.1: AZT 300 mg + 3TC 150 mg twice daily), so the top band is left open. Avoid if haemoglobin is under 7 g/dL.",
        ref: {
          book: "ethhiv",
          text: "AZT/3TC twice-daily weight bands for children over 4 weeks.",
          ref: "Ethiopia MoH National HIV PCT manual 2025, Annex 10, Table 10b, p. 470",
          pdf_page: 500,
          quote: "Solid and oral liquid formulations for twice-daily dosing for infants and children > 4 weeks of age"
        }
      },
      {
        id: "lpvr",
        drug: "lopinavir-ritonavir",
        label: "Lopinavir/ritonavir — twice daily",
        per: "dose morning + evening",
        schedule: "Twice daily, about 12 hours apart",
        bands: [
          { from: 3, to: 6, value: "Pellets 40/10: 2 + 2 caps, or solution 80/20 per mL: 1 + 1 mL" },
          { from: 6, to: 10, value: "Pellets 3 + 3, or solution 1.5 + 1.5 mL" },
          {
            from: 10,
            to: 14,
            value: "Tablets 100/25: 2 AM + 1 PM, or pellets 4 + 4, or solution 2 + 2 mL"
          },
          { from: 14, to: 20, value: "Tablets 100/25: 2 + 2, or pellets 5 + 5, or solution 2.5 + 2.5 mL" },
          { from: 20, to: 25, value: "Tablets 100/25: 2 + 2, or pellets 6 + 6, or solution 3 + 3 mL" },
          { from: 25, to: 35, value: "Tablets 100/25: 3 + 3, or 200/50: 2 AM + 1 PM" },
          { from: 35, to: null, value: "Adult: 400/100 mg (2 × 200/50) + 400/100 mg" }
        ],
        note: "Ethiopia Annex 10 Table 10b (children >4 weeks), bands read as from (inclusive) to next band (exclusive). The 35 kg-and-over row is the adult dose from Table 12.1 (400/100 mg twice daily); the manual does not state the weight at which the adult dose starts. Tablets must be swallowed whole.",
        ref: {
          book: "ethhiv",
          text: "LPV/r twice-daily weight bands for children over 4 weeks.",
          ref: "Ethiopia MoH National HIV PCT manual 2025, Annex 10, Table 10b, p. 470",
          pdf_page: 500,
          quote: "Solid and oral liquid formulations for twice-daily dosing for infants and children > 4 weeks of age"
        }
      },
      {
        id: "nvp-birth",
        drug: "arv-prophylaxis",
        label: "Nevirapine 10 mg/mL — HIV-exposed infant, birth to 6 weeks (by BIRTH weight)",
        per: "once daily — by BIRTH weight (birth to 6 weeks)",
        schedule: "Once daily from birth (within 1 hour) to 6 weeks; then 20 mg (2 mL or ½ × 50 mg tablet) once daily from 6 to 12 weeks",
        bands: [
          { from: 0.5, to: 2, value: "2 mg/kg = 0.2 mL/kg" },
          { from: 2, to: 2.5, value: "10 mg = 1 mL" },
          { from: 2.5, to: null, value: "15 mg = 1.5 mL" }
        ],
        note: "Ethiopia Table 5.2: birth weight 2000–2499 g and ≥2500 g. Under 2 kg (the source prints '<2000mg' — a typo for grams): 2 mg/kg = 0.2 mL/kg once daily. The 6–12-week dose is by age, not weight. Ethiopia gives NVP for 12 weeks to ALL HIV-exposed infants (WHO 2025: 6 weeks if not high risk).",
        ref: {
          book: "ethhiv",
          text: "NVP and AZT syrup doses for HIV-exposed infants by birth weight and age.",
          ref: "Ethiopia MoH National HIV PCT manual 2025, Table 5.2, p. 92",
          pdf_page: 122,
          quote: "Dosage of NVP and AZT syrup for different age groups"
        }
      },
      {
        id: "azt-birth",
        drug: "arv-prophylaxis",
        label: "Zidovudine 10 mg/mL — HIV-exposed infant, birth to 6 weeks (by BIRTH weight)",
        per: "twice daily — by BIRTH weight (birth to 6 weeks)",
        schedule: "Twice daily from birth (within 1 hour) to 6 weeks, then stop",
        bands: [
          { from: 0.5, to: 2, value: "2 mg/kg = 0.2 mL/kg" },
          { from: 2, to: 2.5, value: "10 mg = 1 mL" },
          { from: 2.5, to: null, value: "15 mg = 1.5 mL" }
        ],
        note: "Ethiopia Table 5.2: birth weight 2000–2499 g and ≥2500 g. Under 2 kg: 2 mg/kg = 0.2 mL/kg twice daily. Ethiopia gives AZT for 6 weeks only; the table has no AZT dose after 6 weeks.",
        ref: {
          book: "ethhiv",
          text: "ePNP: AZT for 6 weeks and NVP for 12 weeks for all HEIs.",
          ref: "Ethiopia MoH National HIV PCT manual 2025, 5.1, p. 92",
          pdf_page: 122,
          quote: "AZT for 6 weeks and NVP for 12 weeks) for all HEIs irrespective of the risk"
        }
      },
      {
        id: "ctx",
        drug: "cotrimoxazole",
        label: "Cotrimoxazole preventive therapy (480 mg single-strength tablet; 240 mg/5 mL suspension)",
        per: "once-daily dose",
        schedule: "Once daily, every day",
        bands: [
          {
            from: 1,
            to: 5,
            value: "2.5 mL suspension, or ¼ single-strength (480 mg) tablet, or 1 paediatric (120 mg) tablet"
          },
          {
            from: 5,
            to: 15,
            value: "5 mL suspension, or ½ single-strength tablet, or 2 paediatric tablets"
          },
          {
            from: 15,
            to: 30,
            value: "10 mL suspension, or 1 single-strength tablet, or ½ double-strength (960 mg) tablet"
          },
          { from: 30, to: null, value: "2 single-strength tablets, or 1 double-strength (960 mg) tablet" }
        ],
        note: "Ethiopia Table 11.2 is age-led with weights in brackets: up to 6 months (5 kg); 6 months–5 years (5–15 kg); 6–14 years (15–30 kg); over 14 years (over 30 kg). Read here as under 5, 5 to under 15, 15 to under 30, and 30 kg and over; when age and weight point to different bands, follow the clinic's national practice. Paediatric-tablet counts are from Table 5.3 (p. 93). The table header misprints 'Suspicion' for suspension.",
        ref: {
          book: "ethhiv",
          text: "CPT doses by age (weight), Table 11.2.",
          ref: "Ethiopia MoH National HIV PCT manual 2025, Table 11.2, p. 183",
          pdf_page: 213,
          quote: "6 months to 5 year (5-15Kg)"
        }
      },
      {
        id: "rpt-3hp",
        drug: "isoniazid",
        label: "Rifapentine in 3HP (with isoniazid), once weekly × 12 doses",
        per: "mg rifapentine per weekly dose",
        schedule: "Once a week for 12 weeks, with food",
        bands: [
          { from: 10, to: 14.1, value: "300 mg" },
          { from: 14.1, to: 25.1, value: "450 mg" },
          { from: 25.1, to: 32.1, value: "600 mg" },
          { from: 32.1, to: 50, value: "750 mg" },
          { from: 50, to: null, value: "900 mg" }
        ],
        note: "Nelson Table 322.6 (US guidance) writes the bands as 10–14.0, 14.1–25.0, 25.1–32.0, 32.1–49.9 and 50.0 kg and over; read as from-inclusive up to the next band's start. No band under 10 kg, and Ethiopia does not give 3HP under 2 years. Isoniazid in the same weekly dose: 25 mg/kg at 2–12 years; 15 mg/kg rounded up to the nearest 50 or 100 mg at 12 years and over; maximum 900 mg. The WHO table reproduced in Harrison gives rifapentine 15–30 mg/kg (max 900 mg) for adults and children. Ethiopia's own 3HP chart (for fixed-dose isoniazid–rifapentine tablets) is not in the supplied documents: use it where available.",
        ref: {
          book: "nelson",
          text: "3HP rifapentine weight bands (children 2 years and over).",
          ref: "Nelson 22nd ed. 2024, ch. 322 HIV and AIDS, Table 322.6, p. 2112",
          pdf_page: 2120,
          quote: "14.1–25.0 kg: 450 mg"
        }
      }
    ],
    drugs: [
      "dolutegravir",
      "abacavir-lamivudine",
      "zidovudine-lamivudine",
      "atazanavir-ritonavir",
      "lopinavir-ritonavir",
      "arv-prophylaxis",
      "cotrimoxazole",
      "isoniazid",
      "fluconazole",
      "tb-rhze",
      "miconazole",
      "oxygen",
      "liposomal-amphotericin-b",
      "flucytosine",
      "clindamycin",
      "dapsone"
    ],
    cases: [
      "hiv-art",
      "hiv-treatment-failure",
      "hiv-exposure",
      "hiv-prep",
      "advanced-hiv-disease",
      "cryptococcal-meningitis",
      "pcp",
      "tuberculosis"
    ],
    sources: [
      {
        name: "Ethiopia MoH. National Comprehensive HIV Prevention, Care and Treatment Training — Participant Manual, approved March 2025"
      },
      {
        name: "WHO. Updated recommendations on HIV clinical management: recommendations for a public health approach, 2025"
      },
      {
        name: "WHO. Overview of recommendations on HIV and STI testing, prevention, treatment, care and service delivery, 2025"
      }
    ]
  },
  {
    id: "kala-azar",
    name: "Kala-azar",
    icon: "globe",
    short: "Fever, big spleen, wasting in a lowland worker. Paromomycin + miltefosine first (WHO 2026); PKDL; VL with HIV.",
    summary: "Visceral leishmaniasis in eastern Africa, HIV-negative: WHO's 2026 guideline makes 14 days of paromomycin injections with oral miltefosine (allometric weight-band dose) the first choice, SSG + paromomycin for 17 days the second, and liposomal amphotericin B for pregnancy, breastfeeding, the very sick, relapse and organ disease. VL with HIV follows the Ethiopian HIV manual (2025) and WHO 2022. PKDL now gets paromomycin + miltefosine too. Ethiopia's own kala-azar guideline was not among the documents reviewed — confirm with the national programme.",
    basis: [
      "WHO VL & PKDL guideline 2026 (HIV-negative)",
      "Ethiopia HIV manual 2025 (VL–HIV)",
      "WHO VL–HIV guideline 2022"
    ],
    firstLook: [
      "Test every patient for HIV — it changes the regimen.",
      "Very sick (jaundice, bleeding, oedema, Hb under 5 g/dL, severe malnutrition, BMI under 14): admit, transfuse, treat infection, and use liposomal amphotericin B.",
      "Any woman who could be pregnant: pregnancy test before miltefosine or SSG.",
      "Test for malaria and screen for TB — both are common in the same patients."
    ],
    scenarios: [
      {
        id: "vl-first-choice",
        group: "Treat",
        title: "Kala-azar, adult or child 4–50 y",
        who: "First episode, parasites or serology positive, HIV-negative, aged 4 to 50 years, no exclusion (see Also)",
        give: [
          {
            drug: "paromomycin",
            label: "Paromomycin injection",
            dose: "20 mg/kg/day as paromomycin SULFATE (= 15 mg/kg base), deep IM once daily for 14 days. Check whether your vial is labelled as sulfate or base before working out the volume.",
            dosing: null
          },
          {
            drug: "miltefosine",
            label: "Miltefosine capsules",
            dose: "Allometric weight-band dose (table): the daily dose split into 2 doses, with food, for 14 days, starting with the paromomycin",
            dosing: "milt-allo"
          }
        ],
        also: [
          "Exclusions — use another scenario if ANY applies: age under 4 or over 50; pregnant or breastfeeding; a woman who could become pregnant and will not take a pregnancy test or contraception; relapse; severe malnutrition; VL with PKDL at the same time; Hb under 5 g/dL; severe VL (jaundice, bleeding, oedema, very abnormal counts, liver tests, bilirubin or creatinine); drug allergy; hearing loss already present; heart, kidney or liver disease; pneumonia, TB, schistosomiasis, HIV or other immune suppression; cannot swallow capsules or keep to the visits.",
          "Women who could become pregnant: pregnancy test first. Contraception through the course and afterwards. WHO 2026 says 2 months after 5–10-day courses and 5 months after courses of 28 days or more; it does not classify this 14-day course, and its trial required 5 months. Use 5 months unless the national programme decides otherwise. An injectable or implant is more reliable than the pill.",
          "Before the first capsule: ask about eye problems and look at the eyes. Tell the patient to stop the capsules and come back at once for a red, watering or painful eye or blurred vision.",
          "Supportive care: fluids, food supplements, transfuse severe anaemia, treat infections. Test for HIV and malaria; screen for TB.",
          "Give miltefosine with food and watch it swallowed. Outpatient treatment is possible once stable."
        ],
        avoid: [
          "Do not give miltefosine in pregnancy — it is teratogenic.",
          "Do not give paromomycin with gentamicin or another aminoglycoside.",
          "Not for VL with HIV — use the VL with HIV scenario."
        ],
        followup: [
          "Initial cure at the end of treatment: no fever, smaller spleen, weight gain, rising Hb.",
          "Definitive cure: no relapse at 6 months — review then.",
          "Eyes: review during treatment and for at least 2 months after; eye examination at 4 weeks.",
          "Warn about PKDL (a rash starting on the face, usually within 6 months)."
        ],
        caseId: "visceral-leishmaniasis",
        refs: [
          {
            book: "whovl26",
            text: "Paromomycin plus miltefosine is suggested rather than SSG plus paromomycin (conditional, low certainty).",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1.1, p. 22",
            pdf_page: 40,
            quote: "Use of a combination of paromomycin plus miltefosinea is suggested rather than a combination"
          },
          {
            book: "whovl26",
            text: "Doses in combination: paromomycin sulfate 20 mg/kg (= 15 mg/kg base) IM once a day for 14 days plus miltefosine in allometric doses orally twice a day for 14 days.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1.1, footnote a, p. 22",
            pdf_page: 40,
            quote: "plus miltefosine (allometric doses, orally BID for 14"
          },
          {
            book: "whovl26",
            text: "Paromomycin sulfate 20 mg/kg is equivalent to 15 mg/kg paromomycin base.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1.1, footnote a, p. 22",
            pdf_page: 40,
            quote: "paromomycin sulfate (20 mg/kg [equivalent to 15 mg/kg/day"
          },
          {
            book: "whovl26",
            text: "Exclusions from paromomycin plus miltefosine include age under 4 or over 50 years, pregnancy or breastfeeding, and a woman who could become pregnant who does not agree to a pregnancy test or to contraception until 5 months after treatment.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 1, p. 22",
            pdf_page: 40,
            quote: "pregnant or lactating women; female patients of childbearing"
          },
          {
            book: "whovl26",
            text: "Also excluded: VL relapse, severe malnutrition and VL concurrent with PKDL.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 1, p. 22",
            pdf_page: 40,
            quote: "VL relapse; severe malnutrition; VL concurrent with PKDL"
          },
          {
            book: "whovl26",
            text: "Also excluded: haemoglobin under 5 g/dL and severe VL by clinical judgement (jaundice, bleeding, oedema) or markedly abnormal blood counts, liver enzymes, bilirubin or creatinine.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 1, p. 22",
            pdf_page: 40,
            quote: "severe VL according to the physician"
          },
          {
            book: "whovl26",
            text: "Also excluded: drug hypersensitivity, pre-existing hearing loss, and cardiac, renal or hepatic disease.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 1, p. 22",
            pdf_page: 40,
            quote: "pre-existing hearing loss; underlying comorbid conditions"
          },
          {
            book: "whovl26",
            text: "Also excluded: concomitant infections such as pneumonia, tuberculosis, schistosomiasis, HIV or any other immunosuppression.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 1, p. 22",
            pdf_page: 40,
            quote: "concomitant infections such as pneumonia, tuberculosis, schistosomiasis, HIV"
          },
          {
            book: "whovl26",
            text: "Also excluded: inability to keep to the visits and regimen, e.g. unable to swallow miltefosine capsules.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 1, p. 22",
            pdf_page: 40,
            quote: "unable to swallow miltefosine"
          },
          {
            book: "whovl26",
            text: "Miltefosine is given in allometric doses, particularly for patients under 30 kg (Annex 2).",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 2, p. 22",
            pdf_page: 40,
            quote: "Miltefosine is to be provided in allometric doses, particularly for patients weighing"
          },
          {
            book: "whovl26",
            text: "Miltefosine is contraindicated in pregnancy; contraception must cover the course and 2 months after short regimens (e.g. 5, 7 or 10 days) or 5 months after regimens of 28 days or longer.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 3, p. 23",
            pdf_page: 41,
            quote: "5 months (for 28-day or longer miltefosine regimens) post-treatment"
          },
          {
            book: "whovl26",
            text: "The trial excluded women of childbearing potential unwilling to use contraception until 5 months after the end of treatment.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.1 Summary of data, p. 24",
            pdf_page: 42,
            quote: "who were unwilling to use contraception until 5 months after the end of treatment"
          },
          {
            book: "whovl26",
            text: "Long-acting reversible or depot contraception gives more reliable cover than barrier or short-course oral methods.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Miltefosine, p. 43",
            pdf_page: 61,
            quote: "Use of long-acting reversible contraceptive methods or depot preparations may provide more reliable coverage"
          },
          {
            book: "whovl26",
            text: "Supportive care matters: hydrate, give nutritional supplements, transfuse severe anaemia and treat concomitant infections.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 5, p. 23",
            pdf_page: 41,
            quote: "Severe anaemia should be corrected with blood transfusions"
          },
          {
            book: "whovl26",
            text: "In the eastern African trial (Ethiopia, Kenya, Sudan, Uganda) definitive cure at 6 months was 91.2 % with paromomycin plus miltefosine and 91.8 % with SSG plus paromomycin.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.1 Summary of data, p. 24",
            pdf_page: 42,
            quote: "91.2% (155 of 170) in"
          },
          {
            book: "whovl26",
            text: "Before miltefosine take a history of eye disorders and examine the eyes as appropriate; with current or past eye disease seek an ophthalmologist's advice where feasible.",
            ref: "WHO VL & PKDL guideline 2026, Annex 1, p. 66",
            pdf_page: 84,
            quote: "history of eye disorders and conduct an eye examination as appropriate"
          },
          {
            book: "whovl26",
            text: "Tell every patient: red eyes, watering, eye pain or blurred vision means stop miltefosine and contact a health worker immediately.",
            ref: "WHO VL & PKDL guideline 2026, Annex 1, p. 66",
            pdf_page: 84,
            quote: "they should discontinue miltefosine and contact their health-care professional immediately"
          },
          {
            book: "whovl26",
            text: "Follow all patients on miltefosine at frequent intervals for a minimum of 2 months after treatment; an eye examination at 4 weeks of therapy is critically important.",
            ref: "WHO VL & PKDL guideline 2026, Annex 1, Appendix 2, p. 70",
            pdf_page: 88,
            quote: "An eye examination at completion of 4 weeks of therapy is critically important."
          },
          {
            book: "whovl26",
            text: "Paromomycin plus miltefosine can be given to outpatients, lowering indirect costs.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.1 Resource use, p. 24",
            pdf_page: 42,
            quote: "as it can be administered to outpatients"
          }
        ]
      },
      {
        id: "vl-child",
        group: "Treat",
        title: "Kala-azar in a child",
        who: "Child with VL, HIV-negative. Age 4 years or more and no exclusion: paromomycin + miltefosine. Under 4 years: SSG + paromomycin. Severe acute malnutrition: liposomal amphotericin B",
        give: [
          {
            drug: "paromomycin",
            label: "Paromomycin injection (age 4 years and over)",
            dose: "20 mg/kg/day as paromomycin SULFATE (= 15 mg/kg base), deep IM once daily for 14 days",
            dosing: null
          },
          {
            drug: "miltefosine",
            label: "Miltefosine capsules (age 4 years and over)",
            dose: "Allometric weight-band dose (table): the daily dose split into 2 doses, with food, for 14 days. Use the weight band, not mg/kg — children under 30 kg absorb less per kg",
            dosing: "milt-allo"
          },
          {
            drug: "sodium-stibogluconate",
            label: "Under 4 years: SSG + paromomycin",
            dose: "SSG 20 mg/kg/day IM or IV once daily PLUS paromomycin 15 mg/kg/day as paromomycin SULFATE (= 11 mg/kg base), deep IM once daily, both for 17 days",
            dosing: null
          },
          {
            drug: "liposomal-amphotericin-b",
            label: "Severe acute malnutrition or very ill: liposomal amphotericin B",
            dose: "3–5 mg/kg per daily dose by IV infusion over 6–10 days, up to a total of 30 mg/kg. 1 mg test dose first; infuse over 2 h in 5 % dextrose",
            dosing: null
          }
        ],
        also: [
          "A child who cannot swallow the capsules is excluded from paromomycin + miltefosine.",
          "Severely malnourished child on miltefosine in any regimen: admit, feed before each dose, and watch each dose taken.",
          "Treat malnutrition with the national protocol alongside; transfuse severe anaemia."
        ],
        avoid: [
          "Do not use the old 2.5 mg/kg miltefosine dose — children under 30 kg are under-dosed by it.",
          "Do not split or open capsules to guess a dose."
        ],
        followup: [
          "As for adults: initial cure at the end of treatment, definitive cure at 6 months.",
          "Children may not report eye symptoms: ask the carer to watch for red or watering eyes and light avoidance."
        ],
        caseId: "visceral-leishmaniasis",
        refs: [
          {
            book: "whovl26",
            text: "Exclusions from paromomycin plus miltefosine include age under 4 or over 50 years, pregnancy or breastfeeding, and a woman who could become pregnant who does not agree to a pregnancy test or to contraception until 5 months after treatment.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 1, p. 22",
            pdf_page: 40,
            quote: "pregnant or lactating women; female patients of childbearing"
          },
          {
            book: "whovl26",
            text: "Also excluded: inability to keep to the visits and regimen, e.g. unable to swallow miltefosine capsules.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 1, p. 22",
            pdf_page: 40,
            quote: "unable to swallow miltefosine"
          },
          {
            book: "whovl26",
            text: "Miltefosine is given in allometric doses, particularly for patients under 30 kg (Annex 2).",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 2, p. 22",
            pdf_page: 40,
            quote: "Miltefosine is to be provided in allometric doses, particularly for patients weighing"
          },
          {
            book: "whovl26",
            text: "Children, especially under 30 kg, reach lower blood levels than adults at the same mg/kg dose, which is linked to relapse and failure.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Miltefosine, p. 43",
            pdf_page: 61,
            quote: "Children, especially those weighing < 30 kg, achieve lower plasma concentrations"
          },
          {
            book: "whovl26",
            text: "Allometric dosing gives children and adults similar drug levels; exposure depends on weight, not age.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Miltefosine, p. 44",
            pdf_page: 62,
            quote: "Allometric miltefosine dosing achieves similar steady-state concentrations in children and"
          },
          {
            book: "whovl26",
            text: "SSG plus paromomycin is suggested rather than SSG monotherapy in patients in whom paromomycin plus miltefosine is excluded (conditional, low certainty).",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1.2, p. 22",
            pdf_page: 40,
            quote: "patients in whom paromomycin plus miltefosine is excluded"
          },
          {
            book: "whovl26",
            text: "SSG plus paromomycin: pentavalent antimonial 20 mg/kg per day IV or IM once a day for 17 days plus paromomycin sulfate 15 mg/kg (= 11 mg/kg base) IM once a day for 17 days.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1.2, footnote a, p. 22",
            pdf_page: 40,
            quote: "pentavalent antimonial (20 mg/kg per day IV or IM once a day for"
          },
          {
            book: "whovl26",
            text: "Children with severe acute malnutrition, who are very ill and often have impaired liver and kidney function, are an L-AMB group.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Groups of interest, p. 26",
            pdf_page: 44,
            quote: "Children with severe acute malnutrition according to WHO Child Growth Standards"
          },
          {
            book: "whovl26",
            text: "No data in severely malnourished children: admit them and give food before each directly observed dose.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Miltefosine, p. 43",
            pdf_page: 61,
            quote: "Such patients should be admitted and provided with food before miltefosine administration"
          },
          {
            book: "whovl26",
            text: "Miltefosine may be less acceptable in very young, malnourished children because they find the capsules hard to swallow.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.1 Acceptability, p. 24",
            pdf_page: 42,
            quote: "difficulty in swallowing the capsules"
          }
        ]
      },
      {
        id: "vl-pmmf-excluded",
        group: "Treat",
        title: "Paromomycin + miltefosine not possible",
        who: "HIV-negative VL with an exclusion that does NOT need liposomal amphotericin B: e.g. age under 4 or over 50, contraception not acceptable, cannot swallow capsules, miltefosine out of stock",
        give: [
          {
            drug: "sodium-stibogluconate",
            label: "Sodium stibogluconate (SSG)",
            dose: "20 mg/kg/day (pentavalent antimony) IM, or IV over 5–10 min, once daily for 17 days",
            dosing: null
          },
          {
            drug: "paromomycin",
            label: "Paromomycin injection",
            dose: "15 mg/kg/day as paromomycin SULFATE (= 11 mg/kg base), deep IM once daily for 17 days. Different injection site from the SSG",
            dosing: null
          }
        ],
        also: [
          "Preferred to SSG alone (30 days): shorter, and probably less PKDL. SSG alone 20 mg/kg/day for 30 days only if paromomycin is out of stock.",
          "Monitor: serum chemistry, full blood count and ECG; 60-second pulse before every dose.",
          "Switch to liposomal amphotericin B for: pancreatitis with pain and vomiting; jaundice on treatment; liver enzymes over 5 times normal; rising creatinine; cardiotoxicity; severe non-stop vomiting; falling counts; no response after 2 weeks (Ethiopian criteria quoted by WHO)."
        ],
        avoid: [
          "No SSG in pregnancy — 57 % aborted on SSG alone in an MSF series.",
          "No SSG in heart, liver or kidney disease, or in the very sick — use liposomal amphotericin B.",
          "No SSG with other QT-prolonging drugs; stop for corrected QT over 0.5 s."
        ],
        followup: ["Initial cure at end of treatment; definitive cure at 6 months.", "Warn about PKDL."],
        caseId: "visceral-leishmaniasis",
        refs: [
          {
            book: "whovl26",
            text: "SSG plus paromomycin is suggested rather than SSG monotherapy in patients in whom paromomycin plus miltefosine is excluded (conditional, low certainty).",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1.2, p. 22",
            pdf_page: 40,
            quote: "patients in whom paromomycin plus miltefosine is excluded"
          },
          {
            book: "whovl26",
            text: "SSG plus paromomycin: pentavalent antimonial 20 mg/kg per day IV or IM once a day for 17 days plus paromomycin sulfate 15 mg/kg (= 11 mg/kg base) IM once a day for 17 days.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1.2, footnote a, p. 22",
            pdf_page: 40,
            quote: "pentavalent antimonial (20 mg/kg per day IV or IM once a day for"
          },
          {
            book: "whovl26",
            text: "SSG monotherapy, the comparator: 20 mg/kg per day IV or IM once a day for 30 days.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1.2, footnote b, p. 22",
            pdf_page: 40,
            quote: "Doses of SSG (20 mg/kg per day IV or IM once a day for 30 days)"
          },
          {
            book: "whovl26",
            text: "Compared with SSG alone, SSG plus paromomycin probably reduces the risk of PKDL and may reduce mortality.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.2 Rationale, p. 25",
            pdf_page: 43,
            quote: "probably reduce the risk of PKDL"
          },
          {
            book: "whovl26",
            text: "SSG may be given IM or IV, by infusion over 5–10 min or slow injection through a fine (23–25 gauge) needle to avoid thrombosis.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Pentavalent antimonials, p. 44",
            pdf_page: 62,
            quote: "either by infusion (over 5–10 min) or by slow injection through a fine needle"
          },
          {
            book: "whovl26",
            text: "Monitor serum chemistry, full blood count and ECG on SSG.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Pentavalent antimonials, p. 44",
            pdf_page: 62,
            quote: "Patients should be monitored by serum chemistry, complete blood counts and electrocardiography."
          },
          {
            book: "whovl26",
            text: "A corrected QT over 0.5 s signals the likely onset of serious, possibly fatal arrhythmia; for serious hepato- or cardiotoxicity change the drug.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Pentavalent antimonials, p. 44",
            pdf_page: 62,
            quote: "the likely onset of serious and fatal cardiac arrhythmia"
          },
          {
            book: "whovl26",
            text: "The Ethiopian guideline's indications for L-AMB, presented to the GDG: pancreatitis with abdominal pain and vomiting, jaundice on treatment, liver enzymes five times normal, raised creatinine, cardiotoxicity, severe uninterrupted vomiting, falling blood counts, and no response after 2 weeks.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Rationale, p. 27",
            pdf_page: 45,
            quote: "failure to respond to treatment after 2 weeks of drug treatment"
          },
          {
            book: "whovl26",
            text: "Ethiopia lists acute pancreatitis with abdominal pain and vomiting, and jaundice developing on treatment, as indications for L-AMB.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Rationale, p. 27",
            pdf_page: 45,
            quote: "acute pancreatitis with abdominal pain and vomiting"
          },
          {
            book: "whovl26",
            text: "In MSF's Sudan series, 13 of the pregnant women given SSG alone (57 %) had spontaneous abortions, against none in the L-AMB groups.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Rationale, p. 27",
            pdf_page: 45,
            quote: "Spontaneous abortions occurred in 13 women (57%) who received SSG monotherapy"
          }
        ]
      },
      {
        id: "vl-pregnant",
        group: "Special groups",
        title: "Pregnant or breastfeeding woman",
        who: "VL in pregnancy, or a woman breastfeeding (WHO: lactating for < 6 months)",
        give: [
          {
            drug: "liposomal-amphotericin-b",
            label: "Liposomal amphotericin B",
            dose: "3–5 mg/kg per daily dose by IV infusion over 6–10 days, up to a total of 30 mg/kg. 1 mg test dose first; infuse over 2 h in 5 % dextrose",
            dosing: null
          }
        ],
        also: [
          "Treat without delay: untreated VL is the bigger danger to mother and baby.",
          "Record the pregnancy and its outcome in the pregnancy register.",
          "If no liposomal product exists at all, see the amphotericin B deoxycholate page and get senior advice."
        ],
        avoid: [
          "No miltefosine — teratogenic, and pregnant or breastfeeding women were excluded from paromomycin + miltefosine.",
          "No SSG — 13 of 23 pregnant women on SSG alone (57 %) aborted in MSF's Sudan series, none on L-AMB."
        ],
        followup: ["Potassium and creatinine during the course where possible.", "Definitive cure at 6 months."],
        caseId: "visceral-leishmaniasis",
        refs: [
          {
            book: "whovl26",
            text: "Pregnant women and women breastfeeding (for < 6 months) are L-AMB groups.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Groups of interest, p. 26",
            pdf_page: 44,
            quote: "Pregnant and lactating (for < 6 months) women"
          },
          {
            book: "whovl26",
            text: "Liposomal amphotericin B 3–5 mg/kg per day by infusion over 6–10 days up to a total of 30 mg/kg is suggested when paromomycin plus miltefosine and/or SSG plus paromomycin is excluded (conditional, very low certainty).",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1.3, p. 22",
            pdf_page: 40,
            quote: "3–5 mg/kg per day by infusion given over 6–10 days up to a total dose of 30 mg/kg"
          },
          {
            book: "whovl26",
            text: "Exclusions from paromomycin plus miltefosine include age under 4 or over 50 years, pregnancy or breastfeeding, and a woman who could become pregnant who does not agree to a pregnancy test or to contraception until 5 months after treatment.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 1, p. 22",
            pdf_page: 40,
            quote: "pregnant or lactating women; female patients of childbearing"
          },
          {
            book: "whovl26",
            text: "In MSF's Sudan series, 13 of the pregnant women given SSG alone (57 %) had spontaneous abortions, against none in the L-AMB groups.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Rationale, p. 27",
            pdf_page: 45,
            quote: "Spontaneous abortions occurred in 13 women (57%) who received SSG monotherapy"
          },
          {
            book: "whovl26",
            text: "In a systematic review of VL in pregnancy, 2.8 % of 176 mothers treated with L-AMB miscarried, against 27.6 % spontaneous abortion with pentavalent antimony.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Rationale, p. 27",
            pdf_page: 45,
            quote: "The outcomes of 176 mothers treated with LAmB included four (2.3%)"
          },
          {
            book: "whovl26",
            text: "Pregnancy status and outcome should be recorded in a pregnancy register for women on miltefosine.",
            ref: "WHO VL & PKDL guideline 2026, 5.4, Table 6, p. 47",
            pdf_page: 65,
            quote: "pregnancy register for females of childbearing potential on the miltefosine regimen"
          },
          {
            book: "whovl26",
            text: "Miltefosine is potentially embryotoxic and teratogenic and is detectable in plasma for weeks after treatment.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Miltefosine, p. 43",
            pdf_page: 61,
            quote: "Miltefosine is potentially embryotoxic and teratogenic and should not be used during pregnancy"
          }
        ]
      },
      {
        id: "vl-severe",
        group: "Special groups",
        title: "Severe VL, very sick, or organ disease",
        who: "Jaundice, bleeding, oedema, very low counts, severe malnutrition (child), BMI under 14 (adult), heart, liver or kidney disease, or anyone at high risk of dying",
        give: [
          {
            drug: "liposomal-amphotericin-b",
            label: "Liposomal amphotericin B",
            dose: "3–5 mg/kg per daily dose by IV infusion over 6–10 days, up to a total of 30 mg/kg. 1 mg test dose first; infuse over 2 h in 5 % dextrose",
            dosing: null
          },
          {
            drug: "blood-transfusion",
            label: "Blood transfusion for severe anaemia",
            dose: "Transfuse severe anaemia; slowly in a wasted patient",
            dosing: null
          },
          {
            drug: "ceftriaxone",
            label: "Antibiotic for suspected sepsis or pneumonia",
            dose: "Treat concomitant infection — see the ceftriaxone page for the dose",
            dosing: null
          }
        ],
        also: [
          "Hypokalaemia is common on L-AMB: tiredness, confusion, weakness, cramps. Give potassium-rich food and potassium; check potassium where possible.",
          "Fluids and food: proper hydration and nutritional supplements are part of the treatment."
        ],
        avoid: [
          "Hb under 5 g/dL and severe VL exclude paromomycin + miltefosine.",
          "Do not use SSG in heart, liver or kidney disease."
        ],
        followup: [
          "Daily review until improving; creatinine and potassium once or twice weekly.",
          "Definitive cure at 6 months."
        ],
        caseId: "visceral-leishmaniasis",
        refs: [
          {
            book: "whovl26",
            text: "Severely ill patients at increased risk of death are an L-AMB group.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Groups of interest, p. 26",
            pdf_page: 44,
            quote: "Severely ill patients at increased risk of death"
          },
          {
            book: "whovl26",
            text: "Known cardiac, liver or kidney disease, liver enzymes about five times normal, or rising creatinine on SSG plus paromomycin are L-AMB groups, as is any other contraindication to miltefosine, paromomycin or SSG.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Groups of interest, p. 26",
            pdf_page: 44,
            quote: "Patients with known cardiac, liver or kidney disease"
          },
          {
            book: "whovl26",
            text: "Children with severe acute malnutrition, who are very ill and often have impaired liver and kidney function, are an L-AMB group.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Groups of interest, p. 26",
            pdf_page: 44,
            quote: "Children with severe acute malnutrition according to WHO Child Growth Standards"
          },
          {
            book: "whovl26",
            text: "Adults with a BMI under 14, an independent risk factor for death, are an L-AMB group.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Groups of interest, p. 26",
            pdf_page: 44,
            quote: "Adults with a BMI < 14"
          },
          {
            book: "whovl26",
            text: "Also excluded: haemoglobin under 5 g/dL and severe VL by clinical judgement (jaundice, bleeding, oedema) or markedly abnormal blood counts, liver enzymes, bilirubin or creatinine.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 1, p. 22",
            pdf_page: 40,
            quote: "severe VL according to the physician"
          },
          {
            book: "whovl26",
            text: "Haemoglobin under 5 g/dL excludes paromomycin plus miltefosine.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 1, p. 22",
            pdf_page: 40,
            quote: "haemoglobin < 5 g/dL"
          },
          {
            book: "whovl26",
            text: "Supportive care matters: hydrate, give nutritional supplements, transfuse severe anaemia and treat concomitant infections.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 5, p. 23",
            pdf_page: 41,
            quote: "Severe anaemia should be corrected with blood transfusions"
          },
          {
            book: "whovl26",
            text: "Hypokalaemia is a common side-effect of L-AMB.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Lipid formulations of AmB, p. 42",
            pdf_page: 60,
            quote: "Other common side-effects include hypokalaemia"
          },
          {
            book: "whovl26",
            text: "Give potassium-rich food (bananas, oranges, tomatoes, beans, spinach, potatoes) and potassium supplements; add magnesium if low.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Safety of LAmB at higher doses, p. 42",
            pdf_page: 60,
            quote: "Patients should be given potassium-rich food such as bananas"
          }
        ]
      },
      {
        id: "vl-hiv",
        group: "Special groups",
        title: "Kala-azar with HIV",
        who: "VL in a person living with HIV (test every VL patient). The 2026 WHO guideline does not cover this",
        give: [
          {
            drug: "liposomal-amphotericin-b",
            label: "Liposomal amphotericin B (AmBisome)",
            dose: "5 mg/kg on days 1, 3, 5, 7, 9 and 11 — total 30 mg/kg",
            dosing: null
          },
          {
            drug: "miltefosine",
            label: "Miltefosine, with the L-AMB",
            dose: "28 days from day 1. Ethiopia (HIV manual 2025): 2.5 mg/kg/day; 100 mg/day over 30 kg, 150 mg/day over 45 kg. WHO 2022: 100 mg/day",
            dosing: null
          },
          {
            drug: "arv-prophylaxis",
            label: "Start ART",
            dose: "Within 2 weeks of starting VL treatment (WHO 2022) — regimen from the national HIV guideline",
            dosing: null
          }
        ],
        also: [
          "Ethiopia second line, by priority: AmBisome alone 40 mg/kg (days 1, 2, 3, 4, 5, 10, 17, 24); paromomycin with AmBisome or with miltefosine; or SSG 20 mg/kg/day for 30 days with paromomycin 15 mg/kg/day for 17 days.",
          "Serology is often negative in HIV — get a tissue aspirate when suspicion is high.",
          "Test of cure, secondary prophylaxis and follow-up: see the full case (WHO 2022).",
          "Miltefosine: pregnancy test, contraception to 5 months after, and the eye precautions."
        ],
        avoid: [
          "Antimonials are the last option in co-infection: high toxicity and death.",
          "Do not use the HIV-negative paromomycin + miltefosine regimen: HIV was an exclusion."
        ],
        followup: ["Relapse is common: consider referral to a specialised hospital.", "6-monthly follow-up."],
        caseId: "visceral-leishmaniasis-hiv",
        refs: [
          {
            book: "whovl26",
            text: "All the recommendations in the 2026 guideline are for HIV-negative patients; VL with HIV follows the separate 2022 WHO guideline.",
            ref: "WHO VL & PKDL guideline 2026, What's new, p. xii",
            pdf_page: 14,
            quote: "All the recommendations made in these guidelines pertain to HIV-negative patients"
          },
          {
            book: "ethhiv",
            text: "Ethiopia first line for VL–HIV: AmBisome total 30 mg/kg (5 mg/kg on days 1, 3, 5, 7, 9, 11) with miltefosine 2.5 mg/kg/day for 28 days from day 1.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.5 Visceral leishmaniasis and HIV co-infection, p. 252",
            pdf_page: 282,
            quote: "Miltefosine 2.5 mg/kg/day for 28 days, starting from day 1"
          },
          {
            book: "ethhiv",
            text: "Ethiopia: miltefosine 100 mg/day for clients over 30 kg and 150 mg/day over 45 kg.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.5, p. 252",
            pdf_page: 282,
            quote: "150 mg/day for clients weighing more than 45 kg"
          },
          {
            book: "ethhiv",
            text: "Ethiopia second line by priority: AmBisome alone, total 40 mg/kg on days 1, 2, 3, 4, 5, 10, 17 and 24.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.5, p. 252",
            pdf_page: 282,
            quote: "A total dose of 40 mg/kg given on days 1, 2, 3, 4, 5, 10, 17 and 24"
          },
          {
            book: "ethhiv",
            text: "Ethiopia second line also lists paromomycin with AmBisome or with miltefosine, or SSG 20 mg/kg/day for 30 days with paromomycin 15 mg/kg/day for 17 days.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.5, p. 252",
            pdf_page: 282,
            quote: "Paromomycin in combination with AmBisome® or Miltefosine"
          },
          {
            book: "ethhiv",
            text: "Ethiopia: SSG 20 mg/kg/day for 30 days with paromomycin 15 mg/kg/day for 17 days.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.5, p. 252",
            pdf_page: 282,
            quote: "20 mg/kg/d for 30 days with Paromomycin 15 mg/kg/day for 17 days"
          },
          {
            book: "ethhiv",
            text: "Because of high toxicity and mortality in co-infection, antimonials are the last option.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.5, p. 252",
            pdf_page: 282,
            quote: "risk of mortality in HIV/VL co-infected clients, this should be the last option"
          },
          {
            book: "ethhiv",
            text: "In HIV the bone marrow is packed with parasites but two-thirds have no detectable anti-Leishmania antibodies; CD4 is usually under 200.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.5, p. 251",
            pdf_page: 281,
            quote: "two-thirds of cases have no detectable anti Leishmania antibodies"
          },
          {
            book: "ethhiv",
            text: "Relapsed co-infected clients respond more slowly and relapse again; consider referral to a referral or specialized hospital.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.5, p. 252",
            pdf_page: 282,
            quote: "Consider Referral to Referral/Specialized Hospitals"
          },
          {
            book: "whovl26",
            text: "Also excluded: concomitant infections such as pneumonia, tuberculosis, schistosomiasis, HIV or any other immunosuppression.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 1, p. 22",
            pdf_page: 40,
            quote: "concomitant infections such as pneumonia, tuberculosis, schistosomiasis, HIV"
          }
        ]
      },
      {
        id: "vl-relapse",
        group: "When it goes wrong",
        title: "Relapse or no response",
        who: "Signs of VL return after initial cure, or no response to paromomycin + miltefosine or SSG + paromomycin (HIV-negative)",
        give: [
          {
            drug: "liposomal-amphotericin-b",
            label: "Liposomal amphotericin B",
            dose: "3–5 mg/kg per daily dose by IV infusion over 6–10 days, up to a total of 30 mg/kg. 1 mg test dose first; infuse over 2 h in 5 % dextrose",
            dosing: null
          }
        ],
        also: [
          "Confirm relapse with parasites (spleen, marrow or node aspirate). rK39 and DAT stay positive for years and cannot show relapse.",
          "Before blaming the drug: test for HIV, look for TB and other infections, check adherence and the miltefosine dose band.",
          "Relapse with HIV: see the VL with HIV scenario; consider referral."
        ],
        avoid: ["Relapse is an exclusion for paromomycin + miltefosine."],
        followup: ["Definitive cure at 6 months after this course.", "Watch for PKDL."],
        caseId: "visceral-leishmaniasis",
        refs: [
          {
            book: "whovl26",
            text: "L-AMB groups include therapeutic failure or relapse after paromomycin plus miltefosine and/or SSG plus paromomycin.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Groups of interest, p. 26",
            pdf_page: 44,
            quote: "Patients with therapeutic failure or relapse after miltefosine + paromomycin"
          },
          {
            book: "whovl26",
            text: "Also excluded: VL relapse, severe malnutrition and VL concurrent with PKDL.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 1, p. 22",
            pdf_page: 40,
            quote: "VL relapse; severe malnutrition; VL concurrent with PKDL"
          },
          {
            book: "whovl26",
            text: "Relapse must be confirmed parasitologically: serological tests stay positive for years after cure.",
            ref: "WHO VL & PKDL guideline 2026, 4.2 VL relapse, p. 28",
            pdf_page: 46,
            quote: "Diagnosis of VL relapse requires parasitological confirmation"
          },
          {
            book: "harrison",
            text: "Antibody tests stay positive for years after cure, so they cannot be used to measure cure or detect relapse.",
            ref: "Harrison 22nd ed. 2025, ch. 233 Leishmaniasis, p. 1783",
            pdf_page: 1826,
            quote: "they cannot be used for measurement of cure or"
          },
          {
            book: "harrison",
            text: "Splenic smears are over 95 % sensitive, bone marrow 60–85 % and lymph node about 50 %; splenic aspiration is dangerous in untrained hands.",
            ref: "Harrison 22nd ed. 2025, ch. 233 Leishmaniasis, p. 1783",
            pdf_page: 1826,
            quote: "The sensitivity of splenic smears is >95%"
          },
          {
            book: "ethhiv",
            text: "Relapsed co-infected clients respond more slowly and relapse again; consider referral to a referral or specialized hospital.",
            ref: "Ethiopia MoH National HIV PCT manual 2025, 11.5, p. 252",
            pdf_page: 282,
            quote: "Consider Referral to Referral/Specialized Hospitals"
          }
        ]
      },
      {
        id: "vl-toxicity",
        group: "When it goes wrong",
        title: "Toxicity on SSG + paromomycin",
        who: "Pancreatitis, jaundice, rising liver enzymes or creatinine, cardiotoxicity, non-stop vomiting, falling counts, or no response after 2 weeks",
        give: [
          {
            drug: "sodium-stibogluconate",
            label: "Stop SSG and paromomycin",
            dose: "Serious hepato- or cardiotoxicity means changing the drug",
            dosing: null
          },
          {
            drug: "liposomal-amphotericin-b",
            label: "Switch to liposomal amphotericin B",
            dose: "3–5 mg/kg per daily dose by IV infusion over 6–10 days, up to a total of 30 mg/kg. 1 mg test dose first; infuse over 2 h in 5 % dextrose",
            dosing: null
          }
        ],
        also: [
          "Corrected QT over 0.5 s signals serious, possibly fatal arrhythmia.",
          "Hearing loss or kidney injury on paromomycin: stop it and get senior advice; paromomycin-containing regimens are then excluded.",
          "Substandard antimonial can cause severe toxicity: report the batch."
        ],
        avoid: ["Do not restart SSG after a serious cardiac or liver reaction."],
        followup: ["Report the adverse event to the national pharmacovigilance programme."],
        caseId: "visceral-leishmaniasis",
        refs: [
          {
            book: "whovl26",
            text: "The Ethiopian guideline's indications for L-AMB, presented to the GDG: pancreatitis with abdominal pain and vomiting, jaundice on treatment, liver enzymes five times normal, raised creatinine, cardiotoxicity, severe uninterrupted vomiting, falling blood counts, and no response after 2 weeks.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Rationale, p. 27",
            pdf_page: 45,
            quote: "failure to respond to treatment after 2 weeks of drug treatment"
          },
          {
            book: "whovl26",
            text: "Ethiopia lists acute pancreatitis with abdominal pain and vomiting, and jaundice developing on treatment, as indications for L-AMB.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Rationale, p. 27",
            pdf_page: 45,
            quote: "acute pancreatitis with abdominal pain and vomiting"
          },
          {
            book: "whovl26",
            text: "A corrected QT over 0.5 s signals the likely onset of serious, possibly fatal arrhythmia; for serious hepato- or cardiotoxicity change the drug.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Pentavalent antimonials, p. 44",
            pdf_page: 62,
            quote: "the likely onset of serious and fatal cardiac arrhythmia"
          },
          {
            book: "whovl26",
            text: "Substandard antimonials can cause severe toxicity and death; quality must be assured.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Pentavalent antimonials, p. 44",
            pdf_page: 62,
            quote: "substandard medicines can cause severe toxicity and death"
          },
          {
            book: "whovl26",
            text: "Known cardiac, liver or kidney disease, liver enzymes about five times normal, or rising creatinine on SSG plus paromomycin are L-AMB groups, as is any other contraindication to miltefosine, paromomycin or SSG.",
            ref: "WHO VL & PKDL guideline 2026, 4.1.3 Groups of interest, p. 26",
            pdf_page: 44,
            quote: "Patients with known cardiac, liver or kidney disease"
          },
          {
            book: "whovl26",
            text: "SSG: fatal arrhythmia and ECG changes, transient rise in lipase and amylase with symptomatic pancreatitis, and nose or gum bleeding are very common.",
            ref: "WHO VL & PKDL guideline 2026, Annex 3, p. 83",
            pdf_page: 101,
            quote: "Transient rise in serum lipase and amylase, symptomatic pancreatitis"
          },
          {
            book: "whovl26",
            text: "Mild injection-site pain is the commonest adverse event (55 %); reversible ototoxicity occurs in 2 %; renal toxicity is rare; raised liver enzymes and tetany occur.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Paromomycin, p. 44",
            pdf_page: 62,
            quote: "Reversible ototoxicity occurs in 2% of patients."
          }
        ]
      },
      {
        id: "milt-eye",
        group: "When it goes wrong",
        title: "Eye symptoms on miltefosine",
        who: "Red eye, watering, pain, light sensitivity, blurred or dim vision, a cloudy look or white spot, during or after miltefosine",
        give: [
          {
            drug: "miltefosine",
            label: "Stop miltefosine now",
            dose: "Stop immediately if a link with miltefosine cannot be excluded",
            dosing: null
          },
          {
            drug: null,
            label: "Refer to an eye specialist the same day",
            dose: "Tele-consultation if no ophthalmologist; changes may not reverse without treatment even after stopping",
            dosing: null
          },
          {
            drug: null,
            label: "Alternative antileishmanial if still needed",
            dose: "Choose with a senior or the national programme (the guideline does not name one)",
            dosing: null
          }
        ],
        also: [
          "Report to the local health authority and the national pharmacovigilance programme without delay.",
          "Keratitis, scleritis, uveitis and loss of sight have been reported; most cases were in South Asian PKDL after more than 28 days, but the precautions apply to every patient."
        ],
        avoid: ["Do not restart miltefosine within 4 weeks of eye changes; then follow up every 2 weeks."],
        followup: ["Follow every patient on miltefosine for at least 2 months after treatment."],
        caseId: null,
        refs: [
          {
            book: "whovl26",
            text: "Tell every patient: red eyes, watering, eye pain or blurred vision means stop miltefosine and contact a health worker immediately.",
            ref: "WHO VL & PKDL guideline 2026, Annex 1, p. 66",
            pdf_page: 84,
            quote: "they should discontinue miltefosine and contact their health-care professional immediately"
          },
          {
            book: "whovl26",
            text: "Miltefosine has a very long half-life; eye changes may not reverse without treatment even after stopping, so consult an eye specialist.",
            ref: "WHO VL & PKDL guideline 2026, Annex 1, p. 66",
            pdf_page: 84,
            quote: "ocular changes may not be reversible without treatment, even after discontinuation of miltefosine"
          },
          {
            book: "whovl26",
            text: "Report suspected adverse events to the local health authority and the national pharmacovigilance programme without delay.",
            ref: "WHO VL & PKDL guideline 2026, Annex 1, p. 66",
            pdf_page: 84,
            quote: "Suspected adverse events should be reported to local health authorities and the national"
          },
          {
            book: "whovl26",
            text: "Symptoms needing immediate attention: redness, irritation, watering, pain, photophobia, loss or dimming of sight, cloudy appearance or white spots in the eye.",
            ref: "WHO VL & PKDL guideline 2026, Annex 1, Appendix 2, p. 70",
            pdf_page: 88,
            quote: "loss or dimming of eyesight"
          },
          {
            book: "whovl26",
            text: "A causal link between miltefosine and eye events is at least a reasonable possibility; most were in South Asian PKDL, usually beyond 28 days, and some lost sight permanently.",
            ref: "WHO VL & PKDL guideline 2026, Annex 1, Appendix 1, p. 68",
            pdf_page: 86,
            quote: "is at least a reasonable possibility"
          },
          {
            book: "whovl26",
            text: "Reported eye events: keratitis, keratopathy, acute scleritis, uveitis, ocular hyperaemia and visual impairment up to blindness.",
            ref: "WHO VL & PKDL guideline 2026, Annex 1, Appendix 1, p. 68",
            pdf_page: 86,
            quote: "keratopathy and acute scleritis, uveitis"
          },
          {
            book: "whovl26",
            text: "After eye changes on previous miltefosine, wait at least 4 weeks (terminal half-life about 31 days) and follow up every 2 weeks.",
            ref: "WHO VL & PKDL guideline 2026, Annex 1, Appendix 2, p. 69",
            pdf_page: 87,
            quote: "an interval of at least 4 weeks should be ensured before initiation of miltefosine"
          },
          {
            book: "whovl26",
            text: "Follow all patients on miltefosine at frequent intervals for a minimum of 2 months after treatment; an eye examination at 4 weeks of therapy is critically important.",
            ref: "WHO VL & PKDL guideline 2026, Annex 1, Appendix 2, p. 70",
            pdf_page: 88,
            quote: "An eye examination at completion of 4 weeks of therapy is critically important."
          }
        ]
      },
      {
        id: "pkdl-adult",
        group: "PKDL",
        title: "PKDL, adult or older child",
        who: "Rash after (or during) kala-azar — macules, papules or nodules starting on the face; HIV-negative; not pregnant",
        give: [
          {
            drug: "paromomycin",
            label: "Paromomycin injection",
            dose: "20 mg/kg/day as paromomycin SULFATE (= 15 mg/kg base), deep IM once daily for 14 days",
            dosing: null
          },
          {
            drug: "miltefosine",
            label: "Miltefosine capsules",
            dose: "Allometric weight-band dose (table): the daily dose split into 2 doses, with food, for 42 days",
            dosing: "milt-allo"
          }
        ],
        also: [
          "WHO 2026: offer treatment to every PKDL patient when possible — PKDL cases infect sandflies. (Older practice treated only grade III, disfiguring, over 6 months, uveitis, or a child with mouth lesions stopping feeding.)",
          "Before miltefosine: exclude pre-existing eye disease; pregnancy test; contraception until 5 months after the last capsule.",
          "Eye examination every 2 weeks during and after treatment.",
          "Explain that the skin improves before the course ends — finish it anyway."
        ],
        avoid: [
          "No miltefosine in pregnancy. Pregnancy was not studied for PKDL: get senior or national programme advice (the South-East Asia section suggests L-AMB when miltefosine cannot be used)."
        ],
        followup: [
          "Definitive cure in the trial: lesions fully gone at 12 months — review at 12 months.",
          "Bednet for the patient and household."
        ],
        caseId: "pkdl",
        refs: [
          {
            book: "whovl26",
            text: "PKDL in eastern Africa: paromomycin plus miltefosine is suggested rather than L-AMB plus miltefosine (conditional, low certainty).",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.3.1, p. 29",
            pdf_page: 47,
            quote: "A combination of paromomycin plus miltefosinea is suggested rather than a combination of"
          },
          {
            book: "whovl26",
            text: "Paromomycin sulfate 20 mg/kg (= 15 mg/kg base) IM once a day for 14 days and miltefosine in allometric doses orally twice a day for 42 days.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.3.1, footnote a, p. 29",
            pdf_page: 47,
            quote: "and miltefosine (allometric dose orally BID for 42 days)"
          },
          {
            book: "whovl26",
            text: "Most PKDL heals spontaneously, but PKDL cases are reservoirs; whenever possible every patient should be offered treatment.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.3.1, remarks, p. 30",
            pdf_page: 48,
            quote: "every patient should be offered treatment, in line with the VL"
          },
          {
            book: "whovl26",
            text: "Traditionally only severe (grade III) or disfiguring PKDL, lesions over 6 months, anterior uveitis, or young children with oral lesions that stop feeding were treated — SSG up to 2 months or L-AMB 2.5 mg/kg/day for 20 days.",
            ref: "WHO VL & PKDL guideline 2026, 3.3.1 PKDL in eastern Africa, p. 18",
            pdf_page: 36,
            quote: "concomitant anterior uveitis and young children with oral lesions"
          },
          {
            book: "whovl26",
            text: "People with pre-existing eye conditions should be excluded, and eye risk mitigation is essential with both regimens.",
            ref: "WHO VL & PKDL guideline 2026, 4.3.1 Implementation considerations, p. 32",
            pdf_page: 50,
            quote: "People with pre-existing ocular conditions should be excluded"
          },
          {
            book: "whovl26",
            text: "Eye examinations every 2 weeks during and after treatment, and teach patients the symptoms.",
            ref: "WHO VL & PKDL guideline 2026, 4.3.1 Implementation considerations, p. 32",
            pdf_page: 50,
            quote: "Regular eye examinations (every 2 weeks) should be conducted during and after treatment."
          },
          {
            book: "whovl26",
            text: "Miltefosine is contraindicated in pregnancy; contraception must cover the course and 2 months after short regimens (e.g. 5, 7 or 10 days) or 5 months after regimens of 28 days or longer.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.1, remark 3, p. 23",
            pdf_page: 41,
            quote: "5 months (for 28-day or longer miltefosine regimens) post-treatment"
          },
          {
            book: "whovl26",
            text: "Skin lesions improving before the end of treatment can undermine adherence; educate the patient.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.3.1, remarks, p. 30",
            pdf_page: 48,
            quote: "Improvement in skin lesions before the end of treatment might compromise adherence"
          },
          {
            book: "whovl26",
            text: "Pregnancy was not considered in the PKDL source study.",
            ref: "WHO VL & PKDL guideline 2026, 4.3.1 Key research gaps, p. 32",
            pdf_page: 50,
            quote: "Pregnancy was not considered in the source study."
          },
          {
            book: "whovl26",
            text: "(South-East Asia) If miltefosine is refused, unavailable or contraindicated, consider L-AMB.",
            ref: "WHO VL & PKDL guideline 2026, 4.4 PKDL in South-East Asia, remarks, p. 33",
            pdf_page: 51,
            quote: "If miltefosine is refused, unavailable or contraindicated, consider alternative treatment with LAmB."
          },
          {
            book: "whovl26",
            text: "In eastern Africa the definitive-cure end-point was 100 % resolution of lesions in grade III patients at 12 months.",
            ref: "WHO VL & PKDL guideline 2026, 5.4, p. 46",
            pdf_page: 64,
            quote: "100% resolution of lesions in grade III patients at 12 months"
          },
          {
            book: "whovl26",
            text: "VL and PKDL patients are reservoirs; bednets and personal protection for them and close contacts reduce sandfly feeding.",
            ref: "WHO VL & PKDL guideline 2026, 5.7, p. 49",
            pdf_page: 67,
            quote: "use of insecticide-treated bednets and other personal protection by VL or PKDL cases"
          }
        ]
      },
      {
        id: "pkdl-child",
        group: "PKDL",
        title: "PKDL in a child or malnourished",
        who: "PKDL in a child (eye symptoms are hard to monitor) or in a severely malnourished patient",
        give: [
          {
            drug: "liposomal-amphotericin-b",
            label: "Liposomal amphotericin B",
            dose: "5 mg/kg IV on days 1, 3, 5 and 7 (total 20 mg/kg). 1 mg test dose first",
            dosing: null
          },
          {
            drug: "miltefosine",
            label: "Miltefosine capsules",
            dose: "Allometric weight-band dose (table): the daily dose split into 2 doses, with food, for 28 days",
            dosing: "milt-allo"
          }
        ],
        also: [
          "Shorter regimen, preferred because eye monitoring is hard in children and for its safety in malnutrition.",
          "Malnourished: admit and give food with each dose.",
          "Eye examination every 2 weeks during and after treatment; ask the carer about red or watering eyes."
        ],
        avoid: ["No child under 6 years was in the PKDL trial — senior decision for a young child."],
        followup: ["Review at 12 months for full clearance."],
        caseId: "pkdl",
        refs: [
          {
            book: "whovl26",
            text: "Comparator: L-AMB 5 mg/kg IV on days 1, 3, 5 and 7 (total 20 mg/kg) with miltefosine in allometric doses twice a day for 28 days.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.3.1, footnote b, p. 29",
            pdf_page: 47,
            quote: "Dose of LAmB 5 mg/kg per day IV on days 1, 3, 5, and 7 (total dose, 20 mg/kg)"
          },
          {
            book: "whovl26",
            text: "Children: eye monitoring is difficult, so the shorter L-AMB plus miltefosine regimen is preferred.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.3.1, remarks, p. 30",
            pdf_page: 48,
            quote: "shorter (LAmB plus miltefosine) regimen is preferred"
          },
          {
            book: "whovl26",
            text: "Severely malnourished patients: L-AMB plus miltefosine might be preferred (shorter, safer); without food miltefosine causes more gut side-effects.",
            ref: "WHO VL & PKDL guideline 2026, Recommendation 4.3.1, remarks, p. 30",
            pdf_page: 48,
            quote: "LAmB plus miltefosine might be preferred to paromomycin"
          },
          {
            book: "whovl26",
            text: "No children under 6 years, no HIV or other comorbidity, and no pregnancy were included in the PKDL source study.",
            ref: "WHO VL & PKDL guideline 2026, 4.3.1 Key research gaps, p. 32",
            pdf_page: 50,
            quote: "No children < 6 years were included in the source study."
          },
          {
            book: "whovl26",
            text: "Eye examinations every 2 weeks during and after treatment, and teach patients the symptoms.",
            ref: "WHO VL & PKDL guideline 2026, 4.3.1 Implementation considerations, p. 32",
            pdf_page: 50,
            quote: "Regular eye examinations (every 2 weeks) should be conducted during and after treatment."
          },
          {
            book: "whovl26",
            text: "Give L-AMB as a 1 mg test dose by infusion, then the full dose.",
            ref: "WHO VL & PKDL guideline 2026, 4.3.1 Implementation considerations, p. 32",
            pdf_page: 50,
            quote: "A test dose of LAmB of 1 mg should be given by infusion, followed by a full dose."
          },
          {
            book: "whovl26",
            text: "No data in severely malnourished children: admit them and give food before each directly observed dose.",
            ref: "WHO VL & PKDL guideline 2026, 5.1 Miltefosine, p. 43",
            pdf_page: 61,
            quote: "Such patients should be admitted and provided with food before miltefosine administration"
          }
        ]
      },
      {
        id: "vl-followup",
        group: "Follow-up",
        title: "Cure, follow-up and PKDL watch",
        who: "Every VL patient at the end of treatment and over the next 6 months",
        give: [
          {
            drug: null,
            label: "No further antileishmanial if cured",
            dose: "Initial cure at the end of treatment (or 2–4 weeks after a short course): no fever, smaller spleen, weight gain, higher Hb, looks better",
            dosing: null
          }
        ],
        also: [
          "The spleen can take several months to shrink fully — that alone is not failure.",
          "WHO 2026 sets no routine parasitological test of cure for HIV-negative VL (it is a research gap); follow the national protocol. With HIV, test of cure is part of the regimen (see that case).",
          "Women who took miltefosine: contraception continues to 5 months after the last capsule.",
          "Counsel about relapse and PKDL; write down where a migrant worker will be."
        ],
        avoid: ["Do not use rK39 or DAT to judge cure or relapse — they stay positive for years."],
        followup: [
          "Review at 6 months: no relapse = definitive cure.",
          "Miltefosine: eye review for at least 2 months after the course.",
          "New rash on the face: PKDL — see the PKDL scenarios."
        ],
        caseId: "visceral-leishmaniasis",
        refs: [
          {
            book: "whovl26",
            text: "Initial cure: afebrile, smaller spleen, weight gain, higher haemoglobin and better general appearance by the end of treatment (or within 2–4 weeks of a short course).",
            ref: "WHO VL & PKDL guideline 2026, 3.2, p. 15",
            pdf_page: 33,
            quote: "An initial cure can be declared if a patient is afebrile, their spleen size is reduced"
          },
          {
            book: "whovl26",
            text: "A good indicator of definitive (final) cure is no clinical relapse at 6 months; relapse is recurrence after initial cure confirmed parasitologically.",
            ref: "WHO VL & PKDL guideline 2026, 3.2, p. 15",
            pdf_page: 33,
            quote: "A good indicator of definitive (or final) cure is the absence of clinical relapse at 6 months"
          },
          {
            book: "whovl26",
            text: "Complete regression of splenomegaly can take several months.",
            ref: "WHO VL & PKDL guideline 2026, 3.2, p. 15",
            pdf_page: 33,
            quote: "Complete regression of splenomegaly can take several months."
          },
          {
            book: "whovl26",
            text: "A test of cure for VL is still a research priority: consensus on the definition of cure and biomarkers are needed.",
            ref: "WHO VL & PKDL guideline 2026, 6 Research — diagnosis and test-of-cure, p. 54",
            pdf_page: 72,
            quote: "Identify biomarkers for test of cure of VL"
          },
          {
            book: "harrison",
            text: "Antibody tests stay positive for years after cure, so they cannot be used to measure cure or detect relapse.",
            ref: "Harrison 22nd ed. 2025, ch. 233 Leishmaniasis, p. 1783",
            pdf_page: 1826,
            quote: "they cannot be used for measurement of cure or"
          },
          {
            book: "whovl26",
            text: "WHO recommends counselling and follow-up of all VL and PKDL cases and routine monitoring of cure rates.",
            ref: "WHO VL & PKDL guideline 2026, 5.5, p. 48",
            pdf_page: 66,
            quote: "WHO recommends counselling and follow-up of all VL and PKDL cases"
          },
          {
            book: "whovl26",
            text: "Follow all patients on miltefosine at frequent intervals for a minimum of 2 months after treatment; an eye examination at 4 weeks of therapy is critically important.",
            ref: "WHO VL & PKDL guideline 2026, Annex 1, Appendix 2, p. 70",
            pdf_page: 88,
            quote: "An eye examination at completion of 4 weeks of therapy is critically important."
          },
          {
            book: "whovl26",
            text: "Most patients present within 6 months of VL treatment, sometimes after 2 weeks, 15 % together with VL, and 10 % with no previous VL.",
            ref: "WHO VL & PKDL guideline 2026, 3.3.1 PKDL in eastern Africa, p. 18",
            pdf_page: 36,
            quote: "the majority of patients usually present within 6 months after treatment for VL"
          },
          {
            book: "whovl26",
            text: "In Ethiopia seasonal migrant labourers going to endemic zones to plant and harvest cash crops are at highest risk and make up 80 % of cases aged 15 years and over.",
            ref: "WHO VL & PKDL guideline 2026, 3.1 VL in eastern Africa, p. 15",
            pdf_page: 33,
            quote: "seasonal migrant labourers travelling to endemic zones to plant and harvest cash crops are at highest risk"
          }
        ]
      }
    ],
    dosing: [
      {
        id: "milt-allo",
        drug: "miltefosine",
        label: "Miltefosine — allometric weight-band dose (WHO 2026, Annex 2)",
        per: "per DAY — give as 2 doses, with food",
        schedule: "Twice daily. VL: 14 days with paromomycin. PKDL: 42 days with paromomycin, or 28 days with liposomal amphotericin B",
        bands: [
          { from: 1, to: 6, value: "20 mg" },
          { from: 6, to: 10, value: "30 mg" },
          { from: 10, to: 15, value: "50 mg" },
          { from: 15, to: 20, value: "60 mg" },
          { from: 20, to: 25, value: "70 mg" },
          { from: 25, to: 30, value: "80 mg" },
          { from: 30, to: 45, value: "100 mg" },
          { from: 45, to: null, value: "150 mg" }
        ],
        note: "Copied from Annex 2: <6 → 20; 6.00–9.99 → 30; 10.00–14.99 → 50; 15.00–19.99 → 60; 20.00–24.99 → 70; 25.00–29.99 → 80; 30–44.99 → 100; ≥45 → 150 mg per day. Read as from (inclusive) to under the next band. The source gives no lower limit for '<6'; 1 kg is used only because the app needs a number. The eastern-Africa VL regimen was tested only from age 4 years, and the PKDL regimen from age 6. The guideline gives the DAILY dose and says twice daily, but not how to split doses that do not divide evenly into the capsules you stock (e.g. 30, 50, 70, 150 mg) — confirm the split with the pharmacist or the national programme. Not the VL–HIV dose (see that scenario).",
        ref: {
          book: "whovl26",
          text: "Allometric weight-band regimen of miltefosine: selected daily dose by weight band.",
          ref: "WHO VL & PKDL guideline 2026, Annex 2, p. 79",
          pdf_page: 97,
          quote: "Miltefosine dose levels per weight band for an allometric weight band-based regimen"
        }
      }
    ],
    drugs: [
      "paromomycin",
      "miltefosine",
      "sodium-stibogluconate",
      "liposomal-amphotericin-b",
      "amphotericin-b-deoxycholate",
      "pentamidine",
      "arv-prophylaxis",
      "blood-transfusion",
      "ceftriaxone"
    ],
    cases: ["visceral-leishmaniasis", "visceral-leishmaniasis-hiv", "pkdl"],
    sources: [
      {
        name: "WHO guidelines on leishmaniases: treatment of visceral leishmaniasis and post-kala-azar dermal leishmaniasis in eastern Africa and South-East Asia, 2026"
      },
      {
        name: "Ethiopia MoH National Comprehensive HIV Prevention, Care and Treatment Training — Participant Manual, March 2025 (section 11.5)"
      },
      {
        name: "WHO guideline for the treatment of visceral leishmaniasis in HIV co-infected patients in East Africa and South-East Asia, 2022"
      },
      { name: "Harrison's Principles of Internal Medicine, 22nd ed. 2025, ch. 233" }
    ]
  }
];
