const CACHE_NAME = 'img-cache-v1';
const IMAGES = [
  '/imagenes/grupo_3.webp',
  '/imagenes/grupo_en_B_y_N.webp',
  '/imagenes/integrantes/adriana.webp',
  '/imagenes/integrantes/yaniela.webp',
  '/imagenes/integrantes/pedro.webp',
  '/imagenes/integrantes/christian.webp',
  '/imagenes/integrantes/jessica.webp',
  '/imagenes/integrantes/emanuel.webp',
  '/imagenes/integrantes/angel.webp',
  '/imagenes/concierto_de_resurreccion/a.webp',
  '/imagenes/pascua_joven/a.webp',
  '/imagenes/grabacion_de_amor_de_dias_grises/a.webp',
  '/imagenes/ajuria/a.webp',
  '/imagenes/lajas/b.webp',
  '/imagenes/cinelajas/a.webp',
  '/imagenes/mariapolis/b.webp',
  '/imagenes/cruces_2023/a.webp',
  '/imagenes/la-habana/a.webp',
  '/imagenes/virgen_de_la_caridad_cartagena/a.webp',
  '/imagenes/JDJ/a.webp',
  '/imagenes/asuncion_de_la_virgen_maria/a.webp',
  '/imagenes/señora_del_carmen/a.webp',
  '/imagenes/festival_juvenil/a.webp',
  '/imagenes/boda_yisel/a.webp',
  '/imagenes/primer_concierto/a.webp',
  '/imagenes/primer_instrumental/a.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(IMAGES))
  );
});

self.addEventListener('fetch', (event) => {
  if (IMAGES.some(img => event.request.url.includes(img))) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});