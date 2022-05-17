import { Book } from './book';
import { Episode } from './episode';
import { Link } from './link';
import { Creator } from './creator';

export interface Series {
  id: number;
  title: string;
  description: string;
  lastUpdated?: string;
  banner?: File;
  thumbnail?: File;
  genres: string[];
  links: Link[];
  creators: Creator[];
  books: Book[];
  episodes: Episode[];
  hasThumbnail?: boolean;
  hasBanner?: boolean;
}
