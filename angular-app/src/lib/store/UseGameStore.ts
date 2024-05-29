import {Inject, Injectable} from "@angular/core";
import {DependencyLocator} from "@lib/dependency-injection/DependencyLocator";
import {GamePLoC} from "@core/game/presentation/GamePLoC";
import {Game} from "@core/game/domain/entities/GameModel";

@Injectable()
export class UseGameStore {
  private readonly _ploc: GamePLoC
  private _state?: Game

  constructor(@Inject(DependencyLocator) private readonly dependency: DependencyLocator) {
    this._ploc = this.dependency.get("GamePloc")

    this._ploc.subscribe(this.stateSubscription)
  }

  stateSubscription = (state: Game) => {
    this._state = state
  }

  get ploc(): GamePLoC {
    return this._ploc
  }

  get state(): Game | undefined {
    return this._state
  }

  unsubscribe() {
    this._ploc.unsubscribe(this.stateSubscription)
  }
}
