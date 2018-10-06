import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, filter, map, tap, combineLatest, catchError } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import {
  PostsQuery,
  PostsService,
  PostCommentsQuery,
  PostCommentsService,
  MyVotesQuery } from '../../state';
import { Post, PostComment } from '../../models';

@Component({
  selector: 'app-post-show-page',
  templateUrl: './post-show-page.component.html',
  styleUrls: ['./post-show-page.component.css']
})
export class PostShowPageComponent implements OnInit, OnDestroy {
  post$: Observable<Post>;
  comments$: Observable<PostComment[]>;
  commentsLoaded$: Observable<boolean>;
  commentEntities$: Observable<any>;
  commentVotes$: Observable<any>;

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsQuery: PostsQuery,
    private postCommentsQuery: PostCommentsQuery,
    private postCommentsService: PostCommentsService,
    private postsService: PostsService,
    private myVotesQuery: MyVotesQuery) {
  }

  ngOnInit() {
    const postId$ = this.route.params.pipe(
      map((params: { postId: string }) => parseInt(params.postId, 10))
    );

    this.subscriptions.push(postId$.subscribe((postId: number) => {
      this.post$ = this.postsService.getPost(postId);
      this.comments$ = this.postCommentsService.getPostComments(postId);
      this.subscriptions.push(this.comments$.subscribe());
      this.commentsLoaded$ = this.postCommentsQuery.selectPostCommentsLoaded(postId);
      this.commentEntities$ = this.postCommentsQuery.postCommentEntities$;
      this.commentVotes$ = this.myVotesQuery.selectCommentVotes(postId);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
