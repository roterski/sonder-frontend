import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePost, PostCreated } from '../../actions/posts.actions';
import { PostsState } from '../../reducers/posts.reducer';
import { PostsService } from '../../services';

@Component({
  selector: 'app-new-post-page',
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.css']
})
export class NewPostPageComponent implements OnInit {
  postForm: FormGroup;
  hasError: boolean;

  constructor(
    private store: Store<PostsState>,
    private formBuilder: FormBuilder,
    private router: Router,
    private postsService: PostsService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['']
    });
  }

  submitForm() {
    if (this.postForm.valid) {
      this.store.dispatch(new CreatePost({ post: this.postForm.getRawValue() }));
    }
  }
}
