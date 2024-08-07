import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentsComponent } from './students/students.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';

const routes: Routes = [
  {
    path: 'home',
    //component: HomeComponent
    loadChildren: () => import('./home/home.module').then(
      (m) => m.HomeModule
    )
  },
  {
    path: 'courses',
    //component: CoursesComponent
    loadChildren: () => import('./courses/courses.module').then(
      (m) => m.CoursesModule
    )
  },
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then(
      (m) => m.StudentsModule
    )
  },
  {
    path: 'enrollments',
    loadChildren: () => import('./enrollments/enrollments.module').then(
      (m) => m.EnrollmentsModule
    )
  },
  {
    path: '**',
    redirectTo: '/dashboard/home'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
