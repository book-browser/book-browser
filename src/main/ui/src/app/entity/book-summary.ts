import { PersonCreator } from './person-creator';

export class BookSummary {
  id: number;
  title: string;
  creators: PersonCreator[];
  description: string;
  pageViews: number;
  publishDate: Date;
}