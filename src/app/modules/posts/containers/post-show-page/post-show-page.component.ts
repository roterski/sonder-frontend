import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, filter, map, tap, combineLatest, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Post, PostComment, PostsQuery, PostsService } from '../../state';

@Component({
  selector: 'app-post-show-page',
  templateUrl: './post-show-page.component.html',
  styleUrls: ['./post-show-page.component.css']
})
export class PostShowPageComponent implements OnInit {
  post$: Observable<Post>;
  comments$: Observable<Comment[]>;
  commentEntities$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsQuery: PostsQuery,
    private postsService: PostsService) {
  }

  ngOnInit() {
    const postId$ = this.route.params.pipe(
      map((params: { postId: string }) => parseInt(params.postId, 10))
    );

    this.post$ = this.postsService.getPost(postId$).pipe(
      catchError((error, post: Observable<Post>) => {
        this.router.navigate(['/posts']);
        return post;
      })
    );
  }
}
