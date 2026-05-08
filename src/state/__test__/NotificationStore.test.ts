import { Notification, INotification } from "@/core/domain/entity/Notification";
import NotificationStatus from "@/core/domain/entity/NotificationType.enum";
import { describe, it, expect } from "vitest";

describe("Notification Entity", () => {
  const mockProps: INotification = {
    id: "notif-123",
    title: "System Update",
    content: "Maintenance scheduled",
    from: "Admin",
    to: "User1",
    status: NotificationStatus.sended,
    targets: ["ui-alert"],
    createdAt: new Date("2023-01-01T10:00:00Z"),
    read: false,
  };

  it("should initialize with correct values", () => {
    const notification = new Notification(mockProps);

    expect(notification.id).toBe(mockProps.id);
    expect(notification.title).toBe(mockProps.title);
    expect(notification.status).toBe(NotificationStatus.sended);
    expect(notification.read).toBe(false);
    expect(notification.createdAt).toBeInstanceOf(Date);
  });

  it("should generate a fallback ID if none is provided", () => {
    const propsWithoutId = { ...mockProps, id: "" };
    const notification = new Notification(propsWithoutId);

    expect(notification.id).toContain("notification-");
  });

  describe("markAsRead", () => {
    it("should change status to readed and update read property", () => {
      const notification = new Notification(mockProps);

      notification.markAsRead();

      expect(notification.status).toBe(NotificationStatus.readed);
      expect(notification.read).toBe(true);
    });

    it("should not perform any action if already read", () => {
      const notification = new Notification({
        ...mockProps,
        status: NotificationStatus.readed,
      });

      notification.markAsRead();
      expect(notification.status).toBe(NotificationStatus.readed);
    });
  });

  describe("Reactivity (MobX)", () => {
    it("should have observable status and computed read property", () => {
      const notification = new Notification(mockProps);

      // We check if properties are defined as getters (standard for computed/observable)
      const statusDescriptor = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(notification),
        "status",
      );
      const readDescriptor = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(notification),
        "read",
      );

      expect(statusDescriptor?.get).toBeDefined();
      expect(readDescriptor?.get).toBeDefined();
    });
  });
});
