
export interface ApiError extends Error {
  timestamp: number
  status: number
  message: string
  httpError: string
  errors: string[]
  path: string
  correlationId: string
}
