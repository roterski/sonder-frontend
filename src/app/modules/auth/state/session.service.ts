import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { SessionStore } from './session.store';
import { AuthService, BackendService } from '../services';
import { map, tap, catchError, exhaustMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private sessionStore: SessionStore,
    private authService: AuthService,
    private backendService: BackendService) {
  }

  logIn(): Observable<boolean> {
    return this.authService.facebookLogIn().pipe(
      exhaustMap((facebookToken: string) => {
        this.sessionStore.authenticateFacebook(facebookToken);
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
  }

}
