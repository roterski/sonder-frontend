import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsState, getSelectedPost } from '../../reducers/posts.reducer';
import { Post } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-show-page',
  templateUrl: './post-show-page.component.html',
  styleUrls: ['./post-show-page.component.css']
})
export class PostShowPageComponent implements OnInit {
  post$: Observable<any>;

  constructor(private store: Store<PostsState>) { }

  ngOnInit() {
    this.post$ = this.store.select(getSelectedPost);
  }

}
