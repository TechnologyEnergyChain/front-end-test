import { Injectable, inject } from '@angular/core';
import IGameService from '@domain/services/game.service.interface';
import { GameHttpService } from './game.service';
import { Guess } from '@domain/models/guess.model';
import { Observable } from 'rxjs';
import { GuessDTO } from './guess.dto';
import { guessDtoToGuess } from './game.mapper';

@Injectable({
  providedIn: 'root',
})
export class GameServiceAdapter implements IGameService {
  gameHttpService = inject(GameHttpService);
  startGame(): void {
    this.gameHttpService.startGame();
  }

  makeGuess(word: string): Observable<Guess> {
    const httpResponse: Observable<GuessDTO> =
      this.gameHttpService.makeGuess(word);
    return guessDtoToGuess(httpResponse);
  }

  validateInput(key: string): boolean {
    const re = /^[a-zA-Z]$/;
    return re.test(key);
  }
}
