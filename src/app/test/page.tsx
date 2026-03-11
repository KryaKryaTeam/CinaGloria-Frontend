"use client";
import container from "@/core/Container";
import Email from "@/core/domain/value-object/Email";
import Password from "@/core/domain/value-object/Password";
import JWTChangeRequest from "@/core/network/requests/JWTRequest";
import { WsSocket } from "@/core/network/socket/initSocket";
import WaveBackground from "@/ui/backgrounds/WaveBackground";
import { Button } from "@/ui/button";
import SecondDataForm from "@/ui/widgets/auth/SecondDataForm";
export default function TestPage() {
  const aboba = () => {
    const service = container.get(JWTChangeRequest);
    service.execute({
      email: new Email("example@localhost.com"),
      password: new Password("123Ac&44"),
    });
  };

  const socket = container.get(WsSocket);

  return <WaveBackground />;
}
