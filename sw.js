const CACHE = 'studiog-v1';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll([
        './',
        './index.html',
        './manifest.json',
        './icon-192.png',
        './icon-512.png'
      ])
    ).then(() => self.skipWaiting()) // <-- Força a instalação imediata
  );
});

self.addEventListener('activate', e => {
  // Força o Service Worker atualizado a tomar o controle das abas abertas imediatamente
  e.waitUntil(self.clients.claim()); 
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
