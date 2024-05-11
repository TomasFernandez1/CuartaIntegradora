import winston from 'winston'
import { program } from './process.js'

const { mode } = program.opts()

const levelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'red',
    error: 'yellow',
    warning: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'white'
  }
}

let logger;

if (mode === 'development') {
  logger = winston.createLogger({
    levels: levelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(winston.format.colorize({ colors: levelOptions.colors }), winston.format.simple())
      })
    ]
  })
}else{
  logger = winston.createLogger({
    levels: levelOptions.levels,
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(winston.format.colorize({ colors: levelOptions.colors }), winston.format.simple())
      }),
      new winston.transports.File({ filename: './errors.log', level: 'error', format: winston.format.simple() })
    ]
  })
}


export const addLogger = (req, res, next) => {
  req.logger = logger
  req.logger.http(`${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`)
  next()
}
