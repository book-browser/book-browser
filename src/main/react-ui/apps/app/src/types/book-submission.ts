import { Genre } from "./genre";
import { PersonCreator } from "./person-creator";
import { Release } from "./release";

export class BookSubmission {
  id: number;
  title: string;
  description: string;
  creators: PersonCreator[];
  thumbnail: File;
  genres: Genre[];
}