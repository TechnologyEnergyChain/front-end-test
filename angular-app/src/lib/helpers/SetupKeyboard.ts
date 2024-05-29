import {Component, HostListener} from "@angular/core";
import {UseGuessStore} from "@lib/store/UseGuessStore";
import {GameBoard} from "@core/game/domain/entities/GameBoard";
import {UseGameStore} from "@lib/store/UseGameStore";
import {WORD_LENGTH} from "@core/guess/domain/entities/GuessWord";
import {DataException} from "@core/common/domain/DataException";

@Component({
  standalone: true,
  template: ''
})
export class SetupKeyboard {

  constructor(
    protected readonly guessStore: UseGuessStore,
    protected readonly gameStore: UseGameStore
  ) {
  }

  @HostListener('document:keydown', ['$event'])
  async onKeyDown(evt: KeyboardEvent) {
    if (evt.ctrlKey || evt.altKey || evt.metaKey) {
      return
    }

    const key = evt.key
    if (key === 'Backspace') {
      this.guessStore.ploc.updateWord = (this.guessStore.state?.word ?? '').slice(0, -1)
      return
    }
    if (key === 'Enter') {
      try {
        await this.guessStore.ploc.submit(this.gameStore.state?.id)
        await this.gameStore.ploc.getGame()
        return
      } catch (e) {
        console.log((<DataException>e).kind)
        console.log((<DataException>e).error)
      }

    }
    const regex = /^[a-zA-Z]$/;
    if (regex.test(key)) {
      if (WORD_LENGTH <= (this.guessStore?.state?.word?.length ?? 0)) {
        return;
      }
      this.guessStore.ploc.updateWord = (this.guessStore.state?.word ?? '').concat(key)
    } else {
      evt.preventDefault()
    }
  }
}
