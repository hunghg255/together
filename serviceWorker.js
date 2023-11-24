const staticDevCoffee = 'hung-xuan-v2';
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
  '/img/heart16.png',
  '/img/heart32.png',
  '/img/heart64.png',
  '/img/heart128.png',
  '/img/heart256.png',
  '/img/heart512.png',
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
