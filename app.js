/* ===================== Mind the Gap — app ===================== */
(() => {
"use strict";

/* ---------- tiny helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const norm = (s) => String(s || "").toLowerCase().replace(/[’‘`´]/g, "'").replace(/[“”]/g, '"').replace(/[.,!?;:"]+$/g, "").replace(/\s+/g, " ").trim();
const pad = (n) => String(n).padStart(2, "0");
const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (k, n) => { const [y, m, d] = k.split("-").map(Number); const dt = new Date(y, m - 1, d + n); return dayKey(dt); };
const dayIdx = () => Math.floor(new Date(dayKey() + "T12:00:00").getTime() / 864e5);
const words = (s) => (String(s).trim().match(/\S+/g) || []).length;

/* ---------- icons ---------- */
const I = {
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v6.5M12 15.5V22M2 12h6.5M15.5 12H22"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="4"/><path d="M8 10v4M6 12h4"/><circle cx="16" cy="11" r="1" fill="currentColor"/><circle cx="18" cy="13.5" r="1" fill="currentColor"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5.5C5 4.5 8.5 4.5 12 6.5c3.5-2 7-2 9-1V19c-2-1-5.5-1-9 1-3.5-2-7-2-9-1z"/><path d="M12 6.5V20"/></svg>',
  ear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="2.5" y="14" width="5" height="7" rx="2"/><rect x="16.5" y="14" width="5" height="7" rx="2"/></svg>',
  pen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>',
  cards:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="13" height="14" rx="2.5"/><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h8A2.5 2.5 0 0 1 21 5.5v10a2.5 2.5 0 0 1-2.5 2.5H16"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  flame:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 3.5 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.2 1.6 1 2.5 2 2.5-1-3 0-6 1-9z"/></svg>',
  bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
  speaker:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
  stop:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
  sparkle:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.6L19.5 9l-5.7 1.6L12 16l-1.8-5.4L4.5 9l5.7-1.4zM19 15l.9 2.4 2.1.6-2.1.8L19 21l-.9-2.2-2.1-.8 2.1-.6z"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  slow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/></svg>',
  mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>'
};
const MARK = '<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M3 22h8M21 22h8" stroke="var(--navy)" stroke-width="4" stroke-linecap="round"/><path d="M6 13c3-6 17-6 20 0" fill="none" stroke="var(--red)" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="0.1 5.4"/><circle cx="26" cy="13" r="3" fill="var(--red)"/><circle cx="6" cy="13" r="3" fill="var(--navy)"/></svg>';

/* ---------- catalogue ---------- */
const TYPES = {
  wf:{name:"Word Formation", part:"Use of English · Part 3", c:"var(--red)", skill:"uoe", desc:"Change the word in capitals so it fits the gap. Prefixes, suffixes, spelling."},
  kwt:{name:"Key Word Transformation", part:"Use of English · Part 4", c:"var(--red)", skill:"uoe", desc:"Rewrite the sentence with the key word, 3–6 words. The hardest part of the exam."},
  oc:{name:"Open Cloze", part:"Use of English · Part 2", c:"var(--red)", skill:"uoe", desc:"One word per gap: prepositions, inversions, linkers, phrasal verbs."},
  mc:{name:"Collocation Cloze", part:"Use of English · Part 1", c:"var(--red)", skill:"uoe", desc:"Pick the word that collocates. Natural, native-sounding English."},
  err:{name:"Error Hunt", part:"Grammar & false friends", c:"var(--amber)", skill:"grammar", desc:"Tap the mistake a Spanish speaker would make, then fix it."},
  spell:{name:"Spelling Dictation", part:"Spelling · British English", c:"var(--plum)", skill:"spelling", desc:"Hear it in a British voice, type it. Tricky words and UK spellings."},
  pv:{name:"Phrasal Verbs", part:"Vocabulary · Choose the right one", c:"var(--teal, #0E7C86)", skill:"vocab", desc:"The phrasal verbs Brits use all day at work. Pick the one that fits the gap."},
  gram:{name:"Grammar Flash", part:"Grammar · C1/C2 structures", c:"var(--purple, #6B3FA0)", skill:"grammar", desc:"Inversion, conditionals, wish, modals in the past… one gap, four options, ten seconds."},
  work:{name:"Work English", part:"Vocabulary · Project & maintenance", c:"var(--green)", skill:"vocab", desc:"The English of site walks, clients, suppliers and shutdowns. Learn it once, use it on Monday."},
  idioms:{name:"Idiom Quickfire", part:"Fluency · 60-second sprint", c:"var(--navy)", skill:"vocab", desc:"Against the clock, only with idioms you have already got right. Learn new ones without the clock first."},
  mock:{name:"Use of English Block", part:"Timed practice · Parts 1–4", c:"var(--ink)", skill:"uoe", desc:"30 questions in exam order (8, 8, 8, 6) with a 35-minute clock. It trains you; only official papers measure you."}
};
const SKILLS = {uoe:{n:"Use of English", c:"var(--red)"}, reading:{n:"Reading", c:"var(--navy)"}, listening:{n:"Listening", c:"var(--green)"}, writing:{n:"Writing", c:"var(--amber)"}, grammar:{n:"Grammar", c:"var(--amber)"}, spelling:{n:"Spelling", c:"var(--plum)"}, vocab:{n:"Vocabulary", c:"var(--navy)"}, speaking:{n:"Speaking", c:"var(--red)"}};
const LEVELS = [{n:"B2", xp:0}, {n:"B2+", xp:1500}, {n:"C1", xp:4000}, {n:"C1+", xp:8000}, {n:"C2", xp:14000}, {n:"C2+", xp:22000}];
const INTERESTS = ["Formula 1 and motorsport", "major engineering works", "project management", "aeronautics", "industrial maintenance", "technology", "sport"];
// Repaso espaciado sencillo: al fallar vuelve a 1 día; al acertar 1, 3, 7, 16 y 35 días
const INTERVALS = [0, 1, 3, 7, 16, 35];

/* ---------- state ---------- */
const LS_KEY = "mtg-state-v1";
const blank = () => ({v:1, xp:0, streak:0, best:0, lastActive:null, days:{}, stats:{}, seen:{}, deck:[], read:{}, listen:{}, writings:[], ai:{}, aiArticles:[], aiListening:[], settings:{rate:0.95, voice:"", goal:300, tips:true, examDate:"", produce:true}, c1:{}, bad:{}, pb:[], updatedAt:0});
let S = blank();
try { const raw = localStorage.getItem(LS_KEY); if (raw) S = Object.assign(blank(), JSON.parse(raw)); } catch (e) {}
S.settings = Object.assign(blank().settings, S.settings || {});
S.deck.forEach(c => { if (c.box > INTERVALS.length - 1) c.box = INTERVALS.length - 1; });

let DB = null, DOC = null, SAMPLE = null, TTSCAP = null, syncState = "local";
let saveTimer = null, saving = false, saveAgain = false, syncErr = "", lastOk = 0;

let dirty = false; try { dirty = localStorage.getItem("mtg-dirty") === "1"; } catch (e) {}
const setDirty = (v) => { dirty = v; try { localStorage.setItem("mtg-dirty", v ? "1" : ""); } catch (e) {} };
// Copia de seguridad local diaria, por si algo va mal al sincronizar
try { const k = new Date().toDateString(); if (localStorage.getItem("mtg-bk-day") !== k) { const raw = localStorage.getItem(LS_KEY); if (raw) { localStorage.setItem("mtg-state-bk2", localStorage.getItem("mtg-state-bk") || ""); localStorage.setItem("mtg-state-bk", raw); } localStorage.setItem("mtg-bk-day", k); } } catch (e) {}
function save() {
  S.updatedAt = Date.now();
  try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {}
  setDirty(true);
  clearTimeout(saveTimer);
  saveTimer = setTimeout(pushRemote, 1500);
}
const tomb = (key) => { (S.del = S.del || {})[key] = Date.now(); };
/* Fusiona en S el estado de la nube (R) sin perder lo hecho en ninguno de los dos dispositivos.
   Antes ganaba entero el último en guardar, y una pestaña abierta en otro aparato podía borrar el trabajo del día. */
function mergeState(R) {
  if (!R || typeof R !== "object") return;
  const newer = (R.updatedAt || 0) > (S.updatedAt || 0);
  const del = Object.assign({}, R.del || {}); for (const k in S.del || {}) del[k] = Math.max(del[k] || 0, S.del[k]);
  const uni = (A, B, key) => { const ks = new Set(A.map(key)); (B || []).forEach(x => { const k = key(x); if (!ks.has(k)) { A.push(x); ks.add(k); } }); return A; };
  S.xp = Math.max(S.xp || 0, R.xp || 0); S.best = Math.max(S.best || 0, R.best || 0); S.mockBest = Math.max(S.mockBest || 0, R.mockBest || 0);
  if ((R.lastActive || "") > (S.lastActive || "")) { S.lastActive = R.lastActive; S.streak = R.streak || 0; }
  else if (R.lastActive && R.lastActive === S.lastActive) S.streak = Math.max(S.streak || 0, R.streak || 0);
  for (const k in R.days || {}) { const a = S.days[k], b = R.days[k]; if (!a) S.days[k] = b; else { a.xp = Math.max(a.xp || 0, b.xp || 0); a.min = Math.max(a.min || 0, b.min || 0); a.done = Object.assign({}, b.done, a.done); a.goalHit = a.goalHit || b.goalHit; } }
  for (const k in R.stats || {}) if (!S.stats[k] || (R.stats[k].n || 0) > (S.stats[k].n || 0)) S.stats[k] = R.stats[k];
  for (const k in R.seen || {}) if (S.seen[k] === undefined || newer) S.seen[k] = R.seen[k];
  ["read", "listen", "speak"].forEach(f => { const A = S[f] || (S[f] = {}), B = R[f] || {}; for (const k in B) if (!A[k] || (B[k].at || B[k].date || "") > (A[k].at || A[k].date || "")) A[k] = B[k]; });
  const byId = new Map(S.deck.map(c => [c.id, c]));
  (R.deck || []).forEach(c => { const a = byId.get(c.id); if (!a) S.deck.push(c); else if ((c.u || 0) > (a.u || 0) || (!c.u && !a.u && newer)) Object.assign(a, c); });
  S.deck = S.deck.filter(c => !((del["d:" + c.id] || 0) > (c.u || 0)));
  uni(S.writings, R.writings, w => w.task + "|" + w.date + "|" + (w.fb ? w.fb.total : ""));
  (R.writings || []).forEach(b => { if (b.rw) { const a = S.writings.find(w => w.task === b.task && w.date === b.date && w.rw === null); if (a) { a.rw = b.rw; a.rwFixed = b.rwFixed; } } });
  S.writings.sort((x, y) => x.date < y.date ? -1 : x.date > y.date ? 1 : 0);
  uni(S.aiArticles, R.aiArticles, x => x.id); uni(S.aiListening, R.aiListening, x => x.id);
  for (const t in R.ai || {}) uni(S.ai[t] || (S.ai[t] = []), R.ai[t], x => x._id);
  S.mocks = uni(S.mocks || [], R.mocks, m => m.d + "|" + m.r);
  S.pb = uni(S.pb || [], R.pb, e => e.id).filter(e => !del["p:" + e.id]);
  S.bad = Object.assign(S.bad || {}, R.bad || {});
  for (const t in S.ai) S.ai[t] = S.ai[t].filter(x => !S.bad[x._id]);
  const a = S.c1 || (S.c1 = {}), b = R.c1 || {}; a.pts = a.pts || {}; a.mocks = a.mocks || []; a.week = a.week || {};
  for (const k in b.pts || {}) if (!a.pts[k]) a.pts[k] = b.pts[k];
  a.mocks = uni(a.mocks, b.mocks, m => m.id).filter(m => !del["m:" + m.id]);
  if (b.start && (!a.start || b.start < a.start)) a.start = b.start;
  a.diagDone = a.diagDone || b.diagDone; a.humanMarked = a.humanMarked || b.humanMarked;
  if ((b.human || "") > (a.human || "")) a.human = b.human;
  if ((b.focusDay || "") > (a.focusDay || "")) { a.focusDay = b.focusDay; a.focusPt = b.focusPt; }
  a.talks = Math.max(a.talks || 0, b.talks || 0); a.p2 = Math.max(a.p2 || 0, b.p2 || 0);
  if (newer) { if (b.week) a.week = b.week; a.pendingMark = b.pendingMark || null; S.settings = Object.assign(blank().settings, S.settings || {}, R.settings || {}); }
  for (const k in R) if (S[k] === undefined) S[k] = R[k];
  S.del = del;
}
let lastStamp = null, lastPull = 0;
// Trae el estado de la nube y lo fusiona. Devuelve true si había algo nuevo.
async function pullRemote(force) {
  if (!DOC || saving || (!force && Date.now() - lastPull < 15000)) return false;
  lastPull = Date.now();
  try {
    const snap = await DOC.get(), d = snap && snap.exists ? snap.data() : null;
    if (!d || !d.s) { if (S.updatedAt) pushRemote(); return false; }
    if (d.updatedAt === lastStamp) { syncState = "synced"; syncErr = ""; lastOk = Date.now(); paintSync(); return false; }
    const localNewer = (S.updatedAt || 0) > (d.updatedAt || 0);   // p. ej. trabajo hecho sin conexión que nunca llegó a subirse
    mergeState(JSON.parse(d.s)); lastStamp = d.updatedAt; if (localNewer) setDirty(true);
    S.deck.forEach(c => { if (c.box > INTERVALS.length - 1) c.box = INTERVALS.length - 1; });
    if (dirty) { S.updatedAt = Date.now(); try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {} pushRemote(); }
    else { S.updatedAt = Math.max(S.updatedAt || 0, d.updatedAt || 0); try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {} syncState = "synced"; }
    paintChips(); paintSync(); return true;
  } catch (e) { syncState = "error"; syncErr = errMsg(e); paintSync(); return false; }
}
function errMsg(e) { return (e && (e.message || e.code || e.details)) ? String(e.message || e.code || e.details).slice(0, 140) : "unknown error"; }
function trimState() {
  if (S.deck.length > 600) S.deck = S.deck.slice(-600);
  if (S.pb && S.pb.length > 400) S.pb = S.pb.slice(-400);
  if (S.del) { const ks = Object.keys(S.del); if (ks.length > 500) ks.sort((x, y) => S.del[x] - S.del[y]).slice(0, ks.length - 500).forEach(k => delete S.del[k]); }
  if (S.aiArticles.length > 8) S.aiArticles = S.aiArticles.slice(-8);
  if (S.aiListening.length > 8) S.aiListening = S.aiListening.slice(-8);
  for (const k in S.ai) if (S.ai[k].length > 60) S.ai[k] = S.ai[k].slice(-60);
  if (S.writings.length > 30) S.writings = S.writings.slice(-30);
  if (S.c1 && S.c1.mocks && S.c1.mocks.length > 40) S.c1.mocks = S.c1.mocks.slice(-40);
  const dk = Object.keys(S.days).sort(); if (dk.length > 400) for (const k of dk.slice(0, dk.length - 400)) delete S.days[k];
}
async function pushRemote() {
  if (!DOC) return;
  if (saving) { saveAgain = true; return; }
  saving = true;
  try {
    // Si otro dispositivo ha guardado desde nuestra última lectura, fusionar antes de escribir
    const snap = await DOC.get(), d = snap && snap.exists ? snap.data() : null;
    if (d && d.s && d.updatedAt !== lastStamp) { mergeState(JSON.parse(d.s)); S.updatedAt = Date.now(); paintChips(); }
    trimState();
    let s = JSON.stringify(S);
    if (s.length > 230000) { S.writings.forEach(w => { w.text = (w.text || "").slice(0, 1500); w.fb && (w.fb.improved = ""); }); S.aiArticles = S.aiArticles.slice(-3); s = JSON.stringify(S); }
    try { localStorage.setItem(LS_KEY, s); } catch (e) {}
    await DOC.set({s, updatedAt:S.updatedAt});
    lastStamp = S.updatedAt; syncState = "synced"; syncErr = ""; lastOk = Date.now(); if (!saveAgain) setDirty(false);
  } catch (e) { syncState = "error"; syncErr = errMsg(e); }
  saving = false; paintSync();
  if (saveAgain) { saveAgain = false; pushRemote(); }
}
function paintSync() {
  const el = $("#sync"); if (!el) return;
  el.title = syncState === "synced" ? "Progress synced across your devices" : syncState === "error" ? "Sync failed — saved on this device" : syncState === "nologin" ? "Not signed in — NOT syncing with your other devices" : "Saved on this device";
  el.style.color = syncState === "synced" ? "var(--green)" : syncState === "error" ? "var(--red)" : syncState === "nologin" ? "var(--amber, #e5a50a)" : "var(--muted)";
}
// Estado y sincronización manual, usados desde Ajustes
window.MTG_SYNC = {
  status: () => ({ state: syncState, err: syncErr, lastOk, dirty, signedIn: !!DOC }),
  async now() { if (!DOC) return false; clearTimeout(saveTimer); lastPull = 0; const ch = await pullRemote(true); if (dirty || !ch) await pushRemote(); const h = location.hash.slice(1); if (!h || ["today", "practice", "progress", "review", "phrases"].includes(h)) route(); return syncState === "synced"; }
};

/* ---------- day, xp, streak ---------- */
const today = () => { const k = dayKey(); if (!S.days[k]) S.days[k] = {xp:0, done:{}, min:0}; return S.days[k]; };
function addXP(n) {
  if (!n) return;
  S.xp += n; const d = today(); d.xp += n;
  const k = dayKey();
  if (d.xp >= 30 && S.lastActive !== k) {
    S.streak = S.lastActive === addDays(k, -1) ? S.streak + 1 : 1;
    S.lastActive = k; S.best = Math.max(S.best || 0, S.streak);
    toast(`Streak: ${S.streak} day${S.streak > 1 ? "s" : ""}. Keep the line running.`);
  }
  if (d.xp >= S.settings.goal && !d.goalHit) { d.goalHit = true; setTimeout(() => { confetti(); toast("Daily goal reached. Brilliant work!"); }, 400); }
  paintChips(); save();
}
function liveStreak() { const k = dayKey(); return (S.lastActive === k || S.lastActive === addDays(k, -1)) ? S.streak : 0; }
function level() { let i = 0; LEVELS.forEach((l, j) => { if (S.xp >= l.xp) i = j; }); return i; }
function record(skill, ok) { const s = S.stats[skill] || (S.stats[skill] = {h:[], n:0}); s.h.push(ok ? 1 : 0); if (s.h.length > 80) s.h.shift(); s.n++; }
function acc(skill) { const s = S.stats[skill]; if (!s || !s.h.length) return null; return s.h.reduce((a, b) => a + b, 0) / s.h.length; }
function scale(skill) { const a = acc(skill); const s = S.stats[skill]; if (a == null || s.h.length < 8) return null; return Math.round(Math.min(230, Math.max(150, 158 + a * 72))); }
const scaleLabel = (n) => n == null ? "—" : n >= 200 ? "C2" : n >= 180 ? "C1" : n >= 160 ? "B2" : "B1";

/* ---------- spaced repetition deck ---------- */
function addCard(card) {
  const id = card.id || (card.k + ":" + norm(card.f).slice(0, 60));
  const ex = S.deck.find(c => c.id === id);
  if (S.del) delete S.del["d:" + id];
  if (ex) { ex.box = 0; ex.due = dayKey(); ex.lapses = (ex.lapses || 0) + 1; ex.u = Date.now(); save(); return false; }
  S.deck.push(Object.assign({id, box:0, due:dayKey(), added:dayKey(), u:Date.now()}, card)); save(); return true;
}
const dueCards = () => S.deck.filter(c => c.due <= dayKey());
function grade(card, ok) {
  card.box = ok ? Math.min(card.box + 1, INTERVALS.length - 1) : 0;
  if (!ok) card.lapses = (card.lapses || 0) + 1;
  let due = addDays(dayKey(), ok ? INTERVALS[card.box] : 1);
  const cap = addDays(examDate(), -3);   // todo vuelve a salir antes del examen
  if (due > cap && cap > dayKey()) due = cap;
  card.due = due; card.u = Date.now(); save();
}

/* ---------- items (bank + AI-generated) ---------- */
function pool(type) {
  const bank = (BANK[type] || []).map((it, i) => Object.assign({_id:type + "-" + i, _t:type}, it));
  const ai = (S.ai[type] || []).map(it => Object.assign({_t:type}, it));
  const bad = S.bad || {};
  return bank.concat(PT_ITEMS.filter(x => x._t === type), ai).filter(x => !bad[x._id]);
}
function findItem(type, id) { return pool(type).find(x => x._id === id); }
function pickItems(type, n) {
  const pts = c1s().pts, all = pool(type).filter(x => !x.pt || pts[x.pt]);   // un punto del temario no sale hasta que se ha presentado
  const unseen = shuffle(all.filter(x => !S.seen[x._id]));
  const failed = shuffle(all.filter(x => S.seen[x._id] === -1));
  const rest = shuffle(all.filter(x => S.seen[x._id] === 1));
  return unseen.concat(failed, rest).slice(0, n);
}
function poolProgress(type) { const all = pool(type); const done = all.filter(x => S.seen[x._id] === 1).length; return {done, total:all.length}; }

/* ---------- speech (British voice) ---------- */
// Calidad de la voz: en iPhone el nombre no lo dice, pero el voiceURI sí (…premium… / …enhanced… / …compact…)
function voiceQ(v) {
  const id = ((v && v.name) || "") + " " + ((v && v.voiceURI) || "");
  if (/premium/i.test(id)) return {score:3, label:"Premium"};
  if (/natural|neural|online/i.test(id)) return {score:3, label:"Natural"};
  if (/enhanced|siri/i.test(id)) return {score:2, label:"Enhanced"};
  if (/google/i.test(id)) return {score:1.5, label:""};
  return {score:1, label:""};
}
// La voz elegida se guarda por dispositivo (iPhone y PC tienen voces distintas)
const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
function myVoice() { try { return localStorage.getItem("mtg-voice") || ""; } catch (e) { return ""; } }
function setMyVoice(x) { try { localStorage.setItem("mtg-voice", x); } catch (e) {} }
const TTS = {
  list: [], token: 0, speaking: false,
  init() {
    if (!("speechSynthesis" in window)) return;
    const load = () => {
      const all = speechSynthesis.getVoices();
      let gb = all.filter(v => /en[-_]GB/i.test(v.lang));
      const rank = v => -voiceQ(v).score + (/google uk/i.test(v.name) ? -0.2 : 0) + (/novelty|whisper|bad news|bells|grandpa|grandma|jester|organ|bubbles|trinoids|zarvox|albert|superstar|wobble|boing|cellos|good news|eloquence|rocko|sandy|shelley|flo|reed/i.test(v.name + " " + v.voiceURI) ? 5 : 0);
      gb.sort((a, b) => rank(a) - rank(b));
      this.list = gb;
      if (location.hash.startsWith("#listen") || $("#voiceSel")) paintVoiceSel();
    };
    load(); speechSynthesis.addEventListener?.("voiceschanged", load);
  },
  voice(i = 0) {
    if (!this.list.length) return null;
    const mine = myVoice(); if (mine === "system" || (!mine && isIOS() && i === 0)) return null;
    let base = this.list.findIndex(v => v.name === mine || v.voiceURI === mine); if (base < 0) base = 0;
    return this.list[(base + i) % this.list.length];
  },
  chunks(text) { return (String(text).match(/[^.!?]+[.!?]+["')\]]*|\S[^.!?]*$/g) || [text]).map(s => s.trim()).filter(Boolean); },
  // iPhone/iPad: el audio web respeta el interruptor de silencio salvo que la sesión sea "playback",
  // y la primera locución tiene que salir de un toque del usuario. unlock() se llama en el primer toque.
  unlocked: false, keep: [],
  unlock() {
    try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (e) {}
    if (this.unlocked || !("speechSynthesis" in window)) return;
    this.unlocked = true;
    try { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; u.lang = "en-GB"; speechSynthesis.speak(u); } catch (e) {}
  },
  async speak(text, opt = {}) {
    const my = ++this.token;
    this.unlock();
    if ("speechSynthesis" in window) {
      try {
        if (speechSynthesis.speaking || speechSynthesis.pending) { speechSynthesis.cancel(); await new Promise(r => setTimeout(r, 120)); }  // WebKit pierde la locución si se hace speak() justo después de cancel()
        if (speechSynthesis.paused) speechSynthesis.resume();
      } catch (e) {}
      if (!this.list.length) { try { this.list = speechSynthesis.getVoices().filter(v => /en[-_]GB/i.test(v.lang)); } catch (e) {} }
    }
    const rate = (opt.rate || S.settings.rate) * (opt.slow ? 0.75 : 1);
    if ("speechSynthesis" in window && (this.list.length || !TTSCAP)) {
      this.speaking = true;
      let started = false;
      const watchdog = setTimeout(() => { if (!started && my === this.token) toast("No sound? Check the volume and the silent switch on the side of your iPhone."); }, 2500);
      for (const part of this.chunks(text)) {
        if (my !== this.token) break;
        await new Promise(res => {
          const u = new SpeechSynthesisUtterance(part);
          u.lang = "en-GB"; const v = this.voice(opt.voice || 0); if (v) u.voice = v;
          u.rate = rate; u.pitch = opt.pitch || 1; u.volume = 1;
          u.onstart = () => { started = true; };
          u.onend = u.onerror = () => { this.keep = this.keep.filter(x => x !== u); res(); };
          this.keep.push(u);   // evita que Safari la descarte antes de terminar
          speechSynthesis.speak(u);
          setTimeout(res, 20000 + part.length * 120);
        });
      }
      clearTimeout(watchdog);
      if (my === this.token) this.speaking = false;
      return my === this.token;
    }
    if (TTSCAP) {
      try { this.speaking = true; await TTSCAP.speak(text, {rate:Math.min(1.5, Math.max(0.7, rate)), language:"en", voice:(opt.voice || 0) % 2 ? "glassy" : "buttery"}); this.speaking = false; return my === this.token; }
      catch (e) { this.speaking = false; return false; }
    }
    toast("No English voice found on this device. Check Settings.");
    return false;
  },
  stop() { this.token++; this.speaking = false; try { speechSynthesis.cancel(); } catch (e) {} try { TTSCAP?.stop(); } catch (e) {} }
};

/* ---------- AI (Gemini, via backend.js) ---------- */
const aiOn = () => !!SAMPLE;
function aiErr(e) { return window.MTG ? window.MTG.errText(e) : "AI isn't available right now."; }
async function ai(prompt, opt = {}) { if (!SAMPLE) throw {code:"unavailable"}; aiTick(); return SAMPLE(prompt, opt); }
async function aiJSON(prompt, opt = {}) { if (!SAMPLE) throw {code:"unavailable"}; aiTick(); return SAMPLE.json(prompt, opt); }
const LEARNER = "The learner is a Spanish native speaker at B2 level preparing the paper-based Cambridge C1 Advanced exam, British English. Weakest areas: Writing, and grammar and vocabulary (Use of English). Interests: Formula 1, major engineering works, project management, aeronautics, industrial maintenance, technology and sport.";

/* ---------- toast & confetti ---------- */
let toastT;
function toast(msg) {
  let t = $("#toast"); if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.append(t); }
  t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 2800);
}
function confetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("canvas"); c.className = "confetti"; document.body.append(c);
  const ctx = c.getContext("2d"); const W = c.width = innerWidth, H = c.height = innerHeight;
  const cs = getComputedStyle(document.documentElement); const cols = ["--red", "--navy", "--green", "--amber", "--plum"].map(v => cs.getPropertyValue(v).trim());
  const P = Array.from({length:120}, () => ({x:W / 2, y:H * 0.35, vx:(Math.random() - 0.5) * 14, vy:Math.random() * -14 - 4, r:Math.random() * 6 + 3, c:cols[Math.floor(Math.random() * 5)], a:Math.random() * 6}));
  let f = 0; (function tick() { ctx.clearRect(0, 0, W, H); P.forEach(p => { p.vy += 0.45; p.x += p.vx; p.y += p.vy; p.a += 0.2; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); ctx.restore(); }); if (++f < 110) requestAnimationFrame(tick); else c.remove(); })();
}

/* ---------- shell ---------- */
const NAV = [
  {id:"today", n:"Today", i:"home", c:"var(--red)"},
  {id:"practice", n:"Games", i:"play", c:"var(--red)"},
  {id:"read", n:"Read", i:"book", c:"var(--navy)"},
  {id:"listen", n:"Listen", i:"ear", c:"var(--green)"},
  {id:"write", n:"Write", i:"pen", c:"var(--amber)"},
  {id:"speak", n:"Speak", i:"mic", c:"var(--red)"},
  {id:"review", n:"Review", i:"cards", c:"var(--plum)"}
];
function shell() {
  document.getElementById("root").innerHTML = `
  <div class="app">
    <header class="top"><div class="top-in">
      <button class="brand" id="brand" aria-label="Mind the Gap, go to Today">${MARK}<span>Mind the Gap</span></button>
      <div class="chips">
        <span class="chip flame" id="chipStreak" title="Day streak">${I.flame}<span class="mono">0</span></span>
        <span class="chip xp" id="chipXP" title="Total XP">${I.bolt}<span class="mono">0</span></span>
        <button class="icon-btn" id="btnPhrases" aria-label="Phrasebook" title="Phrasebook">${I.search}</button>
        <button class="icon-btn" id="btnProgress" aria-label="Progress">${I.chart}</button>
        <button class="icon-btn" id="btnSettings" aria-label="Settings"><span id="sync">${I.gear}</span></button>
      </div>
    </div></header>
    <nav class="nav" aria-label="Sections">${NAV.map(n => `<button data-nav="${n.id}" style="--c:${n.c}">${I[n.i]}<span>${n.n}</span></button>`).join("")}</nav>
    <main id="main" tabindex="-1"></main>
  </div>`;
  $$(".nav button").forEach(b => b.onclick = () => go(b.dataset.nav));
  $("#brand").onclick = () => go("today");
  $("#btnProgress").onclick = () => go("progress");
  $("#btnPhrases").onclick = () => go("phrases");
  $("#btnSettings").onclick = settingsSheet;
  paintChips(); paintSync();
}
function paintChips() {
  const s = $("#chipStreak .mono"), x = $("#chipXP .mono");
  if (s) s.textContent = liveStreak(); if (x) x.textContent = S.xp.toLocaleString("en-GB");
}
function go(h) { if (location.hash === "#" + h) route(); else location.hash = h; }
let cleanup = null;
function route() {
  TTS.stop(); closePop(); $$("audio").forEach(a => { try { a.pause(); } catch (e) {} }); if (cleanup) { try { cleanup(); } catch (e) {} cleanup = null; }
  const h = (location.hash || "#today").slice(1) || "today";
  const main = $("#main"); main.innerHTML = "";
  const sec = h.split("-")[0];
  $$(".nav button").forEach(b => b.setAttribute("aria-current", (b.dataset.nav === sec || (sec === "play" && b.dataset.nav === "practice") || (sec === "real" && b.dataset.nav === "listen") || (sec === "quick" && b.dataset.nav === "practice") || (["mix", "focus", "close", "mocks"].includes(sec) && b.dataset.nav === "today") || (["rewrite", "micro"].includes(sec) && b.dataset.nav === "write")) ? "page" : "false"));
  const v = document.createElement("section"); v.className = "view"; main.append(v);
  if (h === "today") viewToday(v);
  else if (h === "phrases") viewPhrases(v);
  else if (h === "mix") viewMix(v);
  else if (h === "focus") viewFocus(v);
  else if (h === "close") viewClose(v);
  else if (h === "mocks") viewMocks(v);
  else if (h === "rewrite") viewRewrite(v);
  else if (h === "micro") viewMicro(v);
  else if (h === "speak-432") viewTalk(v);
  else if (h === "speak-p2") viewP2(v);
  else if (h === "practice") viewPractice(v);
  else if (h.startsWith("play-")) viewGame(v, h.slice(5));
  else if (h === "read") viewReadList(v);
  else if (h.startsWith("read-")) viewArticle(v, h.slice(5));
  else if (h === "listen") viewListenList(v);
  else if (h.startsWith("listen-")) viewListening(v, h.slice(7));
  else if (h === "write") viewWriteList(v);
  else if (h.startsWith("write-")) viewWriting(v, h.slice(6));
  else if (h === "real") viewRealList(v);
  else if (h.startsWith("real-")) viewReal(v, h.slice(5));
  else if (h === "quick") viewQuick(v);
  else if (h.startsWith("quick-")) startQuick(v, h.slice(6));
  else if (h === "speak") viewSpeakList(v);
  else if (h === "speak-shadow") viewShadow(v);
  else if (h.startsWith("speak-")) viewSpeak(v, h.slice(6));
  else if (h === "review") viewReview(v);
  else if (h === "progress") viewProgress(v);
  else viewToday(v);
  window.scrollTo(0, 0);
}

/* ---------- daily route ---------- */
function nextReading() { const all = BANK.reading.concat(S.aiArticles); return all.find(a => !S.read[a.id]) || null; }
function nextListening() { const all = BANK.listening.concat(S.aiListening); return all.find(a => !S.listen[a.id]) || null; }
/* ---------- views: today ---------- */
function ring(p) {
  const r = 26, C = 2 * Math.PI * r, v = Math.min(1, p);
  return `<svg class="ring" viewBox="0 0 64 64" role="img" aria-label="${Math.round(v * 100)}% of daily goal"><circle cx="32" cy="32" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="7"/><circle cx="32" cy="32" r="${r}" fill="none" stroke="var(--red)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - v)}" transform="rotate(-90 32 32)"/><text x="32" y="37" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="700" font-size="14" fill="var(--ink)">${Math.round(v * 100)}%</text></svg>`;
}
function levelLine() {
  const li = level(); const parts = [];
  LEVELS.forEach((l, i) => {
    parts.push(`<span class="st ${S.xp >= l.xp ? "on" : ""}"></span>`);
    if (i < LEVELS.length - 1) { const nx = LEVELS[i + 1]; const p = Math.max(0, Math.min(1, (S.xp - l.xp) / (nx.xp - l.xp))); parts.push(`<span class="seg"><i style="--p:${p * 100}%"></i></span>`); }
  });
  return `<div class="levelline" aria-hidden="true">${parts.join("")}</div><div class="levelnames">${LEVELS.map((l, i) => i === li ? `<b>${l.n}</b>` : `<span>${l.n}</span>`).join("")}</div>`;
}
/* ---------- views: practice ---------- */
function viewPractice(v) {
  v.innerHTML = `<div class="hello"><span class="eyebrow">Games</span><h1>Pick a line</h1><p class="muted">Exam-format games on your topics. Rounds of 8; combos multiply XP. Wrong answers go to your review deck automatically.</p></div>
  <button class="card tile quickbanner" id="qp" style="--c:var(--red)"><span class="tag">2–5 minutes</span><h3>${I.bolt || ""} Quick play</h3><p class="muted">Short rounds of grammar and vocabulary when you don't have time for the full route.</p></button>
  <div class="grid">${Object.entries(TYPES).map(([k, t]) => { const p = k === "mock" ? {done:S.mockBest || 0, total:30} : poolProgress(k); const a = acc(t.skill);
    return `<button class="card tile" data-k="${k}" style="--c:${t.c}"><span class="tag">${esc(t.part)}</span><h3>${esc(t.name)}</h3><p class="muted">${esc(t.desc)}</p>
    <div class="bar"><i style="--p:${p.done / Math.max(1, p.total) * 100}%"></i></div><div class="meta"><span class="mono">${p.done}/${p.total} ${k === "mock" ? "best" : "mastered"}</span><span>${a == null ? "No score yet" : "Accuracy " + Math.round(a * 100) + "%"}</span></div></button>`; }).join("")}</div>`;
  $$(".tile[data-k]", v).forEach(b => b.onclick = () => go("play-" + b.dataset.k));
  $("#qp", v).onclick = () => go("quick");
}

/* ---------- game engine ---------- */
function renderItem(it, onDone, ro = {}) {
  // returns {html, mount(root)} ; onDone(ok, given, meh)
  const t = it._t;
  if (t === "wf") return {
    html:`<span class="stem">${esc(it.stem)}</span><p class="qtext">${gapped(it.s)}</p><input class="answer" id="ans" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Type the new word" aria-label="Your answer"><button class="btn primary" id="chk">Check</button>`,
    mount(r) { typed(r, (val) => { const n = norm(val); if (it.a.map(norm).includes(n)) return onDone(true, val); if ((it.us || []).map(norm).includes(n)) return onDone(false, val, "That's the US spelling. In British English: " + it.a[0]); onDone(false, val); }); }
  };
  if (t === "kwt") return {
    html:`<div class="source">${esc(it.s1)}</div><span class="keyword">${esc(it.key)}</span><p class="qtext">${esc(it.pre)} <span class="gap">&nbsp;</span> ${esc(it.post)}</p><input class="answer" id="ans" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="3–6 words, including the key word" aria-label="Your answer"><button class="btn primary" id="chk">Check</button>`,
    mount(r) { typed(r, (val) => { const n = norm(val).replace(/^(.+)$/, "$1"); const good = it.a.map(norm); if (good.includes(n)) return onDone(true, val);
      if (!n.includes(norm(it.key))) return onDone(false, val, "You must use the key word " + it.key + " (unchanged).");
      onDone(false, val); }); }
  };
  if (t === "oc") return {
    html:`<p class="qtext">${gapped(it.s)}</p><input class="answer" id="ans" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="One word" aria-label="Your answer"><button class="btn primary" id="chk">Check</button>`,
    mount(r) { typed(r, (val) => onDone(it.a.map(norm).includes(norm(val)), val)); }
  };
  if (t === "mc" || t === "pv" || t === "gram") { const order = shuffle(it.o.map((x, i) => i)), pf = S.settings.produce !== false && !ro.noPF; return {
    html:`<p class="qtext">${gapped(it.s)}</p>${pf ? `<div class="pf" id="pf"><input class="answer" id="guess" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Think of the answer first and type it (or skip)" aria-label="Your answer before seeing the options"><button class="btn" id="showOpts">Show options</button></div>` : ""}<div class="opts two" id="optsBox"${pf ? " hidden" : ""}>${order.map(i => `<button class="opt" data-i="${i}">${esc(it.o[i])}</button>`).join("")}</div>`,
    mount(r) {
      $$(".opt", r).forEach(b => b.onclick = () => { const i = +b.dataset.i; $$(".opt", r).forEach(x => { x.disabled = true; if (+x.dataset.i === it.a) x.classList.add("right"); }); if (i !== it.a) b.classList.add("wrong"); onDone(i === it.a, it.o[i]); });
      if (!pf) return;
      // Recuperar antes de reconocer: primero intenta la respuesta, luego se muestran las opciones
      const g = $("#guess", r), reveal = () => {
        const val = g.value.trim(); $("#pf", r).remove(); $("#optsBox", r).hidden = false;
        if (val && norm(val) === norm(it.o[it.a])) { $$(".opt", r).forEach(x => { x.disabled = true; if (+x.dataset.i === it.a) x.classList.add("right"); }); onDone(true, val, "Recalled without seeing the options: the strongest kind of practice."); }
      };
      $("#showOpts", r).onclick = reveal; g.onkeydown = (e) => { if (e.key === "Enter") reveal(); };
      setTimeout(() => { if (matchMedia("(pointer:fine)").matches) g.focus(); }, 50);
    }
  }; }
  if (t === "err") { const order = shuffle(it.o.map((o, i) => i)); return {
    html:`<p class="muted">Tap the part that contains the mistake.</p><div class="chunks">${it.c.map((c, i) => `<button class="chunk" data-i="${i}">${esc(c)}</button>`).join("")}</div><div id="fixer"></div>`,
    mount(r) {
      let tries = 0;
      $$(".chunk", r).forEach(b => b.onclick = () => {
        const i = +b.dataset.i;
        if (i !== it.e) { tries++; b.classList.add("wrongpick", "shake"); if (tries >= 2) { $$(".chunk", r).forEach(x => x.disabled = true); r.querySelector(`.chunk[data-i="${it.e}"]`).classList.add("picked"); return onDone(false, it.c[i], "The error was in: “" + it.c[it.e] + "”."); } return; }
        $$(".chunk", r).forEach(x => x.disabled = true); b.classList.add("picked");
        $("#fixer", r).innerHTML = `<p class="muted" style="margin:12px 0 8px">Now choose the correction:</p><div class="opts">${order.map(j => `<button class="opt" data-j="${j}">${esc(it.o[j])}</button>`).join("")}</div>`;
        $$("#fixer .opt", r).forEach(o => o.onclick = () => { const j = +o.dataset.j; $$("#fixer .opt", r).forEach(x => { x.disabled = true; if (+x.dataset.j === it.a) x.classList.add("right"); }); if (j !== it.a) o.classList.add("wrong"); onDone(j === it.a && tries === 0, it.o[j], j === it.a && tries ? "Right fix, but you needed a second try to find it." : ""); });
      });
    }
  }; }
  if (t === "spell") return {
    html:`<div class="row"><button class="btn primary" id="say">${I.speaker} Play</button><button class="btn" id="slow">${I.slow} Slowly</button><button class="btn ghost" id="hint">Hint</button></div><p class="qtext muted" id="hintTxt" hidden></p><input class="answer" id="ans" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Type the word you hear" aria-label="Your answer"><button class="btn primary" id="chk">Check</button>`,
    mount(r) {
      const say = (slow) => TTS.speak(`${it.w}. ${it.s} ${it.w}.`, {slow});
      $("#say", r).onclick = () => say(false); $("#slow", r).onclick = () => say(true);
      $("#hint", r).onclick = () => { const h = $("#hintTxt", r); h.hidden = false; h.innerHTML = esc(it.s).replace(new RegExp(it.w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `<span class="gap">${esc(it.w[0])}…</span>`) + ` <small class="mono">(${it.w.length} letters)</small>`; };
      setTimeout(() => say(false), 350);
      typed(r, (val) => { const n = norm(val); if (n === norm(it.w)) return onDone(true, val); if (it.us && n === norm(it.us)) return onDone(false, val, "That's the American spelling. UK: " + it.w); onDone(false, val); });
    }
  };
  if (t === "idioms" || t === "work") { const opts = shuffle([it.m].concat(it.d)); return {
    html:`<p class="qtext"><b style="font-family:var(--f-display);font-size:1.5rem">${esc(it.t)}</b></p><div class="opts">${opts.map(o => `<button class="opt">${esc(o)}</button>`).join("")}</div>`,
    mount(r) { $$(".opt", r).forEach(b => b.onclick = () => { $$(".opt", r).forEach(x => { x.disabled = true; if (x.textContent === it.m) x.classList.add("right"); }); const ok = b.textContent === it.m; if (!ok) b.classList.add("wrong"); onDone(ok, b.textContent); }); }
  }; }
  return {html:"<p>Unknown item.</p>", mount() {}};
}
function gapped(s) { return esc(s).replace("___", '<span class="gap">&nbsp;?&nbsp;</span>'); }
function typed(r, check) {
  const inp = $("#ans", r), btn = $("#chk", r);
  const go = () => { if (!inp.value.trim()) { inp.classList.add("shake"); setTimeout(() => inp.classList.remove("shake"), 300); inp.focus(); return; } inp.disabled = true; btn.disabled = true; check(inp.value); };
  btn.onclick = go; inp.onkeydown = (e) => { if (e.key === "Enter") go(); };
  setTimeout(() => { if (matchMedia("(pointer:fine)").matches) inp.focus(); }, 50);
}
function answerOf(it, html) {
  switch (it._t) {
    case "wf": case "oc": return it.a.join(" / ");
    case "kwt": return html ? `${esc(it.pre)} <u>${esc(it.a[0])}</u> ${esc(it.post)}` : `${it.pre} ${it.a[0]} ${it.post}`;
    case "mc": case "pv": case "gram": return it.o[it.a];
    case "err": return it.fix || it.c.map((c, i) => i === it.e ? it.o[it.a] : c).join(" ");
    case "spell": return it.w;
    case "idioms": case "work": return it.m;
  }
}
function itemAsText(it) {
  switch (it._t) {
    case "wf": return `Word formation. Sentence: "${it.s}" Stem: ${it.stem}. Correct: ${it.a.join(" / ")}.`;
    case "kwt": return `Key word transformation. Original: "${it.s1}" Key word: ${it.key}. Target: "${it.pre} ___ ${it.post}". Correct: ${it.a.join(" / ")}.`;
    case "oc": return `Open cloze. "${it.s}" Correct: ${it.a.join(" / ")}.`;
    case "mc": case "pv": case "gram": return `Multiple-choice gap fill. "${it.s}" Options: ${it.o.join(", ")}. Correct: ${it.o[it.a]}.`;
    case "err": return `Error correction. Sentence: "${it.c.join(" ")}". Error: "${it.c[it.e]}" → "${it.o[it.a]}".`;
    case "spell": return `Spelling of the word "${it.w}" (British English).`;
    case "idioms": case "work": return `Expression "${it.t}" means: ${it.m}.`;
  }
}

function viewGame(v, type, opts = {}) {
  if (type === "idioms-learn") return viewGame(v, "idioms", {items:pickItems("idioms", 8), title:"Learn idioms"});
  const T = TYPES[type]; if (!T) return viewPractice(v);
  if (type === "idioms" && !opts.items) return viewQuickfire(v);
  const isMock = type === "mock";
  const items = opts.items || (isMock ? ["mc", "oc", "wf", "kwt"].flatMap(t => pickItems(t, t === "kwt" ? 6 : 8)) : pickItems(type, 8));
  let mockEnd = 0, mockTimer = null;
  const G = {i:0, res:[], combo:0, xp:0};
  v.style.setProperty("--c", T.c);
  const intro = () => {
    const p = isMock ? {done:S.mockBest || 0, total:30} : poolProgress(type);
    v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Games</button></div>
    <div class="hello"><span class="eyebrow" style="color:${T.c}">${esc(T.part)}</span><h1>${esc(T.name)}</h1><p class="muted">${esc(T.desc)}</p></div>
    <div class="card stack"><div class="row"><span class="mono">${p.done}/${p.total}</span><span class="muted">${isMock ? "best mock score" : "mastered in this bank"}</span></div><div class="bar" style="--c:${T.c}"><i style="--p:${p.done / Math.max(1, p.total) * 100}%"></i></div>
    <div class="row"><button class="btn red" id="start">${isMock ? "Start block · 35 min" : "Start round · 8"}</button>${aiOn() && !isMock ? `<button class="btn ai" id="gen">${I.sparkle} Generate 8 fresh questions</button>` : ""}</div><p class="muted" id="genMsg"></p></div>${methodCard(type)}`;
    $("#bk", v).onclick = () => go("practice");
    $("#start", v).onclick = () => {
      if (!items.length) return toast("No questions yet.");
      if (isMock) { mockEnd = Date.now() + 35 * 60000; mockTimer = setInterval(() => { const tm = $("#mockT", v); const left = Math.max(0, mockEnd - Date.now()); if (tm) tm.textContent = Math.floor(left / 60000) + ":" + pad(Math.floor(left / 1000) % 60); if (!left) { clearInterval(mockTimer); while (G.res.length < items.length) G.res.push(false); finish(); } }, 500); cleanup = () => clearInterval(mockTimer); }
      next();
    };
    const gb = $("#gen", v); if (gb) gb.onclick = async () => {
      gb.disabled = true; gb.innerHTML = `<span class="spin"></span> Writing questions…`;
      try { const n = await generateItems(type); $("#genMsg", v).textContent = `${n} new questions added. They'll come up first.`; items.splice(0, items.length, ...pickItems(type, 8)); }
      catch (e) { $("#genMsg", v).textContent = aiErr(e); }
      gb.disabled = false; gb.innerHTML = `${I.sparkle} Generate 8 more`;
    };
  };
  const next = () => {
    if (G.over) return;
    if (G.i >= items.length) return finish();
    const it = items[G.i];
    const dots = items.map((_, j) => `<i class="${j < G.i ? (G.res[j] ? "ok" : "ko") : j === G.i ? "cur" : ""}"></i>`).join("");
    v.innerHTML = `<div class="game-head"><button class="icon-btn" id="quit" aria-label="Quit round">${I.back}</button><div class="progress-dots">${dots}</div>${isMock ? `<span class="timer mono" id="mockT"></span>` : G.combo >= 2 ? `<span class="combo">x${Math.min(3, 1 + Math.floor(G.combo / 2))} combo</span>` : ""}</div>
      <div class="card qcard" id="q" style="--c:${TYPES[it._t].c}"><span class="eyebrow">${isMock ? TYPES[it._t].part + " · " : ""}${esc(TYPES[it._t].name)} · ${G.i + 1} of ${items.length}${it._id.startsWith("ai") ? " · fresh" : ""}</span>${tipBox(it)}</div><div id="fb"></div>`;
    $("#quit", v).onclick = () => go(opts.back || "practice");
    const r = $("#q", v); bindTips(r);
    const R = renderItem(it, (ok, given, note) => {
      G.res.push(ok); S.seen[it._id] = ok ? 1 : -1; record((TYPES[it._t] || T).skill, ok);
      let gained = 0;
      if (ok) { G.combo++; gained = 10 * Math.min(3, 1 + Math.floor((G.combo - 1) / 2)); G.xp += gained; }
      else { G.combo = 0; addCard({k:"item", id:"item:" + it._id, t:it._t, ref:it._id, f:TYPES[it._t].name, b:answerOf(it)}); }
      save();
      showFeedback($("#fb", v), it, ok, given, note, gained, () => { G.i++; next(); });
    }, {noPF:isMock});
    r.insertAdjacentHTML("beforeend", R.html); R.mount(r);
  };
  const finish = () => {
    if (G.over) return; G.over = true;
    if (mockTimer) clearInterval(mockTimer);
    const right = G.res.filter(Boolean).length;
    if (isMock) {
      S.mockBest = Math.max(S.mockBest || 0, right);
      (S.mocks = S.mocks || []).push({d:dayKey(), r:right, n:items.length}); if (S.mocks.length > 40) S.mocks.shift();
      const xp = right * 8 + 40; addXP(xp); markDone("mock");
      const byPart = ["mc", "oc", "wf", "kwt"].map(t => { const idx = items.map((x, i) => x._t === t ? i : -1).filter(i => i >= 0); return `<div class="skillrow"><span>${TYPES[t].part.split("· ")[1]}</span><div class="bar" style="--c:var(--red)"><i style="--p:${idx.filter(i => G.res[i]).length / idx.length * 100}%"></i></div><span class="mono">${idx.filter(i => G.res[i]).length}/${idx.length}</span></div>`; }).join("");
      v.innerHTML = `<div class="card stack pop" style="align-items:center;text-align:center;padding:32px 18px"><span class="eyebrow">Block complete</span><div class="big-score">${right}/${items.length}</div><p>+${xp} XP</p><div class="stack" style="width:100%;max-width:480px;text-align:left">${byPart}</div><p class="muted">A practice block with the app's own questions: it trains you, it does not measure you. Only official papers feed your score estimate. Your mistakes are in Review.</p><div class="row" style="justify-content:center"><button class="btn" id="home">Back to Today</button></div></div>`;
      $("#home", v).onclick = () => go("today"); return;
    }
    const bonus = right === items.length ? 30 : 0;
    addXP(G.xp + bonus + 10); if (!opts.quick) markDone(type); if (opts.quick) { S.quick = S.quick || {}; S.quick[opts.quick] = {d:dayKey(), r:right, n:items.length}; }
    S.days[dayKey()].min = (S.days[dayKey()].min || 0) + 5; save();
    v.innerHTML = `<div class="card stack pop" style="text-align:center;align-items:center;padding:32px 18px"><span class="eyebrow">${esc(opts.title || T.name)} · ${opts.quick ? "done" : "round complete"}</span>
      <div class="big-score">${right}/${items.length}</div><p class="muted">+${G.xp + bonus + 10} XP${bonus ? " · perfect round bonus" : ""}. ${right === items.length ? "Flawless." : right >= 6 ? "Strong round." : right >= 4 ? "Solid. Mistakes are now in your review deck." : "Tough one. These will come back in Review until they stick."}</p>
      <div class="row" style="justify-content:center"><button class="btn red" id="again">Another round</button><button class="btn" id="home">Back to Today</button></div></div>`;
    $("#again", v).onclick = () => route(); $("#home", v).onclick = () => go(opts.back === "quick" ? "quick" : "today");
    if (opts.back === "quick") { $("#again", v).textContent = "Another one"; $("#home", v).textContent = "Quick play"; }
  };
  if (opts.autostart) next(); else intro();
}
function showFeedback(box, it, ok, given, note, gained, onNext) {
  const meh = !ok && note && /US spelling|American/.test(note);
  box.innerHTML = `<div class="feedback ${ok ? "ok" : meh ? "meh" : "ko"} pop">
    <b class="t">${ok ? "Correct" + (gained ? ` · +${gained} XP` : "") : meh ? "Nearly — wrong variety" : "Not quite"}</b>
    ${note ? `<p>${esc(note)}</p>` : ""}
    ${!ok ? `<p>Answer: <span class="ans">${it._t === "kwt" ? answerOf(it, true) : esc(answerOf(it))}</span></p>` : ""}
    ${it.why || it.tip ? `<p class="muted">${esc(it.why || it.tip)}</p>` : ""}
    ${it.es ? `<p class="es"><span class="flag">ES</span> ${esc(it.es)}</p>` : ""}
    ${(it._t === "idioms" || it._t === "work") && it.ex ? `<p class="muted"><i>“${esc(it.ex)}”</i></p>` : ""}
    <div class="row">${aiOn() ? `<button class="btn small ai" id="explain">${I.sparkle} Explain it to me</button>` : ""}${it._t === "spell" || it._t === "idioms" || it._t === "work" ? `<button class="btn small" id="hear">${I.speaker} Hear it</button>` : ""}<button class="btn small ghost" id="bad" title="Remove this question for good">Wrong question?</button><span class="spacer"></span><button class="btn primary" id="nx">Next ${I.arrow}</button></div>
    <div class="ai-out" id="aiOut" hidden></div></div>`;
  const bd = $("#bad", box); if (bd) bd.onclick = () => { (S.bad = S.bad || {})[it._id] = 1; tomb("d:item:" + it._id); S.deck = S.deck.filter(c => c.id !== "item:" + it._id); if (S.ai[it._t]) S.ai[it._t] = S.ai[it._t].filter(x => x._id !== it._id); save(); bd.disabled = true; toast("Removed. You won't see this question again."); };
  const nx = $("#nx", box); nx.onclick = onNext; setTimeout(() => nx.focus({preventScroll:true}), 30);
  box.scrollIntoView({behavior:"smooth", block:"nearest"});
  const hb = $("#hear", box); if (hb) hb.onclick = () => TTS.speak(it._t === "spell" ? `${it.w}. ${it.s}` : `${it.t}. ${it.ex || ""}`);
  const eb = $("#explain", box); if (eb) eb.onclick = async () => {
    eb.disabled = true; const out = $("#aiOut", box); out.hidden = false; out.textContent = "Thinking…";
    try {
      await ai(`You are an expert Cambridge C1/C2 English teacher. ${LEARNER}\n\nQuestion: ${itemAsText(it)}\nThe learner answered: "${given}" (${ok ? "correct" : "incorrect"}).\n\nExplain in Spanish, in at most 90 words: why the correct answer is right${ok ? "" : ", why the learner's answer is wrong"}, and the rule or pattern to remember. Then give 2 extra example sentences in British English using the same structure, on the learner's topics. Plain text, no markdown headings.`, {modelTier:"quick", onText:({text}) => { out.textContent = text; }});
    } catch (e) { out.textContent = aiErr(e); }
  };
}

/* ---------- consejos (tips.js) ---------- */
let tipN = Math.floor(Math.random() * 6);
function tipBox(it) {
  if (!S.settings.tips || typeof TIPS === "undefined" || !TIPS[it._t]) return "";
  const T = TIPS[it._t], n = tipN++, t = tipFor(it, n);
  if (n % 3 === 0) return `<div class="tipbox"><div class="tiphead"><b>🧠 Sin mirar: ¿qué haces primero en este tipo de pregunta?</b><button class="tipx" type="button" aria-label="Ocultar consejos">✕</button></div><details class="recall"><summary>Comprobar</summary><p><b>Primero:</b> ${esc(T.steps[0])}</p><ol>${T.steps.map(x => `<li>${esc(x)}</li>`).join("")}</ol></details></div>`;
  return `<div class="tipbox"><div class="tiphead"><b>💡 Antes de responder</b><button class="tipx" type="button" aria-label="Ocultar consejos">✕</button></div>
    <p><b>Primero:</b> ${esc(T.steps[0])}</p>${t ? `<p class="${t.ctx ? "ctx" : ""}"><b>${t.ctx ? "En esta pregunta:" : "Consejo:"}</b> ${esc(t.text)}</p>` : ""}
    <details${S.settings.tipsOpen ? " open" : ""}><summary>Método completo</summary><ol>${T.steps.map(x => `<li>${esc(x)}</li>`).join("")}</ol></details></div>`;
}
function bindTips(root) {
  const x = root && root.querySelector(".tipx"); if (x) x.onclick = () => { S.settings.tips = false; save(); $$(".tipbox").forEach(b => b.remove()); toast("Consejos ocultos. Puedes volver a activarlos en Settings."); };
  const d = root && root.querySelector(".tipbox details:not(.recall)"); if (d) d.ontoggle = () => { S.settings.tipsOpen = d.open; save(); };
}
function methodCard(type) {
  const T = typeof TIPS !== "undefined" && TIPS[type]; if (!T) return "";
  return `<details class="card stack methodcard"><summary><b>💡 Cómo atacarlo</b> <span class="muted">· método y consejos</span></summary><h3>Método</h3><ol>${T.steps.map(x => `<li>${esc(x)}</li>`).join("")}</ol><h3>Consejos clave</h3><ul>${T.tips.map(x => `<li>${esc(x)}</li>`).join("")}</ul></details>`;
}

/* ---------- quickfire ---------- */
function viewQuickfire(v) {
  const T = TYPES.idioms;
  v.style.setProperty("--c", T.c);
  v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Games</button></div>
  <div class="hello"><span class="eyebrow" style="color:${T.c}">${T.part}</span><h1>Idiom Quickfire</h1><p class="muted">60 seconds of fluency practice, only with expressions you have already got right. +8 XP each, streaks of 3 add a bonus.</p></div>
  <div class="card stack"><p>Your record: <b class="mono">${S.qfBest || 0}</b></p><div class="row"><button class="btn red" id="start">Start · 60 s</button><button class="btn" id="learn">Learn 8 new · no clock</button>${aiOn() ? `<button class="btn ai" id="gen">${I.sparkle} Generate fresh idioms</button>` : ""}</div><p class="muted" id="genMsg"></p></div>${methodCard("idioms")}`;
  $("#bk", v).onclick = () => go("practice");
  $("#learn", v).onclick = () => go("play-idioms-learn");
  const gb = $("#gen", v); if (gb) gb.onclick = async () => { gb.disabled = true; gb.innerHTML = `<span class="spin"></span> Writing…`; try { const n = await generateItems("idioms"); $("#genMsg", v).textContent = `${n} new idioms added.`; } catch (e) { $("#genMsg", v).textContent = aiErr(e); } gb.disabled = false; gb.innerHTML = `${I.sparkle} Generate more`; };
  $("#start", v).onclick = () => {
    const items = shuffle(pool("idioms").filter(x => S.seen[x._id] === 1)); if (items.length < 8) { toast("Fluency rounds use only idioms you already know. Learn a few first."); return go("play-idioms-learn"); } let i = 0, right = 0, wrong = [], streak = 0, xp = 0, end = Date.now() + 60000, timer;
    const draw = () => {
      const it = items[i % items.length]; const opts = shuffle([it.m].concat(it.d));
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      v.innerHTML = `<div class="game-head"><button class="icon-btn" id="quit" aria-label="Quit">${I.back}</button><span class="timer ${left <= 10 ? "low" : ""}" id="tm">${left}s</span><span class="spacer"></span><span class="combo">${right} right</span></div>
      <div class="card qcard" style="--c:${T.c}"><p class="qtext"><b style="font-family:var(--f-display);font-size:1.6rem">${esc(it.t)}</b></p><div class="opts">${opts.map(o => `<button class="opt">${esc(o)}</button>`).join("")}</div></div>`;
      $("#quit", v).onclick = () => { clearInterval(timer); go("practice"); };
      $$(".opt", v).forEach(b => b.onclick = () => {
        const ok = b.textContent === it.m; S.seen[it._id] = ok ? 1 : -1; record("vocab", ok);
        if (ok) { right++; streak++; xp += 8 + (streak % 3 === 0 ? 6 : 0); b.classList.add("right"); } else { streak = 0; wrong.push(it); b.classList.add("wrong", "shake"); $$(".opt", v).forEach(x => { if (x.textContent === it.m) x.classList.add("right"); }); addCard({k:"word", f:it.t, b:it.m, ex:it.ex}); }
        $$(".opt", v).forEach(x => x.disabled = true); i++; setTimeout(() => { if (Date.now() < end) draw(); }, ok ? 280 : 900);
      });
    };
    const done = () => {
      clearInterval(timer); if (right > (S.qfBest || 0)) S.qfBest = right;
      addXP(xp + 10); markDone("idioms");
      v.innerHTML = `<div class="card stack pop" style="text-align:center;align-items:center;padding:32px 18px"><span class="eyebrow">Time's up</span><div class="big-score">${right}</div><p class="muted">correct · +${xp + 10} XP · record ${S.qfBest}</p>
      ${wrong.length ? `<div class="stack" style="text-align:left;width:100%;max-width:520px">${wrong.map(w => `<div class="errline"><b>${esc(w.t)}</b><span>${esc(w.m)}</span><small class="muted"><i>${esc(w.ex)}</i></small></div>`).join("")}<p class="muted">These are now in your review deck.</p></div>` : ""}
      <div class="row" style="justify-content:center"><button class="btn red" id="again">Go again</button><button class="btn" id="home">Back to Today</button></div></div>`;
      $("#again", v).onclick = () => route(); $("#home", v).onclick = () => go("today");
    };
    timer = setInterval(() => { const left = Math.max(0, Math.ceil((end - Date.now()) / 1000)); const tm = $("#tm", v); if (tm) { tm.textContent = left + "s"; tm.classList.toggle("low", left <= 10); } if (left <= 0) done(); }, 250);
    cleanup = () => clearInterval(timer);
    draw();
  };
}

/* ---------- AI item generation ---------- */
const GEN_SPEC = {
  wf:`Cambridge C1/C2 Use of English Part 3 (word formation) items. JSON array of 8 objects: {"s": a sentence containing exactly one "___" gap, "stem": the base word in CAPITALS, "a": [accepted answers in lowercase, British spelling], "why": max 18 words explaining the affix or form}. Mix prefixes (un-, in-, ir-, mis-, dis-, non-, over-, under-) and suffixes (-ity, -ness, -ment, -ance, -ive, -ous, -ly, -ise).`,
  kwt:`Cambridge C1/C2 Use of English Part 4 (key word transformation) items. JSON array of 8 objects: {"s1": original sentence, "key": the key word in CAPITALS, "pre": text before the gap, "post": text after the gap, "a": [all acceptable 3-6 word answers in lowercase, each containing the key word unchanged], "why": max 18 words naming the structure}. Use exam structures: inversion, passive reporting, wish/if only, modal perfects, cleft sentences, phrasal verbs, fixed expressions.`,
  oc:`Cambridge C1/C2 Use of English Part 2 (open cloze) items. JSON array of 8 objects: {"s": sentence with exactly one "___" gap needing ONE word, "a": [all acceptable single words in lowercase], "why": max 18 words}. Target prepositions, linkers, inversion words, quantifiers, relative pronouns, phrasal verb particles.`,
  pv:`British English phrasal verbs at C1 level used at work and in everyday life. JSON array of 8 objects: {"s": a natural British sentence with exactly one "___" gap where a phrasal verb goes (in the right form), "o": [4 phrasal verbs in the same form; only one correct], "a": index 0-3 of the correct option, "why": the meaning of the correct phrasal verb, max 12 words}.`,
  gram:`C1/C2 grammar items (inversion, conditionals, wish/if only, modals of deduction and past modals, relative clauses, cleft sentences, gerund vs infinitive, passive forms, linkers). JSON array of 8 objects: {"s": sentence with exactly one "___" gap, "o": [4 options; only one grammatically correct], "a": index 0-3 of the correct option, "why": the rule, max 15 words}.`,
  mc:`Cambridge C1/C2 Use of English Part 1 (multiple-choice cloze) items testing collocations and fixed phrases. JSON array of 8 objects: {"s": sentence with exactly one "___" gap, "o": [4 single-word or short options], "a": index 0-3 of the only correct option, "why": max 18 words}. Distractors must be plausible but clearly wrong for a native speaker.`,
  err:`Error-correction items targeting typical mistakes of Spanish speakers (false friends, uncountables, prepositions, tenses, word order, verb patterns). JSON array of 8 objects: {"c": the sentence split into 3-5 chunks (array of strings) where exactly one chunk contains the mistake, "e": index of the wrong chunk, "o": [3 replacement options for that chunk, the FIRST one correct], "a": 0, "why": max 20 words, may include the Spanish word in brackets}.`,
  spell:`Spelling items: words that are commonly misspelt or have distinct British spellings, useful at C1/C2. JSON array of 8 objects: {"w": the word in British spelling, "s": a natural example sentence containing the word, "tip": a short memory tip, "us": the US spelling only if different, otherwise omit}.`,
  work:`workplace English for a project manager in industrial maintenance (electrical, fire protection, compressed air, HVAC): collocations, phrasal verbs, contract and site vocabulary used in British workplaces. JSON array of 10 objects: {"t": the expression, "m": its meaning (max 10 words), "d": [3 plausible but wrong meanings], "ex": a natural British example sentence from a site, meeting or email}`,
  idioms:`British idioms, phrasal verbs and informal British expressions useful at C1/C2. JSON array of 10 objects: {"t": the expression, "m": its meaning (max 8 words), "d": [3 plausible but wrong meanings], "ex": a natural British example sentence}.`
};
function validItem(type, o) {
  // Validación automática antes de guardar: un solo hueco, respuestas cerradas, opciones distintas y ortografía británica
  try {
    const one = s => typeof s === "string" && s.split("___").length === 2;
    const single = a => Array.isArray(a) && a.length && a.every(x => typeof x === "string" && x.trim() && !/\s/.test(x.trim()));
    if (type !== "spell") { const ws = JSON.stringify(o).toLowerCase().match(/[a-z]+/g) || []; if (ws.some(w => MISSPELL[w] && /\(UK\)/.test(MISSPELL[w]))) return false; }
    if (type === "wf") return one(o.s) && !!o.stem && single(o.a);
    if (type === "kwt") return !!o.s1 && !!o.key && o.pre != null && o.post != null && Array.isArray(o.a) && o.a.length > 0 && o.a.every(a => { const n = words(a); return n >= 2 && n <= 6 && norm(a).includes(norm(o.key)); });
    if (type === "oc") return one(o.s) && single(o.a);
    if (type === "mc" || type === "pv" || type === "gram") return one(o.s) && Array.isArray(o.o) && o.o.length === 4 && new Set(o.o.map(norm)).size === 4 && Number.isInteger(o.a) && o.a >= 0 && o.a < 4;
    if (type === "err") return Array.isArray(o.c) && o.c[o.e] != null && Array.isArray(o.o) && o.o.length >= 2;
    if (type === "spell") return typeof o.w === "string" && o.w.length > 2 && !!o.s;
    if (type === "idioms" || type === "work") return !!o.t && !!o.m && Array.isArray(o.d) && o.d.length >= 3;
  } catch (e) {} return false;
}
async function generateItems(type) {
  const existing = pool(type).map(x => x.stem || x.key || x.w || x.t || (x.s || "").slice(0, 40)).slice(-60).join("; ");
  const weak = Object.keys(S.stats).filter(k => acc(k) != null && acc(k) < 0.7).map(k => SKILLS[k]?.n).filter(Boolean).join(", ");
  const prompt = `${LEARNER}${weak ? " Currently weakest: " + weak + "." : ""}\n\nCreate NEW ${GEN_SPEC[type]}\nTarget level: C1 (Cambridge C1 Advanced), not C2. Set about half of the sentences in the learner's interest areas (rotate: ${shuffle(INTERESTS).join(", ")}) and the rest in typical exam topics (work, education, the environment, science, society). Each gap must have exactly one defensible answer, or list every acceptable answer. Use British English spelling and usage throughout. Also add to every object an "es" field: in Spanish, what the correct answer means and when to use it (max 20 words), e.g. "hold a meeting = celebrar una reunión. Se dice 'hold', no 'do'." Do not repeat any of these: ${existing}.\nReply with only the JSON array.`;
  const arr = await aiJSON(prompt, {modelTier:"default"});
  const list = (Array.isArray(arr) ? arr : arr?.items || []).filter(o => validItem(type, o));
  if (type === "err") list.forEach(o => { o.a = 0; });
  const stamp = Date.now().toString(36);
  const out = list.map((o, i) => Object.assign(o, {_id:`ai-${type}-${stamp}-${i}`}));
  S.ai[type] = (S.ai[type] || []).concat(out); save();
  if (!out.length) throw {code:"invalid_json"};
  return out.length;
}

/* ---------- reading ---------- */
function allArticles() { return BANK.reading.concat(S.aiArticles); }
function viewReadList(v) {
  const arts = allArticles();
  v.innerHTML = `<div class="hello"><span class="eyebrow" style="color:var(--navy)">Reading</span><h1>Read things you care about</h1><p class="muted">C1–C2 texts on engineering, project management, personal development, money and sport. Tap any word for its meaning; save it to your deck.</p></div>
  ${aiOn() ? `<div class="card stack"><h3>Fresh article</h3><div class="row"><select id="topic" aria-label="Topic">${INTERESTS.map(t => `<option>${t}</option>`).join("")}<option value="">surprise me</option></select><select id="lvl" aria-label="Level"><option value="C1">C1</option><option value="C2">C2</option></select><input type="text" id="custom" placeholder="or a specific subject…" aria-label="Specific subject" style="flex:1;min-width:160px"><button class="btn ai" id="gen">${I.sparkle} Write it</button></div><p class="muted" id="genMsg"></p></div>` : ""}
  <div class="list">${arts.slice().reverse().map(a => `<button class="card item" data-id="${esc(a.id)}" style="--c:var(--navy)"><span class="badge">${I.book}</span><span class="txt"><b>${esc(a.title)}</b><small>${esc(a.topic)} · ${a.mins || 4} min${a.ai ? " · fresh" : ""}</small></span>${S.read[a.id] ? `<span class="check">${S.read[a.id].score}/${(a.q || []).length}</span>` : `<span class="go muted">${I.arrow}</span>`}</button>`).join("")}</div>
  <div class="card stack"><h3>Real British audio, video & news</h3><p class="muted">Native material to stretch you between sessions. Opens in a new tab.</p><div class="list">${BANK.links.map(l => `<a class="item" href="${l.u}" target="_blank" rel="noopener" style="--c:var(--green);text-decoration:none;color:inherit"><span class="badge">${I.link}</span><span class="txt"><b>${esc(l.t)}</b><small>${esc(l.d)}</small></span></a>`).join("")}</div></div>`;
  $$(".item[data-id]", v).forEach(b => b.onclick = () => go("read-" + b.dataset.id));
  const gb = $("#gen", v); if (gb) gb.onclick = async () => {
    gb.disabled = true; gb.innerHTML = `<span class="spin"></span> Writing… (≈30 s)`; $("#genMsg", v).textContent = "";
    const topic = $("#custom", v).value.trim() || $("#topic", v).value || shuffle(INTERESTS)[0];
    try {
      const a = await aiJSON(`${LEARNER}\n\nWrite an ORIGINAL, genuinely interesting magazine-style article (${$("#lvl", v).value} level, 380-450 words, British English spelling and idiom) about: ${topic}. It should teach something real and be the kind of piece an engineer and project manager who loves sport and personal finance would enjoy. Avoid inventing precise statistics or quotes; if you mention real facts, only well-established ones. Use rich ${$("#lvl", v).value} vocabulary, a few idioms and phrasal verbs. Separate paragraphs with a blank line.\nReply with only a JSON object: {"title": string, "topic": short topic label, "body": the article, "gloss": {"word or phrase exactly as it appears in the body": "Spanish translation/explanation"} with 10-14 advanced items, "q": [4 objects {"q": comprehension question, "o": [4 options], "a": index of correct option}] testing inference, attitude and vocabulary in context like Cambridge Reading Part 5}.`, {modelTier:"default"});
      if (!a || !a.body || !Array.isArray(a.q)) throw {code:"invalid_json"};
      a.id = "ai" + Date.now().toString(36); a.ai = true; a.mins = Math.max(2, Math.round(words(a.body) / 180)); a.gloss = a.gloss || {};
      a.q = a.q.filter(q => q && Array.isArray(q.o) && q.o[q.a] != null);
      S.aiArticles.push(a); save(); go("read-" + a.id);
    } catch (e) { $("#genMsg", v).textContent = aiErr(e); gb.disabled = false; gb.innerHTML = `${I.sparkle} Write it`; }
  };
}
let popEl = null;
function closePop() { if (popEl) { popEl.remove(); popEl = null; } }
function srcBlock(a) {
  const own = BANK.reading.includes(a), src = (BANK.sources || {})[a.id] || [];
  if (!own) return `<p class="muted" style="font-size:.8rem">Generated by Gemini for practice. Facts and figures have not been checked — don't quote them.</p>`;
  return `<details class="card stack"><summary><b>Sources &amp; further reading</b></summary><p class="muted" style="font-size:.85rem">Original text written for this app. Facts and figures come from these sources:</p>
   ${src.length ? `<ul style="margin:0;padding-left:1.1em">${src.map(s => `<li style="margin:.3em 0">${s.u ? `<a href="${esc(s.u)}" target="_blank" rel="noopener">${esc(s.t)}</a>` : esc(s.t)}</li>`).join("")}</ul>` : `<p class="muted">General knowledge; no specific figures cited.</p>`}</details>`;
}
function viewArticle(v, id) {
  const a = allArticles().find(x => x.id === id); if (!a) return viewReadList(v);
  const gl = a.gloss || {};
  const keys = Object.keys(gl).sort((x, y) => y.length - x.length);
  const paraHTML = (p) => {
    // mark glossary phrases first, then wrap other words
    let tokens = [{t:p, g:null}];
    keys.forEach(k => {
      const re = new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      const out = []; let used = false;
      tokens.forEach(tok => { if (tok.g || used) return out.push(tok); const m = tok.t.match(re); if (!m) return out.push(tok); used = true; const i = m.index; out.push({t:tok.t.slice(0, i), g:null}, {t:m[0], g:k}, {t:tok.t.slice(i + m[0].length), g:null}); });
      tokens = out;
    });
    return tokens.map(tok => tok.g ? `<span class="g" data-g="${esc(tok.g)}" tabindex="0">${esc(tok.t)}</span>` : tok.t.split(/([A-Za-z][A-Za-z'’-]*)/).map((part, i) => i % 2 ? `<span class="w">${esc(part)}</span>` : esc(part)).join("")).join("");
  };
  const paras = a.body.split(/\n\s*\n/).map(p => `<p>${paraHTML(p.trim())}</p>`).join("");
  const prev = S.read[a.id];
  v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Reading</button><span class="spacer"></span><button class="btn small" id="listen">${I.speaker} Listen</button><button class="btn small" id="stopA" hidden>${I.stop} Stop</button></div>
  <div class="hello"><span class="eyebrow" style="color:var(--navy)">${esc(a.topic)} · ${a.mins || 4} min read</span><h1>${esc(a.title)}</h1><p class="muted">Highlighted phrases have notes. Tap any word for help.</p></div>
  <article class="card article" id="art">${paras}</article>
  ${srcBlock(a)}
  <div class="card stack" id="quiz"><h2>Check your understanding</h2>${prev ? `<p class="muted">Last time: ${prev.score}/${a.q.length}. Try again to beat it.</p>` : ""}
  ${a.q.map((q, i) => `<div class="stack" data-q="${i}"><p><b>${i + 1}.</b> ${esc(q.q)}</p><div class="opts">${q.o.map((o, j) => `<button class="opt" data-j="${j}">${esc(o)}</button>`).join("")}</div></div>`).join("")}
  <div id="qres"></div></div>
  ${aiOn() ? `<div class="card stack"><h3>Talk about it</h3><p class="muted">Write 2–4 sentences: what's your opinion? Get instant C1/C2 feedback.</p><textarea class="answer" id="opinion" rows="4" spellcheck="false" placeholder="In my view…"></textarea><div><button class="btn ai" id="opBtn">${I.sparkle} Correct my answer</button></div><div class="ai-out" id="opOut" hidden></div></div>` : ""}`;
  $("#bk", v).onclick = () => go("read");
  const M = chunkMiner(a.title, a.body); v.insertAdjacentHTML("beforeend", M.html); M.mount(v);
  const lb = $("#listen", v), sb = $("#stopA", v);
  lb.onclick = async () => { lb.hidden = true; sb.hidden = false; await TTS.speak(a.title + ". " + a.body.replace(/\n+/g, " ")); lb.hidden = false; sb.hidden = true; };
  sb.onclick = () => { TTS.stop(); lb.hidden = false; sb.hidden = true; };
  // word popover
  $("#art", v).addEventListener("click", (e) => {
    const t = e.target.closest(".w,.g"); if (!t) return closePop();
    e.stopPropagation(); closePop();
    const phrase = t.dataset.g || t.textContent.replace(/[’']s$/, "");
    const def = t.dataset.g ? gl[t.dataset.g] : null;
    const sentence = (t.closest("p").textContent.match(new RegExp(`[^.!?]*\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b[^.!?]*[.!?]?`, "i")) || [""])[0].trim();
    popEl = document.createElement("div"); popEl.className = "popover"; popEl.setAttribute("role", "dialog");
    popEl.innerHTML = `<div class="row"><h3>${esc(phrase)}</h3><span class="spacer"></span><button class="icon-btn" id="pSay" aria-label="Pronounce">${I.speaker}</button></div><p id="pDef">${def ? esc(def) : aiOn() ? '<span class="muted">Looking it up…</span>' : '<span class="muted">No note for this word.</span>'}</p><div class="row"><button class="btn small" id="pSave">Save to review</button><button class="btn small ghost" id="pClose">Close</button></div>`;
    document.body.append(popEl);
    const rc = t.getBoundingClientRect(); const pw = Math.min(340, innerWidth - 32);
    popEl.style.left = Math.max(16, Math.min(innerWidth - pw - 16, rc.left)) + "px";
    const below = rc.bottom + 8; popEl.style.top = (below + 170 > innerHeight ? Math.max(16, rc.top - 178) : below) + "px";
    $("#pSay", popEl).onclick = () => TTS.speak(phrase);
    $("#pClose", popEl).onclick = closePop;
    let defText = def;
    $("#pSave", popEl).onclick = () => { addCard({k:"word", f:phrase, b:defText || "(look it up)", ex:sentence}); t.classList.add("saved"); toast("Saved to your review deck."); closePop(); };
    if (!def && aiOn()) ai(`Give the meaning of "${phrase}" as used in this sentence: "${sentence}". Reply in this exact format, one line: <short English definition> — <Spanish translation>. Max 20 words.`, {modelTier:"quick"}).then(r => { defText = r.text.trim(); const d = $("#pDef", popEl || document.createElement("i")); if (d) d.textContent = defText; }).catch(e => { const d = popEl && $("#pDef", popEl); if (d) d.textContent = aiErr(e); });
  });
  // quiz
  const ans = {};
  $$("#quiz [data-q]", v).forEach(box => {
    const qi = +box.dataset.q, q = a.q[qi];
    $$(".opt", box).forEach(b => b.onclick = () => {
      if (ans[qi] != null) return; const j = +b.dataset.j; ans[qi] = j === q.a;
      $$(".opt", box).forEach(x => { x.disabled = true; if (+x.dataset.j === q.a) x.classList.add("right"); }); if (j !== q.a) b.classList.add("wrong");
      record("reading", j === q.a);
      if (Object.keys(ans).length === a.q.length) {
        const score = Object.values(ans).filter(Boolean).length; const xp = score * 15 + 20;
        S.read[a.id] = {score, at:dayKey()}; addXP(xp); markDone("read");
        $("#qres", v).innerHTML = `<div class="feedback ${score >= 3 ? "ok" : "ko"} pop"><b class="t">${score}/${a.q.length} · +${xp} XP</b><p>${score === a.q.length ? "Perfect reading." : "Re-read the paragraph each wrong answer refers to — the clue is always in the text."}</p><div class="row"><button class="btn primary" id="toToday">Back to Today</button></div></div>`;
        $("#toToday", v).onclick = () => go("today");
      }
    });
  });
  const ob = $("#opBtn", v); if (ob) ob.onclick = async () => {
    const txt = $("#opinion", v).value.trim(); if (words(txt) < 5) return toast("Write at least a couple of sentences first.");
    ob.disabled = true; const out = $("#opOut", v); out.hidden = false; out.textContent = "Thinking…";
    try { await ai(`${LEARNER}\nThe learner read an article titled "${a.title}" and wrote this opinion:\n"""${txt}"""\nCorrect it like a strict but encouraging Cambridge examiner. Format in plain text:\n1) Corrected version (British spelling).\n2) Each mistake: original → correction — short reason in Spanish.\n3) One C2-level upgrade of their best sentence.\nKeep it under 160 words.`, {modelTier:"default", cache:false, onText:({text}) => out.textContent = text}); addXP(15); record("writing", true); }
    catch (e) { out.textContent = aiErr(e); }
    ob.disabled = false;
  };
}

/* ---------- listening ---------- */
function allListening() { return BANK.listening.concat(S.aiListening); }
function viewListenList(v) {
  const L = allListening();
  v.innerHTML = `<div class="hello"><span class="eyebrow" style="color:var(--green)">Listening</span><h1>Train your ear</h1><p class="muted">Meetings, match analysis, money podcasts, site briefings — read by a British voice. Listen first, answer, then do the dictation.</p></div>
  <button class="card tile quickbanner" id="realb" style="--c:var(--red)"><span class="tag">Real people · real accents</span><h3>Real British</h3><p class="muted">BBC Learning English, F1 engineers and UK engineers on video — with exercises made from the real audio.</p></button>
  <div class="card stack"><h3>Voice</h3><div class="row"><select id="voiceSel" aria-label="British voice"></select><span class="muted" id="voiceNote"></span></div><div class="row"><span class="muted">Speed</span><div class="seg-ctl" id="rate">${[0.8, 0.9, 1, 1.1].map(r => `<button aria-pressed="${S.settings.rate === r}" data-r="${r}">${r}×</button>`).join("")}</div><button class="btn small" id="test">${I.speaker} Test</button></div></div>
  ${aiOn() ? `<div class="card stack"><h3>Fresh recording</h3><div class="row"><select id="topic" aria-label="Topic">${INTERESTS.map(t => `<option>${t}</option>`).join("")}</select><select id="kind" aria-label="Format"><option value="a meeting between two colleagues">meeting</option><option value="a radio interview">radio interview</option><option value="a podcast monologue">podcast</option><option value="a heated but friendly debate">debate</option></select><button class="btn ai" id="gen">${I.sparkle} Create it</button></div><p class="muted" id="genMsg"></p></div>` : ""}
  <div class="list">${L.slice().reverse().map(l => `<button class="card item" data-id="${esc(l.id)}" style="--c:var(--green)"><span class="badge">${I.ear}</span><span class="txt"><b>${esc(l.title)}</b><small>${esc(l.topic)} · ${l.lines.length > 4 ? "dialogue" : "monologue"}${l.ai ? " · fresh" : ""}</small></span>${S.listen[l.id] ? `<span class="check">${S.listen[l.id].score}/${l.q.length}</span>` : `<span class="go muted">${I.arrow}</span>`}</button>`).join("")}</div>`;
  paintVoiceSel(); bindRate(v);
  $("#test", v).onclick = () => TTS.speak("Right then. Let's crack on — the kettle's on and the meeting starts in five.");
  $$(".item[data-id]", v).forEach(b => b.onclick = () => go("listen-" + b.dataset.id));
  $("#realb", v).onclick = () => go("real");
  const gb = $("#gen", v); if (gb) gb.onclick = async () => {
    gb.disabled = true; gb.innerHTML = `<span class="spin"></span> Writing… (≈30 s)`;
    try {
      const l = await aiJSON(`${LEARNER}\n\nWrite an ORIGINAL listening script: ${$("#kind", v).value} about ${$("#topic", v).value}, natural spoken British English at C1/C2 level (contractions, fillers like "right", "to be fair", idioms, phrasal verbs), 220-300 words. Speakers labelled "A" and "B" (or only "A" for a monologue).\nReply with only a JSON object: {"title": string, "topic": short label, "lines": [["A", "what they say"], ...], "q": [4 objects {"q": question, "o": [4 options], "a": correct index}] testing gist, detail, attitude and meaning of idioms like Cambridge Listening, "dict": [2 short memorable sentences copied exactly from the script]}.`, {modelTier:"default"});
      if (!l || !Array.isArray(l.lines) || !Array.isArray(l.q)) throw {code:"invalid_json"};
      l.id = "ai" + Date.now().toString(36); l.ai = true; l.dict = (l.dict || []).slice(0, 3);
      S.aiListening.push(l); save(); go("listen-" + l.id);
    } catch (e) { $("#genMsg", v).textContent = aiErr(e); gb.disabled = false; gb.innerHTML = `${I.sparkle} Create it`; }
  };
}
function paintVoiceSel() {
  const sel = $("#voiceSel"); if (!sel) return;
  if (!TTS.list.length) { sel.innerHTML = `<option>${"speechSynthesis" in window ? "Default English voice" : "No voice available"}</option>`; sel.disabled = true; const n = $("#voiceNote"); if (n) n.textContent = "No British voice installed. On iPhone: Settings › Accessibility › Spoken Content › Voices › English (UK). On Windows: Settings › Time & language › Speech."; return; }
  const cur = TTS.voice();
  const sys = isIOS() ? `<option value="system" ${(myVoice() === "system" || !myVoice()) ? "selected" : ""}>iPhone voice (the one set in Settings › Spoken Content)</option>` : "";
  sel.disabled = false; sel.innerHTML = sys + TTS.list.map(vc => `<option value="${esc(vc.voiceURI || vc.name)}" ${cur && vc === cur && myVoice() !== "system" && (myVoice() || !isIOS()) ? "selected" : ""}>${esc(vc.name)}${voiceQ(vc).label ? " · " + voiceQ(vc).label : ""}</option>`).join("");
  sel.onchange = () => { setMyVoice(sel.value); TTS.speak("Lovely. This is how I sound."); };
  const best = TTS.list.length ? voiceQ(TTS.list[0]) : null;
  const n = $("#voiceNote"); if (n) n.textContent = TTS.list.length + " British voice" + (TTS.list.length > 1 ? "s" : "") + " on this device" + (best && best.score < 2 && /iPhone|iPad|Mac/i.test(navigator.userAgent) ? ". For a more natural voice, download a Premium or Enhanced UK voice (Settings › Accessibility › Spoken Content › Voices › English › English (UK)), then close and reopen the app." : best && best.label ? "." : ".");
}
function bindRate(v) { $$("#rate button", v).forEach(b => b.onclick = () => { S.settings.rate = +b.dataset.r; save(); $$("#rate button", v).forEach(x => x.setAttribute("aria-pressed", x === b)); }); }
function lcsDiff(target, given) {
  const T = target.split(/\s+/), G = given.split(/\s+/).filter(Boolean);
  const nt = T.map(norm), ng = G.map(norm);
  const n = nt.length, m = ng.length, dp = Array.from({length:n + 1}, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = nt[i] === ng[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  let i = 0, j = 0; const out = [];
  while (i < n || j < m) {
    if (i < n && j < m && nt[i] === ng[j]) { out.push(`<span class="ok">${esc(T[i])}</span>`); i++; j++; }
    else if (j < m && (i >= n || dp[i][j + 1] >= dp[i + 1][j])) { out.push(`<span class="extra">${esc(G[j])}</span>`); j++; }
    else { out.push(`<span class="miss">${esc(T[i])}</span>`); i++; }
  }
  return {html:out.join(" "), score:n ? dp[0][0] / n : 0};
}
function viewListening(v, id) {
  const L = allListening().find(x => x.id === id); if (!L) return viewListenList(v);
  const speakers = [...new Set(L.lines.map(l => l[0]))];
  v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Listening</button></div>
  <div class="hello"><span class="eyebrow" style="color:var(--green)">${esc(L.topic)}</span><h1>${esc(L.title)}</h1><p class="muted">Step 1: listen without the transcript. Step 2: answer. Step 3: dictation.</p><p class="muted" style="font-size:.8rem">${BANK.listening.includes(L) ? "Original script written for this app; the situation and people are fictional." : "Generated by Gemini for practice; fictional."}</p></div>
  ${aiOn() ? `<div class="card stack natural"><div class="row"><button class="btn primary" id="natB">${I.speaker} Natural voices</button><small class="muted" id="natMsg">British voices generated by Gemini — much more human. The first time takes ≈10–40 s; then it works offline.</small></div><audio id="natA" controls preload="auto" hidden></audio></div>` : ""}
  <div class="card player"><div class="wave" id="wave">${"<i></i>".repeat(32)}</div>
    <div class="row"><button class="btn ${aiOn() ? "" : "primary"}" id="playB">${I.speaker} ${aiOn() ? "Device voice" : "Play"}</button><button class="btn" id="stopB" hidden>${I.stop} Stop</button><div class="seg-ctl" id="rate">${[0.8, 0.9, 1, 1.1].map(r => `<button aria-pressed="${S.settings.rate === r}" data-r="${r}">${r}×</button>`).join("")}</div><span class="spacer"></span><button class="btn small ghost" id="tr">Show transcript</button></div>
    <div class="transcript" id="trBox" hidden>${L.lines.map((l, i) => `<p data-i="${i}"><span class="spk">${esc(l[0])}</span>${esc(l[1])}</p>`).join("")}</div></div>
  <div class="card stack" id="quiz"><h2>Questions</h2>${L.q.map((q, i) => `<div class="stack" data-q="${i}"><p><b>${i + 1}.</b> ${esc(q.q)}</p><div class="opts">${q.o.map((o, j) => `<button class="opt" data-j="${j}">${esc(o)}</button>`).join("")}</div></div>`).join("")}<div id="qres"></div></div>
  <div class="card stack"><h2>Dictation</h2><p class="muted">Listen and type exactly what you hear. Punctuation doesn't count; spelling does.</p>
  ${(L.dict || []).map((d, i) => `<div class="stack" data-d="${i}"><div class="row"><button class="btn small" data-say="${i}">${I.speaker} Sentence ${i + 1}</button><button class="btn small ghost" data-slow="${i}">${I.slow} Slowly</button></div><textarea class="answer" rows="2" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Dictation ${i + 1}"></textarea><div class="row"><button class="btn small primary" data-chk="${i}">Check</button></div><div class="diff" data-out="${i}"></div></div>`).join("")}</div>`;
  $("#bk", v).onclick = () => go("listen");
  const M = chunkMiner(L.title, L.lines.map(l => l[1]).join(" ")); v.insertAdjacentHTML("beforeend", M.html); M.mount(v);
  bindRate(v);
  const natB = $("#natB", v), natA = $("#natA", v);
  if (natB) {
    const key = L.id + ":gtts1", lines = L.lines.map(l => [l[0], l[1]]);
    window.MTG.hasCachedAudio(key).then(h => { if (h) $("#natMsg", v).textContent = "Saved on this device — works offline."; });
    $$("#rate button", v).forEach(b => b.addEventListener("click", () => { natA.playbackRate = +b.dataset.r; }));
    natB.onclick = async () => {
      TTS.stop();
      // iPhone: "desbloquear" el reproductor dentro del toque, antes de esperar a Gemini
      try { natA.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA="; natA.play().catch(() => {}); } catch (e) {}
      natB.disabled = true; $("#natMsg", v).innerHTML = `<span class="spin"></span> Recording the voices…`;
      try {
        const blob = await window.MTG.cachedAudio(key, lines);
        if (natA.dataset.url) URL.revokeObjectURL(natA.dataset.url);
        const url = URL.createObjectURL(blob); natA.dataset.url = url; natA.src = url; natA.hidden = false; natA.playbackRate = S.settings.rate || 1;
        $("#natMsg", v).textContent = "Saved on this device — works offline.";
        natA.play().catch(() => { $("#natMsg", v).textContent = "Ready — tap ▶ to play."; });
      } catch (e) { $("#natMsg", v).textContent = aiErr(e) + " You can use the device voice below."; }
      natB.disabled = false;
    };
  }
  $("#tr", v).onclick = (e) => { const b = $("#trBox", v); b.hidden = !b.hidden; e.target.textContent = b.hidden ? "Show transcript" : "Hide transcript"; };
  const play = $("#playB", v), stop = $("#stopB", v), wave = $("#wave", v);
  play.onclick = async () => {
    play.hidden = true; stop.hidden = false; wave.classList.add("on");
    for (let i = 0; i < L.lines.length; i++) {
      $$("#trBox p", v).forEach(p => p.classList.toggle("now", +p.dataset.i === i));
      const si = speakers.indexOf(L.lines[i][0]);
      const ok = await TTS.speak(L.lines[i][1], {voice:si, pitch:(TTS.list.length > 1 && TTS.voice(si)) ? 1 : (si ? 0.82 : 1.05)});
      if (!ok) break;
      await new Promise(r => setTimeout(r, 350));
    }
    wave.classList.remove("on"); play.hidden = false; stop.hidden = true; $$("#trBox p", v).forEach(p => p.classList.remove("now"));
  };
  stop.onclick = () => { TTS.stop(); };
  const ans = {};
  $$("#quiz [data-q]", v).forEach(box => {
    const qi = +box.dataset.q, q = L.q[qi];
    $$(".opt", box).forEach(b => b.onclick = () => {
      if (ans[qi] != null) return; const j = +b.dataset.j; ans[qi] = j === q.a;
      $$(".opt", box).forEach(x => { x.disabled = true; if (+x.dataset.j === q.a) x.classList.add("right"); }); if (j !== q.a) b.classList.add("wrong");
      record("listening", j === q.a);
      if (Object.keys(ans).length === L.q.length) {
        const score = Object.values(ans).filter(Boolean).length, xp = score * 15 + 20;
        S.listen[L.id] = {score, at:dayKey()}; addXP(xp); markDone("listen");
        $("#qres", v).innerHTML = `<div class="feedback ${score >= 3 ? "ok" : "ko"} pop"><b class="t">${score}/${L.q.length} · +${xp} XP</b><p>${score === L.q.length ? "Sharp ears." : "Open the transcript and replay the part you missed."}</p></div>`;
      }
    });
  });
  $$("[data-say]", v).forEach(b => b.onclick = () => TTS.speak(L.dict[+b.dataset.say]));
  $$("[data-slow]", v).forEach(b => b.onclick = () => TTS.speak(L.dict[+b.dataset.slow], {slow:true}));
  $$("[data-chk]", v).forEach(b => b.onclick = () => {
    const i = +b.dataset.chk, ta = $(`[data-d="${i}"] textarea`, v);
    if (!ta.value.trim()) return toast("Type what you heard first.");
    const r = lcsDiff(L.dict[i].replace(/[.,!?;:—–"“”]/g, ""), ta.value.replace(/[.,!?;:—–"“”]/g, ""));
    $(`[data-out="${i}"]`, v).innerHTML = `<p>${r.html}</p><p class="muted">${Math.round(r.score * 100)}% accurate${r.score === 1 ? " · +20 XP" : ""}. Red underline = missed or misspelt; strikethrough = extra.</p>`;
    record("listening", r.score >= 0.9); record("spelling", r.score >= 0.95);
    if (r.score === 1) addXP(20); else { addXP(Math.round(r.score * 10)); addCard({k:"mistake", f:"Dictation: " + ta.value.trim(), b:L.dict[i], ex:"From: " + L.title}); }
  });
}

/* ---------- writing ---------- */
const DRAFT_KEY = "mtg-drafts";
const drafts = (() => { try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}"); } catch (e) { return {}; } })();
function saveDraft(id, txt) { drafts[id] = txt; try { localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts)); } catch (e) {} }
const LOCAL_RULES = [
  [/\binformations\b/i, "information (uncountable)"], [/\badvices\b/i, "advice (uncountable)"], [/\bdepends? of\b/i, "depend on"], [/\bdiscuss(ed)? about\b/i, "discuss (no 'about')"],
  [/\bexplain(ed)? me\b/i, "explain to me"], [/\bI am agree\b/i, "I agree"], [/\bdespite of\b/i, "despite / in spite of"], [/\bprogresses\b/i, "progress (uncountable)"],
  [/\bpeople is\b/i, "people are"], [/\bthe news are\b/i, "the news is"], [/\bsuggest(ed)? me to\b/i, "suggest that I… / suggest -ing"], [/\bwant(s)? that\b/i, "want someone to…"],
  [/\bactual(ly)? (CEO|situation|manager|price)\b/i, "current (actual = real)"], [/\bassist(ed)? (to|the) (meeting|conference|class)\b/i, "attend (assist = help)"], [/(^|[.!?]\s+)is important\b/i, "It is important… (needs a subject)"],
  [/\bmore (big|small|tall|cheap|fast|easy|hard|long|short)\b/i, "short adjective: -er (bigger…)"], [/\bmake a (photo|party)\b/i, "take a photo / have a party"], [/\bloose\b/i, "lose (verb) vs loose (adjective)?"],
  [/\b(I|you|we|they) was\b/i, "were"], [/\bhe have\b|\bshe have\b|\bit have\b/i, "has"], [/\bcould of\b|\bshould of\b|\bwould of\b/i, "could/should/would have"], [/\balot\b/i, "a lot (two words)"],
  [/\bin the other hand\b/i, "on the other hand"], [/\bfor example,?\s*:/i, "for example (no colon)"]
];
const MISSPELL = {"accomodation":"accommodation","neccessary":"necessary","necesary":"necessary","seperate":"separate","definately":"definitely","occurence":"occurrence","embarass":"embarrass","colleage":"colleague","comittee":"committee","garantee":"guarantee","enviroment":"environment","goverment":"government","bussiness":"business","recieve":"receive","arguement":"argument","succesful":"successful","sucessful":"successful","begining":"beginning","adress":"address","recomend":"recommend","reccomend":"recommend","maintainance":"maintenance","pronounciation":"pronunciation","tommorow":"tomorrow","tomorow":"tomorrow","wich":"which","wheter":"whether","untill":"until","becouse":"because","responsability":"responsibility","oportunity":"opportunity","proffesional":"professional","profesional":"professional","developement":"development","independant":"independent","existance":"existence","acheive":"achieve","beleive":"believe","finaly":"finally","realy":"really","comming":"coming","writting":"writing","tecnology":"technology","exemple":"example","organization":"organisation (UK)","analyze":"analyse (UK)","behavior":"behaviour (UK)","color":"colour (UK)","center":"centre (UK)","favorite":"favourite (UK)","program":"programme (UK, unless software)","traveled":"travelled (UK)","canceled":"cancelled (UK)","realize":"realise (UK)","recognize":"recognise (UK)","prioritize":"prioritise (UK)","optimize":"optimise (UK)","labor":"labour (UK)","defense":"defence (UK)","license":"licence (UK noun)"};
function localCheck(text) {
  const out = [];
  LOCAL_RULES.forEach(([re, fix]) => { const m = text.match(re); if (m) out.push({original:m[0], correction:fix, type:"grammar"}); });
  (text.match(/[A-Za-z]+/g) || []).forEach(w => { const f = MISSPELL[w.toLowerCase()]; if (f && !out.some(o => o.original === w)) out.push({original:w, correction:f, type:"spelling"}); });
  return out;
}
function viewWriteList(v) {
  v.innerHTML = `<div class="hello"><span class="eyebrow" style="color:var(--amber)">Writing</span><h1>Write. Get marked. Improve.</h1><p class="muted">Real Cambridge tasks, marked on the four official criteria (Content, Communicative Achievement, Organisation, Language), with every spelling and grammar error explained in Spanish. Then you rewrite it: a correction isn't finished until you do.</p></div>
  ${(() => { const w = nextWritingTask(), pw = pendingRewrite(); return `<div class="grid"><button class="card tile" data-goto="write-${w.id}" style="--c:var(--amber)"><span class="tag">This week · by hand · 45 min</span><h3>${esc(w.type)}</h3><p class="muted">The text type you haven't written for longest.</p></button><button class="card tile" data-goto="${pw ? "rewrite" : "micro"}" style="--c:var(--amber)"><span class="tag">${pw ? "Pending" : "10 minutes"}</span><h3>${pw ? "Rewrite your " + esc(pw.type.toLowerCase()) : "Micro-exercises"}</h3><p class="muted">${pw ? "From memory, with the corrections hidden." : "Paraphrase, raise the register, join with linkers, write only the introduction."}</p></button></div><h2>The five text types</h2>${Object.keys(C1.GENRES).map(g => guideHTML(g)).join("")}<h2 style="margin-top:8px">All tasks</h2>`; })()}
  <div class="list">${BANK.writing.map(w => { const last = S.writings.filter(x => x.task === w.id).slice(-1)[0];
    return `<button class="card item" data-id="${w.id}" style="--c:var(--amber)"><span class="badge">${I.pen}</span><span class="txt"><b>${esc(w.type)} · ${esc(w.prompt.split(/[.:]/)[0].slice(0, 70))}…</b><small>${w.level} · ${w.words} words${drafts[w.id] ? " · draft saved" : ""}</small></span>${last && last.fb ? `<span class="check">${last.fb.total}/20</span>` : `<span class="go muted">${I.arrow}</span>`}</button>`; }).join("")}</div>
  <div class="card stack" style="--c:var(--amber)"><h3>Sentence upgrader</h3><p class="muted">Paste any sentence you'd write at work. See it at C1 and C2.</p><textarea class="answer" id="up" rows="3" spellcheck="false" placeholder="e.g. We have a lot of problems with the project because the supplier is late."></textarea><div><button class="btn ai" id="upBtn" ${aiOn() ? "" : "disabled"}>${I.sparkle} Upgrade it</button></div><div class="ai-out" id="upOut" hidden></div></div>
  ${S.writings.length ? `<div class="card stack"><h3>Your marked work</h3>${S.writings.slice().reverse().slice(0, 8).map(w => `<div class="row"><span class="mono">${w.date}</span><span>${esc(w.type)}</span><span class="spacer"></span><b class="mono">${w.fb ? w.fb.total + "/20 · " + (w.fb.level || "") : "self-checked"}</b></div>`).join("")}</div>` : ""}`;
  $$(".item[data-id]", v).forEach(b => b.onclick = () => go("write-" + b.dataset.id));
  $$("[data-goto]", v).forEach(b => b.onclick = () => go(b.dataset.goto)); bindGuide(v);
  const ub = $("#upBtn", v); ub.onclick = async () => {
    const t = $("#up", v).value.trim(); if (words(t) < 3) return toast("Write a sentence first.");
    ub.disabled = true; const o = $("#upOut", v); o.hidden = false; o.textContent = "Thinking…";
    try { await ai(`${LEARNER}\nSentence: """${t}"""\nIn plain text:\n1) Corrected (if needed), British spelling.\n2) C1 version.\n3) C2 version (more idiomatic/formal as appropriate).\n4) In Spanish, 2-3 bullet points on the language moves you used (e.g. inversion, nominalisation, collocation), so the learner can reuse them.\nUnder 140 words.`, {modelTier:"default", cache:false, onText:({text}) => o.textContent = text}); addXP(10); }
    catch (e) { o.textContent = aiErr(e); } ub.disabled = false;
  };
}
/* ---------- review ---------- */
function nextDue() { const d = S.deck.map(c => c.due).sort()[0]; if (!d) return "later"; return d === addDays(dayKey(), 1) ? "tomorrow" : "on " + d; }

/* ---------- progress ---------- */
function viewProgress(v) {
  const li = level();
  const weeks = 12, start = addDays(dayKey(), -(weeks * 7 - 1));
  const cells = []; for (let i = 0; i < weeks * 7; i++) { const k = addDays(start, i), x = S.days[k]?.xp || 0; cells.push(`<i title="${k}: ${x} XP" class="${x >= S.settings.goal ? "l3" : x >= S.settings.goal / 2 ? "l2" : x > 0 ? "l1" : ""}"></i>`); }
  const skills = ["uoe", "reading", "listening", "writing", "grammar", "spelling", "vocab", "speaking"];
  const ws = S.writings.filter(w => w.fb).slice(-10);
  v.innerHTML = `<div class="hello"><span class="eyebrow">Progress</span><h1>Mission control</h1><p class="muted">${S.xp.toLocaleString("en-GB")} XP · level ${LEVELS[li].n} · streak ${liveStreak()} · best ${S.best || 0}</p></div>
  <div class="card stack">${levelLine()}</div>
  <div class="card stack"><div class="row"><h3>Practice accuracy by skill</h3></div><p class="muted" style="font-size:.85rem">Share of right answers in your last 80 per skill, with the app's own questions. Practice data, not a score estimate.</p>
  <div class="stack">${skills.map(k => { const a = acc(k), s = scale(k); return `<div class="skillrow"><span>${SKILLS[k].n}</span><div class="bar" style="--c:${SKILLS[k].c}"><i style="--p:${a == null ? 0 : a * 100}%"></i></div><span class="mono">${a == null ? "—" : Math.round(a * 100) + "%"}</span></div>`; }).join("")}</div></div>
  <div class="card stack"><h3>Last 12 weeks</h3><div style="display:grid;grid-template-columns:repeat(${weeks},1fr);grid-auto-flow:column;grid-template-rows:repeat(7,auto);gap:4px">${cells.map(c => c.replace("<i ", '<i style="aspect-ratio:1;border-radius:3px;display:block" ')).join("")}</div><p class="muted" style="font-size:.8rem">Darker = closer to your daily goal.</p></div>
  ${ws.length ? `<div class="card stack"><h3>Writing scores</h3><svg viewBox="0 0 320 120" style="width:100%;max-width:640px" role="img" aria-label="Writing scores over time">
    ${[0, 5, 10, 15, 20].map(y => `<line x1="28" x2="312" y1="${108 - y * 5}" y2="${108 - y * 5}" stroke="var(--line)"/><text x="22" y="${112 - y * 5}" text-anchor="end" font-size="9" fill="var(--muted)">${y}</text>`).join("")}
    <polyline fill="none" stroke="var(--amber)" stroke-width="2.5" points="${ws.map((w, i) => `${28 + (ws.length === 1 ? 142 : i * 284 / (ws.length - 1))},${108 - w.fb.total * 5}`).join(" ")}"/>
    ${ws.map((w, i) => `<circle cx="${28 + (ws.length === 1 ? 142 : i * 284 / (ws.length - 1))}" cy="${108 - w.fb.total * 5}" r="${i === ws.length - 1 ? 5 : 3.5}" fill="var(--amber)"/>`).join("")}</svg></div>` : ""}
  <div class="card stack"><h3>Totals</h3><div class="scores">
   <div class="score"><small class="muted">Questions answered</small><b>${Object.values(S.stats).reduce((a, s) => a + (s.n || 0), 0)}</b></div>
   <div class="score"><small class="muted">Articles read</small><b>${Object.keys(S.read).length}</b></div>
   <div class="score"><small class="muted">Recordings</small><b>${Object.keys(S.listen).length}</b></div>
   <div class="score"><small class="muted">Texts marked</small><b>${S.writings.length}</b></div>
   <div class="score"><small class="muted">Review cards</small><b>${S.deck.length}</b></div></div></div>`;
  $(".hello", v).insertAdjacentHTML("afterend", dashHTML()); bindDash(v);
}

/* ---------- Real British: real recordings + Gemini exercises ---------- */
function ytId(u) {
  const m = String(u || "").trim().match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/))([A-Za-z0-9_-]{11})/) || String(u || "").trim().match(/^([A-Za-z0-9_-]{11})$/);
  return m ? m[1] : null;
}
function realVideo(id) { return (BANK.real || []).find(x => x.yt === id) || (S.realCustom || []).find(x => x.yt === id) || null; }
function ytEmbed(id, start = 0, end = 0, auto = false) {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1&modestbranding=1${start ? "&start=" + Math.max(0, Math.floor(start)) : ""}${end ? "&end=" + Math.floor(end) : ""}${auto ? "&autoplay=1" : ""}`;
}
const fmtT = s => { s = Math.max(0, Math.floor(+s || 0)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };

function viewRealList(v) {
  S.realEx = S.realEx || {}; S.realCustom = S.realCustom || [];
  const all = (BANK.real || []).concat(S.realCustom);
  const topics = ["All"].concat([...new Set(all.map(x => x.topic))]);
  let f = "All";
  const paint = () => {
    const list = all.filter(x => f === "All" || x.topic === f);
    $("#rl", v).innerHTML = list.map(x => { const ex = S.realEx[x.yt]; return `<button class="card item realitem" data-yt="${esc(x.yt)}" style="--c:var(--red)">
      <img class="thumb" alt="" loading="lazy" src="https://i.ytimg.com/vi/${esc(x.yt)}/mqdefault.jpg">
      <span class="txt"><b>${esc(x.t)}</b><small>${esc(x.src || "YouTube")} · ${esc(x.topic || "")}${x.mins ? " · " + x.mins + " min" : ""}${x.long ? " · long" : ""}</small>${ex && ex.done ? `<small class="mono">Score ${ex.done.r}/${ex.done.n}</small>` : ex ? `<small class="mono">Exercises ready</small>` : ""}</span></button>`; }).join("");
    $$("[data-yt]", v).forEach(b => b.onclick = () => go("real-" + b.dataset.yt));
  };
  v.innerHTML = `<button class="btn small" id="back">${I.back} Listening</button>
  <div class="hello"><span class="eyebrow" style="color:var(--red)">Real British</span><h1>Real people, real voices</h1><p class="muted">Real recordings of British speakers: BBC Learning English, F1 engineers, UK engineers. ${aiOn() ? "Gemini watches the video and builds the exercises for you: questions, key vocabulary in Spanish and dictation with the real audio." : "Add your Gemini key in Settings (⚙) so Gemini can build exercises from each video. You can still watch them."} Needs internet.</p></div>
  <div class="card stack"><h3>Practise with any video</h3><p class="muted" style="font-size:.85rem">Paste a YouTube link (a talk, an interview, a podcast…). British speakers work best.</p>
   <div class="row"><input class="answer" id="url" inputmode="url" autocomplete="off" placeholder="https://youtu.be/…" style="flex:1;min-width:0"><button class="btn primary" id="addv">Open</button></div></div>
  <div class="seg-ctl" id="tp" style="flex-wrap:wrap">${topics.map(t => `<button data-t="${esc(t)}" aria-pressed="${t === f}">${esc(t)}</button>`).join("")}</div>
  <div class="list" id="rl"></div>`;
  $("#back", v).onclick = () => go("listen");
  $$("#tp button", v).forEach(b => b.onclick = () => { f = b.dataset.t; $$("#tp button", v).forEach(x => x.setAttribute("aria-pressed", x === b)); paint(); });
  $("#addv", v).onclick = () => {
    const id = ytId($("#url", v).value);
    if (!id) return toast("That doesn't look like a YouTube link.");
    if (!realVideo(id)) { S.realCustom.unshift({yt:id, t:"Your video", src:"YouTube", topic:"Mine", custom:true}); S.realCustom = S.realCustom.slice(0, 30); save(); }
    go("real-" + id);
  };
  paint();
}

function viewReal(v, id) {
  S.realEx = S.realEx || {};
  const V = realVideo(id) || {yt:id, t:"YouTube video", src:"YouTube", topic:"Mine"};
  let ex = S.realEx[id];
  const watch = "https://www.youtube.com/watch?v=" + id;
  v.innerHTML = `<button class="btn small" id="back">${I.back} Real British</button>
  <div class="hello"><span class="eyebrow" style="color:var(--red)">${esc(V.src || "YouTube")} · ${esc(V.topic || "")}</span><h1 id="vt">${esc((ex && ex.title) || V.t)}</h1></div>
  <div class="video"><iframe id="yt" src="${ytEmbed(id)}" title="Video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
  <p class="muted" style="font-size:.8rem">Step 1: watch it once without help. Step 2: answer. Step 3: learn the key phrases and write what you hear. <a href="${watch}" target="_blank" rel="noopener">Open on YouTube</a> if it doesn't play here.</p>
  <div id="exs"></div>`;
  $("#back", v).onclick = () => go("real");
  const seek = (t, end) => { const f = $("#yt", v); if (f) { f.src = ytEmbed(id, t, end, true); f.scrollIntoView({behavior:"smooth", block:"center"}); } };
  const box = $("#exs", v);
  const build = async () => {
    if (!aiOn()) { box.innerHTML = `<div class="card"><p class="muted">Add your Gemini key in Settings (⚙) and Gemini will create questions, vocabulary in Spanish and a dictation from this video.</p></div>`; return; }
    box.innerHTML = `<div class="card"><p class="muted"><span class="spin"></span> Gemini is watching the video and preparing your exercises… (≈30–90 s${V.long ? ", longer for this one" : ""})</p></div>`;
    try {
      aiTick(); const r = await SAMPLE.videoJSON(`${LEARNER}
Watch and listen to this video carefully. Build a listening exercise based ONLY on what is actually said in it.
Reply with only a JSON object:
{"title": a short title for the video (English),
 "summary_es": 2 sentences in Spanish summarising it,
 "speakers": short description of who speaks and their accents (English),
 "level": "B2|C1|C2",
 "questions": [6 multiple-choice comprehension questions in English, testing detail, opinion and inference, in the order they appear: {"q": question, "o": [4 options], "a": index 0-3 of the correct option, "t": second in the video where the answer is, "why_es": short explanation in Spanish}],
 "vocab": [8 useful C1/C2 words or phrases actually said in the video: {"p": the phrase, "m": meaning in simple English, "es": Spanish translation and when to use it (max 15 words), "t": second where it is said}],
 "dict": [3 short sentences (8–14 words) said clearly in the video, copied exactly as spoken: {"s": exact sentence, "t": second where it starts}]}
Use the real timestamps. Do not invent content that is not in the video.`, watch);
      if (!r || !Array.isArray(r.questions) || !r.questions.length) throw {code:"invalid_json"};
      r.questions = r.questions.filter(q => q && q.q && Array.isArray(q.o) && q.o.length >= 2 && Number.isInteger(+q.a)).slice(0, 8);
      r.vocab = (Array.isArray(r.vocab) ? r.vocab : []).filter(x => x && x.p).slice(0, 10);
      r.dict = (Array.isArray(r.dict) ? r.dict : []).filter(x => x && x.s).slice(0, 4);
      r.made = dayKey();
      S.realEx[id] = r; ex = r;
      if (V.custom && r.title) { V.t = r.title; }
      save(); $("#vt", v).textContent = r.title || V.t; render();
    } catch (e) { box.innerHTML = `<div class="card stack"><p>${esc(aiErr(e))}</p><div><button class="btn" id="retry">Try again</button></div></div>`; $("#retry", box).onclick = build; }
  };
  const render = () => {
    const ans = {};
    box.innerHTML = `
    ${ex.summary_es ? `<div class="card stack"><div class="row"><span class="chip">${esc(ex.level || "")}</span><small class="muted">${esc(ex.speakers || "")}</small></div><details><summary class="muted">Resumen en castellano (míralo después)</summary><p>${esc(ex.summary_es)}</p></details></div>` : ""}
    <div class="card stack"><h2>Questions</h2>${ex.questions.map((q, i) => `<div class="stack rq" data-q="${i}"><p><b>${i + 1}. ${esc(q.q)}</b></p><div class="opts">${q.o.map((o, j) => `<button class="opt" data-j="${j}">${esc(o)}</button>`).join("")}</div><div class="rqf"></div></div>`).join("")}<div id="rres"></div></div>
    ${ex.vocab.length ? `<div class="card stack"><div class="row"><h2>Key phrases</h2><span class="spacer"></span><button class="btn small" id="addAll">Add all to review</button></div>${ex.vocab.map((w, i) => `<div class="vocab"><div class="row"><b>${esc(w.p)}</b><span class="spacer"></span>${w.t != null ? `<button class="btn small ghost" data-seek="${+w.t}">${I.speaker} ${fmtT(w.t)}</button>` : ""}</div><small class="muted">${esc(w.m || "")}</small>${w.es ? `<p class="es"><span class="flag">ES</span> ${esc(w.es)}</p>` : ""}</div>`).join("")}</div>` : ""}
    ${ex.dict.length ? `<div class="card stack"><h2>Dictation — real audio</h2><p class="muted" style="font-size:.85rem">Play the moment, listen (as many times as you need) and write exactly what they say.</p>${ex.dict.map((d, i) => `<div class="stack"><div class="row"><button class="btn small" data-seek="${Math.max(0, (+d.t || 0) - 1)}" data-end="${(+d.t || 0) + 8}">${I.speaker} Play ${fmtT(d.t)}</button></div><textarea class="answer" rows="2" data-di="${i}" autocapitalize="sentences" placeholder="Write what you hear…"></textarea><div class="row"><button class="btn small" data-chk="${i}">Check</button></div><div data-dout="${i}"></div></div>`).join("")}</div>` : ""}
    <p class="muted" style="font-size:.8rem">Exercises generated by Gemini from the video${ex.made ? " on " + ex.made : ""}. If something doesn't match what you hear, trust your ears. <button class="btn small ghost" id="regen">Make new exercises</button></p>`;
    $$(".rq", box).forEach(el => { const i = +el.dataset.q, q = ex.questions[i];
      $$(".opt", el).forEach(b => b.onclick = () => {
        if (i in ans) return; const j = +b.dataset.j, ok = j === +q.a; ans[i] = ok;
        $$(".opt", el).forEach(x => { x.disabled = true; if (+x.dataset.j === +q.a) x.classList.add("right"); });
        if (!ok) b.classList.add("wrong");
        record("listening", ok); S.seen["real-" + id + "-" + i] = ok ? 1 : -1;
        $(".rqf", el).innerHTML = `<div class="row" style="gap:8px;align-items:flex-start">${q.why_es ? `<p class="es" style="flex:1"><span class="flag">ES</span> ${esc(q.why_es)}</p>` : `<span class="spacer"></span>`}${q.t != null ? `<button class="btn small ghost" data-seek="${Math.max(0, +q.t - 3)}">${I.speaker} Replay ${fmtT(q.t)}</button>` : ""}</div>`;
        bindSeek(el);
        if (Object.keys(ans).length === ex.questions.length) {
          const r = Object.values(ans).filter(Boolean).length, xp = r * 15 + 25; addXP(xp); markDone("listen");
          ex.done = {r, n:ex.questions.length, d:dayKey()}; save();
          $("#rres", box).innerHTML = `<div class="feedback ${r >= ex.questions.length * 0.6 ? "ok" : "ko"} pop"><b class="t">${r}/${ex.questions.length} · +${xp} XP</b><p>${r === ex.questions.length ? "Brilliant — real-speed British English, no problem." : "Use the Replay buttons to hear the parts you missed."}</p></div>`;
          if (r === ex.questions.length) confetti();
        }
      }); });
    const bindSeek = root => $$("[data-seek]", root).forEach(b => b.onclick = () => seek(+b.dataset.seek, b.dataset.end ? +b.dataset.end : 0));
    bindSeek(box);
    const aa = $("#addAll", box); if (aa) aa.onclick = () => { ex.vocab.forEach(w => addCard({k:"vocab", f:w.p, b:(w.m || "") + (w.es ? " — " + w.es : ""), ex:V.t})); aa.disabled = true; aa.textContent = "Added ✓"; toast("Added to your review deck."); };
    $$("[data-chk]", box).forEach(b => b.onclick = () => { const i = +b.dataset.chk, ta = $(`[data-di="${i}"]`, box);
      const r = lcsDiff(ex.dict[i].s.replace(/[.,!?;:—–"“”]/g, ""), ta.value.replace(/[.,!?;:—–"“”]/g, ""));
      $(`[data-dout="${i}"]`, box).innerHTML = `<p>${r.html}</p><p class="muted">${Math.round(r.score * 100)}% accurate${r.score === 1 ? " · +20 XP" : ""}.</p>`;
      if (r.score === 1) addXP(20); record("spelling", r.score >= 0.9); });
    $("#regen", box).onclick = () => { delete S.realEx[id]; ex = null; save(); build(); };
  };
  if (ex) render(); else build();
}

/* ---------- quick play: short rounds (2–5 min) ---------- */
const SHORT_TYPES = ["mc", "oc", "wf", "kwt", "err", "pv", "gram", "idioms", "work"];
const QUICK_MODES = [
  {id:"five", n:"Quick 5", t:"5 mixed questions · ≈2 min", c:"var(--red)"},
  {id:"mini", n:"Mini exam", t:"One of each type · ≈5 min", c:"var(--navy)"},
  {id:"fix", n:"Fix my mistakes", t:"5 questions you got wrong", c:"var(--amber)"},
  {id:"pv", n:"Phrasal verbs", t:"5 questions · ≈1 min", c:TYPES.pv.c, type:"pv"},
  {id:"gram", n:"Grammar flash", t:"5 questions · ≈1 min", c:TYPES.gram.c, type:"gram"},
  {id:"mc", n:"Collocations", t:"5 questions · ≈1 min", c:TYPES.mc.c, type:"mc"},
  {id:"oc", n:"Fill the gap", t:"5 open-cloze gaps · ≈2 min", c:TYPES.oc.c, type:"oc"},
  {id:"wf", n:"Word formation", t:"5 questions · ≈2 min", c:TYPES.wf.c, type:"wf"},
  {id:"kwt", n:"Transformations", t:"3 questions · ≈2 min", c:TYPES.kwt.c, type:"kwt", n_:3},
  {id:"err", n:"Spot the error", t:"5 sentences · ≈2 min", c:TYPES.err.c, type:"err"},
  {id:"idioms", n:"Idioms", t:"5 questions · ≈1 min", c:TYPES.idioms.c, type:"idioms"},
  {id:"work", n:"Work English", t:"5 questions · ≈1 min", c:TYPES.work.c, type:"work"},
  {id:"spell", n:"Spelling", t:"5 words · ≈2 min", c:TYPES.spell.c, type:"spell"}
];
function quickItems(id) {
  const m = QUICK_MODES.find(x => x.id === id); if (!m) return [];
  if (m.type) return pickItems(m.type, m.n_ || 5);
  if (id === "five") { const ts = shuffle(SHORT_TYPES.slice()).slice(0, 5); return shuffle(ts.flatMap(t => pickItems(t, 1))); }
  if (id === "mini") return ["mc", "oc", "wf", "kwt", "gram", "pv", "err", "idioms"].flatMap(t => pickItems(t, 1));
  if (id === "fix") return shuffle(SHORT_TYPES.flatMap(t => pool(t).filter(x => S.seen[x._id] === -1))).slice(0, 5);
  return [];
}
function viewQuick(v) {
  const wrong = SHORT_TYPES.reduce((a, t) => a + pool(t).filter(x => S.seen[x._id] === -1).length, 0);
  const last = S.quick || {};
  const card = m => { const l = last[m.id]; const dis = m.id === "fix" && !wrong;
    return `<button class="card tile" data-q="${m.id}" style="--c:${m.c}" ${dis ? "disabled" : ""}><h3>${esc(m.n)}</h3><p class="muted">${esc(m.id === "fix" ? (wrong ? `${Math.min(5, wrong)} of your ${wrong} mistakes · ≈2 min` : "No mistakes to fix yet") : m.t)}</p>${l ? `<div class="meta"><span class="mono">Last: ${l.r}/${l.n}${l.d === dayKey() ? " · today" : ""}</span></div>` : ""}</button>`; };
  v.innerHTML = `<div class="hello"><span class="eyebrow" style="color:var(--red)">Quick play</span><h1>Got two minutes?</h1><p class="muted">Short grammar and vocabulary rounds. No reading, listening or writing — just quick answers. Everything counts towards your XP and streak, and mistakes go to your review deck.</p></div>
  <h2>Mixed</h2><div class="grid">${QUICK_MODES.slice(0, 3).map(card).join("")}</div>
  <h2 style="margin-top:8px">One skill</h2><div class="grid quickgrid">${QUICK_MODES.slice(3).map(card).join("")}</div>`;
  $$("[data-q]", v).forEach(b => b.onclick = () => go("quick-" + b.dataset.q));
}
function startQuick(v, id) {
  const m = QUICK_MODES.find(x => x.id === id); if (!m) return go("quick");
  if (id === "spell") return viewGame(v, "spell", {items:pickItems("spell", 5), autostart:true, back:"quick", quick:id, title:m.n});
  const items = quickItems(id);
  if (!items.length) { toast("Nothing to practise here yet."); return go("quick"); }
  viewGame(v, m.type || "mc", {items, autostart:true, back:"quick", quick:id, title:m.n});
}

/* ---------- speaking (microphone + Gemini) ---------- */
const Rec = {
  stream: null, mr: null, chunks: [], mime: "",
  supported() { return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder); },
  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true, noiseSuppression:true}});
    const pref = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm", "audio/ogg"].find(t => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) || "";
    this.mr = new MediaRecorder(this.stream, pref ? {mimeType:pref} : undefined); this.mime = this.mr.mimeType || pref || "audio/webm"; this.chunks = [];
    this.mr.ondataavailable = e => { if (e.data && e.data.size) this.chunks.push(e.data); };
    this.mr.start();
  },
  stop() {
    return new Promise(res => {
      if (!this.mr || this.mr.state === "inactive") return res(null);
      this.mr.onstop = () => { const blob = new Blob(this.chunks, {type:this.mime}); this.release(); res(blob); };
      this.mr.stop();
    });
  },
  release() { try { this.stream && this.stream.getTracks().forEach(t => t.stop()); } catch (e) {} this.stream = null; },
  // Convierte cualquier grabación a WAV mono 16 kHz (formato que Gemini acepta siempre)
  async toWavBase64(blob) {
    const AC = window.AudioContext || window.webkitAudioContext; const ctx = new AC();
    const buf = await new Promise((ok, ko) => { blob.arrayBuffer().then(ab => ctx.decodeAudioData(ab, ok, ko)).catch(ko); });
    const rate = 16000, len = Math.ceil(buf.duration * rate);
    const off = new OfflineAudioContext(1, len, rate); const src = off.createBufferSource(); src.buffer = buf; src.connect(off.destination); src.start();
    const pcm = (await off.startRendering()).getChannelData(0); try { ctx.close(); } catch (e) {}
    const view = new DataView(new ArrayBuffer(44 + pcm.length * 2));
    const W = (o, s) => { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); };
    W(0, "RIFF"); view.setUint32(4, 36 + pcm.length * 2, true); W(8, "WAVE"); W(12, "fmt "); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
    view.setUint32(24, rate, true); view.setUint32(28, rate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true); W(36, "data"); view.setUint32(40, pcm.length * 2, true);
    for (let i = 0; i < pcm.length; i++) { const x = Math.max(-1, Math.min(1, pcm[i])); view.setInt16(44 + i * 2, x < 0 ? x * 0x8000 : x * 0x7fff, true); }
    const bytes = new Uint8Array(view.buffer); let bin = ""; for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return {b64:btoa(bin), secs:buf.duration};
  }
};
window.__mtgRec = Rec;  // depuración
async function aiAudioJSON(prompt, blob) { if (!SAMPLE || !SAMPLE.audioJSON) throw {code:"no_key"}; const w = await Rec.toWavBase64(blob); if (w.secs < 1) throw {code:"too_short"}; aiTick(); return SAMPLE.audioJSON(prompt, w.b64, "audio/wav", {modelTier:"default"}); }
function micError(e) { return e && e.name === "NotAllowedError" ? "Microphone access was blocked. Allow it in the browser (on iPhone: Settings › Safari › Microphone)." : e && e.code === "too_short" ? "That recording is too short. Try again." : aiErr(e); }
// Botón de grabar reutilizable: alterna grabar/parar y devuelve el blob
function recButton(btn, onBlob, maxSecs = 120) {
  let on = false, t0 = 0, tick = null;
  const idle = btn.innerHTML;
  btn.onclick = async () => {
    if (!Rec.supported()) return toast("This browser can't record audio.");
    if (!on) {
      try { TTS.stop(); await Rec.start(); } catch (e) { return toast(micError(e)); }
      on = true; t0 = Date.now(); btn.classList.add("red");
      const paint = () => { const s = Math.floor((Date.now() - t0) / 1000); btn.innerHTML = `${I.stop} Stop · ${s}s`; if (s >= maxSecs) btn.click(); };
      paint(); tick = setInterval(paint, 500);
    } else {
      on = false; clearInterval(tick); btn.classList.remove("red"); btn.innerHTML = idle;
      const blob = await Rec.stop(); if (blob) onBlob(blob);
    }
  };
  return () => { clearInterval(tick); if (on) { on = false; Rec.stop(); } };
}

