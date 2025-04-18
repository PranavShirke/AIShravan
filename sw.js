const CACHE_NAME = 'ai-shravan-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/community.html',
  '/Gesreco.html',
  '/stt.html',
  '/tts.html',
  '/Gestures.html',
  '/chatbot.html',
  '/Searchvid.html',
  '/up.html',
  '/forms.html',
  '/settings.html',
  '/About.html',
  '/login.html',
  '/styles.css',
  '/styless.css',
  '/common.css',
  '/font-settings.js',
  '/js/',
  '/manifest.json',
  '/WhatsApp Image 2025-02-21 at 14.04.24_a99b9c8f.jpg',
  '/Prevalence-of-Hearing-Loss-In-India-1.jpg',
  '/sfasu-interpretor-ds-deaf.jpg',
  '/BLOG-HERO-IMAGES.webp',
  '/ghows-LK-7315e6ff-21ef-78ac-e053-0100007f760c-f378b873.webp',
  '/yes.png',
  '/no.png',
  '/sorry.png',
  '/love.png',
  '/help.png',
  '/goodbye.png',
  '/fear.png',
  '/family.png',
  '/excuseme.png',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore-compat.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 