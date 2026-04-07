import container, { TYPES } from "@/core/Container";
import { RoleEnum } from "@/core/domain/entity/RoleEnum";
import { IUserShortProfile } from "@/core/domain/entity/User";
import { LogoutRequest } from "@/core/requests/network/Logout.request";
import RequestMe from "@/core/requests/network/Me.request";
import { UserState } from "@/state/UserState";
import { useRouter } from "next/navigation";

export function useMe(): {
  get(): IUserShortProfile;
  fetch(): void;
  logout(): void;
} {
  const request = container.get<RequestMe>(TYPES.RequestMe);
  const LogoutRequest = container.get<LogoutRequest>(TYPES.LogoutRequest);
  const state = container.get<UserState>(TYPES.UserState);

  return {
    get: () => {
      if (!state.User || !state.User.shortProfile) {
        return {
          username: "Undefined",
          avatarUrl: "/fallback-avatar.webp",
          role: RoleEnum.USER,
        };
      }
      return state.User.shortProfile;
    },
    fetch: () => {
      request.execute();
    },
    logout: () => {
      LogoutRequest.execute().then(() => {
        window.location.pathname = "/";
      });
    },
  };
}
