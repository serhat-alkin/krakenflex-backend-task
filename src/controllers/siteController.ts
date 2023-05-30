import { Request, Response } from 'express';
import { getSiteInfo as getServiceSiteInfo } from '../services/siteService'

export const getSiteInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const siteId = req.params.siteId;
    const siteInfo = await getServiceSiteInfo(siteId);
    res.json(siteInfo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('Unknown error occurred');
    }
  }
};

