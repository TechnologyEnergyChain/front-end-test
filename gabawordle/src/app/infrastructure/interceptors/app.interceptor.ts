import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IToastService } from '@domain/services/toast.service.interface';
import { TOAST_SERVICE_TOKEN } from '@domain/tokens';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  toastService: IToastService = inject(TOAST_SERVICE_TOKEN);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return new Observable((observer) => {
      next.handle(req).subscribe(
        (event) => observer.next(event),
        (err) => {
          const msg = err.error.msg || 'Error en la petición';
          this.toastService.showToast('danger-toast', msg);
          observer.error(err);
        }
      );
    });
  }
}
