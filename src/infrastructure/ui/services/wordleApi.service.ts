import { Injectable } from '@angular/core';
import { gameRepositoryFake } from '../../httpFake/gameRepository';
import { GameDifficulty } from '@domain/entity/Game';
import { guessRepositoryFake } from '../../httpFake/guessRepositoty';
import { GuessIntent } from '@domain/entity/Guess';
import { Game } from '@infrastructure/data/model/game';

@Injectable({
    providedIn: 'root',
})
export class WordleApiService {
    constructor() {}

    startGame(difficulty?: GameDifficulty): Promise<string> {
        return gameRepositoryFake.startGame(difficulty);
    }

    getGameDetails(gameId: string): Promise<Game> {
        return gameRepositoryFake.getGameDetails(gameId);
    }

    makeGuess(guess: GuessIntent) {
        return guessRepositoryFake.makeGuess(guess);
    }
}
