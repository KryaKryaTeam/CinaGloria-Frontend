import type { INotification } from "@/core/domain/entity/Notification";
import { injectable } from "inversify";
import { action, observable, makeObservable, computed, reaction } from "mobx";
import { Notification } from "@/core/domain/entity/Notification";
import NotificationStatus from "@/core/domain/entity/NotificationType.enum";

@injectable()
export default class NotificationStore {
  @observable notifications: Notification[] = [];
  @observable private unreadNotificationCount: number = 0;
  @observable notificationsIsFetched: boolean = false;
  @observable shouldPlayAnimation: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action animationPlayed() {
    this.shouldPlayAnimation = false;
  }

  @action
  addNew(notification: INotification) {
    this.notifications.unshift(new Notification({ ...notification }));
    this.unreadNotificationCount += 1;
    this.shouldPlayAnimation = true;
  }

  @action
  addOld(data: Array<INotification>) {
    this.notifications = data.map((n) => new Notification(n));

    this.unreadNotificationCount = this.notifications.filter(
      (n) => n.status !== NotificationStatus.readed,
    ).length;
  }

  @action fetched() {
    this.notificationsIsFetched = true;
  }

  @action
  async readById(id: string) {
    const notification = this.notifications.find((a) => a.id == id);

    console.log(notification);

    if (!notification || notification.status === NotificationStatus.readed) {
      return;
    }

    notification.markAsRead();
    if (this.unreadNotificationCount > 0) {
      this.unreadNotificationCount -= 1;
    }
  }

  @action
  async readAll() {
    const unreadList = this.notifications.filter(
      (n) => n.status !== NotificationStatus.readed,
    );

    console.log(unreadList);

    this.unreadNotificationCount = 0;
    if (unreadList.length === 0) return;

    unreadList.map((notification) => notification.markAsRead());
  }

  @computed
  get unreadNotificationIds(): string[] {
    return this.notifications
      .filter((n) => n.status !== NotificationStatus.readed)
      .map((n) => n.id);
  }

  @computed
  get haveUnreadedNotifications() {
    return this.notifications.some(
      (a) => a.status == NotificationStatus.sended,
    );
  }
}
