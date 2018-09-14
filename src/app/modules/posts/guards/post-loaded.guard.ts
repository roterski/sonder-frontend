import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import { PostsState, selectPostByPostId } from '../reducers/posts.reducer';
import { LoadPost } from '../actions/posts.actions';

@Injectable({
  providedIn: 'root'
})
export class PostLoadedGuard implements CanActivate {
  constructor(private store: Store<PostsState>) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore(next.params.postId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(postId: number): Observable<boolean> {
    return this.store.select(selectPostByPostId(postId)).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadPost({ postId: postId }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
