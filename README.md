# MedBridge — improvised dosing reference (working name)

Developed and put together by **Dr Bruktayt Engida**.

An offline-first reference for trained health workers on how hospital-level medicines can be
given safely when infusion pumps, syringe drivers, monitors or specific formulations are not
available. Every drug has a **standard** method and one or more **"no pump / improvised"**
methods (intermittent regimens, alternative routes, dilutions, gravity-drip technique), plus
calculators for drip rate, dose → drops, mg/kg, dilution, WHO Plan C fluids and child weight.

> **Status: DRAFT.** All 89 drug entries are `review.status: "draft"` and have **not** been
> verified by a pharmacist or physician. Do not use for patient care until reviewed.

## Live sites

**https://med-guide-nine.vercel.app/** — the full app with doctor accounts, practice notes and the
admin console (Vercel + Turso). Pushing to `main` redeploys it automatically.

**https://nahomtekola95-stack.github.io/medbridge/** — the reference app (drugs, cases, wards,
calculators, country profiles, offline). Published from `docs/` on the `main` branch.

Accounts, practice notes and the admin console need the Node server and are hidden on the static
build. To deploy that version, see **Deploying the full app** below.

## Run it

No build step, no backend.

- Open `index.html` directly in a browser (works from `file://`), or
- serve the folder for the installable/offline (service worker) version:

```bash
python3 -m http.server 3700 --bind 127.0.0.1
```

Then open http://127.0.0.1:3700. On Android/Chrome use "Add to Home screen". After the first
load everything works offline.

## Structure

```
index.html          shell + nav
css/style.css       mobile-first styles, light/dark
js/drugs-data.js    THE DATABASE (window.DRUG_DB, EQUIPMENT, CATEGORIES)
js/calc.js          pure calculator functions (unit-tested by hand — see below)
js/app.js           hash router + views (drugs, drug detail, calculators, techniques, setup, about)
sw.js, manifest.json, icons/   PWA / offline
```

## Drug entry schema

```js
{
  id: "kebab-id", name, aka: [], cls: "drug class", cat: "<key of CATEGORIES>", tags: [],
  presentation: ["strength / ampoule / storage"],
  indications: [],
  standard: { summary, items: [{ label, text }] },        // hospital-level method
  improvised: [{                                           // one card each
    title, best_for,
    requires: ["iv","micro_set","burette", ...],           // keys of EQUIPMENT; [] = none
    steps: [], monitor: [], cautions: []
  }],
  paediatric: [], cautions: [], antidote: "optional",
  calc: { type: "infusion", amount, amountUnit, volumeMl, doseUnit, range, defaultDose, dropFactor }
     |  { type: "weight", dosePerKg, doseUnit, conc, concUnit, maxDose, label }
     |  { type: "planC" },
  textbook: [{ text, ref }],   // optional: Nelson Textbook of Pediatrics 22nd ed. (2024) paraphrased, with page
  sources: [{ name, url? }],
  review: { status: "draft" | "reviewed", by, date }
}
```

The **Setup** page lets a user tick the equipment their facility has; methods whose `requires`
are not all available are dimmed and sorted last (never hidden).

## Bedside tools

| Feature | Where | Data |
|---|---|---|
| **Patient mode** — set a weight once; drug pages show the dose and volume, cases show inline doses, infusions show drops/min (with warnings below 4 or above 150/min) | header chip | each drug's `calc` (now supports `minDose` and weight `bands`) |
| **Emergency drug card** — every resuscitation dose and volume for one weight, tube size from age, printable | `#/resus` | `js/resus.js` (31 rows, each with a source) |
| **Drip guide** — metronome with sound and vibration at the target drop rate, tap-to-measure the real rate, 15-second count | `#/drip` | — |
| **Dose schedules** — clock times, per-dose checks, given/withheld log, due badge and reminders, printable chart; a late dose moves the rest of its series later so intervals are never shortened | `#/schedules` | `js/regimens.js` (8 regimens) |
| **Out of stock?** — explicit substitutes per use, including where no substitute exists | drug pages | `js/substitutes.js` |
| **Never mix** — line, syringe and fluid incompatibilities with a two-drug checker | `#/compat` | `js/compat.js` (16 rules) |
| **Favourites, recently viewed, typo-tolerant search** across drugs and cases | home | localStorage |

All of it works offline and stores nothing off the device. Tests: `node tests/features.test.js`
(220 checks: emergency card doses at five weights including minima and maxima, schedule timing and
late-dose shifting, substitute integrity, fuzzy search true and false matches).

## Psychiatry and mental health

