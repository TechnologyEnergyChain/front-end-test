import { Component, HostListener, OnInit } from '@angular/core';
import { ErrorNotificationService } from '../../domain/services/error-notification/error-notification.service';
import { Guess } from '../../domain/models/guess.model';
import { GameStatusService } from '../../domain/services/game-status/game-status.service';
import { GameService } from '../../domain/services/game/game.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  board: string[][] = Array(6).fill(null).map(() => Array(5).fill(''));
  currentRow: number = 0;
  currentCol: number = 0;
  usedWords: string[] = [];
  maxAttempts: number = 6;
  gameId: string = '';
  isGameActive: boolean = false;

  constructor(
    private errorNotificationService: ErrorNotificationService,
    private gameStatusService: GameStatusService,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameStatusService.getGameId().subscribe((gameId: string | null) => {
      this.gameId = gameId || '';
    });

    this.gameStatusService.getIsGameActive().subscribe((isActive: boolean) => {
      this.isGameActive = isActive;
    });

    this.gameStatusService.getResetBoard().subscribe(() => {
      this.resetBoard();
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (!this.isGameActive) {
      return;
    }

    const key = event.key.toUpperCase();

    if (this.currentRow < this.board.length) {
      if (event.key === 'Backspace') {
        if (this.currentCol > 0) {
          this.currentCol--;
          this.board[this.currentRow][this.currentCol] = '';
        }
      } else if (event.key === 'Enter') {
        const word = this.board[this.currentRow].join('').toUpperCase();
        if (this.currentCol < 5) {
          this.errorNotificationService.showError('Please enter exactly 5 letters.');
        } else if (this.usedWords.includes(word)) {
          this.errorNotificationService.showError('You have already used this word.');
        } else {
          this.usedWords.push(word);
          this.makeGuess(word);
        }
      } else if (key.length === 1 && key >= 'A' && key <= 'Z') {
        if (this.currentCol < this.board[this.currentRow].length) {
          this.board[this.currentRow][this.currentCol] = key;
          this.currentCol++;
        }
      }
    }
  }

  makeGuess(word: string) {
    this.gameService.makeGuess(this.gameId, word).subscribe({
      next: (response: Guess) => {
        if (this.isValidResult(response.result)) {
          this.applyColors(response.result);
        }
        if (response.isGameWon) {
          this.gameStatusService.setIsGameActive(false);
          this.gameStatusService.setShowVictoryMessageSubject(true)
        } else if (response.attemptsLeft === 0) {
          this.gameStatusService.setIsGameActive(false);
          this.gameStatusService.setShowDefeatMessageSubject(true)
        } else {
          this.currentRow++;
          this.currentCol = 0;
        }
      },
      error: (error) => {
        this.errorNotificationService.showError(error.message);
      }
    });
  }

  isValidResult(result: string): boolean {
    return result.length === 5 && /^[012]+$/.test(result);
  }

  applyColors(result: string) {
    for (let col = 0; col < result.length; col++) {
      const colorClass = this.getColorClassForResult(result[col]);
      const cellElement = document.getElementById(`cell-${this.currentRow}-${col}`);
      if (cellElement) {
        cellElement.classList.remove('grey-cell', 'yellow-cell', 'green-cell', 'white-cell');
        cellElement.classList.add(colorClass);
      }
    }
  }

  getColorClassForResult(value: string): string {
    switch (value) {
      case '0':
        return 'grey-cell';
      case '1':
        return 'yellow-cell';
      case '2':
        return 'green-cell';
      default:
        return 'white-cell';
    }
  }

  resetBoard(): void {
    this.board = Array(6).fill(null).map(() => Array(5).fill(''));
    this.currentRow = 0;
    this.currentCol = 0;
    this.usedWords = [];
  }
}
