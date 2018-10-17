import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TagsStore, TagsState } from './tags.store';
import { Tag } from '../models/tag.model';

@Injectable({ providedIn: 'root' })
export class TagsQuery extends QueryEntity<TagsState, Tag> {
  tags$ = this.select((state: TagsState) => state.entities);
  loaded$ = this.select((state: TagsState) => state.loaded);
  newPostTags$ = this.select((state: TagsState) => state.newPostTags);

  constructor(protected store: TagsStore) {
    super(store);
  }

}
