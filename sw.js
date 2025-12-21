const CACHE_NAME = 'gd-rauma-universal-v1';
const ASSETS = [
  './',
  './index.html',
  './music/music1.mp3',
  './music/music2.mp3',
  './music/music3.mp3',
  './music/music4.mp3',
  './music/music5.mp3'
];

// Cài đặt: Tải hết tài nguyên vào cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Kích hoạt: Xóa cache cũ nếu có bản cập nhật
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((k) => k !== CACHE_NAME && caches.delete(k))
    ))
  );
});

// Phản hồi: Ưu tiên lấy từ Cache trước, không có mạng vẫn chạy được
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
