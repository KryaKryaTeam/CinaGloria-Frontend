import { describe, expect, it } from "vitest";
import AvatarURL from "../AvatarURL";
import { ValidationError } from "@/infrastructure/Result";

describe("AvatarURL", () => {
  describe("create", () => {
    it("should create an instance when given a valid URL (http/https)", () => {
      const url = "https://example.com";
      const avatar = AvatarURL.create(url);
      expect(avatar.value).toBe(url);
    });

    it("should throw a ValidationError for an invalid format", () => {
      const invalidUrl = "ftp://wrong-format.com";
      expect(() => AvatarURL.create(invalidUrl)).toThrow(ValidationError);
      expect(() => AvatarURL.create(invalidUrl)).toThrow("Invalid URL format");
    });
  });

  describe("generate", () => {
    it("should return a random URL from the provided list", () => {
      const list = ["https://img1.png", "https://img2.png"];
      const generated = AvatarURL.generate(list);
      expect(list).toContain(generated.value);
      expect(generated).toBeInstanceOf(AvatarURL);
    });
  });

  describe("equals", () => {
    it("should return true for identical URLs", () => {
      const url = "https://test.com";
      const avatar1 = AvatarURL.create(url);
      const avatar2 = AvatarURL.create(url);
      expect(avatar1.equals(avatar2)).toBe(true);
    });

    it("should return false for different URLs", () => {
      const avatar1 = AvatarURL.create("https://test1.com");
      const avatar2 = AvatarURL.create("https://test2.com");
      expect(avatar1.equals(avatar2)).toBe(false);
    });
  });
});