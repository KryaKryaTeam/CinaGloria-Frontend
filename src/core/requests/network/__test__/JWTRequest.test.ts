import { UserState } from "@/state/UserState";
import { describe, expect, test, beforeEach } from "vitest";
import JWTChangeRequest from "../JWT.request";
import Email from "@/core/domain/value-object/Email";
import Password from "@/core/domain/value-object/Password";

const mockDataRequest = {
  email: new Email("test@example.com"),
  password: new Password("password123"),
};
describe("JWTRequest", () => {
  let state: UserState;
  let request: JWTChangeRequest;

  beforeEach(() => {
    state = new UserState();
    request = new JWTChangeRequest(state);
  });
  test("set auth token in state", async () => {
    await request.execute(mockDataRequest, { mock: true });
    expect(state.authToken).toBe("123456789");
  });
  test("onSuccess returns correct data", async () => {
    const result = await request.execute(mockDataRequest, { mock: true });
    expect(result).toEqual({
      accessToken: "123456789",
      userExistsBefore: true,
    });
  });
});
