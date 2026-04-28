import { describe, expect, test } from "vitest";
import ValueObject from "../ValueObject";

class TestValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }
  get value(): string { return this._value; }
  equals(other: ValueObject<string>): boolean {
    return this.toString() === other.toString();
  }
}

describe("ValueObject", () => {
  describe("value", () => {
    test("exposes the underlying value via getter", () => {
      const vo = new TestValueObject("hello");
      expect(vo.value).toBe("hello");
    });
  });

  describe("toString()", () => {
    test("returns string representation of value", () => {
      const vo = new TestValueObject("hello");
      expect(vo.toString()).toBe("hello");
    });

    test("returns empty string when value is empty", () => {
      const vo = new TestValueObject("");
      expect(vo.toString()).toBe("");
    });
  });

  describe("equals()", () => {
    test("returns true for equal values", () => {
      const a = new TestValueObject("hello");
      const b = new TestValueObject("hello");
      expect(a.equals(b)).toBe(true);
    });

    test("returns false for different values", () => {
      const a = new TestValueObject("hello");
      const b = new TestValueObject("world");
      expect(a.equals(b)).toBe(false);
    });

    test("is reflexive — equals itself", () => {
      const a = new TestValueObject("hello");
      expect(a.equals(a)).toBe(true);
    });

    test("is symmetric — a.equals(b) matches b.equals(a)", () => {
      const a = new TestValueObject("hello");
      const b = new TestValueObject("hello");
      expect(a.equals(b)).toBe(b.equals(a));
    });
  });
});