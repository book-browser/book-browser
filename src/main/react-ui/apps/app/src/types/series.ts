import { Book } from "./book";
import { Link } from "./link";
import { PersonCreator } from "./person-creator";

export interface Series {
  id: number
  title: string
  description: string
  banner?: string
  thumbnail?: string
  books: Book[]
  genres: string[]
  links: Link[]
  creators: PersonCreator[]
  hasThumbnail?: boolean
  hasBanner?: boolean
}