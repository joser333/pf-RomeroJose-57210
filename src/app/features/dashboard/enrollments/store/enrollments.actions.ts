import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateEnrollmentPayload, Enrollment, LoadStudentsAndCoursesResult } from '../models';

export const EnrollmentsActions = createActionGroup({
  source: 'Enrollments',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
    'Load Students And Courses': emptyProps(),
    'Load Students And Courses Success': props<{ data: LoadStudentsAndCoursesResult}>(),
    'Load Students And Courses Failure': props<{ error: unknown }>(),
    'Create Enrollment': props<{ payload: CreateEnrollmentPayload }>(),
    'Create Enrollment Success': props<{ data: Enrollment }>(),
    'Create Enrollment Failure': props<{ error: unknown }>(),
    'Delete Enrollment': props<{ id: string }>(),
    'Delete Enrollment Success': props<{ data: Enrollment }>(),
    'Delete Enrollment Failure': props<{ error: unknown }>(),
  }
});
