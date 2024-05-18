import { Observable } from 'rxjs';

export interface IKeyboardService {
  keyPress$: Observable<string>;
}
