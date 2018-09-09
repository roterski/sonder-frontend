import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LogIn = '[Auth] Log In',
  AuthenticationFailed = '[Auth] Authentication Failed',
  FacebookAuthenticated = '[Auth] Facebook Authenticated',
  AuthenticateBackend = '[Auth] Authenticate Backend',
  LoggedIn = '[Auth] Logged In'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LogIn;
}

export class AuthenticationFailed implements Action {
  readonly type = AuthActionTypes.AuthenticationFailed;
}

export class FacebookAuthenticated implements Action {
  readonly type = AuthActionTypes.FacebookAuthenticated;
  constructor(public payload: any) { }
}

export class AuthenticateBackend implements Action {
  readonly type = AuthActionTypes.AuthenticateBackend;
}

export class LoggedIn implements Action {
  readonly type = AuthActionTypes.LoggedIn;
  constructor(public payload: any) { }
}

export type AuthActions = LogIn | AuthenticationFailed | LoggedIn | FacebookAuthenticated | AuthenticateBackend;
