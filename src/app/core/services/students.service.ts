import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../features/dashboard/students/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
      return this.httpClient.get<Student[]>(environment.apiUrl + '/student')
  }

  addStudents(student: Student): Observable<Student[]>{
    return this.httpClient.post<Student[]>(environment.apiUrl + '/student', student)
  }

  editStudentByDni(id: string, update: Student) {
    return this.httpClient.put(environment.apiUrl + '/student/' + id, update)
  }

  deleteStudentByDni(id: string): Observable<Student[]> {
    return this.httpClient.delete<Student[]>(environment.apiUrl + '/student/' + id)
  }

}
