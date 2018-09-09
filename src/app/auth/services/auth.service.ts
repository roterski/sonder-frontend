import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookService, InitParams, AuthResponse } from 'ngx-facebook';
import { Observable, from, of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private facebookService: FacebookService) {
    const params: InitParams = {
      version: 'v2.10',
      appId: '897988177030305'
    };
    facebookService.init(params);
  }

  facebookLogIn(): Observable<any> {
    return from(this.facebookService.getLoginStatus())
      .pipe(
        map((data: any) => data.status === 'connected' ? of(data) : from(this.facebookService.login())),
        map((data: any) => data.authResponse.accessToken),
        catchError(error => Observable.throw(error.json()))
      );
  }
}
