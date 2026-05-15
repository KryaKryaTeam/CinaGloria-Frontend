import Team, { ITeamDTO, TeamStatus } from "@/core/domain/entity/Team";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { inject } from "inversify";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";

export interface ITeamFilters {
  name?: string;
  minMembers?: number;
  maxMembers?: number;
  isCaptain?: boolean;
  status?: TeamStatus;
  hasInvites?: boolean;
}
interface GetTeamPageRequestInput {
  page: number;
  options: ITeamFilters;
}

export class GetTeamPageRequest extends NetworkRequest<
  GetTeamPageRequestInput,
  Team[],
  ITeamDTO[]
> {
  authorized: boolean = true;
  method: HTTPMethod = "GET";
  mockOutputData: ITeamDTO[] | undefined;
  withCSRF: boolean = false;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: GetTeamPageRequestInput): ISubRequestData {
    const url = new URL(URLEnum.MY_TEAMS + data.page);
    const searchParams = new URLSearchParams();

    Object.entries(data.options).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });

    url.search = searchParams.toString();

    return {
      init: {},
      url: url,
    };
  }
  onSuccess(data: ITeamDTO[]): Team[] | Promise<Team[]> {
    return data.map((team) => new Team(team));
  }
}
