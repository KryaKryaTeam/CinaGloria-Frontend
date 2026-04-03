import container from "@/core/Container";
import { Notification } from "@/core/domain/entity/Notification";
import ReadedRequest from "@/core/requests/network/ReadedRequest.request";
import NotificationStore from "@/state/NotificationStore";
import OldNotificationPageRequest from "@/core/requests/network/OldNotificationPage.request";
import ReadAllRequest from "@/core/requests/network/ReadAllRequest.request";

// interface IUseNotification {
//   read: (id: string) => Promise<void>;
//   readAll: () => Promise<void>;
//   get: () => Notification[];
//   getOld: () => Promise<Notification[]>;
//   shouldPlayAnimation: boolean;
//   animationPlayed: () => void;
// }

const useNotification = () => {
  const requestReaded = container.get(ReadedRequest);
  const requestReadAll = container.get(ReadAllRequest);
  const store = container.get(NotificationStore);

  const read = async (id: string) => {
    await requestReaded.execute(id.toString());
  };

  const readAll = async () => {
    await requestReadAll.execute();
  };

  const animationPlayed = () => {
    store.animationPlayed();
  };

  return {
    ...store,
    readAll,
    read,
    animationPlayed,
  };
};

export default useNotification;