function viewSpeakList(v) {
  const P = BANK.speak.prompts, done = S.speak || {};
  v.innerHTML = `<div class="hello"><span class="eyebrow" style="color:var(--red)">Speaking</span><h1>Find your voice</h1><p class="muted">Shadow native phrases, then answer real questions out loud. ${aiOn() ? "Gemini listens and marks your pronunciation, fluency, grammar and vocabulary." : "Add your Gemini key in Settings (⚙) to get your speaking marked. You can still record and compare offline."}</p></div>
  <button class="card tile" id="shadow" style="--c:var(--red)"><span class="tag">Daily · 5 sentences</span><h3>Shadowing</h3><p class="muted">Hear a British speaker, repeat, compare. The fastest way to sound natural in meetings.</p></button>
  <div class="grid"><button class="card tile" id="t432" style="--c:var(--red)"><span class="tag">Fluency · 9 minutes</span><h3>4/3/2</h3><p class="muted">The same talk in 4, 3 and 2 minutes. Repetition under time pressure builds fluency that carries over to new topics.</p></button>
  <button class="card tile" id="tp2" style="--c:var(--red)"><span class="tag">Exam · Part 2</span><h3>Long turn</h3><p class="muted">Compare two pictures and speculate for one minute.</p></button></div>
  <details class="card stack methodcard"><summary><b>Phrases for discussing, hedging and agreeing</b> <span class="muted">· Parts 3 and 4</span></summary><div class="stack">${C1.TALKPH.map(p => `<div class="errline"><b>${esc(p[0])}</b><small class="muted">${esc(p[1])}</small></div>`).join("")}</div><div><button class="btn small" id="addTalk">Add these phrases to review</button></div></details>
  <p class="notice">The real test is taken in pairs. Once a month, practise Parts 3 and 4 with another person and tick it off in Mission control.</p>
  <h2 style="margin-top:8px">Speak for a minute</h2>
  <div class="list">${P.map(p => `<button class="card tile" data-id="${p.id}" style="--c:var(--red)"><span class="tag">${esc(p.part)} · ${p.level}</span><p>${esc(p.q)}</p>${done[p.id] ? `<div class="meta"><span class="mono">Last score ${done[p.id].total}/20</span></div>` : ""}</button>`).join("")}</div>`;
  $("#shadow", v).onclick = () => go("speak-shadow");
  $("#t432", v).onclick = () => go("speak-432"); $("#tp2", v).onclick = () => go("speak-p2");
  $("#addTalk", v).onclick = (e) => { addPhrases(C1.TALKPH, "talk", "Speaking"); e.target.disabled = true; };
  $$("[data-id]", v).forEach(b => b.onclick = () => go("speak-" + b.dataset.id));
}

