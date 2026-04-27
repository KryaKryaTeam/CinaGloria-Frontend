import { describe, expect, test } from "vitest";
import Email from "../Email";
import { ValidationError } from "@/infrastructure/Result";

describe("Email", () => {
  describe("create()", () => {
    test("creates email from valid string", () => {
      const email = Email.create("test@test.com");
      expect(email).toBeInstanceOf(Email);
    });

    test("lowercases the value", () => {
      const email = Email.create("TEST@TEST.COM");
      expect(email.value).toBe("test@test.com");
    });

    test("trims whitespace", () => {
      const email = Email.create("  test@test.com  ");
      expect(email.value).toBe("test@test.com");
    });

    test("throws ValidationError when value is empty string", () => {
      expect(() => Email.create("")).toThrow(ValidationError);
    });

    test("throws ValidationError when value is only whitespace", () => {
      expect(() => Email.create("   ")).toThrow(ValidationError);
    });

    test("throws ValidationError with 'required' message on empty", () => {
      expect(() => Email.create("")).toThrow("Email is required");
    });

    test("throws ValidationError on missing @", () => {
      expect(() => Email.create("testtest.com")).toThrow(ValidationError);
    });

    test("throws ValidationError on missing domain", () => {
      expect(() => Email.create("test@")).toThrow(ValidationError);
    });

    test("throws ValidationError on missing local part", () => {
      expect(() => Email.create("@test.com")).toThrow(ValidationError);
    });

    test("throws ValidationError on missing dot in domain", () => {
      expect(() => Email.create("test@testcom")).toThrow(ValidationError);
    });

    test("throws ValidationError with 'Invalid email format' message", () => {
      expect(() => Email.create("not-an-email")).toThrow("Invalid email format");
    });
  });

  describe("value", () => {
    test("exposes the underlying value via getter", () => {
      const email = Email.create("test@test.com");
      expect(email.value).toBe("test@test.com");
    });
  });

  describe("toString()", () => {
    test("returns the string value", () => {
      const email = Email.create("test@test.com");
      expect(email.toString()).toBe("test@test.com");
    });
  });

  describe("equals()", () => {
    test("returns true for two emails with same value", () => {
      const a = Email.create("test@test.com");
      const b = Email.create("test@test.com");
      expect(a.equals(b)).toBe(true);
    });

    test("returns false for two emails with different values", () => {
      const a = Email.create("test@test.com");
      const b = Email.create("other@test.com");
      expect(a.equals(b)).toBe(false);
    });

    test("is reflexive — equals itself", () => {
      const a = Email.create("test@test.com");
      expect(a.equals(a)).toBe(true);
    });

    test("returns false when compared to a different ValueObject subclass", () => {
      const a = Email.create("test@test.com");
      const other = { toString: () => "test@test.com" } as never;
      expect(a.equals(other)).toBe(false);
    });
  });
});