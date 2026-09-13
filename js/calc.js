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
  function weightDose({ dosePerKg, weightKg, maxDose, minDose, conc, bands }) {
    if (!(weightKg > 0)) return null;
    // weight bands override the per-kg dose, e.g. artesunate 3 mg/kg under 20 kg
    let perKg = dosePerKg, band = null;
    if (Array.isArray(bands)) band = bands.find(b => weightKg < b.under) || null;
    if (band) perKg = band.dosePerKg;
    if (!(perKg > 0)) return null;
    let dose = perKg * weightKg;
    const capped = maxDose > 0 && dose > maxDose;
    if (capped) dose = maxDose;
    const raised = !capped && minDose > 0 && dose < minDose;
    if (raised) dose = minDose;
    return { dose, perKg, band, capped, raised, volumeMl: conc > 0 ? dose / conc : null };
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

  /** Holliday–Segar maintenance (Nelson 22nd ed., Tables 74.2–74.3). Rate capped at 100 mL/h. */
  function maintenance(weightKg, feverC) {
    if (!(weightKg > 0)) return null;
    const w = weightKg;
    const perDay = w <= 10 ? 100 * w : w <= 20 ? 1000 + 50 * (w - 10) : 1500 + 20 * (w - 20);
    let perHour = w <= 10 ? 4 * w : w <= 20 ? 40 + 2 * (w - 10) : 60 + (w - 20);
    const capped = perHour > 100;
    if (capped) perHour = 100;
    // 10–15 % more water for each °C of persistent fever above 38 °C
    const feverExtra = feverC > 38 ? Math.min(feverC - 38, 4) : 0;
    const f = 1 + 0.12 * feverExtra;
    return { perHour: perHour * f, perDay: Math.min(perDay, 2400) * f, capped, feverFactor: f };
  }

  /** Newborn daily fluid (WHO Pocket Book 2013 scheme): day 1 60, day 2 90, day 3 120, then 150 mL/kg/day. */
  function neonatalFluid(weightKg, dayOfLife) {
    if (!(weightKg > 0) || !(dayOfLife >= 1)) return null;
    const perKgDay = dayOfLife <= 1 ? 60 : dayOfLife === 2 ? 90 : dayOfLife === 3 ? 120 : 150;
    const perDay = perKgDay * weightKg;
    return { perKgDay, perDay, perHour: perDay / 24, per3h: perDay / 8 };
  }

  /** Burns resuscitation: mL/kg/%TBSA of Ringer's lactate over 24 h from the time of burn, half in the first 8 h. */
  function burns({ weightKg, tbsa, mlPerKgPct, hoursSinceBurn = 0 }) {
    if (!(weightKg > 0) || !(tbsa > 0) || !(mlPerKgPct > 0)) return null;
    const pct = Math.min(tbsa, 100);
    const total = mlPerKgPct * weightKg * pct;
    const h = Math.max(0, Math.min(hoursSinceBurn, 24));
    const first8 = total / 2, next16 = total / 2;
    const firstHoursLeft = Math.max(0, 8 - h);
    // if first-8-h period has passed partly, the first half still has to be given in the time remaining
    const rateFirst = firstHoursLeft > 0 ? first8 / firstHoursLeft : null;
    const rateNext = next16 / (h > 8 ? Math.max(24 - h, 1) : 16);
    return { total, first8, next16, firstHoursLeft, rateFirst, rateNext, late: h > 0 };
  }

  /** Red cell transfusion volume: weight × Hb rise (g/dL) × factor. About 5 mL/kg packed cells (Nelson) or 10 mL/kg whole blood per 1 g/dL. */
  function transfusion({ weightKg, currentHb, targetHb, product }) {
    if (!(weightKg > 0) || !(targetHb > currentHb) || !(currentHb >= 0)) return null;
    const factor = product === "whole" ? 10 : 5;
    let volume = weightKg * (targetHb - currentHb) * factor;
    const cap = (product === "whole" ? 20 : 10) * weightKg; // WHO single-transfusion volumes
    const capped = volume > cap;
    if (capped) volume = cap;
    return { volume, factor, capped, cap, rateMlHr: Math.min(5 * weightKg, volume / 3), hours: 3 };
  }

  /** Creatinine clearance. Adults: Cockcroft–Gault. Children: bedside Schwartz eGFR. Creatinine in µmol/L. */
  function crcl({ ageYears, weightKg, sex, creatUmol, heightCm }) {
    if (!(creatUmol > 0)) return null;
    const scrMgdl = creatUmol / 88.4;
    if (ageYears != null && ageYears < 18) {
      if (!(heightCm > 0)) return { error: "Height is needed for children (bedside Schwartz)." };
      return { value: 0.413 * heightCm / scrMgdl, method: "Bedside Schwartz eGFR (mL/min/1.73 m²)" };
    }
    if (!(ageYears > 0) || !(weightKg > 0)) return { error: "Age and weight are needed." };
    const v = (140 - ageYears) * weightKg * (sex === "female" ? 0.85 : 1) / (72 * scrMgdl);
    return { value: v, method: "Cockcroft–Gault (mL/min)" };
  }

  /** Oxygen cylinder duration. Litres left = full content × gauge ÷ full pressure; keep 20 % in reserve. */
  function cylinderMinutes({ fullLitres, pressure, fullPressure, flow }) {
    if (!(fullLitres > 0) || !(pressure > 0) || !(fullPressure > 0) || !(flow > 0)) return null;
    const left = fullLitres * Math.min(pressure / fullPressure, 1);
    return { litresLeft: left, minutes: left / flow, safeMinutes: left * 0.8 / flow };
  }

  window.Calc = { maintenance, neonatalFluid, burns, transfusion, crcl, cylinderMinutes, samPlan, glucose, round, dripRate, rateFromDrops, infusionRate, weightDose, dilution, estimateWeight, planC, convertMass };
})();
