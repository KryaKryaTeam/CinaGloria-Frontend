import { describe, expect, it } from "vitest";
import Password from "../Password";

describe("Password", () => {
  describe("create", () => {
    it("should create a valid password instance", () => {
      const valid = "Valid123!";
      const password = Password.create(valid);
      expect(password.value).toBe(valid);
    });

    it("should throw error if empty or whitespace only", () => {
      expect(() => Password.create("   ")).toThrow("Password is required");
    });

    it("should throw error if shorter than 8 characters", () => {
      expect(() => Password.create("Ab1!    ")).toThrow("Minimum 8 characters");
    });

    it("should throw error if missing uppercase letter", () => {
      expect(() => Password.create("password123!")).toThrow("Need at least one uppercase letter");
    });

    it("should throw error if missing lowercase letter", () => {
      expect(() => Password.create("PASSWORD123!")).toThrow("Need at least one lowercase letter");
    });

    it("should throw error if missing a digit", () => {
      expect(() => Password.create("Password!")).toThrow("Need at least one digit");
    });

    it("should throw error if missing a special character", () => {
      expect(() => Password.create("Password123")).toThrow("Need at least one special character");
    });
  });

  describe("equals", () => {
    it("should return true for identical passwords", () => {
      const p1 = Password.create("SecurePass123!");
      const p2 = Password.create("SecurePass123!");
      expect(p1.equals(p2)).toBe(true);
    });

    it("should return false for different passwords", () => {
      const p1 = Password.create("SecurePass123!");
      const p2 = Password.create("OtherPass123!");
      expect(p1.equals(p2)).toBe(false);
    });
  });
});