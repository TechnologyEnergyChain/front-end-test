import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../../domain/models/game.model';
import { Guess } from '../../../domain/models/guess.model';

@Injectable({
    providedIn: 'root'
})
export class WordleApiAdapter {

    private readonly apiUrl = 'http://localhost:5000/v1';

    constructor(private http: HttpClient) { }

    public getApiUrl(): string {
        return this.apiUrl;
    }

    startGame(difficulty: string): Observable<Game> {
        return this.http.post<Game>(`${this.apiUrl}/game`, { difficulty });
    }

    makeGuess(gameId: string, guessWord: string): Observable<Guess> {
        return this.http.post<Guess>(`${this.apiUrl}/game/${gameId}/guess?guessWord=${guessWord}`, {});
    }

    getGameDetails(gameId: string): Observable<Game> {
        return this.http.get<Game>(`${this.apiUrl}/game/${gameId}`);
    }
}
