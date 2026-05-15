import { inject } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";

export class PublishCompetitionRequest extends NetworkRequest<
  string,
  void,
  void
> {
  authorized: boolean = true;
  withCSRF: boolean = false;
  method: HTTPMethod = "PUT";
  protected showProgressInToast: boolean = true;
  mockOutputData: void | undefined;
  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }
  mapData(data: string): ISubRequestData {
    return {
      init: {},
      url: new URL(URLEnum.COMPETITION_PUBLISH + data),
    };
  }
  onSuccess(data: void): void | Promise<void> {}
}
