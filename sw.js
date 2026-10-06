/* ============================================================================
   sw.js — Service Worker: hace que la página se pueda instalar como app y
   funcione sin internet.

   Estrategia:
   - Los archivos de la app (html, css, js, iconos) se guardan en caché y se
     sirven desde ahí: arranca al instante y sin conexión.
   - datos.js (los resultados) va PRIMERO a la red, para que veas siempre lo
     último; si no hay internet, usa la copia guardada.

   Al publicar cambios, sube el número de VERSION para que se refresque la caché.
   ============================================================================ */

const VERSION = "copa-v1";
const ARCHIVOS = [
  "./",
  "index.html",
  "estilos.css",
  "app.js",
  "admin.js",
  "datos.js",
  "manifest.json",
  "iconos/icono-192.png",
  "iconos/icono-512.png",
  "iconos/icono-180.png"
];

self.addEventListener("install", (evento) => {
  evento.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(ARCHIVOS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((c) => c !== VERSION).map((c) => caches.delete(c))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (evento) => {
  const peticion = evento.request;
  if (peticion.method !== "GET") return;

  const url = new URL(peticion.url);
  if (url.origin !== self.location.origin) return;

  // datos.js: primero la red, con copia de respaldo para el modo sin conexión
  if (url.pathname.endsWith("datos.js")) {
    evento.respondWith(
      fetch(peticion)
        .then((respuesta) => {
          const copia = respuesta.clone();
          caches.open(VERSION).then((cache) => cache.put(peticion, copia));
          return respuesta;
        })
        .catch(() => caches.match(peticion).then((r) => r || caches.match("datos.js")))
    );
    return;
  }

  // el resto: primero la copia guardada (rápido y sin internet)
  evento.respondWith(
    caches.match(peticion).then((guardado) => guardado || fetch(peticion))
  );
});
