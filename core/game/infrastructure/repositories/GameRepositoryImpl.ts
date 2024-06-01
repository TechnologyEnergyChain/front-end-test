import {GameRepository} from '../../domain/ports/GameRepository'
import {GameMapper} from '../mappers/GameMapper'
import {GameId} from '../../domain/entities/GameId'
import {Game} from '../../domain/entities/GameModel'
import {GameDto} from '../dtos/GameDto'
import {ApiClient} from '../../../common/infrastructure/ApiClient'
import {GameDifficulty} from '../../domain/entities/GameDifficulty'


export class GameRepositoryImpl implements GameRepository {
    constructor(
        private readonly apiClient: ApiClient,
        private readonly mapper: GameMapper
    ) {
    }

    async startGame(difficulty: GameDifficulty): Promise<GameId> {
        const {data: {gameId: id}} = await this.apiClient.post<GameDto>({url: '/game', payload: {difficulty}})
        return <GameId>id
    }

    async getGame(id: GameId): Promise<Game> {
        const {data: response} = await this.apiClient.get<GameDto>({url: `/game/${id}`})
        return this.mapper.toDomain(response)
    }
}