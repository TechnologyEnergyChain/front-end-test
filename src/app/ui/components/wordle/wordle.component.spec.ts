import { DebugElement, SimpleChanges } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { By } from "@angular/platform-browser";
import { WordItem, WordleModel, WorldeComponent } from "./wordle.component";

function getHtmlTemplate(fixture: ComponentFixture<WorldeComponent>) {
  const card1: DebugElement = fixture.debugElement.query(By.css('.content'));
  const card2: DebugElement = card1.query(By.css('.word'));
  const input = card2.queryAll(By.css('.letter'));
  return { card1, input, card2 };
}

describe('WordeleGameComponent', () => {

  let component: WorldeComponent;
  let fixture: ComponentFixture<WorldeComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        FormsModule
      ],
      declarations: [
        WorldeComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('Comprobar WordeleGameComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Comprobar ngOnChanges', () => {

    const simpleSangues: SimpleChanges = {
      ['maxWords']: {
        currentValue: 6,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      },
      ['maxWordLength']: {
        currentValue: 5,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    };

    component.ngOnChanges(simpleSangues);
    fixture.detectChanges();

    expect(component.maxWordsArr?.length).toBe(6);
    expect(component.maxWordLengthArr?.length).toBe(5);

    const modelWord = Object.entries(component.model);
    expect(modelWord.length).toBe(6);

    modelWord.forEach(mw => {
      const modelLetter = Object.entries(mw[1]);
      expect(modelLetter.length).toBe(5);
      expect(modelLetter.map(ml => ml[1]).join('')).toBe('');
    });
  });

  it('Comprobar isWordReadOnly()', () => {
    expect(component.isWordReadOnly(1)).toBe(true);
    component.currentWordIndex = 1
    fixture.detectChanges();
    expect(component.isWordReadOnly(1)).toBe(false);
  });

  it('Comprobar isWordWriten()', () => {
    expect(component.isWordWriten(1)).toBe(false);
    component.currentWordIndex = 2;
    fixture.detectChanges();
    expect(component.isWordWriten(1)).toBe(true);
  });

  it('Comprobar win()', () => {
    component.currentWordIndex = -1;
    fixture.detectChanges();
    expect(component.isWin).toBe(true);
    expect(component.isFinish).toBe(true);
  });

  it('Comprobar lose()', () => {
    component.currentWordIndex = -2;
    fixture.detectChanges();
    expect(component.isWin).toBe(false);
    expect(component.isFinish).toBe(true);
  });

  it('Comprobar getTypeClass()', () => {
    const words: WordItem = {
      [1]: ['good'],
      [2]: ['bad', 'good'],
      [3]: ['verygood', 'bad']
    };
    component.words = words;
    fixture.detectChanges();
    expect(component.getTypeClass(0, 0)).toBe('');
    expect(component.getTypeClass(1, 0)).toBe('good');
    expect(component.getTypeClass(2, 0)).toBe('bad');
    expect(component.getTypeClass(2, 1)).toBe('good');
    expect(component.getTypeClass(3, 0)).toBe('verygood');
    expect(component.getTypeClass(3, 1)).toBe('bad');
  });

  it('Comprobar wordInpuFocus()', () => {
    const html = getHtmlTemplate(fixture);
    component.wordInpuFocus(html.input[0].nativeElement, 0, 1);
    // fixture.detectChanges();
    // fixture.whenStable().then(() => {
    // expect(html.card2.query(By.css(':focus'))).not.toBeNull();
    // });

    html.input[0].nativeElement.blur();
    component.wordInpuFocus(html.input[0].nativeElement, 0, 0);
    fixture.detectChanges();
    expect(html.card2.query(By.css(':focus'))).toBeNull();
  });

  it('Comprobar modelChange', () => {
    const model: WordleModel = { [0]: { [0]: 's', [1]: 's', [2]: 's', [3]: 's', [4]: 's' } };
    component.maxWords = 1;
    component.maxWordLength = 5;
    component.maxWordsArr = [0]
    component.maxWordLengthArr = [0, 1, 2, 3, 4];
    component.model = model;
    fixture.detectChanges();
    expect(component['getWord'](0)).toBe('sssss');
    expect(component['getWord'](1)).toBeNull();
    const input = getHtmlTemplate(fixture).input;
    component.modelChange('a', input[0].nativeElement, 0);
    component.modelChange('a', input[1].nativeElement, 2);
    component.currentWordIndex = 3;
    fixture.detectChanges();
    component.modelChange('a', input[1].nativeElement, 0);
    expect(component['nextWordInputElement']).not.toBeNull();
  });
});
