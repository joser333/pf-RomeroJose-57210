import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CoursesComponent } from './pages/dashboard/courses/courses.component';
import { StudentsComponent } from './pages/dashboard/students/students.component';
import { EnrollmentsComponent } from './pages/dashboard/enrollments/enrollments.component';
import { HomeComponent } from './pages/dashboard/home/home.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'courses',
        component: CoursesComponent
      },
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'enrollments',
        component: EnrollmentsComponent
      },
      {
        path: '**',
        redirectTo: '/dashboard/home'
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
