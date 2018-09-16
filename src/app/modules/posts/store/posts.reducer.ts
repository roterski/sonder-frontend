import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PostsActions, PostsActionTypes } from './posts.actions';
import { Post, Comment } from '../models';
import { PostsState, PostEntities, initialState, postAdapter } from './posts.interfaces';

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
    default:
      return state;
  }
}
