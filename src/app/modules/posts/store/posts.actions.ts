import { Action } from '@ngrx/store';
import { Post, Comment, Vote } from '../models';

export enum PostsActionTypes {
  LoadPosts = '[Posts] Load Posts',
  PostsLoaded = '[Posts] Posts Loaded',

  LoadPost = '[Posts] Load Post',
  PostLoaded = '[Posts] Post Loaded',

  CreatePost = '[Posts] Create Post',
  PostCreated = '[Posts] Post Created',
  PostCreationFailed = '[Posts] Post Creation Failed',

  LoadPostComments = '[Posts] Load Post Comments',
  PostCommentsLoaded = '[Posts] Post Comments Loaded',

  CreateComment = '[Posts] Create Comment',
  CommentCreated = '[Posts] Comment Created',

  UpvotePost = '[Posts] Upvote Post',
  PostUpvoted = '[Posts] Post Upvoted',

  DownvotePost = '[Posts] Downvote Post',
  PostDownvoted = '[Posts] Post Downvoted',

  RevokePostVote = '[Posts] Revoke Post Vote',
  PostVoteRevoked = '[Posts] Post Vote Revoked',

  LoadPostVotes = '[Posts] Load Post Votes',
  PostVotesLoaded = '[Posts] Post Votes Loaded'
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

export class LoadPostComments implements Action {
  readonly type = PostsActionTypes.LoadPostComments;
  constructor(public payload: { postId: number }) {}
}
export class PostCommentsLoaded implements Action {
  readonly type = PostsActionTypes.PostCommentsLoaded;
  constructor(public payload: { comments: Comment[], postId: number }) {}
}

export class CreateComment implements Action {
  readonly type = PostsActionTypes.CreateComment;
  constructor(public payload: { comment: Comment, postId: number }) {}
}
export class CommentCreated implements Action {
  readonly type = PostsActionTypes.CommentCreated;
  constructor(public payload: { comment: Comment, postId: number }) {}
}

export class UpvotePost implements Action {
  readonly type = PostsActionTypes.UpvotePost;
  constructor(public payload: { postId: number }) { }
}
export class PostUpvoted implements Action {
  readonly type = PostsActionTypes.PostUpvoted;
  constructor(public payload: { postId: number, points: number }) { }
}

export class DownvotePost implements Action {
  readonly type = PostsActionTypes.DownvotePost;
  constructor(public payload: { postId: number }) { }
}
export class PostDownvoted implements Action {
  readonly type = PostsActionTypes.PostDownvoted;
  constructor(public payload: { postId: number, points: number }) { }
}

export class RevokePostVote implements Action {
  readonly type = PostsActionTypes.RevokePostVote;
  constructor(public payload: { postId: number }) { }
}
export class PostVoteRevoked implements Action {
  readonly type = PostsActionTypes.PostVoteRevoked;
  constructor(public payload: { postId: number, points: number }) { }
}

export class LoadPostVotes implements Action {
  readonly type = PostsActionTypes.LoadPostVotes;
}
export class PostVotesLoaded implements Action {
  readonly type = PostsActionTypes.PostVoteRevoked;
  constructor(public payload: { votes: Vote[] }) { }
}

export type PostsActions =
  | LoadPosts
  | PostsLoaded
  | LoadPost
  | PostLoaded
  | CreatePost
  | PostCreated
  | PostCreationFailed
  | LoadPostComments
  | PostCommentsLoaded
  | CreateComment
  | CommentCreated
  | UpvotePost
  | PostUpvoted
  | DownvotePost
  | PostDownvoted
  | RevokePostVote
  | PostVoteRevoked;
