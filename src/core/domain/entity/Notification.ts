import { Root } from "../aggregate/Root";
import { Event } from "../event/Event";
import ReadedEvent from "../event/Readed.event";
import NotificationStatus from "./NotificationType.enum";

export interface INotification {
  id: string;
  title: string;
  content: string;
  from: string;
  to: string;
  status: NotificationStatus;
  targets: string[];
  createdAt: Date;
  read: boolean;
}

export class Notification {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _content: string;
  private readonly _from: string;
  private readonly _to: string;
  private _status: NotificationStatus;
  private readonly _targets: string[];
  private readonly _createdAt: Date;

  constructor(props: INotification) {
    this._id = props.id || `notification-${Math.random() * 10000}`;
    this._title = props.title;
    this._content = props.content;
    this._from = props.from;
    this._to = props.to;
    this._status = props.status;
    this._targets = props.targets;
    this._createdAt = new Date(props.createdAt);
  }

  get id() {
    return this._id;
  }
  get status() {
    return this._status;
  }
  get to() {
    return this._to;
  }
  get content() {
    return this._content;
  }
  get title() {
    return this._title;
  }
  get from() {
    return this._from;
  }
  get createdAt() {
    return this._createdAt;
  }
  public markAsRead(): void {
    if (this._status === NotificationStatus.readed) {
      return;
    }

    this._status = NotificationStatus.readed;
  }

  get read(): boolean {
    return this.status === NotificationStatus.readed;
  }
}
