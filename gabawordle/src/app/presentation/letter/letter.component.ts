import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { Letter, LetterStatus } from '@domain/models/letter.model';

@Component({
  selector: 'app-letter',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './letter.component.html',
  styleUrl: './letter.component.css',
})
export class LetterComponent {
  letterStatus = LetterStatus;
  @Input() letter!: Letter;
}
