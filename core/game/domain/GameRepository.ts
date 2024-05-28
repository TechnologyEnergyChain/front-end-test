import {GameId} from "./GameId";
import {Game} from "./GameModel";


export interface GameRepository {
    startGame(): Promise<GameId>

    getGame(id: GameId): Promise<Game>
}