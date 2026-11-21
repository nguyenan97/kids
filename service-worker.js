const CACHE_NAME = 'ms-tuyen-kids-v8';
const ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/alphabet-data.js',
    './js/audio.js',
    './js/tracing-canvas.js',
    './js/videos-data.js',
    './js/channel-videos.js',
    './js/app.js',
    './icons/icon-192.png',
    './img/poppy.png',
    './manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        ))
    );
    self.clients.claim();
});

// Same-origin only. Network first so new videos/schedule show up right away;
// fall back to cache when offline. YouTube requests are never cached.
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
    event.respondWith(
        fetch(event.request)
            .then((res) => {
                const copy = res.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                return res;
            })
            .catch(() => caches.match(event.request))
    );
});
