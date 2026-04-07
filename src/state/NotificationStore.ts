import type { INotification } from "@/core/domain/entity/Notification";
import { injectable } from "inversify";
import {
  action,
  observable,
  makeObservable,
  computed,
  autorun,
  trace,
} from "mobx";
import { Notification } from "@/core/domain/entity/Notification";
import NotificationStatus from "@/core/domain/entity/NotificationType.enum";

@injectable()
export default class NotificationStore {
  @observable notifications: Notification[] = [];
  @observable notificationsIsFetched: boolean = false;
  @observable shouldPlayAnimation: boolean = false;

  public id = Math.random();

  @action animationPlayed() {
    this.shouldPlayAnimation = false;
  }

  @action
  addNew(notification: INotification) {
    this.notifications = [
      new Notification({ ...notification }),
      ...this.notifications,
    ];

    this.shouldPlayAnimation = true;
  }

  @action
  addOld(data: Array<INotification>) {
    this.notifications = data.map((n) => new Notification(n));
  }

  @action fetched() {
    this.notificationsIsFetched = true;
  }

  @action
  async readById(id: string) {
    const notification = this.notifications.find((a) => a.id == id);

    if (!notification || notification.status === NotificationStatus.readed) {
      return;
    }
    notification.markAsRead();
  }

  @computed
  get haveUnreadedNotifications() {
    return this.notifications.some(
      (a) => a.status == NotificationStatus.sended,
    );
  }

  @action
  async readAll() {
    const unreadList = this.notifications.filter(
      (n) => n.status !== NotificationStatus.readed,
    );
    unreadList.map((notification) => notification.markAsRead());
  }

  constructor() {
    autorun(() => {
      console.log("Read", this.haveUnreadedNotifications);
    });
    makeObservable(this);
  }
}
