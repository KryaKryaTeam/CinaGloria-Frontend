import { UserState } from "@/state/UserState";
import { GetWsTokenRequest } from "../GetWsToken.request";
import { beforeEach, describe, expect, test } from "vitest";

describe("GetWsTokenRequest", () => {
    let request: GetWsTokenRequest;
    let state: UserState;
    beforeEach(() => {
        state = new UserState();
        request = new GetWsTokenRequest(state);
    });
    test("onSuccess returns correct data", async () => {
        const result = await request.execute(undefined, { mock: true });
        expect(result).toEqual({ token: "mocked_token" });
    });
});