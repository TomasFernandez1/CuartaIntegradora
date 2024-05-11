// Libraries
import express from 'express'
import handlebars from 'express-handlebars'

//import { Server } from 'socket.io'

//import logger from 'morgan'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import swaggerJsDocs from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import compression from 'express-compression'

// Config
import { __dirname } from './utils.js'
import { connectDB } from './config/config.js'
import config from './config/config.js'
import { initializePassport } from './config/passport.config.js'
import { handleErrors } from './middlewares/errorMiddleware.js'
import { addLogger } from './utils/logger.js'
import viewsR from './routes/views.routes.js'

// Router
import appRouter from './routes/index.routes.js'

const app = express()
const viewsRouter = new viewsR()

connectDB()
app.use(compression({ brotli: { enabled: true, zlib: {} } }))
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// Init passport
initializePassport()
app.use(passport.initialize())
app.use(addLogger)

// Init handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Init Routers
const swaggerOptions = {
  definition :{
      openapi: '3.0.1',
      info: {
          title: 'Documentation of eCommerce',
          description: 'Description App eCommerce'
      },
      
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDocs(swaggerOptions)

// Init Routers
app.use('/api', appRouter)
app.use('/', viewsRouter.getRouter())
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
//app.use(handleErrors)

app.listen(config.PORT, () => {
  console.log('Listening port ' + config.PORT)
})
