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
    this.socket = io(
      `${process.env.NEXT_PUBLIC_BACKEND_SOCKET_URL}/notification`,
      {
        autoConnect: false,
        path: "/ws/",
        transports: ["websocket", "polling"],
        secure:
          !process.env.NEXT_PUBLIC_BACKEND_SOCKET_URL?.includes("localhost"),
      },
    );
  }

  async connect() {
    const { token } = await this.get_ws_token_req.execute(undefined);
    this.socket.auth = { token };
    this.socket.connect();

    this.socket.on("connect", () => {
      console.log("Connected");
    });
    this.socket.on("new_notification", (data) => {
      console.log("NEW!!");
      const store = container.get(NotificationStore);
      store.addNew(data);
    });
    this.socket.on("disconnect", () => {
      console.log("Disconected");
    });
  }
}
