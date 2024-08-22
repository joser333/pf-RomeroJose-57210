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

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  enrollmentsList$: Observable<Enrollment[]>;
  error$: Observable<unknown>;
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;

  displayedColumns: string[] = ['studentId', 'courseId','actions'];

  constructor(
    //private enrollmentsService: EnrollmentsService,
    private matDialog: MatDialog,
    private store: Store<RootState>
  ){
    this.enrollmentsList$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectEnrollmentsIsLoading)
    this.error$ = this.store.select(selectEnrollmentsError)
    this.students$ = this.store.select(selectEnrollmentsStudents);
    this.courses$ = this.store.select(selectEnrollmentsCourses);
    
  }

  ngOnInit(): void {
    this.store.dispatch(EnrollmentsActions.loadEnrollments());
    this.store.dispatch(EnrollmentsActions.loadStudentsAndCourses());
    // this.loadEnrollments();
  }

  /* loadEnrollments(){
    this.enrollmentsService.getEnrollments().subscribe({
      next: (v) => (this.enrollments = v),
      complete: () => (this.isLoading = false),
    }); 
  } */

    /* loadEnrollments(){
      this.isLoading = true;
      this.enrollmentsService.getEnrollments().subscribe({
        next: (enrollment) => {
          this.enrollmentsList = enrollment;
        },
        error: (error) =>{
          console.log("error al cargar inscripciones en loadEnrollments: ", error);
        },
        complete: () =>{
          this.isLoading = false;
        },
      });
    }
  
    openDialog(): void{
      this.matDialog.open(EnrollmentsDialogComponent).afterClosed().subscribe({
        next: (value) => {
          console.log('Recibimos este valor: ', value);
  
          //this.nombreStudent = value.name;
  
          this.isLoading = true;
          this.enrollmentsService.addEnrollments(value).pipe(tap(() => this.loadEnrollments())).subscribe({
            next: (enrollment) => {
              this.enrollmentsList = [...enrollment]
            },
            error: (error) =>{
              console.log("error al agregar inscripcion en openDialog: ", error);
            },
            complete: () => {
              this.isLoading = false;
            }
          });
        },
      });
    }
  
    deleteEnrollmentsById(id: string){
      if(confirm('¿Esta seguro que desea eliminar una inscripcion?')){
        this.isLoading = true;
        this.enrollmentsService.deleteEnrollmentsById(id).pipe(tap(() => this.loadEnrollments())).subscribe({
          next: (enrollment) => {
            this.enrollmentsList = [...enrollment];
          },
          error: (error) =>{
            console.log("error al aliminar inscripcion en deleteEnrollmentsById: ", error);
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      }
    }
  
    editEnrollment(editingEnrollment: Enrollment){
      this.matDialog.open(EnrollmentsDialogComponent, { data: editingEnrollment}).afterClosed().subscribe({
        next: (value) => {
          if(!!value){
            this.isLoading = true;
            this.enrollmentsService.editEnrollmentsById(editingEnrollment.id, value).pipe(
              tap(() => this.loadEnrollments())).subscribe({
              error: (error) =>{
                console.log("error al editar inscripcion en editEnrollment: ", error);
              },
              complete: () => {
                this.isLoading = false;
              },
            });
          }
        },
      });
    } */


}
