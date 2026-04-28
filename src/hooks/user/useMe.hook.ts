import container, { TYPES } from "@/core/Container";
import { RoleEnum } from "@/core/domain/entity/RoleEnum";
import {
  IUserAdditionalData,
  IUserShortProfile,
} from "@/core/domain/entity/User";
import { LogoutRequest } from "@/core/requests/network/Logout.request";
import RequestMe from "@/core/requests/network/Me.request";
import { UserState } from "@/state/UserState";
import { useRouter } from "next/navigation";

export function useMe(): {
  get(): IUserShortProfile;
  isAuthed(): boolean;
  fetch(): void;
  logout(): void;
  getAdditionalData(): IUserAdditionalData;
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
    getAdditionalData: () => {
      if (!state.User)
        return {
          age: {
            birthDay: new Date(),
            value: 0,
          },
          contacts: {
            discord: "mr_meow#1234",
            telegram: "@MrMeow",
          },
          email: "mr_meow@gmail.com",
          fullName: {
            firstName: "Meow",
            lastName: "Meow",
            surName: "Meow",
            value: "Meow Meow Meow",
          },
          id: "meow-123.123",
        };
      return state.User?.additionalData;
    },
    isAuthed: () => state.isAuthorized,
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
