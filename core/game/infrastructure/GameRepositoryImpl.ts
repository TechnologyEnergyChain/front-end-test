import {GameRepository} from "../domain/GameRepository";
import {GameMapper} from "./GameMapper";
import {GameId} from "../domain/GameId";
import {Game} from "../domain/GameModel";
import {GameDto} from "./GameDto";


export class GameRepositoryImpl implements GameRepository {
    constructor(private readonly mapper: GameMapper) {
    }
    async startGame(): Promise<GameId> {
        const {gameId: id}:GameDto = await (await fetch(`http://localhost:3001/v1/game`, {method: 'POST'})).json()
        return <GameId>id
    }

    async getGame(id: GameId): Promise<Game> {
        const response:GameDto = await (await fetch(`http://localhost:3001/v1/game/${id}`)).json()
        return this.mapper.toDomain(response)
    }
}