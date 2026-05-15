import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import { HTTPMethod } from "../type";
import URLEnum from "../URLEnum";
import { inject } from "inversify";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";

interface IInput {
  username: string;
}

export class ChangeUsernameRequest extends NetworkRequest<IInput, void, void> {
  mockOutputData: void | undefined;
  authorized: boolean = true;
  method: HTTPMethod = "PATCH";
  withCSRF: boolean = false;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: IInput): ISubRequestData {
    return {
      init: {
        body: {
          username: data.username,
        },
      },
      url: new URL(URLEnum.CHANGE_USERNAME),
    };
  }
  onSuccess(data: void): void | Promise<void> {}
}
