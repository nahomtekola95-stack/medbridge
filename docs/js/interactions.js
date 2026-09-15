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
    ref: "BNF interactions (tenofovir–nephrotoxic drugs); tenofovir product information" },
  /* ---------- Psychiatry ---------- */
  {a: ["haloperidol","chlorpromazine","fluphenazine-decanoate"],b: ["amiodarone"],severity: "major",effect: "Both prolong the QT interval: risk of torsades de pointes and sudden death.",action: "Avoid the combination. If an antipsychotic is essential, prefer olanzapine or a benzodiazepine for agitation, get a baseline ECG, keep potassium and magnesium normal, and avoid IV haloperidol.",ref: "BNF interactions (QT-prolonging drugs); Kaplan 12th ed. 2022, ch. 21.1, pdf pp. 1937, 1967"},
  {a: ["haloperidol","chlorpromazine","fluphenazine-decanoate"],b: ["quinine"],severity: "major",effect: "Additive QT prolongation: risk of torsades de pointes, worse with the hypokalaemia and vomiting common in severe malaria.",action: "Prefer artesunate for severe malaria. For agitation or delirium during quinine treatment use a benzodiazepine or a low dose of olanzapine. If haloperidol is unavoidable: lowest dose, oral or IM (never IV), correct potassium and magnesium, ECG if possible.",ref: "BNF interactions (QT-prolonging drugs); quinine and haloperidol product information"},
  {a: ["haloperidol","chlorpromazine","fluphenazine-decanoate"],b: ["amitriptyline"],severity: "major",effect: "Amitriptyline and first-generation antipsychotics raise each other's blood levels. Anticholinergic, sedative and blood-pressure-lowering effects add up, and both prolong the QT interval.",action: "Use lower doses of both, check pulse and lying and standing blood pressure, and watch for confusion, urinary retention and constipation. Avoid in heart disease or where an ECG cannot be done; consider an SSRI instead of amitriptyline.",ref: "Kaplan 12th ed. 2022, ch. 21.1, pdf pp. 1963, 1967; BNF interactions"},
  {a: ["olanzapine"],b: ["amitriptyline"],severity: "moderate",effect: "Additive sedation, postural hypotension and anticholinergic effects (constipation, urinary retention, confusion); both lower the seizure threshold.",action: "Start low, warn about getting up slowly, and watch bowels, urine and confusion, especially in older people.",ref: "BNF interactions; Kaplan 12th ed. 2022, ch. 21.1, pdf p. 1963 (additive anticholinergic effects)"},
  {a: ["haloperidol","chlorpromazine","fluphenazine-decanoate","olanzapine"],b: ["lithium"],severity: "major",effect: "Commonly combined and usually safe, but there are case reports of encephalopathy, worse movement side effects and neuroleptic malignant syndrome, more likely with higher antipsychotic doses.",action: "Use the lowest effective antipsychotic dose and keep lithium levels in range. Stop both and assess urgently if confusion, coarse tremor, rigidity, fever, unsteadiness or vomiting appear: distinguish lithium toxicity from neuroleptic malignant syndrome.",ref: "Kaplan 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf pp. 2063–2064; BNF interactions"},
  {a: ["olanzapine"],b: ["lorazepam","diazepam","midazolam"],severity: "major",effect: "IM olanzapine with an IM or IV benzodiazepine can cause dangerous hypotension, slow pulse and breathing depression. Deaths have been reported with parenteral olanzapine plus parenteral lorazepam.",action: "Do not give an IM or IV benzodiazepine within 1 hour of IM olanzapine (or IM olanzapine within 1 hour of one). If sedation is still needed, use an oral benzodiazepine or wait and monitor breathing and blood pressure closely. Oral combinations are acceptable with monitoring.",ref: "Olanzapine injection product information; BNF interactions; Kaplan 12th ed. 2022, ch. 21.4, pdf p. 2122"},
  {a: ["lorazepam"],b: ["morphine","phenobarbital","diazepam","midazolam"],severity: "major",effect: "Additive sedation and breathing depression; the most dangerous benzodiazepine interaction. Two benzodiazepines together add up in the same way.",action: "Use the smallest doses, give one sedative at a time and reassess before the next. Count breathing rate and check rousability; have a bag-valve-mask ready. Naloxone reverses the opioid; flumazenil reverses the benzodiazepine but can cause seizures.",ref: "Kaplan 12th ed. 2022, ch. 21.4 Anxiolytics, pdf p. 2122; BNF interactions"},
  {a: ["haloperidol","chlorpromazine","fluphenazine-decanoate"],b: ["lorazepam","diazepam","midazolam"],severity: "moderate",effect: "Often combined on purpose for rapid tranquillisation, but sedation adds up: breathing depression, stupor and low blood pressure can occur.",action: "Give doses one step at a time and reassess after 30–60 minutes. Observe pulse, blood pressure, breathing and consciousness at least hourly, and every 15 minutes if the patient is asleep or has taken alcohol or drugs (NICE NG10).",ref: "Kaplan 12th ed. 2022, ch. 21.1, Table 21-13, pdf p. 1965; NICE NG10"},
  {a: ["haloperidol","chlorpromazine","fluphenazine-decanoate","olanzapine"],b: ["morphine"],severity: "moderate",effect: "Antipsychotics add to the sedation, breathing depression and hypotension caused by opioids, especially in patients with lung disease.",action: "Use lower starting doses of both, avoid IM antipsychotic soon after an opioid dose, and monitor breathing rate and blood pressure.",ref: "Kaplan 12th ed. 2022, ch. 21.1, pdf p. 1967; BNF interactions"},
  {a: ["promethazine"],b: ["morphine","lorazepam","diazepam","midazolam","phenobarbital"],severity: "moderate",effect: "Additive sedation and breathing depression.",action: "Use the lowest dose of promethazine; avoid adding it after a benzodiazepine or opioid unless breathing can be watched closely. Never in children under 2 years.",ref: "Kaplan 12th ed. 2022, ch. 21.10, pdf p. 2218; BNF interactions"},
  {a: ["promethazine"],b: ["amitriptyline","chlorpromazine","olanzapine","haloperidol"],severity: "moderate",effect: "Additive sedation and anticholinergic effects (confusion, urinary retention, constipation, overheating); small additive QT effect with haloperidol.",action: "Use the lowest doses, avoid regular combined use in older people, and watch for confusion and urinary retention.",ref: "Kaplan 12th ed. 2022, ch. 21.10 Drugs Used to Treat the Side Effects of Psychotropic Drugs, pdf p. 2218"},
  {a: ["biperiden"],b: ["amitriptyline","chlorpromazine","olanzapine","promethazine","atropine"],severity: "moderate",effect: "Anticholinergic effects add up: dry mouth, constipation to ileus, urinary retention, blurred vision, fast pulse, overheating, and in severe cases delirium, seizures and coma.",action: "Avoid routine biperiden with strongly anticholinergic drugs. If needed, use the lowest dose for the shortest time; watch bowels, urine, temperature and confusion, especially in older people. Stop anticholinergics if hot dry skin, big pupils or delirium appear.",ref: "Kaplan 12th ed. 2022, ch. 21.10, pdf p. 2213; ch. 21.1, pdf p. 1963"},
  {a: ["chlorpromazine","haloperidol","fluphenazine-decanoate","olanzapine"],b: ["adrenaline"],severity: "moderate",effect: "Antipsychotics block alpha-receptors. If hypotension is caused by the antipsychotic (overdose or high doses), adrenaline's remaining beta effect can make blood pressure fall further.",action: "For hypotension caused by an antipsychotic: lie flat, IV fluids, then noradrenaline (or dopamine), not adrenaline. This does NOT apply to anaphylaxis or cardiac arrest: adrenaline remains the drug of choice there.",ref: "Kaplan 12th ed. 2022, ch. 21.1, pdf pp. 1960, 1963–1964"},
  {a: ["haloperidol","fluphenazine-decanoate","olanzapine","chlorpromazine"],b: ["carbamazepine"],severity: "moderate",effect: "Carbamazepine speeds antipsychotic metabolism: levels can fall by up to half, with relapse of psychosis. Levels rise again when carbamazepine is stopped.",action: "Expect to need a higher antipsychotic dose after 1–2 weeks; watch for relapse. When carbamazepine is stopped, reduce the antipsychotic and watch for sedation and movement side effects. For mania, valproate or lithium may be simpler partners.",ref: "Kaplan 12th ed. 2022, ch. 21.1, pdf pp. 1935, 1964; ch. 21.3, pdf p. 2090"},
  {a: ["haloperidol","chlorpromazine","olanzapine","fluphenazine-decanoate"],b: ["phenobarbital","phenytoin"],severity: "moderate",effect: "Phenobarbital and phenytoin speed antipsychotic metabolism and lower levels. Phenothiazines such as chlorpromazine can also raise phenytoin levels.",action: "Watch for reduced antipsychotic effect and adjust the dose. With chlorpromazine, watch for phenytoin toxicity (unsteadiness, double vision, drowsiness) and check levels if possible. Remember antipsychotics lower the seizure threshold.",ref: "Kaplan 12th ed. 2022, ch. 21.1, pdf pp. 1935, 1964, 1966–1967"},
  {a: ["haloperidol","chlorpromazine","fluphenazine-decanoate"],b: ["fluoxetine"],severity: "moderate",effect: "Fluoxetine blocks CYP2D6 and raises antipsychotic levels; sudden movement side effects (dystonia, parkinsonism, akathisia) can appear.",action: "Use lower antipsychotic doses when fluoxetine is added and watch for stiffness, restlessness and tremor. Fluoxetine's effect lasts weeks after stopping.",ref: "Kaplan 12th ed. 2022, ch. 21.1, pdf pp. 1966–1967"},
  {a: ["haloperidol"],b: ["tb-rhze"],severity: "moderate",effect: "Rifampicin strongly induces liver enzymes and markedly lowers haloperidol levels; psychosis may relapse during TB treatment. Levels rise again when rifampicin stops.",action: "Watch mental state closely after starting TB treatment and increase the haloperidol dose if needed. Reduce it again after rifampicin finishes (watch for stiffness and sedation). Do not stop TB treatment.",ref: "BNF interactions (rifampicin–haloperidol); haloperidol product information"},
  {a: ["lorazepam"],b: ["sodium-valproate"],severity: "moderate",effect: "Valproate reduces lorazepam clearance and raises its levels: more sedation.",action: "Use about half the usual lorazepam dose when the patient takes valproate (US lorazepam product information) and watch sedation and breathing.",ref: "Lorazepam product information; BNF interactions"},
  {a: ["haloperidol","chlorpromazine","olanzapine"],b: ["sodium-valproate"],severity: "moderate",effect: "More sedation and more movement side effects when combined; antipsychotics may raise valproate levels.",action: "Common and useful combination in mania. Start the second drug at a low dose, and watch sedation, tremor and stiffness.",ref: "Kaplan 12th ed. 2022, ch. 21.3, pdf p. 2077; ch. 21.1, Table 21-13, pdf p. 1966"},
  {a: ["chlorpromazine"],b: ["labetalol","hydralazine","nifedipine"],severity: "moderate",effect: "Chlorpromazine blocks alpha-receptors and adds to blood-pressure-lowering drugs: postural hypotension and fainting. Kaplan grades beta-blocker combinations as major.",action: "Prefer haloperidol or olanzapine in a patient on antihypertensives (for example postpartum psychosis after pre-eclampsia). If chlorpromazine is used, start low, avoid IM doses, and check lying and standing blood pressure.",ref: "Kaplan 12th ed. 2022, ch. 21.1, pdf pp. 1963, 1967"},
  {a: ["lithium"],b: ["furosemide"],severity: "moderate",effect: "Loop diuretics usually leave lithium clearance unchanged, but volume and sodium depletion from diuresis can raise lithium levels, and toxicity has been reported (thiazides are much worse).",action: "Avoid unless clearly needed. If used, keep the patient hydrated, check lithium level and creatinine within 1 week (if possible), and watch for tremor, unsteadiness, vomiting or confusion. Never use furosemide to treat lithium toxicity.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, Table 21-30, pdf p. 2065; BNF interactions (lithium–loop diuretics)"},
  {a: ["lithium"],b: ["sodium-bicarbonate","aminophylline","mannitol"],severity: "moderate",effect: "Sodium bicarbonate, xanthines (aminophylline, caffeine) and osmotic diuretics increase renal lithium clearance and lower the lithium level; when they are stopped, the level rises again.",action: "Expect loss of mood control during use; check the lithium level during and a week after stopping where possible, and watch for toxicity when they are withdrawn. Short emergency courses need no change.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, Table 21-30, pdf pp. 2065–2066"},
  {a: ["lithium"],b: ["metronidazole"],severity: "moderate",effect: "Metronidazole can raise lithium levels and cause toxicity (and may impair kidney function).",action: "Prefer an alternative antibiotic where one is suitable; if used, keep courses short, check lithium level and creatinine during treatment where possible, and watch for toxicity signs.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, Table 21-30, pdf p. 2066; BNF interactions"},
  {a: ["lithium"],b: ["nifedipine"],severity: "moderate",effect: "Calcium-channel blockers with lithium have caused neurotoxicity (ataxia, tremor, confusion) without consistent change in lithium levels; most reports involve verapamil and diltiazem.",action: "Use an alternative antihypertensive where possible (in pregnancy, labetalol or hydralazine); if combined, watch closely for neurological symptoms.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, pdf p. 2063 and Table 21-30, p. 2066; BNF interactions (lithium–calcium-channel blockers)"},
  {a: ["lithium"],b: ["carbamazepine"],severity: "moderate",effect: "Neurotoxicity (confusion, ataxia, tremor) has been reported with the combination even with lithium levels in range; both can affect sodium balance.",action: "Combination is used for resistant bipolar disorder but start the second drug low and increase slowly; watch for neurological symptoms and check sodium where possible.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, pdf p. 2063 and Table 21-30, p. 2065"},
  {a: ["lithium"],b: ["fluoxetine"],severity: "moderate",effect: "SSRIs with lithium can cause serotonin syndrome or neurotoxicity; fluoxetine may also change lithium levels.",action: "Combination can be used for resistant depression under supervision: start low, check lithium level after starting fluoxetine if possible, and teach serotonin syndrome warning signs (tremor, sweating, diarrhoea, agitation, fever).",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf pp. 1990–1992"},
  {a: ["carbamazepine"],b: ["arv-prophylaxis"],severity: "major",effect: "Carbamazepine induces metabolism of dolutegravir (and nevirapine and efavirenz), lowering levels enough to risk PEP or treatment failure and resistance.",action: "Avoid: choose valproate (not in women and girls who could become pregnant) or seek HIV specialist advice for seizures or bipolar disorder. If no alternative, dolutegravir product information advises 50 mg twice daily in adults; infant nevirapine prophylaxis needs specialist advice.",ref: "Dolutegravir (Tivicay) summary of product characteristics; BNF interactions (carbamazepine–dolutegravir/nevirapine/efavirenz)"},
  {a: ["carbamazepine"],b: ["tb-rhze"],severity: "major",effect: "Isoniazid inhibits carbamazepine metabolism (toxicity: drowsiness, ataxia, vomiting) and carbamazepine may increase isoniazid liver toxicity; rifampicin speeds carbamazepine metabolism (loss of seizure control). The net effect changes when either drug is started or stopped.",action: "Prefer another antiepileptic during TB treatment if possible. If combined, watch closely for toxicity in the first weeks and for seizures later; check carbamazepine levels and liver tests where available, and review again when TB treatment stops.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, Table 21-39, pdf p. 2091; Harrison 22nd ed. 2025, ch. 186, p. 1422; BNF interactions"},
  {a: ["carbamazepine"],b: ["dexamethasone","hydrocortisone"],severity: "moderate",effect: "Carbamazepine is a potent enzyme inducer and speeds corticosteroid metabolism, reducing their effect (TB meningitis, cerebral oedema, adrenal insufficiency, fetal lung maturation).",action: "Expect to need higher steroid doses and watch for loss of effect; in adrenal insufficiency, seek specialist advice on the replacement dose.",ref: "Harrison 22nd ed. 2025, ch. 95, p. 717; BNF interactions (corticosteroids–carbamazepine)"},
  {a: ["carbamazepine"],b: ["paracetamol"],severity: "moderate",effect: "Carbamazepine lowers paracetamol levels and, like other enzyme inducers, increases formation of the toxic metabolite: less pain relief and liver injury at lower doses, especially in overdose.",action: "Keep to regular doses (adult 3 g/day or less for long courses); in paracetamol overdose treat at a lower threshold.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, Table 21-39, pdf p. 2090; BNF"},
  {a: ["carbamazepine"],b: ["midazolam"],severity: "moderate",effect: "Carbamazepine induces CYP3A4 and markedly lowers midazolam levels, especially oral or buccal midazolam; sedation may be inadequate.",action: "Titrate midazolam to effect; larger or repeated doses may be needed. The effect persists about 2 weeks after carbamazepine stops.",ref: "BNF interactions (carbamazepine–midazolam); midazolam product information"},
  {a: ["carbamazepine"],b: ["aminophylline"],severity: "moderate",effect: "Carbamazepine lowers theophylline levels (loss of bronchodilator effect); theophylline may also lower carbamazepine.",action: "Watch asthma control and seizure control; adjust doses clinically and use levels where available.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, Table 21-39, pdf pp. 2090–2091; BNF interactions"},
  {a: ["carbamazepine"],b: ["nifedipine"],severity: "moderate",effect: "Carbamazepine induces nifedipine metabolism and can make it ineffective for blood pressure control.",action: "Use labetalol, hydralazine or methyldopa, or monitor BP closely and increase the nifedipine dose.",ref: "BNF interactions (carbamazepine–nifedipine); nifedipine product information"},
  {a: ["carbamazepine"],b: ["phenytoin","phenobarbital"],severity: "moderate",effect: "Phenytoin and phenobarbital lower carbamazepine levels; carbamazepine can lower or raise phenytoin. Sedation and ataxia add up.",action: "Avoid combining enzyme-inducing antiepileptics where possible. If combined, change one drug at a time, watch for seizures and for toxicity (nystagmus, ataxia, drowsiness), and use levels where available.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, Table 21-39, pdf p. 2091"},
  {a: ["carbamazepine"],b: ["sodium-valproate"],severity: "moderate",effect: "Carbamazepine lowers valproate levels; valproate raises the active carbamazepine-epoxide and displaces carbamazepine from proteins (toxicity). Hyperammonaemia is more common with the combination.",action: "Reduce the carbamazepine dose and expect to need more valproate (Kaplan). Watch for drowsiness, ataxia, vomiting or confusion (check ammonia if available).",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, pdf pp. 2073, 2077, 2090"},
  {a: ["carbamazepine"],b: ["amitriptyline"],severity: "moderate",effect: "Carbamazepine lowers amitriptyline levels (less antidepressant or pain effect); tricyclics lower the seizure threshold.",action: "Titrate amitriptyline to clinical effect; review seizure control.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf p. 2030; ch. 21.3, Table 21-39, p. 2090"},
  {a: ["carbamazepine"],b: ["fluoxetine"],severity: "moderate",effect: "Fluoxetine slows carbamazepine metabolism and can cause carbamazepine toxicity (dizziness, double vision, ataxia); both can lower sodium.",action: "Watch for toxicity after starting fluoxetine; reduce carbamazepine if symptoms appear. Check sodium in older patients.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf p. 1992"},
  {a: ["carbamazepine"],b: ["adenosine"],severity: "moderate",effect: "Carbamazepine increases the heart-block effect of adenosine.",action: "Start with a lower adenosine dose (adult 3 mg) and have atropine ready.",ref: "Adenosine product information; adenosine entry in this app"},
  {a: ["sodium-valproate"],b: ["phenobarbital"],severity: "major",effect: "Valproate raises phenobarbital levels (sedation, respiratory depression, especially after IV loading); phenobarbital lowers valproate and increases the risk of fatal valproate liver toxicity in young children.",action: "Reduce the phenobarbital maintenance dose and watch conscious level and breathing closely after loading either drug; in children under 3, avoid the combination where possible. Stop valproate if vomiting, lethargy or jaundice appear.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, pdf pp. 2072, 2078; BNF interactions"},
  {a: ["sodium-valproate"],b: ["phenytoin"],severity: "moderate",effect: "Valproate displaces phenytoin from proteins and inhibits its metabolism: total phenytoin levels fall while the active free fraction may rise (toxicity with a 'low' level). Phenytoin lowers valproate.",action: "Judge phenytoin by clinical toxicity (nystagmus, ataxia, drowsiness) rather than total level; adjust both doses slowly.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, Table 21-34, pdf p. 2078; BNF interactions"},
  {a: ["sodium-valproate"],b: ["diazepam"],severity: "moderate",effect: "Valproate displaces diazepam from proteins and raises its level; sedation adds up.",action: "Use the lower end of diazepam doses for maintenance or withdrawal regimens and watch sedation and breathing.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, pdf p. 2077"},
  {a: ["sodium-valproate"],b: ["amitriptyline","fluoxetine"],severity: "moderate",effect: "Valproate raises amitriptyline levels (anticholinergic and cardiac toxicity); amitriptyline and fluoxetine may raise valproate levels (tremor, sedation).",action: "Start the added drug low and increase slowly; watch for sedation, tremor, confusion and, with amitriptyline, pulse irregularity or postural hypotension.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, pdf pp. 2077–2078"},
  {a: ["sodium-valproate"],b: ["tb-rhze"],severity: "moderate",effect: "Isoniazid can raise valproate levels and both are hepatotoxic; rifampicin can lower valproate levels (loss of seizure control).",action: "Watch for drowsiness, vomiting, jaundice or abdominal pain (check liver tests) and for seizures; review doses when TB treatment starts and stops.",ref: "BNF interactions (valproate–isoniazid/rifampicin)"},
  {a: ["sodium-valproate"],b: ["arv-prophylaxis"],severity: "moderate",effect: "Valproate raises zidovudine (AZT) levels, increasing anaemia and neutropenia risk. No clinically important interaction with dolutegravir, tenofovir or lamivudine.",action: "If zidovudine is part of the regimen, check haemoglobin during the course where possible and watch for pallor or infection.",ref: "BNF interactions (valproate–zidovudine); zidovudine product information"},
  {a: ["amitriptyline"],b: ["adrenaline","noradrenaline"],severity: "major",effect: "Tricyclics block noradrenaline reuptake: directly acting sympathomimetics given IV can cause severe hypertension and arrhythmias.",action: "Do not withhold adrenaline in anaphylaxis or cardiac arrest. For infusions, start at the low end and titrate carefully with frequent BP checks. Local anaesthetic with adrenaline in small dental doses is usually acceptable.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf p. 2030; BNF interactions (tricyclics–sympathomimetics)"},
  {a: ["amitriptyline"],b: ["amiodarone","quinine"],severity: "major",effect: "Additive QT prolongation and conduction slowing: risk of ventricular arrhythmias (torsade de pointes).",action: "Avoid the combination where possible — withhold amitriptyline during IV quinine or amiodarone treatment. If unavoidable, ECG before and during treatment, keep potassium and magnesium normal.",ref: "BNF interactions (tricyclics–amiodarone/quinine); Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf pp. 2026, 2029"},
  {a: ["amitriptyline"],b: ["fluoxetine"],severity: "major",effect: "Fluoxetine inhibits CYP2D6 and can raise amitriptyline levels three- to fourfold (anticholinergic toxicity, seizures, arrhythmias); both are serotonergic (serotonin syndrome). The effect lasts weeks after fluoxetine stops.",action: "Avoid where possible. If combined (e.g. low-dose amitriptyline for pain), use the lowest amitriptyline dose (10–25 mg), watch pulse, confusion and serotonin syndrome signs, and remember the interaction for 5 weeks after fluoxetine stops.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf pp. 1992, 2030"},
  {a: ["amitriptyline"],b: ["morphine","diazepam","midazolam","phenobarbital"],severity: "moderate",effect: "Additive sedation and respiratory depression; phenobarbital also lowers amitriptyline levels.",action: "Use lower opioid and benzodiazepine doses, monitor conscious level and breathing (especially older people and at night), and avoid alcohol.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf pp. 2029–2030"},
  {a: ["amitriptyline"],b: ["atropine"],severity: "moderate",effect: "Additive anticholinergic effects: urinary retention, ileus, tachycardia, confusion or delirium, raised eye pressure in narrow-angle glaucoma.",action: "Use the minimum atropine dose needed; monitor pulse, bladder and mental state. Do not withhold atropine for bradycardia or organophosphate poisoning.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf p. 2026; DSM-5-TR Clinical Cases 2023, case 17.2, pdf p. 415"},
  {a: ["fluoxetine"],b: ["phenytoin"],severity: "moderate",effect: "Fluoxetine slows phenytoin metabolism and can cause phenytoin toxicity (nystagmus, ataxia, drowsiness).",action: "Watch for toxicity for several weeks after starting fluoxetine; reduce the phenytoin dose if signs appear and check levels where available.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf p. 1992"},
  {a: ["fluoxetine"],b: ["heparin"],severity: "moderate",effect: "SSRIs impair platelet function; bleeding risk rises with anticoagulants (and with NSAIDs and aspirin).",action: "Watch for bleeding (gums, urine, stools, injection sites) and check platelets where possible; avoid adding NSAIDs.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf p. 1989"}
];
