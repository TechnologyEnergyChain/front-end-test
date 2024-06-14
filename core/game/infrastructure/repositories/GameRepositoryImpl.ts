import {GameRepository} from '../../domain/ports/GameRepository'
import {GameMapper} from '../mappers/GameMapper'
import {Game} from '../../domain/entities/GameModel'
import {GameDto} from '../dtos/GameDto'
import {ApiClient} from '../../../common/infrastructure/ApiClient'


export class GameRepositoryImpl implements GameRepository {
    constructor(
        private readonly apiClient: ApiClient,
        private readonly mapper: GameMapper
    ) {
    }

    async getDailyWord(): Promise<Game> {
        const {data} = await this.apiClient.get<GameDto>({url: '/daily-word'})
        return this.mapper.toDomain(data)
    }


}