import { inject, injectable } from "inversify";
import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";

// ============ Types ============

export interface DeleteSubmissionRequestData {
  id: string;
}

// ============ Request ============

@injectable()
export default class DeleteSubmissionRequest extends NetworkRequest<
  DeleteSubmissionRequestData,
  boolean,
  void
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "DELETE";
  authorized: boolean = true;
  mockOutputData: void = undefined;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: DeleteSubmissionRequestData): ISubRequestData {
    const url = new URL(URLEnum.SUBMISSION + "delete");
    url.searchParams.set("id", data.id);
    return {
      url,
      init: {},
    };
  }

  onSuccess(): boolean {
    return true;
  }

  protected onError(error: Error): never {
    throw error;
  }
}