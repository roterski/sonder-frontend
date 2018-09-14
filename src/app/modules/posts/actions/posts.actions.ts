import { Action } from '@ngrx/store';

export enum PostsActionTypes {
  LoadPostss = '[Posts] Load Postss'
}

export class LoadPostss implements Action {
  readonly type = PostsActionTypes.LoadPostss;
}

export type PostsActions = LoadPostss;
