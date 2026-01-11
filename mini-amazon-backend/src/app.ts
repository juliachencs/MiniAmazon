import express from 'express';
import { errorHandler } from './middlewares/error.handler.js'
import { rootRouter } from './routes/index.js';
import cors from 'cors';

export const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use('/api', rootRouter);
app.use(errorHandler);
app.use(cors());