import { Book } from "./book";
import { Link } from "./link";

export interface Series {
  id: number
  title: string
  description: string
  banner?: string
  thumbnail?: string
  books: Book[]
  genres: string[]
  links: Link[]
  hasThumbnail: boolean
  hasBanner: boolean
}