import { Action, createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PostsActions, PostsActionTypes } from '../actions/posts.actions';
import { Post } from '../models/post.model';
import { getRouterState, RouterStateUrl } from '../../../store/app.reducers';

export interface PostsState {
  readonly posts: PostEntities;
}

export interface PostEntities extends EntityState<Post> {
  loaded: boolean;
}

export function sortByPoints(a: Post, b: Post): number {
  return b.points - a.points;
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  sortComparer: sortByPoints
});

export const initialState: PostsState = {
  posts: adapter.getInitialState({ loaded: false })
};

export function reducer(state = initialState, action: PostsActions): PostsState {
  switch (action.type) {
    case PostsActionTypes.PostsLoaded:
      return { ...state, posts: { ...adapter.upsertMany(action.payload.posts, state.posts), loaded: true } };
    case PostsActionTypes.PostLoaded:
      return { ...state, posts: adapter.upsertOne(action.payload.post, state.posts) };
    case PostsActionTypes.PostCreated:
      return { ...state, posts: adapter.upsertOne(action.payload.post, state.posts) };
    default:
      return state;
  }
}
export const getPosts = createSelector(createFeatureSelector<PostsState>('posts'), state => state);
export const getPostEntities = createSelector(getPosts, (state) => state.posts);
export const getPostsLoaded = createSelector(getPostEntities, (postEntities: PostEntities) => postEntities.loaded);

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(getPostEntities);
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
