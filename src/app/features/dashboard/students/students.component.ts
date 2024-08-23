import { Component, OnInit, Pipe } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './models/index';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { generarDniAleatorio } from '../../../shared/utils';
import { ConcatPipe } from '../../../shared/pipes/concat.pipe';
import { StudentsService } from '../../../core/services/students.service';
import { Observable, tap } from 'rxjs';
import { User } from '../users/models';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})


export class StudentsComponent implements OnInit {

  nombreStudent = '';
  authUser$: Observable<User | null>;

  displayedColumns: string[] = ['dni', 'name', 'lastName', 'birthDate', 'actions'];
  studentsList: Student[]=[];
  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsService,
    private authService: AuthService
  ){
    this.authUser$ = this.authService.authUser$;
  }


  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(){
    this.isLoading = true;
    this.studentsService.getStudents().subscribe({
      next: (student) => {
        this.studentsList = student;
      },
      error: (error) =>{
        console.log("error al cargar alumnos en loadStudents: ", error);
      },
      complete: () =>{
        this.isLoading = false;
      },
    });
  }

  openDialog(): void{
    this.matDialog.open(StudentDialogComponent).afterClosed().subscribe({
      next: (value) => {
        console.log('Recibimos este valor: ', value);

        this.nombreStudent = value.name;

        // value['dni'] = generarDniAleatorio();
        this.isLoading = true;
        this.studentsService.addStudents(value).pipe(tap(() => this.loadStudents())).subscribe({
          next: (student) => {
            this.studentsList = [...student]
          },
          error: (error) =>{
            console.log("error al agregar alumno en openDialog: ", error);
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      },
    });
  }

  deleteStudentByDni(id: string){
    if(confirm('¿Esta seguro que desea eliminar el alumno?')){
      this.isLoading = true;
      this.studentsService.deleteStudentByDni(id).pipe(tap(() => this.loadStudents())).subscribe({
        next: (student) => {
          this.studentsList = [...student];
        },
        error: (error) =>{
          console.log("error al aliminar alumno en deleteStudentByDni: ", error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  editStudent(editingStudent: Student){
    this.matDialog.open(StudentDialogComponent, { data: editingStudent}).afterClosed().subscribe({
      next: (value) => {
        if(!!value){
          this.isLoading = true;
          this.studentsService.editStudentByDni(editingStudent.id, value).pipe(
            tap(() => this.loadStudents())).subscribe({
            error: (error) =>{
              console.log("error al editar alumno en editStudent: ", error);
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
