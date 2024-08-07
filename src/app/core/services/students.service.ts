import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../features/dashboard/students/models';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private MY_DATABASE_STUDENTS = [
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
  ]

  constructor() { }

  getStudents(): Observable<Student[]> {

    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.MY_DATABASE_STUDENTS);
        observer.complete();
      }, 1000);
    })
  }

  addStudents(student: Student): Observable<Student[]>{
    this.MY_DATABASE_STUDENTS.push(student);
    return this.getStudents();
  }

  editStudentByDni(dni: string, update: Student) {
    this.MY_DATABASE_STUDENTS = this.MY_DATABASE_STUDENTS.map((el) =>
      el.dni === dni ? { ...update, dni } : el
    );
    return this.getStudents();
  }

  deleteStudentByDni(dni: string): Observable<Student[]> {
    this.MY_DATABASE_STUDENTS = this.MY_DATABASE_STUDENTS.filter((el) => el.dni != dni);
    return this.getStudents();
  }

}
