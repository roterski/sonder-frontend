import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, filter, map, tap, combineLatest, catchError } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { Post, PostComment, PostsQuery, PostsService, PostCommentsQuery, PostCommentsService } from '../../state';

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

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsQuery: PostsQuery,
    private postCommentsQuery: PostCommentsQuery,
    private postCommentsService: PostCommentsService,
    private postsService: PostsService) {
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
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
