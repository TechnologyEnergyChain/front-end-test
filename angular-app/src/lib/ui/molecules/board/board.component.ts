import {Component, inject, OnDestroy} from '@angular/core'
import {TileComponent} from '@lib/ui/atoms/tile/tile.component'
import {GuessResult} from '@core/guess/domain/entities/GuessResult'
import {UseGameStore} from '@src/core/game/presentation/UseGameStore'
import {UseGuessStore} from '@src/core/guess/presentation/UseGuessStore'
import {GameBoard} from '@core/game/domain/entities/GameBoard'

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
    return this.gameStore.state?.attempts === row
      ? `${this.guessStore.state?.word?.[column] ?? ''}`
      : `${this.gameStore.state?.guesses?.[row]?.word?.[column] ?? ''}`
  }

  getResult(row: number, column: number): GuessResult | undefined {
    const result = this.gameStore.state?.guesses?.[row]?.result?.[column]
    return result ? parseInt(result) : undefined
  }

  ngOnDestroy(): void {
    this.gameStore.unsubscribe()
    this.guessStore.unsubscribe()
  }
}
