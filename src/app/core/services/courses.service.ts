import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../pages/dashboard/courses/models';
import { THREE } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private MY_DATABASE_COURSES = [
    {
      id: 'abc1',
      name: 'Angular',
      startDate: new Date,
      endDate: new Date,
    },
    {
      id: 'abc2',
      name: 'AWS',
      startDate: new Date,
      endDate: new Date,
    },
    {
      id: 'abc3',
      name: 'Diseño',
      startDate: new Date,
      endDate: new Date,
    },
  ]

  constructor() { }

  getCourses(): Observable<Course[]> {

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.MY_DATABASE_COURSES);
        observer.complete();
      }, 1000);
    })
  }

  addCourse(course: Course): Observable<Course[]> {
    this.MY_DATABASE_COURSES.push(course);
    return this.getCourses();
  }

  editCourseById(id: string, update: Course) {
    this.MY_DATABASE_COURSES = this.MY_DATABASE_COURSES.map((el) =>
      el.id === id ? { ...update, id } : el
    );
    return this.getCourses();
  }

  deleteCourseById(id: string): Observable<Course[]> {
    this.MY_DATABASE_COURSES = this.MY_DATABASE_COURSES.filter((el) => el.id != id);
    return this.getCourses();
  }

}
