// service-worker.js

// Importa a versão do config.js
importScripts('./SRC/config.js');

// Detecta localhost/Live Server (/) ou GitHub Pages (/MathMania/)
const isDev =
  self.location.hostname === 'localhost' ||
  self.location.hostname === '127.0.0.1';

const BASE_PATH = isDev ? '/' : '/MathMania/';

const CACHE_PREFIX = 'mathmania-';
const CACHE_NAME = CACHE_PREFIX + 'v' + APP_VERSION;

const ASSETS_TO_CACHE = [
  BASE_PATH,
  BASE_PATH + 'index.html',
  BASE_PATH + 'manifest.json',
  BASE_PATH + 'package-lock.json',
  BASE_PATH + 'package.json',
  BASE_PATH + 'anime.esm.js',

  BASE_PATH + 'CSS/styles.css',
  BASE_PATH + 'CSS/boss.css',
  BASE_PATH + 'CSS/achievements.css',

  BASE_PATH + 'HTML/iniciar.html',
  BASE_PATH + 'HTML/indice.html',
  BASE_PATH + 'HTML/opcoes.html',
  BASE_PATH + 'HTML/sobre.html',
  BASE_PATH + 'HTML/achievements.html',
  BASE_PATH + 'HTML/Bossfight.html',
  BASE_PATH + 'HTML/escolha.html',

  BASE_PATH + 'SRC/config.js',
  BASE_PATH + 'SRC/play.js',
  BASE_PATH + 'SRC/BF.js',
  BASE_PATH + 'SRC/BFanimation.js',
  BASE_PATH + 'SRC/operadores.js',
  BASE_PATH + 'SRC/achievements.js',

  BASE_PATH + 'IMAGES/MathMania_Icon.png',
  BASE_PATH + 'IMAGES/boss.skull.svg',
  BASE_PATH + 'IMAGES/sky.jpg',];


// ======================================================
// INSTALAÇÃO
// ======================================================

self.addEventListener('install', event => {

  console.log(
    'Service Worker instalado - iniciando cache:',
    CACHE_NAME
  );

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(cache => {

        console.log(
          'Cache aberto, adicionando arquivos'
        );

        return cache.addAll(ASSETS_TO_CACHE);

      })

      .then(() => {

        console.log(
          'Arquivos armazenados com sucesso'
        );

        // Ativa imediatamente
        return self.skipWaiting();

      })

  );

});


// ======================================================
// ATIVAÇÃO
// ======================================================

self.addEventListener('activate', event => {

  console.log(
    'Service Worker ativado:',
    CACHE_NAME
  );

  event.waitUntil(

    caches.keys()

      .then(cacheNames => {

        return Promise.all(

          cacheNames

            .filter(cacheName =>

              cacheName.startsWith(CACHE_PREFIX) &&
              cacheName !== CACHE_NAME

            )

            .map(cacheName => {

              console.log(
                'Deletando cache antigo:',
                cacheName
              );

              return caches.delete(cacheName);

            })

        );

      })

      .then(() => {

        console.log(
          'Caches antigos removidos'
        );

        return self.clients.claim();

      })

  );

});


// ======================================================
// MENSAGENS RECEBIDAS DAS PÁGINAS
// ======================================================

self.addEventListener('message', event => {

  if (!event.data) {
    return;
  }


  // ----------------------------------------------------
  // ATIVAR NOVA VERSÃO
  // ----------------------------------------------------

  if (event.data.type === 'SKIP_WAITING') {

    console.log(
      'Solicitação para ativar novo Service Worker'
    );

    self.skipWaiting();

    return;
  }


  // ----------------------------------------------------
  // LIMPAR CACHE MANUALMENTE
  // ----------------------------------------------------

  if (event.data.type === 'CLEAR_CACHE') {

    console.log(
      'Solicitação para limpar cache manualmente'
    );

    event.waitUntil(

      caches.keys()

        .then(cacheNames => {

          return Promise.all(

            cacheNames

              .filter(cacheName =>
                cacheName.startsWith(CACHE_PREFIX)
              )

              .map(cacheName => {

                console.log(
                  'Deletando cache:',
                  cacheName
                );

                return caches.delete(cacheName);

              })

          );

        })

        .then(() => {

          console.log(
            'Cache limpo com sucesso'
          );


          // Responde para a página que solicitou
          if (event.ports && event.ports[0]) {

            event.ports[0].postMessage({

              type: 'CACHE_CLEARED'

            });

          }

        })

    );

  }

});


// ======================================================
// FETCH
// ======================================================

self.addEventListener('fetch', event => {

  event.respondWith(

    caches.match(event.request)

      .then(response => {

        // ------------------------------------------------
        // CACHE
        // ------------------------------------------------

        if (response) {

          return response;

        }


        // ------------------------------------------------
        // REDE
        // ------------------------------------------------

        return fetch(event.request)

          .then(response => {

            // Só armazena respostas válidas
            if (
              !response ||
              response.status !== 200
            ) {

              return response;

            }


            const responseToCache =
              response.clone();


            caches.open(CACHE_NAME)

              .then(cache => {

                cache.put(
                  event.request,
                  responseToCache
                );

              });


            return response;

          })


          // ------------------------------------------------
          // OFFLINE
          // ------------------------------------------------

          .catch(() => {

            console.log(
              'Offline:',
              event.request.url
            );

            return caches.match(
              BASE_PATH + 'index.html'
            );

          });

      })

  );

});