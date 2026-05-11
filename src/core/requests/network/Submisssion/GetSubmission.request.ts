import { inject, injectable } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";

// ============ Types ============

export interface FindSubmissionRequestData {
  id: string;
}

export type SubmissionEntity = Record<string, unknown>;

// ============ Request ============

@injectable()
export default class FindSubmissionRequest extends NetworkRequest<
  FindSubmissionRequestData,
  SubmissionEntity,
  SubmissionEntity
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "GET";
  authorized: boolean = true;
  mockOutputData: SubmissionEntity = {};

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: FindSubmissionRequestData): ISubRequestData {
    const url = new URL(URLEnum.SUBMISSION + "find");
    url.searchParams.set("id", data.id);
    return {
      url,
      init: {},
    };
  }

  onSuccess(data: SubmissionEntity): SubmissionEntity {
    return data;
  }

  protected onError(error: Error): never {
    throw error;
  }
}