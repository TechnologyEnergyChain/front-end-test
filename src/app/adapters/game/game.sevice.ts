import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { GetGameDetails200Response } from "../../domain/model/get-game-details200-response";
import { MakeGuess200Response } from "../../domain/model/make-guess200-response";
import { StartGameRequest } from "../../domain/model/start-game-request";
import { StartGame201Response } from "../../domain/model/start-game201-response";
import { IGamePort } from "../../domain/ports/i-game-port";
import { Observable } from "rxjs";

export const API_URL = new InjectionToken<string>('API_URL');

@Injectable()
export class GameService implements IGamePort {

    private gameEnpoint: string = 'game';

    private get getApiPath() {
        return `${this.apiUrl}/${this.gameEnpoint}`;
    }

    constructor(
        @Inject(API_URL) private apiUrl: string,
        private http: HttpClient
    ) { }

    startGame(startGameRequest?: StartGameRequest): Observable<StartGame201Response> {
        let params: HttpParams | null = null;
        if (startGameRequest?.difficulty) {
            params = new HttpParams().set('difficulty', startGameRequest?.difficulty);
        }
        return (this.http).post(`${this.getApiPath}`, null, params ? { params } : {});
    }

    makeGuess(gameId: string, guessWord: string): Observable<MakeGuess200Response> {
        const params = new HttpParams().set('guessWord', guessWord);
        return this.http.post(`${this.getApiPath}/${gameId}/guess`, null, { params });
    }

    getGameDetails(gameId: string): Observable<GetGameDetails200Response> {
        return this.http.get(`${this.getApiPath}/guess/${gameId}`);
    }
}