import { UserState } from "@/state/UserState";
import { beforeEach, describe, expect, test } from "vitest";
import RequestMe from "../Me.request";
import User from "@/core/domain/entity/User";
import { RoleEnum } from "@/core/domain/entity/RoleEnum";

describe("RequestMe", () => {
  let state: UserState;
  let request: RequestMe;

  beforeEach(() => {
    state = new UserState();
    request = new RequestMe(state);
  });

  test("sets User instance in state on success", async () => {
    await request.execute(undefined, { mock: true });
    expect(state.User).toBeInstanceOf(User);
  });

  test("maps mockOutputData fields onto User entity correctly", async () => {
    await request.execute(undefined, { mock: true });
    const user = state.User!;
    expect(user.id).toBe(request.mockOutputData.id);
    expect(user.role).toBe(RoleEnum.USER);
    expect(user.contacts.telegram).toBe(request.mockOutputData.contacts.telegram);
    expect(user.contacts.discord).toBe(request.mockOutputData.contacts.discord);
  });

  test("overwrites existing user in state with new data", async () => {
    await request.execute(undefined, { mock: true });
    const firstUser = state.User;

    await request.execute(undefined, { mock: true });
    const secondUser = state.User;

    expect(secondUser).toBeInstanceOf(User);
    expect(secondUser?.id).toBe(firstUser?.id);
  });

  test("onSuccess returns void", async () => {
    const result = await request.execute(undefined, { mock: true });
    expect(result).toBeUndefined();
  });
});