import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CoursesComponent } from './features/dashboard/courses/courses.component';
import { StudentsComponent } from './features/dashboard/students/students.component';
import { EnrollmentsComponent } from './features/dashboard/enrollments/enrollments.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    //component: LoginComponent,
    loadChildren: () => import('./features/auth/auth.module').then(
      (referenciaAlArchivo) => referenciaAlArchivo.AuthModule
    ),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/dashboard.module').then(
      (m) => m.DashboardModule
    ),
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
