import { inject, injectable } from "inversify";
import URLEnum from "../URLEnum";
import { ISubRequestData, Request } from "./Request";
import { HTTPMethod, StatusCode } from "./type";
import { UserState } from "@/state/UserState";

export interface AdditionData {
  telegram?: string;
  discord?: string;
  firstName?: string;
  lastName?: string;
  surName?: string;
  birthDay?: Date;
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
    const payload = {
      ...data,
      birthDay: data.birthDay
        ? data.birthDay.toISOString().split("T")[0]
        : undefined,
    };

    this.userState.changeUserData(data);

    return {
      url: new URL(URLEnum.ADDITION),
      init: {
        body: JSON.stringify(payload), // Тепер тут чистий об'єкт
        headers: {
          "Content-Type": "application/json",
        },
      },
    };
  }
  onSuccess(data: void): boolean | Promise<boolean> {
    console.log("MACARENA");
    return true;
  }
  protected onError(error: string): void {
    this.userState.clearUserData();
  }
}
