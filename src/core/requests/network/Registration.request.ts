import URLEnum from "../URLEnum";
import { HTTPMethod } from "../type";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";

interface RegisterData {
  email: string;
  password: string;
}

interface RegisterOutput {
  requestId: string;
}

export class RequestRegistartion extends NetworkRequest<
  RegisterData,
  RegisterOutput,
  RegisterOutput
> {
  withCSRF: boolean = true;
  authorized: boolean = false;
  method: HTTPMethod = "POST";

  mapData(data: RegisterData): ISubRequestData {
    return {
      init: {
        body: JSON.stringify(data),
      },
      url: new URL(URLEnum.REGISTER_LOCAL),
    };
  }
  onSuccess(data: RegisterOutput): RegisterOutput {
    return data;
  }
}
