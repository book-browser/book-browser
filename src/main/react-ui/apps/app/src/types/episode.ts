import { Link } from './link';

export type Episode = {
  id: number;
  seriesId: number;
  seriesTitle: string;
  title: string;
  description?: string;
  thumbnail?: File;
  thumbnailUrl?: string;
  releaseDate: Date;
  links: Link[];
};
