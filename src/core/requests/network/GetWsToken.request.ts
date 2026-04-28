import { inject } from "inversify";
import { HTTPMethod } from "../type";
import URLEnum from "../URLEnum";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";

export class GetWsTokenRequest extends NetworkRequest<
  undefined,
  { token: string },
  { token: string }
> {
  authorized: boolean = true;
  withCSRF: boolean = false;
  method: HTTPMethod = "GET";
  mockOutputData: { token: string } = { token: "mocked_token" };
  mapData(data: undefined): ISubRequestData {
    return {
      url: new URL(URLEnum.GET_WS_TOKEN),
      init: {},
    };
  }

  onSuccess(data: { token: string }): { token: string } {
    return data;
  }

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }
}

