import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { PaginatorPlugin, PaginationResponse } from '@datorama/akita';
import { switchMap, map } from 'rxjs/operators';
import { Post } from '../../models';
import {
  PostsQuery,
  PostsService,
  POSTS_PAGINATOR,
  MyVotesService,
  MyVotesQuery } from '../../state';
import { combineLatest } from 'rxjs/internal/operators/combineLatest';

@Component({
  selector: 'app-posts-list-page',
  templateUrl: './posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.css']
})
export class PostsListPageComponent implements OnInit, OnDestroy {
  public posts$: Observable<Post[]>;
  public loading$: Observable<boolean>;
  public postVotes$: Observable<any>;
  public pagination$: Observable<PaginationResponse<Post>>;

  private perPage = 100;
  private subscriptions: Subscription[] = [];

  constructor(
    private postsQuery: PostsQuery,
    private postsService: PostsService,
    @Inject(POSTS_PAGINATOR) private paginatorRef: PaginatorPlugin<Post>,
    private myVotesService: MyVotesService,
    private myVotesQuery: MyVotesQuery
  ) { }

  ngOnInit() {
    this.loading$ = this.postsQuery.selectLoading().pipe(
      combineLatest(this.paginatorRef.isLoading$),
      map(([storeLoading, pageLoading]) => storeLoading && pageLoading)
    );
    this.postVotes$ = this.myVotesQuery.myPostVotes$;

    this.pagination$ = this.paginatorRef.pageChanges.pipe(
      switchMap((page) => {
        return this.paginatorRef.getPage(() => this.postsService.getPostsPage({ page, perPage: this.perPage }));
      })
    );

    this.subscriptions.push(this.myVotesService.getMyPostVotes().subscribe());
  }

  pageEvent(event: PageEvent) {
    event.pageIndex - event.previousPageIndex > 0 ? this.paginatorRef.nextPage() : this.paginatorRef.prevPage();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
