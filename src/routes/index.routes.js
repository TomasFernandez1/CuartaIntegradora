import { Router } from 'express'

import usersR from './users.routes.js';
import sessionsR from './sessions.routes.js'
import viewsR from './views.routes.js'
import productsR from './products.routes.js'
import cartsR from './carts.routes.js'
import pruebasR from './prueba.routes.js'

import { EErrors } from '../repositories/errors/enums.js'
import CustomError from '../repositories/errors/CustomError.js'
import { routingErrorInfo } from '../repositories/errors/info.js'

// Routers
const router = Router()
const usersRouter = new usersR()
const cartsRouter = new cartsR()
const sessionsRouter = new sessionsR()
const viewsRouter = new viewsR()
const productsRouter = new productsR()
const pruebasRouter = new pruebasR()

router.use('/test', pruebasRouter.getRouter())
router.use('/users', usersRouter.getRouter())
router.use('/view', viewsRouter.getRouter())
router.use('/sessions', sessionsRouter.getRouter())
router.use('/carts', cartsRouter.getRouter())
router.use('/products', productsRouter.getRouter())

router.use('*', (req, res, next) => {
  CustomError.createError({
    name: 'Reach endpoint error',
    cause: routingErrorInfo(req),
    message: 'Error endpoint',
    code: EErrors.ROUTING_ERROR
  })
  next()
})

export default router
