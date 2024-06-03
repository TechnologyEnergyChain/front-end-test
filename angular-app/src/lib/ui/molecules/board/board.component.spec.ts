import {TestBed} from '@angular/core/testing'
import {BoardComponent} from '@lib/ui/molecules/board/board.component'
import {UseGameStore} from '@src/core/game/presentation/UseGameStore'
import {DependencyLocator} from '@src/core/common/infrastructure/DependencyLocator'
import {UseGuessStore} from '@src/core/guess/presentation/UseGuessStore'
import {GuessResult} from '@core/guess/domain/entities/GuessResult'
import {GameModelFactory} from '@core/test/factories/game/GameModelFactory'
import {GuessModelFactory} from '@core/test/factories/guess/GuesModelFactory'
import {Game} from '@core/game/domain/entities/GameModel'


describe('BoardComponent', () => {
  let useGameStore: UseGameStore
  let fakeState: Game

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
    }).compileComponents()
    useGameStore = TestBed.inject(UseGameStore)
    fakeState = new GameModelFactory().create({guesses: new GuessModelFactory().times(3, {result: '10200'})})
  })

  it('should create the component', () => {
    const fixture = TestBed.createComponent(BoardComponent)
    const wrapper = fixture.componentInstance
    expect(wrapper).toBeTruthy()
  })

  it('getLetter should return the letter in position [0, 1]', async () => {
    const fixture = TestBed.createComponent(BoardComponent)
    const wrapper = fixture.componentInstance
    useGameStore.ploc.update(fakeState)

    const letter = useGameStore.state?.guesses?.[0]?.word?.[1]
    const result = wrapper.getLetter(0, 1)

    expect(letter).toEqual(result)
  })

  it('should return the result "invalid"', async () => {
    const fixture = TestBed.createComponent(BoardComponent)
    const wrapper = fixture.componentInstance
    useGameStore.ploc.update(fakeState)

    const result = wrapper.getResult(1, 1)
    expect(result).toEqual(GuessResult.INVALID)
  })

  it('should return the result "invalid place"', async () => {
    const fixture = TestBed.createComponent(BoardComponent)
    const wrapper = fixture.componentInstance
    useGameStore.ploc.update(fakeState)
    const result = wrapper.getResult(0, 0)
    expect(result).toEqual(GuessResult.INVALID_PLACE)
  })

  it('should return the result "valid"', async () => {
    const fixture = TestBed.createComponent(BoardComponent)
    const wrapper = fixture.componentInstance
    useGameStore.ploc.update(fakeState)
    const result = wrapper.getResult(2, 2)
    expect(result).toEqual(GuessResult.VALID)
  })

})
