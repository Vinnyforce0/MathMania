const CACHE_NAME = 'MathMania';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/CSS/styles.css',
  '/HTML/indice.html',
  '/HTML/iniciar.html',
  '/HTML/opcoes.html',
  '/SRC/play.js',
  '/IMAGES/floor.jpg',
  '/IMAGES/laser.png',
  '/IMAGES/sky.jpg'
];

// Evento de instalação - faz cache de todos os arquivos
self.addEventListener('install', event => {
  console.log('Service worker instalado - iniciando cache');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto, adicionando arquivos');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting()) // ativa imediatamente
  );
});

// Evento de ativação - limpa caches antigos
self.addEventListener('activate', event => {
  console.log('Service worker ativado');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // assume o controle das abas
  );
});

// Intercepta requisições (fetch) - estratégia cache-first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se encontrou no cache, retorna
        if (response) {
          return response;
        }
        
        // Senão, tenta buscar da rede
        return fetch(event.request)
          .then(response => {
            // Se a requisição foi bem-sucedida, adiciona ao cache
            if (!response || response.status !== 200) {
              return response;
            }
            
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Se falhar na rede, retorna um fallback (se houver)
            console.log('Offline:', event.request.url);
            return caches.match(BASE_PATH + 'index.html');
          });
      })
  );
});