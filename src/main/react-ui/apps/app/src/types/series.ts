import { Book } from './book';
import { Episode } from './episode';
import { Link } from './link';
import { Creator } from './creator';
import { Publisher } from './publisher';

export type Series = {
  id: number;
  title: string;
  description: string;
  lastUpdated?: string;
  banner?: File;
  thumbnail?: File;
  genres: string[];
  links: Link[];
  creators: Creator[];
  publishers: Publisher[];
  books: Book[];
  episodes: Episode[];
  hasThumbnail?: boolean;
  hasBanner?: boolean;
};
