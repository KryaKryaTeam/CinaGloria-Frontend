"use client";
import container from "@/core/Container";
import NotificationStatus from "@/core/domain/entity/NotificationType.enum";
import Email from "@/core/domain/value-object/Email";
import Password from "@/core/domain/value-object/Password";
import JWTChangeRequest from "@/core/network/requests/JWTRequest";
import { WsSocket } from "@/core/network/socket/initSocket";
import ReadedRequest from "@/core/requests/network/ReadedRequest.request";
import WaveBackground from "@/ui/backgrounds/WaveBackground";
import { Button } from "@/ui/button";
import { NotificationWidget } from "@/ui/component/NotificationWidget";
import SecondDataForm from "@/ui/widgets/auth/SecondDataForm";

export default function TestPage() {
  const service = container.get(ReadedRequest)
  const aboba = async () => {
    await service.execute()
  }
  return (
    <>
      <NotificationWidget notification={aboba} />
    </>
  )
}
