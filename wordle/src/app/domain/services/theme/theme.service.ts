import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly DARK_THEME_KEY = 'darkThemeEnabled';
  private darkThemeEnabled: boolean = false;

  constructor() {
    this.loadTheme();
    this.applyTheme();
  }

  private loadTheme() {
    const darkThemeEnabledStr = localStorage.getItem(this.DARK_THEME_KEY);
    if (darkThemeEnabledStr !== null) {
      this.darkThemeEnabled = JSON.parse(darkThemeEnabledStr);
    }
  }

  private applyTheme() {
    if (this.darkThemeEnabled) {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    } else {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
    }
  }

  public isDarkThemeEnabled(): boolean {
    return this.darkThemeEnabled;
  }

  public toggleDarkTheme(): void {
    this.darkThemeEnabled = !this.darkThemeEnabled;
    localStorage.setItem(this.DARK_THEME_KEY, JSON.stringify(this.darkThemeEnabled));
    this.applyTheme();
  }
}