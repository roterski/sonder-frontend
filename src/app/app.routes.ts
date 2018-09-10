import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authRoutes } from './auth/auth-routing.module';
import { AuthenticatedGuard } from './auth/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'login',
    children: authRoutes
  }
];
