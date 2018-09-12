import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authRoutes } from './modules/auth/auth-routing.module';
import { AuthenticatedGuard } from './modules/auth/guards';

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
