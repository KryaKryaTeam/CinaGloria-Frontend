import container from "@/core/Container";
import { INotification } from "@/core/domain/entity/Notification";
import ReadedRequest from "@/core/requests/network/ReadedRequest.request";
import NotificationStore from "@/state/NotificationStore";
interface IUseNotification {
    read: (id: string) => Promise<void>;
    readAll: () => Promise<void>;
    get: () => INotification[];
}
const useNotification = (): IUseNotification => {
    const requestReaded = container.get(ReadedRequest);
    const store = container.get(NotificationStore)
    const read = async (id: string) => {
        await requestReaded.execute(id);
    };
    const readAll = async () => { 
        const unreadedIds: string[] = store.unreadNotificationIds;
        if (unreadedIds.length === 0) return;
        try {
            for (const id of unreadedIds) { 
                await requestReaded.execute(id);
            }
        } catch (error) { 
            console.error("Failed to mark all as read on server:", error);
        }
    }
    const get = (): INotification[] => {
        return store.notificationsList;
    }
    return { read, readAll, get };
};