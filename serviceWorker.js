const CACHE = 'hung-xuan-minhanh-v3';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/img/hung.jpeg',
  '/img/xuan.jpeg',
  '/img/minhanh.png',
  '/img/love.png',
  '/img/heart16.png',
  '/img/heart32.png',
  '/img/heart64.png',
  '/img/heart128.png',
  '/img/heart256.png',
  '/img/heart512.png',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(assets)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// network first so updates show up right away, cache as offline fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res.status === 200 && new URL(event.request.url).origin === self.location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
