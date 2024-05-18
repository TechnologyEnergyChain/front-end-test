import { Guess } from '@domain/models/guess.model';
import { Observable, from, map } from 'rxjs';
import { GuessDTO } from './guess.dto';

export const guessDtoToGuess = (
  guess: Observable<Guess>
): Observable<GuessDTO> => {
  return from(guess).pipe(
    map((guess: GuessDTO) => {
      return {
        attemptsLeft: guess.attemptsLeft,
        isGameWon: guess.isGameWon,
        result: guess.result,
      };
    })
  );
};
