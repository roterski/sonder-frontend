import { Injectable, OnInit } from '@angular/core';
import * as Facebook from 'nativescript-facebook';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { Observable, from, of } from 'rxjs';
import { map, catchError, exhaustMap} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { bindNodeCallback } from 'rxjs/internal/observable/bindNodeCallback';
import * as application from 'application';

const nsFacebook = require('nativescript-facebook');

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  constructor() {
  }

  ngOnInit() {
    application.on(application.launchEvent, function (args) {
      nsFacebook.init(environment.facebookAppId);
    });
  }

  facebookLogIn(): Observable<any> {
    return bindNodeCallback(Facebook.login)().pipe(
      map(data => data['token'])
    );
  }
}
