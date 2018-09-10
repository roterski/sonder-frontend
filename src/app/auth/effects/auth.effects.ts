import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, AuthActions, FacebookAuthenticated, AuthenticationFailed } from '../actions/auth.actions';
import { map, tap, catchError, } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  logIn$ = this.actions$.pipe(
    ofType(AuthActionTypes.LogIn),
    tap(() => {
      this.authService.facebookLogIn().pipe(
        catchError((error: any) => of(this.store.dispatch(new AuthenticationFailed())))
      ).subscribe(accessToken => this.store.dispatch(new FacebookAuthenticated(accessToken)));
    })
  );

  constructor(private actions$: Actions, private authService: AuthService, private store: Store<AuthState>) {}
}
