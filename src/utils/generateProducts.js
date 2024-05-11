import { faker } from '@faker-js/faker'

export const generateProducts = (index) => {
  return {
    //index,
    //id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: parseInt(faker.string.numeric()),
    category: faker.commerce.department(),
    description: faker.commerce.product()
  }
}
