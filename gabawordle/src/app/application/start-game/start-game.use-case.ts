import { inject } from '@angular/core';
import IGameService from '@domain/services/game.service.interface';
import { GAME_SERVICE_TOKEN } from '@domain/tokens';

export class StartGameUseCase {
  gameService: IGameService = inject(GAME_SERVICE_TOKEN);
  execute() {
    this.gameService.startGame();
  }
}
