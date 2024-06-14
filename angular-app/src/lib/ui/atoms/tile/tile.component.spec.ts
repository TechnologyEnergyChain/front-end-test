import {TileComponent} from '@lib/ui/atoms/tile/tile.component'
import {TestBed} from '@angular/core/testing'
import {GuessLetterResult} from '@core/guess/domain/entities/GuessLetterResult'

describe('Tile Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileComponent],
    }).compileComponents()
  })

  it('should create the component', () => {
    const fixture = TestBed.createComponent(TileComponent)
    const wrapper = fixture.componentInstance
    expect(wrapper).toBeTruthy()
  })


  it('should display the letter "A" and contain the class has-letter', () => {
    const fixture = TestBed.createComponent(TileComponent)
    const wrapper = fixture.componentInstance
    wrapper.letter = 'A'
    fixture.detectChanges()
    const component = fixture.nativeElement as HTMLElement
    expect(component.querySelector('li')?.textContent).toContain('A')
    expect(component.querySelector('li')?.classList).toContain('has-letter')

  })

  it('should contain the class reveled-invalid', () => {
    const fixture = TestBed.createComponent(TileComponent)
    const wrapper = fixture.componentInstance
    wrapper.result = GuessLetterResult.INVALID
    fixture.detectChanges()
    const component = fixture.nativeElement as HTMLElement
    expect(component.querySelector('li')?.classList).toContain('reveled-invalid')
  })

  it('should contain the class reveled-valid', () => {
    const fixture = TestBed.createComponent(TileComponent)
    const wrapper = fixture.componentInstance
    wrapper.result = GuessLetterResult.VALID
    fixture.detectChanges()
    const component = fixture.nativeElement as HTMLElement
    expect(component.querySelector('li')?.classList).toContain('reveled-valid')
  })

})
