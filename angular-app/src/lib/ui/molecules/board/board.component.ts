import {Component, inject, OnDestroy} from "@angular/core";
import {TileComponent} from "@lib/ui/atoms/tile/tile.component";
import {GuessResult} from "@core/guess/domain/entities/GuessResult";
import {UseGameStore} from "@src/core/game/presentation/UseGameStore";
import {UseGuessStore} from "@src/core/guess/UseGuessStore";
import {GameBoard} from "@core/game/domain/entities/GameBoard";

@Component({
  standalone: true,
  selector: 'm-board',
  imports: [TileComponent],
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.css'],
  providers: [
    UseGameStore,
    UseGuessStore
  ]
})
export class BoardComponent implements OnDestroy {
  protected gameStore: UseGameStore = inject(UseGameStore)
  protected guessStore: UseGuessStore = inject(UseGuessStore)

  protected readonly COLUMNS_ARR = new Array(GameBoard.COLUMNS).fill(null)
  protected readonly ROWS_ARR = new Array(GameBoard.ROWS).fill(null)


  getLetter(row: number, column: number) {
    if (this.gameStore.state?.guesses?.[row]?.word) {
      return `${this.gameStore.state?.guesses?.[row]?.word?.split('')[column] ?? ''}`
    }
    if (row === this.gameStore.state?.attempts) {
      return `${this.guessStore.state?.word?.split('')[column] ?? ''}`
    }
    return
  }

  getResult(row: number, column: number): GuessResult | undefined {
    let resultNumber
    if (this.gameStore.state?.guesses?.[row]?.result) {
      resultNumber = this.gameStore.state?.guesses?.[row]?.result?.split('')[column]
      return resultNumber ? parseInt(resultNumber) : undefined
    }
    if (row === this.gameStore.state?.attempts) {
      resultNumber = this.guessStore.state?.result?.split('')[column]
      return resultNumber ? parseInt(resultNumber) : undefined
    }
    return
  }

  ngOnDestroy(): void {
    this.gameStore.unsubscribe()
    this.guessStore.unsubscribe()
  }
}