Referenced to **Kaplan & Sadock's Synopsis of Psychiatry 12th ed. (2022)** and **DSM-5-TR Clinical
Cases (APA, 2023)**, with WHO mhGAP Intervention Guide 2.0 for dosing used in Ethiopia. Every
textbook reference was checked word-for-word against the cited PDF page.

- **31 drugs.** Antipsychotics: haloperidol, haloperidol decanoate, chlorpromazine, olanzapine,
  risperidone, quetiapine, aripiprazole, clozapine, fluphenazine decanoate. Side effects and
  emergencies: biperiden, trihexyphenidyl, promethazine, propranolol, bromocriptine,
  cyproheptadine. Antidepressants: fluoxetine, sertraline, escitalopram, mirtazapine,
  amitriptyline, imipramine. Mood stabilisers: lithium, sodium valproate, carbamazepine,
  lamotrigine. Alcohol and substance use: thiamine, chlordiazepoxide, naltrexone, methadone.
  Also lorazepam and methylphenidate. Each has bedside methods for settings without monitors or drug levels (oral then IM
  rapid tranquillisation with hand observations, dystonia treatment, depot logistics, lithium
  without levels, tricyclic overdose without an ECG monitor).
- **14 cases** in the new "Psychiatry & mental health" group: acute agitation, delirium, alcohol
  withdrawal and delirium tremens, Wernicke encephalopathy, acute psychosis, acute mania,
  depression with suicide risk, neuroleptic malignant syndrome, serotonin syndrome, lithium
  toxicity, acute dystonia, catatonia, postpartum psychosis and tricyclic overdose.
- **Psychiatric ward** filter, safety (pregnancy, breastfeeding, kidney, liver) and 129
  interaction rules, stock-out substitutes and never-mix rules.
- **Alcohol withdrawal score (CIWA-Ar)** at `#/calc?tab=ciwa`, with the action for each band and a
  record of scores (scale: Sullivan et al. 1989, public domain; not in either textbook).
- **Dose schedules:** high-dose IV thiamine for Wernicke encephalopathy, and symptom-triggered oral
  diazepam for alcohol withdrawal.

Where Kaplan is out of date or contradicts itself (for example oral 100 mg thiamine for Wernicke,
or physostigmine in tricyclic overdose), the entries follow current guidance and say so.

## Safety, newborn dosing, kidney and interactions

| Feature | Where | Data |
|---|---|---|
| **Pregnancy, breastfeeding, kidney and liver** levels and advice for every drug; chips on the drug header; kidney bands highlighted for the patient's creatinine clearance | drug page, Safety tab | `js/safety.js` (58 drugs, 86 verified textbook refs) |
| **Kidney function** calculator (Cockcroft–Gault; bedside Schwartz for children) saved to the patient, plus a list of every drug needing a change | `#/calc?tab=kidney` | `js/safety.js` renal bands |
| **Newborn dosing** by weight, gestation at birth and age in days, with interval and volume; a full table for one baby | drug page card, `#/newborn` | `js/neonatal.js` (18 drugs, WHO Pocket Book scheme, Nelson refs) |
| **Drug interactions** checker for a patient's full medicine list, also listed per drug | `#/interactions`, Safety tab | `js/interactions.js` (41 rules) |
| **Fluids and blood**: maintenance (Nelson 4-2-1, fever), newborn daily fluid, burns (2/3/4 mL/kg/%), transfusion volume, oxygen cylinder time | `#/calc?tab=fluids` | `js/calc.js` |
| **Independent double check** for high-alert medicines: a second person's result is compared with the app's; schedules record the second checker's initials | drug page, schedules | `HIGH_ALERT` in `js/features.js` |
| **Share** a dose, case summary or schedule as plain text (phone share sheet, Telegram, copy) | drug, case and schedule pages | — |
| **Wall charts**: drip-rate table, one-page case protocol, ward drug cards, all printable | `#/charts` | existing data |
| **Practice quiz** generated from the app's own data with worked explanations | `#/quiz` | existing data |
| **Stock-out reports** per facility with the latest status, shown on drug pages and the Network page | drug pages, `#/community` | server (`stock_reports`) |
| **Ethiopian calendar** dates next to international dates (on by default in Amharic) | Setup → Language | `js/ethcal.js` |

Tests: `node tests/extras.test.js` (fluids, kidney, burns, transfusion, oxygen, Ethiopian
calendar, newborn rule coverage, kidney bands, quiz question validity, sign-off fingerprint).
`node scripts/check-data.js` also validates safety, newborn, interaction, substitute and
mixing data, including that a newborn dosing rule matches every age and weight.