function viewShadow(v) {
  const all = BANK.speak.shadow.concat(BANK.listening.flatMap(l => (l.dict || []).map(s => ({s, f:l.title}))));
  const start = (dayIdx() * 5) % all.length, set = [0, 1, 2, 3, 4].map(i => all[(start + i) % all.length]);
  let i = 0, mine = null, url = null, stopRec = null;
  const paint = () => {
    const it = set[i];
    v.innerHTML = `<div class="hello"><span class="eyebrow" style="color:var(--red)">Shadowing · ${i + 1}/${set.length}</span><h1>Say it like a Brit</h1><p class="muted">1. Listen. 2. Record yourself. 3. Compare — rhythm, linking and stress matter more than accent.</p></div>
    <div class="card stack"><p style="font-size:1.25rem;line-height:1.5"><b>${esc(it.s)}</b></p>${it.f ? `<p class="muted" style="font-size:.85rem">Focus: ${esc(it.f)}</p>` : ""}
     <div class="row"><button class="btn" id="hear">${I.speaker} Listen</button><button class="btn" id="slowb">${I.slow} Slow</button><button class="btn red" id="rec">${I.mic} Record</button><button class="btn" id="me" ${mine ? "" : "disabled"}>${I.ear} Me</button></div>
     <div id="fb"></div></div>
    <div class="row"><button class="btn" id="prev" ${i ? "" : "disabled"}>${I.back} Back</button><span class="spacer"></span><button class="btn primary" id="next">${i === set.length - 1 ? "Finish" : "Next"} ${I.arrow}</button></div>`;
    $("#hear", v).onclick = () => TTS.speak(it.s); $("#slowb", v).onclick = () => TTS.speak(it.s, {slow:true});
    $("#me", v).onclick = () => { if (url) new Audio(url).play(); };
    stopRec = recButton($("#rec", v), async blob => {
      mine = blob; if (url) URL.revokeObjectURL(url); url = URL.createObjectURL(blob); $("#me", v).disabled = false;
      if (!aiOn()) { $("#fb", v).innerHTML = `<p class="muted">Recorded. Tap <b>Me</b> and compare with <b>Listen</b>.</p>`; return; }
      $("#fb", v).innerHTML = `<p class="muted"><span class="spin"></span> Listening to you…</p>`;
      try {
        const r = await aiAudioJSON(`You are a British English pronunciation coach. The learner is a Spanish native speaker (B2+). They were asked to repeat exactly this sentence in natural British English:\n"${it.s}"\nListen to the recording and reply with only a JSON object: {"heard": what you actually heard, "score": 0-10 overall (intelligibility, stress, rhythm, linking, sounds), "words": [{"word": a word or phrase they mispronounced, "tip_es": how to fix it in Spanish, max 18 words}] (max 4, empty if fine), "rhythm_es": one sentence in Spanish about stress/rhythm/linking, "praise": one short encouraging phrase in English}`, blob);
        const sc = Math.max(0, Math.min(10, +r.score || 0)); record("speaking", sc >= 7); addXP(5 + sc);
        $("#fb", v).innerHTML = `<div class="stack pop"><div class="row"><b>${esc(r.praise || "")}</b><span class="spacer"></span><b class="mono" style="font-size:1.3rem">${sc}/10</b></div>
          <p class="muted" style="font-size:.85rem">Heard: “${esc(r.heard || "")}”</p>
          ${(r.words || []).map(w => `<div class="errline"><span class="from">${esc(w.word)}</span><small class="muted">${esc(w.tip_es || "")}</small></div>`).join("")}
          ${r.rhythm_es ? `<p class="notice">${esc(r.rhythm_es)}</p>` : ""}</div>`;
        (r.words || []).forEach(w => addCard({k:"pron", f:w.word, b:w.tip_es || "", ex:it.s}));
      } catch (e) { $("#fb", v).innerHTML = `<p class="muted">${esc(micError(e))}</p>`; }
    }, 30);
    $("#prev", v).onclick = () => { stopRec && stopRec(); i--; mine = null; paint(); };
    $("#next", v).onclick = () => {
      stopRec && stopRec();
      if (i < set.length - 1) { i++; mine = null; paint(); return; }
      addXP(20); markDone("speak"); confetti(); toast("Shadowing done. Nicely spoken!"); go("today");
    };
  };
  paint();
  cleanup = () => { stopRec && stopRec(); Rec.release(); if (url) URL.revokeObjectURL(url); };
}

