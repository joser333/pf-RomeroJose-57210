import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { StudentsService } from './students.service';
import { Student } from '../../features/dashboard/students/models';

describe('StudentService', () => {
  let service: StudentsService;
  let router: Router;

  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockProvider(Router)],
    });
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(StudentsService);
    router = TestBed.inject(Router);
  });

  it('Al llamar a getStudents se debe ejecutar una peticion HTTP a /students', () => {
    const mockedResponse: Student[] = [
      {
        id: 'abc123',
        dni: '1111111111',
        name: 'Prueba',
        lastName: 'Prueba',
        birthDate: new Date
      },
    ];

    service.getStudents().subscribe({
      next: (res) => {
        expect(res).toEqual(mockedResponse);
      },
    });

    httpController
      .expectOne({
        url: environment.apiUrl + '/students',
        method: 'GET',
      })
      .flush(mockedResponse);
  });

  it('Al llamar a addStudents se debe ejecutar una peticion HTTP a /students', () => {
    const studentToAdd: Student = {
      id: 'xyz789',
      dni: '2222222222',
      name: 'Juan',
      lastName: 'Diaz',
      birthDate: new Date()
    };

    const mockedResponse: Student[] = [studentToAdd];

    service.addStudents(studentToAdd).subscribe({
      next: (res) => {
        expect(res).toEqual(mockedResponse);
      },
    });

    const req = httpController.expectOne({
      url: environment.apiUrl + '/students',
      method: 'POST',
    });

    expect(req.request.body).toEqual(studentToAdd);
    req.flush(mockedResponse); 
  });

  it('Al llamar a editStudentByDni se debe ejecutar una peticion HTTP a /students/ + id', () => {
    const studentId = 'abc123';
    const studentToUpdate: Student = {
      id: studentId,
      dni: '3333333333',
      name: 'Julia',
      lastName: 'Julia',
      birthDate: new Date()
    };

    const mockedResponse: Student = studentToUpdate;

    service.editStudentByDni(studentId, studentToUpdate).subscribe({
      next: (res) => {
        expect(res).toEqual(mockedResponse);
      },
    });

    const req = httpController.expectOne({
      url: `${environment.apiUrl}/students/${studentId}`,
      method: 'PUT',
    });

    expect(req.request.body).toEqual(studentToUpdate);
    req.flush(mockedResponse);
  });

  it('Al llamar a deleteStudentByDni se debe ejecutar una peticion HTTP a /students/ + id', () => {
    const studentId = 'abc123';
    const mockedResponse: Student[] = []; 

    service.deleteStudentByDni(studentId).subscribe({
      next: (res) => {
        expect(res).toEqual(mockedResponse);
      },
    });

    const req = httpController.expectOne({
      url: `${environment.apiUrl}/students/${studentId}`,
      method: 'DELETE',
    });

    req.flush(mockedResponse);
  });

});