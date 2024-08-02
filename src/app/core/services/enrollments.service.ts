import { Injectable } from '@angular/core';
import { Enrollment } from '../../pages/dashboard/enrollments/models';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  private MY_DATABASE_ENROLLMENTS: Enrollment[] = [
    {
      studentId: 'aaa',
      courseId: '111',
    },
    {
      studentId: 'bbb',
      courseId: '222',
    },
    {
      studentId: 'ccc',
      courseId: '222',
    },
  ];

  constructor() { }

  getEnrollments(): Observable<Enrollment[]>{
    return of<Enrollment[]>(this.MY_DATABASE_ENROLLMENTS).pipe(delay(400));
  }
}