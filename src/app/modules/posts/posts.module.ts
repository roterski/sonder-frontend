import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsApiService, VotesApiService } from './services';
import {
  PostShowPageComponent,
  NewPostPageComponent,
  PostsListPageComponent } from './containers';
import {
  CommentTreeComponent,
  PostItemComponent,
  VoteButtonsComponent } from './components';
import { SharedModule } from '../shared/shared.module';
import { postsPaginatorProvider } from './state';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    PostsListPageComponent,
    PostShowPageComponent,
    NewPostPageComponent,
    CommentTreeComponent,
    PostItemComponent,
    VoteButtonsComponent
  ],
  providers: [
    PostsApiService,
    VotesApiService,
    postsPaginatorProvider
  ]
})
export class PostsModule { }
