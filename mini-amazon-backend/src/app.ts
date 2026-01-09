import express from 'express';
import { errorHandler } from './middlewares/error.handler.js'
import { rootRouter } from './routes/index.js';

export const app = express();

app.use(express.json());
app.use('/api', rootRouter);
app.use(errorHandler);