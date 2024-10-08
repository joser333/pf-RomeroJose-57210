import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentsActions } from './enrollments.actions';
import { Enrollment } from '../models';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';

export const enrollmentsFeatureKey = 'enrollments';

export interface State {
  isLoading: boolean;
  isLoadingStudentsAndCourses: boolean;
  enrollments: Enrollment[];
  students: Student[];
  courses: Course[];
  error: unknown;
}

export const initialState: State = {
  isLoading: false,
  isLoadingStudentsAndCourses: false,
  enrollments: [],
  students: [],
  courses: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentsActions.loadEnrollments, state => {
    return {
      ...state,
      isLoading: true
    }
  }),
  on(EnrollmentsActions.loadEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      enrollments: action.data,
      error: null,
    }
  }),
  on(EnrollmentsActions.loadEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    }
  }),


  on(EnrollmentsActions.loadStudentsAndCourses, (state) => ({
      ...state,
      isLoadingStudentsAndCourses: true,
  })),
  on(EnrollmentsActions.loadStudentsAndCoursesSuccess, (state, action) => ({
    ...state,
    isLoadingStudentsAndCourses: false,
    students: action.data.students,
    courses: action.data.courses,
    error: null,
})),
on(EnrollmentsActions.loadStudentsAndCoursesFailure, (state, action) => ({
  ...state,
  isLoadingStudentsAndCourses: false,
  error: action.error
})),


on(EnrollmentsActions.createEnrollmentSuccess, (state, action) => ({
...state,
enrollments: [...state.enrollments, action.data],
error: null,
})),


on(EnrollmentsActions.deleteEnrollmentSuccess, (state, action) => ({
  ...state,
  enrollments: state.enrollments.filter((s) => s.id !== action.data.id),
  error: null,
  })),
);

export const enrollmentsFeature = createFeature({
  name: enrollmentsFeatureKey,
  reducer,
});

