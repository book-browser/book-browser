import { Book } from './book';
import { Episode } from './episode';
import { Link } from './link';
import { Creator } from './creator';
import { Publisher, PublisherForm } from './publisher';
import { GenreEnum, StatusEnum } from 'enum';

export type Series = {
  id: number;
  title: string;
  urlTitle: string;
  description: string;
  status?: StatusEnum;
  lastUpdated?: string;
  genres: GenreEnum[];
  links: Link[];
  creators: Creator[];
  publishers: Publisher[];
  books: Book[];
  episodes: Episode[];
  bannerUrl?: string;
  thumbnailUrl?: string;
};

export type SeriesForm = {
  id: number;
  title?: string;
  description?: string;
  status?: StatusEnum;
  banner?: File;
  thumbnail?: File;
  genres: GenreEnum[];
  links: Link[];
  creators: Creator[];
  books: Book[];
  publishers: PublisherForm[];
  bannerUrl?: string;
  thumbnailUrl?: string;
};

export type SeriesSummary = {
  id: number;
  title: string;
  urlTitle: string;
  description: string;
  status?: StatusEnum;
  lastUpdated?: string;
  banner?: File;
  thumbnail?: File;
  genres: GenreEnum[];
  links: Link[];
  creators: Creator[];
  publishers: Publisher[];
  bannerUrl?: string;
  thumbnailUrl?: string;
};
