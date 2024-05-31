import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpGameMockCLient } from '../http-game-mock-client/http-game-mock-client.service';
import { API_URL, GameService } from './game.sevice';

describe('GameService', () => {

    let gameService: GameService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                GameService,
                {
                    provide: HttpClient,
                    useClass: HttpGameMockCLient
                },
                {
                    provide: API_URL,
                    useValue: environment.api
                }]
        });
        gameService = TestBed.inject(GameService);
    });

    it('Comprovamos gameEnpoint', () => {
        expect(gameService['gameEnpoint']).toBe('game');
    });

    it('Comprovamos getApiPath', () => {
        expect(gameService['getApiPath']).toBe(`${environment.api}/${gameService['gameEnpoint']}`);
    });

    it('Comprovamos startGame', () => {
        firstValueFrom(gameService.startGame()).then(res => {
            expect(res.gameId).toBe('id1');
        });
        firstValueFrom(gameService.startGame({ difficulty: 'hard' })).then(res => {
            expect(res.gameId).toBe('id1');
        });
    });

    it('Comprovamos makeGuess', () => {
        firstValueFrom(gameService.makeGuess('id1', 'SOLAR')).then(res => {
            expect(res.result).toBe('22222');
            expect(res.isGameWon).toBe(true);
            expect(res.attemptsLeft).toBe(5);
        });
        firstValueFrom(gameService.makeGuess('id1', 'SLAR')).catch(err => {
            expect(err.error).toBe('Palabra invalida');
        });
        firstValueFrom(gameService.makeGuess('id1', 'SLAR')).catch(err => {
            expect(err.error).toBe('Palabra invalida');
        });
    });

    it('Comprovamos getGameDetails', () => {
        firstValueFrom(gameService.getGameDetails('id1')).then(res => {
            expect(res.gameId).toBe('id1');
            expect(res.wordToGuess).toBe('SOLAR');
            expect(res.attemptsLeft).toBe(5);
        });
    });
});
