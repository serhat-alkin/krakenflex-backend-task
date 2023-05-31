import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});