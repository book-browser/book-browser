import { Book } from './book';
import { Episode } from './episode';
import { Link } from './link';
import { PartyCreator } from './party-creator';

export interface Series {
  id: number;
  title: string;
  description: string;
  lastUpdated?: string;
  banner?: string;
  thumbnail?: string;
  genres: string[];
  links: Link[];
  creators: PartyCreator[];
  books: Book[];
  episodes: Episode[];
  hasThumbnail?: boolean;
  hasBanner?: boolean;
}
