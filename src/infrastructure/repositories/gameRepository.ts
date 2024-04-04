import { GameEntity, GameDifficulty } from '../../domain/entity/Game';
import { GameRepository } from '../../domain/repositories/GameRepository';
import { Http } from '../../domain/repositories/Http';
import { GameRepositoryMapper } from '../data/mapper/game-reposity.mapper';
import { Game } from '../data/model/game';
import { StateGameFake } from './stateGameFake';

export const gameRepository = (client: Http, mapper: GameRepositoryMapper): GameRepository => ({
    startGame: async (difficulty?: GameDifficulty) => {
        await client.get<string>('/game', { difficulty: difficulty });
        const stateFake = StateGameFake.getInstance(difficulty);
        stateFake.clearGame();
        const gameId: string = stateFake.game.gameId;
        return gameId;
    },
    getGameDetails: async (gameId: string): Promise<Game> => {
        await client.get<GameEntity>(`/game/${gameId}`);
        const stateFake = StateGameFake.getInstance();
        const game: Game = mapper.mapFrom(stateFake.game);
        return game;
    },
});
