import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../domain/services/theme/theme.service';
import { GameStatusService } from '../../domain/services/game-status/game-status.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  isGameActive: boolean = false;

  constructor(
    private themeService: ThemeService,
    private gameStatusService: GameStatusService
  ) { }

  ngOnInit(): void {
    this.gameStatusService.getIsGameActive().subscribe((isActive: boolean) => {
      this.isGameActive = isActive;
    });
  }

  toggleDarkMode() {
    this.themeService.toggleDarkTheme();
  }

  isDarkModeEnabled(): boolean {
    return this.themeService.isDarkThemeEnabled();
  }
}
