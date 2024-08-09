import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Enrollment } from './models';
import { EnrollmentsService } from '../../../core/services/enrollments.service';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentsDialogComponent } from './components/enrollments-dialog/enrollments-dialog.component';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit {
  isLoading = true;
  enrollmentsList: Enrollment[] = [];
  displayedColumns: string[] = ['studentId', 'courseId','actions'];

  constructor(
    private enrollmentsService: EnrollmentsService,
    private matDialog: MatDialog
  ){
    
  }

  ngOnInit(): void {
    this.loadEnrollments();
  }

  /* loadEnrollments(){
    this.enrollmentsService.getEnrollments().subscribe({
      next: (v) => (this.enrollments = v),
      complete: () => (this.isLoading = false),
    }); 
  } */

    loadEnrollments(){
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
    }


}
