import { Component, ViewChild } from '@angular/core';
import { KeyboardComponent } from './ui/components/keyboard/keyboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  @ViewChild(KeyboardComponent) private keyboard?: KeyboardComponent;

  title: string = 'Prueba tecnica GABA';

  showKeyboard() {
    this.keyboard?.alternate();
  }
}
