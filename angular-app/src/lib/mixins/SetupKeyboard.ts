import {Component, HostListener, inject} from "@angular/core";
import {UseGuessStore} from "@src/core/guess/presentation/UseGuessStore";
import {UseGameStore} from "@src/core/game/presentation/UseGameStore";
import {VALID_CHARACTERS, WORD_LENGTH} from "@core/guess/domain/entities/GuessWord";
import {ToastService} from "@src/core/toast/domain/services/ToastService";
import {Toast} from "@src/core/toast/domain/entities/Toast";
import {DataException} from "@core/common/domain/DataException";

@Component({
  standalone: true,
  template: '',
  providers: [
    ToastService
  ]
})
export class SetupKeyboard {
  private toastService: ToastService = inject(ToastService)

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
        await this.guessStore.ploc.submit()
        await this.gameStore.ploc.getGame()
        return
      } catch (e) {
        // TODO: Show alert to user
        if ((<DataException>e).kind) {
          const toast = new Toast((<DataException>e).error.message, "danger")
          this.toastService.showAlert(toast)
        }
        throw e
      }

    }
    if (VALID_CHARACTERS.test(key)) {
      if (WORD_LENGTH <= (this.guessStore?.state?.word?.length ?? 0)) {
        return;
      }
      this.guessStore.ploc.updateWord = (this.guessStore.state?.word ?? '').concat(key)
    } else {
      evt.preventDefault()
    }
  }
}
