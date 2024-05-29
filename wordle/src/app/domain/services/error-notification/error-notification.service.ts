import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorNotificationService {
  private errorSubject = new Subject<string>();
  public error$ = this.errorSubject.asObservable();

  showError(message: string) {
    this.errorSubject.next(message);
  }
}