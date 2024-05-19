import { InjectionToken } from '@angular/core';
import IGameService from '@domain/services/game.service.interface';
import { IKeyboardService } from '@domain/services/keyboard.service.inteface';
import { IToastService } from '@domain/services/toast.service.interface';
import { IThemeService } from './services/theme.service.interface';

export const GAME_SERVICE_TOKEN = new InjectionToken<IGameService>(
  'GameServiceAdapter'
);

export const KEYBOARD_SERVICE_TOKEN = new InjectionToken<IKeyboardService>(
  'KeyboardServiceAdapter'
);

export const TOAST_SERVICE_TOKEN = new InjectionToken<IToastService>(
  'ToastServiceAdapter'
);

export const THEME_SERVICE_TOKEN = new InjectionToken<IThemeService>(
  'ThemeServiceAdapter'
);
