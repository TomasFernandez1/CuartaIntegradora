import { faker } from '@faker-js/faker'

export const generateUser = () => {
    /*
    let numberOfProducts = parseInt(faker.string.numeric(1, { bannedDigits: ['0'] }))
  
    let products = []
  
    for (let i = 0; i < numberOfProducts; i++) {
      products.push(generateProducts())
    }*/


  
    return {
      id: faker.database.mongodbObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  }