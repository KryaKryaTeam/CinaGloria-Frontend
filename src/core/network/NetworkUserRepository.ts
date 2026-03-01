
import IUserNetwork from "./interfaces/IUserNetwork";

export default class NetworkUserRepository implements IUserNetwork {
  userExistsBefore: boolean = false;
  async postLoginData(email: string, password: string) {
   await fetch("https://bots.swedka121.com/app/v1/auth/login?provider=LOCAL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((ServerData) => {
        console.log("Success:", ServerData);
        this.userExistsBefore = ServerData.userExistsBefore;
    // request on service worker to save token
    navigator.serviceWorker.ready.then((registration) => {
      registration.active?.postMessage({
        type: "TOKEN",
        payload: ServerData.accessToken,
      });
    });

      })
      .catch((error) => {
        console.error("Error:", error);
      });


  }
  getDataFromServiceWorker(): Promise<any> {
    return new Promise((resolve) => {
      const channel = new MessageChannel();

      channel.port1.onmessage = (event) => {
        resolve(event.data.payload);
      };
      if (!navigator.serviceWorker.controller)
        throw new Error("No active Service Worker found.");
      navigator.serviceWorker.controller.postMessage({ type: "GET_TOKEN" }, [
        channel.port2,
      ]);
    });
  }
  get isExistingUser() {
    return this.userExistsBefore;
  }
}
