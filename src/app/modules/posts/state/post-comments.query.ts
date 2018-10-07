import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PostCommentsStore, PostCommentsState } from './post-comments.store';
import { PostComment } from '../models/post-comment.model';
import { Observable, of } from 'rxjs';
import { map, switchMap, combineLatest } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostCommentsQuery extends QueryEntity<PostCommentsState, PostComment> {
  postCommentEntities$ = this.select((state: PostCommentsState) => state.entities);

  constructor(protected store: PostCommentsStore) {
    super(store);
  }

  selectPostCommentsLoaded(postId: number): Observable<boolean> {
    return this.select((state: PostCommentsState) => {
      return state.commentsByPost && state.commentsByPost[postId] && state.commentsByPost[postId].loaded;
    });
  }

  selectPostCommentsIds(postId: number) {
    return this.select((state: PostCommentsState) => {
      return state.commentsByPost && state.commentsByPost[postId] && state.commentsByPost[postId].ids;
    });
  }

  selectPostParentComments(postId: number) {
    return this.selectPostCommentsIds(postId).pipe(
      combineLatest(this.postCommentEntities$),
      map(([ids, entities], index) => (ids || []) && ids.map((id: number) => entities[id])),
      map(comments => comments.filter(comment => comment.parentIds.length === 0))
    );
  }
}
