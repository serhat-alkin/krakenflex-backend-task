
import { getAllOutages } from '../src/services/outagesService';
import { IOutage } from '../src/interfaces/IOutage';
import { instance } from '../src/axiosInstance';
import { MAX_RETRIES, ERROR_MESSAGES } from '../src/constants';

jest.mock('../src/axiosInstance');

describe('Outages Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllOutages', () => {
    it('should fetch all outages successfully', async () => {
      const mockOutages: IOutage[] = [
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          begin: '2021-07-26T17:09:31.036Z',
          end: '2021-08-29T00:37:42.253Z',
        },
        {
          id: '04ccad00-eb8d-4045-8994-b569cb4b64c1',
          begin: '2022-07-12T16:31:47.254Z',
          end: '2022-10-13T04:05:10.044Z',
        },
      ];

      (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockOutages });

      const res: IOutage[] = await getAllOutages();
      
      expect(res).toEqual(mockOutages);
    });

    it('should fail to fetch outages after MAX_RETRIES attempts', async () => {
      const error = new Error('Network error');
      (instance.get as jest.Mock).mockRejectedValue(error);

      try {
        await getAllOutages();
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toEqual(ERROR_MESSAGES.GET_OUTAGES_ERROR);
        }
      }

      expect(instance.get).toHaveBeenCalledTimes(MAX_RETRIES);
    });
  });
});
