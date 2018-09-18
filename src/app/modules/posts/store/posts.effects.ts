import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  PostsActionTypes,
  PostsLoaded,
  CreatePost,
  PostCreated,
  LoadPost,
  PostLoaded,
  PostCreationFailed,
  LoadPosts,
  LoadPostComments,
  PostCommentsLoaded,
  UpvotePost,
  PostUpvoted,
  DownvotePost,
  PostDownvoted,
  RevokePostVote,
  PostVoteRevoked } from './posts.actions';
import { map, tap, catchError, exhaustMap, mergeMap, switchMap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Post, Comment } from '../models';
import { PostsService } from '../services/posts.service';
import { PostsState } from './posts.interfaces';
import { Router } from '@angular/router';

@Injectable()
export class PostsEffects {

  @Effect({ dispatch: false })
  loadPosts$ = this.actions$.pipe(
    ofType(PostsActionTypes.LoadPosts),
    switchMap((action: LoadPosts) => {
      return this.postsService
        .getPosts()
        .pipe(tap((posts: Post[]) => this.store.dispatch(new PostsLoaded({ posts }))));
    })
  );

  @Effect({ dispatch: false })
  loadPost$ = this.actions$.pipe(
    ofType(PostsActionTypes.LoadPost),
    switchMap((action: LoadPost) => {
      return this.postsService
        .getPost(action.payload.postId)
        .pipe(tap((post: Post) => this.store.dispatch(new PostLoaded({ post }))));
    })
  );

  @Effect({ dispatch: false })
  createPost$ = this.actions$.pipe(
    ofType(PostsActionTypes.CreatePost),
    exhaustMap((action: CreatePost) => {
      return this.postsService.createPost(action.payload.post).pipe(
        map((post) => this.store.dispatch(new PostCreated({ post }))),
        catchError(errors => {
          const error = errors.error && errors.error.errors || errors;
          this.store.dispatch(new PostCreationFailed({ errors: error }));
          return of(errors);
        })
      );
    })
  );

  @Effect({ dispatch: false })
  postCreated$ = this.actions$.pipe(
    ofType(PostsActionTypes.PostCreated),
    exhaustMap((action: PostCreated) => this.router.navigate(['/posts']))
  );

  @Effect({ dispatch: false })
  loadPostComments$ = this.actions$.pipe(
    ofType(PostsActionTypes.LoadPostComments),
    map((action: LoadPostComments) => action.payload.postId),
    switchMap((postId: number) => {
      return this.postsService
        .getPostComments(postId)
        .pipe(
          tap((comments: Comment[]) => {
            return this.store.dispatch(new PostCommentsLoaded({ comments, postId }));
          })
        );
    })
  );

  @Effect()
  upvotePost$ = this.actions$.pipe(
    ofType(PostsActionTypes.UpvotePost),
    map((action: UpvotePost) => action.payload.postId),
    mergeMap((postId: number) => {
      return this.postsService
        .upvote('posts', postId)
        .pipe(map(data => new PostUpvoted({ postId, points: data.points })));
    })
  );

  @Effect()
  downvotePost$ = this.actions$.pipe(
    ofType(PostsActionTypes.DownvotePost),
    map((action: DownvotePost) => action.payload.postId),
    mergeMap((postId: number) => {
      return this.postsService
        .downvote('posts', postId)
        .pipe(map(data => new PostDownvoted({ postId, points: data.points })));
    })
  );

  @Effect()
  revotePostVote$ = this.actions$.pipe(
    ofType(PostsActionTypes.RevokePostVote),
    map((action: RevokePostVote) => action.payload.postId),
    mergeMap((postId: number) => {
      return this.postsService
        .revokeVote('posts', postId)
        .pipe(map(data => new PostVoteRevoked({ postId, points: data.points })));
    })
  );

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private router: Router,
    private store: Store<PostsState>) {}
}
