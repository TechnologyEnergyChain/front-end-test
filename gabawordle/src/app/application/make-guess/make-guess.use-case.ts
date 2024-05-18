import { Observable } from 'rxjs';
import IGameService from '@domain/services/game.service.interface';
import { Guess } from '@domain/models/guess.model';
import { GAME_SERVICE_TOKEN } from '@domain/tokens';
import { inject } from '@angular/core';

export class MakeGuessUseCase {
  gameService: IGameService = inject(GAME_SERVICE_TOKEN);

  execute(word: string): Observable<Guess> {
    return this.gameService.makeGuess(word);
  }
}
