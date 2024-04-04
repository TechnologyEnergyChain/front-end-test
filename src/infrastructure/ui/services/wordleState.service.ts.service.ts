import { Injectable, signal } from '@angular/core';
import { guessRepositoryFake } from '../../httpFake/guessRepositoty';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { createEmptyRowLetter, createEmptyTableWord, getWord, guessToWord, isRepeatedWord } from '../shared/helper';
import { WordleApiService } from './wordleApi.service';
import { Word } from '../models/word';
import { Game } from '@infrastructure/data/model/game';
import { MAX_TRIES } from '@infrastructure/data/constants/gameConfig';
import { Guess, GuessIntent } from '@infrastructure/data/model/guess';
import { REPEATED_WORD } from '../shared/constants';

@Injectable({
    providedIn: 'root',
})
export class WordleStateService {
    gameID: string = '';
    game!: Game;
    words: Word[] = [];
    isGameFinishSignal = signal<boolean>(false);
    showErrorSignal = signal<string>('');

    allWordSubject$: Subject<Word[]> = new BehaviorSubject<Word[]>(this.words);
    gameSubject$: Subject<Game> = new ReplaySubject<Game>();

    actualLetter: number = 0;
    actualWord: number = 0;

    constructor(private wordleApiService: WordleApiService) {
        this.createScenarioGame();

        this.allWordSubject$.subscribe((words: Word[]) => {
            this.words = words;
        });

        this.gameSubject$.subscribe((game: Game) => {
            this.game = game;
        });
    }

    getAllWords(): Observable<Word[]> {
        return this.allWordSubject$.asObservable();
    }

    getGameState(): Observable<Game> {
        return this.gameSubject$.asObservable();
    }

    async play(word: Word): Promise<void> {
        if (isRepeatedWord(getWord(word), this.game.guesses)) {
            this.showErrorSignal.set(REPEATED_WORD);
            const wordLetters = createEmptyRowLetter();
            this.words[this.actualWord].letters = wordLetters;
            this.actualLetter = 0;
            this.allWordSubject$.next(this.words);
            return;
        }

        this.showErrorSignal.set('');

        const guessIntent: GuessIntent = {
            gameId: this.gameID,
            guessWord: getWord(word),
        };
        const guess: Guess = await guessRepositoryFake.makeGuess(guessIntent);

        const isGameFinish = guess.attemptsLeft >= 0 && !guess.isGameWon;
        isGameFinish ? (this.actualWord++, (this.actualLetter = 0)) : this.isGameFinishSignal.set(true);

        const game: Game = await this.wordleApiService.getGameDetails(this.gameID);
        this.words = guessToWord(game.guesses, this.words);
        this.gameSubject$.next(game);
        this.allWordSubject$.next(this.words);
    }

    async createScenarioGame(): Promise<void> {
        try {
            const gameId = await this.wordleApiService.startGame();
            this.gameID = gameId;
            const game = await this.wordleApiService.getGameDetails(gameId);
            this.gameSubject$.next(game);
            this.setInitialTable();
            this.isGameFinishSignal.set(false);
        } catch (error) {
            console.error('Error on init game:', error);
        }
    }

    private setInitialTable(): void {
        const words: Word[] = createEmptyTableWord();
        this.allWordSubject$.next(words);
        this.actualLetter = 0;
        this.actualWord = this.game.attemptsLeft - MAX_TRIES + 1;
    }
}
