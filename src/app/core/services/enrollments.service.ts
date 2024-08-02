import { Injectable } from '@angular/core';
import { Enrollment } from '../../pages/dashboard/enrollments/models';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  private MY_DATABASE_ENROLLMENTS: Enrollment[] = [
    {
      studentId: '34343255',
      courseId: 'abc1',
    },
    {
      studentId: '74835434',
      courseId: 'abc2',
    },
    {
      studentId: '34877764',
      courseId: 'abc3',
    },
  ];

  constructor() { }

  getEnrollments(): Observable<Enrollment[]>{
    return of<Enrollment[]>(this.MY_DATABASE_ENROLLMENTS).pipe(delay(400));
  }
}
