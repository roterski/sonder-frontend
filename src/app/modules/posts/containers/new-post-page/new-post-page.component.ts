import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { PersistNgFormPlugin } from '@datorama/akita';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PostsQuery, PostsService } from '../../state';
import { Post, createPost } from '../../models';

@Component({
  selector: 'app-new-post-page',
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.css']
})
export class NewPostPageComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  errors$: Observable<object>;
  post$: Observable<Post>;
  persistForm: PersistNgFormPlugin<Post>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private postsQuery: PostsQuery,
    private postsService: PostsService) { }

  ngOnInit() {
    this.createForm();
    this.errors$ = this.postsQuery.selectError();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['']
    });
    this.persistForm = new PersistNgFormPlugin(
        this.postsQuery,
        createPost,
        { formKey: 'newPostForm' }
      ).setForm(this.postForm);
  }

  createPost() {
    this.postsService.addPost(this.postForm.value).subscribe(() => {
      this.router.navigate(['/']);
      this.persistForm.reset();
    });
  }

  ngOnDestroy() {
    if (this.persistForm) { this.persistForm.destroy(); }
  }
}
