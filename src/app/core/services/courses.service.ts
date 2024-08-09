import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../features/dashboard/courses/models';
import { THREE } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  constructor(private httpClient: HttpClient) { }

  getCourses(): Observable<Course[]> {
   return this.httpClient.get<Course[]>(environment.apiUrl + '/courses')
  }

  addCourse(course: Course): Observable<Course[]> {
    return this.httpClient.post<Course[]>(environment.apiUrl + '/courses', course)
  }

  editCourseById(id: string, update: Course) {
    return this.httpClient.put(environment.apiUrl + '/courses/' + id, update)
  }

  deleteCourseById(id: string): Observable<Course[]> {
    return this.httpClient.delete<Course[]>(environment.apiUrl + '/courses/' + id)
  }

}
