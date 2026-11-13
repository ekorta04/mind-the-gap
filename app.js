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
  work:{name:"Work English", part:"Vocabulary · Project & maintenance", c:"var(--green)", skill:"vocab", desc:"The English of site walks, clients, suppliers and shutdowns. Learn it once, use it on Monday."},
  idioms:{name:"Idiom Quickfire", part:"Vocabulary · 60-second sprint", c:"var(--navy)", skill:"vocab", desc:"Idioms, phrasal verbs and British slang against the clock."},
  mock:{name:"Use of English Mock", part:"Exam simulation · Parts 1–4", c:"var(--ink)", skill:"uoe", desc:"24 mixed questions in exam order with a 30-minute clock. Ends with an estimated Cambridge score."}
};
const SKILLS = {uoe:{n:"Use of English", c:"var(--red)"}, reading:{n:"Reading", c:"var(--navy)"}, listening:{n:"Listening", c:"var(--green)"}, writing:{n:"Writing", c:"var(--amber)"}, grammar:{n:"Grammar", c:"var(--amber)"}, spelling:{n:"Spelling", c:"var(--plum)"}, vocab:{n:"Vocabulary", c:"var(--navy)"}, speaking:{n:"Speaking", c:"var(--red)"}};
const LEVELS = [{n:"B2", xp:0}, {n:"B2+", xp:1500}, {n:"C1", xp:4000}, {n:"C1+", xp:8000}, {n:"C2", xp:14000}, {n:"C2+", xp:22000}];
const INTERESTS = ["engineering", "project management", "personal development", "business and finance", "football and sport"];
const INTERVALS = [0, 1, 2, 4, 7, 15, 30];

/* ---------- state ---------- */
const LS_KEY = "mtg-state-v1";
const blank = () => ({v:1, xp:0, streak:0, best:0, lastActive:null, days:{}, stats:{}, seen:{}, deck:[], read:{}, listen:{}, writings:[], ai:{}, aiArticles:[], aiListening:[], settings:{rate:0.95, voice:"", goal:300}, updatedAt:0});
let S = blank();
try { const raw = localStorage.getItem(LS_KEY); if (raw) S = Object.assign(blank(), JSON.parse(raw)); } catch (e) {}
S.settings = Object.assign(blank().settings, S.settings || {});

let DB = null, DOC = null, SAMPLE = null, TTSCAP = null, syncState = "local";
let saveTimer = null, saving = false, saveAgain = false;

function save() {
  S.updatedAt = Date.now();
  try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {}
  clearTimeout(saveTimer);
  saveTimer = setTimeout(pushRemote, 1500);
}
function trimState() {
  if (S.deck.length > 600) S.deck = S.deck.slice(-600);
  if (S.aiArticles.length > 8) S.aiArticles = S.aiArticles.slice(-8);
  if (S.aiListening.length > 8) S.aiListening = S.aiListening.slice(-8);
  for (const k in S.ai) if (S.ai[k].length > 60) S.ai[k] = S.ai[k].slice(-60);
  if (S.writings.length > 30) S.writings = S.writings.slice(-30);
  const dk = Object.keys(S.days).sort(); if (dk.length > 400) for (const k of dk.slice(0, dk.length - 400)) delete S.days[k];
}
async function pushRemote() {
  if (!DOC) return;
  if (saving) { saveAgain = true; return; }
  saving = true;
  try {
    trimState();
    let s = JSON.stringify(S);
    if (s.length > 230000) { S.writings.forEach(w => { w.text = (w.text || "").slice(0, 1500); w.fb && (w.fb.improved = ""); }); S.aiArticles = S.aiArticles.slice(-3); s = JSON.stringify(S); }
    await DOC.set({s, updatedAt:S.updatedAt});
    syncState = "synced";
  } catch (e) { syncState = "error"; }
  saving = false; paintSync();
  if (saveAgain) { saveAgain = false; pushRemote(); }
}
function paintSync() {
  const el = $("#sync"); if (!el) return;
  el.title = syncState === "synced" ? "Progress synced across your devices" : syncState === "error" ? "Sync failed — saved on this device" : "Saved on this device";
  el.style.color = syncState === "synced" ? "var(--green)" : syncState === "error" ? "var(--red)" : "var(--muted)";
}

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
  if (ex) { ex.box = 0; ex.due = dayKey(); return false; }
  S.deck.push(Object.assign({id, box:0, due:dayKey(), added:dayKey()}, card)); save(); return true;
}
const dueCards = () => S.deck.filter(c => c.due <= dayKey());
function grade(card, ok) {
  card.box = ok ? Math.min(card.box + 1, INTERVALS.length - 1) : 0;
  card.due = addDays(dayKey(), ok ? INTERVALS[card.box] : 1);
  save();
}

/* ---------- items (bank + AI-generated) ---------- */
function pool(type) {
  const bank = (BANK[type] || []).map((it, i) => Object.assign({_id:type + "-" + i, _t:type}, it));
  const ai = (S.ai[type] || []).map(it => Object.assign({_t:type}, it));
  return bank.concat(ai);
}
function findItem(type, id) { return pool(type).find(x => x._id === id); }
function pickItems(type, n) {
  const all = pool(type);
  const unseen = shuffle(all.filter(x => !S.seen[x._id]));
  const failed = shuffle(all.filter(x => S.seen[x._id] === -1));
  const rest = shuffle(all.filter(x => S.seen[x._id] === 1));
  return unseen.concat(failed, rest).slice(0, n);
}
function poolProgress(type) { const all = pool(type); const done = all.filter(x => S.seen[x._id] === 1).length; return {done, total:all.length}; }

