import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Letter, LetterStatus } from '@domain/models/letter.model';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class KeyboardComponent implements AfterViewInit {
  @Output() keyPress = new EventEmitter<string>();
  @Input() set usedLetters(value: Letter[]) {
    this.updateUsedLetters(value);
  }
  value = '';
  keyboard!: Keyboard;

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onKeyPress: (button) => this.onKeyPress(button),
      theme: 'hg-theme-default myTheme1',
      layout: {
        default: [
          'Q W E R T Y U I O P',
          'A S D F G H J K L',
          'Z X C V B N M',
          'Backspace Enter',
        ],
      },
      display: {
        Enter: '✔️',
        Backspace: '⌫',
      },
      buttonTheme: [],
    });
  }

  private onKeyPress = (button: string) => {
    this.keyPress.emit(button);
  };

  private updateUsedLetters(letters: Letter[]) {
    letters.forEach((letter) => {
      this.removeAllClasses(letter.letter);
      if (this.buttonIsAlreadylCorrect(letter.letter)) {
        this.keyboard.addButtonTheme(letter.letter, 'correct');
      } else {
        this.keyboard.addButtonTheme(
          letter.letter,
          this.getLetterStatusString(letter.status)
        );
      }
    });
  }

  private getLetterStatusString(status: LetterStatus): string {
    switch (status) {
      case LetterStatus.CORRECT:
        return 'correct';
      case LetterStatus.WRONG:
        return 'wrong';
      case LetterStatus.WRONG_PLACE:
        return 'wrongPlace';
      default:
        return '';
    }
  }

  private removeAllClasses(letter: string) {
    this.keyboard.removeButtonTheme(letter, 'correct');
    this.keyboard.removeButtonTheme(letter, 'wrong');
    this.keyboard.removeButtonTheme(letter, 'wrongPlace');
  }

  private buttonIsAlreadylCorrect(letter: string): boolean {
    const buttonClasses = this.keyboard.getButtonThemeClasses(letter);
    return buttonClasses.includes('correct');
  }
}
