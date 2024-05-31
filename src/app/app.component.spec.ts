import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ComponentModule } from './ui/components/component.module';

describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        ComponentModule,
        RouterModule.forRoot(
          [{
            path: 'wordle-game',
            loadChildren: () => import('./ui/views/wordle-game/wordle-game.routing.module').then(m => m.WordleGameRoutingModule)
          },
          {
            path: '**',
            redirectTo: 'wordle-game'
          }]
        )
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Comprobar app', () => {
    expect(app).toBeTruthy();
  });

  it(`Comprobar title`, () => {
    expect(app.title).toEqual('Prueba tecnica GABA');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Prueba tecnica GABA');
  });

  it('Comprobar keyboard', () => {
    app.showKeyboard();
    app.showKeyboard();
    expect(app['keyboard']?.isShow).toBe(true);
    app.showKeyboard();
    expect(app['keyboard']?.isShow).toBe(false);
  });
});
