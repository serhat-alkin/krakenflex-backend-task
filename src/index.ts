import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
import { DEFAULT_SITE_ID } from './constants';
import { processOutagesForSite } from './task';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/', router);

processOutagesForSite(DEFAULT_SITE_ID);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});