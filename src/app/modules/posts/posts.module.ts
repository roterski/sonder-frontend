import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './effects/posts.effects';
import { PostsListPageComponent } from './containers/posts-list-page/posts-list-page.component';
import { PostsService } from './services/posts.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('posts', reducer),
    EffectsModule.forFeature([PostsEffects])
  ],
  declarations: [PostsListPageComponent],
  providers: [PostsService]
})
export class PostsModule { }
