import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IToastService } from '@domain/services/toast.service.interface';
import { TOAST_SERVICE_TOKEN } from '@domain/tokens';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  animations: [
    trigger('toastTrigger', [
      state('open', style({ transform: 'translateY(0%)' })),
      state('close', style({ transform: 'translateY(-200%)' })),
      transition('open <=> close', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class ToastComponent {
  toastService: IToastService = inject(TOAST_SERVICE_TOKEN);

  dismiss(): void {
    console.log('dismiss');
    this.toastService.dismissToast();
  }
}
