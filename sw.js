const CACHE_NAME = 'img-cache-v1';
const IMAGES = [
  '/imagenes/grupo_3.webp', '/imagenes/grupo_en_B_y_N.webp', '/imagenes/integrantes/adriana.webp', '/imagenes/integrantes/yaniela.webp',
  '/imagenes/integrantes/pedro.webp', '/imagenes/integrantes/christian.webp', '/imagenes/integrantes/jessica.webp', '/imagenes/integrantes/emanuel.webp',
  '/imagenes/integrantes/angel.webp', '/imagenes/conciertos/concierto_de_resurreccion/a.webp', '/imagenes/conciertos/pascua_joven/a.webp', '/imagenes/conciertos/grabacion_de_amor_de_dias_grises/a.webp',
  '/imagenes/conciertos/ajuria/a.webp', '/imagenes/conciertos/lajas/b.webp', '/imagenes/conciertos/cinelajas/a.webp', '/imagenes/conciertos/mariapolis/b.webp',
  '/imagenes/conciertos/cruces_2023/a.webp', '/imagenes/conciertos/la-habana/a.webp', '/imagenes/conciertos/virgen_de_la_caridad_cartagena/a.webp', '/imagenes/conciertos/JDJ/a.webp',
  '/imagenes/conciertos/asuncion_de_la_virgen_maria/a.webp', '/imagenes/conciertos/señora_del_carmen/a.webp', '/imagenes/conciertos/festival_juvenil/a.webp', '/imagenes/conciertos/boda_yisel/a.webp',
  '/imagenes/conciertos/primer_concierto/a.webp', '/imagenes/conciertos/primer_instrumental/a.webp', '/imagenes/cumpleaños/cumple_daniel/a.webp', '/imagenes/cumpleaños/cumple_belkys/a.webp',
  '/imagenes/personal/a.webp', '/imagenes/personal/b.webp', '/imagenes/personal/c.webp', '/imagenes/personal/d.webp',
  '/imagenes/personal/e.webp', '/imagenes/personal/f.webp',
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