import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post, /*Comment TODO*/ } from '../state/post.model';
import { BackendService } from '../../auth/services/backend.service';

@Injectable()
export class PostsApiService {
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

  getPostComments(postId: number): Observable<any> {
    return this.backend
      .get(`/posts/${postId}/comments`)
      .pipe(map(response => response.data));
  }

  createComment(postId: number, comment: Comment): Observable<Comment> {
    return this.backend
      .post(`/posts/${postId}/comments`, { comment })
      .pipe(map(response => response.data));
  }
}
