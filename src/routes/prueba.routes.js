import RouterClass from './router.js'
import { generateProducts } from '../utils/generateProducts.js'
import {generateUser} from '../utils/generateUser.js';

export default class pruebasRouter extends RouterClass {
  init() {
    
    this.get('/mockingProducts', ['PUBLIC'], (req, res) => {
      let products = []
      for (let index = 0; index < 100; index++) {
        products.push(generateProducts(index))
      }
      res.send(products)
    })

    this.get('/generateUser', ['PUBLIC'], (req, res) => {
      res.send(generateUser())
    })

    this.get('/loggerTest', ['PUBLIC'], (req, res) => {
      req.logger.fatal('FATAL ERROR')
      req.logger.error('Error')
      req.logger.warning('Warning')
      req.logger.info('info')
      req.logger.http('http')
      req.logger.debug('debug')
      res.send('Loggers sended')
    })
  }
}
