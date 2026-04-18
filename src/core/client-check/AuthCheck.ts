import { inject, injectable } from "inversify";
import ClientCheck from "./ClientCheck";
import { UserState } from "@/state/UserState";
import { TYPES } from "../Container.types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import debugLog from "@/infrastructure/debugLog";

@injectable()
export default class AuthCheck extends ClientCheck<UserState> {
    private router?: AppRouterInstance

    condition = (data: UserState): boolean => data.isAuthorized

    onFailure = () => {
        debugLog("is check log")
        this.router?.push('/auth/login')
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
