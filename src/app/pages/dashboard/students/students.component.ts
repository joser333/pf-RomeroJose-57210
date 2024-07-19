import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './models/index';
import { generarDniAleatorio } from '../../../shared/utils';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  nombreStudent = '';

  displayedColumns: string[] = ['dni', 'name', 'lastName', 'nacDate', 'actions'];
  dataSource: Student[]=[
    {
      dni: '34343255',
      name: 'Juan',
      lastName: 'Perez',
      nacDate: new Date,
    },
    {
      dni: '74835434',
      name: 'Martin',
      lastName: 'Lopez',
      nacDate: new Date,
    },
    {
      dni: '34877764',
      name: 'Carla',
      lastName: 'Gonzalez',
      nacDate: new Date,
    },
  ];

  constructor(private matDialog: MatDialog){}

  openDialog(): void{
    this.matDialog.open(StudentDialogComponent).afterClosed().subscribe({
      next: (value) => {
        console.log('Recibimos este valor: ', value);

        this.nombreStudent = value.name;

        value['id'] = generarDniAleatorio();
        this.dataSource = [...this.dataSource, value]
      }
    });
  }

  deleteStudentByDni(dni: string){
    if(confirm('Esta seguro que desea eliminar el curso?')){
      this.dataSource = this.dataSource.filter((el) => el.dni != dni);
    }
  }

  editStudent(editingStudent: Student){
    this.matDialog.open(StudentDialogComponent, { data: this.editStudent }).afterClosed().subscribe({
      next: (value) => {
        if(!!value){
          this.dataSource = this.dataSource.map((el) => 
            el.dni === editingStudent.dni ? {...value, id: editingStudent.dni} : el
        );
        }
      }
    });
  }


}
