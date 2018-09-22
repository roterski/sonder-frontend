import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
// import * as storage from '../storage';

export interface SessionState {
  facebookAccessToken: string;
  backendAuthToken: string;
}

export function createInitialState(): SessionState {
  return {
    facebookAccessToken: null,
    backendAuthToken: null,
    // ...storage.getSession()
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

  authenticateFacebook(facebookAccessToken: string) {
    this.update({ facebookAccessToken });
    // storage.saveSession({ facebookAccessToken });
  }

  authenticateBackend(backendAuthToken: string) {
    this.update({ backendAuthToken });
    // storage.saveSession({ backendAuthToken });
  }

  logOut() {
    // storage.clearSession();
    this.update(createInitialState());
  }
}
