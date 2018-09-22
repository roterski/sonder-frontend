import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() voted: number;

  constructor() { }

  ngOnInit() {
  }

  upvote() {
    // if (this.voted > 0) {
    //   this.store.dispatch(new RevokePostVote({ postId: this.post.id}));
    // } else {
    //   this.store.dispatch(new UpvotePost({ postId: this.post.id }));
    // }
  }

  downvote() {
    // if (this.voted < 0) {
    //   this.store.dispatch(new RevokePostVote({ postId: this.post.id }));
    // } else {
    //   this.store.dispatch(new DownvotePost({ postId: this.post.id }));
    // }
  }
}
