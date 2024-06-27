import {Component, Input} from '@angular/core'
import {NgClass, NgIf} from '@angular/common'
import {Toast} from '@src/core/toast/domain/entities/Toast'

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() toast?: Toast

  constructor() { }

}
