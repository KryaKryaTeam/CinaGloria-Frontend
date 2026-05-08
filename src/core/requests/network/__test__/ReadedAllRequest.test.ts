import NotificationStore from "@/state/NotificationStore";
import { UserState } from "@/state/UserState";
import { INotification } from "@/core/domain/entity/Notification";
import NotificationStatus from "@/core/domain/entity/NotificationType.enum";
import { beforeEach, describe, expect, test } from "vitest";
import ReadAllRequest from "../ReadAllRequest.request";

const makeMockNotification = (id: string): INotification => ({
  id,
  title: `Notification ${id}`,
  content: "Content",
  from: "system",
  to: "user-123",
  status: NotificationStatus.sended,
  targets: [],
  createdAt: new Date("2024-01-01"),
  read: false,
});

describe("ReadAllRequest", () => {
  let state: UserState;
  let notificationStore: NotificationStore;
  let request: ReadAllRequest;

  beforeEach(() => {
    state = new UserState();
    notificationStore = new NotificationStore();
    request = new ReadAllRequest(state, notificationStore);
  });

  test("marks all notifications as read on success", async () => {
    notificationStore.addNew(makeMockNotification("1"));
    notificationStore.addNew(makeMockNotification("2"));
    notificationStore.addNew(makeMockNotification("3"));

    await request.execute(undefined, { mock: true });

    expect(
      notificationStore.notifications.every(
        (n) => n.status === NotificationStatus.readed,
      ),
    ).toBe(true);
  });

  test("haveUnreadedNotifications is false after execute", async () => {
    notificationStore.addNew(makeMockNotification("1"));
    notificationStore.addNew(makeMockNotification("2"));

    await request.execute(undefined, { mock: true });

    expect(notificationStore.haveUnreadedNotifications).toBe(false);
  });

  test("onSuccess returns void", async () => {
    const result = await request.execute(undefined, { mock: true });
    expect(result).toBeUndefined();
  });

  test("does not throw when store is empty", async () => {
    await expect(
      request.execute(undefined, { mock: true }),
    ).resolves.toBeUndefined();
  });
});
