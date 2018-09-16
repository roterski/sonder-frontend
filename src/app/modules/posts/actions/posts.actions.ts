import { Action } from '@ngrx/store';
import { Post } from '../models/post.model';

export enum PostsActionTypes {
  LoadPosts = '[Posts] Load Posts',
  PostsLoaded = '[Posts] Posts Loaded',

  LoadPost = '[Posts] Load Post',
  PostLoaded = '[Posts] Post Loaded',

  CreatePost = '[Posts] Create Post',
  PostCreated = '[Posts] Post Created',
  PostCreationFailed = '[Posts] Post Creation Failed'
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
  constructor(public payload: { postId: number }) {}
}
export class PostLoaded implements Action {
  readonly type = PostsActionTypes.PostLoaded;
  constructor(public payload: { post: Post }) {}
}

export class CreatePost implements Action {
  readonly type = PostsActionTypes.CreatePost;
  constructor(public payload: { post: Post }) { }
}
export class PostCreated implements Action {
  readonly type = PostsActionTypes.PostCreated;
  constructor(public payload: { post: Post }) {}
}
export class PostCreationFailed implements Action {
  readonly type = PostsActionTypes.PostCreationFailed;
  constructor(public payload: { errors: any }) {}
}

export type PostsActions =
  | LoadPosts
  | PostsLoaded
  | LoadPost
  | PostLoaded
  | CreatePost
  | PostCreated
  | PostCreationFailed;
