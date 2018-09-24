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
  PostFormComponent,
  CommentTreeComponent,
  PostItemComponent,
  VoteButtonsComponent } from './components';
import { SharedModule } from '../shared/shared.module';

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
