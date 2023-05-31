import { IOutage } from '../interfaces/IOutage';
import { MAX_RETRIES, DELAY_MILLISECONDS, ERROR_MESSAGES } from '../constants';
import { instance } from '../axiosInstance';

export const getAllOutages = async (): Promise<IOutage[]> => {
  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    try {
      const response = await instance.get('/outages');
      return response.data;
    } catch (error) {
      attempts++;
      await new Promise(resolve => setTimeout(resolve, DELAY_MILLISECONDS));
    }
  }
  throw new Error(ERROR_MESSAGES.GET_OUTAGES_ERROR);
};
