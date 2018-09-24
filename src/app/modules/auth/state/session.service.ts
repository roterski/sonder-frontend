import { Injectable } from '@angular/core';
import { SessionStore } from './session.store';
import { AuthService, BackendService } from '../services';
import { map, tap, catchError, exhaustMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PostsService } from '../../posts/state';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(
    private sessionStore: SessionStore,
    private authService: AuthService,
    private backendService: BackendService,
    private postsService: PostsService) {
  }

  logIn(): Observable<boolean> {
    return this.authService.facebookLogIn().pipe(
      tap((facebookToken: string) => this.sessionStore.authenticateFacebook(facebookToken)),
      exhaustMap((facebookToken: string) => {
        return this.backendService.authenticate(facebookToken).pipe(
          tap((backendToken: string) => this.sessionStore.authenticateBackend(backendToken)),
          map(() => true)
        );
      }),
      catchError((error) => of(false))
    );
  }

  logOut() {
    this.sessionStore.logOut();
    this.postsService.clearStore();
  }

}
