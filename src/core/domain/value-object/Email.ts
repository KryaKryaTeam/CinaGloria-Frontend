
import { singleton } from 'tsyringe'
import ValueObject from './ValueObject'
import { Result, ValidationError } from '@/infrastructur/Result'
@singleton()
export default class Email extends ValueObject<string> {
  
  public constructor(value: string) {
    super(value)  
  }

  get value(): string {
    return this._value 
  }

  static create(raw: string): Result<Email, ValidationError> {
    if (!raw || raw.trim().length === 0)
      return Result.fail(new ValidationError('Email is required'))

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(raw))
      return Result.fail(new ValidationError('Invalid email format'))

    return Result.ok(new Email(raw.toLowerCase().trim()))
  }

  equals(other: ValueObject<string>): boolean {
    return other instanceof Email && this._value === other._value
  }
}