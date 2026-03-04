const EVENT_TYPE = {
  TOKEN: "TOKEN",
  GET_WS_TICKET: "GET_WS_TICKET"
}

const initCache = async () => await caches.open("v1");
let jwt = "";

self.addEventListener("install", (event) => {
  event.waitUntil(initCache());
});

self.addEventListener("fetch", (event) => {
  if (!jwt) return;

  const modifiedRequest = new Request(event.request, {
    headers: new Headers({
      ...Object.fromEntries(event.request.headers.entries()),
      "Authorization": `Bearer ${jwt}`
    })
  });

  event.respondWith(fetch(modifiedRequest));
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === EVENT_TYPE.TOKEN) {
    console.log("Received token in service worker:", event.data.payload);
    jwt = event.data.payload;
  }
  if (event.data && event.data.type === EVENT_TYPE.GET_WS_TICKET) {

  }
});