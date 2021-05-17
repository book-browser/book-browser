
export class ApiError extends Error {
  constructor({ message, timestamp, status, code, errors, path }) {
    super(message);
    this.name = "ApiError";
    this.timestamp = timestamp;
    this.status = status;
    this.code = code;
    this.errors = errors;
    this.path = path;
  }

  timestamp: Date
  status: number
  code: number
  errors: string[]
  path: string
}