import { Guess } from '@domain/models/guess.model';
import { Observable } from 'rxjs';

export default interface IGameService {
  startGame(): void;
  makeGuess(word: string): Observable<Guess>;
  validateInput(key: string): boolean;
}
