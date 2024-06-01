import {Subject} from 'rxjs'
import {Injectable} from '@angular/core'
import {Toast} from '@src/core/toast/domain/entities/Toast'

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private alertSubject = new Subject<Toast>()

  alertState = this.alertSubject.asObservable()

  showAlert(toast: Toast) {
    this.alertSubject.next(toast)
    // FIXME: this is a trick to remove the toast, but it isn't the best solution.
    setTimeout(()=>{
      this.clearAlert()
    }, 5000)
  }

  clearAlert() {
    this.alertSubject.next(new Toast())
  }
}
