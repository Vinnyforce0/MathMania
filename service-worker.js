const CACHE_NAME = 'MathMania.3';
const ASSETS_TO_CACHE = [
  './MathMania/',
  './MathMania/index.html',
  './MathMania/manifest.json',
  './MathMania/CSS/styles.css',
  './MathMania/HTML/indice.html',
  './MathMania/HTML/iniciar.html',
  './MathMania/HTML/opcoes.html',
  './MathMania/SRC/play.js',
  './MathMania/IMAGES/floor.jpg',
  './MathMania/IMAGES/laser.png',
  './MathMania/IMAGES/sky.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE).catch(err => console.warn('Falha ao cachear:', err)))
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
