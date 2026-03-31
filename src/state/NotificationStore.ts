\import type { INotification } from "@/core/domain/entity/Notification";
import { injectable } from "inversify";
import { action, observable, makeObservable } from "mobx";
import { Notification } from "@/core/domain/entity/Notification";
import { NotificationAggregate } from "@/core/domain/aggregate/NotificationAggregate";
import container from "@/core/Container";
import NotificationStatus from "@/core/domain/entity/NotificationType.enum";

@injectable()
export default class NotificationStore {
    
    @observable private notifications: Notification[] = [];
    @observable private unreadNotificationCount: number = 0;

    constructor() {
        makeObservable(this);
    }


    @action
    addNew(notification: INotification) {
        this.notifications.push(new Notification({ ...notification }));
        this.unreadNotificationCount += 1;
    }

    @action
    addOld(data: Array<INotification>) {
        this.notifications = data.map(n => new Notification(n));
        
        this.unreadNotificationCount = this.notifications.filter(
            n => n.status !== NotificationStatus.readed
        ).length;
    }


    @action
    async readByPos(index: number, actorId: string) {
        const notification = this.notifications[index];

        if (!notification || notification.status === NotificationStatus.readed) {
            return;
        }

        notification.markAsRead(actorId);
        if(this.unreadNotificationCount > 0) {
            this.unreadNotificationCount -= 1;
        }
    }

    @action
    async readAll(actorId: string) {
        const unreadList = this.notifications.filter(
            (n) => n.status !== NotificationStatus.readed
        );

        this.unreadNotificationCount = 0;

        if (unreadList.length === 0) return;

                unreadList.map((notification) => 
                    notification.markAsRead(actorId)
                )
        } 
        
    @action
    get unreadNotificationIds(): string[] {
        return this.notifications
            .filter((n) => n.status !== NotificationStatus.readed)
            .map((n) => n.id);
    }
    @action
    get notificationsList(): INotification[] {  
        return this.notifications.map((n) => n.Object);
    }
}