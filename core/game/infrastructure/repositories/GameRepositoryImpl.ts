import {GameRepository} from "../../domain/repositories/GameRepository";
import {GameMapper} from "../mappers/GameMapper";
import {GameId} from "../../domain/entities/GameId";
import {Game} from "../../domain/entities/GameModel";
import {GameDto} from "../dtos/GameDto";
import {ApiClient} from "../../../common/infrastructure/ApiClient";


export class GameRepositoryImpl implements GameRepository {
    constructor(
        private readonly apiClient: ApiClient,
        private readonly mapper: GameMapper
    ) {
    }

    async startGame(): Promise<GameId> {
        const {gameId: id}: GameDto = await this.apiClient.post<GameDto>({url: '/game'})
        return <GameId>id
    }

    async getGame(id: GameId): Promise<Game> {
        const response: GameDto = await this.apiClient.get<GameDto>({url: `/game/${id}`})
        return this.mapper.toDomain(response)
    }
}