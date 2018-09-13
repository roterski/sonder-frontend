import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticatedAppComponent } from './components/authenticated-app/authenticated-app.component';
import { authRoutes } from './modules/auth/auth-routing.module';
import { AuthenticatedGuard } from './modules/auth/guards';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticatedAppComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'login',
    children: authRoutes
  }
];
