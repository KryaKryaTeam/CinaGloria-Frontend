import { UserState } from "@/state/UserState";
import ClientCheck from "./ClientCheck";
import { RoleEnum } from "../domain/entity/RoleEnum";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { inject } from "inversify";
import { TYPES } from "../Container.types";
export default  class AdminCheck extends ClientCheck<UserState> {
    private router?: AppRouterInstance
    condition = (data: UserState): boolean => {
        return data.User?.role === RoleEnum.ADMIN; 
    }
    onFailure = () => {
        this.router?.push('/profile/information')
    }
    setRouter(router: AppRouterInstance): this {
        this.router = router
        return this  
    }
        constructor(
            @inject(TYPES.UserState) userState: UserState
        ) {
            super(userState);
        }
}