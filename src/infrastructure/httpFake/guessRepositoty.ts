import { GuessRepository } from '../../domain/repositories/GuessRepository';
import { guessRepository } from '../repositories/guessRepository';
import { httpFake } from './http';

const client = httpFake;

export const guessRepositoryFake: GuessRepository = guessRepository(client);
