/* MedBridge community views: account, network feed, admin console, and the
   practice-notes section shown on every drug page.
   Registered by app.js, which passes its shared helpers as `ctx`. */
window.Community = function (ctx) {
  const { $, esc, ic, listHtml, sortedDrugs, catStyle, render, toast } = ctx;
  const fmtDate = (s) => { try { return new Date(s).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }); } catch { return ""; } };
  const nl2 = (s) => esc(s).replace(/\n/g, "<br>");
  const authorLine = (a) => `<span class="who"><strong>${esc(a.name)}</strong>${a.verified ? `<span class="chip ok" title="Identity checked by an administrator">${ic("check")}Verified</span>` : `<span class="chip" title="Not yet checked by an administrator">Unverified</span>`}${a.admin ? `<span class="chip primary">${ic("shield")}Admin</span>` : ""}</span><span class="where">${esc(a.profession)} · ${esc(a.facility)}, ${esc(a.city)}</span>`;

  /* ============ practice notes on a drug page ============ */
  async function drugSection(host, drug) {
    if (API.state.serverless) { host.innerHTML = ""; return; }
    host.innerHTML = `<div class="card"><p class="muted small">Loading notes from other facilities…</p></div>`;
    const data = await API.drugExtras(drug.id);
    const me = API.user;
    const official = data.methods || [], notes = data.comments || [];
    host.innerHTML = `
      ${official.length ? `<div class="card verified">
        <h4 style="margin-top:0">${ic("shield")} Administrator-approved local methods — Ethiopia</h4>
        <p class="small muted" style="margin-top:-.2rem">Added and maintained by the MedBridge clinical administrators. These are the methods the app recommends locally.</p>
        ${official.map(m => `<div class="omethod">
          <h3>${esc(m.title)} ${m.kind === "main" ? `<span class="chip primary">Main method</span>` : `<span class="chip">Suggested</span>`}</h3>
          ${m.bestFor ? `<p class="best">${esc(m.bestFor)}</p>` : ""}
          <h4>Steps</h4>${listHtml(m.steps, "ol")}
          ${m.monitor.length ? `<h4>Monitor</h4>${listHtml(m.monitor)}` : ""}
          ${m.cautions.length ? `<h4>Cautions</h4>${listHtml(m.cautions)}` : ""}
          <p class="small muted">${m.source ? esc(m.source) + " · " : ""}updated ${fmtDate(m.updatedAt)}</p>
        </div>`).join("")}
      </div>` : ""}

      <div class="card notes">
        <div class="notes-head">
          <div><h3 style="margin:0">${ic("chat")} How colleagues give it</h3>
          <p class="small muted" style="margin:.2rem 0 0">${notes.length} practice note${notes.length === 1 ? "" : "s"} from doctors across Ethiopia.</p></div>
        </div>
        <div class="callout warn" style="margin:.7rem 0"><div>${ic("alert")}</div><div><strong>These notes are personal reports, not guidance.</strong> They describe what colleagues do in their own hospital. They are not checked by the administrators and must not be followed in place of the national protocol.</div></div>
        ${data.cached ? `<p class="small muted">${ic("info")} Offline — showing notes saved on this device${data.at ? " on " + fmtDate(new Date(data.at).toISOString()) : ""}.</p>` : ""}
        ${data.offline ? `<p class="small muted">${ic("info")} Offline — practice notes will appear when you reconnect.</p>` : ""}
        <div id="note-form"></div>
        <div id="note-list">${notes.length ? notes.map(noteHtml).join("") : `<p class="muted small">No notes yet for this drug. If you administer it a particular way in your hospital, you can be the first to describe it.</p>`}</div>
      </div>`;

    const form = $("#note-form", host);
    if (!API.state.online) form.innerHTML = "";
    else if (!me) form.innerHTML = `<p class="small"><a class="btn sm" href="#/account">${ic("user")}Sign in to add how your hospital does it</a></p>`;
    else form.innerHTML = `
      <div class="note-compose">
        <label class="sr" for="nb">Your practice note</label>
        <textarea id="nb" rows="3" maxlength="4000" placeholder="How do you give ${esc(drug.name)} at ${esc(me.facility)}? Strength stocked, dilution, route, drip rate, what you watch for…"></textarea>
        <div class="row" style="justify-content:space-between">
          <span class="small muted">Posted as ${esc(me.name)} · ${esc(me.facility)}, ${esc(me.city)}</span>
          <button type="button" class="btn sm" id="nsend">${ic("send")}Post note</button>
        </div>
      </div>`;

    function noteHtml(c) {
      return `<article class="note" data-id="${c.id}">
        <div class="note-top">${authorLine(c.author)}<time class="small muted">${fmtDate(c.createdAt)}</time></div>
        <div class="note-body">${nl2(c.body)}</div>
        ${c.promoted ? `<p class="small"><span class="chip ok">${ic("check")}Adopted by the administrators as an approved method</span></p>` : ""}
        <div class="note-actions">
          <button type="button" class="linkbtn ${c.mine ? "on" : ""}" data-act="agree">${ic("check")}<span>We do this too</span> <b>${c.agrees || 0}</b></button>
          ${c.own ? `<button type="button" class="linkbtn" data-act="edit">${ic("edit")}Edit</button><button type="button" class="linkbtn danger" data-act="del">${ic("trash")}Delete</button>` : `<button type="button" class="linkbtn" data-act="report">${ic("flag")}Report</button>`}
          ${API.isAdmin && !c.own ? `<button type="button" class="linkbtn" data-act="hide">${ic("eye")}Hide</button><button type="button" class="linkbtn" data-act="promote">${ic("shield")}Adopt as method</button>` : ""}
        </div>
      </article>`;
    }

    const send = $("#nsend", host);
    if (send) send.addEventListener("click", async () => {
      const ta = $("#nb", host), body = ta.value.trim();
      if (body.length < 10) return toast("Write at least a sentence.", true);
      send.disabled = true;
      try { await API.postComment(drug.id, body); ta.value = ""; await drugSection(host, drug); toast("Note posted."); }
      catch (e) { toast(e.message, true); send.disabled = false; }
    });

    host.addEventListener("click", async (e) => {
      const b = e.target.closest("[data-act]"); if (!b) return;
      const art = b.closest(".note"), id = art?.dataset.id; if (!id) return;
      const act = b.dataset.act;
      try {
        if (act === "agree") { const r = await API.agree(id); b.classList.toggle("on", r.mine); b.querySelector("b").textContent = r.agrees; }
        if (act === "del") { if (confirm("Delete your note?")) { await API.deleteComment(id); await drugSection(host, drug); } }
        if (act === "edit") {
          const cur = art.querySelector(".note-body").innerText;
          const next = prompt("Edit your note:", cur);
          if (next && next.trim().length >= 10) { await API.editComment(id, next.trim()); await drugSection(host, drug); }
        }
        if (act === "report") { const why = prompt("What is wrong with this note? (unsafe dose, wrong route, spam)"); if (why) { await API.report(id, why); toast("Reported to the administrators."); await drugSection(host, drug); } }
        if (act === "hide") { await API.adminModerate(id, "hidden", "hidden by admin"); await drugSection(host, drug); toast("Note hidden."); }
        if (act === "promote") { location.hash = `#/admin?tab=methods&drug=${drug.id}&from=${id}`; }
      } catch (err) { toast(err.message, true); }
    });
  }

  /* ============ account ============ */
  function account(main) {
    const u = API.user;
    if (!API.state.online) { main.innerHTML = `<h1>Account</h1><div class="callout warn">${ic("alert")}<div>No connection to the MedBridge server. Reference content and calculators still work offline; accounts and notes need a connection.</div></div>`; return; }
    if (u) return profile(main, u);

    const places = window.ET_PLACES || [];
    const professions = API.state.meta?.professions || ["physician"];
    const levels = API.state.meta?.levels || [];
    main.innerHTML = `
      <h1>Account</h1>
      <div class="seg" id="mode" role="group" aria-label="Sign in or join"><button type="button" data-m="in" class="active">Sign in</button><button type="button" data-m="up">Create account</button></div>
      <div class="auth-grid">
        <div class="card" id="pane"></div>
        <div class="card"><h4 style="margin-top:0">Why an account</h4>
          <ul class="small"><li>Add how your hospital actually administers a drug, so colleagues elsewhere in Ethiopia can see it.</li><li>Mark a colleague's note "we do this too".</li><li>Your name, profession, hospital and city are shown with every note, which is what makes them useful.</li></ul>
          <h4>What accounts cannot do</h4>
          <p class="small muted">Only administrators can add or change the approved administration methods. Practice notes are always labelled as personal reports and kept separate from them.</p></div>
      </div>`;
    const pane = $("#pane", main);
    const cityOptions = places.map(r => `<optgroup label="${esc(r.region)}">${r.cities.map(c => `<option value="${esc(c)}" data-region="${esc(r.region)}">${esc(c)}</option>`).join("")}</optgroup>`).join("");

    const drawIn = () => {
      pane.innerHTML = `<h3>Sign in</h3>
        <div class="field"><label for="le">Email</label><input id="le" type="email" autocomplete="email"></div>
        <div class="field"><label for="lp">Password</label><input id="lp" type="password" autocomplete="current-password"></div>
        <button type="button" class="btn" id="lgo">${ic("user")}Sign in</button><p id="lerr" class="small" style="color:var(--red);margin-top:.6rem"></p>`;
      const go = async () => {
        try { await API.login($("#le", pane).value.trim(), $("#lp", pane).value); toast("Signed in."); render(); }
        catch (e) { $("#lerr", pane).textContent = e.message; }
      };
      $("#lgo", pane).addEventListener("click", go);
      $("#lp", pane).addEventListener("keydown", e => { if (e.key === "Enter") go(); });
    };
    const drawUp = () => {
      pane.innerHTML = `<h3>Create account</h3>
        <div class="field"><label for="rn">Full name</label><input id="rn" autocomplete="name" placeholder="Dr Selam Abebe"></div>
        <div class="inline"><div class="field"><label for="rpf">Profession</label><select id="rpf">${professions.map(p => `<option${p === "physician" ? " selected" : ""}>${esc(p)}</option>`).join("")}</select></div>
        <div class="field"><label for="rc">City / town</label><select id="rc">${cityOptions}</select></div></div>
        <div class="inline"><div class="field"><label for="rf">Hospital / health facility</label><input id="rf" placeholder="e.g. Tikur Anbessa Specialised Hospital"></div>
        <div class="field"><label for="rl">Facility level</label><select id="rl">${levels.map(l => `<option>${esc(l)}</option>`).join("")}</select></div></div>
        <div class="inline"><div class="field"><label for="re">Email</label><input id="re" type="email" autocomplete="email"></div>
        <div class="field"><label for="rp">Password (8+ characters)</label><input id="rp" type="password" autocomplete="new-password"></div></div>
        <button type="button" class="btn" id="rgo">${ic("check")}Create account</button><p id="rerr" class="small" style="color:var(--red);margin-top:.6rem"></p>
        <p class="small muted">New accounts can post practice notes immediately; they show as “unverified” until an administrator confirms who you are.</p>`;
      $("#rgo", pane).addEventListener("click", async () => {
        const sel = $("#rc", pane);
        try {
          await API.register({ name: $("#rn", pane).value, profession: $("#rpf", pane).value, city: sel.value, region: sel.selectedOptions[0]?.dataset.region || "", facility: $("#rf", pane).value, facilityLevel: $("#rl", pane).value, email: $("#re", pane).value, password: $("#rp", pane).value });
          toast("Welcome to MedBridge."); render();
        } catch (e) { $("#rerr", pane).textContent = e.message; }
      });
    };
    $("#mode", main).addEventListener("click", e => {
      const b = e.target.closest("[data-m]"); if (!b) return;
      $("#mode", main).querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
      b.dataset.m === "in" ? drawIn() : drawUp();
    });
    drawIn();
  }

  function profile(main, u) {
    const places = window.ET_PLACES || [];
    const professions = API.state.meta?.professions || [u.profession];
    const levels = API.state.meta?.levels || [u.facilityLevel];
    main.innerHTML = `
      <h1>My account</h1>
      <div class="auth-grid">
        <div class="card">
          <div class="row" style="margin-bottom:.8rem"><div class="avatar">${esc((u.name || "?").slice(0, 1).toUpperCase())}</div>
            <div><div style="font-weight:700">${esc(u.name)}</div><div class="small muted">${esc(u.profession)} · ${esc(u.facility)}, ${esc(u.city)}</div></div></div>
          <div class="row">${u.verified ? `<span class="chip ok">${ic("check")}Verified by an administrator</span>` : `<span class="chip warn">${ic("info")}Awaiting verification</span>`}${u.role === "admin" ? `<span class="chip primary">${ic("shield")}Administrator</span>` : ""}</div>
          <h4>Details</h4>
          <div class="field"><label for="pn">Full name</label><input id="pn" value="${esc(u.name)}"></div>
          <div class="inline"><div class="field"><label for="ppf">Profession</label><select id="ppf">${professions.map(p => `<option ${p === u.profession ? "selected" : ""}>${esc(p)}</option>`).join("")}</select></div>
          <div class="field"><label for="pc">City / town</label><select id="pc">${places.map(r => `<optgroup label="${esc(r.region)}">${r.cities.map(c => `<option ${c === u.city ? "selected" : ""} data-region="${esc(r.region)}">${esc(c)}</option>`).join("")}</optgroup>`).join("")}</select></div></div>
          <div class="inline"><div class="field"><label for="pf">Hospital / facility</label><input id="pf" value="${esc(u.facility)}"></div>
          <div class="field"><label for="pl">Facility level</label><select id="pl">${levels.map(l => `<option ${l === u.facilityLevel ? "selected" : ""}>${esc(l)}</option>`).join("")}</select></div></div>
          <button type="button" class="btn sm" id="psave">Save details</button>
          <h4>Change password</h4>
          <div class="inline"><div class="field"><label for="pc1">Current password</label><input id="pc1" type="password"></div><div class="field"><label for="pc2">New password</label><input id="pc2" type="password"></div></div>
          <button type="button" class="btn ghost sm" id="ppw">Change password</button>
          <p id="perr" class="small" style="color:var(--red)"></p>
        </div>
        <div class="card"><h4 style="margin-top:0">Session</h4>
          <p class="small muted">Member since ${fmtDate(u.createdAt)}.</p>
          ${u.role === "admin" ? `<a class="btn sm" href="#/admin">${ic("shield")}Open admin console</a>` : ""}
          <a class="btn ghost sm" href="#/community" style="margin-top:.5rem">${ic("globe")}Network activity</a>
          <button type="button" class="btn ghost sm" id="out" style="margin-top:.5rem">Sign out</button></div>
      </div>`;
    $("#psave", main).addEventListener("click", async () => {
      const sel = $("#pc", main);
      try { await API.updateMe({ name: $("#pn", main).value, profession: $("#ppf", main).value, city: sel.value, region: sel.selectedOptions[0]?.dataset.region || "", facility: $("#pf", main).value, facilityLevel: $("#pl", main).value }); toast("Saved."); render(); }
      catch (e) { $("#perr", main).textContent = e.message; }
    });
    $("#ppw", main).addEventListener("click", async () => {
      try { await API.updateMe({ currentPassword: $("#pc1", main).value, newPassword: $("#pc2", main).value }); toast("Password changed."); $("#pc1", main).value = $("#pc2", main).value = ""; }
      catch (e) { $("#perr", main).textContent = e.message; }
    });
    $("#out", main).addEventListener("click", async () => { await API.logout(); render(); });
  }

  /* ============ network feed ============ */
  async function community(main) {
    main.innerHTML = `<h1>Across Ethiopia</h1><p class="muted">Loading…</p>`;
    let d;
    try { d = await API.feed(); } catch { main.innerHTML = `<h1>Across Ethiopia</h1><div class="callout warn">${ic("alert")}<div>Cannot reach the server. This page needs a connection; drug pages and calculators work offline.</div></div>`; return; }
    const byDrug = (id) => DRUG_DB.find(x => x.id === id);
    main.innerHTML = `
      <h1>Across Ethiopia</h1>
      <p class="text-2" style="max-width:62ch">What colleagues in other hospitals report about giving these drugs. Practice notes are personal reports and are not approved guidance.</p>
      <div class="stat-row">
        <div class="card stat"><b>${d.totals.users}</b><span>doctors and staff</span></div>
        <div class="card stat"><b>${d.totals.notes}</b><span>practice notes</span></div>
        <div class="card stat"><b>${d.totals.methods}</b><span>approved local methods</span></div>
      </div>
      <h2>Cities</h2>
      <div class="citywrap">${d.cities.filter(c => c.city).map(c => `<span class="citychip"><strong>${esc(c.city)}</strong> ${c.users} member${c.users === 1 ? "" : "s"}${c.notes ? ` · ${c.notes} note${c.notes === 1 ? "" : "s"}` : ""}</span>`).join("") || `<p class="muted small">No members yet.</p>`}</div>
      <h2 style="margin-top:1.2rem">Recent notes</h2>
      ${d.feed.length ? d.feed.map(c => { const dr = byDrug(c.drug); return `<article class="card note">
        <div class="note-top">${authorLine(c.author)}<time class="small muted">${fmtDate(c.createdAt)}</time></div>
        <p class="small" style="margin:.3rem 0"><a href="#/drug/${esc(c.drug)}"><strong>${esc(dr ? dr.name : c.drug)}</strong></a></p>
        <div class="note-body">${nl2(c.body)}</div>
        <div class="note-actions"><span class="small muted">${c.agrees} colleague${c.agrees === 1 ? "" : "s"} do this too</span></div>
      </article>`; }).join("") : `<p class="muted">No notes yet. Sign in and describe how your hospital administers a drug.</p>`}`;
  }

  /* ============ admin console ============ */
  async function admin(main, route) {
    if (!API.isAdmin) { main.innerHTML = `<h1>Admin</h1><div class="callout danger">${ic("shield")}<div>Administrators only. <a href="#/account">Sign in</a> with an administrator account.</div></div>`; return; }
    main.innerHTML = `<h1>Admin console</h1><p class="muted">Loading…</p>`;
    let d;
    try { d = await API.adminOverview(); } catch (e) { main.innerHTML = `<h1>Admin console</h1><div class="callout danger">${ic("alert")}<div>${esc(e.message)}</div></div>`; return; }
    const tab = route.q.tab || "methods";
    const tabs = [["methods", "Approved methods"], ["flagged", `Moderation (${d.flagged.length})`], ["users", `Members (${d.users.length})`], ["audit", "Activity log"]];
    main.innerHTML = `<h1>Admin console</h1>
      <div class="callout info">${ic("shield")}<div>Only what you publish here appears as an <strong>approved method</strong>. Members' practice notes stay separate and are always labelled as personal reports.</div></div>
      <div class="tabs" role="tablist">${tabs.map(([k, v]) => `<button type="button" class="tab ${k === tab ? "active" : ""}" data-tab="${k}">${v}</button>`).join("")}</div>
      <div id="apane"></div>`;
    const pane = $("#apane", main);

    const methodForm = (m, preset) => `
      <div class="card" id="mform">
        <h3>${m ? "Edit approved method" : "New approved method"}</h3>
        <div class="inline">
          <div class="field"><label for="f-drug">Drug</label><select id="f-drug">${sortedDrugs().map(x => `<option value="${x.id}" ${(m?.drug || preset?.drug) === x.id ? "selected" : ""}>${esc(x.name)}</option>`).join("")}</select></div>
          <div class="field"><label for="f-kind">Status</label><select id="f-kind"><option value="main" ${m?.kind === "main" ? "selected" : ""}>Main method (what we recommend)</option><option value="suggested" ${m?.kind !== "main" ? "selected" : ""}>Suggested alternative</option></select></div>
        </div>
        <div class="field"><label for="f-title">Title</label><input id="f-title" value="${esc(m?.title || "")}" placeholder="e.g. Hourly IM insulin — Ethiopian hospitals without pumps"></div>
        <div class="field"><label for="f-best">When to use it</label><input id="f-best" value="${esc(m?.bestFor || "")}"></div>
        <div class="field"><label for="f-body">Steps (one per line)</label><textarea id="f-body" rows="6">${esc(m?.steps?.join("\n") || preset?.body || "")}</textarea></div>
        <div class="inline"><div class="field"><label for="f-mon">Monitor (one per line)</label><textarea id="f-mon" rows="3">${esc(m?.monitor?.join("\n") || "")}</textarea></div>
        <div class="field"><label for="f-cau">Cautions (one per line)</label><textarea id="f-cau" rows="3">${esc(m?.cautions?.join("\n") || "")}</textarea></div></div>
        <div class="field"><label for="f-src">Source / authority</label><input id="f-src" value="${esc(m?.source || "")}" placeholder="e.g. FMOH STG 2021, p. 214"></div>
        ${preset?.from ? `<p class="small muted">Adopted from a member's practice note.</p>` : ""}
        <div class="row"><button type="button" class="btn sm" id="msave">${ic("check")}${m ? "Save changes" : "Publish method"}</button>${m ? `<button type="button" class="btn ghost sm" id="mcancel">Cancel</button>` : ""}</div>
      </div>`;

    const draw = async (t) => {
      if (t === "methods") {
        const preset = route.q.drug ? { drug: route.q.drug, from: route.q.from } : null;
        if (preset?.from) { try { const c = (await API.drugExtras(preset.drug)).comments.find(x => x.id === preset.from); if (c) preset.body = c.body; } catch {} }
        pane.innerHTML = methodForm(null, preset) + (d.methods.length ? d.methods.map(m => `
          <div class="card omethod-row"><div><strong>${esc(m.title)}</strong> ${m.kind === "main" ? `<span class="chip primary">Main</span>` : `<span class="chip">Suggested</span>`}${m.published ? "" : `<span class="chip warn">Unpublished</span>`}
            <div class="small muted">${esc(DRUG_DB.find(x => x.id === m.drug)?.name || m.drug)} · updated ${fmtDate(m.updatedAt)}</div></div>
            <div class="row"><button type="button" class="btn ghost sm" data-edit="${m.id}">Edit</button><button type="button" class="btn ghost sm" data-del="${m.id}">Delete</button></div></div>`).join("") : `<p class="muted small">No approved methods published yet.</p>`);
        const bind = (m) => {
          $("#msave", pane).addEventListener("click", async () => {
            const f = { drug: $("#f-drug", pane).value, kind: $("#f-kind", pane).value, title: $("#f-title", pane).value, bestFor: $("#f-best", pane).value, body: $("#f-body", pane).value, monitor: $("#f-mon", pane).value, cautions: $("#f-cau", pane).value, source: $("#f-src", pane).value, fromComment: route.q.from };
            try { await API.adminSaveMethod(f, m?.id); toast(m ? "Method updated." : "Method published."); location.hash = "#/admin?tab=methods"; render(); }
            catch (e) { toast(e.message, true); }
          });
          const c = $("#mcancel", pane); if (c) c.addEventListener("click", () => draw("methods"));
        };
        bind(null);
        pane.addEventListener("click", async (e) => {
          const ed = e.target.closest("[data-edit]"), dl = e.target.closest("[data-del]");
          if (ed) { const m = d.methods.find(x => x.id === ed.dataset.edit); $("#mform", pane).outerHTML = methodForm(m); bind(m); window.scrollTo(0, 0); }
          if (dl && confirm("Delete this approved method?")) { await API.adminDeleteMethod(dl.dataset.del); toast("Deleted."); render(); }
        });
      }
      if (t === "flagged") {
        pane.innerHTML = d.flagged.length ? d.flagged.map(c => `<div class="card note" data-id="${c.id}">
          <div class="note-top">${authorLine(c.author)}<span class="chip ${c.status === "flagged" ? "bad" : ""}">${esc(c.status)}</span></div>
          <p class="small"><a href="#/drug/${esc(c.drug)}">${esc(DRUG_DB.find(x => x.id === c.drug)?.name || c.drug)}</a></p>
          <div class="note-body">${nl2(c.body)}</div>
          ${c.reasons ? `<p class="small" style="color:var(--red)">Reported: ${esc(c.reasons)}</p>` : ""}
          <div class="row"><button type="button" class="btn ghost sm" data-mod="published">Restore</button><button type="button" class="btn ghost sm" data-mod="hidden">Keep hidden</button></div></div>`).join("")
          : `<p class="muted small">Nothing reported. Members can flag a note that looks unsafe and it appears here.</p>`;
        pane.addEventListener("click", async (e) => {
          const b = e.target.closest("[data-mod]"); if (!b) return;
          await API.adminModerate(b.closest("[data-id]").dataset.id, b.dataset.mod, ""); toast("Updated."); render();
        });
      }
      if (t === "users") {
        pane.innerHTML = `<div class="tablewrap"><table class="plain"><tr><th>Member</th><th>Facility</th><th>Role</th><th></th></tr>
          ${d.users.map(u => `<tr data-id="${u.id}"><td><strong>${esc(u.name)}</strong><div class="small muted">${esc(u.email)} · ${esc(u.profession)}</div></td>
          <td>${esc(u.facility)}<div class="small muted">${esc(u.city)}</div></td>
          <td>${u.role === "admin" ? `<span class="chip primary">Admin</span>` : ""}${u.verified ? `<span class="chip ok">Verified</span>` : `<span class="chip">Unverified</span>`}</td>
          <td class="row"><button type="button" class="btn ghost sm" data-u="verify">${u.verified ? "Unverify" : "Verify"}</button><button type="button" class="btn ghost sm" data-u="role">${u.role === "admin" ? "Make member" : "Make admin"}</button><button type="button" class="btn ghost sm" data-u="susp">Suspend</button></td></tr>`).join("")}</table></div>`;
        pane.addEventListener("click", async (e) => {
          const b = e.target.closest("[data-u]"); if (!b) return;
          const id = b.closest("[data-id]").dataset.id, u = d.users.find(x => x.id === id);
          const patch = b.dataset.u === "verify" ? { verified: !u.verified } : b.dataset.u === "role" ? { role: u.role === "admin" ? "user" : "admin" } : { status: "suspended" };
          if (b.dataset.u === "susp" && !confirm("Suspend this member and end their sessions?")) return;
          try { await API.adminUser(id, patch); toast("Member updated."); render(); } catch (err) { toast(err.message, true); }
        });
      }
      if (t === "audit") {
        pane.innerHTML = `<div class="card"><div class="tablewrap"><table class="plain"><tr><th>When</th><th>Who</th><th>Action</th><th>Detail</th></tr>
          ${d.audit.map(a => `<tr><td class="small">${fmtDate(a.created_at)}</td><td class="small">${esc(a.full_name || "—")}</td><td class="small">${esc(a.action)}</td><td class="small muted">${esc(a.detail)}</td></tr>`).join("")}</table></div></div>`;
      }
      main.querySelectorAll(".tab").forEach(x => x.classList.toggle("active", x.dataset.tab === t));
    };
    main.querySelector(".tabs").addEventListener("click", e => { const b = e.target.closest("[data-tab]"); if (b) draw(b.dataset.tab); });
    draw(tab);
  }

  return { drugSection, account, community, admin };
};
