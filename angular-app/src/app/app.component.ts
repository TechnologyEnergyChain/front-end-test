import {Component, HostListener, inject, Inject, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {GamePLoC} from "../../../core/game/presentation/GamePLoC";
import {DependencyLocator} from "../lib/dependency-injection/DependencyLocator";
import {TileComponent} from "../lib/ui/atoms/tile/tile.component";
import {BoardComponent} from "../lib/ui/molecules/board/board.component";
import {UseGameStore} from "../lib/store/UseGameStore";
import {SetupKeyboard} from "../lib/helpers/SetupKeyboard";
import {UseGuessStore} from "../lib/store/UseGuessStore";

@Component({
  selector: 'app-root',
  standalone: true,
  template: '',
})
export class AppComponent {

}
