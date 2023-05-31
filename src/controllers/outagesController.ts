import { Request, Response } from 'express';
import { getAllOutages } from '../services/outagesService';

export const getOutages = async (req: Request, res: Response): Promise<void> => {
  try {
    const outages = await getAllOutages();
    res.json(outages);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('Unknown error occurred');
    }
  }
};

