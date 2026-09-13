/* ============================================================
   MedBridge extras:
   - pregnancy, breastfeeding, kidney and liver safety (data: safety.js)
   - pharmacological interactions (data: interactions.js)
   - newborn dosing by gestation and postnatal age (data: neonatal.js)
   - kidney-function and fluids/blood/oxygen calculators
   - share to Telegram or any app; independent double check for high-alert drugs
   - printable wall charts; practice quiz; Ethiopian calendar dates
   Registered by app.js after Features, which it receives as ctx.FX.
   ============================================================ */
window.Extras = function (ctx) {
  const { $, esc, ic, toast, render, FX, textbookHtml, ROLES } = ctx;
  const fmt = (n, d = 1) => (n == null || !isFinite(n)) ? "—" : (+Calc.round(n, d)).toLocaleString();
  const store = {
    get(k, def) { try { const v = localStorage.getItem("mb:" + k); return v == null ? def : JSON.parse(v); } catch { return def; } },
    set(k, v) { try { localStorage.setItem("mb:" + k, JSON.stringify(v)); } catch {} }
  };
  const L = (s) => window.I18N ? I18N.t(s) : s;
  const drugById = (id) => DRUG_DB.find(d => d.id === id);
  const shortName = (id) => (drugById(id)?.name || id).split(" (")[0];
  const SAFETY = () => window.SAFETY || {};
  const NEONATAL = () => window.NEONATAL || {};
  const INTERACTIONS = () => window.INTERACTIONS || [];
  const patient = FX.patient;
  const sortedDrugs = () => [...DRUG_DB].sort((a, b) => a.name.localeCompare(b.name));
  const DRAFT = "Draft reference. Confirm against the prescription and the national protocol.";

  /* =========================================================
     Dates
     ========================================================= */
  const dateLabel = (date) => {
    const d = date instanceof Date ? date : new Date(date);
    const g = d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    return window.EthCal && EthCal.enabled() ? `${EthCal.format(d, window.I18N?.lang)} (${g})` : g;
  };

  /* =========================================================
     Share
     ========================================================= */
  const shareButton = (text, label = "Share") => `<button type="button" class="btn ghost sm" data-share-text="${esc(text)}">${ic("share")}${label}</button>`;
  async function share(text) {
    if (navigator.share) {
      try { await navigator.share({ text }); return; } catch (e) { if (e && e.name === "AbortError") return; }
    }
    let dlg = $("#share-dialog");
    if (!dlg) { dlg = document.createElement("dialog"); dlg.id = "share-dialog"; dlg.className = "dialog"; document.body.appendChild(dlg); }
    const tg = `https://t.me/share/url?url=${encodeURIComponent(location.origin + location.pathname)}&text=${encodeURIComponent(text)}`;
    dlg.innerHTML = `<form method="dialog" class="pd">
      <h3 style="margin:0 0 .4rem">${ic("share")} Share</h3>
      <p class="small muted" style="margin:0 0 .6rem">Never include the patient's name. Use a bed number or initials.</p>
      <textarea id="sh-text" rows="7" style="width:100%" data-no-i18n>${esc(text)}</textarea>
      <div class="row" style="margin-top:.8rem;justify-content:flex-end">
        <button type="button" class="btn ghost sm" id="sh-close">Close</button>
        <button type="button" class="btn ghost sm" id="sh-copy">${ic("clipboard")}Copy</button>
        <a class="btn sm" id="sh-tg" href="${esc(tg)}" target="_blank" rel="noopener">${ic("send")}Telegram</a>
      </div></form>`;
    $("#sh-close", dlg).addEventListener("click", () => dlg.close());
    $("#sh-copy", dlg).addEventListener("click", async () => {
      const t = $("#sh-text", dlg).value;
      try { await navigator.clipboard.writeText(t); toast("Copied."); } catch { $("#sh-text", dlg).select(); document.execCommand("copy"); toast("Copied."); }
    });
    $("#sh-text", dlg).addEventListener("input", e => { $("#sh-tg", dlg).href = `https://t.me/share/url?url=${encodeURIComponent(location.origin + location.pathname)}&text=${encodeURIComponent(e.target.value)}`; });
    dlg.showModal();
  }
  document.addEventListener("click", e => { const b = e.target.closest("[data-share-text]"); if (b) { e.preventDefault(); share(b.getAttribute("data-share-text")); } });

  /* =========================================================
     Newborn dosing
     ========================================================= */
  function neoRule(entry, ga, pna, wt) {
    const pma = ga + pna / 7;
    const ok = (v, lo, hi) => (lo == null || v >= lo) && (hi == null || v <= hi);
    return (entry.rules || []).find(r => ok(ga, r.gaMin, r.gaMax) && ok(pma, r.pmaMin, r.pmaMax) && ok(pna, r.pnaMin, r.pnaMax) && ok(wt, r.wtMin, r.wtMax)) || null;
  }
  function neoDose(entry, rule, wt) {
    if (!rule) return null;
    let dose = rule.fixed != null ? rule.fixed : rule.perKg * wt;
    const cap = rule.max ?? entry.max;
    const capped = cap != null && dose > cap;
    if (capped) dose = cap;
    return { dose, capped, volume: entry.conc > 0 ? dose / entry.conc : null };
  }
  const neoLine = (entry, r) => `${fmt(r.dose, r.dose < 1 ? 3 : 2)} ${esc(entry.unit || "")}${r.volume != null && entry.unit !== "mL" ? ` = ${fmt(r.volume, r.volume < 1 ? 2 : 1)} mL` : ""}${r.capped ? " (max)" : ""}`;
  const everyText = (h) => h == null ? "" : h % 24 === 0 && h >= 24 ? (h === 24 ? "once daily" : `every ${h / 24} days`) : `every ${h} h`;

  function neonatalCard(d) {
    const entry = NEONATAL()[d.id];
    if (!entry || !patient.isNewborn || !patient.weight || patient.gaWeeks == null) return "";
    const wt = patient.weight, ga = patient.gaWeeks, pna = patient.pnaDays;
    const rule = neoRule(entry, ga, pna, wt), r = neoDose(entry, rule, wt);
    const load = entry.loading && entry.loading.perKg ? neoDose(entry, { perKg: entry.loading.perKg, max: entry.loading.max }, wt) : null;
    const text = r ? `MedBridge newborn dose\n${d.name}: ${neoLine(entry, r).replace(/<[^>]+>/g, "")} ${everyText(rule.every)}${entry.route ? " " + entry.route : ""}\nBaby: ${fmt(wt, 2)} kg, born at ${ga} weeks, day ${pna}\n${DRAFT}` : "";
    return `<div class="card pdose neo">
      <div class="row" style="justify-content:space-between"><h4 style="margin:0">${ic("baby")} Newborn dose · ${fmt(wt, 2)} kg · ${ga} weeks · day ${pna}</h4><button type="button" class="linkbtn" data-open-patient>${ic("edit")}Change</button></div>
      ${entry.avoid ? `<div class="callout warn" style="margin:.5rem 0 0">${ic("alert")}<div>${esc(entry.avoid)}</div></div>` : ""}
      ${load ? `<div class="pd-sub" style="margin-top:.4rem"><b>Loading:</b> ${neoLine(entry, load)}${entry.loading.note ? ` · ${esc(entry.loading.note)}` : ""}</div>` : ""}
      ${r ? `<div class="pd-big">${neoLine(entry, r)} <span class="pd-unit">${everyText(rule.every)}</span></div>
        <div class="pd-sub">${esc(entry.use || "")}${entry.route ? ` · ${esc(entry.route)}` : ""}${entry.concLabel ? ` · ${esc(entry.concLabel)}` : ""}</div>
        ${rule.note ? `<p class="small" style="margin:.35rem 0 0">${esc(rule.note)}</p>` : ""}`
        : `<p class="small" style="margin:.4rem 0 0">No newborn dosing rule covers this age and weight. Check the drug page and a neonatal formulary.</p>`}
      ${entry.monitor ? `<p class="small muted" style="margin:.35rem 0 0">${ic("eye")} ${esc(entry.monitor)}</p>` : ""}
      <p class="small muted" style="margin:.35rem 0 0">${esc(entry.ref || "")}</p>
      <div class="row" style="margin-top:.5rem"><a class="btn ghost sm" href="#/newborn">${ic("baby")}All newborn doses</a>${text ? shareButton(text) : ""}</div>
    </div>`;
  }

  function viewNewborn(main) {
    const draw = () => {
      const wt = patient.weight, ga = patient.gaWeeks, pna = patient.pnaDays;
      const ready = wt > 0 && ga != null && pna != null && pna <= 28;
      const entries = Object.entries(NEONATAL()).filter(([id]) => drugById(id)).sort((a, b) => shortName(a[0]).localeCompare(shortName(b[0])));
      const rows = ready ? entries.map(([id, e]) => {
        const rule = neoRule(e, ga, pna, wt), r = neoDose(e, rule, wt);
        const load = e.loading && e.loading.perKg ? neoDose(e, { perKg: e.loading.perKg, max: e.loading.max }, wt) : null;
        return `<tr><td><a href="#/drug/${id}"><strong>${esc(shortName(id))}</strong></a><div class="small muted">${esc(e.use || "")}</div></td>
          <td>${r ? `<b>${neoLine(e, r)}</b>` : `<span class="muted">No rule for this age</span>`}${load ? `<div class="small">Loading ${neoLine(e, load)}</div>` : ""}</td>
          <td>${r ? everyText(rule.every) : ""}<div class="small muted">${esc(e.route || "")}</div></td>
          <td class="small">${[e.avoid, rule?.note].filter(Boolean).map(esc).join("<br>")}${e.concLabel ? `<div class="muted">${esc(e.concLabel)}</div>` : ""}</td></tr>`;
      }).join("") : "";
      main.innerHTML = `
        <div class="resus-head"><div><h1 style="margin:0">${ic("baby")} Newborn doses</h1>
          <p class="text-2" style="margin:.2rem 0 0">For babies up to 28 days old. Newborn doses and dosing intervals change with gestation at birth and age in days.</p></div>
          <button type="button" class="btn ghost sm" id="nb-print">${ic("print")}Print</button></div>
        <div class="card resus-input"><div class="inline3">
          <div class="field"><label for="nb-w">Weight (kg)</label><input id="nb-w" type="number" inputmode="decimal" min="0.3" max="6" step="0.01" value="${wt ?? ""}"></div>
          <div class="field"><label for="nb-ga">Gestation at birth (weeks)</label><input id="nb-ga" type="number" inputmode="numeric" min="22" max="44" value="${ga ?? ""}"></div>
          <div class="field"><label for="nb-pna">Age in days (0–28)</label><input id="nb-pna" type="number" inputmode="numeric" min="0" max="28" value="${pna ?? ""}"></div>
        </div><button type="button" class="btn sm" id="nb-save">${ic("check")}Use for this baby</button></div>
        ${!Object.keys(NEONATAL()).length ? `<p class="empty">Newborn dosing data is not loaded.</p>` : ready ? `
          <div class="rs-banner"><span class="rs-w">${fmt(wt, 2)} kg</span><span>${ga} weeks at birth</span><span>day ${pna}</span><span class="small">${dateLabel(new Date())}</span></div>
          <div class="card"><div class="tablewrap"><table class="rs-table"><thead><tr><th>Drug</th><th>Dose · volume</th><th>Interval · route</th><th>Notes</th></tr></thead><tbody>${rows}</tbody></table></div></div>
          <p class="small muted">Draft newborn dosing. Check every dose against the drug page, a neonatal formulary and the national neonatal protocol.</p>`
          : `<p class="empty">Enter weight, gestation at birth and age in days.</p>`}`;
      $("#nb-save").addEventListener("click", () => {
        const w = parseFloat($("#nb-w").value), g = parseInt($("#nb-ga").value, 10), p = parseInt($("#nb-pna").value, 10);
        if (!(w > 0 && w < 8)) return toast("Enter a newborn weight in kg.", true);
        if (!(g >= 22 && g <= 44)) return toast("Gestation must be 22 to 44 weeks.", true);
        if (!(p >= 0 && p <= 28)) return toast("Age in days must be 0 to 28 for newborn dosing.", true);
        patient.weight = w; patient.estimated = false; patient.gaWeeks = g; patient.pnaDays = p; patient.ageYears = 0;
        FX.syncPatientChip(); draw();
      });
      $("#nb-print").addEventListener("click", () => window.print());
    };
    draw();
  }

  /* =========================================================
     Safety: pregnancy, breastfeeding, kidney, liver
     ========================================================= */
  const LEVEL = {
    safe: { cls: "ok", label: "Generally safe" }, caution: { cls: "warn", label: "Caution" }, avoid: { cls: "bad", label: "Avoid" },
    none: { cls: "ok", label: "No dose change" }, adjust: { cls: "warn", label: "Adjust dose" }
  };
  const renalBand = (renal, value) => {
    if (!renal?.bands?.length || !(value > 0)) return null;
    return [...renal.bands].sort((a, b) => b.below - a.below).filter(b => value < b.below).pop() || null;
  };
  function safetyChips(d) {
    const s = SAFETY()[d.id]; if (!s) return "";
    const chip = (label, lv) => lv ? `<span class="chip ${LEVEL[lv]?.cls || ""}" title="${esc(LEVEL[lv]?.label || "")}">${label}: ${esc(LEVEL[lv]?.label || lv)}</span>` : "";
    const band = patient.crcl ? renalBand(s.renal, patient.crcl.value) : null;
    return chip("Pregnancy", s.pregnancy?.level) + chip("Breastfeeding", s.breastfeeding?.level)
      + (band ? `<span class="chip bad">${ic("drop")}Kidney: adjust for ${fmt(patient.crcl.value, 0)} mL/min</span>` : "");
  }
  function safetyCards(d) {
    const s = SAFETY()[d.id]; if (!s) return "";
    const lvl = (lv) => lv ? `<span class="chip ${LEVEL[lv]?.cls || ""}">${esc(LEVEL[lv]?.label || lv)}</span>` : "";
    const cr = patient.crcl, band = cr ? renalBand(s.renal, cr.value) : null;
    return `<div class="safety-grid">
      <div class="card"><h3>${ic("heart")} Pregnancy ${lvl(s.pregnancy?.level)}</h3><p style="margin:0">${esc(s.pregnancy?.text || "")}</p></div>
      <div class="card"><h3>${ic("baby")} Breastfeeding ${lvl(s.breastfeeding?.level)}</h3><p style="margin:0">${esc(s.breastfeeding?.text || "")}</p></div>
      <div class="card"><h3>${ic("drop")} Kidney ${lvl(s.renal?.level)}</h3><p style="margin:0 0 .4rem">${esc(s.renal?.text || "")}</p>
        ${s.renal?.bands?.length ? `<ul class="bands">${[...s.renal.bands].sort((a, b) => b.below - a.below).map(b => `<li class="${band === b ? "on" : ""}">${esc(b.text)}</li>`).join("")}</ul>` : ""}
        <p class="small" style="margin:.4rem 0 0">${cr ? `Patient: <b>${fmt(cr.value, 0)} mL/min</b> (${esc(cr.method)}). ${band ? "The highlighted line applies." : "No change listed at this level."} <a href="#/calc?tab=kidney">Recalculate</a>` : `<a href="#/calc?tab=kidney">${ic("calc")} Calculate creatinine clearance</a>`}</p></div>
      <div class="card"><h3>${ic("shield")} Liver ${lvl(s.hepatic?.level)}</h3><p style="margin:0">${esc(s.hepatic?.text || "")}</p></div>
    </div>
    ${s.refs?.length ? `<h3>What the textbooks say</h3>${textbookHtml(s.refs.map(r => ({ book: r.book, text: r.text, ref: r.ref })), "drug")}` : ""}
    ${s.sources?.length ? `<p class="small muted">Also: ${s.sources.map(esc).join("; ")}. Draft, check with a pharmacist.</p>` : ""}`;
  }

  /* =========================================================
     Interactions
     ========================================================= */
  const SEV = { major: { cls: "bad", label: "Major" }, moderate: { cls: "warn", label: "Moderate" } };
  const pairRules = (x, y) => INTERACTIONS().filter(r => (r.a.includes(x) && r.b.includes(y)) || (r.a.includes(y) && r.b.includes(x)));
  const ruleHtml = (r, focus) => {
    const other = focus ? (r.a.includes(focus) ? r.b : r.a) : null;
    const names = (ids) => ids.map(id => drugById(id) ? `<a href="#/drug/${id}">${esc(shortName(id))}</a>` : esc(id)).join(" / ");
    return `<div class="ix ${r.severity}">
      <div class="row" style="justify-content:space-between;gap:.5rem"><strong>${focus ? names(other) : `${names(r.a)} <span class="muted">+</span> ${names(r.b)}`}</strong><span class="chip ${SEV[r.severity]?.cls || ""}">${esc(SEV[r.severity]?.label || r.severity)}</span></div>
      <p style="margin:.3rem 0">${esc(r.effect)}</p><p style="margin:0"><strong>Do:</strong> ${esc(r.action)}</p>
      <p class="small muted" style="margin:.3rem 0 0">${esc(r.ref || "")}</p></div>`;
  };
  function interactionsHtml(d) {
    const list = INTERACTIONS().filter(r => r.a.includes(d.id) || r.b.includes(d.id));
    if (!list.length) return "";
    list.sort((a, b) => (a.severity === "major" ? 0 : 1) - (b.severity === "major" ? 0 : 1));
    return `<div class="card"><h3>${ic("shield")} Interactions with other drugs</h3>${list.map(r => ruleHtml(r, d.id)).join("")}
      <p class="small muted" style="margin:.5rem 0 0">Pharmacological interactions only. For mixing in a line see <a href="#/compat">Never mix</a>. <a href="#/interactions?drugs=${d.id}">Check a full medicine list</a></p></div>`;
  }
  function viewInteractions(main, r) {
    let chosen = r.q.drugs ? r.q.drugs.split(",").filter(drugById) : store.get("ixList", []).filter(drugById);
    const draw = () => {
      store.set("ixList", chosen);
      const hits = [], mix = [];
      for (let i = 0; i < chosen.length; i++) for (let j = i + 1; j < chosen.length; j++) {
        pairRules(chosen[i], chosen[j]).forEach(x => { if (!hits.includes(x)) hits.push(x); });
        (window.COMPAT || []).filter(c => (c.a.includes(chosen[i]) && c.b.includes(chosen[j])) || (c.a.includes(chosen[j]) && c.b.includes(chosen[i]))).forEach(c => { if (!mix.includes(c)) mix.push(c); });
      }
      hits.sort((a, b) => (a.severity === "major" ? 0 : 1) - (b.severity === "major" ? 0 : 1));
      $("#ix-chosen").innerHTML = chosen.length ? chosen.map(id => `<button type="button" class="chip primary" data-rm="${id}">${esc(shortName(id))} ${ic("x")}</button>`).join("") : `<span class="small muted">No medicines chosen yet.</span>`;
      $("#ix-out").innerHTML = chosen.length < 2 ? `<p class="small muted">Add at least two medicines.</p>`
        : `${hits.length ? hits.map(x => ruleHtml(x)).join("") : `<div class="callout info">${ic("info")}<div>No interaction recorded here for these medicines. <strong>That does not prove the combination is safe.</strong> Ask a pharmacist when unsure.</div></div>`}
          ${mix.length ? `<h3 style="margin-top:1rem">${ic("swap")} Also: do not mix in a line</h3>${mix.map(c => `<div class="ix ${c.severity === "never" ? "major" : "moderate"}"><strong>${c.a.map(shortName).join(" / ")} + ${c.b.map(x => x === "*" ? "other drugs" : shortName(x)).join(" / ")}</strong><p style="margin:.3rem 0 0">${esc(c.what)} <strong>Do:</strong> ${esc(c.do)}</p></div>`).join("")}` : ""}`;
    };
    main.innerHTML = `
      <h1>${ic("shield")} Drug interactions</h1>
      <p class="text-2" style="max-width:64ch">Add the medicines a patient is receiving. MedBridge lists harmful combinations among them and what to do.</p>
      ${INTERACTIONS().length ? "" : `<div class="callout warn">${ic("alert")}<div>Interaction data is not loaded in this build.</div></div>`}
      <div class="card">
        <div class="field"><label for="ix-add">Add a medicine</label><select id="ix-add"><option value="">Choose…</option>${sortedDrugs().map(d => `<option value="${d.id}">${esc(d.name)}</option>`).join("")}</select></div>
        <div class="row" id="ix-chosen" style="gap:.35rem"></div>
        <div class="row" style="margin-top:.6rem"><button type="button" class="btn ghost sm" id="ix-clear">Clear list</button></div>
      </div>
      <div id="ix-out"></div>
      <p class="small muted">${INTERACTIONS().length} interaction rules. Draft reference; an absence here is not proof of safety.</p>`;
    $("#ix-add").addEventListener("change", e => { const v = e.target.value; if (v && !chosen.includes(v)) chosen.push(v); e.target.value = ""; draw(); });
    $("#ix-chosen").addEventListener("click", e => { const b = e.target.closest("[data-rm]"); if (b) { chosen = chosen.filter(x => x !== b.dataset.rm); draw(); } });
    $("#ix-clear").addEventListener("click", () => { chosen = []; draw(); });
    draw();
  }

  /* =========================================================
     Dose actions: share + independent double check
     ========================================================= */
  function expectedDose(d) {
    const w = patient.weight; if (!w || !d.calc) return null;
    const c = d.calc;
    if (c.type === "weight") { const r = FX.computeDose(c, w); return r ? { value: r.dose, unit: FX.unitOf(c), text: `${d.name}: ${FX.doseLine(r, c)}${r.capped ? " (max)" : ""} (${c.label})` } : null; }
    if (c.type === "infusion") {
      const df = c.dropFactor || 60;
      const r = Calc.infusionRate({ amount: c.amount, amountUnit: c.amountUnit, volumeMl: c.volumeMl, weightKg: w, dose: c.defaultDose, doseUnit: c.doseUnit, dropFactor: df });
      return r && !r.error ? { value: r.gttPerMin, unit: "drops/min", text: `${d.name}: ${fmt(r.gttPerMin, 0)} drops/min = ${fmt(r.mlPerHr, 1)} mL/h (${c.amount} ${c.amountUnit} in ${c.volumeMl} mL at ${c.defaultDose} ${c.doseUnit}, ${df} drops/mL set)` } : null;
    }
    return null;
  }
  function doseActions(d) {
    const exp = expectedDose(d); if (!exp) return "";
    const w = patient.weight;
    const text = `MedBridge dose check\n${exp.text}\nWeight: ${fmt(w, 1)} kg${patient.estimated ? " (estimated)" : ""}\n${DRAFT}`;
    const high = FX.HIGH_ALERT.includes(d.id);
    const last = store.get("dchecks", []).find(x => x.drug === d.id && Math.abs(x.weight - w) < 0.01 && Date.now() - x.at < 12 * 3600e3);
    return `<div class="row dose-actions">${shareButton(text, "Share dose")}</div>
      ${high ? `<div class="card dcheck" data-dc="${d.id}">
        <h4 style="margin:0">${ic("users")} High-alert medicine: independent double check</h4>
        <p class="small" style="margin:.3rem 0 .6rem">Ask a second nurse or doctor to work out the ${exp.unit === "drops/min" ? "drip rate" : "dose"} from the prescription, without looking at this screen. Enter their answer.</p>
        <div class="inline"><div class="field"><label for="dc-v-${d.id}">Their result (${esc(exp.unit)})</label><input id="dc-v-${d.id}" type="number" inputmode="decimal" step="any"></div>
        <div class="field"><label for="dc-i-${d.id}">Their initials</label><input id="dc-i-${d.id}" maxlength="12" autocomplete="off"></div></div>
        <button type="button" class="btn sm" data-dc-check="${d.id}">${ic("check")}Compare</button>
        <div class="dc-out">${last ? `<p class="small ${last.match ? "ok-text" : "bad-text"}" style="margin:.5rem 0 0">Last check ${new Date(last.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} by ${esc(last.initials)}: ${last.match ? "matched" : "did not match"}.</p>` : ""}</div>
      </div>` : ""}`;
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-dc-check]"); if (!b) return;
    const id = b.dataset.dcCheck, d = drugById(id), exp = d && expectedDose(d); if (!exp) return;
    const card = b.closest("[data-dc]"), v = parseFloat($(`#dc-v-${id}`, card).value), who = $(`#dc-i-${id}`, card).value.trim();
    const out = $(".dc-out", card);
    if (!(v >= 0)) { out.innerHTML = `<p class="small bad-text" style="margin:.5rem 0 0">Enter the second checker's result.</p>`; return; }
    if (!who) { out.innerHTML = `<p class="small bad-text" style="margin:.5rem 0 0">Enter the second checker's initials.</p>`; return; }
    const match = Math.abs(v - exp.value) <= Math.max(exp.value * 0.05, exp.unit === "drops/min" ? 1 : 0);
    const log = store.get("dchecks", []); log.unshift({ drug: id, weight: patient.weight, expected: exp.value, given: v, initials: who.slice(0, 12), match, at: Date.now() }); store.set("dchecks", log.slice(0, 60));
    out.innerHTML = match
      ? `<div class="callout ok-callout" style="margin:.6rem 0 0">${ic("check")}<div><strong>Match.</strong> ${fmt(v, 2)} against ${fmt(exp.value, 2)} ${esc(exp.unit)}. Recorded on this device with initials ${esc(who)}.</div></div>`
      : `<div class="callout danger" style="margin:.6rem 0 0">${ic("alert")}<div><strong>Mismatch. Do not give yet.</strong> The second check gave ${fmt(v, 2)}, MedBridge gives ${fmt(exp.value, 2)} ${esc(exp.unit)}. Recalculate together from the prescription, the weight and the ampoule strength.</div></div>`;
  });

  /* =========================================================
     Calculators: kidney function, fluids and blood
     ========================================================= */
  function calcKidney(pane) {
    const cr = patient.crcl;
    pane.innerHTML = `<div class="card"><h3>Creatinine clearance</h3>
      <p class="small muted">Adults: Cockcroft–Gault. Children under 18: bedside Schwartz. Not valid in acute kidney injury with changing creatinine, pregnancy, or severe wasting; use clinical judgement.</p>
      <div class="inline"><div class="field"><label for="k-age">Age (years)</label><input id="k-age" type="number" inputmode="decimal" min="0" max="110" value="${patient.ageYears ?? ""}"></div>
      <div class="field"><label for="k-sex">Sex</label><select id="k-sex"><option value="female" ${patient.sex === "female" ? "selected" : ""}>Female</option><option value="male" ${patient.sex === "male" ? "selected" : ""}>Male</option></select></div></div>
      <div class="inline"><div class="field"><label for="k-w">Weight (kg)</label><input id="k-w" type="number" inputmode="decimal" min="0" step="0.1" value="${patient.weight ?? ""}"></div>
      <div class="field"><label for="k-h">Height (cm, children)</label><input id="k-h" type="number" inputmode="decimal" min="30" max="220"></div></div>
      <div class="inline"><div class="field"><label for="k-c">Serum creatinine</label><input id="k-c" type="number" inputmode="decimal" min="0" step="any"></div>
      <div class="field"><label for="k-u">Unit</label><select id="k-u"><option value="umol">µmol/L</option><option value="mgdl">mg/dL</option></select></div></div>
      <div id="k-out"></div></div>
      <div class="card"><h3>Drugs that need a change</h3><div id="k-list"></div></div>`;
    const list = () => {
      const v = patient.crcl?.value;
      const rows = sortedDrugs().map(d => [d, SAFETY()[d.id]?.renal]).filter(([, rn]) => rn && rn.level !== "none");
      $("#k-list", pane).innerHTML = !rows.length ? `<p class="small muted">Kidney dosing data is not loaded.</p>` : `<ul class="klist">${rows.map(([d, rn]) => {
        const band = v ? renalBand(rn, v) : null;
        return `<li class="${band ? "on" : ""}"><a href="#/drug/${d.id}?tab=safety"><strong>${esc(shortName(d.id))}</strong></a> <span class="chip ${LEVEL[rn.level]?.cls}">${esc(LEVEL[rn.level]?.label)}</span>
          <div class="small" data-no-i18n lang="en">${esc(band ? band.text : rn.text)}</div></li>`;
      }).join("")}</ul><p class="small muted">${v ? `Lines for ${fmt(v, 0)} mL/min are highlighted.` : "Calculate clearance to highlight what applies."} Draft, check with a pharmacist.</p>`;
    };
    const calc = () => {
      const u = $("#k-u", pane).value, raw = parseFloat($("#k-c", pane).value);
      const age = $("#k-age", pane).value === "" ? null : +$("#k-age", pane).value;
      const res = Calc.crcl({ ageYears: age, weightKg: +$("#k-w", pane).value, sex: $("#k-sex", pane).value, creatUmol: u === "mgdl" ? raw * 88.4 : raw, heightCm: +$("#k-h", pane).value });
      const out = $("#k-out", pane);
      if (!res) { out.innerHTML = cr ? `<p class="small">Saved for this patient: <b>${fmt(cr.value, 0)} mL/min</b> (${esc(cr.method)}).</p>` : ""; return; }
      if (res.error) { out.innerHTML = `<p class="small bad-text">${esc(res.error)}</p>`; return; }
      const stage = res.value >= 60 ? "" : res.value >= 30 ? "Moderately reduced" : res.value >= 15 ? "Severely reduced" : "Kidney failure range";
      out.innerHTML = `<div class="result"><div class="big">${fmt(res.value, 0)} mL/min</div><div class="sub">${esc(res.method)}${stage ? ` · ${stage}` : ""}</div>
        <div class="sub"><button type="button" class="btn sm" id="k-save">${ic("user")}Use for this patient</button></div></div>`;
      $("#k-save", pane).addEventListener("click", () => {
        patient.crcl = { value: Calc.round(res.value, 1), method: res.method, at: Date.now() };
        patient.sex = $("#k-sex", pane).value; if (age != null) patient.ageYears = age;
        const w = parseFloat($("#k-w", pane).value); if (w > 0) { patient.weight = w; FX.syncPatientChip(); }
        toast("Kidney function saved for this patient."); list();
      });
    };
    pane.addEventListener("input", calc); calc(); list();
  }

  function calcFluids(pane, dropFactor) {
    const sub = store.get("fluidTab", "maint");
    const dfSel = (id, val) => `<div class="field"><label for="${id}">Drop factor (drops/mL)</label><select id="${id}">${[10, 15, 20, 60].map(f => `<option value="${f}" ${f == val ? "selected" : ""}>${f}${f === 60 ? " (microdrip)" : ""}</option>`).join("")}</select></div>`;
    const wIn = (id, v = patient.weight) => `<div class="field"><label for="${id}">Weight (kg)</label><input id="${id}" type="number" inputmode="decimal" min="0" step="0.1" value="${v ?? ""}"></div>`;
    const drops = (mlh, df) => `${fmt(mlh * df / 60, 0)} drops/min (${fmt(mlh * df / 240, 0)}/15 s)`;
    pane.innerHTML = `<div class="seg" id="fl-seg" role="group" aria-label="Fluid calculator">
        ${[["maint", "Maintenance"], ["newborn", "Newborn"], ["burns", "Burns"], ["blood", "Transfusion"], ["oxygen", "Oxygen cylinder"]].map(([k, v]) => `<button type="button" data-fl="${k}" class="${k === sub ? "active" : ""}">${v}</button>`).join("")}
      </div><div id="fl-pane" style="margin-top:.8rem"></div>`;
    const views = {
      maint(p) {
        p.innerHTML = `<div class="card"><h3>Maintenance fluid (Holliday–Segar)</h3>
          <div class="inline">${wIn("m-w")}<div class="field"><label for="m-t">Temperature °C (optional)</label><input id="m-t" type="number" inputmode="decimal" step="0.1" placeholder="e.g. 39"></div></div>
          ${dfSel("m-df", dropFactor)}<div id="m-out"></div>
          <ul class="small" style="margin:.8rem 0 0" data-no-i18n lang="en"><li>Use an isotonic fluid with 5 % dextrose, such as Ringer's lactate or 0.9 % saline with D5, with potassium once passing urine. Not for newborns under 28 days: use the Newborn tab.</li>
          <li>Give about two thirds of this in meningitis, raised intracranial pressure, heart failure, after surgery, or when ADH secretion is likely.</li>
          <li>Replace ongoing losses such as diarrhoea or NG drainage separately, as they occur. Not for severe malnutrition or shock resuscitation.</li></ul>
          <p class="small muted" style="margin:.4rem 0 0" data-no-i18n lang="en">Nelson 22nd ed. 2024, ch. 74, Tables 74.2–74.3, p. 526.</p></div>`;
        const calc = () => {
          const r = Calc.maintenance(+$("#m-w", p).value, +$("#m-t", p).value), df = +$("#m-df", p).value;
          $("#m-out", p).innerHTML = r ? `<div class="result"><div class="big">${fmt(r.perHour, 0)} mL/h</div>
            <div class="sub">${fmt(r.perDay, 0)} mL per 24 h · ${drops(r.perHour, df)}${r.feverFactor > 1 ? ` · includes about ${fmt((r.feverFactor - 1) * 100, 0)} % extra for fever` : ""}</div>
            ${r.capped ? `<div class="sub">Capped at the usual maximum of 100 mL/h (2.4 L/day).</div>` : ""}</div>` : "";
        };
        p.addEventListener("input", calc); calc();
      },
      newborn(p) {
        p.innerHTML = `<div class="card"><h3>Newborn daily fluid</h3>
          <div class="inline">${wIn("n-w")}<div class="field"><label for="n-d">Day of life (1 = first day)</label><input id="n-d" type="number" inputmode="numeric" min="1" max="28" value="${patient.pnaDays != null ? patient.pnaDays + 1 : ""}"></div></div>
          <div id="n-out"></div>
          <ul class="small" style="margin:.8rem 0 0" data-no-i18n lang="en"><li>Day 1: 60 mL/kg/day, day 2: 90, day 3: 120, then 150 mL/kg/day. Feed by mouth or tube as soon as possible and count feeds in the total.</li>
          <li>For IV fluid in the first days use 10 % dextrose. Increase for preterm babies under radiant warmers or phototherapy. Restrict in asphyxia, meningitis and heart failure.</li>
          <li>Run through a burette holding no more than 1–2 hours of fluid, with a microdrip set: drops per minute equal mL per hour.</li></ul>
          <p class="small muted" style="margin:.4rem 0 0" data-no-i18n lang="en">WHO Pocket Book of Hospital Care for Children 2013. Draft, check the national neonatal protocol.</p></div>`;
        const calc = () => {
          const r = Calc.neonatalFluid(+$("#n-w", p).value, +$("#n-d", p).value);
          $("#n-out", p).innerHTML = r ? `<div class="result"><div class="big">${fmt(r.perHour, 1)} mL/h</div>
            <div class="sub">${r.perKgDay} mL/kg/day = ${fmt(r.perDay, 0)} mL per 24 h · ${fmt(r.per3h, 0)} mL per 3-hourly feed · microdrip ${fmt(r.perHour, 0)} drops/min</div></div>` : "";
        };
        p.addEventListener("input", calc); calc();
      },
      burns(p) {
        p.innerHTML = `<div class="card"><h3>Burns resuscitation fluid</h3>
          <div class="inline">${wIn("b-w")}<div class="field"><label for="b-t">Burn area (% body surface)</label><input id="b-t" type="number" inputmode="decimal" min="0" max="100" step="1"></div></div>
          <div class="inline"><div class="field"><label for="b-f">Formula</label><select id="b-f">
            <option value="2" ${patient.weight >= 30 || !patient.weight ? "selected" : ""}>2 mL/kg/% (adults, current burns consensus)</option><option value="3" ${patient.weight > 0 && patient.weight < 30 ? "selected" : ""}>3 mL/kg/% (children)</option><option value="4">4 mL/kg/% (Parkland; electrical burns)</option></select></div>
          <div class="field"><label for="b-h">Hours since the burn</label><input id="b-h" type="number" inputmode="decimal" min="0" max="24" step="0.5" value="0"></div></div>
          ${dfSel("b-df", 20)}<div id="b-out"></div>
          <ul class="small" style="margin:.8rem 0 0" data-no-i18n lang="en"><li>Use Ringer's lactate. Formula fluid is for burns over about 15–20 % in adults and 10 % in children; smaller burns usually drink.</li>
          <li>The formula is only a starting point. Adjust every hour to urine output: adults 0.5 mL/kg/h (30–50 mL/h), children 1 mL/kg/h.</li>
          <li>Children under 20 kg also need maintenance fluid containing glucose. Palm with fingers is about 1 % of body surface.</li></ul>
          <p class="small muted" style="margin:.4rem 0 0" data-no-i18n lang="en">Schwartz's Principles of Surgery 11th ed., ch. 8 Burns, p. 254.</p></div>`;
        const calc = () => {
          const w = +$("#b-w", p).value, h = +$("#b-h", p).value || 0, df = +$("#b-df", p).value;
          const r = Calc.burns({ weightKg: w, tbsa: +$("#b-t", p).value, mlPerKgPct: +$("#b-f", p).value, hoursSinceBurn: h });
          if (!r) { $("#b-out", p).innerHTML = ""; return; }
          const m = w > 0 && w < 20 ? Calc.maintenance(w) : null;
          $("#b-out", p).innerHTML = `<div class="result"><div class="big">${fmt(r.total, 0)} mL in 24 h</div>
            ${h < 8 ? `<div class="sub"><b>First half:</b> ${fmt(r.first8, 0)} mL by 8 h after the burn, so ${fmt(r.rateFirst, 0)} mL/h over the next ${fmt(r.firstHoursLeft, 1)} h = ${drops(r.rateFirst, df)}</div>
              <div class="sub"><b>Second half:</b> ${fmt(r.next16, 0)} mL over the following 16 h = ${fmt(r.rateNext, 0)} mL/h</div>`
              : `<div class="sub bad-text">More than 8 hours have passed. Add up what was already given, give the shortfall, and get senior advice.</div>`}
            ${m ? `<div class="sub">Plus maintenance with glucose: ${fmt(m.perHour, 0)} mL/h.</div>` : ""}</div>`;
        };
        p.addEventListener("input", calc); calc();
      },
      blood(p) {
        p.innerHTML = `<div class="card"><h3>Transfusion volume</h3>
          <div class="inline">${wIn("t-w")}<div class="field"><label for="t-p">Product</label><select id="t-p"><option value="packed">Packed red cells</option><option value="whole">Whole blood</option></select></div></div>
          <div class="inline"><div class="field"><label for="t-c">Current Hb (g/dL)</label><input id="t-c" type="number" inputmode="decimal" step="0.1"></div>
          <div class="field"><label for="t-g">Target Hb (g/dL)</label><input id="t-g" type="number" inputmode="decimal" step="0.1"></div></div>
          ${dfSel("t-df", 20)}<div id="t-out"></div>
          <ul class="small" style="margin:.8rem 0 0" data-no-i18n lang="en"><li>About 5 mL/kg of packed cells, or 10 mL/kg of whole blood, raises haemoglobin by 1 g/dL. One transfusion is usually no more than 10 mL/kg packed cells or 20 mL/kg whole blood; reassess before giving more.</li>
          <li>Signs of heart failure: give 5–7 mL/kg packed cells slowly, with furosemide 1 mg/kg IV at the start. Severe malnutrition: 10 mL/kg over 3 hours.</li>
          <li>Finish each unit within 4 hours of leaving the fridge. Watch temperature, pulse and breathing every 15 minutes at the start.</li></ul>
          <p class="small muted" style="margin:.4rem 0 0" data-no-i18n lang="en">Nelson 22nd ed. 2024, ch. 62 p. 428 and neonatal transfusion p. 1122; WHO Pocket Book 2013.</p></div>`;
        const calc = () => {
          const w = +$("#t-w", p).value, prod = $("#t-p", p).value;
          const r = Calc.transfusion({ weightKg: w, currentHb: +$("#t-c", p).value, targetHb: +$("#t-g", p).value, product: prod });
          if (!r) { $("#t-out", p).innerHTML = ""; return; }
          const vol = r.volume, capped = r.capped, rate = vol / 3;
          $("#t-out", p).innerHTML = `<div class="result"><div class="big">${fmt(vol, 0)} mL ${prod === "whole" ? "whole blood" : "packed cells"}</div>
            <div class="sub">Over 3–4 h: about ${fmt(rate, 0)} mL/h = ${drops(rate, +$("#t-df", p).value)} with a blood set.</div>
            ${capped ? `<div class="sub bad-text">Limited to one standard transfusion (${prod === "whole" ? "20" : "10"} mL/kg). Recheck Hb before more.</div>` : ""}
            ${w >= 40 ? `<div class="sub">In an adult, one unit raises Hb by roughly 1 g/dL.</div>` : ""}</div>`;
        };
        p.addEventListener("input", calc); calc();
      },
      oxygen(p) {
        p.innerHTML = `<div class="card"><h3>How long will the cylinder last?</h3>
          <div class="inline"><div class="field"><label for="o-s">Cylinder content when full (litres)</label><select id="o-s"><option value="340">340 L</option><option value="680" selected>680 L</option><option value="1360">1360 L</option><option value="3400">3400 L</option><option value="6800">6800 L</option></select></div>
          <div class="field"><label for="o-f">Flow (L/min)</label><input id="o-f" type="number" inputmode="decimal" min="0" step="0.5" value="2"></div></div>
          <div class="inline"><div class="field"><label for="o-p">Gauge pressure now</label><input id="o-p" type="number" inputmode="decimal" min="0" step="1"></div>
          <div class="field"><label for="o-full">Pressure when full</label><input id="o-full" type="number" inputmode="decimal" min="1" step="1" value="137"></div></div>
          <p class="small muted">Use the same unit for both pressures: bar (full is usually 137) or psi (usually 2000). The content in litres is printed on the cylinder.</p>
          <div id="o-out"></div></div>`;
        const calc = () => {
          const r = Calc.cylinderMinutes({ fullLitres: +$("#o-s", p).value, pressure: +$("#o-p", p).value, fullPressure: +$("#o-full", p).value, flow: +$("#o-f", p).value });
          const hm = (m) => m >= 60 ? `${Math.floor(m / 60)} h ${Math.round(m % 60)} min` : `${Math.round(m)} min`;
          $("#o-out", p).innerHTML = r ? `<div class="result"><div class="big">${hm(r.safeMinutes)}</div>
            <div class="sub">before changing, keeping a 20 % reserve. Empty after about ${hm(r.minutes)} (${fmt(r.litresLeft, 0)} L left).</div></div>` : "";
        };
        p.addEventListener("input", calc); calc();
      }
    };
    const show = (k) => { store.set("fluidTab", k); const old = $("#fl-pane", pane), fresh = old.cloneNode(false); old.replaceWith(fresh); views[k](fresh); pane.querySelectorAll("#fl-seg button").forEach(b => b.classList.toggle("active", b.dataset.fl === k)); };
    $("#fl-seg", pane).addEventListener("click", e => { const b = e.target.closest("[data-fl]"); if (b) show(b.dataset.fl); });
    show(views[sub] ? sub : "maint");
  }

  /* =========================================================
     Wall charts
     ========================================================= */
  function viewCharts(main, r) {
    let kind = r.q.kind || store.get("chartKind", "drip");
    const draw = () => {
      store.set("chartKind", kind);
      const controls = {
        drip: `<div class="field"><label for="ch-df">Giving set</label><select id="ch-df">${[10, 15, 20, 60].map(f => `<option value="${f}" ${f == store.get("chartDf", 20) ? "selected" : ""}>${f} drops/mL${f === 60 ? " (microdrip)" : ""}</option>`).join("")}</select></div>`,
        case: `<div class="field"><label for="ch-case">Case</label><select id="ch-case">${[...CONDITIONS].sort((a, b) => a.name.localeCompare(b.name)).map(c => `<option value="${c.id}" ${c.id === store.get("chartCase", "eclampsia") ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select></div>`,
        ward: `<div class="field"><label for="ch-ward">Ward</label><select id="ch-ward">${Object.entries(WARDS).map(([k, v]) => `<option value="${k}" ${k === store.get("chartWard", "maternity") ? "selected" : ""}>${esc(v.label)}</option>`).join("")}</select></div>`
      };
      main.innerHTML = `
        <div class="resus-head"><div><h1 style="margin:0">${ic("print")} Wall charts</h1><p class="text-2" style="margin:.2rem 0 0">One-page references to print and put up on the ward.</p></div>
          <button type="button" class="btn sm" id="ch-print">${ic("print")}Print</button></div>
        <div class="card resus-input">
          <div class="seg" id="ch-kind" role="group" aria-label="Chart type">${[["drip", "Drip-rate table"], ["case", "Case protocol"], ["ward", "Ward drug cards"]].map(([k, v]) => `<button type="button" data-kind="${k}" class="${k === kind ? "active" : ""}">${v}</button>`).join("")}</div>
          <div style="margin-top:.7rem">${controls[kind]}</div>
        </div>
        <div class="sheet" id="sheet" data-no-i18n lang="en"></div>`;
      $("#ch-kind").addEventListener("click", e => { const b = e.target.closest("[data-kind]"); if (b) { kind = b.dataset.kind; draw(); } });
      $("#ch-print").addEventListener("click", () => { document.body.classList.add("print-sheet"); window.print(); document.body.classList.remove("print-sheet"); });
      const sheet = $("#sheet");
      const foot = `<p class="sheet-foot">MedBridge · developed and put together by Dr Bruktayt Engida · ${dateLabel(new Date())} · Draft reference, not clinically verified. Check against the national protocol.</p>`;
      if (kind === "drip") {
        const paint = () => {
          const df = +$("#ch-df").value; store.set("chartDf", df);
          const vols = [100, 250, 500, 1000], times = [[30, "30 min"], [60, "1 h"], [120, "2 h"], [240, "4 h"], [360, "6 h"], [480, "8 h"], [720, "12 h"], [1440, "24 h"]];
          const cell = (v, m) => { const g = v * df / m; return g > 150 ? `<td class="muted">too fast</td>` : g < 4 ? `<td class="muted">${fmt(g, 1)}</td>` : `<td><b>${fmt(g, 0)}</b></td>`; };
          const rates = [5, 10, 15, 20, 30, 40, 50, 60, 80, 100, 125, 150, 200, 250];
          sheet.innerHTML = `<h2 class="sheet-title">Drops per minute · ${df} drops/mL giving set</h2>
            <table class="chart-table"><thead><tr><th>Volume</th>${times.map(t => `<th>${t[1]}</th>`).join("")}</tr></thead>
            <tbody>${vols.map(v => `<tr><th>${v} mL</th>${times.map(t => cell(v, t[0])).join("")}</tr>`).join("")}</tbody></table>
            <h3>mL per hour to drops</h3>
            <table class="chart-table"><thead><tr><th>mL/h</th>${rates.map(x => `<th>${x}</th>`).join("")}</tr></thead>
            <tbody><tr><th>drops/min</th>${rates.map(x => `<td><b>${fmt(x * df / 60, 0)}</b></td>`).join("")}</tr><tr><th>per 15 s</th>${rates.map(x => `<td>${fmt(x * df / 240, 0)}</td>`).join("")}</tr></tbody></table>
            <ul class="sheet-list"><li>drops/min = volume (mL) × drop factor ÷ minutes. Count for 15 seconds and multiply by 4.</li><li>Below 4 drops/min the rate cannot be held steady: use a more dilute bag or a microdrip set. Above 150 cannot be counted.</li><li>Recount after 15 minutes and after the patient moves. Time-tape the bag.</li></ul>${foot}`;
        };
        $("#ch-df").addEventListener("change", paint); paint();
      }
      if (kind === "case") {
        const paint = () => {
          const c = CONDITIONS.find(x => x.id === $("#ch-case").value); store.set("chartCase", c.id);
          const order = ["first", "adjunct", "alternative", "supportive", "avoid"];
          sheet.innerHTML = `<h2 class="sheet-title">${esc(c.name)}</h2><p class="sheet-sum">${esc(c.summary)}</p>
            <div class="sheet-cols">
              ${c.redflags?.length ? `<div class="sheet-box red"><h3>Red flags</h3><ul>${c.redflags.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>` : ""}
              ${c.steps?.length ? `<div class="sheet-box"><h3>What to do, in order</h3><ol>${c.steps.map(x => `<li>${esc(x)}</li>`).join("")}</ol></div>` : ""}
            </div>
            <h3>Drugs</h3>
            ${order.map(role => { const arr = c.drugs.filter(x => x.role === role); return arr.length ? `<div class="sheet-role ${ROLES[role].cls}"><b>${ROLES[role].label}</b><ul>${arr.map(x => `<li><b>${esc(shortName(x.id))}</b> ${esc(x.note || "")}</li>`).join("")}</ul></div>` : ""; }).join("")}
            ${foot}`;
        };
        $("#ch-case").addEventListener("change", paint); paint();
      }
      if (kind === "ward") {
        const paint = () => {
          const w = $("#ch-ward").value; store.set("chartWard", w);
          const ds = sortedDrugs().filter(d => d.wards.includes(w));
          sheet.innerHTML = `<h2 class="sheet-title">${esc(WARDS[w].label)} · drug cards</h2>
            <div class="ward-cards">${ds.map(d => { const m = d.improvised[0]; const s = SAFETY()[d.id]; return `<div class="wcard">
              <div class="wc-name">${esc(d.name)} <span class="wc-cls">${esc(d.cls)}</span></div>
              <div class="wc-pres">${esc(d.presentation[0] || "")}</div>
              <ul>${d.standard.items.slice(0, 2).map(i => `<li><b>${esc(i.label)}:</b> ${esc(i.text)}</li>`).join("")}</ul>
              ${m ? `<div class="wc-np"><b>No pump:</b> ${esc(m.title)}</div>` : ""}
              ${d.antidote ? `<div class="wc-anti"><b>Antidote:</b> ${esc(d.antidote)}</div>` : ""}
              ${s ? `<div class="wc-flags">Pregnancy: ${esc(LEVEL[s.pregnancy?.level]?.label || "—")} · Kidney: ${esc(LEVEL[s.renal?.level]?.label || "—")}</div>` : ""}
            </div>`; }).join("")}</div>${foot}`;
        };
        $("#ch-ward").addEventListener("change", paint); paint();
      }
    };
    draw();
  }

  /* =========================================================
     Practice quiz
     ========================================================= */
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const shuffle = (a) => { const x = [...a]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };
  const uniq = (arr, n) => { const out = []; for (const v of arr) if (v != null && !out.some(o => String(o) === String(v))) out.push(v); return out.slice(0, n); };
  const otherDrugs = (exclude, n) => shuffle(DRUG_DB.filter(d => !exclude.includes(d.id))).slice(0, n).map(d => d.id);
  const GEN = {
    maths: [
      () => {
        const vol = pick([250, 500, 1000]), hrs = pick([2, 4, 6, 8, 12]), df = pick([20, 20, 15, 60]);
        const ans = Math.round(vol * df / (hrs * 60)); if (ans < 4 || ans > 150) return null;
        const wrong = uniq([Math.round(vol / hrs), Math.round(ans * 60 / (df === 60 ? 20 : 60)), Math.round(ans * 2), Math.round(ans / 2), ans + 7], 3).filter(x => x !== ans && x > 0);
        if (wrong.length < 3) return null;
        return { topic: "Drip rate", q: `${vol} mL must run over ${hrs} hours with a ${df} drops/mL giving set. How many drops per minute?`,
          options: shuffle([ans, ...wrong.slice(0, 3)].map(v => `${v} drops/min`)), answer: `${ans} drops/min`,
          why: `Drops/min = volume × drop factor ÷ minutes = ${vol} × ${df} ÷ ${hrs * 60} = ${ans}.`, link: "#/calc?tab=drip" };
      },
      () => {
        const d = pick(DRUG_DB.filter(x => x.calc?.type === "weight" && x.calc.conc > 0 && x.calc.doseUnit !== "mL"));
        const w = pick([4, 8, 12, 16, 22]); const r = FX.computeDose(d.calc, w); if (!r || !(r.volumeMl >= 0.1)) return null;
        const v = (x) => `${fmt(x, x < 1 ? 2 : 1)} mL`;
        const unc = d.calc.dosePerKg * w / d.calc.conc;
        const wrong = uniq([v(r.volumeMl * 10), v(r.volumeMl / 10), r.capped ? v(unc) : v(r.volumeMl * 2), v(r.volumeMl * 1.5)], 4).filter(x => x !== v(r.volumeMl)).slice(0, 3);
        if (wrong.length < 3) return null;
        return { topic: "Dose by weight", q: `${d.name.split(" (")[0]}: ${d.calc.label}. What volume do you draw up for a ${w} kg child?`,
          options: shuffle([v(r.volumeMl), ...wrong]), answer: v(r.volumeMl),
          why: `${fmt(r.perKg, 3)} ${d.calc.doseUnit}/kg × ${w} kg = ${fmt(d.calc.dosePerKg * w, 2)} ${d.calc.doseUnit}${r.capped ? `, capped at the maximum ${d.calc.maxDose} ${d.calc.doseUnit}` : ""}${r.raised ? `, raised to the minimum ${d.calc.minDose} ${d.calc.doseUnit}` : ""}. ${fmt(r.dose, 2)} ÷ ${d.calc.conc} ${d.calc.concUnit} = ${v(r.volumeMl)}.`, link: `#/drug/${d.id}` };
      }
    ],
    cases: [
      () => {
        const c = pick(CONDITIONS.filter(x => x.drugs.some(d => d.role === "first"))); const first = pick(c.drugs.filter(d => d.role === "first"));
        const opts = [first.id, ...otherDrugs(c.drugs.map(d => d.id), 3)];
        return { topic: "First line", q: `Which of these is a first-line drug in ${c.name.toLowerCase()}?`, options: shuffle(opts.map(shortName)), answer: shortName(first.id), why: first.note || "", link: `#/case/${c.id}` };
      },
      () => {
        const pool = CONDITIONS.filter(x => x.drugs.some(d => d.role === "avoid") && x.drugs.filter(d => ["first", "adjunct"].includes(d.role)).length >= 3); if (!pool.length) return null;
        const c = pick(pool), av = pick(c.drugs.filter(d => d.role === "avoid"));
        const opts = [av.id, ...shuffle(c.drugs.filter(d => ["first", "adjunct"].includes(d.role))).slice(0, 3).map(d => d.id)];
        return { topic: "Avoid", q: `In ${c.name.toLowerCase()}, which of these should be avoided?`, options: shuffle(opts.map(shortName)), answer: shortName(av.id), why: av.note || "", link: `#/case/${c.id}` };
      }
    ],
    safety: [
      () => {
        // blood and "any other drug" rules make every distractor correct too, so leave them out
        const C = window.COMPAT || [];
        const loners = ["blood-transfusion", ...C.filter(c => c.b.includes("*")).flatMap(c => c.a)];
        const rule = pick(C.filter(c => c.severity === "never" && !c.b.includes("*") && !c.a.some(x => loners.includes(x)))); if (!rule) return null;
        const a = pick(rule.a), b = pick(rule.b.filter(x => drugById(x) && !loners.includes(x))); if (!b) return null;
        const involved = [...loners, ...C.filter(c => c.a.includes(a) || c.b.includes(a)).flatMap(c => [...c.a, ...c.b])];
        return { topic: "Never mix", q: `Which of these must never share a line or syringe with ${shortName(a)}?`, options: shuffle([b, ...otherDrugs([a, ...involved], 3)].map(shortName)), answer: shortName(b), why: `${rule.what} ${rule.do}`, link: "#/compat" };
      },
      () => {
        const ids = Object.keys(window.SUBSTITUTES || {}).filter(k => SUBSTITUTES[k].some(x => x.with && drugById(x.with))); if (!ids.length) return null;
        const id = pick(ids), s = pick(SUBSTITUTES[id].filter(x => x.with && drugById(x.with)));
        // wrong answers must not be drugs used alongside either drug in any case, or they may also be valid
        const inCaseWith = (drug) => CONDITIONS.filter(c => c.drugs.some(x => x.id === drug)).flatMap(c => c.drugs.map(x => x.id));
        const exclude = [id, ...SUBSTITUTES[id].map(x => x.with).filter(Boolean), ...inCaseWith(id), ...inCaseWith(s.with), ...Object.values(SUBSTITUTES).flat().filter(x => x.use === s.use).map(x => x.with)];
        return { topic: "Stock-out", q: `${shortName(id)} is out of stock. For ${s.use.toLowerCase()}, what can be used instead?`, options: shuffle([s.with, ...otherDrugs(exclude, 3)].map(shortName)), answer: shortName(s.with), why: s.note, link: `#/drug/${id}` };
      },
      () => {
        const rules = INTERACTIONS().filter(x => x.severity === "major"); if (!rules.length) return null;
        const r = pick(rules), a = pick(r.a.filter(drugById)), b = pick(r.b.filter(drugById)); if (!a || !b) return null;
        const involved = INTERACTIONS().filter(x => x.a.includes(a) || x.b.includes(a)).flatMap(x => [...x.a, ...x.b]);
        return { topic: "Interaction", q: `A patient is on ${shortName(a)}. Which of these has a major interaction with it?`, options: shuffle([b, ...otherDrugs([a, ...involved], 3)].map(shortName)), answer: shortName(b), why: `${r.effect} ${r.action}`, link: `#/drug/${a}?tab=safety` };
      },
      () => {
        const s = SAFETY(); const avoid = Object.keys(s).filter(k => s[k].pregnancy?.level === "avoid" && drugById(k)); const safe = Object.keys(s).filter(k => s[k].pregnancy?.level === "safe" && drugById(k));
        if (!avoid.length || safe.length < 3) return null;
        const a = pick(avoid);
        return { topic: "Pregnancy", q: "Which of these should be avoided in pregnancy?", options: shuffle([a, ...shuffle(safe).slice(0, 3)].map(shortName)), answer: shortName(a), why: s[a].pregnancy.text, link: `#/drug/${a}?tab=safety` };
      }
    ]
  };
  function viewQuiz(main) {
    const best = store.get("quizBest", {});
    const start = (topics) => {
      const gens = topics.flatMap(t => GEN[t]);
      const qs = []; let guard = 0;
      while (qs.length < 10 && guard++ < 200) { const q = pick(gens)(); if (q && q.options.length === 4 && !qs.some(x => x.q === q.q)) qs.push(q); }
      let i = 0, score = 0;
      const key = topics.join("+");
      const show = () => {
        if (i >= qs.length) {
          const prev = best[key] || 0; if (score > prev) { best[key] = score; store.set("quizBest", best); }
          main.innerHTML = `<h1>${ic("help")} Practice quiz</h1><div class="card quiz-end"><div class="big">${score} / ${qs.length}</div>
            <p>${score >= 9 ? "Excellent." : score >= 7 ? "Good. Review the ones you missed." : "Keep practising. Open the linked pages to review."}</p>
            <p class="small muted">Best for this set: ${Math.max(prev, score)} / ${qs.length}</p>
            <div class="row"><button type="button" class="btn" id="qz-again">${ic("play")}Another round</button><button type="button" class="btn ghost" id="qz-menu">Choose topics</button></div></div>`;
          $("#qz-again").addEventListener("click", () => start(topics)); $("#qz-menu").addEventListener("click", () => viewQuiz(main));
          return;
        }
        const q = qs[i];
        main.innerHTML = `<h1>${ic("help")} Practice quiz</h1>
          <div class="quiz-bar"><span>Question ${i + 1} of ${qs.length}</span><span>Score ${score}</span></div>
          <div class="card quiz-q"><div class="small muted">${esc(q.topic)}</div><h3 data-no-i18n lang="en">${esc(q.q)}</h3>
            <div class="quiz-opts" data-no-i18n lang="en">${q.options.map(o => `<button type="button" class="quiz-opt" data-opt="${esc(o)}">${esc(o)}</button>`).join("")}</div>
            <div id="qz-why"></div></div>`;
        $(".quiz-opts").addEventListener("click", e => {
          const b = e.target.closest("[data-opt]"); if (!b || main.querySelector(".quiz-opt.done")) return;
          const right = b.dataset.opt === String(q.answer); if (right) score++;
          main.querySelectorAll(".quiz-opt").forEach(x => { x.classList.add("done"); x.disabled = true; if (x.dataset.opt === String(q.answer)) x.classList.add("right"); });
          if (!right) b.classList.add("wrong");
          $("#qz-why").innerHTML = `<div class="callout ${right ? "ok-callout" : "warn"}" style="margin-top:.8rem">${ic(right ? "check" : "info")}<div><strong>${right ? "Correct." : `Answer: ${esc(q.answer)}.`}</strong> <span data-no-i18n lang="en">${esc(q.why)}</span> ${q.link ? `<a href="${q.link}" target="_blank" rel="noopener">Review</a>` : ""}</div></div>
            <button type="button" class="btn" id="qz-next" style="margin-top:.6rem">${i + 1 < qs.length ? "Next question" : "See score"}${ic("right")}</button>`;
          $("#qz-next").addEventListener("click", () => { i++; show(); });
        });
      };
      show();
    };
    const T = [["maths", "Dose and drip maths", "Drip rates and weight-based volumes."], ["cases", "Cases", "First-line drugs and what to avoid."], ["safety", "Safety", "Never mix, stock-outs, interactions and pregnancy."]];
    main.innerHTML = `<h1>${ic("help")} Practice quiz</h1>
      <p class="text-2" style="max-width:62ch">Ten questions built from MedBridge's own drug, case and safety data, with the working shown. For training only. Questions are in English, as the clinical content is.</p>
      <div class="tools-grid">${T.map(([k, t, d]) => `<button type="button" class="card tool" data-topic="${k}"><span class="tool-ic">${ic("help")}</span><div><h3 style="margin:0 0 .2rem">${t}</h3><p class="small text-2" style="margin:0">${d}${best[k] != null ? ` Best: ${best[k]}/10.` : ""}</p></div></button>`).join("")}
        <button type="button" class="card tool" data-topic="all"><span class="tool-ic">${ic("zap")}</span><div><h3 style="margin:0 0 .2rem">Mixed</h3><p class="small text-2" style="margin:0">All topics.${best["maths+cases+safety"] != null ? ` Best: ${best["maths+cases+safety"]}/10.` : ""}</p></div></button></div>`;
    main.querySelector(".tools-grid").addEventListener("click", e => { const b = e.target.closest("[data-topic]"); if (b) start(b.dataset.topic === "all" ? ["maths", "cases", "safety"] : [b.dataset.topic]); });
  }

  return {
    dateLabel, share, shareButton, neonatalCard, safetyChips, safetyCards, interactionsHtml, doseActions,
    calcKidney, calcFluids, renalBand, neoRule, neoDose,
    views: { newborn: viewNewborn, interactions: viewInteractions, charts: viewCharts, quiz: viewQuiz },
    _test: { neoRule, neoDose, renalBand, GEN, expectedDose }
  };
};
