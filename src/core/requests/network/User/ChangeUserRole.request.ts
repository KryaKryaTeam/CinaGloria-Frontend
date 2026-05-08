import { RoleEnum } from "@/core/domain/entity/RoleEnum";
import { HTTPMethod } from "../../type";
import { ISubRequestData, NetworkRequest } from "../NetworkRequest";
import URLEnum from "../../URLEnum";
import { inject } from "inversify";
import { TYPES } from "@/core/Container.types";
import { UserState } from "@/state/UserState";
interface Data{
    role: RoleEnum;
    userId: string;
}
export default class ChangeUserRoleRequest extends NetworkRequest<Data, void, void>{
    authorized: boolean = true;
    withCSRF: boolean = false;
    method: HTTPMethod = "PATCH";
    id: string;
    state: UserState
    role: RoleEnum;
    constructor(@inject(TYPES.UserState) userState: UserState){
        super(userState)
        this.id = "";
        this.state = userState;
        this.role = RoleEnum.USER
    }

    mapData(data: Data): ISubRequestData {
        this.id = data.userId;
        this.role = data.role
        return {
            url: new URL(URLEnum.USER + "role"),
            init: {
                body: {
                    role: data.role,
                    userId: data.userId
                }
            }
        }
    }
    onSuccess(data: void): void | Promise<void> { }
}