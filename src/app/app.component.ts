import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState, getLoggedIn } from './modules/auth/reducers/auth.reducer';
import { LogOut } from './modules/auth/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public loggedIn$: Observable<boolean>;

  constructor(private store: Store<AuthState>) { }

  ngOnInit() {
    this.loggedIn$ = this.store.select(getLoggedIn);
  }

  logOut() {
    this.store.dispatch(new LogOut());
  }
}
