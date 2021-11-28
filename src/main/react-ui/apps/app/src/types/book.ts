import { BookLink } from "./book-link";
import { Genre } from "./genre";
import { PersonCreator } from "./person-creator";

export interface Book {
  id: number;
  title: string;
  description: string;
  releaseDate?: Date;
  thumbnail?: string;
  seriesId?: number;
  seriesTitle?: string;
  genres: Genre[];
  creators: PersonCreator[];
  links: BookLink[]
  
}