import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models';

@Component({
  selector: 'app-posts-list-page',
  templateUrl: './posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.css']
})
export class PostsListPageComponent implements OnInit {
  public posts$: Observable<Post[]>;

  constructor() { }

  ngOnInit() {
    // this.posts$ = this.store.select(selectAllPosts);
  }

}
