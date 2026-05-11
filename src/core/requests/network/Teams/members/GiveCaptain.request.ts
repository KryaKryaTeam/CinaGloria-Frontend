import { inject, injectable } from "inversify";

import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";
import { ISubRequestData, NetworkRequest } from "../../NetworkRequest";
import { HTTPMethod } from "@/core/requests/type";
import URLEnum from "@/core/requests/URLEnum";

// ============ Types ============

export interface UpdateTeamCaptainRequestData {
  teamId: string;
  captain: string;
}

// ============ Request ============

@injectable()
export default class GiveCaptainRequest extends NetworkRequest<
  UpdateTeamCaptainRequestData,
  void,
  void
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "PATCH";
  authorized: boolean = true;
  mockOutputData: void = undefined;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: UpdateTeamCaptainRequestData): ISubRequestData {
    return {
      url: new URL(URLEnum.TEAMS + `${data.teamId}/captain`),
      init: {
        body: {
          captain: data.captain,
        },
      },
    };
  }

  onSuccess(): void {
    return;
  }

  protected onError(error: Error): never {
    throw error;
  }
}