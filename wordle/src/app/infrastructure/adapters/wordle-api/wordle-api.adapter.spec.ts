import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WordleApiAdapter } from './wordle-api.adapter';
import { Game, GameStatus } from '../../../domain/models/game.model';
import { Guess } from '../../../domain/models/guess.model';

describe('WordleApiAdapter', () => {
  let adapter: WordleApiAdapter;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WordleApiAdapter]
    });
    adapter = TestBed.inject(WordleApiAdapter);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should start a game', () => {
    const apiUrl = adapter.getApiUrl();
    const difficulty = 'easy';
    const expectedGame: Game = {
        gameId: '',
        status: GameStatus.InProgress,
        wordToGuess: '',
        guesses: []
    };

    adapter.startGame(difficulty).subscribe(game => {
      expect(game).toEqual(expectedGame);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/game`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ difficulty });

    req.flush(expectedGame);
  });

  it('should make a guess', () => {
    const apiUrl = adapter.getApiUrl();
    const gameId = '123';
    const guessWord = 'WORD';
    const expectedGuess: Guess = {
        result: '00000',
        attemptsLeft: 0,
        isGameWon: false
    };

    adapter.makeGuess(gameId, guessWord).subscribe(guess => {
      expect(guess).toEqual(expectedGuess);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/game/${gameId}/guess?guessWord=${guessWord}`);
    expect(req.request.method).toBe('POST');

    req.flush(expectedGuess);
  });

  it('should get game details', () => {
    const apiUrl = adapter.getApiUrl();
    const gameId = '123';
    const expectedGame: Game = {
        gameId: '',
        status: GameStatus.InProgress,
        wordToGuess: '',
        guesses: []
    };

    adapter.getGameDetails(gameId).subscribe(game => {
      expect(game).toEqual(expectedGame);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/game/${gameId}`);
    expect(req.request.method).toBe('GET');

    req.flush(expectedGame);
  });
});
