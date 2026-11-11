// HYDRPG service worker: network first (so GitHub updates arrive), cache fallback (so it works offline).
// Player saves live in localStorage and are NOT touched by this file or by updating the site.
const CACHE = 'hydrpg-cache';
const FILES = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'css/style.css', 'css/fonts.css'];
self.addEventListener('install', e => {e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES).catch(() => {})).then(() => self.skipWaiting()))});
self.addEventListener('activate', e => {e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k != CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()))});
self.addEventListener('fetch', e => {if (e.request.method != 'GET' || new URL(e.request.url).origin != location.origin) return;
  e.respondWith(fetch(e.request).then(r => {const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return r}).catch(() => caches.match(e.request).then(m => m || caches.match('index.html'))))});
