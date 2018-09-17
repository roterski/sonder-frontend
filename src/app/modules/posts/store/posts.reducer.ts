import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PostsActions, PostsActionTypes } from './posts.actions';
import { Post, Comment } from '../models';
import { PostsState, PostEntities, initialState, postAdapter, commentAdapter } from './posts.interfaces';

export function reducer(state = initialState, action: PostsActions): PostsState {
  switch (action.type) {
    case PostsActionTypes.PostsLoaded:
      return { ...state, posts: { ...postAdapter.upsertMany(action.payload.posts, state.posts), loaded: true } };
    case PostsActionTypes.PostLoaded:
      return { ...state, posts: postAdapter.upsertOne(action.payload.post, state.posts) };
    case PostsActionTypes.CreatePost:
      return {
        ...state,
        newPost: {
          data: action.payload.post,
          errors: null
        }
      };
    case PostsActionTypes.PostCreated:
      return {
        ...state,
        posts: postAdapter.upsertOne(action.payload.post, state.posts),
        newPost: {
          data: new Post(),
          errors: null
        }
      };
    case PostsActionTypes.PostCreationFailed:
      return {
        ...state,
        newPost: {
          ...state.newPost,
          errors: action.payload.errors
        }
      };
    case PostsActionTypes.LoadPostComments:
      return {
        ...state,
        commentsByPost: {
          ...state.commentsByPost,
          [action.payload.postId]: {
            ...state.commentsByPost[action.payload.postId],
            loaded: false
          }
        }
      };
    case PostsActionTypes.PostCommentsLoaded:
      const commentIds = action.payload.comments.map((comment) => comment.id);
      return {
        ...state,
        comments: commentAdapter.upsertMany(action.payload.comments, state.comments),
        commentsByPost: {
          ...state.commentsByPost,
          [action.payload.postId]: {
            ids: commentIds,
            loaded: true
          }
        }
      };

    default:
      return state;
  }
}
