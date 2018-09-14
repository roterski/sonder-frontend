import { Action } from '@ngrx/store';
import { PostsActions, PostsActionTypes } from '../actions/posts.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: PostsActions): State {
  switch (action.type) {

    case PostsActionTypes.LoadPostss:
      return state;


    default:
      return state;
  }
}
