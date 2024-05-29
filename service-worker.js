const CACHE_NAME = "shopping-app-v2"

self.addEventListener('install', event => {
    event.waitUntil((async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll([
        '/',
        '/categories',
        '/public'
      ])
    })());
  });

  self.addEventListener('fetch', event => {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      // Get the resource from the cache.
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      } else {
          try {
            // If the resource was not in the cache, try the network.
            const fetchResponse = await fetch(event.request);
  
            // Save the resource in the cache and return it.
            await cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          } catch (e) {
            // The network failed.
          }
      }
    })());
  });