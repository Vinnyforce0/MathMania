const CACHE_NAME = 'Math-Mania';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/CSS/styles.css',
  '/HTML/indice.html',
  '/HTML/iniciar.html',
  '/HTML/opcoes.html',
  '/SRC/play.js',
  'IMAGES/floor.jpg',
  'IMAGES/laser.png',
  'IMAGES/sky.jpg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
