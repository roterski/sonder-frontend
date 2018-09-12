import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AuthActionTypes,
  AuthActions,
  FacebookAuthenticated,
  AuthenticationFailed,
  LoggedIn,
  LogOut,
  LoggedOut } from '../actions/auth.actions';
import { map, tap, catchError, } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  logIn$ = this.actions$.pipe(
    ofType(AuthActionTypes.LogIn),
    tap(() => {
      this.authService
          .facebookLogIn()
          .subscribe(accessToken => this.store.dispatch(new FacebookAuthenticated(accessToken)));
    }),
    catchError((error: any) => of(this.store.dispatch(new AuthenticationFailed())))
  );

  @Effect({ dispatch: false })
  facebookAuthenticated$ = this.actions$.pipe(
    ofType(AuthActionTypes.FacebookAuthenticated),
    tap((action: FacebookAuthenticated) => {
      this.backendService
          .authenticate(action.payload)
          .subscribe((data: any) => this.store.dispatch(new LoggedIn(data)));
    }),
    catchError((error: any) => of(this.store.dispatch(new AuthenticationFailed())))
  );

  @Effect({ dispatch: false })
  logOut = this.actions$.pipe(
    ofType(AuthActionTypes.LogOut),
    tap(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.store.dispatch(new LoggedOut());
    })
  );

  @Effect({ dispatch: false })
  loggedIn = this.actions$.pipe(
    ofType(AuthActionTypes.LoggedIn),
    tap(() => this.router.navigate(['/']))
  );

  @Effect()
  authenticationFailed = this.actions$.pipe(
    ofType(AuthActionTypes.AuthenticationFailed),
    tap(() => this.router.navigate(['/']))
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private backendService: BackendService,
    private store: Store<AuthState>,
    private router: Router) {}
}
