import { Result, ValidationError } from "@/infrastructur/Result";
import ValueObject from "./ValueObject";
import { singleton } from "tsyringe";
@singleton()
export default class AvatarURL extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }
  get value(): string {
    return this._value;
  }
  static generate(listOfAvalible: string[]) {
    return new AvatarURL(
      listOfAvalible[Math.floor(Math.random() * listOfAvalible.length)],
    );
  }
  static create(raw: string): Result<AvatarURL, ValidationError> {
    if (!raw.includes("http://") || !raw.includes("https://"))
      Result.fail(new ValidationError("Invalid URL format"));

    return Result.ok(new AvatarURL(raw));
  }
  equals(other: ValueObject<string>): boolean {
    return other instanceof AvatarURL && this._value === other._value;
  }
}
