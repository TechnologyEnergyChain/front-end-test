import {GameMapper} from '../mappers/GameMapper'
import {GameRepositoryImpl} from '../repositories/GameRepositoryImpl'
import {ApiClient} from '../../../common/infrastructure/ApiClient'
import {GamePLoC} from '../../presentation/GamePLoC'
import {StartGameUseCase} from '../../domain/application/actions/StartGameUseCase'
import {GetGameUseCase} from '../../domain/application/actions/GetGameUseCase'

export const useGamePlocProvider = (apiClient: ApiClient) => {
    const gameMapper = new GameMapper()
    const gameRepository = new GameRepositoryImpl(apiClient, gameMapper)

    return new GamePLoC(
        new StartGameUseCase(gameRepository),
        new GetGameUseCase(gameRepository)
    )
}