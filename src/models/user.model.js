import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = 'users'
const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN', 'PREMIUM'],
    default: 'USER'
  },
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'carts'
  },
  documents: [
    {
      name: String,
      reference: String,
      docType: String,
      _id: false
    }
  ],
  last_connection: {
    type: Date
  }
})

userSchema.pre('findOne', function () {
  this.populate('cartId')
})

userSchema.plugin(mongoosePaginate)

export default model(userCollection, userSchema)
