import { inject, injectable } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";

// ============ Types ============

export interface CreateScoreRequestData {
  score: number;
  team: string;
  task: string;
}

// ============ Request ============

@injectable()
export default class CreateScoreRequest extends NetworkRequest<
  CreateScoreRequestData,
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

  mapData(data: CreateScoreRequestData): ISubRequestData {
    return {
      url: new URL(URLEnum.SCORE + "create"),
      init: {
        body: {
          score: data.score,
          team: data.team,
          task: data.task,
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