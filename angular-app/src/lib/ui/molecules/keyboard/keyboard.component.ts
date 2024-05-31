import {Component, effect, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {NgClass} from "@angular/common";
import {KeyComponent} from "@lib/ui/atoms/key/key.component";
import {UseGameStore} from "@src/core/game/presentation/UseGameStore";
import {GetAlphabetUseCase} from "@src/core/keyboard/domain/application/actions/GetAlphabetUseCase";
import {DictionaryServiceImpl} from "@src/core/keyboard/domain/application/services/DictionaryServiceImpl";
import {GetLetterPerRowsUseCase} from "@src/core/keyboard/domain/application/actions/GetLetterPerRowsUseCase";

const SPECIAL_KEYS = [{value: 'enter', code: 'Enter'}, {value: 'delete', code: 'Backspace'}]

@Component({
  standalone: true,
  selector: 'm-keyboard',
  templateUrl: 'keyboard.component.html',
  styleUrls: ['keyboard.component.css'],
  providers: [
    UseGameStore,
    DictionaryServiceImpl,
    GetAlphabetUseCase,
    GetLetterPerRowsUseCase
  ],
  imports: [
    NgClass,
    KeyComponent
  ]
})
export class KeyboardComponent implements OnInit {

  protected readonly getAlphabetUseCase: GetAlphabetUseCase = inject(GetAlphabetUseCase)
  protected readonly getLetterPerRowsUseCase: GetLetterPerRowsUseCase = inject(GetLetterPerRowsUseCase)
  protected gameStore: UseGameStore = inject(UseGameStore)

  keyboard: string[][] = [[]]
  protected invalidKeys: string[] = []

  constructor() {
    effect(() => {
      this._findInvalidLetters()
    });
  }

  ngOnInit(): void {
    const letters = this.getAlphabetUseCase.execute()
    const letterPerRow = this.getLetterPerRowsUseCase.execute()

    this.keyboard = letters.reduce((p, c, index) => {
      if (index % letterPerRow === 0) {
        (p as string[][]).push(letters.slice(index, index + letterPerRow));
      }
      return p;
    }, []);

    this.keyboard.push(SPECIAL_KEYS.map((key) => key.value))
  }

  emulateKeyboardEvent(key: string) {
    if (this.invalidKeys.includes(key.toLowerCase())) {
      return
    }

    const keyboardEventInit = {
      key: SPECIAL_KEYS.find((sk) => key.toLowerCase() === sk.value)?.code ?? key,
      code: SPECIAL_KEYS.find((sk) => key.toLowerCase() === sk.value)?.code ?? `Key${key.toUpperCase()}`,
      bubbles: true,
      cancelable: true
    }


    document.dispatchEvent(new KeyboardEvent('keydown', keyboardEventInit));
  }

  private _findInvalidLetters() {
    this.gameStore?.state?.guesses?.forEach(({word, result}: any) => {
      for (let i = 0; i < word.length; i++) {
        const letter = word[i]
        if ('0' === result[i]) {
          if (!this.invalidKeys.includes(letter)) {
            this.invalidKeys.push(letter)
          }
        }
      }
    })
  }
}
