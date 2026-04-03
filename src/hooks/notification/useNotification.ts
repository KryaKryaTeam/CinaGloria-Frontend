import container from "@/core/Container";
import { INotification } from "@/core/domain/entity/Notification";
import ReadedRequest from "@/core/requests/network/ReadedRequest.request";
import NotificationStore from "@/state/NotificationStore";
import NotificationStatus from "@/core/domain/entity/NotificationType.enum";
import { UserState } from "@/state/UserState";
import OldNotificationPageRequest from "@/core/requests/network/OldNotificationPage.request";

interface IUseNotification {
  read: (id: string) => Promise<void>;
  readAll: () => Promise<void>;
  get: () => INotification[];
  getOld: () => Promise<INotification[]>;
  shouldPlayAnimation: boolean;
  animationPlayed: () => void;
}

const useNotification = (): IUseNotification => {
  const requestReaded = container.get(ReadedRequest);
  const requestLoadOld = container.get(OldNotificationPageRequest);
  const store = container.get(NotificationStore);
  const userStore = container.get(UserState);
  const actorId = userStore.User?.id ?? "";

  const read = async (id: string) => {
    if (!actorId && process.env.NODE_ENV === "production") {
      throw new Error("User ID is required to read notifications");
    }

    store.readById(
      store.notificationsList.findIndex((n) => n.id === id),
      actorId,
    );
    await requestReaded.execute(id.toString());
  };

  const readAll = async () => {
    if (!actorId) {
      throw new Error("User ID is required to read notifications");
    }
    const unreadedIds = store.unreadNotificationIds;
    if (unreadedIds.length === 0) return;
    store.readAll(actorId);
    try {
      await Promise.all(
        unreadedIds.map(async (id) => {
          await requestReaded.execute(id);
        }),
      );
    } catch (error) {
      console.error("Failed to mark all as read on server:", error);
    }
  };

  const getOld = async (): Promise<INotification[]> => {
    if (!store.notificationsIsFetched) {
      await requestLoadOld.execute(0);
      store.fetched();
    }
    return store.notificationsList;
  };

  const get = (): INotification[] => {
    return store.notificationsList;
  };

  const animationPlayed = () => {
    store.animationPlayed();
  };

  return {
    read,
    readAll,
    get,
    getOld,
    shouldPlayAnimation: store.shouldPlayAnimation,
    animationPlayed,
  };
};

export default useNotification;
