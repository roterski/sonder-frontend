import { Author } from './author.model';

export interface Comment {
  id: number;
  body: string;
  author: Author;
  parentIds: Array<number>;
  points: number;
  voted: number;
}
