import { UserState } from "@/state/UserState";
import { beforeEach, describe, expect, test } from "vitest";
import { LogoutRequest } from "../Logout.request";
import RequestMe from "../Me.request";

describe("LogoutRequest", () => {
  let state: UserState;
  let logoutRequest: LogoutRequest;
  let requestMe: RequestMe;
  beforeEach(() => {
    state = new UserState();
    logoutRequest = new LogoutRequest(state);
    requestMe = new RequestMe(state);
  });
  test("clears user data on success", async () => {
    await requestMe.execute(undefined, { mock: true });
    expect(state.User).not.toBeNull();
    await logoutRequest.execute(undefined, { mock: true });
    expect(state.User).toBeNull();
  });
});
