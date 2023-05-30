import { ISiteInfo } from '../interfaces/ISiteInfo';
import { MAX_RETRIES, DELAY_MILLISECONDS, ERROR_MESSAGES } from '../constants';
import { instance } from '../axiosInstance';


export const getSiteInfo = async (siteId: string): Promise<ISiteInfo> => {
  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    try {
      const response = await instance.get(`/site-info/${siteId}`);
      return response.data;
    } catch (error) {
      attempts++;
      await new Promise(resolve => setTimeout(resolve, DELAY_MILLISECONDS));
    }
  }
  throw new Error(ERROR_MESSAGES.GET_SITE_ERROR);
};
