import { UserState } from "@/state/UserState";
import { beforeEach, describe, expect, test } from "vitest";
import { RequestRegistartion } from "../Registration.request";

describe("RequestRegistration", () => {
  let state: UserState;
  let request: RequestRegistartion;

  beforeEach(() => {
    state = new UserState();
    request = new RequestRegistartion(state);
  });

  test("onSuccess returns requestId from response", async () => {
    const result = await request.execute(
      { email: "test@test.com", password: "password123" },
      { mock: true },
    );
    expect(result).toEqual({ requestId: "123" });
  });

  test("onSuccess returns the exact mockOutputData shape", async () => {
    const result = await request.execute(
      { email: "test@test.com", password: "password123" },
      { mock: true },
    );
    expect(result).toEqual(request.mockOutputData);
  });
});