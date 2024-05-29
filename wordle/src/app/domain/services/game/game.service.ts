import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Game } from '../../models/game.model';
import { Guess } from '../../models/guess.model';
import { WordleApiAdapter } from '../../../infrastructure/adapters/wordle-api/wordle-api.adapter';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameIdSubject = new BehaviorSubject<string | null>(null);
  private isGameActiveSubject = new BehaviorSubject<boolean>(false);
  private currentGameSubject = new BehaviorSubject<Game | null>(null);

  constructor(private apiAdapter: WordleApiAdapter) {}

  startGame(difficulty: string): Observable<Game> {
    return this.apiAdapter.startGame(difficulty);
  }

  makeGuess(gameId: string, guessWord: string): Observable<Guess> {
    return this.apiAdapter.makeGuess(gameId, guessWord);
  }

  getGameDetails(gameId: string): Observable<Game> {
    return this.apiAdapter.getGameDetails(gameId);
  }

}
