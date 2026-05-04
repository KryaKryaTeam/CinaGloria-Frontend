import ValueObject from "./ValueObject";
import { Result, ValidationError } from "@/infrastructure/Result";
export default class Password extends ValueObject<string> {
  public constructor(value: string) {
    super(value);
  }

  get value(): string {
    return this._value;
  }

  static create(userRaw: string): Password {
    const raw = userRaw.trim();
    if (!raw || raw.trim().length === 0)
      throw new ValidationError("Password is required");

    if (raw.length < 8) throw new ValidationError("Minimum 8 characters");

    if (!/[A-Z]/.test(raw))
      throw new ValidationError("Need at least one uppercase letter");

    if (!/[a-z]/.test(raw))
      throw new ValidationError("Need at least one lowercase letter");

    if (!/[0-9]/.test(raw))
      throw new ValidationError("Need at least one digit");

    if (!/[@$!%?&]/.test(raw))
      throw new ValidationError("Need at least one special character (@$!%?&)");

    return new Password(raw);
  }

  equals(other: ValueObject<string>): boolean {
    if (!(other instanceof Password)) return false;
    return this._value === other._value;
  }
}
