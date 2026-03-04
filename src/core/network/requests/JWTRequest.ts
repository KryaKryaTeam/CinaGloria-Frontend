import Email from "@/core/domain/value-object/Email";
import Request, { ISubRequestData } from "./Request";
import { Password } from "@/core/domain/value-object/Password";
import URLEnum from "../URLEnum";

interface IDataRequest {
  email: Email;
  password: Password;
}

interface IRequestOutput {
  accessToken: string;
  userExistsBefore: boolean;
}

export default class JWTChangeRequest extends Request<
  IDataRequest,
  boolean,
  IRequestOutput
> {
  withCSRF: boolean = true;
  method: "GET" | "POST" | "PUT" | "DELETE" = "POST";

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

  onSuccess(data: IRequestOutput): boolean | Promise<boolean> {
    console.log(data);
    if (!this.checkCanable())
      throw new Error("Service worker is not initialized!");

    navigator.serviceWorker.ready.then((registration) => {
      registration.active?.postMessage({
        type: "TOKEN",
        payload: data.accessToken,
      });
    });

    return data.userExistsBefore;
  }

  private checkCanable(): boolean {
    if (!navigator.serviceWorker) return false;
    if (!navigator.serviceWorker.controller) return false;
    return true;
  }
}
