/* ============================================================
   MedBridge interface language (English / Amharic).

   The INTERFACE is translated: navigation, buttons, forms, headings,
   warnings, calculators, tools and messages. CLINICAL CONTENT — drug
   monographs, doses, case steps, textbook references, regimens — stays
   in English on purpose: it is how clinicians in Ethiopia are trained,
   and machine-translated dosing without clinical review is unsafe.

   How it works: after the app renders, text nodes and a few attributes
   whose text exactly matches an interface string are replaced. Anything
   without a translation stays English. Subtrees marked [data-no-i18n]
   (and user-written notes) are never touched.
   ============================================================ */
(function () {
  const KEY = "mb:lang";
  let lang = "en";
  try { lang = JSON.parse(localStorage.getItem(KEY)) === "am" ? "am" : "en"; } catch {}

  /* ---------------- exact interface strings ---------------- */
  const AM = {
    /* shell & navigation */
    "MedBridge home": "የሜድብሪጅ መነሻ",
    "Drugs": "መድኃኒቶች", "Emergency": "ድንገተኛ", "Tools": "መሣሪያዎች", "Local": "አካባቢያዊ", "Network": "ትስስር",
    "Setup": "ማዋቀሪያ", "Admin": "አስተዳዳሪ", "Account": "መለያ", "Sign in": "ግባ", "Sign out": "ውጣ",
    "Calculators": "ማስያዎች", "Techniques": "ቴክኒኮች", "Primary": "ዋና ማውጫ",
    "Online": "መስመር ላይ", "Offline · cached": "ከመስመር ውጭ · የተቀመጠ",
    "Auto": "ራስ-ሰር", "Light": "ብሩህ", "Dark": "ጨለማ",
    "Switch colour theme": "የቀለም ገጽታ ቀይር", "Switch theme": "ገጽታ ቀይር", "Colour theme": "የቀለም ገጽታ",
    "Dismiss notice": "ማሳሰቢያውን ዝጋ",
    "Draft build.": "ረቂቅ ስሪት።",
    "Content is not yet clinically verified. For trained health workers only — always confirm against your national guidelines and formulary.":
      "ይዘቱ ገና በሕክምና ባለሙያዎች አልተረጋገጠም። ለሠለጠኑ የጤና ባለሙያዎች ብቻ — ሁልጊዜ ከብሔራዊ መመሪያዎች እና ከመድኃኒት ዝርዝሩ ጋር ያረጋግጡ።",
    "Patient weight": "የታካሚ ክብደት", "Set weight": "ክብደት ያስገቡ",
    "Patient weight — doses on every page are calculated for this weight": "የታካሚ ክብደት — በሁሉም ገጽ ላይ ያሉ መጠኖች በዚህ ክብደት ይሰላሉ",
    "Set a patient weight to see personalised doses": "ለታካሚው የተሰሉ መጠኖችን ለማየት ክብደት ያስገቡ",

    /* home */
    "Bedside drug reference · works offline": "የአልጋ አጠገብ የመድኃኒት ማጣቀሻ · ያለ ኢንተርኔትም ይሠራል", "drugs": "መድኃኒቶች", "clinical cases": "የሕመም ሁኔታዎች", "no-pump methods": "ያለ ፓምፕ ዘዴዎች",
    "Give it safely, with what you have.": "ባለዎት ነገር፣ በደህንነት ይስጡ።",
    "Hospital medicines with no-pump alternatives, doses by weight and drip-rate maths — offline.":
      "የሆስፒታል መድኃኒቶች ያለ ፓምፕ አማራጮች፣ በክብደት የተሰሉ መጠኖች እና የጠብታ ፍጥነት ስሌት — ያለ ኢንተርኔትም።",
    "Search a drug, a brand or a case…": "መድኃኒት፣ የንግድ ስም ወይም የሕመም ሁኔታ ይፈልጉ…", "Search drugs": "መድኃኒቶችን ፈልግ",
    "Emergencies": "ድንገተኛ ሁኔታዎች", "Group drugs by": "መድኃኒቶችን በዚህ መድብ",
    "By ward": "በክፍል", "By case": "በሕመም ሁኔታ", "By drug class": "በመድኃኒት ዓይነት", "Grouped": "በቡድን", "Most used": "በብዛት የሚጠቀሙት", "A–Z": "ከA–Z", "Arrange drugs": "መድኃኒቶችን አደራጅ", "Jump to letter": "ወደ ፊደል ዝለል",
    "All drugs": "ሁሉም መድኃኒቶች", "All cases": "ሁሉም ሁኔታዎች",
    "Favourites": "ተወዳጆች", "Recent": "በቅርቡ የታዩ", "Drug": "መድኃኒት", "Case": "ሁኔታ",
    "Matching cases": "ተዛማጅ ሁኔታዎች",
    "Each case lists the drugs actually reached for, and what each one is for.": "እያንዳንዱ ሁኔታ በተግባር የሚጠቀሙትን መድኃኒቶች እና የእያንዳንዳቸውን ጥቅም ይዘረዝራል።",
    "No match. Try a condition (e.g. “seizure”) or a brand name.": "ምንም አልተገኘም። የሕመም ስም (ለምሳሌ “seizure”) ወይም የንግድ ስም ይሞክሩ።",
    "No case matches. Try a drug name, or a symptom such as “bleeding”.": "ተዛማጅ ሁኔታ የለም። የመድኃኒት ስም ወይም እንደ “bleeding” ያለ ምልክት ይሞክሩ።",
    "Anaphylaxis": "አናፊላክሲስ", "Cardiac arrest": "የልብ መቆም", "Shock": "ሾክ", "Status epilepticus": "የማያቋርጥ የሚጥል ንቅጥቅጥ",
    "Eclampsia": "ኤክላምፕሲያ", "PPH": "ከወሊድ በኋላ ደም መፍሰስ", "DKA": "DKA", "Hypoglycaemia": "የስኳር መውረድ",
    "Severe malaria": "ከባድ ወባ", "Dehydration": "የሰውነት ፈሳሽ እጥረት", "Hyperkalaemia": "የፖታሲየም መብዛት", "Asthma": "አስም",
    "Preterm labour": "ያለጊዜው ምጥ", "Tetanus": "መንጋጋ ቆልፍ (ቴታነስ)", "Poisoning": "መመረዝ", "Meningitis": "ማጅራት ገትር",
    "Transfusion": "ደም መስጠት", "Local anaesthesia": "የአካባቢ ማደንዘዣ",

    /* vocabularies: categories */
    "Emergency & resuscitation": "ድንገተኛ ሕክምና እና መልሶ ማንቃት", "Obstetric": "የወሊድ እና እርግዝና",
    "Cardiovascular / shock": "ልብ እና ደም ዝውውር / ሾክ", "Endocrine & metabolic": "ሆርሞን እና ሜታቦሊዝም",
    "Fluids & electrolytes": "ፈሳሽ እና ኤሌክትሮላይቶች", "Anti-infectives": "የኢንፌክሽን መድኃኒቶች", "Respiratory": "መተንፈሻ",
    "Seizures & neurology": "የሚጥል ንቅጥቅጥ እና ነርቭ", "Analgesia, sedation & anaesthesia": "የሕመም ማስታገሻ፣ ማረጋጊያ እና ማደንዘዣ",
    "Haematology & bleeding": "ደም እና ደም መፍሰስ", "Nutrition & micronutrients": "ሥነ ምግብ እና ማይክሮ ንጥረ ነገሮች", "Psychiatry & mental health": "የአእምሮ ሕክምና እና ጤና", "Eye & vision": "ዓይንና ዕይታ",
    "Psychiatric ward & mental health": "የአእምሮ ሕክምና ክፍል እና የአእምሮ ጤና", "Inpatient psychiatry, emergency mental health and community follow-up.": "ተኝተው የሚታከሙ የአእምሮ ሕሙማን፣ ድንገተኛ የአእምሮ ጤና እና የማኅበረሰብ ክትትል።",
    /* wards */
    "Emergency / casualty": "ድንገተኛ ክፍል", "Labour & maternity": "የወሊድ ክፍል", "Neonatal unit": "የአራስ ሕፃናት ክፍል",
    "Paediatric ward": "የሕፃናት ክፍል", "Adult medical ward": "የአዋቂዎች የውስጥ ደዌ ክፍል", "Surgery & theatre": "ቀዶ ሕክምና እና ኦፕሬሽን ክፍል",
    "ICU / high dependency": "የጽኑ ሕሙማን ክፍል (ICU)", "Outpatient & health post": "ተመላላሽ ሕክምና እና ጤና ኬላ",
    "Resuscitation, triage and the first hour.": "መልሶ ማንቃት፣ ቅድሚያ መለየት እና የመጀመሪያው ሰዓት።",
    "Delivery room, obstetric theatre and postnatal ward.": "የማዋለጃ ክፍል፣ የወሊድ ኦፕሬሽን ክፍል እና ከወሊድ በኋላ ክፍል።",
    "Newborns and preterm infants. Volumes are small and dilutions matter.": "አራስ እና ያለጊዜው የተወለዱ ሕፃናት። መጠኖች ትንሽ ናቸው፣ አቀላቀልም ወሳኝ ነው።",
    "Children beyond the newborn period.": "ከአራስነት ያለፉ ሕፃናት።",
    "General internal medicine inpatients.": "አጠቃላይ የውስጥ ደዌ ተኝተው የሚታከሙ ታካሚዎች።",
    "Operating theatre, anaesthesia and the surgical ward.": "የኦፕሬሽን ክፍል፣ ማደንዘዣ እና የቀዶ ሕክምና ክፍል።",
    "Sickest patients; where pumps are missed most.": "በጣም የታመሙ ታካሚዎች፤ ፓምፕ በጣም የሚናፈቅበት።",
    "OPD, health centre and community level.": "ተመላላሽ፣ ጤና ጣቢያ እና የማኅበረሰብ ደረጃ።",
    /* case groups */
    "Surgical": "ቀዶ ሕክምና", "Adult medical": "የአዋቂዎች የውስጥ ደዌ", "Paediatric & neonatal": "የሕፃናት እና አራስ",
    /* roles */
    "First line": "የመጀመሪያ ምርጫ", "Give this": "ይህን ይስጡ", "Adjunct": "ተጨማሪ", "Add when indicated": "ሲያስፈልግ ይጨምሩ",
    "Alternative": "አማራጭ", "If the first line is unavailable": "የመጀመሪያው ምርጫ ከሌለ", "Supportive": "ደጋፊ",
    "Supportive care": "ደጋፊ እንክብካቤ", "Avoid": "አይጠቀሙ", "Do not use here": "በዚህ ሁኔታ አይጠቀሙ",
    "— Give this": "— ይህን ይስጡ", "— Add when indicated": "— ሲያስፈልግ ይጨምሩ", "— If the first line is unavailable": "— የመጀመሪያው ምርጫ ከሌለ",
    "— Supportive care": "— ደጋፊ እንክብካቤ", "— Do not use here": "— በዚህ ሁኔታ አይጠቀሙ",
    /* equipment */
    "Access": "መግቢያ መንገድ", "Infusion": "ኢንፍዩዥን", "Supplies": "አቅርቦቶች", "Monitoring": "ክትትል",
    "IV access (cannula)": "የደም ሥር መግቢያ (ካኑላ)", "Intraosseous access": "በአጥንት ውስጥ መግቢያ (IO)",
    "IM injection (syringe + needle)": "የጡንቻ መርፌ (ሲሪንጅ + መርፌ)", "Oral / NG route usable": "በአፍ / በአፍንጫ ቱቦ መስጠት ይቻላል",
    "Rectal route usable": "በፊንጢጣ መስጠት ይቻላል", "Infusion pump": "የኢንፍዩዥን ፓምፕ", "Syringe driver": "ሲሪንጅ ድራይቨር",
    "Standard giving set (10–20 gtt/mL)": "መደበኛ የፈሳሽ መስጫ መስመር (10–20 gtt/mL)",
    "Microdrip / paediatric set (60 gtt/mL)": "ማይክሮድሪፕ / የሕፃናት መስመር (60 gtt/mL)",
    "Burette set (100–150 mL)": "ቡሬት (100–150 mL)", "1 mL (insulin/tuberculin) syringe": "1 mL (የኢንሱሊን/ቱበርኩሊን) ሲሪንጅ",
    "Lidocaine 1–2 % (plain)": "ሊዶኬይን 1–2 % (ያለ አድሬናሊን)", "Glucometer": "የስኳር መለኪያ (ግሉኮሜትር)",
    "ECG / cardiac monitor": "ECG / የልብ መከታተያ", "BP cuff": "የደም ግፊት መለኪያ", "Oxygen supply": "የኦክስጅን አቅርቦት",
    "Nebuliser": "ኔቡላይዘር", "Metered-dose inhaler (MDI)": "የመተንፈሻ መሳቢያ (MDI)",
    "No special equipment": "ልዩ መሣሪያ አያስፈልግም",

    /* drug page */
    "All drugs ": "ሁሉም መድኃኒቶች", "Drug index": "የመድኃኒቶች ማውጫ", "Filter drug index": "ማውጫውን አጣራ", "Filter…": "አጣራ…",
    "Draft — not clinically verified": "ረቂቅ — በሕክምና ባለሙያ ያልተረጋገጠ", "Print": "አትም", "Save": "አስቀምጥ", "Saved": "ተቀምጧል",
    "Add to favourites": "ወደ ተወዳጆች ጨምር", "Remove from favourites": "ከተወዳጆች አስወግድ",
    "Added to favourites.": "ወደ ተወዳጆች ተጨምሯል።", "Removed from favourites.": "ከተወዳጆች ተወግዷል።",
    "Key doses": "ዋና መጠኖች", "Presentation": "የሚገኝበት መልክ", "Antidote / reversal": "ማርከሻ", "Antidote / reversal.": "ማርከሻ።",
    "No pump / improvised": "ያለ ፓምፕ / አማራጭ ዘዴ", "Standard": "መደበኛ", "Safety & paediatrics": "ደህንነት እና ሕፃናት",
    "Textbooks": "መማሪያ መጻሕፍት", "Sources": "ምንጮች", "Indications": "የሚሰጥባቸው ሁኔታዎች",
    "Steps": "ደረጃዎች", "Monitor": "ክትትል", "Cautions": "ጥንቃቄዎች", "Paediatric notes": "ስለ ሕፃናት ማስታወሻ",
    "Review status": "የማረጋገጫ ሁኔታ",
    "Each entry must be checked by a pharmacist or physician against these sources and the national formulary before clinical use. See README for the review workflow.":
      "እያንዳንዱ መረጃ ለሕክምና ከመዋሉ በፊት በፋርማሲስት ወይም በሐኪም ከነዚህ ምንጮች እና ከብሔራዊ የመድኃኒት ዝርዝር ጋር መረጋገጥ አለበት።",
    "Methods needing equipment you have not marked available are dimmed and shown last.": "ያላመለከቱት መሣሪያ የሚያስፈልጋቸው ዘዴዎች ደብዝዘው በመጨረሻ ይታያሉ።",
    "Change setup": "ማዋቀሪያ ቀይር", "Tell the app what equipment you have": "ያለዎትን መሣሪያ ለመተግበሪያው ይንገሩ",
    "and it will order these methods for your setting.": "ዘዴዎቹንም ለእርስዎ ሁኔታ ያስተካክላል።",
    "Used in these cases": "የሚጠቀሙባቸው ሁኔታዎች", "Out of stock? What to use instead": "ከሌለ? በምትኩ ምን ይጠቀሙ",
    "No drug substitute.": "ተተኪ መድኃኒት የለም።",
    "A substitute is only valid for the use shown. Open its page for doses and cautions. Draft.":
      "ተተኪው የሚሠራው ለተጠቀሰው ጥቅም ብቻ ነው። መጠንና ጥንቃቄዎችን ለማየት ገጹን ይክፈቱ። ረቂቅ።",
    "Local practice — Ethiopia": "አካባቢያዊ አሠራር — ኢትዮጵያ", "Stocked as": "የሚገኘው በዚህ መልክ", "National protocol": "ብሔራዊ ፕሮቶኮል",
    "Local technique": "አካባቢያዊ ቴክኒክ", "My facility": "የእኔ ተቋም", "Draft — verify against the national STG.": "ረቂቅ — ከብሔራዊ የሕክምና መመሪያ (STG) ጋር ያረጋግጡ።",
    "Edit local notes": "አካባቢያዊ ማስታወሻዎችን አስተካክል",
    "What the textbooks say": "መማሪያ መጻሕፍቱ ምን ይላሉ", "What the textbooks say.": "መማሪያ መጻሕፍቱ ምን ይላሉ።",
    "Doses and statements are paraphrased with chapter and page. The no-pump methods come from WHO and MSF field guidance; where a textbook is silent on low-resource practice, or differs from it, an editorial note says so.":
      "መጠኖችና መግለጫዎች ከምዕራፍና ከገጽ ጋር በራሳችን አገላለጽ ቀርበዋል። ያለ ፓምፕ ዘዴዎቹ ከWHO እና ከMSF የመስክ መመሪያዎች የተወሰዱ ናቸው፤ መጽሐፉ ዝም ባለበት ወይም በሚለይበት ቦታ ማስታወሻ ተቀምጧል።",
    "Editorial notes": "የአርታዒ ማስታወሻዎች",
    "Dose for your patient": "ለታካሚዎ የሚሆን መጠን", "Set a weight and this card shows the dose and volume to draw up.": "ክብደት ያስገቡ፤ ይህ ካርድ የሚሰጠውን መጠንና የሚቀዳውን መጠን ያሳያል።",
    "Change": "ቀይር", "Check the calculation and the ampoule strength before giving. Draft content.": "ከመስጠትዎ በፊት ስሌቱንና የአምፑሉን ጥንካሬ ያረጋግጡ። ረቂቅ ይዘት።",
    "Change dose": "መጠን ቀይር", "Full Plan C with drop rates": "ሙሉ ፕላን C ከጠብታ ፍጥነት ጋር",
    "Too slow to control by gravity.": "በስበት ኃይል ለመቆጣጠር በጣም ቀርፋፋ ነው።", "Too fast to count.": "ለመቁጠር በጣም ፈጣን ነው።",
    "Below 4 drops/min the rate cannot be held steady. Use a more dilute bag for this child — the paediatric “rule of 6” on this drug page — so the drip runs at a countable rate.":
      "ከ4 ጠብታ/ደቂቃ በታች ፍጥነቱ ቋሚ ሊሆን አይችልም። ለዚህ ሕፃን የበለጠ የተቀጠነ ከረጢት ይጠቀሙ — በዚህ ገጽ ያለውን የሕፃናት “rule of 6” — ጠብታው ሊቆጠር በሚችል ፍጥነት እንዲሄድ።",
    "Use a more concentrated bag or a microdrip set.": "የበለጠ የተከማቸ ከረጢት ወይም ማይክሮድሪፕ ይጠቀሙ።",
    "Clinical content stays in English": "የሕክምና ይዘት በእንግሊዝኛ ነው",

    /* case page */
    "Drugs for this case": "ለዚህ ሁኔታ የሚያስፈልጉ መድኃኒቶች", "Red flags": "የአደጋ ምልክቶች", "What to do, in order": "በቅደም ተከተል የሚደረጉ ነገሮች",
    "Set weight for doses": "ለመጠን ክብደት ያስገቡ", "Emergency card": "የድንገተኛ ካርድ",
    "Draft. This bundle lists which drugs are used and why; each drug page carries the doses, the no-pump methods and its own sources. Verify against your national protocol before use.":
      "ረቂቅ። ይህ ስብስብ የሚጠቀሙትን መድኃኒቶችና ምክንያቱን ይዘረዝራል፤ መጠኖች፣ ያለ ፓምፕ ዘዴዎችና ምንጮች በእያንዳንዱ መድኃኒት ገጽ ላይ አሉ። ከመጠቀምዎ በፊት ከብሔራዊ ፕሮቶኮል ጋር ያረጋግጡ።",

    /* patient dialog */
    "Patient": "ታካሚ", "Weight (kg)": "ክብደት (ኪ.ግ.)", "Age (years, optional)": "ዕድሜ (ዓመት፣ አማራጭ)", "for estimates": "ለግምት",
    "Estimate weight from age": "ከዕድሜ ክብደትን ገምት", "Clear patient": "ታካሚውን አጽዳ", "Cancel": "ሰርዝ", "Use this weight": "ይህን ክብደት ተጠቀም",
    "Doses on drug pages, cases, the emergency card and schedules use this weight. Stored only on this device. Clear it when you move to the next patient.":
      "በመድኃኒት ገጾች፣ በሁኔታዎች፣ በድንገተኛ ካርዱ እና በመርሐ ግብሮች ያሉ መጠኖች ይህን ክብደት ይጠቀማሉ። የሚቀመጠው በዚህ መሣሪያ ላይ ብቻ ነው። ወደ ቀጣዩ ታካሚ ሲሄዱ ያጽዱት።",
    "Enter an age first.": "መጀመሪያ ዕድሜ ያስገቡ።", "No estimate for this age — weigh the patient.": "ለዚህ ዕድሜ ግምት የለም — ታካሚውን ይመዝኑ።",
    "Patient cleared.": "ታካሚው ተጸድቷል።",

    /* emergency card */
    "Emergency drug card": "የድንገተኛ መድኃኒቶች ካርድ",
    "Every resuscitation dose and volume for one weight. Draft — check against your protocol.": "ለአንድ ክብደት ሁሉም የመልሶ ማንቃት መጠኖች። ረቂቅ — ከፕሮቶኮልዎ ጋር ያረጋግጡ።",
    "Every resuscitation dose and volume for one weight. Printable.": "ለአንድ ክብደት ሁሉም የመልሶ ማንቃት መጠኖች። ሊታተም ይችላል።",
    "Age in years (optional)": "ዕድሜ በዓመት (አማራጭ)", "Use as patient weight": "እንደ ታካሚ ክብደት ተጠቀም",
    "Enter a weight to build the card.": "ካርዱን ለማዘጋጀት ክብደት ያስገቡ።",
    "Adult-sized patient.": "የአዋቂ መጠን ያለው ታካሚ።",
    "Doses shown are capped at the listed maxima; check adult doses on each drug page, which can differ from per-kg calculation.":
      "የሚታዩት መጠኖች በተዘረዘረው ከፍተኛ ገደብ ተገድበዋል፤ የአዋቂ መጠኖችን በእያንዳንዱ መድኃኒት ገጽ ላይ ያረጋግጡ፣ ከኪሎ ስሌት ሊለዩ ይችላሉ።",
    "Cardiac arrest & arrhythmia": "የልብ መቆም እና የልብ ምት መዛባት", "Anaphylaxis & airway": "አናፊላክሲስ እና የአየር መንገድ",
    "Seizures": "የሚጥል ንቅጥቅጥ", "Glucose, electrolytes & antidotes": "ግሉኮስ፣ ኤሌክትሮላይቶች እና ማርከሻዎች",
    "Fluids & blood": "ፈሳሽ እና ደም", "First antibiotic dose": "የመጀመሪያ የአንቲባዮቲክ መጠን", "Analgesia & sedation": "የሕመም ማስታገሻ እና ማረጋጊያ",
    "Dose · volume": "መጠን · የሚቀዳ", "Route · strength": "መንገድ · ጥንካሬ", "Repeat · notes": "መደጋገም · ማስታወሻ",
    "Endotracheal tube": "የመተንፈሻ ቱቦ (ETT)", "(APLS age formulas)": "(የAPLS የዕድሜ ቀመሮች)",
    "Draft emergency card. Every dose must be checked against the drug page and the national protocol before use. Weigh the patient whenever possible.":
      "ረቂቅ የድንገተኛ ካርድ። እያንዳንዱ መጠን ከመጠቀምዎ በፊት ከመድኃኒቱ ገጽና ከብሔራዊ ፕሮቶኮል ጋር መረጋገጥ አለበት። በተቻለ መጠን ታካሚውን ይመዝኑ።",

    /* drip guide */
    "Drip guide": "የጠብታ መመሪያ",
    "Set the target rate, then match the drops in the chamber to the pulse and the sound. Use tap-to-measure to check the actual rate.":
      "የሚፈለገውን ፍጥነት ያስገቡ፣ ከዚያም በጠብታ ክፍሉ ያሉትን ጠብታዎች ከምልክቱና ከድምፁ ጋር ያመሳስሉ። ትክክለኛውን ፍጥነት ለማረጋገጥ “መታ አድርገው ይለኩ”ን ይጠቀሙ።",
    "Target drops per minute": "የሚፈለግ ጠብታ በደቂቃ", "Drop factor": "የጠብታ መጠን (drop factor)",
    "Work out the rate from volume and time": "ከመጠንና ከጊዜ ፍጥነቱን አስላ", "Volume (mL)": "መጠን (mL)", "Over (minutes)": "በ(ደቂቃ)",
    "Set a rate": "ፍጥነት ያስገቡ", "Start": "ጀምር", "Stop": "አቁም", "Sound": "ድምፅ", "Vibrate": "ንዝረት",
    "Check the actual rate": "ትክክለኛውን ፍጥነት ያረጋግጡ",
    "Tap the button each time a drop falls. After 6 drops it shows the real rate and how to adjust the clamp.":
      "ጠብታ በወደቀ ቁጥር ቁልፉን ይንኩ። ከ6 ጠብታ በኋላ ትክክለኛውን ፍጥነትና ማስተካከያውን እንዴት እንደሚያስተካክሉ ያሳያል።",
    "Tap each drop": "ለእያንዳንዱ ጠብታ ይንኩ", "Reset": "ዳግም አስጀምር", "No screen? Count for 15 seconds": "ስክሪን አይመለከቱም? ለ15 ሰከንድ ይቁጠሩ",
    "Start 15-second count": "የ15 ሰከንድ ቆጠራ ጀምር", "Drops counted": "የተቆጠሩ ጠብታዎች", "Stop. How many drops?": "ያቁሙ። ስንት ጠብታ?",
    "Set a target rate first.": "መጀመሪያ የሚፈለገውን ፍጥነት ያስገቡ።",

    /* schedules */
    "Dose schedules": "የመድኃኒት መርሐ ግብሮች",
    "Start a schedule when you give the first dose. It lists every due time, the dose for the patient's weight, and the checks to do before each dose. Reminders work while MedBridge is open on this device.":
      "የመጀመሪያውን መጠን ሲሰጡ መርሐ ግብር ይጀምሩ። እያንዳንዱን የመስጫ ሰዓት፣ ለታካሚው ክብደት የሚሆነውን መጠንና ከእያንዳንዱ መጠን በፊት የሚደረጉ ፍተሻዎችን ይዘረዝራል። ማስታወሻዎቹ የሚሠሩት ሜድብሪጅ በዚህ መሣሪያ ላይ ክፍት ሲሆን ብቻ ነው።",
    "Start a schedule": "መርሐ ግብር ጀምር", "Regimen": "የሕክምና ዕቅድ", "Bed or initials (not full name)": "አልጋ ቁጥር ወይም የስም መነሻ ፊደሎች (ሙሉ ስም አይደለም)",
    "e.g. Bed 4, A.K.": "ለምሳሌ አልጋ 4፣ A.K.", "First dose given at": "የመጀመሪያው መጠን የተሰጠበት ሰዓት", "Start schedule": "መርሐ ግብሩን ጀምር",
    "System notifications": "የስርዓት ማሳወቂያዎች", "No active schedules.": "ንቁ መርሐ ግብር የለም።",
    "Given now": "አሁን ተሰጥቷል", "Withheld": "አልተሰጠም", "Complete": "ተጠናቋል", "now": "አሁን",
    "End schedule": "መርሐ ግብሩን ጨርስ", "Print chart": "ቻርቱን አትም", "Drug page": "የመድኃኒቱ ገጽ",
    "Due": "የሚሰጥበት", "Dose": "መጠን", "Record": "መዝገብ", "Today": "ዛሬ", "Tomorrow": "ነገ", "Yesterday": "ትናንት",
    "Schedule started.": "መርሐ ግብሩ ተጀምሯል።", "Recorded as withheld.": "እንዳልተሰጠ ተመዝግቧል።",
    "Enter the patient's weight.": "የታካሚውን ክብደት ያስገቡ።", "Choose the time of the first dose.": "የመጀመሪያው መጠን የተሰጠበትን ሰዓት ይምረጡ።",
    "Notifications were not allowed on this device.": "በዚህ መሣሪያ ማሳወቂያዎች አልተፈቀዱም።",
    "Moved later because an earlier dose was given late": "ቀደም ያለው መጠን ስለዘገየ ወደ ኋላ ተዛውሯል", "(moved)": "(ተዛውሯል)",
    "Times are 24-hour international clock time, not Ethiopian local time.": "ሰዓቶቹ በ24 ሰዓት ዓለም አቀፍ አቆጣጠር ናቸው — በኢትዮጵያ የሀገር ውስጥ ሰዓት አይደሉም።",

    /* never mix */
    "Never mix": "በፍጹም አትቀላቅሉ", "Check two drugs": "ሁለት መድኃኒቶችን አረጋግጥ", "Drug or fluid 1": "መድኃኒት ወይም ፈሳሽ 1",
    "Drug or fluid 2": "መድኃኒት ወይም ፈሳሽ 2", "Choose…": "ይምረጡ…", "All entries": "ሁሉም መዝገቦች", "Caution": "ጥንቃቄ",
    "any other drug or fluid": "ማንኛውም ሌላ መድኃኒት ወይም ፈሳሽ", "Do:": "ያድርጉ፦",
    "Line, syringe and fluid combinations that cause precipitation, inactivation or harm.": "ዝቃጭ፣ የመድኃኒት መሥራት ማቆም ወይም ጉዳት የሚያስከትሉ የመስመር፣ የሲሪንጅ እና የፈሳሽ ጥምረቶች።",
    "If two drugs are not listed here, that does not mean they are compatible": "ሁለት መድኃኒቶች እዚህ ካልተዘረዘሩ፣ ተስማሚ ናቸው ማለት አይደለም",
    "— when in doubt, use separate lines and flush with saline between drugs.": "— ጥርጣሬ ካለዎት የተለያዩ መስመሮችን ይጠቀሙ፣ በመድኃኒቶች መካከልም በሳሊን ያጥቡ።",
    "No incompatibility recorded here for this pair.": "ለእነዚህ ሁለቱ እዚህ የተመዘገበ አለመጣጣም የለም።",
    "That is not proof they are compatible.": "ይህ ተስማሚ ስለመሆናቸው ማረጋገጫ አይደለም።",
    "Use separate lines or flush with 0.9 % saline between them.": "የተለያዩ መስመሮችን ይጠቀሙ ወይም በመካከላቸው በ0.9 % ሳሊን ያጥቡ።",
    "Draft reference. Check your local IV compatibility guide or pharmacist.": "ረቂቅ ማጣቀሻ። የአካባቢዎን የደም ሥር መድኃኒት ተስማሚነት መመሪያ ወይም ፋርማሲስት ያማክሩ።",

    /* tools hub */
    "Metronome at the target drop rate, plus tap-to-measure the real rate.": "በሚፈለገው የጠብታ ፍጥነት የሚመታ ምልክት፣ እንዲሁም ትክክለኛውን ፍጥነት መታ አድርገው መለካት።",
    "Clock times, pre-dose checks and reminders for repeat regimens.": "ለተደጋጋሚ ሕክምናዎች የሰዓት ዝርዝር፣ ከመስጠት በፊት ፍተሻዎች እና ማስታወሻዎች።",
    "Drugs and fluids that must not share a line or syringe.": "አንድ መስመር ወይም ሲሪንጅ መጋራት የሌለባቸው መድኃኒቶችና ፈሳሾች።",
    "Drip rate, dose to drops, mg/kg, dilution, Plan C, child weight, units.": "የጠብታ ፍጥነት፣ ከመጠን ወደ ጠብታ፣ mg/kg፣ አቀላቀል፣ ፕላን C፣ የሕፃን ክብደት፣ መለኪያዎች።",
    "No-pump techniques": "ያለ ፓምፕ ቴክኒኮች", "Burettes, time-taping, countable concentrations, peripheral pressors.": "ቡሬቶች፣ በከረጢቱ ላይ የሰዓት ምልክት፣ ሊቆጠር የሚችል ክምችት፣ በዳር የደም ሥር የሚሰጡ ፕሬሰሮች።",
    "Install MedBridge": "ሜድብሪጅን ጫን", "Install": "ጫን", "Add it to your home screen: it opens like an app and works offline on the ward.": "ወደ መነሻ ስክሪንዎ ያክሉት፦ እንደ መተግበሪያ ይከፈታል፣ በክፍልም ያለ ኢንተርኔት ይሠራል።",

    /* calculators */
    "Drip rate": "የጠብታ ፍጥነት", "Dose → drops": "መጠን → ጠብታ", "Dilution": "አቀላቀል", "Plan C fluids": "የፕላን C ፈሳሾች",
    "Child weight": "የሕፃን ክብደት", "Units": "መለኪያዎች", "Remember": "ያስታውሱ",
    "Time (minutes)": "ጊዜ (ደቂቃ)", "Drop factor (drops/mL)": "የጠብታ መጠን (ጠብታ/mL)", "Reverse: drops/min → mL/h": "በተቃራኒ፦ ጠብታ/ደቂቃ → mL/ሰዓት",
    "Drops per minute": "ጠብታ በደቂቃ", "Preset": "ቅድመ-ምርጫ", "Custom": "የራስ", "Drug amount in bag": "በከረጢቱ ያለ የመድኃኒት መጠን",
    "Unit": "መለኪያ", "Bag volume (mL)": "የከረጢቱ መጠን (mL)", "Desired dose": "የሚፈለግ መጠን", "Dose unit": "የመጠን መለኪያ",
    "Dose per kg": "መጠን በኪሎ", "Max dose (optional)": "ከፍተኛ መጠን (አማራጭ)", "Concentration available (per mL)": "ያለው ክምችት (በmL)",
    "Stock concentration": "የመጀመሪያ ክምችት", "Target concentration": "የሚፈለግ ክምችት", "Final volume wanted (mL)": "የሚፈለግ የመጨረሻ መጠን (mL)",
    "Use the same unit for both concentrations (%, mg/mL, mcg/mL…).": "ለሁለቱም ክምችቶች አንድ አይነት መለኪያ ይጠቀሙ (%፣ mg/mL፣ mcg/mL…)።",
    "WHO Plan C for severe dehydration. Tick SAM for the malnutrition regimen instead.": "ለከባድ የሰውነት ፈሳሽ እጥረት የWHO ፕላን C። ለከባድ የምግብ እጥረት ሕክምና SAMን ይምረጡ።",
    "Age": "ዕድሜ", "Under 12 months": "ከ12 ወር በታች", "12 months or older": "12 ወር ወይም ከዚያ በላይ",
    "Severe acute malnutrition (SAM)": "ከባድ አጣዳፊ የምግብ እጥረት (SAM)", "Only if shocked": "ሾክ ካለ ብቻ",
    "Age-based estimates — use a measured weight whenever a scale exists.": "በዕድሜ ላይ የተመሠረተ ግምት — ሚዛን ካለ የተመዘነ ክብደት ይጠቀሙ።",
    "Age (years)": "ዕድሜ (ዓመት)", "Formula": "ቀመር", "Use this weight in calculators": "ይህን ክብደት በማስያዎቹ ተጠቀም",
    "Glucose": "ግሉኮስ", "Threshold": "ወሰን", "Hypoglycaemia (child/adult)": "የስኳር መውረድ (ሕፃን/አዋቂ)", "Add dextrose in DKA": "በDKA ዴክስትሮዝ ጨምር",
    "DKA target fall per hour": "በDKA በሰዓት የሚፈለግ ቅናሽ", "Other conversions": "ሌሎች ልወጣዎች", "Solution %": "የመፍትሔ %",
    "Your setting reports glucose in": "የእርስዎ ሁኔታ ግሉኮስን የሚመዘግበው በ",
    "Enter all values": "ሁሉንም እሴቶች ያስገቡ", "Enter all values including weight.": "ክብደትን ጨምሮ ሁሉንም እሴቶች ያስገቡ።", "Enter all values.": "ሁሉንም እሴቶች ያስገቡ።",
    "Saved": "ተቀምጧል",

    /* techniques page */
    "Running drugs without a pump": "ያለ ፓምፕ መድኃኒት መስጠት",
    "Ten habits that make gravity infusions and alternative routes safe. Each drug page applies them to a specific medicine.":
      "በስበት ኃይል የሚሰጡ ፈሳሾችንና አማራጭ መንገዶችን ደህንነታቸው የተጠበቀ የሚያደርጉ አስር ልማዶች። ዝርዝሩ ከታች በእንግሊዝኛ ቀርቧል።",

    /* local */
    "Local setting": "አካባቢያዊ ሁኔታ",
    "Choose the country profile and your facility level. The app then applies local equipment, stocked strengths, national-protocol notes on each drug, local procedures, and calculator defaults. Everything can be edited for your own facility and shared as a file.":
      "የሀገር መገለጫውንና የተቋምዎን ደረጃ ይምረጡ። መተግበሪያው አካባቢያዊ መሣሪያዎችን፣ የሚገኙ ጥንካሬዎችን፣ በእያንዳንዱ መድኃኒት ላይ የብሔራዊ ፕሮቶኮል ማስታወሻዎችን፣ አካባቢያዊ አሠራሮችንና የማስያ ነባሪዎችን ይተገብራል። ሁሉንም ለተቋምዎ ማስተካከልና እንደ ፋይል ማጋራት ይቻላል።",
    "Country / profile": "ሀገር / መገለጫ", "Facility level": "የተቋም ደረጃ", "— choose (sets equipment) —": "— ይምረጡ (መሣሪያዎችን ያዘጋጃል) —",
    "Draft — verify against national STG": "ረቂቅ — ከብሔራዊ STG ጋር ያረጋግጡ", "No level chosen — all methods shown": "ደረጃ አልተመረጠም — ሁሉም ዘዴዎች ይታያሉ",
    "Calculator defaults": "የማስያ ነባሪዎች", "Giving set:": "የፈሳሽ መስጫ መስመር፦", "Glucose unit:": "የግሉኮስ መለኪያ፦", "Weight estimate:": "የክብደት ግምት፦",
    "SAM adjustments:": "የSAM ማስተካከያዎች፦", "on": "በርቷል", "off": "ጠፍቷል", "(Plan C calculator)": "(የፕላን C ማስያ)", "Coverage": "ሽፋን",
    "Local procedures and techniques": "አካባቢያዊ አሠራሮችና ቴክኒኮች", "Drugs with local notes": "አካባቢያዊ ማስታወሻ ያላቸው መድኃኒቶች",
    "Customise for my facility": "ለተቋሜ አስተካክል", "Facility name": "የተቋሙ ስም", "e.g. Debre Berhan Referral Hospital": "ለምሳሌ ደብረ ብርሃን ሪፈራል ሆስፒታል",
    "Our usual giving set": "የምንጠቀምበት የፈሳሽ መስጫ መስመር", "Glucose unit": "የግሉኮስ መለኪያ", "Weight-estimate formula": "የክብደት ግምት ቀመር",
    "Profile default": "የመገለጫው ነባሪ", "Add a local procedure": "አካባቢያዊ አሠራር ጨምር", "Title": "ርዕስ", "e.g. Oxygen splitter for two cots": "ለምሳሌ ለሁለት አልጋ የኦክስጅን መከፋፈያ",
    "e.g. Primary hospital": "ለምሳሌ የመጀመሪያ ደረጃ ሆስፒታል", "Description": "መግለጫ", "What you do, step by step": "ምን እንደሚያደርጉ፣ ደረጃ በደረጃ",
    "Add procedure": "አሠራር ጨምር", "Add a local note to a drug": "ለመድኃኒት አካባቢያዊ ማስታወሻ ጨምር", "Note (stocked strength, protocol, how you give it here)": "ማስታወሻ (የሚገኝ ጥንካሬ፣ ፕሮቶኮል፣ እዚህ እንዴት እንደሚሰጡት)",
    "Save note": "ማስታወሻ አስቀምጥ", "My notes": "የእኔ ማስታወሻዎች", "Remove": "አስወግድ", "my facility": "የእኔ ተቋም",
    "Share or restore my facility profile": "የተቋሜን መገለጫ አጋራ ወይም መልስ",
    "Export copies your customisations (name, defaults, procedures, notes) as text you can send to another phone or facility; import pastes them back.":
      "“ላክ” ማስተካከያዎችዎን (ስም፣ ነባሪዎች፣ አሠራሮች፣ ማስታወሻዎች) ወደ ሌላ ስልክ ወይም ተቋም ሊላክ በሚችል ጽሑፍ ይገለብጣል፤ “አስገባ” መልሶ ያስገባቸዋል።",
    "Export": "ላክ", "Import": "አስገባ", "Clear my customisations": "ማስተካከያዎቼን አጽዳ", "Profile text (JSON)": "የመገለጫ ጽሑፍ (JSON)",
    "Could not read that profile text.": "ያንን የመገለጫ ጽሑፍ ማንበብ አልተቻለም።", "Remove all your customisations?": "ሁሉንም ማስተካከያዎችዎን ላስወግድ?",

    /* setup */
    "My setup": "የእኔ ማዋቀሪያ", "My ward": "የእኔ ክፍል",
    "The drug list opens filtered to this ward. Everything stays reachable — switch to “All drugs” or “By drug class” at any time.":
      "የመድኃኒቶች ዝርዝር በዚህ ክፍል ተጣርቶ ይከፈታል። ሁሉም ተደራሽ ሆኖ ይቆያል — በማንኛውም ጊዜ ወደ “ሁሉም መድኃኒቶች” ወይም “በመድኃኒት ዓይነት” ይቀይሩ።",
    "Where I work": "የምሠራበት", "No ward — show all drugs": "ክፍል የለም — ሁሉንም መድኃኒቶች አሳይ",
    "Tick what your facility actually has. Methods that need something you lack are dimmed and sorted last on every drug page — nothing is hidden. Saved on this device only.":
      "ተቋምዎ በእርግጥ ያለውን ይምረጡ። የሌለዎትን ነገር የሚፈልጉ ዘዴዎች በእያንዳንዱ መድኃኒት ገጽ ላይ ደብዝዘው በመጨረሻ ይደረደራሉ — ምንም አይደበቅም። በዚህ መሣሪያ ላይ ብቻ ይቀመጣል።",
    "Choosing a facility level on the": "የተቋም ደረጃን በ", "page fills these switches automatically; adjust them here afterwards.": "ገጽ ላይ መምረጥ እነዚህን በራሱ ይሞላል፤ ከዚያ እዚህ ያስተካክሏቸው።",
    "Appearance": "ገጽታ", "Follow system": "የመሣሪያውን ቅንብር ተከተል", "Language": "ቋንቋ", "Defaults": "ነባሪዎች",
    "Default drop factor of your usual giving set": "የሚጠቀሙበት የፈሳሽ መስጫ መስመር ነባሪ የጠብታ መጠን",
    "Reset setup (show everything)": "ማዋቀሪያውን ዳግም አስጀምር (ሁሉንም አሳይ)", "About this build": "ስለዚህ ስሪት",
    "Works offline once loaded. On Android/Chrome use “Add to Home screen” to install.": "አንዴ ከተከፈተ ያለ ኢንተርኔት ይሠራል። በAndroid/Chrome ለመጫን “Add to Home screen”ን ይጠቀሙ።",
    "About & disclaimer": "ስለ መተግበሪያው እና ማሳሰቢያ",
    "Interface language. Doses and clinical content always stay in English.": "የመተግበሪያው ቋንቋ። መጠኖችና የሕክምና ይዘቶች ሁልጊዜ በእንግሊዝኛ ይቆያሉ።",

    /* about */
    "About": "ስለ", "Author": "አዘጋጅ", "Developed and put together by": "ያበለጸጉትና ያዘጋጁት፦", "Draft content.": "ረቂቅ ይዘት።",
    "Every drug entry in this build is marked “draft” and has not yet been verified by a pharmacist or physician. It must not be used for patient care until the review workflow in the README is completed.":
      "በዚህ ስሪት ያለ እያንዳንዱ የመድኃኒት መረጃ “ረቂቅ” ተብሎ ምልክት ተደርጎበታል፣ ገና በፋርማሲስት ወይም በሐኪም አልተረጋገጠም። የማረጋገጫ ሂደቱ እስኪጠናቀቅ ድረስ ለታካሚ እንክብካቤ መዋል የለበትም።",
    "Purpose": "ዓላማ",
    "A reference for trained health workers on how hospital-level medicines can be given safely when infusion pumps, syringe drivers, monitors or specific formulations are not available — using validated intermittent regimens, alternative routes, dilutions and gravity drip technique.":
      "የኢንፍዩዥን ፓምፖች፣ ሲሪንጅ ድራይቨሮች፣ መከታተያዎች ወይም የተወሰኑ የመድኃኒት ዓይነቶች በሌሉበት የሆስፒታል ደረጃ መድኃኒቶችን እንዴት በደህንነት መስጠት እንደሚቻል ለሠለጠኑ የጤና ባለሙያዎች የሚያገለግል ማጣቀሻ — በተረጋገጡ የተቆራረጠ አሰጣጥ ዕቅዶች፣ በአማራጭ መንገዶች፣ በአቀላቀልና በስበት ኃይል ጠብታ ዘዴ።",
    "What it is not": "ምን አይደለም",
    "It does not replace national treatment guidelines, the prescriber's judgement, or a pharmacist. Doses are for adults unless stated; paediatric doses must be checked against the WHO Pocket Book, Nelson Textbook of Pediatrics or the national formulary.":
      "ብሔራዊ የሕክምና መመሪያዎችን፣ የሐኪሙን ውሳኔ ወይም ፋርማሲስትን አይተካም። ካልተገለጸ በስተቀር መጠኖቹ ለአዋቂዎች ናቸው፤ የሕፃናት መጠኖች ከWHO Pocket Book፣ ከNelson Textbook of Pediatrics ወይም ከብሔራዊ የመድኃኒት ዝርዝር ጋር መረጋገጥ አለባቸው።",
    "Privacy": "ግላዊነት",
    "No account, no network calls, no analytics. Settings and the last weight you entered are stored only in this browser.":
      "ቅንብሮችና ያስገቡት የመጨረሻ ክብደት በዚህ አሳሽ ላይ ብቻ ይቀመጣሉ። የትንታኔ መከታተያ የለም።",

    /* community: drug notes */
    "Loading notes from other facilities…": "ከሌሎች ተቋማት ማስታወሻዎችን በመጫን ላይ…",
    "Administrator-approved local methods — Ethiopia": "በአስተዳዳሪ የጸደቁ አካባቢያዊ ዘዴዎች — ኢትዮጵያ",
    "Added and maintained by the MedBridge clinical administrators. These are the methods the app recommends locally.":
      "በሜድብሪጅ የሕክምና አስተዳዳሪዎች የተጨመሩና የሚጠበቁ። መተግበሪያው በአካባቢው የሚመክራቸው ዘዴዎች እነዚህ ናቸው።",
    "Main method": "ዋና ዘዴ", "Suggested": "የተጠቆመ", "How colleagues give it": "ባልደረቦች እንዴት ይሰጡታል",
    "These notes are personal reports, not guidance.": "እነዚህ ማስታወሻዎች የግል ተሞክሮዎች ናቸው፣ መመሪያ አይደሉም።",
    "They describe what colleagues do in their own hospital. They are not checked by the administrators and must not be followed in place of the national protocol.":
      "ባልደረቦች በራሳቸው ሆስፒታል የሚያደርጉትን ይገልጻሉ። በአስተዳዳሪዎች አልተረጋገጡም፣ በብሔራዊ ፕሮቶኮል ምትክም መከተል የለባቸውም።",
    "Offline — practice notes will appear when you reconnect.": "ከመስመር ውጭ — ኢንተርኔት ሲመለስ የተግባር ማስታወሻዎች ይታያሉ።",
    "Sign in to add how your hospital does it": "ሆስፒታልዎ እንዴት እንደሚሰጠው ለመጨመር ይግቡ",
    "No notes yet for this drug. If you administer it a particular way in your hospital, you can be the first to describe it.":
      "ለዚህ መድኃኒት ገና ማስታወሻ የለም። በሆስፒታልዎ በተለየ መንገድ የሚሰጡት ከሆነ፣ የመጀመሪያው ገላጭ መሆን ይችላሉ።",
    "Your practice note": "የእርስዎ የተግባር ማስታወሻ", "Post note": "ማስታወሻ ለጥፍ", "We do this too": "እኛም እንዲህ እናደርጋለን",
    "Edit": "አስተካክል", "Delete": "ሰርዝ", "Report": "ሪፖርት አድርግ", "Hide": "ደብቅ", "Adopt as method": "እንደ ዘዴ ተቀበል",
    "Adopted by the administrators as an approved method": "በአስተዳዳሪዎች እንደ ጸደቀ ዘዴ ተቀብሏል",
    "Write at least a sentence.": "ቢያንስ አንድ ዓረፍተ ነገር ይጻፉ።", "Note posted.": "ማስታወሻው ተለጥፏል።", "Delete your note?": "ማስታወሻዎን ልሰርዝ?",
    "Edit your note:": "ማስታወሻዎን ያስተካክሉ፦", "What is wrong with this note? (unsafe dose, wrong route, spam)": "በዚህ ማስታወሻ ላይ ምን ችግር አለ? (አደገኛ መጠን፣ የተሳሳተ መንገድ፣ ማስታወቂያ)",
    "Reported to the administrators.": "ለአስተዳዳሪዎች ሪፖርት ተደርጓል።", "Note hidden.": "ማስታወሻው ተደብቋል።",
    "Verified": "የተረጋገጠ", "Unverified": "ያልተረጋገጠ", "Identity checked by an administrator": "ማንነቱ በአስተዳዳሪ ተረጋግጧል", "Not yet checked by an administrator": "ገና በአስተዳዳሪ አልተረጋገጠም",

    /* community: account */
    "Sign in or join": "ግባ ወይም ተቀላቀል", "Create account": "መለያ ፍጠር", "Email": "ኢሜይል", "Password": "የይለፍ ቃል",
    "Why an account": "መለያ ለምን ያስፈልጋል",
    "Add how your hospital actually administers a drug, so colleagues elsewhere in Ethiopia can see it.": "ሆስፒታልዎ መድኃኒቱን በእርግጥ እንዴት እንደሚሰጥ ይጨምሩ፣ በሌሎች የኢትዮጵያ አካባቢዎች ያሉ ባልደረቦች እንዲያዩት።",
    "Mark a colleague's note \"we do this too\".": "የባልደረባዎን ማስታወሻ “እኛም እንዲህ እናደርጋለን” ብለው ምልክት ያድርጉ።",
    "Your name, profession, hospital and city are shown with every note, which is what makes them useful.": "ስምዎ፣ ሙያዎ፣ ሆስፒታልዎና ከተማዎ ከእያንዳንዱ ማስታወሻ ጋር ይታያሉ፤ ማስታወሻዎቹን ጠቃሚ የሚያደርገውም ይኸው ነው።",
    "What accounts cannot do": "መለያዎች ምን ማድረግ አይችሉም",
    "Only administrators can add or change the approved administration methods. Practice notes are always labelled as personal reports and kept separate from them.":
      "የጸደቁ የአሰጣጥ ዘዴዎችን መጨመር ወይም መቀየር የሚችሉት አስተዳዳሪዎች ብቻ ናቸው። የተግባር ማስታወሻዎች ሁልጊዜ የግል ተሞክሮ ተብለው ተለይተው ይቀመጣሉ።",
    "Full name": "ሙሉ ስም", "Profession": "ሙያ", "City / town": "ከተማ", "Hospital / health facility": "ሆስፒታል / ጤና ተቋም",
    "e.g. Tikur Anbessa Specialised Hospital": "ለምሳሌ ጥቁር አንበሳ ስፔሻላይዝድ ሆስፒታል", "Password (8+ characters)": "የይለፍ ቃል (8+ ፊደላት)",
    "New accounts can post practice notes immediately; they show as “unverified” until an administrator confirms who you are.":
      "አዲስ መለያዎች ወዲያውኑ ማስታወሻ መለጠፍ ይችላሉ፤ አስተዳዳሪ ማንነትዎን እስኪያረጋግጥ ድረስ “ያልተረጋገጠ” ተብለው ይታያሉ።",
    "Welcome to MedBridge.": "እንኳን ወደ ሜድብሪጅ በደህና መጡ።", "Signed in.": "ገብተዋል።",
    "My account": "የእኔ መለያ", "Verified by an administrator": "በአስተዳዳሪ የተረጋገጠ", "Awaiting verification": "ማረጋገጫ በመጠባበቅ ላይ",
    "Administrator": "አስተዳዳሪ", "Details": "ዝርዝሮች", "Hospital / facility": "ሆስፒታል / ተቋም", "Save details": "ዝርዝሮችን አስቀምጥ",
    "Change password": "የይለፍ ቃል ቀይር", "Current password": "የአሁኑ የይለፍ ቃል", "New password": "አዲስ የይለፍ ቃል", "Session": "ክፍለ ጊዜ",
    "Open admin console": "የአስተዳዳሪ ማዕከል ክፈት", "Network activity": "የትስስር እንቅስቃሴ", "Saved.": "ተቀምጧል።", "Password changed.": "የይለፍ ቃል ተቀይሯል።",
    "No connection to the MedBridge server. Reference content and calculators still work offline; accounts and notes need a connection.":
      "ከሜድብሪጅ አገልጋይ ጋር ግንኙነት የለም። ማጣቀሻዎችና ማስያዎች ያለ ኢንተርኔት ይሠራሉ፤ መለያዎችና ማስታወሻዎች ግን ግንኙነት ይፈልጋሉ።",
    /* community: network */
    "Across Ethiopia": "በመላው ኢትዮጵያ", "Loading…": "በመጫን ላይ…",
    "What colleagues in other hospitals report about giving these drugs. Practice notes are personal reports and are not approved guidance.":
      "በሌሎች ሆስፒታሎች ያሉ ባልደረቦች እነዚህን መድኃኒቶች ስለመስጠት የሚሉት። የተግባር ማስታወሻዎች የግል ተሞክሮዎች ናቸው፣ የጸደቀ መመሪያ አይደሉም።",
    "doctors and staff": "ሐኪሞችና ሠራተኞች", "Network growth": "የትስስሩ እድገት", "verified members": "የተረጋገጡ አባላት", "joined in the last 30 days": "ባለፉት 30 ቀናት የተቀላቀሉ", "drugs signed off": "የተፈረመባቸው መድኃኒቶች", "stock reports (30 days)": "የክምችት ሪፖርቶች (30 ቀናት)", "Visible to administrators only. Members see practice notes and stock reports, not these figures.": "ለአስተዳዳሪዎች ብቻ የሚታይ። አባላት የተግባር ማስታወሻዎችንና የክምችት ሪፖርቶችን ያያሉ፤ እነዚህን አሃዞች አያዩም።", "practice notes": "የተግባር ማስታወሻዎች", "approved local methods": "የጸደቁ አካባቢያዊ ዘዴዎች",
    "Cities": "ከተሞች", "Recent notes": "የቅርብ ጊዜ ማስታወሻዎች", "No members yet.": "ገና አባላት የሉም።",
    "No notes yet. Sign in and describe how your hospital administers a drug.": "ገና ማስታወሻ የለም። ይግቡና ሆስፒታልዎ መድኃኒት እንዴት እንደሚሰጥ ይግለጹ።",
    "Cannot reach the server. This page needs a connection; drug pages and calculators work offline.": "አገልጋዩን ማግኘት አልተቻለም። ይህ ገጽ ግንኙነት ይፈልጋል፤ የመድኃኒት ገጾችና ማስያዎች ያለ ኢንተርኔት ይሠራሉ።",
    /* community: admin */
    "Admin console": "የአስተዳዳሪ ማዕከል", "Administrators only.": "ለአስተዳዳሪዎች ብቻ።", "Sign in with an administrator account.": "በአስተዳዳሪ መለያ ይግቡ።",
    "Only what you publish here appears as an": "እዚህ የሚያትሙት ብቻ ነው የሚታየው እንደ", "approved method": "የጸደቀ ዘዴ",
    ". Members' practice notes stay separate and are always labelled as personal reports.": "። የአባላት የተግባር ማስታወሻዎች ተለይተው ሁልጊዜ የግል ተሞክሮ ተብለው ይቀመጣሉ።",
    "Approved methods": "የጸደቁ ዘዴዎች", "Activity log": "የእንቅስቃሴ መዝገብ", "New approved method": "አዲስ የጸደቀ ዘዴ", "Edit approved method": "የጸደቀ ዘዴ አስተካክል",
    "Status": "ሁኔታ", "Main method (what we recommend)": "ዋና ዘዴ (የምንመክረው)", "Suggested alternative": "የተጠቆመ አማራጭ",
    "e.g. Hourly IM insulin — Ethiopian hospitals without pumps": "ለምሳሌ በሰዓት IM ኢንሱሊን — ፓምፕ የሌላቸው የኢትዮጵያ ሆስፒታሎች",
    "When to use it": "መቼ እንደሚጠቀሙበት", "Steps (one per line)": "ደረጃዎች (በአንድ መስመር አንድ)", "Monitor (one per line)": "ክትትል (በአንድ መስመር አንድ)",
    "Cautions (one per line)": "ጥንቃቄዎች (በአንድ መስመር አንድ)", "Source / authority": "ምንጭ / ባለሥልጣን", "e.g. FMOH STG 2021, p. 214": "ለምሳሌ FMOH STG 2021፣ ገጽ 214",
    "Adopted from a member's practice note.": "ከአባል የተግባር ማስታወሻ የተወሰደ።", "Save changes": "ለውጦችን አስቀምጥ", "Publish method": "ዘዴውን አትም",
    "Unpublished": "ያልታተመ", "Main": "ዋና", "No approved methods published yet.": "ገና የታተመ የጸደቀ ዘዴ የለም።",
    "Delete this approved method?": "ይህን የጸደቀ ዘዴ ልሰርዝ?", "Method updated.": "ዘዴው ተሻሽሏል።", "Method published.": "ዘዴው ታትሟል።", "Deleted.": "ተሰርዟል።",
    "Restore": "መልስ", "Keep hidden": "ተደብቆ ይቆይ", "Updated.": "ተሻሽሏል።",
    "Nothing reported. Members can flag a note that looks unsafe and it appears here.": "ምንም ሪፖርት የለም። አባላት አደገኛ የሚመስል ማስታወሻ ምልክት ማድረግ ይችላሉ፣ እዚህም ይታያል።",
    "Member": "አባል", "Facility": "ተቋም", "Role": "ሚና", "Verify": "አረጋግጥ", "Unverify": "ማረጋገጫ አንሳ", "Make admin": "አስተዳዳሪ አድርግ",
    "Make member": "አባል አድርግ", "Suspend": "አግድ", "Suspend this member and end their sessions?": "ይህን አባል ላግድና ክፍለ ጊዜዎቹን ላቋርጥ?",
    "Member updated.": "አባሉ ተሻሽሏል።", "When": "መቼ", "Who": "ማን", "Action": "ተግባር", "Detail": "ዝርዝር",

    "Why was this dose withheld? (e.g. reflexes absent, RR 12)": "ይህ መጠን ለምን አልተሰጠም? (ለምሳሌ ሪፍሌክስ የለም፣ የትንፋሽ ምት 12)",
    "End this schedule and remove it from this device?": "ይህን መርሐ ግብር ጨርሼ ከዚህ መሣሪያ ላስወግደው?",
    "Phase": "ደረጃ", "Volume": "መጠን", "Rate": "ፍጥነት", "Drops": "ጠብታዎች", "stock": "ክምችት", "protocol": "ፕሮቶኮል", "technique": "ቴክኒክ",
    "e.g. 50 for 50 mg/mL": "ለምሳሌ ለ50 mg/mL 50", "or age (months, if under 1 y)": "ወይም ዕድሜ (ከ1 ዓመት በታች ከሆነ በወር)",
    "Drop factor is printed on the giving-set packet: 10, 15 or 20 drops/mL for standard sets, 60 drops/mL for paediatric microdrip sets.":
      "የጠብታ መጠን በፈሳሽ መስጫ መስመሩ ፓኬት ላይ ታትሟል፦ ለመደበኛ መስመሮች 10፣ 15 ወይም 20 ጠብታ/mL፣ ለሕፃናት ማይክሮድሪፕ 60 ጠብታ/mL።",
    "With a 60 drops/mL set, drops per minute = mL per hour.": "በ60 ጠብታ/mL መስመር፣ ጠብታ በደቂቃ = mL በሰዓት።",
    "Count drops for 15 s and multiply by 4. Recount after 15 min and after any movement.": "ጠብታዎችን ለ15 ሰከንድ ቆጥረው በ4 ያባዙ። ከ15 ደቂቃ በኋላና ታካሚው ከተንቀሳቀሰ በኋላ እንደገና ይቁጠሩ።",
    "Aim for 5–60 drops/min; change the dilution rather than fighting an uncountable rate.": "ከ5–60 ጠብታ/ደቂቃ ያስቡ፤ ሊቆጠር የማይችል ፍጥነትን ከመታገል አቀላቀሉን ይቀይሩ።",
    "Fewer than 4 drops/min is hard to control by gravity — use a more dilute preparation or a microdrip set.": "ከ4 ጠብታ/ደቂቃ በታች በስበት ኃይል መቆጣጠር ከባድ ነው — የበለጠ የተቀጠነ ዝግጅት ወይም ማይክሮድሪፕ ይጠቀሙ።",
    "More than 150 drops/min cannot be counted reliably — use a macrodrip set or time-tape the bag.": "ከ150 ጠብታ/ደቂቃ በላይ በትክክል መቁጠር አይቻልም — መደበኛ መስመር ይጠቀሙ ወይም በከረጢቱ ላይ የሰዓት ምልክት ያድርጉ።",
    "MUAC < 11.5 cm, WHZ < −3 or oedema — Plan C rates are dangerous": "MUAC < 11.5 cm፣ WHZ < −3 ወይም እብጠት — የፕላን C ፍጥነቶች አደገኛ ናቸው",
    "Reassess every 15–30 min. Repeat phase 1 if the radial pulse is still weak. ORS 15 mL/h as soon as able to drink. No IV: NG ORS 60 mL/h for 6 h.":
      "በየ15–30 ደቂቃ እንደገና ይገምግሙ። የእጅ አንጓ ምት አሁንም ደካማ ከሆነ ደረጃ 1ን ይድገሙ። መጠጣት እንደቻለ ORS 15 mL/ሰዓት። የደም ሥር መስመር ከሌለ፦ በአፍንጫ ቱቦ ORS 60 mL/ሰዓት ለ6 ሰዓት።",
    /* ---- safety, interactions, newborn ---- */
    "Generally safe": "በአብዛኛው ደህንነቱ የተጠበቀ", "Caution": "ጥንቃቄ", "No dose change": "የመጠን ለውጥ የለም", "Adjust dose": "መጠን ያስተካክሉ",
    "Pregnancy": "እርግዝና", "Breastfeeding": "ጡት ማጥባት", "Kidney": "ኩላሊት", "Liver": "ጉበት", "Patient:": "ታካሚ፦", "Recalculate": "እንደገና አስላ",
    "Calculate creatinine clearance": "የክሬቲኒን ክሊራንስ አስላ", "No change listed at this level.": "በዚህ ደረጃ የተዘረዘረ ለውጥ የለም።",
    "Interactions with other drugs": "ከሌሎች መድኃኒቶች ጋር ያለ መስተጋብር", "Major": "ከባድ", "Moderate": "መካከለኛ",
    "Pharmacological interactions only. For mixing in a line see": "የመድኃኒት መስተጋብሮች ብቻ። በአንድ መስመር ስለመቀላቀል ይመልከቱ፦",
    "Check a full medicine list": "ሙሉ የመድኃኒት ዝርዝር አረጋግጥ", "Drug interactions": "የመድኃኒቶች መስተጋብር",
    "Add the medicines a patient is receiving. MedBridge lists harmful combinations among them and what to do.": "ታካሚው የሚወስዳቸውን መድኃኒቶች ያክሉ። ሜድብሪጅ ጎጂ ጥምረቶችንና ምን መደረግ እንዳለበት ይዘረዝራል።",
    "Interaction data is not loaded in this build.": "የመስተጋብር መረጃ በዚህ ስሪት አልተጫነም።", "Add a medicine": "መድኃኒት ጨምር", "Clear list": "ዝርዝሩን አጽዳ",
    "No medicines chosen yet.": "ገና መድኃኒት አልተመረጠም።", "Add at least two medicines.": "ቢያንስ ሁለት መድኃኒቶችን ያክሉ።",
    "No interaction recorded here for these medicines.": "ለእነዚህ መድኃኒቶች እዚህ የተመዘገበ መስተጋብር የለም።", "That does not prove the combination is safe.": "ይህ ጥምረቱ ደህንነቱ የተጠበቀ መሆኑን አያረጋግጥም።",
    "Ask a pharmacist when unsure.": "ጥርጣሬ ካለ ፋርማሲስት ይጠይቁ።", "Also: do not mix in a line": "በተጨማሪ፦ በአንድ መስመር አትቀላቅሉ",
    "Newborn doses": "የአራስ ሕፃናት መጠኖች", "Newborn": "አራስ", "All newborn doses": "ሁሉም የአራስ መጠኖች", "No rule for this age": "ለዚህ ዕድሜ ደንብ የለም",
    "For babies up to 28 days old. Newborn doses and dosing intervals change with gestation at birth and age in days.": "እስከ 28 ቀን ዕድሜ ላሉ ሕፃናት። የአራስ መጠኖችና በመጠኖች መካከል ያለው ጊዜ በተወለዱበት የእርግዝና ሳምንትና በቀናት ዕድሜ ይለያያሉ።",
    "Gestation at birth (weeks)": "ሲወለድ የነበረው የእርግዝና ጊዜ (ሳምንት)", "Age in days (0–28)": "ዕድሜ በቀን (0–28)", "Use for this baby": "ለዚህ ሕፃን ተጠቀም",
    "Newborn dosing data is not loaded.": "የአራስ መጠን መረጃ አልተጫነም።", "Enter weight, gestation at birth and age in days.": "ክብደት፣ ሲወለድ የነበረውን የእርግዝና ጊዜና ዕድሜን በቀን ያስገቡ።",
    "Interval · route": "የጊዜ ልዩነት · መንገድ", "Notes": "ማስታወሻዎች", "once daily": "በቀን አንድ ጊዜ", "Loading:": "የመጀመሪያ (loading) መጠን፦",
    "Draft newborn dosing. Check every dose against the drug page, a neonatal formulary and the national neonatal protocol.": "ረቂቅ የአራስ መጠን። እያንዳንዱን መጠን ከመድኃኒቱ ገጽ፣ ከአራስ መድኃኒት ዝርዝርና ከብሔራዊ የአራስ ፕሮቶኮል ጋር ያረጋግጡ።",
    "No newborn dosing rule covers this age and weight. Check the drug page and a neonatal formulary.": "ለዚህ ዕድሜና ክብደት የአራስ መጠን ደንብ የለም። የመድኃኒቱን ገጽና የአራስ መድኃኒት ዝርዝር ይመልከቱ።",
    "Enter a newborn weight in kg.": "የአራሱን ክብደት በኪ.ግ. ያስገቡ።", "Gestation must be 22 to 44 weeks.": "የእርግዝና ጊዜ ከ22 እስከ 44 ሳምንት መሆን አለበት።",
    "Age in days must be 0 to 28 for newborn dosing.": "ለአራስ መጠን ዕድሜ ከ0 እስከ 28 ቀን መሆን አለበት።", "Enter the gestation at birth as well.": "ሲወለድ የነበረውን የእርግዝና ጊዜም ያስገቡ።",
    "Newborn age, sex and kidney function": "የአራስ ዕድሜ፣ ጾታና የኩላሊት ሥራ", "Age in days (0–28) ": "ዕድሜ በቀን (0–28)", "newborns only": "ለአራስ ብቻ",
    "Sex": "ጾታ", "Not set": "አልተመረጠም", "Female": "ሴት", "Male": "ወንድ", "Kidney function": "የኩላሊት ሥራ",
    "For a newborn, doses and dosing intervals follow gestation and age in days.": "ለአራስ ሕፃን መጠኖችና የመስጫ ጊዜዎች በእርግዝና ጊዜና በቀናት ዕድሜ ይወሰናሉ።",
    /* ---- share & double check ---- */
    "Share": "አጋራ", "Share dose": "መጠኑን አጋራ", "Copy": "ቅዳ", "Copied.": "ተቀድቷል።", "Close": "ዝጋ",
    "Never include the patient's name. Use a bed number or initials.": "የታካሚውን ስም በፍጹም አያካትቱ። የአልጋ ቁጥር ወይም የስም መነሻ ፊደላትን ይጠቀሙ።",
    "High-alert medicine: independent double check": "ከፍተኛ ጥንቃቄ የሚያስፈልገው መድኃኒት፦ ገለልተኛ ድርብ ማረጋገጫ",
    "Ask a second nurse or doctor to work out the dose from the prescription, without looking at this screen. Enter their answer.": "ሁለተኛ ነርስ ወይም ሐኪም ይህን ስክሪን ሳያዩ ከትዕዛዙ ላይ መጠኑን እንዲያሰሉ ይጠይቁ። መልሳቸውን ያስገቡ።",
    "Ask a second nurse or doctor to work out the drip rate from the prescription, without looking at this screen. Enter their answer.": "ሁለተኛ ነርስ ወይም ሐኪም ይህን ስክሪን ሳያዩ ከትዕዛዙ ላይ የጠብታ ፍጥነቱን እንዲያሰሉ ይጠይቁ። መልሳቸውን ያስገቡ።",
    "Their initials": "የስም መነሻ ፊደላቸው", "Compare": "አወዳድር", "Enter the second checker's result.": "የሁለተኛውን አረጋጋጭ ውጤት ያስገቡ።", "Enter the second checker's initials.": "የሁለተኛውን አረጋጋጭ የስም መነሻ ፊደላት ያስገቡ።",
    "Match.": "ይዛመዳል።", "Mismatch. Do not give yet.": "አይዛመድም። ገና አይስጡ።",
    "High-alert medicine: second checker's initials": "ከፍተኛ ጥንቃቄ የሚያስፈልገው መድኃኒት፦ የሁለተኛው አረጋጋጭ የስም መነሻ ፊደላት",
    "This is a high-alert medicine and no second checker is recorded. Record the dose as given anyway?": "ይህ ከፍተኛ ጥንቃቄ የሚያስፈልገው መድኃኒት ነው፤ ሁለተኛ አረጋጋጭ አልተመዘገበም። ቢሆንም መጠኑን እንደተሰጠ ልመዝግብ?",
    "Age in days must be 0 to 28 for newborn dosing.": "ለአራስ መጠን ዕድሜ ከ0 እስከ 28 ቀን መሆን አለበት።",
    /* ---- calculators ---- */
    "Fluids & blood": "ፈሳሽና ደም", "Maintenance": "መደበኛ ፈሳሽ", "Burns": "ቃጠሎ", "Transfusion": "ደም መስጠት", "Oxygen cylinder": "የኦክስጅን ሲሊንደር",
    "Maintenance fluid (Holliday–Segar)": "መደበኛ የዕለት ፈሳሽ (Holliday–Segar)", "Temperature °C (optional)": "የሰውነት ሙቀት °C (አማራጭ)",
    "Newborn daily fluid": "የአራስ የዕለት ፈሳሽ", "Day of life (1 = first day)": "የሕይወት ቀን (1 = የመጀመሪያ ቀን)",
    "Burns resuscitation fluid": "ለቃጠሎ የሚሰጥ ፈሳሽ", "Burn area (% body surface)": "የተቃጠለው ቦታ (% የሰውነት ገጽ)", "Hours since the burn": "ከቃጠሎው በኋላ ያለፉ ሰዓታት",
    "2 mL/kg/% (adults, current burns consensus)": "2 mL/kg/% (አዋቂዎች፣ የአሁኑ ስምምነት)", "3 mL/kg/% (children)": "3 mL/kg/% (ሕፃናት)", "4 mL/kg/% (Parkland; electrical burns)": "4 mL/kg/% (Parkland፤ የኤሌክትሪክ ቃጠሎ)",
    "First half:": "የመጀመሪያው ግማሽ፦", "Second half:": "ሁለተኛው ግማሽ፦",
    "More than 8 hours have passed. Add up what was already given, give the shortfall, and get senior advice.": "ከ8 ሰዓት በላይ አልፏል። እስካሁን የተሰጠውን ደምረው የጎደለውን ይስጡ፤ የከፍተኛ ባለሙያ ምክር ያግኙ።",
    "Transfusion volume": "የሚሰጥ የደም መጠን", "Product": "የደም ዓይነት", "Packed red cells": "የተጨመቀ ቀይ የደም ሕዋስ", "Whole blood": "ሙሉ ደም",
    "Current Hb (g/dL)": "የአሁኑ Hb (g/dL)", "Target Hb (g/dL)": "የሚፈለገው Hb (g/dL)", "In an adult, one unit raises Hb by roughly 1 g/dL.": "በአዋቂ ሰው አንድ ዩኒት Hbን በግምት በ1 g/dL ከፍ ያደርጋል።",
    "How long will the cylinder last?": "ሲሊንደሩ ምን ያህል ጊዜ ይቆያል?", "Cylinder content when full (litres)": "ሲሊንደሩ ሲሞላ የሚይዘው (ሊትር)", "Flow (L/min)": "ፍሰት (L/ደቂቃ)",
    "Gauge pressure now": "የአሁኑ የግፊት መለኪያ ንባብ", "Pressure when full": "ሲሞላ ያለው ግፊት",
    "Use the same unit for both pressures: bar (full is usually 137) or psi (usually 2000). The content in litres is printed on the cylinder.": "ለሁለቱም ግፊቶች አንድ አይነት መለኪያ ይጠቀሙ፦ bar (ሙሉ ሲሆን በአብዛኛው 137) ወይም psi (በአብዛኛው 2000)። የሚይዘው ሊትር በሲሊንደሩ ላይ ታትሟል።",
    "Creatinine clearance": "የክሬቲኒን ክሊራንስ", "Height (cm, children)": "ቁመት (ሴ.ሜ.፣ ለሕፃናት)", "Serum creatinine": "የደም ክሬቲኒን",
    "Adults: Cockcroft–Gault. Children under 18: bedside Schwartz. Not valid in acute kidney injury with changing creatinine, pregnancy, or severe wasting; use clinical judgement.": "አዋቂዎች፦ Cockcroft–Gault። ከ18 ዓመት በታች፦ bedside Schwartz። ክሬቲኒን እየተለዋወጠ ባለበት አጣዳፊ የኩላሊት ጉዳት፣ በእርግዝና ወይም በከባድ መክሳት አይሠራም፤ የሕክምና ውሳኔዎን ይጠቀሙ።",
    "Drugs that need a change": "ለውጥ የሚያስፈልጋቸው መድኃኒቶች", "Use for this patient": "ለዚህ ታካሚ ተጠቀም", "Saved for this patient:": "ለዚህ ታካሚ የተቀመጠ፦",
    "Kidney function saved for this patient.": "የኩላሊት ሥራ ለዚህ ታካሚ ተቀምጧል።", "Kidney dosing data is not loaded.": "የኩላሊት መጠን መረጃ አልተጫነም።",
    "Calculate clearance to highlight what applies.": "የሚመለከተውን ለማጉላት ክሊራንስ ያስሉ።",
    "Calculate clearance to highlight what applies. Draft, check with a pharmacist.": "የሚመለከተውን ለማጉላት ክሊራንስ ያስሉ። ረቂቅ፣ ከፋርማሲስት ጋር ያረጋግጡ።", "Moderately reduced": "በመጠኑ የቀነሰ", "Severely reduced": "በከፍተኛ ሁኔታ የቀነሰ", "Kidney failure range": "የኩላሊት ድካም ደረጃ",
    "Height is needed for children (bedside Schwartz).": "ለሕፃናት ቁመት ያስፈልጋል (bedside Schwartz)።", "Age and weight are needed.": "ዕድሜና ክብደት ያስፈልጋሉ።",
    "Fluid calculator": "የፈሳሽ ማስያ",
    /* ---- charts & quiz ---- */
    "Wall charts": "የግድግዳ ቻርቶች", "One-page references to print and put up on the ward.": "አትመው በክፍሉ ግድግዳ ላይ የሚለጠፉ ባለ አንድ ገጽ ማጣቀሻዎች።",
    "Drip-rate table": "የጠብታ ፍጥነት ሠንጠረዥ", "Case protocol": "የሕመም ሁኔታ ፕሮቶኮል", "Ward drug cards": "የክፍል መድኃኒት ካርዶች", "Giving set": "የፈሳሽ መስጫ መስመር", "Ward": "ክፍል", "Chart type": "የቻርት ዓይነት",
    "Practice quiz": "የልምምድ ጥያቄዎች", "Dose and drip maths": "የመጠንና የጠብታ ስሌት", "Drip rates and weight-based volumes.": "የጠብታ ፍጥነትና በክብደት የሚሰላ መጠን።",
    "Cases": "የሕመም ሁኔታዎች", "First-line drugs and what to avoid.": "የመጀመሪያ ምርጫ መድኃኒቶችና መወገድ ያለባቸው።", "Safety": "ደህንነት",
    "Never mix, stock-outs, interactions and pregnancy.": "አትቀላቅሉ፣ የመድኃኒት እጥረት፣ መስተጋብሮችና እርግዝና።", "Mixed": "የተደበላለቀ", "All topics.": "ሁሉም ርዕሶች።",
    "Ten questions built from MedBridge's own drug, case and safety data, with the working shown. For training only. Questions are in English, as the clinical content is.": "ከሜድብሪጅ የመድኃኒት፣ የሕመም ሁኔታና የደህንነት መረጃ የተዘጋጁ አስር ጥያቄዎች፣ ከስሌቱ ጋር። ለሥልጠና ብቻ። እንደ ሕክምና ይዘቱ ጥያቄዎቹ በእንግሊዝኛ ናቸው።",
    "Correct.": "ትክክል።", "Next question": "ቀጣይ ጥያቄ", "See score": "ውጤቱን እይ", "Another round": "ሌላ ዙር", "Choose topics": "ርዕስ ምረጥ", "Review": "ክለሳ",
    "Excellent.": "በጣም ጥሩ።", "Good. Review the ones you missed.": "ጥሩ። የሳቷቸውን ይከልሱ።", "Keep practising. Open the linked pages to review.": "ልምምድዎን ይቀጥሉ። ለመከለስ የተያያዙትን ገጾች ይክፈቱ።",
    "Drip rate": "የጠብታ ፍጥነት", "Dose by weight": "በክብደት መጠን", "First line": "የመጀመሪያ ምርጫ", "Stock-out": "የመድኃኒት እጥረት", "Interaction": "መስተጋብር",
    /* ---- ward board & pregnancy ---- */
    "Ward": "ክፍል", "Ward board": "የክፍል ሰሌዳ", "Shift handover": "የፈረቃ ርክክብ", "Add bed": "አልጋ ጨምር", "Add a bed": "አልጋ ጨምር", "Add the first bed": "የመጀመሪያውን አልጋ ጨምር",
    "Every bed on one screen: who is sick, what is due, and what to hand over.": "ሁሉም አልጋዎች በአንድ ስክሪን፦ ማን እንደታመመ፣ ምን እንደሚሰጥ እና ምን እንደሚረከብ።",
    "Stored only on this device. Use bed numbers and initials, never full names. Clear beds when patients leave.": "በዚህ መሣሪያ ላይ ብቻ ይቀመጣል። የአልጋ ቁጥርና የስም መነሻ ፊደላትን ይጠቀሙ፣ ሙሉ ስም በፍጹም አይጻፉ። ታካሚዎች ሲወጡ አልጋዎቹን ያጽዱ።",
    "beds on board": "በሰሌዳው ላይ ያሉ አልጋዎች", "unstable": "ያልተረጋጋ", "on watch": "በክትትል", "doses overdue": "የዘገዩ መጠኖች", "doses due soon": "በቅርቡ የሚሰጡ መጠኖች", "open tasks": "ያልተጠናቀቁ ተግባራት",
    "No beds yet": "ገና አልጋ የለም", "Unstable": "ያልተረጋጋ", "Watch": "በክትትል", "Stable": "የተረጋጋ", "Update": "አዘምን", "Schedule": "መርሐ ግብር", "Use weight": "ክብደቱን ተጠቀም", "Discharge": "አስወጣ",
    "No working diagnosis yet": "ገና የሥራ ምርመራ የለም", "Recent handovers": "የቅርብ ጊዜ ርክክቦች", "Clear the whole board": "ሰሌዳውን በሙሉ አጽዳ",
    "Add each patient you are looking after: bed number, initials, weight and what is going on. Start dose schedules from a bed so they appear on the board and in the handover.": "የሚከታተሏቸውን ታካሚዎች ያክሉ፦ የአልጋ ቁጥር፣ የስም መነሻ ፊደላት፣ ክብደት እና ያለውን ሁኔታ። በሰሌዳውና በርክክቡ እንዲታዩ የመድኃኒት መርሐ ግብሮችን ከአልጋው ይጀምሩ።",
    "Patient": "ታካሚ", "Bed": "አልጋ", "Initials (not full name)": "የስም መነሻ ፊደላት (ሙሉ ስም አይደለም)", "Gestational age if pregnant (weeks)": "እርጉዝ ከሆነች የእርግዝና ጊዜ (ሳምንት)", "Working case": "የሥራ ሁኔታ",
    "Working diagnosis / problem": "የሥራ ምርመራ / ችግር", "Allergies": "አለርጂዎች", "Illness severity": "የሕመሙ ክብደት", "Handover notes": "የርክክብ ማስታወሻዎች",
    "Summary (what happened, what we are doing)": "ማጠቃለያ (ምን እንደተከሰተ፣ ምን እያደረግን እንደሆነ)", "If this happens, then… (contingency plan)": "ይህ ከተከሰተ… (የተጠባባቂ ዕቅድ)",
    "Last observations": "የመጨረሻ ምልከታዎች", "Pulse": "የልብ ምት", "Resp. rate": "የትንፋሽ ምት", "Temp °C": "ሙቀት °C", "Tasks": "ተግባራት", "Add task": "ተግባር ጨምር",
    "Add to board": "ወደ ሰሌዳው ጨምር", "Save bed": "አልጋውን አስቀምጥ", "Start a dose schedule": "የመድኃኒት መርሐ ግብር ጀምር", "Bed added.": "አልጋው ተጨምሯል።", "Bed saved.": "አልጋው ተቀምጧል።",
    "Enter a bed number.": "የአልጋ ቁጥር ያስገቡ።", "Use initials only, not a full name.": "የስም መነሻ ፊደላትን ብቻ ይጠቀሙ፣ ሙሉ ስም አይደለም።", "That bed is already on the board.": "ያ አልጋ አስቀድሞ በሰሌዳው ላይ አለ።",
    "Remove this bed from the board? Its dose schedules are ended too.": "ይህን አልጋ ከሰሌዳው ላስወግድ? የመድኃኒት መርሐ ግብሮቹም ይቋረጣሉ።",
    "Clear every bed from this device? Linked dose schedules are ended too.": "ከዚህ መሣሪያ ሁሉንም አልጋዎች ላጽዳ? የተያያዙ የመድኃኒት መርሐ ግብሮችም ይቋረጣሉ።",
    "The ward board is empty": "የክፍሉ ሰሌዳ ባዶ ነው", "Add beds on the ward board first.": "መጀመሪያ በክፍሉ ሰሌዳ ላይ አልጋዎችን ያክሉ።", "Record the handover": "ርክክቡን መዝግብ",
    "Handed over by (initials)": "ያስረከበው (የስም መነሻ ፊደላት)", "Received by (initials)": "የተረከበው (የስም መነሻ ፊደላት)", "Record handover": "ርክክቡን መዝግብ",
    "Kept on this device with the time, for the ward's own record.": "ለክፍሉ መዝገብ ከሰዓቱ ጋር በዚህ መሣሪያ ላይ ይቀመጣል።", "Receiver has read back the plan": "ተረካቢው ዕቅዱን መልሶ አንብቧል",
    "Enter both sets of initials.": "የሁለቱንም የስም መነሻ ፊደላት ያስገቡ።", "Handover recorded.": "ርክክቡ ተመዝግቧል።",
    "No doses due in the next 12 hours and no open tasks.": "በሚቀጥሉት 12 ሰዓታት የሚሰጥ መጠንም ያልተጠናቀቀ ተግባርም የለም።", "No contingency plan written.": "የተጠባባቂ ዕቅድ አልተጻፈም።",
    "Linked to the ward board: the schedule will show on this bed.": "ከክፍሉ ሰሌዳ ጋር ተያይዟል፦ መርሐ ግብሩ በዚህ አልጋ ላይ ይታያል።",
    "Every bed on one screen with acuity, doses due and tasks, and an I-PASS shift handover.": "ሁሉም አልጋዎች ከክብደታቸው፣ ከሚሰጡ መጠኖችና ከተግባራት ጋር በአንድ ስክሪን፣ እና የI-PASS የፈረቃ ርክክብ።",
    "Pregnancy dating wheel": "የእርግዝና ቀን ማስያ", "Pregnancy dates": "የእርግዝና ቀናት",
    "Due date and gestational age in Ethiopian and Gregorian dates, milestones, ANC contacts and fetal weight.": "የመውለጃ ቀንና የእርግዝና ጊዜ በኢትዮጵያና በግሪጎሪያን ቀን፣ ወሳኝ ቀናት፣ የቅድመ ወሊድ ክትትልና የፅንስ ክብደት።",
    "Due date, gestational age, milestones and antenatal contacts, in Ethiopian and Gregorian dates.": "የመውለጃ ቀን፣ የእርግዝና ጊዜ፣ ወሳኝ ቀናትና የቅድመ ወሊድ ክትትሎች በኢትዮጵያና በግሪጎሪያን ቀን።",
    "Ultrasound": "አልትራሳውንድ", "IVF transfer": "የIVF ሽል ዝውውር", "Conception": "ፅንስ", "Gregorian": "ግሪጎሪያን", "Ethiopian": "ኢትዮጵያ",
    "First day of last normal menstrual period": "የመጨረሻው መደበኛ የወር አበባ የመጀመሪያ ቀን", "Date of the ultrasound": "አልትራሳውንድ የተሠራበት ቀን", "Date of embryo transfer": "ሽሉ የተዛወረበት ቀን", "Date of conception or insemination": "ፅንስ ወይም ማዳቀል የተከናወነበት ቀን",
    "Usual cycle length (days)": "የተለመደው የወር አበባ ዑደት (ቀናት)", "Gestational age on scan: weeks": "በምርመራው ላይ የእርግዝና ጊዜ፦ ሳምንት", "days": "ቀናት", "Embryo age at transfer": "በዝውውር ጊዜ የሽሉ ዕድሜ",
    "Day 5 (blastocyst)": "ቀን 5 (ብላስቶሲስት)", "Day 3": "ቀን 3", "Gestational age today": "የዛሬው የእርግዝና ጊዜ", "Estimated due date": "የሚገመተው የመውለጃ ቀን", "Dates counted from": "ቀናት የሚቆጠሩት ከ",
    "Milestone dates": "ወሳኝ ቀናት", "Antenatal care contacts": "የቅድመ ወሊድ ክትትሎች", "WHO 2016 eight-contact model for mothers classified for basic care.": "ለመሠረታዊ ክትትል ለተመደቡ እናቶች የWHO 2016 ስምንት-ክትትል ሞዴል።",
    "Next": "ቀጣይ", "Review if undelivered": "ካልወለደች ክለሳ", "Share dates": "ቀናቱን አጋራ", "Compare LNMP with ultrasound": "LNMPን ከአልትራሳውንድ ጋር አወዳድር",
    "When both are known, ACOG Committee Opinion 700 says which dates to use. Enter the LNMP and the ultrasound findings.": "ሁለቱም ሲታወቁ ACOG Committee Opinion 700 የትኛውን ቀን መጠቀም እንዳለብን ይገልጻል። LNMPንና የአልትራሳውንድ ውጤቱን ያስገቡ።",
    "Ultrasound date": "የአልትራሳውንድ ቀን", "GA on scan (w + d)": "በምርመራው የእርግዝና ጊዜ (ሳ + ቀ)", "Use the ultrasound dates.": "የአልትራሳውንድ ቀናትን ይጠቀሙ።", "Keep the LNMP dates.": "የLNMP ቀናትን ይያዙ።",
    "Estimated fetal weight": "የሚገመት የፅንስ ክብደት", "Amniotic fluid index": "የእንሽርት ውሃ መጠን (AFI)", "or EFW from report (g)": "ወይም ከሪፖርቱ EFW (ግ)", "Gestational age (weeks)": "የእርግዝና ጊዜ (ሳምንት)",
    "Deepest vertical pocket in each of the four quadrants, in cm.": "በአራቱም ክፍሎች ያለው ጥልቁ ቀጥ ያለ ኪስ፣ በሴ.ሜ.።", "Within the normal range.": "በመደበኛ ክልል ውስጥ ነው።",
    "That date is in the future. Check the date and calendar.": "ያ ቀን ገና ያልደረሰ ነው። ቀኑንና የቀን አቆጣጠሩን ያረጋግጡ።", "More than 44 weeks: check the date and calendar.": "ከ44 ሳምንት በላይ፦ ቀኑንና የቀን አቆጣጠሩን ያረጋግጡ።",
    "Date from": "ቀን ከ", "Calendar": "የቀን አቆጣጠር", "Network": "ትስስር", "Practice notes and stock-outs reported by colleagues across Ethiopia.": "በመላው ኢትዮጵያ ባልደረቦች የተዘገቡ የተግባር ማስታወሻዎችና የመድኃኒት እጥረቶች።",
    "Calculate": "አስላ", "Day": "ቀን", "Month": "ወር", "Year": "ዓመት", "Send to ward bed…": "ወደ ክፍል አልጋ ላክ…", "Save to bed": "ወደ አልጋው አስቀምጥ", "Choose a bed.": "አልጋ ይምረጡ።",
    "Enter the first day of the last normal menstrual period.": "የመጨረሻው መደበኛ የወር አበባ የመጀመሪያ ቀን ያስገቡ።", "Enter the ultrasound date and the gestational age measured on that scan.": "አልትራሳውንድ የተሠራበትን ቀንና በዚያ የተለካውን የእርግዝና ጊዜ ያስገቡ።",
    "Enter the date of the embryo transfer.": "ሽሉ የተዛወረበትን ቀን ያስገቡ።", "Enter the date of conception.": "ፅንስ የተከሰተበትን ቀን ያስገቡ።",
    "Gestational age, the due date, milestones and ANC contacts appear here as soon as the date is complete. On some phones, tap Calculate after choosing the date.": "ቀኑ እንደተሟላ የእርግዝና ጊዜ፣ የመውለጃ ቀን፣ ወሳኝ ቀናትና የቅድመ ወሊድ ክትትሎች እዚህ ይታያሉ። በአንዳንድ ስልኮች ቀኑን ከመረጡ በኋላ \"አስላ\"ን ይንኩ።",
    "Gestational age (weeks, filled from the dates)": "የእርግዝና ጊዜ (ሳምንት፣ ከቀናቱ የሚሞላ)", "If pregnant: LNMP (gestational age is calculated)": "እርጉዝ ከሆነች፦ LNMP (የእርግዝና ጊዜ ይሰላል)", "or gestational age today (weeks)": "ወይም የዛሬው የእርግዝና ጊዜ (ሳምንት)",
    "Pregnancy dates saved to the bed. Gestational age now updates on the ward board.": "የእርግዝና ቀናት ወደ አልጋው ተቀምጠዋል። የእርግዝና ጊዜ አሁን በክፍሉ ሰሌዳ ላይ ይዘምናል።",
    "Check the LNMP: it gives a gestational age outside 0 to 45 weeks.": "LNMPን ያረጋግጡ፦ ከ0 እስከ 45 ሳምንት ውጭ የሆነ የእርግዝና ጊዜ ይሰጣል።", "Check the date: outside 0 to 45 weeks.": "ቀኑን ያረጋግጡ፦ ከ0 እስከ 45 ሳምንት ውጭ ነው።",
    /* ---- child growth ---- */
    "Child growth": "የሕፃናት ዕድገት", "Measure a child": "ሕፃን ይለኩ", "Assess growth": "ዕድገቱን ገምግም", "Growth chart": "የዕድገት ሰንጠረዥ", "All children": "ሁሉም ሕፃናት",
    "Z-scores and centiles against the WHO standards, with growth charts you can plot visit by visit.": "ከWHO መስፈርቶች ጋር የሚነጻጸሩ Z-ነጥቦችና ፐርሰንታይሎች፣ በየክትትሉ የሚሞሉ የዕድገት ሰንጠረዦች።",
    "WHO z-scores and centiles for weight, height, MUAC and head circumference, with growth charts.": "ለክብደት፣ ለቁመት፣ ለMUAC እና ለራስ ዙሪያ የWHO z-ነጥቦችና ፐርሰንታይሎች፣ ከዕድገት ሰንጠረዦች ጋር።",
    "Date of birth": "የትውልድ ቀን", "or age (months)": "ወይም ዕድሜ (ወር)", "Date measured": "የተለካበት ቀን", "Length or height": "ተኝቶ ወይም ቆሞ መለካት",
    "By age (lying under 2 y)": "በዕድሜ (ከ2 ዓመት በታች ተኝቶ)", "Lying (length)": "ተኝቶ (ርዝመት)", "Standing (height)": "ቆሞ (ቁመት)",
    "Length / height (cm)": "ርዝመት / ቁመት (ሴ.ሜ.)", "MUAC (cm)": "MUAC (ሴ.ሜ.)", "Head circumference (cm)": "የራስ ዙሪያ (ሴ.ሜ.)", "Bilateral pitting oedema": "የሁለቱም እግሮች እብጠት",
    "No date of birth? Enter the age in months instead.": "የትውልድ ቀን የለም? በምትኩ ዕድሜውን በወር ያስገቡ።", "Children on this device": "በዚህ መሣሪያ ላይ ያሉ ሕፃናት",
    "Stored only on this device, with initials. Remove a child when the record is no longer needed.": "በዚህ መሣሪያ ላይ ብቻ በስም መነሻ ፊደላት ይቀመጣል። መዝገቡ ካላስፈለገ ሕፃኑን ያስወግዱ።",
    "Remove this child's growth record from this device?": "የዚህን ሕፃን የዕድገት መዝገብ ከዚህ መሣሪያ ላስወግድ?", "Add visit": "ክትትል ጨምር", "Visits": "ክትትሎች", "Visit added.": "ክትትሉ ተጨምሯል።",
    "Enter the date of birth or the age in months.": "የትውልድ ቀን ወይም ዕድሜን በወር ያስገቡ።", "Enter at least one measurement.": "ቢያንስ አንድ ልኬት ያስገቡ።", "These standards cover birth to 19 years.": "እነዚህ መስፈርቶች ከልደት እስከ 19 ዓመት ይሸፍናሉ።",
    "Enter the age in months.": "ዕድሜን በወር ያስገቡ።", "Lines are the WHO −3, −2, 0, +2 and +3 SD curves. Dots are this child's visits.": "መስመሮቹ የWHO −3፣ −2፣ 0፣ +2 እና +3 SD ኩርባዎች ናቸው። ነጥቦቹ የዚህ ሕፃን ክትትሎች ናቸው።",
    "Weight-for-age": "ክብደት-ለዕድሜ", "Length/height-for-age": "ርዝመት/ቁመት-ለዕድሜ", "Head circumference-for-age": "የራስ ዙሪያ-ለዕድሜ", "Weight-for-length": "ክብደት-ለርዝመት",
    "Weight-for-height": "ክብደት-ለቁመት", "MUAC-for-age": "MUAC-ለዕድሜ", "girl": "ሴት ልጅ", "boy": "ወንድ ልጅ", "visit": "ክትትል", "visits": "ክትትሎች",
    /* ---- optics and refraction ---- */
    "Optics and refraction": "የዓይን ብርሃንና የመነጽር ልኬት", "Eye & vision": "ዓይንና ዕይታ", "Eye conditions": "የዓይን በሽታዎች",
    "Transpose a prescription, work out the reading add, convert visual acuity and size a magnifier.": "የመነጽር ትዕዛዝን ይለውጡ፣ የንባብ ተጨማሪ ኃይል ያስሉ፣ የዕይታ ጥራትን ይቀይሩ እና የማጉያ መጠን ይወስኑ።",
    "Prescription maths, the reading add, acuity conversion and low-vision magnification — for outreach clinics with a trial set and no computer.": "የመነጽር ትዕዛዝ ሒሳብ፣ የንባብ ተጨማሪ ኃይል፣ የዕይታ ጥራት ልውውጥ እና የዝቅተኛ ዕይታ ማጉያ — ኮምፒውተር ለሌላቸው የተንቀሳቃሽ ክሊኒኮች።",
    "Prescription": "የመነጽር ትዕዛዝ", "Reading add": "የንባብ ተጨማሪ ኃይል", "Visual acuity": "የዕይታ ጥራት", "Prism": "ፕሪዝም", "Low vision": "ዝቅተኛ ዕይታ",
    "Prescription: transpose, average and move to the cornea": "የመነጽር ትዕዛዝ፡ መለወጥ፣ አማካይ ማውጣትና ወደ ኮርኒያ ማዛወር",
    "Enter the spectacle prescription for one eye. Leave the cylinder empty for a sphere.": "የአንድ ዓይንን የመነጽር ትዕዛዝ ያስገቡ። ስፌሪካል ብቻ ከሆነ ሲሊንደሩን ባዶ ይተዉት።",
    "Spectacle sphere (D)": "የመነጽር ስፌር (D)", "Cylinder (D)": "ሲሊንደር (D)", "Axis (°)": "አክሲስ (°)", "Vertex distance (mm)": "የመነጽር-ዓይን ርቀት (ሚ.ሜ.)",
    "Work it out": "አስላ", "How this is worked out": "እንዴት እንደተሰላ", "Power cross": "የኃይል መስቀል",
    "Minus cylinder form": "በማይነስ ሲሊንደር", "Plus cylinder form": "በፕላስ ሲሊንደር", "Spherical equivalent": "ስፌሪካል አቻ",
    "Enter a sphere or a cylinder.": "ስፌር ወይም ሲሊንደር ያስገቡ።", "Check the numbers.": "ቁጥሮቹን ያረጋግጡ።",
    "Near point (cm, print blurs)": "የቅርብ ነጥብ (ሴ.ሜ.፣ ጽሑፉ የሚደበዝዝበት)", "or age (years)": "ወይም ዕድሜ (ዓመት)", "Working distance (cm)": "የሥራ ርቀት (ሴ.ሜ.)",
    "Work out the add": "ተጨማሪ ኃይሉን አስላ", "No add needed yet": "እስካሁን ተጨማሪ ኃይል አያስፈልግም",
    "Measure the amplitude if you can: hold small print and bring it in until it blurs, with the distance glasses on. Otherwise give the age and the tool estimates it.": "ከተቻለ ይለኩ፡ የሩቅ መነጽሩን አድርገው ትንሽ ጽሑፍ ይዘው እስኪደበዝዝ ድረስ ወደ ዓይን ያቅርቡ። ካልሆነ ዕድሜውን ያስገቡና መሣሪያው ይገምታል።",
    "Enter the near point or the age.": "የቅርብ ነጥቡን ወይም ዕድሜውን ያስገቡ።", "Amplitude of accommodation": "የዓይን የማስተካከል አቅም",
    "Type it any way you have it: 6/18, 20/70, 0.3, logMAR 0.5, or CF, HM, LP, NLP.": "እንዳለዎት ይጻፉት፡ 6/18፣ 20/70፣ 0.3፣ logMAR 0.5 ወይም CF፣ HM፣ LP፣ NLP።",
    "Right eye": "ቀኝ ዓይን", "Left eye": "ግራ ዓይን", "Convert": "ቀይር", "Enter an acuity.": "የዕይታ ጥራት ያስገቡ።",
    "Measuring acuity without a lane": "ረጅም ክፍል ሳይኖር ዕይታን መለካት", "Metric": "በሜትር", "Feet": "በጫማ", "Decimal": "ዲሲማል", "WHO category": "የWHO ደረጃ",
    "Counting fingers": "ጣቶችን መቁጠር", "Hand movements": "የእጅ እንቅስቃሴ", "Light perception": "ብርሃን ማየት", "No light perception": "ብርሃን አለማየት",
    "No or mild vision impairment": "የዕይታ ችግር የለም ወይም ቀላል", "Mild vision impairment": "ቀላል የዕይታ ችግር", "Moderate vision impairment": "መካከለኛ የዕይታ ችግር",
    "Severe vision impairment": "ከባድ የዕይታ ችግር", "Blindness": "ዕውርነት",
    "Induced prism (Prentice rule)": "የሚፈጠር ፕሪዝም (የፕሬንቲስ ሕግ)", "Distance off centre (mm)": "ከመሃል ርቀት (ሚ.ሜ.)", "Lens power (D)": "የሌንስ ኃይል (D)",
    "Calculate": "አስላ", "Enter both numbers.": "ሁለቱንም ቁጥሮች ያስገቡ።", "Anisometropia in downgaze": "ወደታች ሲታይ የሁለቱ ዓይኖች ልዩነት",
    "Right lens, vertical power (D)": "የቀኝ ሌንስ ቀጥታ ኃይል (D)", "Left lens, vertical power (D)": "የግራ ሌንስ ቀጥታ ኃይል (D)",
    "Reading gaze below centre (mm)": "የንባብ እይታ ከመሃል በታች (ሚ.ሜ.)", "Check the imbalance": "አለመመጣጠኑን ያረጋግጡ", "Enter both lens powers.": "የሁለቱንም ሌንሶች ኃይል ያስገቡ።",
    "Low vision: how much magnification": "ዝቅተኛ ዕይታ፡ ምን ያህል ማጉላት", "Best corrected acuity": "በመነጽር የተገኘ ከፍተኛ ዕይታ",
    "Acuity the task needs": "ሥራው የሚጠይቀው ዕይታ", "What to do with the number": "በቁጥሩ ምን ማድረግ እንዳለብዎ",
    "Enter the acuity, for example 6/60.": "የዕይታ ጥራቱን ያስገቡ፣ ለምሳሌ 6/60።",
    "For a patient whose vision cannot be improved further with glasses or surgery.": "በመነጽርም ሆነ በቀዶ ጥገና ዕይታው ሊሻሻል ለማይችል ታካሚ።",
    "Every lens acts as a prism away from its optical centre: Δ = h × D, with h in centimetres.": "እያንዳንዱ ሌንስ ከመሃሉ ውጭ እንደ ፕሪዝም ይሠራል፡ Δ = h × D፣ h በሴንቲሜትር።",
    /* ---- psychiatry ---- */
    "Agitation": "መረበሽ", "Alcohol withdrawal": "የአልኮል ማቋረጥ ምልክቶች", "Suicide risk": "ራስን የማጥፋት ስጋት", "Psychosis": "ሳይኮሲስ",
    "Alcohol withdrawal score": "የአልኮል ማቋረጥ ውጤት", "Alcohol withdrawal score (CIWA-Ar)": "የአልኮል ማቋረጥ ውጤት (CIWA-Ar)",
    "CIWA-Ar scoring with the action for each score and a record of scores over time.": "የCIWA-Ar ውጤት፣ ለእያንዳንዱ ውጤት የሚወሰድ እርምጃ እና በጊዜ ሂደት የውጤቶች መዝገብ።",
    "Score each item from what you see and what the patient tells you. Not valid if the patient cannot communicate, or when symptoms may be from another cause such as sepsis, head injury, hypoglycaemia or hepatic encephalopathy.": "እያንዳንዱን ንጥል ከሚያዩት እና ታካሚው ከሚነግርዎ ይመዝኑ። ታካሚው መናገር ካልቻለ ወይም ምልክቶቹ እንደ ሴፕሲስ፣ የጭንቅላት ጉዳት፣ የስኳር መውረድ ወይም የጉበት ችግር ካሉ ሌላ ምክንያት ሊሆኑ ከቻሉ አይሠራም።",
    "Record this score": "ይህን ውጤት መዝግብ", "Alcohol withdrawal case": "የአልኮል ማቋረጥ ሁኔታ", "Scores recorded on this device": "በዚህ መሣሪያ የተመዘገቡ ውጤቶች",
    "No scores recorded yet.": "ገና የተመዘገበ ውጤት የለም።", "Clear scores": "ውጤቶችን አጽዳ", "Score": "ውጤት", "Label": "ደረጃ",
    "Minimal withdrawal": "ቀላል የማቋረጥ ምልክቶች", "Moderate withdrawal": "መካከለኛ የማቋረጥ ምልክቶች", "Severe withdrawal": "ከባድ የማቋረጥ ምልክቶች", "Absent to mild withdrawal": "የሌለ ወይም ቀላል የማቋረጥ ምልክት", "Very severe withdrawal — high risk of seizures and delirium tremens": "በጣም ከባድ የማቋረጥ ምልክት — የሚጥልና የዴሊሪየም ትሬመንስ ስጋት ከፍተኛ ነው",
    "Thresholds vary between protocols: follow your hospital's.": "ወሰኖቹ በፕሮቶኮሎች መካከል ይለያያሉ፤ የሆስፒታልዎን ይከተሉ።",
    /* ---- clinical sign-off & stock ---- */
    "Clinical sign-off": "የሕክምና ማረጋገጫ ፊርማ", "signed off": "የተፈረመ", "changed since sign-off": "ከፊርማው በኋላ የተቀየረ", "changes requested": "ለውጥ የተጠየቀ", "not yet reviewed": "ገና ያልተከለሰ",
    "Every entry stays a draft until a verified pharmacist or physician checks it and signs it off here. A sign-off is tied to the exact content: if the entry changes later, it shows as changed and needs checking again.": "እያንዳንዱ መረጃ የተረጋገጠ ፋርማሲስት ወይም ሐኪም እዚህ እስኪያረጋግጠውና እስኪፈርምበት ድረስ ረቂቅ ሆኖ ይቆያል። ፊርማው ከትክክለኛው ይዘት ጋር የተያያዘ ነው፤ መረጃው ከተቀየረ እንደተቀየረ ይታያል፣ እንደገናም መረጋገጥ አለበት።",
    "Sign-off needs the full MedBridge app with accounts. This copy shows the content only.": "ፊርማ መለያ ያለውን ሙሉ የሜድብሪጅ መተግበሪያ ይፈልጋል። ይህ ቅጂ ይዘቱን ብቻ ያሳያል።",
    "with a reviewer account to sign off entries. Anyone can see the status below.": "በገምጋሚ መለያ ይግቡና መረጃዎችን ይፈርሙ። ከታች ያለውን ሁኔታ ማንኛውም ሰው ማየት ይችላል።",
    "Your account can view sign-off status but cannot sign off. An administrator can make a verified pharmacist or physician a reviewer.": "መለያዎ የፊርማ ሁኔታን ማየት ይችላል፤ መፈረም ግን አይችልም። አስተዳዳሪ የተረጋገጠ ፋርማሲስት ወይም ሐኪምን ገምጋሚ ማድረግ ይችላል።",
    "All": "ሁሉም", "Not reviewed": "ያልተከለሰ", "Changed": "የተቀየረ", "Changes": "ለውጦች", "Signed off": "ተፈርሟል", "Choose a drug to review.": "ለመከለስ መድኃኒት ይምረጡ።",
    "Filter drugs": "መድኃኒቶችን አጣራ", "Status filter": "የሁኔታ ማጣሪያ", "Open the full entry": "ሙሉውን መረጃ ክፈት", "Checklist": "የማረጋገጫ ዝርዝር",
    "Doses, units and maximums match the cited sources": "መጠኖች፣ መለኪያዎችና ከፍተኛ ገደቦች ከተጠቀሱት ምንጮች ጋር ይስማማሉ",
    "No-pump methods are safe and workable as written": "ያለ ፓምፕ ዘዴዎቹ እንደተጻፉት ደህንነታቸው የተጠበቀና ተግባራዊ ናቸው",
    "Paediatric and newborn doses checked": "የሕፃናትና የአራስ መጠኖች ተረጋግጠዋል",
    "Cautions, pregnancy, kidney and liver advice, interactions and antidote checked": "ጥንቃቄዎች፣ የእርግዝና፣ የኩላሊትና የጉበት ምክሮች፣ መስተጋብሮችና ማርከሻ ተረጋግጠዋል",
    "Consistent with Ethiopian national guidelines and the EFDA formulary": "ከኢትዮጵያ ብሔራዊ መመሪያዎችና ከEFDA የመድኃኒት ዝርዝር ጋር ይስማማል",
    "Note for the record (required when asking for changes)": "ለመዝገብ ማስታወሻ (ለውጥ ሲጠየቅ ግዴታ ነው)", "What you checked, what needs correcting, which source you used": "ምን እንዳረጋገጡ፣ ምን መታረም እንዳለበት፣ የትኛውን ምንጭ እንደተጠቀሙ",
    "Sign off this version": "ይህን ስሪት ፈርም", "Request changes": "ለውጥ ጠይቅ", "Signed off.": "ተፈርሟል።", "Change request recorded.": "የለውጥ ጥያቄው ተመዝግቧል።",
    "Tick every checklist item before signing off.": "ከመፈረምዎ በፊት ሁሉንም የማረጋገጫ ዝርዝሮች ይምረጡ።", "Describe the changes needed.": "የሚያስፈልጉትን ለውጦች ይግለጹ።",
    "Sign-off history": "የፊርማ ታሪክ", "Open in clinical sign-off": "በሕክምና ማረጋገጫ ፊርማ ክፈት", "No sign-off recorded yet.": "ገና የተመዘገበ ፊርማ የለም።",
    "Loading sign-off history…": "የፊርማ ታሪክ በመጫን ላይ…", "Sign-off history needs a connection.": "የፊርማ ታሪክ ግንኙነት ይፈልጋል።",
    "Reviewer asked for changes": "ገምጋሚው ለውጥ ጠይቋል", "Reviewer": "ገምጋሚ", "Clinical reviewer": "የሕክምና ገምጋሚ", "Make reviewer": "ገምጋሚ አድርግ", "Remove reviewer": "ገምጋሚነትን አንሳ",
    "Each entry must be checked by a pharmacist or physician against these sources and the national formulary before clinical use.": "እያንዳንዱ መረጃ ለሕክምና ከመዋሉ በፊት በፋርማሲስት ወይም በሐኪም ከነዚህ ምንጮችና ከብሔራዊ የመድኃኒት ዝርዝር ጋር መረጋገጥ አለበት።",
    "Only verified clinical reviewers can sign off drug entries.": "የመድኃኒት መረጃዎችን መፈረም የሚችሉት የተረጋገጡ የሕክምና ገምጋሚዎች ብቻ ናቸው።",
    "Drug, content version and decision are required.": "መድኃኒት፣ የይዘት ስሪትና ውሳኔ ያስፈልጋሉ።", "Tick every checklist item before approving.": "ከማጽደቅዎ በፊት ሁሉንም የማረጋገጫ ዝርዝሮች ይምረጡ።",
    "Stock across Ethiopia": "በመላው ኢትዮጵያ ያለ የመድኃኒት ክምችት", "No stock problems reported for this drug.": "ለዚህ መድኃኒት የተዘገበ የክምችት ችግር የለም።",
    "Out of stock here": "እዚህ አልቋል", "Running low": "እያለቀ ነው", "Back in stock": "ተመልሶ ገብቷል", "Out of stock": "አልቋል", "In stock": "አለ",
    "e.g. only 5 ampoules left, expected next week": "ለምሳሌ 5 አምፑል ብቻ ቀርቷል፣ በሚቀጥለው ሳምንት ይጠበቃል", "Stock report saved.": "የክምችት ሪፖርቱ ተቀምጧል።", "Removed.": "ተወግዷል።",
    "to report stock at your facility.": "በተቋምዎ ያለውን ክምችት ሪፖርት ለማድረግ።", "Loading stock reports…": "የክምችት ሪፖርቶችን በመጫን ላይ…",
    "Stock-outs reported": "የተዘገቡ የመድኃኒት እጥረቶች", "Latest report per facility, last 30 days. Report from any drug page.": "ባለፉት 30 ቀናት ከእያንዳንዱ ተቋም የቅርብ ጊዜ ሪፖርት። ከማንኛውም የመድኃኒት ገጽ ሪፖርት ያድርጉ።",
    "No stock-outs reported in the last 30 days.": "ባለፉት 30 ቀናት የተዘገበ እጥረት የለም።", "Offline.": "ከመስመር ውጭ።",
    "Offline. Stock reports appear when you reconnect.": "ከመስመር ውጭ። ግንኙነት ሲመለስ የክምችት ሪፖርቶች ይታያሉ።", "Offline. Showing reports saved on this device.": "ከመስመር ውጭ። በዚህ መሣሪያ የተቀመጡ ሪፖርቶች እየታዩ ነው።",
    "Sign in to report stock.": "ክምችት ሪፖርት ለማድረግ ይግቡ።", "Drug and stock status are required.": "መድኃኒትና የክምችት ሁኔታ ያስፈልጋሉ።",
    /* ---- tools hub & setup ---- */
    "Check a patient's medicines against each other for harmful combinations.": "የታካሚውን መድኃኒቶች ጎጂ ጥምረት ካላቸው አንዱን ከሌላው ጋር ያረጋግጡ።",
    "Doses and intervals for one baby by weight, gestation and age in days.": "ለአንድ ሕፃን በክብደት፣ በእርግዝና ጊዜና በቀናት ዕድሜ የሚሰሉ መጠኖችና የጊዜ ልዩነቶች።",
    "Fluids and blood": "ፈሳሽና ደም", "Maintenance, newborn fluids, burns, transfusion volume and oxygen cylinder time.": "መደበኛ ፈሳሽ፣ የአራስ ፈሳሽ፣ ቃጠሎ፣ የደም መጠንና የኦክስጅን ሲሊንደር ጊዜ።",
    "Creatinine clearance, then dose changes for each drug.": "የክሬቲኒን ክሊራንስ፣ ከዚያም ለእያንዳንዱ መድኃኒት የመጠን ለውጦች።",
    "Printable drip-rate tables, case protocols and ward drug cards.": "ሊታተሙ የሚችሉ የጠብታ ሠንጠረዦች፣ የሕመም ሁኔታ ፕሮቶኮሎችና የክፍል መድኃኒት ካርዶች።",
    "Dose maths, first-line drugs, never-mix and substitutes, with explanations.": "የመጠን ስሌት፣ የመጀመሪያ ምርጫ መድኃኒቶች፣ አትቀላቅሉና ተተኪዎች ከማብራሪያ ጋር።",
    "For verified reviewers: check each drug entry and sign it off.": "ለተረጋገጡ ገምጋሚዎች፦ እያንዳንዱን የመድኃኒት መረጃ አረጋግጠው ይፈርሙ።",
    "Show Ethiopian calendar dates": "የኢትዮጵያ የቀን አቆጣጠር አሳይ", "On schedules, charts, sign-offs and printouts, next to the international date.": "በመርሐ ግብሮች፣ በቻርቶች፣ በፊርማዎችና በሕትመቶች ላይ ከዓለም አቀፍ ቀን ጎን።",
    /* ---- server messages ---- */

    "Enter a valid email address.": "ትክክለኛ የኢሜይል አድራሻ ያስገቡ።", "Password must be at least 8 characters.": "የይለፍ ቃል ቢያንስ 8 ፊደላት መሆን አለበት።",
    "Enter your full name.": "ሙሉ ስምዎን ያስገቡ።", "Choose your profession.": "ሙያዎን ይምረጡ።", "Choose the city or town where you work.": "የሚሠሩበትን ከተማ ይምረጡ።",
    "Enter your hospital or health facility.": "ሆስፒታልዎን ወይም ጤና ተቋምዎን ያስገቡ።", "An account with that email already exists.": "በዚህ ኢሜይል መለያ አስቀድሞ አለ።",
    "Too many sign-ups from this device. Try again later.": "ከዚህ መሣሪያ በጣም ብዙ ምዝገባዎች። ቆይተው እንደገና ይሞክሩ።",
    "Too many attempts. Wait 15 minutes and try again.": "በጣም ብዙ ሙከራዎች። 15 ደቂቃ ቆይተው እንደገና ይሞክሩ።",
    "Email or password is incorrect.": "ኢሜይል ወይም የይለፍ ቃል ትክክል አይደለም።",
    "This account has been suspended. Contact the administrator.": "ይህ መለያ ታግዷል። አስተዳዳሪውን ያነጋግሩ።", "Sign in first.": "መጀመሪያ ይግቡ።",
    "Current password is incorrect.": "የአሁኑ የይለፍ ቃል ትክክል አይደለም።", "New password must be at least 8 characters.": "አዲሱ የይለፍ ቃል ቢያንስ 8 ፊደላት መሆን አለበት።",
    "Sign in to add a practice note.": "የተግባር ማስታወሻ ለመጨመር ይግቡ።", "Write at least a sentence describing how you administer it.": "እንዴት እንደሚሰጡት የሚገልጽ ቢያንስ አንድ ዓረፍተ ነገር ይጻፉ።",
    "You have posted a lot recently. Try again later.": "በቅርቡ ብዙ ለጥፈዋል። ቆይተው እንደገና ይሞክሩ።", "Not found.": "አልተገኘም።", "Not allowed.": "አይፈቀድም።",
    "Note is too short.": "ማስታወሻው በጣም አጭር ነው።", "Administrator only.": "ለአስተዳዳሪ ብቻ።", "No such user.": "እንዲህ ያለ ተጠቃሚ የለም።",
    "You cannot remove your own administrator access.": "የራስዎን የአስተዳዳሪ ፈቃድ ማስወገድ አይችሉም።", "Drug, title and steps are required.": "መድኃኒት፣ ርዕስና ደረጃዎች ያስፈልጋሉ።",
    "Server error.": "የአገልጋይ ስህተት።",

    /* professions & facility levels (display only; stored values stay English) */
    "physician": "ሐኪም", "general practitioner": "ጠቅላላ ሐኪም", "resident": "ሬዚደንት ሐኪም", "health officer": "ጤና ኦፊሰር", "nurse": "ነርስ",
    "midwife": "አዋላጅ ነርስ", "pharmacist": "ፋርማሲስት", "anaesthetist": "አኔስቴቲስት", "emergency surgical officer": "የድንገተኛ ቀዶ ሕክምና ኦፊሰር",
    "paramedic": "ፓራሜዲክ", "student": "ተማሪ", "other": "ሌላ",
    "health post": "ጤና ኬላ", "health centre": "ጤና ጣቢያ", "primary hospital": "የመጀመሪያ ደረጃ ሆስፒታል", "general hospital": "ጠቅላላ ሆስፒታል",
    "specialised/referral hospital": "ልዩ / ሪፈራል ሆስፒታል", "private clinic": "የግል ክሊኒክ",

    /* regions and cities (option labels only) */
    "Addis Ababa": "አዲስ አበባ", "Afar": "አፋር", "Amhara": "አማራ", "Benishangul-Gumuz": "ቤንሻንጉል ጉሙዝ", "Central Ethiopia": "ማዕከላዊ ኢትዮጵያ",
    "Dire Dawa": "ድሬዳዋ", "Gambela": "ጋምቤላ", "Harari": "ሐረሪ", "Oromia": "ኦሮሚያ", "Sidama": "ሲዳማ", "Somali": "ሶማሌ",
    "South Ethiopia": "ደቡብ ኢትዮጵያ", "Tigray": "ትግራይ", "Other / outside Ethiopia": "ሌላ / ከኢትዮጵያ ውጭ", "Other": "ሌላ",
    "Semera": "ሰመራ", "Asayita": "አሳይታ", "Dubti": "ዱብቲ", "Logiya": "ሎጊያ", "Awash": "አዋሽ", "Chifra": "ጭፍራ",
    "Bahir Dar": "ባሕር ዳር", "Gondar": "ጎንደር", "Dessie": "ደሴ", "Debre Birhan": "ደብረ ብርሃን", "Debre Markos": "ደብረ ማርቆስ", "Woldia": "ወልዲያ",
    "Kombolcha": "ኮምቦልቻ", "Debre Tabor": "ደብረ ታቦር", "Finote Selam": "ፍኖተ ሰላም", "Injibara": "እንጅባራ", "Motta": "ሞጣ", "Shewa Robit": "ሸዋ ሮቢት",
    "Lalibela": "ላሊበላ", "Assosa": "አሶሳ", "Bambasi": "ባምባሲ", "Gilgel Beles": "ግልገል በለስ", "Kamashi": "ካማሽ",
    "Hosaena": "ሆሳዕና", "Butajira": "ቡታጅራ", "Worabe": "ወራቤ", "Wolkite": "ወልቂጤ", "Durame": "ዱራሜ", "Halaba Kulito": "ሀላባ ቁሊቶ",
    "Itang": "ኢታንግ", "Abobo": "አቦቦ", "Harar": "ሐረር", "Adama": "አዳማ", "Jimma": "ጅማ", "Bishoftu": "ቢሾፍቱ", "Nekemte": "ነቀምቴ",
    "Shashemene": "ሻሸመኔ", "Asella": "አሰላ", "Ambo": "አምቦ", "Robe (Bale)": "ሮቤ (ባሌ)", "Goba": "ጎባ", "Metu": "መቱ", "Bedele": "በደሌ",
    "Gimbi": "ጊምቢ", "Dembi Dolo": "ደምቢ ዶሎ", "Wolisso": "ወሊሶ", "Fiche": "ፍቼ", "Modjo": "ሞጆ", "Ziway (Batu)": "ዝዋይ (ባቱ)", "Agaro": "አጋሮ",
    "Chiro": "ጭሮ", "Negele Borana": "ነገሌ ቦረና", "Yabelo": "ያቤሎ", "Holeta": "ሆለታ", "Sebeta": "ሰበታ", "Burayu": "ቡራዩ", "Mojo": "ሞጆ",
    "Bule Hora": "ቡሌ ሆራ", "Hawassa": "ሀዋሳ", "Yirgalem": "ይርጋለም", "Aleta Wondo": "አለታ ወንዶ", "Leku": "ለኩ", "Hagere Selam": "ሀገረ ሰላም",
    "Jigjiga": "ጅግጅጋ", "Gode": "ጎዴ", "Degehabur": "ደገሀቡር", "Kebri Dehar": "ቀብሪ ደሃር", "Werder": "ዋርዴር", "Shilabo": "ሺላቦ", "Dolo Ado": "ዶሎ አዶ",
    "Arba Minch": "አርባ ምንጭ", "Sodo (Wolaita)": "ሶዶ (ወላይታ)", "Jinka": "ጂንካ", "Sawla": "ሳውላ", "Dilla": "ዲላ", "Bonga": "ቦንጋ",
    "Mizan Teferi": "ሚዛን ተፈሪ", "Tepi": "ቴፒ", "Karat (Konso)": "ካራት (ኮንሶ)", "Mekelle": "መቐለ", "Adigrat": "ዓዲግራት", "Axum": "አክሱም",
    "Shire (Inda Selassie)": "ሽሬ (እንዳ ሥላሴ)", "Alamata": "አላማጣ", "Wukro": "ውቅሮ", "Humera": "ሁመራ", "Maychew": "ማይጨው", "Adwa": "ዓድዋ"
  };

  /* ---------------- patterns (text containing numbers or data) ---------------- */
  const P = (re, fn) => [re, fn];
  const tr = (s) => AM[s] ?? s;
  const PATTERNS = [
    P(/^(\d+) pre-dose checks? (?:is|are) not ticked\. Record the dose as given anyway\?$/, (m) => `${m[1]} ከመስጠት በፊት የሚደረጉ ፍተሻዎች አልተመረጡም። መጠኑን እንደተሰጠ ልመዝግብ?`),
    P(/^(\d+) mL total$/, (m) => `በአጠቃላይ ${m[1]} mL`),
    P(/^([\d.,]+) mL over ([\d.,]+) min$/, (m) => `${m[1]} mL በ${m[2]} ደቂቃ`),
    P(/^([\d.,]+) drops\/min \(([\d.,]+)\/15 s\)$/, (m) => `${m[1]} ጠብታ/ደቂቃ (${m[2]}/15 ሰከንድ)`),
    P(/^([\d.,]+) drops per 15 s · 1 drop every ([\d.,]+) s · (.+)$/, (m) => `በ15 ሰከንድ ${m[1]} ጠብታ · በየ${m[2]} ሰከንድ 1 ጠብታ · ${m[3]}`),
    P(/^= (.+) · ([\d.,]+) drops per 15 s \((\d+) drops\/mL set\)$/, (m) => `= ${m[1]} · በ15 ሰከንድ ${m[2]} ጠብታ (${m[3]} ጠብታ/mL መስመር)`),
    P(/^Concentration (.+) · delivers (.+) · (.+)\/day$/, (m) => `ክምችት ${m[1]} · የሚሰጠው ${m[2]} · ${m[3]}/ቀን`),
    P(/^(.+) · started (Today|Tomorrow|Yesterday) (.+)$/, (m) => `${m[1]} · የተጀመረው ${tr(m[2])} ${m[3]}`),
    P(/^(.+) · started (.+)$/, (m) => `${m[1]} · የተጀመረው ${m[2]}`),
    P(/^(.+) at (\d{1,2}:\d{2}.*)$/, (m) => `${m[1]} በ${m[2]}`),
    P(/^stock( · .+)?$/, (m) => ["stock", ...(m[1] || "").split(" · ").filter(Boolean)].map(tr).join(" · ")),
    P(/^(\d+) of (\d+) drugs$/, (m) => `${m[1]} / ${m[2]} መድኃኒቶች`),
    P(/^(\d+) of (\d+) clinical cases$/, (m) => `${m[1]} / ${m[2]} የሕመም ሁኔታዎች`),
    P(/^(.+) · (\d+) drugs?$/, (m) => `${tr(m[1])} · ${m[2]} መድኃኒቶች`),
    P(/^(.+) · (\d+) cases?$/, (m) => `${tr(m[1])} · ${m[2]} ሁኔታዎች`),
    P(/^(.+) \((\d+) drugs\)$/, (m) => `${tr(m[1])} (${m[2]} መድኃኒቶች)`),
    P(/^(\d+) no-pump methods?$/, (m) => `${m[1]} ያለ ፓምፕ ዘዴ${m[1] === "1" ? "" : "ዎች"}`),
    P(/^(.+) · (\d+) no-pump methods?$/, (m) => `${m[1]} · ${m[2]} ያለ ፓምፕ ዘዴ${m[2] === "1" ? "" : "ዎች"}`),
    P(/^\+(\d+) more$/, (m) => `+${m[1]} ተጨማሪ`),
    P(/^Doses for ([\d.,]+) kg$/, (m) => `ለ${m[1]} ኪ.ግ. መጠኖች`),
    P(/^For ([\d.,]+) kg \(estimated\)$/, (m) => `ለ${m[1]} ኪ.ግ. (ግምት)`),
    P(/^For ([\d.,]+) kg$/, (m) => `ለ${m[1]} ኪ.ግ.`),
    P(/^In (\d+) cases?$/, (m) => `በ${m[1]} ሁኔታዎች`),
    P(/^Quadrant (\d)( \(cm\))?$/, (m) => `ክፍል ${m[1]}${m[2] ? " (ሴ.ሜ.)" : ""}`),
    P(/^Trimester (\d)$/, (m) => `${m[1]}ኛ ሦስት ወር`),
    P(/^Contact (\d+)$/, (m) => `ክትትል ${m[1]}`),
    P(/^(\d+) weeks$/, (m) => `${m[1]} ሳምንት`),
    P(/^Bed (.+)$/, (m) => `አልጋ ${m[1]}`),
    P(/^in (\d+) days$/, (m) => `በ${m[1]} ቀናት ውስጥ`),
    P(/^(\d+) days past$/, (m) => `${m[1]} ቀናት አልፏል`),
    P(/^Pregnancy: (.+)$/, (m) => `እርግዝና፦ ${tr(m[1])}`),
    P(/^Breastfeeding: (.+)$/, (m) => `ጡት ማጥባት፦ ${tr(m[1])}`),
    P(/^Kidney: adjust for ([\d.,]+) mL\/min$/, (m) => `ኩላሊት፦ ለ${m[1]} mL/ደቂቃ ያስተካክሉ`),
    P(/^Their result \((.+)\)$/, (m) => `የእነሱ ውጤት (${m[1]})`),
    P(/^Report for (.+) \(optional note\)$/, (m) => `ለ${m[1]} ሪፖርት (አማራጭ ማስታወሻ)`),
    P(/^last (\d+) days$/, (m) => `ባለፉት ${m[1]} ቀናት`),
    P(/^Signed off by (.+?) · (.+)$/, (m) => `በ${m[1]} ተፈርሟል · ${m[2]}`),
    P(/^Changed since sign-off on (.+)$/, (m) => `${m[1]} ከተፈረመ በኋላ ተቀይሯል`),
    P(/^Content version (\w+) · (\d+) no-pump methods · (\d+) textbook references ·$/, (m) => `የይዘት ስሪት ${m[1]} · ${m[2]} ያለ ፓምፕ ዘዴዎች · ${m[3]} የመጽሐፍ ማጣቀሻዎች ·`),
    P(/^Signed as (.+)\. Your name is shown on the drug page\.$/, (m) => `የሚፈረመው በ${m[1]} ስም። ስምዎ በመድኃኒቱ ገጽ ላይ ይታያል።`),
    P(/^Lines for ([\d.,]+) mL\/min are highlighted\. Draft, check with a pharmacist\.$/, (m) => `ለ${m[1]} mL/ደቂቃ የሚመለከቱት መስመሮች ጎልተዋል። ረቂቅ፣ ከፋርማሲስት ጋር ያረጋግጡ።`),
    P(/^\((.+)\)\. The highlighted line applies\.$/, (m) => `(${m[1]})። የጎላው መስመር ይመለከታል።`),
    P(/^\((.+)\)\. No change listed at this level\.$/, (m) => `(${m[1]})። በዚህ ደረጃ የተዘረዘረ ለውጥ የለም።`),
    P(/^Score (\d+) recorded\.$/, (m) => `ውጤት ${m[1]} ተመዝግቧል።`),
    P(/^(\d+) \/ 67$/, (m) => `${m[1]} / 67`),
    P(/^Today: (.+)$/, (m) => `ዛሬ፦ ${m[1]}`),
    P(/^(.*?) ?Best: (\d+)\/10\.$/, (m) => `${m[1] ? tr(m[1]) + " " : ""}ምርጥ ውጤት፦ ${m[2]}/10።`),
    P(/^Question (\d+) of (\d+)$/, (m) => `ጥያቄ ${m[1]} ከ${m[2]}`),
    P(/^Score (\d+)$/, (m) => `ውጤት ${m[1]}`),
    P(/^Best for this set: (\d+) \/ (\d+)$/, (m) => `ለዚህ ስብስብ ምርጥ ውጤት፦ ${m[1]} / ${m[2]}`),
    P(/^Answer: (.+)\.$/, (m) => `መልስ፦ ${m[1]}።`),
    P(/^(\d+) interaction rules\. Draft reference; an absence here is not proof of safety\.$/, (m) => `${m[1]} የመስተጋብር ደንቦች። ረቂቅ ማጣቀሻ፤ እዚህ አለመኖሩ ደህንነትን አያረጋግጥም።`),
    P(/^Newborn dose · (.+) kg · (\d+) weeks · day (\d+)$/, (m) => `የአራስ መጠን · ${m[1]} ኪ.ግ. · ${m[2]} ሳምንት · ቀን ${m[3]}`),
    P(/^every (\d+) h$/, (m) => `በየ${m[1]} ሰዓቱ`),
    P(/^every (\d+) days$/, (m) => `በየ${m[1]} ቀኑ`),
    P(/^Loading (.+)$/, (m) => `የመጀመሪያ መጠን ${m[1]}`),
    P(/^Last check ([\d:]+.*) by (.+): (matched|did not match)\.$/, (m) => `የመጨረሻ ማረጋገጫ ${m[1]} በ${m[2]}፦ ${m[3] === "matched" ? "ተዛምዷል" : "አልተዛመደም"}።`),
    P(/^([\d.,]+) mL in 24 h$/, (m) => `በ24 ሰዓት ${m[1]} mL`),
    P(/^([\d.,]+) mL per 24 h · (.+)$/, (m) => `በ24 ሰዓት ${m[1]} mL · ${m[2]}`),
    P(/^([\d.,]+) mL (packed cells|whole blood)$/, (m) => `${m[1]} mL ${m[2] === "whole blood" ? "ሙሉ ደም" : "የተጨመቀ ቀይ የደም ሕዋስ"}`),
    P(/^([\d.,]+) weeks at birth$/, (m) => `ሲወለድ ${m[1]} ሳምንት`),
    P(/^day (\d+)$/, (m) => `ቀን ${m[1]}`),
    P(/^Doses now shown for ([\d.,]+) kg\.$/, (m) => `መጠኖች አሁን ለ${m[1]} ኪ.ግ. ይታያሉ።`),
    P(/^Patient weight set to ([\d.,]+) kg\.$/, (m) => `የታካሚ ክብደት ${m[1]} ኪ.ግ. ሆኗል።`),
    P(/^([\d.,]+) kg est\.$/, (m) => `${m[1]} ኪ.ግ. ግምት`),
    P(/^Setting: (.+?)(\.?)$/, (m) => `አካባቢ፦ ${m[1]}${m[2] ? "።" : ""}`),
    P(/^Start schedule: (.+)$/, (m) => `መርሐ ግብር ጀምር፦ ${m[1]}`),
    P(/^Schedule: (.+)$/, (m) => `መርሐ ግብር፦ ${m[1]}`),
    P(/^Open calculator for (.+)$/, (m) => `ማስያ ክፈት፦ ${m[1]}`),
    P(/^Drip guide at (\d+)\/min$/, (m) => `የጠብታ መመሪያ በ${m[1]}/ደቂቃ`),
    P(/^in (\d+) h (\d+) min$/, (m) => `በ${m[1]} ሰዓት ${m[2]} ደቂቃ ውስጥ`),
    P(/^in (\d+) min$/, (m) => `በ${m[1]} ደቂቃ ውስጥ`),
    P(/^(\d+) h (\d+) min overdue$/, (m) => `${m[1]} ሰዓት ${m[2]} ደቂቃ ዘግይቷል`),
    P(/^(\d+) min overdue$/, (m) => `${m[1]} ደቂቃ ዘግይቷል`),
    P(/^(Today|Tomorrow|Yesterday) (.+)$/, (m) => `${tr(m[1])} ${m[2]}`),
    P(/^All doses \((\d+)\)$/, (m) => `ሁሉም መጠኖች (${m[1]})`),
    P(/^Members \((\d+)\)$/, (m) => `አባላት (${m[1]})`),
    P(/^Moderation \((\d+)\)$/, (m) => `ክለሳ (${m[1]})`),
    P(/^Given ([\d:]+.*)$/, (m) => `ተሰጥቷል ${m[1]}`),
    P(/^Withheld ([\d:].*)$/, (m) => `አልተሰጠም ${m[1]}`),
    P(/^Recorded: (.+) given\.$/, (m) => `ተመዝግቧል፦ ${m[1]} ተሰጥቷል።`),
    P(/^(\d+) practice notes? from doctors across Ethiopia\.$/, (m) => `በመላው ኢትዮጵያ ካሉ ባለሙያዎች ${m[1]} የተግባር ማስታወሻዎች።`),
    P(/^(\d+) drugs · (\d+) improvised methods · (\d+) reviewed, (\d+) draft\.$/, (m) => `${m[1]} መድኃኒቶች · ${m[2]} አማራጭ ዘዴዎች · ${m[3]} የተረጋገጡ፣ ${m[4]} ረቂቅ።`),
    P(/^(\d+) local procedures$/, (m) => `${m[1]} አካባቢያዊ አሠራሮች`),
    P(/^(\d+) drugs with local notes$/, (m) => `${m[1]} አካባቢያዊ ማስታወሻ ያላቸው መድኃኒቶች`),
    P(/^(\d+) facility levels$/, (m) => `${m[1]} የተቋም ደረጃዎች`),
    P(/^Equipment set for (.+)$/, (m) => `መሣሪያዎች ለ“${m[1]}” ተዘጋጅተዋል`),
    P(/^Estimated with (.+)\. Weigh (?:the patient )?whenever (?:possible|a scale exists)\.$/, (m) => `በ${m[1]} የተገመተ። በተቻለ መጠን ታካሚውን ይመዝኑ።`),
    P(/^(\d+) drops? recorded — keep tapping$/, (m) => `${m[1]} ጠብታ ተመዝግቧል — መንካትዎን ይቀጥሉ`),
    P(/^(\d+) drops — a few more for accuracy$/, (m) => `${m[1]} ጠብታዎች — ለትክክለኛነት ጥቂት ተጨማሪ`),
    P(/^(\d+) drops — measured$/, (m) => `${m[1]} ጠብታዎች — ተለክቷል`),
    P(/^On target \((.+)\)$/, (m) => `ልክ ነው (${m[1]})`),
    P(/^(\d+) % too fast — close the roller clamp slightly$/, (m) => `${m[1]} % ፈጣን ነው — ማስተካከያውን ትንሽ ይዝጉ`),
    P(/^(\d+) % too slow — open the roller clamp slightly$/, (m) => `${m[1]} % ቀርፋፋ ነው — ማስተካከያውን ትንሽ ይክፈቱ`),
    P(/^Count now… (\d+)$/, (m) => `አሁን ይቁጠሩ… ${m[1]}`),
    P(/^1 drop every ([\d.,]+) s · ([\d.,]+) per 15 s$/, (m) => `በየ${m[1]} ሰከንድ 1 ጠብታ · በ15 ሰከንድ ${m[2]}`),
    P(/^= ([\d.,]+) drops\/min( — on target| — ([\d.,]+) % fast| — ([\d.,]+) % slow)?$/, (m) => `= ${m[1]} ጠብታ/ደቂቃ${m[2] ? (m[2].includes("on target") ? " — ልክ ነው" : m[3] ? ` — ${m[3]} % ፈጣን` : ` — ${m[4]} % ቀርፋፋ`) : ""}`),
    P(/^= ([\d.,]+) mL\/h with a (\d+) drops\/mL set\.(.*)$/, (m) => `= ${m[1]} mL/ሰዓት በ${m[2]} ጠብታ/mL መስመር።` +
      (m[3].includes("Above 150") ? " ከ150/ደቂቃ በላይ በትክክል መቁጠር አይቻልም — በከረጢቱ ላይ የሰዓት ምልክት ይጠቀሙ።" : m[3].includes("Below 4") ? " ከ4/ደቂቃ በታች በስበት ኃይል መቆጣጠር ከባድ ነው።" : "")),
    P(/^(\d+) members?$/, (m) => `${m[1]} አባል${m[1] === "1" ? "" : "ት"}`),
    P(/^· (\d+) notes?$/, (m) => `· ${m[1]} ማስታወሻዎች`),
    P(/^(\d+) colleagues? do(?:es)? this too$/, (m) => `${m[1]} ባልደረቦች ይህንኑ ያደርጋሉ`),
    P(/^Member since (.+)\.$/, (m) => `ከ${m[1]} ጀምሮ አባል።`),
    P(/^Posted as (.+)$/, (m) => `የሚለጠፈው በ${m[1]} ስም`),
    P(/^How do you give (.+) at (.+)\? Strength stocked, dilution, route, drip rate, what you watch for…$/, (m) => `${m[1]}ን በ${m[2]} እንዴት ይሰጣሉ? ያለው ጥንካሬ፣ አቀላቀል፣ የአሰጣጥ መንገድ፣ የጠብታ ፍጥነት፣ የሚከታተሉት…`),
    P(/^Usual range for (.+): (.+)\.$/, (m) => `የተለመደው ክልል ለ${m[1]}፦ ${m[2]}።`),
    P(/^Enter a weight between (.+) and (.+) kg\.$/, (m) => `ከ${m[1]} እስከ ${m[2]} ኪ.ግ. ያለ ክብደት ያስገቡ።`),
    P(/^raised to minimum (.+)$/, (m) => `ወደ ዝቅተኛው ${m[1]} ከፍ ተደርጓል`),
    P(/^capped at max (.+)$/, (m) => `በከፍተኛው ${m[1]} ተገድቧል`),
    P(/^Generated (.+)$/, (m) => `የተዘጋጀው፦ ${m[1]}`),
    P(/^uncuffed ([\d.,]+) mm · cuffed ([\d.,]+) mm · oral length ≈ ([\d.,]+) cm$/, (m) => `ያለ ኩፍ ${m[1]} mm · ከኩፍ ጋር ${m[2]} mm · የአፍ ርዝመት ≈ ${m[3]} cm`),
    P(/^([\d.,]+) years$/, (m) => `${m[1]} ዓመት`),
    P(/^max ([\d.,]+) J or adult dose$/, (m) => `ከፍተኛ ${m[1]} J ወይም የአዋቂ መጠን`),
    P(/^(.+) J, then (.+) J$/, (m) => `${m[1]} J፣ ከዚያ ${m[2]} J`),
    P(/^Profile default \((.+)\)$/, (m) => `የመገለጫው ነባሪ (${m[1]})`),
    P(/^(\d+) drops\/mL$/, (m) => `${m[1]} ጠብታ/mL`),
    P(/^(\d+) drops\/mL \(microdrip\)$/, (m) => `${m[1]} ጠብታ/mL (ማይክሮድሪፕ)`),
    P(/^(\d+) \(microdrip\)$/, (m) => `${m[1]} (ማይክሮድሪፕ)`),
    P(/^Defaults for$/, () => "ነባሪዎች ለ"),
    P(/^Reported: (.+)$/, (m) => `ሪፖርት የተደረገው፦ ${m[1]}`),
    P(/^(\d+) drops\/min$/, (m) => `${m[1]} ጠብታ/ደቂቃ`),
    P(/^([\d.,]+)\/min$/, (m) => `${m[1]}/ደቂቃ`)
  ];

  const norm = (s) => s.replace(/\s+/g, " ").trim();
  function translateString(raw) {
    const key = norm(raw);
    if (!key) return raw;
    let out = AM[key];
    if (out == null) {
      for (const [re, fn] of PATTERNS) { const m = key.match(re); if (m) { out = fn(m); break; } }
    }
    if (out == null || out === key) return raw;
    const lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
    return lead + out + trail;
  }

  /* ---------------- DOM translation ---------------- */
  const SKIP = "script,style,code,kbd,textarea,.note-body,[data-no-i18n]";
  const ATTRS = ["placeholder", "title", "aria-label", "label"];
  function translateTree(root) {
    if (lang !== "am" || !root) return;
    if (root.nodeType === 3) { translateText(root); return; }
    if (root.nodeType !== 1 || root.closest?.(SKIP)) return;
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode: (n) => n.nodeType === 1 ? (n.matches(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP) : NodeFilter.FILTER_ACCEPT
    });
    translateAttrs(root);
    root.querySelectorAll?.("[placeholder],[title],[aria-label],optgroup[label]").forEach(el => { if (!el.closest(SKIP)) translateAttrs(el); });
    let n; while ((n = tw.nextNode())) translateText(n);
  }
  function translateText(node) {
    const v = node.nodeValue; if (!v || !/[A-Za-z]/.test(v)) return;
    if (node.parentElement?.closest(SKIP)) return;
    const t = translateString(v); if (t !== v) node.nodeValue = t;
  }
  function translateAttrs(el) {
    if (!el.getAttribute) return;
    for (const a of ATTRS) { const v = el.getAttribute(a); if (v && /[A-Za-z]/.test(v)) { const t = translateString(v); if (t !== v) el.setAttribute(a, t); } }
  }
  let queued = new Set(), scheduled = false;
  const flush = () => { scheduled = false; const nodes = [...queued]; queued.clear(); nodes.forEach(translateTree); };
  const observer = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === "childList") m.addedNodes.forEach(n => queued.add(n));
      else if (m.type === "characterData") queued.add(m.target);
      else if (m.type === "attributes") queued.add(m.target);
    }
    if (!scheduled) { scheduled = true; queueMicrotask(flush); }
  });

  /* ---------------- clinical-content notice ---------------- */
  function afterRender(view) {
    if (lang !== "am") return;
    if (!["drug", "case", "resus", "schedules", "compat", "techniques", "calc"].includes(view)) return;
    const app = document.getElementById("app"); if (!app) return;
    const note = document.createElement("div");
    note.className = "lang-note";
    note.setAttribute("data-no-i18n", "");
    note.innerHTML = `<span lang="am">የመድኃኒት መጠኖችና የሕክምና ይዘቶች ትክክለኛነታቸው እንዲጠበቅ በእንግሊዝኛ ቀርበዋል።</span>` +
      (["schedules", "resus"].includes(view) ? ` <span lang="am">ሰዓቶቹ በ24 ሰዓት ዓለም አቀፍ አቆጣጠር ናቸው — በኢትዮጵያ የሀገር ውስጥ ሰዓት አይደሉም።</span>` : "");
    app.prepend(note);
  }

  /* ---------------- public API ---------------- */
  function setLang(l) {
    try { localStorage.setItem(KEY, JSON.stringify(l === "am" ? "am" : "en")); } catch {}
    location.reload();
  }
  function applyDocLang() {
    document.documentElement.lang = lang === "am" ? "am" : "en";
    document.documentElement.dataset.lang = lang;
  }
  applyDocLang();
  document.addEventListener("DOMContentLoaded", () => {
    if (lang !== "am") return;
    translateTree(document.body);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  });

  window.I18N = {
    get lang() { return lang; },
    t: (s) => lang === "am" ? translateString(s) : s,
    setLang, afterRender,
    /** clock options: 24-hour in Amharic mode to avoid confusion with Ethiopian local time */
    timeOpts: () => lang === "am" ? { hour: "2-digit", minute: "2-digit", hour12: false } : { hour: "2-digit", minute: "2-digit" },
    _dict: AM, _patterns: PATTERNS, _translate: translateString
  };
})();
