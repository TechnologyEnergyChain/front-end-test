import { inject } from '@angular/core';
import { THEMES } from '@domain/models/themes.enum';
import { IThemeService } from '@domain/services/theme.service.interface';
import { THEME_SERVICE_TOKEN } from '@domain/tokens';

export class ChangeThemeUseCase {
  themeService: IThemeService = inject(THEME_SERVICE_TOKEN);

  execute(): void {
    const currentTheme = this.themeService.theme();
    const theme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;

    this.themeService.setTheme(theme);
  }
}
