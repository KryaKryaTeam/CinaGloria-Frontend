import { inject, injectable } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";

// ============ Types ============

export interface DeleteTeamRequestData {
  teamId: string;
}

// ============ Request ============

@injectable()
export default class DeleteTeamRequest extends NetworkRequest<
  DeleteTeamRequestData,
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

  mapData(data: DeleteTeamRequestData): ISubRequestData {
    return {
      url: new URL(URLEnum.TEAMS + data.teamId),
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