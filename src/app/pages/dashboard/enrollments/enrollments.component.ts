import { Component } from '@angular/core';
import { EnrollmentsService } from '../../../core/enrollments.service';
import { Observable } from 'rxjs';
import { Enrollment } from './models';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent {
  isLoading = true;
  enrollments: Enrollment[] = [];

  constructor(private enrollmentsService: EnrollmentsService){
    this.enrollmentsService.getEnrollments().subscribe({
      next: (v) => (this.enrollments = v),
      complete: () => (this.isLoading = false),
    });
  }


}
