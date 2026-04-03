import { INotification } from "@/core/domain/entity/Notification";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import { HTTPMethod } from "../type";
import URLEnum from "../URLEnum";
import NotificationStore from "@/state/NotificationStore";
import { inject } from "inversify";
import { UserState } from "@/state/UserState";

export default class OldNotificationPageRequest extends NetworkRequest<
  number,
  void,
  INotification[]
> {
  withCSRF: boolean = false;
  authorized: boolean = true;
  method: HTTPMethod = "GET";

  constructor(
    @inject(NotificationStore)
    private readonly notificationStore: NotificationStore,
    @inject(UserState)
    readonly userState: UserState, 
  ) {
    super(userState);
  }

  mapData(data: number): ISubRequestData {
    return {
      url: new URL(`${URLEnum.NOTIFICATION}${data}`),
      init: {},
    };
  }
  onSuccess(data: INotification[]): void | Promise<void> {
    this.notificationStore.addOld(data)
  }
}
