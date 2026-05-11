import { inject, injectable } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";

// ============ Types ============

export interface CreateSubmissionRequestData {
  githubURL: string;
  youtubeURL: string;
  relatedRound: string;
}

// ============ Request ============

@injectable()
export default class CreateSubmissionRequest extends NetworkRequest<
  CreateSubmissionRequestData,
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

  mapData(data: CreateSubmissionRequestData): ISubRequestData {
    return {
      url: new URL(URLEnum.SUBMISSION + "create"),
      init: {
        body: {
          githubURL: data.githubURL,
          youtubeURL: data.youtubeURL,
          relatedRound: data.relatedRound,
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