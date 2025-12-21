const CACHE_NAME = 'gd-rauma-offline-v1';
const ASSETS = [
  './game.html',
  '../music/music1.mp3',
  '../music/music2.mp3',
  '../music/music3.mp3',
  '../music/music4.mp3',
  '../music/music5.mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((k) => k !== CACHE_NAME && caches.delete(k))
    ))
  );
});
