import {Inject, Injectable} from "@angular/core";
import {DependencyLocator} from "@lib/dependency-injection/DependencyLocator";
import {GuessPLoC} from "@core/guess/presentation/GuessPLoC";
import {Guess} from "@core/guess/domain/entities/GuessModel";

@Injectable()
export class UseGuessStore {
  private readonly _ploc: GuessPLoC
  private _state?: Guess

  constructor(@Inject(DependencyLocator) private readonly dependency: DependencyLocator) {
    this._ploc = this.dependency.get("GuessPloc")

    this._ploc.subscribe(this.stateSubscription)
  }

  stateSubscription = (state: Guess) => {
    this._state = state
  }

  unsubscribe() {
    this._ploc.unsubscribe(this.stateSubscription)
  }

  get ploc(): GuessPLoC {
    return this._ploc
  }

  get state(): Guess | undefined {
    return this._state
  }


}
