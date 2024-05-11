import { productService } from '../repositories/index.js'
import { EErrors } from '../repositories/errors/enums.js'
import CustomError from '../repositories/errors/CustomError.js'
import { dataProductErrorInfo } from '../repositories/errors/info.js'
import {generateProducts}from '../utils/generateProducts.js';
export default class ProductsController {
  constructor() {
    this.service = productService
  }
  getProducts = async (req, res) => {
    try {
      const { limit = 10, pageQuery = 1, sort } = req.query
      
      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, page } = await this.service.getProduct(
        limit,
        pageQuery,
        sort
      )
      res.render('products', {
        products: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page,
        user: req.user
      })
    } catch (error) {
      req.logger.info(error)
      return res.sendServerError(error.message)
    }
  }

  getProduct = async (req, res) => {
    try {
      const { pid } = req.params // Product ID
      const result = await this.service.getProductBy(pid)
      return res.render('product', { result, user: req.user })
    } catch (error) {
      req.logger.warning(error)
      return res.sendServerError(error.message)
    }
  }

  createProduct = async (req, res) => {
    return res.render('create-products', { user: req.user })
  }

  newProduct = async (req, res, next) => {
    try {
      const newProduct = req.body // New Product
      if(req.user.role === 'PREMIUM') newProduct.owner = req.user.email
      if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.category || !newProduct.stock) {
        CustomError.createError({
          name: 'Error to create product',
          cause: dataProductErrorInfo(newProduct),
          message: 'Error to create product',
          code: EErrors.DATA_PRODUCT_ERROR
        })
      }
      const product = await this.service.createProduct(newProduct)
      return res.sendSuccess(product)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  updateProduct = async (req, res) => {
    try {
      const { pid } = req.params // Product ID
      const updateProduct = req.body // Updated product
      await this.service.updateProduct(pid, updateProduct)
      res.sendSuccess(`The Product with id ${pid} was successfully updated`)
    } catch (error) {
      req.logger.warning(error)
      return res.sendServerError(error.message)
    }
  }

  deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params // Product ID
      await this.service.deleteProduct(pid)
      res.sendSuccess('Product deleted successfully')
    } catch (error) {
      req.logger.error(error)
      return res.sendServerError(error.message)
    }
  }
}
