export default async function registerServiceWorker() { 
    if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.debug("Service worker installing");
      } else if (registration.waiting) {
        console.debug("Service worker installed");
      } else if (registration.active) {
        console.debug("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
