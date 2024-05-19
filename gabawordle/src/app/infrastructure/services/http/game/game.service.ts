// infrastructure/services/game.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { GuessDTO } from './guess.dto';

@Injectable({
  providedIn: 'root',
})
export class GameHttpService {
  http: HttpClient = inject(HttpClient);
  gameId: string = '';

  startGame() {
    this.http
      .post(`${environment.api}/game`, {
        difficulty: 'easy',
      })
      .subscribe((data: any) => {
        this.gameId = data['gameId'];
      });
  }

  makeGuess(word: string): Observable<GuessDTO> {
    return this.http.post<GuessDTO>(
      `${environment.api}/game/${this.gameId}/guess?guessWord=${word}`,
      {}
    );
  }


}
