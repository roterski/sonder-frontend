import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models';

@Component({
  selector: 'app-new-post-page',
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.css']
})
export class NewPostPageComponent implements OnInit {
  postForm: FormGroup;
  errors$: Observable<object>;
  post$: Observable<Post>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    // this.post$ = this.store.select(getNewPostData);
    // this.errors$ = this.store.select(getNewPostErrors);
  }

  createPost(post: Post) {
    // this.store.dispatch(new CreatePost({ post: post }));
  }
}
