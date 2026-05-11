import { inject, injectable } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";

// ============ Types ============

export interface UpdateSubmissionRequestData {
  githubURL?: string;
  youtubeURL?: string;
  relatedRound?: string;
}

// ============ Request ============

@injectable()
export default class UpdateSubmissionRequest extends NetworkRequest<
  UpdateSubmissionRequestData,
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

  mapData(data: UpdateSubmissionRequestData): ISubRequestData {
    return {
      url: new URL(URLEnum.SUBMISSION + "update"),
      init: {
        body: { ...data },
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