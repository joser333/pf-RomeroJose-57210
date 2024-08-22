import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment, LoadStudentsAndCoursesResult } from '../models';

export const EnrollmentsActions = createActionGroup({
  source: 'Enrollments',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
    'Load Students and Courses': emptyProps(),
    'Load Students and Courses Success': props<{ data: LoadStudentsAndCoursesResult}>(),
    'Load Students and Courses Failure': props<{ error: unknown }>(),
  }
});