function viewSpeak(v, id) {
  const P = BANK.speak.prompts.find(p => p.id === id); if (!P) return go("speak");
  let stopRec = null, url = null;
  v.innerHTML = `<button class="btn small" id="back">${I.back} Speaking</button>
  <div class="hello"><span class="eyebrow" style="color:var(--red)">${esc(P.part)} · ${P.level}</span><h1>Speak for 60–90 seconds</h1></div>
  <div class="card stack"><p style="font-size:1.15rem;line-height:1.5"><b>${esc(P.q)}</b></p>
   <div class="row"><button class="btn" id="hear">${I.speaker} Read it to me</button></div>
   <p class="muted" style="font-size:.85rem">Tip: take 15 seconds to plan. Use linkers (<i>having said that, on top of that, at the end of the day</i>), give an example, and finish with a clear conclusion.</p>
   <div class="row"><button class="btn red" id="rec">${I.mic} Start speaking</button><button class="btn" id="me" disabled>${I.ear} Play back</button></div></div>
  <div id="res"></div>`;
  $("#back", v).onclick = () => go("speak"); $("#hear", v).onclick = () => TTS.speak(P.q);
  $("#me", v).onclick = () => { if (url) new Audio(url).play(); };
  const res = $("#res", v);
  stopRec = recButton($("#rec", v), async blob => {
    if (url) URL.revokeObjectURL(url); url = URL.createObjectURL(blob); $("#me", v).disabled = false;
    if (!aiOn()) { res.innerHTML = `<div class="card"><p class="muted">Recorded. Play it back and listen for hesitations, repeated words and missing linkers. Add your Gemini key in Settings to get it marked.</p></div>`; addXP(15); markDone("speak"); return; }
    res.innerHTML = `<div class="card"><p class="muted"><span class="spin"></span> The examiner is listening… (≈20–40 s)</p></div>`;
    try {
      const fb = await aiAudioJSON(`You are a senior Cambridge English speaking examiner. ${LEARNER}\nTask given to the candidate: "${P.q}"\nListen to the candidate's spoken answer and assess it at ${P.level} level using Cambridge speaking criteria. Be honest, not generous.\nReply with only a JSON object: {"transcript": accurate transcript of what they said, "scores": {"grammar": 0-5, "vocabulary": 0-5, "discourse": 0-5 (coherence, linkers, extent), "pronunciation": 0-5}, "level": "B1|B2|C1|C2", "summary_es": 2-3 sentences in Spanish, "errors": [{"original": exact words from the transcript, "correction": corrected version, "why_es": short reason in Spanish}] (max 8), "pron_es": [up to 3 pronunciation tips in Spanish], "upgrades": [up to 4 C1/C2 phrases they could have used, in English], "model_answer": a natural British C1/C2 answer of about 120 words}`, blob);
      const sc = fb.scores || {}; fb.total = ["grammar", "vocabulary", "discourse", "pronunciation"].reduce((a, k) => a + (+sc[k] || 0), 0);
      fb.errors = Array.isArray(fb.errors) ? fb.errors.filter(e => e && e.original) : [];
      S.speak = S.speak || {}; S.speak[id] = {date:dayKey(), total:fb.total};
      fb.errors.forEach(e => addCard({k:"mistake", f:e.original, b:e.correction + (e.why_es ? " — " + e.why_es : ""), ex:"Speaking"}));
      record("speaking", fb.total >= 12); addXP(40 + fb.total * 5); markDone("speak");
      res.innerHTML = `<div class="card stack pop"><div class="row"><h2>Examiner's report</h2><span class="spacer"></span><b class="mono" style="font-size:1.4rem">${fb.total}/20</b><span class="chip">${esc(fb.level || "")}</span></div>
       <div class="scores">${[["grammar", "Grammar"], ["vocabulary", "Vocabulary"], ["discourse", "Discourse"], ["pronunciation", "Pronunciation"]].map(([k, n]) => `<div class="score"><small class="muted">${n}</small><b>${+sc[k] || 0}<small class="muted">/5</small></b></div>`).join("")}</div>
       ${fb.summary_es ? `<p>${esc(fb.summary_es)}</p>` : ""}</div>
       <div class="card stack"><h3>What you said</h3><p style="white-space:pre-wrap">${esc(fb.transcript || "")}</p></div>
       ${fb.errors.length ? `<div class="card stack"><h3>Errors (${fb.errors.length}) — added to your review deck</h3>${fb.errors.map(e => `<div class="errline"><span><span class="from">${esc(e.original)}</span> → <span class="to">${esc(e.correction)}</span></span><small class="muted">${esc(e.why_es || "")}</small></div>`).join("")}</div>` : ""}
       ${(fb.pron_es || []).length ? `<div class="card stack"><h3>Pronunciation</h3>${fb.pron_es.map(t => `<p>• ${esc(t)}</p>`).join("")}</div>` : ""}
       ${(fb.upgrades || []).length ? `<div class="card stack"><h3>Sound more C1/C2</h3>${fb.upgrades.map(t => `<p>• <b>${esc(t)}</b></p>`).join("")}</div>` : ""}
       ${fb.model_answer ? `<div class="card stack"><div class="row"><h3>Model answer</h3><span class="spacer"></span><button class="btn small" id="hearModel">${I.speaker} Listen</button></div><p>${esc(fb.model_answer)}</p></div>` : ""}`;
      const hm = $("#hearModel", res); if (hm) hm.onclick = () => TTS.speak(fb.model_answer);
    } catch (e) { res.innerHTML = `<div class="card"><p>${esc(micError(e))}</p></div>`; }
  }, 150);
  cleanup = () => { stopRec && stopRec(); Rec.release(); if (url) URL.revokeObjectURL(url); };
}

