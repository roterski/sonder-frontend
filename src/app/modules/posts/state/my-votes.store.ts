import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface MyVotesState {
  postVotes: PostVotes;
  commentVotes: { [postId: number]: CommentVotes };
}

export interface PostVotes {
  votes: { [postId: number]: -1 | 0 | 1 };
  loaded: boolean;
}

export interface CommentVotes {
  votes: { [commentId: number]: -1 | 0 | 1};
  loaded: boolean;
}
export function createInitialState(): MyVotesState {
  return {
    postVotes: {
      votes: {},
      loaded: false
    },
    commentVotes: {
    }
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'my-votes' })
export class MyVotesStore extends Store<MyVotesState> {

  constructor() {
    super(createInitialState());
  }

  addPostVote(vote) {
    this.setState((state: MyVotesState) => {
      return {
        ...state,
        postVotes: {
          ...state.postVotes,
          votes: {
            ...state.postVotes.votes,
            [vote.postId]: vote.points
          }
        }
      };
    });
  }

  addPostVotes(votes) {
    const postVotes = votes.reduce((acc, vote) => {
      acc[vote.postId] = vote.points;
      return acc;
    }, {});

    this.setState((state: MyVotesState) => {
      return {
        ...state,
        postVotes: {
          votes: postVotes,
          loaded: true
        }
      };
    });
  }
}
