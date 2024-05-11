import dotenv from 'dotenv'
import { MongoSingleton } from '../utils/mongoSingleton.js'
import { program } from '../utils/process.js'

// DB connection
export const connectDB = async () => {
  try {
    MongoSingleton.getInstance(process.env.MONGO_URL)
  } catch (error) {
    console.error(error)
  }
}

const { mode } = program.opts()

dotenv.config({
  path: mode === 'development' ? './src/.env.development' : './src/.env.production'
})
export default {
  PORT: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  secretSession: process.env.SECRET_SESSION,
  tokenKey: process.env.TOKEN_KEY,
  gmail_user_app: process.env.GMAIL_USER_APP,
  gmail_password_app: process.env.GMAIL_PASSWORD_APP


}
