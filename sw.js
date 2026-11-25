// Offline support: keep the app files; always try the network first so updates show up.
// "no-cache" = always ask GitHub if there is a newer file, instead of using the phone's 10-minute copy.
const CACHE = "khodro-v16";
const FILES = ["./", "index.html", "css/app.css", "js/core.js", "js/insurance.js", "js/bollo.js", "js/state.js", "js/news.js", "js/reminders.js", "js/screens.js", "js/app.js", "i18n/i18n.js", "i18n/it.js", "i18n/en.js", "data/bollo-2026.js", "data/news.json", "fonts/Vazirmatn-Variable.woff2", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request.url, { cache: "no-cache" }).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request).then((m) => m || caches.match("index.html"))));
});
