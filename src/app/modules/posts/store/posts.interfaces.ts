import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Post, Comment } from '../models';

export interface PostsState {
  readonly posts: PostEntities;
  readonly comments: CommentEntities;
  readonly commentsByPost: { [postId: number]: CommentIds };
  readonly newPost: NewPost;
}

export interface PostEntities extends EntityState<Post> {
  loaded: boolean;
}

export interface CommentEntities extends EntityState<Comment> {
}

export interface CommentIds {
  ids: Array<number>;
  loaded: boolean;
}

export interface NewPost {
  data: Post;
  errors: any;
}

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  sortComparer: sortByPoints
});

export const commentAdapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
  sortComparer: sortByPoints
});

export const initialState: PostsState = {
  posts: postAdapter.getInitialState({ loaded: false }),
  comments: commentAdapter.getInitialState(),
  commentsByPost: {},
  newPost: {
    data: new Post(),
    errors: null
  }
};

export function sortByPoints(a: Post | Comment, b: Post | Comment): number {
  return b.points - a.points;
}
