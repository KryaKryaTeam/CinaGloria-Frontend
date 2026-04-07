import container, { TYPES } from "@/core/Container";
import { HTTPMethod } from "../type";
import URLEnum from "../URLEnum";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import NotificationStore from "@/state/NotificationStore";
import { inject } from "inversify";
import { UserState } from "@/state/UserState";

export default class ReadAllRequest extends NetworkRequest<void, void, void> {
  method: HTTPMethod = "PUT";
  authorized: boolean = true;
  withCSRF: boolean = false;

  constructor(
    @inject(TYPES.UserState) userState: UserState,
    @inject(TYPES.NotificationStore)
    private readonly _notificationStore: NotificationStore,
  ) {
    super(userState);
  }

  mapData(data: void): ISubRequestData {
    return {
      init: {},
      url: new URL(URLEnum.NOTIFICATION_ALL),
    };
  }
  onSuccess(data: void): void | Promise<void> {
    this._notificationStore.readAll();
  }
}
