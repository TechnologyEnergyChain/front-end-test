import {GuessRepository} from '../../domain/ports/GuessRepository'
import {GuessMapper} from '../mappers/GuessMapper'
import {GameId} from '../../../game/domain/entities/GameId'
import {GuessDto} from '../dtos/GuessDto'
import {Guess} from '../../domain/entities/GuessModel'
import {ApiClient} from '../../../common/infrastructure/ApiClient'


export class GuessRepositoryImpl implements GuessRepository {
    constructor(
        private readonly apiClient: ApiClient,
        private readonly mapper: GuessMapper
    ) {
    }

    async submitGuess(gameId: GameId, guessWord: string): Promise<Guess> {
        const {data} = await this.apiClient.post<GuessDto>({url: `/game/${gameId}/guess`, params: {guessWord}})
        return this.mapper.toDomain(data)
    }

}