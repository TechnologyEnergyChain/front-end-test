import { Component, inject } from '@angular/core';
import { ChangeThemeUseCase } from '@application/change-theme/change-theme.use-case';
import { THEMES } from '@domain/models/themes.enum';
import { IThemeService } from '@domain/services/theme.service.interface';
import { THEME_SERVICE_TOKEN } from '@domain/tokens';

@Component({
  selector: 'app-theme-button',
  standalone: true,
  imports: [],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.css',
})
export class ThemeButtonComponent {
  themeService: IThemeService = inject(THEME_SERVICE_TOKEN);
  currentTheme = this.themeService.theme;
  themesEnum = THEMES;

  changeThemeUseCase = new ChangeThemeUseCase();

  changeTheme(): void {
    this.changeThemeUseCase.execute();
  }
}
