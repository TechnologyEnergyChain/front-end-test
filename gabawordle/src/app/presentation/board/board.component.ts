import { Component, OnInit, inject } from '@angular/core';
import { WordComponent } from '@presentation/word/word.component';
import { JsonPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import {
  IToastService,
  TOAST_STATE,
} from '@domain/services/toast.service.interface';
import IGameService from '@domain/services/game.service.interface';
import { Word } from '@domain/models/word.model';
import { Letter, LetterStatus } from '@domain/models/letter.model';
import {
  GAME_SERVICE_TOKEN,
  KEYBOARD_SERVICE_TOKEN,
  TOAST_SERVICE_TOKEN,
} from '@domain/tokens';
import { IKeyboardService } from '@domain/services/keyboard.service.inteface';
import { KeyboardComponent } from '@presentation/keyboard/keyboard.component';
import { MakeGuessUseCase } from '@application/make-guess/make-guess.use-case';
import { StartGameUseCase } from '@application/start-game/start-game.use-case';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [WordComponent, JsonPipe, KeyboardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  maxWords: number = 6;
  maxWordLength: number = 5;
  wordCounter: number = 0;
  letterCounter: number = 0;
  keyboardService: IKeyboardService = inject(KEYBOARD_SERVICE_TOKEN);
  toastService: IToastService = inject(TOAST_SERVICE_TOKEN);
  gameService: IGameService = inject(GAME_SERVICE_TOKEN);

  usedLetters: Letter[] = [];

  words: Word[] = this.initializeWords();
  gameover: boolean = false;

  makeGuessUseCase = new MakeGuessUseCase();
  startGameUseCase = new StartGameUseCase();

  ngOnInit(): void {
    this.startGameUseCase.execute();
    this.keyboardService.keyPress$.subscribe((key) => this.gameLoop(key));
    this.toastService.showToast(TOAST_STATE.SUCCESS, 'Game started!');
  }

  private initializeWords(): Word[] {
    return Array.from({ length: this.maxWords }, () => ({
      word: '',
      letters: Array.from({ length: this.maxWordLength }, () => ({
        letter: '',
        status: LetterStatus.NONE,
      })),
    }));
  }

  private gameLoop(key: string) {
    if (this.gameover) return;
    if (key === 'Enter') {
      if (this.letterCounter === this.maxWordLength) {
        this.checkWord();
        return;
      } else {
        this.toastService.showToast(
          TOAST_STATE.WARNING,
          'Please enter a 5 letter word'
        );
      }
    } else if (key === 'Backspace') {
      this.backspaceHandle();
      return;
    } else if (this.isInputValid(key)) {
      this.handleKeyPress(key);
      return;
    }
  }

  private isInputValid(key: string): boolean {
    return (
      !this.gameover &&
      this.gameService.validateInput(key) &&
      this.wordCounter < this.maxWords &&
      this.letterCounter < this.maxWordLength
    );
  }

  private backspaceHandle() {
    if (this.letterCounter === 0) return;
    this.letterCounter--;
    this.updateWord(this.wordCounter, this.letterCounter, '');
  }

  private handleKeyPress(key: string) {
    const letters = [...this.words[this.wordCounter].letters];

    letters[this.letterCounter] = { letter: key.toUpperCase(), status: -1 };

    this.words[this.wordCounter] = {
      word: this.words[this.wordCounter].word + key.toUpperCase(),
      letters: letters,
    };
    this.letterCounter++;
  }

  private updateWord(wordIndex: number, letterIndex: number, letter: string) {
    const letters = [...this.words[wordIndex].letters];
    letters[letterIndex] = { letter, status: LetterStatus.NONE };

    this.words[wordIndex] = {
      word:
        this.words[wordIndex].word.slice(0, letterIndex) +
        letter +
        this.words[wordIndex].word.slice(letterIndex + 1),
      letters,
    };
  }

  private async checkWord() {
    const currentWord = this.words[this.wordCounter].word;
    if (this.wordAlreadyExists(currentWord)) return;
    const result = await firstValueFrom(
      this.makeGuessUseCase.execute(currentWord)
    );

    this.updateWordStatuses(result.result.split('').map(Number));

    if (result.isGameWon) {
      this.endGame(true);
    } else if (result.attemptsLeft === 0) {
      this.endGame(false);
    } else {
      this.wordCounter++;
      this.letterCounter = 0;
    }
  }

  private updateWordStatuses(statuses: number[]) {
    const letters = this.words[this.wordCounter].letters.map(
      (letter, index) => ({
        letter: letter.letter,
        status: statuses[index] as LetterStatus,
      })
    );
    this.usedLetters = letters;

    this.words[this.wordCounter] = {
      word: this.words[this.wordCounter].word,
      letters,
    };
  }

  private wordAlreadyExists(word: string) {
    const result = this.words.some(
      (w, index) => this.wordCounter !== index && w.word === word
    );
    if (result) {
      this.toastService.showToast(TOAST_STATE.WARNING, 'Word already exists!');
    }
    return result;
  }

  private endGame(won: boolean) {
    if (won) {
      this.toastService.showToast(TOAST_STATE.SUCCESS, 'You won!');
    } else {
      this.toastService.showToast(TOAST_STATE.DANGER, 'You lost!');
    }

    this.gameover = true;
  }

  onVirtualBoardKeyPress(key: string) {
    this.gameLoop(key);
  }
}
