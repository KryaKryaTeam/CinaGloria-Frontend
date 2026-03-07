"use client";
import container from "@/core/Container";
import Email from "@/core/domain/value-object/Email";
import Password from "@/core/domain/value-object/Password";
import JWTChangeRequest from "@/core/network/requests/JWTRequest";
import { WsSocket } from "@/core/network/socket/initSocket";
import { Button } from "@/ui/button";
export default function TestPage() {
  const aboba = () => {
    const service = container.get(JWTChangeRequest);
    service.execute({
      email: new Email("example@localhost.com"),
      password: new Password("123Ac&44"),
    });
  };

  const socket = container.get(WsSocket);

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page for development purposes.</p>
      <Button onClick={() => aboba()}>Login</Button>
      <Button onClick={() => socket.connect()}>Connect to ws</Button>
    </div>
  );
}
