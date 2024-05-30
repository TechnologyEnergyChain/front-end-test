import {Injectable} from "@angular/core";
import {ApiV1} from "@lib/api/ApiV1";
import {DependencyProvider} from "@core/common/dependencies/DependencyProvider";
import {Dependencies} from "@core/common/dependencies/Container";
import {ApiRAE} from "@lib/api/ApiRAE";

@Injectable({
  providedIn: 'root'
})
export class DependencyLocator {
  private readonly _provider: DependencyProvider = new DependencyProvider()


  constructor() {
    this._provider.provideGamePloc(new ApiV1())
    this._provider.provideGuessPloc(new ApiV1(), new ApiRAE())
  }

  get<T>(key: Dependencies): T {
    return this._provider.get<T>(key)
  }

}
