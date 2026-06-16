/* Holy Bible — Service Worker  v3.1
   Strategy:
     - App shell (HTML/CSS/JS): network-first, cache as fallback
       → new deployments appear immediately without clearing cache
     - Bible JSON: stored in IndexedDB by the app, not intercepted here
     - External CDN / API calls: always pass through (no cache)
*/

const SW_VERSION = '3.1';
const CACHE = `holy-bible-${SW_VERSION}`;
const SHELL = ['./', './index.html', './styles.css', './app.js', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())   // activate immediately
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())  // take control of open tabs
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Let external requests (CDN, APIs) pass through unmodified
  if (url.origin !== self.location.origin) return;

  // App shell: network-first so updates are always visible
  e.respondWith(
    fetch(e.request, { cache: 'no-store' })
      .then(res => {
        // Cache a fresh copy on success
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))  // offline fallback
  );
});
