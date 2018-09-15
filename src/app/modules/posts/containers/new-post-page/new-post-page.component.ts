import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../reducers/posts.reducer';

@Component({
  selector: 'app-new-post-page',
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.css']
})
export class NewPostPageComponent implements OnInit {

  constructor(private store: Store<fromStore.PostsState>) { }

  ngOnInit() {
  }

}
