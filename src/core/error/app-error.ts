/** Represents a typed application-level error with optional cause metadata. */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message, { cause })
    this.name = 'AppError'
  }
}
