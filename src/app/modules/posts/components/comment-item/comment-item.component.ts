import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PostComment } from '../../models';
import { MyVotesService } from '../../state';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  @Input() comment: PostComment;
  @Input() voted: -1 | 0 | 1;

  constructor(
    private myVotesService: MyVotesService
  ) { }

  ngOnInit() {
  }

  upvote() {
    if (this.voted > 0) {
      this.myVotesService.revokeCommentVote(this.comment.id).pipe(take(1)).subscribe();
    } else {
      this.myVotesService.upvoteComment(this.comment.id).pipe(take(1)).subscribe();
    }
  }

  downvote() {
    if (this.voted < 0) {
      this.myVotesService.revokeCommentVote(this.comment.id).pipe(take(1)).subscribe();
    } else {
      this.myVotesService.downvoteComment(this.comment.id).pipe(take(1)).subscribe();
    }
  }
}
