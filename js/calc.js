/* MedBridge calculators — pure functions, no DOM.
   All results rounded for display by the caller. */
(function () {
  const round = (n, d = 1) => Math.round(n * Math.pow(10, d)) / Math.pow(10, d);

  /** Drip rate from volume, time and drop factor. */
  function dripRate(volumeMl, minutes, dropFactor) {
    if (!(volumeMl > 0) || !(minutes > 0) || !(dropFactor > 0)) return null;
    const mlPerHr = volumeMl / minutes * 60;
    const gttPerMin = volumeMl * dropFactor / minutes;
    return {
      mlPerHr, gttPerMin,
      gttPer15s: gttPerMin / 4,
      secPerDrop: gttPerMin > 0 ? 60 / gttPerMin : Infinity,
      countable: gttPerMin <= 150
    };
  }

  /** Reverse: drops/min → mL/h. */
  function rateFromDrops(gttPerMin, dropFactor) {
    if (!(gttPerMin > 0) || !(dropFactor > 0)) return null;
    return { mlPerHr: gttPerMin * 60 / dropFactor };
  }

  /** Mass conversion to a target unit. Units: mg, mcg, units, g. */
  const TO_MG = { g: 1000, mg: 1, mcg: 0.001 };
  function convertMass(value, from, to) {
    if (from === to) return value;
    if (from === "units" || to === "units") return null; // units are not convertible
    return value * TO_MG[from] / TO_MG[to];
  }

  /**
   * Infusion dose → rate.
   * amount/amountUnit in volumeMl; dose/doseUnit; weightKg used only for /kg units.
   */
  function infusionRate({ amount, amountUnit, volumeMl, weightKg, dose, doseUnit, dropFactor }) {
    if (!(amount > 0) || !(volumeMl > 0) || !(dose > 0)) return null;
    const perKg = doseUnit.includes("/kg");
    if (perKg && !(weightKg > 0)) return null;
    const [massUnit, , timeUnit] = perKg ? doseUnit.split("/") : [doseUnit.split("/")[0], null, doseUnit.split("/")[1]];
    // dose amount per hour in massUnit
    let perHour = dose * (perKg ? weightKg : 1) * (timeUnit === "min" ? 60 : 1);
    // convert to amountUnit
    let perHourInAmountUnit;
    if (massUnit === "units" || amountUnit === "units") {
      if (massUnit !== amountUnit) return { error: "Dose unit and drug amount unit must both be 'units'." };
      perHourInAmountUnit = perHour;
    } else {
      perHourInAmountUnit = convertMass(perHour, massUnit, amountUnit);
    }
    const concPerMl = amount / volumeMl; // amountUnit per mL
    const mlPerHr = perHourInAmountUnit / concPerMl;
    const gttPerMin = dropFactor ? mlPerHr * dropFactor / 60 : null;
    return {
      concPerMl, concUnit: amountUnit + "/mL",
      concMcgPerMl: amountUnit === "units" ? null : convertMass(concPerMl, amountUnit, "mcg"),
      perHour: perHourInAmountUnit, perHourUnit: amountUnit + "/h",
      mlPerHr, gttPerMin, gttPer15s: gttPerMin != null ? gttPerMin / 4 : null,
      mlPerDay: mlPerHr * 24
    };
  }

  /** Weight-based dose. conc in doseUnit per mL. */
  function weightDose({ dosePerKg, weightKg, maxDose, conc }) {
    if (!(dosePerKg > 0) || !(weightKg > 0)) return null;
    let dose = dosePerKg * weightKg;
    const capped = maxDose > 0 && dose > maxDose;
    if (capped) dose = maxDose;
    return { dose, capped, volumeMl: conc > 0 ? dose / conc : null };
  }

  /** C1V1 = C2V2. Concentrations in the same unit (%, mg/mL, ...). */
  function dilution({ stockConc, targetConc, finalVolumeMl }) {
    if (!(stockConc > 0) || !(targetConc > 0) || !(finalVolumeMl > 0)) return null;
    if (targetConc > stockConc) return { error: "Target concentration is higher than the stock — cannot dilute up." };
    const stockVol = targetConc * finalVolumeMl / stockConc;
    return { stockVolumeMl: stockVol, diluentMl: finalVolumeMl - stockVol, ratio: stockConc / targetConc };
  }

  /** APLS weight estimate. Pass months for < 1 y, years otherwise. */
  function estimateWeight({ years, months, formula }) {
    if (months != null && months >= 0 && months < 12) return { kg: 0.5 * months + 4, formula: "(0.5 × months) + 4" };
    if (formula === "age4x2") {
      if (years >= 1 && years <= 10) return { kg: (years + 4) * 2, formula: "(age + 4) × 2" };
      if (years > 10) return { kg: null, formula: "Use measured weight (formula valid 1–10 y)" };
      return null;
    }
    if (years >= 1 && years <= 5) return { kg: 2 * years + 8, formula: "(2 × years) + 8" };
    if (years > 5 && years <= 12) return { kg: 3 * years + 7, formula: "(3 × years) + 7" };
    if (years > 12) return { kg: null, formula: "Use measured weight (formulae unreliable > 12 y)" };
    return null;
  }

  /** WHO Plan C. */
  function planC(weightKg, under12Months, dropFactor) {
    if (!(weightKg > 0)) return null;
    const p1 = { volume: 30 * weightKg, minutes: under12Months ? 60 : 30 };
    const p2 = { volume: 70 * weightKg, minutes: under12Months ? 300 : 150 };
    [p1, p2].forEach(p => { const r = dripRate(p.volume, p.minutes, dropFactor); Object.assign(p, r); });
    return { phase1: p1, phase2: p2, total: 100 * weightKg, orsPerHour: 5 * weightKg, ngOrsPerHour: 20 * weightKg };
  }

  /** SAM (severe acute malnutrition) rehydration/shock plan — WHO. */
  function samPlan(weightKg, dropFactor) {
    if (!(weightKg > 0)) return null;
    const shock = { volume: 15 * weightKg, minutes: 60 };
    Object.assign(shock, dripRate(shock.volume, shock.minutes, dropFactor));
    return { resomalEvery30min: 5 * weightKg, resomalPerHourLow: 5 * weightKg, resomalPerHourHigh: 10 * weightKg, shock, glucoseOral: 50 };
  }
  const glucose = { toMgdl: (mmol) => mmol * 18.016, toMmol: (mgdl) => mgdl / 18.016 };

  window.Calc = { samPlan, glucose, round, dripRate, rateFromDrops, infusionRate, weightDose, dilution, estimateWeight, planC, convertMass };
})();
