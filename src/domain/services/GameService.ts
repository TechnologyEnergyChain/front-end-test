import { GameDifficulty } from '../entity/Game';
import { GameRepository } from '../repositories/GameRepository';

export const GameService = (repository: GameRepository): GameRepository => ({
    getGameDetails: (id: string) => {
        return repository.getGameDetails(id);
    },
    startGame: (difficulty: GameDifficulty = GameDifficulty.EASY) => {
        return repository.startGame(difficulty);
    },
});
