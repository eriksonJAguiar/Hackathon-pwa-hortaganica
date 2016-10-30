var cacheName = 'AppPWA-step-6-1';
var filesToCache = [
'./',
'/app.js',
'/culturaProdutor.html',
'/login.js',
'/login.js.save',
'/manifest.json',
'/sw-import.js',
'/css/materialize.css',
'/css/materialize.min.css',
'/fonts/Roboto-Bold.eot',
'/fonts/roboto/Roboto-Bold.ttf',
'/fonts/roboto/Roboto-Bold.woff',
'/fonts/roboto/Roboto-Bold.woff2',
'/fonts/roboto/Roboto-Light.eot',
'/fonts/roboto/Roboto-Light.ttf',
'/fonts/roboto/Roboto-Light.woff',
'/fonts/roboto/Roboto-Light.woff2',
'/fonts/roboto/Roboto-Medium.eot',
'/fonts/roboto/Roboto-Medium.ttf',
'/fonts/roboto/Roboto-Medium.woff',
'/fonts/roboto/Roboto-Medium.woff2',
'/fonts/roboto/Roboto-Regular.eot',
'/fonts/roboto/Roboto-Regular.ttf',
'/fonts/roboto/Roboto-Regular.woff',
'/fonts/roboto/Roboto-Regular.woff2',
'/fonts/roboto/Roboto-Thin.eot',
'/fonts/roboto/Roboto-Thin.ttf',
'/fonts/roboto/Roboto-Thin.woff',
'/fonts/roboto/Roboto-Thin.woff2',
'/js/materialize.js',
'/js/materialize.min.js',
'/login.html'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});


