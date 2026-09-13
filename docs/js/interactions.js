/* ============================================================
   MedBridge pharmacological drug-drug interactions (effects in the
   patient). DRAFT until reviewed by a clinical pharmacist.
   Physical line/syringe incompatibility lives in js/compat.js.
   An absence here does NOT mean a combination is safe.
   Sources: BNF / BNF for Children (interactions appendix);
   Harrison's Principles of Internal Medicine 22nd ed. 2025;
   Williams Obstetrics 25th ed. 2018; Gabbe's Obstetrics 9th ed. 2025;
   Schwartz's Principles of Surgery 11th ed. 2019;
   Nelson Textbook of Pediatrics 22nd ed. 2024.
   `refs` quotes were checked word-for-word against the cited PDF page.
   ============================================================ */
window.INTERACTIONS = [
  /* ---------- Digoxin ---------- */
  { a: ["digoxin"], b: ["amiodarone"], severity: "major",
    effect: "Amiodarone blocks digoxin clearance (P-glycoprotein), roughly doubling digoxin levels over days to weeks; bradycardia, heart block and digoxin toxicity follow.",
    action: "Halve the digoxin dose when amiodarone is started. Watch pulse, ECG and nausea/vomiting/visual symptoms; check a digoxin level where possible. The effect lasts weeks after amiodarone stops.",
    ref: "BNF interactions (amiodarone–digoxin); Harrison 22nd ed. 2025, ch. 71, Table 71-2, p. 489",
    refs: [
      { book: "harrison", text: "Amiodarone inhibits CYPs and P-glycoprotein and raises digoxin levels.", ref: "Harrison 22nd ed. 2025, ch. 71 Principles of Clinical Pharmacology, Table 71-2, p. 489", pdf_page: 532, quote: "Amiodarone (inhibits many CYPs and P-glycoprotein)" }
    ] },
  { a: ["digoxin"], b: ["furosemide", "salbutamol", "insulin-soluble", "aminophylline"], severity: "major",
    effect: "These drugs lower serum potassium (loss in urine or shift into cells). Hypokalaemia makes digoxin toxicity and arrhythmias much more likely, even with a 'normal' digoxin level.",
    action: "Check potassium before and during treatment; keep K+ at 4.0–5.0 mmol/L in patients on digoxin. Replace potassium early; look for bradycardia, new ectopics or vomiting.",
    ref: "BNF interactions; Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, pp. 354–356",
    refs: [
      { book: "harrison", text: "Hypokalaemia predisposes to digoxin toxicity.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 356", pdf_page: 399, quote: "Hypokalemia predisposes to digoxin toxicity" },
      { book: "harrison", text: "Insulin and beta2-adrenergic activity shift potassium into cells and cause hypokalaemia.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 354", pdf_page: 397, quote: "Insulin, β2-adrenergic activity, thyroid hormone, and alkalosis promote" }
    ] },
  { a: ["digoxin"], b: ["calcium-gluconate"], severity: "major",
    effect: "A rise in serum calcium potentiates the cardiac toxicity of digoxin; rapid IV calcium can precipitate serious arrhythmia.",
    action: "Avoid IV calcium in digoxin-treated patients unless essential. If needed (e.g. hyperkalaemia with ECG changes), add 10 mL of 10 % calcium gluconate to 100 mL 5 % glucose and infuse over 20–30 min with ECG monitoring.",
    ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 361",
    refs: [
      { book: "harrison", text: "Hypercalcaemia potentiates digoxin cardiotoxicity; give IV calcium slowly over 20–30 min.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 361", pdf_page: 404, quote: "Hypercalcemia potentiates the cardiac toxicity of digoxin" }
    ] },
  { a: ["digoxin"], b: ["quinine"], severity: "moderate",
    effect: "Quinine raises plasma digoxin concentration, with a risk of digoxin toxicity during a malaria course.",
    action: "Consider reducing the digoxin dose or withholding it for the quinine course if rate control allows; monitor pulse and ECG. Prefer artesunate for severe malaria.",
    ref: "BNF interactions (quinine–digoxin)" },
  { a: ["digoxin"], b: ["labetalol"], severity: "moderate",
    effect: "Additive slowing of AV conduction: bradycardia and heart block.",
    action: "Check heart rate before each dose; hold if pulse < 60/min or new heart block. Use hydralazine or nifedipine for blood pressure where possible.",
    ref: "BNF interactions (beta-blockers–digoxin); Harrison 22nd ed. 2025, ch. 258 Atrial Fibrillation, p. 1949",
    refs: [
      { book: "harrison", text: "Digoxin acts synergistically with beta blockers on rate control.", ref: "Harrison 22nd ed. 2025, ch. 258 Atrial Fibrillation, p. 1949", pdf_page: 1992, quote: "It acts synergistically with beta blockers and calcium channel blockers" }
    ] },

  /* ---------- Aminoglycoside ---------- */
  { a: ["gentamicin"], b: ["furosemide"], severity: "major",
    effect: "Both drugs are ototoxic, and volume depletion from the diuretic raises gentamicin levels: additive, sometimes permanent, deafness and kidney injury.",
    action: "Avoid the combination if possible. Otherwise correct fluid deficit first, avoid large rapid IV furosemide boluses, use once-daily gentamicin with levels, and check creatinine and hearing.",
    ref: "BNF interactions (aminoglycosides–loop diuretics); Harrison 22nd ed. 2025, ch. 36 Disorders of Hearing, p. 246",
    refs: [
      { book: "harrison", text: "Aminoglycosides and loop diuretics such as furosemide are ototoxic drugs.", ref: "Harrison 22nd ed. 2025, ch. 36 Disorders of Hearing, p. 246", pdf_page: 289, quote: "aminoglycoside antibiotics, loop diuretics such as furosemide" }
    ] },
  { a: ["gentamicin"], b: ["magnesium-sulfate"], severity: "moderate",
    effect: "Both impair neuromuscular transmission; together they can cause weakness and respiratory depression, reported in newborns exposed to magnesium and then given gentamicin, and in mothers with myasthenia.",
    action: "Monitor respiratory rate, reflexes and (in babies) tone and breathing; calcium gluconate reverses magnesium effect. Avoid in myasthenia gravis.",
    ref: "Gabbe 9th ed. 2025, ch. 7, p. 130; Harrison 22nd ed. 2025, ch. 459, p. 3627",
    refs: [
      { book: "gabbe", text: "Aminoglycosides potentiate neuromuscular blockade; magnesium-induced weakness was potentiated by gentamicin in a neonate.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 130", pdf_page: 163, quote: "Neuromuscular blockade may be potentiated by the combined use of aminoglycosides and curariform drugs" },
      { book: "harrison", text: "Aminoglycosides and IV magnesium worsen weakness in myasthenia.", ref: "Harrison 22nd ed. 2025, ch. 459 Myasthenia Gravis, p. 3627", pdf_page: 3670, quote: "intravenous magnesium, or procainamide can also cause exacerbation of weakness in myasthenic patients" }
    ] },

  /* ---------- Obstetric antihypertensives and magnesium ---------- */
  { a: ["magnesium-sulfate"], b: ["nifedipine"], severity: "moderate",
    effect: "Theoretical additive hypotension and enhanced magnesium neuromuscular blockade. Williams warns against the combination for TOCOLYSIS; in pre-eclampsia, Williams and Gabbe report that nifedipine does not potentiate magnesium and a retrospective study found no excess complications.",
    action: "Both may be used together in severe pre-eclampsia: give oral immediate-release nifedipine (never sublingual), check BP every 15 min and reflexes/respiratory rate hourly. Do not use nifedipine and magnesium together as tocolytics. Weakness reverses with calcium gluconate 1 g IV.",
    ref: "Williams 25th ed. 2018, ch. 40 and ch. 42; Gabbe 9th ed. 2025, ch. 38, p. 712",
    refs: [
      { book: "williams", text: "Nifedipine does not potentiate magnesium-related effects (pre-eclampsia).", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1632", pdf_page: 1632, quote: "nifedipine does not potentiate magnesium-related effects" },
      { book: "williams", text: "For tocolysis, nifedipine plus magnesium is potentially dangerous (enhanced neuromuscular blockade).", ref: "Williams Obstetrics 25th ed. 2018, ch. 42 Preterm Birth, pdf p. 1832", pdf_page: 1832, quote: "the combination of nifedipine with magnesium for tocolysis is potentially dangerous" },
      { book: "gabbe", text: "Retrospective study: magnesium plus nifedipine did not increase complications; blockade reversed by calcium gluconate.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 38 Hypertensive Disorders of Pregnancy, p. 712", pdf_page: 879, quote: "therapy with magnesium sulfate and nifedipine does not increase the risk for previously described complications" },
      { book: "gabbe", text: "Use magnesium sulfate with caution in women on calcium channel blockers.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 7 Drugs and Environmental Agents in Pregnancy and Lactation, p. 127", pdf_page: 160, quote: "Magnesium sulfate should be used with caution in women on these agents." }
    ] },
  { a: ["hydralazine"], b: ["labetalol", "nifedipine"], severity: "moderate",
    effect: "Additive blood-pressure lowering. Stacking doses quickly can cause a sudden fall in BP with placental hypoperfusion and fetal distress.",
    action: "Give one agent at a time, recheck BP 10–20 min after each dose before adding another; aim for 140–150/90–100 mmHg, not normal. Monitor fetal heart rate. Have IV fluids ready.",
    ref: "BNF interactions (antihypertensives, additive); Gabbe 9th ed. 2025, ch. 38; WHO/ACOG severe hypertension algorithms" },
  { a: ["labetalol"], b: ["nifedipine"], severity: "moderate",
    effect: "Additive hypotension; the beta-blocker also blunts the reflex tachycardia that normally limits a nifedipine-induced fall in BP.",
    action: "Recheck BP before each further dose; use the stepwise algorithm and do not give both at full dose simultaneously.",
    ref: "BNF interactions (beta-blockers–calcium-channel blockers); Gabbe 9th ed. 2025, ch. 38" },
  { a: ["labetalol"], b: ["salbutamol", "ipratropium"], severity: "major",
    effect: "Labetalol is a non-selective beta-blocker: it can trigger bronchospasm and blocks the bronchodilator effect of salbutamol. The need for these inhalers signals asthma or bronchospasm, where labetalol should be avoided.",
    action: "Do not use labetalol in women with asthma or active wheeze; use nifedipine or hydralazine instead.",
    ref: "Williams 25th ed. 2018, ch. 40, pdf p. 1632; Gabbe 9th ed. 2025, ch. 38, p. 712; BNF",
    refs: [
      { book: "williams", text: "Labetalol is not given to asthmatic women.", ref: "Williams Obstetrics 25th ed. 2018, ch. 40 Hypertensive Disorders, pdf p. 1632", pdf_page: 1632, quote: "Labetalol is not given to asthmatic women." },
      { book: "gabbe", text: "Avoid labetalol in moderate to severe asthma, bradycardia and heart failure.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 38 Hypertensive Disorders of Pregnancy, p. 712", pdf_page: 879, quote: "labetalol should be avoided in patients with moderate to severe asthma" }
    ] },
  { a: ["labetalol"], b: ["adrenaline"], severity: "major",
    effect: "Beta-blockade blunts the bronchodilator and cardiac effects of adrenaline and leaves its alpha (vasoconstrictor) effect unopposed: anaphylaxis resistant to adrenaline, severe hypertension and reflex bradycardia.",
    action: "In anaphylaxis still give IM adrenaline and repeat as needed with generous IV fluids; if refractory, give glucagon (adult 1–5 mg IV over 5 min, then infusion) where available. Monitor BP closely.",
    ref: "Harrison 22nd ed. 2025, ch. 364 Anaphylaxis, p. 2813; BNF",
    refs: [
      { book: "harrison", text: "Beta blockers may attenuate the response to epinephrine in anaphylaxis.", ref: "Harrison 22nd ed. 2025, ch. 364 Anaphylaxis, p. 2813", pdf_page: 2856, quote: "Beta blockers may attenuate this response" }
    ] },
  { a: ["labetalol"], b: ["insulin-soluble"], severity: "moderate",
    effect: "Beta-blockers mask the warning signs of hypoglycaemia (tremor, tachycardia) and may delay recovery.",
    action: "Check capillary glucose on schedule rather than relying on symptoms; sweating is still present.",
    ref: "BNF interactions; Harrison 22nd ed. 2025, ch. 284 Ischemic Heart Disease, p. 2102",
    refs: [
      { book: "harrison", text: "Beta-blocker side effects include masked signs of hypoglycaemia.", ref: "Harrison 22nd ed. 2025, ch. 284 Ischemic Heart Disease, p. 2102", pdf_page: 2145, quote: "masked signs of hypoglycemia" }
    ] },
  { a: ["ergometrine"], b: ["adrenaline", "noradrenaline", "dopamine"], severity: "major",
    effect: "Additive vasoconstriction: severe hypertension, stroke, and peripheral or coronary ischaemia.",
    action: "Avoid ergometrine in a woman on a vasopressor infusion; use oxytocin, misoprostol or tranexamic acid for haemorrhage. Ergometrine is also relatively contraindicated in hypertension and pre-eclampsia.",
    ref: "BNF interactions (ergometrine–sympathomimetics); Williams 25th ed. 2018, ch. 27, pdf p. 1157",
    refs: [
      { book: "williams", text: "Methylergonovine (an ergot) is relatively contraindicated in hypertensive women.", ref: "Williams Obstetrics 25th ed. 2018, ch. 27 Vaginal Delivery, pdf p. 1157", pdf_page: 1157, quote: "Methylergonovine is relatively contraindicated in the hypertensive woman." }
    ] },
  { a: ["oxytocin"], b: ["misoprostol"], severity: "major",
    effect: "Additive uterine stimulation during induction: tachysystole, fetal distress and uterine rupture, especially with a previous scar or high parity.",
    action: "With a live fetus, start oxytocin no sooner than 4 hours after the last misoprostol dose and do not give them together. (Together is acceptable for postpartum haemorrhage after delivery.)",
    ref: "Gabbe 9th ed. 2025, ch. 14 Induction of Labor, p. 283; ACOG",
    refs: [
      { book: "gabbe", text: "Oxytocin may be started 4 hours after the final misoprostol dose.", ref: "Gabbe's Obstetrics 9th ed. 2025, ch. 14 Induction of Labor, p. 283", pdf_page: 362, quote: "oxytocin may be initiated 4 hours after the final misoprostol dose" }
    ] },

  /* ---------- Sedatives and respiratory depression ---------- */
  { a: ["morphine"], b: ["diazepam", "midazolam", "phenobarbital"], severity: "major",
    effect: "Synergistic respiratory depression, sedation and hypotension; apnoea can occur at doses that are safe for either drug alone.",
    action: "Avoid unless necessary. If combined, reduce doses, give one at a time, monitor respiratory rate and SpO2 continuously, keep bag-valve-mask and naloxone at the bedside.",
    ref: "Harrison 22nd ed. 2025, ch. 14 Pain, p. 98; BNF",
    refs: [
      { book: "harrison", text: "Benzodiazepines with opioids are particularly likely to cause respiratory depression.", ref: "Harrison 22nd ed. 2025, ch. 14 Pain: Pathophysiology and Management, p. 98", pdf_page: 141, quote: "Co-administration of benzodiazepines is particularly likely to produce respiratory depression" }
    ] },
  { a: ["morphine"], b: ["ketamine"], severity: "moderate",
    effect: "IV anaesthetics potentiate opioid-induced respiratory depression; ketamine plus opioid increases the risk of apnoea, especially in infants.",
    action: "Reduce the opioid dose, titrate slowly, monitor SpO2 and breathing; airway-trained staff present.",
    ref: "Nelson 22nd ed. 2024, ch. 91 Anesthesia and Perioperative Care, p. 670",
    refs: [
      { book: "nelson", text: "Other IV anaesthetics potentiate opioid-induced respiratory depression.", ref: "Nelson 22nd ed. 2024, ch. 91 Anesthesia and Perioperative Care, p. 670", pdf_page: 716, quote: "Other inhalational or IV anesthetics generally potentiate opioid-induced respiratory depression" }
    ] },
  { a: ["diazepam", "midazolam"], b: ["phenobarbital"], severity: "major",
    effect: "Phenobarbital given after benzodiazepines (status epilepticus, eclampsia, cerebral malaria) adds to respiratory depression and hypotension; respiratory arrest can occur.",
    action: "Give phenobarbital only for seizures that continue, with bag-valve-mask and oxygen at the bedside; infuse over 20 min and watch breathing for several hours.",
    ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1772; BNF",
    refs: [
      { book: "harrison", text: "Without respiratory support, a 20 mg/kg phenobarbital load may cause respiratory arrest.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1772", pdf_page: 1815, quote: "a full loading dose of phenobarbital (20 mg/kg) to prevent convulsions should not be given as it may cause respiratory arrest" }
    ] },

  /* ---------- Enzyme inducers / inhibitors ---------- */
  { a: ["tb-rhze", "phenytoin", "phenobarbital"], b: ["dexamethasone", "hydrocortisone"], severity: "moderate",
    effect: "Rifampicin, phenytoin and phenobarbital induce liver enzymes and speed corticosteroid metabolism, so steroid effect falls (a problem in TB meningitis, adrenal insufficiency, cerebral oedema). Dexamethasone may in turn alter phenytoin levels.",
    action: "Expect to need higher steroid doses (with rifampicin, BNF advises doubling the corticosteroid dose); watch for loss of effect and check phenytoin levels where available.",
    ref: "BNF interactions (corticosteroids–rifampicin/phenytoin/phenobarbital); Harrison 22nd ed. 2025, ch. 95, p. 717",
    refs: [
      { book: "harrison", text: "Phenytoin and carbamazepine are potent enzyme inducers that interfere with glucocorticoid metabolism.", ref: "Harrison 22nd ed. 2025, ch. 95 Primary and Metastatic Tumors of the Nervous System, p. 717", pdf_page: 760, quote: "potent enzyme inducers that can interfere with both glucocorticoid and chemotherapy metabolism" }
    ] },
  { a: ["tb-rhze"], b: ["nifedipine"], severity: "major",
    effect: "Rifampicin greatly reduces nifedipine levels; blood pressure control is lost.",
    action: "Avoid: use labetalol, hydralazine or methyldopa for hypertension in a patient on rifampicin (and for 2 weeks after stopping).",
    ref: "BNF interactions (rifampicin–nifedipine)" },
  { a: ["tb-rhze"], b: ["arv-prophylaxis"], severity: "major",
    effect: "Rifampicin induces metabolism of dolutegravir (and nevirapine), lowering levels enough to cause treatment failure and resistance.",
    action: "Give dolutegravir 50 mg TWICE daily (adults) while on rifampicin and for 2 weeks after. Tenofovir and lamivudine need no change. Infant nevirapine prophylaxis levels are reduced by rifampicin: seek HIV/TB specialist advice (zidovudine-based infant prophylaxis may be preferred).",
    ref: "Harrison 22nd ed. 2025, ch. 183 Tuberculosis, pp. 1400–1402; WHO consolidated HIV guidelines",
    refs: [
      { book: "harrison", text: "With rifampicin-based TB treatment, dolutegravir is given at double the standard dose.", ref: "Harrison 22nd ed. 2025, ch. 183 Tuberculosis, p. 1400", pdf_page: 1443, quote: "dolutegravir or raltegravir (but not bictegravir, cabotegravir, or elvitegravir) at double the standard dose" },
      { book: "harrison", text: "Dolutegravir must be increased to 50 mg twice daily with rifampin; tenofovir disoproxil needs no adjustment.", ref: "Harrison 22nd ed. 2025, ch. 183 Tuberculosis, p. 1402", pdf_page: 1445, quote: "the dose of the integrase inhibitor dolutegravir needs to be increased to 50 mg twice daily when given together with rifampin" }
    ] },
  { a: ["phenytoin", "phenobarbital"], b: ["arv-prophylaxis"], severity: "major",
    effect: "Phenytoin and phenobarbital induce dolutegravir metabolism and can make PEP or prophylaxis fail.",
    action: "Avoid the combination; use levetiracetam (or valproate, not in pregnancy) for seizures, or seek HIV specialist advice on an alternative regimen.",
    ref: "BNF interactions (dolutegravir–phenytoin/phenobarbital); dolutegravir product information" },
  { a: ["chloramphenicol"], b: ["phenytoin", "phenobarbital"], severity: "major",
    effect: "Chloramphenicol inhibits metabolism of phenytoin (and phenobarbital), causing toxicity (ataxia, nystagmus, drowsiness). Phenobarbital in turn lowers chloramphenicol levels, risking treatment failure in meningitis.",
    action: "Prefer ceftriaxone. If combined, watch for anticonvulsant toxicity, check phenytoin levels where available, and reduce phenytoin dose if toxic.",
    ref: "BNF interactions (chloramphenicol–phenytoin/phenobarbital)" },
  { a: ["metronidazole"], b: ["phenytoin", "phenobarbital"], severity: "moderate",
    effect: "Metronidazole can raise phenytoin to toxic levels; phenytoin and phenobarbital speed metronidazole elimination and reduce its effect.",
    action: "Watch for phenytoin toxicity (nystagmus, ataxia, drowsiness); consider a higher metronidazole dose for serious anaerobic infection.",
    ref: "Harrison 22nd ed. 2025, ch. 149, p. 1178 and ch. 229, p. 1744",
    refs: [
      { book: "harrison", text: "Metronidazole with phenytoin can cause phenytoin toxicity and lower metronidazole levels.", ref: "Harrison 22nd ed. 2025, ch. 149 Treatment and Prophylaxis of Bacterial Infections, p. 1178", pdf_page: 1221, quote: "coadministration with phenytoin can result in phenytoin toxicity and possibly decreased levels of metronidazole" }
    ] },
  { a: ["tb-rhze"], b: ["phenytoin"], severity: "moderate",
    effect: "Isoniazid inhibits phenytoin metabolism (toxicity, especially in slow acetylators), while rifampicin induces it (loss of seizure control); the net effect is unpredictable.",
    action: "Monitor for phenytoin toxicity and for breakthrough seizures; check levels where available. Levetiracetam avoids the problem.",
    ref: "Harrison 22nd ed. 2025, ch. 186 Antimycobacterial Agents, p. 1422; BNF",
    refs: [
      { book: "harrison", text: "Isoniazid inhibits cytochrome P450 and interacts significantly with phenytoin and acetaminophen.", ref: "Harrison 22nd ed. 2025, ch. 186 Antimycobacterial Agents, p. 1422", pdf_page: 1465, quote: "clopidogrel, maraviroc, dronedarone, salmeterol, tamoxifen, eplerenone, and phenytoin" }
    ] },
  { a: ["phenytoin"], b: ["phenobarbital"], severity: "moderate",
    effect: "Each alters the other's metabolism; phenytoin levels may rise or fall and phenobarbital levels may rise. Sedation is additive.",
    action: "Monitor for sedation and seizure control; check levels where available after adding or stopping either drug.",
    ref: "BNF interactions (phenytoin–phenobarbital)" },
  { a: ["aminophylline"], b: ["phenytoin", "phenobarbital", "tb-rhze"], severity: "moderate",
    effect: "Enzyme inducers (phenytoin, phenobarbital, rifampicin) lower theophylline levels, so aminophylline works less well; theophylline also lowers phenytoin levels.",
    action: "Expect a higher aminophylline requirement; measure theophylline levels where available. Watch seizure control on phenytoin.",
    ref: "BNF interactions (theophylline); app aminophylline cautions" },
  { a: ["aminophylline"], b: ["salbutamol"], severity: "moderate",
    effect: "Additive hypokalaemia and tachyarrhythmia in severe asthma.",
    action: "Check potassium at least every 12–24 h (more often in severe asthma), replace as needed; monitor heart rate and ECG.",
    ref: "BNF interactions; Harrison 22nd ed. 2025, ch. 56, p. 354",
    refs: [
      { book: "harrison", text: "Theophylline acts downstream of the beta2 receptor and causes hypokalaemia.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 354", pdf_page: 397, quote: "can lead to hypokalemia, usually in the setting of overdose (theophylline)" }
    ] },
  { a: ["adenosine"], b: ["aminophylline", "caffeine-citrate"], severity: "moderate",
    effect: "Theophylline and caffeine are adenosine-receptor antagonists and reduce or abolish the effect of adenosine on SVT.",
    action: "A larger adenosine dose may be needed; if SVT persists, use vagal manoeuvres, synchronised cardioversion or an alternative drug.",
    ref: "BNF interactions (adenosine–theophylline); Harrison 22nd ed. 2025, ch. 470, p. 3710",
    refs: [
      { book: "harrison", text: "Methylxanthines (caffeine, theophylline) antagonise adenosine receptors.", ref: "Harrison 22nd ed. 2025, ch. 470 Poisoning and Drug Overdose, Table 470-2, p. 3710", pdf_page: 3753, quote: "Inhibition of adenosine synthesis and adenosine receptor antagonism" }
    ] },

  /* ---------- Local anaesthetics and antiarrhythmics ---------- */
  { a: ["bupivacaine"], b: ["lidocaine"], severity: "major",
    effect: "Local anaesthetic toxicity is additive: using both (e.g. lidocaine infiltration plus bupivacaine block) can exceed the safe total and cause seizures, arrhythmia and cardiac arrest.",
    action: "Add the doses as fractions of each drug's maximum (lidocaine 3 mg/kg plain; bupivacaine 2 mg/kg) and keep the total below 100 %. Aspirate before injecting; have lipid emulsion 20 % and resuscitation equipment ready.",
    ref: "Schwartz 11th ed. 2019, ch. 46 Anesthesia for Surgical Patients, p. 2031; BNF",
    refs: [
      { book: "schwartz", text: "Risk of local anaesthetic systemic toxicity rises with cumulative dose; bupivacaine is most cardiotoxic.", ref: "Schwartz 11th ed. 2019, ch. 46 Anesthesia for Surgical Patients, p. 2031", pdf_page: 2058, quote: "Other risk factors for local anesthetic systemic toxicity include cumulative dose" }
    ] },
  { a: ["phenytoin"], b: ["lidocaine"], severity: "moderate",
    effect: "IV phenytoin with IV lidocaine increases the risk of arrhythmia and hypotension (both are sodium-channel blockers).",
    action: "Avoid IV use together (e.g. in refractory neonatal seizures); if unavoidable, continuous ECG and BP monitoring.",
    ref: "Nelson 22nd ed. 2024, ch. 633 Seizures in Childhood, p. 3623",
    refs: [
      { book: "nelson", text: "Phenytoin/fosphenytoin should not be combined with IV lidocaine (arrhythmias, hypotension).", ref: "Nelson 22nd ed. 2024, ch. 633.7 Neonatal Seizures, p. 3623", pdf_page: 3661, quote: "phenytoin and fosphenytoin should not be used in conjunction with intravenous lidocaine" }
    ] },
  { a: ["amiodarone"], b: ["quinine"], severity: "major",
    effect: "Both prolong the QT interval: risk of torsades de pointes and ventricular fibrillation.",
    action: "Avoid; use artesunate for severe malaria. If unavoidable, baseline and repeat ECG, keep K+ > 4 and Mg normal, stop if QTc > 500 ms.",
    ref: "BNF interactions (QT-prolonging drugs); Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1771",
    refs: [
      { book: "harrison", text: "Quinine commonly prolongs the ECG QT interval.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, Table 231-7, p. 1771", pdf_page: 1814, quote: "ECG QT interval prolongation (usually by <10%)" }
    ] },
  { a: ["amiodarone"], b: ["furosemide"], severity: "moderate",
    effect: "Diuretic-induced hypokalaemia and hypomagnesaemia increase the risk of torsades de pointes with QT-prolonging amiodarone.",
    action: "Check and correct potassium and magnesium before and during amiodarone; ECG monitoring.",
    ref: "Harrison 22nd ed. 2025, ch. 71, Table 71-2, p. 489; BNF",
    refs: [
      { book: "harrison", text: "Long-QT arrhythmias with QT-prolonging antiarrhythmics plus diuretics.", ref: "Harrison 22nd ed. 2025, ch. 71 Principles of Clinical Pharmacology, Table 71-2, p. 489", pdf_page: 532, quote: "Long QT–related arrhythmias with QT-prolonging antiarrhythmics plus diuretics" }
    ] },
  { a: ["amiodarone"], b: ["phenytoin"], severity: "moderate",
    effect: "Amiodarone inhibits phenytoin metabolism: phenytoin toxicity may develop over days to weeks.",
    action: "Reduce phenytoin dose if toxicity appears; check levels where available.",
    ref: "BNF interactions (amiodarone–phenytoin); Harrison 22nd ed. 2025, ch. 71, Table 71-1, p. 485" },
  { a: ["amiodarone"], b: ["labetalol"], severity: "moderate",
    effect: "Additive bradycardia, AV block and myocardial depression.",
    action: "Monitor heart rate, BP and ECG; avoid IV labetalol boluses shortly after IV amiodarone.",
    ref: "BNF interactions (amiodarone–beta-blockers)" },

  /* ---------- Glucose and potassium ---------- */
  { a: ["insulin-soluble"], b: ["dexamethasone", "hydrocortisone"], severity: "moderate",
    effect: "Corticosteroids cause insulin resistance and hyperglycaemia (including antenatal steroids in diabetic mothers); insulin needs rise, then fall when the steroid stops.",
    action: "Check glucose 4–6-hourly during steroid treatment and for 72 h after; increase insulin as needed and reduce it again when steroids are stopped to avoid hypoglycaemia.",
    ref: "Harrison 22nd ed. 2025, ch. 416 Diabetes Mellitus: Management and Therapies, p. 3220",
    refs: [
      { book: "harrison", text: "Glucocorticoids increase insulin resistance and worsen glycaemic control.", ref: "Harrison 22nd ed. 2025, ch. 416 Diabetes Mellitus: Management and Therapies, p. 3220", pdf_page: 3263, quote: "Glucocorticoids increase insulin resistance, decrease glucose utilization" }
    ] },
  { a: ["insulin-soluble"], b: ["salbutamol"], severity: "moderate",
    effect: "Both drive potassium into cells (additive hypokalaemia); salbutamol also raises blood glucose.",
    action: "Check potassium and glucose regularly when used together (e.g. DKA with asthma, or hyperkalaemia treatment, where the combined fall in K+ can overshoot).",
    ref: "Harrison 22nd ed. 2025, ch. 56, p. 354; BNF",
    refs: [
      { book: "harrison", text: "Insulin and beta2-adrenergic activity promote cellular potassium uptake.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 354", pdf_page: 397, quote: "Insulin, β2-adrenergic activity, thyroid hormone, and alkalosis promote" }
    ] },
  { a: ["insulin-soluble"], b: ["quinine"], severity: "moderate",
    effect: "Quinine stimulates insulin secretion; with insulin therapy the risk of severe hypoglycaemia is additive, particularly in pregnancy and children.",
    action: "Check glucose at least 4-hourly (hourly if unconscious) and run a glucose-containing infusion; reduce insulin doses.",
    ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1764",
    refs: [
      { book: "harrison", text: "Quinine is a powerful stimulant of pancreatic insulin secretion.", ref: "Harrison 22nd ed. 2025, ch. 231 Malaria, p. 1764", pdf_page: 1807, quote: "quinine, a powerful stimulant of pancreatic insulin secretion" }
    ] },
  { a: ["potassium-chloride"], b: ["heparin"], severity: "moderate",
    effect: "Heparin suppresses aldosterone synthesis and can cause hyperkalaemia; added potassium supplements increase the risk, especially in renal impairment or diabetes.",
    action: "Check potassium before starting and at least every few days on heparin; stop routine KCl additives if K+ > 5.",
    ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 359; BNF",
    refs: [
      { book: "harrison", text: "Heparin preparations inhibit aldosterone synthesis and cause hyperkalaemia.", ref: "Harrison 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances, p. 359", pdf_page: 402, quote: "heparin preparations can cause selective inhibition of aldosterone synthesis" }
    ] },

  /* ---------- Hepatotoxicity and nephrotoxicity ---------- */
  { a: ["paracetamol"], b: ["phenytoin", "phenobarbital", "tb-rhze"], severity: "moderate",
    effect: "Enzyme inducers (phenytoin, phenobarbital, rifampicin) and isoniazid increase formation of paracetamol's toxic metabolite: liver injury at lower doses, and the combination adds to TB-drug hepatotoxicity.",
    action: "Keep to the lower paracetamol maximum (adult 3 g/day or less, no long high-dose courses); check liver tests if jaundice, vomiting or right upper quadrant pain. In overdose, treat at a lower threshold.",
    ref: "Harrison 22nd ed. 2025, ch. 71, p. 489 and ch. 186, p. 1422; BNF",
    refs: [
      { book: "harrison", text: "Phenobarbital or phenytoin increase the risk of acetaminophen hepatic necrosis.", ref: "Harrison 22nd ed. 2025, ch. 71 Principles of Clinical Pharmacology, p. 489", pdf_page: 532, quote: "The risk of acetaminophen-related hepatic necrosis is increased in patients receiving drugs such as phenobarbital or phenytoin" },
      { book: "harrison", text: "Isoniazid has significant interactions including acetaminophen.", ref: "Harrison 22nd ed. 2025, ch. 186 Antimycobacterial Agents, p. 1422", pdf_page: 1465, quote: "Among the drugs with significant isoniazid interactions are warfarin, carbamazepine" }
    ] },
  { a: ["arv-prophylaxis"], b: ["gentamicin"], severity: "moderate",
    effect: "Tenofovir (TDF) and gentamicin are both nephrotoxic; together they increase the risk of acute kidney injury and tubular damage.",
    action: "Use the shortest gentamicin course, keep the patient hydrated, check creatinine at baseline and during treatment; avoid other nephrotoxins.",
    ref: "BNF interactions (tenofovir–nephrotoxic drugs); tenofovir product information" }
];
