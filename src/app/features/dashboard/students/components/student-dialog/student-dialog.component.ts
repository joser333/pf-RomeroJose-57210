import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss'
})
export class StudentDialogComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private matDialogRef: MatDialogRef<StudentDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public editingStudent?: Student
  ){
    this.studentForm = this.fb.group({
      dni:[null, [Validators.required, Validators.minLength(7), Validators.pattern('^[0-9]+$')]],
      name:[null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      birthDate: [null, Validators.required],
    });

    if(this.editingStudent){
      this.studentForm.patchValue(this.editingStudent)
    }
  }

  onSubmit(): void{
    if(this.studentForm.valid){
      this.matDialogRef.close(this.studentForm.value);
    }else{
      alert('El formulario es invalido')
    }
  }


  onClose(): void{
    this.matDialogRef.close();
  }

}
