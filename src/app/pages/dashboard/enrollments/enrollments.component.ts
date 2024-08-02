import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from './models';
import { EnrollmentsService } from '../../../core/services/enrollments.service';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent {
  isLoading = true;
  enrollments: Enrollment[] = [];
  displayedColumns: string[] = ['course', 'student'];

  constructor(private enrollmentsService: EnrollmentsService){
    
  }

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments(){
    this.enrollmentsService.getEnrollments().subscribe({
      next: (v) => (this.enrollments = v),
      complete: () => (this.isLoading = false),
    }); 
  }

}
