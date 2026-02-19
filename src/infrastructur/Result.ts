export type Result<T, E = Error> =
  | { ok: true;  value: T }
  | { ok: false; error: E }

export const Result = {
  ok:   <T>(value: T): Result<T, never>  => ({ ok: true,  value }),
  fail: <E>(error: E): Result<never, E>  => ({ ok: false, error }),
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field?: string,
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

