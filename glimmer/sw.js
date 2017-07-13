// registers the service worker with the page
// browser -> "here's the JS sw file"

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// installing sw
// open cache, cache the files, cehck to see if assets are cached

var CACHE_NAME = 'annotation-standardizer-cache';
var urlsToCache = [
  // super unsure what goes here but something needs to
];

self.addEventListener('install', function(event) {
  // actual installation
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
