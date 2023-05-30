import { getSiteInfo } from '../src/services/siteService';
import { ISiteInfo } from '../src/interfaces/ISiteInfo';
import { instance } from '../src/axiosInstance';
import { MAX_RETRIES, ERROR_MESSAGES } from '../src/constants';

jest.mock('../src/axiosInstance');

describe('Site Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch site information successfully', async () => {
    const mockSiteInfo: ISiteInfo = {
      id: 'kingfisher',
      name: 'KingFisher',
      devices: [
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          name: 'Battery 1',
        },
        {
          id: '086b0d53-b311-4441-aaf3-935646f03d4d',
          name: 'Battery 2',
        },
      ],
    };

    (instance.get as jest.Mock).mockResolvedValueOnce({ data: mockSiteInfo });
    const res: ISiteInfo = await getSiteInfo('kingfisher');

    expect(res).toEqual(mockSiteInfo);
    expect(instance.get).toHaveBeenCalledTimes(1);
    expect(instance.get).toHaveBeenCalledWith('/site-info/kingfisher');
  });

  it('should fail to fetch site information after MAX_RETRIES attempts', async () => {
    const error = new Error('Network error');
    (instance.get as jest.Mock).mockRejectedValue(error);

    try {
      await getSiteInfo('kingfisher');
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toEqual(ERROR_MESSAGES.GET_SITE_ERROR);
      }
    }

    expect(instance.get).toHaveBeenCalledTimes(MAX_RETRIES);
  });

  it('should fetch site information after 2 failed attempts', async () => {
    const mockSiteInfo: ISiteInfo = {
      id: 'kingfisher',
      name: 'KingFisher',
      devices: [
        {
          id: '002b28fc-283c-47ec-9af2-ea287336dc1b',
          name: 'Battery 1',
        },
        {
          id: '086b0d53-b311-4441-aaf3-935646f03d4d',
          name: 'Battery 2',
        },
      ],
    };
  
    const error = new Error('Network error');
    (instance.get as jest.Mock)
      .mockRejectedValueOnce(error)
      .mockRejectedValueOnce(error)
      .mockResolvedValueOnce({ data: mockSiteInfo });
  
    const res: ISiteInfo = await getSiteInfo('kingfisher');
  
    expect(res).toEqual(mockSiteInfo);
    expect(instance.get).toHaveBeenCalledTimes(3);
  });
});
