import { ISiteInfo } from '../interfaces/ISiteInfo';
import { ERROR_MESSAGES } from '../constants';
import { instance } from '../axiosInstance';
import { retryWithDelay } from '../utils/retry';

export const getSiteInfo = async (siteId: string): Promise<ISiteInfo> => {
  return retryWithDelay(
    () => instance.get(`/site-info/${siteId}`).then((res) => res.data),
    ERROR_MESSAGES.GET_SITE_ERROR
  );
};
