import { Link } from './link';
import { Genre } from './genre';
import { Creator } from './creator';

export declare type Book = {
  id: number;
  title: string;
  description: string;
  releaseDate?: Date;
  thumbnail?: string;
  seriesId?: number;
  seriesTitle?: string;
  genres: Genre[];
  creators: Creator[];
  links: Link[];
};
