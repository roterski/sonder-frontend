import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './effects/posts.effects';
import { PostsListPageComponent } from './containers/posts-list-page/posts-list-page.component';
import { PostsService } from './services/posts.service';
import { MatListModule } from '@angular/material';
import { PostShowPageComponent } from './containers/post-show-page/post-show-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('posts', reducer),
    EffectsModule.forFeature([PostsEffects]),
    MatListModule
  ],
  declarations: [PostsListPageComponent, PostShowPageComponent],
  providers: [PostsService]
})
export class PostsModule { }
