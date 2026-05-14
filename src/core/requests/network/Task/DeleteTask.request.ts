import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import { HTTPMethod } from "../../type";
import { TYPES } from "@/core/Container.types";
import { inject } from "inversify";
import { UserState } from "@/state/UserState";
import URLEnum from "../../URLEnum";

export class DeleteTaskRequest extends NetworkRequest<string, void, void> {
  authorized: boolean = true;
  method: HTTPMethod = "DELETE";
  mockOutputData: void | undefined;
  protected showProgressInToast: boolean = true;
  protected toastConfig: { loading: string; success: string; error: string } = {
    error: "Failed to delete task",
    loading: "Loading...",
    success: "Task deleted",
  };
  withCSRF: boolean = false;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: string): ISubRequestData {
    return {
      url: new URL(URLEnum.TASK_DELETE + "/" + data),
      init: {},
    };
  }
  onSuccess(data: void): void | Promise<void> {}
}
