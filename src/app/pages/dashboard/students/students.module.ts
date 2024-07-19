import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { StudentsComponent } from './students.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    StudentDialogComponent,
    StudentsComponent
  ],
  exports:[
    StudentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTableModule,
    FormsModule,
    SharedModule
  ]
})
export class StudentsModule { }
