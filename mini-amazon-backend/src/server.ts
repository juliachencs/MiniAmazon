import { app } from "./app.js";
import { connectDB } from './config/database.js';
import 'dotenv/config';

const PORT = process.env.PORT || 5200;

const start = async (): Promise<void> => {

  await connectDB();

  app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}

start();