import UserRepository from './user.repository.js'
import ProductRepository from './products.repository.js'
import CartRepository from './cart.repository.js'
import TicketRepository from './ticket.repository.js'

import UserDao from '../daos/Mongo/user.dao.js'
import ProductDao from '../daos/Mongo/product.dao.js'
import CartDao from '../daos/Mongo/cart.dao.js'
import TicketDao from '../daos/Mongo/ticket.dao.js'

export const userService = new UserRepository(new UserDao())
export const productService = new ProductRepository(new ProductDao())
export const cartService = new CartRepository(new CartDao())
export const ticketService = new TicketRepository(new TicketDao())
