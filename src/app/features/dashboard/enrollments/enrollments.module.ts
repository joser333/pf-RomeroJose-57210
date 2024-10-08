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
import { EnrollmentsDialogComponent } from './components/enrollments-dialog/enrollments-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { EffectsModule } from '@ngrx/effects';
import { EnrollmentsEffects } from './store/enrollments.effects';
import { StoreModule } from '@ngrx/store';
import { enrollmentsFeature } from './store/enrollments.reducer';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    EnrollmentsComponent,
    EnrollmentsDialogComponent
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
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    StoreModule.forFeature(enrollmentsFeature),
    EffectsModule.forFeature([EnrollmentsEffects]),
    
  ]
})
export class EnrollmentsModule { }
