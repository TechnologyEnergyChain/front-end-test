import { TestBed } from '@angular/core/testing';
import { GameStatusService } from './game-status.service';

describe('GameStatusService', () => {
  let service: GameStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get game ID', () => {
    const gameId = 'test-game-id';
    service.setGameId(gameId);
    service.getGameId().subscribe(id => {
      expect(id).toEqual(gameId);
    });
  });

  it('should set and get game active status', () => {
    const isActive = true;
    service.setIsGameActive(isActive);
    service.getIsGameActive().subscribe(active => {
      expect(active).toEqual(isActive);
    });
  });

  it('should set and get show victory message status', () => {
    const showVictoryMessage = true;
    service.setShowVictoryMessageSubject(showVictoryMessage);
    service.getShowVictoryMessage().subscribe(show => {
      expect(show).toEqual(showVictoryMessage);
    });
  });

  it('should set and get show defeat message status', () => {
    const showDefeatMessage = true;
    service.setShowDefeatMessageSubject(showDefeatMessage);
    service.getShowDefeatMessage().subscribe(show => {
      expect(show).toEqual(showDefeatMessage);
    });
  });
});

