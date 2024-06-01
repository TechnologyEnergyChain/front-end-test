import {faker} from '@faker-js/faker'

export const fakeUUID = () => {
    return faker.string.uuid()
}