import { Request, Response } from 'express';
import { IOutage } from '../interfaces/IOutage';
import { getAllOutages, postSiteOutages } from '../services/outagesService';

export const getOutages = async (req: Request, res: Response): Promise<void> => {
  try {
    const outages: IOutage[] = await getAllOutages();
    res.json(outages);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('Unknown error occurred');
    }
  }
};

export const postOutages = async (req: Request, res: Response): Promise<void> => {
  const siteId: string = req.params.siteId;
  const outages: IOutage[] = req.body;
  try {
    await postSiteOutages(siteId, outages);
    res.status(200).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('Unknown error occurred');
    }
  }
};