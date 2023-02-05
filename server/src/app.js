import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import connectDB from './mongoDB/connect.js';
import errorMiddleware from './middleware/error.middleware.js';

class App {
  constructor(controllers, port) {
    this.express = express();
    this.port = port;

    this.#initialiseMiddleware();
    this.#initialiseControllers(controllers);
    this.#initialiseErrorHandling();
    this.#initialiseDatabaseConnection();
    this.server = http.createServer(this.express);
  }

  #initialiseMiddleware() {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(cookieParser());
  }

  #initialiseControllers(controllers) {
    controllers.forEach((controller) => {
      this.express.use('/api/v1', controller.router);
    });
  }

  #initialiseErrorHandling() {
    this.express.use(errorMiddleware);
  }

  #initialiseDatabaseConnection() {
    const { MONGO_URL } = process.env;
    connectDB(MONGO_URL);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server has started on port: http://localhost:${this.port}`);
    });
  }
}

export default App;
