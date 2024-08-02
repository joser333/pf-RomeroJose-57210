import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    EnrollmentsComponent
  ],
  exports: [
    EnrollmentsComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    MatProgressSpinnerModule,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    SharedModule,
  ]
})
export class EnrollmentsModule { }
