/* MedBridge service worker: cache-first for the app shell so it works fully offline. */
const CACHE = "medbridge-v11";
const ASSETS = ["./", "./index.html", "./css/style.css", "./js/books.js", "./js/drugs-data.js", "./js/conditions.js", "./js/profiles.js", "./js/calc.js", "./js/api.js", "./js/community.js", "./js/app.js", "./manifest.json", "./icons/icon.svg", "./icons/icon-192.png", "./icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (new URL(e.request.url).pathname.startsWith("/api/")) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok && new URL(e.request.url).origin === location.origin) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match("./index.html"))));
});
