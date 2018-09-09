import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  loggedIn: boolean;
  loading: boolean;
  facebookAccessToken: string;
  backendAuthToken: string;
}

export const initialState: AuthState = {
  loggedIn: false,
  loading: false,
  facebookAccessToken: null,
  backendAuthToken: null,
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LogIn: {
      return {
        ...state,
        ...{
          loading: true,
          loggedIn: false
        }
      };
    }
    case AuthActionTypes.AuthenticationFailed: {
      return {
        ...state,
        ...{
          facebookAccessToken: null,
          loading: false,
          loggedIn: false
        }
      };
    }
    case AuthActionTypes.FacebookAuthenticated: {
      return {
        ...state,
        ...{
          facebookAccessToken: action.payload,
          loading: true,
          loggedIn: false
        }
      };
    }
    case AuthActionTypes.LoggedIn: {
      return {
        ...state,
        ...{
          backendAuthToken: action.payload,
          loading: false,
          loggedIn: true
        }
      };
    }
    default:
      return state;
  }
}
