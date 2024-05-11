import RouterClass from './router.js'
import CartsController from '../controllers/carts.controller.js'

const {
  addProductToCart,
  deleteAllProductsCart,
  deleteProductCart,
  getCart,
  getCarts,
  updateCart,
  updateQuantityProductCart,
  purchase
} = new CartsController()

export default class cartRouter extends RouterClass {
  init() {
    // Init service
    // Carts view
    this.get('/', ['ADMIN', 'PREMIUM'], getCarts)
    
    // Cart view
    this.get('/:cid', ['USER', 'ADMIN', 'PREMIUM'], getCart)
    
    // Delete all the products from the carts
    this.delete('/:cid', ['USER', 'ADMIN', 'PREMIUM'], deleteAllProductsCart)
    
    // Update cart
    this.put('/:cid', ['USER', 'ADMIN', 'PREMIUM'], updateCart)
    
    // Add a product to a cart
    this.post('/:cid/products/:pid', ['USER', 'PREMIUM', 'ADMIN'], addProductToCart)

    // Update quantity of a product in the cart
    this.put('/:cid/products/:pid', ['USER', 'ADMIN', 'PREMIUM'], updateQuantityProductCart)

    // Delete a product from the cart
    this.delete('/:cid/products/:pid', ['USER', 'ADMIN', 'PREMIUM'], deleteProductCart)

    this.post('/:cid/purchase', ['USER', 'PREMIUM', 'ADMIN'], purchase)
  }
}
