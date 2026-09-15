/* Reference textbooks cited across MedBridge. `book` keys are used by the
   `textbook` arrays on drugs (drugs-data.js) and cases (conditions.js). */
window.BOOKS = {
  harrison: { title: "Harrison's Principles of Internal Medicine", edition: "22nd ed.", year: 2025, scope: "Adult medicine" },
  williams: { title: "Williams Obstetrics", edition: "25th ed.", year: 2018, scope: "Obstetrics" },
  gabbe:    { title: "Gabbe's Obstetrics: Normal and Problem Pregnancies", edition: "9th ed.", year: 2025, scope: "Obstetrics" },
  schwartz: { title: "Schwartz's Principles of Surgery", edition: "11th ed.", year: 2019, scope: "Surgery, trauma and anaesthesia" },
  nelson:   { title: "Nelson Textbook of Pediatrics", edition: "22nd ed.", year: 2024, scope: "Paediatrics and neonatology" },
  kaplan:   { title: "Kaplan & Sadock's Synopsis of Psychiatry", edition: "12th ed.", year: 2022, scope: "Psychiatry and psychopharmacology" },
  dsm:      { title: "DSM-5-TR Clinical Cases", edition: "", year: 2023, scope: "Psychiatric diagnosis (American Psychiatric Association)" },
  note:     { title: "Editorial notes", edition: "", year: null, scope: "Where the textbooks differ from low-resource practice or are silent" }
};
