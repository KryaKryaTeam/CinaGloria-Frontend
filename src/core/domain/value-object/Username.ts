import { singleton } from 'tsyringe'
import ValueObject from './ValueObject'
import { Result, ValidationError } from '@/infrastructur/Result'
@singleton()
export default class Username extends ValueObject<string> {
  
  public constructor(value: string) {
    super(value)  
  }

  get value(): string {
    return this._value 
  }

  static create(raw: string): Result<Username, ValidationError> {
    if (!raw || raw.trim().length === 0 || !/^\w+(\s+\w+)*$/.test(raw)) return Result.fail(new ValidationError('Username is required'))
    return Result.ok(new Username(raw.toLowerCase().trim()))
  }

  equals(other: ValueObject<string>): boolean {
    return other instanceof Username && this._value === other._value
  }
}