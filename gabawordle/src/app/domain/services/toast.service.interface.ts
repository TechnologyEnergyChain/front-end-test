import { Observable } from 'rxjs';

export const TOAST_STATE = {
  SUCCESS: 'success-toast',
  WARNING: 'warning-toast',
  DANGER: 'danger-toast',
};

export interface IToastService {
  showToast(toastState: string, toastMsg: string): void;
  dismissToast(): void;
  showsToast$: Observable<boolean>;
  toastMessage$: Observable<string>;
  toastState$: Observable<string>;
}
