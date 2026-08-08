const CACHE_NAME = 'hin-hun-v1.0.5'

self.addEventListener('install', _event => {
    self.skipWaiting()
})

self.addEventListener('activate', event => {
    // caches.match() below searches every cache store in the origin, not just
    // CACHE_NAME, so a stale entry from a previous version would otherwise
    // keep being served forever. Drop anything that isn't the current cache.
    event.waitUntil(
        Promise.all([
            clients.claim(),
            caches.keys().then(keys =>
                Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
            )
        ])
    )
})

self.addEventListener('fetch', event => {
    const { request } = event
    const url = new URL(request.url)

    
    if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) {
        return
    }

    event.respondWith(
        caches.match(request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse
            }

            return fetch(request)
                .then(networkResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, networkResponse.clone())
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