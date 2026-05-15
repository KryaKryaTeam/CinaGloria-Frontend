import { inject } from "inversify";
import URLEnum from "../URLEnum";
import { HTTPMethod } from "../type";
import { UserState } from "@/state/UserState";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import { TYPES } from "@/core/Container.types";

export class RequestConfirm extends NetworkRequest<
  { requestId: string; code: string },
  void,
  { accessToken: string }
> {
  method: HTTPMethod = "POST";
  withCSRF: boolean = true;
  authorized: boolean = false;
  mockOutputData: { accessToken: string } = {
    accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2NrLXVzZXItaWQifQ.mock",
  };
  constructor(@inject(TYPES.UserState) userState: UserState) {
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
