import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeyboardComponent } from '../../../components/keyboard/keyboard.component';
import { WordleStateService } from '../../../services/wordleState.service.ts.service';
import { LetterState } from '../../../models/letter';
import { LineLetterComponent } from '../../../components/line-letter/line-letter.component';
import { GameStatus } from '@domain/entity/Game';
import { Word } from '../../../models/word';
import { HeaderComponent } from '../../../components/header/header.component';
import { Game } from '@infrastructure/data/model/game';
import { ThemeService } from '../../../services/theme.service';
import { NgClass } from '@angular/common';
import { STATUS_MESSAGE } from '../../../shared/helper';
import { Subscription } from 'rxjs';
import { MAX_WORD_LETTERS } from '@infrastructure/data/constants/gameConfig';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [KeyboardComponent, LineLetterComponent, HeaderComponent, NgClass],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
    words: Word[] = [];
    game!: Game;
    readonly isGameFinish = this.wordleStateService.isGameFinishSignal.asReadonly();
    readonly showError = this.wordleStateService.showErrorSignal.asReadonly();
    readonly themeSignal = this.themeService.themeSignal.asReadonly();

    subscriptionWords: Subscription = new Subscription();
    subscriptionGame: Subscription = new Subscription();

    constructor(
        private wordleStateService: WordleStateService,
        private themeService: ThemeService
    ) {}

    ngOnInit(): void {
        this.subscriptionWords = this.wordleStateService.getAllWords().subscribe((words) => {
            this.words = words;
        });

        this.subscriptionGame = this.wordleStateService.getGameState().subscribe((game: Game) => {
            this.game = game;
        });
    }

    keyClick(key: string): void {
        this.words[this.wordleStateService.actualWord].letters[this.wordleStateService.actualLetter].value = key;
        this.words[this.wordleStateService.actualWord].letters[this.wordleStateService.actualLetter].state = LetterState.FILL;
        this.wordleStateService.allWordSubject$.next(this.words);
        if (this.wordleStateService.actualLetter < MAX_WORD_LETTERS - 1) {
            this.wordleStateService.actualLetter++;
        }
    }

    sendGuess(): void {
        this.wordleStateService.play(this.words[this.wordleStateService.actualWord]);
    }

    tryAgain(): void {
        this.wordleStateService.createScenarioGame();
    }

    isDisabled(): boolean {
        const allLetters = !this.words[this.wordleStateService.actualWord].letters.every((letter) => letter.value !== '');
        const canContinue = this.game?.attemptsLeft >= 0;
        const isFinishGame = this.game?.status !== GameStatus.PLAYING;

        return allLetters || !canContinue || isFinishGame;
    }

    showUserCommand(): string {
        const status: GameStatus = this.game?.status;
        return STATUS_MESSAGE[status];
    }

    ngOnDestroy(): void {
        this.subscriptionWords.unsubscribe();
        this.subscriptionGame.unsubscribe();
    }
}
