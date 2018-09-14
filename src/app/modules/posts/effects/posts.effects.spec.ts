import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PostsEffects } from './posts.effects';

describe('PostsEffects', () => {
  let actions$: Observable<any>;
  let effects: PostsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PostsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
