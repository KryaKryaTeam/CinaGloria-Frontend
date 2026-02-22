import { singleton } from 'tsyringe'
import ValueObject from './ValueObject'
import { Result, ValidationError } from '@/infrastructur/Result'
@singleton()
export class Password extends ValueObject<string> {
  public constructor(value: string) {
    super(value)
  }

  get value(): string {
    return this.value
  }

  static create(raw: string): Result<Password, ValidationError> {
    if (!raw || raw.trim().length === 0)
      return Result.fail(new ValidationError('Password is required'))

    if (raw.length < 8)
      return Result.fail(new ValidationError('Minimum 8 characters'))

    if (!/[A-Z]/.test(raw))
      return Result.fail(new ValidationError('Need at least one uppercase letter'))

    if (!/[a-z]/.test(raw))
      return Result.fail(new ValidationError('Need at least one lowercase letter'))

    if (!/[0-9]/.test(raw))
      return Result.fail(new ValidationError('Need at least one digit'))

    if (!/[@$!%?&]/.test(raw))
      return Result.fail(new ValidationError('Need at least one special character (@$!%?&)'))

    return Result.ok(new Password(raw))
  }

  equals(other: ValueObject<string>): boolean {
    if (!(other instanceof Password)) return false
    return this._value === other._value
  }
}