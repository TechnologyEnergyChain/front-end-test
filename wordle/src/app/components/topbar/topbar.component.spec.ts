import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';
import { ThemeService } from '../../domain/services/theme/theme.service';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;

  beforeEach(() => {
    const themeServiceSpyObj = jasmine.createSpyObj('ThemeService', ['toggleDarkTheme', 'isDarkThemeEnabled']);

    TestBed.configureTestingModule({
      declarations: [TopbarComponent],
      providers: [{ provide: ThemeService, useValue: themeServiceSpyObj }]
    });
    
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    themeServiceSpy = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode when toggleDarkMode is called', () => {
    themeServiceSpy.isDarkThemeEnabled.and.returnValue(true);
    component.toggleDarkMode();
    expect(themeServiceSpy.toggleDarkTheme).toHaveBeenCalled();
  });

  it('should return correct value from isDarkModeEnabled', () => {
    themeServiceSpy.isDarkThemeEnabled.and.returnValue(true);
    const darkModeEnabled = component.isDarkModeEnabled();
    expect(darkModeEnabled).toBe(true);
  });

  it('should render dark mode button with correct classes', () => {
    themeServiceSpy.isDarkThemeEnabled.and.returnValue(true);
    fixture.detectChanges();
    const darkModeButton = fixture.nativeElement.querySelector('.theme-icon i');
    expect(darkModeButton.classList.contains('fa-sun')).toBe(true);
  });
  
  it('should render the title correctly', () => {
    const titleElement = fixture.nativeElement.querySelector('h1');
    fixture.detectChanges();
    expect(titleElement.textContent).toContain('Wordle');
  });
});
