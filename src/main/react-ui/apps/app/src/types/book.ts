import { Link } from './link';
import { Genre } from './genre';
import { Creator } from './creator';

export type Book = {
  id: number;
  title: string;
  description: string;
  releaseDate?: Date;
  thumbnail?: File;
  thumbnailUrl?: string;
  seriesId?: number;
  seriesTitle?: string;
  genres: Genre[];
  creators: Creator[];
  links: Link[];
};
