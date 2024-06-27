import {faker} from '@faker-js/faker'

export const fakeResult = () => {
    return faker.string.numeric({length: {min: 5, max: 5}, exclude: ['3', '4', '5', '6', '7', '8', '9']})
}