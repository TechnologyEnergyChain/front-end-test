import {GuessMapper} from "../../guess/infrastructure/mappers/GuessMapper";
import {GameMapper} from "../../game/infrastructure/mappers/GameMapper";
import {GameRepositoryImpl} from "../../game/infrastructure/repositories/GameRepositoryImpl";
import {GamePLoC} from "../../game/presentation/GamePLoC";
import {StartGameUseCase} from "../../game/domain/application/actions/StartGameUseCase";
import {GetGameUseCase} from "../../game/domain/application/actions/GetGameUseCase";
import {ApiClient} from "../infrastructure/ApiClient";
import {Container, Dependencies} from "./Container";
import {GuessRepositoryImpl} from "../../guess/infrastructure/repositories/GuessRepositoryImpl";
import {GuessDictionaryRepositoryImpl} from "../../guess/infrastructure/repositories/GuessDictionaryRepositoryImpl";
import {GuessDictionaryServiceImpl} from "../../guess/domain/application/services/GuessDictionaryServiceImpl";
import {GuessPLoC} from "../../guess/presentation/GuessPLoC";
import {SubmitGuessUseCase} from "../../guess/domain/application/actions/SubmitGuessUseCase";
import {CheckGuessWordIsInDictionaryUseCase} from "../../guess/domain/application/actions/CheckGuessWordIsInDictionaryUseCase";

export class DependencyProvider {
    private readonly _container = Container.instance

    provideGamePloc(apiV1: ApiClient) {
        const gameMapper = new GameMapper(new GuessMapper())
        const gameRepository = new GameRepositoryImpl(apiV1, gameMapper)

        this._container.bind('GamePloc', new GamePLoC(
            new StartGameUseCase(gameRepository),
            new GetGameUseCase(gameRepository)
        ))
    }

    provideGuessPloc(apiV1: ApiClient, apiDictionary: ApiClient) {
        const guessRepository = new GuessRepositoryImpl(apiV1, new GuessMapper())
        const guessDictionaryRepository = new GuessDictionaryRepositoryImpl(apiDictionary)
        const guessDictionaryService = new GuessDictionaryServiceImpl(guessDictionaryRepository)

        this._container.bind('GuessPloc', new GuessPLoC(
            this._container.get("GamePloc"),
            new SubmitGuessUseCase(guessRepository),
            new CheckGuessWordIsInDictionaryUseCase(guessDictionaryService)
        ))
    }

    get<T>(key: Dependencies): T {
        return this._container.get<T>(key)
    }

}