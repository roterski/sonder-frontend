import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostsState, selectAllPosts } from '../../reducers/posts.reducer';
import { Post } from '../../models';

@Component({
  selector: 'app-posts-list-page',
  templateUrl: './posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.css']
})
export class PostsListPageComponent implements OnInit {
  public posts$: Observable<Post[]>;

  constructor(private store: Store<PostsState>) { }

  ngOnInit() {
    this.posts$ = this.store.select(selectAllPosts);
  }

}
