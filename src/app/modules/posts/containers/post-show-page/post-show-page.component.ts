import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsState, getSelectedPost, getComments } from '../../store';
import { Post, Comment } from '../../models';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { map, tap, catchError, exhaustMap, mergeMap, switchMap, concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-show-page',
  templateUrl: './post-show-page.component.html',
  styleUrls: ['./post-show-page.component.css']
})
export class PostShowPageComponent implements OnInit {
  post$: Observable<Post>;
  comments$: Observable<Comment[]>;

  constructor(private store: Store<PostsState>) { }

  ngOnInit() {
    this.post$ = this.store.select(getSelectedPost);
    this.comments$ = this.post$.pipe(
      switchMap(post => this.store.select(getComments(post.id)))
    );
  }
}
