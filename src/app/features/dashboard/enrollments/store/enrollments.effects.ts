import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollmentsActions } from './enrollments.actions';
import { EnrollmentsService } from '../../../../core/services/enrollments.service';


@Injectable()
export class EnrollmentsEffects {

  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentsActions.loadEnrollments),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.enrollmentsService.getEnrollments().pipe(
          //respuesta satisfactoria
          map(data => EnrollmentsActions.loadEnrollmentsSuccess({ data })),
          //respuesta con error
          catchError(error => of(EnrollmentsActions.loadEnrollmentsFailure({ error }))))
      )
    );
  });


  loadStudentsAndCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentsActions.loadStudentsAndCourses),
      concatMap(() =>
        this.enrollmentsService.getStudentsAndCourses().pipe(
          map(data => EnrollmentsActions.loadStudentsAndCoursesSuccess({ data })),
          catchError(error => of(EnrollmentsActions.loadStudentsAndCoursesFailure({ error }))))
      )
    );
  });

  createEnrollment$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentsActions.createEnrollment),
      concatMap((action) =>
        this.enrollmentsService.addEnrollment(action.payload).pipe(
          map(data => EnrollmentsActions.createEnrollmentSuccess({ data })),
          catchError(error => of(EnrollmentsActions.createEnrollmentFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions,
    private enrollmentsService: EnrollmentsService
  ) {}
}
