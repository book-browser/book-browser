import { Genre } from './genre';
import { Link } from './link';
import { Creator } from './creator';

export class BookSubmission {
  id: number;
  title: string;
  description: string;
  creators: Creator[];
  thumbnail: File;
  genres: Genre[];
  links: Link[];
}
