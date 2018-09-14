import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../reducers/posts.reducer';

@Component({
  selector: 'app-post-show-page',
  templateUrl: './post-show-page.component.html',
  styleUrls: ['./post-show-page.component.css']
})
export class PostShowPageComponent implements OnInit {

  constructor(private store: Store<fromStore.PostsState>) { }

  ngOnInit() {
  }

}
