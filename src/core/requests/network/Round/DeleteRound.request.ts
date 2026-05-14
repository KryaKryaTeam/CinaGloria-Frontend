import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";
import { TYPES } from "@/core/Container.types";
import { inject } from "inversify";
import { UserState } from "@/state/UserState";
import URLEnum from "../../URLEnum";

export class DeleteRoundRequest extends NetworkRequest<string, void, void> {
  authorized: boolean = true;
  method: HTTPMethod = "DELETE";
  mockOutputData: void | undefined;
  protected showProgressInToast: boolean = true;
  protected toastConfig: { loading: string; success: string; error: string } = {
    error: "Failed to delete round",
    loading: "Loading...",
    success: "Round deleted",
  };
  withCSRF: boolean = false;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: string): ISubRequestData {
    return {
      url: new URL(URLEnum.ROUND_DELETE),
      init: {
        body: JSON.stringify({ id: data }),
      },
    };
  }
  onSuccess(data: void): void | Promise<void> {}
}
