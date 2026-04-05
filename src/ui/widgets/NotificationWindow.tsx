import { INotification } from "@/core/domain/entity/Notification";
import useNotification from "@/hooks/form/useNotification";
import { useEffect, useState } from "react";
import NotificationWidget from "./NotificationWidget";
import NotificationDetailPanel from "./NotificationDetailPanel";
import { observer } from "mobx-react-lite";

export default observer(function NotificationWindow() {
  const { get, read, readAll, getOld } = useNotification();
  const [activeNotificationData, setActiveNotificationData] =
    useState<INotification | null>(null);

  async function handleNotificationClick(notificationId: string) {
    const notificationData = get().find(
      (notification) => notification.id === notificationId,
    );
    setActiveNotificationData(notificationData ?? null);
    await read(notificationId);
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      await getOld();
    };
    fetchNotifications();
  }, [getOld]);

  return (
    <div className="">
      <div>
        {get().map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <NotificationWidget {...notification} />
          </div>
        ))}
      </div>
      <div>
        <NotificationDetailPanel notification={activeNotificationData} />
      </div>
    </div>
  );
});
