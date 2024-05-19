import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppInterceptor } from '@infrastructure/interceptors/app.interceptor';
import {
  GAME_SERVICE_TOKEN,
  KEYBOARD_SERVICE_TOKEN,
  THEME_SERVICE_TOKEN,
  TOAST_SERVICE_TOKEN,
} from '@domain/tokens';
import { KeyboardServiceImp } from '@infrastructure/services/keyboard/keyboard.service';
import { ToastServiceImp } from '@infrastructure/services/toast/toast.service';
import { ThemeServiceImp } from '@infrastructure/services/theme/theme.service';
import { GameServiceAdapter } from '@infrastructure/services/http/game/game.adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    { provide: GAME_SERVICE_TOKEN, useClass: GameServiceAdapter },
    { provide: KEYBOARD_SERVICE_TOKEN, useClass: KeyboardServiceImp },
    { provide: TOAST_SERVICE_TOKEN, useClass: ToastServiceImp },
    { provide: THEME_SERVICE_TOKEN, useClass: ThemeServiceImp },
  ],
};
