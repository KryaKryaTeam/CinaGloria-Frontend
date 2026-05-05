import { UserState } from "@/state/UserState";
import { beforeEach, describe, expect, test } from "vitest";
import { RequestConfirm } from "../Confirm.request";

describe("RequestConfirm", () => {
  let state: UserState;
  let request: RequestConfirm;

  beforeEach(() => {
    state = new UserState();
    request = new RequestConfirm(state);
  });

  test("sets auth token in state on success", async () => {
    await request.execute({ requestId: "123", code: "456" }, { mock: true });
    expect(state.authToken).toBe(request.mockOutputData.accessToken);
  });

  test("marks user as authorized after success", async () => {
    await request.execute({ requestId: "123", code: "456" }, { mock: true });
    expect(state.isAuthorized).toBe(true);
  });

  test("onSuccess returns void", async () => {
    const result = await request.execute(
      { requestId: "123", code: "456" },
      { mock: true },
    );
    expect(result).toBeUndefined();
  });
});
