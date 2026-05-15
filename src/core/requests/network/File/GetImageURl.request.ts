import { HTTPMethod } from "../../type";
import URLEnum from "../../URLEnum";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";

export default class GetFileURLRequest extends NetworkRequest<
  string,
  string,
  string
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "GET";
  authorized: boolean = true;
  mockOutputData: string | undefined;
  mapData(data: string): ISubRequestData {
    return {
      url: new URL(URLEnum.FILE + `link/${data}`),
      init: {},
    };
  }

  onSuccess(data: string): string | Promise<string> {
    return data;
  }
}
