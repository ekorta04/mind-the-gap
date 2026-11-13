/* ==========================================================================
   MIND THE GAP · BACKEND PROPIO
   Sustituye a las capacidades de claude.ai con servicios tuyos:
   - Sincronización: Supabase (mismo proyecto y usuario que la app Finanzas),
     tabla public.mtg_state (ver supabase/mtg_state.sql).
   - IA: API de Gemini con tu propia clave (se guarda solo en este dispositivo).
   Expone window.claude.use(...) con la misma forma que usaba app.js,
   así la lógica de la app no cambia.
   ========================================================================== */
(function () {
  "use strict";

  const SUPABASE_URL = "https://humxabihxylctmrjspiw.supabase.co";
  const SUPABASE_KEY = "sb_publishable_xInkf8ehKMddG5C5c5oq5g__JwLGaeg";
  const TABLE = "mtg_state";
  const KEY_LS = "mtg-gemini-key";
  const MODEL_LS = "mtg-gemini-model";
  const MODELS = ["gemini-flash-latest", "gemini-3.5-flash", "gemini-2.5-flash"];

  let sb = null;
  try {
    if (window.supabase) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: "mtg-auth" }
    });
  } catch (e) { sb = null; }

  const ls = {
    get(k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } },
    set(k, v) { try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch (e) {} }
  };

  async function currentUser() {
    if (!sb) return null;
    try { const { data } = await sb.auth.getSession(); return (data && data.session && data.session.user) || null; }
    catch (e) { return null; }
  }

  /* ---------------- Sincronización (Supabase) ---------------- */
  const db = {
    doc() {
      return {
        async get() {
          const u = await currentUser(); if (!u) throw { code: "no_user" };
          const { data, error } = await sb.from(TABLE).select("data").eq("user_id", u.id).maybeSingle();
          if (error) throw error;
          return { exists: !!data, data: () => (data ? data.data : null) };
        },
        async set(obj) {
          const u = await currentUser(); if (!u) throw { code: "no_user" };
          const { error } = await sb.from(TABLE).upsert({ user_id: u.id, data: obj, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
          if (error) throw error;
        }
      };
    }
  };
  const user = { async id() { const u = await currentUser(); return u ? u.id : null; } };

  /* ---------------- IA (Gemini) ---------------- */
  function endpoint(model, stream) {
    return `https://generativelanguage.googleapis.com/v1beta/models/${model}:${stream ? "streamGenerateContent?alt=sse" : "generateContent"}`;
  }
  function textOf(resp) {
    const parts = (resp && resp.candidates && resp.candidates[0] && resp.candidates[0].content && resp.candidates[0].content.parts) || [];
    return parts.filter(p => !p.thought && typeof p.text === "string").map(p => p.text).join("");
  }
  function errFromStatus(status, body) {
    if (status === 400 && /api key|API_KEY/i.test(body)) return { code: "bad_key" };
    if (status === 401 || status === 403) return { code: "bad_key" };
    if (status === 404) return { code: "model_missing" };
    if (status === 429) return { code: "rate_limited" };
    return { code: "unavailable", status };
  }

  async function callGemini(prompt, opt, json) {
    const key = ls.get(KEY_LS);
    if (!key) throw { code: "no_key" };
    if (!navigator.onLine) throw { code: "offline" };
    const stream = !json && typeof opt.onText === "function";
    const body = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: Object.assign({ temperature: json ? 0.7 : 0.6 }, json ? { responseMimeType: "application/json" } : {})
    };
    const saved = ls.get(MODEL_LS);
    const order = saved ? [saved].concat(MODELS.filter(m => m !== saved)) : MODELS.slice();
    let lastErr = { code: "unavailable" };
    for (const model of order) {
      let res;
      try {
        res = await fetch(endpoint(model, stream), {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": key },
          body: JSON.stringify(body)
        });
      } catch (e) { throw { code: navigator.onLine ? "unavailable" : "offline" }; }
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        lastErr = errFromStatus(res.status, t);
        if (lastErr.code === "model_missing") continue;   // probar el siguiente modelo
        throw lastErr;
      }
      ls.set(MODEL_LS, model);
      if (!stream) {
        const out = textOf(await res.json());
        if (!json) return out;
        return parseJSON(out);
      }
      // streaming (SSE): va llamando a onText con el texto acumulado
      const reader = res.body.getReader(), dec = new TextDecoder();
      let buf = "", full = "";
      for (;;) {
        const { value, done } = await reader.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        let i;
        while ((i = buf.indexOf("\n")) >= 0) {
          const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
          if (!line.startsWith("data:")) continue;
          try { full += textOf(JSON.parse(line.slice(5))); opt.onText({ text: full }); } catch (e) {}
        }
      }
      return full;
    }
    throw lastErr;
  }
  function parseJSON(s) {
    const clean = String(s || "").trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    try { return JSON.parse(clean); } catch (e) {}
    const m = clean.match(/[\[{][\s\S]*[\]}]/);
    if (m) { try { return JSON.parse(m[0]); } catch (e) {} }
    throw { code: "invalid_json" };
  }
  const sample = (prompt, opt = {}) => callGemini(prompt, opt, false);
  sample.json = (prompt, opt = {}) => callGemini(prompt, opt, true);

  /* ---------------- Shim con la interfaz que espera app.js ---------------- */
  window.claude = {
    use(name) {
      if (name === "sample") return Promise.resolve(ls.get(KEY_LS) ? sample : null);
      if (name === "db") return Promise.resolve(sb ? db : null);
      if (name === "user") return Promise.resolve(sb ? user : null);
      return Promise.reject({ code: "unsupported" });   // tts: se usa la voz del sistema
    }
  };

  /* ---------------- Ajustes: cuenta y clave de Gemini ---------------- */
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  async function mountSettings(box) {
    if (!box) return;
    const u = await currentUser();
    const key = ls.get(KEY_LS);
    box.innerHTML = `
      <div class="stack" style="gap:6px"><b>Account &amp; sync</b>
        ${!sb ? `<p class="muted">Sync library not loaded. Progress is saved on this device.</p>` :
        u ? `<p class="muted">Signed in as <b>${esc(u.email || "")}</b>. Progress syncs between iPhone and computer (same account as Finanzas).</p>
             <div><button class="btn small" id="mtgOut">Sign out</button></div>` :
            `<p class="muted">Sign in with your Finanzas account to sync progress between devices.</p>
             <input class="answer" id="mtgEmail" type="email" autocomplete="username" placeholder="Email">
             <input class="answer" id="mtgPass" type="password" autocomplete="current-password" placeholder="Password">
             <div><button class="btn small" id="mtgIn">Sign in</button> <small class="muted" id="mtgMsg"></small></div>`}
      </div>
      <div class="stack" style="gap:6px"><b>AI (Gemini)</b>
        <p class="muted" style="font-size:.85rem">${key ? "Key saved on this device. Model: " + esc(ls.get(MODEL_LS) || "auto") : "Paste your free key from aistudio.google.com/apikey to enable writing marking, explanations and new content."}</p>
        <input class="answer" id="mtgKey" type="password" autocomplete="off" spellcheck="false" placeholder="${key ? "•••••••• (saved)" : "Gemini API key"}">
        <div class="row"><button class="btn small" id="mtgSaveKey">Save key</button>${key ? ` <button class="btn small" id="mtgTest">Test</button> <button class="btn small" id="mtgDelKey">Remove</button>` : ""}</div>
        <small class="muted" id="mtgKeyMsg"></small>
      </div>`;
    const $ = s => box.querySelector(s);
    const msg = (sel, t) => { const el = $(sel); if (el) el.textContent = t; };
    if ($("#mtgIn")) $("#mtgIn").onclick = async () => {
      msg("#mtgMsg", "Signing in…");
      const { error } = await sb.auth.signInWithPassword({ email: $("#mtgEmail").value.trim(), password: $("#mtgPass").value });
      if (error) return msg("#mtgMsg", error.message || "Couldn't sign in.");
      location.reload();
    };
    if ($("#mtgOut")) $("#mtgOut").onclick = async () => { try { await sb.auth.signOut(); } catch (e) {} location.reload(); };
    $("#mtgSaveKey").onclick = () => {
      const v = $("#mtgKey").value.trim();
      if (!v) return msg("#mtgKeyMsg", "Paste the key first.");
      ls.set(KEY_LS, v); ls.set(MODEL_LS, ""); location.reload();
    };
    if ($("#mtgDelKey")) $("#mtgDelKey").onclick = () => { ls.set(KEY_LS, ""); location.reload(); };
    if ($("#mtgTest")) $("#mtgTest").onclick = async () => {
      msg("#mtgKeyMsg", "Testing…");
      try { const r = await sample("Reply with exactly: Cheers, it works."); msg("#mtgKeyMsg", "✓ " + r.trim().slice(0, 60) + " (" + ls.get(MODEL_LS) + ")"); }
      catch (e) { msg("#mtgKeyMsg", window.MTG.errText(e)); }
    };
  }

  function errText(e) {
    const c = e && e.code;
    if (c === "no_key") return "AI is off: add your Gemini key in Settings.";
    if (c === "bad_key") return "Gemini rejected the key. Check it in Settings.";
    if (c === "offline") return "You're offline. AI needs an internet connection.";
    if (c === "rate_limited") return "Gemini's free limit was hit. Wait a minute and try again.";
    if (c === "model_missing") return "No available Gemini model found. Try again later.";
    if (c === "invalid_json") return "The AI reply came back malformed. Tap the button again.";
    return "AI isn't available right now. Try again in a moment.";
  }

  window.MTG = { mountSettings, errText, hasSync: !!sb };
})();
