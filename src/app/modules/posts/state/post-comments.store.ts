import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, getInitialActiveState, ID } from '@datorama/akita';
import { PostComment } from '../models/post-comment.model';

export interface CommentIds {
  ids: Array<ID>;
  loaded: boolean;
}

export interface PostCommentsState extends EntityState<PostComment> {
  commentsByPost: { [postId: number]: CommentIds };
}

const initialState = {
  ...getInitialActiveState()
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'postComments' })
export class PostCommentsStore extends EntityStore<PostCommentsState, PostComment> {

  constructor() {
    super(initialState);
  }

  addPostComments(comments: PostComment[], postId: number) {
    const ids = comments.map((comment: PostComment) => comment.id);

    this.add(comments);
    const entities = this.appendChildrenIds({ ...this.entities});
    this.set(entities);
    this.setState((state: PostCommentsState) => {
      return {
        ...state,
        commentsByPost: {
          ...state.commentsByPost,
          [postId]: {
            loaded: true,
            ids: ids
          }
        }
      };
    });
  }

  appendChildrenIds(entities) {
    const entitiesWithChildren = {};
    Object.keys(entities).forEach((id) => {
      const entity = entities[id];
      entitiesWithChildren[id] = {...entities[id]};
      entitiesWithChildren[id].childrenIds = entitiesWithChildren[id].childrenIds || [];
      const parentId = entities[id].parentIds.slice(-1)[0];
      if (parentId) {
        const childrenIds = [parseInt(id, 10), ...entitiesWithChildren[parentId].childrenIds];
        entitiesWithChildren[parentId].childrenIds = Array.from(new Set(childrenIds)); // unique values
      }
    });
    return entitiesWithChildren;
  }

}
