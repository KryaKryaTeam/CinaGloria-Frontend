import { inject } from "inversify";
import { HTTPMethod } from "../../type";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";
import URLEnum from "../../URLEnum";

export interface ICompetitionSettings {
  competitionId: string;
  showRoundsOneByOne: boolean;
  maxTeamMembers: number;
  minTeamMembers: number;
  maxTeams: number;
}

export class UpdateSettingRequest extends NetworkRequest<
  ICompetitionSettings,
  void,
  void
> {
  authorized: boolean = true;
  method: HTTPMethod = "PATCH";
  protected showProgressInToast: boolean = true;
  withCSRF: boolean = false;
  mockOutputData: void | undefined;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: ICompetitionSettings): ISubRequestData {
    return {
      init: {
        body: JSON.stringify({
          settings: {
            showRoundsOneByOne: data.showRoundsOneByOne,
            maxTeamMembers: data.maxTeamMembers,
            minTeamMembers: data.minTeamMembers,
            maxTeams: data.maxTeams,
          },
        }),
      },
      url: new URL(URLEnum.COMPETITION_SETTINGS + data.competitionId),
    };
  }
  onSuccess(data: void): void | Promise<void> {}
}
