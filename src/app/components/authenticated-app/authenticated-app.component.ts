import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authenticated-app',
  templateUrl: './authenticated-app.component.html',
  styleUrls: ['./authenticated-app.component.scss']
})
export class AuthenticatedAppComponent implements OnInit {
  public loggedIn$: Observable<boolean>;

  constructor() { }

  ngOnInit() {
    // this.loggedIn$ = this.store.select(getLoggedIn);
  }

  logOut() {
    // this.store.dispatch(new LogOut());
  }
}