/* ====================================================================
   C1 ADVANCED · entrenador para el examen (ver CHANGELOG.md)
   Modelo del examen, fases, plan semanal, sesión de 45 min, mix de 5 min,
   foco de lengua, flujo de Writing con reescritura, Speaking 4/3/2 y panel.
   ==================================================================== */
const PT_ITEMS = C1.POINTS.flatMap(p => p.items.map((it, i) => Object.assign({_id:`c1-${p.id}-${i}`, pt:p.id}, it)));
const escRe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const fmtDay = (k) => new Date(k + "T12:00:00").toLocaleDateString("en-GB", {day:"numeric", month:"short"});
const daysBetween = (a, b) => Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 864e5);
function c1s() { const c = S.c1 || (S.c1 = {}); c.pts = c.pts || {}; c.mocks = c.mocks || []; c.week = c.week || {}; if (!c.start) c.start = dayKey(); return c; }
const examDate = () => (S.settings && S.settings.examDate) || C1.DEFAULT_EXAM;
const daysToExam = () => daysBetween(dayKey(), examDate());
const itemCard = (it) => ({k:"item", id:"item:" + it._id, t:it._t, ref:it._id, f:TYPES[it._t].name, b:answerOf(it)});

/* ---------- notas: solo exámenes oficiales de práctica ---------- */
function toScale(area, raw) {
  const A = C1.AREAS[area], p = A.pts; raw = Math.max(0, Math.min(A.max, +raw));
  if (raw < p[0][0]) return null;
  for (let i = 1; i < p.length; i++) if (raw <= p[i][0]) { const [x0, y0] = p[i - 1], [x1, y1] = p[i]; return Math.round(y0 + (raw - x0) / (x1 - x0) * (y1 - y0)); }
  return 210;
}
const hasRaw = (m, k) => m.r && m.r[k] != null && m.r[k] !== "";
const officialMocks = () => c1s().mocks.filter(m => m.off).sort((a, b) => a.d < b.d ? -1 : a.d > b.d ? 1 : 0);
function estimates() {
  const off = officialMocks(), out = {};
  for (const k in C1.AREAS) { const m = off.slice().reverse().find(x => hasRaw(x, k)); out[k] = m ? {raw:+m.r[k], sc:toScale(k, m.r[k]), d:m.d} : null; }
  return out;
}
function mockAvg(m) { const v = Object.keys(C1.AREAS).map(k => hasRaw(m, k) ? (toScale(k, m.r[k]) || 141) : null); return v.every(x => x != null) ? Math.round(v.reduce((a, b) => a + b, 0) / 5) : null; }
function overall() { const v = Object.values(estimates()).filter(Boolean).map(x => x.sc || 141); return v.length ? {avg:Math.round(v.reduce((a, b) => a + b, 0) / v.length), n:v.length} : null; }
const scTxt = (sc) => sc == null ? "<142" : sc + " " + scaleLabel(sc);

/* ---------- fases hasta el examen ---------- */
function phase() {
  const c = c1s(), left = daysToExam();
  if (left < 0) return {id:"done", n:"After the exam", s:"Set a new exam date in Settings to restart the plan."};
  if (!c.diagDone && daysBetween(c.start, dayKey()) < 7) return {id:"diag", n:"Diagnostic week", s:"Enter your last mock and try one of each part to set the baseline."};
  if (left <= 10) return {id:"taper", n:"Final 10 days", s:"No new content. Review, timed parts and rest."};
  if (left <= 38) return {id:"exam", n:"Exam mode", s:"Everything on the clock. An official mock every one or two weeks."};
  if (left <= 97) return {id:"consol", n:"Consolidation", s:"More timed exam parts. An official mock every three or four weeks."};
  return {id:"base", n:"Foundation", s:"C1 grammar and vocabulary, the five writing text types, getting to know each part."};
}
function mockDue() {
  const ph = phase().id, gap = {diag:0, base:45, consol:24, exam:10}[ph]; if (gap == null) return null;
  const last = officialMocks().map(m => m.d).pop();
  if (!last) return {overdue:true, txt:"No official mock entered yet."};
  const next = addDays(last, gap);
  return {overdue:ph !== "diag" && next <= dayKey(), next, txt:next <= dayKey() ? "An official mock is due now." : `Next official mock around ${fmtDay(next)}.`};
}
function decision() {
  const left = daysToExam(); if (left > 45 || left < 0) return null;
  const av = officialMocks().map(mockAvg).filter(x => x != null).slice(-2);
  if (!av.length) return {bad:true, t:"Decision point: there is no complete official mock yet, so there is nothing to base the decision on. Sit one this week."};
  const m = Math.round(av.reduce((a, b) => a + b, 0) / av.length);
  return m < C1.GO
    ? {bad:true, t:`Decision point: your last ${av.length === 2 ? "two official mocks average" : "official mock scored"} ${m}, below the ${C1.GO} safety line. Seriously consider a June paper date (5, 9, 19 or 26 June 2027) and check your centre's entry deadline.`}
    : {bad:false, t:`Decision point passed: your last official mocks average ${m} (safety line ${C1.GO}). Stay on course.`};
}

/* ---------- plan del día ---------- */
function nextPoint() { const c = c1s(); return C1.POINTS.find(p => !c.pts[p.id]) || null; }
function genreOf(type) { return Object.keys(C1.GENRES).find(g => C1.GENRES[g].match.test(type || "")) || "essay"; }
function pendingRewrite() { const w = S.writings[S.writings.length - 1]; return w && w.fb && w.rw === null && w.text ? w : null; }
function nextWritingTask() {
  // el tipo de texto que hace más tiempo que no escribe; el essay (obligatorio) primero
  const order = ["essay", "report", "proposal", "letter", "review"];
  const lastOf = g => { const w = S.writings.filter(x => genreOf(x.type) === g).slice(-1)[0]; return w ? w.date : ""; };
  const g = order.slice().sort((a, b) => lastOf(a) < lastOf(b) ? -1 : lastOf(a) > lastOf(b) ? 1 : 0)[0];
  let tasks = BANK.writing.filter(w => genreOf(w.type) === g); const c1only = tasks.filter(w => w.level === "C1"); if (c1only.length) tasks = c1only;
  const undone = tasks.filter(w => !S.writings.some(x => x.task === w.id));
  return undone[0] || tasks[dayIdx() % Math.max(1, tasks.length)] || BANK.writing[0];
}
function plan() {
  const c = c1s(), dow = new Date().getDay(), blk = c.week[dow] || C1.WEEK[dow], ph = phase().id, due = dueCards().length;
  const mix = {id:"warm", kinds:["mix", "review"], n:"5-minute mix", s:due ? `${due} review${due > 1 ? "s" : ""} due · typed answers` : "Nothing due · quick transformations", c:"var(--plum)", to:"mix", min:5};
  if (blk === "rest") return [mix];
  if (blk === "writing") { const w = nextWritingTask(); return [{id:"skill", kinds:["write"], n:"Full writing by hand: " + w.type, s:"Plan 5 min, then write on paper · 45 min in total", c:"var(--amber)", to:"write-" + w.id, min:45}]; }
  const P = ph === "taper" ? null : nextPoint();
  const focus = {id:"focus", kinds:["focus"], n:P ? "Language focus: " + P.t : "Language focus: your weak points", s:P ? "One new point · read it, then produce it" : "Mixed practice on the points you find hardest", c:"var(--red)", to:"focus", min:12};
  const read = nextReading(), lis = nextListening();
  const rd = {n:read ? "Read: " + read.title : "Read: a fresh article", s:read ? `${read.topic} · ${read.mins || 4} min` : "Generate one on your topics", c:"var(--navy)", to:read ? "read-" + read.id : "read"};
  const ls = {n:lis ? "Listen: " + lis.title : "Listen: a fresh recording", s:lis ? `${lis.topic} · British voices` : "Generate one on your topics", c:"var(--green)", to:lis ? "listen-" + lis.id : "listen"};
  let skill, input = dayIdx() % 2 ? ls : rd;
  if (blk === "reading") { skill = Object.assign({}, rd, {kinds:["read"], s:rd.s + " · on the clock"}); input = ls; }
  else if (blk === "listening") { skill = Object.assign({}, ls, {kinds:["listen"], s:ls.s + " · then transcript and dictation"}); input = rd; }
  else if (blk === "rewrite") { const pw = pendingRewrite(); skill = pw ? {n:"Rewrite: " + pw.type, s:"Rewrite your marked text from memory, then compare", to:"rewrite", c:"var(--amber)"} : {n:"Writing micro-exercises", s:"Paraphrase, register, linkers, introductions · 10 min", to:"micro", c:"var(--amber)"}; skill.kinds = ["rewrite", "micro", "write"]; }
  else if (blk === "speaking") skill = {kinds:["speak"], n:"Speaking 4/3/2", s:"The same talk in 4, 3 and 2 minutes", c:"var(--red)", to:"speak-432"};
  else return [mix, {id:"skill", kinds:["mock"], n:"Use of English Parts 1–4", s:"30 questions in exam order · on the clock", c:"var(--red)", to:"play-mock", min:35}];   // el bloque cronometrado ocupa la sesión
  skill = Object.assign({id:"skill", min:15}, skill);
  input = Object.assign({}, input, {id:"input", kinds:["read", "listen"], min:10, s:input.s + " · then mine 3–5 chunks"});
  const close = {id:"close", kinds:["close"], n:"Close: recall today's point", s:"From memory, then check · see tomorrow's block", c:"var(--plum)", to:"close", min:3};
  return [mix, focus, skill, input, close];
}
function markDone(kind) {
  const d = today(), st = plan().find(s => s.kinds.includes(kind) && !d.done[s.id]);
  if (!st) return;
  d.done[st.id] = true; if (stage && stage.id === st.id) { stage = null; paintStage(); } save();
}

/* ---------- cronómetro de etapa (siempre visible) ---------- */
let stage = null, stageInt = null;
function startStage(st) { if (!st || !st.min) return; stage = {id:st.id, n:st.n.split(":")[0], end:Date.now() + st.min * 60000}; clearInterval(stageInt); stageInt = setInterval(paintStage, 1000); paintStage(); }
function paintStage() {
  let el = document.getElementById("stagePill");
  if (!stage) { if (el) el.remove(); clearInterval(stageInt); return; }
  if (!el) { el = document.createElement("button"); el.id = "stagePill"; el.className = "stagepill"; el.title = "Tap to dismiss the timer"; document.body.append(el); el.onclick = () => { stage = null; paintStage(); }; }
  const l = stage.end - Date.now();
  if (l <= 0) { if (!stage.rang) { stage.rang = true; toast(`Time's up for “${stage.n}”. Wrap up and move on to the next stop.`); } el.textContent = "Time's up · tap to dismiss"; el.classList.add("over"); return; }
  el.classList.remove("over"); el.textContent = `${Math.floor(l / 60000)}:${pad(Math.floor(l / 1000) % 60)} · ${stage.n}`;
}

/* ---------- views: today ---------- */
function viewToday(v) {
  const c = c1s(), d = today(), stops = plan(), done = stops.filter(s => d.done[s.id]).length, ph = phase(), left = daysToExam();
  const total = stops.reduce((a, s) => a + (s.min || 0), 0), ov = overall(), pw = pendingRewrite(), dec = decision(), md = mockDue();
  const idiom = BANK.idioms[dayIdx() % BANK.idioms.length];
  const alerts = [];
  if (ph.id === "diag") alerts.push(["mocks", "Diagnostic week: enter the marks of your last C1 mock and try one of each part. That sets your baseline."]);
  if (c.pendingMark && aiOn()) alerts.push(["write-" + c.pendingMark.task, "A text is waiting in the marking queue. Open it to send it to Gemini."]);
  if (pw && pw.date < dayKey()) alerts.push(["rewrite", `Rewrite pending: your ${pw.type.toLowerCase()} of ${fmtDay(pw.date)}. A correction isn't finished until you rewrite it.`]);
  if (dec && dec.bad) alerts.push(["mocks", dec.t]);
  else if (md && md.overdue && ph.id !== "diag") alerts.push(["mocks", md.txt + " Sit an official sample paper and enter the marks."]);
  const next = stops.find(s => !d.done[s.id]);
  v.innerHTML = `
  <div class="hello"><span class="eyebrow">${new Date().toLocaleDateString("en-GB", {weekday:"long", day:"numeric", month:"long"})} · ${esc(ph.n)}</span>
    <h1>${left >= 0 ? `<span class="mono">${left}</span> day${left === 1 ? "" : "s"} to your C1 Advanced.` : "Exam date passed."} <span>${done === stops.length ? "Session complete." : "Mind the gap."}</span></h1>
    <p class="muted">${esc(ph.s)}</p></div>
  ${alerts.map(a => `<button class="notice alertbtn" data-to="${a[0]}">${esc(a[1])} <b>Open ${I.arrow}</b></button>`).join("")}
  <div class="quickrow"><button class="card quickbtn" id="goSession" style="--c:var(--red)"><b>${done === stops.length ? "Session done" : done ? "Continue session" : `Start session · ${total} min`}</b><small class="muted">${next ? "Next: " + esc(next.n) : "Come back tomorrow"}</small></button>
    <button class="card quickbtn" id="goMix" style="--c:var(--plum)"><b>5-minute mix</b><small class="muted">${dueCards().length} due · works offline</small></button>
    <button class="card quickbtn" id="goDash" style="--c:var(--navy)"><b>${ov ? ov.avg + " / 180" : "Mission control"}</b><small class="muted">${ov ? "official mock estimate · target " + C1.TARGET : "Enter an official mock to see where you stand"}</small></button></div>
  <div class="grid-2">
    <div class="card"><div class="row"><h2>Today's session</h2><span class="spacer"></span><span class="muted mono">${done}/${stops.length}</span></div>
      <div class="route" id="route">${stops.map((s, i) => `<button class="stop ${d.done[s.id] ? "done" : ""}" data-i="${i}" style="--c:${s.c}"><span class="dot">${d.done[s.id] ? I.check : ""}</span><span class="lbl"><b>${esc(s.n)}</b><small>${s.min ? s.min + " min · " : ""}${esc(s.s)}</small></span><span class="go">${I.arrow}</span></button>`).join("")}</div>
      <p class="muted" style="font-size:.8rem;margin-top:10px">Each stop starts its own countdown. Short on time? Do the mix only: five minutes a day beats an hour once a week.</p>
    </div>
    <div class="stack">
      <div class="card goal">${ring(d.xp / S.settings.goal)}<div><h3>Daily goal</h3><p class="muted"><span class="mono">${d.xp}</span> / <span class="mono">${S.settings.goal}</span> XP today · streak <span class="mono">${liveStreak()}</span> (best <span class="mono">${S.best || 0}</span>)</p></div></div>
      <div class="card stack"><div class="row"><h3>Syllabus</h3><span class="spacer"></span><span class="mono muted">${Object.keys(c.pts).length}/${C1.POINTS.length} points</span></div><div class="bar" style="--c:var(--red)"><i style="--p:${Object.keys(c.pts).length / C1.POINTS.length * 100}%"></i></div><p class="muted" style="font-size:.85rem">One new point per session, then it comes back mixed with the others.</p></div>
      <div class="card wotd stack"><span class="eyebrow">Chunk of the day</span><div class="row"><span class="term">${esc(idiom.t)}</span><button class="icon-btn" id="sayIdiom" aria-label="Listen">${I.speaker}</button></div><p>${esc(idiom.m)}.</p><p class="muted"><i>“${esc(idiom.ex)}”</i></p><div><button class="btn small" id="saveIdiom">Add to review</button></div></div>
    </div>
  </div>
  <p class="muted" style="font-size:.85rem">More: <a href="#phrases"><b>Phrasebook</b></a> · <a href="#quick"><b>Quick play</b></a> · <a href="#practice"><b>Games</b></a> · <a href="#mocks"><b>Official mocks</b></a></p>
  ${!aiOn() ? `<p class="notice">AI features (marking, fresh articles, explanations) switch on when you add your free Gemini key in Settings (⚙). Everything else works offline.</p>` : ""}`;
  const open = (s) => { if (!d.done[s.id]) startStage(s); go(s.to); };
  $$("#route .stop", v).forEach(b => b.onclick = () => open(stops[+b.dataset.i]));
  $$(".alertbtn", v).forEach(b => b.onclick = () => go(b.dataset.to));
  $("#goSession", v).onclick = () => { if (!next) return toast("Today's session is complete."); if (!c.sess || c.sess.d !== dayKey()) { c.sess = {d:dayKey(), t0:Date.now()}; save(); } open(next); };
  $("#goMix", v).onclick = () => go("mix");
  $("#goDash", v).onclick = () => go(ov ? "progress" : "mocks");
  $("#sayIdiom", v).onclick = () => TTS.speak(`${idiom.t}. ${idiom.ex}`);
  $("#saveIdiom", v).onclick = () => { addCard({k:"word", f:idiom.t, b:idiom.m, ex:idiom.ex}) ? toast("Added to your review queue.") : toast("Already in your queue."); };
}

