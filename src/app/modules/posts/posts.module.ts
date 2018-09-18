import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { reducer, PostsEffects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { PostsListPageComponent } from './containers/posts-list-page/posts-list-page.component';
import { PostsService } from './services/posts.service';
import {
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTreeModule } from '@angular/material';
import { PostShowPageComponent } from './containers/post-show-page/post-show-page.component';
import { NewPostPageComponent } from './containers/new-post-page/new-post-page.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CommentTreeComponent } from './components/comment-tree/comment-tree.component';
import { PostItemComponent } from './components/post-item/post-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('posts', reducer),
    EffectsModule.forFeature([PostsEffects]),
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTreeModule,
    ReactiveFormsModule
  ],
  declarations: [PostsListPageComponent, PostShowPageComponent, NewPostPageComponent, PostFormComponent, CommentTreeComponent, PostItemComponent],
  providers: [PostsService]
})
export class PostsModule { }
