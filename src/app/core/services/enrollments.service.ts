import { Injectable } from '@angular/core';
import { Enrollment } from '../../features/dashboard/enrollments/models';
import { delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  private MY_DATABASE_ENROLLMENTS: Enrollment[] = [
    {
      id: '11',
      studentId: '34343255',
      courseId: 'abc1',
    },
    {
      id: '22',
      studentId: '74835434',
      courseId: 'abc2',
    },
    {
      id: '33',
      studentId: '34877764',
      courseId: 'abc3',
    },
  ];

  constructor(private httpClient: HttpClient) { }

  /* getEnrollments(): Observable<Enrollment[]>{
    return of<Enrollment[]>(this.MY_DATABASE_ENROLLMENTS).pipe(delay(400));
  } */

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(environment.apiUrl + '/enrollments')
}

addEnrollments(enrollments: Enrollment): Observable<Enrollment[]>{
  return this.httpClient.post<Enrollment[]>(environment.apiUrl + '/enrollments', enrollments)
}

editEnrollmentsById(id: string, update: Enrollment) {
  return this.httpClient.put(environment.apiUrl + '/enrollments/' + id, update)
}

deleteEnrollmentsById(id: string): Observable<Enrollment[]> {
  return this.httpClient.delete<Enrollment[]>(environment.apiUrl + '/enrollments/' + id)
}
}
