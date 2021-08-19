import { Genre } from "./genre";
import { PersonCreator } from "./person-creator";
import { Release } from "./release";

export class Book {
  id: number;
  title: string;
  description: string;
  genres: Genre[];
  creators: PersonCreator[];
}