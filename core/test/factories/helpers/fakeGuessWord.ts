import {faker} from '@faker-js/faker'

export const fakeGuessWord = () => {
    return faker.string.alpha({ length: 5, casing: 'lower' })
}