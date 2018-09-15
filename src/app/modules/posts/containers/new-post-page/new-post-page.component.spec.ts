import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostPageComponent } from './new-post-page.component';
import { Store, StoreModule } from '@ngrx/store';

describe('NewPostPageComponent', () => {
  let component: NewPostPageComponent;
  let fixture: ComponentFixture<NewPostPageComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ NewPostPageComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostPageComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
