import URLEnum from "../URLEnum";
import { HTTPMethod } from "../type";
import { UserState } from "@/state/UserState";
import { inject } from "inversify";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";

interface LoginWithGoogleInput {
  code: string;
}
interface LoginWithGoogleOutput {
  accessToken: string;
  userExistsBefore: boolean;
}

export class RequestLoginWithGoogle extends NetworkRequest<
  LoginWithGoogleInput,
  boolean,
  LoginWithGoogleOutput
> {
  authorized: boolean = false;
  withCSRF: boolean = true;
  method: HTTPMethod = "POST";

  constructor(@inject(UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: LoginWithGoogleInput): ISubRequestData {
    return {
      init: {
        body: JSON.stringify({
          code: data.code,
        }),
      },
      url: new URL(URLEnum.LOGIN_GOOGLE),
    };
  }

  onSuccess(data: LoginWithGoogleOutput): boolean | Promise<boolean> {
    this.setAuth(data.accessToken);

    return data.userExistsBefore;
  }
}
