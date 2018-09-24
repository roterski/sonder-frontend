import { Injectable } from '@angular/core';
import { ID, noop } from '@datorama/akita';
import { Post } from './post.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PostsStore } from './posts.store';
import { PostsQuery } from './posts.query';
import { HttpClient } from '@angular/common/http';
import { PostsApiService } from '../services';

@Injectable({ providedIn: 'root' })
export class PostsService {

  constructor(
    private postsStore: PostsStore,
    private postsApi: PostsApiService,
    private postsQuery: PostsQuery) {
  }

  getPosts(): Observable<Post[]> {
    const request = this.postsApi
      .getPosts()
      .pipe(tap((entities) => this.postsStore.set(entities)));
    return this.postsQuery.isPristine ? request : noop();
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.postsStore.add(entity);
    // });
  }

  clearStore() {
    this.postsStore.constructor();
  }
}
