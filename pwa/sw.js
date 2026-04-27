const CACHE_NAME = "instrument-explorer-v5";

const urlsToCache = [
  "./",
  "./index.html",
  "./promo.html",
  "./documentation.html",
  "./style.css",
  "./script.js",
  "./topics.json",
  "./custom-learning-set.json",
  "./manifest.json",
  "./images/piano.png",
  "./images/guitar.png",
  "./images/violin.png",
  "./images/drum.png",
  "./images/flute.png",
  "./images/promotion_screenshot.png",
  "./icon-192.png",
  "./icon-512.png",
  "./audio/piano.mp3",
  "./audio/guitar.mp3",
  "./audio/violin.mp3",
  "./audio/drum.mp3",
  "./audio/flute.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
