import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PostsActionTypes } from '../actions/posts.actions';

@Injectable()
export class PostsEffects {

  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(PostsActionTypes.LoadPostss));

  constructor(private actions$: Actions) {}
}
