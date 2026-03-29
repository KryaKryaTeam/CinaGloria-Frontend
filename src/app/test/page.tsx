"use client";
import container from "@/core/Container";
import Email from "@/core/domain/value-object/Email";
import Password from "@/core/domain/value-object/Password";
import JWTChangeRequest from "@/core/network/requests/JWTRequest";
import { WsSocket } from "@/core/network/socket/initSocket";
import AnotherUserDataRequest from "@/core/requests/network/AnotherUserData.request";
import WaveBackground from "@/ui/backgrounds/WaveBackground";
import { Button } from "@/ui/button";
import SecondDataForm from "@/ui/widgets/auth/SecondDataForm";
export default function TestPage() {
  const req = new AnotherUserDataRequest();

  return <WaveBackground />;
}
