const CACHE_NAME = 'jueces5-v3';
const ASSETS = [
  '/',
  '/estilos.min.css',
  '/imagenes/logo.webp',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@400;600&display=swap'
];

self.addEventListener('install', (e) => {
  e.waitUntil
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});