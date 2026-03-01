const EVENT_TYPE = {
  TOKEN: "TOKEN",
  GET_TOKEN: "GET_TOKEN",
  GET_WS_TICKET: "GET_WS_TICKET"
}

const initChache = async () => await caches.open("v1");
let jwt = "";
self.addEventListener("install", (event) => {
  event.waitUntil(initChache());
});



self.addEventListener("message", (event) => {
  if (event.data && event.data.type === EVENT_TYPE.TOKEN) {
    console.log("Received token in service worker:", event.data.payload);
    jwt = event.data.payload;
  }
  if (event.data && event.data.type === EVENT_TYPE.GET_TOKEN) {
    event.ports[0].postMessage({ type: "TOKEN", payload: jwt });
  }
  if( event.data && event.data.type === EVENT_TYPE.GET_WS_TICKET){
    
  }
});
