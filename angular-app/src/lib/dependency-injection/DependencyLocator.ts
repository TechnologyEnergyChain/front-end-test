import {Injectable} from "@angular/core";
import {GamePLoC} from "@core/game/presentation/GamePLoC";
import {Container, Dependencies} from "@core/common/dependencies/Container";
import {GameRepositoryImpl} from "@core/game/infrastructure/repositories/GameRepositoryImpl";
import {GameMapper} from "@core/game/infrastructure/mappers/GameMapper";
import {GuessMapper} from "@core/guess/infrastructure/mappers/GuessMapper";
import {StartGameUseCase} from "@core/game/domain/application/StartGameUseCase";
import {GetGameUseCase} from "@core/game/domain/application/GetGameUseCase";
import {GuessRepositoryImpl} from "@core/guess/infrastructure/repositories/GuessRepositoryImpl";
import {GuessPLoC} from "@core/guess/presentation/GuessPLoC";
import {SubmitGuessUseCase} from "@core/guess/domain/application/SubmitGuessUseCase";
import {ApiClientImpl} from "@lib/api/ApiClientImpl";

@Injectable({
  providedIn: 'root'
})
export class DependencyLocator {
  private readonly _container: Container
  private readonly apiClient = new ApiClientImpl()

  constructor() {
    this._container = Container.instance

    this._provideGamePloc()
    this._provideGuessPloc()
  }

  private _provideGuessPloc() {
    const guessMapper = new GuessMapper()
    const guessRepository = new GuessRepositoryImpl(
      this.apiClient,
      guessMapper
    )
    this._container.bind('GuessPloc', new GuessPLoC(
      new SubmitGuessUseCase(guessRepository)
    ))
  }

  private _provideGamePloc() {
    const guessMapper = new GuessMapper()
    const gameMapper = new GameMapper(guessMapper)
    const gameRepository = new GameRepositoryImpl(
      this.apiClient,
      gameMapper
    )

    this._container.bind('GamePloc', new GamePLoC(
      new StartGameUseCase(gameRepository),
      new GetGameUseCase(gameRepository)
    ))
  }

  get<T>(key: Dependencies): T {
    return this._container.get<T>(key)
  }

}
