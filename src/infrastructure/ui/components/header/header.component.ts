import { Component, inject, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, MatSlideToggleModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    @Input() attemptsLeft!: number;
    @Input() wordToGuess: string = '';

    title = 'Wordle Game';

    themeService: ThemeService = inject(ThemeService);

    toggleTheme() {
        this.themeService.updateTheme();
    }
}
