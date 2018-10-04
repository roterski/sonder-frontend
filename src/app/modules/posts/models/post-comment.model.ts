import { ID } from '@datorama/akita';
import { Author } from './author.model';

export interface PostComment {
  id: number;
  body: string;
  author: Author;
  parentIds: Array<number>;
  points: number;
  voted: number;
  childrenIds: Array<number>;
}

export function createComment(params: Partial<PostComment>) {
  return {
    body: '',
    points: 0,
    voted: 0
  } as PostComment;
}
