export const MAX_RETRIES = 3;
export const DELAY_MILLISECONDS = 1000;
export const DEFAULT_SITE_ID = "norwich-pear-tree";
export const DEFAULT_DATE_FILTER = "2022-01-01T00:00:00.000Z";

export const ERROR_MESSAGES = {
  GET_SITE_ERROR: 'Failed to fetch site information after 3 attempts', 
  GET_OUTAGES_ERROR: 'Failed to fetch outages after 3 attempts',
  POST_OUTAGES_ERROR: 'Failed to post site outages after multiple attempts',
  UNKNOWN_ERROR: 'Unknown error occured', 
  TASK_FAILED: 'Failed to process outages for site'  
};