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

  @Effect()
  logIn$ = this.actions$.pipe(
    ofType(AuthActionTypes.LogIn),
    tap(() => {
      this.authService.facebookLogIn().pipe(
        map((accessToken: string) => this.store.dispatch(new FacebookAuthenticated(accessToken))),
        catchError((error: any) => of(this.store.dispatch(new AuthenticationFailed())))
      );
    })
  );

  constructor(private actions$: Actions, private authService: AuthService, private store: Store<AuthState>) {}
}
