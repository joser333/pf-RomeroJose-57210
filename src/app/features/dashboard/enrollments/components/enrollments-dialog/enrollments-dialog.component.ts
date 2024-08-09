import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Enrollment } from '../../models';

@Component({
  selector: 'app-enrollments-dialog',
  templateUrl: './enrollments-dialog.component.html',
  styleUrl: './enrollments-dialog.component.scss'
})
export class EnrollmentsDialogComponent {
  enrollmentForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private matDialogRef: MatDialogRef<EnrollmentsDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editingEnrollment?: Enrollment
  ){
    this.enrollmentForm = this.fb.group({
      studentId:[null, [Validators.required]],
      courseId:[null, [Validators.required]],
    });

    if(this.editingEnrollment){
      this.enrollmentForm.patchValue(this.editingEnrollment)
    }
  }

  onSubmit(): void{
    if(this.enrollmentForm.valid){
      this.matDialogRef.close(this.enrollmentForm.value);
    }else{
      alert('El formulario es invalido')
    }
  }


  onClose(): void{
    this.matDialogRef.close();
  }

}
