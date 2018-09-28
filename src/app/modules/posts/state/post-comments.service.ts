import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { PostCommentsStore, PostCommentsState } from './post-comments.store';
import { PostsApiService } from '../services';
import { PostComment } from './post-comment.model';
import { PostCommentsQuery } from './post-comments.query';
import { Observable, of } from 'rxjs';
import { tap, switchMap, combineLatest, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostCommentsService {

  constructor(
    private postCommentsStore: PostCommentsStore,
    private http: HttpClient,
    private postsApi: PostsApiService,
    private postCommentsQuery: PostCommentsQuery) {
  }

  getPostComments(postId: number) {
    const request = this.postsApi
      .getPostComments(postId)
      .pipe(
        tap((comments: PostComment[]) => this.postCommentsStore.addPostComments(comments, postId))
      );

    return this.postCommentsQuery.selectPostCommentsLoaded(postId).pipe(
      switchMap((loaded: boolean) => {
        return loaded ? this.postCommentsQuery.selectPostParentComments(postId) : request;
      })
    );
  }

}
