

// ============ Types ============

import { inject, injectable } from "inversify";
import { ISubRequestData, NetworkRequest } from "../../NetworkRequest";
import { HTTPMethod } from "@/core/requests/type";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";
import URLEnum from "@/core/requests/URLEnum";

export interface DeleteTeamMemberRequestData {
  teamId: string;
  memberId: string;
}

// ============ Request ============

@injectable()
export default class DeleteTeamMemberRequest extends NetworkRequest<
  DeleteTeamMemberRequestData,
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

  mapData(data: DeleteTeamMemberRequestData): ISubRequestData {
    return {
      url: new URL(URLEnum.TEAMS + `${data.teamId}/members/${data.memberId}`),
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