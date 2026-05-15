import { injectable, inject } from "inversify";
import { NetworkRequest, ISubRequestData } from "./NetworkRequest";
import { HTTPMethod } from "../type";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";
import { RoleEnum } from "@/core/domain/entity/RoleEnum";
import { URLEnum } from "../URLEnum";

export interface IUpdateRoleDTO {
  userId: string;
  role: RoleEnum;
}

@injectable()
export class UpdateUserRoleRequest extends NetworkRequest<
  IUpdateRoleDTO,
  boolean,
  object
> {
  withCSRF = false;
  method: HTTPMethod = "PATCH";
  authorized = true;
  mockOutputData = {};

  constructor(@inject(TYPES.UserState) userState: UserState) {
    super(userState);
  }

  mapData(data: IUpdateRoleDTO): ISubRequestData {
    return {
      url: new URL(`${URLEnum.CHANGE_USER_ROLE}`),
      init: {
        body: {
          userId: data.userId,
          role: data.role,
        },
      },
    };
  }

  onSuccess(): boolean {
    return true;
  }
}
