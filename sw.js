/* Service worker · Mind the Gap
   Guarda la app en caché para que funcione sin conexión.
   IMPORTANTE: al cambiar cualquier archivo, sube el número de versión. */
const CACHE = "mtg-v6";
const FILES = [
  "./", "./index.html", "./manifest.webmanifest", "./style.css",
  "./vendor/supabase-2.118.0.min.js", "./backend.js", "./data.js", "./extra.js", "./app.js",
  "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png"
];
const FONT_CACHE = "mtg-fonts";

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== FONT_CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Fuentes de Google: caché primero (funcionan sin conexión tras la primera visita)
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONT_CACHE).then(async c => {
      const hit = await c.match(req); if (hit) return hit;
      const res = await fetch(req); c.put(req, res.clone()); return res;
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;   // Supabase y Gemini van directos

  // Archivos de la app: respuesta inmediata desde caché y actualización en segundo plano
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => null);
    return hit || (await net) || (req.mode === "navigate" ? c.match("./index.html") : Response.error());
  }));
});
