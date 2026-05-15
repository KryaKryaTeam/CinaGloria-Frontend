import { injectable, inject } from "inversify";
import { NetworkRequest, ISubRequestData } from "./NetworkRequest";
import { HTTPMethod } from "@/core/requests/type";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";
import { IUserForAdminList } from "@/core/domain/entity/IUserForAdminList";
import { URLEnum } from "../URLEnum";
import { AdminUsersListState } from "@/state/AdminUserState";

export interface IGetUsersAdminParams {
  page: number;
  email?: string;
}

@injectable()
export class GetUsersAdminListRequest extends NetworkRequest<
  IGetUsersAdminParams,
  void,
  IUserForAdminList[],
  void
> {
  withCSRF = false;
  method: HTTPMethod = "GET";
  authorized = true;
  mockOutputData: IUserForAdminList[] = [];

  constructor(
    @inject(TYPES.UserState) userState: UserState,
    @inject(TYPES.AdminUsersListState)
    private readonly adminUsersListState: AdminUsersListState,
  ) {
    super(userState);
  }

  mapData(data: IGetUsersAdminParams): ISubRequestData {
    const url = new URL(`${URLEnum.ADMIN_USER}${data.page}`);

    if (data.email?.trim()) {
      url.searchParams.set("email", data.email.trim());
    }

    return {
      url,
      init: {},
    };
  }

  onSuccess(data: IUserForAdminList[]) {
    data.forEach((usr) => this.adminUsersListState.addUser(usr));
    this.adminUsersListState.updateEncounter();
  }
  protected onError(error: Error): void {
    this.adminUsersListState.stop();
  }
}