## Language (English / አማርኛ)

The interface can be switched to Amharic from the home screen or **Setup → Language** (stored as
`mb:lang`). `js/i18n.js` holds an exact-string dictionary plus patterns for text with numbers, and
translates the rendered page as it changes. What is translated and what is not:

- **Translated:** navigation, buttons, forms, headings, warnings, calculators, bedside tools, the
  Local and Setup pages, accounts, network and admin screens, server messages, wards, drug classes,
  equipment, Ethiopian cities and regions.
- **Kept in English on purpose:** drug names, doses, monographs, case steps, regimens, substitutes,
  never-mix rules, textbook references, the Techniques list and members' notes. Clinicians are
  trained in English and machine-translated dosing without clinical review is unsafe. Pages with
  clinical content show a short Amharic notice saying so.
- Clock times are 24-hour in Amharic mode, and the schedule and emergency pages state they are not
  Ethiopian local time.
- Anything without a translation falls back to English. Mark a subtree `data-no-i18n` to exclude
  it. Tests: `node tests/i18n.test.js` (every entry has Ethiopic script, numbers survive patterns,
  clinical text passes through unchanged). **The Amharic wording is a draft and should be reviewed by
  a native-speaking clinician.**

## Clinical cases

`js/conditions.js` holds `window.CONDITIONS`: 35 presenting problems grouped by
`window.CASE_GROUPS` (emergency, obstetric, surgical, medical, paediatric & neonatal). Each case
carries a summary, red flags, an ordered "what to do" list, sources, and the drugs used with a
**role**:

