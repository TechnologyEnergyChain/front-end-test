import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { API_URL, GameService } from '../../../adapters/game/game.sevice';
import { HttpGameMockCLient } from '../../../adapters/http-game-mock-client/http-game-mock-client.service';
import { RAE_URL, RaeService } from '../../../adapters/rae/rae.service';
import { ComponentModule } from '../../components/component.module';
import { WordeleGameComponent } from './wordle-game.component';

describe('WordeleGameComponent', () => {

  let component: WordeleGameComponent;
  let fixture: ComponentFixture<WordeleGameComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ComponentModule,
        HttpClientModule,
        RouterModule.forRoot(
          [
            {
              path: '',
              component: WordeleGameComponent
            }
          ]
        )
      ],
      providers: [
        GameService,
        RaeService,
        {
          provide: HttpClient,
          useClass: HttpGameMockCLient
        },
        {
          provide: API_URL,
          useValue: environment.api
        },
        {
          provide: RAE_URL,
          useValue: environment.api
        },
      ],
      declarations: [
        WordeleGameComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WordeleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Comprobamos titulo', () => {
    expect(component.title).toEqual('Wordle Game');
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain('Wordle Game');
  });

  it('Comprobamos maxWords', () => {
    expect(component.maxWords).toEqual(6);
  });

  it('Comprobamos maxWordLength', () => {
    expect(component.maxWordLength).toEqual(5);
  });

  it('Comprobamos currentWordIndex', () => {
    expect(component.currentWordIndex).toEqual(0);
  });

  it('Comprobamos words', () => {
    expect(component.words).toEqual({});
  });

  it('Comprobamos inicio de aplicacion', () => {
    expect(component).toBeTruthy();
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalledTimes(1);
  });

  it('Comprobamos gameId', () => {
    expect(component['gameId']).toEqual('id1');
  });

  it('Comprobamos writtenWord()', async () => {
    spyOn(component, 'writtenWord').and.callThrough();
    component.writtenWord('solan');
    expect(component.writtenWord).toHaveBeenCalledTimes(1);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.currentWordIndex).toBe(1);
      expect(component.words[0]).toEqual(['verygood', 'verygood', 'verygood', 'verygood', 'bad']);
    });
  });

  it('Comprobamos writtenWord() Error', async () => {
    spyOn(component, 'writtenWord',).and.callThrough()
    component['gameId'] = undefined;
    try {
      component.writtenWord('solan');
    } catch (err) {
      expect(component.writtenWord).toThrowError('No se ha iniciado el juego')
    }
  });

  it('Comprobamos writtenWord lose()', async () => {
    component.writtenWord('solan');
    component.writtenWord('solah');
    component.writtenWord('solas');
    component.writtenWord('solaw');
    component.writtenWord('solaf');
    component.writtenWord('solaa');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.currentWordIndex).toBe(-2);
      expect(component.title).toEqual('Has perdido');
    });
  });

  it('Comprobamos writtenWord win()', async () => {
    component.writtenWord('solan');
    component.writtenWord('solah');
    component.writtenWord('solar');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.currentWordIndex).toBe(-1);
      expect(component.title).toEqual('Has ganado');
    });
  });

  it('Comprobamos writtenWord error', async () => {
    component.writtenWord('solan');
    component.writtenWord('solan');
    fixture.detectChanges();
    fixture.whenStable().catch(err => {
      expect(component.currentWordIndex).toBe(1);
      expect(err).toBe('Juego no encontrado');
    });
  });
});
