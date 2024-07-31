import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { Course } from './models/index';
import { generateID } from '../../../shared/utils';
import { CoursesService } from '../../../core/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  nombreCurso = '';

  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'actions'];
  dataSource: Course[]=[];
  isLoading = false;

  constructor(
    private matDialog: MatDialog, 
    private coursesService: CoursesService
  ){}

  ngOnInit(): void {
    this.loadCourses();
  }


  loadCourses(){
    this.isLoading = true;
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.dataSource = courses;
      },
      complete: () =>{
        this.isLoading = false;
      },
    });
  }

  openDialog(): void{
    this.matDialog.open(CourseDialogComponent).afterClosed().subscribe({
      next: (value) => {
        console.log('Recibimos este valor: ', value);

        this.nombreCurso = value.name;

        value['id'] = generateID(4);
        this.dataSource = [...this.dataSource, value]
      }
    });
  }

  deleteCourseById(id: string){
    if(confirm('Esta seguro que desea eliminar el curso?')){
      this.dataSource = this.dataSource.filter((el) => el.id != id);
    }
  }

  editCourse(editingCourse: Course){
    this.matDialog.open(CourseDialogComponent, { data: editingCourse }).afterClosed().subscribe({
      next: (value) => {
        if(!!value){
          this.dataSource = this.dataSource.map((el) => 
            el.id === editingCourse.id ? {...value, id: editingCourse.id} : el
        );
        }
      }
    });
  }

}
