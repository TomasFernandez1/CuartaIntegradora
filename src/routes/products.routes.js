import RouterClass from './router.js'
import ProductsController from '../controllers/products.controller.js'

const { getProduct, getProducts, deleteProduct, newProduct, updateProduct, createProduct } = new ProductsController()

export default class productsRouter extends RouterClass {
  init() {
    // Create product view
    this.get('/create-product', ['ADMIN', 'PREMIUM'], createProduct)

    // Products view
    this.get('/', ['USER', 'PREMIUM', 'ADMIN'], getProducts)

    // Product view
    this.get('/:pid', ['USER', 'PREMIUM', 'ADMIN'], getProduct)

    // New product endpoint
    this.post('/', ['ADMIN', 'PREMIUM'], newProduct)

    // Update product endpoint
    this.put('/:pid', ['ADMIN', 'PREMIUM'], updateProduct)

    // Delete product endpoint
    this.delete('/:pid', ['ADMIN', 'PREMIUM'], deleteProduct)
  }
}
