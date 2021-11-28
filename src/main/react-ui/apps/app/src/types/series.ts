import { Book } from "./book";

export interface Series {
  id: number
  title: string
  description: string
  banner?: string
  books: Book[]
}