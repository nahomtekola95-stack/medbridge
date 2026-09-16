/* ============================================================
   MedBridge ward board and shift handover.
   A device-local list of beds (initials only, never full names) with
   acuity, weight, working diagnosis, tasks, last observations and the
   dose schedules started for that bed. The handover page turns the board
   into an I-PASS summary to print, share or record.
   Registered by app.js as WD. Stored under mb:wardBoard.
   ============================================================ */
window.Ward = function (ctx) {
  const { $, esc, ic, toast, render, FX, shareButton } = ctx;
  const KEY = "mb:wardBoard";
  const load = () => { try { return { name: "", beds: [], handovers: [], ...(JSON.parse(localStorage.getItem(KEY)) || {}) }; } catch { return { name: "", beds: [], handovers: [] }; } };
  const save = (b) => { try { localStorage.setItem(KEY, JSON.stringify(b)); } catch {} };
  const uid = () => Math.random().toString(36).slice(2, 10);
  const L = (s) => window.I18N ? I18N.t(s) : s;
  const ACUITY = {
    unstable: { label: "Unstable", cls: "bad", rank: 0 },
    watch: { label: "Watch", cls: "warn", rank: 1 },
    stable: { label: "Stable", cls: "ok", rank: 2 }
  };
  const fmtTime = (ms) => new Date(ms).toLocaleTimeString([], window.I18N ? I18N.timeOpts() : { hour: "2-digit", minute: "2-digit" });
  const ago = (ms) => { const m = Math.round((Date.now() - ms) / 60000); return m < 1 ? "just now" : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.floor(m / 60)} h ago` : `${Math.floor(m / 1440)} d ago`; };
  const caseName = (id) => CONDITIONS.find(c => c.id === id)?.name || "";
  /* gestational age: calculated from the saved LNMP-equivalent when there is one, otherwise the typed value */
  const gaText = (x) => {
    if (x.lmp) { const days = Math.round((new Date().setHours(0, 0, 0, 0) - new Date(x.lmp).setHours(0, 0, 0, 0)) / 864e5); if (days >= 0 && days <= 45 * 7) return `${Math.floor(days / 7)}+${days % 7}`; }
    return x.ga || "";
  };
  window.WD_BOARD = load;
  window.WD_SETLMP = (id, lmp) => { const b = load(); const bed = b.beds.find(y => y.id === id); if (!bed) return false; bed.lmp = lmp; bed.ga = ""; bed.updated = Date.now(); save(b); return true; };

  /* schedules started for a bed, with their next due dose */
  function bedDoses(bed) {
    return FX.scheds.list().filter(s => s.bed === bed.id).map(s => ({ s, st: FX.schedState(s) })).filter(x => x.st);
  }
  function doseStatus(bed) {
    const list = bedDoses(bed); let overdue = 0, due = 0, next = null;
    for (const { s, st } of list) {
      overdue += st.overdue; due += st.dueSoon;
      if (st.next && (!next || st.next.due < next.due)) next = { ...st.next, name: st.reg.name.split(" — ")[0], sid: s.id };
    }
    return { list, overdue, due, next };
  }

  /* =========================================================
     Board
     ========================================================= */
  function viewBoard(main, route) {
    if (route.q.bed) return viewBed(main, route);
    const b = load();
    const beds = [...b.beds].map(x => ({ x, ds: doseStatus(x) }))
      .sort((p, q) => (ACUITY[p.x.acuity]?.rank ?? 3) - (ACUITY[q.x.acuity]?.rank ?? 3) || q.ds.overdue - p.ds.overdue || p.x.bed.localeCompare(q.x.bed, undefined, { numeric: true }));
    const totals = beds.reduce((t, { x, ds }) => { t.unstable += x.acuity === "unstable"; t.watch += x.acuity === "watch"; t.overdue += ds.overdue; t.due += ds.due; t.tasks += (x.tasks || []).filter(k => !k.done).length; return t; }, { unstable: 0, watch: 0, overdue: 0, due: 0, tasks: 0 });
    main.innerHTML = `
      <div class="resus-head"><div><h1 style="margin:0">${ic("ward")} Ward board</h1>
        <p class="text-2" style="margin:.2rem 0 0">Every bed on one screen: who is sick, what is due, and what to hand over.</p></div>
        <div class="row"><a class="btn sm" href="#/handover">${ic("users")}Shift handover</a><a class="btn ghost sm" href="#/ward?bed=new">${ic("edit")}Add bed</a></div></div>
      <div class="card ward-namebar">
        <div class="field" style="margin:0;flex:1"><label for="wd-name">Ward</label><input id="wd-name" maxlength="40" placeholder="e.g. Maternity ward, Hawassa Referral Hospital" value="${esc(b.name || "")}"></div>
        <p class="small muted" style="margin:0;flex:2">${ic("shield")} Stored only on this device. Use bed numbers and initials, never full names. Clear beds when patients leave.</p>
      </div>
      <div class="stat-row ward-stats">
        <div class="card stat"><b>${beds.length}</b><span>beds on board</span></div>
        <div class="card stat ${totals.unstable ? "st-bad" : ""}"><b>${totals.unstable}</b><span>unstable</span></div>
        <div class="card stat ${totals.watch ? "st-warn" : ""}"><b>${totals.watch}</b><span>on watch</span></div>
        <div class="card stat ${totals.overdue ? "st-bad" : totals.due ? "st-warn" : ""}"><b>${totals.overdue || totals.due}</b><span>${totals.overdue ? "doses overdue" : "doses due soon"}</span></div>
        <div class="card stat"><b>${totals.tasks}</b><span>open tasks</span></div>
      </div>
      ${beds.length ? `<ul class="bed-grid">${beds.map(({ x, ds }) => bedCard(x, ds)).join("")}</ul>`
        : `<div class="card empty-ward"><h3>No beds yet</h3><p class="text-2">Add each patient you are looking after: bed number, initials, weight and what is going on. Start dose schedules from a bed so they appear on the board and in the handover.</p><a class="btn" href="#/ward?bed=new">${ic("edit")}Add the first bed</a></div>`}
      ${b.handovers?.length ? `<div class="card"><h3>${ic("clock")} Recent handovers</h3><ul class="stock-list">${b.handovers.slice(0, 5).map(h => `<li><b>${esc(h.from || "—")}</b> to <b>${esc(h.to || "—")}</b> · ${h.count} bed${h.count === 1 ? "" : "s"} · ${new Date(h.at).toLocaleString([], { weekday: "short", hour: "2-digit", minute: "2-digit" })}</li>`).join("")}</ul></div>` : ""}
      ${beds.length ? `<div class="row"><button type="button" class="btn ghost sm" id="wd-clear">${ic("trash")}Clear the whole board</button></div>` : ""}`;
    $("#wd-name").addEventListener("change", e => { const bb = load(); bb.name = e.target.value.trim(); save(bb); });
    main.onclick = e => {
      const w = e.target.closest("[data-useweight]");
      if (w) { const bed = load().beds.find(x => x.id === w.dataset.useweight); if (bed?.weight) { FX.patient.weight = bed.weight; FX.patient.estimated = false; FX.patient.ageYears = bed.age ?? null; FX.syncPatientChip(); toast(`Doses now shown for ${bed.weight} kg (${bed.bed}).`); } }
      const t = e.target.closest("[data-task]");
      if (t) { const bb = load(); const bed = bb.beds.find(x => x.id === t.dataset.bedid); const k = bed?.tasks?.find(y => y.id === t.dataset.task); if (k) { k.done = t.checked; bed.updated = Date.now(); save(bb); } }
      const d = e.target.closest("[data-discharge]");
      if (d && confirm(L("Remove this bed from the board? Its dose schedules are ended too."))) {
        const bb = load(); bb.beds = bb.beds.filter(x => x.id !== d.dataset.discharge); save(bb);
        FX.scheds.save(FX.scheds.list().filter(s => s.bed !== d.dataset.discharge)); render();
      }
    };
    const clr = $("#wd-clear");
    if (clr) clr.addEventListener("click", () => { if (!confirm(L("Clear every bed from this device? Linked dose schedules are ended too."))) return; const bb = load(); const ids = bb.beds.map(x => x.id); FX.scheds.save(FX.scheds.list().filter(s => !ids.includes(s.bed))); bb.beds = []; save(bb); render(); });
  }

  function bedCard(x, ds) {
    const a = ACUITY[x.acuity] || ACUITY.stable;
    const open = (x.tasks || []).filter(k => !k.done);
    const v = x.vitals || {};
    const vit = [v.bp && `BP ${v.bp}`, v.hr && `HR ${v.hr}`, v.rr && `RR ${v.rr}`, v.spo2 && `SpO₂ ${v.spo2}%`, v.temp && `T ${v.temp}°`].filter(Boolean).join(" · ");
    return `<li class="card bed ${x.acuity || "stable"}">
      <div class="bed-top">
        <div class="bed-no">${esc(x.bed)}</div>
        <div class="bed-who"><b>${esc(x.initials || "—")}</b><span>${[x.age != null && x.age !== "" ? `${x.age} y` : "", x.sex ? x.sex[0].toUpperCase() : "", x.weight ? `${x.weight} kg` : "", gaText(x) ? `${esc(gaText(x))} weeks` : ""].filter(Boolean).join(" · ")}</span></div>
        <span class="chip ${a.cls}">${a.label}</span>
      </div>
      <div class="bed-dx">${esc(x.dx || caseName(x.caseId) || "No working diagnosis yet")}${x.caseId ? ` <a class="small" href="#/case/${x.caseId}">${ic("clipboard")}Case</a>` : ""}</div>
      ${x.allergies ? `<div class="bed-allergy">${ic("alert")} Allergy: ${esc(x.allergies)}</div>` : ""}
      ${ds.next ? `<div class="bed-dose ${ds.overdue ? "late" : ds.due ? "soon" : ""}">${ic("clock")}<span><b>${esc(ds.next.name)}</b> ${esc(ds.next.label)} · ${FX.untilStr(ds.next.due)}</span></div>` : ""}
      ${vit ? `<div class="bed-vitals">${ic("heart")} ${esc(vit)}${v.at ? ` <span class="muted">(${ago(v.at)})</span>` : ""}</div>` : ""}
      ${open.length ? `<ul class="bed-tasks">${open.slice(0, 4).map(k => `<li><label><input type="checkbox" data-task="${k.id}" data-bedid="${x.id}"> ${esc(k.text)}</label></li>`).join("")}${open.length > 4 ? `<li class="muted small">+${open.length - 4} more</li>` : ""}</ul>` : ""}
      <div class="row bed-actions">
        <a class="btn ghost sm" href="#/ward?bed=${x.id}">${ic("edit")}Update</a>
        <a class="btn ghost sm" href="#/schedules?bed=${x.id}&label=${encodeURIComponent(x.bed + (x.initials ? " " + x.initials : ""))}${x.weight ? `&w=${x.weight}` : ""}">${ic("clock")}Schedule</a>
        ${x.weight ? `<button type="button" class="btn ghost sm" data-useweight="${x.id}">${ic("user")}Use weight</button>` : ""}
        ${x.age != null && x.age !== "" && x.age <= 19 ? `<a class="btn ghost sm" href="#/growth">${ic("baby")}Growth</a>` : ""}
        <button type="button" class="linkbtn danger" data-discharge="${x.id}">${ic("x")}Discharge</button>
      </div>
    </li>`;
  }

  /* =========================================================
     Add / update a bed
     ========================================================= */
  function viewBed(main, route) {
    const b = load();
    const isNew = route.q.bed === "new";
    const x = isNew ? { id: uid(), bed: "", initials: "", acuity: "stable", tasks: [], vitals: {} } : b.beds.find(y => y.id === route.q.bed);
    if (!x) { location.hash = "#/ward"; return; }
    const cases = [...CONDITIONS].sort((p, q) => p.name.localeCompare(q.name));
    main.innerHTML = `
      <a class="back" href="#/ward">${ic("left")}Ward board</a>
      <h1>${isNew ? "Add a bed" : `Bed ${esc(x.bed)}`}</h1>
      <div class="preg-grid">
        <div class="card">
          <h3>Patient</h3>
          <div class="inline"><div class="field"><label for="b-bed">Bed</label><input id="b-bed" maxlength="12" value="${esc(x.bed)}" placeholder="e.g. 4 or M-12"></div>
          <div class="field"><label for="b-ini">Initials (not full name)</label><input id="b-ini" maxlength="8" value="${esc(x.initials || "")}" placeholder="e.g. A.K."></div></div>
          <div class="inline3"><div class="field"><label for="b-age">Age (years)</label><input id="b-age" type="number" inputmode="decimal" min="0" max="120" step="0.1" value="${x.age ?? ""}"></div>
          <div class="field"><label for="b-sex">Sex</label><select id="b-sex"><option value="">—</option><option value="female" ${x.sex === "female" ? "selected" : ""}>Female</option><option value="male" ${x.sex === "male" ? "selected" : ""}>Male</option></select></div>
          <div class="field"><label for="b-w">Weight (kg)</label><input id="b-w" type="number" inputmode="decimal" min="0.3" max="250" step="0.1" value="${x.weight ?? ""}"></div></div>
          <div class="inline"><div class="field"><label for="b-lmp">If pregnant: LNMP (gestational age is calculated)</label><input id="b-lmp" type="date" value="${x.lmp ? new Date(x.lmp - new Date(x.lmp).getTimezoneOffset() * 60000).toISOString().slice(0, 10) : ""}"></div>
          <div class="field"><label for="b-ga">or gestational age today (weeks)</label><input id="b-ga" maxlength="10" value="${esc(gaText(x))}" placeholder="e.g. 34+2"></div></div>
          <p class="small muted" style="margin:-.4rem 0 .8rem" id="b-ga-hint">${x.lmp ? `Calculated from the LNMP: ${esc(gaText(x))} weeks today.` : `For Ethiopian dates or ultrasound dating, use the <a href="#/pregnancy">Pregnancy dating wheel</a> and save to this bed.`}</p>
          <div class="field"><label for="b-case">Working case</label><select id="b-case"><option value="">—</option>${cases.map(c => `<option value="${c.id}" ${x.caseId === c.id ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select></div>
          <div class="field"><label for="b-dx">Working diagnosis / problem</label><input id="b-dx" maxlength="120" value="${esc(x.dx || "")}" placeholder="e.g. Severe pre-eclampsia, day 1 post CS"></div>
          <div class="field"><label for="b-all">Allergies</label><input id="b-all" maxlength="80" value="${esc(x.allergies || "")}" placeholder="None known"></div>
          <div class="field"><label>Illness severity</label><div class="seg acuity-seg" id="b-acu" role="group" aria-label="Illness severity">${Object.entries(ACUITY).reverse().map(([k, v]) => `<button type="button" data-acu="${k}" class="${x.acuity === k ? "active" : ""} acu-${k}">${v.label}</button>`).join("")}</div></div>
        </div>
        <div class="card">
          <h3>Handover notes</h3>
          <div class="field"><label for="b-sum">Summary (what happened, what we are doing)</label><textarea id="b-sum" rows="4" maxlength="600">${esc(x.summary || "")}</textarea></div>
          <div class="field"><label for="b-if">If this happens, then… (contingency plan)</label><textarea id="b-if" rows="3" maxlength="400" placeholder="e.g. If BP ≥ 160/110, give hydralazine 5 mg IV and call the senior">${esc(x.contingency || "")}</textarea></div>
          <h4>Last observations</h4>
          <div class="inline3 vit-grid">
            <div class="field"><label for="v-bp">BP</label><input id="v-bp" maxlength="9" value="${esc(x.vitals?.bp || "")}" placeholder="120/80"></div>
            <div class="field"><label for="v-hr">Pulse</label><input id="v-hr" type="number" inputmode="numeric" value="${x.vitals?.hr ?? ""}"></div>
            <div class="field"><label for="v-rr">Resp. rate</label><input id="v-rr" type="number" inputmode="numeric" value="${x.vitals?.rr ?? ""}"></div>
            <div class="field"><label for="v-sp">SpO₂ %</label><input id="v-sp" type="number" inputmode="numeric" value="${x.vitals?.spo2 ?? ""}"></div>
            <div class="field"><label for="v-t">Temp °C</label><input id="v-t" type="number" inputmode="decimal" step="0.1" value="${x.vitals?.temp ?? ""}"></div>
          </div>
          <h4>Tasks</h4>
          <ul class="task-edit" id="b-tasks">${(x.tasks || []).map(k => taskRow(k)).join("")}</ul>
          <div class="row"><input id="b-newtask" maxlength="120" placeholder="e.g. Repeat potassium at 18:00" style="flex:1;min-height:44px;padding:.5rem .8rem;border:1px solid var(--border-strong);border-radius:12px;background:var(--surface)"><button type="button" class="btn ghost sm" id="b-addtask">Add task</button></div>
        </div>
      </div>
      <div class="row"><button type="button" class="btn" id="b-save">${ic("check")}${isNew ? "Add to board" : "Save bed"}</button><a class="btn ghost" href="#/ward">Cancel</a>
        ${!isNew ? `<a class="btn ghost" href="#/schedules?bed=${x.id}&label=${encodeURIComponent(x.bed + (x.initials ? " " + x.initials : ""))}${x.weight ? `&w=${x.weight}` : ""}">${ic("clock")}Start a dose schedule</a>` : ""}</div>`;
    $("#b-lmp").addEventListener("input", () => { const v = $("#b-lmp").value; if (!v) return; const [yy, mm, dd] = v.split("-").map(Number); const days = Math.round((new Date().setHours(0, 0, 0, 0) - new Date(yy, mm - 1, dd).getTime()) / 864e5); $("#b-ga").value = days >= 0 ? `${Math.floor(days / 7)}+${days % 7}` : ""; $("#b-ga-hint").textContent = days >= 0 && days <= 45 * 7 ? `Calculated from the LNMP: ${Math.floor(days / 7)}+${days % 7} weeks today${window.EthCal ? " · LNMP " + EthCal.format(new Date(yy, mm - 1, dd), window.I18N?.lang) : ""}.` : "Check the date: outside 0 to 45 weeks."; });
    let tasks = (x.tasks || []).map(k => ({ ...k }));
    let acuity = x.acuity || "stable";
    function taskRow(k) { return `<li data-tid="${k.id}"><label><input type="checkbox" ${k.done ? "checked" : ""} data-tdone> ${esc(k.text)}</label><button type="button" class="linkbtn danger" data-tdel aria-label="Remove task">${ic("x")}</button></li>`; }
    const redrawTasks = () => { $("#b-tasks").innerHTML = tasks.map(taskRow).join(""); };
    $("#b-acu").addEventListener("click", e => { const btn = e.target.closest("[data-acu]"); if (!btn) return; acuity = btn.dataset.acu; main.querySelectorAll("#b-acu button").forEach(y => y.classList.toggle("active", y === btn)); });
    const addTask = () => { const t = $("#b-newtask").value.trim(); if (!t) return; tasks.push({ id: uid(), text: t, done: false }); $("#b-newtask").value = ""; redrawTasks(); };
    $("#b-addtask").addEventListener("click", addTask);
    $("#b-newtask").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); addTask(); } });
    $("#b-tasks").addEventListener("click", e => {
      const li = e.target.closest("[data-tid]"); if (!li) return;
      const k = tasks.find(y => y.id === li.dataset.tid);
      if (e.target.closest("[data-tdel]")) { tasks = tasks.filter(y => y !== k); redrawTasks(); }
      if (e.target.matches("[data-tdone]") && k) k.done = e.target.checked;
    });
    $("#b-save").addEventListener("click", () => {
      const bedNo = $("#b-bed").value.trim();
      if (!bedNo) { toast("Enter a bed number.", true); return; }
      const ini = $("#b-ini").value.trim();
      if (ini.split(/\s+/).some(p => p.replace(/[^A-Za-zሀ-፿]/g, "").length > 3)) { toast("Use initials only, not a full name.", true); return; }
      const num = (id) => { const v = $("#" + id).value; return v === "" ? null : +v; };
      const w = num("b-w");
      if (w != null && !(w > 0 && w < 250)) { toast("Enter a weight between 0.3 and 250 kg.", true); return; }
      const vit = { bp: $("#v-bp").value.trim(), hr: num("v-hr"), rr: num("v-rr"), spo2: num("v-sp"), temp: num("v-t") };
      const vitChanged = JSON.stringify({ ...vit }) !== JSON.stringify({ bp: x.vitals?.bp || "", hr: x.vitals?.hr ?? null, rr: x.vitals?.rr ?? null, spo2: x.vitals?.spo2 ?? null, temp: x.vitals?.temp ?? null });
      const lmpVal = $("#b-lmp").value;
      let lmp = lmpVal ? (() => { const [yy, mm, dd] = lmpVal.split("-").map(Number); return new Date(yy, mm - 1, dd).getTime(); })() : null;
      const gaTyped = $("#b-ga").value.trim();
      // a typed GA with no LNMP becomes an LNMP-equivalent so it keeps counting forward
      if (!lmp && gaTyped && gaTyped !== gaText(x)) { const mt = gaTyped.match(/^(\d{1,2})(?:\s*[+w]\s*(\d))?/i); if (mt) { const t = new Date(); t.setHours(0, 0, 0, 0); lmp = t.getTime() - ((+mt[1]) * 7 + (+(mt[2] || 0))) * 864e5; } }
      if (!lmp && gaTyped && gaTyped === gaText(x)) lmp = x.lmp || null;
      if (lmp && (lmp > Date.now() || Date.now() - lmp > 45 * 7 * 864e5)) { toast("Check the LNMP: it gives a gestational age outside 0 to 45 weeks.", true); return; }
      const updated = { ...x, lmp, bed: bedNo, initials: ini, age: num("b-age"), sex: $("#b-sex").value, weight: w, ga: lmp ? "" : gaTyped, caseId: $("#b-case").value, dx: $("#b-dx").value.trim(), allergies: $("#b-all").value.trim(), acuity, summary: $("#b-sum").value.trim(), contingency: $("#b-if").value.trim(), tasks, vitals: { ...vit, at: vitChanged && Object.values(vit).some(v => v !== "" && v != null) ? Date.now() : x.vitals?.at }, updated: Date.now() };
      const bb = load();
      if (bb.beds.some(y => y.id !== x.id && y.bed.toLowerCase() === bedNo.toLowerCase())) { toast("That bed is already on the board.", true); return; }
      const i = bb.beds.findIndex(y => y.id === x.id);
      if (i >= 0) bb.beds[i] = updated; else bb.beds.push(updated);
      save(bb); toast(isNew ? "Bed added." : "Bed saved."); location.hash = "#/ward";
    });
  }

  /* =========================================================
     Shift handover (I-PASS)
     ========================================================= */
  function viewHandover(main) {
    const b = load();
    const horizon = Date.now() + 12 * 3600e3;
    const beds = [...b.beds].sort((p, q) => (ACUITY[p.acuity]?.rank ?? 3) - (ACUITY[q.acuity]?.rank ?? 3) || p.bed.localeCompare(q.bed, undefined, { numeric: true }));
    const dosesFor = (x) => bedDoses(x).flatMap(({ st }) => st.doses.filter(d => !d.rec && d.due <= horizon).map(d => ({ ...d, name: st.reg.name.split(" — ")[0] }))).sort((p, q) => p.due - q.due);
    const text = () => [
      `MedBridge handover${b.name ? " · " + b.name : ""} · ${new Date().toLocaleString([], { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}${window.EthCal && EthCal.enabled() ? " · " + EthCal.format(new Date(), window.I18N?.lang) : ""}`,
      ...beds.map(x => {
        const ds = dosesFor(x), open = (x.tasks || []).filter(k => !k.done);
        return [`\nBed ${x.bed} ${x.initials || ""} [${(ACUITY[x.acuity] || ACUITY.stable).label.toUpperCase()}]${x.weight ? " " + x.weight + " kg" : ""}${gaText(x) ? " · " + gaText(x) + " wk" : ""}`,
          `P: ${x.dx || caseName(x.caseId) || "-"}${x.allergies ? " · Allergy: " + x.allergies : ""}${x.summary ? " · " + x.summary : ""}`,
          `A: ${[...ds.map(d => `${d.name} ${d.label} ${FX.timeStr(d.due)}`), ...open.map(k => k.text)].join("; ") || "-"}`,
          `S: ${x.contingency || "-"}`].join("\n");
      }),
      "\nDraft tool: confirm every dose against the chart."
    ].join("\n");
    main.innerHTML = `
      <div class="resus-head"><div><h1 style="margin:0">${ic("users")} Shift handover</h1>
        <p class="text-2" style="margin:.2rem 0 0">I-PASS: <b>I</b>llness severity, <b>P</b>atient summary, <b>A</b>ction list, <b>S</b>ituation awareness, <b>S</b>ynthesis by the receiver.</p></div>
        <div class="row"><button type="button" class="btn ghost sm" id="ho-print">${ic("print")}Print</button>${beds.length ? shareButton(text(), "Share") : ""}</div></div>
      ${!beds.length ? `<div class="card empty-ward"><h3>The ward board is empty</h3><p class="text-2">Add beds on the ward board first.</p><a class="btn" href="#/ward">${ic("ward")}Ward board</a></div>` : `
      <div class="ho-sheet">
        <div class="ho-head"><b>${esc(b.name || "Ward")}</b> · ${new Date().toLocaleString([], { weekday: "long", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}${window.EthCal && EthCal.enabled() ? ` · ${esc(EthCal.format(new Date(), window.I18N?.lang))}` : ""} · ${beds.length} bed${beds.length === 1 ? "" : "s"}</div>
        ${beds.map(x => {
          const a = ACUITY[x.acuity] || ACUITY.stable, ds = dosesFor(x), open = (x.tasks || []).filter(k => !k.done), v = x.vitals || {};
          return `<div class="card ho-bed ${x.acuity || "stable"}">
            <div class="ho-title"><span class="bed-no">${esc(x.bed)}</span><b>${esc(x.initials || "")}</b><span class="muted small">${[x.age != null && x.age !== "" ? `${x.age} y` : "", x.weight ? `${x.weight} kg` : "", gaText(x) ? `${esc(gaText(x))} wk` : ""].filter(Boolean).join(" · ")}</span><span class="chip ${a.cls}" style="margin-left:auto">I · ${a.label}</span></div>
            <div class="ho-row"><span class="ho-k">P</span><div>${esc(x.dx || caseName(x.caseId) || "—")}${x.allergies ? ` · <span class="bad-text">Allergy: ${esc(x.allergies)}</span>` : ""}${x.summary ? `<div class="small">${esc(x.summary)}</div>` : ""}${v.bp || v.hr || v.rr || v.spo2 || v.temp ? `<div class="small muted">Obs ${[v.bp && `BP ${esc(v.bp)}`, v.hr && `HR ${v.hr}`, v.rr && `RR ${v.rr}`, v.spo2 && `SpO₂ ${v.spo2}%`, v.temp && `T ${v.temp}°`].filter(Boolean).join(" · ")}${v.at ? ` (${ago(v.at)})` : ""}</div>` : ""}</div></div>
            <div class="ho-row"><span class="ho-k">A</span><div>${ds.length || open.length ? `<ul>${ds.map(d => `<li class="${d.due < Date.now() - 5 * 60e3 ? "bad-text" : ""}"><b>${FX.timeStr(d.due)}</b> ${esc(d.name)}: ${esc(d.label)}${d.amount ? ` · ${esc(d.amount)}` : ""}</li>`).join("")}${open.map(k => `<li>${esc(k.text)}</li>`).join("")}</ul>` : `<span class="muted">No doses due in the next 12 hours and no open tasks.</span>`}</div></div>
            <div class="ho-row"><span class="ho-k">S</span><div>${x.contingency ? esc(x.contingency) : `<span class="muted">No contingency plan written.</span>`}</div></div>
            <label class="ho-row ho-synth"><span class="ho-k">S</span><span><input type="checkbox" data-synth> Receiver has read back the plan</span></label>
          </div>`;
        }).join("")}
      </div>
      <div class="card ho-sign">
        <h3>Record the handover</h3>
        <div class="inline"><div class="field"><label for="ho-from">Handed over by (initials)</label><input id="ho-from" maxlength="12"></div>
        <div class="field"><label for="ho-to">Received by (initials)</label><input id="ho-to" maxlength="12"></div></div>
        <button type="button" class="btn" id="ho-save">${ic("check")}Record handover</button>
        <p class="small muted" style="margin:.5rem 0 0">Kept on this device with the time, for the ward's own record.</p>
      </div>`}`;
    $("#ho-print").addEventListener("click", () => { document.body.classList.add("print-handover"); window.print(); document.body.classList.remove("print-handover"); });
    const sv = $("#ho-save");
    if (sv) sv.addEventListener("click", () => {
      const from = $("#ho-from").value.trim(), to = $("#ho-to").value.trim();
      if (!from || !to) { toast("Enter both sets of initials.", true); return; }
      const unread = [...main.querySelectorAll("[data-synth]")].filter(c => !c.checked).length;
      if (unread && !confirm(L(`${unread} bed(s) not read back by the receiver. Record the handover anyway?`))) return;
      const bb = load(); bb.handovers = [{ at: Date.now(), from, to, count: beds.length }, ...(bb.handovers || [])].slice(0, 30); save(bb);
      toast("Handover recorded."); location.hash = "#/ward";
    });
  }

  return { views: { ward: viewBoard, handover: viewHandover }, load, _test: { doseStatus } };
};
