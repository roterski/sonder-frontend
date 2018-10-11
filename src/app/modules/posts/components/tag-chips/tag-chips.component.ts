import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { TagsService, TagsQuery } from '../../state';
import { Tag } from '../../models';

@Component({
  selector: 'app-tag-chips',
  templateUrl: './tag-chips.component.html',
  styleUrls: ['./tag-chips.component.scss']
})
export class TagChipsComponent implements OnInit, OnDestroy {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();


  filteredTags$: Observable<Tag[]>;
  tags: Tag[] = [];
  allTags$: Observable<Tag[]>;
  private subscriptions: Subscription[] = [];

  constructor(private tagsService: TagsService, private tagsQuery: TagsQuery) {
  }

  ngOnInit() {
    this.allTags$ = this.tagsService.getTags();
    this.filteredTags$ = this.allTags$;
    this.subscriptions.push(this.filteredTags$.subscribe());
    // this.filteredTags = this.tagCtrl.valueChanges.pipe(
    //   startWith([]),
    //   map((tag) => tag ? this._filter(tag) : this.allTags)
    // );
  }

  add(event: MatChipInputEvent): void {
    this.tags.push({id: null, name: event.value});
    event.input.value = '';
  }

  remove(tag) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.tags.push(event.option.value);
  }

  // private _filter(value: string) {
  //   const filterValue = value.toLowerCase();

  //   return this.allTags.filter(tag => tag.name.toLowerCase().indexOf(filterValue) === 0);
  // }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
