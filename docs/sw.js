/* MedBridge service worker.
   Network-first for the app's own files, so a corrected dose reaches the user the moment they
   are online; the cache is only the offline fallback. Never touches /api. */
const CACHE = "medbridge-v18";
const ASSETS = ["./", "./index.html", "./css/style.css", "./js/i18n.js", "./js/config.js", "./js/books.js", "./js/drugs-data.js", "./js/conditions.js", "./js/profiles.js", "./js/calc.js", "./js/resus.js", "./js/regimens.js", "./js/compat.js", "./js/substitutes.js", "./js/ethcal.js", "./js/safety.js", "./js/neonatal.js", "./js/interactions.js", "./js/features.js", "./js/extras.js", "./js/review.js", "./js/api.js", "./js/community.js", "./js/app.js", "./manifest.json", "./icons/icon.svg", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(ASSETS.map(a => fetch(new Request(a, { cache: "reload" })).then(r => r.ok && c.put(a, r)).catch(() => {}))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin || url.pathname.startsWith("/api/")) return;
  e.respondWith(
    fetch(e.request, { cache: "no-cache" })
      .then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return res; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(hit => hit || caches.match("./index.html")))
  );
});
