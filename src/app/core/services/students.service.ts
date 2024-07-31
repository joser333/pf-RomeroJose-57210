import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../pages/dashboard/students/models';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  getStudents(): Observable<Student[]> {

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next([
          {
            dni: '34343255',
            name: 'Juan',
            lastName: 'Perez',
            birthDate: new Date,
          },
          {
            dni: '74835434',
            name: 'Martin',
            lastName: 'Lopez',
            birthDate: new Date,
          },
          {
            dni: '34877764',
            name: 'Carla',
            lastName: 'Gonzalez',
            birthDate: new Date,
          },
        ]);
        observer.complete();
      }, 1500);
    })
  }

}
