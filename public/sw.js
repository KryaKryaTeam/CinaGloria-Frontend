const initChache = async () => await caches.open('v1');
let jwt = '';
self.addEventListener('install', (event) => {
  event.waitUntil( initChache() ) 
    }
);
self.addEventListener('fetch', (event) => {});
self.addEventListener('message', (event) => { 
    if (event.data && event.data.type === 'SET_JWT') {
        jwt = event.data.jwt;
    }
});