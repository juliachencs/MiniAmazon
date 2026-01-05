import express from 'express';
import { errorHandler } from './middlewares/error.handler.js'
import { rootRouter } from './routes/index.js';

const PORT = 5200;

const app = express();


app.use(express.json());
app.use('/api', rootRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