| role | meaning |
|---|---|
| `first` | give this |
| `adjunct` | add when indicated |
| `alternative` | if the first line is unavailable |
| `supportive` | supportive care |
| `avoid` | do not use here (e.g. ergometrine in pre-eclampsia, bicarbonate in DKA, Ringer's lactate in hyperkalaemia) |

Cases are reachable from the drug list's "By case" mode (`#/case/<id>`), and every drug page lists
the cases that use it with the role it plays there. 274 drug-to-case links; all 50 drugs appear in
at least one case.

## Wards

Every drug carries a `wards: [...]` array (keys of `window.WARDS` in `drugs-data.js`), so the list
can be grouped by **who uses the drug and where** rather than by pharmacological class. The drug
list has a "By ward / By drug class" toggle; the drug page shows clickable ward chips; and
**Setup → My ward** sets the ward the list opens on. A drug belongs to as many wards as use it
(4.4 on average) and nothing is ever hidden — "All drugs" is always one tap away.

| Ward | Drugs |
|---|---|
| Emergency / casualty | 41 |
| Adult medical ward | 37 |
| Paediatric ward | 34 |
| Labour & maternity | 26 |
| Surgery & theatre | 22 |
| ICU / high dependency | 22 |
| Neonatal unit | 19 |
| Outpatient & health post | 17 |

## Textbook references (five books)

Drugs and cases carry `textbook: [{ book, text, ref }]`, where `book` is a key of `window.BOOKS`
(`js/books.js`): harrison, williams, gabbe, schwartz, nelson, or note. 493 references in total:
Harrison 174, Gabbe 76, Williams 72, Schwartz 67, Nelson 97, editorial notes 7. All 50 drugs and
27 of 35 cases are covered.

Every Harrison, Williams, Gabbe and Schwartz reference was checked by script: its source excerpt
had to be found on the cited PDF page, and numbers in the paraphrase that did not occur on that
page were reviewed by hand. The review also surfaced 92 differences between the app and the
books; the substantive ones were corrected (magnesium toxicity thresholds, antenatal steroid
criteria, hydralazine interval, warfarin in pregnancy, burns cooling and fluids, permissive
hypotension, ketamine in shock, potassium in DKA, bicarbonate in hyperkalaemia, Listeria cover,
luminal amoebicide, quinine dose reduction and others). Deliberate WHO regimens that differ from
US practice were kept and annotated where useful.

### Nelson (original notes)

`textbook` entries paraphrase paediatric reference doses from **Nelson Textbook of Pediatrics,
22nd ed. (2024)** with chapter and page numbers (19 of 24 drugs; obstetric/adult drugs are marked
as not covered). They are shown on the drug page under the **Textbook** tab. The improvised
methods themselves come from WHO/MSF sources; where Nelson gives no low-resource alternative an
"Editorial note" says so. Page numbers refer to the printed book pagination.

## Clinical review workflow (required before any deployment)

Sign-off happens **in the app** at `#/review` (Tools → Clinical sign-off):

1. An administrator verifies a pharmacist or physician and gives them the **reviewer** role
   (Admin → Members → Make reviewer). Administrators can also sign off.
2. The reviewer opens each drug, checks it against the cited sources **and** the national
   standard treatment guideline / EFDA formulary, ticks all five checklist items
   (doses, no-pump methods, paediatric and newborn doses, safety and interactions, national
   guidelines) and signs off, or requests changes with a note.
3. The sign-off stores a fingerprint of the entry's content, including its safety and newborn
   data. The drug page then shows "Signed off by <name> · <date>". If the content changes later,
   it shows "Changed since sign-off" until someone signs the new version. Full history is on the
   drug's Sources tab and in the audit log.
4. Corrections are made in the data files and deployed; then the reviewer signs the new version.
5. When every entry is signed off, replace the "Draft build" banner text in `index.html` and bump
   `CACHE` in `sw.js`.

The static GitHub Pages copy has no server, so it shows only the built-in `review` field.

Items that most need a reviewer's eye are marked "verify local protocol" in the text
(e.g. IM-only magnesium loading, oral phenobarbital loading, 2 g TXA bolus, oral ketamine).

## Adding a drug

Copy an existing entry in `js/drugs-data.js`, keep `review.status: "draft"`, and run:

```bash
node -e "global.window={};require('./js/drugs-data.js');console.log(window.DRUG_DB.length)"
```

## Calculator checks

`js/calc.js` was checked against the worked examples in the entries: adrenaline 4 mg/250 mL at
0.1 mcg/kg/min × 70 kg = 26.25 mL/h; heparin 25 000 U/500 mL at 18 U/kg/h × 70 kg = 25.2 mL/h;
dopamine 200 mg/250 mL at 10 mcg/kg/min × 70 kg = 52.5 mL/h; D50→D10 50 mL = 10 + 40 mL;
Plan C 15 kg phase 2 = 140 drops/min (20 gtt/mL).

## Drug coverage

89 drugs, 54 clinical cases, 12 categories. The eight latest additions are ipratropium,
adenosine, mannitol, 3 % hypertonic saline, HIV prophylaxis (PEP and infant), first-line TB
treatment (RHZE), snake antivenom and oxygen, with new cases for snakebite, SVT, raised
intracranial pressure, HIV exposure and tuberculosis.

| Category | Drugs |
|---|---|
| Anti-infectives (9) | ampicillin, benzylpenicillin, cloxacillin, ceftriaxone, gentamicin, metronidazole, chloramphenicol, artesunate, quinine |
| Obstetric (8) | oxytocin, misoprostol, ergometrine, magnesium sulfate, hydralazine, labetalol, nifedipine, dexamethasone |
| Cardiovascular (5) | adrenaline*, noradrenaline, dopamine, amiodarone, furosemide, digoxin |
| Analgesia & anaesthesia (5) | paracetamol, morphine, ketamine, lidocaine, bupivacaine |
| Emergency (4) | adrenaline, naloxone, atropine, calcium gluconate |
| Seizures & neurology (4) | diazepam, midazolam, phenobarbital, phenytoin |
| Haematology (4) | tranexamic acid, heparin/enoxaparin, vitamin K, blood transfusion |
| Endocrine (3) | insulin, dextrose, hydrocortisone |
| Fluids & electrolytes (3) | Ringer's lactate, potassium chloride, sodium bicarbonate |
| Respiratory (3) | salbutamol, aminophylline, caffeine citrate |
| Nutrition (2) | ORS & zinc, vitamin A |

## Roadmap ideas

- French interface (add a second dictionary to `js/i18n.js`).
- Morphine and other analgesics in the newborn dosing table (left out: no verifiable source).
- Export/import of reviewed datasets as JSON.

## Setting profiles (country / facility adaptation)

`js/profiles.js` holds `window.PROFILES`: **generic (WHO/MSF)**, **Ethiopia**, **Kenya**. A profile
provides facility tiers with default equipment, calculator defaults (`dropFactor`, `glucoseUnit`,
`weightFormula`: `apls` | `age4x2`, `sam`), local `procedures`, per-drug `drugNotes`
(`stock`, `protocol`, `technique`) and sources. The **Local** page selects the profile and tier
(tier fills the equipment switches), shows procedures and drug notes, and lets a facility add its
own name, defaults, procedures and drug notes — stored locally and exportable/importable as JSON.
Drug pages show a "Local practice" card; the Plan C calculator has a SAM mode; the child-weight
calculator follows the profile's formula; a Units tab converts glucose mg/dL ↔ mmol/L.
All profile content is draft and must be verified against the national STG/EML.

## Deploying

### Static reference app (what is live now)

```bash
npm run check        # data integrity
npm run build:static # writes docs/
git add docs && git commit -m "Rebuild site" && git push
```

GitHub Pages serves `main` branch `/docs`. The build sets `window.MB_NO_SERVER`, which hides the
account and network tabs and skips every API call, so the page is fully static.

### Full app with accounts (Vercel + Turso) — free, no payment card

The database layer uses **libSQL**, so it is still SQLite: a local file in development
(`server/data/medbridge.db`) and [Turso](https://turso.tech) over the network in production. Every
SQL statement is identical between the two.

```bash
turso auth login              # once, in a browser — free, no card
npm run deploy:vercel         # creates the database, sets the env vars, deploys
```

The script creates the Turso database, pipes the URL and auth token straight into
`vercel env add` so neither ever appears on screen, generates a 24-character administrator
password, deploys, waits for `/api/healthz`, and prints the administrator credentials once.

Environment variables it sets: `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `NODE_ENV`,
`MB_ADMIN_EMAIL`, `MB_ADMIN_PASSWORD`. With none of them set the server falls back to a local
SQLite file, which is what `npm start` uses.

### Full app with accounts (Fly.io)

`flyctl` is installed and on the PATH, `Dockerfile` and `fly.toml` are ready, and
`scripts/deploy-fly.sh` does the whole deployment. Two steps:

```bash
flyctl auth login          # once, in a browser — or `flyctl auth signup` for a new account
npm run deploy:fly         # creates the app, the volume and the secret, then deploys
```

The script is safe to re-run: it skips whatever already exists and just redeploys the code. It
creates the app (renaming it if `medbridge-et` is taken), a 1 GB volume in `jnb` (Johannesburg,
the closest region to Ethiopia) for the SQLite database, generates a 24-character administrator
password, builds on Fly's remote builder so no local Docker is needed, waits for
`/api/healthz`, and prints the administrator credentials once.

A payment card on the Fly account is required for the volume, even on the free allowance, so
Vercel plus Turso above is the cheaper route.

`render.yaml` covers Render as an alternative (a paid plan is needed for the persistent disk). In
production the server refuses to start without a strong `MB_ADMIN_PASSWORD`, and sets Secure
cookies, HSTS and a content security policy.

## Accounts, practice notes and the admin console

The app is now **static reference content + a small Node server** (`server/`), so doctors across
Ethiopia can see how colleagues administer a drug. It has **no dependencies** — `node:sqlite` and
`node:http` only. Node 22+ required.

```bash
node server/server.js          # http://127.0.0.1:3700
```

On first run it creates an administrator account and prints the password once. Override with
`MB_ADMIN_EMAIL` and `MB_ADMIN_PASSWORD`. Data lives in `server/data/medbridge.db` (git-ignored).

### The credibility rule

| | Who writes it | How it appears |
|---|---|---|
| **Approved methods** | Administrators only | Green "Administrator-approved local methods" card at the top of the drug page |
| **Practice notes** | Any signed-in member | Separate section below, with an amber warning that they are personal reports, each attributed to a named person, profession, hospital and city |

Members can never edit approved methods. An administrator can **adopt** a good practice note: the
note's text is loaded into the method editor, the administrator edits and publishes it, and the
original note is marked as adopted.

### Accounts

Registration asks for name, profession, city (92 Ethiopian towns across 14 regions), hospital and
facility level. New members can post immediately but are labelled **unverified** until an
administrator verifies them. Administrators can verify, promote, or suspend members, hide reported
notes, and read an activity log.

### API

`/api/auth/{register,login,logout}`, `/api/me`, `/api/methods?drug=`, `/api/comments` (GET/POST),
`/api/comments/:id` (PATCH/DELETE) plus `/agree` and `/report`, `/api/feed`, `/api/reviews`
(GET latest per drug or `?drug=` history; POST sign-off, verified reviewers and admins only),
`/api/stock` (GET last 30 days, latest per facility; POST report; DELETE own or admin), and
`/api/admin/*` (overview, methods, users including the reviewer role, comment moderation).

Security: scrypt password hashing, opaque session tokens in an HttpOnly SameSite=Strict cookie,
a required `X-MB-App` header on every mutating request, per-IP and per-account rate limiting,
prepared statements everywhere, and `server/` and `server/data/` blocked from static serving.
Set `NODE_ENV=production` behind HTTPS to add the `Secure` cookie flag.

### Offline

Reference content, calculators and local profiles still work with no connection. Practice notes
for a drug are cached on the device after the first view and shown with an "offline" note; posting
needs a connection. The service worker never caches `/api/`.
