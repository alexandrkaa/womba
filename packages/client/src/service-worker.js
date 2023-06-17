const CACHE_NAME = 'womba-2048-game'
const URLS = ['/assets/right.5ad4b6c5.png', '/assets/up.b053d646.png', '/assets/left.5bee0684.png', '/assets/down.60e23a8b.png', '/assets/plus.e39fe01c.svg', '/assets/index.2a20decb.js', '/assets/index.fcbe950b.css', '/index.html', '/', '/assets']
this.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(URLS.map((urlToPrefetch) => {
          return new Request(urlToPrefetch, { mode: "no-cors" });
        }))
      })
      .then(() => {
        console.log("All resources have been fetched and cached.");
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  )
})

this.addEventListener('fetch', event => {
  if ((String(event.request.url).indexOf('chrome-extension') + 1) > 0) return;
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
          }
          );
      })
  );
});

this.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .map(name => caches.delete(name))
      )
    })
  );
});