import { Release } from './release';
import { PersonCreator } from './person-creator';

export class Book {
    id: number;
	title: string;
	description: string;
    creators: PersonCreator[];
	issues: Release[];
	volumes: Release[];
  }