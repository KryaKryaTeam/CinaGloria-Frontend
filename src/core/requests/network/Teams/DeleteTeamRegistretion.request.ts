import { inject, injectable } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";

// ============ Types ============

export interface DeleteTeamRegistrationRequestData {
  teamId: string;
}

// ============ Request ============

@injectable()
export default class DeleteTeamRegistrationRequest extends NetworkRequest<
  DeleteTeamRegistrationRequestData,
  boolean,
  void
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "DELETE";
  authorized: boolean = true;
  mockOutputData: void = undefined;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: DeleteTeamRegistrationRequestData): ISubRequestData {
    return {
      url: new URL(URLEnum.TEAMS + `${data.teamId}/registration`),
      init: {},
    };
  }

  onSuccess(): boolean {
    return true;
  }

  protected onError(error: Error): never {
    throw error;
  }
}