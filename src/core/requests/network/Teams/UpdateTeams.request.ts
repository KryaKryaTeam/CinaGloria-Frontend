import { inject, injectable } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";

// ============ Types ============

export interface UpdateTeamRequestData {
  teamId: string;
  avatar?: string;
  banner?: string;
  name?: string;
}

// ============ Request ============

@injectable()
export default class UpdateTeamRequest extends NetworkRequest<
  UpdateTeamRequestData,
  boolean,
  void
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "PATCH";
  authorized: boolean = true;
  mockOutputData: void = undefined;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: UpdateTeamRequestData): ISubRequestData {
    const { teamId, ...body } = data;
    return {
      url: new URL(URLEnum.TEAMS + teamId),
      init: {
        body,
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