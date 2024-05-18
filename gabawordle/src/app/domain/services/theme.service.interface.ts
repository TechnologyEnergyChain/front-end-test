import { WritableSignal } from '@angular/core';
import { THEMES } from '@domain/models/themes.enum';

export interface IThemeService {
  theme: WritableSignal<THEMES>;
  setTheme(theme: THEMES): void;
}
