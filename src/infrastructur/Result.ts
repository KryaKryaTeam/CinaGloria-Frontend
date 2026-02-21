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

export class NotFoundError extends Error {
  constructor(entity: string) {
    super(`${entity} not found`)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}