/* ---------- tarjeta de repaso: siempre producir antes de ver ---------- */
function cardUI(box, c, onDone) {
  if (c.k === "item") {
    const it = findItem(c.t, c.ref); if (!it) return onDone(null);
    box.innerHTML = `<div class="card qcard" id="q" style="--c:${TYPES[c.t].c}"><span class="eyebrow">${esc(TYPES[c.t].name)}${c.tmp ? "" : " · from your mistakes · box " + c.box}</span>${tipBox(it)}</div><div id="fb"></div>`;
    const q = $("#q", box); bindTips(q);
    const R = renderItem(it, (ok, given, note) => { record(TYPES[c.t].skill, ok); showFeedback($("#fb", box), it, ok, given, note, ok ? 6 : 0, () => onDone(ok)); });
    q.insertAdjacentHTML("beforeend", R.html); R.mount(q); return;
  }
  const strip = s => norm(String(s || "").replace(/…|\.\.\./g, " ").replace(/\([^)]*\)/g, " ")).replace(/^to /, "");
  let label, front, sub = "", target = "", speak = "", shown = "";
  const dict = c.k === "mistake" && /^Dictation: /.test(c.f);
  if (dict) { label = "Dictation · listen and type"; front = "Listen"; speak = c.b; target = shown = c.b; }
  else if (c.k === "mistake") { label = c.cat === "micro" ? "Say it better" : "Fix this"; front = esc(c.f); sub = c.ex && c.ex !== c.f && c.ex.length > 12 ? esc(c.ex) : ""; target = String(c.b).split(" — ")[0]; shown = c.b; }
  else if (c.k !== "pron") {
    const gapEx = c.ex && new RegExp(escRe(c.f), "i").test(c.ex) ? c.ex.replace(new RegExp(escRe(c.f), "i"), "_____") : "";
    const meaning = c.b && c.b !== "(look it up)" ? c.b : "";
    if (meaning || gapEx) { label = "Say it in English"; front = esc(meaning || gapEx); sub = meaning && gapEx ? esc(gapEx) : ""; target = shown = c.f; }
  }
  if (!label) {   // sin pista para producir (pronunciación o palabra sin definición): autoevaluación
    box.innerHTML = `<div class="card flash"><span class="eyebrow">${c.k === "pron" ? "Say it right" : "What does it mean?"} · box ${c.box}</span><div class="front">${esc(c.f)}</div>${c.ex ? `<p class="muted"><i>${esc(c.ex)}</i></p>` : ""}<div class="row"><button class="btn small" id="say">${I.speaker}</button><button class="btn primary" id="show">Show answer</button></div><div class="back" id="back" hidden></div></div>`;
    $("#say", box).onclick = () => TTS.speak(c.f);
    $("#show", box).onclick = () => { $("#show", box).remove(); const b = $("#back", box); b.hidden = false; b.innerHTML = `<p><b>${esc(c.b)}</b></p><div class="row" style="justify-content:center;margin-top:12px"><button class="btn" id="again">Didn't know</button><button class="btn primary" id="good">Knew it</button></div>`; $("#again", box).onclick = () => onDone(false); $("#good", box).onclick = () => onDone(true); };
    return;
  }
  box.innerHTML = `<div class="card flash"><span class="eyebrow">${label}${c.tmp ? "" : " · box " + c.box}</span><div class="front${front.length > 60 ? " long" : ""}">${front}</div>${sub ? `<p class="muted"><i>${sub}</i></p>` : ""}
    <input class="answer" id="ans" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Type it from memory" aria-label="Your answer">
    <div class="row" style="justify-content:center">${speak ? `<button class="btn small" id="say">${I.speaker} Play</button>` : ""}<button class="btn primary" id="chk">Check</button><button class="btn ghost small" id="idk">I don't know</button></div><div class="back" id="back" hidden></div></div>`;
  const inp = $("#ans", box), back = $("#back", box);
  const reveal = (given) => {
    inp.disabled = true; $("#chk", box).remove(); $("#idk", box).remove(); back.hidden = false;
    const full = `<p>Answer: <b>${esc(shown)}</b></p>${c.k !== "mistake" && c.ex ? `<p class="muted"><i>${esc(c.ex)}</i></p>` : ""}`;
    const nextBtn = (ok) => { back.insertAdjacentHTML("beforeend", `<div class="row" style="justify-content:center;margin-top:10px"><button class="btn primary" id="nx">Next ${I.arrow}</button></div>`); const b = $("#nx", box); b.onclick = () => onDone(ok); setTimeout(() => b.focus({preventScroll:true}), 30); };
    if (given && strip(given) === strip(target)) { back.innerHTML = `<p style="color:var(--green)"><b>Correct</b></p>${full}`; return nextBtn(true); }
    if (!given) { back.innerHTML = full; return nextBtn(false); }
    back.innerHTML = `<p class="muted">You wrote: ${esc(given)}</p>${full}<div class="row" style="justify-content:center;margin-top:10px"><button class="btn" id="again">I got it wrong</button><button class="btn primary" id="good">Mine is right too</button></div>`;
    $("#again", box).onclick = () => onDone(false); $("#good", box).onclick = () => onDone(true);
  };
  $("#chk", box).onclick = () => { if (!inp.value.trim()) { inp.classList.add("shake"); setTimeout(() => inp.classList.remove("shake"), 300); return inp.focus(); } reveal(inp.value.trim()); };
  inp.onkeydown = (e) => { if (e.key === "Enter" && !inp.disabled) $("#chk", box).click(); };
  $("#idk", box).onclick = () => reveal("");
  if (speak) { $("#say", box).onclick = () => TTS.speak(speak); setTimeout(() => TTS.speak(speak), 300); }
  setTimeout(() => { if (matchMedia("(pointer:fine)").matches) inp.focus(); }, 50);
}
// Intercalado: nunca dos tarjetas seguidas del mismo tipo si se puede evitar
function interleave(cards) {
  const key = c => c.k === "item" ? c.t : c.k, out = [], rest = cards.slice();
  while (rest.length) { let i = rest.findIndex(c => !out.length || key(c) !== key(out[out.length - 1])); if (i < 0) i = 0; out.push(rest.splice(i, 1)[0]); }
  return out;
}

