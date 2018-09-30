import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// import { Post } from '../../models';
import { PostsQuery, Post, PostsService, MyVotesService, MyVotesQuery } from '../../state';

@Component({
  selector: 'app-posts-list-page',
  templateUrl: './posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.css']
})
export class PostsListPageComponent implements OnInit, OnDestroy {
  public posts$: Observable<Post[]>;
  public loading$: Observable<boolean>;
  public postVotes$: Observable<any>;

  private subscriptions: Subscription[] = [];

  constructor(
    private postsQuery: PostsQuery,
    private postsService: PostsService,
    private myVotesService: MyVotesService,
    private myVotesQuery: MyVotesQuery
  ) { }

  ngOnInit() {
    this.posts$ = this.postsService.getPosts();
    this.loading$ = this.postsQuery.selectLoading();
    this.postVotes$ = this.myVotesQuery.myPostVotes$;

    this.subscriptions.push(this.posts$.subscribe());
    this.subscriptions.push(this.myVotesService.getMyPostVotes().subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
