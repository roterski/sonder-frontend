import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState, getLoggedIn } from '../../modules/auth/reducers/auth.reducer';
import { LogOut } from '../../modules/auth/actions/auth.actions';

@Component({
  selector: 'app-authenticated-app',
  templateUrl: './authenticated-app.component.html',
  styleUrls: ['./authenticated-app.component.scss']
})
export class AuthenticatedAppComponent implements OnInit {
  public loggedIn$: Observable<boolean>;

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
    this.loggedIn$ = this.store.select(getLoggedIn);
  }

  logOut() {
    this.store.dispatch(new LogOut());
  }
}
