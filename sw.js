const CACHE_NAME = 'link-undangan-cache-v1';

const urlsToCache = [
  '/link-inv-gen/',
  '/link-inv-gen/index.html',
  '/link-inv-gen/src/assets/css/style.css',
  '/link-inv-gen/src/assets/js/script.js',
  '/link-inv-gen/src/assets/favicon/images/icon-192x192.png',
  '/link-inv-gen/src/assets/favicon/images/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
