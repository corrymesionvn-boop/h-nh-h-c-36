const CACHE_NAME = 'hinh-hoc-36-v-update-99'; // Cứ mỗi lần update là phải đổi số này
const ASSETS = [
  './',
  './index.html',
  './rauma.png',
  './music/music1.mp3',
  './music/music2.mp3',
  './music/music3.mp3',
  './music/music4.mp3',
  './music/music5.mp3'
];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // BUỘC SW MỚI CÓ HIỆU LỰC NGAY
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((k) => {
        if (k !== CACHE_NAME) return caches.delete(k); // XÓA SẠCH CACHE CŨ
      })
    ))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
