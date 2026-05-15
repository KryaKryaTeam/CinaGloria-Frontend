import Email from "@/core/domain/value-object/Email";
import Password from "@/core/domain/value-object/Password";
import { HTTPMethod } from "../type";
import { inject, injectable } from "inversify";
import { UserState } from "@/state/UserState";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import URLEnum from "../URLEnum";
import { TYPES } from "@/core/Container.types";

interface IDataRequest {
  email: Email;
  password: Password;
}

interface IRequestOutput {
  accessToken: string;
  userExistsBefore: boolean;
}

@injectable()
export default class JWTChangeRequest extends NetworkRequest<
  IDataRequest,
  IRequestOutput,
  IRequestOutput
> {
  withCSRF: boolean = true;
  method: HTTPMethod = "POST";
  authorized: boolean = false;
  mockOutputData: IRequestOutput = {
    accessToken: "123456789",
    userExistsBefore: true,
  };
  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: IDataRequest): ISubRequestData {
    console.log(
      JSON.stringify({
        email: data.email.value,
        password: data.password.value,
      }),
    );
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

  async onSuccess(data: IRequestOutput): Promise<IRequestOutput> {
    this.setAuth(data.accessToken);

    return data;
  }
}
