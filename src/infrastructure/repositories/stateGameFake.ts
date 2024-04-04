import { GameDifficulty, GameEntity, GameStatus } from '@domain/entity/Game';

export class StateGameFake {
    private static instance: StateGameFake;

    game: GameEntity;
    difficulty: GameDifficulty;

    private constructor(difficulty: GameDifficulty) {
        this.game = {
            attemptsLeft: 5,
            gameId: 'randomId',
            status: GameStatus.PLAYING,
            wordToGuess: 'SOLAR',
            guesses: [],
        };
        this.difficulty = difficulty;
    }

    public static getInstance(difficulty: GameDifficulty = GameDifficulty.EASY): StateGameFake {
        if (!StateGameFake.instance) {
            StateGameFake.instance = new StateGameFake(difficulty);
        }

        return StateGameFake.instance;
    }

    public clearGame() {
        this.game = {
            attemptsLeft: 5,
            gameId: 'randomId',
            status: GameStatus.PLAYING,
            wordToGuess: 'SOLAR',
            guesses: [],
        };
    }
}
