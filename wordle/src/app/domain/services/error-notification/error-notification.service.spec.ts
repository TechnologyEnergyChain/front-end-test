import { ErrorNotificationService } from './error-notification.service';

describe('ErrorNotificationService', () => {
  let service: ErrorNotificationService;

  beforeEach(() => {
    service = new ErrorNotificationService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit error messages', () => {
    const errorMessage = 'Test error message';
    service.error$.subscribe((message) => {
      expect(message).toEqual(errorMessage);
    });
    service.showError(errorMessage);
  });
});
