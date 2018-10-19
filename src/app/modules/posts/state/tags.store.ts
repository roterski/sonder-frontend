import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, getInitialActiveState } from '@datorama/akita';
import { Tag } from '../models/tag.model';

export interface TagsState extends EntityState<Tag> {
  loaded: boolean;
  newPostTags: Tag[];
}

const initialState = {
  loaded: false,
  newPostTags: [],
  ...getInitialActiveState()
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tags' })
export class TagsStore extends EntityStore<TagsState, Tag> {

  constructor() {
    super(initialState);
  }

  addNewPostTag(tag: Tag) {
    this.setState((state: TagsState) => {
      return {
        ...state,
        newPostTags: [...state.newPostTags, tag]
      };
    });
  }

  removeNewPostTag(tag: Tag) {
    this.setState((state: TagsState) => {
      const leftTags = state.newPostTags.filter((t) => t !== tag);

      return {
        ...state,
        newPostTags: leftTags
      };
    });
  }

  clearNewPostTags() {
    this.setState((state: TagsState) => {
      return {
        ...state,
        newPostTags: []
      };
    });
  }
}

