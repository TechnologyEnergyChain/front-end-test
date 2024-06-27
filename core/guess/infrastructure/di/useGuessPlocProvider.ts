import {ApiClient} from '../../../common/infrastructure/ApiClient'
import {GuessDictionaryRepositoryImpl} from '../repositories/GuessDictionaryRepositoryImpl'
import {GuessDictionaryServiceImpl} from '../../domain/application/services/GuessDictionaryServiceImpl'
import {GamePLoC} from '../../../game/presentation/GamePLoC'
import {SubmitGuessUseCase} from '../../domain/application/actions/SubmitGuessUseCase'
import {
    CheckGuessWordIsInDictionaryUseCase
} from '../../domain/application/actions/CheckGuessWordIsInDictionaryUseCase'
import {GuessPLoC} from '../../presentation/GuessPLoC'


export const useGuessPlocProvider = (game: GamePLoC, apiClient: ApiClient) => {
    if(!game) {
        throw Error('☠️ You must provide a GamePLoC to create a GamePLoC')
    }

    const guessDictionaryRepository = new GuessDictionaryRepositoryImpl(apiClient)
    const guessDictionaryService = new GuessDictionaryServiceImpl(guessDictionaryRepository)

    return new GuessPLoC(
        game,
        new SubmitGuessUseCase(guessDictionaryService),
        new CheckGuessWordIsInDictionaryUseCase(guessDictionaryService)
    )
}