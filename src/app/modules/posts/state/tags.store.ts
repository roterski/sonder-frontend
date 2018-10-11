import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, getInitialActiveState } from '@datorama/akita';
import { Tag } from '../models/tag.model';

export interface TagsState extends EntityState<Tag> {
  loaded: boolean;
}

const initialState = {
  loaded: false,
  ...getInitialActiveState()
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tags' })
export class TagsStore extends EntityStore<TagsState, Tag> {

  constructor() {
    super(initialState);
  }
}

