import {Component, Input} from '@angular/core'
import {GuessLetterResult} from '@core/guess/domain/entities/GuessLetterResult'
import {NgClass} from '@angular/common'

@Component({
  standalone: true,
  selector: 'a-tile',
  templateUrl: 'tile.component.html',
  styleUrls: ['tile.component.css'],

  imports: [
    NgClass
  ]
})
export class TileComponent {
  @Input() letter?: string
  @Input() result?: GuessLetterResult
  @Input() disabled?: boolean

  setTileCssClass(): Record<string, boolean> {
    return {
      'has-letter': !!this.letter,
      'reveled reveled-invalid': this.result === GuessLetterResult.INVALID,
      'reveled reveled-invalid-place': this.result === GuessLetterResult.INVALID_PLACE,
      'reveled reveled-valid': this.result === GuessLetterResult.VALID,
      'is-disabled': !!this.disabled
    }
  }
}
