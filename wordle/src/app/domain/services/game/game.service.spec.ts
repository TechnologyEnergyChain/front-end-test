import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GameService } from './game.service';
import { WordleApiAdapter } from '../../../infrastructure/adapters/wordle-api/wordle-api.adapter';
import { Game, GameStatus } from '../../models/game.model';
import { Guess } from '../../models/guess.model';

describe('GameService', () => {
  let service: GameService;
  let wordleApiAdapter: jasmine.SpyObj<WordleApiAdapter>;

  beforeEach(() => {
    const wordleApiAdapterSpy = jasmine.createSpyObj('WordleApiAdapter', ['startGame', 'makeGuess', 'getGameDetails']);

    TestBed.configureTestingModule({
      providers: [
        GameService,
        { provide: WordleApiAdapter, useValue: wordleApiAdapterSpy }
      ]
    });
    
    service = TestBed.inject(GameService);
    wordleApiAdapter = TestBed.inject(WordleApiAdapter) as jasmine.SpyObj<WordleApiAdapter>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start a game', () => {
    const difficulty = 'easy';
    const expectedGame: Game = {
        gameId: '123',
        status: GameStatus.InProgress,
        wordToGuess: 'WORD',
        guesses: []
      };
    wordleApiAdapter.startGame.and.returnValue(of(expectedGame));

    service.startGame(difficulty).subscribe(game => {
      expect(game).toEqual(jasmine.objectContaining(expectedGame));
    });
  });

  it('should make a guess', () => {
    const gameId = '123';
    const guessWord = 'GUESS';
    const expectedGuess: Guess = {
        result: 'RESULT',
        attemptsLeft: 3,
        isGameWon: false
      };
    wordleApiAdapter.makeGuess.and.returnValue(of(expectedGuess));

    service.makeGuess(gameId, guessWord).subscribe(guess => {
      expect(guess).toEqual(jasmine.objectContaining(expectedGuess));
    });
  });

  it('should get game details', () => {
    const gameId = '123';
    const expectedGame: Game = {
        gameId: '123',
        status: GameStatus.InProgress,
        wordToGuess: 'WORD',
        guesses: []
      };
    wordleApiAdapter.getGameDetails.and.returnValue(of(expectedGame));

    service.getGameDetails(gameId).subscribe(game => {
      expect(game).toEqual(jasmine.objectContaining(expectedGame));
    });
  });
});
