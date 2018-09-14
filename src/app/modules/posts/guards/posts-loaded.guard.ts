import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap, filter, take, catchError } from 'rxjs/operators';
import { PostsState, getPostsLoaded } from '../reducers/posts.reducer';
import { LoadPosts } from '../actions/posts.actions';

@Injectable({
  providedIn: 'root'
})
export class PostsLoadedGuard implements CanActivate {
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
    return this.store.select(getPostsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadPosts());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
