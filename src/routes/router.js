import colors from 'colors'
import express from 'express'
import fs from 'fs'
import path from 'path'

export class Router {

  constructor() {
    this.startFolder = null
  }

  //Called once during initial server startup
  static load(app, folderName) {
    if (!this.startFolder) {
      this.startFolder = path.basename(folderName)
    }

    fs.readdirSync(folderName)
      .forEach((file) => {

        if (file !== '.DS_Store') {
          const fullName = path.join(folderName, file)
          const stat     = fs.lstatSync(fullName)

          if (stat.isDirectory()) {
            //Recursively walk-through folders
            this.load(app, fullName)
          } else if (file.toLowerCase()
                         .indexOf('.js')) {
            //Grab path to JavaScript file and use it to construct the route
            let dirs = path.dirname(fullName)
                           .split(path.sep)
            if (dirs[1].toLowerCase() === this.startFolder.toLowerCase()) {
              dirs.splice(0, 2)
            }

            const router = express.Router()
            //Generate the route
            const baseRoute = '/' + dirs.join('/')
            console.log(colors.green('LOAD Route: '), colors.cyan.inverse(`${baseRoute} `), colors.green(' ==> ' + fullName))

            //Load the JavaScript file ("controller") and pass the router to it
            const controllerClass = require('../../' + fullName)
            const controller      = new controllerClass(router)
            //Associate the route with the router
            app.use(baseRoute, router)
          }
        }

      })
  }

}