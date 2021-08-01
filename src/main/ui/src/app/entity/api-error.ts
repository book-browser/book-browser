export class ApiError {
  correlationId: string
  timestamp: number
  status: number
  message: string
  httpError: string
  errors: string[]
  path: string
}