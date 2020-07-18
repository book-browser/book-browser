import { Person } from './person';

export class Book {
  id: number;
  title: string;
  authors: Person[];
  description: string;
  pageViews: number;
  uploadDate: Date;
}