import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  @Input() post: Post;
  @Input() errors: any;
  @Output() submitted = new EventEmitter<Post>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: [(this.post.title || ''), Validators.required],
      body: [(this.post.body || '')]
    });
  }

  submit() {
    if (this.postForm.valid) {
      this.submitted.emit(this.postForm.getRawValue());
    }
  }
}
