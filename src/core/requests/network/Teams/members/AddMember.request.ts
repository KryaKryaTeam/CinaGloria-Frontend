import { inject, injectable } from "inversify";

import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";
import { ISubRequestData, NetworkRequest } from "../../NetworkRequest";
import { HTTPMethod } from "@/core/requests/type";
import URLEnum from "@/core/requests/URLEnum";

// ============ Types ============

export interface AddTeamMemberRequestData {
  teamId: string;
  memberId: string;
}

// ============ Request ============

@injectable()
export default class AddMemberRequest extends NetworkRequest<
  AddTeamMemberRequestData,
  boolean,
  void
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "POST";
  authorized: boolean = true;
  mockOutputData: void = undefined;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: AddTeamMemberRequestData): ISubRequestData {
    return {
      url: new URL(URLEnum.TEAMS + `${data.teamId}/members`),
      init: {
        body: {
          memberId: data.memberId,
        },
      },
    };
  }

  onSuccess(): boolean {
    return true;
  }

  protected onError(error: Error): never {
    throw error;
  }
}