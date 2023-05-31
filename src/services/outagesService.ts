import { IOutage } from '../interfaces/IOutage';
import { ERROR_MESSAGES } from '../constants';
import { instance } from '../axiosInstance';
import { retryWithDelay } from '../utils/retry';

export const getAllOutages = async (): Promise<IOutage[]> => {
  return retryWithDelay(
    () => instance.get("/outages").then((res) => res.data),
    ERROR_MESSAGES.GET_OUTAGES_ERROR
  );
};

export const postSiteOutages = async (
  siteId: string,
  outages: IOutage[]
): Promise<void> => {
  return retryWithDelay(
    () => instance.post(`/site-outages/${siteId}`, outages),
    ERROR_MESSAGES.POST_OUTAGES_ERROR
  );
};
