import { BookLink } from "./book-link";
import { Genre } from "./genre";
import { PersonCreator } from "./person-creator";

export class Book {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
  genres: Genre[];
  creators: PersonCreator[];
  links: BookLink[]
}