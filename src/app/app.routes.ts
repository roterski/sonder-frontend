import { Routes } from '@angular/router';
import { AuthenticatedAppComponent } from './containers';
import { authRoutes } from './modules/auth/auth-routing.module';
import { postsRoutes } from './modules/posts/posts-routing.module';
import { AuthenticatedGuard } from './modules/auth/guards';

export const routes: Routes = [
  {
    path: '',
    component: AuthenticatedAppComponent,
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'posts'
      },
      {
        path: 'posts',
        children: postsRoutes
      }
    ]
  },
  {
    path: 'login',
    children: authRoutes
  }
];
