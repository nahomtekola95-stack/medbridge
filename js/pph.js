/* pph.js — first-response postpartum haemorrhage bundle.

   PPH kills quickly and it kills because it is noticed late. WHO's 2023/2025
   guidance changes two things about how a labour ward should work: blood loss
   is MEASURED, not guessed, and the first-line treatments are given TOGETHER
   as a bundle within 15 minutes of diagnosis — not one after another while the
   woman keeps bleeding.

   This screen is the bundle on a phone: a running blood-loss tally that calls
   the diagnosis for you, a 15-minute bundle clock, and the tranexamic acid
   window counted from the time of birth (not from the diagnosis).

   Sources: WHO consolidated guidelines for the prevention, diagnosis and
   treatment of postpartum haemorrhage (2025), recommendations 21–28; WHO
   recommendations on the assessment of postpartum blood loss and use of a
   treatment bundle for PPH (2023), recommendations 1 and 2.

   Pure logic lives on window.PPH.calc so the tests can reach it. DRAFT. */
(function () {
  "use strict";

  const MIN = 60000, HOUR = 3600000;

  /* --- diagnosis -------------------------------------------------------
     WHO 2025 rec. 27 remarks: "≥300 mL blood loss with abnormal
     haemodynamic signs or ≥500 mL blood loss, whichever occurs first". */
  function diagnose({ lossMl = 0, signs = false } = {}) {
    if (lossMl >= 500) return { pph: true, reason: "500 mL or more measured", at: 500 };
    if (signs && lossMl >= 300) return { pph: true, reason: "300 mL or more with abnormal observations", at: 300 };
    if (signs) return { pph: false, watch: true, reason: "Abnormal observations — measure again now, and treat at 300 mL" };
    if (lossMl >= 300) return { pph: false, watch: true, reason: "Approaching the threshold — keep measuring and check the observations" };
    return { pph: false, watch: false, reason: "" };
  }

  /* Early warning signs of excessive blood loss, as used to trigger at 300 mL. */
  const SIGNS = [
    { key: "pulse", label: "Pulse 110 or more" },
    { key: "bp", label: "Systolic BP under 90 mmHg" },
    { key: "shock", label: "Pale, clammy, faint, confused or breathless" },
    { key: "uterus", label: "Uterus soft or boggy on palpation" },
    { key: "ongoing", label: "Bleeding still running, not slowing" }
  ];

  /* --- the bundle ------------------------------------------------------
     WHO 2023 rec. 2: massage, an oxytocic, tranexamic acid, IV fluids,
     examination of the genital tract, escalation of care — ideally all
     started within 15 minutes of the diagnosis. */
  const BUNDLE = [
    { key: "massage", letter: "M", title: "Uterine massage",
      detail: "Rub up a contraction with the flat of your hand until the uterus is hard, then keep checking it.",
      how: "Empty the bladder first — a full bladder stops the uterus contracting." },
    { key: "oxytocic", letter: "O", title: "Oxytocic drug",
      detail: "Oxytocin 10 IU IM, or 20–40 IU in 1 L of crystalloid running fast.",
      how: "No IV oxytocin, or still bleeding? Ergometrine IV, the oxytocin–ergometrine combination, or misoprostol 800 µg sublingually.",
      drugs: ["oxytocin", "ergometrine", "misoprostol"] },
    { key: "txa", letter: "T", title: "Tranexamic acid",
      detail: "1 g (10 mL of 100 mg/mL) IV over 10 minutes — 1 mL per minute.",
      how: "Within 3 hours of birth. A second 1 g if bleeding continues after 30 minutes, or restarts within 24 hours.",
      drugs: ["tranexamic-acid"] },
    { key: "fluids", letter: "IV", title: "IV fluids",
      detail: "Two large cannulae. Isotonic crystalloid — Ringer's lactate or normal saline.",
      how: "Crystalloid, not colloid. Take blood for cross-match as you put the cannula in.",
      drugs: ["ringers-lactate", "blood-transfusion"] },
    { key: "examine", letter: "E", title: "Examine the genital tract",
      detail: "Find the cause: tone, tissue, trauma, thrombin.",
      how: "Feel the uterus, check the placenta is complete, look at the cervix and vagina with a light and a speculum." },
    { key: "escalate", letter: "E", title: "Escalate",
      detail: "Call the senior, call theatre, start arranging blood and transport now.",
      how: "Do this while the rest is happening, not after it fails. A theatre decision must not wait for the drugs to work." }
  ];

  /* Bundle timing. The 15-minute target runs from the diagnosis. */
  function bundleStatus(done = {}, declaredAt = null, now = Date.now()) {
    const keys = BUNDLE.map(b => b.key);
    const ticked = keys.filter(k => done[k]);
    const elapsed = declaredAt ? now - declaredAt : 0;
    return {
      done: ticked.length, total: keys.length, complete: ticked.length === keys.length,
      elapsedMs: elapsed, elapsedMin: Math.floor(elapsed / MIN),
      withinTarget: !declaredAt || elapsed <= 15 * MIN,
      overdue: !!declaredAt && elapsed > 15 * MIN && ticked.length < keys.length,
      missing: keys.filter(k => !done[k])
    };
  }

  /* --- tranexamic acid window -----------------------------------------
     The 3 hours run from the TIME OF BIRTH, not from the diagnosis. */
  function txaWindow(birthAt, now = Date.now()) {
    if (!birthAt) return null;
    const deadline = birthAt + 3 * HOUR;
    const leftMs = deadline - now;
    return {
      deadline, leftMs, leftMin: Math.ceil(leftMs / MIN),
      expired: leftMs <= 0,
      urgent: leftMs > 0 && leftMs <= 30 * MIN
    };
  }
  /* Second dose: if bleeding continues 30 minutes after the first, or restarts
     within 24 hours of completing it. */
  function secondDose(firstAt, now = Date.now()) {
    if (!firstAt) return null;
    const due = firstAt + 30 * MIN, until = firstAt + 24 * HOUR;
    return { due, until, dueNow: now >= due && now <= until, inMin: Math.ceil((due - now) / MIN), lapsed: now > until };
  }

  /* --- escalation ------------------------------------------------------
     For refractory bleeding: everything in the bundle has been given and she
     is still bleeding. WHO 2025 recommendations on refractory PPH. */
  const ESCALATION = [
    { key: "bimanual", title: "Bimanual uterine compression", detail: "One fist in the anterior fornix, the other hand compressing the fundus from above. It works while you hold it — so hold it, and send someone else for help." },
    { key: "aortic", title: "External aortic compression", detail: "Closed fist just above the umbilicus, slightly to the left, pressing down against the spine. Check the femoral pulse disappears. Buys time while theatre and blood are arranged." },
    { key: "balloon", title: "Uterine balloon tamponade", detail: "A purpose-made balloon, or a condom tied over a catheter and filled with 250–500 mL of warm saline. Keep the oxytocin running and give antibiotics." },
    { key: "nasg", title: "Non-pneumatic anti-shock garment", detail: "Put it on for shock, especially before and during transfer. It buys time; it does not stop the bleeding." },
    { key: "theatre", title: "Theatre", detail: "Examination under anaesthesia, repair of tears, compression sutures, uterine or internal iliac artery ligation, and hysterectomy as the last step." },
    { key: "refer", title: "Refer", detail: "If this facility cannot do the next step, move her now, with a cannula running, the garment or balloon in place, and someone who can treat her on the way." }
  ];

  const calc = { diagnose, bundleStatus, txaWindow, secondDose, BUNDLE, SIGNS, ESCALATION };
  window.PPH = { calc };

  /* =========================================================
     View
     ========================================================= */
  window.PphView = function (ctx) {
    const { $, esc, ic, toast, render, FX, shareButton } = ctx;
    const store = {
      get(k, d) { try { const v = localStorage.getItem("mb:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
      set(k, v) { try { localStorage.setItem("mb:" + k, JSON.stringify(v)); } catch {} }
    };
    const blank = () => ({ birthAt: null, losses: [], signs: {}, done: {}, declaredAt: null, txaAt: null, esc: {}, startedAt: Date.now() });
    let S = store.get("pphCase", blank());
    const save = () => store.set("pphCase", S);
    const total = () => S.losses.reduce((n, l) => n + l.ml, 0);
    const anySign = () => SIGNS.some(s => S.signs[s.key]);
    const clock = (t) => new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const mins = (ms) => { const m = Math.max(0, Math.round(ms / MIN)); return m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${m % 60} min`; };
    let tick = null;

    function handover() {
      const d = diagnose({ lossMl: total(), signs: anySign() });
      const b = bundleStatus(S.done, S.declaredAt);
      return [
        `PPH — measured blood loss ${total()} mL`,
        S.birthAt ? `Born ${clock(S.birthAt)}` : "Time of birth not recorded",
        S.declaredAt ? `PPH called ${clock(S.declaredAt)} (${d.reason})` : "PPH not yet called",
        S.losses.length ? "Losses: " + S.losses.map(l => `${l.ml} mL at ${clock(l.at)}`).join(", ") : "",
        SIGNS.filter(s => S.signs[s.key]).map(s => s.label).join("; ") || "No warning signs ticked",
        "Bundle: " + BUNDLE.map(x => `${x.title}${S.done[x.key] ? " ✓ " + clock(S.done[x.key]) : " — NOT DONE"}`).join(" | "),
        S.txaAt ? `Tranexamic acid given ${clock(S.txaAt)}` : "Tranexamic acid NOT given",
        `${b.done} of ${b.total} bundle steps done`,
        "Draft tool — confirm against the national protocol."
      ].filter(Boolean).join("\n");
    }

    function view(main) {
      const draw = () => {
        const loss = total(), sign = anySign();
        const d = diagnose({ lossMl: loss, signs: sign });
        if (d.pph && !S.declaredAt) { S.declaredAt = Date.now(); save(); }
        const b = bundleStatus(S.done, S.declaredAt);
        const txa = txaWindow(S.birthAt);
        const second = S.txaAt ? secondDose(S.txaAt) : null;
        const lvl = d.pph ? "danger" : d.watch ? "warn" : "info";

        main.innerHTML = `
          <div class="resus-head ${d.pph ? "emergency" : ""}">
            <div><h1 style="margin:0">${ic("drop")} PPH first response</h1>
              <p class="text-2" style="margin:.2rem 0 0">Measure the blood loss, and give the whole bundle within 15 minutes. Do not work down the list one drug at a time.</p></div>
            <div class="row">${shareButton(handover(), "Handover")}<button type="button" class="btn ghost sm" id="p-reset">${ic("trash")}New woman</button></div>
          </div>

          <div class="card">
            <div class="inline">
              <div class="field"><label for="p-birth">Time of birth</label><input id="p-birth" type="time" value="${S.birthAt ? new Date(S.birthAt).toTimeString().slice(0, 5) : ""}"></div>
              <div class="field" style="justify-content:flex-end"><button type="button" class="btn ghost sm" id="p-birth-now">${ic("clock")}Just now</button></div>
            </div>
            <p class="small muted" style="margin:.2rem 0 0">The tranexamic acid window runs 3 hours from the birth, so this is the clock that matters.</p>
          </div>

          <div class="card">
            <h3 style="margin-top:0">${ic("calc")} Measured blood loss</h3>
            <p class="small text-2" style="margin:-.3rem 0 .7rem">Read it off the calibrated drape. Looking at the bed and guessing under-reads badly — that is why PPH gets caught late.</p>
            <div class="pph-total ${lvl}"><b>${loss}</b><span>mL</span></div>
            <div class="row" style="flex-wrap:wrap;gap:.4rem;margin:.6rem 0">
              ${[50, 100, 200, 300, 500].map(n => `<button type="button" class="btn ghost sm" data-add="${n}">+${n} mL</button>`).join("")}
              <span class="field" style="flex:0 0 120px"><input id="p-ml" type="number" inputmode="numeric" min="1" max="5000" step="10" placeholder="other"></span>
              <button type="button" class="btn ghost sm" id="p-add">${ic("check")}Add</button>
              ${S.losses.length ? `<button type="button" class="linkbtn" id="p-undo">${ic("left")}Undo last</button>` : ""}
            </div>
            ${S.losses.length ? `<p class="small muted">${S.losses.map(l => `${l.ml} mL at ${clock(l.at)}`).join(" · ")}</p>` : ""}
            <div class="hairline"></div>
            <h4 style="margin:.2rem 0 .5rem">Observations</h4>
            <div class="pph-signs">${SIGNS.map(s => `<label class="toggle-inline"><input type="checkbox" data-sign="${s.key}" ${S.signs[s.key] ? "checked" : ""}> ${esc(s.label)}</label>`).join("")}</div>
            <div class="callout ${lvl}" style="margin-top:.8rem">${ic(d.pph ? "alert" : d.watch ? "alert" : "info")}<div>
              ${d.pph ? `<strong>This is PPH — ${esc(d.reason)}.</strong> Start every part of the bundle now. Called at ${clock(S.declaredAt)}.`
                : d.watch ? `<strong>${esc(d.reason)}.</strong>`
                : `Treat at <b>500 mL</b> measured, or at <b>300 mL</b> with any abnormal observation — whichever comes first.`}</div></div>
          </div>

          ${S.declaredAt ? `
          <div class="card">
            <div class="row" style="justify-content:space-between;align-items:baseline">
              <h3 style="margin:0">${ic("zap")} The bundle — all six, together</h3>
              <span class="chip ${b.complete ? "ok" : b.overdue ? "bad" : "warn"}" id="p-clock">${b.done}/${b.total} · ${mins(b.elapsedMs)} since PPH called</span>
            </div>
            <p class="small ${b.overdue ? "bad-text" : "muted"}" style="margin:.3rem 0 .8rem">${b.complete ? "All six started. Keep watching the uterus and the bleeding." : b.overdue ? `Past the 15-minute target. Still not started: ${b.missing.map(k => BUNDLE.find(x => x.key === k).title).join(", ")}.` : "Target: all six started within 15 minutes of calling it."}</p>
            <ul class="pph-bundle">
              ${BUNDLE.map(x => `<li class="${S.done[x.key] ? "done" : ""}">
                <button type="button" class="pph-tick" data-tick="${x.key}" aria-pressed="${!!S.done[x.key]}">${S.done[x.key] ? ic("check") : `<span class="pph-letter">${esc(x.letter)}</span>`}</button>
                <div><b>${esc(x.title)}</b>${S.done[x.key] ? ` <span class="chip ok">${clock(S.done[x.key])}</span>` : ""}
                  <p class="small" style="margin:.15rem 0 0">${esc(x.detail)}</p>
                  <p class="small muted" style="margin:.15rem 0 0">${esc(x.how)}</p>
                  ${x.drugs ? `<p class="small" style="margin:.25rem 0 0">${x.drugs.map(id => `<a class="chip" href="#/drug/${id}">${ic("pill")}${esc(id.replace(/-/g, " "))}</a>`).join(" ")}</p>` : ""}
                </div></li>`).join("")}
            </ul>
          </div>

          <div class="card">
            <h3 style="margin-top:0">${ic("clock")} Tranexamic acid</h3>
            ${!S.birthAt ? `<p class="empty">Enter the time of birth to start the 3-hour window.</p>`
              : S.txaAt ? `
              <div class="callout ${second.dueNow && !second.lapsed ? "warn" : "ok-callout"}">${ic(second.dueNow && !second.lapsed ? "alert" : "check")}<div>
                <strong>First 1 g given at ${clock(S.txaAt)}</strong>${txa.expired ? "" : `, inside the window (birth ${clock(S.birthAt)}).`}
                ${second.lapsed ? " More than 24 hours ago — the second-dose window has passed."
                  : second.dueNow ? " <b>A second 1 g is due now if she is still bleeding.</b> Give it if bleeding continued past 30 minutes, or restarted within 24 hours."
                  : ` A second 1 g from <b>${clock(second.due)}</b> if bleeding continues, or if it restarts within 24 hours.`}</div></div>`
              : `
              <div class="callout ${txa.expired ? "warn" : txa.urgent ? "danger" : "info"}">${ic(txa.expired ? "alert" : "clock")}<div>
                ${txa.expired ? `<strong>Past 3 hours from birth (${clock(txa.deadline)}).</strong> The evidence is for treatment within 3 hours of birth; after that it is not recommended. Keep going with everything else and escalate.`
                  : `<strong>${mins(txa.leftMs)} left</strong> of the 3-hour window — give it by <b>${clock(txa.deadline)}</b>. 1 g in 10 mL IV over 10 minutes.`}</div></div>
              ${txa.expired ? "" : `<button type="button" class="btn sm" id="p-txa">${ic("check")}Record the first dose now</button>`}`}
          </div>

          <div class="card">
            <h3 style="margin-top:0">${ic("alert")} Still bleeding after the bundle</h3>
            <p class="small text-2" style="margin:-.3rem 0 .7rem">Refractory PPH. Do these while someone else arranges theatre, blood and transport.</p>
            <ul class="pph-bundle">
              ${ESCALATION.map(x => `<li class="${S.esc[x.key] ? "done" : ""}">
                <button type="button" class="pph-tick" data-esc="${x.key}" aria-pressed="${!!S.esc[x.key]}">${S.esc[x.key] ? ic("check") : `<span class="pph-letter">${ic("right")}</span>`}</button>
                <div><b>${esc(x.title)}</b>${S.esc[x.key] ? ` <span class="chip ok">${clock(S.esc[x.key])}</span>` : ""}
                  <p class="small" style="margin:.15rem 0 0">${esc(x.detail)}</p></div></li>`).join("")}
            </ul>
            <div class="row" style="margin-top:.6rem"><a class="btn ghost sm" href="#/case/pph">${ic("book")}Full PPH case</a><a class="btn ghost sm" href="#/resus">${ic("zap")}Emergency doses</a></div>
          </div>` : ""}

          <p class="small muted">WHO consolidated guidelines for the prevention, diagnosis and treatment of postpartum haemorrhage (2025) and WHO recommendations on the assessment of postpartum blood loss and use of a treatment bundle for PPH (2023). Kept on this device only, and cleared when you start a new woman. Draft tool — confirm against the national protocol.</p>`;
        bind();
      };

      const bind = () => {
        main.onclick = (e) => {
          const add = e.target.closest("[data-add]");
          if (add) { S.losses.push({ ml: +add.dataset.add, at: Date.now() }); save(); return draw(); }
          const t = e.target.closest("[data-tick]");
          if (t) { const k = t.dataset.tick; S.done[k] = S.done[k] ? null : Date.now(); if (!S.done[k]) delete S.done[k]; save(); return draw(); }
          const es = e.target.closest("[data-esc]");
          if (es) { const k = es.dataset.esc; S.esc[k] = S.esc[k] ? null : Date.now(); if (!S.esc[k]) delete S.esc[k]; save(); return draw(); }
          if (e.target.closest("#p-add")) {
            const v = +$("#p-ml").value;
            if (!(v > 0)) return toast("Enter the measured volume in mL.", true);
            S.losses.push({ ml: v, at: Date.now() }); save(); return draw();
          }
          if (e.target.closest("#p-undo")) { S.losses.pop(); save(); return draw(); }
          if (e.target.closest("#p-birth-now")) { S.birthAt = Date.now(); save(); return draw(); }
          if (e.target.closest("#p-txa")) { S.txaAt = Date.now(); S.done.txa = S.done.txa || Date.now(); save(); return draw(); }
          if (e.target.closest("#p-reset")) {
            if (confirm((window.I18N ? I18N.t : (s => s))("Clear this record and start a new woman?"))) { S = blank(); save(); return draw(); }
          }
        };
        main.oninput = (e) => {
          const sg = e.target.closest("[data-sign]");
          if (sg) { S.signs[sg.dataset.sign] = sg.checked; save(); return draw(); }
          if (e.target.id === "p-birth" && e.target.value) {
            const [h, m] = e.target.value.split(":").map(Number);
            const dt = new Date(); dt.setHours(h, m, 0, 0);
            /* a birth time later than now means it was before midnight */
            if (dt.getTime() > Date.now()) dt.setDate(dt.getDate() - 1);
            S.birthAt = dt.getTime(); save(); draw();
          }
        };
        /* keep the two clocks honest without redrawing the whole screen */
        clearInterval(tick);
        tick = setInterval(() => {
          if (!document.body.contains(main) || !$("#p-clock")) { clearInterval(tick); return; }
          if (!S.declaredAt) return;
          const b = bundleStatus(S.done, S.declaredAt);
          $("#p-clock").textContent = `${b.done}/${b.total} · ${mins(b.elapsedMs)} since PPH called`;
          $("#p-clock").className = `chip ${b.complete ? "ok" : b.overdue ? "bad" : "warn"}`;
        }, 15000);
      };
      draw();
    }
    return { view };
  };
})();
