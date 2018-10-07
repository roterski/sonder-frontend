import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { PostCommentsStore, PostCommentsState } from './post-comments.store';
import { PostsApiService } from '../services';
import { PostComment } from '../models/post-comment.model';
import { PostCommentsQuery } from './post-comments.query';
import { Observable, of } from 'rxjs';
import { tap, switchMap, combineLatest, map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostCommentsService {

  constructor(
    private postCommentsStore: PostCommentsStore,
    private postsApi: PostsApiService,
    private postCommentsQuery: PostCommentsQuery) {
  }

  getPostComments(postId: ID) {
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

  addPostComment(postId: ID, postComment: PostComment) {
    return this.postsApi
      .createComment(postId, postComment)
      .pipe(
        tap((entity: PostComment) => this.postCommentsStore.add(entity)),
        catchError((catchedError: any) => {
          const error = catchedError.error && catchedError.error.errors || catchedError;
          this.postCommentsStore.setPostCommentError(error);
          return of(false);
        })
      );
  }
}
