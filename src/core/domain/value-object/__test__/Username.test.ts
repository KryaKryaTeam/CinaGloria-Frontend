import { describe, expect, test } from "vitest";
import Username from "../Username";
import { ValidationError } from "@/infrastructure/Result";

describe("Username", () => {
  describe("create()", () => {
    test("creates username from valid string", () => {
      const username = Username.create("JohnDoe");
      expect(username).toBeInstanceOf(Username);
    });

    test("trims whitespace", () => {
      const username = Username.create("  john  ");
      expect(username.value).toBe("john");
    });

    test("lowercases the value", () => {
      const username = Username.create("JohnDoe");
      expect(username.value).toBe("johndoe");
    });

    test("trims and lowercases together", () => {
      const username = Username.create("  ABOBA  ");
      expect(username.value).toBe("aboba");
    });

    test("throws ValidationError when value is empty string", () => {
      expect(() => Username.create("")).toThrow(ValidationError);
    });

    test("throws ValidationError when value is only whitespace", () => {
      expect(() => Username.create("   ")).toThrow(ValidationError);
    });

    test("throws ValidationError with correct message", () => {
      expect(() => Username.create("")).toThrow("Username is required");
    });
  });

  describe("value", () => {
    test("exposes the underlying value via getter", () => {
      const username = Username.create("john");
      expect(username.value).toBe("john");
    });
  });

  describe("toString()", () => {
    test("returns the string value", () => {
      const username = Username.create("john");
      expect(username.toString()).toBe("john");
    });
  });

  describe("equals()", () => {
    test("returns true for two usernames with same value", () => {
      const a = Username.create("john");
      const b = Username.create("john");
      expect(a.equals(b)).toBe(true);
    });

    test("returns false for two usernames with different values", () => {
      const a = Username.create("john");
      const b = Username.create("jane");
      expect(a.equals(b)).toBe(false);
    });

    test("is reflexive — equals itself", () => {
      const a = Username.create("john");
      expect(a.equals(a)).toBe(true);
    });

    test("returns false when compared to a different ValueObject subclass", () => {
      const a = Username.create("john");
      const other = { toString: () => "john" } as never;
      expect(a.equals(other)).toBe(false);
    });
  });
});
