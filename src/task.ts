import { getAllOutages, postSiteOutages } from './services/outagesService';
import { getSiteInfo } from './services/siteService';
import { filterOutagesByDate, filterOutagesByDeviceId, enhanceOutagesWithDeviceName } from './utils/outageUtils';
import { DEFAULT_DATE_FILTER, ERROR_MESSAGES } from './constants';

export const processOutagesForSite = async (siteId: string): Promise<void> => {
  try {
    const outages = await getAllOutages();
    const siteInfo = await getSiteInfo(siteId);
    const filteredOutages = filterOutagesByDate(outages, new Date(DEFAULT_DATE_FILTER));
    const outagesByDeviceId = filterOutagesByDeviceId(filteredOutages, siteInfo)
    const filteredAndEnhancedOutages = enhanceOutagesWithDeviceName(outagesByDeviceId, siteInfo);
    await postSiteOutages(siteId, filteredAndEnhancedOutages);
    console.log('Site info:', siteInfo);
    console.log('Filtered Outages: ', filteredAndEnhancedOutages)
  } catch (error) {
    console.error(ERROR_MESSAGES.TASK_FAILED, error);
  }
};
