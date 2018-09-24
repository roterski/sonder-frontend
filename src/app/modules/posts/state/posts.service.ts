import { Injectable } from '@angular/core';
import { ID, noop } from '@datorama/akita';
import { Post } from './post.model';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
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

  addPost(post: Post) {
    return this.postsApi
      .createPost(post)
      .pipe(
        tap((entity: Post) => this.postsStore.add(entity)),
        catchError((catchedError: any) => {
          const error = catchedError.error && catchedError.error.errors || catchedError;
          this.postsStore.setError(error);
          return of(false);
        })
      );
  }

  clearStore() {
    this.postsStore.constructor();
  }
}
