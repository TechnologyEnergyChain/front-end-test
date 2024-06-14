import {Component, effect, inject, OnInit} from '@angular/core'
import {NgClass} from '@angular/common'
import {KeyComponent} from '@lib/ui/atoms/key/key.component'
import {UseGameStore} from '@src/core/game/presentation/UseGameStore'
import {GetAlphabetUseCase} from '@src/core/keyboard/domain/application/actions/GetAlphabetUseCase'
import {DictionaryServiceImpl} from '@src/core/keyboard/domain/application/services/DictionaryServiceImpl'
import {GetLetterPerRowsUseCase} from '@src/core/keyboard/domain/application/actions/GetLetterPerRowsUseCase'
import {SpecialKeys} from '@src/core/keyboard/domain/entities/SpecialKeys'
import {normalizeWord} from '@core/common/helpers/normalizeWord'

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
export class KeyboardComponent {

  protected readonly getAlphabetUseCase: GetAlphabetUseCase = inject(GetAlphabetUseCase)
  protected readonly getLetterPerRowsUseCase: GetLetterPerRowsUseCase = inject(GetLetterPerRowsUseCase)
  protected gameStore: UseGameStore = inject(UseGameStore)

  keyboard: string[][] = [[]]
  protected invalidKeys: string[] = []
  protected alphabet: string[] = []

  constructor() {
    effect(() => {
      this._findInvalidLetters()
    })

    const letters = this.getAlphabetUseCase.execute()
    const letterPerRow = this.getLetterPerRowsUseCase.execute()

    this.keyboard = letters.reduce((a, c, index) => {
      if (0 === index % letterPerRow) {
        (a as string[][]).push(letters.slice(index, index + letterPerRow))
      }
      return a
    }, [])

    this.alphabet = this.keyboard.flat().sort()
    this.keyboard.push(SpecialKeys.map((key) => key.value))
  }


  emulateKeyboardEvent(key: string) {
    if (this.invalidKeys.includes(normalizeWord(key)) || !this.alphabet.includes(normalizeWord(key))) {
      return
    }
    const keyboardEventInit = {
      key: SpecialKeys.find((sk) => key.toLowerCase() === sk.value)?.code ?? key,
      code: SpecialKeys.find((sk) => key.toLowerCase() === sk.value)?.code ?? `Key${key.toUpperCase()}`,
      bubbles: true,
      cancelable: true
    }


    document.dispatchEvent(new KeyboardEvent('keydown', keyboardEventInit))
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
