import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { map, catchError, concat, mergeMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) { }

  get(path: string): Observable<any> {
    return this.performAuthenticatedRequest(headers => {
      return this.http.get(this.url(path), headers);
    });
  }

  post(path: string, data: any = {}): Observable<any> {
    return this.performAuthenticatedRequest(headers => {
      return this.http.post(this.url(path), data, headers);
    });
  }

  put(path: string, data: any = {}): Observable<any> {
    return this.performAuthenticatedRequest(headers => {
      return this.http.put(this.url(path), data, headers);
    });
  }

  authenticate(accessToken: string): Observable<any> {
    return this.http
      .post(this.url('/authenticate'), { access_token: accessToken }, this.staticHeaders())
      .pipe(
        map((response: any) => response.auth_token),
        catchError(error => this.rethrow(error))
      );
  }

  private performAuthenticatedRequest(requestMethod): Observable<any> {
      return of(false);
    // return this.store.select(getBackendAuthToken).pipe(
    //   switchMap((token: string) => {
    //     return requestMethod(this.headers(token)).pipe(
    //       catchError(error => {
    //         if (error.status == '401') {
    //           // this.store.dispatch(new AuthenticationFailed());
    //         }
    //         return this.rethrow(error);
    //       })
    //     );
    //   })
    // );
  }

  private url(path) {
    return `${this.apiRoot()}${path}`;
  }

  private apiRoot(): string {
    return `${environment.backendUrl}/api`;
  }

  private staticHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
  }

  private rethrow(error) {
    return throwError('json' in error ? error.json() : error);
  }

  private headers(accessToken: string) {
    return {
      headers: {
        ...this.staticHeaders().headers,
        Authorization: accessToken
      }
    };
  }
}
