
export class ApiError extends Error {
  constructor({ message, timestamp, status, httpError, errors, path, correlationId }) {
    super(message);
    this.name = "ApiError";
    this.timestamp = timestamp;
    this.status = status;
    this.httpError = httpError;
    this.errors = errors;
    this.path = path;
    this.correlationId = correlationId;
  }

  timestamp: number
  status: number
  message: string
  httpError: string
  errors: string[]
  path: string
  correlationId: string
}