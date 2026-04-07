import { inject } from "inversify";
import { HTTPMethod } from "../type";
import URLEnum from "../URLEnum";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";

export class LogoutRequest extends NetworkRequest<void, void, void> {
  withCSRF: boolean = false;
  method: HTTPMethod = "PUT";
  authorized: boolean = true;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: void): ISubRequestData {
    return {
      init: {},
      url: new URL(URLEnum.LOGOUT),
    };
  }
  onSuccess(data: void): void | Promise<void> {
    this.userState.clearUserData();
  }
}
