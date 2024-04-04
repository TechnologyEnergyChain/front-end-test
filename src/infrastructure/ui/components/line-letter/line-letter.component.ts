import { Component, Input } from '@angular/core';
import { LetterComponent } from '../letter/letter.component';
import { Word } from '../../models/word';

@Component({
    selector: 'app-line-letter',
    standalone: true,
    imports: [LetterComponent],
    templateUrl: './line-letter.component.html',
    styleUrl: './line-letter.component.scss',
})
export class LineLetterComponent {
    @Input({ required: true }) word!: Word;
    @Input({ required: true }) row!: number;
}
