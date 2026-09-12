# MedBridge — improvised dosing reference (working name)

An offline-first reference for trained health workers on how hospital-level medicines can be
given safely when infusion pumps, syringe drivers, monitors or specific formulations are not
available. Every drug has a **standard** method and one or more **"no pump / improvised"**
methods (intermittent regimens, alternative routes, dilutions, gravity-drip technique), plus
calculators for drip rate, dose → drops, mg/kg, dilution, WHO Plan C fluids and child weight.

> **Status: DRAFT.** All 50 drug entries are `review.status: "draft"` and have **not** been
> verified by a pharmacist or physician. Do not use for patient care until reviewed.

## Live site

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

## Textbook references

`textbook` entries paraphrase paediatric reference doses from **Nelson Textbook of Pediatrics,
22nd ed. (2024)** with chapter and page numbers (19 of 24 drugs; obstetric/adult drugs are marked
as not covered). They are shown on the drug page under the **Textbook** tab. The improvised
methods themselves come from WHO/MSF sources; where Nelson gives no low-resource alternative an
"Editorial note" says so. Page numbers refer to the printed book pagination.

## Clinical review workflow (required before any deployment)

1. Reviewer (pharmacist or physician) checks each entry against the cited sources **and** the
   national standard treatment guideline / formulary.
2. Corrections are made in `js/drugs-data.js`; anything that differs from national guidance is
   changed to match it or removed.
3. Set `review: { status: "reviewed", by: "Name, role", date: "YYYY-MM-DD" }`.
4. When every entry is reviewed, replace the "Draft build" banner text in `index.html` and bump
   `CACHE` in `sw.js` so installed copies update.

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

50 drugs, 135 improvised methods, 11 categories. 45 entries carry Nelson page citations
(104 references in total).

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

- Amharic / French translation layer (strings are all in `drugs-data.js` and `app.js`).
- Printable one-page cards per drug.
- Further drugs: ipratropium, adenosine, mannitol/hypertonic saline, antiretrovirals for
  prophylaxis, anti-tuberculosis regimens, snakebite antivenom, oxygen delivery.
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
`/api/comments/:id` (PATCH/DELETE) plus `/agree` and `/report`, `/api/feed`, and `/api/admin/*`
(overview, methods, users, comment moderation).

Security: scrypt password hashing, opaque session tokens in an HttpOnly SameSite=Strict cookie,
a required `X-MB-App` header on every mutating request, per-IP and per-account rate limiting,
prepared statements everywhere, and `server/` and `server/data/` blocked from static serving.
Set `NODE_ENV=production` behind HTTPS to add the `Secure` cookie flag.

### Offline

Reference content, calculators and local profiles still work with no connection. Practice notes
for a drug are cached on the device after the first view and shown with an "offline" note; posting
needs a connection. The service worker never caches `/api/`.
