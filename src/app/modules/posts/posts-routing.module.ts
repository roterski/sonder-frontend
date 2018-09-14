import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListPageComponent } from './containers/posts-list-page/posts-list-page.component';
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
    component: PostShowComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
