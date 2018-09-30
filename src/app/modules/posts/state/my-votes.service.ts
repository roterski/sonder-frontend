import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { MyVotesStore } from './my-votes.store';
import { HttpClient } from '@angular/common/http';
import { VotesApiService } from '../services';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MyVotesService {

  constructor(private myVotesStore: MyVotesStore,
              private votesApi: VotesApiService,
              private http: HttpClient) {
  }

  getMyPostVotes() {
    return this.votesApi
        .getPostVotes()
        .pipe(
          tap((votes) => this.myVotesStore.addPostVotes(votes))
        );
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.myVotesStore.add(entity);
    // });
  }

}
