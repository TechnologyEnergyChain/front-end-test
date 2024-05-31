import { Observable } from "rxjs";
import { GetGameDetails200Response } from "../model/get-game-details200-response";
import { MakeGuess200Response } from "../model/make-guess200-response";
import { RAEResponse } from "../model/rae-response";
import { StartGame201Response } from "../model/start-game201-response";
import { StartGame400Response } from "../model/start-game400-response";

export class WordGameLogic {

    readonly MAX_WORDS = 6;
    readonly MAX_WORD_LENGTH = 5;
    readonly SECRET_WORD = 'SOLAR';

    private gameIds: string[] = [];
    private writtenWords: any[] = [];
    private wordsCount: number = this.MAX_WORDS;
    private status: GetGameDetails200Response.StatusEnum = GetGameDetails200Response.StatusEnum._0;

    startGame(difficulty?: GetGameDetails200Response.StatusEnum): Observable<StartGame201Response |
        StartGame400Response> {
        return new Observable(obs => {

            this.gameIds = [];
            this.writtenWords = [];
            this.wordsCount = this.MAX_WORDS;
            this.status = GetGameDetails200Response.StatusEnum._0

            if (difficulty) {
            }

            const gameId = `id${this.gameIds.length + 1}`;
            this.gameIds.push(gameId);

            obs.next({ gameId });
            obs.complete();
        });
    }


    makeGuess(gameId: string, guessWord: string): Observable<MakeGuess200Response> {
        return new Observable(obs => {

            const word = guessWord.toLocaleUpperCase();

            if (!word || word.length != this.MAX_WORD_LENGTH) {
                obs.error({ error: 'Palabra invalida' });

            } else if (this.wordsCount == 0) {
                obs.error({ error: 'Juego terminado' });

            } else if (!this.gameIds.includes(gameId)) {
                obs.error({ error: 'Juego no encontrado' });

            } else if (this.writtenWords.includes(word.toLocaleUpperCase())) {
                obs.error({ error: 'La palabra esta repetida' });

            } else {

                this.wordsCount--;

                this.writtenWords.push(word.toLocaleUpperCase());
                const guessWord = word.split('');
                const secretWordArr = this.SECRET_WORD.split('');

                const result = guessWord.map((gw, i) => {
                    if (secretWordArr.find((sw, j) => sw == gw && j == i)) return 2;
                    else if (secretWordArr.find((sw) => sw == gw)) return 1;
                    else return 0;
                }).join('');

                const isWin = result === '22222';
                if (isWin) {
                    this.status = GetGameDetails200Response.StatusEnum._1;
                } else if (!isWin && this.wordsCount == this.MAX_WORDS) {
                    this.status = GetGameDetails200Response.StatusEnum._2;
                } else {
                    this.status = GetGameDetails200Response.StatusEnum._0;
                }

                obs.next({
                    result,
                    isGameWon: isWin,
                    attemptsLeft: this.wordsCount
                });

                obs.complete();
            }
        });
    }

    getGameDetails(gameId: string): Observable<GetGameDetails200Response> {
        return new Observable(obs => {
            if (!gameId) {
                obs.error({ error: 'El id del juego no existe' });

            } else {
                obs.next({
                    gameId,
                    guesses: this.writtenWords,
                    attemptsLeft: this.wordsCount,
                    status: this.status,
                    wordToGuess: this.writtenWords[this.writtenWords?.length - 1]
                });
            }

            obs.complete();
        });
    }

    exist(word: string) {
        return new Observable<RAEResponse>(obs => {
            obs.next({ exist: true })
            obs.complete();
        });
    }
}