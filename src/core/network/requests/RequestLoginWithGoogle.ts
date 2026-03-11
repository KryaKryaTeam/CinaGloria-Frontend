import { init } from "next/dist/compiled/webpack/webpack";
import { ISubRequestData, Request } from "./Request";
import URLEnum from "../URLEnum";
import { HTTPMethod } from "./type";
import { UserState } from "@/state/UserState";
import { inject } from "inversify";

interface LoginWithGoogleInput {
  code: string;
}
interface LoginWithGoogleOutput {
  accessToken: string;
  userExistsBefore: boolean;
}

export class RequestLoginWithGoogle extends Request<
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