/* ---------- speech (British voice) ---------- */
const TTS = {
  list: [], token: 0, speaking: false,
  init() {
    if (!("speechSynthesis" in window)) return;
    const load = () => {
      const all = speechSynthesis.getVoices();
      let gb = all.filter(v => /en[-_]GB/i.test(v.lang));
      const rank = v => (/natural|neural|online|premium|enhanced/i.test(v.name) ? 0 : 1) + (/google uk/i.test(v.name) ? 0 : 0.5) + (/novelty|whisper|bad news|bells|grandpa|grandma|jester|organ|bubbles|trinoids|zarvox|albert|superstar|wobble|boing|cellos|good news/i.test(v.name) ? 5 : 0);
      gb.sort((a, b) => rank(a) - rank(b));
      this.list = gb;
      if (location.hash.startsWith("#listen") || $("#voiceSel")) paintVoiceSel();
    };
    load(); speechSynthesis.addEventListener?.("voiceschanged", load);
  },
  voice(i = 0) {
    if (!this.list.length) return null;
    let base = this.list.findIndex(v => v.name === S.settings.voice); if (base < 0) base = 0;
    return this.list[(base + i) % this.list.length];
  },
  chunks(text) { return (String(text).match(/[^.!?]+[.!?]+["')\]]*|\S[^.!?]*$/g) || [text]).map(s => s.trim()).filter(Boolean); },
  async speak(text, opt = {}) {
    const my = ++this.token;
    if ("speechSynthesis" in window) { try { speechSynthesis.cancel(); } catch (e) {} }
    const rate = (opt.rate || S.settings.rate) * (opt.slow ? 0.75 : 1);
    if ("speechSynthesis" in window && (this.list.length || !TTSCAP)) {
      this.speaking = true;
      for (const part of this.chunks(text)) {
        if (my !== this.token) break;
        await new Promise(res => {
          const u = new SpeechSynthesisUtterance(part);
          u.lang = "en-GB"; const v = this.voice(opt.voice || 0); if (v) u.voice = v;
          u.rate = rate; u.pitch = opt.pitch || 1;
          u.onend = u.onerror = () => res();
          speechSynthesis.speak(u);
          setTimeout(res, 20000 + part.length * 120);
        });
      }
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
async function ai(prompt, opt = {}) { if (!SAMPLE) throw {code:"unavailable"}; return SAMPLE(prompt, opt); }
async function aiJSON(prompt, opt = {}) { if (!SAMPLE) throw {code:"unavailable"}; return SAMPLE.json(prompt, opt); }
const LEARNER = "The learner is a Spanish native speaker at B2+ level aiming for Cambridge C1 Advanced and then C2 Proficiency, British English. Interests: engineering, project management, personal development, business and finance, football/sport. Weak points: writing accuracy, spelling, some grammar.";

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
  TTS.stop(); closePop(); if (cleanup) { try { cleanup(); } catch (e) {} cleanup = null; }
  const h = (location.hash || "#today").slice(1) || "today";
  const main = $("#main"); main.innerHTML = "";
  const sec = h.split("-")[0];
  $$(".nav button").forEach(b => b.setAttribute("aria-current", (b.dataset.nav === sec || (sec === "play" && b.dataset.nav === "practice")) ? "page" : "false"));
  const v = document.createElement("section"); v.className = "view"; main.append(v);
  if (h === "today") viewToday(v);
  else if (h === "practice") viewPractice(v);
  else if (h.startsWith("play-")) viewGame(v, h.slice(5));
  else if (h === "read") viewReadList(v);
  else if (h.startsWith("read-")) viewArticle(v, h.slice(5));
  else if (h === "listen") viewListenList(v);
  else if (h.startsWith("listen-")) viewListening(v, h.slice(7));
  else if (h === "write") viewWriteList(v);
  else if (h.startsWith("write-")) viewWriting(v, h.slice(6));
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
function plan() {
  const d = dayIdx(), due = dueCards().length, uoe = ["wf", "kwt", "oc", "mc"][d % 4];
  const read = nextReading(), lis = nextListening();
  const inputIsRead = d % 2 === 0;
  const stops = [];
  stops.push(due >= 3
    ? {id:"warm", kind:"review", n:"Warm-up review", s:`${due} cards due · spaced repetition`, c:"var(--plum)", to:"review"}
    : {id:"warm", kind:"idioms", n:"Warm-up: Idiom Quickfire", s:"60 seconds of British idioms", c:"var(--navy)", to:"play-idioms"});
  stops.push({id:"uoe", kind:uoe, n:TYPES[uoe].name, s:TYPES[uoe].part + " · 8 questions", c:"var(--red)", to:"play-" + uoe});
  if (inputIsRead) stops.push({id:"input", kind:"read", n:read ? "Read: " + read.title : "Read: a fresh article", s:read ? `${read.topic} · ${read.mins || 4} min` : "Generate one on your topics", c:"var(--navy)", to:read ? "read-" + read.id : "read"});
  else stops.push({id:"input", kind:"listen", n:lis ? "Listen: " + lis.title : "Listen: a fresh recording", s:lis ? `${lis.topic} · British voice` : "Generate one on your topics", c:"var(--green)", to:lis ? "listen-" + lis.id : "listen"});
  stops.push({id:"spell", kind:"spell", n:"Spelling Dictation", s:"Your ortografía, every day · 8 words", c:"var(--plum)", to:"play-spell"});
  const outs = [
    {id:"out", kind:"err", n:"Error Hunt", s:"Grammar & false friends · 8 sentences", c:"var(--amber)", to:"play-err"},
    {id:"out", kind:"write", n:"Writing task", s:"Cambridge-marked with corrections", c:"var(--amber)", to:"write"},
    {id:"out", kind:"speak", n:"Speaking: shadowing", s:"Say it like a Brit · 5 sentences", c:"var(--red)", to:"speak-shadow"},
    {id:"out", kind:"work", n:"Work English", s:"Site, client & supplier English · 8 questions", c:"var(--green)", to:"play-work"}];
  stops.push(outs[d % outs.length]);
  return stops;
}
const STOP_OF = {mock:"uoe", review:"warm", idioms:"warm", wf:"uoe", kwt:"uoe", oc:"uoe", mc:"uoe", read:"input", listen:"input", spell:"spell", write:"out", err:"out", speak:"out", work:"out"};
function markDone(kind) {
  const d = today(), id = STOP_OF[kind];
  if (id && !d.done[id]) { d.done[id] = true; save(); }
}

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
function viewToday(v) {
  const d = today(), stops = plan(), done = stops.filter(s => d.done[s.id]).length;
  const hr = new Date().getHours(), greet = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";
  const idiom = BANK.idioms[dayIdx() % BANK.idioms.length];
  const li = level(), next = LEVELS[li + 1];
  v.innerHTML = `
  <div class="hello"><span class="eyebrow">${new Date().toLocaleDateString("en-GB", {weekday:"long", day:"numeric", month:"long"})}</span>
    <h1>${greet}. <span>${done === stops.length ? "Route complete." : done ? "Next stop?" : "Mind the gap."}</span></h1>
    <p class="muted">Today's line: ${stops.length} stops, about 45 minutes. Each stop earns XP towards C1, then C2.</p></div>
  <div class="grid-2">
    <div class="card"><div class="row"><h2>Today's route</h2><span class="spacer"></span><span class="muted mono">${done}/${stops.length}</span></div>
      <div class="route" id="route">${stops.map(s => `<button class="stop ${d.done[s.id] ? "done" : ""}" data-to="${s.to}" style="--c:${s.c}"><span class="dot">${d.done[s.id] ? I.check : ""}</span><span class="lbl"><b>${esc(s.n)}</b><small>${esc(s.s)}</small></span><span class="go">${I.arrow}</span></button>`).join("")}</div>
    </div>
    <div class="stack">
      <div class="card goal">${ring(d.xp / S.settings.goal)}<div><h3>Daily goal</h3><p class="muted"><span class="mono">${d.xp}</span> / <span class="mono">${S.settings.goal}</span> XP today · streak <span class="mono">${liveStreak()}</span> (best <span class="mono">${S.best || 0}</span>)</p></div></div>
      <div class="card"><div class="row"><h3>Level ${LEVELS[li].n}</h3><span class="spacer"></span><span class="muted mono">${next ? (next.xp - S.xp).toLocaleString("en-GB") + " XP to " + next.n : "Top of the line"}</span></div>${levelLine()}</div>
      <div class="card wotd stack"><span class="eyebrow">Idiom of the day</span><div class="row"><span class="term">${esc(idiom.t)}</span><button class="icon-btn" id="sayIdiom" aria-label="Listen">${I.speaker}</button></div><p>${esc(idiom.m)}.</p><p class="muted"><i>“${esc(idiom.ex)}”</i></p><div><button class="btn small" id="saveIdiom">Add to review</button></div></div>
    </div>
  </div>
  ${!aiOn() ? `<p class="notice">AI features (fresh articles, writing marking, explanations) switch on when you add your free Gemini key in Settings (⚙). Everything else works offline.</p>` : ""}`;
  $$("#route .stop", v).forEach(b => b.onclick = () => go(b.dataset.to));
  $("#sayIdiom", v).onclick = () => TTS.speak(`${idiom.t}. ${idiom.ex}`);
  $("#saveIdiom", v).onclick = () => { addCard({k:"word", f:idiom.t, b:idiom.m, ex:idiom.ex}) ? toast("Added to your review deck.") : toast("Already in your deck."); };
}

/* ---------- views: practice ---------- */
function viewPractice(v) {
  v.innerHTML = `<div class="hello"><span class="eyebrow">Games</span><h1>Pick a line</h1><p class="muted">Exam-format games on your topics. Rounds of 8; combos multiply XP. Wrong answers go to your review deck automatically.</p></div>
  <div class="grid">${Object.entries(TYPES).map(([k, t]) => { const p = k === "mock" ? {done:S.mockBest || 0, total:24} : poolProgress(k); const a = acc(t.skill);
    return `<button class="card tile" data-k="${k}" style="--c:${t.c}"><span class="tag">${esc(t.part)}</span><h3>${esc(t.name)}</h3><p class="muted">${esc(t.desc)}</p>
    <div class="bar"><i style="--p:${p.done / Math.max(1, p.total) * 100}%"></i></div><div class="meta"><span class="mono">${p.done}/${p.total} ${k === "mock" ? "best" : "mastered"}</span><span>${a == null ? "No score yet" : "Accuracy " + Math.round(a * 100) + "%"}</span></div></button>`; }).join("")}</div>`;
  $$(".tile", v).forEach(b => b.onclick = () => go("play-" + b.dataset.k));
}

/* ---------- game engine ---------- */
function renderItem(it, onDone) {
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
  if (t === "mc") { const order = shuffle(it.o.map((o, i) => i)); return {
    html:`<p class="qtext">${gapped(it.s)}</p><div class="opts two">${order.map(i => `<button class="opt" data-i="${i}">${esc(it.o[i])}</button>`).join("")}</div>`,
    mount(r) { $$(".opt", r).forEach(b => b.onclick = () => { const i = +b.dataset.i; $$(".opt", r).forEach(x => { x.disabled = true; if (+x.dataset.i === it.a) x.classList.add("right"); }); if (i !== it.a) b.classList.add("wrong"); onDone(i === it.a, it.o[i]); }); }
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
    case "mc": return it.o[it.a];
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
    case "mc": return `Multiple-choice cloze. "${it.s}" Options: ${it.o.join(", ")}. Correct: ${it.o[it.a]}.`;
    case "err": return `Error correction. Sentence: "${it.c.join(" ")}". Error: "${it.c[it.e]}" → "${it.o[it.a]}".`;
    case "spell": return `Spelling of the word "${it.w}" (British English).`;
    case "idioms": case "work": return `Expression "${it.t}" means: ${it.m}.`;
  }
}

function viewGame(v, type, opts = {}) {
  const T = TYPES[type]; if (!T) return viewPractice(v);
  if (type === "idioms") return viewQuickfire(v);
  const isMock = type === "mock";
  const items = opts.items || (isMock ? ["mc", "oc", "wf", "kwt"].flatMap(t => pickItems(t, 6)) : pickItems(type, 8));
  let mockEnd = 0, mockTimer = null;
  const G = {i:0, res:[], combo:0, xp:0};
  v.style.setProperty("--c", T.c);
  const intro = () => {
    const p = isMock ? {done:S.mockBest || 0, total:24} : poolProgress(type);
    v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Games</button></div>
    <div class="hello"><span class="eyebrow" style="color:${T.c}">${esc(T.part)}</span><h1>${esc(T.name)}</h1><p class="muted">${esc(T.desc)}</p></div>
    <div class="card stack"><div class="row"><span class="mono">${p.done}/${p.total}</span><span class="muted">${isMock ? "best mock score" : "mastered in this bank"}</span></div><div class="bar" style="--c:${T.c}"><i style="--p:${p.done / Math.max(1, p.total) * 100}%"></i></div>
    <div class="row"><button class="btn red" id="start">${isMock ? "Start mock · 30 min" : "Start round · 8"}</button>${aiOn() && !isMock ? `<button class="btn ai" id="gen">${I.sparkle} Generate 8 fresh questions</button>` : ""}</div><p class="muted" id="genMsg"></p></div>`;
    $("#bk", v).onclick = () => go("practice");
    $("#start", v).onclick = () => {
      if (!items.length) return toast("No questions yet.");
      if (isMock) { mockEnd = Date.now() + 30 * 60000; mockTimer = setInterval(() => { const tm = $("#mockT", v); const left = Math.max(0, mockEnd - Date.now()); if (tm) tm.textContent = Math.floor(left / 60000) + ":" + pad(Math.floor(left / 1000) % 60); if (!left) { clearInterval(mockTimer); while (G.res.length < items.length) G.res.push(false); finish(); } }, 500); cleanup = () => clearInterval(mockTimer); }
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
      <div class="card qcard" id="q" style="--c:${TYPES[it._t].c}"><span class="eyebrow">${isMock ? TYPES[it._t].part + " · " : ""}${esc(TYPES[it._t].name)} · ${G.i + 1} of ${items.length}${it._id.startsWith("ai") ? " · fresh" : ""}</span></div><div id="fb"></div>`;
    $("#quit", v).onclick = () => go("practice");
    const r = $("#q", v);
    const R = renderItem(it, (ok, given, note) => {
      G.res.push(ok); S.seen[it._id] = ok ? 1 : -1; record(T.skill, ok);
      let gained = 0;
      if (ok) { G.combo++; gained = 10 * Math.min(3, 1 + Math.floor((G.combo - 1) / 2)); G.xp += gained; }
      else { G.combo = 0; addCard({k:"item", id:"item:" + it._id, t:it._t, ref:it._id, f:TYPES[it._t].name, b:answerOf(it)}); }
      save();
      showFeedback($("#fb", v), it, ok, given, note, gained, () => { G.i++; next(); });
    });
    r.insertAdjacentHTML("beforeend", R.html); R.mount(r);
  };
  const finish = () => {
    if (G.over) return; G.over = true;
    if (mockTimer) clearInterval(mockTimer);
    const right = G.res.filter(Boolean).length;
    if (isMock) {
      const sc = Math.round(160 + right / items.length * 70); S.mockBest = Math.max(S.mockBest || 0, right);
      (S.mocks = S.mocks || []).push({d:dayKey(), r:right, sc}); if (S.mocks.length > 40) S.mocks.shift();
      const xp = right * 8 + 40; addXP(xp); markDone("mock");
      const byPart = ["mc", "oc", "wf", "kwt"].map(t => { const idx = items.map((x, i) => x._t === t ? i : -1).filter(i => i >= 0); return `<div class="skillrow"><span>${TYPES[t].part.split("· ")[1]}</span><div class="bar" style="--c:var(--red)"><i style="--p:${idx.filter(i => G.res[i]).length / idx.length * 100}%"></i></div><span class="mono">${idx.filter(i => G.res[i]).length}/${idx.length}</span></div>`; }).join("");
      v.innerHTML = `<div class="card stack pop" style="align-items:center;text-align:center;padding:32px 18px"><span class="eyebrow">Mock complete</span><div class="big-score">${right}/${items.length}</div><p>Estimated Cambridge English Scale: <b class="mono">${sc}</b> (${scaleLabel(sc)}) · +${xp} XP</p><div class="stack" style="width:100%;max-width:480px;text-align:left">${byPart}</div><p class="muted">Rough estimate based on this section only. Your mistakes are in Review.</p><div class="row" style="justify-content:center"><button class="btn" id="home">Back to Today</button></div></div>`;
      $("#home", v).onclick = () => go("today"); return;
    }
    const bonus = right === items.length ? 30 : 0;
    addXP(G.xp + bonus + 10); markDone(type);
    S.days[dayKey()].min = (S.days[dayKey()].min || 0) + 5; save();
    v.innerHTML = `<div class="card stack pop" style="text-align:center;align-items:center;padding:32px 18px"><span class="eyebrow">${esc(T.name)} · round complete</span>
      <div class="big-score">${right}/${items.length}</div><p class="muted">+${G.xp + bonus + 10} XP${bonus ? " · perfect round bonus" : ""}. ${right === items.length ? "Flawless." : right >= 6 ? "Strong round." : right >= 4 ? "Solid. Mistakes are now in your review deck." : "Tough one. These will come back in Review until they stick."}</p>
      <div class="row" style="justify-content:center"><button class="btn red" id="again">Another round</button><button class="btn" id="home">Back to Today</button></div></div>`;
    $("#again", v).onclick = () => route(); $("#home", v).onclick = () => go("today");
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
    ${(it._t === "idioms" || it._t === "work") && it.ex ? `<p class="muted"><i>“${esc(it.ex)}”</i></p>` : ""}
    <div class="row">${aiOn() ? `<button class="btn small ai" id="explain">${I.sparkle} Explain it to me</button>` : ""}${it._t === "spell" || it._t === "idioms" || it._t === "work" ? `<button class="btn small" id="hear">${I.speaker} Hear it</button>` : ""}<span class="spacer"></span><button class="btn primary" id="nx">Next ${I.arrow}</button></div>
    <div class="ai-out" id="aiOut" hidden></div></div>`;
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

/* ---------- quickfire ---------- */
function viewQuickfire(v) {
  const T = TYPES.idioms;
  v.style.setProperty("--c", T.c);
  v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Games</button></div>
  <div class="hello"><span class="eyebrow" style="color:${T.c}">${T.part}</span><h1>Idiom Quickfire</h1><p class="muted">60 seconds. As many idioms, phrasal verbs and British slang as you can. +8 XP each, streaks of 3 add a bonus.</p></div>
  <div class="card stack"><p>Your record: <b class="mono">${S.qfBest || 0}</b></p><div class="row"><button class="btn red" id="start">Start · 60 s</button>${aiOn() ? `<button class="btn ai" id="gen">${I.sparkle} Generate fresh idioms</button>` : ""}</div><p class="muted" id="genMsg"></p></div>`;
  $("#bk", v).onclick = () => go("practice");
  const gb = $("#gen", v); if (gb) gb.onclick = async () => { gb.disabled = true; gb.innerHTML = `<span class="spin"></span> Writing…`; try { const n = await generateItems("idioms"); $("#genMsg", v).textContent = `${n} new idioms added.`; } catch (e) { $("#genMsg", v).textContent = aiErr(e); } gb.disabled = false; gb.innerHTML = `${I.sparkle} Generate more`; };
  $("#start", v).onclick = () => {
    const items = pickItems("idioms", 60); let i = 0, right = 0, wrong = [], streak = 0, xp = 0, end = Date.now() + 60000, timer;
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
  mc:`Cambridge C1/C2 Use of English Part 1 (multiple-choice cloze) items testing collocations and fixed phrases. JSON array of 8 objects: {"s": sentence with exactly one "___" gap, "o": [4 single-word or short options], "a": index 0-3 of the only correct option, "why": max 18 words}. Distractors must be plausible but clearly wrong for a native speaker.`,
  err:`Error-correction items targeting typical mistakes of Spanish speakers (false friends, uncountables, prepositions, tenses, word order, verb patterns). JSON array of 8 objects: {"c": the sentence split into 3-5 chunks (array of strings) where exactly one chunk contains the mistake, "e": index of the wrong chunk, "o": [3 replacement options for that chunk, the FIRST one correct], "a": 0, "why": max 20 words, may include the Spanish word in brackets}.`,
  spell:`Spelling items: words that are commonly misspelt or have distinct British spellings, useful at C1/C2. JSON array of 8 objects: {"w": the word in British spelling, "s": a natural example sentence containing the word, "tip": a short memory tip, "us": the US spelling only if different, otherwise omit}.`,
  work:`workplace English for a project manager in industrial maintenance (electrical, fire protection, compressed air, HVAC): collocations, phrasal verbs, contract and site vocabulary used in British workplaces. JSON array of 10 objects: {"t": the expression, "m": its meaning (max 10 words), "d": [3 plausible but wrong meanings], "ex": a natural British example sentence from a site, meeting or email}`,
  idioms:`British idioms, phrasal verbs and informal British expressions useful at C1/C2. JSON array of 10 objects: {"t": the expression, "m": its meaning (max 8 words), "d": [3 plausible but wrong meanings], "ex": a natural British example sentence}.`
};
function validItem(type, o) {
  try {
    if (type === "wf") return o.s.includes("___") && o.stem && Array.isArray(o.a) && o.a.length;
    if (type === "kwt") return o.s1 && o.key && o.pre != null && o.post != null && Array.isArray(o.a) && o.a.length;
    if (type === "oc") return o.s.includes("___") && Array.isArray(o.a) && o.a.length;
    if (type === "mc") return o.s.includes("___") && Array.isArray(o.o) && o.o.length === 4 && o.a >= 0 && o.a < 4;
    if (type === "err") return Array.isArray(o.c) && o.c[o.e] != null && Array.isArray(o.o) && o.o.length >= 2;
    if (type === "spell") return typeof o.w === "string" && o.w.length > 2 && o.s;
    if (type === "idioms" || type === "work") return o.t && o.m && Array.isArray(o.d) && o.d.length >= 3;
  } catch (e) {} return false;
}
async function generateItems(type) {
  const existing = pool(type).map(x => x.stem || x.key || x.w || x.t || (x.s || "").slice(0, 40)).slice(-60).join("; ");
  const weak = Object.keys(S.stats).filter(k => acc(k) != null && acc(k) < 0.7).map(k => SKILLS[k]?.n).filter(Boolean).join(", ");
  const prompt = `${LEARNER}${weak ? " Currently weakest: " + weak + "." : ""}\n\nCreate NEW ${GEN_SPEC[type]}\nSet the sentences in the learner's interest areas (rotate: ${shuffle(INTERESTS).join(", ")}). Use British English spelling and usage throughout. Do not repeat any of these: ${existing}.\nReply with only the JSON array.`;
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
  <div class="card stack" id="quiz"><h2>Check your understanding</h2>${prev ? `<p class="muted">Last time: ${prev.score}/${a.q.length}. Try again to beat it.</p>` : ""}
  ${a.q.map((q, i) => `<div class="stack" data-q="${i}"><p><b>${i + 1}.</b> ${esc(q.q)}</p><div class="opts">${q.o.map((o, j) => `<button class="opt" data-j="${j}">${esc(o)}</button>`).join("")}</div></div>`).join("")}
  <div id="qres"></div></div>
  ${aiOn() ? `<div class="card stack"><h3>Talk about it</h3><p class="muted">Write 2–4 sentences: what's your opinion? Get instant C1/C2 feedback.</p><textarea class="answer" id="opinion" rows="4" spellcheck="false" placeholder="In my view…"></textarea><div><button class="btn ai" id="opBtn">${I.sparkle} Correct my answer</button></div><div class="ai-out" id="opOut" hidden></div></div>` : ""}`;
  $("#bk", v).onclick = () => go("read");
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
  <div class="card stack"><h3>Voice</h3><div class="row"><select id="voiceSel" aria-label="British voice"></select><span class="muted" id="voiceNote"></span></div><div class="row"><span class="muted">Speed</span><div class="seg-ctl" id="rate">${[0.8, 0.9, 1, 1.1].map(r => `<button aria-pressed="${S.settings.rate === r}" data-r="${r}">${r}×</button>`).join("")}</div><button class="btn small" id="test">${I.speaker} Test</button></div></div>
  ${aiOn() ? `<div class="card stack"><h3>Fresh recording</h3><div class="row"><select id="topic" aria-label="Topic">${INTERESTS.map(t => `<option>${t}</option>`).join("")}</select><select id="kind" aria-label="Format"><option value="a meeting between two colleagues">meeting</option><option value="a radio interview">radio interview</option><option value="a podcast monologue">podcast</option><option value="a heated but friendly debate">debate</option></select><button class="btn ai" id="gen">${I.sparkle} Create it</button></div><p class="muted" id="genMsg"></p></div>` : ""}
  <div class="list">${L.slice().reverse().map(l => `<button class="card item" data-id="${esc(l.id)}" style="--c:var(--green)"><span class="badge">${I.ear}</span><span class="txt"><b>${esc(l.title)}</b><small>${esc(l.topic)} · ${l.lines.length > 4 ? "dialogue" : "monologue"}${l.ai ? " · fresh" : ""}</small></span>${S.listen[l.id] ? `<span class="check">${S.listen[l.id].score}/${l.q.length}</span>` : `<span class="go muted">${I.arrow}</span>`}</button>`).join("")}</div>`;
  paintVoiceSel(); bindRate(v);
  $("#test", v).onclick = () => TTS.speak("Right then. Let's crack on — the kettle's on and the meeting starts in five.");
  $$(".item[data-id]", v).forEach(b => b.onclick = () => go("listen-" + b.dataset.id));
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
  sel.disabled = false; sel.innerHTML = TTS.list.map(vc => `<option ${vc.name === S.settings.voice ? "selected" : ""}>${esc(vc.name)}</option>`).join("");
  sel.onchange = () => { S.settings.voice = sel.value; save(); TTS.speak("Lovely. This is how I sound."); };
  const n = $("#voiceNote"); if (n) n.textContent = TTS.list.length + " British voice" + (TTS.list.length > 1 ? "s" : "");
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
  <div class="hello"><span class="eyebrow" style="color:var(--green)">${esc(L.topic)}</span><h1>${esc(L.title)}</h1><p class="muted">Step 1: listen without the transcript. Step 2: answer. Step 3: dictation.</p></div>
  <div class="card player"><div class="wave" id="wave">${"<i></i>".repeat(32)}</div>
    <div class="row"><button class="btn primary" id="playB">${I.speaker} Play</button><button class="btn" id="stopB" hidden>${I.stop} Stop</button><div class="seg-ctl" id="rate">${[0.8, 0.9, 1, 1.1].map(r => `<button aria-pressed="${S.settings.rate === r}" data-r="${r}">${r}×</button>`).join("")}</div><span class="spacer"></span><button class="btn small ghost" id="tr">Show transcript</button></div>
    <div class="transcript" id="trBox" hidden>${L.lines.map((l, i) => `<p data-i="${i}"><span class="spk">${esc(l[0])}</span>${esc(l[1])}</p>`).join("")}</div></div>
  <div class="card stack" id="quiz"><h2>Questions</h2>${L.q.map((q, i) => `<div class="stack" data-q="${i}"><p><b>${i + 1}.</b> ${esc(q.q)}</p><div class="opts">${q.o.map((o, j) => `<button class="opt" data-j="${j}">${esc(o)}</button>`).join("")}</div></div>`).join("")}<div id="qres"></div></div>
  <div class="card stack"><h2>Dictation</h2><p class="muted">Listen and type exactly what you hear. Punctuation doesn't count; spelling does.</p>
  ${(L.dict || []).map((d, i) => `<div class="stack" data-d="${i}"><div class="row"><button class="btn small" data-say="${i}">${I.speaker} Sentence ${i + 1}</button><button class="btn small ghost" data-slow="${i}">${I.slow} Slowly</button></div><textarea class="answer" rows="2" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Dictation ${i + 1}"></textarea><div class="row"><button class="btn small primary" data-chk="${i}">Check</button></div><div class="diff" data-out="${i}"></div></div>`).join("")}</div>`;
  $("#bk", v).onclick = () => go("listen");
  bindRate(v);
  $("#tr", v).onclick = (e) => { const b = $("#trBox", v); b.hidden = !b.hidden; e.target.textContent = b.hidden ? "Show transcript" : "Hide transcript"; };
  const play = $("#playB", v), stop = $("#stopB", v), wave = $("#wave", v);
  play.onclick = async () => {
    play.hidden = true; stop.hidden = false; wave.classList.add("on");
    for (let i = 0; i < L.lines.length; i++) {
      $$("#trBox p", v).forEach(p => p.classList.toggle("now", +p.dataset.i === i));
      const si = speakers.indexOf(L.lines[i][0]);
      const ok = await TTS.speak(L.lines[i][1], {voice:si, pitch:TTS.list.length > 1 ? 1 : (si ? 0.85 : 1.05)});
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
  v.innerHTML = `<div class="hello"><span class="eyebrow" style="color:var(--amber)">Writing</span><h1>Write. Get marked. Improve.</h1><p class="muted">Real Cambridge tasks, marked on the four official criteria (Content, Communicative Achievement, Organisation, Language), with every spelling and grammar error explained in Spanish.</p></div>
  <div class="list">${BANK.writing.map(w => { const last = S.writings.filter(x => x.task === w.id).slice(-1)[0];
    return `<button class="card item" data-id="${w.id}" style="--c:var(--amber)"><span class="badge">${I.pen}</span><span class="txt"><b>${esc(w.type)} · ${esc(w.prompt.split(/[.:]/)[0].slice(0, 70))}…</b><small>${w.level} · ${w.words} words${drafts[w.id] ? " · draft saved" : ""}</small></span>${last && last.fb ? `<span class="check">${last.fb.total}/20</span>` : `<span class="go muted">${I.arrow}</span>`}</button>`; }).join("")}</div>
  <div class="card stack" style="--c:var(--amber)"><h3>Sentence upgrader</h3><p class="muted">Paste any sentence you'd write at work. See it at C1 and C2.</p><textarea class="answer" id="up" rows="3" spellcheck="false" placeholder="e.g. We have a lot of problems with the project because the supplier is late."></textarea><div><button class="btn ai" id="upBtn" ${aiOn() ? "" : "disabled"}>${I.sparkle} Upgrade it</button></div><div class="ai-out" id="upOut" hidden></div></div>
  ${S.writings.length ? `<div class="card stack"><h3>Your marked work</h3>${S.writings.slice().reverse().slice(0, 8).map(w => `<div class="row"><span class="mono">${w.date}</span><span>${esc(w.type)}</span><span class="spacer"></span><b class="mono">${w.fb ? w.fb.total + "/20 · " + (w.fb.level || "") : "self-checked"}</b></div>`).join("")}</div>` : ""}`;
  $$(".item[data-id]", v).forEach(b => b.onclick = () => go("write-" + b.dataset.id));
  const ub = $("#upBtn", v); ub.onclick = async () => {
    const t = $("#up", v).value.trim(); if (words(t) < 3) return toast("Write a sentence first.");
    ub.disabled = true; const o = $("#upOut", v); o.hidden = false; o.textContent = "Thinking…";
    try { await ai(`${LEARNER}\nSentence: """${t}"""\nIn plain text:\n1) Corrected (if needed), British spelling.\n2) C1 version.\n3) C2 version (more idiomatic/formal as appropriate).\n4) In Spanish, 2-3 bullet points on the language moves you used (e.g. inversion, nominalisation, collocation), so the learner can reuse them.\nUnder 140 words.`, {modelTier:"default", cache:false, onText:({text}) => o.textContent = text}); addXP(10); }
    catch (e) { o.textContent = aiErr(e); } ub.disabled = false;
  };
}
function viewWriting(v, id) {
  const W = BANK.writing.find(x => x.id === id); if (!W) return viewWriteList(v);
  const [lo, hi] = W.words.split("–").map(Number);
  v.innerHTML = `<div class="row"><button class="btn ghost small" id="bk">${I.back} Writing</button></div>
  <div class="hello"><span class="eyebrow" style="color:var(--amber)">${esc(W.type)} · ${W.level} · ${W.words} words</span><h1>${esc(W.type)}</h1></div>
  <div class="prompt">${esc(W.prompt)}</div>
  <div class="card stack"><textarea class="essay" id="essay" autocapitalize="sentences" spellcheck="false" placeholder="Start writing here. Spell-check is off on purpose — this is spelling practice too.">${esc(drafts[W.id] || "")}</textarea>
  <div class="row"><button class="btn small ghost" id="tmr">Exam timer · 45 min</button><span class="mono" id="wc">0 words</span><span class="muted" id="wcHint"></span><span class="spacer"></span><button class="btn" id="self">Quick check</button><button class="btn ai" id="mark" ${aiOn() ? "" : "disabled"}>${I.sparkle} Mark it like Cambridge</button></div></div>
  <div id="result"></div>`;
  $("#bk", v).onclick = () => go("write");
  const ta = $("#essay", v), wc = $("#wc", v), hint = $("#wcHint", v);
  const upd = () => { const n = words(ta.value); wc.textContent = n + " words"; hint.textContent = n < lo ? `aim for ${lo}–${hi}` : n > hi + 20 ? "a bit long" : "good length"; hint.style.color = n >= lo && n <= hi + 20 ? "var(--green)" : "var(--muted)"; };
  let dt; ta.oninput = () => { upd(); clearTimeout(dt); dt = setTimeout(() => saveDraft(W.id, ta.value), 400); }; upd();
  const res = $("#result", v);
  let tEnd = 0, tInt = null;
  $("#tmr", v).onclick = (e) => { if (tInt) { clearInterval(tInt); tInt = null; e.target.textContent = "Exam timer · 45 min"; return; } tEnd = Date.now() + 45 * 60000; tInt = setInterval(() => { const l = Math.max(0, tEnd - Date.now()); e.target.textContent = "Stop timer · " + Math.floor(l / 60000) + ":" + pad(Math.floor(l / 1000) % 60); if (!l) { clearInterval(tInt); tInt = null; toast("Time's up! Finish your sentence and check it."); } }, 1000); cleanup = () => clearInterval(tInt); };
  $("#self", v).onclick = () => {
    const errs = localCheck(ta.value);
    errs.forEach(e => addCard({k:"mistake", f:e.original, b:e.correction, ex:"From your " + W.type.toLowerCase()}));
    res.innerHTML = `<div class="card stack"><h2>Quick check</h2>${errs.length ? errs.map(e => `<div class="errline"><span><span class="typepill">${e.type}</span><span class="from">${esc(e.original)}</span> → <span class="to">${esc(e.correction)}</span></span></div>`).join("") : `<p class="muted">No common Spanish-speaker errors detected. That doesn't mean it's perfect — ${aiOn() ? "get it marked for a full review." : "check tenses, articles and prepositions once more."}</p>`}
    <h3>Checklist</h3><ul class="muted"><li>Clear paragraphs, each with one main idea</li><li>Linkers beyond 'and/but': whereas, nevertheless, not only… but also</li><li>At least one inversion or cleft sentence (C1+)</li><li>Register matches the task (${W.type === "Essay" || W.type === "Report" || W.type === "Proposal" ? "formal" : "appropriate for the reader"})</li><li>British spelling: -ise, -our, -re</li></ul></div>`;
  };
  $("#mark", v).onclick = async () => {
    const text = ta.value.trim(); if (words(text) < 60) return toast("Write at least 60 words to get a meaningful mark.");
    const mb = $("#mark", v); mb.disabled = true; mb.innerHTML = `<span class="spin"></span> Marking… (≈30–60 s)`;
    res.innerHTML = `<div class="card"><p class="muted">The examiner is reading your ${esc(W.type.toLowerCase())}…</p></div>`;
    try {
      const fb = await aiJSON(`You are a senior Cambridge English examiner marking a ${W.level} ${W.type}. ${LEARNER}\n\nTASK:\n${W.prompt}\n\nCANDIDATE'S ANSWER:\n"""${text}"""\n\nMark using the official Cambridge writing assessment scale: Content, Communicative Achievement, Organisation, Language, each 0-5, at ${W.level} level. Be accurate and honest, not generous. Find EVERY spelling, grammar, punctuation, vocabulary and register error.\nReply with only a JSON object:\n{"scores": {"content": 0-5, "communicative": 0-5, "organisation": 0-5, "language": 0-5}, "level": "B1|B2|C1|C2" (the level this piece demonstrates), "scale": estimated Cambridge English Scale score 140-230, "summary_es": 2-3 sentences in Spanish, "strengths": [2-3 short strings in English], "errors": [{"original": exact substring from the answer, "correction": corrected text, "type": "spelling|grammar|vocabulary|punctuation|register", "why_es": short reason in Spanish}], "upgrades": [3-5 {"original": phrase from the answer, "better": C1/C2 alternative, "why_es": short reason in Spanish}], "next_focus_es": one concrete thing to practise next, in Spanish, "improved": the whole answer rewritten as a model C2 answer keeping the candidate's ideas, British spelling}`, {modelTier:"complex", cache:false});
      const sc = fb.scores || {}; fb.total = ["content", "communicative", "organisation", "language"].reduce((a, k) => a + (+sc[k] || 0), 0);
      fb.errors = Array.isArray(fb.errors) ? fb.errors.filter(e => e && e.original) : []; fb.upgrades = Array.isArray(fb.upgrades) ? fb.upgrades : [];
      S.writings.push({task:W.id, type:W.type, date:dayKey(), text:text.slice(0, 3000), fb});
      fb.errors.forEach(e => addCard({k:"mistake", f:e.original, b:e.correction + (e.why_es ? " — " + e.why_es : ""), ex:W.type}));
      fb.errors.filter(e => e.type === "spelling").forEach(e => record("spelling", false));
      record("writing", fb.total >= 12); addXP(40 + fb.total * 5); markDone("write");
      renderMarked(res, text, fb);
    } catch (e) { res.innerHTML = `<div class="card"><p>${esc(aiErr(e))}</p></div>`; }
    mb.disabled = false; mb.innerHTML = `${I.sparkle} Mark it again`;
  };
  const last = S.writings.filter(x => x.task === W.id && x.fb).slice(-1)[0];
  if (last) { res.innerHTML = `<div class="card"><p class="muted">Last marked on ${last.date}: <b class="mono">${last.fb.total}/20</b>. <button class="btn small" id="showLast">Show feedback</button></p></div>`; $("#showLast", v).onclick = () => renderMarked(res, last.text, last.fb); }
}
function renderMarked(res, text, fb) {
  const sc = fb.scores || {};
  let marked = esc(text);
  (fb.errors || []).forEach(e => { const o = esc(e.original); const i = marked.indexOf(o); if (i >= 0) marked = marked.slice(0, i) + `<mark style="background:var(--bad-bg);color:var(--ink);border-bottom:2px solid var(--bad)" title="${esc(e.correction)}">${o}</mark>` + marked.slice(i + o.length); });
  res.innerHTML = `<div class="card stack pop"><div class="row"><h2>Examiner's report</h2><span class="spacer"></span><b class="mono" style="font-size:1.4rem">${fb.total}/20</b><span class="chip">${esc(fb.level || "")}${fb.scale ? " · " + esc(fb.scale) : ""}</span></div>
   <div class="scores">${[["content", "Content"], ["communicative", "Communicative achievement"], ["organisation", "Organisation"], ["language", "Language"]].map(([k, n]) => `<div class="score"><small class="muted">${n}</small><b>${+sc[k] || 0}<small class="muted">/5</small></b><div class="bar" style="--c:var(--amber)"><i style="--p:${(+sc[k] || 0) * 20}%"></i></div></div>`).join("")}</div>
   ${fb.summary_es ? `<p>${esc(fb.summary_es)}</p>` : ""}
   ${(fb.strengths || []).length ? `<p class="muted"><b>Strengths:</b> ${fb.strengths.map(esc).join(" · ")}</p>` : ""}
   ${fb.next_focus_es ? `<p class="notice"><b>Next focus:</b> ${esc(fb.next_focus_es)}</p>` : ""}</div>
  <div class="card stack"><h3>Your text, errors highlighted</h3><div style="white-space:pre-wrap;line-height:1.8">${marked}</div></div>
  <div class="card stack"><h3>Errors (${fb.errors.length}) — added to your review deck</h3>${fb.errors.map(e => `<div class="errline"><span><span class="typepill">${esc(e.type || "")}</span><span class="from">${esc(e.original)}</span> → <span class="to">${esc(e.correction)}</span></span><small class="muted">${esc(e.why_es || "")}</small></div>`).join("") || "<p class='muted'>No errors found. Impressive.</p>"}</div>
  ${fb.upgrades.length ? `<div class="card stack"><h3>Upgrades to C1/C2</h3>${fb.upgrades.map(u => `<div class="errline"><span>${esc(u.original)} → <b style="color:var(--navy)">${esc(u.better)}</b></span><small class="muted">${esc(u.why_es || "")}</small></div>`).join("")}</div>` : ""}
  ${fb.improved ? `<details class="card"><summary><b>Model C2 version of your answer</b></summary><div style="white-space:pre-wrap;margin-top:12px;line-height:1.75">${esc(fb.improved)}</div></details>` : ""}`;
  res.scrollIntoView({behavior:"smooth", block:"start"});
}

/* ---------- review ---------- */
function viewReview(v) {
  const due = shuffle(dueCards());
  const total = S.deck.length;
  const boxes = INTERVALS.map((_, i) => S.deck.filter(c => c.box === i).length);
  if (!due.length) {
    v.innerHTML = `<div class="hello"><span class="eyebrow" style="color:var(--plum)">Review</span><h1>All caught up</h1><p class="muted">${total ? `You have ${total} cards. The next ones come due ${nextDue()}.` : "Your deck fills up as you play: every mistake and every saved word lands here, then comes back just before you'd forget it."}</p></div>
    <div class="card stack"><h3>Deck by box</h3><p class="muted">Box 0 = new or failed, box 6 = long-term memory.</p><div class="stack">${boxes.map((n, i) => `<div class="skillrow"><span>Box ${i}</span><div class="bar" style="--c:var(--plum)"><i style="--p:${total ? n / total * 100 : 0}%"></i></div><span class="mono">${n}</span></div>`).join("")}</div></div>
    <div class="row"><button class="btn red" id="qf">Play Idiom Quickfire</button><button class="btn" id="home">Back to Today</button></div>`;
    $("#qf", v).onclick = () => go("play-idioms"); $("#home", v).onclick = () => go("today");
    return;
  }
  const queue = due.slice(0, 20); let i = 0, right = 0;
  const step = () => {
    if (i >= queue.length) { addXP(right * 6 + 10); markDone("review");
      v.innerHTML = `<div class="card stack pop" style="text-align:center;align-items:center;padding:32px 18px"><span class="eyebrow">Review complete</span><div class="big-score">${right}/${queue.length}</div><p class="muted">+${right * 6 + 10} XP. ${dueCards().length ? dueCards().length + " more due." : "Deck clear for today."}</p><div class="row" style="justify-content:center">${dueCards().length ? `<button class="btn red" id="more">Keep going</button>` : ""}<button class="btn" id="home">Back to Today</button></div></div>`;
      const m = $("#more", v); if (m) m.onclick = () => route(); $("#home", v).onclick = () => go("today"); return; }
    const c = queue[i];
    const head = `<div class="game-head"><button class="icon-btn" id="quit" aria-label="Quit">${I.back}</button><div class="progress-dots">${queue.map((_, j) => `<i class="${j < i ? "ok" : j === i ? "cur" : ""}"></i>`).join("")}</div><span class="mono muted">${i + 1}/${queue.length}</span></div>`;
    if (c.k === "item") {
      const type = c.t, it = findItem(type, c.ref);
      if (!it) { S.deck = S.deck.filter(x => x !== c); i++; return step(); }
      v.innerHTML = head + `<div class="card qcard" id="q" style="--c:${TYPES[type].c}"><span class="eyebrow">${esc(TYPES[type].name)} · from your mistakes · box ${c.box}</span></div><div id="fb"></div>`;
      $("#quit", v).onclick = () => go("today");
      const R = renderItem(it, (ok, given, note) => { grade(c, ok); if (ok) right++; record(TYPES[type].skill, ok); showFeedback($("#fb", v), it, ok, given, note, ok ? 6 : 0, () => { i++; step(); }); });
      $("#q", v).insertAdjacentHTML("beforeend", R.html); R.mount($("#q", v));
      return;
    }
    v.innerHTML = head + `<div class="card flash" id="fc"><span class="eyebrow">${c.k === "mistake" ? "Fix this" : c.k === "pron" ? "Say it right" : "What does it mean?"} · box ${c.box}</span><div class="front">${esc(c.f)}</div>${c.k === "word" && c.ex ? `<p class="muted"><i>${esc(c.ex)}</i></p>` : ""}<div class="row"><button class="btn small" id="say">${I.speaker}</button><button class="btn primary" id="show">Show answer</button></div><div class="back" id="back" hidden></div></div>`;
    $("#quit", v).onclick = () => go("today");
    $("#say", v).onclick = () => TTS.speak(c.f.replace(/^Dictation: /, ""));
    $("#show", v).onclick = () => {
      $("#show", v).remove(); const b = $("#back", v); b.hidden = false;
      b.innerHTML = `<p><b>${esc(c.b)}</b></p>${c.k === "mistake" && c.ex ? `<p class="muted">${esc(c.ex)}</p>` : ""}<div class="row" style="justify-content:center;margin-top:12px"><button class="btn" id="again">Didn't know</button><button class="btn primary" id="good">Knew it</button></div>`;
      $("#again", v).onclick = () => { grade(c, false); i++; step(); };
      $("#good", v).onclick = () => { grade(c, true); right++; i++; step(); };
    };
  };
  step();
}
function nextDue() { const d = S.deck.map(c => c.due).sort()[0]; if (!d) return "later"; return d === addDays(dayKey(), 1) ? "tomorrow" : "on " + d; }

/* ---------- progress ---------- */
function viewProgress(v) {
  const li = level();
  const weeks = 12, start = addDays(dayKey(), -(weeks * 7 - 1));
  const cells = []; for (let i = 0; i < weeks * 7; i++) { const k = addDays(start, i), x = S.days[k]?.xp || 0; cells.push(`<i title="${k}: ${x} XP" class="${x >= S.settings.goal ? "l3" : x >= S.settings.goal / 2 ? "l2" : x > 0 ? "l1" : ""}"></i>`); }
  const skills = ["uoe", "reading", "listening", "writing", "grammar", "spelling", "vocab", "speaking"];
  const ws = S.writings.filter(w => w.fb).slice(-10);
  v.innerHTML = `<div class="hello"><span class="eyebrow">Progress</span><h1>Your line to C2</h1><p class="muted">${S.xp.toLocaleString("en-GB")} XP · level ${LEVELS[li].n} · streak ${liveStreak()} · best ${S.best || 0}</p></div>
  <div class="card stack">${levelLine()}</div>
  <div class="card stack"><div class="row"><h3>Estimated Cambridge English Scale</h3><span class="spacer"></span><span class="muted" style="font-size:.8rem">C1 180–199 · C2 200–230</span></div><p class="muted" style="font-size:.85rem">From your last 80 answers per skill (needs 8+). A rough guide, not an exam result.</p>
  <div class="stack">${skills.map(k => { const a = acc(k), s = scale(k); return `<div class="skillrow"><span>${SKILLS[k].n}</span><div class="bar" style="--c:${SKILLS[k].c}"><i style="--p:${a == null ? 0 : a * 100}%"></i></div><span class="mono">${s == null ? "—" : s + " " + scaleLabel(s)}</span></div>`; }).join("")}</div></div>
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
async function aiAudioJSON(prompt, blob) { if (!SAMPLE || !SAMPLE.audioJSON) throw {code:"no_key"}; const w = await Rec.toWavBase64(blob); if (w.secs < 1) throw {code:"too_short"}; return SAMPLE.audioJSON(prompt, w.b64, "audio/wav", {modelTier:"default"}); }
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
  <h2 style="margin-top:8px">Speak for a minute</h2>
  <div class="list">${P.map(p => `<button class="card tile" data-id="${p.id}" style="--c:var(--red)"><span class="tag">${esc(p.part)} · ${p.level}</span><p>${esc(p.q)}</p>${done[p.id] ? `<div class="meta"><span class="mono">Last score ${done[p.id].total}/20</span></div>` : ""}</button>`).join("")}</div>`;
  $("#shadow", v).onclick = () => go("speak-shadow");
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

/* ---------- settings ---------- */
function settingsSheet() {
  const bg = document.createElement("div"); bg.className = "sheet-bg";
  bg.innerHTML = `<div class="card sheet stack" role="dialog" aria-label="Settings"><div class="row"><h2>Settings</h2><span class="spacer"></span><button class="icon-btn" id="x" aria-label="Close">✕</button></div>
  <label class="stack" style="gap:6px"><b>Daily goal</b><select id="goal">${[[150, "Light · ~20 min"], [300, "Serious · ~45 min"], [500, "Intense · 60+ min"]].map(([g, n]) => `<option value="${g}" ${S.settings.goal === g ? "selected" : ""}>${g} XP — ${n}</option>`).join("")}</select></label>
  <div class="stack" style="gap:6px"><b>British voice</b><div class="row"><select id="voiceSel"></select><button class="btn small" id="t">${I.speaker} Test</button></div><small class="muted" id="voiceNote"></small></div>
  <div id="mtgBackend" class="stack"></div>
  <div class="stack" style="gap:6px"><b>Backup</b><div class="row"><button class="btn small" id="copy">Copy progress code</button></div><textarea class="answer" id="imp" rows="2" placeholder="Paste a progress code here to restore it" spellcheck="false"></textarea><div><button class="btn small" id="doImp">Restore</button></div></div>
  <p class="muted" style="font-size:.8rem">AI: ${aiOn() ? "Gemini connected" : "not connected"} · ${pool("wf").length + pool("kwt").length + pool("oc").length + pool("mc").length} Use of English items · ${BANK.spell.length + (S.ai.spell || []).length} spelling words</p></div>`;
  document.body.append(bg);
  const close = () => bg.remove();
  bg.onclick = (e) => { if (e.target === bg) close(); }; $("#x", bg).onclick = close;
  $("#goal", bg).onchange = (e) => { S.settings.goal = +e.target.value; save(); route(); };
  window.MTG && window.MTG.mountSettings($("#mtgBackend", bg));
  paintVoiceSel(); $("#t", bg).onclick = () => TTS.speak("Cheers. This is how I'll read your texts.");
  $("#copy", bg).onclick = async () => { const code = btoa(unescape(encodeURIComponent(JSON.stringify(S)))); try { await navigator.clipboard.writeText(code); toast("Copied. Keep it somewhere safe."); } catch (e) { const ta = $("#imp", bg); ta.value = code; ta.select(); toast("Select-all and copy the text in the box."); } };
  $("#doImp", bg).onclick = () => { try { const o = JSON.parse(decodeURIComponent(escape(atob($("#imp", bg).value.trim())))); if (!o || o.v !== 1) throw 0; S = Object.assign(blank(), o); save(); close(); route(); paintChips(); toast("Progress restored."); } catch (e) { toast("That code isn't valid."); } };
}

/* ---------- boot ---------- */
function boot() {
  shell(); TTS.init(); route();
  addEventListener("hashchange", route);
  addEventListener("online", () => { if (DOC) pushRemote(); });
  document.addEventListener("click", (e) => { if (popEl && !popEl.contains(e.target)) closePop(); });
  const C = window.claude;
  if (C && C.use) {
    C.use("sample").then(s => { SAMPLE = s; if (s) { const h = location.hash.slice(1); if (["", "today", "practice", "read", "listen", "write"].includes(h) || (h.startsWith("play-") && $("#start"))) route(); } }).catch(() => {});
    C.use("tts").then(t => { TTSCAP = t; }).catch(() => {});
    Promise.all([C.use("db"), C.use("user")]).then(async ([db, user]) => {
      if (!db || !user) return; const id = await user.id(); if (!id) return;
      DB = db; const ref = db.doc(`data/users/${id}/state`);
      try {
        const snap = await ref.get(); const d = snap && snap.exists ? snap.data() : null;
        if (d && d.s && (d.updatedAt || 0) > (S.updatedAt || 0)) {
          S = Object.assign(blank(), JSON.parse(d.s)); S.settings = Object.assign(blank().settings, S.settings || {});
          try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {}
          DOC = ref; syncState = "synced"; paintChips(); paintSync();
          const h = location.hash.slice(1); if (!h || ["today", "practice", "progress", "review"].includes(h)) route();
        } else { DOC = ref; if (S.updatedAt) pushRemote(); else { syncState = "synced"; paintSync(); } }
      } catch (e) { syncState = "error"; paintSync(); DOC = ref; }
    }).catch(() => {});
  }
}
boot();
})();
