export class ApiError {
  timestamp: Date
  status: number
  code: number
  message: string
  errors: string[]
  path: string
}