import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    service = new ThemeService();
  });

  afterEach(() => {
    localStorage.removeItem('darkThemeEnabled');
    document.body.classList.remove('theme-dark');
    document.body.classList.remove('theme-light');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load and apply the dark theme from local storage', () => {
    localStorage.setItem('darkThemeEnabled', 'true');

    service = new ThemeService();

    expect(service.isDarkThemeEnabled()).toBeTruthy();
    expect(document.body.classList.contains('theme-dark')).toBeTruthy();
    expect(document.body.classList.contains('theme-light')).toBeFalsy();
  });

  it('should load and apply the light theme from local storage', () => {
    localStorage.setItem('darkThemeEnabled', 'false');

    service = new ThemeService();

    expect(service.isDarkThemeEnabled()).toBeFalsy();
    expect(document.body.classList.contains('theme-dark')).toBeFalsy();
    expect(document.body.classList.contains('theme-light')).toBeTruthy();
  });

  it('should toggle between dark and light theme', () => {
    service.toggleDarkTheme();
    expect(service.isDarkThemeEnabled()).toBeTruthy();
    expect(localStorage.getItem('darkThemeEnabled')).toEqual('true');
    expect(document.body.classList.contains('theme-dark')).toBeTruthy();
    expect(document.body.classList.contains('theme-light')).toBeFalsy();

    service.toggleDarkTheme();
    expect(service.isDarkThemeEnabled()).toBeFalsy();
    expect(localStorage.getItem('darkThemeEnabled')).toEqual('false');
    expect(document.body.classList.contains('theme-dark')).toBeFalsy();
    expect(document.body.classList.contains('theme-light')).toBeTruthy();
  });
});
