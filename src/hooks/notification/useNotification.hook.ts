import { useMemo } from "react";
import container, { TYPES } from "@/core/Container";
import ReadedRequest from "@/core/requests/network/ReadedRequest.request";
import NotificationStore from "@/state/NotificationStore";
import ReadAllRequest from "@/core/requests/network/ReadAllRequest.request";

const useNotification = () => {
  const requestReaded = useMemo(
    () => container.get<ReadedRequest>(TYPES.ReadedRequest),
    [],
  );
  const requestReadAll = useMemo(
    () => container.get<ReadAllRequest>(TYPES.ReadAllRequest),
    [],
  );
  const store = useMemo(
    () => container.get<NotificationStore>(TYPES.NotificationStore),
    [],
  );

  return {
    store,
    read: async (id: string) => {
      await requestReaded.execute(id.toString());
    },
    readAll: async () => {
      await requestReadAll.execute();
    },
    animationPlayed: () => store.animationPlayed(),
    get notifications() {
      return store.notifications;
    },
    get shouldPlayAnimation() {
      return store.shouldPlayAnimation;
    },
    get haveUnreadedNotifications() {
      return store.haveUnreadedNotifications;
    },
  };
};

export default useNotification;
