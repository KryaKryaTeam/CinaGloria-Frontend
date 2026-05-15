import Team, { ITeamDTO } from "@/core/domain/entity/Team";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";
import { inject } from "inversify";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";
import URLEnum from "../../URLEnum";

interface ICreateTeam {
  name: string;
  avatar: string;
  banner: string;
}

export class CreateTeamRequest extends NetworkRequest<
  ICreateTeam,
  Team,
  ITeamDTO
> {
  authorized: boolean = true;
  method: HTTPMethod = "POST";
  mockOutputData: ITeamDTO | undefined;
  protected showProgressInToast: boolean = true;
  protected toastConfig: { loading: string; success: string; error: string } = {
    loading: "Loading...",
    error: "Failed to create team",
    success: "Team created",
  };
  withCSRF: boolean = false;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: ICreateTeam): ISubRequestData {
    return {
      init: {
        body: JSON.stringify({ ...data }),
      },
      url: new URL(URLEnum.CREATE_TEAM),
    };
  }
  onSuccess(data: ITeamDTO): Team | Promise<Team> {
    return new Team(data);
  }
}
