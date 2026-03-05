import { io } from "socket.io-client";


async() => {

class Socket {
    async connect() {
        const t = await fetch('https://bots.swedka121.com/app/v1/ws/token')
        const socket = io("https://bots.swedka121.com/ws");
        socket.auth = {token: t};
        socket.connect()

        socket.on("conect", (ev) => {
            console.log(ev);
        })
    }
}