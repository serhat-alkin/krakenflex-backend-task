import { Router } from 'express';
import { getOutages, postOutages} from '../controllers/outagesController';
import { getSiteInfo} from '../controllers/siteController';
const router = Router();

router.get('/outages', getOutages);
router.get('/site-info/:siteId', getSiteInfo);
router.post('/site-outages/:siteId', postOutages);

export default router;