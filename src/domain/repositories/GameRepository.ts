import { Game } from '@infrastructure/data/model/game';
import { GameDifficulty } from '../entity/Game';

export interface GameRepository {
    startGame: (difficulty?: GameDifficulty) => Promise<string>;
    getGameDetails: (gameId: string) => Promise<Game>;
}
