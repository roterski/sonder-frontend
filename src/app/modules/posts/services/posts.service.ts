import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models';
import { BackendService } from '../../auth/services/backend.service';

@Injectable()
export class PostsService {
  constructor(private backend: BackendService) {}

  getPosts(): Observable<Post[]> {
    return this.backend
      .get('/posts')
      .pipe(map(response => response.data));
  }

  getPost(postId: number): Observable<Post> {
    return this.backend
      .get(`/posts/${postId}`)
      .pipe(map(response => response.data));
  }

  createPost(post: Post): Observable<Post> {
    return this.backend
      .post('/posts', { post })
      .pipe(map(response => response.data));
  }
}
