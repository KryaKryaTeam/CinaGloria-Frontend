import { IUserShortProfile } from "@/core/domain/entity/User";
import { ISubRequestData, NetworkRequest } from "./NetworkRequest";
import { HTTPMethod } from "../type";
import URLEnum from "../URLEnum";
import { inject } from "inversify";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";

export class GetUserProfileByIdRequest extends NetworkRequest<
  string,
  IUserShortProfile,
  IUserShortProfile
> {
  authorized: boolean = true;
  method: HTTPMethod = "GET";
  withCSRF: boolean = false;
  mockOutputData: IUserShortProfile | undefined;
  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: string): ISubRequestData {
    const url = new URL(URLEnum.USER_PUBLIC);

    url.searchParams.append("id", data);

    return {
      init: {},
      url,
    };
  }
  onSuccess(
    data: IUserShortProfile,
  ): IUserShortProfile | Promise<IUserShortProfile> {
    return data;
  }
}
