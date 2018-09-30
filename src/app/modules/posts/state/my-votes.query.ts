import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MyVotesStore, MyVotesState } from './my-votes.store';

@Injectable({ providedIn: 'root' })
export class MyVotesQuery extends Query<MyVotesState> {
  myPostVotes$ = this.select((state: MyVotesState) => state.postVotes.votes);

  constructor(protected store: MyVotesStore) {
    super(store);
  }

}
