
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";
import { ISubRequestData, NetworkRequest } from "../network/NetworkRequest";
import { inject, injectable } from "inversify";
import { HTTPMethod } from "../type";
import URLEnum from "../URLEnum";

// ============ Types ============

export interface CreateRoundReviewRequestData {
  summary: number;
  description: string;
  byJury: string;
  round: string;
  relatedScores: string[];
  submission: string;
}

// ============ Request ============

@injectable()
export default class CreateRoundReviewRequest extends NetworkRequest<
  CreateRoundReviewRequestData,
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

  mapData(data: CreateRoundReviewRequestData): ISubRequestData {
    return {
      url: new URL(URLEnum.ROUND_REVIEW + "create"),
      init: {
        body: {
          summary: data.summary,
          description: data.description,
          byJury: data.byJury,
          round: data.round,
          relatedScores: data.relatedScores,
          submission: data.submission,
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