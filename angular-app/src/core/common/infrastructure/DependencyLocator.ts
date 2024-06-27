import {Injectable} from '@angular/core'
import {Container, Dependencies} from '@core/common/dependencies/Container'
import {useGamePlocProvider} from '@core/game/infrastructure/di/useGamePlocProvider'
import {useGuessPlocProvider} from '@core/guess/infrastructure/di/useGuessPlocProvider'
import {ApiClientImpl} from '@src/core/common/infrastructure/api/ApiClientImpl'
import {environment} from '@src/enviroments/environment'

@Injectable({
  providedIn: 'root'
})
export class DependencyLocator {
  private readonly _container = Container.instance

  constructor() {
    this._container.bind('GamePloc', useGamePlocProvider(new ApiClientImpl(environment.apiV1Url)))
    this._container.bind('GuessPloc', useGuessPlocProvider(this._container.get('GamePloc'), new ApiClientImpl(environment.apiV1Url)))

  }

  get<T>(key: Dependencies): T {
    return this._container.get<T>(key)
  }

}
