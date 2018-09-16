import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PostsActionTypes, PostsLoaded, CreatePost, PostCreated, LoadPost, PostLoaded } from '../actions/posts.actions';
import { map, tap, catchError, exhaustMap } from 'rxjs/operators';
import { Post } from '../models';
import { PostsService } from '../services/posts.service';
import { PostsState } from '../reducers/posts.reducer';

@Injectable()
export class PostsEffects {

  @Effect({ dispatch: false })
  loadPosts$ = this.actions$.pipe(
    ofType(PostsActionTypes.LoadPosts),
    tap(() => {
      this.postsService
          .getPosts()
          .subscribe((posts: Post[]) => this.store.dispatch(new PostsLoaded({ posts })));
    })
  );

  @Effect({ dispatch: false })
  loadPost$ = this.actions$.pipe(
    ofType(PostsActionTypes.LoadPost),
    tap((action: LoadPost) => {
      this.postsService
          .getPost(action.payload.postId)
          .subscribe((post: Post) => this.store.dispatch(new PostLoaded({ post })));
    })
  );

  @Effect()
  createPost$ = this.actions$.pipe(
    ofType(PostsActionTypes.CreatePost),
    exhaustMap((action: CreatePost) => {
      return this.postsService
                 .createPost(action.payload.post);
    }),
    map(post => new PostCreated({ post }))
  );

  constructor(private actions$: Actions, private postsService: PostsService, private store: Store<PostsState>) {}
}
