export class NoDataStoredError extends Error {
  statusCode = "000";

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NoDataStoredError.prototype);
  }
}
