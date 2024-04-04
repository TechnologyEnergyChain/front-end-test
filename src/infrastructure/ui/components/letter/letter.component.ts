import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Letter } from '../../models/letter';

@Component({
    selector: 'app-letter',
    standalone: true,
    imports: [NgClass, FormsModule],
    templateUrl: './letter.component.html',
    styleUrl: './letter.component.scss',
})
export class LetterComponent {
    @Input({ required: true }) letter!: Letter;
    @Output() newLetterEvent = new EventEmitter<Letter>();
}
