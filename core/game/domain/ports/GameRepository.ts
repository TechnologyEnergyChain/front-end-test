import {Game} from '../entities/GameModel'


export interface GameRepository {
    getDailyWord(): Promise<Game>
}