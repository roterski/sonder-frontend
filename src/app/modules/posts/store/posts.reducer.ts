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
      const comments = action.payload.comments;
      const commentIds = comments.map((comment) => comment.id);
      const commentEntities = commentAdapter.upsertMany(comments, state.comments);
      appendChildrenIds(commentEntities.entities);

      return {
        ...state,
        comments: commentEntities,
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

function appendChildrenIds(entities) {
  Object.keys(entities).forEach((id) => {
    const entity = entities[id];
    entity.childrenIds = entity.childrenIds || [];
    const parentId = entities[id].parentIds.slice(-1)[0];
    if (parentId) {
      const childrenIds = [parseInt(id, 10), ...entities[parentId].childrenIds];
      entities[parentId].childrenIds = Array.from(new Set(childrenIds)); // unique values
    }
  });
}
