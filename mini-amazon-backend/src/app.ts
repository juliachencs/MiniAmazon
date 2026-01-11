import express from 'express';
import { errorHandler } from './middlewares/error.handler.js'
import { rootRouter } from './routes/index.js';
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', rootRouter);
app.use(errorHandler);