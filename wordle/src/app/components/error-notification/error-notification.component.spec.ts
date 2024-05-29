import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorNotificationComponent } from './error-notification.component';
import { ErrorNotificationService } from '../../domain/services/error-notification/error-notification.service';
import { Subject } from 'rxjs';

describe('ErrorNotificationComponent', () => {
  let component: ErrorNotificationComponent;
  let fixture: ComponentFixture<ErrorNotificationComponent>;
  let errorService: ErrorNotificationService;
  let errorSubject: Subject<string>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorNotificationComponent],
      providers: [ErrorNotificationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNotificationComponent);
    component = fixture.componentInstance;
    errorService = TestBed.inject(ErrorNotificationService);
    errorSubject = (errorService as any).errorSubject; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message when received from service', () => {
    const errorMessage = 'Test error message';
    errorSubject.next(errorMessage); 
    fixture.detectChanges();
    const errorMessageElement = fixture.nativeElement.querySelector('.error-notification p');
    expect(errorMessageElement.textContent).toContain(errorMessage);
  });

  it('should hide error message after 3 seconds', (done) => {
    const errorMessage = 'Test error message';
    errorSubject.next(errorMessage);
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      const errorMessageElement = fixture.nativeElement.querySelector('.error-notification');
      expect(errorMessageElement).toBeNull();
      done();
    }, 3000);
  });
});