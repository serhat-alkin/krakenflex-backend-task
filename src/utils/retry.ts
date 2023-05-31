import { MAX_RETRIES, DELAY_MILLISECONDS } from '../constants';

export const retryWithDelay = async <T>(fn: () => Promise<T>, errorMessage: string): Promise<T> => {
  let attempts = 0;
  while (attempts < MAX_RETRIES) {
    try {
      return await fn();
    } catch (error) {
      attempts++;
      console.log(`Attempt ${attempts} failed. Retrying after ${DELAY_MILLISECONDS}ms...`);
      await new Promise(resolve => setTimeout(resolve, DELAY_MILLISECONDS));
    }
  }
  throw new Error(errorMessage);
};