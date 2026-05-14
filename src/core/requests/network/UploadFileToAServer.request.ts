import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import { HTTPMethod } from "../type";
import { UserState } from "@/state/UserState";
import { TYPES } from "@/core/Container.types";
import { inject } from "inversify";
import URLEnum from "../URLEnum";

interface IInput {
  file: File;
  scope: string;
}

interface IRequest {
  url: string;
}

export class UploadFileToAServerRequest extends NetworkRequest<
  IInput,
  string,
  IRequest
> {
  authorized: boolean = true;
  method: HTTPMethod = "POST";
  withCSRF: boolean = false;
  mockOutputData: IRequest | undefined;
  protected showProgressInToast: boolean = true;
  protected toastConfig: { loading: string; success: string; error: string } = {
    error: "Error occured while was loading a file",
    loading: "File is loading...",
    success: "File is uploaded",
  };

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: IInput): ISubRequestData {
    const formData = new FormData();
    formData.append("file", data.file);

    const headers = new Headers();
    headers.append("Content-Type", "multipart/form-data");
    return {
      init: {
        body: formData,
        headers,
      },
      url: new URL(URLEnum.UPLOAD_FILE + data.scope),
    };
  }

  onSuccess(data: IRequest): string | Promise<string> {
    return data.url;
  }
}
