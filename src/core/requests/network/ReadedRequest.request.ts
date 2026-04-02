import { inject, injectable } from "inversify";
import URLEnum from "../URLEnum";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import { UserState } from "@/state/UserState";
import { HTTPMethod } from "../type";
import NotificationStore from "@/state/NotificationStore";
import { th } from "zod/locales";
@injectable()
export default class ReadedRequest extends NetworkRequest<string, true, void> {
  withCSRF: boolean = false;
  authorized: boolean = true;
  method: HTTPMethod = "PUT";
  private notificationStore: NotificationStore;
  constructor(
    @inject(UserState) userState: UserState,
    @inject(NotificationStore) private _notificationStore: NotificationStore,
  ) {
    super(userState);
    this.notificationStore = _notificationStore;
  }
  mapData(data: string): ISubRequestData {
    return {
      url: new URL(`${URLEnum.NOTIFICATION}${data}`),
      init: {},
    };
  }
  onSuccess(data: void): true | Promise<true> {
    const userId = this.userState.User?.id;
    if (userId) {
      this.notificationStore.readById(0, userId);
    } else {
      throw new Error("User ID is not available in UserState.");
    }
    return true;
  }
}
