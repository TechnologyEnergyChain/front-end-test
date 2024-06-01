import {Inject, Injectable, signal, WritableSignal} from '@angular/core'
import {DependencyLocator} from '@src/core/common/infrastructure/DependencyLocator'
import {GuessPLoC} from '@core/guess/presentation/GuessPLoC'
import {Guess} from '@core/guess/domain/entities/GuessModel'

@Injectable()
export class UseGuessStore {
  private readonly _ploc: GuessPLoC
  private readonly _state: WritableSignal<Guess>

  constructor(@Inject(DependencyLocator) private readonly dependency: DependencyLocator) {
    this._ploc = this.dependency.get('GuessPloc')
    this._state = signal(this._ploc.state)
    this._ploc.subscribe(this.stateSubscription)
  }

  stateSubscription = (state: Guess) => {
    this._state.set(state)
  }

  unsubscribe() {
    this._ploc.unsubscribe(this.stateSubscription)
  }

  get ploc(): GuessPLoC {
    return this._ploc
  }

  get state(): Guess | undefined {
    return this._state()
  }


}
