import { Genre } from "./genre";
import { Link } from "./link";
import { PersonCreator } from "./person-creator";

export class BookSubmission {
  id: number;
  title: string;
  description: string;
  creators: PersonCreator[];
  thumbnail: File;
  genres: Genre[];
  links: Link[];
}