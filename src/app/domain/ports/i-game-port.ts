import { Observable } from 'rxjs';
import { GetGameDetails200Response } from '../model/get-game-details200-response';
import { MakeGuess200Response } from '../model/make-guess200-response';
import { StartGameRequest } from '../model/start-game-request';
import { StartGame201Response } from '../model/start-game201-response';
import { StartGame400Response } from '../model/start-game400-response';

export interface IGamePort {

    /**
     * Obtener detalles de un juego de Wordle
     * 
     * @param gameId ID único del juego
     */
    getGameDetails(gameId: string, extraHttpRequestParams?: any): Observable<GetGameDetails200Response>;

    /**
     * Realizar un intento de adivinanza en un juego de Wordle
     * 
     * @param gameId ID único del juego
     * @param guessWord Palabra de 5 letras para adivinar
     */
    makeGuess(gameId: string, guessWord: string, extraHttpRequestParams?: any): Observable<MakeGuess200Response>;

    /**
     * Comenzar un nuevo juego de Wordleå
     * 
     * @param startGameRequest 
     */
    startGame(startGameRequest?: StartGameRequest, extraHttpRequestParams?: any): Observable<StartGame201Response | StartGame400Response>;
}
