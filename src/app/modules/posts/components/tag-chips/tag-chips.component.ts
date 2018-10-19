import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, Subscription } from 'rxjs';
import { map, combineLatest } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { TagsService, TagsQuery } from '../../state';
import { Tag } from '../../models';

@Component({
  selector: 'app-tag-chips',
  templateUrl: './tag-chips.component.html',
  styleUrls: ['./tag-chips.component.scss']
})
export class TagChipsComponent implements OnInit, OnDestroy {
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public tagCtrl = new FormControl();
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  public filteredTags$: Observable<Tag[]>;
  public newPostTags$: Observable<Tag[]>;
  public allTags$: Observable<Tag[]>;
  private subscriptions: Subscription[] = [];

  constructor(private tagsService: TagsService, private tagsQuery: TagsQuery) {
  }

  ngOnInit() {
    this.allTags$ = this.tagsService.getTags();
    this.filteredTags$ = this.allTags$;
    this.newPostTags$ = this.tagsQuery.newPostTags$;
    this.subscriptions.push(this.filteredTags$.subscribe());

    const notSelectedTags$ = this.allTags$.pipe(
      combineLatest(this.newPostTags$),
      map(([all, selected]) => all.filter(tag => !selected.map((t) => t.name).includes(tag.name)))
    );
    this.filteredTags$ = this.tagCtrl.valueChanges.pipe(
      combineLatest(notSelectedTags$),
      map(([input, tags]) =>
        input ? tags.filter(tag => tag.name.toLowerCase().startsWith(input.toLowerCase())) : tags
      )
    );
  }

  add(event: MatChipInputEvent): void {
    this.tagsService.addNewPostTag({id: null, name: event.value});
    event.input.value = '';
  }

  remove(tag: Tag) {
    this.tagsService.removeNewPostTag(tag);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.tagsService.addNewPostTag({ id: event.option.id, name: event.option.value } as Tag);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
