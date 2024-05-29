import {GameId} from "../entities/GameId";
import {Game} from "../entities/GameModel";


export interface GameRepository {
    startGame(): Promise<GameId>

    getGame(id: GameId): Promise<Game>
}