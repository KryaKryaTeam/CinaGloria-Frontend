import NotificationStore from "@/state/NotificationStore";
import { UserState } from "@/state/UserState";
import { INotification } from "@/core/domain/entity/Notification";
import NotificationStatus from "@/core/domain/entity/NotificationType.enum";
import { beforeEach, describe, expect, test } from "vitest";
import ReadedRequest from "../ReadedRequest.request";

const mockNotification: INotification = {
  id: "1",
  title: "Test notification",
  content: "Hello world",
  from: "system",
  to: "user-123",
  status: NotificationStatus.sended,
  targets: [],
  createdAt: new Date("2024-01-01"),
  read: false,
};

describe("ReadedRequest", () => {
  let state: UserState;
  let notificationStore: NotificationStore;
  let request: ReadedRequest;

  beforeEach(() => {
    state = new UserState();
    notificationStore = new NotificationStore();
    request = new ReadedRequest(state, notificationStore);
  });

  test("marks notification as read in store on success", async () => {
    notificationStore.addNew(mockNotification);

    await request.execute("1", { mock: true });

    const notification = notificationStore.notifications.find(
      (n) => n.id === "1",
    );
    expect(notification?.status).toBe(NotificationStatus.readed);
  });

  test("onSuccess returns true", async () => {
    const result = await request.execute("1", { mock: true });
    expect(result).toBe(true);
  });

  test("does not throw if notification id does not exist in store", async () => {
    await expect(
      request.execute("non-existent-id", { mock: true }),
    ).resolves.toBe(true);
  });

  test("does not mark other notifications as read", async () => {
    notificationStore.addNew(mockNotification);
    notificationStore.addNew({
      ...mockNotification,
      id: "2",
      read: false,
      status: NotificationStatus.sended,
    });

    await request.execute("1", { mock: true });

    const other = notificationStore.notifications.find((n) => n.id === "2");
    expect(other?.status).toBe(NotificationStatus.sended);
  });
});
