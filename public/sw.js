const CACHE_NAME = 'hin-hun-v1.0.1'

self.addEventListener('install', _event => {
    self.skipWaiting()
})

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim())
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse
            }

            return fetch(event.request)
                .then(networkResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone())
                        return networkResponse
                    })
                })
                .catch(() => {
                    return new Response('You are offline.', {
                        status: 503,
                        statusText: 'Service Unvailable',
                        headers: { 'Content-Type': 'text/plain' }
                    })
                })
        })
    )
})