import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTreeModule,
  MatIconModule,
  MatPaginatorModule,
  MatBottomSheetModule,
  MatChipsModule,
  MatAutocompleteModule
} from '@angular/material';
import { LoadingSplashComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTreeModule,
    MatIconModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  exports: [
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTreeModule,
    MatIconModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatChipsModule,
    MatAutocompleteModule,
    LoadingSplashComponent
  ],
  declarations: [
    LoadingSplashComponent
  ]
})
export class SharedModule { }
