import {Lang} from '@src/core/keyboard/domain/entities/Lang'

const QWERTY = {
  lettersPerRow: 10,
  letters: 'qwertyuiopasdfghjklñzxcvbnm'
}

export class Dictionary {
  private readonly _alphabet: string[]
  private readonly _lettersPerRow: number

  constructor(private readonly lang: Lang) {
    this._alphabet = this._getLangAlphabet(lang)
    this._lettersPerRow = this._getLettersPerRow(lang)
  }

  private _getLangAlphabet(lang: Lang) {
    switch (lang) {
      case 'es':
        return QWERTY.letters.split('')
      case 'gl':
        return QWERTY.letters.split('').filter((letter: string) => 'y' !== letter)
    }
  }

  private _getLettersPerRow(lang: Lang) {
    switch (lang) {
      case 'es':
      case 'gl':
        return QWERTY.lettersPerRow
    }
  }

  get alphabet() {
    return this._alphabet
  }

  get lettersPerRow() {
    return this._lettersPerRow
  }
}
