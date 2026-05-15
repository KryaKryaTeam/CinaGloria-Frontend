import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import { HTTPMethod } from "../type";
import URLEnum from "../URLEnum";
import { inject } from "inversify";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";

interface IInput {
  url: string;
}

export class ChangeAvatarRequest extends NetworkRequest<IInput, void, void> {
  authorized: boolean = true;
  method: HTTPMethod = "PATCH";
  withCSRF: boolean = false;
  mockOutputData: void | undefined;

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: IInput): ISubRequestData {
    return {
      init: {
        body: {
          avatar: data.url,
        },
      },
      url: new URL(URLEnum.CHANGE_USER_AVATAR),
    };
  }
  onSuccess(data: void): void | Promise<void> {}
}
