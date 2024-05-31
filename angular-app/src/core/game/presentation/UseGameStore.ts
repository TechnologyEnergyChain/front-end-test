import {Inject, Injectable, signal, WritableSignal} from "@angular/core";
import {DependencyLocator} from "@src/core/common/infrastructure/DependencyLocator";
import {GamePLoC} from "@core/game/presentation/GamePLoC";
import {Game} from "@core/game/domain/entities/GameModel";

@Injectable()
export class UseGameStore {
  private readonly _ploc: GamePLoC
  private readonly _state: WritableSignal<Game>

  constructor(@Inject(DependencyLocator) private readonly dependency: DependencyLocator) {
    this._ploc = this.dependency.get("GamePloc")
    this._state = signal(this._ploc.state)
    this._ploc.subscribe(this.stateSubscription)
  }

  stateSubscription = (state: Game) => {
    this._state.set(state)
  }

  get ploc(): GamePLoC {
    return this._ploc
  }

  get state(): Game | undefined {
    return this._state()
  }

  unsubscribe() {
    this._ploc.unsubscribe(this.stateSubscription)
  }
}
