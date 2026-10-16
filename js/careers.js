/* careers.js — opportunities for health workers: jobs, scholarships,
   fellowships, trainings, conferences and research calls (#/opportunities).

   Posts come from health workers and administrators through the server; a
   post by anyone but an administrator waits for approval, posts expire on
   their deadline, and three reports take one down. The board can be read
   offline from the last copy. Under the posts sits a directory of the official
   websites where real calls are announced (js/careers-data.js) — MedBridge
   never invents a vacancy. Saved posts live on this device.

   Registered by app.js as CR. Pure helpers on window.Careers.calc for tests. */
(function () {
  "use strict";

  /* --- pure helpers ---------------------------------------------------- */
  const DAY = 864e5;
  /** Whole days from today to the deadline (0 = today, negative = passed, null = none). */
  function daysLeft(deadline, today = new Date()) {
    if (!deadline || !/^\d{4}-\d{2}-\d{2}$/.test(deadline)) return null;
    const t = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const [y, m, d] = deadline.split("-").map(Number);
    return Math.round((Date.UTC(y, m - 1, d) - t) / DAY);
  }
  function deadlineLabel(n) {
    if (n == null) return { text: "Open — no deadline given", cls: "" };
    if (n < 0) return { text: "Closed", cls: "bad" };
    if (n === 0) return { text: "Closes today", cls: "bad" };
    if (n === 1) return { text: "Closes tomorrow", cls: "bad" };
    if (n <= 7) return { text: `Closes in ${n} days`, cls: "warn" };
    return { text: `Closes in ${n} days`, cls: "" };
  }
  /** Filter and order posts: by kind, cadre and words; soonest deadline first, open-ended last. */
  function filterOpps(list, { kind = "", cadre = "", q = "", today = new Date() } = {}) {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return list
      .filter(o => o.status !== "published" || daysLeft(o.deadline, today) == null || daysLeft(o.deadline, today) >= 0)
      .filter(o => !kind || o.kind === kind)
      .filter(o => !cadre || !(o.cadres || []).length || o.cadres.includes(cadre))
      .filter(o => !words.length || words.every(w => [o.title, o.org, o.location, o.body].join(" ").toLowerCase().includes(w)))
      .sort((a, b) => {
        const da = daysLeft(a.deadline, today), db = daysLeft(b.deadline, today);
        return (da == null) - (db == null) || (da ?? 0) - (db ?? 0) || String(b.publishedAt || "").localeCompare(String(a.publishedAt || ""));
      });
  }
  /** How many published posts are newer than the last visit. */
  const newSince = (list, seenAt) => list.filter(o => o.status === "published" && o.publishedAt && (!seenAt || o.publishedAt > seenAt)).length;
  const safeUrl = (u) => /^https?:\/\//i.test(u || "") ? u : "";

  window.Careers = { calc: { daysLeft, deadlineLabel, filterOpps, newSince, safeUrl } };

  window.CareersView = function (ctx) {
    const { $, esc, ic, toast, shareButton } = ctx;
    const C = window.CAREERS;
    const store = { get(k, d) { try { const v = localStorage.getItem("mb:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
                    set(k, v) { try { localStorage.setItem("mb:" + k, JSON.stringify(v)); } catch {} } };
    const saved = {
      list: () => store.get("oppSaved", []),
      has(id) { return this.list().some(o => o.id === id); },
      toggle(o) { const l = this.list(); const i = l.findIndex(x => x.id === o.id); if (i >= 0) l.splice(i, 1); else l.unshift(o); store.set("oppSaved", l.slice(0, 60)); return i < 0; }
    };
    let state = { kind: "", cadre: null, q: "", tab: "board" };
    let data = { opportunities: [] };

    const kindChip = (k) => { const K = C.KINDS[k]; return K ? `<span class="chip primary">${ic(K.icon)}${esc(K.one)}</span>` : ""; };

    function cardHtml(o, me) {
      const n = daysLeft(o.deadline), dl = deadlineLabel(n), url = safeUrl(o.link);
      const pend = o.status !== "published";
      return `<article class="card opp ${pend ? "opp-pending" : ""}" data-id="${esc(o.id)}">
        <div class="opp-top">${kindChip(o.kind)}<span class="chip ${dl.cls}">${ic("clock")}${esc(dl.text)}</span>
          ${o.mode && o.mode !== "onsite" ? `<span class="chip">${esc(C.MODES[o.mode] || o.mode)}</span>` : ""}
          ${pend ? `<span class="chip warn">${o.status === "rejected" ? "Not approved" : o.status === "flagged" ? "Reported — hidden" : "Waiting for approval"}</span>` : ""}</div>
        <h3 class="opp-title">${esc(o.title)}</h3>
        <div class="opp-org">${ic("ward")}<b>${esc(o.org)}</b>${o.location ? ` · ${esc(o.location)}` : ""}${o.deadline ? ` · deadline ${esc(o.deadline)}` : ""}</div>
        ${(o.cadres || []).length ? `<div class="opp-cadres">For: ${o.cadres.map(esc).join(", ")}</div>` : ""}
        <p class="opp-body">${esc(o.body)}</p>
        ${o.adminNote && pend ? `<p class="small warn-text">Administrator: ${esc(o.adminNote)}</p>` : ""}
        <div class="opp-actions">
          ${url ? `<a class="btn sm" href="${esc(url)}" target="_blank" rel="noopener noreferrer nofollow">${ic("right")}Apply / read more</a>` : ""}
          ${o.contact ? `<span class="small">${ic("chat")} ${esc(o.contact)}</span>` : ""}
          <button type="button" class="btn ghost sm" data-save="${esc(o.id)}">${ic("star")}${saved.has(o.id) ? "Saved" : "Save"}</button>
          ${shareButton(`${o.title} — ${o.org}${o.location ? ", " + o.location : ""}${o.deadline ? `\nDeadline: ${o.deadline}` : ""}${url ? `\n${url}` : ""}\n(shared from MedBridge)`, "Share")}
          ${me && !o.mine ? `<button type="button" class="linkbtn" data-report="${esc(o.id)}">${ic("flag")}Report</button>` : ""}
          ${o.mine || window.API?.isAdmin ? `<a class="linkbtn" href="#/opportunities/edit?id=${esc(o.id)}">${ic("edit")}Edit</a><button type="button" class="linkbtn" data-del="${esc(o.id)}">${ic("trash")}Delete</button>` : ""}
        </div>
        ${o.postedBy ? `<div class="small muted opp-by">Posted by ${esc(o.postedBy.name)}${o.postedBy.verified ? " ✓" : ""}${o.postedBy.admin ? " (MedBridge)" : ""}</div>` : ""}
      </article>`;
    }

    function directoryHtml() {
      return `<h2 id="opp-dir">${ic("globe")} Where to look</h2>
        <p class="small text-2" style="margin-top:-.3rem">The official pages where real vacancies, scholarships and courses are announced. MedBridge does not run these sites and cannot check every call on them.</p>
        ${C.DIRECTORY.map(g => `<details class="fold opp-dir" ${g.group.startsWith("Jobs in") ? "open" : ""}><summary><h2>${esc(g.group)} <span class="muted">(${g.items.length})</span></h2></summary>
          <div class="opp-links">${g.items.map(x => `<a class="card opp-link" href="${esc(x.url)}" target="_blank" rel="noopener noreferrer"><b>${esc(x.name)}</b><span>${esc(x.for)}</span><span class="opp-url">${esc(x.url.replace(/^https?:\/\//, "").replace(/\/$/, ""))} ${ic("right")}</span></a>`).join("")}</div></details>`).join("")}`;
    }

    async function board(main, route) {
      const me = window.API?.user || null;
      if (state.cadre === null) state.cadre = route.q.for ?? "";     // everyone by default: a filter nobody chose must not hide posts
      if (route.q.k != null) state.kind = C.KINDS[route.q.k] ? route.q.k : "";
      if (route.q.tab === "saved") state.tab = "saved";
      const serverless = !!window.API?.state?.serverless;
      main.innerHTML = `
        <div class="resus-head"><div><h1 style="margin:0">${ic("star")} Opportunities</h1>
          <p class="text-2" style="margin:.2rem 0 0">Jobs, scholarships, fellowships, trainings and conferences for health workers — posted by colleagues and checked before they appear.</p></div>
          <div class="row">${me ? `<a class="btn sm" href="#/opportunities/new">${ic("edit")}Post an opportunity</a>` : serverless ? "" : `<a class="btn ghost sm" href="#/account">${ic("user")}Sign in to post</a>`}</div></div>
        <div class="callout warn">${ic("shield")}<div><strong>Stay safe.</strong> Never pay a fee to apply or to be "shortlisted". Apply through the organisation's own page, and report anything that looks wrong.</div></div>
        <div class="seg opp-tabs" role="tablist"><button type="button" data-tab="board" class="${state.tab === "board" ? "active" : ""}">${ic("grid")}All posts</button><button type="button" data-tab="saved" class="${state.tab === "saved" ? "active" : ""}">${ic("star")}Saved <b id="opp-nsaved">${saved.list().length}</b></button><button type="button" data-tab="dir">${ic("globe")}Where to look</button></div>
        <div id="opp-admin"></div>
        <div id="opp-filters"></div>
        <div id="opp-list"><p class="empty small">Loading…</p></div>
        ${directoryHtml()}`;
      main.querySelector(".opp-tabs").onclick = (e) => {
        const b = e.target.closest("[data-tab]"); if (!b) return;
        if (b.dataset.tab === "dir") { document.getElementById("opp-dir")?.scrollIntoView({ behavior: "smooth" }); return; }
        state.tab = b.dataset.tab; main.querySelectorAll(".opp-tabs [data-tab]").forEach(x => x.classList.toggle("active", x === b)); draw();
      };
      if (serverless) {
        $("#opp-list").innerHTML = `<div class="callout info">${ic("info")}<div>This copy of MedBridge has no server, so it cannot show posts. Open the full app to read and post opportunities: <a href="https://med-guide-nine.vercel.app/#/opportunities" target="_blank" rel="noopener">med-guide-nine.vercel.app</a>. The official sites are listed below.</div></div>`;
        return;
      }
      data = await window.API.opportunities();
      const seenAt = store.get("oppSeenAt", "");
      const newest = data.opportunities.filter(o => o.publishedAt).map(o => o.publishedAt).sort().pop();
      draw(seenAt);
      if (newest) store.set("oppSeenAt", newest);
      if (window.API.isAdmin) adminQueue();

      function draw(seen = store.get("oppSeenAt", "")) {
        const isSaved = state.tab === "saved";
        const src = isSaved ? saved.list() : data.opportunities;
        const counts = {}; for (const o of filterOpps(src, { cadre: state.cadre, q: state.q })) counts[o.kind] = (counts[o.kind] || 0) + 1;
        $("#opp-filters").innerHTML = `
          <div class="opp-kinds">${[["", "All", "grid"], ...Object.entries(C.KINDS).map(([k, v]) => [k, v.label, v.icon])].map(([k, l, i]) =>
            `<button type="button" class="en-chip ${state.kind === k ? "active" : ""}" data-kind="${k}">${ic(i)}${esc(l)}${k ? ` <b>${counts[k] || 0}</b>` : ""}</button>`).join("")}</div>
          <div class="opp-row"><label class="small" for="opp-for">For</label><select id="opp-for"><option value="">Everyone</option>${C.CADRES.map(c => `<option value="${esc(c)}" ${state.cadre === c ? "selected" : ""}>${esc(c)}${me && me.profession === c ? " (you)" : ""}</option>`).join("")}</select>
            <input id="opp-q" type="search" placeholder="Search posts…" value="${esc(state.q)}" aria-label="Search opportunities"></div>`;
        const items = filterOpps(src, { kind: state.kind, cadre: state.cadre, q: state.q });
        const fresh = isSaved ? 0 : newSince(data.opportunities, seen);
        $("#opp-list").innerHTML = (data.cached ? `<p class="small muted">${ic("clock")} Offline — showing the copy saved ${new Date(data.at).toLocaleDateString()}.</p>` : "")
          + (fresh && seen ? `<p class="small"><span class="chip ok">${fresh} new since your last visit</span></p>` : "")
          + (items.length ? items.map(o => cardHtml(o, me)).join("")
            : `<div class="empty">${isSaved ? "Nothing saved yet. Tap Save on a post to keep it here — saved posts stay readable offline." : data.opportunities.length ? "No posts match. Try “Everyone” or another kind." : `No posts yet. ${me ? `<a href="#/opportunities/new">Post the first one</a> — a vacancy at your hospital, a training or a scholarship call.` : "Sign in to post one."} Meanwhile, the official sites below carry current calls.`}</div>`);
        $("#opp-filters").onclick = (e) => { const b = e.target.closest("[data-kind]"); if (b) { state.kind = b.dataset.kind; draw(seen); } };
        $("#opp-for").onchange = (e) => { state.cadre = e.target.value; draw(seen); };
        const qi = $("#opp-q"); qi.oninput = () => { state.q = qi.value; const pos = qi.selectionStart; draw(seen); const n = $("#opp-q"); n.focus(); n.setSelectionRange(pos, pos); };
      }

      main.onclick = async (e) => {
        const ob = e.target.closest(".opp-body"); if (ob) ob.classList.toggle("open");
        const s = e.target.closest("[data-save]"), r = e.target.closest("[data-report]"), d = e.target.closest("[data-del]");
        if (s) { const o = [...data.opportunities, ...saved.list()].find(x => x.id === s.dataset.save); if (!o) return;
          const on = saved.toggle(o); s.innerHTML = `${ic("star")}${on ? "Saved" : "Save"}`; $("#opp-nsaved").textContent = saved.list().length; toast(on ? "Saved on this device." : "Removed from saved."); }
        if (r) { const why = prompt("What is wrong with this post? (expired, wrong details, asks for money, scam…)"); if (why === null) return;
          try { await window.API.reportOpportunity(r.dataset.report, why); toast("Thank you — reported to the administrators."); } catch (err) { toast(err.message); } }
        if (d) { if (!confirm("Delete this post?")) return;
          try { await window.API.deleteOpportunity(d.dataset.del); data.opportunities = data.opportunities.filter(o => o.id !== d.dataset.del); draw(); toast("Deleted."); } catch (err) { toast(err.message); } }
        const mod = e.target.closest("[data-mod]");
        if (mod) { const note = mod.dataset.mod === "rejected" ? prompt("Reason (shown to the poster):", "") : "";
          if (note === null) return;
          try { await window.API.adminModerateOpportunity(mod.dataset.id, mod.dataset.mod, note); toast(mod.dataset.mod === "published" ? "Published." : "Rejected."); board(main, route); } catch (err) { toast(err.message); } }
      };

      async function adminQueue() {
        try {
          const { queue } = await window.API.adminOpportunities();
          if (!queue.length) return;
          $("#opp-admin").innerHTML = `<div class="card opp-queue"><h3 style="margin-top:0">${ic("shield")} Waiting for you (${queue.length})</h3>
            <p class="small text-2">Check the link opens the organisation's own page, the deadline is real and nothing asks for money.</p>
            ${queue.map(o => `<div class="opp-q-item"><div><b>${esc(o.title)}</b> <span class="small muted">— ${esc(o.org)} · ${esc(C.KINDS[o.kind]?.one || o.kind)}${o.status === "flagged" ? ` · reported: ${esc(o.reasons)}` : ""}</span>
              ${safeUrl(o.link) ? `<div class="small"><a href="${esc(o.link)}" target="_blank" rel="noopener noreferrer nofollow">${esc(o.link)}</a></div>` : `<div class="small">Contact: ${esc(o.contact)}</div>`}</div>
              <div class="row"><button type="button" class="btn sm" data-mod="published" data-id="${esc(o.id)}">${ic("check")}Publish</button><button type="button" class="btn ghost sm" data-mod="rejected" data-id="${esc(o.id)}">${ic("x")}Reject</button></div></div>`).join("")}</div>`;
        } catch {}
      }
    }

    function form(main, route) {
      const me = window.API?.user;
      if (!me) { main.innerHTML = `<p class="empty">Sign in to post an opportunity. <a href="#/account">Sign in or join</a></p>`; return; }
      const editing = route.q.id ? [...(data.opportunities || []), ...window.API.cachedOpportunities()].find(o => o.id === route.q.id) : null;
      const o = editing || { kind: "job", mode: "onsite", cadres: [] };
      const today = new Date().toISOString().slice(0, 10);
      main.innerHTML = `
        <a class="back" href="#/opportunities">${ic("left")}Opportunities</a>
        <h1>${editing ? "Edit the post" : "Post an opportunity"}</h1>
        <div class="callout info">${ic("info")}<div>${me.role === "admin" ? "As an administrator, your post goes live at once." : "An administrator checks every post before it appears. Link to the organisation's own announcement so others can confirm it."}</div></div>
        <form class="card opp-form" id="opp-form" novalidate>
          <div class="field"><label for="f-kind">What is it?</label><select id="f-kind">${Object.entries(C.KINDS).map(([k, v]) => `<option value="${k}" ${o.kind === k ? "selected" : ""}>${esc(v.one)}</option>`).join("")}</select></div>
          <div class="field"><label for="f-title">Title</label><input id="f-title" maxlength="140" required value="${esc(o.title || "")}" placeholder="e.g. General practitioner, emergency department"></div>
          <div class="field"><label for="f-org">Organisation</label><input id="f-org" maxlength="120" required value="${esc(o.org || "")}" placeholder="Hospital, university, NGO or programme"></div>
          <div class="inline"><div class="field"><label for="f-loc">Place</label><input id="f-loc" maxlength="120" value="${esc(o.location || "")}" placeholder="Town, region or country"></div>
            <div class="field"><label for="f-mode">Where</label><select id="f-mode">${Object.entries(C.MODES).map(([k, v]) => `<option value="${k}" ${o.mode === k ? "selected" : ""}>${esc(v)}</option>`).join("")}</select></div></div>
          <div class="field"><span class="lbl">Who can apply</span><div class="po-chips" id="f-cadres">${C.CADRES.map(c => `<button type="button" class="po-chip ${(o.cadres || []).includes(c) ? "on" : ""}" data-cadre="${esc(c)}">${esc(c)}</button>`).join("")}</div><p class="small muted">Leave all off if anyone can apply.</p></div>
          <div class="inline"><div class="field"><label for="f-dl">Deadline</label><input id="f-dl" type="date" min="${today}" value="${esc(o.deadline || "")}"></div>
            <div class="field"><label for="f-contact">Contact (if no link)</label><input id="f-contact" maxlength="120" value="${esc(o.contact || "")}" placeholder="Phone or e-mail of the office"></div></div>
          <div class="field"><label for="f-link">Link to the official announcement</label><input id="f-link" type="url" inputmode="url" maxlength="400" value="${esc(o.link || "")}" placeholder="https://"></div>
          <div class="field"><label for="f-body">Details</label><textarea id="f-body" rows="6" maxlength="4000" placeholder="Who can apply, what is offered, how to apply, documents needed.">${esc(o.body || "")}</textarea></div>
          <p class="small muted">Do not post anything that asks applicants for money. Posts disappear by themselves after the deadline.</p>
          <div class="row"><button type="submit" class="btn">${ic("send")}${editing ? "Save changes" : "Submit"}</button><a class="btn ghost" href="#/opportunities">Cancel</a></div>
        </form>`;
      $("#f-cadres").onclick = (e) => { const b = e.target.closest("[data-cadre]"); if (b) b.classList.toggle("on"); };
      $("#opp-form").onsubmit = async (e) => {
        e.preventDefault();
        const f = { kind: $("#f-kind").value, title: $("#f-title").value, org: $("#f-org").value, location: $("#f-loc").value, mode: $("#f-mode").value,
          cadres: [...main.querySelectorAll("#f-cadres .on")].map(b => b.dataset.cadre), deadline: $("#f-dl").value, contact: $("#f-contact").value,
          link: $("#f-link").value.trim(), body: $("#f-body").value };
        try {
          const r = editing ? await window.API.editOpportunity(editing.id, f) : await window.API.postOpportunity(f);
          toast(r.opportunity.status === "published" ? "Published." : "Sent — it will appear once an administrator approves it.");
          location.hash = "#/opportunities";
        } catch (err) { toast(err.message); }
      };
    }

    function view(main, route) {
      if (route.id === "new" || route.id === "edit") return form(main, route);
      return board(main, route);
    }
    /** Count of posts published since the last visit, from the offline copy (for the home tile). */
    const freshCount = () => newSince(window.API?.cachedOpportunities?.() || [], store.get("oppSeenAt", ""));
    return { view, freshCount };
  };
})();
