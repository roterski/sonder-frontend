import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListPageComponent, PostShowPageComponent } from './containers';
import { PostsLoadedGuard, PostLoadedGuard } from './guards';

export const postsRoutes: Routes = [
  {
    path: '',
    canActivate: [PostsLoadedGuard],
    component: PostsListPageComponent
  },
  // {
  //   path: "new",
  //   canActivate: [AcceptedGroupsLoadedGuard],
  //   component: NewPostFormComponent
  // },
  {
    path: ':postId',
    canActivate: [PostLoadedGuard, /* TODO: PostCommentsLoadedGuard*/],
    component: PostShowPageComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
