import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameboardComponent } from './gameboard.component';
import { ErrorNotificationService } from '../../domain/services/error-notification/error-notification.service';
import { GameStatusService } from '../../domain/services/game-status/game-status.service';
import { GameService } from '../../domain/services/game/game.service';
import { of } from 'rxjs';
import { Guess } from '../../domain/models/guess.model';

describe('GameboardComponent', () => {
  let component: GameboardComponent;
  let fixture: ComponentFixture<GameboardComponent>;
  let errorNotificationService: jasmine.SpyObj<ErrorNotificationService>;
  let gameStatusService: jasmine.SpyObj<GameStatusService>;
  let gameService: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    const errorNotificationServiceSpy = jasmine.createSpyObj('ErrorNotificationService', ['showError']);
    const gameStatusServiceSpy = jasmine.createSpyObj('GameStatusService', ['getGameId', 'getIsGameActive', 'getResetBoard', 'setIsGameActive', 'setShowVictoryMessageSubject', 'setShowDefeatMessageSubject']);
    const gameServiceSpy = jasmine.createSpyObj('GameService', ['makeGuess']);

    await TestBed.configureTestingModule({
      declarations: [GameboardComponent],
      providers: [
        { provide: ErrorNotificationService, useValue: errorNotificationServiceSpy },
        { provide: GameStatusService, useValue: gameStatusServiceSpy },
        { provide: GameService, useValue: gameServiceSpy }
      ]
    }).compileComponents();

    errorNotificationService = TestBed.inject(ErrorNotificationService) as jasmine.SpyObj<ErrorNotificationService>;
    gameStatusService = TestBed.inject(GameStatusService) as jasmine.SpyObj<GameStatusService>;
    gameService = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameboardComponent);
    component = fixture.componentInstance;

    gameStatusService.getGameId.and.returnValue(of('game-id'));
    gameStatusService.getIsGameActive.and.returnValue(of(true));
    gameStatusService.getResetBoard.and.returnValue(of());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables correctly', () => {
    expect(component.board.length).toBe(6);
    expect(component.board[0].length).toBe(5);
    expect(component.currentRow).toBe(0);
    expect(component.currentCol).toBe(0);
    expect(component.usedWords).toEqual([]);
    expect(component.maxAttempts).toBe(6);
    expect(component.gameId).toBe('game-id');
    expect(component.isGameActive).toBe(true);
  });

  it('should handle key presses correctly', () => {
    component.handleKeyPress({ key: 'A' } as KeyboardEvent);
    expect(component.board[0][0]).toBe('A');
    expect(component.currentCol).toBe(1);

    component.handleKeyPress({ key: 'Backspace' } as KeyboardEvent);
    expect(component.board[0][0]).toBe('');
    expect(component.currentCol).toBe(0);

    component.handleKeyPress({ key: 'Enter' } as KeyboardEvent);
    expect(errorNotificationService.showError).toHaveBeenCalledWith('Please enter exactly 5 letters.');
  });

  it('should make a guess and handle a valid response', () => {
    const guessResponse: Guess = {
      result: '00000',
      isGameWon: false,
      attemptsLeft: 5
    };
    gameService.makeGuess.and.returnValue(of(guessResponse));

    component.handleKeyPress({ key: 'G' } as KeyboardEvent);
    component.handleKeyPress({ key: 'U' } as KeyboardEvent);
    component.handleKeyPress({ key: 'E' } as KeyboardEvent);
    component.handleKeyPress({ key: 'S' } as KeyboardEvent);
    component.handleKeyPress({ key: 'S' } as KeyboardEvent);
    component.handleKeyPress({ key: 'Enter' } as KeyboardEvent);

    expect(gameService.makeGuess).toHaveBeenCalledWith('game-id', 'GUESS');
    expect(component.usedWords).toContain('GUESS');
    expect(component.currentRow).toBe(1);
    expect(component.currentCol).toBe(0);
  });

  it('should handle a winning guess response', () => {
    const guessResponse: Guess = {
      result: '22222',
      isGameWon: true,
      attemptsLeft: 5
    };
    gameService.makeGuess.and.returnValue(of(guessResponse));

    component.handleKeyPress({ key: 'G' } as KeyboardEvent);
    component.handleKeyPress({ key: 'U' } as KeyboardEvent);
    component.handleKeyPress({ key: 'E' } as KeyboardEvent);
    component.handleKeyPress({ key: 'S' } as KeyboardEvent);
    component.handleKeyPress({ key: 'S' } as KeyboardEvent);
    component.handleKeyPress({ key: 'Enter' } as KeyboardEvent);

    expect(gameService.makeGuess).toHaveBeenCalledWith('game-id', 'GUESS');
    expect(gameStatusService.setIsGameActive).toHaveBeenCalledWith(false);
    expect(gameStatusService.setShowVictoryMessageSubject).toHaveBeenCalledWith(true);
  });

  it('should handle a losing guess response', () => {
    const guessResponse: Guess = {
      result: '00000',
      isGameWon: false,
      attemptsLeft: 0
    };
    gameService.makeGuess.and.returnValue(of(guessResponse));

    component.handleKeyPress({ key: 'G' } as KeyboardEvent);
    component.handleKeyPress({ key: 'U' } as KeyboardEvent);
    component.handleKeyPress({ key: 'E' } as KeyboardEvent);
    component.handleKeyPress({ key: 'S' } as KeyboardEvent);
    component.handleKeyPress({ key: 'S' } as KeyboardEvent);
    component.handleKeyPress({ key: 'Enter' } as KeyboardEvent);

    expect(gameService.makeGuess).toHaveBeenCalledWith('game-id', 'GUESS');
    expect(gameStatusService.setIsGameActive).toHaveBeenCalledWith(false);
    expect(gameStatusService.setShowDefeatMessageSubject).toHaveBeenCalledWith(true);
  });

  it('should apply colors correctly to the board', () => {
    const guessResponse: Guess = {
      result: '12010', // Mixed result
      isGameWon: false,
      attemptsLeft: 5
    };
    gameService.makeGuess.and.returnValue(of(guessResponse));

    spyOn(component, 'applyColors').and.callThrough();

    component.handleKeyPress({ key: 'G' } as KeyboardEvent);
    component.handleKeyPress({ key: 'U' } as KeyboardEvent);
    component.handleKeyPress({ key: 'E' } as KeyboardEvent);
    component.handleKeyPress({ key: 'S' } as KeyboardEvent);
    component.handleKeyPress({ key: 'S' } as KeyboardEvent);
    component.handleKeyPress({ key: 'Enter' } as KeyboardEvent);

    expect(component.applyColors).toHaveBeenCalledWith('12010');

    const row = component.board[component.currentRow - 1];
    const cellElements = row.map((_, col) => document.getElementById(`cell-${component.currentRow - 1}-${col}`)!); // <-- Agregar '!' al final

    expect(cellElements[0].classList).toContain('yellow-cell');
    expect(cellElements[1].classList).toContain('green-cell');
    expect(cellElements[2].classList).toContain('grey-cell');
    expect(cellElements[3].classList).toContain('yellow-cell');
    expect(cellElements[4].classList).toContain('grey-cell');
  });


  it('should reset the board when resetBoard is called', () => {
    component.resetBoard();

    expect(component.board.every(row => row.every(cell => cell === ''))).toBe(true);
    expect(component.currentRow).toBe(0);
    expect(component.currentCol).toBe(0);
    expect(component.usedWords).toEqual([]);
  });
});
