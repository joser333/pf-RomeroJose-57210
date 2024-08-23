import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Enrollment } from './models';
import { EnrollmentsService } from '../../../core/services/enrollments.service';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentsDialogComponent } from './components/enrollments-dialog/enrollments-dialog.component';
import { Store } from '@ngrx/store';
import { RootState } from '../../../core/store';
import { EnrollmentsActions } from './store/enrollments.actions';
import { selectEnrollments, selectEnrollmentsCourses, selectEnrollmentsError, selectEnrollmentsIsLoading, selectEnrollmentsStudents } from './store/enrollments.selectors';
import { Student } from '../students/models';
import { Course } from '../courses/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit {
  enrollmentForm: FormGroup;

  isLoading$: Observable<boolean>;
  enrollmentsList$: Observable<Enrollment[]>;
  error$: Observable<unknown>;
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;

  displayedColumns: string[] = ['studentId', 'courseId','actions'];

  constructor(
    private matDialog: MatDialog,
    private store: Store<RootState>,
    private fb: FormBuilder
  ){
    this.enrollmentsList$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectEnrollmentsIsLoading)
    this.error$ = this.store.select(selectEnrollmentsError)
    this.students$ = this.store.select(selectEnrollmentsStudents);
    this.courses$ = this.store.select(selectEnrollmentsCourses);
    this.enrollmentForm = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required]
    })
    
  }

  ngOnInit(): void {
    this.store.dispatch(EnrollmentsActions.loadEnrollments());
    this.store.dispatch(EnrollmentsActions.loadStudentsAndCourses());
  }

  addEnrollment(): void {
    if(this.enrollmentForm.invalid){
      alert('Formulario invalido')
    } else {
      this.store.dispatch(EnrollmentsActions.createEnrollment({
        payload: {
          studentId: this.enrollmentForm.get('studentId')?.value,
          courseId: this.enrollmentForm.get('courseId')?.value,
        },
      }));
    }
  }

  deleteEnrollment(id: string) {
    if(confirm('¿Esta seguro que desea eliminar la inscripcion?')){
    this.store.dispatch(EnrollmentsActions.deleteEnrollment({ id }));
    }
  }

}
