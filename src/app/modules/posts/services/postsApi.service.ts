import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Post, PostComment } from '../models';
import { BackendService } from '../../auth/services/backend.service';

@Injectable()
export class PostsApiService {
  constructor(private backend: BackendService) {}

  getPosts(params: any = {}): Observable<any> {
    return this.backend
      .get('/posts', { params });
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

  createComment(postId: number, comment: PostComment): Observable<PostComment> {
    return this.backend
      .post(`/posts/${postId}/comments`, { comment })
      .pipe(map(response => response.data));
  }
}
