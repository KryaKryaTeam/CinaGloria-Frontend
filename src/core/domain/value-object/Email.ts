import { Result, ValidationError } from "@/infrastructur/Result"

export class Email {
  private constructor(public readonly value: string) {}

  static create(raw: string): Result<Email, ValidationError> {

    const html5Email = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!html5Email.test(raw))
      return Result.fail(new ValidationError('Invalid email'))

    return Result.ok(new Email(raw.toLowerCase().trim()))
  }

  equals(other: Email): boolean {
    return this.value === other.value
  }
}