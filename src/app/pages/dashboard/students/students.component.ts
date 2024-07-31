import { Component, OnInit, Pipe } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './models/index';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { generarDniAleatorio } from '../../../shared/utils';
import { ConcatPipe } from '../../../shared/pipes/concat.pipe';
import { StudentsService } from '../../../core/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})


export class StudentsComponent implements OnInit {

  nombreStudent = '';

  displayedColumns: string[] = ['dni', 'name', 'lastName', 'birthDate', 'actions'];
  studentsList: Student[]=[];
  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsService
  ){}


  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(){
    this.isLoading = true;
    this.studentsService.getStudents().subscribe({
      next: (student) => {
        this.studentsList = student;
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
        this.studentsService.addStudents(value).subscribe({
          next: (student) => {
            this.studentsList = [...student]
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      },
    });
  }

  deleteStudentByDni(dni: string){
    if(confirm('Esta seguro que desea eliminar el alumno?')){
      this.isLoading = true;
      this.studentsService.deleteStudentByDni(dni).subscribe({
        next: (student) => {
          this.studentsList = [...student];
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
          this.studentsService.editStudentByDni(editingStudent.dni, value).subscribe({
            next: (student) => {
              this.studentsList = [...student];
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
