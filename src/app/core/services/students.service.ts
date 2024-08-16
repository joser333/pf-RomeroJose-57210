import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../features/dashboard/students/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
      return this.httpClient.get<Student[]>(environment.apiUrl + '/students')
  }

  addStudents(student: Student): Observable<Student[]>{
    return this.httpClient.post<Student[]>(environment.apiUrl + '/students', student)
  }

  editStudentByDni(id: string, update: Student) {
    return this.httpClient.put(environment.apiUrl + '/students/' + id, update)
  }

  deleteStudentByDni(id: string): Observable<Student[]> {
    return this.httpClient.delete<Student[]>(environment.apiUrl + '/students/' + id)
  }

}
