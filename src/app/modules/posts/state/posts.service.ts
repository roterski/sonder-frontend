import { Injectable } from '@angular/core';
import { ID, noop } from '@datorama/akita';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post.model';
import { Observable, of } from 'rxjs';
import { tap, catchError, switchMap, map } from 'rxjs/operators';
import { PostsStore } from './posts.store';
import { PostsQuery } from './posts.query';
import { HttpClient } from '@angular/common/http';
import { PostsApiService } from '../services';

@Injectable({ providedIn: 'root' })
export class PostsService {

  constructor(
    private postsStore: PostsStore,
    private postsApi: PostsApiService,
    private postsQuery: PostsQuery,
    private route: ActivatedRoute) {
  }

  getPosts(): Observable<Post[]> {
    const request = this.postsApi
      .getPosts()
      .pipe(
        map(response => response.data),
        tap((posts: Post[]) => this.postsStore.addPosts(posts))
      );

    return this.postsQuery.loaded$.pipe(
      switchMap((loaded: boolean) => {
        return loaded ? this.postsQuery.selectAll() : request;
      })
    );
  }

  getPostsPage(paginationParams: { page?: number, perPage?: number } = {}) {
    return this.postsApi
      .getPosts(paginationParams)
      .pipe(
        tap((response) => this.postsStore.addPosts(response.data)),
        map((response) => {
          return {
            currentPage: response.page,
            perPage: response.perPage,
            total: response.totalEntries,
            lastPage: response.totalPages,
            data: response.data
          };
        })
      );
  }

  getPost(postId: number): Observable<Post> {
    const request = this.postsApi
      .getPost(postId)
      .pipe(tap((post: Post) => this.postsStore.add(post)));

    return this.postsQuery.selectEntity(postId)
      .pipe(
        switchMap((post: Post) => post === undefined ? request : of(post))
      );
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