import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../pages/dashboard/courses/models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourses(): Observable<Course[]> {

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next([

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
        ]);
        observer.complete();
      }, 1500);
    })
  }


}
