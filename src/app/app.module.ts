import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { AuthModule } from './pages/auth/auth.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { StudentDialogComponent } from './dashboard/students/components/student-dialog/student-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    AuthModule
  ],
  providers: [
    provideAnimationsAsync(), provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
