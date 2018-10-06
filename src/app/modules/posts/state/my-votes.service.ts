import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { MyVotesStore } from './my-votes.store';
import { HttpClient } from '@angular/common/http';
import { VotesApiService } from '../services';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MyVotesService {

  constructor(private myVotesStore: MyVotesStore,
              private votesApi: VotesApiService,
              private http: HttpClient) {
  }

  getMyPostVotes() {
    return this.votesApi
        .getPostVotes()
        .pipe(
          tap((votes) => this.myVotesStore.addPostVotes(votes))
        );
  }

  upvotePost(postId: ID) {
    return this.votesApi
      .upvote('posts', postId)
      .pipe(
        tap(vote => this.myVotesStore.addPostVote(vote))
      );
  }

  downvotePost(postId: ID) {
    return this.votesApi
      .downvote('posts', postId)
      .pipe(
        tap(vote => this.myVotesStore.addPostVote(vote))
      );
  }

  revokePostVote(postId: ID) {
    return this.votesApi
      .revokeVote('posts', postId)
      .pipe(
        tap(vote => this.myVotesStore.addPostVote(vote))
      );
  }

  upvoteComment(postId: ID) {
    return this.votesApi
      .upvote('comments', postId)
      .pipe(
      tap(vote => this.myVotesStore.addCommentVote(vote))
      );
  }

  downvoteComment(postId: ID) {
    return this.votesApi
      .downvote('comments', postId)
      .pipe(
      tap(vote => this.myVotesStore.addCommentVote(vote))
      );
  }

  revokeCommentVote(postId: ID) {
    return this.votesApi
      .revokeVote('comments', postId)
      .pipe(
      tap(vote => this.myVotesStore.addCommentVote(vote))
      );
  }
}
