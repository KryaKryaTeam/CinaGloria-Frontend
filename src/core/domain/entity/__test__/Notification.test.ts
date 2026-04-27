import { describe, expect, test, beforeEach } from "vitest";
import { Notification, INotification } from "../Notification";
import NotificationStatus from "../NotificationType.enum";

const makeNotification = (overrides: Partial<INotification> = {}): INotification => ({
  id: "notif-1",
  title: "Test title",
  content: "Test content",
  from: "system",
  to: "user-123",
  status: NotificationStatus.sended,
  targets: [],
  createdAt: new Date("2024-01-01"),
  read: false,
  ...overrides,
});

describe("Notification", () => {
  let notification: Notification;

  beforeEach(() => {
    notification = new Notification(makeNotification());
  });

  // ── construction ────────────────────────────────────────────────────────────

  describe("construction", () => {
    test("sets all fields from props", () => {
      expect(notification.id).toBe("notif-1");
      expect(notification.title).toBe("Test title");
      expect(notification.content).toBe("Test content");
      expect(notification.from).toBe("system");
      expect(notification.to).toBe("user-123");
      expect(notification.status).toBe(NotificationStatus.sended);
      expect(notification.createdAt).toEqual(new Date("2024-01-01"));
    });

    test("generates random id when id is empty string", () => {
      const n = new Notification(makeNotification({ id: "" }));
      expect(n.id).toMatch(/^notification-/);
    });

    test("defaults status to sended when not provided", () => {
      const n = new Notification(makeNotification({ status: undefined as never }));
      expect(n.status).toBe(NotificationStatus.sended);
    });

    test("parses createdAt as a Date", () => {
      const n = new Notification(makeNotification({ createdAt: new Date("2020-06-15") }));
      expect(n.createdAt).toBeInstanceOf(Date);
      expect(n.createdAt.getFullYear()).toBe(2020);
    });
  });

  // ── read computed ───────────────────────────────────────────────────────────

  describe("read", () => {
    test("is false when status is sended", () => {
      expect(notification.read).toBe(false);
    });

    test("is true when status is readed", () => {
      const n = new Notification(makeNotification({ status: NotificationStatus.readed }));
      expect(n.read).toBe(true);
    });
  });

  // ── markAsRead ──────────────────────────────────────────────────────────────

  describe("markAsRead()", () => {
    test("changes status to readed", () => {
      notification.markAsRead();
      expect(notification.status).toBe(NotificationStatus.readed);
    });

    test("sets read to true", () => {
      notification.markAsRead();
      expect(notification.read).toBe(true);
    });

    test("is idempotent — calling twice does not throw", () => {
      notification.markAsRead();
      expect(() => notification.markAsRead()).not.toThrow();
    });

    test("stays readed after being called twice", () => {
      notification.markAsRead();
      notification.markAsRead();
      expect(notification.status).toBe(NotificationStatus.readed);
    });

    test("does not change status when already readed", () => {
      const n = new Notification(makeNotification({ status: NotificationStatus.readed }));
      n.markAsRead();
      expect(n.status).toBe(NotificationStatus.readed);
    });
  });
});