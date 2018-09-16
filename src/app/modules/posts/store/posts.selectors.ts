import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import { getRouterState, RouterStateUrl } from '../../../store/app.reducers';
import { PostsState, postAdapter, PostEntities } from './posts.interfaces';

export const getPostsState = createSelector(createFeatureSelector<PostsState>('posts'), state => state);
export const getPostEntities = createSelector(getPostsState, (state) => state.posts);
export const getPostsLoaded = createSelector(getPostEntities, (postEntities: PostEntities) => postEntities.loaded);

const { selectIds, selectEntities, selectAll, selectTotal } = postAdapter.getSelectors(getPostEntities);
export const selectPostIds = selectIds;
export const selectPostEntities = selectEntities;
export const selectAllPosts = selectAll;
export const selectPostTotal = selectTotal;

export const selectPostByPostId = (postId: number) => {
  return createSelector(selectPostEntities, (postsEntites) => {
    return postsEntites[postId] === undefined ? false : true;
  });
};

const parsePostIdFromRouter = (router: { state: RouterStateUrl }): string | null => {
  const matched = router && router.state && router.state.url && router.state.url.match(/^\/posts\/(?<postId>\d+)/);
  return matched && matched['groups'] && matched['groups'].postId;
};

export const getSelectedPost = createSelector(
  selectPostEntities,
  getRouterState,
  (postsEntites, router) => {
    // TODO: make router parse params on its own
    const postId = parsePostIdFromRouter(router);
    if (postId) { return postsEntites[postId]; }
  }
);

export const getNewPost = createSelector(getPostsState, (state) => state.newPost);
export const getNewPostData = createSelector(getNewPost, (newPost) => newPost.data);
export const getNewPostErrors = createSelector(getNewPost, (newPost) => newPost.errors);
