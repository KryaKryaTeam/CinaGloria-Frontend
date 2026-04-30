import { injectable, inject } from "inversify";
import { NetworkRequest, ISubRequestData } from "../NetworkRequest";
import { HTTPMethod } from "@/core/requests/type";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";
import { IUserForAdminList } from "@/core/domain/entity/IUserForAdminList";

export interface IGetUsersAdminParams {
  page: number;
  email?: string;
}

@injectable()
export class GetUsersAdminListRequest extends NetworkRequest<
  IGetUsersAdminParams,
  IUserForAdminList[],
  IUserForAdminList[]
> {
  withCSRF = false;
  method: HTTPMethod = "GET";
  authorized = true;
  mockOutputData: IUserForAdminList[] = [];

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: IGetUsersAdminParams): ISubRequestData {
    const url = new URL(
      `https://bots.swedka121.com/app/v1/user/users/${data.page}`,
    );

    if (data.email?.trim()) {
      url.searchParams.set("email", data.email.trim());
    }

    return {
      url,
      init: {},
    };
  }

  onSuccess(data: IUserForAdminList[]): IUserForAdminList[] {
    return data;
  }
}
