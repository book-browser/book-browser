import { Genre } from './genre';
import { Letter } from './letter';
import { Role } from './role';

export type ReferenceData = {
  roles: Role[];
  genres: Genre[];
  letters: Letter[];
};
