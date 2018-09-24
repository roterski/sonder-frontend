import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// import { Post } from '../../models';
import { PostsQuery, Post, PostsService } from '../../state';

@Component({
  selector: 'app-posts-list-page',
  templateUrl: './posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.css']
})
export class PostsListPageComponent implements OnInit, OnDestroy {
  public posts$: Observable<Post[]>;
  public loading$: Observable<boolean>;
  private postSubscription: Subscription;

  constructor(private postsQuery: PostsQuery, private postsService: PostsService) { }

  ngOnInit() {
    this.postSubscription = this.postsService.getPosts().subscribe();
    this.posts$ = this.postsQuery.selectAll();
    this.loading$ = this.postsQuery.selectLoading();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
