import ValueObject from "./ValueObject";
import { Result, ValidationError } from "@/infrastructure/Result";

export default class Username extends ValueObject<string> {
  public constructor(value: string) {
    super(value);
  }

  get value(): string {
    return this._value;
  }

  static create(raw: string): Username {
    if (!raw || raw.trim().length === 0)
      throw new ValidationError("Username is required");
    return new Username(raw.toLowerCase().trim());
  }

  equals(other: ValueObject<string>): boolean {
    return other instanceof Username && this._value === other._value;
  }
}
