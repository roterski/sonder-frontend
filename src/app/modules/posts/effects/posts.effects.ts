import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PostsActionTypes, PostsLoaded, CreatePost, PostCreated, LoadPost, PostLoaded, PostCreationFailed, LoadPosts } from '../actions/posts.actions';
import { map, tap, catchError, exhaustMap, mergeMap, switchMap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Post } from '../models';
import { PostsService } from '../services/posts.service';
import { PostsState } from '../reducers/posts.reducer';
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

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private router: Router,
    private store: Store<PostsState>) {}
}
