const staticDevCoffee = 'hung-xuan-v1';
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/img/hung.png',
  '/img/xuan.jpeg',
  '/img/love.png',
  '/music/cmty.mp3',
  '/music/ctcgt.mp3',
];

self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
