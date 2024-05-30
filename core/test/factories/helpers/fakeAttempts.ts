import {faker} from "@faker-js/faker";

export const fakeAttempts = ():number => {
    return parseInt(faker.string.numeric({length: {min: 1, max: 1}, exclude: ['7', '8', '9']}))
}