import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromPosts from './reducers/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './effects/posts.effects';
import { PostsListPageComponent } from './containers/posts-list-page/posts-list-page.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('posts', fromPosts.reducer),
    EffectsModule.forFeature([PostsEffects])
  ],
  declarations: [PostsListPageComponent]
})
export class PostsModule { }
