import { INotification } from "@/core/domain/entity/Notification";
import NotificationStatus from "@/core/domain/entity/NotificationType.enum";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import { HTTPMethod } from "../type";
import URLEnum from "../URLEnum";
import NotificationStore from "@/state/NotificationStore";
import { inject } from "inversify";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";

export default class OldNotificationPageRequest extends NetworkRequest<
  number,
  void,
  INotification[]
> {
  withCSRF: boolean = false;
  authorized: boolean = true;
  method: HTTPMethod = "GET";
  mockOutputData: INotification[] = [
    {
      id: "1",
      title: "New message from support",
      content: "Your application has been received and is now under review.",
      from: "support@cidagloria.com",
      to: "user-123",
      status: NotificationStatus.sended,
      targets: ["dashboard", "email"],
      createdAt: new Date("2026-04-18T09:30:00Z"),
      read: false,
    },
    {
      id: "2",
      title: "Competition reminder",
      content:
        "The registration deadline is tomorrow at 23:59. Don’t forget to submit your entry.",
      from: "noreply@cidagloria.com",
      to: "user-123",
      status: NotificationStatus.sended,
      targets: ["dashboard"],
      createdAt: new Date("2026-04-17T14:45:00Z"),
      read: false,
    },
    {
      id: "3",
      title: "Account update successful",
      content: "Your profile information has been updated successfully.",
      from: "security@cidagloria.com",
      to: "user-123",
      status: NotificationStatus.readed,
      targets: ["dashboard", "profile"],
      createdAt: new Date("2026-04-16T08:15:00Z"),
      read: true,
    },
  ];
  constructor(
    @inject(TYPES.NotificationStore)
    private readonly notificationStore: NotificationStore,
    @inject(TYPES.UserState)
    readonly userState: UserState,
  ) {
    super(userState);
  }

  mapData(data: number): ISubRequestData {
    return {
      url: new URL(`${URLEnum.NOTIFICATION_PAGE}/${data}`),
      init: {},
    };
  }
  onSuccess(data: INotification[]): void | Promise<void> {
    this.notificationStore.addOld(data);
  }
}
