import { Link } from './link';
import { Genre } from './genre';
import { PartyCreator } from './creator';

export interface Book {
  id: number;
  title: string;
  description: string;
  releaseDate?: Date;
  thumbnail?: string;
  seriesId?: number;
  seriesTitle?: string;
  genres: Genre[];
  creators: PartyCreator[];
  links: Link[];
}
