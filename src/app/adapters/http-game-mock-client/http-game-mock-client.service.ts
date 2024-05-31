import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { WordGameLogic } from "../../domain/game/word-game-logic";
import { GetGameDetails200Response } from "../../domain/model/get-game-details200-response";

@Injectable()
export class HttpGameMockCLient {

    private readonly worldGameMockService: WordGameLogic = new WordGameLogic();

    get(url: string): Observable<any> {
        const gameId = url.split('/')[1];
        if (url?.endsWith('guess')) {
            return this.worldGameMockService.getGameDetails(gameId);
        } else if (url?.endsWith('exist-word')) {
            return this.worldGameMockService.exist(gameId);
        } else {
            return this.httpNotFOund();
        }
    }

    post(url: string, _body: null, options: { params: HttpParams } | null): Observable<any> {
        if (url?.endsWith('game')) {
            const difficulty = options?.params?.get('difficulty') as GetGameDetails200Response.StatusEnum;
            return this.worldGameMockService.startGame(difficulty);

        } else if (url?.endsWith('guess')) {
            const gameId = url.split('/').reverse()[1];
            const currentWord = options?.params?.get('guessWord') as string;
            return this.worldGameMockService.makeGuess(gameId, currentWord);
        } else {
            return this.httpNotFOund();
        }
    }

    private httpNotFOund() {
        return throwError(() => new HttpErrorResponse({
            status: 404,
            error: 'Ruta no existe',
            statusText: 'Ruta no existe'
        }));
    }
}