import { Component, OnInit } from '@angular/core';
import { ErrorNotificationService } from '../../domain/services/error-notification/error-notification.service';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.css']
})
export class ErrorNotificationComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private errorNotificationService: ErrorNotificationService) { }

  ngOnInit(): void {
    this.errorNotificationService.error$.subscribe(message => {
      this.errorMessage = message;
      setTimeout(() => this.errorMessage = null, 3000);
    });
  }
}