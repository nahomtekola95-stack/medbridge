/* learning.js — "My learning" (#/learning): a case of the day, a streak, and a
   personal CPD logbook.

   The case of the day asks two questions built from one clinical case's own
   drug roles: which drug is first line, and which must be avoided. Wrong
   options are drugs that appear NOWHERE in that case, so no question can have
   two right answers. Quizzes finished, daily cases and cases read are recorded
   by themselves; trainings, courses and conferences are added by hand with
   their hours. Everything stays on this device and prints as a record for a
   licence-renewal file. MedBridge does not award CPD credits.

   Registered by app.js as LN. Pure helpers on window.Learning.calc. */
(function () {
  "use strict";

  /* --- pure helpers ---------------------------------------------------- */
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const dayNum = (key) => { const [y, m, d] = key.split("-").map(Number); return Math.round(Date.UTC(y, m - 1, d) / 864e5); };
  /** small deterministic generator so everyone gets the same case and options on the same day */
  function rng(seed) { let s = seed >>> 0 || 1; return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; }
  function pickN(arr, n, r) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, n); }

  /** Build the day's case and questions, or null if no case qualifies. */
  function daily(conditions, drugs, key = dayKey()) {
    const name = (id) => (drugs.find(d => d.id === id)?.name || id).split(" (")[0];
    const firstAnywhere = [...new Set(conditions.flatMap(c => c.drugs.filter(x => x.role === "first").map(x => x.id)))].filter(id => drugs.some(d => d.id === id));
    const eligible = conditions.filter(c => {
      const inCase = new Set(c.drugs.map(x => x.id));
      return c.drugs.some(x => x.role === "first") && firstAnywhere.filter(id => !inCase.has(id)).length >= 3;
    });
    if (!eligible.length) return null;
    const n = dayNum(key), r = rng(n * 2654435761);
    const order = pickN(eligible, eligible.length, rng(Math.floor(n / eligible.length) + 7));   // a fresh order each cycle
    const c = order[n % eligible.length];
    const inCase = new Set(c.drugs.map(x => x.id));
    const right = pickN(c.drugs.filter(x => x.role === "first"), 1, r)[0];
    /* wrong options: first-line drugs from cases in the SAME clinical area where possible, so the
       question needs thought — but never a drug that appears anywhere in this case */
    const sameArea = [...new Set(conditions.filter(x => x.group === c.group && x.id !== c.id).flatMap(x => x.drugs.filter(d => d.role === "first").map(d => d.id)))]
      .filter(id => !inCase.has(id) && drugs.some(d => d.id === id));
    const pool = sameArea.length >= 3 ? sameArea : firstAnywhere.filter(id => !inCase.has(id));
    const wrong = pickN(pool, 3, r);
    const qs = [{ id: "first", ask: `${c.name}: which of these is a first-line drug?`, answer: right.id, note: right.note || "",
      options: pickN([right.id, ...wrong], 4, r).map(id => ({ id, label: name(id) })) }];
    const avoid = c.drugs.filter(x => x.role === "avoid");
    const usable = c.drugs.filter(x => x.role === "first" || x.role === "adjunct");
    if (avoid.length && usable.length >= 2) {
      const bad = pickN(avoid, 1, r)[0];
      const opts = pickN(usable, Math.min(3, usable.length), r).map(x => x.id);
      qs.push({ id: "avoid", ask: `${c.name}: which of these should be AVOIDED?`, answer: bad.id, note: bad.note || "",
        options: pickN([bad.id, ...opts], opts.length + 1, r).map(id => ({ id, label: name(id) })) });
    }
    return { key, caseId: c.id, caseName: c.name, summary: c.summary, qs };
  }
  /** Consecutive days answered, counting back from today (or from yesterday if today is not done yet). */
  function streak(days, today = dayKey()) {
    const set = new Set(days); let n = 0, d = dayNum(today);
    if (!set.has(today)) d -= 1;
    const key = (x) => { const t = new Date(x * 864e5); return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, "0")}-${String(t.getUTCDate()).padStart(2, "0")}`; };
    while (set.has(key(d))) { n++; d--; }
    return n;
  }
  /** Hours from logbook entries in the last `days` days (default a year). */
  function hours(entries, days = 365, today = dayKey()) {
    const from = dayNum(today) - days;
    return Math.round(entries.filter(e => e.date && dayNum(e.date) > from).reduce((s, e) => s + (+e.hours || 0), 0) * 10) / 10;
  }

  window.Learning = { calc: { dayKey, daily, streak, hours, rng } };

  window.LearningView = function (ctx) {
    const { $, esc, ic, toast } = ctx;
    const store = { get(k, d) { try { const v = localStorage.getItem("mb:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
                    set(k, v) { try { localStorage.setItem("mb:" + k, JSON.stringify(v)); } catch {} } };
    const log = { list: () => store.get("learnLog", []), add(e) { const l = this.list(); l.unshift({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), ...e }); store.set("learnLog", l.slice(0, 500)); } };
    const answered = () => store.get("dailyDone", {});     // { "YYYY-MM-DD": { score, of, caseId } }

    /* automatic records from the rest of the app */
    window.addEventListener("mb:learn", (e) => {
      const d = e.detail || {}, today = dayKey();
      if (d.type === "read") {   // one record per case per day
        if (log.list().some(x => x.type === "read" && x.ref === d.ref && x.date === today)) return;
        log.add({ type: "read", title: d.title, ref: d.ref, date: today });
      } else if (d.type === "quiz") log.add({ type: "quiz", title: d.title, score: d.score, of: d.of, date: today });
    });

    const TYPES = { course: "Course or training", workshop: "Workshop", conference: "Conference", online: "Online course", self: "Self-study", teaching: "Teaching others", other: "Other" };

    function dailyHtml(compact) {
      const t = daily(window.CONDITIONS, window.DRUG_DB);
      if (!t) return "";
      const done = answered()[t.key], st = streak(Object.keys(answered()));
      if (compact) return `<a class="card daily-tile" href="#/learning">
          <span class="daily-ic">${ic("help")}</span><span class="daily-text"><span class="small muted">Case of the day${st ? ` · ${st}-day streak` : ""}</span><b>${esc(t.caseName)}</b>
          <span class="small">${done ? `Done today: ${done.score} / ${done.of} ${ic("check")}` : `${t.qs.length} quick question${t.qs.length > 1 ? "s" : ""} · about a minute`}</span></span>${ic("right")}</a>`;
      return `<div class="card daily" id="daily"><div class="row" style="justify-content:space-between;align-items:baseline"><h2 style="margin:0">${ic("help")} Case of the day</h2>
          <span class="chip ${st ? "ok" : ""}">${ic("star")}${st} day${st === 1 ? "" : "s"} in a row</span></div>
        <p class="small text-2" style="margin:.3rem 0 .8rem">A new case every day, the same for everyone. ${t.qs.length === 1 ? "One question" : `${t.qs.length} questions`} from the case's own drug list.</p>
        <h3 style="margin:.2rem 0">${esc(t.caseName)}</h3>
        ${t.qs.map((q, i) => `<div class="daily-q" data-q="${i}"><b>${esc(q.ask)}</b>
          <div class="quiz-opts">${q.options.map(o => `<button type="button" class="quiz-opt" data-a="${esc(o.id)}" ${done ? "disabled" : ""}>${esc(o.label)}</button>`).join("")}</div>
          <p class="small daily-note" hidden></p></div>`).join("")}
        <p class="small text-2 daily-sum" ${done ? "" : "hidden"}>${esc(t.summary || "")}</p>
        <div class="row"><a class="btn ghost sm" href="#/case/${esc(t.caseId)}">${ic("book")}Read the whole case</a>${done ? `<span class="small muted">You scored ${done.score} / ${done.of} today. Come back tomorrow for a new case.</span>` : ""}</div></div>`;
    }

    function bindDaily(root) {
      const t = daily(window.CONDITIONS, window.DRUG_DB); if (!t) return;
      const box = root.querySelector("#daily"); if (!box) return;
      const picks = {};
      if (answered()[t.key]) { t.qs.forEach((q, i) => mark(i, null)); return; }
      box.onclick = (e) => {
        const b = e.target.closest("[data-a]"); if (!b || b.disabled) return;
        const i = +b.closest("[data-q]").dataset.q; if (picks[i] != null) return;
        picks[i] = b.dataset.a; mark(i, b.dataset.a);
        if (Object.keys(picks).length === t.qs.length) {
          const score = t.qs.filter((q, k) => picks[k] === q.answer).length;
          const all = answered(); all[t.key] = { score, of: t.qs.length, caseId: t.caseId }; store.set("dailyDone", all);
          log.add({ type: "daily", title: t.caseName, ref: t.caseId, score, of: t.qs.length, date: t.key });
          toast(score === t.qs.length ? "All right — well done." : `${score} of ${t.qs.length}. Read the case to see why.`);
          const sm = box.querySelector(".daily-sum"); if (sm) sm.hidden = false;
          const st = box.querySelector(".chip"); if (st) { const n = streak(Object.keys(answered())); st.innerHTML = `${ic("star")}${n} day${n === 1 ? "" : "s"} in a row`; st.classList.add("ok"); }
        }
      };
      function mark(i, chosen) {
        const q = t.qs[i], el = box.querySelector(`[data-q="${i}"]`);
        el.querySelectorAll("[data-a]").forEach(x => { x.disabled = true; x.classList.add("done"); if (x.dataset.a === q.answer) x.classList.add("right"); else if (x.dataset.a === chosen) x.classList.add("wrong"); });
        const n = el.querySelector(".daily-note"); n.hidden = false;
        const right = q.options.find(o => o.id === q.answer)?.label;
        n.innerHTML = `${chosen == null ? "" : chosen === q.answer ? `${ic("check")} <b>Right.</b> ` : `${ic("x")} <b>The answer is ${esc(right)}.</b> `}${esc(q.note)} <a href="#/drug/${esc(q.answer)}">${esc(right)} page</a>`;
      }
    }

    function view(main) {
      const L = log.list(), manual = L.filter(e => e.type === "training"), all = answered();
      const days = Object.values(all), correct = days.reduce((s, d) => s + d.score, 0), asked = days.reduce((s, d) => s + d.of, 0);
      const quizzes = L.filter(e => e.type === "quiz").length, reads = L.filter(e => e.type === "read").length;
      main.innerHTML = `
        <div class="resus-head"><div><h1 style="margin:0">${ic("book")} My learning</h1>
          <p class="text-2" style="margin:.2rem 0 0">A daily case, your streak, and a record of trainings and study for your licence-renewal file. Kept on this device only.</p></div>
          <div class="row"><button type="button" class="btn ghost sm" id="ln-print">${ic("print")}Print record</button><button type="button" class="btn ghost sm" id="ln-csv">${ic("box")}Download (CSV)</button></div></div>
        ${dailyHtml(false)}
        <div class="ln-stats">
          <div class="card"><b>${streak(Object.keys(all))}</b><span>day streak</span></div>
          <div class="card"><b>${days.length}</b><span>daily cases${asked ? ` · ${Math.round(100 * correct / asked)} % right` : ""}</span></div>
          <div class="card"><b>${quizzes}</b><span>quizzes finished</span></div>
          <div class="card"><b>${reads}</b><span>cases studied</span></div>
          <div class="card"><b>${hours(manual)}</b><span>training hours, last 12 months</span></div>
        </div>
        <h2 data-sec="Trainings">${ic("check")} Trainings, courses and conferences</h2>
        <form class="card ln-form" id="ln-form">
          <div class="inline"><div class="field"><label for="ln-title">What</label><input id="ln-title" required maxlength="140" placeholder="e.g. Basic Emergency Care course"></div>
            <div class="field"><label for="ln-kind">Type</label><select id="ln-kind">${Object.entries(TYPES).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join("")}</select></div></div>
          <div class="inline3"><div class="field"><label for="ln-by">Provider</label><input id="ln-by" maxlength="120" placeholder="Who ran it"></div>
            <div class="field"><label for="ln-date">Date</label><input id="ln-date" type="date" required value="${dayKey()}" max="${dayKey()}"></div>
            <div class="field"><label for="ln-h">Hours</label><input id="ln-h" type="number" inputmode="decimal" min="0.5" max="500" step="0.5" required placeholder="e.g. 16"></div></div>
          <div class="field"><label for="ln-note">Certificate or notes (optional)</label><input id="ln-note" maxlength="200" placeholder="Certificate number, credits stated on it…"></div>
          <button type="submit" class="btn sm">${ic("check")}Add to my record</button>
        </form>
        <div id="ln-list">${manual.length ? `<div class="tablewrap"><table class="plain ln-table"><tr><th>Date</th><th>What</th><th>Hours</th><th></th></tr>
          ${manual.sort((a, b) => b.date.localeCompare(a.date)).map(e => `<tr><td>${esc(e.date)}</td><td><b>${esc(e.title)}</b><div class="small muted">${esc(TYPES[e.kind] || "")}${e.by ? " · " + esc(e.by) : ""}${e.note ? " · " + esc(e.note) : ""}</div></td><td>${esc(String(e.hours))}</td><td><button type="button" class="linkbtn" data-del="${esc(e.id)}" aria-label="Delete">${ic("trash")}</button></td></tr>`).join("")}
          </table></div>` : `<p class="empty small">Nothing recorded yet. Add each training as you finish it, with the hours on the certificate.</p>`}</div>
        <h2 data-sec="Activity">${ic("clock")} Recent activity in MedBridge</h2>
        ${L.filter(e => e.type !== "training").slice(0, 25).map(e => `<div class="ln-act"><span class="chip">${e.type === "daily" ? "Daily case" : e.type === "quiz" ? "Quiz" : "Studied"}</span> ${e.ref && e.type !== "quiz" ? `<a href="#/case/${esc(e.ref)}">${esc(e.title)}</a>` : esc(e.title)}${e.of ? ` <span class="small muted">${e.score} / ${e.of}</span>` : ""} <span class="small muted">${esc(e.date)}</span></div>`).join("") || `<p class="empty small">Open a case, take a quiz or answer the case of the day — it is recorded here.</p>`}
        <p class="small muted" style="margin-top:1rem">MedBridge does not award CPD credits. This is your own record: keep the certificates, and confirm what your licensing body accepts.</p>`;
      bindDaily(main);
      $("#ln-form").onsubmit = (e) => {
        e.preventDefault();
        const t = $("#ln-title").value.trim(), h = parseFloat($("#ln-h").value), d = $("#ln-date").value;
        if (!t || !(h > 0) || !d) return toast("Add what it was, the date and the hours.");
        log.add({ type: "training", title: t, kind: $("#ln-kind").value, by: $("#ln-by").value.trim(), date: d, hours: h, note: $("#ln-note").value.trim() });
        toast("Added to your record."); view(main);
      };
      $("#ln-list").onclick = (e) => { const b = e.target.closest("[data-del]"); if (!b || !confirm("Remove this entry?")) return;
        store.set("learnLog", log.list().filter(x => x.id !== b.dataset.del)); view(main); };
      $("#ln-print").onclick = () => window.print();
      $("#ln-csv").onclick = () => {
        const rows = [["date", "type", "title", "provider", "hours", "score", "notes"], ...log.list().map(e => [e.date, e.type === "training" ? (TYPES[e.kind] || "training") : e.type, e.title, e.by || "", e.hours ?? "", e.of ? `${e.score}/${e.of}` : "", e.note || ""])];
        const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
        const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = `medbridge-learning-${dayKey()}.csv`; a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      };
    }
    return { view, dailyTile: () => dailyHtml(true), streak: () => streak(Object.keys(answered())) };
  };
})();
