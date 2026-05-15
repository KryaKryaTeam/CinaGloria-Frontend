import { inject, injectable } from "inversify";
import ClientCheck from "./ClientCheck";
import { UserState } from "@/state/UserState";
import { TYPES } from "../Container.types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import debugLog from "@/infrastructure/debugLog";
import RequestMe from "../requests/network/Me.request";

@injectable()
export default class AuthCheck extends ClientCheck<UserState> {
  private router?: AppRouterInstance;
  private request: RequestMe;
  condition = (data: UserState): boolean => data.isAuthorized;

  onFailure = () => {
    try {
      this.request.execute();
    } catch (error) {
      this.router?.push("/auth/login");
    }
  };

  setRouter(router: AppRouterInstance): this {
    this.router = router;
    return this;
  }

  constructor(
    @inject(TYPES.UserState) userState: UserState,
    @inject(TYPES.RequestMe) request: RequestMe,
  ) {
    super(userState);
    this.request = request;
  }
}
