import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { GameOverlayComponent } from './game-overlay/game-overlay.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
        TopbarComponent,
        ErrorNotificationComponent,
        GameboardComponent,
        GameOverlayComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render topbar component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-topbar')).toBeTruthy();
  });

  it('should render error notification component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-error-notification')).toBeTruthy();
  });

  it('should render gameboard component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-gameboard')).toBeTruthy();
  });

  it('should render game overlay component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-game-overlay')).toBeTruthy();
  });
});
