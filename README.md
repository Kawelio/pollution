# GADAFIE - Backend
# Angular 2, NodeJS, MongoDB

## Software Requirements To Run Locally (there's a Docker option below as well)

* Node.js 6.5.0 or higher
* Database : MongoDB 3.2 or higher
* ORM: Mongoose version 4.0.0
* IDE used : Intellij idea
* Versionning with Gitlab
* Project Management : JIRA

### Running the Application Locally

1. Install Node.js (6.5 or higher) and MongoDB (3.2 or higher) on your dev box

    * Node.js: https://nodejs.org
    * MongoDB: https://docs.mongodb.com/manual/installation

1. Execute `mongod` to start the MongoDB daemon if it's not already running

1. Install Nodemon and Gulp: `npm install nodemon gulp -g`

1. Run `npm install` to install app dependencies

1. Run `npm run dev` to compile the TypeScript and start the server

1. Browse to http://localhost:3000

## Running the Application with Docker

1. Install Node.js (6.5 or higher) and Docker for Mac/Windows or Docker Toolbox - https://www.docker.com/products/overview

1. Open `config/config.development.json` and change the host from `localhost` to `mongodb`

1. Run `docker-compose build` to build the images

1. Run `docker-compose up` to run the containers

1. Navigate to http://localhost:3000 if using Docker for Mac/Windows or http://192.168.99.100:3000 if using Docker Toolbox in a browser


