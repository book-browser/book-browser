import { Genre } from './genre';
import { Link } from './link';
import { PartyCreator } from './party-creator';

export class BookSubmission {
  id: number;
  title: string;
  description: string;
  creators: PartyCreator[];
  thumbnail: File;
  genres: Genre[];
  links: Link[];
}
