import { Injectable } from '@angular/core';
import { IKeyboardService } from '@domain/services/keyboard.service.inteface';
import { Subject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyboardServiceImp implements IKeyboardService {
  private keyPressSubject = new Subject<string>();

  keyPress$ = this.keyPressSubject.asObservable();

  constructor() {
    fromEvent<KeyboardEvent>(document, 'keydown').subscribe(
      (event: KeyboardEvent) => {
        this.setKey(event.key);
      }
    );
  }

  setKey(key: string) {
    this.keyPressSubject.next(key);
  }
}
