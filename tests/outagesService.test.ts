import { getAllOutages, postSiteOutages } from '../src/services/outagesService';
import { IOutage } from '../src/interfaces/IOutage';
import { instance } from '../src/axiosInstance';
import { MAX_RETRIES, ERROR_MESSAGES } from '../src/constants';
import { IOutagePost } from '../src/interfaces/IOutagePost';

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
      expect(instance.get).toHaveBeenCalledTimes(1);
      expect(instance.get).toHaveBeenCalledWith('/outages');
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

    it('should fetch all outages after 2 failed attempts', async () => {
      const mockOutages: IOutage[] = [
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          begin: '2021-07-26T17:09:31.036Z',
          end: '2021-08-29T00:37:42.253Z',
        },
      ];

      const error = new Error('Network error');
      (instance.get as jest.Mock)
        .mockRejectedValueOnce(error)
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce({ data: mockOutages });

      const res: IOutage[] = await getAllOutages();
    
      expect(res).toEqual(mockOutages);
      expect(instance.get).toHaveBeenCalledTimes(3);
    });
  });

  describe('postSiteOutages', () => {
    it('should post outages successfully', async () => {
      const mockOutages: IOutagePost[] = [
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          name: 'Battery 1',
          begin: '2022-05-23T12:21:27.377Z',
          end: '2022-11-13T02:16:38.905Z',
        },
        {
          id: '086b0d53-b311-4441-aaf3-935646f03d4d',
          name: 'Battery 2',
          begin: '2022-07-12T16:31:47.254Z',
          end: '2022-10-13T04:05:10.044Z',
        },
      ];

      (instance.post as jest.Mock).mockResolvedValueOnce({});
      
      const siteId = 'kingfisher';

      await postSiteOutages(siteId, mockOutages);

      expect(instance.post).toHaveBeenCalledTimes(1);
      expect(instance.post).toHaveBeenCalledWith(`/site-outages/${siteId}`, mockOutages);
    });

    it('should fail to post outages after MAX_RETRIES attempts', async () => {
      const error = new Error('Network error');
      (instance.post as jest.Mock).mockRejectedValue(error);

      const siteId = 'kingfisher';
      const outages: IOutagePost[] = [];

      try {
        await postSiteOutages(siteId, outages);
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toEqual(ERROR_MESSAGES.POST_OUTAGES_ERROR);
        }
      }

      expect(instance.post).toHaveBeenCalledTimes(MAX_RETRIES);
    });

    it('should post outages after 2 failed attempts', async () => {
      const error = new Error('Network error');
      (instance.post as jest.Mock)
        .mockRejectedValueOnce(error)
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce({});

      const siteId = 'kingfisher';
      const outages: IOutagePost[] = [];

      await postSiteOutages(siteId, outages);

      expect(instance.post).toHaveBeenCalledTimes(3);
    });
  });
});
