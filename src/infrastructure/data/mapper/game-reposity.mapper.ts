import { Mapper } from '../../../domain/core/mapper';
import { GameEntity } from '../../../domain/entity/Game';
import { Game } from '../model/game';

export class GameRepositoryMapper implements Mapper<GameEntity, Game> {
    mapToList(param: Game[]): GameEntity[] {
        const gameEntities: GameEntity[] = [];

        param.forEach((gameModel) => {
            gameEntities.push({
                gameId: gameModel.id,
                status: gameModel.status,
                attemptsLeft: gameModel.attemptsLeft,
                guesses: gameModel.guesses,
                wordToGuess: gameModel.wordToGuess,
            });
        });

        return gameEntities;
    }

    mapFromList(param: GameEntity[]): Game[] {
        const games: Game[] = [];

        param.forEach((gameEntity) => {
            games.push({
                id: gameEntity.gameId,
                status: gameEntity.status,
                attemptsLeft: gameEntity.attemptsLeft,
                guesses: gameEntity.guesses,
                wordToGuess: gameEntity.wordToGuess,
            });
        });

        return games;
    }

    mapFrom(gameEntity: GameEntity): Game {
        return {
            id: gameEntity.gameId,
            status: gameEntity.status,
            attemptsLeft: gameEntity.attemptsLeft,
            guesses: gameEntity.guesses,
            wordToGuess: gameEntity.wordToGuess,
        };
    }

    mapTo(game: Game): GameEntity {
        return {
            gameId: game.id,
            status: game.status,
            attemptsLeft: game.attemptsLeft,
            guesses: game.guesses,
            wordToGuess: game.wordToGuess,
        };
    }
}
