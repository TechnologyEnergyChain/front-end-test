import {GameId} from '../entities/GameId'
import {Game} from '../entities/GameModel'
import {GameDifficulty} from '../entities/GameDifficulty'


export interface GameRepository {
    startGame(difficulty: GameDifficulty): Promise<GameId>

    getGame(id: GameId): Promise<Game>
}