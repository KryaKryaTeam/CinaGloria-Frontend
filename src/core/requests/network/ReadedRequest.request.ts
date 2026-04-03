import { inject, injectable } from "inversify";
import URLEnum from "../URLEnum";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import { UserState } from "@/state/UserState";
import { HTTPMethod } from "../type";
import NotificationStore from "@/state/NotificationStore";

@injectable()
export default class ReadedRequest extends NetworkRequest<
  string,
  true,
  { notificationId: string }
> {
  withCSRF: boolean = false;
  authorized: boolean = true;
  method: HTTPMethod = "PUT";
  constructor(
    @inject(UserState) userState: UserState,
    @inject(NotificationStore)
    private readonly _notificationStore: NotificationStore,
  ) {
    super(userState);
  }
  mapData(data: string): ISubRequestData {
    return {
      url: new URL(`${URLEnum.NOTIFICATION}/${data}`),
      init: {},
    };
  }
  onSuccess(data: { notificationId: string }): true | Promise<true> {
    this._notificationStore.readById(data.notificationId);
    return true;
  }
}
