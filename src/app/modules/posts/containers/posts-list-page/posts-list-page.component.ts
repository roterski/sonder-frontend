import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../reducers/posts.reducer';

@Component({
  selector: 'app-posts-list-page',
  templateUrl: './posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.css']
})
export class PostsListPageComponent implements OnInit {

  constructor(private store: Store<fromStore.PostsState>) { }

  ngOnInit() {
  }

}
