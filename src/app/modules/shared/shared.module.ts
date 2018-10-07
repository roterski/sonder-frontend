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
  MatBottomSheetModule
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
    MatBottomSheetModule
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
    LoadingSplashComponent
  ],
  declarations: [
    LoadingSplashComponent
  ]
})
export class SharedModule { }
