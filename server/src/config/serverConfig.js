import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import 'dotenv/config';
import routes from '../routes/index.js';
import connectDB from '../mongoDB/connect.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', routes);

const port = process.env.PORT || 8800;

const server = http.createServer(app);

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    server.listen(port, () => {
      console.log(`Server has started on port: http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export { startServer };
