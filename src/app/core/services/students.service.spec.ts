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

describe('ProductService', () => {
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

  it('Al llamar get students se debe ejecutar una peticion HTTP a /students', () => {
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
});