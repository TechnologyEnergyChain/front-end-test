import { Injectable } from '@angular/core';
import { IToastService, TOAST_STATE } from '@domain/services/toast.service.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastServiceImp implements IToastService {
  private timeOut: any;
  public showsToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Default Toast Message'
  );
  public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>(
    TOAST_STATE.SUCCESS
  );

  showToast(toastState: string, toastMsg: string): void {
    this.dismissToast();
    clearTimeout(this.timeOut);

    this.toastState$.next(toastState);
    this.toastMessage$.next(toastMsg);
    this.showsToast$.next(true);

    this.timeOut = setTimeout(() => {
      this.dismissToast();
    }, 3000);
  }

  dismissToast(): void {
    this.showsToast$.next(false);
  }
}
