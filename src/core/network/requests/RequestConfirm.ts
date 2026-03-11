import { inject } from "inversify";
import URLEnum from "../URLEnum";
import { ISubRequestData, Request } from "./Request";
import { HTTPMethod } from "./type";
import { UserState } from "@/state/UserState";

export class RequestConfirm extends Request<
  { requestId: string; code: string },
  void,
  { accessToken: string }
> {
  method: HTTPMethod = "POST";
  withCSRF: boolean = true;
  authorized: boolean = false;
  constructor(@inject(UserState) userState: UserState) {
    super(userState);
  }
  mapData(data: { requestId: string; code: string }): ISubRequestData {
    return {
      init: {
        body: JSON.stringify({ requestId: data.requestId, code: data.code }),
      },
      url: new URL(URLEnum.CONFIRM),
    };
  }
  onSuccess(data: { accessToken: string }): void | Promise<void> {
    this.setAuth(data.accessToken);
    return;
  }
}
