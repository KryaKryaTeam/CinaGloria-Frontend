"use client";

import NotificationStatus from "@/core/domain/entity/NotificationType.enum";
import NotificationWidget from "@/ui/widgets/NotificationWidget";

export default function TestPage() {
  return (
    <>
      <NotificationWidget
        id="1"
        status={NotificationStatus.readed}
        title="Test Notification"
        from="test@example.com"
        to="user@example.com"
        content="This is a test notification."
        targets={[]}
        createdAt={new Date()}
      />
    </>
  );
}
