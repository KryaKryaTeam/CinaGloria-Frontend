import { UserState } from "@/state/UserState";
import { beforeEach, describe, expect, test } from "vitest";
import { RequestLoginWithGoogle } from "../LoginWithGoogle.request";
let mockRequestData = {
    code: "mock_code",
}
describe("LoginWithGoogleRequest", () => { 
    let state: UserState;
    let request: RequestLoginWithGoogle;
    beforeEach(() => {
        state = new UserState();
        request = new RequestLoginWithGoogle(state);
    });
    test("set auth token in state", async () => {
        await request.execute(mockRequestData, { mock: true });
        expect(state.authToken).toBe("1234567890");
    });
    test("onSuccess returns correct data", async () => {
        const result = await request.execute(mockRequestData, { mock: true });
        expect(result).toEqual(true);
    });
});