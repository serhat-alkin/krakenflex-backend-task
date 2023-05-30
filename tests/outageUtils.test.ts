
import { filterOutagesByDate, filterOutagesByDeviceId, enhanceOutagesWithDeviceName } from '../src/utils/outageUtils';
import { IOutage } from '../src/interfaces/IOutage';
import { IOutagePost } from '../src/interfaces/IOutagePost';
import { ISiteInfo } from '../src/interfaces/ISiteInfo';

describe('Outage Utils', () => {
  let outages: IOutage[];
  let siteInfo: ISiteInfo;
  let outagesWithName: IOutagePost[];
	let outagesFilteredByDate: IOutage[];
	let outagesFilteredByDeviceId: IOutage[];
  beforeEach(() => {
    outages = [
      {
        id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
        begin: "2021-07-26T17:09:31.036Z",
        end: "2021-08-29T00:37:42.253Z"
      },
      {
        id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
        begin: "2022-05-23T12:21:27.377Z",
        end: "2022-11-13T02:16:38.905Z"
      },
      {
        id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
        begin: "2022-12-04T09:59:33.628Z",
        end: "2022-12-12T22:35:13.815Z"
      },
      {
        id: "04ccad00-eb8d-4045-8994-b569cb4b64c1",
        begin: "2022-07-12T16:31:47.254Z",
        end: "2022-10-13T04:05:10.044Z"
      },
      {
        id: "086b0d53-b311-4441-aaf3-935646f03d4d",
        begin: "2022-07-12T16:31:47.254Z",
        end: "2022-10-13T04:05:10.044Z"
      },
      {
        id: "27820d4a-1bc4-4fc1-a5f0-bcb3627e94a1",
        begin: "2021-07-12T16:31:47.254Z",
        end: "2022-10-13T04:05:10.044Z"
      }
    ];

		outagesFilteredByDate = [
      {
        id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
        begin: "2022-05-23T12:21:27.377Z",
        end: "2022-11-13T02:16:38.905Z"
      },
      {
        id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
        begin: "2022-12-04T09:59:33.628Z",
        end: "2022-12-12T22:35:13.815Z"
      },
      {
        id: "04ccad00-eb8d-4045-8994-b569cb4b64c1",
        begin: "2022-07-12T16:31:47.254Z",
        end: "2022-10-13T04:05:10.044Z"
      },
      {
        id: "086b0d53-b311-4441-aaf3-935646f03d4d",
        begin: "2022-07-12T16:31:47.254Z",
        end: "2022-10-13T04:05:10.044Z"
      },
    ];

		outagesFilteredByDeviceId = [
      {
        id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
        begin: "2022-05-23T12:21:27.377Z",
        end: "2022-11-13T02:16:38.905Z"
      },
      {
        id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
        begin: "2022-12-04T09:59:33.628Z",
        end: "2022-12-12T22:35:13.815Z"
      },
      {
        id: "086b0d53-b311-4441-aaf3-935646f03d4d",
        begin: "2022-07-12T16:31:47.254Z",
        end: "2022-10-13T04:05:10.044Z"
      },
    ];

    siteInfo = {
      id: "kingfisher",
      name: "KingFisher",
      devices: [
        {
          id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
          name: "Battery 1"
        },
        {
          id: "086b0d53-b311-4441-aaf3-935646f03d4d",
          name: "Battery 2"
        }
      ]
    };

    outagesWithName = [
      {
        id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
        name: "Battery 1",
        begin: "2022-05-23T12:21:27.377Z",
        end: "2022-11-13T02:16:38.905Z"
      },
      {
        id: "002b28fc-283c-47ec-9af2-ea287336dc1b",
        name: "Battery 1",
        begin: "2022-12-04T09:59:33.628Z",
        end: "2022-12-12T22:35:13.815Z"
      },
      {
        id: "086b0d53-b311-4441-aaf3-935646f03d4d",
        name: "Battery 2",
        begin: "2022-07-12T16:31:47.254Z",
        end: "2022-10-13T04:05:10.044Z"
      }
    ];
  });

  it('should filter outages by date', () => {
    const filteredOutages: IOutage[] = filterOutagesByDate(outages, new Date(2022, 0, 1));
    expect(filteredOutages).toHaveLength(4);
		expect(filteredOutages).toEqual(outagesFilteredByDate);
		
  });

  it('should filter outages by device id', () => {
    const filteredOutages: IOutage[] = filterOutagesByDeviceId(outagesFilteredByDate, siteInfo);
    expect(filteredOutages).toHaveLength(3);
		expect(filteredOutages).toEqual(outagesFilteredByDeviceId);
  });

  it('should enhance outages with device name', () => {
    const enhancedOutages: IOutagePost[] = enhanceOutagesWithDeviceName(outagesFilteredByDeviceId, siteInfo);
		expect(enhancedOutages).toHaveLength(3);
    expect(enhancedOutages).toEqual(outagesWithName);
  });
});
