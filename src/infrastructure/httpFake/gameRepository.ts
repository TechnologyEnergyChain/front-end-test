import { GameRepository } from '../../domain/repositories/GameRepository';
import { GameRepositoryMapper } from '../data/mapper/game-reposity.mapper';
import { gameRepository } from '../repositories/gameRepository';

import { httpFake } from './http';

const client = httpFake;
const mapper = new GameRepositoryMapper();

export const gameRepositoryFake: GameRepository = gameRepository(client, mapper);
