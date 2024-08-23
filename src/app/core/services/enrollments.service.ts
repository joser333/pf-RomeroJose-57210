import { Injectable } from '@angular/core';
import { CreateEnrollmentPayload, Enrollment } from '../../features/dashboard/enrollments/models';
import { concatMap, delay, forkJoin, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoadStudentsAndCoursesResult } from '../../features/dashboard/enrollments/models/index';
import { Student } from '../../features/dashboard/students/models';
import { Course } from '../../features/dashboard/courses/models';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  constructor(private httpClient: HttpClient) { }

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(environment.apiUrl + '/enrollments?_embed=student&_embed=course');
}

getStudentsAndCourses(): Observable<LoadStudentsAndCoursesResult>{
  return forkJoin({
    students: this.httpClient.get<Student[]>(environment.apiUrl + '/students'),
    courses: this.httpClient.get<Course[]>(environment.apiUrl + '/courses'),
  })
}

addEnrollment(payload: CreateEnrollmentPayload): Observable<Enrollment>{
  return this.httpClient.post<Enrollment>(environment.apiUrl + '/enrollments', payload).pipe(
    concatMap((enrollmentCreated) => 
      this.httpClient.get<Enrollment>(
        environment.apiUrl + '/enrollments/' + enrollmentCreated.id + '?_embed=student&_embed=course'
      ))
  );
}

deleteEnrollmentsById(id: string): Observable<Enrollment> {
  return this.httpClient.delete<Enrollment>(environment.apiUrl + '/enrollments/' + id)
}

editEnrollmentsById(id: string, update: Enrollment) {
  return this.httpClient.put(environment.apiUrl + '/enrollments/' + id, update)
}

}
