import { ID } from '@datorama/akita';
import { Author } from './../models';

export interface Post {
  id: ID;
  title: string;
  body: string;
  author: Author;
  points: number;
  voted: number;
  commentCount: number;
}

export function createPost(params: Partial<Post>) {
  return {
    title: '',
    body: ''
  } as Post;
}
