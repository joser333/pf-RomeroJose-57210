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
  coursesList: Course[]=[];
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
        this.coursesList = courses;
      },
      error: (error) =>{
        console.log("error al cargar cursos en loadCourses: ", error);
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
        this.isLoading = true;
        this.coursesService.addCourse(value).subscribe({
          next: (courses) => {
            this.coursesList = [...courses]
          },
          error: (error) =>{
            console.log("error al agregar cursos en openDialog: ", error);
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      },
    });
  }

  deleteCourseById(id: string){
    if(confirm('¿Esta seguro que desea eliminar el curso?')){
      this.isLoading = true;
      this.coursesService.deleteCourseById(id).subscribe({
        next: (courses) => {
          this.coursesList = [...courses];
        },
        error: (error) =>{
          console.log("error al eliminar cursos en deleteCoursesById: ", error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  editCourse(editingCourse: Course){
    this.matDialog.open(CourseDialogComponent, { data: editingCourse }).afterClosed().subscribe({
      next: (value) => {
        if(!!value){
          this.isLoading = true;
          this.coursesService.editCourseById(editingCourse.id, value).subscribe({
            next: (courses) => {
              this.coursesList = [...courses];
            },
            error: (error) =>{
              console.log("error al editar cursos en editCourses: ", error);
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
