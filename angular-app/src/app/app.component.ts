import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TileComponent} from "@lib/ui/atoms/tile/tile.component";
import {BoardComponent} from "@lib/ui/molecules/board/board.component";
import {UseGameStore} from "@src/core/game/presentation/UseGameStore";
import {SetupKeyboard} from "@lib/mixins/SetupKeyboard";
import {UseGuessStore} from "@src/core/guess/UseGuessStore";
import {KeyboardComponent} from "@lib/ui/molecules/keyboard/keyboard.component";
import {DictionaryServiceImpl} from "@src/core/keyboard/domain/application/services/DictionaryServiceImpl";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TileComponent, BoardComponent, KeyboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [UseGameStore, UseGuessStore]
})
export class AppComponent extends SetupKeyboard implements OnInit, OnDestroy {
  constructor() {
    super(
      inject(UseGuessStore),
      inject(UseGameStore)
    );
  }

  async ngOnInit() {
    await this.gameStore.ploc.start()
    await this.gameStore.ploc.getGame()
  }

  ngOnDestroy(): void {
    this.gameStore.unsubscribe()
  }


}
