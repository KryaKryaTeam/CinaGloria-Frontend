'use client'

import { useEffect, useState } from "react";
import container from "@/core/Container"
import { WsSocket } from "../../core/initSocket"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = container.get(WsSocket);

    const initSocket = async () => {
      try {
        await socket.connect();
        setIsConnected(true);
      } catch (error) {
        console.error("Socket connection failed:", error);
      }
    };

    initSocket();

    // Опціонально: cleanup функція для відключення при розмонтуванні
    return () => {
      // socket.disconnect(); 
    };
  }, []); // Порожній масив: виконується 1 раз при завантаженні сторінки

  // Ви можете показувати лоадер, поки сокет підключається
  if (!isConnected) {
    return <div>Connecting to services...</div>;
  }

  return (
    <>
    
      {children}
    </>
  );
}
