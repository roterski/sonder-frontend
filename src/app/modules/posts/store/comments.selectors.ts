import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PostsActions, PostsActionTypes } from './posts.actions';
import { Post, Comment } from '../models';
import { CommentIds, commentAdapter } from './posts.interfaces';
import { getPostsState } from './posts.selectors';

export const getCommentEntities = createSelector(getPostsState, (state) => state.comments);
const { selectIds, selectEntities, selectAll, selectTotal } = commentAdapter.getSelectors(getCommentEntities);
export const selectCommentIds = selectIds;
export const selectCommentEntities = selectEntities;
export const selectAllComments = selectAll;
export const selectCommentTotal = selectTotal;

export const getCommentsByPost = (postId) => {
  return createSelector(
    createSelector(getPostsState, (state) => state.commentsByPost),
    (commentsByPost) => commentsByPost[postId]
  );
};

export const getCommentsByPostLoaded = (postId) => {
  return createSelector(
    getCommentsByPost(postId),
    (commentsByPost: CommentIds) => commentsByPost.loaded
  );
};

export const getCommentsByPostIds = (postId) => {
  return createSelector(
    getCommentsByPost(postId),
    (commentsByPost: CommentIds) => commentsByPost.ids
  );
};

export const getComments = (postId) => {
  return createSelector(
    selectCommentEntities,
    getCommentsByPostIds(postId),
    (commentEntities, commentIds: number[]) => commentIds.map(id => commentEntities[id])
  );
};
