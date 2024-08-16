import { Injectable } from '@angular/core';
import { Enrollment } from '../../features/dashboard/enrollments/models';
import { delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

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
