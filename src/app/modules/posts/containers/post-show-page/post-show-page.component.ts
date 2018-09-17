import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsState, getSelectedPost, getPostCommentEntities, getPostComments } from '../../store';
import { Post, Comment } from '../../models';
import { switchMap, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-post-show-page',
  templateUrl: './post-show-page.component.html',
  styleUrls: ['./post-show-page.component.css']
})
export class PostShowPageComponent implements OnInit {
  post$: Observable<Post>;
  comments$: Observable<Comment[]>;
  commentEntities$: Observable<any>;

  constructor(private store: Store<PostsState>) {
  }

  ngOnInit() {
    this.post$ = this.store.select(getSelectedPost).pipe(
      filter(post => post !== undefined)
    );
    this.commentEntities$ = this.post$.pipe(
      switchMap(post => this.store.select(getPostCommentEntities(post.id)))
    );
    this.comments$ = this.post$.pipe(
      switchMap(post => this.store.select(getPostComments(post.id)))
    );
  }
}
