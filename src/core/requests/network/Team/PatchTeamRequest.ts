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

export class PatchTeamRequest extends NetworkRequest<
  Partial<ICreateTeam> & { teamId: string },
  void,
  void
> {
  authorized: boolean = true;
  method: HTTPMethod = "PATCH";
  mockOutputData: undefined;
  protected showProgressInToast: boolean = true;
  protected toastConfig: { loading: string; success: string; error: string } = {
    loading: "Loading...",
    error: "Failed to update team",
    success: "Team updated",
  };
  withCSRF: boolean = false;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: Partial<ICreateTeam> & { teamId: string }): ISubRequestData {
    return {
      init: {
        body: JSON.stringify({ ...data }),
      },
      url: new URL(URLEnum.PATCH_TEAM + data.teamId),
    };
  }
  onSuccess(data: void): void | Promise<void> {}
}
