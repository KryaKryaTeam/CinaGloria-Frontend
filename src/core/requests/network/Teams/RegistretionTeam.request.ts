import { inject, injectable } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";

// ============ Types ============

export interface TeamRegistrationRequestData {
  teamId: string;
  competitionId: string;
}

// ============ Request ============

@injectable()
export default class TeamRegistrationRequest extends NetworkRequest<
  TeamRegistrationRequestData,
  void,
  void
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "POST";
  authorized: boolean = true;
  mockOutputData: void = undefined;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: TeamRegistrationRequestData): ISubRequestData {
    return {
      url: new URL(URLEnum.TEAMS + `${data.teamId}/registration`),
      init: {
        body: {
          competitionId: data.competitionId,
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