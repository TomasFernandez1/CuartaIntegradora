import { EErrors } from '../repositories/errors/enums.js'

export const handleErrors = (error, req, res, next) => {
  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      return res.send({ status: 'error', error: error.cause })
    case EErrors.ROUTING_ERROR:
      return res.send({ status: 'error', error: error.cause })
    case EErrors.DATABASE_ERROR:
      return res.send({ status: 'error', error: error.cause })
    case EErrors.DATA_PRODUCT_ERROR:
      return res.send({ status: 'error', error: error.cause })
    case EErrors.ADD_PRODUCT_ERROR:
      return res.send({ status: 'error', error: error.cause })
    case EErrors.ADD_OWN_PRODUCT_ERROR:
      return res.send({status: 'error', error: error.cause})
    default:
      return res.send({ status: 'error', error: 'Error de server' })
  }
}
