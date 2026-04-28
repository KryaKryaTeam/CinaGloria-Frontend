import NotificationStore from "@/state/NotificationStore";
import { beforeEach, describe, expect, test } from "vitest";
import OldNotificationPageRequest from "../OldNotificationPage.request";
import { UserState } from "@/state/UserState";

describe("OldNotificationPageRequest", () => {
  let state = new NotificationStore();
  let request: OldNotificationPageRequest;
  let userState = new UserState();
  beforeEach(() => {
    state = new NotificationStore();
    request = new OldNotificationPageRequest(state, userState);
  });
  test("mock data added in notification store correct", async () => {
    await request.execute(0, { mock: true });
    expect(state.notifications).toHaveLength(request.mockOutputData.length);
    expect(state.notifications.map((notification) => notification.id)).toEqual(
      request.mockOutputData.map((item) => item.id),
    );
  });
});
