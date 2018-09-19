import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap, filter, take, catchError } from 'rxjs/operators';
import { PostsState, getPostVotesLoaded, LoadPostVotes } from '../store';

@Injectable({
  providedIn: 'root'
})
export class PostVotesLoadedGuard implements CanActivate {
  constructor(private store: Store<PostsState>) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(getPostVotesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadPostVotes());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
