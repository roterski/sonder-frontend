import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsListPageComponent } from './containers/posts-list-page/posts-list-page.component';
import { PostsApiService, VotesApiService } from './services';
import {
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTreeModule,
  MatIconModule } from '@angular/material';
import { PostShowPageComponent } from './containers/post-show-page/post-show-page.component';
import { NewPostPageComponent } from './containers/new-post-page/new-post-page.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CommentTreeComponent } from './components/comment-tree/comment-tree.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { VoteButtonsComponent } from './components/vote-buttons/vote-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  declarations: [
    PostsListPageComponent,
    PostShowPageComponent,
    NewPostPageComponent,
    PostFormComponent,
    CommentTreeComponent,
    PostItemComponent,
    VoteButtonsComponent
  ],
  providers: [
    PostsApiService,
    VotesApiService
  ]
})
export class PostsModule { }
