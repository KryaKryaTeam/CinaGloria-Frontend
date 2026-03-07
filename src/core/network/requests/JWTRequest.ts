import Email from "@/core/domain/value-object/Email";
import Request, { ISubRequestData } from "./Request";
import { Password } from "@/core/domain/value-object/Password";
import URLEnum from "../URLEnum";
import { HTTPMethod } from "./type";
import { inject, injectable } from "inversify";
import { UserState } from "@/state/UserState";

interface IDataRequest {
  email: Email;
  password: Password;
}

interface IRequestOutput {
  accessToken: string;
  userExistsBefore: boolean;
}

@injectable()
export default class JWTChangeRequest extends Request<
  IDataRequest,
  boolean,
  IRequestOutput
> {
  withCSRF: boolean = true;
  method: HTTPMethod = "POST";
  authorized: boolean = false;

  constructor(@inject(UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: IDataRequest): ISubRequestData {
    return {
      init: {
        body: JSON.stringify({
          email: data.email.value,
          password: data.password.value,
        }),
      },
      url: new URL(URLEnum.LOGIN_LOCAL),
    };
  }

  async onSuccess(data: IRequestOutput): Promise<boolean> {
    console.log(this);
    this.setAuth(data.accessToken);

    return data.userExistsBefore;
  }
}
