import {Component, inject, OnDestroy, OnInit} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {TileComponent} from '@lib/ui/atoms/tile/tile.component'
import {BoardComponent} from '@lib/ui/molecules/board/board.component'
import {UseGameStore} from '@src/core/game/presentation/UseGameStore'
import {SetupKeyboard} from '@lib/mixins/SetupKeyboard'
import {UseGuessStore} from '@src/core/guess/presentation/UseGuessStore'
import {KeyboardComponent} from '@lib/ui/molecules/keyboard/keyboard.component'
import {ToastComponent} from '@lib/ui/molecules/toast/toast.component'
import {ToastService} from '@src/core/toast/domain/services/ToastService'
import {Toast} from '@src/core/toast/domain/entities/Toast'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TileComponent, BoardComponent, KeyboardComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [UseGameStore, UseGuessStore, ToastService]
})
export class AppComponent extends SetupKeyboard implements OnInit, OnDestroy {

  private alertService = inject(ToastService)

  toast: Toast = new Toast()

  constructor() {
    super(
      inject(UseGuessStore),
      inject(UseGameStore)
    )
  }

  async ngOnInit() {
    await this.gameStore.ploc.start()
    this.alertService.alertState.subscribe(toast => {
      this.toast.message = toast.message
      this.toast.type = toast.type
    })
  }

  ngOnDestroy(): void {
    this.gameStore.unsubscribe()
  }
}
