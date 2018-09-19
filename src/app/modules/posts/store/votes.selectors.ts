import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import { PostsState, PostVotes } from './posts.interfaces';
import { getPostsState } from './posts.selectors';

export const getPostVotes = createSelector(getPostsState, (state) => state.postVotes);
export const getPostVotesLoaded = createSelector(getPostVotes, (postVotes: PostVotes) => postVotes.loaded);
