import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './presentation/board/board.component';
import { ToastComponent } from './presentation/toast/toast.component';
import { ThemeButtonComponent } from '@presentation/theme-button/theme-button.component';
import { KeyboardComponent } from '@presentation/keyboard/keyboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BoardComponent,
    ToastComponent,
    ThemeButtonComponent,
    KeyboardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'GabaWordle';
}
