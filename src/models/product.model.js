import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productColecction = 'products'

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  owner: {
    type: String,
    default: "ADMIN"
    },
  thumbnail: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
})

productSchema.plugin(mongoosePaginate)
export default model(productColecction, productSchema)
