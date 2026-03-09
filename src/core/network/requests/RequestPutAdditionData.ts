import { inject, injectable } from "inversify";
import URLEnum from "../URLEnum";
import { ISubRequestData, Request } from "./Request";
import { HTTPMethod, StatusCode } from "./type";
import { UserState } from "@/state/UserState";

export interface AdditionData {
  telegram: string;
  discord: string;
  firstName: string;
  lastName: string;
  surName: string;
  bithDay: Date;
}
@injectable()
export default class RequestPutAdditionData extends Request<
  AdditionData,
  boolean,
  void
> {
  withCSRF: boolean = false;
  method: HTTPMethod = "PUT";
  authorized: boolean = true;

  constructor(@inject(UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: AdditionData): ISubRequestData {
    this.userState.changeUserData(data);
    return {
      url: new URL(URLEnum.ADDITION),
      init: {
        body: JSON.stringify(data),
      },
    };
  }
  onSuccess(data: void): boolean | Promise<boolean> {
    return true;
  }
  protected onError(error: string): void {
    this.userState.clearUserData();
  }
}
