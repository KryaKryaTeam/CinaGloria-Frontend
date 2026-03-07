import { UserState } from "@/state/UserState";
import URLEnum from "../URLEnum";
import Request, { ISubRequestData } from "./Request";
import { HTTPMethod } from "./type";
import { inject } from "inversify";

export class GetWsTokenRequest extends Request<
  undefined,
  { token: string },
  { token: string }
> {
  authorized: boolean = true;
  withCSRF: boolean = false;
  method: HTTPMethod = "GET";
  mapData(data: undefined): ISubRequestData {
    return {
      url: new URL(URLEnum.GET_WS_TOKEN),
      init: {},
    };
  }

  onSuccess(data: { token: string }): { token: string } {
    return data;
  }

  constructor(@inject(UserState) userState: UserState) {
    super(userState);
  }
}