/* ---------- mix de 5 minutos ---------- */
function mixQueue() {
  const due = interleave(shuffle(dueCards()));
  if (due.length) return due;
  const known = t => shuffle(pool(t).filter(x => S.seen[x._id] === 1)).slice(0, 3);
  let its = known("kwt").concat(known("wf"));
  if (its.length < 4) its = pickItems("kwt", 3).concat(pickItems("wf", 3));
  return interleave(shuffle(its.map(it => ({k:"item", t:it._t, ref:it._id, tmp:true, box:0}))));
}
function viewMix(v) {
  const queue = mixQueue(), nDue = dueCards().length;
  v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Today</button></div>
  <div class="hello"><span class="eyebrow" style="color:var(--plum)">5-minute mix · works offline</span><h1>Retrieve, don't recognise</h1>
  <p class="muted">${nDue ? `${nDue} review${nDue > 1 ? "s" : ""} due, shuffled so that the same kind never comes twice in a row.` : "Nothing is due, so here are a few transformations and word-formation questions on things you have already seen."} No new content here.</p></div>
  <p class="notice">Es más incómodo que elegir una opción y fallarás más. Es normal: escribir la respuesta de memoria y mezclar temas es lo que hace que se quede.</p>
  <div class="row"><button class="btn red" id="start" ${queue.length ? "" : "disabled"}>Start · 5:00</button></div>`;
  $("#bk", v).onclick = () => go("today");
  $("#start", v).onclick = () => {
    const end = Date.now() + 5 * 60000; let i = 0, right = 0, n = 0, over = false;
    const tick = setInterval(() => { const t = $("#mixT", v), l = Math.max(0, end - Date.now()); if (t) { t.textContent = Math.floor(l / 60000) + ":" + pad(Math.floor(l / 1000) % 60); t.classList.toggle("low", l < 30000); } }, 500);
    cleanup = () => clearInterval(tick);
    const finish = () => {
      if (over) return; over = true; clearInterval(tick);
      const xp = right * 6 + 10; addXP(xp); markDone("mix"); today().min = (today().min || 0) + 5; save();
      const left = dueCards().length;
      v.innerHTML = `<div class="card stack pop" style="text-align:center;align-items:center;padding:32px 18px"><span class="eyebrow">Mix complete</span><div class="big-score">${right}/${n}</div><p class="muted">+${xp} XP. ${left ? left + " still due." : "Nothing left for today."} What you missed comes back tomorrow.</p><div class="row" style="justify-content:center">${left ? `<button class="btn red" id="more">Another five minutes</button>` : ""}<button class="btn" id="home">Back to Today</button></div></div>`;
      const m = $("#more", v); if (m) m.onclick = () => route(); $("#home", v).onclick = () => go("today");
    };
    const step = () => {
      if (i >= queue.length || Date.now() >= end) return finish();
      const c = queue[i];
      v.innerHTML = `<div class="game-head"><button class="icon-btn" id="quit" aria-label="Quit">${I.back}</button><span class="timer mono" id="mixT"></span><span class="spacer"></span><span class="mono muted">${i + 1}/${queue.length}</span></div><div id="cardBox"></div>`;
      $("#quit", v).onclick = () => { if (!n) { clearInterval(tick); return go("today"); } finish(); };
      cardUI($("#cardBox", v), c, (ok) => {
        if (ok === null) { if (!c.tmp) { tomb("d:" + c.id); S.deck = S.deck.filter(x => x !== c); } }
        else { n++; if (ok) right++; if (!c.tmp) grade(c, ok); else if (!ok) { const it = findItem(c.t, c.ref); if (it) addCard(itemCard(it)); } }
        i++; step();
      });
    };
    step();
  };
}

/* ---------- repaso completo ---------- */
function viewReview(v) {
  const due = interleave(shuffle(dueCards())), total = S.deck.length;
  const boxes = INTERVALS.map((_, i) => S.deck.filter(c => Math.min(c.box, INTERVALS.length - 1) === i).length);
  if (!due.length) {
    v.innerHTML = `<div class="hello"><span class="eyebrow" style="color:var(--plum)">Review</span><h1>All caught up</h1><p class="muted">${total ? `You have ${total} cards. The next ones come due ${nextDue()}.` : "Your queue fills up as you work: every mistake, every chunk you mine and every correction lands here, then comes back just before you'd forget it."}</p></div>
    <div class="card stack"><h3>Queue by box</h3><p class="muted">Intervals of ${INTERVALS.slice(1).join(", ")} days. A miss sends the card back to box 0. Everything is scheduled to come round again before your exam.</p><div class="stack">${boxes.map((n, i) => `<div class="skillrow"><span>Box ${i}</span><div class="bar" style="--c:var(--plum)"><i style="--p:${total ? n / total * 100 : 0}%"></i></div><span class="mono">${n}</span></div>`).join("")}</div></div>
    <div class="row"><button class="btn red" id="mx">5-minute mix</button><button class="btn" id="home">Back to Today</button></div>`;
    $("#mx", v).onclick = () => go("mix"); $("#home", v).onclick = () => go("today");
    $("#home", v).insertAdjacentHTML("afterend", `<button class="btn" id="pbGo">Phrasebook</button>`); $("#pbGo", v).onclick = () => go("phrases");
    return;
  }
  const queue = due.slice(0, 20); let i = 0, right = 0;
  const step = () => {
    if (i >= queue.length) { addXP(right * 6 + 10); markDone("review");
      v.innerHTML = `<div class="card stack pop" style="text-align:center;align-items:center;padding:32px 18px"><span class="eyebrow">Review complete</span><div class="big-score">${right}/${queue.length}</div><p class="muted">+${right * 6 + 10} XP. ${dueCards().length ? dueCards().length + " more due." : "Queue clear for today."}</p><div class="row" style="justify-content:center">${dueCards().length ? `<button class="btn red" id="more">Keep going</button>` : ""}<button class="btn" id="home">Back to Today</button></div></div>`;
      const m = $("#more", v); if (m) m.onclick = () => route(); $("#home", v).onclick = () => go("today"); return; }
    const c = queue[i];
    v.innerHTML = `<div class="game-head"><button class="icon-btn" id="quit" aria-label="Quit">${I.back}</button><div class="progress-dots">${queue.map((_, j) => `<i class="${j < i ? "ok" : j === i ? "cur" : ""}"></i>`).join("")}</div><span class="mono muted">${i + 1}/${queue.length}</span></div><div id="cardBox"></div>`;
    $("#quit", v).onclick = () => go("today");
    cardUI($("#cardBox", v), c, (ok) => { if (ok === null) { tomb("d:" + c.id); S.deck = S.deck.filter(x => x !== c); } else { grade(c, ok); if (ok) right++; } i++; step(); });
  };
  step();
}

/* ---------- secuencia de preguntas reutilizable ---------- */
function runSeq(v, items, o) {
  let i = 0; const res = [];
  const step = () => {
    if (i >= items.length) return o.onEnd(res);
    const it = items[i];
    v.innerHTML = `<div class="game-head"><button class="icon-btn" id="quit" aria-label="Quit">${I.back}</button><div class="progress-dots">${items.map((_, j) => `<i class="${j < i ? (res[j] ? "ok" : "ko") : j === i ? "cur" : ""}"></i>`).join("")}</div><span class="mono muted">${i + 1}/${items.length}</span></div>
      ${o.note ? `<p class="notice">${esc(o.note)}</p>` : ""}<div class="card qcard" id="q" style="--c:${TYPES[it._t].c}"><span class="eyebrow">${esc(o.eyebrow ? o.eyebrow + " · " : "")}${esc(TYPES[it._t].name)}</span>${tipBox(it)}</div><div id="fb"></div>`;
    $("#quit", v).onclick = () => go(o.back || "today");
    const q = $("#q", v); bindTips(q);
    const R = renderItem(it, (ok, given, note) => {
      res.push(ok); S.seen[it._id] = ok ? 1 : -1; record(TYPES[it._t].skill, ok); if (!ok) addCard(itemCard(it)); save();
      showFeedback($("#fb", v), it, ok, given, note, ok ? 10 : 0, () => { i++; step(); });
    });
    q.insertAdjacentHTML("beforeend", R.html); R.mount(q);
  };
  step();
}

/* ---------- foco de lengua: un punto nuevo, primero en bloque y luego mezclado ---------- */
function pointCardHTML(P, open) {
  return `<div class="card stack"><h2>${esc(P.t)}</h2><p>${esc(P.es)}</p><p class="notice"><b>Ojo, hispanohablante:</b> ${esc(P.trap)}</p>
    <h3>Read these first</h3>${P.ex.map((x, i) => `<div class="row"><button class="icon-btn" data-say="${i}" aria-label="Listen">${I.speaker}</button><span style="flex:1"><b>${esc(x)}</b></span></div>`).join("")}</div>`;
}
function viewFocus(v) {
  const c = c1s(), taper = phase().id === "taper";
  let P = c.focusDay === dayKey() ? C1.POINTS.find(p => p.id === c.focusPt) : null;
  const redo = !!P; if (!P && !taper) P = nextPoint();
  if (!P) return viewFocusReview(v);
  const mine = PT_ITEMS.filter(x => x.pt === P.id).map(x => findItem(x._t, x._id)).filter(Boolean);
  const older = shuffle(PT_ITEMS.filter(x => x.pt !== P.id && c.pts[x.pt]).map(x => findItem(x._t, x._id)).filter(Boolean)).slice(0, 3);
  v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Today</button></div>
  <div class="hello"><span class="eyebrow" style="color:var(--red)">Language focus · point ${C1.POINTS.indexOf(P) + 1} of ${C1.POINTS.length}${redo ? " · again" : ""}</span><h1>One point, done properly</h1><p class="muted">Read the explanation and the model sentences, then produce it yourself: ${mine.length} questions on this point${older.length ? `, then ${older.length} mixed with earlier points` : ""}.</p></div>
  ${pointCardHTML(P)}<div class="row"><button class="btn red" id="start">I've read them · practise</button></div>`;
  $("#bk", v).onclick = () => go("today");
  $$("[data-say]", v).forEach(b => b.onclick = () => TTS.speak(P.ex[+b.dataset.say]));
  $("#start", v).onclick = () => runSeq(v, mine, {eyebrow:P.t, onEnd:(r1) => {
    const end = (r2) => {
      const right = r1.concat(r2).filter(Boolean).length, n = r1.length + r2.length;
      c.pts[P.id] = {d:(c.pts[P.id] && c.pts[P.id].d) || dayKey(), r:r1.filter(Boolean).length, n:r1.length}; c.focusDay = dayKey(); c.focusPt = P.id;
      // todas las preguntas del punto vuelven espaciadas, también las acertadas
      mine.forEach(it => { if (!S.deck.some(x => x.id === "item:" + it._id)) { addCard(itemCard(it)); const cd = S.deck.find(x => x.id === "item:" + it._id); if (cd) cd.due = addDays(dayKey(), 1); } });
      addXP(30 + right * 5); markDone("focus"); today().min = (today().min || 0) + 12; save();
      v.innerHTML = `<div class="card stack pop" style="text-align:center;align-items:center;padding:32px 18px"><span class="eyebrow">Language focus complete</span><div class="big-score">${right}/${n}</div><p class="muted">“${esc(P.t)}” is now in your review queue: it comes back tomorrow, then at 3, 7, 16 and 35 days, always mixed with other points.</p><div class="row" style="justify-content:center"><button class="btn primary" id="home">Back to Today</button></div></div>`;
      $("#home", v).onclick = () => go("today");
    };
    if (!older.length) return end([]);
    runSeq(v, older, {eyebrow:"Mixed", note:"Ahora mezclado con puntos anteriores. Es más incómodo y fallarás más: es normal, así se retiene mejor.", onEnd:end});
  }});
}
function viewFocusReview(v) {
  const c = c1s(), learned = C1.POINTS.filter(p => c.pts[p.id]);
  if (!learned.length) { v.innerHTML = `<div class="hello"><h1>No points learned yet</h1><p class="muted">New points are paused in the final 10 days. Use the mix instead.</p></div><div class="row"><button class="btn red" id="mx">5-minute mix</button></div>`; $("#mx", v).onclick = () => go("mix"); return; }
  const rate = p => c.pts[p.id].n ? c.pts[p.id].r / c.pts[p.id].n : 1;
  const weak = learned.slice().sort((a, b) => rate(a) - rate(b)).slice(0, 2);
  const items = interleave(shuffle(PT_ITEMS.filter(x => weak.some(p => p.id === x.pt)).map(x => findItem(x._t, x._id)).filter(Boolean))).slice(0, 6);
  v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Today</button></div>
  <div class="hello"><span class="eyebrow" style="color:var(--red)">Language focus · weak points</span><h1>Back to what cost you most</h1><p class="muted">${nextPoint() ? "No new content in the final stretch." : "You have covered the whole syllabus."} Re-read the two points you scored lowest on, then answer ${items.length} mixed questions.</p></div>
  ${weak.map(p => `<details class="card stack methodcard"><summary><b>${esc(p.t)}</b> <span class="muted">· ${c.pts[p.id].r}/${c.pts[p.id].n} first time</span></summary><p>${esc(p.es)}</p><p class="notice">${esc(p.trap)}</p>${p.ex.map(x => `<p><b>${esc(x)}</b></p>`).join("")}</details>`).join("")}
  <div class="row"><button class="btn red" id="start">Practise</button></div>`;
  $("#bk", v).onclick = () => go("today");
  $("#start", v).onclick = () => runSeq(v, items, {eyebrow:"Weak points", onEnd:(r) => {
    const right = r.filter(Boolean).length; addXP(20 + right * 5); markDone("focus"); c.focusDay = dayKey(); c.focusPt = weak[0].id; save();
    v.innerHTML = `<div class="card stack pop" style="text-align:center;align-items:center;padding:32px 18px"><span class="eyebrow">Weak points</span><div class="big-score">${right}/${r.length}</div><div class="row" style="justify-content:center"><button class="btn primary" id="home">Back to Today</button></div></div>`;
    $("#home", v).onclick = () => go("today");
  }});
}

/* ---------- cierre: recuperar de memoria lo nuevo de hoy ---------- */
function viewClose(v) {
  const c = c1s(), P = c.focusDay === dayKey() ? C1.POINTS.find(p => p.id === c.focusPt) : null;
  const tmr = new Date(); tmr.setDate(tmr.getDate() + 1); const blk = c.week[tmr.getDay()] || C1.WEEK[tmr.getDay()];
  const added = S.deck.filter(x => x.added === dayKey() && (x.k === "chunk" || x.k === "word"));
  v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Today</button></div>
  <div class="hello"><span class="eyebrow" style="color:var(--plum)">Close · 3 minutes</span><h1>What did you learn today?</h1><p class="muted">Without looking anything up. Recalling it now, while it is still fresh but no longer on screen, is worth more than re-reading it.</p></div>
  <div class="card stack"><p><b>${P ? `Write the rule for “${esc(P.t)}” in your own words and two example sentences.` : "Write from memory three expressions you met today and a sentence with each."}</b></p>
  <textarea class="answer" id="dump" rows="6" spellcheck="false" placeholder="From memory…"></textarea><div><button class="btn primary" id="cmp">Compare</button></div><div id="out"></div></div>`;
  $("#bk", v).onclick = () => go("today");
  $("#cmp", v).onclick = () => {
    if (words($("#dump", v).value) < 6) return toast("Write a little more first: the effort is the point.");
    $("#cmp", v).remove();
    $("#out", v).innerHTML = `${P ? `<p>${esc(P.es)}</p>${P.ex.map(x => `<p><b>${esc(x)}</b></p>`).join("")}` : added.length ? added.map(x => `<div class="errline"><b>${esc(x.f)}</b><small class="muted">${esc(x.b || x.ex || "")}</small></div>`).join("") : `<p class="muted">Nothing new was saved today. Mine a few chunks from tomorrow's text.</p>`}
      <p class="notice"><b>Tomorrow:</b> ${esc(C1.BLOCKS[blk].n)}. ${esc(C1.BLOCKS[blk].s)}.</p><div class="row"><button class="btn red" id="done">Done for today</button></div>`;
    $("#done", v).onclick = () => { addXP(15); markDone("close"); const d = today(); if (plan().every(s => d.done[s.id])) { confetti(); toast("Session complete. See you tomorrow."); } go("today"); };
  };
}

/* ---------- minar expresiones de un texto o audio ---------- */
function sentenceWith(body, f) { const m = String(body || "").replace(/\s+/g, " ").match(new RegExp(`[^.!?]*${escRe(f)}[^.!?]*[.!?]?`, "i")); return m ? m[0].trim() : ""; }
function chunkMiner(src, body) {
  return {
    html:`<div class="card stack miner" style="--c:var(--plum)"><h3>Mine 3–5 chunks</h3><p class="muted">Copy whole expressions exactly as they appear (collocations, phrasal verbs, linkers), not single words. Each one goes to your review queue as a gap-fill in its own sentence.</p><div class="row"><input type="text" class="answer" id="mineIn" placeholder="e.g. run the risk of" autocapitalize="off" autocorrect="off" spellcheck="false" style="flex:1;min-width:180px;margin:0"><button class="btn" id="mineAdd">Add</button></div><div id="mineList" class="stack"></div></div>`,
    mount(r) {
      let n = 0;
      const add = () => {
        const inp = $("#mineIn", r), f = inp.value.trim().replace(/[.,;:!?]+$/, ""); if (words(f) < 2) return toast("Pick an expression of two words or more.");
        const sent = sentenceWith(body, f), isNew = addCard({k:"chunk", f, b:"", ex:sent || ""});
        if (!sent) toast("Saved, but I couldn't find it in the text. Copy it exactly to get a gap-fill.");
        else toast(isNew ? `Added (${n + 1}). Aim for 3–5.` : "Already in your queue: reset to today.");
        n++; inp.value = ""; $("#mineList", r).insertAdjacentHTML("beforeend", `<div class="errline"><b>${esc(f)}</b><small class="muted">${esc(sent)}</small></div>`);
        if (n === 3) addXP(15);
      };
      $("#mineAdd", r).onclick = add; $("#mineIn", r).onkeydown = (e) => { if (e.key === "Enter") add(); };
    }
  };
}

/* ---------- writing: guías, corrección con una sola petición, reescritura obligatoria ---------- */
function guideHTML(g, open) {
  const G = C1.GENRES[g];
  return `<details class="card stack methodcard" ${open ? "open" : ""}><summary><b>${esc(G.n)}</b> <span class="muted">· structure, register and phrases</span></summary><p>${esc(G.reg)}</p><ol>${G.plan.map(x => `<li>${esc(x)}</li>`).join("")}</ol>
    <div class="stack">${G.phrases.map(p => `<div class="errline"><b>${esc(p[0])}</b><small class="muted">${esc(p[1])}</small></div>`).join("")}</div><div><button class="btn small" data-addph="${g}">Add these phrases to review</button></div></details>`;
}
function addPhrases(list, prefix, label) { let n = 0; list.forEach((p, i) => { const id = `ph:${prefix}:${i}`; if (!S.deck.some(c => c.id === id)) { addCard({k:"chunk", id, f:p[0], b:`${label}: ${p[1]}`, ex:""}); n++; } }); toast(n ? `${n} phrases added to your review queue.` : "Already in your queue."); }
function bindGuide(root) { $$("[data-addph]", root).forEach(b => b.onclick = () => { const g = b.dataset.addph; addPhrases(C1.GENRES[g].phrases, g, "Writing · " + C1.GENRES[g].n); b.disabled = true; }); }
function imgToB64(file) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file), im = new Image();
    im.onload = () => { const k = Math.min(1, 1800 / Math.max(im.width, im.height)), cv = document.createElement("canvas"); cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k); cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url); res(cv.toDataURL("image/jpeg", 0.82).split(",")[1]); };
    im.onerror = () => { URL.revokeObjectURL(url); rej({code:"bad_request", msg:"that image could not be read"}); };
    im.src = url;
  });
}
async function aiImagesJSON(prompt, imgs) { if (!SAMPLE || !SAMPLE.imagesJSON) throw {code:"no_key"}; aiTick(); return SAMPLE.imagesJSON(prompt, imgs, {modelTier:"complex", timeoutMs:150000}); }
function markPrompt(W, g, text) {
  return `You are a senior Cambridge English examiner marking a C1 Advanced ${W.type} (Writing Part ${g === "essay" ? 1 : 2}). ${LEARNER}\n\nTASK:\n${W.prompt}\n\n${text == null ? "The candidate's handwritten answer is in the attached photo(s), in page order. First transcribe it EXACTLY as written, keeping every mistake. Write [illegible] for any word you cannot read and never count an illegible word as an error." : `CANDIDATE'S ANSWER:\n"""${text}"""`}\n\nMark it with the official Cambridge writing assessment scale at C1 level: Content, Communicative Achievement, Organisation, Language, each 0-5 (3 = a solid C1 pass, 5 = top of C1). Be accurate and strict, never generous: an optimistic mark harms this candidate. Check the word count (target ${W.words}) and whether the conventions of a ${W.type.toLowerCase()} are followed. Find EVERY spelling, grammar, punctuation, vocabulary and register error.\nReply with only a JSON object:\n{${text == null ? '"transcript": the exact transcription, ' : ""}"scores": {"content": 0-5, "communicative": 0-5, "organisation": 0-5, "language": 0-5}, "level": "B1|B2|C1|C2" (the level this text demonstrates), "scale_low": integer, "scale_high": integer (your honest estimate on the Cambridge English Scale as a RANGE 8 to 12 points wide, between 140 and 210), "summary_es": 2-3 sentences in Spanish, "strengths": [2-3 short strings in English], "errors": [{"original": exact substring from the answer, "correction": corrected text, "type": "spelling|grammar|vocabulary|punctuation|register", "why_es": short reason in Spanish}], "upgrades": [3-5 {"original": phrase from the answer, "better": C1 alternative, "why_es": short reason in Spanish}], "next_focus_es": the single most useful thing to practise next, in Spanish, "improved": the whole answer rewritten as a strong C1 answer keeping the candidate's ideas, British spelling, ${W.words} words}`;
}
function storeMarked(W, text, fb) {
  const sc = fb.scores || (fb.scores = {});
  fb.total = ["content", "communicative", "organisation", "language"].reduce((a, k) => a + Math.max(0, Math.min(5, +sc[k] || 0)), 0);
  fb.errors = Array.isArray(fb.errors) ? fb.errors.filter(e => e && e.original && e.correction) : []; fb.upgrades = Array.isArray(fb.upgrades) ? fb.upgrades.filter(u => u && u.original) : [];
  delete fb.transcript;
  S.writings.push({task:W.id, type:W.type, date:dayKey(), text:text.slice(0, 3000), fb, rw:null});
  fb.errors.forEach(e => addCard({k:"mistake", f:e.original, b:e.correction + (e.why_es ? " — " + e.why_es : ""), ex:sentenceWith(text, e.original) || W.type, cat:e.type || ""}));
  if (!fb.self) { fb.errors.filter(e => e.type === "spelling").forEach(() => record("spelling", false)); record("writing", fb.total >= 12); }
  addXP(40 + fb.total * 5); markDone("write"); save();
}
function viewWriting(v, id) {
  const W = BANK.writing.find(x => x.id === id); if (!W) return viewWriteList(v);
  const [lo, hi] = W.words.split("–").map(Number), g = genreOf(W.type), c = c1s();
  let imgs = [];
  v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Writing</button></div>
  <div class="hello"><span class="eyebrow" style="color:var(--amber)">${esc(W.type)} · ${W.level} · ${W.words} words · Part ${g === "essay" ? 1 : 2}</span><h1>${esc(W.type)}</h1></div>
  <div class="prompt">${esc(W.prompt)}</div>
  ${guideHTML(g)}
  <div class="card stack"><h3>1 · Plan · 5 minutes</h3><p class="muted">Decide your points and their order before you write a single sentence. Notes only.</p><textarea class="answer" id="plan" rows="4" spellcheck="false" placeholder="Intro: …&#10;Point 1: …&#10;Point 2: …&#10;Conclusion: …">${esc(drafts[W.id + ":plan"] || "")}</textarea>
    <div class="row"><button class="btn small" id="tmr">Start exam clock · 45 min</button><span class="muted" style="font-size:.85rem">In the exam you have 90 minutes for two texts.</span></div></div>
  <div class="card stack"><h3>2 · Write it by hand</h3><p class="muted">Your exam is on paper, so write on paper. Then photograph the page(s), or type the text below exactly as you wrote it, mistakes included.</p>
    <div class="row"><label class="btn" for="photo">${I.pen} Photo of my handwriting</label><input type="file" id="photo" accept="image/*" multiple hidden><span class="muted" id="photoMsg" style="font-size:.85rem"></span></div>
    <textarea class="essay" id="essay" autocapitalize="sentences" spellcheck="false" placeholder="…or type it up here. Spell-check is off on purpose.">${esc(drafts[W.id] || "")}</textarea>
    <div class="row"><span class="mono" id="wc">0 words</span><span class="muted" id="wcHint"></span><span class="spacer"></span><button class="btn" id="self">Mark it myself</button><button class="btn ai" id="mark" ${aiOn() ? "" : "disabled"}>${I.sparkle} Mark it like Cambridge</button></div>
    <p class="muted" style="font-size:.8rem">${aiOn() ? `One AI request per marking · ${aiCount()} request${aiCount() === 1 ? "" : "s"} used today on this device.` : "No Gemini key: use “Mark it myself” with the four official criteria."}</p></div>
  <div id="result"></div>`;
  $("#bk", v).onclick = () => go("write"); bindGuide(v);
  const ta = $("#essay", v), wc = $("#wc", v), hint = $("#wcHint", v), res = $("#result", v);
  const upd = () => { const n = words(ta.value); wc.textContent = n + " words"; hint.textContent = n < lo ? `aim for ${lo}–${hi}` : n > hi + 20 ? "too long: cut it" : "good length"; hint.style.color = n >= lo && n <= hi + 20 ? "var(--green)" : "var(--muted)"; };
  let dt; ta.oninput = () => { upd(); clearTimeout(dt); dt = setTimeout(() => saveDraft(W.id, ta.value), 400); }; upd();
  $("#plan", v).oninput = (e) => saveDraft(W.id + ":plan", e.target.value);
  let tEnd = 0, tInt = null;
  $("#tmr", v).onclick = (e) => { if (tInt) { clearInterval(tInt); tInt = null; e.target.textContent = "Start exam clock · 45 min"; return; } tEnd = Date.now() + 45 * 60000; tInt = setInterval(() => { const l = Math.max(0, tEnd - Date.now()); e.target.textContent = "Stop clock · " + Math.floor(l / 60000) + ":" + pad(Math.floor(l / 1000) % 60); if (l && l < 40 * 60000 && !e.target.dataset.w) { e.target.dataset.w = 1; toast("Five minutes gone: start writing."); } if (!l) { clearInterval(tInt); tInt = null; toast("Time's up. Finish your sentence and stop."); } }, 1000); cleanup = () => clearInterval(tInt); };
  $("#photo", v).onchange = async (e) => {
    const files = [...e.target.files].slice(0, 3), msg = $("#photoMsg", v); if (!files.length) return;
    msg.textContent = "Preparing…";
    try { imgs = []; for (const f of files) imgs.push({mime:"image/jpeg", data:await imgToB64(f)}); msg.textContent = `${imgs.length} photo${imgs.length > 1 ? "s" : ""} ready. ${aiOn() ? "Transcribed and marked in a single request." : "Add a Gemini key to have them read, or type the text."}`; }
    catch (err) { imgs = []; msg.textContent = "That photo could not be read. Try again or type the text."; }
  };
  $("#self", v).onclick = () => {
    const text = ta.value.trim(); if (words(text) < 60) return toast("Type your text first (at least 60 words).");
    res.innerHTML = `<div class="card stack"><h2>Mark it yourself</h2><p class="muted">Be as strict as an examiner. 3 is a solid C1 pass; 5 is the top of C1.</p>${C1.CRITERIA.map(([k, n, q]) => `<label class="stack" style="gap:4px"><b>${n}</b><small class="muted">${esc(q)}</small><select data-crit="${k}">${[0, 1, 2, 3, 4, 5].map(x => `<option ${x === 3 ? "selected" : ""}>${x}</option>`).join("")}</select></label>`).join("")}<div><button class="btn primary" id="saveSelf">Save my mark</button></div></div>`;
    $("#saveSelf", v).onclick = () => {
      const scores = {}; $$("[data-crit]", v).forEach(s => scores[s.dataset.crit] = +s.value);
      const fb = {self:true, scores, level:"self-marked", errors:localCheck(text).map(e => ({original:e.original, correction:e.correction, type:e.type, why_es:""})), upgrades:[], summary_es:"Autoevaluación. Los errores detectados son solo los típicos de hispanohablante que la app reconoce sin conexión."};
      storeMarked(W, text, fb); renderMarked(res, text, fb, S.writings[S.writings.length - 1]);
    };
    res.scrollIntoView({behavior:"smooth", block:"start"});
  };
  const doMark = async (queued) => {
    const text = queued || ta.value.trim(), photo = !queued && imgs.length > 0;
    if (!photo && words(text) < 60) return toast("Write at least 60 words, or add a photo of your handwriting.");
    const mb = $("#mark", v); mb.disabled = true; mb.innerHTML = `<span class="spin"></span> Marking… (≈30–90 s)`;
    res.innerHTML = `<div class="card"><p class="muted">The examiner is reading your ${esc(W.type.toLowerCase())}…</p></div>`;
    try {
      const fb = photo ? await aiImagesJSON(markPrompt(W, g, null), imgs) : await aiJSON(markPrompt(W, g, text), {modelTier:"complex", cache:false});
      const finalText = photo ? String(fb.transcript || "").trim() : text;
      if (!fb || !fb.scores || (photo && words(finalText) < 30)) throw {code:"invalid_json"};
      if (photo) { ta.value = finalText; saveDraft(W.id, finalText); upd(); imgs = []; $("#photoMsg", v).textContent = "Transcription copied below. If a word was misread, fix it and mark again."; }
      if (c.pendingMark && c.pendingMark.task === W.id) c.pendingMark = null;
      storeMarked(W, finalText, fb); renderMarked(res, finalText, fb, S.writings[S.writings.length - 1]);
    } catch (e) {
      const soft = e && ["offline", "rate_limited", "busy", "timeout", "unavailable"].includes(e.code);
      if (soft && !photo) { c.pendingMark = {task:W.id, text:text.slice(0, 3000), d:dayKey()}; save(); res.innerHTML = `<div class="card stack"><p>${esc(aiErr(e))}</p><p class="muted">Your text is saved in the marking queue. Open this task again later and it will be sent, or use “Mark it myself” now.</p></div>`; }
      else res.innerHTML = `<div class="card"><p>${esc(aiErr(e))}${photo ? " Keep the photos and try again in a minute." : ""}</p></div>`;
    }
    mb.disabled = !aiOn(); mb.innerHTML = `${I.sparkle} Mark it again`;
  };
  $("#mark", v).onclick = () => doMark();
  const last = S.writings.filter(x => x.task === W.id && x.fb).slice(-1)[0];
  if (c.pendingMark && c.pendingMark.task === W.id && aiOn() && navigator.onLine) { if (!ta.value.trim()) { ta.value = c.pendingMark.text; upd(); } res.innerHTML = `<div class="card"><p class="muted">Sending the text from your marking queue…</p></div>`; doMark(c.pendingMark.text); }
  else if (last) { res.innerHTML = `<div class="card"><p class="muted">Last marked on ${last.date}: <b class="mono">${last.fb.total}/20</b>${last.rw === null ? " · rewrite pending" : ""}. <button class="btn small" id="showLast">Show feedback</button></p></div>`; $("#showLast", v).onclick = () => renderMarked(res, last.text, last.fb, last); }
}
function markedHTML(text, fb, tips) {
  let marked = esc(text);
  (fb.errors || []).forEach(e => { const o = esc(e.original), i = marked.indexOf(o); if (i >= 0) marked = marked.slice(0, i) + `<mark style="background:var(--bad-bg);color:var(--ink);border-bottom:2px solid var(--bad)"${tips ? ` title="${esc(e.correction)}"` : ""}>${o}</mark>` + marked.slice(i + o.length); });
  return marked;
}
function renderMarked(res, text, fb, w) {
  const sc = fb.scores || {}, range = fb.scale_low && fb.scale_high ? `${fb.scale_low}–${fb.scale_high}` : fb.scale ? String(fb.scale) : "";
  const pend = w && w.rw === null;
  res.innerHTML = `<div class="card stack pop"><div class="row"><h2>${fb.self ? "Your own mark" : "Examiner's report"}</h2><span class="spacer"></span><b class="mono" style="font-size:1.4rem">${fb.total}/20</b><span class="chip">${esc(fb.level || "")}${range ? " · " + esc(range) : ""}</span></div>
   <div class="scores">${C1.CRITERIA.map(([k, n]) => `<div class="score"><small class="muted">${n}</small><b>${+sc[k] || 0}<small class="muted">/5</small></b><div class="bar" style="--c:var(--amber)"><i style="--p:${(+sc[k] || 0) * 20}%"></i></div></div>`).join("")}</div>
   ${fb.self ? "" : `<p class="muted" style="font-size:.8rem">An AI estimate, shown as a range. It is useful for spotting errors; only a trained examiner's mark is reliable. 24/40 over the two texts corresponds to 180.</p>`}
   ${fb.summary_es ? `<p>${esc(fb.summary_es)}</p>` : ""}
   ${(fb.strengths || []).length ? `<p class="muted"><b>Strengths:</b> ${fb.strengths.map(esc).join(" · ")}</p>` : ""}
   ${fb.next_focus_es ? `<p class="notice"><b>Next focus:</b> ${esc(fb.next_focus_es)}</p>` : ""}</div>
  <div class="card stack"><h3>Your text, errors highlighted</h3><div style="white-space:pre-wrap;line-height:1.8">${markedHTML(text, fb, true)}</div></div>
  <div class="card stack"><h3>Errors (${fb.errors.length}) · added to your review queue</h3>${fb.errors.map(e => `<div class="errline"><span><span class="typepill">${esc(e.type || "")}</span><span class="from">${esc(e.original)}</span> → <span class="to">${esc(e.correction)}</span></span><small class="muted">${esc(e.why_es || "")}</small></div>`).join("") || "<p class='muted'>No errors found.</p>"}</div>
  ${fb.upgrades.length ? `<div class="card stack"><h3>Upgrades</h3>${fb.upgrades.map(u => `<div class="errline"><span>${esc(u.original)} → <b style="color:var(--navy)">${esc(u.better)}</b></span><small class="muted">${esc(u.why_es || "")}</small></div>`).join("")}</div>` : ""}
  ${pend ? `<div class="card stack" style="--c:var(--amber)"><h3>3 · Not finished yet: rewrite it</h3><p class="muted">Tomorrow, rewrite the whole text from memory with these corrections in mind. ${fb.improved ? "The model answer unlocks once you have done it." : ""}</p><div><button class="btn" id="toRw">Go to the rewrite</button></div></div>`
    : fb.improved ? `<details class="card"><summary><b>Model C1 version of your answer</b></summary><div style="white-space:pre-wrap;margin-top:12px;line-height:1.75">${esc(fb.improved)}</div></details>` : ""}`;
  const b = $("#toRw", res); if (b) b.onclick = () => go("rewrite");
  res.scrollIntoView({behavior:"smooth", block:"start"});
}
function viewRewrite(v, force) {
  const w = pendingRewrite();
  if (!w) { v.innerHTML = `<div class="hello"><span class="eyebrow" style="color:var(--amber)">Rewrite</span><h1>Nothing to rewrite</h1><p class="muted">Every marked text has been rewritten. Do a micro-exercise or start a new text.</p></div><div class="row"><button class="btn red" id="mi">Micro-exercises · 10 min</button><button class="btn" id="wr">Writing tasks</button></div>`; $("#mi", v).onclick = () => go("micro"); $("#wr", v).onclick = () => go("write"); return; }
  const W = BANK.writing.find(x => x.id === w.task), fb = w.fb, key = w.task + ":rw";
  if (w.date === dayKey() && !force) {
    v.innerHTML = `<div class="hello"><span class="eyebrow" style="color:var(--amber)">Rewrite · ${esc(w.type)}</span><h1>Come back tomorrow</h1><p class="muted">You wrote this today. Leaving a night in between is part of the method: rewriting from memory after a gap is what fixes the corrections.</p></div><div class="row"><button class="btn" id="now">Rewrite now anyway</button><button class="btn primary" id="home">Back to Today</button></div>`;
    $("#now", v).onclick = () => viewRewrite(v, true); $("#home", v).onclick = () => go("today"); return;
  }
  v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Today</button></div>
  <div class="hello"><span class="eyebrow" style="color:var(--amber)">Rewrite · ${esc(w.type)} of ${fmtDay(w.date)}</span><h1>Same ideas, fewer errors</h1><p class="muted">The highlighted parts had a problem. The corrections are hidden: bring them back from memory, then compare.</p></div>
  ${W ? `<div class="prompt">${esc(W.prompt)}</div>` : ""}
  <div class="card stack"><h3>Your first version</h3><div style="white-space:pre-wrap;line-height:1.8">${markedHTML(w.text, fb, false)}</div>${fb.next_focus_es ? `<p class="notice"><b>Focus:</b> ${esc(fb.next_focus_es)}</p>` : ""}</div>
  <div class="card stack"><h3>Your rewrite</h3><textarea class="essay" id="rw" spellcheck="false" placeholder="Rewrite the whole text here.">${esc(drafts[key] || "")}</textarea><div class="row"><span class="mono" id="wc"></span><span class="spacer"></span><button class="btn primary" id="cmp">Compare</button></div></div><div id="out"></div>`;
  $("#bk", v).onclick = () => go("today");
  const ta = $("#rw", v), flat = s => String(s).toLowerCase().replace(/\s+/g, " ");
  const upd = () => { $("#wc", v).textContent = words(ta.value) + " words"; }; let dt; ta.oninput = () => { upd(); clearTimeout(dt); dt = setTimeout(() => saveDraft(key, ta.value), 400); }; upd();
  $("#cmp", v).onclick = () => {
    if (words(ta.value) < Math.min(120, words(w.text) * 0.6)) return toast("Rewrite the whole text, not just the errors.");
    const n = flat(ta.value), errs = fb.errors || [], still = errs.filter(e => n.includes(flat(e.original))), fixed = errs.length - still.length;
    w.rw = dayKey(); w.rwFixed = fixed; saveDraft(key, ""); addXP(30 + fixed * 3); markDone("rewrite"); save();
    $("#cmp", v).remove();
    $("#out", v).innerHTML = `<div class="card stack pop"><div class="row"><h2>Rewrite checked</h2><span class="spacer"></span><b class="mono" style="font-size:1.4rem">${fixed}/${errs.length}</b></div><p class="muted">problem areas no longer appear in your text.${still.length ? " These are still there:" : " Clean."}</p>
      ${still.map(e => `<div class="errline"><span><span class="from">${esc(e.original)}</span> → <span class="to">${esc(e.correction)}</span></span><small class="muted">${esc(e.why_es || "")}</small></div>`).join("")}
      <p class="muted" style="font-size:.85rem">All of them stay in your review queue until they stick.</p></div>
      ${fb.improved ? `<details class="card" open><summary><b>Model C1 version</b></summary><div style="white-space:pre-wrap;margin-top:12px;line-height:1.75">${esc(fb.improved)}</div></details>` : ""}
      <div class="row"><button class="btn primary" id="home">Back to Today</button></div>`;
    $("#home", v).onclick = () => go("today"); $("#out", v).scrollIntoView({behavior:"smooth", block:"start"});
  };
}
function viewMicro(v) {
  const kinds = Object.keys(C1.MICRO), k = kinds[dayIdx() % kinds.length], M = C1.MICRO[k];
  const start = (Math.floor(dayIdx() / kinds.length) * 3) % M.items.length, set = [0, 1, 2].map(i => M.items[(start + i) % M.items.length]);
  let i = 0, good = 0;
  const paint = () => {
    if (i >= set.length) { addXP(20 + good * 10); markDone("micro");
      v.innerHTML = `<div class="card stack pop" style="text-align:center;align-items:center;padding:32px 18px"><span class="eyebrow">Micro-exercises done</span><div class="big-score">${good}/${set.length}</div><p class="muted">The ones that fell short are in your review queue.</p><div class="row" style="justify-content:center"><button class="btn primary" id="home">Back to Today</button></div></div>`;
      $("#home", v).onclick = () => go("today"); return; }
    const [q, model] = set[i];
    v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Writing</button></div>
    <div class="hello"><span class="eyebrow" style="color:var(--amber)">Writing micro-exercise · ${i + 1} of ${set.length}</span><h1>${esc(M.n)}</h1><p class="muted">${esc(M.d)}</p></div>
    <div class="card stack"><div class="source">${esc(q)}</div><textarea class="answer" id="mine" rows="${k === "intro" ? 5 : 3}" spellcheck="false" placeholder="Your version"></textarea><div class="row"><button class="btn primary" id="cmp">Compare with a model</button></div><div id="out"></div></div>`;
    $("#bk", v).onclick = () => go("write");
    $("#cmp", v).onclick = () => {
      const mine = $("#mine", v).value.trim(); if (words(mine) < 4) return toast("Write your version first.");
      $("#cmp", v).remove(); $("#mine", v).disabled = true;
      $("#out", v).innerHTML = `<p>One good answer: <b>${esc(model)}</b></p><p class="muted" style="font-size:.85rem">There is more than one right answer. Does yours make the same move (structure, register, linker)?</p>
        <div class="row">${aiOn() ? `<button class="btn small ai" id="chk">${I.sparkle} Check mine</button>` : ""}<span class="spacer"></span><button class="btn" id="no">Mine falls short</button><button class="btn primary" id="yes">Mine does the job</button></div><div class="ai-out" id="aiOut" hidden></div>`;
      $("#yes", v).onclick = () => { good++; i++; paint(); };
      $("#no", v).onclick = () => { addCard({k:"mistake", f:q, b:model, ex:"", cat:"micro"}); i++; paint(); };
      const cb = $("#chk", v); if (cb) cb.onclick = async () => { cb.disabled = true; const o = $("#aiOut", v); o.hidden = false; o.textContent = "Thinking…"; try { await ai(`${LEARNER}\nTask (${M.n}): ${M.d}\nSource: "${q}"\nLearner's version: "${mine}"\nModel: "${model}"\nIn Spanish, in at most 70 words: is the learner's version correct and at C1 level? Point out any error and give the corrected sentence in English. Plain text.`, {modelTier:"quick", onText:({text}) => { o.textContent = text; }}); } catch (e) { o.textContent = aiErr(e); } };
    };
  };
  paint();
}

/* ---------- speaking: 4/3/2 y Part 2 ---------- */
async function markSpeech(res, blob, task) {
  res.innerHTML = `<div class="card"><p class="muted"><span class="spin"></span> The examiner is listening…</p></div>`;
  try {
    const fb = await aiAudioJSON(`You are a senior Cambridge English speaking examiner. ${LEARNER}\nTask given to the candidate: "${task}"\nListen and assess the answer at C1 level with the Cambridge speaking criteria. Be honest, not generous.\nReply with only a JSON object: {"scores": {"grammar": 0-5, "vocabulary": 0-5, "discourse": 0-5, "pronunciation": 0-5}, "summary_es": 2-3 sentences in Spanish, "errors": [{"original": exact words they said, "correction": corrected version, "why_es": short reason in Spanish}] (max 6), "upgrades": [up to 4 C1 phrases they could have used, in English]}`, blob);
    const sc = fb.scores || {}, total = ["grammar", "vocabulary", "discourse", "pronunciation"].reduce((a, k) => a + (+sc[k] || 0), 0);
    const errs = Array.isArray(fb.errors) ? fb.errors.filter(e => e && e.original && e.correction) : [];
    errs.forEach(e => addCard({k:"mistake", f:e.original, b:e.correction + (e.why_es ? " — " + e.why_es : ""), ex:"Speaking"}));
    record("speaking", total >= 12);
    res.innerHTML = `<div class="card stack pop"><div class="row"><h2>Examiner's report</h2><span class="spacer"></span><b class="mono" style="font-size:1.4rem">${total}/20</b></div><p class="muted" style="font-size:.8rem">An AI estimate, not an exam mark.</p>${fb.summary_es ? `<p>${esc(fb.summary_es)}</p>` : ""}
      ${errs.map(e => `<div class="errline"><span><span class="from">${esc(e.original)}</span> → <span class="to">${esc(e.correction)}</span></span><small class="muted">${esc(e.why_es || "")}</small></div>`).join("")}
      ${(fb.upgrades || []).length ? `<p class="muted"><b>Try next time:</b> ${fb.upgrades.map(esc).join(" · ")}</p>` : ""}</div>`;
  } catch (e) { res.innerHTML = `<div class="card"><p>${esc(micError(e))}</p></div>`; }
}
function viewTalk(v) {
  const mins = [4, 3, 2], c = c1s();
  let ti = dayIdx() % C1.TALK.length, round = 0, url = null, last = null, stopRec = null, cd = null;
  const paint = () => {
    const topic = C1.TALK[ti];
    v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Speaking</button></div>
    <div class="hello"><span class="eyebrow" style="color:var(--red)">Fluency · 4/3/2 · round ${round + 1} of 3</span><h1>${mins[round]} minutes</h1><p class="muted">Give the same talk three times, with less time each round. Don't add ideas: say the same things more smoothly.</p></div>
    <div class="card stack"><p style="font-size:1.15rem;line-height:1.5"><b>${esc(topic)}</b></p>${round === 0 ? `<p class="muted" style="font-size:.85rem">Take 30 seconds to plan three points. <button class="btn small ghost" id="other">Another topic</button></p>` : ""}
     <div class="row"><button class="btn red" id="rec">${I.mic} Start round</button><button class="btn" id="me" disabled>${I.ear} Play back</button><button class="btn small ghost" id="timerOnly">Timer only</button><span class="spacer"></span><button class="btn primary" id="next" disabled>${round < 2 ? `Next round · ${mins[round + 1]} min` : "Finish"}</button></div><p class="muted mono" id="msg"></p></div><div id="res"></div>`;
    $("#bk", v).onclick = () => go("speak");
    const ob = $("#other", v); if (ob) ob.onclick = () => { ti = (ti + 1) % C1.TALK.length; paint(); };
    $("#me", v).onclick = () => { if (url) new Audio(url).play(); };
    stopRec = recButton($("#rec", v), (blob) => { last = blob; if (url) URL.revokeObjectURL(url); url = URL.createObjectURL(blob); $("#me", v).disabled = false; $("#next", v).disabled = false; $("#msg", v).textContent = "Recorded."; }, mins[round] * 60);
    $("#timerOnly", v).onclick = () => { clearInterval(cd); const end = Date.now() + mins[round] * 60000; $("#next", v).disabled = false; cd = setInterval(() => { const l = Math.max(0, end - Date.now()), m = $("#msg", v); if (m) m.textContent = l ? `${Math.floor(l / 60000)}:${pad(Math.floor(l / 1000) % 60)} · keep talking` : "Time. Stop there."; if (!l) clearInterval(cd); }, 500); };
    $("#next", v).onclick = () => {
      stopRec && stopRec(); clearInterval(cd);
      if (round < 2) { round++; return paint(); }
      c.talks = (c.talks || 0) + 1; addXP(40); markDone("speak"); save();
      v.innerHTML = `<div class="card stack pop"><span class="eyebrow">4/3/2 complete</span><h2>Three rounds done</h2><p class="muted">Ask yourself: did the last round have fewer pauses? Did you reuse the same expressions more easily? That is fluency building.</p>
        <div class="row">${last && aiOn() ? `<button class="btn ai" id="mk">${I.sparkle} Mark my last round · 1 AI request</button>` : ""}<button class="btn primary" id="home">Back to Today</button></div></div><div id="res"></div>`;
      $("#home", v).onclick = () => go("today");
      const mk = $("#mk", v); if (mk) mk.onclick = () => { mk.disabled = true; markSpeech($("#res", v), last, C1.TALK[ti]); };
    };
  };
  paint();
  cleanup = () => { stopRec && stopRec(); clearInterval(cd); Rec.release(); if (url) URL.revokeObjectURL(url); };
}
function viewP2(v) {
  const c = c1s(), p = C1.P2[((c.p2 || 0) + dayIdx()) % C1.P2.length];
  let url = null, last = null, stopRec = null;
  v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Speaking</button></div>
  <div class="hello"><span class="eyebrow" style="color:var(--red)">Speaking Part 2 · long turn</span><h1>One minute, two pictures</h1><p class="muted">In the exam you get three photos and talk about two of them for a minute. Here the pictures are described: imagine them, compare, then speculate.</p></div>
  <div class="card stack"><p><b>Picture A:</b> ${esc(p.a)}.</p><p><b>Picture B:</b> ${esc(p.b)}.</p><p style="font-size:1.1rem"><b>${esc(p.q)}</b></p>
   <p class="muted" style="font-size:.85rem">Compare first (Both pictures show…, whereas…), then answer the question with speculation (They might well be…). Don't describe each picture separately.</p>
   <div class="row"><button class="btn red" id="rec">${I.mic} Start · 1 min</button><button class="btn" id="me" disabled>${I.ear} Play back</button><span class="spacer"></span>${aiOn() ? `<button class="btn ai" id="mk" disabled>${I.sparkle} Mark it</button>` : ""}<button class="btn primary" id="done">Done</button></div></div><div id="res"></div>`;
  $("#bk", v).onclick = () => go("speak");
  $("#me", v).onclick = () => { if (url) new Audio(url).play(); };
  stopRec = recButton($("#rec", v), (blob) => { last = blob; if (url) URL.revokeObjectURL(url); url = URL.createObjectURL(blob); $("#me", v).disabled = false; const mk = $("#mk", v); if (mk) mk.disabled = false; }, 60);
  const mk = $("#mk", v); if (mk) mk.onclick = () => { mk.disabled = true; markSpeech($("#res", v), last, `Compare two pictures (A: ${p.a}; B: ${p.b}). ${p.q}`); };
  $("#done", v).onclick = () => { c.p2 = (c.p2 || 0) + 1; addXP(20); markDone("speak"); save(); go("speak"); };
  cleanup = () => { stopRec && stopRec(); Rec.release(); if (url) URL.revokeObjectURL(url); };
}

/* ---------- simulacros oficiales y diagnóstico ---------- */
function viewMocks(v) {
  const c = c1s(), ph = phase(), keys = Object.keys(C1.AREAS);
  const checks = [
    ["Marks of your last mock entered", c.mocks.length > 0, "mocks"],
    ["Use of English Parts 1–4, timed", (S.mocks || []).some(m => m.d >= c.start), "play-mock"],
    ["One reading text", Object.values(S.read).some(x => x.at >= c.start), "read"],
    ["One listening", Object.values(S.listen).some(x => x.at >= c.start), "listen"],
    ["One full writing, marked", S.writings.some(w => w.date >= c.start), "write"],
    ["One speaking task", (c.talks || 0) + (c.p2 || 0) > 0 || Object.values(S.speak || {}).some(x => x.date >= c.start), "speak"]
  ];
  v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Mission control</button></div>
  <div class="hello"><span class="eyebrow">Official mocks</span><h1>The only numbers that count</h1><p class="muted">Your level is measured only with official Cambridge practice tests, sat under exam conditions. The app's own questions are for practice and never feed these estimates.</p></div>
  ${ph.id === "diag" ? `<div class="card stack" style="--c:var(--red)"><h3>Diagnostic week</h3>${checks.map(([n, ok, to]) => `<button class="stop ${ok ? "done" : ""}" data-go="${to}" style="--c:var(--red)"><span class="dot">${ok ? I.check : ""}</span><span class="lbl"><b>${n}</b></span><span class="go">${I.arrow}</span></button>`).join("")}<div><button class="btn primary" id="diagDone">Close the diagnostic and start the plan</button></div></div>` : ""}
  <div class="card stack"><h3>Enter a result</h3>
    <p class="muted" style="font-size:.85rem">Raw marks, as you count them with the answer key. Reading: Parts 1 and 8 one mark each, Parts 5, 6 and 7 two marks each (50). Use of English: Parts 2 and 3 one mark, Part 4 up to two (28). Writing: two texts out of 20. Leave blank what you did not sit; Speaking needs a teacher or a partner to mark it.</p>
    <div class="row"><label>Date <input type="date" id="mD" value="${dayKey()}"></label><label class="row" style="gap:6px"><input type="checkbox" id="mOff" checked style="width:18px;height:18px"> Official Cambridge paper</label></div>
    <div class="scores">${keys.map(k => `<label class="score"><small class="muted">${C1.AREAS[k].n} /${C1.AREAS[k].max}</small><input type="number" inputmode="numeric" min="0" max="${C1.AREAS[k].max}" data-area="${k}" style="width:100%"><small class="mono muted" data-prev="${k}">—</small></label>`).join("")}</div>
    <div class="row"><button class="btn primary" id="mSave">Save result</button><a class="btn ghost" href="${C1.LINKS.samples}" target="_blank" rel="noopener">${I.link || ""} Free official sample papers</a></div>
    <p class="muted" style="font-size:.8rem">Conversion from Cambridge's guide to converting practice test scores (anchors at 142, 160, 180 and 200; values in between are interpolated). It applies only to official practice tests.</p></div>
  <div class="card stack"><h3>History</h3>${c.mocks.length ? c.mocks.slice().sort((a, b) => a.d < b.d ? 1 : -1).map(m => { const av = mockAvg(m); return `<div class="errline"><span><b class="mono">${m.d}</b> ${m.off ? "" : `<span class="typepill">not official</span>`} ${keys.filter(k => hasRaw(m, k)).map(k => `${C1.AREAS[k].n} <b class="mono">${m.r[k]}</b> → ${scTxt(toScale(k, m.r[k]))}`).join(" · ")}</span><small class="muted">${av != null ? "Overall " + av + (av >= 180 ? " · pass" : " · below 180") : "Incomplete: no overall score"} <button class="btn small ghost" data-del="${m.id}">Delete</button></small></div>`; }).join("") : `<p class="muted">Nothing yet. Start with the mock you have already done.</p>`}</div>`;
  $("#bk", v).onclick = () => go("progress");
  $$("[data-go]", v).forEach(b => b.onclick = () => go(b.dataset.go));
  const dd = $("#diagDone", v); if (dd) dd.onclick = () => { c.diagDone = dayKey(); save(); toast("Baseline set. The plan starts now."); go("today"); };
  $$("[data-area]", v).forEach(inp => inp.oninput = () => { const k = inp.dataset.area; $(`[data-prev="${k}"]`, v).textContent = inp.value === "" ? "—" : scTxt(toScale(k, inp.value)); });
  $("#mSave", v).onclick = () => {
    const r = {}; $$("[data-area]", v).forEach(inp => { if (inp.value !== "") r[inp.dataset.area] = Math.max(0, Math.min(C1.AREAS[inp.dataset.area].max, +inp.value)); });
    if (!Object.keys(r).length) return toast("Enter at least one mark.");
    c.mocks.push({id:Date.now().toString(36), d:$("#mD", v).value || dayKey(), off:$("#mOff", v).checked, r}); save(); toast("Saved."); route();
  };
  $$("[data-del]", v).forEach(b => b.onclick = () => { tomb("m:" + b.dataset.del); c.mocks = c.mocks.filter(m => m.id !== b.dataset.del); save(); route(); });
}

/* ---------- panel de progreso (cuadro de mando) ---------- */
function bufferStatus() {
  const need = {mc:16, oc:16, wf:16, kwt:12}, low = [], have = {}, c = c1s();
  for (const t in need) { have[t] = pool(t).filter(x => !S.seen[x._id] && (!x.pt || c.pts[x.pt])).length; if (have[t] < need[t]) low.push(TYPES[t].name); }
  const r = allArticles().filter(a => !S.read[a.id]).length, l = allListening().filter(a => !S.listen[a.id]).length;
  if (r < 4) low.push("articles"); if (l < 4) low.push("recordings");
  return {low, have, need, r, l};
}
async function stockUp(msg) {
  const b = bufferStatus(); let n = 0;
  for (const t of ["kwt", "wf", "oc", "mc"]) { if (b.have[t] >= b.need[t]) continue; msg(`Writing ${TYPES[t].name} questions…`); try { n += await generateItems(t); } catch (e) { msg(aiErr(e)); return n; } }
  msg(n ? `${n} new questions stored for offline use.` : "The question buffer is full. Fresh articles and recordings are generated from Read and Listen.");
  return n;
}
function risks() {
  const c = c1s(), out = [], ph = phase().id, e = estimates(), due = dueCards().length;
  const dec = decision(); if (dec && dec.bad) out.push({t:dec.t, to:"mocks"});
  const md = mockDue(); if (md && md.overdue && !(dec && dec.bad)) out.push({t:md.txt + " Sit an official sample paper under exam conditions and enter the marks.", to:"mocks"});
  const weak = Object.keys(e).filter(k => e[k] && (e[k].sc || 0) < C1.PASS); if (weak.length) out.push({t:"Below 180 in your last official mock: " + weak.map(k => C1.AREAS[k].n).join(", ") + "."});
  const pw = pendingRewrite(); if (pw && pw.date < dayKey()) out.push({t:`Unfinished correction: your ${pw.type.toLowerCase()} of ${fmtDay(pw.date)} has not been rewritten.`, to:"rewrite"});
  if (c.pendingMark) out.push({t:"A text is waiting in the marking queue.", to:"write-" + c.pendingMark.task});
  if (due > 40) out.push({t:`${due} reviews have piled up. Clear them with two or three 5-minute mixes.`, to:"mix"});
  const lw = S.writings[S.writings.length - 1]; if (ph !== "diag" && ph !== "done" && (!lw || daysBetween(lw.date, dayKey()) > 10)) out.push({t:"No full writing in the last 10 days. Writing is one of your two priority areas.", to:"write"});
  if (!c.human || daysBetween(c.human, dayKey()) > 30) out.push({t:"No speaking practice with a real person in the last month. The exam is taken in pairs, and the app can't simulate a partner.", act:"human", lbl:"I practised today"});
  if (!c.humanMarked && (ph === "consol" || ph === "exam")) out.push({t:"No writing marked by a teacher yet. AI marks are estimates: get three or four texts marked by a person before the exam.", act:"humanMarked", lbl:"Done"});
  const buf = bufferStatus(); if (buf.low.length) out.push({t:"Offline buffer below two weeks: " + buf.low.join(", ") + ".", act:aiOn() ? "stock" : "", lbl:"Stock up"});
  return out;
}
function dashHTML() {
  const c = c1s(), ph = phase(), left = daysToExam(), ex = examDate(), e = estimates(), ov = overall(), R = risks(), k = dayKey();
  const top = S.deck.filter(x => (x.lapses || 0) >= 1).sort((a, b) => (b.lapses || 0) - (a.lapses || 0)).slice(0, 5);
  const ms = [[c.start, "Plan started"], [addDays(ex, -97), "Consolidation begins"], [addDays(ex, -45), "Go / no-go decision"], [addDays(ex, -38), "Exam mode"], [addDays(ex, -10), "Final 10 days: no new content"], [ex, "C1 Advanced, paper-based"]];
  const rw = S.writings.filter(w => w.rw).length, mk = S.writings.filter(w => w.fb).length;
  return `<div class="card examhero"><div class="examdays"><div class="big-score">${Math.max(0, left)}</div><span class="muted">days to go</span></div>
    <div class="stack" style="flex:1"><span class="eyebrow">C1 Advanced · paper · ${new Date(ex + "T12:00:00").toLocaleDateString("en-GB", {weekday:"long", day:"numeric", month:"long", year:"numeric"})}</span><h2>${esc(ph.n)}</h2><p class="muted">${esc(ph.s)}</p>
    <div class="row"><button class="btn small" data-go="mocks">Official mocks</button><button class="btn small ghost" data-go="today">Today's session</button></div></div></div>
  <div class="card stack"><div class="row"><h3>Estimated score by area</h3><span class="spacer"></span><span class="muted" style="font-size:.8rem">pass ${C1.PASS} · target ${C1.TARGET}</span></div><p class="muted" style="font-size:.85rem">From your latest official practice test in each area. Five areas, 20% each; the result is their average and you don't need to pass each one.</p>
    <div class="stack">${Object.keys(C1.AREAS).map(a => { const x = e[a], sc = x ? (x.sc || 141) : null; return `<div class="skillrow"><span>${C1.AREAS[a].n}</span><div class="bar" style="--c:${sc == null ? "var(--muted)" : sc >= C1.TARGET ? "var(--green)" : sc >= C1.PASS ? "var(--amber)" : "var(--red)"}"><i style="--p:${sc == null ? 0 : Math.max(4, (sc - 140) / 70 * 100)}%"></i></div><span class="mono">${x ? scTxt(x.sc) : "—"}</span></div>`; }).join("")}</div>
    <div class="row"><b>Overall${ov && ov.n < 5 ? ` (${ov.n} of 5 areas)` : ""}</b><span class="spacer"></span><b class="mono" style="font-size:1.5rem">${ov ? ov.avg : "—"}</b><span class="chip">${ov ? (ov.avg >= C1.TARGET ? "on target" : ov.avg >= C1.PASS ? "pass, no margin yet" : (C1.PASS - ov.avg) + " below the pass mark") : "no official mock yet"}</span></div></div>
  <div class="grid-2"><div class="card stack"><h3>Milestones</h3>${ms.map(([d, n]) => `<div class="row"><span class="mono muted" style="width:64px">${fmtDay(d)}</span><span style="flex:1">${d <= k ? "<b>" + n + "</b>" : n}</span><span class="muted">${d <= k ? I.check : daysBetween(k, d) + " d"}</span></div>`).join("")}</div>
    <div class="card stack"><h3>Risks</h3>${R.length ? R.map(r => `<div class="errline"><span>${esc(r.t)}</span><small>${r.to ? `<button class="btn small" data-go="${r.to}">Open</button>` : ""}${r.act ? `<button class="btn small" data-act="${r.act}">${r.lbl}</button>` : ""}</small></div>`).join("") : `<p class="muted">No open risks.</p>`}<small class="muted" id="dashMsg"></small></div></div>
  <div class="grid-2"><div class="card stack"><h3>Status</h3><div class="scores">
     <div class="score"><small class="muted">Reviews due</small><b>${dueCards().length}</b></div><div class="score"><small class="muted">Streak</small><b>${liveStreak()}</b></div>
     <div class="score"><small class="muted">Syllabus points</small><b>${Object.keys(c.pts).length}<small class="muted">/${C1.POINTS.length}</small></b></div><div class="score"><small class="muted">Texts rewritten</small><b>${rw}<small class="muted">/${mk}</small></b></div></div></div>
    <div class="card stack"><h3>Errors you repeat most</h3>${top.length ? top.map(x => `<div class="errline"><span><b>${esc(x.k === "item" ? x.b : x.f)}</b>${x.k === "mistake" ? " → " + esc(String(x.b).split(" — ")[0]) : ""}</span><small class="muted">${x.k === "item" ? esc(x.f) + " · " : ""}missed ${x.lapses} time${x.lapses > 1 ? "s" : ""}</small></div>`).join("") : `<p class="muted">Nothing repeated yet. Cards you miss more than once show up here.</p>`}</div></div>`;
}
function bindDash(v) {
  $$("[data-go]", v).forEach(b => b.onclick = () => go(b.dataset.go));
  $$("[data-act]", v).forEach(b => b.onclick = async () => {
    const c = c1s(), a = b.dataset.act;
    if (a === "stock") { b.disabled = true; await stockUp(t => { const m = $("#dashMsg", v); if (m) m.textContent = t; }); return; }
    c[a] = dayKey(); save(); route();
  });
}
function aiCount() { try { const o = JSON.parse(localStorage.getItem("mtg-ai-usage") || "{}"); return o.d === dayKey() ? o.n : 0; } catch (e) { return 0; } }
function aiTick() { try { localStorage.setItem("mtg-ai-usage", JSON.stringify({d:dayKey(), n:aiCount() + 1})); } catch (e) {} }

/* ---------- phrasebook: buscar, guardar y aprender expresiones ---------- */
const fold = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’‘`´]/g, "'");
function pbAll() {
  const out = [], seen = new Set();
  const add = (f, m, ex, cat, extra) => { f = String(f || "").trim(); const k = fold(f); if (!f || seen.has(k)) return; seen.add(k); out.push(Object.assign({f, m:String(m || ""), ex:String(ex || ""), cat}, extra)); };
  const split = (why, alt) => { const w = String(why || "").trim().replace(/\.$/, ""), i = w.indexOf(" = "); const par = w.match(/^([^()]+?) \(([^()]+)\)$/); if (i < 0 && par) return [par[1], par[2]]; return i > 0 ? [w.slice(0, i), w.slice(i + 3)] : words(w) <= 8 && w ? [w, ""] : [alt, w]; };
  const fill = (x) => String(x.s).replace(/_{3,}/, x.o[x.a]);
  (S.pb || []).forEach(e => add(e.f, e.m, e.ex, "My phrases", {mine:e.id, note:e.note || ""}));
  S.deck.filter(c => c.k === "chunk" && !/^ph:/.test(c.id)).forEach(c => add(c.f, c.b, c.ex, "My phrases", {}));
  for (const cat in PHRASES) PHRASES[cat].forEach(p => add(p[0], p[1], p[2], cat));
  pool("idioms").forEach(x => add(x.t, x.m, x.ex, "Idioms"));
  pool("work").forEach(x => add(x.t, x.m, x.ex, "Projects & work"));
  pool("pv").forEach(x => { const [f, m] = split(x.why, x.o[x.a]); add(f, m, fill(x), "Phrasal verbs"); });
  pool("mc").filter(x => !x.pt).forEach(x => { const [f, m] = split(x.why, x.o[x.a]); add(f, m, fill(x), "Collocations"); });
  Object.keys(C1.GENRES).forEach(g => C1.GENRES[g].phrases.forEach(p => add(p[0], p[1], "", "Writing · " + C1.GENRES[g].n)));
  C1.TALKPH.forEach(p => add(p[0], p[1], "", "Speaking"));
  C1.POINTS.forEach(p => p.ex.forEach(x => add(x, p.t, "", "Grammar patterns", {noLearn:true})));
  return out;
}
function viewPhrases(v) {
  let all = pbAll(), q = "", cat = "", onlyRev = false, limit = 40;
  const inDeck = () => { const m = new Map(); S.deck.forEach(c => { if (c.k !== "item" && c.k !== "mistake") m.set(fold(c.f), c); }); return m; };
  const cats = () => { const n = {}; all.forEach(e => n[e.cat] = (n[e.cat] || 0) + 1); return Object.keys(n).sort((a, b) => a === "My phrases" ? -1 : b === "My phrases" ? 1 : a < b ? -1 : 1).map(c => [c, n[c]]); };
  v.innerHTML = `<div class="hello"><span class="eyebrow" style="color:var(--navy)">Phrasebook · works offline</span><h1>Look it up. <span>Keep it.</span></h1>
    <p class="muted">Every expression in the app in one place, plus your own. Search in English or Spanish, then tap Learn to send it to your review queue.</p></div>
  <div class="card stack pbsearch"><input type="search" class="answer" id="pbQ" placeholder="Search: deadline, a pesar de, put off…" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" style="margin:0" aria-label="Search the phrasebook">
    <div class="pbcats" id="pbCats"></div></div>
  <div id="pbList" class="stack"></div>
  <details class="card stack methodcard" id="pbAddBox"><summary><b>Add your own expression</b></summary>
    <input class="answer" id="nF" placeholder="Expression in English" autocapitalize="off" spellcheck="false" style="margin:0">
    <input class="answer" id="nM" placeholder="Meaning (Spanish or English)" style="margin:0">
    <input class="answer" id="nE" placeholder="Example sentence (optional)" spellcheck="false" style="margin:0">
    <div class="row">${aiOn() ? `<button class="btn ai small" id="nAI">${I.sparkle} Fill in with Gemini</button>` : ""}<span class="spacer"></span><button class="btn primary" id="nSave">Save and learn</button></div></details>`;
  const list = $("#pbList", v);
  const saveMine = (e, learn) => {
    S.pb = S.pb || []; const k = fold(e.f);
    if (!S.pb.some(x => fold(x.f) === k)) S.pb.push({id:Date.now().toString(36) + Math.random().toString(36).slice(2, 5), f:e.f.trim(), m:(e.m || "").trim(), ex:(e.ex || "").trim(), note:(e.note || "").trim(), d:dayKey()});
    if (learn && !inDeck().has(k)) addCard({k:"chunk", f:e.f.trim(), b:(e.m || "").trim(), ex:(e.ex || "").trim()});
    save(); all = pbAll();
  };
  const rowHTML = (e, i, deck) => { const c = deck.get(fold(e.f));
    return `<div class="card pbrow" data-i="${i}"><div class="row"><b class="pbf">${esc(e.f)}</b><button class="icon-btn" data-say aria-label="Listen">${I.speaker}</button><span class="spacer"></span>${e.noLearn ? "" : c ? `<span class="chip">${I.check} In review · box ${c.box}</span>` : `<button class="btn small primary" data-learn>Learn</button>`}</div>
      ${e.m ? `<p>${esc(e.m)}</p>` : ""}${e.ex ? `<p class="muted"><i>${esc(e.ex)}</i></p>` : ""}${e.note ? `<p class="muted" style="font-size:.85rem">${esc(e.note)}</p>` : ""}
      <div class="row"><span class="typepill">${esc(e.cat)}</span><span class="spacer"></span>${e.mine ? `<button class="btn small ghost" data-del>Delete</button>` : ""}</div></div>`; };
  const paint = () => {
    const deck = inDeck(), toks = fold(q).split(/\s+/).filter(Boolean);
    $("#pbCats", v).innerHTML = `<button class="pbcat ${!cat && !onlyRev ? "on" : ""}" data-cat="">All <span class="mono">${all.length}</span></button><button class="pbcat ${onlyRev ? "on" : ""}" data-rev="1">In review</button>` + cats().map(([c, n]) => `<button class="pbcat ${cat === c ? "on" : ""}" data-cat="${esc(c)}">${esc(c)} <span class="mono">${n}</span></button>`).join("");
    $$(".pbcat", v).forEach(b => b.onclick = () => { if (b.dataset.rev) { onlyRev = !onlyRev; cat = ""; } else { cat = b.dataset.cat; onlyRev = false; } limit = 40; paint(); });
    let res = all.filter(e => (!cat || e.cat === cat) && (!onlyRev || deck.has(fold(e.f))));
    if (toks.length) {
      res = res.map(e => { const f = fold(e.f), hay = f + " | " + fold(e.m) + " | " + fold(e.ex); if (!toks.every(t => hay.includes(t))) return null; const fq = fold(q).trim(); return {e, s:f === fq ? 0 : f.startsWith(fq) ? 1 : toks.every(t => f.includes(t)) ? 2 : toks.every(t => fold(e.m).includes(t)) ? 3 : 4}; }).filter(Boolean).sort((a, b) => a.s - b.s).map(x => x.e);
    }
    const shown = res.slice(0, limit);
    list.innerHTML = shown.map(e => rowHTML(e, all.indexOf(e), deck)).join("")
      + (res.length > limit ? `<div class="row"><button class="btn" id="pbMore">Show more · ${res.length - limit} left</button></div>` : "")
      + (!res.length ? `<div class="card stack"><h3>Nothing for “${esc(q || cat || "that")}”</h3><p class="muted">${toks.length ? "It isn't in the phrasebook yet." : onlyRev ? "You haven't sent anything to review from here yet." : "Empty."}</p>${toks.length ? `<div class="row">${aiOn() ? `<button class="btn ai" id="pbAsk">${I.sparkle} Look it up with Gemini · 1 request</button>` : ""}<button class="btn" id="pbOwn">Add it myself</button></div>${aiOn() ? "" : `<p class="muted" style="font-size:.85rem">With a free Gemini key (Settings) the app can look up anything, in English or Spanish.</p>`}` : ""}<div id="pbAI" class="stack"></div></div>` : toks.length && aiOn() ? `<div class="row"><button class="btn ai small" id="pbAsk">${I.sparkle} Not what you wanted? Ask Gemini</button></div><div id="pbAI" class="stack"></div>` : "");
    $$(".pbrow", list).forEach(r => { const e = all[+r.dataset.i]; if (!e) return;
      $("[data-say]", r).onclick = () => TTS.speak(e.ex ? `${e.f}. ${e.ex}` : e.f);
      const lb = $("[data-learn]", r); if (lb) lb.onclick = () => { addCard({k:"chunk", f:e.f, b:e.m, ex:e.ex}); toast("In your review queue. It comes up in the next mix."); paint(); };
      const db = $("[data-del]", r); if (db) db.onclick = () => { tomb("p:" + e.mine); S.pb = (S.pb || []).filter(x => x.id !== e.mine); save(); all = pbAll(); paint(); toast("Deleted from your phrases."); };
    });
    const mb = $("#pbMore", v); if (mb) mb.onclick = () => { limit += 40; paint(); };
    const ob = $("#pbOwn", v); if (ob) ob.onclick = () => { const d = $("#pbAddBox", v); d.open = true; $("#nF", v).value = q; d.scrollIntoView({behavior:"smooth", block:"center"}); $("#nM", v).focus(); };
    const ab = $("#pbAsk", v); if (ab) ab.onclick = () => ask(ab);
  };
  const lookup = (term) => aiJSON(`${LEARNER}\nThe learner typed this into their personal phrasebook: "${term}". It may be an English word or expression (possibly misspelt) or a Spanish word or idea they want to say in English. Give the 1-3 most useful British English expressions for it at B2-C1 level. If the input is already a correct English expression, the first entry must be that expression in its dictionary form.\nReply with only a JSON object: {"entries":[{"f": the expression, "m": its meaning in Spanish (max 15 words), "ex": one natural example sentence in British English, "note": a register or usage warning in Spanish (max 15 words) or ""}]}`, {modelTier:"quick", cache:false});
  const ask = async (btn) => {
    const term = q.trim(), box = $("#pbAI", v); if (!term || !box) return;
    btn.disabled = true; box.innerHTML = `<p class="muted"><span class="spin"></span> Looking it up…</p>`;
    try {
      const r = await lookup(term), es = (r && Array.isArray(r.entries) ? r.entries : []).filter(e => e && e.f && e.m).slice(0, 3);
      if (!es.length) throw {code:"invalid_json"};
      box.innerHTML = es.map((e, i) => `<div class="pbrow card" style="--c:var(--navy)"><div class="row"><b class="pbf">${esc(e.f)}</b><span class="spacer"></span><button class="btn small primary" data-keep="${i}">Save and learn</button></div><p>${esc(e.m)}</p>${e.ex ? `<p class="muted"><i>${esc(e.ex)}</i></p>` : ""}${e.note ? `<p class="muted" style="font-size:.85rem">${esc(e.note)}</p>` : ""}</div>`).join("") + `<p class="muted" style="font-size:.8rem">Written by Gemini: usually right, not infallible. Check anything that looks odd in a dictionary.</p>`;
      $$("[data-keep]", box).forEach(b => b.onclick = () => { saveMine(es[+b.dataset.keep], true); b.disabled = true; b.textContent = "Saved"; toast("Saved to My phrases and to your review queue."); });
    } catch (e) { box.innerHTML = `<p>${esc(aiErr(e))}</p>`; btn.disabled = false; }
  };
  let t; $("#pbQ", v).oninput = (e) => { q = e.target.value; if (q.trim()) { cat = ""; onlyRev = false; } limit = 40; clearTimeout(t); t = setTimeout(paint, 120); };
  $("#nSave", v).onclick = () => {
    const f = $("#nF", v).value.trim(); if (!f) return toast("Type the expression first.");
    saveMine({f, m:$("#nM", v).value, ex:$("#nE", v).value}, true);
    ["#nF", "#nM", "#nE"].forEach(s => $(s, v).value = ""); cat = "My phrases"; onlyRev = false; q = ""; $("#pbQ", v).value = ""; paint(); toast("Saved to My phrases and to your review queue.");
  };
  const nb = $("#nAI", v); if (nb) nb.onclick = async () => {
    const f = $("#nF", v).value.trim(); if (!f) return toast("Type the expression first.");
    nb.disabled = true; nb.innerHTML = `<span class="spin"></span> Thinking…`;
    try { const r = await lookup(f), e = r && r.entries && r.entries[0]; if (!e) throw {code:"invalid_json"}; $("#nF", v).value = e.f || f; $("#nM", v).value = e.m || ""; $("#nE", v).value = e.ex || ""; }
    catch (e) { toast(aiErr(e)); }
    nb.disabled = false; nb.innerHTML = `${I.sparkle} Fill in with Gemini`;
  };
  paint();
  setTimeout(() => { if (matchMedia("(pointer:fine)").matches) $("#pbQ", v).focus(); }, 50);
}

/* ---------- settings ---------- */
function settingsSheet() {
  const bg = document.createElement("div"); bg.className = "sheet-bg";
  bg.innerHTML = `<div class="card sheet stack" role="dialog" aria-label="Settings"><div class="row"><h2>Settings</h2><span class="spacer"></span><button class="icon-btn" id="x" aria-label="Close">✕</button></div>
  <label class="stack" style="gap:6px"><b>Daily goal</b><select id="goal">${[[150, "Light · ~20 min"], [300, "Serious · ~45 min"], [500, "Intense · 60+ min"]].map(([g, n]) => `<option value="${g}" ${S.settings.goal === g ? "selected" : ""}>${g} XP — ${n}</option>`).join("")}</select></label>
  <div class="stack" style="gap:6px"><b>British voice</b><div class="row"><select id="voiceSel"></select><button class="btn small" id="t">${I.speaker} Test</button></div><small class="muted" id="voiceNote"></small></div>
  <label class="row" style="gap:10px;cursor:pointer"><input type="checkbox" id="tipsOn" ${S.settings.tips ? "checked" : ""} style="width:20px;height:20px"><span><b>Consejos en los ejercicios</b><br><small class="muted">Método y consejo clave encima de cada pregunta.</small></span></label>
  <label class="row" style="gap:10px;cursor:pointer"><input type="checkbox" id="pfOn" ${S.settings.produce !== false ? "checked" : ""} style="width:20px;height:20px"><span><b>Answer before the options</b><br><small class="muted">In multiple-choice questions, type your answer first. Harder, and it sticks better.</small></span></label>
  <div class="stack" style="gap:6px"><b>Exam date · C1 Advanced on paper</b><div class="row"><input type="date" id="examD" value="${examDate()}"><select id="examPick"><option value="">Official paper dates 2027…</option>${C1.PAPER_DATES.map(d => `<option value="${d}">${fmtDay(d)}</option>`).join("")}</select></div><small class="muted">Phases, review dates and the countdown are all calculated from this date. Check your centre's entry deadline.</small></div>
  <details><summary><b>Weekly plan</b></summary><div class="stack" style="gap:6px;margin-top:8px">${[1, 2, 3, 4, 5, 6, 0].map(d => `<div class="row"><span style="width:96px">${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d]}</span><select data-wk="${d}">${Object.keys(C1.BLOCKS).map(b => `<option value="${b}" ${(c1s().week[d] || C1.WEEK[d]) === b ? "selected" : ""}>${C1.BLOCKS[b].n}</option>`).join("")}</select></div>`).join("")}</div></details>
  <div class="stack" style="gap:6px"><b>AI usage</b><small class="muted">${aiCount()} request${aiCount() === 1 ? "" : "s"} today from this device. The free Gemini quota is small and changes without notice; see your real limits in Google AI Studio. On the free tier Google may use what you send to improve its products, so keep private data out of your texts.</small><div class="row"><button class="btn small ai" id="stock" ${aiOn() ? "" : "disabled"}>${I.sparkle} Stock up for offline</button><small class="muted" id="stockMsg"></small></div></div>
  <div id="mtgBackend" class="stack"></div>
  <div class="stack" style="gap:6px"><b>Backup</b><div class="row"><button class="btn small" id="copy">Copy progress code</button></div><textarea class="answer" id="imp" rows="2" placeholder="Paste a progress code here to restore it" spellcheck="false"></textarea><div><button class="btn small" id="doImp">Restore</button></div></div>
  <p class="muted" style="font-size:.8rem">AI: ${aiOn() ? "Gemini connected" : "not connected"} · ${pool("wf").length + pool("kwt").length + pool("oc").length + pool("mc").length} Use of English items · ${BANK.spell.length + (S.ai.spell || []).length} spelling words</p></div>`;
  document.body.append(bg);
  const close = () => bg.remove();
  bg.onclick = (e) => { if (e.target === bg) close(); }; $("#x", bg).onclick = close;
  $("#goal", bg).onchange = (e) => { S.settings.goal = +e.target.value; save(); route(); };
  $("#tipsOn", bg).onchange = (e) => { S.settings.tips = e.target.checked; save(); };
  $("#pfOn", bg).onchange = (e) => { S.settings.produce = e.target.checked; save(); };
  const setExam = (d) => { if (!d) return; S.settings.examDate = d; $("#examD", bg).value = d; save(); route(); toast("Exam date set: " + fmtDay(d) + "."); };
  $("#examD", bg).onchange = (e) => setExam(e.target.value); $("#examPick", bg).onchange = (e) => setExam(e.target.value);
  $$("[data-wk]", bg).forEach(s => s.onchange = () => { c1s().week[s.dataset.wk] = s.value; save(); route(); });
  $("#stock", bg).onclick = async (e) => { e.target.disabled = true; await stockUp(t => { $("#stockMsg", bg).textContent = t; }); e.target.disabled = false; };
  window.MTG && window.MTG.mountSettings($("#mtgBackend", bg));
  paintVoiceSel(); $("#t", bg).onclick = () => TTS.speak("Cheers. This is how I'll read your texts.");
  $("#copy", bg).onclick = async () => { const code = btoa(unescape(encodeURIComponent(JSON.stringify(S)))); try { await navigator.clipboard.writeText(code); toast("Copied. Keep it somewhere safe."); } catch (e) { const ta = $("#imp", bg); ta.value = code; ta.select(); toast("Select-all and copy the text in the box."); } };
  $("#doImp", bg).onclick = () => { try { const o = JSON.parse(decodeURIComponent(escape(atob($("#imp", bg).value.trim())))); if (!o || o.v !== 1) throw 0; S = Object.assign(blank(), o); save(); close(); route(); paintChips(); toast("Progress restored."); } catch (e) { toast("That code isn't valid."); } };
}

/* ---------- boot ---------- */
function boot() {
  shell(); TTS.init(); route();
  addEventListener("pointerdown", () => TTS.unlock(), {once:true, capture:true});
  addEventListener("hashchange", route);
  addEventListener("online", () => { if (DOC) pushRemote(); });
  // Al salir: subir ya lo pendiente. Al volver: traer lo hecho en otros dispositivos.
  const flush = () => { if (DOC && dirty) { clearTimeout(saveTimer); pushRemote(); } };
  document.addEventListener("visibilitychange", () => { if (document.hidden) flush(); else pullRemote().then(ch => { const h = location.hash.slice(1); if (ch && (!h || h === "today" || h === "progress")) route(); }); });
  addEventListener("pagehide", flush);
  // Con la app abierta y a la vista, mirar cada 20 s si el otro dispositivo ha guardado algo
  setInterval(() => { if (DOC && !document.hidden && navigator.onLine) pullRemote().then(ch => { const h = location.hash.slice(1); if (ch && (!h || h === "today" || h === "progress")) route(); }); }, 20000);
  addEventListener("online", () => { if (DOC) pullRemote(true); });
  document.addEventListener("click", (e) => { if (popEl && !popEl.contains(e.target)) closePop(); });
  const C = window.claude;
  if (C && C.use) {
    C.use("sample").then(s => { SAMPLE = s; if (s) { const h = location.hash.slice(1); if (["", "today", "practice", "read", "listen", "write", "speak", "real"].includes(h) || /^(listen|read|write|speak|real)-/.test(h) || (h.startsWith("play-") && $("#start"))) route(); } }).catch(() => {});
    C.use("tts").then(t => { TTSCAP = t; }).catch(() => {});
    Promise.all([C.use("db"), C.use("user")]).then(async ([db, user]) => {
      if (!db || !user) return; const id = await user.id(); if (!id) { syncState = "nologin"; paintSync(); return; }
      DB = db; const ref = db.doc(`data/users/${id}/state`);
      DOC = ref;
      const changed = await pullRemote(true);
      if (!changed && dirty) pushRemote();
      const h = location.hash.slice(1); if (changed && (!h || ["today", "practice", "progress", "review", "phrases"].includes(h))) route();
    }).catch(() => {});
  }
}
boot();
})();
