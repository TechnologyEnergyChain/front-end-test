import {TestBed} from "@angular/core/testing";
import {BoardComponent} from "@lib/ui/molecules/board/board.component";
import {UseGameStore} from "@lib/store/UseGameStore";
import {DependencyLocator} from "@lib/dependency-injection/DependencyLocator";
import {UseGuessStore} from "@lib/store/UseGuessStore";
import {GuessResult} from "@core/guess/domain/entities/GuessResult";

describe('BoardComponent', () => {
  let useGameStore: UseGameStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        UseGameStore,
        UseGuessStore,
        {
          provide: DependencyLocator
        },
      ],
      imports: [BoardComponent],
    }).compileComponents();
    useGameStore = TestBed.inject(UseGameStore);
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(BoardComponent)
    const wrapper = fixture.componentInstance
    expect(wrapper).toBeTruthy()
  });

  it('should return the letter "u"', async () => {
    const fixture = TestBed.createComponent(BoardComponent)
    const wrapper = fixture.componentInstance
    await useGameStore.ploc.start()
    await useGameStore.ploc.getGame()
    const letter = wrapper.getLetter(0, 1)
    expect(letter).toEqual('u')
  });

  it('should return the result "invalid"', async () => {
    const fixture = TestBed.createComponent(BoardComponent)
    const wrapper = fixture.componentInstance
    await useGameStore.ploc.start()
    await useGameStore.ploc.getGame()
    const result = wrapper.getResult(1, 1)
    expect(result).toEqual(GuessResult.INVALID)
  });

  it('should return the result "invalid place"', async () => {
    const fixture = TestBed.createComponent(BoardComponent)
    const wrapper = fixture.componentInstance
    await useGameStore.ploc.start()
    await useGameStore.ploc.getGame()
    const result = wrapper.getResult(0, 0)
    expect(result).toEqual(GuessResult.INVALID_PLACE)
  });

  it('should return the result "valid"', async () => {
    const fixture = TestBed.createComponent(BoardComponent)
    const wrapper = fixture.componentInstance
    await useGameStore.ploc.start()
    await useGameStore.ploc.getGame()
    const result = wrapper.getResult(2, 1)
    expect(result).toEqual(GuessResult.VALID)
  });

})
