import { Component, Input } from '@angular/core';
import { Letter } from '@domain/models/letter.model';
import { Word } from '@domain/models/word.model';
import { LetterComponent } from '@presentation/letter/letter.component';

@Component({
  selector: 'app-word',
  standalone: true,
  imports: [LetterComponent],
  templateUrl: './word.component.html',
  styleUrl: './word.component.css',
})
export class WordComponent {
  lettersArray!: Letter[];
  @Input() maxLength = 0;
  @Input() set word(value: Word) {
    this.lettersArray = value.letters;
  }
}
