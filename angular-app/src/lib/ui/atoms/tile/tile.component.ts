import {Component, Input} from "@angular/core";
import {GuessResult} from "@core/guess/domain/entities/GuessResult";
import {NgClass} from "@angular/common";

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
  @Input() result?: GuessResult

  setTileCssClass(): Record<string, boolean> {
    return {
      'has-letter': !!this.letter,
      'reveled-invalid': this.result === GuessResult.INVALID,
      'reveled-invalid-place': this.result === GuessResult.INVALID_PLACE,
      'reveled-valid': this.result === GuessResult.VALID,
    }
  }
}
