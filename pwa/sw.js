

const CACHE_NAME = "instrument-explorer-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "./script.js",
  "./topics.json",
  "./manifest.json",
  "./images/piano.png",
  "./images/guitar.png",
  "./images/violin.png",
  "./images/drum.png",
  "./images/flute.png",
  "./icon-192.png",
  "./icon-512.png",
  "./audio/piano.wav",
  "./audio/guitar.wav",
  "./audio/violin.wav",
  "./audio/drum.wav",
  "./audio/flute.wav"
];


self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});