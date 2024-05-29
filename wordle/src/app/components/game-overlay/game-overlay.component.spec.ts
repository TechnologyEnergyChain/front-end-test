import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameOverlayComponent } from './game-overlay.component';
import { of } from 'rxjs';
import { GameStatusService } from '../../domain/services/game-status/game-status.service';
import { HttpClientModule } from '@angular/common/http';

describe('GameOverlayComponent', () => {
  let component: GameOverlayComponent;
  let fixture: ComponentFixture<GameOverlayComponent>;
  let gameStatusService: jasmine.SpyObj<GameStatusService>;

  beforeEach(async () => {
    const gameStatusServiceSpy = jasmine.createSpyObj('GameStatusService', ['getIsGameActive', 'getShowVictoryMessage', 'getShowDefeatMessage']);

    await TestBed.configureTestingModule({
      declarations: [GameOverlayComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: GameStatusService, useValue: gameStatusServiceSpy }
      ]
    }).compileComponents();

    gameStatusService = TestBed.inject(GameStatusService) as jasmine.SpyObj<GameStatusService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOverlayComponent);
    component = fixture.componentInstance;
    gameStatusService.getIsGameActive.and.returnValue(of(false));
    gameStatusService.getShowVictoryMessage.and.returnValue(of(false));
    gameStatusService.getShowDefeatMessage.and.returnValue(of(false));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables correctly', () => {
    expect(component.isGameActive).toBe(false);
    expect(component.showVictoryMessage).toBe(false);
    expect(component.showDefeatMessage).toBe(false);
  });

  it('should show overlay when game is not active', () => {
    gameStatusService.getIsGameActive.and.returnValue(of(false));
    fixture.detectChanges();
    const overlayElement = fixture.nativeElement.querySelector('.overlay');
    expect(overlayElement).toBeTruthy();
  });

  it('should hide overlay when game is active', () => {
    gameStatusService.getIsGameActive.and.returnValue(of(true));
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    const overlayElement = fixture.nativeElement.querySelector('.overlay');
    expect(overlayElement).toBeFalsy();
  });
  
  it('should start the game with the selected difficulty when a difficulty button is clicked', () => {
    spyOn(component, 'selectDifficulty').and.callThrough();
    const button = fixture.nativeElement.querySelector('.button');
    button.click();
    expect(component.selectDifficulty).toHaveBeenCalledWith('easy');
  });

});