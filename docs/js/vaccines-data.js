/* vaccines-data.js — the Ethiopian routine and catch-up immunisation schedule
   as a lookup table: every antigen, its routine timing, route and site, and its
   catch-up rules, including the two antigens that are NOT eligible for catch-up.

   This is a second, independent reading of the same source tables that
   js/vaccines.js computes from. The duplication is deliberate: tests/vaccines
   cross-checks the two for every antigen they share, so a misreading of the
   guideline shows up as a failing test rather than as a wrong dose.

   Source: Routine Immunization Catch-up Vaccination Guidelines, Federal
   Ministry of Health, Ethiopia (May 2022) — Table 4 (pdf p. 14) for the routine
   schedule, Table 5 (pdf p. 15) for catch-up. DRAFT until reviewed. */
window.VACCINE_SCHEDULE = {
  _about: "Ethiopian routine and catch-up immunisation schedule for MedBridge. This is a lookup table, NOT drugs-data.js entries — see notes.md for why. Fields marked null are not stated in the source document; do not fill them in from memory.",
  _book: "ethepi",
  _source: "Routine Immunization Catch-up Vaccination Guidelines, Federal Ministry of Health, Ethiopia, May 2022. Routine column from Table 4 (pdf p. 14); catch-up column from Table 5 (pdf p. 15); job aid cross-check from Annex 1 (pdf p. 31).",
  _review: { status: "draft" },
  _rules: [
    {
      rule: "An interrupted series is never restarted and no dose is ever repeated. Give only the remaining doses, however long the gap.",
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Table 5 and availing vaccines and supplies, pdf pp. 15 and 24"
    },
    {
      rule: "If more than one antigen is due, give one dose of each at the same visit. Multiple injections at one visit are safe.",
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Annex 2 summary instructions, pdf p. 32"
    },
    {
      rule: "A dose given before the minimum age, or before the minimum interval, is invalid and must be repeated once the age or interval is reached.",
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), key terms, pdf p. 7"
    },
    {
      rule: "Hep B birth dose, HPV and Td are not eligible for catch-up. Every other routine antigen is.",
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Table 5 note, pdf p. 15"
    },
    {
      rule: "With no card and no confirmed history, treat the child as unvaccinated and open a new row in the EPI register.",
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Annex 2 and Table 8, pdf pp. 32 and 29"
    },
    {
      rule: "BCG and measles multi-dose vials must be discarded 6 hours after opening.",
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), availing vaccines and supplies, pdf p. 24"
    }
  ],
  antigens: [
    {
      id: "hepb-birth",
      name: "Hepatitis B birth dose",
      antigen: "HepB",
      routine: {
        doses: 1,
        schedule: "At birth or within 24 hours of birth. Table 4 adds: for a baby delivered at home, vaccinate up to 14 days old.",
        route: "intramuscular",
        site: "left anterolateral thigh"
      },
      catchup: {
        eligible: false,
        doses: null,
        minAgeDose1: null,
        minInterval: null,
        upperAgeLimit: "Not eligible for catch-up. Footnote 1 and the job aid both set the limit at 24 hours after birth."
      },
      flag: "Source disagrees with itself — see notes.md. Table 4 (p. 14) allows up to 14 days for home deliveries; footnote 1 (p. 13) and the job aid (p. 31) say within 24 hours. Confirm with the national protocol.",
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Table 4 and footnote 1 and Annex 1, pdf pp. 14, 13 and 31"
    },
    {
      id: "bcg",
      name: "BCG",
      antigen: "BCG",
      routine: { doses: 1, schedule: "At birth or soon after", route: "intradermal", site: "right deltoid" },
      catchup: {
        eligible: true,
        doses: 1,
        minAgeDose1: "at birth",
        minInterval: null,
        upperAgeLimit: "up to 1 year of age"
      },
      note: "Multi-dose vial: discard 6 hours after opening.",
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Table 4 and Table 5, pdf pp. 14 and 15"
    },
    {
      id: "opv",
      name: "Oral polio vaccine",
      antigen: "OPV",
      routine: {
        doses: 4,
        schedule: "OPV0 at birth, then OPV1 at 6 weeks, OPV2 at 10 weeks, OPV3 at 14 weeks",
        route: "oral",
        site: "oral"
      },
      catchup: {
        eligible: true,
        doses: 4,
        minAgeDose1: "at birth",
        minInterval: "OPV0 to OPV1: 6 weeks. All subsequent doses: 4 weeks.",
        upperAgeLimit: "up to 59 months"
      },
      note: "OPV0 itself is recommended up to 14 days of life (footnote 1, p. 13); the up-to-59-months limit applies to the OPV series.",
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Table 4 and Table 5, pdf pp. 14 and 15"
    },
    {
      id: "penta",
      name: "Pentavalent (DPT-HepB-Hib)",
      antigen: "Penta",
      routine: {
        doses: 3,
        schedule: "6, 10 and 14 weeks",
        route: "intramuscular",
        site: "left anterolateral thigh"
      },
      catchup: {
        eligible: true,
        doses: 3,
        minAgeDose1: "6 weeks",
        minInterval: "4 weeks",
        upperAgeLimit: "up to 24 months"
      },
      note: "Penta1 is the antigen the zero-dose indicator is built on; Penta3 is the under-immunised indicator.",
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Table 4 and Table 5, pdf pp. 14 and 15"
    },
    {
      id: "pcv",
      name: "Pneumococcal conjugate vaccine",
      antigen: "PCV",
      routine: {
        doses: 3,
        schedule: "6, 10 and 14 weeks",
        route: "intramuscular",
        site: "right anterolateral thigh"
      },
      catchup: {
        eligible: true,
        doses: 3,
        minAgeDose1: "6 weeks",
        minInterval: "4 weeks",
        upperAgeLimit: "up to 24 months"
      },
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Table 4 and Table 5, pdf pp. 14 and 15"
    },
    {
      id: "rota",
      name: "Rotavirus vaccine",
      antigen: "Rota",
      routine: { doses: 2, schedule: "6 and 10 weeks", route: "oral", site: "oral" },
      catchup: {
        eligible: true,
        doses: 2,
        minAgeDose1: "6 weeks",
        minInterval: "4 weeks",
        upperAgeLimit: "up to 24 months"
      },
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Table 4 and Table 5, pdf pp. 14 and 15"
    },
    {
      id: "ipv",
      name: "Inactivated polio vaccine",
      antigen: "IPV",
      routine: {
        doses: 1,
        schedule: "Week 14",
        route: "intramuscular",
        site: "right thigh, 2.5 cm below the PCV injection site"
      },
      catchup: {
        eligible: true,
        doses: 2,
        minAgeDose1: "14 weeks",
        minInterval: "4 weeks",
        upperAgeLimit: "up to 24 months"
      },
      flag: "UNRESOLVED CONTRADICTION in the source — do not silently pick one. Table 4 (p. 14) gives IPV 1 dose at week 14; the Annex 1 job aid (p. 31) and the catch-up reporting format (p. 34) also show a single IPV; Table 5 (p. 15) gives 2 doses with a 4-week minimum interval. Check the card and tally sheet your facility currently uses, and confirm with the national protocol.",
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Table 4, Table 5, Annex 1 and Annex 4, pdf pp. 14, 15, 31 and 34"
    },
    {
      id: "mcv",
      name: "Measles vaccine (MCV)",
      antigen: "MCV",
      routine: { doses: 2, schedule: "9 and 15 months", route: "subcutaneous", site: "right deltoid" },
      catchup: {
        eligible: true,
        doses: 2,
        minAgeDose1: "9 months",
        minInterval: "Dose 2 at 15 months; minimum 4 weeks between dose 1 and dose 2 if dose 1 was given late.",
        upperAgeLimit: "up to 59 months"
      },
      note: "Multi-dose vial: discard 6 hours after opening. Expect measles and OPV use to rise when catch-up is offered up to 5 years.",
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Table 4 and Table 5, pdf pp. 14 and 15"
    },
    {
      id: "hpv",
      name: "Human papillomavirus vaccine",
      antigen: "HPV",
      routine: {
        doses: 2,
        schedule: "Age 14 years, second dose 6 months later",
        route: "intramuscular",
        site: "deltoid muscle of the upper arm"
      },
      catchup: {
        eligible: false,
        doses: null,
        minAgeDose1: null,
        minInterval: "Where a schedule is being completed, the minimum interval for HPV is 5 months (Annex 2, p. 32).",
        upperAgeLimit: "Not eligible for catch-up under this guideline."
      },
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Table 4 and Table 5 note and Annex 2, pdf pp. 14, 15 and 32"
    },
    {
      id: "td",
      name: "Tetanus-diphtheria (Td), pregnant women",
      antigen: "Td",
      routine: {
        doses: 5,
        schedule: "Td1 at first contact, Td2 4 weeks later, Td3 6 months after Td2, Td4 1 year after Td3, Td5 1 year after Td4",
        route: "intramuscular",
        site: "left deltoid"
      },
      catchup: {
        eligible: false,
        doses: null,
        minAgeDose1: null,
        minInterval: null,
        upperAgeLimit: "Not eligible for catch-up under this guideline."
      },
      ref: "Ethiopian MoH routine immunization catch-up vaccination guidelines (2022), Table 4 and Table 5 note, pdf pp. 14 and 15"
    }
  ],
  _notRecorded: [
    "Vaccine vial monitor stages and what to do at each stage — the guideline mentions only that VVM, temperature and expiry must be monitored (pdf p. 25).",
    "Which vaccines tolerate freezing and which are destroyed by it — not in this document.",
    "Fridge failure procedure, multi-dose vial policy beyond the 6-hour rule for BCG and MCV, reconstitution and diluent handling — not in this document.",
    "Dose volumes and number of drops per oral dose — not in this document.",
    "Contraindications and false contraindications — the word 'contraindication' does not appear in this document.",
    "AEFI definitions, reportable events and management — mentioned once in passing (pdf p. 26) with no content."
  ]
};
