import { inject, injectable } from "inversify";
import { io, Socket } from "socket.io-client";
import { GetWsTokenRequest } from "./requests/network/GetWsToken.request";
import NotificationStore from "@/state/NotificationStore";
import container from "./Container";

@injectable()
export class WsSocket {
  private socket: Socket;
  constructor(
    @inject(GetWsTokenRequest) private get_ws_token_req: GetWsTokenRequest,
  ) {
    this.socket = io("https://bots.swedka121.com/", {
      autoConnect: false,
      path: "/ws/",
      transports: ["websocket", "polling"],
      secure: true,
    });
  }

  async connect() {
    const { token } = await this.get_ws_token_req.execute(undefined);
    this.socket.auth = { token };
    this.socket.connect();

    this.socket.on("connect", () => {
      console.log("Connected");
    });
    this.socket.on("new_notification", (data) => {
      const store = container.get(NotificationStore);
      store.addNew(data)
    })
    this.socket.on("disconnect", () => {
      console.log("Disconected");
    });
  }
}