import multer from 'multer'
import { __dirname } from '../utils.js'
import fs from 'fs'

const productsPath = `${__dirname}/public/uploads/products`
const profilesPath = `${__dirname}/public/uploads/profiles`
const documentsPath = `${__dirname}/public/uploads/documents`

if (!fs.existsSync(productsPath)) {
  fs.mkdirSync(productsPath, { recursive: true })
}

if (!fs.existsSync(profilesPath)) {
  fs.mkdirSync(profilesPath, { recursive: true })
}

if (!fs.existsSync(documentsPath)) {
  fs.mkdirSync(documentsPath, { recursive: true })
}
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    switch (file.fieldname) {
      case 'identity':
      case 'myAddress':
      case 'myAccount':
        callback(null, `${__dirname}/public/uploads/documents`)
        break
      case 'product':
        callback(null, `${__dirname}/public/uploads/products`)
        break
      case 'profile':
        callback(null, `${__dirname}/public/uploads/profiles`)
        break
      default:
        break
    }
  },
  filename: function (req, file, callback) {
    callback(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
  }
})

export const uploader = multer({
  storage,
  onError: function (err, next) {
    console.log(err)
    next()
  }
})
