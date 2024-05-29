import {Factory} from "../Factory";
import {Game} from "../../../game/domain/entities/GameModel";
import {GameStatus} from "../../../game/domain/entities/GameStatus";
import {GameBoard} from "../../../game/domain/entities/GameBoard";

export class GameModelFactory extends Factory<Game> {
    data = {
        id: 'ramdomId',
        status: GameStatus.IN_PROGRESS,
        attempts: GameBoard.ROWS,
        wordToGuess: 'solar',
        guesses: []
    }

    create(extra?: {}): Game {
        return new Game({...this.data, ...extra});
    }

}