import {DependencyLocator} from "@src/core/common/infrastructure/DependencyLocator";
import {UseGameStore} from "@src/core/game/presentation/UseGameStore";
import {TestBed} from "@angular/core/testing";
import {Game} from "@core/game/domain/entities/GameModel";

describe('UseGameStore', () => {
  let useGameStore: UseGameStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UseGameStore,
        {
          provide: DependencyLocator
        },
      ]
    });
    useGameStore = TestBed.inject(UseGameStore);
  });

  it('should be created', () => {
    expect(useGameStore).toBeTruthy();
  });


  it('should update the state', () => {
    const gameData = new Game({id: 'randomId'});
    useGameStore.ploc.update(gameData)
    expect(useGameStore.state).not.toEqual(undefined);
    expect(useGameStore.state).toEqual(gameData);
  });
});
