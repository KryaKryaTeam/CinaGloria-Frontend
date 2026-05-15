import { beforeEach, describe, expect, test } from "vitest";
import RequestPutAdditionData, {
  AdditionData,
} from "../PutAdditionData.request";
import { UserState } from "@/state/UserState";
import RequestMe from "../Me.request";
const mockRequestData: AdditionData = {
  telegram: "@aboba_user",
  discord: "aboba#0001",
  firstName: "John",
  lastName: "Doe",
  surName: "Jr",
  birthDay: new Date("2004-01-01"),
};
describe("PutAdditionDataRequest", () => {
  let request: RequestPutAdditionData;
  let meRequest: RequestMe;
  let state: UserState;
  beforeEach(() => {
    state = new UserState();
    meRequest = new RequestMe(state);
    request = new RequestPutAdditionData(state);
  });
  test("mock data changes user data in state", async () => {
    await meRequest.execute(undefined, { mock: true });
    const userBefore = state.User;
    const beforeTelegram = userBefore?.contacts.telegram;
    const beforeDiscord = userBefore?.contacts.discord;

    await request.execute(mockRequestData, { mock: true });
    const userAfter = state.User;

    expect(userAfter).not.toBeNull();
    expect(beforeTelegram).not.toBe(userAfter?.contacts.telegram);
    expect(beforeDiscord).not.toBe(userAfter?.contacts.discord);
    expect(userAfter?.contacts.telegram).toBe(mockRequestData.telegram);
    expect(userAfter?.contacts.discord).toBe(mockRequestData.discord);
    expect(userAfter?.age?.value).toBe(2004);
    expect(userAfter?.age?.birthDay).toEqual(new Date("2004-01-01"));
  });

  test("onSuccess returns correct data", async () => {
    const result = await request.execute(mockRequestData, { mock: true });
    expect(result).toBeTruthy();
  });
  test("onError is called on mock error", async () => {
    await request.mockOnError();
    expect(state.User).toBeNull();
  });
});
