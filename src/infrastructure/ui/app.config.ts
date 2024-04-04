import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { WordleStateService } from './services/wordleState.service.ts.service';
import { ThemeService } from './services/theme.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        // provideAnimationsAsync(),
        WordleStateService,
        ThemeService,
    ],
};
