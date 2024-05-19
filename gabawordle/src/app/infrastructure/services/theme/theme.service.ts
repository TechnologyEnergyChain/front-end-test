import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { THEMES } from '@domain/models/themes.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeServiceImp {
  theme: WritableSignal<THEMES> = signal(THEMES.LIGHT);

  constructor() {
    effect(() => {
      this.changeBodyTheme(this.theme());
    });
  }

  setTheme(theme: THEMES): void {
    this.theme.set(theme);
  }

  private changeBodyTheme(theme: THEMES): void {
    document.body.className = theme;
  }
}
