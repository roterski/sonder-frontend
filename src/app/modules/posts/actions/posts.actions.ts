import { Action } from '@ngrx/store';
import { Post } from '../models/post.model';

export enum PostsActionTypes {
  LoadPosts = '[Posts] Load Posts',
  PostsLoaded = '[Posts] Posts Loaded',

  LoadPost = '[Posts] Load Post',
  PostLoaded = '[Posts] Post Loaded',

  CreatePost = '[Posts] Create Post',
  PostCreated = '[Posts] Post Created'
}

export class LoadPosts implements Action {
  readonly type = PostsActionTypes.LoadPosts;
}
export class PostsLoaded implements Action {
  readonly type = PostsActionTypes.PostsLoaded;
  constructor(public payload: { posts: Post[]}) {}
}

export class LoadPost implements Action {
  readonly type = PostsActionTypes.LoadPost;
}
export class PostLoaded implements Action {
  readonly type = PostsActionTypes.PostLoaded;
  constructor(public payload: { post: Post }) {}
}

export class CreatePost implements Action {
  readonly type = PostsActionTypes.CreatePost;
}
export class PostCreated implements Action {
  readonly type = PostsActionTypes.PostCreated;
  constructor(public payload: { post: Post }) {}
}

export type PostsActions =
  | LoadPosts
  | PostsLoaded
  | LoadPost
  | PostLoaded
  | CreatePost
  | PostCreated;
