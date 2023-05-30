import { IOutage } from '../interfaces/IOutage';
import { IOutagePost } from '../interfaces/IOutagePost';
import { ISiteInfo } from '../interfaces/ISiteInfo';


export const filterOutagesByDate = (outages: IOutage[], date: Date): IOutage[] => {
  return outages.filter(outage => new Date(outage.begin) >= date);
}

export const filterOutagesByDeviceId = (outages: IOutage[], siteInfo: ISiteInfo): IOutage[] => {
  const siteDevicesIds = siteInfo.devices.map(device => device.id);
  const filteredOutages: IOutage[] = outages.filter(outage => siteDevicesIds.includes(outage.id));
  return filteredOutages;
}

export const enhanceOutagesWithDeviceName = (outages: IOutage[], siteInfo: ISiteInfo): IOutagePost[] => {
  return outages.map((outage: IOutage): IOutagePost => {
    const device = siteInfo.devices.find(device => device.id === outage.id);
    return {
      id: outage.id,
      begin: outage.begin,
      end: outage.end,
      name: device?.name || ""
    };
  });
};