const CACHE_NAME = 'pwa-jualbeli-v1'; // Nama cache
const urlsToCache = [
  '/', // root
  '/index.html', // beranda
  '/produk.html', // halaman produk
  '/style.css', // stylesheet
  '/manifest.json', // manifest PWA
  '/icon-192.png', // ikon kecil
  '/icon-512.png' // ikon besar
];

self.addEventListener('install', event => { // Event install
  event.waitUntil(
    caches.open(CACHE_NAME) // Buka cache
      .then(cache => cache.addAll(urlsToCache)) // Tambahkan file ke cache
  );
});

self.addEventListener('fetch', event => { // Event fetch
  event.respondWith(
    caches.match(event.request) // Coba dari cache
      .then(response => response || fetch(event.request)) // Atau ambil dari jaringan
  );
});

self.addEventListener('activate', event => { // Event aktifasi
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) { // Hapus cache lama
            return caches.delete(name);
          }
        })
      );
    })
  );
});
