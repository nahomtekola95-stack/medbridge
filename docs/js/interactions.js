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
  {a: ["fluoxetine"],b: ["heparin"],severity: "moderate",effect: "SSRIs impair platelet function; bleeding risk rises with anticoagulants (and with NSAIDs and aspirin).",action: "Watch for bleeding (gums, urine, stools, injection sites) and check platelets where possible; avoid adding NSAIDs.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf p. 1989"},
  /* ---------- Psychiatry, second batch ---------- */
  {a: ["clozapine"],b: ["carbamazepine"],severity: "major",effect: "Carbamazepine can itself suppress the bone marrow, adding to clozapine's agranulocytosis risk, and it speeds clozapine metabolism so levels fall and psychosis may relapse.",action: "Do not combine (Kaplan lists concurrent marrow-suppressing drugs as a contraindication). For seizures on clozapine use sodium valproate (or lamotrigine) with specialist advice. If a patient on carbamazepine must start clozapine, switch the anticonvulsant first.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf p. 1944; BNF interactions (clozapine–carbamazepine)"},
  {a: ["clozapine"],b: ["chloramphenicol"],severity: "major",effect: "Chloramphenicol can cause bone marrow suppression; together with clozapine the risk of agranulocytosis adds up.",action: "Avoid: choose another antibiotic (for example ceftriaxone for meningitis or typhoid where appropriate). If no alternative, check the blood count before and during the course.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf p. 1944 (avoid other marrow-suppressing drugs); BNF interactions (clozapine–drugs causing agranulocytosis)"},
  {a: ["clozapine"],b: ["phenytoin","phenobarbital"],severity: "moderate",effect: "Enzyme inducers lower clozapine levels (loss of effect, relapse); phenytoin is also listed among drugs associated with marrow suppression.",action: "Avoid phenytoin with clozapine where possible; prefer valproate for seizures. If an inducer is started or stopped, watch mental state, sedation and seizures closely and review the clozapine dose with the prescriber.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf p. 1944; BNF interactions"},
  {a: ["clozapine"],b: ["lorazepam","diazepam","midazolam"],severity: "major",effect: "IM or IV benzodiazepines given to patients on clozapine have been followed by collapse, severe hypotension and respiratory arrest. Benzodiazepines with clozapine have also been reported to cause delirium.",action: "Avoid IM or IV benzodiazepines in patients on clozapine, especially early in titration. If sedation is essential, use a small oral dose and observe breathing, blood pressure and consciousness closely. Always ask whether an agitated patient takes clozapine.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.4 Anxiolytics, pdf p. 2122; clozapine product information (SmPC)"},
  {a: ["clozapine"],b: ["lithium"],severity: "moderate",effect: "Lithium with clozapine may increase the risk of seizures, confusion and movement disorders, and neuroleptic malignant syndrome has been reported.",action: "Use only with specialist supervision and lithium levels. Do not combine in a patient who has had neuroleptic malignant syndrome (Kaplan). Watch for confusion, coarse tremor, jerks, fever and rigidity.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf p. 1944"},
  {a: ["clozapine"],b: ["fluoxetine","sertraline"],severity: "moderate",effect: "SSRIs, especially fluoxetine (and fluvoxamine, not in this app), raise clozapine levels: more sedation, hypotension and seizure risk.",action: "If an antidepressant is needed, start low and watch sedation, pulse and fits; the prescriber may reduce the clozapine dose. Remember fluoxetine's effect lasts weeks after stopping.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf p. 1944; ch. 21.2, pdf p. 1992"},
  {a: ["clozapine"],b: ["risperidone"],severity: "moderate",effect: "Risperidone raises clozapine levels; the combination is sometimes used deliberately for resistant schizophrenia, but side effects (sedation, seizures, hypotension, movement effects) increase.",action: "Specialist decision only. Add risperidone at a low dose and watch sedation, pulse, blood pressure and fits.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf pp. 1929, 1944"},
  {a: ["clozapine"],b: ["amitriptyline","trihexyphenidyl","biperiden","promethazine","chlorpromazine","atropine"],severity: "major",effect: "Anticholinergic effects add to clozapine's gut slowing: severe constipation and paralytic ileus (which has been fatal), urinary retention, delirium and heat intolerance. Tricyclics also lower the seizure threshold.",action: "Avoid regular combination. Treat clozapine drooling with a towel on the pillow rather than routine anticholinergics where possible. If combined, ask about bowels daily, start laxatives early, and stop the anticholinergic at the first sign of abdominal swelling, vomiting or no stool.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf p. 1944; ch. 21.10, pdf p. 2213; Maudsley Prescribing Guidelines 14th ed. 2021 (clozapine-induced gastrointestinal hypomotility)"},
  {a: ["clozapine"],b: ["tb-rhze"],severity: "moderate",effect: "Rifampicin strongly induces clozapine metabolism: levels can fall markedly with relapse of psychosis; levels rise again (toxicity) when rifampicin stops.",action: "Do not stop TB treatment. Watch mental state closely; the prescriber may need to increase clozapine, then reduce it again when rifampicin finishes (watch sedation, hypotension and fits).",ref: "BNF interactions (rifampicin–clozapine); clozapine product information"},
  {a: ["quetiapine"],b: ["carbamazepine","phenytoin"],severity: "major",effect: "These enzyme inducers greatly lower quetiapine levels (Kaplan: phenytoin increases clearance about fivefold), so quetiapine may not work at usual doses; stopping the inducer later raises levels sharply.",action: "Avoid the combination: choose another antipsychotic (for example haloperidol or risperidone, with their own dose review) or another anticonvulsant. If it cannot be avoided, the prescriber titrates quetiapine to effect and reduces it when the inducer stops.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf p. 1937; quetiapine product information (SmPC)"},
  {a: ["quetiapine"],b: ["tb-rhze"],severity: "moderate",effect: "Rifampicin induces CYP3A4 and can lower quetiapine levels a lot, with relapse; levels rise when rifampicin stops.",action: "Do not stop TB treatment. Prefer an antipsychotic less affected (discuss with the prescriber), or watch mental state and adjust; reduce again after TB treatment ends.",ref: "BNF interactions (rifampicin–quetiapine); quetiapine product information"},
  {a: ["quetiapine"],b: ["amiodarone","quinine","methadone"],severity: "major",effect: "Additive QT prolongation: risk of torsades de pointes and sudden death, worse with low potassium or magnesium or a slow pulse.",action: "Avoid combining (Kaplan). Prefer artesunate for severe malaria. If unavoidable, lowest quetiapine dose, correct potassium and magnesium, ECG before and during treatment where possible, and ask about fainting and palpitations.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf p. 1937"},
  {a: ["quetiapine"],b: ["lithium"],severity: "moderate",effect: "More sleepiness when combined; otherwise usually well tolerated and a common combination in bipolar disorder.",action: "Start quetiapine low, give most at night, and warn about drowsiness and driving. Keep lithium levels in range.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3 Mood Stabilizers, pdf p. 2063"},
  {a: ["risperidone","aripiprazole"],b: ["fluoxetine"],severity: "moderate",effect: "Fluoxetine strongly blocks CYP2D6 and raises risperidone and aripiprazole levels: more movement side effects and akathisia; with risperidone, prolactin can rise markedly (breast milk leakage, breast enlargement).",action: "Use lower antipsychotic doses when fluoxetine is added (aripiprazole: about half the dose, product information) and watch for stiffness, restlessness and prolactin symptoms. The effect lasts weeks after fluoxetine stops. Sertraline or escitalopram interact less.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf pp. 1932, 1940; aripiprazole product information"},
  {a: ["risperidone","aripiprazole"],b: ["carbamazepine","phenytoin","tb-rhze"],severity: "moderate",effect: "Carbamazepine, phenytoin and rifampicin induce liver enzymes and lower risperidone and aripiprazole levels, with possible relapse; levels rise again when the inducer stops.",action: "Expect to need a higher dose after 1–2 weeks (aripiprazole: product information advises doubling with strong inducers) and reduce again when the inducer stops. Do not stop TB treatment.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf p. 1940; risperidone and aripiprazole product information; BNF interactions"},
  {a: ["risperidone"],b: ["lithium"],severity: "moderate",effect: "A common and useful combination in mania, but, as with other antipsychotics, rare reports of neurotoxicity, worse movement effects and neuroleptic malignant syndrome.",action: "Use the lowest effective risperidone dose and keep lithium levels in range. Assess urgently if confusion, coarse tremor, rigidity, fever or vomiting appear.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, Table 21-13, pdf p. 1965; BNF interactions"},
  {a: ["risperidone"],b: ["furosemide"],severity: "moderate",effect: "In trials of older people with dementia, risperidone plus furosemide was associated with higher mortality than either drug alone (US product information); dehydration and low blood pressure may contribute.",action: "In older people with dementia avoid the combination where possible; if both are needed, prevent dehydration and watch blood pressure, fluid intake and confusion.",ref: "Risperidone US product information (Warnings: increased mortality in elderly patients with dementia, concomitant furosemide)"},
  {a: ["risperidone","haloperidol-decanoate"],b: ["amiodarone","quinine"],severity: "moderate",effect: "Additive QT prolongation (risperidone modest; haloperidol more marked): risk of torsades de pointes, worse with vomiting, low potassium or magnesium.",action: "Prefer artesunate for severe malaria. Correct potassium and magnesium, avoid further QT drugs, and get an ECG where possible. A depot cannot be withheld once given: think before giving the injection during treatment with these drugs.",ref: "BNF interactions (QT-prolonging drugs); Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf p. 1959"},
  {a: ["haloperidol-decanoate"],b: ["carbamazepine","phenobarbital","phenytoin","tb-rhze"],severity: "moderate",effect: "Enzyme inducers (carbamazepine, phenobarbital, phenytoin, rifampicin) lower haloperidol levels, so the depot may stop working; levels rise again weeks after the inducer stops.",action: "Watch for relapse after an inducer is started; add oral cover or shorten the interval rather than giving a large extra injection. When the inducer stops, watch for stiffness and sedation and reduce the depot. Do not stop TB treatment.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf pp. 1952, 1964; BNF interactions (rifampicin–haloperidol)"},
  {a: ["haloperidol-decanoate"],b: ["lithium"],severity: "major",effect: "Usually safe together, but encephalopathy, worse movement effects and neuroleptic malignant syndrome have been reported; a depot cannot be removed if this happens.",action: "Use the lowest effective depot dose and keep lithium levels in range. Assess urgently for confusion, coarse tremor, rigidity, fever or vomiting, and distinguish lithium toxicity from neuroleptic malignant syndrome.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, pdf pp. 2063–2064; ch. 21.1, Table 21-13, pdf p. 1965"},
  {a: ["haloperidol-decanoate"],b: ["fluoxetine","amitriptyline"],severity: "moderate",effect: "Fluoxetine and amitriptyline inhibit haloperidol metabolism and raise levels: new stiffness, tremor, restlessness or dystonia weeks into combined treatment. Amitriptyline also adds anticholinergic, hypotensive and QT effects.",action: "Warn the patient, watch for movement side effects after adding the antidepressant, and consider a lower depot dose or longer interval. Prefer sertraline or escitalopram to amitriptyline.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.1, pdf pp. 1963, 1966–1967"},
  {a: ["trihexyphenidyl"],b: ["amitriptyline","imipramine","chlorpromazine","olanzapine","promethazine","biperiden","atropine"],severity: "moderate",effect: "Anticholinergic effects add up: dry mouth, constipation to ileus, urinary retention, blurred vision, fast pulse, overheating, and in severe cases delirium, seizures and coma (life-threatening anticholinergic intoxication).",action: "Avoid routine trihexyphenidyl with strongly anticholinergic drugs, and never two anticholinergic antiparkinsonian drugs together. If needed, lowest dose for the shortest time; watch bowels, urine, temperature and confusion, especially in older people. Stop anticholinergics if hot dry skin, big pupils or delirium appear.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.10, pdf p. 2213; ch. 21.1, pdf p. 1963"},
  {a: ["methadone"],b: ["tb-rhze"],severity: "major",effect: "Rifampicin strongly induces the liver enzymes that break down methadone. Levels fall by about half or more, and withdrawal (sweating, yawning, aches, diarrhoea, craving) usually starts within days to 2 weeks, leading to relapse to heroin or leaving TB treatment. When rifampicin stops, levels rise again over about 2 weeks and the increased dose can cause overdose.",action: "Never stop TB treatment. Tell the methadone programme before starting RHZE. Assess for withdrawal every few days and increase the methadone dose in steps (often large increases are needed; splitting into twice-daily doses helps). Plan the dose reduction over the 2 weeks after rifampicin ends, checking for sedation. Confirm with the national MMT and TB guidelines.",ref: "Kaplan 12th ed. 2022, ch. 21.7, pdf p. 2172 (rifampicin induces methadone metabolism and precipitates withdrawal); BNF interactions (rifampicin–methadone); WHO 2009 opioid dependence guideline"},
  {a: ["methadone"],b: ["arv-prophylaxis"],severity: "moderate",effect: "Efavirenz and nevirapine lower methadone levels and can cause withdrawal within 1–2 weeks of starting; methadone raises zidovudine levels (more anaemia and neutropenia). Dolutegravir, tenofovir and lamivudine (TLD) have no clinically important interaction.",action: "Prefer dolutegravir-based regimens. If efavirenz or nevirapine is used, watch for withdrawal and increase methadone as needed, reducing again if the ARV is stopped. With zidovudine, check haemoglobin where possible. Never stop ART or PEP because of methadone.",ref: "Kaplan 12th ed. 2022, ch. 21.7, pdf pp. 2172–2173 (methadone raises zidovudine); BNF interactions (efavirenz, nevirapine–methadone); WHO consolidated HIV guidelines"},
  {a: ["methadone"],b: ["haloperidol","chlorpromazine","fluphenazine-decanoate","haloperidol-decanoate","amiodarone","quinine","amitriptyline","imipramine","quetiapine","escitalopram"],severity: "major",effect: "Methadone prolongs the QT interval. Combined with other QT-prolonging drugs the risk of torsades de pointes and sudden death rises, especially at methadone doses above about 100 mg, with low potassium or magnesium (vomiting, diarrhoea, malnutrition) or heart disease. Tricyclics and sedating antipsychotics also add to breathing depression.",action: "Avoid combinations where an alternative exists (for example artesunate instead of quinine; olanzapine, a benzodiazepine or low-dose alternatives for agitation). If unavoidable: lowest doses, ECG before and after where available, correct potassium and magnesium, ask about fainting and palpitations, and avoid IV haloperidol.",ref: "Kaplan 12th ed. 2022, ch. 21.1, pdf p. 1937 (methadone among QTc-prolonging drugs); ch. 21.7, pdf p. 2172; BNF interactions (QT-prolonging drugs)"},
  {a: ["methadone"],b: ["morphine"],severity: "major",effect: "Additive opioid effects: sedation and breathing depression. Methadone patients are tolerant, so usual morphine doses may not relieve pain, but tolerance is unpredictable, especially early in treatment or after missed doses.",action: "Continue the confirmed methadone dose and add morphine for acute pain, titrated in small steps to effect, with breathing rate and consciousness checked every 15–30 minutes after doses and naloxone ready. Do not use morphine to treat withdrawal in someone whose methadone dose is unconfirmed.",ref: "Kaplan 12th ed. 2022, ch. 21.7, pdf p. 2172 (opioids potentiate CNS depression); WHO 2009 opioid dependence guideline"},
  {a: ["methadone"],b: ["naltrexone"],severity: "major",effect: "Naltrexone displaces methadone from opioid receptors and precipitates severe, prolonged withdrawal (vomiting, diarrhoea, agitation, dehydration), which can last a day or more because naltrexone is long acting.",action: "Never give naltrexone to a patient on methadone. Allow at least 10 days after the last methadone dose, confirm with a naloxone challenge if in doubt, and start naltrexone at a low dose.",ref: "Kaplan 12th ed. 2022, ch. 21.7, pdf pp. 2172, 2180, 2182"},
  {a: ["methadone"],b: ["naloxone"],severity: "moderate",effect: "Naloxone reverses methadone and precipitates acute withdrawal in maintenance patients. Methadone lasts far longer than naloxone, so sedation and breathing depression return after 30–90 minutes.",action: "Only for overdose: ventilate, then give small doses (for example 40–100 mcg IV steps) to restore breathing without full withdrawal. Expect repeated doses or an infusion and observe for at least 24 hours after the last dose (confirm local protocol).",ref: "Kaplan 12th ed. 2022, ch. 4.4, pdf p. 948; ch. 21.7, pdf p. 2172"},
  {a: ["methadone"],b: ["diazepam","lorazepam","midazolam"],severity: "major",effect: "Benzodiazepines with methadone greatly increase sedation and breathing depression; this combination is involved in many methadone deaths, especially in the first 2 weeks of treatment.",action: "Avoid regular combined use. For alcohol withdrawal or agitation in a methadone patient, give small benzodiazepine doses one at a time, check rousability and breathing before each dose, and keep a bag-valve-mask and naloxone ready. Do not increase methadone while the patient is taking benzodiazepines.",ref: "Kaplan 12th ed. 2022, ch. 21.7, pdf pp. 2171–2172; BNF interactions (opioids–benzodiazepines)"},
  {a: ["methadone"],b: ["phenobarbital","phenytoin","carbamazepine"],severity: "major",effect: "These enzyme inducers lower methadone levels and can precipitate withdrawal and relapse; phenobarbital also adds sedation. When the inducer is stopped, methadone levels rise and overdose can follow.",action: "Prefer valproate (not in women and girls who could become pregnant) or another non-inducing antiepileptic where possible. If used, watch for withdrawal over 1–2 weeks and increase methadone; reduce it again when the inducer is stopped.",ref: "Kaplan 12th ed. 2022, ch. 21.7, pdf p. 2172; ch. 21.3, pdf p. 2091 (carbamazepine lowers methadone)"},
  {a: ["methadone"],b: ["fluoxetine"],severity: "moderate",effect: "Fluoxetine inhibits methadone metabolism and can raise methadone levels (sedation, breathing depression, QT effects).",action: "Start fluoxetine at a low dose and watch for sedation, especially in the first 2 weeks; consider a smaller methadone increase schedule. Sertraline or escitalopram have less effect on methadone levels, but escitalopram also affects QT.",ref: "Kaplan 12th ed. 2022, ch. 21.7, pdf p. 2172"},
  {a: ["naltrexone"],b: ["morphine"],severity: "major",effect: "Naltrexone blocks opioid analgesia for about 72 hours after an oral dose. Low doses of morphine do nothing; high doses given to overcome the block can suddenly cause profound breathing depression and coma. Morphine taken within 7–10 days before starting naltrexone leads to precipitated withdrawal.",action: "Use non-opioid analgesia and regional anaesthesia. Stop naltrexone 72 hours before planned surgery. If an opioid is essential, titrate in small IV steps with continuous observation of breathing, a bag-valve-mask and naloxone ready.",ref: "Kaplan 12th ed. 2022, ch. 21.7, pdf pp. 2175, 2181"},
  {a: ["chlordiazepoxide"],b: ["morphine","methadone","phenobarbital","diazepam","lorazepam","midazolam"],severity: "major",effect: "Additive sedation and breathing depression. Chlordiazepoxide is long acting, so the combined effect builds up over days. Two benzodiazepines together add up in the same way.",action: "Use one benzodiazepine at a time for alcohol withdrawal. With opioids (including methadone maintenance) give smaller doses, check rousability and breathing rate before each dose, and hold if drowsy. Keep a bag-valve-mask and naloxone at hand.",ref: "Kaplan 12th ed. 2022, ch. 21.4, pdf p. 2122; ch. 21.7, pdf p. 2172; BNF interactions"},
  {a: ["chlordiazepoxide"],b: ["haloperidol","chlorpromazine","olanzapine","amitriptyline"],severity: "moderate",effect: "Additive sedation, low blood pressure and falls. Antipsychotics and tricyclics also lower the seizure threshold, which matters in alcohol withdrawal.",action: "Give antipsychotics in withdrawal only for hallucinations or agitation that persist despite adequate benzodiazepine, at low doses. Watch sedation, breathing and blood pressure.",ref: "Kaplan 12th ed. 2022, ch. 21.4, pdf p. 2122; ch. 4.2, pdf p. 910"},
  {a: ["chlordiazepoxide"],b: ["tb-rhze"],severity: "moderate",effect: "Isoniazid inhibits chlordiazepoxide metabolism and raises its levels (more sedation); rifampicin speeds its breakdown (less effect). The net effect is unpredictable, and alcohol-dependent patients on TB treatment are also at risk of liver injury.",action: "Use symptom-triggered dosing and hold doses when drowsy. Lorazepam is less affected. Watch for jaundice. Do not stop TB treatment.",ref: "Kaplan 12th ed. 2022, ch. 21.4, pdf p. 2122 (isoniazid raises chlordiazepoxide levels); BNF interactions"},
  {a: ["propranolol"],b: ["salbutamol"],severity: "major",effect: "Propranolol blocks beta-2 receptors: it can trigger severe or fatal bronchospasm in asthma or COPD and stops salbutamol from working. The need for salbutamol means the patient has airway disease.",action: "Do not give propranolol to anyone who uses salbutamol or has asthma or wheeze. For akathisia use a benzodiazepine; for tremor or anxiety use non-drug measures or other drugs. If bronchospasm occurs on propranolol: stop it, give high-dose nebulised salbutamol with ipratropium and oxygen, and get senior help.",ref: "Kaplan 12th ed. 2022, ch. 21.4, pdf pp. 2130–2131 (contraindicated in asthma); BNF interactions (beta-blockers–beta-agonists)"},
  {a: ["propranolol"],b: ["aminophylline"],severity: "moderate",effect: "Propranolol raises theophylline levels (Kaplan) and opposes its bronchodilator effect; the need for aminophylline signals airway disease in which propranolol is dangerous.",action: "Avoid the combination. If a patient on propranolol needs aminophylline, stop propranolol and seek senior advice; watch for theophylline toxicity (vomiting, fast pulse, seizures).",ref: "Kaplan 12th ed. 2022, ch. 21.4, pdf p. 2132; BNF interactions"},
  {a: ["propranolol"],b: ["adrenaline"],severity: "major",effect: "With beta receptors blocked, adrenaline acts mainly on alpha receptors: severe hypertension with reflex slow pulse. Anaphylaxis in patients on propranolol is often more severe and resistant to adrenaline.",action: "Anaphylaxis or cardiac arrest: still give adrenaline at the standard dose; repeat as needed and give fluids. Watch blood pressure and pulse. If resistant, glucagon (where stocked, specialist dosing) can help. Avoid adrenaline-containing local anaesthetic in large amounts.",ref: "BNF interactions (beta-blockers–adrenaline); Resuscitation Council UK anaphylaxis guidance"},
  {a: ["propranolol"],b: ["insulin-soluble"],severity: "moderate",effect: "Propranolol hides the warning signs of hypoglycaemia (fast pulse, tremor, anxiety) and slows recovery from it; sweating is still present. Kaplan lists insulin-treated diabetes as a contraindication.",action: "Avoid propranolol for psychiatric indications in insulin-treated diabetes where possible. If used, teach the patient that sweating, confusion or hunger may be the only signs, check glucose more often, and keep glucose at hand.",ref: "Kaplan 12th ed. 2022, ch. 21.4, pdf pp. 2130–2131; BNF interactions"},
  {a: ["propranolol"],b: ["haloperidol","chlorpromazine","fluphenazine-decanoate","olanzapine"],severity: "moderate",effect: "Propranolol and antipsychotics raise each other's blood levels, and their blood-pressure-lowering effects add up (worse with chlorpromazine): dizziness, falls and fainting.",action: "This combination is used on purpose for akathisia: start propranolol at 10 mg two or three times daily, check pulse and blood pressure (lying and standing where possible), and watch for more sedation or movement side effects.",ref: "Kaplan 12th ed. 2022, ch. 21.1, pdf pp. 1964, 1967; ch. 21.4, pdf p. 2132"},
  {a: ["propranolol"],b: ["amiodarone","digoxin"],severity: "major",effect: "Additive slowing of the heart and AV conduction: severe bradycardia, heart block and low blood pressure.",action: "Avoid propranolol for psychiatric indications in patients on amiodarone or digoxin. If essential, use only with pulse checks before each dose and an ECG where available; withhold if pulse is below 50.",ref: "BNF interactions (beta-blockers–amiodarone, digoxin); Kaplan 12th ed. 2022, ch. 21.4, pdf p. 2130 (AV block)"},
  {a: ["propranolol"],b: ["nifedipine","labetalol","hydralazine"],severity: "moderate",effect: "Additive blood-pressure lowering; labetalol is itself a beta-blocker, so the two duplicate beta-blockade (slow pulse, heart failure, bronchospasm). Kaplan notes reduced heart contractility and conduction with calcium-channel blockers.",action: "Do not combine propranolol with labetalol. With nifedipine or hydralazine, start low and check pulse and lying and standing blood pressure; in pregnancy discuss with the obstetric team.",ref: "Kaplan 12th ed. 2022, ch. 21.4, pdf p. 2132; BNF interactions"},
  {a: ["propranolol"],b: ["phenobarbital","phenytoin"],severity: "moderate",effect: "Phenobarbital and phenytoin speed propranolol breakdown and reduce its effect (as does smoking).",action: "Expect to need a higher propranolol dose; titrate by response with pulse checks, and reduce if the inducer is stopped.",ref: "Kaplan 12th ed. 2022, ch. 21.4, pdf p. 2132"},
  {a: ["propranolol"],b: ["chlordiazepoxide"],severity: "moderate",effect: "In alcohol withdrawal propranolol hides tremor and fast pulse, the signs used to dose chlordiazepoxide (CIWA-Ar), so withdrawal can be under-treated; it does not prevent seizures or delirium (Kaplan).",action: "Use propranolol only as an adjunct once benzodiazepine dosing is adequate; rely more on sweating, agitation, hallucinations and orientation when scoring.",ref: "Kaplan 12th ed. 2022, ch. 4.2, pdf p. 909; ch. 21.4, pdf p. 2129"},
  {a: ["bromocriptine"],b: ["haloperidol","chlorpromazine","fluphenazine-decanoate","olanzapine","haloperidol-decanoate","risperidone"],severity: "major",effect: "Opposing effects on dopamine receptors: antipsychotics block bromocriptine's effect (prolactin rises again), and bromocriptine can reduce antipsychotic effect and bring back psychosis.",action: "In NMS the antipsychotic must be stopped anyway. For hyperprolactinaemia prefer lowering or changing the antipsychotic; if bromocriptine is added, use the lowest dose and watch mental state closely with the family.",ref: "Kaplan 12th ed. 2022, ch. 21.1, Table 21-13, pdf p. 1966; ch. 21.10, pdf pp. 2223–2224"},
  {a: ["bromocriptine"],b: ["ergometrine"],severity: "major",effect: "Two ergot-type vasoconstrictors: severe hypertension, stroke and heart attack have been reported (Kaplan).",action: "Do not combine. For postpartum haemorrhage in a woman taking bromocriptine, use oxytocin or misoprostol instead of ergometrine.",ref: "Kaplan 12th ed. 2022, ch. 21.10, pdf p. 2224; BNF interactions"},
  {a: ["bromocriptine"],b: ["amitriptyline","imipramine"],severity: "moderate",effect: "Neurotoxicity (rigidity, agitation, tremor) has been reported with tricyclics and dopamine agonists (Kaplan).",action: "Avoid if possible; if combined, watch for agitation, tremor and stiffness and reduce or stop one drug.",ref: "Kaplan 12th ed. 2022, ch. 21.10, pdf p. 2224"},
  {a: ["bromocriptine"],b: ["nifedipine","hydralazine","labetalol","furosemide"],severity: "moderate",effect: "Bromocriptine adds to the blood-pressure-lowering effect of antihypertensives and diuretics, especially in the first days (fainting, falls).",action: "Start bromocriptine at a low dose at bedtime, with food; check lying and standing blood pressure after the first doses and adjust the antihypertensive.",ref: "Kaplan 12th ed. 2022, ch. 21.10, pdf pp. 2223–2224"},
  {a: ["cyproheptadine"],b: ["fluoxetine","sertraline","escitalopram"],severity: "moderate",effect: "Cyproheptadine blocks serotonin receptors and can reduce or reverse the antidepressant effect of SSRIs when taken regularly (for sexual side effects or appetite); depression may return.",action: "In serotonin syndrome the SSRI is stopped anyway. For SSRI sexual side effects use cyproheptadine only occasionally, and watch mood; if depression returns, stop cyproheptadine.",ref: "Kaplan 12th ed. 2022, ch. 21.10, pdf pp. 2216–2217, 2220; BNF interactions"},
  {a: ["cyproheptadine"],b: ["lorazepam","diazepam","midazolam","chlordiazepoxide","morphine","methadone"],severity: "moderate",effect: "Additive sedation and breathing depression; antihistamines with opioids can also increase euphoria and misuse (Kaplan).",action: "In serotonin syndrome, give the benzodiazepine first and cyproheptadine by tube, then check consciousness and breathing before each further dose. Avoid regular use in methadone patients.",ref: "Kaplan 12th ed. 2022, ch. 21.10, pdf pp. 2217–2218"},
  {a: ["cyproheptadine"],b: ["biperiden","trihexyphenidyl","amitriptyline","chlorpromazine","olanzapine","promethazine"],severity: "moderate",effect: "Additive anticholinergic effects: dry mouth, constipation, urinary retention, reduced sweating with overheating, confusion and in severe cases delirium (Kaplan: cyproheptadine can cause a central anticholinergic syndrome).",action: "Use the lowest doses for the shortest time; watch urine output, bowels, temperature and confusion, especially in older people. Stop if hot dry skin, big pupils or delirium appear.",ref: "Kaplan 12th ed. 2022, ch. 21.10, pdf p. 2217"},
  {a: ["lamotrigine"],b: ["sodium-valproate"],severity: "major",effect: "Valproate blocks lamotrigine breakdown and doubles or more its level. The risk of serious rash (Stevens–Johnson syndrome, toxic epidermal necrolysis) rises sharply, especially if the usual titration is used. Lamotrigine also lowers valproate levels by about a quarter.",action: "Use the valproate schedule: 25 mg every other day for weeks 1–2, 25 mg daily for weeks 3–4, then increase slowly to a usual maximum of 100 mg/day for bipolar disorder (roughly half the usual dose; epilepsy doses per BNF). If valproate is added to established lamotrigine, reduce lamotrigine (usually by half). If valproate is stopped, lamotrigine levels fall over weeks: increase lamotrigine gradually. Stop lamotrigine at once if any rash appears.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, pdf pp. 2077, 2083, 2085 (Table 21-37); BNF interactions (lamotrigine–valproate)"},
  {a: ["lamotrigine"],b: ["carbamazepine","phenytoin","phenobarbital"],severity: "moderate",effect: "Enzyme inducers lower lamotrigine levels by 40–50 percent: loss of seizure or mood control. When the inducer is stopped, lamotrigine levels rise again and toxicity (dizziness, double vision, unsteadiness) and rash risk increase.",action: "Use the enzyme-inducer schedule (Kaplan: 50 mg/day weeks 1–2, 100 mg/day weeks 3–4, then up to 200–400 mg/day). If the inducer is stopped, reduce lamotrigine gradually over about 2 weeks (usually back towards half) and watch for toxicity. Carbamazepine plus lamotrigine can also add dizziness and double vision.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, pdf pp. 2083, 2085; BNF interactions (lamotrigine–enzyme inducers)"},
  {a: ["lamotrigine"],b: ["tb-rhze"],severity: "moderate",effect: "Rifampicin induces lamotrigine breakdown and lowers its level: seizures or mood relapse during TB treatment, then higher levels and toxicity when rifampicin stops.",action: "During rifampicin treatment use the enzyme-inducer dosing schedule (as with carbamazepine) with specialist advice. Watch for seizures or mood relapse. Plan a gradual lamotrigine dose reduction when the rifampicin phase ends (confirm with local protocol).",ref: "BNF interactions (lamotrigine–rifampicin); lamotrigine product information"},
  {a: ["lamotrigine"],b: ["sertraline"],severity: "moderate",effect: "Sertraline raises lamotrigine levels, less than valproate does (Kaplan); occasional reports of lamotrigine toxicity.",action: "Usually combined safely in bipolar depression. Watch for dizziness, unsteadiness, double vision or sedation after starting sertraline; reduce lamotrigine if they appear.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3, pdf p. 2083"},
  {a: ["lamotrigine"],b: ["lithium"],severity: "moderate",effect: "A common and useful combination, but Kaplan notes lamotrigine (like other anticonvulsants) may raise lithium levels and worsen lithium's neurological side effects (tremor, unsteadiness, confusion).",action: "Start lamotrigine at the normal slow schedule; check a lithium level after the lamotrigine dose is stable where possible, and watch for tremor, unsteadiness, confusion or vomiting.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.3 Mood Stabilizers, lithium, pdf p. 2063"},
  {a: ["sertraline","escitalopram"],b: ["heparin"],severity: "moderate",effect: "SSRIs impair platelet function; bleeding risk rises with anticoagulants (and more with NSAIDs or aspirin: gastric bleeding).",action: "Do not stop a needed anticoagulant. Watch for bleeding (gums, urine, black stools, injection sites, bruising); avoid adding NSAIDs or aspirin, use paracetamol for pain. Older patients: consider stomach protection if an NSAID is unavoidable.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf pp. 1989, 1992"},
  {a: ["escitalopram"],b: ["haloperidol","chlorpromazine","fluphenazine-decanoate","amiodarone","quinine","methadone"],severity: "major",effect: "Escitalopram prolongs the QT interval in a dose-related way; with other QT-prolonging drugs the risk of torsade de pointes and sudden death adds up, especially with low potassium or magnesium (vomiting, diarrhoea, diuretics), heart disease or older age.",action: "Avoid the combination where possible: sertraline has less QT effect and is the better SSRI here. If unavoidable, keep escitalopram at 10 mg or less, ECG before and after starting if any machine is available, correct potassium and magnesium, and ask about palpitations and fainting. During IV quinine or amiodarone, withhold escitalopram.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf pp. 1986–1987; escitalopram product information (contraindicated with QT-prolonging drugs); BNF interactions"},
  {a: ["sertraline","escitalopram"],b: ["fluoxetine"],severity: "major",effect: "Two SSRIs together, or starting another SSRI soon after fluoxetine, can cause serotonin syndrome. Fluoxetine and its active metabolite stay in the body for weeks.",action: "Never combine. Switching from fluoxetine 20 mg: stop fluoxetine and wait 4–7 days, then start sertraline 25–50 mg or escitalopram 5–10 mg (longer wait after higher fluoxetine doses). Switching to fluoxetine from sertraline or escitalopram: a direct switch at equivalent low dose is usually acceptable. Watch for tremor, sweating, diarrhoea and clonus for 2 weeks (confirm with local protocol or Maudsley).",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf pp. 1975, 1990–1991; Maudsley Prescribing Guidelines (antidepressant switching)"},
  {a: ["sertraline"],b: ["escitalopram"],severity: "moderate",effect: "Two SSRIs have no added benefit and increase the risk of serotonin syndrome, bleeding and low sodium.",action: "Do not combine. When one is out of stock, switch directly at an equivalent starting dose (sertraline 50 mg ≈ escitalopram 10 mg): stop one and start the other the next day, and watch for serotonin symptoms and discontinuation symptoms for 1–2 weeks.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf pp. 1978, 1990; Maudsley Prescribing Guidelines (antidepressant switching)"},
  {a: ["sertraline","escitalopram"],b: ["amitriptyline"],severity: "moderate",effect: "Sertraline and escitalopram inhibit tricyclic breakdown (less than fluoxetine) and raise amitriptyline levels; both drugs are serotonergic (serotonin syndrome) and escitalopram adds QT prolongation.",action: "Avoid antidepressant doses of both. Low-dose amitriptyline (10–25 mg) for pain can be continued with monitoring: pulse, confusion, dry mouth, urinary retention and serotonin syndrome signs. When cross-tapering, reduce amitriptyline before starting the SSRI at a low dose.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf pp. 1991, 1993"},
  {a: ["sertraline","escitalopram","imipramine","mirtazapine"],b: ["lithium"],severity: "moderate",effect: "Lithium with SSRIs or other serotonergic antidepressants can cause serotonin syndrome or neurotoxicity (tremor, confusion, unsteadiness), even with lithium levels in range.",action: "The combination is used in resistant depression but only with review. Start the antidepressant at a low dose, keep lithium levels in range, and teach the patient and family to report tremor, jerking, diarrhoea, sweating, fever or confusion at once.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf pp. 1990–1991"},
  {a: ["sertraline","escitalopram"],b: ["carbamazepine"],severity: "moderate",effect: "Carbamazepine induces SSRI metabolism and lowers sertraline and escitalopram levels (loss of effect). Both drugs can cause low sodium, and the risk adds up in older people.",action: "Expect to need a higher SSRI dose; review response after 4–6 weeks. In older people ask about confusion, headache, falls or vomiting and check sodium where possible.",ref: "BNF interactions (carbamazepine–SSRIs); Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf p. 1990 (SSRI hyponatraemia)"},
  {a: ["sertraline"],b: ["tb-rhze"],severity: "moderate",effect: "Rifampicin markedly lowers sertraline levels: depression or anxiety may relapse during TB treatment.",action: "Review mood 2–4 weeks after starting TB treatment and increase sertraline as needed (up to 200 mg). Reduce the dose again gradually after rifampicin stops. Escitalopram is also affected less predictably; fluoxetine is an alternative.",ref: "BNF interactions (rifampicin–sertraline); sertraline product information"},
  {a: ["imipramine"],b: ["fluoxetine","sertraline","escitalopram"],severity: "major",effect: "SSRIs block imipramine breakdown: fluoxetine can raise tricyclic levels three- to fourfold, sertraline and escitalopram less. Risk of anticholinergic toxicity, seizures, arrhythmias and serotonin syndrome. After fluoxetine the effect lasts weeks.",action: "Avoid combining at antidepressant doses. When switching from imipramine to an SSRI, reduce imipramine to 25–50 mg before starting a low SSRI dose, then stop imipramine over 1–2 weeks. Do not start imipramine within 5 weeks of stopping fluoxetine unless at a low dose with pulse and ECG monitoring.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf pp. 1991–1993, 2030"},
  {a: ["imipramine"],b: ["adrenaline","noradrenaline"],severity: "major",effect: "Tricyclics block noradrenaline reuptake: IV sympathomimetics can cause severe hypertension and arrhythmias.",action: "Never withhold adrenaline in anaphylaxis or cardiac arrest. For infusions start at the low end with frequent BP checks. Local anaesthetic with adrenaline in small dental doses is usually acceptable.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf p. 2030; BNF interactions (tricyclics–sympathomimetics)"},
  {a: ["imipramine"],b: ["amiodarone","quinine","haloperidol","chlorpromazine","fluphenazine-decanoate","methadone"],severity: "major",effect: "Additive QT prolongation and conduction slowing: risk of torsade de pointes. Antipsychotics and imipramine also raise each other's levels and add sedation, hypotension and anticholinergic effects.",action: "Avoid where possible; withhold imipramine during IV quinine or amiodarone. If an antipsychotic is essential, use low doses of both, ECG before and during if possible, keep potassium and magnesium normal, check pulse and postural BP.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf p. 2030; BNF interactions (tricyclics–QT-prolonging drugs)"},
  {a: ["imipramine"],b: ["carbamazepine","phenobarbital","phenytoin"],severity: "moderate",effect: "Enzyme inducers lower imipramine levels (less effect); tricyclics lower the seizure threshold and can oppose antiepileptic control.",action: "Use in epilepsy only if needed, at low starting doses with slow increases. Expect a higher imipramine requirement; watch seizure control.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf pp. 2027, 2030"},
  {a: ["imipramine"],b: ["atropine","biperiden","promethazine","trihexyphenidyl"],severity: "moderate",effect: "Additive anticholinergic effects: urinary retention, constipation to ileus, fast pulse, blurred vision, overheating, confusion or delirium (especially older people and children).",action: "Avoid regular combination; review whether the anticholinergic is still needed. Do not withhold atropine for bradycardia or organophosphate poisoning. Watch bladder, bowels, pulse and mental state.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf p. 2025; BNF interactions"},
  {a: ["imipramine"],b: ["morphine","diazepam","lorazepam","midazolam"],severity: "moderate",effect: "Additive sedation, breathing depression and postural hypotension.",action: "Use lower opioid and benzodiazepine doses, monitor conscious level and breathing (especially at night and in older people), and avoid alcohol.",ref: "BNF interactions (tricyclics–CNS depressants)"},
  {a: ["mirtazapine"],b: ["lorazepam","diazepam","midazolam","chlordiazepoxide","morphine","promethazine"],severity: "moderate",effect: "Mirtazapine adds to the sedation of benzodiazepines, opioids, sedating antihistamines and alcohol: drowsiness, falls, slowed breathing in vulnerable patients.",action: "Give mirtazapine at night at the lowest dose; avoid daytime sedatives where possible; warn about driving, alcohol and getting up at night. Monitor breathing when combined with opioids or benzodiazepines in older or medically ill patients.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf pp. 2012–2014"},
  {a: ["mirtazapine"],b: ["fluoxetine","sertraline","escitalopram","amitriptyline","imipramine"],severity: "moderate",effect: "No important effect on each other's levels, and mirtazapine is sometimes added to an SSRI on purpose, but serotonin syndrome has been reported with the combination; tricyclics add sedation and weight gain.",action: "Combine only as a planned augmentation or cross-taper. Start mirtazapine 15 mg at night and warn about tremor, sweating, diarrhoea, jerking or fever. When switching, mirtazapine can usually be started while the SSRI is reduced over 1–2 weeks (confirm with Maudsley or local protocol).",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.2, pdf p. 2012; BNF interactions (mirtazapine–SSRIs)"},
  {a: ["mirtazapine"],b: ["carbamazepine","phenytoin","tb-rhze"],severity: "moderate",effect: "Carbamazepine, phenytoin and rifampicin induce mirtazapine metabolism and roughly halve its levels: less antidepressant effect.",action: "Review response after 3–4 weeks and increase mirtazapine if needed (maximum 45 mg). Reduce again when the inducer stops.",ref: "Mirtazapine product information (enzyme inducers); BNF interactions"},
  {a: ["methylphenidate"],b: ["haloperidol","chlorpromazine","olanzapine","fluphenazine-decanoate"],severity: "moderate",effect: "Opposite actions on dopamine: antipsychotics can blunt the benefit of methylphenidate, and methylphenidate can worsen psychosis or mania and movement disorders.",action: "Do not use methylphenidate during active psychosis or mania. If an antipsychotic is started for psychotic symptoms in a child on methylphenidate, stop methylphenidate and review the diagnosis (stimulant misuse or toxicity can cause psychosis).",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.6, pdf p. 2158; BNF interactions (methylphenidate–antipsychotics)"},
  {a: ["methylphenidate"],b: ["imipramine","amitriptyline"],severity: "moderate",effect: "Methylphenidate slows tricyclic metabolism and raises tricyclic levels; fast pulse, raised BP and seizure threshold effects add up.",action: "Use lower tricyclic doses and increase slowly; check pulse and BP at each visit. Avoid in children with heart disease.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.6, pdf p. 2159"},
  {a: ["methylphenidate"],b: ["phenytoin","phenobarbital"],severity: "moderate",effect: "Methylphenidate may slow phenytoin and phenobarbital metabolism and raise their levels (drowsiness, unsteadiness, nystagmus).",action: "Watch for antiepileptic toxicity after starting or increasing methylphenidate; check levels where available. Methylphenidate can be used in controlled epilepsy with review of seizure frequency.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.6, pdf pp. 2158–2159"},
  {a: ["methylphenidate"],b: ["labetalol","nifedipine","hydralazine"],severity: "moderate",effect: "Methylphenidate raises BP and pulse and reduces the effect of blood-pressure-lowering drugs.",action: "Avoid methylphenidate in uncontrolled hypertension. If combined, check BP at every visit and after each dose increase.",ref: "Kaplan & Sadock 12th ed. 2022, ch. 21.6, pdf pp. 2156, 2159"},
  {a: ["methylphenidate"],b: ["adrenaline","noradrenaline"],severity: "moderate",effect: "Additive sympathomimetic effects: sharp rises in BP and heart rate, arrhythmias.",action: "Do not withhold adrenaline in anaphylaxis or arrest. For infusions or anaesthesia, start low with frequent BP checks; many anaesthetists omit methylphenidate on the day of surgery.",ref: "BNF interactions (methylphenidate–sympathomimetics); Kaplan & Sadock 12th ed. 2022, ch. 21.6, pdf p. 2156"},

  /* ---- antileishmanial drugs ---- */
  {
    a: ["liposomal-amphotericin-b", "amphotericin-b-deoxycholate"],
    b: ["furosemide", "hydrocortisone", "dexamethasone"],
    severity: "major",
    effect: "Amphotericin B itself wastes potassium and magnesium in the urine. Furosemide and corticosteroids do the same, and together they produce a profound hypokalaemia — weakness, ileus, and ventricular arrhythmia — on top of the falling magnesium and calcium that amphotericin already causes.",
    action: "Avoid the combination where you can. If furosemide or a steroid is genuinely needed, give oral potassium routinely through the amphotericin course and check potassium and magnesium at least twice weekly; replace magnesium as well, because potassium will not correct while magnesium is low. Without a laboratory, look for new weakness, cramps, a silent distended abdomen and an irregular pulse.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.1, pdf p. 60; Annex 3, pdf p. 85",
    refs: [
      {
        book: "whovl",
        text: "Corticosteroids, corticotropin and other hypokalaemic drugs given with amphotericin B potentiate hypokalaemia; potassium and cardiac function should be closely monitored.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.1 Liposomal amphotericin B, pdf p. 60",
        pdf_page: 60,
        quote: "Concurrent use of corticosteroids, corticotropin and digitalis may potentiate hypokalaemia and digitalis toxicity"
      },
      {
        book: "whovl",
        text: "High blood sugar, low potassium, low magnesium, low calcium and low sodium are very common blood findings on liposomal amphotericin B.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 85",
        pdf_page: 85,
        quote: "High blood sugar, low potassium, low magnesium, low calcium"
      }
    ]
  },
  {
    a: ["liposomal-amphotericin-b", "amphotericin-b-deoxycholate"],
    b: ["digoxin"],
    severity: "major",
    effect: "Amphotericin-induced hypokalaemia makes digoxin toxic at an ordinary dose: bradycardia, heart block, ventricular ectopics and vomiting, often with a digoxin level that looks 'normal'.",
    action: "Check potassium before starting amphotericin and at least twice weekly during the course; keep it at 4.0–5.0 mmol/L. Replace potassium (and magnesium) actively. Watch pulse rate and rhythm before every infusion and ask about nausea, vomiting and visual symptoms. Get an ECG where one exists. Consider withholding digoxin for the course if rate control allows.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.1, pdf p. 60; BNF interactions",
    refs: [
      {
        book: "whovl",
        text: "Concurrent digitalis with amphotericin B may potentiate hypokalaemia and digitalis toxicity, predisposing to cardiac dysfunction; potassium and cardiac function should be closely monitored.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.1 Liposomal amphotericin B, pdf p. 60",
        pdf_page: 60,
        quote: "Concurrent use of corticosteroids, corticotropin and digitalis may potentiate hypokalaemia and digitalis toxicity"
      }
    ]
  },
  {
    a: ["liposomal-amphotericin-b", "amphotericin-b-deoxycholate"],
    b: ["gentamicin", "paromomycin"],
    severity: "major",
    effect: "Additive kidney injury. Amphotericin B and the aminoglycosides damage the renal tubule by different routes, and the patient with VL is usually already febrile, wasted and dehydrated — the exact setting in which acute kidney injury happens. Paromomycin adds ototoxicity to gentamicin's ototoxicity as well.",
    action: "Do not run them together unless there is no alternative. If both are unavoidable, keep the patient well hydrated, measure creatinine before starting and at least twice weekly, keep a fluid balance chart, and dipstick the urine for protein. For the aminoglycoside, lengthen the interval rather than cutting the dose, on pharmacist advice. Stop and reassess for falling urine output, new protein in the urine, tinnitus, muffled hearing or vertigo.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.1, pdf p. 60; Annex 3, pdf pp. 84–85",
    refs: [
      {
        book: "whovl",
        text: "Concurrent use of amphotericin B with other nephrotoxic medicines may enhance drug-induced renal toxicity, and intensive monitoring of renal function is recommended.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.1 Liposomal amphotericin B, pdf p. 60",
        pdf_page: 60,
        quote: "Concurrent use of amphotericin B and other nephrotoxic medications may enhance potential drug-induced renal toxicity."
      },
      {
        book: "whovl",
        text: "Ototoxicity, conductive deafness and proteinuria are recognised adverse effects of paromomycin.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 84",
        pdf_page: 84,
        quote: "Injection site swelling, abscess, ototoxicity, conductive deafness, proteinuria"
      }
    ]
  },
  {
    a: ["paromomycin"],
    b: ["gentamicin"],
    severity: "major",
    effect: "Two aminoglycosides at once: the nephrotoxicity and the ototoxicity add up, and aminoglycoside hearing loss is often permanent. Neuromuscular blockade is also additive.",
    action: "Do not give both. Ask whether the gentamicin can be replaced — ceftriaxone usually covers the same indication in a VL patient with suspected sepsis. If both are truly unavoidable, this is a senior and pharmacist decision: hydrate, check creatinine and urine protein, and do a whispered-voice hearing test before starting and weekly.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3, pdf p. 84; BNF interactions (aminoglycosides)",
    refs: [
      {
        book: "whovl",
        text: "Paromomycin causes injection-site abscess, ototoxicity, conductive deafness and proteinuria; a reversible abnormal audiogram is common.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 84",
        pdf_page: 84,
        quote: "Pyrexia, reversible abnormal audiogram"
      }
    ]
  },
  {
    a: ["liposomal-amphotericin-b", "amphotericin-b-deoxycholate"],
    b: ["magnesium-sulfate"],
    severity: "moderate",
    effect: "Hypokalaemia caused by amphotericin B prolongs and deepens neuromuscular blockade, and magnesium blocks neuromuscular transmission in its own right. Together they can produce profound weakness and inadequate breathing, and the same applies to any muscle relaxant given in theatre during an amphotericin course.",
    action: "Check knee reflexes, respiratory rate and the ability to lift the head off the pillow before every magnesium dose in a patient on amphotericin B, and keep calcium gluconate 1 g at the bedside. Correct potassium and magnesium before any elective procedure, and tell the anaesthetist the patient is on amphotericin B — hypokalaemia prolongs the effect of muscle relaxants.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.1, pdf p. 60",
    refs: [
      {
        book: "whovl",
        text: "Amphotericin B-induced hypokalaemia may enhance the curariform effect of skeletal muscle relaxants; potassium should be closely monitored when they are given together.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.1 Liposomal amphotericin B, pdf p. 60",
        pdf_page: 60,
        quote: "Amphotericin B-induced hypokalaemia may enhance the curariform effect of skeletal muscle relaxants"
      }
    ]
  },
  {
    a: ["liposomal-amphotericin-b", "amphotericin-b-deoxycholate"],
    b: ["arv-prophylaxis"],
    severity: "moderate",
    effect: "There is no pharmacokinetic interaction — amphotericin B is neither a substrate nor an inhibitor of cytochrome P450, and exposure to it was the same in Ethiopian patients on and off ART. The problem is additive organ toxicity: tenofovir and amphotericin B are both nephrotoxic, and zidovudine with amphotericin B causes additive marrow suppression (anaemia and neutropenia).",
    action: "Do not delay ART for this — WHO wants it started within 2 weeks of starting VL treatment. Instead monitor: creatinine before and during the amphotericin course if the regimen contains tenofovir, and haemoglobin and white cells if it contains zidovudine. Choose the ART regimen from the national HIV guideline (dolutegravir-based first line avoids both problems). Report suspected reactions to the national pharmacovigilance centre.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.3, pdf pp. 60–61",
    refs: [
      {
        book: "whovl",
        text: "Although there may be no clinically relevant pharmacokinetic interaction, both tenofovir and amphotericin B can be nephrotoxic.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.3 L-AMB, miltefosine and ART, pdf p. 61",
        pdf_page: 61,
        quote: "both tenofovir and amphotericin B can be nephrotoxic"
      },
      {
        book: "whovl",
        text: "Zidovudine with amphotericin B may cause additive myelosuppression; close monitoring of haematological function is recommended.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.3 L-AMB, miltefosine and ART, pdf p. 61",
        pdf_page: 61,
        quote: "the combination of zidovudine and amphotericin B may result in additive myelosuppression"
      },
      {
        book: "whovl",
        text: "Exposure to amphotericin B on day 1 was similar in patients taking and not taking ART, and no interaction was expected with the antiretrovirals used.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.3 L-AMB, miltefosine and ART, pdf p. 61",
        pdf_page: 61,
        quote: "Exposure to amphotericin B on day 1 was similar in patients taking and not taking ART"
      }
    ]
  },
  {
    a: ["sodium-stibogluconate"],
    b: [
      "amiodarone",
      "quinine",
      "haloperidol",
      "haloperidol-decanoate",
      "chlorpromazine",
      "fluphenazine-decanoate",
      "methadone",
      "quetiapine",
      "escitalopram",
      "amitriptyline",
      "imipramine"
    ],
    severity: "major",
    effect: "Sodium stibogluconate prolongs the QT interval and flattens or inverts T waves in its own right, and fatal arrhythmia is a recognised adverse effect. Adding any other QT-prolonging drug — an antiarrhythmic, an antimalarial, an antipsychotic, methadone or a tricyclic — multiplies the risk of torsades de pointes. Patients on a 17–30 day antimonial course are exposed every single day.",
    action: "Do not combine. Go through the patient's whole drug list before the first injection, including anything started on another ward. Where the other drug can be stopped or swapped, do that — artesunate instead of quinine, a different antiemetic or antipsychotic. If the combination is unavoidable, that is a senior decision needing an ECG before the first dose and at least weekly, correction of potassium and magnesium, and a 60-second pulse before every dose. Stop the antimonial for syncope, a new irregular pulse or a lengthening QT.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3, pdf p. 86; BNF interactions (QT-prolonging drugs)",
    refs: [
      {
        book: "whovl",
        text: "Fatal cardiac arrhythmia and ECG changes — reduced T-wave amplitude, T-wave inversion and QT prolongation — are listed adverse effects of sodium stibogluconate.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 86",
        pdf_page: 86,
        quote: "Fatal cardiac arrhythmia, changes"
      },
      {
        book: "whovl",
        text: "Antimonials are more toxic in HIV patients and must be monitored carefully for pancreatitis and cardiotoxicity.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.5 Rescue treatment, pdf p. 45",
        pdf_page: 45,
        quote: "As antimonials are more toxic in HIV patients, they must be carefully monitored for pancreatitis and cardiotoxicity."
      }
    ]
  },
  {
    a: ["sodium-stibogluconate"],
    b: ["furosemide", "liposomal-amphotericin-b", "amphotericin-b-deoxycholate"],
    severity: "major",
    effect: "Hypokalaemia and hypomagnesaemia from furosemide or amphotericin B make antimonial cardiotoxicity far more dangerous: a low potassium lengthens the QT further and is the classic setting for torsades de pointes. Sequential courses also stack the cardiac and renal injury.",
    action: "Correct potassium and magnesium before giving an antimonial, and keep potassium at 4.0–5.0 mmol/L through the course. Avoid furosemide during an antimonial course unless it is needed for heart failure. Where a patient has just finished amphotericin B and is moving to rescue antimonial treatment, check potassium, magnesium and creatinine first and allow recovery time. Get an ECG where a machine exists.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3, pdf p. 86 and 5.3.1, pdf p. 60; BNF interactions",
    refs: [
      {
        book: "whovl",
        text: "Sodium stibogluconate very commonly causes ECG changes, including reduced T-wave amplitude, T-wave inversion and QT prolongation, with fatal arrhythmia recognised.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3 Adverse effects, pdf p. 86",
        pdf_page: 86,
        quote: "changes in electrocardiogram, including reduction"
      },
      {
        book: "whovl",
        text: "Drugs that lower potassium potentiate hypokalaemia when given with amphotericin B; potassium and cardiac function should be closely monitored.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.1 Liposomal amphotericin B, pdf p. 60",
        pdf_page: 60,
        quote: "Concurrent use of corticosteroids, corticotropin and digitalis may potentiate hypokalaemia and digitalis toxicity"
      }
    ]
  },
  {
    a: ["miltefosine"],
    b: ["arv-prophylaxis"],
    severity: "moderate",
    effect: "Miltefosine does not induce or inhibit cytochrome P450, so no classical interaction is expected and antiretroviral exposure was unchanged during VL treatment in Ethiopia. But in that same study, patients on efavirenz had significantly lower miltefosine exposure at the end of the first 28-day cycle, and miltefosine exposure was lower in VL–HIV patients than in HIV-negative East African adults. Lower exposure means a higher chance of treatment failure and relapse — the thing that kills these patients.",
    action: "Do not change the ART for this; WHO wants ART started within 2 weeks whatever the CD4 count, and the preferred first line is dolutegravir-based rather than efavirenz-based. Instead, make sure every miltefosine dose is actually taken and absorbed: give it with food, supervise the doses, and treat vomiting rather than accepting it. Be alert to a slow response and use the day-29 test of cure to decide on extended therapy.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.2 and 5.3.3, pdf pp. 60–61",
    refs: [
      {
        book: "whovl",
        text: "Miltefosine does not markedly induce or inhibit human cytochrome P450 enzymes.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.2 Miltefosine, pdf p. 60",
        pdf_page: 60,
        quote: "miltefosine does not markedly induce or inhibit the activity of human cytochrome P450 enzymes"
      },
      {
        book: "whovl",
        text: "Patients treated with efavirenz had significantly lower exposure to miltefosine at the end of the first 28-day cycle.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.3.3 L-AMB, miltefosine and ART, pdf p. 61",
        pdf_page: 61,
        quote: "had significantly lower exposure to miltefosine at the end of the first cycle"
      }
    ]
  },
  {
    a: ["miltefosine"],
    b: ["zinc-ors"],
    severity: "moderate",
    effect: "Not a pharmacological interaction: miltefosine very commonly causes vomiting and diarrhoea, which cause volume depletion and can stop any oral drug taken at the same time — including ART and an oral contraceptive — from being absorbed.",
    action: "Give miltefosine with food, always. Encourage fluid intake to avoid volume depletion, and give ORS when losses are significant. If a woman is relying on an oral contraceptive, add a non-hormonal method or use an implant or injectable for the course and the 5 months afterwards. Record vomiting episodes on the treatment card rather than just noting them, and re-give a dose that was clearly vomited straight back.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.2, pdf p. 59",
    refs: [
      {
        book: "whovl",
        text: "Vomiting and diarrhoea are common on miltefosine, may cause volume depletion, and fluid intake should be encouraged.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.2 Miltefosine — gastrointestinal effects, pdf p. 59",
        pdf_page: 59,
        quote: "Encourage fluid intake to avoid volume depletion."
      },
      {
        book: "whovl",
        text: "Vomiting and diarrhoea during miltefosine therapy may affect the absorption of oral contraceptives and compromise their efficacy; an additional non-hormonal method is advised.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.2 Miltefosine — gastrointestinal effects, pdf p. 59",
        pdf_page: 59,
        quote: "may affect the absorption of oral contraceptives"
      }
    ]
  },
  {
    a: ["miltefosine"],
    b: ["liposomal-amphotericin-b", "amphotericin-b-deoxycholate"],
    severity: "moderate",
    effect: "This is the WHO-recommended combination, not a combination to avoid — but the two drugs share toxicities and they add up. Both raise creatinine; miltefosine causes thrombocytopenia while amphotericin causes anaemia; and the VL itself already causes pancytopenia. The result is a patient whose platelets and haemoglobin fall further and whose creatinine rises during a course you must not abandon.",
    action: "Give the combination — it is the recommended treatment and it cures more patients than L-AMB alone. Monitor rather than withhold: creatinine and potassium once or twice weekly, platelets and haemoglobin where the laboratory can do them. Look for new bruising, petechiae, and bleeding from nose or gums at every review. If creatinine rises, halve the amphotericin dose for a few days rather than stopping the course.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.2 and 5.2, pdf pp. 35, 55, 59",
    refs: [
      {
        book: "whovl",
        text: "Miltefosine causes thrombocytopenia and platelet counts should be monitored during therapy.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.2 Miltefosine — warnings, pdf p. 59",
        pdf_page: 59,
        quote: "Miltefosine causes thrombocytopenia. Platelet counts should be monitored during therapy."
      },
      {
        book: "whovl",
        text: "Creatinine and potassium should be checked once or twice weekly on L-AMB, and the dose halved for a few days if renal function deteriorates.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 5.2.1 Liposomal amphotericin B, pdf p. 55",
        pdf_page: 55,
        quote: "If renal function deteriorates, the dose should be halved for a few days."
      },
      {
        book: "whovl",
        text: "The WHO first choice in East Africa is L-AMB up to a cumulative 30 mg/kg, as 5 mg/kg on days 1, 3, 5, 7, 9 and 11, with miltefosine 100 mg daily for 28 days.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.2 First choice of treatment, pdf p. 35",
        pdf_page: 35,
        quote: "L-AMB (up to a cumulative treatment dose of 30 mg/kg body weight, given as 5 mg/"
      }
    ]
  },
  {
    a: ["paromomycin"],
    b: ["magnesium-sulfate"],
    severity: "moderate",
    effect: "Aminoglycosides and magnesium both impair neuromuscular transmission. Together they can cause profound weakness and inadequate breathing, and the effect is worse in a wasted, hypokalaemic patient.",
    action: "Avoid the combination where possible. If magnesium is needed (eclampsia, severe asthma) while a patient is on paromomycin, check knee reflexes, respiratory rate and the ability to lift the head off the pillow before every magnesium dose, and keep calcium gluconate 1 g at the bedside. Tell the anaesthetist if the patient goes to theatre.",
    ref: "BNF interactions (aminoglycosides–magnesium); WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), Annex 3, pdf p. 84"
  },
  {
    a: ["sodium-stibogluconate"],
    b: ["paromomycin"],
    severity: "moderate",
    effect: "This is the East African first-line combination for VL without HIV, not a combination to avoid. The caution is practical: two daily intramuscular injections for 17 days in a wasted patient, with additive injection-site damage, plus antimonial cardiotoxicity and pancreatitis on one side and aminoglycoside oto- and nephrotoxicity on the other.",
    action: "Give them in DIFFERENT sites on the same day and rotate both on a written four-site chart. Inspect yesterday's sites before injecting. Before every dose: 60-second pulse, and ask about palpitations, dizziness, blackouts, abdominal pain, tinnitus and muffled hearing. Whispered-voice hearing test weekly; urine dipstick for protein twice weekly. This combination is WHO's stated first line for HIV-negative patients in East Africa, and rescue treatment for VL–HIV non-responders.",
    ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 3.3, pdf p. 28 and 4.2.3, pdf p. 36",
    refs: [
      {
        book: "whovl",
        text: "First-line treatment of VL in HIV-negative patients in East Africa is a pentavalent antimonial with paromomycin, given parenterally for 17 days.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 3.3 VL–HIV coinfection in East Africa, pdf p. 28",
        pdf_page: 28,
        quote: "The first-line treatment of VL in HIV-negative patients in East Africa is parenteral"
      },
      {
        book: "whovl",
        text: "Rescue treatment for non-responders in the Ethiopian trial was sodium stibogluconate, alone or with paromomycin.",
        ref: "WHO guideline: visceral leishmaniasis in HIV co-infected patients (2022), 4.2.3 Efficacy and safety data, pdf p. 36",
        pdf_page: 36,
        quote: "sodium stibogluconate plus paromomycin) was given to non-responders"
      }
    ]
  },

  /* ---- ophthalmic drugs ---- */
  {
    a: ["timolol-eye"],
    b: ["salbutamol", "ipratropium", "aminophylline"],
    severity: "major",
    effect: "Timolol is a NON-selective beta-blocker and enough of it is absorbed from the eye to block beta-2 receptors in the airway. It can trigger severe or fatal bronchospasm in asthma or COPD, and it blocks the bronchodilator effect of salbutamol. Fatal asthma attacks have followed the first dose of timolol eye drops. A patient who needs salbutamol, ipratropium or aminophylline has airway disease, which is a contraindication to timolol.",
    action: "Do not start timolol in anyone who has ever had asthma or wheeze. If a patient already on timolol develops wheeze, stop the drops and tell the eye unit the same day — do not simply add salbutamol. Ask the eye unit for pilocarpine, a topical carbonic anhydrase inhibitor, brimonidine or a prostaglandin analogue instead. In an acute attack in a patient on timolol, treat the asthma as usual: higher and repeated salbutamol doses may be needed, and adrenaline is not withheld in life-threatening bronchospasm.",
    ref: "BNF interactions (beta-blockers, topical — beta2 agonists); WHO Model Formulary 2008, timolol eye drops"
  },
  {
    a: ["timolol-eye"],
    b: ["propranolol", "labetalol"],
    severity: "major",
    effect: "Additive beta-blockade. The plasma level from twice-daily timolol drops to both eyes is not trivial — it bypasses first-pass metabolism — so adding an oral or IV beta-blocker can produce marked bradycardia, heart block, hypotension, fatigue and bronchospasm. Labetalol is also non-selective, so the respiratory risk doubles too.",
    action: "Check for eye drops before prescribing any beta-blocker, and write TIMOLOL EYE DROPS in the drug list, not in the eye section, on every referral and drug chart. If both are genuinely needed, use the lowest timolol strength (0.25 %), teach punctal occlusion for 2 minutes after every drop, and check pulse and blood pressure at each visit. A resting pulse under 55, dizziness on standing or new fatigue means review the combination.",
    ref: "BNF interactions (beta-blockers — additive effects); AAO Preferred Practice Pattern: Primary Open-Angle Glaucoma"
  },
  {
    a: ["timolol-eye"],
    b: ["digoxin", "amiodarone"],
    severity: "major",
    effect: "Additive slowing of the heart rate and of AV conduction: severe bradycardia, heart block, syncope and hypotension. The combination is easy to miss because the timolol is not on the drug chart — it is 'the eye drops the eye clinic gave'.",
    action: "Avoid where possible. If unavoidable, count the pulse before starting and at every visit, ask about dizziness, fainting and falls, and get an ECG if one is available. Teach punctal occlusion, use 0.25 %, and reduce to once daily if the pressure allows. Stop the timolol and ask the eye unit for an alternative if the pulse falls below 55 or there is any new heart block.",
    ref: "BNF interactions (beta-blockers with digoxin / amiodarone); Harrison's Principles of Internal Medicine 22nd ed. 2025, ch. 71 Principles of Clinical Pharmacology"
  },
  {
    a: ["timolol-eye"],
    b: ["adrenaline"],
    severity: "major",
    effect: "With beta receptors blocked, adrenaline acts mainly on alpha receptors: severe hypertension with reflex bradycardia. Beta-blockade also blunts the response to adrenaline in anaphylaxis, so the usual dose may not work.",
    action: "NEVER withhold adrenaline in anaphylaxis or cardiac arrest because of eye drops. Give the standard IM dose, expect a poorer response, repeat it, and add IV fluids early. Glucagon 1–2 mg IV is the specific rescue for beta-blocked anaphylaxis where it exists. Outside emergencies, avoid adrenaline-containing local anaesthetic infiltration in large doses in a patient on timolol, and monitor the blood pressure.",
    ref: "BNF interactions (beta-blockers — adrenaline); Resuscitation Council UK. Emergency treatment of anaphylaxis, 2021"
  },
  {
    a: ["timolol-eye"],
    b: ["insulin-soluble"],
    severity: "moderate",
    effect: "Timolol masks the warning signs of hypoglycaemia — the fast pulse, tremor and anxiety that tell a diabetic patient to eat — and slows recovery from it. Sweating is preserved and may be the only remaining clue. Diabetics are exactly the patients who attend eye clinics.",
    action: "Warn the patient and the family that a low sugar may now feel different: sweating, confusion or odd behaviour with no palpitations. Check the glucose rather than relying on symptoms; treat lows promptly. Consider a non-beta-blocker glaucoma drop in a patient with frequent or severe hypoglycaemia, and teach punctal occlusion.",
    ref: "BNF interactions (beta-blockers — insulin and sulfonylureas)"
  },
  {
    a: ["timolol-eye"],
    b: ["nifedipine", "hydralazine"],
    severity: "moderate",
    effect: "Additive lowering of blood pressure, and with rate-limiting calcium-channel blockers additive bradycardia and negative inotropy. Postural dizziness and falls in an elderly glaucoma patient are commonly blamed on age rather than on the drops.",
    action: "Measure lying and standing blood pressure and the pulse at each visit, and ask about dizziness on standing and falls. Use the lowest effective timolol strength with punctal occlusion. Review the antihypertensive dose rather than stopping sight-saving glaucoma treatment.",
    ref: "BNF interactions (beta-blockers with calcium-channel blockers and vasodilators)"
  },
  {
    a: ["acetazolamide"],
    b: ["lithium"],
    severity: "moderate",
    effect: "Acetazolamide alkalinises the urine and increases renal lithium clearance, so the lithium level falls and mood control can be lost during treatment. When the acetazolamide is stopped the level climbs again, and toxicity has been reported at that point.",
    action: "A single emergency dose for acute angle closure needs no change. For any course beyond a day or two: check the lithium level during treatment and again about a week after stopping, where levels are available. Watch for relapse of mania or depression during treatment, and for tremor, unsteadiness, vomiting and confusion after it is stopped. Keep salt and fluid intake steady.",
    ref: "BNF interactions (lithium — acetazolamide); Kaplan & Sadock's Synopsis of Psychiatry 12th ed. 2022, ch. 21.3 Mood Stabilizers"
  },
  {
    a: ["acetazolamide"],
    b: ["sodium-bicarbonate"],
    severity: "moderate",
    effect: "Both alkalinise the urine. Together they markedly raise the risk of calcium phosphate kidney stones, and the bicarbonate partly cancels the metabolic acidosis that acetazolamide relies on for part of its effect. Sodium load may also matter in heart failure.",
    action: "Avoid the combination where possible. If bicarbonate is genuinely needed for another reason, keep the acetazolamide course as short as possible, keep the fluid intake high, and ask about loin pain or blood in the urine. Do not use bicarbonate to 'correct' the acidosis acetazolamide causes — reduce or stop the acetazolamide instead.",
    ref: "BNF interactions (acetazolamide — urinary alkalinisation and renal calculi)"
  },
  {
    a: ["acetazolamide"],
    b: ["furosemide", "dexamethasone", "hydrocortisone"],
    severity: "major",
    effect: "Additive potassium loss. Acetazolamide alone causes hypokalaemia and a metabolic acidosis; add a loop diuretic or a corticosteroid and potassium can fall fast, producing weakness, ileus, cramps and arrhythmias. Steroids plus acetazolamide is a common combination in eye practice (a steroid responder with raised pressure) and the potassium is rarely checked.",
    action: "Check potassium before starting and every few days where a laboratory exists. Where it does not: give potassium-rich food (bananas, oranges, avocado, potatoes, beans) or an oral potassium supplement with any course longer than 2 days, and look for muscle weakness, a distended abdomen with quiet bowel sounds and palpitations. Keep the acetazolamide course short and stop it once definitive treatment is arranged.",
    ref: "BNF interactions (acetazolamide with diuretics and corticosteroids); WHO Model Formulary 2008"
  },
  {
    a: ["acetazolamide"],
    b: ["digoxin"],
    severity: "major",
    effect: "Acetazolamide lowers serum potassium. Hypokalaemia makes digoxin toxicity and arrhythmias much more likely, even when the digoxin level is in range.",
    action: "Check potassium before and during treatment and keep it at 4.0–5.0 mmol/L. Replace potassium early. Watch for nausea, vomiting, visual symptoms, new bradycardia or ectopics. Keep the acetazolamide course as short as the eye allows.",
    ref: "BNF interactions (digoxin — hypokalaemia); Harrison's Principles of Internal Medicine 22nd ed. 2025, ch. 56 Fluid and Electrolyte Disturbances"
  },
  {
    a: ["acetazolamide"],
    b: ["sodium-valproate"],
    severity: "moderate",
    effect: "Both can raise blood ammonia and both cause a metabolic acidosis. Together they have precipitated hyperammonaemic encephalopathy (drowsiness, confusion, vomiting) and severe acidosis, particularly in children and in patients who are already unwell.",
    action: "Avoid the combination in children where possible. If acetazolamide is needed for a sight-threatening pressure rise, give a single dose or the shortest course, watch the level of consciousness and the breathing pattern closely, and stop it if the patient becomes drowsy or starts breathing deeply and fast. Check ammonia and bicarbonate where the laboratory can do them.",
    ref: "BNF interactions (acetazolamide — valproate, topiramate); product information"
  },
  {
    a: ["acetazolamide"],
    b: ["carbamazepine", "phenytoin", "phenobarbital"],
    severity: "moderate",
    effect: "Acetazolamide can raise carbamazepine levels (ataxia, drowsiness, double vision, nausea). With long-term phenytoin or phenobarbital, acetazolamide adds to the risk of osteomalacia, and the combined acidosis load is poorly tolerated.",
    action: "For a single emergency dose, no change. For a longer course, watch for carbamazepine toxicity (unsteadiness, double vision, drowsiness) and check a level if one is available. Keep courses short; if a carbonic anhydrase inhibitor is needed long term in a patient on an enzyme-inducing anticonvulsant, that decision belongs with the eye unit and a physician.",
    ref: "BNF interactions (carbamazepine — acetazolamide)"
  },
  {
    a: ["atropine-eye", "tropicamide"],
    b: [
      "amitriptyline",
      "imipramine",
      "trihexyphenidyl",
      "biperiden",
      "promethazine",
      "chlorpromazine",
      "olanzapine",
      "clozapine",
      "cyproheptadine",
      "atropine",
      "ipratropium"
    ],
    severity: "moderate",
    effect: "Anticholinergic effects add up, and eye drops are never counted in the total. Dry mouth, constipation progressing to ileus, urinary retention (especially in older men), a fast pulse, blurred vision, inability to sweat with overheating in a hot climate, and confusion or frank delirium in the elderly. Systemic anticholinergics also dilate the pupil themselves: in a patient with a shallow anterior chamber, adding a dilating eye drop can tip the eye into ACUTE ANGLE-CLOSURE GLAUCOMA — a painful, vomiting, blinding emergency. Nebulised ipratropium blown into the eyes under a loose mask does the same thing.",
    action: "Before dilating, screen the angle with the oblique torch test (shine a torch across the eye from the temporal side, parallel to the iris; if the nasal half of the iris is in shadow the chamber is shallow — do not dilate, refer). Use the shortest-acting agent you have, dilate one eye at a time where that is enough, and teach punctal occlusion for 2 minutes. Warn the patient and the family to return at once with eye pain, halos around lights, headache or vomiting. In the elderly, ask about urinary retention and confusion at the next visit, and keep the patient out of the sun. Fit a nebuliser mask properly, or use a mouthpiece, in anyone with narrow angles.",
    ref: "BNF interactions (antimuscarinics — additive effects); AAO Preferred Practice Pattern: Primary Angle-Closure Disease"
  },
  {
    a: ["pilocarpine-eye"],
    b: ["atropine-eye", "tropicamide"],
    severity: "major",
    effect: "Directly opposite actions on the same muscle. Pilocarpine is given to constrict the pupil and pull the peripheral iris out of the drainage angle; atropine and tropicamide dilate it and push the iris back into the angle. Giving a dilating drop to an eye being treated for angle closure undoes the treatment and can re-close the angle within minutes.",
    action: "Never give a mydriatic to an eye with acute or suspected angle closure, or to the fellow eye of a patient who has had an attack, until a laser iridotomy has been done. Label the notes and the patient's card. The one exception is malignant (aqueous misdirection) glaucoma, where the treatment is the reverse — atropine, not pilocarpine — and that diagnosis must be made by an ophthalmologist.",
    ref: "AAO Preferred Practice Pattern: Primary Angle-Closure Disease; AAO Basic and Clinical Science Course, Section 10: Glaucoma"
  },
  {
    a: ["prednisolone-eye"],
    b: ["timolol-eye", "pilocarpine-eye", "acetazolamide"],
    severity: "moderate",
    effect: "About one person in three is a steroid responder: topical corticosteroid raises the intraocular pressure, usually within 2–6 weeks and sometimes within days in children. In a patient already on glaucoma treatment, the steroid works directly against it and the rise is silent until the optic nerve is damaged.",
    action: "If a patient on glaucoma treatment needs a steroid drop, say so in the referral and arrange pressure measurement within 2 weeks and then monthly. Use the weakest steroid that controls the inflammation and the shortest course, and taper deliberately rather than stopping abruptly. Where no tonometer exists, record visual acuity in each eye at every visit and ask about halos and eye ache — and refer rather than continuing the steroid blind.",
    ref: "AAO Basic and Clinical Science Course, Section 10: Glaucoma (steroid-induced glaucoma); AAO Preferred Practice Pattern: Primary Open-Angle Glaucoma"
  },
  {
    a: ["prednisolone-eye"],
    b: ["dexamethasone", "hydrocortisone"],
    severity: "moderate",
    effect: "Additive corticosteroid load. Systemic steroids raise intraocular pressure and cause cataract in their own right, and both routes together increase the risk of masking or worsening an eye infection — the reason a hypopyon appearing during steroid treatment means infection until proved otherwise.",
    action: "Where a patient is on systemic steroids for another disease, tell the eye unit, measure the intraocular pressure while both are running, and keep the topical course as short as the eye allows. Never start a topical steroid in a red eye without fluorescein staining and a diagnosis, whatever systemic steroid the patient is already taking.",
    ref: "AAO Basic and Clinical Science Course, Section 9: Uveitis and Ocular Inflammation; BNF — corticosteroids, ocular"
  }
];
