import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import expressValidator from 'express-validator'
import helmet from 'helmet'
import { Router } from './routes/Router'

dotenv.config()
const env = process.env.NODE_ENV

const devPort = process.env.DEV_PORT || 3004
const app     = express()

class Server {

  constructor() {
    this.initExpressMiddleWare()
    this.initRoutes()
    this.start()
  }

  start() {
    //Listen on secure port for production !!
    if (env === 'prod' || env === 'preprod') {
      app.listen(sslPort, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log(`####################################################\nListening on ${process.env.PROD_HOST_API}`)
        }
      })
    } else {
      app.listen(devPort, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log(`####################################################\nListening on ${process.env.DEV_HOST_API}`)
        }
      })
    }
  }

  initExpressMiddleWare() {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors({ origin: '*' }))
    app.use(expressValidator())

    if (env === 'prod' || env === 'preprod') {
      console.log('CORS | HELNET | RESPONSE HEADER ==> OK <==')
      app.use(helmet())
    }

    process.on('uncaughtException', (err) => {
      if (err) {
        console.log(err, err.stack)
      }
    })
  }

  initRoutes() {
    //Load routes in /controllers
    Router.load(app, 'src/controllers')
  }

}

module.exports = new Server()