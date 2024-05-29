import { Component, OnInit } from '@angular/core';
import { ErrorNotificationService } from '../../domain/services/error-notification/error-notification.service';
import { GameStatusService } from '../../domain/services/game-status/game-status.service';
import { GameService } from '../../domain/services/game/game.service';

@Component({
  selector: 'app-game-overlay',
  templateUrl: './game-overlay.component.html',
  styleUrls: ['./game-overlay.component.css']
})
export class GameOverlayComponent implements OnInit {
  isGameActive: boolean = false;
  showVictoryMessage: boolean = false;
  showDefeatMessage: boolean = false;

  constructor(
    private gameService: GameService,
    private errorNotificationService: ErrorNotificationService,
    private gameStatusService: GameStatusService
  ) { }

  ngOnInit(): void {
    this.gameStatusService.getIsGameActive().subscribe((isActive: boolean) => {
      this.isGameActive = isActive;
    });

    this.gameStatusService.getShowVictoryMessage().subscribe((showMessage: boolean) => {
      this.showVictoryMessage = showMessage;
    });

    this.gameStatusService.getShowDefeatMessage().subscribe((showMessage: boolean) => {
      this.showDefeatMessage = showMessage;
    });
  }

  selectDifficulty(difficulty: string) {
    this.gameService.startGame(difficulty).subscribe({
      next: (game) => {
        this.gameStatusService.sendResetBoardSignal();
        this.gameStatusService.setGameId(game.gameId);
        this.gameStatusService.setIsGameActive(true);
      },
      error: (error) => {
        this.errorNotificationService.showError(error.message);
      }
    });
  }

  get isOverlayVisible(): boolean {
    return !this.isGameActive;
  }
}
