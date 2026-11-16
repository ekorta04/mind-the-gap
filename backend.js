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
  // Orden de preferencia. Si uno no existe (404) o está saturado (503/429), se prueba el siguiente.
  const MODELS = ["gemini-flash-latest", "gemini-3.8-flash", "gemini-flash-lite-latest", "gemini-3.5-flash-lite"];
  const QUICK = ["gemini-flash-lite-latest", "gemini-flash-latest", "gemini-3.8-flash"];
  const TIMEOUT_MS = 60000, QUICK_TIMEOUT_MS = 20000;

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
    if (status === 500 || status === 503) return { code: "busy" };
    if (status === 400) { let m = ""; try { m = JSON.parse(body).error.message || ""; } catch (e) {} return { code: "bad_request", msg: m.slice(0, 160) }; }
    return { code: "unavailable", status };
  }

  async function callGemini(prompt, opt, json) {
    const key = ls.get(KEY_LS);
    if (!key) throw { code: "no_key" };
    if (!navigator.onLine) throw { code: "offline" };
    const stream = !json && typeof opt.onText === "function";
    const body = {
      contents: [{ role: "user", parts: (opt.video ? [{ file_data: { file_uri: opt.video } }] : []).concat([{ text: prompt }]).concat(opt.audio ? [{ inline_data: { mime_type: opt.audio.mime, data: opt.audio.data } }] : []).concat((opt.images || []).map(im => ({ inline_data: { mime_type: im.mime, data: im.data } }))) }],
      generationConfig: Object.assign({ temperature: json ? 0.7 : 0.6 }, json ? { responseMimeType: "application/json" } : {}, opt.video ? { mediaResolution: "MEDIA_RESOLUTION_LOW" } : {})
    };
    // Modelos que han fallado hace poco (saturados o lentos) se saltan durante 30 min
    const BRK = "mtg-gemini-skip";
    let skip = {}; try { skip = JSON.parse(ls.get(BRK) || "{}"); } catch (e) {}
    const now = Date.now();
    const bench = m => { skip[m] = now + 30 * 60000; ls.set(BRK, JSON.stringify(skip)); };
    const base = opt.modelTier === "quick" ? QUICK : MODELS;
    let order = base.filter(m => !(skip[m] > now));
    if (!order.length) order = base.slice();
    let lastErr = { code: "unavailable" };
    for (const model of order) {
      let res;
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), opt.timeoutMs || (opt.modelTier === "quick" ? QUICK_TIMEOUT_MS : TIMEOUT_MS));
      try {
        res = await fetch(endpoint(model, stream), {
          method: "POST", signal: ctl.signal,
          headers: { "Content-Type": "application/json", "x-goog-api-key": key.trim() },
          body: JSON.stringify(body)
        });
      } catch (e) {
        clearTimeout(timer);
        if (e && e.name === "AbortError") { lastErr = { code: "timeout" }; bench(model); continue; }
        throw { code: navigator.onLine ? "unavailable" : "offline" };
      }
      if (!res.ok) {
        clearTimeout(timer);
        const t = await res.text().catch(() => "");
        lastErr = errFromStatus(res.status, t);
        if (["model_missing", "busy", "rate_limited"].includes(lastErr.code)) { bench(model); continue; }   // probar el siguiente modelo
        throw lastErr;
      }
      ls.set(MODEL_LS, model);
      if (!stream) {
        const out = textOf(await res.json()); clearTimeout(timer);
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
      clearTimeout(timer);
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
  // Audio + texto (para Speaking): devuelve JSON
  // Vídeo público de YouTube (Gemini lo "ve" y lo escucha a partir del enlace): devuelve JSON
  sample.videoJSON = (prompt, url, opt = {}) => callGemini(prompt, Object.assign({ timeoutMs: 180000 }, opt, { video: url }), true);
  sample.audioJSON = (prompt, b64, mime, opt = {}) => callGemini(prompt, Object.assign({}, opt, { audio: { data: b64, mime } }), true);
  sample.json = (prompt, opt = {}) => callGemini(prompt, opt, true);
  // Fotos (redacción escrita a mano): se transcriben y corrigen en una sola petición
  sample.imagesJSON = (prompt, imgs, opt = {}) => callGemini(prompt, Object.assign({}, opt, { images: imgs }), true);

  /* ---------------- Voces naturales (Gemini TTS) ----------------
     Convierte un guion en audio con voces británicas naturales. Devuelve un Blob WAV.
     lines: [[speaker, text], ...] (máx. 2 hablantes). */
  const TTS_MODELS = ["gemini-3.1-flash-tts-preview", "gemini-2.5-flash-preview-tts"];
  const TTS_NAMES = [["Tom", "Charon"], ["Sarah", "Kore"]];
  function pcmToWav(b64, rate) {
    const bin = atob(b64), n = bin.length, buf = new ArrayBuffer(44 + n), v = new DataView(buf);
    const W = (o, t) => { for (let i = 0; i < t.length; i++) v.setUint8(o + i, t.charCodeAt(i)); };
    W(0, "RIFF"); v.setUint32(4, 36 + n, true); W(8, "WAVE"); W(12, "fmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); W(36, "data"); v.setUint32(40, n, true);
    const u8 = new Uint8Array(buf, 44); for (let i = 0; i < n; i++) u8[i] = bin.charCodeAt(i);
    return new Blob([buf], { type: "audio/wav" });
  }
  async function ttsLines(lines, opt = {}) {
    const key = ls.get(KEY_LS); if (!key) throw { code: "no_key" };
    if (!navigator.onLine) throw { code: "offline" };
    const spk = [...new Set(lines.map(l => l[0]))].slice(0, 2);
    const name = s => (TTS_NAMES[spk.indexOf(s)] || TTS_NAMES[0])[0];
    const multi = spk.length > 1;
    const style = opt.style || "Read this aloud as real British people from the south of England (London accents), speaking naturally and at a relaxed, conversational pace, like colleagues talking — not like presenters or a textbook.";
    const text = style + "\n\n" + lines.map(l => (multi ? name(l[0]) + ": " : "") + l[1]).join("\n");
    const speechConfig = multi
      ? { multiSpeakerVoiceConfig: { speakerVoiceConfigs: spk.map((s, i) => ({ speaker: TTS_NAMES[i][0], voiceConfig: { prebuiltVoiceConfig: { voiceName: TTS_NAMES[i][1] } } })) } }
      : { voiceConfig: { prebuiltVoiceConfig: { voiceName: opt.voice || "Charon" } } };
    let last = { code: "unavailable" };
    for (const model of TTS_MODELS) {
      const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 120000);
      try {
        const res = await fetch(endpoint(model, false), { method: "POST", signal: ctl.signal, headers: { "Content-Type": "application/json", "x-goog-api-key": key.trim() },
          body: JSON.stringify({ contents: [{ role: "user", parts: [{ text }] }], generationConfig: { responseModalities: ["AUDIO"], speechConfig } }) });
        clearTimeout(t);
        if (!res.ok) { const b = await res.text().catch(() => ""); last = errFromStatus(res.status, b); if (["model_missing", "busy", "rate_limited", "bad_request"].includes(last.code)) continue; throw last; }
        const j = await res.json();
        const part = ((j.candidates || [])[0] || {}).content?.parts?.find(p => p.inlineData || p.inline_data);
        const d = part && (part.inlineData || part.inline_data);
        if (!d || !d.data) { last = { code: "unavailable" }; continue; }
        const rate = +((/rate=(\d+)/.exec(d.mimeType || d.mime_type || "") || [])[1] || 24000);
        return pcmToWav(d.data, rate);
      } catch (e) { clearTimeout(t); if (e && e.code) { last = e; if (e.code === "bad_key") throw e; continue; } last = { code: e && e.name === "AbortError" ? "timeout" : (navigator.onLine ? "unavailable" : "offline") }; }
    }
    throw last;
  }
  // Caché de audios generados: se generan una vez y luego funcionan sin conexión
  const TTS_CACHE = "mtg-tts";
  async function cachedAudio(id, lines, opt) {
    const req = new Request("./tts-cache/" + encodeURIComponent(id) + ".wav");
    try { const c = await caches.open(TTS_CACHE); const hit = await c.match(req); if (hit) return await hit.blob(); } catch (e) {}
    const blob = await ttsLines(lines, opt);
    try { const c = await caches.open(TTS_CACHE); await c.put(req, new Response(blob, { headers: { "Content-Type": "audio/wav" } })); } catch (e) {}
    return blob;
  }
  async function hasCachedAudio(id) { try { const c = await caches.open(TTS_CACHE); return !!(await c.match(new Request("./tts-cache/" + encodeURIComponent(id) + ".wav"))); } catch (e) { return false; } }

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
    try { window.MTG_VERSION = ((await caches.keys()).find(k => /^mtg-v\d+$/.test(k)) || "").replace("mtg-", ""); } catch (e) {}
    box.innerHTML = `
      <div class="stack" style="gap:6px"><b>Account &amp; sync</b>
        ${!sb ? `<p class="muted">Sync library not loaded. Progress is saved on this device.</p>` :
        u ? `<p class="muted">Signed in as <b>${esc(u.email || "")}</b>. Progress syncs between iPhone and computer (same account as Finanzas).</p>
             <p class="muted" id="mtgSt" style="font-size:.85rem"></p>
             <div class="row"><button class="btn small" id="mtgNow">Sync now</button> <button class="btn small" id="mtgOut">Sign out</button></div>` :
            `<p class="muted">Sign in with your Finanzas account to sync progress between devices.</p>
             <input class="answer" id="mtgEmail" type="email" autocomplete="username" placeholder="Email">
             <input class="answer" id="mtgPass" type="password" autocomplete="current-password" placeholder="Password">
             <div><button class="btn small" id="mtgIn">Sign in</button> <small class="muted" id="mtgMsg"></small></div>`}
      </div>
      <div class="stack" style="gap:6px"><b>AI (Gemini)</b> <small class="muted">App ${esc(window.MTG_VERSION || "")}</small>
        <p class="muted" style="font-size:.85rem">${key ? "Key saved on this device. Model: " + esc(ls.get(MODEL_LS) || "auto") : "Paste your free key from aistudio.google.com/apikey to enable writing marking, explanations and new content."}</p>
        <input class="answer" id="mtgKey" type="password" autocomplete="off" spellcheck="false" placeholder="${key ? "•••••••• (saved)" : "Gemini API key"}">
        <div class="row"><button class="btn small" id="mtgSaveKey">Save &amp; test</button> <button class="btn small" id="mtgTest">Test</button>${key ? ` <button class="btn small" id="mtgDelKey">Remove</button>` : ""}</div>
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
    const paintSt = () => { const S = window.MTG_SYNC && window.MTG_SYNC.status(), el = $("#mtgSt"); if (!el || !S) return;
      const t = S.lastOk ? new Date(S.lastOk).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit", second:"2-digit"}) : "never";
      el.textContent = S.state === "error" ? "✗ Sync error: " + S.err + " (last OK: " + t + ")" : S.state === "synced" ? "✓ Synced · last check " + t + (S.dirty ? " · changes pending" : "") : S.state === "nologin" ? "✗ Session not active on this device: sign out and sign in again." : "Not connected yet. Tap Sync now."; };
    paintSt();
    if ($("#mtgNow")) $("#mtgNow").onclick = async () => { $("#mtgSt").textContent = "Syncing…"; try { await window.MTG_SYNC.now(); } catch (e) {} paintSt(); };
    if ($("#mtgOut")) $("#mtgOut").onclick = async () => { try { await sb.auth.signOut(); } catch (e) {} location.reload(); };
    $("#mtgSaveKey").onclick = async () => {
      const v = $("#mtgKey").value.replace(/\s+/g, "");
      if (!v) return msg("#mtgKeyMsg", "Paste the key first.");
      const r = await runTest(v);
      if (r.ok) { ls.set(KEY_LS, v); ls.set(MODEL_LS, r.model); ls.set("mtg-gemini-skip", ""); msg("#mtgKeyMsg", "✓ Key works and is saved (" + r.model + "). Reloading…"); setTimeout(() => location.reload(), 1200); }
    };
    if ($("#mtgDelKey")) $("#mtgDelKey").onclick = () => { ls.set(KEY_LS, ""); location.reload(); };
    $("#mtgTest").onclick = () => runTest($("#mtgKey").value.replace(/\s+/g, "") || ls.get(KEY_LS));
    // Prueba rápida y clara: cada modelo con 15 s como máximo, y dice exactamente qué ha pasado
    async function runTest(k) {
      if (!k) { msg("#mtgKeyMsg", "There's no key on this device yet. Paste it above and tap Save & test."); return {ok:false}; }
      if (!navigator.onLine) { msg("#mtgKeyMsg", "You're offline. Connect to the internet and try again."); return {ok:false}; }
      const log = [];
      for (const model of ["gemini-flash-lite-latest", "gemini-flash-latest", "gemini-3.8-flash"]) {
        msg("#mtgKeyMsg", "Testing " + model + "…");
        const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 15000);
        try {
          const res = await fetch(endpoint(model, false), { method:"POST", signal:ctl.signal, headers:{ "Content-Type":"application/json", "x-goog-api-key":k },
            body: JSON.stringify({ contents:[{ role:"user", parts:[{ text:"Reply with exactly: Cheers, it works." }] }] }) });
          clearTimeout(t);
          const txt = await res.text();
          if (res.ok) { let out = ""; try { out = textOf(JSON.parse(txt)); } catch (e) {} msg("#mtgKeyMsg", "✓ " + (out.trim().slice(0, 40) || "OK") + " — " + model); return {ok:true, model}; }
          let m = ""; try { m = JSON.parse(txt).error.message; } catch (e) {}
          log.push(model + ": " + res.status + (m ? " " + m.slice(0, 90) : ""));
          if (res.status === 400 || res.status === 401 || res.status === 403) break;   // problema de la clave: no hace falta probar más modelos
        } catch (e) { clearTimeout(t); log.push(model + ": " + (e && e.name === "AbortError" ? "no answer in 15 s" : "network error")); }
      }
      msg("#mtgKeyMsg", "✗ " + log.join(" · "));
      return {ok:false};
    }
  }

  function errText(e) {
    const c = e && e.code;
    if (c === "no_key") return "AI is off: add your Gemini key in Settings.";
    if (c === "bad_key") return "Gemini rejected the key. Check it in Settings.";
    if (c === "offline") return "You're offline. AI needs an internet connection.";
    if (c === "rate_limited") return "Gemini's free limit was hit. Wait a minute and try again.";
    if (c === "model_missing") return "No available Gemini model found. Try again later.";
    if (c === "busy") return "Gemini is overloaded right now. Try again in a minute.";
    if (c === "timeout") return "Gemini took too long to answer. Try again.";
    if (c === "bad_request") return "Gemini couldn't process that" + (e.msg ? ": " + e.msg : ".") + "";
    if (c === "invalid_json") return "The AI reply came back malformed. Tap the button again.";
    return "AI isn't available right now. Try again in a moment.";
  }

  window.MTG = { mountSettings, errText, hasSync: !!sb, cachedAudio, hasCachedAudio, hasKey: () => !!ls.get(KEY_LS) };
})();
