import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState, getLoggedIn } from '../reducers/auth.reducer';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(getLoggedIn).pipe(
      switchMap((loggedIn: boolean) => {
        if (!loggedIn) { this.router.navigate(['/login']); }
        return of(loggedIn);
      })
    );
  }
}
